import { ANA, expect, signIn, test } from './support/fixtures';

test('signs in with Keycloak, keeps the session after a reload and signs out', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  await page.goto('/');

  await page.getByRole('button', { name: t('auth.login') }).click();
  await signIn(page, ANA);
  await expect(page.locator('.user-menu')).toBeVisible();

  await page.locator('.user-menu').click();
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.reload();
  await expect(page.locator('.profile-card')).toBeVisible();

  await page.locator('.logout-button button').click();
  await expect(page.getByRole('button', { name: t('auth.login') })).toBeVisible();
});
