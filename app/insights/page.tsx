import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/sections/page-header";
import { loadCollection } from "@/lib/content/loader";
import { InsightFrontmatterSchema } from "@/lib/content/schemas";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Engineering notes from Lerriley: applied AI, data systems, business technology and the practices behind them.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsIndexPage() {
  const entries = loadCollection("insights", InsightFrontmatterSchema);

  return (
    <main id="main" className={styles.page}>
      <PageHeader
        eyebrow="Insights"
        title="Notes on engineering"
        lead="Writing on the topics we work with: applied AI, data systems, business technology and the engineering practice behind them."
      />

      {entries.length === 0 ? (
        <section className={styles.empty}>
          <p className={styles.emptyText}>
            The first articles are in preparation. Each one is written and
            reviewed before publication, not published on a schedule.
          </p>
        </section>
      ) : (
        <ul className={styles.list}>
          {entries.map((entry) => {
            const fm = entry.frontmatter;
            return (
              <li key={fm.slug} className={styles.item} data-reveal>
                <Link href={`/insights/${fm.slug}`} className={styles.itemLink}>
                  <div className={styles.itemMeta}>
                    <time
                      dateTime={fm.publishedAt}
                      className={styles.itemDate}
                    >
                      {fm.publishedAt}
                    </time>
                    {entry.isDraft ? (
                      <span className={styles.draftBadge}>Draft</span>
                    ) : null}
                  </div>
                  <h2 className={styles.itemTitle}>{fm.title}</h2>
                  <p className={styles.itemDescription}>{fm.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
