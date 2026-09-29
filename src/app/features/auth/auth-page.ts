import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Session } from '../../core/auth/session';
import { BrandLogo } from '../../shared/ui/brand-logo';
import { GoogleButton } from '../../shared/ui/google-button';
import { LanguageSwitcher } from '../../shared/ui/language-switcher';
import { SpotSlots } from '../../shared/ui/spot-slots';

export type AuthMode = 'login' | 'register';

/**
 * Login and registration pages with the OneLeft identity. They choose how to sign in; the credentials are always
 * entered in Keycloak (Authorization Code + PKCE, also for Google and Android), never in the app.
 */
@Component({
  selector: 'app-auth-page',
  imports: [
    BrandLogo,
    Button,
    GoogleButton,
    LanguageSwitcher,
    RouterLink,
    SpotSlots,
    TranslocoPipe,
  ],
  templateUrl: './auth-page.html',
})
export class AuthPage {
  protected readonly session = inject(Session);

  /** Route data */
  readonly mode = input<AuthMode>('login');
  /** Query parameter: page to open after signing in */
  readonly returnUrl = input<string>();

  protected readonly isLogin = computed(() => this.mode() === 'login');
  protected readonly perks = ['perk1', 'perk2', 'perk3'];
  protected readonly people = ['Lucía Gómez', 'Diego Ruiz'];

  protected withEmail(): void {
    if (this.isLogin()) {
      this.session.login(this.returnUrl());
    } else {
      this.session.register(this.returnUrl());
    }
  }

  protected withGoogle(): void {
    this.session.loginWithGoogle(this.returnUrl());
  }
}
