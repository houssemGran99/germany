import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/ui/Reveal";
import { themes } from "@/data/taxonomy";
import { destinations, getDestination } from "@/data/destinations";
import type { Locale } from "@/i18n/routing";

export async function ThemeGrid() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("themes");

  const items = themes.map((theme) => ({
    id: theme.id,
    name: theme.name[locale],
    blurb: theme.blurb[locale],
    photoId: getDestination(theme.cover)?.photos[0] ?? "",
    count: destinations.filter((d) => d.themes.includes(theme.id)).length,
  }));

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={i * 0.06}>
          <Link
            href={{ pathname: "/destinations", query: { theme: item.id } }}
            className="group block h-full focus-visible:outline-none"
          >
            <article className="relative h-full overflow-hidden rounded-3xl bg-surface-2 shadow-soft-sm transition-shadow duration-500 group-hover:shadow-soft-lg group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-3 group-focus-visible:ring-offset-bg">
              <div className="relative aspect-16/11 w-full overflow-hidden">
                <SmartImage
                  photoId={item.photoId}
                  alt={item.name}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] motion-reduce:transform-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"
                />
                <span className="absolute top-4 right-4 rounded-full bg-white/15 px-3 py-1 text-2xs font-medium text-white backdrop-blur-md">
                  {t("count", { count: item.count })}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-serif text-xl">
                  {item.name}
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="translate-x-0 text-accent opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.blurb}</p>
              </div>
            </article>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
