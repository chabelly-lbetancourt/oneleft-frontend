import { expect, LUCIA, signIn, test, uniqueTitle } from './support/fixtures';

test('saves an alert from the notices page, lists it and deletes it', async ({ openPage, t }) => {
  const name = uniqueTitle('E2E alerta').slice(0, 40);
  const page = await openPage();
  await page.goto('/notifications');
  await signIn(page, LUCIA);
  await page.locator('.alerts-link').click();
  await expect(page).toHaveURL(/\/notifications\/alerts$/);

  await page.locator('.new-alert button').click();
  await page.locator('#alertName').fill(name);
  await page.getByRole('button', { name: t('activities.PADEL'), exact: true }).click();
  // The zone of the device (the browser of the test has its location granted)
  await page.locator('.use-location button').click();
  await expect(page.locator('.zone-coordinates')).toBeVisible();
  await page.locator('.save-alert button').click();

  const alert = page.locator('.saved-alert', { hasText: name });
  await expect(alert).toBeVisible();
  await expect(alert).toContainText(t('activities.PADEL'));

  // The test leaves no data behind
  await alert.locator('.delete-alert button').click();
  await expect(page.locator('.saved-alert', { hasText: name })).toHaveCount(0);
});
