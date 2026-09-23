import styles from "./automation-trigger.module.css";

/**
 * Automation trigger diagram.
 *
 * A single trigger on the left, branching to three parallel actions on
 * the right. Curved connector lines fan out from the trigger. A gold dot
 * travels the top path, then the middle, then the bottom, then repeats.
 *
 * Inline SVG. No raster assets, no JavaScript. Static under
 * prefers-reduced-motion.
 */

const TRIGGER_X = 40;
const TRIGGER_Y = 120;
const TRIGGER_W = 100;
const TRIGGER_H = 56;

const ACTIONS = [
  { label: "Notify", y: 20 },
  { label: "Record", y: 120 },
  { label: "Sync", y: 220 },
] as const;

const ACTION_X = 340;
const ACTION_W = 100;
const ACTION_H = 56;

export function AutomationTrigger() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 480 300"
        role="img"
        aria-labelledby="auto-title auto-desc"
        className={styles.svg}
      >
        <title id="auto-title">An automation trigger</title>
        <desc id="auto-desc">
          One trigger on the left branches to three parallel actions on the
          right: notify, record, sync.
        </desc>

        {/* Trigger box */}
        <rect
          x={TRIGGER_X}
          y={TRIGGER_Y - TRIGGER_H / 2}
          width={TRIGGER_W}
          height={TRIGGER_H}
          rx={4}
          className={styles.trigger}
        />
        <text
          x={TRIGGER_X + TRIGGER_W / 2}
          y={TRIGGER_Y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles.label}
        >
          Trigger
        </text>

        {/* Curved connectors from trigger to each action */}
        {ACTIONS.map((action) => {
          const startX = TRIGGER_X + TRIGGER_W;
          const endX = ACTION_X;
          const startY = TRIGGER_Y;
          const endY = action.y;
          const midX = (startX + endX) / 2;
          return (
            <path
              key={action.label}
              d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
              className={styles.connector}
            />
          );
        })}

        {/* Action boxes */}
        {ACTIONS.map((action) => (
          <g key={action.label}>
            <rect
              x={ACTION_X}
              y={action.y - ACTION_H / 2}
              width={ACTION_W}
              height={ACTION_H}
              rx={4}
              className={styles.action}
            />
            <text
              x={ACTION_X + ACTION_W / 2}
              y={action.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.label}
            >
              {action.label}
            </text>
          </g>
        ))}

        {/* Traveling dot on the top path */}
        <circle
          r={4}
          cx={TRIGGER_X + TRIGGER_W}
          cy={TRIGGER_Y}
          className={styles.dot}
        />
      </svg>
    </div>
  );
}
