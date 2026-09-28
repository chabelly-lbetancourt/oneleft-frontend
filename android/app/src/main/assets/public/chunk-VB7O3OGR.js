import {
  NativePlatform,
  OidcSecurityService
} from "./chunk-YAIMRQ77.js";
import {
  Language
} from "./chunk-R55RQCVH.js";
import {
  Injectable,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-E45N4KGX.js";
import {
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/core/auth/session.ts
var Session = class _Session {
  oidc = inject(OidcSecurityService);
  language = inject(Language);
  platform = inject(NativePlatform);
  isAuthenticated = computed(
    () => this.oidc.authenticated().isAuthenticated,
    ...ngDevMode ? [{ debugName: "isAuthenticated" }] : (
      /* istanbul ignore next */
      []
    )
  );
  userName = computed(
    () => {
      const data = this.oidc.userData().userData;
      return data?.name ?? data?.preferred_username ?? data?.email ?? "";
    },
    ...ngDevMode ? [{ debugName: "userName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  initials = computed(
    () => this.userName().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join(""),
    ...ngDevMode ? [{ debugName: "initials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The Keycloak pages use the language of the app (ui_locales). */
  login() {
    this.oidc.authorize(void 0, __spreadValues({ customParams: { ui_locales: this.language.current() } }, this.urlHandler()));
  }
  /** Opens the Keycloak registration form directly. */
  register() {
    this.oidc.authorize(void 0, __spreadValues({
      customParams: { prompt: "create", ui_locales: this.language.current() }
    }, this.urlHandler()));
  }
  /** Current access token, for requests the HTTP interceptor does not see (for example, streams opened with fetch). */
  accessToken() {
    return firstValueFrom(this.oidc.getAccessToken());
  }
  logout() {
    this.oidc.logoffAndRevokeTokens(void 0, this.urlHandler()).subscribe();
  }
  /**
   * In the Android app the Keycloak pages open in the system browser (Custom Tabs), not in the WebView: Google does
   * not allow signing in inside an embedded WebView, and the user sees the real address of the login page.
   */
  urlHandler() {
    return this.platform.isNative() ? { urlHandler: (url) => void this.platform.openBrowser(url) } : {};
  }
  static \u0275fac = function Session_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Session)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _Session, factory: _Session.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Session, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  Session
};
//# debugId=19cf71b8-429f-521d-b7b4-1556d20fd053
//# sourceMappingURL=chunk-VB7O3OGR.js.map
