import { TestBed } from '@angular/core/testing';
import { ApproximateLocation, LocationError, roundCoordinate } from './approximate-location';

describe('ApproximateLocation', () => {
  const original = globalThis.navigator.geolocation;
  const setGeolocation = (value: unknown) =>
    Object.defineProperty(globalThis.navigator, 'geolocation', { value, configurable: true });

  afterEach(() => setGeolocation(original));

  it('should round coordinates to two decimals', () => {
    expect(roundCoordinate(40.391234)).toBe(40.39);
    expect(roundCoordinate(-3.628765)).toBe(-3.63);
    expect(roundCoordinate(40.391234, 3)).toBe(40.391);
  });

  it('should return the rounded position of the device', async () => {
    setGeolocation({
      getCurrentPosition: (ok: PositionCallback) =>
        ok({ coords: { latitude: 40.391234, longitude: -3.628765 } } as GeolocationPosition),
    });
    const location = TestBed.inject(ApproximateLocation);
    await expect(location.current()).resolves.toEqual({ latitude: 40.39, longitude: -3.63 });
  });

  it('should fail when the user denies the permission', async () => {
    setGeolocation({
      getCurrentPosition: (_: PositionCallback, error: PositionErrorCallback) =>
        error({ code: 1 } as GeolocationPositionError),
    });
    const error = await TestBed.inject(ApproximateLocation).current().catch((e: LocationError) => e);
    expect(error).toBeInstanceOf(LocationError);
    expect((error as LocationError).translationKey).toBe('errors.location.denied');
  });

  it('should fail when geolocation is not available', async () => {
    setGeolocation(undefined);
    await expect(TestBed.inject(ApproximateLocation).current()).rejects.toMatchObject({ code: 'unavailable' });
  });
});
