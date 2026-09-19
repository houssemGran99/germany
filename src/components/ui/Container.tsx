import { cn } from "@/lib/cn";

type Props = React.ComponentProps<"div"> & {
  size?: "narrow" | "default" | "wide" | "full";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[90rem]",
  full: "max-w-none",
};

export function Container({ size = "default", className, ...props }: Props) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-10", sizes[size], className)}
      {...props}
    />
  );
}
