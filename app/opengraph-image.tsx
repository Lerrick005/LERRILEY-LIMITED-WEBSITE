import { ImageResponse } from "next/og";

import { company } from "@/content/company";

/**
 * Default Open Graph image.
 *
 * Rendered at build time to a 1200x630 PNG and served at the root of the
 * site. Every page that does not define its own OG image uses this one.
 *
 * The image carries the site's visual identity: dark ground, gold accent,
 * display serif, mono eyebrow. Text is drawn directly, not loaded from a
 * font file, so the OG image does not add a font dependency at build time.
 *
 * All content reads from content/company.ts. No hardcoded strings.
 */

export const alt = `${company.displayName} - ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#c8a24a",
            }}
          >
            {company.primaryMarket}
          </div>

          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#f4f1ea",
              maxWidth: 900,
            }}
          >
            {company.tagline}
          </div>

          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#a8a49b",
              maxWidth: 800,
            }}
          >
            {company.positioning}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: "#f4f1ea",
            }}
          >
            {company.displayName}
          </div>

          <div
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontSize: 18,
              letterSpacing: 2,
              color: "#a8a49b",
            }}
          >
            TECHNOLOGY ENGINEERING
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 40,
            height: 1,
            background: "#c8a24a",
            opacity: 0.4,
          }}
        />
      </div>
    ),
    size,
  );
}
