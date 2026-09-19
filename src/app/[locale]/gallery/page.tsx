import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { destinations } from "@/data/destinations";
import { getPhoto } from "@/lib/photos";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/gallery` },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("gallery");

  // Interleave destinations so the masonry columns do not group by place.
  const images = destinations
    .flatMap((destination) =>
      destination.photos.map((id, i) => ({ destination, id, order: i })),
    )
    .sort((a, b) => a.order - b.order)
    .map(({ destination, id }) => {
      const photo = getPhoto(id);
      if (!photo) return null;
      return {
        id: photo.id,
        src: photo.src,
        width: photo.width,
        height: photo.height,
        blurDataURL: photo.blurDataURL,
        alt: destination.name[l],
        caption: destination.name[l],
        credit: {
          author: photo.credit.author,
          license: photo.credit.license,
          sourceUrl: photo.credit.sourceUrl,
        },
      };
    })
    .filter((image) => image !== null);

  return (
    <Container size="wide" className="pt-30 pb-24 sm:pt-36">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl leading-[1.05]">{t("title")}</h1>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">{t("description")}</p>
      </header>

      <PhotoGrid images={images} layout="masonry" />
    </Container>
  );
}
