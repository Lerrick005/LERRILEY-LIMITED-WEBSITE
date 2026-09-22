import { z } from "zod";

/**
 * Insights section content for the home page.
 *
 * Articles themselves live in content/insights/*.mdx and are added when
 * written and reviewed. This file only defines the categories Insights
 * covers and an honest statement about their status.
 *
 * Nothing here names an article, an author, or a publication date. Those
 * are added only when the article exists.
 */

export const InsightCategorySchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  label: z.string().min(2).max(40),
});

export type InsightCategory = z.infer<typeof InsightCategorySchema>;

export const insightCategories: readonly InsightCategory[] = [
  { slug: "engineering", label: "Engineering" },
  { slug: "ai", label: "AI" },
  { slug: "data", label: "Data" },
  { slug: "business-technology", label: "Business Technology" },
  { slug: "industry", label: "Industry" },
] as const;

export const insightsStatusSchema = z.object({
  eyebrow: z.string().min(2).max(40),
  heading: z.string().min(10).max(120),
  statement: z.string().min(40).max(400),
});

export type InsightsStatus = z.infer<typeof insightsStatusSchema>;

export const insightsStatus: InsightsStatus = insightsStatusSchema.parse({
  eyebrow: "Insights",
  heading: "Notes on engineering, in writing",
  statement:
    "Lerriley publishes articles on the topics we work with: engineering practice, applied AI, data systems, business technology and the industries where these matter. The first articles are in preparation. Each one is written, reviewed and published only when it is accurate and useful, not on a schedule.",
});
