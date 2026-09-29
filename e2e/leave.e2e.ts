import { ADMIN, ANA, expect, signIn, test, uniqueTitle } from './support/fixtures';

test('leaves a plan after confirming and the organizer is told in real time', async ({
  openPage,
  publishPlan,
  t,
}) => {
  const plan = await publishPlan(ANA, uniqueTitle('E2E leave'));

  const organizer = await openPage();
  await organizer.goto('/profile');
  await signIn(organizer, ANA);
  await expect(organizer.locator('.profile-card')).toBeVisible();
  const stream = organizer.waitForRequest(/\/api\/v1\/plans\/events\/stream/);
  await organizer.goto('/');
  await stream;

  const participant = await openPage();
  await participant.goto(`/plans/${plan.id}`);
  await signIn(participant, ADMIN);
  await participant.locator('.join-button button').click();
  await expect(participant.locator('.joined-message')).toBeVisible();

  await participant.locator('.leave-button button').click();
  await expect(participant.locator('.leave-confirm')).toContainText(t('plan.leaveConfirm'));
  await participant.locator('.leave-yes button').click();
  await expect(participant.locator('.left-message')).toBeVisible();
  // The spot is free again: the plan can be joined
  await expect(participant.locator('.join-button')).toBeVisible();

  await expect(
    organizer.locator('.join-notice').filter({ hasText: t('notices.leftTitle') }),
  ).toBeVisible();
});
