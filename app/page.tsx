import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/design-system/button";

import { company } from "@/content/company";
import { getSolutions } from "@/content/solutions";
import { CtaSection } from "@/components/sections/cta-section";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { processSteps } from "@/content/process";
import { getTechnologySummary } from "@/content/technology";
import { howWeWork } from "@/content/work";
import { insightCategories, insightsStatus } from "@/content/insights";
import { trustPrinciples } from "@/content/trust";
import { closingCta } from "@/content/closing-cta";
import { industries } from "@/content/industries";

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
            <p className={styles.heroEyebrow}>Technology Engineering · Kenya</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {company.tagline}
            </h1>
            <p className={styles.heroLead}>
              Lerriley designs and builds web platforms, business software, AI
              solutions, data systems and intelligent digital products. We
              engineer technology around real-world organizational problems.
            </p>
            <div className={styles.heroActions}>
              <Button href="/contact" variant="primary">
                Start a Project
              </Button>
              <Button href="/solutions" variant="secondary">
                Explore Capabilities
              </Button>
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src="/lerriley-building.webp"
              alt="Lerriley Limited office building at dusk, exterior view of the full facade with warm architectural lighting."
              width={956}
              height={1645}
              priority
              sizes="(min-width: 960px) 48vw, 100vw"
              className={styles.heroImage}
            />
          </div>
        </section>

        <div className={styles.heroPipeline}>
          <PipelineDiagram />
        </div>

        {/* --- The problem ---------------------------------------------- */}
        <section className={styles.section} aria-labelledby="problem-title" data-reveal>
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
        <section className={styles.section} aria-labelledby="capabilities-title" data-reveal>
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
        <section className={styles.section} aria-labelledby="process-title" data-reveal>
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
        <section className={styles.section} aria-labelledby="technology-title" data-reveal>
          <p className={styles.sectionEyebrow}>Technology</p>
          <h2 id="technology-title" className={styles.sectionTitle}>
            Chosen for the problem, not the fashion
          </h2>
          <p className={styles.sectionLead}>
            The stack follows the requirement. These are the technologies
            Lerriley works with, and what each layer is for.
          </p>
          <div className={styles.techGrid}>
            {getTechnologySummary().map((category) => (
              <div key={category.key} className={styles.techBlock}>
                <h3 className={styles.techLabel}>{category.label}</h3>
                <p className={styles.techRationale}>{category.rationale}</p>
                <ul className={styles.techItems}>
                  {category.items.map((item) => (
                    <li key={item} className={styles.techItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.capabilitiesFooter}>
            <Link href="/solutions" className={styles.capabilitiesFooterLink}>
              See how we choose technology
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* --- Real work ------------------------------------------------
            Published case studies only. Until real case studies exist,
            this section renders the honest alternative: a statement of
            how Lerriley works, with no fabricated projects. */}
        <section className={styles.section} aria-labelledby="work-title" data-reveal>
          <p className={styles.sectionEyebrow}>{howWeWork.eyebrow}</p>
          <h2 id="work-title" className={styles.sectionTitle}>
            {howWeWork.heading}
          </h2>
          <div className={styles.workProse}>
            {howWeWork.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className={styles.capabilitiesFooter}>
            <Link href="/contact" className={styles.capabilitiesFooterLink}>
              Start a conversation
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* --- Industries ------------------------------------------------
            Five industries. Each entry states the kind of problem the
            industry faces and the technology that addresses it. No client
            names, no case studies. Links to /industries are added when
            that page exists. */}
        <section className={styles.section} aria-labelledby="industries-title" data-reveal>
          <p className={styles.sectionEyebrow}>Industries</p>
          <h2 id="industries-title" className={styles.sectionTitle}>
            Where we work
          </h2>
          <div className={styles.industryGrid}>
            {industries.map((industry) => (
              <div key={industry.slug} className={styles.industryBlock}>
                <h3 className={styles.industryLabel}>{industry.label}</h3>
                <p className={styles.industryText}>{industry.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Insights -------------------------------------------------
            Article list arrives when the first MDX articles are published.
            Until then, the section states what Insights covers and links
            to the nearest existing page. */}
        <section className={styles.section} aria-labelledby="insights-title" data-reveal>
          <p className={styles.sectionEyebrow}>{insightsStatus.eyebrow}</p>
          <h2 id="insights-title" className={styles.sectionTitle}>
            {insightsStatus.heading}
          </h2>
          <p className={styles.sectionLead}>{insightsStatus.statement}</p>
          <ul className={styles.insightCategories}>
            {insightCategories.map((category) => (
              <li key={category.slug} className={styles.insightCategory}>
                {category.label}
              </li>
            ))}
          </ul>
          <div className={styles.capabilitiesFooter}>
            <Link href="/solutions" className={styles.capabilitiesFooterLink}>
              Explore our capabilities
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* --- Trust ----------------------------------------------------
            Four principles of how Lerriley works. No client names, no
            certifications, no statistics, no logos. When verified evidence
            exists, an additional evidence block is added above these
            principles without replacing them. */}
        <section className={styles.section} aria-labelledby="trust-title" data-reveal>
          <p className={styles.sectionEyebrow}>Trust</p>
          <h2 id="trust-title" className={styles.sectionTitle}>
            How we work with you
          </h2>
          <ol className={styles.trustList}>
            {trustPrinciples.map((principle) => (
              <li key={principle.number} className={styles.trustItem}>
                <span className={styles.trustNumber}>{principle.number}</span>
                <h3 className={styles.trustTitle}>{principle.title}</h3>
                <p className={styles.trustBody}>{principle.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className={styles.ctaWrap}>
          <CtaSection
            eyebrow={closingCta.eyebrow}
            heading={closingCta.heading}
            body={closingCta.body}
            primaryLabel={closingCta.primaryLabel}
            primaryHref="/contact"
            secondaryLabel={closingCta.secondaryLabel}
            secondaryHref="/solutions"
          />
        </div>
      </main>
    </div>
  );
}
