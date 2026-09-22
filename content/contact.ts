import { z } from "zod";

/**
 * Contact page content.
 *
 * The intent selector drives the form. Each intent has a label, a short
 * description, and a value used to pre-select the project type in the form
 * and to personalize the WhatsApp message.
 */

export const ContactIntentSchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  label: z.string().min(2).max(60),
  description: z.string().min(20).max(200),
});

export type ContactIntent = z.infer<typeof ContactIntentSchema>;

export const contactIntents: readonly ContactIntent[] = [
  {
    slug: "start-project",
    label: "Start a project",
    description:
      "You have a specific system in mind and want to discuss building it.",
  },
  {
    slug: "discuss-ai",
    label: "Discuss an AI solution",
    description:
      "You are considering AI, automation, or document intelligence and want a technical conversation.",
  },
  {
    slug: "discuss-data",
    label: "Discuss your data",
    description:
      "You have data and want to understand what to do with it: analysis, dashboards, or modeling.",
  },
  {
    slug: "build-business-software",
    label: "Build business software",
    description:
      "Your workflow has outgrown spreadsheets and generic tools, and you need a custom system.",
  },
  {
    slug: "something-else",
    label: "Something else",
    description:
      "A different question, a partnership, or a conversation about what we do.",
  },
] as const;

export const contactPageSchema = z.object({
  eyebrow: z.string().min(2).max(40),
  heading: z.string().min(10).max(140),
  lead: z.string().min(60).max(400),
  formHeading: z.string().min(4).max(120),
});

export type ContactPage = z.infer<typeof contactPageSchema>;

export const contactPage: ContactPage = contactPageSchema.parse({
  eyebrow: "Contact",
  heading: "Tell us about the problem",
  lead: "A conversation starts with the problem, not the technology. Choose what fits closest below, and we will ask the right questions.",
  formHeading: "A few details",
});

export type ContactIntentSlug = (typeof contactIntents)[number]["slug"];
