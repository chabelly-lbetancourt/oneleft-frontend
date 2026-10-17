import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * The menu at the bottom is only for the Android app (HU-072): the web keeps its header and the main action at the
 * bottom. Only the sign-in goes to Keycloak; the page reads the plans of Ana, and the test creates nothing.
 */
test('keeps the web without the menu of the Android app', async ({ openPage, t }) => {
  const page = await openPage();
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto('/');

  await expect(page.locator('.nearby-entry')).toBeVisible();
  await expect(page.locator('app-tab-bar nav')).toHaveCount(0);
  await expect(page.locator('app-bottom-bar')).toContainText(t('home.publish'));
  expect(
    await page.evaluate(() => document.documentElement.classList.contains('has-tab-bar')),
  ).toBe(false);
});
