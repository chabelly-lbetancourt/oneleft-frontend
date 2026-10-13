import { ANA, expect, signIn, test } from './support/fixtures';

/** The places the geocoder would find around the device (HU-071), closest first. */
const PLACES = [
  {
    name: 'Polideportivo Campus Sur',
    address: 'Avenida del Campus Sur, Puente de Vallecas, Madrid',
    latitude: 40.38853,
    longitude: -3.62699,
    distanceMeters: 340,
  },
  {
    name: 'Polideportivo Palomeras',
    address: 'Avenida de la Albufera, Palomeras Sureste, Madrid',
    latitude: 40.38414,
    longitude: -3.63283,
    distanceMeters: 1240,
  },
];

test('suggests nearby places for the meeting point and fills it with the chosen one, by keyboard', async ({
  openPage,
  t,
}) => {
  const page = await openPage();
  // The places API is answered in the browser: the test does not depend on the geocoder nor creates anything
  const searches: URL[] = [];
  await page.route(
    (url) => url.pathname === '/api/v1/places',
    (route) => {
      searches.push(new URL(route.request().url()));
      return route.fulfill({ json: PLACES });
    },
  );
  await page.goto('/plans/new');
  await signIn(page, ANA);

  const where = page.getByRole('combobox', { name: t('publish.where') });
  await where.pressSequentially('Polidep', { delay: 40 });
  await expect(page.getByRole('option')).toHaveCount(2);
  await expect(page.getByRole('option').first()).toContainText('Polideportivo Campus Sur');
  await expect(page.getByRole('option').first()).toContainText('340 m');
  await expect(page.getByRole('option').last()).toContainText(/1[,.]2 km/);

  await where.press('ArrowDown');
  await where.press('Enter');
  await expect(where).toHaveValue('Polideportivo Campus Sur');
  await expect(page.locator('.meeting-coordinates')).toContainText('40.3885, -3.627');
  // Searched around the approximate location of the device, rounded before leaving it
  const search = searches.at(-1)!;
  expect(search.searchParams.get('query')).toMatch(/^Polid/);
  expect(search.searchParams.get('latitude')).toBe('40.39');
  expect(search.searchParams.get('longitude')).toBe('-3.63');
});
