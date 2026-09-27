/**
 * Lists every unfilled [PLACEHOLDER] in src/config/site.ts.
 *   npm run check:placeholders            report only
 *   npm run check:placeholders -- --strict exit 1 if any remain (use before launch / in CI)
 */
import { site } from '../src/config/site.ts';
import { findPlaceholders } from '../src/lib/placeholders.ts';

const hits = findPlaceholders(site);
const strict = process.argv.includes('--strict');

if (hits.length === 0) {
  process.stdout.write('No placeholders left in src/config/site.ts.\n');
  process.exit(0);
}

const rows = hits.map(({ path, value }) => `  site.${path.padEnd(28)} ${value}`).join('\n');
process.stdout.write(`${hits.length} placeholder(s) to fill in src/config/site.ts:\n${rows}\n`);
process.exit(strict ? 1 : 0);
