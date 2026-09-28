import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PlansApi } from '../../core/api/plans-api';
import { ApproximateLocation } from '../../core/geo/approximate-location';
import { PublishPlan } from './publish-plan';

describe('PublishPlan', () => {
  let fixture: ComponentFixture<PublishPlan>;
  let component: PublishPlan & Record<string, unknown>;
  const api = { publish: vi.fn() };
  const location = { current: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const call = <T>(name: string, ...args: unknown[]) => (component[name] as (...a: unknown[]) => T)(...args);
  const form = () => component['form'] as unknown as { patchValue: (value: object) => void };
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const fillValidPlan = () =>
    form().patchValue({
      activity: 'PADEL',
      title: '  Partido de pádel  ',
      description: ' ',
      placeName: 'Pistas del polideportivo',
      latitude: 40.391,
      longitude: -3.629,
      start: '60',
      spots: 2,
      level: 'INTERMEDIO',
    });

  beforeEach(async () => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [PublishPlan],
      providers: [
        provideRouter([]),
        { provide: PlansApi, useValue: api },
        { provide: ApproximateLocation, useValue: location },
      ],
    });
    fixture = TestBed.createComponent(PublishPlan);
    component = fixture.componentInstance as PublishPlan & Record<string, unknown>;
    await render();
  });

  it('should publish a valid plan and open its page', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    api.publish.mockReturnValue(of({ id: 'plan-1' }));
    fillValidPlan();
    const before = Date.now();

    call('publish');

    const sent = api.publish.mock.calls[0][0];
    expect(sent).toMatchObject({
      activity: 'PADEL',
      title: 'Partido de pádel',
      description: null,
      meetingPoint: { name: 'Pistas del polideportivo', latitude: 40.391, longitude: -3.629 },
      spots: 2,
      level: 'INTERMEDIO',
    });
    const startsIn = new Date(sent.startsAt).getTime() - before;
    expect(startsIn).toBeGreaterThanOrEqual(59 * 60_000);
    expect(startsIn).toBeLessThanOrEqual(61 * 60_000);
    expect(navigate).toHaveBeenCalledWith(['/planes', 'plan-1'], { queryParams: { publicado: 1 } });
  });

  it('should not publish an incomplete plan', async () => {
    call('publish');
    await render();
    expect(api.publish).not.toHaveBeenCalled();
    expect(element().querySelector('.status-message')?.textContent).toContain('Revisa los campos');
    expect(element().textContent).toContain('Indica el punto de encuentro');
  });

  it('should accept a custom time within the next hours', () => {
    const now = new Date(2026, 8, 28, 17, 0);
    form().patchValue({ start: 'custom', customTime: '' });
    expect(call<Date | null>('startsAt', now)).toBeNull();
    form().patchValue({ customTime: '19:15' });
    expect(call<Date>('startsAt', now).getHours()).toBe(19);
    form().patchValue({ customTime: '16:58' });
    expect(call<Date | null>('startsAt', now)).toBeNull();
  });

  it('should explain that the time is out of range', async () => {
    fillValidPlan();
    form().patchValue({ start: 'custom', customTime: '' });
    call('publish');
    await render();
    expect(api.publish).not.toHaveBeenCalled();
    expect(element().querySelector('.status-message')?.textContent).toContain('próximas 12 horas');
    expect(element().querySelector('#customTime')).not.toBeNull();
  });

  it('should use the location of the device with meeting point precision', async () => {
    location.current.mockResolvedValue({ latitude: 40.391, longitude: -3.629 });
    await call<Promise<void>>('useMyLocation');
    await render();
    expect(location.current).toHaveBeenCalledWith(3);
    expect(element().querySelector('.meeting-coordinates')?.textContent).toContain('40.391, -3.629');
  });

  it('should show why the location or the publication failed', async () => {
    location.current.mockRejectedValue(new Error('No se ha podido obtener tu ubicación'));
    await call<Promise<void>>('useMyLocation');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain('No se ha podido obtener tu ubicación');

    api.publish.mockReturnValue(throwError(() => ({ error: { detail: 'El plan debe empezar dentro de las próximas 12 horas' } })));
    fillValidPlan();
    call('publish');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain('próximas 12 horas');

    api.publish.mockReturnValue(throwError(() => ({})));
    call('publish');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain('No se ha podido publicar el plan');
  });
});
