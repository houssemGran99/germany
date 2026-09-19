"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  href: React.ComponentProps<typeof Link>["href"];
  children: React.ReactNode;
  className?: string;
};

/** CTA that leans towards the cursor. Falls back to a static button for
 *  touch input and for anyone who prefers reduced motion. */
export function MagneticButton({ href, children, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function onMove(event: React.PointerEvent) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setOffset({
      x: (event.clientX - (rect.left + rect.width / 2)) * 0.25,
      y: (event.clientY - (rect.top + rect.height / 2)) * 0.35,
    });
  }

  return (
    <motion.div
      animate={offset}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={() => setOffset({ x: 0, y: 0 })}
        className={cn(
          "inline-flex min-h-14 items-center gap-3 rounded-full bg-accent px-9 text-base font-medium text-on-accent",
          "shadow-soft-lg transition-colors duration-300 hover:bg-accent-bright",
          className,
        )}
      >
        {children}
        <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </motion.div>
  );
}
