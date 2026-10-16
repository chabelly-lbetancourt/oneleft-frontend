import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { catchError, forkJoin, interval, map, Observable, of, switchMap } from 'rxjs';
import { PhotosApi } from '../../core/api/photos-api';
import { SocialApi } from '../../core/api/social-api';
import { Language } from '../../core/i18n/language';
import { UserEvents } from '../../core/realtime/user-events';
import { CardSkeleton } from '../../components/card-skeleton/card-skeleton';
import { EmptyState } from '../../components/empty-state/empty-state';
import { IconTile } from '../../components/icon-tile/icon-tile';
import { PersonAvatar } from '../../components/person-avatar/person-avatar';
import { PageLayout } from '../../layout/page-layout/page-layout';
import { activityKey, activityOf } from '../../shared/model/activities';
import { FeedActivityNotice, FeedItem, FeedPage, feedKey } from '../../shared/model/feed';
import { photoMap } from '../../shared/model/photo';
import { happenedAgo, RelativeTime } from '../../shared/time/plan-time';

/** The feed as far as it has been read, with the photos of the people in it. */
interface LoadedFeed {
  items: FeedItem[];
  total: number;
  page: number;
  photos: Map<string, string>;
}

/** A page read, with its photos (one request per page) */
interface PageWithPhotos {
  page: FeedPage;
  photos: Map<string, string>;
}

/** The size the service keeps cached: the first page opens at once */
const PAGE_SIZE = 20;
const MINUTE = 60_000;

/**
 * My feed (HU-051): the plans the people I follow publish, join and complete, the latest first, to discover plans and
 * keep up. New activity arrives while the page is open and is announced to screen readers.
 */
@Component({
  selector: 'app-feed',
  imports: [
    Button,
    CardSkeleton,
    EmptyState,
    IconTile,
    PageLayout,
    PersonAvatar,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed implements OnInit {
  private readonly api = inject(SocialApi);
  private readonly photosApi = inject(PhotosApi);
  private readonly language = inject(Language);
  private readonly transloco = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  /** null while the first page loads */
  protected readonly feed = signal<LoadedFeed | null>(null);
  protected readonly loadError = signal(false);
  protected readonly moreError = signal(false);
  protected readonly loadingMore = signal(false);
  /** Activity that arrived while the page was open, highlighted for a moment */
  protected readonly fresh = signal<ReadonlySet<string>>(new Set());
  /** Read by screen readers when new activity arrives */
  protected readonly announcement = signal('');
  /** «5 min ago» moves on by itself */
  private readonly now = signal(new Date());
  protected readonly hasMore = computed(() => {
    const feed = this.feed();
    return !!feed && feed.items.length < feed.total;
  });

  protected readonly activityKey = activityKey;
  protected readonly activityOf = activityOf;
  protected readonly key = feedKey;
  private readonly dateFormat = computed(
    () =>
      new Intl.DateTimeFormat(this.language.locale(), {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
  );

  constructor() {
    inject(UserEvents)
      .feedActivity$.pipe(takeUntilDestroyed())
      .subscribe((notice) => this.arrived(notice));
    interval(MINUTE)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.now.set(new Date()));
  }

  ngOnInit(): void {
    this.read(0).subscribe({
      next: (first) => this.feed.set(this.loaded(first)),
      error: () => this.loadError.set(true),
    });
  }

  protected more(): void {
    const feed = this.feed();
    if (!feed) {
      return;
    }
    this.loadingMore.set(true);
    this.moreError.set(false);
    this.read(feed.page + 1).subscribe({
      next: (next) => {
        this.loadingMore.set(false);
        this.feed.update((current) => current && this.append(current, next));
      },
      error: () => {
        this.loadingMore.set(false);
        this.moreError.set(true);
      },
    });
  }

  protected ago(item: FeedItem): RelativeTime {
    return happenedAgo(new Date(item.occurredAt), this.now());
  }

  protected startsAt(item: FeedItem): string {
    return this.dateFormat().format(new Date(item.startsAt));
  }

  /** New activity: the first page is read again and what was not shown yet goes on top */
  private arrived(notice: FeedActivityNotice): void {
    const feed = this.feed();
    if (!feed || feed.items.some((item) => feedKey(item) === feedKey(notice))) {
      return;
    }
    this.announcement.set(
      this.transloco.translate('feed.newActivity', {
        name: notice.actorName,
        what: this.transloco.translate(`feed.${notice.type}`),
      }),
    );
    this.read(0).subscribe({
      next: (first) =>
        this.feed.update((current) => {
          if (!current) {
            return current;
          }
          const shown = new Set(current.items.map(feedKey));
          const added = first.page.items.filter((item) => !shown.has(feedKey(item)));
          this.now.set(new Date());
          this.fresh.set(new Set(added.map(feedKey)));
          return {
            ...current,
            items: [...added, ...current.items],
            total: first.page.total,
            photos: new Map([...current.photos, ...first.photos]),
          };
        }),
      // The notice was told; the list will catch up the next time it is opened
      error: () => undefined,
    });
  }

  private read(page: number): Observable<PageWithPhotos> {
    return this.api.feed(page, PAGE_SIZE).pipe(
      switchMap((read) => this.withPhotos(read)),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  /** The photos of the people of a page, in one request; without them, the initials */
  private withPhotos(page: FeedPage): Observable<PageWithPhotos> {
    const ids = [...new Set(page.items.map(({ actorId }) => actorId))];
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

  private loaded({ page, photos }: PageWithPhotos): LoadedFeed {
    this.now.set(new Date());
    return { items: page.items, total: page.total, page: page.page, photos };
  }

  /** New activity moves the pages: what is already shown is not repeated */
  private append(current: LoadedFeed, { page, photos }: PageWithPhotos): LoadedFeed {
    const shown = new Set(current.items.map(feedKey));
    return {
      items: [...current.items, ...page.items.filter((item) => !shown.has(feedKey(item)))],
      total: page.total,
      page: page.page,
      photos: new Map([...current.photos, ...photos]),
    };
  }
}
