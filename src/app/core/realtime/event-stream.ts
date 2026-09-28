import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../auth/session';
import { SseParser } from './sse-parser';

/** Delay before reconnecting after the server closes the stream (it expires every 30 min) or the network fails. */
export const RECONNECT_DELAY_MS = 5000;

/**
 * Server-Sent Events of the OneLeft API. The browser EventSource cannot send the access token, so the stream is read
 * with fetch and parsed with {@link SseParser}; it reconnects on its own. Unsubscribing closes the connection.
 */
@Injectable({ providedIn: 'root' })
export class EventStream {
  private readonly session = inject(Session);

  /** Data of every event called {@code eventName}, parsed as JSON. */
  open<T>(url: string, eventName: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      const controller = new AbortController();
      let retry: ReturnType<typeof setTimeout> | undefined;

      const connect = async (): Promise<void> => {
        try {
          const token = await this.session.accessToken();
          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`, Accept: 'text/event-stream' },
            signal: controller.signal,
          });
          if (!response.ok || !response.body) {
            throw new Error(`HTTP ${response.status}`);
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          const parser = new SseParser();
          for (;;) {
            const { value, done } = await reader.read();
            if (done) {
              break;
            }
            for (const message of parser.push(decoder.decode(value, { stream: true }))) {
              if (message.event === eventName) {
                subscriber.next(JSON.parse(message.data) as T);
              }
            }
          }
        } catch {
          // Network error or closed by the server: reconnect below unless the subscriber has gone
        }
        if (!controller.signal.aborted) {
          retry = setTimeout(() => void connect(), RECONNECT_DELAY_MS);
        }
      };

      void connect();
      return () => {
        controller.abort();
        clearTimeout(retry);
      };
    });
  }
}
