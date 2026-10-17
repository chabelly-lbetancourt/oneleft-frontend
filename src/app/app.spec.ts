import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Session } from '@core/auth/session';
import { FakeSession } from '@testing/fake-session';
import { translocoTesting } from '@testing/transloco-testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, translocoTesting()],
      // The menu of the Android app (HU-072) asks whether there is a session
      providers: [provideRouter([]), { provide: Session, useValue: new FakeSession() }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('router-outlet')).not.toBeNull();
    // On the web there is no menu at the bottom
    expect((fixture.nativeElement as HTMLElement).querySelector('app-tab-bar nav')).toBeNull();
  });
});
