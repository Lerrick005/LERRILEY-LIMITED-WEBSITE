import { company } from "@/content/company";

import { JsonLd } from "./json-ld";

/**
 * Service schema.
 *
 * Used on each solution detail page. Describes the capability Lerriley
 * offers. No ratings, no reviews, no prices, no invented offers.
 *
 * The provider is the Organization declared at the site root. The
 * serviceType is the capability name. The description is the page's own
 * lead paragraph.
 */

export function ServiceSchema({
  name,
  description,
  path,
}: {
  /** e.g. "Web Development" */
  name: string;
  /** The page's lead paragraph. */
  description: string;
  /** Absolute path beginning with "/", e.g. "/solutions/web-development". */
  path: string;
}) {
  const base = company.domain.productionUrl ?? undefined;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    provider: {
      "@type": "Organization",
      name: company.legalName,
      url: base,
    },
    areaServed: {
      "@type": "Country",
      name: company.primaryMarket,
    },
    url: base ? `${base}${path}` : undefined,
  };

  return <JsonLd data={data} />;
}
