import { cn } from "@/lib/cn";

type Props = React.ComponentProps<"span"> & {
  tone?: "neutral" | "forest" | "accent";
  size?: "sm" | "md";
};

const tones = {
  neutral: "bg-surface-2 text-ink-muted border-line",
  forest: "bg-forest/10 text-forest border-forest/20 dark:bg-forest/15",
  accent: "bg-accent-soft text-accent border-accent/25",
};

export function Tag({ tone = "neutral", size = "sm", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium whitespace-nowrap",
        size === "sm" ? "text-2xs px-2.5 py-1" : "px-3 py-1.5 text-xs",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
