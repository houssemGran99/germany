import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container
      size="narrow"
      className="flex min-h-[70svh] flex-col justify-center py-32 text-center"
    >
      <p className="text-accent font-serif text-6xl leading-none">404</p>
      <h1 className="mt-6 text-4xl">{t("title")}</h1>
      <p className="text-ink-muted mx-auto mt-5 max-w-md text-base leading-relaxed">
        {t("description")}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <LinkButton href="/">{t("home")}</LinkButton>
        <LinkButton href="/destinations" variant="secondary">
          {t("destinations")}
        </LinkButton>
      </div>
    </Container>
  );
}
