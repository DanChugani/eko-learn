import { expect, test } from '@playwright/test';
import { site } from '../../src/config/site.ts';

test.describe('content integrity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('removed claims and placeholders from the old site are gone', async ({ page }) => {
    const text = await page.locator('body').innerText();
    for (const banned of ['555', '98%', 'Guaranteed', 'Trusted by', '500+', 'IELTS', 'Coming Soon', 'Contact Us']) {
      expect(text, banned).not.toContain(banned);
    }
    await expect(page.locator('img[src*="dicebear"], img[src*="unsplash"]')).toHaveCount(0);
    await expect(page.locator('button[disabled]')).toHaveCount(0);
  });

  test('sample gap map shows all five Grade 6 strands with text labels', async ({ page }) => {
    const card = page.locator('#sample-report');
    await expect(card).toContainText('Sample report');
    for (const strand of ['Number', 'Algebra', 'Data', 'Spatial Sense', 'Financial Literacy']) {
      await expect(card).toContainText(strand);
    }
    await expect(card).toContainText('Tutor focus, next 4 weeks');
    await expect(card.getByText(/^(Secure|Developing|Gap)$/)).toHaveCount(5 + 3); // strands + legend
  });

  test('pricing shows three tiers with the worksheets price from config', async ({ page }) => {
    const pricing = page.locator('#pricing');
    await expect(pricing.getByRole('heading', { level: 3 })).toHaveText([
      'Diagnostic Assessment',
      '1-on-1 Tutoring',
      'Practice Worksheets',
    ]);
    await expect(pricing).toContainText(`$${site.pricing.worksheetsMonthly}`);
    await expect(pricing).toContainText('No contracts. Bundle discounts. Money-back satisfaction guarantee.');
    await expect(pricing.getByRole('link', { name: 'Join early access' })).toHaveAttribute(
      'href',
      site.worksheetsEarlyAccessUrl,
    );
  });

  test('footer shows contact details from config', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: site.email })).toHaveAttribute('href', `mailto:${site.email}`);
    await expect(footer).toContainText(site.phone.display);
    await expect(footer).toContainText('Toronto, Ontario');
  });
});
