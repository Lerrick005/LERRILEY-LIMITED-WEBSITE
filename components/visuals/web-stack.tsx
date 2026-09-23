import styles from "./web-stack.module.css";

/**
 * Web stack diagram.
 *
 * Five layers, drawn as a vertical stack, each representing one stage of a
 * request from browser to CDN and back. Each layer is a labelled rectangle
 * with a small connector line between them.
 *
 * Inline SVG. No raster assets, no JavaScript. Static under
 * prefers-reduced-motion.
 */

const LAYERS = [
  { label: "HTML", sub: "Structure" },
  { label: "CSS", sub: "Presentation" },
  { label: "JavaScript", sub: "Behaviour" },
  { label: "HTTP", sub: "Transport" },
  { label: "CDN", sub: "Delivery" },
] as const;

const LAYER_HEIGHT = 40;
const LAYER_GAP = 12;
const LAYER_WIDTH = 200;
const START_Y = 20;

export function WebStack() {
  return (
    <div className={styles.wrapper}>
      <svg
        viewBox="0 0 240 320"
        role="img"
        aria-labelledby="webstack-title webstack-desc"
        className={styles.svg}
      >
        <title id="webstack-title">The web stack</title>
        <desc id="webstack-desc">
          Five layers: HTML for structure, CSS for presentation, JavaScript
          for behaviour, HTTP for transport, and CDN for delivery.
        </desc>

        {LAYERS.map((layer, i) => {
          const y = START_Y + i * (LAYER_HEIGHT + LAYER_GAP);
          return (
            <g key={layer.label} className={styles.layer}>
              <rect
                x={(240 - LAYER_WIDTH) / 2}
                y={y}
                width={LAYER_WIDTH}
                height={LAYER_HEIGHT}
                rx={4}
                className={styles.box}
              />
              <text
                x={120}
                y={y + 18}
                textAnchor="middle"
                className={styles.label}
              >
                {layer.label}
              </text>
              <text
                x={120}
                y={y + 32}
                textAnchor="middle"
                className={styles.sub}
              >
                {layer.sub}
              </text>
              {i < LAYERS.length - 1 ? (
                <line
                  x1={120}
                  y1={y + LAYER_HEIGHT}
                  x2={120}
                  y2={y + LAYER_HEIGHT + LAYER_GAP}
                  className={styles.connector}
                />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
