/**
 * Analytics provider loader.
 *
 * Injects the configured analytics script once per page. The script is
 * loaded asynchronously and does not block rendering.
 *
 * The provider is chosen by NEXT_PUBLIC_ANALYTICS_PROVIDER:
 *   - "plausible": loads Plausible from the configured domain
 *   - "ga4":       loads Google Analytics 4 from the configured ID
 *   - unset:       nothing is loaded; track() falls back to console
 *
 * Scripts are only injected in production and only when the required
 * environment variables are present. Nothing is loaded in development.
 */

const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

export function loadAnalytics(): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;

  if (provider === "plausible" && plausibleDomain) {
    if (document.querySelector("script[data-plausible]")) return;

    const script = document.createElement("script");
    script.src = "https://plausible.io/js/script.tagged-events.js";
    script.defer = true;
    script.setAttribute("data-domain", plausibleDomain);
    script.setAttribute("data-plausible", "true");
    document.head.appendChild(script);
    return;
  }

  if (provider === "ga4" && ga4Id) {
    if (document.querySelector("script[data-ga4]")) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    script.async = true;
    script.setAttribute("data-ga4", "true");
    document.head.appendChild(script);

    const inline = document.createElement("script");
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${ga4Id}', { anonymize_ip: true });
    `;
    document.head.appendChild(inline);
    return;
  }

  /* No provider configured. Nothing is loaded. */
}
