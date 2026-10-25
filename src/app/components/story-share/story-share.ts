import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { PlansApi } from '@core/api/plans-api';
import { Language } from '@core/i18n/language';
import { NativePlatform } from '@core/platform';
import { StoryCard, StoryTexts } from '@core/story/story-card';
import { activityKey } from '@shared/model/activities';
import { Plan } from '@shared/model/published-plan';
import { clockTime } from '@shared/time/plan-time';

/** Whether this browser shares files with the Web Share API (the Android app uses its own sheet). */
const sharesFiles = (file: File): boolean =>
  typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });

/**
 * The card of a plan for Stories (HU-056): made in the device, shown before sharing it, and shared with the share
 * sheet (Instagram, WhatsApp, TikTok…). A browser that cannot share files downloads it instead.
 */
@Component({
  selector: 'app-story-share',
  imports: [Button, Message, TranslocoPipe],
  templateUrl: './story-share.html',
  styleUrl: './story-share.scss',
})
export class StoryShare {
  private readonly stories = inject(StoryCard);
  private readonly platform = inject(NativePlatform);
  private readonly api = inject(PlansApi);
  private readonly language = inject(Language);
  private readonly transloco = inject(TranslocoService);

  readonly plan = input.required<Plan>();

  protected readonly busy = signal(false);
  protected readonly failed = signal(false);
  /** The card made, with the address of its preview */
  protected readonly card = signal<{ image: Blob; url: string } | null>(null);
  protected readonly canShare = signal(false);
  protected readonly fileName = computed(() => `oneleft-${this.plan().id}.png`);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.forget());
  }

  protected async create(): Promise<void> {
    this.busy.set(true);
    this.failed.set(false);
    try {
      const link = this.api.shareUrl(this.plan().id);
      const image = await this.stories.create(this.texts(link), link);
      this.forget();
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

  protected close(): void {
    this.forget();
    this.card.set(null);
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
      activity: t(activityKey(plan.activity)),
      title: plan.title,
      when: t(today ? 'story.today' : 'story.tomorrow', { time }),
      place: plan.meetingPoint.name,
      scan: t('story.scan'),
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
