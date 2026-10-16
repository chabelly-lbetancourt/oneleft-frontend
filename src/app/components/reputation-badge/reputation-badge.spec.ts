import { TestBed } from '@angular/core/testing';
import { translocoTesting } from '@testing/transloco-testing';
import { ReputationBadge } from './reputation-badge';

describe('ReputationBadge', () => {
  const render = (score: number) => {
    TestBed.configureTestingModule({ imports: [ReputationBadge, translocoTesting()] });
    const fixture = TestBed.createComponent(ReputationBadge);
    fixture.componentRef.setInput('score', score);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('should show the score, read as the reputation', () => {
    const badge = render(35);

    expect(badge.textContent?.replace(/\s+/g, ' ').trim()).toBe('Reputación 35');
    expect(badge.querySelector('.sr-only')?.textContent).toBe('Reputación');
    expect(badge.classList).not.toContain('reputation-badge--negative');
  });

  it('should mark a negative score', () => {
    expect(render(-15).classList).toContain('reputation-badge--negative');
  });
});
