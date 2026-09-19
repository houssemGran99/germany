import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = React.ComponentProps<"section"> & {
  /** Rendered above the heading in small caps. */
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  containerSize?: React.ComponentProps<typeof Container>["size"];
  /** Slot rendered on the right of the header on wide screens. */
  action?: React.ReactNode;
  headerClassName?: string;
};

export function Section({
  eyebrow,
  title,
  description,
  align = "left",
  containerSize = "default",
  action,
  className,
  headerClassName,
  children,
  ...props
}: Props) {
  const hasHeader = Boolean(eyebrow || title || description);
  return (
    <section className={cn("py-16 sm:py-20 lg:py-28", className)} {...props}>
      <Container size={containerSize}>
        {hasHeader && (
          <div
            className={cn(
              "mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between",
              align === "center" && "items-center text-center lg:flex-col lg:items-center",
              headerClassName,
            )}
          >
            <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
              {eyebrow && (
                <p className="mb-3 text-2xs font-semibold tracking-[0.2em] text-accent uppercase">
                  {eyebrow}
                </p>
              )}
              {title && <h2 className="text-3xl leading-[1.08]">{title}</h2>}
              {description && (
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
