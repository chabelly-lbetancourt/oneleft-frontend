import { Page, Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-047 in the web: the plan and the social service are answered in the browser, so the test needs no social
 * service and creates nothing. Only the sign-in goes to Keycloak.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d5e';
const DIEGO = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002';
const MARTA = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0003';
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

test('asks to follow the organizer of a plan, whose profile is private', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  let relation = 'NONE';
  const followed: string[] = [];
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
    (url) => url.pathname === `${SOCIAL}/people/${DIEGO}`,
    (route) =>
      route.fulfill({
        json: {
          userId: DIEGO,
          name: 'Diego',
          visibility: 'PRIVATE',
          followers: 2,
          following: 5,
          relation,
          followsMe: false,
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `${SOCIAL}/me/following/${DIEGO}`,
    (route) => {
      followed.push(route.request().method());
      relation = route.request().method() === 'PUT' ? 'REQUESTED' : 'NONE';
      return route.request().method() === 'PUT'
        ? route.fulfill({
            json: {
              userId: DIEGO,
              name: 'Diego',
              status: 'PENDING',
              since: new Date().toISOString(),
            },
          })
        : route.fulfill({ status: 204 });
    },
  );
  await signedIn(page);

  await page.goto(`/plans/${PLAN_ID}`);
  await page.locator('.organizer-link').click();
  await expect(page.getByRole('heading', { name: 'Diego' })).toBeVisible();
  await expect(page.locator('.private-tag')).toContainText(t('social.private'));
  await page.getByRole('button', { name: t('social.requestFollow') }).click();

  await expect(page.locator('.requested-message')).toBeVisible();
  await page.getByRole('button', { name: t('social.cancelRequest') }).click();
  await expect(page.getByRole('button', { name: t('social.requestFollow') })).toBeVisible();
  expect(followed).toEqual(['PUT', 'DELETE']);
});

test('accepts a request in my network and opens my profile', async ({ openPage, t }) => {
  const page = await openPage();
  let visibility = 'PRIVATE';
  let accepted = false;
  const account = () => ({
    userId: 'me',
    name: 'Ana',
    visibility,
    followers: accepted ? 2 : 1,
    following: 0,
    requests: accepted ? 0 : 1,
    sentRequests: 0,
  });
  const person = (userId: string, name: string, status: string) => ({
    userId,
    name,
    status,
    since: new Date().toISOString(),
  });
  await page.route(
    (url) => url.pathname.startsWith(`${SOCIAL}/me`),
    (route) => {
      const path = new URL(route.request().url()).pathname.slice(`${SOCIAL}/me`.length);
      const list = (items: unknown[]) => ({ items, page: 0, size: 20, total: items.length });
      switch (`${route.request().method()} ${path}`) {
        case 'PUT /visibility':
          visibility = route.request().postDataJSON().visibility;
          return route.fulfill({ json: account() });
        case `POST /requests/${MARTA}/accept`:
          accepted = true;
          return route.fulfill({ json: person(MARTA, 'Marta', 'ACCEPTED') });
        case 'GET /followers':
          return route.fulfill({
            json: list([
              ...(accepted ? [person(MARTA, 'Marta', 'ACCEPTED')] : []),
              person(DIEGO, 'Diego', 'ACCEPTED'),
            ]),
          });
        case 'GET /requests':
          return route.fulfill({ json: list(accepted ? [] : [person(MARTA, 'Marta', 'PENDING')]) });
        case 'GET /requests/sent':
          return route.fulfill({ json: list([]) });
        default:
          return route.fulfill({ json: account() });
      }
    },
  );
  await signedIn(page);

  await page.locator('.profile-network').click();
  await expect(page.getByRole('switch', { name: t('social.private') })).toBeChecked();
  await expect(page.locator('.connections--followers')).toContainText('Diego');

  await page.getByRole('tab', { name: t('social.requests') }).click();
  await expect(page.locator('.connections--requests')).toContainText('Marta');
  await page.locator('.accept-request button').click();
  await expect(page.locator('.empty-requests')).toContainText(t('social.noRequests'));

  await page.getByRole('tab', { name: t('social.followers') }).click();
  await expect(page.locator('.connections--followers .connection__name')).toHaveText([
    'Marta',
    'Diego',
  ]);

  await page.getByRole('switch', { name: t('social.private') }).click();
  await expect(page.getByRole('switch', { name: t('social.private') })).not.toBeChecked();
  await expect(page.getByText(t('social.publicHint'))).toBeVisible();
});
