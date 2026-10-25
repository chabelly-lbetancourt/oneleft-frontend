import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { SocialApi } from '@core/api/social-api';
import { Report, ReportTarget } from '@shared/model/safety';
import { ReportForm } from './report-form';

describe('ReportForm', () => {
  let fixture: ComponentFixture<ReportForm>;
  let form: FormGroup;
  const closed = vi.fn();
  const api = { report: vi.fn((): Observable<Report> => of({} as Report)) };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async (target: ReportTarget = 'PERSON', organizerId?: string) => {
    fixture = TestBed.createComponent(ReportForm);
    fixture.componentRef.setInput('target', target);
    fixture.componentRef.setInput('targetId', target === 'PLAN' ? 'plan-1' : 'ana');
    if (organizerId) {
      fixture.componentRef.setInput('organizerId', organizerId);
    }
    fixture.componentInstance.closed.subscribe(closed);
    form = (fixture.componentInstance as unknown as Record<string, FormGroup>)['form'];
    await render();
  };
  const submit = async () => {
    element().querySelector('form')!.dispatchEvent(new Event('submit'));
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [ReportForm, translocoTesting()],
      providers: [{ provide: SocialApi, useValue: api }],
    });
  });

  it('should send the reason and what happened, and thank afterwards (HU-033)', async () => {
    await create();
    expect(element().querySelector('.report-form__title')?.textContent).toContain(
      'Reportar a esta persona',
    );

    form.setValue({ reason: 'HARASSMENT', comment: '  Insultos en el chat  ' });
    await submit();

    expect(api.report).toHaveBeenCalledWith({
      target: 'PERSON',
      targetId: 'ana',
      organizerId: undefined,
      reason: 'HARASSMENT',
      comment: 'Insultos en el chat',
    });
    expect(element().querySelector('.report-sent')?.textContent).toContain('Gracias');
    element().querySelector<HTMLButtonElement>('.report-close button')!.click();
    expect(closed).toHaveBeenCalled();
  });

  it('should report a plan with its organizer and without a comment', async () => {
    await create('PLAN', 'ana');
    expect(element().querySelector('.report-form__title')?.textContent).toContain(
      'Reportar este plan',
    );

    form.setValue({ reason: 'FAKE', comment: ' ' });
    await submit();

    expect(api.report).toHaveBeenCalledWith({
      target: 'PLAN',
      targetId: 'plan-1',
      organizerId: 'ana',
      reason: 'FAKE',
      comment: undefined,
    });
  });

  it('should need a reason, and a comment with another reason', async () => {
    await create();

    await submit();
    expect(element().querySelector('.field-error')?.textContent).toContain('Elige un motivo');

    form.setValue({ reason: 'OTHER', comment: '' });
    await render();
    expect(element().querySelector('label[for$="-comment"]')?.textContent?.trim()).toBe(
      'Qué ha pasado',
    );
    await submit();
    expect(element().querySelector('.field-error')?.textContent).toContain(
      'Cuéntanos qué ha pasado',
    );
    expect(api.report).not.toHaveBeenCalled();
  });

  it('should explain why it failed and close on cancel', async () => {
    api.report.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ status: 400, error: { code: 'report.self' } })),
    );
    await create();
    form.setValue({ reason: 'SPAM', comment: '' });

    await submit();

    expect(element().querySelector('.report-error')?.textContent).toContain(
      'No puedes reportarte a ti',
    );
    element().querySelector<HTMLButtonElement>('.report-cancel button')!.click();
    expect(closed).toHaveBeenCalled();
  });
});
