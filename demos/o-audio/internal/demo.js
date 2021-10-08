function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;

  var __markAsModule = function __markAsModule(target) {
    return __defProp(target, "__esModule", {
      value: true
    });
  };

  var __commonJS = function __commonJS(cb, mod) {
    return function __require() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = {
        exports: {}
      }).exports, mod), mod.exports;
    };
  };

  var __reExport = function __reExport(target, module, desc) {
    if (module && _typeof(module) === "object" || typeof module === "function") {
      var _iterator = _createForOfIteratorHelper(__getOwnPropNames(module)),
          _step;

      try {
        var _loop = function _loop() {
          var key = _step.value;
          if (!__hasOwnProp.call(target, key) && key !== "default") __defProp(target, key, {
            get: function get() {
              return module[key];
            },
            enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return target;
  };

  var __toModule = function __toModule(module) {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {
      get: function get() {
        return module.default;
      },
      enumerable: true
    } : {
      value: module,
      enumerable: true
    })), module);
  }; // ../../node_modules/ftdomdelegate/browser.js


  var require_browser = __commonJS({
    "../../node_modules/ftdomdelegate/browser.js": function node_modulesFtdomdelegateBrowserJs(exports, module) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;

      function Delegate2(root) {
        this.listenerMap = [{}, {}];

        if (root) {
          this.root(root);
        }

        this.handle = Delegate2.prototype.handle.bind(this);
        this._removedListeners = [];
      }

      Delegate2.prototype.root = function (root) {
        var listenerMap = this.listenerMap;
        var eventType;

        if (this.rootElement) {
          for (eventType in listenerMap[1]) {
            if (listenerMap[1].hasOwnProperty(eventType)) {
              this.rootElement.removeEventListener(eventType, this.handle, true);
            }
          }

          for (eventType in listenerMap[0]) {
            if (listenerMap[0].hasOwnProperty(eventType)) {
              this.rootElement.removeEventListener(eventType, this.handle, false);
            }
          }
        }

        if (!root || !root.addEventListener) {
          if (this.rootElement) {
            delete this.rootElement;
          }

          return this;
        }

        this.rootElement = root;

        for (eventType in listenerMap[1]) {
          if (listenerMap[1].hasOwnProperty(eventType)) {
            this.rootElement.addEventListener(eventType, this.handle, true);
          }
        }

        for (eventType in listenerMap[0]) {
          if (listenerMap[0].hasOwnProperty(eventType)) {
            this.rootElement.addEventListener(eventType, this.handle, false);
          }
        }

        return this;
      };

      Delegate2.prototype.captureForType = function (eventType) {
        return ["blur", "error", "focus", "load", "resize", "scroll"].indexOf(eventType) !== -1;
      };

      Delegate2.prototype.on = function (eventType, selector, handler, useCapture) {
        var root;
        var listenerMap;
        var matcher;
        var matcherParam;

        if (!eventType) {
          throw new TypeError("Invalid event type: " + eventType);
        }

        if (typeof selector === "function") {
          useCapture = handler;
          handler = selector;
          selector = null;
        }

        if (useCapture === void 0) {
          useCapture = this.captureForType(eventType);
        }

        if (typeof handler !== "function") {
          throw new TypeError("Handler must be a type of Function");
        }

        root = this.rootElement;
        listenerMap = this.listenerMap[useCapture ? 1 : 0];

        if (!listenerMap[eventType]) {
          if (root) {
            root.addEventListener(eventType, this.handle, useCapture);
          }

          listenerMap[eventType] = [];
        }

        if (!selector) {
          matcherParam = null;
          matcher = matchesRoot.bind(this);
        } else if (/^[a-z]+$/i.test(selector)) {
          matcherParam = selector;
          matcher = matchesTag;
        } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
          matcherParam = selector.slice(1);
          matcher = matchesId;
        } else {
          matcherParam = selector;
          matcher = Element.prototype.matches;
        }

        listenerMap[eventType].push({
          selector: selector,
          handler: handler,
          matcher: matcher,
          matcherParam: matcherParam
        });
        return this;
      };

      Delegate2.prototype.off = function (eventType, selector, handler, useCapture) {
        var i;
        var listener;
        var listenerMap;
        var listenerList;
        var singleEventType;

        if (typeof selector === "function") {
          useCapture = handler;
          handler = selector;
          selector = null;
        }

        if (useCapture === void 0) {
          this.off(eventType, selector, handler, true);
          this.off(eventType, selector, handler, false);
          return this;
        }

        listenerMap = this.listenerMap[useCapture ? 1 : 0];

        if (!eventType) {
          for (singleEventType in listenerMap) {
            if (listenerMap.hasOwnProperty(singleEventType)) {
              this.off(singleEventType, selector, handler);
            }
          }

          return this;
        }

        listenerList = listenerMap[eventType];

        if (!listenerList || !listenerList.length) {
          return this;
        }

        for (i = listenerList.length - 1; i >= 0; i--) {
          listener = listenerList[i];

          if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
            this._removedListeners.push(listener);

            listenerList.splice(i, 1);
          }
        }

        if (!listenerList.length) {
          delete listenerMap[eventType];

          if (this.rootElement) {
            this.rootElement.removeEventListener(eventType, this.handle, useCapture);
          }
        }

        return this;
      };

      Delegate2.prototype.handle = function (event) {
        var i;
        var l;
        var type = event.type;
        var root;
        var phase;
        var listener;
        var returned;
        var listenerList = [];
        var target;
        var eventIgnore = "ftLabsDelegateIgnore";

        if (event[eventIgnore] === true) {
          return;
        }

        target = event.target;

        if (target.nodeType === 3) {
          target = target.parentNode;
        }

        if (target.correspondingUseElement) {
          target = target.correspondingUseElement;
        }

        root = this.rootElement;
        phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2);

        switch (phase) {
          case 1:
            listenerList = this.listenerMap[1][type];
            break;

          case 2:
            if (this.listenerMap[0] && this.listenerMap[0][type]) {
              listenerList = listenerList.concat(this.listenerMap[0][type]);
            }

            if (this.listenerMap[1] && this.listenerMap[1][type]) {
              listenerList = listenerList.concat(this.listenerMap[1][type]);
            }

            break;

          case 3:
            listenerList = this.listenerMap[0][type];
            break;
        }

        var toFire = [];
        l = listenerList.length;

        while (target && l) {
          for (i = 0; i < l; i++) {
            listener = listenerList[i];

            if (!listener) {
              break;
            }

            if (target.tagName && ["button", "input", "select", "textarea"].indexOf(target.tagName.toLowerCase()) > -1 && target.hasAttribute("disabled")) {
              toFire = [];
            } else if (listener.matcher.call(target, listener.matcherParam, target)) {
              toFire.push([event, target, listener]);
            }
          }

          if (target === root) {
            break;
          }

          l = listenerList.length;
          target = target.parentElement || target.parentNode;

          if (target instanceof HTMLDocument) {
            break;
          }
        }

        var ret;

        for (i = 0; i < toFire.length; i++) {
          if (this._removedListeners.indexOf(toFire[i][2]) > -1) {
            continue;
          }

          returned = this.fire.apply(this, toFire[i]);

          if (returned === false) {
            toFire[i][0][eventIgnore] = true;
            toFire[i][0].preventDefault();
            ret = false;
            break;
          }
        }

        return ret;
      };

      Delegate2.prototype.fire = function (event, target, listener) {
        return listener.handler.call(target, event, target);
      };

      function matchesTag(tagName, element) {
        return tagName.toLowerCase() === element.tagName.toLowerCase();
      }

      function matchesRoot(selector, element) {
        if (this.rootElement === window) {
          return element === document || element === document.documentElement || element === window;
        }

        return this.rootElement === element;
      }

      function matchesId(id, element) {
        return id === element.id;
      }

      Delegate2.prototype.destroy = function () {
        this.off();
        this.root();
      };

      var _default = Delegate2;
      exports.default = _default;
      module.exports = exports.default;
    }
  }); // src/js/tracking.js


  var import_ftdomdelegate = __toModule(require_browser()); // ../../libraries/o-utils/main.js


  function debounce(func, wait) {
    var timeout;
    return function () {
      var _this = this;

      var args = arguments;

      var later = function later() {
        timeout = null;
        func.apply(_this, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  } // src/js/tracking.js


  function fireEvent(action, audioObject) {
    var extraDetail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var error = audioObject.audio.error ? {
      code: audioObject.audio.error.code,
      message: audioObject.audio.error.message,
      currentTime: audioObject.audio.currentTime,
      src: audioObject.audio.currentSrc
    } : void 0;
    var event = new CustomEvent("oTracking.event", {
      detail: Object.assign({
        category: "audio",
        action: action,
        duration: audioObject.audioLength,
        error: error
      }, audioObject.trackingProperties, extraDetail),
      bubbles: true
    });
    document.body.dispatchEvent(event);
  }

  var progressWindows = [[8, 12, 10], [23, 27, 25], [48, 52, 50], [73, 77, 75], [83, 87, 85], [88, 92, 90], [93, 97, 95]];

  function getProgressPoint(progress) {
    if (progress === 0 || progress === 100) {
      return progress;
    }

    var _ref = progressWindows.find(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          lower2 = _ref4[0],
          upper2 = _ref4[1];

      return progress >= lower2 && progress <= upper2;
    }) || [],
        _ref2 = _slicedToArray(_ref, 3),
        lower = _ref2[0],
        upper = _ref2[1],
        point = _ref2[2];

    return point;
  }

  var EVENTS = [{
    name: "playing"
  }, {
    name: "pause"
  }, {
    name: "seeked",
    debounceEvery: 1e3
  }, {
    name: "timeupdate"
  }, {
    name: "ended"
  }, {
    name: "error"
  }, {
    name: "stalled"
  }];
  var TRACKING_ATTRIBUTES = ["contentId", "rootContentId", "audioSubtype", "playerType", "root_id"];

  function whitelistProps(props) {
    return TRACKING_ATTRIBUTES.reduce(function (acc, propName) {
      return Object.assign({}, acc, props[propName] ? _defineProperty({}, propName, props[propName]) : void 0);
    }, {});
  }

  var AudioTracking = /*#__PURE__*/function () {
    "use strict";

    function AudioTracking(audio) {
      var trackingProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, AudioTracking);

      this.audio = audio;
      this.trackingProperties = whitelistProps(trackingProperties);
      this.audioLength = void 0;
      this.lastTrackedProgressPoint = void 0;
      this.delegate = new import_ftdomdelegate.default(audio);
      this.delegate.on("loadedmetadata", this.extractMetadata.bind(this));
      this.attachListeners();
      this.extractMetadata();
    }

    _createClass(AudioTracking, [{
      key: "attachListeners",
      value: function attachListeners() {
        var _this2 = this;

        EVENTS.forEach(function (_ref6) {
          var name = _ref6.name,
              debounceEvery = _ref6.debounceEvery;

          var listener = _this2.eventListener.bind(_this2);

          if (debounceEvery) {
            listener = debounce(listener, debounceEvery);
          }

          _this2.delegate.on(name, listener);
        });
      }
    }, {
      key: "extractMetadata",
      value: function extractMetadata() {
        this.audioLength = parseInt(this.audio.duration, 10);
      }
    }, {
      key: "eventListener",
      value: function eventListener(ev) {
        var progress = parseInt(100 * (this.audio.currentTime || 0) / this.audioLength, 10);

        if (ev.type !== "timeupdate") {
          return fireEvent(ev.type, this, {
            progress: progress
          });
        }

        var progressPoint = getProgressPoint(progress);

        if (progressPoint !== void 0 && progressPoint !== this.lastTrackedProgressPoint && !this.audio.paused) {
          this.lastTrackedProgressPoint = progressPoint;
          fireEvent("progress", this, {
            progress: progressPoint
          });
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.delegate.destroy();
      }
    }]);

    return AudioTracking;
  }();

  var tracking_default = AudioTracking; // src/js/o-audio.js

  var OAudio = /*#__PURE__*/function () {
    "use strict";

    function OAudio(oAudioEl, opts) {
      _classCallCheck(this, OAudio);

      if (!(oAudioEl instanceof HTMLAudioElement)) {
        console.warn("oAudioEl should be an instance of HTMLAudioElement");
      }

      this.oAudioEl = oAudioEl;
      this.options = Object.assign({}, {}, opts || OAudio.getDataAttributes(oAudioEl));
      this.tracking = new tracking_default(oAudioEl, this.options);
    }

    _createClass(OAudio, [{
      key: "destroy",
      value: function destroy() {
        this.tracking.destroy();
      }
    }], [{
      key: "getDataAttributes",
      value: function getDataAttributes(oAudioEl) {
        if (!(oAudioEl instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(oAudioEl.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oAudio(w)(w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = oAudioEl.dataset[key];

          try {
            options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
          } catch (error) {
            options[shortKey] = value;
          }

          return options;
        }, {});
      }
    }, {
      key: "init",
      value: function init(rootEl, opts) {
        if (!rootEl) {
          rootEl = document.body;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (rootEl instanceof HTMLAudioElement && rootEl.matches("[data-o-component=o-audio]")) {
          return new OAudio(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-audio"]'), function (rootEl2) {
          return new OAudio(rootEl2, opts);
        });
      }
    }]);

    return OAudio;
  }();

  var o_audio_default = OAudio; // main.js

  var constructAll = function constructAll() {
    o_audio_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  function initDemos() {
    document.addEventListener("oTracking.event", function (_ref7) {
      var detail = _ref7.detail;
      console.log("%cReceived oTracking ".concat(detail.category, " event %c").concat(detail.action), "color: green", "color: blue", detail);
    });
    document.addEventListener("DOMContentLoaded", function () {
      document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
    });
  }

  initDemos();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvdHJhY2tpbmcuanMiLCIuLi8uLi9saWJyYXJpZXMvby11dGlscy9tYWluLmpzIiwic3JjL2pzL28tYXVkaW8uanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsZUFBQSxHQUFBLFVBQUEsQ0FBQTtBQUFBLGlEQUFBLDhDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7QUFBQTs7QUFFQSxNQUFBLE1BQUEsQ0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFFBQUEsS0FBQSxFQUFPO0FBRG9DLE9BQTdDO0FBR0EsTUFBQSxPQUFBLENBQVEsT0FBUixHQUFrQixLQUFBLENBQWxCOztBQVlBLGVBQUEsU0FBQSxDQUFrQixJQUFsQixFQUF3QjtBQU90QixhQUFLLFdBQUwsR0FBbUIsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFuQjs7QUFFQSxZQUFJLElBQUosRUFBVTtBQUNSLGVBQUssSUFBTCxDQUFVLElBQVY7QUFBVTs7QUFLWixhQUFLLE1BQUwsR0FBYyxTQUFBLENBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixJQUExQixDQUErQixJQUEvQixDQUFkO0FBRUEsYUFBSyxpQkFBTCxHQUF5QixFQUF6QjtBQUF5Qjs7QUFXM0IsTUFBQSxTQUFBLENBQVMsU0FBVCxDQUFtQixJQUFuQixHQUEwQixVQUFVLElBQVYsRUFBZ0I7QUFDeEMsWUFBSSxXQUFBLEdBQWMsS0FBSyxXQUF2QjtBQUNBLFlBQUksU0FBSjs7QUFFQSxZQUFJLEtBQUssV0FBVCxFQUFzQjtBQUNwQixlQUFLLFNBQUwsSUFBa0IsV0FBQSxDQUFZ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b250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG4vKipcbiAqIERPTSBldmVudCBkZWxlZ2F0b3JcbiAqXG4gKiBUaGUgZGVsZWdhdG9yIHdpbGwgbGlzdGVuXG4gKiBmb3IgZXZlbnRzIHRoYXQgYnViYmxlIHVwXG4gKiB0byB0aGUgcm9vdCBub2RlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBEZWxlZ2F0ZShyb290KSB7XG4gIC8qKlxuICAgKiBNYWludGFpbiBhIG1hcCBvZiBsaXN0ZW5lclxuICAgKiBsaXN0cywga2V5ZWQgYnkgZXZlbnQgbmFtZS5cbiAgICpcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICB0aGlzLmxpc3RlbmVyTWFwID0gW3t9LCB7fV07XG5cbiAgaWYgKHJvb3QpIHtcbiAgICB0aGlzLnJvb3Qocm9vdCk7XG4gIH1cbiAgLyoqIEB0eXBlIGZ1bmN0aW9uKCkgKi9cblxuXG4gIHRoaXMuaGFuZGxlID0gRGVsZWdhdGUucHJvdG90eXBlLmhhbmRsZS5iaW5kKHRoaXMpOyAvLyBDYWNoZSBvZiBldmVudCBsaXN0ZW5lcnMgcmVtb3ZlZCBkdXJpbmcgYW4gZXZlbnQgY3ljbGVcblxuICB0aGlzLl9yZW1vdmVkTGlzdGVuZXJzID0gW107XG59XG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG4gKiBvbiB0aGUgcHJvdmlkZWQgRE9NIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKHJvb3QpIHtcbiAgdmFyIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcDtcbiAgdmFyIGV2ZW50VHlwZTsgLy8gUmVtb3ZlIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcblxuICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMV0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcFswXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIElmIG5vIHJvb3Qgb3Igcm9vdCBpcyBub3RcbiAgLy8gYSBkb20gbm9kZSwgdGhlbiByZW1vdmUgaW50ZXJuYWxcbiAgLy8gcm9vdCByZWZlcmVuY2UgYW5kIGV4aXQgaGVyZVxuXG5cbiAgaWYgKCFyb290IHx8ICFyb290LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgZGVsZXRlIHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSByb290IG5vZGUgYXQgd2hpY2hcbiAgICogbGlzdGVuZXJzIGFyZSBhdHRhY2hlZC5cbiAgICpcbiAgICogQHR5cGUgTm9kZVxuICAgKi9cblxuXG4gIHRoaXMucm9vdEVsZW1lbnQgPSByb290OyAvLyBTZXQgdXAgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuXG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwWzFdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFswXSkge1xuICAgIGlmIChsaXN0ZW5lck1hcFswXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmNhcHR1cmVGb3JUeXBlID0gZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICByZXR1cm4gWydibHVyJywgJ2Vycm9yJywgJ2ZvY3VzJywgJ2xvYWQnLCAncmVzaXplJywgJ3Njcm9sbCddLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTE7XG59O1xuLyoqXG4gKiBBdHRhY2ggYSBoYW5kbGVyIHRvIG9uZVxuICogZXZlbnQgZm9yIGFsbCBlbGVtZW50c1xuICogdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3IsXG4gKiBub3cgb3IgaW4gdGhlIGZ1dHVyZVxuICpcbiAqIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIHJlY2VpdmVzXG4gKiB0aHJlZSBhcmd1bWVudHM6IHRoZSBET00gZXZlbnRcbiAqIG9iamVjdCwgdGhlIG5vZGUgdGhhdCBtYXRjaGVkXG4gKiB0aGUgc2VsZWN0b3Igd2hpbGUgdGhlIGV2ZW50XG4gKiB3YXMgYnViYmxpbmcgYW5kIGEgcmVmZXJlbmNlXG4gKiB0byBpdHNlbGYuIFdpdGhpbiB0aGUgaGFuZGxlcixcbiAqICd0aGlzJyBpcyBlcXVhbCB0byB0aGUgc2Vjb25kXG4gKiBhcmd1bWVudC5cbiAqXG4gKiBUaGUgbm9kZSB0aGF0IGFjdHVhbGx5IHJlY2VpdmVkXG4gKiB0aGUgZXZlbnQgY2FuIGJlIGFjY2Vzc2VkIHZpYVxuICogJ2V2ZW50LnRhcmdldCcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBMaXN0ZW4gZm9yIHRoZXNlIGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzZWxlY3RvciBPbmx5IGhhbmRsZSBldmVudHMgb24gZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBzZWxlY3RvciwgaWYgdW5kZWZpbmVkIG1hdGNoIHJvb3QgZWxlbWVudFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBoYW5kbGVyIEhhbmRsZXIgZnVuY3Rpb24gLSBldmVudCBkYXRhIHBhc3NlZCBoZXJlIHdpbGwgYmUgaW4gZXZlbnQuZGF0YVxuICogQHBhcmFtIHtib29sZWFufSBbdXNlQ2FwdHVyZV0gc2VlICd1c2VDYXB0dXJlJyBpbiA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXI+XG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgdmFyIHJvb3Q7XG4gIHZhciBsaXN0ZW5lck1hcDtcbiAgdmFyIG1hdGNoZXI7XG4gIHZhciBtYXRjaGVyUGFyYW07XG5cbiAgaWYgKCFldmVudFR5cGUpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHR5cGU6ICcgKyBldmVudFR5cGUpO1xuICB9IC8vIGhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG5cblxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlQ2FwdHVyZSA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfSAvLyBGYWxsYmFjayB0byBzZW5zaWJsZSBkZWZhdWx0c1xuICAvLyBpZiB1c2VDYXB0dXJlIG5vdCBzZXRcblxuXG4gIGlmICh1c2VDYXB0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICB1c2VDYXB0dXJlID0gdGhpcy5jYXB0dXJlRm9yVHlwZShldmVudFR5cGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFuZGxlciBtdXN0IGJlIGEgdHlwZSBvZiBGdW5jdGlvbicpO1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdOyAvLyBBZGQgbWFzdGVyIGhhbmRsZXIgZm9yIHR5cGUgaWYgbm90IGNyZWF0ZWQgeWV0XG5cbiAgaWYgKCFsaXN0ZW5lck1hcFtldmVudFR5cGVdKSB7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB1c2VDYXB0dXJlKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lck1hcFtldmVudFR5cGVdID0gW107XG4gIH1cblxuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gbnVsbDsgLy8gQ09NUExFWCAtIG1hdGNoZXNSb290IG5lZWRzIHRvIGhhdmUgYWNjZXNzIHRvXG4gICAgLy8gdGhpcy5yb290RWxlbWVudCwgc28gYmluZCB0aGUgZnVuY3Rpb24gdG8gdGhpcy5cblxuICAgIG1hdGNoZXIgPSBtYXRjaGVzUm9vdC5iaW5kKHRoaXMpOyAvLyBDb21waWxlIGEgbWF0Y2hlciBmb3IgdGhlIGdpdmVuIHNlbGVjdG9yXG4gIH0gZWxzZSBpZiAoL15bYS16XSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gbWF0Y2hlc1RhZztcbiAgfSBlbHNlIGlmICgvXiNbYS16MC05XFwtX10rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3Iuc2xpY2UoMSk7XG4gICAgbWF0Y2hlciA9IG1hdGNoZXNJZDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcztcbiAgfSAvLyBBZGQgdG8gdGhlIGxpc3Qgb2YgbGlzdGVuZXJzXG5cblxuICBsaXN0ZW5lck1hcFtldmVudFR5cGVdLnB1c2goe1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgIG1hdGNoZXI6IG1hdGNoZXIsXG4gICAgbWF0Y2hlclBhcmFtOiBtYXRjaGVyUGFyYW1cbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogUmVtb3ZlIGFuIGV2ZW50IGhhbmRsZXJcbiAqIGZvciBlbGVtZW50cyB0aGF0IG1hdGNoXG4gKiB0aGUgc2VsZWN0b3IsIGZvcmV2ZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW2V2ZW50VHlwZV0gUmVtb3ZlIGhhbmRsZXJzIGZvciBldmVudHMgbWF0Y2hpbmcgdGhpcyB0eXBlLCBjb25zaWRlcmluZyB0aGUgb3RoZXIgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl0gSWYgdGhpcyBwYXJhbWV0ZXIgaXMgb21pdHRlZCwgb25seSBoYW5kbGVycyB3aGljaCBtYXRjaCB0aGUgb3RoZXIgdHdvIHdpbGwgYmUgcmVtb3ZlZFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBbaGFuZGxlcl0gSWYgdGhpcyBwYXJhbWV0ZXIgaXMgb21pdHRlZCwgb25seSBoYW5kbGVycyB3aGljaCBtYXRjaCB0aGUgcHJldmlvdXMgdHdvIHdpbGwgYmUgcmVtb3ZlZFxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICB2YXIgaTtcbiAgdmFyIGxpc3RlbmVyO1xuICB2YXIgbGlzdGVuZXJNYXA7XG4gIHZhciBsaXN0ZW5lckxpc3Q7XG4gIHZhciBzaW5nbGVFdmVudFR5cGU7IC8vIEhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZUNhcHR1cmUgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IG51bGw7XG4gIH0gLy8gSWYgdXNlQ2FwdHVyZSBub3Qgc2V0LCByZW1vdmVcbiAgLy8gYWxsIGV2ZW50IGxpc3RlbmVyc1xuXG5cbiAgaWYgKHVzZUNhcHR1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHRydWUpO1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgZm9yIChzaW5nbGVFdmVudFR5cGUgaW4gbGlzdGVuZXJNYXApIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShzaW5nbGVFdmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMub2ZmKHNpbmdsZUV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcblxuICBpZiAoIWxpc3RlbmVyTGlzdCB8fCAhbGlzdGVuZXJMaXN0Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9IC8vIFJlbW92ZSBvbmx5IHBhcmFtZXRlciBtYXRjaGVzXG4gIC8vIGlmIHNwZWNpZmllZFxuXG5cbiAgZm9yIChpID0gbGlzdGVuZXJMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07XG5cbiAgICBpZiAoKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gbGlzdGVuZXIuc2VsZWN0b3IpICYmICghaGFuZGxlciB8fCBoYW5kbGVyID09PSBsaXN0ZW5lci5oYW5kbGVyKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlZExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgbGlzdGVuZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH0gLy8gQWxsIGxpc3RlbmVycyByZW1vdmVkXG5cblxuICBpZiAoIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICBkZWxldGUgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTsgLy8gUmVtb3ZlIHRoZSBtYWluIGhhbmRsZXJcblxuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBIYW5kbGUgYW4gYXJiaXRyYXJ5IGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBpO1xuICB2YXIgbDtcbiAgdmFyIHR5cGUgPSBldmVudC50eXBlO1xuICB2YXIgcm9vdDtcbiAgdmFyIHBoYXNlO1xuICB2YXIgbGlzdGVuZXI7XG4gIHZhciByZXR1cm5lZDtcbiAgdmFyIGxpc3RlbmVyTGlzdCA9IFtdO1xuICB2YXIgdGFyZ2V0O1xuICB2YXIgZXZlbnRJZ25vcmUgPSAnZnRMYWJzRGVsZWdhdGVJZ25vcmUnO1xuXG4gIGlmIChldmVudFtldmVudElnbm9yZV0gPT09IHRydWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0YXJnZXQgPSBldmVudC50YXJnZXQ7IC8vIEhhcmRjb2RlIHZhbHVlIG9mIE5vZGUuVEVYVF9OT0RFXG4gIC8vIGFzIG5vdCBkZWZpbmVkIGluIElFOFxuXG4gIGlmICh0YXJnZXQubm9kZVR5cGUgPT09IDMpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfSAvLyBIYW5kbGUgU1ZHIDx1c2U+IGVsZW1lbnRzIGluIElFXG5cblxuICBpZiAodGFyZ2V0LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50KSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50O1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIHBoYXNlID0gZXZlbnQuZXZlbnRQaGFzZSB8fCAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0ID8gMyA6IDIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXG5cbiAgc3dpdGNoIChwaGFzZSkge1xuICAgIGNhc2UgMTpcbiAgICAgIC8vRXZlbnQuQ0FQVFVSSU5HX1BIQVNFOlxuICAgICAgbGlzdGVuZXJMaXN0ID0gdGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAyOlxuICAgICAgLy9FdmVudC5BVF9UQVJHRVQ6XG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFswXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdKSB7XG4gICAgICAgIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTGlzdC5jb25jYXQodGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyTWFwWzFdICYmIHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV0pIHtcbiAgICAgICAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJMaXN0LmNvbmNhdCh0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDM6XG4gICAgICAvL0V2ZW50LkJVQkJMSU5HX1BIQVNFOlxuICAgICAgbGlzdGVuZXJMaXN0ID0gdGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIHRvRmlyZSA9IFtdOyAvLyBOZWVkIHRvIGNvbnRpbnVvdXNseSBjaGVja1xuICAvLyB0aGF0IHRoZSBzcGVjaWZpYyBsaXN0IGlzXG4gIC8vIHN0aWxsIHBvcHVsYXRlZCBpbiBjYXNlIG9uZVxuICAvLyBvZiB0aGUgY2FsbGJhY2tzIGFjdHVhbGx5XG4gIC8vIGNhdXNlcyB0aGUgbGlzdCB0byBiZSBkZXN0cm95ZWQuXG5cbiAgbCA9IGxpc3RlbmVyTGlzdC5sZW5ndGg7XG5cbiAgd2hpbGUgKHRhcmdldCAmJiBsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07IC8vIEJhaWwgZnJvbSB0aGlzIGxvb3AgaWZcbiAgICAgIC8vIHRoZSBsZW5ndGggY2hhbmdlZCBhbmRcbiAgICAgIC8vIG5vIG1vcmUgbGlzdGVuZXJzIGFyZVxuICAgICAgLy8gZGVmaW5lZCBiZXR3ZWVuIGkgYW5kIGwuXG5cbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQudGFnTmFtZSAmJiBbXCJidXR0b25cIiwgXCJpbnB1dFwiLCBcInNlbGVjdFwiLCBcInRleHRhcmVhXCJdLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPiAtMSAmJiB0YXJnZXQuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIikpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoaW5ncyB0aGF0IGhhdmUgcHJldmlvdXNseSBmaXJlZFxuICAgICAgICB0b0ZpcmUgPSBbXTtcbiAgICAgIH0gLy8gQ2hlY2sgZm9yIG1hdGNoIGFuZCBmaXJlXG4gICAgICAvLyB0aGUgZXZlbnQgaWYgdGhlcmUncyBvbmVcbiAgICAgIC8vXG4gICAgICAvLyBUT0RPOk1DRzoyMDEyMDExNzogTmVlZCBhIHdheVxuICAgICAgLy8gdG8gY2hlY2sgaWYgZXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uXG4gICAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgYm90aCBsb29wcy5cbiAgICAgIGVsc2UgaWYgKGxpc3RlbmVyLm1hdGNoZXIuY2FsbCh0YXJnZXQsIGxpc3RlbmVyLm1hdGNoZXJQYXJhbSwgdGFyZ2V0KSkge1xuICAgICAgICAgIHRvRmlyZS5wdXNoKFtldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcl0pO1xuICAgICAgICB9XG4gICAgfSAvLyBUT0RPOk1DRzoyMDEyMDExNzogTmVlZCBhIHdheSB0b1xuICAgIC8vIGNoZWNrIGlmIGV2ZW50I3N0b3BQcm9wYWdhdGlvblxuICAgIC8vIHdhcyBjYWxsZWQuIElmIHNvLCBicmVhayBsb29waW5nXG4gICAgLy8gdGhyb3VnaCB0aGUgRE9NLiBTdG9wIGlmIHRoZVxuICAgIC8vIGRlbGVnYXRpb24gcm9vdCBoYXMgYmVlbiByZWFjaGVkXG5cblxuICAgIGlmICh0YXJnZXQgPT09IHJvb3QpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoOyAvLyBGYWxsIGJhY2sgdG8gcGFyZW50Tm9kZSBzaW5jZSBTVkcgY2hpbGRyZW4gaGF2ZSBubyBwYXJlbnRFbGVtZW50IGluIElFXG5cbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudCB8fCB0YXJnZXQucGFyZW50Tm9kZTsgLy8gRG8gbm90IHRyYXZlcnNlIHVwIHRvIGRvY3VtZW50IHJvb3Qgd2hlbiB1c2luZyBwYXJlbnROb2RlLCB0aG91Z2hcblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRG9jdW1lbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciByZXQ7XG5cbiAgZm9yIChpID0gMDsgaSA8IHRvRmlyZS5sZW5ndGg7IGkrKykge1xuICAgIC8vIEhhcyBpdCBiZWVuIHJlbW92ZWQgZHVyaW5nIHdoaWxlIHRoZSBldmVudCBmdW5jdGlvbiB3YXMgZmlyZWRcbiAgICBpZiAodGhpcy5fcmVtb3ZlZExpc3RlbmVycy5pbmRleE9mKHRvRmlyZVtpXVsyXSkgPiAtMSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmV0dXJuZWQgPSB0aGlzLmZpcmUuYXBwbHkodGhpcywgdG9GaXJlW2ldKTsgLy8gU3RvcCBwcm9wYWdhdGlvbiB0byBzdWJzZXF1ZW50XG4gICAgLy8gY2FsbGJhY2tzIGlmIHRoZSBjYWxsYmFjayByZXR1cm5lZFxuICAgIC8vIGZhbHNlXG5cbiAgICBpZiAocmV0dXJuZWQgPT09IGZhbHNlKSB7XG4gICAgICB0b0ZpcmVbaV1bMF1bZXZlbnRJZ25vcmVdID0gdHJ1ZTtcbiAgICAgIHRvRmlyZVtpXVswXS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcbi8qKlxuICogRmlyZSBhIGxpc3RlbmVyIG9uIGEgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50LCB0YXJnZXQsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBsaXN0ZW5lci5oYW5kbGVyLmNhbGwodGFyZ2V0LCBldmVudCwgdGFyZ2V0KTtcbn07XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyBhIHRhZyBzZWxlY3Rvci5cbiAqXG4gKiBUYWdzIGFyZSBOT1QgY2FzZS1zZW5zaXRpdmUsXG4gKiBleGNlcHQgaW4gWE1MIChhbmQgWE1MLWJhc2VkXG4gKiBsYW5ndWFnZXMgc3VjaCBhcyBYSFRNTCkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIHRhZyBuYW1lIHRvIHRlc3QgYWdhaW5zdFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hlc1RhZyh0YWdOYW1lLCBlbGVtZW50KSB7XG4gIHJldHVybiB0YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xufVxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgdGhlIHJvb3QuXG4gKlxuICogQHBhcmFtIHs/U3RyaW5nfSBzZWxlY3RvciBJbiB0aGlzIGNhc2UgdGhpcyBpcyBhbHdheXMgcGFzc2VkIHRocm91Z2ggYXMgbnVsbCBhbmQgbm90IHVzZWRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNSb290KHNlbGVjdG9yLCBlbGVtZW50KSB7XG4gIGlmICh0aGlzLnJvb3RFbGVtZW50ID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4gKC8vIE1hdGNoIHRoZSBvdXRlciBkb2N1bWVudCAoZGlzcGF0Y2hlZCBmcm9tIGRvY3VtZW50KVxuICAgICAgZWxlbWVudCA9PT0gZG9jdW1lbnQgfHwgLy8gVGhlIDxodG1sPiBlbGVtZW50IChkaXNwYXRjaGVkIGZyb20gZG9jdW1lbnQuYm9keSBvciBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG4gICAgICBlbGVtZW50ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgLy8gT3IgdGhlIHdpbmRvdyBpdHNlbGYgKGRpc3BhdGNoZWQgZnJvbSB3aW5kb3cpXG4gICAgICBlbGVtZW50ID09PSB3aW5kb3dcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQgPT09IGVsZW1lbnQ7XG59XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIElEIG9mXG4gKiB0aGUgZWxlbWVudCBpbiAndGhpcydcbiAqIG1hdGNoZXMgdGhlIGdpdmVuIElELlxuICpcbiAqIElEcyBhcmUgY2FzZS1zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBJRCB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNJZChpZCwgZWxlbWVudCkge1xuICByZXR1cm4gaWQgPT09IGVsZW1lbnQuaWQ7XG59XG4vKipcbiAqIFNob3J0IGhhbmQgZm9yIG9mZigpXG4gKiBhbmQgcm9vdCgpLCBpZSBib3RoXG4gKiB3aXRoIG5vIHBhcmFtZXRlcnNcbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm9mZigpO1xuICB0aGlzLnJvb3QoKTtcbn07XG5cbnZhciBfZGVmYXVsdCA9IERlbGVnYXRlO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDsiLCJpbXBvcnQgRGVsZWdhdGUgZnJvbSAnZnRkb21kZWxlZ2F0ZSc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdXRpbHMnO1xuXG5mdW5jdGlvbiBmaXJlRXZlbnQoYWN0aW9uLCBhdWRpb09iamVjdCwgZXh0cmFEZXRhaWwgPSB7fSkge1xuXHRjb25zdCBlcnJvciA9IGF1ZGlvT2JqZWN0LmF1ZGlvLmVycm9yID8ge1xuXHRcdGNvZGU6IGF1ZGlvT2JqZWN0LmF1ZGlvLmVycm9yLmNvZGUsXG5cdFx0bWVzc2FnZTogYXVkaW9PYmplY3QuYXVkaW8uZXJyb3IubWVzc2FnZSxcblx0XHRjdXJyZW50VGltZTogYXVkaW9PYmplY3QuYXVkaW8uY3VycmVudFRpbWUsXG5cdFx0c3JjOiBhdWRpb09iamVjdC5hdWRpby5jdXJyZW50U3JjXG5cdH0gOiB1bmRlZmluZWQ7XG5cblx0Y29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIHtcblx0XHRkZXRhaWw6IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0Y2F0ZWdvcnk6ICdhdWRpbycsXG5cdFx0XHRhY3Rpb24sXG5cdFx0XHRkdXJhdGlvbjogYXVkaW9PYmplY3QuYXVkaW9MZW5ndGgsXG5cdFx0XHRlcnJvcixcblx0XHR9LCBhdWRpb09iamVjdC50cmFja2luZ1Byb3BlcnRpZXMsIGV4dHJhRGV0YWlsKSxcblx0XHRidWJibGVzOiB0cnVlLFxuXHR9KTtcblx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuY29uc3QgcHJvZ3Jlc3NXaW5kb3dzID0gW1xuXHRbOCwgMTIsIDEwXSxcblx0WzIzLCAyNywgMjVdLFxuXHRbNDgsIDUyLCA1MF0sXG5cdFs3MywgNzcsIDc1XSxcblx0WzgzLCA4NywgODVdLFxuXHRbODgsIDkyLCA5MF0sXG5cdFs5MywgOTcsIDk1XVxuXTtcblxuZnVuY3Rpb24gZ2V0UHJvZ3Jlc3NQb2ludChwcm9ncmVzcykge1xuXHRpZiAocHJvZ3Jlc3MgPT09IDAgfHwgcHJvZ3Jlc3MgPT09IDEwMCkge1xuXHRcdHJldHVybiBwcm9ncmVzcztcblx0fVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0Y29uc3QgW2xvd2VyLCB1cHBlciwgcG9pbnRdID0gcHJvZ3Jlc3NXaW5kb3dzLmZpbmQoKFtsb3dlciwgdXBwZXJdKSA9PiB7XG5cdFx0cmV0dXJuIHByb2dyZXNzID49IGxvd2VyICYmIHByb2dyZXNzIDw9IHVwcGVyO1xuXHR9KSB8fCBbXTtcblxuXHRyZXR1cm4gcG9pbnQ7XG59XG5cbmNvbnN0IEVWRU5UUyA9IFtcblx0eyBuYW1lOiAncGxheWluZycgfSxcblx0eyBuYW1lOiAncGF1c2UnIH0sXG5cdHsgbmFtZTogJ3NlZWtlZCcsIGRlYm91bmNlRXZlcnk6IDEwMDAgfSxcblx0eyBuYW1lOiAndGltZXVwZGF0ZScgfSxcblx0eyBuYW1lOiAnZW5kZWQnIH0sXG5cdHsgbmFtZTogJ2Vycm9yJyB9LFxuXHR7IG5hbWU6ICdzdGFsbGVkJyB9XG5dO1xuXG5jb25zdCBUUkFDS0lOR19BVFRSSUJVVEVTID0gW1xuXHQvLyBUaGUgY29udGVudCBpZCBvZiB0aGUgYXVkaW8gYmVpbmcgcGxheWVkXG5cdCdjb250ZW50SWQnLFxuXG5cdC8vIFRoZSBjb250ZW50IGlkIG9mIHRoZSBhcnRpY2xlIGluIHdoaWNoIHRoZSBhdWRpbyBpcyBlbWJlZGRlZFxuXHQvLyBOb3RlOiBUaGlzIGNhbiBiZSB0aGUgc2FtZSBhcyBjb250ZW50SWRcblx0J3Jvb3RDb250ZW50SWQnLFxuXG5cdC8vIFRoZSBhdWRpbyBzdWJ0eXBlIGllLiBwb2RjYXN0LCBhbXlcblx0J2F1ZGlvU3VidHlwZScsXG5cblx0Ly8gQSBzdHJpbmcgdG8gaWRlbnRpZnkgd2hpY2ggcGxheWVyIGlzIGJlaW5nIHVzZWQuXG5cdC8vIGkuZS4gZnQtYXVkaW8tcGxheWVyXG5cdCdwbGF5ZXJUeXBlJyxcblxuXHQvLyBUaGUgdGhlIHZhbHVlIG9mIHJvb3QgSUQgd2hlbiBhdWRpbyBwbGF5YmFjayBzdGFydGVkLlxuXHQvLyBSZXF1aXJlZCBmb3IgdGhlIHBlcnNpc3RlbnQgcGxheWVyIGluIHRoZSBhcHAgc29cblx0Ly8gYXVkaW8gZXZlbnRzIGNhbiBiZSBsaW5rZWQgYmFjayB0byB0aGUgY29ycmVjdCBwYWdlOnZpZXcgZXZlbnRcblx0J3Jvb3RfaWQnLFxuXTtcblxuZnVuY3Rpb24gd2hpdGVsaXN0UHJvcHMocHJvcHMpIHtcblx0cmV0dXJuIFRSQUNLSU5HX0FUVFJJQlVURVMucmVkdWNlKFxuXHRcdChhY2MsIHByb3BOYW1lKSA9PiBPYmplY3QuYXNzaWduKFxuXHRcdFx0e30sXG5cdFx0XHRhY2MsXG5cdFx0XHRwcm9wc1twcm9wTmFtZV0gPyB7IFtwcm9wTmFtZV06IHByb3BzW3Byb3BOYW1lXSB9IDogdW5kZWZpbmVkXG5cdFx0KSxcblx0XHR7fVxuXHQpO1xufVxuXG5jbGFzcyBBdWRpb1RyYWNraW5nIHtcblx0Y29uc3RydWN0b3IoYXVkaW8sIHRyYWNraW5nUHJvcGVydGllcyA9IHt9KSB7XG5cdFx0dGhpcy5hdWRpbyA9IGF1ZGlvO1xuXHRcdHRoaXMudHJhY2tpbmdQcm9wZXJ0aWVzID0gd2hpdGVsaXN0UHJvcHModHJhY2tpbmdQcm9wZXJ0aWVzKTtcblx0XHR0aGlzLmF1ZGlvTGVuZ3RoID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMubGFzdFRyYWNrZWRQcm9ncmVzc1BvaW50ID0gdW5kZWZpbmVkO1xuXG5cdFx0dGhpcy5kZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZShhdWRpbyk7XG5cdFx0dGhpcy5kZWxlZ2F0ZS5vbignbG9hZGVkbWV0YWRhdGEnLCB0aGlzLmV4dHJhY3RNZXRhZGF0YS5iaW5kKHRoaXMpKTtcblxuXHRcdHRoaXMuYXR0YWNoTGlzdGVuZXJzKCk7XG5cdFx0dGhpcy5leHRyYWN0TWV0YWRhdGEoKTtcblx0fVxuXG5cdGF0dGFjaExpc3RlbmVycygpIHtcblx0XHRFVkVOVFMuZm9yRWFjaCgoeyBuYW1lLCBkZWJvdW5jZUV2ZXJ5IH0pID0+IHtcblx0XHRcdGxldCBsaXN0ZW5lciA9IHRoaXMuZXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpO1xuXHRcdFx0aWYgKGRlYm91bmNlRXZlcnkpIHtcblx0XHRcdFx0bGlzdGVuZXIgPSBVdGlscy5kZWJvdW5jZShsaXN0ZW5lciwgZGVib3VuY2VFdmVyeSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmRlbGVnYXRlLm9uKG5hbWUsIGxpc3RlbmVyKTtcblx0XHR9KTtcblx0fVxuXG5cdGV4dHJhY3RNZXRhZGF0YSgpIHtcblx0XHR0aGlzLmF1ZGlvTGVuZ3RoID0gcGFyc2VJbnQodGhpcy5hdWRpby5kdXJhdGlvbiwgMTApO1xuXHR9XG5cblx0ZXZlbnRMaXN0ZW5lciAoZXYpIHtcblx0XHRjb25zdCBwcm9ncmVzcyA9IHBhcnNlSW50KDEwMCAqICh0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lIHx8IDApIC8gdGhpcy5hdWRpb0xlbmd0aCwgMTApO1xuXG5cdFx0aWYgKGV2LnR5cGUgIT09ICd0aW1ldXBkYXRlJykge1xuXHRcdFx0cmV0dXJuIGZpcmVFdmVudChldi50eXBlLCB0aGlzLCB7IHByb2dyZXNzIH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHByb2dyZXNzUG9pbnQgPSBnZXRQcm9ncmVzc1BvaW50KHByb2dyZXNzKTtcblx0XHRpZiAocHJvZ3Jlc3NQb2ludCAhPT0gdW5kZWZpbmVkICYmIHByb2dyZXNzUG9pbnQgIT09IHRoaXMubGFzdFRyYWNrZWRQcm9ncmVzc1BvaW50ICYmICF0aGlzLmF1ZGlvLnBhdXNlZCkge1xuXHRcdFx0dGhpcy5sYXN0VHJhY2tlZFByb2dyZXNzUG9pbnQgPSBwcm9ncmVzc1BvaW50O1xuXHRcdFx0Ly8gbG9nIGFzICdwcm9ncmVzcycgdG8ga2VlcCBjb25zaXN0ZW5jeSB3aXRoIG8tdmlkZW9cblx0XHRcdGZpcmVFdmVudCgncHJvZ3Jlc3MnLCB0aGlzLCB7IHByb2dyZXNzOiBwcm9ncmVzc1BvaW50IH0pO1xuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5kZWxlZ2F0ZS5kZXN0cm95KCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9UcmFja2luZztcbiIsIi8qKlxuKlxuKiBEZWJvdW5jZXMgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgYWZ0ZXIgbiBtaWxsaXNlY29uZHNcbiogd2l0aG91dCBpdCBub3QgYmVpbmcgY2FsbGVkXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLmRlYm91bmNlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIERlYm91bmNlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuLyoqXG4qXG4qIFRocm90dGxlIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbipcbiogQGV4YW1wbGVcbiogVXRpbHMudGhyb3R0bGUobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gVGhyb3R0bGVkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aW1lb3V0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0ZGVib3VuY2UsXG5cdHRocm90dGxlXG59O1xuIiwiaW1wb3J0IFRyYWNraW5nIGZyb20gJy4vdHJhY2tpbmcuanMnO1xuXG5jbGFzcyBPQXVkaW8ge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqIEBwYXJhbSB7SFRNTEF1ZGlvRWxlbWVudH0gW29BdWRpb0VsXSAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKi9cblx0Y29uc3RydWN0b3IgKG9BdWRpb0VsLCBvcHRzKSB7XG5cblx0XHRpZiAoIShvQXVkaW9FbCBpbnN0YW5jZW9mIEhUTUxBdWRpb0VsZW1lbnQpKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS53YXJuKCdvQXVkaW9FbCBzaG91bGQgYmUgYW4gaW5zdGFuY2Ugb2YgSFRNTEF1ZGlvRWxlbWVudCcpO1xuXHRcdH1cblx0XHR0aGlzLm9BdWRpb0VsID0gb0F1ZGlvRWw7XG5cdFx0dGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuXHRcdH0sIG9wdHMgfHwgT0F1ZGlvLmdldERhdGFBdHRyaWJ1dGVzKG9BdWRpb0VsKSk7XG5cblx0XHR0aGlzLnRyYWNraW5nID0gbmV3IFRyYWNraW5nKG9BdWRpb0VsLCB0aGlzLm9wdGlvbnMpO1xuXG5cdH1cblxuXHQvKipcblx0ICogRGVzdHJveSB0aGlzIGNvbXBvbmVudC4gVW5iaW5kcyBsaXN0ZW5lcnMgYW5kIGRpc3BhdGNoZXMgYW55IGZpbmFsIHRyYWNraW5nIGV2ZW50c1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy50cmFja2luZy5kZXN0cm95KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgT0F1ZGlvRWxlbWVudC4gSWYgdGhlIG1lc3NhZ2UgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb0F1ZGlvRWwgLSBUaGUgY29tcG9uZW50IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSAtIERhdGEgYXR0cmlidXRlcyBhcyBhbiBvYmplY3Rcblx0ICovXG5cdHN0YXRpYyBnZXREYXRhQXR0cmlidXRlcyAob0F1ZGlvRWwpIHtcblx0XHRpZiAoIShvQXVkaW9FbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMob0F1ZGlvRWwuZGF0YXNldCkucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcblxuXHRcdFx0Ly8gSWdub3JlIGRhdGEtby1jb21wb25lbnRcblx0XHRcdGlmIChrZXkgPT09ICdvQ29tcG9uZW50Jykge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnVpbGQgYSBjb25jaXNlIGtleSBhbmQgZ2V0IHRoZSBvcHRpb24gdmFsdWVcblx0XHRcdGNvbnN0IHNob3J0S2V5ID0ga2V5LnJlcGxhY2UoL15vQXVkaW8odykodyspJC8sIChtLCBtMSwgbTIpID0+IG0xLnRvTG93ZXJDYXNlKCkgKyBtMik7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IG9BdWRpb0VsLmRhdGFzZXRba2V5XTtcblxuXHRcdFx0Ly8gVHJ5IHBhcnNpbmcgdGhlIHZhbHVlIGFzIEpTT04sIG90aGVyd2lzZSBqdXN0IHNldCBpdCBhcyBhIHN0cmluZ1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoLycvZywgJ1wiJykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgbWVzc2FnZSBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIHRoZSBjb21wb25lbnQgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKiBAcmV0dXJucyB7KE9BdWRpb3xBcnJheTxPQXVkaW8+KX0gLSBPQXVkaW8gaW5zdGFuY2Uocylcblx0ICovXG5cdHN0YXRpYyBpbml0IChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXHRcdGlmIChyb290RWwgaW5zdGFuY2VvZiBIVE1MQXVkaW9FbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLWF1ZGlvXScpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE9BdWRpbyhyb290RWwsIG9wdHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gQXJyYXkuZnJvbShyb290RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLWF1ZGlvXCJdJyksIHJvb3RFbCA9PiBuZXcgT0F1ZGlvKHJvb3RFbCwgb3B0cykpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9BdWRpbzsiLCJpbXBvcnQgb0F1ZGlvIGZyb20gJy4vc3JjL2pzL28tYXVkaW8uanMnO1xuaW1wb3J0IFRyYWNraW5nIGZyb20gJy4vc3JjL2pzL3RyYWNraW5nLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24gKCkge1xuXHRvQXVkaW8uaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgb0F1ZGlvO1xuXG5leHBvcnQgeyBUcmFja2luZyB9OyIsImltcG9ydCAnLi8uLi8uLi9tYWluLmpzJztcblxuZnVuY3Rpb24gaW5pdERlbW9zKCkge1xuXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29UcmFja2luZy5ldmVudCcsICh7ZGV0YWlsfSkgPT4ge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0Y29uc29sZS5sb2coXG5cdFx0XHRgJWNSZWNlaXZlZCBvVHJhY2tpbmcgJHtkZXRhaWwuY2F0ZWdvcnl9IGV2ZW50ICVjJHtkZXRhaWwuYWN0aW9ufWAsXG5cdFx0XHQnY29sb3I6IGdyZWVuJywnY29sb3I6IGJsdWUnLFxuXHRcdFx0ZGV0YWlsXG5cdFx0KTtcblx0fSk7XG5cblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG5cdH0pO1xufVxuXG5pbml0RGVtb3MoKTsiXX0=