import { company } from "@/content/company";

import { JsonLd } from "./json-ld";

/**
 * Organization schema.
 *
 * Site-wide identity for search engines and AI answer engines. Reads
 * every value from content/company.ts.
 *
 * Only fields with real values are included:
 *   - sameAs is included only for profiles that exist in company.profiles
 *   - address is included only when company.baseLocation is set
 *   - logo is the transparent emblem we ship in public/
 *
 * No fabricated ratings, reviews, founding dates or identifiers.
 */

export function OrganizationSchema() {
  const url = company.domain.productionUrl ?? undefined;

  const sameAs: string[] = [];
  if (company.profiles.linkedin) sameAs.push(company.profiles.linkedin.url);
  if (company.profiles.github) sameAs.push(company.profiles.github.url);
  if (company.profiles.googleBusinessProfile)
    sameAs.push(company.profiles.googleBusinessProfile.url);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.displayName,
    description: company.positioning,
    url,
    logo: url ? `${url}/lerriley-logo-transparent.png` : undefined,
    slogan: company.tagline,
  };

  if (sameAs.length > 0) data.sameAs = sameAs;

  if (company.baseLocation) {
    data.address = {
      "@type": "PostalAddress",
      addressLocality: company.baseLocation,
      addressCountry: "KE",
    };
  }

  if (company.contact.phone) {
    data.telephone = company.contact.phone;
  }

  if (company.contact.email) {
    data.email = company.contact.email;
  }

  return <JsonLd data={data} />;
}
