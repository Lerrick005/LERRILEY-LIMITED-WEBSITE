import type { Metadata } from "next";
import Link from "next/link";

import { company } from "@/content/company";
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
      <header className={styles.header}>
        <p className={styles.eyebrow}>{companyPage.eyebrow}</p>
        <h1 className={styles.title}>{companyPage.heading}</h1>
        <p className={styles.lead}>{companyPage.lead}</p>
      </header>

      <section className={styles.section} aria-labelledby="beliefs-title" data-reveal>
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

      <section className={styles.section} aria-labelledby="approach-title" data-reveal>
        <p className={styles.sectionEyebrow}>Approach</p>
        <h2 id="approach-title" className={styles.sectionTitle}>
          {companyPage.approachHeading}
        </h2>
        <p className={styles.prose}>{companyPage.approach}</p>
      </section>

      <section className={styles.section} aria-labelledby="vision-title" data-reveal>
        <p className={styles.sectionEyebrow}>Vision</p>
        <h2 id="vision-title" className={styles.sectionTitle}>
          {companyPage.visionHeading}
        </h2>
        <p className={styles.prose}>{companyPage.vision}</p>
      </section>

      <section className={styles.section} aria-labelledby="company-cta-title" data-reveal>
        <div className={styles.ctaLayout}>
          <p className={styles.sectionEyebrow}>Start</p>
          <h2 id="company-cta-title" className={styles.ctaHeading}>
            {companyPage.ctaHeading}
          </h2>
          <p className={styles.ctaBody}>{companyPage.ctaBody}</p>
          <div className={styles.ctaActions}>
            <Link href="/solutions" className={styles.buttonPrimary}>
              Explore capabilities
            </Link>
            <Link href="/solutions" className={styles.buttonSecondary}>
              Contact
            </Link>
          </div>
        </div>
      </section>

      <p className={styles.companyName}>
        {company.legalName} - {company.primaryMarket}
      </p>
    </main>
  );
}
