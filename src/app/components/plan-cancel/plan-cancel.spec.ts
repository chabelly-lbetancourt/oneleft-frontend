import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { PlansApi } from '@core/api/plans-api';
import { Plan } from '@shared/model/published-plan';
import { PlanCancel } from './plan-cancel';

const minutesFromNow = (minutes: number) => new Date(Date.now() + minutes * 60_000).toISOString();

const PLAN: Plan = {
  id: 'plan-1',
  organizerId: 'me',
  organizerName: 'Ana',
  activity: 'PADEL',
  title: 'Pádel 2 contra 2',
  description: null,
  meetingPoint: { name: 'Pistas', latitude: 40.391, longitude: -3.629 },
  startsAt: minutesFromNow(90),
  spots: 3,
  occupied: 1,
  freeSpots: 2,
  level: null,
  status: 'OPEN',
  publishedAt: new Date().toISOString(),
  participants: [],
  waitlist: [],
};

describe('PlanCancel', () => {
  let fixture: ComponentFixture<PlanCancel>;
  let cancelled: number;
  let failed: number;
  const api = { cancel: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (plan: Plan = PLAN) => {
    fixture = TestBed.createComponent(PlanCancel);
    fixture.componentRef.setInput('plan', plan);
    cancelled = 0;
    failed = 0;
    fixture.componentInstance.cancelled.subscribe(() => cancelled++);
    fixture.componentInstance.failed.subscribe(() => failed++);
    await render();
  };
  const click = async (selector: string) => {
    element().querySelector<HTMLButtonElement>(`${selector} button`)!.click();
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [PlanCancel, translocoTesting()],
      providers: [{ provide: PlansApi, useValue: api }],
    });
  });

  it('should offer to cancel an open or full plan that has not started', async () => {
    await create();
    expect(element().querySelector('.cancel-plan')?.textContent).toContain('Cancelar plan');
    await create({ ...PLAN, status: 'FULL' });
    expect(element().querySelector('.cancel-plan')).not.toBeNull();
  });

  it.each(['IN_PROGRESS', 'FINISHED', 'CANCELLED'] as const)(
    'should not offer to cancel a plan that is %s',
    async (status) => {
      await create({ ...PLAN, status });
      expect(element().querySelector('.cancel-plan')).toBeNull();
    },
  );

  it('should not offer to cancel a plan whose time has come, even if it is still open', async () => {
    await create({ ...PLAN, startsAt: minutesFromNow(-1) });
    expect(element().querySelector('.cancel-plan')).toBeNull();
  });

  it('should ask first, saying who will be told, and keep the plan when I say no', async () => {
    await create();

    await click('.cancel-plan');
    const confirm = element().querySelector<HTMLElement>('.cancel-confirm')!;
    expect(confirm.getAttribute('role')).toBe('group');
    expect(confirm.getAttribute('aria-labelledby')).toBe('cancel-confirm-title');
    expect(element().querySelector('#cancel-confirm-title')?.textContent).toContain(
      '¿Cancelar este plan?',
    );
    expect(confirm.textContent).toContain('Avisaremos a quienes se apuntaron');
    // More than an hour to the start: it costs nothing
    expect(element().querySelector('.cancel-confirm__late')).toBeNull();
    expect(document.activeElement).toBe(confirm);

    await click('.cancel-keep');
    expect(api.cancel).not.toHaveBeenCalled();
    expect(element().querySelector('.cancel-confirm')).toBeNull();
    expect(document.activeElement).toBe(element().querySelector('.cancel-plan button'));
    expect(cancelled).toBe(0);
  });

  it('should warn that it costs reputation when the plan starts in less than an hour', async () => {
    await create({ ...PLAN, startsAt: minutesFromNow(59) });
    await click('.cancel-plan');
    expect(element().querySelector('.cancel-confirm__late')?.textContent).toContain(
      'te restará 10 puntos de reputación',
    );

    await create({ ...PLAN, startsAt: minutesFromNow(61) });
    await click('.cancel-plan');
    expect(element().querySelector('.cancel-confirm__late')).toBeNull();
  });

  it('should cancel the plan, tell the page and say it in the live region', async () => {
    await create();
    const status = element().querySelector<HTMLElement>('.cancel-status')!;
    // The live region is there before anything is said in it
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.getAttribute('role')).toBe('status');
    expect(status.textContent?.trim()).toBe('');
    api.cancel.mockReturnValue(of(undefined));

    await click('.cancel-plan');
    await click('.cancel-yes');

    expect(api.cancel).toHaveBeenCalledWith('plan-1');
    expect(cancelled).toBe(1);
    expect(failed).toBe(0);
    expect(status.textContent).toContain('Has cancelado el plan');
    expect(element().querySelector('.cancel-confirm')).toBeNull();
    expect(document.activeElement).toBe(status);

    // The page shows the plan cancelled: nothing left to cancel, and what happened stays said
    fixture.componentRef.setInput('plan', { ...PLAN, status: 'CANCELLED' });
    await render();
    expect(element().querySelector('.cancel-plan')).toBeNull();
    expect(status.textContent).toContain('Has cancelado el plan');
  });

  it('should wait for the answer before saying anything', async () => {
    await create();
    api.cancel.mockReturnValue(new Subject());

    await click('.cancel-plan');
    await click('.cancel-yes');

    expect(element().querySelector('.cancel-confirm')).not.toBeNull();
    expect(element().querySelector('.cancel-status')?.textContent?.trim()).toBe('');
    expect(cancelled).toBe(0);
  });

  it.each([
    [403, 'plan.notOrganizer', 'Solo el organizador puede hacer esto.'],
    [409, 'plan.started', 'El plan ya ha empezado.'],
    [409, 'plan.busy', 'Inténtalo de nuevo.'],
    [500, 'something.else', 'No se ha podido cancelar el plan.'],
  ])('should explain the error %i %s and tell the page', async (status, code, text) => {
    await create();
    api.cancel.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status, error: { code } })),
    );

    await click('.cancel-plan');
    await click('.cancel-yes');

    expect(element().querySelector('.cancel-error')?.textContent).toContain(text);
    expect(element().querySelector('.cancel-confirm')).toBeNull();
    expect(element().querySelector('.cancel-status')?.textContent?.trim()).toBe('');
    expect(failed).toBe(1);
    expect(cancelled).toBe(0);
    expect(document.activeElement).toBe(element().querySelector('.cancel-plan button'));

    // Asking again clears the error
    await click('.cancel-plan');
    expect(element().querySelector('.cancel-error')).toBeNull();
  });
});
