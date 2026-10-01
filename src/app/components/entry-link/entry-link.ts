import { Component, input } from '@angular/core';
import { IconTile } from '../icon-tile/icon-tile';

/**
 * A card that leads to a section: icon, title, a short hint and an arrow. Placed on a link:
 *   <a routerLink="/plans/nearby" appEntryLink icon="pi-map-marker" [title]="…" [hint]="…" variant="inverse"></a>
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- placed on the link itself, so it keeps routerLink, focus and the class of each entry
  selector: 'a[appEntryLink]',
  imports: [IconTile],
  host: {
    class: 'entry-link',
    '[class.entry-link--inverse]': "variant() === 'inverse'",
  },
  templateUrl: './entry-link.html',
  styleUrl: './entry-link.scss',
})
export class EntryLink {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly hint = input.required<string>();
  readonly titleId = input<string | null>(null);
  /** inverse: ink surface for the main entry; default: a card */
  readonly variant = input<'inverse' | 'default'>('default');
}
