import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { PhotosApi } from '@core/api/photos-api';
import { PlansApi } from '@core/api/plans-api';
import { SocialApi } from '@core/api/social-api';
import { Language } from '@core/i18n/language';
import { activityKey, activityOf } from '@shared/model/activities';
import { photoMap } from '@shared/model/photo';
import { RecentPlan } from '@shared/model/published-plan';
import { ConnectionPage, PersonList } from '@shared/model/social';
import { IconTile } from '@components/icon-tile/icon-tile';
import { PersonAvatar } from '@components/person-avatar/person-avatar';

type ActivityTab = 'plans' | PersonList;

/** A list loaded, with the photos of its people (one request per page) */
interface LoadedList {
  page: ConnectionPage;
  photos: Map<string, string>;
}

/**
 * What someone has been doing, in their social profile (HU-048): their last plans held, their followers and who they
 * follow. With a private profile that I do not follow, a message instead: the service says so too.
 */
@Component({
  selector: 'app-person-activity',
  imports: [
    Button,
    IconTile,
    NgTemplateOutlet,
    PersonAvatar,
    RouterLink,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    TranslocoPipe,
  ],
  templateUrl: './person-activity.html',
  styleUrl: './person-activity.scss',
})
export class PersonActivity {
  private readonly plansApi = inject(PlansApi);
  private readonly socialApi = inject(SocialApi);
  private readonly photosApi = inject(PhotosApi);
  private readonly language = inject(Language);

  readonly userId = input.required<string>();
  readonly name = input.required<string>();
  /** Whether their plans and their network are mine to see */
  readonly visible = input.required<boolean>();
  readonly followers = input(0);
  readonly following = input(0);

  protected readonly tab = signal<ActivityTab>('plans');
  /** null while loading; an empty list if it could not be loaded is not the same as an error */
  protected readonly plans = signal<RecentPlan[] | null>(null);
  protected readonly plansError = signal(false);
  protected readonly lists = signal<Partial<Record<PersonList, LoadedList>>>({});
  protected readonly listError = signal(false);
  protected readonly loadingMore = signal(false);

  protected readonly activityKey = activityKey;
  protected readonly activityOf = activityOf;
  private readonly dateFormat = computed(
    () => new Intl.DateTimeFormat(this.language.locale(), { day: 'numeric', month: 'short' }),
  );

  constructor() {
    effect(() => {
      const userId = this.userId();
      this.plans.set(null);
      this.plansError.set(false);
      this.lists.set({});
      if (this.visible()) {
        this.plansApi.recentOf(userId).subscribe({
          next: (plans) => this.plans.set(plans),
          error: () => this.plansError.set(true),
        });
      }
    });
  }

  protected show(tab: string | number | undefined): void {
    const chosen = tab as ActivityTab;
    this.tab.set(chosen);
    if (chosen !== 'plans' && !this.lists()[chosen]) {
      this.load(chosen, 0);
    }
  }

  protected date(plan: RecentPlan): string {
    return this.dateFormat().format(new Date(plan.startsAt));
  }

  protected loadedList(list: PersonList): LoadedList | undefined {
    return this.lists()[list];
  }

  protected more(list: PersonList): void {
    const loaded = this.lists()[list];
    if (loaded) {
      this.load(list, loaded.page.page + 1);
    }
  }

  protected hasMore(list: PersonList): boolean {
    const page = this.lists()[list]?.page;
    return !!page && page.items.length < page.total;
  }

  private load(list: PersonList, page: number): void {
    this.listError.set(false);
    this.loadingMore.set(page > 0);
    this.socialApi
      .listOf(this.userId(), list, page)
      .pipe(switchMap((loaded) => this.withPhotos(loaded)))
      .subscribe({
        next: (next) => this.append(list, next),
        error: () => {
          this.loadingMore.set(false);
          this.listError.set(true);
        },
      });
  }

  /** The photos of the people of a page, in one request; without them, the initials */
  private withPhotos(page: ConnectionPage): Observable<LoadedList> {
    const ids = page.items.map(({ userId }) => userId);
    return forkJoin({
      page: of(page),
      photos: ids.length
        ? this.photosApi.photosOf(ids).pipe(
            map(photoMap),
            catchError(() => of(new Map<string, string>())),
          )
        : of(new Map<string, string>()),
    });
  }

  private append(list: PersonList, next: LoadedList): void {
    const current = this.lists()[list];
    const merged: LoadedList = current
      ? {
          page: { ...next.page, items: [...current.page.items, ...next.page.items] },
          photos: new Map([...current.photos, ...next.photos]),
        }
      : next;
    this.lists.update((lists) => ({ ...lists, [list]: merged }));
    this.loadingMore.set(false);
  }
}
