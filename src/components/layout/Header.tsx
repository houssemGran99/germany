"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import type { SearchItem } from "@/lib/search-index";
import { useClientValue, useScrolledPast } from "@/lib/client-store";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { CommandPalette } from "@/components/search/CommandPalette";
import { useTrip } from "@/components/trip/TripProvider";

const navItems = [
  { href: "/destinations", key: "destinations" },
  { href: "/regions", key: "regions" },
  { href: "/gallery", key: "gallery" },
  { href: "/plan", key: "plan" },
  { href: "/about", key: "about" },
] as const;

/** Routes that render a full-bleed hero, so the header floats over the image. */
function isOverlayRoute(pathname: string) {
  return pathname === "/" || /^\/destinations\/[^/]+$/.test(pathname);
}

function detectMac() {
  return /Mac|iPhone|iPad/.test(navigator.userAgent);
}

export function Header({ searchIndex }: { searchIndex: SearchItem[] }) {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const ts = useTranslations("search");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { slugs, ready } = useTrip();

  const scrolled = useScrolledPast(24);
  const isMac = useClientValue(detectMac, false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const overlay = isOverlayRoute(pathname) && !scrolled;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const tripCount = ready ? slugs.length : 0;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)]",
          overlay
            ? "border-b border-transparent text-white"
            : "glass border-b text-ink shadow-soft-sm",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center gap-2 px-4 sm:h-18 sm:gap-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="mr-auto flex items-baseline gap-2 font-serif text-lg tracking-tight sm:text-xl"
          >
            <span>Schönes</span>
            <span
              className={cn("transition-colors", overlay ? "text-white/70" : "text-accent")}
            >
              Deutschland
            </span>
          </Link>

          <nav aria-label={t("primary")} className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                    active ? "font-medium" : "opacity-75 hover:opacity-100",
                  )}
                >
                  {t(item.key)}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-current"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={ts("open")}
            className={cn(
              "hidden items-center gap-2 rounded-full border border-current/15 py-2 pr-2 pl-3.5 text-xs",
              "transition-colors duration-300 hover:border-current/35 md:flex",
            )}
          >
            <SearchIcon />
            <span className="opacity-70">{tc("searchShort")}</span>
            <kbd className="rounded border border-current/20 px-1.5 py-0.5 text-2xs opacity-70">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={ts("open")}
            className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10 md:hidden"
          >
            <SearchIcon />
          </button>

          <Link
            href="/plan"
            aria-label={`${t("plan")}${tripCount ? ` (${tripCount})` : ""}`}
            className="relative hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10 sm:inline-flex"
          >
            <BookmarkIcon />
            {tripCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex size-4.5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-on-accent">
                {tripCount}
              </span>
            )}
          </Link>

          <LocaleSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("openMenu")}
            aria-expanded={menuOpen}
            className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        tripCount={tripCount}
      />
      <CommandPalette
        index={searchIndex}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  tripCount,
}: {
  open: boolean;
  onClose: () => void;
  tripCount: number;
}) {
  const t = useTranslations("nav");
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-80 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.1 : 0.25 }}
        >
          <div
            className="absolute inset-0 bg-forest-deep/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            aria-label={t("primary")}
            initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
            transition={{ duration: reduce ? 0.1 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col border-l border-line bg-surface shadow-soft-xl"
          >
            <div className="flex h-16 items-center justify-between px-5 sm:h-18">
              <span className="font-serif text-lg">Schönes Deutschland</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t("closeMenu")}
                className="inline-flex size-11 items-center justify-center rounded-full hover:bg-surface-2"
              >
                <CloseIcon />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-3 py-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.06 + i * 0.05, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-14 items-center justify-between rounded-2xl px-4 font-serif text-xl transition-colors hover:bg-surface-2"
                  >
                    {t(item.key)}
                    {item.key === "plan" && tripCount > 0 && (
                      <span className="flex size-6 items-center justify-center rounded-full bg-accent text-2xs font-bold text-on-accent">
                        {tripCount}
                      </span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-5 py-4">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4.5h12v15l-6-4.2-6 4.2z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
