import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { facts } from "@/data/taxonomy";
import type { Locale } from "@/i18n/routing";

export async function FactsStrip() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("facts");

  return (
    <section className="border-line bg-forest-block text-on-forest-block border-y">
      <Container size="wide" className="py-14 sm:py-20">
        <p className="text-2xs text-accent-bright mb-2 font-semibold tracking-[0.3em] uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="text-on-forest-block mb-10 text-2xl sm:mb-14">{t("title")}</h2>

        <ul className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal
              as="li"
              key={fact.id}
              delay={i * 0.06}
              className="border-on-forest-block/20 w-[72vw] shrink-0 border-t pt-5 sm:w-auto"
            >
              <p className="text-accent-bright font-serif text-4xl leading-none">
                {fact.value[locale]}
              </p>
              <p className="text-on-forest-block/75 mt-3 text-sm leading-relaxed">
                {fact.label[locale]}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
