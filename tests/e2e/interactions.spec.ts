import { expect, test } from '@playwright/test';
import { site } from '../../src/config/site.ts';

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens, closes with Escape and returns focus to the button', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Menu' });
    const menu = page.locator('#mobile-menu');

    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();

    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(menu.getByRole('link', { name: 'Pricing' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(button).toBeFocused();
  });

  test('closes after choosing a link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'FAQ' }).click();
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await expect(page).toHaveURL(/#faq$/);
  });
});

test.describe('Calendly booking embed', () => {
  test('is not loaded on first paint, and loads when the booking section is reached', async ({ page }) => {
    const calendlyRequests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('calendly.com')) calendlyRequests.push(req.url());
    });
    // Block the third party itself; we only assert that the page asks for it at the right time.
    await page.route(/calendly\.com/, (route) => route.abort());

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(calendlyRequests).toEqual([]);

    await page.locator('#book').scrollIntoViewIfNeeded();
    await expect.poll(() => calendlyRequests.length).toBeGreaterThan(0);
    await expect(page.locator('script[src*="assets.calendly.com"]')).toHaveCount(1);
  });

  test('booking URL comes from config and has a fallback link', async ({ page }) => {
    await page.goto('/');
    const widget = page.locator('.calendly-inline-widget');
    const dataUrl = await widget.getAttribute('data-url');
    expect(dataUrl?.startsWith(`${site.calendlyUrl}?`)).toBe(true);
    await expect(page.getByRole('link', { name: 'Open the booking page in a new tab' })).toHaveAttribute(
      'href',
      site.calendlyUrl,
    );
  });
});

test.describe('hero video', () => {
  test('plays muted with a pause control, over a still frame', async ({ page }) => {
    await page.goto('/');
    const video = page.locator('[data-hero-video]');
    await expect(page.locator('.hero-still')).toHaveJSProperty('complete', true);
    await expect(video).toHaveJSProperty('muted', true);

    const toggle = page.getByRole('button', { name: 'Pause background animation' });
    await expect(toggle).toBeVisible();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);

    await toggle.click();
    await expect(page.getByRole('button', { name: 'Play background animation' })).toBeVisible();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });

  test('stays still when the visitor prefers reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Play background animation' })).toBeVisible();
    await page.waitForTimeout(500);
    expect(await page.locator('[data-hero-video]').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });
});
