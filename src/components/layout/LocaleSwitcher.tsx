"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeMeta, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/** Keeps the current route when switching language, so /de/destinations/harz
 *  maps to /en/destinations/harz rather than back to the home page. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common");
  const active = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === active) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error — params are validated by the route segment itself
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className={cn(
        "inline-flex items-center rounded-full border border-current/15 p-0.5",
        pending && "opacity-60",
        className,
      )}
    >
      {locales.map((locale) => {
        const isActive = locale === active;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={isActive ? "true" : undefined}
            lang={localeMeta[locale].hrefLang}
            title={localeMeta[locale].native}
            className={cn(
              "text-2xs min-w-11 rounded-full px-3 py-1.5 font-semibold tracking-widest uppercase",
              "transition-colors duration-300",
              isActive
                ? "bg-current/12 text-current"
                : "text-current/60 hover:text-current",
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
