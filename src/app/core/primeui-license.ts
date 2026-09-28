/**
 * PrimeUI Community License key (PrimeNG 22 is no longer MIT).
 *
 * It is not stored in the repository: it is injected at build time from the PRIMEUI_LICENSE environment variable
 *   ng build --define "PRIMEUI_LICENSE='$PRIMEUI_LICENSE'"
 * In GitHub Actions it comes from the secret with the same name. Without a key, PrimeNG shows a license notice.
 */
declare const PRIMEUI_LICENSE: string | undefined;

export const primeUiLicense: string | undefined =
  typeof PRIMEUI_LICENSE === 'string' && PRIMEUI_LICENSE.length > 0 ? PRIMEUI_LICENSE : undefined;
