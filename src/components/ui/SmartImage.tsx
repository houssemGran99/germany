import Image from "next/image";
import { cn } from "@/lib/cn";
import { getPhoto } from "@/lib/photos";

type Props = {
  photoId: string;
  alt: string;
  /** Passed straight to next/image. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Renders the image filling its (positioned) parent. */
  fill?: boolean;
};

/**
 * next/image wrapper that falls back to a gradient placeholder when a photo
 * could not be fetched, so the layout never shows a broken image.
 */
export function SmartImage({
  photoId,
  alt,
  sizes,
  className,
  imgClassName,
  priority,
  fill = true,
}: Props) {
  const photo = getPhoto(photoId);

  if (!photo) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("gradient-placeholder", fill ? "absolute inset-0" : "w-full", className)}
      />
    );
  }

  return (
    <Image
      src={photo.src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      {...(fill
        ? { fill: true }
        : { width: photo.width, height: photo.height })}
      className={cn("object-cover", imgClassName, className)}
    />
  );
}
