import { Component } from '@angular/core';

/** The main action of a page, fixed at the bottom over a fade of the background (projected content). */
@Component({
  selector: 'app-bottom-bar',
  template: '<div class="bottom-bar__inner"><ng-content /></div>',
  styleUrl: './bottom-bar.scss',
})
export class BottomBar {}
