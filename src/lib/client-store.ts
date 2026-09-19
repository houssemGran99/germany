"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a value that only exists in the browser without setting state in an
 * effect. `serverValue` is what gets rendered on the server and during
 * hydration, then React swaps in the real value.
 */
export function useClientValue<T>(getSnapshot: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, getSnapshot, () => serverValue);
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** The theme currently applied to <html>, kept in sync with the toggle. */
export function useThemeMode(): "light" | "dark" {
  return useSyncExternalStore(subscribeTheme, readTheme, () => "light");
}

export function setThemeMode(mode: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", mode);
  try {
    localStorage.setItem("sd-theme", mode);
  } catch {
    /* private mode — the change still applies to this page view */
  }
}
