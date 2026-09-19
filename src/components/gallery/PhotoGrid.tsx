"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";
import type { LightboxImage } from "./Lightbox";

// The lightbox is only needed once someone opens an image.
const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), {
  ssr: false,
  loading: () => null,
});

type Props = {
  images: LightboxImage[];
  /** `masonry` uses CSS columns; `grid` keeps a uniform row rhythm. */
  layout?: "masonry" | "grid";
  className?: string;
};

export function PhotoGrid({ images, layout = "masonry", className }: Props) {
  const t = useTranslations("gallery");
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-4/3 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <ul
        className={cn(
          layout === "masonry"
            ? "columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {images.map((image, i) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t("openImage", { name: image.alt })}
              className="group bg-surface-2 shadow-soft-sm hover:shadow-soft-lg relative block w-full overflow-hidden rounded-2xl transition-shadow duration-500"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={image.blurDataURL}
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                className={cn(
                  "w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)]",
                  "group-hover:scale-[1.05] motion-reduce:transform-none",
                  layout === "grid" && "aspect-4/3",
                )}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-xs text-white opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {image.caption ?? image.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox images={images} index={index} onIndexChange={setIndex} />
    </>
  );
}
