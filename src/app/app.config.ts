import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { primeUiLicense } from './core/primeui-license';
import { OneLeftPreset } from './core/theme/oneleft-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
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
