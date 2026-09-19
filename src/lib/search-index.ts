import { destinations } from "@/data/destinations";
import { regionById, themeById } from "@/data/taxonomy";
import type { Locale } from "@/i18n/routing";

export type SearchItem = {
  slug: string;
  name: string;
  tagline: string;
  region: string;
  themes: string[];
  photoId: string;
  /** Lower-cased haystack used for matching. */
  haystack: string;
};

/**
 * A lean, already-localised index. Built on the server and handed to the
 * command palette so the client never downloads the full story copy.
 */
export function buildSearchIndex(locale: Locale): SearchItem[] {
  return destinations.map((d) => {
    const region = regionById.get(d.region)?.name[locale] ?? d.region;
    const themes = d.themes.map((id) => themeById.get(id)?.name[locale] ?? id);
    return {
      slug: d.slug,
      name: d.name[locale],
      tagline: d.tagline[locale],
      region,
      themes,
      photoId: d.photos[0],
      haystack: [d.name[locale], d.tagline[locale], region, ...themes, d.slug]
        .join(" ")
        .toLowerCase(),
    };
  });
}

export function searchItems(index: SearchItem[], query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return index;
  const terms = q.split(/\s+/);
  return index.filter((item) => terms.every((t) => item.haystack.includes(t)));
}
