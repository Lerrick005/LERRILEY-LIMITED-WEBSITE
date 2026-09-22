import styles from "./work-pipeline.module.css";

/**
 * Work pipeline diagram.
 *
 * Five stages a case study passes through before publication:
 * Capture, Verify, Consent, Write, Publish. A gold dot travels the line
 * slowly, disabled under prefers-reduced-motion.
 *
 * This diagram makes explicit why the Work section on the home page and
 * this page show no case studies yet. It is not an apology; it is a
 * statement of the standard Lerriley holds itself to when publishing.
 */

const STAGES = [
  { label: "Capture", x: 40 },
  { label: "Verify", x: 155 },
  { label: "Consent", x: 270 },
  { label: "Write", x: 385 },
  { label: "Publish", x: 500 },
] as const;

const NODE_Y = 60;
const LINE_Y = NODE_Y;

export function WorkPipeline() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 540 120"
        role="img"
        aria-labelledby="pipeline-title pipeline-desc"
        className={styles.svg}
      >
        <title id="pipeline-title">The Lerriley case study pipeline</title>
        <desc id="pipeline-desc">
          A five-stage flow: capture, verify, consent, write, publish.
        </desc>

        <line
          x1={STAGES[0].x}
          y1={LINE_Y}
          x2={STAGES[STAGES.length - 1].x}
          y2={LINE_Y}
          className={styles.line}
        />

        <circle r={3} cy={LINE_Y} className={styles.dot} />

        {STAGES.map((stage) => (
          <g key={stage.label}>
            <circle
              cx={stage.x}
              cy={NODE_Y}
              r={5}
              className={styles.node}
            />
            <text
              x={stage.x}
              y={NODE_Y + 32}
              textAnchor="middle"
              className={styles.label}
            >
              {stage.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
