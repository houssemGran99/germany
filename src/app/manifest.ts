import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Schönes Deutschland",
    short_name: "Schönes DE",
    description:
      "An immersive guide to Germany's castles, alps, forests, coasts and historic cities.",
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#1b3a2f",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
