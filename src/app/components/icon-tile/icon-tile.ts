import { Component, input } from '@angular/core';

/**
 * An icon on a soft rounded square: the activity of a plan, the entries of the home screen. The tone is a tone class
 * (tone-brand, tone-inverse or the tone of an activity, see styles/objects/_tones.scss).
 */
@Component({
  selector: 'app-icon-tile',
  host: {
    '[class]': "'icon-tile icon-tile--' + size() + ' icon-tile--icon-' + iconSize() + ' ' + tone()",
  },
  template: `<i [class]="'pi ' + icon()" aria-hidden="true"></i>`,
  styleUrl: './icon-tile.scss',
})
export class IconTile {
  readonly icon = input.required<string>();
  readonly tone = input('tone-brand');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly iconSize = input<'lg' | 'xl' | '2xl'>('xl');
}
