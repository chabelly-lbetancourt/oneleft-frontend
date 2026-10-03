import { Component, computed, input } from '@angular/core';
import { Skeleton } from '../skeleton/skeleton';

/** A card that is loading: optionally an icon or avatar, a title and some lines of text. */
@Component({
  selector: 'app-card-skeleton',
  imports: [Skeleton],
  templateUrl: './card-skeleton.html',
  styleUrl: './card-skeleton.scss',
})
export class CardSkeleton {
  /** none, an icon (block) or an avatar (circle) next to the title */
  readonly media = input<'none' | 'block' | 'circle'>('none');
  readonly lines = input(2);
  /** Widths that look like text of different lengths */
  protected readonly widths = computed(() =>
    Array.from({ length: this.lines() }, (_, index) => ['92%', '78%', '64%', '85%'][index % 4]),
  );
}
