import type { Metadata } from "next";

import { ContactFormSection } from "@/components/contact-form-section";
import { company } from "@/content/company";
import { contactPage } from "@/content/contact";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Lerriley about the problem you are trying to solve. We reply to every message.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const phone = company.contact.phone;
  const email = company.contact.email;

  return (
    <main id="main" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{contactPage.eyebrow}</p>
        <h1 className={styles.title}>{contactPage.heading}</h1>
        <p className={styles.lead}>{contactPage.lead}</p>
      </header>

      <ContactFormSection />

      <section className={styles.contactDetails} aria-labelledby="details-title">
        <h2 id="details-title" className={styles.sectionTitle}>
          Or reach us directly
        </h2>
        <ul className={styles.detailList}>
          {phone ? (
            <li className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone</span>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={styles.detailLink}
              >
                {phone}
              </a>
            </li>
          ) : null}
          {email ? (
            <li className={styles.detailItem}>
              <span className={styles.detailLabel}>Email</span>
              <a href={`mailto:${email}`} className={styles.detailLink}>
                {email}
              </a>
            </li>
          ) : null}
        </ul>
      </section>
    </main>
  );
}
