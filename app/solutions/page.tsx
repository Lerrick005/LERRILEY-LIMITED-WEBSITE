import type { Metadata } from "next";
import Link from "next/link";

import { CapabilityRing } from "@/components/visuals/capability-ring";
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

export default function SolutionsPage() {
  const items = getSolutions();

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <p className={styles.eyebrow}>Capabilities</p>
          <h1 className={styles.title}>What we engineer</h1>
          <p className={styles.lead}>
            Six disciplines, one approach. Each starts with understanding the
            problem and the workflow, then choosing the technology that fits.
          </p>
        </div>
        <div className={styles.headerVisual}>
          <CapabilityRing />
        </div>
      </header>

      <section className={styles.intro} aria-labelledby="intro-title">
        <h2 id="intro-title" className={styles.introTitle}>
          How to use this section
        </h2>
        <div className={styles.introProse}>
          <p>
            The six entries below are the disciplines Lerriley works across.
            They are not products, and they are not packages. They are the
            kinds of engineering problems we take on, described in the
            language of what each one produces.
          </p>
          <p>
            Most real engagements do not fit inside a single capability. A
            business software project may need a web interface, an automated
            workflow, and a data layer. A machine learning project almost
            always starts with data work. Start with the problem you are
            trying to solve, and the relevant capability will usually be
            clear. Where it is not, the first conversation settles it.
          </p>
          <p>
            Choosing a capability is not a purchase. It is the beginning of a
            conversation about what you are building, what the constraints
            are, and whether Lerriley is the right partner for it.
          </p>
        </div>
      </section>

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
