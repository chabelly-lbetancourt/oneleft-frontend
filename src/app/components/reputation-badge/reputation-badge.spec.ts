import { TestBed } from '@angular/core/testing';
import { translocoTesting } from '@testing/transloco-testing';
import { ReputationLevel } from '@shared/model/reputation';
import { ReputationBadge } from './reputation-badge';

describe('ReputationBadge', () => {
  const render = (score: number, level: ReputationLevel | null = null) => {
    TestBed.configureTestingModule({ imports: [ReputationBadge, translocoTesting()] });
    const fixture = TestBed.createComponent(ReputationBadge);
    fixture.componentRef.setInput('score', score);
    fixture.componentRef.setInput('level', level);
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

  it('should show the level with its emoji, read as the level', () => {
    const badge = render(600, 'NEIGHBOURHOOD_REFERENCE');

    const level = badge.querySelector('.reputation-badge__level')!;
    expect(level.textContent?.replace(/\s+/g, ' ').trim()).toBe('Nivel🔥 Referente del barrio');
    expect(level.querySelector('[aria-hidden="true"]')?.textContent).toBe('🔥');
    expect(badge.textContent).toContain('600');
  });

  it('should show no level while it is unknown', () => {
    expect(render(35).querySelector('.reputation-badge__level')).toBeNull();
  });
});
