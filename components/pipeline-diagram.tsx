import styles from "./pipeline-diagram.module.css";

/**
 * Pipeline diagram.
 *
 * Problem -> Data -> Intelligence -> Software -> Impact.
 *
 * An inline SVG, drawn in code. No raster assets, no JavaScript animation,
 * no client bundle weight. The traveling dot uses a CSS keyframe; under
 * prefers-reduced-motion the dot is hidden and the diagram is static.
 *
 * The diagram illustrates Lerriley's engineering approach. It is not a
 * claim about past work.
 */

type Node = {
  label: string;
  x: number;
};

const NODES: readonly Node[] = [
  { label: "Problem", x: 40 },
  { label: "Data", x: 190 },
  { label: "Intelligence", x: 340 },
  { label: "Software", x: 490 },
  { label: "Impact", x: 640 },
] as const;

const NODE_Y = 60;
const LINE_Y = NODE_Y;

export function PipelineDiagram() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 720 120"
        role="img"
        aria-labelledby="pipeline-title pipeline-desc"
        className={styles.svg}
      >
        <title id="pipeline-title">The Lerriley engineering pipeline</title>
        <desc id="pipeline-desc">
          A five-stage flow: Problem, Data, Intelligence, Software, Impact.
        </desc>

        <line
          x1={NODES[0].x}
          y1={LINE_Y}
          x2={NODES[NODES.length - 1].x}
          y2={LINE_Y}
          className={styles.line}
        />

        <circle r={3} cy={LINE_Y} className={styles.dot} />

        {NODES.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={NODE_Y}
              r={5}
              className={styles.node}
            />
            <text
              x={node.x}
              y={NODE_Y + 32}
              textAnchor="middle"
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
