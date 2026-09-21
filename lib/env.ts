import { z } from "zod";

/**
 * Environment variable schema.
 *
 * Validated once at module load. If any required variable is missing or
 * malformed, the process fails immediately with a clear message rather
 * than erroring deep in a page render six hours later.
 *
 * Rules:
 *  - NEXT_PUBLIC_* variables are bundled into client code. Treat anything
 *    with that prefix as public.
 *  - Everything else is server-only and must never reach the browser.
 *  - Never commit a .env.local file.
 */

const ServerEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const ClientEnvSchema = z.object({
  /**
   * WhatsApp number in E.164 format, digits only after the plus sign is
   * removed (e.g. "2541140450296" for +254 114 045 0296).
   *
   * Optional at build time so the site builds before the number is
   * confirmed. When absent, WhatsApp CTAs are hidden rather than linked
   * to a placeholder.
   */
  NEXT_PUBLIC_WHATSAPP_NUMBER: z
    .string()
    .regex(/^\d{10,15}$/, {
      message:
        "NEXT_PUBLIC_WHATSAPP_NUMBER must be 10–15 digits, no spaces, no + sign (e.g. 2541140450296).",
    })
    .optional(),
});

/**
 * Parse server-side environment. Called during build and at runtime on
 * the server. Fails loudly if a required value is missing.
 */
export function getServerEnv() {
  const parsed = ServerEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid server environment variables:\n${formatZodError(parsed.error)}`,
    );
  }

  return parsed.data;
}

/**
 * Parse client-visible environment. Safe to import from client components.
 * Any NEXT_PUBLIC_* variable is inlined at build time by Next.js, so this
 * runs identically on the server and in the browser.
 */
export function getClientEnv() {
  const parsed = ClientEnvSchema.safeParse({
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid client environment variables:\n${formatZodError(parsed.error)}`,
    );
  }

  return parsed.data;
}

/**
 * Human-readable formatting of a Zod error. We do not expose raw Zod
 * JSON to end users or logs; it is noisy and hard to scan.
 */
function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
      return `  - ${path}: ${issue.message}`;
    })
    .join("\n");
}

/**
 * Convenience: has the WhatsApp number been configured?
 * Use this to conditionally render WhatsApp CTAs. When false, the CTA
 * is omitted entirely — never linked to a placeholder.
 */
export function hasWhatsApp(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
}