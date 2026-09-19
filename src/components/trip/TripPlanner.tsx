"use client";

import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTrip } from "./TripProvider";
import { MapLoader } from "@/components/map/MapLoader";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button, LinkButton } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { routeDistanceKm } from "@/lib/geo";
import { cn } from "@/lib/cn";
import type { DestinationCard } from "@/lib/view-models";

export function TripPlanner({ cards }: { cards: DestinationCard[] }) {
  const t = useTranslations("trip");
  const reduce = useReducedMotion();
  const { slugs, ready, remove, move, clear } = useTrip();

  const bySlug = useMemo(() => new Map(cards.map((c) => [c.slug, c])), [cards]);
  const stops = slugs
    .map((slug) => bySlug.get(slug))
    .filter((card): card is DestinationCard => Boolean(card));

  const distance = useMemo(
    () => Math.round(routeDistanceKm(stops.map((s) => s.coords))),
    [stops],
  );

  if (!ready) {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-[26rem] w-full rounded-3xl" />
      </div>
    );
  }

  if (stops.length === 0) {
    return (
      <div className="border-line-strong rounded-4xl border border-dashed px-6 py-20 text-center sm:py-28">
        <span
          aria-hidden="true"
          className="bg-surface-2 text-ink-faint mx-auto mb-6 grid size-14 place-items-center rounded-full"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4.5h12v15l-6-4.2-6 4.2z" />
          </svg>
        </span>
        <p className="font-serif text-2xl">{t("empty")}</p>
        <p className="text-ink-muted mx-auto mt-3 max-w-md text-sm leading-relaxed">
          {t("emptyBody")}
        </p>
        <LinkButton href="/destinations" className="mt-8">
          {t("emptyAction")}
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-ink text-sm font-medium">
              {t("count", { count: stops.length })}
            </p>
            {stops.length > 1 && (
              <p className="text-ink-muted mt-1 text-xs">
                {t("totalDistance", { km: distance })}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm(t("clearConfirm"))) clear();
            }}
          >
            {t("clear")}
          </Button>
        </div>

        <ol className="space-y-3">
          <AnimatePresence initial={false}>
            {stops.map((stop, i) => (
              <motion.li
                key={stop.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: reduce ? 0 : -16 }}
                transition={{ duration: reduce ? 0.12 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="border-line bg-surface shadow-soft-sm flex items-center gap-4 rounded-3xl border p-3"
              >
                <span
                  aria-hidden="true"
                  className="bg-accent text-on-accent grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold"
                >
                  {i + 1}
                </span>

                <Link
                  href={`/destinations/${stop.slug}`}
                  className="flex min-w-0 flex-1 items-center gap-4"
                >
                  <span className="bg-surface-2 relative size-16 shrink-0 overflow-hidden rounded-2xl">
                    <SmartImage
                      photoId={stop.photoId}
                      alt={stop.name}
                      sizes="64px"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="sr-only">{t("stop", { index: i + 1 })}: </span>
                    <span className="block truncate font-serif text-lg">
                      {stop.name}
                    </span>
                    <span className="text-ink-muted block truncate text-xs">
                      {stop.regionName}
                    </span>
                  </span>
                </Link>

                <div className="flex shrink-0 flex-col">
                  <IconButton
                    label={t("moveUp")}
                    disabled={i === 0}
                    onClick={() => move(stop.slug, -1)}
                  >
                    <ChevronIcon />
                  </IconButton>
                  <IconButton
                    label={t("moveDown")}
                    disabled={i === stops.length - 1}
                    onClick={() => move(stop.slug, 1)}
                  >
                    <ChevronIcon className="rotate-180" />
                  </IconButton>
                </div>

                <IconButton label={t("remove")} onClick={() => remove(stop.slug)}>
                  <CloseIcon />
                </IconButton>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>

      <div className="lg:sticky lg:top-24">
        <h2 className="text-2xs text-ink-faint mb-4 font-semibold tracking-[0.2em] uppercase">
          {t("route")}
        </h2>
        <MapLoader
          markers={stops.map((stop) => ({
            slug: stop.slug,
            name: stop.name,
            tagline: stop.tagline,
            regionName: stop.regionName,
            coords: stop.coords,
          }))}
          showRoute
          numbered
          ariaLabel={t("routeMapLabel")}
          className="h-[24rem] sm:h-[32rem]"
        />
      </div>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "text-ink-faint inline-flex size-9 items-center justify-center rounded-full",
        "hover:bg-surface-2 hover:text-ink transition-colors",
        "disabled:pointer-events-none disabled:opacity-30",
      )}
    >
      {children}
    </button>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
