import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { translocoTesting } from '../../../testing/transloco-testing';
import { initialLanguage, Language, STORAGE_KEY } from './language';

describe('initialLanguage', () => {
  it('should prefer the stored choice', () => {
    expect(initialLanguage('en', ['es-ES'])).toBe('en');
  });

  it('should use the first supported browser language', () => {
    expect(initialLanguage(null, ['fr-FR', 'en-US', 'es'])).toBe('en');
    expect(initialLanguage('de', ['ES-mx'])).toBe('es');
  });

  it('should fall back to Spanish', () => {
    expect(initialLanguage(null, ['fr', 'de'])).toBe('es');
    expect(initialLanguage(null, [])).toBe('es');
  });
});

describe('Language', () => {
  let language: Language;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [translocoTesting()] });
    language = TestBed.inject(Language);
  });

  afterEach(() => vi.restoreAllMocks());

  it('should start with the stored language and load it', async () => {
    localStorage.setItem(STORAGE_KEY, 'en');
    await language.init();
    expect(language.current()).toBe('en');
    expect(language.locale()).toBe('en-GB');
    expect(language.other()).toBe('es');
    expect(TestBed.inject(TranslocoService).getActiveLang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('should remember the language chosen by the user', () => {
    language.use('en');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('en');
    language.use('es');
    expect(language.locale()).toBe('es-ES');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('es');
  });

  it('should work when the storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    await language.init();
    expect(() => language.use('en')).not.toThrow();
    expect(language.current()).toBe('en');
  });
});
