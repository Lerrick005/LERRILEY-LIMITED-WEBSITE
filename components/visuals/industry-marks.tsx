import styles from "./industry-marks.module.css";

/**
 * Industry marks.
 *
 * Five small geometric marks, one per industry, drawn as 48x48 SVGs.
 * Not icons from a library - drawn specifically for Lerriley. Gold stroke,
 * no fill, matching the visual language of the other page features.
 *
 * Each mark is a separate component so pages can import exactly the ones
 * they need.
 */

type MarkProps = { className?: string };

export function HealthcareMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className ?? styles.mark}
      aria-hidden="true"
    >
      <circle cx={24} cy={24} r={18} />
      <line x1={24} y1={12} x2={24} y2={36} />
      <line x1={12} y1={24} x2={36} y2={24} />
    </svg>
  );
}

export function RetailMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className ?? styles.mark}
      aria-hidden="true"
    >
      {/* Awning */}
      <path d="M 8 16 L 40 16 L 36 22 L 12 22 Z" />
      {/* Building */}
      <rect x={12} y={22} width={24} height={18} />
      {/* Door */}
      <line x1={22} y1={30} x2={22} y2={40} />
      <line x1={26} y1={30} x2={26} y2={40} />
    </svg>
  );
}

export function EducationMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className ?? styles.mark}
      aria-hidden="true"
    >
      {/* Open book: two pages meeting at the spine */}
      <path d="M 24 14 L 8 18 L 8 34 L 24 30 Z" />
      <path d="M 24 14 L 40 18 L 40 34 L 24 30 Z" />
      <line x1={24} y1={14} x2={24} y2={30} />
    </svg>
  );
}

export function PropertyMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className ?? styles.mark}
      aria-hidden="true"
    >
      {/* Roof */}
      <path d="M 8 24 L 24 10 L 40 24" />
      {/* Walls */}
      <rect x={14} y={24} width={20} height={16} />
      {/* Door */}
      <rect x={21} y={32} width={6} height={8} />
    </svg>
  );
}

export function ServicesMark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className ?? styles.mark}
      aria-hidden="true"
    >
      {/* Two interlocking arcs, suggesting a handshake abstractly */}
      <path d="M 6 24 A 10 10 0 0 1 26 24" />
      <path d="M 42 24 A 10 10 0 0 1 22 24" />
      <line x1={24} y1={16} x2={24} y2={32} />
    </svg>
  );
}

export const INDUSTRY_MARKS = {
  healthcare: HealthcareMark,
  retail: RetailMark,
  education: EducationMark,
  "property-real-estate": PropertyMark,
  "professional-services": ServicesMark,
} as const;

export type IndustryMarkKey = keyof typeof INDUSTRY_MARKS;
