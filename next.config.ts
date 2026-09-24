import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * The Content-Security-Policy is set by middleware.ts, because it changes
 * on every request (the nonce is unique per request). The headers below
 * do not change per request and are set here.
 *
 * HSTS is commented out in development so it does not lock the developer
 * into HTTPS on localhost. In production it applies with a long max-age.
 */

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
