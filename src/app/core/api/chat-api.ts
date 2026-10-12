import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatHistory } from '../../shared/model/chat';

/** Client of the chat service through the API Gateway (HU-008): the history; messages go through the WebSocket. */
@Injectable({ providedIn: 'root' })
export class ChatApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/chats`;

  /** The latest messages of the chat of a plan or, with {@code before}, the page before that moment. */
  history(planId: string, before?: string): Observable<ChatHistory> {
    const params: Record<string, string> = before ? { before } : {};
    return this.http.get<ChatHistory>(`${this.base}/${planId}/messages`, { params });
  }
}
