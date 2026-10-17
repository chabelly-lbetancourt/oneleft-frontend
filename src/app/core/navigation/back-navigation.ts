import { Location } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

/**
 * Going back to the previous screen of the app, like the back button of Android (frontend#130). It keeps the
 * screens of this visit that are behind the current one: each entry of the history that the router creates keeps the
 * id of its navigation, so going back and forth in the browser moves along the same list. Without a previous screen
 * of the app (a shared link, a notice, a sign-in) it goes to the fallback, and never leaves the app.
 */
@Injectable({ providedIn: 'root' })
export class BackNavigation {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  /** Navigation ids of the history entries of this visit, up to the current one */
  private readonly entries: number[] = [];
  private started: { event: NavigationStart; replace: boolean; hidden: boolean } | null = null;

  constructor() {
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const extras = this.router.currentNavigation()?.extras;
        this.started = {
          event,
          replace: !!extras?.replaceUrl,
          hidden: !!extras?.skipLocationChange,
        };
      } else if (event instanceof NavigationEnd && this.started?.event.id === event.id) {
        this.record(this.started);
      }
    });
    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
  }

  /** Whether there is a screen of the app behind the current one */
  canGoBack(): boolean {
    return this.entries.length > 1;
  }

  /** To the previous screen of the app or, if there is none, to the fallback in place of the current one */
  back(fallback = '/'): void {
    if (this.canGoBack()) {
      this.location.back();
    } else {
      void this.router.navigateByUrl(fallback, { replaceUrl: true });
    }
  }

  private record({
    event,
    replace,
    hidden,
  }: {
    event: NavigationStart;
    replace: boolean;
    hidden: boolean;
  }) {
    const restored = event.restoredState?.navigationId;
    if (event.navigationTrigger === 'popstate' && restored !== undefined) {
      const index = this.entries.lastIndexOf(restored);
      // An entry from before this visit, or one left behind going back: nothing of the app is known behind it
      this.entries.splice(Math.max(index, 0));
      // The router writes the id of this navigation in the entry it comes back to
      this.entries.push(event.id);
    } else if (hidden) {
      return;
    } else if (replace && this.entries.length) {
      this.entries[this.entries.length - 1] = event.id;
    } else {
      this.entries.push(event.id);
    }
  }
}
