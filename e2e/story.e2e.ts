import { readFileSync } from 'node:fs';
import { Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-056 in the web: the organizer makes the card of her plan for Stories, drawn by the browser itself, and downloads
 * it (headless Chromium shares no files). The plan is answered in the browser, so the test creates nothing; only the
 * sign-in goes to Keycloak.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d70';

/** The signed-in person, from the token the app sends */
const subjectOf = (route: Route): string => {
  const token = route.request().headers()['authorization']?.split(' ')[1] ?? '';
  const payload = token.split('.')[1] ?? '';
  return (JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub: string }).sub;
};

/** Width and height of a PNG, from its IHDR chunk */
const pngSize = (file: Buffer) => ({ width: file.readUInt32BE(16), height: file.readUInt32BE(20) });

/** An open plan of the signed-in person with a free spot, as the service gives it */
const openPlan = (organizerId: string) => ({
  id: PLAN_ID,
  organizerId,
  organizerName: 'Ana',
  activity: 'PADEL',
  title: 'Pádel 2 contra 2',
  description: null,
  meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3912, longitude: -3.6288 },
  startsAt: new Date(Date.now() + 2 * 3600_000).toISOString(),
  spots: 3,
  occupied: 2,
  freeSpots: 1,
  level: null,
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
  participants: [],
  waitlist: [],
  arrivals: [],
});

test('makes the card of my plan for Stories and downloads it', async ({ openPage, t }) => {
  const page = await openPage();
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) =>
      route.fulfill({
        json: {
          id: PLAN_ID,
          organizerId: subjectOf(route),
          organizerName: 'Ana',
          activity: 'PADEL',
          title: 'Pádel 2 contra 2',
          description: null,
          meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3912, longitude: -3.6288 },
          startsAt: new Date(Date.now() + 2 * 3600_000).toISOString(),
          spots: 3,
          occupied: 2,
          freeSpots: 1,
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
    (url) => url.pathname.startsWith(`/api/v1/plans/${PLAN_ID}/`),
    (route) => route.fulfill({ status: 204 }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();

  await page.goto(`/plans/${PLAN_ID}`);
  await page.getByRole('button', { name: t('story.create') }).click();

  const preview = page.locator('.story-preview');
  await expect(preview).toBeVisible();
  await expect(preview).toHaveAttribute('alt', /Pádel 2 contra 2/);
  // The image itself, drawn by the browser: a Story of 1080 × 1920
  expect(await preview.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1080);
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.story-download').click(),
  ]);
  expect(download.suggestedFilename()).toBe(`oneleft-${PLAN_ID}.png`);
  expect(pngSize(readFileSync(await download.path()))).toEqual({ width: 1080, height: 1920 });
});

/**
 * HU-058 in the web: with the card comes the link of the plan for the link sticker of Instagram. The organizer copies
 * it and the page says so; the link is the public page of the plan (HU-024). The plan is answered in the browser, so
 * the test creates nothing.
 */
test('copies the link of my plan for the link sticker of the Story', async ({ openPage, t }) => {
  const page = await openPage();
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) => route.fulfill({ json: openPlan(subjectOf(route)) }),
  );
  await page.route(
    (url) => url.pathname.startsWith(`/api/v1/plans/${PLAN_ID}/`),
    (route) => route.fulfill({ status: 204 }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();

  await page.goto(`/plans/${PLAN_ID}`);
  await page.getByRole('button', { name: t('story.create') }).click();

  const sticker = page.getByRole('group', { name: t('story.link.title') });
  await expect(sticker.getByRole('listitem')).toHaveText([
    t('story.link.stepCopy'),
    t('story.link.stepStory'),
    t('story.link.stepSticker'),
    t('story.link.stepPaste'),
  ]);
  const link = (await sticker.locator('.story-link__url').innerText()).trim();
  expect(new URL(link).pathname).toBe(`/share/plans/${PLAN_ID}`);

  await sticker.getByRole('button', { name: t('story.link.copy') }).click();

  await expect(sticker.getByRole('status')).toHaveText(t('story.link.copied'));
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(link);
});

/**
 * HU-057 in the web: someone of a finished plan makes its summary for Stories and downloads it. The plan and the
 * services its page asks are answered in the browser, so the test creates nothing.
 */
test('makes the summary of a finished plan for Stories and downloads it', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  const joinedAt = new Date(Date.now() - 5 * 3600_000).toISOString();
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) =>
      route.fulfill({
        json: {
          id: PLAN_ID,
          organizerId: '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002',
          organizerName: 'Diego',
          activity: 'PADEL',
          title: 'Pádel 2 contra 2',
          description: null,
          meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3912, longitude: -3.6288 },
          startsAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
          spots: 3,
          occupied: 3,
          freeSpots: 0,
          level: null,
          status: 'FINISHED',
          publishedAt: joinedAt,
          participants: [
            { userId: subjectOf(route), name: 'Ana', joinedAt },
            { userId: '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0003', name: 'Marta', joinedAt },
          ],
          waitlist: [],
          arrivals: [],
        },
      }),
  );
  await page.route(
    (url) => url.pathname.startsWith(`/api/v1/plans/${PLAN_ID}/`),
    (route) => route.fulfill({ status: 204 }),
  );
  // No kudos to give: that panel is not what this test is about
  await page.route(
    (url) => url.pathname === `/api/v1/reputation/plans/${PLAN_ID}/kudos`,
    (route) => route.fulfill({ json: { open: false, until: joinedAt, people: [] } }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();

  await page.goto(`/plans/${PLAN_ID}`);
  const summary = page.locator('.summary-share');
  await expect(summary).toContainText(t('summary.title'));
  await summary.getByRole('button', { name: t('summary.create') }).click();

  const preview = summary.locator('.story-preview');
  await expect(preview).toBeVisible();
  await expect(preview).toHaveAttribute('alt', /Pádel 2 contra 2/);
  // Vertical, ready for Stories: 1080 × 1920
  expect(await preview.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1080);
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    summary.locator('.story-download').click(),
  ]);
  expect(download.suggestedFilename()).toBe(`oneleft-summary-${PLAN_ID}.png`);
  expect(pngSize(readFileSync(await download.path()))).toEqual({ width: 1080, height: 1920 });
});
