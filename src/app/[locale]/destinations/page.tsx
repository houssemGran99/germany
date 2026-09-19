import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { DestinationsExplorer } from "@/components/destinations/DestinationsExplorer";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { allCards } from "@/lib/view-models";
import { regions, seasons, themes } from "@/data/taxonomy";
import { locales, type Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "destinations" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/destinations` },
  };
}

export default async function DestinationsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations("destinations");

  return (
    <Container size="wide" className="pt-30 pb-24 sm:pt-36">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl leading-[1.05]">{t("title")}</h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">
          {t("description")}
        </p>
      </header>

      {/* The explorer reads its initial filters from the query string, which
          needs a Suspense boundary for the page to stay statically rendered. */}
      <Suspense
        fallback={
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <DestinationsExplorer
          cards={allCards(l)}
          regions={regions.map((r) => ({ id: r.id, label: r.name[l] }))}
          themes={themes.map((x) => ({ id: x.id, label: x.name[l] }))}
          seasons={seasons.map((s) => ({ id: s.id, label: s.name[l] }))}
        />
      </Suspense>
    </Container>
  );
}
