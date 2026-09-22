import { z } from "zod";

/**
 * Solution capability definitions.
 *
 * Each entry is a service Lerriley OFFERS. Nothing here claims a client,
 * a project, or a delivered result. Descriptions state what Lerriley
 * builds; they do not state what Lerriley has built.
 *
 * The `status` field controls whether the solution's detail page is live:
 *   - "published" - the detail page exists and is linked from the site
 *   - "draft"     - the slug exists for planning, but no page exists yet
 *
 * Until a solution page exists, home and index links point to /solutions
 * (the index itself), never to /solutions/<slug>. This keeps every clickable
 * link resolving to a real page (addendum rule 7).
 */

export const SolutionSchema = z.object({
  slug: z
    .string()
    .regex(
      /^[a-z][a-z0-9-]*$/,
      "slug must be lowercase, start with a letter, and contain only letters, digits and hyphens",
    ),
  title: z.string().min(2),
  /** One sentence. Used in list contexts and metadata descriptions. */
  summary: z.string().min(20).max(180),
  /** Short label for eyebrow/ordered contexts. Optional. */
  label: z.string().min(2).max(40).optional(),
  /** Display order. Lower numbers appear first. */
  order: z.number().int().nonnegative(),
  status: z.enum(["draft", "published"]),
});

export type Solution = z.infer<typeof SolutionSchema>;

export const solutions: readonly Solution[] = [
  {
    slug: "web-development",
    title: "Web Development",
    summary:
      "High-performance websites and sophisticated web applications, engineered for speed, accessibility and search visibility.",
    order: 1,
    status: "draft",
  },
  {
    slug: "business-software",
    title: "Business Software",
    summary:
      "Custom software designed around how an organization actually works, rather than a template it has to work around.",
    order: 2,
    status: "draft",
  },
  {
    slug: "ai-software",
    title: "AI Software",
    summary:
      "Practical AI engineering: integrations, intelligent automation, document intelligence and natural-language interfaces applied where they deliver measurable value.",
    order: 3,
    status: "draft",
  },
  {
    slug: "data-science",
    title: "Data Science",
    summary:
      "Analysis, visualization, dashboards and data pipelines that turn scattered information into decisions an organization can act on.",
    order: 4,
    status: "draft",
  },
  {
    slug: "machine-learning",
    title: "Machine Learning",
    summary:
      "Predictive modeling, classification, forecasting and anomaly detection, with explicit evaluation and monitoring after deployment.",
    order: 5,
    status: "draft",
  },
  {
    slug: "automation",
    title: "Automation",
    summary:
      "Workflows that remove repetitive manual work through reliable integrations, with clear auditability and recovery paths.",
    order: 6,
    status: "draft",
  },
] as const;

/** Solutions in display order. */
export function getSolutions(): readonly Solution[] {
  return [...solutions].sort((a, b) => a.order - b.order);
}

/** Solutions whose detail page is live and can be linked directly. */
export function getPublishedSolutions(): readonly Solution[] {
  return getSolutions().filter((s) => s.status === "published");
}

/** Look up a solution by slug. Returns undefined if not found. */
export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
