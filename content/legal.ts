import { z } from "zod";

/**
 * Legal page content.
 *
 * The privacy policy describes what the site ACTUALLY does. It is not a
 * template. Every claim in it is true of the code in this repository.
 *
 * The terms of use are short because there is little to say: this is a
 * marketing and enquiry site, not a platform with accounts or payment.
 */

export const LegalSectionSchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  heading: z.string().min(2).max(120),
  body: z.array(z.string().min(10).max(1200)).min(1).max(6),
});

export type LegalSection = z.infer<typeof LegalSectionSchema>;

export const privacyLastUpdated = "2026-09-22";

export const privacySections: readonly LegalSection[] = [
  {
    slug: "what-we-collect",
    heading: "What we collect",
    body: [
      "When you submit the contact form on this site, we receive the information you enter: your name, organization (optional), email address, phone number (optional), the description of the problem you provide, an optional budget range, an optional timeline, and any additional details you choose to include.",
      "We also receive technical information that your browser sends with the request: the address of the page you came from (the referrer), your browser user agent, and the IP address of the request. This is standard for any web request and is used only to identify the source of the enquiry and to protect the form from abuse.",
    ],
  },
  {
    slug: "why-we-collect-it",
    heading: "Why we collect it",
    body: [
      "We collect this information for one reason: to respond to your enquiry. We read every message and reply either way.",
      "We do not sell, rent, or share your information with third parties for marketing purposes. We do not use it for advertising.",
    ],
  },
  {
    slug: "how-it-is-stored",
    heading: "How it is stored",
    body: [
      "Submissions are stored on the server that runs this site. Access is restricted to the people who need it to respond to enquiries.",
      "If a database is configured on the deployment, submissions are stored there instead of on the file system. In both cases the data is retained only for as long as needed to respond to the enquiry and to keep an accurate record of the conversation.",
    ],
  },
  {
    slug: "third-parties",
    heading: "Third parties",
    body: [
      "This site may use a privacy-conscious analytics provider to understand how many people visit which pages. The provider is configured without cross-site tracking, without fingerprinting, and without sharing data with advertisers.",
      "If Cloudflare Turnstile is enabled on the contact form, Cloudflare receives the request data needed to verify that a submission comes from a human rather than a bot. This is a spam protection measure and no additional personal data is collected.",
    ],
  },
  {
    slug: "your-rights",
    heading: "Your rights",
    body: [
      "You can ask us at any time to tell you what information we hold about you, to correct it, or to delete it. If you have submitted the contact form and want your submission removed, contact us using the same contact details and we will do so.",
    ],
  },
  {
    slug: "changes",
    heading: "Changes to this policy",
    body: [
      "If this policy changes, the date at the top of this page changes with it. We do not make silent changes to how information is handled.",
    ],
  },
];

export const termsLastUpdated = "2026-09-22";

export const termsSections: readonly LegalSection[] = [
  {
    slug: "use-of-this-site",
    heading: "Use of this site",
    body: [
      "This site is provided for information about Lerriley Limited and its engineering work, and to allow you to get in touch. You may use it for those purposes.",
    ],
  },
  {
    slug: "accuracy",
    heading: "Accuracy of information",
    body: [
      "We describe our capabilities, our process and our approach in good faith. Where we do not have information that can be verified, we state that openly rather than fill the space with content that cannot be confirmed.",
      "If you believe something on this site is inaccurate, contact us and we will review it.",
    ],
  },
  {
    slug: "no-warranty",
    heading: "No warranty on the site itself",
    body: [
      "The site is provided as-is. We make it available and we work to keep it accurate and functional, but we do not warrant that it will be uninterrupted, error-free, or fit for any particular purpose beyond reading and contacting us.",
      "Work we do for clients is governed by a separate written agreement, not by these terms.",
    ],
  },
  {
    slug: "limitation-of-liability",
    heading: "Limitation of liability",
    body: [
      "To the extent permitted by law, Lerriley Limited is not liable for indirect or consequential losses arising from your use of this site. Nothing in these terms limits any liability that cannot be limited by law.",
    ],
  },
  {
    slug: "governing-law",
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of Kenya.",
    ],
  },
];
