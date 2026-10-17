import { Page } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * The back arrow of the inner pages goes to the previous screen of the app (frontend#130), and to the home page when
 * the page was opened directly. The feed and the plan are answered in the browser, so the test creates nothing. Only
 * the sign-in goes to Keycloak.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d60';
const DIEGO = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002';

const answered = async (page: Page) => {
  await page.route(
    (url) => url.pathname === '/api/v1/social/me/feed',
    (route) =>
      route.fulfill({
        json: {
          items: [
            {
              actorId: DIEGO,
              actorName: 'Diego',
              type: 'PUBLISHED',
              planId: PLAN_ID,
              planTitle: 'Pachanga 7 contra 7',
              planActivity: 'FOOTBALL',
              startsAt: new Date(Date.now() + 2 * 3600_000).toISOString(),
              occurredAt: new Date().toISOString(),
            },
          ],
          page: 0,
          size: 20,
          total: 1,
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) =>
      route.fulfill({
        json: {
          id: PLAN_ID,
          organizerId: DIEGO,
          organizerName: 'Diego',
          activity: 'FOOTBALL',
          title: 'Pachanga 7 contra 7',
          description: null,
          meetingPoint: { name: 'Polideportivo', latitude: 40.3912, longitude: -3.6288 },
          startsAt: new Date(Date.now() + 2 * 3600_000).toISOString(),
          spots: 6,
          occupied: 1,
          freeSpots: 5,
          level: null,
          status: 'OPEN',
          publishedAt: new Date().toISOString(),
          participants: [],
          waitlist: [],
          arrivals: [],
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}/weather`,
    (route) => route.fulfill({ status: 204 }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
};

test('goes back to the screen I came from, one by one', async ({ openPage }) => {
  const page = await openPage();
  await answered(page);
  await page.goto('/');

  await page.locator('.feed-entry').click();
  await expect(page).toHaveURL(/\/feed$/);
  await page.locator('.feed-plan').click();
  await expect(page).toHaveURL(new RegExp(`/plans/${PLAN_ID}$`));

  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/\/feed$/);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/\/$/);
});

test('goes to the home page when the page was opened directly', async ({ openPage }) => {
  const page = await openPage();
  await answered(page);
  await page.goto(`/plans/${PLAN_ID}`);
  await expect(page.locator('.page-header__title')).toBeVisible();

  await page.locator('.back-link').click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.feed-entry')).toBeVisible();
});
