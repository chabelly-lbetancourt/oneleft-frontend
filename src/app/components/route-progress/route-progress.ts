import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

/** Waiting this long before showing the bar: fast navigations do not flash it */
const DELAY_MS = 120;

/**
 * A thin bar on top while a page loads (its code is loaded on demand, and the guards may check the session). It
 * grows slowly while waiting and fills up when the page arrives.
 */
@Component({
  selector: 'app-route-progress',
  host: {
    role: 'progressbar',
    '[attr.aria-hidden]': "state() === 'idle'",
    '[class]': "'route-progress route-progress--' + state()",
  },
  template: '<span class="route-progress__bar"></span>',
  styleUrl: './route-progress.scss',
})
export class RouteProgress {
  protected readonly state = signal<'idle' | 'loading' | 'done'>('idle');
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => this.state.set('loading'), DELAY_MS);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          clearTimeout(this.timer);
          if (this.state() === 'loading') {
            this.state.set('done');
            this.timer = setTimeout(() => this.state.set('idle'), 400);
          }
        }
      });
  }
}
