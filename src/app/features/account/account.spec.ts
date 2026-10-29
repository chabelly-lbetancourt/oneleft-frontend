import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { UsersApi } from '@core/api/users-api';
import { Session } from '@core/auth/session';
import { NativePlatform } from '@core/platform';
import { ConsentStatus } from '@shared/model/account';
import { Account } from './account';

const ACCEPTED: ConsentStatus = {
  accepted: true,
  acceptedVersion: '2026-10-25',
  acceptedAt: '2026-10-30T09:00:00Z',
  currentVersion: '2026-10-25',
};

describe('Account', () => {
  let fixture: ComponentFixture<Account>;
  const api = {
    consent: vi.fn((): Observable<ConsentStatus> => of(ACCEPTED)),
    acceptConsent: vi.fn((): Observable<ConsentStatus> => of(ACCEPTED)),
    myData: vi.fn((): Observable<Blob> => of(new Blob(['{}'], { type: 'application/json' }))),
    deleteMyAccount: vi.fn((): Observable<void> => of(undefined)),
  };
  const session = { logout: vi.fn() };
  const platform = { isNative: vi.fn(() => false), shareFile: vi.fn(() => Promise.resolve()) };
  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const create = async () => {
    fixture = TestBed.createComponent(Account);
    await render();
  };
  const click = async (selector: string) => {
    element().querySelector<HTMLButtonElement>(`${selector} button`)!.click();
    await render();
  };
  const type = async (text: string) => {
    const input = element().querySelector<HTMLInputElement>('.delete-confirmation')!;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    api.consent.mockReturnValue(of(ACCEPTED));
    URL.createObjectURL = vi.fn(() => 'blob:data');
    URL.revokeObjectURL = vi.fn();
    TestBed.configureTestingModule({
      imports: [Account, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: UsersApi, useValue: api },
        { provide: Session, useValue: session },
        { provide: NativePlatform, useValue: platform },
      ],
    });
  });

  it('should show whether the privacy text was accepted, and let me accept it (HU-045)', async () => {
    await create();
    expect(element().querySelector('.consent-status')?.textContent).toContain(
      'Aceptaste el texto de privacidad',
    );
    expect(element().querySelector('.privacy-link')?.getAttribute('href')).toBe('/privacy');

    api.consent.mockReturnValue(of({ ...ACCEPTED, accepted: false, acceptedAt: null }));
    await create();
    expect(element().querySelector('.consent-status--missing')).not.toBeNull();
    await click('.account-accept');
    expect(api.acceptConsent).toHaveBeenCalledWith('2026-10-25');
    expect(element().querySelector('.consent-status--missing')).toBeNull();
  });

  it('should download my data as a file', async () => {
    const clicked = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);
    await create();

    await click('.account-download');

    expect(api.myData).toHaveBeenCalled();
    expect(clicked).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(element().querySelector('.download-done')).not.toBeNull();
    clicked.mockRestore();
  });

  it('should save the file with the share sheet in the Android app, which cannot download it', async () => {
    platform.isNative.mockReturnValue(true);
    await create();

    await click('.account-download');

    expect(platform.shareFile).toHaveBeenCalledWith(
      expect.any(Blob),
      'oneleft-my-data.json',
      'Descargar mis datos',
    );
    platform.isNative.mockReturnValue(false);
  });

  it('should explain why there is no file', async () => {
    api.myData.mockReturnValueOnce(
      throwError(() => new HttpErrorResponse({ status: 503, error: { code: 'data.unavailable' } })),
    );
    await create();

    await click('.account-download');

    expect(element().querySelector('.download-error')?.textContent).toContain(
      'no te damos un fichero incompleto',
    );
    expect(element().querySelector('.download-done')).toBeNull();
  });

  it('should say what is deleted and what stays, and delete only after typing the word', async () => {
    await create();
    const lists = [...element().querySelectorAll('.account-list')].map(
      (list) => list.children.length,
    );
    expect(lists).toEqual([5, 3]);
    const remove = () => element().querySelector<HTMLButtonElement>('.account-delete button')!;

    expect(remove().disabled).toBe(true);
    await type('eliminar mal');
    expect(remove().disabled).toBe(true);
    await type(' eliminar ');
    expect(remove().disabled).toBe(false);
    await click('.account-delete');

    expect(api.deleteMyAccount).toHaveBeenCalled();
    expect(session.logout).toHaveBeenCalled();
  });

  it('should keep the account and say so when it could not be deleted', async () => {
    api.deleteMyAccount.mockReturnValueOnce(
      throwError(
        () => new HttpErrorResponse({ status: 503, error: { code: 'account.unavailable' } }),
      ),
    );
    await create();
    await type('ELIMINAR');

    await click('.account-delete');

    expect(element().querySelector('.delete-error')?.textContent).toContain(
      'No se ha borrado nada',
    );
    expect(session.logout).not.toHaveBeenCalled();
  });

  it('should say when the consent cannot be known', async () => {
    api.consent.mockReturnValue(throwError(() => new Error('down')));
    await create();

    expect(element().querySelector('.field-error')?.textContent).toContain(
      'No se ha podido guardar',
    );
  });
});
