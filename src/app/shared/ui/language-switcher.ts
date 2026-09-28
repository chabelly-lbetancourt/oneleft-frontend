import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Language } from '../../core/i18n/language';

/** Switches between Spanish and English; it shows the language it switches to. */
@Component({
  selector: 'app-language-switcher',
  imports: [Button, TranslocoPipe],
  template: `
    <p-button
      class="language-switcher"
      [label]="language.other().toUpperCase()"
      icon="pi pi-globe"
      [text]="true"
      size="small"
      severity="secondary"
      [ariaLabel]="'app.languages.' + language.other() | transloco"
      (onClick)="language.use(language.other())"
    />
  `,
})
export class LanguageSwitcher {
  protected readonly language = inject(Language);
}
