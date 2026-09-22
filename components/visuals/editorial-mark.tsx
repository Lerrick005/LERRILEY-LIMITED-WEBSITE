import styles from "./editorial-mark.module.css";

/**
 * Editorial mark.
 *
 * A large opening quotation mark, drawn as a vector path. Represents the
 * act of writing and the reading that follows. Purely a mark, not an
 * illustration.
 *
 * Inline SVG. No raster assets, no JavaScript. Two thin gold rules cross
 * the composition, and a small dot travels along the lower rule on a slow
 * CSS keyframe that is disabled under prefers-reduced-motion.
 */

export function EditorialMark() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-labelledby="editorial-title editorial-desc"
        className={styles.svg}
      >
        <title id="editorial-title">Lerriley Insights</title>
        <desc id="editorial-desc">
          An opening quotation mark above a horizontal rule.
        </desc>

        {/* Quotation mark, drawn as two comma-like shapes. */}
        <g className={styles.quote}>
          {/* Left quote */}
          <path
            d="M 62 62
               C 62 42, 78 30, 98 30
               C 90 44, 86 58, 86 72
               C 86 88, 76 98, 62 98
               C 54 98, 48 92, 48 84
               C 48 74, 54 66, 62 62 Z"
            className={styles.quoteShape}
          />
          {/* Right quote */}
          <path
            d="M 142 62
               C 142 42, 158 30, 178 30
               C 170 44, 166 58, 166 72
               C 166 88, 156 98, 142 98
               C 134 98, 128 92, 128 84
               C 128 74, 134 66, 142 62 Z"
            className={styles.quoteShape}
          />
        </g>

        {/* Upper rule */}
        <line
          x1={40}
          y1={142}
          x2={200}
          y2={142}
          className={styles.ruleUpper}
        />

        {/* Lower rule */}
        <line
          x1={40}
          y1={168}
          x2={200}
          y2={168}
          className={styles.ruleLower}
        />

        {/* Traveling dot along the lower rule */}
        <circle
          r={3}
          cx={40}
          cy={168}
          className={styles.dot}
        />
      </svg>
    </div>
  );
}
