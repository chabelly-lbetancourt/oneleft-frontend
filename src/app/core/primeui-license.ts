/**
 * Clave de la PrimeUI Community License (PrimeNG 22 ya no es MIT).
 *
 * No se guarda en el repositorio: se inyecta al compilar desde la variable de entorno PRIMEUI_LICENSE
 *   ng build --define "PRIMEUI_LICENSE='$PRIMEUI_LICENSE'"
 * En GitHub Actions procede del secreto del mismo nombre. Sin clave, PrimeNG muestra un aviso de licencia.
 */
declare const PRIMEUI_LICENSE: string | undefined;

export const primeUiLicense: string | undefined =
  typeof PRIMEUI_LICENSE === 'string' && PRIMEUI_LICENSE.length > 0 ? PRIMEUI_LICENSE : undefined;
