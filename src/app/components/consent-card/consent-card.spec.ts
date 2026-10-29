import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { UsersApi } from '@core/api/users-api';
import { Session } from '@core/auth/session';
import { ConsentStatus } from '@shared/model/account';
import { ConsentCard } from './consent-card';

const MISSING: ConsentStatus = {
  accepted: false,
  acceptedVersion: null,
  acceptedAt: null,
  currentVersion: '2026-10-25',
};

describe('ConsentCard', () => {
  let fixture: ComponentFixture<ConsentCard>;
  const authenticated = signal(true);
  const api = {
    consent: vi.fn((): Observable<ConsentStatus> => of(MISSING)),
    acceptConsent: vi.fn((version: string): Observable<ConsentStatus> =>
      of({
        accepted: true,
        acceptedVersion: version,
        acceptedAt: '2026-10-30T09:00:00Z',
        currentVersion: version,
      }),
    ),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const create = async () => {
    fixture = TestBed.createComponent(ConsentCard);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    authenticated.set(true);
    api.consent.mockReturnValue(of(MISSING));
    TestBed.configureTestingModule({
      imports: [ConsentCard, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: UsersApi, useValue: api },
        { provide: Session, useValue: { isAuthenticated: authenticated } },
      ],
    });
  });

  it('should ask for the privacy text until it is accepted, and then disappear (HU-045)', async () => {
    await create();
    expect(element().querySelector('.consent-card__title')?.textContent).toContain('Tu privacidad');
    expect(element().querySelector('.consent-read')?.getAttribute('href')).toBe('/privacy');

    element().querySelector<HTMLButtonElement>('.consent-accept button')!.click();
    fixture.detectChanges();

    expect(api.acceptConsent).toHaveBeenCalledWith('2026-10-25');
    expect(element().querySelector('.consent-card')).toBeNull();
  });

  it('should say that the text changed to whoever accepted an older one', async () => {
    api.consent.mockReturnValue(of({ ...MISSING, acceptedVersion: '2025-01-01' }));
    await create();

    expect(element().querySelector('.consent-card__title')?.textContent).toContain('actualizado');
  });

  it('should show nothing without a session, once accepted or when the service does not answer', async () => {
    authenticated.set(false);
    await create();
    expect(api.consent).not.toHaveBeenCalled();
    expect(element().querySelector('.consent-card')).toBeNull();

    authenticated.set(true);
    api.consent.mockReturnValue(of({ ...MISSING, accepted: true, acceptedVersion: '2026-10-25' }));
    await create();
    expect(element().querySelector('.consent-card')).toBeNull();

    api.consent.mockReturnValue(throwError(() => new Error('down')));
    await create();
    expect(element().querySelector('.consent-card')).toBeNull();
  });

  it('should say when it could not be saved', async () => {
    api.acceptConsent.mockReturnValueOnce(throwError(() => new Error('down')));
    await create();

    element().querySelector<HTMLButtonElement>('.consent-accept button')!.click();
    fixture.detectChanges();

    expect(element().querySelector('.consent-error')?.textContent).toContain(
      'No se ha podido guardar',
    );
    expect(element().querySelector('.consent-card')).not.toBeNull();
  });
});
