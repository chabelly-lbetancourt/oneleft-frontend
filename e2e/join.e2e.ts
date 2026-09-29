import { ADMIN, ANA, expect, signIn, test, uniqueTitle } from './support/fixtures';

test('joins a plan and the organizer is told in real time', async ({ openPage, publishPlan }) => {
  const plan = await publishPlan(ANA, uniqueTitle('E2E join'));

  // The organizer has the app open: the personal event stream is connected
  const organizer = await openPage();
  await organizer.goto('/profile');
  await signIn(organizer, ANA);
  await expect(organizer.locator('.profile-card')).toBeVisible();
  const stream = organizer.waitForRequest(/\/api\/v1\/plans\/events\/stream/);
  await organizer.goto('/');
  await stream;

  const joiner = await openPage();
  await joiner.goto(`/plans/${plan.id}`);
  await signIn(joiner, ADMIN);
  await joiner.locator('.join-button button').click();
  await expect(joiner.locator('.joined-message')).toBeVisible();
  await expect(joiner.locator('.participant')).not.toHaveCount(0);

  await expect(organizer.locator('.join-notice')).toBeVisible();
});
