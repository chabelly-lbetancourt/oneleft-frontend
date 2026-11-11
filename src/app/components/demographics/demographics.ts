import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { UsersApi } from '@core/api/users-api';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import {
  Demographics,
  Gender,
  GENDERS,
  genderKey,
  latestBirthDate,
} from '@shared/model/demographics';

/**
 * Date of birth and gender (HU-070): needed to join a plan with an audience, and only people of age can use OneLeft.
 * The date is never shown to other people, only the age band; it can be changed a couple of times.
 */
@Component({
  selector: 'app-demographics',
  imports: [FormsModule, Button, Message, Select, TranslocoPipe],
  templateUrl: './demographics.html',
  styleUrl: './demographics.scss',
})
export class DemographicsCard implements OnInit {
  private readonly api = inject(UsersApi);
  private readonly transloco = inject(TranslocoService);

  protected readonly loaded = signal(false);
  protected readonly saved = signal<Demographics | null>(null);
  protected readonly birthDate = signal('');
  protected readonly gender = signal<Gender | null>(null);
  protected readonly saving = signal(false);
  protected readonly done = signal(false);
  protected readonly error = signal<ApiErrorMessage | null>(null);
  protected readonly latest = latestBirthDate();
  protected readonly genderOptions = computed(() =>
    GENDERS.map((code) => ({ code, name: this.transloco.translate(genderKey(code)) })),
  );
  protected readonly ready = computed(
    () => !!this.birthDate() && !!this.gender() && this.birthDate() <= this.latest && !this.saving(),
  );

  ngOnInit(): void {
    this.api.demographics().subscribe({
      next: (found) => this.show(found),
      // 404: not set yet; the form is empty
      error: () => this.loaded.set(true),
    });
  }

  protected save(): void {
    if (!this.ready()) {
      return;
    }
    this.saving.set(true);
    this.error.set(null);
    this.done.set(false);
    this.api.saveDemographics({ birthDate: this.birthDate(), gender: this.gender()! }).subscribe({
      next: (found) => {
        this.show(found);
        this.saving.set(false);
        this.done.set(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.error.set(apiErrorMessage(this.transloco, error, 'errors.demographicsFailed'));
      },
    });
  }

  private show(found: Demographics): void {
    this.saved.set(found);
    this.birthDate.set(found.birthDate);
    this.gender.set(found.gender);
    this.loaded.set(true);
  }
}
