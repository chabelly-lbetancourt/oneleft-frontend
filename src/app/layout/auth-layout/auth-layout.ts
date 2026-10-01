import { Component } from '@angular/core';
import { BrandLogo } from '../../components/brand-logo/brand-logo';
import { LanguageSwitcher } from '../../components/language-switcher/language-switcher';

/** Layout of the sign-in and sign-up pages: the logo, the language and a narrow centred column. */
@Component({
  selector: 'app-auth-layout',
  imports: [BrandLogo, LanguageSwitcher],
  host: { class: 'layout layout--auth' },
  template: `
    <header class="layout__auth-header">
      <app-brand-logo />
      <app-language-switcher />
    </header>
    <main class="layout__content layout__content--auth">
      <ng-content />
    </main>
  `,
  styleUrl: '../layout.scss',
})
export class AuthLayout {}
