import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Eyebrow } from "@/components/design-system/eyebrow";
import { CtaSection } from "@/components/sections/cta-section";
import { BreadcrumbListSchema } from "@/components/seo/breadcrumb-list-schema";
import { FaqPageSchema } from "@/components/seo/faq-page-schema";
import { ServiceSchema } from "@/components/seo/service-schema";
import { PageImage } from "@/components/visuals/page-image";
import { TrainingLoop } from "@/components/visuals/training-loop";
import { machineLearningPage as page } from "@/content/solutions/machine-learning";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Machine Learning",
  description:
    "Lerriley builds predictive models, classification systems, forecasting, and anomaly detection - with honest evaluation and monitoring after deployment.",
  alternates: {
    canonical: "/solutions/machine-learning",
  },
};

export default function MachineLearningPage() {
  return (
    <main id="main" className={styles.page}>
      <ServiceSchema
        name="Machine Learning"
        description={page.lead}
        path="/solutions/machine-learning"
      />
      <FaqPageSchema items={page.faq} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Machine Learning", path: "/solutions/machine-learning" },
        ]}
      />
      <div className={styles.breadcrumbsWrap}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/solutions" },
            { label: "Machine Learning" },
          ]}
        />
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.lead}>{page.lead}</p>
        </div>
        <div className={styles.headerVisual}>
          <TrainingLoop />
        </div>

      <div className={styles.solutionImage}>
        <PageImage
          src="/machine-learning-training.webp"
          alt="A screen showing a model or training output"
          width={1600}
          height={1200}
        />
      </div>
      </header>

      <section className={styles.section} aria-labelledby="problems-title" data-reveal>
        <p className={styles.sectionEyebrow}>Problems</p>
        <h2 id="problems-title" className={styles.sectionTitle}>
          {page.problemsHeading}
        </h2>
        <ul className={styles.problemList} data-reveal-stagger>
          {page.problems.map((problem, i) => (
            <li key={i} className={styles.problemItem} data-reveal>
              <span className={styles.problemIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={styles.problemText}>{problem}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="builds-title" data-reveal>
        <p className={styles.sectionEyebrow}>What We Build</p>
        <h2 id="builds-title" className={styles.sectionTitle}>
          {page.buildsHeading}
        </h2>
        <ul className={styles.buildsList}>
          {page.builds.map((build, i) => (
            <li key={i} className={styles.buildsItem}>
              {build}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="tech-title" data-reveal>
        <p className={styles.sectionEyebrow}>Technologies</p>
        <h2 id="tech-title" className={styles.sectionTitle}>
          {page.technologiesHeading}
        </h2>
        <ul className={styles.techList}>
          {page.technologies.map((tech) => (
            <li key={tech} className={styles.techItem}>
              {tech}
            </li>
          ))}
        </ul>
        <div className={styles.sectionFooter}>
          <Link href="/technology" className={styles.inlineLink}>
            See how we choose technology
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="use-cases-title" data-reveal>
        <p className={styles.sectionEyebrow}>Use Cases</p>
        <h2 id="use-cases-title" className={styles.sectionTitle}>
          {page.useCasesHeading}
        </h2>
        <div className={styles.useCaseGrid} data-reveal-stagger>
          {page.useCases.map((useCase) => (
            <article key={useCase.title} className={styles.useCaseCard} data-reveal>
              <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
              <p className={styles.useCaseBody}>{useCase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="security-title" data-reveal>
        <p className={styles.sectionEyebrow}>Security</p>
        <h2 id="security-title" className={styles.sectionTitle}>
          {page.securityHeading}
        </h2>
        <p className={styles.prose}>{page.security}</p>
      </section>

      <section className={styles.section} aria-labelledby="performance-title" data-reveal>
        <p className={styles.sectionEyebrow}>Performance</p>
        <h2 id="performance-title" className={styles.sectionTitle}>
          {page.performanceHeading}
        </h2>
        <p className={styles.prose}>{page.performance}</p>
      </section>

      <section className={styles.section} aria-labelledby="industries-title" data-reveal>
        <p className={styles.sectionEyebrow}>Industries</p>
        <h2 id="industries-title" className={styles.sectionTitle}>
          {page.industriesHeading}
        </h2>
        <ul className={styles.industryList}>
          {page.industries.map((industry) => (
            <li key={industry} className={styles.industryItem}>
              {industry}
            </li>
          ))}
        </ul>
        <div className={styles.sectionFooter}>
          <Link href="/industries" className={styles.inlineLink}>
            See all industries
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-title" data-reveal>
        <p className={styles.sectionEyebrow}>Questions</p>
        <h2 id="faq-title" className={styles.sectionTitle}>
          {page.faqHeading}
        </h2>
        <dl className={styles.faqList}>
          {page.faq.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <dt className={styles.faqQuestion}>{item.question}</dt>
              <dd className={styles.faqAnswer}>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className={styles.ctaWrap}>
        <CtaSection
          heading={page.ctaHeading}
          body={page.ctaBody}
          primaryLabel="Start a Project"
          primaryHref="/contact?intent=discuss-data"
          secondaryLabel="Explore other capabilities"
          secondaryHref="/solutions"
        />
      </div>
    </main>
  );
}
