import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { RegionsExplorer, type RegionGroup } from "@/components/map/RegionsExplorer";
import { destinations } from "@/data/destinations";
import { regions } from "@/data/taxonomy";
import { allCards } from "@/lib/view-models";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regions" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/regions` },
  };
}

export default async function RegionsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("regions");

  const markers = allCards(l).map((card) => ({
    slug: card.slug,
    name: card.name,
    tagline: card.tagline,
    regionName: card.regionName,
    coords: card.coords,
  }));

  const groups: RegionGroup[] = regions
    .map((region) => ({
      id: region.id,
      name: region.name[l],
      blurb: region.blurb[l],
      destinations: destinations
        .filter((d) => d.region === region.id)
        .map((d) => ({ slug: d.slug, name: d.name[l], tagline: d.tagline[l] })),
    }))
    .filter((group) => group.destinations.length > 0);

  return (
    <Container size="wide" className="pt-30 pb-24 sm:pt-36">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl leading-[1.05]">{t("title")}</h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">{t("description")}</p>
      </header>

      <RegionsExplorer markers={markers} groups={groups} />
    </Container>
  );
}
