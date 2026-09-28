import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';
import { PlansApi } from '../../core/api/plans-api';
import { ApproximateLocation, MEETING_POINT_DECIMALS } from '../../core/geo/approximate-location';
import { ACTIVITIES } from '../../shared/model/activities';
import { LEVEL_LABELS, Level } from '../../shared/model/profile';
import { MAX_HORIZON_HOURS, nextOccurrence, startsInRange } from '../../shared/time/plan-time';

type StartOption = '30' | '60' | '120' | '180' | 'custom';

@Component({
  selector: 'app-publish-plan',
  imports: [ReactiveFormsModule, RouterLink, Button, InputNumber, InputText, Message, Select, SelectButton, Textarea],
  templateUrl: './publish-plan.html',
})
export class PublishPlan implements OnInit {
  private readonly api = inject(PlansApi);
  private readonly location = inject(ApproximateLocation);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly activities = ACTIVITIES;
  protected readonly maxHours = MAX_HORIZON_HOURS;
  protected readonly startOptions: { label: string; value: StartOption }[] = [
    { label: 'En 30 min', value: '30' },
    { label: 'En 1 h', value: '60' },
    { label: 'En 2 h', value: '120' },
    { label: 'En 3 h', value: '180' },
    { label: 'Otra hora', value: 'custom' },
  ];
  protected readonly levelOptions: { label: string; value: Level | null }[] = [
    { label: 'Cualquiera', value: null },
    ...(Object.entries(LEVEL_LABELS) as [Level, string][]).map(([value, label]) => ({ label, value })),
  ];

  protected readonly publishing = signal(false);
  protected readonly locating = signal(false);
  protected readonly error = signal<string | null>(null);

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
      this.error.set((error as Error).message);
    } finally {
      this.locating.set(false);
    }
  }

  protected publish(): void {
    const startsAt = this.startsAt();
    if (this.form.invalid || !startsAt) {
      this.form.markAllAsTouched();
      this.error.set(
        startsAt ? 'Revisa los campos marcados' : `Elige una hora dentro de las próximas ${MAX_HORIZON_HOURS} horas`,
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
          this.error.set(error?.error?.detail ?? 'No se ha podido publicar el plan');
        },
      });
  }
}
