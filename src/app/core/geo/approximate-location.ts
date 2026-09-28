import { Injectable } from '@angular/core';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Número de decimales que se conservan: una cuadrícula de unos 1,1 km. */
export const APPROXIMATE_DECIMALS = 2;

export const roundCoordinate = (value: number): number => {
  const factor = 10 ** APPROXIMATE_DECIMALS;
  return Math.round(value * factor) / factor;
};

/**
 * Ubicación aproximada del dispositivo. Las coordenadas se redondean aquí, antes de salir del dispositivo,
 * de modo que la ubicación exacta nunca se envía al servidor.
 */
@Injectable({ providedIn: 'root' })
export class ApproximateLocation {
  current(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!globalThis.navigator?.geolocation) {
        reject(new Error('La geolocalización no está disponible en este dispositivo'));
        return;
      }
      globalThis.navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: roundCoordinate(position.coords.latitude),
            longitude: roundCoordinate(position.coords.longitude),
          }),
        () => reject(new Error('No se ha podido obtener tu ubicación')),
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
      );
    });
  }
}
