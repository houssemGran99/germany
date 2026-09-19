"use client";

import { useMemo } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useThemeMode } from "@/lib/client-store";
import "leaflet/dist/leaflet.css";
import "./map.css";

export type MapMarker = {
  slug: string;
  name: string;
  tagline: string;
  regionName: string;
  coords: [number, number];
};

type Props = {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  /** Connects the markers in order — used by the trip planner. */
  showRoute?: boolean;
  /** Numbered pins instead of dots. */
  numbered?: boolean;
  interactive?: boolean;
  ariaLabel: string;
  className?: string;
};

/** OpenStreetMap's standard tiles: free, no API key, no watermark.
 *  Dark mode is handled by filtering the tile pane in map.css, since OSM
 *  does not publish a dark raster style. */
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function pinIcon(label?: string) {
  return L.divIcon({
    className: "sd-pin-wrapper",
    html: `<span class="sd-pin">${label ?? ""}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

export default function MapView({
  markers,
  center = [51.1, 10.3],
  zoom = 6,
  showRoute = false,
  numbered = false,
  interactive = true,
  ariaLabel,
  className,
}: Props) {
  const t = useTranslations("gallery");
  const mode = useThemeMode();

  const line = useMemo<[number, number][]>(
    () => markers.map((m) => m.coords),
    [markers],
  );

  return (
    <div
      className={className}
      role="application"
      aria-label={ariaLabel}
      data-map-theme={mode}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        attributionControl
        className="h-full w-full"
      >
        <TileLayer url={TILE_URL} attribution={ATTRIBUTION} maxZoom={19} />

        {showRoute && line.length > 1 && (
          <Polyline
            positions={line}
            pathOptions={{
              color: mode === "dark" ? "#e2ab44" : "#9a6b12",
              weight: 3,
              opacity: 0.9,
              dashArray: "1 8",
              lineCap: "round",
            }}
          />
        )}

        {markers.map((marker, i) => (
          <Marker
            key={marker.slug}
            position={marker.coords}
            icon={pinIcon(numbered ? String(i + 1) : undefined)}
            alt={marker.name}
            keyboard
          >
            <Popup>
              <span className="text-2xs text-ink-faint block font-semibold tracking-[0.15em] uppercase">
                {marker.regionName}
              </span>
              <span className="text-ink mt-1 block font-serif text-base">
                {marker.name}
              </span>
              <span className="text-ink-muted mt-1 block text-xs">
                {marker.tagline}
              </span>
              <Link
                href={`/destinations/${marker.slug}`}
                className="text-accent mt-2.5 inline-flex items-center gap-1 text-xs font-medium underline underline-offset-3"
              >
                {t("viewDestination")}
                <span aria-hidden="true">→</span>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
