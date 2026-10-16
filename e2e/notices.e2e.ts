import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * The notices start below the status bar of the phone (frontend#119): PrimeNG writes its own position on the notice,
 * which put it over the clock in the Android app. The status bar is simulated with the variable the app reads, and the
 * notice comes from the personal event stream, answered in the browser.
 */
const STATUS_BAR = 48;

test('keeps the notices below the status bar of the phone', async ({ openPage, t }) => {
  const page = await openPage();
  await page.addInitScript((height) => {
    document.addEventListener('DOMContentLoaded', () =>
      document.documentElement.style.setProperty('--safe-area-inset-top', `${height}px`),
    );
  }, STATUS_BAR);
  await page.route(
    (url) => url.pathname === '/api/v1/plans/events/stream',
    (route) =>
      route.fulfill({
        status: 200,
        headers: { 'content-type': 'text/event-stream' },
        body: `event: badge-earned\ndata: ${JSON.stringify({
          badge: 'TEN_ACTIVITIES',
          earnedAt: new Date().toISOString(),
        })}\n\n`,
      }),
  );
  await page.route(
    (url) => url.pathname.startsWith('/api/v1/reputation'),
    (route) => route.fulfill({ json: [] }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);

  const notice = page.locator('.join-notice', { hasText: t('notices.badgeTitle') });
  await expect(notice).toBeVisible();
  const toast = await page.locator('.p-toast-top-center').boundingBox();
  // 2rem below the status bar, never on it
  expect(toast!.y).toBeGreaterThanOrEqual(STATUS_BAR + 32 - 1);
});
