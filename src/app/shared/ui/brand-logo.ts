import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** OneLeft logo: the free spot (dashed ring with "+1") next to the wordmark. It links to the home screen. */
@Component({
  selector: 'app-brand-logo',
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="brand-logo inline-flex items-center gap-2" aria-label="OneLeft">
      <span
        [class]="
          'spot grid place-items-center rounded-full font-bold leading-none tracking-tight ' +
          (size() === 'lg' ? 'size-10 text-sm' : 'size-8 text-xs')
        "
        aria-hidden="true"
        >+1</span
      >
      <span [class]="'font-bold tracking-tight ' + (size() === 'lg' ? 'text-2xl' : 'text-lg')"
        >One<span class="text-accent">Left</span></span
      >
    </a>
  `,
})
export class BrandLogo {
  readonly size = input<'md' | 'lg'>('md');
}
