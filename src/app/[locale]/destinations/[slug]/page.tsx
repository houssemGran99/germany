import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { destinations, getDestination, getDestinations } from "@/data/destinations";
import { regionById, seasonById, themeById } from "@/data/taxonomy";
import { getPhoto, getPhotos } from "@/lib/photos";
import { toCard } from "@/lib/view-models";
import { SITE_URL } from "@/lib/site";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { MapLoader } from "@/components/map/MapLoader";
import { SaveToTripButton } from "@/components/trip/SaveToTripButton";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    destinations.map((d) => ({ locale, slug: d.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  const l = locale as Locale;
  const hero = getPhoto(destination.photos[0]);

  return {
    title: destination.name[l],
    description: destination.tagline[l],
    alternates: {
      canonical: `/${locale}/destinations/${slug}`,
      languages: Object.fromEntries(
        locales.map((x) => [x, `/${x}/destinations/${slug}`]),
      ),
    },
    openGraph: {
      type: "article",
      title: destination.name[l],
      description: destination.tagline[l],
      url: `/${locale}/destinations/${slug}`,
      images: hero
        ? [
            {
              url: hero.src,
              width: hero.width,
              height: hero.height,
              alt: destination.name[l],
            },
          ]
        : undefined,
    },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const destination = getDestination(slug);
  if (!destination) notFound();

  const t = await getTranslations("detail");
  const tc = await getTranslations("common");

  const region = regionById.get(destination.region);
  const photos = getPhotos(destination.photos);
  const nearby = getDestinations(destination.nearby).map((d) => toCard(d, l));
  const hero = destination.photos[0];
  const heroPhoto = getPhoto(hero);

  const galleryImages = photos.map((photo, i) => ({
    id: photo.id,
    src: photo.src,
    width: photo.width,
    height: photo.height,
    blurDataURL: photo.blurDataURL,
    alt: `${destination.name[l]} — ${i + 1}`,
    caption: destination.name[l],
    credit: {
      author: photo.credit.author,
      license: photo.credit.license,
      sourceUrl: photo.credit.sourceUrl,
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name[l],
    description: destination.story[l][0],
    url: `${SITE_URL}/${locale}/destinations/${slug}`,
    ...(heroPhoto ? { image: `${SITE_URL}${heroPhoto.src}` } : {}),
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.coords[0],
      longitude: destination.coords[1],
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: region?.name[l],
      addressCountry: "DE",
    },
    touristType: destination.themes.map((id) => themeById.get(id)?.name[l] ?? id),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- Hero ------------------------------------------------------- */}
      <header className="relative flex h-[76svh] min-h-[30rem] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            photoId={hero}
            alt={destination.name[l]}
            sizes="100vw"
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/15"
        />
        <div
          aria-hidden="true"
          className="from-bg absolute inset-x-0 bottom-0 h-32 bg-linear-to-t to-transparent"
        />

        <Container size="wide" className="relative pb-14 sm:pb-20">
          <Link
            href="/destinations"
            className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
          >
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rotate-180"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            {t("backToAll")}
          </Link>

          <p className="text-2xs mb-3 font-semibold tracking-[0.25em] text-white/70 uppercase">
            {region?.name[l]}
          </p>
          <h1 className="text-shadow-hero max-w-4xl text-5xl leading-[1] text-white">
            {destination.name[l]}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            {destination.tagline[l]}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SaveToTripButton slug={destination.slug} variant="onDark" />
            {destination.themes.map((id) => (
              <Tag
                key={id}
                size="md"
                className="border-white/25 bg-white/12 text-white backdrop-blur-sm"
              >
                {themeById.get(id)?.name[l]}
              </Tag>
            ))}
          </div>
        </Container>
      </header>

      {/* --- Story + facts ---------------------------------------------- */}
      <Container size="wide" className="py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <h2 className="sr-only">{t("story")}</h2>
            <div className="space-y-6">
              {destination.story[l].map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-ink text-lg leading-[1.75] sm:text-xl"
                      : "text-ink-muted text-base leading-[1.8]"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <InfoBlock title={t("highlights")}>
              <ul className="space-y-3">
                {destination.highlights[l].map((item) => (
                  <li
                    key={item}
                    className="text-ink-muted flex gap-3 text-sm leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-2 size-1.5 shrink-0 rounded-full"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </InfoBlock>

            <InfoBlock title={t("bestSeason")}>
              <div className="flex flex-wrap gap-2">
                {destination.bestSeasons.map((id) => (
                  <Tag key={id} tone="accent" size="md">
                    {seasonById.get(id)?.name[l]}
                  </Tag>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock title={t("gettingThere")}>
              <p className="text-ink-muted text-sm leading-relaxed">
                {destination.gettingThere[l]}
              </p>
            </InfoBlock>

            <InfoBlock title={t("coordinates")}>
              <p className="text-ink-muted font-mono text-sm">
                {destination.coords[0].toFixed(4)}° N,{" "}
                {destination.coords[1].toFixed(4)}° E
              </p>
            </InfoBlock>
          </Reveal>
        </div>
      </Container>

      {/* --- Gallery ----------------------------------------------------- */}
      {galleryImages.length > 0 && (
        <Section
          title={t("gallery")}
          containerSize="wide"
          className="bg-bg-subtle py-16 sm:py-20"
        >
          <PhotoGrid images={galleryImages} layout="grid" />
          <p className="text-ink-faint mt-6 text-xs">
            {tc("photoBy", {
              author: photos.map((p) => p.credit.author).join(", "),
            })}
          </p>
        </Section>
      )}

      {/* --- Map --------------------------------------------------------- */}
      <Section title={t("onTheMap")} containerSize="wide">
        <MapLoader
          markers={[
            {
              slug: destination.slug,
              name: destination.name[l],
              tagline: destination.tagline[l],
              regionName: region?.name[l] ?? "",
              coords: destination.coords,
            },
            ...nearby.map((card) => ({
              slug: card.slug,
              name: card.name,
              tagline: card.tagline,
              regionName: card.regionName,
              coords: card.coords,
            })),
          ]}
          center={destination.coords}
          zoom={8}
          ariaLabel={`${t("onTheMap")} — ${destination.name[l]}`}
          className="h-[24rem] sm:h-[30rem]"
        />
      </Section>

      {/* --- Nearby ------------------------------------------------------ */}
      {nearby.length > 0 && (
        <Section title={t("nearby")} containerSize="wide" className="pt-0">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((card, i) => (
              <Reveal as="li" key={card.slug} delay={i * 0.08}>
                <DestinationCard card={card} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-line bg-surface shadow-soft-sm rounded-3xl border p-6 sm:p-7">
      <h2 className="text-2xs text-ink-faint mb-4 font-semibold tracking-[0.2em] uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
