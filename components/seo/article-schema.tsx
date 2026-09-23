import { company } from "@/content/company";

import { JsonLd } from "./json-ld";

/**
 * Article schema.
 *
 * Used on each Insights article. Emits only the fields we actually have:
 * headline, description, published date, optional updated date, author,
 * and publisher. No invented reading time, no invented section names,
 * no invented images.
 *
 * The author defaults to the company name until real author profiles
 * exist in content.
 */

export function ArticleSchema({
  headline,
  description,
  publishedAt,
  updatedAt,
  author,
  path,
}: {
  headline: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  path: string;
}) {
  const base = company.domain.productionUrl ?? undefined;
  const url = base ? `${base}${path}` : undefined;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      url: base,
    },
    mainEntityOfPage: url,
    url,
    inLanguage: "en",
  };

  return <JsonLd data={data} />;
}
