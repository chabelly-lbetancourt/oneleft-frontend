import { TestBed } from '@angular/core/testing';
import { Dictation } from './dictation';

/** A speech recognition that the test drives by hand. */
class FakeRecognition {
  static last: FakeRecognition | null = null;
  lang = '';
  interimResults = false;
  continuous = true;
  onresult: ((event: { results: { transcript: string }[][] }) => void) | null = null;
  onerror: (() => void) | null = null;
  onend: (() => void) | null = null;
  start = vi.fn();
  stop = vi.fn(() => this.onend?.());

  constructor() {
    FakeRecognition.last = this;
  }
}

describe('Dictation', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    FakeRecognition.last = null;
  });

  const create = () => TestBed.inject(Dictation);

  it('should not be supported where the browser has no speech recognition', () => {
    const dictation = create();

    expect(dictation.supported).toBe(false);
    dictation.start('es-ES', vi.fn(), vi.fn());
    expect(dictation.listening()).toBe(false);
  });

  it('should listen in the language, hand over what is said and stop', () => {
    vi.stubGlobal('webkitSpeechRecognition', FakeRecognition);
    const dictation = create();
    const said: string[] = [];
    const ended = vi.fn();

    dictation.start('es-ES', (text) => said.push(text), ended);
    const recognition = FakeRecognition.last!;

    expect(dictation.supported).toBe(true);
    expect(recognition.lang).toBe('es-ES');
    expect(recognition.interimResults).toBe(true);
    expect(recognition.continuous).toBe(false);
    expect(recognition.start).toHaveBeenCalled();
    expect(dictation.listening()).toBe(true);

    recognition.onresult?.({
      results: [[{ transcript: 'pádel' }], [{ transcript: 'a las siete' }]],
    });
    expect(said).toEqual(['pádel a las siete']);

    dictation.stop();
    expect(dictation.listening()).toBe(false);
    expect(ended).toHaveBeenCalled();
  });

  it('should not start twice and should end by itself on an error', () => {
    vi.stubGlobal('SpeechRecognition', FakeRecognition);
    const dictation = create();
    const ended = vi.fn();

    dictation.start('en-GB', vi.fn(), ended);
    const first = FakeRecognition.last;
    dictation.start('en-GB', vi.fn(), ended);
    expect(FakeRecognition.last).toBe(first);

    first!.onerror?.();
    expect(dictation.listening()).toBe(false);
    expect(ended).toHaveBeenCalledTimes(1);
    dictation.stop();
  });
});
