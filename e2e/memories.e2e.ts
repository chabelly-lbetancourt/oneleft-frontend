import { Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-052 in the web: someone of a finished plan sees its album, uploads a photo straight to the storage and removes
 * it. The plan, its album and the storage are answered in the browser, so the test creates nothing; only the sign-in
 * goes to Keycloak. The photo is a real image (a screenshot of the page), so the browser really resizes and encodes
 * it.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d52';
const DIEGO = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002';
const STORAGE = 'http://storage.test';
const ALBUM = `/api/v1/plans/${PLAN_ID}/memories`;
const KEY = `memories/me/${PLAN_ID}/2.webp`;

/** The signed-in person, from the token the app sends */
const subjectOf = (route: Route): string => {
  const token = route.request().headers()['authorization']?.split(' ')[1] ?? '';
  const payload = token.split('.')[1] ?? '';
  return (JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub: string }).sub;
};

/** A finished plan of Diego that the signed-in person joined, as the service gives it */
const finishedPlan = (me: string) => {
  const joinedAt = new Date(Date.now() - 5 * 3600_000).toISOString();
  return {
    id: PLAN_ID,
    organizerId: DIEGO,
    organizerName: 'Diego',
    activity: 'PADEL',
    title: 'Pádel 2 contra 2',
    description: null,
    meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3912, longitude: -3.6288 },
    startsAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
    spots: 2,
    occupied: 2,
    freeSpots: 0,
    level: null,
    status: 'FINISHED',
    publishedAt: joinedAt,
    participants: [{ userId: me, name: 'Ana', joinedAt }],
    waitlist: [],
    arrivals: [],
  };
};

test('shares a photo in the album of a finished plan and removes it', async ({ openPage, t }) => {
  const page = await openPage();
  const uploadedAt = new Date(Date.now() - 3600_000).toISOString();
  const memory = (id: string, userId: string) => ({
    id,
    planId: PLAN_ID,
    userId,
    url: `${STORAGE}/oneleft-photos/memories/${id}.webp?X-Amz-Signature=view`,
    size: 1024,
    uploadedAt,
  });
  let album = [memory('m1', DIEGO)];
  let image: Buffer = Buffer.alloc(0);
  let photo: Buffer = Buffer.alloc(0);
  let uploaded: { type?: string; authorization?: string; size: number } | null = null;
  const removed: string[] = [];

  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) => route.fulfill({ json: finishedPlan(subjectOf(route)) }),
  );
  // Whatever else the page of the plan asks about it: nothing
  await page.route(
    (url) => url.pathname.startsWith(`/api/v1/plans/${PLAN_ID}/`),
    (route) => route.fulfill({ status: 204 }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/reputation/plans/${PLAN_ID}/kudos`,
    (route) => route.fulfill({ json: { open: false, until: uploadedAt, people: [] } }),
  );
  await page.route(
    (url) => url.pathname === ALBUM,
    (route) => {
      if (route.request().method() === 'GET') {
        return route.fulfill({ json: { items: album, page: 0, size: 20, total: album.length } });
      }
      // The uploaded photo joins the album, first
      const added = memory('m2', subjectOf(route));
      album = [added, ...album];
      return route.fulfill({ status: 201, json: added });
    },
  );
  await page.route(
    (url) => url.pathname === `${ALBUM}/uploads`,
    (route) =>
      route.fulfill({
        status: 201,
        json: {
          key: KEY,
          url: `${STORAGE}/oneleft-photos/${KEY}?X-Amz-Signature=upload`,
          method: 'PUT',
          headers: { 'Content-Type': route.request().postDataJSON().contentType },
          expiresAt: new Date(Date.now() + 300_000).toISOString(),
        },
      }),
  );
  await page.route(
    (url) => url.pathname.startsWith(`${ALBUM}/m`),
    (route) => {
      const id = route.request().url().split('/').pop()!;
      removed.push(`${route.request().method()} ${id}`);
      album = album.filter((photo) => photo.id !== id);
      return route.fulfill({ status: 204 });
    },
  );
  // The storage: it takes the upload and serves the photos of the album
  await page.route(`${STORAGE}/**`, (route) => {
    if (route.request().method() === 'PUT') {
      image = route.request().postDataBuffer() ?? Buffer.alloc(0);
      const headers = route.request().headers();
      uploaded = {
        type: headers['content-type'],
        authorization: headers['authorization'],
        size: image.length,
      };
      return route.fulfill({ status: 200 });
    }
    // Before the upload, any real image stands for the photo of Diego
    return image.length
      ? route.fulfill({ status: 200, contentType: 'image/webp', body: image })
      : route.fulfill({ status: 200, contentType: 'image/png', body: photo });
  });

  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
  photo = await page.screenshot({ clip: { x: 0, y: 0, width: 360, height: 640 } });

  await page.goto(`/plans/${PLAN_ID}`);
  const memories = page.getByRole('region', { name: t('memories.title') });
  await expect(memories).toBeVisible();
  // The photo of Diego: it says whose it is and I cannot remove it
  await expect(memories.getByRole('listitem')).toHaveCount(1);
  await expect(memories.getByRole('img')).toHaveAttribute('alt', /Diego/);
  await expect(memories.locator('.memory__remove')).toHaveCount(0);

  await memories
    .locator('.memories-file')
    .setInputFiles({ name: 'IMG_1.png', mimeType: 'image/png', buffer: photo });

  await expect(memories.getByRole('status')).toContainText(t('memories.uploaded'));
  // Straight to the storage, with the headers of the link and without my token
  expect(uploaded).toMatchObject({ type: 'image/webp' });
  expect(uploaded!.authorization).toBeUndefined();
  expect(uploaded!.size).toBeGreaterThan(0);
  expect(uploaded!.size).toBeLessThanOrEqual(2 * 1024 * 1024);
  await expect(memories.getByRole('listitem')).toHaveCount(2);
  const mine = memories.getByRole('listitem').first();
  await expect(mine.getByRole('img')).toHaveAttribute('src', /memories\/m2\.webp/);
  await expect(mine).toContainText(t('memories.you'));

  // Removing asks first
  await mine.locator('.memory__remove button').click();
  expect(removed).toEqual([]);
  await mine
    .getByRole('group', { name: t('memories.removeConfirm') })
    .getByRole('button', { name: t('memories.removeYes') })
    .click();

  await expect(memories.getByRole('status')).toContainText(t('memories.removed'));
  expect(removed).toEqual(['DELETE m2']);
  await expect(memories.getByRole('listitem')).toHaveCount(1);
  await expect(memories.getByRole('img')).toHaveAttribute('alt', /Diego/);
});
