import { ADMIN, ANA, expect, signIn, test, uniqueTitle } from './support/fixtures';

test('lists the nearby plans, shows them on the map and announces new ones in real time', async ({
  openPage,
  publishPlan,
  t,
}) => {
  const existing = await publishPlan(ANA, uniqueTitle('E2E nearby'));
  const page = await openPage();
  await page.goto('/plans/nearby');
  await signIn(page, ADMIN);

  await expect(page.locator('.nearby-card', { hasText: existing.title })).toBeVisible();

  await page.locator(`.view-switch p-togglebutton[aria-label="${t('nearby.map')}"]`).click();
  await expect(page.locator('.leaflet-container')).toBeVisible();
  await page.locator(`.view-switch p-togglebutton[aria-label="${t('nearby.list')}"]`).click();

  // A plan published while the page is open arrives through Server-Sent Events
  await publishPlan(ANA, uniqueTitle('E2E real time'));
  await expect(page.locator('.new-plan-message')).toBeVisible();
});
