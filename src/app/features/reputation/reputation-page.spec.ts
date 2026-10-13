import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '../../../testing/transloco-testing';
import { ReputationApi } from '../../core/api/reputation-api';
import { LedgerEntry, LedgerPage, Reputation } from '../../shared/model/reputation';
import { ReputationPage } from './reputation-page';

const entry = (
  reason: LedgerEntry['reason'],
  points: number,
  planTitle: string | null,
): LedgerEntry => ({
  reason,
  points,
  planId: planTitle ? `plan-${reason}` : null,
  planTitle,
  occurredAt: '2026-10-13T16:30:00Z',
});

describe('ReputationPage', () => {
  let fixture: ComponentFixture<ReputationPage>;
  const api = {
    mine: vi.fn((): Observable<Reputation> => of({ userId: 'me', score: 15 })),
    ledger: vi.fn((page = 0): Observable<LedgerPage> =>
      of({
        items: [entry('NO_SHOW', -15, 'Running'), entry('ORGANIZED_HELD', 20, 'Pádel')],
        page,
        size: 20,
        total: 2,
      }),
    ),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    fixture = TestBed.createComponent(ReputationPage);
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [ReputationPage, translocoTesting()],
      providers: [provideRouter([]), { provide: ReputationApi, useValue: api }],
    });
  });

  it('should show my score, the rules and why it went up or down', async () => {
    await create();

    expect(element().querySelector('.score-card__value')?.textContent).toContain('15');
    const rules = [...element().querySelectorAll('.rule')].map((rule) => [
      rule.querySelector('.rule__text')?.textContent?.trim(),
      rule.querySelector('.points')?.textContent?.trim(),
    ]);
    expect(rules).toEqual([
      ['Llegar al punto de encuentro (check-in)', '+10'],
      ['Organizar un plan que se llena y se celebra', '+20'],
      ['No presentarte a un plan que se celebró', '−15'],
      ['Cancelar tu propio plan a menos de 1 h del inicio', '−10'],
      ['Un reporte confirmado contra ti', '−50'],
    ]);
    const entries = element().querySelectorAll('.entry');
    expect(entries[0].textContent).toContain('No te presentaste a «Running»');
    expect(entries[0].querySelector('.points--negative')?.textContent).toBe('−15');
    expect(entries[1].querySelector('a')?.getAttribute('href')).toBe('/plans/plan-ORGANIZED_HELD');
    expect(element().querySelector('.more-entries')).toBeNull();
  });

  it('should explain an entry without a plan and read more pages', async () => {
    api.ledger
      .mockReturnValueOnce(
        of({ items: [entry('CONFIRMED_REPORT', -50, null)], page: 0, size: 20, total: 2 }),
      )
      .mockReturnValueOnce(
        of({ items: [entry('ATTENDED', 10, 'Pádel')], page: 1, size: 20, total: 2 }),
      );
    await create();
    expect(element().querySelector('.entry')?.textContent).toContain(
      'Se confirmó un reporte contra ti',
    );
    expect(element().querySelector('.entry a')).toBeNull();

    element().querySelector<HTMLButtonElement>('.more-entries button')!.click();
    await render();

    expect(api.ledger).toHaveBeenLastCalledWith(1, 20);
    expect(element().querySelectorAll('.entry').length).toBe(2);
    expect(element().querySelector('.more-entries')).toBeNull();
  });

  it('should invite to start when the ledger is empty', async () => {
    api.mine.mockReturnValueOnce(of({ userId: 'me', score: 0 }));
    api.ledger.mockReturnValueOnce(of({ items: [], page: 0, size: 20, total: 0 }));
    await create();

    expect(element().querySelector('.empty-ledger')?.textContent).toContain(
      'Todavía no hay movimientos',
    );
  });

  it('should say when the reputation cannot be loaded', async () => {
    api.mine.mockReturnValueOnce(throwError(() => new Error('down')));
    await create();

    expect(element().querySelector('.reputation-error')?.textContent).toContain(
      'No se ha podido cargar tu reputación',
    );
  });
});
