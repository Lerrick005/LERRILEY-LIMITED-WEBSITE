"use client";

import { useEffect } from "react";

import { captureAttribution } from "@/lib/analytics/attribution";
import { loadAnalytics } from "@/lib/analytics/provider";

/**
 * Analytics provider.
 *
 * Mounted once in the root layout. On first render it:
 *   1. Loads the configured analytics script (production only).
 *   2. Captures first-touch attribution into sessionStorage.
 *
 * Renders nothing. It is a client component because both actions touch
 * browser APIs that do not exist on the server.
 */

export function AnalyticsProvider() {
  useEffect(() => {
    loadAnalytics();
    captureAttribution();
  }, []);

  return null;
}
