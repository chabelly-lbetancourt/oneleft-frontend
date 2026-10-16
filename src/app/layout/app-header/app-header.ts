import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { BrandLogo } from '@components/brand-logo/brand-logo';
import { PersonAvatar } from '@components/person-avatar/person-avatar';
import { LanguageSwitcher } from '@components/language-switcher/language-switcher';
import { ThemeSwitcher } from '@components/theme-switcher/theme-switcher';
import { Session } from '@core/auth/session';
import { MyPhoto } from '@core/photos/my-photo';

/**
 * Main header of the app: the logo, the language and either the signed-in person (to the profile) or the way in
 * (sign up and sign in). The inner pages use the page header instead.
 */
@Component({
  selector: 'app-header',
  imports: [
    BrandLogo,
    Button,
    LanguageSwitcher,
    PersonAvatar,
    RouterLink,
    ThemeSwitcher,
    TranslocoPipe,
  ],
  templateUrl: './app-header.html',
  styleUrl: './app-header.scss',
})
export class AppHeader {
  protected readonly session = inject(Session);
  /** My profile photo (HU-020), or my initials */
  protected readonly myPhoto = inject(MyPhoto);
}
