import { Page } from '@playwright/test';
import { ADMIN, expect, signIn, test } from './support/fixtures';

/**
 * HU-070 in the web: the plans and the demographics are answered in the browser, so the test creates nothing (plans cannot
 * be deleted and nobody should keep a date of birth). A person sets their date of birth and gender in the profile, and a
 * plan only for women of 25 to 40 is offered to someone who fits and not to someone who does not. Only the sign-in goes
 * to Keycloak.
 */
const PLAN_ID = '8d2b6e41-0c53-4a97-b1f8-3e5a7c9d2b64';
const OTHER = '5b0f7c2e-8d4a-4f3b-9c61-2e7a9d4b8f10';

const plan = () => ({
  id: PLAN_ID,
  organizerId: OTHER,
  organizerName: 'Ana',
  activity: 'YOGA',
  activityOther: null,
  title: 'E2E yoga para mujeres',
  description: null,
  meetingPoint: { name: 'Estudio', latitude: 40.3912, longitude: -3.6287 },
  startsAt: new Date(Date.now() + 70 * 60_000).toISOString(),
  endsAt: new Date(Date.now() + 250 * 60_000).toISOString(),
  spots: 3,
  occupied: 1,
  freeSpots: 2,
  level: null,
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
  participants: [],
  waitlist: [],
  minimum: null,
  arrivals: [],
  requiresApproval: false,
  myRequest: null,
  audience: { gender: 'WOMAN', minAge: 25, maxAge: 40 },
});

const birthYearsAgo = (years: number) => `${new Date().getFullYear() - years}-01-01`;

/** Answers the demographics of the person: 404 until they set them, then what they sent. */
const mockDemographics = async (page: Page, initial: object | null) => {
  let stored = initial;
  const saved: Record<string, unknown>[] = [];
  await page.route(
    (url) => url.pathname === '/api/v1/users/me/demographics',
    (route) => {
      if (route.request().method() === 'PUT') {
        const body = route.request().postDataJSON() as { birthDate: string; gender: string };
        saved.push(body);
        stored = { ...body, ageBand: { from: 25, to: 34, label: '25–34' }, changesLeft: 2 };
        return route.fulfill({ json: stored });
      }
      return stored ? route.fulfill({ json: stored }) : route.fulfill({ status: 404, json: {} });
    },
  );
  return saved;
};

const mockPlan = (page: Page) =>
  page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) => route.fulfill({ json: plan() }),
  );

test('sets the date of birth and gender in the profile', async ({ openPage }) => {
  const page = await openPage();
  const saved = await mockDemographics(page, null);
  await page.goto('/profile');
  await signIn(page, ADMIN);
  await expect(page.locator('.demographics')).toBeVisible();

  await page.locator('#birth-date').fill(birthYearsAgo(30));
  await page.locator('#gender').click();
  await page.getByRole('option').first().click();
  await page.locator('.demographics__save button').click();

  await expect(page.locator('.demographics__done')).toBeVisible();
  await expect(page.locator('.demographics__band')).toContainText('25–34');
  expect(saved).toHaveLength(1);
  expect(saved[0]['birthDate']).toBe(birthYearsAgo(30));
});

test('offers the plan to who fits its audience', async ({ openPage }) => {
  const page = await openPage();
  await mockPlan(page);
  await mockDemographics(page, {
    birthDate: birthYearsAgo(30),
    gender: 'WOMAN',
    ageBand: { from: 25, to: 34, label: '25–34' },
    changesLeft: 2,
  });
  await page.goto('/profile');
  await signIn(page, ADMIN);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto(`/plans/${PLAN_ID}`);

  await expect(page.locator('.plan-card__audience')).toBeVisible();
  await expect(page.locator('.join-button')).toBeVisible();
  await expect(page.locator('.audience-mismatch')).toHaveCount(0);
});

test('does not offer the plan to who does not fit its audience', async ({ openPage }) => {
  const page = await openPage();
  await mockPlan(page);
  await mockDemographics(page, {
    birthDate: birthYearsAgo(30),
    gender: 'MAN',
    ageBand: { from: 25, to: 34, label: '25–34' },
    changesLeft: 2,
  });
  await page.goto('/profile');
  await signIn(page, ADMIN);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto(`/plans/${PLAN_ID}`);

  await expect(page.locator('.audience-mismatch')).toBeVisible();
  await expect(page.locator('.join-button')).toHaveCount(0);
});
