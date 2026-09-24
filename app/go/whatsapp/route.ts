import { NextResponse } from "next/server";

/**
 * WhatsApp redirect.
 *
 * Reads the WhatsApp number from an environment variable, builds a
 * wa.me link with a pre-filled message based on the intent parameter,
 * and redirects the browser to it.
 *
 * The number never appears in page source — it is only read here, on
 * the server, and only the final redirect URL is sent to the browser.
 *
 * Usage:
 *   /go/whatsapp                     - generic message
 *   /go/whatsapp?intent=discuss-ai   - intent-specific message
 */

const INTENT_MESSAGES: Record<string, string> = {
  "start-project":
    "Hello Lerriley, I would like to discuss starting a project.",
  "discuss-ai":
    "Hello Lerriley, I would like to discuss an AI solution.",
  "discuss-data":
    "Hello Lerriley, I would like to discuss a data project.",
  "discuss-automation":
    "Hello Lerriley, I would like to discuss an automation project.",
  "build-business-software":
    "Hello Lerriley, I would like to discuss building business software.",
  "something-else":
    "Hello Lerriley, I would like to get in touch.",
};

const DEFAULT_MESSAGE =
  "Hello Lerriley, I would like to get in touch.";

export function GET(request: Request) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!number) {
    /* No number configured. Redirect to the contact page instead of
       sending the visitor to a broken wa.me link. */
    return NextResponse.redirect(new URL("/contact", request.url));
  }

  const { searchParams } = new URL(request.url);
  const intent = searchParams.get("intent") ?? "";
  const message = INTENT_MESSAGES[intent] ?? DEFAULT_MESSAGE;

  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return NextResponse.redirect(waUrl);
}
