import { Component, inject, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Language } from '../../core/i18n/language';
import { BADGE_ICONS, BadgeProgress } from '../../shared/model/reputation';

/**
 * The badges of someone (HU-044): the earned ones with their date and, with {@code progress}, how far the others are.
 */
@Component({
  selector: 'app-badge-list',
  imports: [TranslocoPipe],
  templateUrl: './badge-list.html',
  styleUrl: './badge-list.scss',
})
export class BadgeList {
  private readonly language = inject(Language);

  readonly badges = input.required<BadgeProgress[]>();
  /** Show how far the badges not earned yet are */
  readonly progress = input(false);

  protected readonly icons = BADGE_ICONS;

  protected date(badge: BadgeProgress): string {
    return badge.earnedAt
      ? new Intl.DateTimeFormat(this.language.locale(), { day: 'numeric', month: 'long' }).format(
          new Date(badge.earnedAt),
        )
      : '';
  }
}
