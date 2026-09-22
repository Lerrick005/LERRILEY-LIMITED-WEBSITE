import styles from "./lost-route.module.css";

/**
 * Lost route visual.
 *
 * A single SVG line that starts as if drawing a route, then stops. It
 * represents the missing path. On hover, the line curls slightly as if
 * searching. Under prefers-reduced-motion, the hover does nothing.
 */

export function LostRoute() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 200 80"
        className={styles.svg}
        role="img"
        aria-labelledby="lost-title lost-desc"
      >
        <title id="lost-title">A route that stops</title>
        <desc id="lost-desc">
          A horizontal line that begins drawing and then stops partway.
        </desc>

        <line
          x1={0}
          y1={40}
          x2={70}
          y2={40}
          className={styles.solid}
        />

        <path
          d="M 70 40 C 90 40, 100 30, 118 32"
          className={styles.fading}
        />

        <circle cx={118} cy={32} r={3} className={styles.dot} />
      </svg>
    </div>
  );
}
