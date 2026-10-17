import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JoinNotices } from '@components/join-notices/join-notices';
import { BackNavigation } from '@core/navigation/back-navigation';
import { RouteProgress } from '@components/route-progress/route-progress';
import { TabBar } from '@layout/tab-bar/tab-bar';

@Component({
  imports: [RouterOutlet, JoinNotices, RouteProgress, TabBar],
  selector: 'app-root',
  // The notices (PrimeNG Toast) load once the app is idle, outside the initial bundle
  template: `
    <app-route-progress />
    @defer (on idle) {
      <app-join-notices />
    }
    <router-outlet />
    <!-- The menu of the Android app (HU-072): it shows itself only there, with a session -->
    <app-tab-bar />
  `,
})
export class App {
  // From the first navigation on, to know which screen of the app is behind each page
  private readonly backNavigation = inject(BackNavigation);
}
