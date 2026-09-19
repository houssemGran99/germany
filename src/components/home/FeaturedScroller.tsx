"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { cn } from "@/lib/cn";
import type { DestinationCard as CardData } from "@/lib/view-models";

/** Horizontal snap scroller with arrow controls on pointer devices. */
export function FeaturedScroller({ cards }: { cards: CardData[] }) {
  const t = useTranslations("featured");
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function scrollBy(direction: -1 | 1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({
      left: direction * Math.round(el.clientWidth * 0.8),
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      <ul
        ref={ref}
        aria-label={t("list")}
        className={cn(
          "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2",
          "sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10",
        )}
      >
        {cards.map((card, i) => (
          <li
            key={card.slug}
            className="w-[76vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26rem]"
          >
            <DestinationCard
              card={card}
              variant="hero"
              priority={i < 2}
              sizes="(min-width: 1024px) 26rem, (min-width: 640px) 42vw, 76vw"
            />
          </li>
        ))}
      </ul>

      <div className="mt-6 hidden justify-end gap-2 sm:flex">
        <ScrollButton
          label={t("scrollLeft")}
          disabled={atStart}
          onClick={() => scrollBy(-1)}
          direction="left"
        />
        <ScrollButton
          label={t("scrollRight")}
          disabled={atEnd}
          onClick={() => scrollBy(1)}
          direction="right"
        />
      </div>
    </div>
  );
}

function ScrollButton({
  label,
  disabled,
  onClick,
  direction,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "border-line inline-flex size-11 items-center justify-center rounded-full border",
        "bg-surface text-ink hover:border-line-strong hover:bg-surface-2 transition-all duration-300",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={direction === "left" ? "rotate-180" : undefined}
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
