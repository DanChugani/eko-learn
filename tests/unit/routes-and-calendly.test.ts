import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { routeFromFile } from '../../src/lib/routes.ts';
import { calendlyEmbedUrl } from '../../src/lib/calendly.ts';

describe('routeFromFile', () => {
  it('maps page files to trailing-slash routes', () => {
    assert.equal(routeFromFile('./index.astro'), '/');
    assert.equal(routeFromFile('./grade-9-math-tutor-toronto.astro'), '/grade-9-math-tutor-toronto/');
    assert.equal(routeFromFile('./blog/index.md'), '/blog/');
    assert.equal(routeFromFile('./blog/first-post.mdx'), '/blog/first-post/');
  });

  it('excludes error pages and dynamic routes', () => {
    assert.equal(routeFromFile('./404.astro'), null);
    assert.equal(routeFromFile('./500.astro'), null);
    assert.equal(routeFromFile('./blog/[slug].astro'), null);
  });
});

describe('calendlyEmbedUrl', () => {
  it('keeps the configured booking page and adds embed options', () => {
    const url = new URL(calendlyEmbedUrl('https://calendly.com/ekolearn/assessment'));
    assert.equal(url.origin + url.pathname, 'https://calendly.com/ekolearn/assessment');
    assert.equal(url.searchParams.get('hide_landing_page_details'), '1');
    assert.equal(url.searchParams.get('primary_color'), '3a3da8');
  });

  it('rejects a value that is not a URL', () => {
    assert.throws(() => calendlyEmbedUrl('[CALENDLY URL]'));
  });
});
