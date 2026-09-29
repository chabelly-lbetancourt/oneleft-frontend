import { httpResource } from '@angular/common/http';
import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { merge } from 'rxjs';
import { Button } from 'primeng/button';
import { environment } from '../../../environments/environment';
import { Session } from '../../core/auth/session';
import { UserEvents } from '../../core/realtime/user-events';
import { ACTIVITIES } from '../../shared/model/activities';
import { Plan } from '../../shared/model/published-plan';
import { BrandLogo } from '../../shared/ui/brand-logo';
import { GoogleButton } from '../../shared/ui/google-button';
import { LanguageSwitcher } from '../../shared/ui/language-switcher';
import { PlanTicket } from '../../shared/ui/plan-ticket';
import { SpotSlots } from '../../shared/ui/spot-slots';

@Component({
  selector: 'app-home',
  imports: [
    Avatar,
    BrandLogo,
    Button,
    GoogleButton,
    LanguageSwitcher,
    PlanTicket,
    RouterLink,
    SpotSlots,
    TranslocoPipe,
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly session = inject(Session);
  /** Plans I organize that have not started yet (only with a session). */
  protected readonly myPlans = httpResource<Plan[]>(() =>
    this.session.isAuthenticated() ? `${environment.apiUrl}/api/v1/plans/mine` : undefined,
  );
  protected readonly firstName = computed(() => this.session.userName().split(/\s+/)[0] ?? '');
  protected readonly activities = ACTIVITIES;
  protected readonly steps = ['step1', 'step2', 'step3'];
  /** People already in the example plan of the landing */
  protected readonly demoPeople = ['Lucía Gómez', 'Diego Ruiz', 'Marta Sanz'];

  constructor() {
    // Free spots of my plans change when someone joins or leaves: refresh the list with each notice
    const events = inject(UserEvents);
    merge(events.joined$, events.left$)
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => this.myPlans.reload());
  }
}
