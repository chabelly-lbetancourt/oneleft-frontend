import { Page, Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-025 in the web: the plan and its check-ins are answered in the browser, so the test creates nothing and does not
 * depend on where the meeting point is. Only the sign-in goes to Keycloak.
 */
const PLAN_ID = '3b1f6c2e-8d4a-4f7b-9c1e-5a2d7e9f0b13';
const PLAN_URL = `/api/v1/plans/${PLAN_ID}`;

/** The signed-in person, from the token the app sends */
const subjectOf = (route: Route): string => {
  const token = route.request().headers()['authorization']?.split(' ')[1] ?? '';
  const payload = token.split('.')[1] ?? '';
  return (JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub: string }).sub;
};

/** A plan starting in 10 minutes in which the signed-in person is a participant, and Diego already arrived */
const answerPlan = async (page: Page, checkIn: (route: Route) => Promise<void>) => {
  await page.route(
    (url) => url.pathname === PLAN_URL,
    (route) =>
      route.fulfill({
        json: {
          id: PLAN_ID,
          organizerId: 'diego',
          organizerName: 'Diego',
          activity: 'PADEL',
          title: 'Pádel 2 contra 2',
          description: null,
          meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3912, longitude: -3.6288 },
          startsAt: new Date(Date.now() + 10 * 60_000).toISOString(),
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
    (url) => url.pathname === `${PLAN_URL}/weather`,
    (route) => route.fulfill({ status: 204 }),
  );
  await page.route(
    (url) => url.pathname === `${PLAN_URL}/check-ins`,
    (route) =>
      route.fulfill({
        json: [
          {
            userId: 'diego',
            name: 'Diego',
            at: new Date(Date.now() - 3 * 60_000).toISOString(),
          },
        ],
      }),
  );
  await page.route((url) => url.pathname === `${PLAN_URL}/check-ins/me`, checkIn);
};

const openPlan = async (page: Page) => {
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto(`/plans/${PLAN_ID}`);
};

test('says «I am here» at the meeting point and sees who has arrived', async ({ openPage, t }) => {
  const page = await openPage();
  const sent: unknown[] = [];
  await answerPlan(page, async (route) => {
    sent.push(route.request().postDataJSON());
    await route.fulfill({
      status: 201,
      json: { userId: subjectOf(route), name: 'Ana', at: new Date().toISOString() },
    });
  });
  await openPlan(page);

  const checkIn = page.getByRole('region', { name: t('checkIn.title') });
  await expect(checkIn.locator('.check-in__name')).toHaveText(['Diego']);
  await checkIn.getByRole('button', { name: t('checkIn.action') }).click();

  await expect(checkIn.locator('.check-in__done')).toBeVisible();
  await expect(checkIn.getByRole('button', { name: t('checkIn.action') })).toHaveCount(0);
  await expect(checkIn.locator('.check-in__name')).toHaveText(['Diego', t('checkIn.you')]);
  // The location of the device, rounded to about 11 m, only to check the geofence
  expect(sent).toEqual([{ latitude: 40.3912, longitude: -3.6288 }]);
});

test('says why the check-in was rejected when too far from the meeting point', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  await answerPlan(page, (route) =>
    route.fulfill({ status: 409, json: { code: 'checkIn.tooFar' } }),
  );
  await openPlan(page);

  const checkIn = page.getByRole('region', { name: t('checkIn.title') });
  await checkIn.getByRole('button', { name: t('checkIn.action') }).click();

  await expect(checkIn.locator('.check-in__error')).toContainText(t('errors.checkIn.tooFar'));
  await expect(checkIn.getByRole('button', { name: t('checkIn.action') })).toBeEnabled();
});
