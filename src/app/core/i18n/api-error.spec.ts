import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { translocoTesting } from '@testing/transloco-testing';
import { apiErrorMessage } from './api-error';

describe('apiErrorMessage', () => {
  let transloco: TranslocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [translocoTesting()] });
    transloco = TestBed.inject(TranslocoService);
  });

  it('should translate the known codes of the API', () => {
    const message = apiErrorMessage(
      transloco,
      { error: { code: 'search.radius' } },
      'errors.generic',
    );
    expect(message).toEqual({ key: 'errors.search.radius' });
    expect(transloco.translate(message.key)).toBe('El radio debe estar entre 500 m y 25 km');
  });

  it('should fall back for unknown codes or errors without a code', () => {
    expect(apiErrorMessage(transloco, { error: { code: 'nope' } }, 'errors.generic')).toEqual({
      key: 'errors.generic',
    });
    expect(apiErrorMessage(transloco, { error: { code: 42 } }, 'errors.generic')).toEqual({
      key: 'errors.generic',
    });
    expect(apiErrorMessage(transloco, null, 'errors.generic')).toEqual({ key: 'errors.generic' });
  });

  it('should tell how many minutes to wait when the rate limit is exceeded, in both languages', () => {
    const tooFast = (seconds: number) =>
      apiErrorMessage(
        transloco,
        { status: 429, error: { code: 'rate.limited', retryAfterSeconds: seconds } },
        'errors.generic',
      );

    const message = tooFast(720);
    expect(message).toEqual({ key: 'errors.rate.limited', params: { minutes: 12 } });
    expect(transloco.translate(message.key, message.params)).toBe(
      'Vas demasiado rápido. Vuelve a intentarlo en 12 min.',
    );
    expect(transloco.translate(message.key, message.params, 'en')).toBe(
      'You are going too fast. Please try again in 12 min.',
    );
    expect(tooFast(5).params).toEqual({ minutes: 1 });
  });

  it('should tell the limit of plans at once when it is reached, in both languages', () => {
    const message = apiErrorMessage(
      transloco,
      { status: 409, error: { code: 'plan.tooManyActive', max: 6 } },
      'errors.publishFailed',
    );

    expect(message).toEqual({ key: 'errors.plan.tooManyActive', params: { max: 6 } });
    expect(transloco.translate(message.key, message.params)).toBe(
      'Ya tienes 6 planes publicados sin empezar, el máximo de tu nivel. Espera a que empiece alguno para publicar otro.',
    );
    expect(transloco.translate(message.key, message.params, 'en')).toBe(
      'You already have 6 published plans that have not started, the most your level allows. Wait for one to start to publish another.',
    );
  });
});
