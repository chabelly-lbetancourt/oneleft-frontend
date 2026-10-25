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
