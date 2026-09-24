import type { MetadataRoute } from "next";

/**
 * Robots.
 *
 * Allows all crawlers on all public pages. Disallows:
 *   - /api/ - the lead capture endpoint, which has no business being
 *     crawled or indexed
 *   - /go/ - the WhatsApp redirect route, which is a tracking endpoint,
 *     not a destination
 *
 * Points crawlers at the sitemap. The URL is absolute, so it depends on
 * NEXT_PUBLIC_SITE_URL. When that is not set, the sitemap line is omitted
 * because a relative sitemap URL is not valid in robots.txt.
 */

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

  const rule: MetadataRoute.Robots["rules"] = {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/go/"],
  };

  return {
    rules: rule,
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
    host: base || undefined,
  };
}
