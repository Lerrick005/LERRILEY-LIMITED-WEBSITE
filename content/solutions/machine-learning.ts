import { z } from "zod";

/**
 * Machine Learning solution page content.
 *
 * Descriptions of problems Lerriley addresses, what we build, and how.
 * No client names, no case studies, no statistics. Descriptions of
 * capability only, per the Truth Protocol.
 *
 * ML is treated as a specific engineering tool for a specific class of
 * problem. The page says so explicitly, including the cases where ML is
 * the wrong choice.
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

export const machineLearningPage: SolutionPageContent =
  SolutionPageSchema.parse({
    eyebrow: "Machine Learning",
    title: "Predictive models, built and evaluated honestly",
    lead: "Machine learning is a tool for a specific class of problem: one where the pattern is real but cannot be written as rules. When that is the problem, a model can learn the pattern from examples. When it is not, a written rule is faster, cheaper and more accurate. Choosing correctly is part of the work.",

    problemsHeading: "Problems we solve",
    problems: [
      "Decisions that depend on patterns too complex to write as rules, but consistent enough to learn from examples.",
      "Forecasting demand, volume, or timing where the future resembles the past in a measurable way.",
      "Classifying records, messages, or transactions into categories that a person currently assigns by hand.",
      "Detecting unusual activity that no fixed threshold captures, because the definition of normal shifts.",
      "Ranking or prioritizing items - leads, tickets, opportunities - where the value of each item varies.",
      "Estimating a numeric value from many inputs, where no single input determines the answer.",
    ],

    buildsHeading: "What we build",
    builds: [
      "Predictive models for forecasting: demand, volume, timing, or outcome.",
      "Classification models that assign records to the correct category, with confidence scores.",
      "Anomaly detection systems that flag unusual events relative to a learned baseline.",
      "Recommendation and ranking systems where items must be ordered by likely value.",
      "Regression models that estimate a numeric value from multiple inputs.",
      "Evaluation and monitoring pipelines that check whether a deployed model is still accurate.",
    ],

    technologiesHeading: "Technologies",
    technologies: [
      "Python",
      "machine learning tooling",
      "PostgreSQL",
      "data pipelines",
      "AI API integrations",
      "REST APIs",
    ],

    useCasesHeading: "Typical use cases",
    useCases: [
      {
        title: "Demand forecasting",
        body: "Predicting how much of a product, service, or resource will be needed over the coming period. Built on historical records with seasonal and trend components, evaluated against a holdout period, and retrained on a schedule.",
      },
      {
        title: "Lead or opportunity scoring",
        body: "Ranking incoming leads, applications, or opportunities by their likelihood to convert. The model is trained on past outcomes, evaluated for fairness across segments, and the score is one input among several in the decision.",
      },
      {
        title: "Anomaly detection",
        body: "Flagging transactions, activity, or measurements that fall outside a learned pattern of normal. The threshold is set by the business, not by the model, because the cost of a false positive is a business decision.",
      },
      {
        title: "Document classification",
        body: "Sorting incoming documents - applications, claims, correspondence - into the categories the organization already uses. The model handles the routine cases, and anything below a confidence threshold goes to a person.",
      },
    ],

    securityHeading: "Security considerations",
    security:
      "Machine learning systems have two specific security concerns. First, the training data: if it contains sensitive records, the model may leak information about them, and privacy-preserving techniques are part of the design when that risk exists. Second, the model itself: adversarial inputs can produce deliberately wrong outputs, so systems that accept user input do not rely on model output alone. We treat both as engineering problems, not theoretical ones, and describe the mitigations openly.",

    performanceHeading: "Performance considerations",
    performance:
      "A machine learning model has two performance profiles: training and inference. Training runs offline and is measured in minutes to hours. Inference runs in production and must meet the same responsiveness targets as any other part of the system. We choose models with inference cost appropriate to the task, batch work that does not need to run per-request, and cache predictions where the input repeats. A model that is accurate but too slow to serve is not useful.",

    industriesHeading: "Industries we serve",
    industries: [
      "Retail",
      "Healthcare",
      "Professional Services",
      "Property and Real Estate",
    ],

    faqHeading: "Frequently asked questions",
    faq: [
      {
        question: "When is machine learning the right approach?",
        answer:
          "When the pattern is real but cannot be written as rules. If a written rule solves the problem - a threshold, a policy, a lookup - the rule is faster, cheaper, more accurate and explainable. Machine learning is the right answer when the rule does not exist but the examples do.",
      },
      {
        question: "How much data do we need?",
        answer:
          "It depends on the problem. A simple classifier may work with a few hundred well-labelled examples. A forecasting model on noisy data may need years of history. The honest answer is: we look at the data first, then say whether the problem is viable with what exists. If more data is needed, we say so before starting.",
      },
      {
        question: "How accurate will the model be?",
        answer:
          "No model is perfect. What matters is whether the accuracy is good enough for the decision it supports, and whether the failure modes are understood. We evaluate against a holdout set, report the accuracy honestly, and design the system so that low-confidence cases route to a person.",
      },
      {
        question: "Does the model need to be retrained?",
        answer:
          "Almost always, yes. The world changes, and a model trained on last year's data drifts. We build the retraining pipeline as part of the system, and monitoring so the organization knows when accuracy is dropping. A model without a retraining plan becomes stale.",
      },
      {
        question: "Can we explain the model's decisions?",
        answer:
          "Some models are inherently more explainable than others. If the decision requires an explanation - for regulators, for customers, for internal review - we choose a model family that can provide one, even if it means giving up a small amount of accuracy. Explainability is a requirement, not an afterthought.",
      },
      {
        question: "What happens if the model is wrong in production?",
        answer:
          "The system is designed for it. Predictions that fall below a confidence threshold are flagged for review. Predictions that feed into business actions pass through validation. The model is a component of a system that assumes it will sometimes be wrong, not an oracle that is trusted unconditionally.",
      },
    ],

    ctaHeading: "Have a prediction problem that fits machine learning?",
    ctaBody:
      "Tell us what you are trying to predict, and what data you have. We will tell you whether the problem is a good fit, or whether a simpler approach would be better.",
  });
