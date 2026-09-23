import { z } from "zod";

/**
 * Data Science solution page content.
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

export const dataSciencePage: SolutionPageContent = SolutionPageSchema.parse({
  eyebrow: "Data Science",
  title: "Turning scattered information into decisions",
  lead: "Most organizations already have the data they need. What they do not have is a way to see it, understand it, or act on it. Data science is the work of turning records into insight - analysis, visualization, and the pipelines that keep both current.",

  problemsHeading: "Problems we solve",
  problems: [
    "Reports that take days to assemble, when the questions they answer change weekly.",
    "Data spread across systems that do not talk to each other, so no one has a complete picture.",
    "Records that exist but cannot be trusted, because data entry has no structure or validation.",
    "Decisions made on instinct because the numbers are too hard to get to.",
    "Dashboards that show activity but do not answer the questions the business is actually asking.",
    "Historical data that sits unused because no one has time to analyze it.",
  ],

  buildsHeading: "What we build",
  builds: [
    "Reporting and dashboard systems that reflect the questions the organization is actually asking.",
    "Data pipelines that consolidate records from multiple sources into a single, trustworthy view.",
    "Analysis and investigation work: answering a specific question from the data that exists.",
    "Data models that structure raw records into something that can be queried and reported on.",
    "Business intelligence systems that replace manual spreadsheet assembly with an automated view.",
    "Data quality tooling that identifies inconsistencies and tracks them over time.",
  ],

  technologiesHeading: "Technologies",
  technologies: [
    "Python",
    "PostgreSQL",
    "data pipelines",
    "dashboards",
    "machine learning tooling",
    "REST APIs",
  ],

  useCasesHeading: "Typical use cases",
  useCases: [
    {
      title: "Operations dashboard",
      body: "A single view that shows what is happening in the business today: volume, throughput, exceptions, and trends. Built on the data the organization already has, cleaned and structured so the numbers mean something.",
    },
    {
      title: "Cross-system reporting",
      body: "Data pulled from the accounting system, the operations system, and the CRM, joined into a single record. Reports generated automatically on a schedule, delivered to the people who need them.",
    },
    {
      title: "Investigation and analysis",
      body: "A specific question, answered from the data. Which products are declining? Where are delays occurring? What changed last quarter? The output is a finding and a clear explanation of the method.",
    },
    {
      title: "Data cleanup and structuring",
      body: "Raw records that have accumulated over years, cleaned, deduplicated, and structured into a form that can be queried. A foundation for everything that follows.",
    },
  ],

  securityHeading: "Security considerations",
  security:
    "Data systems hold the most sensitive information an organization has. We treat access control, encryption, and audit logging as foundational: different roles see different data by design, data at rest and in transit is encrypted, and query access is logged. Where data is consolidated from multiple systems, the consolidation itself is designed so that no one gains access they did not already have. We describe our practices openly and claim no certifications we do not hold.",

  performanceHeading: "Performance considerations",
  performance:
    "A dashboard that takes thirty seconds to load is a dashboard that no one uses. We design reports and queries for the volume the organization actually has, index the data that will be queried most, and materialize the views that need to be fast. Where a query would be expensive if run live, it runs on a schedule and the result is cached. The result is a system that stays fast as the data grows.",

  industriesHeading: "Industries we serve",
  industries: [
    "Healthcare",
    "Retail",
    "Education",
    "Professional Services",
    "Property and Real Estate",
  ],

  faqHeading: "Frequently asked questions",
  faq: [
    {
      question: "What is the difference between data science and data analytics?",
      answer:
        "Data analytics describes what has happened: reports, dashboards, summaries. Data science works toward what is likely to happen, or why something happened, using models and statistics. Most organizations need analytics first. Data science builds on top of a clean analytics foundation.",
    },
    {
      question: "We already have dashboards. Why would we need this?",
      answer:
        "The question is whether the dashboards answer the questions you are asking. Many dashboards show activity without supporting decisions. If the dashboards are working, you do not need more. If they are not, the work is usually in the questions and the underlying data, not in more charts.",
    },
    {
      question: "Our data is a mess. Can you still help?",
      answer:
        "Yes, but the first work is usually cleaning and structuring. That is not a delay - it is the foundation. Reports built on unreliable data produce unreliable answers, so the cleanup comes first.",
    },
    {
      question: "How long does a data project take?",
      answer:
        "It depends on where the data currently is. A focused dashboard on clean data can be built in a few weeks. A project that requires consolidating multiple systems and cleaning years of records takes longer. We describe the scope honestly before starting.",
    },
    {
      question: "Do we need to move all our data to a new system?",
      answer:
        "No. Most data projects work with the data where it lives. A reporting layer can query multiple systems without moving everything into one. Where consolidation is genuinely useful - because a query needs data from several sources at once - we do it selectively, not wholesale.",
    },
    {
      question: "Who owns the analysis and the dashboards?",
      answer:
        "You do. The queries, the models, and the dashboards are delivered as code and documentation, not as a black box. Any analyst can read what was done and extend it.",
    },
  ],

  ctaHeading: "Have data that you cannot use yet?",
  ctaBody:
    "Tell us what you are trying to find out, and what you have to work with. We will tell you what the first step is, and whether it is the kind of problem we solve.",
});
