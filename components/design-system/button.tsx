import Link from "next/link";

import { TrackedLink } from "@/components/analytics/tracked-link";
import type { AnalyticsEvent } from "@/lib/analytics/events";

import styles from "./button.module.css";

/**
 * Button.
 *
 * One component for every button and button-like link on the site. The
 * variant prop selects the visual style; the rest of the props pass
 * through to either a Link or a button element.
 *
 * Rendering rule:
 *   - If href is provided, renders a Link. If a trackEvent is also
 *     provided, renders a TrackedLink that fires the event on click.
 *   - Otherwise, renders a button element with the given type and onClick.
 *
 * This is a server component. Interactivity comes from the props passed
 * in by the caller, not from state inside the component.
 */

type Variant = "primary" | "secondary" | "text";

type BaseProps = {
  variant?: Variant;
  size?: "default" | "small";
  className?: string;
  children: React.ReactNode;
  /** Optional analytics event to fire on click. */
  trackEvent?: AnalyticsEvent;
};

type LinkProps = BaseProps & {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

export type ButtonComponentProps = LinkProps | ButtonProps;

export function Button(props: ButtonComponentProps) {
  const {
    variant = "primary",
    size = "default",
    className,
    children,
    trackEvent,
  } = props;

  const classes = [
    styles.button,
    styles[variant],
    size === "small" ? styles.small : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    if (trackEvent) {
      return (
        <TrackedLink href={props.href} event={trackEvent} className={classes}>
          {children}
        </TrackedLink>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props as ButtonProps;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
