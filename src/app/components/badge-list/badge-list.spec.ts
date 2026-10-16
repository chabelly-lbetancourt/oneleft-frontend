import { TestBed } from '@angular/core/testing';
import { translocoTesting } from '@testing/transloco-testing';
import { BadgeProgress } from '@shared/model/reputation';
import { BadgeList } from './badge-list';

const BADGES: BadgeProgress[] = [
  {
    badge: 'ALWAYS_PUNCTUAL',
    progress: 20,
    goal: 20,
    earned: true,
    earnedAt: '2026-10-13T16:30:00Z',
  },
  { badge: 'NEIGHBOURHOOD_SOUL', progress: 12, goal: 50, earned: false, earnedAt: null },
];

describe('BadgeList', () => {
  const render = (progress: boolean) => {
    TestBed.configureTestingModule({ imports: [BadgeList, translocoTesting()] });
    const fixture = TestBed.createComponent(BadgeList);
    fixture.componentRef.setInput('badges', BADGES);
    fixture.componentRef.setInput('progress', progress);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('should show each badge with its icon, and the progress of the ones not earned when asked', () => {
    const list = render(true);

    const badges = list.querySelectorAll('.badge');
    expect(badges[0].querySelector('.pi-clock')).not.toBeNull();
    expect(badges[0].textContent).toContain('Siempre puntual');
    expect(badges[0].textContent).toContain('Llega a 20 planes seguidos');
    expect(badges[1].querySelector('progress')?.getAttribute('value')).toBe('12');
    expect(badges[1].textContent).toContain('12 de 50');
  });

  it('should not show the progress when not asked', () => {
    expect(render(false).querySelector('progress')).toBeNull();
  });
});
