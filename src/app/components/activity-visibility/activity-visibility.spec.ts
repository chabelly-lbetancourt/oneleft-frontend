import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, Subject, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { SocialApi } from '@core/api/social-api';
import { HiddenPlan } from '@shared/model/social';
import { ActivityVisibility } from './activity-visibility';

describe('ActivityVisibility', () => {
  let fixture: ComponentFixture<ActivityVisibility>;
  const api = {
    hiddenPlan: vi.fn((planId: string): Observable<HiddenPlan> => of({ planId, hidden: false })),
    hidePlan: vi.fn((): Observable<void> => of(undefined)),
    showPlan: vi.fn((): Observable<void> => of(undefined)),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const toggle = () => element().querySelector<HTMLInputElement>('#activity-visibility-p1')!;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    fixture = TestBed.createComponent(ActivityVisibility);
    fixture.componentRef.setInput('planId', 'p1');
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [ActivityVisibility, translocoTesting()],
      providers: [{ provide: SocialApi, useValue: api }],
    });
  });

  it('should show the plan in my activity by default and hide it when I want', async () => {
    await create();

    expect(api.hiddenPlan).toHaveBeenCalledWith('p1');
    expect(toggle().checked).toBe(true);
    expect(element().querySelector('label')?.getAttribute('for')).toBe('activity-visibility-p1');
    expect(element().textContent).toContain('Tus seguidores ven en su feed que estás en este plan');

    toggle().click();
    await render();

    expect(api.hidePlan).toHaveBeenCalledWith('p1');
    expect(toggle().checked).toBe(false);
    expect(element().textContent).toContain('Oculto: tus seguidores no ven este plan');

    toggle().click();
    await render();

    expect(api.showPlan).toHaveBeenCalledWith('p1');
    expect(toggle().checked).toBe(true);
  });

  it('should start hidden for a plan I already hid', async () => {
    api.hiddenPlan.mockReturnValueOnce(of({ planId: 'p1', hidden: true }));
    await create();

    expect(toggle().checked).toBe(false);
  });

  it('should go back to what is saved when the change fails', async () => {
    await create();
    const answer = new Subject<void>();
    api.hidePlan.mockReturnValueOnce(answer);

    toggle().click();
    await render();
    expect(toggle().checked).toBe(false);
    answer.error(new Error('down'));
    await render();

    expect(toggle().checked).toBe(true);
    expect(element().querySelector('.activity-visibility__error')?.textContent).toContain(
      'No se ha podido completar',
    );
  });

  it('should not let me change it while it is not known', async () => {
    api.hiddenPlan.mockReturnValueOnce(new Subject<HiddenPlan>());
    await create();
    expect(toggle().disabled).toBe(true);

    api.hiddenPlan.mockReturnValueOnce(throwError(() => new Error('down')));
    await create();
    expect(toggle().disabled).toBe(true);
    expect(element().textContent).toContain('Ahora no se puede saber');
  });
});
