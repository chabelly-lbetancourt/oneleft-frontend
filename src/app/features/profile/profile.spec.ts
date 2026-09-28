import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FakeSession } from '../../../testing/fake-session';
import { Session } from '../../core/auth/session';
import { Profile } from './profile';

describe('Profile', () => {
  const ME = `${environment.apiUrl}/api/v1/users/me`;
  let fixture: ComponentFixture<Profile>;
  let http: HttpTestingController;
  let session: FakeSession;

  beforeEach(() => {
    session = new FakeSession();
    session.signIn('Admin Pruebas');
    TestBed.configureTestingModule({
      imports: [Profile],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Session, useValue: session },
      ],
    });
    fixture = TestBed.createComponent(Profile);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  const element = () => fixture.nativeElement as HTMLElement;

  it('should show a loading message while the profile is requested', () => {
    expect(element().textContent).toContain('Cargando tu perfil');
    http.expectOne(ME).flush({ id: '1', name: 'x', email: 'x@y.z', roles: [] });
  });

  it('should show the profile returned by the API', async () => {
    http.expectOne(ME).flush({
      id: 'a624d063-bd1e-442d-b52d-8de2df356c13',
      name: 'Admin Pruebas',
      email: 'admin@oneleft.dev',
      roles: ['ADMIN', 'USER'],
    });
    await fixture.whenStable();
    fixture.detectChanges();

    const card = element().querySelector('.profile-card');
    expect(card?.textContent).toContain('Admin Pruebas');
    expect(card?.textContent).toContain('admin@oneleft.dev');
    const tags = Array.from(element().querySelectorAll('p-tag')).map((t) => t.textContent?.trim());
    expect(tags).toEqual(['Administrador', 'Usuario']);
  });

  it('should show an error when the API fails', async () => {
    http.expectOne(ME).flush('error', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    fixture.detectChanges();
    expect(element().querySelector('.profile-error')).not.toBeNull();
  });

  it('should log out from the profile', async () => {
    http.expectOne(ME).flush({ id: '1', name: 'Ana', email: 'ana@oneleft.dev', roles: ['USER'] });
    await fixture.whenStable();
    fixture.detectChanges();
    (element().querySelector('p-button[label="Cerrar sesión"] button') as HTMLButtonElement).click();
    expect(session.logout).toHaveBeenCalled();
  });
});
