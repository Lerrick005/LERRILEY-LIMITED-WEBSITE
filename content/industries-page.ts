import { z } from "zod";

import { industries } from "./industries";

/**
 * Expanded content for the Industries page.
 *
 * Each entry follows the spec structure:
 *   problem - what the industry typically struggles with
 *   solution - the technology approach that addresses it
 *   solutionSlug - the capability page this links to
 *
 * No client names, no case studies, no statistics. Descriptions only.
 */

export const IndustrySectionSchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  label: z.string().min(2).max(60),
  problem: z.string().min(60).max(400),
  solution: z.string().min(60).max(400),
  solutionSlug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  solutionLabel: z.string().min(2).max(60),
});

export type IndustrySection = z.infer<typeof IndustrySectionSchema>;

const SECTIONS: readonly IndustrySection[] = [
  {
    slug: "healthcare",
    label: "Healthcare",
    problem:
      "Clinic workflows spread across paper records, spreadsheets and disconnected tools. Patient information in one place, prescriptions in another, lab results in a third. Time spent searching instead of treating.",
    solution:
      "Clinical systems that hold patient records, appointments, laboratory results and prescriptions in one place. Workflows designed around how clinical teams actually work, not around how software vendors think they should.",
    solutionSlug: "business-software",
    solutionLabel: "Business Software",
  },
  {
    slug: "retail",
    label: "Retail",
    problem:
      "Stock levels that disagree with what is on the shelf. Sales records separate from inventory. Supplier management in a notebook. Reporting that arrives days after the decisions it should have informed.",
    solution:
      "Point of sale, inventory and reporting systems that share the same data. Stock updates in real time. Reports that show what is actually happening, at a resolution that supports daily decisions.",
    solutionSlug: "business-software",
    solutionLabel: "Business Software",
  },
  {
    slug: "education",
    label: "Education",
    problem:
      "Student records in one system, admissions in another, communication with parents in a third. Registration periods that create peaks of manual work. Reporting for regulators assembled by hand.",
    solution:
      "Institution systems that hold student records, admissions and communication together. Registration that can be completed by students and staff without manual data entry. Reports generated automatically in the formats regulators require.",
    solutionSlug: "business-software",
    solutionLabel: "Business Software",
  },
  {
    slug: "property-real-estate",
    label: "Property and Real Estate",
    problem:
      "Listings tracked in spreadsheets. Tenant records in a filing cabinet. Lease renewals remembered by whoever handles them. Maintenance requests arriving through phone calls and WhatsApp.",
    solution:
      "Property management systems that hold listings, tenants, leases and maintenance requests together. Automatic reminders for lease renewals. A clear view of what is owned, what is rented, and what is owed.",
    solutionSlug: "business-software",
    solutionLabel: "Business Software",
  },
  {
    slug: "professional-services",
    label: "Professional Services",
    problem:
      "Client records spread across email threads. Engagement tracking in a project tool that does not know about billing. Time recorded from memory at the end of a week. Reports for clients built by hand.",
    solution:
      "Practice management systems that hold clients, engagements, time and billing together. Reporting that reflects what was actually done, in a form clients can read and understand.",
    solutionSlug: "business-software",
    solutionLabel: "Business Software",
  },
] as const;

/** Return the sections in the same order as the base industries list. */
export function getIndustrySections(): readonly IndustrySection[] {
  return industries
    .map((industry) =>
      SECTIONS.find((section) => section.slug === industry.slug),
    )
    .filter((section): section is IndustrySection => Boolean(section));
}
