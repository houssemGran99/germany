"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useTranslations } from "next-intl";
import { SmartImage } from "@/components/ui/SmartImage";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SLIDE_MS = 7000;

export type HeroSlide = {
  photoId: string;
  alt: string;
};

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "36%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [reduce, slides.length]);

  const current = slides[index] ?? slides[0];

  return (
    <section
      ref={ref}
      aria-label={t("slideshow")}
      className="relative flex h-[100svh] min-h-[34rem] flex-col justify-end overflow-hidden"
    >
      <motion.div
        style={{ y: reduce ? undefined : imageY }}
        className="absolute inset-0 -bottom-[18%]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current.photoId}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: reduce ? 0.2 : 1.6, ease: "easeInOut" },
              scale: { duration: reduce ? 0 : SLIDE_MS / 1000 + 2, ease: "linear" },
            }}
          >
            <SmartImage
              photoId={current.photoId}
              alt={current.alt}
              priority={index === 0}
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Legibility scrim — bottom-left weighted, so the sky keeps its colour
          while the headline stays above AA contrast on any photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/60 via-black/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-bg to-transparent sm:h-40"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-[90rem] px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-32"
      >
        <p
          style={{ animationDelay: "0.1s" }}
          className="animate-rise mb-5 text-2xs font-semibold tracking-[0.3em] text-white/75 uppercase"
        >
          {t("eyebrow")}
        </p>

        <h1
          style={{ animationDelay: "0.18s" }}
          className="animate-rise text-shadow-hero max-w-4xl text-5xl leading-[0.98] text-white"
        >
          {t("headline")}
        </h1>

        <p
          style={{ animationDelay: "0.3s" }}
          className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {t("subline")}
        </p>

        <div
          style={{ animationDelay: "0.42s" }}
          className="animate-rise mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <LinkButton href="/destinations" size="lg" variant="primary">
            {t("cta")}
          </LinkButton>
          <LinkButton href="/regions" size="lg" variant="onDark">
            {t("ctaSecondary")}
          </LinkButton>
        </div>

        {slides.length > 1 && (
          <div className="mt-10 flex items-center gap-2.5">
            {slides.map((slide, i) => (
              <button
                key={slide.photoId}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t("slideLabel", { current: i + 1, total: slides.length })}
                aria-current={i === index}
                className="group grid h-11 place-items-center"
              >
                <span
                  className={cn(
                    "h-[3px] rounded-full transition-all duration-500",
                    i === index
                      ? "w-10 bg-white"
                      : "w-5 bg-white/40 group-hover:bg-white/70",
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <motion.span
        aria-hidden="true"
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="absolute right-4 bottom-6 hidden items-center gap-2 text-2xs tracking-[0.25em] text-white/60 uppercase sm:right-6 sm:flex lg:right-10"
      >
        {t("scrollHint")}
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-white/40"
        />
      </motion.span>
    </section>
  );
}
