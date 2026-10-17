import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { filter, map } from 'rxjs';
import { Session } from '@core/auth/session';
import { NativePlatform } from '@core/platform';

/** A section of the app in the menu */
interface Tab {
  path: string;
  icon: string;
  label: string;
  /** Only that page, not the ones under it */
  exact?: boolean;
  /** The main action, in the centre */
  primary?: boolean;
}

const TABS: Tab[] = [
  { path: '/', icon: 'pi-home', label: 'tabs.home', exact: true },
  { path: '/plans/nearby', icon: 'pi-map-marker', label: 'tabs.nearby' },
  { path: '/plans/new', icon: 'pi-plus', label: 'tabs.publish', primary: true },
  { path: '/feed', icon: 'pi-users', label: 'tabs.activity' },
  { path: '/profile', icon: 'pi-user', label: 'tabs.profile' },
];

/** Pages where the menu gets in the way: writing (the chat, the publish form) and signing in */
const WITHOUT_MENU = [
  /^\/(login|register)(\/|\?|$)/,
  /^\/plans\/new(\?|$)/,
  /^\/plans\/[^/]+\/chat(\?|$)/,
];

/** Set on <html> while the menu is shown, so that the layouts and the fixed bars leave room for it */
export const TAB_BAR_CLASS = 'has-tab-bar';

/**
 * The menu at the bottom of the Android app (HU-072): the main sections at hand, like other phone apps. The web
 * keeps its header. Only with a session, and never where it gets in the way.
 */
@Component({
  selector: 'app-tab-bar',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  templateUrl: './tab-bar.html',
  styleUrl: './tab-bar.scss',
})
export class TabBar {
  private readonly router = inject(Router);
  private readonly session = inject(Session);
  private readonly platform = inject(NativePlatform);

  protected readonly tabs = TABS;
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );
  protected readonly visible = computed(
    () =>
      this.platform.isNative() &&
      this.session.isAuthenticated() &&
      !WITHOUT_MENU.some((page) => page.test(this.url())),
  );

  constructor() {
    const root = inject(DOCUMENT).documentElement;
    effect(() => root.classList.toggle(TAB_BAR_CLASS, this.visible()));
  }
}
