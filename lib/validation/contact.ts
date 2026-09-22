import { z } from "zod";

/**
 * Contact form schema.
 *
 * Shared by the client (for immediate inline validation) and the server
 * (for the authoritative check). Never trust a client-side check alone.
 */

const phoneRegex = /^[+\d][\d\s()-]{6,30}$/;

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Name is too long."),

  organization: z
    .string()
    .trim()
    .max(160, "Organization name is too long.")
    .optional()
    .or(z.literal("")),

  email: z
    .email("Please enter a valid email address.")
    .trim()
    .max(200, "Email is too long."),

  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .refine(
      (v) => v === "" || phoneRegex.test(v),
      "Please enter a valid phone number.",
    )
    .optional()
    .or(z.literal("")),

  projectType: z.enum([
    "start-project",
    "discuss-ai",
    "discuss-data",
    "build-business-software",
    "something-else",
  ]),

  problem: z
    .string()
    .trim()
    .min(20, "Please describe the problem in at least 20 characters.")
    .max(4000, "Description is too long."),

  budget: z.enum([
    "",
    "under-100k-kes",
    "100k-500k-kes",
    "500k-2m-kes",
    "over-2m-kes",
    "not-sure",
  ]),

  timeline: z.enum([
    "",
    "asap",
    "1-3-months",
    "3-6-months",
    "6-plus-months",
    "not-sure",
  ]),

  details: z
    .string()
    .trim()
    .max(2000, "Additional details are too long.")
    .optional()
    .or(z.literal("")),

  website: z.string().max(0, "Spam detected.").optional().or(z.literal("")),

  elapsedMs: z.coerce
    .number()
    .int()
    .min(2000, "Submission was too fast. Please try again."),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

export const BUDGET_OPTIONS = [
  { value: "", label: "Select a range (optional)" },
  { value: "under-100k-kes", label: "Under KES 100,000" },
  { value: "100k-500k-kes", label: "KES 100,000 - 500,000" },
  { value: "500k-2m-kes", label: "KES 500,000 - 2,000,000" },
  { value: "over-2m-kes", label: "Over KES 2,000,000" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "", label: "Select a timeline (optional)" },
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1-3 months" },
  { value: "3-6-months", label: "Within 3-6 months" },
  { value: "6-plus-months", label: "6 months or more" },
  { value: "not-sure", label: "Not sure yet" },
] as const;
