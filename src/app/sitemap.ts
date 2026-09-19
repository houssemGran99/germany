import type { MetadataRoute } from "next";
import { destinationSlugs } from "@/data/destinations";
import { locales } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const staticPaths = ["", "/destinations", "/regions", "/gallery", "/plan", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...destinationSlugs.map((slug) => `/destinations/${slug}`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/destinations/") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
