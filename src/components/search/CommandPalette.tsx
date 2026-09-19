"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { searchItems, type SearchItem } from "@/lib/search-index";
import { cn } from "@/lib/cn";

type Props = {
  index: SearchItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** The dialog body is mounted fresh on every open, so its query and
 *  highlighted row reset without any state-syncing effects. */
export function CommandPalette({ index, open, onOpenChange }: Props) {
  return (
    <AnimatePresence>
      {open && <PaletteDialog index={index} onClose={() => onOpenChange(false)} />}
    </AnimatePresence>
  );
}

function PaletteDialog({
  index,
  onClose,
}: {
  index: SearchItem[];
  onClose: () => void;
}) {
  const t = useTranslations("search");
  const router = useRouter();
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchItems(index, query).slice(0, 8), [index, query]);
  const activeIndex = results.length ? Math.min(active, results.length - 1) : 0;

  // Focus the input and lock the page behind the dialog.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  function go(item: SearchItem) {
    onClose();
    router.push(`/destinations/${item.slug}`);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(results.length ? (activeIndex + 1) % results.length : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(
        results.length ? (activeIndex - 1 + results.length) % results.length : 0,
      );
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex]);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-90 flex items-start justify-center p-4 pt-[12vh] sm:pt-[18vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.1 : 0.2 }}
    >
      <div
        className="bg-forest-deep/50 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        initial={{ opacity: 0, y: reduce ? 0 : -12, scale: reduce ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduce ? 0 : -8, scale: reduce ? 1 : 0.98 }}
        transition={{ duration: reduce ? 0.1 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        onKeyDown={onKeyDown}
        className="border-line bg-surface shadow-soft-xl relative w-full max-w-xl overflow-hidden rounded-3xl border"
      >
        <div className="border-line flex items-center gap-3 border-b px-5">
          <SearchIcon className="text-ink-faint shrink-0" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-label={t("placeholder")}
            placeholder={t("placeholder")}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            className="placeholder:text-ink-faint h-16 w-full bg-transparent text-base outline-none"
          />
          <kbd className="border-line bg-surface-2 text-2xs text-ink-faint hidden shrink-0 rounded-md border px-2 py-1 sm:block">
            ESC
          </kbd>
        </div>

        {results.length > 0 ? (
          <ul
            id={listId}
            role="listbox"
            aria-label={t("resultsLabel")}
            className="max-h-[52vh] overflow-y-auto p-2"
          >
            {results.map((item, i) => (
              <li key={item.slug} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={i === activeIndex}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors",
                    i === activeIndex ? "bg-surface-2" : "hover:bg-surface-2/60",
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block truncate text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-ink-muted block truncate text-xs">
                      {item.region} · {item.themes.join(", ")}
                    </span>
                  </span>
                  <ArrowIcon className="text-ink-faint shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-5 py-10 text-center">
            <p className="text-ink text-sm">{t("noResults", { query })}</p>
            <p className="text-ink-muted mt-1.5 text-xs">{t("noResultsHint")}</p>
          </div>
        )}

        <div className="border-line text-2xs text-ink-faint hidden items-center gap-4 border-t px-5 py-3 sm:flex">
          <Hint keys="↑ ↓" label={t("navigate")} />
          <Hint keys="↵" label={t("select")} />
          <Hint keys="esc" label={t("dismiss")} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hint({ keys, label }: { keys: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd className="border-line bg-surface-2 rounded border px-1.5 py-0.5">
        {keys}
      </kbd>
      {label}
    </span>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
