import styles from "./article-anchor.module.css";

/**
 * Article anchor.
 *
 * A thin horizontal rule interrupted by a small diamond at the center.
 * A typographic ornament that marks the opening of an article. Appears
 * on every article page in the same position, making it a signature of
 * the template rather than a decoration.
 *
 * Purely decorative: it is marked aria-hidden so screen readers skip it.
 */

export function ArticleAnchor() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg
        viewBox="0 0 240 12"
        className={styles.svg}
        preserveAspectRatio="xMidYMid meet"
      >
        <line x1={0} y1={6} x2={108} y2={6} className={styles.rule} />
        <line x1={132} y1={6} x2={240} y2={6} className={styles.rule} />
        <g className={styles.diamond}>
          <polygon points="120,0 128,6 120,12 112,6" />
        </g>
      </svg>
    </div>
  );
}
