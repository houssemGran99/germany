import type { ReactNode } from "react";

/**
 * The locale layout at `app/[locale]/layout.tsx` renders <html> and <body>,
 * so this root layout only needs to pass children through.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
