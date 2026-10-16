import { Page } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-051 in the web: the activity of the people I follow. The social service, the photos and the personal event
 * stream are answered in the browser, so the test creates nothing. Only the sign-in goes to Keycloak.
 */
const DIEGO = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002';
const MARTA = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0003';
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const inHours = (hours: number) => new Date(Date.now() + hours * 3_600_000).toISOString();

const joined = {
  actorId: DIEGO,
  actorName: 'Diego',
  type: 'JOINED',
  planId: 'p1',
  planTitle: 'Pachanga 7 contra 7',
  planActivity: 'FOOTBALL',
  startsAt: inHours(2),
  occurredAt: minutesAgo(10),
};
const published = {
  actorId: MARTA,
  actorName: 'Marta',
  type: 'PUBLISHED',
  planId: 'p2',
  planTitle: 'Catan en la cafetería',
  planActivity: 'BOARD_GAMES',
  startsAt: inHours(3),
  occurredAt: minutesAgo(1),
};

/** My feed as the social service gives it; `news` adds what Marta publishes while the page is open */
const feed = async (page: Page, state: { news: boolean; items: object[] }) => {
  await page.route(
    (url) => url.pathname === '/api/v1/social/me/feed',
    (route) => {
      const items = state.news ? [published, ...state.items] : state.items;
      return route.fulfill({ json: { items, page: 0, size: 20, total: items.length } });
    },
  );
  await page.route(
    (url) => url.pathname === '/api/v1/users/photos',
    (route) => route.fulfill({ json: [] }),
  );
  // The personal event stream: empty until Marta publishes, then the notice for my feed
  await page.route(
    (url) => url.pathname === '/api/v1/plans/events/stream',
    (route) =>
      route.fulfill({
        status: 200,
        headers: { 'content-type': 'text/event-stream' },
        body: state.news
          ? `event: feed-activity\ndata: ${JSON.stringify({ ...published, userId: 'me' })}\n\n`
          : ': nothing new\n\n',
      }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
};

test('shows what the people I follow do, from the home page, and new activity as it arrives', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  const state = { news: false, items: [joined] };
  await feed(page, state);
  await page.goto('/');

  await page.locator('.feed-entry').click();
  await expect(page).toHaveURL(/\/feed$/);
  const items = page.locator('.feed-item');
  await expect(items).toHaveCount(1);
  await expect(items.first().locator('.feed-item__what')).toContainText(
    `Diego ${t('feed.JOINED')}`,
  );
  await expect(items.first().locator('.feed-item__actor')).toHaveAttribute(
    'href',
    `/people/${DIEGO}`,
  );
  const plan = items.first().locator('.feed-plan');
  await expect(plan).toHaveAttribute('href', '/plans/p1');
  await expect(plan).toContainText('Pachanga 7 contra 7');
  await expect(plan).toContainText(t('activities.FOOTBALL'));

  state.news = true;

  // The stream reconnects and brings the notice: Marta's plan goes on top, highlighted
  await expect(items).toHaveCount(2, { timeout: 15_000 });
  await expect(items.first()).toContainText(`Marta ${t('feed.PUBLISHED')}`);
  await expect(items.first()).toHaveClass(/feed-item--fresh/);
  await expect(items.nth(1)).toContainText('Diego');
});

test('explains how to fill an empty feed', async ({ openPage, t }) => {
  const page = await openPage();
  await feed(page, { news: false, items: [] });
  await page.goto('/feed');

  await expect(page.locator('.feed-empty')).toContainText(t('feed.empty'));
  await expect(page.locator('.feed-empty a').first()).toHaveAttribute('href', '/plans/nearby');
  await expect(page.locator('.feed-empty a').nth(1)).toHaveAttribute('href', '/network');
});
