import { Component, computed, input, signal } from '@angular/core';
import { initials } from '@shared/text/initials';

/** Colours of the people (see $person-tones in styles/abstracts/_tokens.scss) */
const PERSON_TONES = 5;
const MAX_FREE = 4;

/**
 * Who is in a plan and how many spots are left: a circle with the photo (HU-020) or the initials of each person and a
 * dashed ring for each free spot (the brand's free spot). Decorative: the caller says it in words.
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
  /** Their photos, in the same order; without one (or if its link expired), the initials */
  readonly photos = input<(string | null | undefined)[]>([]);
  readonly free = input(0);
  readonly size = input<'sm' | 'md'>('sm');

  private readonly failed = signal(new Set<string>());

  protected readonly people = computed(() =>
    this.names().map((name, index) => {
      const photo = this.photos()[index];
      return {
        initials: initials(name),
        tone: `person-slot--tone-${index % PERSON_TONES}`,
        photo: photo && !this.failed().has(photo) ? photo : null,
      };
    }),
  );
  protected readonly freeSlots = computed(() =>
    Array.from({ length: Math.min(this.free(), MAX_FREE) }),
  );
  protected readonly hiddenFree = computed(() => Math.max(0, this.free() - MAX_FREE));

  protected fail(photo: string): void {
    this.failed.update((failed) => new Set(failed).add(photo));
  }
}
