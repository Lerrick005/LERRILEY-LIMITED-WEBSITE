import { z } from "zod";

/**
 * Trust section content.
 *
 * Each item describes a PRINCIPLE about how Lerriley works. None of these
 * are claims of achievement. There are no certifications, awards, client
 * names, partnerships or statistics in this file, and there must never be
 * unless the underlying fact exists and is verifiable.
 */

export const TrustPrincipleSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  title: z.string().min(2).max(60),
  body: z.string().min(30).max(260),
});

export type TrustPrinciple = z.infer<typeof TrustPrincipleSchema>;

export const trustPrinciples: readonly TrustPrinciple[] = [
  {
    number: "01",
    title: "Scope is written down",
    body: "Every engagement begins with a written definition of what is being built, what is not, and what success looks like. No ambiguity carried into the work.",
  },
  {
    number: "02",
    title: "Delivered in increments",
    body: "Work is released in reviewable stages with working software at each step. Progress is visible throughout the engagement, not saved for a single reveal at the end.",
  },
  {
    number: "03",
    title: "Security is a practice",
    body: "Authentication, access control, input validation and secure deployment are treated as part of the work, not an afterthought. No certifications are claimed; the practice is described openly.",
  },
  {
    number: "04",
    title: "You own what we build",
    body: "Code, data and infrastructure belong to the client. There is no lock-in to a proprietary platform. Documentation is delivered alongside the system.",
  },
] as const;
