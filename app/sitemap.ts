import type { MetadataRoute } from "next";

import { getPublishedSolutions } from "@/content/solutions";
import { loadCollection } from "@/lib/content/loader";
import { InsightFrontmatterSchema } from "@/lib/content/schemas";

/**
 * Sitemap.
 *
 * Lists every page that should be indexed. Excludes:
 *   - The 404 page
 *   - Draft content (the loader filters drafts in production)
 *   - Utility pages (thank-you, redirect routes)
 *
 * The base URL comes from NEXT_PUBLIC_SITE_URL. When it is not set, the
 * sitemap is served with relative paths, which is acceptable in
 * development but should be configured in production.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  const now = new Date();

  /* --- Static pages ---------------------------------------------------- */

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/technology`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/company`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  /* --- Solution detail pages ------------------------------------------- */

  const solutionPages: MetadataRoute.Sitemap = getPublishedSolutions().map(
    (solution) => ({
      url: `${base}/solutions/${solution.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  /* --- Published Insights articles ------------------------------------- */

  const insights = loadCollection("insights", InsightFrontmatterSchema);
  const insightPages: MetadataRoute.Sitemap = insights.map((entry) => ({
    url: `${base}/insights/${entry.frontmatter.slug}`,
    lastModified: new Date(entry.frontmatter.updatedAt ?? entry.frontmatter.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...solutionPages, ...insightPages];
}
