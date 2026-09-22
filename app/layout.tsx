import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { company } from "@/content/company";

import "./globals.css";

/**
 * Fonts are loaded through next/font/google, which downloads them at build
 * time, self-hosts them, subsets them, and emits them with font-display:
 * swap. No runtime request ever reaches Google.
 *
 * Each font exposes a CSS variable that globals.css consumes:
 *   --font-display-loaded
 *   --font-sans-loaded
 *   --font-mono-loaded
 *
 * Instrument Serif has only weight 400. Headings must therefore never be
 * bolded; hierarchy comes from size, spacing and position.
 */

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display-loaded",
  preload: true,
});

const sansFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-loaded",
  preload: true,
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-loaded",
  preload: false,
});

/**
 * Metadata is read from content/company.ts. Nothing is invented here.
 *
 * The title template appends the company name to every page title so each
 * page only needs to supply its own topic. The default applies to the home
 * page and any page that does not set its own title.
 *
 * metadataBase depends on NEXT_PUBLIC_SITE_URL. When it is unset (local
 * development), Next.js falls back to http://localhost:3000. In production
 * it must be set or canonical URLs and Open Graph images will be wrong.
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

/**
 * Viewport is exported separately in Next.js 15 App Router. themeColor
 * matches --ink-950 so mobile browser chrome blends with the page.
 */

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
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
