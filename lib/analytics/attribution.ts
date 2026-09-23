/**
 * First-touch attribution capture.
 *
 * Records where a visitor came from the first time they land on the site
 * in this browser, and stores the result so later events can reference
 * it. The data is privacy-conscious: no fingerprinting, no PII, only the
 * referral source and any UTM parameters present in the URL.
 *
 * Storage:
 *   - sessionStorage key "lerriley_attribution_v1"
 *   - Only written once per session
 *   - Never sent to a third party except as event properties
 */

const STORAGE_KEY = "lerriley_attribution_v1";

export type Attribution = {
  referrer: string | null;
  landing_path: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  captured_at: string;
};

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);

    const attribution: Attribution = {
      referrer: document.referrer || null,
      landing_path: window.location.pathname,
      captured_at: new Date().toISOString(),
    };

    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmTerm = params.get("utm_term");
    const utmContent = params.get("utm_content");

    if (utmSource) attribution.utm_source = utmSource;
    if (utmMedium) attribution.utm_medium = utmMedium;
    if (utmCampaign) attribution.utm_campaign = utmCampaign;
    if (utmTerm) attribution.utm_term = utmTerm;
    if (utmContent) attribution.utm_content = utmContent;

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* Storage may be disabled; attribution is optional. */
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}
