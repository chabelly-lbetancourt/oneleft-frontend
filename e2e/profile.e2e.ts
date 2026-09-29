import { ADMIN, expect, signIn, test } from './support/fixtures';

test('saves the profile with the zone taken from the device location', async ({ openPage, t }) => {
  const page = await openPage();
  await page.goto('/profile');
  await signIn(page, ADMIN);
  await expect(page.locator('.profile-form')).toBeVisible();

  await page.locator('#displayName').fill('Admin');
  await page.getByRole('button', { name: t('profile.useLocation') }).click();
  await expect(page.locator('.zone-coordinates')).toBeVisible();
  await page.locator('#zoneName').fill('Vallecas');
  await page.getByRole('button', { name: t('profile.save') }).click();

  await expect(page.locator('.status-message')).toHaveText(t('profile.saved'));
});
