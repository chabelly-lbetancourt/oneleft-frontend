import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { translocoTesting } from '@testing/transloco-testing';
import { FakeSession } from '@testing/fake-session';
import { ChatApi } from '@core/api/chat-api';
import { PlansApi } from '@core/api/plans-api';
import { Session } from '@core/auth/session';
import { ChatSocket } from '@core/realtime/chat-socket';
import { CHAT_PAGE, ChatEvent, ChatHistory, ChatMessage } from '@shared/model/chat';
import { PlanChat } from './plan-chat';

const message = (id: string, authorId: string, text: string, minute = 0): ChatMessage => ({
  id,
  authorId,
  authorName: authorId === 'me' ? 'Lucía' : 'Ana',
  text,
  sentAt: new Date(Date.UTC(2026, 9, 12, 18, minute)).toISOString(),
});

const history = (messages: ChatMessage[], open = true): ChatHistory => ({
  planId: 'plan-1',
  open,
  endsAt: '2026-10-12T21:00:00Z',
  messages,
});

describe('PlanChat', () => {
  let fixture: ComponentFixture<PlanChat>;
  let component: PlanChat & Record<string, unknown>;
  let events: Subject<ChatEvent>;
  const chat = { history: vi.fn() };
  const plans = { plan: vi.fn() };
  const send = vi.fn();
  const socket = { open: vi.fn() };
  const session = new FakeSession();

  const element = () => fixture.nativeElement as HTMLElement;
  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };
  const call = (name: string, ...args: unknown[]) =>
    (component[name] as (...a: unknown[]) => unknown)(...args);
  const field = () => element().querySelector<HTMLInputElement>('#chatText');
  const texts = () =>
    Array.from(element().querySelectorAll('.chat-message__text')).map((node) => node.textContent);

  const create = async (answer: unknown) => {
    chat.history.mockReturnValue(answer);
    fixture = TestBed.createComponent(PlanChat);
    component = fixture.componentInstance as PlanChat & Record<string, unknown>;
    fixture.componentRef.setInput('id', 'plan-1');
    await render();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    events = new Subject<ChatEvent>();
    socket.open.mockReturnValue({ events, send });
    plans.plan.mockReturnValue(of({ id: 'plan-1', title: 'Pádel 2 contra 2' }));
    session.signIn('Lucía', 'me');
    TestBed.configureTestingModule({
      imports: [PlanChat, translocoTesting()],
      providers: [
        provideRouter([]),
        { provide: ChatApi, useValue: chat },
        { provide: PlansApi, useValue: plans },
        { provide: ChatSocket, useValue: socket },
        { provide: Session, useValue: session },
      ],
    });
  });

  it('should show the history, mine apart, and then the messages in real time (HU-008)', async () => {
    await create(
      of(history([message('1', 'ana', 'Llevo bolas'), message('2', 'me', 'Genial', 1)])),
    );

    expect(element().querySelector('.chat-plan')?.textContent).toContain('Pádel 2 contra 2');
    expect(texts()).toEqual(['Llevo bolas', 'Genial']);
    expect(element().querySelectorAll('.chat-message--mine')).toHaveLength(1);
    expect(
      element().querySelector('.chat-message--mine .chat-message__author')?.textContent,
    ).toContain('Tú');
    expect(element().querySelector('[role="log"]')).not.toBeNull();
    expect(socket.open).toHaveBeenCalledWith('plan-1');
    expect(element().querySelector('.chat-status')?.textContent).toContain('Conectando');

    events.next({ type: 'ready', open: true, endsAt: '2026-10-12T21:00:00Z' });
    events.next({ type: 'message', message: message('3', 'ana', 'Estoy llegando', 2) });
    // The same message again (it was already in the history or arrived twice) is not repeated
    events.next({ type: 'message', message: message('3', 'ana', 'Estoy llegando', 2) });
    await render();
    expect(texts()).toEqual(['Llevo bolas', 'Genial', 'Estoy llegando']);
    expect(element().querySelector('.chat-status')?.textContent?.trim()).toBe('');
  });

  it('should send a message with Enter without leaving the page', async () => {
    await create(of(history([])));
    send.mockReturnValue(true);
    const input = field()!;
    input.value = 'Hola';
    input.dispatchEvent(new Event('input'));
    const submit = new Event('submit', { cancelable: true });
    element().querySelector('form')!.dispatchEvent(submit);

    expect(submit.defaultPrevented).toBe(true);
    expect(send).toHaveBeenCalledWith('Hola');
  });

  it('should send a message and keep it in the field when there is no connection', async () => {
    await create(of(history([])));
    expect(element().querySelector('.chat-empty')?.textContent).toContain('Saluda al grupo');

    const text = component['text'] as unknown as {
      setValue: (value: string) => void;
      value: string;
    };
    text.setValue('  Voy para allá  ');
    send.mockReturnValue(true);
    call('send');
    expect(send).toHaveBeenCalledWith('Voy para allá');
    expect(text.value).toBe('');

    text.setValue('Otra vez');
    send.mockReturnValue(false);
    call('send');
    await render();
    expect(text.value).toBe('Otra vez');
    expect(element().querySelector('.chat-notice')?.textContent).toContain('Sin conexión');

    text.setValue('   ');
    send.mockClear();
    call('send');
    expect(send).not.toHaveBeenCalled();
  });

  it('should explain the errors of a message', async () => {
    await create(of(history([])));

    events.next({ type: 'error', code: 'chat.tooFast' });
    await render();
    expect(element().querySelector('.chat-notice')?.textContent).toContain('Vas muy rápido');
    expect(field()).not.toBeNull();

    events.next({ type: 'error', code: 'chat.closed' });
    await render();
    expect(element().querySelector('.chat-read-only')?.textContent).toContain('solo lectura');
    expect(field()).toBeNull();
  });

  it('should be read-only once the plan is over, and when it is cancelled', async () => {
    await create(of(history([message('1', 'ana', 'Gran partido')], false)));
    expect(element().querySelector('.chat-read-only')).not.toBeNull();
    expect(field()).toBeNull();
    expect(texts()).toEqual(['Gran partido']);

    await create(of(history([])));
    expect(field()).not.toBeNull();
    events.next({ type: 'closed', code: 'chat.closed' });
    await render();
    expect(field()).toBeNull();
    expect(element().querySelector('.chat-empty')?.textContent).toContain('Nadie escribió');
  });

  it('should say why the chat cannot be opened', async () => {
    await create(throwError(() => ({ status: 403, error: { code: 'chat.notMember' } })));
    expect(element().querySelector('.chat-failure')?.textContent).toContain(
      'Solo quienes están en el plan',
    );
    expect(socket.open).not.toHaveBeenCalled();

    await create(throwError(() => ({ status: 0 })));
    expect(element().querySelector('.chat-failure')?.textContent).toContain('no está disponible');

    await create(of(history([])));
    events.next({ type: 'closed', code: 'chat.notMember' });
    await render();
    expect(element().querySelector('.chat-failure')).not.toBeNull();
  });

  it('should load the earlier messages a page at a time', async () => {
    const page = Array.from({ length: CHAT_PAGE }, (_, index) =>
      message(`n${index}`, 'ana', `Mensaje ${index}`, index),
    );
    await create(of(history(page)));
    expect(element().querySelector('.load-older')).not.toBeNull();

    chat.history.mockReturnValue(of(history([message('o1', 'ana', 'El primero'), page[0]])));
    call('loadOlder');
    await render();

    expect(chat.history).toHaveBeenLastCalledWith('plan-1', page[0].sentAt);
    expect(texts()[0]).toBe('El primero');
    expect(texts()).toHaveLength(CHAT_PAGE + 1);
    expect(element().querySelector('.load-older')).toBeNull();
  });
});
