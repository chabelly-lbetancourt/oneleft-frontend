import {
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, of } from 'rxjs';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { AutoComplete } from 'primeng/autocomplete';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { PageLayout } from '@layout/page-layout/page-layout';
import { DraftMessage, PlanDraftCard } from '@components/plan-draft/plan-draft';
import { PlansApi } from '@core/api/plans-api';
import { UsersApi } from '@core/api/users-api';
import {
  ApproximateLocation,
  Coordinates,
  LocationError,
  MEETING_POINT_DECIMALS,
  roundCoordinate,
} from '@core/geo/approximate-location';
import { apiErrorMessage } from '@core/i18n/api-error';
import { Language } from '@core/i18n/language';
import { formatDistance } from '@shared/geo/distance';
import { ACTIVITIES, activityKey } from '@shared/model/activities';
import { PLACE_QUERY_MIN_LENGTH, PlaceSuggestion } from '@shared/model/places';
import { PlanDraft } from '@shared/model/plan-draft';
import { Level, LEVELS, levelKey } from '@shared/model/profile';
import {
  MAX_HORIZON_HOURS,
  MIN_LEAD_MINUTES,
  nextOccurrence,
  startsInRange,
} from '@shared/time/plan-time';

type StartOption = '30' | '60' | '120' | '180' | 'custom';

const START_OPTIONS: { key: string; value: StartOption }[] = [
  { key: 'publish.in30', value: '30' },
  { key: 'publish.in60', value: '60' },
  { key: 'publish.in120', value: '120' },
  { key: 'publish.in180', value: '180' },
  { key: 'publish.custom', value: 'custom' },
];

/** Deadline of the minimum (HU-039): how long before the start it is checked. */
const DEADLINE_OPTIONS: { key: string; minutes: number }[] = [
  { key: 'publish.deadline120', minutes: 120 },
  { key: 'publish.deadline60', minutes: 60 },
  { key: 'publish.deadline30', minutes: 30 },
  { key: 'publish.deadlineAtStart', minutes: 0 },
];

/** Decimals of a suggested place (HU-071): about 11 m, a public place needs no rounding for privacy. */
const PLACE_DECIMALS = 4;

/** Message shown under the form: a translation key and its parameters. */
interface StatusMessage {
  key: string;
  params?: Record<string, unknown>;
}

@Component({
  selector: 'app-publish-plan',
  imports: [
    ReactiveFormsModule,
    AutoComplete,
    Button,
    InputNumber,
    InputText,
    Message,
    Select,
    SelectButton,
    Textarea,
    ToggleSwitch,
    TranslocoPipe,
    PageLayout,
    PlanDraftCard,
  ],
  templateUrl: './publish-plan.html',
  styleUrl: './publish-plan.scss',
})
export class PublishPlan implements OnInit {
  private readonly api = inject(PlansApi);
  private readonly location = inject(ApproximateLocation);
  private readonly users = inject(UsersApi);
  private readonly language = inject(Language);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly transloco = inject(TranslocoService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Active language as a signal: the PrimeNG option labels are recomputed when it changes. */
  private readonly lang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang(),
  });
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
  /** The sentence is being understood (HU-010), and what came out of it */
  protected readonly drafting = signal(false);
  protected readonly draftMessage = signal<DraftMessage | null>(null);
  protected readonly draftSeverity = signal<'error' | 'success' | 'info'>('info');
  protected readonly locating = signal(false);
  protected readonly error = signal<StatusMessage | null>(null);
  protected readonly placeQueryMinLength = PLACE_QUERY_MIN_LENGTH;
  protected readonly placeSuggestions = signal<PlaceSuggestion[]>([]);
  /**
   * Value of the field: the name of a suggestion, or the text as it is typed. A field name such as «name» would also be
   * read from the typed text, which is a string, and leave the field empty
   */
  protected readonly placeValue = (item: PlaceSuggestion | string): string =>
    typeof item === 'string' ? item : item.name;
  /** Where the places are searched around: worked out once, on the first search */
  private searchArea: Promise<Coordinates | null> | null = null;
  /** Number of the last search: an older answer that arrives later is ignored */
  private placeSearch = 0;
  private readonly placeField = viewChild(AutoComplete);

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
    hasMinimum: this.fb.control(false),
    minParticipants: this.fb.control<number>(1, [Validators.min(1), Validators.max(20)]),
    minimumLead: this.fb.control<number>(30),
  });

  /** Form values as a signal, so that the deadline options follow the chosen start */
  private readonly values = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });
  /**
   * Deadlines that are still possible for the chosen start: at least 5 minutes from now, like the service asks. A
   * plan that starts soon only offers «at the start».
   */
  protected readonly deadlineOptions = computed(() => {
    this.values();
    const startsAt = this.startsAt();
    const earliest = Date.now() + MIN_LEAD_MINUTES * 60_000;
    return DEADLINE_OPTIONS.filter(
      ({ minutes }) => !startsAt || startsAt.getTime() - minutes * 60_000 >= earliest,
    ).map(({ key, minutes }) => ({ label: this.translate(key), value: minutes }));
  });

  constructor() {
    // If the chosen deadline is no longer possible (the start moved closer), the latest possible one is taken
    effect(() => {
      const options = this.deadlineOptions();
      const lead = this.form.controls.minimumLead;
      if (options.length && !options.some(({ value }) => value === lead.value)) {
        lead.setValue(options[0].value);
      }
    });
  }

  ngOnInit(): void {
    // Without Zone.js, form changes do not refresh the view on their own
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetector.markForCheck());
    // The minimum can never be more than the spots: it follows them down
    this.form.controls.spots.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((spots) => {
        if (this.form.controls.minParticipants.value > spots) {
          this.form.controls.minParticipants.setValue(spots);
        }
      });
  }

  /**
   * Deadline of the minimum for the chosen start (HU-039), or null if the chosen one is no longer possible (the
   * start moved too close).
   */
  protected minimumDeadline(startsAt: Date, now = new Date()): Date | null {
    const deadline = new Date(startsAt.getTime() - this.form.controls.minimumLead.value * 60_000);
    return deadline.getTime() >= now.getTime() + MIN_LEAD_MINUTES * 60_000 ? deadline : null;
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

  /**
   * «Tell it in one sentence» (HU-010): the service understands it and the form is filled in. Nothing is published:
   * the person reviews the form and sends it as usual.
   */
  protected async describe(text: string): Promise<void> {
    this.drafting.set(true);
    this.draftMessage.set(null);
    this.searchArea ??= this.whereToSearch();
    const near = await this.searchArea;
    if (!near) {
      this.showDraft({ key: 'publish.draft.noLocation' }, 'error');
      this.drafting.set(false);
      return;
    }
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.api.draft(text, near, zone).subscribe({
      next: (draft) => {
        this.applyDraft(draft);
        this.drafting.set(false);
      },
      error: (error) => {
        this.drafting.set(false);
        this.showDraft(apiErrorMessage(this.transloco, error, 'errors.draftFailed'), 'error');
      },
    });
  }

  /** Fills in what the draft understood and marks what is left for the person to complete. */
  protected applyDraft(draft: PlanDraft): void {
    const controls = this.form.controls;
    const patch: Record<string, unknown> = {};
    const put = (name: string, value: unknown) => (value == null ? null : (patch[name] = value));
    put('activity', draft.activity);
    put('title', draft.title);
    put('description', draft.description);
    put('spots', draft.spots);
    put('level', draft.level);
    if (draft.meetingPoint) {
      patch['placeName'] = draft.meetingPoint.name;
      patch['latitude'] = roundCoordinate(draft.meetingPoint.latitude, PLACE_DECIMALS);
      patch['longitude'] = roundCoordinate(draft.meetingPoint.longitude, PLACE_DECIMALS);
    } else if (draft.place) {
      patch['placeName'] = draft.place;
    }
    if (draft.startsAt) {
      const at = new Date(draft.startsAt);
      patch['start'] = 'custom';
      patch['customTime'] =
        `${String(at.getHours()).padStart(2, '0')}:${String(at.getMinutes()).padStart(2, '0')}`;
    }
    if (draft.minParticipants) {
      patch['hasMinimum'] = true;
      patch['minParticipants'] = draft.minParticipants;
    }
    this.form.patchValue(patch);
    const fields: Record<string, { markAsTouched(): void }> = {
      activity: controls.activity,
      title: controls.title,
      meetingPoint: controls.latitude,
      startsAt: controls.customTime,
      spots: controls.spots,
    };
    draft.missing.forEach((field) => fields[field]?.markAsTouched());
    this.showDraftResult(draft);
  }

  private showDraftResult(draft: PlanDraft): void {
    if (draft.warnings.includes('startsAt.window')) {
      this.showDraft(
        { key: 'publish.draft.timeWindow', params: { hours: MAX_HORIZON_HOURS } },
        'info',
      );
    } else if (draft.warnings.includes('meetingPoint.notFound')) {
      this.showDraft(
        { key: 'publish.draft.placeNotFound', params: { place: draft.place } },
        'info',
      );
    } else if (draft.missing.length) {
      const fields = draft.missing
        .map((field) => this.transloco.translate(`publish.draft.fields.${field}`))
        .join(', ');
      this.showDraft({ key: 'publish.draft.missing', params: { fields } }, 'info');
    } else {
      this.showDraft({ key: 'publish.draft.done' }, 'success');
    }
  }

  private showDraft(message: DraftMessage, severity: 'error' | 'success' | 'info'): void {
    this.draftMessage.set(message);
    this.draftSeverity.set(severity);
  }

  protected async useMyLocation(): Promise<void> {
    this.locating.set(true);
    this.error.set(null);
    try {
      const { latitude, longitude } = await this.location.current(MEETING_POINT_DECIMALS);
      this.form.patchValue({ latitude, longitude });
    } catch (error) {
      this.error.set({
        key: error instanceof LocationError ? error.translationKey : 'errors.location.denied',
      });
    } finally {
      this.locating.set(false);
    }
  }

  /**
   * Places that match what is typed (HU-071), around the approximate location of the device (rounded before it leaves
   * it) or, without it, the zone of the profile. Without either there are no suggestions: the place is written and
   * located by hand, as before.
   */
  protected async searchPlaces(query: string): Promise<void> {
    const search = ++this.placeSearch;
    this.searchArea ??= this.whereToSearch();
    const near = await this.searchArea;
    const places = near ? await firstValueFrom(this.api.suggestPlaces(query.trim(), near)) : [];
    if (search !== this.placeSearch) {
      return;
    }
    this.placeSuggestions.set(places);
    // PrimeNG only opens the list by itself to say that there are none; the places come later, so it is opened here.
    // Without places it stays closed and nothing covers «I'm here»
    if (places.length) {
      this.placeField()?.show();
    } else {
      this.placeField()?.hide();
    }
  }

  /** A suggestion gives the name and the point of the meeting; the name can still be changed. */
  protected choosePlace(place: PlaceSuggestion): void {
    this.error.set(null);
    this.form.patchValue({
      placeName: place.name,
      latitude: roundCoordinate(place.latitude, PLACE_DECIMALS),
      longitude: roundCoordinate(place.longitude, PLACE_DECIMALS),
    });
  }

  protected distance(meters: number): string {
    return formatDistance(meters, this.language.locale());
  }

  private async whereToSearch(): Promise<Coordinates | null> {
    try {
      return await this.location.current();
    } catch {
      const profile = await firstValueFrom(this.users.myProfile().pipe(catchError(() => of(null))));
      return profile?.zone ?? null;
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
    const deadline = value.hasMinimum ? this.minimumDeadline(startsAt) : null;
    if (value.hasMinimum && !deadline) {
      this.error.set({ key: 'publish.chooseDeadline' });
      return;
    }
    this.publishing.set(true);
    this.error.set(null);
    this.api
      .publish({
        activity: value.activity,
        title: value.title.trim(),
        description: value.description.trim() || null,
        meetingPoint: {
          name: value.placeName.trim(),
          latitude: value.latitude!,
          longitude: value.longitude!,
        },
        startsAt: startsAt.toISOString(),
        spots: value.spots,
        level: value.level,
        minParticipants: deadline ? Math.min(value.minParticipants, value.spots) : null,
        minimumDeadline: deadline?.toISOString() ?? null,
      })
      .subscribe({
        next: (plan) =>
          this.router.navigate(['/plans', plan.id], {
            queryParams: { published: 1 },
            // Going back from the published plan does not open the form again
            replaceUrl: true,
          }),
        error: (error) => {
          this.publishing.set(false);
          this.error.set(apiErrorMessage(this.transloco, error, 'errors.publishFailed'));
        },
      });
  }
}
