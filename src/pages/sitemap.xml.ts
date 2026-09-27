import type { APIRoute } from 'astro';
import { site } from '../config/site.ts';
import { routeFromFile } from '../lib/routes.ts';

/**
 * Every indexable page, derived from the files in src/pages.
 * Adding a page (e.g. src/pages/grade-9-math-tutor-toronto.astro) adds it here automatically.
 */
const pageFiles = Object.keys(import.meta.glob('./**/*.{astro,md,mdx}'));

export const GET: APIRoute = () => {
  const urls = pageFiles
    .map(routeFromFile)
    .filter((route): route is string => route !== null)
    .sort()
    .map((route) => `  <url><loc>${new URL(route, site.url)}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
