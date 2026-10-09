import { ADMIN, ANA, expect, signIn, test, uniqueTitle } from './support/fixtures';

test('joins a plan, the organizer is told in real time, and hears that the newcomer is on the way', async ({
  openPage,
  publishPlan,
  t,
}) => {
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
  // The plan page is public (HU-024): joining asks to sign in and comes back
  await joiner.locator('.guest-join button').click();
  await signIn(joiner, ADMIN);
  await joiner.locator('.join-button button').click();
  await expect(joiner.locator('.joined-message')).toBeVisible();
  await expect(joiner.locator('.participant')).not.toHaveCount(0);

  await expect(organizer.locator('.join-notice')).toBeVisible();

  // HU-040: the newcomer says they are on the way and the organizer hears it (same plan, no new data)
  await joiner.locator('.on-the-way button').click();
  await expect(joiner.locator('.arrival')).toBeVisible();
  await expect(
    organizer.locator('.join-notice', { hasText: t('notices.arrivalTitle') }),
  ).toBeVisible();
});
