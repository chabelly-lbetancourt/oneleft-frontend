import { expect, LUCIA, signIn, test } from './support/fixtures';

test("says «I'm free now» from the home screen and turns it off again", async ({ openPage, t }) => {
  const page = await openPage();
  await page.goto('/profile');
  await signIn(page, LUCIA);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto('/');

  await page.locator('.start-free button').click();
  await page.locator('.confirm-free button').click();
  await expect(page.locator('.free-now--on')).toContainText(
    t('freeNow.on').split('{{time}}')[0].trim(),
  );

  // The test leaves no free mode behind
  await page.locator('.stop-free button').click();
  await expect(page.locator('.start-free')).toBeVisible();
});
