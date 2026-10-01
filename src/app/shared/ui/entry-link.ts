import { Component, input } from '@angular/core';
import { IconTile } from './icon-tile';

/**
 * A card that leads to a section: icon, title, a short hint and an arrow. Placed on a link:
 *   <a routerLink="/plans/nearby" appEntryLink icon="pi-map-marker" [title]="…" [hint]="…" variant="inverse"></a>
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- placed on the link itself, so it keeps routerLink, focus and the class of each entry
  selector: 'a[appEntryLink]',
  imports: [IconTile],
  host: {
    class: 'flex items-center gap-4',
    '[class.panel-inverse]': "variant() === 'inverse'",
    '[class.p-5]': "variant() === 'inverse'",
    '[class.card]': "variant() === 'default'",
    '[class.card-link]': "variant() === 'default'",
    '[class.p-4]': "variant() === 'default'",
  },
  template: `
    @if (variant() === 'inverse') {
      <app-icon-tile [icon]="icon()" tone="tone-inverse" size="lg" iconSize="2xl" />
    } @else {
      <app-icon-tile [icon]="icon()" tone="tone-brand" size="sm" iconSize="xl" />
    }
    <div class="min-w-0 flex-1">
      <h2
        [id]="titleId()"
        [class]="variant() === 'inverse' ? 'text-lg font-semibold' : 'font-semibold'"
      >
        {{ title() }}
      </h2>
      <p [class]="variant() === 'inverse' ? 'text-sm text-on-inverse' : 'text-sm text-muted'">
        {{ hint() }}
      </p>
    </div>
    <i
      [class]="'pi pi-arrow-right ' + (variant() === 'inverse' ? 'text-on-inverse' : 'text-subtle')"
      aria-hidden="true"
    ></i>
  `,
})
export class EntryLink {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly hint = input.required<string>();
  readonly titleId = input<string | null>(null);
  /** inverse: ink surface for the main entry; default: a card */
  readonly variant = input<'inverse' | 'default'>('default');
}
