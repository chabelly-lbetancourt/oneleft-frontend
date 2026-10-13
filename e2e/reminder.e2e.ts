import { ANA, expect, LUCIA, signIn, test, uniqueTitle } from './support/fixtures';

// HU-007: half an hour before a plan starts, everyone in it gets a reminder. The plans service checks the plans once a
// minute, so a plan that starts in 30 minutes and 15 seconds is reminded within about a minute and a half.
test('reminds whoever joined a plan that it is about to start', async ({
  openPage,
  publishPlan,
  participate,
  t,
}) => {
  test.setTimeout(180_000);
  const plan = await publishPlan(ANA, uniqueTitle('E2E reminder'), 2, 30 * 60 + 15);
  await participate(LUCIA, plan.id, 'POST');

  const lucia = await openPage();
  await lucia.goto('/profile');
  await signIn(lucia, LUCIA);
  await expect(lucia.locator('.profile-card')).toBeVisible();
  const stream = lucia.waitForRequest(/\/api\/v1\/plans\/events\/stream/);
  await lucia.goto('/');
  await stream;

  const reminder = lucia.locator('.join-notice').filter({ hasText: plan.title });
  await expect(reminder).toContainText(t('notices.reminderTitle'), { timeout: 150_000 });
  await reminder.click();
  await lucia.waitForURL(`**/plans/${plan.id}`);
  await expect(lucia.locator('.plan-card')).toContainText(plan.title);
});
