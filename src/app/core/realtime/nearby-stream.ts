import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NearbyPlanEvent, NearbyQuery } from '../../shared/model/nearby';
import { PlansApi } from '../api/plans-api';
import { Session } from '../auth/session';
import { SseParser } from './sse-parser';

/** Delay before reconnecting after the server closes the stream (it expires every 30 min) or the network fails. */
export const RECONNECT_DELAY_MS = 5000;

/**
 * New plans near the user, in real time. The browser EventSource cannot send the access token, so the stream is
 * read with fetch and parsed here. Unsubscribing closes the connection.
 */
@Injectable({ providedIn: 'root' })
export class NearbyStream {
  private readonly api = inject(PlansApi);
  private readonly session = inject(Session);

  watch(query: NearbyQuery): Observable<NearbyPlanEvent> {
    const url = this.api.nearbyStreamUrl(query);
    return new Observable<NearbyPlanEvent>((subscriber) => {
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
              if (message.event === 'plan-published') {
                subscriber.next(JSON.parse(message.data) as NearbyPlanEvent);
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
