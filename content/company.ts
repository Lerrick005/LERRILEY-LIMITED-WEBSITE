import { z } from "zod";

/**
 * SINGLE SOURCE OF TRUTH for every factual claim about Lerriley Limited.
 *
 * Nothing in this file may be invented. Blank fields are intentional:
 * the UI must omit the corresponding section rather than fabricate.
 *
 * Rules:
 *  - Anything that asserts what Lerriley HAS achieved (clients, projects,
 *    testimonials, awards, certifications, statistics, uptime, user counts)
 *    must carry a `verified: true` flag, and only be added when the real
 *    material exists.
 *  - Anything that describes what Lerriley OFFERS, BUILDS, DESIGNS or CAN
 *    PROVIDE is allowed unconditionally.
 */

const VerifiedProfileSchema = z.object({
  url: z.url(),
  verified: z.literal(true),
});

export const CompanySchema = z.object({
  legalName: z.literal("Lerriley Limited"),
  displayName: z.literal("Lerriley Limited"),
  tagline: z.literal("Technology engineered around real-world problems."),
  positioning: z.string().min(40),
  primaryMarket: z.literal("Kenya"),
  futureMarket: z.literal("International"),

  baseLocation: z.string().nullable(),
  serviceRegions: z.array(z.string()),
  foundedYear: z.number().int().nullable(),

  contact: z.object({
    email: z.email().nullable(),
    phone: z.string().nullable(),
    /**
     * The WhatsApp number is read at runtime from
     * process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.
     * It is never hard-coded here, never bundled into client code,
     * and only ever linked through /go/whatsapp.
     */
    whatsappEnvVar: z.literal("NEXT_PUBLIC_WHATSAPP_NUMBER"),
  }),

  profiles: z.object({
    linkedin: VerifiedProfileSchema.nullable(),
    github: VerifiedProfileSchema.nullable(),
    googleBusinessProfile: VerifiedProfileSchema.nullable(),
  }),

  domain: z.object({
    productionUrl: z.url().nullable(),
  }),

  verifiedTechnologies: z.object({
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    data: z.array(z.string()),
    aiMl: z.array(z.string()),
    infrastructure: z.array(z.string()),
  }),

  analyticsProvider: z.enum(["plausible", "ga4"]),
});

export type Company = z.infer<typeof CompanySchema>;

export const company: Company = CompanySchema.parse({
  legalName: "Lerriley Limited",
  displayName: "Lerriley Limited",
  tagline: "Technology engineered around real-world problems.",
  positioning:
    "A technology engineering company that designs and builds practical digital systems for businesses and organizations.",
  primaryMarket: "Kenya",
  futureMarket: "International",

  // Leave null until a real, publishable address is provided.
  baseLocation: null,
  serviceRegions: ["Kenya"],
  foundedYear: null,

  contact: {
    // Leave null until a real monitored mailbox is confirmed and provisioned.
    email: null,
    // Provided in INPUTS as 01140450296. Used for display only.
    // The WhatsApp deep-link reads the env var, never this value.
    phone: "01140450296",
    whatsappEnvVar: "NEXT_PUBLIC_WHATSAPP_NUMBER",
  },

  profiles: {
    // Omit each until a real URL is supplied. Never invent.
    linkedin: null,
    github: null,
    googleBusinessProfile: null,
  },

  domain: {
    productionUrl: null,
  },

  verifiedTechnologies: {
    frontend: ["Next.js", "React", "TypeScript"],
    backend: ["Node.js", "Express", "REST APIs"],
    data: ["PostgreSQL"],
    aiMl: ["Python", "machine learning tooling", "AI API integrations"],
    infrastructure: ["Cloud deployment", "backups", "monitoring"],
  },

  analyticsProvider: "plausible",
});

/** Renders social/profile blocks only when at least one real URL exists. */
export function hasVerifiedProfiles(c: Company): boolean {
  return Boolean(
    c.profiles.linkedin ||
      c.profiles.github ||
      c.profiles.googleBusinessProfile,
  );
}

/** Renders address/LocalBusiness schema only when a real address exists. */
export function hasPublishableAddress(c: Company): boolean {
  return Boolean(c.baseLocation);
}