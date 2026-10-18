import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { ReputationApi } from '@core/api/reputation-api';
import { PlanKudos } from '@shared/model/reputation';
import { translocoTesting } from '@testing/transloco-testing';
import { PlanKudosPanel } from './plan-kudos';

const OPEN: PlanKudos = {
  open: true,
  until: '2026-10-25T12:00:00Z',
  people: [
    { userId: 'ana', organizer: true, given: null },
    { userId: 'diego', organizer: false, given: null },
  ],
};

describe('PlanKudosPanel', () => {
  let fixture: ComponentFixture<PlanKudosPanel>;
  const api = {
    planKudos: vi.fn((): Observable<PlanKudos> => of(OPEN)),
    giveKudos: vi.fn((): Observable<unknown> => of({})),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    fixture = TestBed.createComponent(PlanKudosPanel);
    fixture.componentRef.setInput('planId', 'p1');
    fixture.componentRef.setInput(
      'names',
      new Map([
        ['ana', 'Ana'],
        ['diego', 'Diego'],
      ]),
    );
    await render();
  };
  const person = (index: number) => element().querySelectorAll<HTMLElement>('.kudos-person')[index];
  const kinds = (index: number) =>
    [...person(index).querySelectorAll('.kudos-kind')].map((kind) => kind.textContent?.trim());

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [PlanKudosPanel, translocoTesting()],
      providers: [{ provide: ReputationApi, useValue: api }],
    });
  });

  it('should offer kudos to the others who arrived, organized well only to the organizer', async () => {
    await create();

    expect(api.planKudos).toHaveBeenCalledWith('p1');
    expect(element().querySelector('.plan-kudos__hint')?.textContent).toContain('25 de octubre');
    expect(person(0).querySelector('.kudos-person__name')?.textContent).toContain('Ana');
    expect(kinds(0)).toEqual([
      'Puntual ⏰',
      'Buen rollo 😄',
      'Gran nivel 💪',
      'Organizó genial 📋',
    ]);
    expect(kinds(1)).toEqual(['Puntual ⏰', 'Buen rollo 😄', 'Gran nivel 💪']);
    expect(person(1).querySelector('[role="group"]')?.getAttribute('aria-label')).toBe(
      'Kudos para Diego',
    );
  });

  it('should give a kudos and show it instead of the choices', async () => {
    await create();

    person(0).querySelectorAll<HTMLButtonElement>('.kudos-kind')[3].click();
    await render();

    expect(api.giveKudos).toHaveBeenCalledWith('p1', 'ana', 'GREAT_ORGANIZER');
    expect(person(0).querySelector('.kudos-person__given')?.textContent).toContain(
      'Le diste «Organizó genial 📋»',
    );
    expect(person(0).querySelector('.kudos-kind')).toBeNull();
    expect(kinds(1)).toHaveLength(3);
  });

  it('should say why a kudos could not be given and show what the service says', async () => {
    await create();
    api.giveKudos.mockReturnValueOnce(
      throwError(
        () => new HttpErrorResponse({ status: 409, error: { code: 'kudos.alreadyGiven' } }),
      ),
    );
    api.planKudos.mockReturnValueOnce(
      of({ ...OPEN, people: [{ ...OPEN.people[0], given: 'PUNCTUAL' }, OPEN.people[1]] }),
    );

    person(0).querySelector<HTMLButtonElement>('.kudos-kind')!.click();
    await render();

    expect(element().querySelector('.plan-kudos__error')?.textContent).toContain(
      'Ya le diste un kudos en este plan',
    );
    expect(person(0).querySelector('.kudos-person__given')?.textContent).toContain('Puntual');
  });

  it('should only show what was given once the week is over', async () => {
    api.planKudos.mockReturnValueOnce(
      of({
        open: false,
        until: '2026-10-11T12:00:00Z',
        people: [{ ...OPEN.people[0], given: 'GOOD_VIBES' }, OPEN.people[1]],
      }),
    );
    await create();

    expect(element().querySelector('.plan-kudos__hint')?.textContent).toContain(
      'Ya no se pueden dar kudos',
    );
    expect(element().querySelector('.kudos-kind')).toBeNull();
    expect(person(0).querySelector('.kudos-person__given')).not.toBeNull();
  });

  it('should show nothing to whoever did not arrive', async () => {
    api.planKudos.mockReturnValueOnce(of({ open: false, until: null, people: [] }));
    await create();

    expect(element().querySelector('.plan-kudos')).toBeNull();
  });
});
