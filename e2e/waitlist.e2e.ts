import { ADMIN, ANA, expect, LUCIA, signIn, test, uniqueTitle } from './support/fixtures';

test('waits for a spot of a full plan and gets it when someone leaves', async ({
  openPage,
  publishPlan,
  participate,
  t,
}) => {
  const plan = await publishPlan(ANA, uniqueTitle('E2E waitlist'), 1);
  await participate(LUCIA, plan.id, 'POST');

  const page = await openPage();
  await page.goto(`/plans/${plan.id}`);
  // The plan page is public (HU-024): joining asks to sign in and comes back
  await page.locator('.waitlist-join button').click();
  const stream = page.waitForRequest(/\/api\/v1\/plans\/events\/stream/);
  await signIn(page, ADMIN);
  await stream;
  await expect(page.locator('.full-tag')).toBeVisible();

  await page.locator('.waitlist-join button').click();
  await expect(page.locator('.waiting-message')).toContainText(
    t('plan.waiting').replace('{{position}}', '1'),
  );

  // Lucía cannot go: the spot goes to the first person waiting, who is told at once
  await participate(LUCIA, plan.id, 'DELETE');
  await expect(
    page.locator('.join-notice').filter({ hasText: t('notices.spotTitle') }),
  ).toBeVisible();
  await expect(page.locator('.joined-message')).toBeVisible();
});
