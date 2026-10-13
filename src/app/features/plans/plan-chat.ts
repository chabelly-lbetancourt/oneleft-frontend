import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { catchError, of } from 'rxjs';
import { ChatApi } from '../../core/api/chat-api';
import { PlansApi } from '../../core/api/plans-api';
import { Session } from '../../core/auth/session';
import { Language } from '../../core/i18n/language';
import { ChatConnection, ChatSocket } from '../../core/realtime/chat-socket';
import { CardSkeleton } from '../../components/card-skeleton/card-skeleton';
import { BottomBar } from '../../layout/bottom-bar/bottom-bar';
import { PageLayout } from '../../layout/page-layout/page-layout';
import {
  CHAT_MAX_LENGTH,
  CHAT_PAGE,
  ChatEvent,
  ChatHistory,
  ChatMessage,
} from '../../shared/model/chat';
import { clockTime } from '../../shared/time/plan-time';

/**
 * The chat of a plan (HU-008), for its organizer and participants: the history, the messages in real time through the
 * WebSocket of the gateway, and read-only once the plan is over.
 */
@Component({
  selector: 'app-plan-chat',
  imports: [
    BottomBar,
    Button,
    CardSkeleton,
    InputText,
    Message,
    PageLayout,
    ReactiveFormsModule,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './plan-chat.html',
  styleUrl: './plan-chat.scss',
})
export class PlanChat implements OnInit {
  readonly id = input.required<string>();

  private readonly chat = inject(ChatApi);
  private readonly plans = inject(PlansApi);
  private readonly socket = inject(ChatSocket);
  private readonly session = inject(Session);
  private readonly language = inject(Language);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly end = viewChild<ElementRef<HTMLElement>>('end');
  private connection: ChatConnection | null = null;

  protected readonly maxLength = CHAT_MAX_LENGTH;
  protected readonly title = signal<string | null>(null);
  protected readonly messages = signal<ChatMessage[]>([]);
  protected readonly loading = signal(true);
  /** Why the chat cannot be shown: a translation code such as chat.notMember */
  protected readonly failure = signal<string | null>(null);
  protected readonly open = signal(true);
  protected readonly connecting = signal(true);
  /** Why the last message was not sent */
  protected readonly notice = signal<string | null>(null);
  protected readonly hasOlder = signal(false);
  protected readonly loadingOlder = signal(false);
  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly text = this.fb.control('', [Validators.maxLength(CHAT_MAX_LENGTH)]);
  /** The form keeps Enter from reloading the page: it sends the message instead */
  protected readonly form = this.fb.group({ text: this.text });

  ngOnInit(): void {
    this.plans
      .plan(this.id())
      .pipe(catchError(() => of(null)))
      .subscribe((plan) => this.title.set(plan?.title ?? null));
    this.chat.history(this.id()).subscribe({
      next: (history) => {
        this.show(history);
        this.connect();
      },
      error: (error) => {
        this.loading.set(false);
        this.failure.set(error?.error?.code ?? 'chat.unavailable');
      },
    });
  }

  protected isMine(message: ChatMessage): boolean {
    return message.authorId === this.session.userId();
  }

  protected time(message: ChatMessage): string {
    return clockTime(new Date(message.sentAt), this.language.locale());
  }

  protected send(): void {
    const text = this.text.value.trim();
    if (!text || !this.open() || this.text.invalid) {
      return;
    }
    if (this.connection?.send(text)) {
      this.text.setValue('');
      this.notice.set(null);
    } else {
      this.notice.set('chat.offline');
    }
  }

  protected loadOlder(): void {
    const first = this.messages()[0];
    if (!first) {
      return;
    }
    this.loadingOlder.set(true);
    this.chat.history(this.id(), first.sentAt).subscribe({
      next: (page) => {
        const known = new Set(this.messages().map(({ id }) => id));
        this.messages.update((list) => [
          ...page.messages.filter(({ id }) => !known.has(id)),
          ...list,
        ]);
        this.hasOlder.set(page.messages.length === CHAT_PAGE);
        this.loadingOlder.set(false);
      },
      error: () => this.loadingOlder.set(false),
    });
  }

  private show(history: ChatHistory): void {
    this.messages.set(history.messages);
    this.open.set(history.open);
    this.hasOlder.set(history.messages.length === CHAT_PAGE);
    this.loading.set(false);
    this.scrollToEnd();
  }

  private connect(): void {
    this.connection = this.socket.open(this.id());
    this.connection.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.on(event));
  }

  private on(event: ChatEvent): void {
    switch (event.type) {
      case 'connecting':
        this.connecting.set(true);
        break;
      case 'ready':
        this.connecting.set(false);
        this.open.set(event.open);
        break;
      case 'message':
        this.add(event.message);
        break;
      case 'error':
        this.notice.set(event.code);
        this.open.update((open) => open && event.code !== 'chat.closed');
        break;
      case 'closed':
        this.connecting.set(false);
        if (event.code === 'chat.closed') {
          this.open.set(false);
        } else {
          this.failure.set(event.code);
        }
        break;
    }
  }

  /** A message that arrives through the WebSocket; it may already be in the history. */
  private add(message: ChatMessage): void {
    if (this.messages().some(({ id }) => id === message.id)) {
      return;
    }
    this.messages.update((list) => [...list, message]);
    this.scrollToEnd();
  }

  private scrollToEnd(): void {
    afterNextRender(
      () => {
        const smooth = !globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        this.end()?.nativeElement.scrollIntoView?.({
          block: 'end',
          behavior: smooth ? 'smooth' : 'auto',
        });
      },
      { injector: this.injector },
    );
  }
}
