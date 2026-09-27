/**
 * House-style check on the built site (run after `npm run build`).
 * Fails on em dashes anywhere, and on common US spellings in visible text and JSON-LD.
 * Canadian spelling: colour, centre, favourite, behaviour, enrolment, and "practise" as a verb.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const DIST = resolve(import.meta.dirname, '..', 'dist');

const RULES = [
  { pattern: /—|&mdash;|&#8212;/, message: 'em dash' },
  { pattern: /\bcolors?\b/i, message: 'US spelling "color" (use "colour")' },
  { pattern: /\bcenter(s|ed)?\b/i, message: 'US spelling "center" (use "centre")' },
  { pattern: /\bfavorite/i, message: 'US spelling "favorite" (use "favourite")' },
  { pattern: /\bbehavior/i, message: 'US spelling "behavior" (use "behaviour")' },
  { pattern: /\bneighbor/i, message: 'US spelling "neighbor" (use "neighbour")' },
  { pattern: /\benrollment/i, message: 'US spelling "enrollment" (use "enrolment")' },
  { pattern: /\bpractic(ed|ing)\b/i, message: 'verb "practiced/practicing" (use "practised/practising")' },
  {
    pattern: /\b(to|will|can|and|then|they|we|you|students?) practice\b/i,
    message: 'verb "practice" (use "practise"; "practice" is the noun)',
  },
];

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return nested.flat();
}

/** Visible text plus JSON-LD strings; CSS, scripts and markup are removed so "color:" in CSS is ignored. */
function copyFrom(html) {
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const attrText = [...html.matchAll(/\s(?:alt|content|aria-label|title)="([^"]*)"/g)].map((m) => m[1]);
  const body = html
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/&amp;/g, '&');
  return [body, ...attrText, ...jsonLd].join('\n');
}

const failures = [];
for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  if (RULES[0].pattern.test(html)) failures.push(`${relative(DIST, file)}: ${RULES[0].message}`);
  const text = copyFrom(html);
  for (const { pattern, message } of RULES.slice(1)) {
    const match = text.match(pattern);
    if (match) failures.push(`${relative(DIST, file)}: ${message} near "${match[0]}"`);
  }
}

if (failures.length > 0) {
  process.stderr.write(`Copy check failed:\n  ${failures.join('\n  ')}\n`);
  process.exit(1);
}
process.stdout.write('Copy check passed: no em dashes or US spellings found.\n');
