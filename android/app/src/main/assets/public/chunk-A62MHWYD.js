import {
  BaseComponent,
  Bind,
  BindModule,
  CoreIcon,
  ICON_TEMPLATE,
  PARENT_INSTANCE,
  Ripple
} from "./chunk-QAKVLXKK.js";
import {
  BaseStyle,
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  ContentChild,
  Directive,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgTemplateOutlet,
  Output,
  R2 as R,
  SharedModule,
  T,
  ViewEncapsulation,
  W,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  me,
  numberAttribute,
  oe,
  output,
  se,
  se2,
  setClassMetadata,
  signal,
  untracked,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate
} from "./chunk-E45N4KGX.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// node_modules/@primeicons/core/dist/esm/icons/times.mjs
var e = { name: "times", meta: { tags: ["times", "close", "cancel", "delete", "remove"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M14.4199 4.51962C14.7128 4.22696 15.1876 4.22685 15.4805 4.51962C15.7731 4.81246 15.7731 5.28732 15.4805 5.58016L11.0606 10L15.4805 14.4199C15.773 14.7129 15.7732 15.1877 15.4805 15.4805C15.1877 15.7732 14.7128 15.773 14.4199 15.4805L10 11.0606L5.58014 15.4805C5.2873 15.7731 4.81245 15.7731 4.5196 15.4805C4.22682 15.1876 4.22692 14.7128 4.5196 14.4199L8.93949 10L4.5196 5.58016C4.22676 5.28727 4.22673 4.8125 4.5196 4.51962C4.81248 4.22677 5.28726 4.22678 5.58014 4.51962L10 8.93951L14.4199 4.51962Z", fill: "currentColor", key: "ow8ecl" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-times.mjs
var Times = class _Times extends CoreIcon {
  constructor() {
    super();
    this._icon = e;
  }
  static \u0275fac = function Times_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Times)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
    function Times_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Times_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Times_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Times_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Times_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Times_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Times_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Times_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Times_For_1_Case_0_Template, 1, 9, ":svg:path")(1, Times_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, Times_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, Times_For_1_Case_3_Template, 1, 7, ":svg:line")(4, Times_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, Times_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, Times_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Times,
      selectors: [["svg", "data-p-icon", "times"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function Times_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, Times_For_1_Template, 7, 1, null, null, _forTrack0);
        }
        if (rf & 2) {
          \u0275\u0275repeater(ctx.iconNodes());
        }
      },
      encapsulation: 2,
      changeDetection: 1
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Times, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="times"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeuix/motion/dist/index.mjs
var J = Object.defineProperty;
var N = Object.getOwnPropertySymbols;
var K = Object.prototype.hasOwnProperty;
var Q = Object.prototype.propertyIsEnumerable;
var S = (t, o, e2) => o in t ? J(t, o, { enumerable: true, configurable: true, writable: true, value: e2 }) : t[o] = e2;
var x = (t, o) => {
  for (var e2 in o || (o = {})) K.call(o, e2) && S(t, e2, o[e2]);
  if (N) for (var e2 of N(o)) Q.call(o, e2) && S(t, e2, o[e2]);
  return t;
};
var k = (t, o, e2) => new Promise((i, u) => {
  var a = (s) => {
    try {
      h(e2.next(s));
    } catch (f) {
      u(f);
    }
  }, M = (s) => {
    try {
      h(e2.throw(s));
    } catch (f) {
      u(f);
    }
  }, h = (s) => s.done ? i(s.value) : Promise.resolve(s.value).then(a, M);
  h((e2 = e2.apply(t, o)).next());
});
var p = "animation";
var E = "transition";
var Z = ["data-enter-phase", "data-enter-from", "data-enter-to", "data-enter-active", "data-leave-phase", "data-leave-from", "data-leave-to", "data-leave-active"];
function j(t) {
  return t ? t.disabled || !!(t.safe && oe()) : false;
}
function V(t, o) {
  return t ? x(x({}, t), Object.entries(o).reduce((e2, [i, u]) => {
    var a;
    return e2[i] = (a = t[i]) != null ? a : u, e2;
  }, {})) : x({}, o);
}
function _(t) {
  let { name: o, enterClass: e2, leaveClass: i } = t || {};
  return { enter: { from: (e2 == null ? void 0 : e2.from) || `${o}-enter-from`, to: (e2 == null ? void 0 : e2.to) || `${o}-enter-to`, active: (e2 == null ? void 0 : e2.active) || `${o}-enter-active` }, leave: { from: (i == null ? void 0 : i.from) || `${o}-leave-from`, to: (i == null ? void 0 : i.to) || `${o}-leave-to`, active: (i == null ? void 0 : i.active) || `${o}-leave-active` } };
}
function C(t) {
  return { enter: { onBefore: t == null ? void 0 : t.onBeforeEnter, onStart: t == null ? void 0 : t.onEnter, onAfter: t == null ? void 0 : t.onAfterEnter, onCancelled: t == null ? void 0 : t.onEnterCancelled }, leave: { onBefore: t == null ? void 0 : t.onBeforeLeave, onStart: t == null ? void 0 : t.onLeave, onAfter: t == null ? void 0 : t.onAfterLeave, onCancelled: t == null ? void 0 : t.onLeaveCancelled } };
}
function R2(t, o) {
  let e2 = window.getComputedStyle(t), i = (d) => {
    let l = e2[`${d}Duration`].split(", ").map(se), m = e2[`${d}Delay`].split(", ").map(se);
    return m.length < l.length && m.length > 0 && (m = l.map((v, b) => m[b % m.length])), [m, l];
  }, [u, a] = i(E), [M, h] = i(p), s = Math.max(...a.map((d, l) => d + u[l])), f = Math.max(...h.map((d, l) => d + M[l])), r, n = 0, c = 0;
  return o === E ? s > 0 && (r = E, n = s, c = a.length) : o === p ? f > 0 && (r = p, n = f, c = h.length) : (n = Math.max(s, f), r = n > 0 ? s > f ? E : p : void 0, c = r ? r === E ? a.length : h.length : 0), { type: r, timeout: n, count: c };
}
function q(t, o) {
  return typeof t == "number" ? t : t != null && typeof t == "object" && t[o] != null ? t[o] : null;
}
function W2(t, o) {
  return t ? `--${t}-${o}` : `--${o}`;
}
function g(t, o, e2) {
  let { autoHeight: i, autoWidth: u, cssVarPrefix: a } = o, M = typeof e2 == "object";
  i && me(t, W2(a, "height"), M ? e2.height : e2), u && me(t, W2(a, "width"), M ? e2.width : e2);
}
function P(t, o) {
  if (!o.autoHeight && !o.autoWidth) return;
  let e2 = t.scrollHeight, i = t.scrollWidth;
  if (!e2 || !i) {
    let u = T(t);
    e2 || (e2 = u.height), i || (i = u.width);
  }
  g(t, o, { height: e2 + "px", width: i + "px" });
}
function z(t, o) {
  t.setAttribute(`data-${o}-phase`, "");
}
function O(t, o, e2) {
  t.removeAttribute("data-enter-from"), t.removeAttribute("data-enter-to"), t.removeAttribute("data-leave-from"), t.removeAttribute("data-leave-to"), t.setAttribute(`data-${o}-${e2}`, ""), t.setAttribute(`data-${o}-active`, "");
}
function T2(t) {
  t.removeAttribute("data-enter-phase"), t.removeAttribute("data-leave-phase");
}
function B(t) {
  Z.forEach((o) => t.removeAttribute(o));
}
var tt = Object.freeze({ name: "p", safe: true, disabled: false, enter: true, leave: true, autoHeight: true, autoWidth: true, cssVarPrefix: "" });
function dt(t, o) {
  if (!t) throw new Error("Element is required.");
  let e2 = {}, i = false, u = {}, a = null, M = {}, h = (r) => {
    for (let n of Object.keys(e2)) delete e2[n];
    if (Object.assign(e2, V(r, tt)), !e2.enter && !e2.leave) throw new Error("Enter or leave must be true.");
    M = C(e2), i = j(e2), u = _(e2), a = null;
  }, s = (r) => k(null, null, function* () {
    a == null || a();
    let n = t, { onBefore: c, onStart: d, onAfter: l, onCancelled: m } = M[r] || {}, v = { element: t };
    if (z(n, r), i) {
      c == null || c(v), d == null || d(v), l == null || l(v), T2(n), g(n, e2, r === "enter" ? "auto" : "0px");
      return;
    }
    let { from: b, active: A, to: H } = u[r] || {};
    return c == null || c(v), r === "enter" ? g(n, e2, "0px") : r === "leave" && P(n, e2), R(n, b), R(n, A), O(n, r, "from"), n.offsetHeight, r === "enter" ? P(n, e2) : r === "leave" && g(n, e2, "0px"), W(n, b), R(n, H), O(n, r, "to"), d == null || d(v), new Promise((D) => {
      let U = q(e2.duration, r), w = () => {
        W(n, [H, A]), a = null, B(n), T2(n);
      }, G = () => {
        w(), l == null || l(v), D(), r === "enter" ? g(n, e2, "auto") : r === "leave" && g(n, e2, "0px");
      }, L = () => {
      };
      a = () => {
        L(), w(), m == null || m(v), D();
      }, L = ot(n, e2.type, U, G);
    });
  });
  h(o), g(t, e2, "0px");
  let f = { enter: () => e2.enter ? s("enter") : Promise.resolve(), leave: () => e2.leave ? s("leave") : Promise.resolve(), cancel: () => {
    a == null || a(), a = null;
  }, update: (r, n) => {
    if (!r) throw new Error("Element is required.");
    t = r, f.cancel(), n && h(n);
  } };
  return e2.appear && f.enter(), f;
}
var et = 0;
function ot(t, o, e2, i) {
  let u = t._motionEndId = ++et, a = () => {
    u === t._motionEndId && i();
  };
  if (e2 != null) {
    let m = setTimeout(a, e2);
    return () => clearTimeout(m);
  }
  let { type: M, timeout: h, count: s } = R2(t, o);
  if (!M) return i(), () => {
  };
  let f = M + "end", r = 0, n = () => {
    t.removeEventListener(f, d, true), clearTimeout(l);
  }, c = () => {
    n(), a();
  }, d = (m) => {
    m.target === t && ++r >= s && c();
  };
  t.addEventListener(f, d, { capture: true });
  let l = setTimeout(() => {
    r < s && c();
  }, h + 1);
  return n;
}

// node_modules/primeng/fesm2022/primeng-motion.mjs
var originalStyles = /* @__PURE__ */ new WeakMap();
function applyHiddenStyles(element, strategy) {
  if (!element)
    return;
  if (!originalStyles.has(element)) {
    originalStyles.set(element, {
      display: element.style.display,
      visibility: element.style.visibility,
      maxHeight: element.style.maxHeight
    });
  }
  switch (strategy) {
    case "display":
      element.style.display = "none";
      break;
    case "visibility":
      element.style.visibility = "hidden";
      element.style.maxHeight = "0";
      break;
  }
}
function resetStyles(element, strategy) {
  if (!element)
    return;
  const original = originalStyles.get(element) ?? element.style;
  switch (strategy) {
    case "display":
      element.style.display = original?.display || "";
      break;
    case "visibility":
      element.style.visibility = original?.visibility || "";
      element.style.maxHeight = original?.maxHeight || "";
      break;
  }
  originalStyles.delete(element);
}
var style = (
  /*css*/
  `
    .p-motion {
        display: block;
    }
`
);
var classes = {
  root: "p-motion"
};
var MotionStyle = class _MotionStyle extends BaseStyle {
  name = "motion";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MotionStyle_BaseFactory = void 0;
    return function MotionStyle_Factory(__ngFactoryType__) {
      return (\u0275MotionStyle_BaseFactory || (\u0275MotionStyle_BaseFactory = \u0275\u0275getInheritedFactory(_MotionStyle)))(__ngFactoryType__ || _MotionStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MotionStyle,
    factory: _MotionStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionStyle, [{
    type: Injectable
  }], null, null);
})();
var MotionClasses;
(function(MotionClasses2) {
  MotionClasses2["root"] = "p-motion";
})(MotionClasses || (MotionClasses = {}));
var MOTION_INSTANCE = new InjectionToken("MOTION_INSTANCE");
var Motion = class _Motion extends BaseComponent {
  $pcMotion = inject(MOTION_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  bindDirectiveInstance = inject(Bind, { self: true });
  _componentStyle = inject(MotionStyle);
  /******************** Inputs ********************/
  /**
   * Whether the element is visible or not.
   * @group Props
   */
  visible = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "visible" } : (
    /* istanbul ignore next */
    {}
  )), { transform: (value) => value ?? false }));
  /**
   * Whether to mount the element on enter.
   * @group Props
   */
  mountOnEnter = input(
    true,
    ...ngDevMode ? [{ debugName: "mountOnEnter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether to unmount the element on leave.
   * @group Props
   */
  unmountOnLeave = input(
    true,
    ...ngDevMode ? [{ debugName: "unmountOnLeave" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The name of the motion. It can be a predefined motion name or a custom one.
   * phases:
   *     [name]-enter
   *     [name]-enter-active
   *     [name]-enter-to
   *     [name]-leave
   *     [name]-leave-active
   *     [name]-leave-to
   * @group Props
   */
  name = input(
    void 0,
    ...ngDevMode ? [{ debugName: "name" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The type of the motion, valid values 'transition' and 'animation'.
   * @group Props
   */
  type = input(
    void 0,
    ...ngDevMode ? [{ debugName: "type" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether the motion is safe.
   * @group Props
   */
  safe = input(
    void 0,
    ...ngDevMode ? [{ debugName: "safe" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether the motion is disabled.
   * @group Props
   */
  disabled = input(
    false,
    ...ngDevMode ? [{ debugName: "disabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether the motion should appear.
   * @group Props
   */
  appear = input(
    false,
    ...ngDevMode ? [{ debugName: "appear" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether the motion should enter.
   * @group Props
   */
  enter = input(
    true,
    ...ngDevMode ? [{ debugName: "enter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether the motion should leave.
   * @group Props
   */
  leave = input(
    true,
    ...ngDevMode ? [{ debugName: "leave" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The duration of the motion.
   * @group Props
   */
  duration = input(
    void 0,
    ...ngDevMode ? [{ debugName: "duration" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The hide strategy of the motion, valid values 'display' and 'visibility'.
   * @group Props
   */
  hideStrategy = input(
    "display",
    ...ngDevMode ? [{ debugName: "hideStrategy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The enter from class of the motion.
   * @group Props
   */
  enterFromClass = input(
    void 0,
    ...ngDevMode ? [{ debugName: "enterFromClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The enter to class of the motion.
   * @group Props
   */
  enterToClass = input(
    void 0,
    ...ngDevMode ? [{ debugName: "enterToClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The enter active class of the motion.
   * @group Props
   */
  enterActiveClass = input(
    void 0,
    ...ngDevMode ? [{ debugName: "enterActiveClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The leave from class of the motion.
   * @group Props
   */
  leaveFromClass = input(
    void 0,
    ...ngDevMode ? [{ debugName: "leaveFromClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The leave to class of the motion.
   * @group Props
   */
  leaveToClass = input(
    void 0,
    ...ngDevMode ? [{ debugName: "leaveToClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The leave active class of the motion.
   * @group Props
   */
  leaveActiveClass = input(
    void 0,
    ...ngDevMode ? [{ debugName: "leaveActiveClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /******************** All Inputs ********************/
  /**
   * The motion options.
   * @group Props
   */
  options = input({}, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "options" } : (
    /* istanbul ignore next */
    {}
  )), { transform: (value) => value ?? {} }));
  /******************** Outputs ********************/
  /**
   * Callback fired before the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeEnter = output();
  /**
   * Callback fired when the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnter = output();
  /**
   * Callback fired after the enter transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterEnter = output();
  /**
   * Callback fired when the enter transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnterCancelled = output();
  /**
   * Callback fired before the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeLeave = output();
  /**
   * Callback fired when the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeave = output();
  /**
   * Callback fired after the leave transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterLeave = output();
  /**
   * Callback fired when the leave transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeaveCancelled = output();
  /******************** Computed ********************/
  motionOptions = computed(
    () => {
      const options = this.options();
      return {
        name: options.name ?? this.name(),
        type: options.type ?? this.type(),
        safe: options.safe ?? this.safe(),
        disabled: options.disabled ?? this.disabled(),
        appear: false,
        enter: options.enter ?? this.enter(),
        leave: options.leave ?? this.leave(),
        duration: options.duration ?? this.duration(),
        enterClass: {
          from: options.enterClass?.from ?? (!options.name ? this.enterFromClass() : void 0),
          to: options.enterClass?.to ?? (!options.name ? this.enterToClass() : void 0),
          active: options.enterClass?.active ?? (!options.name ? this.enterActiveClass() : void 0)
        },
        leaveClass: {
          from: options.leaveClass?.from ?? (!options.name ? this.leaveFromClass() : void 0),
          to: options.leaveClass?.to ?? (!options.name ? this.leaveToClass() : void 0),
          active: options.leaveClass?.active ?? (!options.name ? this.leaveActiveClass() : void 0)
        },
        onBeforeEnter: options.onBeforeEnter ?? this.handleBeforeEnter,
        onEnter: options.onEnter ?? this.handleEnter,
        onAfterEnter: options.onAfterEnter ?? this.handleAfterEnter,
        onEnterCancelled: options.onEnterCancelled ?? this.handleEnterCancelled,
        onBeforeLeave: options.onBeforeLeave ?? this.handleBeforeLeave,
        onLeave: options.onLeave ?? this.handleLeave,
        onAfterLeave: options.onAfterLeave ?? this.handleAfterLeave,
        onLeaveCancelled: options.onLeaveCancelled ?? this.handleLeaveCancelled
      };
    },
    ...ngDevMode ? [{ debugName: "motionOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  motion;
  isInitialMount = true;
  cancelled = false;
  destroyed = false;
  rendered = signal(
    false,
    ...ngDevMode ? [{ debugName: "rendered" }] : (
      /* istanbul ignore next */
      []
    )
  );
  handleBeforeEnter = (event) => !this.destroyed && this.onBeforeEnter.emit(event);
  handleEnter = (event) => !this.destroyed && this.onEnter.emit(event);
  handleAfterEnter = (event) => !this.destroyed && this.onAfterEnter.emit(event);
  handleEnterCancelled = (event) => !this.destroyed && this.onEnterCancelled.emit(event);
  handleBeforeLeave = (event) => !this.destroyed && this.onBeforeLeave.emit(event);
  handleLeave = (event) => !this.destroyed && this.onLeave.emit(event);
  handleAfterLeave = (event) => !this.destroyed && this.onAfterLeave.emit(event);
  handleLeaveCancelled = (event) => !this.destroyed && this.onLeaveCancelled.emit(event);
  constructor() {
    super();
    effect(() => {
      const hideStrategy = this.hideStrategy();
      if (this.isInitialMount) {
        applyHiddenStyles(this.$el, hideStrategy);
        this.rendered.set(this.visible() && this.mountOnEnter() || !this.mountOnEnter());
      } else if (this.visible() && !this.rendered()) {
        applyHiddenStyles(this.$el, hideStrategy);
        this.rendered.set(true);
      }
    });
    effect(() => {
      if (!this.motion) {
        this.motion = dt(this.$el, this.motionOptions());
      } else {
      }
    });
    afterRenderEffect(async () => {
      if (!this.$el)
        return;
      const shouldAppear = this.isInitialMount && this.visible() && this.appear();
      const hideStrategy = this.hideStrategy();
      if (this.visible()) {
        await se2();
        resetStyles(this.$el, hideStrategy);
        if (shouldAppear || !this.isInitialMount) {
          this.applyMotionDuration("enter");
          this.motion?.enter();
        }
      } else if (!this.isInitialMount) {
        await se2();
        this.applyMotionDuration("leave");
        this.motion?.leave()?.then(async () => {
          if (this.$el && !this.cancelled && !this.visible()) {
            applyHiddenStyles(this.$el, hideStrategy);
            if (this.unmountOnLeave()) {
              await se2();
              if (!this.cancelled) {
                this.rendered.set(false);
              }
            }
          }
        });
      }
      this.isInitialMount = false;
    });
  }
  applyMotionDuration(phase) {
    const options = untracked(this.motionOptions);
    const ms = q(options.duration, phase);
    if (ms == null || !this.$el)
      return;
    const el = this.$el;
    const durationValue = `${ms}ms`;
    if (options.type === "transition") {
      el.style.transitionDuration = durationValue;
    } else {
      el.style.animationDuration = durationValue;
    }
  }
  onAfterViewChecked() {
    const options = this.options();
    const optionsAttrs = options?.root || {};
    this.bindDirectiveInstance.setAttrs(__spreadValues(__spreadValues({}, this.ptms(["host", "root"])), optionsAttrs));
  }
  onDestroy() {
    this.destroyed = true;
    this.cancelled = true;
    this.motion?.cancel();
    this.motion = void 0;
    resetStyles(this.$el, this.hideStrategy());
    this.$el?.remove();
    this.isInitialMount = true;
  }
  static \u0275fac = function Motion_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Motion)();
  };
  static \u0275cmp = (function() {
    const _c0 = ["*"];
    function Motion_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projection(0);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Motion,
      selectors: [["p-motion"]],
      hostVars: 2,
      hostBindings: function Motion_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        visible: [1, "visible"],
        mountOnEnter: [1, "mountOnEnter"],
        unmountOnLeave: [1, "unmountOnLeave"],
        name: [1, "name"],
        type: [1, "type"],
        safe: [1, "safe"],
        disabled: [1, "disabled"],
        appear: [1, "appear"],
        enter: [1, "enter"],
        leave: [1, "leave"],
        duration: [1, "duration"],
        hideStrategy: [1, "hideStrategy"],
        enterFromClass: [1, "enterFromClass"],
        enterToClass: [1, "enterToClass"],
        enterActiveClass: [1, "enterActiveClass"],
        leaveFromClass: [1, "leaveFromClass"],
        leaveToClass: [1, "leaveToClass"],
        leaveActiveClass: [1, "leaveActiveClass"],
        options: [1, "options"]
      },
      outputs: {
        onBeforeEnter: "onBeforeEnter",
        onEnter: "onEnter",
        onAfterEnter: "onAfterEnter",
        onEnterCancelled: "onEnterCancelled",
        onBeforeLeave: "onBeforeLeave",
        onLeave: "onLeave",
        onAfterLeave: "onAfterLeave",
        onLeaveCancelled: "onLeaveCancelled"
      },
      features: [\u0275\u0275ProvidersFeature([MotionStyle, { provide: MOTION_INSTANCE, useExisting: _Motion }, { provide: PARENT_INSTANCE, useExisting: _Motion }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 1,
      template: function Motion_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275conditionalCreate(0, Motion_Conditional_0_Template, 1, 0);
        }
        if (rf & 2) {
          \u0275\u0275conditional(ctx.rendered() ? 0 : -1);
        }
      },
      dependencies: [CommonModule, BindModule],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Motion, [{
    type: Component,
    args: [{
      selector: "p-motion",
      standalone: true,
      imports: [CommonModule, BindModule],
      template: `
        @if (rendered()) {
            <ng-content />
        }
    `,
      providers: [MotionStyle, { provide: MOTION_INSTANCE, useExisting: Motion }, { provide: PARENT_INSTANCE, useExisting: Motion }],
      host: {
        "[class]": "cx('root')"
      },
      hostDirectives: [Bind]
    }]
  }], () => [], { visible: [{ type: Input, args: [{ isSignal: true, alias: "visible", required: false }] }], mountOnEnter: [{ type: Input, args: [{ isSignal: true, alias: "mountOnEnter", required: false }] }], unmountOnLeave: [{ type: Input, args: [{ isSignal: true, alias: "unmountOnLeave", required: false }] }], name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }], type: [{ type: Input, args: [{ isSignal: true, alias: "type", required: false }] }], safe: [{ type: Input, args: [{ isSignal: true, alias: "safe", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], appear: [{ type: Input, args: [{ isSignal: true, alias: "appear", required: false }] }], enter: [{ type: Input, args: [{ isSignal: true, alias: "enter", required: false }] }], leave: [{ type: Input, args: [{ isSignal: true, alias: "leave", required: false }] }], duration: [{ type: Input, args: [{ isSignal: true, alias: "duration", required: false }] }], hideStrategy: [{ type: Input, args: [{ isSignal: true, alias: "hideStrategy", required: false }] }], enterFromClass: [{ type: Input, args: [{ isSignal: true, alias: "enterFromClass", required: false }] }], enterToClass: [{ type: Input, args: [{ isSignal: true, alias: "enterToClass", required: false }] }], enterActiveClass: [{ type: Input, args: [{ isSignal: true, alias: "enterActiveClass", required: false }] }], leaveFromClass: [{ type: Input, args: [{ isSignal: true, alias: "leaveFromClass", required: false }] }], leaveToClass: [{ type: Input, args: [{ isSignal: true, alias: "leaveToClass", required: false }] }], leaveActiveClass: [{ type: Input, args: [{ isSignal: true, alias: "leaveActiveClass", required: false }] }], options: [{ type: Input, args: [{ isSignal: true, alias: "options", required: false }] }], onBeforeEnter: [{ type: Output, args: ["onBeforeEnter"] }], onEnter: [{ type: Output, args: ["onEnter"] }], onAfterEnter: [{ type: Output, args: ["onAfterEnter"] }], onEnterCancelled: [{ type: Output, args: ["onEnterCancelled"] }], onBeforeLeave: [{ type: Output, args: ["onBeforeLeave"] }], onLeave: [{ type: Output, args: ["onLeave"] }], onAfterLeave: [{ type: Output, args: ["onAfterLeave"] }], onLeaveCancelled: [{ type: Output, args: ["onLeaveCancelled"] }] });
})();
var MOTION_DIRECTIVE_INSTANCE = new InjectionToken("MOTION_DIRECTIVE_INSTANCE");
var MotionDirective = class _MotionDirective extends BaseComponent {
  $pcMotionDirective = inject(MOTION_DIRECTIVE_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  /******************** Inputs ********************/
  /**
   * Whether the element is visible or not.
   * @group Props
   */
  visible = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "visible" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotion", transform: (value) => value ?? false }));
  /**
   * The name of the motion. It can be a predefined motion name or a custom one.
   * phases:
   *     [name]-enter
   *     [name]-enter-active
   *     [name]-enter-to
   *     [name]-leave
   *     [name]-leave-active
   *     [name]-leave-to
   * @group Props
   */
  name = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "name" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionName" }));
  /**
   * The type of the motion, valid values 'transition' and 'animation'.
   * @group Props
   */
  type = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "type" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionType" }));
  /**
   * Whether the motion is safe.
   * @group Props
   */
  safe = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "safe" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionSafe" }));
  /**
   * Whether the motion is disabled.
   * @group Props
   */
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "disabled" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionDisabled" }));
  /**
   * Whether the motion should appear.
   * @group Props
   */
  appear = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "appear" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionAppear" }));
  /**
   * Whether the motion should enter.
   * @group Props
   */
  enter = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "enter" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionEnter" }));
  /**
   * Whether the motion should leave.
   * @group Props
   */
  leave = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "leave" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionLeave" }));
  /**
   * The duration of the motion.
   * @group Props
   */
  duration = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "duration" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionDuration" }));
  /**
   * The hide strategy of the motion, valid values 'display' and 'visibility'.
   * @group Props
   */
  hideStrategy = input("display", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "hideStrategy" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionHideStrategy" }));
  /**
   * The enter from class of the motion.
   * @group Props
   */
  enterFromClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "enterFromClass" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionEnterFromClass" }));
  /**
   * The enter to class of the motion.
   * @group Props
   */
  enterToClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "enterToClass" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionEnterToClass" }));
  /**
   * The enter active class of the motion.
   * @group Props
   */
  enterActiveClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "enterActiveClass" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionEnterActiveClass" }));
  /**
   * The leave from class of the motion.
   * @group Props
   */
  leaveFromClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "leaveFromClass" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionLeaveFromClass" }));
  /**
   * The leave to class of the motion.
   * @group Props
   */
  leaveToClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "leaveToClass" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionLeaveToClass" }));
  /**
   * The leave active class of the motion.
   * @group Props
   */
  leaveActiveClass = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "leaveActiveClass" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionLeaveActiveClass" }));
  /******************** All Inputs ********************/
  /**
   * The motion options.
   * @group Props
   */
  options = input({}, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "options" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pMotionOptions", transform: (value) => value ?? {} }));
  /******************** Outputs ********************/
  /**
   * Callback fired before the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeEnter = output({ alias: "pMotionOnBeforeEnter" });
  /**
   * Callback fired when the enter transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnter = output({ alias: "pMotionOnEnter" });
  /**
   * Callback fired after the enter transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterEnter = output({ alias: "pMotionOnAfterEnter" });
  /**
   * Callback fired when the enter transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onEnterCancelled = output({ alias: "pMotionOnEnterCancelled" });
  /**
   * Callback fired before the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onBeforeLeave = output({ alias: "pMotionOnBeforeLeave" });
  /**
   * Callback fired when the leave transition/animation starts.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeave = output({ alias: "pMotionOnLeave" });
  /**
   * Callback fired after the leave transition/animation ends.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onAfterLeave = output({ alias: "pMotionOnAfterLeave" });
  /**
   * Callback fired when the leave transition/animation is cancelled.
   * @param {MotionEvent} [event] - The event object containing details about the motion.
   * @param {Element} event.element - The element being transitioned/animated.
   * @group Emits
   */
  onLeaveCancelled = output({ alias: "pMotionOnLeaveCancelled" });
  /******************** Computed ********************/
  motionOptions = computed(
    () => {
      const options = this.options() ?? {};
      return {
        name: options.name ?? this.name(),
        type: options.type ?? this.type(),
        safe: options.safe ?? this.safe(),
        disabled: options.disabled ?? this.disabled(),
        appear: false,
        enter: options.enter ?? this.enter(),
        leave: options.leave ?? this.leave(),
        duration: options.duration ?? this.duration(),
        enterClass: {
          from: options.enterClass?.from ?? (!options.name ? this.enterFromClass() : void 0),
          to: options.enterClass?.to ?? (!options.name ? this.enterToClass() : void 0),
          active: options.enterClass?.active ?? (!options.name ? this.enterActiveClass() : void 0)
        },
        leaveClass: {
          from: options.leaveClass?.from ?? (!options.name ? this.leaveFromClass() : void 0),
          to: options.leaveClass?.to ?? (!options.name ? this.leaveToClass() : void 0),
          active: options.leaveClass?.active ?? (!options.name ? this.leaveActiveClass() : void 0)
        },
        onBeforeEnter: options.onBeforeEnter ?? this.handleBeforeEnter,
        onEnter: options.onEnter ?? this.handleEnter,
        onAfterEnter: options.onAfterEnter ?? this.handleAfterEnter,
        onEnterCancelled: options.onEnterCancelled ?? this.handleEnterCancelled,
        onBeforeLeave: options.onBeforeLeave ?? this.handleBeforeLeave,
        onLeave: options.onLeave ?? this.handleLeave,
        onAfterLeave: options.onAfterLeave ?? this.handleAfterLeave,
        onLeaveCancelled: options.onLeaveCancelled ?? this.handleLeaveCancelled
      };
    },
    ...ngDevMode ? [{ debugName: "motionOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  motion;
  isInitialMount = true;
  cancelled = false;
  destroyed = false;
  handleBeforeEnter = (event) => !this.destroyed && this.onBeforeEnter.emit(event);
  handleEnter = (event) => !this.destroyed && this.onEnter.emit(event);
  handleAfterEnter = (event) => !this.destroyed && this.onAfterEnter.emit(event);
  handleEnterCancelled = (event) => !this.destroyed && this.onEnterCancelled.emit(event);
  handleBeforeLeave = (event) => !this.destroyed && this.onBeforeLeave.emit(event);
  handleLeave = (event) => !this.destroyed && this.onLeave.emit(event);
  handleAfterLeave = (event) => !this.destroyed && this.onAfterLeave.emit(event);
  handleLeaveCancelled = (event) => !this.destroyed && this.onLeaveCancelled.emit(event);
  constructor() {
    super();
    afterRenderEffect(() => {
      if (!this.$el)
        return;
      this.motion ??= dt(this.$el, untracked(this.motionOptions));
      const shouldAppear = this.isInitialMount && this.visible() && this.appear();
      const hideStrategy = this.hideStrategy();
      if (this.visible()) {
        resetStyles(this.$el, hideStrategy);
        if (shouldAppear || !this.isInitialMount) {
          this.applyMotionDuration("enter");
          this.motion?.enter();
        }
      } else if (!this.isInitialMount) {
        this.applyMotionDuration("leave");
        this.motion?.leave()?.then(() => {
          if (this.$el && !this.cancelled && !this.visible()) {
            applyHiddenStyles(this.$el, hideStrategy);
          }
        });
      } else {
        applyHiddenStyles(this.$el, hideStrategy);
      }
      this.isInitialMount = false;
    });
  }
  applyMotionDuration(phase) {
    const options = untracked(this.motionOptions);
    const ms = q(options.duration, phase);
    if (ms == null || !this.$el)
      return;
    const el = this.$el;
    const durationValue = `${ms}ms`;
    if (options.type === "transition") {
      el.style.transitionDuration = durationValue;
    } else {
      el.style.animationDuration = durationValue;
    }
  }
  onDestroy() {
    this.destroyed = true;
    this.cancelled = true;
    this.motion?.cancel();
    this.motion = void 0;
    resetStyles(this.$el, this.hideStrategy());
    this.$el?.remove();
    this.isInitialMount = true;
  }
  static \u0275fac = function MotionDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MotionDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MotionDirective,
    selectors: [["", "pMotion", ""]],
    inputs: {
      visible: [1, "pMotion", "visible"],
      name: [1, "pMotionName", "name"],
      type: [1, "pMotionType", "type"],
      safe: [1, "pMotionSafe", "safe"],
      disabled: [1, "pMotionDisabled", "disabled"],
      appear: [1, "pMotionAppear", "appear"],
      enter: [1, "pMotionEnter", "enter"],
      leave: [1, "pMotionLeave", "leave"],
      duration: [1, "pMotionDuration", "duration"],
      hideStrategy: [1, "pMotionHideStrategy", "hideStrategy"],
      enterFromClass: [1, "pMotionEnterFromClass", "enterFromClass"],
      enterToClass: [1, "pMotionEnterToClass", "enterToClass"],
      enterActiveClass: [1, "pMotionEnterActiveClass", "enterActiveClass"],
      leaveFromClass: [1, "pMotionLeaveFromClass", "leaveFromClass"],
      leaveToClass: [1, "pMotionLeaveToClass", "leaveToClass"],
      leaveActiveClass: [1, "pMotionLeaveActiveClass", "leaveActiveClass"],
      options: [1, "pMotionOptions", "options"]
    },
    outputs: {
      onBeforeEnter: "pMotionOnBeforeEnter",
      onEnter: "pMotionOnEnter",
      onAfterEnter: "pMotionOnAfterEnter",
      onEnterCancelled: "pMotionOnEnterCancelled",
      onBeforeLeave: "pMotionOnBeforeLeave",
      onLeave: "pMotionOnLeave",
      onAfterLeave: "pMotionOnAfterLeave",
      onLeaveCancelled: "pMotionOnLeaveCancelled"
    },
    features: [\u0275\u0275ProvidersFeature([MotionStyle, { provide: MOTION_DIRECTIVE_INSTANCE, useExisting: _MotionDirective }, { provide: PARENT_INSTANCE, useExisting: _MotionDirective }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionDirective, [{
    type: Directive,
    args: [{
      selector: "[pMotion]",
      standalone: true,
      providers: [MotionStyle, { provide: MOTION_DIRECTIVE_INSTANCE, useExisting: MotionDirective }, { provide: PARENT_INSTANCE, useExisting: MotionDirective }]
    }]
  }], () => [], { visible: [{ type: Input, args: [{ isSignal: true, alias: "pMotion", required: false }] }], name: [{ type: Input, args: [{ isSignal: true, alias: "pMotionName", required: false }] }], type: [{ type: Input, args: [{ isSignal: true, alias: "pMotionType", required: false }] }], safe: [{ type: Input, args: [{ isSignal: true, alias: "pMotionSafe", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "pMotionDisabled", required: false }] }], appear: [{ type: Input, args: [{ isSignal: true, alias: "pMotionAppear", required: false }] }], enter: [{ type: Input, args: [{ isSignal: true, alias: "pMotionEnter", required: false }] }], leave: [{ type: Input, args: [{ isSignal: true, alias: "pMotionLeave", required: false }] }], duration: [{ type: Input, args: [{ isSignal: true, alias: "pMotionDuration", required: false }] }], hideStrategy: [{ type: Input, args: [{ isSignal: true, alias: "pMotionHideStrategy", required: false }] }], enterFromClass: [{ type: Input, args: [{ isSignal: true, alias: "pMotionEnterFromClass", required: false }] }], enterToClass: [{ type: Input, args: [{ isSignal: true, alias: "pMotionEnterToClass", required: false }] }], enterActiveClass: [{ type: Input, args: [{ isSignal: true, alias: "pMotionEnterActiveClass", required: false }] }], leaveFromClass: [{ type: Input, args: [{ isSignal: true, alias: "pMotionLeaveFromClass", required: false }] }], leaveToClass: [{ type: Input, args: [{ isSignal: true, alias: "pMotionLeaveToClass", required: false }] }], leaveActiveClass: [{ type: Input, args: [{ isSignal: true, alias: "pMotionLeaveActiveClass", required: false }] }], options: [{ type: Input, args: [{ isSignal: true, alias: "pMotionOptions", required: false }] }], onBeforeEnter: [{ type: Output, args: ["pMotionOnBeforeEnter"] }], onEnter: [{ type: Output, args: ["pMotionOnEnter"] }], onAfterEnter: [{ type: Output, args: ["pMotionOnAfterEnter"] }], onEnterCancelled: [{ type: Output, args: ["pMotionOnEnterCancelled"] }], onBeforeLeave: [{ type: Output, args: ["pMotionOnBeforeLeave"] }], onLeave: [{ type: Output, args: ["pMotionOnLeave"] }], onAfterLeave: [{ type: Output, args: ["pMotionOnAfterLeave"] }], onLeaveCancelled: [{ type: Output, args: ["pMotionOnLeaveCancelled"] }] });
})();
var MotionModule = class _MotionModule {
  static \u0275fac = function MotionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MotionModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MotionModule,
    imports: [Motion, MotionDirective],
    exports: [Motion, MotionDirective]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Motion]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionModule, [{
    type: NgModule,
    args: [{
      imports: [Motion, MotionDirective],
      exports: [Motion, MotionDirective]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/message/index.mjs
var style2 = "\n    .p-message {\n        display: grid;\n        grid-template-rows: 1fr;\n        border-radius: dt('message.border.radius');\n        outline-width: dt('message.border.width');\n        outline-style: solid;\n    }\n\n    .p-message-content-wrapper {\n        min-height: 0;\n    }\n\n    .p-message-content {\n        display: flex;\n        align-items: center;\n        padding: dt('message.content.padding');\n        gap: dt('message.content.gap');\n    }\n\n    .p-message-close-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        margin-inline-start: auto;\n        overflow: hidden;\n        position: relative;\n        width: dt('message.close.button.width');\n        height: dt('message.close.button.height');\n        border-radius: dt('message.close.button.border.radius');\n        background: transparent;\n        transition:\n            background dt('message.transition.duration'),\n            color dt('message.transition.duration'),\n            outline-color dt('message.transition.duration'),\n            box-shadow dt('message.transition.duration'),\n            opacity 0.3s;\n        outline-color: transparent;\n        color: inherit;\n        padding: 0;\n        border: none;\n        cursor: pointer;\n        user-select: none;\n    }\n\n    .p-message-close-button svg,\n    .p-message-close-button i {\n        font-size: dt('message.close.icon.size');\n        width: dt('message.close.icon.size');\n        height: dt('message.close.icon.size');\n    }\n\n    .p-message-close-button:focus-visible {\n        outline-width: dt('message.close.button.focus.ring.width');\n        outline-style: dt('message.close.button.focus.ring.style');\n        outline-offset: dt('message.close.button.focus.ring.offset');\n    }\n\n    .p-message-info {\n        background: dt('message.info.background');\n        outline-color: dt('message.info.border.color');\n        color: dt('message.info.color');\n        box-shadow: dt('message.info.shadow');\n    }\n\n    .p-message-info .p-message-close-button:focus-visible {\n        outline-color: dt('message.info.close.button.focus.ring.color');\n        box-shadow: dt('message.info.close.button.focus.ring.shadow');\n    }\n\n    .p-message-info .p-message-close-button:hover {\n        background: dt('message.info.close.button.hover.background');\n    }\n\n    .p-message-info.p-message-outlined {\n        color: dt('message.info.outlined.color');\n        outline-color: dt('message.info.outlined.border.color');\n    }\n\n    .p-message-info.p-message-simple {\n        color: dt('message.info.simple.color');\n    }\n\n    .p-message-success {\n        background: dt('message.success.background');\n        outline-color: dt('message.success.border.color');\n        color: dt('message.success.color');\n        box-shadow: dt('message.success.shadow');\n    }\n\n    .p-message-success .p-message-close-button:focus-visible {\n        outline-color: dt('message.success.close.button.focus.ring.color');\n        box-shadow: dt('message.success.close.button.focus.ring.shadow');\n    }\n\n    .p-message-success .p-message-close-button:hover {\n        background: dt('message.success.close.button.hover.background');\n    }\n\n    .p-message-success.p-message-outlined {\n        color: dt('message.success.outlined.color');\n        outline-color: dt('message.success.outlined.border.color');\n    }\n\n    .p-message-success.p-message-simple {\n        color: dt('message.success.simple.color');\n    }\n\n    .p-message-warn {\n        background: dt('message.warn.background');\n        outline-color: dt('message.warn.border.color');\n        color: dt('message.warn.color');\n        box-shadow: dt('message.warn.shadow');\n    }\n\n    .p-message-warn .p-message-close-button:focus-visible {\n        outline-color: dt('message.warn.close.button.focus.ring.color');\n        box-shadow: dt('message.warn.close.button.focus.ring.shadow');\n    }\n\n    .p-message-warn .p-message-close-button:hover {\n        background: dt('message.warn.close.button.hover.background');\n    }\n\n    .p-message-warn.p-message-outlined {\n        color: dt('message.warn.outlined.color');\n        outline-color: dt('message.warn.outlined.border.color');\n    }\n\n    .p-message-warn.p-message-simple {\n        color: dt('message.warn.simple.color');\n    }\n\n    .p-message-error {\n        background: dt('message.error.background');\n        outline-color: dt('message.error.border.color');\n        color: dt('message.error.color');\n        box-shadow: dt('message.error.shadow');\n    }\n\n    .p-message-error .p-message-close-button:focus-visible {\n        outline-color: dt('message.error.close.button.focus.ring.color');\n        box-shadow: dt('message.error.close.button.focus.ring.shadow');\n    }\n\n    .p-message-error .p-message-close-button:hover {\n        background: dt('message.error.close.button.hover.background');\n    }\n\n    .p-message-error.p-message-outlined {\n        color: dt('message.error.outlined.color');\n        outline-color: dt('message.error.outlined.border.color');\n    }\n\n    .p-message-error.p-message-simple {\n        color: dt('message.error.simple.color');\n    }\n\n    .p-message-secondary {\n        background: dt('message.secondary.background');\n        outline-color: dt('message.secondary.border.color');\n        color: dt('message.secondary.color');\n        box-shadow: dt('message.secondary.shadow');\n    }\n\n    .p-message-secondary .p-message-close-button:focus-visible {\n        outline-color: dt('message.secondary.close.button.focus.ring.color');\n        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');\n    }\n\n    .p-message-secondary .p-message-close-button:hover {\n        background: dt('message.secondary.close.button.hover.background');\n    }\n\n    .p-message-secondary.p-message-outlined {\n        color: dt('message.secondary.outlined.color');\n        outline-color: dt('message.secondary.outlined.border.color');\n    }\n\n    .p-message-secondary.p-message-simple {\n        color: dt('message.secondary.simple.color');\n    }\n\n    .p-message-contrast {\n        background: dt('message.contrast.background');\n        outline-color: dt('message.contrast.border.color');\n        color: dt('message.contrast.color');\n        box-shadow: dt('message.contrast.shadow');\n    }\n\n    .p-message-contrast .p-message-close-button:focus-visible {\n        outline-color: dt('message.contrast.close.button.focus.ring.color');\n        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');\n    }\n\n    .p-message-contrast .p-message-close-button:hover {\n        background: dt('message.contrast.close.button.hover.background');\n    }\n\n    .p-message-contrast.p-message-outlined {\n        color: dt('message.contrast.outlined.color');\n        outline-color: dt('message.contrast.outlined.border.color');\n    }\n\n    .p-message-contrast.p-message-simple {\n        color: dt('message.contrast.simple.color');\n    }\n\n    .p-message-text {\n        font-size: dt('message.text.font.size');\n        font-weight: dt('message.text.font.weight');\n    }\n\n    .p-message-icon {\n        display: inline-flex;\n    }\n\n    .p-message-icon,\n    .p-message-icon svg,\n    .p-message-icon i {\n        flex-shrink: 0;\n        font-size: dt('message.icon.size');\n        width: dt('message.icon.size');\n        height: dt('message.icon.size');\n    }\n\n    .p-message-sm .p-message-content {\n        padding: dt('message.content.sm.padding');\n    }\n\n    .p-message-sm .p-message-text {\n        font-size: dt('message.text.sm.font.size');\n    }\n\n    .p-message-sm .p-message-icon,\n    .p-message-sm .p-message-icon svg,\n    .p-message-sm .p-message-icon i {\n        font-size: dt('message.icon.sm.size');\n        width: dt('message.icon.sm.size');\n        height: dt('message.icon.sm.size');\n    }\n\n    .p-message-sm .p-message-close-button svg,\n    .p-message-sm .p-message-close-button i {\n        width: dt('message.close.icon.sm.size');\n        height: dt('message.close.icon.sm.size');\n    }\n\n    .p-message-lg .p-message-content {\n        padding: dt('message.content.lg.padding');\n    }\n\n    .p-message-lg .p-message-text {\n        font-size: dt('message.text.lg.font.size');\n    }\n\n    .p-message-lg .p-message-icon,\n    .p-message-lg .p-message-icon svg,\n    .p-message-lg .p-message-icon i {\n        font-size: dt('message.icon.lg.size');\n        width: dt('message.icon.lg.size');\n        height: dt('message.icon.lg.size');\n    }\n\n    .p-message-lg .p-message-close-button svg,\n    .p-message-lg .p-message-close-button i {\n        font-size: dt('message.close.icon.lg.size');\n        width: dt('message.close.icon.lg.size');\n        height: dt('message.close.icon.lg.size');\n    }\n\n    .p-message-outlined {\n        background: transparent;\n        outline-width: dt('message.outlined.border.width');\n    }\n\n    .p-message-simple {\n        background: transparent;\n        outline-color: transparent;\n        box-shadow: none;\n    }\n\n    .p-message-simple .p-message-content {\n        padding: dt('message.simple.content.padding');\n    }\n\n    .p-message-outlined .p-message-close-button:hover,\n    .p-message-simple .p-message-close-button:hover {\n        background: transparent;\n    }\n\n    .p-message-enter-active {\n        animation: p-animate-message-enter 0.3s ease-out forwards;\n        overflow: hidden;\n    }\n\n    .p-message-leave-active {\n        animation: p-animate-message-leave 0.15s ease-in forwards;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-message-enter {\n        from {\n            opacity: 0;\n            grid-template-rows: 0fr;\n        }\n        to {\n            opacity: 1;\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-message-leave {\n        from {\n            opacity: 1;\n            grid-template-rows: 1fr;\n        }\n        to {\n            opacity: 0;\n            margin: 0;\n            grid-template-rows: 0fr;\n        }\n    }\n";

// node_modules/primeng/fesm2022/primeng-message.mjs
var classes2 = {
  root: ({ instance }) => {
    const severity = instance.severity();
    const variant = instance.variant();
    const size = instance.size();
    return ["p-message p-component p-message-" + severity, variant && "p-message-" + variant, { "p-message-sm": size === "small", "p-message-lg": size === "large" }];
  },
  contentWrapper: "p-message-content-wrapper",
  content: "p-message-content",
  icon: "p-message-icon",
  text: "p-message-text",
  closeButton: "p-message-close-button",
  closeIcon: "p-message-close-icon"
};
var MessageStyle = class _MessageStyle extends BaseStyle {
  name = "message";
  style = style2;
  classes = classes2;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MessageStyle_BaseFactory = void 0;
    return function MessageStyle_Factory(__ngFactoryType__) {
      return (\u0275MessageStyle_BaseFactory || (\u0275MessageStyle_BaseFactory = \u0275\u0275getInheritedFactory(_MessageStyle)))(__ngFactoryType__ || _MessageStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MessageStyle,
    factory: _MessageStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageStyle, [{
    type: Injectable
  }], null, null);
})();
var MessageClasses;
(function(MessageClasses2) {
  MessageClasses2["root"] = "p-message";
  MessageClasses2["content"] = "p-message-content";
  MessageClasses2["icon"] = "p-message-icon";
  MessageClasses2["text"] = "p-message-text";
  MessageClasses2["closeButton"] = "p-message-close-button";
  MessageClasses2["closeIcon"] = "p-message-close-icon";
})(MessageClasses || (MessageClasses = {}));
var MESSAGE_INSTANCE = new InjectionToken("MESSAGE_INSTANCE");
var Message = class _Message extends BaseComponent {
  componentName = "Message";
  _componentStyle = inject(MessageStyle);
  bindDirectiveInstance = inject(Bind, { self: true });
  $pcMessage = inject(MESSAGE_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  /**
   * Severity level of the message.
   * @defaultValue 'info'
   * @group Props
   */
  severity = input(
    "info",
    ...ngDevMode ? [{ debugName: "severity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether the message can be closed manually using the close icon.
   * @group Props
   * @defaultValue false
   */
  closable = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "closable" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Icon to display in the message.
   * @group Props
   * @defaultValue undefined
   */
  icon = input(
    ...ngDevMode ? [void 0, { debugName: "icon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Icon to display in the message close button.
   * @group Props
   * @defaultValue undefined
   */
  closeIcon = input(
    ...ngDevMode ? [void 0, { debugName: "closeIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Delay in milliseconds to close the message automatically.
   * @group Props
   * @defaultValue undefined
   */
  life = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "life" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Defines the size of the component.
   * @group Props
   */
  size = input(
    ...ngDevMode ? [void 0, { debugName: "size" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies the input variant of the component.
   * @group Props
   */
  variant = input(
    ...ngDevMode ? [void 0, { debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(
    ...ngDevMode ? [void 0, { debugName: "motionOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  computedMotionOptions = computed(
    () => __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions()),
    ...ngDevMode ? [{ debugName: "computedMotionOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Emits when the message is closed.
   * @param {MessageCloseEvent} event - The event object containing the original event.
   * @group Emits
   */
  onClose = output();
  get closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  visible = signal(
    true,
    ...ngDevMode ? [{ debugName: "visible" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Custom template of the message container.
   * @param {MessageContainerTemplateContext} context - container context.
   * @see {@link MessageContainerTemplateContext}
   * @group Templates
   */
  containerTemplate = contentChild("container", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "containerTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom template of the message icon.
   * @group Templates
   */
  iconTemplate = contentChild("icon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "iconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom template of the close icon.
   * @group Templates
   */
  closeIconTemplate = contentChild("closeicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "closeIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  containerContext = { closeCallback: (event) => this.closeCallback(event) };
  dataP = computed(
    () => this.cn({
      outlined: this.variant() === "outlined",
      simple: this.variant() === "simple",
      [this.severity()]: this.severity(),
      [this.size()]: this.size()
    }),
    ...ngDevMode ? [{ debugName: "dataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  closeCallback = (event) => {
    this.close(event);
  };
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  onInit() {
    const lifeValue = this.life();
    if (lifeValue) {
      setTimeout(() => {
        this.close(new Event("close"));
      }, lifeValue);
    }
  }
  /**
   * Closes the message.
   * @param {Event} event - Browser event.
   * @group Method
   */
  close(event) {
    this.visible.set(false);
    this.onClose.emit({ originalEvent: event });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275Message_BaseFactory = void 0;
    return function Message_Factory(__ngFactoryType__) {
      return (\u0275Message_BaseFactory || (\u0275Message_BaseFactory = \u0275\u0275getInheritedFactory(_Message)))(__ngFactoryType__ || _Message);
    };
  })();
  static \u0275cmp = (function() {
    const _c0 = ["container"];
    const _c1 = ["icon"];
    const _c2 = ["closeicon"];
    const _c3 = ["*"];
    function Message_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Message_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Message_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 3);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.iconTemplate());
      }
    }
    function Message_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "i", 0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("icon"), ctx_r0.icon()));
        \u0275\u0275property("pBind", ctx_r0.ptm("icon"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Message_Conditional_4_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Message_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Message_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 4);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.containerTemplate())("ngTemplateOutletContext", ctx_r0.containerContext);
      }
    }
    function Message_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 0);
        \u0275\u0275projection(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r0.cx("text"));
        \u0275\u0275property("pBind", ctx_r0.ptm("text"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Message_Conditional_6_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "i", 0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("closeIcon"), ctx_r0.closeIcon()));
        \u0275\u0275property("pBind", ctx_r0.ptm("closeIcon"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Message_Conditional_6_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Message_Conditional_6_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Message_Conditional_6_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 3);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.closeIconTemplate());
      }
    }
    function Message_Conditional_6_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 7);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("closeIcon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("closeIcon"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Message_Conditional_6_Template(rf, ctx) {
      if (rf & 1) {
        const _r2 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "button", 5);
        \u0275\u0275listener("click", function Message_Conditional_6_Template_button_click_0_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r0.close($event));
        });
        \u0275\u0275conditionalCreate(1, Message_Conditional_6_Conditional_1_Template, 1, 4, "i", 1)(2, Message_Conditional_6_Conditional_2_Template, 1, 1, "ng-container")(3, Message_Conditional_6_Conditional_3_Template, 1, 4, ":svg:svg", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r0.cx("closeButton"));
        \u0275\u0275property("pBind", ctx_r0.ptm("closeButton"));
        \u0275\u0275attribute("aria-label", ctx_r0.closeAriaLabel)("data-p", ctx_r0.dataP());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.closeIcon() ? 1 : ctx_r0.closeIconTemplate() ? 2 : 3);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Message,
      selectors: [["p-message"]],
      contentQueries: function Message_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.containerTemplate, _c0, 4)(dirIndex, ctx.iconTemplate, _c1, 4)(dirIndex, ctx.closeIconTemplate, _c2, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(3);
        }
      },
      hostAttrs: ["role", "alert", "aria-live", "polite"],
      hostVars: 5,
      hostBindings: function Message_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275animateEnter(function Message_HostBindings_animateenter_cb() {
            return "p-message-enter-active";
          });
          \u0275\u0275animateLeave(function Message_HostBindings_animateleave_cb() {
            return "p-message-leave-active";
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("data-p", ctx.dataP());
          \u0275\u0275classMap(ctx.cx("root"));
          \u0275\u0275classProp("p-message-leave-active", !ctx.visible());
        }
      },
      inputs: {
        severity: [1, "severity"],
        closable: [1, "closable"],
        icon: [1, "icon"],
        closeIcon: [1, "closeIcon"],
        life: [1, "life"],
        size: [1, "size"],
        variant: [1, "variant"],
        motionOptions: [1, "motionOptions"]
      },
      outputs: {
        onClose: "onClose"
      },
      features: [\u0275\u0275ProvidersFeature([MessageStyle, { provide: MESSAGE_INSTANCE, useExisting: _Message }, { provide: PARENT_INSTANCE, useExisting: _Message }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c3,
      decls: 7,
      vars: 12,
      consts: [[3, "pBind"], [3, "pBind", "class"], ["pRipple", "", "type", "button", 3, "pBind", "class"], [4, "ngTemplateOutlet"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["pRipple", "", "type", "button", 3, "click", "pBind"], ["data-p-icon", "times", 3, "pBind", "class"], ["data-p-icon", "times", 3, "pBind"]],
      template: function Message_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 0)(1, "div", 0);
          \u0275\u0275conditionalCreate(2, Message_Conditional_2_Template, 1, 1, "ng-container");
          \u0275\u0275conditionalCreate(3, Message_Conditional_3_Template, 1, 4, "i", 1);
          \u0275\u0275conditionalCreate(4, Message_Conditional_4_Template, 1, 2, "ng-container")(5, Message_Conditional_5_Template, 2, 4, "span", 1);
          \u0275\u0275conditionalCreate(6, Message_Conditional_6_Template, 4, 6, "button", 2);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275classMap(ctx.cx("contentWrapper"));
          \u0275\u0275property("pBind", ctx.ptm("contentWrapper"));
          \u0275\u0275attribute("data-p", ctx.dataP());
          \u0275\u0275advance();
          \u0275\u0275classMap(ctx.cx("content"));
          \u0275\u0275property("pBind", ctx.ptm("content"));
          \u0275\u0275attribute("data-p", ctx.dataP());
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.iconTemplate() ? 2 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.icon() ? 3 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.containerTemplate() ? 4 : 5);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.closable() ? 6 : -1);
        }
      },
      dependencies: [NgTemplateOutlet, Times, Ripple, SharedModule, Bind, MotionModule],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Message, [{
    type: Component,
    args: [{
      selector: "p-message",
      standalone: true,
      imports: [NgTemplateOutlet, Times, Ripple, SharedModule, Bind, MotionModule],
      template: `
        <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')" [attr.data-p]="dataP()">
            <div [pBind]="ptm('content')" [class]="cx('content')" [attr.data-p]="dataP()">
                @if (iconTemplate()) {
                    <ng-container *ngTemplateOutlet="iconTemplate()"></ng-container>
                }
                @if (icon()) {
                    <i [pBind]="ptm('icon')" [class]="cn(cx('icon'), icon())" [attr.data-p]="dataP()"></i>
                }

                @if (containerTemplate()) {
                    <ng-container *ngTemplateOutlet="containerTemplate(); context: containerContext"></ng-container>
                } @else {
                    <span [pBind]="ptm('text')" [class]="cx('text')" [attr.data-p]="dataP()">
                        <ng-content />
                    </span>
                }
                @if (closable()) {
                    <button [pBind]="ptm('closeButton')" pRipple type="button" [class]="cx('closeButton')" (click)="close($event)" [attr.aria-label]="closeAriaLabel" [attr.data-p]="dataP()">
                        @if (closeIcon()) {
                            <i [pBind]="ptm('closeIcon')" [class]="cn(cx('closeIcon'), closeIcon())" [attr.data-p]="dataP()"></i>
                        } @else if (closeIconTemplate()) {
                            <ng-container *ngTemplateOutlet="closeIconTemplate()"></ng-container>
                        } @else {
                            <svg [pBind]="ptm('closeIcon')" data-p-icon="times" [class]="cx('closeIcon')" [attr.data-p]="dataP()" />
                        }
                    </button>
                }
            </div>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [MessageStyle, { provide: MESSAGE_INSTANCE, useExisting: Message }, { provide: PARENT_INSTANCE, useExisting: Message }],
      hostDirectives: [Bind],
      host: {
        "[attr.data-p]": "dataP()",
        role: "alert",
        "aria-live": "polite",
        "[class]": "cx('root')",
        "[animate.enter]": '"p-message-enter-active"',
        "[animate.leave]": '"p-message-leave-active"',
        "[class.p-message-leave-active]": "!visible()"
      }
    }]
  }], null, { severity: [{ type: Input, args: [{ isSignal: true, alias: "severity", required: false }] }], closable: [{ type: Input, args: [{ isSignal: true, alias: "closable", required: false }] }], icon: [{ type: Input, args: [{ isSignal: true, alias: "icon", required: false }] }], closeIcon: [{ type: Input, args: [{ isSignal: true, alias: "closeIcon", required: false }] }], life: [{ type: Input, args: [{ isSignal: true, alias: "life", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], motionOptions: [{ type: Input, args: [{ isSignal: true, alias: "motionOptions", required: false }] }], onClose: [{ type: Output, args: ["onClose"] }], containerTemplate: [{ type: ContentChild, args: ["container", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], iconTemplate: [{ type: ContentChild, args: ["icon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], closeIconTemplate: [{ type: ContentChild, args: ["closeicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }] });
})();
var MessageModule = class _MessageModule {
  static \u0275fac = function MessageModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MessageModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MessageModule,
    imports: [Message, SharedModule],
    exports: [Message, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Message, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageModule, [{
    type: NgModule,
    args: [{
      imports: [Message, SharedModule],
      exports: [Message, SharedModule]
    }]
  }], null, null);
})();

export {
  Times,
  Motion,
  MotionModule,
  Message
};
//# debugId=c7163d17-8d38-54dc-b737-231a106d7c02
//# sourceMappingURL=chunk-A62MHWYD.js.map
