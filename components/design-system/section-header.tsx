import styles from "./section-header.module.css";

/**
 * SectionHeader.
 *
 * Eyebrow + heading + optional lead paragraph. Used at the top of each
 * section on interior pages. The heading level is configurable because
 * the same visual pattern serves h1 on a page header and h2 on a section.
 */

export function SectionHeader({
  eyebrow,
  heading,
  lead,
  level = 2,
  id,
  className,
}: {
  eyebrow?: string;
  heading: string;
  lead?: string;
  level?: 1 | 2;
  id?: string;
  className?: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  const headingClass = level === 1 ? styles.titleLarge : styles.title;
  const combined = className
    ? `${styles.header} ${className}`
    : styles.header;

  return (
    <header className={combined}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Heading id={id} className={headingClass}>
        {heading}
      </Heading>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </header>
  );
}
