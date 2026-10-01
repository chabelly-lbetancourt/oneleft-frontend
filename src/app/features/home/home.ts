import { httpResource } from '@angular/common/http';
import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { merge } from 'rxjs';
import { Button } from 'primeng/button';
import { environment } from '../../../environments/environment';
import { Session } from '../../core/auth/session';
import { UserEvents } from '../../core/realtime/user-events';
import { ACTIVITIES, activityOf } from '../../shared/model/activities';
import { Plan } from '../../shared/model/published-plan';
import { EntryLink } from '../../components/entry-link/entry-link';
import { IconTile } from '../../components/icon-tile/icon-tile';
import { PlanTicketSkeleton } from '../../components/plan-ticket-skeleton/plan-ticket-skeleton';
import { PlanTicket } from '../../components/plan-ticket/plan-ticket';
import { SpotSlots } from '../../components/spot-slots/spot-slots';
import { BottomBar } from '../../layout/bottom-bar/bottom-bar';
import { MainLayout } from '../../layout/main-layout/main-layout';

@Component({
  selector: 'app-home',
  imports: [
    BottomBar,
    Button,
    EntryLink,
    IconTile,
    MainLayout,
    PlanTicket,
    PlanTicketSkeleton,
    RouterLink,
    SpotSlots,
    TranslocoPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly session = inject(Session);
  /** Plans I organize that have not started yet (only with a session). */
  protected readonly myPlans = httpResource<Plan[]>(() =>
    this.session.isAuthenticated() ? `${environment.apiUrl}/api/v1/plans/mine` : undefined,
  );
  protected readonly firstName = computed(() => this.session.userName().split(/\s+/)[0] ?? '');
  protected readonly activities = ACTIVITIES;
  /** Activity of the example plan of the landing */
  protected readonly demoActivity = activityOf('PADEL');
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
