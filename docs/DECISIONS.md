# DECISIONS

Format: `YYYY-MM-DD — decision — reason`.

2026-09-22 — Next.js App Router, TypeScript strict — required by MASTER-ULTRA-PROMPT §5; enables RSC default and static generation.
2026-09-22 — CSS custom properties + CSS Modules, no Tailwind — §4 forbids default Tailwind look; tokens live in one stylesheet.
2026-09-22 — Zod as single validation library (client, server, MDX frontmatter, env) — one schema language, fewer deps, §5.
2026-09-22 — No animation library — §4.5 permits CSS-first only; keeps INP budget.
2026-09-22 — MDX for Insights, not a CMS — §7; content is code-reviewed and version-controlled.
2026-09-22 — WhatsApp number in env var only — §8.3, §12; never in client bundle.
2026-09-22 — Case studies ship as `status: "draft"` — Truth Protocol §1; 404 in prod, noindex, unlinked.
2026-09-22 — No LocalBusiness schema until `baseLocation` is set — §9.2.
2026-09-22 — Next.js pinned to 15.5.25 exact (no caret) — MASTER-ULTRA-PROMPT written against 15 App Router; 16.x introduces breaking changes; caret ranges risk silent drift on fresh install.
2026-09-22 — Tailwind deliberately excluded (`--no-tailwind` at scaffold) — §4.1 uses CSS custom properties + CSS Modules.
2026-09-22 — `src/` directory deliberately omitted (`--no-src-dir`) — §5 file tree places `app/`, `components/`, `content/`, `lib/` at the root.
2026-09-22 — ACCEPTED RESIDUAL RISK: `postcss` <= 8.5.22 advisories GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849 — postcss is a transitive build-time dependency of `next`; the only fix path npm offers is `next@16.3.5` (breaking); postcss does not process untrusted input in our deployment (build-time CSS, not runtime); revisit at Phase 6 hardening gate or when a 15.5.x release bumps postcss. `sharp` advisories cleared by `npm audit fix` (sharp 0.34.5 → 0.35.4). Next.js patched from 15.5.4 → 15.5.25 through CVE-2025-66478 (RCE), CVE-2025-55184/55183, GHSA-p293-qw3h-jr36 (Windows RCE), and subsequent advisories.
2026-09-22 — `npm audit fix --force` NEVER to be run — it installs `next@16.3.5`, breaking the 15.5.x foundation; all security fixes applied deliberately, one version line at a time.