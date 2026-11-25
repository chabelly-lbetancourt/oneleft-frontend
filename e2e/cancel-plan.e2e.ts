import { Route } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * The organizer cancels her plan from its page: she is asked first, told what it means (whoever joined is told and,
 * less than an hour before the start, it costs reputation) and then sees the plan cancelled without reloading. The plan
 * and its cancellation are answered in the browser, so the test creates nothing; only the sign-in goes to Keycloak.
 */
const PLAN_ID = '8a2d4f6b-1c3e-4a5b-9d7f-0e1a2b3c4d78';

/** The signed-in person, from the token the app sends */
const subjectOf = (route: Route): string => {
  const token = route.request().headers()['authorization']?.split(' ')[1] ?? '';
  const payload = token.split('.')[1] ?? '';
  return (JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub: string }).sub;
};

test('cancels my plan after confirming and shows it cancelled', async ({ openPage, t }) => {
  const page = await openPage();
  // Half an hour to the start: cancelling now costs reputation
  const startsAt = new Date(Date.now() + 30 * 60_000).toISOString();
  const calls: string[] = [];
  let cancelled = false;
  await page.route(
    (url) => url.pathname === `/api/v1/plans/${PLAN_ID}`,
    (route) => {
      const method = route.request().method();
      calls.push(method);
      if (method === 'DELETE') {
        cancelled = true;
        return route.fulfill({ status: 204 });
      }
      return route.fulfill({
        json: {
          id: PLAN_ID,
          organizerId: subjectOf(route),
          organizerName: 'Ana',
          activity: 'PADEL',
          title: 'Pádel 2 contra 2',
          description: null,
          meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3912, longitude: -3.6288 },
          startsAt,
          spots: 3,
          occupied: 2,
          freeSpots: 1,
          level: null,
          status: cancelled ? 'CANCELLED' : 'OPEN',
          publishedAt: new Date().toISOString(),
          participants: [],
          waitlist: [],
          arrivals: [],
        },
      });
    },
  );
  await page.route(
    (url) => url.pathname.startsWith(`/api/v1/plans/${PLAN_ID}/`),
    (route) => route.fulfill({ status: 204 }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();

  await page.goto(`/plans/${PLAN_ID}`);
  await page.getByRole('button', { name: t('plan.cancelPlan') }).click();

  const confirm = page.getByRole('group', { name: t('plan.cancelConfirmTitle') });
  await expect(confirm).toBeFocused();
  await expect(confirm).toContainText(t('plan.cancelConfirmNotify'));
  await expect(confirm).toContainText(t('plan.cancelConfirmLate').split('{{points}}')[0].trim());
  // Nothing is cancelled until it is confirmed
  expect(calls).not.toContain('DELETE');

  await confirm.getByRole('button', { name: t('plan.cancelYes') }).click();

  await expect(page.locator('.plan-state')).toHaveText(t('plan.status.CANCELLED'));
  await expect(page.getByRole('status').filter({ hasText: t('plan.cancelDone') })).toBeVisible();
  await expect(page.locator('.ended-hint')).toHaveText(t('plan.cancelledByYouHint'));
  await expect(page.getByRole('button', { name: t('plan.cancelPlan') })).toHaveCount(0);
  expect(calls.filter((method) => method === 'DELETE')).toHaveLength(1);
});
