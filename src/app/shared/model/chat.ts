/** A message of the chat of a plan (HU-008). */
export interface ChatMessage {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  sentAt: string;
}

/** A page of the chat: whether it can still be written in, until when, and its messages, oldest first. */
export interface ChatHistory {
  planId: string;
  open: boolean;
  endsAt: string;
  messages: ChatMessage[];
}

/** What arrives through the WebSocket of the chat, plus «connecting» and «closed» from the connection itself. */
export type ChatEvent =
  | { type: 'connecting' }
  | { type: 'ready'; open: boolean; endsAt: string }
  | { type: 'message'; message: ChatMessage }
  | { type: 'error'; code: string }
  | { type: 'closed'; code: string };

/** Longest message, the same as the service accepts. */
export const CHAT_MAX_LENGTH = 500;

/** Messages per page of history, the same as the service sends. */
export const CHAT_PAGE = 50;
