import { TestBed } from '@angular/core/testing';
import { SpotSlots } from './spot-slots';

describe('SpotSlots', () => {
  const render = (names: string[], free: number, size: 'sm' | 'md' = 'sm') => {
    const fixture = TestBed.createComponent(SpotSlots);
    fixture.componentRef.setInput('names', names);
    fixture.componentRef.setInput('free', free);
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('should show the initials of who is in and a dashed spot for each free one', () => {
    const element = render(['Ana Pruebas', 'diego'], 2);
    const people = Array.from(element.querySelectorAll('.person-slot')).map((slot) =>
      slot.textContent?.trim(),
    );
    expect(people).toEqual(['AP', 'D']);
    expect(element.querySelectorAll('.free-slot')).toHaveLength(2);
  });

  it('should summarise many free spots and grow when asked', () => {
    const element = render([], 7, 'md');
    expect(element.querySelectorAll('.free-slot')).toHaveLength(4);
    expect(element.textContent).toContain('+3');
    expect(element.className).toContain('spot-slots--md');
  });

  it('should show the photo of whoever has one, and the initials if its link expired', () => {
    const fixture = TestBed.createComponent(SpotSlots);
    fixture.componentRef.setInput('names', ['Ana Pruebas', 'Diego']);
    fixture.componentRef.setInput('photos', ['http://storage.test/ana.webp', null]);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const slots = element.querySelectorAll('.person-slot');

    expect(slots[0].querySelector('img')?.getAttribute('src')).toBe('http://storage.test/ana.webp');
    expect(slots[0].querySelector('img')?.getAttribute('alt')).toBe('');
    expect(slots[1].textContent?.trim()).toBe('D');

    slots[0].querySelector('img')!.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(element.querySelector('.person-slot')?.textContent?.trim()).toBe('AP');
  });

  it('should not break with an empty name', () => {
    expect(render([' '], 0).querySelector('.person-slot')?.textContent?.trim()).toBe('?');
  });
});
