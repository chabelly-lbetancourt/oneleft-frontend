import { Component, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { BackNavigation } from '@core/navigation/back-navigation';

/**
 * Header of the inner pages: back to the previous screen of the app (or to {@link fallback} when there is none), the
 * title and optional actions (projected content).
 */
@Component({
  selector: 'app-page-header',
  imports: [TranslocoPipe],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  private readonly navigation = inject(BackNavigation);

  readonly title = input.required<string>();
  /** Where back goes when the page was opened directly */
  readonly fallback = input('/');

  protected back(): void {
    this.navigation.back(this.fallback());
  }
}
