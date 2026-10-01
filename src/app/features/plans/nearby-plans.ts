import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { MultiSelect } from 'primeng/multiselect';
import { SelectButton } from 'primeng/selectbutton';
import { PlansApi } from '../../core/api/plans-api';
import {
  ApproximateLocation,
  Coordinates,
  LocationError,
  MEETING_POINT_DECIMALS,
} from '../../core/geo/approximate-location';
import { EmptyState } from '../../components/empty-state/empty-state';
import { PlanTicketSkeleton } from '../../components/plan-ticket-skeleton/plan-ticket-skeleton';
import { PlanTicket } from '../../components/plan-ticket/plan-ticket';
import { Language } from '../../core/i18n/language';
import { NearbyStream } from '../../core/realtime/nearby-stream';
import { formatDistance } from '../../shared/geo/distance';
import { ACTIVITIES, activityKey } from '../../shared/model/activities';
import { BottomBar } from '../../layout/bottom-bar/bottom-bar';
import { PageLayout } from '../../layout/page-layout/page-layout';
import { NearbyPlan, NearbyPlanEvent, nearbyParams, NearbyQuery } from '../../shared/model/nearby';
import { NearbyMap } from './nearby-map';

export const RADIUS_OPTIONS = [1000, 3000, 5000, 10000];
export const WINDOW_OPTIONS = [1, 3, 12];
export const DEFAULT_RADIUS = 5000;
export const DEFAULT_WINDOW = 12;

type View = 'list' | 'map';

/**
 * HU-004 · Nearby plans: open plans with free spots around the user, as a list or on a map, filtered by distance,
 * start time and activity. New matching plans arrive in real time and the list reloads itself.
 */
@Component({
  selector: 'app-nearby-plans',
  imports: [
    BottomBar,
    Button,
    EmptyState,
    FormsModule,
    Message,
    MultiSelect,
    NearbyMap,
    PageLayout,
    PlanTicket,
    PlanTicketSkeleton,
    RouterLink,
    SelectButton,
    TranslocoPipe,
  ],
  templateUrl: './nearby-plans.html',
  styleUrl: './nearby-plans.scss',
})
export class NearbyPlans {
  private readonly api = inject(PlansApi);
  private readonly location = inject(ApproximateLocation);
  private readonly stream = inject(NearbyStream);
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);

  /** Active language as a signal: the PrimeNG option labels are recomputed when it changes. */
  private readonly lang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });
  private readonly translate = (key: string) => {
    this.lang();
    return this.transloco.translate(key);
  };

  protected readonly position = signal<Coordinates | null>(null);
  protected readonly locating = signal(false);
  protected readonly locationError = signal<string | null>(null);
  protected readonly radius = signal(DEFAULT_RADIUS);
  protected readonly withinHours = signal(DEFAULT_WINDOW);
  protected readonly activities = signal<string[]>([]);
  protected readonly view = signal<View>('list');
  protected readonly newPlan = signal<NearbyPlanEvent | null>(null);

  protected readonly activityKey = activityKey;

  protected readonly radiusOptions = computed(() =>
    RADIUS_OPTIONS.map((value) => ({
      label: formatDistance(value, this.language.locale()),
      value,
    })),
  );
  protected readonly windowOptions = computed(() =>
    WINDOW_OPTIONS.map((value) => ({ label: this.translate(`nearby.within${value}`), value })),
  );
  protected readonly activityOptions = computed(() =>
    ACTIVITIES.map(({ code }) => ({ code, name: this.translate(activityKey(code)) })),
  );
  protected readonly viewOptions = computed(() => [
    { label: this.translate('nearby.list'), value: 'list' as View, icon: 'pi pi-list' },
    { label: this.translate('nearby.map'), value: 'map' as View, icon: 'pi pi-map' },
  ]);

  protected readonly query = computed<NearbyQuery | undefined>(() => {
    const position = this.position();
    return position
      ? {
          ...position,
          radius: this.radius(),
          activities: this.activities(),
          withinHours: this.withinHours(),
        }
      : undefined;
  });

  protected readonly results = httpResource<NearbyPlan[]>(() => {
    const query = this.query();
    return query ? { url: this.api.nearbyUrl(), params: nearbyParams(query) } : undefined;
  });
  protected readonly plans = computed(() => (this.results.hasValue() ? this.results.value() : []));
  /** The first search of some filters: the skeletons stand in for the list (a reload keeps the list shown) */
  protected readonly searching = computed(
    () => this.results.isLoading() && !this.results.hasValue(),
  );

  constructor() {
    void this.locate();
    // One real-time subscription per search: changing a filter closes the previous stream
    effect((onCleanup) => {
      const query = this.query();
      if (!query) {
        return;
      }
      const subscription = this.stream.watch(query).subscribe((event) => {
        this.newPlan.set(event);
        this.results.reload();
      });
      onCleanup(() => subscription.unsubscribe());
    });
  }

  protected async locate(): Promise<void> {
    this.locating.set(true);
    this.locationError.set(null);
    try {
      // About 110 m: enough to search, and the position is not stored by the server
      this.position.set(await this.location.current(MEETING_POINT_DECIMALS));
    } catch (error) {
      this.locationError.set(
        error instanceof LocationError ? error.translationKey : 'errors.location.denied',
      );
    } finally {
      this.locating.set(false);
    }
  }

  protected distance(meters: number): string {
    return formatDistance(meters, this.language.locale());
  }
}
