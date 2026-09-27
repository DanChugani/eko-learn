/**
 * The brand mark as SVG markup, shared by the Mark component and the favicon generator
 * so the two can never drift. `gradientId` must be unique within a page.
 */
export const MARK_COLOURS = {
  from: '#3446c4',
  to: '#a97ee0',
  gold: '#f2ce6e',
} as const;

/** Leaf clusters forming the canopy dome: [cx, cy, r]. */
const CANOPY: ReadonlyArray<readonly [number, number, number]> = [
  [16, 8.2, 3.1],
  [12.2, 9.6, 2.7],
  [19.8, 9.6, 2.7],
  [9.9, 12.6, 2.2],
  [22.1, 12.6, 2.2],
  [13.6, 12.4, 2.4],
  [18.4, 12.4, 2.4],
  [16, 11.8, 2.2],
];

/** `disc` is the round badge; `square` fills the whole tile, for icons the OS masks itself. */
export type MarkShape = 'disc' | 'square';

export function markSvgBody(gradientId: string, shape: MarkShape = 'disc'): string {
  const { from, to, gold } = MARK_COLOURS;
  const leaves = CANOPY.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`).join('');
  return [
    `<defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">`,
    `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>`,
    shape === 'disc'
      ? `<circle cx="16" cy="16" r="16" fill="url(#${gradientId})"/>`
      : `<rect width="32" height="32" fill="url(#${gradientId})"/>`,
    `<g fill="${gold}">${leaves}<path d="M15 23.2l.45-8.4h1.1l.45 8.4z"/></g>`,
    `<g fill="none" stroke="${gold}" stroke-width="1" stroke-linecap="round">`,
    `<path d="M16 15.6l-2.6-2.4M16 15l2.6-2.2"/>`,
    `<path d="M16 23.2c-1.6.3-3.6 1.1-5.2 2.6M16 23.2c1.6.3 3.6 1.1 5.2 2.6M16 23.2v3.4M16 23.4c-.8.7-1.8 1.8-2.4 3M16 23.4c.8.7 1.8 1.8 2.4 3"/>`,
    `</g>`,
  ].join('');
}

/** Standalone SVG document for favicon.svg and the raster icons. */
export function markSvgDocument(shape: MarkShape = 'disc'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${markSvgBody('g', shape)}</svg>\n`;
}
