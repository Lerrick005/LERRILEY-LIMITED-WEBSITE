import styles from "./training-loop.module.css";

/**
 * Training loop diagram.
 *
 * Five nodes arranged in a circle, connected by arrows, representing the
 * iterative cycle of a machine learning system: Features, Model,
 * Prediction, Evaluation, Feedback. A gold dot travels the ring
 * continuously to indicate that the loop does not end.
 *
 * Inline SVG. No raster assets, no JavaScript. Static under
 * prefers-reduced-motion.
 */

const NODES = [
  { label: "Features", angle: -90 },
  { label: "Model", angle: -18 },
  { label: "Prediction", angle: 54 },
  { label: "Evaluation", angle: 126 },
  { label: "Feedback", angle: 198 },
] as const;

const CX = 200;
const CY = 200;
const R = 130;
const NODE_R = 42;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + Math.cos(rad) * radius,
    y: CY + Math.sin(rad) * radius,
  };
}

export function TrainingLoop() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-labelledby="loop-title loop-desc"
        className={styles.svg}
      >
        <title id="loop-title">The machine learning loop</title>
        <desc id="loop-desc">
          Five connected stages in a cycle: features, model, prediction,
          evaluation, feedback.
        </desc>

        {/* Ring */}
        <circle cx={CX} cy={CY} r={R} className={styles.ring} />

        {/* Nodes */}
        {NODES.map((node) => {
          const { x, y } = polar(node.angle, R);
          return (
            <g key={node.label}>
              <circle cx={x} cy={y} r={NODE_R} className={styles.node} />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.label}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Center mark */}
        <circle cx={CX} cy={CY} r={4} className={styles.center} />

        {/* Traveling dot */}
        <circle
          r={5}
          cx={CX}
          cy={CY - R}
          className={styles.dot}
        />
      </svg>
    </div>
  );
}
