import { Eyebrow } from "@/components/design-system/eyebrow";

import styles from "./page-header.module.css";

/**
 * PageHeader.
 *
 * The header block at the top of every interior page: eyebrow, h1, lead.
 * Wider than a section header because it is the page's primary heading.
 */

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className={styles.header}>
      <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
    </header>
  );
}
