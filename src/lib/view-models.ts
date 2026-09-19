import { destinations } from "@/data/destinations";
import { regionById, themeById } from "@/data/taxonomy";
import type { Destination, RegionId, SeasonId, ThemeId } from "@/data/types";
import type { Locale } from "@/i18n/routing";

/**
 * A destination flattened to a single locale. Built on the server and passed
 * into client components so they never import the full multilingual dataset.
 */
export type DestinationCard = {
  slug: string;
  name: string;
  tagline: string;
  regionId: RegionId;
  regionName: string;
  themeIds: ThemeId[];
  themeNames: string[];
  seasons: SeasonId[];
  photoId: string;
  coords: [number, number];
};

export function toCard(d: Destination, locale: Locale): DestinationCard {
  return {
    slug: d.slug,
    name: d.name[locale],
    tagline: d.tagline[locale],
    regionId: d.region,
    regionName: regionById.get(d.region)?.name[locale] ?? d.region,
    themeIds: d.themes,
    themeNames: d.themes.map((id) => themeById.get(id)?.name[locale] ?? id),
    seasons: d.bestSeasons,
    photoId: d.photos[0],
    coords: d.coords,
  };
}

export function allCards(locale: Locale): DestinationCard[] {
  return destinations.map((d) => toCard(d, locale));
}

export function cardsFor(slugs: string[], locale: Locale): DestinationCard[] {
  const bySlug = new Map(destinations.map((d) => [d.slug, d]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((d): d is Destination => Boolean(d))
    .map((d) => toCard(d, locale));
}
