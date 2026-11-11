import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { PlansApi } from '@core/api/plans-api';
import { UserEvents } from '@core/realtime/user-events';
import { JoinRequest, JoinRequestNotice, Plan } from '@shared/model/published-plan';
import { translocoTesting } from '@testing/transloco-testing';
import { JoinRequests } from './join-requests';

describe('JoinRequests', () => {
  let fixture: ComponentFixture<JoinRequests>;
  const api = { requests: vi.fn(), acceptRequest: vi.fn(), rejectRequest: vi.fn() };
  const joinRequest$ = new Subject<JoinRequestNotice>();
  const element = () => fixture.nativeElement as HTMLElement;
  const ask = (
    userId: string,
    name: string,
    status: JoinRequest['status'],
    message: string | null = null,
  ) =>
    ({
      userId,
      name,
      message,
      status,
      requestedAt: '2026-11-16T16:00:00Z',
      decidedAt: null,
    }) as JoinRequest;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    TestBed.configureTestingModule({
      imports: [JoinRequests, translocoTesting()],
      providers: [
        { provide: PlansApi, useValue: api },
        { provide: UserEvents, useValue: { joinRequest$ } },
      ],
    });
    fixture = TestBed.createComponent(JoinRequests);
    fixture.componentRef.setInput('plan', { id: 'plan-1', requiresApproval: true } as Plan);
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    api.requests.mockReturnValue(
      of([
        ask('lucia', 'Lucía', 'PENDING', '¡Me encantaría!'),
        ask('diego', 'Diego', 'PENDING'),
        ask('marta', 'Marta', 'REJECTED'),
        ask('javier', 'Javier', 'WITHDRAWN'),
      ]),
    );
  });

  it('should list only the pending requests with name and message', async () => {
    await create();

    const items = Array.from(element().querySelectorAll('.join-requests__item'));
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain('Lucía');
    expect(items[0].textContent).toContain('¡Me encantaría!');
    expect(items[1].querySelector('.join-requests__message')).toBeNull();
    expect(api.requests).toHaveBeenCalledWith('plan-1');
  });

  it('should say that nobody has asked when there are no pending requests', async () => {
    api.requests.mockReturnValue(of([]));
    await create();

    expect(element().querySelector('.join-requests__empty')?.textContent).toContain(
      'Nadie ha pedido',
    );
    expect(element().querySelector('.join-requests__item')).toBeNull();
  });

  it('should accept a request, reload the list and tell the page', async () => {
    api.acceptRequest.mockReturnValue(of(ask('lucia', 'Lucía', 'ACCEPTED')));
    await create();
    const changed = vi.fn();
    fixture.componentInstance.changed.subscribe(changed);

    element().querySelector<HTMLButtonElement>('.join-requests__accept button')!.click();
    await render();

    expect(api.acceptRequest).toHaveBeenCalledWith('plan-1', 'lucia');
    expect(api.requests).toHaveBeenCalledTimes(2);
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it('should reject a request', async () => {
    api.rejectRequest.mockReturnValue(of(ask('lucia', 'Lucía', 'REJECTED')));
    await create();

    element().querySelector<HTMLButtonElement>('.join-requests__reject button')!.click();
    await render();

    expect(api.rejectRequest).toHaveBeenCalledWith('plan-1', 'lucia');
  });

  it('should say why a decision failed and show the real state', async () => {
    api.acceptRequest.mockReturnValue(throwError(() => ({ error: { code: 'plan.full' } })));
    await create();

    element().querySelector<HTMLButtonElement>('.join-requests__accept button')!.click();
    await render();

    expect(element().querySelector('.join-requests__error')).not.toBeNull();
    expect(api.requests).toHaveBeenCalledTimes(2);
  });

  it('should refresh when someone asks for a spot in this plan and ignore other plans', async () => {
    await create();

    joinRequest$.next({ planId: 'other', title: 'x', requesterId: 'u', requesterName: 'U' });
    expect(api.requests).toHaveBeenCalledTimes(1);
    joinRequest$.next({ planId: 'plan-1', title: 'x', requesterId: 'u', requesterName: 'U' });

    expect(api.requests).toHaveBeenCalledTimes(2);
  });

  it('should show an empty list if the requests cannot be loaded', async () => {
    api.requests.mockReturnValue(throwError(() => ({ status: 403 })));
    await create();

    expect(element().querySelector('.join-requests__item')).toBeNull();
  });

  it('should show the age band of who asks, when they set it (HU-070)', async () => {
    api.requests.mockReturnValue(
      of([
        { ...ask('lucia', 'Lucía', 'PENDING'), ageBand: '25–34' },
        ask('diego', 'Diego', 'PENDING'),
      ]),
    );
    await create();

    const bands = element().querySelectorAll('.join-requests__age');
    expect(bands).toHaveLength(1);
    expect(bands[0].textContent).toContain('25–34');
  });
});
