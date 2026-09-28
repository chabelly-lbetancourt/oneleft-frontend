import {
  BaseEditableHolder,
  Check,
  ChevronDown,
  IconField,
  InputIcon,
  InputText,
  NG_VALUE_ACCESSOR,
  Overlay,
  Scroller,
  Search,
  Tooltip
} from "./chunk-B4F4B5X4.js";
import {
  Times
} from "./chunk-A62MHWYD.js";
import {
  AutoFocus,
  BaseComponent,
  Bind,
  BindModule,
  CoreIcon,
  Fluid,
  ICON_TEMPLATE,
  PARENT_INSTANCE,
  Ripple,
  s,
  unblockBodyScroll
} from "./chunk-QAKVLXKK.js";
import {
  BaseStyle,
  Bt,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  FilterService,
  Injectable,
  InjectionToken,
  Input,
  J,
  NgModule,
  NgTemplateOutlet,
  Ot,
  Output,
  R,
  SharedModule,
  TranslationKeys,
  ViewChild,
  ViewEncapsulation,
  b,
  booleanAttribute,
  computed,
  contentChild,
  d,
  effect,
  et,
  forwardRef,
  inject,
  input,
  kt,
  l,
  numberAttribute,
  output,
  p,
  pe,
  setClassMetadata,
  signal,
  viewChild,
  x2 as x,
  z,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
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
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-E45N4KGX.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// node_modules/primeng/fesm2022/primeng-baseinput.mjs
var BaseInput = class _BaseInput extends BaseEditableHolder {
  pcFluid = inject(Fluid, { optional: true, host: true, skipSelf: true });
  /**
   * Spans 100% width of the container when enabled.
   * @defaultValue false
   * @group Props
   */
  fluid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "fluid" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Specifies the input variant of the component.
   * @defaultValue 'outlined'
   * @group Props
   */
  variant = input(
    ...ngDevMode ? [void 0, { debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies the size of the component.
   * @defaultValue undefined
   * @group Props
   */
  size = input(
    ...ngDevMode ? [void 0, { debugName: "size" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies the visible width of the input element in characters.
   * @defaultValue undefined
   * @group Props
   */
  inputSize = input(
    ...ngDevMode ? [void 0, { debugName: "inputSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies the value must match the pattern.
   * @defaultValue undefined
   * @group Props
   */
  pattern = input(
    ...ngDevMode ? [void 0, { debugName: "pattern" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The value must be greater than or equal to the value.
   * @defaultValue undefined
   * @group Props
   */
  min = input(
    ...ngDevMode ? [void 0, { debugName: "min" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The value must be less than or equal to the value.
   * @defaultValue undefined
   * @group Props
   */
  max = input(
    ...ngDevMode ? [void 0, { debugName: "max" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Unless the step is set to the any literal, the value must be min + an integral multiple of the step.
   * @defaultValue undefined
   * @group Props
   */
  step = input(
    ...ngDevMode ? [void 0, { debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The number of characters (code points) must not be less than the value of the attribute, if non-empty.
   * @defaultValue undefined
   * @group Props
   */
  minlength = input(
    ...ngDevMode ? [void 0, { debugName: "minlength" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The number of characters (code points) must not exceed the value of the attribute.
   * @defaultValue undefined
   * @group Props
   */
  maxlength = input(
    ...ngDevMode ? [void 0, { debugName: "maxlength" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $variant = computed(
    () => this.variant() || this.config.inputVariant() || void 0,
    ...ngDevMode ? [{ debugName: "$variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $pattern = computed(
    () => {
      const v = this.pattern();
      return typeof v === "string" && v.length > 0 ? v : void 0;
    },
    ...ngDevMode ? [{ debugName: "$pattern" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275BaseInput_BaseFactory = void 0;
    return function BaseInput_Factory(__ngFactoryType__) {
      return (\u0275BaseInput_BaseFactory || (\u0275BaseInput_BaseFactory = \u0275\u0275getInheritedFactory(_BaseInput)))(__ngFactoryType__ || _BaseInput);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BaseInput,
    inputs: {
      fluid: [1, "fluid"],
      variant: [1, "variant"],
      size: [1, "size"],
      inputSize: [1, "inputSize"],
      pattern: [1, "pattern"],
      min: [1, "min"],
      max: [1, "max"],
      step: [1, "step"],
      minlength: [1, "minlength"],
      maxlength: [1, "maxlength"]
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseInput, [{
    type: Directive,
    args: [{ standalone: true }]
  }], null, { fluid: [{ type: Input, args: [{ isSignal: true, alias: "fluid", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], inputSize: [{ type: Input, args: [{ isSignal: true, alias: "inputSize", required: false }] }], pattern: [{ type: Input, args: [{ isSignal: true, alias: "pattern", required: false }] }], min: [{ type: Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: Input, args: [{ isSignal: true, alias: "max", required: false }] }], step: [{ type: Input, args: [{ isSignal: true, alias: "step", required: false }] }], minlength: [{ type: Input, args: [{ isSignal: true, alias: "minlength", required: false }] }], maxlength: [{ type: Input, args: [{ isSignal: true, alias: "maxlength", required: false }] }] });
})();

// node_modules/@primeicons/core/dist/esm/icons/blank.mjs
var t = { name: "blank", svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["rect", { width: "1", height: "1", fill: "currentColor", fillOpacity: "0", key: "dqty8v" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-blank.mjs
var Blank = class _Blank extends CoreIcon {
  constructor() {
    super();
    this._icon = t;
  }
  static \u0275fac = function Blank_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Blank)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
    function Blank_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Blank_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Blank_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Blank_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Blank_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Blank_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Blank_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Blank_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Blank_For_1_Case_0_Template, 1, 9, ":svg:path")(1, Blank_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, Blank_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, Blank_For_1_Case_3_Template, 1, 7, ":svg:line")(4, Blank_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, Blank_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, Blank_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Blank,
      selectors: [["svg", "data-p-icon", "blank"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function Blank_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, Blank_For_1_Template, 7, 1, null, null, _forTrack0);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Blank, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="blank"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeuix/styles/dist/select/index.mjs
var style = "\n    .p-select {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n        background: dt('select.background');\n        border: 1px solid dt('select.border.color');\n        transition:\n            background dt('select.transition.duration'),\n            color dt('select.transition.duration'),\n            border-color dt('select.transition.duration'),\n            outline-color dt('select.transition.duration'),\n            box-shadow dt('select.transition.duration');\n        border-radius: dt('select.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('select.shadow');\n    }\n\n    .p-select:not(.p-disabled):hover {\n        border-color: dt('select.hover.border.color');\n    }\n\n    .p-select:not(.p-disabled).p-focus {\n        border-color: dt('select.focus.border.color');\n        box-shadow: dt('select.focus.ring.shadow');\n        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');\n        outline-offset: dt('select.focus.ring.offset');\n    }\n\n    .p-select.p-variant-filled {\n        background: dt('select.filled.background');\n    }\n\n    .p-select.p-variant-filled:not(.p-disabled):hover {\n        background: dt('select.filled.hover.background');\n    }\n\n    .p-select.p-variant-filled:not(.p-disabled).p-focus {\n        background: dt('select.filled.focus.background');\n    }\n\n    .p-select.p-invalid {\n        border-color: dt('select.invalid.border.color');\n    }\n\n    .p-select.p-disabled {\n        opacity: 1;\n        background: dt('select.disabled.background');\n    }\n\n    .p-select-clear-icon {\n        align-self: center;\n        color: dt('select.clear.icon.color');\n        inset-inline-end: dt('select.dropdown.width');\n    }\n\n    .p-select-dropdown {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        background: transparent;\n        color: dt('select.dropdown.color');\n        width: dt('select.dropdown.width');\n        border-start-end-radius: dt('select.border.radius');\n        border-end-end-radius: dt('select.border.radius');\n    }\n\n    .p-select-label {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        flex: 1 1 auto;\n        width: 1%;\n        padding: dt('select.padding.y') dt('select.padding.x');\n        text-overflow: ellipsis;\n        cursor: pointer;\n        color: dt('select.color');\n        background: transparent;\n        border: 0 none;\n        outline: 0 none;\n        font-weight: dt('select.font.weight');\n        font-size: dt('select.font.size');\n    }\n\n    .p-select-label.p-placeholder {\n        color: dt('select.placeholder.color');\n    }\n\n    .p-select.p-invalid .p-select-label.p-placeholder {\n        color: dt('select.invalid.placeholder.color');\n    }\n\n    .p-select.p-disabled .p-select-label {\n        color: dt('select.disabled.color');\n    }\n\n    .p-select-label-empty {\n        overflow: hidden;\n        opacity: 0;\n    }\n\n    input.p-select-label {\n        cursor: default;\n    }\n\n    .p-select-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: dt('select.overlay.background');\n        color: dt('select.overlay.color');\n        border: 1px solid dt('select.overlay.border.color');\n        border-radius: dt('select.overlay.border.radius');\n        box-shadow: dt('select.overlay.shadow');\n        min-width: 100%;\n        transform-origin: inherit;\n        will-change: transform;\n    }\n\n    .p-select-header {\n        padding: dt('select.list.header.padding');\n    }\n\n    .p-select-filter {\n        width: 100%;\n    }\n\n    .p-select-list-container {\n        overflow: auto;\n    }\n\n    .p-select-option-group {\n        cursor: auto;\n        margin: 0;\n        padding: dt('select.option.group.padding');\n        background: dt('select.option.group.background');\n        color: dt('select.option.group.color');\n        font-weight: dt('select.option.group.font.weight');\n        font-size: dt('select.option.group.font.size');\n    }\n\n    .p-select-list {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        padding: dt('select.list.padding');\n        gap: dt('select.list.gap');\n        display: flex;\n        flex-direction: column;\n    }\n\n    .p-select-option {\n        cursor: pointer;\n        font-weight: dt('select.option.font.weight');\n        font-size: dt('select.option.font.size');\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        padding: dt('select.option.padding');\n        border: 0 none;\n        color: dt('select.option.color');\n        background: transparent;\n        transition:\n            background dt('list.option.transition.duration'),\n            color dt('list.option.transition.duration'),\n            border-color dt('list.option.transition.duration'),\n            box-shadow dt('list.option.transition.duration'),\n            outline-color dt('list.option.transition.duration');\n        border-radius: dt('list.option.border.radius');\n    }\n\n    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {\n        background: dt('select.option.focus.background');\n        color: dt('select.option.focus.color');\n    }\n\n    .p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {\n        background: dt('select.option.focus.background');\n        color: dt('select.option.focus.color');\n    }\n\n    .p-select-option.p-select-option-selected {\n        background: dt('select.option.selected.background');\n        color: dt('select.option.selected.color');\n        font-weight: dt('select.option.selected.font.weight');\n    }\n\n    .p-select-option.p-select-option-selected.p-focus {\n        background: dt('select.option.selected.focus.background');\n        color: dt('select.option.selected.focus.color');\n    }\n   \n    .p-select-option-blank-icon {\n        flex-shrink: 0;\n    }\n\n    .p-select-option-check-icon {\n        position: relative;\n        flex-shrink: 0;\n        margin-inline-start: dt('select.checkmark.gutter.start');\n        margin-inline-end: dt('select.checkmark.gutter.end');\n        color: dt('select.checkmark.color');\n    }\n\n    .p-select-empty-message {\n        padding: dt('select.empty.message.padding');\n        font-weight: dt('select.option.font.weight');\n        font-size: dt('select.option.font.size');\n    }\n\n    .p-select-fluid {\n        display: flex;\n        width: 100%;\n    }\n\n    .p-select-sm .p-select-label {\n        font-size: dt('select.sm.font.size');\n        padding-block: dt('select.sm.padding.y');\n        padding-inline: dt('select.sm.padding.x');\n    }\n\n    .p-select-sm .p-select-dropdown .p-icon {\n        font-size: dt('select.sm.font.size');\n        width: dt('select.sm.font.size');\n        height: dt('select.sm.font.size');\n    }\n\n    .p-select-lg .p-select-label {\n        font-size: dt('select.lg.font.size');\n        padding-block: dt('select.lg.padding.y');\n        padding-inline: dt('select.lg.padding.x');\n    }\n\n    .p-select-lg .p-select-dropdown .p-icon {\n        font-size: dt('select.lg.font.size');\n        width: dt('select.lg.font.size');\n        height: dt('select.lg.font.size');\n    }\n\n    .p-floatlabel-in .p-select-filter {\n        padding-block-start: dt('select.padding.y');\n        padding-block-end: dt('select.padding.y');\n    }\n";

// node_modules/primeng/fesm2022/primeng-select.mjs
var SELECT_INSTANCE = new InjectionToken("SELECT_INSTANCE");
var SELECT_ITEM_INSTANCE = new InjectionToken("SELECT_ITEM_INSTANCE");
var classes = {
  root: ({ instance }) => [
    "p-select p-component p-inputwrapper",
    {
      "p-disabled": instance.$disabled(),
      "p-invalid": instance.invalid(),
      "p-variant-filled": instance.$variant() === "filled",
      "p-focus": instance.focused(),
      "p-inputwrapper-filled": instance.$filled(),
      "p-inputwrapper-focus": instance.focused() || instance.overlayVisible(),
      "p-select-open": instance.overlayVisible(),
      "p-select-fluid": instance.hasFluid,
      "p-select-sm p-inputfield-sm": instance.size() === "small",
      "p-select-lg p-inputfield-lg": instance.size() === "large"
    }
  ],
  label: ({ instance }) => [
    "p-select-label",
    {
      "p-placeholder": instance.placeholder() && instance.label() === instance.placeholder(),
      "p-select-label-empty": !instance.editable() && !instance.selectedItemTemplate() && (instance.label() === void 0 || instance.label() === null || instance.label() === "p-emptylabel" || instance.label().length === 0)
    }
  ],
  clearIcon: "p-select-clear-icon",
  dropdown: "p-select-dropdown",
  loadingIcon: "p-select-loading-icon",
  dropdownIcon: "p-select-dropdown-icon",
  overlay: "p-select-overlay p-component-overlay p-component",
  header: "p-select-header",
  pcFilter: "p-select-filter",
  listContainer: "p-select-list-container",
  list: "p-select-list",
  optionGroup: "p-select-option-group",
  optionGroupLabel: "p-select-option-group-label",
  option: ({ instance }) => [
    "p-select-option",
    {
      "p-select-option-selected": instance.selected() && !instance.checkmark(),
      "p-disabled": instance.disabled(),
      "p-focus": instance.focused()
    }
  ],
  optionLabel: "p-select-option-label",
  optionCheckIcon: "p-select-option-check-icon",
  optionBlankIcon: "p-select-option-blank-icon",
  emptyMessage: "p-select-empty-message"
};
var SelectStyle = class _SelectStyle extends BaseStyle {
  name = "select";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectStyle_BaseFactory = void 0;
    return function SelectStyle_Factory(__ngFactoryType__) {
      return (\u0275SelectStyle_BaseFactory || (\u0275SelectStyle_BaseFactory = \u0275\u0275getInheritedFactory(_SelectStyle)))(__ngFactoryType__ || _SelectStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SelectStyle,
    factory: _SelectStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectStyle, [{
    type: Injectable
  }], null, null);
})();
var SelectClasses;
(function(SelectClasses2) {
  SelectClasses2["root"] = "p-select";
  SelectClasses2["label"] = "p-select-label";
  SelectClasses2["clearIcon"] = "p-select-clear-icon";
  SelectClasses2["dropdown"] = "p-select-dropdown";
  SelectClasses2["loadingIcon"] = "p-select-loading-icon";
  SelectClasses2["dropdownIcon"] = "p-select-dropdown-icon";
  SelectClasses2["overlay"] = "p-select-overlay";
  SelectClasses2["header"] = "p-select-header";
  SelectClasses2["pcFilter"] = "p-select-filter";
  SelectClasses2["listContainer"] = "p-select-list-container";
  SelectClasses2["list"] = "p-select-list";
  SelectClasses2["optionGroup"] = "p-select-option-group";
  SelectClasses2["optionGroupLabel"] = "p-select-option-group-label";
  SelectClasses2["option"] = "p-select-option";
  SelectClasses2["optionLabel"] = "p-select-option-label";
  SelectClasses2["optionCheckIcon"] = "p-select-option-check-icon";
  SelectClasses2["optionBlankIcon"] = "p-select-option-blank-icon";
  SelectClasses2["emptyMessage"] = "p-select-empty-message";
})(SelectClasses || (SelectClasses = {}));
var SelectItem = class _SelectItem extends BaseComponent {
  hostName = "select";
  $pcSelectItem = inject(SELECT_ITEM_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  $pcSelect = inject(SELECT_INSTANCE, { optional: true, skipSelf: true });
  id = input(
    ...ngDevMode ? [void 0, { debugName: "id" }] : (
      /* istanbul ignore next */
      []
    )
  );
  option = input(
    ...ngDevMode ? [void 0, { debugName: "option" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selected = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "selected" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  focused = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "focused" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  label = input(
    ...ngDevMode ? [void 0, { debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  disabled = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "disabled" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  visible = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "visible" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  itemSize = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "itemSize" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  ariaPosInset = input(
    ...ngDevMode ? [void 0, { debugName: "ariaPosInset" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ariaSetSize = input(
    ...ngDevMode ? [void 0, { debugName: "ariaSetSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  template = input(
    ...ngDevMode ? [void 0, { debugName: "template" }] : (
      /* istanbul ignore next */
      []
    )
  );
  checkmark = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "checkmark" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  index = input(
    ...ngDevMode ? [void 0, { debugName: "index" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scrollerOptions = input(
    ...ngDevMode ? [void 0, { debugName: "scrollerOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  templateContext = computed(
    () => ({ $implicit: this.option() }),
    ...ngDevMode ? [{ debugName: "templateContext" }] : (
      /* istanbul ignore next */
      []
    )
  );
  itemSizeStyle = computed(
    () => ({ height: this.scrollerOptions()?.itemSize + "px" }),
    ...ngDevMode ? [{ debugName: "itemSizeStyle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onClick = output();
  onMouseEnter = output();
  _componentStyle = inject(SelectStyle);
  onOptionClick(event) {
    this.onClick.emit(event);
  }
  onOptionMouseEnter(event) {
    this.onMouseEnter.emit(event);
  }
  getPTOptions() {
    return this.$pcSelect?.getPTItemOptions?.(this.option(), this.scrollerOptions(), this.index() ?? 0, "option") ?? this.$pcSelect?.ptm("option", {
      context: {
        option: this.option(),
        selected: this.selected(),
        focused: this.focused(),
        disabled: this.disabled()
      }
    });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectItem_BaseFactory = void 0;
    return function SelectItem_Factory(__ngFactoryType__) {
      return (\u0275SelectItem_BaseFactory || (\u0275SelectItem_BaseFactory = \u0275\u0275getInheritedFactory(_SelectItem)))(__ngFactoryType__ || _SelectItem);
    };
  })();
  static \u0275cmp = (function() {
    function SelectItem_Conditional_1_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 5);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("optionCheckIcon"));
        \u0275\u0275property("pBind", ctx_r0.$pcSelect?.ptm("optionCheckIcon"));
      }
    }
    function SelectItem_Conditional_1_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 6);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("optionBlankIcon"));
        \u0275\u0275property("pBind", ctx_r0.$pcSelect?.ptm("optionBlankIcon"));
      }
    }
    function SelectItem_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, SelectItem_Conditional_1_Conditional_0_Template, 1, 3, ":svg:svg", 3)(1, SelectItem_Conditional_1_Conditional_1_Template, 1, 3, ":svg:svg", 4);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(ctx_r0.selected() ? 0 : 1);
      }
    }
    function SelectItem_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 1);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("pBind", ctx_r0.$pcSelect?.ptm("optionLabel"));
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r0.label() ?? "empty");
      }
    }
    function SelectItem_ng_container_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _SelectItem,
      selectors: [["p-select-item"]],
      inputs: {
        id: [1, "id"],
        option: [1, "option"],
        selected: [1, "selected"],
        focused: [1, "focused"],
        label: [1, "label"],
        disabled: [1, "disabled"],
        visible: [1, "visible"],
        itemSize: [1, "itemSize"],
        ariaPosInset: [1, "ariaPosInset"],
        ariaSetSize: [1, "ariaSetSize"],
        template: [1, "template"],
        checkmark: [1, "checkmark"],
        index: [1, "index"],
        scrollerOptions: [1, "scrollerOptions"]
      },
      outputs: {
        onClick: "onClick",
        onMouseEnter: "onMouseEnter"
      },
      features: [\u0275\u0275ProvidersFeature([SelectStyle, { provide: PARENT_INSTANCE, useExisting: _SelectItem }]), \u0275\u0275InheritDefinitionFeature],
      decls: 4,
      vars: 18,
      consts: [["role", "option", "pRipple", "", 3, "click", "mouseenter", "id", "pBind"], [3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["data-p-icon", "check", 3, "class", "pBind"], ["data-p-icon", "blank", 3, "class", "pBind"], ["data-p-icon", "check", 3, "pBind"], ["data-p-icon", "blank", 3, "pBind"]],
      template: function SelectItem_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "li", 0);
          \u0275\u0275listener("click", function SelectItem_Template_li_click_0_listener($event) {
            return ctx.onOptionClick($event);
          })("mouseenter", function SelectItem_Template_li_mouseenter_0_listener($event) {
            return ctx.onOptionMouseEnter($event);
          });
          \u0275\u0275conditionalCreate(1, SelectItem_Conditional_1_Template, 2, 1);
          \u0275\u0275conditionalCreate(2, SelectItem_Conditional_2_Template, 2, 2, "span", 1);
          \u0275\u0275template(3, SelectItem_ng_container_3_Template, 1, 0, "ng-container", 2);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275styleMap(ctx.itemSizeStyle());
          \u0275\u0275classMap(ctx.cx("option"));
          \u0275\u0275property("id", ctx.id())("pBind", ctx.getPTOptions());
          \u0275\u0275attribute("aria-label", ctx.label())("aria-setsize", ctx.ariaSetSize())("aria-posinset", ctx.ariaPosInset())("aria-selected", ctx.selected())("data-p-focused", ctx.focused())("data-p-highlight", ctx.selected())("data-p-selected", ctx.selected())("data-p-disabled", ctx.disabled());
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.checkmark() ? 1 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx.template() ? 2 : -1);
          \u0275\u0275advance();
          \u0275\u0275property("ngTemplateOutlet", ctx.template())("ngTemplateOutletContext", ctx.templateContext());
        }
      },
      dependencies: [NgTemplateOutlet, SharedModule, Ripple, Check, Blank, BindModule, Bind],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectItem, [{
    type: Component,
    args: [{
      selector: "p-select-item",
      standalone: true,
      imports: [NgTemplateOutlet, SharedModule, Ripple, Check, Blank, BindModule],
      template: `
        <li
            [id]="id()"
            [pBind]="getPTOptions()"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
            role="option"
            pRipple
            [attr.aria-label]="label()"
            [attr.aria-setsize]="ariaSetSize()"
            [attr.aria-posinset]="ariaPosInset()"
            [attr.aria-selected]="selected()"
            [attr.data-p-focused]="focused()"
            [attr.data-p-highlight]="selected()"
            [attr.data-p-selected]="selected()"
            [attr.data-p-disabled]="disabled()"
            [style]="itemSizeStyle()"
            [class]="cx('option')"
        >
            @if (checkmark()) {
                @if (selected()) {
                    <svg data-p-icon="check" [class]="cx('optionCheckIcon')" [pBind]="$pcSelect?.ptm('optionCheckIcon')" />
                } @else {
                    <svg data-p-icon="blank" [class]="cx('optionBlankIcon')" [pBind]="$pcSelect?.ptm('optionBlankIcon')" />
                }
            }
            @if (!template()) {
                <span [pBind]="$pcSelect?.ptm('optionLabel')">{{ label() ?? 'empty' }}</span>
            }
            <ng-container *ngTemplateOutlet="template(); context: templateContext()"></ng-container>
        </li>
    `,
      providers: [SelectStyle, { provide: PARENT_INSTANCE, useExisting: SelectItem }]
    }]
  }], null, { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }], option: [{ type: Input, args: [{ isSignal: true, alias: "option", required: false }] }], selected: [{ type: Input, args: [{ isSignal: true, alias: "selected", required: false }] }], focused: [{ type: Input, args: [{ isSignal: true, alias: "focused", required: false }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], visible: [{ type: Input, args: [{ isSignal: true, alias: "visible", required: false }] }], itemSize: [{ type: Input, args: [{ isSignal: true, alias: "itemSize", required: false }] }], ariaPosInset: [{ type: Input, args: [{ isSignal: true, alias: "ariaPosInset", required: false }] }], ariaSetSize: [{ type: Input, args: [{ isSignal: true, alias: "ariaSetSize", required: false }] }], template: [{ type: Input, args: [{ isSignal: true, alias: "template", required: false }] }], checkmark: [{ type: Input, args: [{ isSignal: true, alias: "checkmark", required: false }] }], index: [{ type: Input, args: [{ isSignal: true, alias: "index", required: false }] }], scrollerOptions: [{ type: Input, args: [{ isSignal: true, alias: "scrollerOptions", required: false }] }], onClick: [{ type: Output, args: ["onClick"] }], onMouseEnter: [{ type: Output, args: ["onMouseEnter"] }] });
})();
var SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Select),
  multi: true
};
var Select = class _Select extends BaseInput {
  componentName = "Select";
  bindDirectiveInstance = inject(Bind, { self: true });
  filterService = inject(FilterService);
  /**
   * Unique identifier of the component
   * @group Props
   */
  id = input(
    ...ngDevMode ? [void 0, { debugName: "id" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _internalId = s("pn_id_");
  $id = computed(
    () => this.id() || this._internalId,
    ...ngDevMode ? [{ debugName: "$id" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  scrollHeight = input(
    "200px",
    ...ngDevMode ? [{ debugName: "scrollHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When specified, displays an input field to filter the items on keyup.
   * @group Props
   */
  filter = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "filter" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Inline style of the overlay panel element.
   * @group Props
   */
  panelStyle = input(
    ...ngDevMode ? [void 0, { debugName: "panelStyle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the overlay panel element.
   * @group Props
   */
  panelStyleClass = input(
    ...ngDevMode ? [void 0, { debugName: "panelStyleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "readonly" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When present, custom value instead of predefined options can be entered using the editable input field.
   * @group Props
   */
  editable = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "editable" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = input(0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "tabindex" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Default text to display when no option is selected.
   * @group Props
   */
  placeholder = input(
    ...ngDevMode ? [void 0, { debugName: "placeholder" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Icon to display in loading state.
   * @group Props
   */
  loadingIcon = input(
    ...ngDevMode ? [void 0, { debugName: "loadingIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Placeholder text to show when filter input is empty.
   * @group Props
   */
  filterPlaceholder = input(
    ...ngDevMode ? [void 0, { debugName: "filterPlaceholder" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale = input(
    ...ngDevMode ? [void 0, { debugName: "filterLocale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Identifier of the accessible input element.
   * @group Props
   */
  inputId = input(
    ...ngDevMode ? [void 0, { debugName: "inputId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * A property to uniquely identify a value in options.
   * @group Props
   */
  dataKey = input(
    ...ngDevMode ? [void 0, { debugName: "dataKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
   * @group Props
   */
  filterBy = input(
    ...ngDevMode ? [void 0, { debugName: "filterBy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  filterFields = input(
    ...ngDevMode ? [void 0, { debugName: "filterFields" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autofocus" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Clears the filter value when hiding the select.
   * @group Props
   */
  resetFilterOnHide = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "resetFilterOnHide" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether the selected option will be shown with a check mark.
   * @group Props
   */
  checkmark = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "checkmark" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Icon class of the select icon.
   * @group Props
   */
  dropdownIcon = input(
    ...ngDevMode ? [void 0, { debugName: "dropdownIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether the select is in loading state.
   * @group Props
   */
  loading = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "loading" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Name of the label field of an option.
   * @group Props
   */
  optionLabel = input(
    ...ngDevMode ? [void 0, { debugName: "optionLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Name of the value field of an option.
   * @group Props
   */
  optionValue = input(
    ...ngDevMode ? [void 0, { debugName: "optionValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Name of the disabled field of an option or function to determine disabled state.
   * @group Props
   */
  optionDisabled = input(
    ...ngDevMode ? [void 0, { debugName: "optionDisabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Name of the label field of an option group.
   * @group Props
   */
  optionGroupLabel = input(
    "label",
    ...ngDevMode ? [{ debugName: "optionGroupLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Name of the options field of an option group.
   * @group Props
   */
  optionGroupChildren = input(
    "items",
    ...ngDevMode ? [{ debugName: "optionGroupChildren" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether to display options as grouped when nested options are provided.
   * @group Props
   */
  group = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "group" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "showClear" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyFilterMessage = input(
    "",
    ...ngDevMode ? [{ debugName: "emptyFilterMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage = input(
    "",
    ...ngDevMode ? [{ debugName: "emptyMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "lazy" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether the data should be loaded on demand during scroll.
   * @group Props
   */
  virtualScroll = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "virtualScroll" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Height of an item in the list for VirtualScrolling.
   * @group Props
   */
  virtualScrollItemSize = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "virtualScrollItemSize" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  virtualScrollOptions = input(
    ...ngDevMode ? [void 0, { debugName: "virtualScrollOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
   * @group Props
   */
  overlayOptions = input(
    ...ngDevMode ? [void 0, { debugName: "overlayOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines a string that labels the filter input.
   * @group Props
   */
  ariaFilterLabel = input(
    ...ngDevMode ? [void 0, { debugName: "ariaFilterLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to define a aria label attribute the current element.
   * @group Props
   */
  ariaLabel = input(
    ...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy = input(
    ...ngDevMode ? [void 0, { debugName: "ariaLabelledBy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines how the items are filtered.
   * @group Props
   */
  filterMatchMode = input(
    "contains",
    ...ngDevMode ? [{ debugName: "filterMatchMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Advisory information to display in a tooltip on hover.
   * @group Props
   */
  tooltip = input(
    "",
    ...ngDevMode ? [{ debugName: "tooltip" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition = input(
    "right",
    ...ngDevMode ? [{ debugName: "tooltipPosition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Type of CSS position.
   * @group Props
   */
  tooltipPositionStyle = input(
    "absolute",
    ...ngDevMode ? [{ debugName: "tooltipPositionStyle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass = input(
    ...ngDevMode ? [void 0, { debugName: "tooltipStyleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  focusOnHover = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "focusOnHover" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Determines if the option will be selected on focus.
   * @group Props
   */
  selectOnFocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "selectOnFocus" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When enabled, allows multiple items to be selected.
   * @group Props
   */
  multiple = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "multiple" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether to focus on the first visible or selected element when the overlay panel is shown.
   * @group Props
   */
  autoOptionFocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autoOptionFocus" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Applies focus to the filter element when the overlay is shown.
   * @group Props
   */
  autofocusFilter = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autofocusFilter" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When specified, filter displays with this value.
   * @group Props
   */
  filterValue = input(
    ...ngDevMode ? [void 0, { debugName: "filterValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * An array of objects to display as the available options.
   * @group Props
   */
  options = input(
    ...ngDevMode ? [void 0, { debugName: "options" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(
    void 0,
    ...ngDevMode ? [{ debugName: "appendTo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The motion options.
   * @group Props
   */
  motionOptions = input(
    void 0,
    ...ngDevMode ? [{ debugName: "motionOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Callback to invoke when value of select changes.
   * @param {SelectChangeEvent} event - custom change event.
   * @group Emits
   */
  onChange = output();
  /**
   * Callback to invoke when data is filtered.
   * @param {SelectFilterEvent} event - custom filter event.
   * @group Emits
   */
  onFilter = output();
  /**
   * Callback to invoke when select gets focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = output();
  /**
   * Callback to invoke when select loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = output();
  /**
   * Callback to invoke when component is clicked.
   * @param {MouseEvent} event - Mouse event.
   * @group Emits
   */
  onClick = output();
  /**
   * Callback to invoke when select overlay gets visible.
   * @param {MotionEvent} event - Motion event. The AnimationEvent typing is deprecated and kept for backward compatibility; only the MotionEvent properties exist at runtime.
   * @group Emits
   */
  onShow = output();
  /**
   * Callback to invoke when select overlay gets hidden.
   * @param {MotionEvent} event - Motion event. The AnimationEvent typing is deprecated and kept for backward compatibility; only the MotionEvent properties exist at runtime.
   * @group Emits
   */
  onHide = output();
  /**
   * Callback to invoke when select clears the value.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onClear = output();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {SelectLazyLoadEvent} event - Lazy load event.
   * @group Emits
   */
  onLazyLoad = output();
  _componentStyle = inject(SelectStyle);
  filterViewChild = viewChild(
    "filter",
    ...ngDevMode ? [{ debugName: "filterViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusInputViewChild = viewChild(
    "focusInput",
    ...ngDevMode ? [{ debugName: "focusInputViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editableInputViewChild = viewChild(
    "editableInput",
    ...ngDevMode ? [{ debugName: "editableInputViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  itemsViewChild = viewChild(
    "items",
    ...ngDevMode ? [{ debugName: "itemsViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  scroller = viewChild(
    "scroller",
    ...ngDevMode ? [{ debugName: "scroller" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overlayViewChild = viewChild(
    "overlay",
    ...ngDevMode ? [{ debugName: "overlayViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  firstHiddenFocusableElementOnOverlay = viewChild(
    "firstHiddenFocusableEl",
    ...ngDevMode ? [{ debugName: "firstHiddenFocusableElementOnOverlay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  lastHiddenFocusableElementOnOverlay = viewChild(
    "lastHiddenFocusableEl",
    ...ngDevMode ? [{ debugName: "lastHiddenFocusableElementOnOverlay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  itemsWrapper;
  $appendTo = computed(
    () => this.appendTo() || this.config.overlayAppendTo(),
    ...ngDevMode ? [{ debugName: "$appendTo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Custom item template.
   * @group Templates
   */
  itemTemplate = contentChild("item", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "itemTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom group template.
   * @group Templates
   */
  groupTemplate = contentChild("group", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "groupTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom loader template.
   * @group Templates
   */
  loaderTemplate = contentChild("loader", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "loaderTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom selected item template.
   * @group Templates
   */
  selectedItemTemplate = contentChild("selectedItem", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "selectedItemTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom header template.
   * @param {SelectHeaderTemplateContext} context - header context.
   * @group Templates
   */
  headerTemplate = contentChild("header", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "headerTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom filter template.
   * @group Templates
   */
  filterTemplate = contentChild("filter", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "filterTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom footer template.
   * @group Templates
   */
  footerTemplate = contentChild("footer", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "footerTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom empty filter template.
   * @group Templates
   */
  emptyFilterTemplate = contentChild("emptyfilter", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "emptyFilterTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom empty template.
   * @group Templates
   */
  emptyTemplate = contentChild("empty", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "emptyTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom dropdown icon template.
   * @group Templates
   */
  dropdownIconTemplate = contentChild("dropdownicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "dropdownIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom loading icon template.
   * @group Templates
   */
  loadingIconTemplate = contentChild("loadingicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "loadingIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom clear icon template.
   * @group Templates
   */
  clearIconTemplate = contentChild("clearicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "clearIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom filter icon template.
   * @group Templates
   */
  filterIconTemplate = contentChild("filtericon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "filterIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom on icon template.
   * @group Templates
   */
  onIconTemplate = contentChild("onicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "onIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom off icon template.
   * @group Templates
   */
  offIconTemplate = contentChild("officon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "offIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom cancel icon template.
   * @group Templates
   */
  cancelIconTemplate = contentChild("cancelicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "cancelIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  filterOptions;
  _filterValue = signal(
    null,
    ...ngDevMode ? [{ debugName: "_filterValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _placeholder = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "_placeholder" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _options = signal(
    null,
    ...ngDevMode ? [{ debugName: "_options" }] : (
      /* istanbul ignore next */
      []
    )
  );
  value;
  hover;
  focused = signal(
    false,
    ...ngDevMode ? [{ debugName: "focused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overlayVisible = signal(
    false,
    ...ngDevMode ? [{ debugName: "overlayVisible" }] : (
      /* istanbul ignore next */
      []
    )
  );
  optionsChanged;
  panel;
  dimensionsUpdated;
  hoveredItem;
  selectedOptionUpdated;
  searchValue;
  searchIndex;
  searchTimeout;
  previousSearchChar;
  currentSearchChar;
  preventModelTouched;
  focusedOptionIndex = signal(
    -1,
    ...ngDevMode ? [{ debugName: "focusedOptionIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labelId;
  listId;
  clicked = signal(
    false,
    ...ngDevMode ? [{ debugName: "clicked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  emptyMessageLabel = computed(
    () => this.emptyMessage() || this.translate(TranslationKeys.EMPTY_MESSAGE),
    ...ngDevMode ? [{ debugName: "emptyMessageLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  emptyFilterMessageLabel = computed(
    () => this.emptyFilterMessage() || this.translate(TranslationKeys.EMPTY_FILTER_MESSAGE),
    ...ngDevMode ? [{ debugName: "emptyFilterMessageLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isVisibleClearIcon = computed(
    () => {
      if (!this.showClear() || this.$disabled())
        return false;
      const value = this.modelValue();
      if (this.multiple()) {
        return Array.isArray(value) && value.length > 0;
      }
      return value != null && this.hasSelectedOption();
    },
    ...ngDevMode ? [{ debugName: "isVisibleClearIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get listLabel() {
    return this.translate(TranslationKeys.ARIA, "listLabel");
  }
  focusedOptionId = computed(
    () => this.focusedOptionIndex() !== -1 ? `${this.$id()}_${this.focusedOptionIndex()}` : null,
    ...ngDevMode ? [{ debugName: "focusedOptionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleOptions = computed(
    () => {
      const options = this.getAllVisibleAndNonVisibleOptions();
      if (this._filterValue()) {
        const _filterBy = this.filterBy() || this.optionLabel();
        const filteredOptions = !_filterBy && !this.filterFields() && !this.optionValue() ? this._options()?.filter((option) => {
          if (option.label) {
            return option.label.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim()) !== -1;
          }
          return option.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim()) !== -1;
        }) : this.filterService.filter(options, this.searchFields(), this._filterValue().trim(), this.filterMatchMode(), this.filterLocale());
        if (this.group()) {
          const optionGroups = this._options() || [];
          const filtered = [];
          optionGroups.forEach((group) => {
            const groupChildren = this.getOptionGroupChildren(group);
            const filteredItems = groupChildren.filter((item) => filteredOptions?.includes(item));
            if (filteredItems.length > 0)
              filtered.push(__spreadProps(__spreadValues({}, group), {
                [typeof this.optionGroupChildren() === "string" ? this.optionGroupChildren() : "items"]: [...filteredItems]
              }));
          });
          return this.flatOptions(filtered);
        }
        return filteredOptions;
      }
      return options;
    },
    ...ngDevMode ? [{ debugName: "visibleOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  label = computed(
    () => {
      if (this.multiple()) {
        const currentValue = this.modelValue();
        if (!Array.isArray(currentValue) || currentValue.length === 0) {
          return this.placeholder() || "p-emptylabel";
        }
        const options2 = this.getAllVisibleAndNonVisibleOptions();
        const labels = currentValue.map((val) => {
          const opt = options2.find((o) => !this.isOptionGroup(o) && b(val, this.getOptionValue(o), this.equalityKey()));
          return opt ? this.getOptionLabel(opt) : String(val);
        }).filter(Boolean);
        return labels.join(", ");
      }
      const options = this.getAllVisibleAndNonVisibleOptions();
      const selectedOptionIndex = options.findIndex((option) => {
        const isEqual = this.isOptionValueEqualsModelValue(option);
        return isEqual;
      });
      if (selectedOptionIndex !== -1) {
        const selectedOption = options[selectedOptionIndex];
        return this.getOptionLabel(selectedOption);
      }
      return this.placeholder() || "p-emptylabel";
    },
    ...ngDevMode ? [{ debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $ariaLabel = computed(
    () => this.ariaLabel() || (this.label() === "p-emptylabel" ? void 0 : this.label()),
    ...ngDevMode ? [{ debugName: "$ariaLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $ariaMultiselectable = computed(
    () => this.multiple() || void 0,
    ...ngDevMode ? [{ debugName: "$ariaMultiselectable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $placeholder = computed(
    () => {
      const modelVal = this.modelValue();
      return modelVal === void 0 || modelVal === null ? this.placeholder() || this._placeholder() : void 0;
    },
    ...ngDevMode ? [{ debugName: "$placeholder" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $required = computed(
    () => this.required() ? "" : void 0,
    ...ngDevMode ? [{ debugName: "$required" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $readonly = computed(
    () => this.readonly() ? "" : void 0,
    ...ngDevMode ? [{ debugName: "$readonly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $disabledAttr = computed(
    () => this.$disabled() ? "" : void 0,
    ...ngDevMode ? [{ debugName: "$disabledAttr" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $tabindex = computed(
    () => !this.$disabled() ? this.tabindex() : -1,
    ...ngDevMode ? [{ debugName: "$tabindex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filterInputValue = computed(
    () => this._filterValue() || "",
    ...ngDevMode ? [{ debugName: "filterInputValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get $ariaActivedescendant() {
    return this.focused() ? this.focusedOptionId() : void 0;
  }
  get $ariaExpanded() {
    return this.overlayVisible();
  }
  $ariaControls = computed(
    () => this.overlayVisible() ? this.$id() + "_list" : null,
    ...ngDevMode ? [{ debugName: "$ariaControls" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showEmptyFilterMessage = computed(
    () => this._filterValue() && this.isEmpty(),
    ...ngDevMode ? [{ debugName: "showEmptyFilterMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showEmptyMessage = computed(
    () => !this._filterValue() && this.isEmpty(),
    ...ngDevMode ? [{ debugName: "showEmptyMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasEmptyTemplate = computed(
    () => this.emptyFilterTemplate() || this.emptyTemplate(),
    ...ngDevMode ? [{ debugName: "hasEmptyTemplate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $ariaOwns = computed(
    () => this.$id() + "_list",
    ...ngDevMode ? [{ debugName: "$ariaOwns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get selectedItemContext() {
    return { $implicit: this.selectedOption() };
  }
  get clearIconContext() {
    return { class: this.cx("clearIcon") ?? "" };
  }
  get dropdownIconContext() {
    return { class: this.cx("dropdownIcon") ?? "" };
  }
  get filterTemplateContext() {
    return { options: this.filterOptions ?? {} };
  }
  get defaultBuildInItemsContext() {
    return { $implicit: this.visibleOptions(), options: {} };
  }
  selectedOption = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedOption" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    super();
    effect(() => {
      const modelValue = this.modelValue();
      const visibleOptions = this.visibleOptions();
      if (visibleOptions && l(visibleOptions)) {
        const selectedOptionIndex = this.findSelectedOptionIndex();
        if (selectedOptionIndex !== -1 || modelValue === void 0 || typeof modelValue === "string" && modelValue.length === 0 || this.isModelValueNotSet() || this.editable()) {
          this.selectedOption.set(visibleOptions[selectedOptionIndex]);
        } else {
          const disabledSelectedIndex = visibleOptions.findIndex((option) => this.isSelected(option));
          if (disabledSelectedIndex !== -1) {
            this.selectedOption.set(visibleOptions[disabledSelectedIndex]);
          }
        }
      }
      if (p(visibleOptions) && (modelValue === void 0 || this.isModelValueNotSet()) && l(this.selectedOption())) {
        this.selectedOption.set(null);
      }
      if (modelValue !== void 0 && this.editable()) {
        this.updateEditableLabel();
      }
    });
    effect(() => {
      const filterVal = this.filterValue();
      if (filterVal !== void 0) {
        this._filterValue.set(filterVal);
      }
    });
    effect(() => {
      const opts = this.options();
      if (!R(opts, this._options())) {
        this._options.set(opts ?? null);
        this.optionsChanged = true;
      }
    });
  }
  isModelValueNotSet() {
    return this.modelValue() === null && !this.isOptionValueEqualsModelValue(this.selectedOption());
  }
  getAllVisibleAndNonVisibleOptions() {
    return this.group() ? this.flatOptions(this._options()) : this._options() || [];
  }
  virtualScrollerDisabled = computed(
    () => !this.virtualScroll(),
    ...ngDevMode ? [{ debugName: "virtualScrollerDisabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  getBuildInItemsContext(items, scrollerOptions) {
    return { $implicit: items, options: scrollerOptions };
  }
  getLoaderContext(scrollerOptions) {
    return { options: scrollerOptions };
  }
  getItemSizeStyle(scrollerOptions) {
    return { height: scrollerOptions.itemSize + "px" };
  }
  getGroupContext(optionGroup) {
    return { $implicit: optionGroup };
  }
  onInit() {
    this.autoUpdateModel();
    if (this.filterBy()) {
      this.filterOptions = {
        filter: (value) => this.onFilterInputChange(value),
        reset: () => this.resetFilter()
      };
    }
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
    if (this.optionsChanged && this.overlayVisible()) {
      this.optionsChanged = false;
      setTimeout(() => {
        if (this.overlayViewChild()) {
          this.overlayViewChild()?.alignOverlay();
        }
      }, 1);
    }
    if (this.selectedOptionUpdated && this.itemsWrapper) {
      if (!this.multiple()) {
        let selectedItem = et(this.overlayViewChild()?.overlayViewChild()?.nativeElement, 'li[data-p-selected="true"]');
        if (selectedItem) {
          pe(this.itemsWrapper, selectedItem);
        }
      }
      this.selectedOptionUpdated = false;
    }
  }
  flatOptions(options) {
    return (options || []).reduce((result, option, index) => {
      result.push({ optionGroup: option, group: true, index });
      const optionGroupChildren = this.getOptionGroupChildren(option);
      if (optionGroupChildren) {
        optionGroupChildren.forEach((o) => result.push(o));
      }
      return result;
    }, []);
  }
  autoUpdateModel() {
    if (this.selectOnFocus() && this.autoOptionFocus() && !this.hasSelectedOption()) {
      this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
      this.onOptionSelect(null, this.visibleOptions()[this.focusedOptionIndex()], false);
    }
  }
  onOptionSelect(event, option, isHide = true, preventChange = false) {
    if (this.isOptionDisabled(option)) {
      return;
    }
    if (this.multiple()) {
      this.onOptionSelectMultiple(event, option, preventChange);
      return;
    }
    if (!this.isSelected(option)) {
      const value = this.getOptionValue(option);
      this.updateModel(value, event);
      this.focusedOptionIndex.set(this.findSelectedOptionIndex());
      if (preventChange === false) {
        this.onChange.emit({ originalEvent: event, value });
      }
    }
    if (isHide) {
      this.hide(true);
    }
  }
  onOptionSelectMultiple(event, option, preventChange = false) {
    const value = this.getOptionValue(option);
    const currentValue = this.modelValue() ?? [];
    const newValue = this.isSelected(option) ? currentValue.filter((v) => !b(v, value, this.equalityKey())) : [...currentValue, value];
    this.updateModel(newValue, event);
    if (preventChange === false) {
      this.onChange.emit({ originalEvent: event, value: newValue });
    }
  }
  onOptionMouseEnter(event, index) {
    if (this.focusOnHover()) {
      this.changeFocusedOptionIndex(event, index);
    }
  }
  updateModel(value, _event) {
    this.value = value;
    this.onModelChange(value);
    this.writeModelValue(value);
    this.selectedOptionUpdated = true;
  }
  allowModelChange() {
    return !!this.modelValue() && !this.placeholder() && (this.modelValue() === void 0 || this.modelValue() === null) && !this.editable() && this._options() && this._options().length;
  }
  isSelected(option) {
    if (this.multiple()) {
      const currentValue = this.modelValue();
      if (!Array.isArray(currentValue))
        return false;
      const optionValue = this.getOptionValue(option);
      return currentValue.some((v) => b(v, optionValue, this.equalityKey()));
    }
    return this.isOptionValueEqualsModelValue(option);
  }
  isOptionValueEqualsModelValue(option) {
    return option !== void 0 && option !== null && !this.isOptionGroup(option) && b(this.modelValue(), this.getOptionValue(option), this.equalityKey());
  }
  onAfterViewInit() {
    if (this.editable()) {
      this.updateEditableLabel();
    }
    this.updatePlaceHolderForFloatingLabel();
  }
  updatePlaceHolderForFloatingLabel() {
    const parentElement = this.el.nativeElement.parentElement;
    const isInFloatingLabel = parentElement?.classList.contains("p-float-label");
    if (parentElement && isInFloatingLabel && !this.selectedOption()) {
      const label = parentElement.querySelector("label");
      if (label) {
        this._placeholder.set(label.textContent);
      }
    }
  }
  updateEditableLabel() {
    if (this.editableInputViewChild()) {
      this.editableInputViewChild().nativeElement.value = this.getOptionLabel(this.selectedOption()) || this.modelValue() || "";
    }
  }
  clearEditableLabel() {
    if (this.editableInputViewChild()) {
      this.editableInputViewChild().nativeElement.value = "";
    }
  }
  getOptionIndex(index, scrollerOptions) {
    return this.virtualScrollerDisabled() ? index : scrollerOptions && scrollerOptions.getItemOptions(index)["index"];
  }
  getOptionLabel(option) {
    return this.optionLabel() !== void 0 && this.optionLabel() !== null ? d(option, this.optionLabel()) : option && option.label !== void 0 ? option.label : option;
  }
  getOptionValue(option) {
    return this.optionValue() && this.optionValue() !== null ? d(option, this.optionValue()) : !this.optionLabel() && option && option.value !== void 0 ? option.value : option;
  }
  getPTItemOptions(option, itemOptions, index, key) {
    return this.ptm(key, {
      context: {
        option,
        index,
        selected: this.isSelected(option),
        focused: this.focusedOptionIndex() === this.getOptionIndex(index, itemOptions),
        disabled: this.isOptionDisabled(option)
      }
    });
  }
  isSelectedOptionEmpty() {
    if (this.multiple()) {
      const currentValue = this.modelValue();
      return !Array.isArray(currentValue) || currentValue.length === 0;
    }
    return p(this.selectedOption());
  }
  isOptionDisabled(option) {
    return this.optionDisabled() ? d(option, this.optionDisabled()) : option && option.disabled !== void 0 ? option.disabled : false;
  }
  getOptionGroupLabel(optionGroup) {
    return this.optionGroupLabel() !== void 0 && this.optionGroupLabel() !== null ? d(optionGroup, this.optionGroupLabel()) : optionGroup && optionGroup.label !== void 0 ? optionGroup.label : optionGroup;
  }
  getOptionGroupChildren(optionGroup) {
    return this.optionGroupChildren() !== void 0 && this.optionGroupChildren() !== null ? d(optionGroup, this.optionGroupChildren()) : optionGroup.items;
  }
  getAriaPosInset(index) {
    return (this.optionGroupLabel() ? index - this.visibleOptions().slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
  }
  get ariaSetSize() {
    return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
  }
  /**
   * Callback to invoke on filter reset.
   * @group Method
   */
  resetFilter() {
    this._filterValue.set(null);
    if (this.filterViewChild() && this.filterViewChild().nativeElement) {
      this.filterViewChild().nativeElement.value = "";
    }
  }
  onContainerClick(event) {
    if (this.$disabled() || this.readonly() || this.loading()) {
      return;
    }
    if (event.target.tagName === "INPUT" || event.target.getAttribute("data-pc-section") === "clearicon" || event.target.closest('[data-pc-section="clearicon"]')) {
      return;
    } else if (!this.overlayViewChild() || !this.overlayViewChild().el.nativeElement.contains(event.target)) {
      if (this.overlayVisible()) {
        this.hide(true);
      } else {
        this.show(true);
      }
    }
    this.focusInputViewChild()?.nativeElement.focus({ preventScroll: true });
    this.onClick.emit(event);
    this.clicked.set(true);
  }
  isEmpty() {
    return !this._options() || this.visibleOptions() && this.visibleOptions().length === 0;
  }
  onEditableInput(event) {
    const value = event.target.value;
    this.searchValue = "";
    const matched = this.searchOptions(event, value);
    if (!matched) {
      this.focusedOptionIndex.set(-1);
    }
    this.onModelChange(value);
    this.updateModel(value || null, event);
    setTimeout(() => {
      this.onChange.emit({ originalEvent: event, value });
    }, 1);
    if (!this.overlayVisible() && l(value)) {
      this.show();
    }
  }
  /**
   * Displays the panel.
   * @group Method
   */
  show(isFocus) {
    this.overlayVisible.set(true);
    this.focusedOptionIndex.set(this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : this.editable() ? -1 : this.findSelectedOptionIndex());
    if (isFocus) {
      kt(this.focusInputViewChild()?.nativeElement);
    }
  }
  onOverlayBeforeEnter(event) {
    this.itemsWrapper = et(this.overlayViewChild()?.overlayViewChild()?.nativeElement, this.virtualScroll() ? '[data-pc-name="virtualscroller"]' : '[data-pc-section="listcontainer"]');
    if (this.virtualScroll()) {
      this.scroller()?.setContentEl(this.itemsViewChild()?.nativeElement);
    }
    if (this._options() && this._options().length) {
      if (this.virtualScroll()) {
        const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
        if (selectedIndex !== -1) {
          setTimeout(() => {
            this.scroller()?.scrollToIndex(selectedIndex);
          }, 10);
        }
      } else {
        let selectedListItem = et(this.itemsWrapper, '[data-p-selected="true"]');
        if (selectedListItem) {
          selectedListItem.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }
    }
    if (this.filterViewChild() && this.filterViewChild().nativeElement) {
      this.preventModelTouched = true;
      if (this.autofocusFilter() && !this.editable()) {
        this.filterViewChild().nativeElement.focus();
      }
    }
    this.onShow.emit(event);
  }
  onOverlayAfterLeave(event) {
    this.itemsWrapper = null;
    this.onModelTouched();
    this.onHide.emit(event);
  }
  /**
   * Hides the panel.
   * @group Method
   */
  hide(isFocus) {
    this.overlayVisible.set(false);
    this.focusedOptionIndex.set(-1);
    this.clicked.set(false);
    this.searchValue = "";
    if (this.overlayOptions()?.mode === "modal") {
      unblockBodyScroll();
    }
    if (this.filter() && this.resetFilterOnHide()) {
      this.resetFilter();
    }
    if (isFocus) {
      if (this.focusInputViewChild()) {
        kt(this.focusInputViewChild()?.nativeElement);
      }
      if (this.editable() && this.editableInputViewChild()) {
        kt(this.editableInputViewChild()?.nativeElement);
      }
    }
  }
  onInputFocus(event) {
    if (this.$disabled()) {
      return;
    }
    this.focused.set(true);
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible() && this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : -1;
    this.focusedOptionIndex.set(focusedOptionIndex);
    if (this.overlayVisible()) {
      this.scrollInView(this.focusedOptionIndex());
    }
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused.set(false);
    this.onBlur.emit(event);
    if (!this.preventModelTouched && !this.overlayVisible()) {
      this.onModelTouched();
    }
    this.preventModelTouched = false;
  }
  onKeyDown(event, search = false) {
    if (this.$disabled() || this.readonly() || this.loading()) {
      return;
    }
    switch (event.code) {
      //down
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      //up
      case "ArrowUp":
        this.onArrowUpKey(event, this.editable());
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.onArrowLeftKey(event, this.editable());
        break;
      case "Delete":
        this.onDeleteKey(event);
        break;
      case "Home":
        this.onHomeKey(event, this.editable());
        break;
      case "End":
        this.onEndKey(event, this.editable());
        break;
      case "PageDown":
        this.onPageDownKey(event);
        break;
      case "PageUp":
        this.onPageUpKey(event);
        break;
      //space
      case "Space":
        this.onSpaceKey(event, search);
        break;
      //enter
      case "Enter":
      case "NumpadEnter":
        this.onEnterKey(event);
        break;
      //escape and tab
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event);
        break;
      case "Backspace":
        this.onBackspaceKey(event, this.editable());
        break;
      case "ShiftLeft":
      case "ShiftRight":
        break;
      default:
        if (!event.metaKey && J(event.key)) {
          if (!this.overlayVisible()) {
            this.show();
          }
          if (!this.editable()) {
            this.searchOptions(event, event.key);
          }
        }
        break;
    }
    this.clicked.set(false);
  }
  onFilterKeyDown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event, true);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.onArrowLeftKey(event, true);
        break;
      case "Home":
        this.onHomeKey(event, true);
        break;
      case "End":
        this.onEndKey(event, true);
        break;
      case "Enter":
      case "NumpadEnter":
        this.onEnterKey(event, true);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event, true);
        break;
      default:
        break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFilterBlur(event) {
    this.focusedOptionIndex.set(-1);
  }
  onArrowDownKey(event) {
    if (!this.overlayVisible()) {
      this.show();
      if (this.editable()) {
        this.changeFocusedOptionIndex(event, this.findSelectedOptionIndex());
      }
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.clicked() ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
    }
    event.preventDefault();
    event.stopPropagation();
  }
  changeFocusedOptionIndex(event, index) {
    if (this.focusedOptionIndex() !== index) {
      this.focusedOptionIndex.set(index);
      this.scrollInView();
      if (this.selectOnFocus() && !this.multiple()) {
        const option = this.visibleOptions()[index];
        this.onOptionSelect(event, option, false);
      }
    }
  }
  scrollInView(index = -1) {
    const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedOptionId();
    if (this.itemsViewChild() && this.itemsViewChild().nativeElement) {
      const element = et(this.itemsViewChild().nativeElement, `li[id="${id}"]`);
      if (element) {
        if (element.scrollIntoView) {
          element.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      } else if (!this.virtualScrollerDisabled()) {
        setTimeout(() => {
          if (this.virtualScroll()) {
            this.scroller()?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
          }
        }, 0);
      }
    }
  }
  hasSelectedOption() {
    return this.modelValue() !== void 0;
  }
  isValidSelectedOption(option) {
    return this.isValidOption(option) && this.isSelected(option);
  }
  equalityKey() {
    return this.optionValue() ? void 0 : this.dataKey();
  }
  findFirstFocusedOptionIndex() {
    const selectedIndex = this.findSelectedOptionIndex();
    return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
  }
  findFirstOptionIndex() {
    return this.visibleOptions().findIndex((option) => this.isValidOption(option));
  }
  findSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  findNextOptionIndex(index) {
    const matchedOptionIndex = index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  }
  findPrevOptionIndex(index) {
    const matchedOptionIndex = index > 0 ? z(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findLastOptionIndex() {
    return z(this.visibleOptions(), (option) => this.isValidOption(option));
  }
  findLastFocusedOptionIndex() {
    const selectedIndex = this.findSelectedOptionIndex();
    return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
  }
  isValidOption(option) {
    return option !== void 0 && option !== null && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
  }
  isOptionGroup(option) {
    return this.optionGroupLabel() !== void 0 && this.optionGroupLabel() !== null && option.optionGroup !== void 0 && option.optionGroup !== null && option.group;
  }
  isOptionFocused(index, scrollerOptions) {
    return this.focusedOptionIndex() === this.getOptionIndex(index, scrollerOptions);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trackOption(option, index) {
    if (this.isOptionGroup(option)) {
      return `group_${option.index}`;
    }
    const dataKey = this.dataKey();
    if (dataKey) {
      return d(option, dataKey);
    }
    return this.getOptionValue(option);
  }
  onArrowUpKey(event, pressedInInputText = false) {
    if (event.altKey && !pressedInInputText) {
      if (this.focusedOptionIndex() !== -1) {
        const option = this.visibleOptions()[this.focusedOptionIndex()];
        this.onOptionSelect(event, option);
      }
      if (!this.multiple() && this.overlayVisible()) {
        this.hide();
      }
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.clicked() ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
      this.changeFocusedOptionIndex(event, optionIndex);
      if (!this.overlayVisible()) {
        this.show();
      }
    }
    event.preventDefault();
    event.stopPropagation();
  }
  onArrowLeftKey(event, pressedInInputText = false) {
    if (pressedInInputText) {
      this.focusedOptionIndex.set(-1);
    }
  }
  onDeleteKey(event) {
    if (this.showClear()) {
      this.clear(event);
      event.preventDefault();
    }
  }
  onHomeKey(event, pressedInInputText = false) {
    if (pressedInInputText && event.currentTarget && event.currentTarget.setSelectionRange) {
      const target = event.currentTarget;
      if (event.shiftKey) {
        target.setSelectionRange(0, target.value.length);
      } else {
        target.setSelectionRange(0, 0);
        this.focusedOptionIndex.set(-1);
      }
    } else {
      this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
      if (!this.overlayVisible()) {
        this.show();
      }
    }
    event.preventDefault();
  }
  onEndKey(event, pressedInInputText = false) {
    if (pressedInInputText && event.currentTarget && event.currentTarget.setSelectionRange) {
      const target = event.currentTarget;
      if (event.shiftKey) {
        target.setSelectionRange(0, target.value.length);
      } else {
        const len = target.value.length;
        target.setSelectionRange(len, len);
        this.focusedOptionIndex.set(-1);
      }
    } else {
      this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
      if (!this.overlayVisible()) {
        this.show();
      }
    }
    event.preventDefault();
  }
  onPageDownKey(event) {
    this.scrollInView(this.visibleOptions().length - 1);
    event.preventDefault();
  }
  onPageUpKey(event) {
    this.scrollInView(0);
    event.preventDefault();
  }
  onSpaceKey(event, pressedInInputText = false) {
    if (!this.editable() && !pressedInInputText) {
      this.onEnterKey(event);
    }
  }
  onEnterKey(event, pressedInInput = false) {
    if (!this.overlayVisible()) {
      this.focusedOptionIndex.set(-1);
      this.onArrowDownKey(event);
    } else {
      if (this.focusedOptionIndex() !== -1) {
        const option = this.visibleOptions()[this.focusedOptionIndex()];
        this.onOptionSelect(event, option);
      }
      if (!pressedInInput && !this.multiple()) {
        this.hide();
      }
    }
    event.preventDefault();
  }
  onEscapeKey(event) {
    if (this.overlayVisible()) {
      this.hide(true);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  onTabKey(event, pressedInInputText = false) {
    if (!pressedInInputText) {
      if (this.overlayVisible() && this.hasFocusableElements()) {
        kt(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay()?.nativeElement : this.firstHiddenFocusableElementOnOverlay()?.nativeElement);
        event.preventDefault();
        event.stopPropagation();
      } else {
        const consumedByOverlay = this.overlayVisible();
        if (this.focusedOptionIndex() !== -1 && consumedByOverlay) {
          const option = this.visibleOptions()[this.focusedOptionIndex()];
          this.onOptionSelect(event, option);
        }
        if (this.overlayVisible()) {
          this.hide(this.filter());
        }
        if (consumedByOverlay) {
          event.stopPropagation();
        }
      }
    }
  }
  onFirstHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild()?.nativeElement ? Ot(this.overlayViewChild()?.el?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild()?.nativeElement;
    kt(focusableEl);
  }
  onLastHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild()?.nativeElement ? Bt(this.overlayViewChild()?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild()?.nativeElement;
    kt(focusableEl);
  }
  hasFocusableElements() {
    return x(this.overlayViewChild()?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
  }
  onBackspaceKey(event, pressedInInputText = false) {
    if (pressedInInputText) {
      if (!this.overlayVisible()) {
        this.show();
      }
    }
  }
  searchFields() {
    return this.filterBy()?.split(",") || this.filterFields() || [this.optionLabel()];
  }
  searchOptions(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let optionIndex = -1;
    let matched = false;
    optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
    if (optionIndex !== -1) {
      matched = true;
    }
    if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
      optionIndex = this.findFirstFocusedOptionIndex();
    }
    if (optionIndex !== -1) {
      setTimeout(() => {
        this.changeFocusedOptionIndex(event, optionIndex);
      });
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchValue = "";
      this.searchTimeout = null;
    }, 500);
    return matched;
  }
  isOptionMatched(option) {
    return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale()).startsWith(this.searchValue?.toLocaleLowerCase(this.filterLocale()));
  }
  onFilterInputChange(event) {
    let value = event.target.value;
    this._filterValue.set(value);
    this.focusedOptionIndex.set(-1);
    this.onFilter.emit({ originalEvent: event, filter: this._filterValue() });
    if (!this.virtualScrollerDisabled()) {
      this.scroller()?.scrollToIndex(0);
    }
    setTimeout(() => {
      this.overlayViewChild()?.alignOverlay();
    });
  }
  applyFocus() {
    if (this.editable())
      et(this.el.nativeElement, '[data-pc-section="label"]').focus();
    else
      kt(this.focusInputViewChild()?.nativeElement);
  }
  /**
   * Applies focus.
   * @group Method
   */
  focus() {
    this.applyFocus();
  }
  /**
   * Clears the model.
   * @group Method
   */
  clear(event) {
    this.updateModel(this.multiple() ? [] : null, event);
    this.clearEditableLabel();
    this.onModelTouched();
    this.onChange.emit({ originalEvent: event, value: this.value });
    this.onClear.emit(event);
    this.resetFilter();
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    if (this.filter()) {
      this.resetFilter();
    }
    this.value = value;
    if (this.allowModelChange()) {
      this.onModelChange(value);
    }
    setModelValue(this.value);
    this.updateEditableLabel();
  }
  get containerDataP() {
    return this.cn({
      invalid: this.invalid(),
      disabled: this.$disabled(),
      focus: this.focused(),
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      [this.size()]: this.size()
    });
  }
  get labelDataP() {
    return this.cn({
      placeholder: this.label() === this.placeholder(),
      clearable: this.showClear(),
      disabled: this.$disabled(),
      [this.size()]: this.size(),
      empty: !this.editable() && !this.selectedItemTemplate() && (!this.label() || this.label() === "p-emptylabel" || this.label().length === 0)
    });
  }
  get dropdownIconDataP() {
    return this.cn({
      [this.size()]: this.size()
    });
  }
  get overlayDataP() {
    return this.cn({
      ["overlay-" + this.$appendTo()]: "overlay-" + this.$appendTo()
    });
  }
  static \u0275fac = function Select_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Select)();
  };
  static \u0275cmp = (function() {
    const _c0 = ["item"];
    const _c1 = ["group"];
    const _c2 = ["loader"];
    const _c3 = ["selectedItem"];
    const _c4 = ["header"];
    const _c5 = ["filter"];
    const _c6 = ["footer"];
    const _c7 = ["emptyfilter"];
    const _c8 = ["empty"];
    const _c9 = ["dropdownicon"];
    const _c10 = ["loadingicon"];
    const _c11 = ["clearicon"];
    const _c12 = ["filtericon"];
    const _c13 = ["onicon"];
    const _c14 = ["officon"];
    const _c15 = ["cancelicon"];
    const _c16 = ["focusInput"];
    const _c17 = ["editableInput"];
    const _c18 = ["items"];
    const _c19 = ["scroller"];
    const _c20 = ["overlay"];
    const _c21 = ["firstHiddenFocusableEl"];
    const _c22 = ["lastHiddenFocusableEl"];
    const _c23 = (a0) => ({
      class: a0
    });
    const _c24 = (a0) => ({
      height: a0
    });
    function _forTrack0($index, $item) {
      return this.trackOption($item, $index);
    }
    function Select_Conditional_0_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275textInterpolate1(" ", ctx_r1.label() === "p-emptylabel" ? "\xA0" : ctx_r1.label(), " ");
      }
    }
    function Select_Conditional_0_Conditional_3_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span");
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r1.label() === "p-emptylabel" ? "\xA0" : ctx_r1.label());
      }
    }
    function Select_Conditional_0_Conditional_3_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_Conditional_0_Conditional_3_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_Conditional_0_Conditional_3_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 16);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.selectedItemTemplate())("ngTemplateOutletContext", ctx_r1.selectedItemContext);
      }
    }
    function Select_Conditional_0_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Select_Conditional_0_Conditional_3_Conditional_0_Template, 2, 1, "span")(1, Select_Conditional_0_Conditional_3_Conditional_1_Template, 1, 2, "ng-container");
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r1.isSelectedOptionEmpty() ? 0 : 1);
      }
    }
    function Select_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 15, 2);
        \u0275\u0275listener("focus", function Select_Conditional_0_Template_span_focus_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onInputFocus($event));
        })("blur", function Select_Conditional_0_Template_span_blur_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onInputBlur($event));
        })("keydown", function Select_Conditional_0_Template_span_keydown_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onKeyDown($event));
        });
        \u0275\u0275conditionalCreate(2, Select_Conditional_0_Conditional_2_Template, 1, 1)(3, Select_Conditional_0_Conditional_3_Template, 2, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r1.cx("label"));
        \u0275\u0275property("pBind", ctx_r1.ptm("label"))("pTooltip", ctx_r1.tooltip())("pTooltipUnstyled", ctx_r1.unstyled())("tooltipPosition", ctx_r1.tooltipPosition())("positionStyle", ctx_r1.tooltipPositionStyle())("tooltipStyleClass", ctx_r1.tooltipStyleClass())("pAutoFocus", ctx_r1.autofocus());
        \u0275\u0275attribute("aria-disabled", ctx_r1.$disabled())("id", ctx_r1.inputId())("aria-label", ctx_r1.$ariaLabel())("aria-labelledby", ctx_r1.ariaLabelledBy())("aria-haspopup", "listbox")("aria-expanded", ctx_r1.$ariaExpanded)("aria-multiselectable", ctx_r1.$ariaMultiselectable())("aria-controls", ctx_r1.$ariaControls())("tabindex", ctx_r1.$tabindex())("aria-activedescendant", ctx_r1.$ariaActivedescendant)("aria-required", ctx_r1.required())("required", ctx_r1.$required())("disabled", ctx_r1.$disabledAttr())("data-p", ctx_r1.labelDataP);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx_r1.selectedItemTemplate() ? 2 : 3);
      }
    }
    function Select_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r3 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "input", 17, 3);
        \u0275\u0275listener("input", function Select_Conditional_1_Template_input_input_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onEditableInput($event));
        })("keydown", function Select_Conditional_1_Template_input_keydown_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onKeyDown($event));
        })("focus", function Select_Conditional_1_Template_input_focus_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onInputFocus($event));
        })("blur", function Select_Conditional_1_Template_input_blur_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onInputBlur($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r1.cx("label"));
        \u0275\u0275property("pBind", ctx_r1.ptm("label"))("pAutoFocus", ctx_r1.autofocus());
        \u0275\u0275attribute("id", ctx_r1.inputId())("aria-haspopup", "listbox")("placeholder", ctx_r1.$placeholder())("aria-label", ctx_r1.$ariaLabel())("aria-activedescendant", ctx_r1.$ariaActivedescendant)("name", ctx_r1.name())("minlength", ctx_r1.minlength())("min", ctx_r1.min())("max", ctx_r1.max())("pattern", ctx_r1.$pattern())("size", ctx_r1.inputSize())("maxlength", ctx_r1.maxlength())("required", ctx_r1.$required())("readonly", ctx_r1.$readonly())("disabled", ctx_r1.$disabledAttr())("data-p", ctx_r1.labelDataP);
      }
    }
    function Select_Conditional_2_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r4 = \u0275\u0275getCurrentView();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(0, "svg", 20);
        \u0275\u0275listener("click", function Select_Conditional_2_Conditional_0_Template_svg_click_0_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.clear($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("clearIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("clearIcon"));
        \u0275\u0275attribute("data-pc-section", "clearicon");
      }
    }
    function Select_Conditional_2_Conditional_1_1_ng_template_0_Template(rf, ctx) {
    }
    function Select_Conditional_2_Conditional_1_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_Conditional_2_Conditional_1_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function Select_Conditional_2_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r5 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 21);
        \u0275\u0275listener("click", function Select_Conditional_2_Conditional_1_Template_span_click_0_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.clear($event));
        });
        \u0275\u0275template(1, Select_Conditional_2_Conditional_1_1_Template, 1, 0, null, 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("clearIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("clearIcon"));
        \u0275\u0275attribute("data-pc-section", "clearicon");
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.clearIconTemplate())("ngTemplateOutletContext", ctx_r1.clearIconContext);
      }
    }
    function Select_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Select_Conditional_2_Conditional_0_Template, 1, 4, ":svg:svg", 18)(1, Select_Conditional_2_Conditional_1_Template, 2, 6, "span", 19);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275conditional(!ctx_r1.clearIconTemplate() ? 0 : 1);
      }
    }
    function Select_Conditional_4_Conditional_0_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_Conditional_4_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_Conditional_4_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 22);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.loadingIconTemplate());
      }
    }
    function Select_Conditional_4_Conditional_1_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 24);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("loadingIcon"), "pi-spin" + ctx_r1.loadingIcon()));
        \u0275\u0275property("pBind", ctx_r1.ptm("loadingIcon"));
      }
    }
    function Select_Conditional_4_Conditional_1_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 24);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("loadingIcon"), "pi pi-spinner pi-spin"));
        \u0275\u0275property("pBind", ctx_r1.ptm("loadingIcon"));
      }
    }
    function Select_Conditional_4_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Select_Conditional_4_Conditional_1_Conditional_0_Template, 1, 3, "span", 23)(1, Select_Conditional_4_Conditional_1_Conditional_1_Template, 1, 3, "span", 23);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r1.loadingIcon() ? 0 : 1);
      }
    }
    function Select_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Select_Conditional_4_Conditional_0_Template, 1, 1, "ng-container")(1, Select_Conditional_4_Conditional_1_Template, 2, 1);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275conditional(ctx_r1.loadingIconTemplate() ? 0 : 1);
      }
    }
    function Select_Conditional_5_Conditional_0_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 26);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("dropdownIcon"), ctx_r1.dropdownIcon()));
        \u0275\u0275property("pBind", ctx_r1.ptm("dropdownIcon"));
      }
    }
    function Select_Conditional_5_Conditional_0_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 27);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r1.cx("dropdownIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("dropdownIcon"));
      }
    }
    function Select_Conditional_5_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Select_Conditional_5_Conditional_0_Conditional_0_Template, 1, 3, "span", 19)(1, Select_Conditional_5_Conditional_0_Conditional_1_Template, 1, 3, ":svg:svg", 25);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r1.dropdownIcon() ? 0 : 1);
      }
    }
    function Select_Conditional_5_Conditional_1_1_ng_template_0_Template(rf, ctx) {
    }
    function Select_Conditional_5_Conditional_1_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_Conditional_5_Conditional_1_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function Select_Conditional_5_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 26);
        \u0275\u0275template(1, Select_Conditional_5_Conditional_1_1_Template, 1, 0, null, 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("dropdownIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("dropdownIcon"));
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.dropdownIconTemplate())("ngTemplateOutletContext", ctx_r1.dropdownIconContext);
      }
    }
    function Select_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Select_Conditional_5_Conditional_0_Template, 2, 1)(1, Select_Conditional_5_Conditional_1_Template, 2, 5, "span", 19);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275conditional(!ctx_r1.dropdownIconTemplate() ? 0 : 1);
      }
    }
    function Select_ng_template_8_ng_container_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_Conditional_4_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_Conditional_4_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_Conditional_4_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 16);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.filterTemplate())("ngTemplateOutletContext", ctx_r1.filterTemplateContext);
      }
    }
    function Select_ng_template_8_Conditional_4_Conditional_2_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 32);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275property("pBind", ctx_r1.ptm("filterIcon"));
      }
    }
    function Select_ng_template_8_Conditional_4_Conditional_2_Conditional_5_1_ng_template_0_Template(rf, ctx) {
    }
    function Select_ng_template_8_Conditional_4_Conditional_2_Conditional_5_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_Conditional_4_Conditional_2_Conditional_5_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function Select_ng_template_8_Conditional_4_Conditional_2_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 26);
        \u0275\u0275template(1, Select_ng_template_8_Conditional_4_Conditional_2_Conditional_5_1_Template, 1, 0, null, 22);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275property("pBind", ctx_r1.ptm("filterIcon"));
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.filterIconTemplate());
      }
    }
    function Select_ng_template_8_Conditional_4_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        const _r7 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "p-iconfield", 30)(1, "input", 31, 7);
        \u0275\u0275listener("input", function Select_ng_template_8_Conditional_4_Conditional_2_Template_input_input_1_listener($event) {
          \u0275\u0275restoreView(_r7);
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.onFilterInputChange($event));
        })("keydown", function Select_ng_template_8_Conditional_4_Conditional_2_Template_input_keydown_1_listener($event) {
          \u0275\u0275restoreView(_r7);
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.onFilterKeyDown($event));
        })("blur", function Select_ng_template_8_Conditional_4_Conditional_2_Template_input_blur_1_listener($event) {
          \u0275\u0275restoreView(_r7);
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.onFilterBlur($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p-inputicon", 30);
        \u0275\u0275conditionalCreate(4, Select_ng_template_8_Conditional_4_Conditional_2_Conditional_4_Template, 1, 1, ":svg:svg", 32)(5, Select_ng_template_8_Conditional_4_Conditional_2_Conditional_5_Template, 2, 2, "span", 26);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("pt", ctx_r1.ptm("pcFilterContainer"))("unstyled", ctx_r1.unstyled());
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx_r1.cx("pcFilter"));
        \u0275\u0275property("pSize", ctx_r1.size())("value", ctx_r1.filterInputValue())("variant", ctx_r1.$variant())("pt", ctx_r1.ptm("pcFilter"))("unstyled", ctx_r1.unstyled());
        \u0275\u0275attribute("placeholder", ctx_r1.filterPlaceholder())("aria-owns", ctx_r1.$ariaOwns())("aria-label", ctx_r1.ariaFilterLabel())("aria-activedescendant", ctx_r1.focusedOptionId());
        \u0275\u0275advance(2);
        \u0275\u0275property("pt", ctx_r1.ptm("pcFilterIconContainer"))("unstyled", ctx_r1.unstyled());
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r1.filterIconTemplate() ? 4 : 5);
      }
    }
    function Select_ng_template_8_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 21);
        \u0275\u0275listener("click", function Select_ng_template_8_Conditional_4_Template_div_click_0_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275conditionalCreate(1, Select_ng_template_8_Conditional_4_Conditional_1_Template, 1, 2, "ng-container")(2, Select_ng_template_8_Conditional_4_Conditional_2_Template, 6, 16, "p-iconfield", 30);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("header"));
        \u0275\u0275property("pBind", ctx_r1.ptm("header"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.filterTemplate() ? 1 : 2);
      }
    }
    function Select_ng_template_8_Conditional_6_ng_template_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_Conditional_6_ng_template_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_Conditional_6_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 16);
      }
      if (rf & 2) {
        const items_r9 = ctx.$implicit;
        const scrollerOptions_r10 = ctx.options;
        \u0275\u0275nextContext(2);
        const buildInItems_r11 = \u0275\u0275reference(9);
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", buildInItems_r11)("ngTemplateOutletContext", ctx_r1.getBuildInItemsContext(items_r9, scrollerOptions_r10));
      }
    }
    function Select_ng_template_8_Conditional_6_Conditional_4_ng_template_0_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_Conditional_6_Conditional_4_ng_template_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_Conditional_6_Conditional_4_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 16);
      }
      if (rf & 2) {
        const scrollerOptions_r12 = ctx.options;
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.loaderTemplate())("ngTemplateOutletContext", ctx_r1.getLoaderContext(scrollerOptions_r12));
      }
    }
    function Select_ng_template_8_Conditional_6_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_Conditional_6_Conditional_4_ng_template_0_Template, 1, 2, "ng-template", null, 9, \u0275\u0275templateRefExtractor);
      }
    }
    function Select_ng_template_8_Conditional_6_Template(rf, ctx) {
      if (rf & 1) {
        const _r8 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "p-scroller", 33, 8);
        \u0275\u0275listener("onLazyLoad", function Select_ng_template_8_Conditional_6_Template_p_scroller_onLazyLoad_0_listener($event) {
          \u0275\u0275restoreView(_r8);
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.onLazyLoad.emit($event));
        });
        \u0275\u0275template(2, Select_ng_template_8_Conditional_6_ng_template_2_Template, 1, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
        \u0275\u0275conditionalCreate(4, Select_ng_template_8_Conditional_6_Conditional_4_Template, 2, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(\u0275\u0275pureFunction1(9, _c24, ctx_r1.scrollHeight()));
        \u0275\u0275property("items", ctx_r1.visibleOptions())("itemSize", ctx_r1.virtualScrollItemSize())("autoSize", true)("lazy", ctx_r1.lazy())("options", ctx_r1.virtualScrollOptions())("pt", ctx_r1.ptm("virtualScroller"));
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx_r1.loaderTemplate() ? 4 : -1);
      }
    }
    function Select_ng_template_8_Conditional_7_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_Conditional_7_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_Conditional_7_ng_container_0_Template, 1, 0, "ng-container", 16);
      }
      if (rf & 2) {
        \u0275\u0275nextContext();
        const buildInItems_r11 = \u0275\u0275reference(9);
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", buildInItems_r11)("ngTemplateOutletContext", ctx_r1.defaultBuildInItemsContext);
      }
    }
    function Select_ng_template_8_ng_template_8_For_3_Conditional_0_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 26);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const option_r13 = \u0275\u0275nextContext(2).$implicit;
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r1.cx("optionGroupLabel"));
        \u0275\u0275property("pBind", ctx_r1.ptm("optionGroupLabel"));
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r1.getOptionGroupLabel(option_r13.optionGroup));
      }
    }
    function Select_ng_template_8_ng_template_8_For_3_Conditional_0_ng_container_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_ng_template_8_For_3_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "li", 37);
        \u0275\u0275conditionalCreate(1, Select_ng_template_8_ng_template_8_For_3_Conditional_0_Conditional_1_Template, 2, 4, "span", 19);
        \u0275\u0275template(2, Select_ng_template_8_ng_template_8_For_3_Conditional_0_ng_container_2_Template, 1, 0, "ng-container", 16);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r13 = \u0275\u0275nextContext();
        const option_r13 = ctx_r13.$implicit;
        const \u0275$index_124_r15 = ctx_r13.$index;
        const scrollerOptions_r16 = \u0275\u0275nextContext().options;
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(ctx_r1.getItemSizeStyle(scrollerOptions_r16));
        \u0275\u0275classMap(ctx_r1.cx("optionGroup"));
        \u0275\u0275property("pBind", ctx_r1.ptm("optionGroup"));
        \u0275\u0275attribute("id", ctx_r1.$id() + "_" + ctx_r1.getOptionIndex(\u0275$index_124_r15, scrollerOptions_r16));
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r1.groupTemplate() ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.groupTemplate())("ngTemplateOutletContext", ctx_r1.getGroupContext(option_r13.optionGroup));
      }
    }
    function Select_ng_template_8_ng_template_8_For_3_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r17 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "p-select-item", 38);
        \u0275\u0275listener("onClick", function Select_ng_template_8_ng_template_8_For_3_Conditional_1_Template_p_select_item_onClick_0_listener($event) {
          \u0275\u0275restoreView(_r17);
          const option_r13 = \u0275\u0275nextContext().$implicit;
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.onOptionSelect($event, option_r13));
        })("onMouseEnter", function Select_ng_template_8_ng_template_8_For_3_Conditional_1_Template_p_select_item_onMouseEnter_0_listener($event) {
          \u0275\u0275restoreView(_r17);
          const \u0275$index_124_r15 = \u0275\u0275nextContext().$index;
          const scrollerOptions_r16 = \u0275\u0275nextContext().options;
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.onOptionMouseEnter($event, ctx_r1.getOptionIndex(\u0275$index_124_r15, scrollerOptions_r16)));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r13 = \u0275\u0275nextContext();
        const option_r13 = ctx_r13.$implicit;
        const \u0275$index_124_r15 = ctx_r13.$index;
        const scrollerOptions_r16 = \u0275\u0275nextContext().options;
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275property("id", ctx_r1.$id() + "_" + ctx_r1.getOptionIndex(\u0275$index_124_r15, scrollerOptions_r16))("option", option_r13)("checkmark", ctx_r1.checkmark())("selected", ctx_r1.isSelected(option_r13))("label", ctx_r1.getOptionLabel(option_r13))("disabled", ctx_r1.isOptionDisabled(option_r13))("template", ctx_r1.itemTemplate())("focused", ctx_r1.isOptionFocused(\u0275$index_124_r15, scrollerOptions_r16))("ariaPosInset", ctx_r1.getAriaPosInset(ctx_r1.getOptionIndex(\u0275$index_124_r15, scrollerOptions_r16)))("ariaSetSize", ctx_r1.ariaSetSize)("index", \u0275$index_124_r15)("unstyled", ctx_r1.unstyled())("scrollerOptions", scrollerOptions_r16);
      }
    }
    function Select_ng_template_8_ng_template_8_For_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Select_ng_template_8_ng_template_8_For_3_Conditional_0_Template, 3, 9, "li", 35)(1, Select_ng_template_8_ng_template_8_For_3_Conditional_1_Template, 1, 13, "p-select-item", 36);
      }
      if (rf & 2) {
        const option_r13 = ctx.$implicit;
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275conditional(ctx_r1.isOptionGroup(option_r13) ? 0 : 1);
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_4_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275textInterpolate1(" ", ctx_r1.emptyFilterMessageLabel(), " ");
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_4_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_4_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_ng_template_8_Conditional_4_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 22);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.hasEmptyTemplate());
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "li", 37);
        \u0275\u0275conditionalCreate(1, Select_ng_template_8_ng_template_8_Conditional_4_Conditional_1_Template, 1, 1)(2, Select_ng_template_8_ng_template_8_Conditional_4_Conditional_2_Template, 1, 1, "ng-container");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const scrollerOptions_r16 = \u0275\u0275nextContext().options;
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(ctx_r1.getItemSizeStyle(scrollerOptions_r16));
        \u0275\u0275classMap(ctx_r1.cx("emptyMessage"));
        \u0275\u0275property("pBind", ctx_r1.ptm("emptyMessage"));
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r1.hasEmptyTemplate() ? 1 : 2);
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_5_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275textInterpolate1(" ", ctx_r1.emptyMessageLabel() || ctx_r1.emptyFilterMessageLabel(), " ");
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_5_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_5_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Select_ng_template_8_ng_template_8_Conditional_5_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 22);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.emptyTemplate());
      }
    }
    function Select_ng_template_8_ng_template_8_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "li", 37);
        \u0275\u0275conditionalCreate(1, Select_ng_template_8_ng_template_8_Conditional_5_Conditional_1_Template, 1, 1)(2, Select_ng_template_8_ng_template_8_Conditional_5_Conditional_2_Template, 1, 1, "ng-container");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const scrollerOptions_r16 = \u0275\u0275nextContext().options;
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(ctx_r1.getItemSizeStyle(scrollerOptions_r16));
        \u0275\u0275classMap(ctx_r1.cx("emptyMessage"));
        \u0275\u0275property("pBind", ctx_r1.ptm("emptyMessage"));
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r1.emptyTemplate() ? 1 : 2);
      }
    }
    function Select_ng_template_8_ng_template_8_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "ul", 34, 10);
        \u0275\u0275repeaterCreate(2, Select_ng_template_8_ng_template_8_For_3_Template, 2, 1, null, null, _forTrack0, true);
        \u0275\u0275conditionalCreate(4, Select_ng_template_8_ng_template_8_Conditional_4_Template, 3, 6, "li", 35);
        \u0275\u0275conditionalCreate(5, Select_ng_template_8_ng_template_8_Conditional_5_Template, 3, 6, "li", 35);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const items_r18 = ctx.$implicit;
        const scrollerOptions_r16 = ctx.options;
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(scrollerOptions_r16.contentStyle);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("list"), scrollerOptions_r16.contentStyleClass));
        \u0275\u0275property("pBind", ctx_r1.ptm("list"));
        \u0275\u0275attribute("id", ctx_r1.$id() + "_list")("aria-label", ctx_r1.listLabel);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(items_r18);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx_r1.showEmptyFilterMessage() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.showEmptyMessage() ? 5 : -1);
      }
    }
    function Select_ng_template_8_ng_container_10_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Select_ng_template_8_Template(rf, ctx) {
      if (rf & 1) {
        const _r6 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 26)(1, "span", 28, 4);
        \u0275\u0275listener("focus", function Select_ng_template_8_Template_span_focus_1_listener($event) {
          \u0275\u0275restoreView(_r6);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onFirstHiddenFocus($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, Select_ng_template_8_ng_container_3_Template, 1, 0, "ng-container", 16);
        \u0275\u0275conditionalCreate(4, Select_ng_template_8_Conditional_4_Template, 3, 4, "div", 19);
        \u0275\u0275elementStart(5, "div", 26);
        \u0275\u0275conditionalCreate(6, Select_ng_template_8_Conditional_6_Template, 5, 11, "p-scroller", 29)(7, Select_ng_template_8_Conditional_7_Template, 1, 2, "ng-container");
        \u0275\u0275template(8, Select_ng_template_8_ng_template_8_Template, 6, 9, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, Select_ng_template_8_ng_container_10_Template, 1, 0, "ng-container", 22);
        \u0275\u0275elementStart(11, "span", 28, 6);
        \u0275\u0275listener("focus", function Select_ng_template_8_Template_span_focus_11_listener($event) {
          \u0275\u0275restoreView(_r6);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onLastHiddenFocus($event));
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275styleMap(ctx_r1.panelStyle());
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("overlay"), ctx_r1.panelStyleClass()));
        \u0275\u0275property("pBind", ctx_r1.ptm("overlay"));
        \u0275\u0275attribute("data-p", ctx_r1.overlayDataP);
        \u0275\u0275advance();
        \u0275\u0275property("pBind", ctx_r1.ptm("hiddenFirstFocusableEl"));
        \u0275\u0275attribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.headerTemplate())("ngTemplateOutletContext", \u0275\u0275pureFunction1(24, _c23, ctx_r1.cx("header")));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.filter() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx_r1.cx("listContainer"));
        \u0275\u0275styleProp("max-height", ctx_r1.virtualScroll() ? "auto" : ctx_r1.scrollHeight() || "auto");
        \u0275\u0275property("pBind", ctx_r1.ptm("listContainer"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.virtualScroll() ? 6 : 7);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.footerTemplate());
        \u0275\u0275advance();
        \u0275\u0275property("pBind", ctx_r1.ptm("hiddenLastFocusableEl"));
        \u0275\u0275attribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Select,
      selectors: [["p-select"]],
      contentQueries: function Select_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.itemTemplate, _c0, 4)(dirIndex, ctx.groupTemplate, _c1, 4)(dirIndex, ctx.loaderTemplate, _c2, 4)(dirIndex, ctx.selectedItemTemplate, _c3, 4)(dirIndex, ctx.headerTemplate, _c4, 4)(dirIndex, ctx.filterTemplate, _c5, 4)(dirIndex, ctx.footerTemplate, _c6, 4)(dirIndex, ctx.emptyFilterTemplate, _c7, 4)(dirIndex, ctx.emptyTemplate, _c8, 4)(dirIndex, ctx.dropdownIconTemplate, _c9, 4)(dirIndex, ctx.loadingIconTemplate, _c10, 4)(dirIndex, ctx.clearIconTemplate, _c11, 4)(dirIndex, ctx.filterIconTemplate, _c12, 4)(dirIndex, ctx.onIconTemplate, _c13, 4)(dirIndex, ctx.offIconTemplate, _c14, 4)(dirIndex, ctx.cancelIconTemplate, _c15, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(16);
        }
      },
      viewQuery: function Select_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx.filterViewChild, _c5, 5)(ctx.focusInputViewChild, _c16, 5)(ctx.editableInputViewChild, _c17, 5)(ctx.itemsViewChild, _c18, 5)(ctx.scroller, _c19, 5)(ctx.overlayViewChild, _c20, 5)(ctx.firstHiddenFocusableElementOnOverlay, _c21, 5)(ctx.lastHiddenFocusableElementOnOverlay, _c22, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(8);
        }
      },
      hostVars: 4,
      hostBindings: function Select_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function Select_click_HostBindingHandler($event) {
            return ctx.onContainerClick($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("id", ctx.$id())("data-p", ctx.containerDataP);
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        id: [1, "id"],
        scrollHeight: [1, "scrollHeight"],
        filter: [1, "filter"],
        panelStyle: [1, "panelStyle"],
        panelStyleClass: [1, "panelStyleClass"],
        readonly: [1, "readonly"],
        editable: [1, "editable"],
        tabindex: [1, "tabindex"],
        placeholder: [1, "placeholder"],
        loadingIcon: [1, "loadingIcon"],
        filterPlaceholder: [1, "filterPlaceholder"],
        filterLocale: [1, "filterLocale"],
        inputId: [1, "inputId"],
        dataKey: [1, "dataKey"],
        filterBy: [1, "filterBy"],
        filterFields: [1, "filterFields"],
        autofocus: [1, "autofocus"],
        resetFilterOnHide: [1, "resetFilterOnHide"],
        checkmark: [1, "checkmark"],
        dropdownIcon: [1, "dropdownIcon"],
        loading: [1, "loading"],
        optionLabel: [1, "optionLabel"],
        optionValue: [1, "optionValue"],
        optionDisabled: [1, "optionDisabled"],
        optionGroupLabel: [1, "optionGroupLabel"],
        optionGroupChildren: [1, "optionGroupChildren"],
        group: [1, "group"],
        showClear: [1, "showClear"],
        emptyFilterMessage: [1, "emptyFilterMessage"],
        emptyMessage: [1, "emptyMessage"],
        lazy: [1, "lazy"],
        virtualScroll: [1, "virtualScroll"],
        virtualScrollItemSize: [1, "virtualScrollItemSize"],
        virtualScrollOptions: [1, "virtualScrollOptions"],
        overlayOptions: [1, "overlayOptions"],
        ariaFilterLabel: [1, "ariaFilterLabel"],
        ariaLabel: [1, "ariaLabel"],
        ariaLabelledBy: [1, "ariaLabelledBy"],
        filterMatchMode: [1, "filterMatchMode"],
        tooltip: [1, "tooltip"],
        tooltipPosition: [1, "tooltipPosition"],
        tooltipPositionStyle: [1, "tooltipPositionStyle"],
        tooltipStyleClass: [1, "tooltipStyleClass"],
        focusOnHover: [1, "focusOnHover"],
        selectOnFocus: [1, "selectOnFocus"],
        multiple: [1, "multiple"],
        autoOptionFocus: [1, "autoOptionFocus"],
        autofocusFilter: [1, "autofocusFilter"],
        filterValue: [1, "filterValue"],
        options: [1, "options"],
        appendTo: [1, "appendTo"],
        motionOptions: [1, "motionOptions"]
      },
      outputs: {
        onChange: "onChange",
        onFilter: "onFilter",
        onFocus: "onFocus",
        onBlur: "onBlur",
        onClick: "onClick",
        onShow: "onShow",
        onHide: "onHide",
        onClear: "onClear",
        onLazyLoad: "onLazyLoad"
      },
      features: [\u0275\u0275ProvidersFeature([SELECT_VALUE_ACCESSOR, SelectStyle, { provide: SELECT_INSTANCE, useExisting: _Select }, { provide: PARENT_INSTANCE, useExisting: _Select }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      decls: 10,
      vars: 16,
      consts: [["overlay", ""], ["content", ""], ["focusInput", ""], ["editableInput", ""], ["firstHiddenFocusableEl", ""], ["buildInItems", ""], ["lastHiddenFocusableEl", ""], ["filter", ""], ["scroller", ""], ["loader", ""], ["items", ""], ["role", "combobox", 3, "class", "pBind", "pTooltip", "pTooltipUnstyled", "tooltipPosition", "positionStyle", "tooltipStyleClass", "pAutoFocus"], ["type", "text", 3, "class", "pBind", "pAutoFocus"], ["role", "button", "aria-label", "dropdown trigger", "aria-haspopup", "listbox", 3, "pBind"], [3, "visibleChange", "onBeforeEnter", "onAfterLeave", "onHide", "hostAttrSelector", "visible", "options", "target", "appendTo", "unstyled", "pt", "motionOptions"], ["role", "combobox", 3, "focus", "blur", "keydown", "pBind", "pTooltip", "pTooltipUnstyled", "tooltipPosition", "positionStyle", "tooltipStyleClass", "pAutoFocus"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "text", 3, "input", "keydown", "focus", "blur", "pBind", "pAutoFocus"], ["data-p-icon", "times", 3, "class", "pBind"], [3, "class", "pBind"], ["data-p-icon", "times", 3, "click", "pBind"], [3, "click", "pBind"], [4, "ngTemplateOutlet"], ["aria-hidden", "true", 3, "class", "pBind"], ["aria-hidden", "true", 3, "pBind"], ["data-p-icon", "chevron-down", 3, "class", "pBind"], [3, "pBind"], ["data-p-icon", "chevron-down", 3, "pBind"], ["role", "presentation", 1, "p-hidden-accessible", "p-hidden-focusable", 3, "focus", "pBind"], ["hostName", "select", 3, "items", "style", "itemSize", "autoSize", "lazy", "options", "pt"], [3, "pt", "unstyled"], ["pInputText", "", "type", "text", "role", "searchbox", "autocomplete", "off", 3, "input", "keydown", "blur", "pSize", "value", "variant", "pt", "unstyled"], ["data-p-icon", "search", 3, "pBind"], ["hostName", "select", 3, "onLazyLoad", "items", "itemSize", "autoSize", "lazy", "options", "pt"], ["role", "listbox", 3, "pBind"], ["role", "option", 3, "class", "style", "pBind"], [3, "id", "option", "checkmark", "selected", "label", "disabled", "template", "focused", "ariaPosInset", "ariaSetSize", "index", "unstyled", "scrollerOptions"], ["role", "option", 3, "pBind"], [3, "onClick", "onMouseEnter", "id", "option", "checkmark", "selected", "label", "disabled", "template", "focused", "ariaPosInset", "ariaSetSize", "index", "unstyled", "scrollerOptions"]],
      template: function Select_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275conditionalCreate(0, Select_Conditional_0_Template, 4, 24, "span", 11)(1, Select_Conditional_1_Template, 2, 20, "input", 12);
          \u0275\u0275conditionalCreate(2, Select_Conditional_2_Template, 2, 1);
          \u0275\u0275elementStart(3, "div", 13);
          \u0275\u0275conditionalCreate(4, Select_Conditional_4_Template, 2, 1)(5, Select_Conditional_5_Template, 2, 1);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(6, "p-overlay", 14, 0);
          \u0275\u0275listener("visibleChange", function Select_Template_p_overlay_visibleChange_6_listener($event) {
            return ctx.overlayVisible.set($event);
          })("onBeforeEnter", function Select_Template_p_overlay_onBeforeEnter_6_listener($event) {
            return ctx.onOverlayBeforeEnter($event);
          })("onAfterLeave", function Select_Template_p_overlay_onAfterLeave_6_listener($event) {
            return ctx.onOverlayAfterLeave($event);
          })("onHide", function Select_Template_p_overlay_onHide_6_listener() {
            return ctx.hide();
          });
          \u0275\u0275template(8, Select_ng_template_8_Template, 13, 26, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275conditional(!ctx.editable() ? 0 : 1);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.isVisibleClearIcon() ? 2 : -1);
          \u0275\u0275advance();
          \u0275\u0275classMap(ctx.cx("dropdown"));
          \u0275\u0275property("pBind", ctx.ptm("dropdown"));
          \u0275\u0275attribute("aria-expanded", ctx.$ariaExpanded)("data-pc-section", "trigger");
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.loading() ? 4 : 5);
          \u0275\u0275advance(2);
          \u0275\u0275property("hostAttrSelector", ctx.$attrSelector)("visible", ctx.overlayVisible())("options", ctx.overlayOptions())("target", "@parent")("appendTo", ctx.$appendTo())("unstyled", ctx.unstyled())("pt", ctx.ptm("pcOverlay"))("motionOptions", ctx.motionOptions());
        }
      },
      dependencies: [NgTemplateOutlet, SelectItem, Overlay, Tooltip, AutoFocus, Times, ChevronDown, Search, InputText, IconField, InputIcon, Scroller, SharedModule, BindModule, Bind],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Select, [{
    type: Component,
    args: [{
      selector: "p-select",
      standalone: true,
      imports: [NgTemplateOutlet, SelectItem, Overlay, Tooltip, AutoFocus, Times, ChevronDown, Search, InputText, IconField, InputIcon, Scroller, SharedModule, BindModule],
      template: `
        @if (!editable()) {
            <span
                #focusInput
                [class]="cx('label')"
                [pBind]="ptm('label')"
                [pTooltip]="tooltip()"
                [pTooltipUnstyled]="unstyled()"
                [tooltipPosition]="tooltipPosition()"
                [positionStyle]="tooltipPositionStyle()"
                [tooltipStyleClass]="tooltipStyleClass()"
                [attr.aria-disabled]="$disabled()"
                [attr.id]="inputId()"
                role="combobox"
                [attr.aria-label]="$ariaLabel()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="$ariaExpanded"
                [attr.aria-multiselectable]="$ariaMultiselectable()"
                [attr.aria-controls]="$ariaControls()"
                [attr.tabindex]="$tabindex()"
                [pAutoFocus]="autofocus()"
                [attr.aria-activedescendant]="$ariaActivedescendant"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.aria-required]="required()"
                [attr.required]="$required()"
                [attr.disabled]="$disabledAttr()"
                [attr.data-p]="labelDataP"
            >
                @if (!selectedItemTemplate()) {
                    {{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}
                } @else {
                    @if (isSelectedOptionEmpty()) {
                        <span>{{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}</span>
                    } @else {
                        <ng-container *ngTemplateOutlet="selectedItemTemplate(); context: selectedItemContext"></ng-container>
                    }
                }
            </span>
        } @else {
            <input
                #editableInput
                type="text"
                [attr.id]="inputId()"
                [class]="cx('label')"
                [pBind]="ptm('label')"
                [attr.aria-haspopup]="'listbox'"
                [attr.placeholder]="$placeholder()"
                [attr.aria-label]="$ariaLabel()"
                (input)="onEditableInput($event)"
                (keydown)="onKeyDown($event)"
                [pAutoFocus]="autofocus()"
                [attr.aria-activedescendant]="$ariaActivedescendant"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                [attr.name]="name()"
                [attr.minlength]="minlength()"
                [attr.min]="min()"
                [attr.max]="max()"
                [attr.pattern]="$pattern()"
                [attr.size]="inputSize()"
                [attr.maxlength]="maxlength()"
                [attr.required]="$required()"
                [attr.readonly]="$readonly()"
                [attr.disabled]="$disabledAttr()"
                [attr.data-p]="labelDataP"
            />
        }
        @if (isVisibleClearIcon()) {
            @if (!clearIconTemplate()) {
                <svg data-p-icon="times" [class]="cx('clearIcon')" [pBind]="ptm('clearIcon')" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" />
            } @else {
                <span [class]="cx('clearIcon')" [pBind]="ptm('clearIcon')" (click)="clear($event)" [attr.data-pc-section]="'clearicon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate(); context: clearIconContext"></ng-template>
                </span>
            }
        }

        <div [class]="cx('dropdown')" [pBind]="ptm('dropdown')" role="button" aria-label="dropdown trigger" aria-haspopup="listbox" [attr.aria-expanded]="$ariaExpanded" [attr.data-pc-section]="'trigger'">
            @if (loading()) {
                @if (loadingIconTemplate()) {
                    <ng-container *ngTemplateOutlet="loadingIconTemplate()"></ng-container>
                } @else {
                    @if (loadingIcon()) {
                        <span [class]="cn(cx('loadingIcon'), 'pi-spin' + loadingIcon())" [pBind]="ptm('loadingIcon')" aria-hidden="true"></span>
                    } @else {
                        <span [class]="cn(cx('loadingIcon'), 'pi pi-spinner pi-spin')" [pBind]="ptm('loadingIcon')" aria-hidden="true"></span>
                    }
                }
            } @else {
                @if (!dropdownIconTemplate()) {
                    @if (dropdownIcon()) {
                        <span [class]="cn(cx('dropdownIcon'), dropdownIcon())" [pBind]="ptm('dropdownIcon')"></span>
                    } @else {
                        <svg data-p-icon="chevron-down" [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')" />
                    }
                } @else {
                    <span [class]="cx('dropdownIcon')" [pBind]="ptm('dropdownIcon')">
                        <ng-template *ngTemplateOutlet="dropdownIconTemplate(); context: dropdownIconContext"></ng-template>
                    </span>
                }
            }
        </div>

        <p-overlay
            #overlay
            [hostAttrSelector]="$attrSelector"
            [visible]="overlayVisible()"
            (visibleChange)="overlayVisible.set($event)"
            [options]="overlayOptions()"
            [target]="'@parent'"
            [appendTo]="$appendTo()"
            [unstyled]="unstyled()"
            [pt]="ptm('pcOverlay')"
            [motionOptions]="motionOptions()"
            (onBeforeEnter)="onOverlayBeforeEnter($event)"
            (onAfterLeave)="onOverlayAfterLeave($event)"
            (onHide)="hide()"
        >
            <ng-template #content>
                <div [class]="cn(cx('overlay'), panelStyleClass())" [style]="panelStyle()" [pBind]="ptm('overlay')" [attr.data-p]="overlayDataP">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('hiddenFirstFocusableEl')"
                    >
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate(); context: { class: cx('header') }"></ng-container>
                    @if (filter()) {
                        <div [class]="cx('header')" (click)="$event.stopPropagation()" [pBind]="ptm('header')">
                            @if (filterTemplate()) {
                                <ng-container *ngTemplateOutlet="filterTemplate(); context: filterTemplateContext"></ng-container>
                            } @else {
                                <p-iconfield [pt]="ptm('pcFilterContainer')" [unstyled]="unstyled()">
                                    <input
                                        #filter
                                        pInputText
                                        [pSize]="size()"
                                        type="text"
                                        role="searchbox"
                                        autocomplete="off"
                                        [value]="filterInputValue()"
                                        [class]="cx('pcFilter')"
                                        [variant]="$variant()"
                                        [attr.placeholder]="filterPlaceholder()"
                                        [attr.aria-owns]="$ariaOwns()"
                                        (input)="onFilterInputChange($event)"
                                        [attr.aria-label]="ariaFilterLabel()"
                                        [attr.aria-activedescendant]="focusedOptionId()"
                                        (keydown)="onFilterKeyDown($event)"
                                        (blur)="onFilterBlur($event)"
                                        [pt]="ptm('pcFilter')"
                                        [unstyled]="unstyled()"
                                    />
                                    <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                                        @if (!filterIconTemplate()) {
                                            <svg data-p-icon="search" [pBind]="ptm('filterIcon')" />
                                        } @else {
                                            <span [pBind]="ptm('filterIcon')">
                                                <ng-template *ngTemplateOutlet="filterIconTemplate()"></ng-template>
                                            </span>
                                        }
                                    </p-inputicon>
                                </p-iconfield>
                            }
                        </div>
                    }
                    <div [class]="cx('listContainer')" [style.max-height]="virtualScroll() ? 'auto' : scrollHeight() || 'auto'" [pBind]="ptm('listContainer')">
                        @if (virtualScroll()) {
                            <p-scroller
                                hostName="select"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight() }"
                                [itemSize]="virtualScrollItemSize()!"
                                [autoSize]="true"
                                [lazy]="lazy()"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions()"
                                [pt]="ptm('virtualScroller')"
                            >
                                <ng-template #content let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: getBuildInItemsContext(items, scrollerOptions)"></ng-container>
                                </ng-template>
                                @if (loaderTemplate()) {
                                    <ng-template #loader let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate(); context: getLoaderContext(scrollerOptions)"></ng-container>
                                    </ng-template>
                                }
                            </p-scroller>
                        } @else {
                            <ng-container *ngTemplateOutlet="buildInItems; context: defaultBuildInItemsContext"></ng-container>
                        }

                        <ng-template #buildInItems let-items let-scrollerOptions="options">
                            <ul #items [attr.id]="$id() + '_list'" [attr.aria-label]="listLabel" [class]="cn(cx('list'), scrollerOptions.contentStyleClass)" [style]="scrollerOptions.contentStyle" role="listbox" [pBind]="ptm('list')">
                                @for (option of items; track trackOption(option, i); let i = $index) {
                                    @if (isOptionGroup(option)) {
                                        <li [class]="cx('optionGroup')" [attr.id]="$id() + '_' + getOptionIndex(i, scrollerOptions)" [style]="getItemSizeStyle(scrollerOptions)" role="option" [pBind]="ptm('optionGroup')">
                                            @if (!groupTemplate()) {
                                                <span [class]="cx('optionGroupLabel')" [pBind]="ptm('optionGroupLabel')">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                            }
                                            <ng-container *ngTemplateOutlet="groupTemplate(); context: getGroupContext(option.optionGroup)"></ng-container>
                                        </li>
                                    } @else {
                                        <p-select-item
                                            [id]="$id() + '_' + getOptionIndex(i, scrollerOptions)"
                                            [option]="option"
                                            [checkmark]="checkmark()"
                                            [selected]="isSelected(option)"
                                            [label]="getOptionLabel(option)"
                                            [disabled]="isOptionDisabled(option)"
                                            [template]="itemTemplate()"
                                            [focused]="isOptionFocused(i, scrollerOptions)"
                                            [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                            [ariaSetSize]="ariaSetSize"
                                            [index]="i"
                                            [unstyled]="unstyled()"
                                            [scrollerOptions]="scrollerOptions"
                                            (onClick)="onOptionSelect($event, option)"
                                            (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                        ></p-select-item>
                                    }
                                }
                                @if (showEmptyFilterMessage()) {
                                    <li [class]="cx('emptyMessage')" [style]="getItemSizeStyle(scrollerOptions)" role="option" [pBind]="ptm('emptyMessage')">
                                        @if (!hasEmptyTemplate()) {
                                            {{ emptyFilterMessageLabel() }}
                                        } @else {
                                            <ng-container *ngTemplateOutlet="hasEmptyTemplate()"></ng-container>
                                        }
                                    </li>
                                }
                                @if (showEmptyMessage()) {
                                    <li [class]="cx('emptyMessage')" [style]="getItemSizeStyle(scrollerOptions)" role="option" [pBind]="ptm('emptyMessage')">
                                        @if (!emptyTemplate()) {
                                            {{ emptyMessageLabel() || emptyFilterMessageLabel() }}
                                        } @else {
                                            <ng-container *ngTemplateOutlet="emptyTemplate()"></ng-container>
                                        }
                                    </li>
                                }
                            </ul>
                        </ng-template>
                    </div>
                    <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [pBind]="ptm('hiddenLastFocusableEl')"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
      host: {
        "[class]": "cx('root')",
        "[attr.id]": "$id()",
        "[attr.data-p]": "containerDataP",
        "(click)": "onContainerClick($event)"
      },
      providers: [SELECT_VALUE_ACCESSOR, SelectStyle, { provide: SELECT_INSTANCE, useExisting: Select }, { provide: PARENT_INSTANCE, useExisting: Select }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      hostDirectives: [Bind]
    }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }], scrollHeight: [{ type: Input, args: [{ isSignal: true, alias: "scrollHeight", required: false }] }], filter: [{ type: Input, args: [{ isSignal: true, alias: "filter", required: false }] }], panelStyle: [{ type: Input, args: [{ isSignal: true, alias: "panelStyle", required: false }] }], panelStyleClass: [{ type: Input, args: [{ isSignal: true, alias: "panelStyleClass", required: false }] }], readonly: [{ type: Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], editable: [{ type: Input, args: [{ isSignal: true, alias: "editable", required: false }] }], tabindex: [{ type: Input, args: [{ isSignal: true, alias: "tabindex", required: false }] }], placeholder: [{ type: Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], loadingIcon: [{ type: Input, args: [{ isSignal: true, alias: "loadingIcon", required: false }] }], filterPlaceholder: [{ type: Input, args: [{ isSignal: true, alias: "filterPlaceholder", required: false }] }], filterLocale: [{ type: Input, args: [{ isSignal: true, alias: "filterLocale", required: false }] }], inputId: [{ type: Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], dataKey: [{ type: Input, args: [{ isSignal: true, alias: "dataKey", required: false }] }], filterBy: [{ type: Input, args: [{ isSignal: true, alias: "filterBy", required: false }] }], filterFields: [{ type: Input, args: [{ isSignal: true, alias: "filterFields", required: false }] }], autofocus: [{ type: Input, args: [{ isSignal: true, alias: "autofocus", required: false }] }], resetFilterOnHide: [{ type: Input, args: [{ isSignal: true, alias: "resetFilterOnHide", required: false }] }], checkmark: [{ type: Input, args: [{ isSignal: true, alias: "checkmark", required: false }] }], dropdownIcon: [{ type: Input, args: [{ isSignal: true, alias: "dropdownIcon", required: false }] }], loading: [{ type: Input, args: [{ isSignal: true, alias: "loading", required: false }] }], optionLabel: [{ type: Input, args: [{ isSignal: true, alias: "optionLabel", required: false }] }], optionValue: [{ type: Input, args: [{ isSignal: true, alias: "optionValue", required: false }] }], optionDisabled: [{ type: Input, args: [{ isSignal: true, alias: "optionDisabled", required: false }] }], optionGroupLabel: [{ type: Input, args: [{ isSignal: true, alias: "optionGroupLabel", required: false }] }], optionGroupChildren: [{ type: Input, args: [{ isSignal: true, alias: "optionGroupChildren", required: false }] }], group: [{ type: Input, args: [{ isSignal: true, alias: "group", required: false }] }], showClear: [{ type: Input, args: [{ isSignal: true, alias: "showClear", required: false }] }], emptyFilterMessage: [{ type: Input, args: [{ isSignal: true, alias: "emptyFilterMessage", required: false }] }], emptyMessage: [{ type: Input, args: [{ isSignal: true, alias: "emptyMessage", required: false }] }], lazy: [{ type: Input, args: [{ isSignal: true, alias: "lazy", required: false }] }], virtualScroll: [{ type: Input, args: [{ isSignal: true, alias: "virtualScroll", required: false }] }], virtualScrollItemSize: [{ type: Input, args: [{ isSignal: true, alias: "virtualScrollItemSize", required: false }] }], virtualScrollOptions: [{ type: Input, args: [{ isSignal: true, alias: "virtualScrollOptions", required: false }] }], overlayOptions: [{ type: Input, args: [{ isSignal: true, alias: "overlayOptions", required: false }] }], ariaFilterLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaFilterLabel", required: false }] }], ariaLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], ariaLabelledBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabelledBy", required: false }] }], filterMatchMode: [{ type: Input, args: [{ isSignal: true, alias: "filterMatchMode", required: false }] }], tooltip: [{ type: Input, args: [{ isSignal: true, alias: "tooltip", required: false }] }], tooltipPosition: [{ type: Input, args: [{ isSignal: true, alias: "tooltipPosition", required: false }] }], tooltipPositionStyle: [{ type: Input, args: [{ isSignal: true, alias: "tooltipPositionStyle", required: false }] }], tooltipStyleClass: [{ type: Input, args: [{ isSignal: true, alias: "tooltipStyleClass", required: false }] }], focusOnHover: [{ type: Input, args: [{ isSignal: true, alias: "focusOnHover", required: false }] }], selectOnFocus: [{ type: Input, args: [{ isSignal: true, alias: "selectOnFocus", required: false }] }], multiple: [{ type: Input, args: [{ isSignal: true, alias: "multiple", required: false }] }], autoOptionFocus: [{ type: Input, args: [{ isSignal: true, alias: "autoOptionFocus", required: false }] }], autofocusFilter: [{ type: Input, args: [{ isSignal: true, alias: "autofocusFilter", required: false }] }], filterValue: [{ type: Input, args: [{ isSignal: true, alias: "filterValue", required: false }] }], options: [{ type: Input, args: [{ isSignal: true, alias: "options", required: false }] }], appendTo: [{ type: Input, args: [{ isSignal: true, alias: "appendTo", required: false }] }], motionOptions: [{ type: Input, args: [{ isSignal: true, alias: "motionOptions", required: false }] }], onChange: [{ type: Output, args: ["onChange"] }], onFilter: [{ type: Output, args: ["onFilter"] }], onFocus: [{ type: Output, args: ["onFocus"] }], onBlur: [{ type: Output, args: ["onBlur"] }], onClick: [{ type: Output, args: ["onClick"] }], onShow: [{ type: Output, args: ["onShow"] }], onHide: [{ type: Output, args: ["onHide"] }], onClear: [{ type: Output, args: ["onClear"] }], onLazyLoad: [{ type: Output, args: ["onLazyLoad"] }], filterViewChild: [{ type: ViewChild, args: ["filter", { isSignal: true }] }], focusInputViewChild: [{ type: ViewChild, args: ["focusInput", { isSignal: true }] }], editableInputViewChild: [{ type: ViewChild, args: ["editableInput", { isSignal: true }] }], itemsViewChild: [{ type: ViewChild, args: ["items", { isSignal: true }] }], scroller: [{ type: ViewChild, args: ["scroller", { isSignal: true }] }], overlayViewChild: [{ type: ViewChild, args: ["overlay", { isSignal: true }] }], firstHiddenFocusableElementOnOverlay: [{ type: ViewChild, args: ["firstHiddenFocusableEl", { isSignal: true }] }], lastHiddenFocusableElementOnOverlay: [{ type: ViewChild, args: ["lastHiddenFocusableEl", { isSignal: true }] }], itemTemplate: [{ type: ContentChild, args: ["item", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], groupTemplate: [{ type: ContentChild, args: ["group", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], loaderTemplate: [{ type: ContentChild, args: ["loader", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], selectedItemTemplate: [{ type: ContentChild, args: ["selectedItem", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], headerTemplate: [{ type: ContentChild, args: ["header", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], filterTemplate: [{ type: ContentChild, args: ["filter", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], footerTemplate: [{ type: ContentChild, args: ["footer", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], emptyFilterTemplate: [{ type: ContentChild, args: ["emptyfilter", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], emptyTemplate: [{ type: ContentChild, args: ["empty", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], dropdownIconTemplate: [{ type: ContentChild, args: ["dropdownicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], loadingIconTemplate: [{ type: ContentChild, args: ["loadingicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], clearIconTemplate: [{ type: ContentChild, args: ["clearicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], filterIconTemplate: [{ type: ContentChild, args: ["filtericon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], onIconTemplate: [{ type: ContentChild, args: ["onicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], offIconTemplate: [{ type: ContentChild, args: ["officon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], cancelIconTemplate: [{ type: ContentChild, args: ["cancelicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }] });
})();
var SelectModule = class _SelectModule {
  static \u0275fac = function SelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _SelectModule,
    imports: [Select, SharedModule],
    exports: [Select, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Select, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectModule, [{
    type: NgModule,
    args: [{
      imports: [Select, SharedModule],
      exports: [Select, SharedModule]
    }]
  }], null, null);
})();

// src/app/core/i18n/api-error.ts
var apiErrorKey = (transloco, error, fallback) => {
  const code = error?.error?.code;
  if (typeof code !== "string") {
    return fallback;
  }
  const key = `errors.${code}`;
  return key in transloco.getTranslation(transloco.getActiveLang()) ? key : fallback;
};

export {
  BaseInput,
  Select,
  apiErrorKey
};
//# debugId=0d56caf3-4150-595b-9eb9-5d36937246a0
//# sourceMappingURL=chunk-XCX75N2L.js.map
