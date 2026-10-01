import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** OneLeft logo: the free spot (dashed ring with "+1") next to the wordmark. It links to the home screen. */
@Component({
  selector: 'app-brand-logo',
  imports: [RouterLink],
  templateUrl: './brand-logo.html',
  styleUrl: './brand-logo.scss',
})
export class BrandLogo {
  readonly size = input<'md' | 'lg'>('md');
}
