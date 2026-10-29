import { readFileSync } from 'node:fs';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-045 in the web: the users service is answered in the browser, so the test deletes no account for real and
 * creates nothing. It accepts the privacy text, downloads «my data» and deletes the account after typing the word.
 * Only the sign-in goes to Keycloak.
 */
const USERS = '/api/v1/users/me';

test('accepts the privacy text, downloads my data and deletes my account after typing the word', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  let accepted = false;
  const requests: string[] = [];
  const consent = () => ({
    accepted,
    acceptedVersion: accepted ? '2026-10-25' : null,
    acceptedAt: accepted ? new Date().toISOString() : null,
    currentVersion: '2026-10-25',
  });
  await page.route(
    (url) => url.pathname === `${USERS}/consent`,
    (route) => {
      requests.push(route.request().method());
      accepted = accepted || route.request().method() === 'PUT';
      return route.fulfill({ json: consent() });
    },
  );
  await page.route(
    (url) => url.pathname === `${USERS}/data`,
    (route) =>
      route.fulfill({
        json: {
          exportedAt: new Date().toISOString(),
          account: { name: 'Ana' },
          users: {},
          plans: {},
        },
        headers: { 'Content-Disposition': 'attachment; filename="oneleft-my-data.json"' },
      }),
  );
  await page.route(
    (url) => url.pathname === `${USERS}/account`,
    (route) => {
      requests.push(`${route.request().method()} account`);
      return route.fulfill({ status: 204 });
    },
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();

  // The home page asks for the consent until it is given
  await page.goto('/');
  await expect(page.locator('.consent-card')).toBeVisible();
  await page.locator('.consent-accept button').click();
  await expect(page.locator('.consent-card')).toHaveCount(0);

  // «Mis datos», from the avatar menu
  await page.locator('button.user-menu').click();
  await page.getByRole('menuitem', { name: t('userMenu.account') }).click();
  await expect(page).toHaveURL(/\/account$/);
  await expect(page.locator('.consent-status')).toContainText(t('account.accepted').split('{{')[0]);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.account-download button').click(),
  ]);
  expect(download.suggestedFilename()).toBe('oneleft-my-data.json');
  expect(JSON.parse(readFileSync(await download.path(), 'utf8'))).toMatchObject({
    account: { name: 'Ana' },
  });

  // Deleting needs the word, and it signs me out
  const remove = page.locator('.account-delete button');
  await expect(remove).toBeDisabled();
  await page.locator('.delete-confirmation').fill(t('account.deleteWord'));
  await expect(remove).toBeEnabled();
  await remove.click();

  await expect(page).not.toHaveURL(/\/account$/);
  // Accepted once, and the account deleted once
  expect(requests.filter((request) => request !== 'GET')).toEqual(['PUT', 'DELETE account']);
});

test('shows the privacy text without a session', async ({ openPage, t }) => {
  const page = await openPage();

  await page.goto('/privacy');

  await expect(
    page.getByRole('heading', { name: t('privacy.sections.rights.title') }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: t('privacy.sections.data.title') })).toBeVisible();
});
