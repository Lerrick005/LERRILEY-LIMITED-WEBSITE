import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { RevealProvider } from "@/components/reveal-provider";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { WebSiteSchema } from "@/components/seo/website-schema";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/content/company";

import "./globals.css";

/**
 * Fonts are loaded from local .woff2 files in public/fonts/.
 *
 * Previously these were fetched from Google Fonts at build time via
 * next/font/google, which caused every build to hang when the network
 * could not reach fonts.gstatic.com. The .woff2 files below are the same
 * files Google serves, downloaded once and committed to the repository.
 *
 * No network request is made at build time. No network request is made at
 * runtime either, because the fonts are served from our own domain.
 *
 * Instrument Serif has only weight 400. Headings must therefore never be
 * bolded; hierarchy comes from size, spacing and position.
 */

const displayFont = localFont({
  src: [
    {
      path: "../public/fonts/instrument-serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-display-loaded",
  preload: true,
});

const sansFont = localFont({
  src: [
    {
      path: "../public/fonts/inter-variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-sans-loaded",
  preload: true,
});

const monoFont = localFont({
  src: [
    {
      path: "../public/fonts/jetbrains-mono-variable.woff2",
      weight: "100 800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mono-loaded",
  preload: false,
});

/**
 * Metadata is read from content/company.ts. Nothing is invented here.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${company.displayName} - ${company.tagline}`,
    template: `%s | ${company.displayName}`,
  },
  description: company.positioning,
  applicationName: company.displayName,
  authors: [{ name: company.displayName }],
  creator: company.displayName,
  publisher: company.displayName,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    siteName: company.displayName,
    title: `${company.displayName} - ${company.tagline}`,
    description: company.positioning,
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.displayName} - ${company.tagline}`,
    description: company.positioning,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <body>
        <OrganizationSchema />
        <WebSiteSchema />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <AnalyticsProvider />
        <RevealProvider />
      </body>
    </html>
  );
}
