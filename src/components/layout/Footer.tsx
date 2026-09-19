import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    heading: "explore",
    links: [
      { href: "/destinations", key: "destinations" },
      { href: "/regions", key: "regions" },
      { href: "/gallery", key: "gallery" },
      { href: "/plan", key: "plan" },
    ],
  },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const ts = await getTranslations("site");

  return (
    <footer className="border-t border-line bg-bg-subtle">
      <Container size="wide" className="py-14 sm:py-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl">{ts("name")}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t("tagline")}</p>
          </div>

          <div className="flex gap-12 sm:gap-20">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={t(column.heading)}>
                <p className="mb-4 text-2xs font-semibold tracking-[0.2em] text-ink-faint uppercase">
                  {t(column.heading)}
                </p>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {tn(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label={t("about")}>
              <p className="mb-4 text-2xs font-semibold tracking-[0.2em] text-ink-faint uppercase">
                {t("about")}
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {tn("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#credits"
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {t("credits")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{t("builtWith")}</p>
          <p>© {new Date().getFullYear()} Schönes Deutschland</p>
        </div>
      </Container>
    </footer>
  );
}
