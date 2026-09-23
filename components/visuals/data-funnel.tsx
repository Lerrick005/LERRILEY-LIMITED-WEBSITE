import styles from "./data-funnel.module.css";

/**
 * Data funnel diagram.
 *
 * A horizontal funnel showing stages of data work narrowing from raw
 * records to a specific insight. Four trapezoids in decreasing width:
 * Collect, Clean, Analyze, Insight.
 *
 * Inline SVG. No raster assets, no JavaScript. Static under
 * prefers-reduced-motion.
 */

const STAGES = [
  { label: "Collect", width: 320, y: 20 },
  { label: "Clean", width: 240, y: 60 },
  { label: "Analyze", width: 160, y: 100 },
  { label: "Insight", width: 80, y: 140 },
] as const;

const HEIGHT = 32;
const CX = 200;

export function DataFunnel() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 400 200"
        role="img"
        aria-labelledby="funnel-title funnel-desc"
        className={styles.svg}
      >
        <title id="funnel-title">The data funnel</title>
        <desc id="funnel-desc">
          Four stages narrowing from raw records to insight: collect,
          clean, analyze, insight.
        </desc>

        {STAGES.map((stage, i) => {
          const nextWidth =
            i < STAGES.length - 1 ? STAGES[i + 1].width : stage.width * 0.4;
          return (
            <g key={stage.label}>
              {/* Trapezoid: wide at top, narrow at bottom */}
              <polygon
                points={`
                  ${CX - stage.width / 2},${stage.y}
                  ${CX + stage.width / 2},${stage.y}
                  ${CX + nextWidth / 2},${stage.y + HEIGHT}
                  ${CX - nextWidth / 2},${stage.y + HEIGHT}
                `}
                className={styles.stage}
              />
              <text
                x={CX}
                y={stage.y + HEIGHT / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.label}
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        {/* Final insight dot */}
        <circle cx={CX} cy={188} r={4} className={styles.insight} />
      </svg>
    </div>
  );
}
