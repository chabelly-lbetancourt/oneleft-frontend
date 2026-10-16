import { Page, Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-059 in the web: who sees my activity, in «My network», and a plan kept out of it, from its detail. The plan and
 * the social service are answered in the browser, so the test creates nothing. Only the sign-in goes to Keycloak.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d5f';
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

test('shares my activity with my followers by default, and with nobody if I want', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  const changes: unknown[] = [];
  let feedAudience = 'FOLLOWERS';
  const account = (route: Route) => ({
    userId: subjectOf(route),
    name: 'Ana',
    visibility: 'PRIVATE',
    feedAudience,
    followers: 1,
    following: 0,
    requests: 0,
    sentRequests: 0,
  });
  await page.route(
    (url) => url.pathname === `${SOCIAL}/me`,
    (route) => route.fulfill({ json: account(route) }),
  );
  await page.route(
    (url) => url.pathname === `${SOCIAL}/me/feed-audience`,
    (route) => {
      const body = route.request().postDataJSON() as { feedAudience: string };
      changes.push(body);
      feedAudience = body.feedAudience;
      return route.fulfill({ json: account(route) });
    },
  );
  await page.route(
    (url) => /^\/api\/v1\/social\/me\/(followers|following|requests)/.test(url.pathname),
    (route) => route.fulfill({ json: { items: [], page: 0, size: 20, total: 0 } }),
  );
  await signedIn(page);
  await page.goto('/network');

  const share = page.locator('#share-activity');
  await expect(share).toBeChecked();
  await expect(page.locator('.audience-card')).toContainText(t('social.shareActivityHint'));

  await page.locator('label[for="share-activity"]').click();

  await expect(share).not.toBeChecked();
  await expect(page.locator('.audience-card')).toContainText(t('social.noActivityHint'));
  expect(changes).toEqual([{ feedAudience: 'NOBODY' }]);
});

test('keeps one of my plans out of my activity, from its detail', async ({ openPage, t }) => {
  const page = await openPage();
  let hidden = false;
  const requests: string[] = [];
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
    (url) => url.pathname === `${SOCIAL}/me/hidden-plans/${PLAN_ID}`,
    (route) => {
      const method = route.request().method();
      requests.push(method);
      if (method === 'GET') {
        return route.fulfill({ json: { planId: PLAN_ID, hidden } });
      }
      hidden = method === 'PUT';
      return route.fulfill({ status: 204 });
    },
  );
  await signedIn(page);
  await page.goto(`/plans/${PLAN_ID}`);

  const visibility = page.locator('app-activity-visibility');
  const toggle = visibility.locator('input');
  await expect(toggle).toBeChecked();
  await expect(visibility).toContainText(t('activityVisibility.shownHint'));

  await visibility.locator('label').click();
  await expect(toggle).not.toBeChecked();
  await expect(visibility).toContainText(t('activityVisibility.hiddenHint'));

  // Still hidden when the plan is opened again
  await page.reload();
  await expect(page.locator('app-activity-visibility input')).not.toBeChecked();
  await page.locator('app-activity-visibility label').click();
  await expect(page.locator('app-activity-visibility input')).toBeChecked();
  expect(requests).toEqual(['GET', 'PUT', 'GET', 'DELETE']);
});
