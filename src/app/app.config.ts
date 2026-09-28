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
    // Comprueba la sesión al arrancar (vuelta del login de Keycloak o sesión guardada)
    provideAuth(authConfig, withAppInitializerAuthCheck()),
    // Añade el token de acceso solo a las peticiones dirigidas a la API de OneLeft
    provideHttpClient(withInterceptors([authInterceptor()])),
    providePrimeNG({
      license: primeUiLicense,
      theme: {
        preset: OneLeftPreset,
        options: {
          darkModeSelector: '.app-dark',
          // PrimeNG en su propia capa CSS para que las utilidades de Tailwind puedan sobrescribirlo
          cssLayer: { name: 'primeng', order: 'theme, base, primeng' },
        },
      },
    }),
  ],
};
