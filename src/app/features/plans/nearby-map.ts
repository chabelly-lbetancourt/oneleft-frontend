import { afterNextRender, Component, DestroyRef, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import * as L from 'leaflet';
import { Coordinates } from '../../core/geo/approximate-location';
import { Language } from '../../core/i18n/language';
import { formatDistance } from '../../shared/geo/distance';
import { NearbyPlan } from '../../shared/model/nearby';

/** Brand orange (Tailwind orange-600), the primary colour of the PrimeNG preset. */
const BRAND = '#ea580c';

/**
 * Map of nearby plans with Leaflet and OpenStreetMap tiles: the search area around the user and one marker per plan.
 * Popups are built with DOM nodes, so plan titles (user content) are never interpreted as HTML.
 */
@Component({
  selector: 'app-nearby-map',
  template: `<div #map class="nearby-map h-[60vh] min-h-80 w-full rounded-2xl border border-surface-200 z-0"></div>`,
})
export class NearbyMap {
  readonly center = input.required<Coordinates>();
  readonly radius = input.required<number>();
  readonly plans = input<NearbyPlan[]>([]);

  private readonly router = inject(Router);
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);
  private readonly container = viewChild.required<ElementRef<HTMLElement>>('map');
  private readonly markers = L.layerGroup();
  private map?: L.Map;

  constructor() {
    afterNextRender(() => {
      const { latitude, longitude } = this.center();
      this.map = L.map(this.container().nativeElement, { zoomControl: true, attributionControl: true }).setView(
        [latitude, longitude],
        14,
      );
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
      this.markers.addTo(this.map);
      this.draw();
    });
    effect(() => this.draw());
    inject(DestroyRef).onDestroy(() => this.map?.remove());
  }

  private draw(): void {
    // Signals are read first so the effect tracks them even before the map exists
    const center = this.center();
    const radius = this.radius();
    const plans = this.plans();
    const locale = this.language.locale();
    if (!this.map) {
      return;
    }
    this.markers.clearLayers();
    const here: L.LatLngTuple = [center.latitude, center.longitude];
    const area = L.circle(here, { radius, color: BRAND, weight: 1, fillOpacity: 0.06 }).addTo(this.markers);
    L.circleMarker(here, { radius: 7, color: '#fff', weight: 2, fillColor: '#2563eb', fillOpacity: 1 })
      .bindTooltip(this.transloco.translate('nearby.you'))
      .addTo(this.markers);
    for (const nearby of plans) {
      const { meetingPoint } = nearby.plan;
      L.circleMarker([meetingPoint.latitude, meetingPoint.longitude], {
        radius: 9,
        color: '#fff',
        weight: 2,
        fillColor: BRAND,
        fillOpacity: 1,
      })
        .bindPopup(this.popup(nearby, locale))
        .addTo(this.markers);
    }
    this.map.fitBounds(area.getBounds(), { padding: [12, 12] });
  }

  private popup(nearby: NearbyPlan, locale: string): HTMLElement {
    const box = document.createElement('div');
    box.className = 'nearby-popup';
    const title = document.createElement('strong');
    title.textContent = nearby.plan.title;
    const detail = document.createElement('div');
    detail.textContent = `${nearby.plan.meetingPoint.name} · ${formatDistance(nearby.distanceMeters, locale)}`;
    const link = document.createElement('a');
    link.href = `/plans/${nearby.plan.id}`;
    link.textContent = this.transloco.translate('nearby.open');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      void this.router.navigate(['/plans', nearby.plan.id]);
    });
    box.append(title, detail, link);
    return box;
  }
}
