import Image from "next/image";
import Link from "next/link";

import { company } from "@/content/company";

import styles from "./site-footer.module.css";

/**
 * Site footer.
 *
 * Contains the logo, a short positioning line, a small navigation set,
 * contact details, and a legal line.
 *
 * Only links to routes that exist are rendered. As more pages ship, they
 * are added here. No link ever 404s.
 *
 * Contact details come from content/company.ts. If a value is null, the
 * corresponding line is omitted. No fabricated contacts.
 */

export function SiteFooter() {
  const year = new Date().getFullYear();
  const phone = company.contact.phone;
  const email = company.contact.email;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" aria-label="Lerriley Limited, home" className={styles.logoLink}>
            <Image
              src="/lerriley-logo-transparent.png"
              alt="Lerriley Limited Company"
              width={638}
              height={639}
              sizes="180px"
              className={styles.logo}
            />
          </Link>
          <p className={styles.tagline}>{company.tagline}</p>
        </div>

        <nav className={styles.column} aria-label="Explore">
          <h2 className={styles.columnTitle}>Explore</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/solutions" className={styles.link}>
                Solutions
              </Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.column} aria-label="Company">
          <h2 className={styles.columnTitle}>Company</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/solutions" className={styles.link}>
                About
              </Link>
            </li>
            <li>
              <Link href="/solutions" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Reach us</h2>
          <ul className={styles.list}>
            {phone ? (
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className={styles.link}
                >
                  {phone}
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className={styles.link}>
                  {email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.legal}>
          &copy; {year} {company.legalName}. {company.primaryMarket}.
        </p>
      </div>
    </footer>
  );
}
