import { z } from "zod";

/**
 * Web Development solution page content.
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

export const webDevelopmentPage: SolutionPageContent =
  SolutionPageSchema.parse({
    eyebrow: "Web Development",
    title: "Websites and web applications engineered for how they are used",
    lead: "A website is not a design deliverable. It is a system that has to load quickly, be found by search engines, be accessible to everyone, and stay maintainable after launch. We build web work as engineering, not as decoration.",

    problemsHeading: "Problems we solve",
    problems: [
      "A site that loads slowly and loses visitors before they read anything.",
      "A marketing site that looks fine but cannot be updated without a developer.",
      "A web application that works on the developer's machine but breaks under real use.",
      "A site that is invisible to search engines because the foundations were never built.",
      "An interface that fails for users with screen readers, keyboard navigation, or older devices.",
      "A codebase that cannot be changed safely because no one understands it anymore.",
    ],

    buildsHeading: "What we build",
    builds: [
      "High-performance marketing sites and content-driven websites.",
      "Web applications with authenticated users, real data, and business workflows.",
      "Customer portals, dashboards, and internal tools that replace spreadsheets.",
      "Progressive web apps that work offline and install on a device.",
      "Integration layers that connect a website to existing backend systems.",
      "Rebuilds and migrations from outdated frameworks onto maintainable foundations.",
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
        title: "Marketing site with a content pipeline",
        body: "A company website where non-technical staff can publish articles, update pages, and add new sections without touching code. Built on a structured content model with validation.",
      },
      {
        title: "Customer portal",
        body: "An authenticated area where customers can view their orders, download invoices, update their details, and submit requests. Integrated with the organisation's existing systems.",
      },
      {
        title: "Internal operations tool",
        body: "A web application that replaces a spreadsheet used by a team. Records are structured, workflows are enforced, and reports are generated automatically.",
      },
      {
        title: "High-volume information site",
        body: "A site with thousands of pages that must load fast, rank in search, and remain consistent. Built with static generation and a clean URL and metadata structure.",
      },
    ],

    securityHeading: "Security considerations",
    security:
      "Web applications handle sessions, credentials, and user data. We treat authentication, access control, input validation, CSRF protection, and secure cookie handling as part of the build, not as a later addition. Data is stored and transmitted over encrypted connections, dependencies are kept current, and secrets are held in environment variables rather than committed to code. We claim no certifications we do not hold; the practices are described openly so they can be reviewed.",

    performanceHeading: "Performance considerations",
    performance:
      "Performance is a design constraint, not an afterthought. We set budgets before building: how large the initial download can be, how quickly the first meaningful content must appear, and how much the layout is allowed to shift while loading. Pages are statically generated where possible, images are sized and served in modern formats, and client-side JavaScript is kept to what the interface actually needs. The result is a site that feels fast on a mid-range phone, not just on a developer's laptop.",

    industriesHeading: "Industries we serve",
    industries: [
      "Healthcare",
      "Retail",
      "Education",
      "Professional Services",
    ],

    faqHeading: "Frequently asked questions",
    faq: [
      {
        question: "How long does a website project take?",
        answer:
          "It depends on the scope. A focused marketing site can take a few weeks. A web application with authenticated users and business workflows takes longer. We give a written estimate of what is being built and when, before the work starts.",
      },
      {
        question: "Do you build with WordPress?",
        answer:
          "We work with modern frameworks, primarily Next.js and React. WordPress has a place, but it is not our default. If a client's requirement fits WordPress better than what we do, we will say so.",
      },
      {
        question: "Can you take over an existing site?",
        answer:
          "Yes, if the codebase is in a state where that is safe. We review what is there first. Sometimes the correct answer is to maintain and improve what exists. Sometimes it is to rebuild. We tell you which, and why.",
      },
      {
        question: "Who owns the code?",
        answer:
          "The client. There is no proprietary platform, no lock-in, and no ongoing licence fee. Documentation is delivered alongside the system, and we hand over what was built.",
      },
      {
        question: "Do you handle hosting?",
        answer:
          "We deploy to standard cloud platforms that the client can own. We configure the deployment, the environment variables, and the monitoring. The account belongs to the client.",
      },
      {
        question: "What happens after launch?",
        answer:
          "We support the system in production. That includes monitoring for errors, applying security updates, and making changes as requirements evolve. The scope of ongoing support is agreed in writing.",
      },
    ],

    ctaHeading: "Have a website or web application to build?",
    ctaBody:
      "Tell us what you are trying to build, and what you have now. We will tell you whether it fits what we do, and what the next step would be.",
  });
