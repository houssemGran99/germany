import type { Locale } from "@/i18n/routing";

/** A value that exists in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export type ThemeId =
  | "castles"
  | "alps"
  | "forests"
  | "cities"
  | "coasts"
  | "wine";

export type SeasonId = "spring" | "summer" | "autumn" | "winter";

export type RegionId =
  | "bavaria"
  | "baden-wuerttemberg"
  | "rhineland-palatinate"
  | "berlin-brandenburg"
  | "hamburg-north"
  | "north-rhine-westphalia"
  | "saxony"
  | "mecklenburg"
  | "harz-lower-saxony";

export interface PhotoCredit {
  /** Photographer / uploader as stated by the source. */
  author: string;
  license: string;
  licenseUrl: string;
  /** Page where the licence and author are stated. */
  sourceUrl: string;
  source: string;
}

export interface Photo {
  id: string;
  /** Public path of the locally optimised file. */
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  credit: PhotoCredit;
}

export interface Destination {
  slug: string;
  name: Localized;
  /** Short, evocative one-liner used on cards and hero. */
  tagline: Localized;
  region: RegionId;
  themes: ThemeId[];
  bestSeasons: SeasonId[];
  /** [latitude, longitude] */
  coords: [number, number];
  /** 2–3 paragraphs of story copy. */
  story: Localized<string[]>;
  highlights: Localized<string[]>;
  gettingThere: Localized;
  /** Slugs of nearby destinations. */
  nearby: string[];
  /** Photo ids; the first one is the hero image. */
  photos: string[];
  featured?: boolean;
}

export interface Region {
  id: RegionId;
  name: Localized;
  blurb: Localized;
  /** Map focus for the region view. */
  coords: [number, number];
}

export interface Theme {
  id: ThemeId;
  name: Localized;
  blurb: Localized;
  /** Slug of the destination whose hero represents this theme. */
  cover: string;
}

export interface Season {
  id: SeasonId;
  name: Localized;
  months: Localized;
  blurb: Localized;
  cover: string;
  /** Accent colour pair [light, dark] used to tint the seasonal section. */
  accent: [string, string];
}

export interface Fact {
  id: string;
  value: Localized;
  label: Localized;
}
