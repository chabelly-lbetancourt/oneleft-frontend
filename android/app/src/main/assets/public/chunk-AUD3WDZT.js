import {
  HttpClient,
  Injectable,
  environment,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-E45N4KGX.js";
import {
  __spreadValues
} from "./chunk-FDMHZOCR.js";

// src/app/shared/model/nearby.ts
var nearbyParams = (query) => __spreadValues({
  latitude: query.latitude,
  longitude: query.longitude,
  radius: query.radius,
  withinHours: query.withinHours
}, query.activities.length ? { activity: query.activities } : {});
var toQueryString = (params) => Object.entries(params).flatMap(([key, value]) => (Array.isArray(value) ? value : [value]).map((item) => [key, String(item)])).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");

// src/app/core/api/plans-api.ts
var PlansApi = class _PlansApi {
  http = inject(HttpClient);
  base = `${environment.apiUrl}/api/v1/plans`;
  publish(plan) {
    return this.http.post(this.base, plan);
  }
  plan(id) {
    return this.http.get(`${this.base}/${id}`);
  }
  mine() {
    return this.http.get(`${this.base}/mine`);
  }
  /** URL of the nearby plans list; the page reads it through httpResource so it can reload it. */
  nearbyUrl() {
    return `${this.base}/nearby`;
  }
  /** URL of the Server-Sent Events stream with new plans matching the search. */
  nearbyStreamUrl(query) {
    return `${this.base}/nearby/stream?${toQueryString(nearbyParams(query))}`;
  }
  static \u0275fac = function PlansApi_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlansApi)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PlansApi, factory: _PlansApi.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlansApi, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  nearbyParams,
  PlansApi
};
//# debugId=77390b28-0b3f-5dea-8cb6-467cb38c3b4d
//# sourceMappingURL=chunk-AUD3WDZT.js.map
