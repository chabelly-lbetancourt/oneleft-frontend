import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * OneLeft theme: PrimeNG Aura with the brand identity (see styles.css).
 * - Primary actions in ink with white text; the brand orange stays for highlights and the free spots
 * - Warm neutral surfaces instead of Aura's cold greys
 */
export const OneLeftPreset = definePreset(Aura, {
  semantic: {
    // Brand orange: highlights, links and free spots
    primary: {
      50: '#fff6ed',
      100: '#ffead4',
      200: '#ffd0a8',
      300: '#ffad70',
      400: '#ff8138',
      500: '#fa6212',
      600: '#e04a08',
      700: '#b93709',
      800: '#932d10',
      900: '#772810',
      950: '#401106',
    },
    focusRing: { width: '2px', style: 'solid', color: '{surface.900}', offset: '2px' },
    formField: { borderRadius: '0.75rem' },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        primary: {
          color: '{surface.900}',
          contrastColor: '#ffffff',
          hoverColor: '{surface.800}',
          activeColor: '{surface.700}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.100}',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
        formField: {
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{surface.900}',
        },
      },
    },
  },
});
