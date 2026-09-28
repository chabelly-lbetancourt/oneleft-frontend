import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { SAMPLE_PLANS } from './sample-plans';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
    fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('should show the main question', () => {
    expect(element.querySelector('h1')?.textContent).toContain('¿Te falta uno?');
  });

  it('should list every nearby plan', () => {
    expect(element.querySelectorAll('.plan-card').length).toBe(SAMPLE_PLANS.length);
  });

  it('should show the plans ordered by start time', () => {
    const titles = Array.from(element.querySelectorAll('.plan-card h3')).map((h) =>
      h.textContent?.trim(),
    );
    const expected = [...SAMPLE_PLANS]
      .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
      .map((p) => p.title);
    expect(titles).toEqual(expected);
  });

  it('should label free spots in singular and plural', () => {
    const labels = Array.from(element.querySelectorAll('p-tag')).map((t) => t.textContent?.trim());
    expect(labels).toContain('Falta 1');
    expect(labels).toContain('Faltan 2');
  });
});
