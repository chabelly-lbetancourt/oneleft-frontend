import { TestBed } from '@angular/core/testing';
import { translocoTesting } from '../../../testing/transloco-testing';
import { Plan } from '../model/published-plan';
import { PlanTicket } from './plan-ticket';

describe('PlanTicket', () => {
  const plan = {
    id: 'p1',
    activity: 'RUNNING',
    title: 'Rodaje suave',
    startsAt: new Date(Date.now() + 90 * 60_000).toISOString(),
    meetingPoint: { name: 'Parque de Palomeras', latitude: 40.38, longitude: -3.63 },
    organizerName: 'Ana Pruebas',
    participants: [{ userId: 'u2', name: 'Diego Ruiz', joinedAt: '' }],
    freeSpots: 2,
  } as Plan;

  const render = (distanceMeters: number | null) => {
    TestBed.configureTestingModule({ imports: [translocoTesting()] });
    const fixture = TestBed.createComponent(PlanTicket);
    fixture.componentRef.setInput('plan', plan);
    fixture.componentRef.setInput('distanceMeters', distanceMeters);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('should show the activity, when, where, who is in and the free spots', () => {
    const element = render(1234);
    expect(element.textContent).toContain('Running');
    expect(element.textContent).toContain('Rodaje suave');
    expect(element.textContent).toContain('Parque de Palomeras');
    expect(element.querySelector('.nearby-distance')?.textContent).toBe('1,2 km');
    expect(element.querySelector('.spots-left')?.textContent?.trim()).toBe('Faltan 2');
    expect(element.querySelectorAll('.person-slot')).toHaveLength(2);
    expect(element.querySelector('.bg-sky-100')).not.toBeNull();
  });

  it('should leave the distance out when there is none', () => {
    expect(render(null).querySelector('.nearby-distance')).toBeNull();
  });
});
