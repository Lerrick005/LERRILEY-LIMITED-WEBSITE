import type { Metadata } from "next";
import Link from "next/link";

import { getSolutions } from "@/content/solutions";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The engineering capabilities Lerriley offers: web development, business software, AI software, data science, machine learning and automation.",
  alternates: {
    canonical: "/solutions",
  },
};

/**
 * Solutions index.
 *
 * Renders all six capabilities in order. Entries whose detail page is
 * published render as links; entries that are still drafts render as plain
 * rows. This is why nothing on this page links to a route that does not
 * exist (addendum rule 7).
 *
 * Right now every entry is a draft, so the list is a plain editorial index.
 * When the first solution page goes live, changing its status to
 * "published" in content/solutions/index.ts is the only edit required.
 */
export default function SolutionsPage() {
  const items = getSolutions();

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Capabilities</p>
        <h1 className={styles.title}>What we engineer</h1>
        <p className={styles.lead}>
          Six disciplines, one approach. Each starts with understanding the
          problem and the workflow, then choosing the technology that fits.
        </p>
      </header>

      <ul className={styles.list}>
        {items.map((solution, i) => {
          const number = String(i + 1).padStart(2, "0");
          const isPublished = solution.status === "published";

          const content = (
            <div className={styles.itemInner}>
              <span className={styles.index}>{number}</span>
              <h2 className={styles.itemTitle}>{solution.title}</h2>
              <p className={styles.itemSummary}>{solution.summary}</p>
            </div>
          );

          return (
            <li key={solution.slug} className={styles.item}>
              {isPublished ? (
                <Link
                  href={`/solutions/${solution.slug}`}
                  className={styles.itemLink}
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
