import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/** Header of the inner pages: back to home, the title and optional actions (projected content). */
@Component({
  selector: 'app-page-header',
  imports: [RouterLink, TranslocoPipe],
  template: `
    <header class="sticky top-0 z-10 border-b-2 border-ink bg-cream/95 backdrop-blur">
      <div class="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <a
          routerLink="/"
          class="back-link sticker-link grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-white shadow-sticker-sm"
          [attr.aria-label]="'app.back' | transloco"
        >
          <i class="pi pi-arrow-left" aria-hidden="true"></i>
        </a>
        <h1 class="flex-1 truncate text-xl font-extrabold">{{ title() }}</h1>
        <ng-content />
      </div>
    </header>
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
}
