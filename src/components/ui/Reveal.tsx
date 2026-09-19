"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Starting offset in pixels. */
  y?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Scroll-triggered fade + rise.
 *
 * Deliberately CSS-driven rather than JS-animated: the hidden state only
 * applies under `.js` (set before paint by ThemeScript), so without
 * JavaScript — or before hydration — the content is simply visible. The
 * observer just flips a data attribute; `prefers-reduced-motion` is handled
 * in CSS.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as: Comp = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Comp
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      data-visible="false"
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Comp>
  );
}
