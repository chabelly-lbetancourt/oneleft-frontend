import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { BrandLogo } from '@components/brand-logo/brand-logo';
import { PersonAvatar } from '@components/person-avatar/person-avatar';
import { LanguageSwitcher } from '@components/language-switcher/language-switcher';
import { ThemeSwitcher } from '@components/theme-switcher/theme-switcher';
import { Session } from '@core/auth/session';
import { Language } from '@core/i18n/language';
import { MyPhoto } from '@core/photos/my-photo';
import { Theme } from '@core/theme/theme';

/**
 * Main header of the app: the logo and either the signed-in person, whose avatar opens the menu of their account and
 * the settings (HU-073), or the theme, the language and the way in (sign up and sign in). The inner pages use the page
 * header instead.
 */
@Component({
  selector: 'app-header',
  imports: [
    BrandLogo,
    Button,
    LanguageSwitcher,
    Menu,
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
  private readonly theme = inject(Theme);
  private readonly language = inject(Language);
  private readonly transloco = inject(TranslocoService);
  private readonly lang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });

  protected readonly menuOpen = signal(false);
  /** My account and the settings: they follow the language and the theme in use */
  protected readonly menuItems = computed<MenuItem[]>(() => {
    this.lang();
    const t = (key: string) => this.transloco.translate(key);
    const dark = this.theme.dark();
    const other = this.language.other();
    return [
      {
        label: this.session.userName(),
        items: [
          {
            label: t('userMenu.profile'),
            icon: 'pi pi-user',
            routerLink: '/profile',
            styleClass: 'user-menu__profile',
          },
          {
            label: t('userMenu.network'),
            icon: 'pi pi-users',
            routerLink: '/network',
            styleClass: 'user-menu__network',
          },
          {
            label: t('userMenu.blocked'),
            icon: 'pi pi-ban',
            routerLink: '/blocked',
            styleClass: 'user-menu__blocked',
          },
        ],
      },
      { separator: true },
      {
        label: t(dark ? 'userMenu.lightTheme' : 'userMenu.darkTheme'),
        icon: dark ? 'pi pi-sun' : 'pi pi-moon',
        styleClass: 'user-menu__theme',
        command: () => this.theme.toggle(),
      },
      {
        label: t(`app.languages.${other}`),
        icon: 'pi pi-globe',
        styleClass: 'user-menu__language',
        command: () => void this.language.use(other),
      },
      { separator: true },
      {
        label: t('auth.logout'),
        icon: 'pi pi-sign-out',
        styleClass: 'user-menu__logout',
        command: () => this.session.logout(),
      },
    ];
  });
}
