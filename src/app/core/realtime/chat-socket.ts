import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatEvent } from '../../shared/model/chat';
import { Session } from '../auth/session';

/**
 * The browser cannot add an Authorization header to a WebSocket: the token goes as the second subprotocol, after
 * this one, and the gateway answers with this one only.
 */
export const CHAT_PROTOCOL = 'oneleft.bearer';

/** First delay before reconnecting; it doubles on each failure up to {@link RECONNECT_MAX_MS}. */
export const RECONNECT_BASE_MS = 1000;
export const RECONNECT_MAX_MS = 30_000;

/** Close codes after which reconnecting makes no sense: the code of the reason. */
const FINAL_CLOSE: Record<number, string> = {
  4403: 'chat.notMember',
  4404: 'plan.notFound',
  4409: 'chat.closed',
};

/** WebSocket URL of the chat of a plan, through the gateway (ws:// locally, wss:// in pre and production). */
export const chatSocketUrl = (planId: string): string =>
  `${environment.apiUrl.replace(/^http/, 'ws')}/ws/chat?planId=${encodeURIComponent(planId)}`;

/** A connection to the chat of a plan: what arrives, and a way to write in it. */
export interface ChatConnection {
  /** Unsubscribing closes the connection. */
  events: Observable<ChatEvent>;
  /** False when the connection is not open: the text is not lost, the page keeps it in the field. */
  send(text: string): boolean;
}

/**
 * WebSocket of the chat (HU-008). It reconnects on its own with growing waits, unless the service closed it for good
 * (the person left the plan, or it was cancelled).
 */
@Injectable({ providedIn: 'root' })
export class ChatSocket {
  private readonly session = inject(Session);

  open(planId: string): ChatConnection {
    let socket: WebSocket | null = null;
    const events = new Observable<ChatEvent>((subscriber) => {
      let stopped = false;
      let failures = 0;
      let retry: ReturnType<typeof setTimeout> | undefined;

      const connect = async (): Promise<void> => {
        subscriber.next({ type: 'connecting' });
        const token = await this.session.accessToken();
        if (stopped) {
          return;
        }
        const current = new WebSocket(chatSocketUrl(planId), [CHAT_PROTOCOL, token]);
        socket = current;
        current.onopen = () => (failures = 0);
        current.onmessage = (message: MessageEvent<string>) => {
          try {
            subscriber.next(JSON.parse(message.data) as ChatEvent);
          } catch {
            // Not JSON: ignored
          }
        };
        current.onclose = (closed: CloseEvent) => {
          socket = null;
          if (stopped) {
            return;
          }
          const final = FINAL_CLOSE[closed.code];
          if (final) {
            subscriber.next({ type: 'closed', code: final });
            return;
          }
          failures++;
          const wait = Math.min(RECONNECT_MAX_MS, RECONNECT_BASE_MS * 2 ** (failures - 1));
          retry = setTimeout(() => void connect(), wait);
        };
      };

      void connect();
      return () => {
        stopped = true;
        clearTimeout(retry);
        socket?.close(1000);
        socket = null;
      };
    });
    return {
      events,
      send: (text: string) => {
        if (socket?.readyState !== WebSocket.OPEN) {
          return false;
        }
        socket.send(JSON.stringify({ text }));
        return true;
      },
    };
  }
}
