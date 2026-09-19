import { getTranslations } from "next-intl/server";
import { SmartImage } from "@/components/ui/SmartImage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export async function ClosingCTA({ photoId, alt }: { photoId: string; alt: string }) {
  const t = await getTranslations("closing");

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          photoId={photoId}
          alt={alt}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div aria-hidden="true" className="bg-forest-deep/72 absolute inset-0" />
      </div>

      <Container size="narrow" className="py-24 text-center sm:py-36">
        <Reveal>
          <h2 className="text-4xl text-white">{t("title")}</h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/80">
            {t("description")}
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/plan">{t("cta")}</MagneticButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
