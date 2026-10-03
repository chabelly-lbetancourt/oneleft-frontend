import { Component } from '@angular/core';
import { BrandLogo } from '../../components/brand-logo/brand-logo';
import { LanguageSwitcher } from '../../components/language-switcher/language-switcher';
import { ThemeSwitcher } from '../../components/theme-switcher/theme-switcher';

/** Layout of the sign-in and sign-up pages: the logo, the language and a narrow centred column. */
@Component({
  selector: 'app-auth-layout',
  imports: [BrandLogo, LanguageSwitcher, ThemeSwitcher],
  host: { class: 'layout layout--auth' },
  template: `
    <header class="layout__auth-header">
      <app-brand-logo />
      <div class="layout__auth-actions">
        <app-theme-switcher />
        <app-language-switcher />
      </div>
    </header>
    <main class="layout__content layout__content--auth">
      <ng-content />
    </main>
  `,
  styleUrl: '../layout.scss',
})
export class AuthLayout {}
