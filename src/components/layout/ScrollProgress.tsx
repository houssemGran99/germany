"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

/** Thin amber bar under the header showing how far down the page you are. */
export function ScrollProgress() {
  const t = useTranslations("common");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      title={t("scrollProgress")}
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
      className="from-accent to-accent-bright pointer-events-none fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-linear-to-r"
    />
  );
}
