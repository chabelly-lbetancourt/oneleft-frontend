import {
  Session
} from "./chunk-VB7O3OGR.js";
import "./chunk-YAIMRQ77.js";
import "./chunk-7DJCIE3I.js";
import {
  ApproximateLocation,
  BaseEditableHolder,
  Check,
  ChevronDown,
  FormsModule,
  IconField,
  InputIcon,
  InputText,
  LocationError,
  MEETING_POINT_DECIMALS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgControlStatus,
  NgModel,
  ObjectUtils,
  Overlay,
  Scroller,
  Search,
  SelectButton,
  Tooltip
} from "./chunk-B4F4B5X4.js";
import {
  Tag
} from "./chunk-QCHEEBAT.js";
import {
  Language
} from "./chunk-R55RQCVH.js";
import {
  PlansApi,
  nearbyParams
} from "./chunk-AUD3WDZT.js";
import {
  spotsKey,
  startsIn
} from "./chunk-2ZDUKJAI.js";
import {
  Message,
  Times
} from "./chunk-A62MHWYD.js";
import {
  ACTIVITIES,
  AutoFocus,
  BaseComponent,
  Bind,
  BindModule,
  Button,
  CoreIcon,
  DomHandler,
  Fluid,
  ICON_TEMPLATE,
  PARENT_INSTANCE,
  activityKey,
  activityOf,
  s,
  unblockBodyScroll
} from "./chunk-QAKVLXKK.js";
import {
  A,
  BaseStyle,
  Bt,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  FilterService,
  Footer,
  Header,
  Injectable,
  InjectionToken,
  Input,
  J,
  NgModule,
  NgTemplateOutlet,
  Observable,
  Ot,
  Output,
  OverlayService,
  R,
  Router,
  RouterLink,
  SharedModule,
  TranslationKeys,
  TranslocoPipe,
  TranslocoService,
  ViewChild,
  ViewEncapsulation,
  _,
  afterNextRender,
  b,
  booleanAttribute,
  computed,
  contentChild,
  d,
  effect,
  et,
  forwardRef,
  httpResource,
  inject,
  input,
  kt,
  l,
  linkedSignal,
  model,
  numberAttribute,
  output,
  setClassMetadata,
  signal,
  toSignal,
  untracked,
  viewChild,
  x2 as x,
  z,
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
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FDMHZOCR.js";

// node_modules/leaflet/dist/leaflet-src.js
var require_leaflet_src = __commonJS({
  "node_modules/leaflet/dist/leaflet-src.js"(exports, module) {
    /* @preserve
     * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
     * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
     */
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.leaflet = {}));
    })(exports, (function(exports2) {
      "use strict";
      var version = "1.9.4";
      function extend(dest) {
        var i, j, len, src;
        for (j = 1, len = arguments.length; j < len; j++) {
          src = arguments[j];
          for (i in src) {
            dest[i] = src[i];
          }
        }
        return dest;
      }
      var create$2 = Object.create || /* @__PURE__ */ (function() {
        function F() {
        }
        return function(proto) {
          F.prototype = proto;
          return new F();
        };
      })();
      function bind(fn, obj) {
        var slice = Array.prototype.slice;
        if (fn.bind) {
          return fn.bind.apply(fn, slice.call(arguments, 1));
        }
        var args = slice.call(arguments, 2);
        return function() {
          return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
      }
      var lastId = 0;
      function stamp(obj) {
        if (!("_leaflet_id" in obj)) {
          obj["_leaflet_id"] = ++lastId;
        }
        return obj._leaflet_id;
      }
      function throttle(fn, time, context) {
        var lock, args, wrapperFn, later;
        later = function() {
          lock = false;
          if (args) {
            wrapperFn.apply(context, args);
            args = false;
          }
        };
        wrapperFn = function() {
          if (lock) {
            args = arguments;
          } else {
            fn.apply(context, arguments);
            setTimeout(later, time);
            lock = true;
          }
        };
        return wrapperFn;
      }
      function wrapNum(x2, range, includeMax) {
        var max = range[1], min = range[0], d2 = max - min;
        return x2 === max && includeMax ? x2 : ((x2 - min) % d2 + d2) % d2 + min;
      }
      function falseFn() {
        return false;
      }
      function formatNum(num, precision) {
        if (precision === false) {
          return num;
        }
        var pow = Math.pow(10, precision === void 0 ? 6 : precision);
        return Math.round(num * pow) / pow;
      }
      function trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
      }
      function splitWords(str) {
        return trim(str).split(/\s+/);
      }
      function setOptions(obj, options) {
        if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
          obj.options = obj.options ? create$2(obj.options) : {};
        }
        for (var i in options) {
          obj.options[i] = options[i];
        }
        return obj.options;
      }
      function getParamString(obj, existingUrl, uppercase) {
        var params = [];
        for (var i in obj) {
          params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
        }
        return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
      }
      var templateRe = /\{ *([\w_ -]+) *\}/g;
      function template(str, data) {
        return str.replace(templateRe, function(str2, key) {
          var value = data[key];
          if (value === void 0) {
            throw new Error("No value provided for variable " + str2);
          } else if (typeof value === "function") {
            value = value(data);
          }
          return value;
        });
      }
      var isArray = Array.isArray || function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
      };
      function indexOf(array, el) {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === el) {
            return i;
          }
        }
        return -1;
      }
      var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function getPrefixed(name) {
        return window["webkit" + name] || window["moz" + name] || window["ms" + name];
      }
      var lastTime = 0;
      function timeoutDefer(fn) {
        var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
        lastTime = time + timeToCall;
        return window.setTimeout(fn, timeToCall);
      }
      var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
      var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
        window.clearTimeout(id);
      };
      function requestAnimFrame(fn, context, immediate) {
        if (immediate && requestFn === timeoutDefer) {
          fn.call(context);
        } else {
          return requestFn.call(window, bind(fn, context));
        }
      }
      function cancelAnimFrame(id) {
        if (id) {
          cancelFn.call(window, id);
        }
      }
      var Util = {
        __proto__: null,
        extend,
        create: create$2,
        bind,
        get lastId() {
          return lastId;
        },
        stamp,
        throttle,
        wrapNum,
        falseFn,
        formatNum,
        trim,
        splitWords,
        setOptions,
        getParamString,
        template,
        isArray,
        indexOf,
        emptyImageUrl,
        requestFn,
        cancelFn,
        requestAnimFrame,
        cancelAnimFrame
      };
      function Class() {
      }
      Class.extend = function(props) {
        var NewClass = function() {
          setOptions(this);
          if (this.initialize) {
            this.initialize.apply(this, arguments);
          }
          this.callInitHooks();
        };
        var parentProto = NewClass.__super__ = this.prototype;
        var proto = create$2(parentProto);
        proto.constructor = NewClass;
        NewClass.prototype = proto;
        for (var i in this) {
          if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") {
            NewClass[i] = this[i];
          }
        }
        if (props.statics) {
          extend(NewClass, props.statics);
        }
        if (props.includes) {
          checkDeprecatedMixinEvents(props.includes);
          extend.apply(null, [proto].concat(props.includes));
        }
        extend(proto, props);
        delete proto.statics;
        delete proto.includes;
        if (proto.options) {
          proto.options = parentProto.options ? create$2(parentProto.options) : {};
          extend(proto.options, props.options);
        }
        proto._initHooks = [];
        proto.callInitHooks = function() {
          if (this._initHooksCalled) {
            return;
          }
          if (parentProto.callInitHooks) {
            parentProto.callInitHooks.call(this);
          }
          this._initHooksCalled = true;
          for (var i2 = 0, len = proto._initHooks.length; i2 < len; i2++) {
            proto._initHooks[i2].call(this);
          }
        };
        return NewClass;
      };
      Class.include = function(props) {
        var parentOptions = this.prototype.options;
        extend(this.prototype, props);
        if (props.options) {
          this.prototype.options = parentOptions;
          this.mergeOptions(props.options);
        }
        return this;
      };
      Class.mergeOptions = function(options) {
        extend(this.prototype.options, options);
        return this;
      };
      Class.addInitHook = function(fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        var init = typeof fn === "function" ? fn : function() {
          this[fn].apply(this, args);
        };
        this.prototype._initHooks = this.prototype._initHooks || [];
        this.prototype._initHooks.push(init);
        return this;
      };
      function checkDeprecatedMixinEvents(includes) {
        if (typeof L === "undefined" || !L || !L.Mixin) {
          return;
        }
        includes = isArray(includes) ? includes : [includes];
        for (var i = 0; i < includes.length; i++) {
          if (includes[i] === L.Mixin.Events) {
            console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
          }
        }
      }
      var Events = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              this._on(type, types[type], fn);
            }
          } else {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
              this._on(types[i], fn, context);
            }
          }
          return this;
        },
        /* @method off(type: String, fn?: Function, context?: Object): this
         * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
         *
         * @alternative
         * @method off(eventMap: Object): this
         * Removes a set of type/listener pairs.
         *
         * @alternative
         * @method off: this
         * Removes all listeners to all events on the object. This includes implicitly attached events.
         */
        off: function(types, fn, context) {
          if (!arguments.length) {
            delete this._events;
          } else if (typeof types === "object") {
            for (var type in types) {
              this._off(type, types[type], fn);
            }
          } else {
            types = splitWords(types);
            var removeAll = arguments.length === 1;
            for (var i = 0, len = types.length; i < len; i++) {
              if (removeAll) {
                this._off(types[i]);
              } else {
                this._off(types[i], fn, context);
              }
            }
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(type, fn, context, _once) {
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          if (this._listens(type, fn, context) !== false) {
            return;
          }
          if (context === this) {
            context = void 0;
          }
          var newListener = { fn, ctx: context };
          if (_once) {
            newListener.once = true;
          }
          this._events = this._events || {};
          this._events[type] = this._events[type] || [];
          this._events[type].push(newListener);
        },
        _off: function(type, fn, context) {
          var listeners, i, len;
          if (!this._events) {
            return;
          }
          listeners = this._events[type];
          if (!listeners) {
            return;
          }
          if (arguments.length === 1) {
            if (this._firingCount) {
              for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].fn = falseFn;
              }
            }
            delete this._events[type];
            return;
          }
          if (typeof fn !== "function") {
            console.warn("wrong listener type: " + typeof fn);
            return;
          }
          var index2 = this._listens(type, fn, context);
          if (index2 !== false) {
            var listener = listeners[index2];
            if (this._firingCount) {
              listener.fn = falseFn;
              this._events[type] = listeners = listeners.slice();
            }
            listeners.splice(index2, 1);
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(type, data, propagate) {
          if (!this.listens(type, propagate)) {
            return this;
          }
          var event = extend({}, data, {
            type,
            target: this,
            sourceTarget: data && data.sourceTarget || this
          });
          if (this._events) {
            var listeners = this._events[type];
            if (listeners) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var i = 0, len = listeners.length; i < len; i++) {
                var l2 = listeners[i];
                var fn = l2.fn;
                if (l2.once) {
                  this.off(type, fn, l2.ctx);
                }
                fn.call(l2.ctx || this, event);
              }
              this._firingCount--;
            }
          }
          if (propagate) {
            this._propagateEvent(event);
          }
          return this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(type, fn, context, propagate) {
          if (typeof type !== "string") {
            console.warn('"string" type argument expected');
          }
          var _fn = fn;
          if (typeof fn !== "function") {
            propagate = !!fn;
            _fn = void 0;
            context = void 0;
          }
          var listeners = this._events && this._events[type];
          if (listeners && listeners.length) {
            if (this._listens(type, _fn, context) !== false) {
              return true;
            }
          }
          if (propagate) {
            for (var id in this._eventParents) {
              if (this._eventParents[id].listens(type, fn, context, propagate)) {
                return true;
              }
            }
          }
          return false;
        },
        // returns the index (number) or false
        _listens: function(type, fn, context) {
          if (!this._events) {
            return false;
          }
          var listeners = this._events[type] || [];
          if (!fn) {
            return !!listeners.length;
          }
          if (context === this) {
            context = void 0;
          }
          for (var i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i].fn === fn && listeners[i].ctx === context) {
              return i;
            }
          }
          return false;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(types, fn, context) {
          if (typeof types === "object") {
            for (var type in types) {
              this._on(type, types[type], fn, true);
            }
          } else {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
              this._on(types[i], fn, context, true);
            }
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(obj) {
          this._eventParents = this._eventParents || {};
          this._eventParents[stamp(obj)] = obj;
          return this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(obj) {
          if (this._eventParents) {
            delete this._eventParents[stamp(obj)];
          }
          return this;
        },
        _propagateEvent: function(e3) {
          for (var id in this._eventParents) {
            this._eventParents[id].fire(e3.type, extend({
              layer: e3.target,
              propagatedFrom: e3.target
            }, e3), true);
          }
        }
      };
      Events.addEventListener = Events.on;
      Events.removeEventListener = Events.clearAllEventListeners = Events.off;
      Events.addOneTimeEventListener = Events.once;
      Events.fireEvent = Events.fire;
      Events.hasEventListeners = Events.listens;
      var Evented = Class.extend(Events);
      function Point(x2, y, round) {
        this.x = round ? Math.round(x2) : x2;
        this.y = round ? Math.round(y) : y;
      }
      var trunc = Math.trunc || function(v) {
        return v > 0 ? Math.floor(v) : Math.ceil(v);
      };
      Point.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new Point(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(point) {
          return this.clone()._add(toPoint(point));
        },
        _add: function(point) {
          this.x += point.x;
          this.y += point.y;
          return this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(point) {
          return this.clone()._subtract(toPoint(point));
        },
        _subtract: function(point) {
          this.x -= point.x;
          this.y -= point.y;
          return this;
        },
        // @method divideBy(num: Number): Point
        // Returns the result of division of the current point by the given number.
        divideBy: function(num) {
          return this.clone()._divideBy(num);
        },
        _divideBy: function(num) {
          this.x /= num;
          this.y /= num;
          return this;
        },
        // @method multiplyBy(num: Number): Point
        // Returns the result of multiplication of the current point by the given number.
        multiplyBy: function(num) {
          return this.clone()._multiplyBy(num);
        },
        _multiplyBy: function(num) {
          this.x *= num;
          this.y *= num;
          return this;
        },
        // @method scaleBy(scale: Point): Point
        // Multiply each coordinate of the current point by each coordinate of
        // `scale`. In linear algebra terms, multiply the point by the
        // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
        // defined by `scale`.
        scaleBy: function(point) {
          return new Point(this.x * point.x, this.y * point.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(point) {
          return new Point(this.x / point.x, this.y / point.y);
        },
        // @method round(): Point
        // Returns a copy of the current point with rounded coordinates.
        round: function() {
          return this.clone()._round();
        },
        _round: function() {
          this.x = Math.round(this.x);
          this.y = Math.round(this.y);
          return this;
        },
        // @method floor(): Point
        // Returns a copy of the current point with floored coordinates (rounded down).
        floor: function() {
          return this.clone()._floor();
        },
        _floor: function() {
          this.x = Math.floor(this.x);
          this.y = Math.floor(this.y);
          return this;
        },
        // @method ceil(): Point
        // Returns a copy of the current point with ceiled coordinates (rounded up).
        ceil: function() {
          return this.clone()._ceil();
        },
        _ceil: function() {
          this.x = Math.ceil(this.x);
          this.y = Math.ceil(this.y);
          return this;
        },
        // @method trunc(): Point
        // Returns a copy of the current point with truncated coordinates (rounded towards zero).
        trunc: function() {
          return this.clone()._trunc();
        },
        _trunc: function() {
          this.x = trunc(this.x);
          this.y = trunc(this.y);
          return this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(point) {
          point = toPoint(point);
          var x2 = point.x - this.x, y = point.y - this.y;
          return Math.sqrt(x2 * x2 + y * y);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(point) {
          point = toPoint(point);
          return point.x === this.x && point.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(point) {
          point = toPoint(point);
          return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
        }
      };
      function toPoint(x2, y, round) {
        if (x2 instanceof Point) {
          return x2;
        }
        if (isArray(x2)) {
          return new Point(x2[0], x2[1]);
        }
        if (x2 === void 0 || x2 === null) {
          return x2;
        }
        if (typeof x2 === "object" && "x" in x2 && "y" in x2) {
          return new Point(x2.x, x2.y);
        }
        return new Point(x2, y, round);
      }
      function Bounds(a, b2) {
        if (!a) {
          return;
        }
        var points = b2 ? [a, b2] : a;
        for (var i = 0, len = points.length; i < len; i++) {
          this.extend(points[i]);
        }
      }
      Bounds.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var min2, max2;
          if (!obj) {
            return this;
          }
          if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) {
            min2 = max2 = toPoint(obj);
          } else {
            obj = toBounds(obj);
            min2 = obj.min;
            max2 = obj.max;
            if (!min2 || !max2) {
              return this;
            }
          }
          if (!this.min && !this.max) {
            this.min = min2.clone();
            this.max = max2.clone();
          } else {
            this.min.x = Math.min(min2.x, this.min.x);
            this.max.x = Math.max(max2.x, this.max.x);
            this.min.y = Math.min(min2.y, this.min.y);
            this.max.y = Math.max(max2.y, this.max.y);
          }
          return this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(round) {
          return toPoint(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            round
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return toPoint(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return toPoint(this.max.x, this.min.y);
        },
        // @method getTopLeft(): Point
        // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
        getTopLeft: function() {
          return this.min;
        },
        // @method getBottomRight(): Point
        // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
        getBottomRight: function() {
          return this.max;
        },
        // @method getSize(): Point
        // Returns the size of the given bounds
        getSize: function() {
          return this.max.subtract(this.min);
        },
        // @method contains(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains(point: Point): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          var min, max;
          if (typeof obj[0] === "number" || obj instanceof Point) {
            obj = toPoint(obj);
          } else {
            obj = toBounds(obj);
          }
          if (obj instanceof Bounds) {
            min = obj.min;
            max = obj.max;
          } else {
            min = max = obj;
          }
          return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toBounds(bounds);
          var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
          return xIntersects && yIntersects;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toBounds(bounds);
          var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
          return xOverlaps && yOverlaps;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this.min && this.max);
        },
        // @method pad(bufferRatio: Number): Bounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
          return toBounds(
            toPoint(min.x - heightBuffer, min.y - widthBuffer),
            toPoint(max.x + heightBuffer, max.y + widthBuffer)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(bounds) {
          if (!bounds) {
            return false;
          }
          bounds = toBounds(bounds);
          return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
        }
      };
      function toBounds(a, b2) {
        if (!a || a instanceof Bounds) {
          return a;
        }
        return new Bounds(a, b2);
      }
      function LatLngBounds(corner1, corner2) {
        if (!corner1) {
          return;
        }
        var latlngs = corner2 ? [corner1, corner2] : corner1;
        for (var i = 0, len = latlngs.length; i < len; i++) {
          this.extend(latlngs[i]);
        }
      }
      LatLngBounds.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(obj) {
          var sw = this._southWest, ne = this._northEast, sw2, ne2;
          if (obj instanceof LatLng) {
            sw2 = obj;
            ne2 = obj;
          } else if (obj instanceof LatLngBounds) {
            sw2 = obj._southWest;
            ne2 = obj._northEast;
            if (!sw2 || !ne2) {
              return this;
            }
          } else {
            return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
          }
          if (!sw && !ne) {
            this._southWest = new LatLng(sw2.lat, sw2.lng);
            this._northEast = new LatLng(ne2.lat, ne2.lng);
          } else {
            sw.lat = Math.min(sw2.lat, sw.lat);
            sw.lng = Math.min(sw2.lng, sw.lng);
            ne.lat = Math.max(ne2.lat, ne.lat);
            ne.lng = Math.max(ne2.lng, ne.lng);
          }
          return this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(bufferRatio) {
          var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
          return new LatLngBounds(
            new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
            new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new LatLng(
            (this._southWest.lat + this._northEast.lat) / 2,
            (this._southWest.lng + this._northEast.lng) / 2
          );
        },
        // @method getSouthWest(): LatLng
        // Returns the south-west point of the bounds.
        getSouthWest: function() {
          return this._southWest;
        },
        // @method getNorthEast(): LatLng
        // Returns the north-east point of the bounds.
        getNorthEast: function() {
          return this._northEast;
        },
        // @method getNorthWest(): LatLng
        // Returns the north-west point of the bounds.
        getNorthWest: function() {
          return new LatLng(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new LatLng(this.getSouth(), this.getEast());
        },
        // @method getWest(): Number
        // Returns the west longitude of the bounds
        getWest: function() {
          return this._southWest.lng;
        },
        // @method getSouth(): Number
        // Returns the south latitude of the bounds
        getSouth: function() {
          return this._southWest.lat;
        },
        // @method getEast(): Number
        // Returns the east longitude of the bounds
        getEast: function() {
          return this._northEast.lng;
        },
        // @method getNorth(): Number
        // Returns the north latitude of the bounds
        getNorth: function() {
          return this._northEast.lat;
        },
        // @method contains(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains (latlng: LatLng): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(obj) {
          if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) {
            obj = toLatLng(obj);
          } else {
            obj = toLatLngBounds(obj);
          }
          var sw = this._southWest, ne = this._northEast, sw2, ne2;
          if (obj instanceof LatLngBounds) {
            sw2 = obj.getSouthWest();
            ne2 = obj.getNorthEast();
          } else {
            sw2 = ne2 = obj;
          }
          return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
          return latIntersects && lngIntersects;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(bounds) {
          bounds = toLatLngBounds(bounds);
          var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
          return latOverlaps && lngOverlaps;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(bounds, maxMargin) {
          if (!bounds) {
            return false;
          }
          bounds = toLatLngBounds(bounds);
          return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function toLatLngBounds(a, b2) {
        if (a instanceof LatLngBounds) {
          return a;
        }
        return new LatLngBounds(a, b2);
      }
      function LatLng(lat, lng, alt) {
        if (isNaN(lat) || isNaN(lng)) {
          throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
        }
        this.lat = +lat;
        this.lng = +lng;
        if (alt !== void 0) {
          this.alt = +alt;
        }
      }
      LatLng.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(obj, maxMargin) {
          if (!obj) {
            return false;
          }
          obj = toLatLng(obj);
          var margin = Math.max(
            Math.abs(this.lat - obj.lat),
            Math.abs(this.lng - obj.lng)
          );
          return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(precision) {
          return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(other) {
          return Earth.distance(this, toLatLng(other));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Earth.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(sizeInMeters) {
          var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
          return toLatLngBounds(
            [this.lat - latAccuracy, this.lng - lngAccuracy],
            [this.lat + latAccuracy, this.lng + lngAccuracy]
          );
        },
        clone: function() {
          return new LatLng(this.lat, this.lng, this.alt);
        }
      };
      function toLatLng(a, b2, c) {
        if (a instanceof LatLng) {
          return a;
        }
        if (isArray(a) && typeof a[0] !== "object") {
          if (a.length === 3) {
            return new LatLng(a[0], a[1], a[2]);
          }
          if (a.length === 2) {
            return new LatLng(a[0], a[1]);
          }
          return null;
        }
        if (a === void 0 || a === null) {
          return a;
        }
        if (typeof a === "object" && "lat" in a) {
          return new LatLng(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
        }
        if (b2 === void 0) {
          return null;
        }
        return new LatLng(a, b2, c);
      }
      var CRS = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(latlng, zoom2) {
          var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
          return this.transformation._transform(projectedPoint, scale2);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(point, zoom2) {
          var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
          return this.projection.unproject(untransformedPoint);
        },
        // @method project(latlng: LatLng): Point
        // Projects geographical coordinates into coordinates in units accepted for
        // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
        project: function(latlng) {
          return this.projection.project(latlng);
        },
        // @method unproject(point: Point): LatLng
        // Given a projected coordinate returns the corresponding LatLng.
        // The inverse of `project`.
        unproject: function(point) {
          return this.projection.unproject(point);
        },
        // @method scale(zoom: Number): Number
        // Returns the scale used when transforming projected coordinates into
        // pixel coordinates for a particular zoom. For example, it returns
        // `256 * 2^zoom` for Mercator-based CRS.
        scale: function(zoom2) {
          return 256 * Math.pow(2, zoom2);
        },
        // @method zoom(scale: Number): Number
        // Inverse of `scale()`, returns the zoom level corresponding to a scale
        // factor of `scale`.
        zoom: function(scale2) {
          return Math.log(scale2 / 256) / Math.LN2;
        },
        // @method getProjectedBounds(zoom: Number): Bounds
        // Returns the projection's bounds scaled and transformed for the provided `zoom`.
        getProjectedBounds: function(zoom2) {
          if (this.infinite) {
            return null;
          }
          var b2 = this.projection.bounds, s2 = this.scale(zoom2), min = this.transformation.transform(b2.min, s2), max = this.transformation.transform(b2.max, s2);
          return new Bounds(min, max);
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates.
        // @property code: String
        // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
        //
        // @property wrapLng: Number[]
        // An array of two numbers defining whether the longitude (horizontal) coordinate
        // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
        // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
        //
        // @property wrapLat: Number[]
        // Like `wrapLng`, but for the latitude (vertical) axis.
        // wrapLng: [min, max],
        // wrapLat: [min, max],
        // @property infinite: Boolean
        // If true, the coordinate space will be unbounded (infinite in both axes)
        infinite: false,
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where lat and lng has been wrapped according to the
        // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
        wrapLatLng: function(latlng) {
          var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
          return new LatLng(lat, lng, alt);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(bounds) {
          var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
          if (latShift === 0 && lngShift === 0) {
            return bounds;
          }
          var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);
          return new LatLngBounds(newSw, newNe);
        }
      };
      var Earth = extend({}, CRS, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(latlng1, latlng2) {
          var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return this.R * c;
        }
      });
      var earthRadius = 6378137;
      var SphericalMercator = {
        R: earthRadius,
        MAX_LATITUDE: 85.0511287798,
        project: function(latlng) {
          var d2 = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d2);
          return new Point(
            this.R * latlng.lng * d2,
            this.R * Math.log((1 + sin) / (1 - sin)) / 2
          );
        },
        unproject: function(point) {
          var d2 = 180 / Math.PI;
          return new LatLng(
            (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d2,
            point.x * d2 / this.R
          );
        },
        bounds: (function() {
          var d2 = earthRadius * Math.PI;
          return new Bounds([-d2, -d2], [d2, d2]);
        })()
      };
      function Transformation(a, b2, c, d2) {
        if (isArray(a)) {
          this._a = a[0];
          this._b = a[1];
          this._c = a[2];
          this._d = a[3];
          return;
        }
        this._a = a;
        this._b = b2;
        this._c = c;
        this._d = d2;
      }
      Transformation.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function(point, scale2) {
          return this._transform(point.clone(), scale2);
        },
        // destructive transform (faster)
        _transform: function(point, scale2) {
          scale2 = scale2 || 1;
          point.x = scale2 * (this._a * point.x + this._b);
          point.y = scale2 * (this._c * point.y + this._d);
          return point;
        },
        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function(point, scale2) {
          scale2 = scale2 || 1;
          return new Point(
            (point.x / scale2 - this._b) / this._a,
            (point.y / scale2 - this._d) / this._c
          );
        }
      };
      function toTransformation(a, b2, c, d2) {
        return new Transformation(a, b2, c, d2);
      }
      var EPSG3857 = extend({}, Earth, {
        code: "EPSG:3857",
        projection: SphericalMercator,
        transformation: (function() {
          var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        })()
      });
      var EPSG900913 = extend({}, EPSG3857, {
        code: "EPSG:900913"
      });
      function svgCreate(name) {
        return document.createElementNS("http://www.w3.org/2000/svg", name);
      }
      function pointsToPath(rings, closed) {
        var str = "", i, j, len, len2, points, p;
        for (i = 0, len = rings.length; i < len; i++) {
          points = rings[i];
          for (j = 0, len2 = points.length; j < len2; j++) {
            p = points[j];
            str += (j ? "L" : "M") + p.x + " " + p.y;
          }
          str += closed ? Browser.svg ? "z" : "x" : "";
        }
        return str || "M0 0";
      }
      var style4 = document.documentElement.style;
      var ie = "ActiveXObject" in window;
      var ielt9 = ie && !document.addEventListener;
      var edge = "msLaunchUri" in navigator && !("documentMode" in document);
      var webkit = userAgentContains("webkit");
      var android = userAgentContains("android");
      var android23 = userAgentContains("android 2") || userAgentContains("android 3");
      var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
      var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
      var opera = !!window.opera;
      var chrome = !edge && userAgentContains("chrome");
      var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
      var safari = !chrome && userAgentContains("safari");
      var phantom = userAgentContains("phantom");
      var opera12 = "OTransition" in style4;
      var win = navigator.platform.indexOf("Win") === 0;
      var ie3d = ie && "transition" in style4;
      var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
      var gecko3d = "MozPerspective" in style4;
      var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
      var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
      var mobileWebkit = mobile && webkit;
      var mobileWebkit3d = mobile && webkit3d;
      var msPointer = !window.PointerEvent && window.MSPointerEvent;
      var pointer = !!(window.PointerEvent || msPointer);
      var touchNative = "ontouchstart" in window || !!window.TouchEvent;
      var touch = !window.L_NO_TOUCH && (touchNative || pointer);
      var mobileOpera = mobile && opera;
      var mobileGecko = mobile && gecko;
      var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
      var passiveEvents = (function() {
        var supportsPassiveOption = false;
        try {
          var opts = Object.defineProperty({}, "passive", {
            get: function() {
              supportsPassiveOption = true;
            }
          });
          window.addEventListener("testPassiveEventSupport", falseFn, opts);
          window.removeEventListener("testPassiveEventSupport", falseFn, opts);
        } catch (e3) {
        }
        return supportsPassiveOption;
      })();
      var canvas$1 = (function() {
        return !!document.createElement("canvas").getContext;
      })();
      var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
      var inlineSvg = !!svg$1 && (function() {
        var div = document.createElement("div");
        div.innerHTML = "<svg/>";
        return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })();
      var vml = !svg$1 && (function() {
        try {
          var div = document.createElement("div");
          div.innerHTML = '<v:shape adj="1"/>';
          var shape = div.firstChild;
          shape.style.behavior = "url(#default#VML)";
          return shape && typeof shape.adj === "object";
        } catch (e3) {
          return false;
        }
      })();
      var mac = navigator.platform.indexOf("Mac") === 0;
      var linux = navigator.platform.indexOf("Linux") === 0;
      function userAgentContains(str) {
        return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
      }
      var Browser = {
        ie,
        ielt9,
        edge,
        webkit,
        android,
        android23,
        androidStock,
        opera,
        chrome,
        gecko,
        safari,
        phantom,
        opera12,
        win,
        ie3d,
        webkit3d,
        gecko3d,
        any3d,
        mobile,
        mobileWebkit,
        mobileWebkit3d,
        msPointer,
        pointer,
        touch,
        touchNative,
        mobileOpera,
        mobileGecko,
        retina,
        passiveEvents,
        canvas: canvas$1,
        svg: svg$1,
        vml,
        inlineSvg,
        mac,
        linux
      };
      var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
      var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
      var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
      var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
      var pEvent = {
        touchstart: POINTER_DOWN,
        touchmove: POINTER_MOVE,
        touchend: POINTER_UP,
        touchcancel: POINTER_CANCEL
      };
      var handle = {
        touchstart: _onPointerStart,
        touchmove: _handlePointer,
        touchend: _handlePointer,
        touchcancel: _handlePointer
      };
      var _pointers = {};
      var _pointerDocListener = false;
      function addPointerListener(obj, type, handler) {
        if (type === "touchstart") {
          _addPointerDocListener();
        }
        if (!handle[type]) {
          console.warn("wrong event specified:", type);
          return falseFn;
        }
        handler = handle[type].bind(this, handler);
        obj.addEventListener(pEvent[type], handler, false);
        return handler;
      }
      function removePointerListener(obj, type, handler) {
        if (!pEvent[type]) {
          console.warn("wrong event specified:", type);
          return;
        }
        obj.removeEventListener(pEvent[type], handler, false);
      }
      function _globalPointerDown(e3) {
        _pointers[e3.pointerId] = e3;
      }
      function _globalPointerMove(e3) {
        if (_pointers[e3.pointerId]) {
          _pointers[e3.pointerId] = e3;
        }
      }
      function _globalPointerUp(e3) {
        delete _pointers[e3.pointerId];
      }
      function _addPointerDocListener() {
        if (!_pointerDocListener) {
          document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
          document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
          document.addEventListener(POINTER_UP, _globalPointerUp, true);
          document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
          _pointerDocListener = true;
        }
      }
      function _handlePointer(handler, e3) {
        if (e3.pointerType === (e3.MSPOINTER_TYPE_MOUSE || "mouse")) {
          return;
        }
        e3.touches = [];
        for (var i in _pointers) {
          e3.touches.push(_pointers[i]);
        }
        e3.changedTouches = [e3];
        handler(e3);
      }
      function _onPointerStart(handler, e3) {
        if (e3.MSPOINTER_TYPE_TOUCH && e3.pointerType === e3.MSPOINTER_TYPE_TOUCH) {
          preventDefault(e3);
        }
        _handlePointer(handler, e3);
      }
      function makeDblclick(event) {
        var newEvent = {}, prop, i;
        for (i in event) {
          prop = event[i];
          newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
        }
        event = newEvent;
        newEvent.type = "dblclick";
        newEvent.detail = 2;
        newEvent.isTrusted = false;
        newEvent._simulated = true;
        return newEvent;
      }
      var delay = 200;
      function addDoubleTapListener(obj, handler) {
        obj.addEventListener("dblclick", handler);
        var last = 0, detail;
        function simDblclick(e3) {
          if (e3.detail !== 1) {
            detail = e3.detail;
            return;
          }
          if (e3.pointerType === "mouse" || e3.sourceCapabilities && !e3.sourceCapabilities.firesTouchEvents) {
            return;
          }
          var path = getPropagationPath(e3);
          if (path.some(function(el) {
            return el instanceof HTMLLabelElement && el.attributes.for;
          }) && !path.some(function(el) {
            return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
          })) {
            return;
          }
          var now = Date.now();
          if (now - last <= delay) {
            detail++;
            if (detail === 2) {
              handler(makeDblclick(e3));
            }
          } else {
            detail = 1;
          }
          last = now;
        }
        obj.addEventListener("click", simDblclick);
        return {
          dblclick: handler,
          simDblclick
        };
      }
      function removeDoubleTapListener(obj, handlers) {
        obj.removeEventListener("dblclick", handlers.dblclick);
        obj.removeEventListener("click", handlers.simDblclick);
      }
      var TRANSFORM = testProp(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      );
      var TRANSITION = testProp(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      );
      var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
      function get(id) {
        return typeof id === "string" ? document.getElementById(id) : id;
      }
      function getStyle(el, style5) {
        var value = el.style[style5] || el.currentStyle && el.currentStyle[style5];
        if ((!value || value === "auto") && document.defaultView) {
          var css = document.defaultView.getComputedStyle(el, null);
          value = css ? css[style5] : null;
        }
        return value === "auto" ? null : value;
      }
      function create$1(tagName, className, container) {
        var el = document.createElement(tagName);
        el.className = className || "";
        if (container) {
          container.appendChild(el);
        }
        return el;
      }
      function remove(el) {
        var parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
      }
      function empty(el) {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
      }
      function toFront(el) {
        var parent = el.parentNode;
        if (parent && parent.lastChild !== el) {
          parent.appendChild(el);
        }
      }
      function toBack(el) {
        var parent = el.parentNode;
        if (parent && parent.firstChild !== el) {
          parent.insertBefore(el, parent.firstChild);
        }
      }
      function hasClass(el, name) {
        if (el.classList !== void 0) {
          return el.classList.contains(name);
        }
        var className = getClass(el);
        return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
      }
      function addClass(el, name) {
        if (el.classList !== void 0) {
          var classes4 = splitWords(name);
          for (var i = 0, len = classes4.length; i < len; i++) {
            el.classList.add(classes4[i]);
          }
        } else if (!hasClass(el, name)) {
          var className = getClass(el);
          setClass(el, (className ? className + " " : "") + name);
        }
      }
      function removeClass(el, name) {
        if (el.classList !== void 0) {
          el.classList.remove(name);
        } else {
          setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
        }
      }
      function setClass(el, name) {
        if (el.className.baseVal === void 0) {
          el.className = name;
        } else {
          el.className.baseVal = name;
        }
      }
      function getClass(el) {
        if (el.correspondingElement) {
          el = el.correspondingElement;
        }
        return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
      }
      function setOpacity(el, value) {
        if ("opacity" in el.style) {
          el.style.opacity = value;
        } else if ("filter" in el.style) {
          _setOpacityIE(el, value);
        }
      }
      function _setOpacityIE(el, value) {
        var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
        try {
          filter = el.filters.item(filterName);
        } catch (e3) {
          if (value === 1) {
            return;
          }
        }
        value = Math.round(value * 100);
        if (filter) {
          filter.Enabled = value !== 100;
          filter.Opacity = value;
        } else {
          el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
        }
      }
      function testProp(props) {
        var style5 = document.documentElement.style;
        for (var i = 0; i < props.length; i++) {
          if (props[i] in style5) {
            return props[i];
          }
        }
        return false;
      }
      function setTransform(el, offset, scale2) {
        var pos = offset || new Point(0, 0);
        el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
      }
      function setPosition(el, point) {
        el._leaflet_pos = point;
        if (Browser.any3d) {
          setTransform(el, point);
        } else {
          el.style.left = point.x + "px";
          el.style.top = point.y + "px";
        }
      }
      function getPosition(el) {
        return el._leaflet_pos || new Point(0, 0);
      }
      var disableTextSelection;
      var enableTextSelection;
      var _userSelect;
      if ("onselectstart" in document) {
        disableTextSelection = function() {
          on(window, "selectstart", preventDefault);
        };
        enableTextSelection = function() {
          off(window, "selectstart", preventDefault);
        };
      } else {
        var userSelectProperty = testProp(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        disableTextSelection = function() {
          if (userSelectProperty) {
            var style5 = document.documentElement.style;
            _userSelect = style5[userSelectProperty];
            style5[userSelectProperty] = "none";
          }
        };
        enableTextSelection = function() {
          if (userSelectProperty) {
            document.documentElement.style[userSelectProperty] = _userSelect;
            _userSelect = void 0;
          }
        };
      }
      function disableImageDrag() {
        on(window, "dragstart", preventDefault);
      }
      function enableImageDrag() {
        off(window, "dragstart", preventDefault);
      }
      var _outlineElement, _outlineStyle;
      function preventOutline(element) {
        while (element.tabIndex === -1) {
          element = element.parentNode;
        }
        if (!element.style) {
          return;
        }
        restoreOutline();
        _outlineElement = element;
        _outlineStyle = element.style.outlineStyle;
        element.style.outlineStyle = "none";
        on(window, "keydown", restoreOutline);
      }
      function restoreOutline() {
        if (!_outlineElement) {
          return;
        }
        _outlineElement.style.outlineStyle = _outlineStyle;
        _outlineElement = void 0;
        _outlineStyle = void 0;
        off(window, "keydown", restoreOutline);
      }
      function getSizedParentNode(element) {
        do {
          element = element.parentNode;
        } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
        return element;
      }
      function getScale(element) {
        var rect = element.getBoundingClientRect();
        return {
          x: rect.width / element.offsetWidth || 1,
          y: rect.height / element.offsetHeight || 1,
          boundingClientRect: rect
        };
      }
      var DomUtil = {
        __proto__: null,
        TRANSFORM,
        TRANSITION,
        TRANSITION_END,
        get,
        getStyle,
        create: create$1,
        remove,
        empty,
        toFront,
        toBack,
        hasClass,
        addClass,
        removeClass,
        setClass,
        getClass,
        setOpacity,
        testProp,
        setTransform,
        setPosition,
        getPosition,
        get disableTextSelection() {
          return disableTextSelection;
        },
        get enableTextSelection() {
          return enableTextSelection;
        },
        disableImageDrag,
        enableImageDrag,
        preventOutline,
        restoreOutline,
        getSizedParentNode,
        getScale
      };
      function on(obj, types, fn, context) {
        if (types && typeof types === "object") {
          for (var type in types) {
            addOne(obj, type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          for (var i = 0, len = types.length; i < len; i++) {
            addOne(obj, types[i], fn, context);
          }
        }
        return this;
      }
      var eventsKey = "_leaflet_events";
      function off(obj, types, fn, context) {
        if (arguments.length === 1) {
          batchRemove(obj);
          delete obj[eventsKey];
        } else if (types && typeof types === "object") {
          for (var type in types) {
            removeOne(obj, type, types[type], fn);
          }
        } else {
          types = splitWords(types);
          if (arguments.length === 2) {
            batchRemove(obj, function(type2) {
              return indexOf(types, type2) !== -1;
            });
          } else {
            for (var i = 0, len = types.length; i < len; i++) {
              removeOne(obj, types[i], fn, context);
            }
          }
        }
        return this;
      }
      function batchRemove(obj, filterFn) {
        for (var id in obj[eventsKey]) {
          var type = id.split(/\d/)[0];
          if (!filterFn || filterFn(type)) {
            removeOne(obj, type, null, null, id);
          }
        }
      }
      var mouseSubst = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function addOne(obj, type, fn, context) {
        var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
        if (obj[eventsKey] && obj[eventsKey][id]) {
          return this;
        }
        var handler = function(e3) {
          return fn.call(context || obj, e3 || window.event);
        };
        var originalHandler = handler;
        if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
          handler = addPointerListener(obj, type, handler);
        } else if (Browser.touch && type === "dblclick") {
          handler = addDoubleTapListener(obj, handler);
        } else if ("addEventListener" in obj) {
          if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
            obj.addEventListener(mouseSubst[type] || type, handler, Browser.passiveEvents ? { passive: false } : false);
          } else if (type === "mouseenter" || type === "mouseleave") {
            handler = function(e3) {
              e3 = e3 || window.event;
              if (isExternalTarget(obj, e3)) {
                originalHandler(e3);
              }
            };
            obj.addEventListener(mouseSubst[type], handler, false);
          } else {
            obj.addEventListener(type, originalHandler, false);
          }
        } else {
          obj.attachEvent("on" + type, handler);
        }
        obj[eventsKey] = obj[eventsKey] || {};
        obj[eventsKey][id] = handler;
      }
      function removeOne(obj, type, fn, context, id) {
        id = id || type + stamp(fn) + (context ? "_" + stamp(context) : "");
        var handler = obj[eventsKey] && obj[eventsKey][id];
        if (!handler) {
          return this;
        }
        if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
          removePointerListener(obj, type, handler);
        } else if (Browser.touch && type === "dblclick") {
          removeDoubleTapListener(obj, handler);
        } else if ("removeEventListener" in obj) {
          obj.removeEventListener(mouseSubst[type] || type, handler, false);
        } else {
          obj.detachEvent("on" + type, handler);
        }
        obj[eventsKey][id] = null;
      }
      function stopPropagation(e3) {
        if (e3.stopPropagation) {
          e3.stopPropagation();
        } else if (e3.originalEvent) {
          e3.originalEvent._stopped = true;
        } else {
          e3.cancelBubble = true;
        }
        return this;
      }
      function disableScrollPropagation(el) {
        addOne(el, "wheel", stopPropagation);
        return this;
      }
      function disableClickPropagation(el) {
        on(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
        el["_leaflet_disable_click"] = true;
        return this;
      }
      function preventDefault(e3) {
        if (e3.preventDefault) {
          e3.preventDefault();
        } else {
          e3.returnValue = false;
        }
        return this;
      }
      function stop(e3) {
        preventDefault(e3);
        stopPropagation(e3);
        return this;
      }
      function getPropagationPath(ev) {
        if (ev.composedPath) {
          return ev.composedPath();
        }
        var path = [];
        var el = ev.target;
        while (el) {
          path.push(el);
          el = el.parentNode;
        }
        return path;
      }
      function getMousePosition(e3, container) {
        if (!container) {
          return new Point(e3.clientX, e3.clientY);
        }
        var scale2 = getScale(container), offset = scale2.boundingClientRect;
        return new Point(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (e3.clientX - offset.left) / scale2.x - container.clientLeft,
          (e3.clientY - offset.top) / scale2.y - container.clientTop
        );
      }
      var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function getWheelDelta(e3) {
        return Browser.edge ? e3.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          e3.deltaY && e3.deltaMode === 0 ? -e3.deltaY / wheelPxFactor : (
            // Pixels
            e3.deltaY && e3.deltaMode === 1 ? -e3.deltaY * 20 : (
              // Lines
              e3.deltaY && e3.deltaMode === 2 ? -e3.deltaY * 60 : (
                // Pages
                e3.deltaX || e3.deltaZ ? 0 : (
                  // Skip horizontal/depth wheel events
                  e3.wheelDelta ? (e3.wheelDeltaY || e3.wheelDelta) / 2 : (
                    // Legacy IE pixels
                    e3.detail && Math.abs(e3.detail) < 32765 ? -e3.detail * 20 : (
                      // Legacy Moz lines
                      e3.detail ? e3.detail / -32765 * 60 : (
                        // Legacy Moz pages
                        0
                      )
                    )
                  )
                )
              )
            )
          )
        );
      }
      function isExternalTarget(el, e3) {
        var related = e3.relatedTarget;
        if (!related) {
          return true;
        }
        try {
          while (related && related !== el) {
            related = related.parentNode;
          }
        } catch (err) {
          return false;
        }
        return related !== el;
      }
      var DomEvent = {
        __proto__: null,
        on,
        off,
        stopPropagation,
        disableScrollPropagation,
        disableClickPropagation,
        preventDefault,
        stop,
        getPropagationPath,
        getMousePosition,
        getWheelDelta,
        isExternalTarget,
        addListener: on,
        removeListener: off
      };
      var PosAnimation = Evented.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(el, newPos, duration, easeLinearity) {
          this.stop();
          this._el = el;
          this._inProgress = true;
          this._duration = duration || 0.25;
          this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
          this._startPos = getPosition(el);
          this._offset = newPos.subtract(this._startPos);
          this._startTime = +/* @__PURE__ */ new Date();
          this.fire("start");
          this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          if (!this._inProgress) {
            return;
          }
          this._step(true);
          this._complete();
        },
        _animate: function() {
          this._animId = requestAnimFrame(this._animate, this);
          this._step();
        },
        _step: function(round) {
          var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
          if (elapsed < duration) {
            this._runFrame(this._easeOut(elapsed / duration), round);
          } else {
            this._runFrame(1);
            this._complete();
          }
        },
        _runFrame: function(progress, round) {
          var pos = this._startPos.add(this._offset.multiplyBy(progress));
          if (round) {
            pos._round();
          }
          setPosition(this._el, pos);
          this.fire("step");
        },
        _complete: function() {
          cancelAnimFrame(this._animId);
          this._inProgress = false;
          this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      });
      var Map = Evented.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: EPSG3857,
          // @option center: LatLng = undefined
          // Initial geographic center of the map
          center: void 0,
          // @option zoom: Number = undefined
          // Initial map zoom level
          zoom: void 0,
          // @option minZoom: Number = *
          // Minimum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the lowest of their `minZoom` options will be used instead.
          minZoom: void 0,
          // @option maxZoom: Number = *
          // Maximum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the highest of their `maxZoom` options will be used instead.
          maxZoom: void 0,
          // @option layers: Layer[] = []
          // Array of layers that will be added to the map initially
          layers: [],
          // @option maxBounds: LatLngBounds = null
          // When this option is set, the map restricts the view to the given
          // geographical bounds, bouncing the user back if the user tries to pan
          // outside the view. To set the restriction dynamically, use
          // [`setMaxBounds`](#map-setmaxbounds) method.
          maxBounds: void 0,
          // @option renderer: Renderer = *
          // The default method for drawing vector layers on the map. `L.SVG`
          // or `L.Canvas` by default depending on browser support.
          renderer: void 0,
          // @section Animation Options
          // @option zoomAnimation: Boolean = true
          // Whether the map zoom animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          zoomAnimation: true,
          // @option zoomAnimationThreshold: Number = 4
          // Won't animate zoom if the zoom difference exceeds this value.
          zoomAnimationThreshold: 4,
          // @option fadeAnimation: Boolean = true
          // Whether the tile fade animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          fadeAnimation: true,
          // @option markerZoomAnimation: Boolean = true
          // Whether markers animate their zoom with the zoom animation, if disabled
          // they will disappear for the length of the animation. By default it's
          // enabled in all browsers that support CSS3 Transitions except Android.
          markerZoomAnimation: true,
          // @option transform3DLimit: Number = 2^23
          // Defines the maximum size of a CSS translation transform. The default
          // value should not be changed unless a web browser positions layers in
          // the wrong place after doing a large `panBy`.
          transform3DLimit: 8388608,
          // Precision limit of a 32-bit float
          // @section Interaction Options
          // @option zoomSnap: Number = 1
          // Forces the map's zoom level to always be a multiple of this, particularly
          // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
          // By default, the zoom level snaps to the nearest integer; lower values
          // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
          // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
          zoomSnap: 1,
          // @option zoomDelta: Number = 1
          // Controls how much the map's zoom level will change after a
          // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
          // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
          // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
          zoomDelta: 1,
          // @option trackResize: Boolean = true
          // Whether the map automatically handles browser window resize to update itself.
          trackResize: true
        },
        initialize: function(id, options) {
          options = setOptions(this, options);
          this._handlers = [];
          this._layers = {};
          this._zoomBoundLayers = {};
          this._sizeChanged = true;
          this._initContainer(id);
          this._initLayout();
          this._onResize = bind(this._onResize, this);
          this._initEvents();
          if (options.maxBounds) {
            this.setMaxBounds(options.maxBounds);
          }
          if (options.zoom !== void 0) {
            this._zoom = this._limitZoom(options.zoom);
          }
          if (options.center && options.zoom !== void 0) {
            this.setView(toLatLng(options.center), options.zoom, { reset: true });
          }
          this.callInitHooks();
          this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
          if (this._zoomAnimated) {
            this._createAnimProxy();
            on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
          }
          this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(center, zoom2, options) {
          zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
          center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
          options = options || {};
          this._stop();
          if (this._loaded && !options.reset && options !== true) {
            if (options.animate !== void 0) {
              options.zoom = extend({ animate: options.animate }, options.zoom);
              options.pan = extend({ animate: options.animate, duration: options.duration }, options.pan);
            }
            var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
            if (moved) {
              clearTimeout(this._sizeTimer);
              return this;
            }
          }
          this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
          return this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(zoom2, options) {
          if (!this._loaded) {
            this._zoom = zoom2;
            return this;
          }
          return this.setView(this.getCenter(), zoom2, { zoom: options });
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom + delta, options);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(delta, options) {
          delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
          return this.setZoom(this._zoom - delta, options);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(latlng, zoom2, options) {
          var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
          return this.setView(newCenter, zoom2, { zoom: options });
        },
        _getBoundsCenterZoom: function(bounds, options) {
          options = options || {};
          bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
          zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
          if (zoom2 === Infinity) {
            return {
              center: bounds.getCenter(),
              zoom: zoom2
            };
          }
          var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
          return {
            center,
            zoom: zoom2
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(bounds, options) {
          bounds = toLatLngBounds(bounds);
          if (!bounds.isValid()) {
            throw new Error("Bounds are not valid.");
          }
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.setView(target.center, target.zoom, options);
        },
        // @method fitWorld(options?: fitBounds options): this
        // Sets a map view that mostly contains the whole world with the maximum
        // zoom level possible.
        fitWorld: function(options) {
          return this.fitBounds([[-90, -180], [90, 180]], options);
        },
        // @method panTo(latlng: LatLng, options?: Pan options): this
        // Pans the map to a given center.
        panTo: function(center, options) {
          return this.setView(center, this._zoom, { pan: options });
        },
        // @method panBy(offset: Point, options?: Pan options): this
        // Pans the map by a given number of pixels (animated).
        panBy: function(offset, options) {
          offset = toPoint(offset).round();
          options = options || {};
          if (!offset.x && !offset.y) {
            return this.fire("moveend");
          }
          if (options.animate !== true && !this.getSize().contains(offset)) {
            this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
            return this;
          }
          if (!this._panAnim) {
            this._panAnim = new PosAnimation();
            this._panAnim.on({
              "step": this._onPanTransitionStep,
              "end": this._onPanTransitionEnd
            }, this);
          }
          if (!options.noMoveStart) {
            this.fire("movestart");
          }
          if (options.animate !== false) {
            addClass(this._mapPane, "leaflet-pan-anim");
            var newPos = this._getMapPanePos().subtract(offset).round();
            this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
          } else {
            this._rawPanBy(offset);
            this.fire("move").fire("moveend");
          }
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(targetCenter, targetZoom, options) {
          options = options || {};
          if (options.animate === false || !Browser.any3d) {
            return this.setView(targetCenter, targetZoom, options);
          }
          this._stop();
          var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
          targetCenter = toLatLng(targetCenter);
          targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
          var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
          function r(i) {
            var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b2 = t1 / b1, sq = Math.sqrt(b2 * b2 + 1) - b2;
            var log = sq < 1e-9 ? -18 : Math.log(sq);
            return log;
          }
          function sinh(n) {
            return (Math.exp(n) - Math.exp(-n)) / 2;
          }
          function cosh(n) {
            return (Math.exp(n) + Math.exp(-n)) / 2;
          }
          function tanh(n) {
            return sinh(n) / cosh(n);
          }
          var r0 = r(0);
          function w(s2) {
            return w0 * (cosh(r0) / cosh(r0 + rho * s2));
          }
          function u(s2) {
            return w0 * (cosh(r0) * tanh(r0 + rho * s2) - sinh(r0)) / rho2;
          }
          function easeOut(t) {
            return 1 - Math.pow(1 - t, 1.5);
          }
          var start = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
          function frame() {
            var t = (Date.now() - start) / duration, s2 = easeOut(t) * S;
            if (t <= 1) {
              this._flyToFrame = requestAnimFrame(frame, this);
              this._move(
                this.unproject(from.add(to.subtract(from).multiplyBy(u(s2) / u1)), startZoom),
                this.getScaleZoom(w0 / w(s2), startZoom),
                { flyTo: true }
              );
            } else {
              this._move(targetCenter, targetZoom)._moveEnd(true);
            }
          }
          this._moveStart(true, options.noMoveStart);
          frame.call(this);
          return this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(bounds, options) {
          var target = this._getBoundsCenterZoom(bounds, options);
          return this.flyTo(target.center, target.zoom, options);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(bounds) {
          bounds = toLatLngBounds(bounds);
          if (this.listens("moveend", this._panInsideMaxBounds)) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (!bounds.isValid()) {
            this.options.maxBounds = null;
            return this;
          }
          this.options.maxBounds = bounds;
          if (this._loaded) {
            this._panInsideMaxBounds();
          }
          return this.on("moveend", this._panInsideMaxBounds);
        },
        // @method setMinZoom(zoom: Number): this
        // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
        setMinZoom: function(zoom2) {
          var oldZoom = this.options.minZoom;
          this.options.minZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() < this.options.minZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method setMaxZoom(zoom: Number): this
        // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
        setMaxZoom: function(zoom2) {
          var oldZoom = this.options.maxZoom;
          this.options.maxZoom = zoom2;
          if (this._loaded && oldZoom !== zoom2) {
            this.fire("zoomlevelschange");
            if (this.getZoom() > this.options.maxZoom) {
              return this.setZoom(zoom2);
            }
          }
          return this;
        },
        // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
        // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
        panInsideBounds: function(bounds, options) {
          this._enforcingBounds = true;
          var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
          if (!center.equals(newCenter)) {
            this.panTo(newCenter, options);
          }
          this._enforcingBounds = false;
          return this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(latlng, options) {
          options = options || {};
          var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
          if (!paddedBounds.contains(pixelPoint)) {
            this._enforcingBounds = true;
            var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
            var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
            pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
            pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
            this.panTo(this.unproject(pixelCenter), options);
            this._enforcingBounds = false;
          }
          return this;
        },
        // @method invalidateSize(options: Zoom/pan options): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default. If `options.pan` is `false`, panning will not occur.
        // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
        // that it doesn't happen often even if the method is called many
        // times in a row.
        // @alternative
        // @method invalidateSize(animate: Boolean): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default.
        invalidateSize: function(options) {
          if (!this._loaded) {
            return this;
          }
          options = extend({
            animate: false,
            pan: true
          }, options === true ? { animate: true } : options);
          var oldSize = this.getSize();
          this._sizeChanged = true;
          this._lastCenter = null;
          var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
          if (!offset.x && !offset.y) {
            return this;
          }
          if (options.animate && options.pan) {
            this.panBy(offset);
          } else {
            if (options.pan) {
              this._rawPanBy(offset);
            }
            this.fire("move");
            if (options.debounceMoveend) {
              clearTimeout(this._sizeTimer);
              this._sizeTimer = setTimeout(bind(this.fire, this, "moveend"), 200);
            } else {
              this.fire("moveend");
            }
          }
          return this.fire("resize", {
            oldSize,
            newSize
          });
        },
        // @section Methods for modifying map state
        // @method stop(): this
        // Stops the currently running `panTo` or `flyTo` animation, if any.
        stop: function() {
          this.setZoom(this._limitZoom(this._zoom));
          if (!this.options.zoomSnap) {
            this.fire("viewreset");
          }
          return this._stop();
        },
        // @section Geolocation methods
        // @method locate(options?: Locate options): this
        // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
        // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
        // and optionally sets the map view to the user's location with respect to
        // detection accuracy (or to the world view if geolocation failed).
        // Note that, if your page doesn't use HTTPS, this method will fail in
        // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
        // See `Locate options` for more details.
        locate: function(options) {
          options = this._locateOptions = extend({
            timeout: 1e4,
            watch: false
            // setView: false
            // maxZoom: <Number>
            // maximumAge: 0
            // enableHighAccuracy: false
          }, options);
          if (!("geolocation" in navigator)) {
            this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            });
            return this;
          }
          var onResponse = bind(this._handleGeolocationResponse, this), onError = bind(this._handleGeolocationError, this);
          if (options.watch) {
            this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
          } else {
            navigator.geolocation.getCurrentPosition(onResponse, onError, options);
          }
          return this;
        },
        // @method stopLocate(): this
        // Stops watching location previously initiated by `map.locate({watch: true})`
        // and aborts resetting the map view if map.locate was called with
        // `{setView: true}`.
        stopLocate: function() {
          if (navigator.geolocation && navigator.geolocation.clearWatch) {
            navigator.geolocation.clearWatch(this._locationWatchId);
          }
          if (this._locateOptions) {
            this._locateOptions.setView = false;
          }
          return this;
        },
        _handleGeolocationError: function(error) {
          if (!this._container._leaflet_id) {
            return;
          }
          var c = error.code, message = error.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
          if (this._locateOptions.setView && !this._loaded) {
            this.fitWorld();
          }
          this.fire("locationerror", {
            code: c,
            message: "Geolocation error: " + message + "."
          });
        },
        _handleGeolocationResponse: function(pos) {
          if (!this._container._leaflet_id) {
            return;
          }
          var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
          if (options.setView) {
            var zoom2 = this.getBoundsZoom(bounds);
            this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
          }
          var data = {
            latlng,
            bounds,
            timestamp: pos.timestamp
          };
          for (var i in pos.coords) {
            if (typeof pos.coords[i] === "number") {
              data[i] = pos.coords[i];
            }
          }
          this.fire("locationfound", data);
        },
        // TODO Appropriate docs section?
        // @section Other Methods
        // @method addHandler(name: String, HandlerClass: Function): this
        // Adds a new `Handler` to the map, given its name and constructor function.
        addHandler: function(name, HandlerClass) {
          if (!HandlerClass) {
            return this;
          }
          var handler = this[name] = new HandlerClass(this);
          this._handlers.push(handler);
          if (this.options[name]) {
            handler.enable();
          }
          return this;
        },
        // @method remove(): this
        // Destroys the map and clears all related event listeners.
        remove: function() {
          this._initEvents(true);
          if (this.options.maxBounds) {
            this.off("moveend", this._panInsideMaxBounds);
          }
          if (this._containerId !== this._container._leaflet_id) {
            throw new Error("Map container is being reused by another instance");
          }
          try {
            delete this._container._leaflet_id;
            delete this._containerId;
          } catch (e3) {
            this._container._leaflet_id = void 0;
            this._containerId = void 0;
          }
          if (this._locationWatchId !== void 0) {
            this.stopLocate();
          }
          this._stop();
          remove(this._mapPane);
          if (this._clearControlPos) {
            this._clearControlPos();
          }
          if (this._resizeRequest) {
            cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = null;
          }
          this._clearHandlers();
          if (this._loaded) {
            this.fire("unload");
          }
          var i;
          for (i in this._layers) {
            this._layers[i].remove();
          }
          for (i in this._panes) {
            remove(this._panes[i]);
          }
          this._layers = [];
          this._panes = [];
          delete this._mapPane;
          delete this._renderer;
          return this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(name, container) {
          var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
          if (name) {
            this._panes[name] = pane;
          }
          return pane;
        },
        // @section Methods for Getting Map State
        // @method getCenter(): LatLng
        // Returns the geographical center of the map view
        getCenter: function() {
          this._checkIfLoaded();
          if (this._lastCenter && !this._moved()) {
            return this._lastCenter.clone();
          }
          return this.layerPointToLatLng(this._getCenterLayerPoint());
        },
        // @method getZoom(): Number
        // Returns the current zoom level of the map view
        getZoom: function() {
          return this._zoom;
        },
        // @method getBounds(): LatLngBounds
        // Returns the geographical bounds visible in the current map view
        getBounds: function() {
          var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
          return new LatLngBounds(sw, ne);
        },
        // @method getMinZoom(): Number
        // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
        getMinZoom: function() {
          return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
        },
        // @method getMaxZoom(): Number
        // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
        getMaxZoom: function() {
          return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
        },
        // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
        // Returns the maximum zoom level on which the given bounds fit to the map
        // view in its entirety. If `inside` (optional) is set to `true`, the method
        // instead returns the minimum zoom level on which the map view fits into
        // the given bounds in its entirety.
        getBoundsZoom: function(bounds, inside, padding) {
          bounds = toLatLngBounds(bounds);
          padding = toPoint(padding || [0, 0]);
          var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
          zoom2 = this.getScaleZoom(scale2, zoom2);
          if (snap) {
            zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
            zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
          }
          return Math.max(min, Math.min(max, zoom2));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          if (!this._size || this._sizeChanged) {
            this._size = new Point(
              this._container.clientWidth || 0,
              this._container.clientHeight || 0
            );
            this._sizeChanged = false;
          }
          return this._size.clone();
        },
        // @method getPixelBounds(): Bounds
        // Returns the bounds of the current map view in projected pixel
        // coordinates (sometimes useful in layer and overlay implementations).
        getPixelBounds: function(center, zoom2) {
          var topLeftPoint = this._getTopLeftPoint(center, zoom2);
          return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
        },
        // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
        // the map pane? "left point of the map layer" can be confusing, specially
        // since there can be negative offsets.
        // @method getPixelOrigin(): Point
        // Returns the projected pixel coordinates of the top left point of
        // the map layer (useful in custom layer and overlay implementations).
        getPixelOrigin: function() {
          this._checkIfLoaded();
          return this._pixelOrigin;
        },
        // @method getPixelWorldBounds(zoom?: Number): Bounds
        // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
        // If `zoom` is omitted, the map's current zoom level is used.
        getPixelWorldBounds: function(zoom2) {
          return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
        },
        // @section Other Methods
        // @method getPane(pane: String|HTMLElement): HTMLElement
        // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
        getPane: function(pane) {
          return typeof pane === "string" ? this._panes[pane] : pane;
        },
        // @method getPanes(): Object
        // Returns a plain object containing the names of all [panes](#map-pane) as keys and
        // the panes as values.
        getPanes: function() {
          return this._panes;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the map.
        getContainer: function() {
          return this._container;
        },
        // @section Conversion Methods
        // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
        // Returns the scale factor to be applied to a map transition from zoom level
        // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
        getZoomScale: function(toZoom, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          return crs.scale(toZoom) / crs.scale(fromZoom);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(scale2, fromZoom) {
          var crs = this.options.crs;
          fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
          var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
          return isNaN(zoom2) ? Infinity : zoom2;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(latlng, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(point, zoom2) {
          zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
          return this.options.crs.pointToLatLng(toPoint(point), zoom2);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(point) {
          var projectedPoint = toPoint(point).add(this.getPixelOrigin());
          return this.unproject(projectedPoint);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(latlng) {
          var projectedPoint = this.project(toLatLng(latlng))._round();
          return projectedPoint._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(latlng) {
          return this.options.crs.wrapLatLng(toLatLng(latlng));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(latlng) {
          return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(latlng1, latlng2) {
          return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(point) {
          return toPoint(point).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(point) {
          return toPoint(point).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(point) {
          var layerPoint = this.containerPointToLayerPoint(toPoint(point));
          return this.layerPointToLatLng(layerPoint);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(latlng) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(e3) {
          return getMousePosition(e3, this._container);
        },
        // @method mouseEventToLayerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to
        // the [origin pixel](#map-getpixelorigin) where the event took place.
        mouseEventToLayerPoint: function(e3) {
          return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e3));
        },
        // @method mouseEventToLatLng(ev: MouseEvent): LatLng
        // Given a MouseEvent object, returns geographical coordinate where the
        // event took place.
        mouseEventToLatLng: function(e3) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(e3));
        },
        // map initialization methods
        _initContainer: function(id) {
          var container = this._container = get(id);
          if (!container) {
            throw new Error("Map container not found.");
          } else if (container._leaflet_id) {
            throw new Error("Map container is already initialized.");
          }
          on(container, "scroll", this._onScroll, this);
          this._containerId = stamp(container);
        },
        _initLayout: function() {
          var container = this._container;
          this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
          addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var position = getStyle(container, "position");
          if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") {
            container.style.position = "relative";
          }
          this._initPanes();
          if (this._initControlPos) {
            this._initControlPos();
          }
        },
        _initPanes: function() {
          var panes = this._panes = {};
          this._paneRenderers = {};
          this._mapPane = this.createPane("mapPane", this._container);
          setPosition(this._mapPane, new Point(0, 0));
          this.createPane("tilePane");
          this.createPane("overlayPane");
          this.createPane("shadowPane");
          this.createPane("markerPane");
          this.createPane("tooltipPane");
          this.createPane("popupPane");
          if (!this.options.markerZoomAnimation) {
            addClass(panes.markerPane, "leaflet-zoom-hide");
            addClass(panes.shadowPane, "leaflet-zoom-hide");
          }
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(center, zoom2, noMoveStart) {
          setPosition(this._mapPane, new Point(0, 0));
          var loading = !this._loaded;
          this._loaded = true;
          zoom2 = this._limitZoom(zoom2);
          this.fire("viewprereset");
          var zoomChanged = this._zoom !== zoom2;
          this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
          this.fire("viewreset");
          if (loading) {
            this.fire("load");
          }
        },
        _moveStart: function(zoomChanged, noMoveStart) {
          if (zoomChanged) {
            this.fire("zoomstart");
          }
          if (!noMoveStart) {
            this.fire("movestart");
          }
          return this;
        },
        _move: function(center, zoom2, data, supressEvent) {
          if (zoom2 === void 0) {
            zoom2 = this._zoom;
          }
          var zoomChanged = this._zoom !== zoom2;
          this._zoom = zoom2;
          this._lastCenter = center;
          this._pixelOrigin = this._getNewPixelOrigin(center);
          if (!supressEvent) {
            if (zoomChanged || data && data.pinch) {
              this.fire("zoom", data);
            }
            this.fire("move", data);
          } else if (data && data.pinch) {
            this.fire("zoom", data);
          }
          return this;
        },
        _moveEnd: function(zoomChanged) {
          if (zoomChanged) {
            this.fire("zoomend");
          }
          return this.fire("moveend");
        },
        _stop: function() {
          cancelAnimFrame(this._flyToFrame);
          if (this._panAnim) {
            this._panAnim.stop();
          }
          return this;
        },
        _rawPanBy: function(offset) {
          setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
        },
        _getZoomSpan: function() {
          return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function() {
          if (!this._enforcingBounds) {
            this.panInsideBounds(this.options.maxBounds);
          }
        },
        _checkIfLoaded: function() {
          if (!this._loaded) {
            throw new Error("Set map center and zoom first.");
          }
        },
        // DOM event handling
        // @section Interaction events
        _initEvents: function(remove2) {
          this._targets = {};
          this._targets[stamp(this._container)] = this;
          var onOff = remove2 ? off : on;
          onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
          if (this.options.trackResize) {
            onOff(window, "resize", this._onResize, this);
          }
          if (Browser.any3d && this.options.transform3DLimit) {
            (remove2 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
          }
        },
        _onResize: function() {
          cancelAnimFrame(this._resizeRequest);
          this._resizeRequest = requestAnimFrame(
            function() {
              this.invalidateSize({ debounceMoveend: true });
            },
            this
          );
        },
        _onScroll: function() {
          this._container.scrollTop = 0;
          this._container.scrollLeft = 0;
        },
        _onMoveEnd: function() {
          var pos = this._getMapPanePos();
          if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
            this._resetView(this.getCenter(), this.getZoom());
          }
        },
        _findEventTargets: function(e3, type) {
          var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e3.target || e3.srcElement, dragging = false;
          while (src) {
            target = this._targets[stamp(src)];
            if (target && (type === "click" || type === "preclick") && this._draggableMoved(target)) {
              dragging = true;
              break;
            }
            if (target && target.listens(type, true)) {
              if (isHover && !isExternalTarget(src, e3)) {
                break;
              }
              targets.push(target);
              if (isHover) {
                break;
              }
            }
            if (src === this._container) {
              break;
            }
            src = src.parentNode;
          }
          if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
            targets = [this];
          }
          return targets;
        },
        _isClickDisabled: function(el) {
          while (el && el !== this._container) {
            if (el["_leaflet_disable_click"]) {
              return true;
            }
            el = el.parentNode;
          }
        },
        _handleDOMEvent: function(e3) {
          var el = e3.target || e3.srcElement;
          if (!this._loaded || el["_leaflet_disable_events"] || e3.type === "click" && this._isClickDisabled(el)) {
            return;
          }
          var type = e3.type;
          if (type === "mousedown") {
            preventOutline(el);
          }
          this._fireDOMEvent(e3, type);
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(e3, type, canvasTargets) {
          if (e3.type === "click") {
            var synth = extend({}, e3);
            synth.type = "preclick";
            this._fireDOMEvent(synth, synth.type, canvasTargets);
          }
          var targets = this._findEventTargets(e3, type);
          if (canvasTargets) {
            var filtered = [];
            for (var i = 0; i < canvasTargets.length; i++) {
              if (canvasTargets[i].listens(type, true)) {
                filtered.push(canvasTargets[i]);
              }
            }
            targets = filtered.concat(targets);
          }
          if (!targets.length) {
            return;
          }
          if (type === "contextmenu") {
            preventDefault(e3);
          }
          var target = targets[0];
          var data = {
            originalEvent: e3
          };
          if (e3.type !== "keypress" && e3.type !== "keydown" && e3.type !== "keyup") {
            var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
            data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e3);
            data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
            data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
          }
          for (i = 0; i < targets.length; i++) {
            targets[i].fire(type, data, true);
            if (data.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1) {
              return;
            }
          }
        },
        _draggableMoved: function(obj) {
          obj = obj.dragging && obj.dragging.enabled() ? obj : this;
          return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
          for (var i = 0, len = this._handlers.length; i < len; i++) {
            this._handlers[i].disable();
          }
        },
        // @section Other Methods
        // @method whenReady(fn: Function, context?: Object): this
        // Runs the given function `fn` when the map gets initialized with
        // a view (center and zoom) and at least one layer, or immediately
        // if it's already initialized, optionally passing a function context.
        whenReady: function(callback, context) {
          if (this._loaded) {
            callback.call(context || this, { target: this });
          } else {
            this.on("load", callback, context);
          }
          return this;
        },
        // private methods for getting map state
        _getMapPanePos: function() {
          return getPosition(this._mapPane) || new Point(0, 0);
        },
        _moved: function() {
          var pos = this._getMapPanePos();
          return pos && !pos.equals([0, 0]);
        },
        _getTopLeftPoint: function(center, zoom2) {
          var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
          return pixelOrigin.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(center, zoom2) {
          var viewHalf = this.getSize()._divideBy(2);
          return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(latlng, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return this.project(latlng, zoom2)._subtract(topLeft);
        },
        _latLngBoundsToNewLayerBounds: function(latLngBounds, zoom2, center) {
          var topLeft = this._getNewPixelOrigin(center, zoom2);
          return toBounds([
            this.project(latLngBounds.getSouthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds.getNorthWest(), zoom2)._subtract(topLeft),
            this.project(latLngBounds.getSouthEast(), zoom2)._subtract(topLeft),
            this.project(latLngBounds.getNorthEast(), zoom2)._subtract(topLeft)
          ]);
        },
        // layer point of the current center
        _getCenterLayerPoint: function() {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        // offset of the specified place to the current center in pixels
        _getCenterOffset: function(latlng) {
          return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
        },
        // adjust center for view to get inside bounds
        _limitCenter: function(center, zoom2, bounds) {
          if (!bounds) {
            return center;
          }
          var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
          if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
            return center;
          }
          return this.unproject(centerPoint.add(offset), zoom2);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(offset, bounds) {
          if (!bounds) {
            return offset;
          }
          var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
          return offset.add(this._getBoundsOffset(newBounds, bounds));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
          var projectedMaxBounds = toBounds(
            this.project(maxBounds.getNorthEast(), zoom2),
            this.project(maxBounds.getSouthWest(), zoom2)
          ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
          return new Point(dx, dy);
        },
        _rebound: function(left, right) {
          return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
        },
        _limitZoom: function(zoom2) {
          var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
          if (snap) {
            zoom2 = Math.round(zoom2 / snap) * snap;
          }
          return Math.max(min, Math.min(max, zoom2));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          removeClass(this._mapPane, "leaflet-pan-anim");
          this.fire("moveend");
        },
        _tryAnimatedPan: function(center, options) {
          var offset = this._getCenterOffset(center)._trunc();
          if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
            return false;
          }
          this.panBy(offset, options);
          return true;
        },
        _createAnimProxy: function() {
          var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(proxy);
          this.on("zoomanim", function(e3) {
            var prop = TRANSFORM, transform = this._proxy.style[prop];
            setTransform(this._proxy, this.project(e3.center, e3.zoom), this.getZoomScale(e3.zoom, 1));
            if (transform === this._proxy.style[prop] && this._animatingZoom) {
              this._onZoomTransitionEnd();
            }
          }, this);
          this.on("load moveend", this._animMoveEnd, this);
          this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          remove(this._proxy);
          this.off("load moveend", this._animMoveEnd, this);
          delete this._proxy;
        },
        _animMoveEnd: function() {
          var c = this.getCenter(), z2 = this.getZoom();
          setTransform(this._proxy, this.project(c, z2), this.getZoomScale(z2, 1));
        },
        _catchTransitionEnd: function(e3) {
          if (this._animatingZoom && e3.propertyName.indexOf("transform") >= 0) {
            this._onZoomTransitionEnd();
          }
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(center, zoom2, options) {
          if (this._animatingZoom) {
            return true;
          }
          options = options || {};
          if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
            return false;
          }
          var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
          if (options.animate !== true && !this.getSize().contains(offset)) {
            return false;
          }
          requestAnimFrame(function() {
            this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
          }, this);
          return true;
        },
        _animateZoom: function(center, zoom2, startAnim, noUpdate) {
          if (!this._mapPane) {
            return;
          }
          if (startAnim) {
            this._animatingZoom = true;
            this._animateToCenter = center;
            this._animateToZoom = zoom2;
            addClass(this._mapPane, "leaflet-zoom-anim");
          }
          this.fire("zoomanim", {
            center,
            zoom: zoom2,
            noUpdate
          });
          if (!this._tempFireZoomEvent) {
            this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
          }
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          setTimeout(bind(this._onZoomTransitionEnd, this), 250);
        },
        _onZoomTransitionEnd: function() {
          if (!this._animatingZoom) {
            return;
          }
          if (this._mapPane) {
            removeClass(this._mapPane, "leaflet-zoom-anim");
          }
          this._animatingZoom = false;
          this._move(this._animateToCenter, this._animateToZoom, void 0, true);
          if (this._tempFireZoomEvent) {
            this.fire("zoom");
          }
          delete this._tempFireZoomEvent;
          this.fire("move");
          this._moveEnd(true);
        }
      });
      function createMap(id, options) {
        return new Map(id, options);
      }
      var Control = Class.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        /* @section
         * Classes extending L.Control will inherit the following methods:
         *
         * @method getPosition: string
         * Returns the position of the control.
         */
        getPosition: function() {
          return this.options.position;
        },
        // @method setPosition(position: string): this
        // Sets the position of the control.
        setPosition: function(position) {
          var map2 = this._map;
          if (map2) {
            map2.removeControl(this);
          }
          this.options.position = position;
          if (map2) {
            map2.addControl(this);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTMLElement that contains the control.
        getContainer: function() {
          return this._container;
        },
        // @method addTo(map: Map): this
        // Adds the control to the given map.
        addTo: function(map2) {
          this.remove();
          this._map = map2;
          var container = this._container = this.onAdd(map2), pos = this.getPosition(), corner = map2._controlCorners[pos];
          addClass(container, "leaflet-control");
          if (pos.indexOf("bottom") !== -1) {
            corner.insertBefore(container, corner.firstChild);
          } else {
            corner.appendChild(container);
          }
          this._map.on("unload", this.remove, this);
          return this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          if (!this._map) {
            return this;
          }
          remove(this._container);
          if (this.onRemove) {
            this.onRemove(this._map);
          }
          this._map.off("unload", this.remove, this);
          this._map = null;
          return this;
        },
        _refocusOnMap: function(e3) {
          if (this._map && e3 && e3.screenX > 0 && e3.screenY > 0) {
            this._map.getContainer().focus();
          }
        }
      });
      var control = function(options) {
        return new Control(options);
      };
      Map.include({
        // @method addControl(control: Control): this
        // Adds the given control to the map
        addControl: function(control2) {
          control2.addTo(this);
          return this;
        },
        // @method removeControl(control: Control): this
        // Removes the given control from the map
        removeControl: function(control2) {
          control2.remove();
          return this;
        },
        _initControlPos: function() {
          var corners = this._controlCorners = {}, l2 = "leaflet-", container = this._controlContainer = create$1("div", l2 + "control-container", this._container);
          function createCorner(vSide, hSide) {
            var className = l2 + vSide + " " + l2 + hSide;
            corners[vSide + hSide] = create$1("div", className, container);
          }
          createCorner("top", "left");
          createCorner("top", "right");
          createCorner("bottom", "left");
          createCorner("bottom", "right");
        },
        _clearControlPos: function() {
          for (var i in this._controlCorners) {
            remove(this._controlCorners[i]);
          }
          remove(this._controlContainer);
          delete this._controlCorners;
          delete this._controlContainer;
        }
      });
      var Layers = Control.extend({
        // @section
        // @aka Control.Layers options
        options: {
          // @option collapsed: Boolean = true
          // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
          collapsed: true,
          position: "topright",
          // @option autoZIndex: Boolean = true
          // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
          autoZIndex: true,
          // @option hideSingleBase: Boolean = false
          // If `true`, the base layers in the control will be hidden when there is only one.
          hideSingleBase: false,
          // @option sortLayers: Boolean = false
          // Whether to sort the layers. When `false`, layers will keep the order
          // in which they were added to the control.
          sortLayers: false,
          // @option sortFunction: Function = *
          // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
          // that will be used for sorting the layers, when `sortLayers` is `true`.
          // The function receives both the `L.Layer` instances and their names, as in
          // `sortFunction(layerA, layerB, nameA, nameB)`.
          // By default, it sorts layers alphabetically by their name.
          sortFunction: function(layerA, layerB, nameA, nameB) {
            return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
          }
        },
        initialize: function(baseLayers, overlays, options) {
          setOptions(this, options);
          this._layerControlInputs = [];
          this._layers = [];
          this._lastZIndex = 0;
          this._handlingClick = false;
          this._preventClick = false;
          for (var i in baseLayers) {
            this._addLayer(baseLayers[i], i);
          }
          for (i in overlays) {
            this._addLayer(overlays[i], i, true);
          }
        },
        onAdd: function(map2) {
          this._initLayout();
          this._update();
          this._map = map2;
          map2.on("zoomend", this._checkDisabledLayers, this);
          for (var i = 0; i < this._layers.length; i++) {
            this._layers[i].layer.on("add remove", this._onLayerChange, this);
          }
          return this._container;
        },
        addTo: function(map2) {
          Control.prototype.addTo.call(this, map2);
          return this._expandIfNotCollapsed();
        },
        onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var i = 0; i < this._layers.length; i++) {
            this._layers[i].layer.off("add remove", this._onLayerChange, this);
          }
        },
        // @method addBaseLayer(layer: Layer, name: String): this
        // Adds a base layer (radio button entry) with the given name to the control.
        addBaseLayer: function(layer, name) {
          this._addLayer(layer, name);
          return this._map ? this._update() : this;
        },
        // @method addOverlay(layer: Layer, name: String): this
        // Adds an overlay (checkbox entry) with the given name to the control.
        addOverlay: function(layer, name) {
          this._addLayer(layer, name, true);
          return this._map ? this._update() : this;
        },
        // @method removeLayer(layer: Layer): this
        // Remove the given layer from the control.
        removeLayer: function(layer) {
          layer.off("add remove", this._onLayerChange, this);
          var obj = this._getLayer(stamp(layer));
          if (obj) {
            this._layers.splice(this._layers.indexOf(obj), 1);
          }
          return this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          addClass(this._container, "leaflet-control-layers-expanded");
          this._section.style.height = null;
          var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
          if (acceptableHeight < this._section.clientHeight) {
            addClass(this._section, "leaflet-control-layers-scrollbar");
            this._section.style.height = acceptableHeight + "px";
          } else {
            removeClass(this._section, "leaflet-control-layers-scrollbar");
          }
          this._checkDisabledLayers();
          return this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          removeClass(this._container, "leaflet-control-layers-expanded");
          return this;
        },
        _initLayout: function() {
          var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
          container.setAttribute("aria-haspopup", true);
          disableClickPropagation(container);
          disableScrollPropagation(container);
          var section = this._section = create$1("section", className + "-list");
          if (collapsed) {
            this._map.on("click", this.collapse, this);
            on(container, {
              mouseenter: this._expandSafely,
              mouseleave: this.collapse
            }, this);
          }
          var link = this._layersLink = create$1("a", className + "-toggle", container);
          link.href = "#";
          link.title = "Layers";
          link.setAttribute("role", "button");
          on(link, {
            keydown: function(e3) {
              if (e3.keyCode === 13) {
                this._expandSafely();
              }
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(e3) {
              preventDefault(e3);
              this._expandSafely();
            }
          }, this);
          if (!collapsed) {
            this.expand();
          }
          this._baseLayersList = create$1("div", className + "-base", section);
          this._separator = create$1("div", className + "-separator", section);
          this._overlaysList = create$1("div", className + "-overlays", section);
          container.appendChild(section);
        },
        _getLayer: function(id) {
          for (var i = 0; i < this._layers.length; i++) {
            if (this._layers[i] && stamp(this._layers[i].layer) === id) {
              return this._layers[i];
            }
          }
        },
        _addLayer: function(layer, name, overlay) {
          if (this._map) {
            layer.on("add remove", this._onLayerChange, this);
          }
          this._layers.push({
            layer,
            name,
            overlay
          });
          if (this.options.sortLayers) {
            this._layers.sort(bind(function(a, b2) {
              return this.options.sortFunction(a.layer, b2.layer, a.name, b2.name);
            }, this));
          }
          if (this.options.autoZIndex && layer.setZIndex) {
            this._lastZIndex++;
            layer.setZIndex(this._lastZIndex);
          }
          this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container) {
            return this;
          }
          empty(this._baseLayersList);
          empty(this._overlaysList);
          this._layerControlInputs = [];
          var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
          for (i = 0; i < this._layers.length; i++) {
            obj = this._layers[i];
            this._addItem(obj);
            overlaysPresent = overlaysPresent || obj.overlay;
            baseLayersPresent = baseLayersPresent || !obj.overlay;
            baseLayersCount += !obj.overlay ? 1 : 0;
          }
          if (this.options.hideSingleBase) {
            baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
            this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
          }
          this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
          return this;
        },
        _onLayerChange: function(e3) {
          if (!this._handlingClick) {
            this._update();
          }
          var obj = this._getLayer(stamp(e3.target));
          var type = obj.overlay ? e3.type === "add" ? "overlayadd" : "overlayremove" : e3.type === "add" ? "baselayerchange" : null;
          if (type) {
            this._map.fire(type, obj);
          }
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(name, checked) {
          var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
          var radioFragment = document.createElement("div");
          radioFragment.innerHTML = radioHtml;
          return radioFragment.firstChild;
        },
        _addItem: function(obj) {
          var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input2;
          if (obj.overlay) {
            input2 = document.createElement("input");
            input2.type = "checkbox";
            input2.className = "leaflet-control-layers-selector";
            input2.defaultChecked = checked;
          } else {
            input2 = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
          }
          this._layerControlInputs.push(input2);
          input2.layerId = stamp(obj.layer);
          on(input2, "click", this._onInputClick, this);
          var name = document.createElement("span");
          name.innerHTML = " " + obj.name;
          var holder = document.createElement("span");
          label.appendChild(holder);
          holder.appendChild(input2);
          holder.appendChild(name);
          var container = obj.overlay ? this._overlaysList : this._baseLayersList;
          container.appendChild(label);
          this._checkDisabledLayers();
          return label;
        },
        _onInputClick: function() {
          if (this._preventClick) {
            return;
          }
          var inputs = this._layerControlInputs, input2, layer;
          var addedLayers = [], removedLayers = [];
          this._handlingClick = true;
          for (var i = inputs.length - 1; i >= 0; i--) {
            input2 = inputs[i];
            layer = this._getLayer(input2.layerId).layer;
            if (input2.checked) {
              addedLayers.push(layer);
            } else if (!input2.checked) {
              removedLayers.push(layer);
            }
          }
          for (i = 0; i < removedLayers.length; i++) {
            if (this._map.hasLayer(removedLayers[i])) {
              this._map.removeLayer(removedLayers[i]);
            }
          }
          for (i = 0; i < addedLayers.length; i++) {
            if (!this._map.hasLayer(addedLayers[i])) {
              this._map.addLayer(addedLayers[i]);
            }
          }
          this._handlingClick = false;
          this._refocusOnMap();
        },
        _checkDisabledLayers: function() {
          var inputs = this._layerControlInputs, input2, layer, zoom2 = this._map.getZoom();
          for (var i = inputs.length - 1; i >= 0; i--) {
            input2 = inputs[i];
            layer = this._getLayer(input2.layerId).layer;
            input2.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
          }
        },
        _expandIfNotCollapsed: function() {
          if (this._map && !this.options.collapsed) {
            this.expand();
          }
          return this;
        },
        _expandSafely: function() {
          var section = this._section;
          this._preventClick = true;
          on(section, "click", preventDefault);
          this.expand();
          var that = this;
          setTimeout(function() {
            off(section, "click", preventDefault);
            that._preventClick = false;
          });
        }
      });
      var layers = function(baseLayers, overlays, options) {
        return new Layers(baseLayers, overlays, options);
      };
      var Zoom = Control.extend({
        // @section
        // @aka Control.Zoom options
        options: {
          position: "topleft",
          // @option zoomInText: String = '<span aria-hidden="true">+</span>'
          // The text set on the 'zoom in' button.
          zoomInText: '<span aria-hidden="true">+</span>',
          // @option zoomInTitle: String = 'Zoom in'
          // The title set on the 'zoom in' button.
          zoomInTitle: "Zoom in",
          // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
          // The text set on the 'zoom out' button.
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          // @option zoomOutTitle: String = 'Zoom out'
          // The title set on the 'zoom out' button.
          zoomOutTitle: "Zoom out"
        },
        onAdd: function(map2) {
          var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
          this._zoomInButton = this._createButton(
            options.zoomInText,
            options.zoomInTitle,
            zoomName + "-in",
            container,
            this._zoomIn
          );
          this._zoomOutButton = this._createButton(
            options.zoomOutText,
            options.zoomOutTitle,
            zoomName + "-out",
            container,
            this._zoomOut
          );
          this._updateDisabled();
          map2.on("zoomend zoomlevelschange", this._updateDisabled, this);
          return container;
        },
        onRemove: function(map2) {
          map2.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function() {
          this._disabled = true;
          this._updateDisabled();
          return this;
        },
        enable: function() {
          this._disabled = false;
          this._updateDisabled();
          return this;
        },
        _zoomIn: function(e3) {
          if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
            this._map.zoomIn(this._map.options.zoomDelta * (e3.shiftKey ? 3 : 1));
          }
        },
        _zoomOut: function(e3) {
          if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
            this._map.zoomOut(this._map.options.zoomDelta * (e3.shiftKey ? 3 : 1));
          }
        },
        _createButton: function(html, title, className, container, fn) {
          var link = create$1("a", className, container);
          link.innerHTML = html;
          link.href = "#";
          link.title = title;
          link.setAttribute("role", "button");
          link.setAttribute("aria-label", title);
          disableClickPropagation(link);
          on(link, "click", stop);
          on(link, "click", fn, this);
          on(link, "click", this._refocusOnMap, this);
          return link;
        },
        _updateDisabled: function() {
          var map2 = this._map, className = "leaflet-disabled";
          removeClass(this._zoomInButton, className);
          removeClass(this._zoomOutButton, className);
          this._zoomInButton.setAttribute("aria-disabled", "false");
          this._zoomOutButton.setAttribute("aria-disabled", "false");
          if (this._disabled || map2._zoom === map2.getMinZoom()) {
            addClass(this._zoomOutButton, className);
            this._zoomOutButton.setAttribute("aria-disabled", "true");
          }
          if (this._disabled || map2._zoom === map2.getMaxZoom()) {
            addClass(this._zoomInButton, className);
            this._zoomInButton.setAttribute("aria-disabled", "true");
          }
        }
      });
      Map.mergeOptions({
        zoomControl: true
      });
      Map.addInitHook(function() {
        if (this.options.zoomControl) {
          this.zoomControl = new Zoom();
          this.addControl(this.zoomControl);
        }
      });
      var zoom = function(options) {
        return new Zoom(options);
      };
      var Scale = Control.extend({
        // @section
        // @aka Control.Scale options
        options: {
          position: "bottomleft",
          // @option maxWidth: Number = 100
          // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
          maxWidth: 100,
          // @option metric: Boolean = True
          // Whether to show the metric scale line (m/km).
          metric: true,
          // @option imperial: Boolean = True
          // Whether to show the imperial scale line (mi/ft).
          imperial: true
          // @option updateWhenIdle: Boolean = false
          // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
        },
        onAdd: function(map2) {
          var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
          this._addScales(options, className + "-line", container);
          map2.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
          map2.whenReady(this._update, this);
          return container;
        },
        onRemove: function(map2) {
          map2.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(options, className, container) {
          if (options.metric) {
            this._mScale = create$1("div", className, container);
          }
          if (options.imperial) {
            this._iScale = create$1("div", className, container);
          }
        },
        _update: function() {
          var map2 = this._map, y = map2.getSize().y / 2;
          var maxMeters = map2.distance(
            map2.containerPointToLatLng([0, y]),
            map2.containerPointToLatLng([this.options.maxWidth, y])
          );
          this._updateScales(maxMeters);
        },
        _updateScales: function(maxMeters) {
          if (this.options.metric && maxMeters) {
            this._updateMetric(maxMeters);
          }
          if (this.options.imperial && maxMeters) {
            this._updateImperial(maxMeters);
          }
        },
        _updateMetric: function(maxMeters) {
          var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
          this._updateScale(this._mScale, label, meters / maxMeters);
        },
        _updateImperial: function(maxMeters) {
          var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
          if (maxFeet > 5280) {
            maxMiles = maxFeet / 5280;
            miles = this._getRoundNum(maxMiles);
            this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
          } else {
            feet = this._getRoundNum(maxFeet);
            this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
          }
        },
        _updateScale: function(scale2, text, ratio) {
          scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
          scale2.innerHTML = text;
        },
        _getRoundNum: function(num) {
          var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d2 = num / pow10;
          d2 = d2 >= 10 ? 10 : d2 >= 5 ? 5 : d2 >= 3 ? 3 : d2 >= 2 ? 2 : 1;
          return pow10 * d2;
        }
      });
      var scale = function(options) {
        return new Scale(options);
      };
      var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
      var Attribution = Control.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
        },
        initialize: function(options) {
          setOptions(this, options);
          this._attributions = {};
        },
        onAdd: function(map2) {
          map2.attributionControl = this;
          this._container = create$1("div", "leaflet-control-attribution");
          disableClickPropagation(this._container);
          for (var i in map2._layers) {
            if (map2._layers[i].getAttribution) {
              this.addAttribution(map2._layers[i].getAttribution());
            }
          }
          this._update();
          map2.on("layeradd", this._addAttribution, this);
          return this._container;
        },
        onRemove: function(map2) {
          map2.off("layeradd", this._addAttribution, this);
        },
        _addAttribution: function(ev) {
          if (ev.layer.getAttribution) {
            this.addAttribution(ev.layer.getAttribution());
            ev.layer.once("remove", function() {
              this.removeAttribution(ev.layer.getAttribution());
            }, this);
          }
        },
        // @method setPrefix(prefix: String|false): this
        // The HTML text shown before the attributions. Pass `false` to disable.
        setPrefix: function(prefix) {
          this.options.prefix = prefix;
          this._update();
          return this;
        },
        // @method addAttribution(text: String): this
        // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
        addAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (!this._attributions[text]) {
            this._attributions[text] = 0;
          }
          this._attributions[text]++;
          this._update();
          return this;
        },
        // @method removeAttribution(text: String): this
        // Removes an attribution text.
        removeAttribution: function(text) {
          if (!text) {
            return this;
          }
          if (this._attributions[text]) {
            this._attributions[text]--;
            this._update();
          }
          return this;
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          var attribs = [];
          for (var i in this._attributions) {
            if (this._attributions[i]) {
              attribs.push(i);
            }
          }
          var prefixAndAttribs = [];
          if (this.options.prefix) {
            prefixAndAttribs.push(this.options.prefix);
          }
          if (attribs.length) {
            prefixAndAttribs.push(attribs.join(", "));
          }
          this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
        }
      });
      Map.mergeOptions({
        attributionControl: true
      });
      Map.addInitHook(function() {
        if (this.options.attributionControl) {
          new Attribution().addTo(this);
        }
      });
      var attribution = function(options) {
        return new Attribution(options);
      };
      Control.Layers = Layers;
      Control.Zoom = Zoom;
      Control.Scale = Scale;
      Control.Attribution = Attribution;
      control.layers = layers;
      control.zoom = zoom;
      control.scale = scale;
      control.attribution = attribution;
      var Handler = Class.extend({
        initialize: function(map2) {
          this._map = map2;
        },
        // @method enable(): this
        // Enables the handler
        enable: function() {
          if (this._enabled) {
            return this;
          }
          this._enabled = true;
          this.addHooks();
          return this;
        },
        // @method disable(): this
        // Disables the handler
        disable: function() {
          if (!this._enabled) {
            return this;
          }
          this._enabled = false;
          this.removeHooks();
          return this;
        },
        // @method enabled(): Boolean
        // Returns `true` if the handler is enabled
        enabled: function() {
          return !!this._enabled;
        }
        // @section Extension methods
        // Classes inheriting from `Handler` must implement the two following methods:
        // @method addHooks()
        // Called when the handler is enabled, should add event hooks.
        // @method removeHooks()
        // Called when the handler is disabled, should remove the event hooks added previously.
      });
      Handler.addTo = function(map2, name) {
        map2.addHandler(name, this);
        return this;
      };
      var Mixin = { Events };
      var START = Browser.touch ? "touchstart mousedown" : "mousedown";
      var Draggable = Evented.extend({
        options: {
          // @section
          // @aka Draggable options
          // @option clickTolerance: Number = 3
          // The max number of pixels a user can shift the mouse pointer during a click
          // for it to be considered a valid click (as opposed to a mouse drag).
          clickTolerance: 3
        },
        // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
        // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
        initialize: function(element, dragStartTarget, preventOutline2, options) {
          setOptions(this, options);
          this._element = element;
          this._dragStartTarget = dragStartTarget || element;
          this._preventOutline = preventOutline2;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          if (this._enabled) {
            return;
          }
          on(this._dragStartTarget, START, this._onDown, this);
          this._enabled = true;
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          if (!this._enabled) {
            return;
          }
          if (Draggable._dragging === this) {
            this.finishDrag(true);
          }
          off(this._dragStartTarget, START, this._onDown, this);
          this._enabled = false;
          this._moved = false;
        },
        _onDown: function(e3) {
          if (!this._enabled) {
            return;
          }
          this._moved = false;
          if (hasClass(this._element, "leaflet-zoom-anim")) {
            return;
          }
          if (e3.touches && e3.touches.length !== 1) {
            if (Draggable._dragging === this) {
              this.finishDrag();
            }
            return;
          }
          if (Draggable._dragging || e3.shiftKey || e3.which !== 1 && e3.button !== 1 && !e3.touches) {
            return;
          }
          Draggable._dragging = this;
          if (this._preventOutline) {
            preventOutline(this._element);
          }
          disableImageDrag();
          disableTextSelection();
          if (this._moving) {
            return;
          }
          this.fire("down");
          var first = e3.touches ? e3.touches[0] : e3, sizedParent = getSizedParentNode(this._element);
          this._startPoint = new Point(first.clientX, first.clientY);
          this._startPos = getPosition(this._element);
          this._parentScale = getScale(sizedParent);
          var mouseevent = e3.type === "mousedown";
          on(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
          on(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
        },
        _onMove: function(e3) {
          if (!this._enabled) {
            return;
          }
          if (e3.touches && e3.touches.length > 1) {
            this._moved = true;
            return;
          }
          var first = e3.touches && e3.touches.length === 1 ? e3.touches[0] : e3, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
          if (!offset.x && !offset.y) {
            return;
          }
          if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
            return;
          }
          offset.x /= this._parentScale.x;
          offset.y /= this._parentScale.y;
          preventDefault(e3);
          if (!this._moved) {
            this.fire("dragstart");
            this._moved = true;
            addClass(document.body, "leaflet-dragging");
            this._lastTarget = e3.target || e3.srcElement;
            if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
              this._lastTarget = this._lastTarget.correspondingUseElement;
            }
            addClass(this._lastTarget, "leaflet-drag-target");
          }
          this._newPos = this._startPos.add(offset);
          this._moving = true;
          this._lastEvent = e3;
          this._updatePosition();
        },
        _updatePosition: function() {
          var e3 = { originalEvent: this._lastEvent };
          this.fire("predrag", e3);
          setPosition(this._element, this._newPos);
          this.fire("drag", e3);
        },
        _onUp: function() {
          if (!this._enabled) {
            return;
          }
          this.finishDrag();
        },
        finishDrag: function(noInertia) {
          removeClass(document.body, "leaflet-dragging");
          if (this._lastTarget) {
            removeClass(this._lastTarget, "leaflet-drag-target");
            this._lastTarget = null;
          }
          off(document, "mousemove touchmove", this._onMove, this);
          off(document, "mouseup touchend touchcancel", this._onUp, this);
          enableImageDrag();
          enableTextSelection();
          var fireDragend = this._moved && this._moving;
          this._moving = false;
          Draggable._dragging = false;
          if (fireDragend) {
            this.fire("dragend", {
              noInertia,
              distance: this._newPos.distanceTo(this._startPos)
            });
          }
        }
      });
      function clipPolygon(points, bounds, round) {
        var clippedPoints, edges = [1, 4, 2, 8], i, j, k, a, b2, len, edge2, p;
        for (i = 0, len = points.length; i < len; i++) {
          points[i]._code = _getBitCode(points[i], bounds);
        }
        for (k = 0; k < 4; k++) {
          edge2 = edges[k];
          clippedPoints = [];
          for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
            a = points[i];
            b2 = points[j];
            if (!(a._code & edge2)) {
              if (b2._code & edge2) {
                p = _getEdgeIntersection(b2, a, edge2, bounds, round);
                p._code = _getBitCode(p, bounds);
                clippedPoints.push(p);
              }
              clippedPoints.push(a);
            } else if (!(b2._code & edge2)) {
              p = _getEdgeIntersection(b2, a, edge2, bounds, round);
              p._code = _getBitCode(p, bounds);
              clippedPoints.push(p);
            }
          }
          points = clippedPoints;
        }
        return points;
      }
      function polygonCenter(latlngs, crs) {
        var i, j, p1, p2, f, area, x2, y, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i = 0; i < len; i++) {
          var latlng = toLatLng(latlngs[i]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        area = x2 = y = 0;
        for (i = 0, j = len - 1; i < len; j = i++) {
          p1 = points[i];
          p2 = points[j];
          f = p1.y * p2.x - p2.y * p1.x;
          x2 += (p1.x + p2.x) * f;
          y += (p1.y + p2.y) * f;
          area += f * 3;
        }
        if (area === 0) {
          center = points[0];
        } else {
          center = [x2 / area, y / area];
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      function centroid(coords) {
        var latSum = 0;
        var lngSum = 0;
        var len = 0;
        for (var i = 0; i < coords.length; i++) {
          var latlng = toLatLng(coords[i]);
          latSum += latlng.lat;
          lngSum += latlng.lng;
          len++;
        }
        return toLatLng([latSum / len, lngSum / len]);
      }
      var PolyUtil = {
        __proto__: null,
        clipPolygon,
        polygonCenter,
        centroid
      };
      function simplify(points, tolerance) {
        if (!tolerance || !points.length) {
          return points.slice();
        }
        var sqTolerance = tolerance * tolerance;
        points = _reducePoints(points, sqTolerance);
        points = _simplifyDP(points, sqTolerance);
        return points;
      }
      function pointToSegmentDistance(p, p1, p2) {
        return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
      }
      function closestPointOnSegment(p, p1, p2) {
        return _sqClosestPointOnSegment(p, p1, p2);
      }
      function _simplifyDP(points, sqTolerance) {
        var len = points.length, ArrayConstructor = typeof Uint8Array !== "undefined" ? Uint8Array : Array, markers = new ArrayConstructor(len);
        markers[0] = markers[len - 1] = 1;
        _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
        var i, newPoints = [];
        for (i = 0; i < len; i++) {
          if (markers[i]) {
            newPoints.push(points[i]);
          }
        }
        return newPoints;
      }
      function _simplifyDPStep(points, markers, sqTolerance, first, last) {
        var maxSqDist = 0, index2, i, sqDist;
        for (i = first + 1; i <= last - 1; i++) {
          sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
          if (sqDist > maxSqDist) {
            index2 = i;
            maxSqDist = sqDist;
          }
        }
        if (maxSqDist > sqTolerance) {
          markers[index2] = 1;
          _simplifyDPStep(points, markers, sqTolerance, first, index2);
          _simplifyDPStep(points, markers, sqTolerance, index2, last);
        }
      }
      function _reducePoints(points, sqTolerance) {
        var reducedPoints = [points[0]];
        for (var i = 1, prev = 0, len = points.length; i < len; i++) {
          if (_sqDist(points[i], points[prev]) > sqTolerance) {
            reducedPoints.push(points[i]);
            prev = i;
          }
        }
        if (prev < len - 1) {
          reducedPoints.push(points[len - 1]);
        }
        return reducedPoints;
      }
      var _lastCode;
      function clipSegment(a, b2, bounds, useLastCode, round) {
        var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b2, bounds), codeOut, p, newCode;
        _lastCode = codeB;
        while (true) {
          if (!(codeA | codeB)) {
            return [a, b2];
          }
          if (codeA & codeB) {
            return false;
          }
          codeOut = codeA || codeB;
          p = _getEdgeIntersection(a, b2, codeOut, bounds, round);
          newCode = _getBitCode(p, bounds);
          if (codeOut === codeA) {
            a = p;
            codeA = newCode;
          } else {
            b2 = p;
            codeB = newCode;
          }
        }
      }
      function _getEdgeIntersection(a, b2, code, bounds, round) {
        var dx = b2.x - a.x, dy = b2.y - a.y, min = bounds.min, max = bounds.max, x2, y;
        if (code & 8) {
          x2 = a.x + dx * (max.y - a.y) / dy;
          y = max.y;
        } else if (code & 4) {
          x2 = a.x + dx * (min.y - a.y) / dy;
          y = min.y;
        } else if (code & 2) {
          x2 = max.x;
          y = a.y + dy * (max.x - a.x) / dx;
        } else if (code & 1) {
          x2 = min.x;
          y = a.y + dy * (min.x - a.x) / dx;
        }
        return new Point(x2, y, round);
      }
      function _getBitCode(p, bounds) {
        var code = 0;
        if (p.x < bounds.min.x) {
          code |= 1;
        } else if (p.x > bounds.max.x) {
          code |= 2;
        }
        if (p.y < bounds.min.y) {
          code |= 4;
        } else if (p.y > bounds.max.y) {
          code |= 8;
        }
        return code;
      }
      function _sqDist(p1, p2) {
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        return dx * dx + dy * dy;
      }
      function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
        var x2 = p1.x, y = p1.y, dx = p2.x - x2, dy = p2.y - y, dot = dx * dx + dy * dy, t;
        if (dot > 0) {
          t = ((p.x - x2) * dx + (p.y - y) * dy) / dot;
          if (t > 1) {
            x2 = p2.x;
            y = p2.y;
          } else if (t > 0) {
            x2 += dx * t;
            y += dy * t;
          }
        }
        dx = p.x - x2;
        dy = p.y - y;
        return sqDist ? dx * dx + dy * dy : new Point(x2, y);
      }
      function isFlat(latlngs) {
        return !isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
      }
      function _flat(latlngs) {
        console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
        return isFlat(latlngs);
      }
      function polylineCenter(latlngs, crs) {
        var i, halfDist, segDist, dist, p1, p2, ratio, center;
        if (!latlngs || latlngs.length === 0) {
          throw new Error("latlngs not passed");
        }
        if (!isFlat(latlngs)) {
          console.warn("latlngs are not flat! Only the first ring will be used");
          latlngs = latlngs[0];
        }
        var centroidLatLng = toLatLng([0, 0]);
        var bounds = toLatLngBounds(latlngs);
        var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
        if (areaBounds < 1700) {
          centroidLatLng = centroid(latlngs);
        }
        var len = latlngs.length;
        var points = [];
        for (i = 0; i < len; i++) {
          var latlng = toLatLng(latlngs[i]);
          points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
        }
        for (i = 0, halfDist = 0; i < len - 1; i++) {
          halfDist += points[i].distanceTo(points[i + 1]) / 2;
        }
        if (halfDist === 0) {
          center = points[0];
        } else {
          for (i = 0, dist = 0; i < len - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            segDist = p1.distanceTo(p2);
            dist += segDist;
            if (dist > halfDist) {
              ratio = (dist - halfDist) / segDist;
              center = [
                p2.x - ratio * (p2.x - p1.x),
                p2.y - ratio * (p2.y - p1.y)
              ];
              break;
            }
          }
        }
        var latlngCenter = crs.unproject(toPoint(center));
        return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
      }
      var LineUtil = {
        __proto__: null,
        simplify,
        pointToSegmentDistance,
        closestPointOnSegment,
        clipSegment,
        _getEdgeIntersection,
        _getBitCode,
        _sqClosestPointOnSegment,
        isFlat,
        _flat,
        polylineCenter
      };
      var LonLat = {
        project: function(latlng) {
          return new Point(latlng.lng, latlng.lat);
        },
        unproject: function(point) {
          return new LatLng(point.y, point.x);
        },
        bounds: new Bounds([-180, -90], [180, 90])
      };
      var Mercator = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(latlng) {
          var d2 = Math.PI / 180, r = this.R, y = latlng.lat * d2, tmp = this.R_MINOR / r, e3 = Math.sqrt(1 - tmp * tmp), con = e3 * Math.sin(y);
          var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e3 / 2);
          y = -r * Math.log(Math.max(ts, 1e-10));
          return new Point(latlng.lng * d2 * r, y);
        },
        unproject: function(point) {
          var d2 = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e3 = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
          for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
            con = e3 * Math.sin(phi);
            con = Math.pow((1 - con) / (1 + con), e3 / 2);
            dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
            phi += dphi;
          }
          return new LatLng(phi * d2, point.x * d2 / r);
        }
      };
      var index = {
        __proto__: null,
        LonLat,
        Mercator,
        SphericalMercator
      };
      var EPSG3395 = extend({}, Earth, {
        code: "EPSG:3395",
        projection: Mercator,
        transformation: (function() {
          var scale2 = 0.5 / (Math.PI * Mercator.R);
          return toTransformation(scale2, 0.5, -scale2, 0.5);
        })()
      });
      var EPSG4326 = extend({}, Earth, {
        code: "EPSG:4326",
        projection: LonLat,
        transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
      });
      var Simple = extend({}, CRS, {
        projection: LonLat,
        transformation: toTransformation(1, 0, -1, 0),
        scale: function(zoom2) {
          return Math.pow(2, zoom2);
        },
        zoom: function(scale2) {
          return Math.log(scale2) / Math.LN2;
        },
        distance: function(latlng1, latlng2) {
          var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
          return Math.sqrt(dx * dx + dy * dy);
        },
        infinite: true
      });
      CRS.Earth = Earth;
      CRS.EPSG3395 = EPSG3395;
      CRS.EPSG3857 = EPSG3857;
      CRS.EPSG900913 = EPSG900913;
      CRS.EPSG4326 = EPSG4326;
      CRS.Simple = Simple;
      var Layer = Evented.extend({
        // Classes extending `L.Layer` will inherit the following options:
        options: {
          // @option pane: String = 'overlayPane'
          // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
          pane: "overlayPane",
          // @option attribution: String = null
          // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
          attribution: null,
          bubblingMouseEvents: true
        },
        /* @section
         * Classes extending `L.Layer` will inherit the following methods:
         *
         * @method addTo(map: Map|LayerGroup): this
         * Adds the layer to the given map or layer group.
         */
        addTo: function(map2) {
          map2.addLayer(this);
          return this;
        },
        // @method remove: this
        // Removes the layer from the map it is currently active on.
        remove: function() {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        // @method removeFrom(map: Map): this
        // Removes the layer from the given map
        //
        // @alternative
        // @method removeFrom(group: LayerGroup): this
        // Removes the layer from the given `LayerGroup`
        removeFrom: function(obj) {
          if (obj) {
            obj.removeLayer(this);
          }
          return this;
        },
        // @method getPane(name? : String): HTMLElement
        // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
        getPane: function(name) {
          return this._map.getPane(name ? this.options[name] || name : this.options.pane);
        },
        addInteractiveTarget: function(targetEl) {
          this._map._targets[stamp(targetEl)] = this;
          return this;
        },
        removeInteractiveTarget: function(targetEl) {
          delete this._map._targets[stamp(targetEl)];
          return this;
        },
        // @method getAttribution: String
        // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
        getAttribution: function() {
          return this.options.attribution;
        },
        _layerAdd: function(e3) {
          var map2 = e3.target;
          if (!map2.hasLayer(this)) {
            return;
          }
          this._map = map2;
          this._zoomAnimated = map2._zoomAnimated;
          if (this.getEvents) {
            var events = this.getEvents();
            map2.on(events, this);
            this.once("remove", function() {
              map2.off(events, this);
            }, this);
          }
          this.onAdd(map2);
          this.fire("add");
          map2.fire("layeradd", { layer: this });
        }
      });
      Map.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(layer) {
          if (!layer._layerAdd) {
            throw new Error("The provided object is not a Layer.");
          }
          var id = stamp(layer);
          if (this._layers[id]) {
            return this;
          }
          this._layers[id] = layer;
          layer._mapToAdd = this;
          if (layer.beforeAdd) {
            layer.beforeAdd(this);
          }
          this.whenReady(layer._layerAdd, layer);
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(layer) {
          var id = stamp(layer);
          if (!this._layers[id]) {
            return this;
          }
          if (this._loaded) {
            layer.onRemove(this);
          }
          delete this._layers[id];
          if (this._loaded) {
            this.fire("layerremove", { layer });
            layer.fire("remove");
          }
          layer._map = layer._mapToAdd = null;
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(layer) {
          return stamp(layer) in this._layers;
        },
        /* @method eachLayer(fn: Function, context?: Object): this
         * Iterates over the layers of the map, optionally specifying context of the iterator function.
         * ```
         * map.eachLayer(function(layer){
         *     layer.bindPopup('Hello');
         * });
         * ```
         */
        eachLayer: function(method, context) {
          for (var i in this._layers) {
            method.call(context, this._layers[i]);
          }
          return this;
        },
        _addLayers: function(layers2) {
          layers2 = layers2 ? isArray(layers2) ? layers2 : [layers2] : [];
          for (var i = 0, len = layers2.length; i < len; i++) {
            this.addLayer(layers2[i]);
          }
        },
        _addZoomLimit: function(layer) {
          if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
            this._zoomBoundLayers[stamp(layer)] = layer;
            this._updateZoomLevels();
          }
        },
        _removeZoomLimit: function(layer) {
          var id = stamp(layer);
          if (this._zoomBoundLayers[id]) {
            delete this._zoomBoundLayers[id];
            this._updateZoomLevels();
          }
        },
        _updateZoomLevels: function() {
          var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
          for (var i in this._zoomBoundLayers) {
            var options = this._zoomBoundLayers[i].options;
            minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
            maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
          }
          this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
          this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
          if (oldZoomSpan !== this._getZoomSpan()) {
            this.fire("zoomlevelschange");
          }
          if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
            this.setZoom(this._layersMaxZoom);
          }
          if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
            this.setZoom(this._layersMinZoom);
          }
        }
      });
      var LayerGroup = Layer.extend({
        initialize: function(layers2, options) {
          setOptions(this, options);
          this._layers = {};
          var i, len;
          if (layers2) {
            for (i = 0, len = layers2.length; i < len; i++) {
              this.addLayer(layers2[i]);
            }
          }
        },
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the group.
        addLayer: function(layer) {
          var id = this.getLayerId(layer);
          this._layers[id] = layer;
          if (this._map) {
            this._map.addLayer(layer);
          }
          return this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the group.
        // @alternative
        // @method removeLayer(id: Number): this
        // Removes the layer with the given internal ID from the group.
        removeLayer: function(layer) {
          var id = layer in this._layers ? layer : this.getLayerId(layer);
          if (this._map && this._layers[id]) {
            this._map.removeLayer(this._layers[id]);
          }
          delete this._layers[id];
          return this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the group.
        // @alternative
        // @method hasLayer(id: Number): Boolean
        // Returns `true` if the given internal ID is currently added to the group.
        hasLayer: function(layer) {
          var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
          return layerId in this._layers;
        },
        // @method clearLayers(): this
        // Removes all the layers from the group.
        clearLayers: function() {
          return this.eachLayer(this.removeLayer, this);
        },
        // @method invoke(methodName: String, …): this
        // Calls `methodName` on every layer contained in this group, passing any
        // additional parameters. Has no effect if the layers contained do not
        // implement `methodName`.
        invoke: function(methodName) {
          var args = Array.prototype.slice.call(arguments, 1), i, layer;
          for (i in this._layers) {
            layer = this._layers[i];
            if (layer[methodName]) {
              layer[methodName].apply(layer, args);
            }
          }
          return this;
        },
        onAdd: function(map2) {
          this.eachLayer(map2.addLayer, map2);
        },
        onRemove: function(map2) {
          this.eachLayer(map2.removeLayer, map2);
        },
        // @method eachLayer(fn: Function, context?: Object): this
        // Iterates over the layers of the group, optionally specifying context of the iterator function.
        // ```js
        // group.eachLayer(function (layer) {
        // 	layer.bindPopup('Hello');
        // });
        // ```
        eachLayer: function(method, context) {
          for (var i in this._layers) {
            method.call(context, this._layers[i]);
          }
          return this;
        },
        // @method getLayer(id: Number): Layer
        // Returns the layer with the given internal ID.
        getLayer: function(id) {
          return this._layers[id];
        },
        // @method getLayers(): Layer[]
        // Returns an array of all the layers added to the group.
        getLayers: function() {
          var layers2 = [];
          this.eachLayer(layers2.push, layers2);
          return layers2;
        },
        // @method setZIndex(zIndex: Number): this
        // Calls `setZIndex` on every layer contained in this group, passing the z-index.
        setZIndex: function(zIndex) {
          return this.invoke("setZIndex", zIndex);
        },
        // @method getLayerId(layer: Layer): Number
        // Returns the internal ID for a layer
        getLayerId: function(layer) {
          return stamp(layer);
        }
      });
      var layerGroup2 = function(layers2, options) {
        return new LayerGroup(layers2, options);
      };
      var FeatureGroup = LayerGroup.extend({
        addLayer: function(layer) {
          if (this.hasLayer(layer)) {
            return this;
          }
          layer.addEventParent(this);
          LayerGroup.prototype.addLayer.call(this, layer);
          return this.fire("layeradd", { layer });
        },
        removeLayer: function(layer) {
          if (!this.hasLayer(layer)) {
            return this;
          }
          if (layer in this._layers) {
            layer = this._layers[layer];
          }
          layer.removeEventParent(this);
          LayerGroup.prototype.removeLayer.call(this, layer);
          return this.fire("layerremove", { layer });
        },
        // @method setStyle(style: Path options): this
        // Sets the given path options to each layer of the group that has a `setStyle` method.
        setStyle: function(style5) {
          return this.invoke("setStyle", style5);
        },
        // @method bringToFront(): this
        // Brings the layer group to the top of all other layers
        bringToFront: function() {
          return this.invoke("bringToFront");
        },
        // @method bringToBack(): this
        // Brings the layer group to the back of all other layers
        bringToBack: function() {
          return this.invoke("bringToBack");
        },
        // @method getBounds(): LatLngBounds
        // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
        getBounds: function() {
          var bounds = new LatLngBounds();
          for (var id in this._layers) {
            var layer = this._layers[id];
            bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
          }
          return bounds;
        }
      });
      var featureGroup = function(layers2, options) {
        return new FeatureGroup(layers2, options);
      };
      var Icon = Class.extend({
        /* @section
         * @aka Icon options
         *
         * @option iconUrl: String = null
         * **(required)** The URL to the icon image (absolute or relative to your script path).
         *
         * @option iconRetinaUrl: String = null
         * The URL to a retina sized version of the icon image (absolute or relative to your
         * script path). Used for Retina screen devices.
         *
         * @option iconSize: Point = null
         * Size of the icon image in pixels.
         *
         * @option iconAnchor: Point = null
         * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
         * will be aligned so that this point is at the marker's geographical location. Centered
         * by default if size is specified, also can be set in CSS with negative margins.
         *
         * @option popupAnchor: Point = [0, 0]
         * The coordinates of the point from which popups will "open", relative to the icon anchor.
         *
         * @option tooltipAnchor: Point = [0, 0]
         * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
         *
         * @option shadowUrl: String = null
         * The URL to the icon shadow image. If not specified, no shadow image will be created.
         *
         * @option shadowRetinaUrl: String = null
         *
         * @option shadowSize: Point = null
         * Size of the shadow image in pixels.
         *
         * @option shadowAnchor: Point = null
         * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
         * as iconAnchor if not specified).
         *
         * @option className: String = ''
         * A custom class name to assign to both icon and shadow images. Empty by default.
         */
        options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        // @method createIcon(oldIcon?: HTMLElement): HTMLElement
        // Called internally when the icon has to be shown, returns a `<img>` HTML element
        // styled according to the options.
        createIcon: function(oldIcon) {
          return this._createIcon("icon", oldIcon);
        },
        // @method createShadow(oldIcon?: HTMLElement): HTMLElement
        // As `createIcon`, but for the shadow beneath it.
        createShadow: function(oldIcon) {
          return this._createIcon("shadow", oldIcon);
        },
        _createIcon: function(name, oldIcon) {
          var src = this._getIconUrl(name);
          if (!src) {
            if (name === "icon") {
              throw new Error("iconUrl not set in Icon options (see the docs).");
            }
            return null;
          }
          var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
          this._setIconStyles(img, name);
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          return img;
        },
        _setIconStyles: function(img, name) {
          var options = this.options;
          var sizeOption = options[name + "Size"];
          if (typeof sizeOption === "number") {
            sizeOption = [sizeOption, sizeOption];
          }
          var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
          img.className = "leaflet-marker-" + name + " " + (options.className || "");
          if (anchor) {
            img.style.marginLeft = -anchor.x + "px";
            img.style.marginTop = -anchor.y + "px";
          }
          if (size) {
            img.style.width = size.x + "px";
            img.style.height = size.y + "px";
          }
        },
        _createImg: function(src, el) {
          el = el || document.createElement("img");
          el.src = src;
          return el;
        },
        _getIconUrl: function(name) {
          return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
        }
      });
      function icon(options) {
        return new Icon(options);
      }
      var IconDefault = Icon.extend({
        options: {
          iconUrl: "marker-icon.png",
          iconRetinaUrl: "marker-icon-2x.png",
          shadowUrl: "marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        },
        _getIconUrl: function(name) {
          if (typeof IconDefault.imagePath !== "string") {
            IconDefault.imagePath = this._detectIconPath();
          }
          return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
        },
        _stripUrl: function(path) {
          var strip = function(str, re, idx) {
            var match = re.exec(str);
            return match && match[idx];
          };
          path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
          return path && strip(path, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var el = create$1("div", "leaflet-default-icon-path", document.body);
          var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
          document.body.removeChild(el);
          path = this._stripUrl(path);
          if (path) {
            return path;
          }
          var link = document.querySelector('link[href$="leaflet.css"]');
          if (!link) {
            return "";
          }
          return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
        }
      });
      var MarkerDrag = Handler.extend({
        initialize: function(marker2) {
          this._marker = marker2;
        },
        addHooks: function() {
          var icon2 = this._marker._icon;
          if (!this._draggable) {
            this._draggable = new Draggable(icon2, icon2, true);
          }
          this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable();
          addClass(icon2, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable();
          if (this._marker._icon) {
            removeClass(this._marker._icon, "leaflet-marker-draggable");
          }
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(e3) {
          var marker2 = this._marker, map2 = marker2._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker2._icon), bounds = map2.getPixelBounds(), origin = map2.getPixelOrigin();
          var panBounds = toBounds(
            bounds.min._subtract(origin).add(padding),
            bounds.max._subtract(origin).subtract(padding)
          );
          if (!panBounds.contains(iconPos)) {
            var movement = toPoint(
              (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
              (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
            ).multiplyBy(speed);
            map2.panBy(movement, { animate: false });
            this._draggable._newPos._add(movement);
            this._draggable._startPos._add(movement);
            setPosition(marker2._icon, this._draggable._newPos);
            this._onDrag(e3);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e3));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng();
          this._marker.closePopup && this._marker.closePopup();
          this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(e3) {
          if (this._marker.options.autoPan) {
            cancelAnimFrame(this._panRequest);
            this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e3));
          }
        },
        _onDrag: function(e3) {
          var marker2 = this._marker, shadow = marker2._shadow, iconPos = getPosition(marker2._icon), latlng = marker2._map.layerPointToLatLng(iconPos);
          if (shadow) {
            setPosition(shadow, iconPos);
          }
          marker2._latlng = latlng;
          e3.latlng = latlng;
          e3.oldLatLng = this._oldLatLng;
          marker2.fire("move", e3).fire("drag", e3);
        },
        _onDragEnd: function(e3) {
          cancelAnimFrame(this._panRequest);
          delete this._oldLatLng;
          this._marker.fire("moveend").fire("dragend", e3);
        }
      });
      var Marker = Layer.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new IconDefault(),
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option keyboard: Boolean = true
          // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
          keyboard: true,
          // @option title: String = ''
          // Text for the browser tooltip that appear on marker hover (no tooltip by default).
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          title: "",
          // @option alt: String = 'Marker'
          // Text for the `alt` attribute of the icon image.
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          alt: "Marker",
          // @option zIndexOffset: Number = 0
          // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
          zIndexOffset: 0,
          // @option opacity: Number = 1.0
          // The opacity of the marker.
          opacity: 1,
          // @option riseOnHover: Boolean = false
          // If `true`, the marker will get on top of others when you hover the mouse over it.
          riseOnHover: false,
          // @option riseOffset: Number = 250
          // The z-index offset used for the `riseOnHover` feature.
          riseOffset: 250,
          // @option pane: String = 'markerPane'
          // `Map pane` where the markers icon will be added.
          pane: "markerPane",
          // @option shadowPane: String = 'shadowPane'
          // `Map pane` where the markers shadow will be added.
          shadowPane: "shadowPane",
          // @option bubblingMouseEvents: Boolean = false
          // When `true`, a mouse event on this marker will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: false,
          // @option autoPanOnFocus: Boolean = true
          // When `true`, the map will pan whenever the marker is focused (via
          // e.g. pressing `tab` on the keyboard) to ensure the marker is
          // visible within the map's bounds
          autoPanOnFocus: true,
          // @section Draggable marker options
          // @option draggable: Boolean = false
          // Whether the marker is draggable with mouse/touch or not.
          draggable: false,
          // @option autoPan: Boolean = false
          // Whether to pan the map when dragging this marker near its edge or not.
          autoPan: false,
          // @option autoPanPadding: Point = Point(50, 50)
          // Distance (in pixels to the left/right and to the top/bottom) of the
          // map edge to start panning the map.
          autoPanPadding: [50, 50],
          // @option autoPanSpeed: Number = 10
          // Number of pixels the map should pan by.
          autoPanSpeed: 10
        },
        /* @section
         *
         * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
         */
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
        },
        onAdd: function(map2) {
          this._zoomAnimated = this._zoomAnimated && map2.options.markerZoomAnimation;
          if (this._zoomAnimated) {
            map2.on("zoomanim", this._animateZoom, this);
          }
          this._initIcon();
          this.update();
        },
        onRemove: function(map2) {
          if (this.dragging && this.dragging.enabled()) {
            this.options.draggable = true;
            this.dragging.removeHooks();
          }
          delete this.dragging;
          if (this._zoomAnimated) {
            map2.off("zoomanim", this._animateZoom, this);
          }
          this._removeIcon();
          this._removeShadow();
        },
        getEvents: function() {
          return {
            zoom: this.update,
            viewreset: this.update
          };
        },
        // @method getLatLng: LatLng
        // Returns the current geographical position of the marker.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Changes the marker position to the given point.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.update();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method setZIndexOffset(offset: Number): this
        // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
        setZIndexOffset: function(offset) {
          this.options.zIndexOffset = offset;
          return this.update();
        },
        // @method getIcon: Icon
        // Returns the current icon used by the marker
        getIcon: function() {
          return this.options.icon;
        },
        // @method setIcon(icon: Icon): this
        // Changes the marker icon.
        setIcon: function(icon2) {
          this.options.icon = icon2;
          if (this._map) {
            this._initIcon();
            this.update();
          }
          if (this._popup) {
            this.bindPopup(this._popup, this._popup.options);
          }
          return this;
        },
        getElement: function() {
          return this._icon;
        },
        update: function() {
          if (this._icon && this._map) {
            var pos = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(pos);
          }
          return this;
        },
        _initIcon: function() {
          var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          var icon2 = options.icon.createIcon(this._icon), addIcon = false;
          if (icon2 !== this._icon) {
            if (this._icon) {
              this._removeIcon();
            }
            addIcon = true;
            if (options.title) {
              icon2.title = options.title;
            }
            if (icon2.tagName === "IMG") {
              icon2.alt = options.alt || "";
            }
          }
          addClass(icon2, classToAdd);
          if (options.keyboard) {
            icon2.tabIndex = "0";
            icon2.setAttribute("role", "button");
          }
          this._icon = icon2;
          if (options.riseOnHover) {
            this.on({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            on(icon2, "focus", this._panOnFocus, this);
          }
          var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
          if (newShadow !== this._shadow) {
            this._removeShadow();
            addShadow = true;
          }
          if (newShadow) {
            addClass(newShadow, classToAdd);
            newShadow.alt = "";
          }
          this._shadow = newShadow;
          if (options.opacity < 1) {
            this._updateOpacity();
          }
          if (addIcon) {
            this.getPane().appendChild(this._icon);
          }
          this._initInteraction();
          if (newShadow && addShadow) {
            this.getPane(options.shadowPane).appendChild(this._shadow);
          }
        },
        _removeIcon: function() {
          if (this.options.riseOnHover) {
            this.off({
              mouseover: this._bringToFront,
              mouseout: this._resetZIndex
            });
          }
          if (this.options.autoPanOnFocus) {
            off(this._icon, "focus", this._panOnFocus, this);
          }
          remove(this._icon);
          this.removeInteractiveTarget(this._icon);
          this._icon = null;
        },
        _removeShadow: function() {
          if (this._shadow) {
            remove(this._shadow);
          }
          this._shadow = null;
        },
        _setPos: function(pos) {
          if (this._icon) {
            setPosition(this._icon, pos);
          }
          if (this._shadow) {
            setPosition(this._shadow, pos);
          }
          this._zIndex = pos.y + this.options.zIndexOffset;
          this._resetZIndex();
        },
        _updateZIndex: function(offset) {
          if (this._icon) {
            this._icon.style.zIndex = this._zIndex + offset;
          }
        },
        _animateZoom: function(opt) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
          this._setPos(pos);
        },
        _initInteraction: function() {
          if (!this.options.interactive) {
            return;
          }
          addClass(this._icon, "leaflet-interactive");
          this.addInteractiveTarget(this._icon);
          if (MarkerDrag) {
            var draggable = this.options.draggable;
            if (this.dragging) {
              draggable = this.dragging.enabled();
              this.dragging.disable();
            }
            this.dragging = new MarkerDrag(this);
            if (draggable) {
              this.dragging.enable();
            }
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._map) {
            this._updateOpacity();
          }
          return this;
        },
        _updateOpacity: function() {
          var opacity = this.options.opacity;
          if (this._icon) {
            setOpacity(this._icon, opacity);
          }
          if (this._shadow) {
            setOpacity(this._shadow, opacity);
          }
        },
        _bringToFront: function() {
          this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function() {
          this._updateZIndex(0);
        },
        _panOnFocus: function() {
          var map2 = this._map;
          if (!map2) {
            return;
          }
          var iconOpts = this.options.icon.options;
          var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
          var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
          map2.panInside(this._latlng, {
            paddingTopLeft: anchor,
            paddingBottomRight: size.subtract(anchor)
          });
        },
        _getPopupAnchor: function() {
          return this.options.icon.options.popupAnchor;
        },
        _getTooltipAnchor: function() {
          return this.options.icon.options.tooltipAnchor;
        }
      });
      function marker(latlng, options) {
        return new Marker(latlng, options);
      }
      var Path = Layer.extend({
        // @section
        // @aka Path options
        options: {
          // @option stroke: Boolean = true
          // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
          stroke: true,
          // @option color: String = '#3388ff'
          // Stroke color
          color: "#3388ff",
          // @option weight: Number = 3
          // Stroke width in pixels
          weight: 3,
          // @option opacity: Number = 1.0
          // Stroke opacity
          opacity: 1,
          // @option lineCap: String= 'round'
          // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
          lineCap: "round",
          // @option lineJoin: String = 'round'
          // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
          lineJoin: "round",
          // @option dashArray: String = null
          // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashArray: null,
          // @option dashOffset: String = null
          // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashOffset: null,
          // @option fill: Boolean = depends
          // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
          fill: false,
          // @option fillColor: String = *
          // Fill color. Defaults to the value of the [`color`](#path-color) option
          fillColor: null,
          // @option fillOpacity: Number = 0.2
          // Fill opacity.
          fillOpacity: 0.2,
          // @option fillRule: String = 'evenodd'
          // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
          fillRule: "evenodd",
          // className: '',
          // Option inherited from "Interactive layer" abstract class
          interactive: true,
          // @option bubblingMouseEvents: Boolean = true
          // When `true`, a mouse event on this path will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: true
        },
        beforeAdd: function(map2) {
          this._renderer = map2.getRenderer(this);
        },
        onAdd: function() {
          this._renderer._initPath(this);
          this._reset();
          this._renderer._addPath(this);
        },
        onRemove: function() {
          this._renderer._removePath(this);
        },
        // @method redraw(): this
        // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
        redraw: function() {
          if (this._map) {
            this._renderer._updatePath(this);
          }
          return this;
        },
        // @method setStyle(style: Path options): this
        // Changes the appearance of a Path based on the options in the `Path options` object.
        setStyle: function(style5) {
          setOptions(this, style5);
          if (this._renderer) {
            this._renderer._updateStyle(this);
            if (this.options.stroke && style5 && Object.prototype.hasOwnProperty.call(style5, "weight")) {
              this._updateBounds();
            }
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all path layers.
        bringToFront: function() {
          if (this._renderer) {
            this._renderer._bringToFront(this);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all path layers.
        bringToBack: function() {
          if (this._renderer) {
            this._renderer._bringToBack(this);
          }
          return this;
        },
        getElement: function() {
          return this._path;
        },
        _reset: function() {
          this._project();
          this._update();
        },
        _clickTolerance: function() {
          return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
        }
      });
      var CircleMarker = Path.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: true,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(latlng, options) {
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(latlng) {
          var oldLatLng = this._latlng;
          this._latlng = toLatLng(latlng);
          this.redraw();
          return this.fire("move", { oldLatLng, latlng: this._latlng });
        },
        // @method getLatLng(): LatLng
        // Returns the current geographical position of the circle marker
        getLatLng: function() {
          return this._latlng;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle marker. Units are in pixels.
        setRadius: function(radius) {
          this.options.radius = this._radius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of the circle
        getRadius: function() {
          return this._radius;
        },
        setStyle: function(options) {
          var radius = options && options.radius || this._radius;
          Path.prototype.setStyle.call(this, options);
          this.setRadius(radius);
          return this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng);
          this._updateBounds();
        },
        _updateBounds: function() {
          var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
          this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
        },
        _update: function() {
          if (this._map) {
            this._updatePath();
          }
        },
        _updatePath: function() {
          this._renderer._updateCircle(this);
        },
        _empty: function() {
          return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p) {
          return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
        }
      });
      function circleMarker2(latlng, options) {
        return new CircleMarker(latlng, options);
      }
      var Circle = CircleMarker.extend({
        initialize: function(latlng, options, legacyOptions) {
          if (typeof options === "number") {
            options = extend({}, legacyOptions, { radius: options });
          }
          setOptions(this, options);
          this._latlng = toLatLng(latlng);
          if (isNaN(this.options.radius)) {
            throw new Error("Circle radius cannot be NaN");
          }
          this._mRadius = this.options.radius;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle. Units are in meters.
        setRadius: function(radius) {
          this._mRadius = radius;
          return this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of a circle. Units are in meters.
        getRadius: function() {
          return this._mRadius;
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          var half = [this._radius, this._radiusY || this._radius];
          return new LatLngBounds(
            this._map.layerPointToLatLng(this._point.subtract(half)),
            this._map.layerPointToLatLng(this._point.add(half))
          );
        },
        setStyle: Path.prototype.setStyle,
        _project: function() {
          var lng = this._latlng.lng, lat = this._latlng.lat, map2 = this._map, crs = map2.options.crs;
          if (crs.distance === Earth.distance) {
            var d2 = Math.PI / 180, latR = this._mRadius / Earth.R / d2, top = map2.project([lat + latR, lng]), bottom = map2.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map2.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d2) - Math.sin(lat * d2) * Math.sin(lat2 * d2)) / (Math.cos(lat * d2) * Math.cos(lat2 * d2))) / d2;
            if (isNaN(lngR) || lngR === 0) {
              lngR = latR / Math.cos(Math.PI / 180 * lat);
            }
            this._point = p.subtract(map2.getPixelOrigin());
            this._radius = isNaN(lngR) ? 0 : p.x - map2.project([lat2, lng - lngR]).x;
            this._radiusY = p.y - top.y;
          } else {
            var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = map2.latLngToLayerPoint(this._latlng);
            this._radius = this._point.x - map2.latLngToLayerPoint(latlng2).x;
          }
          this._updateBounds();
        }
      });
      function circle2(latlng, options, legacyOptions) {
        return new Circle(latlng, options, legacyOptions);
      }
      var Polyline = Path.extend({
        // @section
        // @aka Polyline options
        options: {
          // @option smoothFactor: Number = 1.0
          // How much to simplify the polyline on each zoom level. More means
          // better performance and smoother look, and less means more accurate representation.
          smoothFactor: 1,
          // @option noClip: Boolean = false
          // Disable polyline clipping.
          noClip: false
        },
        initialize: function(latlngs, options) {
          setOptions(this, options);
          this._setLatLngs(latlngs);
        },
        // @method getLatLngs(): LatLng[]
        // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
        getLatLngs: function() {
          return this._latlngs;
        },
        // @method setLatLngs(latlngs: LatLng[]): this
        // Replaces all the points in the polyline with the given array of geographical points.
        setLatLngs: function(latlngs) {
          this._setLatLngs(latlngs);
          return this.redraw();
        },
        // @method isEmpty(): Boolean
        // Returns `true` if the Polyline has no LatLngs.
        isEmpty: function() {
          return !this._latlngs.length;
        },
        // @method closestLayerPoint(p: Point): Point
        // Returns the point closest to `p` on the Polyline.
        closestLayerPoint: function(p) {
          var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
          for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
            var points = this._parts[j];
            for (var i = 1, len = points.length; i < len; i++) {
              p1 = points[i - 1];
              p2 = points[i];
              var sqDist = closest(p, p1, p2, true);
              if (sqDist < minDistance) {
                minDistance = sqDist;
                minPoint = closest(p, p1, p2);
              }
            }
          }
          if (minPoint) {
            minPoint.distance = Math.sqrt(minDistance);
          }
          return minPoint;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polylineCenter(this._defaultShape(), this._map.options.crs);
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          return this._bounds;
        },
        // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
        // Adds a given point to the polyline. By default, adds to the first ring of
        // the polyline in case of a multi-polyline, but can be overridden by passing
        // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
        addLatLng: function(latlng, latlngs) {
          latlngs = latlngs || this._defaultShape();
          latlng = toLatLng(latlng);
          latlngs.push(latlng);
          this._bounds.extend(latlng);
          return this.redraw();
        },
        _setLatLngs: function(latlngs) {
          this._bounds = new LatLngBounds();
          this._latlngs = this._convertLatLngs(latlngs);
        },
        _defaultShape: function() {
          return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(latlngs) {
          var result = [], flat = isFlat(latlngs);
          for (var i = 0, len = latlngs.length; i < len; i++) {
            if (flat) {
              result[i] = toLatLng(latlngs[i]);
              this._bounds.extend(result[i]);
            } else {
              result[i] = this._convertLatLngs(latlngs[i]);
            }
          }
          return result;
        },
        _project: function() {
          var pxBounds = new Bounds();
          this._rings = [];
          this._projectLatlngs(this._latlngs, this._rings, pxBounds);
          if (this._bounds.isValid() && pxBounds.isValid()) {
            this._rawPxBounds = pxBounds;
            this._updateBounds();
          }
        },
        _updateBounds: function() {
          var w = this._clickTolerance(), p = new Point(w, w);
          if (!this._rawPxBounds) {
            return;
          }
          this._pxBounds = new Bounds([
            this._rawPxBounds.min.subtract(p),
            this._rawPxBounds.max.add(p)
          ]);
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(latlngs, result, projectedBounds) {
          var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i, ring;
          if (flat) {
            ring = [];
            for (i = 0; i < len; i++) {
              ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
              projectedBounds.extend(ring[i]);
            }
            result.push(ring);
          } else {
            for (i = 0; i < len; i++) {
              this._projectLatlngs(latlngs[i], result, projectedBounds);
            }
          }
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var bounds = this._renderer._bounds;
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var parts = this._parts, i, j, k, len, len2, segment, points;
          for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
            points = this._rings[i];
            for (j = 0, len2 = points.length; j < len2 - 1; j++) {
              segment = clipSegment(points[j], points[j + 1], bounds, j, true);
              if (!segment) {
                continue;
              }
              parts[k] = parts[k] || [];
              parts[k].push(segment[0]);
              if (segment[1] !== points[j + 1] || j === len2 - 2) {
                parts[k].push(segment[1]);
                k++;
              }
            }
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          var parts = this._parts, tolerance = this.options.smoothFactor;
          for (var i = 0, len = parts.length; i < len; i++) {
            parts[i] = simplify(parts[i], tolerance);
          }
        },
        _update: function() {
          if (!this._map) {
            return;
          }
          this._clipPoints();
          this._simplifyPoints();
          this._updatePath();
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p, closed) {
          var i, j, k, len, len2, part, w = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(p)) {
            return false;
          }
          for (i = 0, len = this._parts.length; i < len; i++) {
            part = this._parts[i];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              if (!closed && j === 0) {
                continue;
              }
              if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
                return true;
              }
            }
          }
          return false;
        }
      });
      function polyline(latlngs, options) {
        return new Polyline(latlngs, options);
      }
      Polyline._flat = _flat;
      var Polygon = Polyline.extend({
        options: {
          fill: true
        },
        isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
        getCenter: function() {
          if (!this._map) {
            throw new Error("Must add layer to map before using getCenter()");
          }
          return polygonCenter(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(latlngs) {
          var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
          if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
            result.pop();
          }
          return result;
        },
        _setLatLngs: function(latlngs) {
          Polyline.prototype._setLatLngs.call(this, latlngs);
          if (isFlat(this._latlngs)) {
            this._latlngs = [this._latlngs];
          }
        },
        _defaultShape: function() {
          return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
          bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
          this._parts = [];
          if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
            return;
          }
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
            clipped = clipPolygon(this._rings[i], bounds, true);
            if (clipped.length) {
              this._parts.push(clipped);
            }
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, true);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(p) {
          var inside = false, part, p1, p2, i, j, k, len, len2;
          if (!this._pxBounds || !this._pxBounds.contains(p)) {
            return false;
          }
          for (i = 0, len = this._parts.length; i < len; i++) {
            part = this._parts[i];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
              p1 = part[j];
              p2 = part[k];
              if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
                inside = !inside;
              }
            }
          }
          return inside || Polyline.prototype._containsPoint.call(this, p, true);
        }
      });
      function polygon(latlngs, options) {
        return new Polygon(latlngs, options);
      }
      var GeoJSON = FeatureGroup.extend({
        /* @section
         * @aka GeoJSON options
         *
         * @option pointToLayer: Function = *
         * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
         * called when data is added, passing the GeoJSON point feature and its `LatLng`.
         * The default is to spawn a default `Marker`:
         * ```js
         * function(geoJsonPoint, latlng) {
         * 	return L.marker(latlng);
         * }
         * ```
         *
         * @option style: Function = *
         * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
         * called internally when data is added.
         * The default value is to not override any defaults:
         * ```js
         * function (geoJsonFeature) {
         * 	return {}
         * }
         * ```
         *
         * @option onEachFeature: Function = *
         * A `Function` that will be called once for each created `Feature`, after it has
         * been created and styled. Useful for attaching events and popups to features.
         * The default is to do nothing with the newly created layers:
         * ```js
         * function (feature, layer) {}
         * ```
         *
         * @option filter: Function = *
         * A `Function` that will be used to decide whether to include a feature or not.
         * The default is to include all features:
         * ```js
         * function (geoJsonFeature) {
         * 	return true;
         * }
         * ```
         * Note: dynamically changing the `filter` option will have effect only on newly
         * added data. It will _not_ re-evaluate already included features.
         *
         * @option coordsToLatLng: Function = *
         * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
         * The default is the `coordsToLatLng` static method.
         *
         * @option markersInheritOptions: Boolean = false
         * Whether default Markers for "Point" type Features inherit from group options.
         */
        initialize: function(geojson, options) {
          setOptions(this, options);
          this._layers = {};
          if (geojson) {
            this.addData(geojson);
          }
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(geojson) {
          var features = isArray(geojson) ? geojson : geojson.features, i, len, feature;
          if (features) {
            for (i = 0, len = features.length; i < len; i++) {
              feature = features[i];
              if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                this.addData(feature);
              }
            }
            return this;
          }
          var options = this.options;
          if (options.filter && !options.filter(geojson)) {
            return this;
          }
          var layer = geometryToLayer(geojson, options);
          if (!layer) {
            return this;
          }
          layer.feature = asFeature(geojson);
          layer.defaultOptions = layer.options;
          this.resetStyle(layer);
          if (options.onEachFeature) {
            options.onEachFeature(geojson, layer);
          }
          return this.addLayer(layer);
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(layer) {
          if (layer === void 0) {
            return this.eachLayer(this.resetStyle, this);
          }
          layer.options = extend({}, layer.defaultOptions);
          this._setLayerStyle(layer, this.options.style);
          return this;
        },
        // @method setStyle( <Function> style ): this
        // Changes styles of GeoJSON vector layers with the given style function.
        setStyle: function(style5) {
          return this.eachLayer(function(layer) {
            this._setLayerStyle(layer, style5);
          }, this);
        },
        _setLayerStyle: function(layer, style5) {
          if (layer.setStyle) {
            if (typeof style5 === "function") {
              style5 = style5(layer.feature);
            }
            layer.setStyle(style5);
          }
        }
      });
      function geometryToLayer(geojson, options) {
        var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
        if (!coords && !geometry) {
          return null;
        }
        switch (geometry.type) {
          case "Point":
            latlng = _coordsToLatLng(coords);
            return _pointToLayer(pointToLayer, geojson, latlng, options);
          case "MultiPoint":
            for (i = 0, len = coords.length; i < len; i++) {
              latlng = _coordsToLatLng(coords[i]);
              layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
            }
            return new FeatureGroup(layers2);
          case "LineString":
          case "MultiLineString":
            latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
            return new Polyline(latlngs, options);
          case "Polygon":
          case "MultiPolygon":
            latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
            return new Polygon(latlngs, options);
          case "GeometryCollection":
            for (i = 0, len = geometry.geometries.length; i < len; i++) {
              var geoLayer = geometryToLayer({
                geometry: geometry.geometries[i],
                type: "Feature",
                properties: geojson.properties
              }, options);
              if (geoLayer) {
                layers2.push(geoLayer);
              }
            }
            return new FeatureGroup(layers2);
          case "FeatureCollection":
            for (i = 0, len = geometry.features.length; i < len; i++) {
              var featureLayer = geometryToLayer(geometry.features[i], options);
              if (featureLayer) {
                layers2.push(featureLayer);
              }
            }
            return new FeatureGroup(layers2);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
        return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
      }
      function coordsToLatLng(coords) {
        return new LatLng(coords[1], coords[0], coords[2]);
      }
      function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
        var latlngs = [];
        for (var i = 0, len = coords.length, latlng; i < len; i++) {
          latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
          latlngs.push(latlng);
        }
        return latlngs;
      }
      function latLngToCoords(latlng, precision) {
        latlng = toLatLng(latlng);
        return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
      }
      function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
        var coords = [];
        for (var i = 0, len = latlngs.length; i < len; i++) {
          coords.push(levelsDeep ? latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
        }
        if (!levelsDeep && closed && coords.length > 0) {
          coords.push(coords[0].slice());
        }
        return coords;
      }
      function getFeature(layer, newGeometry) {
        return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
      }
      function asFeature(geojson) {
        if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
          return geojson;
        }
        return {
          type: "Feature",
          properties: {},
          geometry: geojson
        };
      }
      var PointToGeoJSON = {
        toGeoJSON: function(precision) {
          return getFeature(this, {
            type: "Point",
            coordinates: latLngToCoords(this.getLatLng(), precision)
          });
        }
      };
      Marker.include(PointToGeoJSON);
      Circle.include(PointToGeoJSON);
      CircleMarker.include(PointToGeoJSON);
      Polyline.include({
        toGeoJSON: function(precision) {
          var multi = !isFlat(this._latlngs);
          var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "LineString",
            coordinates: coords
          });
        }
      });
      Polygon.include({
        toGeoJSON: function(precision) {
          var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
          var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
          if (!holes) {
            coords = [coords];
          }
          return getFeature(this, {
            type: (multi ? "Multi" : "") + "Polygon",
            coordinates: coords
          });
        }
      });
      LayerGroup.include({
        toMultiPoint: function(precision) {
          var coords = [];
          this.eachLayer(function(layer) {
            coords.push(layer.toGeoJSON(precision).geometry.coordinates);
          });
          return getFeature(this, {
            type: "MultiPoint",
            coordinates: coords
          });
        },
        // @method toGeoJSON(precision?: Number|false): Object
        // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
        // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
        toGeoJSON: function(precision) {
          var type = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (type === "MultiPoint") {
            return this.toMultiPoint(precision);
          }
          var isGeometryCollection = type === "GeometryCollection", jsons = [];
          this.eachLayer(function(layer) {
            if (layer.toGeoJSON) {
              var json = layer.toGeoJSON(precision);
              if (isGeometryCollection) {
                jsons.push(json.geometry);
              } else {
                var feature = asFeature(json);
                if (feature.type === "FeatureCollection") {
                  jsons.push.apply(jsons, feature.features);
                } else {
                  jsons.push(feature);
                }
              }
            }
          });
          if (isGeometryCollection) {
            return getFeature(this, {
              geometries: jsons,
              type: "GeometryCollection"
            });
          }
          return {
            type: "FeatureCollection",
            features: jsons
          };
        }
      });
      function geoJSON(geojson, options) {
        return new GeoJSON(geojson, options);
      }
      var geoJson = geoJSON;
      var ImageOverlay = Layer.extend({
        // @section
        // @aka ImageOverlay options
        options: {
          // @option opacity: Number = 1.0
          // The opacity of the image overlay.
          opacity: 1,
          // @option alt: String = ''
          // Text for the `alt` attribute of the image (useful for accessibility).
          alt: "",
          // @option interactive: Boolean = false
          // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
          interactive: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the image.
          // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option errorOverlayUrl: String = ''
          // URL to the overlay image to show in place of the overlay that failed to load.
          errorOverlayUrl: "",
          // @option zIndex: Number = 1
          // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
          zIndex: 1,
          // @option className: String = ''
          // A custom class name to assign to the image. Empty by default.
          className: ""
        },
        initialize: function(url, bounds, options) {
          this._url = url;
          this._bounds = toLatLngBounds(bounds);
          setOptions(this, options);
        },
        onAdd: function() {
          if (!this._image) {
            this._initImage();
            if (this.options.opacity < 1) {
              this._updateOpacity();
            }
          }
          if (this.options.interactive) {
            addClass(this._image, "leaflet-interactive");
            this.addInteractiveTarget(this._image);
          }
          this.getPane().appendChild(this._image);
          this._reset();
        },
        onRemove: function() {
          remove(this._image);
          if (this.options.interactive) {
            this.removeInteractiveTarget(this._image);
          }
        },
        // @method setOpacity(opacity: Number): this
        // Sets the opacity of the overlay.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._image) {
            this._updateOpacity();
          }
          return this;
        },
        setStyle: function(styleOpts) {
          if (styleOpts.opacity) {
            this.setOpacity(styleOpts.opacity);
          }
          return this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all overlays.
        bringToFront: function() {
          if (this._map) {
            toFront(this._image);
          }
          return this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          if (this._map) {
            toBack(this._image);
          }
          return this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(url) {
          this._url = url;
          if (this._image) {
            this._image.src = url;
          }
          return this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(bounds) {
          this._bounds = toLatLngBounds(bounds);
          if (this._map) {
            this._reset();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            zoom: this._reset,
            viewreset: this._reset
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method setZIndex(value: Number): this
        // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
        setZIndex: function(value) {
          this.options.zIndex = value;
          this._updateZIndex();
          return this;
        },
        // @method getBounds(): LatLngBounds
        // Get the bounds that this ImageOverlay covers
        getBounds: function() {
          return this._bounds;
        },
        // @method getElement(): HTMLElement
        // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
        // used by this overlay.
        getElement: function() {
          return this._image;
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "IMG";
          var img = this._image = wasElementSupplied ? this._url : create$1("img");
          addClass(img, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(img, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(img, this.options.className);
          }
          img.onselectstart = falseFn;
          img.onmousemove = falseFn;
          img.onload = bind(this.fire, this, "load");
          img.onerror = bind(this._overlayOnError, this, "error");
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (this.options.zIndex) {
            this._updateZIndex();
          }
          if (wasElementSupplied) {
            this._url = img.src;
            return;
          }
          img.src = this._url;
          img.alt = this.options.alt;
        },
        _animateZoom: function(e3) {
          var scale2 = this._map.getZoomScale(e3.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e3.zoom, e3.center).min;
          setTransform(this._image, offset, scale2);
        },
        _reset: function() {
          var image = this._image, bounds = new Bounds(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), size = bounds.getSize();
          setPosition(image, bounds.min);
          image.style.width = size.x + "px";
          image.style.height = size.y + "px";
        },
        _updateOpacity: function() {
          setOpacity(this._image, this.options.opacity);
        },
        _updateZIndex: function() {
          if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._image.style.zIndex = this.options.zIndex;
          }
        },
        _overlayOnError: function() {
          this.fire("error");
          var errorUrl = this.options.errorOverlayUrl;
          if (errorUrl && this._url !== errorUrl) {
            this._url = errorUrl;
            this._image.src = errorUrl;
          }
        },
        // @method getCenter(): LatLng
        // Returns the center of the ImageOverlay.
        getCenter: function() {
          return this._bounds.getCenter();
        }
      });
      var imageOverlay = function(url, bounds, options) {
        return new ImageOverlay(url, bounds, options);
      };
      var VideoOverlay = ImageOverlay.extend({
        // @section
        // @aka VideoOverlay options
        options: {
          // @option autoplay: Boolean = true
          // Whether the video starts playing automatically when loaded.
          // On some browsers autoplay will only work with `muted: true`
          autoplay: true,
          // @option loop: Boolean = true
          // Whether the video will loop back to the beginning when played.
          loop: true,
          // @option keepAspectRatio: Boolean = true
          // Whether the video will save aspect ratio after the projection.
          // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
          keepAspectRatio: true,
          // @option muted: Boolean = false
          // Whether the video starts on mute when loaded.
          muted: false,
          // @option playsInline: Boolean = true
          // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
          playsInline: true
        },
        _initImage: function() {
          var wasElementSupplied = this._url.tagName === "VIDEO";
          var vid = this._image = wasElementSupplied ? this._url : create$1("video");
          addClass(vid, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(vid, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(vid, this.options.className);
          }
          vid.onselectstart = falseFn;
          vid.onmousemove = falseFn;
          vid.onloadeddata = bind(this.fire, this, "load");
          if (wasElementSupplied) {
            var sourceElements = vid.getElementsByTagName("source");
            var sources = [];
            for (var j = 0; j < sourceElements.length; j++) {
              sources.push(sourceElements[j].src);
            }
            this._url = sourceElements.length > 0 ? sources : [vid.src];
            return;
          }
          if (!isArray(this._url)) {
            this._url = [this._url];
          }
          if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
            vid.style["objectFit"] = "fill";
          }
          vid.autoplay = !!this.options.autoplay;
          vid.loop = !!this.options.loop;
          vid.muted = !!this.options.muted;
          vid.playsInline = !!this.options.playsInline;
          for (var i = 0; i < this._url.length; i++) {
            var source = create$1("source");
            source.src = this._url[i];
            vid.appendChild(source);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function videoOverlay(video, bounds, options) {
        return new VideoOverlay(video, bounds, options);
      }
      var SVGOverlay = ImageOverlay.extend({
        _initImage: function() {
          var el = this._image = this._url;
          addClass(el, "leaflet-image-layer");
          if (this._zoomAnimated) {
            addClass(el, "leaflet-zoom-animated");
          }
          if (this.options.className) {
            addClass(el, this.options.className);
          }
          el.onselectstart = falseFn;
          el.onmousemove = falseFn;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function svgOverlay(el, bounds, options) {
        return new SVGOverlay(el, bounds, options);
      }
      var DivOverlay = Layer.extend({
        // @section
        // @aka DivOverlay options
        options: {
          // @option interactive: Boolean = false
          // If true, the popup/tooltip will listen to the mouse events.
          interactive: false,
          // @option offset: Point = Point(0, 0)
          // The offset of the overlay position.
          offset: [0, 0],
          // @option className: String = ''
          // A custom CSS class name to assign to the overlay.
          className: "",
          // @option pane: String = undefined
          // `Map pane` where the overlay will be added.
          pane: void 0,
          // @option content: String|HTMLElement|Function = ''
          // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
          // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
          content: ""
        },
        initialize: function(options, source) {
          if (options && (options instanceof LatLng || isArray(options))) {
            this._latlng = toLatLng(options);
            setOptions(this, source);
          } else {
            setOptions(this, options);
            this._source = source;
          }
          if (this.options.content) {
            this._content = this.options.content;
          }
        },
        // @method openOn(map: Map): this
        // Adds the overlay to the map.
        // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
        openOn: function(map2) {
          map2 = arguments.length ? map2 : this._source._map;
          if (!map2.hasLayer(this)) {
            map2.addLayer(this);
          }
          return this;
        },
        // @method close(): this
        // Closes the overlay.
        // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
        // and `layer.closePopup()`/`.closeTooltip()`.
        close: function() {
          if (this._map) {
            this._map.removeLayer(this);
          }
          return this;
        },
        // @method toggle(layer?: Layer): this
        // Opens or closes the overlay bound to layer depending on its current state.
        // Argument may be omitted only for overlay bound to layer.
        // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
        toggle: function(layer) {
          if (this._map) {
            this.close();
          } else {
            if (arguments.length) {
              this._source = layer;
            } else {
              layer = this._source;
            }
            this._prepareOpen();
            this.openOn(layer._map);
          }
          return this;
        },
        onAdd: function(map2) {
          this._zoomAnimated = map2._zoomAnimated;
          if (!this._container) {
            this._initLayout();
          }
          if (map2._fadeAnimated) {
            setOpacity(this._container, 0);
          }
          clearTimeout(this._removeTimeout);
          this.getPane().appendChild(this._container);
          this.update();
          if (map2._fadeAnimated) {
            setOpacity(this._container, 1);
          }
          this.bringToFront();
          if (this.options.interactive) {
            addClass(this._container, "leaflet-interactive");
            this.addInteractiveTarget(this._container);
          }
        },
        onRemove: function(map2) {
          if (map2._fadeAnimated) {
            setOpacity(this._container, 0);
            this._removeTimeout = setTimeout(bind(remove, void 0, this._container), 200);
          } else {
            remove(this._container);
          }
          if (this.options.interactive) {
            removeClass(this._container, "leaflet-interactive");
            this.removeInteractiveTarget(this._container);
          }
        },
        // @namespace DivOverlay
        // @method getLatLng: LatLng
        // Returns the geographical point of the overlay.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Sets the geographical point where the overlay will open.
        setLatLng: function(latlng) {
          this._latlng = toLatLng(latlng);
          if (this._map) {
            this._updatePosition();
            this._adjustPan();
          }
          return this;
        },
        // @method getContent: String|HTMLElement
        // Returns the content of the overlay.
        getContent: function() {
          return this._content;
        },
        // @method setContent(htmlContent: String|HTMLElement|Function): this
        // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
        // The function should return a `String` or `HTMLElement` to be used in the overlay.
        setContent: function(content) {
          this._content = content;
          this.update();
          return this;
        },
        // @method getElement: String|HTMLElement
        // Returns the HTML container of the overlay.
        getElement: function() {
          return this._container;
        },
        // @method update: null
        // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
        update: function() {
          if (!this._map) {
            return;
          }
          this._container.style.visibility = "hidden";
          this._updateContent();
          this._updateLayout();
          this._updatePosition();
          this._container.style.visibility = "";
          this._adjustPan();
        },
        getEvents: function() {
          var events = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @method isOpen: Boolean
        // Returns `true` when the overlay is visible on the map.
        isOpen: function() {
          return !!this._map && this._map.hasLayer(this);
        },
        // @method bringToFront: this
        // Brings this overlay in front of other overlays (in the same map pane).
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
          }
          return this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(latlng) {
          var source = this._source;
          if (!source._map) {
            return false;
          }
          if (source instanceof FeatureGroup) {
            source = null;
            var layers2 = this._source._layers;
            for (var id in layers2) {
              if (layers2[id]._map) {
                source = layers2[id];
                break;
              }
            }
            if (!source) {
              return false;
            }
            this._source = source;
          }
          if (!latlng) {
            if (source.getCenter) {
              latlng = source.getCenter();
            } else if (source.getLatLng) {
              latlng = source.getLatLng();
            } else if (source.getBounds) {
              latlng = source.getBounds().getCenter();
            } else {
              throw new Error("Unable to get source layer LatLng.");
            }
          }
          this.setLatLng(latlng);
          if (this._map) {
            this.update();
          }
          return true;
        },
        _updateContent: function() {
          if (!this._content) {
            return;
          }
          var node = this._contentNode;
          var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
          if (typeof content === "string") {
            node.innerHTML = content;
          } else {
            while (node.hasChildNodes()) {
              node.removeChild(node.firstChild);
            }
            node.appendChild(content);
          }
          this.fire("contentupdate");
        },
        _updatePosition: function() {
          if (!this._map) {
            return;
          }
          var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (this._zoomAnimated) {
            setPosition(this._container, pos.add(anchor));
          } else {
            offset = offset.add(pos).add(anchor);
          }
          var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
          this._container.style.bottom = bottom + "px";
          this._container.style.left = left + "px";
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      Map.include({
        _initOverlay: function(OverlayClass, content, latlng, options) {
          var overlay = content;
          if (!(overlay instanceof OverlayClass)) {
            overlay = new OverlayClass(options).setContent(content);
          }
          if (latlng) {
            overlay.setLatLng(latlng);
          }
          return overlay;
        }
      });
      Layer.include({
        _initOverlay: function(OverlayClass, old, content, options) {
          var overlay = content;
          if (overlay instanceof OverlayClass) {
            setOptions(overlay, options);
            overlay._source = this;
          } else {
            overlay = old && !options ? old : new OverlayClass(options, this);
            overlay.setContent(content);
          }
          return overlay;
        }
      });
      var Popup = DivOverlay.extend({
        // @section
        // @aka Popup options
        options: {
          // @option pane: String = 'popupPane'
          // `Map pane` where the popup will be added.
          pane: "popupPane",
          // @option offset: Point = Point(0, 7)
          // The offset of the popup position.
          offset: [0, 7],
          // @option maxWidth: Number = 300
          // Max width of the popup, in pixels.
          maxWidth: 300,
          // @option minWidth: Number = 50
          // Min width of the popup, in pixels.
          minWidth: 50,
          // @option maxHeight: Number = null
          // If set, creates a scrollable container of the given height
          // inside a popup if its content exceeds it.
          // The scrollable container can be styled using the
          // `leaflet-popup-scrolled` CSS class selector.
          maxHeight: null,
          // @option autoPan: Boolean = true
          // Set it to `false` if you don't want the map to do panning animation
          // to fit the opened popup.
          autoPan: true,
          // @option autoPanPaddingTopLeft: Point = null
          // The margin between the popup and the top left corner of the map
          // view after autopanning was performed.
          autoPanPaddingTopLeft: null,
          // @option autoPanPaddingBottomRight: Point = null
          // The margin between the popup and the bottom right corner of the map
          // view after autopanning was performed.
          autoPanPaddingBottomRight: null,
          // @option autoPanPadding: Point = Point(5, 5)
          // Equivalent of setting both top left and bottom right autopan padding to the same value.
          autoPanPadding: [5, 5],
          // @option keepInView: Boolean = false
          // Set it to `true` if you want to prevent users from panning the popup
          // off of the screen while it is open.
          keepInView: false,
          // @option closeButton: Boolean = true
          // Controls the presence of a close button in the popup.
          closeButton: true,
          // @option autoClose: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the popup closing when another popup is opened.
          autoClose: true,
          // @option closeOnEscapeKey: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the ESC key for closing of the popup.
          closeOnEscapeKey: true,
          // @option closeOnClick: Boolean = *
          // Set it if you want to override the default behavior of the popup closing when user clicks
          // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
          // @option className: String = ''
          // A custom CSS class name to assign to the popup.
          className: ""
        },
        // @namespace Popup
        // @method openOn(map: Map): this
        // Alternative to `map.openPopup(popup)`.
        // Adds the popup to the map and closes the previous one.
        openOn: function(map2) {
          map2 = arguments.length ? map2 : this._source._map;
          if (!map2.hasLayer(this) && map2._popup && map2._popup.options.autoClose) {
            map2.removeLayer(map2._popup);
          }
          map2._popup = this;
          return DivOverlay.prototype.openOn.call(this, map2);
        },
        onAdd: function(map2) {
          DivOverlay.prototype.onAdd.call(this, map2);
          map2.fire("popupopen", { popup: this });
          if (this._source) {
            this._source.fire("popupopen", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.on("preclick", stopPropagation);
            }
          }
        },
        onRemove: function(map2) {
          DivOverlay.prototype.onRemove.call(this, map2);
          map2.fire("popupclose", { popup: this });
          if (this._source) {
            this._source.fire("popupclose", { popup: this }, true);
            if (!(this._source instanceof Path)) {
              this._source.off("preclick", stopPropagation);
            }
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
            events.preclick = this.close;
          }
          if (this.options.keepInView) {
            events.moveend = this._adjustPan;
          }
          return events;
        },
        _initLayout: function() {
          var prefix = "leaflet-popup", container = this._container = create$1(
            "div",
            prefix + " " + (this.options.className || "") + " leaflet-zoom-animated"
          );
          var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
          this._contentNode = create$1("div", prefix + "-content", wrapper);
          disableClickPropagation(container);
          disableScrollPropagation(this._contentNode);
          on(container, "contextmenu", stopPropagation);
          this._tipContainer = create$1("div", prefix + "-tip-container", container);
          this._tip = create$1("div", prefix + "-tip", this._tipContainer);
          if (this.options.closeButton) {
            var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
            closeButton.setAttribute("role", "button");
            closeButton.setAttribute("aria-label", "Close popup");
            closeButton.href = "#close";
            closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
            on(closeButton, "click", function(ev) {
              preventDefault(ev);
              this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var container = this._contentNode, style5 = container.style;
          style5.width = "";
          style5.whiteSpace = "nowrap";
          var width = container.offsetWidth;
          width = Math.min(width, this.options.maxWidth);
          width = Math.max(width, this.options.minWidth);
          style5.width = width + 1 + "px";
          style5.whiteSpace = "";
          style5.height = "";
          var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
          if (maxHeight && height > maxHeight) {
            style5.height = maxHeight + "px";
            addClass(container, scrolledClass);
          } else {
            removeClass(container, scrolledClass);
          }
          this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(e3) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e3.zoom, e3.center), anchor = this._getAnchor();
          setPosition(this._container, pos.add(anchor));
        },
        _adjustPan: function() {
          if (!this.options.autoPan) {
            return;
          }
          if (this._map._panAnim) {
            this._map._panAnim.stop();
          }
          if (this._autopanning) {
            this._autopanning = false;
            return;
          }
          var map2 = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
          layerPos._add(getPosition(this._container));
          var containerPos = map2.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map2.getSize(), dx = 0, dy = 0;
          if (containerPos.x + containerWidth + paddingBR.x > size.x) {
            dx = containerPos.x + containerWidth - size.x + paddingBR.x;
          }
          if (containerPos.x - dx - paddingTL.x < 0) {
            dx = containerPos.x - paddingTL.x;
          }
          if (containerPos.y + containerHeight + paddingBR.y > size.y) {
            dy = containerPos.y + containerHeight - size.y + paddingBR.y;
          }
          if (containerPos.y - dy - paddingTL.y < 0) {
            dy = containerPos.y - paddingTL.y;
          }
          if (dx || dy) {
            if (this.options.keepInView) {
              this._autopanning = true;
            }
            map2.fire("autopanstart").panBy([dx, dy]);
          }
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      });
      var popup = function(options, source) {
        return new Popup(options, source);
      };
      Map.mergeOptions({
        closePopupOnClick: true
      });
      Map.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(popup2, latlng, options) {
          this._initOverlay(Popup, popup2, latlng, options).openOn(this);
          return this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(popup2) {
          popup2 = arguments.length ? popup2 : this._popup;
          if (popup2) {
            popup2.close();
          }
          return this;
        }
      });
      Layer.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(content, options) {
          this._popup = this._initOverlay(Popup, this._popup, content, options);
          if (!this._popupHandlersAdded) {
            this.on({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = true;
          }
          return this;
        },
        // @method unbindPopup(): this
        // Removes the popup previously bound with `bindPopup`.
        unbindPopup: function() {
          if (this._popup) {
            this.off({
              click: this._openPopup,
              keypress: this._onKeyPress,
              remove: this.closePopup,
              move: this._movePopup
            });
            this._popupHandlersAdded = false;
            this._popup = null;
          }
          return this;
        },
        // @method openPopup(latlng?: LatLng): this
        // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
        openPopup: function(latlng) {
          if (this._popup) {
            if (!(this instanceof FeatureGroup)) {
              this._popup._source = this;
            }
            if (this._popup._prepareOpen(latlng || this._latlng)) {
              this._popup.openOn(this._map);
            }
          }
          return this;
        },
        // @method closePopup(): this
        // Closes the popup bound to this layer if it is open.
        closePopup: function() {
          if (this._popup) {
            this._popup.close();
          }
          return this;
        },
        // @method togglePopup(): this
        // Opens or closes the popup bound to this layer depending on its current state.
        togglePopup: function() {
          if (this._popup) {
            this._popup.toggle(this);
          }
          return this;
        },
        // @method isPopupOpen(): boolean
        // Returns `true` if the popup bound to this layer is currently open.
        isPopupOpen: function() {
          return this._popup ? this._popup.isOpen() : false;
        },
        // @method setPopupContent(content: String|HTMLElement|Popup): this
        // Sets the content of the popup bound to this layer.
        setPopupContent: function(content) {
          if (this._popup) {
            this._popup.setContent(content);
          }
          return this;
        },
        // @method getPopup(): Popup
        // Returns the popup bound to this layer.
        getPopup: function() {
          return this._popup;
        },
        _openPopup: function(e3) {
          if (!this._popup || !this._map) {
            return;
          }
          stop(e3);
          var target = e3.layer || e3.target;
          if (this._popup._source === target && !(target instanceof Path)) {
            if (this._map.hasLayer(this._popup)) {
              this.closePopup();
            } else {
              this.openPopup(e3.latlng);
            }
            return;
          }
          this._popup._source = target;
          this.openPopup(e3.latlng);
        },
        _movePopup: function(e3) {
          this._popup.setLatLng(e3.latlng);
        },
        _onKeyPress: function(e3) {
          if (e3.originalEvent.keyCode === 13) {
            this._openPopup(e3);
          }
        }
      });
      var Tooltip2 = DivOverlay.extend({
        // @section
        // @aka Tooltip options
        options: {
          // @option pane: String = 'tooltipPane'
          // `Map pane` where the tooltip will be added.
          pane: "tooltipPane",
          // @option offset: Point = Point(0, 0)
          // Optional offset of the tooltip position.
          offset: [0, 0],
          // @option direction: String = 'auto'
          // Direction where to open the tooltip. Possible values are: `right`, `left`,
          // `top`, `bottom`, `center`, `auto`.
          // `auto` will dynamically switch between `right` and `left` according to the tooltip
          // position on the map.
          direction: "auto",
          // @option permanent: Boolean = false
          // Whether to open the tooltip permanently or only on mouseover.
          permanent: false,
          // @option sticky: Boolean = false
          // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
          sticky: false,
          // @option opacity: Number = 0.9
          // Tooltip container opacity.
          opacity: 0.9
        },
        onAdd: function(map2) {
          DivOverlay.prototype.onAdd.call(this, map2);
          this.setOpacity(this.options.opacity);
          map2.fire("tooltipopen", { tooltip: this });
          if (this._source) {
            this.addEventParent(this._source);
            this._source.fire("tooltipopen", { tooltip: this }, true);
          }
        },
        onRemove: function(map2) {
          DivOverlay.prototype.onRemove.call(this, map2);
          map2.fire("tooltipclose", { tooltip: this });
          if (this._source) {
            this.removeEventParent(this._source);
            this._source.fire("tooltipclose", { tooltip: this }, true);
          }
        },
        getEvents: function() {
          var events = DivOverlay.prototype.getEvents.call(this);
          if (!this.options.permanent) {
            events.preclick = this.close;
          }
          return events;
        },
        _initLayout: function() {
          var prefix = "leaflet-tooltip", className = prefix + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = create$1("div", className);
          this._container.setAttribute("role", "tooltip");
          this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(pos) {
          var subX, subY, map2 = this._map, container = this._container, centerPoint = map2.latLngToContainerPoint(map2.getCenter()), tooltipPoint = map2.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
          if (direction === "top") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight;
          } else if (direction === "bottom") {
            subX = tooltipWidth / 2;
            subY = 0;
          } else if (direction === "center") {
            subX = tooltipWidth / 2;
            subY = tooltipHeight / 2;
          } else if (direction === "right") {
            subX = 0;
            subY = tooltipHeight / 2;
          } else if (direction === "left") {
            subX = tooltipWidth;
            subY = tooltipHeight / 2;
          } else if (tooltipPoint.x < centerPoint.x) {
            direction = "right";
            subX = 0;
            subY = tooltipHeight / 2;
          } else {
            direction = "left";
            subX = tooltipWidth + (offset.x + anchor.x) * 2;
            subY = tooltipHeight / 2;
          }
          pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
          removeClass(container, "leaflet-tooltip-right");
          removeClass(container, "leaflet-tooltip-left");
          removeClass(container, "leaflet-tooltip-top");
          removeClass(container, "leaflet-tooltip-bottom");
          addClass(container, "leaflet-tooltip-" + direction);
          setPosition(container, pos);
        },
        _updatePosition: function() {
          var pos = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(pos);
        },
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          if (this._container) {
            setOpacity(this._container, opacity);
          }
        },
        _animateZoom: function(e3) {
          var pos = this._map._latLngToNewLayerPoint(this._latlng, e3.zoom, e3.center);
          this._setPosition(pos);
        },
        _getAnchor: function() {
          return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      });
      var tooltip = function(options, source) {
        return new Tooltip2(options, source);
      };
      Map.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(tooltip2, latlng, options) {
          this._initOverlay(Tooltip2, tooltip2, latlng, options).openOn(this);
          return this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(tooltip2) {
          tooltip2.close();
          return this;
        }
      });
      Layer.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(content, options) {
          if (this._tooltip && this.isTooltipOpen()) {
            this.unbindTooltip();
          }
          this._tooltip = this._initOverlay(Tooltip2, this._tooltip, content, options);
          this._initTooltipInteractions();
          if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
            this.openTooltip();
          }
          return this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          if (this._tooltip) {
            this._initTooltipInteractions(true);
            this.closeTooltip();
            this._tooltip = null;
          }
          return this;
        },
        _initTooltipInteractions: function(remove2) {
          if (!remove2 && this._tooltipHandlersAdded) {
            return;
          }
          var onOff = remove2 ? "off" : "on", events = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          if (!this._tooltip.options.permanent) {
            events.mouseover = this._openTooltip;
            events.mouseout = this.closeTooltip;
            events.click = this._openTooltip;
            if (this._map) {
              this._addFocusListeners();
            } else {
              events.add = this._addFocusListeners;
            }
          } else {
            events.add = this._openTooltip;
          }
          if (this._tooltip.options.sticky) {
            events.mousemove = this._moveTooltip;
          }
          this[onOff](events);
          this._tooltipHandlersAdded = !remove2;
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(latlng) {
          if (this._tooltip) {
            if (!(this instanceof FeatureGroup)) {
              this._tooltip._source = this;
            }
            if (this._tooltip._prepareOpen(latlng)) {
              this._tooltip.openOn(this._map);
              if (this.getElement) {
                this._setAriaDescribedByOnLayer(this);
              } else if (this.eachLayer) {
                this.eachLayer(this._setAriaDescribedByOnLayer, this);
              }
            }
          }
          return this;
        },
        // @method closeTooltip(): this
        // Closes the tooltip bound to this layer if it is open.
        closeTooltip: function() {
          if (this._tooltip) {
            return this._tooltip.close();
          }
        },
        // @method toggleTooltip(): this
        // Opens or closes the tooltip bound to this layer depending on its current state.
        toggleTooltip: function() {
          if (this._tooltip) {
            this._tooltip.toggle(this);
          }
          return this;
        },
        // @method isTooltipOpen(): boolean
        // Returns `true` if the tooltip bound to this layer is currently open.
        isTooltipOpen: function() {
          return this._tooltip.isOpen();
        },
        // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
        // Sets the content of the tooltip bound to this layer.
        setTooltipContent: function(content) {
          if (this._tooltip) {
            this._tooltip.setContent(content);
          }
          return this;
        },
        // @method getTooltip(): Tooltip
        // Returns the tooltip bound to this layer.
        getTooltip: function() {
          return this._tooltip;
        },
        _addFocusListeners: function() {
          if (this.getElement) {
            this._addFocusListenersOnLayer(this);
          } else if (this.eachLayer) {
            this.eachLayer(this._addFocusListenersOnLayer, this);
          }
        },
        _addFocusListenersOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            on(el, "focus", function() {
              this._tooltip._source = layer;
              this.openTooltip();
            }, this);
            on(el, "blur", this.closeTooltip, this);
          }
        },
        _setAriaDescribedByOnLayer: function(layer) {
          var el = typeof layer.getElement === "function" && layer.getElement();
          if (el) {
            el.setAttribute("aria-describedby", this._tooltip._container.id);
          }
        },
        _openTooltip: function(e3) {
          if (!this._tooltip || !this._map) {
            return;
          }
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = true;
            var that = this;
            this._map.once("moveend", function() {
              that._openOnceFlag = false;
              that._openTooltip(e3);
            });
            return;
          }
          this._tooltip._source = e3.layer || e3.target;
          this.openTooltip(this._tooltip.options.sticky ? e3.latlng : void 0);
        },
        _moveTooltip: function(e3) {
          var latlng = e3.latlng, containerPoint, layerPoint;
          if (this._tooltip.options.sticky && e3.originalEvent) {
            containerPoint = this._map.mouseEventToContainerPoint(e3.originalEvent);
            layerPoint = this._map.containerPointToLayerPoint(containerPoint);
            latlng = this._map.layerPointToLatLng(layerPoint);
          }
          this._tooltip.setLatLng(latlng);
        }
      });
      var DivIcon = Icon.extend({
        options: {
          // @section
          // @aka DivIcon options
          iconSize: [12, 12],
          // also can be set through CSS
          // iconAnchor: (Point),
          // popupAnchor: (Point),
          // @option html: String|HTMLElement = ''
          // Custom HTML code to put inside the div element, empty by default. Alternatively,
          // an instance of `HTMLElement`.
          html: false,
          // @option bgPos: Point = [0, 0]
          // Optional relative position of the background, in pixels
          bgPos: null,
          className: "leaflet-div-icon"
        },
        createIcon: function(oldIcon) {
          var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
          if (options.html instanceof Element) {
            empty(div);
            div.appendChild(options.html);
          } else {
            div.innerHTML = options.html !== false ? options.html : "";
          }
          if (options.bgPos) {
            var bgPos = toPoint(options.bgPos);
            div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
          }
          this._setIconStyles(div, "icon");
          return div;
        },
        createShadow: function() {
          return null;
        }
      });
      function divIcon(options) {
        return new DivIcon(options);
      }
      Icon.Default = IconDefault;
      var GridLayer = Layer.extend({
        // @section
        // @aka GridLayer options
        options: {
          // @option tileSize: Number|Point = 256
          // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
          tileSize: 256,
          // @option opacity: Number = 1.0
          // Opacity of the tiles. Can be used in the `createTile()` function.
          opacity: 1,
          // @option updateWhenIdle: Boolean = (depends)
          // Load new tiles only when panning ends.
          // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
          // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
          // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
          updateWhenIdle: Browser.mobile,
          // @option updateWhenZooming: Boolean = true
          // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
          updateWhenZooming: true,
          // @option updateInterval: Number = 200
          // Tiles will not update more than once every `updateInterval` milliseconds when panning.
          updateInterval: 200,
          // @option zIndex: Number = 1
          // The explicit zIndex of the tile layer.
          zIndex: 1,
          // @option bounds: LatLngBounds = undefined
          // If set, tiles will only be loaded inside the set `LatLngBounds`.
          bounds: null,
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = undefined
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: void 0,
          // @option maxNativeZoom: Number = undefined
          // Maximum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
          // from `maxNativeZoom` level and auto-scaled.
          maxNativeZoom: void 0,
          // @option minNativeZoom: Number = undefined
          // Minimum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
          // from `minNativeZoom` level and auto-scaled.
          minNativeZoom: void 0,
          // @option noWrap: Boolean = false
          // Whether the layer is wrapped around the antimeridian. If `true`, the
          // GridLayer will only be displayed once at low zoom levels. Has no
          // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
          // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
          // tiles outside the CRS limits.
          noWrap: false,
          // @option pane: String = 'tilePane'
          // `Map pane` where the grid layer will be added.
          pane: "tilePane",
          // @option className: String = ''
          // A custom class name to assign to the tile layer. Empty by default.
          className: "",
          // @option keepBuffer: Number = 2
          // When panning the map, keep this many rows and columns of tiles before unloading them.
          keepBuffer: 2
        },
        initialize: function(options) {
          setOptions(this, options);
        },
        onAdd: function() {
          this._initContainer();
          this._levels = {};
          this._tiles = {};
          this._resetView();
        },
        beforeAdd: function(map2) {
          map2._addZoomLimit(this);
        },
        onRemove: function(map2) {
          this._removeAllTiles();
          remove(this._container);
          map2._removeZoomLimit(this);
          this._container = null;
          this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          if (this._map) {
            toFront(this._container);
            this._setAutoZIndex(Math.max);
          }
          return this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          if (this._map) {
            toBack(this._container);
            this._setAutoZIndex(Math.min);
          }
          return this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the tiles for this layer.
        getContainer: function() {
          return this._container;
        },
        // @method setOpacity(opacity: Number): this
        // Changes the [opacity](#gridlayer-opacity) of the grid layer.
        setOpacity: function(opacity) {
          this.options.opacity = opacity;
          this._updateOpacity();
          return this;
        },
        // @method setZIndex(zIndex: Number): this
        // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
        setZIndex: function(zIndex) {
          this.options.zIndex = zIndex;
          this._updateZIndex();
          return this;
        },
        // @method isLoading: Boolean
        // Returns `true` if any tile in the grid layer has not finished loading.
        isLoading: function() {
          return this._loading;
        },
        // @method redraw: this
        // Causes the layer to clear all the tiles and request them again.
        redraw: function() {
          if (this._map) {
            this._removeAllTiles();
            var tileZoom = this._clampZoom(this._map.getZoom());
            if (tileZoom !== this._tileZoom) {
              this._tileZoom = tileZoom;
              this._updateLevels();
            }
            this._update();
          }
          return this;
        },
        getEvents: function() {
          var events = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
          };
          if (!this.options.updateWhenIdle) {
            if (!this._onMove) {
              this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
            }
            events.move = this._onMove;
          }
          if (this._zoomAnimated) {
            events.zoomanim = this._animateZoom;
          }
          return events;
        },
        // @section Extension methods
        // Layers extending `GridLayer` shall reimplement the following method.
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, must be overridden by classes extending `GridLayer`.
        // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
        // is specified, it must be called when the tile has finished loading and drawing.
        createTile: function() {
          return document.createElement("div");
        },
        // @section
        // @method getTileSize: Point
        // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
        getTileSize: function() {
          var s2 = this.options.tileSize;
          return s2 instanceof Point ? s2 : new Point(s2, s2);
        },
        _updateZIndex: function() {
          if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
            this._container.style.zIndex = this.options.zIndex;
          }
        },
        _setAutoZIndex: function(compare) {
          var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
          for (var i = 0, len = layers2.length, zIndex; i < len; i++) {
            zIndex = layers2[i].style.zIndex;
            if (layers2[i] !== this._container && zIndex) {
              edgeZIndex = compare(edgeZIndex, +zIndex);
            }
          }
          if (isFinite(edgeZIndex)) {
            this.options.zIndex = edgeZIndex + compare(-1, 1);
            this._updateZIndex();
          }
        },
        _updateOpacity: function() {
          if (!this._map) {
            return;
          }
          if (Browser.ielt9) {
            return;
          }
          setOpacity(this._container, this.options.opacity);
          var now = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
          for (var key in this._tiles) {
            var tile = this._tiles[key];
            if (!tile.current || !tile.loaded) {
              continue;
            }
            var fade = Math.min(1, (now - tile.loaded) / 200);
            setOpacity(tile.el, fade);
            if (fade < 1) {
              nextFrame = true;
            } else {
              if (tile.active) {
                willPrune = true;
              } else {
                this._onOpaqueTile(tile);
              }
              tile.active = true;
            }
          }
          if (willPrune && !this._noPrune) {
            this._pruneTiles();
          }
          if (nextFrame) {
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          }
        },
        _onOpaqueTile: falseFn,
        _initContainer: function() {
          if (this._container) {
            return;
          }
          this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
          this._updateZIndex();
          if (this.options.opacity < 1) {
            this._updateOpacity();
          }
          this.getPane().appendChild(this._container);
        },
        _updateLevels: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
          if (zoom2 === void 0) {
            return void 0;
          }
          for (var z2 in this._levels) {
            z2 = Number(z2);
            if (this._levels[z2].el.children.length || z2 === zoom2) {
              this._levels[z2].el.style.zIndex = maxZoom - Math.abs(zoom2 - z2);
              this._onUpdateLevel(z2);
            } else {
              remove(this._levels[z2].el);
              this._removeTilesAtZoom(z2);
              this._onRemoveLevel(z2);
              delete this._levels[z2];
            }
          }
          var level = this._levels[zoom2], map2 = this._map;
          if (!level) {
            level = this._levels[zoom2] = {};
            level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
            level.el.style.zIndex = maxZoom;
            level.origin = map2.project(map2.unproject(map2.getPixelOrigin()), zoom2).round();
            level.zoom = zoom2;
            this._setZoomTransform(level, map2.getCenter(), map2.getZoom());
            falseFn(level.el.offsetWidth);
            this._onCreateLevel(level);
          }
          this._level = level;
          return level;
        },
        _onUpdateLevel: falseFn,
        _onRemoveLevel: falseFn,
        _onCreateLevel: falseFn,
        _pruneTiles: function() {
          if (!this._map) {
            return;
          }
          var key, tile;
          var zoom2 = this._map.getZoom();
          if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            tile.retain = tile.current;
          }
          for (key in this._tiles) {
            tile = this._tiles[key];
            if (tile.current && !tile.active) {
              var coords = tile.coords;
              if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
              }
            }
          }
          for (key in this._tiles) {
            if (!this._tiles[key].retain) {
              this._removeTile(key);
            }
          }
        },
        _removeTilesAtZoom: function(zoom2) {
          for (var key in this._tiles) {
            if (this._tiles[key].coords.z !== zoom2) {
              continue;
            }
            this._removeTile(key);
          }
        },
        _removeAllTiles: function() {
          for (var key in this._tiles) {
            this._removeTile(key);
          }
        },
        _invalidateAll: function() {
          for (var z2 in this._levels) {
            remove(this._levels[z2].el);
            this._onRemoveLevel(Number(z2));
            delete this._levels[z2];
          }
          this._removeAllTiles();
          this._tileZoom = void 0;
        },
        _retainParent: function(x2, y, z2, minZoom) {
          var x22 = Math.floor(x2 / 2), y2 = Math.floor(y / 2), z22 = z2 - 1, coords2 = new Point(+x22, +y2);
          coords2.z = +z22;
          var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
          if (tile && tile.active) {
            tile.retain = true;
            return true;
          } else if (tile && tile.loaded) {
            tile.retain = true;
          }
          if (z22 > minZoom) {
            return this._retainParent(x22, y2, z22, minZoom);
          }
          return false;
        },
        _retainChildren: function(x2, y, z2, maxZoom) {
          for (var i = 2 * x2; i < 2 * x2 + 2; i++) {
            for (var j = 2 * y; j < 2 * y + 2; j++) {
              var coords = new Point(i, j);
              coords.z = z2 + 1;
              var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
              if (tile && tile.active) {
                tile.retain = true;
                continue;
              } else if (tile && tile.loaded) {
                tile.retain = true;
              }
              if (z2 + 1 < maxZoom) {
                this._retainChildren(i, j, z2 + 1, maxZoom);
              }
            }
          }
        },
        _resetView: function(e3) {
          var animating = e3 && (e3.pinch || e3.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
        },
        _animateZoom: function(e3) {
          this._setView(e3.center, e3.zoom, true, e3.noUpdate);
        },
        _clampZoom: function(zoom2) {
          var options = this.options;
          if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
            return options.minNativeZoom;
          }
          if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
            return options.maxNativeZoom;
          }
          return zoom2;
        },
        _setView: function(center, zoom2, noPrune, noUpdate) {
          var tileZoom = Math.round(zoom2);
          if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
            tileZoom = void 0;
          } else {
            tileZoom = this._clampZoom(tileZoom);
          }
          var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
          if (!noUpdate || tileZoomChanged) {
            this._tileZoom = tileZoom;
            if (this._abortLoading) {
              this._abortLoading();
            }
            this._updateLevels();
            this._resetGrid();
            if (tileZoom !== void 0) {
              this._update(center);
            }
            if (!noPrune) {
              this._pruneTiles();
            }
            this._noPrune = !!noPrune;
          }
          this._setZoomTransforms(center, zoom2);
        },
        _setZoomTransforms: function(center, zoom2) {
          for (var i in this._levels) {
            this._setZoomTransform(this._levels[i], center, zoom2);
          }
        },
        _setZoomTransform: function(level, center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
          if (Browser.any3d) {
            setTransform(level.el, translate, scale2);
          } else {
            setPosition(level.el, translate);
          }
        },
        _resetGrid: function() {
          var map2 = this._map, crs = map2.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
          var bounds = this._map.getPixelWorldBounds(this._tileZoom);
          if (bounds) {
            this._globalTileRange = this._pxBoundsToTileRange(bounds);
          }
          this._wrapX = crs.wrapLng && !this.options.noWrap && [
            Math.floor(map2.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
            Math.ceil(map2.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
          ];
          this._wrapY = crs.wrapLat && !this.options.noWrap && [
            Math.floor(map2.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
            Math.ceil(map2.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
          ];
        },
        _onMoveEnd: function() {
          if (!this._map || this._map._animatingZoom) {
            return;
          }
          this._update();
        },
        _getTiledPixelBounds: function(center) {
          var map2 = this._map, mapZoom = map2._animatingZoom ? Math.max(map2._animateToZoom, map2.getZoom()) : map2.getZoom(), scale2 = map2.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map2.project(center, this._tileZoom).floor(), halfSize = map2.getSize().divideBy(scale2 * 2);
          return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(center) {
          var map2 = this._map;
          if (!map2) {
            return;
          }
          var zoom2 = this._clampZoom(map2.getZoom());
          if (center === void 0) {
            center = map2.getCenter();
          }
          if (this._tileZoom === void 0) {
            return;
          }
          var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
            tileRange.getBottomLeft().subtract([margin, -margin]),
            tileRange.getTopRight().add([margin, -margin])
          );
          if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
            throw new Error("Attempted to load an infinite number of tiles");
          }
          for (var key in this._tiles) {
            var c = this._tiles[key].coords;
            if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
              this._tiles[key].current = false;
            }
          }
          if (Math.abs(zoom2 - this._tileZoom) > 1) {
            this._setView(center, zoom2);
            return;
          }
          for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
            for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
              var coords = new Point(i, j);
              coords.z = this._tileZoom;
              if (!this._isValidTile(coords)) {
                continue;
              }
              var tile = this._tiles[this._tileCoordsToKey(coords)];
              if (tile) {
                tile.current = true;
              } else {
                queue.push(coords);
              }
            }
          }
          queue.sort(function(a, b2) {
            return a.distanceTo(tileCenter) - b2.distanceTo(tileCenter);
          });
          if (queue.length !== 0) {
            if (!this._loading) {
              this._loading = true;
              this.fire("loading");
            }
            var fragment = document.createDocumentFragment();
            for (i = 0; i < queue.length; i++) {
              this._addTile(queue[i], fragment);
            }
            this._level.el.appendChild(fragment);
          }
        },
        _isValidTile: function(coords) {
          var crs = this._map.options.crs;
          if (!crs.infinite) {
            var bounds = this._globalTileRange;
            if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
              return false;
            }
          }
          if (!this.options.bounds) {
            return true;
          }
          var tileBounds = this._tileCoordsToBounds(coords);
          return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
        },
        _keyToBounds: function(key) {
          return this._tileCoordsToBounds(this._keyToTileCoords(key));
        },
        _tileCoordsToNwSe: function(coords) {
          var map2 = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map2.unproject(nwPoint, coords.z), se = map2.unproject(sePoint, coords.z);
          return [nw, se];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(coords) {
          var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
          if (!this.options.noWrap) {
            bounds = this._map.wrapLatLngBounds(bounds);
          }
          return bounds;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(coords) {
          return coords.x + ":" + coords.y + ":" + coords.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(key) {
          var k = key.split(":"), coords = new Point(+k[0], +k[1]);
          coords.z = +k[2];
          return coords;
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          remove(tile.el);
          delete this._tiles[key];
          this.fire("tileunload", {
            tile: tile.el,
            coords: this._keyToTileCoords(key)
          });
        },
        _initTile: function(tile) {
          addClass(tile, "leaflet-tile");
          var tileSize = this.getTileSize();
          tile.style.width = tileSize.x + "px";
          tile.style.height = tileSize.y + "px";
          tile.onselectstart = falseFn;
          tile.onmousemove = falseFn;
          if (Browser.ielt9 && this.options.opacity < 1) {
            setOpacity(tile, this.options.opacity);
          }
        },
        _addTile: function(coords, container) {
          var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
          var tile = this.createTile(this._wrapCoords(coords), bind(this._tileReady, this, coords));
          this._initTile(tile);
          if (this.createTile.length < 2) {
            requestAnimFrame(bind(this._tileReady, this, coords, null, tile));
          }
          setPosition(tile, tilePos);
          this._tiles[key] = {
            el: tile,
            coords,
            current: true
          };
          container.appendChild(tile);
          this.fire("tileloadstart", {
            tile,
            coords
          });
        },
        _tileReady: function(coords, err, tile) {
          if (err) {
            this.fire("tileerror", {
              error: err,
              tile,
              coords
            });
          }
          var key = this._tileCoordsToKey(coords);
          tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.loaded = +/* @__PURE__ */ new Date();
          if (this._map._fadeAnimated) {
            setOpacity(tile.el, 0);
            cancelAnimFrame(this._fadeFrame);
            this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
          } else {
            tile.active = true;
            this._pruneTiles();
          }
          if (!err) {
            addClass(tile.el, "leaflet-tile-loaded");
            this.fire("tileload", {
              tile: tile.el,
              coords
            });
          }
          if (this._noTilesToLoad()) {
            this._loading = false;
            this.fire("load");
            if (Browser.ielt9 || !this._map._fadeAnimated) {
              requestAnimFrame(this._pruneTiles, this);
            } else {
              setTimeout(bind(this._pruneTiles, this), 250);
            }
          }
        },
        _getTilePos: function(coords) {
          return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(coords) {
          var newCoords = new Point(
            this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
            this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
          );
          newCoords.z = coords.z;
          return newCoords;
        },
        _pxBoundsToTileRange: function(bounds) {
          var tileSize = this.getTileSize();
          return new Bounds(
            bounds.min.unscaleBy(tileSize).floor(),
            bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function() {
          for (var key in this._tiles) {
            if (!this._tiles[key].loaded) {
              return false;
            }
          }
          return true;
        }
      });
      function gridLayer(options) {
        return new GridLayer(options);
      }
      var TileLayer = GridLayer.extend({
        // @section
        // @aka TileLayer options
        options: {
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = 18
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: 18,
          // @option subdomains: String|String[] = 'abc'
          // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
          subdomains: "abc",
          // @option errorTileUrl: String = ''
          // URL to the tile image to show in place of the tile that failed to load.
          errorTileUrl: "",
          // @option zoomOffset: Number = 0
          // The zoom number used in tile URLs will be offset with this value.
          zoomOffset: 0,
          // @option tms: Boolean = false
          // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
          tms: false,
          // @option zoomReverse: Boolean = false
          // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
          zoomReverse: false,
          // @option detectRetina: Boolean = false
          // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
          detectRetina: false,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: false,
          // @option referrerPolicy: Boolean|String = false
          // Whether the referrerPolicy attribute will be added to the tiles.
          // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
          // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
          // (e.g. to validate an API token).
          // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
          referrerPolicy: false
        },
        initialize: function(url, options) {
          this._url = url;
          options = setOptions(this, options);
          if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
            options.tileSize = Math.floor(options.tileSize / 2);
            if (!options.zoomReverse) {
              options.zoomOffset++;
              options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
            } else {
              options.zoomOffset--;
              options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
            }
            options.minZoom = Math.max(0, options.minZoom);
          } else if (!options.zoomReverse) {
            options.maxZoom = Math.max(options.minZoom, options.maxZoom);
          } else {
            options.minZoom = Math.min(options.maxZoom, options.minZoom);
          }
          if (typeof options.subdomains === "string") {
            options.subdomains = options.subdomains.split("");
          }
          this.on("tileunload", this._onTileRemove);
        },
        // @method setUrl(url: String, noRedraw?: Boolean): this
        // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
        // If the URL does not change, the layer will not be redrawn unless
        // the noRedraw parameter is set to false.
        setUrl: function(url, noRedraw) {
          if (this._url === url && noRedraw === void 0) {
            noRedraw = true;
          }
          this._url = url;
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        },
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
        // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
        // callback is called when the tile has been loaded.
        createTile: function(coords, done) {
          var tile = document.createElement("img");
          on(tile, "load", bind(this._tileOnLoad, this, done, tile));
          on(tile, "error", bind(this._tileOnError, this, done, tile));
          if (this.options.crossOrigin || this.options.crossOrigin === "") {
            tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
          }
          if (typeof this.options.referrerPolicy === "string") {
            tile.referrerPolicy = this.options.referrerPolicy;
          }
          tile.alt = "";
          tile.src = this.getTileUrl(coords);
          return tile;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(coords) {
          var data = {
            r: Browser.retina ? "@2x" : "",
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
              data["y"] = invertedY;
            }
            data["-y"] = invertedY;
          }
          return template(this._url, extend(data, this.options));
        },
        _tileOnLoad: function(done, tile) {
          if (Browser.ielt9) {
            setTimeout(bind(done, this, null, tile), 0);
          } else {
            done(null, tile);
          }
        },
        _tileOnError: function(done, tile, e3) {
          var errorUrl = this.options.errorTileUrl;
          if (errorUrl && tile.getAttribute("src") !== errorUrl) {
            tile.src = errorUrl;
          }
          done(e3, tile);
        },
        _onTileRemove: function(e3) {
          e3.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
          if (zoomReverse) {
            zoom2 = maxZoom - zoom2;
          }
          return zoom2 + zoomOffset;
        },
        _getSubdomain: function(tilePoint) {
          var index2 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
          return this.options.subdomains[index2];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var i, tile;
          for (i in this._tiles) {
            if (this._tiles[i].coords.z !== this._tileZoom) {
              tile = this._tiles[i].el;
              tile.onload = falseFn;
              tile.onerror = falseFn;
              if (!tile.complete) {
                tile.src = emptyImageUrl;
                var coords = this._tiles[i].coords;
                remove(tile);
                delete this._tiles[i];
                this.fire("tileabort", {
                  tile,
                  coords
                });
              }
            }
          }
        },
        _removeTile: function(key) {
          var tile = this._tiles[key];
          if (!tile) {
            return;
          }
          tile.el.setAttribute("src", emptyImageUrl);
          return GridLayer.prototype._removeTile.call(this, key);
        },
        _tileReady: function(coords, err, tile) {
          if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
            return;
          }
          return GridLayer.prototype._tileReady.call(this, coords, err, tile);
        }
      });
      function tileLayer2(url, options) {
        return new TileLayer(url, options);
      }
      var TileLayerWMS = TileLayer.extend({
        // @section
        // @aka TileLayer.WMS options
        // If any custom options not documented here are used, they will be sent to the
        // WMS server as extra parameters in each request URL. This can be useful for
        // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
        defaultWmsParams: {
          service: "WMS",
          request: "GetMap",
          // @option layers: String = ''
          // **(required)** Comma-separated list of WMS layers to show.
          layers: "",
          // @option styles: String = ''
          // Comma-separated list of WMS styles.
          styles: "",
          // @option format: String = 'image/jpeg'
          // WMS image format (use `'image/png'` for layers with transparency).
          format: "image/jpeg",
          // @option transparent: Boolean = false
          // If `true`, the WMS service will return images with transparency.
          transparent: false,
          // @option version: String = '1.1.1'
          // Version of the WMS service to use
          version: "1.1.1"
        },
        options: {
          // @option crs: CRS = null
          // Coordinate Reference System to use for the WMS requests, defaults to
          // map CRS. Don't change this if you're not sure what it means.
          crs: null,
          // @option uppercase: Boolean = false
          // If `true`, WMS request parameter keys will be uppercase.
          uppercase: false
        },
        initialize: function(url, options) {
          this._url = url;
          var wmsParams = extend({}, this.defaultWmsParams);
          for (var i in options) {
            if (!(i in this.options)) {
              wmsParams[i] = options[i];
            }
          }
          options = setOptions(this, options);
          var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
          var tileSize = this.getTileSize();
          wmsParams.width = tileSize.x * realRetina;
          wmsParams.height = tileSize.y * realRetina;
          this.wmsParams = wmsParams;
        },
        onAdd: function(map2) {
          this._crs = this.options.crs || map2.options.crs;
          this._wmsVersion = parseFloat(this.wmsParams.version);
          var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[projectionKey] = this._crs.code;
          TileLayer.prototype.onAdd.call(this, map2);
        },
        getTileUrl: function(coords) {
          var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
          return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(params, noRedraw) {
          extend(this.wmsParams, params);
          if (!noRedraw) {
            this.redraw();
          }
          return this;
        }
      });
      function tileLayerWMS(url, options) {
        return new TileLayerWMS(url, options);
      }
      TileLayer.WMS = TileLayerWMS;
      tileLayer2.wms = tileLayerWMS;
      var Renderer = Layer.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(options) {
          setOptions(this, options);
          stamp(this);
          this._layers = this._layers || {};
        },
        onAdd: function() {
          if (!this._container) {
            this._initContainer();
            addClass(this._container, "leaflet-zoom-animated");
          }
          this.getPane().appendChild(this._container);
          this._update();
          this.on("update", this._updatePaths, this);
        },
        onRemove: function() {
          this.off("update", this._updatePaths, this);
          this._destroyContainer();
        },
        getEvents: function() {
          var events = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd
          };
          if (this._zoomAnimated) {
            events.zoomanim = this._onAnimZoom;
          }
          return events;
        },
        _onAnimZoom: function(ev) {
          this._updateTransform(ev.center, ev.zoom);
        },
        _onZoom: function() {
          this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function(center, zoom2) {
          var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
          if (Browser.any3d) {
            setTransform(this._container, topLeftOffset, scale2);
          } else {
            setPosition(this._container, topLeftOffset);
          }
        },
        _reset: function() {
          this._update();
          this._updateTransform(this._center, this._zoom);
          for (var id in this._layers) {
            this._layers[id]._reset();
          }
        },
        _onZoomEnd: function() {
          for (var id in this._layers) {
            this._layers[id]._project();
          }
        },
        _updatePaths: function() {
          for (var id in this._layers) {
            this._layers[id]._update();
          }
        },
        _update: function() {
          var p = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
          this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
          this._center = this._map.getCenter();
          this._zoom = this._map.getZoom();
        }
      });
      var Canvas = Renderer.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var events = Renderer.prototype.getEvents.call(this);
          events.viewprereset = this._onViewPreReset;
          return events;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = true;
        },
        onAdd: function() {
          Renderer.prototype.onAdd.call(this);
          this._draw();
        },
        _initContainer: function() {
          var container = this._container = document.createElement("canvas");
          on(container, "mousemove", this._onMouseMove, this);
          on(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
          on(container, "mouseout", this._handleMouseOut, this);
          container["_leaflet_disable_events"] = true;
          this._ctx = container.getContext("2d");
        },
        _destroyContainer: function() {
          cancelAnimFrame(this._redrawRequest);
          delete this._ctx;
          remove(this._container);
          off(this._container);
          delete this._container;
        },
        _updatePaths: function() {
          if (this._postponeUpdatePaths) {
            return;
          }
          var layer;
          this._redrawBounds = null;
          for (var id in this._layers) {
            layer = this._layers[id];
            layer._update();
          }
          this._redraw();
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b2 = this._bounds, container = this._container, size = b2.getSize(), m = Browser.retina ? 2 : 1;
          setPosition(container, b2.min);
          container.width = m * size.x;
          container.height = m * size.y;
          container.style.width = size.x + "px";
          container.style.height = size.y + "px";
          if (Browser.retina) {
            this._ctx.scale(2, 2);
          }
          this._ctx.translate(-b2.min.x, -b2.min.y);
          this.fire("update");
        },
        _reset: function() {
          Renderer.prototype._reset.call(this);
          if (this._postponeUpdatePaths) {
            this._postponeUpdatePaths = false;
            this._updatePaths();
          }
        },
        _initPath: function(layer) {
          this._updateDashArray(layer);
          this._layers[stamp(layer)] = layer;
          var order = layer._order = {
            layer,
            prev: this._drawLast,
            next: null
          };
          if (this._drawLast) {
            this._drawLast.next = order;
          }
          this._drawLast = order;
          this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(layer) {
          this._requestRedraw(layer);
        },
        _removePath: function(layer) {
          var order = layer._order;
          var next = order.next;
          var prev = order.prev;
          if (next) {
            next.prev = prev;
          } else {
            this._drawLast = prev;
          }
          if (prev) {
            prev.next = next;
          } else {
            this._drawFirst = next;
          }
          delete layer._order;
          delete this._layers[stamp(layer)];
          this._requestRedraw(layer);
        },
        _updatePath: function(layer) {
          this._extendRedrawBounds(layer);
          layer._project();
          layer._update();
          this._requestRedraw(layer);
        },
        _updateStyle: function(layer) {
          this._updateDashArray(layer);
          this._requestRedraw(layer);
        },
        _updateDashArray: function(layer) {
          if (typeof layer.options.dashArray === "string") {
            var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
            for (i = 0; i < parts.length; i++) {
              dashValue = Number(parts[i]);
              if (isNaN(dashValue)) {
                return;
              }
              dashArray.push(dashValue);
            }
            layer.options._dashArray = dashArray;
          } else {
            layer.options._dashArray = layer.options.dashArray;
          }
        },
        _requestRedraw: function(layer) {
          if (!this._map) {
            return;
          }
          this._extendRedrawBounds(layer);
          this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
        },
        _extendRedrawBounds: function(layer) {
          if (layer._pxBounds) {
            var padding = (layer.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new Bounds();
            this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
            this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
          }
        },
        _redraw: function() {
          this._redrawRequest = null;
          if (this._redrawBounds) {
            this._redrawBounds.min._floor();
            this._redrawBounds.max._ceil();
          }
          this._clear();
          this._draw();
          this._redrawBounds = null;
        },
        _clear: function() {
          var bounds = this._redrawBounds;
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
          } else {
            this._ctx.save();
            this._ctx.setTransform(1, 0, 0, 1, 0, 0);
            this._ctx.clearRect(0, 0, this._container.width, this._container.height);
            this._ctx.restore();
          }
        },
        _draw: function() {
          var layer, bounds = this._redrawBounds;
          this._ctx.save();
          if (bounds) {
            var size = bounds.getSize();
            this._ctx.beginPath();
            this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
            this._ctx.clip();
          }
          this._drawing = true;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
              layer._updatePath();
            }
          }
          this._drawing = false;
          this._ctx.restore();
        },
        _updatePoly: function(layer, closed) {
          if (!this._drawing) {
            return;
          }
          var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
          if (!len) {
            return;
          }
          ctx.beginPath();
          for (i = 0; i < len; i++) {
            for (j = 0, len2 = parts[i].length; j < len2; j++) {
              p = parts[i][j];
              ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
            }
            if (closed) {
              ctx.closePath();
            }
          }
          this._fillStroke(ctx, layer);
        },
        _updateCircle: function(layer) {
          if (!this._drawing || layer._empty()) {
            return;
          }
          var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s2 = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
          if (s2 !== 1) {
            ctx.save();
            ctx.scale(1, s2);
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y / s2, r, 0, Math.PI * 2, false);
          if (s2 !== 1) {
            ctx.restore();
          }
          this._fillStroke(ctx, layer);
        },
        _fillStroke: function(ctx, layer) {
          var options = layer.options;
          if (options.fill) {
            ctx.globalAlpha = options.fillOpacity;
            ctx.fillStyle = options.fillColor || options.color;
            ctx.fill(options.fillRule || "evenodd");
          }
          if (options.stroke && options.weight !== 0) {
            if (ctx.setLineDash) {
              ctx.setLineDash(layer.options && layer.options._dashArray || []);
            }
            ctx.globalAlpha = options.opacity;
            ctx.lineWidth = options.weight;
            ctx.strokeStyle = options.color;
            ctx.lineCap = options.lineCap;
            ctx.lineJoin = options.lineJoin;
            ctx.stroke();
          }
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(e3) {
          var point = this._map.mouseEventToLayerPoint(e3), layer, clickedLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              if (!(e3.type === "click" || e3.type === "preclick") || !this._map._draggableMoved(layer)) {
                clickedLayer = layer;
              }
            }
          }
          this._fireEvent(clickedLayer ? [clickedLayer] : false, e3);
        },
        _onMouseMove: function(e3) {
          if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
            return;
          }
          var point = this._map.mouseEventToLayerPoint(e3);
          this._handleMouseHover(e3, point);
        },
        _handleMouseOut: function(e3) {
          var layer = this._hoveredLayer;
          if (layer) {
            removeClass(this._container, "leaflet-interactive");
            this._fireEvent([layer], e3, "mouseout");
            this._hoveredLayer = null;
            this._mouseHoverThrottled = false;
          }
        },
        _handleMouseHover: function(e3, point) {
          if (this._mouseHoverThrottled) {
            return;
          }
          var layer, candidateHoveredLayer;
          for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (layer.options.interactive && layer._containsPoint(point)) {
              candidateHoveredLayer = layer;
            }
          }
          if (candidateHoveredLayer !== this._hoveredLayer) {
            this._handleMouseOut(e3);
            if (candidateHoveredLayer) {
              addClass(this._container, "leaflet-interactive");
              this._fireEvent([candidateHoveredLayer], e3, "mouseover");
              this._hoveredLayer = candidateHoveredLayer;
            }
          }
          this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e3);
          this._mouseHoverThrottled = true;
          setTimeout(bind(function() {
            this._mouseHoverThrottled = false;
          }, this), 32);
        },
        _fireEvent: function(layers2, e3, type) {
          this._map._fireDOMEvent(e3, type || e3.type, layers2);
        },
        _bringToFront: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next = order.next;
          var prev = order.prev;
          if (next) {
            next.prev = prev;
          } else {
            return;
          }
          if (prev) {
            prev.next = next;
          } else if (next) {
            this._drawFirst = next;
          }
          order.prev = this._drawLast;
          this._drawLast.next = order;
          order.next = null;
          this._drawLast = order;
          this._requestRedraw(layer);
        },
        _bringToBack: function(layer) {
          var order = layer._order;
          if (!order) {
            return;
          }
          var next = order.next;
          var prev = order.prev;
          if (prev) {
            prev.next = next;
          } else {
            return;
          }
          if (next) {
            next.prev = prev;
          } else if (prev) {
            this._drawLast = prev;
          }
          order.prev = null;
          order.next = this._drawFirst;
          this._drawFirst.prev = order;
          this._drawFirst = order;
          this._requestRedraw(layer);
        }
      });
      function canvas(options) {
        return Browser.canvas ? new Canvas(options) : null;
      }
      var vmlCreate = (function() {
        try {
          document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
          return function(name) {
            return document.createElement("<lvml:" + name + ' class="lvml">');
          };
        } catch (e3) {
        }
        return function(name) {
          return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      })();
      var vmlMixin = {
        _initContainer: function() {
          this._container = create$1("div", "leaflet-vml-container");
        },
        _update: function() {
          if (this._map._animatingZoom) {
            return;
          }
          Renderer.prototype._update.call(this);
          this.fire("update");
        },
        _initPath: function(layer) {
          var container = layer._container = vmlCreate("shape");
          addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
          container.coordsize = "1 1";
          layer._path = vmlCreate("path");
          container.appendChild(layer._path);
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          var container = layer._container;
          this._container.appendChild(container);
          if (layer.options.interactive) {
            layer.addInteractiveTarget(container);
          }
        },
        _removePath: function(layer) {
          var container = layer._container;
          remove(container);
          layer.removeInteractiveTarget(container);
          delete this._layers[stamp(layer)];
        },
        _updateStyle: function(layer) {
          var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
          container.stroked = !!options.stroke;
          container.filled = !!options.fill;
          if (options.stroke) {
            if (!stroke) {
              stroke = layer._stroke = vmlCreate("stroke");
            }
            container.appendChild(stroke);
            stroke.weight = options.weight + "px";
            stroke.color = options.color;
            stroke.opacity = options.opacity;
            if (options.dashArray) {
              stroke.dashStyle = isArray(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
            } else {
              stroke.dashStyle = "";
            }
            stroke.endcap = options.lineCap.replace("butt", "flat");
            stroke.joinstyle = options.lineJoin;
          } else if (stroke) {
            container.removeChild(stroke);
            layer._stroke = null;
          }
          if (options.fill) {
            if (!fill) {
              fill = layer._fill = vmlCreate("fill");
            }
            container.appendChild(fill);
            fill.color = options.fillColor || options.color;
            fill.opacity = options.fillOpacity;
          } else if (fill) {
            container.removeChild(fill);
            layer._fill = null;
          }
        },
        _updateCircle: function(layer) {
          var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
          this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
        },
        _setPath: function(layer, path) {
          layer._path.v = path;
        },
        _bringToFront: function(layer) {
          toFront(layer._container);
        },
        _bringToBack: function(layer) {
          toBack(layer._container);
        }
      };
      var create = Browser.vml ? vmlCreate : svgCreate;
      var SVG = Renderer.extend({
        _initContainer: function() {
          this._container = create("svg");
          this._container.setAttribute("pointer-events", "none");
          this._rootGroup = create("g");
          this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          remove(this._container);
          off(this._container);
          delete this._container;
          delete this._rootGroup;
          delete this._svgSize;
        },
        _update: function() {
          if (this._map._animatingZoom && this._bounds) {
            return;
          }
          Renderer.prototype._update.call(this);
          var b2 = this._bounds, size = b2.getSize(), container = this._container;
          if (!this._svgSize || !this._svgSize.equals(size)) {
            this._svgSize = size;
            container.setAttribute("width", size.x);
            container.setAttribute("height", size.y);
          }
          setPosition(container, b2.min);
          container.setAttribute("viewBox", [b2.min.x, b2.min.y, size.x, size.y].join(" "));
          this.fire("update");
        },
        // methods below are called by vector layers implementations
        _initPath: function(layer) {
          var path = layer._path = create("path");
          if (layer.options.className) {
            addClass(path, layer.options.className);
          }
          if (layer.options.interactive) {
            addClass(path, "leaflet-interactive");
          }
          this._updateStyle(layer);
          this._layers[stamp(layer)] = layer;
        },
        _addPath: function(layer) {
          if (!this._rootGroup) {
            this._initContainer();
          }
          this._rootGroup.appendChild(layer._path);
          layer.addInteractiveTarget(layer._path);
        },
        _removePath: function(layer) {
          remove(layer._path);
          layer.removeInteractiveTarget(layer._path);
          delete this._layers[stamp(layer)];
        },
        _updatePath: function(layer) {
          layer._project();
          layer._update();
        },
        _updateStyle: function(layer) {
          var path = layer._path, options = layer.options;
          if (!path) {
            return;
          }
          if (options.stroke) {
            path.setAttribute("stroke", options.color);
            path.setAttribute("stroke-opacity", options.opacity);
            path.setAttribute("stroke-width", options.weight);
            path.setAttribute("stroke-linecap", options.lineCap);
            path.setAttribute("stroke-linejoin", options.lineJoin);
            if (options.dashArray) {
              path.setAttribute("stroke-dasharray", options.dashArray);
            } else {
              path.removeAttribute("stroke-dasharray");
            }
            if (options.dashOffset) {
              path.setAttribute("stroke-dashoffset", options.dashOffset);
            } else {
              path.removeAttribute("stroke-dashoffset");
            }
          } else {
            path.setAttribute("stroke", "none");
          }
          if (options.fill) {
            path.setAttribute("fill", options.fillColor || options.color);
            path.setAttribute("fill-opacity", options.fillOpacity);
            path.setAttribute("fill-rule", options.fillRule || "evenodd");
          } else {
            path.setAttribute("fill", "none");
          }
        },
        _updatePoly: function(layer, closed) {
          this._setPath(layer, pointsToPath(layer._parts, closed));
        },
        _updateCircle: function(layer) {
          var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
          var d2 = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
          this._setPath(layer, d2);
        },
        _setPath: function(layer, path) {
          layer._path.setAttribute("d", path);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(layer) {
          toFront(layer._path);
        },
        _bringToBack: function(layer) {
          toBack(layer._path);
        }
      });
      if (Browser.vml) {
        SVG.include(vmlMixin);
      }
      function svg(options) {
        return Browser.svg || Browser.vml ? new SVG(options) : null;
      }
      Map.include({
        // @namespace Map; @method getRenderer(layer: Path): Renderer
        // Returns the instance of `Renderer` that should be used to render the given
        // `Path`. It will ensure that the `renderer` options of the map and paths
        // are respected, and that the renderers do exist on the map.
        getRenderer: function(layer) {
          var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
          if (!renderer) {
            renderer = this._renderer = this._createRenderer();
          }
          if (!this.hasLayer(renderer)) {
            this.addLayer(renderer);
          }
          return renderer;
        },
        _getPaneRenderer: function(name) {
          if (name === "overlayPane" || name === void 0) {
            return false;
          }
          var renderer = this._paneRenderers[name];
          if (renderer === void 0) {
            renderer = this._createRenderer({ pane: name });
            this._paneRenderers[name] = renderer;
          }
          return renderer;
        },
        _createRenderer: function(options) {
          return this.options.preferCanvas && canvas(options) || svg(options);
        }
      });
      var Rectangle = Polygon.extend({
        initialize: function(latLngBounds, options) {
          Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(latLngBounds) {
          return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
        },
        _boundsToLatLngs: function(latLngBounds) {
          latLngBounds = toLatLngBounds(latLngBounds);
          return [
            latLngBounds.getSouthWest(),
            latLngBounds.getNorthWest(),
            latLngBounds.getNorthEast(),
            latLngBounds.getSouthEast()
          ];
        }
      });
      function rectangle(latLngBounds, options) {
        return new Rectangle(latLngBounds, options);
      }
      SVG.create = create;
      SVG.pointsToPath = pointsToPath;
      GeoJSON.geometryToLayer = geometryToLayer;
      GeoJSON.coordsToLatLng = coordsToLatLng;
      GeoJSON.coordsToLatLngs = coordsToLatLngs;
      GeoJSON.latLngToCoords = latLngToCoords;
      GeoJSON.latLngsToCoords = latLngsToCoords;
      GeoJSON.getFeature = getFeature;
      GeoJSON.asFeature = asFeature;
      Map.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: true
      });
      var BoxZoom = Handler.extend({
        initialize: function(map2) {
          this._map = map2;
          this._container = map2._container;
          this._pane = map2._panes.overlayPane;
          this._resetStateTimeout = 0;
          map2.on("unload", this._destroy, this);
        },
        addHooks: function() {
          on(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          off(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          remove(this._pane);
          delete this._pane;
        },
        _resetState: function() {
          this._resetStateTimeout = 0;
          this._moved = false;
        },
        _clearDeferredResetState: function() {
          if (this._resetStateTimeout !== 0) {
            clearTimeout(this._resetStateTimeout);
            this._resetStateTimeout = 0;
          }
        },
        _onMouseDown: function(e3) {
          if (!e3.shiftKey || e3.which !== 1 && e3.button !== 1) {
            return false;
          }
          this._clearDeferredResetState();
          this._resetState();
          disableTextSelection();
          disableImageDrag();
          this._startPoint = this._map.mouseEventToContainerPoint(e3);
          on(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(e3) {
          if (!this._moved) {
            this._moved = true;
            this._box = create$1("div", "leaflet-zoom-box", this._container);
            addClass(this._container, "leaflet-crosshair");
            this._map.fire("boxzoomstart");
          }
          this._point = this._map.mouseEventToContainerPoint(e3);
          var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
          setPosition(this._box, bounds.min);
          this._box.style.width = size.x + "px";
          this._box.style.height = size.y + "px";
        },
        _finish: function() {
          if (this._moved) {
            remove(this._box);
            removeClass(this._container, "leaflet-crosshair");
          }
          enableTextSelection();
          enableImageDrag();
          off(document, {
            contextmenu: stop,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(e3) {
          if (e3.which !== 1 && e3.button !== 1) {
            return;
          }
          this._finish();
          if (!this._moved) {
            return;
          }
          this._clearDeferredResetState();
          this._resetStateTimeout = setTimeout(bind(this._resetState, this), 0);
          var bounds = new LatLngBounds(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
        },
        _onKeyDown: function(e3) {
          if (e3.keyCode === 27) {
            this._finish();
            this._clearDeferredResetState();
            this._resetState();
          }
        }
      });
      Map.addInitHook("addHandler", "boxZoom", BoxZoom);
      Map.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: true
      });
      var DoubleClickZoom = Handler.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(e3) {
          var map2 = this._map, oldZoom = map2.getZoom(), delta = map2.options.zoomDelta, zoom2 = e3.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
          if (map2.options.doubleClickZoom === "center") {
            map2.setZoom(zoom2);
          } else {
            map2.setZoomAround(e3.containerPoint, zoom2);
          }
        }
      });
      Map.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
      Map.mergeOptions({
        // @option dragging: Boolean = true
        // Whether the map is draggable with mouse/touch or not.
        dragging: true,
        // @section Panning Inertia Options
        // @option inertia: Boolean = *
        // If enabled, panning of the map will have an inertia effect where
        // the map builds momentum while dragging and continues moving in
        // the same direction for some time. Feels especially nice on touch
        // devices. Enabled by default.
        inertia: true,
        // @option inertiaDeceleration: Number = 3000
        // The rate with which the inertial movement slows down, in pixels/second².
        inertiaDeceleration: 3400,
        // px/s^2
        // @option inertiaMaxSpeed: Number = Infinity
        // Max speed of the inertial movement, in pixels/second.
        inertiaMaxSpeed: Infinity,
        // px/s
        // @option easeLinearity: Number = 0.2
        easeLinearity: 0.2,
        // TODO refactor, move to CRS
        // @option worldCopyJump: Boolean = false
        // With this option enabled, the map tracks when you pan to another "copy"
        // of the world and seamlessly jumps to the original one so that all overlays
        // like markers and vector layers are still visible.
        worldCopyJump: false,
        // @option maxBoundsViscosity: Number = 0.0
        // If `maxBounds` is set, this option will control how solid the bounds
        // are when dragging the map around. The default value of `0.0` allows the
        // user to drag outside the bounds at normal speed, higher values will
        // slow down map dragging outside bounds, and `1.0` makes the bounds fully
        // solid, preventing the user from dragging outside the bounds.
        maxBoundsViscosity: 0
      });
      var Drag = Handler.extend({
        addHooks: function() {
          if (!this._draggable) {
            var map2 = this._map;
            this._draggable = new Draggable(map2._mapPane, map2._container);
            this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this);
            this._draggable.on("predrag", this._onPreDragLimit, this);
            if (map2.options.worldCopyJump) {
              this._draggable.on("predrag", this._onPreDragWrap, this);
              map2.on("zoomend", this._onZoomEnd, this);
              map2.whenReady(this._onZoomEnd, this);
            }
          }
          addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
          this._draggable.enable();
          this._positions = [];
          this._times = [];
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-grab");
          removeClass(this._map._container, "leaflet-touch-drag");
          this._draggable.disable();
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        moving: function() {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function() {
          var map2 = this._map;
          map2._stop();
          if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var bounds = toLatLngBounds(this._map.options.maxBounds);
            this._offsetLimit = toBounds(
              this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            );
            this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
          } else {
            this._offsetLimit = null;
          }
          map2.fire("movestart").fire("dragstart");
          if (map2.options.inertia) {
            this._positions = [];
            this._times = [];
          }
        },
        _onDrag: function(e3) {
          if (this._map.options.inertia) {
            var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(pos);
            this._times.push(time);
            this._prunePositions(time);
          }
          this._map.fire("move", e3).fire("drag", e3);
        },
        _prunePositions: function(time) {
          while (this._positions.length > 1 && time - this._times[0] > 50) {
            this._positions.shift();
            this._times.shift();
          }
        },
        _onZoomEnd: function() {
          var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
          this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(value, threshold) {
          return value - (value - threshold) * this._viscosity;
        },
        _onPreDragLimit: function() {
          if (!this._viscosity || !this._offsetLimit) {
            return;
          }
          var offset = this._draggable._newPos.subtract(this._draggable._startPos);
          var limit = this._offsetLimit;
          if (offset.x < limit.min.x) {
            offset.x = this._viscousLimit(offset.x, limit.min.x);
          }
          if (offset.y < limit.min.y) {
            offset.y = this._viscousLimit(offset.y, limit.min.y);
          }
          if (offset.x > limit.max.x) {
            offset.x = this._viscousLimit(offset.x, limit.max.x);
          }
          if (offset.y > limit.max.y) {
            offset.y = this._viscousLimit(offset.y, limit.max.y);
          }
          this._draggable._newPos = this._draggable._startPos.add(offset);
        },
        _onPreDragWrap: function() {
          var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x2 = this._draggable._newPos.x, newX1 = (x2 - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x2 + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
          this._draggable._absPos = this._draggable._newPos.clone();
          this._draggable._newPos.x = newX;
        },
        _onDragEnd: function(e3) {
          var map2 = this._map, options = map2.options, noInertia = !options.inertia || e3.noInertia || this._times.length < 2;
          map2.fire("dragend", e3);
          if (noInertia) {
            map2.fire("moveend");
          } else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
            if (!offset.x && !offset.y) {
              map2.fire("moveend");
            } else {
              offset = map2._limitOffset(offset, map2.options.maxBounds);
              requestAnimFrame(function() {
                map2.panBy(offset, {
                  duration: decelerationDuration,
                  easeLinearity: ease,
                  noMoveStart: true,
                  animate: true
                });
              });
            }
          }
        }
      });
      Map.addInitHook("addHandler", "dragging", Drag);
      Map.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: true,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var Keyboard = Handler.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
        },
        initialize: function(map2) {
          this._map = map2;
          this._setPanDelta(map2.options.keyboardPanDelta);
          this._setZoomDelta(map2.options.zoomDelta);
        },
        addHooks: function() {
          var container = this._map._container;
          if (container.tabIndex <= 0) {
            container.tabIndex = "0";
          }
          on(container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks();
          off(this._map._container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this);
          this._map.off({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        _onMouseDown: function() {
          if (this._focused) {
            return;
          }
          var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
          this._map._container.focus();
          window.scrollTo(left, top);
        },
        _onFocus: function() {
          this._focused = true;
          this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = false;
          this._map.fire("blur");
        },
        _setPanDelta: function(panDelta) {
          var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
          for (i = 0, len = codes.left.length; i < len; i++) {
            keys[codes.left[i]] = [-1 * panDelta, 0];
          }
          for (i = 0, len = codes.right.length; i < len; i++) {
            keys[codes.right[i]] = [panDelta, 0];
          }
          for (i = 0, len = codes.down.length; i < len; i++) {
            keys[codes.down[i]] = [0, panDelta];
          }
          for (i = 0, len = codes.up.length; i < len; i++) {
            keys[codes.up[i]] = [0, -1 * panDelta];
          }
        },
        _setZoomDelta: function(zoomDelta) {
          var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
          for (i = 0, len = codes.zoomIn.length; i < len; i++) {
            keys[codes.zoomIn[i]] = zoomDelta;
          }
          for (i = 0, len = codes.zoomOut.length; i < len; i++) {
            keys[codes.zoomOut[i]] = -zoomDelta;
          }
        },
        _addHooks: function() {
          on(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          off(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(e3) {
          if (e3.altKey || e3.ctrlKey || e3.metaKey) {
            return;
          }
          var key = e3.keyCode, map2 = this._map, offset;
          if (key in this._panKeys) {
            if (!map2._panAnim || !map2._panAnim._inProgress) {
              offset = this._panKeys[key];
              if (e3.shiftKey) {
                offset = toPoint(offset).multiplyBy(3);
              }
              if (map2.options.maxBounds) {
                offset = map2._limitOffset(toPoint(offset), map2.options.maxBounds);
              }
              if (map2.options.worldCopyJump) {
                var newLatLng = map2.wrapLatLng(map2.unproject(map2.project(map2.getCenter()).add(offset)));
                map2.panTo(newLatLng);
              } else {
                map2.panBy(offset);
              }
            }
          } else if (key in this._zoomKeys) {
            map2.setZoom(map2.getZoom() + (e3.shiftKey ? 3 : 1) * this._zoomKeys[key]);
          } else if (key === 27 && map2._popup && map2._popup.options.closeOnEscapeKey) {
            map2.closePopup();
          } else {
            return;
          }
          stop(e3);
        }
      });
      Map.addInitHook("addHandler", "keyboard", Keyboard);
      Map.mergeOptions({
        // @section Mouse wheel options
        // @option scrollWheelZoom: Boolean|String = true
        // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
        // it will zoom to the center of the view regardless of where the mouse was.
        scrollWheelZoom: true,
        // @option wheelDebounceTime: Number = 40
        // Limits the rate at which a wheel can fire (in milliseconds). By default
        // user can't zoom via wheel more often than once per 40 ms.
        wheelDebounceTime: 40,
        // @option wheelPxPerZoomLevel: Number = 60
        // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
        // mean a change of one full zoom level. Smaller values will make wheel-zooming
        // faster (and vice versa).
        wheelPxPerZoomLevel: 60
      });
      var ScrollWheelZoom = Handler.extend({
        addHooks: function() {
          on(this._map._container, "wheel", this._onWheelScroll, this);
          this._delta = 0;
        },
        removeHooks: function() {
          off(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(e3) {
          var delta = getWheelDelta(e3);
          var debounce = this._map.options.wheelDebounceTime;
          this._delta += delta;
          this._lastMousePos = this._map.mouseEventToContainerPoint(e3);
          if (!this._startTime) {
            this._startTime = +/* @__PURE__ */ new Date();
          }
          var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer);
          this._timer = setTimeout(bind(this._performZoom, this), left);
          stop(e3);
        },
        _performZoom: function() {
          var map2 = this._map, zoom2 = map2.getZoom(), snap = this._map.options.zoomSnap || 0;
          map2._stop();
          var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map2._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
          this._delta = 0;
          this._startTime = null;
          if (!delta) {
            return;
          }
          if (map2.options.scrollWheelZoom === "center") {
            map2.setZoom(zoom2 + delta);
          } else {
            map2.setZoomAround(this._lastMousePos, zoom2 + delta);
          }
        }
      });
      Map.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
      var tapHoldDelay = 600;
      Map.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var TapHold = Handler.extend({
        addHooks: function() {
          on(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          off(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(e3) {
          clearTimeout(this._holdTimeout);
          if (e3.touches.length !== 1) {
            return;
          }
          var first = e3.touches[0];
          this._startPos = this._newPos = new Point(first.clientX, first.clientY);
          this._holdTimeout = setTimeout(bind(function() {
            this._cancel();
            if (!this._isTapValid()) {
              return;
            }
            on(document, "touchend", preventDefault);
            on(document, "touchend touchcancel", this._cancelClickPrevent);
            this._simulateEvent("contextmenu", first);
          }, this), tapHoldDelay);
          on(document, "touchend touchcancel contextmenu", this._cancel, this);
          on(document, "touchmove", this._onMove, this);
        },
        _cancelClickPrevent: function cancelClickPrevent() {
          off(document, "touchend", preventDefault);
          off(document, "touchend touchcancel", cancelClickPrevent);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout);
          off(document, "touchend touchcancel contextmenu", this._cancel, this);
          off(document, "touchmove", this._onMove, this);
        },
        _onMove: function(e3) {
          var first = e3.touches[0];
          this._newPos = new Point(first.clientX, first.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(type, e3) {
          var simulatedEvent = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            // detail: 1,
            screenX: e3.screenX,
            screenY: e3.screenY,
            clientX: e3.clientX,
            clientY: e3.clientY
            // button: 2,
            // buttons: 2
          });
          simulatedEvent._simulated = true;
          e3.target.dispatchEvent(simulatedEvent);
        }
      });
      Map.addInitHook("addHandler", "tapHold", TapHold);
      Map.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: Browser.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: true
      });
      var TouchZoom = Handler.extend({
        addHooks: function() {
          addClass(this._map._container, "leaflet-touch-zoom");
          on(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          removeClass(this._map._container, "leaflet-touch-zoom");
          off(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(e3) {
          var map2 = this._map;
          if (!e3.touches || e3.touches.length !== 2 || map2._animatingZoom || this._zooming) {
            return;
          }
          var p1 = map2.mouseEventToContainerPoint(e3.touches[0]), p2 = map2.mouseEventToContainerPoint(e3.touches[1]);
          this._centerPoint = map2.getSize()._divideBy(2);
          this._startLatLng = map2.containerPointToLatLng(this._centerPoint);
          if (map2.options.touchZoom !== "center") {
            this._pinchStartLatLng = map2.containerPointToLatLng(p1.add(p2)._divideBy(2));
          }
          this._startDist = p1.distanceTo(p2);
          this._startZoom = map2.getZoom();
          this._moved = false;
          this._zooming = true;
          map2._stop();
          on(document, "touchmove", this._onTouchMove, this);
          on(document, "touchend touchcancel", this._onTouchEnd, this);
          preventDefault(e3);
        },
        _onTouchMove: function(e3) {
          if (!e3.touches || e3.touches.length !== 2 || !this._zooming) {
            return;
          }
          var map2 = this._map, p1 = map2.mouseEventToContainerPoint(e3.touches[0]), p2 = map2.mouseEventToContainerPoint(e3.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
          this._zoom = map2.getScaleZoom(scale2, this._startZoom);
          if (!map2.options.bounceAtZoomLimits && (this._zoom < map2.getMinZoom() && scale2 < 1 || this._zoom > map2.getMaxZoom() && scale2 > 1)) {
            this._zoom = map2._limitZoom(this._zoom);
          }
          if (map2.options.touchZoom === "center") {
            this._center = this._startLatLng;
            if (scale2 === 1) {
              return;
            }
          } else {
            var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
            if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
              return;
            }
            this._center = map2.unproject(map2.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
          }
          if (!this._moved) {
            map2._moveStart(true, false);
            this._moved = true;
          }
          cancelAnimFrame(this._animRequest);
          var moveFn = bind(map2._move, map2, this._center, this._zoom, { pinch: true, round: false }, void 0);
          this._animRequest = requestAnimFrame(moveFn, this, true);
          preventDefault(e3);
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = false;
            return;
          }
          this._zooming = false;
          cancelAnimFrame(this._animRequest);
          off(document, "touchmove", this._onTouchMove, this);
          off(document, "touchend touchcancel", this._onTouchEnd, this);
          if (this._map.options.zoomAnimation) {
            this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
          } else {
            this._map._resetView(this._center, this._map._limitZoom(this._zoom));
          }
        }
      });
      Map.addInitHook("addHandler", "touchZoom", TouchZoom);
      Map.BoxZoom = BoxZoom;
      Map.DoubleClickZoom = DoubleClickZoom;
      Map.Drag = Drag;
      Map.Keyboard = Keyboard;
      Map.ScrollWheelZoom = ScrollWheelZoom;
      Map.TapHold = TapHold;
      Map.TouchZoom = TouchZoom;
      exports2.Bounds = Bounds;
      exports2.Browser = Browser;
      exports2.CRS = CRS;
      exports2.Canvas = Canvas;
      exports2.Circle = Circle;
      exports2.CircleMarker = CircleMarker;
      exports2.Class = Class;
      exports2.Control = Control;
      exports2.DivIcon = DivIcon;
      exports2.DivOverlay = DivOverlay;
      exports2.DomEvent = DomEvent;
      exports2.DomUtil = DomUtil;
      exports2.Draggable = Draggable;
      exports2.Evented = Evented;
      exports2.FeatureGroup = FeatureGroup;
      exports2.GeoJSON = GeoJSON;
      exports2.GridLayer = GridLayer;
      exports2.Handler = Handler;
      exports2.Icon = Icon;
      exports2.ImageOverlay = ImageOverlay;
      exports2.LatLng = LatLng;
      exports2.LatLngBounds = LatLngBounds;
      exports2.Layer = Layer;
      exports2.LayerGroup = LayerGroup;
      exports2.LineUtil = LineUtil;
      exports2.Map = Map;
      exports2.Marker = Marker;
      exports2.Mixin = Mixin;
      exports2.Path = Path;
      exports2.Point = Point;
      exports2.PolyUtil = PolyUtil;
      exports2.Polygon = Polygon;
      exports2.Polyline = Polyline;
      exports2.Popup = Popup;
      exports2.PosAnimation = PosAnimation;
      exports2.Projection = index;
      exports2.Rectangle = Rectangle;
      exports2.Renderer = Renderer;
      exports2.SVG = SVG;
      exports2.SVGOverlay = SVGOverlay;
      exports2.TileLayer = TileLayer;
      exports2.Tooltip = Tooltip2;
      exports2.Transformation = Transformation;
      exports2.Util = Util;
      exports2.VideoOverlay = VideoOverlay;
      exports2.bind = bind;
      exports2.bounds = toBounds;
      exports2.canvas = canvas;
      exports2.circle = circle2;
      exports2.circleMarker = circleMarker2;
      exports2.control = control;
      exports2.divIcon = divIcon;
      exports2.extend = extend;
      exports2.featureGroup = featureGroup;
      exports2.geoJSON = geoJSON;
      exports2.geoJson = geoJson;
      exports2.gridLayer = gridLayer;
      exports2.icon = icon;
      exports2.imageOverlay = imageOverlay;
      exports2.latLng = toLatLng;
      exports2.latLngBounds = toLatLngBounds;
      exports2.layerGroup = layerGroup2;
      exports2.map = createMap;
      exports2.marker = marker;
      exports2.point = toPoint;
      exports2.polygon = polygon;
      exports2.polyline = polyline;
      exports2.popup = popup;
      exports2.rectangle = rectangle;
      exports2.setOptions = setOptions;
      exports2.stamp = stamp;
      exports2.svg = svg;
      exports2.svgOverlay = svgOverlay;
      exports2.tileLayer = tileLayer2;
      exports2.tooltip = tooltip;
      exports2.transformation = toTransformation;
      exports2.version = version;
      exports2.videoOverlay = videoOverlay;
      var oldL = window.L;
      exports2.noConflict = function() {
        window.L = oldL;
        return this;
      };
      window.L = exports2;
    }));
  }
});

// node_modules/@primeicons/core/dist/esm/icons/minus.mjs
var e = { name: "minus", meta: { tags: ["minus", "remove", "subtract", "decrease", "less"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M17 9.25C17.4142 9.25 17.75 9.58579 17.75 10C17.75 10.4142 17.4142 10.75 17 10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H17Z", fill: "currentColor", key: "iu8x2q" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-minus.mjs
var Minus = class _Minus extends CoreIcon {
  constructor() {
    super();
    this._icon = e;
  }
  static \u0275fac = function Minus_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Minus)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack02 = ($index, $item) => $item[1]["key"] || $index;
    function Minus_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Minus_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Minus_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Minus_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Minus_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Minus_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Minus_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function Minus_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Minus_For_1_Case_0_Template, 1, 9, ":svg:path")(1, Minus_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, Minus_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, Minus_For_1_Case_3_Template, 1, 7, ":svg:line")(4, Minus_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, Minus_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, Minus_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Minus,
      selectors: [["svg", "data-p-icon", "minus"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function Minus_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, Minus_For_1_Template, 7, 1, null, null, _forTrack02);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Minus, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="minus"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeuix/styles/dist/checkbox/index.mjs
var style = "\n    .p-checkbox {\n        position: relative;\n        display: inline-flex;\n        user-select: none;\n        vertical-align: bottom;\n        width: dt('checkbox.width');\n        height: dt('checkbox.height');\n    }\n\n    .p-checkbox-input {\n        cursor: pointer;\n        appearance: none;\n        position: absolute;\n        inset-block-start: 0;\n        inset-inline-start: 0;\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        margin: 0;\n        opacity: 0;\n        z-index: 1;\n        outline: 0 none;\n        border: 1px solid transparent;\n        border-radius: dt('checkbox.border.radius');\n    }\n\n    .p-checkbox-box {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        border-radius: dt('checkbox.border.radius');\n        border: 1px solid dt('checkbox.border.color');\n        background: dt('checkbox.background');\n        color: dt('checkbox.icon.color');\n        width: dt('checkbox.width');\n        height: dt('checkbox.height');\n        transition:\n            background dt('checkbox.transition.duration'),\n            border-color dt('checkbox.transition.duration'),\n            box-shadow dt('checkbox.transition.duration'),\n            outline-color dt('checkbox.transition.duration');\n        outline-color: transparent;\n        box-shadow: dt('checkbox.shadow');\n    }\n\n    .p-checkbox-indicator {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .p-checkbox-icon,\n    .p-checkbox-indicator svg,\n    .p-checkbox-indicator i {\n        width: dt('checkbox.icon.size');\n        height: dt('checkbox.icon.size');\n        font-size: dt('checkbox.icon.size');\n        transition-duration: dt('checkbox.transition.duration');\n    }\n\n    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        border-color: dt('checkbox.hover.border.color');\n    }\n\n    .p-checkbox-checked .p-checkbox-box {\n        border-color: dt('checkbox.checked.border.color');\n        background: dt('checkbox.checked.background');\n        color: dt('checkbox.icon.checked.color');\n    }\n\n    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        background: dt('checkbox.checked.hover.background');\n        border-color: dt('checkbox.checked.hover.border.color');\n        color: dt('checkbox.icon.checked.hover.color');\n    }\n\n    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n        border-color: dt('checkbox.focus.border.color');\n        box-shadow: dt('checkbox.focus.ring.shadow');\n        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');\n        outline-offset: dt('checkbox.focus.ring.offset');\n    }\n\n    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n        border-color: dt('checkbox.checked.focus.border.color');\n    }\n\n    .p-checkbox.p-invalid > .p-checkbox-box {\n        border-color: dt('checkbox.invalid.border.color');\n    }\n\n    .p-checkbox.p-variant-filled .p-checkbox-box {\n        background: dt('checkbox.filled.background');\n    }\n\n    .p-checkbox-checked.p-variant-filled .p-checkbox-box {\n        background: dt('checkbox.checked.background');\n    }\n\n    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        background: dt('checkbox.checked.hover.background');\n    }\n\n    .p-checkbox.p-disabled {\n        opacity: 1;\n    }\n\n    .p-checkbox.p-disabled .p-checkbox-box {\n        background: dt('checkbox.disabled.background');\n        border-color: dt('checkbox.checked.disabled.border.color');\n        color: dt('checkbox.icon.disabled.color');\n    }\n\n    .p-checkbox-sm,\n    .p-checkbox-sm .p-checkbox-box {\n        width: dt('checkbox.sm.width');\n        height: dt('checkbox.sm.height');\n    }\n\n    .p-checkbox-sm .p-checkbox-icon,\n    .p-checkbox-sm .p-checkbox-indicator svg,\n    .p-checkbox-sm .p-checkbox-indicator i {\n        font-size: dt('checkbox.icon.sm.size');\n        width: dt('checkbox.icon.sm.size');\n        height: dt('checkbox.icon.sm.size');\n    }\n\n    .p-checkbox-lg,\n    .p-checkbox-lg .p-checkbox-box {\n        width: dt('checkbox.lg.width');\n        height: dt('checkbox.lg.height');\n    }\n\n    .p-checkbox-lg .p-checkbox-icon,\n    .p-checkbox-lg .p-checkbox-indicator svg,\n    .p-checkbox-lg .p-checkbox-indicator i {\n        font-size: dt('checkbox.icon.lg.size');\n        width: dt('checkbox.icon.lg.size');\n        height: dt('checkbox.icon.lg.size');\n    }\n";

// node_modules/primeng/fesm2022/primeng-checkbox.mjs
var classes = {
  root: ({ instance }) => [
    "p-checkbox p-component",
    {
      "p-checkbox-checked": instance.checked(),
      "p-disabled": instance.$disabled(),
      "p-invalid": instance.invalid(),
      "p-variant-filled": instance.$variant() === "filled",
      "p-checkbox-sm p-inputfield-sm": instance.size() === "small",
      "p-checkbox-lg p-inputfield-lg": instance.size() === "large"
    }
  ],
  box: "p-checkbox-box",
  input: "p-checkbox-input",
  indicator: "p-checkbox-indicator",
  icon: "p-checkbox-icon"
};
var CheckboxStyle = class _CheckboxStyle extends BaseStyle {
  name = "checkbox";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275CheckboxStyle_BaseFactory = void 0;
    return function CheckboxStyle_Factory(__ngFactoryType__) {
      return (\u0275CheckboxStyle_BaseFactory || (\u0275CheckboxStyle_BaseFactory = \u0275\u0275getInheritedFactory(_CheckboxStyle)))(__ngFactoryType__ || _CheckboxStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _CheckboxStyle,
    factory: _CheckboxStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxStyle, [{
    type: Injectable
  }], null, null);
})();
var CheckboxClasses;
(function(CheckboxClasses2) {
  CheckboxClasses2["root"] = "p-checkbox";
  CheckboxClasses2["box"] = "p-checkbox-box";
  CheckboxClasses2["input"] = "p-checkbox-input";
  CheckboxClasses2["indicator"] = "p-checkbox-indicator";
  CheckboxClasses2["icon"] = "p-checkbox-icon";
})(CheckboxClasses || (CheckboxClasses = {}));
var CHECKBOX_INSTANCE = new InjectionToken("CHECKBOX_INSTANCE");
var CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Checkbox),
  multi: true
};
var Checkbox = class _Checkbox extends BaseEditableHolder {
  componentName = "Checkbox";
  /**
   * Value of the checkbox.
   * @group Props
   */
  value = input(
    ...ngDevMode ? [void 0, { debugName: "value" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Allows to select a boolean value instead of multiple values.
   * @group Props
   */
  binary = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "binary" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
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
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = input(
    ...ngDevMode ? [void 0, { debugName: "tabindex" }] : (
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
   * Inline style of the input element.
   * @group Props
   */
  inputStyle = input(
    ...ngDevMode ? [void 0, { debugName: "inputStyle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Style class of the input element.
   * @group Props
   */
  inputClass = input(
    ...ngDevMode ? [void 0, { debugName: "inputClass" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, it specifies input state as indeterminate.
   * @group Props
   */
  indeterminate = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "indeterminate" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Form control value.
   * @group Props
   */
  formControl = input(
    ...ngDevMode ? [void 0, { debugName: "formControl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Icon class of the checkbox icon.
   * @group Props
   */
  checkboxIcon = input(
    ...ngDevMode ? [void 0, { debugName: "checkboxIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "readonly" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @group Props
   */
  autofocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autofocus" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Value in checked state.
   * @group Props
   */
  trueValue = input(
    true,
    ...ngDevMode ? [{ debugName: "trueValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Value in unchecked state.
   * @group Props
   */
  falseValue = input(
    false,
    ...ngDevMode ? [{ debugName: "falseValue" }] : (
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
   * Callback to invoke on value change.
   * @param {CheckboxChangeEvent} event - Custom value change event.
   * @group Emits
   */
  onChange = output();
  /**
   * Callback to invoke when the receives focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onFocus = output();
  /**
   * Callback to invoke when the loses focus.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onBlur = output();
  inputViewChild = viewChild(
    "input",
    ...ngDevMode ? [{ debugName: "inputViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Custom checkbox icon template.
   * @group Templates
   */
  iconTemplate = contentChild("icon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "iconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  _indeterminate = signal(
    false,
    ...ngDevMode ? [{ debugName: "_indeterminate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focused = signal(
    false,
    ...ngDevMode ? [{ debugName: "focused" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _componentStyle = inject(CheckboxStyle);
  bindDirectiveInstance = inject(Bind, { self: true });
  $pcCheckbox = inject(CHECKBOX_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  $variant = computed(
    () => this.variant() || this.config.inputVariant() || void 0,
    ...ngDevMode ? [{ debugName: "$variant" }] : (
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
  checked = computed(
    () => {
      if (this._indeterminate())
        return false;
      return this.binary() ? this.modelValue() === this.trueValue() : _(this.value(), this.modelValue());
    },
    ...ngDevMode ? [{ debugName: "checked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  iconTemplateContext = computed(
    () => ({
      checked: this.checked(),
      class: this.cx("icon"),
      dataP: this.dataP()
    }),
    ...ngDevMode ? [{ debugName: "iconTemplateContext" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dataP = computed(
    () => this.cn({
      invalid: this.invalid(),
      checked: this.checked(),
      disabled: this.$disabled(),
      filled: this.$variant() === "filled",
      [this.size()]: this.size()
    }),
    ...ngDevMode ? [{ debugName: "dataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    super();
    effect(() => {
      const indeterminate = this.indeterminate();
      this._indeterminate.set(indeterminate);
    });
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  updateModel(event) {
    let newModelValue;
    const selfControl = this.injector.get(NgControl, null, { optional: true, self: true });
    const currentModelValue = selfControl && !this.formControl() ? selfControl.value : this.modelValue();
    if (!this.binary()) {
      if (this.checked() || this._indeterminate())
        newModelValue = currentModelValue.filter((val) => !b(val, this.value()));
      else
        newModelValue = currentModelValue ? [...currentModelValue, this.value()] : [this.value()];
      this.onModelChange(newModelValue);
      this.writeModelValue(newModelValue);
      const formControl = this.formControl();
      if (formControl) {
        formControl.setValue(newModelValue);
      }
    } else {
      newModelValue = this._indeterminate() ? this.trueValue() : this.checked() ? this.falseValue() : this.trueValue();
      this.writeModelValue(newModelValue);
      this.onModelChange(newModelValue);
    }
    if (this._indeterminate()) {
      this._indeterminate.set(false);
    }
    this.onChange.emit({ checked: newModelValue, originalEvent: event });
  }
  handleChange(event) {
    if (!this.readonly()) {
      this.updateModel(event);
    }
  }
  onInputFocus(event) {
    this.focused.set(true);
    this.onFocus.emit(event);
  }
  onInputBlur(event) {
    this.focused.set(false);
    this.onBlur.emit(event);
    this.onModelTouched();
  }
  focus() {
    this.inputViewChild()?.nativeElement.focus();
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    setModelValue(value);
  }
  static \u0275fac = function Checkbox_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Checkbox)();
  };
  static \u0275cmp = (function() {
    const _c03 = ["icon"];
    const _c12 = ["input"];
    function Checkbox_Conditional_3_Conditional_0_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 2);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("icon"), ctx_r0.checkboxIcon()));
        \u0275\u0275property("pBind", ctx_r0.ptm("icon"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Checkbox_Conditional_3_Conditional_0_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 5);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r0.cx("icon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("icon"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Checkbox_Conditional_3_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 2);
        \u0275\u0275conditionalCreate(1, Checkbox_Conditional_3_Conditional_0_Conditional_1_Template, 1, 4, "span", 3)(2, Checkbox_Conditional_3_Conditional_0_Conditional_2_Template, 1, 4, ":svg:svg", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("indicator"));
        \u0275\u0275property("pBind", ctx_r0.ptm("indicator"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.checkboxIcon() ? 1 : 2);
      }
    }
    function Checkbox_Conditional_3_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(1, "svg", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("indicator"));
        \u0275\u0275property("pBind", ctx_r0.ptm("indicator"));
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx_r0.cx("icon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("icon"));
        \u0275\u0275attribute("data-p", ctx_r0.dataP());
      }
    }
    function Checkbox_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Checkbox_Conditional_3_Conditional_0_Template, 3, 4, "span", 3);
        \u0275\u0275conditionalCreate(1, Checkbox_Conditional_3_Conditional_1_Template, 2, 7, "span", 3);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(ctx_r0.checked() ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0._indeterminate() ? 1 : -1);
      }
    }
    function Checkbox_Conditional_4_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function Checkbox_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Checkbox_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 7);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.iconTemplate())("ngTemplateOutletContext", ctx_r0.iconTemplateContext());
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Checkbox,
      selectors: [["p-checkbox"], ["p-check-box"]],
      contentQueries: function Checkbox_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.iconTemplate, _c03, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
        }
      },
      viewQuery: function Checkbox_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx.inputViewChild, _c12, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
        }
      },
      hostVars: 6,
      hostBindings: function Checkbox_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("data-p-highlight", ctx.checked())("data-p-checked", ctx.checked())("data-p-disabled", ctx.$disabled())("data-p", ctx.dataP());
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        value: [1, "value"],
        binary: [1, "binary"],
        ariaLabelledBy: [1, "ariaLabelledBy"],
        ariaLabel: [1, "ariaLabel"],
        tabindex: [1, "tabindex"],
        inputId: [1, "inputId"],
        inputStyle: [1, "inputStyle"],
        inputClass: [1, "inputClass"],
        indeterminate: [1, "indeterminate"],
        formControl: [1, "formControl"],
        checkboxIcon: [1, "checkboxIcon"],
        readonly: [1, "readonly"],
        autofocus: [1, "autofocus"],
        trueValue: [1, "trueValue"],
        falseValue: [1, "falseValue"],
        variant: [1, "variant"],
        size: [1, "size"]
      },
      outputs: {
        onChange: "onChange",
        onFocus: "onFocus",
        onBlur: "onBlur"
      },
      features: [\u0275\u0275ProvidersFeature([CHECKBOX_VALUE_ACCESSOR, CheckboxStyle, { provide: CHECKBOX_INSTANCE, useExisting: _Checkbox }, { provide: PARENT_INSTANCE, useExisting: _Checkbox }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      decls: 5,
      vars: 20,
      consts: [["input", ""], ["type", "checkbox", 3, "focus", "blur", "change", "checked", "pBind"], [3, "pBind"], [3, "class", "pBind"], ["data-p-icon", "check", 3, "class", "pBind"], ["data-p-icon", "check", 3, "pBind"], ["data-p-icon", "minus", 3, "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
      template: function Checkbox_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "input", 1, 0);
          \u0275\u0275listener("focus", function Checkbox_Template_input_focus_0_listener($event) {
            return ctx.onInputFocus($event);
          })("blur", function Checkbox_Template_input_blur_0_listener($event) {
            return ctx.onInputBlur($event);
          })("change", function Checkbox_Template_input_change_0_listener($event) {
            return ctx.handleChange($event);
          });
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(2, "div", 2);
          \u0275\u0275conditionalCreate(3, Checkbox_Conditional_3_Template, 2, 2)(4, Checkbox_Conditional_4_Template, 1, 2, "ng-container");
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275styleMap(ctx.inputStyle());
          \u0275\u0275classMap(ctx.cn(ctx.cx("input"), ctx.inputClass()));
          \u0275\u0275property("checked", ctx.checked())("pBind", ctx.ptm("input"));
          \u0275\u0275attribute("id", ctx.inputId())("value", ctx.value())("name", ctx.name())("tabindex", ctx.tabindex())("required", ctx.requiredAttr())("readonly", ctx.readonlyAttr())("disabled", ctx.disabledAttr())("aria-labelledby", ctx.ariaLabelledBy())("aria-label", ctx.ariaLabel());
          \u0275\u0275advance(2);
          \u0275\u0275classMap(ctx.cx("box"));
          \u0275\u0275property("pBind", ctx.ptm("box"));
          \u0275\u0275attribute("data-p", ctx.dataP());
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx.iconTemplate() ? 3 : 4);
        }
      },
      dependencies: [NgTemplateOutlet, SharedModule, Check, Minus, BindModule, Bind],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Checkbox, [{
    type: Component,
    args: [{
      selector: "p-checkbox, p-check-box",
      standalone: true,
      imports: [NgTemplateOutlet, SharedModule, Check, Minus, BindModule],
      template: `
        <input
            #input
            [attr.id]="inputId()"
            type="checkbox"
            [attr.value]="value()"
            [attr.name]="name()"
            [checked]="checked()"
            [attr.tabindex]="tabindex()"
            [attr.required]="requiredAttr()"
            [attr.readonly]="readonlyAttr()"
            [attr.disabled]="disabledAttr()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-label]="ariaLabel()"
            [style]="inputStyle()"
            [class]="cn(cx('input'), inputClass())"
            [pBind]="ptm('input')"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="handleChange($event)"
        />
        <div [class]="cx('box')" [pBind]="ptm('box')" [attr.data-p]="dataP()">
            @if (!iconTemplate()) {
                @if (checked()) {
                    <span [class]="cx('indicator')" [pBind]="ptm('indicator')">
                        @if (checkboxIcon()) {
                            <span [class]="cn(cx('icon'), checkboxIcon())" [pBind]="ptm('icon')" [attr.data-p]="dataP()"></span>
                        } @else {
                            <svg data-p-icon="check" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP()" />
                        }
                    </span>
                }
                @if (_indeterminate()) {
                    <span [class]="cx('indicator')" [pBind]="ptm('indicator')">
                        <svg data-p-icon="minus" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP()" />
                    </span>
                }
            } @else {
                <ng-container *ngTemplateOutlet="iconTemplate(); context: iconTemplateContext()"></ng-container>
            }
        </div>
    `,
      providers: [CHECKBOX_VALUE_ACCESSOR, CheckboxStyle, { provide: CHECKBOX_INSTANCE, useExisting: Checkbox }, { provide: PARENT_INSTANCE, useExisting: Checkbox }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "cx('root')",
        "[attr.data-p-highlight]": "checked()",
        "[attr.data-p-checked]": "checked()",
        "[attr.data-p-disabled]": "$disabled()",
        "[attr.data-p]": "dataP()"
      },
      hostDirectives: [Bind]
    }]
  }], () => [], { value: [{ type: Input, args: [{ isSignal: true, alias: "value", required: false }] }], binary: [{ type: Input, args: [{ isSignal: true, alias: "binary", required: false }] }], ariaLabelledBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabelledBy", required: false }] }], ariaLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], tabindex: [{ type: Input, args: [{ isSignal: true, alias: "tabindex", required: false }] }], inputId: [{ type: Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], inputStyle: [{ type: Input, args: [{ isSignal: true, alias: "inputStyle", required: false }] }], inputClass: [{ type: Input, args: [{ isSignal: true, alias: "inputClass", required: false }] }], indeterminate: [{ type: Input, args: [{ isSignal: true, alias: "indeterminate", required: false }] }], formControl: [{ type: Input, args: [{ isSignal: true, alias: "formControl", required: false }] }], checkboxIcon: [{ type: Input, args: [{ isSignal: true, alias: "checkboxIcon", required: false }] }], readonly: [{ type: Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], autofocus: [{ type: Input, args: [{ isSignal: true, alias: "autofocus", required: false }] }], trueValue: [{ type: Input, args: [{ isSignal: true, alias: "trueValue", required: false }] }], falseValue: [{ type: Input, args: [{ isSignal: true, alias: "falseValue", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], onChange: [{ type: Output, args: ["onChange"] }], onFocus: [{ type: Output, args: ["onFocus"] }], onBlur: [{ type: Output, args: ["onBlur"] }], inputViewChild: [{ type: ViewChild, args: ["input", { isSignal: true }] }], iconTemplate: [{ type: ContentChild, args: ["icon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }] });
})();
var CheckboxModule = class _CheckboxModule {
  static \u0275fac = function CheckboxModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CheckboxModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CheckboxModule,
    imports: [Checkbox, SharedModule],
    exports: [Checkbox, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Checkbox, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [Checkbox, SharedModule],
      exports: [Checkbox, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeicons/core/dist/esm/icons/times-circle.mjs
var e2 = { name: "times-circle", meta: { tags: ["times-circle", "close", "cancel", "delete", "times"] }, svg: { xmlns: "http://www.w3.org/2000/svg", width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" }, nodes: [["path", { d: "M10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5ZM12.4697 6.46973C12.7626 6.17683 13.2374 6.17683 13.5303 6.46973C13.8232 6.76262 13.8232 7.23738 13.5303 7.53027L11.0605 10L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L10 11.0605L7.53027 13.5303C7.23738 13.8232 6.76262 13.8232 6.46973 13.5303C6.17683 13.2374 6.17683 12.7626 6.46973 12.4697L8.93945 10L6.46973 7.53027C6.17683 7.23738 6.17683 6.76262 6.46973 6.46973C6.76262 6.17683 7.23738 6.17683 7.53027 6.46973L10 8.93945L12.4697 6.46973Z", fill: "currentColor", key: "8rdmue" }]] };

// node_modules/@primeicons/angular/fesm2022/primeicons-angular-times-circle.mjs
var TimesCircle = class _TimesCircle extends CoreIcon {
  constructor() {
    super();
    this._icon = e2;
  }
  static \u0275fac = function TimesCircle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimesCircle)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack02 = ($index, $item) => $item[1]["key"] || $index;
    function TimesCircle_For_1_Case_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "path");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function TimesCircle_For_1_Case_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "circle");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function TimesCircle_For_1_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "rect");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function TimesCircle_For_1_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "line");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function TimesCircle_For_1_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polyline");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function TimesCircle_For_1_Case_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "polygon");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function TimesCircle_For_1_Case_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275domElement(0, "ellipse");
      }
      if (rf & 2) {
        const node_r1 = \u0275\u0275nextContext().$implicit;
        \u0275\u0275attribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
      }
    }
    function TimesCircle_For_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, TimesCircle_For_1_Case_0_Template, 1, 9, ":svg:path")(1, TimesCircle_For_1_Case_1_Template, 1, 6, ":svg:circle")(2, TimesCircle_For_1_Case_2_Template, 1, 9, ":svg:rect")(3, TimesCircle_For_1_Case_3_Template, 1, 7, ":svg:line")(4, TimesCircle_For_1_Case_4_Template, 1, 4, ":svg:polyline")(5, TimesCircle_For_1_Case_5_Template, 1, 4, ":svg:polygon")(6, TimesCircle_For_1_Case_6_Template, 1, 7, ":svg:ellipse");
      }
      if (rf & 2) {
        let tmp_10_0 = void 0;
        const node_r1 = ctx.$implicit;
        \u0275\u0275conditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _TimesCircle,
      selectors: [["svg", "data-p-icon", "times-circle"]],
      features: [\u0275\u0275InheritDefinitionFeature],
      decls: 2,
      vars: 0,
      template: function TimesCircle_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275repeaterCreate(0, TimesCircle_For_1_Template, 7, 1, null, null, _forTrack02);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimesCircle, [{
    type: Component,
    args: [{
      selector: 'svg[data-p-icon="times-circle"]',
      standalone: true,
      template: ICON_TEMPLATE
    }]
  }], () => [], null);
})();

// node_modules/@primeuix/styles/dist/chip/index.mjs
var style2 = "\n    .p-chip {\n        display: inline-flex;\n        align-items: center;\n        background: dt('chip.background');\n        color: dt('chip.color');\n        border-radius: dt('chip.border.radius');\n        padding-block: dt('chip.padding.y');\n        padding-inline: dt('chip.padding.x');\n        gap: dt('chip.gap');\n    }\n    \n    .p-chip.p-focus {\n        background: dt('chip.focus.background');\n    }\n\n    .p-chip-icon {\n        color: dt('chip.icon.color');\n        font-size: dt('chip.icon.size');\n        width: dt('chip.icon.size');\n        height: dt('chip.icon.size');\n        flex-shrink: 0;\n    }\n\n    .p-chip-image {\n        border-radius: 50%;\n        width: dt('chip.image.width');\n        height: dt('chip.image.height');\n        margin-inline-start: calc(-1 * dt('chip.padding.y'));\n        flex-shrink: 0;\n    }\n\n    .p-chip-label {\n        font-weight: dt('chip.label.font.weight');\n        font-size: dt('chip.label.font.size');\n    }\n\n    .p-chip:has(.p-chip-remove-icon) {\n        padding-inline-end: dt('chip.padding.y');\n    }\n\n    .p-chip:has(.p-chip-image) {\n        padding-block-start: calc(dt('chip.padding.y') / 2);\n        padding-block-end: calc(dt('chip.padding.y') / 2);\n    }\n\n    .p-chip-remove-icon {\n        cursor: pointer;\n        font-size: dt('chip.remove.icon.size');\n        width: dt('chip.remove.icon.size');\n        height: dt('chip.remove.icon.size');\n        color: dt('chip.remove.icon.color');\n        border-radius: 50%;\n        transition:\n            outline-color dt('chip.transition.duration'),\n            box-shadow dt('chip.transition.duration');\n        outline-color: transparent;\n    }\n\n    .p-chip-remove-icon:focus-visible {\n        box-shadow: dt('chip.remove.icon.focus.ring.shadow');\n        outline: dt('chip.remove.icon.focus.ring.width') dt('chip.remove.icon.focus.ring.style') dt('chip.remove.icon.focus.ring.color');\n        outline-offset: dt('chip.remove.icon.focus.ring.offset');\n    }\n";

// node_modules/primeng/fesm2022/primeng-chip.mjs
var inlineStyles = {
  root: ({ instance }) => ({
    display: !instance.visible() ? "none" : null
  })
};
var classes2 = {
  root: ({ instance }) => [
    "p-chip p-component",
    {
      "p-disabled": instance.disabled()
    }
  ],
  image: "p-chip-image",
  icon: "p-chip-icon",
  label: "p-chip-label",
  removeIcon: "p-chip-remove-icon"
};
var ChipStyle = class _ChipStyle extends BaseStyle {
  name = "chip";
  style = style2;
  classes = classes2;
  inlineStyles = inlineStyles;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ChipStyle_BaseFactory = void 0;
    return function ChipStyle_Factory(__ngFactoryType__) {
      return (\u0275ChipStyle_BaseFactory || (\u0275ChipStyle_BaseFactory = \u0275\u0275getInheritedFactory(_ChipStyle)))(__ngFactoryType__ || _ChipStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ChipStyle,
    factory: _ChipStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipStyle, [{
    type: Injectable
  }], null, null);
})();
var ChipClasses;
(function(ChipClasses2) {
  ChipClasses2["root"] = "p-chip";
  ChipClasses2["image"] = "p-chip-image";
  ChipClasses2["icon"] = "p-chip-icon";
  ChipClasses2["label"] = "p-chip-label";
  ChipClasses2["removeIcon"] = "p-chip-remove-icon";
})(ChipClasses || (ChipClasses = {}));
var CHIP_INSTANCE = new InjectionToken("CHIP_INSTANCE");
var Chip = class _Chip extends BaseComponent {
  componentName = "Chip";
  $pcChip = inject(CHIP_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
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
   * Alt attribute of the image.
   * @group Props
   */
  alt = input(
    ...ngDevMode ? [void 0, { debugName: "alt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * When present, it specifies that the element should be disabled.
   * @group Props
   */
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "disabled" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether to display a remove icon.
   * @group Props
   */
  removable = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "removable" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Icon of the remove element.
   * @group Props
   */
  removeIcon = input(
    ...ngDevMode ? [void 0, { debugName: "removeIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Used to pass all properties of the chipProps to the Chip component.
   * @group Props
   */
  chipProps = input(
    ...ngDevMode ? [void 0, { debugName: "chipProps" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Callback to invoke when a chip is removed.
   * @param {MouseEvent} event - Mouse event.
   * @group Emits
   */
  onRemove = output();
  /**
   * This event is triggered if an error occurs while loading an image file.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onImageError = output();
  /**
   * Custom remove icon template.
   * @group Templates
   */
  removeIconTemplate = contentChild("removeicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "removeIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Keyed on what the chip renders: lists re-bind chip views by position, so a chip that hid itself
   * on remove would otherwise stay hidden for the item that takes its place.
   */
  visible = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? { debugName: "visible" } : (
    /* istanbul ignore next */
    {}
  )), {
    source: () => JSON.stringify([this._label(), this._icon(), this._image()]),
    computation: () => true
  }));
  _componentStyle = inject(ChipStyle);
  _label = computed(
    () => this.chipProps()?.label ?? this.label(),
    ...ngDevMode ? [{ debugName: "_label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _icon = computed(
    () => this.chipProps()?.icon ?? this.icon(),
    ...ngDevMode ? [{ debugName: "_icon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _image = computed(
    () => this.chipProps()?.image ?? this.image(),
    ...ngDevMode ? [{ debugName: "_image" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _alt = computed(
    () => this.chipProps()?.alt ?? this.alt(),
    ...ngDevMode ? [{ debugName: "_alt" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _removable = computed(
    () => this.chipProps()?.removable ?? this.removable(),
    ...ngDevMode ? [{ debugName: "_removable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _removeIcon = computed(
    () => this.chipProps()?.removeIcon ?? this.removeIcon(),
    ...ngDevMode ? [{ debugName: "_removeIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  removeAriaLabel = computed(
    () => this.translate(TranslationKeys.ARIA, "removeLabel"),
    ...ngDevMode ? [{ debugName: "removeAriaLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  removeIconTabindex = computed(
    () => this.disabled() ? -1 : 0,
    ...ngDevMode ? [{ debugName: "removeIconTabindex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dataP = computed(
    () => this.cn({
      removable: this._removable()
    }),
    ...ngDevMode ? [{ debugName: "dataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
  }
  close(event) {
    this.visible.set(false);
    this.onRemove.emit(event);
  }
  onKeydown(event) {
    if (event.key === "Enter" || event.key === "Backspace") {
      this.close(event);
    }
  }
  imageError(event) {
    this.onImageError.emit(event);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275Chip_BaseFactory = void 0;
    return function Chip_Factory(__ngFactoryType__) {
      return (\u0275Chip_BaseFactory || (\u0275Chip_BaseFactory = \u0275\u0275getInheritedFactory(_Chip)))(__ngFactoryType__ || _Chip);
    };
  })();
  static \u0275cmp = (function() {
    const _c03 = ["removeicon"];
    const _c12 = ["*"];
    function Chip_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "img", 2);
        \u0275\u0275listener("error", function Chip_Conditional_1_Template_img_error_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1.imageError($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r1.cx("image"));
        \u0275\u0275property("pBind", ctx_r1.ptm("image"))("src", ctx_r1._image(), \u0275\u0275sanitizeUrl)("alt", ctx_r1._alt());
      }
    }
    function Chip_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 3);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("icon"), ctx_r1._icon()));
        \u0275\u0275property("pBind", ctx_r1.ptm("icon"));
      }
    }
    function Chip_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 3);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275classMap(ctx_r1.cx("label"));
        \u0275\u0275property("pBind", ctx_r1.ptm("label"));
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r1._label());
      }
    }
    function Chip_Conditional_4_Conditional_0_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r3 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 6);
        \u0275\u0275listener("click", function Chip_Conditional_4_Conditional_0_Conditional_0_Template_span_click_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.close($event));
        })("keydown", function Chip_Conditional_4_Conditional_0_Conditional_0_Template_span_keydown_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.onKeydown($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r1.cn(ctx_r1.cx("removeIcon"), ctx_r1._removeIcon()));
        \u0275\u0275property("pBind", ctx_r1.ptm("removeIcon"));
        \u0275\u0275attribute("tabindex", ctx_r1.removeIconTabindex())("aria-label", ctx_r1.removeAriaLabel());
      }
    }
    function Chip_Conditional_4_Conditional_0_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r4 = \u0275\u0275getCurrentView();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(0, "svg", 7);
        \u0275\u0275listener("click", function Chip_Conditional_4_Conditional_0_Conditional_1_Template_svg_click_0_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.close($event));
        })("keydown", function Chip_Conditional_4_Conditional_0_Conditional_1_Template_svg_keydown_0_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext(3);
          return \u0275\u0275resetView(ctx_r1.onKeydown($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r1.cx("removeIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("removeIcon"));
        \u0275\u0275attribute("tabindex", ctx_r1.removeIconTabindex())("aria-label", ctx_r1.removeAriaLabel());
      }
    }
    function Chip_Conditional_4_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Chip_Conditional_4_Conditional_0_Conditional_0_Template, 1, 5, "span", 4)(1, Chip_Conditional_4_Conditional_0_Conditional_1_Template, 1, 5, ":svg:svg", 5);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r1._removeIcon() ? 0 : 1);
      }
    }
    function Chip_Conditional_4_Conditional_1_1_ng_template_0_Template(rf, ctx) {
    }
    function Chip_Conditional_4_Conditional_1_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, Chip_Conditional_4_Conditional_1_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function Chip_Conditional_4_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r5 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 6);
        \u0275\u0275listener("click", function Chip_Conditional_4_Conditional_1_Template_span_click_0_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.close($event));
        })("keydown", function Chip_Conditional_4_Conditional_1_Template_span_keydown_0_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r1 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r1.onKeydown($event));
        });
        \u0275\u0275template(1, Chip_Conditional_4_Conditional_1_1_Template, 1, 0, null, 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r1.cx("removeIcon"));
        \u0275\u0275property("pBind", ctx_r1.ptm("removeIcon"));
        \u0275\u0275attribute("tabindex", ctx_r1.removeIconTabindex())("aria-label", ctx_r1.removeAriaLabel());
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.removeIconTemplate());
      }
    }
    function Chip_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, Chip_Conditional_4_Conditional_0_Template, 2, 1)(1, Chip_Conditional_4_Conditional_1_Template, 2, 6, "span", 4);
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275conditional(!ctx_r1.removeIconTemplate() ? 0 : 1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _Chip,
      selectors: [["p-chip"]],
      contentQueries: function Chip_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.removeIconTemplate, _c03, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
        }
      },
      hostVars: 6,
      hostBindings: function Chip_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("aria-label", ctx._label())("data-p", ctx.dataP());
          \u0275\u0275styleMap(ctx.sx("root"));
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        label: [1, "label"],
        icon: [1, "icon"],
        image: [1, "image"],
        alt: [1, "alt"],
        disabled: [1, "disabled"],
        removable: [1, "removable"],
        removeIcon: [1, "removeIcon"],
        chipProps: [1, "chipProps"]
      },
      outputs: {
        onRemove: "onRemove",
        onImageError: "onImageError"
      },
      features: [\u0275\u0275ProvidersFeature([ChipStyle, { provide: CHIP_INSTANCE, useExisting: _Chip }, { provide: PARENT_INSTANCE, useExisting: _Chip }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c12,
      decls: 5,
      vars: 3,
      consts: [[3, "pBind", "class", "src", "alt"], [3, "pBind", "class"], [3, "error", "pBind", "src", "alt"], [3, "pBind"], ["role", "button", 3, "pBind", "class"], ["data-p-icon", "times-circle", "role", "button", 3, "pBind", "class"], ["role", "button", 3, "click", "keydown", "pBind"], ["data-p-icon", "times-circle", "role", "button", 3, "click", "keydown", "pBind"], [4, "ngTemplateOutlet"]],
      template: function Chip_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275projection(0);
          \u0275\u0275conditionalCreate(1, Chip_Conditional_1_Template, 1, 5, "img", 0)(2, Chip_Conditional_2_Template, 1, 3, "span", 1);
          \u0275\u0275conditionalCreate(3, Chip_Conditional_3_Template, 2, 4, "div", 1);
          \u0275\u0275conditionalCreate(4, Chip_Conditional_4_Template, 2, 1);
        }
        if (rf & 2) {
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx._image() ? 1 : ctx._icon() ? 2 : -1);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx._label() ? 3 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx._removable() ? 4 : -1);
        }
      },
      dependencies: [NgTemplateOutlet, SharedModule, Bind, TimesCircle],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Chip, [{
    type: Component,
    args: [{
      selector: "p-chip",
      standalone: true,
      imports: [NgTemplateOutlet, SharedModule, Bind, TimesCircle],
      template: `
        <ng-content />
        @if (_image()) {
            <img [pBind]="ptm('image')" [class]="cx('image')" [src]="_image()" (error)="imageError($event)" [alt]="_alt()" />
        } @else if (_icon()) {
            <span [pBind]="ptm('icon')" [class]="cn(cx('icon'), _icon())"></span>
        }
        @if (_label()) {
            <div [pBind]="ptm('label')" [class]="cx('label')">{{ _label() }}</div>
        }
        @if (_removable()) {
            @if (!removeIconTemplate()) {
                @if (_removeIcon()) {
                    <span
                        [pBind]="ptm('removeIcon')"
                        [class]="cn(cx('removeIcon'), _removeIcon())"
                        (click)="close($event)"
                        (keydown)="onKeydown($event)"
                        [attr.tabindex]="removeIconTabindex()"
                        [attr.aria-label]="removeAriaLabel()"
                        role="button"
                    ></span>
                } @else {
                    <svg
                        [pBind]="ptm('removeIcon')"
                        data-p-icon="times-circle"
                        [class]="cx('removeIcon')"
                        (click)="close($event)"
                        (keydown)="onKeydown($event)"
                        [attr.tabindex]="removeIconTabindex()"
                        [attr.aria-label]="removeAriaLabel()"
                        role="button"
                    />
                }
            } @else {
                <span [pBind]="ptm('removeIcon')" [attr.tabindex]="removeIconTabindex()" [class]="cx('removeIcon')" (click)="close($event)" (keydown)="onKeydown($event)" [attr.aria-label]="removeAriaLabel()" role="button">
                    <ng-template *ngTemplateOutlet="removeIconTemplate()"></ng-template>
                </span>
            }
        }
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [ChipStyle, { provide: CHIP_INSTANCE, useExisting: Chip }, { provide: PARENT_INSTANCE, useExisting: Chip }],
      host: {
        "[class]": "cx('root')",
        "[style]": "sx('root')",
        "[attr.aria-label]": "_label()",
        "[attr.data-p]": "dataP()"
      },
      hostDirectives: [Bind]
    }]
  }], null, { label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], icon: [{ type: Input, args: [{ isSignal: true, alias: "icon", required: false }] }], image: [{ type: Input, args: [{ isSignal: true, alias: "image", required: false }] }], alt: [{ type: Input, args: [{ isSignal: true, alias: "alt", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], removable: [{ type: Input, args: [{ isSignal: true, alias: "removable", required: false }] }], removeIcon: [{ type: Input, args: [{ isSignal: true, alias: "removeIcon", required: false }] }], chipProps: [{ type: Input, args: [{ isSignal: true, alias: "chipProps", required: false }] }], onRemove: [{ type: Output, args: ["onRemove"] }], onImageError: [{ type: Output, args: ["onImageError"] }], removeIconTemplate: [{ type: ContentChild, args: ["removeicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }] });
})();
var ChipModule = class _ChipModule {
  static \u0275fac = function ChipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChipModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _ChipModule,
    imports: [Chip, SharedModule],
    exports: [Chip, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [Chip, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChipModule, [{
    type: NgModule,
    args: [{
      imports: [Chip, SharedModule],
      exports: [Chip, SharedModule]
    }]
  }], null, null);
})();

// node_modules/@primeuix/styles/dist/multiselect/index.mjs
var style3 = "\n    .p-multiselect {\n        display: inline-flex;\n        cursor: pointer;\n        position: relative;\n        user-select: none;\n        background: dt('multiselect.background');\n        border: 1px solid dt('multiselect.border.color');\n        transition:\n            background dt('multiselect.transition.duration'),\n            color dt('multiselect.transition.duration'),\n            border-color dt('multiselect.transition.duration'),\n            outline-color dt('multiselect.transition.duration'),\n            box-shadow dt('multiselect.transition.duration');\n        border-radius: dt('multiselect.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('multiselect.shadow');\n    }\n\n    .p-multiselect:not(.p-disabled):hover {\n        border-color: dt('multiselect.hover.border.color');\n    }\n\n    .p-multiselect:not(.p-disabled).p-focus {\n        border-color: dt('multiselect.focus.border.color');\n        box-shadow: dt('multiselect.focus.ring.shadow');\n        outline: dt('multiselect.focus.ring.width') dt('multiselect.focus.ring.style') dt('multiselect.focus.ring.color');\n        outline-offset: dt('multiselect.focus.ring.offset');\n    }\n\n    .p-multiselect.p-variant-filled {\n        background: dt('multiselect.filled.background');\n    }\n\n    .p-multiselect.p-variant-filled:not(.p-disabled):hover {\n        background: dt('multiselect.filled.hover.background');\n    }\n\n    .p-multiselect.p-variant-filled.p-focus {\n        background: dt('multiselect.filled.focus.background');\n    }\n\n    .p-multiselect.p-invalid {\n        border-color: dt('multiselect.invalid.border.color');\n    }\n\n    .p-multiselect.p-disabled {\n        opacity: 1;\n        background: dt('multiselect.disabled.background');\n    }\n\n    .p-multiselect-dropdown {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-shrink: 0;\n        background: transparent;\n        color: dt('multiselect.dropdown.color');\n        width: dt('multiselect.dropdown.width');\n        border-start-end-radius: dt('multiselect.border.radius');\n        border-end-end-radius: dt('multiselect.border.radius');\n    }\n\n    .p-multiselect-clear-icon {\n        align-self: center;\n        color: dt('multiselect.clear.icon.color');\n        inset-inline-end: dt('multiselect.dropdown.width');\n    }\n\n    .p-multiselect-label-container {\n        overflow: hidden;\n        flex: 1 1 auto;\n        cursor: pointer;\n    }\n\n    .p-multiselect-label {\n        white-space: nowrap;\n        cursor: pointer;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding: dt('multiselect.padding.y') dt('multiselect.padding.x');\n        color: dt('multiselect.color');\n        font-weight: dt('multiselect.font.weight');\n        font-size: dt('multiselect.font.size');\n    }\n\n    .p-multiselect-display-chip .p-multiselect-label {\n        display: flex;\n        align-items: center;\n        gap: calc(dt('multiselect.padding.y') / 2);\n    }\n\n    .p-multiselect-label.p-placeholder {\n        color: dt('multiselect.placeholder.color');\n    }\n\n    .p-multiselect.p-invalid .p-multiselect-label.p-placeholder {\n        color: dt('multiselect.invalid.placeholder.color');\n    }\n\n    .p-multiselect.p-disabled .p-multiselect-label {\n        color: dt('multiselect.disabled.color');\n    }\n\n    .p-multiselect-label-empty {\n        overflow: hidden;\n        visibility: hidden;\n    }\n\n    .p-multiselect-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        background: dt('multiselect.overlay.background');\n        color: dt('multiselect.overlay.color');\n        border: 1px solid dt('multiselect.overlay.border.color');\n        border-radius: dt('multiselect.overlay.border.radius');\n        box-shadow: dt('multiselect.overlay.shadow');\n        min-width: 100%;\n    }\n\n    .p-multiselect-header {\n        display: flex;\n        align-items: center;\n        padding: dt('multiselect.list.header.padding');\n    }\n\n    .p-multiselect-header .p-checkbox {\n        margin-inline-end: dt('multiselect.option.gap');\n    }\n\n    .p-multiselect-filter-container {\n        flex: 1 1 auto;\n    }\n\n    .p-multiselect-filter {\n        width: 100%;\n    }\n\n    .p-multiselect-list-container {\n        overflow: auto;\n    }\n\n    .p-multiselect-list {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        padding: dt('multiselect.list.padding');\n        display: flex;\n        flex-direction: column;\n        gap: dt('multiselect.list.gap');\n    }\n\n    .p-multiselect-option {\n        cursor: pointer;\n        font-weight: dt('multiselect.option.font.weight');\n        font-size: dt('multiselect.option.font.size');\n        font-weight: normal;\n        white-space: nowrap;\n        position: relative;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        gap: dt('multiselect.option.gap');\n        padding: dt('multiselect.option.padding');\n        border: 0 none;\n        color: dt('multiselect.option.color');\n        background: transparent;\n        transition:\n            background dt('list.option.transition.duration'),\n            color dt('list.option.transition.duration'),\n            border-color dt('list.option.transition.duration'),\n            box-shadow dt('list.option.transition.duration'),\n            outline-color dt('list.option.transition.duration');\n        border-radius: dt('multiselect.option.border.radius');\n    }\n\n    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {\n        background: dt('multiselect.option.focus.background');\n        color: dt('multiselect.option.focus.color');\n    }\n\n    .p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled):hover {\n        background: dt('multiselect.option.focus.background');\n        color: dt('multiselect.option.focus.color');\n    }\n\n    .p-multiselect-option.p-multiselect-option-selected {\n        background: dt('multiselect.option.selected.background');\n        color: dt('multiselect.option.selected.color');\n        font-weight: dt('multiselect.option.selected.font.weight');\n    }\n\n    .p-multiselect-option.p-multiselect-option-selected.p-focus {\n        background: dt('multiselect.option.selected.focus.background');\n        color: dt('multiselect.option.selected.focus.color');\n    }\n\n    .p-multiselect-option-group {\n        cursor: auto;\n        margin: 0;\n        padding: dt('multiselect.option.group.padding');\n        background: dt('multiselect.option.group.background');\n        color: dt('multiselect.option.group.color');\n        font-weight: dt('multiselect.option.group.font.weight');\n        font-size: dt('multiselect.option.group.font.size');\n    }\n\n    .p-multiselect-empty-message {\n        padding: dt('multiselect.empty.message.padding');\n    }\n\n    .p-multiselect-label .p-chip {\n        padding-block-start: calc(dt('multiselect.padding.y') / 2);\n        padding-block-end: calc(dt('multiselect.padding.y') / 2);\n        border-radius: dt('multiselect.chip.border.radius');\n    }\n\n    .p-multiselect-label:has(.p-chip) {\n        padding: calc(dt('multiselect.padding.y') / 2) calc(dt('multiselect.padding.x') / 2);\n    }\n\n    .p-multiselect-fluid {\n        display: flex;\n        width: 100%;\n    }\n\n    .p-multiselect-sm .p-multiselect-label {\n        font-size: dt('multiselect.sm.font.size');\n        padding-block: dt('multiselect.sm.padding.y');\n        padding-inline: dt('multiselect.sm.padding.x');\n    }\n\n    .p-multiselect-sm .p-multiselect-dropdown .p-icon {\n        font-size: dt('multiselect.sm.font.size');\n        width: dt('multiselect.sm.font.size');\n        height: dt('multiselect.sm.font.size');\n    }\n\n    .p-multiselect-lg .p-multiselect-label {\n        font-size: dt('multiselect.lg.font.size');\n        padding-block: dt('multiselect.lg.padding.y');\n        padding-inline: dt('multiselect.lg.padding.x');\n    }\n\n    .p-multiselect-lg .p-multiselect-dropdown .p-icon {\n        font-size: dt('multiselect.lg.font.size');\n        width: dt('multiselect.lg.font.size');\n        height: dt('multiselect.lg.font.size');\n    }\n\n    .p-floatlabel-in .p-multiselect-filter {\n        padding-block-start: dt('multiselect.padding.y');\n        padding-block-end: dt('multiselect.padding.y');\n    }\n";

// node_modules/primeng/fesm2022/primeng-multiselect.mjs
var MULTISELECT_INSTANCE = new InjectionToken("MULTISELECT_INSTANCE");
var MULTISELECT_ITEM_INSTANCE = new InjectionToken("MULTISELECT_ITEM_INSTANCE");
var inlineStyles2 = {
  root: ({ instance }) => ({ position: instance.$appendTo() === "self" ? "relative" : void 0 })
};
var classes3 = {
  root: ({ instance }) => [
    "p-multiselect p-component p-inputwrapper",
    {
      "p-multiselect-display-chip": instance.display() === "chip",
      "p-disabled": instance.$disabled(),
      "p-invalid": instance.invalid(),
      "p-variant-filled": instance.$variant() === "filled",
      "p-focus": instance.focused,
      "p-inputwrapper-filled": instance.$filled(),
      "p-inputwrapper-focus": instance.focused || instance.overlayVisible(),
      "p-multiselect-open": instance.overlayVisible(),
      "p-multiselect-fluid": instance.hasFluid,
      "p-multiselect-sm p-inputfield-sm": instance.size() === "small",
      "p-multiselect-lg p-inputfield-lg": instance.size() === "large"
    }
  ],
  labelContainer: "p-multiselect-label-container",
  label: ({ instance }) => ({
    "p-multiselect-label": true,
    "p-placeholder": instance.label() === instance.placeholder(),
    "p-multiselect-label-empty": !instance.placeholder() && (!instance.modelValue() || instance.modelValue().length === 0)
  }),
  clearIcon: "p-multiselect-clear-icon",
  chipItem: "p-multiselect-chip-item",
  pcChip: "p-multiselect-chip",
  chipIcon: "p-multiselect-chip-icon",
  dropdown: "p-multiselect-dropdown",
  loadingIcon: "p-multiselect-loading-icon",
  dropdownIcon: "p-multiselect-dropdown-icon",
  overlay: "p-multiselect-overlay p-component-overlay p-component",
  header: "p-multiselect-header",
  pcFilterContainer: "p-multiselect-filter-container",
  pcFilter: "p-multiselect-filter",
  listContainer: "p-multiselect-list-container",
  list: "p-multiselect-list",
  optionGroup: "p-multiselect-option-group",
  option: ({ instance }) => ({
    "p-multiselect-option": true,
    "p-multiselect-option-selected": instance.selected() && instance.highlightOnSelect(),
    "p-disabled": instance.disabled(),
    "p-focus": instance.focused()
  }),
  emptyMessage: "p-multiselect-empty-message"
};
var MultiSelectStyle = class _MultiSelectStyle extends BaseStyle {
  name = "multiselect";
  style = style3;
  classes = classes3;
  inlineStyles = inlineStyles2;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MultiSelectStyle_BaseFactory = void 0;
    return function MultiSelectStyle_Factory(__ngFactoryType__) {
      return (\u0275MultiSelectStyle_BaseFactory || (\u0275MultiSelectStyle_BaseFactory = \u0275\u0275getInheritedFactory(_MultiSelectStyle)))(__ngFactoryType__ || _MultiSelectStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MultiSelectStyle,
    factory: _MultiSelectStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectStyle, [{
    type: Injectable
  }], null, null);
})();
var MultiSelectClasses;
(function(MultiSelectClasses2) {
  MultiSelectClasses2["root"] = "p-multiselect";
  MultiSelectClasses2["labelContainer"] = "p-multiselect-label-container";
  MultiSelectClasses2["label"] = "p-multiselect-label";
  MultiSelectClasses2["chipItem"] = "p-multiselect-chip-item";
  MultiSelectClasses2["pcChip"] = "p-multiselect-chip";
  MultiSelectClasses2["chipIcon"] = "p-multiselect-chip-icon";
  MultiSelectClasses2["dropdown"] = "p-multiselect-dropdown";
  MultiSelectClasses2["loadingIcon"] = "p-multiselect-loading-icon";
  MultiSelectClasses2["dropdownIcon"] = "p-multiselect-dropdown-icon";
  MultiSelectClasses2["overlay"] = "p-multiselect-overlay";
  MultiSelectClasses2["header"] = "p-multiselect-header";
  MultiSelectClasses2["pcFilterContainer"] = "p-multiselect-filter-container";
  MultiSelectClasses2["pcFilter"] = "p-multiselect-filter";
  MultiSelectClasses2["listContainer"] = "p-multiselect-list-container";
  MultiSelectClasses2["list"] = "p-multiselect-list";
  MultiSelectClasses2["optionGroup"] = "p-multiselect-option-group";
  MultiSelectClasses2["option"] = "p-multiselect-option";
  MultiSelectClasses2["emptyMessage"] = "p-multiselect-empty-message";
  MultiSelectClasses2["clearIcon"] = "p-autocomplete-clear-icon";
})(MultiSelectClasses || (MultiSelectClasses = {}));
var MultiSelectItem = class _MultiSelectItem extends BaseComponent {
  $pcMultiSelectItem = inject(MULTISELECT_ITEM_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  hostName = "MultiSelect";
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
  itemSize = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "itemSize" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  focused = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "focused" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
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
  variant = input(
    ...ngDevMode ? [void 0, { debugName: "variant" }] : (
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
  checkIconTemplate = input(
    ...ngDevMode ? [void 0, { debugName: "checkIconTemplate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  itemCheckboxIconTemplate = input(
    ...ngDevMode ? [void 0, { debugName: "itemCheckboxIconTemplate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  highlightOnSelect = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "highlightOnSelect" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  onClick = output();
  onMouseEnter = output();
  _componentStyle = inject(MultiSelectStyle);
  templateContext = computed(
    () => ({ $implicit: this.option() }),
    ...ngDevMode ? [{ debugName: "templateContext" }] : (
      /* istanbul ignore next */
      []
    )
  );
  getPTOptions(key) {
    return this.ptm(key, {
      context: {
        selected: this.selected(),
        focused: this.focused(),
        disabled: this.disabled()
      }
    });
  }
  getCheckboxIconContext(klass) {
    return { checked: this.selected(), class: klass };
  }
  onOptionClick(event) {
    this.onClick.emit({
      originalEvent: event,
      option: this.option(),
      selected: this.selected() ?? false
    });
    event.stopPropagation();
    event.preventDefault();
  }
  onOptionMouseEnter(event) {
    this.onMouseEnter.emit({
      originalEvent: event,
      option: this.option(),
      selected: this.selected() ?? false
    });
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MultiSelectItem_BaseFactory = void 0;
    return function MultiSelectItem_Factory(__ngFactoryType__) {
      return (\u0275MultiSelectItem_BaseFactory || (\u0275MultiSelectItem_BaseFactory = \u0275\u0275getInheritedFactory(_MultiSelectItem)))(__ngFactoryType__ || _MultiSelectItem);
    };
  })();
  static \u0275cmp = (function() {
    function MultiSelectItem_Conditional_1_ng_template_0_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelectItem_Conditional_1_ng_template_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelectItem_Conditional_1_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 2);
      }
      if (rf & 2) {
        const klass_r1 = ctx.class;
        const ctx_r1 = \u0275\u0275nextContext(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r1.itemCheckboxIconTemplate())("ngTemplateOutletContext", ctx_r1.getCheckboxIconContext(klass_r1));
      }
    }
    function MultiSelectItem_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelectItem_Conditional_1_ng_template_0_Template, 1, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      }
    }
    function MultiSelectItem_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span");
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r1.label() ?? "empty");
      }
    }
    function MultiSelectItem_ng_container_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MultiSelectItem,
      selectors: [["li", "pMultiSelectItem", ""]],
      hostAttrs: ["role", "option"],
      hostVars: 13,
      hostBindings: function MultiSelectItem_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function MultiSelectItem_click_HostBindingHandler($event) {
            return ctx.onOptionClick($event);
          })("mouseenter", function MultiSelectItem_mouseenter_HostBindingHandler($event) {
            return ctx.onOptionMouseEnter($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("aria-label", ctx.label())("aria-setsize", ctx.ariaSetSize())("aria-posinset", ctx.ariaPosInset())("aria-selected", ctx.selected())("data-p-selected", ctx.selected())("data-p-focused", ctx.focused())("data-p-highlight", ctx.selected())("data-p-disabled", ctx.disabled())("aria-checked", ctx.selected());
          \u0275\u0275classMap(ctx.cx("option"));
          \u0275\u0275styleProp("height", ctx.itemSize(), "px");
        }
      },
      inputs: {
        option: [1, "option"],
        selected: [1, "selected"],
        label: [1, "label"],
        disabled: [1, "disabled"],
        itemSize: [1, "itemSize"],
        focused: [1, "focused"],
        ariaPosInset: [1, "ariaPosInset"],
        ariaSetSize: [1, "ariaSetSize"],
        variant: [1, "variant"],
        template: [1, "template"],
        checkIconTemplate: [1, "checkIconTemplate"],
        itemCheckboxIconTemplate: [1, "itemCheckboxIconTemplate"],
        highlightOnSelect: [1, "highlightOnSelect"]
      },
      outputs: {
        onClick: "onClick",
        onMouseEnter: "onMouseEnter"
      },
      features: [\u0275\u0275ProvidersFeature([MultiSelectStyle]), \u0275\u0275InheritDefinitionFeature],
      decls: 4,
      vars: 12,
      consts: [["icon", ""], [3, "disabled", "ngModel", "binary", "tabindex", "variant", "ariaLabel", "pt", "unstyled"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"]],
      template: function MultiSelectItem_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "p-checkbox", 1);
          \u0275\u0275controlCreate();
          \u0275\u0275conditionalCreate(1, MultiSelectItem_Conditional_1_Template, 2, 0);
          \u0275\u0275elementEnd();
          \u0275\u0275conditionalCreate(2, MultiSelectItem_Conditional_2_Template, 2, 1, "span");
          \u0275\u0275template(3, MultiSelectItem_ng_container_3_Template, 1, 0, "ng-container", 2);
        }
        if (rf & 2) {
          \u0275\u0275property("disabled", ctx.disabled() ?? false)("ngModel", ctx.selected())("binary", true)("tabindex", -1)("variant", ctx.variant())("ariaLabel", ctx.label())("pt", ctx.getPTOptions("pcOptionCheckbox"))("unstyled", ctx.unstyled());
          \u0275\u0275control();
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.itemCheckboxIconTemplate() ? 1 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx.template() ? 2 : -1);
          \u0275\u0275advance();
          \u0275\u0275property("ngTemplateOutlet", ctx.template())("ngTemplateOutletContext", ctx.templateContext());
        }
      },
      dependencies: [NgTemplateOutlet, Checkbox, FormsModule, NgControlStatus, NgModel, SharedModule],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectItem, [{
    type: Component,
    args: [{
      selector: "li[pMultiSelectItem]",
      standalone: true,
      imports: [NgTemplateOutlet, Checkbox, FormsModule, SharedModule],
      template: `
        <p-checkbox [disabled]="disabled() ?? false" [ngModel]="selected()" [binary]="true" [tabindex]="-1" [variant]="variant()" [ariaLabel]="label()" [pt]="getPTOptions('pcOptionCheckbox')" [unstyled]="unstyled()">
            @if (itemCheckboxIconTemplate()) {
                <ng-template #icon let-klass="class">
                    <ng-container *ngTemplateOutlet="itemCheckboxIconTemplate(); context: getCheckboxIconContext(klass)"></ng-container>
                </ng-template>
            }
        </p-checkbox>
        @if (!template()) {
            <span>{{ label() ?? 'empty' }}</span>
        }
        <ng-container *ngTemplateOutlet="template(); context: templateContext()"></ng-container>
    `,
      encapsulation: ViewEncapsulation.None,
      providers: [MultiSelectStyle],
      host: {
        "[style.height.px]": "itemSize()",
        "[attr.aria-label]": "label()",
        role: "option",
        "[attr.aria-setsize]": "ariaSetSize()",
        "[attr.aria-posinset]": "ariaPosInset()",
        "[attr.aria-selected]": "selected()",
        "[attr.data-p-selected]": "selected()",
        "[attr.data-p-focused]": "focused()",
        "[attr.data-p-highlight]": "selected()",
        "[attr.data-p-disabled]": "disabled()",
        "[attr.aria-checked]": "selected()",
        "(click)": "onOptionClick($event)",
        "(mouseenter)": "onOptionMouseEnter($event)",
        "[class]": "cx('option')"
      }
    }]
  }], null, { option: [{ type: Input, args: [{ isSignal: true, alias: "option", required: false }] }], selected: [{ type: Input, args: [{ isSignal: true, alias: "selected", required: false }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }], disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], itemSize: [{ type: Input, args: [{ isSignal: true, alias: "itemSize", required: false }] }], focused: [{ type: Input, args: [{ isSignal: true, alias: "focused", required: false }] }], ariaPosInset: [{ type: Input, args: [{ isSignal: true, alias: "ariaPosInset", required: false }] }], ariaSetSize: [{ type: Input, args: [{ isSignal: true, alias: "ariaSetSize", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], template: [{ type: Input, args: [{ isSignal: true, alias: "template", required: false }] }], checkIconTemplate: [{ type: Input, args: [{ isSignal: true, alias: "checkIconTemplate", required: false }] }], itemCheckboxIconTemplate: [{ type: Input, args: [{ isSignal: true, alias: "itemCheckboxIconTemplate", required: false }] }], highlightOnSelect: [{ type: Input, args: [{ isSignal: true, alias: "highlightOnSelect", required: false }] }], onClick: [{ type: Output, args: ["onClick"] }], onMouseEnter: [{ type: Output, args: ["onMouseEnter"] }] });
})();
var MULTISELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};
var MultiSelect = class _MultiSelect extends BaseEditableHolder {
  componentName = "MultiSelect";
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
   * Inline style of the overlay panel.
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
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "readonly" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Whether to display options as grouped when nested options are provided.
   * @group Props
   */
  group = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "group" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * When specified, displays an input field to filter the items on keyup.
   * @group Props
   */
  filter = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "filter" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Defines placeholder of the filter input.
   * @group Props
   */
  filterPlaceHolder = input(
    ...ngDevMode ? [void 0, { debugName: "filterPlaceHolder" }] : (
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
   * Specifies the visibility of the options panel.
   * @group Props
   */
  overlayVisible = model(
    false,
    ...ngDevMode ? [{ debugName: "overlayVisible" }] : (
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
   * Whether to show labels of selected item labels or use default label.
   * @group Props
   * @defaultValue true
   */
  displaySelectedLabel = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "displaySelectedLabel" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Decides how many selected item labels to show at most.
   * @group Props
   * @defaultValue 3
   */
  maxSelectedLabels = input(
    3,
    ...ngDevMode ? [{ debugName: "maxSelectedLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Maximum number of selectable items.
   * @group Props
   */
  selectionLimit = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "selectionLimit" } : (
    /* istanbul ignore next */
    {}
  )), { transform: numberAttribute }));
  /**
   * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
   * @group Props
   */
  selectedItemsLabel = input(
    ...ngDevMode ? [void 0, { debugName: "selectedItemsLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Whether to show the checkbox at header to toggle all items at once.
   * @group Props
   */
  showToggleAll = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "showToggleAll" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Text to display when filtering does not return any results.
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
   * Clears the filter value when hiding the dropdown.
   * @group Props
   */
  resetFilterOnHide = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "resetFilterOnHide" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Icon class of the dropdown icon.
   * @group Props
   */
  dropdownIcon = input(
    ...ngDevMode ? [void 0, { debugName: "dropdownIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Icon class of the chip icon.
   * @group Props
   */
  chipIcon = input(
    ...ngDevMode ? [void 0, { debugName: "chipIcon" }] : (
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
   * Whether to show the header.
   * @group Props
   */
  showHeader = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "showHeader" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
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
   * Whether the multiselect is in loading state.
   * @group Props
   */
  loading = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "loading" } : (
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
   * Applies focus to the filter element when the overlay is shown.
   * @group Props
   */
  autofocusFilter = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "autofocusFilter" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  /**
   * Defines how the selected items are displayed.
   * @group Props
   */
  display = input(
    "comma",
    ...ngDevMode ? [{ debugName: "display" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Defines the autocomplete is active.
   * @group Props
   */
  autocomplete = input(
    "off",
    ...ngDevMode ? [{ debugName: "autocomplete" }] : (
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
   * Label to display when there are no selections.
   * @group Props
   */
  placeholder = input(
    ...ngDevMode ? [void 0, { debugName: "placeholder" }] : (
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
   * Whether all data is selected.
   * @group Props
   */
  selectAll = input(
    ...ngDevMode ? [void 0, { debugName: "selectAll" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /**
   * Indicates whether to focus on options when hovering over them, defaults to optionLabel.
   * @group Props
   */
  focusOnHover = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "focusOnHover" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
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
   * Determines if the option will be selected on focus.
   * @group Props
   */
  selectOnFocus = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "selectOnFocus" } : (
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
   * Whether the selected option will be add highlight class.
   * @group Props
   */
  highlightOnSelect = input(true, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "highlightOnSelect" } : (
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
   * Callback to invoke when value changes.
   * @param {MultiSelectChangeEvent} event - Custom change event.
   * @group Emits
   */
  onChange = output();
  /**
   * Callback to invoke when data is filtered.
   * @param {MultiSelectFilterEvent} event - Custom filter event.
   * @group Emits
   */
  onFilter = output();
  /**
   * Callback to invoke when multiselect receives focus.
   * @param {MultiSelectFocusEvent} event - Custom focus event.
   * @group Emits
   */
  onFocus = output();
  /**
   * Callback to invoke when multiselect loses focus.
   * @param {MultiSelectBlurEvent} event - Custom blur event.
   * @group Emits
   */
  onBlur = output();
  /**
   * Callback to invoke when component is clicked.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onClick = output();
  /**
   * Callback to invoke when input field is cleared.
   * @group Emits
   */
  onClear = output();
  /**
   * Callback to invoke when overlay panel becomes visible.
   * @param {MotionEvent} event - Motion event. The AnimationEvent typing is deprecated and kept for backward compatibility; only the MotionEvent properties exist at runtime.
   * @group Emits
   */
  onPanelShow = output();
  /**
   * Callback to invoke when overlay panel becomes hidden.
   * @param {MotionEvent} event - Motion event. The AnimationEvent typing is deprecated and kept for backward compatibility; only the MotionEvent properties exist at runtime.
   * @group Emits
   */
  onPanelHide = output();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
   * @group Emits
   */
  onLazyLoad = output();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectRemoveEvent} event - Remove event.
   * @group Emits
   */
  onRemove = output();
  /**
   * Callback to invoke when all data is selected.
   * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
   * @group Emits
   */
  onSelectAllChange = output();
  overlayViewChild = viewChild(
    "overlay",
    ...ngDevMode ? [{ debugName: "overlayViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filterInputChild = viewChild(
    "filterInput",
    ...ngDevMode ? [{ debugName: "filterInputChild" }] : (
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
  lastHiddenFocusableElementOnOverlay = viewChild(
    "lastHiddenFocusableEl",
    ...ngDevMode ? [{ debugName: "lastHiddenFocusableElementOnOverlay" }] : (
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
  headerCheckboxViewChild = viewChild(
    "headerCheckbox",
    ...ngDevMode ? [{ debugName: "headerCheckboxViewChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  footerFacet = contentChild(Footer, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "footerFacet" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  headerFacet = contentChild(Header, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "headerFacet" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  _componentStyle = inject(MultiSelectStyle);
  bindDirectiveInstance = inject(Bind, { self: true });
  searchValue;
  searchTimeout = null;
  _disableTooltip = false;
  value;
  _filteredOptions;
  focus;
  filtered;
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
   * Custom header template.
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
   * Custom selected items template.
   * @group Templates
   */
  selectedItemsTemplate = contentChild("selecteditems", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "selectedItemsTemplate" } : (
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
   * Custom filter icon template.
   * @group Templates
   */
  filterIconTemplate = contentChild("filtericon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "filterIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom remove token icon template.
   * @group Templates
   */
  removeTokenIconTemplate = contentChild("removetokenicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "removeTokenIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom chip icon template.
   * @group Templates
   */
  chipIconTemplate = contentChild("chipicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "chipIconTemplate" } : (
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
   * Custom dropdown icon template.
   * @group Templates
   */
  dropdownIconTemplate = contentChild("dropdownicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "dropdownIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom item checkbox icon template.
   * @group Templates
   */
  itemCheckboxIconTemplate = contentChild("itemcheckboxicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "itemCheckboxIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  /**
   * Custom header checkbox icon template.
   * @group Templates
   */
  headerCheckboxIconTemplate = contentChild("headercheckboxicon", __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "headerCheckboxIconTemplate" } : (
    /* istanbul ignore next */
    {}
  )), { descendants: false }));
  $variant = computed(
    () => this.variant() || this.config.inputVariant() || void 0,
    ...ngDevMode ? [{ debugName: "$variant" }] : (
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
  internalId = s("pn_id_");
  $id = computed(
    () => this.id() || this.internalId,
    ...ngDevMode ? [{ debugName: "$id" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $pcMultiSelect = inject(MULTISELECT_INSTANCE, { optional: true, skipSelf: true }) ?? void 0;
  pcFluid = inject(Fluid, { optional: true, host: true, skipSelf: true });
  translation = toSignal(this.config.translationObserver, { initialValue: this.config.translation });
  get hasFluid() {
    return this.fluid() ?? !!this.pcFluid;
  }
  headerCheckboxFocus;
  filterOptions;
  preventModelTouched;
  focused = false;
  itemsWrapper = null;
  modelValue = signal(
    null,
    ...ngDevMode ? [{ debugName: "modelValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _filterValue = signal(
    null,
    ...ngDevMode ? [{ debugName: "_filterValue" }] : (
      /* istanbul ignore next */
      []
    )
  );
  _options = signal(
    [],
    ...ngDevMode ? [{ debugName: "_options" }] : (
      /* istanbul ignore next */
      []
    )
  );
  startRangeIndex = signal(
    -1,
    ...ngDevMode ? [{ debugName: "startRangeIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusedOptionIndex = signal(
    -1,
    ...ngDevMode ? [{ debugName: "focusedOptionIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedOptions = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clickInProgress = false;
  emptyMessageLabel = computed(
    () => {
      const t = this.translation();
      return this.emptyMessage() || t?.emptyMessage || "";
    },
    ...ngDevMode ? [{ debugName: "emptyMessageLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  emptyFilterMessageLabel = computed(
    () => {
      const t = this.translation();
      return this.emptyFilterMessage() || t?.emptyFilterMessage || "";
    },
    ...ngDevMode ? [{ debugName: "emptyFilterMessageLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isVisibleClearIcon = computed(
    () => this.modelValue() != null && this.modelValue() !== "" && l(this.modelValue()) && this.showClear() && !this.$disabled() && !this.readonly() && this.$filled(),
    ...ngDevMode ? [{ debugName: "isVisibleClearIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  toggleAllAriaLabel = computed(
    () => {
      const t = this.translation();
      return t?.aria ? t.aria[this.allSelected() ? "selectAll" : "unselectAll"] : void 0;
    },
    ...ngDevMode ? [{ debugName: "toggleAllAriaLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  listLabel = computed(
    () => {
      const t = this.translation();
      return t?.aria?.listLabel || "";
    },
    ...ngDevMode ? [{ debugName: "listLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  placeholderLabel = computed(
    () => this.placeholder() || "empty",
    ...ngDevMode ? [{ debugName: "placeholderLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labelDisplay = computed(
    () => this.label() || "empty",
    ...ngDevMode ? [{ debugName: "labelDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  listId = computed(
    () => this.$id() + "_list",
    ...ngDevMode ? [{ debugName: "listId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  getAllVisibleAndNonVisibleOptions() {
    const group = this.group();
    const options = this.options();
    return group ? this.flatOptions(options) : options || [];
  }
  visibleOptions = computed(
    () => {
      const options = this.getAllVisibleAndNonVisibleOptions();
      const isArrayOfObjects = A(options) && ObjectUtils.isObject(options[0]);
      const filterVal = this.filterValue() ?? this._filterValue();
      const group = this.group();
      const filterMatchMode = this.filterMatchMode();
      const filterLocale = this.filterLocale();
      const optionGroupChildren = this.optionGroupChildren();
      if (filterVal) {
        let filteredOptions;
        if (isArrayOfObjects) {
          filteredOptions = this.filterService.filter(options, this.searchFields(), filterVal, filterMatchMode, filterLocale);
        } else {
          filteredOptions = options.filter((option) => option.toString().toLocaleLowerCase().includes(filterVal.toLocaleLowerCase()));
        }
        if (group) {
          const optionGroups = this.options() || [];
          const filtered = [];
          optionGroups.forEach((grp) => {
            const groupChildren = this.getOptionGroupChildren(grp);
            const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));
            if (filteredItems.length > 0)
              filtered.push(__spreadProps(__spreadValues({}, grp), {
                [typeof optionGroupChildren === "string" ? optionGroupChildren : "items"]: [...filteredItems]
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
      let label;
      const modelValue = this.modelValue();
      const displaySelectedLabel = this.displaySelectedLabel();
      const maxSelectedLabels = this.maxSelectedLabels();
      if (modelValue && modelValue?.length && displaySelectedLabel) {
        if (l(maxSelectedLabels) && modelValue?.length > (maxSelectedLabels || 0)) {
          return this.getSelectedItemsLabel();
        } else {
          label = "";
          for (let i = 0; i < modelValue.length; i++) {
            if (i !== 0) {
              label += ", ";
            }
            label += this.getLabelByValue(modelValue[i]);
          }
        }
      } else {
        label = this.placeholder() || "";
      }
      return label;
    },
    ...ngDevMode ? [{ debugName: "label" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chipSelectedItems = computed(
    () => {
      const maxSelectedLabels = this.maxSelectedLabels();
      return l(maxSelectedLabels) && this.modelValue() && this.modelValue()?.length > (maxSelectedLabels || 0) ? this.modelValue()?.slice(0, maxSelectedLabels) : this.modelValue();
    },
    ...ngDevMode ? [{ debugName: "chipSelectedItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filterService = inject(FilterService);
  overlayService = inject(OverlayService);
  constructor() {
    super();
    effect(() => {
      const opts = this.options();
      if (opts !== void 0 && !R(untracked(() => this._options()), opts)) {
        this._options.set(opts || []);
      }
    });
    effect(() => {
      const fv = this.filterValue();
      if (fv !== void 0) {
        this._filterValue.set(fv);
      }
    });
    effect(() => {
      const modelValue = this.modelValue();
      const optionValue = this.optionValue();
      const optionLabel = this.optionLabel();
      const allVisibleAndNonVisibleOptions = this.getAllVisibleAndNonVisibleOptions();
      if (allVisibleAndNonVisibleOptions && l(allVisibleAndNonVisibleOptions)) {
        if (optionValue && optionLabel && modelValue) {
          this.selectedOptions.set(allVisibleAndNonVisibleOptions.filter((option) => modelValue.includes(option[optionLabel]) || modelValue.includes(option[optionValue])));
        } else {
          this.selectedOptions.set(modelValue);
        }
      }
    });
  }
  $ariaSetSize = computed(
    () => this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length,
    ...ngDevMode ? [{ debugName: "$ariaSetSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $virtualScrollerDisabled = computed(
    () => !this.virtualScroll(),
    ...ngDevMode ? [{ debugName: "$virtualScrollerDisabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  $focusedOptionId = computed(
    () => this.focusedOptionIndex() !== -1 ? `${this.$id()}_${this.focusedOptionIndex()}` : null,
    ...ngDevMode ? [{ debugName: "$focusedOptionId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  labelDataP = computed(
    () => {
      const maxSelectedLabels = this.maxSelectedLabels();
      const modelValue = this.modelValue();
      return this.cn({
        placeholder: this.label() === this.placeholder(),
        clearable: this.showClear(),
        disabled: this.$disabled(),
        [this.size()]: this.size(),
        "has-chip": this.display() === "chip" && modelValue && modelValue.length && (maxSelectedLabels ? modelValue.length <= maxSelectedLabels : true),
        empty: !this.placeholder() && !this.$filled()
      });
    },
    ...ngDevMode ? [{ debugName: "labelDataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dropdownIconDataP = computed(
    () => this.cn({
      [this.size()]: this.size()
    }),
    ...ngDevMode ? [{ debugName: "dropdownIconDataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overlayDataP = computed(
    () => this.cn({
      ["overlay-" + this.appendTo()]: "overlay-" + this.appendTo()
    }),
    ...ngDevMode ? [{ debugName: "overlayDataP" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ariaExpanded = computed(
    () => this.overlayVisible() ?? false,
    ...ngDevMode ? [{ debugName: "ariaExpanded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ariaControls = computed(
    () => this.overlayVisible() ? this.listId() : null,
    ...ngDevMode ? [{ debugName: "ariaControls" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputTabindex = computed(
    () => !this.$disabled() ? this.tabindex() : -1,
    ...ngDevMode ? [{ debugName: "inputTabindex" }] : (
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
  disabledAttr = computed(
    () => this.$disabled() ? "" : void 0,
    ...ngDevMode ? [{ debugName: "disabledAttr" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get ariaActivedescendant() {
    return this.focused ? this.$focusedOptionId() : void 0;
  }
  isCommaDisplay = computed(
    () => this.display() === "comma",
    ...ngDevMode ? [{ debugName: "isCommaDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isChipDisplay = computed(
    () => this.display() === "chip",
    ...ngDevMode ? [{ debugName: "isChipDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showSelectedItemsLabel = computed(
    () => {
      const items = this.chipSelectedItems();
      return items && items.length === this.maxSelectedLabels();
    },
    ...ngDevMode ? [{ debugName: "showSelectedItemsLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasChipRemoveIconTemplate = computed(
    () => !!(this.chipIconTemplate() || this.removeTokenIconTemplate()),
    ...ngDevMode ? [{ debugName: "hasChipRemoveIconTemplate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isEditable = computed(
    () => !this.$disabled() && !this.readonly(),
    ...ngDevMode ? [{ debugName: "isEditable" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isModelEmpty = computed(
    () => {
      const value = this.modelValue();
      return !value || value.length === 0;
    },
    ...ngDevMode ? [{ debugName: "isModelEmpty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showToggleAllCheckbox = computed(
    () => this.showToggleAll() && !this.selectionLimit(),
    ...ngDevMode ? [{ debugName: "showToggleAllCheckbox" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showDefaultHeaderCheckIcon = computed(
    () => !this.headerCheckboxIconTemplate() && this.allSelected(),
    ...ngDevMode ? [{ debugName: "showDefaultHeaderCheckIcon" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showEmptyFilterMessage = computed(
    () => this.hasFilter() && this.isEmpty(),
    ...ngDevMode ? [{ debugName: "showEmptyFilterMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showEmptyMessage = computed(
    () => !this.hasFilter() && this.isEmpty(),
    ...ngDevMode ? [{ debugName: "showEmptyMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasFooterContent = computed(
    () => !!(this.footerFacet() || this.footerTemplate()),
    ...ngDevMode ? [{ debugName: "hasFooterContent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chipIconContext = { class: "p-multiselect-chip-icon" };
  selectedItemsContext = computed(
    () => ({
      $implicit: this.selectedOptions(),
      removeChip: this.removeOption.bind(this)
    }),
    ...ngDevMode ? [{ debugName: "selectedItemsContext" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dropdownIconContext = computed(
    () => ({ dataP: this.dropdownIconDataP() }),
    ...ngDevMode ? [{ debugName: "dropdownIconContext" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filterContext = computed(
    () => ({ options: this.filterOptions }),
    ...ngDevMode ? [{ debugName: "filterContext" }] : (
      /* istanbul ignore next */
      []
    )
  );
  defaultItemsContext = computed(
    () => ({ $implicit: this.visibleOptions(), options: {} }),
    ...ngDevMode ? [{ debugName: "defaultItemsContext" }] : (
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
  listContainerMaxHeight = computed(
    () => this.virtualScroll() ? "auto" : this.scrollHeight() || "auto",
    ...ngDevMode ? [{ debugName: "listContainerMaxHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onInit() {
    this.autoUpdateModel();
    if (this.filterBy()) {
      this.filterOptions = {
        filter: (value) => this.onFilterInputChange(value),
        reset: () => this.resetFilter()
      };
    }
  }
  maxSelectionLimitReached() {
    const selectionLimit = this.selectionLimit();
    return selectionLimit && this.modelValue() && this.modelValue().length === selectionLimit;
  }
  onAfterViewInit() {
    if (this.overlayVisible()) {
      this.show();
    }
  }
  onAfterViewChecked() {
    this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
    if (this.filtered) {
      setTimeout(() => {
        this.overlayViewChild()?.alignOverlay();
      }, 1);
      this.filtered = false;
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
      const value = this.getOptionValue(this.visibleOptions()[this.focusedOptionIndex()]);
      this.onOptionSelect({ originalEvent: null, option: [value] });
    }
  }
  /**
   * Updates the model value.
   * @group Method
   */
  updateModel(value, _event) {
    this.value = value;
    this.onModelChange(value);
    this.writeValue(value);
  }
  onInputClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.focusedOptionIndex.set(-1);
  }
  onOptionSelect(event, isFocus = false, index = -1) {
    const { originalEvent, option } = event;
    if (this.$disabled() || this.isOptionDisabled(option)) {
      return;
    }
    let selected = this.isSelected(option);
    let value = [];
    if (selected) {
      value = this.modelValue().filter((val) => !b(val, this.getOptionValue(option), this.equalityKey() || ""));
    } else {
      value = [...this.modelValue() || [], this.getOptionValue(option)];
    }
    this.updateModel(value, originalEvent);
    if (index !== -1) {
      this.focusedOptionIndex.set(index);
    }
    if (isFocus) {
      kt(this.focusInputViewChild()?.nativeElement);
    }
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: option
    });
  }
  findSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  onOptionSelectRange(event, start = -1, end = -1) {
    if (start === -1) {
      start = this.findNearestSelectedOptionIndex(end, true);
    }
    if (end === -1) {
      end = this.findNearestSelectedOptionIndex(start);
    }
    if (start !== -1 && end !== -1) {
      const rangeStart = Math.min(start, end);
      const rangeEnd = Math.max(start, end);
      const value = this.visibleOptions().slice(rangeStart, rangeEnd + 1).filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
      this.updateModel(value, event);
    }
  }
  searchFields() {
    return (this.filterBy() || this.optionLabel() || "label").split(",");
  }
  findNearestSelectedOptionIndex(index, firstCheckUp = false) {
    let matchedOptionIndex = -1;
    if (this.hasSelectedOption()) {
      if (firstCheckUp) {
        matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
      } else {
        matchedOptionIndex = this.findNextSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
      }
    }
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findPrevSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? z(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
  }
  findFirstFocusedOptionIndex() {
    const selectedIndex = this.findFirstSelectedOptionIndex();
    return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
  }
  findFirstOptionIndex() {
    return this.visibleOptions().findIndex((option) => this.isValidOption(option));
  }
  findFirstSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  findNextSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
  }
  equalityKey() {
    return this.optionValue() ? null : this.dataKey();
  }
  hasSelectedOption() {
    return l(this.modelValue());
  }
  isValidSelectedOption(option) {
    return this.isValidOption(option) && this.isSelected(option);
  }
  isOptionGroup(option) {
    return option && (this.group() || this.optionGroupLabel()) && option.optionGroup && option.group;
  }
  isValidOption(option) {
    return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
  }
  isOptionDisabled(option) {
    if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
      return true;
    }
    const optionDisabled = this.optionDisabled();
    return optionDisabled ? d(option, optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false;
  }
  isSelected(option) {
    const optionValue = this.getOptionValue(option);
    return (this.modelValue() || []).some((value) => b(value, optionValue, this.equalityKey() || ""));
  }
  isOptionMatched(option) {
    const filterLocale = this.filterLocale();
    return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(filterLocale).startsWith(this.searchValue?.toLocaleLowerCase(filterLocale));
  }
  isEmpty() {
    return !this._options() || this.visibleOptions() && this.visibleOptions().length === 0;
  }
  getOptionIndex(index, scrollerOptions) {
    return this.$virtualScrollerDisabled() ? index : scrollerOptions && scrollerOptions.getItemOptions(index)["index"];
  }
  getOptionTrackKey(option, index) {
    const key = this.isOptionGroup(option) ? this.getOptionGroupLabel(option.optionGroup) : this.getOptionValue(option);
    return `${key ?? ""}_${index}`;
  }
  getAriaPosInset(index) {
    return (this.optionGroupLabel() ? index - this.visibleOptions().slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
  }
  getLabelByValue(value) {
    const group = this.group();
    const opts = this.options();
    const options = group ? this.flatOptions(opts) : opts || [];
    const matchedOption = options.find((option) => !this.isOptionGroup(option) && b(this.getOptionValue(option), value, this.equalityKey() || ""));
    return matchedOption ? this.getOptionLabel(matchedOption) : null;
  }
  getSelectedItemsLabel() {
    let pattern = /{(.*?)}/;
    const selectedItemsLabel = this.selectedItemsLabel();
    let message = selectedItemsLabel ? selectedItemsLabel : this.translate(TranslationKeys.SELECTION_MESSAGE);
    if (pattern.test(message)) {
      return message.replace(message.match(pattern)[0], this.modelValue().length + "");
    }
    return message;
  }
  getOptionLabel(option) {
    const optionLabel = this.optionLabel();
    return optionLabel ? d(option, optionLabel) : option && option.label != void 0 ? option.label : option;
  }
  getOptionValue(option) {
    const optionValue = this.optionValue();
    const optionLabel = this.optionLabel();
    return optionValue ? d(option, optionValue) : !optionLabel && option && option.value !== void 0 ? option.value : option;
  }
  getOptionGroupLabel(optionGroup) {
    const optionGroupLabel = this.optionGroupLabel();
    return optionGroupLabel ? d(optionGroup, optionGroupLabel) : optionGroup && optionGroup.label != void 0 ? optionGroup.label : optionGroup;
  }
  getOptionGroupChildren(optionGroup) {
    const optionGroupChildren = this.optionGroupChildren();
    return optionGroup ? optionGroupChildren ? d(optionGroup, optionGroupChildren) : optionGroup.items : [];
  }
  onKeyDown(event) {
    if (this.$disabled()) {
      event.preventDefault();
      return;
    }
    const metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "PageDown":
        this.onPageDownKey(event);
        break;
      case "PageUp":
        this.onPageUpKey(event);
        break;
      case "Enter":
      case "Space":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event);
        break;
      case "ShiftLeft":
      case "ShiftRight":
        this.onShiftKey();
        break;
      default:
        if (event.code === "KeyA" && metaKey) {
          const value = this.visibleOptions().filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
          this.updateModel(value, event);
          event.preventDefault();
          break;
        }
        if (!metaKey && J(event.key)) {
          if (!this.overlayVisible()) {
            this.show();
          }
          this.searchOptions(event, event.key);
          event.preventDefault();
        }
        break;
    }
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
        this.onEnterKey(event);
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
  onArrowLeftKey(event, pressedInInputText = false) {
    if (pressedInInputText) {
      this.focusedOptionIndex.set(-1);
    }
  }
  onArrowDownKey(event) {
    const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
    if (event.shiftKey) {
      this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
    }
    this.changeFocusedOptionIndex(event, optionIndex);
    if (!this.overlayVisible()) {
      this.show();
    }
    event.preventDefault();
    event.stopPropagation();
  }
  onArrowUpKey(event, pressedInInputText = false) {
    if (event.altKey && !pressedInInputText) {
      if (this.focusedOptionIndex() !== -1) {
        this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
      }
      if (this.overlayVisible()) {
        this.hide();
      }
      event.preventDefault();
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();
      if (event.shiftKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      if (!this.overlayVisible()) {
        this.show();
      }
      event.preventDefault();
    }
    event.stopPropagation();
  }
  onHomeKey(event, pressedInInputText = false) {
    const { currentTarget } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findFirstOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      if (!this.overlayVisible()) {
        this.show();
      }
    }
    event.preventDefault();
  }
  onEndKey(event, pressedInInputText = false) {
    const { currentTarget } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findLastFocusedOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
      }
      this.changeFocusedOptionIndex(event, optionIndex);
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
  onEnterKey(event) {
    if (!this.overlayVisible()) {
      this.onArrowDownKey(event);
    } else {
      if (this.focusedOptionIndex() !== -1) {
        if (event.shiftKey) {
          this.onOptionSelectRange(event, this.focusedOptionIndex());
        } else {
          this.onOptionSelect({ originalEvent: event, option: this.visibleOptions()[this.focusedOptionIndex()] });
        }
      }
    }
    event.preventDefault();
  }
  onEscapeKey(event) {
    if (this.overlayVisible()) {
      this.hide(true);
      event.stopPropagation();
      event.preventDefault();
    }
  }
  onTabKey(event, pressedInInputText = false) {
    if (!pressedInInputText) {
      if (this.overlayVisible() && this.hasFocusableElements()) {
        kt(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay()?.nativeElement : this.firstHiddenFocusableElementOnOverlay()?.nativeElement);
        event.preventDefault();
      } else {
        if (this.focusedOptionIndex() !== -1) {
          const option = this.visibleOptions()[this.focusedOptionIndex()];
          if (!this.isSelected(option)) {
            this.onOptionSelect({ originalEvent: event, option });
          }
        }
        if (this.overlayVisible()) {
          this.hide(this.filter());
        }
      }
    }
  }
  onShiftKey() {
    this.startRangeIndex.set(this.focusedOptionIndex());
  }
  onContainerClick(event) {
    if (this.$disabled() || this.loading() || this.readonly() || event.target?.isSameNode?.(this.focusInputViewChild()?.nativeElement)) {
      return;
    }
    const overlayViewChild = this.overlayViewChild();
    if (!overlayViewChild || !overlayViewChild.el.nativeElement.contains(event.target)) {
      if (this.clickInProgress) {
        return;
      }
      this.clickInProgress = true;
      setTimeout(() => {
        this.clickInProgress = false;
      }, 150);
      if (this.overlayVisible()) {
        this.hide(true);
      } else {
        this.show(true);
      }
    }
    this.focusInputViewChild()?.nativeElement.focus({ preventScroll: true });
    this.onClick.emit(event);
    this.cd.detectChanges();
  }
  onFirstHiddenFocus(event) {
    const focusInputViewChild = this.focusInputViewChild();
    const overlayViewChild = this.overlayViewChild();
    const focusableEl = event.relatedTarget === focusInputViewChild?.nativeElement ? Ot(overlayViewChild?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])') : focusInputViewChild?.nativeElement;
    kt(focusableEl);
  }
  onInputFocus(event) {
    this.focused = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible() && this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : -1;
    this.focusedOptionIndex.set(focusedOptionIndex);
    if (this.overlayVisible()) {
      this.scrollInView(this.focusedOptionIndex());
    }
    this.onFocus.emit({ originalEvent: event });
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit({ originalEvent: event });
    if (!this.preventModelTouched) {
      this.onModelTouched();
    }
    this.preventModelTouched = false;
  }
  onFilterInputChange(event) {
    let value = event.target.value;
    this._filterValue.set(value);
    this.focusedOptionIndex.set(-1);
    this.onFilter.emit({ originalEvent: event, filter: this._filterValue() });
    if (!this.$virtualScrollerDisabled()) {
      this.scroller()?.scrollToIndex(0);
    }
    setTimeout(() => {
      this.overlayViewChild()?.alignOverlay();
    });
  }
  onLastHiddenFocus(event) {
    const focusInputViewChild = this.focusInputViewChild();
    const overlayViewChild = this.overlayViewChild();
    const focusableEl = event.relatedTarget === focusInputViewChild?.nativeElement ? Bt(overlayViewChild?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])') : focusInputViewChild?.nativeElement;
    kt(focusableEl);
  }
  onOptionMouseEnter(event, index) {
    if (this.focusOnHover()) {
      this.changeFocusedOptionIndex(event, index);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFilterBlur(event) {
    this.focusedOptionIndex.set(-1);
  }
  onToggleAll(event) {
    if (this.$disabled() || this.readonly()) {
      return;
    }
    const selectAll = this.selectAll();
    if (selectAll != null) {
      this.onSelectAllChange.emit({
        originalEvent: event,
        checked: !this.allSelected()
      });
    } else {
      const optionDisabled = this.optionDisabled();
      const selectedDisabledOptions = this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && (optionDisabled ? d(option, optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false));
      const visibleOptions = this.allSelected() ? this.visibleOptions().filter((option) => !this.isValidOption(option) && this.isSelected(option)) : this.visibleOptions().filter((option) => this.isSelected(option) || this.isValidOption(option));
      const selectedOptionsBeforeSearch = this.filter() && !this.allSelected() ? this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && this.isValidOption(option)) : [];
      const optionValues = [...selectedOptionsBeforeSearch, ...selectedDisabledOptions, ...visibleOptions].map((option) => this.getOptionValue(option));
      const value = [...new Set(optionValues)];
      this.updateModel(value, event);
      if (!value.length || value.length === this.getAllVisibleAndNonVisibleOptions().length) {
        this.onSelectAllChange.emit({
          originalEvent: event,
          checked: !!value.length
        });
      }
    }
    if (this.partialSelected()) {
      this.selectedOptions.set([]);
    }
    this.onChange.emit({ originalEvent: event, value: this.value });
    DomHandler.focus(this.headerCheckboxViewChild()?.inputViewChild()?.nativeElement);
    this.headerCheckboxFocus = true;
    event.originalEvent.preventDefault();
    event.originalEvent.stopPropagation();
  }
  changeFocusedOptionIndex(event, index) {
    if (this.focusedOptionIndex() !== index) {
      this.focusedOptionIndex.set(index);
      this.scrollInView();
    }
  }
  scrollInView(index = -1) {
    const id = index !== -1 ? `${this.$id()}_${index}` : this.$focusedOptionId();
    const itemsViewChild = this.itemsViewChild();
    if (itemsViewChild && itemsViewChild.nativeElement) {
      const element = et(itemsViewChild.nativeElement, `li[id="${id}"]`);
      if (element) {
        if (element.scrollIntoView) {
          element.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      } else if (!this.$virtualScrollerDisabled()) {
        setTimeout(() => {
          if (this.virtualScroll()) {
            this.scroller()?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
          }
        }, 0);
      }
    }
  }
  allSelected() {
    const selectAll = this.selectAll();
    return selectAll !== null ? selectAll : l(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
  }
  partialSelected() {
    const opts = this.options();
    const selected = this.selectedOptions();
    return selected && selected.length > 0 && selected.length < (opts?.length || 0);
  }
  /**
   * Displays the panel.
   * @group Method
   */
  show(isFocus) {
    this.overlayVisible.set(true);
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus() ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex();
    this.focusedOptionIndex.set(focusedOptionIndex);
    if (isFocus) {
      kt(this.focusInputViewChild()?.nativeElement);
    }
  }
  /**
   * Hides the panel.
   * @group Method
   */
  hide(isFocus) {
    this.overlayVisible.set(false);
    this.focusedOptionIndex.set(-1);
    if (this.filter() && this.resetFilterOnHide()) {
      this.resetFilter();
    }
    if (this.overlayOptions()?.mode === "modal") {
      unblockBodyScroll();
    }
    if (isFocus) {
      kt(this.focusInputViewChild()?.nativeElement);
    }
  }
  onOverlayBeforeEnter(event) {
    const overlayViewChild = this.overlayViewChild();
    const scroller = this.scroller();
    const itemsViewChild = this.itemsViewChild();
    const virtualScroll = this.virtualScroll();
    const opts = this.options();
    this.itemsWrapper = et(overlayViewChild?.overlayViewChild()?.nativeElement, virtualScroll ? '[data-pc-name="virtualscroller"]' : '[data-pc-section="listcontainer"]');
    if (virtualScroll) {
      scroller?.setContentEl(itemsViewChild?.nativeElement);
    }
    if (opts && opts.length) {
      if (virtualScroll) {
        const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
        if (selectedIndex !== -1) {
          scroller?.scrollToIndex(selectedIndex);
        }
      } else if (this.itemsWrapper) {
        let selectedListItem = et(this.itemsWrapper, '[data-pc-section="option"][data-p-selected="true"]');
        if (selectedListItem) {
          selectedListItem.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }
    }
    const filterInputChild = this.filterInputChild();
    if (filterInputChild && filterInputChild.nativeElement) {
      this.preventModelTouched = true;
      if (this.autofocusFilter()) {
        filterInputChild.nativeElement.focus();
      }
    }
    this.onPanelShow.emit(event);
  }
  onOverlayAfterLeave(event) {
    this.itemsWrapper = null;
    this.onModelTouched();
    this.onPanelHide.emit(event);
  }
  resetFilter() {
    const filterInputChild = this.filterInputChild();
    if (filterInputChild && filterInputChild.nativeElement) {
      filterInputChild.nativeElement.value = "";
    }
    this._filterValue.set(null);
    this._filteredOptions = null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onOverlayHide(event) {
    this.hide();
  }
  close(event) {
    this.hide();
    event.preventDefault();
    event.stopPropagation();
  }
  clear(event) {
    this.value = [];
    this.updateModel(null, event);
    this.selectedOptions.set([]);
    this.onClear.emit();
    this._disableTooltip = true;
    event.stopPropagation();
  }
  labelContainerMouseLeave() {
    if (this._disableTooltip)
      this._disableTooltip = false;
  }
  removeOption(optionValue, event) {
    let value = this.modelValue().filter((val) => !b(val, optionValue, this.equalityKey() || ""));
    this.updateModel(value, event);
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: optionValue
    });
    this.onRemove.emit({
      newValue: value,
      removed: optionValue
    });
    if (event) {
      event.stopPropagation();
    }
  }
  findNextOptionIndex(index) {
    const matchedOptionIndex = index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  }
  findPrevOptionIndex(index) {
    const matchedOptionIndex = index > 0 ? z(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findLastSelectedOptionIndex() {
    return this.hasSelectedOption() ? z(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
  }
  findLastFocusedOptionIndex() {
    const selectedIndex = this.findLastSelectedOptionIndex();
    return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
  }
  findLastOptionIndex() {
    return z(this.visibleOptions(), (option) => this.isValidOption(option));
  }
  searchOptions(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let optionIndex = -1;
    let matched = false;
    if (this.focusedOptionIndex() !== -1) {
      optionIndex = this.visibleOptions().slice(this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option));
      optionIndex = optionIndex === -1 ? this.visibleOptions().slice(0, this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex();
    } else {
      optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
    }
    if (optionIndex !== -1) {
      matched = true;
    }
    if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
      optionIndex = this.findFirstFocusedOptionIndex();
    }
    if (optionIndex !== -1) {
      this.changeFocusedOptionIndex(event, optionIndex);
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
  hasFocusableElements() {
    return x(this.overlayViewChild()?.overlayViewChild()?.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
  }
  hasFilter() {
    const filterVal = this._filterValue();
    return filterVal && filterVal.trim().length > 0;
  }
  get containerDataP() {
    return this.cn({
      invalid: this.invalid(),
      disabled: this.$disabled(),
      focus: this.focused,
      fluid: this.hasFluid,
      filled: this.$variant() === "filled",
      [this.size()]: this.size()
    });
  }
  getHeaderCheckboxIconContext(klass) {
    return { checked: this.allSelected(), partialSelected: this.partialSelected(), class: klass };
  }
  getScrollerItemsContext(items, scrollerOptions) {
    return { $implicit: items, options: scrollerOptions };
  }
  getLoaderContext(scrollerOptions) {
    return { options: scrollerOptions };
  }
  getGroupContext(option) {
    return { $implicit: option.optionGroup };
  }
  /**
   * @override
   *
   * @see {@link BaseEditableHolder.writeControlValue}
   * Writes the value to the control.
   */
  writeControlValue(value, setModelValue) {
    this.value = value;
    setModelValue(value);
  }
  getHeaderCheckboxPTOptions(key) {
    return this.ptm(key, {
      context: {
        selected: this.allSelected()
      }
    });
  }
  getPTOptions(option, itemOptions, index, key) {
    return this.ptm(key, {
      context: {
        selected: this.isSelected(option),
        focused: this.focusedOptionIndex() === this.getOptionIndex(index, itemOptions),
        disabled: this.isOptionDisabled(option)
      }
    });
  }
  static \u0275fac = function MultiSelect_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MultiSelect)();
  };
  static \u0275cmp = (function() {
    const _c03 = ["item"];
    const _c12 = ["group"];
    const _c22 = ["loader"];
    const _c32 = ["header"];
    const _c4 = ["filter"];
    const _c5 = ["footer"];
    const _c6 = ["emptyfilter"];
    const _c7 = ["empty"];
    const _c8 = ["selecteditems"];
    const _c9 = ["loadingicon"];
    const _c10 = ["filtericon"];
    const _c11 = ["removetokenicon"];
    const _c122 = ["chipicon"];
    const _c13 = ["clearicon"];
    const _c14 = ["dropdownicon"];
    const _c15 = ["itemcheckboxicon"];
    const _c16 = ["headercheckboxicon"];
    const _c17 = ["overlay"];
    const _c18 = ["filterInput"];
    const _c19 = ["focusInput"];
    const _c20 = ["items"];
    const _c21 = ["scroller"];
    const _c222 = ["lastHiddenFocusableEl"];
    const _c23 = ["firstHiddenFocusableEl"];
    const _c24 = ["headerCheckbox"];
    const _c25 = [[["p-header"]], [["p-footer"]]];
    const _c26 = ["p-header", "p-footer"];
    const _c27 = (a0) => ({
      height: a0
    });
    function _forTrack02($index, $item) {
      return this.getOptionTrackKey($item, $index);
    }
    function MultiSelect_Conditional_5_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275textInterpolate1(" ", ctx_r0.labelDisplay(), " ");
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275textInterpolate1(" ", ctx_r0.getSelectedItemsLabel(), " ");
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_ng_template_0_Conditional_0_ng_container_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_ng_template_0_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r4 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 22);
        \u0275\u0275listener("click", function MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_ng_template_0_Conditional_0_Template_span_click_0_listener($event) {
          \u0275\u0275restoreView(_r4);
          const item_r3 = \u0275\u0275nextContext(3).$implicit;
          const ctx_r0 = \u0275\u0275nextContext(4);
          return \u0275\u0275resetView(ctx_r0.removeOption(item_r3, $event));
        });
        \u0275\u0275template(1, MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_ng_template_0_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 23);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(7);
        \u0275\u0275classMap(ctx_r0.cx("chipIcon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("chipIcon"));
        \u0275\u0275attribute("aria-hidden", true);
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.chipIconTemplate() || ctx_r0.removeTokenIconTemplate())("ngTemplateOutletContext", ctx_r0.chipIconContext);
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_ng_template_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_ng_template_0_Conditional_0_Template, 2, 6, "span", 21);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(6);
        \u0275\u0275conditional(ctx_r0.isEditable() ? 0 : -1);
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_ng_template_0_Template, 1, 1, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r2 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 17, 3)(2, "p-chip", 20);
        \u0275\u0275listener("onRemove", function MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Template_p_chip_onRemove_2_listener($event) {
          const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
          const ctx_r0 = \u0275\u0275nextContext(4);
          return \u0275\u0275resetView(ctx_r0.removeOption(item_r3, $event));
        });
        \u0275\u0275conditionalCreate(3, MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Conditional_3_Template, 2, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const item_r3 = ctx.$implicit;
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275classMap(ctx_r0.cx("chipItem"));
        \u0275\u0275property("pBind", ctx_r0.ptm("chipItem"));
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx_r0.cx("pcChip"));
        \u0275\u0275property("pt", ctx_r0.ptm("pcChip"))("unstyled", ctx_r0.unstyled())("label", ctx_r0.getLabelByValue(item_r3))("removable", ctx_r0.isEditable())("removeIcon", ctx_r0.chipIcon());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.hasChipRemoveIconTemplate() ? 3 : -1);
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275repeaterCreate(0, MultiSelect_Conditional_5_Conditional_1_Conditional_1_For_1_Template, 4, 11, "div", 19, \u0275\u0275repeaterTrackByIndex);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275repeater(ctx_r0.chipSelectedItems());
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275textInterpolate1(" ", ctx_r0.placeholderLabel(), " ");
      }
    }
    function MultiSelect_Conditional_5_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_5_Conditional_1_Conditional_0_Template, 1, 1)(1, MultiSelect_Conditional_5_Conditional_1_Conditional_1_Template, 2, 0);
        \u0275\u0275conditionalCreate(2, MultiSelect_Conditional_5_Conditional_1_Conditional_2_Template, 1, 1);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r0.showSelectedItemsLabel() ? 0 : 1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx_r0.isModelEmpty() ? 2 : -1);
      }
    }
    function MultiSelect_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_5_Conditional_0_Template, 1, 1);
        \u0275\u0275conditionalCreate(1, MultiSelect_Conditional_5_Conditional_1_Template, 3, 2);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(ctx_r0.isCommaDisplay() ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.isChipDisplay() ? 1 : -1);
      }
    }
    function MultiSelect_Conditional_6_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_Conditional_6_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275textInterpolate1(" ", ctx_r0.placeholderLabel(), " ");
      }
    }
    function MultiSelect_Conditional_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_Conditional_6_ng_container_0_Template, 1, 0, "ng-container", 23);
        \u0275\u0275conditionalCreate(1, MultiSelect_Conditional_6_Conditional_1_Template, 1, 1);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.selectedItemsTemplate())("ngTemplateOutletContext", ctx_r0.selectedItemsContext());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.isModelEmpty() ? 1 : -1);
      }
    }
    function MultiSelect_Conditional_7_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r5 = \u0275\u0275getCurrentView();
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(0, "svg", 25);
        \u0275\u0275listener("click", function MultiSelect_Conditional_7_Conditional_0_Template_svg_click_0_listener($event) {
          \u0275\u0275restoreView(_r5);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.clear($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("clearIcon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("clearIcon"));
        \u0275\u0275attribute("aria-hidden", true);
      }
    }
    function MultiSelect_Conditional_7_Conditional_1_1_ng_template_0_Template(rf, ctx) {
    }
    function MultiSelect_Conditional_7_Conditional_1_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_Conditional_7_Conditional_1_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function MultiSelect_Conditional_7_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r6 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "span", 22);
        \u0275\u0275listener("click", function MultiSelect_Conditional_7_Conditional_1_Template_span_click_0_listener($event) {
          \u0275\u0275restoreView(_r6);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.clear($event));
        });
        \u0275\u0275template(1, MultiSelect_Conditional_7_Conditional_1_1_Template, 1, 0, null, 26);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("clearIcon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("clearIcon"));
        \u0275\u0275attribute("aria-hidden", true);
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.clearIconTemplate());
      }
    }
    function MultiSelect_Conditional_7_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_7_Conditional_0_Template, 1, 4, ":svg:svg", 24)(1, MultiSelect_Conditional_7_Conditional_1_Template, 2, 5, "span", 19);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(!ctx_r0.clearIconTemplate() ? 0 : 1);
      }
    }
    function MultiSelect_Conditional_9_Conditional_0_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_Conditional_9_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_Conditional_9_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 26);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.loadingIconTemplate());
      }
    }
    function MultiSelect_Conditional_9_Conditional_1_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 17);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("loadingIcon"), "pi-spin " + ctx_r0.loadingIcon()));
        \u0275\u0275property("pBind", ctx_r0.ptm("loadingIcon"));
        \u0275\u0275attribute("aria-hidden", true);
      }
    }
    function MultiSelect_Conditional_9_Conditional_1_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 17);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("loadingIcon"), "pi pi-spinner pi-spin"));
        \u0275\u0275property("pBind", ctx_r0.ptm("loadingIcon"));
        \u0275\u0275attribute("aria-hidden", true);
      }
    }
    function MultiSelect_Conditional_9_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_9_Conditional_1_Conditional_0_Template, 1, 4, "span", 19)(1, MultiSelect_Conditional_9_Conditional_1_Conditional_1_Template, 1, 4, "span", 19);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r0.loadingIcon() ? 0 : 1);
      }
    }
    function MultiSelect_Conditional_9_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_9_Conditional_0_Template, 1, 1, "ng-container")(1, MultiSelect_Conditional_9_Conditional_1_Template, 2, 1);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(ctx_r0.loadingIconTemplate() ? 0 : 1);
      }
    }
    function MultiSelect_Conditional_10_Conditional_0_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 17);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("dropdownIcon"), ctx_r0.dropdownIcon()));
        \u0275\u0275property("pBind", ctx_r0.ptm("dropdownIcon"));
        \u0275\u0275attribute("aria-hidden", true)("data-p", ctx_r0.dropdownIconDataP());
      }
    }
    function MultiSelect_Conditional_10_Conditional_0_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 28);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275classMap(ctx_r0.cx("dropdownIcon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("dropdownIcon"));
        \u0275\u0275attribute("aria-hidden", true)("data-p", ctx_r0.dropdownIconDataP());
      }
    }
    function MultiSelect_Conditional_10_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_10_Conditional_0_Conditional_0_Template, 1, 5, "span", 19)(1, MultiSelect_Conditional_10_Conditional_0_Conditional_1_Template, 1, 5, ":svg:svg", 27);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275conditional(ctx_r0.dropdownIcon() ? 0 : 1);
      }
    }
    function MultiSelect_Conditional_10_Conditional_1_1_ng_template_0_Template(rf, ctx) {
    }
    function MultiSelect_Conditional_10_Conditional_1_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_Conditional_10_Conditional_1_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function MultiSelect_Conditional_10_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 17);
        \u0275\u0275template(1, MultiSelect_Conditional_10_Conditional_1_1_Template, 1, 0, null, 23);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("dropdownIcon"));
        \u0275\u0275property("pBind", ctx_r0.ptm("dropdownIcon"));
        \u0275\u0275attribute("aria-hidden", true);
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.dropdownIconTemplate())("ngTemplateOutletContext", ctx_r0.dropdownIconContext());
      }
    }
    function MultiSelect_Conditional_10_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_Conditional_10_Conditional_0_Template, 2, 1)(1, MultiSelect_Conditional_10_Conditional_1_Template, 2, 6, "span", 19);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(!ctx_r0.dropdownIconTemplate() ? 0 : 1);
      }
    }
    function MultiSelect_ng_template_13_ng_container_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_Conditional_4_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 23);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.filterTemplate())("ngTemplateOutletContext", ctx_r0.filterContext());
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 35);
      }
      if (rf & 2) {
        const klass_r9 = \u0275\u0275nextContext().class;
        const ctx_r0 = \u0275\u0275nextContext(5);
        \u0275\u0275classMap(klass_r9);
        \u0275\u0275property("pBind", ctx_r0.getHeaderCheckboxPTOptions("pcHeaderCheckbox.icon"));
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_1_ng_template_0_Template(rf, ctx) {
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_Conditional_0_Template, 1, 3, ":svg:svg", 34);
        \u0275\u0275template(1, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_1_Template, 1, 0, null, 23);
      }
      if (rf & 2) {
        const klass_r9 = ctx.class;
        const ctx_r0 = \u0275\u0275nextContext(5);
        \u0275\u0275conditional(ctx_r0.showDefaultHeaderCheckIcon() ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.headerCheckboxIconTemplate())("ngTemplateOutletContext", ctx_r0.getHeaderCheckboxIconContext(klass_r9));
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        const _r8 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "p-checkbox", 33, 8);
        \u0275\u0275controlCreate();
        \u0275\u0275listener("onChange", function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_Template_p_checkbox_onChange_0_listener($event) {
          \u0275\u0275restoreView(_r8);
          const ctx_r0 = \u0275\u0275nextContext(4);
          return \u0275\u0275resetView(ctx_r0.onToggleAll($event));
        });
        \u0275\u0275template(2, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_ng_template_2_Template, 2, 3, "ng-template", null, 9, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275property("pt", ctx_r0.getHeaderCheckboxPTOptions("pcHeaderCheckbox"))("ngModel", ctx_r0.allSelected())("ariaLabel", ctx_r0.toggleAllAriaLabel())("binary", true)("variant", ctx_r0.$variant())("disabled", ctx_r0.$disabled())("unstyled", ctx_r0.unstyled());
        \u0275\u0275control();
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275element(0, "svg", 38);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(5);
        \u0275\u0275property("pBind", ctx_r0.ptm("filterIcon"));
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_5_1_ng_template_0_Template(rf, ctx) {
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_5_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_5_1_ng_template_0_Template, 0, 0, "ng-template");
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span", 39);
        \u0275\u0275template(1, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_5_1_Template, 1, 0, null, 26);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(5);
        \u0275\u0275property("pBind", ctx_r0.ptm("filterIcon"));
        \u0275\u0275advance();
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.filterIconTemplate());
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r10 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "p-iconfield", 36)(1, "input", 37, 10);
        \u0275\u0275listener("input", function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Template_input_input_1_listener($event) {
          \u0275\u0275restoreView(_r10);
          const ctx_r0 = \u0275\u0275nextContext(4);
          return \u0275\u0275resetView(ctx_r0.onFilterInputChange($event));
        })("keydown", function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Template_input_keydown_1_listener($event) {
          \u0275\u0275restoreView(_r10);
          const ctx_r0 = \u0275\u0275nextContext(4);
          return \u0275\u0275resetView(ctx_r0.onFilterKeyDown($event));
        })("click", function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Template_input_click_1_listener($event) {
          \u0275\u0275restoreView(_r10);
          const ctx_r0 = \u0275\u0275nextContext(4);
          return \u0275\u0275resetView(ctx_r0.onInputClick($event));
        })("blur", function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Template_input_blur_1_listener($event) {
          \u0275\u0275restoreView(_r10);
          const ctx_r0 = \u0275\u0275nextContext(4);
          return \u0275\u0275resetView(ctx_r0.onFilterBlur($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "p-inputicon", 36);
        \u0275\u0275conditionalCreate(4, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_4_Template, 1, 1, ":svg:svg", 38)(5, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Conditional_5_Template, 2, 2, "span", 39);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275classMap(ctx_r0.cx("pcFilterContainer"));
        \u0275\u0275property("pt", ctx_r0.ptm("pcFilterContainer"))("unstyled", ctx_r0.unstyled());
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx_r0.cx("pcFilter"));
        \u0275\u0275property("pt", ctx_r0.ptm("pcFilter"))("variant", ctx_r0.$variant())("value", ctx_r0.filterInputValue())("unstyled", ctx_r0.unstyled());
        \u0275\u0275attribute("autocomplete", ctx_r0.autocomplete())("aria-owns", ctx_r0.listId())("aria-activedescendant", ctx_r0.$focusedOptionId())("disabled", ctx_r0.disabledAttr())("placeholder", ctx_r0.filterPlaceHolder())("aria-label", ctx_r0.ariaFilterLabel());
        \u0275\u0275advance(2);
        \u0275\u0275property("pt", ctx_r0.ptm("pcFilterIconContainer"))("unstyled", ctx_r0.unstyled());
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r0.filterIconTemplate() ? 4 : 5);
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Conditional_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_0_Template, 4, 7, "p-checkbox", 31);
        \u0275\u0275conditionalCreate(1, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Conditional_1_Template, 6, 19, "p-iconfield", 32);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275conditional(ctx_r0.showToggleAllCheckbox() ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.filter() ? 1 : -1);
      }
    }
    function MultiSelect_ng_template_13_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 17);
        \u0275\u0275projection(1);
        \u0275\u0275conditionalCreate(2, MultiSelect_ng_template_13_Conditional_4_Conditional_2_Template, 1, 2, "ng-container")(3, MultiSelect_ng_template_13_Conditional_4_Conditional_3_Template, 2, 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("header"));
        \u0275\u0275property("pBind", ctx_r0.ptm("header"));
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx_r0.filterTemplate() ? 2 : 3);
      }
    }
    function MultiSelect_ng_template_13_Conditional_6_ng_template_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_Conditional_6_ng_template_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_Conditional_6_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 23);
      }
      if (rf & 2) {
        const items_r12 = ctx.$implicit;
        const scrollerOptions_r13 = ctx.options;
        \u0275\u0275nextContext(2);
        const buildInItems_r14 = \u0275\u0275reference(9);
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", buildInItems_r14)("ngTemplateOutletContext", ctx_r0.getScrollerItemsContext(items_r12, scrollerOptions_r13));
      }
    }
    function MultiSelect_ng_template_13_Conditional_6_Conditional_4_ng_template_0_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_Conditional_6_Conditional_4_ng_template_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_Conditional_6_Conditional_4_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 23);
      }
      if (rf & 2) {
        const scrollerOptions_r15 = ctx.options;
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.loaderTemplate())("ngTemplateOutletContext", ctx_r0.getLoaderContext(scrollerOptions_r15));
      }
    }
    function MultiSelect_ng_template_13_Conditional_6_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_Conditional_6_Conditional_4_ng_template_0_Template, 1, 2, "ng-template", null, 12, \u0275\u0275templateRefExtractor);
      }
    }
    function MultiSelect_ng_template_13_Conditional_6_Template(rf, ctx) {
      if (rf & 1) {
        const _r11 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "p-scroller", 40, 11);
        \u0275\u0275listener("onLazyLoad", function MultiSelect_ng_template_13_Conditional_6_Template_p_scroller_onLazyLoad_0_listener($event) {
          \u0275\u0275restoreView(_r11);
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onLazyLoad.emit($event));
        });
        \u0275\u0275template(2, MultiSelect_ng_template_13_Conditional_6_ng_template_2_Template, 1, 2, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
        \u0275\u0275conditionalCreate(4, MultiSelect_ng_template_13_Conditional_6_Conditional_4_Template, 2, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(\u0275\u0275pureFunction1(9, _c27, ctx_r0.scrollHeight()));
        \u0275\u0275property("items", ctx_r0.visibleOptions())("itemSize", ctx_r0.virtualScrollItemSize())("autoSize", true)("tabindex", -1)("lazy", ctx_r0.lazy())("options", ctx_r0.virtualScrollOptions());
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx_r0.loaderTemplate() ? 4 : -1);
      }
    }
    function MultiSelect_ng_template_13_Conditional_7_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_Conditional_7_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_Conditional_7_ng_container_0_Template, 1, 0, "ng-container", 23);
      }
      if (rf & 2) {
        \u0275\u0275nextContext();
        const buildInItems_r14 = \u0275\u0275reference(9);
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("ngTemplateOutlet", buildInItems_r14)("ngTemplateOutletContext", ctx_r0.defaultItemsContext());
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_0_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "span");
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const option_r16 = \u0275\u0275nextContext(2).$implicit;
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r0.getOptionGroupLabel(option_r16.optionGroup));
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_0_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0, 45);
      }
      if (rf & 2) {
        const option_r16 = \u0275\u0275nextContext(2).$implicit;
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.groupTemplate())("ngTemplateOutletContext", ctx_r0.getGroupContext(option_r16));
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "li", 44);
        \u0275\u0275conditionalCreate(1, MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_0_Conditional_1_Template, 2, 1, "span");
        \u0275\u0275conditionalCreate(2, MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_0_Conditional_2_Template, 1, 2, "ng-container", 45);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r16 = \u0275\u0275nextContext();
        const option_r16 = ctx_r16.$implicit;
        const \u0275$index_159_r18 = ctx_r16.$index;
        const scrollerOptions_r19 = \u0275\u0275nextContext().options;
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("optionGroup"));
        \u0275\u0275styleProp("height", scrollerOptions_r19.itemSize, "px");
        \u0275\u0275property("pBind", ctx_r0.ptm("optionGroup"));
        \u0275\u0275attribute("id", ctx_r0.$id() + "_" + ctx_r0.getOptionIndex(\u0275$index_159_r18, scrollerOptions_r19));
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r0.groupTemplate() && option_r16.optionGroup ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(option_r16.optionGroup && ctx_r0.groupTemplate() ? 2 : -1);
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        const _r20 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "li", 46);
        \u0275\u0275listener("onClick", function MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_1_Template_li_onClick_0_listener($event) {
          \u0275\u0275restoreView(_r20);
          const \u0275$index_159_r18 = \u0275\u0275nextContext().$index;
          const scrollerOptions_r19 = \u0275\u0275nextContext().options;
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOptionSelect($event, false, ctx_r0.getOptionIndex(\u0275$index_159_r18, scrollerOptions_r19)));
        })("onMouseEnter", function MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_1_Template_li_onMouseEnter_0_listener($event) {
          \u0275\u0275restoreView(_r20);
          const \u0275$index_159_r18 = \u0275\u0275nextContext().$index;
          const scrollerOptions_r19 = \u0275\u0275nextContext().options;
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0.onOptionMouseEnter($event, ctx_r0.getOptionIndex(\u0275$index_159_r18, scrollerOptions_r19)));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r16 = \u0275\u0275nextContext();
        const option_r16 = ctx_r16.$implicit;
        const \u0275$index_159_r18 = ctx_r16.$index;
        const scrollerOptions_r19 = \u0275\u0275nextContext().options;
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275property("pBind", ctx_r0.getPTOptions(option_r16, scrollerOptions_r19, \u0275$index_159_r18, "option"))("id", ctx_r0.$id() + "_" + ctx_r0.getOptionIndex(\u0275$index_159_r18, scrollerOptions_r19))("option", option_r16)("selected", ctx_r0.isSelected(option_r16))("label", ctx_r0.getOptionLabel(option_r16))("disabled", ctx_r0.isOptionDisabled(option_r16))("template", ctx_r0.itemTemplate())("itemCheckboxIconTemplate", ctx_r0.itemCheckboxIconTemplate())("itemSize", scrollerOptions_r19.itemSize)("focused", ctx_r0.focusedOptionIndex() === ctx_r0.getOptionIndex(\u0275$index_159_r18, scrollerOptions_r19))("ariaPosInset", ctx_r0.getAriaPosInset(ctx_r0.getOptionIndex(\u0275$index_159_r18, scrollerOptions_r19)))("ariaSetSize", ctx_r0.$ariaSetSize())("variant", ctx_r0.$variant())("highlightOnSelect", ctx_r0.highlightOnSelect())("pt", ctx_r0.pt)("unstyled", ctx_r0.unstyled());
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_For_3_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_0_Template, 3, 8, "li", 42)(1, MultiSelect_ng_template_13_ng_template_8_For_3_Conditional_1_Template, 1, 16, "li", 43);
      }
      if (rf & 2) {
        const option_r16 = ctx.$implicit;
        const ctx_r0 = \u0275\u0275nextContext(3);
        \u0275\u0275conditional(ctx_r0.isOptionGroup(option_r16) ? 0 : 1);
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_4_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275textInterpolate1(" ", ctx_r0.emptyFilterMessageLabel(), " ");
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_4_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_4_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_ng_template_8_Conditional_4_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 26);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.emptyFilterTemplate() || ctx_r0.emptyTemplate());
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "li", 44);
        \u0275\u0275conditionalCreate(1, MultiSelect_ng_template_13_ng_template_8_Conditional_4_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_template_13_ng_template_8_Conditional_4_Conditional_2_Template, 1, 1, "ng-container");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const scrollerOptions_r19 = \u0275\u0275nextContext().options;
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("emptyMessage"));
        \u0275\u0275styleProp("height", scrollerOptions_r19.itemSize, "px");
        \u0275\u0275property("pBind", ctx_r0.ptm("emptyMessage"));
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r0.emptyFilterTemplate() && !ctx_r0.emptyTemplate() ? 1 : 2);
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_5_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275text(0);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275textInterpolate1(" ", ctx_r0.emptyMessageLabel(), " ");
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_5_Conditional_2_ng_container_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_5_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MultiSelect_ng_template_13_ng_template_8_Conditional_5_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 26);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(4);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.emptyTemplate());
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "li", 44);
        \u0275\u0275conditionalCreate(1, MultiSelect_ng_template_13_ng_template_8_Conditional_5_Conditional_1_Template, 1, 1)(2, MultiSelect_ng_template_13_ng_template_8_Conditional_5_Conditional_2_Template, 1, 1, "ng-container");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const scrollerOptions_r19 = \u0275\u0275nextContext().options;
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275classMap(ctx_r0.cx("emptyMessage"));
        \u0275\u0275styleProp("height", scrollerOptions_r19.itemSize, "px");
        \u0275\u0275property("pBind", ctx_r0.ptm("emptyMessage"));
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r0.emptyTemplate() ? 1 : 2);
      }
    }
    function MultiSelect_ng_template_13_ng_template_8_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "ul", 41, 13);
        \u0275\u0275repeaterCreate(2, MultiSelect_ng_template_13_ng_template_8_For_3_Template, 2, 1, null, null, _forTrack02, true);
        \u0275\u0275conditionalCreate(4, MultiSelect_ng_template_13_ng_template_8_Conditional_4_Template, 3, 6, "li", 42);
        \u0275\u0275conditionalCreate(5, MultiSelect_ng_template_13_ng_template_8_Conditional_5_Template, 3, 6, "li", 42);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const items_r21 = ctx.$implicit;
        const scrollerOptions_r19 = ctx.options;
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275styleMap(scrollerOptions_r19.contentStyle);
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("list"), scrollerOptions_r19.contentStyleClass));
        \u0275\u0275property("pBind", ctx_r0.ptm("list"));
        \u0275\u0275attribute("aria-label", ctx_r0.listLabel());
        \u0275\u0275advance(2);
        \u0275\u0275repeater(items_r21);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx_r0.showEmptyFilterMessage() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.showEmptyMessage() ? 5 : -1);
      }
    }
    function MultiSelect_ng_template_13_Conditional_10_ng_container_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementContainer(0);
      }
    }
    function MultiSelect_ng_template_13_Conditional_10_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div");
        \u0275\u0275projection(1, 1);
        \u0275\u0275template(2, MultiSelect_ng_template_13_Conditional_10_ng_container_2_Template, 1, 0, "ng-container", 26);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.footerTemplate());
      }
    }
    function MultiSelect_ng_template_13_Template(rf, ctx) {
      if (rf & 1) {
        const _r7 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 17)(1, "span", 29, 5);
        \u0275\u0275listener("focus", function MultiSelect_ng_template_13_Template_span_focus_1_listener($event) {
          \u0275\u0275restoreView(_r7);
          const ctx_r0 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r0.onFirstHiddenFocus($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, MultiSelect_ng_template_13_ng_container_3_Template, 1, 0, "ng-container", 26);
        \u0275\u0275conditionalCreate(4, MultiSelect_ng_template_13_Conditional_4_Template, 4, 4, "div", 19);
        \u0275\u0275elementStart(5, "div", 17);
        \u0275\u0275conditionalCreate(6, MultiSelect_ng_template_13_Conditional_6_Template, 5, 11, "p-scroller", 30)(7, MultiSelect_ng_template_13_Conditional_7_Template, 1, 2, "ng-container");
        \u0275\u0275template(8, MultiSelect_ng_template_13_ng_template_8_Template, 6, 8, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(10, MultiSelect_ng_template_13_Conditional_10_Template, 3, 1, "div");
        \u0275\u0275elementStart(11, "span", 29, 7);
        \u0275\u0275listener("focus", function MultiSelect_ng_template_13_Template_span_focus_11_listener($event) {
          \u0275\u0275restoreView(_r7);
          const ctx_r0 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r0.onLastHiddenFocus($event));
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275styleMap(ctx_r0.panelStyle());
        \u0275\u0275classMap(ctx_r0.cn(ctx_r0.cx("overlay"), ctx_r0.panelStyleClass()));
        \u0275\u0275property("pBind", ctx_r0.ptm("overlay"));
        \u0275\u0275attribute("data-p", ctx_r0.overlayDataP())("id", ctx_r0.listId());
        \u0275\u0275advance();
        \u0275\u0275property("pBind", ctx_r0.ptm("firstHiddenFocusableEl"));
        \u0275\u0275attribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", ctx_r0.headerTemplate());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.showHeader() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275classMap(ctx_r0.cx("listContainer"));
        \u0275\u0275styleProp("max-height", ctx_r0.listContainerMaxHeight());
        \u0275\u0275property("pBind", ctx_r0.ptm("listContainer"));
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.virtualScroll() ? 6 : 7);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx_r0.hasFooterContent() ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("pBind", ctx_r0.ptm("lastHiddenFocusableEl"));
        \u0275\u0275attribute("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MultiSelect,
      selectors: [["p-multiselect"], ["p-multi-select"]],
      contentQueries: function MultiSelect_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx.footerFacet, Footer, 4)(dirIndex, ctx.headerFacet, Header, 4)(dirIndex, ctx.itemTemplate, _c03, 4)(dirIndex, ctx.groupTemplate, _c12, 4)(dirIndex, ctx.loaderTemplate, _c22, 4)(dirIndex, ctx.headerTemplate, _c32, 4)(dirIndex, ctx.filterTemplate, _c4, 4)(dirIndex, ctx.footerTemplate, _c5, 4)(dirIndex, ctx.emptyFilterTemplate, _c6, 4)(dirIndex, ctx.emptyTemplate, _c7, 4)(dirIndex, ctx.selectedItemsTemplate, _c8, 4)(dirIndex, ctx.loadingIconTemplate, _c9, 4)(dirIndex, ctx.filterIconTemplate, _c10, 4)(dirIndex, ctx.removeTokenIconTemplate, _c11, 4)(dirIndex, ctx.chipIconTemplate, _c122, 4)(dirIndex, ctx.clearIconTemplate, _c13, 4)(dirIndex, ctx.dropdownIconTemplate, _c14, 4)(dirIndex, ctx.itemCheckboxIconTemplate, _c15, 4)(dirIndex, ctx.headerCheckboxIconTemplate, _c16, 4);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(19);
        }
      },
      viewQuery: function MultiSelect_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx.overlayViewChild, _c17, 5)(ctx.filterInputChild, _c18, 5)(ctx.focusInputViewChild, _c19, 5)(ctx.itemsViewChild, _c20, 5)(ctx.scroller, _c21, 5)(ctx.lastHiddenFocusableElementOnOverlay, _c222, 5)(ctx.firstHiddenFocusableElementOnOverlay, _c23, 5)(ctx.headerCheckboxViewChild, _c24, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(8);
        }
      },
      hostVars: 6,
      hostBindings: function MultiSelect_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function MultiSelect_click_HostBindingHandler($event) {
            return ctx.onContainerClick($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("id", ctx.$id())("data-p", ctx.containerDataP);
          \u0275\u0275styleMap(ctx.sx("root"));
          \u0275\u0275classMap(ctx.cx("root"));
        }
      },
      inputs: {
        id: [1, "id"],
        ariaLabel: [1, "ariaLabel"],
        panelStyle: [1, "panelStyle"],
        panelStyleClass: [1, "panelStyleClass"],
        inputId: [1, "inputId"],
        readonly: [1, "readonly"],
        group: [1, "group"],
        filter: [1, "filter"],
        filterPlaceHolder: [1, "filterPlaceHolder"],
        filterLocale: [1, "filterLocale"],
        overlayVisible: [1, "overlayVisible"],
        tabindex: [1, "tabindex"],
        dataKey: [1, "dataKey"],
        ariaLabelledBy: [1, "ariaLabelledBy"],
        displaySelectedLabel: [1, "displaySelectedLabel"],
        maxSelectedLabels: [1, "maxSelectedLabels"],
        selectionLimit: [1, "selectionLimit"],
        selectedItemsLabel: [1, "selectedItemsLabel"],
        showToggleAll: [1, "showToggleAll"],
        emptyFilterMessage: [1, "emptyFilterMessage"],
        emptyMessage: [1, "emptyMessage"],
        resetFilterOnHide: [1, "resetFilterOnHide"],
        dropdownIcon: [1, "dropdownIcon"],
        chipIcon: [1, "chipIcon"],
        optionLabel: [1, "optionLabel"],
        optionValue: [1, "optionValue"],
        optionDisabled: [1, "optionDisabled"],
        optionGroupLabel: [1, "optionGroupLabel"],
        optionGroupChildren: [1, "optionGroupChildren"],
        showHeader: [1, "showHeader"],
        filterBy: [1, "filterBy"],
        scrollHeight: [1, "scrollHeight"],
        lazy: [1, "lazy"],
        virtualScroll: [1, "virtualScroll"],
        loading: [1, "loading"],
        virtualScrollItemSize: [1, "virtualScrollItemSize"],
        loadingIcon: [1, "loadingIcon"],
        virtualScrollOptions: [1, "virtualScrollOptions"],
        overlayOptions: [1, "overlayOptions"],
        ariaFilterLabel: [1, "ariaFilterLabel"],
        filterMatchMode: [1, "filterMatchMode"],
        tooltip: [1, "tooltip"],
        tooltipPosition: [1, "tooltipPosition"],
        tooltipPositionStyle: [1, "tooltipPositionStyle"],
        tooltipStyleClass: [1, "tooltipStyleClass"],
        autofocusFilter: [1, "autofocusFilter"],
        display: [1, "display"],
        autocomplete: [1, "autocomplete"],
        showClear: [1, "showClear"],
        autofocus: [1, "autofocus"],
        placeholder: [1, "placeholder"],
        options: [1, "options"],
        filterValue: [1, "filterValue"],
        selectAll: [1, "selectAll"],
        focusOnHover: [1, "focusOnHover"],
        filterFields: [1, "filterFields"],
        selectOnFocus: [1, "selectOnFocus"],
        autoOptionFocus: [1, "autoOptionFocus"],
        highlightOnSelect: [1, "highlightOnSelect"],
        size: [1, "size"],
        variant: [1, "variant"],
        fluid: [1, "fluid"],
        appendTo: [1, "appendTo"],
        motionOptions: [1, "motionOptions"]
      },
      outputs: {
        overlayVisible: "overlayVisibleChange",
        onChange: "onChange",
        onFilter: "onFilter",
        onFocus: "onFocus",
        onBlur: "onBlur",
        onClick: "onClick",
        onClear: "onClear",
        onPanelShow: "onPanelShow",
        onPanelHide: "onPanelHide",
        onLazyLoad: "onLazyLoad",
        onRemove: "onRemove",
        onSelectAllChange: "onSelectAllChange"
      },
      features: [\u0275\u0275ProvidersFeature([MULTISELECT_VALUE_ACCESSOR, MultiSelectStyle, { provide: MULTISELECT_INSTANCE, useExisting: _MultiSelect }, { provide: PARENT_INSTANCE, useExisting: _MultiSelect }]), \u0275\u0275HostDirectivesFeature([Bind]), \u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c26,
      decls: 15,
      vars: 49,
      consts: [["focusInput", ""], ["overlay", ""], ["content", ""], ["token", ""], ["removeicon", ""], ["firstHiddenFocusableEl", ""], ["buildInItems", ""], ["lastHiddenFocusableEl", ""], ["headerCheckbox", ""], ["icon", ""], ["filterInput", ""], ["scroller", ""], ["loader", ""], ["items", ""], [1, "p-hidden-accessible", 3, "pBind"], ["role", "combobox", 3, "focus", "blur", "keydown", "pTooltip", "pTooltipUnstyled", "tooltipPosition", "positionStyle", "tooltipStyleClass", "pAutoFocus", "pBind"], [3, "mouseleave", "pBind", "pTooltip", "pTooltipUnstyled", "tooltipDisabled", "tooltipPosition", "positionStyle", "tooltipStyleClass"], [3, "pBind"], [3, "visibleChange", "onBeforeEnter", "onAfterLeave", "onHide", "hostAttrSelector", "visible", "options", "target", "appendTo", "unstyled", "pt", "motionOptions"], [3, "pBind", "class"], [3, "onRemove", "pt", "unstyled", "label", "removable", "removeIcon"], [3, "class", "pBind"], [3, "click", "pBind"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["data-p-icon", "times", 3, "pBind", "class"], ["data-p-icon", "times", 3, "click", "pBind"], [4, "ngTemplateOutlet"], ["data-p-icon", "chevron-down", 3, "pBind", "class"], ["data-p-icon", "chevron-down", 3, "pBind"], ["role", "presentation", 1, "p-hidden-accessible", "p-hidden-focusable", 3, "focus", "pBind"], [3, "items", "style", "itemSize", "autoSize", "tabindex", "lazy", "options"], [3, "pt", "ngModel", "ariaLabel", "binary", "variant", "disabled", "unstyled"], [3, "pt", "class", "unstyled"], [3, "onChange", "pt", "ngModel", "ariaLabel", "binary", "variant", "disabled", "unstyled"], ["data-p-icon", "check", 3, "class", "pBind"], ["data-p-icon", "check", 3, "pBind"], [3, "pt", "unstyled"], ["pInputText", "", "type", "text", "role", "searchbox", 3, "input", "keydown", "click", "blur", "pt", "variant", "value", "unstyled"], ["data-p-icon", "search", 3, "pBind"], [1, "p-multiselect-filter-icon", 3, "pBind"], [3, "onLazyLoad", "items", "itemSize", "autoSize", "tabindex", "lazy", "options"], ["role", "listbox", "aria-multiselectable", "true", 3, "pBind"], ["role", "option", 3, "pBind", "class", "height"], ["pMultiSelectItem", "", "pRipple", "", 3, "pBind", "id", "option", "selected", "label", "disabled", "template", "itemCheckboxIconTemplate", "itemSize", "focused", "ariaPosInset", "ariaSetSize", "variant", "highlightOnSelect", "pt", "unstyled"], ["role", "option", 3, "pBind"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["pMultiSelectItem", "", "pRipple", "", 3, "onClick", "onMouseEnter", "pBind", "id", "option", "selected", "label", "disabled", "template", "itemCheckboxIconTemplate", "itemSize", "focused", "ariaPosInset", "ariaSetSize", "variant", "highlightOnSelect", "pt", "unstyled"]],
      template: function MultiSelect_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c25);
          \u0275\u0275elementStart(0, "div", 14)(1, "input", 15, 0);
          \u0275\u0275listener("focus", function MultiSelect_Template_input_focus_1_listener($event) {
            return ctx.onInputFocus($event);
          })("blur", function MultiSelect_Template_input_blur_1_listener($event) {
            return ctx.onInputBlur($event);
          })("keydown", function MultiSelect_Template_input_keydown_1_listener($event) {
            return ctx.onKeyDown($event);
          });
          \u0275\u0275elementEnd()();
          \u0275\u0275elementStart(3, "div", 16);
          \u0275\u0275listener("mouseleave", function MultiSelect_Template_div_mouseleave_3_listener() {
            return ctx.labelContainerMouseLeave();
          });
          \u0275\u0275elementStart(4, "div", 17);
          \u0275\u0275conditionalCreate(5, MultiSelect_Conditional_5_Template, 2, 2)(6, MultiSelect_Conditional_6_Template, 2, 3);
          \u0275\u0275elementEnd()();
          \u0275\u0275conditionalCreate(7, MultiSelect_Conditional_7_Template, 2, 1);
          \u0275\u0275elementStart(8, "div", 17);
          \u0275\u0275conditionalCreate(9, MultiSelect_Conditional_9_Template, 2, 1)(10, MultiSelect_Conditional_10_Template, 2, 1);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(11, "p-overlay", 18, 1);
          \u0275\u0275listener("visibleChange", function MultiSelect_Template_p_overlay_visibleChange_11_listener($event) {
            return ctx.overlayVisible.set($event);
          })("onBeforeEnter", function MultiSelect_Template_p_overlay_onBeforeEnter_11_listener($event) {
            return ctx.onOverlayBeforeEnter($event);
          })("onAfterLeave", function MultiSelect_Template_p_overlay_onAfterLeave_11_listener($event) {
            return ctx.onOverlayAfterLeave($event);
          })("onHide", function MultiSelect_Template_p_overlay_onHide_11_listener($event) {
            return ctx.onOverlayHide($event);
          });
          \u0275\u0275template(13, MultiSelect_ng_template_13_Template, 13, 24, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275property("pBind", ctx.ptm("hiddenInputContainer"));
          \u0275\u0275attribute("data-p-hidden-accessible", true);
          \u0275\u0275advance();
          \u0275\u0275property("pTooltip", ctx.tooltip())("pTooltipUnstyled", ctx.unstyled())("tooltipPosition", ctx.tooltipPosition())("positionStyle", ctx.tooltipPositionStyle())("tooltipStyleClass", ctx.tooltipStyleClass())("pAutoFocus", ctx.autofocus())("pBind", ctx.ptm("hiddenInput"));
          \u0275\u0275attribute("aria-disabled", ctx.$disabled())("id", ctx.inputId())("aria-label", ctx.ariaLabel())("aria-labelledby", ctx.ariaLabelledBy())("aria-haspopup", "listbox")("aria-expanded", ctx.ariaExpanded())("aria-controls", ctx.ariaControls())("tabindex", ctx.inputTabindex())("aria-activedescendant", ctx.ariaActivedescendant)("value", ctx.modelValue())("name", ctx.name())("required", ctx.requiredAttr())("disabled", ctx.disabledAttr());
          \u0275\u0275advance(2);
          \u0275\u0275classMap(ctx.cx("labelContainer"));
          \u0275\u0275property("pBind", ctx.ptm("labelContainer"))("pTooltip", ctx.tooltip())("pTooltipUnstyled", ctx.unstyled())("tooltipDisabled", ctx._disableTooltip)("tooltipPosition", ctx.tooltipPosition())("positionStyle", ctx.tooltipPositionStyle())("tooltipStyleClass", ctx.tooltipStyleClass());
          \u0275\u0275advance();
          \u0275\u0275classMap(ctx.cx("label"));
          \u0275\u0275property("pBind", ctx.ptm("label"));
          \u0275\u0275attribute("data-p", ctx.labelDataP());
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx.selectedItemsTemplate() ? 5 : 6);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.isVisibleClearIcon() ? 7 : -1);
          \u0275\u0275advance();
          \u0275\u0275classMap(ctx.cx("dropdown"));
          \u0275\u0275property("pBind", ctx.ptm("dropdown"));
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.loading() ? 9 : 10);
          \u0275\u0275advance(2);
          \u0275\u0275property("hostAttrSelector", ctx.$attrSelector)("visible", ctx.overlayVisible())("options", ctx.overlayOptions())("target", "@parent")("appendTo", ctx.$appendTo())("unstyled", ctx.unstyled())("pt", ctx.ptm("pcOverlay"))("motionOptions", ctx.motionOptions());
        }
      },
      dependencies: [NgTemplateOutlet, MultiSelectItem, Overlay, SharedModule, Tooltip, Scroller, AutoFocus, Check, Search, Times, ChevronDown, IconField, InputIcon, InputText, Chip, Checkbox, FormsModule, NgControlStatus, NgModel, BindModule, Bind],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelect, [{
    type: Component,
    args: [{
      selector: "p-multiselect, p-multi-select",
      standalone: true,
      imports: [NgTemplateOutlet, MultiSelectItem, Overlay, SharedModule, Tooltip, Scroller, AutoFocus, Check, Search, Times, ChevronDown, IconField, InputIcon, InputText, Chip, Checkbox, FormsModule, BindModule],
      hostDirectives: [Bind],
      template: `
        <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true" [pBind]="ptm('hiddenInputContainer')">
            <input
                #focusInput
                [pTooltip]="tooltip()"
                [pTooltipUnstyled]="unstyled()"
                [tooltipPosition]="tooltipPosition()"
                [positionStyle]="tooltipPositionStyle()"
                [tooltipStyleClass]="tooltipStyleClass()"
                [attr.aria-disabled]="$disabled()"
                [attr.id]="inputId()"
                role="combobox"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-labelledby]="ariaLabelledBy()"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="ariaExpanded()"
                [attr.aria-controls]="ariaControls()"
                [attr.tabindex]="inputTabindex()"
                [attr.aria-activedescendant]="ariaActivedescendant"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [pAutoFocus]="autofocus()"
                [attr.value]="modelValue()"
                [attr.name]="name()"
                [attr.required]="requiredAttr()"
                [attr.disabled]="disabledAttr()"
                [pBind]="ptm('hiddenInput')"
            />
        </div>
        <div
            [pBind]="ptm('labelContainer')"
            [class]="cx('labelContainer')"
            [pTooltip]="tooltip()"
            [pTooltipUnstyled]="unstyled()"
            (mouseleave)="labelContainerMouseLeave()"
            [tooltipDisabled]="_disableTooltip"
            [tooltipPosition]="tooltipPosition()"
            [positionStyle]="tooltipPositionStyle()"
            [tooltipStyleClass]="tooltipStyleClass()"
        >
            <div [pBind]="ptm('label')" [class]="cx('label')" [attr.data-p]="labelDataP()">
                @if (!selectedItemsTemplate()) {
                    @if (isCommaDisplay()) {
                        {{ labelDisplay() }}
                    }
                    @if (isChipDisplay()) {
                        @if (showSelectedItemsLabel()) {
                            {{ getSelectedItemsLabel() }}
                        } @else {
                            @for (item of chipSelectedItems(); track $index) {
                                <div #token [pBind]="ptm('chipItem')" [class]="cx('chipItem')">
                                    <p-chip [pt]="ptm('pcChip')" [unstyled]="unstyled()" [class]="cx('pcChip')" [label]="getLabelByValue(item)" [removable]="isEditable()" (onRemove)="removeOption(item, $event)" [removeIcon]="chipIcon()">
                                        @if (hasChipRemoveIconTemplate()) {
                                            <ng-template #removeicon>
                                                @if (isEditable()) {
                                                    <span [class]="cx('chipIcon')" (click)="removeOption(item, $event)" [attr.aria-hidden]="true" [pBind]="ptm('chipIcon')">
                                                        <ng-container *ngTemplateOutlet="chipIconTemplate() || removeTokenIconTemplate(); context: chipIconContext"></ng-container>
                                                    </span>
                                                }
                                            </ng-template>
                                        }
                                    </p-chip>
                                </div>
                            }
                        }
                        @if (isModelEmpty()) {
                            {{ placeholderLabel() }}
                        }
                    }
                } @else {
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate(); context: selectedItemsContext()"></ng-container>
                    @if (isModelEmpty()) {
                        {{ placeholderLabel() }}
                    }
                }
            </div>
        </div>
        @if (isVisibleClearIcon()) {
            @if (!clearIconTemplate()) {
                <svg data-p-icon="times" [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear($event)" [attr.aria-hidden]="true" />
            } @else {
                <span [pBind]="ptm('clearIcon')" [class]="cx('clearIcon')" (click)="clear($event)" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="clearIconTemplate()"></ng-template>
                </span>
            }
        }
        <div [pBind]="ptm('dropdown')" [class]="cx('dropdown')">
            @if (loading()) {
                @if (loadingIconTemplate()) {
                    <ng-container *ngTemplateOutlet="loadingIconTemplate()"></ng-container>
                } @else {
                    @if (loadingIcon()) {
                        <span [pBind]="ptm('loadingIcon')" [class]="cn(cx('loadingIcon'), 'pi-spin ' + loadingIcon())" [attr.aria-hidden]="true"></span>
                    } @else {
                        <span [pBind]="ptm('loadingIcon')" [class]="cn(cx('loadingIcon'), 'pi pi-spinner pi-spin')" [attr.aria-hidden]="true"></span>
                    }
                }
            } @else {
                @if (!dropdownIconTemplate()) {
                    @if (dropdownIcon()) {
                        <span [pBind]="ptm('dropdownIcon')" [class]="cn(cx('dropdownIcon'), dropdownIcon())" [attr.aria-hidden]="true" [attr.data-p]="dropdownIconDataP()"></span>
                    } @else {
                        <svg data-p-icon="chevron-down" [pBind]="ptm('dropdownIcon')" [class]="cx('dropdownIcon')" [attr.aria-hidden]="true" [attr.data-p]="dropdownIconDataP()" />
                    }
                } @else {
                    <span [pBind]="ptm('dropdownIcon')" [class]="cx('dropdownIcon')" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="dropdownIconTemplate(); context: dropdownIconContext()"></ng-template>
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
            (onHide)="onOverlayHide($event)"
        >
            <ng-template #content>
                <div [pBind]="ptm('overlay')" [attr.data-p]="overlayDataP()" [attr.id]="listId()" [class]="cn(cx('overlay'), panelStyleClass())" [style]="panelStyle()">
                    <span
                        #firstHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onFirstHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('firstHiddenFocusableEl')"
                    >
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                    @if (showHeader()) {
                        <div [pBind]="ptm('header')" [class]="cx('header')">
                            <ng-content select="p-header"></ng-content>
                            @if (filterTemplate()) {
                                <ng-container *ngTemplateOutlet="filterTemplate(); context: filterContext()"></ng-container>
                            } @else {
                                @if (showToggleAllCheckbox()) {
                                    <p-checkbox
                                        [pt]="getHeaderCheckboxPTOptions('pcHeaderCheckbox')"
                                        [ngModel]="allSelected()"
                                        [ariaLabel]="toggleAllAriaLabel()"
                                        [binary]="true"
                                        (onChange)="onToggleAll($event)"
                                        [variant]="$variant()"
                                        [disabled]="$disabled()"
                                        [unstyled]="unstyled()"
                                        #headerCheckbox
                                    >
                                        <ng-template #icon let-klass="class">
                                            @if (showDefaultHeaderCheckIcon()) {
                                                <svg data-p-icon="check" [class]="klass" [pBind]="getHeaderCheckboxPTOptions('pcHeaderCheckbox.icon')" />
                                            }
                                            <ng-template *ngTemplateOutlet="headerCheckboxIconTemplate(); context: getHeaderCheckboxIconContext(klass)"></ng-template>
                                        </ng-template>
                                    </p-checkbox>
                                }

                                @if (filter()) {
                                    <p-iconfield [pt]="ptm('pcFilterContainer')" [class]="cx('pcFilterContainer')" [unstyled]="unstyled()">
                                        <input
                                            #filterInput
                                            pInputText
                                            [pt]="ptm('pcFilter')"
                                            [variant]="$variant()"
                                            type="text"
                                            [attr.autocomplete]="autocomplete()"
                                            role="searchbox"
                                            [attr.aria-owns]="listId()"
                                            [attr.aria-activedescendant]="$focusedOptionId()"
                                            [value]="filterInputValue()"
                                            (input)="onFilterInputChange($event)"
                                            (keydown)="onFilterKeyDown($event)"
                                            (click)="onInputClick($event)"
                                            (blur)="onFilterBlur($event)"
                                            [class]="cx('pcFilter')"
                                            [attr.disabled]="disabledAttr()"
                                            [attr.placeholder]="filterPlaceHolder()"
                                            [attr.aria-label]="ariaFilterLabel()"
                                            [unstyled]="unstyled()"
                                        />
                                        <p-inputicon [pt]="ptm('pcFilterIconContainer')" [unstyled]="unstyled()">
                                            @if (!filterIconTemplate()) {
                                                <svg data-p-icon="search" [pBind]="ptm('filterIcon')" />
                                            } @else {
                                                <span [pBind]="ptm('filterIcon')" class="p-multiselect-filter-icon">
                                                    <ng-template *ngTemplateOutlet="filterIconTemplate()"></ng-template>
                                                </span>
                                            }
                                        </p-inputicon>
                                    </p-iconfield>
                                }
                            }
                        </div>
                    }
                    <div [pBind]="ptm('listContainer')" [class]="cx('listContainer')" [style.max-height]="listContainerMaxHeight()">
                        @if (virtualScroll()) {
                            <p-scroller
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight() }"
                                [itemSize]="virtualScrollItemSize()!"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy()"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions()"
                            >
                                <ng-template #content let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: getScrollerItemsContext(items, scrollerOptions)"></ng-container>
                                </ng-template>
                                @if (loaderTemplate()) {
                                    <ng-template #loader let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate(); context: getLoaderContext(scrollerOptions)"></ng-container>
                                    </ng-template>
                                }
                            </p-scroller>
                        } @else {
                            <ng-container *ngTemplateOutlet="buildInItems; context: defaultItemsContext()"></ng-container>
                        }

                        <ng-template #buildInItems let-items let-scrollerOptions="options">
                            <ul #items [pBind]="ptm('list')" [class]="cn(cx('list'), scrollerOptions.contentStyleClass)" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel()">
                                @for (option of items; track getOptionTrackKey(option, $index); let i = $index) {
                                    @if (isOptionGroup(option)) {
                                        <li [pBind]="ptm('optionGroup')" [attr.id]="$id() + '_' + getOptionIndex(i, scrollerOptions)" [class]="cx('optionGroup')" [style.height.px]="scrollerOptions.itemSize" role="option">
                                            @if (!groupTemplate() && option.optionGroup) {
                                                <span>{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                            }
                                            @if (option.optionGroup && groupTemplate()) {
                                                <ng-container [ngTemplateOutlet]="groupTemplate()" [ngTemplateOutletContext]="getGroupContext(option)"></ng-container>
                                            }
                                        </li>
                                    } @else {
                                        <li
                                            pMultiSelectItem
                                            pRipple
                                            [pBind]="getPTOptions(option, scrollerOptions, i, 'option')"
                                            [id]="$id() + '_' + getOptionIndex(i, scrollerOptions)"
                                            [option]="option"
                                            [selected]="isSelected(option)"
                                            [label]="getOptionLabel(option)"
                                            [disabled]="isOptionDisabled(option)"
                                            [template]="itemTemplate()"
                                            [itemCheckboxIconTemplate]="itemCheckboxIconTemplate()"
                                            [itemSize]="scrollerOptions.itemSize"
                                            [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                            [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                            [ariaSetSize]="$ariaSetSize()"
                                            [variant]="$variant()"
                                            [highlightOnSelect]="highlightOnSelect()"
                                            (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                            (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            [pt]="pt"
                                            [unstyled]="unstyled()"
                                        ></li>
                                    }
                                }

                                @if (showEmptyFilterMessage()) {
                                    <li [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')" [style.height.px]="scrollerOptions.itemSize" role="option">
                                        @if (!emptyFilterTemplate() && !emptyTemplate()) {
                                            {{ emptyFilterMessageLabel() }}
                                        } @else {
                                            <ng-container *ngTemplateOutlet="emptyFilterTemplate() || emptyTemplate()"></ng-container>
                                        }
                                    </li>
                                }
                                @if (showEmptyMessage()) {
                                    <li [pBind]="ptm('emptyMessage')" [class]="cx('emptyMessage')" [style.height.px]="scrollerOptions.itemSize" role="option">
                                        @if (!emptyTemplate()) {
                                            {{ emptyMessageLabel() }}
                                        } @else {
                                            <ng-container *ngTemplateOutlet="emptyTemplate()"></ng-container>
                                        }
                                    </li>
                                }
                            </ul>
                        </ng-template>
                    </div>
                    @if (hasFooterContent()) {
                        <div>
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                        </div>
                    }

                    <span
                        #lastHiddenFocusableEl
                        role="presentation"
                        class="p-hidden-accessible p-hidden-focusable"
                        [attr.tabindex]="0"
                        (focus)="onLastHiddenFocus($event)"
                        [attr.data-p-hidden-accessible]="true"
                        [attr.data-p-hidden-focusable]="true"
                        [pBind]="ptm('lastHiddenFocusableEl')"
                    ></span>
                </div>
            </ng-template>
        </p-overlay>
    `,
      providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectStyle, { provide: MULTISELECT_INSTANCE, useExisting: MultiSelect }, { provide: PARENT_INSTANCE, useExisting: MultiSelect }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[attr.id]": "$id()",
        "[attr.data-p]": "containerDataP",
        "(click)": "onContainerClick($event)",
        "[class]": "cx('root')",
        "[style]": "sx('root')"
      }
    }]
  }], () => [], { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }], ariaLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabel", required: false }] }], panelStyle: [{ type: Input, args: [{ isSignal: true, alias: "panelStyle", required: false }] }], panelStyleClass: [{ type: Input, args: [{ isSignal: true, alias: "panelStyleClass", required: false }] }], inputId: [{ type: Input, args: [{ isSignal: true, alias: "inputId", required: false }] }], readonly: [{ type: Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], group: [{ type: Input, args: [{ isSignal: true, alias: "group", required: false }] }], filter: [{ type: Input, args: [{ isSignal: true, alias: "filter", required: false }] }], filterPlaceHolder: [{ type: Input, args: [{ isSignal: true, alias: "filterPlaceHolder", required: false }] }], filterLocale: [{ type: Input, args: [{ isSignal: true, alias: "filterLocale", required: false }] }], overlayVisible: [{ type: Input, args: [{ isSignal: true, alias: "overlayVisible", required: false }] }, { type: Output, args: ["overlayVisibleChange"] }], tabindex: [{ type: Input, args: [{ isSignal: true, alias: "tabindex", required: false }] }], dataKey: [{ type: Input, args: [{ isSignal: true, alias: "dataKey", required: false }] }], ariaLabelledBy: [{ type: Input, args: [{ isSignal: true, alias: "ariaLabelledBy", required: false }] }], displaySelectedLabel: [{ type: Input, args: [{ isSignal: true, alias: "displaySelectedLabel", required: false }] }], maxSelectedLabels: [{ type: Input, args: [{ isSignal: true, alias: "maxSelectedLabels", required: false }] }], selectionLimit: [{ type: Input, args: [{ isSignal: true, alias: "selectionLimit", required: false }] }], selectedItemsLabel: [{ type: Input, args: [{ isSignal: true, alias: "selectedItemsLabel", required: false }] }], showToggleAll: [{ type: Input, args: [{ isSignal: true, alias: "showToggleAll", required: false }] }], emptyFilterMessage: [{ type: Input, args: [{ isSignal: true, alias: "emptyFilterMessage", required: false }] }], emptyMessage: [{ type: Input, args: [{ isSignal: true, alias: "emptyMessage", required: false }] }], resetFilterOnHide: [{ type: Input, args: [{ isSignal: true, alias: "resetFilterOnHide", required: false }] }], dropdownIcon: [{ type: Input, args: [{ isSignal: true, alias: "dropdownIcon", required: false }] }], chipIcon: [{ type: Input, args: [{ isSignal: true, alias: "chipIcon", required: false }] }], optionLabel: [{ type: Input, args: [{ isSignal: true, alias: "optionLabel", required: false }] }], optionValue: [{ type: Input, args: [{ isSignal: true, alias: "optionValue", required: false }] }], optionDisabled: [{ type: Input, args: [{ isSignal: true, alias: "optionDisabled", required: false }] }], optionGroupLabel: [{ type: Input, args: [{ isSignal: true, alias: "optionGroupLabel", required: false }] }], optionGroupChildren: [{ type: Input, args: [{ isSignal: true, alias: "optionGroupChildren", required: false }] }], showHeader: [{ type: Input, args: [{ isSignal: true, alias: "showHeader", required: false }] }], filterBy: [{ type: Input, args: [{ isSignal: true, alias: "filterBy", required: false }] }], scrollHeight: [{ type: Input, args: [{ isSignal: true, alias: "scrollHeight", required: false }] }], lazy: [{ type: Input, args: [{ isSignal: true, alias: "lazy", required: false }] }], virtualScroll: [{ type: Input, args: [{ isSignal: true, alias: "virtualScroll", required: false }] }], loading: [{ type: Input, args: [{ isSignal: true, alias: "loading", required: false }] }], virtualScrollItemSize: [{ type: Input, args: [{ isSignal: true, alias: "virtualScrollItemSize", required: false }] }], loadingIcon: [{ type: Input, args: [{ isSignal: true, alias: "loadingIcon", required: false }] }], virtualScrollOptions: [{ type: Input, args: [{ isSignal: true, alias: "virtualScrollOptions", required: false }] }], overlayOptions: [{ type: Input, args: [{ isSignal: true, alias: "overlayOptions", required: false }] }], ariaFilterLabel: [{ type: Input, args: [{ isSignal: true, alias: "ariaFilterLabel", required: false }] }], filterMatchMode: [{ type: Input, args: [{ isSignal: true, alias: "filterMatchMode", required: false }] }], tooltip: [{ type: Input, args: [{ isSignal: true, alias: "tooltip", required: false }] }], tooltipPosition: [{ type: Input, args: [{ isSignal: true, alias: "tooltipPosition", required: false }] }], tooltipPositionStyle: [{ type: Input, args: [{ isSignal: true, alias: "tooltipPositionStyle", required: false }] }], tooltipStyleClass: [{ type: Input, args: [{ isSignal: true, alias: "tooltipStyleClass", required: false }] }], autofocusFilter: [{ type: Input, args: [{ isSignal: true, alias: "autofocusFilter", required: false }] }], display: [{ type: Input, args: [{ isSignal: true, alias: "display", required: false }] }], autocomplete: [{ type: Input, args: [{ isSignal: true, alias: "autocomplete", required: false }] }], showClear: [{ type: Input, args: [{ isSignal: true, alias: "showClear", required: false }] }], autofocus: [{ type: Input, args: [{ isSignal: true, alias: "autofocus", required: false }] }], placeholder: [{ type: Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], options: [{ type: Input, args: [{ isSignal: true, alias: "options", required: false }] }], filterValue: [{ type: Input, args: [{ isSignal: true, alias: "filterValue", required: false }] }], selectAll: [{ type: Input, args: [{ isSignal: true, alias: "selectAll", required: false }] }], focusOnHover: [{ type: Input, args: [{ isSignal: true, alias: "focusOnHover", required: false }] }], filterFields: [{ type: Input, args: [{ isSignal: true, alias: "filterFields", required: false }] }], selectOnFocus: [{ type: Input, args: [{ isSignal: true, alias: "selectOnFocus", required: false }] }], autoOptionFocus: [{ type: Input, args: [{ isSignal: true, alias: "autoOptionFocus", required: false }] }], highlightOnSelect: [{ type: Input, args: [{ isSignal: true, alias: "highlightOnSelect", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], fluid: [{ type: Input, args: [{ isSignal: true, alias: "fluid", required: false }] }], appendTo: [{ type: Input, args: [{ isSignal: true, alias: "appendTo", required: false }] }], motionOptions: [{ type: Input, args: [{ isSignal: true, alias: "motionOptions", required: false }] }], onChange: [{ type: Output, args: ["onChange"] }], onFilter: [{ type: Output, args: ["onFilter"] }], onFocus: [{ type: Output, args: ["onFocus"] }], onBlur: [{ type: Output, args: ["onBlur"] }], onClick: [{ type: Output, args: ["onClick"] }], onClear: [{ type: Output, args: ["onClear"] }], onPanelShow: [{ type: Output, args: ["onPanelShow"] }], onPanelHide: [{ type: Output, args: ["onPanelHide"] }], onLazyLoad: [{ type: Output, args: ["onLazyLoad"] }], onRemove: [{ type: Output, args: ["onRemove"] }], onSelectAllChange: [{ type: Output, args: ["onSelectAllChange"] }], overlayViewChild: [{ type: ViewChild, args: ["overlay", { isSignal: true }] }], filterInputChild: [{ type: ViewChild, args: ["filterInput", { isSignal: true }] }], focusInputViewChild: [{ type: ViewChild, args: ["focusInput", { isSignal: true }] }], itemsViewChild: [{ type: ViewChild, args: ["items", { isSignal: true }] }], scroller: [{ type: ViewChild, args: ["scroller", { isSignal: true }] }], lastHiddenFocusableElementOnOverlay: [{ type: ViewChild, args: ["lastHiddenFocusableEl", { isSignal: true }] }], firstHiddenFocusableElementOnOverlay: [{ type: ViewChild, args: ["firstHiddenFocusableEl", { isSignal: true }] }], headerCheckboxViewChild: [{ type: ViewChild, args: ["headerCheckbox", { isSignal: true }] }], footerFacet: [{ type: ContentChild, args: [forwardRef(() => Footer), __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], headerFacet: [{ type: ContentChild, args: [forwardRef(() => Header), __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], itemTemplate: [{ type: ContentChild, args: ["item", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], groupTemplate: [{ type: ContentChild, args: ["group", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], loaderTemplate: [{ type: ContentChild, args: ["loader", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], headerTemplate: [{ type: ContentChild, args: ["header", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], filterTemplate: [{ type: ContentChild, args: ["filter", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], footerTemplate: [{ type: ContentChild, args: ["footer", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], emptyFilterTemplate: [{ type: ContentChild, args: ["emptyfilter", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], emptyTemplate: [{ type: ContentChild, args: ["empty", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], selectedItemsTemplate: [{ type: ContentChild, args: ["selecteditems", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], loadingIconTemplate: [{ type: ContentChild, args: ["loadingicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], filterIconTemplate: [{ type: ContentChild, args: ["filtericon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], removeTokenIconTemplate: [{ type: ContentChild, args: ["removetokenicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], chipIconTemplate: [{ type: ContentChild, args: ["chipicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], clearIconTemplate: [{ type: ContentChild, args: ["clearicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], dropdownIconTemplate: [{ type: ContentChild, args: ["dropdownicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], itemCheckboxIconTemplate: [{ type: ContentChild, args: ["itemcheckboxicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }], headerCheckboxIconTemplate: [{ type: ContentChild, args: ["headercheckboxicon", __spreadProps(__spreadValues({}, { descendants: false }), { isSignal: true })] }] });
})();
var MultiSelectModule = class _MultiSelectModule {
  static \u0275fac = function MultiSelectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MultiSelectModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MultiSelectModule,
    imports: [MultiSelect, SharedModule],
    exports: [MultiSelect, SharedModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MultiSelect, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectModule, [{
    type: NgModule,
    args: [{
      imports: [MultiSelect, SharedModule],
      exports: [MultiSelect, SharedModule]
    }]
  }], null, null);
})();

// src/app/core/realtime/sse-parser.ts
var SseParser = class {
  buffer = "";
  push(chunk) {
    this.buffer += chunk.replace(/\r\n?/g, "\n");
    const messages = [];
    let end = this.buffer.indexOf("\n\n");
    while (end >= 0) {
      const message = this.parse(this.buffer.slice(0, end));
      if (message) {
        messages.push(message);
      }
      this.buffer = this.buffer.slice(end + 2);
      end = this.buffer.indexOf("\n\n");
    }
    return messages;
  }
  parse(block) {
    let event = "message";
    let id;
    const data = [];
    for (const line of block.split("\n")) {
      if (!line || line.startsWith(":")) {
        continue;
      }
      const colon = line.indexOf(":");
      const field = colon < 0 ? line : line.slice(0, colon);
      const raw = colon < 0 ? "" : line.slice(colon + 1);
      const value = raw.startsWith(" ") ? raw.slice(1) : raw;
      if (field === "event") {
        event = value;
      } else if (field === "data") {
        data.push(value);
      } else if (field === "id") {
        id = value;
      }
    }
    return data.length ? { event, data: data.join("\n"), id } : null;
  }
};

// src/app/core/realtime/nearby-stream.ts
var RECONNECT_DELAY_MS = 5e3;
var NearbyStream = class _NearbyStream {
  api = inject(PlansApi);
  session = inject(Session);
  watch(query) {
    const url = this.api.nearbyStreamUrl(query);
    return new Observable((subscriber) => {
      const controller = new AbortController();
      let retry;
      const connect = async () => {
        try {
          const token = await this.session.accessToken();
          const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`, Accept: "text/event-stream" },
            signal: controller.signal
          });
          if (!response.ok || !response.body) {
            throw new Error(`HTTP ${response.status}`);
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          const parser = new SseParser();
          for (; ; ) {
            const { value, done } = await reader.read();
            if (done) {
              break;
            }
            for (const message of parser.push(decoder.decode(value, { stream: true }))) {
              if (message.event === "plan-published") {
                subscriber.next(JSON.parse(message.data));
              }
            }
          }
        } catch {
        }
        if (!controller.signal.aborted) {
          retry = setTimeout(() => void connect(), RECONNECT_DELAY_MS);
        }
      };
      void connect();
      return () => {
        controller.abort();
        clearTimeout(retry);
      };
    });
  }
  static \u0275fac = function NearbyStream_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NearbyStream)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NearbyStream, factory: _NearbyStream.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NearbyStream, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/shared/geo/distance.ts
var formatDistance = (meters, locale = "es-ES") => {
  if (meters < 1e3) {
    return `${Math.round(meters / 10) * 10} m`;
  }
  const km = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(meters / 1e3);
  return `${km} km`;
};

// src/app/features/plans/nearby-map.ts
var L2 = __toESM(require_leaflet_src());
var _c0 = ["map"];
var BRAND = "#ea580c";
var NearbyMap = class _NearbyMap {
  center = input.required(
    ...ngDevMode ? [{ debugName: "center" }] : (
      /* istanbul ignore next */
      []
    )
  );
  radius = input.required(
    ...ngDevMode ? [{ debugName: "radius" }] : (
      /* istanbul ignore next */
      []
    )
  );
  plans = input(
    [],
    ...ngDevMode ? [{ debugName: "plans" }] : (
      /* istanbul ignore next */
      []
    )
  );
  router = inject(Router);
  transloco = inject(TranslocoService);
  language = inject(Language);
  container = viewChild.required(
    "map",
    ...ngDevMode ? [{ debugName: "container" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markers = L2.layerGroup();
  map;
  constructor() {
    afterNextRender(() => {
      const { latitude, longitude } = this.center();
      this.map = L2.map(this.container().nativeElement, { zoomControl: true, attributionControl: true }).setView([latitude, longitude], 14);
      L2.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
      this.markers.addTo(this.map);
      this.draw();
    });
    effect(() => this.draw());
    inject(DestroyRef).onDestroy(() => this.map?.remove());
  }
  draw() {
    const center = this.center();
    const radius = this.radius();
    const plans = this.plans();
    const locale = this.language.locale();
    if (!this.map) {
      return;
    }
    this.markers.clearLayers();
    const here = [center.latitude, center.longitude];
    const area = L2.circle(here, { radius, color: BRAND, weight: 1, fillOpacity: 0.06 }).addTo(this.markers);
    L2.circleMarker(here, { radius: 7, color: "#fff", weight: 2, fillColor: "#2563eb", fillOpacity: 1 }).bindTooltip(this.transloco.translate("nearby.you")).addTo(this.markers);
    for (const nearby of plans) {
      const { meetingPoint } = nearby.plan;
      L2.circleMarker([meetingPoint.latitude, meetingPoint.longitude], {
        radius: 9,
        color: "#fff",
        weight: 2,
        fillColor: BRAND,
        fillOpacity: 1
      }).bindPopup(this.popup(nearby, locale)).addTo(this.markers);
    }
    this.map.fitBounds(area.getBounds(), { padding: [12, 12] });
  }
  popup(nearby, locale) {
    const box = document.createElement("div");
    box.className = "nearby-popup";
    const title = document.createElement("strong");
    title.textContent = nearby.plan.title;
    const detail = document.createElement("div");
    detail.textContent = `${nearby.plan.meetingPoint.name} \xB7 ${formatDistance(nearby.distanceMeters, locale)}`;
    const link = document.createElement("a");
    link.href = `/plans/${nearby.plan.id}`;
    link.textContent = this.transloco.translate("nearby.open");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      void this.router.navigate(["/plans", nearby.plan.id]);
    });
    box.append(title, detail, link);
    return box;
  }
  static \u0275fac = function NearbyMap_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NearbyMap)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NearbyMap, selectors: [["app-nearby-map"]], viewQuery: function NearbyMap_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.container, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { center: [1, "center"], radius: [1, "radius"], plans: [1, "plans"] }, decls: 2, vars: 0, consts: [["map", ""], [1, "nearby-map", "h-[60vh]", "min-h-80", "w-full", "rounded-2xl", "border", "border-surface-200", "z-0"]], template: function NearbyMap_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 1, 0);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NearbyMap, [{
    type: Component,
    args: [{
      selector: "app-nearby-map",
      template: `<div #map class="nearby-map h-[60vh] min-h-80 w-full rounded-2xl border border-surface-200 z-0"></div>`
    }]
  }], () => [], { center: [{ type: Input, args: [{ isSignal: true, alias: "center", required: true }] }], radius: [{ type: Input, args: [{ isSignal: true, alias: "radius", required: true }] }], plans: [{ type: Input, args: [{ isSignal: true, alias: "plans", required: false }] }], container: [{ type: ViewChild, args: ["map", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NearbyMap, { className: "NearbyMap", filePath: "src/app/features/plans/nearby-map.ts", lineNumber: 21 });
})();

// src/app/features/plans/nearby-plans.ts
var _c02 = (a0, a1) => ({ activity: a0, distance: a1 });
var _c1 = (a0) => ["/plans", a0];
var _c2 = (a0, a1) => ({ count: a0, distance: a1 });
var _c3 = (a0) => ({ count: a0 });
var _forTrack0 = ($index, $item) => $item.plan.id;
function NearbyPlans_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 22);
    \u0275\u0275elementStart(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    \u0275\u0275classMap(option_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r1.label);
  }
}
function NearbyPlans_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p-message", 24);
    \u0275\u0275listener("onClose", function NearbyPlans_Conditional_30_Template_p_message_onClose_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.newPlan.set(null));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 25);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const notice_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("closable", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 6, "nearby.newPlan", \u0275\u0275pureFunction2(11, _c02, \u0275\u0275pipeBind1(3, 4, ctx_r2.activityKey(notice_r4.activity)), ctx_r2.distance(notice_r4.distanceMeters))), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c1, notice_r4.planId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 9, "nearby.open"));
  }
}
function NearbyPlans_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "nearby.locating"));
  }
}
function NearbyPlans_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p-button", 26);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275listener("onClick", function NearbyPlans_Conditional_32_Template_p_button_onClick_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.locate());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, ctx));
    \u0275\u0275advance(2);
    \u0275\u0275property("label", \u0275\u0275pipeBind1(5, 5, "nearby.retry"))("outlined", true);
  }
}
function NearbyPlans_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "nearby.loadError"), " ");
  }
}
function NearbyPlans_Conditional_34_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-nearby-map", 28);
  }
  if (rf & 2) {
    const center_r6 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("center", center_r6)("radius", ctx_r2.radius())("plans", ctx_r2.plans());
  }
}
function NearbyPlans_Conditional_34_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "nearby.empty"), " ");
  }
}
function NearbyPlans_Conditional_34_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 31)(2, "div", 32);
    \u0275\u0275element(3, "i", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 33)(5, "div", 34)(6, "h2", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "p-tag", 36);
    \u0275\u0275pipe(9, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 37);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "transloco");
    \u0275\u0275element(13, "i", 38);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 39);
    \u0275\u0275element(17, "i", 40);
    \u0275\u0275text(18);
    \u0275\u0275elementStart(19, "span", 41);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const nearby_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(19, _c1, nearby_r7.plan.id));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("pi ", ctx_r2.activityOf(nearby_r7.plan.activity).icon, " text-xl"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(nearby_r7.plan.title);
    \u0275\u0275advance();
    \u0275\u0275property("value", \u0275\u0275pipeBind2(9, 11, ctx_r2.spotsKey(nearby_r7.plan.freeSpots), \u0275\u0275pureFunction1(21, _c3, nearby_r7.plan.freeSpots)))("rounded", true);
    const start_r8 = ctx_r2.startsIn(nearby_r7.plan.startsAt);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 14, ctx_r2.activityKey(nearby_r7.plan.activity)), " \xB7 ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(15, 16, start_r8.key, start_r8.params), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", nearby_r7.plan.meetingPoint.name, " \xB7 ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.distance(nearby_r7.distanceMeters));
  }
}
function NearbyPlans_Conditional_34_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 30);
    \u0275\u0275repeaterCreate(1, NearbyPlans_Conditional_34_Conditional_5_For_2_Template, 21, 23, "li", null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.plans());
  }
}
function NearbyPlans_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, NearbyPlans_Conditional_34_Conditional_3_Template, 1, 3, "app-nearby-map", 28)(4, NearbyPlans_Conditional_34_Conditional_4_Template, 3, 3, "div", 29)(5, NearbyPlans_Conditional_34_Conditional_5_Template, 3, 0, "ul", 30);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, "nearby.count", \u0275\u0275pureFunction2(5, _c2, ctx_r2.plans().length, ctx_r2.distance(ctx_r2.radius()))), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.view() === "map" ? 3 : ctx_r2.plans().length === 0 && !ctx_r2.results.isLoading() ? 4 : 5);
  }
}
var RADIUS_OPTIONS = [1e3, 3e3, 5e3, 1e4];
var WINDOW_OPTIONS = [1, 3, 12];
var DEFAULT_RADIUS = 5e3;
var DEFAULT_WINDOW = 12;
var NearbyPlans = class _NearbyPlans {
  api = inject(PlansApi);
  location = inject(ApproximateLocation);
  stream = inject(NearbyStream);
  transloco = inject(TranslocoService);
  language = inject(Language);
  /** Active language as a signal: the PrimeNG option labels are recomputed when it changes. */
  lang = toSignal(this.transloco.langChanges$, { initialValue: this.transloco.getActiveLang() });
  translate = (key) => {
    this.lang();
    return this.transloco.translate(key);
  };
  position = signal(
    null,
    ...ngDevMode ? [{ debugName: "position" }] : (
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
  locationError = signal(
    null,
    ...ngDevMode ? [{ debugName: "locationError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  radius = signal(
    DEFAULT_RADIUS,
    ...ngDevMode ? [{ debugName: "radius" }] : (
      /* istanbul ignore next */
      []
    )
  );
  withinHours = signal(
    DEFAULT_WINDOW,
    ...ngDevMode ? [{ debugName: "withinHours" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activities = signal(
    [],
    ...ngDevMode ? [{ debugName: "activities" }] : (
      /* istanbul ignore next */
      []
    )
  );
  view = signal(
    "list",
    ...ngDevMode ? [{ debugName: "view" }] : (
      /* istanbul ignore next */
      []
    )
  );
  newPlan = signal(
    null,
    ...ngDevMode ? [{ debugName: "newPlan" }] : (
      /* istanbul ignore next */
      []
    )
  );
  spotsKey = spotsKey;
  activityOf = activityOf;
  activityKey = activityKey;
  radiusOptions = computed(
    () => RADIUS_OPTIONS.map((value) => ({ label: formatDistance(value, this.language.locale()), value })),
    ...ngDevMode ? [{ debugName: "radiusOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  windowOptions = computed(
    () => WINDOW_OPTIONS.map((value) => ({ label: this.translate(`nearby.within${value}`), value })),
    ...ngDevMode ? [{ debugName: "windowOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activityOptions = computed(
    () => ACTIVITIES.map(({ code }) => ({ code, name: this.translate(activityKey(code)) })),
    ...ngDevMode ? [{ debugName: "activityOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  viewOptions = computed(
    () => [
      { label: this.translate("nearby.list"), value: "list", icon: "pi pi-list" },
      { label: this.translate("nearby.map"), value: "map", icon: "pi pi-map" }
    ],
    ...ngDevMode ? [{ debugName: "viewOptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  query = computed(
    () => {
      const position = this.position();
      return position ? __spreadProps(__spreadValues({}, position), {
        radius: this.radius(),
        activities: this.activities(),
        withinHours: this.withinHours()
      }) : void 0;
    },
    ...ngDevMode ? [{ debugName: "query" }] : (
      /* istanbul ignore next */
      []
    )
  );
  results = httpResource(
    () => {
      const query = this.query();
      return query ? { url: this.api.nearbyUrl(), params: nearbyParams(query) } : void 0;
    },
    ...ngDevMode ? [{ debugName: "results" }] : (
      /* istanbul ignore next */
      []
    )
  );
  plans = computed(
    () => this.results.hasValue() ? this.results.value() : [],
    ...ngDevMode ? [{ debugName: "plans" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    void this.locate();
    effect((onCleanup) => {
      const query = this.query();
      if (!query) {
        return;
      }
      const subscription = this.stream.watch(query).subscribe((event) => {
        this.newPlan.set(event);
        this.results.reload();
      });
      onCleanup(() => subscription.unsubscribe());
    });
  }
  async locate() {
    this.locating.set(true);
    this.locationError.set(null);
    try {
      this.position.set(await this.location.current(MEETING_POINT_DECIMALS));
    } catch (error) {
      this.locationError.set(error instanceof LocationError ? error.translationKey : "errors.location.denied");
    } finally {
      this.locating.set(false);
    }
  }
  distance(meters) {
    return formatDistance(meters, this.language.locale());
  }
  startsIn(startsAt) {
    return startsIn(new Date(startsAt), /* @__PURE__ */ new Date());
  }
  static \u0275fac = function NearbyPlans_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NearbyPlans)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NearbyPlans, selectors: [["app-nearby-plans"]], decls: 39, vars: 41, consts: [["item", ""], [1, "min-h-full"], [1, "bg-surface-0", "border-b", "border-surface-200"], [1, "mx-auto", "max-w-3xl", "flex", "items-center", "gap-2", "px-4", "py-3"], ["icon", "pi pi-arrow-left", "routerLink", "/", 3, "text", "rounded", "ariaLabel"], [1, "text-lg", "font-bold", "flex-1"], ["optionLabel", "label", "optionValue", "value", "size", "small", 1, "view-switch", 3, "ngModelChange", "options", "ngModel", "allowEmpty"], [1, "mx-auto", "max-w-3xl", "px-4", "py-4", "pb-28", "flex", "flex-col", "gap-4"], [1, "filters", "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-4", "shadow-sm", "flex", "flex-col", "gap-3"], [1, "flex", "flex-col", "gap-1"], [1, "text-sm", "font-semibold"], ["optionLabel", "label", "optionValue", "value", "size", "small", 1, "radius-filter", 3, "ngModelChange", "options", "ngModel", "allowEmpty"], ["optionLabel", "label", "optionValue", "value", "size", "small", 1, "window-filter", 3, "ngModelChange", "options", "ngModel", "allowEmpty"], ["optionLabel", "name", "optionValue", "code", "display", "chip", 1, "activity-filter", "w-full", 3, "ngModelChange", "options", "ngModel", "showToggleAll", "placeholder", "ariaLabel"], [1, "text-muted-color"], ["aria-hidden", "true", 1, "pi", "pi-lock", "text-xs"], ["severity", "info", 1, "new-plan-message", 3, "closable"], [1, "location-error", "rounded-2xl", "border", "border-red-200", "bg-red-50", "p-4", "text-red-800", "flex", "flex-col", "gap-3"], [1, "results-error", "rounded-2xl", "border", "border-red-200", "bg-red-50", "p-4", "text-red-800"], [1, "fixed", "inset-x-0", "bottom-0", "p-4", "bg-gradient-to-t", "from-surface-50", "via-surface-50/95"], [1, "mx-auto", "max-w-3xl"], ["icon", "pi pi-plus", "styleClass", "w-full", "size", "large", "routerLink", "/plans/new", 3, "label", "rounded"], ["aria-hidden", "true"], [1, "sr-only", "sm:not-sr-only", "sm:ml-1"], ["severity", "info", 1, "new-plan-message", 3, "onClose", "closable"], [1, "ml-2", "underline", "font-semibold", 3, "routerLink"], ["icon", "pi pi-refresh", "size", "small", "severity", "secondary", 3, "onClick", "label", "outlined"], [1, "results-count", "text-sm", "text-muted-color"], [3, "center", "radius", "plans"], [1, "empty", "rounded-2xl", "border", "border-dashed", "border-surface-300", "p-6", "text-center", "text-muted-color"], [1, "flex", "flex-col", "gap-3"], [1, "nearby-card", "flex", "gap-4", "rounded-2xl", "bg-surface-0", "border", "border-surface-200", "p-4", "shadow-sm", "hover:border-primary-300", 3, "routerLink"], [1, "flex", "size-12", "shrink-0", "items-center", "justify-center", "rounded-xl", "bg-primary-50", "text-primary"], [1, "flex-1", "min-w-0"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "font-semibold", "leading-snug"], ["severity", "warn", 1, "shrink-0", "whitespace-nowrap", 3, "value", "rounded"], [1, "mt-1", "text-sm", "text-muted-color"], ["aria-hidden", "true", 1, "pi", "pi-clock", "text-xs"], [1, "text-sm", "text-muted-color"], ["aria-hidden", "true", 1, "pi", "pi-map-marker", "text-xs"], [1, "nearby-distance", "font-medium"]], template: function NearbyPlans_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div", 3);
      \u0275\u0275element(3, "p-button", 4);
      \u0275\u0275pipe(4, "transloco");
      \u0275\u0275elementStart(5, "h1", 5);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p-selectbutton", 6);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function NearbyPlans_Template_p_selectbutton_ngModelChange_8_listener($event) {
        return ctx.view.set($event);
      });
      \u0275\u0275template(9, NearbyPlans_ng_template_9_Template, 3, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "main", 7)(12, "section", 8)(13, "div", 9)(14, "span", 10);
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p-selectbutton", 11);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function NearbyPlans_Template_p_selectbutton_ngModelChange_17_listener($event) {
        return ctx.radius.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 9)(19, "span", 10);
      \u0275\u0275text(20);
      \u0275\u0275pipe(21, "transloco");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p-selectbutton", 12);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function NearbyPlans_Template_p_selectbutton_ngModelChange_22_listener($event) {
        return ctx.withinHours.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "p-multiselect", 13);
      \u0275\u0275pipe(24, "transloco");
      \u0275\u0275pipe(25, "transloco");
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function NearbyPlans_Template_p_multiselect_ngModelChange_23_listener($event) {
        return ctx.activities.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "small", 14);
      \u0275\u0275element(27, "i", 15);
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "transloco");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(30, NearbyPlans_Conditional_30_Template, 8, 16, "p-message", 16);
      \u0275\u0275conditionalCreate(31, NearbyPlans_Conditional_31_Template, 3, 3, "p", 14)(32, NearbyPlans_Conditional_32_Template, 6, 7, "div", 17)(33, NearbyPlans_Conditional_33_Template, 3, 3, "div", 18)(34, NearbyPlans_Conditional_34_Template, 6, 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 19)(36, "div", 20);
      \u0275\u0275element(37, "p-button", 21);
      \u0275\u0275pipe(38, "transloco");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_26_0;
      let tmp_27_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("text", true)("rounded", true)("ariaLabel", \u0275\u0275pipeBind1(4, 25, "app.back"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 27, "nearby.title"));
      \u0275\u0275advance(2);
      \u0275\u0275property("options", ctx.viewOptions())("ngModel", ctx.view())("allowEmpty", false);
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 29, "nearby.radius"));
      \u0275\u0275advance(2);
      \u0275\u0275property("options", ctx.radiusOptions())("ngModel", ctx.radius())("allowEmpty", false);
      \u0275\u0275control();
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 31, "nearby.within"));
      \u0275\u0275advance(2);
      \u0275\u0275property("options", ctx.windowOptions())("ngModel", ctx.withinHours())("allowEmpty", false);
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("options", ctx.activityOptions())("ngModel", ctx.activities())("showToggleAll", false)("placeholder", \u0275\u0275pipeBind1(24, 33, "nearby.allActivities"))("ariaLabel", \u0275\u0275pipeBind1(25, 35, "nearby.activities"));
      \u0275\u0275control();
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(29, 37, "nearby.privacy"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_26_0 = ctx.newPlan()) ? 30 : -1, tmp_26_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.locating() ? 31 : (tmp_27_0 = ctx.locationError()) ? 32 : ctx.results.error() ? 33 : (tmp_27_0 = ctx.position()) ? 34 : -1, tmp_27_0);
      \u0275\u0275advance(6);
      \u0275\u0275property("label", \u0275\u0275pipeBind1(38, 39, "home.publish"))("rounded", true);
    }
  }, dependencies: [FormsModule, NgControlStatus, NgModel, RouterLink, Button, Message, MultiSelect, NearbyMap, SelectButton, Tag, TranslocoPipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NearbyPlans, [{
    type: Component,
    args: [{ selector: "app-nearby-plans", imports: [FormsModule, RouterLink, Button, Message, MultiSelect, NearbyMap, SelectButton, Tag, TranslocoPipe], template: `<div class="min-h-full">
  <header class="bg-surface-0 border-b border-surface-200">
    <div class="mx-auto max-w-3xl flex items-center gap-2 px-4 py-3">
      <p-button icon="pi pi-arrow-left" [text]="true" [rounded]="true" routerLink="/" [ariaLabel]="'app.back' | transloco" />
      <h1 class="text-lg font-bold flex-1">{{ 'nearby.title' | transloco }}</h1>
      <p-selectbutton
        class="view-switch"
        [options]="viewOptions()"
        [ngModel]="view()"
        (ngModelChange)="view.set($event)"
        optionLabel="label"
        optionValue="value"
        [allowEmpty]="false"
        size="small"
      >
        <ng-template #item let-option>
          <i [class]="option.icon" aria-hidden="true"></i>
          <span class="sr-only sm:not-sr-only sm:ml-1">{{ option.label }}</span>
        </ng-template>
      </p-selectbutton>
    </div>
  </header>

  <main class="mx-auto max-w-3xl px-4 py-4 pb-28 flex flex-col gap-4">
    <section class="filters rounded-2xl bg-surface-0 border border-surface-200 p-4 shadow-sm flex flex-col gap-3">
      <div class="flex flex-col gap-1">
        <span class="text-sm font-semibold">{{ 'nearby.radius' | transloco }}</span>
        <p-selectbutton
          class="radius-filter"
          [options]="radiusOptions()"
          [ngModel]="radius()"
          (ngModelChange)="radius.set($event)"
          optionLabel="label"
          optionValue="value"
          [allowEmpty]="false"
          size="small"
        />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-sm font-semibold">{{ 'nearby.within' | transloco }}</span>
        <p-selectbutton
          class="window-filter"
          [options]="windowOptions()"
          [ngModel]="withinHours()"
          (ngModelChange)="withinHours.set($event)"
          optionLabel="label"
          optionValue="value"
          [allowEmpty]="false"
          size="small"
        />
      </div>
      <p-multiselect
        class="activity-filter w-full"
        [options]="activityOptions()"
        [ngModel]="activities()"
        (ngModelChange)="activities.set($event)"
        optionLabel="name"
        optionValue="code"
        display="chip"
        [showToggleAll]="false"
        [placeholder]="'nearby.allActivities' | transloco"
        [ariaLabel]="'nearby.activities' | transloco"
      />
      <small class="text-muted-color">
        <i class="pi pi-lock text-xs" aria-hidden="true"></i> {{ 'nearby.privacy' | transloco }}
      </small>
    </section>

    @if (newPlan(); as notice) {
      <p-message severity="info" class="new-plan-message" [closable]="true" (onClose)="newPlan.set(null)">
        <span>
          {{ 'nearby.newPlan' | transloco: { activity: (activityKey(notice.activity) | transloco), distance: distance(notice.distanceMeters) } }}
        </span>
        <a class="ml-2 underline font-semibold" [routerLink]="['/plans', notice.planId]">{{ 'nearby.open' | transloco }}</a>
      </p-message>
    }

    @if (locating()) {
      <p class="text-muted-color">{{ 'nearby.locating' | transloco }}</p>
    } @else if (locationError(); as key) {
      <div class="location-error rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 flex flex-col gap-3">
        <span>{{ key | transloco }}</span>
        <p-button [label]="'nearby.retry' | transloco" icon="pi pi-refresh" size="small" severity="secondary"
          [outlined]="true" (onClick)="locate()" />
      </div>
    } @else if (results.error()) {
      <div class="results-error rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
        {{ 'nearby.loadError' | transloco }}
      </div>
    } @else if (position(); as center) {
      <p class="results-count text-sm text-muted-color">
        {{ 'nearby.count' | transloco: { count: plans().length, distance: distance(radius()) } }}
      </p>

      @if (view() === 'map') {
        <app-nearby-map [center]="center" [radius]="radius()" [plans]="plans()" />
      } @else if (plans().length === 0 && !results.isLoading()) {
        <div class="empty rounded-2xl border border-dashed border-surface-300 p-6 text-center text-muted-color">
          {{ 'nearby.empty' | transloco }}
        </div>
      } @else {
        <ul class="flex flex-col gap-3">
          @for (nearby of plans(); track nearby.plan.id) {
            <li>
              <a
                [routerLink]="['/plans', nearby.plan.id]"
                class="nearby-card flex gap-4 rounded-2xl bg-surface-0 border border-surface-200 p-4 shadow-sm hover:border-primary-300"
              >
                <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                  <i class="pi {{ activityOf(nearby.plan.activity).icon }} text-xl" aria-hidden="true"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h2 class="font-semibold leading-snug">{{ nearby.plan.title }}</h2>
                    <p-tag
                      [value]="spotsKey(nearby.plan.freeSpots) | transloco: { count: nearby.plan.freeSpots }"
                      severity="warn"
                      [rounded]="true"
                      class="shrink-0 whitespace-nowrap"
                    />
                  </div>
                  <p class="mt-1 text-sm text-muted-color">
                    @let start = startsIn(nearby.plan.startsAt);
                    {{ activityKey(nearby.plan.activity) | transloco }} \xB7
                    <i class="pi pi-clock text-xs" aria-hidden="true"></i> {{ start.key | transloco: start.params }}
                  </p>
                  <p class="text-sm text-muted-color">
                    <i class="pi pi-map-marker text-xs" aria-hidden="true"></i>
                    {{ nearby.plan.meetingPoint.name }} \xB7
                    <span class="nearby-distance font-medium">{{ distance(nearby.distanceMeters) }}</span>
                  </p>
                </div>
              </a>
            </li>
          }
        </ul>
      }
    }
  </main>

  <div class="fixed inset-x-0 bottom-0 p-4 bg-gradient-to-t from-surface-50 via-surface-50/95">
    <div class="mx-auto max-w-3xl">
      <p-button [label]="'home.publish' | transloco" icon="pi pi-plus" styleClass="w-full" size="large"
        [rounded]="true" routerLink="/plans/new" />
    </div>
  </div>
</div>
` }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NearbyPlans, { className: "NearbyPlans", filePath: "src/app/features/plans/nearby-plans.ts", lineNumber: 38 });
})();
export {
  DEFAULT_RADIUS,
  DEFAULT_WINDOW,
  NearbyPlans,
  RADIUS_OPTIONS,
  WINDOW_OPTIONS
};
//# debugId=92e8c3e0-32fa-55f1-9a0d-173b282be7dc
//# sourceMappingURL=chunk-AOBANGYG.js.map
