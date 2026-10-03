import { TestBed } from '@angular/core/testing';
import { translocoTesting } from '../../../testing/transloco-testing';
import { Theme } from '../../core/theme/theme';
import { ThemeSwitcher } from './theme-switcher';

describe('ThemeSwitcher', () => {
  it('should offer the opposite theme and switch to it', () => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [ThemeSwitcher, translocoTesting()] });
    const fixture = TestBed.createComponent(ThemeSwitcher);
    fixture.detectChanges();
    const button = () => fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button().getAttribute('aria-label')).toBe('Cambiar al modo oscuro');

    button().click();
    fixture.detectChanges();

    expect(TestBed.inject(Theme).dark()).toBe(true);
    expect(button().getAttribute('aria-label')).toBe('Cambiar al modo claro');
    expect(button().querySelector('.pi-sun')).not.toBeNull();
    localStorage.clear();
    document.documentElement.classList.remove('app-dark');
  });
});
