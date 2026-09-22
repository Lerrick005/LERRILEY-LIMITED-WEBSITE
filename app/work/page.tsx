import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/sections/page-header";
import { WorkPipeline } from "@/components/visuals/work-pipeline";
import { howWeWork } from "@/content/work";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "How Lerriley publishes case studies: the standard each project must meet before it appears on this page.",
  alternates: {
    canonical: "/work",
  },
};

const PIPELINE_EXPLANATIONS = [
  {
    stage: "Capture",
    body: "We collect the raw material: screenshots, architecture diagrams, the stack that was actually used, the decisions that were actually made.",
  },
  {
    stage: "Verify",
    body: "Every claim is checked against what the system actually does. No rounding up, no inferred outcomes, no performance figures that cannot be confirmed.",
  },
  {
    stage: "Consent",
    body: "The client decides what may be published. Anything they are not comfortable sharing is left out, not paraphrased.",
  },
  {
    stage: "Write",
    body: "The case study is written in the same structure as everything else on the site: challenge, architecture, engineering decisions, outcome.",
  },
  {
    stage: "Publish",
    body: "It appears here, in the sitemap, linked from the relevant solution and industry pages. Until then, it does not exist anywhere on the site.",
  },
] as const;

export default function WorkPage() {
  return (
    <main id="main" className={styles.page}>
      <PageHeader
        eyebrow="Work"
        title={howWeWork.heading}
        lead="Case studies are published on this page when they meet the standard described below. Until then, the page states the standard openly rather than filling the space with work that has not been cleared for publication."
      />

      <section className={styles.prose} aria-labelledby="statement-title">
        <h2 id="statement-title" className={styles.sectionTitle}>
          Why this page is not a portfolio yet
        </h2>
        {howWeWork.paragraphs.map((p, i) => (
          <p key={i} className={styles.paragraph}>
            {p}
          </p>
        ))}
      </section>

      <section
        className={styles.pipelineSection}
        aria-labelledby="pipeline-heading"
      >
        <p className={styles.sectionEyebrow}>The Pipeline</p>
        <h2 id="pipeline-heading" className={styles.sectionTitle}>
          How a case study gets published
        </h2>
        <div className={styles.pipelineVisual}>
          <WorkPipeline />
        </div>
        <ol className={styles.pipelineList}>
          {PIPELINE_EXPLANATIONS.map((step, i) => (
            <li key={step.stage} className={styles.pipelineItem}>
              <span className={styles.pipelineIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.pipelineTitle}>{step.stage}</h3>
              <p className={styles.pipelineText}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaSection
        heading="Have a problem worth building?"
        body="A project begins the same way every case study begins, with a conversation about the problem. We will tell you whether it fits."
        primaryLabel="Explore capabilities"
        primaryHref="/solutions"
        secondaryLabel="About Lerriley"
        secondaryHref="/company"
      />
    </main>
  );
}
