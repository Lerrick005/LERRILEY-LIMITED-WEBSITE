"use client";

import { useState } from "react";

import {
  INTENT_ICONS,
  type IntentIconKey,
} from "@/components/visuals/intent-icons";
import { company } from "@/content/company";
import { contactIntents, contactPage } from "@/content/contact";

import styles from "./page.module.css";

/**
 * Contact page.
 *
 * The intent selector at the top drives the form below it. Selecting an
 * intent reveals the form (built in step 44.2) and sets the intent value
 * used for submission.
 *
 * This is a client component because the intent selection is interactive.
 * The form itself validates on the client and again on the server.
 */

type IntentSlug = (typeof contactIntents)[number]["slug"];

export default function ContactPage() {
  const [selected, setSelected] = useState<IntentSlug | null>(null);

  const phone = company.contact.phone;

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{contactPage.eyebrow}</p>
        <h1 className={styles.title}>{contactPage.heading}</h1>
        <p className={styles.lead}>{contactPage.lead}</p>
      </header>

      <section className={styles.intentSection} aria-labelledby="intent-title">
        <h2 id="intent-title" className={styles.sectionTitle}>
          What would you like to discuss?
        </h2>

        <div
          className={styles.intentGrid}
          role="radiogroup"
          aria-labelledby="intent-title"
        >
          {contactIntents.map((intent) => {
            const Icon = INTENT_ICONS[intent.slug as IntentIconKey];
            const isSelected = selected === intent.slug;
            return (
              <button
                key={intent.slug}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() =>
                  setSelected((current) =>
                    current === intent.slug ? null : intent.slug,
                  )
                }
                className={`${styles.intentCard} ${isSelected ? styles.intentCardSelected : ""}`}
              >
                <span className={styles.intentIconWrap}>
                  {Icon ? <Icon /> : null}
                </span>
                <span className={styles.intentLabel}>{intent.label}</span>
                <span className={styles.intentDescription}>
                  {intent.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className={styles.formSection}
        aria-labelledby="form-title"
        aria-live="polite"
      >
        <h2 id="form-title" className={styles.sectionTitle}>
          {contactPage.formHeading}
        </h2>

        {selected === null ? (
          <p className={styles.formPrompt}>
            Choose an option above and the form will appear here.
          </p>
        ) : (
          <div className={styles.formPlaceholder}>
            <p className={styles.formPrompt}>
              Form fields for <strong>{selected}</strong> are being prepared
              in the next step.
            </p>
          </div>
        )}
      </section>

      <section className={styles.contactDetails} aria-labelledby="details-title">
        <h2 id="details-title" className={styles.sectionTitle}>
          Or reach us directly
        </h2>
        <ul className={styles.detailList}>
          {phone ? (
            <li className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone</span>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.detailLink}>
                {phone}
              </a>
            </li>
          ) : null}
          {company.contact.email ? (
            <li className={styles.detailItem}>
              <span className={styles.detailLabel}>Email</span>
              <a href={`mailto:${company.contact.email}`} className={styles.detailLink}>
                {company.contact.email}
              </a>
            </li>
          ) : null}
        </ul>
      </section>
    </main>
  );
}
