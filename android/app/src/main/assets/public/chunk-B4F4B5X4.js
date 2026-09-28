import {
  Motion,
  MotionModule
} from "./chunk-A62MHWYD.js";
import {
  BaseComponent,
  Bind,
  BindModule,
  ConnectedOverlayScrollHandler,
  CoreIcon,
  Fluid,
  ICON_TEMPLATE,
  PARENT_INSTANCE,
  Ripple,
  Spinner,
  s
} from "./chunk-QAKVLXKK.js";
import {
  ApplicationRef,
  BaseStyle,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Ft,
  G,
  Host,
  HostListener,
  Ht,
  I,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  L,
  NgModule,
  NgTemplateOutlet,
  Optional,
  Output,
  OverlayService,
  R2 as R,
  Renderer2,
  RuntimeError,
  Self,
  Service,
  SharedModule,
  SkipSelf,
  St,
  Subject,
  Subscription,
  V,
  Version,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  W,
  Y,
  Z,
  afterNextRender,
  b,
  booleanAttribute,
  computed,
  contentChild,
  d,
  effect,
  et,
  fe,
  forkJoin,
  formatRuntimeError,
  forwardRef,
  from,
  ft,
  getDOM,
  h,
  inject,
  input,
  isPlatformBrowser,
  isPromise,
  isSubscribable,
  j,
  k,
  kt,
  l,
  map,
  model,
  numberAttribute,
  output,
  re,
  setClassMetadata,
  signal,
  untracked,
  viewChild,
  z2 as z,
  zt,
  ɵɵControlFeature,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵdefineService,
  ɵɵdirectiveInject,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuerySignal
} from "./chunk-E45N4KGX.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// node_modules/@angular/forms/fesm2022/forms.mjs
/**
 * @license Angular v22.2.0
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var BaseControlValueAccessor = class _BaseControlValueAccessor {
  _renderer;
  _elementRef;
  onChange = (_) => {
  };
  onTouched = () => {
  };
  constructor(_renderer, _elementRef) {
    this._renderer = _renderer;
    this._elementRef = _elementRef;
  }
  setProperty(key, value) {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  setDisabledState(isDisabled) {
    this.setProperty("disabled", isDisabled);
  }
  static \u0275fac = function BaseControlValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseControlValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BaseControlValueAccessor
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseControlValueAccessor, [{
    type: Directive
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }], null);
})();
var BuiltInControlValueAccessor = class _BuiltInControlValueAccessor extends BaseControlValueAccessor {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275BuiltInControlValueAccessor_BaseFactory = void 0;
    return function BuiltInControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275BuiltInControlValueAccessor_BaseFactory || (\u0275BuiltInControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_BuiltInControlValueAccessor)))(__ngFactoryType__ || _BuiltInControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BuiltInControlValueAccessor,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BuiltInControlValueAccessor, [{
    type: Directive
  }], null, null);
})();
var NG_VALUE_ACCESSOR = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgValueAccessor" : "");
var CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxControlValueAccessor),
  multi: true
};
var CheckboxControlValueAccessor = class _CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
  writeValue(value) {
    this.setProperty("checked", value);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CheckboxControlValueAccessor_BaseFactory = void 0;
    return function CheckboxControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275CheckboxControlValueAccessor_BaseFactory || (\u0275CheckboxControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxControlValueAccessor)))(__ngFactoryType__ || _CheckboxControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CheckboxControlValueAccessor,
    selectors: [["input", "type", "checkbox", "formControlName", "", 3, "ngNoCva", ""], ["input", "type", "checkbox", "formControl", "", 3, "ngNoCva", ""], ["input", "type", "checkbox", "ngModel", "", 3, "ngNoCva", ""]],
    hostBindings: function CheckboxControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function CheckboxControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.checked);
        })("blur", function CheckboxControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([CHECKBOX_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=checkbox]:not([ngNoCva])[formControlName],input[type=checkbox]:not([ngNoCva])[formControl],input[type=checkbox]:not([ngNoCva])[ngModel]",
      host: {
        "(change)": "onChange($any($event.target).checked)",
        "(blur)": "onTouched()"
      },
      providers: [CHECKBOX_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, null);
})();
var DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DefaultValueAccessor),
  multi: true
};
function _isAndroid() {
  const userAgent = getDOM() ? getDOM().getUserAgent() : "";
  return /android (\d+)/.test(userAgent.toLowerCase());
}
var COMPOSITION_BUFFER_MODE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "CompositionEventMode" : "");
var DefaultValueAccessor = class _DefaultValueAccessor extends BaseControlValueAccessor {
  _compositionMode;
  _composing = false;
  constructor(renderer, elementRef, _compositionMode) {
    super(renderer, elementRef);
    this._compositionMode = _compositionMode;
    if (this._compositionMode == null) {
      this._compositionMode = !_isAndroid();
    }
  }
  writeValue(value) {
    const normalizedValue = value == null ? "" : value;
    this.setProperty("value", normalizedValue);
  }
  _handleInput(value) {
    if (!this._compositionMode || this._compositionMode && !this._composing) {
      this.onChange(value);
    }
  }
  _compositionStart() {
    this._composing = true;
  }
  _compositionEnd(value) {
    this._composing = false;
    this._compositionMode && this.onChange(value);
  }
  static \u0275fac = function DefaultValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DefaultValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(COMPOSITION_BUFFER_MODE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _DefaultValueAccessor,
    selectors: [["input", "formControlName", "", 3, "type", "checkbox", 3, "ngNoCva", ""], ["textarea", "formControlName", "", 3, "ngNoCva", ""], ["input", "formControl", "", 3, "type", "checkbox", 3, "ngNoCva", ""], ["textarea", "formControl", "", 3, "ngNoCva", ""], ["input", "ngModel", "", 3, "type", "checkbox", 3, "ngNoCva", ""], ["textarea", "ngModel", "", 3, "ngNoCva", ""], ["", "ngDefaultControl", ""]],
    hostBindings: function DefaultValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function DefaultValueAccessor_input_HostBindingHandler($event) {
          return ctx._handleInput($event.target.value);
        })("blur", function DefaultValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        })("compositionstart", function DefaultValueAccessor_compositionstart_HostBindingHandler() {
          return ctx._compositionStart();
        })("compositionend", function DefaultValueAccessor_compositionend_HostBindingHandler($event) {
          return ctx._compositionEnd($event.target.value);
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([DEFAULT_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input:not([type=checkbox]):not([ngNoCva])[formControlName],textarea:not([ngNoCva])[formControlName],input:not([type=checkbox]):not([ngNoCva])[formControl],textarea:not([ngNoCva])[formControl],input:not([type=checkbox]):not([ngNoCva])[ngModel],textarea:not([ngNoCva])[ngModel],[ngDefaultControl]",
      host: {
        "(input)": "_handleInput($any($event.target).value)",
        "(blur)": "onTouched()",
        "(compositionstart)": "_compositionStart()",
        "(compositionend)": "_compositionEnd($any($event.target).value)"
      },
      providers: [DEFAULT_VALUE_ACCESSOR],
      standalone: false
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [COMPOSITION_BUFFER_MODE]
    }]
  }], null);
})();
function isEmptyInputValue(value) {
  return value == null || lengthOrSize(value) === 0;
}
function lengthOrSize(value) {
  if (value == null) {
    return null;
  } else if (Array.isArray(value) || typeof value === "string") {
    return value.length;
  } else if (value instanceof Set) {
    return value.size;
  }
  return null;
}
var NG_VALIDATORS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgValidators" : "");
var NG_ASYNC_VALIDATORS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgAsyncValidators" : "");
var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Validators = class {
  static min(min) {
    return minValidator(min);
  }
  static max(max) {
    return maxValidator(max);
  }
  static required(control) {
    return requiredValidator(control);
  }
  static requiredTrue(control) {
    return requiredTrueValidator(control);
  }
  static email(control) {
    return emailValidator(control);
  }
  static minLength(minLength) {
    return minLengthValidator(minLength);
  }
  static maxLength(maxLength) {
    return maxLengthValidator(maxLength);
  }
  static pattern(pattern) {
    return patternValidator(pattern);
  }
  static nullValidator(control) {
    return nullValidator();
  }
  static compose(validators) {
    return compose(validators);
  }
  static composeAsync(validators) {
    return composeAsync(validators);
  }
};
function minValidator(min) {
  return (control) => {
    if (control.value == null || min == null) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value < min ? {
      "min": {
        "min": min,
        "actual": control.value
      }
    } : null;
  };
}
function maxValidator(max) {
  return (control) => {
    if (control.value == null || max == null) {
      return null;
    }
    const value = parseFloat(control.value);
    return !isNaN(value) && value > max ? {
      "max": {
        "max": max,
        "actual": control.value
      }
    } : null;
  };
}
function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? {
    "required": true
  } : null;
}
function requiredTrueValidator(control) {
  return control.value === true ? null : {
    "required": true
  };
}
function emailValidator(control) {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : {
    "email": true
  };
}
function minLengthValidator(minLength) {
  return (control) => {
    const length = control.value?.length ?? lengthOrSize(control.value);
    if (length === null || length === 0) {
      return null;
    }
    return length < minLength ? {
      "minlength": {
        "requiredLength": minLength,
        "actualLength": length
      }
    } : null;
  };
}
function maxLengthValidator(maxLength) {
  return (control) => {
    const length = control.value?.length ?? lengthOrSize(control.value);
    if (length !== null && length > maxLength) {
      return {
        "maxlength": {
          "requiredLength": maxLength,
          "actualLength": length
        }
      };
    }
    return null;
  };
}
function patternValidator(pattern) {
  if (!pattern) return nullValidator;
  let regex;
  let regexStr;
  if (typeof pattern === "string") {
    regexStr = "";
    if (pattern.charAt(0) !== "^") regexStr += "^";
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== "$") regexStr += "$";
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return (control) => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const value = control.value;
    return regex.test(value) ? null : {
      "pattern": {
        "requiredPattern": regexStr,
        "actualValue": value
      }
    };
  };
}
function nullValidator(control) {
  return null;
}
function isPresent(o2) {
  return o2 != null;
}
function toObservable(value) {
  const obs = isPromise(value) ? from(value) : value;
  if ((typeof ngDevMode === "undefined" || ngDevMode) && !isSubscribable(obs)) {
    let errorMessage = `Expected async validator to return Promise or Observable.`;
    if (typeof value === "object") {
      errorMessage += " Are you using a synchronous validator where an async validator is expected?";
    }
    throw new RuntimeError(-1101, errorMessage);
  }
  return obs;
}
function mergeErrors(arrayOfErrors) {
  let res = {};
  arrayOfErrors.forEach((errors) => {
    res = errors != null ? __spreadValues(__spreadValues({}, res), errors) : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}
function executeValidators(control, validators) {
  return validators.map((validator) => validator(control));
}
function isValidatorFn(validator) {
  return !validator.validate;
}
function normalizeValidators(validators) {
  return validators.map((validator) => {
    return isValidatorFn(validator) ? validator : (c) => validator.validate(c);
  });
}
function compose(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
function composeAsync(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return forkJoin(observables).pipe(map(mergeErrors));
  };
}
function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null) return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
function getControlValidators(control) {
  return control._rawValidators;
}
function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
function makeValidatorsArray(validators) {
  if (!validators) return [];
  return Array.isArray(validators) ? validators : [validators];
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  const validatorsToAdd = makeValidatorsArray(validators);
  validatorsToAdd.forEach((v) => {
    if (!hasValidator(current, v)) {
      current.push(v);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var AbstractControlDirective = class {
  get value() {
    return this.control ? this.control.value : null;
  }
  get valid() {
    return this.control ? this.control.valid : null;
  }
  get invalid() {
    return this.control ? this.control.invalid : null;
  }
  get pending() {
    return this.control ? this.control.pending : null;
  }
  get disabled() {
    return this.control ? this.control.disabled : null;
  }
  get enabled() {
    return this.control ? this.control.enabled : null;
  }
  get errors() {
    return this.control ? this.control.errors : null;
  }
  get pristine() {
    return this.control ? this.control.pristine : null;
  }
  get dirty() {
    return this.control ? this.control.dirty : null;
  }
  get touched() {
    return this.control ? this.control.touched : null;
  }
  get status() {
    return this.control ? this.control.status : null;
  }
  get untouched() {
    return this.control ? this.control.untouched : null;
  }
  get statusChanges() {
    return this.control ? this.control.statusChanges : null;
  }
  get valueChanges() {
    return this.control ? this.control.valueChanges : null;
  }
  get path() {
    return null;
  }
  _composedValidatorFn;
  _composedAsyncValidatorFn;
  _rawValidators = [];
  _rawAsyncValidators = [];
  _setValidators(validators) {
    this._rawValidators = validators || [];
    this._composedValidatorFn = composeValidators(this._rawValidators);
  }
  _setAsyncValidators(validators) {
    this._rawAsyncValidators = validators || [];
    this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
  }
  get validator() {
    return this._composedValidatorFn || null;
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn || null;
  }
  _onDestroyCallbacks = [];
  _registerOnDestroy(fn) {
    this._onDestroyCallbacks.push(fn);
  }
  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach((fn) => fn());
    this._onDestroyCallbacks = [];
  }
  reset(value = void 0) {
    this.control?.reset(value);
  }
  hasError(errorCode, path) {
    return this.control ? this.control.hasError(errorCode, path) : false;
  }
  getError(errorCode, path) {
    return this.control ? this.control.getError(errorCode, path) : null;
  }
};
var ControlContainer = class extends AbstractControlDirective {
  name;
  get formDirective() {
    return null;
  }
  get path() {
    return null;
  }
};
var formControlNameExample = `
  <div [formGroup]="myGroup">
    <input formControlName="firstName">
  </div>

  In your class:

  this.myGroup = new FormGroup({
      firstName: new FormControl()
  });`;
var formGroupNameExample = `
  <div [formGroup]="myGroup">
      <div formGroupName="person">
        <input formControlName="firstName">
      </div>
  </div>

  In your class:

  this.myGroup = new FormGroup({
      person: new FormGroup({ firstName: new FormControl() })
  });`;
var formArrayNameExample = `
  <div [formGroup]="myGroup">
    <div formArrayName="cities">
      <div *ngFor="let city of cityArray.controls; index as i">
        <input [formControlName]="i">
      </div>
    </div>
  </div>

  In your class:

  this.cityArray = new FormArray([new FormControl('SF')]);
  this.myGroup = new FormGroup({
    cities: this.cityArray
  });`;
var ngModelGroupExample = `
  <form>
      <div ngModelGroup="person">
        <input [(ngModel)]="person.name" name="firstName">
      </div>
  </form>`;
var ngModelWithFormGroupExample = `
  <div [formGroup]="myGroup">
      <input formControlName="firstName">
      <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">
  </div>
`;
var VERSION = /* @__PURE__ */ new Version("22.2.0");
function controlParentException(nameOrIndex) {
  return new RuntimeError(1050, `formControlName must be used with a parent formGroup or formArray directive. You'll want to add a formGroup/formArray
      directive and pass it an existing FormGroup/FormArray instance (you can create one in your class).

      ${describeFormControl(nameOrIndex)}

    Example:

    ${formControlNameExample}`);
}
function describeFormControl(nameOrIndex) {
  if (nameOrIndex == null || nameOrIndex === "") {
    return "";
  }
  const valueType = typeof nameOrIndex === "string" ? "name" : "index";
  return `Affected Form Control ${valueType}: "${nameOrIndex}"`;
}
function ngModelGroupException() {
  return new RuntimeError(1051, `formControlName cannot be used with an ngModelGroup parent. It is only compatible with parents
      that also have a "form" prefix: formGroupName, formArrayName, or formGroup.

      Option 1:  Update the parent to be formGroupName (reactive form strategy)

      ${formGroupNameExample}

      Option 2: Use ngModel instead of formControlName (template-driven strategy)

      ${ngModelGroupExample}`);
}
function missingFormException() {
  return new RuntimeError(1052, `formGroup expects a FormGroup instance. Please pass one in.

      Example:

      ${formControlNameExample}`);
}
function groupParentException() {
  return new RuntimeError(1053, `formGroupName must be used with a parent formGroup directive.  You'll want to add a formGroup
    directive and pass it an existing FormGroup instance (you can create one in your class).

    Example:

    ${formGroupNameExample}`);
}
function arrayParentException() {
  return new RuntimeError(1054, `formArrayName must be used with a parent formGroup directive.  You'll want to add a formGroup
      directive and pass it an existing FormGroup instance (you can create one in your class).

      Example:

      ${formArrayNameExample}`);
}
var disabledAttrWarning = `
  It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
  when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
  you. We recommend using this approach to avoid 'changed after checked' errors.

  Example:
  // Specify the \`disabled\` property at control creation time:
  form = new FormGroup({
    first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    last: new FormControl('Drew', Validators.required)
  });

  // Controls can also be enabled/disabled after creation:
  form.get('first')?.enable();
  form.get('last')?.disable();
`;
var asyncValidatorsDroppedWithOptsWarning = `
  It looks like you're constructing using a FormControl with both an options argument and an
  async validators argument. Mixing these arguments will cause your async validators to be dropped.
  You should either put all your validators in the options object, or in separate validators
  arguments. For example:

  // Using validators arguments
  fc = new FormControl(42, Validators.required, myAsyncValidator);

  // Using AbstractControlOptions
  fc = new FormControl(42, {validators: Validators.required, asyncValidators: myAV});

  // Do NOT mix them: async validators will be dropped!
  fc = new FormControl(42, {validators: Validators.required}, /* Oops! */ myAsyncValidator);
`;
function ngModelWarning(directiveName) {
  const versionSubDomain = VERSION.major !== "0" ? `v${VERSION.major}.` : "";
  return `
  It looks like you're using ngModel on the same form field as ${directiveName}.
  Support for using the ngModel input property and ngModelChange event with
  reactive form directives has been deprecated in Angular v6 and will be removed
  in a future version of Angular.

  For more information on this, see our API docs here:
  https://${versionSubDomain}angular.dev/api/forms/${directiveName === "formControl" ? "FormControlDirective" : "FormControlName"}
  `;
}
function describeKey(isFormGroup, key) {
  return isFormGroup ? `with name: '${key}'` : `at index: ${key}`;
}
function noControlsError(isFormGroup) {
  return `
    There are no form controls registered with this ${isFormGroup ? "group" : "array"} yet. If you're using ngModel,
    you may want to check next tick (e.g. use setTimeout).
  `;
}
function missingControlError(isFormGroup, key) {
  return `Cannot find form control ${describeKey(isFormGroup, key)}`;
}
function missingControlValueError(isFormGroup, key) {
  return `Must supply a value for form control ${describeKey(isFormGroup, key)}`;
}
var VALID = "VALID";
var INVALID = "INVALID";
var PENDING = "PENDING";
var DISABLED = "DISABLED";
var ControlEvent = class {
};
var ValueChangeEvent = class extends ControlEvent {
  value;
  source;
  constructor(value, source) {
    super();
    this.value = value;
    this.source = source;
  }
};
var PristineChangeEvent = class extends ControlEvent {
  pristine;
  source;
  constructor(pristine, source) {
    super();
    this.pristine = pristine;
    this.source = source;
  }
};
var TouchedChangeEvent = class extends ControlEvent {
  touched;
  source;
  constructor(touched, source) {
    super();
    this.touched = touched;
    this.source = source;
  }
};
var StatusChangeEvent = class extends ControlEvent {
  status;
  source;
  constructor(status, source) {
    super();
    this.status = status;
    this.source = source;
  }
};
var FormSubmittedEvent = class extends ControlEvent {
  source;
  constructor(source) {
    super();
    this.source = source;
  }
};
var FormResetEvent = class extends ControlEvent {
  source;
  constructor(source) {
    super();
    this.source = source;
  }
};
function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (isOptionsObj(validatorOrOpts) && asyncValidator) {
      console.warn(asyncValidatorsDroppedWithOptsWarning);
    }
  }
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}
function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === "object";
}
function assertControlPresent(parent, isGroup, key) {
  const controls = parent.controls;
  const collection = isGroup ? Object.keys(controls) : controls;
  if (!collection.length) {
    throw new RuntimeError(1e3, typeof ngDevMode === "undefined" || ngDevMode ? noControlsError(isGroup) : "");
  }
  if (!hasOwnControl(controls, key)) {
    throw new RuntimeError(1001, typeof ngDevMode === "undefined" || ngDevMode ? missingControlError(isGroup, key) : "");
  }
}
function assertAllValuesPresent(control, isGroup, value) {
  control._forEachChild((_, key) => {
    if (value[key] === void 0) {
      throw new RuntimeError(-1002, typeof ngDevMode === "undefined" || ngDevMode ? missingControlValueError(isGroup, key) : "");
    }
  });
}
var AbstractControl = class {
  _pendingDirty = false;
  _hasOwnPendingAsyncValidator = null;
  _pendingTouched = false;
  _onCollectionChange = () => {
  };
  _updateOn;
  _hasRequired = signal(false, ...ngDevMode ? [{
    debugName: "_hasRequired"
  }] : []);
  _parent = null;
  _asyncValidationSubscription;
  _composedValidatorFn;
  _composedAsyncValidatorFn;
  _rawValidators;
  _rawAsyncValidators;
  value;
  constructor(validators, asyncValidators) {
    this._assignValidators(validators);
    this._assignAsyncValidators(asyncValidators);
  }
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
    this._updateHasRequiredValidator();
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  get parent() {
    return this._parent;
  }
  get status() {
    return untracked(this.statusReactive);
  }
  set status(v) {
    untracked(() => this.statusReactive.set(v));
  }
  _status = computed(() => this.statusReactive(), ...ngDevMode ? [{
    debugName: "_status"
  }] : []);
  statusReactive = signal(void 0, ...ngDevMode ? [{
    debugName: "statusReactive"
  }] : []);
  get valid() {
    return this.status === VALID;
  }
  get invalid() {
    return this.status === INVALID;
  }
  get pending() {
    return this.status === PENDING;
  }
  get disabled() {
    return this.status === DISABLED;
  }
  get enabled() {
    return this.status !== DISABLED;
  }
  errors;
  get pristine() {
    return untracked(this.pristineReactive);
  }
  set pristine(v) {
    untracked(() => this.pristineReactive.set(v));
  }
  _pristine = computed(() => this.pristineReactive(), ...ngDevMode ? [{
    debugName: "_pristine"
  }] : []);
  pristineReactive = signal(true, ...ngDevMode ? [{
    debugName: "pristineReactive"
  }] : []);
  get dirty() {
    return !this.pristine;
  }
  get touched() {
    return untracked(this.touchedReactive);
  }
  set touched(v) {
    untracked(() => this.touchedReactive.set(v));
  }
  _touched = computed(() => this.touchedReactive(), ...ngDevMode ? [{
    debugName: "_touched"
  }] : []);
  touchedReactive = signal(false, ...ngDevMode ? [{
    debugName: "touchedReactive"
  }] : []);
  get untouched() {
    return !this.touched;
  }
  _events = new Subject();
  events = this._events.asObservable();
  valueChanges;
  statusChanges;
  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
  }
  setValidators(validators) {
    this._assignValidators(validators);
  }
  setAsyncValidators(validators) {
    this._assignAsyncValidators(validators);
  }
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  clearValidators() {
    this.validator = null;
  }
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  markAsTouched(opts = {}) {
    const changed = this.touched === false;
    this.touched = true;
    const sourceControl = opts.sourceControl ?? this;
    if (!opts.onlySelf) {
      this._parent?.markAsTouched(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new TouchedChangeEvent(true, sourceControl));
    }
  }
  markAllAsDirty(opts = {}) {
    this.markAsDirty({
      onlySelf: true,
      emitEvent: opts.emitEvent,
      sourceControl: this
    });
    this._forEachChild((control) => control.markAllAsDirty(opts));
  }
  markAllAsTouched(opts = {}) {
    this.markAsTouched({
      onlySelf: true,
      emitEvent: opts.emitEvent,
      sourceControl: this
    });
    this._forEachChild((control) => control.markAllAsTouched(opts));
  }
  markAsUntouched(opts = {}) {
    const changed = this.touched === true;
    this.touched = false;
    this._pendingTouched = false;
    const sourceControl = opts.sourceControl ?? this;
    this._forEachChild((control) => {
      control.markAsUntouched({
        onlySelf: true,
        emitEvent: opts.emitEvent,
        sourceControl
      });
    });
    if (!opts.onlySelf) {
      this._parent?._updateTouched(opts, sourceControl);
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new TouchedChangeEvent(false, sourceControl));
    }
  }
  markAsDirty(opts = {}) {
    const changed = this.pristine === true;
    this.pristine = false;
    const sourceControl = opts.sourceControl ?? this;
    if (!opts.onlySelf) {
      this._parent?.markAsDirty(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new PristineChangeEvent(false, sourceControl));
    }
  }
  markAsPristine(opts = {}) {
    const changed = this.pristine === false;
    this.pristine = true;
    this._pendingDirty = false;
    const sourceControl = opts.sourceControl ?? this;
    this._forEachChild((control) => {
      control.markAsPristine({
        onlySelf: true,
        emitEvent: opts.emitEvent
      });
    });
    if (!opts.onlySelf) {
      this._parent?._updatePristine(opts, sourceControl);
    }
    if (changed && opts.emitEvent !== false) {
      this._events.next(new PristineChangeEvent(true, sourceControl));
    }
  }
  markAsPending(opts = {}) {
    this.status = PENDING;
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.statusChanges.emit(this.status);
    }
    if (!opts.onlySelf) {
      this._parent?.markAsPending(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
  }
  disable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = DISABLED;
    this.errors = null;
    this._forEachChild((control) => {
      control.disable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this._updateValue();
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }), this);
    this._onDisabledChange.forEach((changeFn) => changeFn(true));
  }
  enable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = VALID;
    this._forEachChild((control) => {
      control.enable(__spreadProps(__spreadValues({}, opts), {
        onlySelf: true
      }));
    });
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
    this._updateAncestors(__spreadProps(__spreadValues({}, opts), {
      skipPristineCheck
    }), this);
    this._onDisabledChange.forEach((changeFn) => changeFn(false));
  }
  _updateAncestors(opts, sourceControl) {
    if (!opts.onlySelf) {
      this._parent?.updateValueAndValidity(opts);
      if (!opts.skipPristineCheck) {
        this._parent?._updatePristine({}, sourceControl);
      }
      this._parent?._updateTouched({}, sourceControl);
    }
  }
  setParent(parent) {
    this._parent = parent;
  }
  getRawValue() {
    return this.value;
  }
  updateValueAndValidity(opts = {}) {
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
      const shouldHaveEmitted = this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.status = this._calculateStatus();
      if (this.status === VALID || this.status === PENDING) {
        this._runAsyncValidator(shouldHaveEmitted, opts.emitEvent);
      }
    }
    const sourceControl = opts.sourceControl ?? this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    if (!opts.onlySelf) {
      this._parent?.updateValueAndValidity(__spreadProps(__spreadValues({}, opts), {
        sourceControl
      }));
    }
  }
  _updateTreeValidity(opts = {
    emitEvent: true
  }) {
    this._forEachChild((ctrl) => ctrl._updateTreeValidity(opts));
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(shouldHaveEmitted, emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = {
        emitEvent: emitEvent !== false,
        shouldHaveEmitted: shouldHaveEmitted !== false
      };
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe((errors) => {
        this._hasOwnPendingAsyncValidator = null;
        this.setErrors(errors, {
          emitEvent,
          shouldHaveEmitted
        });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      const shouldHaveEmitted = (this._hasOwnPendingAsyncValidator?.emitEvent || this._hasOwnPendingAsyncValidator?.shouldHaveEmitted) ?? false;
      this._hasOwnPendingAsyncValidator = null;
      return shouldHaveEmitted;
    }
    return false;
  }
  setErrors(errors, opts = {}) {
    this.errors = errors;
    this._updateControlsErrors(opts.emitEvent !== false, this, opts.shouldHaveEmitted);
  }
  get(path) {
    let currPath = path;
    if (currPath == null) return null;
    if (!Array.isArray(currPath)) currPath = currPath.split(".");
    if (currPath.length === 0) return null;
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return control?.errors ? control.errors[errorCode] : null;
  }
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  get root() {
    let x = this;
    while (x._parent) {
      x = x._parent;
    }
    return x;
  }
  _updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted) {
    this.status = this._calculateStatus();
    if (emitEvent) {
      this.statusChanges.emit(this.status);
    }
    if (emitEvent || shouldHaveEmitted) {
      this._events.next(new StatusChangeEvent(this.status, changedControl));
    }
    if (this._parent) {
      this._parent._updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted);
    }
  }
  _initObservables() {
    this.valueChanges = new EventEmitter();
    this.statusChanges = new EventEmitter();
  }
  _calculateStatus() {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }
  _anyControlsHaveStatus(status) {
    return this._anyControls((control) => control.status === status);
  }
  _anyControlsDirty() {
    return this._anyControls((control) => control.dirty);
  }
  _anyControlsTouched() {
    return this._anyControls((control) => control.touched);
  }
  _updatePristine(opts, changedControl) {
    const newPristine = !this._anyControlsDirty();
    const changed = this.pristine !== newPristine;
    this.pristine = newPristine;
    if (!opts.onlySelf) {
      this._parent?._updatePristine(opts, changedControl);
    }
    if (changed) {
      this._events.next(new PristineChangeEvent(this.pristine, changedControl));
    }
  }
  _updateTouched(opts = {}, changedControl) {
    this.touched = this._anyControlsTouched();
    this._events.next(new TouchedChangeEvent(this.touched, changedControl));
    if (!opts.onlySelf) {
      this._parent?._updateTouched(opts, changedControl);
    }
  }
  _onDisabledChange = [];
  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) {
      this._updateOn = opts.updateOn;
    }
  }
  _parentMarkedDirty(onlySelf) {
    return !onlySelf && !!this._parent?.dirty && !this._parent._anyControlsDirty();
  }
  _find(name) {
    return null;
  }
  _assignValidators(validators) {
    this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
    this._updateHasRequiredValidator();
  }
  _assignAsyncValidators(validators) {
    this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
  _updateHasRequiredValidator() {
    untracked(() => this._hasRequired.set(this.hasValidator(Validators.required)));
  }
};
function hasOwnControl(controls, name) {
  return Object.hasOwn(controls, name);
}
function isNativeFormElement(element) {
  return element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA";
}
function setNativeDomProperty(renderer, element, name, value) {
  switch (name) {
    case "name":
      renderer.setAttribute(element, name, value);
      break;
    case "disabled":
    case "readonly":
    case "required":
      if (value) {
        renderer.setAttribute(element, name, "");
      } else {
        renderer.removeAttribute(element, name);
      }
      break;
    case "max":
    case "min":
    case "minLength":
    case "maxLength":
      if (value !== void 0) {
        renderer.setAttribute(element, name, value.toString());
      } else {
        renderer.removeAttribute(element, name);
      }
      break;
  }
}
var ReactiveValidationError = class {
  kind;
  context;
  control;
  message;
  constructor({
    kind,
    context,
    control
  }) {
    this.kind = kind;
    this.context = context;
    this.control = control;
  }
};
function toInteger(value) {
  return typeof value === "number" ? value : parseInt(value, 10);
}
function toFloat(value) {
  return typeof value === "number" ? value : parseFloat(value);
}
var AbstractValidatorDirective = class _AbstractValidatorDirective {
  _validator = nullValidator;
  _onChange;
  _enabled;
  ngOnChanges(changes) {
    if (this.inputName in changes) {
      const input2 = this.normalizeInput(changes[this.inputName].currentValue);
      this._enabled = this.enabled(input2);
      this._validator = this._enabled ? this.createValidator(input2) : nullValidator;
      this._onChange?.();
    }
  }
  validate(control) {
    return this._validator(control);
  }
  registerOnValidatorChange(fn) {
    this._onChange = fn;
  }
  enabled(input2) {
    return input2 != null;
  }
  static \u0275fac = function AbstractValidatorDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AbstractValidatorDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _AbstractValidatorDirective,
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractValidatorDirective, [{
    type: Directive
  }], null, null);
})();
var MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxValidator),
  multi: true
};
var MaxValidator = class _MaxValidator extends AbstractValidatorDirective {
  max;
  inputName = "max";
  normalizeInput = (input2) => toFloat(input2);
  createValidator = (max) => maxValidator(max);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MaxValidator_BaseFactory = void 0;
    return function MaxValidator_Factory(__ngFactoryType__) {
      return (\u0275MaxValidator_BaseFactory || (\u0275MaxValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MaxValidator)))(__ngFactoryType__ || _MaxValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MaxValidator,
    selectors: [["input", "type", "number", "max", "", "formControlName", ""], ["input", "type", "number", "max", "", "formControl", ""], ["input", "type", "number", "max", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MaxValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("max", ctx._enabled ? ctx.max : null);
      }
    },
    inputs: {
      max: "max"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MAX_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaxValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]",
      providers: [MAX_VALIDATOR],
      host: {
        "[attr.max]": "_enabled ? max : null"
      },
      standalone: false
    }]
  }], null, {
    max: [{
      type: Input
    }]
  });
})();
var MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};
var MinValidator = class _MinValidator extends AbstractValidatorDirective {
  min;
  inputName = "min";
  normalizeInput = (input2) => toFloat(input2);
  createValidator = (min) => minValidator(min);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MinValidator_BaseFactory = void 0;
    return function MinValidator_Factory(__ngFactoryType__) {
      return (\u0275MinValidator_BaseFactory || (\u0275MinValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MinValidator)))(__ngFactoryType__ || _MinValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MinValidator,
    selectors: [["input", "type", "number", "min", "", "formControlName", ""], ["input", "type", "number", "min", "", "formControl", ""], ["input", "type", "number", "min", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MinValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("min", ctx._enabled ? ctx.min : null);
      }
    },
    inputs: {
      min: "min"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MIN_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]",
      providers: [MIN_VALIDATOR],
      host: {
        "[attr.min]": "_enabled ? min : null"
      },
      standalone: false
    }]
  }], null, {
    min: [{
      type: Input
    }]
  });
})();
var REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredValidator),
  multi: true
};
var CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CheckboxRequiredValidator),
  multi: true
};
var RequiredValidator = class _RequiredValidator extends AbstractValidatorDirective {
  required;
  inputName = "required";
  normalizeInput = booleanAttribute;
  createValidator = (input2) => requiredValidator;
  enabled(input2) {
    return input2;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275RequiredValidator_BaseFactory = void 0;
    return function RequiredValidator_Factory(__ngFactoryType__) {
      return (\u0275RequiredValidator_BaseFactory || (\u0275RequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_RequiredValidator)))(__ngFactoryType__ || _RequiredValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _RequiredValidator,
    selectors: [["", "required", "", "formControlName", "", 3, "type", "checkbox"], ["", "required", "", "formControl", "", 3, "type", "checkbox"], ["", "required", "", "ngModel", "", 3, "type", "checkbox"]],
    hostVars: 1,
    hostBindings: function RequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("required", ctx._enabled ? "" : null);
      }
    },
    inputs: {
      required: "required"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RequiredValidator, [{
    type: Directive,
    args: [{
      selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]",
      providers: [REQUIRED_VALIDATOR],
      host: {
        "[attr.required]": '_enabled ? "" : null'
      },
      standalone: false
    }]
  }], null, {
    required: [{
      type: Input
    }]
  });
})();
var CheckboxRequiredValidator = class _CheckboxRequiredValidator extends RequiredValidator {
  createValidator = (input2) => requiredTrueValidator;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CheckboxRequiredValidator_BaseFactory = void 0;
    return function CheckboxRequiredValidator_Factory(__ngFactoryType__) {
      return (\u0275CheckboxRequiredValidator_BaseFactory || (\u0275CheckboxRequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxRequiredValidator)))(__ngFactoryType__ || _CheckboxRequiredValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CheckboxRequiredValidator,
    selectors: [["input", "type", "checkbox", "required", "", "formControlName", ""], ["input", "type", "checkbox", "required", "", "formControl", ""], ["input", "type", "checkbox", "required", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function CheckboxRequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("required", ctx._enabled ? "" : null);
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([CHECKBOX_REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxRequiredValidator, [{
    type: Directive,
    args: [{
      selector: "input[type=checkbox][required][formControlName],input[type=checkbox][required][formControl],input[type=checkbox][required][ngModel]",
      providers: [CHECKBOX_REQUIRED_VALIDATOR],
      host: {
        "[attr.required]": '_enabled ? "" : null'
      },
      standalone: false
    }]
  }], null, null);
})();
var EMAIL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidator),
  multi: true
};
var EmailValidator = class _EmailValidator extends AbstractValidatorDirective {
  email;
  inputName = "email";
  normalizeInput = booleanAttribute;
  createValidator = (input2) => emailValidator;
  enabled(input2) {
    return input2;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275EmailValidator_BaseFactory = void 0;
    return function EmailValidator_Factory(__ngFactoryType__) {
      return (\u0275EmailValidator_BaseFactory || (\u0275EmailValidator_BaseFactory = \u0275\u0275getInheritedFactory(_EmailValidator)))(__ngFactoryType__ || _EmailValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _EmailValidator,
    selectors: [["", "email", "", "formControlName", ""], ["", "email", "", "formControl", ""], ["", "email", "", "ngModel", ""]],
    inputs: {
      email: "email"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([EMAIL_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailValidator, [{
    type: Directive,
    args: [{
      selector: "[email][formControlName],[email][formControl],[email][ngModel]",
      providers: [EMAIL_VALIDATOR],
      standalone: false
    }]
  }], null, {
    email: [{
      type: Input
    }]
  });
})();
var MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinLengthValidator),
  multi: true
};
var MinLengthValidator = class _MinLengthValidator extends AbstractValidatorDirective {
  minlength;
  inputName = "minlength";
  normalizeInput = (input2) => toInteger(input2);
  createValidator = (minlength) => minLengthValidator(minlength);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MinLengthValidator_BaseFactory = void 0;
    return function MinLengthValidator_Factory(__ngFactoryType__) {
      return (\u0275MinLengthValidator_BaseFactory || (\u0275MinLengthValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MinLengthValidator)))(__ngFactoryType__ || _MinLengthValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MinLengthValidator,
    selectors: [["", "minlength", "", "formControlName", ""], ["", "minlength", "", "formControl", ""], ["", "minlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MinLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("minlength", ctx._enabled ? ctx.minlength : null);
      }
    },
    inputs: {
      minlength: "minlength"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MIN_LENGTH_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinLengthValidator, [{
    type: Directive,
    args: [{
      selector: "[minlength][formControlName],[minlength][formControl],[minlength][ngModel]",
      providers: [MIN_LENGTH_VALIDATOR],
      host: {
        "[attr.minlength]": "_enabled ? minlength : null"
      },
      standalone: false
    }]
  }], null, {
    minlength: [{
      type: Input
    }]
  });
})();
var MAX_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxLengthValidator),
  multi: true
};
var MaxLengthValidator = class _MaxLengthValidator extends AbstractValidatorDirective {
  maxlength;
  inputName = "maxlength";
  normalizeInput = (input2) => toInteger(input2);
  createValidator = (maxlength) => maxLengthValidator(maxlength);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MaxLengthValidator_BaseFactory = void 0;
    return function MaxLengthValidator_Factory(__ngFactoryType__) {
      return (\u0275MaxLengthValidator_BaseFactory || (\u0275MaxLengthValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MaxLengthValidator)))(__ngFactoryType__ || _MaxLengthValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MaxLengthValidator,
    selectors: [["", "maxlength", "", "formControlName", ""], ["", "maxlength", "", "formControl", ""], ["", "maxlength", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function MaxLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("maxlength", ctx._enabled ? ctx.maxlength : null);
      }
    },
    inputs: {
      maxlength: "maxlength"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([MAX_LENGTH_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MaxLengthValidator, [{
    type: Directive,
    args: [{
      selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]",
      providers: [MAX_LENGTH_VALIDATOR],
      host: {
        "[attr.maxlength]": "_enabled ? maxlength : null"
      },
      standalone: false
    }]
  }], null, {
    maxlength: [{
      type: Input
    }]
  });
})();
var PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PatternValidator),
  multi: true
};
var PatternValidator = class _PatternValidator extends AbstractValidatorDirective {
  pattern;
  inputName = "pattern";
  normalizeInput = (input2) => input2;
  createValidator = (input2) => patternValidator(input2);
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275PatternValidator_BaseFactory = void 0;
    return function PatternValidator_Factory(__ngFactoryType__) {
      return (\u0275PatternValidator_BaseFactory || (\u0275PatternValidator_BaseFactory = \u0275\u0275getInheritedFactory(_PatternValidator)))(__ngFactoryType__ || _PatternValidator);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _PatternValidator,
    selectors: [["", "pattern", "", "formControlName", ""], ["", "pattern", "", "formControl", ""], ["", "pattern", "", "ngModel", ""]],
    hostVars: 1,
    hostBindings: function PatternValidator_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("pattern", ctx._enabled ? ctx.pattern : null);
      }
    },
    inputs: {
      pattern: "pattern"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([PATTERN_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatternValidator, [{
    type: Directive,
    args: [{
      selector: "[pattern][formControlName],[pattern][formControl],[pattern][ngModel]",
      providers: [PATTERN_VALIDATOR],
      host: {
        "[attr.pattern]": "_enabled ? pattern : null"
      },
      standalone: false
    }]
  }], null, {
    pattern: [{
      type: Input
    }]
  });
})();
var \u0275FORM_CONTROL_INTEGRATION = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "FORM_CONTROL_INTEGRATION" : "");
var CALL_SET_DISABLED_STATE = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "CallSetDisabledState" : "", {
  factory: () => setDisabledStateDefault
});
var setDisabledStateDefault = "always";
function controlPath(name, parent) {
  return [...parent.path, name];
}
function setUpControlValueAccessor(control, dir, callSetDisabledState = setDisabledStateDefault) {
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    if (!control) _throwError(dir, "Cannot find control with");
    if (!dir.valueAccessor) _throwMissingValueAccessorError(dir);
  }
  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  if (control.disabled || callSetDisabledState === "always") {
    dir.valueAccessor.setDisabledState?.(control.disabled);
  }
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
function cleanUpControl(control, dir, validateControlPresenceOnChange = true) {
  const noop = () => {
    if (validateControlPresenceOnChange && (typeof ngDevMode === "undefined" || ngDevMode)) {
      _noControlError(dir);
    }
  };
  dir?.valueAccessor?.registerOnChange(noop);
  dir?.valueAccessor?.registerOnTouched(noop);
  cleanUpValidators(control, dir);
  if (control) {
    dir._invokeOnDestroyCallbacks();
    control._registerOnCollectionChange(() => {
    });
  }
}
function registerOnValidatorChange(validators, onChange) {
  validators.forEach((validator) => {
    if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(onChange);
  });
}
function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = (isDisabled) => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };
    control.registerOnDisabledChange(onDisabledChange);
    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
function setUpValidators(control, dir) {
  const validators = getControlValidators(control);
  if (dir.validator !== null) {
    control.setValidators(mergeValidators(validators, dir.validator));
  } else if (typeof validators === "function") {
    control.setValidators([validators]);
  }
  const asyncValidators = getControlAsyncValidators(control);
  if (dir.asyncValidator !== null) {
    control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  } else if (typeof asyncValidators === "function") {
    control.setAsyncValidators([asyncValidators]);
  }
  const onValidatorChange = () => control.updateValueAndValidity();
  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
function cleanUpValidators(control, dir) {
  let isControlUpdated = false;
  if (control !== null) {
    if (dir.validator !== null) {
      const validators = getControlValidators(control);
      if (Array.isArray(validators) && validators.length > 0) {
        const updatedValidators = validators.filter((validator) => validator !== dir.validator);
        if (updatedValidators.length !== validators.length) {
          isControlUpdated = true;
          control.setValidators(updatedValidators);
        }
      }
    }
    if (dir.asyncValidator !== null) {
      const asyncValidators = getControlAsyncValidators(control);
      if (Array.isArray(asyncValidators) && asyncValidators.length > 0) {
        const updatedAsyncValidators = asyncValidators.filter((asyncValidator) => asyncValidator !== dir.asyncValidator);
        if (updatedAsyncValidators.length !== asyncValidators.length) {
          isControlUpdated = true;
          control.setAsyncValidators(updatedAsyncValidators);
        }
      }
    }
  }
  const noop = () => {
  };
  registerOnValidatorChange(dir._rawValidators, noop);
  registerOnValidatorChange(dir._rawAsyncValidators, noop);
  return isControlUpdated;
}
function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange((newValue) => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === "change") updateControl(control, dir);
  });
}
function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === "blur" && control._pendingChange) updateControl(control, dir);
    if (control.updateOn !== "submit") control.markAsTouched();
  });
}
function updateControl(control, dir) {
  if (control._pendingDirty) control.markAsDirty();
  control.setValue(control._pendingValue, {
    emitModelToViewChange: false
  });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    dir.valueAccessor.writeValue(newValue);
    if (emitModelEvent) dir.viewToModelUpdate(newValue);
  };
  control.registerOnChange(onChange);
  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
function setUpFormContainer(control, dir) {
  if (control == null && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "Cannot find control with");
  setUpValidators(control, dir);
}
function cleanUpFormContainer(control, dir) {
  return cleanUpValidators(control, dir);
}
function _noControlError(dir) {
  return _throwError(dir, "There is no FormControl instance attached to form control element with");
}
function _throwError(dir, message) {
  const messageEnd = _describeControlLocation(dir);
  throw new Error(`${message} ${messageEnd}`);
}
function _describeControlLocation(dir) {
  const path = dir.path;
  if (path && path.length > 1) return `path: '${path.join(" -> ")}'`;
  if (path?.[0]) return `name: '${path}'`;
  return "unspecified name attribute";
}
function _throwMissingValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(-1203, `No value accessor for form control ${loc}.`);
}
function _throwInvalidValueAccessorError(dir) {
  const loc = _describeControlLocation(dir);
  throw new RuntimeError(1200, `Value accessor was not provided as an array for form control with ${loc}. Check that the \`NG_VALUE_ACCESSOR\` token is configured as a \`multi: true\` provider.`);
}
function isPropertyUpdated(changes, viewModel) {
  if (!Object.hasOwn(changes, "model")) return false;
  const change = changes["model"];
  if (change.isFirstChange()) return true;
  return !Object.is(viewModel, change.currentValue);
}
function isBuiltInAccessor(valueAccessor) {
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}
function syncPendingControls(form, directives) {
  form._syncPendingControls();
  directives.forEach((dir) => {
    const control = dir.control;
    if (control.updateOn === "submit" && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
}
function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors) return null;
  if (!Array.isArray(valueAccessors) && (typeof ngDevMode === "undefined" || ngDevMode)) _throwInvalidValueAccessorError(dir);
  let defaultAccessor = void 0;
  let builtinAccessor = void 0;
  let customAccessor = void 0;
  valueAccessors.forEach((v) => {
    if (v.constructor === DefaultValueAccessor) {
      defaultAccessor = v;
    } else if (isBuiltInAccessor(v)) {
      if (builtinAccessor && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "More than one built-in value accessor matches form control with");
      builtinAccessor = v;
    } else {
      if (customAccessor && (typeof ngDevMode === "undefined" || ngDevMode)) _throwError(dir, "More than one custom value accessor matches form control with");
      customAccessor = v;
    }
  });
  if (customAccessor) return customAccessor;
  if (builtinAccessor) return builtinAccessor;
  if (defaultAccessor) return defaultAccessor;
  if (typeof ngDevMode === "undefined" || ngDevMode) {
    _throwError(dir, "No valid value accessor for form control with");
  }
  return null;
}
function removeListItem$1(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function _ngModelWarning(name, type, instance, warningConfig) {
  if (warningConfig === "never") return;
  if ((warningConfig === null || warningConfig === "once") && !type._ngModelWarningSentOnce || warningConfig === "always" && !instance._ngModelWarningSent) {
    console.warn(ngModelWarning(name));
    type._ngModelWarningSentOnce = true;
    instance._ngModelWarningSent = true;
  }
}
var NG_CONTROL_INTEGRATION_PROVIDER = {
  provide: \u0275FORM_CONTROL_INTEGRATION,
  useFactory: () => {
    const control = inject(NgControl, {
      self: true
    });
    return {
      setParseErrors: (source) => {
        control.setParseErrorSource(source);
      },
      set onReset(callback) {
        control.onReset = callback;
      }
    };
  }
};
var NgControl = class extends AbstractControlDirective {
  _parent = null;
  name = null;
  valueAccessor = null;
  isCustomControlBased = false;
  userOnReset;
  resetSubscription;
  set onReset(callback) {
    this.userOnReset = callback;
    this.resetSubscription?.unsubscribe();
    this.resetSubscription = void 0;
    if (this.control) {
      this.resetSubscription = this.control.events.subscribe((event) => {
        if (event instanceof FormResetEvent && this.control) {
          this.userOnReset?.(this.control.value);
        }
      });
      this.subscription?.add(this.resetSubscription);
    }
  }
  isNativeFormElement = false;
  rawValueAccessors;
  _selectedValueAccessor = null;
  get selectedValueAccessor() {
    return this._selectedValueAccessor ??= selectValueAccessor(this, this.rawValueAccessors);
  }
  parseErrorsValidator = null;
  renderer;
  injector;
  requiredValidatorViaDi;
  subscription;
  customControlBindings = null;
  constructor(injector, renderer, rawValueAccessors) {
    super();
    this.injector = injector;
    this.renderer = renderer;
    this.rawValueAccessors = rawValueAccessors;
    this.injector?.get(DestroyRef)?.onDestroy(() => {
      this.removeParseErrorsValidator(this.control);
      this.subscription?.unsubscribe();
    });
  }
  setupCustomControl() {
    this.subscription?.unsubscribe();
    const cdr = this.injector?.get(ChangeDetectorRef);
    if (!this.control || !cdr) {
      return;
    }
    const markForCheck = cdr.markForCheck.bind(cdr);
    this.subscription = new Subscription();
    this.subscription.add(this.control.valueChanges.subscribe(markForCheck));
    this.subscription.add(this.control.statusChanges.subscribe(markForCheck));
    this.resetSubscription?.unsubscribe();
    this.resetSubscription = void 0;
    if (this.userOnReset) {
      this.resetSubscription = this.control.events.subscribe((event) => {
        if (event instanceof FormResetEvent && this.control) {
          this.userOnReset?.(this.control.value);
        }
      });
      this.subscription.add(this.resetSubscription);
    }
    if (this.parseErrorsValidator) {
      this.control.addValidators(this.parseErrorsValidator);
    }
  }
  ngControlCreate(host) {
    const hasNgNoCva = host.nativeElement.hasAttribute?.("ngNoCva");
    const hasCva = !hasNgNoCva && (this.rawValueAccessors && this.rawValueAccessors.length > 0 || this.valueAccessor !== null);
    if (hasCva || !host.customControl) {
      return;
    }
    this.isCustomControlBased = true;
    host.listenToCustomControlModel((value) => {
      this.control?.markAsDirty();
      this.control?.setValue(value, {
        emitModelToViewChange: false
      });
      this.viewToModelUpdate(value);
    });
    host.listenToCustomControlOutput("touch", () => {
      this.control?.markAsTouched();
    });
    this.customControlBindings = {};
    this.isNativeFormElement = isNativeFormElement(host.nativeElement);
    this.requiredValidatorViaDi = this._rawValidators.find((v) => v instanceof RequiredValidator);
  }
  ngControlUpdate(host, bindRequired) {
    if (!this.isCustomControlBased) {
      return;
    }
    const control = this.control;
    const bindings = this.customControlBindings;
    if (!Object.is(bindings.value, control.value)) {
      bindings.value = control.value;
      host.setCustomControlModelInput(control.value);
    }
    this.bindControlProperty(host, bindings, "touched", control.touched);
    this.bindControlProperty(host, bindings, "dirty", control.dirty);
    this.bindControlProperty(host, bindings, "valid", control.valid);
    this.bindControlProperty(host, bindings, "invalid", control.invalid);
    this.bindControlProperty(host, bindings, "pending", control.pending);
    this.bindControlProperty(host, bindings, "disabled", control.disabled);
    if (this.shouldBindRequired) {
      this.bindControlProperty(host, bindings, "required", this.isRequired);
    }
    const errorObject = control.errors;
    if (bindings.errors !== errorObject) {
      bindings.errors = errorObject;
      const errorArray = this._convertErrors(errorObject);
      host.setInputOnDirectives("errors", errorArray);
    }
  }
  get isRequired() {
    return (this.requiredValidatorViaDi?._enabled || this.control?._hasRequired()) ?? false;
  }
  get shouldBindRequired() {
    return true;
  }
  bindControlProperty(host, bindings, name, value) {
    if (bindings[name] === value) {
      return;
    }
    bindings[name] = value;
    const wasSet = host.setInputOnDirectives(name, value);
    if (this.isNativeFormElement && !wasSet && (name === "disabled" || name === "required") && this.renderer) {
      setNativeDomProperty(this.renderer, host.nativeElement, name, value);
    }
  }
  _convertErrors(errors) {
    if (errors === null) {
      return [];
    }
    const control = this.control;
    return Object.entries(errors).map(([kind, context]) => {
      return new ReactiveValidationError({
        context,
        kind,
        control
      });
    });
  }
  setParseErrorSource(parseErrors) {
    if (parseErrors === void 0) {
      return;
    }
    let convertedErrors = null;
    const convertedParseErrors = computed(() => {
      const rawErrors = parseErrors();
      if (rawErrors.length === 0) {
        return null;
      }
      return rawErrors.reduce((acc, err) => {
        acc[err.kind] = err;
        return acc;
      }, {});
    }, ...ngDevMode ? [{
      debugName: "convertedParseErrors"
    }] : []);
    this.parseErrorsValidator = (() => convertedErrors).bind(this);
    effect(() => {
      convertedErrors = convertedParseErrors();
      this.control?.updateValueAndValidity({
        emitEvent: false
      });
    }, {
      injector: this.injector
    });
  }
  removeParseErrorsValidator(control) {
    if (this.parseErrorsValidator) {
      control?.removeValidators(this.parseErrorsValidator);
      control?.updateValueAndValidity({
        emitEvent: false
      });
    }
  }
};
var AbstractControlStatus = class {
  _cd;
  constructor(cd) {
    this._cd = cd;
  }
  get isTouched() {
    this._cd?.control?._touched?.();
    return !!this._cd?.control?.touched;
  }
  get isUntouched() {
    return !!this._cd?.control?.untouched;
  }
  get isPristine() {
    this._cd?.control?._pristine?.();
    return !!this._cd?.control?.pristine;
  }
  get isDirty() {
    return !!this._cd?.control?.dirty;
  }
  get isValid() {
    this._cd?.control?._status?.();
    return !!this._cd?.control?.valid;
  }
  get isInvalid() {
    return !!this._cd?.control?.invalid;
  }
  get isPending() {
    return !!this._cd?.control?.pending;
  }
  get isSubmitted() {
    this._cd?._submitted?.();
    return !!this._cd?.submitted;
  }
};
var ngControlStatusHost = {
  "[class.ng-untouched]": "isUntouched",
  "[class.ng-touched]": "isTouched",
  "[class.ng-pristine]": "isPristine",
  "[class.ng-dirty]": "isDirty",
  "[class.ng-valid]": "isValid",
  "[class.ng-invalid]": "isInvalid",
  "[class.ng-pending]": "isPending"
};
var NgControlStatus = class _NgControlStatus extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }
  static \u0275fac = function NgControlStatus_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgControlStatus)(\u0275\u0275directiveInject(NgControl, 2));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgControlStatus,
    selectors: [["", "formControlName", ""], ["", "ngModel", ""], ["", "formControl", ""]],
    hostVars: 14,
    hostBindings: function NgControlStatus_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending);
      }
    },
    standalone: false,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgControlStatus, [{
    type: Directive,
    args: [{
      selector: "[formControlName],[ngModel],[formControl]",
      host: ngControlStatusHost,
      standalone: false
    }]
  }], () => [{
    type: NgControl,
    decorators: [{
      type: Self
    }]
  }], null);
})();
var NgControlStatusGroup = class _NgControlStatusGroup extends AbstractControlStatus {
  constructor(cd) {
    super(cd);
  }
  static \u0275fac = function NgControlStatusGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgControlStatusGroup)(\u0275\u0275directiveInject(ControlContainer, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgControlStatusGroup,
    selectors: [["", "formGroupName", ""], ["", "formArrayName", ""], ["", "ngModelGroup", ""], ["", "formGroup", ""], ["", "formArray", ""], ["form", 3, "ngNoForm", ""], ["", "ngForm", ""]],
    hostVars: 16,
    hostBindings: function NgControlStatusGroup_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending)("ng-submitted", ctx.isSubmitted);
      }
    },
    standalone: false,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgControlStatusGroup, [{
    type: Directive,
    args: [{
      selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]",
      host: __spreadProps(__spreadValues({}, ngControlStatusHost), {
        "[class.ng-submitted]": "isSubmitted"
      }),
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }]
  }], null);
})();
var FormGroup = class extends AbstractControl {
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    (typeof ngDevMode === "undefined" || ngDevMode) && validateFormGroupControls(controls);
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
  }
  controls;
  registerControl(name, control) {
    const existingControl = this._find(name);
    if (existingControl) return existingControl;
    this.controls[name] = control;
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
    return control;
  }
  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  removeControl(name, options = {}) {
    const existingControl = this._find(name);
    if (existingControl) existingControl._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  setControl(name, control, options = {}) {
    const existingControl = this._find(name);
    if (existingControl) existingControl._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  contains(controlName) {
    return this._find(controlName)?.enabled === true;
  }
  setValue(value, options = {}) {
    untracked(() => {
      assertAllValuesPresent(this, true, value);
      Object.keys(value).forEach((name) => {
        assertControlPresent(this, true, name);
        this.controls[name].setValue(value[name], {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      });
      this.updateValueAndValidity(options);
    });
  }
  patchValue(value, options = {}) {
    if (value == null) return;
    Object.keys(value).forEach((name) => {
      const existingControl = this._find(name);
      if (existingControl) {
        existingControl.patchValue(value[name], {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value ? value[name] : null, __spreadProps(__spreadValues({}, options), {
        onlySelf: true
      }));
    });
    this._updatePristine(options, this);
    this._updateTouched(options, this);
    this.updateValueAndValidity(options);
    if (options?.emitEvent !== false) {
      this._events.next(new FormResetEvent(this));
    }
  }
  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control.getRawValue();
      return acc;
    });
  }
  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  _forEachChild(cb) {
    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  _setUpControls() {
    this._forEachChild((control) => {
      control.setParent(this);
      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  _updateValue() {
    this.value = this._reduceValue();
  }
  _anyControls(condition) {
    for (const [controlName, control] of Object.entries(this.controls)) {
      if (this.contains(controlName) && condition(control)) {
        return true;
      }
    }
    return false;
  }
  _reduceValue() {
    let acc = {};
    return this._reduceChildren(acc, (acc2, control, name) => {
      if (control.enabled || this.disabled) {
        acc2[name] = control.value;
      }
      return acc2;
    });
  }
  _reduceChildren(initValue, fn) {
    let res = initValue;
    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });
    return res;
  }
  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }
    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  _find(name) {
    return hasOwnControl(this.controls, name) ? this.controls[name] : null;
  }
};
function validateFormGroupControls(controls) {
  const invalidKeys = Object.keys(controls).filter((key) => key.includes("."));
  if (invalidKeys.length > 0) {
    console.warn(`FormGroup keys cannot include \`.\`, please replace the keys for: ${invalidKeys.join(",")}.`);
  }
}
var FormRecord = class extends FormGroup {
};
var formDirectiveProvider$2 = {
  provide: ControlContainer,
  useExisting: forwardRef(() => NgForm)
};
var resolvedPromise$1 = (() => Promise.resolve())();
var NgForm = class _NgForm extends ControlContainer {
  callSetDisabledState;
  get submitted() {
    return untracked(this.submittedReactive);
  }
  _submitted = computed(() => this.submittedReactive(), ...ngDevMode ? [{
    debugName: "_submitted"
  }] : []);
  submittedReactive = signal(false, ...ngDevMode ? [{
    debugName: "submittedReactive"
  }] : []);
  _directives = /* @__PURE__ */ new Set();
  form;
  ngSubmit = new EventEmitter();
  options;
  constructor(validators, asyncValidators, callSetDisabledState) {
    super();
    this.callSetDisabledState = callSetDisabledState;
    this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
  }
  ngAfterViewInit() {
    this._setUpdateStrategy();
  }
  get formDirective() {
    return this;
  }
  get control() {
    return this.form;
  }
  get path() {
    return [];
  }
  get controls() {
    return this.form.controls;
  }
  addControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      dir.control = container.registerControl(dir.name, dir.control);
      dir._setupWithForm(this.callSetDisabledState);
      dir.control.updateValueAndValidity({
        emitEvent: false
      });
      this._directives.add(dir);
    });
  }
  getControl(dir) {
    return this.form.get(dir.path);
  }
  removeControl(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      container?.removeControl(dir.name);
      this._directives.delete(dir);
    });
  }
  addFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      const group = new FormGroup({});
      setUpFormContainer(group, dir);
      container.registerControl(dir.name, group);
      group.updateValueAndValidity({
        emitEvent: false
      });
    });
  }
  removeFormGroup(dir) {
    resolvedPromise$1.then(() => {
      const container = this._findContainer(dir.path);
      container?.removeControl?.(dir.name);
    });
  }
  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  updateModel(dir, value) {
    resolvedPromise$1.then(() => {
      const ctrl = this.form.get(dir.path);
      ctrl.setValue(value);
    });
  }
  setValue(value) {
    this.control.setValue(value);
  }
  onSubmit($event) {
    this.submittedReactive.set(true);
    syncPendingControls(this.form, this._directives);
    this.ngSubmit.emit($event);
    this.form._events.next(new FormSubmittedEvent(this.control));
    return $event?.target?.method === "dialog";
  }
  onReset() {
    this.resetForm();
  }
  resetForm(value = void 0) {
    this.form.reset(value);
    this.submittedReactive.set(false);
  }
  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.form._updateOn = this.options.updateOn;
    }
  }
  _findContainer(path) {
    path.pop();
    return path.length ? this.form.get(path) : this.form;
  }
  static \u0275fac = function NgForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgForm)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgForm,
    selectors: [["form", 3, "ngNoForm", "", 3, "formGroup", "", 3, "formArray", ""], ["ng-form"], ["", "ngForm", ""]],
    hostBindings: function NgForm_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function NgForm_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function NgForm_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      options: [0, "ngFormOptions", "options"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider$2]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgForm, [{
    type: Directive,
    args: [{
      selector: "form:not([ngNoForm]):not([formGroup]):not([formArray]),ng-form,[ngForm]",
      providers: [formDirectiveProvider$2],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      outputs: ["ngSubmit"],
      exportAs: "ngForm",
      standalone: false
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], {
    options: [{
      type: Input,
      args: ["ngFormOptions"]
    }]
  });
})();
function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function isFormControlState(formState) {
  return typeof formState === "object" && formState !== null && Object.keys(formState).length === 2 && "value" in formState && "disabled" in formState;
}
var FormControl = class FormControl2 extends AbstractControl {
  defaultValue = null;
  _onChange = [];
  _pendingValue;
  _pendingChange = false;
  constructor(formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this._applyFormState(formState);
    this._setUpdateStrategy(validatorOrOpts);
    this._initObservables();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
    if (isOptionsObj(validatorOrOpts) && (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault)) {
      if (isFormControlState(formState)) {
        this.defaultValue = formState.value;
      } else {
        this.defaultValue = formState;
      }
    }
  }
  setValue(value, options = {}) {
    untracked(() => {
      this.value = this._pendingValue = value;
      if (this._onChange.length && options.emitModelToViewChange !== false) {
        this._onChange.forEach((changeFn) => changeFn(this.value, options.emitViewToModelChange !== false));
      }
      this.updateValueAndValidity(options);
    });
  }
  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  reset(formState = this.defaultValue, options = {}) {
    this._applyFormState(formState);
    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    if (options.overwriteDefaultValue) {
      this.defaultValue = this.value;
    }
    this._pendingChange = false;
    if (options?.emitEvent !== false) {
      this._events.next(new FormResetEvent(this));
    }
  }
  _updateValue() {
  }
  _anyControls(condition) {
    return false;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  _forEachChild(cb) {
  }
  _syncPendingControls() {
    if (this.updateOn === "submit") {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();
      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }
    return false;
  }
  _applyFormState(formState) {
    if (isFormControlState(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else {
      this.value = this._pendingValue = formState;
    }
  }
};
var isFormControl = (control) => control instanceof FormControl;
var AbstractFormGroupDirective = class _AbstractFormGroupDirective extends ControlContainer {
  _parent;
  ngOnInit() {
    this._checkParentType();
    this.formDirective.addFormGroup(this);
  }
  ngOnDestroy() {
    this.formDirective?.removeFormGroup(this);
  }
  get control() {
    return this.formDirective.getFormGroup(this);
  }
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  _checkParentType() {
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275AbstractFormGroupDirective_BaseFactory = void 0;
    return function AbstractFormGroupDirective_Factory(__ngFactoryType__) {
      return (\u0275AbstractFormGroupDirective_BaseFactory || (\u0275AbstractFormGroupDirective_BaseFactory = \u0275\u0275getInheritedFactory(_AbstractFormGroupDirective)))(__ngFactoryType__ || _AbstractFormGroupDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _AbstractFormGroupDirective,
    standalone: false,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractFormGroupDirective, [{
    type: Directive,
    args: [{
      standalone: false
    }]
  }], null, null);
})();
function modelParentException() {
  return new RuntimeError(1350, `
    ngModel cannot be used to register form controls with a parent formGroup directive.  Try using
    formGroup's partner directive "formControlName" instead.  Example:

    ${formControlNameExample}

    Or, if you'd like to avoid registering this form control, indicate that it's standalone in ngModelOptions:

    Example:

    ${ngModelWithFormGroupExample}`);
}
function formGroupNameException() {
  return new RuntimeError(1351, `
    ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.

    Option 1: Use formControlName instead of ngModel (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):

    ${ngModelGroupExample}`);
}
function ngModelInChildComponentWarning(containerTypeName) {
  return formatRuntimeError(-1354, `ngModel on a form control inside a child component cannot register with the ${containerTypeName} in the parent component because @Host() stops injection at the component boundary. To register this control with the parent form, add viewProviders to the child component: @Component({ ..., viewProviders: [{ provide: ControlContainer, useExisting: ${containerTypeName} }] }). Or, to opt out of form registration, use [ngModelOptions]="{standalone: true}".`);
}
function missingNameException() {
  return new RuntimeError(1352, `If ngModel is used within a form tag, either the name attribute must be set or the form
    control must be defined as 'standalone' in ngModelOptions.

    Example 1: <input [(ngModel)]="person.firstName" name="first">
    Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">`);
}
function modelGroupParentException() {
  return new RuntimeError(1353, `
    ngModelGroup cannot be used with a parent formGroup directive.

    Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):

    ${formGroupNameExample}

    Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):

    ${ngModelGroupExample}`);
}
var modelGroupProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => NgModelGroup)
};
var NgModelGroup = class _NgModelGroup extends AbstractFormGroupDirective {
  name = "";
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  _checkParentType() {
    if (!(this._parent instanceof _NgModelGroup) && !(this._parent instanceof NgForm) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw modelGroupParentException();
    }
  }
  static \u0275fac = function NgModelGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgModelGroup)(\u0275\u0275directiveInject(ControlContainer, 5), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgModelGroup,
    selectors: [["", "ngModelGroup", ""]],
    inputs: {
      name: [0, "ngModelGroup", "name"]
    },
    exportAs: ["ngModelGroup"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([modelGroupProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgModelGroup, [{
    type: Directive,
    args: [{
      selector: "[ngModelGroup]",
      providers: [modelGroupProvider],
      exportAs: "ngModelGroup",
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["ngModelGroup"]
    }]
  });
})();
var AbstractFormDirective = class _AbstractFormDirective extends ControlContainer {
  callSetDisabledState;
  get submitted() {
    return untracked(this._submittedReactive);
  }
  set submitted(value) {
    this._submittedReactive.set(value);
  }
  _submitted = computed(() => this._submittedReactive(), ...ngDevMode ? [{
    debugName: "_submitted"
  }] : []);
  _submittedReactive = signal(false, ...ngDevMode ? [{
    debugName: "_submittedReactive"
  }] : []);
  _oldForm;
  _onCollectionChange = () => this._updateDomValue();
  directives = [];
  constructor(validators, asyncValidators, callSetDisabledState) {
    super();
    this.callSetDisabledState = callSetDisabledState;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  ngOnChanges(changes) {
    this.onChanges(changes);
  }
  ngOnDestroy() {
    this.onDestroy();
  }
  onChanges(changes) {
    this._checkFormPresent();
    if (Object.hasOwn(changes, "form")) {
      this._updateValidators();
      this._updateDomValue();
      this._updateRegistrations();
      this._oldForm = this.form;
    }
  }
  onDestroy() {
    if (this.form) {
      cleanUpValidators(this.form, this);
      if (this.form._onCollectionChange === this._onCollectionChange) {
        this.form._registerOnCollectionChange(() => {
        });
      }
    }
  }
  get formDirective() {
    return this;
  }
  get path() {
    return [];
  }
  addControl(dir) {
    const ctrl = this.form.get(dir.path);
    dir._setupWithForm(ctrl, this.callSetDisabledState);
    ctrl.updateValueAndValidity({
      emitEvent: false
    });
    this.directives.push(dir);
    return ctrl;
  }
  getControl(dir) {
    return this.form.get(dir.path);
  }
  removeControl(dir) {
    cleanUpControl(dir.control || null, dir, false);
    removeListItem$1(this.directives, dir);
  }
  addFormGroup(dir) {
    this._setUpFormContainer(dir);
  }
  removeFormGroup(dir) {
    this._cleanUpFormContainer(dir);
  }
  getFormGroup(dir) {
    return this.form.get(dir.path);
  }
  getFormArray(dir) {
    return this.form.get(dir.path);
  }
  addFormArray(dir) {
    this._setUpFormContainer(dir);
  }
  removeFormArray(dir) {
    this._cleanUpFormContainer(dir);
  }
  updateModel(dir, value) {
    const ctrl = this.form.get(dir.path);
    ctrl.setValue(value);
  }
  onReset() {
    this.resetForm();
  }
  resetForm(value = void 0, options = {}) {
    this.form.reset(value, options);
    this._submittedReactive.set(false);
  }
  onSubmit($event) {
    this.submitted = true;
    syncPendingControls(this.form, this.directives);
    this.ngSubmit.emit($event);
    this.form._events.next(new FormSubmittedEvent(this.control));
    return $event?.target?.method === "dialog";
  }
  _updateDomValue() {
    this.directives.forEach((dir) => {
      const oldCtrl = dir.control;
      const newCtrl = this.form.get(dir.path);
      if (oldCtrl !== newCtrl) {
        cleanUpControl(oldCtrl || null, dir);
        if (isFormControl(newCtrl)) {
          dir._setupWithForm(newCtrl, this.callSetDisabledState);
        }
      }
    });
    this.form._updateTreeValidity({
      emitEvent: false
    });
  }
  _setUpFormContainer(dir) {
    const ctrl = this.form.get(dir.path);
    setUpFormContainer(ctrl, dir);
    ctrl.updateValueAndValidity({
      emitEvent: false
    });
  }
  _cleanUpFormContainer(dir) {
    const ctrl = this.form?.get(dir.path);
    if (ctrl) {
      const isControlUpdated = cleanUpFormContainer(ctrl, dir);
      if (isControlUpdated) {
        ctrl.updateValueAndValidity({
          emitEvent: false
        });
      }
    }
  }
  _updateRegistrations() {
    this.form._registerOnCollectionChange(this._onCollectionChange);
    this._oldForm?._registerOnCollectionChange(() => {
    });
  }
  _updateValidators() {
    setUpValidators(this.form, this);
    if (this._oldForm) {
      cleanUpValidators(this._oldForm, this);
    }
  }
  _checkFormPresent() {
    if (!this.form && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw missingFormException();
    }
  }
  static \u0275fac = function AbstractFormDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AbstractFormDirective)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _AbstractFormDirective,
    features: [\u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractFormDirective, [{
    type: Directive
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }], null);
})();
var formDirectiveProvider$1 = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupDirective)
};
var FormGroupDirective = class _FormGroupDirective extends AbstractFormDirective {
  form = null;
  ngSubmit = new EventEmitter();
  get control() {
    return this.form;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275FormGroupDirective_BaseFactory = void 0;
    return function FormGroupDirective_Factory(__ngFactoryType__) {
      return (\u0275FormGroupDirective_BaseFactory || (\u0275FormGroupDirective_BaseFactory = \u0275\u0275getInheritedFactory(_FormGroupDirective)))(__ngFactoryType__ || _FormGroupDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormGroupDirective,
    selectors: [["", "formGroup", ""]],
    hostBindings: function FormGroupDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function FormGroupDirective_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function FormGroupDirective_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      form: [0, "formGroup", "form"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider$1]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormGroupDirective, [{
    type: Directive,
    args: [{
      selector: "[formGroup]",
      providers: [formDirectiveProvider$1],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      exportAs: "ngForm",
      standalone: false
    }]
  }], null, {
    form: [{
      type: Input,
      args: ["formGroup"]
    }],
    ngSubmit: [{
      type: Output
    }]
  });
})();
var formControlBinding$1 = {
  provide: NgControl,
  useExisting: forwardRef(() => NgModel)
};
var resolvedPromise = (() => Promise.resolve())();
var NgModel = class _NgModel extends NgControl {
  _changeDetectorRef;
  callSetDisabledState;
  control = new FormControl();
  static ngAcceptInputType_isDisabled;
  _registered = false;
  _ngModelInjector;
  viewModel;
  name = "";
  isDisabled;
  model;
  options;
  update = new EventEmitter();
  constructor(parent, validators, asyncValidators, valueAccessors, _changeDetectorRef, callSetDisabledState, injector, renderer) {
    super(injector, renderer, valueAccessors);
    this._changeDetectorRef = _changeDetectorRef;
    this.callSetDisabledState = callSetDisabledState;
    this._parent = parent;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      this._ngModelInjector = injector;
    }
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  ngOnChanges(changes) {
    if (!this._registered && (typeof ngDevMode === "undefined" || ngDevMode) && this._parent === null && !this.options?.standalone) {
      const parentContainer = this._ngModelInjector?.get(ControlContainer, null);
      if (parentContainer != null) {
        const typeName = parentContainer instanceof NgForm ? "NgForm" : parentContainer instanceof FormGroupDirective ? "FormGroupDirective" : parentContainer instanceof NgModelGroup ? "NgModelGroup" : parentContainer.constructor.name || "ControlContainer";
        console.warn(ngModelInChildComponentWarning(typeName));
      }
    }
    this._checkForErrors();
    if (!this._registered || "name" in changes) {
      if (this._registered) {
        this._checkName();
        if (this.formDirective) {
          const oldName = changes["name"].previousValue;
          this.formDirective.removeControl({
            name: oldName,
            path: this._getPath(oldName)
          });
        }
      }
      this._setUpControl();
    }
    if ("isDisabled" in changes) {
      this._updateDisabled(changes);
    }
    if (isPropertyUpdated(changes, this.viewModel)) {
      this._updateValue(this.model);
      this.viewModel = this.model;
    }
  }
  ngOnDestroy() {
    this.formDirective?.removeControl(this);
  }
  \u0275ngControlCreate(host) {
    super.ngControlCreate(host);
  }
  \u0275ngControlUpdate(host) {
    super.ngControlUpdate(host, false);
  }
  get shouldBindRequired() {
    return false;
  }
  get path() {
    return this._getPath(this.name);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  _setUpControl() {
    this._setUpdateStrategy();
    this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
    this._registered = true;
  }
  _setUpdateStrategy() {
    if (this.options && this.options.updateOn != null) {
      this.control._updateOn = this.options.updateOn;
    }
  }
  _isStandalone() {
    return !this._parent || !!(this.options && this.options.standalone);
  }
  _setUpStandalone() {
    if (!this.isCustomControlBased) {
      this.valueAccessor ??= this.selectedValueAccessor;
      setUpControlValueAccessor(this.control, this, this.callSetDisabledState);
    } else {
      this.setupCustomControl();
    }
    this.control.updateValueAndValidity({
      emitEvent: false
    });
  }
  _setupWithForm(callSetDisabledState) {
    if (!this.isCustomControlBased) {
      this.valueAccessor ??= this.selectedValueAccessor;
      setUpControlValueAccessor(this.control, this, callSetDisabledState);
    } else {
      this.setupCustomControl();
    }
  }
  _checkForErrors() {
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !this._isStandalone()) {
      checkParentType$1(this._parent);
    }
    this._checkName();
  }
  _checkName() {
    if (this.options && this.options.name) this.name = this.options.name;
    if (!this._isStandalone() && !this.name && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw missingNameException();
    }
  }
  _updateValue(value) {
    resolvedPromise.then(() => {
      this.control.setValue(value, {
        emitViewToModelChange: false
      });
      this._changeDetectorRef?.markForCheck();
    });
  }
  _updateDisabled(changes) {
    const disabledValue = changes["isDisabled"].currentValue;
    const isDisabled = disabledValue !== 0 && booleanAttribute(disabledValue);
    resolvedPromise.then(() => {
      if (isDisabled && !this.control.disabled) {
        this.control.disable();
      } else if (!isDisabled && this.control.disabled) {
        this.control.enable();
      }
      this._changeDetectorRef?.markForCheck();
    });
  }
  _getPath(controlName) {
    return this._parent ? controlPath(controlName, this._parent) : [controlName];
  }
  static \u0275fac = function NgModel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgModel)(\u0275\u0275directiveInject(ControlContainer, 9), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(ChangeDetectorRef, 8), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8), \u0275\u0275directiveInject(Injector, 8), \u0275\u0275directiveInject(Renderer2, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgModel,
    selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]],
    inputs: {
      name: "name",
      isDisabled: [0, "disabled", "isDisabled"],
      model: [0, "ngModel", "model"],
      options: [0, "ngModelOptions", "options"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngModel"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formControlBinding$1, NG_CONTROL_INTEGRATION_PROVIDER]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275ControlFeature(null)]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgModel, [{
    type: Directive,
    args: [{
      selector: "[ngModel]:not([formControlName]):not([formControl])",
      providers: [formControlBinding$1, NG_CONTROL_INTEGRATION_PROVIDER],
      exportAs: "ngModel",
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: ChangeDetectorRef,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ChangeDetectorRef]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }, {
    type: Injector,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Renderer2,
    decorators: [{
      type: Optional
    }]
  }], {
    name: [{
      type: Input
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    options: [{
      type: Input,
      args: ["ngModelOptions"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
function checkParentType$1(parent) {
  if (!(parent instanceof NgModelGroup) && parent instanceof AbstractFormGroupDirective) {
    throw formGroupNameException();
  } else if (!(parent instanceof NgModelGroup) && !(parent instanceof NgForm)) {
    throw modelParentException();
  }
}
var \u0275NgNoValidate = class _\u0275NgNoValidate {
  static \u0275fac = function \u0275NgNoValidate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275NgNoValidate)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _\u0275NgNoValidate,
    selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
    hostAttrs: ["novalidate", ""],
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275NgNoValidate, [{
    type: Directive,
    args: [{
      selector: "form:not([ngNoForm]):not([ngNativeValidate])",
      host: {
        "novalidate": ""
      },
      standalone: false
    }]
  }], null, null);
})();
var NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberValueAccessor),
  multi: true
};
var NumberValueAccessor = class _NumberValueAccessor extends BuiltInControlValueAccessor {
  writeValue(value) {
    const normalizedValue = value == null ? "" : value;
    this.setProperty("value", normalizedValue);
  }
  registerOnChange(fn) {
    this.onChange = (value) => {
      fn(value == "" ? null : parseFloat(value));
    };
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275NumberValueAccessor_BaseFactory = void 0;
    return function NumberValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275NumberValueAccessor_BaseFactory || (\u0275NumberValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_NumberValueAccessor)))(__ngFactoryType__ || _NumberValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NumberValueAccessor,
    selectors: [["input", "type", "number", "formControlName", "", 3, "ngNoCva", ""], ["input", "type", "number", "formControl", "", 3, "ngNoCva", ""], ["input", "type", "number", "ngModel", "", 3, "ngNoCva", ""]],
    hostBindings: function NumberValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function NumberValueAccessor_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function NumberValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([NUMBER_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NumberValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=number]:not([ngNoCva])[formControlName],input[type=number]:not([ngNoCva])[formControl],input[type=number]:not([ngNoCva])[ngModel]",
      host: {
        "(input)": "onChange($any($event.target).value)",
        "(blur)": "onTouched()"
      },
      providers: [NUMBER_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, null);
})();
var RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioControlValueAccessor),
  multi: true
};
function throwNameError() {
  throw new RuntimeError(1202, `
      If you define both a name and a formControlName attribute on your radio button, their values
      must match. Ex: <input type="radio" formControlName="food" name="food">
    `);
}
var RadioControlRegistry = class _RadioControlRegistry {
  _accessors = [];
  add(control, accessor) {
    this._accessors.push([control, accessor]);
  }
  remove(accessor) {
    for (let i = this._accessors.length - 1; i >= 0; --i) {
      if (this._accessors[i][1] === accessor) {
        this._accessors.splice(i, 1);
        return;
      }
    }
  }
  select(accessor) {
    this._accessors.forEach((c) => {
      if (this._isSameGroup(c, accessor) && c[1] !== accessor) {
        c[1].fireUncheck(accessor.value);
      }
    });
  }
  _isSameGroup(controlPair, accessor) {
    if (!controlPair[0].control) return false;
    return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
  }
  static \u0275fac = function RadioControlRegistry_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RadioControlRegistry)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _RadioControlRegistry,
    factory: _RadioControlRegistry.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlRegistry, [{
    type: Service
  }], null, null);
})();
var RadioControlValueAccessor = class _RadioControlValueAccessor extends BuiltInControlValueAccessor {
  _registry;
  _injector;
  _state;
  _control;
  _fn;
  setDisabledStateFired = false;
  onChange = () => {
  };
  name;
  formControlName;
  value;
  callSetDisabledState = inject(CALL_SET_DISABLED_STATE, {
    optional: true
  }) ?? setDisabledStateDefault;
  constructor(renderer, elementRef, _registry, _injector) {
    super(renderer, elementRef);
    this._registry = _registry;
    this._injector = _injector;
  }
  ngOnChanges(changes) {
    const control = this._control?.control;
    if (changes["value"] && control) {
      this.writeValue(control.value);
    }
  }
  ngOnInit() {
    this._control = this._injector.get(NgControl);
    this._checkName();
    this._registry.add(this._control, this);
  }
  ngOnDestroy() {
    this._registry.remove(this);
  }
  writeValue(value) {
    this._state = value === this.value;
    this.setProperty("checked", this._state);
  }
  registerOnChange(fn) {
    this._fn = fn;
    this.onChange = () => {
      fn(this.value);
      this._registry.select(this);
    };
  }
  setDisabledState(isDisabled) {
    if (this.setDisabledStateFired || isDisabled || this.callSetDisabledState === "whenDisabledForLegacyCode") {
      this.setProperty("disabled", isDisabled);
    }
    this.setDisabledStateFired = true;
  }
  fireUncheck(value) {
    this.writeValue(value);
  }
  _checkName() {
    if (this.name && this.formControlName && this.name !== this.formControlName && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throwNameError();
    }
    if (!this.name && this.formControlName) this.name = this.formControlName;
  }
  static \u0275fac = function RadioControlValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RadioControlValueAccessor)(\u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(RadioControlRegistry), \u0275\u0275directiveInject(Injector));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _RadioControlValueAccessor,
    selectors: [["input", "type", "radio", "formControlName", "", 3, "ngNoCva", ""], ["input", "type", "radio", "formControl", "", 3, "ngNoCva", ""], ["input", "type", "radio", "ngModel", "", 3, "ngNoCva", ""]],
    hostBindings: function RadioControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function RadioControlValueAccessor_change_HostBindingHandler() {
          return ctx.onChange();
        })("blur", function RadioControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      name: "name",
      formControlName: "formControlName",
      value: "value"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([RADIO_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=radio]:not([ngNoCva])[formControlName],input[type=radio]:not([ngNoCva])[formControl],input[type=radio]:not([ngNoCva])[ngModel]",
      host: {
        "(change)": "onChange()",
        "(blur)": "onTouched()"
      },
      providers: [RADIO_VALUE_ACCESSOR],
      standalone: false
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }, {
    type: RadioControlRegistry
  }, {
    type: Injector
  }], {
    name: [{
      type: Input
    }],
    formControlName: [{
      type: Input
    }],
    value: [{
      type: Input
    }]
  });
})();
var RANGE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RangeValueAccessor),
  multi: true
};
var RangeValueAccessor = class _RangeValueAccessor extends BuiltInControlValueAccessor {
  writeValue(value) {
    this.setProperty("value", parseFloat(value));
  }
  registerOnChange(fn) {
    this.onChange = (value) => {
      fn(value == "" ? null : parseFloat(value));
    };
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275RangeValueAccessor_BaseFactory = void 0;
    return function RangeValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275RangeValueAccessor_BaseFactory || (\u0275RangeValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_RangeValueAccessor)))(__ngFactoryType__ || _RangeValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _RangeValueAccessor,
    selectors: [["input", "type", "range", "formControlName", "", 3, "ngNoCva", ""], ["input", "type", "range", "formControl", "", 3, "ngNoCva", ""], ["input", "type", "range", "ngModel", "", 3, "ngNoCva", ""]],
    hostBindings: function RangeValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function RangeValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("input", function RangeValueAccessor_input_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function RangeValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([RANGE_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RangeValueAccessor, [{
    type: Directive,
    args: [{
      selector: "input[type=range]:not([ngNoCva])[formControlName],input[type=range]:not([ngNoCva])[formControl],input[type=range]:not([ngNoCva])[ngModel]",
      host: {
        "(change)": "onChange($any($event.target).value)",
        "(input)": "onChange($any($event.target).value)",
        "(blur)": "onTouched()"
      },
      providers: [RANGE_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, null);
})();
var FormArray = class extends AbstractControl {
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
  }
  controls;
  at(index) {
    return this.controls[this._adjustIndex(index)];
  }
  push(control, options = {}) {
    if (Array.isArray(control)) {
      control.forEach((ctrl) => {
        this.controls.push(ctrl);
        this._registerControl(ctrl);
      });
    } else {
      this.controls.push(control);
      this._registerControl(control);
    }
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  insert(index, control, options = {}) {
    this.controls.splice(index, 0, control);
    this._registerControl(control);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  removeAt(index, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {
    });
    this.controls.splice(adjustedIndex, 1);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  setControl(index, control, options = {}) {
    let adjustedIndex = this._adjustIndex(index);
    if (adjustedIndex < 0) adjustedIndex = 0;
    if (this.controls[adjustedIndex]) this.controls[adjustedIndex]._registerOnCollectionChange(() => {
    });
    this.controls.splice(adjustedIndex, 1);
    if (control) {
      this.controls.splice(adjustedIndex, 0, control);
      this._registerControl(control);
    }
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
    this._onCollectionChange();
  }
  get length() {
    return this.controls.length;
  }
  setValue(value, options = {}) {
    untracked(() => {
      assertAllValuesPresent(this, false, value);
      value.forEach((newValue, index) => {
        assertControlPresent(this, false, index);
        this.at(index).setValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      });
      this.updateValueAndValidity(options);
    });
  }
  patchValue(value, options = {}) {
    if (value == null) return;
    value.forEach((newValue, index) => {
      if (this.at(index)) {
        this.at(index).patchValue(newValue, {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      }
    });
    this.updateValueAndValidity(options);
  }
  reset(value = [], options = {}) {
    this._forEachChild((control, index) => {
      control.reset(value[index], __spreadProps(__spreadValues({}, options), {
        onlySelf: true
      }));
    });
    this._updatePristine(options, this);
    this._updateTouched(options, this);
    this.updateValueAndValidity(options);
    if (options?.emitEvent !== false) {
      this._events.next(new FormResetEvent(this));
    }
  }
  getRawValue() {
    return this.controls.map((control) => control.getRawValue());
  }
  clear(options = {}) {
    if (this.controls.length < 1) return;
    this._forEachChild((control) => control._registerOnCollectionChange(() => {
    }));
    this.controls.splice(0);
    this.updateValueAndValidity({
      emitEvent: options.emitEvent
    });
  }
  _adjustIndex(index) {
    return index < 0 ? index + this.length : index;
  }
  _syncPendingControls() {
    let subtreeUpdated = this.controls.reduce((updated, child) => {
      return child._syncPendingControls() ? true : updated;
    }, false);
    if (subtreeUpdated) this.updateValueAndValidity({
      onlySelf: true
    });
    return subtreeUpdated;
  }
  _forEachChild(cb) {
    this.controls.forEach((control, index) => {
      cb(control, index);
    });
  }
  _updateValue() {
    this.value = this.controls.filter((control) => control.enabled || this.disabled).map((control) => control.value);
  }
  _anyControls(condition) {
    return this.controls.some((control) => control.enabled && condition(control));
  }
  _setUpControls() {
    this._forEachChild((control) => this._registerControl(control));
  }
  _allControlsDisabled() {
    for (const control of this.controls) {
      if (control.enabled) return false;
    }
    return this.controls.length > 0 || this.disabled;
  }
  _registerControl(control) {
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
  }
  _find(name) {
    return this.at(name) ?? null;
  }
};
var formDirectiveProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormArrayDirective)
};
var FormArrayDirective = class _FormArrayDirective extends AbstractFormDirective {
  form = null;
  ngSubmit = new EventEmitter();
  get control() {
    return this.form;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275FormArrayDirective_BaseFactory = void 0;
    return function FormArrayDirective_Factory(__ngFactoryType__) {
      return (\u0275FormArrayDirective_BaseFactory || (\u0275FormArrayDirective_BaseFactory = \u0275\u0275getInheritedFactory(_FormArrayDirective)))(__ngFactoryType__ || _FormArrayDirective);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormArrayDirective,
    selectors: [["", "formArray", ""]],
    hostBindings: function FormArrayDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function FormArrayDirective_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        })("reset", function FormArrayDirective_reset_HostBindingHandler() {
          return ctx.onReset();
        });
      }
    },
    inputs: {
      form: [0, "formArray", "form"]
    },
    outputs: {
      ngSubmit: "ngSubmit"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formDirectiveProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormArrayDirective, [{
    type: Directive,
    args: [{
      selector: "[formArray]",
      providers: [formDirectiveProvider],
      host: {
        "(submit)": "onSubmit($event)",
        "(reset)": "onReset()"
      },
      exportAs: "ngForm",
      standalone: false
    }]
  }], null, {
    form: [{
      type: Input,
      args: ["formArray"]
    }],
    ngSubmit: [{
      type: Output
    }]
  });
})();
var NG_MODEL_WITH_FORM_CONTROL_WARNING = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NgModelWithFormControlWarning" : "");
var formControlBinding = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlDirective)
};
var FormControlDirective = class _FormControlDirective extends NgControl {
  _ngModelWarningConfig;
  callSetDisabledState;
  viewModel;
  form;
  set isDisabled(isDisabled) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  model;
  update = new EventEmitter();
  static _ngModelWarningSentOnce = false;
  _ngModelWarningSent = false;
  constructor(validators, asyncValidators, valueAccessors, _ngModelWarningConfig, callSetDisabledState, renderer, injector) {
    super(injector, renderer, valueAccessors);
    this._ngModelWarningConfig = _ngModelWarningConfig;
    this.callSetDisabledState = callSetDisabledState;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  ngOnChanges(changes) {
    if (this._isControlChanged(changes)) {
      const previousForm = changes["form"].previousValue;
      if (previousForm) {
        cleanUpControl(previousForm, this, false);
        this.removeParseErrorsValidator(previousForm);
      }
      if (!this.isCustomControlBased) {
        this.valueAccessor ??= this.selectedValueAccessor;
        setUpControlValueAccessor(this.form, this, this.callSetDisabledState);
      } else {
        this.setupCustomControl();
      }
      this.form.updateValueAndValidity({
        emitEvent: false
      });
    }
    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        _ngModelWarning("formControl", _FormControlDirective, this, this._ngModelWarningConfig);
      }
      this.form.setValue(this.model);
      this.viewModel = this.model;
    }
  }
  ngOnDestroy() {
    if (this.form) {
      cleanUpControl(this.form, this, false);
    }
  }
  get path() {
    return [];
  }
  get control() {
    return this.form;
  }
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  _isControlChanged(changes) {
    return Object.hasOwn(changes, "form");
  }
  \u0275ngControlCreate(host) {
    super.ngControlCreate(host);
  }
  \u0275ngControlUpdate(host) {
    super.ngControlUpdate(host, true);
  }
  static \u0275fac = function FormControlDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormControlDirective)(\u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(NG_MODEL_WITH_FORM_CONTROL_WARNING, 8), \u0275\u0275directiveInject(CALL_SET_DISABLED_STATE, 8), \u0275\u0275directiveInject(Renderer2, 8), \u0275\u0275directiveInject(Injector, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormControlDirective,
    selectors: [["", "formControl", ""]],
    inputs: {
      form: [0, "formControl", "form"],
      isDisabled: [0, "disabled", "isDisabled"],
      model: [0, "ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    exportAs: ["ngForm"],
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formControlBinding, NG_CONTROL_INTEGRATION_PROVIDER]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275ControlFeature(null)]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormControlDirective, [{
    type: Directive,
    args: [{
      selector: "[formControl]",
      providers: [formControlBinding, NG_CONTROL_INTEGRATION_PROVIDER],
      exportAs: "ngForm",
      standalone: false
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CALL_SET_DISABLED_STATE]
    }]
  }, {
    type: Renderer2,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Injector,
    decorators: [{
      type: Optional
    }]
  }], {
    form: [{
      type: Input,
      args: ["formControl"]
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
var formGroupNameProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormGroupName)
};
var FormGroupName = class _FormGroupName extends AbstractFormGroupDirective {
  name = null;
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  _checkParentType() {
    if (hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw groupParentException();
    }
  }
  static \u0275fac = function FormGroupName_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormGroupName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormGroupName,
    selectors: [["", "formGroupName", ""]],
    inputs: {
      name: [0, "formGroupName", "name"]
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formGroupNameProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormGroupName, [{
    type: Directive,
    args: [{
      selector: "[formGroupName]",
      providers: [formGroupNameProvider],
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formGroupName"]
    }]
  });
})();
var formArrayNameProvider = {
  provide: ControlContainer,
  useExisting: forwardRef(() => FormArrayName)
};
var FormArrayName = class _FormArrayName extends ControlContainer {
  _parent;
  name = null;
  constructor(parent, validators, asyncValidators) {
    super();
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  ngOnInit() {
    if (hasInvalidParent(this._parent) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw arrayParentException();
    }
    this.formDirective.addFormArray(this);
  }
  ngOnDestroy() {
    this.formDirective?.removeFormArray(this);
  }
  get control() {
    return this.formDirective.getFormArray(this);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  static \u0275fac = function FormArrayName_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormArrayName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormArrayName,
    selectors: [["", "formArrayName", ""]],
    inputs: {
      name: [0, "formArrayName", "name"]
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([formArrayNameProvider]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormArrayName, [{
    type: Directive,
    args: [{
      selector: "[formArrayName]",
      providers: [formArrayNameProvider],
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }], {
    name: [{
      type: Input,
      args: ["formArrayName"]
    }]
  });
})();
function hasInvalidParent(parent) {
  return !(parent instanceof FormGroupName) && !(parent instanceof AbstractFormDirective) && !(parent instanceof FormArrayName);
}
var controlNameBinding = {
  provide: NgControl,
  useExisting: forwardRef(() => FormControlName)
};
var FormControlName = class _FormControlName extends NgControl {
  _ngModelWarningConfig;
  _added = false;
  viewModel;
  control;
  name = null;
  set isDisabled(isDisabled) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      console.warn(disabledAttrWarning);
    }
  }
  model;
  update = new EventEmitter();
  static _ngModelWarningSentOnce = false;
  _ngModelWarningSent = false;
  constructor(parent, validators, asyncValidators, valueAccessors, _ngModelWarningConfig, renderer, injector) {
    super(injector, renderer, valueAccessors);
    this._ngModelWarningConfig = _ngModelWarningConfig;
    this._parent = parent;
    this._setValidators(validators);
    this._setAsyncValidators(asyncValidators);
  }
  _setupWithForm(control, callSetDisabledState) {
    this.control = control;
    if (!this.isCustomControlBased) {
      this.valueAccessor ??= this.selectedValueAccessor;
      setUpControlValueAccessor(control, this, callSetDisabledState);
    } else {
      this.setupCustomControl();
    }
  }
  ngOnChanges(changes) {
    if (!this._added) this._setUpControl();
    if (isPropertyUpdated(changes, this.viewModel)) {
      if (typeof ngDevMode === "undefined" || ngDevMode) {
        _ngModelWarning("formControlName", _FormControlName, this, this._ngModelWarningConfig);
      }
      this.viewModel = this.model;
      this.formDirective.updateModel(this, this.model);
    }
  }
  ngOnDestroy() {
    this.formDirective?.removeControl(this);
  }
  viewToModelUpdate(newValue) {
    this.viewModel = newValue;
    this.update.emit(newValue);
  }
  get path() {
    return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
  }
  get formDirective() {
    return this._parent ? this._parent.formDirective : null;
  }
  _setUpControl() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      checkParentType(this._parent, this.name);
    }
    this.control = this.formDirective.addControl(this);
    this._added = true;
  }
  \u0275ngControlCreate(host) {
    super.ngControlCreate(host);
  }
  \u0275ngControlUpdate(host) {
    if (!this.isCustomControlBased) {
      return;
    }
    if (!this._added) this._setUpControl();
    super.ngControlUpdate(host, true);
  }
  static \u0275fac = function FormControlName_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormControlName)(\u0275\u0275directiveInject(ControlContainer, 13), \u0275\u0275directiveInject(NG_VALIDATORS, 10), \u0275\u0275directiveInject(NG_ASYNC_VALIDATORS, 10), \u0275\u0275directiveInject(NG_VALUE_ACCESSOR, 10), \u0275\u0275directiveInject(NG_MODEL_WITH_FORM_CONTROL_WARNING, 8), \u0275\u0275directiveInject(Renderer2, 8), \u0275\u0275directiveInject(Injector, 8));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormControlName,
    selectors: [["", "formControlName", ""]],
    inputs: {
      name: [0, "formControlName", "name"],
      isDisabled: [0, "disabled", "isDisabled"],
      model: [0, "ngModel", "model"]
    },
    outputs: {
      update: "ngModelChange"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([controlNameBinding, NG_CONTROL_INTEGRATION_PROVIDER]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275ControlFeature(null)]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormControlName, [{
    type: Directive,
    args: [{
      selector: "[formControlName]",
      providers: [controlNameBinding, NG_CONTROL_INTEGRATION_PROVIDER],
      standalone: false
    }]
  }], () => [{
    type: ControlContainer,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }, {
      type: SkipSelf
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_ASYNC_VALIDATORS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Self
    }, {
      type: Inject,
      args: [NG_VALUE_ACCESSOR]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [NG_MODEL_WITH_FORM_CONTROL_WARNING]
    }]
  }, {
    type: Renderer2,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Injector,
    decorators: [{
      type: Optional
    }]
  }], {
    name: [{
      type: Input,
      args: ["formControlName"]
    }],
    isDisabled: [{
      type: Input,
      args: ["disabled"]
    }],
    model: [{
      type: Input,
      args: ["ngModel"]
    }],
    update: [{
      type: Output,
      args: ["ngModelChange"]
    }]
  });
})();
function checkParentType(parent, name) {
  if (!(parent instanceof FormGroupName) && parent instanceof AbstractFormGroupDirective) {
    throw ngModelGroupException();
  } else if (!(parent instanceof FormGroupName) && !(parent instanceof AbstractFormDirective) && !(parent instanceof FormArrayName)) {
    throw controlParentException(name);
  }
}
var SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectControlValueAccessor),
  multi: true
};
function _buildValueString$1(id, value) {
  if (id == null) return `${value}`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId$1(valueString) {
  return valueString.split(":")[0];
}
var SelectControlValueAccessor = class _SelectControlValueAccessor extends BuiltInControlValueAccessor {
  value;
  _optionMap = /* @__PURE__ */ new Map();
  _idCounter = 0;
  set compareWith(fn) {
    if (typeof fn !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new RuntimeError(1201, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }
    this._compareWith = fn;
  }
  _compareWith = Object.is;
  appRefInjector = inject(ApplicationRef).injector;
  destroyRef = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);
  _queuedWrite = false;
  _writeValueAfterRender() {
    if (this._queuedWrite || this.appRefInjector.destroyed) {
      return;
    }
    this._queuedWrite = true;
    afterNextRender({
      write: () => {
        if (this.destroyRef.destroyed) {
          return;
        }
        this._queuedWrite = false;
        this.writeValue(this.value);
      }
    }, {
      injector: this.appRefInjector
    });
  }
  writeValue(value) {
    this.cdr.markForCheck();
    this.value = value;
    const id = this._getOptionId(value);
    const valueString = _buildValueString$1(id, value);
    this.setProperty("value", valueString);
  }
  registerOnChange(fn) {
    this.onChange = (valueString) => {
      this.value = this._getOptionValue(valueString);
      fn(this.value);
    };
  }
  _registerOption() {
    return (this._idCounter++).toString();
  }
  _getOptionId(value) {
    for (const id of this._optionMap.keys()) {
      if (this._compareWith(this._optionMap.get(id), value)) return id;
    }
    return null;
  }
  _getOptionValue(valueString) {
    const id = _extractId$1(valueString);
    return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectControlValueAccessor_BaseFactory = void 0;
    return function SelectControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275SelectControlValueAccessor_BaseFactory || (\u0275SelectControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_SelectControlValueAccessor)))(__ngFactoryType__ || _SelectControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _SelectControlValueAccessor,
    selectors: [["select", "formControlName", "", 3, "multiple", "", 3, "ngNoCva", ""], ["select", "formControl", "", 3, "multiple", "", 3, "ngNoCva", ""], ["select", "ngModel", "", 3, "multiple", "", 3, "ngNoCva", ""]],
    hostBindings: function SelectControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function SelectControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target.value);
        })("blur", function SelectControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([SELECT_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "select:not([multiple]):not([ngNoCva])[formControlName],select:not([multiple]):not([ngNoCva])[formControl],select:not([multiple]):not([ngNoCva])[ngModel]",
      host: {
        "(change)": "onChange($any($event.target).value)",
        "(blur)": "onTouched()"
      },
      providers: [SELECT_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, {
    compareWith: [{
      type: Input
    }]
  });
})();
var NgSelectOption = class _NgSelectOption {
  _element;
  _renderer;
  _select;
  id;
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;
    if (this._select) this.id = this._select._registerOption();
  }
  set ngValue(value) {
    if (this._select == null) return;
    this._select._optionMap.set(this.id, value);
    this._setElementValue(_buildValueString$1(this.id, value));
    this._select._writeValueAfterRender();
  }
  set value(value) {
    this._setElementValue(value);
    this._select?._writeValueAfterRender();
  }
  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, "value", value);
  }
  ngOnDestroy() {
    this._select?._optionMap.delete(this.id);
    this._select?._writeValueAfterRender();
  }
  static \u0275fac = function NgSelectOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSelectOption)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SelectControlValueAccessor, 9));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NgSelectOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSelectOption, [{
    type: Directive,
    args: [{
      selector: "option",
      standalone: false
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: SelectControlValueAccessor,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], {
    ngValue: [{
      type: Input,
      args: ["ngValue"]
    }],
    value: [{
      type: Input,
      args: ["value"]
    }]
  });
})();
var SELECT_MULTIPLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectMultipleControlValueAccessor),
  multi: true
};
function _buildValueString(id, value) {
  if (id == null) return `${value}`;
  if (typeof value === "string") value = `'${value}'`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
  return valueString.split(":")[0];
}
var SelectMultipleControlValueAccessor = class _SelectMultipleControlValueAccessor extends BuiltInControlValueAccessor {
  value;
  _optionMap = /* @__PURE__ */ new Map();
  _idCounter = 0;
  set compareWith(fn) {
    if (typeof fn !== "function" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw new RuntimeError(1201, `compareWith must be a function, but received ${JSON.stringify(fn)}`);
    }
    this._compareWith = fn;
  }
  _compareWith = Object.is;
  writeValue(value) {
    this.value = value;
    let optionSelectedStateSetter;
    if (Array.isArray(value)) {
      const ids = value.map((v) => this._getOptionId(v));
      optionSelectedStateSetter = (opt, id) => {
        opt._setSelected(ids.indexOf(id) > -1);
      };
    } else {
      optionSelectedStateSetter = (opt) => {
        opt._setSelected(false);
      };
    }
    this._optionMap.forEach(optionSelectedStateSetter);
  }
  registerOnChange(fn) {
    this.onChange = (element) => {
      const selected = [];
      const selectedOptions = element.selectedOptions;
      if (selectedOptions !== void 0) {
        const options = selectedOptions;
        for (let i = 0; i < options.length; i++) {
          const opt = options[i];
          const val = this._getOptionValue(opt.value);
          selected.push(val);
        }
      } else {
        const options = element.options;
        for (let i = 0; i < options.length; i++) {
          const opt = options[i];
          if (opt.selected) {
            const val = this._getOptionValue(opt.value);
            selected.push(val);
          }
        }
      }
      this.value = selected;
      fn(selected);
    };
  }
  _registerOption(value) {
    const id = (this._idCounter++).toString();
    this._optionMap.set(id, value);
    return id;
  }
  _getOptionId(value) {
    for (const id of this._optionMap.keys()) {
      if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
    }
    return null;
  }
  _getOptionValue(valueString) {
    const id = _extractId(valueString);
    return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectMultipleControlValueAccessor_BaseFactory = void 0;
    return function SelectMultipleControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275SelectMultipleControlValueAccessor_BaseFactory || (\u0275SelectMultipleControlValueAccessor_BaseFactory = \u0275\u0275getInheritedFactory(_SelectMultipleControlValueAccessor)))(__ngFactoryType__ || _SelectMultipleControlValueAccessor);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _SelectMultipleControlValueAccessor,
    selectors: [["select", "multiple", "", "formControlName", "", 3, "ngNoCva", ""], ["select", "multiple", "", "formControl", "", 3, "ngNoCva", ""], ["select", "multiple", "", "ngModel", "", 3, "ngNoCva", ""]],
    hostBindings: function SelectMultipleControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("change", function SelectMultipleControlValueAccessor_change_HostBindingHandler($event) {
          return ctx.onChange($event.target);
        })("blur", function SelectMultipleControlValueAccessor_blur_HostBindingHandler() {
          return ctx.onTouched();
        });
      }
    },
    inputs: {
      compareWith: "compareWith"
    },
    standalone: false,
    features: [\u0275\u0275ProvidersFeature([SELECT_MULTIPLE_VALUE_ACCESSOR]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectMultipleControlValueAccessor, [{
    type: Directive,
    args: [{
      selector: "select[multiple]:not([ngNoCva])[formControlName],select[multiple]:not([ngNoCva])[formControl],select[multiple]:not([ngNoCva])[ngModel]",
      host: {
        "(change)": "onChange($event.target)",
        "(blur)": "onTouched()"
      },
      providers: [SELECT_MULTIPLE_VALUE_ACCESSOR],
      standalone: false
    }]
  }], null, {
    compareWith: [{
      type: Input
    }]
  });
})();
var \u0275NgSelectMultipleOption = class _\u0275NgSelectMultipleOption {
  _element;
  _renderer;
  _select;
  id;
  _value;
  constructor(_element, _renderer, _select) {
    this._element = _element;
    this._renderer = _renderer;
    this._select = _select;
    if (this._select) {
      this.id = this._select._registerOption(this);
    }
  }
  set ngValue(value) {
    if (this._select == null) return;
    this._value = value;
    this._setElementValue(_buildValueString(this.id, value));
    this._select.writeValue(this._select.value);
  }
  set value(value) {
    if (this._select) {
      this._value = value;
      this._setElementValue(_buildValueString(this.id, value));
      this._select.writeValue(this._select.value);
    } else {
      this._setElementValue(value);
    }
  }
  _setElementValue(value) {
    this._renderer.setProperty(this._element.nativeElement, "value", value);
  }
  _setSelected(selected) {
    this._renderer.setProperty(this._element.nativeElement, "selected", selected);
  }
  ngOnDestroy() {
    if (this._select) {
      this._select._optionMap.delete(this.id);
      this._select.writeValue(this._select.value);
    }
  }
  static \u0275fac = function \u0275NgSelectMultipleOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275NgSelectMultipleOption)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(SelectMultipleControlValueAccessor, 9));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _\u0275NgSelectMultipleOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275NgSelectMultipleOption, [{
    type: Directive,
    args: [{
      selector: "option",
      standalone: false
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: SelectMultipleControlValueAccessor,
    decorators: [{
      type: Optional
    }, {
      type: Host
    }]
  }], {
    ngValue: [{
      type: Input,
      args: ["ngValue"]
    }],
    value: [{
      type: Input,
      args: ["value"]
    }]
  });
})();
var SHARED_FORM_DIRECTIVES = [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator];
var TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
var REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormArrayDirective, FormControlName, FormGroupName, FormArrayName];
var \u0275InternalFormsSharedModule = class _\u0275InternalFormsSharedModule {
  static \u0275fac = function \u0275InternalFormsSharedModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275InternalFormsSharedModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _\u0275InternalFormsSharedModule,
    declarations: [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator],
    exports: [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, RangeValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, MaxLengthValidator, PatternValidator, CheckboxRequiredValidator, EmailValidator, MinValidator, MaxValidator]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(\u0275InternalFormsSharedModule, [{
    type: NgModule,
    args: [{
      declarations: SHARED_FORM_DIRECTIVES,
      exports: SHARED_FORM_DIRECTIVES
    }]
  }], null, null);
})();
function isAbstractControlOptions(options) {
  return !!options && (options.asyncValidators !== void 0 || options.validators !== void 0 || options.updateOn !== void 0);
}
var FormBuilder = class _FormBuilder {
  useNonNullable = false;
  get nonNullable() {
    const nnfb = new _FormBuilder();
    nnfb.useNonNullable = true;
    return nnfb;
  }
  group(controls, options = null) {
    const reducedControls = this._reduceControls(controls);
    let newOptions = {};
    if (isAbstractControlOptions(options)) {
      newOptions = options;
    } else if (options !== null) {
      newOptions.validators = options.validator;
      newOptions.asyncValidators = options.asyncValidator;
    }
    return new FormGroup(reducedControls, newOptions);
  }
  record(controls, options = null) {
    const reducedControls = this._reduceControls(controls);
    return new FormRecord(reducedControls, options);
  }
  control(formState, validatorOrOpts, asyncValidator) {
    let newOptions = {};
    if (!this.useNonNullable) {
      return new FormControl(formState, validatorOrOpts, asyncValidator);
    }
    if (isAbstractControlOptions(validatorOrOpts)) {
      newOptions = validatorOrOpts;
    } else {
      newOptions.validators = validatorOrOpts;
      newOptions.asyncValidators = asyncValidator;
    }
    return new FormControl(formState, __spreadProps(__spreadValues({}, newOptions), {
      nonNullable: true
    }));
  }
  array(controls, validatorOrOpts, asyncValidator) {
    const createdControls = controls.map((c) => this._createControl(c));
    return new FormArray(createdControls, validatorOrOpts, asyncValidator);
  }
  _reduceControls(controls) {
    const createdControls = {};
    Object.keys(controls).forEach((controlName) => {
      createdControls[controlName] = this._createControl(controls[controlName]);
    });
    return createdControls;
  }
  _createControl(controls) {
    if (controls instanceof FormControl) {
      return controls;
    } else if (controls instanceof AbstractControl) {
      return controls;
    } else if (Array.isArray(controls)) {
      const value = controls[0];
      const validator = controls.length > 1 ? controls[1] : null;
      const asyncValidator = controls.length > 2 ? controls[2] : null;
      return this.control(value, validator, asyncValidator);
    } else {
      return this.control(controls);
    }
  }
  static \u0275fac = function FormBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _FormBuilder,
    factory: _FormBuilder.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormBuilder, [{
    type: Service
  }], null, null);
})();
var NonNullableFormBuilder = class _NonNullableFormBuilder {
  static \u0275fac = function NonNullableFormBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NonNullableFormBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _NonNullableFormBuilder,
    factory: () => (() => inject(FormBuilder).nonNullable)()
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NonNullableFormBuilder, [{
    type: Service,
    args: [{
      factory: () => inject(FormBuilder).nonNullable
    }]
  }], null, null);
})();
var UntypedFormBuilder = class _UntypedFormBuilder extends FormBuilder {
  group(controlsConfig, options = null) {
    return super.group(controlsConfig, options);
  }
  control(formState, validatorOrOpts, asyncValidator) {
    return super.control(formState, validatorOrOpts, asyncValidator);
  }
  array(controlsConfig, validatorOrOpts, asyncValidator) {
    return super.array(controlsConfig, validatorOrOpts, asyncValidator);
  }
  static \u0275fac = function UntypedFormBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UntypedFormBuilder)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _UntypedFormBuilder,
    factory: _UntypedFormBuilder.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UntypedFormBuilder, [{
    type: Service
  }], null, null);
})();
var FormsModule = class _FormsModule {
  static withConfig(opts) {
    return {
      ngModule: _FormsModule,
      providers: [{
        provide: CALL_SET_DISABLED_STATE,
        useValue: opts.callSetDisabledState ?? setDisabledStateDefault
      }]
    };
  }
  static \u0275fac = function FormsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _FormsModule,
    declarations: [NgModel, NgModelGroup, NgForm],
    exports: [\u0275InternalFormsSharedModule, NgModel, NgModelGroup, NgForm]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [\u0275InternalFormsSharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormsModule, [{
    type: NgModule,
    args: [{
      declarations: TEMPLATE_DRIVEN_DIRECTIVES,
      exports: [\u0275InternalFormsSharedModule, TEMPLATE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();
var ReactiveFormsModule = class _ReactiveFormsModule {
  static withConfig(opts) {
    return {
      ngModule: _ReactiveFormsModule,
      providers: [{
        provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
        useValue: opts.warnOnNgModelWithFormControl ?? "always"
      }, {
        provide: CALL_SET_DISABLED_STATE,
        useValue: opts.callSetDisabledState ?? setDisabledStateDefault
      }]
    };
  }
  static \u0275fac = function ReactiveFormsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReactiveFormsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ReactiveFormsModule,
    declarations: [FormControlDirective, FormGroupDirective, FormArrayDirective, FormControlName, FormGroupName, FormArrayName],
    exports: [\u0275InternalFormsSharedModule, FormControlDirective, FormGroupDirective, FormArrayDirective, FormControlName, FormGroupName, FormArrayName]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [\u0275InternalFormsSharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReactiveFormsModule, [{
    type: NgModule,
    args: [{
      declarations: [REACTIVE_DRIVEN_DIRECTIVES],
      exports: [\u0275InternalFormsSharedModule, REACTIVE_DRIVEN_DIRECTIVES]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-basemodelholder.mjs
var BaseModelHolder = class _BaseModelHolder extends BaseComponent {
  modelValue = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "modelValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $filled = computed(
    () => l(this.modelValue()),
    ...ngDevMode ? [{ debugName: "$filled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  writeModelValue(value) {
    this.modelValue.set(value);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275BaseModelHolder_BaseFactory = void 0;
    return function BaseModelHolder_Factory(__ngFactoryType__) {
      return (\u0275BaseModelHolder_BaseFactory || (\u0275BaseModelHolder_BaseFactory = \u0275\u0275getInheritedFactory(_BaseModelHolder)))(__ngFactoryType__ || _BaseModelHolder);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BaseModelHolder,
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseModelHolder, [{
    type: Directive,
    args: [{ standalone: true }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/inputtext/index.mjs
var style = "\n    .p-inputtext {\n        font-weight: dt('inputtext.font.weight');\n        font-size: dt('inputtext.font.size');\n        color: dt('inputtext.color');\n        background: dt('inputtext.background');\n        padding-block: dt('inputtext.padding.y');\n        padding-inline: dt('inputtext.padding.x');\n        border: 1px solid dt('inputtext.border.color');\n        transition:\n            background dt('inputtext.transition.duration'),\n            color dt('inputtext.transition.duration'),\n            border-color dt('inputtext.transition.duration'),\n            outline-color dt('inputtext.transition.duration'),\n            box-shadow dt('inputtext.transition.duration');\n        appearance: none;\n        border-radius: dt('inputtext.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('inputtext.shadow');\n    }\n\n    .p-inputtext:enabled:hover {\n        border-color: dt('inputtext.hover.border.color');\n    }\n\n    .p-inputtext:enabled:focus {\n        border-color: dt('inputtext.focus.border.color');\n        box-shadow: dt('inputtext.focus.ring.shadow');\n        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');\n        outline-offset: dt('inputtext.focus.ring.offset');\n    }\n\n    .p-inputtext.p-invalid {\n        border-color: dt('inputtext.invalid.border.color');\n    }\n\n    .p-inputtext.p-variant-filled {\n        background: dt('inputtext.filled.background');\n    }\n\n    .p-inputtext.p-variant-filled:enabled:hover {\n        background: dt('inputtext.filled.hover.background');\n    }\n\n    .p-inputtext.p-variant-filled:enabled:focus {\n        background: dt('inputtext.filled.focus.background');\n    }\n\n    .p-inputtext:disabled {\n        opacity: 1;\n        background: dt('inputtext.disabled.background');\n        color: dt('inputtext.disabled.color');\n    }\n\n    .p-inputtext::placeholder {\n        color: dt('inputtext.placeholder.color');\n    }\n\n    .p-inputtext.p-invalid::placeholder {\n        color: dt('inputtext.invalid.placeholder.color');\n    }\n\n    .p-inputtext-sm {\n        font-size: dt('inputtext.sm.font.size');\n        padding-block: dt('inputtext.sm.padding.y');\n        padding-inline: dt('inputtext.sm.padding.x');\n    }\n\n    .p-inputtext-lg {\n        font-size: dt('inputtext.lg.font.size');\n        padding-block: dt('inputtext.lg.padding.y');\n        padding-inline: dt('inputtext.lg.padding.x');\n    }\n\n    .p-inputtext-fluid {\n        width: 100%;\n    }\n";

// node_modules/primeng/fesm2022/primeng-inputtext.mjs
var classes = {
  root: ({ instance }) => [
    "p-inputtext p-component",
    {
      "p-filled": instance.$filled(),
      "p-inputtext-sm": instance.pSize() === "small",
      "p-inputtext-lg": instance.pSize() === "large",
      "p-invalid": instance.invalid(),
      "p-variant-filled": instance.$variant() === "filled",
      "p-inputtext-fluid": instance.hasFluid
    }
  ]
};
var InputTextStyle = class _InputTextStyle extends BaseStyle {
  name = "inputtext";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275InputTextStyle_BaseFactory = void 0;
    return function InputTextStyle_Factory(__ngFactoryType__) {
      return (\u0275InputTextStyle_BaseFactory || (\u0275InputTextStyle_BaseFactory = \u0275\u0275getInheritedFactory(_InputTextStyle)))(__ngFactoryType__ || _InputTextStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _InputTextStyle,
    factory: _InputTextStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextStyle, [{
    type: Injectable
  }], null, null);
})();
var InputTextClasses;
(function(InputTextClasses2) {
  InputTextClasses2["root"] = "p-inputtext";
})(InputTextClasses || (InputTextClasses = {}));
var INPUTTEXT_INSTANCE = new InjectionToken("INPUTTEXT_INSTANCE");
var InputText = class _InputText extends BaseModelHolder {
  componentName = "InputText";
  hostName = input(
    "",
    ...ngDevMode ? [{ debugName: "hostName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to pass attributes to DOM elements inside the InputText component.
   * @defaultValue undefined
   * @group Props
   */
  pInputTextPT = input(
    ...ngDevMode ? [void 0, { debugName: "pInputTextPT" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pInputTextUnstyled = input(
    ...ngDevMode ? [void 0, { debugName: "pInputTextUnstyled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bindDirectiveInstance = inject(Bind, { self: true });
  $pcInputText = inject(INPUTTEXT_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  ngControl = inject(NgControl, { optional: true, self: true });
  pcFluid = inject(Fluid, { optional: true, host: true, skipSelf: true });
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
  invalid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "invalid" } : (
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
  _componentStyle = inject(InputTextStyle);
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  dataP = computed(
    () => this.cn({
      invalid: this.invalid(),
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      [this.pSize()]: this.pSize()
    }),
    ...ngDevMode ? [{ debugName: "dataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    super();
    effect(() => {
      const pt = this.pInputTextPT();
      if (pt) {
        this.directivePT.set(pt);
      }
    });
    effect(() => {
      if (this.pInputTextUnstyled()) {
        this.directiveUnstyled.set(this.pInputTextUnstyled());
      }
    });
  }
  onAfterViewInit() {
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
    this.cd.detectChanges();
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("root"));
  }
  onDoCheck() {
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
  }
  onInput() {
    this.writeModelValue(this.ngControl?.value ?? this.el.nativeElement.value);
  }
  static \u0275fac = function InputText_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputText)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _InputText,
    selectors: [["", "pInputText", ""]],
    hostVars: 3,
    hostBindings: function InputText_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function InputText_input_HostBindingHandler() {
          return ctx.onInput();
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("data-p", ctx.dataP());
        \u0275\u0275classMap(ctx.cx("root"));
      }
    },
    inputs: {
      hostName: [1, "hostName"],
      pInputTextPT: [1, "pInputTextPT"],
      pInputTextUnstyled: [1, "pInputTextUnstyled"],
      pSize: [1, "pSize"],
      variant: [1, "variant"],
      fluid: [1, "fluid"],
      invalid: [1, "invalid"]
    },
    features: [\u0275\u0275ProvidersFeature([InputTextStyle, { provide: INPUTTEXT_INSTANCE, useExisting: _InputText }, { provide: PARENT_INSTANCE, useExisting: _InputText }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputText, [{
    type: Directive,
    args: [{
      selector: "[pInputText]",
      standalone: true,
      host: {
        "[class]": "cx('root')",
        "[attr.data-p]": "dataP()",
        "(input)": "onInput()"
      },
      providers: [InputTextStyle, { provide: INPUTTEXT_INSTANCE, useExisting: InputText }, { provide: PARENT_INSTANCE, useExisting: InputText }],
      hostDirectives: [Bind]
    }]
  }], () => [], { hostName: [{ type: Input, args: [{ isSignal: true, alias: "hostName", required: false }] }], pInputTextPT: [{ type: Input, args: [{ isSignal: true, alias: "pInputTextPT", required: false }] }], pInputTextUnstyled: [{ type: Input, args: [{ isSignal: true, alias: "pInputTextUnstyled", required: false }] }], pSize: [{ type: Input, args: [{ isSignal: true, alias: "pSize", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], fluid: [{ type: Input, args: [{ isSignal: true, alias: "fluid", required: false }] }], invalid: [{ type: Input, args: [{ isSignal: true, alias: "invalid", required: false }] }] });
})();
var InputTextModule = class _InputTextModule {
  static \u0275fac = function InputTextModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputTextModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _InputTextModule,
    imports: [InputText],
    exports: [InputText]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputTextModule, [{
    type: NgModule,
    args: [{
      imports: [InputText],
      exports: [InputText]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-baseeditableholder.mjs
var BaseEditableHolder = class _BaseEditableHolder extends BaseModelHolder {
  /**
   * There must be a value (if set).
   * @defaultValue false
   * @group Props
   */
  required = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "required" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When present, it specifies that the component should have invalid state style.
   * @defaultValue false
   * @group Props
   */
  invalid = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "invalid" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When present, it specifies that the component should have disabled state style.
   * @defaultValue false
   * @group Props
   */
  disabled = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "disabled" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When present, it specifies that the name of the input.
   * @defaultValue undefined
   * @group Props
   */
  name = input(
    ...ngDevMode ? [void 0, { debugName: "name" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _disabled = signal(
    false,
    ...ngDevMode ? [{ debugName: "_disabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $disabled = computed(
    () => this.disabled() || this._disabled(),
    ...ngDevMode ? [{ debugName: "$disabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onModelChange = () => {
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onModelTouched = () => {
  };
  writeDisabledState(value) {
    this._disabled.set(value);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  writeControlValue(value, setModelValue) {
  }
  /**** Angular ControlValueAccessors ****/
  writeValue(value) {
    this.writeControlValue(value, this.writeModelValue.bind(this));
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.writeDisabledState(val);
    this.cd.markForCheck();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275BaseEditableHolder_BaseFactory = void 0;
    return function BaseEditableHolder_Factory(__ngFactoryType__) {
      return (\u0275BaseEditableHolder_BaseFactory || (\u0275BaseEditableHolder_BaseFactory = \u0275\u0275getInheritedFactory(_BaseEditableHolder)))(__ngFactoryType__ || _BaseEditableHolder);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BaseEditableHolder,
    inputs: {
      required: [1, "required"],
      invalid: [1, "invalid"],
      disabled: [1, "disabled"],
      name: [1, "name"]
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseEditableHolder, [{
    type: Directive,
    args: [{ standalone: true }]
  }], null, { required: [{ type: Input, args: [{ isSignal: true, alias: "required", required: false }] }], invalid: [{ type: Input, args: [{ isSignal: true, alias: "invalid", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }] });
})();

// node_modules/@primeuix/styles/dist/togglebutton/index.mjs
var style2 = "\n    .p-togglebutton {\n        display: inline-flex;\n        cursor: pointer;\n        user-select: none;\n        overflow: hidden;\n        position: relative;\n        color: dt('togglebutton.color');\n        background: dt('togglebutton.background');\n        border: 1px solid dt('togglebutton.border.color');\n        padding: dt('togglebutton.padding');\n        transition:\n            background dt('togglebutton.transition.duration'),\n            color dt('togglebutton.transition.duration'),\n            border-color dt('togglebutton.transition.duration'),\n            outline-color dt('togglebutton.transition.duration'),\n            box-shadow dt('togglebutton.transition.duration');\n        border-radius: dt('togglebutton.border.radius');\n        outline-color: transparent;\n        font-size: dt('togglebutton.font.size');\n        font-weight: dt('togglebutton.font.weight');\n    }\n\n    .p-togglebutton-content {\n        display: inline-flex;\n        flex: 1 1 auto;\n        align-items: center;\n        justify-content: center;\n        gap: dt('togglebutton.gap');\n        padding: dt('togglebutton.content.padding');\n        background: transparent;\n        border-radius: dt('togglebutton.content.border.radius');\n        transition:\n            background dt('togglebutton.transition.duration'),\n            color dt('togglebutton.transition.duration'),\n            border-color dt('togglebutton.transition.duration'),\n            outline-color dt('togglebutton.transition.duration'),\n            box-shadow dt('togglebutton.transition.duration');\n    }\n\n    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {\n        background: dt('togglebutton.hover.background');\n        color: dt('togglebutton.hover.color');\n    }\n\n    .p-togglebutton.p-togglebutton-checked {\n        background: dt('togglebutton.checked.background');\n        border-color: dt('togglebutton.checked.border.color');\n        color: dt('togglebutton.checked.color');\n    }\n\n    .p-togglebutton-checked .p-togglebutton-content {\n        background: dt('togglebutton.content.checked.background');\n        box-shadow: dt('togglebutton.content.checked.shadow');\n    }\n\n    .p-togglebutton:focus-visible {\n        box-shadow: dt('togglebutton.focus.ring.shadow');\n        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');\n        outline-offset: dt('togglebutton.focus.ring.offset');\n    }\n\n    .p-togglebutton.p-invalid {\n        border-color: dt('togglebutton.invalid.border.color');\n    }\n\n    .p-togglebutton:disabled {\n        opacity: 1;\n        cursor: default;\n        background: dt('togglebutton.disabled.background');\n        border-color: dt('togglebutton.disabled.border.color');\n        color: dt('togglebutton.disabled.color');\n    }\n\n    .p-togglebutton-label,\n    .p-togglebutton-icon {\n        position: relative;\n        transition: none;\n    }\n\n    .p-togglebutton-icon {\n        color: dt('togglebutton.icon.color');\n    }\n\n    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {\n        color: dt('togglebutton.icon.hover.color');\n    }\n\n    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {\n        color: dt('togglebutton.icon.checked.color');\n    }\n\n    .p-togglebutton:disabled .p-togglebutton-icon {\n        color: dt('togglebutton.icon.disabled.color');\n    }\n\n    .p-togglebutton-sm {\n        padding: dt('togglebutton.sm.padding');\n        font-size: dt('togglebutton.sm.font.size');\n    }\n\n    .p-togglebutton-sm .p-togglebutton-content {\n        padding: dt('togglebutton.content.sm.padding');\n    }\n\n    .p-togglebutton-lg {\n        padding: dt('togglebutton.lg.padding');\n        font-size: dt('togglebutton.lg.font.size');\n    }\n\n    .p-togglebutton-lg .p-togglebutton-content {\n        padding: dt('togglebutton.content.lg.padding');\n    }\n\n    .p-togglebutton-fluid {\n        width: 100%;\n    }\n\n    .p-togglebutton-content .p-icon,\n    .p-togglebutton-content .pi {\n        line-height: dt('typography.line.height')\n    }\n";

// node_modules/primeng/fesm2022/primeng-togglebutton.mjs
var style3 = (
  /*css*/
  `
    ${style2}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }
`
);
var classes2 = {
  root: ({ instance }) => [
    "p-togglebutton p-component",
    {
      "p-togglebutton-checked": instance.checked(),
      "p-invalid": instance.invalid(),
      "p-disabled": instance.$disabled(),
      "p-togglebutton-sm p-inputfield-sm": instance.size() === "small",
      "p-togglebutton-lg p-inputfield-lg": instance.size() === "large",
      "p-togglebutton-fluid": instance.fluid()
    }
  ],
  content: "p-togglebutton-content",
  icon: "p-togglebutton-icon",
  iconLeft: "p-togglebutton-icon-left",
  iconRight: "p-togglebutton-icon-right",
  label: "p-togglebutton-label"
};
var ToggleButtonStyle = class _ToggleButtonStyle extends BaseStyle {
  name = "togglebutton";
  style = style3;
  classes = classes2;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ToggleButtonStyle_BaseFactory = void 0;
    return function ToggleButtonStyle_Factory(__ngFactoryType__) {
      return (\u0275ToggleButtonStyle_BaseFactory || (\u0275ToggleButtonStyle_BaseFactory = \u0275\u0275getInheritedFactory(_ToggleButtonStyle)))(__ngFactoryType__ || _ToggleButtonStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ToggleButtonStyle,
    factory: _ToggleButtonStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToggleButtonStyle, [{
    type: Injectable
  }], null, null);
})();
var ToggleButtonClasses;
(function(ToggleButtonClasses2) {
  ToggleButtonClasses2["root"] = "p-togglebutton";
  ToggleButtonClasses2["icon"] = "p-togglebutton-icon";
  ToggleButtonClasses2["iconLeft"] = "p-togglebutton-icon-left";
  ToggleButtonClasses2["iconRight"] = "p-togglebutton-icon-right";
  ToggleButtonClasses2["label"] = "p-togglebutton-label";
})(ToggleButtonClasses || (ToggleButtonClasses = {}));
var TOGGLEBUTTON_INSTANCE = new InjectionToken("TOGGLEBUTTON_INSTANCE");
var TOGGLEBUTTON_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ToggleButton),
  multi: true
};
var ToggleButton = class _ToggleButton extends BaseEditableHolder {
  componentName = "ToggleButton";
  $pcToggleButton = inject(TOGGLEBUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  bindDirectiveInstance = inject(Bind, { self: true });
  _componentStyle = inject(ToggleButtonStyle);
  /**
   * Label for the on state.
   * @group Props
   */
  onLabel = input(
    "Yes",
    ...ngDevMode ? [{ debugName: "onLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Label for the off state.
   * @group Props
   */
  offLabel = input(
    "No",
    ...ngDevMode ? [{ debugName: "offLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Icon for the on state.
   * @group Props
   */
  onIcon = input(
    ...ngDevMode ? [void 0, { debugName: "onIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Icon for the off state.
   * @group Props
   */
  offIcon = input(
    ...ngDevMode ? [void 0, { debugName: "offIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines a string that labels the input for accessibility.
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
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = input(0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "tabindex" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Position of the icon.
   * @group Props
   */
  iconPos = input(
    "left",
    ...ngDevMode ? [{ debugName: "iconPos" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autofocus" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
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
   * Whether selection can not be cleared.
   * @group Props
   */
  allowEmpty = input(
    ...ngDevMode ? [void 0, { debugName: "allowEmpty" }] : (
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
   * Callback to invoke on value change.
   * @param {ToggleButtonChangeEvent} event - Custom change event.
   * @group Emits
   */
  onChange = output();
  /**
   * Custom icon template.
   * @param {ToggleButtonIconTemplateContext} context - icon context.
   * @see {@link ToggleButtonIconTemplateContext}
   * @group Templates
   */
  iconTemplate = contentChild("icon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "iconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom content template.
   * @param {ToggleButtonContentTemplateContext} context - content context.
   * @see {@link ToggleButtonContentTemplateContext}
   * @group Templates
   */
  contentTemplate = contentChild("content", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "contentTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  checked = signal(
    false,
    ...ngDevMode ? [{ debugName: "checked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasOnLabel = computed(
    () => !!(this.onLabel() && this.onLabel().length > 0),
    ...ngDevMode ? [{ debugName: "hasOnLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasOffLabel = computed(
    () => !!(this.offLabel() && this.offLabel().length > 0),
    ...ngDevMode ? [{ debugName: "hasOffLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasIcon = computed(
    () => !!(this.onIcon() || this.offIcon()),
    ...ngDevMode ? [{ debugName: "hasIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasLabel = computed(
    () => this.checked() ? this.hasOnLabel() : this.hasOffLabel(),
    ...ngDevMode ? [{ debugName: "hasLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  active = computed(
    () => this.checked() === true,
    ...ngDevMode ? [{ debugName: "active" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dataP = computed(
    () => this.cn({
      checked: this.active(),
      invalid: this.invalid(),
      [this.size()]: this.size()
    }),
    ...ngDevMode ? [{ debugName: "dataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $tabindex = computed(
    () => this.$disabled() ? -1 : this.tabindex() ?? 0,
    ...ngDevMode ? [{ debugName: "$tabindex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  iconClass = computed(
    () => this.cn(this.cx("icon"), this.checked() ? this.onIcon() : this.offIcon(), this.iconPos() === "left" ? this.cx("iconLeft") : this.cx("iconRight")),
    ...ngDevMode ? [{ debugName: "iconClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labelText = computed(
    () => this.checked() ? this.onLabel() : this.offLabel(),
    ...ngDevMode ? [{ debugName: "labelText" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ariaPressed = computed(
    () => this.checked() ? "true" : "false",
    ...ngDevMode ? [{ debugName: "ariaPressed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  getTemplateContext() {
    return { $implicit: this.checked() };
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  onKeyDown(event) {
    switch (event.code) {
      case "Enter":
        this.toggle(event);
        event.preventDefault();
        break;
      case "Space":
        this.toggle(event);
        event.preventDefault();
        break;
    }
  }
  toggle(event) {
    if (!this.$disabled() && !(this.allowEmpty() === false && this.checked())) {
      this.checked.set(!this.checked());
      this.writeModelValue(this.checked());
      this.onModelChange(this.checked());
      this.onModelTouched();
      this.onChange.emit({
        originalEvent: event,
        checked: this.checked()
      });
    }
  }
  onInit() {
    if (this.checked() === null || this.checked() === void 0) {
      this.checked.set(false);
    }
  }
  onBlur() {
    this.onModelTouched();
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    this.checked.set(value);
    setModelValue(value);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ToggleButton_BaseFactory = void 0;
    return function ToggleButton_Factory(__ngFactoryType__) {
      return (\u0275ToggleButton_BaseFactory || (\u0275ToggleButton_BaseFactory = \u0275\u0275getInheritedFactory(_ToggleButton)))(__ngFactoryType__ || _ToggleButton);
    };
  })();
  static \u0275cmp = (function() {
    const _c0 = ["icon"];
    const _c1 = ["content"];
    function ToggleButton_ng_container_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function ToggleButton_Conditional_2_Conditional_0_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r0.iconClass());
        \u0275\u0275property("pBind", ctx_r0.ptm("icon"));
      }
    }
    function ToggleButton_Conditional_2_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, ToggleButton_Conditional_2_Conditional_0_Conditional_0_Template, 1, 3, "span", 2);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r0.hasIcon() ? 0 : -1);
      }
    }
    function ToggleButton_Conditional_2_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function ToggleButton_Conditional_2_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ToggleButton_Conditional_2_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 1);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.iconTemplate())("ngTemplateOutletContext", ctx_r0.getTemplateContext());
      }
    }
    function ToggleButton_Conditional_2_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 0);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("label"));
        \u0275\u0275property("pBind", ctx_r0.ptm("label"));
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r0.labelText());
      }
    }
    function ToggleButton_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, ToggleButton_Conditional_2_Conditional_0_Template, 1, 1)(1, ToggleButton_Conditional_2_Conditional_1_Template, 1, 2, "ng-container");
        \u0275\u0275conditionalCreate(2, ToggleButton_Conditional_2_Conditional_2_Template, 2, 4, "span", 2);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(!ctx_r0.iconTemplate() ? 0 : 1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx_r0.hasLabel() ? 2 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _ToggleButton,
      selectors: [["p-togglebutton"], ["p-toggle-button"]],
      contentQueries: function ToggleButton_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.iconTemplate, _c0, 4)(dirIndex, ctx.contentTemplate, _c1, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(2);
        }
      },
      hostVars: 11,
      hostBindings: function ToggleButton_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("keydown", function ToggleButton_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          })("click", function ToggleButton_click_HostBindingHandler($event) {
            return ctx.toggle($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("aria-labelledby", ctx.ariaLabelledBy())("aria-label", ctx.ariaLabel())("aria-pressed", ctx.ariaPressed())("role", "button")("tabindex", ctx.$tabindex())("data-pc-name", "togglebutton")("data-p-checked", ctx.active())("data-p-disabled", ctx.$disabled())("data-p", ctx.dataP());
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        onLabel: [1, "onLabel"],
        offLabel: [1, "offLabel"],
        onIcon: [1, "onIcon"],
        offIcon: [1, "offIcon"],
        ariaLabel: [1, "ariaLabel"],
        ariaLabelledBy: [1, "ariaLabelledBy"],
        inputId: [1, "inputId"],
        tabindex: [1, "tabindex"],
        iconPos: [1, "iconPos"],
        autofocus: [1, "autofocus"],
        size: [1, "size"],
        allowEmpty: [1, "allowEmpty"],
        fluid: [1, "fluid"]
      },
      outputs: {
        onChange: "onChange"
      },
      features: [\u0275\u0275ProvidersFeature([TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButtonStyle, { provide: TOGGLEBUTTON_INSTANCE, useExisting: _ToggleButton }, { provide: PARENT_INSTANCE, useExisting: _ToggleButton }]), \u0275\u0275HostDirectivesFeature([Ripple, Bind]), \u0275\u0275InheritDefinitionFeature],
      decls: 3,
      vars: 7,
      consts: [[3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", "pBind"]],
      template: function ToggleButton_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "span", 0);
          \u0275\u0275template(1, ToggleButton_ng_container_1_Template, 1, 0, "ng-container", 1);
          \u0275\u0275conditionalCreate(2, ToggleButton_Conditional_2_Template, 3, 2);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275classMap(ctx.cx("content"));
          \u0275\u0275property("pBind", ctx.ptm("content"));
          \u0275\u0275attribute("data-p", ctx.dataP());
          \u0275\u0275advance();
          \u0275\u0275property("ngTemplateOutlet", ctx.contentTemplate())("ngTemplateOutletContext", ctx.getTemplateContext());
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx.contentTemplate() ? 2 : -1);
        }
      },
      dependencies: [NgTemplateOutlet, SharedModule, BindModule, Bind],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToggleButton, [{
    type: Component,
    args: [{
      selector: "p-togglebutton, p-toggle-button",
      standalone: true,
      imports: [NgTemplateOutlet, SharedModule, BindModule],
      hostDirectives: [{ directive: Ripple }, Bind],
      host: {
        "[class]": "cx('root')",
        "[attr.aria-labelledby]": "ariaLabelledBy()",
        "[attr.aria-label]": "ariaLabel()",
        "[attr.aria-pressed]": "ariaPressed()",
        "[attr.role]": '"button"',
        "[attr.tabindex]": "$tabindex()",
        "[attr.data-pc-name]": "'togglebutton'",
        "[attr.data-p-checked]": "active()",
        "[attr.data-p-disabled]": "$disabled()",
        "[attr.data-p]": "dataP()"
      },
      template: `<span [class]="cx('content')" [pBind]="ptm('content')" [attr.data-p]="dataP()">
        <ng-container *ngTemplateOutlet="contentTemplate(); context: getTemplateContext()"></ng-container>
        @if (!contentTemplate()) {
            @if (!iconTemplate()) {
                @if (hasIcon()) {
                    <span [class]="iconClass()" [pBind]="ptm('icon')"></span>
                }
            } @else {
                <ng-container *ngTemplateOutlet="iconTemplate(); context: getTemplateContext()"></ng-container>
            }
            @if (hasLabel()) {
                <span [class]="cx('label')" [pBind]="ptm('label')">{{ labelText() }}</span>
            }
        }
    </span>`,
      providers: [TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButtonStyle, { provide: TOGGLEBUTTON_INSTANCE, useExisting: ToggleButton }, { provide: PARENT_INSTANCE, useExisting: ToggleButton }],
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, { onLabel: [{ type: Input, args: [{ isSignal: true, alias: "onLabel", required: false }] }], offLabel: [{ type: Input, args: [{ isSignal: true, alias: "offLabel", required: false }] }], onIcon: [{ type: Input, args: [{ isSignal: true, alias: "onIcon", required: false }] }], offIcon: [{ type: Input, args: [{ isSignal: true, alias: "offIcon", required: false }] }], ariaLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], ariaLabelledBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabelledBy", required: false }] }], inputId: [{ type: Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], tabindex: [{ type: Input, args: [{ isSignal: true, alias: "tabindex", required: false }] }], iconPos: [{ type: Input, args: [{ isSignal: true, alias: "iconPos", required: false }] }], autofocus: [{ type: Input, args: [{ isSignal: true, alias: "autofocus", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], allowEmpty: [{ type: Input, args: [{ isSignal: true, alias: "allowEmpty", required: false }] }], fluid: [{ type: Input, args: [{ isSignal: true, alias: "fluid", required: false }] }], onChange: [{ type: Output, args: ["onChange"] }], iconTemplate: [{ type: ContentChild, args: ["icon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], contentTemplate: [{ type: ContentChild, args: ["content", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], onKeyDown: [{
    type: HostListener,
    args: ["keydown", ["$event"]]
  }], toggle: [{
    type: HostListener,
    args: ["click", ["$event"]]
  }] });
})();
var ToggleButtonModule = class _ToggleButtonModule {
  static \u0275fac = function ToggleButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToggleButtonModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ToggleButtonModule,
    imports: [ToggleButton, SharedModule],
    exports: [ToggleButton, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [ToggleButton, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToggleButtonModule, [{
    type: NgModule,
    args: [{
      imports: [ToggleButton, SharedModule],
      exports: [ToggleButton, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/selectbutton/index.mjs
var style4 = "\n    .p-selectbutton {\n        display: inline-flex;\n        user-select: none;\n        vertical-align: bottom;\n        outline-color: transparent;\n        border-radius: dt('selectbutton.border.radius');\n    }\n\n    .p-selectbutton .p-togglebutton {\n        border-radius: 0;\n        border-width: 1px 1px 1px 0;\n    }\n\n    .p-selectbutton .p-togglebutton:focus-visible {\n        position: relative;\n        z-index: 1;\n    }\n\n    .p-selectbutton .p-togglebutton:first-child {\n        border-inline-start-width: 1px;\n        border-start-start-radius: dt('selectbutton.border.radius');\n        border-end-start-radius: dt('selectbutton.border.radius');\n    }\n\n    .p-selectbutton .p-togglebutton:last-child {\n        border-start-end-radius: dt('selectbutton.border.radius');\n        border-end-end-radius: dt('selectbutton.border.radius');\n    }\n\n    .p-selectbutton.p-invalid {\n        outline: 1px solid dt('selectbutton.invalid.border.color');\n        outline-offset: 0;\n    }\n\n    .p-selectbutton-fluid {\n        width: 100%;\n    }\n    \n    .p-selectbutton-fluid .p-togglebutton {\n        flex: 1 1 0;\n    }\n";

// node_modules/primeng/fesm2022/primeng-selectbutton.mjs
var classes3 = {
  root: ({ instance }) => [
    "p-selectbutton p-component",
    {
      "p-invalid": instance.invalid(),
      "p-selectbutton-fluid": instance.fluid()
    }
  ]
};
var SelectButtonStyle = class _SelectButtonStyle extends BaseStyle {
  name = "selectbutton";
  style = style4;
  classes = classes3;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectButtonStyle_BaseFactory = void 0;
    return function SelectButtonStyle_Factory(__ngFactoryType__) {
      return (\u0275SelectButtonStyle_BaseFactory || (\u0275SelectButtonStyle_BaseFactory = \u0275\u0275getInheritedFactory(_SelectButtonStyle)))(__ngFactoryType__ || _SelectButtonStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SelectButtonStyle,
    factory: _SelectButtonStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectButtonStyle, [{
    type: Injectable
  }], null, null);
})();
var SelectButtonClasses;
(function(SelectButtonClasses2) {
  SelectButtonClasses2["root"] = "p-selectbutton";
})(SelectButtonClasses || (SelectButtonClasses = {}));
var SELECTBUTTON_INSTANCE = new InjectionToken("SELECTBUTTON_INSTANCE");
var SELECTBUTTON_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButton),
  multi: true
};
var SelectButton = class _SelectButton extends BaseEditableHolder {
  componentName = "SelectButton";
  /**
   * An array of selectitems to display as the available options.
   * @group Props
   */
  options = input(
    ...ngDevMode ? [void 0, { debugName: "options" }] : (
      /* istanbul ignore next */
      []
    )
  );
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
   * Whether selection can be cleared.
   * @group Props
   */
  unselectable = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "unselectable" } : (
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
   * When specified, allows selecting multiple values.
   * @group Props
   */
  multiple = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "multiple" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether selection can not be cleared.
   * @group Props
   */
  allowEmpty = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "allowEmpty" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass = input(
    ...ngDevMode ? [void 0, { debugName: "styleClass" }] : (
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
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autofocus" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
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
   * Spans 100% width of the container when enabled.
   * @defaultValue undefined
   * @group Props
   */
  fluid = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "fluid" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Callback to invoke on input click.
   * @param {SelectButtonOptionClickEvent} event - Custom click event.
   * @group Emits
   */
  onOptionClick = output();
  /**
   * Callback to invoke on selection change.
   * @param {SelectButtonChangeEvent} event - Custom change event.
   * @group Emits
   */
  onChange = output();
  /**
   * Custom item template.
   * @param {SelectButtonItemTemplateContext} context - item context.
   * @see {@link SelectButtonItemTemplateContext}
   * @group Templates
   */
  itemTemplate = contentChild("item", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "itemTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  equalityKey = computed(
    () => this.optionValue() ? null : this.dataKey(),
    ...ngDevMode ? [{ debugName: "equalityKey" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $allowEmpty = computed(
    () => this.unselectable() ? false : this.allowEmpty(),
    ...ngDevMode ? [{ debugName: "$allowEmpty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dataP = computed(
    () => this.cn({
      invalid: this.invalid()
    }),
    ...ngDevMode ? [{ debugName: "dataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  value = signal(
    null,
    ...ngDevMode ? [{ debugName: "value" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusedIndex = signal(
    0,
    ...ngDevMode ? [{ debugName: "focusedIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _componentStyle = inject(SelectButtonStyle);
  $pcSelectButton = inject(SELECTBUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  bindDirectiveInstance = inject(Bind, { self: true });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  getAllowEmpty() {
    if (this.multiple()) {
      return this.$allowEmpty() || this.value()?.length !== 1;
    }
    return this.$allowEmpty();
  }
  getOptionLabel(option) {
    const optionLabel = this.optionLabel();
    return optionLabel ? d(option, optionLabel) : option.label != void 0 ? option.label : option;
  }
  getOptionValue(option) {
    const optionValue = this.optionValue();
    const optionLabel = this.optionLabel();
    return optionValue ? d(option, optionValue) : optionLabel || option.value === void 0 ? option : option.value;
  }
  isOptionDisabled(option) {
    const optionDisabled = this.optionDisabled();
    return optionDisabled ? d(option, optionDisabled) : option.disabled !== void 0 ? option.disabled : false;
  }
  isButtonDisabled(option) {
    return this.$disabled() || this.isOptionDisabled(option);
  }
  getItemContext(option, index) {
    return { $implicit: option, index };
  }
  onOptionSelect(event, option, index) {
    if (this.$disabled() || this.isOptionDisabled(option)) {
      return;
    }
    let selected = this.isSelected(option);
    if (selected && this.unselectable()) {
      return;
    }
    let optionValue = this.getOptionValue(option);
    let newValue;
    if (this.multiple()) {
      if (selected)
        newValue = this.value().filter((val) => !b(val, optionValue, this.equalityKey() || void 0));
      else
        newValue = this.value() ? [...this.value(), optionValue] : [optionValue];
    } else {
      if (selected && !this.$allowEmpty()) {
        return;
      }
      newValue = selected ? null : optionValue;
    }
    this.focusedIndex.set(index);
    this.value.set(newValue);
    this.writeModelValue(this.value());
    this.onModelChange(this.value());
    this.onChange.emit({
      originalEvent: event.originalEvent,
      value: this.value()
    });
    this.onOptionClick.emit({
      originalEvent: event.originalEvent,
      option,
      index
    });
  }
  changeTabIndexes(event, direction) {
    let firstTabableChild;
    let index;
    for (let i = 0; i <= this.el.nativeElement.children.length - 1; i++) {
      if (this.el.nativeElement.children[i].getAttribute("tabindex") === "0")
        firstTabableChild = { elem: this.el.nativeElement.children[i], index: i };
    }
    if (!firstTabableChild)
      return;
    if (direction === "prev") {
      if (firstTabableChild.index === 0)
        index = this.el.nativeElement.children.length - 1;
      else
        index = firstTabableChild.index - 1;
    } else {
      if (firstTabableChild.index === this.el.nativeElement.children.length - 1)
        index = 0;
      else
        index = firstTabableChild.index + 1;
    }
    this.focusedIndex.set(index);
    this.el.nativeElement.children[index].focus();
  }
  onFocus(event, index) {
    this.focusedIndex.set(index);
  }
  onBlur() {
    this.onModelTouched();
  }
  removeOption(option) {
    this.value.set(this.value().filter((val) => !b(val, this.getOptionValue(option), this.dataKey())));
  }
  isSelected(option) {
    let selected = false;
    const optionValue = this.getOptionValue(option);
    if (this.multiple()) {
      if (this.value() && Array.isArray(this.value())) {
        for (let val of this.value()) {
          if (b(val, optionValue, this.dataKey())) {
            selected = true;
            break;
          }
        }
      }
    } else {
      selected = b(this.getOptionValue(option), this.value(), this.equalityKey() || void 0);
    }
    return selected;
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    this.value.set(value);
    setModelValue(this.value());
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275SelectButton_BaseFactory = void 0;
    return function SelectButton_Factory(__ngFactoryType__) {
      return (\u0275SelectButton_BaseFactory || (\u0275SelectButton_BaseFactory = \u0275\u0275getInheritedFactory(_SelectButton)))(__ngFactoryType__ || _SelectButton);
    };
  })();
  static \u0275cmp = (function() {
    const _c0 = ["item"];
    function _forTrack0($index, $item) {
      return this.getOptionLabel($item);
    }
    function SelectButton_For_1_Conditional_1_ng_template_0_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function SelectButton_For_1_Conditional_1_ng_template_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, SelectButton_For_1_Conditional_1_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 3);
      }
      if (rf & 2) {
        const ctx_r5 = \u0275\u0275nextContext(2);
        const option_r3 = ctx_r5.$implicit;
        const \u0275$index_1_r4 = ctx_r5.$index;
        const ctx_r4 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", ctx_r4.itemTemplate())("ngTemplateOutletContext", ctx_r4.getItemContext(option_r3, \u0275$index_1_r4));
      }
    }
    function SelectButton_For_1_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, SelectButton_For_1_Conditional_1_ng_template_0_Template, 1, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      }
    }
    function SelectButton_For_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "p-togglebutton", 2);
        \u0275\u0275controlCreate();
        \u0275\u0275listener("onChange", function SelectButton_For_1_Template_p_togglebutton_onChange_0_listener($event) {
          const ctx_r1 = \u0275\u0275restoreView(_r1);
          const option_r3 = ctx_r1.$implicit;
          const \u0275$index_1_r4 = ctx_r1.$index;
          const ctx_r4 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r4.onOptionSelect($event, option_r3, \u0275$index_1_r4));
        });
        \u0275\u0275conditionalCreate(1, SelectButton_For_1_Conditional_1_Template, 2, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const option_r3 = ctx.$implicit;
        const ctx_r4 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r4.styleClass());
        \u0275\u0275property("autofocus", ctx_r4.autofocus())("ngModel", ctx_r4.isSelected(option_r3))("onLabel", ctx_r4.getOptionLabel(option_r3))("offLabel", ctx_r4.getOptionLabel(option_r3))("ariaLabel", ctx_r4.getOptionLabel(option_r3))("disabled", ctx_r4.isButtonDisabled(option_r3))("allowEmpty", ctx_r4.getAllowEmpty())("size", ctx_r4.size())("fluid", ctx_r4.fluid())("pt", ctx_r4.ptm("pcToggleButton"))("unstyled", ctx_r4.unstyled());
        \u0275\u0275control();
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r4.itemTemplate() ? 1 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _SelectButton,
      selectors: [["p-selectbutton"], ["p-select-button"]],
      contentQueries: function SelectButton_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.itemTemplate, _c0, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
        }
      },
      hostVars: 5,
      hostBindings: function SelectButton_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("role", "group")("aria-labelledby", ctx.ariaLabelledBy())("data-p", ctx.dataP());
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        options: [1, "options"],
        optionLabel: [1, "optionLabel"],
        optionValue: [1, "optionValue"],
        optionDisabled: [1, "optionDisabled"],
        unselectable: [1, "unselectable"],
        tabindex: [1, "tabindex"],
        multiple: [1, "multiple"],
        allowEmpty: [1, "allowEmpty"],
        styleClass: [1, "styleClass"],
        ariaLabelledBy: [1, "ariaLabelledBy"],
        dataKey: [1, "dataKey"],
        autofocus: [1, "autofocus"],
        size: [1, "size"],
        fluid: [1, "fluid"]
      },
      outputs: {
        onOptionClick: "onOptionClick",
        onChange: "onChange"
      },
      features: [\u0275\u0275ProvidersFeature([SELECTBUTTON_VALUE_ACCESSOR, SelectButtonStyle, { provide: SELECTBUTTON_INSTANCE, useExisting: _SelectButton }, { provide: PARENT_INSTANCE, useExisting: _SelectButton }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      consts: [["content", ""], [3, "autofocus", "class", "ngModel", "onLabel", "offLabel", "ariaLabel", "disabled", "allowEmpty", "size", "fluid", "pt", "unstyled"], [3, "onChange", "autofocus", "ngModel", "onLabel", "offLabel", "ariaLabel", "disabled", "allowEmpty", "size", "fluid", "pt", "unstyled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
      template: function SelectButton_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, SelectButton_For_1_Template, 2, 14, "p-togglebutton", 1, _forTrack0, true);
        }
        if (rf & 2) {
          \u0275\u0275repeater(ctx.options());
        }
      },
      dependencies: [ToggleButton, FormsModule, NgControlStatus, NgModel, NgTemplateOutlet, SharedModule, BindModule],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectButton, [{
    type: Component,
    args: [{
      selector: "p-selectbutton, p-select-button",
      standalone: true,
      imports: [ToggleButton, FormsModule, NgTemplateOutlet, SharedModule, BindModule],
      template: `
        @for (option of options(); track getOptionLabel(option); let i = $index) {
            <p-togglebutton
                [autofocus]="autofocus()"
                [class]="styleClass()"
                [ngModel]="isSelected(option)"
                [onLabel]="getOptionLabel(option)"
                [offLabel]="getOptionLabel(option)"
                [ariaLabel]="getOptionLabel(option)"
                [disabled]="isButtonDisabled(option)"
                (onChange)="onOptionSelect($event, option, i)"
                [allowEmpty]="getAllowEmpty()"
                [size]="size()"
                [fluid]="fluid()"
                [pt]="ptm('pcToggleButton')"
                [unstyled]="unstyled()"
            >
                @if (itemTemplate()) {
                    <ng-template #content>
                        <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemContext(option, i)"></ng-container>
                    </ng-template>
                }
            </p-togglebutton>
        }
    `,
      providers: [SELECTBUTTON_VALUE_ACCESSOR, SelectButtonStyle, { provide: SELECTBUTTON_INSTANCE, useExisting: SelectButton }, { provide: PARENT_INSTANCE, useExisting: SelectButton }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cx('root')",
        "[attr.role]": '"group"',
        "[attr.aria-labelledby]": "ariaLabelledBy()",
        "[attr.data-p]": "dataP()"
      },
      hostDirectives: [Bind]
    }]
  }], null, { options: [{ type: Input, args: [{ isSignal: true, alias: "options", required: false }] }], optionLabel: [{ type: Input, args: [{ isSignal: true, alias: "optionLabel", required: false }] }], optionValue: [{ type: Input, args: [{ isSignal: true, alias: "optionValue", required: false }] }], optionDisabled: [{ type: Input, args: [{ isSignal: true, alias: "optionDisabled", required: false }] }], unselectable: [{ type: Input, args: [{ isSignal: true, alias: "unselectable", required: false }] }], tabindex: [{ type: Input, args: [{ isSignal: true, alias: "tabindex", required: false }] }], multiple: [{ type: Input, args: [{ isSignal: true, alias: "multiple", required: false }] }], allowEmpty: [{ type: Input, args: [{ isSignal: true, alias: "allowEmpty", required: false }] }], styleClass: [{ type: Input, args: [{ isSignal: true, alias: "styleClass", required: false }] }], ariaLabelledBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabelledBy", required: false }] }], dataKey: [{ type: Input, args: [{ isSignal: true, alias: "dataKey", required: false }] }], autofocus: [{ type: Input, args: [{ isSignal: true, alias: "autofocus", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], fluid: [{ type: Input, args: [{ isSignal: true, alias: "fluid", required: false }] }], onOptionClick: [{ type: Output, args: ["onOptionClick"] }], onChange: [{ type: Output, args: ["onChange"] }], itemTemplate: [{ type: ContentChild, args: ["item", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }] });
})();
var SelectButtonModule = class _SelectButtonModule {
  static \u0275fac = function SelectButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectButtonModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _SelectButtonModule,
    imports: [SelectButton, SharedModule],
    exports: [SelectButton, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [SelectButton, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectButtonModule, [{
    type: NgModule,
    args: [{
      imports: [SelectButton, SharedModule],
      exports: [SelectButton, SharedModule]
    }]
  }], null, null);
})();

// src/app/core/geo/approximate-location.ts
var LocationError = class extends Error {
  constructor(code) {
    super(code === "unavailable" ? "Geolocation is not available on this device" : "The location could not be obtained");
    this.code = code;
  }
  code;
  get translationKey() {
    return `errors.location.${this.code}`;
  }
};
var APPROXIMATE_DECIMALS = 2;
var MEETING_POINT_DECIMALS = 3;
var roundCoordinate = (value, decimals = APPROXIMATE_DECIMALS) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};
var ApproximateLocation = class _ApproximateLocation {
  current(decimals = APPROXIMATE_DECIMALS) {
    return new Promise((resolve, reject) => {
      if (!globalThis.navigator?.geolocation) {
        reject(new LocationError("unavailable"));
        return;
      }
      globalThis.navigator.geolocation.getCurrentPosition((position) => resolve({
        latitude: roundCoordinate(position.coords.latitude, decimals),
        longitude: roundCoordinate(position.coords.longitude, decimals)
      }), () => reject(new LocationError("denied")), { enableHighAccuracy: false, timeout: 1e4, maximumAge: 6e5 });
    });
  }
  static \u0275fac = function ApproximateLocation_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApproximateLocation)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApproximateLocation, factory: _ApproximateLocation.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApproximateLocation, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// node_modules/@primeicons/core/dist/esm/icons/chevron-down.mjs
var o = { name: "chevron-down", meta: { tags: ["chevron-down", "down", "fall", "decrease", "lower"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M14.4697 6.96973C14.7626 6.67684 15.2374 6.67684 15.5303 6.96973C15.8232 7.26262 15.8232 7.73738 15.5303 8.03028L10.5303 13.0303C10.2374 13.3232 9.76262 13.3232 9.46972 13.0303L4.46972 8.03028C4.17683 7.73738 4.17683 7.26262 4.46972 6.96973C4.76262 6.67684 5.23738 6.67684 5.53027 6.96973L10 11.4395L14.4697 6.96973Z", fill: "currentColor", key: "a1s1p6" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-chevron-down.mjs
var ChevronDown = class _ChevronDown extends CoreIcon {
  constructor() {
    super();
    this._icon = o;
  }
  static \u0275fac = function ChevronDown_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChevronDown)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
    function ChevronDown_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function ChevronDown_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function ChevronDown_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function ChevronDown_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function ChevronDown_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function ChevronDown_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function ChevronDown_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function ChevronDown_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, ChevronDown_For_1_Case_0_Template, 1, 9, ":svg:path")(1, ChevronDown_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, ChevronDown_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, ChevronDown_For_1_Case_3_Template, 1, 7, ":svg:line")(4, ChevronDown_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, ChevronDown_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, ChevronDown_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _ChevronDown,
      selectors: [["svg", "data-p-icon", "chevron-down"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function ChevronDown_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, ChevronDown_For_1_Template, 7, 1, null, null, _forTrack0);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChevronDown, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="chevron-down"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeicons/core/dist/esm/icons/search.mjs
var e = { name: "search", meta: { tags: ["search", "find", "query", "lookup", "discover"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M8.76953 1.25C12.9226 1.25 16.2898 4.61656 16.29 8.76953C16.29 10.576 15.6515 12.2326 14.5898 13.5293L18.5303 17.4697C18.823 17.7626 18.8231 18.2374 18.5303 18.5303C18.2374 18.8231 17.7626 18.823 17.4697 18.5303L13.5293 14.5898C12.2326 15.6515 10.576 16.29 8.76953 16.29C4.61656 16.2898 1.25 12.9226 1.25 8.76953C1.25025 4.61672 4.61672 1.25025 8.76953 1.25ZM8.76953 2.75C5.44515 2.75025 2.75025 5.44514 2.75 8.76953C2.75 12.0941 5.44499 14.7898 8.76953 14.79C12.0943 14.79 14.79 12.0943 14.79 8.76953C14.7898 5.445 12.0941 2.75 8.76953 2.75Z", fill: "currentColor", key: "nt0lcw" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-search.mjs
var Search = class _Search extends CoreIcon {
  constructor() {
    super();
    this._icon = e;
  }
  static \u0275fac = function Search_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Search)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
    function Search_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Search_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Search_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Search_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Search_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Search_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Search_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Search_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Search_For_1_Case_0_Template, 1, 9, ":svg:path")(1, Search_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, Search_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, Search_For_1_Case_3_Template, 1, 7, ":svg:line")(4, Search_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, Search_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, Search_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Search,
      selectors: [["svg", "data-p-icon", "search"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function Search_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, Search_For_1_Template, 7, 1, null, null, _forTrack0);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Search, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="search"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeuix/styles/dist/iconfield/index.mjs
var style5 = "\n    .p-iconfield {\n        position: relative;\n        display: block;\n    }\n\n    .p-inputicon {\n        position: absolute;\n        top: 50%;\n        margin-top: calc(-1 * (dt('icon.size') / 2));\n        color: dt('iconfield.icon.color');\n        line-height: 1;\n        z-index: 1;\n    }\n\n    .p-iconfield .p-inputicon:first-child {\n        inset-inline-start: dt('form.field.padding.x');\n    }\n\n    .p-iconfield .p-inputicon:last-child {\n        inset-inline-end: dt('form.field.padding.x');\n    }\n\n    .p-iconfield .p-inputtext:not(:first-child),\n    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {\n        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-iconfield .p-inputtext:not(:last-child) {\n        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));\n    }\n\n    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {\n        font-size: dt('form.field.sm.font.size');\n        width: dt('form.field.sm.font.size');\n        height: dt('form.field.sm.font.size');\n        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));\n    }\n\n    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {\n        font-size: dt('form.field.lg.font.size');\n        width: dt('form.field.lg.font.size');\n        height: dt('form.field.lg.font.size');\n        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));\n    }\n";

// node_modules/primeng/fesm2022/primeng-iconfield.mjs
var classes4 = {
  root: "p-iconfield"
};
var IconFieldStyle = class _IconFieldStyle extends BaseStyle {
  name = "iconfield";
  style = style5;
  classes = classes4;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275IconFieldStyle_BaseFactory = void 0;
    return function IconFieldStyle_Factory(__ngFactoryType__) {
      return (\u0275IconFieldStyle_BaseFactory || (\u0275IconFieldStyle_BaseFactory = \u0275\u0275getInheritedFactory(_IconFieldStyle)))(__ngFactoryType__ || _IconFieldStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _IconFieldStyle,
    factory: _IconFieldStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconFieldStyle, [{
    type: Injectable
  }], null, null);
})();
var IconFieldClasses;
(function(IconFieldClasses2) {
  IconFieldClasses2["root"] = "p-iconfield";
})(IconFieldClasses || (IconFieldClasses = {}));
var ICONFIELD_INSTANCE = new InjectionToken("ICONFIELD_INSTANCE");
var IconField = class _IconField extends BaseComponent {
  componentName = "IconField";
  hostName = input(
    "",
    ...ngDevMode ? [{ debugName: "hostName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _componentStyle = inject(IconFieldStyle);
  $pcIconField = inject(ICONFIELD_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  bindDirectiveInstance = inject(Bind, { self: true });
  /**
   * Position of the icon.
   * @group Props
   */
  iconPosition = input(
    "left",
    ...ngDevMode ? [{ debugName: "iconPosition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275IconField_BaseFactory = void 0;
    return function IconField_Factory(__ngFactoryType__) {
      return (\u0275IconField_BaseFactory || (\u0275IconField_BaseFactory = \u0275\u0275getInheritedFactory(_IconField)))(__ngFactoryType__ || _IconField);
    };
  })();
  static \u0275cmp = (function() {
    const _c0 = ["*"];
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _IconField,
      selectors: [["p-iconfield"], ["p-icon-field"]],
      hostVars: 2,
      hostBindings: function IconField_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        hostName: [1, "hostName"],
        iconPosition: [1, "iconPosition"]
      },
      features: [\u0275\u0275ProvidersFeature([IconFieldStyle, { provide: ICONFIELD_INSTANCE, useExisting: _IconField }, { provide: PARENT_INSTANCE, useExisting: _IconField }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function IconField_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275projection(0);
        }
      },
      dependencies: [BindModule],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconField, [{
    type: Component,
    args: [{
      selector: "p-iconfield, p-icon-field",
      standalone: true,
      imports: [BindModule],
      template: ` <ng-content></ng-content>`,
      providers: [IconFieldStyle, { provide: ICONFIELD_INSTANCE, useExisting: IconField }, { provide: PARENT_INSTANCE, useExisting: IconField }],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class]": "cx('root')"
      },
      hostDirectives: [Bind]
    }]
  }], null, { hostName: [{ type: Input, args: [{ isSignal: true, alias: "hostName", required: false }] }], iconPosition: [{ type: Input, args: [{ isSignal: true, alias: "iconPosition", required: false }] }] });
})();
var IconFieldModule = class _IconFieldModule {
  static \u0275fac = function IconFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IconFieldModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _IconFieldModule,
    imports: [IconField],
    exports: [IconField]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [IconField]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IconFieldModule, [{
    type: NgModule,
    args: [{
      imports: [IconField],
      exports: [IconField]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-inputicon.mjs
var classes5 = {
  root: "p-inputicon"
};
var InputIconStyle = class _InputIconStyle extends BaseStyle {
  name = "inputicon";
  classes = classes5;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275InputIconStyle_BaseFactory = void 0;
    return function InputIconStyle_Factory(__ngFactoryType__) {
      return (\u0275InputIconStyle_BaseFactory || (\u0275InputIconStyle_BaseFactory = \u0275\u0275getInheritedFactory(_InputIconStyle)))(__ngFactoryType__ || _InputIconStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _InputIconStyle,
    factory: _InputIconStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIconStyle, [{
    type: Injectable
  }], null, null);
})();
var INPUTICON_INSTANCE = new InjectionToken("INPUTICON_INSTANCE");
var InputIcon = class _InputIcon extends BaseComponent {
  componentName = "InputIcon";
  hostName = input(
    "",
    ...ngDevMode ? [{ debugName: "hostName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _componentStyle = inject(InputIconStyle);
  $pcInputIcon = inject(INPUTICON_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  bindDirectiveInstance = inject(Bind, { self: true });
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275InputIcon_BaseFactory = void 0;
    return function InputIcon_Factory(__ngFactoryType__) {
      return (\u0275InputIcon_BaseFactory || (\u0275InputIcon_BaseFactory = \u0275\u0275getInheritedFactory(_InputIcon)))(__ngFactoryType__ || _InputIcon);
    };
  })();
  static \u0275cmp = (function() {
    const _c0 = ["*"];
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _InputIcon,
      selectors: [["p-inputicon"]],
      hostVars: 2,
      hostBindings: function InputIcon_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        hostName: [1, "hostName"]
      },
      features: [\u0275\u0275ProvidersFeature([InputIconStyle, { provide: INPUTICON_INSTANCE, useExisting: _InputIcon }, { provide: PARENT_INSTANCE, useExisting: _InputIcon }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function InputIcon_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275projection(0);
        }
      },
      dependencies: [SharedModule],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIcon, [{
    type: Component,
    args: [{
      selector: "p-inputicon",
      standalone: true,
      imports: [SharedModule],
      template: `<ng-content></ng-content>`,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [InputIconStyle, { provide: INPUTICON_INSTANCE, useExisting: InputIcon }, { provide: PARENT_INSTANCE, useExisting: InputIcon }],
      hostDirectives: [Bind],
      host: {
        "[class]": "cx('root')"
      }
    }]
  }], null, { hostName: [{ type: Input, args: [{ isSignal: true, alias: "hostName", required: false }] }] });
})();
var InputIconModule = class _InputIconModule {
  static \u0275fac = function InputIconModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputIconModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _InputIconModule,
    imports: [InputIcon, SharedModule],
    exports: [InputIcon, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [InputIcon, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputIconModule, [{
    type: NgModule,
    args: [{
      imports: [InputIcon, SharedModule],
      exports: [InputIcon, SharedModule]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-utils.mjs
var ObjectUtils = class _ObjectUtils {
  static isArray(value, empty = true) {
    return Array.isArray(value) && (empty || value.length !== 0);
  }
  static isObject(value, empty = true) {
    return typeof value === "object" && !Array.isArray(value) && value != null && (empty || Object.keys(value).length !== 0);
  }
  static equals(obj1, obj2, field) {
    if (field)
      return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else
      return this.equalsByValue(obj1, obj2);
  }
  static equalsByValue(obj1, obj2) {
    if (obj1 === obj2)
      return true;
    if (obj1 && obj2 && typeof obj1 == "object" && typeof obj2 == "object") {
      let arrA = Array.isArray(obj1), arrB = Array.isArray(obj2), i, length, key;
      if (arrA && arrB) {
        length = obj1.length;
        if (length != obj2.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!this.equalsByValue(obj1[i], obj2[i]))
            return false;
        return true;
      }
      if (arrA != arrB)
        return false;
      let dateA = this.isDate(obj1), dateB = this.isDate(obj2);
      if (dateA != dateB)
        return false;
      if (dateA && dateB)
        return obj1.getTime() == obj2.getTime();
      let regexpA = obj1 instanceof RegExp, regexpB = obj2 instanceof RegExp;
      if (regexpA != regexpB)
        return false;
      if (regexpA && regexpB)
        return obj1.toString() == obj2.toString();
      let keys = Object.keys(obj1);
      length = keys.length;
      if (length !== Object.keys(obj2).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(obj2, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.equalsByValue(obj1[key], obj2[key]))
          return false;
      }
      return true;
    }
    return obj1 !== obj1 && obj2 !== obj2;
  }
  static resolveFieldData(data, field) {
    if (data && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf(".") == -1) {
        return data[field];
      } else {
        let fields = field.split(".");
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }
  static isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }
  static reorderArray(value, from2, to) {
    if (value && from2 !== to) {
      if (to >= value.length) {
        to %= value.length;
        from2 %= value.length;
      }
      value.splice(to, 0, value.splice(from2, 1)[0]);
    }
  }
  static insertIntoOrderedArray(item, index, arr, sourceArr) {
    if (arr.length > 0) {
      let injected = false;
      for (let i = 0; i < arr.length; i++) {
        let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  }
  static findIndexInList(item, list) {
    let index = -1;
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] == item) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
  static contains(value, list) {
    if (value != null && list && list.length) {
      for (let val of list) {
        if (this.equals(value, val))
          return true;
      }
    }
    return false;
  }
  static removeAccents(str) {
    if (str) {
      str = str.normalize("NFKD").replace(new RegExp("\\p{Diacritic}", "gu"), "");
    }
    return str;
  }
  static isDate(input2) {
    return Object.prototype.toString.call(input2) === "[object Date]";
  }
  static isEmpty(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !this.isDate(value) && typeof value === "object" && Object.keys(value).length === 0;
  }
  static isNotEmpty(value) {
    return !this.isEmpty(value);
  }
  static compare(value1, value2, locale, order = 1) {
    let result = -1;
    const emptyValue1 = this.isEmpty(value1);
    const emptyValue2 = this.isEmpty(value2);
    if (emptyValue1 && emptyValue2)
      result = 0;
    else if (emptyValue1)
      result = order;
    else if (emptyValue2)
      result = -order;
    else if (typeof value1 === "string" && typeof value2 === "string")
      result = value1.localeCompare(value2, locale, { numeric: true });
    else
      result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return result;
  }
  static sort(value1, value2, order = 1, locale, nullSortOrder = 1) {
    const result = _ObjectUtils.compare(value1, value2, locale, order);
    let finalSortOrder = order;
    if (_ObjectUtils.isEmpty(value1) || _ObjectUtils.isEmpty(value2)) {
      finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
    }
    return finalSortOrder * result;
  }
  static merge(obj1, obj2) {
    if (obj1 == void 0 && obj2 == void 0) {
      return void 0;
    } else if ((obj1 == void 0 || typeof obj1 === "object") && (obj2 == void 0 || typeof obj2 === "object")) {
      return __spreadValues(__spreadValues({}, obj1 || {}), obj2 || {});
    } else if ((obj1 == void 0 || typeof obj1 === "string") && (obj2 == void 0 || typeof obj2 === "string")) {
      return [obj1 || "", obj2 || ""].join(" ");
    }
    return obj2 || obj1;
  }
  static isPrintableCharacter(char = "") {
    return this.isNotEmpty(char) && char.length === 1 && char.match(/\S| /);
  }
  static getItemValue(obj, ...params) {
    return this.isFunction(obj) ? obj(...params) : obj;
  }
  static findLastIndex(arr, callback) {
    let index = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index = arr.findLastIndex(callback);
      } catch {
        index = arr.lastIndexOf([...arr].reverse().find(callback));
      }
    }
    return index;
  }
  static findLast(arr, callback) {
    let item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch {
        item = [...arr].reverse().find(callback);
      }
    }
    return item;
  }
  static deepEquals(a, b2) {
    if (a === b2)
      return true;
    if (a && b2 && typeof a == "object" && typeof b2 == "object") {
      let arrA = Array.isArray(a), arrB = Array.isArray(b2), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b2.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!this.deepEquals(a[i], b2[i]))
            return false;
        return true;
      }
      if (arrA != arrB)
        return false;
      let dateA = a instanceof Date, dateB = b2 instanceof Date;
      if (dateA != dateB)
        return false;
      if (dateA && dateB)
        return a.getTime() == b2.getTime();
      let regexpA = a instanceof RegExp, regexpB = b2 instanceof RegExp;
      if (regexpA != regexpB)
        return false;
      if (regexpA && regexpB)
        return a.toString() == b2.toString();
      let keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b2).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b2, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b2[key]))
          return false;
      }
      return true;
    }
    return a !== a && b2 !== b2;
  }
  static minifyCSS(css2) {
    return css2 ? css2.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":") : css2;
  }
  static toFlatCase(str) {
    return this.isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
  }
  static isString(value, empty = true) {
    return typeof value === "string" && (empty || value !== "");
  }
};
function ZIndexUtils() {
  let zIndexes = [];
  const generateZIndex = (key, baseZIndex) => {
    let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : { key, value: baseZIndex };
    let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 2;
    zIndexes.push({ key, value: newZIndex });
    return newZIndex;
  };
  const revertZIndex = (zIndex) => {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };
  const getCurrentZIndex = () => zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  const getZIndex = (el) => el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  return {
    get: getZIndex,
    set: (key, el, baseZIndex) => {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, baseZIndex));
      }
    },
    clear: (el) => {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: () => getCurrentZIndex(),
    generateZIndex,
    revertZIndex
  };
}
var zindexutils = ZIndexUtils();

// node_modules/primeng/fesm2022/primeng-overlay.mjs
var inlineStyles = {
  root: ({ instance }) => {
    const modal = instance.modal();
    const responsiveStyle = modal ? instance.$overlayResponsiveOptions()?.style : instance.$overlayOptions()?.style;
    return __spreadValues(__spreadValues({
      position: "absolute",
      top: "0"
    }, responsiveStyle), instance.style());
  },
  content: ({ instance }) => {
    const modal = instance.modal();
    const responsiveContentStyle = modal ? instance.$overlayResponsiveOptions()?.contentStyle : instance.$overlayOptions()?.contentStyle;
    return __spreadValues(__spreadValues({}, responsiveContentStyle), instance.contentStyle());
  }
};
var style6 = (
  /*css*/
  `
.p-overlay-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-content {
    transform-origin: inherit;
    will-change: transform;
}

/* Github Issue #18560 */
.p-component-overlay.p-component {
    position: relative;
}

.p-overlay-modal > .p-overlay-content {
    z-index: 1;
    width: 90%;
}

/* Position */
/* top */
.p-overlay-top {
    align-items: flex-start;
}
.p-overlay-top-start {
    align-items: flex-start;
    justify-content: flex-start;
}
.p-overlay-top-end {
    align-items: flex-start;
    justify-content: flex-end;
}

/* bottom */
.p-overlay-bottom {
    align-items: flex-end;
}
.p-overlay-bottom-start {
    align-items: flex-end;
    justify-content: flex-start;
}
.p-overlay-bottom-end {
    align-items: flex-end;
    justify-content: flex-end;
}

/* left */
.p-overlay-left {
    justify-content: flex-start;
}
.p-overlay-left-start {
    justify-content: flex-start;
    align-items: flex-start;
}
.p-overlay-left-end {
    justify-content: flex-start;
    align-items: flex-end;
}

/* right */
.p-overlay-right {
    justify-content: flex-end;
}
.p-overlay-right-start {
    justify-content: flex-end;
    align-items: flex-start;
}
.p-overlay-right-end {
    justify-content: flex-end;
    align-items: flex-end;
}

.p-overlay-content ~ .p-overlay-content {
    display: none;
}
`
);
var classes6 = {
  host: "p-overlay-host",
  root: ({ instance }) => {
    const modal = instance.modal();
    const dir = instance.overlayResponsiveDirection();
    return [
      "p-overlay p-component",
      {
        "p-overlay-modal p-overlay-mask p-overlay-mask-enter-active": modal,
        "p-overlay-center": modal && dir === "center",
        "p-overlay-top": modal && dir === "top",
        "p-overlay-top-start": modal && dir === "top-start",
        "p-overlay-top-end": modal && dir === "top-end",
        "p-overlay-bottom": modal && dir === "bottom",
        "p-overlay-bottom-start": modal && dir === "bottom-start",
        "p-overlay-bottom-end": modal && dir === "bottom-end",
        "p-overlay-left": modal && dir === "left",
        "p-overlay-left-start": modal && dir === "left-start",
        "p-overlay-left-end": modal && dir === "left-end",
        "p-overlay-right": modal && dir === "right",
        "p-overlay-right-start": modal && dir === "right-start",
        "p-overlay-right-end": modal && dir === "right-end"
      }
    ];
  },
  content: "p-overlay-content"
};
var OverlayStyle = class _OverlayStyle extends BaseStyle {
  name = "overlay";
  style = style6;
  classes = classes6;
  inlineStyles = inlineStyles;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275OverlayStyle_BaseFactory = void 0;
    return function OverlayStyle_Factory(__ngFactoryType__) {
      return (\u0275OverlayStyle_BaseFactory || (\u0275OverlayStyle_BaseFactory = \u0275\u0275getInheritedFactory(_OverlayStyle)))(__ngFactoryType__ || _OverlayStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _OverlayStyle,
    factory: _OverlayStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayStyle, [{
    type: Injectable
  }], null, null);
})();
var OVERLAY_INSTANCE = new InjectionToken("OVERLAY_INSTANCE");
var Overlay = class _Overlay extends BaseComponent {
  componentName = "Overlay";
  $pcOverlay = inject(OVERLAY_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  hostName = input(
    "",
    ...ngDevMode ? [{ debugName: "hostName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The visible property is an input that determines the visibility of the component.
   * @defaultValue false
   * @group Props
   */
  visible = model(
    false,
    ...ngDevMode ? [{ debugName: "visible" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The mode property is an input that determines the overlay mode type or string.
   * @defaultValue null
   * @group Props
   */
  mode = input(
    ...ngDevMode ? [void 0, { debugName: "mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The style property is an input that determines the style object for the component.
   * @defaultValue null
   * @group Props
   */
  style = input(
    ...ngDevMode ? [void 0, { debugName: "style" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The styleClass property is an input that determines the CSS class(es) for the component.
   * @defaultValue null
   * @group Props
   */
  styleClass = input(
    ...ngDevMode ? [void 0, { debugName: "styleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The contentStyle property is an input that determines the style object for the content of the component.
   * @defaultValue null
   * @group Props
   */
  contentStyle = input(
    ...ngDevMode ? [void 0, { debugName: "contentStyle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The contentStyleClass property is an input that determines the CSS class(es) for the content of the component.
   * @defaultValue null
   * @group Props
   */
  contentStyleClass = input(
    ...ngDevMode ? [void 0, { debugName: "contentStyleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The target property is an input that specifies the target element or selector for the component.
   * @defaultValue null
   * @group Props
   */
  target = input(
    ...ngDevMode ? [void 0, { debugName: "target" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The autoZIndex determines whether to automatically manage layering. Its default value is 'false'.
   * @defaultValue false
   * @group Props
   */
  autoZIndex = input(
    ...ngDevMode ? [void 0, { debugName: "autoZIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The baseZIndex is base zIndex value to use in layering.
   * @defaultValue null
   * @group Props
   */
  baseZIndex = input(
    ...ngDevMode ? [void 0, { debugName: "baseZIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The listener property is an input that specifies the listener object for the component.
   * @defaultValue null
   * @group Props
   */
  listener = input(
    ...ngDevMode ? [void 0, { debugName: "listener" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * It is the option used to determine in which mode it should appear according to the given media or breakpoint.
   * @defaultValue null
   * @group Props
   */
  responsive = input(
    ...ngDevMode ? [void 0, { debugName: "responsive" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The options property is an input that specifies the overlay options for the component.
   * @defaultValue null
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
   * Specifies whether the overlay should be rendered inline within the current component's template.
   * @defaultValue false
   * @group Props
   */
  inline = input(
    false,
    ...ngDevMode ? [{ debugName: "inline" }] : (
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
   * Callback to invoke before the overlay is shown.
   * @param {OverlayOnBeforeShowEvent} event - Custom overlay before show event.
   * @group Emits
   */
  onBeforeShow = output();
  /**
   * Callback to invoke when the overlay is shown.
   * @param {OverlayOnShowEvent} event - Custom overlay show event.
   * @group Emits
   */
  onShow = output();
  /**
   * Callback to invoke before the overlay is hidden.
   * @param {OverlayOnBeforeHideEvent} event - Custom overlay before hide event.
   * @group Emits
   */
  onBeforeHide = output();
  /**
   * Callback to invoke when the overlay is hidden
   * @param {OverlayOnHideEvent} event - Custom hide event.
   * @group Emits
   */
  onHide = output();
  /**
   * Callback to invoke when the animation is started.
   * @param {MotionEvent} event - Motion event. The AnimationEvent typing is deprecated and kept for backward compatibility; only the MotionEvent properties exist at runtime.
   * @group Emits
   * @deprecated since v21.0.0. Use onBeforeEnter and onBeforeLeave instead.
   */
  onAnimationStart = output();
  /**
   * Callback to invoke when the animation is done.
   * @param {MotionEvent} event - Motion event. The AnimationEvent typing is deprecated and kept for backward compatibility; only the MotionEvent properties exist at runtime.
   * @group Emits
   * @deprecated since v21.0.0. Use onAfterEnter and onAfterLeave instead.
   */
  onAnimationDone = output();
  /**
   * Callback to invoke before the overlay enters.
   * @param {MotionEvent} event - Event before enter.
   * @group Emits
   */
  onBeforeEnter = output();
  /**
   * Callback to invoke when the overlay enters.
   * @param {MotionEvent} event - Event on enter.
   * @group Emits
   */
  onEnter = output();
  /**
   * Callback to invoke after the overlay has entered.
   * @param {MotionEvent} event - Event after enter.
   * @group Emits
   */
  onAfterEnter = output();
  /**
   * Callback to invoke before the overlay leaves.
   * @param {MotionEvent} event - Event before leave.
   * @group Emits
   */
  onBeforeLeave = output();
  /**
   * Callback to invoke when the overlay leaves.
   * @param {MotionEvent} event - Event on leave.
   * @group Emits
   */
  onLeave = output();
  /**
   * Callback to invoke after the overlay has left.
   * @param {MotionEvent} event - Event after leave.
   * @group Emits
   */
  onAfterLeave = output();
  overlayViewChild = viewChild(
    "overlay",
    ...ngDevMode ? [{ debugName: "overlayViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contentViewChild = viewChild(
    "content",
    ...ngDevMode ? [{ debugName: "contentViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Content template of the component.
   * @param {OverlayContentTemplateContext} context - content context.
   * @see {@link OverlayContentTemplateContext}
   * @group Templates
   */
  contentTemplate = contentChild("content", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "contentTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  hostAttrSelector = input(
    ...ngDevMode ? [void 0, { debugName: "hostAttrSelector" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $appendTo = computed(
    () => this.appendTo() || this.config.overlayAppendTo(),
    ...ngDevMode ? [{ debugName: "$appendTo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $overlayOptions = computed(
    () => __spreadValues(__spreadValues({}, this.config?.overlayOptions), this.options()),
    ...ngDevMode ? [{ debugName: "$overlayOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $overlayResponsiveOptions = computed(
    () => __spreadValues(__spreadValues({}, this.$overlayOptions()?.responsive), this.responsive()),
    ...ngDevMode ? [{ debugName: "$overlayResponsiveOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overlayResponsiveDirection = computed(
    () => this.$overlayResponsiveOptions()?.direction || "center",
    ...ngDevMode ? [{ debugName: "overlayResponsiveDirection" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $mode = computed(
    () => this.mode() || this.$overlayOptions()?.mode,
    ...ngDevMode ? [{ debugName: "$mode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mergedStyleClass = computed(
    () => this.cn(this.styleClass(), this.modal() ? this.$overlayResponsiveOptions()?.styleClass : this.$overlayOptions()?.styleClass),
    ...ngDevMode ? [{ debugName: "mergedStyleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mergedContentStyleClass = computed(
    () => this.cn(this.contentStyleClass(), this.modal() ? this.$overlayResponsiveOptions()?.contentStyleClass : this.$overlayOptions()?.contentStyleClass),
    ...ngDevMode ? [{ debugName: "mergedContentStyleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $target = computed(
    () => {
      const value = this.target() || this.$overlayOptions()?.target;
      return value === void 0 ? "@prev" : value;
    },
    ...ngDevMode ? [{ debugName: "$target" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $autoZIndex = computed(
    () => {
      const value = this.autoZIndex() || this.$overlayOptions()?.autoZIndex;
      return value === void 0 ? true : value;
    },
    ...ngDevMode ? [{ debugName: "$autoZIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $baseZIndex = computed(
    () => {
      const value = this.baseZIndex() || this.$overlayOptions()?.baseZIndex;
      return value === void 0 ? 0 : value;
    },
    ...ngDevMode ? [{ debugName: "$baseZIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $listener = computed(
    () => this.listener() || this.$overlayOptions()?.listener,
    ...ngDevMode ? [{ debugName: "$listener" }] : (
      /* istanbul ignore next */
      []
    )
  );
  modal = computed(
    () => {
      if (isPlatformBrowser(this.platformId)) {
        return this.$mode() === "modal" || this.$overlayResponsiveOptions() && this.document.defaultView?.matchMedia(this.$overlayResponsiveOptions().media?.replace("@media", "") || `(max-width: ${this.$overlayResponsiveOptions().breakpoint})`).matches;
      }
      return void 0;
    },
    ...ngDevMode ? [{ debugName: "modal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overlayMode = computed(
    () => this.$mode() || (this.modal() ? "modal" : "overlay"),
    ...ngDevMode ? [{ debugName: "overlayMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overlayEl = computed(
    () => this.overlayViewChild()?.nativeElement,
    ...ngDevMode ? [{ debugName: "overlayEl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contentEl = computed(
    () => this.contentViewChild()?.nativeElement,
    ...ngDevMode ? [{ debugName: "contentEl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  targetEl = computed(
    () => Y(this.$target(), this.el?.nativeElement),
    ...ngDevMode ? [{ debugName: "targetEl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  computedMotionOptions = computed(
    () => __spreadValues(__spreadValues({}, this.ptm("motion")), this.motionOptions() || this.$overlayOptions()?.motionOptions),
    ...ngDevMode ? [{ debugName: "computedMotionOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  modalVisible = signal(
    false,
    ...ngDevMode ? [{ debugName: "modalVisible" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isOverlayClicked = false;
  isOverlayContentClicked = false;
  scrollHandler;
  documentClickListener;
  documentResizeListener;
  _componentStyle = inject(OverlayStyle);
  bindDirectiveInstance = inject(Bind, { self: true });
  documentKeyboardListener;
  parentDragSubscription = null;
  transformOptions = {
    default: "scaleY(0.8)",
    center: "scale(0.7)",
    top: "translate3d(0px, -100%, 0px)",
    "top-start": "translate3d(0px, -100%, 0px)",
    "top-end": "translate3d(0px, -100%, 0px)",
    bottom: "translate3d(0px, 100%, 0px)",
    "bottom-start": "translate3d(0px, 100%, 0px)",
    "bottom-end": "translate3d(0px, 100%, 0px)",
    left: "translate3d(-100%, 0px, 0px)",
    "left-start": "translate3d(-100%, 0px, 0px)",
    "left-end": "translate3d(-100%, 0px, 0px)",
    right: "translate3d(100%, 0px, 0px)",
    "right-start": "translate3d(100%, 0px, 0px)",
    "right-end": "translate3d(100%, 0px, 0px)"
  };
  overlayService = inject(OverlayService);
  constructor() {
    super();
    effect(() => {
      const v = this.visible();
      if (v && !this.modalVisible()) {
        this.modalVisible.set(true);
      }
    });
  }
  container = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "container" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
  }
  show(overlay, isFocus = false) {
    this.onVisibleChange(true);
    this.handleEvents("onShow", { overlay: overlay || this.overlayEl(), target: this.targetEl(), mode: this.overlayMode() });
    if (isFocus) {
      kt(this.targetEl());
    }
    if (this.modal()) {
      R(this.document?.body, "p-overflow-hidden");
    }
  }
  hide(overlay, isFocus = false) {
    if (!this.visible()) {
      return;
    } else {
      this.onVisibleChange(false);
      this.handleEvents("onHide", { overlay: overlay || this.overlayEl(), target: this.targetEl(), mode: this.overlayMode() });
      if (isFocus) {
        kt(this.targetEl());
      }
      if (this.modal()) {
        W(this.document?.body, "p-overflow-hidden");
      }
    }
  }
  onVisibleChange(visible) {
    this.visible.set(visible);
  }
  onOverlayClick() {
    this.isOverlayClicked = true;
  }
  onOverlayContentClick(event) {
    this.overlayService.add({
      originalEvent: event,
      target: this.targetEl()
    });
    this.isOverlayContentClicked = true;
  }
  onOverlayBeforeEnter(event) {
    this.handleEvents("onBeforeShow", { overlay: this.overlayEl(), target: this.targetEl(), mode: this.overlayMode() });
    this.container.set(this.overlayEl() || event.element);
    this.show(this.overlayEl(), true);
    if (this.hostAttrSelector() && this.overlayEl()) {
      this.overlayEl().setAttribute(this.hostAttrSelector(), "");
    }
    this.appendOverlay();
    this.alignOverlay();
    this.bindParentDragListener();
    this.setZIndex();
    this.handleEvents("onBeforeEnter", event);
  }
  onOverlayEnter(event) {
    this.handleEvents("onEnter", event);
  }
  onOverlayAfterEnter(event) {
    this.bindListeners();
    this.handleEvents("onAfterEnter", event);
  }
  onOverlayBeforeLeave(event) {
    this.handleEvents("onBeforeHide", { overlay: this.overlayEl(), target: this.targetEl(), mode: this.overlayMode() });
    this.handleEvents("onBeforeLeave", event);
  }
  onOverlayLeave(event) {
    this.handleEvents("onLeave", event);
  }
  onOverlayAfterLeave(event) {
    this.hide(this.overlayEl(), true);
    this.container.set(null);
    this.unbindListeners();
    this.appendOverlay();
    zindexutils.clear(this.overlayEl());
    this.modalVisible.set(false);
    this.cd.markForCheck();
    this.handleEvents("onAfterLeave", event);
  }
  handleEvents(name, params) {
    this[name].emit(params);
    const opts = this.options();
    if (opts && opts[name]) {
      opts[name](params);
    }
    if (this.config?.overlayOptions && (this.config?.overlayOptions)[name]) {
      (this.config?.overlayOptions)[name](params);
    }
  }
  setZIndex() {
    if (this.$autoZIndex()) {
      zindexutils.set(this.overlayMode(), this.overlayEl(), this.$baseZIndex() + this.config?.zIndex[this.overlayMode()]);
    }
  }
  appendOverlay() {
    if (this.$appendTo() && this.$appendTo() !== "self") {
      if (this.$appendTo() === "body") {
        St(this.document.body, this.overlayEl());
      } else {
        St(this.$appendTo(), this.overlayEl());
      }
    }
  }
  alignOverlay() {
    if (!this.modal()) {
      if (this.overlayEl() && this.targetEl()) {
        this.overlayEl().style.minWidth = L(this.targetEl()) + "px";
        if (this.$appendTo() === "self") {
          G(this.overlayEl(), this.targetEl());
        } else {
          z(this.overlayEl(), this.targetEl());
        }
      }
    }
  }
  bindListeners() {
    this.bindScrollListener();
    this.bindDocumentClickListener();
    this.bindDocumentResizeListener();
    this.bindDocumentKeyboardListener();
  }
  unbindListeners() {
    this.unbindScrollListener();
    this.unbindDocumentClickListener();
    this.unbindDocumentResizeListener();
    this.unbindDocumentKeyboardListener();
    this.unbindParentDragListener();
  }
  bindParentDragListener() {
    if (!this.parentDragSubscription && this.$appendTo() !== "self" && this.targetEl) {
      this.parentDragSubscription = this.overlayService.parentDragObservable.subscribe((container) => {
        if (container.contains(this.targetEl())) {
          this.hide(this.overlayEl(), true);
        }
      });
    }
  }
  unbindParentDragListener() {
    if (this.parentDragSubscription) {
      this.parentDragSubscription.unsubscribe();
      this.parentDragSubscription = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.targetEl(), (event) => {
        const valid = this.$listener() ? this.$listener()(event, { type: "scroll", mode: this.overlayMode(), valid: true }) : true;
        if (valid) {
          this.hide(event, true);
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen(this.document, "click", (event) => {
        const isTargetClicked = this.targetEl() && (this.targetEl().isSameNode(event.target) || !this.isOverlayClicked && this.targetEl().contains(event.target));
        const isOutsideClicked = !isTargetClicked && !this.isOverlayContentClicked;
        const valid = this.$listener() ? this.$listener()(event, { type: "outside", mode: this.overlayMode(), valid: event.which !== 3 && isOutsideClicked }) : isOutsideClicked;
        if (valid) {
          this.hide(event);
        }
        this.isOverlayClicked = this.isOverlayContentClicked = false;
      });
    }
  }
  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }
  bindDocumentResizeListener() {
    if (!this.documentResizeListener) {
      this.documentResizeListener = this.renderer.listen(this.document.defaultView, "resize", (event) => {
        const valid = this.$listener() ? this.$listener()(event, { type: "resize", mode: this.overlayMode(), valid: !re() }) : !re();
        if (valid) {
          this.hide(event, true);
        }
      });
    }
  }
  unbindDocumentResizeListener() {
    if (this.documentResizeListener) {
      this.documentResizeListener();
      this.documentResizeListener = null;
    }
  }
  bindDocumentKeyboardListener() {
    if (this.documentKeyboardListener) {
      return;
    }
    this.documentKeyboardListener = this.renderer.listen(this.document.defaultView, "keydown", (event) => {
      if (this.$overlayOptions().hideOnEscape === false || event.code !== "Escape") {
        return;
      }
      const valid = this.$listener() ? this.$listener()(event, { type: "keydown", mode: this.overlayMode(), valid: !re() }) : !re();
      if (valid) {
        this.hide(event, true);
      }
    });
  }
  unbindDocumentKeyboardListener() {
    if (this.documentKeyboardListener) {
      this.documentKeyboardListener();
      this.documentKeyboardListener = null;
    }
  }
  onDestroy() {
    this.hide(this.overlayEl(), true);
    if (this.overlayEl() && this.$appendTo() !== "self") {
      this.renderer.appendChild(this.el.nativeElement, this.overlayEl());
      zindexutils.clear(this.overlayEl());
    }
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    this.unbindListeners();
  }
  static \u0275fac = function Overlay_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Overlay)();
  };
  static \u0275cmp = (function() {
    const _c0 = ["content"];
    const _c1 = ["overlay"];
    const _c2 = ["*", "*"];
    const _c3 = () => ({
      mode: null
    });
    const _c4 = (a0) => ({
      $implicit: a0
    });
    const _c5 = (a0) => ({
      mode: a0
    });
    function Overlay_Conditional_0_ng_container_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Overlay_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projection(0);
        \u0275\u0275template(1, Overlay_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 2);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.contentTemplate())("ngTemplateOutletContext", \u0275\u0275pureFunction1(3, _c4, \u0275\u0275pureFunction0(2, _c3)));
      }
    }
    function Overlay_Conditional_1_Conditional_0_ng_container_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Overlay_Conditional_1_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r2 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 4, 0);
        \u0275\u0275listener("click", function Overlay_Conditional_1_Conditional_0_Template_div_click_0_listener() {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayClick());
        });
        \u0275\u0275elementStart(2, "p-motion", 5);
        \u0275\u0275listener("onBeforeEnter", function Overlay_Conditional_1_Conditional_0_Template_p_motion_onBeforeEnter_2_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayBeforeEnter($event));
        })("onEnter", function Overlay_Conditional_1_Conditional_0_Template_p_motion_onEnter_2_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayEnter($event));
        })("onAfterEnter", function Overlay_Conditional_1_Conditional_0_Template_p_motion_onAfterEnter_2_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayAfterEnter($event));
        })("onBeforeLeave", function Overlay_Conditional_1_Conditional_0_Template_p_motion_onBeforeLeave_2_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayBeforeLeave($event));
        })("onLeave", function Overlay_Conditional_1_Conditional_0_Template_p_motion_onLeave_2_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayLeave($event));
        })("onAfterLeave", function Overlay_Conditional_1_Conditional_0_Template_p_motion_onAfterLeave_2_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayAfterLeave($event));
        });
        \u0275\u0275elementStart(3, "div", 4, 1);
        \u0275\u0275listener("click", function Overlay_Conditional_1_Conditional_0_Template_div_click_3_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOverlayContentClick($event));
        });
        \u0275\u0275projection(5, 1);
        \u0275\u0275template(6, Overlay_Conditional_1_Conditional_0_ng_container_6_Template, 1, 0, "ng-container", 2);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(ctx_r0.sx("root"));
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("root"), ctx_r0.mergedStyleClass()));
        \u0275\u0275property("pBind", ctx_r0.ptm("root"));
        \u0275\u0275advance(2);
        \u0275\u0275property("visible", ctx_r0.visible())("appear", true)("options", ctx_r0.computedMotionOptions());
        \u0275\u0275advance();
        \u0275\u0275styleMap(ctx_r0.sx("content"));
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("content"), ctx_r0.mergedContentStyleClass()));
        \u0275\u0275property("pBind", ctx_r0.ptm("content"));
        \u0275\u0275advance(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.contentTemplate())("ngTemplateOutletContext", \u0275\u0275pureFunction1(17, _c4, \u0275\u0275pureFunction1(15, _c5, ctx_r0.overlayMode())));
      }
    }
    function Overlay_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Overlay_Conditional_1_Conditional_0_Template, 7, 19, "div", 3);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(ctx_r0.modalVisible() ? 0 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Overlay,
      selectors: [["p-overlay"]],
      contentQueries: function Overlay_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.contentTemplate, _c0, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
        }
      },
      viewQuery: function Overlay_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx.overlayViewChild, _c1, 5)(ctx.contentViewChild, _c0, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(2);
        }
      },
      inputs: {
        hostName: [1, "hostName"],
        visible: [1, "visible"],
        mode: [1, "mode"],
        style: [1, "style"],
        styleClass: [1, "styleClass"],
        contentStyle: [1, "contentStyle"],
        contentStyleClass: [1, "contentStyleClass"],
        target: [1, "target"],
        autoZIndex: [1, "autoZIndex"],
        baseZIndex: [1, "baseZIndex"],
        listener: [1, "listener"],
        responsive: [1, "responsive"],
        options: [1, "options"],
        appendTo: [1, "appendTo"],
        inline: [1, "inline"],
        motionOptions: [1, "motionOptions"],
        hostAttrSelector: [1, "hostAttrSelector"]
      },
      outputs: {
        visible: "visibleChange",
        onBeforeShow: "onBeforeShow",
        onShow: "onShow",
        onBeforeHide: "onBeforeHide",
        onHide: "onHide",
        onAnimationStart: "onAnimationStart",
        onAnimationDone: "onAnimationDone",
        onBeforeEnter: "onBeforeEnter",
        onEnter: "onEnter",
        onAfterEnter: "onAfterEnter",
        onBeforeLeave: "onBeforeLeave",
        onLeave: "onLeave",
        onAfterLeave: "onAfterLeave"
      },
      features: [\u0275\u0275ProvidersFeature([OverlayStyle, { provide: OVERLAY_INSTANCE, useExisting: _Overlay }, { provide: PARENT_INSTANCE, useExisting: _Overlay }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c2,
      decls: 2,
      vars: 1,
      consts: [["overlay", ""], ["content", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "class", "style", "pBind"], [3, "click", "pBind"], ["name", "p-anchored-overlay", 3, "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave", "visible", "appear", "options"]],
      template: function Overlay_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c2);
          \u0275\u0275conditionalCreate(0, Overlay_Conditional_0_Template, 2, 5)(1, Overlay_Conditional_1_Template, 1, 1);
        }
        if (rf & 2) {
          \u0275\u0275conditional(ctx.inline() ? 0 : 1);
        }
      },
      dependencies: [NgTemplateOutlet, SharedModule, Bind, MotionModule, Motion],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Overlay, [{
    type: Component,
    args: [{
      selector: "p-overlay",
      standalone: true,
      imports: [NgTemplateOutlet, SharedModule, Bind, MotionModule],
      hostDirectives: [Bind],
      template: `
        @if (inline()) {
            <ng-content />
            <ng-container *ngTemplateOutlet="contentTemplate(); context: { $implicit: { mode: null } }" />
        } @else {
            @if (modalVisible()) {
                <div #overlay [class]="cn(cx('root'), mergedStyleClass())" [style]="sx('root')" [pBind]="ptm('root')" (click)="onOverlayClick()">
                    <p-motion
                        [visible]="visible()"
                        name="p-anchored-overlay"
                        [appear]="true"
                        [options]="computedMotionOptions()"
                        (onBeforeEnter)="onOverlayBeforeEnter($event)"
                        (onEnter)="onOverlayEnter($event)"
                        (onAfterEnter)="onOverlayAfterEnter($event)"
                        (onBeforeLeave)="onOverlayBeforeLeave($event)"
                        (onLeave)="onOverlayLeave($event)"
                        (onAfterLeave)="onOverlayAfterLeave($event)"
                    >
                        <div #content [class]="cn(cx('content'), mergedContentStyleClass())" [style]="sx('content')" [pBind]="ptm('content')" (click)="onOverlayContentClick($event)">
                            <ng-content />
                            <ng-container *ngTemplateOutlet="contentTemplate(); context: { $implicit: { mode: overlayMode() } }" />
                        </div>
                    </p-motion>
                </div>
            }
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [OverlayStyle, { provide: OVERLAY_INSTANCE, useExisting: Overlay }, { provide: PARENT_INSTANCE, useExisting: Overlay }]
    }]
  }], () => [], { hostName: [{ type: Input, args: [{ isSignal: true, alias: "hostName", required: false }] }], visible: [{ type: Input, args: [{ isSignal: true, alias: "visible", required: false }] }, { type: Output, args: ["visibleChange"] }], mode: [{ type: Input, args: [{ isSignal: true, alias: "mode", required: false }] }], style: [{ type: Input, args: [{ isSignal: true, alias: "style", required: false }] }], styleClass: [{ type: Input, args: [{ isSignal: true, alias: "styleClass", required: false }] }], contentStyle: [{ type: Input, args: [{ isSignal: true, alias: "contentStyle", required: false }] }], contentStyleClass: [{ type: Input, args: [{ isSignal: true, alias: "contentStyleClass", required: false }] }], target: [{ type: Input, args: [{ isSignal: true, alias: "target", required: false }] }], autoZIndex: [{ type: Input, args: [{ isSignal: true, alias: "autoZIndex", required: false }] }], baseZIndex: [{ type: Input, args: [{ isSignal: true, alias: "baseZIndex", required: false }] }], listener: [{ type: Input, args: [{ isSignal: true, alias: "listener", required: false }] }], responsive: [{ type: Input, args: [{ isSignal: true, alias: "responsive", required: false }] }], options: [{ type: Input, args: [{ isSignal: true, alias: "options", required: false }] }], appendTo: [{ type: Input, args: [{ isSignal: true, alias: "appendTo", required: false }] }], inline: [{ type: Input, args: [{ isSignal: true, alias: "inline", required: false }] }], motionOptions: [{ type: Input, args: [{ isSignal: true, alias: "motionOptions", required: false }] }], onBeforeShow: [{ type: Output, args: ["onBeforeShow"] }], onShow: [{ type: Output, args: ["onShow"] }], onBeforeHide: [{ type: Output, args: ["onBeforeHide"] }], onHide: [{ type: Output, args: ["onHide"] }], onAnimationStart: [{ type: Output, args: ["onAnimationStart"] }], onAnimationDone: [{ type: Output, args: ["onAnimationDone"] }], onBeforeEnter: [{ type: Output, args: ["onBeforeEnter"] }], onEnter: [{ type: Output, args: ["onEnter"] }], onAfterEnter: [{ type: Output, args: ["onAfterEnter"] }], onBeforeLeave: [{ type: Output, args: ["onBeforeLeave"] }], onLeave: [{ type: Output, args: ["onLeave"] }], onAfterLeave: [{ type: Output, args: ["onAfterLeave"] }], overlayViewChild: [{ type: ViewChild, args: ["overlay", { isSignal: true }] }], contentViewChild: [{ type: ViewChild, args: ["content", { isSignal: true }] }], contentTemplate: [{ type: ContentChild, args: ["content", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], hostAttrSelector: [{ type: Input, args: [{ isSignal: true, alias: "hostAttrSelector", required: false }] }] });
})();
var OverlayModule = class _OverlayModule {
  static \u0275fac = function OverlayModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OverlayModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _OverlayModule,
    imports: [Overlay, SharedModule],
    exports: [Overlay, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Overlay, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayModule, [{
    type: NgModule,
    args: [{
      imports: [Overlay, SharedModule],
      exports: [Overlay, SharedModule]
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-scroller.mjs
var css = (
  /*css*/
  `
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: dt('virtualscroller.loader.mask.background');
    color: dt('virtualscroller.loader.mask.color');
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-loading-icon {
    font-size: dt('virtualscroller.loader.icon.size');
    width: dt('virtualscroller.loader.icon.size');
    height: dt('virtualscroller.loader.icon.size');
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}
`
);
var classes7 = {
  root: ({ instance }) => [
    "p-virtualscroller",
    {
      "p-virtualscroller-inline": instance.inline(),
      "p-virtualscroller-both p-both-scroll": instance.both(),
      "p-virtualscroller-horizontal p-horizontal-scroll": instance.horizontal()
    }
  ],
  content: "p-virtualscroller-content",
  spacer: "p-virtualscroller-spacer",
  loader: ({ instance }) => [
    "p-virtualscroller-loader",
    {
      "p-virtualscroller-loader-mask": !instance.loaderTemplate()
    }
  ],
  loadingIcon: "p-virtualscroller-loading-icon"
};
var ScrollerStyle = class _ScrollerStyle extends BaseStyle {
  name = "virtualscroller";
  css = css;
  classes = classes7;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ScrollerStyle_BaseFactory = void 0;
    return function ScrollerStyle_Factory(__ngFactoryType__) {
      return (\u0275ScrollerStyle_BaseFactory || (\u0275ScrollerStyle_BaseFactory = \u0275\u0275getInheritedFactory(_ScrollerStyle)))(__ngFactoryType__ || _ScrollerStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ScrollerStyle,
    factory: _ScrollerStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerStyle, [{
    type: Injectable
  }], null, null);
})();
var ScrollerClasses;
(function(ScrollerClasses2) {
  ScrollerClasses2["root"] = "p-virtualscroller";
  ScrollerClasses2["content"] = "p-virtualscroller-content";
  ScrollerClasses2["spacer"] = "p-virtualscroller-spacer";
  ScrollerClasses2["loader"] = "p-virtualscroller-loader";
  ScrollerClasses2["loadingIcon"] = "p-virtualscroller-loading-icon";
})(ScrollerClasses || (ScrollerClasses = {}));
var SCROLLER_INSTANCE = new InjectionToken("SCROLLER_INSTANCE");
var Scroller = class _Scroller extends BaseComponent {
  componentName = "VirtualScroller";
  bindDirectiveInstance = inject(Bind, { self: true });
  $pcScroller = inject(SCROLLER_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  hostName = input(
    "",
    ...ngDevMode ? [{ debugName: "hostName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Unique identifier of the element.
   * @group Props
   */
  id = input(
    ...ngDevMode ? [void 0, { debugName: "id" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Inline style of the component.
   * @group Props
   */
  style = input(
    ...ngDevMode ? [void 0, { debugName: "style" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the element.
   * @group Props
   */
  styleClass = input(
    ...ngDevMode ? [void 0, { debugName: "styleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = input(
    0,
    ...ngDevMode ? [{ debugName: "tabindex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * An array of objects to display.
   * @group Props
   */
  items = input(
    ...ngDevMode ? [void 0, { debugName: "items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The height/width of item according to orientation.
   * @group Props
   */
  itemSize = input(
    0,
    ...ngDevMode ? [{ debugName: "itemSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Height of the scroll viewport.
   * @group Props
   */
  scrollHeight = input(
    ...ngDevMode ? [void 0, { debugName: "scrollHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Width of the scroll viewport.
   * @group Props
   */
  scrollWidth = input(
    ...ngDevMode ? [void 0, { debugName: "scrollWidth" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * The orientation of scrollbar.
   * @group Props
   */
  orientation = input(
    "vertical",
    ...ngDevMode ? [{ debugName: "orientation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to specify how many items to load in each load method in lazy mode.
   * @group Props
   */
  step = input(
    0,
    ...ngDevMode ? [{ debugName: "step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Delay in scroll before new data is loaded.
   * @group Props
   */
  delay = input(
    0,
    ...ngDevMode ? [{ debugName: "delay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Delay after window's resize finishes.
   * @group Props
   */
  resizeDelay = input(
    10,
    ...ngDevMode ? [{ debugName: "resizeDelay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
   * @group Props
   */
  appendOnly = input(
    false,
    ...ngDevMode ? [{ debugName: "appendOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Specifies whether the scroller should be displayed inline or not.
   * @group Props
   */
  inline = input(
    false,
    ...ngDevMode ? [{ debugName: "inline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy = input(
    false,
    ...ngDevMode ? [{ debugName: "lazy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * If disabled, the scroller feature is eliminated and the content is displayed directly.
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
   * Used to implement a custom loader instead of using the loader feature in the scroller.
   * @group Props
   */
  loaderDisabled = input(
    false,
    ...ngDevMode ? [{ debugName: "loaderDisabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Columns to display.
   * @group Props
   */
  columns = input(
    ...ngDevMode ? [void 0, { debugName: "columns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to implement a custom spacer instead of using the spacer feature in the scroller.
   * @group Props
   */
  showSpacer = input(
    true,
    ...ngDevMode ? [{ debugName: "showSpacer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines whether to show loader.
   * @group Props
   */
  showLoader = input(
    false,
    ...ngDevMode ? [{ debugName: "showLoader" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
   * @group Props
   */
  numToleratedItems = input(
    ...ngDevMode ? [void 0, { debugName: "numToleratedItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines whether the data is loaded.
   * @group Props
   */
  loading = input(
    ...ngDevMode ? [void 0, { debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines whether to dynamically change the height or width of scrollable container.
   * @group Props
   */
  autoSize = input(
    false,
    ...ngDevMode ? [{ debugName: "autoSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
   * @group Props
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  trackBy = input(
    ...ngDevMode ? [void 0, { debugName: "trackBy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  options = input(
    ...ngDevMode ? [void 0, { debugName: "options" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Computed: Options merge with individual inputs
  _id = computed(
    () => this.options()?.id ?? this.id(),
    ...ngDevMode ? [{ debugName: "_id" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _style = computed(
    () => this.options()?.style ?? this.style(),
    ...ngDevMode ? [{ debugName: "_style" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _styleClass = computed(
    () => this.options()?.styleClass ?? this.styleClass(),
    ...ngDevMode ? [{ debugName: "_styleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _tabindex = computed(
    () => this.options()?.tabindex ?? this.tabindex(),
    ...ngDevMode ? [{ debugName: "_tabindex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _items = computed(
    () => this.options()?.items ?? this.items(),
    ...ngDevMode ? [{ debugName: "_items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _itemSize = computed(
    () => this.options()?.itemSize ?? this.itemSize(),
    ...ngDevMode ? [{ debugName: "_itemSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _scrollHeight = computed(
    () => this.options()?.scrollHeight ?? this.scrollHeight(),
    ...ngDevMode ? [{ debugName: "_scrollHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _scrollWidth = computed(
    () => this.options()?.scrollWidth ?? this.scrollWidth(),
    ...ngDevMode ? [{ debugName: "_scrollWidth" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _orientation = computed(
    () => this.options()?.orientation ?? this.orientation(),
    ...ngDevMode ? [{ debugName: "_orientation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _step = computed(
    () => this.options()?.step ?? this.step(),
    ...ngDevMode ? [{ debugName: "_step" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _delay = computed(
    () => this.options()?.delay ?? this.delay(),
    ...ngDevMode ? [{ debugName: "_delay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _resizeDelay = computed(
    () => this.options()?.resizeDelay ?? this.resizeDelay(),
    ...ngDevMode ? [{ debugName: "_resizeDelay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _appendOnly = computed(
    () => this.options()?.appendOnly ?? this.appendOnly(),
    ...ngDevMode ? [{ debugName: "_appendOnly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _inline = computed(
    () => this.options()?.inline ?? this.inline(),
    ...ngDevMode ? [{ debugName: "_inline" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _lazy = computed(
    () => this.options()?.lazy ?? this.lazy(),
    ...ngDevMode ? [{ debugName: "_lazy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _disabled = computed(
    () => this.options()?.disabled ?? this.disabled(),
    ...ngDevMode ? [{ debugName: "_disabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _loaderDisabled = computed(
    () => this.options()?.loaderDisabled ?? this.loaderDisabled(),
    ...ngDevMode ? [{ debugName: "_loaderDisabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _columns = computed(
    () => this.options()?.columns ?? this.columns(),
    ...ngDevMode ? [{ debugName: "_columns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _showSpacer = computed(
    () => this.options()?.showSpacer ?? this.showSpacer(),
    ...ngDevMode ? [{ debugName: "_showSpacer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _showLoader = computed(
    () => this.options()?.showLoader ?? this.showLoader(),
    ...ngDevMode ? [{ debugName: "_showLoader" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _numToleratedItems = computed(
    () => this.options()?.numToleratedItems ?? this.numToleratedItems(),
    ...ngDevMode ? [{ debugName: "_numToleratedItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _loading = computed(
    () => this.options()?.loading ?? this.loading(),
    ...ngDevMode ? [{ debugName: "_loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _autoSize = computed(
    () => this.options()?.autoSize ?? this.autoSize(),
    ...ngDevMode ? [{ debugName: "_autoSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _trackBy = computed(
    () => this.options()?.trackBy ?? this.trackBy(),
    ...ngDevMode ? [{ debugName: "_trackBy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contentStyleClass = computed(
    () => this.options()?.contentStyleClass,
    ...ngDevMode ? [{ debugName: "contentStyleClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {ScrollerLazyLoadEvent} event - Custom lazy load event.
   * @group Emits
   */
  onLazyLoad = output();
  /**
   * Callback to invoke when scroll position changes.
   * @param {ScrollerScrollEvent} event - Custom scroll event.
   * @group Emits
   */
  onScroll = output();
  /**
   * Callback to invoke when scroll position and item's range in view changes.
   * @param {ScrollerScrollEvent} event - Custom scroll index change event.
   * @group Emits
   */
  onScrollIndexChange = output();
  elementViewChild = viewChild(
    "element",
    ...ngDevMode ? [{ debugName: "elementViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contentViewChild = viewChild(
    "content",
    ...ngDevMode ? [{ debugName: "contentViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hostHeight = signal(
    void 0,
    ...ngDevMode ? [{ debugName: "hostHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Content template of the component.
   * @param {ScrollerContentTemplateContext} context - content context.
   * @see {@link ScrollerContentTemplateContext}
   * @group Templates
   */
  contentTemplate = contentChild("content", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "contentTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Item template of the component.
   * @param {ScrollerItemTemplateContext} context - item context.
   * @see {@link ScrollerItemTemplateContext}
   * @group Templates
   */
  itemTemplate = contentChild("item", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "itemTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Loader template of the component.
   * @param {ScrollerLoaderTemplateContext} context - loader context.
   * @see {@link ScrollerLoaderTemplateContext}
   * @group Templates
   */
  loaderTemplate = contentChild("loader", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "loaderTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Loader icon template of the component.
   * @param {ScrollerLoaderIconTemplateContext} context - loader icon context.
   * @see {@link ScrollerLoaderIconTemplateContext}
   * @group Templates
   */
  loaderIconTemplate = contentChild("loadericon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "loaderIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  d_loading = false;
  d_numToleratedItems;
  contentEl;
  vertical = computed(
    () => this._orientation() === "vertical",
    ...ngDevMode ? [{ debugName: "vertical" }] : (
      /* istanbul ignore next */
      []
    )
  );
  horizontal = computed(
    () => this._orientation() === "horizontal",
    ...ngDevMode ? [{ debugName: "horizontal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  both = computed(
    () => this._orientation() === "both",
    ...ngDevMode ? [{ debugName: "both" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get loadedItems() {
    const items = this._items();
    if (items && !this.d_loading) {
      if (this.both()) {
        return items.slice(this._appendOnly() ? 0 : this.first.rows, this.last.rows).map((item) => {
          if (this._columns()) {
            return item;
          } else if (Array.isArray(item)) {
            return item.slice(this._appendOnly() ? 0 : this.first.cols, this.last.cols);
          } else {
            return item;
          }
        });
      } else if (this.horizontal() && this._columns())
        return items;
      else
        return items.slice(this._appendOnly() ? 0 : this.first, this.last);
    }
    return [];
  }
  get loadedRows() {
    return this.d_loading ? this._loaderDisabled() ? this.loaderArr : [] : this.loadedItems;
  }
  get loadedColumns() {
    const columns = this._columns();
    if (columns && (this.both() || this.horizontal())) {
      return this.d_loading && this._loaderDisabled() ? this.both() ? this.loaderArr[0] : this.loaderArr : columns.slice(this.both() ? this.first.cols : this.first, this.both() ? this.last.cols : this.last);
    }
    return columns;
  }
  first = 0;
  last = 0;
  page = 0;
  isRangeChanged = false;
  numItemsInViewport = 0;
  lastScrollPos = 0;
  lazyLoadState = {};
  loaderArr = [];
  spacerStyle;
  contentStyle;
  scrollTimeout;
  resizeTimeout;
  _destroyed = false;
  initialized = false;
  windowResizeListener;
  defaultWidth;
  defaultHeight;
  defaultContentWidth;
  defaultContentHeight;
  _componentStyle = inject(ScrollerStyle);
  constructor() {
    super();
    effect(() => {
      if (this._scrollHeight() === "100%") {
        this.hostHeight.set("100%");
      }
    });
    effect(() => {
      const loading = this._loading();
      untracked(() => {
        if (this._lazy() && loading !== void 0 && loading !== this.d_loading) {
          this.d_loading = loading;
        }
      });
    });
    effect(() => {
      this._orientation();
      untracked(() => {
        this.lastScrollPos = this.both() ? { top: 0, left: 0 } : 0;
      });
    });
    effect(() => {
      const numT = this._numToleratedItems();
      untracked(() => {
        if (numT !== void 0 && numT !== this.d_numToleratedItems) {
          this.d_numToleratedItems = numT;
        }
      });
    });
    effect(() => {
      this._itemSize();
      this._scrollHeight();
      this._scrollWidth();
      untracked(() => {
        if (this.initialized) {
          this.init();
          this.calculateAutoSize();
        }
      });
    });
    effect(() => {
      this._items();
      untracked(() => {
        if (this.initialized && !this._lazy()) {
          this.init();
        }
      });
    });
    effect(() => {
      const opts = this.options();
      untracked(() => {
        if (opts?.contentStyle !== void 0) {
          this.contentStyle = opts.contentStyle;
        }
      });
    });
  }
  loaderIconContext = { options: { styleClass: "p-virtualscroller-loading-icon" } };
  onInit() {
    this.setInitialState();
  }
  onAfterViewInit() {
    Promise.resolve().then(() => {
      this.viewInit();
    });
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptm("host"));
    if (!this.initialized) {
      this.viewInit();
    }
  }
  onDestroy() {
    this._destroyed = true;
    this.unbindResizeListener();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.contentEl = null;
    this.initialized = false;
  }
  viewInit() {
    if (isPlatformBrowser(this.platformId) && !this.initialized) {
      if (ft(this.elementViewChild()?.nativeElement)) {
        this.setInitialState();
        this.setContentEl(this.contentEl);
        this.init();
        this.defaultWidth = zt(this.elementViewChild()?.nativeElement);
        this.defaultHeight = Ft(this.elementViewChild()?.nativeElement);
        this.defaultContentWidth = zt(this.contentEl);
        this.defaultContentHeight = Ft(this.contentEl);
        this.initialized = true;
      }
    }
  }
  init() {
    if (!this._disabled()) {
      this.bindResizeListener();
      setTimeout(() => {
        this.setSpacerSize();
        this.setSize();
        this.calculateOptions();
        this.calculateAutoSize();
        this.cd.detectChanges();
      }, 1);
    }
  }
  setContentEl(el) {
    this.contentEl = el || this.contentViewChild()?.nativeElement || et(this.elementViewChild()?.nativeElement, ".p-virtualscroller-content");
  }
  setInitialState() {
    this.first = this.both() ? { rows: 0, cols: 0 } : 0;
    this.last = this.both() ? { rows: 0, cols: 0 } : 0;
    this.numItemsInViewport = this.both() ? { rows: 0, cols: 0 } : 0;
    this.lastScrollPos = this.both() ? { top: 0, left: 0 } : 0;
    if (this.d_loading === void 0 || this.d_loading === false) {
      this.d_loading = this._loading() || false;
    }
    this.d_numToleratedItems = this._numToleratedItems();
    this.loaderArr = this.loaderArr.length > 0 ? this.loaderArr : [];
  }
  getElementRef() {
    return this.elementViewChild();
  }
  getPageByFirst(first) {
    return Math.floor(((first ?? this.first) + this.d_numToleratedItems * 4) / (this._step() || 1));
  }
  isPageChanged(first) {
    return this._step() ? this.page !== this.getPageByFirst(first ?? this.first) : true;
  }
  scrollTo(options) {
    this.elementViewChild()?.nativeElement?.scrollTo(options);
  }
  scrollToIndex(index, behavior = "auto") {
    const valid = this.both() ? index.every((i) => i > -1) : index > -1;
    if (valid) {
      const first = this.first;
      const { scrollTop = 0, scrollLeft = 0 } = this.elementViewChild()?.nativeElement ?? {};
      const { numToleratedItems } = this.calculateNumItems();
      const contentPos = this.getContentPosition();
      const itemSize = this._itemSize();
      const calculateFirst = (_index = 0, _numT) => _index <= _numT ? 0 : _index;
      const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
      const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
      let newFirst = this.both() ? { rows: 0, cols: 0 } : 0;
      let isRangeChanged = false, isScrollChanged = false;
      if (this.both()) {
        newFirst = {
          rows: calculateFirst(index[0], numToleratedItems[0]),
          cols: calculateFirst(index[1], numToleratedItems[1])
        };
        scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
        isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
        isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
      } else {
        newFirst = calculateFirst(index, numToleratedItems);
        if (this.horizontal()) {
          scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), scrollTop);
        } else {
          scrollTo(scrollLeft, calculateCoord(newFirst, itemSize, contentPos.top));
        }
        isScrollChanged = this.lastScrollPos !== (this.horizontal() ? scrollLeft : scrollTop);
        isRangeChanged = newFirst !== first;
      }
      this.isRangeChanged = isRangeChanged;
      if (isScrollChanged) {
        this.first = newFirst;
      }
    }
  }
  scrollInView(index, to, behavior = "auto") {
    if (to) {
      const { first, viewport } = this.getRenderedRange();
      const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
      const isToStart = to === "to-start";
      const isToEnd = to === "to-end";
      if (isToStart) {
        if (this.both()) {
          if (viewport.first.rows - first.rows > index[0]) {
            scrollTo(viewport.first.cols * this._itemSize()[1], (viewport.first.rows - 1) * this._itemSize()[0]);
          } else if (viewport.first.cols - first.cols > index[1]) {
            scrollTo((viewport.first.cols - 1) * this._itemSize()[1], viewport.first.rows * this._itemSize()[0]);
          }
        } else {
          if (viewport.first - first > index) {
            const pos = (viewport.first - 1) * this._itemSize();
            if (this.horizontal()) {
              scrollTo(pos, 0);
            } else {
              scrollTo(0, pos);
            }
          }
        }
      } else if (isToEnd) {
        if (this.both()) {
          if (viewport.last.rows - first.rows <= index[0] + 1) {
            scrollTo(viewport.first.cols * this._itemSize()[1], (viewport.first.rows + 1) * this._itemSize()[0]);
          } else if (viewport.last.cols - first.cols <= index[1] + 1) {
            scrollTo((viewport.first.cols + 1) * this._itemSize()[1], viewport.first.rows * this._itemSize()[0]);
          }
        } else {
          if (viewport.last - first <= index + 1) {
            const pos = (viewport.first + 1) * this._itemSize();
            if (this.horizontal()) {
              scrollTo(pos, 0);
            } else {
              scrollTo(0, pos);
            }
          }
        }
      }
    } else {
      this.scrollToIndex(index, behavior);
    }
  }
  getRenderedRange() {
    const calculateFirstInViewport = (_pos, _size) => _size || _pos ? Math.floor(_pos / (_size || _pos)) : 0;
    let firstInViewport = this.first;
    let lastInViewport = 0;
    const el = this.elementViewChild()?.nativeElement;
    if (el) {
      const { scrollTop, scrollLeft } = el;
      if (this.both()) {
        firstInViewport = {
          rows: calculateFirstInViewport(scrollTop, this._itemSize()[0]),
          cols: calculateFirstInViewport(scrollLeft, this._itemSize()[1])
        };
        lastInViewport = {
          rows: firstInViewport.rows + this.numItemsInViewport.rows,
          cols: firstInViewport.cols + this.numItemsInViewport.cols
        };
      } else {
        const scrollPos = this.horizontal() ? scrollLeft : scrollTop;
        firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize());
        lastInViewport = firstInViewport + this.numItemsInViewport;
      }
    }
    return {
      first: this.first,
      last: this.last,
      viewport: {
        first: firstInViewport,
        last: lastInViewport
      }
    };
  }
  calculateNumItems() {
    const contentPos = this.getContentPosition();
    const el = this.elementViewChild()?.nativeElement;
    const contentWidth = (el ? el.offsetWidth - contentPos.left : 0) || 0;
    const contentHeight = (el ? el.offsetHeight - contentPos.top : 0) || 0;
    const calculateNumItemsInViewport = (_contentSize, _itemSize) => _itemSize || _contentSize ? Math.ceil(_contentSize / (_itemSize || _contentSize)) : 0;
    const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
    const numItemsInViewport = this.both() ? {
      rows: calculateNumItemsInViewport(contentHeight, this._itemSize()[0]),
      cols: calculateNumItemsInViewport(contentWidth, this._itemSize()[1])
    } : calculateNumItemsInViewport(this.horizontal() ? contentWidth : contentHeight, this._itemSize());
    const numToleratedItems = this.d_numToleratedItems || (this.both() ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
    return { numItemsInViewport, numToleratedItems };
  }
  calculateOptions() {
    const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
    const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
    const first = this.first;
    const last = this.both() ? {
      rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]),
      cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true)
    } : calculateLast(this.first, numItemsInViewport, numToleratedItems);
    this.last = last;
    this.numItemsInViewport = numItemsInViewport;
    this.d_numToleratedItems = numToleratedItems;
    if (this._showLoader()) {
      this.loaderArr = this.both() ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
    }
    if (this._lazy()) {
      Promise.resolve().then(() => {
        this.lazyLoadState = {
          first: this._step() ? this.both() ? { rows: 0, cols: first.cols } : 0 : first,
          last: Math.min(this._step() ? this._step() : this.last, this._items().length)
        };
        this.handleEvents("onLazyLoad", this.lazyLoadState);
      });
    }
  }
  calculateAutoSize() {
    if (this._autoSize() && !this.d_loading) {
      Promise.resolve().then(() => {
        if (this.contentEl) {
          this.contentEl.style.minHeight = this.contentEl.style.minWidth = "auto";
          this.contentEl.style.position = "relative";
          this.elementViewChild().nativeElement.style.contain = "none";
          const [contentWidth, contentHeight] = [zt(this.contentEl), Ft(this.contentEl)];
          if (contentWidth !== this.defaultContentWidth) {
            this.elementViewChild().nativeElement.style.width = "";
          }
          if (contentHeight !== this.defaultContentHeight) {
            this.elementViewChild().nativeElement.style.height = "";
          }
          const [width, height] = [zt(this.elementViewChild().nativeElement), Ft(this.elementViewChild().nativeElement)];
          if (this.both() || this.horizontal()) {
            this.elementViewChild().nativeElement.style.width = width < this.defaultWidth ? width + "px" : this._scrollWidth() || this.defaultWidth + "px";
          }
          if (this.both() || this.vertical()) {
            this.elementViewChild().nativeElement.style.height = height < this.defaultHeight ? height + "px" : this._scrollHeight() || this.defaultHeight + "px";
          }
          this.contentEl.style.minHeight = this.contentEl.style.minWidth = "";
          this.contentEl.style.position = "";
          this.elementViewChild().nativeElement.style.contain = "";
        }
      });
    }
  }
  getLast(last = 0, isCols = false) {
    const items = this._items();
    const columns = this._columns();
    return items ? Math.min(isCols ? (columns || items[0]).length : items.length, last) : 0;
  }
  getContentPosition() {
    if (this.contentEl) {
      const style8 = getComputedStyle(this.contentEl);
      const left = parseFloat(style8.paddingLeft) + Math.max(parseFloat(style8.left) || 0, 0);
      const right = parseFloat(style8.paddingRight) + Math.max(parseFloat(style8.right) || 0, 0);
      const top = parseFloat(style8.paddingTop) + Math.max(parseFloat(style8.top) || 0, 0);
      const bottom = parseFloat(style8.paddingBottom) + Math.max(parseFloat(style8.bottom) || 0, 0);
      return { left, right, top, bottom, x: left + right, y: top + bottom };
    }
    return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
  }
  setSize() {
    const nativeElement = this.elementViewChild()?.nativeElement;
    if (nativeElement) {
      const parentElement = nativeElement.parentElement?.parentElement;
      const elementWidth = nativeElement.offsetWidth;
      const parentWidth = parentElement?.offsetWidth || 0;
      const width = this._scrollWidth() || `${elementWidth || parentWidth}px`;
      const elementHeight = nativeElement.offsetHeight;
      const parentHeight = parentElement?.offsetHeight || 0;
      const height = this._scrollHeight() || `${elementHeight || parentHeight}px`;
      const setProp = (_name, _value) => nativeElement.style[_name] = _value;
      if (this.both() || this.horizontal()) {
        setProp("height", height);
        setProp("width", width);
      } else {
        setProp("height", height);
      }
    }
  }
  setSpacerSize() {
    const items = this._items();
    if (items) {
      const contentPos = this.getContentPosition();
      const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = __spreadValues(__spreadValues({}, this.spacerStyle), { [`${_name}`]: (_value || []).length * _size + _cpos + "px" });
      if (this.both()) {
        setProp("height", items, this._itemSize()[0], contentPos.y);
        setProp("width", this._columns() || items[1], this._itemSize()[1], contentPos.x);
      } else {
        if (this.horizontal()) {
          setProp("width", this._columns() || items, this._itemSize(), contentPos.x);
        } else {
          setProp("height", items, this._itemSize(), contentPos.y);
        }
      }
    }
  }
  setContentPosition(pos) {
    if (this.contentEl && !this._appendOnly()) {
      const first = pos ? pos.first : this.first;
      const calculateTranslateVal = (_first, _size) => _first * _size;
      const setTransform = (_x = 0, _y = 0) => this.contentStyle = __spreadValues(__spreadValues({}, this.contentStyle), { transform: `translate3d(${_x}px, ${_y}px, 0)` });
      if (this.both()) {
        setTransform(calculateTranslateVal(first.cols, this._itemSize()[1]), calculateTranslateVal(first.rows, this._itemSize()[0]));
      } else {
        const translateVal = calculateTranslateVal(first, this._itemSize());
        if (this.horizontal()) {
          setTransform(translateVal, 0);
        } else {
          setTransform(0, translateVal);
        }
      }
    }
  }
  onScrollPositionChange(event) {
    const target = event.target;
    if (!target) {
      throw new Error("Event target is null");
    }
    const contentPos = this.getContentPosition();
    const calculateScrollPos = (_pos, _cpos) => _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
    const calculateCurrentIndex = (_pos, _size) => _size || _pos ? Math.floor(_pos / (_size || _pos)) : 0;
    const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
    const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
      if (_currentIndex <= _numT)
        return 0;
      else
        return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
    };
    const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
      let lastValue = _first + _num + 2 * _numT;
      if (_currentIndex >= _numT) {
        lastValue += _numT + 1;
      }
      return this.getLast(lastValue, _isCols);
    };
    const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
    const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
    let newFirst = this.both() ? { rows: 0, cols: 0 } : 0;
    let newLast = this.last;
    let isRangeChanged = false;
    let newScrollPos = this.lastScrollPos;
    if (this.both()) {
      const isScrollDown = this.lastScrollPos.top <= scrollTop;
      const isScrollRight = this.lastScrollPos.left <= scrollLeft;
      if (!this._appendOnly() || this._appendOnly() && (isScrollDown || isScrollRight)) {
        const currentIndex = {
          rows: calculateCurrentIndex(scrollTop, this._itemSize()[0]),
          cols: calculateCurrentIndex(scrollLeft, this._itemSize()[1])
        };
        const triggerIndex = {
          rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newFirst = {
          rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
          cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
        };
        newLast = {
          rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
          cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
        };
        isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
        newScrollPos = { top: scrollTop, left: scrollLeft };
      }
    } else {
      const scrollPos = this.horizontal() ? scrollLeft : scrollTop;
      const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
      if (!this._appendOnly() || this._appendOnly() && isScrollDownOrRight) {
        const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize());
        const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
        newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
        isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
        newScrollPos = scrollPos;
      }
    }
    return {
      first: newFirst,
      last: newLast,
      isRangeChanged,
      scrollPos: newScrollPos
    };
  }
  onScrollChange(event) {
    const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
    if (isRangeChanged) {
      const newState = { first, last };
      this.setContentPosition(newState);
      this.first = first;
      this.last = last;
      this.lastScrollPos = scrollPos;
      this.handleEvents("onScrollIndexChange", newState);
      if (this._lazy() && this.isPageChanged(first)) {
        const lazyLoadState = {
          first: this._step() ? Math.min(this.getPageByFirst(first) * this._step(), this._items().length - this._step()) : first,
          last: Math.min(this._step() ? (this.getPageByFirst(first) + 1) * this._step() : last, this._items().length)
        };
        const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
        if (isLazyStateChanged) {
          this.handleEvents("onLazyLoad", lazyLoadState);
        }
        this.lazyLoadState = lazyLoadState;
      }
    }
  }
  onContainerScroll(event) {
    this.handleEvents("onScroll", { originalEvent: event });
    if (this._delay()) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      if (!this.d_loading && this._showLoader()) {
        const { isRangeChanged } = this.onScrollPositionChange(event);
        const changed = isRangeChanged || (this._step() ? this.isPageChanged() : false);
        if (changed) {
          this.d_loading = true;
          this.cd.detectChanges();
        }
      }
      this.scrollTimeout = setTimeout(() => {
        this.onScrollChange(event);
        if (this.d_loading && this._showLoader() && (!this._lazy() || this._loading() === void 0)) {
          this.d_loading = false;
          this.page = this.getPageByFirst();
        }
        this.cd.detectChanges();
      }, this._delay());
    } else {
      if (!this.d_loading) {
        this.onScrollChange(event);
      }
    }
  }
  bindResizeListener() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.windowResizeListener) {
        const window2 = this.document.defaultView;
        const event = re() ? "orientationchange" : "resize";
        this.windowResizeListener = this.renderer.listen(window2, event, this.onWindowResize.bind(this));
      }
    }
  }
  unbindResizeListener() {
    if (this.windowResizeListener) {
      this.windowResizeListener();
      this.windowResizeListener = null;
    }
  }
  onWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      if (ft(this.elementViewChild()?.nativeElement)) {
        const [width, height] = [zt(this.elementViewChild()?.nativeElement), Ft(this.elementViewChild()?.nativeElement)];
        const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
        const reinit = this.both() ? isDiffWidth || isDiffHeight : this.horizontal() ? isDiffWidth : this.vertical() ? isDiffHeight : false;
        if (reinit) {
          this.d_numToleratedItems = this._numToleratedItems();
          this.defaultWidth = width;
          this.defaultHeight = height;
          this.defaultContentWidth = zt(this.contentEl);
          this.defaultContentHeight = Ft(this.contentEl);
          this.init();
        }
      }
    }, this._resizeDelay());
  }
  handleEvents(name, params) {
    if (this._destroyed)
      return;
    const opts = this.options();
    return opts && opts[name] ? opts[name](params) : this[name].emit(params);
  }
  getContentTemplateContext() {
    return {
      $implicit: this.loadedItems,
      options: this.getContentOptions()
    };
  }
  getItemTemplateContext(item, index) {
    return {
      $implicit: item,
      options: this.getOptions(index)
    };
  }
  getLoaderTemplateContext(index) {
    return {
      options: this.getLoaderOptions(index, this.both() && { numCols: this.numItemsInViewport.cols })
    };
  }
  getDisabledContentTemplateContext() {
    return {
      $implicit: this.items(),
      options: { rows: this._items() ?? void 0, columns: this.loadedColumns }
    };
  }
  getContentOptions() {
    return {
      contentStyleClass: `p-virtualscroller-content ${this.d_loading ? "p-virtualscroller-loading" : ""}`,
      items: this.loadedItems,
      getItemOptions: (index) => this.getOptions(index),
      loading: this.d_loading,
      getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
      itemSize: this._itemSize(),
      rows: this.loadedRows,
      columns: this.loadedColumns,
      spacerStyle: this.spacerStyle,
      contentStyle: this.contentStyle,
      vertical: this.vertical(),
      horizontal: this.horizontal(),
      both: this.both(),
      scrollTo: this.scrollTo.bind(this),
      scrollToIndex: this.scrollToIndex.bind(this),
      orientation: this._orientation(),
      scrollableElement: this.elementViewChild()?.nativeElement
    };
  }
  getOptions(renderedIndex) {
    const count = (this._items() || []).length;
    const index = this.both() ? this.first.rows + renderedIndex : this.first + renderedIndex;
    return {
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0
    };
  }
  getLoaderOptions(index, extOptions) {
    const count = this.loaderArr.length;
    return __spreadValues({
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
      loading: this.d_loading
    }, extOptions);
  }
  static \u0275fac = function Scroller_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Scroller)();
  };
  static \u0275cmp = (function() {
    const _c0 = ["content"];
    const _c1 = ["item"];
    const _c2 = ["loader"];
    const _c3 = ["loadericon"];
    const _c4 = ["element"];
    const _c5 = ["*"];
    function _forTrack0($index, $item) {
      return this._trackBy() ? this._trackBy()($index, $item) : $index;
    }
    function Scroller_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Scroller_Conditional_0_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Scroller_Conditional_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.contentTemplate())("ngTemplateOutletContext", ctx_r1.getContentTemplateContext());
      }
    }
    function Scroller_Conditional_0_Conditional_3_For_3_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Scroller_Conditional_0_Conditional_3_For_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Scroller_Conditional_0_Conditional_3_For_3_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const item_r3 = ctx.$implicit;
        const \u0275$index_12_r4 = ctx.$index;
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.itemTemplate())("ngTemplateOutletContext", ctx_r1.getItemTemplateContext(item_r3, \u0275$index_12_r4));
      }
    }
    function Scroller_Conditional_0_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 7, 1);
        \u0275\u0275repeaterCreate(2, Scroller_Conditional_0_Conditional_3_For_3_Template, 1, 2, "ng-container", null, _forTrack0, true);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(ctx_r1.contentStyle);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("content"), ctx_r1.contentStyleClass()));
        \u0275\u0275property("pBind", ctx_r1.ptm("content"));
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx_r1.loadedItems);
      }
    }
    function Scroller_Conditional_0_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "div", 7);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(ctx_r1.spacerStyle);
        \u0275\u0275classMap(ctx_r1.cx("spacer"));
        \u0275\u0275property("pBind", ctx_r1.ptm("spacer"));
      }
    }
    function Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const \u0275$index_24_r5 = ctx.$index;
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.loaderTemplate())("ngTemplateOutletContext", ctx_r1.getLoaderTemplateContext(\u0275$index_24_r5));
      }
    }
    function Scroller_Conditional_0_Conditional_5_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275repeaterCreate(0, Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_Template, 1, 2, "ng-container", null, \u0275\u0275repeaterTrackByIndex);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275repeater(ctx_r1.loaderArr);
      }
    }
    function Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.loaderIconTemplate())("ngTemplateOutletContext", ctx_r1.loaderIconContext);
      }
    }
    function Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 9);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(4);
        \u0275\u0275classMap(ctx_r1.cx("loadingIcon"));
        \u0275\u0275property("spin", true)("pBind", ctx_r1.ptm("loadingIcon"));
      }
    }
    function Scroller_Conditional_0_Conditional_5_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_Template, 1, 2, "ng-container")(1, Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_1_Template, 1, 4, ":svg:svg", 8);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275conditional(ctx_r1.loaderIconTemplate() ? 0 : 1);
      }
    }
    function Scroller_Conditional_0_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 7);
        \u0275\u0275conditionalCreate(1, Scroller_Conditional_0_Conditional_5_Conditional_1_Template, 2, 0)(2, Scroller_Conditional_0_Conditional_5_Conditional_2_Template, 2, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("loader"));
        \u0275\u0275property("pBind", ctx_r1.ptm("loader"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.loaderTemplate() ? 1 : 2);
      }
    }
    function Scroller_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 3, 0);
        \u0275\u0275listener("scroll", function Scroller_Conditional_0_Template_div_scroll_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.onContainerScroll($event));
        });
        \u0275\u0275conditionalCreate(2, Scroller_Conditional_0_Conditional_2_Template, 1, 2, "ng-container")(3, Scroller_Conditional_0_Conditional_3_Template, 4, 5, "div", 4);
        \u0275\u0275conditionalCreate(4, Scroller_Conditional_0_Conditional_4_Template, 1, 5, "div", 4);
        \u0275\u0275conditionalCreate(5, Scroller_Conditional_0_Conditional_5_Template, 3, 4, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275styleMap(ctx_r1._style());
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("root"), ctx_r1._styleClass()));
        \u0275\u0275property("pBind", ctx_r1.ptm("root"));
        \u0275\u0275attribute("id", ctx_r1._id())("tabindex", ctx_r1._tabindex());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx_r1.contentTemplate() ? 2 : 3);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx_r1._showSpacer() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r1._loaderDisabled() && ctx_r1._showLoader() && ctx_r1.d_loading ? 5 : -1);
      }
    }
    function Scroller_Conditional_1_Conditional_1_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Scroller_Conditional_1_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Scroller_Conditional_1_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.contentTemplate())("ngTemplateOutletContext", ctx_r1.getDisabledContentTemplateContext());
      }
    }
    function Scroller_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projection(0);
        \u0275\u0275conditionalCreate(1, Scroller_Conditional_1_Conditional_1_Template, 1, 2, "ng-container");
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r1.contentTemplate() ? 1 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Scroller,
      selectors: [["p-scroller"], ["p-virtualscroller"], ["p-virtual-scroller"]],
      contentQueries: function Scroller_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.contentTemplate, _c0, 4)(dirIndex, ctx.itemTemplate, _c1, 4)(dirIndex, ctx.loaderTemplate, _c2, 4)(dirIndex, ctx.loaderIconTemplate, _c3, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(4);
        }
      },
      viewQuery: function Scroller_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx.elementViewChild, _c4, 5)(ctx.contentViewChild, _c0, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(2);
        }
      },
      hostVars: 2,
      hostBindings: function Scroller_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275styleProp("height", ctx.hostHeight());
        }
      },
      inputs: {
        hostName: [1, "hostName"],
        id: [1, "id"],
        style: [1, "style"],
        styleClass: [1, "styleClass"],
        tabindex: [1, "tabindex"],
        items: [1, "items"],
        itemSize: [1, "itemSize"],
        scrollHeight: [1, "scrollHeight"],
        scrollWidth: [1, "scrollWidth"],
        orientation: [1, "orientation"],
        step: [1, "step"],
        delay: [1, "delay"],
        resizeDelay: [1, "resizeDelay"],
        appendOnly: [1, "appendOnly"],
        inline: [1, "inline"],
        lazy: [1, "lazy"],
        disabled: [1, "disabled"],
        loaderDisabled: [1, "loaderDisabled"],
        columns: [1, "columns"],
        showSpacer: [1, "showSpacer"],
        showLoader: [1, "showLoader"],
        numToleratedItems: [1, "numToleratedItems"],
        loading: [1, "loading"],
        autoSize: [1, "autoSize"],
        trackBy: [1, "trackBy"],
        options: [1, "options"]
      },
      outputs: {
        onLazyLoad: "onLazyLoad",
        onScroll: "onScroll",
        onScrollIndexChange: "onScrollIndexChange"
      },
      features: [\u0275\u0275ProvidersFeature([ScrollerStyle, { provide: SCROLLER_INSTANCE, useExisting: _Scroller }, { provide: PARENT_INSTANCE, useExisting: _Scroller }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c5,
      decls: 2,
      vars: 1,
      consts: [["element", ""], ["content", ""], [3, "style", "class", "pBind"], [3, "scroll", "pBind"], [3, "class", "style", "pBind"], [3, "class", "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "pBind"], ["data-p-icon", "spinner", 3, "class", "spin", "pBind"], ["data-p-icon", "spinner", 3, "spin", "pBind"]],
      template: function Scroller_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275conditionalCreate(0, Scroller_Conditional_0_Template, 6, 10, "div", 2)(1, Scroller_Conditional_1_Template, 2, 1);
        }
        if (rf & 2) {
          \u0275\u0275conditional(!ctx._disabled() ? 0 : 1);
        }
      },
      dependencies: [NgTemplateOutlet, Spinner, Bind],
      encapsulation: 2,
      changeDetection: 1
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Scroller, [{
    type: Component,
    args: [{
      selector: "p-scroller, p-virtualscroller, p-virtual-scroller",
      imports: [NgTemplateOutlet, Spinner, Bind],
      standalone: true,
      template: `
        @if (!_disabled()) {
            <div #element [attr.id]="_id()" [attr.tabindex]="_tabindex()" [style]="_style()" [class]="cn(cx('root'), _styleClass())" (scroll)="onContainerScroll($event)" [pBind]="ptm('root')">
                @if (contentTemplate()) {
                    <ng-container *ngTemplateOutlet="contentTemplate(); context: getContentTemplateContext()"></ng-container>
                } @else {
                    <div #content [class]="cn(cx('content'), contentStyleClass())" [style]="contentStyle" [pBind]="ptm('content')">
                        @for (item of loadedItems; track _trackBy() ? _trackBy()!($index, item) : $index; let index = $index) {
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(item, index)"></ng-container>
                        }
                    </div>
                }
                @if (_showSpacer()) {
                    <div [class]="cx('spacer')" [style]="spacerStyle" [pBind]="ptm('spacer')"></div>
                }
                @if (!_loaderDisabled() && _showLoader() && d_loading) {
                    <div [class]="cx('loader')" [pBind]="ptm('loader')">
                        @if (loaderTemplate()) {
                            @for (item of loaderArr; track $index; let index = $index) {
                                <ng-container *ngTemplateOutlet="loaderTemplate(); context: getLoaderTemplateContext(index)"></ng-container>
                            }
                        } @else {
                            @if (loaderIconTemplate()) {
                                <ng-container *ngTemplateOutlet="loaderIconTemplate(); context: loaderIconContext"></ng-container>
                            } @else {
                                <svg data-p-icon="spinner" [class]="cx('loadingIcon')" [spin]="true" [pBind]="ptm('loadingIcon')" />
                            }
                        }
                    </div>
                }
            </div>
        } @else {
            <ng-content />
            @if (contentTemplate()) {
                <ng-container *ngTemplateOutlet="contentTemplate(); context: getDisabledContentTemplateContext()"></ng-container>
            }
        }
    `,
      changeDetection: ChangeDetectionStrategy.Default,
      encapsulation: ViewEncapsulation.None,
      providers: [ScrollerStyle, { provide: SCROLLER_INSTANCE, useExisting: Scroller }, { provide: PARENT_INSTANCE, useExisting: Scroller }],
      hostDirectives: [Bind],
      host: {
        "[style.height]": "hostHeight()"
      }
    }]
  }], () => [], { hostName: [{ type: Input, args: [{ isSignal: true, alias: "hostName", required: false }] }], id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }], style: [{ type: Input, args: [{ isSignal: true, alias: "style", required: false }] }], styleClass: [{ type: Input, args: [{ isSignal: true, alias: "styleClass", required: false }] }], tabindex: [{ type: Input, args: [{ isSignal: true, alias: "tabindex", required: false }] }], items: [{ type: Input, args: [{ isSignal: true, alias: "items", required: false }] }], itemSize: [{ type: Input, args: [{ isSignal: true, alias: "itemSize", required: false }] }], scrollHeight: [{ type: Input, args: [{ isSignal: true, alias: "scrollHeight", required: false }] }], scrollWidth: [{ type: Input, args: [{ isSignal: true, alias: "scrollWidth", required: false }] }], orientation: [{ type: Input, args: [{ isSignal: true, alias: "orientation", required: false }] }], step: [{ type: Input, args: [{ isSignal: true, alias: "step", required: false }] }], delay: [{ type: Input, args: [{ isSignal: true, alias: "delay", required: false }] }], resizeDelay: [{ type: Input, args: [{ isSignal: true, alias: "resizeDelay", required: false }] }], appendOnly: [{ type: Input, args: [{ isSignal: true, alias: "appendOnly", required: false }] }], inline: [{ type: Input, args: [{ isSignal: true, alias: "inline", required: false }] }], lazy: [{ type: Input, args: [{ isSignal: true, alias: "lazy", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], loaderDisabled: [{ type: Input, args: [{ isSignal: true, alias: "loaderDisabled", required: false }] }], columns: [{ type: Input, args: [{ isSignal: true, alias: "columns", required: false }] }], showSpacer: [{ type: Input, args: [{ isSignal: true, alias: "showSpacer", required: false }] }], showLoader: [{ type: Input, args: [{ isSignal: true, alias: "showLoader", required: false }] }], numToleratedItems: [{ type: Input, args: [{ isSignal: true, alias: "numToleratedItems", required: false }] }], loading: [{ type: Input, args: [{ isSignal: true, alias: "loading", required: false }] }], autoSize: [{ type: Input, args: [{ isSignal: true, alias: "autoSize", required: false }] }], trackBy: [{ type: Input, args: [{ isSignal: true, alias: "trackBy", required: false }] }], options: [{ type: Input, args: [{ isSignal: true, alias: "options", required: false }] }], onLazyLoad: [{ type: Output, args: ["onLazyLoad"] }], onScroll: [{ type: Output, args: ["onScroll"] }], onScrollIndexChange: [{ type: Output, args: ["onScrollIndexChange"] }], elementViewChild: [{ type: ViewChild, args: ["element", { isSignal: true }] }], contentViewChild: [{ type: ViewChild, args: ["content", { isSignal: true }] }], contentTemplate: [{ type: ContentChild, args: ["content", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], itemTemplate: [{ type: ContentChild, args: ["item", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], loaderTemplate: [{ type: ContentChild, args: ["loader", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], loaderIconTemplate: [{ type: ContentChild, args: ["loadericon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }] });
})();
var ScrollerModule = class _ScrollerModule {
  static \u0275fac = function ScrollerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ScrollerModule,
    imports: [Scroller],
    exports: [Scroller]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Scroller]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerModule, [{
    type: NgModule,
    args: [{
      imports: [Scroller],
      exports: [Scroller]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/tooltip/index.mjs
var style7 = "\n    .p-tooltip {\n        position: absolute;\n        display: none;\n        max-width: dt('tooltip.max.width');\n    }\n\n    .p-tooltip-right,\n    .p-tooltip-left {\n        padding: 0 dt('tooltip.gutter');\n    }\n\n    .p-tooltip-top,\n    .p-tooltip-bottom {\n        padding: dt('tooltip.gutter') 0;\n    }\n\n    .p-tooltip-text {\n        white-space: pre-line;\n        word-break: break-word;\n        background: dt('tooltip.background');\n        color: dt('tooltip.color');\n        padding: dt('tooltip.padding');\n        box-shadow: dt('tooltip.shadow');\n        border-radius: dt('tooltip.border.radius');\n        font-weight: dt('tooltip.font.weight');\n        font-size: dt('tooltip.font.size');\n    }\n\n    .p-tooltip-arrow {\n        position: absolute;\n        width: 0;\n        height: 0;\n        border-color: transparent;\n        border-style: solid;\n    }\n\n    .p-tooltip-right .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;\n        border-right-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-left .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');\n        border-left-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-top .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-bottom .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n";

// node_modules/primeng/fesm2022/primeng-tooltip.mjs
var classes8 = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = class _TooltipStyle extends BaseStyle {
  name = "tooltip";
  style = style7;
  classes = classes8;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275TooltipStyle_BaseFactory = void 0;
    return function TooltipStyle_Factory(__ngFactoryType__) {
      return (\u0275TooltipStyle_BaseFactory || (\u0275TooltipStyle_BaseFactory = \u0275\u0275getInheritedFactory(_TooltipStyle)))(__ngFactoryType__ || _TooltipStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TooltipStyle,
    factory: _TooltipStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipStyle, [{
    type: Injectable
  }], null, null);
})();
var TooltipClasses;
(function(TooltipClasses2) {
  TooltipClasses2["root"] = "p-tooltip";
  TooltipClasses2["arrow"] = "p-tooltip-arrow";
  TooltipClasses2["text"] = "p-tooltip-text";
})(TooltipClasses || (TooltipClasses = {}));
var TOOLTIP_INSTANCE = new InjectionToken("TOOLTIP_INSTANCE");
var Tooltip = class _Tooltip extends BaseComponent {
  componentName = "Tooltip";
  $pcTooltip = inject(TOOLTIP_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition = input(
    ...ngDevMode ? [void 0, { debugName: "tooltipPosition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Event to show the tooltip.
   * @group Props
   */
  tooltipEvent = input(
    "hover",
    ...ngDevMode ? [{ debugName: "tooltipEvent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Type of CSS position.
   * @group Props
   */
  positionStyle = input(
    ...ngDevMode ? [void 0, { debugName: "positionStyle" }] : (
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
   * Whether the z-index should be managed automatically to always go on top or have a fixed value.
   * @group Props
   */
  tooltipZIndex = input(
    ...ngDevMode ? [void 0, { debugName: "tooltipZIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
   * @group Props
   */
  escape = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "escape" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Delay to show the tooltip in milliseconds.
   * @group Props
   */
  showDelay = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "showDelay" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Delay to hide the tooltip in milliseconds.
   * @group Props
   */
  hideDelay = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "hideDelay" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Time to wait in milliseconds to hide the tooltip even it is active.
   * @group Props
   */
  life = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "life" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Specifies the additional vertical offset of the tooltip from its default position.
   * @group Props
   */
  positionTop = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "positionTop" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Specifies the additional horizontal offset of the tooltip from its default position.
   * @group Props
   */
  positionLeft = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "positionLeft" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Whether to hide tooltip when hovering over tooltip content.
   * @group Props
   */
  autoHide = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autoHide" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Automatically adjusts the element position when there is not enough space on the selected position.
   * @group Props
   */
  fitContent = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "fitContent" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether to hide tooltip on escape key press.
   * @group Props
   */
  hideOnEscape = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "hideOnEscape" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether to show the tooltip only when the target text overflows (e.g., ellipsis is active).
   * @group Props
   */
  showOnEllipsis = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "showOnEllipsis" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Content of the tooltip.
   * @group Props
   */
  content = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "content" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "pTooltip" }));
  /**
   * When present, it specifies that the component should be disabled.
   * @defaultValue false
   * @group Props
   */
  tooltipDisabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "tooltipDisabled" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Specifies the tooltip configuration options for the component.
   * @group Props
   */
  tooltipOptions = input(
    ...ngDevMode ? [void 0, { debugName: "tooltipOptions" }] : (
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
  $appendTo = computed(
    () => this.appendTo() || this.config.overlayAppendTo(),
    ...ngDevMode ? [{ debugName: "$appendTo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tooltipId = s("pn_id_") + "_tooltip";
  /**
   * Computed tooltip options that merges individual props with tooltipOptions.
   * Priority: tooltipOptions > individual props (with inline defaults)
   */
  _tooltipOptions = computed(
    () => __spreadProps(__spreadValues({
      tooltipLabel: this.content(),
      tooltipPosition: this.tooltipPosition() ?? "right",
      tooltipEvent: this.tooltipEvent(),
      appendTo: this.appendTo() ?? "body",
      positionStyle: this.positionStyle(),
      tooltipStyleClass: this.tooltipStyleClass(),
      tooltipZIndex: this.tooltipZIndex() ?? "auto",
      escape: this.escape(),
      showDelay: this.showDelay(),
      hideDelay: this.hideDelay(),
      life: this.life(),
      positionTop: this.positionTop() ?? 0,
      positionLeft: this.positionLeft() ?? 0,
      autoHide: this.autoHide(),
      hideOnEscape: this.hideOnEscape(),
      showOnEllipsis: this.showOnEllipsis(),
      disabled: this.tooltipDisabled()
    }, this.tooltipOptions()), {
      id: this.tooltipId
    }),
    ...ngDevMode ? [{ debugName: "_tooltipOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  container = null;
  styleClass;
  tooltipText = null;
  rootPTClasses = "";
  showTimeout = null;
  hideTimeout = null;
  active;
  mouseEnterListener;
  mouseLeaveListener;
  clickListener;
  focusListener;
  blurListener;
  touchStartListener;
  touchEndListener;
  containerMouseleaveListener;
  documentTouchListener;
  documentEscapeListener;
  scrollHandler = null;
  resizeListener = null;
  _componentStyle = inject(TooltipStyle);
  /**
   * Used to pass attributes to DOM elements inside the Tooltip component.
   * @defaultValue undefined
   * @group Props
   */
  pTooltipPT = input(
    ...ngDevMode ? [void 0, { debugName: "pTooltipPT" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pTooltipUnstyled = input(
    ...ngDevMode ? [void 0, { debugName: "pTooltipUnstyled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  viewContainer = inject(ViewContainerRef);
  constructor() {
    super();
    effect(() => {
      const pt = this.pTooltipPT();
      if (pt) {
        this.directivePT.set(pt);
      }
    });
    effect(() => {
      if (this.pTooltipUnstyled()) {
        this.directiveUnstyled.set(this.pTooltipUnstyled());
      }
    });
    effect(() => {
      const content = this.content();
      untracked(() => {
        if (this.active) {
          if (content) {
            if (this.container && this.container.offsetParent) {
              this.updateText();
              this.align();
            } else {
              this.show();
            }
          } else {
            this.hide();
          }
        }
      });
    });
    effect(() => {
      const disabled = this.tooltipDisabled();
      untracked(() => {
        if (disabled) {
          this.deactivate();
        }
      });
    });
    effect(() => {
      const options = this.tooltipOptions();
      untracked(() => {
        if (options) {
          this.deactivate();
          if (this.active) {
            if (this.getOption("tooltipLabel")) {
              if (this.container && this.container.offsetParent) {
                this.updateText();
                this.align();
              } else {
                this.show();
              }
            } else {
              this.hide();
            }
          }
        }
      });
    });
  }
  onAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const tooltipEvent = this.getOption("tooltipEvent");
      if (tooltipEvent === "hover" || tooltipEvent === "both") {
        this.mouseEnterListener = this.onMouseEnter.bind(this);
        this.mouseLeaveListener = this.onMouseLeave.bind(this);
        this.clickListener = this.onInputClick.bind(this);
        this.el.nativeElement.addEventListener("mouseenter", this.mouseEnterListener);
        this.el.nativeElement.addEventListener("click", this.clickListener);
        this.el.nativeElement.addEventListener("mouseleave", this.mouseLeaveListener);
        this.touchStartListener = this.onTouchStart.bind(this);
        this.touchEndListener = this.onTouchEnd.bind(this);
        this.el.nativeElement.addEventListener("touchstart", this.touchStartListener, { passive: true });
        this.el.nativeElement.addEventListener("touchend", this.touchEndListener, { passive: true });
      }
      if (tooltipEvent === "focus" || tooltipEvent === "both") {
        this.focusListener = this.onFocus.bind(this);
        this.blurListener = this.onBlur.bind(this);
        let target = this.el.nativeElement.querySelector(".p-component");
        if (!target) {
          target = this.getTarget(this.el.nativeElement);
        }
        target.addEventListener("focus", this.focusListener);
        target.addEventListener("blur", this.blurListener);
      }
    }
  }
  isAutoHide() {
    return this.getOption("autoHide");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMouseEnter(e3) {
    if (!this.container && !this.showTimeout) {
      this.activate();
    }
  }
  onMouseLeave(e3) {
    if (!this.isAutoHide()) {
      const valid = I(e3.relatedTarget, "p-tooltip") || I(e3.relatedTarget, "p-tooltip-text") || I(e3.relatedTarget, "p-tooltip-arrow");
      if (!valid) {
        this.deactivate();
      }
    } else {
      this.deactivate();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTouchStart(e3) {
    if (!this.container && !this.showTimeout) {
      this.activate();
      if (!this.isAutoHide()) {
        this.bindDocumentTouchListener();
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTouchEnd(e3) {
    if (this.isAutoHide()) {
      this.deactivate();
    }
  }
  bindDocumentTouchListener() {
    if (!this.documentTouchListener) {
      this.documentTouchListener = this.renderer.listen("document", "touchstart", (e3) => {
        const target = e3.target;
        if (this.container && !this.container.contains(target) && !this.el.nativeElement.contains(target)) {
          this.deactivate();
          this.unbindDocumentTouchListener();
        }
      });
    }
  }
  unbindDocumentTouchListener() {
    if (this.documentTouchListener) {
      this.documentTouchListener();
      this.documentTouchListener = null;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFocus(e3) {
    this.activate();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBlur(e3) {
    this.deactivate();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onInputClick(e3) {
    this.deactivate();
  }
  hasEllipsis() {
    const el = this.el.nativeElement;
    return el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight;
  }
  activate() {
    if (this.active)
      return;
    if (this.getOption("showOnEllipsis") && !this.hasEllipsis()) {
      return;
    }
    this.active = true;
    this.clearHideTimeout();
    const showDelay = this.getOption("showDelay");
    if (showDelay) {
      this.showTimeout = setTimeout(() => {
        this.show();
      }, showDelay);
    } else {
      this.show();
    }
    const life = this.getOption("life");
    if (life) {
      const duration = showDelay ? life + showDelay : life;
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, duration);
    }
    if (this.getOption("hideOnEscape")) {
      this.documentEscapeListener = this.renderer.listen("document", "keydown.escape", () => {
        this.deactivate();
        this.documentEscapeListener?.();
      });
    }
  }
  deactivate() {
    this.active = false;
    this.clearShowTimeout();
    const hideDelay = this.getOption("hideDelay");
    if (hideDelay) {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, hideDelay);
    } else {
      this.hide();
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  create() {
    if (this.container) {
      this.clearHideTimeout();
      this.remove();
    }
    const container = Z("div", { class: this.cx("root"), "p-bind": this.ptm("root"), "data-pc-section": "root" });
    const tooltipArrow = Z("div", { class: this.cx("arrow"), "p-bind": this.ptm("arrow"), "data-pc-section": "arrow" });
    const tooltipText = Z("div", { class: this.cx("text"), "p-bind": this.ptm("text"), "data-pc-section": "text" });
    container.setAttribute("role", "tooltip");
    container.appendChild(tooltipArrow);
    this.container = container;
    this.tooltipText = tooltipText;
    this.updateText();
    if (this.getOption("positionStyle")) {
      container.style.position = this.getOption("positionStyle");
    }
    container.appendChild(tooltipText);
    if (this.getOption("appendTo") === "body")
      document.body.appendChild(container);
    else if (this.getOption("appendTo") === "target")
      St(container, this.el.nativeElement);
    else
      St(this.getOption("appendTo"), container);
    container.style.display = "none";
    if (this.fitContent()) {
      container.style.width = "fit-content";
    }
    if (this.isAutoHide()) {
      container.style.pointerEvents = "none";
    } else {
      container.style.pointerEvents = "unset";
      this.bindContainerMouseleaveListener();
    }
  }
  bindContainerMouseleaveListener() {
    if (!this.containerMouseleaveListener && this.container) {
      this.containerMouseleaveListener = this.renderer.listen(this.container, "mouseleave", () => {
        this.deactivate();
      });
    }
  }
  unbindContainerMouseleaveListener() {
    if (this.containerMouseleaveListener) {
      this.bindContainerMouseleaveListener();
      this.containerMouseleaveListener = null;
    }
  }
  show() {
    if (!this.getOption("tooltipLabel") || this.getOption("disabled")) {
      return;
    }
    this.create();
    const container = this.container;
    const nativeElement = this.el.nativeElement;
    const pDialogWrapper = nativeElement.closest("p-dialog");
    if (pDialogWrapper) {
      setTimeout(() => {
        if (this.container) {
          this.container.style.display = "inline-block";
          this.align();
        }
      }, 100);
    } else {
      container.style.display = "inline-block";
      this.align();
    }
    Ht(container, 250);
    if (this.getOption("tooltipZIndex") === "auto")
      zindexutils.set("tooltip", container, this.config.zIndex.tooltip);
    else
      container.style.zIndex = this.getOption("tooltipZIndex");
    this.bindDocumentResizeListener();
    this.bindScrollListener();
  }
  hide() {
    if (this.getOption("tooltipZIndex") === "auto") {
      zindexutils.clear(this.container);
    }
    this.remove();
  }
  updateText() {
    if (!this.tooltipText)
      return;
    const content = this.getOption("tooltipLabel");
    if (content && typeof content.createEmbeddedView === "function") {
      const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
      embeddedViewRef.detectChanges();
      embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
    } else if (this.getOption("escape")) {
      this.tooltipText.innerHTML = "";
      this.tooltipText.appendChild(document.createTextNode(content));
    } else {
      this.tooltipText.innerHTML = content;
    }
  }
  align() {
    const position = this.getOption("tooltipPosition");
    const positionPriority = {
      top: [this.alignTop, this.alignBottom, this.alignRight, this.alignLeft],
      bottom: [this.alignBottom, this.alignTop, this.alignRight, this.alignLeft],
      left: [this.alignLeft, this.alignRight, this.alignTop, this.alignBottom],
      right: [this.alignRight, this.alignLeft, this.alignTop, this.alignBottom]
    };
    const alignFns = positionPriority[position] || [];
    for (let [index, alignmentFn] of alignFns.entries()) {
      if (index === 0)
        alignmentFn.call(this);
      else if (this.isOutOfBounds())
        alignmentFn.call(this);
      else
        break;
    }
  }
  getHostOffset() {
    if (this.getOption("appendTo") === "body" || this.getOption("appendTo") === "target") {
      let offset = this.el.nativeElement.getBoundingClientRect();
      let targetLeft = offset.left + V();
      let targetTop = offset.top + j();
      return { left: targetLeft, top: targetTop };
    } else {
      return { left: 0, top: 0 };
    }
  }
  get activeElement() {
    return this.el.nativeElement.nodeName.startsWith("P-") ? et(this.el.nativeElement, ".p-component") : this.el.nativeElement;
  }
  alignRight() {
    this.preAlign("right");
    const el = this.activeElement;
    const offsetLeft = L(el);
    const offsetTop = (k(el) - k(this.container)) / 2;
    this.alignTooltip(offsetLeft, offsetTop);
    let arrowElement = this.getArrowElement();
    if (arrowElement) {
      arrowElement.style.top = "50%";
      arrowElement.style.right = "";
      arrowElement.style.bottom = "";
      arrowElement.style.left = "0";
    }
  }
  alignLeft() {
    this.preAlign("left");
    let arrowElement = this.getArrowElement();
    let offsetLeft = L(this.container);
    let offsetTop = (k(this.el.nativeElement) - k(this.container)) / 2;
    this.alignTooltip(-offsetLeft, offsetTop);
    if (arrowElement) {
      arrowElement.style.top = "50%";
      arrowElement.style.right = "0";
      arrowElement.style.bottom = "";
      arrowElement.style.left = "";
    }
  }
  alignTop() {
    this.preAlign("top");
    let arrowElement = this.getArrowElement();
    let hostOffset = this.getHostOffset();
    let elementWidth = L(this.container);
    let offsetLeft = (L(this.el.nativeElement) - L(this.container)) / 2;
    let offsetTop = k(this.container);
    this.alignTooltip(offsetLeft, -offsetTop);
    let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
    if (arrowElement) {
      arrowElement.style.top = "";
      arrowElement.style.right = "";
      arrowElement.style.bottom = "0";
      arrowElement.style.left = elementRelativeCenter + "px";
    }
  }
  getArrowElement() {
    return et(this.container, '[data-pc-section="arrow"]');
  }
  alignBottom() {
    this.preAlign("bottom");
    let arrowElement = this.getArrowElement();
    let elementWidth = L(this.container);
    let hostOffset = this.getHostOffset();
    let offsetLeft = (L(this.el.nativeElement) - L(this.container)) / 2;
    let offsetTop = k(this.el.nativeElement);
    this.alignTooltip(offsetLeft, offsetTop);
    let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
    if (arrowElement) {
      arrowElement.style.top = "0";
      arrowElement.style.right = "";
      arrowElement.style.bottom = "";
      arrowElement.style.left = elementRelativeCenter + "px";
    }
  }
  alignTooltip(offsetLeft, offsetTop) {
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left + offsetLeft;
    let top = hostOffset.top + offsetTop;
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  getOption(option) {
    const options = this._tooltipOptions();
    return options[option];
  }
  getTarget(el) {
    return I(el, "p-inputwrapper") ? et(el, "input") : el;
  }
  preAlign(position) {
    this.container.style.left = "-999px";
    this.container.style.top = "-999px";
    this.container.className = this.cn(this.cx("root"), this.ptm("root")?.class, "p-tooltip-" + position, this.getOption("tooltipStyleClass") ?? "") ?? "";
  }
  isOutOfBounds() {
    let offset = this.container.getBoundingClientRect();
    let targetTop = offset.top;
    let targetLeft = offset.left;
    let width = L(this.container);
    let height = k(this.container);
    let viewport = h();
    return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onWindowResize(e3) {
    this.hide();
  }
  bindDocumentResizeListener() {
    const listener = this.onWindowResize.bind(this);
    this.resizeListener = listener;
    window.addEventListener("resize", listener);
  }
  unbindDocumentResizeListener() {
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
      this.resizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
        if (this.container) {
          this.hide();
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  unbindEvents() {
    const tooltipEvent = this.getOption("tooltipEvent");
    if (tooltipEvent === "hover" || tooltipEvent === "both") {
      this.el.nativeElement.removeEventListener("mouseenter", this.mouseEnterListener);
      this.el.nativeElement.removeEventListener("mouseleave", this.mouseLeaveListener);
      this.el.nativeElement.removeEventListener("click", this.clickListener);
      this.el.nativeElement.removeEventListener("touchstart", this.touchStartListener);
      this.el.nativeElement.removeEventListener("touchend", this.touchEndListener);
      this.unbindDocumentTouchListener();
    }
    if (tooltipEvent === "focus" || tooltipEvent === "both") {
      let target = this.el.nativeElement.querySelector(".p-component");
      if (!target) {
        target = this.getTarget(this.el.nativeElement);
      }
      target.removeEventListener("focus", this.focusListener);
      target.removeEventListener("blur", this.blurListener);
    }
    this.unbindDocumentResizeListener();
  }
  remove() {
    if (this.container && this.container.parentElement) {
      if (this.getOption("appendTo") === "body")
        document.body.removeChild(this.container);
      else if (this.getOption("appendTo") === "target")
        this.el.nativeElement.removeChild(this.container);
      else
        fe(this.getOption("appendTo"), this.container);
    }
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.unbindContainerMouseleaveListener();
    this.unbindDocumentTouchListener();
    this.clearTimeouts();
    this.container = null;
    this.scrollHandler = null;
  }
  clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }
  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
  clearTimeouts() {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }
  onDestroy() {
    this.unbindEvents();
    if (this.container) {
      zindexutils.clear(this.container);
    }
    this.remove();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  static \u0275fac = function Tooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tooltip)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _Tooltip,
    selectors: [["", "pTooltip", ""]],
    inputs: {
      tooltipPosition: [1, "tooltipPosition"],
      tooltipEvent: [1, "tooltipEvent"],
      positionStyle: [1, "positionStyle"],
      tooltipStyleClass: [1, "tooltipStyleClass"],
      tooltipZIndex: [1, "tooltipZIndex"],
      escape: [1, "escape"],
      showDelay: [1, "showDelay"],
      hideDelay: [1, "hideDelay"],
      life: [1, "life"],
      positionTop: [1, "positionTop"],
      positionLeft: [1, "positionLeft"],
      autoHide: [1, "autoHide"],
      fitContent: [1, "fitContent"],
      hideOnEscape: [1, "hideOnEscape"],
      showOnEllipsis: [1, "showOnEllipsis"],
      content: [1, "pTooltip", "content"],
      tooltipDisabled: [1, "tooltipDisabled"],
      tooltipOptions: [1, "tooltipOptions"],
      appendTo: [1, "appendTo"],
      pTooltipPT: [1, "pTooltipPT"],
      pTooltipUnstyled: [1, "pTooltipUnstyled"]
    },
    features: [\u0275\u0275ProvidersFeature([TooltipStyle, { provide: TOOLTIP_INSTANCE, useExisting: _Tooltip }, { provide: PARENT_INSTANCE, useExisting: _Tooltip }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
    type: Directive,
    args: [{
      selector: "[pTooltip]",
      standalone: true,
      providers: [TooltipStyle, { provide: TOOLTIP_INSTANCE, useExisting: Tooltip }, { provide: PARENT_INSTANCE, useExisting: Tooltip }]
    }]
  }], () => [], { tooltipPosition: [{ type: Input, args: [{ isSignal: true, alias: "tooltipPosition", required: false }] }], tooltipEvent: [{ type: Input, args: [{ isSignal: true, alias: "tooltipEvent", required: false }] }], positionStyle: [{ type: Input, args: [{ isSignal: true, alias: "positionStyle", required: false }] }], tooltipStyleClass: [{ type: Input, args: [{ isSignal: true, alias: "tooltipStyleClass", required: false }] }], tooltipZIndex: [{ type: Input, args: [{ isSignal: true, alias: "tooltipZIndex", required: false }] }], escape: [{ type: Input, args: [{ isSignal: true, alias: "escape", required: false }] }], showDelay: [{ type: Input, args: [{ isSignal: true, alias: "showDelay", required: false }] }], hideDelay: [{ type: Input, args: [{ isSignal: true, alias: "hideDelay", required: false }] }], life: [{ type: Input, args: [{ isSignal: true, alias: "life", required: false }] }], positionTop: [{ type: Input, args: [{ isSignal: true, alias: "positionTop", required: false }] }], positionLeft: [{ type: Input, args: [{ isSignal: true, alias: "positionLeft", required: false }] }], autoHide: [{ type: Input, args: [{ isSignal: true, alias: "autoHide", required: false }] }], fitContent: [{ type: Input, args: [{ isSignal: true, alias: "fitContent", required: false }] }], hideOnEscape: [{ type: Input, args: [{ isSignal: true, alias: "hideOnEscape", required: false }] }], showOnEllipsis: [{ type: Input, args: [{ isSignal: true, alias: "showOnEllipsis", required: false }] }], content: [{ type: Input, args: [{ isSignal: true, alias: "pTooltip", required: false }] }], tooltipDisabled: [{ type: Input, args: [{ isSignal: true, alias: "tooltipDisabled", required: false }] }], tooltipOptions: [{ type: Input, args: [{ isSignal: true, alias: "tooltipOptions", required: false }] }], appendTo: [{ type: Input, args: [{ isSignal: true, alias: "appendTo", required: false }] }], pTooltipPT: [{ type: Input, args: [{ isSignal: true, alias: "pTooltipPT", required: false }] }], pTooltipUnstyled: [{ type: Input, args: [{ isSignal: true, alias: "pTooltipUnstyled", required: false }] }] });
})();
var TooltipModule = class _TooltipModule {
  static \u0275fac = function TooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _TooltipModule,
    imports: [Tooltip, BindModule],
    exports: [Tooltip, BindModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BindModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [Tooltip, BindModule],
      exports: [Tooltip, BindModule]
    }]
  }], null, null);
})();

// node_modules/@primeicons/core/dist/esm/icons/check.mjs
var e2 = { name: "check", meta: { tags: ["check", "done", "complete", "ok", "approve"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M17.4697 3.96973C17.7626 3.67684 18.2373 3.67684 18.5302 3.96973C18.8231 4.26262 18.8231 4.73738 18.5302 5.03028L7.53022 16.0303C7.23732 16.3232 6.76256 16.3232 6.46967 16.0303L1.46967 11.0303C1.17678 10.7374 1.17678 10.2626 1.46967 9.96973C1.76256 9.67684 2.23732 9.67684 2.53022 9.96973L6.99994 14.4395L17.4697 3.96973Z", fill: "currentColor", key: "9v7b3r" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-check.mjs
var Check = class _Check extends CoreIcon {
  constructor() {
    super();
    this._icon = e2;
  }
  static \u0275fac = function Check_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Check)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
    function Check_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Check_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Check_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Check_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Check_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Check_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Check_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Check_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Check_For_1_Case_0_Template, 1, 9, ":svg:path")(1, Check_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, Check_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, Check_For_1_Case_3_Template, 1, 7, ":svg:line")(4, Check_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, Check_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, Check_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Check,
      selectors: [["svg", "data-p-icon", "check"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function Check_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, Check_For_1_Template, 7, 1, null, null, _forTrack0);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Check, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="check"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

export {
  NG_VALUE_ACCESSOR,
  DefaultValueAccessor,
  Validators,
  MaxLengthValidator,
  NgControl,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  NgModel,
  ɵNgNoValidate,
  FormGroupName,
  FormArrayName,
  FormControlName,
  NonNullableFormBuilder,
  FormsModule,
  ReactiveFormsModule,
  BaseModelHolder,
  InputText,
  ChevronDown,
  Search,
  BaseEditableHolder,
  IconField,
  InputIcon,
  ObjectUtils,
  Overlay,
  Scroller,
  Tooltip,
  Check,
  SelectButton,
  LocationError,
  MEETING_POINT_DECIMALS,
  ApproximateLocation
};
//# debugId=e007f6d3-5d95-5def-8a59-805574f66d98
//# sourceMappingURL=chunk-B4F4B5X4.js.map
