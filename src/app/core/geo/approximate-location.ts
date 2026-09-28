import { Injectable } from '@angular/core';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Decimals kept: a grid of about 1.1 km. */
export const APPROXIMATE_DECIMALS = 2;

/** Decimals of a plan's meeting point: about 110 m, enough to meet without exposing your home. */
export const MEETING_POINT_DECIMALS = 3;

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
    return new Promise((resolve, reject) => {
      if (!globalThis.navigator?.geolocation) {
        reject(new Error('La geolocalización no está disponible en este dispositivo'));
        return;
      }
      globalThis.navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: roundCoordinate(position.coords.latitude, decimals),
            longitude: roundCoordinate(position.coords.longitude, decimals),
          }),
        () => reject(new Error('No se ha podido obtener tu ubicación')),
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
      );
    });
  }
}
