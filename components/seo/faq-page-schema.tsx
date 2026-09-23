import { JsonLd } from "./json-ld";

/**
 * FAQPage schema.
 *
 * Used on pages that render a visible FAQ. Each question and answer must
 * match what is displayed on the page — schema must never contain content
 * the user cannot see.
 *
 * Google's structured data policy requires this exact match. It is also
 * the honest approach: no FAQ schema for questions that are not answered
 * on the page.
 */

export function FaqPageSchema({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  if (items.length === 0) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
