import { ChangeDetectorRef, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';
import { PlansApi } from '../../core/api/plans-api';
import { ApproximateLocation, LocationError, MEETING_POINT_DECIMALS } from '../../core/geo/approximate-location';
import { apiErrorKey } from '../../core/i18n/api-error';
import { ACTIVITIES, activityKey } from '../../shared/model/activities';
import { Level, LEVELS, levelKey } from '../../shared/model/profile';
import { MAX_HORIZON_HOURS, nextOccurrence, startsInRange } from '../../shared/time/plan-time';

type StartOption = '30' | '60' | '120' | '180' | 'custom';

const START_OPTIONS: { key: string; value: StartOption }[] = [
  { key: 'publish.in30', value: '30' },
  { key: 'publish.in60', value: '60' },
  { key: 'publish.in120', value: '120' },
  { key: 'publish.in180', value: '180' },
  { key: 'publish.custom', value: 'custom' },
];

/** Message shown under the form: a translation key and its parameters. */
interface StatusMessage {
  key: string;
  params?: Record<string, unknown>;
}

@Component({
  selector: 'app-publish-plan',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Button,
    InputNumber,
    InputText,
    Message,
    Select,
    SelectButton,
    Textarea,
    TranslocoPipe,
  ],
  templateUrl: './publish-plan.html',
})
export class PublishPlan implements OnInit {
  private readonly api = inject(PlansApi);
  private readonly location = inject(ApproximateLocation);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly transloco = inject(TranslocoService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Active language as a signal: the PrimeNG option labels are recomputed when it changes. */
  private readonly lang = toSignal(this.transloco.langChanges$, { initialValue: this.transloco.getActiveLang() });
  private readonly translate = (key: string) => {
    this.lang();
    return this.transloco.translate(key);
  };

  protected readonly maxHours = MAX_HORIZON_HOURS;
  protected readonly activities = computed(() =>
    ACTIVITIES.map(({ code }) => ({ code, name: this.translate(activityKey(code)) })),
  );
  protected readonly startOptions = computed(() =>
    START_OPTIONS.map(({ key, value }) => ({ label: this.translate(key), value })),
  );
  protected readonly levelOptions = computed<{ label: string; value: Level | null }[]>(() => [
    { label: this.translate('publish.anyLevel'), value: null },
    ...LEVELS.map((value) => ({ label: this.translate(levelKey(value)), value })),
  ]);

  protected readonly publishing = signal(false);
  protected readonly locating = signal(false);
  protected readonly error = signal<StatusMessage | null>(null);

  protected readonly form = this.fb.group({
    activity: ['', Validators.required],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    description: ['', Validators.maxLength(280)],
    placeName: ['', [Validators.required, Validators.maxLength(100)]],
    latitude: this.fb.control<number | null>(null, Validators.required),
    longitude: this.fb.control<number | null>(null, Validators.required),
    start: this.fb.control<StartOption>('60'),
    customTime: [''],
    spots: this.fb.control<number>(1, [Validators.required, Validators.min(1), Validators.max(20)]),
    level: this.fb.control<Level | null>(null),
  });

  ngOnInit(): void {
    // Without Zone.js, form changes do not refresh the view on their own
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetector.markForCheck());
  }

  /** Chosen start time, or null if the custom time is not within the next hours. */
  protected startsAt(now = new Date()): Date | null {
    const { start, customTime } = this.form.getRawValue();
    if (start !== 'custom') {
      return new Date(now.getTime() + Number(start) * 60_000);
    }
    if (!customTime) {
      return null;
    }
    const candidate = nextOccurrence(customTime, now);
    return startsInRange(candidate, now) ? candidate : null;
  }

  protected async useMyLocation(): Promise<void> {
    this.locating.set(true);
    this.error.set(null);
    try {
      const { latitude, longitude } = await this.location.current(MEETING_POINT_DECIMALS);
      this.form.patchValue({ latitude, longitude });
    } catch (error) {
      this.error.set({ key: error instanceof LocationError ? error.translationKey : 'errors.location.denied' });
    } finally {
      this.locating.set(false);
    }
  }

  protected publish(): void {
    const startsAt = this.startsAt();
    if (this.form.invalid || !startsAt) {
      this.form.markAllAsTouched();
      this.error.set(
        startsAt
          ? { key: 'publish.checkFields' }
          : { key: 'publish.chooseTime', params: { hours: MAX_HORIZON_HOURS } },
      );
      return;
    }
    const value = this.form.getRawValue();
    this.publishing.set(true);
    this.error.set(null);
    this.api
      .publish({
        activity: value.activity,
        title: value.title.trim(),
        description: value.description.trim() || null,
        meetingPoint: { name: value.placeName.trim(), latitude: value.latitude!, longitude: value.longitude! },
        startsAt: startsAt.toISOString(),
        spots: value.spots,
        level: value.level,
      })
      .subscribe({
        next: (plan) => this.router.navigate(['/plans', plan.id], { queryParams: { published: 1 } }),
        error: (error) => {
          this.publishing.set(false);
          this.error.set({ key: apiErrorKey(this.transloco, error, 'errors.publishFailed') });
        },
      });
  }
}
