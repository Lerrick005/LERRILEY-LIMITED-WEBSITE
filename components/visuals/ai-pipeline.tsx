import styles from "./ai-pipeline.module.css";

/**
 * AI pipeline diagram.
 *
 * Five stages in a horizontal flow: Data In, Preprocess, Model,
 * Decision, Output. The Decision node is drawn larger to indicate the
 * branch that a practical AI system always contains - the point where
 * the system decides whether to use the model's output or route to a
 * human.
 *
 * Inline SVG. No raster assets, no JavaScript. Static under
 * prefers-reduced-motion.
 */

const NODES = [
  { label: "Data In", x: 20, size: "normal" },
  { label: "Preprocess", x: 130, size: "normal" },
  { label: "Model", x: 240, size: "normal" },
  { label: "Decision", x: 350, size: "large" },
  { label: "Output", x: 480, size: "normal" },
] as const;

const NODE_Y = 60;
const NODE_HEIGHT = 48;
const LINE_Y = NODE_Y + NODE_HEIGHT / 2;

export function AiPipeline() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 580 160"
        role="img"
        aria-labelledby="ai-title ai-desc"
        className={styles.svg}
      >
        <title id="ai-title">The AI pipeline</title>
        <desc id="ai-desc">
          Five stages: data in, preprocess, model, decision, output. The
          decision stage is where the system decides whether to use the
          model output or route to a human.
        </desc>

        <line
          x1={NODES[0].x + 80}
          y1={LINE_Y}
          x2={NODES[NODES.length - 1].x}
          y2={LINE_Y}
          className={styles.line}
        />

        <circle r={3} cy={LINE_Y} className={styles.dot} />

        {NODES.map((node) => {
          const width = node.size === "large" ? 100 : 80;
          const height = node.size === "large" ? 60 : NODE_HEIGHT;
          const y = node.size === "large" ? NODE_Y - 6 : NODE_Y;
          return (
            <g key={node.label}>
              <rect
                x={node.x}
                y={y}
                width={width}
                height={height}
                rx={4}
                className={
                  node.size === "large" ? styles.boxLarge : styles.box
                }
              />
              <text
                x={node.x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.label}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
