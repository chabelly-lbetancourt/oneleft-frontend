import { TestBed } from '@angular/core/testing';
import { CardSkeleton } from './card-skeleton';

describe('CardSkeleton', () => {
  const render = (media: 'none' | 'block' | 'circle', lines: number) => {
    const fixture = TestBed.createComponent(CardSkeleton);
    fixture.componentRef.setInput('media', media);
    fixture.componentRef.setInput('lines', lines);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('should draw the title and the lines of text, hidden from screen readers', () => {
    const element = render('none', 3);
    // The title and three lines
    expect(element.querySelectorAll('app-skeleton.skeleton--line')).toHaveLength(4);
    expect(element.querySelector('app-skeleton')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should draw an avatar or an icon with a subtitle', () => {
    expect(render('circle', 1).querySelectorAll('.skeleton--circle')).toHaveLength(1);
    expect(render('block', 0).querySelectorAll('.skeleton--block')).toHaveLength(1);
  });
});
