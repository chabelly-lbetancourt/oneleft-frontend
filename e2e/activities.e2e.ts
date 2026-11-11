import { Page } from '@playwright/test';
import { ADMIN, expect, signIn, test } from './support/fixtures';

/**
 * HU-068 in the web: the plans service is answered in the browser, so the test creates nothing (plans cannot be
 * deleted). It publishes a plan of a new activity and of «other», checks what is sent, and finds the plan again by
 * filtering nearby plans by category. Only the sign-in goes to Keycloak.
 */
const PLAN_ID = '8d0c2f5e-7a1b-4c3d-9e2f-1a2b3c4d5e6f';

const fakePlan = (activity: string, activityOther: string | null, title: string) => ({
  id: PLAN_ID,
  organizerId: '5b0f7c2e-8d4a-4f3b-9c61-2e7a9d4b8f10',
  organizerName: 'Lucía',
  activity,
  activityOther,
  title,
  description: null,
  meetingPoint: { name: 'Estudio de yoga', latitude: 40.3912, longitude: -3.6287 },
  startsAt: new Date(Date.now() + 70 * 60_000).toISOString(),
  endsAt: new Date(Date.now() + 250 * 60_000).toISOString(),
  spots: 2,
  occupied: 0,
  freeSpots: 2,
  level: null,
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
  participants: [],
  waitlist: [],
  minimum: null,
  arrivals: [],
});

/** Answers the places, the publication and the plan; returns what was sent to publish. */
const mockPlans = async (
  page: Page,
  activity: string,
  activityOther: string | null,
  title: string,
) => {
  const sent: Record<string, unknown>[] = [];
  await page.route(
    (url) => url.pathname === '/api/v1/places',
    (route) => route.fulfill({ json: [] }),
  );
  await page.route(
    (url) => url.pathname === '/api/v1/plans',
    (route) => {
      if (route.request().method() !== 'POST') {
        return route.continue();
      }
      sent.push(route.request().postDataJSON());
      return route.fulfill({
        status: 201,
        json: fakePlan(activity, activityOther, title),
        headers: { Location: `/api/v1/plans/${PLAN_ID}` },
      });
    },
  );
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) => route.fulfill({ json: fakePlan(activity, activityOther, title) }),
  );
  return sent;
};

const fillAndPublish = async (
  page: Page,
  activity: string,
  title: string,
  t: (key: string) => string,
) => {
  await page.locator('p-select').click();
  // «Other» is also the name of a category: the activity is the last option with that name
  await page.getByRole('option', { name: activity, exact: true }).last().click();
  return async (otherName?: string) => {
    if (otherName) {
      await page.locator('#activityOther').fill(otherName);
    }
    await page.locator('#title').fill(title);
    await page.locator(`p-togglebutton[aria-label="${t('publish.in120')}"]`).click();
    await page.locator('#placeName').fill(t('publish.wherePlaceholder'));
    await page.getByRole('button', { name: t('publish.here') }).click();
    await expect(page.locator('.meeting-coordinates')).toBeVisible();
    await page.getByRole('button', { name: t('publish.submit') }).click();
  };
};

test('publishes a plan of a new activity, groups the selector by category and finds the plan by category', async ({
  openPage,
  t,
}) => {
  const title = 'E2E yoga al aire libre';
  const page = await openPage();
  const sent = await mockPlans(page, 'YOGA', null, title);
  await page.goto('/plans/new');
  await signIn(page, ADMIN);
  await expect(page.locator('.publish-form')).toBeVisible();

  // The selector is grouped by category, with the new activities among theirs
  await page.locator('p-select').click();
  for (const category of ['SPORT', 'CULTURE', 'LEISURE', 'FOOD_DRINK', 'OTHER']) {
    await expect(
      page.getByText(t(`categories.${category}`), { exact: true }).first(),
    ).toBeVisible();
  }
  await page.keyboard.press('Escape');

  const publish = await fillAndPublish(page, t('activities.YOGA'), title, t);
  await publish();

  expect(sent).toHaveLength(1);
  expect(sent[0]).toMatchObject({ activity: 'YOGA', activityOther: null, title });
  await expect(page).toHaveURL(new RegExp(`/plans/${PLAN_ID}`));
  await expect(page.locator('.plan-card')).toContainText(t('activities.YOGA'));

  // Filtering by the category finds the plan; the plans of another category do not
  await page.route(
    (url) => url.pathname === '/api/v1/plans/nearby',
    (route) => {
      const categories = new URL(route.request().url()).searchParams.getAll('category');
      const found = categories.includes('SPORT');
      return route.fulfill({
        json: found ? [{ plan: fakePlan('YOGA', null, title), distanceMeters: 300 }] : [],
      });
    },
  );
  await page.goto('/plans/nearby');
  await expect(page.locator('.nearby-card', { hasText: title })).toHaveCount(0);
  await page
    .locator(`.category-filter p-togglebutton[aria-label="${t('categories.SPORT')}"]`)
    .click();
  await expect(page.locator('.nearby-card', { hasText: title })).toBeVisible();
  await expect(page.locator('.nearby-card', { hasText: title })).toContainText(
    t('activities.YOGA'),
  );
});

test('publishes a plan of «other» with a name of its own, shown in the plan', async ({
  openPage,
  t,
}) => {
  const title = 'E2E taller de cerámica';
  const name = 'Taller de cerámica';
  const page = await openPage();
  const sent = await mockPlans(page, 'OTHER', name, title);
  await page.goto('/plans/new');
  await signIn(page, ADMIN);
  await expect(page.locator('.publish-form')).toBeVisible();

  const publish = await fillAndPublish(page, t('activities.OTHER'), title, t);
  // The name is asked for only now, and it is required
  await expect(page.locator('#activityOther')).toBeVisible();
  await publish(name);

  expect(sent[0]).toMatchObject({ activity: 'OTHER', activityOther: name, title });
  await expect(page).toHaveURL(new RegExp(`/plans/${PLAN_ID}`));
  await expect(page.locator('.plan-card')).toContainText(name);
});
