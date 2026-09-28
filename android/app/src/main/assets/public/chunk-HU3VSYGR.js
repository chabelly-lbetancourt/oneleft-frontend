import {
  Avatar,
  LanguageSwitcher
} from "./chunk-O2RYECN5.js";
import {
  Session
} from "./chunk-VB7O3OGR.js";
import "./chunk-YAIMRQ77.js";
import "./chunk-7DJCIE3I.js";
import {
  Tag
} from "./chunk-QCHEEBAT.js";
import {
  Language
} from "./chunk-R55RQCVH.js";
import {
  clockTime,
  spotsKey,
  startsIn
} from "./chunk-2ZDUKJAI.js";
import {
  Button,
  activityOf
} from "./chunk-QAKVLXKK.js";
import {
  Component,
  RouterLink,
  TranslocoPipe,
  environment,
  httpResource,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-E45N4KGX.js";
import "./chunk-FDMHZOCR.js";

// src/app/features/home/home.ts
var _c0 = (a0) => ["/plans", a0];
var _c1 = (a0) => ({ count: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function Home_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6);
    \u0275\u0275element(1, "p-avatar", 24);
    \u0275\u0275elementStart(2, "span", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("label", ctx_r0.session.initials());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.session.userName());
  }
}
function Home_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "p-button", 26);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275listener("onClick", function Home_Conditional_10_Template_p_button_onClick_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.session.register());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p-button", 27);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275listener("onClick", function Home_Conditional_10_Template_p_button_onClick_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.session.login());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("label", \u0275\u0275pipeBind1(2, 4, "auth.register"))("text", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(4, 6, "auth.login"))("rounded", true);
  }
}
function Home_Conditional_18_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 30);
    \u0275\u0275element(2, "i", 31);
    \u0275\u0275elementStart(3, "span", 17)(4, "span", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 33);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "p-tag", 34);
    \u0275\u0275pipe(10, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const plan_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(15, _c0, plan_r3.id));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("pi ", ctx_r0.activityOf(plan_r3.activity).icon, " text-primary text-xl"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(plan_r3.title);
    const myStart_r4 = ctx_r0.startsIn(plan_r3.startsAt);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r0.clockTime(plan_r3.startsAt), " \xB7 ", \u0275\u0275pipeBind2(8, 9, myStart_r4.key, myStart_r4.params), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", \u0275\u0275pipeBind2(10, 12, ctx_r0.spotsKey(plan_r3.freeSpots), \u0275\u0275pureFunction1(17, _c1, plan_r3.freeSpots)))("rounded", true);
  }
}
function Home_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 12)(1, "h2", 28);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 29);
    \u0275\u0275repeaterCreate(5, Home_Conditional_18_For_6_Template, 11, 19, "li", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "home.myPlans"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.myPlans.value());
  }
}
var Home = class _Home {
  session = inject(Session);
  language = inject(Language);
  /** Plans I organize that have not started yet (only with a session). */
  myPlans = httpResource(
    () => this.session.isAuthenticated() ? `${environment.apiUrl}/api/v1/plans/mine` : void 0,
    ...ngDevMode ? [{ debugName: "myPlans" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activityOf = activityOf;
  spotsKey = spotsKey;
  startsIn(startsAt) {
    return startsIn(new Date(startsAt), /* @__PURE__ */ new Date());
  }
  clockTime(startsAt) {
    return clockTime(new Date(startsAt), this.language.locale());
  }
  static \u0275fac = function Home_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Home)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Home, selectors: [["app-home"]], decls: 35, vars: 18, consts: [[1, "min-h-full", "flex", "flex-col"], [1, "sticky", "top-0", "z-10", "bg-surface-0/90", "backdrop-blur", "border-b", "border-surface-200"], [1, "mx-auto", "max-w-3xl", "flex", "items-center", "justify-between", "px-4", "py-3"], [1, "text-xl", "font-extrabold", "tracking-tight"], [1, "text-primary"], [1, "flex", "items-center", "gap-1"], ["routerLink", "/profile", 1, "user-menu", "flex", "items-center", "gap-2", "rounded-full", "py-1", "pl-1", "pr-3", "hover:bg-surface-100"], [1, "flex", "gap-1"], [1, "mx-auto", "w-full", "max-w-3xl", "flex-1", "px-4", "pb-28"], [1, "py-8"], [1, "text-3xl", "sm:text-4xl", "font-extrabold", "leading-tight", 3, "innerHTML"], [1, "mt-2", "text-muted-color"], ["aria-labelledby", "my-plans-title", 1, "my-plans", "mb-8"], ["aria-labelledby", "nearby-title"], ["routerLink", "/plans/nearby", 1, "nearby-entry", "flex", "items-center", "gap-4", "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-5", "shadow-sm", "hover:border-primary-300"], [1, "flex", "size-14", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-primary-50", "text-primary"], ["aria-hidden", "true", 1, "pi", "pi-map-marker", "text-2xl"], [1, "flex-1", "min-w-0"], ["id", "nearby-title", 1, "text-lg", "font-bold"], [1, "text-sm", "text-muted-color"], ["aria-hidden", "true", 1, "pi", "pi-chevron-right", "text-muted-color"], [1, "fixed", "inset-x-0", "bottom-0", "p-4", "bg-gradient-to-t", "from-surface-50", "via-surface-50/95"], [1, "mx-auto", "max-w-3xl"], ["icon", "pi pi-plus", "styleClass", "w-full", "size", "large", "routerLink", "/plans/new", 3, "label", "rounded"], ["shape", "circle", 1, "bg-primary-100!", "text-primary-700!", "font-semibold", 3, "label"], [1, "text-sm", "font-medium"], ["size", "small", "severity", "secondary", 3, "onClick", "label", "text"], ["icon", "pi pi-user", "size", "small", 3, "onClick", "label", "rounded"], ["id", "my-plans-title", 1, "text-lg", "font-bold", "mb-3"], [1, "flex", "flex-col", "gap-2"], [1, "my-plan", "flex", "items-center", "gap-3", "rounded-2xl", "bg-primary-50", "border", "border-primary-200", "p-3", 3, "routerLink"], ["aria-hidden", "true"], [1, "block", "font-semibold", "truncate"], [1, "block", "text-sm", "text-muted-color"], ["severity", "warn", 1, "shrink-0", "whitespace-nowrap", 3, "value", "rounded"]], template: function Home_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, " One");
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6, "Left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275element(8, "app-language-switcher");
      \u0275\u0275conditionalCreate(9, Home_Conditional_9_Template, 4, 2, "a", 6)(10, Home_Conditional_10_Template, 5, 8, "div", 7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "main", 8)(12, "section", 9);
      \u0275\u0275element(13, "h1", 10);
      \u0275\u0275pipe(14, "transloco");
      \u0275\u0275elementStart(15, "p", 11);
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "transloco");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(18, Home_Conditional_18_Template, 7, 3, "section", 12);
      \u0275\u0275elementStart(19, "section", 13)(20, "a", 14)(21, "div", 15);
      \u0275\u0275element(22, "i", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 17)(24, "h2", 18);
      \u0275\u0275text(25);
      \u0275\u0275pipe(26, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 19);
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "transloco");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(30, "i", 20);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 21)(32, "div", 22);
      \u0275\u0275element(33, "p-button", 23);
      \u0275\u0275pipe(34, "transloco");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.session.isAuthenticated() ? 9 : 10);
      \u0275\u0275advance(4);
      \u0275\u0275property("innerHTML", \u0275\u0275pipeBind1(14, 8, "home.title"), \u0275\u0275sanitizeHtml);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 10, "home.subtitle"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.session.isAuthenticated() && ctx.myPlans.value()?.length ? 18 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 12, "home.nearby"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 14, "home.nearbyHint"));
      \u0275\u0275advance(5);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(34, 16, "home.publish"))("rounded", true);
    }
  }, dependencies: [Avatar, Button, LanguageSwitcher, RouterLink, Tag, TranslocoPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Home, [{
    type: Component,
    args: [{ selector: "app-home", imports: [Avatar, Button, LanguageSwitcher, RouterLink, Tag, TranslocoPipe], template: `<div class="min-h-full flex flex-col">
  <header class="sticky top-0 z-10 bg-surface-0/90 backdrop-blur border-b border-surface-200">
    <div class="mx-auto max-w-3xl flex items-center justify-between px-4 py-3">
      <span class="text-xl font-extrabold tracking-tight">
        One<span class="text-primary">Left</span>
      </span>
      <div class="flex items-center gap-1">
      <app-language-switcher />
      @if (session.isAuthenticated()) {
        <a
          routerLink="/profile"
          class="user-menu flex items-center gap-2 rounded-full py-1 pl-1 pr-3 hover:bg-surface-100"
        >
          <p-avatar
            [label]="session.initials()"
            shape="circle"
            class="bg-primary-100! text-primary-700! font-semibold"
          />
          <span class="text-sm font-medium">{{ session.userName() }}</span>
        </a>
      } @else {
        <div class="flex gap-1">
          <p-button
            [label]="'auth.register' | transloco"
            [text]="true"
            size="small"
            severity="secondary"
            (onClick)="session.register()"
          />
          <p-button
            [label]="'auth.login' | transloco"
            icon="pi pi-user"
            size="small"
            [rounded]="true"
            (onClick)="session.login()"
          />
        </div>
      }
      </div>
    </div>
  </header>

  <main class="mx-auto w-full max-w-3xl flex-1 px-4 pb-28">
    <section class="py-8">
      <h1 class="text-3xl sm:text-4xl font-extrabold leading-tight" [innerHTML]="'home.title' | transloco"></h1>
      <p class="mt-2 text-muted-color">{{ 'home.subtitle' | transloco }}</p>
    </section>

    @if (session.isAuthenticated() && myPlans.value()?.length) {
      <section aria-labelledby="my-plans-title" class="my-plans mb-8">
        <h2 id="my-plans-title" class="text-lg font-bold mb-3">{{ 'home.myPlans' | transloco }}</h2>
        <ul class="flex flex-col gap-2">
          @for (plan of myPlans.value(); track plan.id) {
            <li>
              <a
                [routerLink]="['/plans', plan.id]"
                class="my-plan flex items-center gap-3 rounded-2xl bg-primary-50 border border-primary-200 p-3"
              >
                <i class="pi {{ activityOf(plan.activity).icon }} text-primary text-xl" aria-hidden="true"></i>
                <span class="flex-1 min-w-0">
                  <span class="block font-semibold truncate">{{ plan.title }}</span>
                  <span class="block text-sm text-muted-color">
                    @let myStart = startsIn(plan.startsAt);
                    {{ clockTime(plan.startsAt) }} \xB7 {{ myStart.key | transloco: myStart.params }}
                  </span>
                </span>
                <p-tag
                  [value]="spotsKey(plan.freeSpots) | transloco: { count: plan.freeSpots }"
                  severity="warn"
                  [rounded]="true"
                  class="shrink-0 whitespace-nowrap"
                />
              </a>
            </li>
          }
        </ul>
      </section>
    }

    <section aria-labelledby="nearby-title">
      <a
        routerLink="/plans/nearby"
        class="nearby-entry flex items-center gap-4 rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm hover:border-primary-300"
      >
        <div class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
          <i class="pi pi-map-marker text-2xl" aria-hidden="true"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h2 id="nearby-title" class="text-lg font-bold">{{ 'home.nearby' | transloco }}</h2>
          <p class="text-sm text-muted-color">{{ 'home.nearbyHint' | transloco }}</p>
        </div>
        <i class="pi pi-chevron-right text-muted-color" aria-hidden="true"></i>
      </a>
    </section>
  </main>

  <div class="fixed inset-x-0 bottom-0 p-4 bg-gradient-to-t from-surface-50 via-surface-50/95">
    <div class="mx-auto max-w-3xl">
      <p-button
        [label]="'home.publish' | transloco"
        icon="pi pi-plus"
        styleClass="w-full"
        size="large"
        [rounded]="true"
        routerLink="/plans/new"
      />
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Home, { className: "Home", filePath: "src/app/features/home/home.ts", lineNumber: 21 });
})();
export {
  Home
};
//# debugId=882f3698-43f8-5ca9-b0a3-fef9b5a033df
//# sourceMappingURL=chunk-HU3VSYGR.js.map
