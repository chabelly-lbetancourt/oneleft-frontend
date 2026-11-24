import { Component, computed, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { levelEmoji, ReputationLevel } from '@shared/model/reputation';

/**
 * The reputation of someone next to their name (HU-009): a star and the score, read as «Reputation 35» by screen
 * readers, and their level when it is known (HU-062): «⚡ Regular», read as «Level Regular».
 */
@Component({
  selector: 'app-reputation-badge',
  imports: [TranslocoPipe],
  host: { class: 'reputation-badge', '[class.reputation-badge--negative]': 'score() < 0' },
  template: `<i class="pi pi-star-fill" aria-hidden="true"></i
    ><span class="sr-only">{{ 'reputation.label' | transloco }}</span> {{ score() }}
    @if (level(); as current) {
      <span class="reputation-badge__level"
        ><span class="sr-only">{{ 'reputation.levelLabel' | transloco }}</span
        ><span aria-hidden="true">{{ emoji() }}</span>
        {{ 'reputation.levels.' + current | transloco }}</span
      >
    }`,
  styleUrl: './reputation-badge.scss',
})
export class ReputationBadge {
  readonly score = input.required<number>();
  /** The level of someone (HU-062); none while the service does not give it */
  readonly level = input<ReputationLevel | null | undefined>(null);

  protected readonly emoji = computed(() => {
    const level = this.level();
    return level ? levelEmoji(level) : '';
  });
}
