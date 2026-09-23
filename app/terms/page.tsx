import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal-page";
import { termsLastUpdated, termsSections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Lerriley Limited website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      lastUpdated={termsLastUpdated}
      sections={termsSections}
    />
  );
}
