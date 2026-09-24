import { ImageResponse } from "next/og";

import { company } from "@/content/company";
import { aiSoftwarePage as page } from "@/content/solutions/ai-software";

export const alt = `${page.title} - ${company.displayName}`;
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
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
            {page.eyebrow}
          </div>

          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "#f4f1ea",
              maxWidth: 1000,
            }}
          >
            {page.title}
          </div>

          <div
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#a8a49b",
              maxWidth: 900,
            }}
          >
            {page.lead.slice(0, 180)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 32, color: "#f4f1ea" }}>
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
            SOLUTIONS
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
