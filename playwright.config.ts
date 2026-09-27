import { defineConfig, devices } from '@playwright/test';

// Not 4321, so a running `astro dev` (with its dev toolbar) is never mistaken for the build under test.
const PORT = 4329;

/** Runs against the production build (`npm run build` first) served by `astro preview`. */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    // --ignore-lock: a preview already running elsewhere (another port or session) must not stop the tests.
    command: `npx astro preview --port ${PORT} --ignore-lock`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
