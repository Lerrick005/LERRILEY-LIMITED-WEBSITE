import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware.
 *
 * Generates a unique nonce per request and sets a strict
 * Content-Security-Policy header that uses it. Next.js reads the nonce
 * from the CSP header and attaches it to every script it injects.
 *
 * Trade-off: pages become dynamically rendered, because the nonce is
 * different on every request. There is no static generation. The benefit
 * is that no inline script can run without the nonce, which mitigates
 * cross-site scripting.
 *
 * Styles remain allowed inline because Next.js injects <style> tags for
 * fonts and OG image rendering, and the CSP specification treats style
 * injection as lower risk than script injection.
 */

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    `connect-src 'self'${isDev ? " ws://localhost:* http://localhost:*" : ""}`,
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match every path except:
     *   - _next/static (static assets)
     *   - _next/image (image optimization)
     *   - favicon.ico
     *   - public files with extensions (fonts, images, etc.)
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ico)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
