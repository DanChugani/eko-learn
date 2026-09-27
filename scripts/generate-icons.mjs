/**
 * Generates the favicon set and the social share image into /public.
 *   favicon.svg, favicon.ico (32), apple-touch-icon.png (180), icon-192.png, icon-512.png, og-image.png (1200x630)
 *
 * The OG image reuses the real gap-map card from the built homepage, so run `npm run build` first.
 * Usage: npm run build && npm run generate:icons
 */
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { markSvgDocument } from '../src/lib/mark.ts';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');

const TYPES = { '.html': 'text/html', '.woff2': 'font/woff2', '.css': 'text/css', '.js': 'text/javascript' };

function serveDist() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const file = join(DIST, path.endsWith('/') ? `${path}index.html` : path);
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((ok) => server.listen(0, () => ok(server)));
}

/** Wraps a PNG in a single-image ICO container (PNG-in-ICO is supported by all current browsers). */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // image data offset
  return Buffer.concat([header, png]);
}

async function renderSvg(page, svg, size) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`,
  );
  return page.screenshot({ omitBackground: true, type: 'png' });
}

async function renderOgImage(page, origin) {
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(`${origin}/`);
  await page.evaluate(() => {
    const card = document.getElementById('sample-report').cloneNode(true);
    card.querySelector('figcaption')?.remove();
    card.style.cssText = 'width:540px;padding:24px 28px;transform:scale(0.84);transform-origin:top right;';
    document.body.innerHTML = `
      <div style="box-sizing:border-box;width:1200px;height:630px;padding:64px 72px;display:flex;gap:40px;align-items:flex-start;background:linear-gradient(115deg,#25309a 0%,#4a48c0 48%,#8e68d6 100%);overflow:hidden">
        <div style="flex:1;display:flex;flex-direction:column;height:100%">
          <p style="font-size:28px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#fff;display:flex;align-items:center;gap:16px">
            ${document.querySelector('header a[href="/"] svg').outerHTML.replace('width="34" height="34"', 'width="56" height="56"')}
            Ekolearn
          </p>
          <h1 class="font-display" style="margin-top:52px;font-size:66px;line-height:1.05;color:#fff">Find the <span style="color:#f2ce6e">gaps</span>.<br>Teach the gaps.</h1>
          <p style="margin-top:auto;font-size:24px;color:#e6e2fa">1-on-1 online tutoring, Grades 1 to 12.<br>Ontario curriculum. Toronto.</p>
        </div>
      </div>`;
    document.body.firstElementChild.append(card);
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900); // let the bar animation finish
  return page.screenshot({ type: 'png' });
}

const server = await serveDist();
const origin = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  const disc = markSvgDocument('disc');
  await writeFile(join(PUBLIC, 'favicon.svg'), disc);
  await writeFile(join(PUBLIC, 'favicon.ico'), pngToIco(await renderSvg(page, disc, 32), 32));
  // iOS masks the touch icon itself, so it gets the full-bleed square.
  await writeFile(join(PUBLIC, 'apple-touch-icon.png'), await renderSvg(page, markSvgDocument('square'), 180));
  await writeFile(join(PUBLIC, 'icon-192.png'), await renderSvg(page, disc, 192));
  await writeFile(join(PUBLIC, 'icon-512.png'), await renderSvg(page, disc, 512));
  await writeFile(join(PUBLIC, 'og-image.png'), await renderOgImage(page, origin));

  process.stdout.write('Wrote favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, og-image.png\n');
} finally {
  await browser.close();
  server.close();
}
