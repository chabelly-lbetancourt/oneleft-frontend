import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { translocoTesting } from '../../../testing/transloco-testing';
import { NearbyPlan } from '../../shared/model/nearby';
import { NearbyMap } from './nearby-map';

const PLAN: NearbyPlan = {
  distanceMeters: 603,
  plan: {
    id: 'p1',
    organizerId: 'org',
    organizerName: 'Ana',
    activity: 'PADEL',
    title: '<img src=x onerror=alert(1)> Pádel',
    description: null,
    meetingPoint: { name: 'Pistas de la Albufera', latitude: 40.396, longitude: -3.63 },
    startsAt: new Date().toISOString(),
    spots: 2,
    occupied: 0,
    freeSpots: 2,
    level: null,
    status: 'OPEN',
    publishedAt: new Date().toISOString(),
    participants: [],
  },
};

describe('NearbyMap', () => {
  let fixture: ComponentFixture<NearbyMap>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [NearbyMap, translocoTesting()], providers: [provideRouter([])] });
    fixture = TestBed.createComponent(NearbyMap);
    fixture.componentRef.setInput('center', { latitude: 40.391, longitude: -3.629 });
    fixture.componentRef.setInput('radius', 3000);
    fixture.componentRef.setInput('plans', [PLAN]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should draw the search area, the user and one marker per plan on an OpenStreetMap layer', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.leaflet-container')).not.toBeNull();
    expect(element.querySelector('.leaflet-control-attribution')?.textContent).toContain('OpenStreetMap');
    // Search area + user + plan
    expect(element.querySelectorAll('path.leaflet-interactive').length).toBe(3);

    fixture.componentRef.setInput('plans', []);
    fixture.detectChanges();
    expect(element.querySelectorAll('path.leaflet-interactive').length).toBe(2);
  });

  it('should build popups as text and open the plan with the router', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const popup = (fixture.componentInstance as unknown as { popup: (p: NearbyPlan, l: string) => HTMLElement }).popup(
      PLAN,
      'es-ES',
    );
    expect(popup.querySelector('img')).toBeNull();
    expect(popup.querySelector('strong')?.textContent).toBe('<img src=x onerror=alert(1)> Pádel');
    expect(popup.textContent).toContain('Pistas de la Albufera · 600 m');
    const link = popup.querySelector('a')!;
    expect(link.textContent).toBe('Ver plan');
    link.click();
    expect(navigate).toHaveBeenCalledWith(['/plans', 'p1']);
  });
});
