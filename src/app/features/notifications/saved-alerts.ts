import {
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { catchError, of } from 'rxjs';
import { NotificationsApi } from '../../core/api/notifications-api';
import { UsersApi } from '../../core/api/users-api';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { apiErrorMessage } from '../../core/i18n/api-error';
import { ACTIVITIES, activityKey } from '../../shared/model/activities';
import {
  Day,
  DAYS,
  MAX_ALERTS,
  RADIUS_OPTIONS,
  SavedAlert,
} from '../../shared/model/notifications';
import { Level, LEVELS, levelKey, Zone } from '../../shared/model/profile';
import { CardSkeleton } from '../../components/card-skeleton/card-skeleton';
import { PageLayout } from '../../layout/page-layout/page-layout';

/** "17:00:00" (API) → "17:00" (time input). */
const hhmm = (time: string | null): string | null => time?.slice(0, 5) ?? null;

interface Status {
  severity: 'success' | 'error';
  key: string;
  params?: Record<string, unknown>;
}

/**
 * Saved alerts (HU-036): searches such as «intermediate padel less than 3 km away on weekday afternoons». When a plan
 * like one of them is published, its owner gets the notice of HU-006.
 */
@Component({
  selector: 'app-saved-alerts',
  imports: [
    Button,
    CardSkeleton,
    InputText,
    Message,
    PageLayout,
    ReactiveFormsModule,
    SelectButton,
    ToggleSwitch,
    TranslocoPipe,
  ],
  templateUrl: './saved-alerts.html',
  styleUrl: './saved-alerts.scss',
})
export class SavedAlerts implements OnInit {
  private readonly api = inject(NotificationsApi);
  private readonly users = inject(UsersApi);
  private readonly location = inject(ApproximateLocation);
  private readonly transloco = inject(TranslocoService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly alerts = signal<SavedAlert[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);
  protected readonly saving = signal(false);
  protected readonly locating = signal(false);
  protected readonly status = signal<Status | null>(null);
  /** The alert being edited: null when the form is closed, 'new' for a new one */
  protected readonly editing = signal<string | null>(null);
  protected readonly profileZone = signal<Zone | null>(null);
  protected readonly atLimit = computed(() => this.alerts().length >= MAX_ALERTS);
  protected readonly maxAlerts = MAX_ALERTS;

  /** Option labels are recomputed when the language changes. */
  private readonly lang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });
  protected readonly radiusOptions = computed(() => {
    this.lang();
    return RADIUS_OPTIONS.map((meters) => ({
      label: this.transloco.translate('notifications.km', { km: meters / 1000 }),
      value: meters,
    }));
  });
  protected readonly levelOptions = computed<{ label: string; value: Level | null }[]>(() => {
    this.lang();
    return [null, ...LEVELS].map((value) => ({
      label: this.transloco.translate(levelKey(value)),
      value,
    }));
  });
  protected readonly activities = ACTIVITIES;
  protected readonly activityKey = activityKey;
  protected readonly days = DAYS;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    activities: this.fb.control<string[]>([]),
    level: this.fb.control<Level | null>(null),
    latitude: this.fb.control<number | null>(null, Validators.required),
    longitude: this.fb.control<number | null>(null, Validators.required),
    radiusMeters: 3000,
    days: this.fb.control<Day[]>([]),
    anyTime: true,
    from: '17:00',
    to: '21:00',
  });

  ngOnInit(): void {
    // Without Zone.js, form changes (which are not signals) do not refresh the view on their own
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetector.markForCheck());
    this.users
      .myProfile()
      .pipe(catchError(() => of(null)))
      .subscribe((profile) => this.profileZone.set(profile?.zone ?? null));
    this.api.alerts().subscribe({
      next: (alerts) => {
        this.alerts.set(alerts);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  /** «Padel, Tennis · Intermediate · 3 km away · M T W · from 17:00 to 21:00» in the app's language. */
  protected summary(alert: SavedAlert): string {
    const t = (key: string, params?: Record<string, unknown>) =>
      this.transloco.translate(key, params);
    const activities = alert.activities.length
      ? alert.activities.map((code) => t(activityKey(code))).join(', ')
      : t('alerts.anyActivity');
    const days = alert.days.length
      ? DAYS.filter((day) => alert.days.includes(day))
          .map((day) => t(`alerts.dayName.${day}`))
          .join(', ')
      : t('alerts.everyDay');
    const hours =
      alert.from && alert.to
        ? t('alerts.summaryHours', { from: hhmm(alert.from), to: hhmm(alert.to) })
        : t('alerts.anyTime');
    return [
      activities,
      t(levelKey(alert.level)),
      t('alerts.summaryKm', {
        km: (alert.radiusMeters / 1000).toLocaleString(this.transloco.getActiveLang()),
      }),
      days,
      hours,
    ].join(' · ');
  }

  protected startNew(): void {
    const zone = this.profileZone();
    this.form.reset({
      name: '',
      activities: [],
      level: null,
      latitude: zone?.latitude ?? null,
      longitude: zone?.longitude ?? null,
      radiusMeters: 3000,
      days: [],
      anyTime: true,
      from: '17:00',
      to: '21:00',
    });
    this.status.set(null);
    this.editing.set('new');
  }

  protected startEdit(alert: SavedAlert): void {
    this.form.reset({
      name: alert.name,
      activities: [...alert.activities],
      level: alert.level,
      latitude: alert.latitude,
      longitude: alert.longitude,
      radiusMeters: alert.radiusMeters,
      days: [...alert.days],
      anyTime: !alert.from,
      from: hhmm(alert.from) ?? '17:00',
      to: hhmm(alert.to) ?? '21:00',
    });
    this.status.set(null);
    this.editing.set(alert.id ?? null);
  }

  protected cancel(): void {
    this.editing.set(null);
  }

  protected isChosen(control: 'activities' | 'days', value: string): boolean {
    return (this.form.controls[control].value as string[]).includes(value);
  }

  /** None chosen means any activity or any day. */
  protected toggle(control: 'activities' | 'days', value: string): void {
    const chosen = this.form.controls[control].value as string[];
    const next = chosen.includes(value)
      ? chosen.filter((item) => item !== value)
      : [...chosen, value];
    (this.form.controls[control] as { setValue: (value: string[]) => void }).setValue(next);
  }

  protected hasZone(): boolean {
    return (
      this.form.controls.latitude.value !== null && this.form.controls.longitude.value !== null
    );
  }

  protected useProfileZone(): void {
    const zone = this.profileZone();
    if (zone) {
      this.form.patchValue({ latitude: zone.latitude, longitude: zone.longitude });
    }
  }

  protected async useMyLocation(): Promise<void> {
    this.locating.set(true);
    this.status.set(null);
    try {
      const { latitude, longitude } = await this.location.current();
      this.form.patchValue({ latitude, longitude });
    } catch (error) {
      this.status.set({
        severity: 'error',
        key: error instanceof LocationError ? error.translationKey : 'errors.location.denied',
      });
    } finally {
      this.locating.set(false);
    }
  }

  protected save(): void {
    if (!this.hasZone()) {
      this.status.set({ severity: 'error', key: 'alerts.chooseZone' });
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const alert: SavedAlert = {
      name: value.name.trim(),
      activities: value.activities,
      level: value.level,
      latitude: value.latitude!,
      longitude: value.longitude!,
      radiusMeters: value.radiusMeters,
      days: value.days,
      from: value.anyTime ? null : value.from,
      to: value.anyTime ? null : value.to,
    };
    const editing = this.editing();
    this.saving.set(true);
    (editing === 'new' || !editing
      ? this.api.createAlert(alert)
      : this.api.updateAlert(editing, alert)
    ).subscribe({
      next: (saved) => {
        this.alerts.update((alerts) =>
          editing === 'new'
            ? [...alerts, saved]
            : alerts.map((current) => (current.id === saved.id ? saved : current)),
        );
        this.saving.set(false);
        this.editing.set(null);
        this.status.set({ severity: 'success', key: 'alerts.saved' });
      },
      error: (error) => {
        this.saving.set(false);
        this.status.set({
          severity: 'error',
          ...apiErrorMessage(this.transloco, error, 'errors.alertsFailed'),
        });
      },
    });
  }

  protected remove(alert: SavedAlert): void {
    this.api.deleteAlert(alert.id!).subscribe({
      next: () => {
        this.alerts.update((alerts) => alerts.filter((current) => current.id !== alert.id));
        this.status.set({ severity: 'success', key: 'alerts.deleted' });
      },
      error: (error) =>
        this.status.set({
          severity: 'error',
          ...apiErrorMessage(this.transloco, error, 'errors.alertsFailed'),
        }),
    });
  }
}
