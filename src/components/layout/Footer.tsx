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
    <footer className="border-line bg-bg-subtle border-t">
      <Container size="wide" className="py-14 sm:py-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl">{ts("name")}</p>
            <p className="text-ink-muted mt-3 text-sm leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div className="flex gap-12 sm:gap-20">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={t(column.heading)}>
                <p className="text-2xs text-ink-faint mb-4 font-semibold tracking-[0.2em] uppercase">
                  {t(column.heading)}
                </p>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-ink-muted hover:text-ink text-sm transition-colors"
                      >
                        {tn(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label={t("about")}>
              <p className="text-2xs text-ink-faint mb-4 font-semibold tracking-[0.2em] uppercase">
                {t("about")}
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-ink-muted hover:text-ink text-sm transition-colors"
                  >
                    {tn("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#credits"
                    className="text-ink-muted hover:text-ink text-sm transition-colors"
                  >
                    {t("credits")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-line text-ink-faint mt-14 flex flex-col gap-4 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{t("builtWith")}</p>
          <p>© {new Date().getFullYear()} Schönes Deutschland</p>
        </div>
      </Container>
    </footer>
  );
}
