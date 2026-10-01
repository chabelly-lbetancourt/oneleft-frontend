import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { NativePlatform } from '../platform';
import { NativeAuthCallback } from './native-auth-callback';

describe('NativeAuthCallback', () => {
  const platform = { isNative: vi.fn(), closeBrowser: vi.fn(), onAppUrlOpen: vi.fn() };
  const oidc = { checkAuth: vi.fn(() => of({ isAuthenticated: true })) };
  let callback: NativeAuthCallback;
  let navigate: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    platform.closeBrowser.mockResolvedValue(undefined);
    platform.onAppUrlOpen.mockResolvedValue({});
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: NativePlatform, useValue: platform },
        { provide: OidcSecurityService, useValue: oidc },
      ],
    });
    callback = TestBed.inject(NativeAuthCallback);
    navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
  });

  it('should only listen for deep links in the Android app', async () => {
    platform.isNative.mockReturnValue(false);
    await callback.listen();
    expect(platform.onAppUrlOpen).not.toHaveBeenCalled();

    platform.isNative.mockReturnValue(true);
    await callback.listen();
    expect(platform.onAppUrlOpen).toHaveBeenCalledOnce();
  });

  it('should close the browser and exchange the code when Keycloak returns', async () => {
    platform.isNative.mockReturnValue(true);
    await callback.listen();
    const listener = platform.onAppUrlOpen.mock.calls[0][0] as (event: { url: string }) => void;

    listener({ url: 'oneleft://callback?code=abc&state=xyz' });
    await vi.waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));

    expect(platform.closeBrowser).toHaveBeenCalled();
    expect(oidc.checkAuth).toHaveBeenCalledWith('oneleft://callback?code=abc&state=xyz');
  });

  it('should go home after signing out without exchanging anything', async () => {
    platform.closeBrowser.mockRejectedValue(new Error('not open'));
    await callback.handle({ url: 'oneleft://callback' });
    expect(oidc.checkAuth).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should ignore other links', async () => {
    await callback.handle({ url: 'https://example.org/somewhere' });
    expect(platform.closeBrowser).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });
});
