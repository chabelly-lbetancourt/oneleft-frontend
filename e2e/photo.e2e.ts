import { expect, signIn, test, LUCIA } from './support/fixtures';

/**
 * HU-020 in the web: the users service and the storage are answered in the browser, so the test creates nothing.
 * Only the sign-in goes to Keycloak. The photo is a real image (a screenshot of the page), so the browser really
 * crops and encodes it.
 */
const STORAGE = 'http://storage.test';
const PHOTO = `${STORAGE}/oneleft-photos/photos/me/1.webp`;

test('changes my photo from my profile, uploading it straight to the storage, and removes it', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  let mine: string | null = null;
  let uploaded: { type: string | undefined; size: number } | null = null;
  let image: Buffer = Buffer.alloc(0);

  await page.route(
    (url) => url.pathname === '/api/v1/users/photos',
    (route) => route.fulfill({ json: mine ? [{ userId: 'me', url: mine }] : [] }),
  );
  await page.route(
    (url) => url.pathname === '/api/v1/users/me/photo/uploads',
    (route) =>
      route.fulfill({
        status: 201,
        json: {
          key: 'photos/me/1.webp',
          url: `${PHOTO}?X-Amz-Signature=upload`,
          method: 'PUT',
          headers: { 'Content-Type': route.request().postDataJSON().contentType },
          expiresAt: new Date(Date.now() + 300_000).toISOString(),
        },
      }),
  );
  await page.route(
    (url) => url.pathname === '/api/v1/users/me/photo',
    (route) => {
      mine = route.request().method() === 'PUT' ? `${PHOTO}?X-Amz-Signature=view` : null;
      return route.request().method() === 'PUT'
        ? route.fulfill({ json: { userId: 'me', url: mine } })
        : route.fulfill({ status: 204 });
    },
  );
  // The storage: it takes the upload and then serves the photo it got
  await page.route(`${STORAGE}/**`, (route) => {
    if (route.request().method() === 'PUT') {
      image = route.request().postDataBuffer() ?? Buffer.alloc(0);
      uploaded = { type: route.request().headers()['content-type'], size: image.length };
      return route.fulfill({ status: 200 });
    }
    return route.fulfill({ status: 200, contentType: 'image/webp', body: image });
  });

  await page.goto('/profile');
  await signIn(page, LUCIA);
  await expect(page.locator('.profile-card')).toBeVisible();
  await expect(page.locator('.change-photo')).toContainText(t('photo.add'));

  const photo = await page.screenshot({ clip: { x: 0, y: 0, width: 360, height: 640 } });
  await page
    .locator('.photo-file')
    .setInputFiles({ name: 'IMG_1.png', mimeType: 'image/png', buffer: photo });

  await expect(page.locator('.photo-status')).toContainText(t('photo.changed'));
  expect(uploaded).toMatchObject({ type: 'image/webp' });
  expect(uploaded!.size).toBeGreaterThan(0);
  expect(uploaded!.size).toBeLessThan(1024 * 1024);
  await expect(page.locator('.profile-photo img')).toHaveAttribute('src', /photos\/me\/1\.webp/);
  await expect(page.locator('.change-photo')).toContainText(t('photo.change'));

  // The same photo in the header of the home page
  await page.goto('/');
  await expect(page.locator('.user-menu img')).toHaveAttribute('src', /photos\/me\/1\.webp/);

  await page.goto('/profile');
  await page.locator('.remove-photo button').click();
  await expect(page.locator('.photo-status')).toContainText(t('photo.removed'));
  await expect(page.locator('.profile-photo img')).toHaveCount(0);
});

test('explains that a file that is not an image cannot be my photo', async ({ openPage, t }) => {
  const page = await openPage();
  let asked = false;
  await page.route(
    (url) => url.pathname.startsWith('/api/v1/users/me/photo'),
    (route) => {
      asked = true;
      return route.abort();
    },
  );
  await page.route(
    (url) => url.pathname === '/api/v1/users/photos',
    (route) => route.fulfill({ json: [] }),
  );
  await page.goto('/profile');
  await signIn(page, LUCIA);
  await expect(page.locator('.profile-card')).toBeVisible();

  await page.locator('.photo-file').setInputFiles({
    name: 'notes.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.7'),
  });

  await expect(page.locator('.photo-status')).toContainText(t('photo.errors.notImage'));
  expect(asked).toBe(false);
});
