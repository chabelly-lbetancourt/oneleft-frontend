import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import en from '../../public/i18n/en.json';
import es from '../../public/i18n/es.json';

/** Transloco with the real translation files, loaded synchronously for the tests. */
export const translocoTesting = (options: TranslocoTestingOptions = {}) =>
  TranslocoTestingModule.forRoot({
    langs: { es, en },
    translocoConfig: { availableLangs: ['es', 'en'], defaultLang: 'es', reRenderOnLangChange: true },
    preloadLangs: true,
    ...options,
  });
