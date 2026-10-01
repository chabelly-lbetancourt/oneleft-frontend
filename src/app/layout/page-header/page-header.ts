import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

/** Header of the inner pages: back to home, the title and optional actions (projected content). */
@Component({
  selector: 'app-page-header',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  readonly title = input.required<string>();
}
