import type { Destination } from "../types";
import { bavaria } from "./bavaria";
import { southwest } from "./southwest";
import { west } from "./west";
import { east } from "./east";
import { north } from "./north";

/**
 * All destinations, grouped by file for readability.
 * To add one: append it to the right regional file (or create a new one and
 * import it here) and make sure its photo ids exist in `scripts/photo-sources.mjs`.
 */
export const destinations: Destination[] = [
  ...bavaria,
  ...southwest,
  ...west,
  ...east,
  ...north,
];

const bySlug = new Map(destinations.map((d) => [d.slug, d]));

export function getDestination(slug: string): Destination | undefined {
  return bySlug.get(slug);
}

export function getDestinations(slugs: string[]): Destination[] {
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((d): d is Destination => Boolean(d));
}

export const featuredDestinations = destinations.filter((d) => d.featured);

export const destinationSlugs = destinations.map((d) => d.slug);
