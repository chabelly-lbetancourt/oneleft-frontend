import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FakeSession } from '../../../testing/fake-session';
import { translocoTesting } from '../../../testing/transloco-testing';
import { Session } from '../../core/auth/session';
import { AuthMode, AuthPage } from './auth-page';

describe('AuthPage', () => {
  let fixture: ComponentFixture<AuthPage>;
  let session: FakeSession;
  const element = () => fixture.nativeElement as HTMLElement;

  const render = (mode: AuthMode, returnUrl?: string) => {
    session = new FakeSession();
    TestBed.configureTestingModule({
      imports: [AuthPage, translocoTesting()],
      providers: [provideRouter([]), { provide: Session, useValue: session }],
    });
    fixture = TestBed.createComponent(AuthPage);
    fixture.componentRef.setInput('mode', mode);
    fixture.componentRef.setInput('returnUrl', returnUrl);
    fixture.detectChanges();
  };

  it('should sign in with email or Google and come back to the page that asked for it', () => {
    render('login', '/plans/new');
    expect(element().querySelector('h1')?.textContent).toContain('Entra en OneLeft');
    element().querySelector<HTMLButtonElement>('.email-login button')?.click();
    expect(session.login).toHaveBeenCalledWith('/plans/new');
    element().querySelector<HTMLButtonElement>('.google-login')?.click();
    expect(session.loginWithGoogle).toHaveBeenCalledWith('/plans/new');
    const link = element().querySelector('.switch-mode');
    expect(link?.getAttribute('href')).toBe('/register?returnUrl=%2Fplans%2Fnew');
    expect(element().querySelector('.perks')).toBeNull();
  });

  it('should register with email and show what OneLeft offers', () => {
    render('register');
    expect(element().querySelector('h1')?.textContent).toContain('Únete a OneLeft');
    element().querySelector<HTMLButtonElement>('.email-login button')?.click();
    expect(session.register).toHaveBeenCalledWith(undefined);
    expect(element().querySelector('.switch-mode')?.getAttribute('href')).toBe('/login');
    expect(element().querySelectorAll('.perks li')).toHaveLength(3);
  });
});
