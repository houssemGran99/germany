"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { useTrip } from "./TripProvider";
import { cn } from "@/lib/cn";

type Props = {
  slug: string;
  variant?: "solid" | "onDark";
  className?: string;
};

export function SaveToTripButton({ slug, variant = "solid", className }: Props) {
  const t = useTranslations("trip");
  const { has, toggle, ready } = useTrip();
  const reduce = useReducedMotion();
  const saved = has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      disabled={!ready}
      className={cn(
        "inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 text-sm font-medium",
        "transition-all duration-300 active:scale-[0.98] disabled:opacity-60",
        variant === "onDark"
          ? saved
            ? "text-forest-deep bg-white"
            : "border border-white/35 bg-white/12 text-white backdrop-blur-md hover:bg-white/22"
          : saved
            ? "bg-accent text-on-accent"
            : "border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-2 border",
        className,
      )}
    >
      <motion.span
        key={String(saved)}
        initial={{ scale: reduce ? 1 : 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0.1 : 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="grid place-items-center"
        aria-hidden="true"
      >
        {saved ? <CheckIcon /> : <PlusIcon />}
      </motion.span>
      {saved ? t("saved") : t("save")}
    </button>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  );
}
