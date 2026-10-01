import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { BrandLogo } from '../../components/brand-logo/brand-logo';
import { LanguageSwitcher } from '../../components/language-switcher/language-switcher';
import { Session } from '../../core/auth/session';

/**
 * Main header of the app: the logo, the language and either the signed-in person (to the profile) or the way in
 * (sign up and sign in). The inner pages use the page header instead.
 */
@Component({
  selector: 'app-header',
  imports: [Avatar, BrandLogo, Button, LanguageSwitcher, RouterLink, TranslocoPipe],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  protected readonly session = inject(Session);
}
