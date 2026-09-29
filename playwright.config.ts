import { defineConfig, devices } from '@playwright/test';
import type { E2eOptions } from './e2e/support/fixtures';

/**
 * End-to-end tests against the whole stack: the web app, the gateway, the microservices and Keycloak
 * (oneleft-infra Docker Compose). Every walkthrough runs once per language.
 *   npm run e2e              (the app must be served on port 4200, or it is started from dist/)
 */
export default defineConfig<E2eOptions>({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  outputDir: 'e2e-results',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI']
    ? [['list'], ['html', { open: 'never', outputFolder: 'e2e-report' }]]
    : 'list',
  use: {
    baseURL: process.env['ONELEFT_APP_URL'] ?? 'http://localhost:4200',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'es', use: { ...devices['Pixel 7'], lang: 'es' } },
    { name: 'en', use: { ...devices['Pixel 7'], lang: 'en' } },
  ],
  webServer: {
    // Serves the development build (npx ng build --configuration development); reuses ng serve if it is running
    command: 'node e2e/serve.mjs',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
