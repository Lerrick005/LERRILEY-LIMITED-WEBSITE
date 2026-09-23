import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { FooterLine } from "@/components/sections/footer-line";
import { PageHeader } from "@/components/sections/page-header";
import { CompassMark } from "@/components/visuals/compass-mark";
import { companyPage } from "@/content/company-page";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Lerriley Limited is a technology engineering company. What we believe about technology, how we work with clients, and where we are going.",
  alternates: {
    canonical: "/company",
  },
};

export default function CompanyPageRoute() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.headerWrap}>
        <PageHeader
          eyebrow={companyPage.eyebrow}
          title={companyPage.heading}
          lead={companyPage.lead}
        />
        <div className={styles.headerVisual}>
          <CompassMark />
        </div>
      </div>

      <section
        className={styles.section}
        aria-labelledby="beliefs-title"
        data-reveal
      >
        <p className={styles.sectionEyebrow}>Beliefs</p>
        <h2 id="beliefs-title" className={styles.sectionTitle}>
          {companyPage.beliefsHeading}
        </h2>
        <ol className={styles.beliefList} data-reveal-stagger>
          {companyPage.beliefs.map((belief) => (
            <li key={belief.number} className={styles.beliefItem} data-reveal>
              <span className={styles.beliefNumber}>{belief.number}</span>
              <h3 className={styles.beliefTitle}>{belief.title}</h3>
              <p className={styles.beliefBody}>{belief.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={styles.section}
        aria-labelledby="problems-title"
        data-reveal
      >
        <p className={styles.sectionEyebrow}>Problems</p>
        <h2 id="problems-title" className={styles.sectionTitle}>
          {companyPage.problemsHeading}
        </h2>
        <p className={styles.sectionLead}>{companyPage.problemsLead}</p>
        <ul className={styles.problemList} data-reveal-stagger>
          {companyPage.problems.map((problem, i) => (
            <li key={i} className={styles.problemItem} data-reveal>
              <span className={styles.problemIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={styles.problemText}>{problem}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={styles.section}
        aria-labelledby="working-title"
        data-reveal
      >
        <p className={styles.sectionEyebrow}>Working together</p>
        <h2 id="working-title" className={styles.sectionTitle}>
          {companyPage.workingHeading}
        </h2>
        <ol className={styles.beliefList} data-reveal-stagger>
          {companyPage.working.map((step) => (
            <li key={step.number} className={styles.beliefItem} data-reveal>
              <span className={styles.beliefNumber}>{step.number}</span>
              <h3 className={styles.beliefTitle}>{step.title}</h3>
              <p className={styles.beliefBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={styles.section}
        aria-labelledby="approach-title"
        data-reveal
      >
        <p className={styles.sectionEyebrow}>Approach</p>
        <h2 id="approach-title" className={styles.sectionTitle}>
          {companyPage.approachHeading}
        </h2>
        <p className={styles.prose}>{companyPage.approach}</p>
      </section>

      <section
        className={styles.section}
        aria-labelledby="vision-title"
        data-reveal
      >
        <p className={styles.sectionEyebrow}>Vision</p>
        <h2 id="vision-title" className={styles.sectionTitle}>
          {companyPage.visionHeading}
        </h2>
        <p className={styles.prose}>{companyPage.vision}</p>
      </section>

      <CtaSection
        heading={companyPage.ctaHeading}
        body={companyPage.ctaBody}
        primaryLabel="Explore capabilities"
        primaryHref="/solutions"
        secondaryLabel="Contact"
        secondaryHref="/contact"
      />

      <FooterLine />
    </main>
  );
}
