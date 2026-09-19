"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { DestinationCard } from "./DestinationCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { DestinationCard as CardData } from "@/lib/view-models";

export type FilterOption = { id: string; label: string };

type Props = {
  cards: CardData[];
  regions: FilterOption[];
  themes: FilterOption[];
  seasons: FilterOption[];
};

export function DestinationsExplorer({ cards, regions, themes, seasons }: Props) {
  const t = useTranslations("destinations");
  const reduce = useReducedMotion();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read once: after mount the component owns the filter state and writes it
  // back to the URL, so a shared link still lands on the right selection.
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [region, setRegion] = useState(() => searchParams.get("region") ?? "");
  const [theme, setTheme] = useState(() => searchParams.get("theme") ?? "");
  const [season, setSeason] = useState(() => searchParams.get("season") ?? "");

  // Keep the URL shareable without pushing a history entry per keystroke.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (region) params.set("region", region);
    if (theme) params.set("theme", theme);
    if (season) params.set("season", season);
    const qs = params.toString();
    const id = setTimeout(() => {
      router.replace(`/destinations${qs ? `?${qs}` : ""}`, { scroll: false });
    }, 250);
    return () => clearTimeout(id);
  }, [query, region, theme, season, router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards.filter((card) => {
      if (region && card.regionId !== region) return false;
      if (theme && !card.themeIds.includes(theme as CardData["themeIds"][number])) {
        return false;
      }
      if (season && !card.seasons.includes(season as CardData["seasons"][number])) {
        return false;
      }
      if (!q) return true;
      return [card.name, card.tagline, card.regionName, ...card.themeNames]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [cards, query, region, theme, season]);

  const hasFilters = Boolean(query || region || theme || season);

  function clearAll() {
    setQuery("");
    setRegion("");
    setTheme("");
    setSeason("");
  }

  return (
    <>
      <div className="mb-8 space-y-6">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchLabel")}
            className={cn(
              "h-14 w-full rounded-full border border-line bg-surface pr-5 pl-13 text-base",
              "shadow-soft-sm transition-colors outline-none placeholder:text-ink-faint",
              "focus:border-accent",
            )}
          />
        </div>

        <div className="space-y-4">
          <FilterRow
            label={t("filterRegion")}
            allLabel={t("all")}
            options={regions}
            value={region}
            onChange={setRegion}
          />
          <FilterRow
            label={t("filterTheme")}
            allLabel={t("all")}
            options={themes}
            value={theme}
            onChange={setTheme}
          />
          <FilterRow
            label={t("filterSeason")}
            allLabel={t("all")}
            options={seasons}
            value={season}
            onChange={setSeason}
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
          <p aria-live="polite" className="text-sm text-ink-muted">
            {t("resultCount", { count: results.length })}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              {t("clear")}
            </Button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((card, i) => (
              <motion.li
                key={card.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                transition={{
                  duration: reduce ? 0.15 : 0.45,
                  delay: reduce ? 0 : Math.min(i, 6) * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <DestinationCard card={card} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="rounded-3xl border border-dashed border-line-strong px-6 py-20 text-center">
          <p className="font-serif text-2xl">{t("emptyTitle")}</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            {t("emptyBody")}
          </p>
          <Button className="mt-8" onClick={clearAll}>
            {t("emptyAction")}
          </Button>
        </div>
      )}
    </>
  );
}

function FilterRow({
  label,
  allLabel,
  options,
  value,
  onChange,
}: {
  label: string;
  allLabel: string;
  options: FilterOption[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="shrink-0 text-2xs font-semibold tracking-[0.18em] text-ink-faint uppercase sm:w-24">
        {label}
      </span>
      <div
        role="group"
        aria-label={label}
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <Chip active={!value} onClick={() => onChange("")}>
          {allLabel}
        </Chip>
        {options.map((option) => (
          <Chip
            key={option.id}
            active={value === option.id}
            onClick={() => onChange(value === option.id ? "" : option.id)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-11 shrink-0 rounded-full border px-4 text-sm whitespace-nowrap transition-all duration-300",
        active
          ? "border-forest-block bg-forest-block text-on-forest-block"
          : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
