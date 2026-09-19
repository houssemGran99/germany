# Schönes Deutschland

An immersive, bilingual travel guide to Germany — sixteen destinations told with
large photography, long-form copy and calm motion. A static Next.js site: no
backend, no CMS, no tracking.

![Home](public/images/destinations/neuschwanstein-hero.jpg)

---

## Getting started

```bash
npm install
npm run images   # downloads + optimises the photography (first run only)
npm run dev
```

Then open <http://localhost:3000> — you will be redirected to `/en`.

> `npm run images` needs network access to Wikipedia and Wikimedia Commons. The
> repository already contains the optimised files, so you only need it when
> adding or changing photos.

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build (static export of every locale + destination) |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint (`eslint-config-next`, flat config) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier, including Tailwind class sorting |
| `npm run images` | Fetches, credits and optimises the photography |

---

## Tech

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS v4, CSS-first design tokens |
| Motion | Framer Motion (`motion/react`), reduced-motion aware throughout |
| i18n | `next-intl` — English (default) and German under `/[locale]` |
| Maps | Leaflet + react-leaflet, OpenStreetMap tiles (no API key) |
| Images | `next/image`, locally optimised files, blur-up placeholders |
| Content | Typed local data files — no database |

---

## Structure

```
scripts/
  photo-sources.mjs        Photo id → Wikipedia article manifest
  fetch-images.mjs         Downloads, credits, optimises, writes photos.generated.ts

src/
  app/
    layout.tsx             Root passthrough (the locale layout owns <html>)
    not-found.tsx          For paths that never reach a locale
    manifest.ts            PWA manifest
    robots.ts  sitemap.ts  SEO routes
    [locale]/
      layout.tsx           <html>, fonts, metadata, header/footer, providers
      page.tsx             Home
      destinations/        List + [slug] detail pages
      regions/             Map + region list
      gallery/             Masonry gallery
      plan/                Trip planner
      about/               About and photo credits
      not-found.tsx        Localised 404

  components/
    ui/                    Button, Container, Section, Tag, Skeleton, Reveal,
                           SmartImage, MagneticButton
    layout/                Header, Footer, ThemeScript, ThemeToggle,
                           LocaleSwitcher, ScrollProgress
    home/                  Hero, FeaturedScroller, ThemeGrid, SeasonSection,
                           FactsStrip, ClosingCTA
    destinations/          DestinationCard, DestinationsExplorer
    gallery/               PhotoGrid, Lightbox
    map/                   MapView, MapLoader, RegionsExplorer, map.css
    search/                CommandPalette (⌘K / Ctrl-K)
    trip/                  TripProvider, SaveToTripButton, TripPlanner

  data/
    types.ts               Destination, Photo, Region, Theme, Season, Fact
    destinations/          bavaria · southwest · west · east · north + index
    taxonomy.ts            Regions, themes, seasons, facts
    photos.generated.ts    Generated — do not edit

  i18n/                    routing, navigation, request config
  messages/                en.json, de.json
  lib/                     cn, geo, photos, search-index, view-models,
                           client-store, site
```

---

## Design tokens

Everything lives in `src/app/globals.css`: raw values on `:root` and
`[data-theme="dark"]`, mapped into Tailwind through `@theme inline`.

| Token group | Notes |
| --- | --- |
| `bg`, `bg-subtle`, `surface`, `surface-2` | Warm off-white → deep forest-black |
| `ink`, `ink-muted`, `ink-faint` | Text, all AA or better on their surfaces |
| `forest`, `forest-soft`, `forest-deep` | Brand colour for **text and accents** — flips light in dark mode |
| `forest-block`, `on-forest-block` | Brand colour for **filled surfaces** — stays deep in both themes so text on top keeps contrast |
| `accent`, `accent-bright`, `accent-soft`, `on-accent` | Amber, inspired by autumn light |
| `line`, `line-strong` | Borders |
| `--text-2xs … --text-6xl` | Fluid `clamp()` scale |
| `--shadow-soft-*` | Layered shadows, retuned for dark mode |

Spacing follows an 8px rhythm (Tailwind's 4px scale in even steps). Cards use
`rounded-3xl`; the header and overlays use the `.glass` utility.

Theme resolution happens in `ThemeScript`, which runs before paint and always
writes an explicit `data-theme` onto `<html>` — no flash, and the `dark:`
variant has a single source of truth.

---

## Adding a new destination

1. **Write the content.** Add an entry to the right file in
   `src/data/destinations/` (or create a new regional file and import it in
   `index.ts`). Every text field is `{ en, de }`:

   ```ts
   {
     slug: "spreewald",
     name: { en: "The Spreewald", de: "Der Spreewald" },
     tagline: { en: "…", de: "…" },
     region: "berlin-brandenburg",     // must exist in taxonomy.ts
     themes: ["forests"],              // one or more ThemeId
     bestSeasons: ["summer"],
     coords: [51.8667, 14.0],          // [lat, lng]
     story: { en: ["¶1", "¶2", "¶3"], de: [...] },
     highlights: { en: [...], de: [...] },
     gettingThere: { en: "…", de: "…" },
     nearby: ["berlin"],               // other slugs
     photos: ["spreewald-hero", "spreewald-2", "spreewald-3"],
   }
   ```

2. **Add the photos.** Put the same ids in `scripts/photo-sources.mjs`, each
   pointing at an English Wikipedia article whose lead image you want:

   ```js
   { id: "spreewald-hero", article: "Spreewald" },
   ```

3. **Fetch them.** `npm run images` downloads the originals, records the
   photographer and licence from Wikimedia Commons, resizes to 2400px, writes
   `src/data/photos.generated.ts` and lists anything it could not get in
   `IMAGE-TODO.md`.

4. That is it. The destination now appears in the grid, the search palette, the
   map, the gallery, the sitemap and the credits page automatically, and gets a
   statically generated detail page in both locales.

**If a photo cannot be fetched**, nothing breaks: `SmartImage` renders a
gradient placeholder and the id is listed in `IMAGE-TODO.md` with the reason.

### Adding a language

1. Add the code to `locales` and `localeMeta` in `src/i18n/routing.ts`.
2. Copy `src/messages/en.json` to `src/messages/<code>.json` and translate it.
3. Add the locale key to every `Localized` field in `src/data/`.
4. Update the `matcher` in `src/proxy.ts`.

TypeScript will point at every field that still needs the new locale.

---

## Photography and licensing

Every photograph comes from **Wikimedia Commons**. The fetch script records the
photographer, licence name, licence URL and source page for each file, and those
are rendered on `/about#credits` and inside the lightbox. Files are downloaded
and optimised locally — nothing is hotlinked.

Map tiles come from **OpenStreetMap**, credited in the map's attribution
control. Dark mode filters the tile pane in CSS, since OSM publishes no dark
raster style.

---

## Accessibility and performance notes

- Semantic landmarks, a skip link, visible focus rings, and 44px minimum touch
  targets on every interactive control.
- The map has an `application` role with a label, and the region list below it is
  a fully keyboard-navigable equivalent.
- The lightbox traps focus, supports `←`/`→`/`Esc` and swipe, and restores focus
  on close.
- Every animation is gated on `prefers-reduced-motion`, both in CSS and via
  Framer Motion's `useReducedMotion`.
- Leaflet and the lightbox are dynamically imported, so neither is in the
  initial bundle.
- Destination pages are statically generated for both locales at build time.
