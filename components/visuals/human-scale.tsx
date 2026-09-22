import styles from "./human-scale.module.css";

/**
 * Human-scale composition.
 *
 * A group of dots, each with a unique size, position, and drift timing.
 * The visual says: this is a group of individuals, not a uniform mass.
 *
 * Inline SVG. No raster assets, no JavaScript. Each dot's slow drift is
 * a CSS keyframe with a unique delay. Under prefers-reduced-motion, all
 * dots hold still and only the color hover remains.
 */

type Dot = {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  duration: number;
  highlighted?: boolean;
};

const DOTS: readonly Dot[] = [
  { cx: 40, cy: 90, r: 5, delay: 0, duration: 9 },
  { cx: 70, cy: 60, r: 4, delay: 1.2, duration: 11 },
  { cx: 90, cy: 110, r: 6, delay: 2.4, duration: 8 },
  { cx: 120, cy: 50, r: 5, delay: 0.6, duration: 10 },
  { cx: 140, cy: 100, r: 7, delay: 3.0, duration: 12, highlighted: true },
  { cx: 170, cy: 70, r: 4, delay: 1.8, duration: 9.5 },
  { cx: 200, cy: 110, r: 6, delay: 4.2, duration: 10.5 },
  { cx: 230, cy: 60, r: 5, delay: 2.0, duration: 11.5 },
  { cx: 260, cy: 100, r: 4, delay: 3.6, duration: 8.5 },
  { cx: 290, cy: 75, r: 6, delay: 1.4, duration: 10 },
  { cx: 320, cy: 105, r: 5, delay: 4.8, duration: 9 },
  { cx: 350, cy: 65, r: 4, delay: 2.8, duration: 12 },
  { cx: 380, cy: 95, r: 6, delay: 0.9, duration: 10 },
] as const;

export function HumanScale() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 420 160"
        role="img"
        aria-labelledby="human-title human-desc"
        className={styles.svg}
      >
        <title id="human-title">The people behind Lerriley</title>
        <desc id="human-desc">
          A group of dots, each unique in size and position, representing
          individual people rather than a uniform team.
        </desc>

        {DOTS.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            className={dot.highlighted ? styles.dotHighlight : styles.dot}
            style={
              {
                animationDelay: `${dot.delay}s`,
                animationDuration: `${dot.duration}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}
