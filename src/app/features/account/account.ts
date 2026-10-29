import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { catchError, of } from 'rxjs';
import { UsersApi } from '@core/api/users-api';
import { Session } from '@core/auth/session';
import { ApiErrorMessage, apiErrorMessage } from '@core/i18n/api-error';
import { NativePlatform } from '@core/platform';
import { PageLayout } from '@layout/page-layout/page-layout';
import { ConsentStatus } from '@shared/model/account';

const FILE_NAME = 'oneleft-my-data.json';

/**
 * My data and my account (HU-045): the privacy text I accepted, a download of everything the services keep of me (right
 * of access and portability) and deleting my account (right to erasure), which asks me to type a word first and then
 * signs me out.
 */
@Component({
  selector: 'app-account',
  imports: [
    Button,
    DatePipe,
    FormsModule,
    InputText,
    Message,
    PageLayout,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './account.html',
  styleUrl: './account.scss',
})
export class Account {
  private readonly api = inject(UsersApi);
  private readonly session = inject(Session);
  private readonly platform = inject(NativePlatform);
  private readonly transloco = inject(TranslocoService);

  protected readonly consent = signal<ConsentStatus | null>(null);
  protected readonly consentFailed = signal(false);
  protected readonly downloading = signal(false);
  protected readonly downloadError = signal<ApiErrorMessage | null>(null);
  protected readonly downloaded = signal(false);
  /** The word that has to be typed to delete the account */
  protected readonly confirmation = signal('');
  protected readonly deleting = signal(false);
  protected readonly deleteError = signal<ApiErrorMessage | null>(null);
  protected readonly canDelete = computed(
    () => this.confirmation().trim().toUpperCase() === this.deleteWord().toUpperCase(),
  );

  constructor() {
    this.api
      .consent()
      .pipe(catchError(() => of(null)))
      .subscribe((status) => {
        this.consent.set(status);
        this.consentFailed.set(status === null);
      });
  }

  protected deleteWord(): string {
    return this.transloco.translate('account.deleteWord');
  }

  protected accept(version: string): void {
    this.api.acceptConsent(version).subscribe({
      next: (status) => this.consent.set(status),
      error: () => this.consentFailed.set(true),
    });
  }

  protected download(): void {
    this.downloading.set(true);
    this.downloadError.set(null);
    this.downloaded.set(false);
    this.api.myData().subscribe({
      next: (file) => {
        void this.save(file);
        this.downloading.set(false);
        this.downloaded.set(true);
      },
      error: (error) => {
        this.downloading.set(false);
        this.downloadError.set(this.errorOf(error, 'errors.dataFailed'));
      },
    });
  }

  protected deleteAccount(): void {
    if (!this.canDelete()) {
      return;
    }
    this.deleting.set(true);
    this.deleteError.set(null);
    this.api.deleteMyAccount().subscribe({
      next: () => this.session.logout(),
      error: (error) => {
        this.deleting.set(false);
        this.deleteError.set(this.errorOf(error, 'errors.accountFailed'));
      },
    });
  }

  /** The file goes to the share sheet in the Android app (its WebView cannot download one), to a download elsewhere */
  private async save(file: Blob): Promise<void> {
    if (this.platform.isNative()) {
      await this.platform.shareFile(
        file,
        FILE_NAME,
        this.transloco.translate('account.downloadTitle'),
      );
      return;
    }
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = FILE_NAME;
    link.click();
    URL.revokeObjectURL(url);
  }

  private errorOf(error: unknown, fallback: string): ApiErrorMessage {
    return apiErrorMessage(this.transloco, error, fallback);
  }
}
