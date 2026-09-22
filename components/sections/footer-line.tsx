import { company } from "@/content/company";

import styles from "./footer-line.module.css";

/**
 * FooterLine.
 *
 * The company name line at the bottom of some interior pages. Reads from
 * content/company.ts so the legal name and market are consistent across
 * the site.
 */

export function FooterLine() {
  return (
    <p className={styles.line}>
      {company.legalName} - {company.primaryMarket}
    </p>
  );
}
