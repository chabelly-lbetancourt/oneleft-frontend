import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { SelectButton } from 'primeng/selectbutton';
import { catchError, of } from 'rxjs';
import { PlansApi } from '../../core/api/plans-api';
import { UsersApi } from '../../core/api/users-api';
import { ApproximateLocation } from '../../core/geo/approximate-location';
import { Language } from '../../core/i18n/language';
import { activityOf, activityKey } from '../../shared/model/activities';
import { Hobby, levelKey, Zone } from '../../shared/model/profile';
import { Availability } from '../../shared/model/published-plan';
import { clockTime } from '../../shared/time/plan-time';

/**
 * «I'm free now» on the home screen (HU-035): for 1 to 3 hours, for the hobbies of the profile with their level, around
 * the approximate location of the device (or the zone of the profile). While on, it says until when and can be turned
 * off; it also turns off when the person joins a plan.
 */
@Component({
  selector: 'app-free-now',
  imports: [Button, FormsModule, Message, SelectButton, TranslocoPipe],
  templateUrl: './free-now.html',
  styleUrl: './free-now.scss',
})
export class FreeNow implements OnInit {
  private readonly plans = inject(PlansApi);
  private readonly users = inject(UsersApi);
  private readonly location = inject(ApproximateLocation);
  private readonly language = inject(Language);
  private readonly transloco = inject(TranslocoService);

  protected readonly availability = signal<Availability | null>(null);
  protected readonly choosing = signal(false);
  protected readonly busy = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly hobbies = signal<Hobby[]>([]);
  private readonly zone = signal<Zone | null>(null);
  /** Hobbies chosen for this free time (all of them by default) */
  protected readonly chosen = signal<string[]>([]);
  protected hours = 2;

  private readonly lang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });
  protected readonly hourOptions = computed(() => {
    this.lang();
    return [1, 2, 3].map((count) => ({
      label: this.transloco.translate('freeNow.hoursOption', { count }),
      value: count,
    }));
  });
  protected readonly until = computed(() => {
    const availability = this.availability();
    return availability ? clockTime(new Date(availability.until), this.language.locale()) : '';
  });
  protected readonly activityOf = activityOf;
  protected readonly activityKey = activityKey;
  protected readonly levelKey = levelKey;

  ngOnInit(): void {
    this.plans
      .myAvailability()
      .pipe(catchError(() => of(null)))
      .subscribe((availability) => this.availability.set(availability));
    this.users
      .myProfile()
      .pipe(catchError(() => of(null)))
      .subscribe((profile) => {
        this.hobbies.set(profile?.hobbies ?? []);
        this.zone.set(profile?.zone ?? null);
      });
  }

  protected open(): void {
    this.chosen.set(this.hobbies().map((hobby) => hobby.activity));
    this.error.set(null);
    this.choosing.set(true);
  }

  protected isChosen(activity: string): boolean {
    return this.chosen().includes(activity);
  }

  protected toggle(activity: string): void {
    this.chosen.update((chosen) =>
      chosen.includes(activity)
        ? chosen.filter((code) => code !== activity)
        : [...chosen, activity],
    );
  }

  protected async start(): Promise<void> {
    this.busy.set(true);
    this.error.set(null);
    // The approximate location of the device; without it, the zone of the profile
    const place = await this.location.current().catch(() => this.zone());
    if (!place) {
      this.busy.set(false);
      this.error.set('freeNow.noZone');
      return;
    }
    const interests = this.hobbies()
      .filter((hobby) => this.chosen().includes(hobby.activity))
      .map((hobby) => ({ activity: hobby.activity, level: hobby.level }));
    this.plans
      .startAvailability({
        hours: this.hours,
        latitude: place.latitude,
        longitude: place.longitude,
        interests,
      })
      .subscribe({
        next: (availability) => {
          this.availability.set(availability);
          this.choosing.set(false);
          this.busy.set(false);
        },
        error: () => {
          this.busy.set(false);
          this.error.set('freeNow.failed');
        },
      });
  }

  protected stop(): void {
    this.busy.set(true);
    this.plans.stopAvailability().subscribe({
      next: () => {
        this.availability.set(null);
        this.busy.set(false);
      },
      error: () => this.busy.set(false),
    });
  }
}
