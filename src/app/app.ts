import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JoinNotices } from './shared/ui/join-notices';

@Component({
  imports: [RouterOutlet, JoinNotices],
  selector: 'app-root',
  // The notices (PrimeNG Toast) load once the app is idle, outside the initial bundle
  template: `
    @defer (on idle) {
      <app-join-notices />
    }
    <router-outlet />
  `,
})
export class App {}
