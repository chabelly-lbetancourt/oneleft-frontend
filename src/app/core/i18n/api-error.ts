import { TranslocoService } from '@jsverse/transloco';

/** A translation key with its interpolation parameters. */
export interface ApiErrorMessage {
  key: string;
  params?: Record<string, unknown>;
}

interface ProblemDetails {
  code?: unknown;
  retryAfterSeconds?: unknown;
}

/**
 * Translation of an API error. The services send a stable {@code code} in their Problem Details
 * (for example {@code plan.startsTooLate}); unknown codes fall back to a generic message. When the
 * gateway rejects a request for exceeding the rate limit, the waiting time is passed as {@code minutes}.
 */
export const apiErrorMessage = (transloco: TranslocoService, error: unknown, fallback: string): ApiErrorMessage => {
  const problem = (error as { error?: ProblemDetails } | null)?.error;
  const code = problem?.code;
  if (typeof code !== 'string') {
    return { key: fallback };
  }
  const key = `errors.${code}`;
  if (!(key in transloco.getTranslation(transloco.getActiveLang()))) {
    return { key: fallback };
  }
  const retryAfter = problem?.retryAfterSeconds;
  return typeof retryAfter === 'number' ? { key, params: { minutes: Math.max(1, Math.ceil(retryAfter / 60)) } } : { key };
};
