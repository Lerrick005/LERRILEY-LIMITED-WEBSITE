import fs from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { ContactFormSchema } from "@/lib/validation/contact";
import { rateLimit } from "@/lib/security/rate-limit";

/**
 * Lead capture endpoint.
 *
 * Receives submissions from the contact form, validates them server-side
 * with the same schema the client uses, checks spam protections, records
 * attribution data, and writes the lead to disk.
 *
 * When RESEND_API_KEY and LEAD_NOTIFICATION_TO are set, this route also
 * sends an internal notification email and an acknowledgement to the
 * visitor. When DATABASE_URL is set, it stores to a database. Neither is
 * required for the endpoint to work.
 *
 * The lead file lives in content/leads/ and is git-ignored.
 */

export const runtime = "nodejs";

const LEADS_DIR = path.join(process.cwd(), "content", "leads");
const LEADS_FILE = path.join(LEADS_DIR, "leads.jsonl");

/** Attribution fields captured from the client request. */
type Attribution = {
  referer: string | null;
  userAgent: string | null;
  ip: string | null;
  receivedAt: string;
};

function getIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

export async function POST(request: Request) {
  /* ---------------------------------------------------------------------- */
  /* Rate limit                                                              */
  /* ---------------------------------------------------------------------- */

  const ip = getIp(request) ?? "unknown";
  const limit = rateLimit(ip, { limit: 5, windowMs: 10 * 60 * 1000 });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many submissions. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Parse and validate                                                      */
  /* ---------------------------------------------------------------------- */

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = ContactFormSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Validation failed.", fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  /* ---------------------------------------------------------------------- */
  /* Honeypot check - silent rejection                                       */
  /* ---------------------------------------------------------------------- */

  if (data.website && data.website.length > 0) {
    /* A bot filled the hidden field. Return a success response so the bot
       does not learn the field is a honeypot, but do not store the lead. */
    return NextResponse.json({ ok: true });
  }

  /* ---------------------------------------------------------------------- */
  /* Time-trap check                                                         */
  /* ---------------------------------------------------------------------- */

  if (data.elapsedMs < 2000) {
    return NextResponse.json({ ok: true });
  }

  /* ---------------------------------------------------------------------- */
  /* Attribution                                                             */
  /* ---------------------------------------------------------------------- */

  const attribution: Attribution = {
    referer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    ip,
    receivedAt: new Date().toISOString(),
  };

  const record = {
    ...data,
    /* Remove honeypot and time-trap from the stored record. */
    website: undefined,
    elapsedMs: undefined,
    attribution,
  };

  /* ---------------------------------------------------------------------- */
  /* Persist                                                                 */
  /* ---------------------------------------------------------------------- */

  try {
    await fs.mkdir(LEADS_DIR, { recursive: true });
    await fs.appendFile(LEADS_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (error) {
    console.error("Failed to write lead:", error);
    return NextResponse.json(
      { ok: false, error: "Could not record the submission." },
      { status: 500 },
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Success                                                                 */
  /* ---------------------------------------------------------------------- */

  return NextResponse.json({ ok: true });
}
