import { TranslocoService } from '@jsverse/transloco';

/**
 * Translation key for an API error. The services send a stable {@code code} in their Problem Details
 * (for example {@code plan.startsTooLate}); unknown codes fall back to a generic message.
 */
export const apiErrorKey = (transloco: TranslocoService, error: unknown, fallback: string): string => {
  const code = (error as { error?: { code?: unknown } } | null)?.error?.code;
  if (typeof code !== 'string') {
    return fallback;
  }
  const key = `errors.${code}`;
  return key in transloco.getTranslation(transloco.getActiveLang()) ? key : fallback;
};
