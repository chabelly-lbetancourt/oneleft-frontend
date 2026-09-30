import { ADMIN, ANA, expect, LUCIA, signIn, test, uniqueTitle } from './support/fixtures';

// Lucía has the notices on around Vallecas (seed of the notifications service). Each person gets at most 20 notices a
// day: to run the tests many times in a day against the same stack, empty the notifications database first
// (oneleft-infra/docker/postgres/reset-service-database.sh notifications).

test('a plan published nearby reaches whoever asked for it, and opens it', async ({
  openPage,
  publishPlan,
  t,
}) => {
  const lucia = await openPage();
  await lucia.goto('/profile');
  await signIn(lucia, LUCIA);
  await expect(lucia.locator('.profile-card')).toBeVisible();
  const stream = lucia.waitForRequest(/\/api\/v1\/plans\/events\/stream/);
  await lucia.goto('/');
  await stream;

  const plan = await publishPlan(ANA, uniqueTitle('E2E nearby'));

  const notice = lucia.locator('.join-notice').filter({ hasText: plan.title });
  await expect(notice).toContainText(t('notices.nearbyTitle'));
  await notice.click();
  await lucia.waitForURL(`**/plans/${plan.id}`);
  await expect(lucia.locator('.plan-card')).toContainText(plan.title);
});

test('chooses the notices: zone, activities and quiet hours', async ({ openPage, t }) => {
  const page = await openPage();
  await page.goto('/notifications');
  await signIn(page, ADMIN);
  await expect(page.locator('.notifications-form')).toBeVisible();

  if (!(await page.locator('#enabled').isChecked())) {
    await page.locator('.enable-switch').click();
  }
  await page.locator('.use-location button').click();
  await expect(page.locator('.zone-coordinates')).toContainText('40.39');
  const padel = page.locator('.activity-chip').filter({ hasText: t('activities.PADEL') });
  if ((await padel.getAttribute('aria-pressed')) !== 'true') {
    await padel.click();
  }
  const quiet = page.locator('#quiet');
  if (await quiet.isChecked()) {
    await page.locator('.quiet-switch').click();
  }
  await page.locator('.save-button button').click();
  await expect(page.locator('.status-message')).toContainText(t('notifications.saved'));

  await page.reload();
  await expect(padel).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.zone-coordinates')).toContainText('40.39');
  await expect(page.locator('#enabled')).toBeChecked();
  await expect(page.locator('.quiet-hours')).toHaveCount(0);
  await expect(page.locator('.push-card')).toBeVisible();
});
