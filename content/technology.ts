
import { z } from "zod";

import { company } from "./company";

/**
 * Technology categories for the home page Technology section.
 *
 * The list of technologies per category comes from company.verifiedTechnologies
 * in content/company.ts. This file only adds a short rationale for each
 * category. Nothing here claims a vendor partnership, a certification, or a
 * delivered result.
 */

export const TechnologyCategorySchema = z.object({
  key: z.enum(["frontend", "backend", "data", "aiMl", "infrastructure"]),
  label: z.string().min(2).max(40),
  rationale: z.string().min(30).max(200),
});

export type TechnologyCategory = z.infer<typeof TechnologyCategorySchema>;

const CATEGORIES: readonly TechnologyCategory[] = [
  {
    key: "frontend",
    label: "Frontend",
    rationale:
      "What users see and interact with. Chosen for speed, accessibility and long-term maintainability.",
  },
  {
    key: "backend",
    label: "Backend",
    rationale:
      "Where logic and data live. Chosen for reliability, clear APIs and predictable behaviour under load.",
  },
  {
    key: "data",
    label: "Data",
    rationale:
      "The database layer. Chosen for correctness, integrity and a data model that reflects the real world.",
  },
  {
    key: "aiMl",
    label: "AI and Machine Learning",
    rationale:
      "Applied where they deliver measurable practical value, not for their own sake.",
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    rationale:
      "Deployment, backups and monitoring. Chosen for operational simplicity and a clear recovery path.",
  },
] as const;

export type TechnologySummary = TechnologyCategory & {
  items: readonly string[];
};

/** Return the categories with their technologies from company.ts attached. */
export function getTechnologySummary(): readonly TechnologySummary[] {
  return CATEGORIES.map((c) => ({
    ...c,
    items: company.verifiedTechnologies[c.key],
  }));
}
