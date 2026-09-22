import styles from "./compass-mark.module.css";

/**
 * Compass mark.
 *
 * A minimal compass rose: four points, a center ring, and a slow rotating
 * needle. Represents direction and the company's long-term vision.
 *
 * Inline SVG. No raster assets, no JavaScript. The rotating needle uses a
 * CSS keyframe that is disabled under prefers-reduced-motion.
 */

const CX = 120;
const CY = 120;

export function CompassMark() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-labelledby="compass-title compass-desc"
        className={styles.svg}
      >
        <title id="compass-title">Lerriley direction</title>
        <desc id="compass-desc">
          A compass rose representing the long-term direction of the company.
        </desc>

        {/* Outer ring */}
        <circle cx={CX} cy={CY} r={96} className={styles.outerRing} />

        {/* Inner ring */}
        <circle cx={CX} cy={CY} r={64} className={styles.innerRing} />

        {/* Four cardinal ticks */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = CX + Math.cos(rad) * 96;
          const y1 = CY + Math.sin(rad) * 96;
          const x2 = CX + Math.cos(rad) * 86;
          const y2 = CY + Math.sin(rad) * 86;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={styles.tick}
            />
          );
        })}

        {/* Cardinal labels */}
        <text x={CX} y={24} textAnchor="middle" dominantBaseline="middle" className={styles.cardinal}>
          N
        </text>
        <text x={CX} y={216} textAnchor="middle" dominantBaseline="middle" className={styles.cardinal}>
          S
        </text>
        <text x={24} y={CY} textAnchor="middle" dominantBaseline="middle" className={styles.cardinal}>
          W
        </text>
        <text x={216} y={CY} textAnchor="middle" dominantBaseline="middle" className={styles.cardinal}>
          E
        </text>

        {/* Needle, rotates slowly. Two triangles: north point and south tail. */}
        <g className={styles.needle}>
          <polygon
            points={`${CX},${CY - 56} ${CX - 8},${CY} ${CX + 8},${CY}`}
            className={styles.needleNorth}
          />
          <polygon
            points={`${CX},${CY + 56} ${CX - 8},${CY} ${CX + 8},${CY}`}
            className={styles.needleSouth}
          />
        </g>

        {/* Center hub */}
        <circle cx={CX} cy={CY} r={4} className={styles.hub} />
      </svg>
    </div>
  );
}
