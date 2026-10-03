import { Component, input } from '@angular/core';

/**
 * A grey shape with a light running over it, in place of content that is still loading. Decorative: the page says
 * in words that it is loading (role="status").
 */
@Component({
  selector: 'app-skeleton',
  host: {
    'aria-hidden': 'true',
    '[class]': "'skeleton skeleton--' + shape()",
    '[style.width]': 'width()',
    '[style.height]': 'height()',
  },
  template: '',
  styleUrl: './skeleton.scss',
})
export class Skeleton {
  /** line: a line of text; circle: an avatar or a spot; block: an icon or an image */
  readonly shape = input<'line' | 'circle' | 'block'>('line');
  readonly width = input('100%');
  readonly height = input<string | null>(null);
}
