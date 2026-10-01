import { Component, input } from '@angular/core';

/** Nothing to show yet: the free spot and a message (and optional actions, projected). */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  readonly message = input.required<string>();
}
