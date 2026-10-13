import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Observable } from 'rxjs';
import { SocialApi } from '../../core/api/social-api';
import { ApiErrorMessage, apiErrorMessage } from '../../core/i18n/api-error';
import { CardSkeleton } from '../../components/card-skeleton/card-skeleton';
import { PageLayout } from '../../layout/page-layout/page-layout';
import { Connection, NetworkList, SocialAccount } from '../../shared/model/social';
import { initials } from '../../shared/text/initials';

/** A list as far as it has been read. */
interface Loaded {
  items: Connection[];
  total: number;
  page: number;
}

/** The tabs: the requests tab shows those waiting for me and those I sent. */
type NetworkTab = 'followers' | 'following' | 'requests';

const PAGE_SIZE = 20;

/** What each list says when it is empty */
const EMPTY: Record<NetworkList, string> = {
  followers: 'social.noFollowers',
  following: 'social.noFollowing',
  requests: 'social.noRequests',
  sent: 'social.noSent',
};

/**
 * «My network» (HU-047): public or private profile, my followers, the people I follow and the requests, with what
 * can be done with each of them.
 */
@Component({
  selector: 'app-network',
  imports: [
    Avatar,
    Button,
    CardSkeleton,
    FormsModule,
    Message,
    NgTemplateOutlet,
    PageLayout,
    RouterLink,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    ToggleSwitch,
    TranslocoPipe,
  ],
  templateUrl: './network.html',
  styleUrl: './social.scss',
})
export class Network implements OnInit {
  private readonly api = inject(SocialApi);
  private readonly transloco = inject(TranslocoService);

  protected readonly account = signal<SocialAccount | null>(null);
  protected readonly loadError = signal(false);
  protected readonly tab = signal<NetworkTab>('followers');
  protected readonly lists = signal<Partial<Record<NetworkList, Loaded>>>({});
  /** The person an action is running on */
  protected readonly busy = signal<string | null>(null);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  protected readonly isPrivate = computed(() => this.account()?.visibility === 'PRIVATE');
  protected readonly initials = initials;

  ngOnInit(): void {
    this.api.myAccount().subscribe({
      next: (account) => this.account.set(account),
      error: () => this.loadError.set(true),
    });
    this.show('followers');
  }

  protected show(tab: NetworkTab | string | number | undefined): void {
    const chosen = (tab as NetworkTab) ?? 'followers';
    this.tab.set(chosen);
    const lists: NetworkList[] = chosen === 'requests' ? ['requests', 'sent'] : [chosen];
    lists.filter((list) => !this.lists()[list]).forEach((list) => this.read(list, 0));
  }

  protected loadedList(list: NetworkList): Loaded | undefined {
    return this.lists()[list];
  }

  protected emptyKey(list: NetworkList): string {
    return EMPTY[list];
  }

  protected more(list: NetworkList): void {
    this.read(list, (this.lists()[list]?.page ?? 0) + 1);
  }

  protected setPrivate(isPrivate: boolean): void {
    this.error.set(null);
    this.api.changeVisibility(isPrivate ? 'PRIVATE' : 'PUBLIC').subscribe({
      next: (account) => {
        this.account.set(account);
        // Opening the profile accepted the requests: they are followers now
        this.forget('followers', 'requests');
        this.show(this.tab());
      },
      error: (error) => this.fail(error),
    });
  }

  protected accept(person: Connection): void {
    this.act(person, this.api.accept(person.userId), 'requests', 'followers');
  }

  protected decline(person: Connection): void {
    this.act(person, this.api.decline(person.userId), 'requests');
  }

  protected removeFollower(person: Connection): void {
    this.act(person, this.api.removeFollower(person.userId), 'followers');
  }

  protected unfollow(person: Connection, list: 'following' | 'sent'): void {
    this.act(person, this.api.unfollow(person.userId), list);
  }

  /** Runs an action on someone, takes them out of the list and refreshes the counts and the lists affected. */
  private act(
    person: Connection,
    request: Observable<unknown>,
    from: NetworkList,
    ...stale: NetworkList[]
  ) {
    this.busy.set(person.userId);
    this.error.set(null);
    request.subscribe({
      next: () => {
        this.busy.set(null);
        this.lists.update((lists) => {
          const list = lists[from];
          const items = list?.items.filter(({ userId }) => userId !== person.userId) ?? [];
          return {
            ...lists,
            [from]: list && { ...list, items, total: Math.max(0, list.total - 1) },
          };
        });
        this.forget(...stale);
        this.api.myAccount().subscribe((account) => this.account.set(account));
      },
      error: (error) => {
        this.busy.set(null);
        this.fail(error);
      },
    });
  }

  private read(list: NetworkList, page: number): void {
    this.api.list(list, page, PAGE_SIZE).subscribe({
      next: (result) =>
        this.lists.update((lists) => ({
          ...lists,
          [list]: {
            items: [...(page === 0 ? [] : (lists[list]?.items ?? [])), ...result.items],
            total: result.total,
            page,
          },
        })),
      error: (error) => this.fail(error),
    });
  }

  private forget(...lists: NetworkList[]): void {
    this.lists.update((current) => {
      const next = { ...current };
      lists.forEach((list) => delete next[list]);
      return next;
    });
  }

  private fail(error: unknown): void {
    this.error.set(apiErrorMessage(this.transloco, error, 'errors.socialFailed'));
  }
}
