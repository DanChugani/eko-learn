---
description: How to deploy the Ekolearn application to Vercel
---

# Deploying to Vercel

The site is a static Astro build (`dist/`). `vercel.json` in the repo root pins the Astro framework preset, build command and output directory, so Vercel project settings do not need to change after the migration from Vite.

Before deploying to production, run `npm run check:launch`. It runs the full `verify` suite and then fails if any `[PLACEHOLDER]` values remain in `src/config/site.ts`. Treat a failure as a blocker.

## Prerequisites
- A [Vercel account](https://vercel.com/signup)
- The `vercel` CLI installed (optional, but recommended for manual deploys)

## Option 1: Git Integration (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
3. Import your repository.
4. Vercel will use the Astro preset from `vercel.json`.
5. Click **Deploy**.

## Option 2: Command Line Deployment
If you don't want to use Git integration or want to check a preview deployment manually:

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

   Follow the prompts:
   - Set up and deploy “~/Development/eko-learn”? [Y/n] **y**
   - Which scope do you want to deploy to? **(Select your account)**
   - Link to existing project? [y/N] **n**
   - What’s your project’s name? **ekolearn**
   - In which directory is your code located? **./**
   - Want to modify these settings? [y/N] **n**

## Verification
- Once deployed, Vercel will give you a production URL (e.g., `https://ekolearn.vercel.app`).
- Check that all assets load correctly.
- View source on the homepage: the full page content should be in the HTML.
- Check `/sitemap.xml` and `/robots.txt` load.
- Test the page with Google's Rich Results Test to confirm the JSON-LD is read.
