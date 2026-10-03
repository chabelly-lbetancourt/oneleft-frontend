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
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { catchError, forkJoin, of } from 'rxjs';
import { NotificationsApi } from '../../core/api/notifications-api';
import { UsersApi } from '../../core/api/users-api';
import { ApproximateLocation, LocationError } from '../../core/geo/approximate-location';
import { apiErrorMessage } from '../../core/i18n/api-error';
import { WebPush } from '../../core/push/web-push';
import { ACTIVITIES, activityKey } from '../../shared/model/activities';
import {
  MAX_PER_DAY,
  NotificationPreferences,
  RADIUS_OPTIONS,
} from '../../shared/model/notifications';
import { Zone } from '../../shared/model/profile';
import { CardSkeleton } from '../../components/card-skeleton/card-skeleton';
import { PageLayout } from '../../layout/page-layout/page-layout';

/** "23:00:00" (API) → "23:00" (time input). */
const hhmm = (time: string | undefined, fallback: string): string => time?.slice(0, 5) ?? fallback;

/**
 * Notices of nearby plans (HU-006): whether to get them, around which zone, for which activities, when not, how many
 * a day at most, and whether this browser shows them as system notifications (Web Push).
 */
@Component({
  selector: 'app-notification-settings',
  imports: [
    Button,
    CardSkeleton,
    FormsModule,
    Message,
    PageLayout,
    ReactiveFormsModule,
    SelectButton,
    ToggleSwitch,
    TranslocoPipe,
  ],
  templateUrl: './notification-settings.html',
  styleUrl: './notification-settings.scss',
})
export class NotificationSettings implements OnInit {
  private readonly api = inject(NotificationsApi);
  private readonly users = inject(UsersApi);
  private readonly location = inject(ApproximateLocation);
  private readonly transloco = inject(TranslocoService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly push = inject(WebPush);

  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);
  protected readonly saving = signal(false);
  protected readonly locating = signal(false);
  protected readonly pushBusy = signal(false);
  /** Zone of the profile, offered as the zone of the notices */
  protected readonly profileZone = signal<Zone | null>(null);
  protected readonly status = signal<{
    severity: 'success' | 'error';
    key: string;
    params?: Record<string, unknown>;
  } | null>(null);

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
  protected readonly activities = ACTIVITIES;
  protected readonly activityKey = activityKey;
  protected readonly perDayOptions = [1, 3, 5, 10, MAX_PER_DAY].map((count) => ({
    label: String(count),
    value: count,
  }));

  protected readonly form = this.fb.group({
    enabled: false,
    latitude: this.fb.control<number | null>(null),
    longitude: this.fb.control<number | null>(null),
    radiusMeters: 3000,
    activities: this.fb.control<string[]>([]),
    quiet: true,
    quietStart: '23:00',
    quietEnd: '08:00',
    maxPerDay: 5,
  });

  ngOnInit(): void {
    // Without Zone.js, form changes (which are not signals) do not refresh the view on their own
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetector.markForCheck());
    forkJoin({
      preferences: this.api.preferences(),
      profile: this.users.myProfile().pipe(catchError(() => of(null))),
    }).subscribe({
      next: ({ preferences, profile }) => {
        this.profileZone.set(profile?.zone ?? null);
        this.fill(preferences);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
    void this.push.refresh();
  }

  protected hasZone(): boolean {
    return (
      this.form.controls.latitude.value !== null && this.form.controls.longitude.value !== null
    );
  }

  protected isChosen(code: string): boolean {
    return this.form.controls.activities.value.includes(code);
  }

  /** None chosen means every activity. */
  protected toggleActivity(code: string): void {
    const chosen = this.form.controls.activities.value;
    this.form.controls.activities.setValue(
      chosen.includes(code) ? chosen.filter((activity) => activity !== code) : [...chosen, code],
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
    const value = this.form.getRawValue();
    if (value.enabled && !this.hasZone()) {
      this.status.set({ severity: 'error', key: 'errors.notifications.zoneRequired' });
      return;
    }
    this.saving.set(true);
    this.status.set(null);
    this.api
      .savePreferences({
        enabled: value.enabled,
        latitude: value.latitude,
        longitude: value.longitude,
        radiusMeters: value.radiusMeters,
        activities: value.activities,
        quietHours: value.quiet ? { start: value.quietStart, end: value.quietEnd } : null,
        maxPerDay: value.maxPerDay,
      })
      .subscribe({
        next: (saved) => {
          this.fill(saved);
          this.saving.set(false);
          this.status.set({
            severity: 'success',
            key: saved.enabled ? 'notifications.saved' : 'notifications.savedOff',
          });
        },
        error: (error) => {
          this.saving.set(false);
          this.status.set({
            severity: 'error',
            ...apiErrorMessage(this.transloco, error, 'errors.notificationsSaveFailed'),
          });
        },
      });
  }

  protected async togglePush(): Promise<void> {
    this.pushBusy.set(true);
    try {
      await (this.push.state() === 'on' ? this.push.disable() : this.push.enable());
    } catch {
      this.status.set({ severity: 'error', key: 'errors.pushFailed' });
    } finally {
      this.pushBusy.set(false);
    }
  }

  private fill(preferences: NotificationPreferences): void {
    this.form.setValue({
      enabled: preferences.enabled,
      latitude: preferences.latitude,
      longitude: preferences.longitude,
      radiusMeters: preferences.radiusMeters,
      activities: [...preferences.activities],
      quiet: preferences.quietHours !== null,
      quietStart: hhmm(preferences.quietHours?.start, '23:00'),
      quietEnd: hhmm(preferences.quietHours?.end, '08:00'),
      maxPerDay: preferences.maxPerDay,
    });
  }
}
