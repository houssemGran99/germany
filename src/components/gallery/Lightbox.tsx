"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export type LightboxImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
  caption?: string;
  credit?: { author: string; license: string; sourceUrl: string };
};

type Props = {
  images: LightboxImage[];
  /** null closes the lightbox. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

const SWIPE_THRESHOLD = 60;

export function Lightbox({ images, index, onIndexChange }: Props) {
  const t = useTranslations("gallery");
  const tc = useTranslations("common");
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => onIndexChange(null), [onIndexChange]);

  const step = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      } else if (event.key === "Tab") {
        // Simple focus trap over the dialog's own controls.
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
        if (!focusables?.length) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [open, close, step]);

  const image = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col bg-black/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.1 : 0.25 }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("lightbox")}
            tabIndex={-1}
            className="flex h-full flex-col outline-none"
            onTouchStart={(e) => {
              touchStart.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStart.current;
              if (Math.abs(delta) > SWIPE_THRESHOLD) step(delta < 0 ? 1 : -1);
              touchStart.current = null;
            }}
          >
            <div className="flex items-center justify-between gap-4 p-3 sm:p-5">
              <p aria-live="polite" className="text-xs text-white/60">
                {t("imageCount", { current: index + 1, total: images.length })}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label={tc("close")}
                className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
              {images.length > 1 && (
                <NavButton side="left" label={tc("previous")} onClick={() => step(-1)} />
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.99 }}
                  transition={{ duration: reduce ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex h-full w-full items-center justify-center"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    sizes="100vw"
                    className="max-h-full w-auto max-w-full rounded-lg object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <NavButton side="right" label={tc("next")} onClick={() => step(1)} />
              )}
            </div>

            <div className="p-4 text-center sm:p-6">
              <p className="text-sm text-white/90">{image.caption ?? image.alt}</p>
              {image.credit && (
                <p className="mt-1.5 text-xs text-white/50">
                  {tc("photoBy", { author: image.credit.author })} ·{" "}
                  <a
                    href={image.credit.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline underline-offset-3 hover:text-white/80"
                  >
                    {image.credit.license}
                  </a>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center",
        "rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/22",
        side === "left" ? "left-1 sm:left-4" : "right-1 sm:right-4",
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={side === "left" ? "rotate-180" : undefined}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
