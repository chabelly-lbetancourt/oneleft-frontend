import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Theme } from '../../core/theme/theme';

/** Switches between the light and the dark theme (HU-032); the icon shows the theme it switches to. */
@Component({
  selector: 'app-theme-switcher',
  imports: [Button, TranslocoPipe],
  template: `
    <p-button
      class="theme-switcher"
      [icon]="theme.dark() ? 'pi pi-sun' : 'pi pi-moon'"
      [text]="true"
      [rounded]="true"
      size="small"
      severity="secondary"
      [ariaLabel]="(theme.dark() ? 'theme.toLight' : 'theme.toDark') | transloco"
      (onClick)="theme.toggle()"
    />
  `,
})
export class ThemeSwitcher {
  protected readonly theme = inject(Theme);
}
