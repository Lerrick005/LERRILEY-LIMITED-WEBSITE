import type { Metadata } from "next";

import { Toc } from "@/components/toc";
import { privacyLastUpdated, privacySections } from "@/content/legal";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Lerriley Limited handles information submitted through this website.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.layout}>
        <article className={styles.article}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Legal</p>
            <h1 className={styles.title}>Privacy</h1>
            <p className={styles.updated}>
              Last updated{" "}
              <time dateTime={privacyLastUpdated}>{privacyLastUpdated}</time>
            </p>
          </header>

          {privacySections.map((section) => (
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
          <Toc items={privacySections} />
        </aside>
      </div>
    </main>
  );
}
