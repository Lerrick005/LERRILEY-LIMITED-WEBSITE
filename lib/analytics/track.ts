import type { AnalyticsEvent } from "./events";

/**
 * Analytics tracker.
 *
 * Every event the site emits goes through this function. It dispatches to
 * whichever provider is configured, and always logs to the console in
 * development so events can be verified without a live provider.
 *
 * The tracker is a no-op in the following cases:
 *   - Server-side rendering (window is undefined)
 *   - The user has enabled Do Not Track
 *
 * The tracker never throws. A failed analytics call must never break the
 * user's interaction with the page.
 *
 * Provider integration:
 *   - Plausible: window.plausible(eventName, { props })
 *   - GA4:       window.gtag("event", eventName, params)
 *   - Neither:   console only (development), silent (production)
 */

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, unknown> },
    ) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

type Provider = "plausible" | "ga4" | "none";

function detectProvider(): Provider {
  if (typeof window === "undefined") return "none";
  if (typeof window.plausible === "function") return "plausible";
  if (typeof window.gtag === "function") return "ga4";
  return "none";
}

function isDntEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack === "1"
  );
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const isDev = process.env.NODE_ENV === "development";

  if (isDntEnabled()) {
    if (isDev) {
      console.info("[analytics] suppressed (Do Not Track):", event);
    }
    return;
  }

  const provider = detectProvider();
  const { name, ...props } = event;

  try {
    if (provider === "plausible" && window.plausible) {
      window.plausible(name, { props });
    } else if (provider === "ga4" && window.gtag) {
      window.gtag("event", name, props);
    }

    if (isDev) {
      console.info("[analytics]", name, props);
    }
  } catch {
    /* Analytics must never break the interaction. */
  }
}
