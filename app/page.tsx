import type { Metadata } from "next";
import Link from "next/link";

import { company } from "@/content/company";
import { getSolutions } from "@/content/solutions";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { processSteps } from "@/content/process";

import styles from "./page.module.css";

export const metadata: Metadata = {
  // No `title` here, so layout.tsx's `default` applies. That renders:
  //   "Lerriley Limited - Technology engineered around real-world problems."
  // If we set a title here, layout.tsx's template would append
  // " | Lerriley Limited" to it, which would duplicate the brand on the
  // home page. So we deliberately omit it.
  description: company.positioning,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const solutions = getSolutions();

  return (
    <div className={styles.page}>
      <main id="main" className={styles.main}>
        {/* --- Hero ------------------------------------------------------ */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>{company.primaryMarket}</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {company.tagline}
            </h1>
            <p className={styles.heroLead}>
              Lerriley designs and builds web platforms, business software, AI
              solutions, data systems and intelligent digital products for
              organizations ready to solve meaningful problems with technology.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={`${styles.button} ${styles.buttonPrimary}`}>
                Start a Project
              </Link>
              <Link href="/solutions" className={`${styles.button} ${styles.buttonSecondary}`}>
                Explore Capabilities
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <PipelineDiagram />
          </div>
        </section>

        {/* --- The problem ---------------------------------------------- */}
        <section className={styles.section} aria-labelledby="problem-title">
          <p className={styles.sectionEyebrow}>The Problem</p>
          <div className={styles.problemLayout}>
            <div className={styles.problemProse}>
              <h2 id="problem-title" className={styles.sectionTitle}>
                Real workflows, not templates
              </h2>
              <p>
                Most organizations do not have a technology problem. They have
                a process problem that technology has not solved yet. The work
                is fragmented across spreadsheets, chat threads and paper. The
                same information is typed more than once. Decisions are made
                without a clear view of what is actually happening.
              </p>
              <p>
                Lerriley starts by understanding the workflow as it exists.
                Then we design the system around it, and engineer the solution
                with the technology that fits the problem. The result is
                software that matches how the organization actually works,
                not a template it has to work around.
              </p>
            </div>
            <ul className={styles.problemList}>
              <li className={styles.problemListItem}>
                <span className={styles.problemIndex}>01</span>
                <p className={styles.problemText}>
                  Processes spread across spreadsheets, chat threads and paper.
                </p>
              </li>
              <li className={styles.problemListItem}>
                <span className={styles.problemIndex}>02</span>
                <p className={styles.problemText}>
                  The same information recorded in more than one place, in
                  more than one format.
                </p>
              </li>
              <li className={styles.problemListItem}>
                <span className={styles.problemIndex}>03</span>
                <p className={styles.problemText}>
                  Reporting assembled by hand, days after the decisions it
                  should have informed.
                </p>
              </li>
              <li className={styles.problemListItem}>
                <span className={styles.problemIndex}>04</span>
                <p className={styles.problemText}>
                  Systems that no longer match how the organization actually
                  operates.
                </p>
              </li>
              <li className={styles.problemListItem}>
                <span className={styles.problemIndex}>05</span>
                <p className={styles.problemText}>
                  Data available, but not structured for anyone to use it.
                </p>
              </li>
              <li className={styles.problemListItem}>
                <span className={styles.problemIndex}>06</span>
                <p className={styles.problemText}>
                  Manual work that repeats the same steps every day and
                  produces the same avoidable errors.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* --- What we build -------------------------------------------- */}
        <section className={styles.section} aria-labelledby="capabilities-title">
          <p className={styles.sectionEyebrow}>What We Build</p>
          <h2 id="capabilities-title" className={styles.sectionTitle}>
            Six engineering capabilities
          </h2>
          <div className={styles.capabilities}>
            {solutions.map((solution, i) => {
              const number = String(i + 1).padStart(2, "0");
              return (
                <Link
                  key={solution.slug}
                  href="/solutions"
                  className={styles.capabilityItem}
                >
                  <div className={styles.capabilityItemInner}>
                    <span className={styles.capabilityIndex}>{number}</span>
                    <h3 className={styles.capabilityTitle}>{solution.title}</h3>
                    <p className={styles.capabilitySummary}>{solution.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className={styles.capabilitiesFooter}>
            <Link href="/solutions" className={styles.capabilitiesFooterLink}>
              See all capabilities
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* --- Engineering process -------------------------------------- */}
        <section className={styles.section} aria-labelledby="process-title">
          <p className={styles.sectionEyebrow}>How We Work</p>
          <h2 id="process-title" className={styles.sectionTitle}>
            The engineering process
          </h2>
          <ol className={styles.processList}>
            {processSteps.map((step) => (
              <li key={step.slug} className={styles.processStep}>
                <span className={styles.processNumber}>{step.number}</span>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepText}>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* --- Technology ----------------------------------------------- */}
        {/* TODO: Step 25 - Technology summary, links to /technology. */}
        <section className={styles.section} aria-labelledby="technology-title">
          <p className={styles.sectionEyebrow}>Technology</p>
          <h2 id="technology-title" className={styles.sectionTitle}>
            Chosen for the problem, not the fashion
          </h2>
          <p className={styles.sectionPlaceholder}>
            Section content arrives in a later step.
          </p>
        </section>

        {/* --- Real work ------------------------------------------------ */}
        {/* TODO: Step 26 - Published case studies only. Hidden until verified. */}
        <section className={styles.section} aria-labelledby="work-title">
          <p className={styles.sectionEyebrow}>Work</p>
          <h2 id="work-title" className={styles.sectionTitle}>
            What we have built
          </h2>
          <p className={styles.sectionPlaceholder}>
            Section content arrives in a later step.
          </p>
        </section>

        {/* --- Industries ----------------------------------------------- */}
        {/* TODO: Step 27 - Industries summary, links to /industries. */}
        <section className={styles.section} aria-labelledby="industries-title">
          <p className={styles.sectionEyebrow}>Industries</p>
          <h2 id="industries-title" className={styles.sectionTitle}>
            Where we work
          </h2>
          <p className={styles.sectionPlaceholder}>
            Section content arrives in a later step.
          </p>
        </section>

        {/* --- Insights ------------------------------------------------ */}
        {/* TODO: Step 28 - Latest published articles. */}
        <section className={styles.section} aria-labelledby="insights-title">
          <p className={styles.sectionEyebrow}>Insights</p>
          <h2 id="insights-title" className={styles.sectionTitle}>
            Notes on engineering
          </h2>
          <p className={styles.sectionPlaceholder}>
            Section content arrives in a later step.
          </p>
        </section>

        {/* --- Trust ---------------------------------------------------- */}
        {/* TODO: Step 29 - Evidence only. Omitted entirely until verified data exists. */}
        <section className={styles.section} aria-labelledby="trust-title">
          <p className={styles.sectionEyebrow}>Trust</p>
          <h2 id="trust-title" className={styles.sectionTitle}>
            How we work with you
          </h2>
          <p className={styles.sectionPlaceholder}>
            Section content arrives in a later step.
          </p>
        </section>

        {/* --- Closing CTA --------------------------------------------- */}
        {/* TODO: Step 30 - Start a Project closing CTA block. */}
        <section className={styles.section} aria-labelledby="cta-title">
          <p className={styles.sectionEyebrow}>Start</p>
          <h2 id="cta-title" className={styles.sectionTitle}>
            Start a project
          </h2>
          <p className={styles.sectionPlaceholder}>
            Section content arrives in a later step.
          </p>
        </section>
      </main>
    </div>
  );
}
