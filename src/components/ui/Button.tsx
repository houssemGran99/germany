import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest-block text-on-forest-block hover:bg-forest-block-hover shadow-soft-sm hover:shadow-soft-md",
  secondary:
    "bg-surface text-ink border border-line hover:border-line-strong hover:bg-surface-2 shadow-soft-sm",
  ghost: "text-ink hover:bg-surface-2",
  onDark:
    "bg-white/12 text-white border border-white/30 backdrop-blur-md hover:bg-white/22",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
  "transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50 select-none";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type LinkButtonProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}
