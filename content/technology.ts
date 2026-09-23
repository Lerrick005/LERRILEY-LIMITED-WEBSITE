import { z } from "zod";

import { company } from "./company";

/**
 * Technology categories and decision principles.
 *
 * The list of technologies per category comes from company.verifiedTechnologies
 * in content/company.ts. The approach section describes how technology
 * decisions are made - a method, not a list.
 *
 * Nothing here claims a vendor partnership, a certification, or a delivered
 * result.
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

export function getTechnologySummary(): readonly TechnologySummary[] {
  return CATEGORIES.map((c) => ({
    ...c,
    items: company.verifiedTechnologies[c.key],
  }));
}

/* ---------------------------------------------------------------------- */
/* Decision principles                                                     */
/* ---------------------------------------------------------------------- */

export const DecisionPrincipleSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  title: z.string().min(2).max(60),
  body: z.string().min(60).max(400),
});

export type DecisionPrinciple = z.infer<typeof DecisionPrincipleSchema>;

export const decisionPrinciples: readonly DecisionPrinciple[] = [
  {
    number: "01",
    title: "The problem chooses the technology",
    body: "We do not start with a preferred stack. We start with the workflow, the volume of data, the number of users, and the operational constraints. The technology is the answer to a question the problem has already asked. If a simpler tool answers the same question, the simpler tool wins.",
  },
  {
    number: "02",
    title: "The smallest stack that works",
    body: "Every technology in a system is a cost: to maintain, to hire for, to operate, and to reason about. The right stack is the smallest one that meets the requirement. We do not add a queue where a database table would suffice, or a microservice where a function would. Complexity is added only when it earns something the simpler design cannot provide.",
  },
  {
    number: "03",
    title: "Boring where it matters",
    body: "A database, a web framework, and an operating system are places where stability matters more than novelty. We choose tools with track records, long-term support, and clear migration paths. Where innovation earns its place - in an AI pipeline, in a specific algorithm, in a bespoke workflow - we innovate. Everywhere else, we prefer what has already proven itself.",
  },
  {
    number: "04",
    title: "Documented and reversible",
    body: "Every technology decision is written down with its reasoning. When a decision needs to be reversed - a new constraint, a different requirement, a security issue - the reasoning tells us what the decision was protecting, so the replacement can protect the same thing. A system whose decisions are documented can evolve without being rebuilt.",
  },
];

export const approachSchema = z.object({
  heading: z.string().min(4).max(80),
  lead: z.string().min(60).max(400),
});

export type ApproachContent = z.infer<typeof approachSchema>;

export const approachContent: ApproachContent = approachSchema.parse({
  heading: "How technology is chosen",
  lead: "Technology selection is not a preference exercise. It is an engineering decision with consequences that last for the life of the system. Four principles guide how we make it.",
});
