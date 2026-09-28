import {
  BaseInput,
  Select,
  apiErrorKey
} from "./chunk-XCX75N2L.js";
import {
  ApproximateLocation,
  BaseModelHolder,
  DefaultValueAccessor,
  FormControlName,
  FormGroupDirective,
  InputText,
  LocationError,
  MEETING_POINT_DECIMALS,
  MaxLengthValidator,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgControlStatus,
  NgControlStatusGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  SelectButton,
  Validators,
  ɵNgNoValidate
} from "./chunk-B4F4B5X4.js";
import {
  LEVELS,
  levelKey
} from "./chunk-3G4RGXYE.js";
import {
  PlansApi
} from "./chunk-AUD3WDZT.js";
import {
  MAX_HORIZON_HOURS,
  nextOccurrence,
  startsInRange
} from "./chunk-2ZDUKJAI.js";
import {
  Message,
  Times
} from "./chunk-A62MHWYD.js";
import {
  ACTIVITIES,
  AutoFocus,
  Bind,
  BindModule,
  Button,
  CoreIcon,
  Fluid,
  ICON_TEMPLATE,
  PARENT_INSTANCE,
  activityKey
} from "./chunk-QAKVLXKK.js";
import {
  BaseStyle,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  Directive,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgTemplateOutlet,
  Output,
  Router,
  RouterLink,
  SharedModule,
  TranslocoPipe,
  TranslocoService,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  jt,
  numberAttribute,
  output,
  setClassMetadata,
  signal,
  takeUntilDestroyed,
  toSignal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuerySignal,
  ɵɵcontrol,
  ɵɵcontrolCreate,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-E45N4KGX.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// node_modules/@primeicons/core/dist/esm/icons/angle-down.mjs
var e = { name: "angle-down", meta: { tags: ["angle-down", "fall", "down", "decrease", "lower"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M12.9697 7.71973C13.2626 7.42684 13.7374 7.42684 14.0303 7.71973C14.3232 8.01262 14.3232 8.48738 14.0303 8.78028L10.5303 12.2803C10.2374 12.5732 9.76262 12.5732 9.46973 12.2803L5.96973 8.78028C5.67684 8.48738 5.67684 8.01262 5.96973 7.71973C6.26262 7.42684 6.73738 7.42684 7.03028 7.71973L10 10.6895L12.9697 7.71973Z", fill: "currentColor", key: "r6am4n" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-angle-down.mjs
var AngleDown = class _AngleDown extends CoreIcon {
  constructor() {
    super();
    this._icon = e;
  }
  static \u0275fac = function AngleDown_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngleDown)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
    function AngleDown_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleDown_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleDown_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleDown_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleDown_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleDown_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleDown_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleDown_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, AngleDown_For_1_Case_0_Template, 1, 9, ":svg:path")(1, AngleDown_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, AngleDown_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, AngleDown_For_1_Case_3_Template, 1, 7, ":svg:line")(4, AngleDown_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, AngleDown_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, AngleDown_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _AngleDown,
      selectors: [["svg", "data-p-icon", "angle-down"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function AngleDown_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, AngleDown_For_1_Template, 7, 1, null, null, _forTrack0);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDown, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="angle-down"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeicons/core/dist/esm/icons/angle-up.mjs
var e2 = { name: "angle-up", meta: { tags: ["angle-up", "rise", "lift", "up", "increase"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M9.52637 7.66796C9.82095 7.42765 10.2557 7.44512 10.5303 7.71972L14.0303 11.2197C14.3232 11.5126 14.3232 11.9874 14.0303 12.2803C13.7374 12.5732 13.2626 12.5732 12.9697 12.2803L10 9.31054L7.03028 12.2803C6.73738 12.5732 6.26262 12.5732 5.96973 12.2803C5.67684 11.9874 5.67684 11.5126 5.96973 11.2197L9.46973 7.71972L9.52637 7.66796Z", fill: "currentColor", key: "sz2v2o" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-angle-up.mjs
var AngleUp = class _AngleUp extends CoreIcon {
  constructor() {
    super();
    this._icon = e2;
  }
  static \u0275fac = function AngleUp_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngleUp)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
    function AngleUp_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleUp_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleUp_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleUp_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleUp_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleUp_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleUp_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function AngleUp_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, AngleUp_For_1_Case_0_Template, 1, 9, ":svg:path")(1, AngleUp_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, AngleUp_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, AngleUp_For_1_Case_3_Template, 1, 7, ":svg:line")(4, AngleUp_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, AngleUp_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, AngleUp_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _AngleUp,
      selectors: [["svg", "data-p-icon", "angle-up"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function AngleUp_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, AngleUp_For_1_Template, 7, 1, null, null, _forTrack0);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleUp, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="angle-up"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeuix/styles/dist/inputnumber/index.mjs
var style = "\n    .p-inputnumber {\n        display: inline-flex;\n        position: relative;\n    }\n\n    .p-inputnumber-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex: 0 0 auto;\n        cursor: pointer;\n        background: dt('inputnumber.button.background');\n        color: dt('inputnumber.button.color');\n        width: dt('inputnumber.button.width');\n        transition:\n            background dt('inputnumber.transition.duration'),\n            color dt('inputnumber.transition.duration'),\n            border-color dt('inputnumber.transition.duration'),\n            outline-color dt('inputnumber.transition.duration');\n    }\n\n    .p-inputnumber-button:disabled {\n        cursor: auto;\n    }\n\n    .p-inputnumber-button:not(:disabled):hover {\n        background: dt('inputnumber.button.hover.background');\n        color: dt('inputnumber.button.hover.color');\n    }\n\n    .p-inputnumber-button:not(:disabled):active {\n        background: dt('inputnumber.button.active.background');\n        color: dt('inputnumber.button.active.color');\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-button {\n        position: relative;\n        flex: 1 1 auto;\n        border: 0 none;\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-button-group {\n        display: flex;\n        flex-direction: column;\n        position: absolute;\n        inset-block-start: 1px;\n        inset-inline-end: 1px;\n        height: calc(100% - 2px);\n        z-index: 1;\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-increment-button {\n        padding: 0;\n        border-start-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-decrement-button {\n        padding: 0;\n        border-end-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-input {\n        padding-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-button {\n        border: 1px solid dt('inputnumber.button.border.color');\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-button:hover {\n        border-color: dt('inputnumber.button.hover.border.color');\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-button:active {\n        border-color: dt('inputnumber.button.active.border.color');\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-increment-button {\n        order: 3;\n        border-start-end-radius: dt('inputnumber.button.border.radius');\n        border-end-end-radius: dt('inputnumber.button.border.radius');\n        border-inline-start: 0 none;\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-decrement-button {\n        order: 1;\n        border-start-start-radius: dt('inputnumber.button.border.radius');\n        border-end-start-radius: dt('inputnumber.button.border.radius');\n        border-inline-end: 0 none;\n    }\n\n    .p-floatlabel:has(.p-inputnumber-horizontal) label {\n        margin-inline-start: dt('inputnumber.button.width');\n    }\n\n    .p-inputnumber-vertical {\n        flex-direction: column;\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-button {\n        border: 1px solid dt('inputnumber.button.border.color');\n        padding: dt('inputnumber.button.vertical.padding');\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-button:hover {\n        border-color: dt('inputnumber.button.hover.border.color');\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-button:active {\n        border-color: dt('inputnumber.button.active.border.color');\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-increment-button {\n        order: 1;\n        border-start-start-radius: dt('inputnumber.button.border.radius');\n        border-start-end-radius: dt('inputnumber.button.border.radius');\n        width: 100%;\n        border-block-end: 0 none;\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-input {\n        order: 2;\n        border-radius: 0;\n        text-align: center;\n    }\n\n    .p-inputnumber-vertical .p-inputnumber-decrement-button {\n        order: 3;\n        border-end-start-radius: dt('inputnumber.button.border.radius');\n        border-end-end-radius: dt('inputnumber.button.border.radius');\n        width: 100%;\n        border-block-start: 0 none;\n    }\n\n    .p-inputnumber-input {\n        flex: 1 1 auto;\n    }\n\n    .p-inputnumber-fluid {\n        width: 100%;\n    }\n\n    .p-inputnumber-fluid .p-inputnumber-input {\n        width: 1%;\n    }\n\n    .p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {\n        width: 100%;\n    }\n\n    .p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {\n        font-size: dt('form.field.sm.font.size');\n        width: dt('form.field.sm.font.size');\n        height: dt('form.field.sm.font.size');\n    }\n\n    .p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {\n        font-size: dt('form.field.lg.font.size');\n        width: dt('form.field.lg.font.size');\n        height: dt('form.field.lg.font.size');\n    }\n\n    .p-inputnumber-clear-icon {\n        position: absolute;\n        top: 50%;\n        margin-top: calc(-1 * dt('icon.size') / 2);\n        cursor: pointer;\n        inset-inline-end: dt('form.field.padding.x');\n        color: dt('form.field.icon.color');\n    }\n\n    .p-inputnumber:has(.p-inputnumber-clear-icon) .p-inputnumber-input {\n        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-inputnumber-stacked .p-inputnumber-clear-icon {\n        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));\n    }\n\n    .p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input {\n        padding-inline-end: calc(dt('inputnumber.button.width') + (dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-inputnumber-horizontal .p-inputnumber-clear-icon {\n        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));\n    }\n";

// node_modules/primeng/fesm2022/primeng-inputnumber.mjs
var classes = {
  root: ({ instance }) => [
    "p-inputnumber p-component p-inputwrapper",
    {
      "p-invalid": instance.invalid(),
      "p-inputwrapper-filled": instance.$filled() || instance.allowEmpty() === false,
      "p-inputwrapper-focus": instance.focused,
      "p-inputnumber-stacked": instance.showButtons() && instance.buttonLayout() === "stacked",
      "p-inputnumber-horizontal": instance.showButtons() && instance.buttonLayout() === "horizontal",
      "p-inputnumber-vertical": instance.showButtons() && instance.buttonLayout() === "vertical",
      "p-inputnumber-fluid": instance.hasFluid
    }
  ],
  pcInputText: "p-inputnumber-input",
  clearIcon: "p-inputnumber-clear-icon",
  buttonGroup: "p-inputnumber-button-group",
  incrementButton: ({ instance }) => [
    "p-inputnumber-button p-inputnumber-increment-button",
    {
      "p-disabled": instance.showButtons() && instance.max() != null && instance.maxlength()
    }
  ],
  decrementButton: ({ instance }) => [
    "p-inputnumber-button p-inputnumber-decrement-button",
    {
      "p-disabled": instance.showButtons() && instance.min() != null && instance.minlength()
    }
  ]
};
var InputNumberStyle = class _InputNumberStyle extends BaseStyle {
  name = "inputnumber";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275InputNumberStyle_BaseFactory = void 0;
    return function InputNumberStyle_Factory(__ngFactoryType__) {
      return (\u0275InputNumberStyle_BaseFactory || (\u0275InputNumberStyle_BaseFactory = \u0275\u0275getInheritedFactory(_InputNumberStyle)))(__ngFactoryType__ || _InputNumberStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _InputNumberStyle,
    factory: _InputNumberStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumberStyle, [{
    type: Injectable
  }], null, null);
})();
var InputNumberClasses;
(function(InputNumberClasses2) {
  InputNumberClasses2["root"] = "p-inputnumber";
  InputNumberClasses2["pcInputText"] = "p-inputnumber-input";
  InputNumberClasses2["buttonGroup"] = "p-inputnumber-button-group";
  InputNumberClasses2["incrementButton"] = "p-inputnumber-increment-button";
  InputNumberClasses2["decrementButton"] = "p-inputnumber-decrement-button";
  InputNumberClasses2["clearIcon"] = "p-autocomplete-clear-icon";
})(InputNumberClasses || (InputNumberClasses = {}));
var INPUTNUMBER_INSTANCE = new InjectionToken("INPUTNUMBER_INSTANCE");
var INPUTNUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputNumber),
  multi: true
};
var InputNumber = class _InputNumber extends BaseInput {
  componentName = "InputNumber";
  $pcInputNumber = inject(INPUTNUMBER_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  _componentStyle = inject(InputNumberStyle);
  bindDirectiveInstance = inject(Bind, { self: true });
  /**
   * Displays spinner buttons.
   * @group Props
   */
  showButtons = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "showButtons" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether to format the value.
   * @group Props
   */
  format = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "format" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical".
   * @group Props
   */
  buttonLayout = input(
    "stacked",
    ...ngDevMode ? [{ debugName: "buttonLayout" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId = input(
    ...ngDevMode ? [void 0, { debugName: "inputId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Advisory information to display on input.
   * @group Props
   */
  placeholder = input(
    ...ngDevMode ? [void 0, { debugName: "placeholder" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies tab order of the element.
   * @group Props
   */
  tabindex = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "tabindex" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Title text of the input text.
   * @group Props
   */
  title = input(
    ...ngDevMode ? [void 0, { debugName: "title" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies one or more IDs in the DOM that labels the input field.
   * @group Props
   */
  ariaLabelledBy = input(
    ...ngDevMode ? [void 0, { debugName: "ariaLabelledBy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies one or more IDs in the DOM that describes the input field.
   * @group Props
   */
  ariaDescribedBy = input(
    ...ngDevMode ? [void 0, { debugName: "ariaDescribedBy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to define a string that labels the input element.
   * @group Props
   */
  ariaLabel = input(
    ...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to indicate that user input is required on an element before a form can be submitted.
   * @group Props
   */
  ariaRequired = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "ariaRequired" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Used to define a string that autocomplete attribute the current element.
   * @group Props
   */
  autocomplete = input(
    ...ngDevMode ? [void 0, { debugName: "autocomplete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the increment button.
   * @group Props
   */
  incrementButtonClass = input(
    ...ngDevMode ? [void 0, { debugName: "incrementButtonClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the decrement button.
   * @group Props
   */
  decrementButtonClass = input(
    ...ngDevMode ? [void 0, { debugName: "decrementButtonClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the increment button.
   * @group Props
   */
  incrementButtonIcon = input(
    ...ngDevMode ? [void 0, { debugName: "incrementButtonIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the decrement button.
   * @group Props
   */
  decrementButtonIcon = input(
    ...ngDevMode ? [void 0, { debugName: "decrementButtonIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, it specifies that an input field is read-only.
   * @group Props
   */
  readonly = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "readonly" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Determines whether the input field is empty.
   * @group Props
   */
  allowEmpty = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "allowEmpty" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Locale to be used in formatting.
   * @group Props
   */
  locale = input(
    ...ngDevMode ? [void 0, { debugName: "locale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". See Locale Negotiation for details.
   * @group Props
   */
  localeMatcher = input(
    ...ngDevMode ? [void 0, { debugName: "localeMatcher" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines the behavior of the component, valid values are "decimal" and "currency".
   * @group Props
   */
  mode = input(
    "decimal",
    ...ngDevMode ? [{ debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided.
   * @group Props
   */
  currency = input(
    ...ngDevMode ? [void 0, { debugName: "currency" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
   * @group Props
   */
  currencyDisplay = input(
    ...ngDevMode ? [void 0, { debugName: "currencyDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
   * @group Props
   */
  useGrouping = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "useGrouping" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
   * @group Props
   */
  minFractionDigits = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "minFractionDigits" } : (
    /* istanbul ignore next */
    {}
  )), { transform: (value) => numberAttribute(value, void 0) }));
  /**
   * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
   * @group Props
   */
  maxFractionDigits = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "maxFractionDigits" } : (
    /* istanbul ignore next */
    {}
  )), { transform: (value) => numberAttribute(value, void 0) }));
  /**
   * Text to display before the value.
   * @group Props
   */
  prefix = input(
    ...ngDevMode ? [void 0, { debugName: "prefix" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Text to display after the value.
   * @group Props
   */
  suffix = input(
    ...ngDevMode ? [void 0, { debugName: "suffix" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Inline style of the input field.
   * @group Props
   */
  inputStyle = input(
    ...ngDevMode ? [void 0, { debugName: "inputStyle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the input field.
   * @group Props
   */
  inputStyleClass = input(
    ...ngDevMode ? [void 0, { debugName: "inputStyleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "showClear" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autofocus" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Callback to invoke on input.
   * @param {InputNumberInputEvent} event - Custom input event.
   * @group Emits
   */
  onInput = output();
  /**
   * Callback to invoke when the component receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = output();
  /**
   * Callback to invoke when the component loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = output();
  /**
   * Callback to invoke on input key press.
   * @param {KeyboardEvent} event - Keyboard event.
   * @group Emits
   */
  onKeyDown = output();
  /**
   * Callback to invoke when clear token is clicked.
   * @group Emits
   */
  onClear = output();
  /**
   * Custom clear icon template.
   * @group Templates
   */
  clearIconTemplate = contentChild("clearicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "clearIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom increment button icon template.
   * @group Templates
   */
  incrementButtonIconTemplate = contentChild("incrementbuttonicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "incrementButtonIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom decrement button icon template.
   * @group Templates
   */
  decrementButtonIconTemplate = contentChild("decrementbuttonicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "decrementButtonIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  input = viewChild.required(
    "input",
    ...ngDevMode ? [{ debugName: "input" }] : (
      /* istanbul ignore next */
      []
    )
  );
  requiredAttr = computed(
    () => this.required() ? "" : void 0,
    ...ngDevMode ? [{ debugName: "requiredAttr" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readonlyAttr = computed(
    () => this.readonly() ? "" : void 0,
    ...ngDevMode ? [{ debugName: "readonlyAttr" }] : (
      /* istanbul ignore next */
      []
    )
  );
  disabledAttr = computed(
    () => this.$disabled() ? "" : void 0,
    ...ngDevMode ? [{ debugName: "disabledAttr" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get showClearIcon() {
    return this.buttonLayout() !== "vertical" && this.showClear() && this.value() != null;
  }
  showStackedButtons = computed(
    () => this.showButtons() && this.buttonLayout() === "stacked",
    ...ngDevMode ? [{ debugName: "showStackedButtons" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showNonStackedButtons = computed(
    () => this.showButtons() && this.buttonLayout() !== "stacked",
    ...ngDevMode ? [{ debugName: "showNonStackedButtons" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasIncrementButtonIcon = computed(
    () => !!this.incrementButtonIcon(),
    ...ngDevMode ? [{ debugName: "hasIncrementButtonIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasDecrementButtonIcon = computed(
    () => !!this.decrementButtonIcon(),
    ...ngDevMode ? [{ debugName: "hasDecrementButtonIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  parserConfig = computed(
    () => ({
      locale: this.locale(),
      localeMatcher: this.localeMatcher(),
      mode: this.mode(),
      currency: this.currency(),
      currencyDisplay: this.currencyDisplay(),
      useGrouping: this.useGrouping(),
      minFractionDigits: this.minFractionDigits(),
      maxFractionDigits: this.maxFractionDigits(),
      prefix: this.prefix(),
      suffix: this.suffix()
    }),
    ...ngDevMode ? [{ debugName: "parserConfig" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    super();
    effect(() => {
      this.parserConfig();
      this.updateConstructParser();
    });
  }
  _injector = inject(Injector);
  value = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "value" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focused;
  initialized;
  groupChar = "";
  prefixChar = "";
  suffixChar = "";
  isSpecialChar;
  timer = null;
  lastValue;
  _numeral = /./g;
  numberFormat = null;
  _decimal = /./g;
  _decimalChar = "";
  _group = /./g;
  _minusSign = /./g;
  _currency;
  _prefix;
  _suffix;
  ngControl = null;
  formattedValue = computed(
    () => {
      const value = this.value();
      const val = !value && !this.allowEmpty() ? 0 : value;
      return this.formatValue(val);
    },
    ...ngDevMode ? [{ debugName: "formattedValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _index = () => void 0;
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  onInit() {
    this.ngControl = this._injector.get(NgControl, null, { optional: true });
    this.constructParser();
    this.initialized = true;
  }
  getOptions() {
    const validateFractionDigits = (value, min, max) => {
      if (value == null || isNaN(value) || !isFinite(value)) {
        return void 0;
      }
      return Math.max(min, Math.min(max, Math.floor(value)));
    };
    const minFractionDigits = validateFractionDigits(this.minFractionDigits(), 0, 20);
    const maxFractionDigits = validateFractionDigits(this.maxFractionDigits(), 0, 100);
    const validatedMinFractionDigits = minFractionDigits != null && maxFractionDigits != null && minFractionDigits > maxFractionDigits ? maxFractionDigits : minFractionDigits;
    return {
      localeMatcher: this.localeMatcher(),
      style: this.mode(),
      currency: this.currency(),
      currencyDisplay: this.currencyDisplay(),
      useGrouping: this.useGrouping(),
      minimumFractionDigits: validatedMinFractionDigits,
      maximumFractionDigits: maxFractionDigits
    };
  }
  constructParser() {
    const options = this.getOptions();
    const cleanOptions = Object.fromEntries(Object.entries(options).filter(([, value]) => value !== void 0));
    this.numberFormat = new Intl.NumberFormat(this.locale(), cleanOptions);
    const numerals = [...new Intl.NumberFormat(this.locale(), { useGrouping: false }).format(9876543210)].reverse();
    const index = new Map(numerals.map((d, i) => [d, i]));
    this._numeral = new RegExp(`[${numerals.join("")}]`, "g");
    this._group = this.getGroupingExpression();
    this._minusSign = this.getMinusSignExpression();
    this._currency = this.getCurrencyExpression();
    this._decimal = this.getDecimalExpression();
    this._decimalChar = this.getDecimalChar();
    this._suffix = this.getSuffixExpression();
    this._prefix = this.getPrefixExpression();
    this._index = (d) => index.get(d);
  }
  updateConstructParser() {
    if (this.initialized) {
      this.constructParser();
    }
  }
  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  getDecimalExpression() {
    const decimalChar = this.getDecimalChar();
    return new RegExp(`[${decimalChar}]`, "g");
  }
  getDecimalChar() {
    const formatter = new Intl.NumberFormat(this.locale(), __spreadProps(__spreadValues({}, this.getOptions()), { useGrouping: false }));
    return formatter.format(1.1).replace(this._currency, "").trim().replace(this._numeral, "");
  }
  getGroupingExpression() {
    const formatter = new Intl.NumberFormat(this.locale(), __spreadProps(__spreadValues({}, this.getOptions()), { useGrouping: true }));
    const groupPart = formatter.formatToParts(1e6).find((part) => part.type === "group");
    this.groupChar = groupPart ? groupPart.value : "";
    return new RegExp(`[${this.groupChar}]`, "g");
  }
  getMinusSignExpression() {
    const formatter = new Intl.NumberFormat(this.locale(), { useGrouping: false });
    return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, "")}]`, "g");
  }
  getCurrencyExpression() {
    if (this.currency()) {
      const formatter = new Intl.NumberFormat(this.locale(), {
        style: "currency",
        currency: this.currency(),
        currencyDisplay: this.currencyDisplay(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return new RegExp(`[${formatter.format(1).replace(/\s/g, "").replace(this._numeral, "").replace(this._group, "")}]`, "g");
    }
    return new RegExp(`[]`, "g");
  }
  getPrefixExpression() {
    const prefix = this.prefix();
    if (prefix) {
      this.prefixChar = prefix;
    } else {
      const formatter = new Intl.NumberFormat(this.locale(), {
        style: this.mode(),
        currency: this.currency(),
        currencyDisplay: this.currencyDisplay()
      });
      this.prefixChar = formatter.format(1).split("1")[0];
    }
    return new RegExp(`${this.escapeRegExp(this.prefixChar || "")}`, "g");
  }
  getSuffixExpression() {
    const suffix = this.suffix();
    if (suffix) {
      this.suffixChar = suffix;
    } else {
      const formatter = new Intl.NumberFormat(this.locale(), {
        style: this.mode(),
        currency: this.currency(),
        currencyDisplay: this.currencyDisplay(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      this.suffixChar = formatter.format(1).split("1")[1];
    }
    return new RegExp(`${this.escapeRegExp(this.suffixChar || "")}`, "g");
  }
  formatValue(value) {
    if (value != null) {
      if (value === "-") {
        return value;
      }
      const prefix = this.prefix();
      const suffix = this.suffix();
      if (this.format()) {
        let formatter = new Intl.NumberFormat(this.locale(), this.getOptions());
        let formattedValue = formatter.format(value);
        if (prefix && value != prefix) {
          formattedValue = prefix + formattedValue;
        }
        if (suffix && value != suffix) {
          formattedValue = formattedValue + suffix;
        }
        return formattedValue;
      }
      return value.toString();
    }
    return "";
  }
  parseValue(text) {
    const suffixRegex = this._suffix ? new RegExp(this._suffix, "") : /(?:)/;
    const prefixRegex = this._prefix ? new RegExp(this._prefix, "") : /(?:)/;
    const currencyRegex = this._currency ? new RegExp(this._currency, "") : /(?:)/;
    let filteredText = text.replace(suffixRegex, "").replace(prefixRegex, "").trim().replace(/\s/g, "").replace(currencyRegex, "").replace(this._group, "").replace(this._minusSign, "-").replace(this._decimal, ".").replace(this._numeral, this._index);
    if (filteredText) {
      if (filteredText === "-")
        return filteredText;
      let parsedValue = +filteredText;
      return isNaN(parsedValue) ? null : parsedValue;
    }
    return null;
  }
  repeat(event, interval, dir) {
    if (this.readonly()) {
      return;
    }
    let i = interval || 500;
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.repeat(event, 40, dir);
    }, i);
    this.spin(event, dir);
  }
  spin(event, dir) {
    let step = (this.step() ?? 1) * dir;
    let currentValue = this.parseValue(this.input()?.nativeElement.value) || 0;
    let newValue = this.validateValue(currentValue + step);
    const max = this.maxlength();
    if (max && max < this.formatValue(newValue).length) {
      return;
    }
    this.updateInput(newValue, null, "spin", null);
    this.updateModel(event, newValue);
    this.handleOnInput(event, currentValue, newValue);
  }
  clear() {
    this.value.set(null);
    this.onModelChange(this.value());
    this.onClear.emit();
  }
  onUpButtonMouseDown(event) {
    if (event.button === 2) {
      this.clearTimer();
      return;
    }
    if (!this.$disabled()) {
      this.input()?.nativeElement.focus();
      this.repeat(event, null, 1);
      event.preventDefault();
    }
  }
  onUpButtonMouseUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onUpButtonMouseLeave() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onUpButtonKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.repeat(event, null, 1);
    }
  }
  onUpButtonKeyUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonMouseDown(event) {
    if (event.button === 2) {
      this.clearTimer();
      return;
    }
    if (!this.$disabled()) {
      this.input()?.nativeElement.focus();
      this.repeat(event, null, -1);
      event.preventDefault();
    }
  }
  onDownButtonMouseUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonMouseLeave() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonKeyUp() {
    if (!this.$disabled()) {
      this.clearTimer();
    }
  }
  onDownButtonKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.repeat(event, null, -1);
    }
  }
  onUserInput(event) {
    if (this.readonly()) {
      return;
    }
    if (this.isSpecialChar) {
      event.target.value = this.lastValue;
    }
    this.isSpecialChar = false;
  }
  onInputKeyDown(event) {
    if (this.readonly()) {
      return;
    }
    this.lastValue = event.target.value;
    if (event.shiftKey || event.altKey) {
      this.isSpecialChar = true;
      return;
    }
    let selectionStart = event.target.selectionStart;
    let selectionEnd = event.target.selectionEnd;
    let inputValue = event.target.value;
    let newValueStr = null;
    if (event.altKey) {
      event.preventDefault();
    }
    switch (event.key) {
      case "ArrowUp":
        this.spin(event, 1);
        event.preventDefault();
        break;
      case "ArrowDown":
        this.spin(event, -1);
        event.preventDefault();
        break;
      case "ArrowLeft":
        for (let index = selectionStart; index <= inputValue.length; index++) {
          const previousCharIndex = index === 0 ? 0 : index - 1;
          if (this.isNumeralChar(inputValue.charAt(previousCharIndex))) {
            this.input().nativeElement.setSelectionRange(index, index);
            break;
          }
        }
        break;
      case "ArrowRight":
        for (let index = selectionEnd; index >= 0; index--) {
          if (this.isNumeralChar(inputValue.charAt(index))) {
            this.input().nativeElement.setSelectionRange(index, index);
            break;
          }
        }
        break;
      case "Tab":
      case "Enter":
        newValueStr = this.validateValue(this.parseValue(this.input().nativeElement.value));
        this.input().nativeElement.value = this.formatValue(newValueStr);
        this.input().nativeElement.setAttribute("aria-valuenow", newValueStr);
        this.updateModel(event, newValueStr);
        break;
      case "Backspace": {
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          if (selectionStart == 1 && this.prefix() || selectionStart == inputValue.length && this.suffix()) {
            break;
          }
          const deleteChar = inputValue.charAt(selectionStart - 1);
          const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
          if (this.isNumeralChar(deleteChar)) {
            const decimalLength = this.getDecimalLength(inputValue);
            if (this._group.test(deleteChar)) {
              this._group.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
            } else if (this._decimal.test(deleteChar)) {
              this._decimal.lastIndex = 0;
              if (decimalLength) {
                this.input()?.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
              const insertedText = this.isDecimalMode() && (this.minFractionDigits() || 0) < decimalLength ? "" : "0";
              newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
            } else if (decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart - 1) + "0" + inputValue.slice(selectionStart);
              newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
            } else {
              newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
            }
          } else if (this.mode() === "currency" && this._currency && deleteChar.search(this._currency) != -1) {
            newValueStr = inputValue.slice(1);
          }
          this.updateValue(event, newValueStr, null, "delete-single");
        } else {
          newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, null, "delete-range");
        }
        break;
      }
      case "Delete":
        event.preventDefault();
        if (selectionStart === selectionEnd) {
          if (selectionStart == 0 && this.prefix() || selectionStart == inputValue.length - 1 && this.suffix()) {
            break;
          }
          const deleteChar = inputValue.charAt(selectionStart);
          const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);
          if (this.isNumeralChar(deleteChar)) {
            const decimalLength = this.getDecimalLength(inputValue);
            if (this._group.test(deleteChar)) {
              this._group.lastIndex = 0;
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
            } else if (this._decimal.test(deleteChar)) {
              this._decimal.lastIndex = 0;
              if (decimalLength) {
                this.input()?.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
              const insertedText = this.isDecimalMode() && (this.minFractionDigits() || 0) < decimalLength ? "" : "0";
              newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
            } else if (decimalCharIndexWithoutPrefix === 1) {
              newValueStr = inputValue.slice(0, selectionStart) + "0" + inputValue.slice(selectionStart + 1);
              newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : "";
            } else {
              newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
            }
          }
          this.updateValue(event, newValueStr, null, "delete-back-single");
        } else {
          newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
          this.updateValue(event, newValueStr, null, "delete-range");
        }
        break;
      case "Home":
        if (this.min()) {
          this.updateModel(event, this.min());
          event.preventDefault();
        }
        break;
      case "End":
        if (this.max()) {
          this.updateModel(event, this.max());
          event.preventDefault();
        }
        break;
      default:
        break;
    }
    this.onKeyDown.emit(event);
  }
  onInputKeyPress(event) {
    if (this.readonly()) {
      return;
    }
    let code = event.which || event.keyCode;
    let char = String.fromCharCode(code);
    let isDecimalSign = this.isDecimalSign(char);
    const isMinusSign = this.isMinusSign(char);
    if (code != 13) {
      event.preventDefault();
    }
    if (!isDecimalSign && event.code === "NumpadDecimal") {
      isDecimalSign = true;
      char = this._decimalChar;
      code = char.charCodeAt(0);
    }
    const { value, selectionStart, selectionEnd } = this.input().nativeElement;
    const newValue = this.parseValue(value + char);
    const newValueStr = newValue != null ? newValue.toString() : "";
    const selectedValue = value.substring(selectionStart, selectionEnd);
    const selectedValueParsed = this.parseValue(selectedValue);
    const selectedValueStr = selectedValueParsed != null ? selectedValueParsed.toString() : "";
    if (selectionStart !== selectionEnd && selectedValueStr.length > 0) {
      this.insert(event, char, { isDecimalSign, isMinusSign });
      return;
    }
    const max = this.maxlength();
    if (max && newValueStr.length > max) {
      return;
    }
    if (48 <= code && code <= 57 || isMinusSign || isDecimalSign) {
      this.insert(event, char, { isDecimalSign, isMinusSign });
    }
  }
  onPaste(event) {
    if (!this.$disabled() && !this.readonly()) {
      event.preventDefault();
      let data = (event.clipboardData || this.document.defaultView["clipboardData"]).getData("Text");
      if (this.inputId() === "integeronly" && /[^\d-]/.test(data)) {
        return;
      }
      if (data) {
        if (this.maxlength()) {
          data = data.toString().substring(0, this.maxlength());
        }
        let filteredData = this.parseValue(data);
        if (filteredData != null) {
          this.insert(event, filteredData.toString());
        }
      }
    }
  }
  allowMinusSign() {
    const min = this.min();
    return min == null || min < 0;
  }
  isMinusSign(char) {
    if (this._minusSign.test(char) || char === "-") {
      this._minusSign.lastIndex = 0;
      return true;
    }
    return false;
  }
  isDecimalSign(char) {
    if (this._decimal.test(char)) {
      this._decimal.lastIndex = 0;
      return true;
    }
    return false;
  }
  isDecimalMode() {
    return this.mode() === "decimal";
  }
  getDecimalCharIndexes(val) {
    let decimalCharIndex = val.search(this._decimal);
    this._decimal.lastIndex = 0;
    const filteredVal = val.replace(this._prefix, "").trim().replace(/\s/g, "").replace(this._currency, "");
    const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
    this._decimal.lastIndex = 0;
    return { decimalCharIndex, decimalCharIndexWithoutPrefix };
  }
  getCharIndexes(val) {
    const decimalCharIndex = val.search(this._decimal);
    this._decimal.lastIndex = 0;
    const minusCharIndex = val.search(this._minusSign);
    this._minusSign.lastIndex = 0;
    const suffixCharIndex = val.search(this._suffix);
    this._suffix.lastIndex = 0;
    const currencyCharIndex = val.search(this._currency);
    this._currency.lastIndex = 0;
    return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
  }
  insert(event, text, sign = { isDecimalSign: false, isMinusSign: false }) {
    const minusCharIndexOnText = text.search(this._minusSign);
    this._minusSign.lastIndex = 0;
    if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
      return;
    }
    let selectionStart = this.input()?.nativeElement.selectionStart ?? 0;
    let selectionEnd = this.input()?.nativeElement.selectionEnd ?? 0;
    let inputValue = this.input()?.nativeElement.value.trim();
    const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
    let newValueStr;
    if (sign.isMinusSign) {
      if (selectionStart === 0) {
        newValueStr = inputValue;
        if (minusCharIndex === -1 || selectionEnd !== 0) {
          newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
        }
        this.updateValue(event, newValueStr, text, "insert");
      }
    } else if (sign.isDecimalSign) {
      if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
        this.updateValue(event, inputValue, text, "insert");
      } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, "insert");
      } else if (decimalCharIndex === -1 && this.maxFractionDigits()) {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, "insert");
      }
    } else {
      const maxFractionDigits = this.numberFormat?.resolvedOptions().maximumFractionDigits ?? 0;
      const operation = selectionStart !== selectionEnd ? "range-insert" : "insert";
      if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
        if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
          const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
          newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
          this.updateValue(event, newValueStr, text, operation);
        }
      } else {
        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
        this.updateValue(event, newValueStr, text, operation);
      }
    }
  }
  insertText(value, text, start, end) {
    let textSplit = text === "." ? text : text.split(".");
    if (textSplit.length === 2) {
      const decimalCharIndex = value.slice(start, end).search(this._decimal);
      this._decimal.lastIndex = 0;
      return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
    } else if (end - start === value.length) {
      return this.formatValue(text);
    } else if (start === 0) {
      return text + value.slice(end);
    } else if (end === value.length) {
      return value.slice(0, start) + text;
    } else {
      return value.slice(0, start) + text + value.slice(end);
    }
  }
  deleteRange(value, start, end) {
    let newValueStr;
    if (end - start === value.length)
      newValueStr = "";
    else if (start === 0)
      newValueStr = value.slice(end);
    else if (end === value.length)
      newValueStr = value.slice(0, start);
    else
      newValueStr = value.slice(0, start) + value.slice(end);
    return newValueStr;
  }
  initCursor() {
    let selectionStart = this.input()?.nativeElement.selectionStart ?? 0;
    let selectionEnd = this.input()?.nativeElement.selectionEnd ?? 0;
    let inputValue = this.input()?.nativeElement.value;
    let valueLength = inputValue.length;
    let index = null;
    let prefixLength = (this.prefixChar || "").length;
    inputValue = inputValue.replace(this._prefix, "");
    if (selectionStart === selectionEnd || selectionStart !== 0 || selectionEnd < prefixLength) {
      selectionStart -= prefixLength;
    }
    let char = inputValue.charAt(selectionStart);
    if (this.isNumeralChar(char)) {
      return selectionStart + prefixLength;
    }
    let i = selectionStart - 1;
    while (i >= 0) {
      char = inputValue.charAt(i);
      if (this.isNumeralChar(char)) {
        index = i + prefixLength;
        break;
      } else {
        i--;
      }
    }
    if (index !== null) {
      this.input()?.nativeElement.setSelectionRange(index + 1, index + 1);
    } else {
      i = selectionStart;
      while (i < valueLength) {
        char = inputValue.charAt(i);
        if (this.isNumeralChar(char)) {
          index = i + prefixLength;
          break;
        } else {
          i++;
        }
      }
      if (index !== null) {
        this.input()?.nativeElement.setSelectionRange(index, index);
      }
    }
    return index || 0;
  }
  onInputClick() {
    const currentValue = this.input()?.nativeElement.value;
    if (!this.readonly() && currentValue !== jt()) {
      this.initCursor();
    }
  }
  isNumeralChar(char) {
    if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
      this.resetRegex();
      return true;
    }
    return false;
  }
  resetRegex() {
    this._numeral.lastIndex = 0;
    this._decimal.lastIndex = 0;
    this._group.lastIndex = 0;
    this._minusSign.lastIndex = 0;
  }
  updateValue(event, valueStr, insertedValueStr, operation) {
    let currentValue = this.input()?.nativeElement.value;
    let newValue = null;
    if (valueStr != null) {
      newValue = this.parseValue(valueStr);
      newValue = !newValue && !this.allowEmpty() ? 0 : newValue;
      this.updateInput(newValue, insertedValueStr, operation, valueStr);
      this.handleOnInput(event, currentValue, newValue);
    }
  }
  handleOnInput(event, currentValue, newValue) {
    if (this.isValueChanged(currentValue, newValue)) {
      this.input().nativeElement.value = this.formatValue(newValue);
      this.input()?.nativeElement.setAttribute("aria-valuenow", newValue);
      this.updateModel(event, newValue);
      this.onInput.emit({ originalEvent: event, value: newValue, formattedValue: currentValue });
    }
  }
  isValueChanged(currentValue, newValue) {
    if (newValue === null && currentValue !== null) {
      return true;
    }
    if (newValue != null) {
      let parsedCurrentValue = typeof currentValue === "string" ? this.parseValue(currentValue) : currentValue;
      return newValue !== parsedCurrentValue;
    }
    return false;
  }
  validateValue(value) {
    if (value === "-" || value == null) {
      return null;
    }
    const min = this.min();
    const max = this.max();
    if (min != null && value < min) {
      return this.min();
    }
    if (max != null && value > max) {
      return max;
    }
    return value;
  }
  updateInput(value, insertedValueStr, operation, valueStr) {
    insertedValueStr = insertedValueStr || "";
    let inputValue = this.input()?.nativeElement.value;
    let newValue = this.formatValue(value);
    let currentLength = inputValue.length;
    if (newValue !== valueStr) {
      newValue = this.concatValues(newValue, valueStr);
    }
    if (currentLength === 0) {
      this.input().nativeElement.value = newValue;
      this.input().nativeElement.setSelectionRange(0, 0);
      const index = this.initCursor();
      const selectionEnd = index + insertedValueStr.length;
      this.input().nativeElement.setSelectionRange(selectionEnd, selectionEnd);
    } else {
      let selectionStart = this.input().nativeElement.selectionStart ?? 0;
      let selectionEnd = this.input().nativeElement.selectionEnd ?? 0;
      const maxlength = this.maxlength();
      if (maxlength && newValue.length > maxlength) {
        newValue = newValue.slice(0, maxlength);
        selectionStart = Math.min(selectionStart, maxlength);
        selectionEnd = Math.min(selectionEnd, maxlength);
      }
      if (maxlength && maxlength < newValue.length) {
        return;
      }
      this.input().nativeElement.value = newValue;
      let newLength = newValue.length;
      if (operation === "range-insert") {
        const startValue = this.parseValue((inputValue || "").slice(0, selectionStart));
        const startValueStr = startValue !== null ? startValue.toString() : "";
        const startExpr = startValueStr.split("").join(`(${this.groupChar})?`);
        const sRegex = new RegExp(startExpr, "g");
        sRegex.test(newValue);
        const tExpr = insertedValueStr.split("").join(`(${this.groupChar})?`);
        const tRegex = new RegExp(tExpr, "g");
        tRegex.test(newValue.slice(sRegex.lastIndex));
        selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
        this.input().nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (newLength === currentLength) {
        if (operation === "insert" || operation === "delete-back-single")
          this.input().nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
        else if (operation === "delete-single")
          this.input().nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
        else if (operation === "delete-range" || operation === "spin")
          this.input().nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (operation === "delete-back-single") {
        let prevChar = inputValue.charAt(selectionEnd - 1);
        let nextChar = inputValue.charAt(selectionEnd);
        let diff = currentLength - newLength;
        let isGroupChar = this._group.test(nextChar);
        if (isGroupChar && diff === 1) {
          selectionEnd += 1;
        } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
          selectionEnd += -1 * diff + 1;
        }
        this._group.lastIndex = 0;
        this.input().nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      } else if (inputValue === "-" && operation === "insert") {
        this.input().nativeElement.setSelectionRange(0, 0);
        const index = this.initCursor();
        const selectionEnd2 = index + insertedValueStr.length + 1;
        this.input().nativeElement.setSelectionRange(selectionEnd2, selectionEnd2);
      } else {
        selectionEnd = selectionEnd + (newLength - currentLength);
        this.input().nativeElement.setSelectionRange(selectionEnd, selectionEnd);
      }
    }
    this.input().nativeElement.setAttribute("aria-valuenow", value);
  }
  concatValues(val1, val2) {
    if (val1 && val2) {
      let decimalCharIndex = val2.search(this._decimal);
      this._decimal.lastIndex = 0;
      if (this.suffixChar) {
        return decimalCharIndex !== -1 ? val1.replace(this.suffixChar, "").split(this._decimal)[0] + val2.replace(this.suffixChar, "").slice(decimalCharIndex) + this.suffixChar : val1;
      } else {
        return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
      }
    }
    return val1;
  }
  getDecimalLength(value) {
    if (value) {
      const valueSplit = value.split(this._decimal);
      if (valueSplit.length === 2) {
        return valueSplit[1].replace(this._suffix, "").trim().replace(/\s/g, "").replace(this._currency, "").length;
      }
    }
    return 0;
  }
  onInputFocus(event) {
    this.focused = true;
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused = false;
    const newValueNumber = this.validateValue(this.parseValue(this.input().nativeElement.value));
    const newValueString = newValueNumber?.toString() ?? "";
    this.input().nativeElement.value = this.formatValue(newValueNumber);
    this.input().nativeElement.setAttribute("aria-valuenow", newValueString);
    this.updateModel(event, newValueNumber);
    this.onModelTouched();
    this.onBlur.emit(event);
  }
  updateModel(event, value) {
    const isBlurUpdateOnMode = this.ngControl?.control?.updateOn === "blur";
    if (this.value() !== value) {
      this.value.set(value);
      if (!(isBlurUpdateOnMode && this.focused)) {
        this.onModelChange(value);
      }
    } else if (isBlurUpdateOnMode) {
      this.onModelChange(value);
    }
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    this.value.set(value ? Number(value) : value);
    setModelValue(value);
  }
  onDestroy() {
    this.clearTimer();
  }
  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  get dataP() {
    return this.cn({
      invalid: this.invalid(),
      disabled: this.$disabled(),
      focus: this.focused,
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      empty: !this.$filled(),
      [this.size()]: this.size(),
      [this.buttonLayout()]: this.showButtons() && this.buttonLayout()
    });
  }
  static \u0275fac = function InputNumber_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputNumber)();
  };
  static \u0275cmp = (function() {
    const _c02 = ["clearicon"];
    const _c1 = ["incrementbuttonicon"];
    const _c2 = ["decrementbuttonicon"];
    const _c3 = ["input"];
    function InputNumber_Conditional_2_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(0, "svg", 4);
        \u0275\u0275listener("click", function InputNumber_Conditional_2_Conditional_0_Template_svg_click_0_listener() {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.clear());
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("clearIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("clearIcon"));
      }
    }
    function InputNumber_Conditional_2_Conditional_1_ng_container_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function InputNumber_Conditional_2_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r3 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 5);
        \u0275\u0275listener("click", function InputNumber_Conditional_2_Conditional_1_Template_span_click_0_listener() {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.clear());
        });
        \u0275\u0275template(1, InputNumber_Conditional_2_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("clearIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("clearIcon"));
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.clearIconTemplate());
      }
    }
    function InputNumber_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, InputNumber_Conditional_2_Conditional_0_Template, 1, 3, ":svg:svg", 3)(1, InputNumber_Conditional_2_Conditional_1_Template, 2, 4, "span", 2);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275conditional(!ctx_r1.clearIconTemplate() ? 0 : 1);
      }
    }
    function InputNumber_Conditional_3_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 7);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.incrementButtonIcon());
        \u0275\u0275property("pBind", ctx_r1.ptm("incrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_3_Conditional_3_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 9);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("pBind", ctx_r1.ptm("incrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_3_Conditional_3_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function InputNumber_Conditional_3_Conditional_3_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, InputNumber_Conditional_3_Conditional_3_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.incrementButtonIconTemplate());
      }
    }
    function InputNumber_Conditional_3_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, InputNumber_Conditional_3_Conditional_3_Conditional_0_Template, 1, 1, ":svg:svg", 9)(1, InputNumber_Conditional_3_Conditional_3_Conditional_1_Template, 1, 1, "ng-container");
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(!ctx_r1.incrementButtonIconTemplate() ? 0 : 1);
      }
    }
    function InputNumber_Conditional_3_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 7);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.decrementButtonIcon());
        \u0275\u0275property("pBind", ctx_r1.ptm("decrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_3_Conditional_6_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 10);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("pBind", ctx_r1.ptm("decrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_3_Conditional_6_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function InputNumber_Conditional_3_Conditional_6_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, InputNumber_Conditional_3_Conditional_6_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.decrementButtonIconTemplate());
      }
    }
    function InputNumber_Conditional_3_Conditional_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, InputNumber_Conditional_3_Conditional_6_Conditional_0_Template, 1, 1, ":svg:svg", 10)(1, InputNumber_Conditional_3_Conditional_6_Conditional_1_Template, 1, 1, "ng-container");
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(!ctx_r1.decrementButtonIconTemplate() ? 0 : 1);
      }
    }
    function InputNumber_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        const _r4 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 7)(1, "button", 8);
        \u0275\u0275listener("mousedown", function InputNumber_Conditional_3_Template_button_mousedown_1_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonMouseDown($event));
        })("mouseup", function InputNumber_Conditional_3_Template_button_mouseup_1_listener() {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonMouseUp());
        })("mouseleave", function InputNumber_Conditional_3_Template_button_mouseleave_1_listener() {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonMouseLeave());
        })("keydown", function InputNumber_Conditional_3_Template_button_keydown_1_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonKeyDown($event));
        })("keyup", function InputNumber_Conditional_3_Template_button_keyup_1_listener() {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonKeyUp());
        });
        \u0275\u0275conditionalCreate(2, InputNumber_Conditional_3_Conditional_2_Template, 1, 3, "span", 2)(3, InputNumber_Conditional_3_Conditional_3_Template, 2, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 8);
        \u0275\u0275listener("mousedown", function InputNumber_Conditional_3_Template_button_mousedown_4_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonMouseDown($event));
        })("mouseup", function InputNumber_Conditional_3_Template_button_mouseup_4_listener() {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonMouseUp());
        })("mouseleave", function InputNumber_Conditional_3_Template_button_mouseleave_4_listener() {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonMouseLeave());
        })("keydown", function InputNumber_Conditional_3_Template_button_keydown_4_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonKeyDown($event));
        })("keyup", function InputNumber_Conditional_3_Template_button_keyup_4_listener() {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonKeyUp());
        });
        \u0275\u0275conditionalCreate(5, InputNumber_Conditional_3_Conditional_5_Template, 1, 3, "span", 2)(6, InputNumber_Conditional_3_Conditional_6_Template, 2, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r1.cx("buttonGroup"));
        \u0275\u0275property("pBind", ctx_r1.ptm("buttonGroup"));
        \u0275\u0275attribute("data-p", ctx_r1.dataP);
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("incrementButton"), ctx_r1.incrementButtonClass()));
        \u0275\u0275property("pBind", ctx_r1.ptm("incrementButton"));
        \u0275\u0275attribute("disabled", ctx_r1.disabledAttr())("aria-hidden", true)("data-p", ctx_r1.dataP);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.hasIncrementButtonIcon() ? 2 : 3);
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("decrementButton"), ctx_r1.decrementButtonClass()));
        \u0275\u0275property("pBind", ctx_r1.ptm("decrementButton"));
        \u0275\u0275attribute("disabled", ctx_r1.disabledAttr())("aria-hidden", true)("data-p", ctx_r1.dataP);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.hasDecrementButtonIcon() ? 5 : 6);
      }
    }
    function InputNumber_Conditional_4_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 7);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.incrementButtonIcon());
        \u0275\u0275property("pBind", ctx_r1.ptm("incrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_4_Conditional_2_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 9);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("pBind", ctx_r1.ptm("incrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_4_Conditional_2_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function InputNumber_Conditional_4_Conditional_2_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, InputNumber_Conditional_4_Conditional_2_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.incrementButtonIconTemplate());
      }
    }
    function InputNumber_Conditional_4_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, InputNumber_Conditional_4_Conditional_2_Conditional_0_Template, 1, 1, ":svg:svg", 9)(1, InputNumber_Conditional_4_Conditional_2_Conditional_1_Template, 1, 1, "ng-container");
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(!ctx_r1.incrementButtonIconTemplate() ? 0 : 1);
      }
    }
    function InputNumber_Conditional_4_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 7);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.decrementButtonIcon());
        \u0275\u0275property("pBind", ctx_r1.ptm("decrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_4_Conditional_5_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 10);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("pBind", ctx_r1.ptm("decrementButtonIcon"));
      }
    }
    function InputNumber_Conditional_4_Conditional_5_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function InputNumber_Conditional_4_Conditional_5_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, InputNumber_Conditional_4_Conditional_5_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.decrementButtonIconTemplate());
      }
    }
    function InputNumber_Conditional_4_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, InputNumber_Conditional_4_Conditional_5_Conditional_0_Template, 1, 1, ":svg:svg", 10)(1, InputNumber_Conditional_4_Conditional_5_Conditional_1_Template, 1, 1, "ng-container");
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(!ctx_r1.decrementButtonIconTemplate() ? 0 : 1);
      }
    }
    function InputNumber_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        const _r5 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "button", 8);
        \u0275\u0275listener("mousedown", function InputNumber_Conditional_4_Template_button_mousedown_0_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonMouseDown($event));
        })("mouseup", function InputNumber_Conditional_4_Template_button_mouseup_0_listener() {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonMouseUp());
        })("mouseleave", function InputNumber_Conditional_4_Template_button_mouseleave_0_listener() {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonMouseLeave());
        })("keydown", function InputNumber_Conditional_4_Template_button_keydown_0_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonKeyDown($event));
        })("keyup", function InputNumber_Conditional_4_Template_button_keyup_0_listener() {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onUpButtonKeyUp());
        });
        \u0275\u0275conditionalCreate(1, InputNumber_Conditional_4_Conditional_1_Template, 1, 3, "span", 2)(2, InputNumber_Conditional_4_Conditional_2_Template, 2, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "button", 8);
        \u0275\u0275listener("mousedown", function InputNumber_Conditional_4_Template_button_mousedown_3_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonMouseDown($event));
        })("mouseup", function InputNumber_Conditional_4_Template_button_mouseup_3_listener() {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonMouseUp());
        })("mouseleave", function InputNumber_Conditional_4_Template_button_mouseleave_3_listener() {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonMouseLeave());
        })("keydown", function InputNumber_Conditional_4_Template_button_keydown_3_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonKeyDown($event));
        })("keyup", function InputNumber_Conditional_4_Template_button_keyup_3_listener() {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onDownButtonKeyUp());
        });
        \u0275\u0275conditionalCreate(4, InputNumber_Conditional_4_Conditional_4_Template, 1, 3, "span", 2)(5, InputNumber_Conditional_4_Conditional_5_Template, 2, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("incrementButton"), ctx_r1.incrementButtonClass()));
        \u0275\u0275property("pBind", ctx_r1.ptm("incrementButton"));
        \u0275\u0275attribute("disabled", ctx_r1.disabledAttr())("aria-hidden", true)("data-p", ctx_r1.dataP);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.hasIncrementButtonIcon() ? 1 : 2);
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("decrementButton"), ctx_r1.decrementButtonClass()));
        \u0275\u0275property("pBind", ctx_r1.ptm("decrementButton"));
        \u0275\u0275attribute("disabled", ctx_r1.disabledAttr())("aria-hidden", true)("data-p", ctx_r1.dataP);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.hasDecrementButtonIcon() ? 4 : 5);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _InputNumber,
      selectors: [["p-inputnumber"], ["p-input-number"]],
      contentQueries: function InputNumber_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.clearIconTemplate, _c02, 4)(dirIndex, ctx.incrementButtonIconTemplate, _c1, 4)(dirIndex, ctx.decrementButtonIconTemplate, _c2, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(3);
        }
      },
      viewQuery: function InputNumber_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx.input, _c3, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
        }
      },
      hostVars: 3,
      hostBindings: function InputNumber_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("data-p", ctx.dataP);
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        showButtons: [1, "showButtons"],
        format: [1, "format"],
        buttonLayout: [1, "buttonLayout"],
        inputId: [1, "inputId"],
        placeholder: [1, "placeholder"],
        tabindex: [1, "tabindex"],
        title: [1, "title"],
        ariaLabelledBy: [1, "ariaLabelledBy"],
        ariaDescribedBy: [1, "ariaDescribedBy"],
        ariaLabel: [1, "ariaLabel"],
        ariaRequired: [1, "ariaRequired"],
        autocomplete: [1, "autocomplete"],
        incrementButtonClass: [1, "incrementButtonClass"],
        decrementButtonClass: [1, "decrementButtonClass"],
        incrementButtonIcon: [1, "incrementButtonIcon"],
        decrementButtonIcon: [1, "decrementButtonIcon"],
        readonly: [1, "readonly"],
        allowEmpty: [1, "allowEmpty"],
        locale: [1, "locale"],
        localeMatcher: [1, "localeMatcher"],
        mode: [1, "mode"],
        currency: [1, "currency"],
        currencyDisplay: [1, "currencyDisplay"],
        useGrouping: [1, "useGrouping"],
        minFractionDigits: [1, "minFractionDigits"],
        maxFractionDigits: [1, "maxFractionDigits"],
        prefix: [1, "prefix"],
        suffix: [1, "suffix"],
        inputStyle: [1, "inputStyle"],
        inputStyleClass: [1, "inputStyleClass"],
        showClear: [1, "showClear"],
        autofocus: [1, "autofocus"]
      },
      outputs: {
        onInput: "onInput",
        onFocus: "onFocus",
        onBlur: "onBlur",
        onKeyDown: "onKeyDown",
        onClear: "onClear"
      },
      features: [\u0275\u0275ProvidersFeature([INPUTNUMBER_VALUE_ACCESSOR, InputNumberStyle, { provide: INPUTNUMBER_INSTANCE, useExisting: _InputNumber }, { provide: PARENT_INSTANCE, useExisting: _InputNumber }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      decls: 5,
      vars: 38,
      consts: [["input", ""], ["pInputText", "", "role", "spinbutton", "inputmode", "decimal", 3, "input", "keydown", "keypress", "paste", "click", "focus", "blur", "value", "variant", "invalid", "pSize", "pt", "unstyled", "pAutoFocus", "fluid"], [3, "pBind", "class"], ["data-p-icon", "times", 3, "pBind", "class"], ["data-p-icon", "times", 3, "click", "pBind"], [3, "click", "pBind"], [4, "ngTemplateOutlet"], [3, "pBind"], ["type", "button", "tabindex", "-1", 3, "mousedown", "mouseup", "mouseleave", "keydown", "keyup", "pBind"], ["data-p-icon", "angle-up", 3, "pBind"], ["data-p-icon", "angle-down", 3, "pBind"]],
      template: function InputNumber_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "input", 1, 0);
          \u0275\u0275listener("input", function InputNumber_Template_input_input_0_listener($event) {
            return ctx.onUserInput($event);
          })("keydown", function InputNumber_Template_input_keydown_0_listener($event) {
            return ctx.onInputKeyDown($event);
          })("keypress", function InputNumber_Template_input_keypress_0_listener($event) {
            return ctx.onInputKeyPress($event);
          })("paste", function InputNumber_Template_input_paste_0_listener($event) {
            return ctx.onPaste($event);
          })("click", function InputNumber_Template_input_click_0_listener() {
            return ctx.onInputClick();
          })("focus", function InputNumber_Template_input_focus_0_listener($event) {
            return ctx.onInputFocus($event);
          })("blur", function InputNumber_Template_input_blur_0_listener($event) {
            return ctx.onInputBlur($event);
          });
          \u0275\u0275elementEnd();
          \u0275\u0275conditionalCreate(2, InputNumber_Conditional_2_Template, 2, 1);
          \u0275\u0275conditionalCreate(3, InputNumber_Conditional_3_Template, 7, 18, "span", 2);
          \u0275\u0275conditionalCreate(4, InputNumber_Conditional_4_Template, 6, 14);
        }
        if (rf & 2) {
          \u0275\u0275styleMap(ctx.inputStyle());
          \u0275\u0275classMap(ctx.cn(ctx.cx("pcInputText"), ctx.inputStyleClass()));
          \u0275\u0275property("value", ctx.formattedValue())("variant", ctx.$variant())("invalid", ctx.invalid())("pSize", ctx.size())("pt", ctx.ptm("pcInputText"))("unstyled", ctx.unstyled())("pAutoFocus", ctx.autofocus())("fluid", ctx.hasFluid);
          \u0275\u0275attribute("id", ctx.inputId())("aria-valuemin", ctx.min())("aria-valuemax", ctx.max())("aria-valuenow", ctx.value())("placeholder", ctx.placeholder())("aria-label", ctx.ariaLabel())("aria-labelledby", ctx.ariaLabelledBy())("aria-describedby", ctx.ariaDescribedBy())("title", ctx.title())("size", ctx.inputSize())("name", ctx.name())("autocomplete", ctx.autocomplete())("maxlength", ctx.maxlength())("minlength", ctx.minlength())("tabindex", ctx.tabindex())("aria-required", ctx.ariaRequired())("min", ctx.min())("max", ctx.max())("step", ctx.step() ?? 1)("required", ctx.requiredAttr())("readonly", ctx.readonlyAttr())("disabled", ctx.disabledAttr())("data-p", ctx.dataP);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.showClearIcon ? 2 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.showStackedButtons() ? 3 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.showNonStackedButtons() ? 4 : -1);
        }
      },
      dependencies: [NgTemplateOutlet, InputText, AutoFocus, Times, AngleUp, AngleDown, SharedModule, BindModule, Bind],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumber, [{
    type: Component,
    args: [{
      selector: "p-inputnumber, p-input-number",
      standalone: true,
      imports: [NgTemplateOutlet, InputText, AutoFocus, Times, AngleUp, AngleDown, SharedModule, BindModule],
      template: `
        <input
            pInputText
            #input
            [attr.id]="inputId()"
            role="spinbutton"
            [class]="cn(cx('pcInputText'), inputStyleClass())"
            [value]="formattedValue()"
            [style]="inputStyle()"
            [variant]="$variant()"
            [invalid]="invalid()"
            [attr.aria-valuemin]="min()"
            [attr.aria-valuemax]="max()"
            [attr.aria-valuenow]="value()"
            [attr.placeholder]="placeholder()"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-describedby]="ariaDescribedBy()"
            [attr.title]="title()"
            [pSize]="size()"
            [attr.size]="inputSize()"
            [attr.name]="name()"
            [attr.autocomplete]="autocomplete()"
            [attr.maxlength]="maxlength()"
            [attr.minlength]="minlength()"
            [attr.tabindex]="tabindex()"
            [attr.aria-required]="ariaRequired()"
            [attr.min]="min()"
            [attr.max]="max()"
            [attr.step]="step() ?? 1"
            [attr.required]="requiredAttr()"
            [attr.readonly]="readonlyAttr()"
            [attr.disabled]="disabledAttr()"
            inputmode="decimal"
            (input)="onUserInput($event)"
            (keydown)="onInputKeyDown($event)"
            (keypress)="onInputKeyPress($event)"
            (paste)="onPaste($event)"
            (click)="onInputClick()"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            [pt]="ptm('pcInputText')"
            [unstyled]="unstyled()"
            [pAutoFocus]="autofocus()"
            [fluid]="hasFluid"
            [attr.data-p]="dataP"
        />
        @if (showClearIcon) {
            @if (!clearIconTemplate()) {
                <svg data-p-icon="times" [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear()" />
            } @else {
                <span [pBind]="ptm('clearIcon')" (click)="clear()" [class]="cx('clearIcon')">
                    <ng-container *ngTemplateOutlet="clearIconTemplate()"></ng-container>
                </span>
            }
        }
        @if (showStackedButtons()) {
            <span [pBind]="ptm('buttonGroup')" [class]="cx('buttonGroup')" [attr.data-p]="dataP">
                <button
                    type="button"
                    [pBind]="ptm('incrementButton')"
                    [class]="cn(cx('incrementButton'), incrementButtonClass())"
                    [attr.disabled]="disabledAttr()"
                    tabindex="-1"
                    (mousedown)="onUpButtonMouseDown($event)"
                    (mouseup)="onUpButtonMouseUp()"
                    (mouseleave)="onUpButtonMouseLeave()"
                    (keydown)="onUpButtonKeyDown($event)"
                    (keyup)="onUpButtonKeyUp()"
                    [attr.aria-hidden]="true"
                    [attr.data-p]="dataP"
                >
                    @if (hasIncrementButtonIcon()) {
                        <span [pBind]="ptm('incrementButtonIcon')" [class]="incrementButtonIcon()"></span>
                    } @else {
                        @if (!incrementButtonIconTemplate()) {
                            <svg data-p-icon="angle-up" [pBind]="ptm('incrementButtonIcon')" />
                        } @else {
                            <ng-container *ngTemplateOutlet="incrementButtonIconTemplate()"></ng-container>
                        }
                    }
                </button>

                <button
                    type="button"
                    [pBind]="ptm('decrementButton')"
                    [class]="cn(cx('decrementButton'), decrementButtonClass())"
                    [attr.disabled]="disabledAttr()"
                    tabindex="-1"
                    [attr.aria-hidden]="true"
                    (mousedown)="onDownButtonMouseDown($event)"
                    (mouseup)="onDownButtonMouseUp()"
                    (mouseleave)="onDownButtonMouseLeave()"
                    (keydown)="onDownButtonKeyDown($event)"
                    (keyup)="onDownButtonKeyUp()"
                    [attr.data-p]="dataP"
                >
                    @if (hasDecrementButtonIcon()) {
                        <span [pBind]="ptm('decrementButtonIcon')" [class]="decrementButtonIcon()"></span>
                    } @else {
                        @if (!decrementButtonIconTemplate()) {
                            <svg data-p-icon="angle-down" [pBind]="ptm('decrementButtonIcon')" />
                        } @else {
                            <ng-container *ngTemplateOutlet="decrementButtonIconTemplate()"></ng-container>
                        }
                    }
                </button>
            </span>
        }
        @if (showNonStackedButtons()) {
            <button
                type="button"
                [pBind]="ptm('incrementButton')"
                [class]="cn(cx('incrementButton'), incrementButtonClass())"
                [attr.disabled]="disabledAttr()"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onUpButtonMouseDown($event)"
                (mouseup)="onUpButtonMouseUp()"
                (mouseleave)="onUpButtonMouseLeave()"
                (keydown)="onUpButtonKeyDown($event)"
                (keyup)="onUpButtonKeyUp()"
                [attr.data-p]="dataP"
            >
                @if (hasIncrementButtonIcon()) {
                    <span [pBind]="ptm('incrementButtonIcon')" [class]="incrementButtonIcon()"></span>
                } @else {
                    @if (!incrementButtonIconTemplate()) {
                        <svg data-p-icon="angle-up" [pBind]="ptm('incrementButtonIcon')" />
                    } @else {
                        <ng-container *ngTemplateOutlet="incrementButtonIconTemplate()"></ng-container>
                    }
                }
            </button>
            <button
                type="button"
                [pBind]="ptm('decrementButton')"
                [class]="cn(cx('decrementButton'), decrementButtonClass())"
                [attr.disabled]="disabledAttr()"
                tabindex="-1"
                [attr.aria-hidden]="true"
                (mousedown)="onDownButtonMouseDown($event)"
                (mouseup)="onDownButtonMouseUp()"
                (mouseleave)="onDownButtonMouseLeave()"
                (keydown)="onDownButtonKeyDown($event)"
                (keyup)="onDownButtonKeyUp()"
                [attr.data-p]="dataP"
            >
                @if (hasDecrementButtonIcon()) {
                    <span [pBind]="ptm('decrementButtonIcon')" [class]="decrementButtonIcon()"></span>
                } @else {
                    @if (!decrementButtonIconTemplate()) {
                        <svg data-p-icon="angle-down" [pBind]="ptm('decrementButtonIcon')" />
                    } @else {
                        <ng-container *ngTemplateOutlet="decrementButtonIconTemplate()"></ng-container>
                    }
                }
            </button>
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [INPUTNUMBER_VALUE_ACCESSOR, InputNumberStyle, { provide: INPUTNUMBER_INSTANCE, useExisting: InputNumber }, { provide: PARENT_INSTANCE, useExisting: InputNumber }],
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cx('root')",
        "[attr.data-p]": "dataP"
      },
      hostDirectives: [Bind]
    }]
  }], () => [], { showButtons: [{ type: Input, args: [{ isSignal: true, alias: "showButtons", required: false }] }], format: [{ type: Input, args: [{ isSignal: true, alias: "format", required: false }] }], buttonLayout: [{ type: Input, args: [{ isSignal: true, alias: "buttonLayout", required: false }] }], inputId: [{ type: Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], placeholder: [{ type: Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], tabindex: [{ type: Input, args: [{ isSignal: true, alias: "tabindex", required: false }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], ariaLabelledBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabelledBy", required: false }] }], ariaDescribedBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaDescribedBy", required: false }] }], ariaLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], ariaRequired: [{ type: Input, args: [{ isSignal: true, alias: "ariaRequired", required: false }] }], autocomplete: [{ type: Input, args: [{ isSignal: true, alias: "autocomplete", required: false }] }], incrementButtonClass: [{ type: Input, args: [{ isSignal: true, alias: "incrementButtonClass", required: false }] }], decrementButtonClass: [{ type: Input, args: [{ isSignal: true, alias: "decrementButtonClass", required: false }] }], incrementButtonIcon: [{ type: Input, args: [{ isSignal: true, alias: "incrementButtonIcon", required: false }] }], decrementButtonIcon: [{ type: Input, args: [{ isSignal: true, alias: "decrementButtonIcon", required: false }] }], readonly: [{ type: Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], allowEmpty: [{ type: Input, args: [{ isSignal: true, alias: "allowEmpty", required: false }] }], locale: [{ type: Input, args: [{ isSignal: true, alias: "locale", required: false }] }], localeMatcher: [{ type: Input, args: [{ isSignal: true, alias: "localeMatcher", required: false }] }], mode: [{ type: Input, args: [{ isSignal: true, alias: "mode", required: false }] }], currency: [{ type: Input, args: [{ isSignal: true, alias: "currency", required: false }] }], currencyDisplay: [{ type: Input, args: [{ isSignal: true, alias: "currencyDisplay", required: false }] }], useGrouping: [{ type: Input, args: [{ isSignal: true, alias: "useGrouping", required: false }] }], minFractionDigits: [{ type: Input, args: [{ isSignal: true, alias: "minFractionDigits", required: false }] }], maxFractionDigits: [{ type: Input, args: [{ isSignal: true, alias: "maxFractionDigits", required: false }] }], prefix: [{ type: Input, args: [{ isSignal: true, alias: "prefix", required: false }] }], suffix: [{ type: Input, args: [{ isSignal: true, alias: "suffix", required: false }] }], inputStyle: [{ type: Input, args: [{ isSignal: true, alias: "inputStyle", required: false }] }], inputStyleClass: [{ type: Input, args: [{ isSignal: true, alias: "inputStyleClass", required: false }] }], showClear: [{ type: Input, args: [{ isSignal: true, alias: "showClear", required: false }] }], autofocus: [{ type: Input, args: [{ isSignal: true, alias: "autofocus", required: false }] }], onInput: [{ type: Output, args: ["onInput"] }], onFocus: [{ type: Output, args: ["onFocus"] }], onBlur: [{ type: Output, args: ["onBlur"] }], onKeyDown: [{ type: Output, args: ["onKeyDown"] }], onClear: [{ type: Output, args: ["onClear"] }], clearIconTemplate: [{ type: ContentChild, args: ["clearicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], incrementButtonIconTemplate: [{ type: ContentChild, args: ["incrementbuttonicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], decrementButtonIconTemplate: [{ type: ContentChild, args: ["decrementbuttonicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], input: [{ type: ViewChild, args: ["input", { isSignal: true }] }] });
})();
var InputNumberModule = class _InputNumberModule {
  static \u0275fac = function InputNumberModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputNumberModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _InputNumberModule,
    imports: [InputNumber, SharedModule],
    exports: [InputNumber, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [InputNumber, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputNumberModule, [{
    type: NgModule,
    args: [{
      imports: [InputNumber, SharedModule],
      exports: [InputNumber, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/textarea/index.mjs
var style2 = "\n    .p-textarea {\n        font-weight: dt('textarea.font.weight');\n        font-size: dt('textarea.font.size');\n        color: dt('textarea.color');\n        background: dt('textarea.background');\n        padding-block: dt('textarea.padding.y');\n        padding-inline: dt('textarea.padding.x');\n        border: 1px solid dt('textarea.border.color');\n        transition:\n            background dt('textarea.transition.duration'),\n            color dt('textarea.transition.duration'),\n            border-color dt('textarea.transition.duration'),\n            outline-color dt('textarea.transition.duration'),\n            box-shadow dt('textarea.transition.duration');\n        appearance: none;\n        border-radius: dt('textarea.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('textarea.shadow');\n    }\n\n    .p-textarea:enabled:hover {\n        border-color: dt('textarea.hover.border.color');\n    }\n\n    .p-textarea:enabled:focus {\n        border-color: dt('textarea.focus.border.color');\n        box-shadow: dt('textarea.focus.ring.shadow');\n        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');\n        outline-offset: dt('textarea.focus.ring.offset');\n    }\n\n    .p-textarea.p-invalid {\n        border-color: dt('textarea.invalid.border.color');\n    }\n\n    .p-textarea.p-variant-filled {\n        background: dt('textarea.filled.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:hover {\n        background: dt('textarea.filled.hover.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:focus {\n        background: dt('textarea.filled.focus.background');\n    }\n\n    .p-textarea:disabled {\n        opacity: 1;\n        background: dt('textarea.disabled.background');\n        color: dt('textarea.disabled.color');\n    }\n\n    .p-textarea::placeholder {\n        color: dt('textarea.placeholder.color');\n    }\n\n    .p-textarea.p-invalid::placeholder {\n        color: dt('textarea.invalid.placeholder.color');\n    }\n\n    .p-textarea-fluid {\n        width: 100%;\n    }\n\n    .p-textarea-resizable {\n        overflow: hidden;\n        resize: none;\n    }\n\n    .p-textarea-sm {\n        font-size: dt('textarea.sm.font.size');\n        padding-block: dt('textarea.sm.padding.y');\n        padding-inline: dt('textarea.sm.padding.x');\n    }\n\n    .p-textarea-lg {\n        font-size: dt('textarea.lg.font.size');\n        padding-block: dt('textarea.lg.padding.y');\n        padding-inline: dt('textarea.lg.padding.x');\n    }\n";

// node_modules/primeng/fesm2022/primeng-textarea.mjs
var classes2 = {
  root: ({ instance }) => [
    "p-textarea p-component",
    {
      "p-filled": instance.$filled(),
      "p-textarea-resizable ": instance.autoResize(),
      "p-variant-filled": instance.$variant() === "filled",
      "p-textarea-fluid": instance.hasFluid,
      "p-inputfield-sm p-textarea-sm": instance.pSize() === "small",
      "p-textarea-lg p-inputfield-lg": instance.pSize() === "large",
      "p-invalid": instance.invalid()
    }
  ]
};
var TextareaStyle = class _TextareaStyle extends BaseStyle {
  name = "textarea";
  style = style2;
  classes = classes2;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275TextareaStyle_BaseFactory = void 0;
    return function TextareaStyle_Factory(__ngFactoryType__) {
      return (\u0275TextareaStyle_BaseFactory || (\u0275TextareaStyle_BaseFactory = \u0275\u0275getInheritedFactory(_TextareaStyle)))(__ngFactoryType__ || _TextareaStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TextareaStyle,
    factory: _TextareaStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaStyle, [{
    type: Injectable
  }], null, null);
})();
var TextareaClasses;
(function(TextareaClasses2) {
  TextareaClasses2["root"] = "p-textarea";
})(TextareaClasses || (TextareaClasses = {}));
var TEXTAREA_INSTANCE = new InjectionToken("TEXTAREA_INSTANCE");
var Textarea = class _Textarea extends BaseModelHolder {
  componentName = "Textarea";
  bindDirectiveInstance = inject(Bind, { self: true });
  $pcTextarea = inject(TEXTAREA_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  /**
   * Used to pass attributes to DOM elements inside the Textarea component.
   * @defaultValue undefined
   * @group Props
   */
  pTextareaPT = input(
    ...ngDevMode ? [void 0, { debugName: "pTextareaPT" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pTextareaUnstyled = input(
    ...ngDevMode ? [void 0, { debugName: "pTextareaUnstyled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, textarea size changes as being typed.
   * @group Props
   */
  autoResize = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autoResize" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Defines the size of the component.
   * @group Props
   */
  pSize = input(
    ...ngDevMode ? [void 0, { debugName: "pSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies the input variant of the component.
   * @defaultValue undefined
   * @group Props
   */
  variant = input(
    ...ngDevMode ? [void 0, { debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Spans 100% width of the container when enabled.
   * @defaultValue undefined
   * @group Props
   */
  fluid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "fluid" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When present, it specifies that the component should have invalid state style.
   * @defaultValue false
   * @group Props
   */
  invalid = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "invalid" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  $variant = computed(
    () => this.variant() || this.config.inputVariant() || void 0,
    ...ngDevMode ? [{ debugName: "$variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Callback to invoke on textarea resize.
   * @param {(Event | {})} event - Custom resize event.
   * @group Emits
   */
  onResize = output();
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  _componentStyle = inject(TextareaStyle);
  ngControl = inject(NgControl, { optional: true, self: true });
  pcFluid = inject(Fluid, { optional: true, host: true, skipSelf: true });
  destroyRef = inject(DestroyRef);
  constructor() {
    super();
    effect(() => {
      const pt = this.pTextareaPT();
      if (pt) {
        this.directivePT.set(pt);
      }
    });
    effect(() => {
      if (this.pTextareaUnstyled()) {
        this.directiveUnstyled.set(this.pTextareaUnstyled());
      }
    });
  }
  onInit() {
    if (this.ngControl && this.ngControl.valueChanges) {
      this.ngControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateState();
      });
    }
  }
  onAfterViewInit() {
    if (this.autoResize())
      this.resize();
    this.cd.detectChanges();
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
    if (this.autoResize()) {
      this.resize();
    }
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
  }
  onInput(e3) {
    this.writeModelValue(e3.target?.value);
    this.updateState();
  }
  resize(event) {
    this.el.nativeElement.style.height = "auto";
    this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + "px";
    if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
      this.el.nativeElement.style.overflowY = "scroll";
      this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
    } else {
      this.el.nativeElement.style.overflow = "hidden";
    }
    this.onResize.emit(event || {});
  }
  updateState() {
    if (this.autoResize()) {
      this.resize();
    }
  }
  static \u0275fac = function Textarea_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Textarea)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _Textarea,
    selectors: [["", "pTextarea", ""], ["", "pInputTextarea", ""]],
    hostVars: 2,
    hostBindings: function Textarea_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function Textarea_input_HostBindingHandler($event) {
          return ctx.onInput($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      pTextareaPT: [1, "pTextareaPT"],
      pTextareaUnstyled: [1, "pTextareaUnstyled"],
      autoResize: [1, "autoResize"],
      pSize: [1, "pSize"],
      variant: [1, "variant"],
      fluid: [1, "fluid"],
      invalid: [1, "invalid"]
    },
    outputs: {
      onResize: "onResize"
    },
    features: [\u0275\u0275ProvidersFeature([TextareaStyle, { provide: TEXTAREA_INSTANCE, useExisting: _Textarea }, { provide: PARENT_INSTANCE, useExisting: _Textarea }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Textarea, [{
    type: Directive,
    args: [{
      selector: "[pTextarea], [pInputTextarea]",
      standalone: true,
      host: {
        "[class]": "cx('root')"
      },
      providers: [TextareaStyle, { provide: TEXTAREA_INSTANCE, useExisting: Textarea }, { provide: PARENT_INSTANCE, useExisting: Textarea }],
      hostDirectives: [Bind]
    }]
  }], () => [], { pTextareaPT: [{ type: Input, args: [{ isSignal: true, alias: "pTextareaPT", required: false }] }], pTextareaUnstyled: [{ type: Input, args: [{ isSignal: true, alias: "pTextareaUnstyled", required: false }] }], autoResize: [{ type: Input, args: [{ isSignal: true, alias: "autoResize", required: false }] }], pSize: [{ type: Input, args: [{ isSignal: true, alias: "pSize", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], fluid: [{ type: Input, args: [{ isSignal: true, alias: "fluid", required: false }] }], invalid: [{ type: Input, args: [{ isSignal: true, alias: "invalid", required: false }] }], onResize: [{ type: Output, args: ["onResize"] }], onInput: [{
    type: HostListener,
    args: ["input", ["$event"]]
  }] });
})();
var TextareaModule = class _TextareaModule {
  static \u0275fac = function TextareaModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextareaModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _TextareaModule,
    imports: [Textarea],
    exports: [Textarea]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaModule, [{
    type: NgModule,
    args: [{
      imports: [Textarea],
      exports: [Textarea]
    }]
  }], null, null);
})();

// src/app/features/plans/publish-plan.ts
var _c0 = (a0) => ({ hours: a0 });
function PublishPlan_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 12);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "publish.titleError"));
  }
}
function PublishPlan_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "input", 18);
    \u0275\u0275pipe(1, "transloco");
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275attribute("aria-label", \u0275\u0275pipeBind1(1, 1, "publish.startTime"));
    \u0275\u0275control();
  }
}
function PublishPlan_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.form.controls.latitude.value, ", ", ctx_r0.form.controls.longitude.value, " ");
  }
}
function PublishPlan_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 12);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "publish.whereError"));
  }
}
function PublishPlan_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p-message", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r2 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, message_r2.key, message_r2.params));
  }
}
var START_OPTIONS = [
  { key: "publish.in30", value: "30" },
  { key: "publish.in60", value: "60" },
  { key: "publish.in120", value: "120" },
  { key: "publish.in180", value: "180" },
  { key: "publish.custom", value: "custom" }
];
var PublishPlan = class _PublishPlan {
  api = inject(PlansApi);
  location = inject(ApproximateLocation);
  router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  transloco = inject(TranslocoService);
  changeDetector = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  /** Active language as a signal: the PrimeNG option labels are recomputed when it changes. */
  lang = toSignal(this.transloco.langChanges$, { initialValue: this.transloco.getActiveLang() });
  translate = (key) => {
    this.lang();
    return this.transloco.translate(key);
  };
  maxHours = MAX_HORIZON_HOURS;
  activities = computed(
    () => ACTIVITIES.map(({ code }) => ({ code, name: this.translate(activityKey(code)) })),
    ...ngDevMode ? [{ debugName: "activities" }] : (
      /* istanbul ignore next */
      []
    )
  );
  startOptions = computed(
    () => START_OPTIONS.map(({ key, value }) => ({ label: this.translate(key), value })),
    ...ngDevMode ? [{ debugName: "startOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  levelOptions = computed(
    () => [
      { label: this.translate("publish.anyLevel"), value: null },
      ...LEVELS.map((value) => ({ label: this.translate(levelKey(value)), value }))
    ],
    ...ngDevMode ? [{ debugName: "levelOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  publishing = signal(
    false,
    ...ngDevMode ? [{ debugName: "publishing" }] : (
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
  error = signal(
    null,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  form = this.fb.group({
    activity: ["", Validators.required],
    title: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    description: ["", Validators.maxLength(280)],
    placeName: ["", [Validators.required, Validators.maxLength(100)]],
    latitude: this.fb.control(null, Validators.required),
    longitude: this.fb.control(null, Validators.required),
    start: this.fb.control("60"),
    customTime: [""],
    spots: this.fb.control(1, [Validators.required, Validators.min(1), Validators.max(20)]),
    level: this.fb.control(null)
  });
  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.changeDetector.markForCheck());
  }
  /** Chosen start time, or null if the custom time is not within the next hours. */
  startsAt(now = /* @__PURE__ */ new Date()) {
    const { start, customTime } = this.form.getRawValue();
    if (start !== "custom") {
      return new Date(now.getTime() + Number(start) * 6e4);
    }
    if (!customTime) {
      return null;
    }
    const candidate = nextOccurrence(customTime, now);
    return startsInRange(candidate, now) ? candidate : null;
  }
  async useMyLocation() {
    this.locating.set(true);
    this.error.set(null);
    try {
      const { latitude, longitude } = await this.location.current(MEETING_POINT_DECIMALS);
      this.form.patchValue({ latitude, longitude });
    } catch (error) {
      this.error.set({ key: error instanceof LocationError ? error.translationKey : "errors.location.denied" });
    } finally {
      this.locating.set(false);
    }
  }
  publish() {
    const startsAt = this.startsAt();
    if (this.form.invalid || !startsAt) {
      this.form.markAllAsTouched();
      this.error.set(startsAt ? { key: "publish.checkFields" } : { key: "publish.chooseTime", params: { hours: MAX_HORIZON_HOURS } });
      return;
    }
    const value = this.form.getRawValue();
    this.publishing.set(true);
    this.error.set(null);
    this.api.publish({
      activity: value.activity,
      title: value.title.trim(),
      description: value.description.trim() || null,
      meetingPoint: { name: value.placeName.trim(), latitude: value.latitude, longitude: value.longitude },
      startsAt: startsAt.toISOString(),
      spots: value.spots,
      level: value.level
    }).subscribe({
      next: (plan) => this.router.navigate(["/plans", plan.id], { queryParams: { published: 1 } }),
      error: (error) => {
        this.publishing.set(false);
        this.error.set({ key: apiErrorKey(this.transloco, error, "errors.publishFailed") });
      }
    });
  }
  static \u0275fac = function PublishPlan_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PublishPlan)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PublishPlan, selectors: [["app-publish-plan"]], decls: 62, vars: 72, consts: [[1, "min-h-full"], [1, "bg-surface-0", "border-b", "border-surface-200"], [1, "mx-auto", "max-w-3xl", "flex", "items-center", "gap-2", "px-4", "py-3"], ["icon", "pi pi-arrow-left", "routerLink", "/", 3, "text", "rounded", "ariaLabel"], [1, "text-lg", "font-bold"], [1, "mx-auto", "max-w-3xl", "px-4", "py-6", "pb-16"], [1, "publish-form", "flex", "flex-col", "gap-6", 3, "ngSubmit", "formGroup"], [1, "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-5", "shadow-sm", "flex", "flex-col", "gap-3"], ["for", "activity", 1, "font-semibold"], ["inputId", "activity", "formControlName", "activity", "optionLabel", "name", "optionValue", "code", 1, "w-full", 3, "options", "placeholder"], ["for", "title", 1, "font-semibold", "mt-2"], ["pInputText", "", "id", "title", "formControlName", "title", "maxlength", "80", 3, "placeholder"], [1, "field-error", "text-red-600"], ["for", "description", 1, "font-semibold", "mt-2"], [1, "text-muted-color", "font-normal"], ["pTextarea", "", "id", "description", "formControlName", "description", "rows", "2", "maxlength", "280", 3, "placeholder"], [1, "font-semibold"], ["formControlName", "start", "optionLabel", "label", "optionValue", "value", "size", "small", 1, "flex-wrap", 3, "options", "allowEmpty"], ["pInputText", "", "type", "time", "id", "customTime", "formControlName", "customTime", 1, "w-40"], [1, "text-muted-color"], ["for", "placeName", 1, "font-semibold"], ["pInputText", "", "id", "placeName", "formControlName", "placeName", "maxlength", "100", 3, "placeholder"], [1, "flex", "flex-wrap", "items-center", "gap-2"], ["icon", "pi pi-map-marker", "severity", "secondary", "size", "small", 3, "onClick", "label", "outlined", "loading"], [1, "meeting-coordinates", "text-sm", "text-muted-color"], ["for", "spots", 1, "font-semibold"], ["inputId", "spots", "formControlName", "spots", "buttonLayout", "horizontal", "incrementButtonIcon", "pi pi-plus", "decrementButtonIcon", "pi pi-minus", 3, "showButtons", "min", "max"], [1, "font-semibold", "mt-2"], ["formControlName", "level", "optionLabel", "label", "optionValue", "value", "size", "small", 3, "options", "allowEmpty"], ["severity", "error", 1, "status-message"], ["type", "submit", "icon", "pi pi-send", "styleClass", "w-full", "size", "large", 3, "label", "loading"]], template: function PublishPlan_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
      \u0275\u0275element(3, "p-button", 3);
      \u0275\u0275pipe(4, "transloco");
      \u0275\u0275elementStart(5, "h1", 4);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "transloco");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "main", 5)(9, "form", 6);
      \u0275\u0275listener("ngSubmit", function PublishPlan_Template_form_ngSubmit_9_listener() {
        return ctx.publish();
      });
      \u0275\u0275elementStart(10, "section", 7)(11, "label", 8);
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p-select", 9);
      \u0275\u0275pipe(15, "transloco");
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "label", 10);
      \u0275\u0275text(17);
      \u0275\u0275pipe(18, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 11);
      \u0275\u0275pipe(20, "transloco");
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, PublishPlan_Conditional_21_Template, 3, 3, "small", 12);
      \u0275\u0275elementStart(22, "label", 13);
      \u0275\u0275text(23);
      \u0275\u0275pipe(24, "transloco");
      \u0275\u0275elementStart(25, "span", 14);
      \u0275\u0275text(26);
      \u0275\u0275pipe(27, "transloco");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "textarea", 15);
      \u0275\u0275pipe(29, "transloco");
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "section", 7)(31, "span", 16);
      \u0275\u0275text(32);
      \u0275\u0275pipe(33, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "p-selectbutton", 17);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, PublishPlan_Conditional_35_Template, 2, 3, "input", 18);
      \u0275\u0275elementStart(36, "small", 19);
      \u0275\u0275text(37);
      \u0275\u0275pipe(38, "transloco");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "section", 7)(40, "label", 20);
      \u0275\u0275text(41);
      \u0275\u0275pipe(42, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "input", 21);
      \u0275\u0275pipe(44, "transloco");
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 22)(46, "p-button", 23);
      \u0275\u0275pipe(47, "transloco");
      \u0275\u0275listener("onClick", function PublishPlan_Template_p_button_onClick_46_listener() {
        return ctx.useMyLocation();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(48, PublishPlan_Conditional_48_Template, 2, 2, "span", 24)(49, PublishPlan_Conditional_49_Template, 3, 3, "small", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "section", 7)(51, "label", 25);
      \u0275\u0275text(52);
      \u0275\u0275pipe(53, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "p-inputnumber", 26);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "span", 27);
      \u0275\u0275text(56);
      \u0275\u0275pipe(57, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p-selectbutton", 28);
      \u0275\u0275controlCreate();
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(59, PublishPlan_Conditional_59_Template, 3, 4, "p-message", 29);
      \u0275\u0275element(60, "p-button", 30);
      \u0275\u0275pipe(61, "transloco");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_39_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("text", true)("rounded", true)("ariaLabel", \u0275\u0275pipeBind1(4, 35, "app.back"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 37, "publish.title"));
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 39, "publish.what"));
      \u0275\u0275advance(2);
      \u0275\u0275property("options", ctx.activities())("placeholder", \u0275\u0275pipeBind1(15, 41, "publish.chooseActivity"));
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 43, "publish.planTitle"));
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(20, 45, "publish.planTitlePlaceholder"));
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.form.controls.title.invalid && ctx.form.controls.title.touched ? 21 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(24, 47, "publish.details"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 49, "publish.optional"));
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(29, 51, "publish.detailsPlaceholder"));
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 53, "publish.when"));
      \u0275\u0275advance(2);
      \u0275\u0275property("options", ctx.startOptions())("allowEmpty", false);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.form.controls.start.value === "custom" ? 35 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(38, 55, "publish.horizon", \u0275\u0275pureFunction1(70, _c0, ctx.maxHours)));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 58, "publish.where"));
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(44, 60, "publish.wherePlaceholder"));
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(47, 62, "publish.here"))("outlined", true)("loading", ctx.locating());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.form.controls.latitude.value !== null ? 48 : ctx.form.controls.latitude.touched ? 49 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(53, 64, "publish.spots"));
      \u0275\u0275advance(2);
      \u0275\u0275property("showButtons", true)("min", 1)("max", 20);
      \u0275\u0275control();
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(57, 66, "publish.level"));
      \u0275\u0275advance(2);
      \u0275\u0275property("options", ctx.levelOptions())("allowEmpty", false);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_39_0 = ctx.error()) ? 59 : -1, tmp_39_0);
      \u0275\u0275advance();
      \u0275\u0275property("label", \u0275\u0275pipeBind1(61, 68, "publish.submit"))("loading", ctx.publishing());
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
    RouterLink,
    Button,
    InputNumber,
    InputText,
    Message,
    Select,
    SelectButton,
    Textarea,
    TranslocoPipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublishPlan, [{
    type: Component,
    args: [{ selector: "app-publish-plan", imports: [
      ReactiveFormsModule,
      RouterLink,
      Button,
      InputNumber,
      InputText,
      Message,
      Select,
      SelectButton,
      Textarea,
      TranslocoPipe
    ], template: `<div class="min-h-full">
  <header class="bg-surface-0 border-b border-surface-200">
    <div class="mx-auto max-w-3xl flex items-center gap-2 px-4 py-3">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true" routerLink="/" [ariaLabel]="'app.back' | transloco" />
      <h1 class="text-lg font-bold">{{ 'publish.title' | transloco }}</h1>
    </div>
  </header>

  <main class="mx-auto max-w-3xl px-4 py-6 pb-16">
    <form class="publish-form flex flex-col gap-6" [formGroup]="form" (ngSubmit)="publish()">
      <section class="rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-3">
        <label for="activity" class="font-semibold">{{ 'publish.what' | transloco }}</label>
        <p-select
          inputId="activity"
          formControlName="activity"
          [options]="activities()"
          optionLabel="name"
          optionValue="code"
          [placeholder]="'publish.chooseActivity' | transloco"
          class="w-full"
        />
        <label for="title" class="font-semibold mt-2">{{ 'publish.planTitle' | transloco }}</label>
        <input
          pInputText
          id="title"
          formControlName="title"
          [placeholder]="'publish.planTitlePlaceholder' | transloco"
          maxlength="80"
        />
        @if (form.controls.title.invalid && form.controls.title.touched) {
          <small class="field-error text-red-600">{{ 'publish.titleError' | transloco }}</small>
        }
        <label for="description" class="font-semibold mt-2">
          {{ 'publish.details' | transloco }}
          <span class="text-muted-color font-normal">{{ 'publish.optional' | transloco }}</span>
        </label>
        <textarea
          pTextarea
          id="description"
          formControlName="description"
          rows="2"
          maxlength="280"
          [placeholder]="'publish.detailsPlaceholder' | transloco"
        ></textarea>
      </section>

      <section class="rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-3">
        <span class="font-semibold">{{ 'publish.when' | transloco }}</span>
        <p-selectbutton formControlName="start" [options]="startOptions()" optionLabel="label" optionValue="value"
          [allowEmpty]="false" size="small" class="flex-wrap" />
        @if (form.controls.start.value === 'custom') {
          <input pInputText type="time" id="customTime" formControlName="customTime" class="w-40"
            [attr.aria-label]="'publish.startTime' | transloco" />
        }
        <small class="text-muted-color">{{ 'publish.horizon' | transloco: { hours: maxHours } }}</small>
      </section>

      <section class="rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-3">
        <label for="placeName" class="font-semibold">{{ 'publish.where' | transloco }}</label>
        <input pInputText id="placeName" formControlName="placeName"
          [placeholder]="'publish.wherePlaceholder' | transloco" maxlength="100" />
        <div class="flex flex-wrap items-center gap-2">
          <p-button [label]="'publish.here' | transloco" icon="pi pi-map-marker" severity="secondary" size="small"
            [outlined]="true" [loading]="locating()" (onClick)="useMyLocation()" />
          @if (form.controls.latitude.value !== null) {
            <span class="meeting-coordinates text-sm text-muted-color">
              {{ form.controls.latitude.value }}, {{ form.controls.longitude.value }}
            </span>
          } @else if (form.controls.latitude.touched) {
            <small class="field-error text-red-600">{{ 'publish.whereError' | transloco }}</small>
          }
        </div>
      </section>

      <section class="rounded-2xl bg-surface-0 border border-surface-200 p-5 shadow-sm flex flex-col gap-3">
        <label for="spots" class="font-semibold">{{ 'publish.spots' | transloco }}</label>
        <p-inputnumber inputId="spots" formControlName="spots" [showButtons]="true" buttonLayout="horizontal"
          [min]="1" [max]="20" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
        <span class="font-semibold mt-2">{{ 'publish.level' | transloco }}</span>
        <p-selectbutton formControlName="level" [options]="levelOptions()" optionLabel="label" optionValue="value"
          [allowEmpty]="false" size="small" />
      </section>

      @if (error(); as message) {
        <p-message severity="error" class="status-message">{{ message.key | transloco: message.params }}</p-message>
      }

      <p-button type="submit" [label]="'publish.submit' | transloco" icon="pi pi-send" [loading]="publishing()"
        styleClass="w-full" size="large" />
    </form>
  </main>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PublishPlan, { className: "PublishPlan", filePath: "src/app/features/plans/publish-plan.ts", lineNumber: 52 });
})();
export {
  PublishPlan
};
//# debugId=412e94fe-dc49-5e5c-81bf-988cc5a649f1
//# sourceMappingURL=chunk-D7KJLAAH.js.map
