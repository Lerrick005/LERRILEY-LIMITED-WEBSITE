"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./site-header.module.css";

/**
 * Site header.
 *
 * Contains the Lerriley emblem on the left, a stacked wordmark beside it,
 * primary navigation, and the primary call to action on the right.
 *
 * Only links to routes that exist are rendered. As more pages ship, they
 * are added here. No link ever 404s.
 *
 * This is a client component because it uses usePathname() to highlight the
 * current section. The rest of the header is static markup.
 */

type NavItem = {
  href: string;
  label: string;
  /** Paths that should mark this item as active. */
  match: readonly string[];
};

const NAV: readonly NavItem[] = [
  { href: "/", label: "Home", match: ["/"] },
  { href: "/solutions", label: "Solutions", match: ["/solutions"] },
  { href: "/industries", label: "Industries", match: ["/industries"] },
  { href: "/work", label: "Work", match: ["/work"] },
  { href: "/technology", label: "Technology", match: ["/technology"] },
  { href: "/company", label: "Company", match: ["/company"] },
  { href: "/insights", label: "Insights", match: ["/insights"] },
];

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (item: NavItem): boolean => {
    if (item.href === "/") return pathname === "/";
    return item.match.some(
      (m) => pathname === m || pathname.startsWith(`${m}/`),
    );
  };

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
              sizes="(min-width: 961px) 100px, (min-width: 481px) 88px, 72px"
              className={styles.logo}
            />
          </Link>
          <div className={styles.wordmark}>
            <span className={styles.wordmarkPrimary}>Lerriley</span>
            <span className={styles.wordmarkSecondary}>Limited Company</span>
          </div>
        </div>

        <nav className={styles.actions} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/solutions" className={styles.cta}>
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
