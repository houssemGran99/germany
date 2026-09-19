import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Fraunces, Inter } from "next/font/google";

import { routing, locales, localeMeta, type Locale } from "@/i18n/routing";
import { buildSearchIndex } from "@/lib/search-index";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { TripProvider } from "@/components/trip/TripProvider";
import { SITE_URL } from "@/lib/site";

import "../globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${t("name")} — ${t("tagline")}`,
      template: `%s · ${t("name")}`,
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [localeMeta[l].hrefLang, `/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: t("name"),
      title: `${t("name")} — ${t("tagline")}`,
      description: t("description"),
      locale: locale === "de" ? "de_DE" : "en_GB",
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} — ${t("tagline")}`,
      description: t("description"),
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
      apple: "/icons/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "common" });
  const searchIndex = buildSearchIndex(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <meta
          name="theme-color"
          content="#f7f4ee"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0e1512"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        <NextIntlClientProvider>
          <TripProvider>
            <a
              href="#main"
              className="bg-forest-block text-on-forest-block sr-only rounded-full px-5 py-3 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
            >
              {t("skipToContent")}
            </a>
            <ScrollProgress />
            <Header searchIndex={searchIndex} />
            <main id="main">{children}</main>
            <Footer />
          </TripProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
