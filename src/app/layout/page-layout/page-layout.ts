import { Component, input } from '@angular/core';
import { PageHeader } from '@layout/page-header/page-header';

/**
 * Layout of the inner pages: the header with back (to the previous screen of the app), the title and the actions (elements marked pageActions), the
 * content column and an optional bottom bar (app-bottom-bar).
 *   <app-page-layout [title]="…" [withBottomBar]="true">
 *     <p-button pageActions … />
 *     …content…
 *     <app-bottom-bar>…</app-bottom-bar>
 *   </app-page-layout>
 */
@Component({
  selector: 'app-page-layout',
  imports: [PageHeader],
  host: { class: 'layout' },
  template: `
    <app-page-header [title]="title()" [fallback]="fallback()">
      <ng-content select="[pageActions]" />
    </app-page-header>
    <main
      class="layout__content layout__content--page"
      [class.layout__content--compact]="compact()"
      [class.layout__content--with-bar]="withBottomBar()"
      [class.layout__content--end]="!withBottomBar() && spaceAtEnd()"
    >
      <ng-content />
    </main>
    <ng-content select="app-bottom-bar" />
  `,
  styleUrl: '../layout.scss',
})
export class PageLayout {
  readonly title = input.required<string>();
  /** Where back goes when the page was opened directly (a link, a notice): the home page by default */
  readonly fallback = input('/');
  readonly withBottomBar = input(false);
  /** Room at the end of the content (forms, so the last button is not stuck to the edge) */
  readonly spaceAtEnd = input(true);
  /** Less room on top (pages with filters) */
  readonly compact = input(false);
}
