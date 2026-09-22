"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import styles from "./site-header.module.css";

/**
 * Site header.
 *
 * Contains the Lerriley emblem, a stacked wordmark, primary navigation,
 * a hamburger menu for small screens, and the primary call to action.
 *
 * The mobile drawer:
 *   - Opens and closes with the button, closes on Escape or on link click.
 *   - Traps focus inside the drawer while it is open.
 *   - Marks the page body inert while the drawer is open.
 *   - Uses aria-expanded and aria-controls to describe the relationship.
 */

type NavItem = {
  href: string;
  label: string;
  match: readonly string[];
};

const NAV: readonly NavItem[] = [
  { href: "/", label: "Home", match: ["/"] },
  { href: "/solutions", label: "Solutions", match: ["/solutions"] },
  { href: "/industries", label: "Industries", match: ["/industries"] },
  { href: "/work", label: "Work", match: ["/work"] },
  { href: "/technology", label: "Technology", match: ["/technology"] },
  { href: "/company", label: "Company", match: ["/company"] },
  { href: "/careers", label: "Careers", match: ["/careers"] },
  { href: "/insights", label: "Insights", match: ["/insights"] },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isActive = (item: NavItem): boolean => {
    if (item.href === "/") return pathname === "/";
    return item.match.some(
      (m) => pathname === m || pathname.startsWith(`${m}/`),
    );
  };

  /* Close the drawer when the route changes. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* While the drawer is open: lock scroll, trap focus, listen for Escape. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusables = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    /* Move focus into the drawer on open. */
    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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

          <button
            ref={buttonRef}
            type="button"
            className={styles.menuButton}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg
                viewBox="0 0 20 20"
                width={20}
                height={20}
                aria-hidden="true"
              >
                <line x1={4} y1={4} x2={16} y2={16} />
                <line x1={16} y1={4} x2={4} y2={16} />
              </svg>
            ) : (
              <svg
                viewBox="0 0 20 20"
                width={20}
                height={20}
                aria-hidden="true"
              >
                <line x1={2} y1={6} x2={18} y2={6} />
                <line x1={2} y1={10} x2={18} y2={10} />
                <line x1={2} y1={14} x2={18} y2={14} />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {open ? (
        <div
          id="site-menu"
          ref={drawerRef}
          className={styles.drawer}
          role="dialog"
          aria-label="Main menu"
        >
          <ul className={styles.drawerList}>
            {NAV.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.drawerLink} ${active ? styles.drawerLinkActive : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.drawerCta}>
            <Link href="/solutions" className={styles.drawerCtaLink}>
              Start a Project
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
