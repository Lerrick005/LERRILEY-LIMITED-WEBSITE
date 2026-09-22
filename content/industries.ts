import { z } from "zod";

/**
 * Industries Lerriley works with.
 *
 * Each entry describes the kind of problem the industry typically faces
 * and the technology that addresses it. These are descriptions of what
 * Lerriley can build for the industry, not claims about specific clients
 * or past projects.
 */

export const IndustrySchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  label: z.string().min(2).max(60),
  description: z.string().min(40).max(280),
});

export type Industry = z.infer<typeof IndustrySchema>;

export const industries: readonly Industry[] = [
  {
    slug: "healthcare",
    label: "Healthcare",
    description:
      "Clinic workflows, patient records, scheduling, laboratory and pharmacy systems, designed around how clinical teams actually work.",
  },
  {
    slug: "retail",
    label: "Retail",
    description:
      "Point of sale, inventory, supplier management and reporting, built to stay accurate under daily volume.",
  },
  {
    slug: "education",
    label: "Education",
    description:
      "Student records, admissions, scheduling and communication systems, designed for institutions and training organizations.",
  },
  {
    slug: "property-real-estate",
    label: "Property and Real Estate",
    description:
      "Listings, tenant management, lease tracking and maintenance workflows, with a clear view of what is owned and what is owed.",
  },
  {
    slug: "professional-services",
    label: "Professional Services",
    description:
      "Client records, engagements, billing and reporting for firms that bill for expertise rather than product.",
  },
] as const;
