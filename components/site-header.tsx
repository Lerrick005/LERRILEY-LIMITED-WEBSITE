import Image from "next/image";
import Link from "next/link";

import styles from "./site-header.module.css";

/**
 * Site header.
 *
 * Contains the Lerriley emblem on the left (transparent PNG), a stacked
 * wordmark beside it, a small navigation set, and the primary call to
 * action on the right.
 *
 * The emblem carries the brand mark. The wordmark beside it carries the
 * name, so the company is identifiable even when the emblem's internal
 * text is not legible at small sizes.
 *
 * Only links to routes that exist are rendered. As more pages ship, they
 * are added here. No link ever 404s.
 */

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Lerriley Limited Company, home"
          >
            <Image
              src="/lerriley-logo-transparent.png"
              alt=""
              width={638}
              height={639}
              priority
              sizes="(min-width: 961px) 96px, (min-width: 481px) 84px, 68px"
              className={styles.logo}
            />
          </Link>
          <div className={styles.wordmark}>
            <span className={styles.wordmarkPrimary}>Lerriley</span>
            <span className={styles.wordmarkSecondary}>Limited Company</span>
          </div>
        </div>

        <nav className={styles.actions} aria-label="Primary">
          <Link href="/solutions" className={styles.navLink}>
            Solutions
          </Link>
          <Link href="/solutions" className={styles.cta}>
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
