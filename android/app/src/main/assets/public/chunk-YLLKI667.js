import {
  WebPlugin
} from "./chunk-7DJCIE3I.js";
import "./chunk-FDMHZOCR.js";

// node_modules/@capacitor/browser/dist/esm/web.js
var BrowserWeb = class extends WebPlugin {
  constructor() {
    super();
    this._lastWindow = null;
  }
  async open(options) {
    this._lastWindow = window.open(options.url, options.windowName || "_blank");
  }
  async close() {
    return new Promise((resolve, reject) => {
      if (this._lastWindow != null) {
        this._lastWindow.close();
        this._lastWindow = null;
        resolve();
      } else {
        reject("No active window to close!");
      }
    });
  }
};
var Browser = new BrowserWeb();
export {
  Browser,
  BrowserWeb
};
//# debugId=2285ff8d-79c1-5b79-bf8e-486b7e06a54b
//# sourceMappingURL=chunk-YLLKI667.js.map
