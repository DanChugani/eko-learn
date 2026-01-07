---
description: How to deploy the Ekolearn application to Vercel
---

# Deploying to Vercel

Vercel is the recommended platform for deploying Vite/React applications due to its ease of use, performance, and generous free tier.

## Prerequisites
- A [Vercel account](https://vercel.com/signup)
- The `vercel` CLI installed (optional, but recommended for manual deploys)

## Option 1: Git Integration (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
3. Import your repository.
4. Vercel will automatically detect `Vite`.
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
- Check that all assets load correctly and client-side routing works.
