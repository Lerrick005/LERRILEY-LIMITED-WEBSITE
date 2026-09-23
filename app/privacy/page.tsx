import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/legal-page";
import { privacyLastUpdated, privacySections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Lerriley Limited handles information submitted through this website.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      lastUpdated={privacyLastUpdated}
      sections={privacySections}
    />
  );
}
