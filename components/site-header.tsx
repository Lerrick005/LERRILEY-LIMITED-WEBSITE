import Link from "next/link";

import styles from "./site-header.module.css";

/**
 * Site header.
 *
 * Contains:
 *   - The wordmark (typographic, Instrument Serif) on the left, linking home.
 *   - A "Start a Project" CTA on the right.
 *   - A placeholder for primary navigation, hidden for now, marked clearly.
 *
 * The full navigation menu is added in a later step, once the target pages
 * exist. We do not link to routes that do not resolve (addendum rule 7).
 *
 * The wordmark is text, not an image. It reads at every size, weighs
 * nothing, stays on-palette, and is selectable and searchable.
 */

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark} aria-label="Lerriley Limited, home">
          Lerriley
        </Link>

        {/* Primary navigation is added once the target pages exist.
            Until then, the header intentionally renders only the wordmark
            and the primary call to action. */}
        <nav className={styles.actions} aria-label="Primary">
          <Link href="/contact" className={styles.cta}>
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
