import { Component, computed, input } from '@angular/core';

const TONES = ['bg-primary-300', 'bg-sky-300', 'bg-violet-300', 'bg-emerald-300', 'bg-rose-300'];
const MAX_FREE = 4;

/**
 * Who is in a plan and how many spots are left: a circle with the initials of each person and a dashed
 * lime circle for each free spot (the brand's empty spot). Decorative: the caller says it in words.
 */
@Component({
  selector: 'app-spot-slots',
  template: `
    <span class="spot-slots flex items-center" aria-hidden="true">
      @for (person of people(); track $index) {
        <span
          [class]="
            'person-slot grid place-items-center rounded-full border-2 border-ink font-bold text-ink ' +
            person.tone +
            ' ' +
            sizeClass()
          "
          [style.margin-left]="$first ? null : overlap()"
          >{{ person.initials }}</span
        >
      }
      @for (free of freeSlots(); track $index) {
        <span
          [class]="
            'free-slot slot grid place-items-center rounded-full font-bold text-ink ' + sizeClass()
          "
          [style.margin-left]="$first && people().length === 0 ? null : '0.25rem'"
          >+</span
        >
      }
      @if (hiddenFree() > 0) {
        <span class="ml-1 text-xs font-bold">+{{ hiddenFree() }}</span>
      }
    </span>
  `,
})
export class SpotSlots {
  /** Names of the people already in (the organizer first) */
  readonly names = input<string[]>([]);
  readonly free = input(0);
  readonly size = input<'sm' | 'md'>('sm');

  protected readonly people = computed(() =>
    this.names().map((name, index) => ({
      initials: initials(name),
      tone: TONES[index % TONES.length],
    })),
  );
  protected readonly freeSlots = computed(() =>
    Array.from({ length: Math.min(this.free(), MAX_FREE) }),
  );
  protected readonly hiddenFree = computed(() => Math.max(0, this.free() - MAX_FREE));
  protected readonly sizeClass = computed(() =>
    this.size() === 'md' ? 'size-10 text-sm' : 'size-7 text-[0.65rem]',
  );
  /** People overlap a little, like a group; free spots stay apart */
  protected readonly overlap = computed(() => (this.size() === 'md' ? '-0.4rem' : '-0.25rem'));
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('') || '?';
