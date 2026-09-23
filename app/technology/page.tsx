import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { FooterLine } from "@/components/sections/footer-line";
import { PageHeader } from "@/components/sections/page-header";
import { TechStack } from "@/components/visuals/tech-stack";
import {
  approachContent,
  decisionPrinciples,
  getTechnologySummary,
} from "@/content/technology";

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
      <div className={styles.headerWrap}>
        <PageHeader
          eyebrow="Technology"
          title="Chosen for the problem, not the fashion"
          lead="Every layer of a system is a decision. We choose technology by what the problem requires, not by what is new. Here is how we think about the stack, from what the user touches to what runs underneath."
        />
        <div className={styles.headerVisual}>
          <TechStack />
        </div>
      </div>

      <section className={styles.section} aria-labelledby="stack-title" data-reveal>
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
            <li key={category.key} className={styles.layerItem} data-reveal>
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

      <section
        className={styles.section}
        aria-labelledby="approach-title"
        data-reveal
      >
        <p className={styles.sectionEyebrow}>Approach</p>
        <h2 id="approach-title" className={styles.sectionTitle}>
          {approachContent.heading}
        </h2>
        <p className={styles.sectionLead}>{approachContent.lead}</p>

        <ol className={styles.principleList} data-reveal-stagger>
          {decisionPrinciples.map((principle) => (
            <li
              key={principle.number}
              className={styles.principleItem}
              data-reveal
            >
              <span className={styles.principleNumber}>{principle.number}</span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleBody}>{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaSection
        heading="Have a problem worth engineering?"
        body="Tell us what you are building. We will tell you whether it fits what we do, and which layers of the stack it involves."
        primaryLabel="Explore capabilities"
        primaryHref="/solutions"
        secondaryLabel="About Lerriley"
        secondaryHref="/company"
      />

      <FooterLine />
    </main>
  );
}
