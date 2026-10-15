import { Page } from '@playwright/test';
import { ANA, expect, signIn, test } from './support/fixtures';

/**
 * HU-048 in the web: the social profile of Diego, built from the users, social, reputation and plans services, all
 * answered in the browser, so the test creates nothing. Only the sign-in goes to Keycloak.
 */
const DIEGO = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0002';
const MARTA = '5d1c7c2e-2f0b-4d6e-9a43-0c1e7a9b0003';

/** Diego as the services see him; whether his plans and network may be seen is said by the social service */
const diego = async (page: Page, activityVisible: boolean) => {
  await page.route(
    (url) => url.pathname === `/api/v1/social/people/${DIEGO}`,
    (route) =>
      route.fulfill({
        json: {
          userId: DIEGO,
          name: 'Diego',
          visibility: 'PRIVATE',
          followers: 1,
          following: 0,
          relation: activityVisible ? 'FOLLOWING' : 'NONE',
          followsMe: false,
          activityVisible,
        },
      }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/users/${DIEGO}/profile`,
    (route) =>
      route.fulfill({
        json: {
          userId: DIEGO,
          displayName: 'Diego',
          bio: 'Fútbol los jueves y rutas en bici el fin de semana.',
          zoneName: 'Vallecas',
          hobbies: [
            { activity: 'FOOTBALL', level: 'ADVANCED' },
            { activity: 'CYCLING', level: 'INTERMEDIATE' },
          ],
        },
      }),
  );
  await page.route(
    (url) => url.pathname.startsWith('/api/v1/reputation/people/'),
    (route) =>
      route.fulfill({
        json: route.request().url().endsWith('/stats')
          ? { userId: DIEGO, plansCompleted: 12, plansOrganized: 4, activities: 3 }
          : route.request().url().endsWith('/badges')
            ? []
            : { userId: DIEGO, score: 45 },
      }),
  );
  await page.route(
    (url) => url.pathname === '/api/v1/users/photos',
    (route) => route.fulfill({ json: [] }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/plans/people/${DIEGO}/recent`,
    (route) =>
      route.fulfill({
        json: [
          {
            planId: 'p1',
            title: 'Pachanga 7 contra 7',
            activity: 'FOOTBALL',
            startsAt: new Date(Date.now() - 86_400_000).toISOString(),
            role: 'ORGANIZER',
          },
        ],
      }),
  );
  await page.route(
    (url) => url.pathname === `/api/v1/social/people/${DIEGO}/followers`,
    (route) =>
      route.fulfill({
        json: {
          items: [
            { userId: MARTA, name: 'Marta', status: 'ACCEPTED', since: new Date().toISOString() },
          ],
          page: 0,
          size: 20,
          total: 1,
        },
      }),
  );
  await page.goto('/profile');
  await signIn(page, ANA);
  await expect(page.locator('.profile-card')).toBeVisible();
  await page.goto(`/people/${DIEGO}`);
};

test('shows the social profile of someone I follow: bio, hobbies, statistics, plans and network', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  await diego(page, true);

  await expect(page.locator('.person-bio')).toHaveText(
    'Fútbol los jueves y rutas en bici el fin de semana.',
  );
  await expect(page.locator('.hobby-chip')).toHaveCount(2);
  await expect(page.locator('.hobby-chip').first()).toContainText(t('activities.FOOTBALL'));
  await expect(page.locator('.stats-completed')).toHaveText('12');
  await expect(page.locator('.stats-organized')).toHaveText('4');
  await expect(page.locator('.recent-plan')).toContainText('Pachanga 7 contra 7');
  await expect(page.locator('.recent-plan__role')).toContainText(t('social.organized'));

  await page.locator('.person-followers-tab').click();
  await expect(page.locator('.person-connection')).toContainText('Marta');
  await expect(page.locator('.person-connection')).toHaveAttribute('href', `/people/${MARTA}`);
});

test('keeps the plans and the network of a private profile I do not follow', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  await diego(page, false);

  await expect(page.locator('.person-bio')).toBeVisible();
  await expect(page.locator('.stats-completed')).toHaveText('12');
  await expect(page.locator('.private-activity')).toContainText(
    t('social.privateActivity').replace('{{name}}', 'Diego'),
  );
  await expect(page.locator('.activity-tabs')).toHaveCount(0);
});
