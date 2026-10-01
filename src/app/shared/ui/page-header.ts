import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/** Header of the inner pages: back to home, the title and optional actions (projected content). */
@Component({
  selector: 'app-page-header',
  imports: [RouterLink, TranslocoPipe],
  template: `
    <header class="app-bar">
      <div class="page-container flex items-center gap-3 py-3">
        <a
          routerLink="/"
          class="back-link grid size-10 shrink-0 place-items-center hover-soft rounded-full"
          [attr.aria-label]="'app.back' | transloco"
        >
          <i class="pi pi-arrow-left" aria-hidden="true"></i>
        </a>
        <h1 class="flex-1 truncate text-lg font-semibold">{{ title() }}</h1>
        <ng-content />
      </div>
    </header>
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
}
