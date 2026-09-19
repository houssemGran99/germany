import { Link } from "@/i18n/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import type { DestinationCard as CardData } from "@/lib/view-models";

type Props = {
  card: CardData;
  /** `hero` is taller and used in the featured scroller. */
  variant?: "default" | "hero" | "compact";
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const ratios = {
  default: "aspect-4/5",
  hero: "aspect-3/4 sm:aspect-4/5",
  compact: "aspect-3/2",
};

export function DestinationCard({
  card,
  variant = "default",
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw",
  priority,
  className,
}: Props) {
  return (
    <Link
      href={`/destinations/${card.slug}`}
      className={cn(
        "group block focus-visible:outline-none",
        "focus-visible:[&>div]:ring-2 focus-visible:[&>div]:ring-accent focus-visible:[&>div]:ring-offset-3 focus-visible:[&>div]:ring-offset-bg",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl bg-surface-2 shadow-soft-sm",
          "transition-shadow duration-500 group-hover:shadow-soft-lg",
          ratios[variant],
        )}
      >
        <SmartImage
          photoId={card.photoId}
          alt={card.name}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06] motion-reduce:transform-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="mb-2 text-2xs font-semibold tracking-[0.18em] text-white/70 uppercase">
            {card.regionName}
          </p>
          <h3 className="font-serif text-xl leading-tight text-white sm:text-2xl">
            {card.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-white/75">
            {card.tagline}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {card.themeNames.map((name) => (
              <Tag
                key={name}
                className="border-white/25 bg-white/12 text-white backdrop-blur-sm"
              >
                {name}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
