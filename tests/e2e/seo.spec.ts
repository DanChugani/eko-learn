import { expect, test } from '@playwright/test';
import { site } from '../../src/config/site.ts';
import { faqs, seo } from '../../src/content/home.ts';

const PLACEHOLDER = /\[[A-Z][A-Z0-9 _]*\]/;

test.describe('SEO: served HTML (no JavaScript)', () => {
  test.use({ javaScriptEnabled: false });

  test('crawlers get the full page content without running JavaScript', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Find the gaps. Teach the gaps.');
    await expect(page.locator('#pricing')).toContainText('Diagnostic Assessment');
    await expect(page.locator('#faq details')).toHaveCount(faqs.length);
  });

  test('mobile nav links are reachable without JavaScript', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('[data-menu-button]')).toBeHidden();
    await expect(page.locator('#mobile-menu').getByRole('link', { name: 'Pricing' })).toBeVisible();
  });

  test('has per-page title, description, canonical and social tags', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(seo.title);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-CA');
    const meta = (selector: string) => page.locator(selector).getAttribute('content');
    expect(await meta('meta[name="description"]')).toBe(seo.description);
    expect(seo.description.length).toBeLessThanOrEqual(160);
    expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(`${site.url}/`);
    expect(await meta('meta[property="og:title"]')).toBe(seo.title);
    expect(await meta('meta[property="og:image"]')).toBe(`${site.url}${site.ogImage}`);
    expect(await meta('meta[name="twitter:card"]')).toBe('summary_large_image');
  });

  test('favicon set and OG image are served', async ({ page, request }) => {
    await page.goto('/');
    for (const href of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/site.webmanifest', site.ogImage]) {
      expect((await request.get(href)).status(), href).toBe(200);
    }
  });

  test('JSON-LD describes the business and mirrors the visible FAQ', async ({ page }) => {
    await page.goto('/');
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(blocks.join('')).not.toMatch(PLACEHOLDER);
    const data = blocks.map((b) => JSON.parse(b));

    const org = data.find((d) => Array.isArray(d['@type']) && d['@type'].includes('EducationalOrganization'));
    expect(org['@type']).toContain('LocalBusiness');
    expect(org.address.addressLocality).toBe('Toronto');
    expect(org.address.addressRegion).toBe('ON');

    const faq = data.find((d) => d['@type'] === 'FAQPage');
    const visible = await page.locator('#faq summary').allTextContents();
    expect(faq.mainEntity.map((q: { name: string }) => q.name)).toEqual(visible.map((t) => t.trim()));
  });

  test('sitemap.xml and robots.txt are published', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain(`<loc>${site.url}/</loc>`);
    expect(sitemap).not.toContain('404');
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain(`Sitemap: ${site.url}/sitemap.xml`);
  });

  test('404 page is not indexed', async ({ page }) => {
    await page.goto('/404/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });
});
