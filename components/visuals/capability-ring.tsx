import styles from "./capability-ring.module.css";

/**
 * Capability ring.
 *
 * Six arcs forming a circle, one per solution capability, with a gold dot
 * traveling the circumference. Represents the six capabilities as one
 * connected system rather than six separate offerings.
 *
 * Inline SVG. No raster assets, no JavaScript. The traveling dot uses a
 * CSS keyframe that is disabled under prefers-reduced-motion.
 */

const LABELS = [
  "Web",
  "Business",
  "AI",
  "Data",
  "ML",
  "Automation",
] as const;

const CX = 120;
const CY = 120;
const RADIUS = 88;
const ARC_LENGTH = 360 / LABELS.length;
const DOT_R = 4;

export function CapabilityRing() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-labelledby="ring-title ring-desc"
        className={styles.svg}
      >
        <title id="ring-title">Lerriley capabilities</title>
        <desc id="ring-desc">
          Six engineering capabilities arranged as a continuous ring: web,
          business software, AI, data, machine learning and automation.
        </desc>

        {LABELS.map((label, i) => {
          const startAngle = i * ARC_LENGTH - 90;
          const endAngle = (i + 1) * ARC_LENGTH - 90;
          const gap = 4;
          const path = describeArc(
            CX,
            CY,
            RADIUS,
            startAngle + gap,
            endAngle - gap,
          );

          return (
            <g key={label}>
              <path d={path} className={styles.arc} />
              <text
                x={arcLabelX(i)}
                y={arcLabelY(i)}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.label}
              >
                {label}
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={2} className={styles.center} />

        <circle
          r={DOT_R}
          cx={CX}
          cy={CY - RADIUS}
          className={styles.dot}
        />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Geometry helpers                                                        */
/* ---------------------------------------------------------------------- */

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number,
): { x: number; y: number } {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    r,
    r,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function arcLabelX(i: number): number {
  const angle = i * ARC_LENGTH + ARC_LENGTH / 2 - 90;
  return polarToCartesian(CX, CY, RADIUS * 0.7, angle).x;
}

function arcLabelY(i: number): number {
  const angle = i * ARC_LENGTH + ARC_LENGTH / 2 - 90;
  return polarToCartesian(CX, CY, RADIUS * 0.7, angle).y;
}
