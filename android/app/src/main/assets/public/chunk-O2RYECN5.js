import {
  Language
} from "./chunk-R55RQCVH.js";
import {
  BaseComponent,
  Bind,
  Button,
  PARENT_INSTANCE
} from "./chunk-QAKVLXKK.js";
import {
  BaseStyle,
  ChangeDetectionStrategy,
  Component,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Output,
  SharedModule,
  TranslocoPipe,
  ViewEncapsulation,
  computed,
  inject,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E45N4KGX.js";

// node_modules/@primeuix/styles/dist/avatar/index.mjs
var style = "\n    .p-avatar {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: dt('avatar.width');\n        height: dt('avatar.height');\n        font-weight: dt('avatar.font.weight');\n        font-size: dt('avatar.font.size');\n        background: dt('avatar.background');\n        color: dt('avatar.color');\n        border-radius: dt('avatar.border.radius');\n    }\n\n    .p-avatar-image {\n        background: transparent;\n    }\n\n    .p-avatar-circle {\n        border-radius: 50%;\n    }\n\n    .p-avatar-circle img {\n        border-radius: 50%;\n    }\n\n    .p-avatar-icon {\n        font-size: dt('avatar.icon.size');\n        width: dt('avatar.icon.size');\n        height: dt('avatar.icon.size');\n    }\n\n    .p-avatar img {\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-avatar-lg {\n        width: dt('avatar.lg.width');\n        height: dt('avatar.lg.width');\n        font-size: dt('avatar.lg.font.size');\n    }\n\n    .p-avatar-lg .p-avatar-icon {\n        font-size: dt('avatar.lg.icon.size');\n        width: dt('avatar.lg.icon.size');\n        height: dt('avatar.lg.icon.size');\n    }\n\n    .p-avatar-xl {\n        width: dt('avatar.xl.width');\n        height: dt('avatar.xl.width');\n        font-size: dt('avatar.xl.font.size');\n    }\n\n    .p-avatar-xl .p-avatar-icon {\n        font-size: dt('avatar.xl.icon.size');\n        width: dt('avatar.xl.icon.size');\n        height: dt('avatar.xl.icon.size');\n    }\n\n    .p-avatar-group {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-avatar-group .p-avatar + .p-avatar {\n        margin-inline-start: dt('avatar.group.offset');\n    }\n\n    .p-avatar-group .p-avatar {\n        border: 2px solid dt('avatar.group.border.color');\n    }\n\n    .p-avatar-group .p-avatar-lg + .p-avatar-lg {\n        margin-inline-start: dt('avatar.lg.group.offset');\n    }\n\n    .p-avatar-group .p-avatar-xl + .p-avatar-xl {\n        margin-inline-start: dt('avatar.xl.group.offset');\n    }\n";

// node_modules/primeng/fesm2022/primeng-avatar.mjs
var classes = {
  root: ({ instance }) => {
    const image = instance.image();
    const shape = instance.shape();
    const size = instance.size();
    return [
      "p-avatar p-component",
      {
        "p-avatar-image": image != null,
        "p-avatar-circle": shape === "circle",
        "p-avatar-lg": size === "large",
        "p-avatar-xl": size === "xlarge"
      }
    ];
  },
  label: "p-avatar-label",
  icon: "p-avatar-icon"
};
var AvatarStyle = class _AvatarStyle extends BaseStyle {
  name = "avatar";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275AvatarStyle_BaseFactory = void 0;
    return function AvatarStyle_Factory(__ngFactoryType__) {
      return (\u0275AvatarStyle_BaseFactory || (\u0275AvatarStyle_BaseFactory = \u0275\u0275getInheritedFactory(_AvatarStyle)))(__ngFactoryType__ || _AvatarStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AvatarStyle,
    factory: _AvatarStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarStyle, [{
    type: Injectable
  }], null, null);
})();
var AvatarClasses;
(function(AvatarClasses2) {
  AvatarClasses2["root"] = "p-avatar";
  AvatarClasses2["label"] = "p-avatar-label";
  AvatarClasses2["icon"] = "p-avatar-icon";
  AvatarClasses2["image"] = "p-avatar-image";
  AvatarClasses2["circle"] = "p-avatar-circle";
  AvatarClasses2["large"] = "p-avatar-lg";
  AvatarClasses2["xlarge"] = "p-avatar-xl";
})(AvatarClasses || (AvatarClasses = {}));
var AVATAR_INSTANCE = new InjectionToken("AVATAR_INSTANCE");
var Avatar = class _Avatar extends BaseComponent {
  componentName = "Avatar";
  $pcAvatar = inject(AVATAR_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  bindDirectiveInstance = inject(Bind, { self: true });
  /**
   * Defines the text to display.
   * @group Props
   */
  label = input(
    ...ngDevMode ? [void 0, { debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines the icon to display.
   * @group Props
   */
  icon = input(
    ...ngDevMode ? [void 0, { debugName: "icon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines the image to display.
   * @group Props
   */
  image = input(
    ...ngDevMode ? [void 0, { debugName: "image" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Size of the element.
   * @group Props
   */
  size = input(
    "normal",
    ...ngDevMode ? [{ debugName: "size" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Shape of the element.
   * @group Props
   */
  shape = input(
    "square",
    ...ngDevMode ? [{ debugName: "shape" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Establishes a string value that labels the component.
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
   * This event is triggered if an error occurs while loading an image file.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onImageError = output();
  _componentStyle = inject(AvatarStyle);
  dataP = computed(
    () => {
      const shape = this.shape();
      const size = this.size();
      return this.cn({
        [shape]: shape,
        [size]: size
      });
    },
    ...ngDevMode ? [{ debugName: "dataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  imageError(event) {
    this.onImageError.emit(event);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275Avatar_BaseFactory = void 0;
    return function Avatar_Factory(__ngFactoryType__) {
      return (\u0275Avatar_BaseFactory || (\u0275Avatar_BaseFactory = \u0275\u0275getInheritedFactory(_Avatar)))(__ngFactoryType__ || _Avatar);
    };
  })();
  static \u0275cmp = (function() {
    const _c0 = ["*"];
    function Avatar_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 2);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r0.cx("label"));
        \u0275\u0275property("pBind", ctx_r0.ptm("label"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r0.label());
      }
    }
    function Avatar_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 2);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("icon"), ctx_r0.icon()));
        \u0275\u0275property("pBind", ctx_r0.ptm("icon"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Avatar_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        const _r2 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "img", 3);
        \u0275\u0275listener("error", function Avatar_Conditional_3_Template_img_error_0_listener($event) {
          \u0275\u0275restoreView(_r2);
          const ctx_r0 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r0.imageError($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("pBind", ctx_r0.ptm("image"))("src", ctx_r0.image(), \u0275\u0275sanitizeUrl);
        \u0275\u0275attribute("aria-label", ctx_r0.ariaLabel())("data-p", ctx_r0.dataP());
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Avatar,
      selectors: [["p-avatar"]],
      hostVars: 5,
      hostBindings: function Avatar_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("aria-label", ctx.ariaLabel())("aria-labelledby", ctx.ariaLabelledBy())("data-p", ctx.dataP());
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        label: [1, "label"],
        icon: [1, "icon"],
        image: [1, "image"],
        size: [1, "size"],
        shape: [1, "shape"],
        ariaLabel: [1, "ariaLabel"],
        ariaLabelledBy: [1, "ariaLabelledBy"]
      },
      outputs: {
        onImageError: "onImageError"
      },
      features: [\u0275\u0275ProvidersFeature([AvatarStyle, { provide: AVATAR_INSTANCE, useExisting: _Avatar }, { provide: PARENT_INSTANCE, useExisting: _Avatar }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c0,
      decls: 4,
      vars: 1,
      consts: [[3, "pBind", "class"], [3, "pBind", "src"], [3, "pBind"], [3, "error", "pBind", "src"]],
      template: function Avatar_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275projection(0);
          \u0275\u0275conditionalCreate(1, Avatar_Conditional_1_Template, 2, 5, "span", 0)(2, Avatar_Conditional_2_Template, 1, 4, "span", 0)(3, Avatar_Conditional_3_Template, 1, 4, "img", 1);
        }
        if (rf & 2) {
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.label() ? 1 : ctx.icon() ? 2 : ctx.image() ? 3 : -1);
        }
      },
      dependencies: [SharedModule, Bind],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Avatar, [{
    type: Component,
    args: [{
      selector: "p-avatar",
      standalone: true,
      imports: [SharedModule, Bind],
      template: `
        <ng-content></ng-content>
        @if (label()) {
            <span [pBind]="ptm('label')" [class]="cx('label')" [attr.data-p]="dataP()">{{ label() }}</span>
        } @else if (icon()) {
            <span [pBind]="ptm('icon')" [class]="cn(cx('icon'), icon())" [attr.data-p]="dataP()"></span>
        } @else if (image()) {
            <img [pBind]="ptm('image')" [src]="image()" (error)="imageError($event)" [attr.aria-label]="ariaLabel()" [attr.data-p]="dataP()" />
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cx('root')",
        "[attr.aria-label]": "ariaLabel()",
        "[attr.aria-labelledby]": "ariaLabelledBy()",
        "[attr.data-p]": "dataP()"
      },
      providers: [AvatarStyle, { provide: AVATAR_INSTANCE, useExisting: Avatar }, { provide: PARENT_INSTANCE, useExisting: Avatar }],
      hostDirectives: [Bind]
    }]
  }], null, { label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], icon: [{ type: Input, args: [{ isSignal: true, alias: "icon", required: false }] }], image: [{ type: Input, args: [{ isSignal: true, alias: "image", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], shape: [{ type: Input, args: [{ isSignal: true, alias: "shape", required: false }] }], ariaLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], ariaLabelledBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabelledBy", required: false }] }], onImageError: [{ type: Output, args: ["onImageError"] }] });
})();
var AvatarModule = class _AvatarModule {
  static \u0275fac = function AvatarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AvatarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _AvatarModule,
    imports: [Avatar, SharedModule],
    exports: [Avatar, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Avatar, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AvatarModule, [{
    type: NgModule,
    args: [{
      imports: [Avatar, SharedModule],
      exports: [Avatar, SharedModule]
    }]
  }], null, null);
})();

// src/app/shared/ui/language-switcher.ts
var LanguageSwitcher = class _LanguageSwitcher {
  language = inject(Language);
  static \u0275fac = function LanguageSwitcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LanguageSwitcher)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LanguageSwitcher, selectors: [["app-language-switcher"]], decls: 2, vars: 5, consts: [["icon", "pi pi-globe", "size", "small", "severity", "secondary", 1, "language-switcher", 3, "onClick", "label", "text", "ariaLabel"]], template: function LanguageSwitcher_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p-button", 0);
      \u0275\u0275pipe(1, "transloco");
      \u0275\u0275listener("onClick", function LanguageSwitcher_Template_p_button_onClick_0_listener() {
        return ctx.language.use(ctx.language.other());
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("label", ctx.language.other().toUpperCase())("text", true)("ariaLabel", \u0275\u0275pipeBind1(1, 3, "app.languages." + ctx.language.other()));
    }
  }, dependencies: [Button, TranslocoPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LanguageSwitcher, [{
    type: Component,
    args: [{
      selector: "app-language-switcher",
      imports: [Button, TranslocoPipe],
      template: `
    <p-button
      class="language-switcher"
      [label]="language.other().toUpperCase()"
      icon="pi pi-globe"
      [text]="true"
      size="small"
      severity="secondary"
      [ariaLabel]="'app.languages.' + language.other() | transloco"
      (onClick)="language.use(language.other())"
    />
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LanguageSwitcher, { className: "LanguageSwitcher", filePath: "src/app/shared/ui/language-switcher.ts", lineNumber: 23 });
})();

export {
  Avatar,
  LanguageSwitcher
};
//# debugId=7e9845c7-ad20-55e1-8111-d1823866e503
//# sourceMappingURL=chunk-O2RYECN5.js.map
