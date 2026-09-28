import {
  levelKey
} from "./chunk-3G4RGXYE.js";
import {
  Tag
} from "./chunk-QCHEEBAT.js";
import {
  Language
} from "./chunk-R55RQCVH.js";
import {
  PlansApi
} from "./chunk-AUD3WDZT.js";
import {
  clockTime,
  spotsKey,
  startsIn
} from "./chunk-2ZDUKJAI.js";
import {
  Message
} from "./chunk-A62MHWYD.js";
import {
  Button,
  activityKey,
  activityOf
} from "./chunk-QAKVLXKK.js";
import {
  Component,
  Input,
  RouterLink,
  TranslocoPipe,
  computed,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinterpolate1,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E45N4KGX.js";
import "./chunk-FDMHZOCR.js";

// src/app/features/plans/plan-detail.ts
var _c0 = (a0) => ({ count: a0 });
var _c1 = (a0) => ({ name: a0 });
var _c2 = (a0) => ({ time: a0 });
function PlanDetail_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-message", 6);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "plan.published"));
  }
}
function PlanDetail_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "plan.notFound"), " ");
  }
}
function PlanDetail_Conditional_11_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(current_r1.description);
  }
}
function PlanDetail_Conditional_11_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "transloco");
    \u0275\u0275pipe(2, "transloco");
  }
  if (rf & 2) {
    const start_r2 = ctx;
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(1, 2, "time.at", \u0275\u0275pureFunction1(8, _c2, start_r2.time)), " \xB7 ", \u0275\u0275pipeBind2(2, 5, start_r2.relative.key, start_r2.relative.params), " ");
  }
}
function PlanDetail_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8)(1, "div", 10)(2, "div", 11);
    \u0275\u0275element(3, "i", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 13)(5, "p", 14);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "h2", 15);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(10, "p-tag", 16);
    \u0275\u0275pipe(11, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, PlanDetail_Conditional_11_Conditional_12_Template, 2, 1, "p");
    \u0275\u0275elementStart(13, "dl", 17)(14, "dt", 9);
    \u0275\u0275element(15, "i", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dd", 19);
    \u0275\u0275conditionalCreate(17, PlanDetail_Conditional_11_Conditional_17_Template, 3, 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "dt", 9);
    \u0275\u0275element(19, "i", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "dd");
    \u0275\u0275text(21);
    \u0275\u0275elementStart(22, "a", 21);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "dt", 9);
    \u0275\u0275element(26, "i", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "dd");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "dt", 9);
    \u0275\u0275element(31, "i", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "dd");
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "transloco");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const current_r1 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classMap(\u0275\u0275interpolate1("pi ", ctx_r2.activity().icon, " text-2xl"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 14, ctx_r2.activityKey()));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(current_r1.title);
    \u0275\u0275advance();
    \u0275\u0275property("value", \u0275\u0275pipeBind2(11, 16, ctx_r2.spotsKey(current_r1.freeSpots), \u0275\u0275pureFunction1(26, _c0, current_r1.freeSpots)))("rounded", true);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(current_r1.description ? 12 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_8_0 = ctx_r2.startsAt()) ? 17 : -1, tmp_8_0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", current_r1.meetingPoint.name, " \xB7 ");
    \u0275\u0275advance();
    \u0275\u0275property("href", ctx_r2.mapUrl(), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(24, 19, "plan.viewOnMap"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 21, ctx_r2.levelKey()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(34, 23, "plan.organizer", \u0275\u0275pureFunction1(28, _c1, current_r1.organizerName)));
  }
}
function PlanDetail_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "plan.loading"));
  }
}
var PlanDetail = class _PlanDetail {
  api = inject(PlansApi);
  language = inject(Language);
  /** Route parameters (withComponentInputBinding) */
  id = input.required(
    ...ngDevMode ? [{ debugName: "id" }] : (
      /* istanbul ignore next */
      []
    )
  );
  published = input(
    ...ngDevMode ? [void 0, { debugName: "published" }] : (
      /* istanbul ignore next */
      []
    )
  );
  plan = signal(
    null,
    ...ngDevMode ? [{ debugName: "plan" }] : (
      /* istanbul ignore next */
      []
    )
  );
  notFound = signal(
    false,
    ...ngDevMode ? [{ debugName: "notFound" }] : (
      /* istanbul ignore next */
      []
    )
  );
  spotsKey = spotsKey;
  activity = computed(
    () => activityOf(this.plan()?.activity ?? ""),
    ...ngDevMode ? [{ debugName: "activity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activityKey = computed(
    () => activityKey(this.activity().code),
    ...ngDevMode ? [{ debugName: "activityKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  levelKey = computed(
    () => levelKey(this.plan()?.level),
    ...ngDevMode ? [{ debugName: "levelKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  startsAt = computed(
    () => {
      const plan = this.plan();
      if (!plan) {
        return null;
      }
      const date = new Date(plan.startsAt);
      return { time: clockTime(date, this.language.locale()), relative: startsIn(date, /* @__PURE__ */ new Date()) };
    },
    ...ngDevMode ? [{ debugName: "startsAt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mapUrl = computed(
    () => {
      const point = this.plan()?.meetingPoint;
      return point ? `https://www.openstreetmap.org/?mlat=${point.latitude}&mlon=${point.longitude}#map=17/${point.latitude}/${point.longitude}` : "";
    },
    ...ngDevMode ? [{ debugName: "mapUrl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const id = this.id();
      this.api.plan(id).subscribe({
        next: (plan) => this.plan.set(plan),
        error: () => this.notFound.set(true)
      });
    });
  }
  static \u0275fac = function PlanDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlanDetail)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PlanDetail, selectors: [["app-plan-detail"]], inputs: { id: [1, "id"], published: [1, "published"] }, decls: 13, vars: 10, consts: [[1, "min-h-full"], [1, "bg-surface-0", "border-b", "border-surface-200"], [1, "mx-auto", "max-w-3xl", "flex", "items-center", "gap-2", "px-4", "py-3"], ["icon", "pi pi-arrow-left", "routerLink", "/", 3, "text", "rounded", "ariaLabel"], [1, "text-lg", "font-bold"], [1, "mx-auto", "max-w-3xl", "px-4", "py-6", "flex", "flex-col", "gap-4"], ["severity", "success", 1, "published-message"], [1, "plan-error", "rounded-2xl", "border", "border-red-200", "bg-red-50", "p-4", "text-red-800"], [1, "plan-card", "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-5", "shadow-sm", "flex", "flex-col", "gap-4"], [1, "text-muted-color"], [1, "flex", "items-start", "gap-4"], [1, "flex", "size-14", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-primary-50", "text-primary"], ["aria-hidden", "true"], [1, "flex-1", "min-w-0"], [1, "text-sm", "text-muted-color"], [1, "text-xl", "font-bold", "leading-snug"], ["severity", "warn", 1, "shrink-0", "whitespace-nowrap", 3, "value", "rounded"], [1, "grid", "grid-cols-[auto_1fr]", "gap-x-3", "gap-y-2", "text-sm"], ["aria-hidden", "true", 1, "pi", "pi-clock"], [1, "plan-time"], ["aria-hidden", "true", 1, "pi", "pi-map-marker"], ["target", "_blank", "rel", "noopener", 1, "text-primary", "underline", 3, "href"], ["aria-hidden", "true", 1, "pi", "pi-chart-bar"], ["aria-hidden", "true", 1, "pi", "pi-user"]], template: function PlanDetail_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
      \u0275\u0275element(3, "p-button", 3);
      \u0275\u0275pipe(4, "transloco");
      \u0275\u0275elementStart(5, "h1", 4);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "transloco");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "main", 5);
      \u0275\u0275conditionalCreate(9, PlanDetail_Conditional_9_Template, 3, 3, "p-message", 6);
      \u0275\u0275conditionalCreate(10, PlanDetail_Conditional_10_Template, 3, 3, "div", 7)(11, PlanDetail_Conditional_11_Template, 35, 30, "section", 8)(12, PlanDetail_Conditional_12_Template, 3, 3, "p", 9);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_5_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("text", true)("rounded", true)("ariaLabel", \u0275\u0275pipeBind1(4, 6, "app.back"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 8, "plan.title"));
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.published() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.notFound() ? 10 : (tmp_5_0 = ctx.plan()) ? 11 : 12, tmp_5_0);
    }
  }, dependencies: [RouterLink, Button, Message, Tag, TranslocoPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlanDetail, [{
    type: Component,
    args: [{ selector: "app-plan-detail", imports: [RouterLink, Button, Message, Tag, TranslocoPipe], template: `<div class="min-h-full">
  <header class="bg-surface-0 border-b border-surface-200">
    <div class="mx-auto max-w-3xl flex items-center gap-2 px-4 py-3">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true" routerLink="/" [ariaLabel]="'app.back' | transloco" />
      <h1 class="text-lg font-bold">{{ 'plan.title' | transloco }}</h1>
    </div>
  </header>

  <main class="mx-auto max-w-3xl px-4 py-6 flex flex-col gap-4">
    @if (published()) {
      <p-message severity="success" class="published-message">{{ 'plan.published' | transloco }}</p-message>
    }

    @if (notFound()) {
      <div class="plan-error rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
        {{ 'plan.notFound' | transloco }}
      </div>
    } @else if (plan(); as current) {
      <section class="plan-card rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-4">
        <div class="flex items-start gap-4">
          <div class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <i class="pi {{ activity().icon }} text-2xl" aria-hidden="true"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-muted-color">{{ activityKey() | transloco }}</p>
            <h2 class="text-xl font-bold leading-snug">{{ current.title }}</h2>
          </div>
          <p-tag
            [value]="spotsKey(current.freeSpots) | transloco: { count: current.freeSpots }"
            severity="warn"
            [rounded]="true"
            class="shrink-0 whitespace-nowrap"
          />
        </div>

        @if (current.description) {
          <p>{{ current.description }}</p>
        }

        <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
          <dt class="text-muted-color"><i class="pi pi-clock" aria-hidden="true"></i></dt>
          <dd class="plan-time">
            @if (startsAt(); as start) {
              {{ 'time.at' | transloco: { time: start.time } }} \xB7
              {{ start.relative.key | transloco: start.relative.params }}
            }
          </dd>
          <dt class="text-muted-color"><i class="pi pi-map-marker" aria-hidden="true"></i></dt>
          <dd>
            {{ current.meetingPoint.name }} \xB7
            <a class="text-primary underline" [href]="mapUrl()" target="_blank" rel="noopener">
              {{ 'plan.viewOnMap' | transloco }}
            </a>
          </dd>
          <dt class="text-muted-color"><i class="pi pi-chart-bar" aria-hidden="true"></i></dt>
          <dd>{{ levelKey() | transloco }}</dd>
          <dt class="text-muted-color"><i class="pi pi-user" aria-hidden="true"></i></dt>
          <dd>{{ 'plan.organizer' | transloco: { name: current.organizerName } }}</dd>
        </dl>
      </section>
    } @else {
      <p class="text-muted-color">{{ 'plan.loading' | transloco }}</p>
    }
  </main>
</div>
` }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: true }] }], published: [{ type: Input, args: [{ isSignal: true, alias: "published", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PlanDetail, { className: "PlanDetail", filePath: "src/app/features/plans/plan-detail.ts", lineNumber: 19 });
})();
export {
  PlanDetail
};
//# debugId=9db58939-2e39-5002-889f-ebeffcd1be4b
//# sourceMappingURL=chunk-NY44PEXE.js.map
