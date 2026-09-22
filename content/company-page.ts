import { z } from "zod";

/**
 * Company page content.
 *
 * Everything on this page is a description of what Lerriley IS, BELIEVES,
 * or INTENDS. There is no history, no founding story, no team, no awards,
 * no client names, no statistics. Those require verified facts that do not
 * exist yet. If they become available, they are added in a separate
 * verified content block, not woven into the copy here.
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

  approachHeading: "How we work with clients",
  approach:
    "Every engagement begins with a conversation about the problem, not about the technology. We write down what is being built, what is not, and what success looks like. We deliver in reviewable increments, so progress is visible throughout rather than saved for a single reveal at the end. When the system is in production, we support it with backups, monitoring and a clear path to change. The client owns the code, the data and the infrastructure. There is no lock-in to a platform we control.",

  visionHeading: "Where we are going",
  vision:
    "Lerriley is built to grow from an engineering services company into a company that designs, builds and operates technology products. The same discipline that shapes how we approach client work shapes how we approach our own. We are based in Kenya and work with organizations internationally. Growth follows real demand, real capability and real results, not marketing ambition.",

  ctaHeading: "Have a problem worth solving?",
  ctaBody:
    "Tell us what you are trying to build or fix. If the problem fits what we do, we will say so. If it does not, we will say that too.",
});
