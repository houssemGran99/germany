"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";
import type { SeasonId } from "@/data/types";

export type SeasonView = {
  id: SeasonId;
  name: string;
  months: string;
  blurb: string;
  photoId: string;
  /** [light, dark] accent pair driving the section tint. */
  accent: [string, string];
  destinationNames: string[];
  count: number;
};

export function SeasonSection({ seasons }: { seasons: SeasonView[] }) {
  const t = useTranslations("seasons");
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<SeasonId>(seasons[0]?.id ?? "spring");
  const active = seasons.find((s) => s.id === activeId) ?? seasons[0];

  return (
    <div
      style={{ ["--season" as string]: active.accent[0] }}
      className="border-line bg-surface overflow-hidden rounded-4xl border transition-colors duration-700"
    >
      <div
        role="tablist"
        aria-label={t("selectSeason")}
        className="no-scrollbar border-line flex gap-1 overflow-x-auto border-b p-2"
      >
        {seasons.map((season) => {
          const isActive = season.id === activeId;
          return (
            <button
              key={season.id}
              role="tab"
              type="button"
              id={`season-tab-${season.id}`}
              aria-selected={isActive}
              aria-controls={`season-panel-${season.id}`}
              onClick={() => setActiveId(season.id)}
              className={cn(
                "relative min-h-11 shrink-0 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                isActive ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="season-pill"
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor:
                      "color-mix(in oklab, var(--season) 18%, transparent)",
                  }}
                />
              )}
              <span className="relative">{season.name}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`season-panel-${active.id}`}
        aria-labelledby={`season-tab-${active.id}`}
        className="grid lg:grid-cols-2"
      >
        <div className="relative order-1 aspect-4/3 w-full overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[28rem]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={active.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: reduce ? 1 : 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.2 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SmartImage
                photoId={active.photoId}
                alt={active.name}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25 mix-blend-multiply transition-colors duration-700"
            style={{ backgroundColor: "var(--season)" }}
          />
        </div>

        <div className="order-2 flex flex-col justify-center gap-5 p-6 sm:p-10 lg:order-1 lg:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: reduce ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-2xs mb-3 font-semibold tracking-[0.2em] uppercase"
                style={{
                  color: "color-mix(in oklab, var(--season) 75%, var(--color-ink))",
                }}
              >
                {active.months}
              </p>
              <h3 className="text-3xl">{active.name}</h3>
              <p className="text-ink-muted mt-4 text-base leading-relaxed">
                {active.blurb}
              </p>

              <p className="text-2xs text-ink-faint mt-7 font-semibold tracking-[0.2em] uppercase">
                {t("bestFor")}
              </p>
              <p className="mt-2 font-serif text-lg leading-snug">
                {active.destinationNames.join(" · ")}
              </p>

              <Link
                href={{ pathname: "/destinations", query: { season: active.id } }}
                className="text-ink decoration-accent hover:text-accent mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-2 underline-offset-6 transition-colors"
              >
                {t("seeDestinations", { count: active.count })}
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
