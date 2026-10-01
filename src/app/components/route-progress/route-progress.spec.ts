import { TestBed } from '@angular/core/testing';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
  provideRouter,
} from '@angular/router';
import { Subject } from 'rxjs';
import { RouteProgress } from './route-progress';

describe('RouteProgress', () => {
  const events = new Subject<unknown>();

  const create = () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: Router, useValue: { events } }],
    });
    const fixture = TestBed.createComponent(RouteProgress);
    fixture.detectChanges();
    return {
      state: () => {
        fixture.detectChanges();
        return (fixture.nativeElement as HTMLElement).className;
      },
    };
  };

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('should show the bar only when a page takes a while, and fill it when it arrives', () => {
    const bar = create();
    events.next(new NavigationStart(1, '/profile'));
    expect(bar.state()).toContain('route-progress--idle');

    vi.advanceTimersByTime(150);
    expect(bar.state()).toContain('route-progress--loading');

    events.next(new NavigationEnd(1, '/profile', '/profile'));
    expect(bar.state()).toContain('route-progress--done');
    vi.advanceTimersByTime(500);
    expect(bar.state()).toContain('route-progress--idle');
  });

  it('should not flash for a fast or cancelled navigation', () => {
    const bar = create();
    events.next(new NavigationStart(2, '/'));
    events.next(new NavigationCancel(2, '/', ''));
    vi.advanceTimersByTime(500);
    expect(bar.state()).toContain('route-progress--idle');
  });
});
