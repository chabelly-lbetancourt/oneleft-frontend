import { SseParser } from './sse-parser';

describe('SseParser', () => {
  it('should parse the events sent by Spring (no space after the colon)', () => {
    const parser = new SseParser();
    const messages = parser.push('event:ready\ndata:ok\n\nevent:plan-published\nid:p1\ndata:{"planId":"p1"}\n\n');
    expect(messages).toEqual([
      { event: 'ready', data: 'ok', id: undefined },
      { event: 'plan-published', data: '{"planId":"p1"}', id: 'p1' },
    ]);
  });

  it('should join messages cut across chunks and CRLF line endings', () => {
    const parser = new SseParser();
    expect(parser.push('event: plan-pub')).toEqual([]);
    expect(parser.push('lished\r\ndata: {"a":\r\n')).toEqual([]);
    expect(parser.push('data: 1}\r\n\r\n')).toEqual([{ event: 'plan-published', data: '{"a":\n1}', id: undefined }]);
  });

  it('should ignore heartbeats, blank blocks and unknown fields', () => {
    const parser = new SseParser();
    expect(parser.push(':ping\n\n\n\nretry: 1000\n\ndata\n\n')).toEqual([{ event: 'message', data: '', id: undefined }]);
  });
});
