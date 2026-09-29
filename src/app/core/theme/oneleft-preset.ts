import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * OneLeft theme: PrimeNG Aura with the brand identity (see styles.css).
 * - Primary: tangerine, with ink text on it (better contrast than white and more recognisable)
 * - Surfaces: warm neutrals from cream to ink instead of Aura's cold greys
 * - Rounder fields and ink focus rings
 */
export const OneLeftPreset = definePreset(Aura, {
  semantic: {
    // Tangerine
    primary: {
      50: '#fff4ed',
      100: '#ffe6d5',
      200: '#ffc9a8',
      300: '#ffa470',
      400: '#ff7a3d',
      500: '#ff5f1f',
      600: '#f0430a',
      700: '#c7320a',
      800: '#9e2a10',
      900: '#7f2510',
      950: '#451006',
    },
    focusRing: { width: '2px', style: 'solid', color: '#17131f', offset: '2px' },
    formField: { borderRadius: '0.9rem', paddingY: '0.7rem' },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#fff8f0',
          100: '#f6ebdd',
          200: '#eadccb',
          300: '#d5c4b0',
          400: '#a89886',
          500: '#7a6d61',
          600: '#5a4f47',
          700: '#3f3732',
          800: '#29221f',
          900: '#17131f',
          950: '#0d0a12',
        },
        primary: {
          color: '{primary.500}',
          contrastColor: '#17131f',
          hoverColor: '{primary.400}',
          activeColor: '{primary.600}',
        },
        formField: {
          borderColor: '{surface.300}',
          hoverBorderColor: '{surface.900}',
          focusBorderColor: '{surface.900}',
        },
      },
    },
  },
});
