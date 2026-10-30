import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

/** The part of the Web Speech API that is used (it is not in the standard types of TypeScript). */
interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface RecognitionEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

type RecognitionConstructor = new () => Recognition;

/**
 * Dictation of a sentence (HU-010) with the speech recognition of the browser, where there is one. Where there is
 * not (Firefox, the Android WebView), the button is not shown and the keyboard's own dictation key works in the text
 * field. The audio is handled by the browser, not by OneLeft.
 */
@Injectable({ providedIn: 'root' })
export class Dictation {
  private readonly window = inject(DOCUMENT).defaultView as
    | (Window & {
        SpeechRecognition?: RecognitionConstructor;
        webkitSpeechRecognition?: RecognitionConstructor;
      })
    | null;
  private recognition: Recognition | null = null;

  readonly supported = !!(this.window?.SpeechRecognition ?? this.window?.webkitSpeechRecognition);
  readonly listening = signal(false);

  /**
   * Starts listening in a language ({@code es-ES}); {@code onText} gets everything said so far each time it changes,
   * and {@code onEnd} when it stops (by itself, by an error or with {@link stop}).
   */
  start(locale: string, onText: (text: string) => void, onEnd: () => void): void {
    const Constructor = this.window?.SpeechRecognition ?? this.window?.webkitSpeechRecognition;
    if (!Constructor || this.listening()) {
      return;
    }
    const recognition = new Constructor();
    recognition.lang = locale;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) =>
      onText(
        Array.from(event.results, (result) => result[0]?.transcript ?? '')
          .join(' ')
          .trim(),
      );
    const finish = () => {
      this.listening.set(false);
      this.recognition = null;
      onEnd();
    };
    recognition.onerror = finish;
    recognition.onend = finish;
    this.recognition = recognition;
    this.listening.set(true);
    recognition.start();
  }

  stop(): void {
    this.recognition?.stop();
  }
}
