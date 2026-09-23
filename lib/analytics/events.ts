/**
 * Analytics event taxonomy.
 *
 * Every event the site can emit is declared here as a typed union. The
 * track() function accepts only these shapes, so a typo in an event name
 * or a missing field is a compile error, not a silent gap in the data.
 *
 * The taxonomy matches spec §13.
 */

export type CtaClickEvent = {
  name: "cta_click";
  location: string;
  label: string;
  intent?: string;
};

export type FormStartEvent = {
  name: "form_start";
  intent: string;
};

export type FormSubmitEvent = {
  name: "form_submit";
  intent: string;
};

export type WhatsappClickEvent = {
  name: "whatsapp_click";
  intent?: string;
  page: string;
};

export type EmailClickEvent = {
  name: "email_click";
  page: string;
};

export type PhoneClickEvent = {
  name: "phone_click";
  page: string;
};

export type CaseStudyInteractionEvent = {
  name: "case_study_interaction";
  slug: string;
  action: string;
};

export type SolutionEngagementEvent = {
  name: "solution_engagement";
  slug: string;
  scroll_depth: number;
};

export type InsightReadEvent = {
  name: "insight_read";
  slug: string;
  scroll_depth: number;
};

export type AnalyticsEvent =
  | CtaClickEvent
  | FormStartEvent
  | FormSubmitEvent
  | WhatsappClickEvent
  | EmailClickEvent
  | PhoneClickEvent
  | CaseStudyInteractionEvent
  | SolutionEngagementEvent
  | InsightReadEvent;
