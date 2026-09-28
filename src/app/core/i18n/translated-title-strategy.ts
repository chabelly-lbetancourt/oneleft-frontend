import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { switchMap } from 'rxjs';

/** Route titles are translation keys; the page title follows the active language. */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly transloco = inject(TranslocoService);
  private key = 'titles.home';

  constructor() {
    super();
    this.transloco.langChanges$
      .pipe(
        switchMap(() => this.transloco.selectTranslate(this.key)),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe((text) => this.title.setTitle(text));
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.key = this.buildTitle(snapshot) ?? 'titles.home';
    this.transloco.selectTranslate(this.key).subscribe((text) => this.title.setTitle(text));
  }
}
