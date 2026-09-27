const BRAND_PARAMS = {
  hide_landing_page_details: '1',
  hide_gdpr_banner: '1',
  // Honoured on paid Calendly plans, ignored otherwise.
  primary_color: '1f4d3f',
  text_color: '1d2622',
  background_color: 'fffdf8',
} as const;

/** Builds the embed URL for Calendly's inline widget from the configured booking page. */
export function calendlyEmbedUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(BRAND_PARAMS)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}
