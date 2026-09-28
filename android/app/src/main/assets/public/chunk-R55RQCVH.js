import {
  DOCUMENT,
  Injectable,
  TranslocoService,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-E45N4KGX.js";

// src/app/core/i18n/language.ts
var LANGUAGES = ["es", "en"];
var DEFAULT_LANGUAGE = "es";
var STORAGE_KEY = "oneleft.language";
var LOCALES = { es: "es-ES", en: "en-GB" };
var isLanguage = (value) => LANGUAGES.includes(value);
var initialLanguage = (stored, preferred) => {
  if (isLanguage(stored)) {
    return stored;
  }
  const match = preferred.map((tag) => tag.slice(0, 2).toLowerCase()).find(isLanguage);
  return match ?? DEFAULT_LANGUAGE;
};
var Language = class _Language {
  transloco = inject(TranslocoService);
  document = inject(DOCUMENT);
  current = signal(
    DEFAULT_LANGUAGE,
    ...ngDevMode ? [{ debugName: "current" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locale = computed(
    () => LOCALES[this.current()],
    ...ngDevMode ? [{ debugName: "locale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  other = computed(
    () => this.current() === "es" ? "en" : "es",
    ...ngDevMode ? [{ debugName: "other" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Chooses the initial language and waits for its translations, so that components can translate synchronously
   * (for example, the labels of the PrimeNG options).
   */
  init() {
    const navigator = this.document.defaultView?.navigator;
    const language = initialLanguage(this.read(), navigator?.languages ?? [navigator?.language ?? ""]);
    this.use(language, false);
    return firstValueFrom(this.transloco.load(language));
  }
  use(language, remember = true) {
    this.transloco.setActiveLang(language);
    this.current.set(language);
    this.document.documentElement.lang = language;
    if (remember) {
      this.write(language);
    }
  }
  // Storage can be missing or blocked (private mode, WebView settings): the app works without it
  read() {
    try {
      return this.document.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }
  write(language) {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, language);
    } catch {
    }
  }
  static \u0275fac = function Language_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Language)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _Language, factory: _Language.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Language, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  Language
};
//# debugId=23aa7bdb-2025-5d01-95cc-a4f840d73172
//# sourceMappingURL=chunk-R55RQCVH.js.map
