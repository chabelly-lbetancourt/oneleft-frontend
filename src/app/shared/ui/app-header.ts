import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Session } from '../../core/auth/session';
import { BrandLogo } from './brand-logo';
import { LanguageSwitcher } from './language-switcher';

/**
 * Main header of the app: the logo, the language and either the signed-in person (to the profile) or the way in
 * (sign up and sign in). The inner pages use the page header instead.
 */
@Component({
  selector: 'app-header',
  imports: [Avatar, BrandLogo, Button, LanguageSwitcher, RouterLink, TranslocoPipe],
  template: `
    <header class="app-bar">
      <div class="page-container flex items-center justify-between gap-2 py-3">
        <app-brand-logo />
        <div class="flex items-center gap-1">
          <app-language-switcher />
          @if (session.isAuthenticated()) {
            <a
              routerLink="/profile"
              class="user-menu flex items-center gap-2 hover-soft rounded-full py-1 pl-1 pr-3"
            >
              <p-avatar [label]="session.initials()" shape="circle" class="avatar-user" />
              <span class="text-sm font-bold">{{ session.userName() }}</span>
            </a>
          } @else {
            <div class="flex gap-1">
              <p-button
                [label]="'auth.register' | transloco"
                [text]="true"
                size="small"
                severity="secondary"
                routerLink="/register"
              />
              <p-button
                [label]="'auth.login' | transloco"
                icon="pi pi-user"
                size="small"
                [rounded]="true"
                routerLink="/login"
              />
            </div>
          }
        </div>
      </div>
    </header>
  `,
})
export class AppHeader {
  protected readonly session = inject(Session);
}
