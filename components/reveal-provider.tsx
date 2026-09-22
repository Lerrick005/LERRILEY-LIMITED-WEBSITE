"use client";

import { useEffect } from "react";

/**
 * Reveal provider.
 *
 * Adds an "is-revealed" class to every element carrying the data-reveal
 * attribute once that element enters the viewport. The transition itself
 * is defined in CSS (app/globals.css). This file only toggles the class.
 *
 * Behaviour:
 *   - Elements are observed once. Once revealed, the class stays.
 *   - Under prefers-reduced-motion, the CSS short-circuits the animation
 *     and the site is fully visible without any class change.
 *   - No layout shift: elements use transform and opacity only.
 */

export function RevealProvider() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
