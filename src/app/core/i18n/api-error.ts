import { TranslocoService } from '@jsverse/transloco';

/** A translation key with its interpolation parameters. */
export interface ApiErrorMessage {
  key: string;
  params?: Record<string, unknown>;
}

interface ProblemDetails {
  code?: unknown;
  retryAfterSeconds?: unknown;
  max?: unknown;
}

/**
 * Translation of an API error. The services send a stable {@code code} in their Problem Details
 * (for example {@code plan.startsTooLate}); unknown codes fall back to a generic message. When the
 * gateway rejects a request for exceeding the rate limit, the waiting time is passed as {@code minutes}; when a limit
 * of the person is reached (for example {@code plan.tooManyActive}, HU-063), the limit is passed as {@code max}.
 */
export const apiErrorMessage = (
  transloco: TranslocoService,
  error: unknown,
  fallback: string,
): ApiErrorMessage => {
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
  if (typeof retryAfter === 'number') {
    return { key, params: { minutes: Math.max(1, Math.ceil(retryAfter / 60)) } };
  }
  const max = problem?.max;
  return typeof max === 'number' ? { key, params: { max } } : { key };
};
