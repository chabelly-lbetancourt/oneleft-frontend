import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { PlansApi } from '@core/api/plans-api';
import { Language } from '@core/i18n/language';
import { NativePlatform } from '@core/platform';
import { StoryCard, StoryTexts, SummaryTexts } from '@core/story/story-card';
import { SummaryPhotos } from '@core/story/summary-photos';
import { activityKey } from '@shared/model/activities';
import { Plan } from '@shared/model/published-plan';
import { clockTime } from '@shared/time/plan-time';

/** Whether this browser shares files with the Web Share API (the Android app uses its own sheet). */
const sharesFiles = (file: File): boolean =>
  typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

/** What the card is: the invitation to a plan with free spots (HU-056) or the summary of a finished one (HU-057). */
export type StoryKind = 'invite' | 'summary';

/** What happened with the last try to copy the link of the plan */
export type LinkCopy = 'idle' | 'copied' | 'failed';

/**
 * The card of a plan for Stories: the invitation with its QR code (HU-056) or the summary of a finished plan
 * (HU-057), with the newest photos of its album if it has any (HU-052). Made in the device, shown before sharing it,
 * and shared with the share sheet (Instagram, WhatsApp, TikTok…). A browser that cannot share files downloads it
 * instead.
 *
 * The invitation comes with the link of the plan for the link sticker of Instagram (HU-058): an image shared with the
 * share sheet carries no link, and only Instagram itself can add the sticker, so the app copies the link and says how
 * to paste it. No account of Meta is needed.
 */
@Component({
  selector: 'app-story-share',
  imports: [Button, Message, TranslocoPipe],
  templateUrl: './story-share.html',
  styleUrl: './story-share.scss',
})
export class StoryShare {
  private readonly stories = inject(StoryCard);
  private readonly photos = inject(SummaryPhotos);
  private readonly platform = inject(NativePlatform);
  private readonly api = inject(PlansApi);
  private readonly language = inject(Language);
  private readonly transloco = inject(TranslocoService);

  readonly plan = input.required<Plan>();
  readonly kind = input<StoryKind>('invite');

  /** Where the texts of this kind of card are in the translations */
  protected readonly scope = computed(() => (this.kind() === 'summary' ? 'summary' : 'story'));

  protected readonly busy = signal(false);
  protected readonly failed = signal(false);
  /** The card made, with the address of its preview */
  protected readonly card = signal<{ image: Blob; url: string } | null>(null);
  protected readonly canShare = signal(false);
  protected readonly fileName = computed(
    () => `oneleft-${this.kind() === 'summary' ? 'summary-' : ''}${this.plan().id}.png`,
  );
  /** The public page of the plan (HU-024): what the QR code and the link sticker open */
  protected readonly link = computed(() => this.api.shareUrl(this.plan().id));
  /** Only the invitation asks people to join: a finished plan has nobody to send to it */
  protected readonly hasLinkSticker = computed(() => this.kind() === 'invite');
  protected readonly linkCopy = signal<LinkCopy>('idle');

  constructor() {
    inject(DestroyRef).onDestroy(() => this.forget());
  }

  protected async create(): Promise<void> {
    this.busy.set(true);
    this.failed.set(false);
    try {
      const link = this.link();
      const image =
        this.kind() === 'summary'
          ? await this.stories.createSummary(
              this.summaryTexts(link),
              await this.photos.ofPlan(this.plan().id),
            )
          : await this.stories.create(this.texts(link), link);
      this.forget();
      this.linkCopy.set('idle');
      this.card.set({ image, url: URL.createObjectURL(image) });
      this.canShare.set(this.platform.isNative() || sharesFiles(this.file(image)));
    } catch {
      this.failed.set(true);
    } finally {
      this.busy.set(false);
    }
  }

  protected async share(): Promise<void> {
    const card = this.card();
    if (!card) {
      return;
    }
    const title = this.plan().title;
    try {
      if (this.platform.isNative()) {
        await this.platform.shareImage(card.image, this.fileName(), title);
      } else {
        await navigator.share({ files: [this.file(card.image)], title });
      }
    } catch {
      // The sheet was closed without sharing: nothing to do
    }
  }

  /** Copies the link of the plan, to paste it in the link sticker of the Story (HU-058). */
  protected async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.link());
      this.linkCopy.set('copied');
    } catch {
      // No clipboard (an old browser, or no permission): the link is on the screen to copy it by hand
      this.linkCopy.set('failed');
    }
  }

  protected close(): void {
    this.forget();
    this.card.set(null);
    this.linkCopy.set('idle');
  }

  private texts(link: string): StoryTexts {
    const plan = this.plan();
    const t = (key: string, params?: Record<string, unknown>) =>
      this.transloco.translate(key, params);
    const startsAt = new Date(plan.startsAt);
    const time = clockTime(startsAt, this.language.locale());
    // Plans start in the next 12 hours: today or, after midnight, tomorrow
    const today = startsAt.toDateString() === new Date().toDateString();
    return {
      brand: t('app.name'),
      missing: t(plan.freeSpots === 1 ? 'story.missingOne' : 'story.missingMany', {
        count: plan.freeSpots,
      }),
      activity: plan.activityOther || t(activityKey(plan.activity)),
      title: plan.title,
      when: t(today ? 'story.today' : 'story.tomorrow', { time }),
      place: plan.meetingPoint.name,
      scan: t('story.scan'),
      link: new URL(link).host,
    };
  }

  private summaryTexts(link: string): SummaryTexts {
    const plan = this.plan();
    const t = (key: string, params?: Record<string, unknown>) =>
      this.transloco.translate(key, params);
    // The organizer and whoever joined
    const people = plan.participants.length + 1;
    return {
      brand: t('app.name'),
      headline: t('summary.headline'),
      activity: plan.activityOther || t(activityKey(plan.activity)),
      title: plan.title,
      people: String(people),
      peopleLabel: t(people === 1 ? 'summary.person' : 'summary.people'),
      when: new Date(plan.startsAt).toLocaleDateString(this.language.locale(), {
        day: 'numeric',
        month: 'long',
      }),
      place: plan.meetingPoint.name,
      link: new URL(link).host,
    };
  }

  private file(image: Blob): File {
    return new File([image], this.fileName(), { type: 'image/png' });
  }

  private forget(): void {
    const card = this.card();
    if (card) {
      URL.revokeObjectURL(card.url);
    }
  }
}
