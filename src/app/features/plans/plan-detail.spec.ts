import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PlansApi } from '../../core/api/plans-api';
import { Plan } from '../../shared/model/published-plan';
import { TranslocoService } from '@jsverse/transloco';
import { PlanDetail } from './plan-detail';
import { translocoTesting } from '../../../testing/transloco-testing';

const PLAN: Plan = {
  id: 'plan-1',
  organizerId: 'org',
  organizerName: 'Ana Test',
  activity: 'PADEL',
  title: 'Partido de pádel, falta uno',
  description: 'Pista cubierta',
  meetingPoint: { name: 'Pistas del polideportivo', latitude: 40.391, longitude: -3.629 },
  startsAt: new Date(Date.now() + 90 * 60_000).toISOString(),
  spots: 2,
  occupied: 0,
  freeSpots: 2,
  level: 'INTERMEDIATE',
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
};

describe('PlanDetail', () => {
  let fixture: ComponentFixture<PlanDetail>;
  const api = { plan: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;

  const create = async (plan: unknown, published?: string) => {
    api.plan.mockReturnValue(plan instanceof Error ? throwError(() => plan) : of(plan));
    TestBed.configureTestingModule({
      imports: [PlanDetail, translocoTesting()],
      providers: [provideRouter([]), { provide: PlansApi, useValue: api }],
    });
    fixture = TestBed.createComponent(PlanDetail);
    fixture.componentRef.setInput('id', 'plan-1');
    if (published) {
      fixture.componentRef.setInput('published', published);
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  it('should show the plan with its time, place and spots', async () => {
    await create(PLAN, '1');
    const card = element().querySelector('.plan-card')!;
    expect(api.plan).toHaveBeenCalledWith('plan-1');
    expect(card.textContent).toContain('Partido de pádel, falta uno');
    expect(card.textContent).toContain('Pádel');
    expect(card.textContent).toContain('Faltan 2');
    expect(card.textContent).toContain('Intermedio');
    expect(card.textContent).toContain('Organiza Ana Test');
    expect(element().querySelector('.plan-time')?.textContent).toMatch(/en 1 h (29|30) min/);
    expect(card.querySelector('a')?.getAttribute('href')).toContain('mlat=40.391');
    expect(element().querySelector('.published-message')).not.toBeNull();
  });

  it('should accept any level and a single free spot', async () => {
    await create({ ...PLAN, level: null, freeSpots: 1, description: null });
    expect(element().textContent).toContain('Cualquier nivel');
    expect(element().textContent).toContain('Falta 1');
    expect(element().querySelector('.published-message')).toBeNull();
  });

  it('should show the plan in English', async () => {
    await create(PLAN);
    TestBed.inject(TranslocoService).setActiveLang('en');
    fixture.detectChanges();
    await fixture.whenStable();
    const card = element().querySelector('.plan-card')!;
    expect(card.textContent).toContain('2 spots left');
    expect(card.textContent).toContain('Intermediate');
    expect(card.textContent).toContain('Organized by Ana Test');
    expect(element().querySelector('.plan-time')?.textContent).toMatch(/At \d\d:\d\d · in 1 h (29|30) min/);
  });

  it('should explain when the plan does not exist', async () => {
    await create(new Error('404'));
    expect(element().querySelector('.plan-error')).not.toBeNull();
  });
});
