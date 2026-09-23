import { Toc, type TocItem } from "@/components/toc";

import styles from "./legal-page.module.css";

/**
 * LegalPage.
 *
 * Shared layout for /privacy and /terms. Renders a header, a list of
 * anchored sections, and a table of contents on the right at wide
 * viewports.
 */

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  sections: readonly {
    slug: string;
    heading: string;
    body: readonly string[];
  }[];
}) {
  const tocItems: TocItem[] = sections.map((s) => ({
    slug: s.slug,
    heading: s.heading,
  }));

  return (
    <main id="main" className={styles.page}>
      <div className={styles.layout}>
        <article className={styles.article}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.updated}>
              Last updated <time dateTime={lastUpdated}>{lastUpdated}</time>
            </p>
          </header>

          {sections.map((section) => (
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
          <Toc items={tocItems} />
        </aside>
      </div>
    </main>
  );
}
