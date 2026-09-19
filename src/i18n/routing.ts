import { defineRouting } from "next-intl/routing";

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Display metadata for the language switcher. Add a locale here + a messages
 *  file + an entry in `locales` and the whole app picks it up. */
export const localeMeta: Record<
  Locale,
  { label: string; native: string; hrefLang: string }
> = {
  en: { label: "English", native: "English", hrefLang: "en" },
  de: { label: "German", native: "Deutsch", hrefLang: "de" },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
