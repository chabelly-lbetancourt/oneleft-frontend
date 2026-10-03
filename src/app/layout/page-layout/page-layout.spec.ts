import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { translocoTesting } from '../../../testing/transloco-testing';
import { BottomBar } from '../bottom-bar/bottom-bar';
import { PageLayout } from './page-layout';

@Component({
  imports: [BottomBar, PageLayout],
  template: `
    <app-page-layout title="Mi página" [withBottomBar]="true">
      <button pageActions class="action">Compartir</button>
      <p class="content">Contenido</p>
      <app-bottom-bar><button class="main-action">Publicar</button></app-bottom-bar>
    </app-page-layout>
  `,
})
class Host {}

describe('PageLayout', () => {
  it('should place the actions in the header, the content and the bottom bar', () => {
    TestBed.configureTestingModule({
      imports: [translocoTesting()],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toBe('Mi página');
    expect(element.querySelector('header .action')).not.toBeNull();
    expect(element.querySelector('main .content')).not.toBeNull();
    expect(element.querySelector('main')?.className).toContain('layout__content--with-bar');
    expect(element.querySelector('app-bottom-bar .main-action')).not.toBeNull();
    expect(element.querySelector('.back-link')?.getAttribute('href')).toBe('/');
  });
});
