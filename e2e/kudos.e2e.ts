import { Page, Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-060 in the web: kudos in a plan that ended, and the notice of one received. The plan, the reputation service and
 * the personal event stream are answered in the browser, so the test creates nothing. Only the sign-in goes to
 * Keycloak.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d61';
const DIEGO = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002';
const MARTA = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0003';
const REPUTATION = '/api/v1/reputation';

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

test('gives kudos to the group of a plan that ended', async ({ openPage, t }) => {
  const page = await openPage();
  const given: unknown[] = [];
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
          startsAt: new Date(Date.now() - 3 * 3600_000).toISOString(),
          spots: 3,
          occupied: 2,
          freeSpots: 1,
          level: null,
          status: 'FINISHED',
          publishedAt: new Date(Date.now() - 5 * 3600_000).toISOString(),
          participants: [
            { userId: subjectOf(route), name: 'Ana', joinedAt: new Date().toISOString() },
            { userId: MARTA, name: 'Marta', joinedAt: new Date().toISOString() },
          ],
          waitlist: [],
          arrivals: [],
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `${REPUTATION}/plans/${PLAN_ID}/kudos`,
    (route) => {
      if (route.request().method() === 'POST') {
        given.push(route.request().postDataJSON());
        return route.fulfill({ status: 201, json: {} });
      }
      return route.fulfill({
        json: {
          open: true,
          until: new Date(Date.now() + 6 * 86_400_000).toISOString(),
          people: [
            { userId: DIEGO, organizer: true, given: null },
            { userId: MARTA, organizer: false, given: null },
          ],
        },
      });
    },
  );
  await signedIn(page);
  await page.goto(`/plans/${PLAN_ID}`);

  const panel = page.locator('app-plan-kudos');
  await expect(panel).toContainText(t('kudos.title'));
  const diego = panel.locator('.kudos-person').filter({ hasText: 'Diego' });
  const marta = panel.locator('.kudos-person').filter({ hasText: 'Marta' });
  await expect(diego.locator('.kudos-kind')).toHaveCount(4);
  await expect(marta.locator('.kudos-kind')).toHaveCount(3);

  await diego.getByRole('button', { name: t('kudos.kinds.GREAT_ORGANIZER') }).click();

  await expect(diego.locator('.kudos-person__given')).toBeVisible();
  await expect(diego.locator('.kudos-kind')).toHaveCount(0);
  expect(given).toEqual([{ receiverId: DIEGO, kind: 'GREAT_ORGANIZER' }]);
});

test('tells me in real time that I received a kudos', async ({ openPage, t }) => {
  const page = await openPage();
  await page.route(
    (url) => url.pathname === '/api/v1/plans/events/stream',
    (route) =>
      route.fulfill({
        status: 200,
        headers: { 'content-type': 'text/event-stream' },
        body: `event: kudos\ndata: ${JSON.stringify({
          giverName: 'Diego',
          kind: 'GOOD_VIBES',
          planId: PLAN_ID,
          givenAt: new Date().toISOString(),
        })}\n\n`,
      }),
  );
  await signedIn(page);

  const notice = page.locator('.join-notice', { hasText: t('notices.kudosTitle') });
  await expect(notice).toContainText('Diego');
  await expect(notice).toContainText(t('kudos.kinds.GOOD_VIBES'));
});
