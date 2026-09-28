import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { authInterceptor, provideAuth, withAppInitializerAuthCheck } from 'angular-auth-oidc-client';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { authConfig } from './core/auth/auth.config';
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
