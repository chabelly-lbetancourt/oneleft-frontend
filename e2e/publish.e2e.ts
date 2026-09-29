import { ADMIN, expect, signIn, test, uniqueTitle } from './support/fixtures';

test('publishes a plan and finds it in its page and on the home screen', async ({
  openPage,
  t,
}) => {
  const title = uniqueTitle('E2E publish');
  const page = await openPage();
  await page.goto('/plans/new');
  await signIn(page, ADMIN);
  await expect(page.locator('.publish-form')).toBeVisible();

  await page.locator('p-select').click();
  await page.getByRole('option', { name: t('activities.PADEL') }).click();
  await page.locator('#title').fill(title);
  await page.locator(`p-togglebutton[aria-label="${t('publish.in120')}"]`).click();
  await page.locator('#placeName').fill(t('publish.wherePlaceholder'));
  await page.getByRole('button', { name: t('publish.here') }).click();
  await expect(page.locator('.meeting-coordinates')).toBeVisible();
  await page.getByRole('button', { name: t('publish.submit') }).click();

  await expect(page).toHaveURL(/\/plans\/[0-9a-f-]{36}/);
  await expect(page.locator('.plan-card')).toContainText(title);

  await page.goto('/');
  await expect(page.locator('.my-plan', { hasText: title })).toBeVisible();
});
