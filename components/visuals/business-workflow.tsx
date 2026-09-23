import styles from "./business-workflow.module.css";

/**
 * Business workflow diagram.
 *
 * Four nodes in a horizontal flow: Order, Stock, Invoice, Report. Each
 * node is a labelled box. A gold dot travels the connecting line slowly,
 * disabled under prefers-reduced-motion.
 *
 * Inline SVG. No raster assets, no JavaScript.
 */

const NODES = [
  { label: "Order", x: 40 },
  { label: "Stock", x: 173 },
  { label: "Invoice", x: 306 },
  { label: "Report", x: 440 },
] as const;

const NODE_WIDTH = 100;
const NODE_HEIGHT = 48;
const NODE_Y = 56;
const LINE_Y = NODE_Y + NODE_HEIGHT / 2;

export function BusinessWorkflow() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 540 140"
        role="img"
        aria-labelledby="workflow-title workflow-desc"
        className={styles.svg}
      >
        <title id="workflow-title">A business workflow</title>
        <desc id="workflow-desc">
          Four connected stages: order, stock, invoice, report.
        </desc>

        <line
          x1={NODES[0].x + NODE_WIDTH}
          y1={LINE_Y}
          x2={NODES[NODES.length - 1].x}
          y2={LINE_Y}
          className={styles.line}
        />

        <circle r={3} cy={LINE_Y} className={styles.dot} />

        {NODES.map((node) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y={NODE_Y}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx={4}
              className={styles.box}
            />
            <text
              x={node.x + NODE_WIDTH / 2}
              y={NODE_Y + NODE_HEIGHT / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.label}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
