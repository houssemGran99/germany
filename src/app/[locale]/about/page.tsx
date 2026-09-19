import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { destinations } from "@/data/destinations";
import { allPhotos } from "@/lib/photos";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("about");

  // Which destination each photo is used for, so credits are traceable.
  const usedBy = new Map<string, { slug: string; name: string }>();
  for (const destination of destinations) {
    for (const id of destination.photos) {
      if (!usedBy.has(id)) {
        usedBy.set(id, { slug: destination.slug, name: destination.name[l] });
      }
    }
  }

  return (
    <Container size="default" className="pt-30 pb-24 sm:pt-36">
      <header className="max-w-2xl">
        <h1 className="text-4xl leading-[1.05]">{t("title")}</h1>
        <p className="text-ink-muted mt-6 text-lg leading-relaxed">{t("intro")}</p>
      </header>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:gap-14">
        <Prose title={t("photosTitle")} body={t("photosBody")} />
        <Prose title={t("dataTitle")} body={t("dataBody")} />
        <Prose title={t("techTitle")} body={t("techBody")} />
      </div>

      <section id="credits" className="mt-20 scroll-mt-24">
        <h2 className="text-2xl">{t("photosTitle")}</h2>
        <ul className="divide-line border-line mt-8 divide-y border-y">
          {allPhotos.map((photo) => {
            const used = usedBy.get(photo.id);
            return (
              <li
                key={photo.id}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <span className="bg-surface-2 relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-16">
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="80px"
                    placeholder="blur"
                    blurDataURL={photo.blurDataURL}
                    className="object-cover"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-ink text-sm font-medium">
                    {t("photographer")}: {photo.credit.author}
                  </p>
                  <p className="text-ink-muted mt-1 text-xs">
                    {t("license")}:{" "}
                    <a
                      href={photo.credit.licenseUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-ink underline underline-offset-3"
                    >
                      {photo.credit.license}
                    </a>
                    {" · "}
                    <a
                      href={photo.credit.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-ink underline underline-offset-3"
                    >
                      {photo.credit.source}
                    </a>
                  </p>
                </div>

                {used && (
                  <p className="text-ink-faint shrink-0 text-xs">
                    {t("usedFor")}:{" "}
                    <Link
                      href={`/destinations/${used.slug}`}
                      className="hover:text-ink underline underline-offset-3"
                    >
                      {used.name}
                    </Link>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}

function Prose({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="text-2xs text-accent font-semibold tracking-[0.2em] uppercase">
        {title}
      </h2>
      <p className="text-ink-muted mt-4 text-sm leading-[1.8]">{body}</p>
    </section>
  );
}
