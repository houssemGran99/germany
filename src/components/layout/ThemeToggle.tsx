"use client";

import { useTranslations } from "next-intl";
import { setThemeMode, useThemeMode } from "@/lib/client-store";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("common");
  const mode = useThemeMode();
  const nextMode = mode === "dark" ? "light" : "dark";
  const nextLabel = mode === "dark" ? t("themeLight") : t("themeDark");

  return (
    <button
      type="button"
      onClick={() => setThemeMode(nextMode)}
      aria-label={t("toggleTheme", { mode: nextLabel })}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-full",
        "text-current transition-colors duration-300 hover:bg-current/10",
        className,
      )}
    >
      <span aria-hidden="true">{mode === "dark" ? <SunIcon /> : <MoonIcon />}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    </svg>
  );
}
