import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { translocoTesting } from '../../../testing/transloco-testing';
import { apiErrorKey } from './api-error';

describe('apiErrorKey', () => {
  let transloco: TranslocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [translocoTesting()] });
    transloco = TestBed.inject(TranslocoService);
  });

  it('should translate the known codes of the API', () => {
    const key = apiErrorKey(transloco, { error: { code: 'search.radius' } }, 'errors.generic');
    expect(key).toBe('errors.search.radius');
    expect(transloco.translate(key)).toBe('El radio debe estar entre 500 m y 25 km');
  });

  it('should fall back for unknown codes or errors without a code', () => {
    expect(apiErrorKey(transloco, { error: { code: 'nope' } }, 'errors.generic')).toBe('errors.generic');
    expect(apiErrorKey(transloco, { error: { code: 42 } }, 'errors.generic')).toBe('errors.generic');
    expect(apiErrorKey(transloco, null, 'errors.generic')).toBe('errors.generic');
  });
});
