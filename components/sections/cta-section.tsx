import { Button } from "@/components/design-system/button";
import { Eyebrow } from "@/components/design-system/eyebrow";
import type { AnalyticsEvent } from "@/lib/analytics/events";

import styles from "./cta-section.module.css";

/**
 * CtaSection.
 *
 * The closing call-to-action block. Eyebrow, heading, body, and two
 * buttons. The two buttons are configurable so the same block can point
 * at different destinations on different pages.
 *
 * The optional trackEvent props are fired by the buttons on click. They
 * are passed straight through to the Button component, which routes them
 * via TrackedLink when present.
 */

export function CtaSection({
  eyebrow = "Start",
  heading,
  body,
  primaryLabel,
  primaryHref,
  primaryTrackEvent,
  secondaryLabel,
  secondaryHref,
  secondaryTrackEvent,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  primaryTrackEvent?: AnalyticsEvent;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryTrackEvent?: AnalyticsEvent;
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
          <Button
            href={primaryHref}
            variant="primary"
            trackEvent={primaryTrackEvent}
          >
            {primaryLabel}
          </Button>
          <Button
            href={secondaryHref}
            variant="secondary"
            trackEvent={secondaryTrackEvent}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
