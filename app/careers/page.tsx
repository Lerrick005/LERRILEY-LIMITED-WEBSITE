import type { Metadata } from "next";
import Link from "next/link";

import { HumanScale } from "@/components/visuals/human-scale";
import { careersPage } from "@/content/careers-culture";
import { loadCollection } from "@/lib/content/loader";
import { CareerFrontmatterSchema } from "@/lib/content/schemas";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Working at Lerriley: what the work is like, what we look for, and how hiring works.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  const allEntries = loadCollection("careers", CareerFrontmatterSchema);
  const openRoles = allEntries.filter(
    (e) => e.frontmatter.kind === "role" && e.frontmatter.open === true,
  );

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <p className={styles.eyebrow}>{careersPage.eyebrow}</p>
          <h1 className={styles.title}>{careersPage.heading}</h1>
          <p className={styles.lead}>{careersPage.lead}</p>
        </div>
        <div className={styles.headerVisual}>
          <HumanScale />
        </div>
      </header>

      <section className={styles.section} aria-labelledby="working-title">
        <p className={styles.sectionEyebrow}>The Work</p>
        <h2 id="working-title" className={styles.sectionTitle}>
          {careersPage.workingHeading}
        </h2>
        <div className={styles.prose}>
          {careersPage.working.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="looking-title" data-reveal>
        <p className={styles.sectionEyebrow}>What We Look For</p>
        <h2 id="looking-title" className={styles.sectionTitle}>
          {careersPage.lookingHeading}
        </h2>
        <ul className={styles.lookingList} data-reveal-stagger>
          {careersPage.looking.map((item, i) => (
            <li key={i} className={styles.lookingItem} data-reveal>
              <span className={styles.lookingIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={styles.lookingText}>{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="hiring-title" data-reveal>
        <p className={styles.sectionEyebrow}>Process</p>
        <h2 id="hiring-title" className={styles.sectionTitle}>
          {careersPage.hiringHeading}
        </h2>
        <ol className={styles.hiringList}>
          {careersPage.hiring.map((step, i) => (
            <li key={i} className={styles.hiringItem}>
              <span className={styles.hiringIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={styles.hiringText}>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="open-title" data-reveal>
        <p className={styles.sectionEyebrow}>Open Roles</p>
        <h2 id="open-title" className={styles.sectionTitle}>
          {careersPage.openHeading}
        </h2>

        {openRoles.length === 0 ? (
          <p className={styles.emptyState}>{careersPage.emptyState}</p>
        ) : (
          <ul className={styles.roleList}>
            {openRoles.map((role) => (
              <li key={role.frontmatter.slug} className={styles.roleItem}>
                <Link
                  href={`/careers/${role.frontmatter.slug}`}
                  className={styles.roleLink}
                >
                  <h3 className={styles.roleTitle}>{role.frontmatter.title}</h3>
                  {role.frontmatter.location ? (
                    <p className={styles.roleMeta}>
                      {role.frontmatter.location}
                      {role.frontmatter.employmentType
                        ? ` · ${role.frontmatter.employmentType}`
                        : ""}
                    </p>
                  ) : null}
                  <p className={styles.roleSummary}>
                    {role.frontmatter.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.cta} aria-labelledby="cta-title" data-reveal>
        <div className={styles.ctaLayout}>
          <p className={styles.sectionEyebrow}>Get in touch</p>
          <h2 id="cta-title" className={styles.ctaHeading}>
            Interested in working with us?
          </h2>
          <p className={styles.ctaBody}>
            Send a note and a link to something you have built. We read
            everything and we reply either way.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/company" className={styles.buttonPrimary}>
              About Lerriley
            </Link>
            <Link href="/solutions" className={styles.buttonSecondary}>
              Explore capabilities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
