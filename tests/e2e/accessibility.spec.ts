import { expect, test } from '@playwright/test';

test.describe('structure and accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('exactly one h1 and no skipped heading levels', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page
      .locator('h1, h2, h3, h4, h5, h6')
      .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1], `heading ${i}`).toBeLessThanOrEqual(1);
    }
  });

  test('every in-page link points at an element that exists', async ({ page }) => {
    const hrefs = await page.locator('a[href^="#"]').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    const missing = await page.evaluate(
      (ids) => ids.filter((href) => !document.getElementById(href!.slice(1))),
      [...new Set(hrefs)],
    );
    expect(missing).toEqual([]);
  });

  test('interactive controls are at least 44px tall and wide', async ({ page }) => {
    const small = await page.locator('a, button, summary').evaluateAll((els) =>
      els
        .filter((el) => {
          const style = getComputedStyle(el);
          if (style.visibility === 'hidden' || el.getClientRects().length === 0) return false;
          // Visually hidden until focused (skip link); covered by the focus test below.
          if (el.classList.contains('sr-only') && el !== document.activeElement) return false;
          // WCAG inline exception: links inside running text.
          return !(el.tagName === 'A' && el.closest('p') && style.display === 'inline');
        })
        .map((el) => ({ el: el.outerHTML.slice(0, 80), rect: el.getBoundingClientRect() }))
        .filter(({ rect }) => rect.height < 44 || rect.width < 44)
        .map(({ el, rect }) => `${Math.round(rect.width)}x${Math.round(rect.height)} ${el}`),
    );
    expect(small).toEqual([]);
  });

  test('no horizontal scrolling', async ({ page }) => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('keyboard focus is visible', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toHaveText('Skip to content');
    await expect(focused).toBeInViewport();
    const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  });

  test('FAQ answers open with a native disclosure', async ({ page }) => {
    const first = page.locator('#faq details').first();
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await expect(first.locator('p')).toBeVisible();
  });
});

test.describe('narrow screens', () => {
  for (const width of [360, 390, 768]) {
    test(`no horizontal scrolling at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
