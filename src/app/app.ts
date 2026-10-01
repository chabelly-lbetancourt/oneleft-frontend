import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JoinNotices } from './components/join-notices/join-notices';
import { RouteProgress } from './components/route-progress/route-progress';

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
export class App {}
