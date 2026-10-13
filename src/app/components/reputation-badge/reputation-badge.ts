import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

/**
 * The reputation of someone next to their name (HU-009): a star and the score, read as «Reputation 35» by screen
 * readers.
 */
@Component({
  selector: 'app-reputation-badge',
  imports: [TranslocoPipe],
  host: { class: 'reputation-badge', '[class.reputation-badge--negative]': 'score() < 0' },
  template: `<i class="pi pi-star-fill" aria-hidden="true"></i
    ><span class="sr-only">{{ 'reputation.label' | transloco }}</span> {{ score() }}`,
  styleUrl: './reputation-badge.scss',
})
export class ReputationBadge {
  readonly score = input.required<number>();
}
