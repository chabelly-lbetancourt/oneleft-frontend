// Source images of the Android app icon and splash screen, drawn with the OneLeft identity: the free spot (dashed
// ring with "+1") in the brand orange and the Plus Jakarta Sans typeface. @capacitor/assets then builds every
// Android density from them:
//   node scripts/generate-app-assets.mjs && npx @capacitor/assets generate --android
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';

const out = new URL('../assets/', import.meta.url).pathname;
const font = readFileSync(
  new URL(
    '../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2',
    import.meta.url,
  ),
).toString('base64');

// Brand colours (src/app/core/theme/oneleft-preset.ts)
const CREAM = '#fff6ed'; // primary-50
const RING = '#ff8138'; // primary-400
const ORANGE = '#e04a08'; // primary-600
const TEXT = '#b93709'; // primary-700
const INK = '#1c1917';
const SURFACE = '#fafaf9'; // surface-50
const DARK = '#1c1917';

/** The free spot: dashed ring with "+1", centred in a square of the given size. */
const spot = (size, diameter, { fill = CREAM, stroke = RING, text = TEXT } = {}) => {
  const r = diameter / 2;
  const stroke_ = diameter * 0.045;
  const dash = (2 * Math.PI * r) / 28;
  return `
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${stroke_}"
      stroke-dasharray="${dash * 0.6} ${dash * 0.4}" stroke-linecap="round"/>
    <text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-family="Jakarta" font-weight="800"
      font-size="${diameter * 0.4}" letter-spacing="${-diameter * 0.01}" fill="${text}">+1</text>`;
};

const svg = (size, body, background) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${background ? `<rect width="100%" height="100%" fill="${background}"/>` : ''}
    ${body}
  </svg>`;

/** Splash: the spot above the wordmark, both centred. */
const splash = (size, background, ink) => {
  const diameter = size * 0.16;
  const y = size / 2 - diameter * 0.35;
  return svg(
    size,
    `<g transform="translate(0 ${-diameter * 0.35})">${spot(size, diameter)}</g>
     <text x="50%" y="${y + diameter * 1.15}" text-anchor="middle" font-family="Jakarta" font-weight="800"
       font-size="${diameter * 0.42}" letter-spacing="${-diameter * 0.012}" fill="${ink}">One<tspan fill="${ORANGE}">Left</tspan></text>`,
    background,
  );
};

const images = {
  // Legacy icon (Android < 8): the spot filling most of the square
  'icon-only.png': svg(1024, spot(1024, 760), CREAM),
  // Adaptive icon: @capacitor/assets adds a 16.7 % inset and the launcher crops to a circle or squircle; the spot
  // ends up inside the central 66 %, the safe zone
  'icon-foreground.png': svg(1024, spot(1024, 880, { fill: 'none' })),
  'icon-background.png': svg(1024, '', CREAM),
  'splash.png': splash(2732, SURFACE, INK),
  'splash-dark.png': splash(2732, DARK, '#fafaf9'),
};

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [name, image] of Object.entries(images)) {
  const size = Number(image.match(/width="(\d+)"/)[1]);
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<!doctype html><html><head><style>
      @font-face { font-family: Jakarta; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 200 800; }
      html, body { margin: 0; background: transparent; }
    </style></head><body>${image}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('svg').screenshot({ path: `${out}${name}`, omitBackground: true });
  console.log(`assets/${name}`);
}
await browser.close();
