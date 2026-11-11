import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PlansApi } from '@core/api/plans-api';
import { Plan } from '@shared/model/published-plan';
import { translocoTesting } from '@testing/transloco-testing';
import { RequestSpot } from './request-spot';

describe('RequestSpot', () => {
  let fixture: ComponentFixture<RequestSpot>;
  const api = { askForSpot: vi.fn(), withdrawRequest: vi.fn() };
  const element = () => fixture.nativeElement as HTMLElement;
  const plan = (myRequest: Plan['myRequest'] = null) =>
    ({ id: 'plan-1', requiresApproval: true, myRequest }) as Plan;

  const create = async (current: Plan) => {
    TestBed.configureTestingModule({
      imports: [RequestSpot, translocoTesting()],
      providers: [{ provide: PlansApi, useValue: api }],
    });
    fixture = TestBed.createComponent(RequestSpot);
    fixture.componentRef.setInput('plan', current);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const request = (status: 'PENDING' | 'REJECTED') =>
    ({
      userId: 'me',
      name: 'Lucía',
      message: null,
      status,
      requestedAt: '2026-11-16T16:00:00Z',
      decidedAt: null,
    }) as const;

  beforeEach(() => vi.clearAllMocks());

  it('should ask for a spot with the message without surrounding spaces and tell the page', async () => {
    api.askForSpot.mockReturnValue(of(request('PENDING')));
    await create(plan());
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);
    const text = element().querySelector<HTMLTextAreaElement>('#request-message')!;
    text.value = '  ¡Me encantaría!  ';
    text.dispatchEvent(new Event('input'));
    await render();

    element().querySelector<HTMLButtonElement>('.request-spot__ask button')!.click();
    await render();

    expect(api.askForSpot).toHaveBeenCalledWith('plan-1', '¡Me encantaría!');
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it('should send no message when there is none, and limit it to what the service accepts', async () => {
    api.askForSpot.mockReturnValue(of(request('PENDING')));
    await create(plan());

    element().querySelector<HTMLButtonElement>('.request-spot__ask button')!.click();
    await render();

    expect(api.askForSpot).toHaveBeenCalledWith('plan-1', null);
    expect(element().querySelector<HTMLTextAreaElement>('#request-message')!.maxLength).toBe(140);
  });

  it('should show a pending request and let the person withdraw it', async () => {
    api.withdrawRequest.mockReturnValue(of(undefined));
    await create(plan(request('PENDING')));
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);

    expect(element().querySelector('.request-spot__pending')?.textContent).toContain(
      'Solicitud enviada',
    );
    expect(element().querySelector('.request-spot__ask')).toBeNull();
    element().querySelector<HTMLButtonElement>('.request-spot__withdraw button')!.click();
    await render();

    expect(api.withdrawRequest).toHaveBeenCalledWith('plan-1');
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it('should say kindly that the request was rejected and offer nothing else', async () => {
    await create(plan(request('REJECTED')));

    expect(element().querySelector('.request-spot__rejected')?.textContent).toContain(
      'no ha podido aceptarte',
    );
    expect(element().querySelector('.request-spot__ask')).toBeNull();
    expect(element().querySelector('.request-spot__withdraw')).toBeNull();
  });

  it('should explain why it failed and reload the plan', async () => {
    api.askForSpot.mockReturnValue(
      throwError(() => ({ error: { code: 'plan.alreadyRequested' } })),
    );
    await create(plan());
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);

    element().querySelector<HTMLButtonElement>('.request-spot__ask button')!.click();
    await render();

    expect(element().querySelector('.request-spot__error')?.textContent).toContain(
      'Ya has pedido plaza',
    );
    expect(changed).toHaveBeenCalledTimes(1);
  });
});
