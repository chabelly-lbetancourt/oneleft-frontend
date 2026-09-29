import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** OneLeft logo: the empty spot (dashed lime circle) next to the wordmark. It links to the home screen. */
@Component({
  selector: 'app-brand-logo',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="brand-logo inline-flex items-center gap-2" aria-label="OneLeft">
      <span
        [class]="
          'slot grid place-items-center rounded-full font-display font-extrabold leading-none ' +
          (size() === 'lg' ? 'size-11 text-lg' : 'size-8 text-sm')
        "
        aria-hidden="true"
        >+1</span
      >
      <span
        [class]="
          'font-display font-extrabold tracking-tight ' + (size() === 'lg' ? 'text-3xl' : 'text-xl')
        "
        >One<span class="text-primary-600">Left</span></span
      >
    </a>
  `,
})
export class BrandLogo {
  readonly size = input<'md' | 'lg'>('md');
}
