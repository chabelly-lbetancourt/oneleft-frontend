import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { SocialApi } from '@core/api/social-api';
import { BlockedPage } from '@shared/model/safety';
import { BlockedPeople } from './blocked-people';

const page = (names: string[], total = names.length, from = 0): BlockedPage => ({
  items: names.map((name, index) => ({
    userId: `user-${from + index}`,
    name,
    since: '2026-10-24T18:00:00Z',
  })),
  page: 0,
  size: 20,
  total,
});

describe('BlockedPeople', () => {
  let fixture: ComponentFixture<BlockedPeople>;
  const api = {
    blocked: vi.fn((): Observable<BlockedPage> => of(page(['Diego Pruebas', 'Marta Pruebas']))),
    unblock: vi.fn((): Observable<void> => of(undefined)),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const names = () =>
    [...element().querySelectorAll('.connection__name')].map((name) => name.textContent?.trim());
  const create = async () => {
    fixture = TestBed.createComponent(BlockedPeople);
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [BlockedPeople, translocoTesting()],
      providers: [provideRouter([]), { provide: SocialApi, useValue: api }],
    });
  });

  it('should list the people I blocked and unblock them (HU-033)', async () => {
    await create();

    expect(api.blocked).toHaveBeenCalledWith(0, 20);
    expect(names()).toEqual(['Diego Pruebas', 'Marta Pruebas']);
    expect(element().querySelector('.connection__person')?.getAttribute('href')).toBe(
      '/people/user-0',
    );
    const unblock = element().querySelector<HTMLButtonElement>('.unblock-person button')!;
    expect(unblock.getAttribute('aria-label')).toBe('Desbloquear a Diego Pruebas');
    unblock.click();
    await render();

    expect(api.unblock).toHaveBeenCalledWith('user-0');
    expect(names()).toEqual(['Marta Pruebas']);
  });

  it('should load more people and say when there is nobody', async () => {
    api.blocked.mockReturnValueOnce(of(page(['Diego Pruebas'], 2)));
    await create();
    api.blocked.mockReturnValueOnce(of(page(['Marta Pruebas'], 2, 1)));
    element().querySelector<HTMLButtonElement>('.blocked-more button')!.click();
    await render();
    expect(api.blocked).toHaveBeenLastCalledWith(1, 20);
    expect(names()).toEqual(['Diego Pruebas', 'Marta Pruebas']);
    expect(element().querySelector('.blocked-more')).toBeNull();

    api.blocked.mockReturnValueOnce(of(page([])));
    await create();
    expect(element().querySelector('.no-blocked')?.textContent).toContain('No has bloqueado');
  });

  it('should explain when the list or an unblock fails', async () => {
    api.unblock.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 503 })));
    await create();
    element().querySelector<HTMLButtonElement>('.unblock-person button')!.click();
    await render();
    expect(element().querySelector('.social-error')?.textContent).toContain(
      'No se ha podido desbloquear',
    );
    expect(names()).toHaveLength(2);

    api.blocked.mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 503 })));
    await create();
    expect(element().querySelector('.blocked-error')?.textContent).toContain(
      'No se ha podido cargar',
    );
  });
});
