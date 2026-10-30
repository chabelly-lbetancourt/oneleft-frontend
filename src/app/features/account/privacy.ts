import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PageLayout } from '@layout/page-layout/page-layout';

/** The sections of the privacy text, by their key under {@code privacy.sections} */
const SECTIONS = ['who', 'data', 'why', 'sharing', 'keeping', 'ai', 'rights', 'minors'];

/**
 * The privacy text (HU-045), public so that it can be read before signing up. Its version is the one the consent
 * refers to (PrivacyPolicy of the users service).
 */
@Component({
  selector: 'app-privacy',
  imports: [PageLayout, TranslocoPipe],
  templateUrl: './privacy.html',
  styleUrl: './account.scss',
})
export class Privacy {
  protected readonly sections = SECTIONS;
}
