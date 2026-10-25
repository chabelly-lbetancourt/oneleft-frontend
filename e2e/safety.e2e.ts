import { Page, Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-033 in the web: the plan and the social service are answered in the browser, so the test needs no backend with
 * blocks and reports and creates nothing (no block is left and no report reaches the moderation). Only the sign-in
 * goes to Keycloak.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d6f';
const DIEGO = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002';
const SOCIAL = '/api/v1/social';

/** The signed-in person, from the token the app sends */
const subjectOf = (route: Route): string => {
  const token = route.request().headers()['authorization']?.split(' ')[1] ?? '';
  const payload = token.split('.')[1] ?? '';
  return (JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub: string }).sub;
};

const signedIn = async (page: Page) => {
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
};

/** Diego as the social service answers about him, and my blocks, kept in the test */
const answerTheSocialService = async (page: Page, blocks: string[]) => {
  const blocked = () => blocks.at(-1) === 'PUT';
  await page.route(
    (url) => url.pathname === `${SOCIAL}/people/${DIEGO}`,
    (route) =>
      route.fulfill({
        json: {
          userId: DIEGO,
          name: 'Diego',
          visibility: 'PUBLIC',
          followers: 2,
          following: 5,
          relation: blocked() ? 'BLOCKED' : 'NONE',
          followsMe: false,
          activityVisible: !blocked(),
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `${SOCIAL}/me/blocked/${DIEGO}`,
    (route) => {
      blocks.push(route.request().method());
      return route.fulfill({ status: 204 });
    },
  );
  await page.route(
    (url) => url.pathname === `${SOCIAL}/me/blocked`,
    (route) =>
      route.fulfill({
        json: {
          items: blocked()
            ? [{ userId: DIEGO, name: 'Diego', since: new Date().toISOString() }]
            : [],
          page: 0,
          size: 20,
          total: blocked() ? 1 : 0,
        },
      }),
  );
};

test('blocks someone after confirming, and unblocks them from the list of blocked people', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  const blocks: string[] = [];
  await answerTheSocialService(page, blocks);
  await signedIn(page);

  await page.goto(`/people/${DIEGO}`);
  await page.locator('.block-button button').click();
  // It asks first and says that Diego is not told
  await expect(page.locator('.block-confirm')).toContainText(t('safety.blockHint'));
  await page.getByRole('button', { name: t('safety.blockConfirm') }).click();

  await expect(page.locator('.blocked-message')).toBeVisible();
  await expect(page.locator('.person-activity-card')).toHaveCount(0);

  // The people I blocked, from the avatar menu of the home page
  await page.goto('/');
  await page.locator('button.user-menu').click();
  await page.getByRole('menuitem', { name: t('userMenu.blocked') }).click();
  await expect(page).toHaveURL(/\/blocked$/);
  await expect(page.locator('.connection__name')).toHaveText(['Diego']);
  await page.locator('.unblock-person button').click();

  await expect(page.locator('.connection')).toHaveCount(0);
  expect(blocks).toEqual(['PUT', 'DELETE']);
});

test('reports a plan with its reason and what happened', async ({ openPage, t }) => {
  const page = await openPage();
  const reports: unknown[] = [];
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) =>
      route.fulfill({
        json: {
          id: PLAN_ID,
          organizerId: DIEGO,
          organizerName: 'Diego',
          activity: 'PADEL',
          title: 'Pádel 2 contra 2',
          description: null,
          meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3912, longitude: -3.6288 },
          startsAt: new Date(Date.now() + 2 * 3600_000).toISOString(),
          spots: 3,
          occupied: 1,
          freeSpots: 2,
          level: null,
          status: 'OPEN',
          publishedAt: new Date().toISOString(),
          participants: [
            { userId: subjectOf(route), name: 'Ana', joinedAt: new Date().toISOString() },
          ],
          waitlist: [],
          arrivals: [],
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}/weather`,
    (route) => route.fulfill({ status: 204 }),
  );
  await page.route(
    (url) => url.pathname === `${SOCIAL}/reports`,
    (route) => {
      reports.push(route.request().postDataJSON());
      return route.fulfill({ status: 201, json: { id: 'report-1', status: 'OPEN' } });
    },
  );
  await signedIn(page);

  await page.goto(`/plans/${PLAN_ID}`);
  await page.getByRole('button', { name: t('safety.reportPlan') }).click();
  await page.locator('.report-reason').click();
  await page.getByRole('option', { name: t('safety.reasons.FAKE') }).click();
  await page.locator('.report-comment').fill('La pista no existe');
  await page.getByRole('button', { name: t('safety.send') }).click();

  await expect(page.locator('.report-sent')).toContainText(t('safety.reported'));
  expect(reports).toEqual([
    {
      target: 'PLAN',
      targetId: PLAN_ID,
      organizerId: DIEGO,
      reason: 'FAKE',
      comment: 'La pista no existe',
    },
  ]);
});
