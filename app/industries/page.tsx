import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/sections/cta-section";
import { PageImage } from "@/components/visuals/page-image";
import { PageHeader } from "@/components/sections/page-header";
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
      <PageHeader
        eyebrow="Industries"
        title="Where we work"
        lead="Five industries where the same pattern appears: a workflow that has outgrown the tools around it. Each section below describes the problem, the technology that addresses it, and the capability that fits."
      />

      <div className={styles.solutionImage}>
        <PageImage
          src="/industries-clinic.webp"
          alt="A clinic reception where business systems are used"
          width={1600}
          height={1200}
        />
      </div>

      <ol className={styles.sections}>
        {sections.map((section, i) => {
          const Mark = INDUSTRY_MARKS[section.slug as IndustryMarkKey];
          return (
            <li key={section.slug} className={styles.section} data-reveal>
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
                    <Link href="/solutions" className={styles.capabilityLink}>
                      {section.solutionLabel}
                    </Link>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <CtaSection
        heading="Does your industry look like one of these?"
        body="Tell us what you are trying to solve. If the problem fits what we do, we will say so. If it does not, we will say that too."
        primaryLabel="Explore capabilities"
        primaryTrackEvent={{
          name: "cta_click",
          location: "industries-closing",
          label: "Explore capabilities",
          intent: "explore",
        }}
        primaryHref="/solutions"
        secondaryLabel="About Lerriley"
        secondaryTrackEvent={{
          name: "cta_click",
          location: "industries-closing",
          label: "About Lerriley",
          intent: "company",
        }}
        secondaryHref="/company"
      />
    </main>
  );
}
