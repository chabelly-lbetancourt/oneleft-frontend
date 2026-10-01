import { Component, computed, input } from '@angular/core';

const SIZES = { sm: 'size-10', md: 'size-11', lg: 'size-12' } as const;
const ICON_SIZES = { lg: 'text-lg', xl: 'text-xl', '2xl': 'text-2xl' } as const;

/**
 * An icon on a soft rounded square: the activity of a plan, the entries of the home screen. The tone is a semantic
 * class (tone-brand, tone-inverse) or the tone of an activity.
 */
@Component({
  selector: 'app-icon-tile',
  host: { class: 'contents' },
  template: `
    <div [class]="'icon-tile ' + sizeClass() + ' ' + tone()">
      <i [class]="'pi ' + icon() + ' ' + iconClass()" aria-hidden="true"></i>
    </div>
  `,
})
export class IconTile {
  readonly icon = input.required<string>();
  readonly tone = input('tone-brand');
  readonly size = input<keyof typeof SIZES>('md');
  readonly iconSize = input<keyof typeof ICON_SIZES>('xl');

  protected readonly sizeClass = computed(() => SIZES[this.size()]);
  protected readonly iconClass = computed(() => ICON_SIZES[this.iconSize()]);
}
