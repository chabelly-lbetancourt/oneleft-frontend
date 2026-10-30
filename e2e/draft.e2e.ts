import { ADMIN, expect, signIn, test } from './support/fixtures';

/**
 * HU-010 in the web: the service that understands the sentence is answered in the browser (it needs a paid key),
 * so nothing is published and nothing is created. The test writes a sentence, checks that the form is filled in and
 * that the person still has to publish it.
 */
test('writes a sentence, fills in the form and publishes nothing', async ({ openPage, t }) => {
  const page = await openPage();
  const startsAt = new Date(Date.now() + 2 * 60 * 60_000);
  const published: string[] = [];
  await page.route(
    (url) => url.pathname === '/api/v1/places',
    (route) => route.fulfill({ json: [] }),
  );
  await page.route(
    (url) => url.pathname === '/api/v1/plans/draft',
    (route) =>
      route.fulfill({
        json: {
          activity: 'PADEL',
          title: 'Pádel, falta uno',
          description: null,
          place: 'la Albufera',
          meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3964, longitude: -3.6297 },
          startsAt: startsAt.toISOString(),
          spots: 1,
          level: 'INTERMEDIATE',
          minParticipants: null,
          missing: [],
          warnings: [],
        },
      }),
  );
  await page.route(
    (url) => url.pathname === '/api/v1/plans' && url.search === '',
    (route) => {
      if (route.request().method() === 'POST') {
        published.push(route.request().url());
      }
      return route.continue();
    },
  );
  await page.goto('/plans/new');
  await signIn(page, ADMIN);
  await expect(page.locator('.plan-draft')).toBeVisible();

  await page.locator('#draft-text').fill('Pádel hoy en la Albufera, falta uno');
  await page.locator('.plan-draft__submit button').click();

  await expect(page.locator('.plan-draft__message')).toContainText(t('publish.draft.done'));
  await expect(page.locator('#title')).toHaveValue('Pádel, falta uno');
  await expect(page.locator('#placeName')).toHaveValue('Pistas de la Albufera');
  await expect(page.locator('.meeting-coordinates')).toContainText('40.3964');
  await expect(page.locator('#spots')).toHaveValue('1');
  expect(published).toEqual([]);
});

test('says that the assistant is not available and leaves the form to be filled in by hand', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  await page.route(
    (url) => url.pathname === '/api/v1/plans/draft',
    (route) =>
      route.fulfill({
        status: 503,
        contentType: 'application/problem+json',
        json: { status: 503, code: 'draft.unavailable' },
      }),
  );
  await page.goto('/plans/new');
  await signIn(page, ADMIN);

  await page.locator('#draft-text').fill('Pádel hoy en la Albufera, falta uno');
  await page.locator('.plan-draft__submit button').click();

  await expect(page.locator('.plan-draft__message')).toContainText(t('errors.draft.unavailable'));
  await expect(page.locator('#title')).toHaveValue('');
});
