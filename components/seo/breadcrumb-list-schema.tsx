import { company } from "@/content/company";

import { JsonLd } from "./json-ld";

/**
 * BreadcrumbList schema.
 *
 * Every interior page that renders breadcrumbs also emits this schema so
 * search engines can render the trail in the result. The list must match
 * the visible breadcrumbs exactly - no invented items.
 *
 * Items are ordered from the site root to the current page.
 */

export type BreadcrumbItem = {
  name: string;
  /** Absolute path beginning with "/". Omitted for the final item. */
  path?: string;
};

export function BreadcrumbListSchema({
  items,
}: {
  items: readonly BreadcrumbItem[];
}) {
  if (items.length === 0) return null;

  const base = company.domain.productionUrl ?? "";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.path && base) {
        entry.item = `${base}${item.path}`;
      }
      return entry;
    }),
  };

  return <JsonLd data={data} />;
}
