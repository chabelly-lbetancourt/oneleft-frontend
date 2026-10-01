import { Component, input } from '@angular/core';
import { AppHeader } from '../app-header/app-header';

/**
 * Layout of the home screen: the main header of the app and the content column. A page with a bottom bar
 * (app-bottom-bar, projected) leaves room for it at the end.
 */
@Component({
  selector: 'app-main-layout',
  imports: [AppHeader],
  host: { class: 'layout' },
  template: `
    <app-header />
    <main class="layout__content" [class.layout__content--with-bar]="withBottomBar()">
      <ng-content />
    </main>
    <ng-content select="app-bottom-bar" />
  `,
  styleUrl: '../layout.scss',
})
export class MainLayout {
  readonly withBottomBar = input(false);
}
