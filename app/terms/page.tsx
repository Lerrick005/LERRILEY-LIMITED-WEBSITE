import type { Metadata } from "next";

import { Toc } from "@/components/toc";
import { termsLastUpdated, termsSections } from "@/content/legal";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for the Lerriley Limited website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.layout}>
        <article className={styles.article}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Terms of use</h1>
            <p className={styles.updated}>
              Last updated{" "}
              <time dateTime={termsLastUpdated}>{termsLastUpdated}</time>
            </p>
          </header>

          {termsSections.map((section) => (
            <section
              key={section.slug}
              id={section.slug}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>{section.heading}</h2>
              {section.body.map((p, i) => (
                <p key={i} className={styles.paragraph}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>

        <aside className={styles.aside}>
          <Toc items={termsSections} />
        </aside>
      </div>
    </main>
  );
}
