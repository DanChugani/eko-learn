/**
 * Turns a src/pages file path (as returned by import.meta.glob) into a public route.
 * Returns null for pages that should not be listed: dynamic routes and error pages.
 */
export function routeFromFile(file: string): string | null {
  const route = file
    .replace(/^\.\//, '/')
    .replace(/\.(astro|mdx?)$/, '')
    .replace(/\/index$/, '/');
  if (route.includes('[') || /\/(404|500)$/.test(route)) return null;
  return route.endsWith('/') ? route : `${route}/`;
}
