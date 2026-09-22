import styles from "./tech-stack.module.css";

/**
 * Technology stack diagram.
 *
 * Five horizontal planes stacked vertically, one per layer of the stack:
 * Frontend, Backend, Data, AI/ML, Infrastructure. Each plane is drawn as
 * a thin parallelogram in perspective. On hover, a plane lifts slightly
 * and its label brightens.
 *
 * Inline SVG. No raster assets, no JavaScript. The hover interactions are
 * pure CSS. Under prefers-reduced-motion, planes do not lift, only color.
 */

const LAYERS = [
  { label: "Frontend", y: 20 },
  { label: "Backend", y: 62 },
  { label: "Data", y: 104 },
  { label: "AI / ML", y: 146 },
  { label: "Infrastructure", y: 188 },
] as const;

export function TechStack() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 320 240"
        role="img"
        aria-labelledby="stack-title stack-desc"
        className={styles.svg}
      >
        <title id="stack-title">The Lerriley technology stack</title>
        <desc id="stack-desc">
          Five layers of technology, stacked from frontend at the top to
          infrastructure at the bottom.
        </desc>

        {LAYERS.map((layer, i) => {
          const depth = LAYERS.length - i;
          const offset = depth * 2;
          return (
            <g key={layer.label} className={styles.planeGroup}>
              {/* Parallelogram: a rectangle skewed to give depth. */}
              <polygon
                points={`
                  ${40 + offset},${layer.y}
                  ${280 - offset},${layer.y}
                  ${280 - offset},${layer.y + 24}
                  ${40 + offset},${layer.y + 24}
                `}
                className={styles.plane}
              />
              {/* Label */}
              <text
                x={160}
                y={layer.y + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.label}
              >
                {layer.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
