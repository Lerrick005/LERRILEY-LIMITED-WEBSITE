import { z } from "zod";

/**
 * Company page content.
 *
 * Everything on this page is a description of what Lerriley IS, BELIEVES,
 * or INTENDS. There is no history, no founding story, no team, no awards,
 * no client names, no statistics.
 */

export const CompanyPageSchema = z.object({
  eyebrow: z.string().min(2).max(40),
  heading: z.string().min(10).max(120),
  lead: z.string().min(60).max(400),

  beliefsHeading: z.string().min(4).max(80),
  beliefs: z
    .array(
      z.object({
        number: z.string().regex(/^\d{2}$/),
        title: z.string().min(2).max(60),
        body: z.string().min(40).max(320),
      }),
    )
    .min(3)
    .max(6),

  problemsHeading: z.string().min(4).max(80),
  problemsLead: z.string().min(40).max(300),
  problems: z.array(z.string().min(20).max(300)).min(3).max(8),

  workingHeading: z.string().min(4).max(80),
  working: z
    .array(
      z.object({
        number: z.string().regex(/^\d{2}$/),
        title: z.string().min(2).max(60),
        body: z.string().min(40).max(320),
      }),
    )
    .min(3)
    .max(6),

  approachHeading: z.string().min(4).max(80),
  approach: z.string().min(60).max(600),

  visionHeading: z.string().min(4).max(80),
  vision: z.string().min(60).max(500),

  ctaHeading: z.string().min(6).max(100),
  ctaBody: z.string().min(40).max(300),
});

export type CompanyPage = z.infer<typeof CompanyPageSchema>;

export const companyPage: CompanyPage = CompanyPageSchema.parse({
  eyebrow: "Company",
  heading: "A technology engineering company",
  lead: "Lerriley Limited designs and builds practical digital systems for businesses and organizations. We are an engineering company, not an agency, not a template shop, and not a reseller of someone else's software. Every system we build starts with the problem the organization actually has.",

  beliefsHeading: "What we believe about technology",
  beliefs: [
    {
      number: "01",
      title: "The problem comes first",
      body: "Technology is a means, not an end. Before we write a line of code, we understand the workflow, the people who use it, and the outcome the organization needs. The system follows from that understanding, not from the tools we happen to prefer.",
    },
    {
      number: "02",
      title: "Software should match the organization",
      body: "Custom software earns its name when it fits the way a business actually works, rather than forcing the business to work around a generic template. That difference is the whole reason to build custom at all.",
    },
    {
      number: "03",
      title: "Restraint is a feature",
      body: "The best engineering decisions are often the ones that remove complexity rather than add it. We choose the simplest technology that solves the problem, and we avoid novelty for its own sake.",
    },
    {
      number: "04",
      title: "Security is engineering, not a promise",
      body: "Authentication, access control, input validation and secure deployment are part of the work, not an add-on. We describe our practices openly and claim no certifications we do not hold.",
    },
  ],

  problemsHeading: "Problems we solve",
  problemsLead:
    "We work on problems where technology is part of the answer, but the problem itself is not a technology problem. The categories below describe the kinds of work we take on.",
  problems: [
    "A workflow that has outgrown the tools it runs on, and is now maintained through spreadsheets and manual steps.",
    "A system that no longer matches how the organization actually operates, but that no one can safely change.",
    "Data that exists but cannot be used, because it is scattered across systems that do not talk to each other.",
    "A process that produces the same errors every week, because it depends on people remembering to do the same thing correctly.",
    "A public-facing site or application that is slow, inaccessible, or invisible to search engines.",
    "A reporting need that takes days to satisfy, when it should take minutes.",
  ],

  workingHeading: "How we work with clients",
  working: [
    {
      number: "01",
      title: "We start with the problem",
      body: "Every engagement begins with a conversation about the problem, not the technology. We ask about the workflow, the people who use it, and what the organization needs to be true at the end. No proposal is written before this conversation happens.",
    },
    {
      number: "02",
      title: "We write down what we are building",
      body: "Before development starts, we produce a written definition of what is being built, what is not, and what success looks like. This document is the reference for every decision during the project. When scope changes, the document changes with it.",
    },
    {
      number: "03",
      title: "We deliver in reviewable stages",
      body: "Work is released in increments with working software at each step. The client sees progress throughout the engagement, not a single reveal at the end. Feedback arrives early, when it can still change the outcome.",
    },
    {
      number: "04",
      title: "The client owns what we build",
      body: "Code, data, and infrastructure belong to the client. There is no proprietary platform, no licence fee, and no lock-in. Documentation is delivered alongside the system, and the client's team can take over maintenance at any point.",
    },
  ],

  approachHeading: "Our engineering approach",
  approach:
    "Every engagement begins with a conversation about the problem, not about the technology. We write down what is being built, what is not, and what success looks like. We deliver in reviewable increments, so progress is visible throughout rather than saved for a single reveal at the end. When the system is in production, we support it with backups, monitoring and a clear path to change. The client owns the code, the data and the infrastructure. There is no lock-in to a platform we control.",

  visionHeading: "Where we are going",
  vision:
    "Lerriley is built to grow from an engineering services company into a company that designs, builds and operates technology products. The same discipline that shapes how we approach client work shapes how we approach our own. We are based in Kenya and work with organizations internationally. Growth follows real demand, real capability and real results, not marketing ambition.",

  ctaHeading: "Have a problem worth solving?",
  ctaBody:
    "Tell us what you are trying to build or fix. If the problem fits what we do, we will say so. If it does not, we will say that too.",
});
