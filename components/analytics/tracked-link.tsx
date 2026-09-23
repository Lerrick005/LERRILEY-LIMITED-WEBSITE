"use client";

import type { ReactNode } from "react";

import { track } from "@/lib/analytics/track";
import type { AnalyticsEvent } from "@/lib/analytics/events";

/**
 * TrackedLink.
 *
 * Wraps an anchor element and emits an analytics event on click. The
 * event is dispatched before navigation, and the tracker never throws,
 * so the link always works whether analytics is loaded or not.
 *
 * Usage:
 *   <TrackedLink
 *     href="/contact"
 *     event={{ name: "cta_click", location: "hero", label: "Start a Project", intent: "start-project" }}
 *   >
 *     Start a Project
 *   </TrackedLink>
 */

export function TrackedLink({
  href,
  event,
  className,
  children,
  external,
}: {
  href: string;
  event: AnalyticsEvent;
  className?: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={className}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onClick={() => track(event)}
    >
      {children}
    </a>
  );
}
