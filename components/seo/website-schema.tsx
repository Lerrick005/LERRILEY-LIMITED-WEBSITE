import { company } from "@/content/company";

import { JsonLd } from "./json-ld";

/**
 * WebSite schema.
 *
 * Declares the site as a whole. Used for site-wide entity recognition.
 * The potentialAction (SearchAction) is omitted because the site has no
 * on-site search.
 *
 * Nothing is fabricated. url is omitted if the production URL is not
 * configured.
 */

export function WebSiteSchema() {
  const url = company.domain.productionUrl ?? undefined;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.displayName,
    description: company.positioning,
    url,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: company.legalName,
    },
  };

  return <JsonLd data={data} />;
}
