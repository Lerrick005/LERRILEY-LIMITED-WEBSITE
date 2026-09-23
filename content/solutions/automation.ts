import { z } from "zod";

/**
 * Automation solution page content.
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

export const automationPage: SolutionPageContent = SolutionPageSchema.parse({
  eyebrow: "Automation",
  title: "Removing work that should not be done by hand",
  lead: "Automation is not about replacing people. It is about removing the parts of a job that are repetitive, error-prone, and do not require judgment. Done well, it gives the team back time to do the work that actually needs them.",

  problemsHeading: "Problems we solve",
  problems: [
    "The same information entered into more than one system, by hand, every day.",
    "Routine notifications and reminders that only happen if someone remembers to send them.",
    "Reports assembled manually from several sources, taking hours that should take minutes.",
    "Documents, forms, and messages routed to the wrong person because no one owns the triage.",
    "Data that has to be copied between tools that do not talk to each other.",
    "Workflows where the steps are known, but they depend on someone not being busy.",
  ],

  buildsHeading: "What we build",
  builds: [
    "Document extraction: systems that read invoices, receipts, and forms, and enter the data into the right system.",
    "Routine notification and reminder flows: appointment confirmations, payment reminders, follow-ups.",
    "Report generation that runs on a schedule and delivers to the right people automatically.",
    "Message triage: systems that classify and route incoming email, chat, and form submissions.",
    "Cross-system data sync: changes in one tool propagate to the others without manual re-entry.",
    "Approval and workflow automation: routing requests to the right approver, with an audit trail.",
  ],

  technologiesHeading: "Technologies",
  technologies: [
    "Node.js",
    "Python",
    "REST APIs",
    "AI API integrations",
    "PostgreSQL",
    "TypeScript",
  ],

  useCasesHeading: "Typical use cases",
  useCases: [
    {
      title: "Invoice and receipt processing",
      body: "Documents arrive in many formats. The system extracts vendor, date, line items, and totals, validates against the organization's rules, and enters them into accounting. Anything that fails a check goes to a person.",
    },
    {
      title: "Appointment reminders and confirmations",
      body: "When an appointment is booked, a confirmation goes out. Before the appointment, a reminder. If the person does not confirm, a follow-up. If they need to reschedule, a link updates the calendar automatically.",
    },
    {
      title: "Shared inbox triage",
      body: "Messages arrive through a shared inbox. The system classifies each one by type and urgency, routes it to the right queue, and sends automatic acknowledgements. Ambiguous cases go to a person.",
    },
    {
      title: "Recurring report delivery",
      body: "At a fixed time, the system pulls the required data from multiple sources, formats the report, and sends it to the people who need it. If the numbers fall outside expected ranges, it flags that too.",
    },
  ],

  securityHeading: "Security considerations",
  security:
    "Automation touches systems that hold sensitive data, and it runs without a person watching. That raises two specific concerns. First, authentication and authorisation: the automation must have exactly the access it needs, no more, and its credentials must be stored securely rather than embedded in the flow. Second, auditability: every automated action is logged so that when something goes wrong, the trail shows exactly what happened and when. Automation that cannot be inspected is automation that cannot be trusted.",

  performanceHeading: "Performance considerations",
  performance:
    "Automation runs in the background, so it has a different performance profile from user-facing software. What matters is not raw speed but reliability under load and recovery from failure. We design each automation to be idempotent - running it twice does not produce two results - and to retry safely when a downstream system is temporarily unavailable. Where a step fails permanently, the failure is visible, not silent. An automation that fails quietly is worse than no automation at all.",

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
      question: "What should we automate first?",
      answer:
        "The task with the highest volume, the lowest variance, and the clearest definition of success. High volume means the savings matter. Low variance means the rules are stable. Clear success means you can tell whether it worked. Start there, measure the result, then look at the next candidate.",
    },
    {
      question: "What should we not automate?",
      answer:
        "Judgment calls. Relationship work. One-off tasks that will not repeat. And processes that are still changing every week - stabilise them first, then automate. Automating an unstable process produces an unstable automation.",
    },
    {
      question: "Will automation replace our staff?",
      answer:
        "In the workflows we build, no. The point is to remove the repetitive part of a job so that the person can do the part that needs them. Most organizations find that automation lets them handle more volume with the same team, rather than reducing the team.",
    },
    {
      question: "What happens when the automation fails?",
      answer:
        "It depends on how it was designed. Our automations are idempotent - running twice produces the same result - and they retry safely when a downstream service is temporarily unavailable. Permanent failures are logged and alerted, not silent. The system tells you when it cannot complete a step.",
    },
    {
      question: "Can automation work with the tools we already use?",
      answer:
        "Yes, where those tools have an API or a documented data format. Integration is often the most valuable part of an automation project, because it removes the manual re-entry between tools. Where integration is not possible, we say so before starting.",
    },
    {
      question: "How long does an automation project take?",
      answer:
        "A focused automation that connects two systems and applies a clear set of rules can be built in a few weeks. A broader workflow with several integrations and exception handling takes longer. We describe the scope honestly before starting.",
    },
  ],

  ctaHeading: "Have work that should not be done by hand?",
  ctaBody:
    "Tell us what is happening now, and what the ideal outcome looks like. We will tell you whether it fits what we do, and what the first step would be.",
});
