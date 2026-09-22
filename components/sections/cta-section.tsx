import { Button } from "@/components/design-system/button";
import { Eyebrow } from "@/components/design-system/eyebrow";

import styles from "./cta-section.module.css";

/**
 * CtaSection.
 *
 * The closing call-to-action block. Eyebrow, heading, body, and two
 * buttons. The two buttons are configurable so the same block can point
 * at different destinations on different pages.
 */

export function CtaSection({
  eyebrow = "Start",
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className={styles.section} aria-labelledby="cta-title" data-reveal>
      <div className={styles.layout}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id="cta-title" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.body}>{body}</p>
        <div className={styles.actions}>
          <Button href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
