import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { translocoTesting } from '@testing/transloco-testing';
import { Privacy } from './privacy';

describe('Privacy', () => {
  let fixture: ComponentFixture<Privacy>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Privacy, translocoTesting()],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(Privacy);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should show the privacy text with a heading for every section (HU-045)', () => {
    const element = fixture.nativeElement as HTMLElement;
    const headings = [...element.querySelectorAll('h2')].map((heading) =>
      heading.textContent?.trim(),
    );

    expect(headings).toEqual([
      'Quién trata tus datos',
      'Qué datos guardamos',
      'Para qué y con qué base',
      'Con quién los compartimos',
      'Cuánto los guardamos',
      'Tus derechos',
      'Menores',
    ]);
    expect(element.querySelector('.privacy-version')?.textContent).toContain('2026-10-25');
  });
});
