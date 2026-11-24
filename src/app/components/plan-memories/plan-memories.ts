import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  untracked,
} from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { catchError, firstValueFrom, lastValueFrom, map, of, Subject, switchMap, tap } from 'rxjs';
import { EmptyState } from '@components/empty-state/empty-state';
import { Skeleton } from '@components/skeleton/skeleton';
import { MemoriesApi, MEMORIES_PAGE_SIZE } from '@core/api/memories-api';
import { Session } from '@core/auth/session';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { Language } from '@core/i18n/language';
import { memoryPhoto } from '@shared/image/memory-photo';
import { PhotoFileError } from '@shared/image/square-photo';
import { Memory, MemoryPage } from '@shared/model/memory';

/** hidden: there is no album to show (the service does not have it yet, or I am not of the plan) */
type AlbumState = 'loading' | 'ready' | 'unavailable' | 'hidden';

/** What the first page of an album turned out to be */
type FirstPage = MemoryPage | Exclude<AlbumState, 'loading' | 'ready'>;

/** The result of uploading or removing, said in words and read out by screen readers */
interface Outcome extends ApiErrorMessage {
  severity: 'success' | 'error';
}

/** The photo being uploaded: its place among the chosen ones and how much has gone (0 to 100) */
interface UploadProgress {
  current: number;
  total: number;
  percent: number;
}

const isPage = (page: MemoryPage | null): page is MemoryPage => Array.isArray(page?.items);

/**
 * Memories of a plan that has finished (HU-052): the album its organizer and its participants share. Each photo is
 * made smaller in the browser and goes straight to the storage with a signed link; everyone removes only their own.
 * When the album cannot be read the rest of the plan stays as it is: the section says so, or is not shown at all.
 */
@Component({
  selector: 'app-plan-memories',
  imports: [Button, EmptyState, Skeleton, TranslocoPipe],
  templateUrl: './plan-memories.html',
  styleUrl: './plan-memories.scss',
})
export class PlanMemories {
  private readonly api = inject(MemoriesApi);
  private readonly session = inject(Session);
  private readonly transloco = inject(TranslocoService);
  private readonly language = inject(Language);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  readonly planId = input.required<string>();
  /** The names of the people of the plan, by id */
  readonly names = input.required<ReadonlyMap<string, string>>();

  protected readonly state = signal<AlbumState>('loading');
  private readonly memories = signal<Memory[]>([]);
  private readonly total = signal(0);
  /** Photos whose link no longer loads (it expires in an hour) */
  private readonly broken = signal<ReadonlySet<string>>(new Set());
  protected readonly loadingMore = signal(false);
  protected readonly uploading = signal<UploadProgress | null>(null);
  /** The photo of mine about to be removed, waiting for the confirmation */
  protected readonly confirming = signal<string | null>(null);
  protected readonly removing = signal<string | null>(null);
  protected readonly outcome = signal<Outcome | null>(null);
  protected readonly skeletons = [0, 1, 2];

  protected readonly photos = computed(() => {
    const me = this.session.userId();
    const names = this.names();
    const broken = this.broken();
    const format = new Intl.DateTimeFormat(this.language.locale(), {
      dateStyle: 'long',
      timeStyle: 'short',
    });
    return this.memories().map((memory) => ({
      ...memory,
      mine: memory.userId === me,
      name: names.get(memory.userId) ?? null,
      date: format.format(new Date(memory.uploadedAt)),
      broken: broken.has(memory.id),
    }));
  });
  protected readonly shown = computed(() => this.memories().length);
  protected readonly albumTotal = computed(() => Math.max(this.total(), this.shown()));
  protected readonly hasMore = computed(() => this.shown() < this.total());

  /** Plans to load: only the answer for the last one is shown */
  private readonly loads = new Subject<string>();

  constructor() {
    this.loads
      .pipe(
        switchMap((planId) => this.firstPage(planId)),
        takeUntilDestroyed(),
      )
      .subscribe((first) => this.show(first));
    effect(() => {
      const planId = this.planId();
      untracked(() => this.open(planId));
    });
  }

  /** Asks for the album again after it could not be read. */
  protected retry(): void {
    this.state.set('loading');
    this.loads.next(this.planId());
  }

  /**
   * The next photos. The page is worked out from what is shown, so photos added or removed meanwhile neither repeat
   * nor leave a gap for good: what was already there is skipped.
   */
  protected more(): void {
    const planId = this.planId();
    this.loadingMore.set(true);
    this.outcome.set(null);
    this.api.page(planId, Math.floor(this.shown() / MEMORIES_PAGE_SIZE)).subscribe({
      next: (page) => {
        this.loadingMore.set(false);
        if (planId !== this.planId() || !isPage(page)) {
          return;
        }
        const known = new Set(this.memories().map(({ id }) => id));
        const fresh = page.items.filter(({ id }) => !known.has(id));
        this.memories.update((memories) => [...memories, ...fresh]);
        // Nothing new means there is nothing left, whatever the count said
        this.total.set(fresh.length ? page.total : this.shown());
        this.focusPhoto(fresh[0]?.id);
      },
      error: (error) => {
        this.loadingMore.set(false);
        this.fail(error, 'errors.memoriesFailed');
      },
    });
  }

  /** Uploads the chosen photos one after another; the first one that fails stops the rest. */
  protected async choose(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = [...(input.files ?? [])];
    // The same files can be chosen again
    input.value = '';
    if (!files.length || this.uploading()) {
      return;
    }
    const planId = this.planId();
    this.outcome.set(null);
    try {
      for (const [index, file] of files.entries()) {
        this.uploading.set({ current: index + 1, total: files.length, percent: 0 });
        const memory = await this.upload(planId, file);
        if (planId !== this.planId()) {
          return;
        }
        this.memories.update((memories) => [memory, ...memories.filter((m) => m.id !== memory.id)]);
        this.total.update((total) => total + 1);
      }
      this.outcome.set({
        severity: 'success',
        key: files.length === 1 ? 'memories.uploaded' : 'memories.uploadedMany',
        params: { count: files.length },
      });
    } catch (error) {
      if (error instanceof PhotoFileError) {
        this.outcome.set({ severity: 'error', key: `memories.errors.${error.problem}` });
      } else {
        this.fail(error, 'errors.memoryUploadFailed');
      }
    } finally {
      this.uploading.set(null);
    }
  }

  protected askRemove(memoryId: string): void {
    this.outcome.set(null);
    this.confirming.set(memoryId);
    this.focus(`[data-confirm-for="${CSS.escape(memoryId)}"] button`);
  }

  protected cancelRemove(memoryId: string): void {
    this.confirming.set(null);
    this.focus(`[data-remove-for="${CSS.escape(memoryId)}"] button`);
  }

  protected remove(memoryId: string): void {
    const planId = this.planId();
    this.removing.set(memoryId);
    this.api.remove(planId, memoryId).subscribe({
      next: () => {
        this.removing.set(null);
        this.confirming.set(null);
        if (planId !== this.planId()) {
          return;
        }
        this.memories.update((memories) => memories.filter(({ id }) => id !== memoryId));
        this.total.update((total) => Math.max(0, total - 1));
        this.outcome.set({ severity: 'success', key: 'memories.removed' });
        // The photo and its buttons are gone: focus goes to what happened instead of falling back to the page
        this.focus('.plan-memories__outcome');
      },
      error: (error) => {
        this.removing.set(null);
        this.confirming.set(null);
        this.fail(error, 'errors.memoryRemoveFailed');
        this.focus('.plan-memories__outcome');
      },
    });
  }

  protected markBroken(memoryId: string): void {
    this.broken.update((broken) => new Set(broken).add(memoryId));
  }

  /** Another plan: nothing of the previous one until its album arrives. */
  private open(planId: string): void {
    this.state.set('loading');
    this.memories.set([]);
    this.total.set(0);
    this.broken.set(new Set());
    this.confirming.set(null);
    this.outcome.set(null);
    this.loads.next(planId);
  }

  /**
   * The newest photos or why there are none to show. A service that does not have the album yet (404), a plan I am
   * not in (403) or an answer that is not a page leave no section; anything else (the storage or the service do not
   * answer) is told in it, with a way to try again.
   */
  private firstPage(planId: string) {
    return this.api.page(planId, 0).pipe(
      map((page): FirstPage => (isPage(page) ? page : 'hidden')),
      catchError((error: { status?: number }) =>
        of<FirstPage>(error?.status === 404 || error?.status === 403 ? 'hidden' : 'unavailable'),
      ),
    );
  }

  private show(first: FirstPage): void {
    if (typeof first === 'string') {
      this.state.set(first);
      return;
    }
    this.memories.set(first.items);
    this.total.set(first.total);
    this.state.set('ready');
  }

  /** @throws PhotoFileError if the file cannot be a photo of the album, or the HTTP error of the step that failed */
  private async upload(planId: string, file: File): Promise<Memory> {
    const photo = await memoryPhoto(file);
    const link = await firstValueFrom(this.api.startUpload(planId, photo.type, photo.size));
    await lastValueFrom(
      this.api.upload(link, photo).pipe(
        tap((event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            const percent = Math.round((100 * event.loaded) / event.total);
            this.uploading.update((upload) => upload && { ...upload, percent });
          }
        }),
      ),
    );
    return firstValueFrom(this.api.confirm(planId, link.key));
  }

  private fail(error: unknown, fallback: string): void {
    this.outcome.set({ severity: 'error', ...apiErrorMessage(this.transloco, error, fallback) });
  }

  private focusPhoto(memoryId: string | undefined): void {
    if (memoryId) {
      this.focus(`[data-memory="${CSS.escape(memoryId)}"]`);
    }
  }

  private focus(selector: string): void {
    afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>(selector)?.focus(), {
      injector: this.injector,
    });
  }
}
