import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import * as L from 'leaflet';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { SelectButton } from 'primeng/selectbutton';
import { RoutingApi } from '@core/api/routing-api';
import {
  ApproximateLocation,
  LocationError,
  MEETING_POINT_DECIMALS,
} from '@core/geo/approximate-location';
import { Language } from '@core/i18n/language';
import { NativePlatform } from '@core/platform';
import { geoUri, osmDirectionsUrl } from '@shared/geo/directions';
import { formatDistance } from '@shared/geo/distance';
import { MeetingPoint } from '@shared/model/published-plan';
import { RoutePoint, TRAVEL_MODES, TravelMode, TravelRoute } from '@shared/model/route';
import { clockTime } from '@shared/time/plan-time';

const MINUTE_SECONDS = 60;

/**
 * How to get to the meeting point (HU-042): the walking or cycling route drawn on a map, how long it takes and when
 * the person would arrive leaving now, and a link that opens the navigation in the maps app of the device.
 * The location is read, and sent to the routing service, only when the person asks for the route; it is rounded on the
 * device to about 110 m, enough to route and no more. Each way of getting there is asked for once.
 */
@Component({
  selector: 'app-plan-route',
  imports: [Button, FormsModule, Message, SelectButton, TranslocoPipe],
  templateUrl: './plan-route.html',
  styleUrl: './plan-route.scss',
})
export class PlanRoute {
  private readonly api = inject(RoutingApi);
  private readonly location = inject(ApproximateLocation);
  private readonly platform = inject(NativePlatform);
  private readonly language = inject(Language);
  private readonly transloco = inject(TranslocoService);
  private readonly container = viewChild<ElementRef<HTMLElement>>('map');

  readonly meetingPoint = input.required<MeetingPoint>();

  protected readonly mode = signal<TravelMode>('foot');
  protected readonly modeOptions = computed(() => {
    this.language.locale(); // translated again when the language changes
    return TRAVEL_MODES.map((mode) => ({
      value: mode,
      label: this.transloco.translate(`route.mode.${mode}`),
    }));
  });
  /** Where the person was when they asked for the route, already rounded; null until they ask */
  private readonly from = signal<RoutePoint | null>(null);
  private readonly routes = signal<Partial<Record<TravelMode, TravelRoute>>>({});
  protected readonly route = computed(() => this.routes()[this.mode()] ?? null);
  protected readonly busy = signal(false);
  protected readonly errorKey = signal<string | null>(null);
  protected readonly summary = computed(() => {
    const route = this.route();
    if (!route) {
      return null;
    }
    const locale = this.language.locale();
    return {
      duration: this.duration(route.durationSeconds),
      distance: formatDistance(route.distanceMeters, locale),
      arrival: clockTime(new Date(Date.now() + route.durationSeconds * 1000), locale),
    };
  });
  protected readonly isNative = this.platform.isNative();
  /** geo: in the Android app (the system offers the maps apps); openstreetmap.org in the browser */
  protected readonly mapsUrl = computed(() =>
    this.isNative
      ? geoUri(this.meetingPoint())
      : osmDirectionsUrl(this.meetingPoint(), this.mode(), this.from()),
  );
  private map?: L.Map;
  private readonly layers = L.layerGroup();

  constructor() {
    effect(() => {
      const element = this.container()?.nativeElement;
      const route = this.route();
      if (element && route) {
        this.draw(element, route);
      }
    });
    inject(DestroyRef).onDestroy(() => this.map?.remove());
  }

  /** The person asks for the route: the button, or another way of getting there once they have asked for one. */
  protected async show(mode = this.mode()): Promise<void> {
    this.mode.set(mode);
    if (this.routes()[mode] || this.busy()) {
      return;
    }
    this.busy.set(true);
    this.errorKey.set(null);
    try {
      const from = this.from() ?? (await this.location.precise(MEETING_POINT_DECIMALS));
      this.from.set(from);
      this.api.route(mode, from, this.meetingPoint()).subscribe({
        next: (route) => {
          this.routes.update((routes) => ({ ...routes, [mode]: route }));
          this.busy.set(false);
        },
        error: () => this.fail('route.unavailable'),
      });
    } catch (error) {
      this.fail((error as LocationError).translationKey ?? 'errors.location.denied');
    }
  }

  /** Changing the way of getting there only asks for a route when the person has already asked for one */
  protected choose(mode: TravelMode): void {
    if (this.from()) {
      void this.show(mode);
    } else {
      this.mode.set(mode);
    }
  }

  private fail(key: string): void {
    this.busy.set(false);
    this.errorKey.set(key);
  }

  private duration(seconds: number): string {
    const minutes = Math.max(1, Math.ceil(seconds / MINUTE_SECONDS));
    return minutes < MINUTE_SECONDS
      ? this.transloco.translate('route.minutes', { minutes })
      : this.transloco.translate('route.hours', {
          hours: Math.floor(minutes / MINUTE_SECONDS),
          minutes: minutes % MINUTE_SECONDS,
        });
  }

  /** The line and both ends; their colours come from the design tokens (see objects/_map.scss) */
  private draw(element: HTMLElement, route: TravelRoute): void {
    const map = this.mapIn(element);
    this.layers.clearLayers();
    const point = this.meetingPoint();
    const end: L.LatLngTuple = [point.latitude, point.longitude];
    const path = route.path.map(({ latitude, longitude }): L.LatLngTuple => [latitude, longitude]);
    L.polyline(path, { className: 'route-line', weight: 5 }).addTo(this.layers);
    if (path.length) {
      L.circleMarker(path[0], { className: 'route-start', radius: 7, weight: 2, fillOpacity: 1 })
        .bindTooltip(textOf(this.transloco.translate('route.start')))
        .addTo(this.layers);
    }
    L.circleMarker(end, { className: 'route-end', radius: 9, weight: 2, fillOpacity: 1 })
      .bindTooltip(textOf(point.name))
      .addTo(this.layers);
    map.fitBounds(L.latLngBounds([...path, end]), { padding: [16, 16] });
  }

  /** The Leaflet map of the element, created the first time the route is drawn */
  private mapIn(element: HTMLElement): L.Map {
    if (this.map?.getContainer() === element) {
      return this.map;
    }
    this.map?.remove();
    this.map = L.map(element, { zoomControl: true, attributionControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · ' +
        '<a href="https://routing.openstreetmap.de/about.html">FOSSGIS</a>',
    }).addTo(this.map);
    this.layers.addTo(this.map);
    return this.map;
  }
}

/** A tooltip as a text node: the name of the meeting point is user content and is never read as HTML */
const textOf = (text: string): HTMLElement => {
  const span = document.createElement('span');
  span.textContent = text;
  return span;
};
