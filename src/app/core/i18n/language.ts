import { computed, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

export const LANGUAGES = ['es', 'en'] as const;
export type LanguageCode = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: LanguageCode = 'es';
export const STORAGE_KEY = 'oneleft.language';

/** Locale used to format dates and numbers in each language. */
const LOCALES: Record<LanguageCode, string> = { es: 'es-ES', en: 'en-GB' };

const isLanguage = (value: string | null | undefined): value is LanguageCode =>
  LANGUAGES.includes(value as LanguageCode);

/**
 * Language on the first visit: the stored choice, else the first supported browser or device language,
 * else Spanish.
 */
export const initialLanguage = (stored: string | null, preferred: readonly string[]): LanguageCode => {
  if (isLanguage(stored)) {
    return stored;
  }
  const match = preferred.map((tag) => tag.slice(0, 2).toLowerCase()).find(isLanguage);
  return match ?? DEFAULT_LANGUAGE;
};

/** Active language of the app. The choice is remembered in the browser (or the Android WebView). */
@Injectable({ providedIn: 'root' })
export class Language {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);

  readonly current = signal<LanguageCode>(DEFAULT_LANGUAGE);
  readonly locale = computed(() => LOCALES[this.current()]);
  readonly other = computed<LanguageCode>(() => (this.current() === 'es' ? 'en' : 'es'));

  /**
   * Chooses the initial language and waits for its translations, so that components can translate synchronously
   * (for example, the labels of the PrimeNG options).
   */
  init(): Promise<unknown> {
    const navigator = this.document.defaultView?.navigator;
    const language = initialLanguage(this.read(), navigator?.languages ?? [navigator?.language ?? '']);
    this.use(language, false);
    return firstValueFrom(this.transloco.load(language));
  }

  use(language: LanguageCode, remember = true): void {
    this.transloco.setActiveLang(language);
    this.current.set(language);
    this.document.documentElement.lang = language;
    if (remember) {
      this.write(language);
    }
  }

  // Storage can be missing or blocked (private mode, WebView settings): the app works without it
  private read(): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private write(language: LanguageCode): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // The choice simply is not remembered
    }
  }
}
