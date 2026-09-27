# Ekolearn marketing site

The public site for [Ekolearn](https://www.ekolearn.com): 1-on-1 online tutoring for Grades 1 to 12, aligned to the Ontario curriculum, built around a diagnostic assessment and gap map.

Static [Astro](https://astro.build) site. Every page is pre-rendered to HTML at build time, and the only JavaScript shipped is the mobile menu and the lazy Calendly loader.

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs static HTML to dist/
npm run preview      # serves dist/
```

Node 22.18 or newer (the unit tests run TypeScript directly with Node).

## Where things live

| What | Where |
|---|---|
| Phone, email, Calendly URL, rates, prices, tutors, feature flags, canonical domain | `src/config/site.ts` |
| Homepage copy (hero, comparison, steps, subjects, FAQ) | `src/content/home.ts` |
| Sample gap-map and report-card data | `src/content/sample-report.ts` |
| Hero film of the tree (generated with Higgsfield, Kling 3.0) and its still frames | `public/media/`, paths in `heroMedia` in `src/content/home.ts` |
| Design tokens (colours, fonts, spacing helpers) | `src/styles/global.css` |
| Page shell: meta tags, Open Graph, JSON-LD, fonts, favicons | `src/layouts/BaseLayout.astro` |
| Homepage sections | `src/components/sections/` |
| `sitemap.xml`, `robots.txt` | `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts` |

### Filling in placeholders

Unknown values are written as `[PLACEHOLDER]` in `src/config/site.ts`. They show on the page as-is so they are easy to spot, and they are kept out of JSON-LD.

```bash
npm run check:placeholders             # list what is left
npm run check:launch                   # verify + fail if any placeholders remain (run before deploying)
```

### Feature flags

In `src/config/site.ts` under `features`:

- `tutors`: shows the tutors section and its nav link.
- `adultEducation`: shows the adult education / IELTS section (off; kept for a future dedicated page).

### Adding a page

Create `src/pages/<slug>.astro` using `BaseLayout` with its own `title` and `description`. It is added to `sitemap.xml` automatically. Error pages and dynamic routes are excluded.

### Icons and share image

`public/favicon.*`, `apple-touch-icon.png`, `icon-*.png` and `og-image.png` are generated from the brand mark and the gap-map card:

```bash
npm run build && npm run generate:icons
```

## Checks

```bash
npm run verify
```

This runs, in order:

1. `astro check` (types)
2. Unit tests (`node --test`)
3. Build
4. `check:copy`: fails on em dashes or US spellings in the built HTML (house style is Canadian spelling, "practise" as a verb)
5. Playwright e2e on a Pixel 7 profile and a 1440px desktop: content without JavaScript, meta and JSON-LD, one h1, anchor targets, 44px touch targets, no horizontal scroll from 360px, mobile menu keyboard behaviour, Calendly lazy loading

The first Playwright run may need `npx playwright install chromium`.

## Content rules

- Canadian spelling: colour, centre, favourite, practise (verb) and practice (noun).
- No em dashes.
- No invented numbers, results, ratings or testimonials. Add a testimonials section only with real, attributed reviews.

## Deploying

Vercel, from `main`. `vercel.json` sets the Astro preset, long-lived caching for hashed assets in `/_astro/`, and basic security headers. See `.agent/workflows/deploy_to_vercel.md`.
