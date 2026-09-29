import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import {
  authInterceptor,
  provideAuth,
  withAppInitializerAuthCheck,
} from 'angular-auth-oidc-client';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { authConfig } from './core/auth/auth.config';
import { Session } from './core/auth/session';
import { DEFAULT_LANGUAGE, Language, LANGUAGES } from './core/i18n/language';
import { TranslatedTitleStrategy } from './core/i18n/translated-title-strategy';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { primeUiLicense } from './core/primeui-license';
import { OneLeftPreset } from './core/theme/oneleft-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    // Checks the session on startup (return from the Keycloak login or a stored session)
    provideAuth(authConfig, withAppInitializerAuthCheck()),
    // Adds the access token only to requests sent to the OneLeft API
    provideHttpClient(withInterceptors([authInterceptor()])),
    // Runtime translations: one bundle for the web and Android, language switchable without reloading
    provideTransloco({
      config: {
        availableLangs: [...LANGUAGES],
        defaultLang: DEFAULT_LANGUAGE,
        fallbackLang: DEFAULT_LANGUAGE,
        missingHandler: { useFallbackTranslation: true },
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => inject(Language).init()),
    // The session exists from the start: it opens the page that asked for the login when coming back from Keycloak
    provideAppInitializer(() => {
      inject(Session);
    }),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
    providePrimeNG({
      license: primeUiLicense,
      theme: {
        preset: OneLeftPreset,
        options: {
          darkModeSelector: '.app-dark',
          // PrimeNG in its own CSS layer so that Tailwind utilities can override it
          cssLayer: { name: 'primeng', order: 'theme, base, primeng' },
        },
      },
    }),
  ],
};
