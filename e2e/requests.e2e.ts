import { Page } from '@playwright/test';
import { ADMIN, expect, signIn, test } from './support/fixtures';

/**
 * HU-069 in the web: the plans service is answered in the browser, so the test creates nothing (plans cannot be
 * deleted). One person asks for a spot in a plan whose organizer chooses who comes; the organizer sees the request and
 * accepts it. Only the sign-in goes to Keycloak.
 */
const PLAN_ID = '3c1f9d2a-5b7e-4f80-9a64-0d2e8b7c1a55';
/** The id of the test user ADMIN in the development realm */
const ME = '9e51a057-ce42-4177-b020-ac2fc7ec6ffa';
const OTHER = '5b0f7c2e-8d4a-4f3b-9c61-2e7a9d4b8f10';

const fakePlan = (organizerId: string, extra: object = {}) => ({
  id: PLAN_ID,
  organizerId,
  organizerName: 'Ana',
  activity: 'PADEL',
  activityOther: null,
  title: 'E2E pádel, falta uno',
  description: null,
  meetingPoint: { name: 'Pistas', latitude: 40.3912, longitude: -3.6287 },
  startsAt: new Date(Date.now() + 70 * 60_000).toISOString(),
  endsAt: new Date(Date.now() + 250 * 60_000).toISOString(),
  spots: 1,
  occupied: 0,
  freeSpots: 1,
  level: null,
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
  participants: [],
  waitlist: [],
  minimum: null,
  arrivals: [],
  requiresApproval: true,
  myRequest: null,
  ...extra,
});

const mockPlan = async (page: Page, plan: () => object) =>
  page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) => route.fulfill({ json: plan() }),
  );

test('asks for a spot with a message in a plan where the organizer chooses who comes', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  let myRequest: object | null = null;
  const sent: Record<string, unknown>[] = [];
  await mockPlan(page, () => fakePlan(OTHER, { myRequest }));
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}/requests`,
    (route) => {
      sent.push(route.request().postDataJSON());
      myRequest = {
        userId: ME,
        name: 'Admin',
        message: sent[0]['message'],
        status: 'PENDING',
        requestedAt: new Date().toISOString(),
        decidedAt: null,
      };
      return route.fulfill({ status: 201, json: myRequest });
    },
  );
  // The plan page is public (HU-024): sign in first and then open it
  await page.goto('/profile');
  await signIn(page, ADMIN);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto(`/plans/${PLAN_ID}`);

  // Nobody joins directly: there is no «join» button, but a request with an optional message
  await expect(page.locator('.request-spot__ask')).toBeVisible();
  await expect(page.locator('.join-button:not(.request-spot__ask)')).toHaveCount(0);
  await page.locator('#request-message').fill('¡Me encantaría!');
  await page.locator('.request-spot__ask button').click();

  expect(sent).toEqual([{ message: '¡Me encantaría!' }]);
  await expect(page.locator('.request-spot__pending')).toContainText(
    t('plan.requestPending').slice(0, 15),
  );
  await expect(page.locator('.request-spot__withdraw')).toBeVisible();
});

test('the organizer sees who asked, with their message, and accepts one request', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  let accepted = false;
  const decided: string[] = [];
  await mockPlan(page, () =>
    fakePlan(ME, accepted ? { occupied: 1, freeSpots: 0, status: 'FULL' } : {}),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}/requests`,
    (route) =>
      route.fulfill({
        json: accepted
          ? []
          : [
              {
                userId: OTHER,
                name: 'Lucía',
                message: '¡Me encantaría!',
                status: 'PENDING',
                requestedAt: new Date().toISOString(),
                decidedAt: null,
              },
            ],
      }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}/requests/${OTHER}/accept`,
    (route) => {
      decided.push('accept');
      accepted = true;
      return route.fulfill({
        json: {
          userId: OTHER,
          name: 'Lucía',
          message: null,
          status: 'ACCEPTED',
          requestedAt: '',
          decidedAt: '',
        },
      });
    },
  );
  // The plan page is public (HU-024): sign in first and then open it
  await page.goto('/profile');
  await signIn(page, ADMIN);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto(`/plans/${PLAN_ID}`);

  await expect(page.locator('.join-requests__item')).toContainText('Lucía');
  await expect(page.locator('.join-requests__item')).toContainText('¡Me encantaría!');
  await page.locator('.join-requests__accept button').click();

  expect(decided).toEqual(['accept']);
  await expect(page.locator('.join-requests__item')).toHaveCount(0);
  await expect(page.locator('.join-requests__empty')).toContainText(t('plan.requestsEmpty'));
});
