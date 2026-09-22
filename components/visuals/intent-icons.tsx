import styles from "./intent-icons.module.css";

/**
 * Intent icons.
 *
 * Five small geometric marks, one per contact intent, drawn as 32x32 SVGs.
 * Gold stroke, no fill, matching the other visuals on the site.
 *
 * Each icon is exported as a component so the contact page can render the
 * one matching the current intent.
 */

type Props = { className?: string };

export function StartProjectIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className ?? styles.icon}
      aria-hidden="true"
    >
      <circle cx={16} cy={16} r={12} />
      <line x1={16} y1={10} x2={16} y2={22} />
      <line x1={10} y1={16} x2={22} y2={16} />
    </svg>
  );
}

export function AiIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className ?? styles.icon}
      aria-hidden="true"
    >
      <circle cx={16} cy={16} r={4} />
      <circle cx={8} cy={8} r={2} />
      <circle cx={24} cy={8} r={2} />
      <circle cx={8} cy={24} r={2} />
      <circle cx={24} cy={24} r={2} />
      <line x1={16} y1={16} x2={8} y2={8} />
      <line x1={16} y1={16} x2={24} y2={8} />
      <line x1={16} y1={16} x2={8} y2={24} />
      <line x1={16} y1={16} x2={24} y2={24} />
    </svg>
  );
}

export function DataIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className ?? styles.icon}
      aria-hidden="true"
    >
      <ellipse cx={16} cy={9} rx={10} ry={3} />
      <path d="M 6 9 V 23 A 10 3 0 0 0 26 23 V 9" />
      <path d="M 6 16 A 10 3 0 0 0 26 16" />
    </svg>
  );
}

export function SoftwareIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className ?? styles.icon}
      aria-hidden="true"
    >
      <rect x={5} y={7} width={22} height={18} />
      <line x1={5} y1={12} x2={27} y2={12} />
      <line x1={11} y1={17} x2={15} y2={21} />
      <line x1={15} y1={17} x2={11} y2={21} />
      <line x1={19} y1={21} x2={23} y2={21} />
    </svg>
  );
}

export function SomethingElseIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className ?? styles.icon}
      aria-hidden="true"
    >
      <circle cx={16} cy={16} r={12} />
      <path d="M 12 13 A 4 4 0 0 1 20 13 C 20 16 16 16 16 19" />
      <circle cx={16} cy={23} r={1} />
    </svg>
  );
}

export const INTENT_ICONS = {
  "start-project": StartProjectIcon,
  "discuss-ai": AiIcon,
  "discuss-data": DataIcon,
  "build-business-software": SoftwareIcon,
  "something-else": SomethingElseIcon,
} as const;

export type IntentIconKey = keyof typeof INTENT_ICONS;
