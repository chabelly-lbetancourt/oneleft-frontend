import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-073: signed in, the avatar of the header opens the menu of the account and the settings. The theme and the
 * language are changed there and kept in the browser; the test creates nothing. Only the sign-in goes to Keycloak.
 */
test('changes the theme and the language from the menu of my avatar', async ({
  openPage,
  t,
  lang,
}) => {
  const page = await openPage();
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto('/');

  const avatar = page.locator('button.user-menu');
  await expect(page.locator('app-header app-theme-switcher')).toHaveCount(0);
  await expect(avatar).toHaveAttribute('aria-expanded', 'false');

  await avatar.click();
  await expect(avatar).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('menuitem', { name: t('userMenu.darkTheme') }).click();
  await expect(page.locator('html')).toHaveClass(/app-dark/);

  await avatar.click();
  await page.getByRole('menuitem', { name: t('userMenu.lightTheme') }).click();
  await expect(page.locator('html')).not.toHaveClass(/app-dark/);

  const other = lang === 'es' ? 'en' : 'es';
  await avatar.click();
  await page.getByRole('menuitem', { name: t(`app.languages.${other}`) }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', other);

  // Escape closes the menu
  await avatar.click();
  await expect(page.getByRole('menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(avatar).toHaveAttribute('aria-expanded', 'false');
});
