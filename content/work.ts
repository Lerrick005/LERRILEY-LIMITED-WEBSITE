import { z } from "zod";

/**
 * Work section content.
 *
 * Case studies publish through a separate data file when real material is
 * available. Until then, this file provides the honest alternative: a
 * statement of how Lerriley works, with no claims of past projects.
 *
 * Nothing here names a client, a result, a statistic or a delivered system.
 * It describes approach and process only.
 */

export const HowWeWorkSchema = z.object({
  eyebrow: z.string().min(2).max(40),
  heading: z.string().min(10).max(120),
  paragraphs: z.array(z.string().min(40).max(500)).min(2).max(4),
});

export type HowWeWork = z.infer<typeof HowWeWorkSchema>;

export const howWeWork: HowWeWork = HowWeWorkSchema.parse({
  eyebrow: "Work",
  heading: "Building in the open, publishing when it is ready",
  paragraphs: [
    "Lerriley is an engineering company. Our work exists, in code, in systems, in the day-to-day operation of organizations — but publishing it requires more than a screenshot. A case study is credible only when it names a real problem, describes the real solution, and is shared with the client's consent.",
    "We are preparing our first published case studies now. Each one will follow the same structure: the challenge as the organization experienced it, the architecture we designed, the engineering decisions with their trade-offs, and any outcome the client is willing to share. Nothing fabricated, nothing rounded up.",
    "In the meantime, the pages in this site describe what we build and how we work. If you would like to talk about a specific problem, the fastest path is a direct conversation.",
  ],
});
