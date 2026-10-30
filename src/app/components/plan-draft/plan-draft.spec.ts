import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Dictation } from '@core/speech/dictation';
import { translocoTesting } from '@testing/transloco-testing';
import { PlanDraftCard } from './plan-draft';

describe('PlanDraftCard', () => {
  let fixture: ComponentFixture<PlanDraftCard>;
  const dictation = {
    supported: true,
    listening: signal(false),
    start: vi.fn(),
    stop: vi.fn(),
  };
  const element = () => fixture.nativeElement as HTMLElement;
  const textarea = () => element().querySelector<HTMLTextAreaElement>('#draft-text')!;
  const submit = () => element().querySelector<HTMLButtonElement>('.plan-draft__submit button')!;
  const type = async (text: string) => {
    textarea().value = text;
    textarea().dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  const create = async (supported = true) => {
    dictation.supported = supported;
    TestBed.configureTestingModule({
      imports: [PlanDraftCard, translocoTesting()],
      providers: [{ provide: Dictation, useValue: dictation }],
    });
    fixture = TestBed.createComponent(PlanDraftCard);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    dictation.listening.set(false);
  });

  it('should not send a sentence that is too short', async () => {
    await create();
    const sent = vi.fn();
    fixture.componentInstance.describe.subscribe(sent);

    await type('ab');

    expect(submit().disabled).toBe(true);
    (fixture.componentInstance as unknown as { submit(): void }).submit();
    expect(sent).not.toHaveBeenCalled();
  });

  it('should send the sentence without surrounding spaces', async () => {
    await create();
    const sent = vi.fn();
    fixture.componentInstance.describe.subscribe(sent);

    await type('  Pádel mañana a las 7, falta uno ');
    submit().click();

    expect(sent).toHaveBeenCalledWith('Pádel mañana a las 7, falta uno');
  });

  it('should limit the sentence to what the service reads', async () => {
    await create();

    expect(textarea().maxLength).toBe(300);
  });

  it('should be disabled while the sentence is being understood', async () => {
    await create();
    fixture.componentRef.setInput('busy', true);
    await type('Pádel mañana');

    expect(submit().disabled).toBe(true);
  });

  it('should show the message under the card', async () => {
    await create();
    fixture.componentRef.setInput('message', { key: 'publish.draft.done' });
    fixture.componentRef.setInput('severity', 'success');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(element().querySelector('.plan-draft__message')?.textContent).toContain('Listo');
  });

  it('should dictate in the language of the app and fill in the text', async () => {
    await create();
    const button = () => element().querySelector<HTMLButtonElement>('.plan-draft__dictate button')!;

    button().click();
    const [locale, onText] = dictation.start.mock.calls[0];
    onText('pádel esta tarde');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(locale).toBe('es-ES');
    expect(textarea().value).toBe('pádel esta tarde');

    dictation.listening.set(true);
    fixture.detectChanges();
    expect(element().querySelector('.plan-draft__listening')).not.toBeNull();
    button().click();
    expect(dictation.stop).toHaveBeenCalled();
  });

  it('should not offer dictation where the browser cannot', async () => {
    await create(false);

    expect(element().querySelector('.plan-draft__dictate')).toBeNull();
  });
});
