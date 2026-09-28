export interface SseMessage {
  event: string;
  data: string;
  id?: string;
}

/**
 * Incremental parser of a text/event-stream (HTML Living Standard, Server-Sent Events). Chunks can cut messages
 * anywhere; comments (lines starting with ":", such as the server heartbeat) are ignored.
 */
export class SseParser {
  private buffer = '';

  push(chunk: string): SseMessage[] {
    this.buffer += chunk.replace(/\r\n?/g, '\n');
    const messages: SseMessage[] = [];
    let end = this.buffer.indexOf('\n\n');
    while (end >= 0) {
      const message = this.parse(this.buffer.slice(0, end));
      if (message) {
        messages.push(message);
      }
      this.buffer = this.buffer.slice(end + 2);
      end = this.buffer.indexOf('\n\n');
    }
    return messages;
  }

  private parse(block: string): SseMessage | null {
    let event = 'message';
    let id: string | undefined;
    const data: string[] = [];
    for (const line of block.split('\n')) {
      if (!line || line.startsWith(':')) {
        continue;
      }
      const colon = line.indexOf(':');
      const field = colon < 0 ? line : line.slice(0, colon);
      const raw = colon < 0 ? '' : line.slice(colon + 1);
      const value = raw.startsWith(' ') ? raw.slice(1) : raw;
      if (field === 'event') {
        event = value;
      } else if (field === 'data') {
        data.push(value);
      } else if (field === 'id') {
        id = value;
      }
    }
    return data.length ? { event, data: data.join('\n'), id } : null;
  }
}
