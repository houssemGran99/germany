"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";
import type MapView from "./MapView";

/** Leaflet is ~150 kB and touches `window`, so it is loaded on demand only. */
const Map = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div className="bg-surface-2 grid h-full w-full place-items-center">
      <span className="text-ink-faint flex items-center gap-2 text-sm">
        <span className="bg-accent size-2 animate-pulse rounded-full motion-reduce:animate-none" />
        <MapLoadingLabel />
      </span>
    </div>
  );
}

function MapLoadingLabel() {
  const t = useTranslations("regions");
  return <>{t("loadingMap")}</>;
}

export function MapLoader({ className, ...props }: ComponentProps<typeof MapView>) {
  return (
    <div className={cn("border-line overflow-hidden rounded-3xl border", className)}>
      <Map {...props} className="h-full w-full" />
    </div>
  );
}
