import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URLOpenListenerEvent } from '@capacitor/app';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';
import { NATIVE_AUTH_CALLBACK, NativePlatform } from '../platform';

/**
 * Completes the sign-in in the Android app: Keycloak opens oneleft://callback?code=…&state=…, the app closes the
 * system browser and exchanges the code (PKCE) with the same library as the web.
 */
@Injectable({ providedIn: 'root' })
export class NativeAuthCallback {
  private readonly oidc = inject(OidcSecurityService);
  private readonly router = inject(Router);
  private readonly platform = inject(NativePlatform);

  async listen(): Promise<void> {
    if (this.platform.isNative()) {
      await this.platform.onAppUrlOpen((event) => void this.handle(event));
    }
  }

  async handle({ url }: URLOpenListenerEvent): Promise<void> {
    if (!url.startsWith(NATIVE_AUTH_CALLBACK)) {
      return;
    }
    await this.platform.closeBrowser().catch(() => undefined);
    // Sign-in returns with a code; sign-out returns without one
    if (new URL(url).searchParams.has('code')) {
      await firstValueFrom(this.oidc.checkAuth(url));
    }
    await this.router.navigateByUrl('/');
  }
}
