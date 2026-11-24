import { expect, signIn, test, ANA } from './support/fixtures';

/**
 * HU-009 and HU-062 in the web: the reputation service is answered in the browser, so the test needs no reputation service and
 * creates nothing. Only the sign-in goes to Keycloak.
 */
const REPUTATION = '/api/v1/reputation';

test('opens my reputation from the profile and explains why it went up or down', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  await page.route(
    (url) => url.pathname === `${REPUTATION}/me`,
    (route) =>
      route.fulfill({ json: { userId: 'me', score: 135, level: 'REGULAR', nextLevelAt: 500 } }),
  );
  // The level and the weekly streak (HU-062)
  await page.route(
    (url) => url.pathname === `${REPUTATION}/me/streak`,
    (route) => route.fulfill({ json: { weeks: 3, thisWeek: true, nextBonus: 20, maxBonus: 25 } }),
  );
  await page.route(
    (url) => url.pathname === `${REPUTATION}/me/ledger`,
    (route) =>
      route.fulfill({
        json: {
          items: [
            {
              reason: 'WEEKLY_STREAK',
              points: 15,
              planId: null,
              planTitle: null,
              occurredAt: new Date().toISOString(),
            },
            {
              reason: 'NO_SHOW',
              points: -15,
              planId: 'p2',
              planTitle: 'Running por el Retiro',
              occurredAt: new Date().toISOString(),
            },
            {
              reason: 'ORGANIZED_HELD',
              points: 20,
              planId: 'p1',
              planTitle: 'Pádel 2 contra 2',
              occurredAt: new Date(Date.now() - 86_400_000).toISOString(),
            },
          ],
          page: 0,
          size: 20,
          total: 3,
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `${REPUTATION}/me/badges`,
    (route) =>
      route.fulfill({
        json: [
          {
            badge: 'FIRST_PLAN_ORGANIZED',
            progress: 1,
            goal: 1,
            earned: true,
            earnedAt: new Date().toISOString(),
          },
          { badge: 'TEN_PLANS_COMPLETED', progress: 3, goal: 10, earned: false, earnedAt: null },
        ],
      }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();

  // The profile arrives with a short view transition: a click during it can be lost, so it is retried until it leads
  // to the reputation
  const link = page.getByRole('link', { name: new RegExp(t('profile.reputation')) });
  await expect(link).toContainText('135');
  await expect(link).toContainText(t('reputation.levels.REGULAR'));
  await expect(async () => {
    await link.click();
    await expect(page).toHaveURL(/\/reputation$/, { timeout: 2000 });
  }).toPass();

  await expect(page.getByRole('heading', { name: t('reputation.score') })).toBeVisible();
  await expect(page.locator('.score-card__value')).toContainText('135');
  await expect(page.locator('.score-card__level')).toContainText(t('reputation.levels.REGULAR'));
  const bar = page.getByRole('progressbar', {
    name: new RegExp(t('reputation.levels.NEIGHBOURHOOD_REFERENCE')),
  });
  await expect(bar).toHaveAttribute('aria-valuenow', '135');
  await expect(bar).toHaveAttribute('aria-valuemax', '500');
  await expect(page.getByRole('heading', { name: t('reputation.streak.title') })).toBeVisible();
  await expect(page.locator('.streak-card__weeks')).toContainText('3');
  const badges = page.locator('.badge');
  await expect(badges).toHaveCount(2);
  await expect(badges.first()).toContainText(t('badges.names.FIRST_PLAN_ORGANIZED'));
  await expect(badges.nth(1).getByRole('progressbar')).toHaveAttribute('value', '3');
  await expect(page.locator('.rule')).toHaveCount(6);
  const entries = page.locator('.entry');
  await expect(entries).toHaveCount(3);
  await expect(entries.first()).toContainText(t('reputation.reasons.WEEKLY_STREAK'));
  await expect(entries.first().locator('.points')).toHaveText('+15');
  await expect(entries.nth(1)).toContainText('Running por el Retiro');
  await expect(entries.nth(1).locator('.points')).toHaveText('−15');
  await expect(entries.nth(2).getByRole('link')).toHaveAttribute('href', '/plans/p1');
});

test('tells me in real time that I earned a badge and opens my reputation', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  // The personal event stream of the plans service, answered with one badge
  await page.route(
    (url) => url.pathname === '/api/v1/plans/events/stream',
    (route) =>
      route.fulfill({
        status: 200,
        headers: { 'content-type': 'text/event-stream' },
        body: `event: badge-earned\ndata: ${JSON.stringify({
          badge: 'ALWAYS_PUNCTUAL',
          earnedAt: new Date().toISOString(),
        })}\n\n`,
      }),
  );
  await page.route(
    (url) => url.pathname.startsWith(REPUTATION),
    (route) =>
      route.fulfill({
        json: route.request().url().includes('/ledger')
          ? { items: [], page: 0, size: 20, total: 0 }
          : route.request().url().includes('/badges')
            ? []
            : route.request().url().includes('/streak')
              ? { weeks: 0, thisWeek: false, nextBonus: 5, maxBonus: 25 }
              : { userId: 'me', score: 0 },
      }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);

  const notice = page.locator('.join-notice', { hasText: t('notices.badgeTitle') });
  await expect(notice).toContainText(t('badges.names.ALWAYS_PUNCTUAL'));
  await notice.click();
  await expect(page).toHaveURL(/\/reputation$/);
});

test('says why an entry of my history gave fewer points (HU-066)', async ({ openPage, t }) => {
  const page = await openPage();
  await page.route(
    (url) => url.pathname.startsWith(REPUTATION),
    (route) =>
      route.fulfill({
        json: route.request().url().includes('/ledger')
          ? {
              items: [
                {
                  reason: 'KUDOS',
                  points: 0,
                  planId: 'p1',
                  planTitle: 'Pádel 2 contra 2',
                  occurredAt: new Date().toISOString(),
                  limitedBy: 'MUTUAL_PAIR',
                },
              ],
              page: 0,
              size: 20,
              total: 1,
            }
          : route.request().url().includes('/badges')
            ? []
            : { userId: 'me', score: 0 },
      }),
  );
  await page.goto('/reputation');
  await signIn(page, ANA);

  const entry = page.locator('.entry');
  await expect(entry).toHaveCount(1);
  await expect(entry.locator('.entry__limit')).toHaveText(t('reputation.limits.MUTUAL_PAIR'));
  await expect(entry.locator('.points')).toHaveText('0');
});
