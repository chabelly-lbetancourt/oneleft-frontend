import { Component, computed, input } from '@angular/core';

/** Colours of the people (see $person-tones in styles/abstracts/_tokens.scss) */
const PERSON_TONES = 5;
const MAX_FREE = 4;

/**
 * Who is in a plan and how many spots are left: a circle with the initials of each person and a dashed ring
 * for each free spot (the brand's free spot). Decorative: the caller says it in words.
 */
@Component({
  selector: 'app-spot-slots',
  host: { '[class]': "'spot-slots spot-slots--' + size()", 'aria-hidden': 'true' },
  templateUrl: './spot-slots.html',
  styleUrl: './spot-slots.scss',
})
export class SpotSlots {
  /** Names of the people already in (the organizer first) */
  readonly names = input<string[]>([]);
  readonly free = input(0);
  readonly size = input<'sm' | 'md'>('sm');

  protected readonly people = computed(() =>
    this.names().map((name, index) => ({
      initials: initials(name),
      tone: `person-slot--tone-${index % PERSON_TONES}`,
    })),
  );
  protected readonly freeSlots = computed(() =>
    Array.from({ length: Math.min(this.free(), MAX_FREE) }),
  );
  protected readonly hiddenFree = computed(() => Math.max(0, this.free() - MAX_FREE));
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('') || '?';
