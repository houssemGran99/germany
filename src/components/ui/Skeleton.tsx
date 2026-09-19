import { cn } from "@/lib/cn";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-2xl bg-surface-2 motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-4/5 w-full" />
      <Skeleton className="h-3.5 w-2/3 rounded-full" />
      <Skeleton className="h-3 w-1/3 rounded-full" />
    </div>
  );
}
