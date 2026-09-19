"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapLoader } from "./MapLoader";
import { cn } from "@/lib/cn";
import type { MapMarker } from "./MapView";

export type RegionGroup = {
  id: string;
  name: string;
  blurb: string;
  destinations: { slug: string; name: string; tagline: string }[];
};

type Props = {
  markers: MapMarker[];
  groups: RegionGroup[];
};

export function RegionsExplorer({ markers, groups }: Props) {
  const t = useTranslations("regions");
  const reduce = useReducedMotion();
  const [view, setView] = useState<"map" | "list">("map");

  return (
    <>
      {/* On small screens the list is the primary view; the toggle lets
          anyone switch, and the list is always in the DOM below. */}
      <div
        role="group"
        aria-label={t("title")}
        className="border-line bg-surface mb-6 inline-flex rounded-full border p-1 lg:hidden"
      >
        {(["map", "list"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setView(option)}
            aria-pressed={view === option}
            className={cn(
              "relative min-h-11 rounded-full px-6 text-sm font-medium transition-colors",
              view === option ? "text-on-forest-block" : "text-ink-muted",
            )}
          >
            {view === option && (
              <motion.span
                layoutId="region-view-pill"
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-forest-block absolute inset-0 rounded-full"
              />
            )}
            <span className="relative">
              {option === "map" ? t("viewMap") : t("viewList")}
            </span>
          </button>
        ))}
      </div>

      <MapLoader
        markers={markers}
        ariaLabel={t("mapLabel")}
        className={cn(
          "h-[60svh] min-h-[24rem] lg:h-[34rem]",
          view === "map" ? "block" : "hidden lg:block",
        )}
      />

      <section
        className={cn("mt-16", view === "list" ? "block" : "hidden lg:block")}
        aria-label={t("listTitle")}
      >
        <h2 className="mb-8 text-2xl">{t("listTitle")}</h2>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <li key={group.id}>
              <h3 className="font-serif text-xl">{group.name}</h3>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">
                {group.blurb}
              </p>
              <p className="text-2xs text-ink-faint mt-3 font-semibold tracking-[0.18em] uppercase">
                {t("inRegion", { count: group.destinations.length })}
              </p>
              <ul className="mt-4 space-y-1">
                {group.destinations.map((destination) => (
                  <li key={destination.slug}>
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="text-ink hover:text-accent flex min-h-11 items-center gap-2 text-sm transition-colors"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-accent size-1.5 shrink-0 rounded-full"
                      />
                      {destination.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
