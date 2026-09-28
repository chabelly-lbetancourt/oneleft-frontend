import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Router, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { translocoTesting } from '../../../testing/transloco-testing';
import { TranslatedTitleStrategy } from './translated-title-strategy';

@Component({ template: '' })
class Blank {}

describe('TranslatedTitleStrategy', () => {
  it('should translate the route title and follow the language', async () => {
    TestBed.configureTestingModule({
      imports: [translocoTesting()],
      providers: [
        provideRouter([
          { path: 'profile', component: Blank, title: 'titles.profile' },
          { path: 'untitled', component: Blank },
        ]),
        { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
      ],
    });
    const router = TestBed.inject(Router);
    const title = TestBed.inject(Title);

    await router.navigateByUrl('/profile');
    expect(title.getTitle()).toBe('OneLeft · Mi perfil');

    TestBed.inject(TranslocoService).setActiveLang('en');
    expect(title.getTitle()).toBe('OneLeft · My profile');

    await router.navigateByUrl('/untitled');
    expect(title.getTitle()).toBe('OneLeft · Plans right now');
  });
});
