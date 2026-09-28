import { ChangeDetectorRef, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Tag } from 'primeng/tag';
import { forkJoin } from 'rxjs';
import { UsersApi } from '../../core/api/users-api';
import { Session } from '../../core/auth/session';
import { ApproximateLocation } from '../../core/geo/approximate-location';
import { Catalog, LEVEL_LABELS, Level, MAX_HOBBIES, MyProfile } from '../../shared/model/profile';
import { UserProfile } from '../../shared/model/user';

type HobbyForm = FormGroup<{ activity: FormControl<string>; level: FormControl<Level> }>;

/** La zona es opcional, pero si se indica necesita nombre y coordenadas. */
const zoneComplete = (group: AbstractControl): ValidationErrors | null => {
  const { zoneName, latitude, longitude } = group.value as {
    zoneName: string;
    latitude: number | null;
    longitude: number | null;
  };
  const hasName = !!zoneName?.trim();
  const hasCoordinates = latitude !== null && longitude !== null;
  return hasName === hasCoordinates ? null : { zoneIncomplete: true };
};

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterLink, Avatar, Button, InputText, Message, Select, SelectButton, Tag],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  protected readonly session = inject(Session);
  private readonly api = inject(UsersApi);
  private readonly location = inject(ApproximateLocation);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly user = signal<UserProfile | null>(null);
  protected readonly catalog = signal<Catalog | null>(null);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);
  protected readonly saving = signal(false);
  protected readonly locating = signal(false);
  protected readonly status = signal<{ severity: 'success' | 'error'; text: string } | null>(null);

  protected readonly levelOptions = computed(() =>
    (this.catalog()?.levels ?? []).map((level) => ({ label: LEVEL_LABELS[level], value: level })),
  );

  protected readonly form = this.fb.group(
    {
      displayName: ['', [Validators.required, Validators.maxLength(50)]],
      zoneName: ['', Validators.maxLength(60)],
      latitude: this.fb.control<number | null>(null),
      longitude: this.fb.control<number | null>(null),
      hobbies: this.fb.array<HobbyForm>([]),
    },
    { validators: zoneComplete },
  );

  protected get hobbies() {
    return this.form.controls.hobbies;
  }

  ngOnInit(): void {
    // Sin Zone.js, los cambios del formulario (que no son signals) no refrescan la vista por sí solos
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetector.markForCheck());
    forkJoin({ user: this.api.me(), profile: this.api.myProfile(), catalog: this.api.catalog() }).subscribe({
      next: ({ user, profile, catalog }) => {
        this.user.set(user);
        this.catalog.set(catalog);
        this.fill(profile);
        this.loading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.loading.set(false);
      },
    });
  }

  protected roleLabel(role: string): string {
    return role === 'ADMIN' ? 'Administrador' : 'Usuario';
  }

  /** Actividades que se pueden elegir en una fila: las no usadas en las demás filas. */
  protected activityOptions(index: number): { code: string; name: string }[] {
    const usedElsewhere = new Set(
      this.hobbies.controls.filter((_, i) => i !== index).map((hobby) => hobby.controls.activity.value),
    );
    return (this.catalog()?.activities ?? []).filter((activity) => !usedElsewhere.has(activity.code));
  }

  protected canAddHobby(): boolean {
    return this.hobbies.length < MAX_HOBBIES && this.nextFreeActivity() !== undefined;
  }

  protected addHobby(): void {
    const next = this.nextFreeActivity();
    if (next && this.hobbies.length < MAX_HOBBIES) {
      this.hobbies.push(this.hobbyGroup(next.code, 'INTERMEDIO'));
    }
  }

  protected removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  protected async useMyLocation(): Promise<void> {
    this.locating.set(true);
    this.status.set(null);
    try {
      const { latitude, longitude } = await this.location.current();
      this.form.patchValue({ latitude, longitude });
      if (!this.form.controls.zoneName.value.trim()) {
        this.form.controls.zoneName.setValue('Mi zona');
      }
    } catch (error) {
      this.status.set({ severity: 'error', text: (error as Error).message });
    } finally {
      this.locating.set(false);
    }
  }

  protected clearZone(): void {
    this.form.patchValue({ zoneName: '', latitude: null, longitude: null });
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { displayName, zoneName, latitude, longitude, hobbies } = this.form.getRawValue();
    const zone =
      zoneName.trim() && latitude !== null && longitude !== null
        ? { name: zoneName.trim(), latitude, longitude }
        : null;
    this.saving.set(true);
    this.status.set(null);
    this.api.updateMyProfile({ displayName: displayName.trim(), zone, hobbies }).subscribe({
      next: (profile) => {
        this.fill(profile);
        this.saving.set(false);
        this.status.set({ severity: 'success', text: 'Perfil guardado' });
      },
      error: (error) => {
        this.saving.set(false);
        this.status.set({ severity: 'error', text: error?.error?.detail ?? 'No se ha podido guardar el perfil' });
      },
    });
  }

  private nextFreeActivity(): { code: string; name: string } | undefined {
    const used = new Set(this.hobbies.controls.map((hobby) => hobby.controls.activity.value));
    return this.catalog()?.activities.find((activity) => !used.has(activity.code));
  }

  private fill(profile: MyProfile): void {
    this.hobbies.clear();
    profile.hobbies.forEach((hobby) => this.hobbies.push(this.hobbyGroup(hobby.activity, hobby.level)));
    this.form.patchValue({
      displayName: profile.displayName,
      zoneName: profile.zone?.name ?? '',
      latitude: profile.zone?.latitude ?? null,
      longitude: profile.zone?.longitude ?? null,
    });
    this.form.markAsPristine();
  }

  private hobbyGroup(activity: string, level: Level): HobbyForm {
    return this.fb.group({
      activity: [activity, Validators.required],
      level: this.fb.control<Level>(level, Validators.required),
    });
  }
}
