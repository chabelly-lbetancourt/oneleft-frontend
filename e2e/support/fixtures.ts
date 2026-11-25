import {
  APIRequestContext,
  APIResponse,
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

export const API_URL = process.env['ONELEFT_API_URL'] ?? 'http://localhost:8080';
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
export const LUCIA = realmUser('lucia@oneleft.dev');

/** Where the device is (Vallecas, Madrid): the plans of the tests are published around it. */
export const POSITION = { latitude: 40.391234, longitude: -3.628765 };

const translations = (lang: Lang) =>
  JSON.parse(readFileSync(join(__dirname, `../../public/i18n/${lang}.json`), 'utf8'));

interface Fixtures {
  /** Translated text of a key in the language of the project, for example t('auth.login'). */
  t: (key: string) => string;
  /** A new mobile browser (its own session) with the app language chosen and the device location granted. */
  openPage: () => Promise<Page>;
  /**
   * Registers a plan a user has published, so that it is cancelled when the test ends, also if it fails: each person
   * can only have a few plans that have not started (409 plan.tooManyActive), and the tests would use them up.
   * publishPlan does it by itself; a test only calls it for a plan it publishes through the interface.
   */
  cancelLater: (user: TestUser, planId: string) => void;
  /**
   * Publishes a plan through the gateway, about 600 m from the device; it starts in 70 minutes unless told otherwise.
   * The plan is cancelled when the test ends.
   */
  publishPlan: (
    user: TestUser,
    title: string,
    spots?: number,
    startsInSeconds?: number,
  ) => Promise<PublishedPlan>;
  /** Takes a spot of a plan (POST) or gives it back (DELETE) through the gateway as a user. */
  participate: (user: TestUser, planId: string, method: 'POST' | 'DELETE') => Promise<void>;
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

  cancelLater: async ({ request }, use) => {
    const published: PublishedBy[] = [];
    await use((user, planId) => {
      published.push({ user, planId });
    });
    await cancelPlans(request, published);
  },

  publishPlan: async ({ request, cancelLater }, use) => {
    await use(async (user, title, spots = 2, startsInSeconds = 70 * 60) => {
      const plan = await publish(request, user, title, spots, startsInSeconds);
      cancelLater(user, plan.id);
      return plan;
    });
  },

  participate: async ({ request }, use) => {
    await use(async (user, planId, method) => {
      const url = `${API_URL}/api/v1/plans/${planId}/participants${method === 'DELETE' ? '/me' : ''}`;
      const response = await request.fetch(url, {
        method,
        headers: { Authorization: `Bearer ${await token(request, user)}` },
      });
      expect(response.status(), await response.text()).toBe(200);
    });
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
  const appPort = new URL(process.env['ONELEFT_APP_URL'] ?? 'http://localhost:4200').port;
  await page.waitForURL((url) => url.port === appPort && !url.searchParams.has('code'));
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
  spots: number,
  startsInSeconds: number,
): Promise<PublishedPlan> => {
  const response = await request.post(`${API_URL}/api/v1/plans`, {
    headers: { Authorization: `Bearer ${await token(request, user)}` },
    data: {
      activity: 'PADEL',
      title,
      meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.3964, longitude: -3.6297 },
      startsAt: new Date(Date.now() + startsInSeconds * 1000).toISOString(),
      spots,
    },
  });
  expect(response.status(), await response.text()).toBe(201);
  return (await response.json()) as PublishedPlan;
};

interface PublishedBy {
  user: TestUser;
  planId: string;
}

/** The id of the plan whose page is open (/plans/{id}), to register a plan published through the interface. */
export const planIdIn = (url: string): string => {
  const id = /\/plans\/([0-9a-f-]{36})/.exec(new URL(url).pathname)?.[1];
  if (!id) {
    throw new Error(`No plan in ${url}`);
  }
  return id;
};

/**
 * Whether the answer to cancelling a plan (DELETE /api/v1/plans/{id}) leaves nothing to clean up:
 * - 204: cancelled, now or before (the service answers the same both times);
 * - 409 plan.started: it has started or finished, so it no longer counts as a plan that has not started;
 * - 404 or 405 without the plan.notFound code: the service does not have the endpoint yet. The tests run against the
 *   `:pre` images, which do not cancel plans until the backend is promoted.
 * Anything else (401, 403, 404 plan.notFound, 409 plan.busy, 5xx…) is a failure of the clean-up.
 */
const nothingLeftToCancel = async (response: APIResponse): Promise<boolean> => {
  const status = response.status();
  if (status === 204) {
    return true;
  }
  const code = ((await response.json().catch(() => null)) as { code?: unknown } | null)?.code;
  if (status === 409) {
    return code === 'plan.started';
  }
  // TODO(#180): remove this tolerance once the backend in `pre` has DELETE /api/v1/plans/{id}
  return (status === 404 || status === 405) && code !== 'plan.notFound';
};

/**
 * Cancels the plans a test published, each with the token of whoever published it. All of them are tried, and any
 * that could not be cancelled makes the test fail.
 */
const cancelPlans = async (request: APIRequestContext, published: PublishedBy[]) => {
  const tokens = new Map<string, string>();
  const failures: string[] = [];
  for (const { user, planId } of published) {
    try {
      const bearer = tokens.get(user.username) ?? (await token(request, user));
      tokens.set(user.username, bearer);
      const response = await request.delete(`${API_URL}/api/v1/plans/${planId}`, {
        headers: { Authorization: `Bearer ${bearer}` },
      });
      if (!(await nothingLeftToCancel(response))) {
        failures.push(`${planId}: ${response.status()} ${await response.text()}`);
      }
    } catch (error) {
      failures.push(`${planId}: ${String(error)}`);
    }
  }
  expect(failures, 'Plans published by the test that could not be cancelled').toEqual([]);
};

/** A title nobody else has, so each run finds its own plans among the seed ones. */
export const uniqueTitle = (prefix: string) => `${prefix} ${Date.now().toString(36)}`;
