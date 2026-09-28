import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FakeSession } from '../../../testing/fake-session';
import { UsersApi } from '../../core/api/users-api';
import { Session } from '../../core/auth/session';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { Catalog, MyProfile } from '../../shared/model/profile';
import { TranslocoService } from '@jsverse/transloco';
import { Profile } from './profile';
import { translocoTesting } from '../../../testing/transloco-testing';

const CATALOG: Catalog = {
  activities: ['PADEL', 'CINEMA', 'RUNNING'],
  levels: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
};

const PROFILE: MyProfile = {
  userId: 'a624d063',
  displayName: 'Ana',
  zone: { name: 'Vallecas', latitude: 40.39, longitude: -3.63 },
  hobbies: [{ activity: 'PADEL', level: 'INTERMEDIATE' }],
};

describe('Profile', () => {
  let fixture: ComponentFixture<Profile>;
  let component: Profile & Record<string, unknown>;
  let session: FakeSession;
  const api = {
    me: vi.fn(),
    myProfile: vi.fn(),
    catalog: vi.fn(),
    updateMyProfile: vi.fn(),
  };
  const location = { current: vi.fn() };

  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  // Access to the component's protected members from the tests
  const call = <T>(name: string, ...args: unknown[]) => (component[name] as (...a: unknown[]) => T)(...args);

  beforeEach(async () => {
    vi.clearAllMocks();
    api.me.mockReturnValue(of({ id: 'a624d063', name: 'Ana Test', email: 'ana@oneleft.dev', roles: ['ADMIN', 'USER'] }));
    api.myProfile.mockReturnValue(of(PROFILE));
    api.catalog.mockReturnValue(of(CATALOG));
    session = new FakeSession();
    session.signIn('Ana Test');
    TestBed.configureTestingModule({
      imports: [Profile, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: Session, useValue: session },
        { provide: UsersApi, useValue: api },
        { provide: ApproximateLocation, useValue: location },
      ],
    });
    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance as Profile & Record<string, unknown>;
    await render();
  });

  it('should show the account and fill the form with the stored profile', () => {
    expect(element().querySelector('.profile-card')?.textContent).toContain('Ana Test');
    const tags = Array.from(element().querySelectorAll('p-tag')).map((t) => t.textContent?.trim());
    expect(tags).toEqual(['Administrador', 'Usuario']);
    expect((element().querySelector('#displayName') as HTMLInputElement).value).toBe('Ana');
    expect((element().querySelector('#zoneName') as HTMLInputElement).value).toBe('Vallecas');
    expect(element().querySelector('.zone-coordinates')?.textContent).toContain('40.39, -3.63');
    expect(element().querySelectorAll('.hobby-row').length).toBe(1);
  });

  it('should show an error when the profile cannot be loaded', async () => {
    api.myProfile.mockReturnValue(throwError(() => new Error('500')));
    fixture = TestBed.createComponent(Profile);
    await render();
    expect(element().querySelector('.profile-error')).not.toBeNull();
  });

  it('should offer only activities not used in other rows', () => {
    call('addHobby');
    const options = call<{ code: string }[]>('activityOptions', 1).map((o) => o.code);
    expect(options).toEqual(['CINEMA', 'RUNNING']);
  });

  it('should add hobbies until every activity is used and remove them', async () => {
    call('addHobby');
    call('addHobby');
    expect(call<boolean>('canAddHobby')).toBe(false);
    call('addHobby');
    await render();
    expect(element().querySelectorAll('.hobby-row').length).toBe(3);
    call('removeHobby', 0);
    await render();
    expect(element().querySelectorAll('.hobby-row').length).toBe(2);
  });

  it('should use the approximate location of the device', async () => {
    location.current.mockResolvedValue({ latitude: 40.42, longitude: -3.7 });
    call('clearZone');
    await call<Promise<void>>('useMyLocation');
    await render();
    expect((element().querySelector('#zoneName') as HTMLInputElement).value).toBe('Mi zona');
    expect(element().querySelector('.zone-coordinates')?.textContent).toContain('40.42, -3.7');
  });

  it('should keep the zone name when using the location', async () => {
    location.current.mockResolvedValue({ latitude: 40.42, longitude: -3.7 });
    await call<Promise<void>>('useMyLocation');
    await render();
    expect((element().querySelector('#zoneName') as HTMLInputElement).value).toBe('Vallecas');
  });

  it('should explain why the location is not available', async () => {
    location.current.mockRejectedValue(new LocationError('denied'));
    await call<Promise<void>>('useMyLocation');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain('No se ha podido obtener tu ubicación');
  });

  it('should save the profile and confirm it', async () => {
    const saved: MyProfile = { ...PROFILE, displayName: 'Anita' };
    api.updateMyProfile.mockReturnValue(of(saved));
    (element().querySelector('#displayName') as HTMLInputElement).value = '  Anita ';
    element().querySelector('#displayName')!.dispatchEvent(new Event('input'));
    (element().querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    await render();
    expect(api.updateMyProfile).toHaveBeenCalledWith({
      displayName: 'Anita',
      zone: { name: 'Vallecas', latitude: 40.39, longitude: -3.63 },
      hobbies: [{ activity: 'PADEL', level: 'INTERMEDIATE' }],
    });
    expect(element().querySelector('.status-message')?.textContent).toContain('Perfil guardado');
  });

  it('should save without zone after removing it', async () => {
    api.updateMyProfile.mockReturnValue(of({ ...PROFILE, zone: null }));
    call('clearZone');
    call('save');
    expect(api.updateMyProfile).toHaveBeenCalledWith(expect.objectContaining({ zone: null }));
  });

  it('should show the reason given by the server when saving fails', async () => {
    api.updateMyProfile.mockReturnValue(
      throwError(() => ({ error: { code: 'profile.duplicateActivity', detail: 'Each activity can only appear once' } })),
    );
    call('save');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain('Cada actividad solo puede aparecer una vez');
    api.updateMyProfile.mockReturnValue(throwError(() => ({})));
    call('save');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain('No se ha podido guardar el perfil');
    api.updateMyProfile.mockReturnValue(throwError(() => ({ error: { code: 'unknown.code' } })));
    call('save');
    await render();
    expect(element().querySelector('.status-message')?.textContent).toContain('No se ha podido guardar el perfil');
  });

  it('should show levels, activities and roles in English', async () => {
    TestBed.inject(TranslocoService).setActiveLang('en');
    await render();
    const tags = Array.from(element().querySelectorAll('p-tag')).map((t) => t.textContent?.trim());
    expect(tags).toEqual(['Administrator', 'User']);
    expect(call<{ name: string }[]>('activityOptions', 0).map((o) => o.name)).toEqual(['Padel', 'Cinema', 'Running']);
    expect((component['levelOptions'] as () => { label: string }[])().map((o) => o.label)).toEqual([
      'Beginner',
      'Intermediate',
      'Advanced',
    ]);
    expect(element().querySelector('h1')?.textContent).toContain('My profile');
  });

  it('should not save an invalid profile', async () => {
    (element().querySelector('#displayName') as HTMLInputElement).value = '';
    element().querySelector('#displayName')!.dispatchEvent(new Event('input'));
    call('save');
    await render();
    expect(api.updateMyProfile).not.toHaveBeenCalled();
    expect(element().querySelector('.field-error')?.textContent).toContain('obligatorio');
  });

  it('should require the location when a zone name is written', async () => {
    call('clearZone');
    (element().querySelector('#zoneName') as HTMLInputElement).value = 'Moratalaz';
    element().querySelector('#zoneName')!.dispatchEvent(new Event('input'));
    call('save');
    await render();
    expect(api.updateMyProfile).not.toHaveBeenCalled();
    expect(element().textContent).toContain('pulsa «Usar mi ubicación»');
  });

  it('should log out', async () => {
    (element().querySelector('.logout-button button') as HTMLButtonElement).click();
    expect(session.logout).toHaveBeenCalled();
  });
});
