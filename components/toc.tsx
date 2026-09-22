import styles from "./toc.module.css";

/**
 * Table of contents.
 *
 * A small inline list of section links, generated from an array of
 * section slugs and headings. Used on legal pages and any other page
 * with several same-page sections.
 *
 * Renders as a nav element with an aria-label. Each link anchors to the
 * section id. Positioned by the page that uses it.
 */

export type TocItem = {
  slug: string;
  heading: string;
};

export function Toc({
  items,
  label = "On this page",
}: {
  items: readonly TocItem[];
  label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label={label}>
      <p className={styles.tocTitle}>{label}</p>
      <ol className={styles.tocList}>
        {items.map((item) => (
          <li key={item.slug} className={styles.tocItem}>
            <a href={`#${item.slug}`} className={styles.tocLink}>
              {item.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
