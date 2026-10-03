import { expect, test } from './support/fixtures';

// HU-032: the dark theme follows the system and a choice made by hand is remembered
test('switches to the dark theme and remembers it', async ({ openPage }) => {
  const page = await openPage();
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/app-dark/);

  await page.locator('.theme-switcher button').click();
  await expect(html).toHaveClass(/app-dark/);

  await page.reload();
  await expect(html).toHaveClass(/app-dark/);

  // Back to light by hand: it no longer follows a dark system
  await page.locator('.theme-switcher button').click();
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload();
  await expect(html).not.toHaveClass(/app-dark/);
});
