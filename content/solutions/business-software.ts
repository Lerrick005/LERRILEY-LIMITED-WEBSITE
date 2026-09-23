import { z } from "zod";

/**
 * Business Software solution page content.
 *
 * Descriptions of problems Lerriley addresses, what we build, and how.
 * No client names, no case studies, no statistics. Descriptions of
 * capability only, per the Truth Protocol.
 */

const FAQSchema = z.object({
  question: z.string().min(10).max(180),
  answer: z.string().min(40).max(700),
});

export const SolutionPageSchema = z.object({
  eyebrow: z.string().min(2).max(60),
  title: z.string().min(4).max(140),
  lead: z.string().min(60).max(500),

  problemsHeading: z.string().min(4).max(120),
  problems: z.array(z.string().min(20).max(300)).min(3).max(6),

  buildsHeading: z.string().min(4).max(120),
  builds: z.array(z.string().min(20).max(300)).min(3).max(6),

  technologiesHeading: z.string().min(4).max(120),
  technologies: z.array(z.string().min(2).max(80)).min(3).max(12),

  useCasesHeading: z.string().min(4).max(120),
  useCases: z
    .array(
      z.object({
        title: z.string().min(4).max(80),
        body: z.string().min(40).max(400),
      }),
    )
    .min(3)
    .max(6),

  securityHeading: z.string().min(4).max(120),
  security: z.string().min(60).max(700),

  performanceHeading: z.string().min(4).max(120),
  performance: z.string().min(60).max(700),

  industriesHeading: z.string().min(4).max(120),
  industries: z.array(z.string().min(2).max(60)).min(2).max(6),

  faqHeading: z.string().min(4).max(120),
  faq: z.array(FAQSchema).min(5).max(8),

  ctaHeading: z.string().min(6).max(140),
  ctaBody: z.string().min(40).max(400),
});

export type SolutionPageContent = z.infer<typeof SolutionPageSchema>;

export const businessSoftwarePage: SolutionPageContent =
  SolutionPageSchema.parse({
    eyebrow: "Business Software",
    title: "Software that matches how the organization actually works",
    lead: "Most organizations do not need new software. They need software that fits the way they already operate, rather than forcing them into the workflow of a generic product. That is the whole reason to build custom, and it is what we do.",

    problemsHeading: "Problems we solve",
    problems: [
      "A spreadsheet that has become the operational system, and only one person fully understands it.",
      "Multiple tools that each hold part of the picture, with no shared source of truth.",
      "A generic product that covers most of the workflow, and forces manual workarounds for the rest.",
      "Reports that are assembled by hand, days after the decisions they were supposed to inform.",
      "A system that no longer matches the business, and cannot be changed safely.",
      "Records that exist but cannot be trusted, because data entry depends on people remembering to do it correctly.",
    ],

    buildsHeading: "What we build",
    builds: [
      "Management systems for clinics, pharmacies, retail operations, and professional practices.",
      "Inventory, stock, and supplier management systems that stay accurate under daily volume.",
      "Approval and workflow systems that enforce the organization's rules without becoming rigid.",
      "Customer, tenant, and client management systems with clear records and useful reporting.",
      "Internal tools that replace a spreadsheet and integrate with the systems already in use.",
      "Integration layers that connect existing tools so data moves between them without manual re-entry.",
    ],

    technologiesHeading: "Technologies",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
    ],

    useCasesHeading: "Typical use cases",
    useCases: [
      {
        title: "Clinic management system",
        body: "Patient records, appointments, consultations, laboratory results, and prescriptions in one system. Clinical workflows designed around how the team actually works, not around how a vendor thinks it should.",
      },
      {
        title: "Pharmacy point of sale and inventory",
        body: "Point of sale, stock levels, expiry tracking, supplier orders, and daily reporting. Stock records that reflect what is on the shelf, not what a system was told last week.",
      },
      {
        title: "Property management",
        body: "Listings, tenants, leases, and maintenance requests together. Automatic reminders for lease renewals. A clear view of what is owned, what is rented, and what is owed.",
      },
      {
        title: "Professional practice management",
        body: "Client records, engagements, time tracking, and billing together. Reporting that reflects what was actually done, in a form clients can read and understand.",
      },
    ],

    securityHeading: "Security considerations",
    security:
      "Business systems hold sensitive operational and personal data. We treat authentication, role-based access control, input validation, and audit logging as part of the build. Different roles see different data by design, not by convention. Actions that change records leave a trail. Backups run on a schedule, and there is a documented path to restore them. We describe these practices openly and claim no certifications we do not hold.",

    performanceHeading: "Performance considerations",
    performance:
      "A system that is slow in daily use stops being used. Business software has to be fast on the devices the team actually has, not on a developer's laptop. We design for the volume the organization expects, keep the interface responsive under load, and generate reports on the server rather than in the browser. Where a workflow runs on a slow connection, the system is designed for that constraint from the start.",

    industriesHeading: "Industries we serve",
    industries: [
      "Healthcare",
      "Retail",
      "Property and Real Estate",
      "Professional Services",
      "Education",
    ],

    faqHeading: "Frequently asked questions",
    faq: [
      {
        question: "When is custom software the right choice?",
        answer:
          "When the workflow is specific to the organization, stable, and runs at enough volume that the workaround is costing more than the system would. If a generic tool fits, we will recommend the generic tool. Custom software is not a default.",
      },
      {
        question: "How is the price determined?",
        answer:
          "By the scope, written down before the work starts. We do not quote by the hour for a project with an unknown end. The written definition describes what is being built, and the price reflects that scope. When the scope changes, the price changes with it.",
      },
      {
        question: "What happens to our data if we stop working with you?",
        answer:
          "The data belongs to you. It is exported in standard formats on request, and the system documentation describes the schema so that any competent engineering team can take over. There is no proprietary format and no lock-in.",
      },
      {
        question: "Can the system integrate with tools we already use?",
        answer:
          "Yes, where those tools expose an API or a documented data format. Integration is often the most valuable part of a custom system, because it removes the manual re-entry that creates errors. Where integration is not possible, we say so before starting.",
      },
      {
        question: "Who supports the system after launch?",
        answer:
          "We do, if that is what you want. Support arrangements are agreed in writing, and can include monitoring, security updates, and ongoing changes. Alternatively, we can hand over to your internal team with full documentation.",
      },
      {
        question: "How long does a business software project take?",
        answer:
          "It depends on scope. A focused system that replaces one spreadsheet can take a few weeks. A broader operational system with several integrated workflows takes longer. We provide a realistic timeline in the written scope, not a marketing one.",
      },
    ],

    ctaHeading: "Have a workflow that has outgrown its tools?",
    ctaBody:
      "Tell us what is happening now, and what you wish the system did. If it is the kind of problem we solve, we will say so. If it is not, we will say that too.",
  });
