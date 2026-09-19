"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "sd-trip";
const EMPTY: string[] = [];

/* ------------------------------------------------------------------ */
/* localStorage-backed store                                           */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedValue: string[] = EMPTY;
let storageBound = false;

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((s): s is string => typeof s === "string")
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

/** Must return a referentially stable value between calls, hence the cache. */
function getSnapshot(): string[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  if (!storageBound) {
    storageBound = true;
    // Keep other tabs of the same site in sync.
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) emit();
    });
  }
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function write(next: string[]) {
  const raw = JSON.stringify(next);
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* storage unavailable — the trip still works for this session */
  }
  cachedRaw = raw;
  cachedValue = next;
  emit();
}

const subscribeReady = subscribe;
const readyOnClient = () => true;
const readyOnServer = () => false;

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

type TripContextValue = {
  /** Destination slugs, in the order the traveller saved them. */
  slugs: string[];
  /** False during server render and hydration, so the UI can avoid flicker. */
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  move: (slug: string, direction: -1 | 1) => void;
  clear: () => void;
};

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const slugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribeReady, readyOnClient, readyOnServer);

  const value = useMemo<TripContextValue>(
    () => ({
      slugs,
      ready,
      has: (slug) => slugs.includes(slug),
      toggle: (slug) =>
        write(
          slugs.includes(slug) ? slugs.filter((s) => s !== slug) : [...slugs, slug],
        ),
      remove: (slug) => write(slugs.filter((s) => s !== slug)),
      move: (slug, direction) => {
        const index = slugs.indexOf(slug);
        const target = index + direction;
        if (index < 0 || target < 0 || target >= slugs.length) return;
        const next = [...slugs];
        [next[index], next[target]] = [next[target], next[index]];
        write(next);
      },
      clear: () => write([]),
    }),
    [slugs, ready],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
}
