import {
  Avatar,
  LanguageSwitcher
} from "./chunk-O2RYECN5.js";
import {
  Select,
  apiErrorKey
} from "./chunk-XCX75N2L.js";
import {
  Session
} from "./chunk-VB7O3OGR.js";
import "./chunk-YAIMRQ77.js";
import "./chunk-7DJCIE3I.js";
import {
  ApproximateLocation,
  DefaultValueAccessor,
  FormArrayName,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  InputText,
  LocationError,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  SelectButton,
  Validators,
  ɵNgNoValidate
} from "./chunk-B4F4B5X4.js";
import {
  MAX_HOBBIES,
  levelKey
} from "./chunk-3G4RGXYE.js";
import {
  Tag
} from "./chunk-QCHEEBAT.js";
import "./chunk-R55RQCVH.js";
import {
  Message
} from "./chunk-A62MHWYD.js";
import {
  Button,
  activityKey
} from "./chunk-QAKVLXKK.js";
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HttpClient,
  Injectable,
  RouterLink,
  TranslocoPipe,
  TranslocoService,
  computed,
  environment,
  forkJoin,
  inject,
  setClassMetadata,
  signal,
  takeUntilDestroyed,
  toSignal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E45N4KGX.js";
import "./chunk-FDMHZOCR.js";

// src/app/core/api/users-api.ts
var UsersApi = class _UsersApi {
  http = inject(HttpClient);
  base = `${environment.apiUrl}/api/v1/users`;
  me() {
    return this.http.get(`${this.base}/me`);
  }
  myProfile() {
    return this.http.get(`${this.base}/me/profile`);
  }
  updateMyProfile(profile) {
    return this.http.put(`${this.base}/me/profile`, profile);
  }
  catalog() {
    return this.http.get(`${this.base}/activities`);
  }
  static \u0275fac = function UsersApi_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersApi)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsersApi, factory: _UsersApi.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersApi, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/profile/profile.ts
var _c0 = (a0, a1) => ({ latitude: a0, longitude: a1 });
function Profile_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "profile.loading"));
  }
}
function Profile_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "profile.loadError"), " ");
  }
}
function Profile_Conditional_12_Conditional_0_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 35);
    \u0275\u0275pipe(1, "transloco");
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", \u0275\u0275pipeBind1(1, 3, ctx_r2.roleKey(role_r2)))("severity", role_r2 === "ADMIN" ? "danger" : "info")("rounded", true);
  }
}
function Profile_Conditional_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8)(1, "div", 29);
    \u0275\u0275element(2, "p-avatar", 30);
    \u0275\u0275elementStart(3, "div", 31)(4, "h2", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 33);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 34);
    \u0275\u0275repeaterCreate(9, Profile_Conditional_12_Conditional_0_For_10_Template, 2, 5, "p-tag", 35, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const account_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("label", ctx_r2.session.initials());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(account_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(account_r4.email);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(account_r4.roles);
  }
}
function Profile_Conditional_12_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 13);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "profile.displayNameError"));
  }
}
function Profile_Conditional_12_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p-button", 37);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275listener("onClick", function Profile_Conditional_12_Conditional_20_Template_p_button_onClick_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.clearZone());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 3, "profile.approximate", \u0275\u0275pureFunction2(8, _c0, ctx_r2.form.controls.latitude.value, ctx_r2.form.controls.longitude.value)), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(4, 6, "profile.removeZone"))("text", true);
  }
}
function Profile_Conditional_12_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 13);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "profile.zoneError"), " ");
  }
}
function Profile_Conditional_12_For_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "p-select", 38);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 39)(4, "p-selectbutton", 40);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p-button", 41);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275listener("onClick", function Profile_Conditional_12_For_35_Template_p_button_onClick_5_listener() {
      const \u0275$index_115_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.removeHobby(\u0275$index_115_r7));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const \u0275$index_115_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroupName", \u0275$index_115_r7);
    \u0275\u0275advance();
    \u0275\u0275property("options", ctx_r2.activityOptions(\u0275$index_115_r7))("ariaLabel", \u0275\u0275pipeBind1(2, 8, "profile.activity"));
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("options", ctx_r2.levelOptions())("allowEmpty", false);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("text", true)("rounded", true)("ariaLabel", \u0275\u0275pipeBind1(6, 10, "profile.removeHobby"));
  }
}
function Profile_Conditional_12_ForEmpty_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "profile.noHobbies"), " ");
  }
}
function Profile_Conditional_12_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-message", 26);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r8 = ctx;
    \u0275\u0275property("severity", message_r8.severity);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, message_r8.key));
  }
}
function Profile_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, Profile_Conditional_12_Conditional_0_Template, 11, 3, "section", 8);
    \u0275\u0275elementStart(1, "form", 9);
    \u0275\u0275listener("ngSubmit", function Profile_Conditional_12_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.save());
    });
    \u0275\u0275elementStart(2, "section", 10)(3, "label", 11);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 12);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "small", 6);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, Profile_Conditional_12_Conditional_10_Template, 3, 3, "small", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "section", 10)(12, "label", 14);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 15);
    \u0275\u0275pipe(16, "transloco");
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 16)(18, "p-button", 17);
    \u0275\u0275pipe(19, "transloco");
    \u0275\u0275listener("onClick", function Profile_Conditional_12_Template_p_button_onClick_18_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.useMyLocation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, Profile_Conditional_12_Conditional_20_Template, 5, 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "small", 6);
    \u0275\u0275element(22, "i", 18);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, Profile_Conditional_12_Conditional_25_Template, 3, 3, "small", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "section", 19)(27, "div", 20)(28, "h3", 21);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 22);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 23);
    \u0275\u0275repeaterCreate(34, Profile_Conditional_12_For_35_Template, 7, 12, "div", 24, \u0275\u0275repeaterTrackByIdentity, false, Profile_Conditional_12_ForEmpty_36_Template, 3, 3, "p", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p-button", 25);
    \u0275\u0275pipe(38, "transloco");
    \u0275\u0275listener("onClick", function Profile_Conditional_12_Template_p_button_onClick_37_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addHobby());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(39, Profile_Conditional_12_Conditional_39_Template, 3, 4, "p-message", 26);
    \u0275\u0275element(40, "p-button", 27);
    \u0275\u0275pipe(41, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p-button", 28);
    \u0275\u0275pipe(43, "transloco");
    \u0275\u0275listener("onClick", function Profile_Conditional_12_Template_p_button_onClick_42_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.session.logout());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_22_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r2.user()) ? 0 : -1, tmp_1_0);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.form);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 24, "profile.displayName"));
    \u0275\u0275advance(2);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 26, "profile.displayNameHint"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.form.controls.displayName.invalid && ctx_r2.form.controls.displayName.touched ? 10 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 28, "profile.zone"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(16, 30, "profile.zonePlaceholder"));
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(19, 32, "profile.useLocation"))("outlined", true)("loading", ctx_r2.locating());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.form.controls.latitude.value !== null ? 20 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(24, 34, "profile.zonePrivacy"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.form.hasError("zoneIncomplete") ? 25 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 36, "profile.hobbies"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r2.hobbies.length, "/10");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.hobbies.controls);
    \u0275\u0275advance(3);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(38, 38, "profile.addHobby"))("outlined", true)("disabled", !ctx_r2.canAddHobby());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_22_0 = ctx_r2.status()) ? 39 : -1, tmp_22_0);
    \u0275\u0275advance();
    \u0275\u0275property("label", \u0275\u0275pipeBind1(41, 40, "profile.save"))("loading", ctx_r2.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(43, 42, "auth.logout"))("outlined", true);
  }
}
var zoneComplete = (group) => {
  const { zoneName, latitude, longitude } = group.value;
  const hasName = !!zoneName?.trim();
  const hasCoordinates = latitude !== null && longitude !== null;
  return hasName === hasCoordinates ? null : { zoneIncomplete: true };
};
var Profile = class _Profile {
  session = inject(Session);
  api = inject(UsersApi);
  location = inject(ApproximateLocation);
  fb = inject(NonNullableFormBuilder);
  transloco = inject(TranslocoService);
  changeDetector = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  user = signal(
    null,
    ...ngDevMode ? [{ debugName: "user" }] : (
      /* istanbul ignore next */
      []
    )
  );
  catalog = signal(
    null,
    ...ngDevMode ? [{ debugName: "catalog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    true,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loadError = signal(
    false,
    ...ngDevMode ? [{ debugName: "loadError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saving = signal(
    false,
    ...ngDevMode ? [{ debugName: "saving" }] : (
      /* istanbul ignore next */
      []
    )
  );
  locating = signal(
    false,
    ...ngDevMode ? [{ debugName: "locating" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Message under the form, as a translation key. */
  status = signal(
    null,
    ...ngDevMode ? [{ debugName: "status" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** Active language as a signal: the PrimeNG option labels are recomputed when it changes. */
  lang = toSignal(this.transloco.langChanges$, { initialValue: this.transloco.getActiveLang() });
  translate = (key) => {
    this.lang();
    return this.transloco.translate(key);
  };
  levelOptions = computed(
    () => (this.catalog()?.levels ?? []).map((level) => ({ label: this.translate(levelKey(level)), value: level })),
    ...ngDevMode ? [{ debugName: "levelOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  form = this.fb.group({
    displayName: ["", [Validators.required, Validators.maxLength(50)]],
    zoneName: ["", Validators.maxLength(60)],
    latitude: this.fb.control(null),
    longitude: this.fb.control(null),
    hobbies: this.fb.array([])
  }, { validators: zoneComplete });
  get hobbies() {
    return this.form.controls.hobbies;
  }
  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.changeDetector.markForCheck());
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
      }
    });
  }
  roleKey(role) {
    return role === "ADMIN" ? "roles.ADMIN" : "roles.USER";
  }
  /** Activities that can be chosen in a row: those not used in the other rows. */
  activityOptions(index) {
    const usedElsewhere = new Set(this.hobbies.controls.filter((_, i) => i !== index).map((hobby) => hobby.controls.activity.value));
    return (this.catalog()?.activities ?? []).filter((code) => !usedElsewhere.has(code)).map((code) => ({ code, name: this.translate(activityKey(code)) }));
  }
  canAddHobby() {
    return this.hobbies.length < MAX_HOBBIES && this.nextFreeActivity() !== void 0;
  }
  addHobby() {
    const next = this.nextFreeActivity();
    if (next && this.hobbies.length < MAX_HOBBIES) {
      this.hobbies.push(this.hobbyGroup(next, "INTERMEDIATE"));
    }
  }
  removeHobby(index) {
    this.hobbies.removeAt(index);
  }
  async useMyLocation() {
    this.locating.set(true);
    this.status.set(null);
    try {
      const { latitude, longitude } = await this.location.current();
      this.form.patchValue({ latitude, longitude });
      if (!this.form.controls.zoneName.value.trim()) {
        this.form.controls.zoneName.setValue(this.transloco.translate("profile.myZone"));
      }
    } catch (error) {
      this.status.set({
        severity: "error",
        key: error instanceof LocationError ? error.translationKey : "errors.location.denied"
      });
    } finally {
      this.locating.set(false);
    }
  }
  clearZone() {
    this.form.patchValue({ zoneName: "", latitude: null, longitude: null });
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { displayName, zoneName, latitude, longitude, hobbies } = this.form.getRawValue();
    const zone = zoneName.trim() && latitude !== null && longitude !== null ? { name: zoneName.trim(), latitude, longitude } : null;
    this.saving.set(true);
    this.status.set(null);
    this.api.updateMyProfile({ displayName: displayName.trim(), zone, hobbies }).subscribe({
      next: (profile) => {
        this.fill(profile);
        this.saving.set(false);
        this.status.set({ severity: "success", key: "profile.saved" });
      },
      error: (error) => {
        this.saving.set(false);
        this.status.set({ severity: "error", key: apiErrorKey(this.transloco, error, "errors.saveFailed") });
      }
    });
  }
  nextFreeActivity() {
    const used = new Set(this.hobbies.controls.map((hobby) => hobby.controls.activity.value));
    return this.catalog()?.activities.find((activity) => !used.has(activity));
  }
  fill(profile) {
    this.hobbies.clear();
    profile.hobbies.forEach((hobby) => this.hobbies.push(this.hobbyGroup(hobby.activity, hobby.level)));
    this.form.patchValue({
      displayName: profile.displayName,
      zoneName: profile.zone?.name ?? "",
      latitude: profile.zone?.latitude ?? null,
      longitude: profile.zone?.longitude ?? null
    });
    this.form.markAsPristine();
  }
  hobbyGroup(activity, level) {
    return this.fb.group({
      activity: [activity, Validators.required],
      level: this.fb.control(level, Validators.required)
    });
  }
  static \u0275fac = function Profile_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Profile)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Profile, selectors: [["app-profile"]], decls: 13, vars: 9, consts: [[1, "min-h-full"], [1, "bg-surface-0", "border-b", "border-surface-200"], [1, "mx-auto", "max-w-3xl", "flex", "items-center", "gap-2", "px-4", "py-3"], ["icon", "pi pi-arrow-left", "routerLink", "/", 3, "text", "rounded", "ariaLabel"], [1, "text-lg", "font-bold", "flex-1"], [1, "mx-auto", "max-w-3xl", "px-4", "py-6", "pb-16"], [1, "text-muted-color"], [1, "profile-error", "rounded-2xl", "border", "border-red-200", "bg-red-50", "p-4", "text-red-800"], [1, "profile-card", "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-5", "shadow-sm"], [1, "profile-form", "mt-6", "flex", "flex-col", "gap-6", 3, "ngSubmit", "formGroup"], [1, "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-5", "shadow-sm", "flex", "flex-col", "gap-2"], ["for", "displayName", 1, "font-semibold"], ["pInputText", "", "id", "displayName", "formControlName", "displayName", "maxlength", "50"], [1, "field-error", "text-red-600"], ["for", "zoneName", 1, "font-semibold"], ["pInputText", "", "id", "zoneName", "formControlName", "zoneName", "maxlength", "60", 3, "placeholder"], [1, "flex", "flex-wrap", "items-center", "gap-2"], ["icon", "pi pi-map-marker", "severity", "secondary", "size", "small", 3, "onClick", "label", "outlined", "loading"], ["aria-hidden", "true", 1, "pi", "pi-lock", "text-xs"], [1, "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-5", "shadow-sm", "flex", "flex-col", "gap-3"], [1, "flex", "items-center", "justify-between"], [1, "font-semibold"], [1, "text-sm", "text-muted-color"], ["formArrayName", "hobbies", 1, "flex", "flex-col", "gap-3"], [1, "hobby-row", "flex", "flex-col", "gap-2", "sm:flex-row", "sm:items-center", 3, "formGroupName"], ["icon", "pi pi-plus", "severity", "secondary", "size", "small", 3, "onClick", "label", "outlined", "disabled"], [1, "status-message", 3, "severity"], ["type", "submit", "icon", "pi pi-check", "styleClass", "w-full", 3, "label", "loading"], ["icon", "pi pi-sign-out", "severity", "secondary", "styleClass", "w-full", 1, "logout-button", "block", "mt-4", 3, "onClick", "label", "outlined"], [1, "flex", "items-center", "gap-4"], ["shape", "circle", "size", "xlarge", 1, "bg-primary-100!", "text-primary-700!", "font-bold", 3, "label"], [1, "min-w-0"], [1, "text-xl", "font-bold", "truncate"], [1, "text-muted-color", "truncate"], [1, "mt-4", "flex", "flex-wrap", "gap-2"], [3, "value", "severity", "rounded"], [1, "zone-coordinates", "text-sm", "text-muted-color"], ["size", "small", "severity", "secondary", 3, "onClick", "label", "text"], ["formControlName", "activity", "optionLabel", "name", "optionValue", "code", 1, "sm:w-48", 3, "options", "ariaLabel"], [1, "flex", "items-center", "justify-between", "gap-2", "sm:flex-1"], ["formControlName", "level", "optionLabel", "label", "optionValue", "value", "size", "small", 3, "options", "allowEmpty"], ["icon", "pi pi-trash", "severity", "danger", 3, "onClick", "text", "rounded", "ariaLabel"]], template: function Profile_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
      \u0275\u0275element(3, "p-button", 3);
      \u0275\u0275pipe(4, "transloco");
      \u0275\u0275elementStart(5, "h1", 4);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "app-language-switcher");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "main", 5);
      \u0275\u0275conditionalCreate(10, Profile_Conditional_10_Template, 3, 3, "p", 6)(11, Profile_Conditional_11_Template, 3, 3, "div", 7)(12, Profile_Conditional_12_Template, 44, 44);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("text", true)("rounded", true)("ariaLabel", \u0275\u0275pipeBind1(4, 5, "app.back"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 7, "profile.title"));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading() ? 10 : ctx.loadError() ? 11 : 12);
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    MaxLengthValidator,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    FormArrayName,
    RouterLink,
    Avatar,
    Button,
    InputText,
    LanguageSwitcher,
    Message,
    Select,
    SelectButton,
    Tag,
    TranslocoPipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Profile, [{
    type: Component,
    args: [{ selector: "app-profile", imports: [
      ReactiveFormsModule,
      RouterLink,
      Avatar,
      Button,
      InputText,
      LanguageSwitcher,
      Message,
      Select,
      SelectButton,
      Tag,
      TranslocoPipe
    ], template: `<div class="min-h-full">
  <header class="bg-surface-0 border-b border-surface-200">
    <div class="mx-auto max-w-3xl flex items-center gap-2 px-4 py-3">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true" routerLink="/" [ariaLabel]="'app.back' | transloco" />
      <h1 class="text-lg font-bold flex-1">{{ 'profile.title' | transloco }}</h1>
      <app-language-switcher />
    </div>
  </header>

  <main class="mx-auto max-w-3xl px-4 py-6 pb-16">
    @if (loading()) {
      <p class="text-muted-color">{{ 'profile.loading' | transloco }}</p>
    } @else if (loadError()) {
      <div class="profile-error rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
        {{ 'profile.loadError' | transloco }}
      </div>
    } @else {
      @if (user(); as account) {
        <section class="profile-card rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm">
          <div class="flex items-center gap-4">
            <p-avatar
              [label]="session.initials()"
              shape="circle"
              size="xlarge"
              class="bg-primary-100! text-primary-700! font-bold"
            />
            <div class="min-w-0">
              <h2 class="text-xl font-bold truncate">{{ account.name }}</h2>
              <p class="text-muted-color truncate">{{ account.email }}</p>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            @for (role of account.roles; track role) {
              <p-tag [value]="roleKey(role) | transloco" [severity]="role === 'ADMIN' ? 'danger' : 'info'" [rounded]="true" />
            }
          </div>
        </section>
      }

      <form class="profile-form mt-6 flex flex-col gap-6" [formGroup]="form" (ngSubmit)="save()">
        <section class="rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-2">
          <label for="displayName" class="font-semibold">{{ 'profile.displayName' | transloco }}</label>
          <input pInputText id="displayName" formControlName="displayName" maxlength="50" />
          <small class="text-muted-color">{{ 'profile.displayNameHint' | transloco }}</small>
          @if (form.controls.displayName.invalid && form.controls.displayName.touched) {
            <small class="field-error text-red-600">{{ 'profile.displayNameError' | transloco }}</small>
          }
        </section>

        <section class="rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-2">
          <label for="zoneName" class="font-semibold">{{ 'profile.zone' | transloco }}</label>
          <input
            pInputText
            id="zoneName"
            formControlName="zoneName"
            [placeholder]="'profile.zonePlaceholder' | transloco"
            maxlength="60"
          />
          <div class="flex flex-wrap items-center gap-2">
            <p-button
              [label]="'profile.useLocation' | transloco"
              icon="pi pi-map-marker"
              severity="secondary"
              size="small"
              [outlined]="true"
              [loading]="locating()"
              (onClick)="useMyLocation()"
            />
            @if (form.controls.latitude.value !== null) {
              <span class="zone-coordinates text-sm text-muted-color">
                {{ 'profile.approximate' | transloco: { latitude: form.controls.latitude.value, longitude: form.controls.longitude.value } }}
              </span>
              <p-button [label]="'profile.removeZone' | transloco" size="small" [text]="true" severity="secondary" (onClick)="clearZone()" />
            }
          </div>
          <small class="text-muted-color">
            <i class="pi pi-lock text-xs" aria-hidden="true"></i>
            {{ 'profile.zonePrivacy' | transloco }}
          </small>
          @if (form.hasError('zoneIncomplete')) {
            <small class="field-error text-red-600">
              {{ 'profile.zoneError' | transloco }}
            </small>
          }
        </section>

        <section class="rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">{{ 'profile.hobbies' | transloco }}</h3>
            <span class="text-sm text-muted-color">{{ hobbies.length }}/10</span>
          </div>

          <div formArrayName="hobbies" class="flex flex-col gap-3">
            @for (hobby of hobbies.controls; track hobby; let i = $index) {
              <div class="hobby-row flex flex-col gap-2 sm:flex-row sm:items-center" [formGroupName]="i">
                <p-select
                  formControlName="activity"
                  [options]="activityOptions(i)"
                  optionLabel="name"
                  optionValue="code"
                  class="sm:w-48"
                  [ariaLabel]="'profile.activity' | transloco"
                />
                <div class="flex items-center justify-between gap-2 sm:flex-1">
                  <p-selectbutton
                    formControlName="level"
                    [options]="levelOptions()"
                    optionLabel="label"
                    optionValue="value"
                    [allowEmpty]="false"
                    size="small"
                  />
                  <p-button
                    icon="pi pi-trash"
                    severity="danger"
                    [text]="true"
                    [rounded]="true"
                    [ariaLabel]="'profile.removeHobby' | transloco"
                    (onClick)="removeHobby(i)"
                  />
                </div>
              </div>
            } @empty {
              <p class="text-sm text-muted-color">
                {{ 'profile.noHobbies' | transloco }}
              </p>
            }
          </div>

          <p-button
            [label]="'profile.addHobby' | transloco"
            icon="pi pi-plus"
            severity="secondary"
            [outlined]="true"
            size="small"
            [disabled]="!canAddHobby()"
            (onClick)="addHobby()"
          />
        </section>

        @if (status(); as message) {
          <p-message [severity]="message.severity" class="status-message">{{ message.key | transloco }}</p-message>
        }

        <p-button
          type="submit"
          [label]="'profile.save' | transloco"
          icon="pi pi-check"
          [loading]="saving()"
          styleClass="w-full"
        />
      </form>

      <p-button
        [label]="'auth.logout' | transloco"
        icon="pi pi-sign-out"
        severity="secondary"
        [outlined]="true"
        class="logout-button block mt-4"
        styleClass="w-full"
        (onClick)="session.logout()"
      />
    }
  </main>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Profile, { className: "Profile", filePath: "src/app/features/profile/profile.ts", lineNumber: 62 });
})();
export {
  Profile
};
//# debugId=b0e26dd0-9536-58b6-94b2-df7bebaff4b4
//# sourceMappingURL=chunk-VZBQECTJ.js.map
