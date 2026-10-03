import { computed, DestroyRef, DOCUMENT, inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';
export const THEME_MODES: readonly ThemeMode[] = ['system', 'light', 'dark'];
export const THEME_STORAGE_KEY = 'oneleft.theme';
/** Class of the dark theme on <html>: PrimeNG's darkModeSelector and the dark tokens of src/styles */
export const DARK_CLASS = 'app-dark';
/** Colour of the browser bar in each theme (the background of the app) */
const BAR_COLOURS = { light: '#fafaf9', dark: '#0c0a09' } as const;

const isMode = (value: string | null): value is ThemeMode =>
  THEME_MODES.includes(value as ThemeMode);

/**
 * Light or dark theme (HU-032). By default it follows the system and changes with it; choosing light or dark by hand
 * is remembered in the browser (or the Android WebView). index.html applies the same rule before Angular starts, so
 * the page never flashes in the wrong theme.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly media = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)');
  private readonly systemDark = signal(this.media?.matches ?? false);

  /** What the person chose: follow the system, or always light or dark */
  readonly mode = signal<ThemeMode>(this.read());
  /** The theme in use */
  readonly dark = computed(() =>
    this.mode() === 'system' ? this.systemDark() : this.mode() === 'dark',
  );

  constructor() {
    const listener = (event: MediaQueryListEvent) => {
      this.systemDark.set(event.matches);
      this.apply();
    };
    this.media?.addEventListener('change', listener);
    inject(DestroyRef).onDestroy(() => this.media?.removeEventListener('change', listener));
    this.apply();
  }

  use(mode: ThemeMode): void {
    this.mode.set(mode);
    this.write(mode);
    this.apply();
  }

  /** The quick switch: the opposite of the theme in use, remembered */
  toggle(): void {
    this.use(this.dark() ? 'light' : 'dark');
  }

  private apply(): void {
    const dark = this.dark();
    this.document.documentElement.classList.toggle(DARK_CLASS, dark);
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', BAR_COLOURS[dark ? 'dark' : 'light']);
  }

  // Storage can be missing or blocked (private mode, WebView settings): the app works without it
  private read(): ThemeMode {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY) ?? null;
      return isMode(stored) ? stored : 'system';
    } catch {
      return 'system';
    }
  }

  private write(mode: ThemeMode): void {
    try {
      const storage = this.document.defaultView?.localStorage;
      if (mode === 'system') {
        storage?.removeItem(THEME_STORAGE_KEY);
      } else {
        storage?.setItem(THEME_STORAGE_KEY, mode);
      }
    } catch {
      // The choice simply is not remembered
    }
  }
}
