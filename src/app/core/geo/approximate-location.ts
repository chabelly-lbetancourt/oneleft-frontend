import { Injectable } from '@angular/core';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Why the location is missing; the code is also the translation key suffix (errors.location.*). */
export class LocationError extends Error {
  constructor(readonly code: 'unavailable' | 'denied') {
    super(
      code === 'unavailable'
        ? 'Geolocation is not available on this device'
        : 'The location could not be obtained',
    );
  }

  get translationKey(): string {
    return `errors.location.${this.code}`;
  }
}

/** Decimals kept: a grid of about 1.1 km. */
export const APPROXIMATE_DECIMALS = 2;

/** Decimals of a plan's meeting point: about 110 m, enough to meet without exposing your home. */
export const MEETING_POINT_DECIMALS = 3;

/** Decimals for the check-in at the meeting point (HU-025): about 11 m, against a geofence of 150 m. Not stored. */
export const CHECK_IN_DECIMALS = 4;

export const roundCoordinate = (value: number, decimals = APPROXIMATE_DECIMALS): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/**
 * Approximate location of the device. Coordinates are rounded here, before leaving the device,
 * so the exact location is never sent to the server.
 */
@Injectable({ providedIn: 'root' })
export class ApproximateLocation {
  current(decimals = APPROXIMATE_DECIMALS): Promise<Coordinates> {
    return this.read(decimals, { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 });
  }

  /**
   * Where the device is right now, for the check-in at the meeting point (HU-025): a fresh, precise reading instead
   * of one from minutes ago, still rounded on the device.
   */
  precise(decimals = CHECK_IN_DECIMALS): Promise<Coordinates> {
    return this.read(decimals, { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 });
  }

  private read(decimals: number, options: PositionOptions): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!globalThis.navigator?.geolocation) {
        reject(new LocationError('unavailable'));
        return;
      }
      globalThis.navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: roundCoordinate(position.coords.latitude, decimals),
            longitude: roundCoordinate(position.coords.longitude, decimals),
          }),
        () => reject(new LocationError('denied')),
        options,
      );
    });
  }
}
