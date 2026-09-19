import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Hero, type HeroSlide } from "@/components/home/Hero";
import { FeaturedScroller } from "@/components/home/FeaturedScroller";
import { ThemeGrid } from "@/components/home/ThemeGrid";
import { SeasonSection, type SeasonView } from "@/components/home/SeasonSection";
import { FactsStrip } from "@/components/home/FactsStrip";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { destinations, featuredDestinations, getDestination } from "@/data/destinations";
import { seasons } from "@/data/taxonomy";
import { getPhoto } from "@/lib/photos";
import { toCard } from "@/lib/view-models";
import type { Locale } from "@/i18n/routing";

const HERO_SLUGS = [
  "neuschwanstein",
  "koenigssee",
  "saxon-switzerland",
  "rhine-valley",
  "ruegen",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("common");
  const tf = await getTranslations("featured");
  const tt = await getTranslations("themes");
  const ts = await getTranslations("seasons");

  // Only use slides whose photo actually made it through the image pipeline,
  // so the hero never falls back to a placeholder.
  const slides: HeroSlide[] = HERO_SLUGS.map((slug) => getDestination(slug))
    .filter((d) => d !== undefined)
    .filter((d) => getPhoto(d.photos[0]))
    .map((d) => ({ photoId: d.photos[0], alt: d.name[l] }));

  const fallbackSlides: HeroSlide[] = destinations
    .slice(0, 5)
    .map((d) => ({ photoId: d.photos[0], alt: d.name[l] }));

  const featuredCards = featuredDestinations.map((d) => toCard(d, l));

  const seasonViews: SeasonView[] = seasons.map((season) => {
    const matches = destinations.filter((d) => d.bestSeasons.includes(season.id));
    return {
      id: season.id,
      name: season.name[l],
      months: season.months[l],
      blurb: season.blurb[l],
      photoId: getDestination(season.cover)?.photos[0] ?? "",
      accent: season.accent,
      destinationNames: matches.slice(0, 3).map((d) => d.name[l]),
      count: matches.length,
    };
  });

  const closing = getDestination("moselle") ?? destinations[0];

  return (
    <>
      <Hero slides={slides.length ? slides : fallbackSlides} />

      <Section
        eyebrow={tf("eyebrow")}
        title={tf("title")}
        description={tf("description")}
        containerSize="wide"
        action={
          <LinkButton href="/destinations" variant="secondary">
            {t("viewAll")}
          </LinkButton>
        }
      >
        <FeaturedScroller cards={featuredCards} />
      </Section>

      <Section
        eyebrow={tt("eyebrow")}
        title={tt("title")}
        description={tt("description")}
        containerSize="wide"
        className="bg-bg-subtle"
      >
        <ThemeGrid />
      </Section>

      <Section
        eyebrow={ts("eyebrow")}
        title={ts("title")}
        description={ts("description")}
        containerSize="wide"
      >
        <Reveal>
          <SeasonSection seasons={seasonViews} />
        </Reveal>
      </Section>

      <FactsStrip />

      <ClosingCTA photoId={closing.photos[0]} alt={closing.name[l]} />
    </>
  );
}
