import { z } from "zod";

/**
 * AI Software solution page content.
 *
 * Descriptions of problems Lerriley addresses, what we build, and how.
 * No client names, no case studies, no statistics. Descriptions of
 * capability only, per the Truth Protocol.
 *
 * AI is treated as a practical engineering discipline. Nothing here
 * claims a proprietary model, an in-house research programme, or a
 * capability we do not have.
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

export const aiSoftwarePage: SolutionPageContent = SolutionPageSchema.parse({
  eyebrow: "AI Software",
  title: "AI applied where it earns its place",
  lead: "AI is not a category. It is a set of techniques, and like any technique it is the right answer for some problems and the wrong answer for others. We build practical AI systems - integrations, automation, document intelligence, natural-language interfaces - where they deliver measurable value, and we say so when they do not.",

  problemsHeading: "Problems we solve",
  problems: [
    "Documents that arrive in unstructured form - invoices, receipts, forms, applications - and have to be entered into a system by hand.",
    "Repetitive work that requires a small amount of judgment, so a fixed rule cannot handle it and a person has to.",
    "Information spread across many documents or messages, where finding one specific answer takes minutes that should take seconds.",
    "Customer enquiries that arrive through several channels and need to be classified and routed before anyone can respond.",
    "Internal knowledge that exists but cannot be found, because it lives in documents no one has time to search.",
    "Data that is available but not useful, because no one can see the pattern until it is described in plain language.",
  ],

  buildsHeading: "What we build",
  builds: [
    "Document intelligence: systems that read invoices, receipts, forms, and applications, extract the fields that matter, and route exceptions to a person.",
    "Intelligent automation: workflows where a language model handles the parts that need judgement, and the rest is deterministic code.",
    "Assistants and natural-language interfaces: internal or customer-facing tools that answer questions from an organization's own documents.",
    "AI integrations into existing systems: adding summarization, classification, extraction, or generation to software the organization already uses.",
    "Information extraction pipelines: turning unstructured text into structured records in a database.",
    "Recommendation and ranking systems where a specific business decision needs a model rather than a rule.",
  ],

  technologiesHeading: "Technologies",
  technologies: [
    "Python",
    "AI API integrations",
    "machine learning tooling",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
  ],

  useCasesHeading: "Typical use cases",
  useCases: [
    {
      title: "Invoice and receipt processing",
      body: "Invoices arrive in many formats. The system extracts the vendor, date, line items, and totals, validates them against the organization's rules, and enters them into the accounting system. Exceptions go to a person for review.",
    },
    {
      title: "Customer support triage",
      body: "Messages arrive through email, chat, and forms. The system classifies each one by type and urgency and routes it to the right person. Routine acknowledgements are sent automatically. Ambiguous cases go to a human.",
    },
    {
      title: "Internal knowledge assistant",
      body: "An organization's policies, manuals, and documentation are indexed so staff can ask a question in plain language and receive an answer with a source. Access controls determine which documents each person can query.",
    },
    {
      title: "Document summarization",
      body: "Long documents - contracts, reports, applications - are summarized to a fixed length. The full text remains available. The summary is a starting point, not a replacement.",
    },
  ],

  securityHeading: "Security considerations",
  security:
    "AI systems that process an organization's data raise specific security questions. We handle them explicitly: data sent to an external model provider is minimized and documented, so the organization knows exactly what leaves its systems; access controls apply to the AI layer as they do to any other part of the system; outputs that feed back into business records are validated before they are written; and prompt injection defences are treated as a real threat, not a theoretical one. Where a problem can be solved without sending data to an external provider, we say so.",

  performanceHeading: "Performance considerations",
  performance:
    "AI systems have a different performance profile from conventional software: model calls take time, and that time is outside our control. We design around this by making the user-facing part of the system responsive while long-running work happens in the background, by caching results where the input repeats, and by choosing the smallest model that reliably does the job. Where a task can be done by a rule in microseconds, we do not send it to a model that will take two seconds.",

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
      question: "Do you build your own AI models?",
      answer:
        "No. We integrate existing models - commercial and open-source - and build the engineering around them. That is the honest answer and the practical one: the value in most AI systems is in the integration, the validation, the workflow, and the domain knowledge, not in training a model from scratch.",
    },
    {
      question: "How accurate is the AI in practice?",
      answer:
        "It depends on the task. For document extraction from clean, well-formed documents, accuracy can be very high. For open-ended text understanding, it can be lower. We design systems that measure their own accuracy on real data and route low-confidence cases to a person, rather than systems that assume every output is correct.",
    },
    {
      question: "What if the AI gets it wrong?",
      answer:
        "Every AI system we build assumes it will sometimes be wrong. Confidence thresholds, validation rules, and human review for exceptions are part of the design. The question is not whether the model is perfect, but whether the system around the model handles imperfection correctly.",
    },
    {
      question: "Do you send our data to OpenAI or another provider?",
      answer:
        "Only if it is necessary for the task and the data handling is agreed in writing. Where a task can be done with an open-source model running on the organization's own infrastructure, or with a model that does not require sending data externally, we use that. The decision is documented before the work starts.",
    },
    {
      question: "Can this be integrated with our existing systems?",
      answer:
        "Yes. Most of the work in a practical AI system is integration. We connect to your existing databases, APIs, and workflows, and the AI layer becomes a component of the system rather than a separate tool.",
    },
    {
      question: "How is the pricing determined?",
      answer:
        "By the scope of the work, written down before it starts. Model usage - the API calls - has an ongoing cost that is separate from the engineering. We estimate that cost up front, based on expected volume, so it does not become a surprise.",
    },
  ],

  ctaHeading: "Have a problem that might fit AI?",
  ctaBody:
    "Tell us what the task is. We will tell you whether AI is the right tool for it, or whether a simpler approach would work better. If it is not the right fit, we will say so.",
});
