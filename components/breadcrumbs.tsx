import Link from "next/link";

import styles from "./breadcrumbs.module.css";

/**
 * Breadcrumbs.
 *
 * Renders a small navigation trail at the top of interior pages. The last
 * item is the current page and is not a link.
 *
 * Usage:
 *   <Breadcrumbs
 *     items={[
 *       { label: "Home", href: "/" },
 *       { label: "Company" },
 *     ]}
 *   />
 */

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className={styles.item}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
