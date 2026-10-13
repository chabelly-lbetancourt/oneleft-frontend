import { expect, signIn, test, ANA } from './support/fixtures';

/**
 * HU-009 in the web: the reputation service is answered in the browser, so the test needs no reputation service and
 * creates nothing. Only the sign-in goes to Keycloak.
 */
const REPUTATION = '/api/v1/reputation';

test('opens my reputation from the profile and explains why it went up or down', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  await page.route(
    (url) => url.pathname === `${REPUTATION}/me`,
    (route) => route.fulfill({ json: { userId: 'me', score: 5 } }),
  );
  await page.route(
    (url) => url.pathname === `${REPUTATION}/me/ledger`,
    (route) =>
      route.fulfill({
        json: {
          items: [
            {
              reason: 'NO_SHOW',
              points: -15,
              planId: 'p2',
              planTitle: 'Running por el Retiro',
              occurredAt: new Date().toISOString(),
            },
            {
              reason: 'ORGANIZED_HELD',
              points: 20,
              planId: 'p1',
              planTitle: 'Pádel 2 contra 2',
              occurredAt: new Date(Date.now() - 86_400_000).toISOString(),
            },
          ],
          page: 0,
          size: 20,
          total: 2,
        },
      }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();

  // The profile arrives with a short view transition: a click during it can be lost, so it is retried until it leads
  // to the reputation
  const link = page.getByRole('link', { name: new RegExp(t('profile.reputation')) });
  await expect(link).toContainText('5');
  await expect(async () => {
    await link.click();
    await expect(page).toHaveURL(/\/reputation$/, { timeout: 2000 });
  }).toPass();

  await expect(page.getByRole('heading', { name: t('reputation.score') })).toBeVisible();
  await expect(page.locator('.score-card__value')).toContainText('5');
  await expect(page.locator('.rule')).toHaveCount(5);
  const entries = page.locator('.entry');
  await expect(entries).toHaveCount(2);
  await expect(entries.first()).toContainText('Running por el Retiro');
  await expect(entries.first().locator('.points')).toHaveText('−15');
  await expect(entries.nth(1).getByRole('link')).toHaveAttribute('href', '/plans/p1');
});
