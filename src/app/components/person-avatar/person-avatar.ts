import { Component, computed, input, linkedSignal } from '@angular/core';
import { Avatar as PrimeAvatar } from 'primeng/avatar';
import { initials } from '../../shared/text/initials';

/** The look of each place: the signed-in user in the header, a profile, a participant of a plan. */
export type AvatarVariant = 'user' | 'profile' | 'participant';

/**
 * Someone's avatar: their photo (HU-020) or, without it, their initials. A link to a photo expires in an hour; if it
 * cannot be loaded any more, the initials come back. It always goes next to the name, so the photo is decorative.
 */
@Component({
  selector: 'app-person-avatar',
  imports: [PrimeAvatar],
  templateUrl: './person-avatar.html',
  styleUrl: './person-avatar.scss',
})
export class PersonAvatar {
  readonly name = input.required<string>();
  readonly photo = input<string | null | undefined>(null);
  readonly variant = input<AvatarVariant>('participant');
  /** {@code small} goes inline next to a name, in a line of text */
  readonly size = input<'small' | 'normal' | 'large' | 'xlarge'>('normal');
  protected readonly primeSize = computed(() => {
    const size = this.size();
    return size === 'small' ? 'normal' : size;
  });

  protected readonly initials = computed(() => initials(this.name()));
  /** A new link gets a new chance */
  protected readonly failed = linkedSignal({ source: this.photo, computation: () => false });
  protected readonly showPhoto = computed(() => !!this.photo() && !this.failed());
}
