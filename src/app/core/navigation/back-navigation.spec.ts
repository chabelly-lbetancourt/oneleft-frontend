import { Location } from '@angular/common';
import { provideLocationMocks, SpyLocation } from '@angular/common/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { BackNavigation } from './back-navigation';

@Component({ template: '' })
class Page {}

describe('BackNavigation', () => {
  let router: Router;
  let location: Location;
  let navigation: BackNavigation;

  const settle = () => new Promise((resolve) => setTimeout(resolve));
  const goTo = async (url: string, replaceUrl = false) => {
    await router.navigateByUrl(url, { replaceUrl });
  };
  const back = async () => {
    navigation.back();
    // The router answers the popstate of the history on its own
    await settle();
    await settle();
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: Page }]), provideLocationMocks()],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    navigation = TestBed.inject(BackNavigation);
  });

  /** The app starts at a page, opened directly; the router follows the history from then on */
  const start = async (path: string) => {
    (location as SpyLocation).setInitialPath(path);
    router.initialNavigation();
    await settle();
  };

  it('should go back to the previous screens of the app, one by one', async () => {
    await start('/');
    await goTo('/feed');
    await goTo('/plans/p1');
    expect(navigation.canGoBack()).toBe(true);

    await back();
    expect(location.path()).toBe('/feed');
    await goTo('/people/ana');
    await back();
    expect(location.path()).toBe('/feed');
    await back();
    expect(location.path()).toBe('/');
    expect(navigation.canGoBack()).toBe(false);
  });

  it('should go to the home page, in place of the current one, when the page was opened directly', async () => {
    await start('/plans/p1');
    expect(navigation.canGoBack()).toBe(false);

    await back();

    expect(location.path()).toBe('/');
    // Nothing of the app is left behind: going back again stays at home
    expect(navigation.canGoBack()).toBe(false);
  });

  it('should go to the fallback it is given when there is nothing behind', async () => {
    await start('/plans/p1/chat');

    navigation.back('/plans/p1');
    await settle();

    expect(location.path()).toBe('/plans/p1');
  });

  it('should skip a screen that was replaced, like the form of a published plan', async () => {
    await start('/');
    await goTo('/plans/new');
    await goTo('/plans/p1', true);

    await back();

    expect(location.path()).toBe('/');
  });
});
