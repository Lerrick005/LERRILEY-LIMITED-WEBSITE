import { z } from "zod";

/**
 * The Lerriley engineering process.
 *
 * Seven stages, used consistently across the site. This is a description of
 * how Lerriley works. It is not a claim about specific projects or clients.
 */

export const ProcessStepSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z][a-z0-9-]*$/, "slug must be lowercase, hyphenated"),
  number: z
    .string()
    .regex(/^\d{2}$/, "number must be two digits, e.g. 01"),
  title: z.string().min(2).max(40),
  description: z.string().min(30).max(220),
});

export type ProcessStep = z.infer<typeof ProcessStepSchema>;

export const processSteps: readonly ProcessStep[] = [
  {
    slug: "discover",
    number: "01",
    title: "Discover",
    description:
      "We start with the problem as it exists. Conversations, workflow observation, and review of the tools already in use.",
  },
  {
    slug: "define",
    number: "02",
    title: "Define",
    description:
      "We turn findings into a clear definition of the system: what it does, who uses it, and what success looks like.",
  },
  {
    slug: "architect",
    number: "03",
    title: "Architect",
    description:
      "We design the structure: data model, interfaces, integrations and the technology choices that support them.",
  },
  {
    slug: "build",
    number: "04",
    title: "Build",
    description:
      "We write the software in small, reviewable increments, with working demonstrations at each stage rather than a single reveal at the end.",
  },
  {
    slug: "test",
    number: "05",
    title: "Test",
    description:
      "We verify behaviour, edge cases, performance and accessibility against the definition agreed at the start.",
  },
  {
    slug: "deploy",
    number: "06",
    title: "Deploy",
    description:
      "We release the system into real use, with backups, monitoring and a clear path to roll back if needed.",
  },
  {
    slug: "improve",
    number: "07",
    title: "Improve",
    description:
      "We measure how the system behaves in production and refine it as the organization's needs change.",
  },
] as const;
