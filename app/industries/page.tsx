import type { Metadata } from "next";
import Link from "next/link";

import {
  INDUSTRY_MARKS,
  type IndustryMarkKey,
} from "@/components/visuals/industry-marks";
import { getIndustrySections } from "@/content/industries-page";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Where Lerriley works: healthcare, retail, education, property and real estate, and professional services.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  const sections = getIndustrySections();

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Industries</p>
        <h1 className={styles.title}>Where we work</h1>
        <p className={styles.lead}>
          Five industries where the same pattern appears: a workflow that has
          outgrown the tools around it. Each section below describes the
          problem, the technology that addresses it, and the capability that
          fits.
        </p>
      </header>

      <ol className={styles.sections}>
        {sections.map((section, i) => {
          const Mark = INDUSTRY_MARKS[section.slug as IndustryMarkKey];
          return (
            <li
              key={section.slug}
              className={styles.section}
              data-reveal
            >
              <div className={styles.sectionHeader}>
                <div className={styles.markWrap}>
                  {Mark ? <Mark /> : null}
                </div>
                <div className={styles.titleBlock}>
                  <span className={styles.sectionIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className={styles.sectionTitle}>{section.label}</h2>
                </div>
              </div>

              <div className={styles.sectionBody}>
                <div className={styles.block}>
                  <h3 className={styles.blockTitle}>The problem</h3>
                  <p className={styles.blockText}>{section.problem}</p>
                </div>

                <div className={styles.block}>
                  <h3 className={styles.blockTitle}>The solution</h3>
                  <p className={styles.blockText}>{section.solution}</p>
                </div>

                <div className={styles.block}>
                  <h3 className={styles.blockTitle}>The capability</h3>
                  <p className={styles.blockText}>
                    <Link
                      href={`/solutions`}
                      className={styles.capabilityLink}
                    >
                      {section.solutionLabel}
                    </Link>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <section className={styles.cta} aria-labelledby="cta-title" data-reveal>
        <div className={styles.ctaLayout}>
          <p className={styles.eyebrow}>Start</p>
          <h2 id="cta-title" className={styles.ctaHeading}>
            Does your industry look like one of these?
          </h2>
          <p className={styles.ctaBody}>
            Tell us what you are trying to solve. If the problem fits what we
            do, we will say so. If it does not, we will say that too.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/solutions" className={styles.buttonPrimary}>
              Explore capabilities
            </Link>
            <Link href="/company" className={styles.buttonSecondary}>
              About Lerriley
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
