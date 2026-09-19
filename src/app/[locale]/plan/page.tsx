import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { TripPlanner } from "@/components/trip/TripPlanner";
import { allCards } from "@/lib/view-models";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trip" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/plan` },
    robots: { index: false },
  };
}

export default async function PlanPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("trip");

  return (
    <Container size="wide" className="pt-30 pb-24 sm:pt-36">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl leading-[1.05]">{t("title")}</h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">{t("description")}</p>
      </header>

      <TripPlanner cards={allCards(locale as Locale)} />
    </Container>
  );
}
