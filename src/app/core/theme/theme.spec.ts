import { TestBed } from '@angular/core/testing';
import { DARK_CLASS, Theme, THEME_STORAGE_KEY } from './theme';

describe('Theme', () => {
  let systemDark: boolean;
  let listeners: ((event: MediaQueryListEvent) => void)[];
  const html = () => document.documentElement;

  const create = () => TestBed.inject(Theme);
  const systemChanges = (dark: boolean) => {
    systemDark = dark;
    listeners.forEach((listener) => listener({ matches: dark } as MediaQueryListEvent));
  };

  beforeEach(() => {
    localStorage.clear();
    html().classList.remove(DARK_CLASS);
    document.head.innerHTML = '<meta name="theme-color" content="#fff">';
    systemDark = false;
    listeners = [];
    window.matchMedia = vi.fn(
      () =>
        ({
          get matches() {
            return systemDark;
          },
          addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
            listeners.push(listener),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );
    TestBed.configureTestingModule({});
  });

  it('should follow the system by default, also when it changes', () => {
    systemDark = true;
    const theme = create();
    expect(theme.mode()).toBe('system');
    expect(theme.dark()).toBe(true);
    expect(html().classList.contains(DARK_CLASS)).toBe(true);
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
      '#0c0a09',
    );

    systemChanges(false);
    expect(theme.dark()).toBe(false);
    expect(html().classList.contains(DARK_CLASS)).toBe(false);
  });

  it('should remember a choice made by hand and ignore the system then', () => {
    const theme = create();
    theme.toggle();
    expect(theme.mode()).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    systemChanges(false);
    expect(html().classList.contains(DARK_CLASS)).toBe(true);

    theme.use('system');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(theme.dark()).toBe(false);
  });

  it('should start with the stored choice and survive without storage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    systemDark = true;
    expect(create().dark()).toBe(false);

    TestBed.resetTestingModule();
    localStorage.setItem(THEME_STORAGE_KEY, 'something else');
    expect(create().mode()).toBe('system');

    TestBed.resetTestingModule();
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const theme = create();
    expect(theme.mode()).toBe('system');
    theme.use('dark');
    expect(theme.dark()).toBe(true);
    getItem.mockRestore();
    setItem.mockRestore();
  });
});
