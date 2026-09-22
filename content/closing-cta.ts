import { z } from "zod";

/**
 * Closing CTA section content for the home page.
 *
 * This is the last section of the page. It presents two paths: start a
 * conversation, or explore the capabilities in more detail.
 *
 * The primary CTA currently links to /solutions because /contact does not
 * exist yet. When /contact is built (Phase 4), the link is updated in one
 * place: app/page.tsx.
 */

export const ClosingCtaSchema = z.object({
  eyebrow: z.string().min(2).max(40),
  heading: z.string().min(10).max(160),
  body: z.string().min(40).max(400),
  primaryLabel: z.string().min(2).max(40),
  secondaryLabel: z.string().min(2).max(40),
});

export type ClosingCta = z.infer<typeof ClosingCtaSchema>;

export const closingCta: ClosingCta = ClosingCtaSchema.parse({
  eyebrow: "Start",
  heading: "Have a problem worth solving with technology?",
  body: "Lerriley works with organizations that have a specific problem in mind. Tell us what it is. If the problem fits what we do, we will say so. If it does not, we will say that too.",
  primaryLabel: "Start a Project",
  secondaryLabel: "Explore Capabilities",
});
