import type { Metadata } from "next";
import Link from "next/link";

import { TechStack } from "@/components/visuals/tech-stack";
import { company } from "@/content/company";
import { getTechnologySummary } from "@/content/technology";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "The technologies Lerriley works with, layer by layer: frontend, backend, data, AI and machine learning, and infrastructure.",
  alternates: {
    canonical: "/technology",
  },
};

export default function TechnologyPage() {
  const summary = getTechnologySummary();

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <p className={styles.eyebrow}>Technology</p>
          <h1 className={styles.title}>Chosen for the problem, not the fashion</h1>
          <p className={styles.lead}>
            Every layer of a system is a decision. We choose technology by what
            the problem requires, not by what is new. Here is how we think about
            the stack, from what the user touches to what runs underneath.
          </p>
        </div>
        <div className={styles.headerVisual}>
          <TechStack />
        </div>
      </header>

      <section className={styles.section} aria-labelledby="stack-title">
        <p className={styles.sectionEyebrow}>The Stack</p>
        <h2 id="stack-title" className={styles.sectionTitle}>
          Five layers, one system
        </h2>
        <p className={styles.sectionLead}>
          Each layer has a job. Each layer is chosen for its job, not for its
          popularity. The result is a system where every component has a reason.
        </p>

        <ol className={styles.layerList} data-reveal-stagger>
          {summary.map((category, i) => (
            <li
              key={category.key}
              className={styles.layerItem}
              data-reveal
            >
              <div className={styles.layerMeta}>
                <span className={styles.layerIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.layerTitle}>{category.label}</h3>
              </div>
              <p className={styles.layerRationale}>{category.rationale}</p>
              <ul className={styles.techList}>
                {category.items.map((item) => (
                  <li key={item} className={styles.techItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="approach-title" data-reveal>
        <p className={styles.sectionEyebrow}>Approach</p>
        <h2 id="approach-title" className={styles.sectionTitle}>
          How technology is chosen
        </h2>
        <p className={styles.sectionLead}>
          We start with the problem and the workflow. The technology follows
          from there. A rule in code is better than a model where a rule
          suffices. A single database is better than three where one will do.
          The simplest system that solves the problem is the correct system.
        </p>
        <p className={styles.sectionLead}>
          This is why the same company can build a clinic management system in
          one month and a machine learning pipeline in another. The tools
          change. The method does not.
        </p>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title" data-reveal>
        <div className={styles.ctaLayout}>
          <p className={styles.sectionEyebrow}>Start</p>
          <h2 id="cta-title" className={styles.ctaHeading}>
            Have a problem worth engineering?
          </h2>
          <p className={styles.ctaBody}>
            Tell us what you are building. We will tell you whether it fits
            what we do, and which layers of the stack it involves.
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

      <p className={styles.footerLine}>
        {company.legalName} - {company.primaryMarket}
      </p>
    </main>
  );
}
