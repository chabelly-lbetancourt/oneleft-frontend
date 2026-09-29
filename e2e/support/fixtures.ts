import {
  APIRequestContext,
  BrowserContext,
  BrowserContextOptions,
  Page,
  test as base,
  expect,
} from '@playwright/test';
import { readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

export type Lang = 'es' | 'en';

export interface E2eOptions {
  lang: Lang;
}

export interface TestUser {
  username: string;
  password: string;
}

interface Realm {
  users: { username: string; credentials: { value: string }[] }[];
  clients: { clientId: string; secret?: string }[];
}

export interface PublishedPlan {
  id: string;
  title: string;
}

const API_URL = process.env['ONELEFT_API_URL'] ?? 'http://localhost:8080';
const KEYCLOAK_URL = process.env['ONELEFT_KEYCLOAK_URL'] ?? 'http://localhost:8180/realms/oneleft';

// Test users and the API client come from the development realm of oneleft-infra (never from a real environment)
const realm: Realm = JSON.parse(
  readFileSync(
    process.env['ONELEFT_REALM'] ??
      join(__dirname, '../../../oneleft-infra/docker/keycloak/oneleft-realm.json'),
    'utf8',
  ),
);
const realmUser = (username: string): TestUser => {
  const user = realm.users.find((candidate) => candidate.username === username);
  if (!user) {
    throw new Error(`User ${username} is not in the development realm`);
  }
  return { username, password: user.credentials[0].value };
};

export const ANA = realmUser('ana@oneleft.dev');
export const ADMIN = realmUser('admin@oneleft.dev');

/** Where the device is (Vallecas, Madrid): the plans of the tests are published around it. */
export const POSITION = { latitude: 40.391234, longitude: -3.628765 };

const translations = (lang: Lang) =>
  JSON.parse(readFileSync(join(__dirname, `../../public/i18n/${lang}.json`), 'utf8'));

interface Fixtures {
  /** Translated text of a key in the language of the project, for example t('auth.login'). */
  t: (key: string) => string;
  /** A new mobile browser (its own session) with the app language chosen and the device location granted. */
  openPage: () => Promise<Page>;
  /** Publishes a plan through the gateway as a user, 70 minutes from now and about 600 m from the device. */
  publishPlan: (user: TestUser, title: string) => Promise<PublishedPlan>;
}

export const test = base.extend<E2eOptions & Fixtures>({
  lang: ['es', { option: true }],

  t: async ({ lang }, use) => {
    const texts = translations(lang);
    await use((key) => {
      const value = key.split('.').reduce((node, part) => node?.[part], texts);
      if (typeof value !== 'string') {
        throw new Error(`Missing translation: ${key}`);
      }
      return value;
    });
  },

  openPage: async (
    { browser, lang, viewport, userAgent, isMobile, hasTouch, deviceScaleFactor, baseURL },
    use,
    testInfo,
  ) => {
    const videos = testInfo.outputPath('videos');
    const options: BrowserContextOptions = {
      viewport,
      userAgent,
      isMobile,
      hasTouch,
      deviceScaleFactor,
      baseURL,
      locale: lang,
      geolocation: { ...POSITION, accuracy: 10 },
      permissions: ['geolocation'],
      recordVideo: { dir: videos },
    };
    const contexts: BrowserContext[] = [];
    await use(async () => {
      const context = await browser.newContext(options);
      await context.addInitScript(
        (language) => localStorage.setItem('oneleft.language', language),
        lang,
      );
      contexts.push(context);
      return context.newPage();
    });
    const failed = testInfo.status !== testInfo.expectedStatus;
    for (const [index, context] of contexts.entries()) {
      const video = context.pages()[0]?.video();
      await context.close();
      if (failed && video) {
        await testInfo.attach(`video-${index + 1}`, {
          path: await video.path(),
          contentType: 'video/webm',
        });
      }
    }
    if (!failed) {
      rmSync(videos, { recursive: true, force: true });
    }
  },

  publishPlan: async ({ request }, use) => {
    await use((user, title) => publish(request, user, title));
  },
});

export { expect };

/**
 * Signs in from the OneLeft login page (or directly in Keycloak if the app already sent the user there): chooses
 * "continue with email", fills the Keycloak form and waits to be back in OneLeft.
 */
export const signIn = async (page: Page, user: TestUser) => {
  const withEmail = page.locator('.email-login button');
  const keycloakForm = page.locator('#username');
  await expect(withEmail.or(keycloakForm)).toBeVisible();
  if (await withEmail.isVisible()) {
    await withEmail.click();
  }
  await keycloakForm.fill(user.username);
  // Set in the page instead of fill(), so the password never appears in the steps of the report or the trace
  await page
    .locator('#password')
    .evaluate((input: HTMLInputElement, value) => (input.value = value), user.password);
  await page.locator('#kc-login').click();
  await page.waitForURL((url) => url.port === '4200' && !url.searchParams.has('code'));
};

const token = async (request: APIRequestContext, user: TestUser) => {
  const apiClient = realm.clients.find((client) => client.clientId === 'oneleft-api');
  const response = await request.post(`${KEYCLOAK_URL}/protocol/openid-connect/token`, {
    form: {
      grant_type: 'password',
      client_id: 'oneleft-api',
      client_secret: apiClient?.secret ?? '',
      username: user.username,
      password: user.password,
    },
  });
  expect(response.ok()).toBeTruthy();
  return (await response.json()).access_token as string;
};

const publish = async (
  request: APIRequestContext,
  user: TestUser,
  title: string,
): Promise<PublishedPlan> => {
  const response = await request.post(`${API_URL}/api/v1/plans`, {
    headers: { Authorization: `Bearer ${await token(request, user)}` },
    data: {
      activity: 'PADEL',
      title,
      meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3964, longitude: -3.6297 },
      startsAt: new Date(Date.now() + 70 * 60_000).toISOString(),
      spots: 2,
    },
  });
  expect(response.status(), await response.text()).toBe(201);
  return (await response.json()) as PublishedPlan;
};

/** A title nobody else has, so each run finds its own plans among the seed ones. */
export const uniqueTitle = (prefix: string) => `${prefix} ${Date.now().toString(36)}`;
