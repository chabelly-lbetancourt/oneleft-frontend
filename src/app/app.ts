import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JoinNotices } from '@components/join-notices/join-notices';
import { BackNavigation } from '@core/navigation/back-navigation';
import { RouteProgress } from '@components/route-progress/route-progress';

@Component({
  imports: [RouterOutlet, JoinNotices, RouteProgress],
  selector: 'app-root',
  // The notices (PrimeNG Toast) load once the app is idle, outside the initial bundle
  template: `
    <app-route-progress />
    @defer (on idle) {
      <app-join-notices />
    }
    <router-outlet />
  `,
})
export class App {
  // From the first navigation on, to know which screen of the app is behind each page
  private readonly backNavigation = inject(BackNavigation);
}
