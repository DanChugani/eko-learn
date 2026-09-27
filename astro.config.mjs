// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site.ts';

/** @param {string} pkg */
const fontsource = (pkg) => `./node_modules/@fontsource-variable/${pkg}/files`;

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    // Small pages: inline all CSS so first paint needs no extra request.
    inlineStylesheets: 'always',
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: [`${fontsource('fraunces')}/fraunces-latin-wght-normal.woff2`],
            weight: '100 900',
            style: 'normal',
            display: 'swap',
          },
          {
            // Hero margin notes only; not preloaded.
            src: [`${fontsource('fraunces')}/fraunces-latin-wght-italic.woff2`],
            weight: '100 900',
            style: 'italic',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: [`${fontsource('figtree')}/figtree-latin-wght-normal.woff2`],
            weight: '300 900',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
