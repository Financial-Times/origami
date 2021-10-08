function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
  }); // src/js/overlay.js


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
  }

  function throttle(func, wait) {
    var timeout;
    return function () {
      var _this2 = this;

      if (timeout) {
        return;
      }

      var args = arguments;

      var later = function later() {
        timeout = null;
        func.apply(_this2, args);
      };

      timeout = setTimeout(later, wait);
    };
  } // ../o-viewport/src/utils.js


  var _debug;

  function broadcast(eventType, data, target) {
    target = target || document.body;

    if (_debug) {
      console.log("o-viewport", eventType, data);
    }

    target.dispatchEvent(new CustomEvent("oViewport." + eventType, {
      detail: data,
      bubbles: true
    }));
  }

  function getHeight(ignoreScrollbars) {
    return ignoreScrollbars ? document.documentElement.clientHeight : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  function getWidth(ignoreScrollbars) {
    return ignoreScrollbars ? document.documentElement.clientWidth : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  function getSize(ignoreScrollbars) {
    return {
      height: getHeight(ignoreScrollbars),
      width: getWidth(ignoreScrollbars)
    };
  }

  function getScrollPosition() {
    return {
      height: document.body.scrollHeight,
      width: document.body.scrollWidth,
      left: window.pageXOffset || window.scrollX,
      top: window.pageYOffset || window.scrollY
    };
  }

  function getOrientation() {
    var orientation = window.screen.orientation;

    if (orientation) {
      return typeof orientation === "string" ? orientation.split("-")[0] : orientation.type.split("-")[0];
    } else if (window.matchMedia) {
      return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
    } else {
      return getHeight() >= getWidth() ? "portrait" : "landscape";
    }
  }

  function getVisibility() {
    return document.hidden;
  }

  var utils_default = {
    debug: function debug() {
      _debug = true;
    },
    broadcast: broadcast,
    getWidth: getWidth,
    getHeight: getHeight,
    getSize: getSize,
    getScrollPosition: getScrollPosition,
    getVisibility: getVisibility,
    getOrientation: getOrientation,
    debounce: debounce,
    throttle: throttle
  }; // ../o-viewport/main.js

  var throttle2 = utils_default.throttle;
  var debounce2 = utils_default.debounce;
  var listeners = {};
  var intervals = {
    resize: 100,
    orientation: 100,
    visibility: 100,
    scroll: 100
  };

  function setThrottleInterval(eventType, interval) {
    if (typeof arguments[0] === "number") {
      setThrottleInterval("scroll", arguments[0]);
      setThrottleInterval("resize", arguments[1]);
      setThrottleInterval("orientation", arguments[2]);
      setThrottleInterval("visibility", arguments[3]);
    } else if (interval) {
      intervals[eventType] = interval;
    }
  }

  function listenToResize() {
    if (listeners.resize) {
      return;
    }

    var eventType = "resize";
    var handler = debounce2(function (ev) {
      utils_default.broadcast("resize", {
        viewport: utils_default.getSize(),
        originalEvent: ev
      });
    }, intervals.resize);
    window.addEventListener(eventType, handler);
    listeners.resize = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenToOrientation() {
    if (listeners.orientation) {
      return;
    }

    var eventType = "orientationchange";
    var handler = debounce2(function (ev) {
      utils_default.broadcast("orientation", {
        viewport: utils_default.getSize(),
        orientation: utils_default.getOrientation(),
        originalEvent: ev
      });
    }, intervals.orientation);
    window.addEventListener(eventType, handler);
    listeners.orientation = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenToVisibility() {
    if (listeners.visibility) {
      return;
    }

    var eventType = "visibilitychange";
    var handler = debounce2(function (ev) {
      utils_default.broadcast("visibility", {
        hidden: utils_default.getVisibility(),
        originalEvent: ev
      });
    }, intervals.visibility);
    window.addEventListener(eventType, handler);
    listeners.visibility = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenToScroll() {
    if (listeners.scroll) {
      return;
    }

    var eventType = "scroll";
    var handler = throttle2(function (ev) {
      var scrollPos = utils_default.getScrollPosition();
      utils_default.broadcast("scroll", {
        viewport: utils_default.getSize(),
        scrollHeight: scrollPos.height,
        scrollLeft: scrollPos.left,
        scrollTop: scrollPos.top,
        scrollWidth: scrollPos.width,
        originalEvent: ev
      });
    }, intervals.scroll);
    window.addEventListener(eventType, handler);
    listeners.scroll = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenTo(eventType) {
    if (eventType === "resize" || eventType === "all") {
      listenToResize();
    }

    if (eventType === "scroll" || eventType === "all") {
      listenToScroll();
    }

    if (eventType === "orientation" || eventType === "all") {
      listenToOrientation();
    }

    if (eventType === "visibility" || eventType === "all") {
      listenToVisibility();
    }
  }

  function stopListeningTo(eventType) {
    if (eventType === "all") {
      Object.keys(listeners).forEach(stopListeningTo);
    } else if (listeners[eventType]) {
      window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);
      delete listeners[eventType];
    }
  }

  var main_default = {
    debug: function debug() {
      utils_default.debug();
    },
    listenTo: listenTo,
    stopListeningTo: stopListeningTo,
    setThrottleInterval: setThrottleInterval,
    getOrientation: utils_default.getOrientation,
    getSize: utils_default.getSize,
    getScrollPosition: utils_default.getScrollPosition,
    getVisibility: utils_default.getVisibility
  }; // src/js/utils.js

  var utils_default2 = {
    unCapitalise: function unCapitalise(str) {
      return str.charAt(0).toLowerCase() + str.substr(1);
    },
    capitalise: function capitalise(str) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    },
    copyContentFromElement: function copyContentFromElement(content, callback) {
      var html = content.nodeName === "SCRIPT" ? content.innerHTML : content.outerHTML;
      callback(html);
    },
    copyContentFromUrl: function copyContentFromUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);

      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(xhr.responseText);
          } else {
            callback("Content failed to load correctly");
          }
        }
      };

      xhr.onerror = function (e) {
        throw new Error('"o-overlay error": Fetching content from ' + url + " failed with errror " + e);
      };

      xhr.send(null);
    },
    optionsFromKey: function optionsFromKey(key, value, opts) {
      var dashIndex = key.indexOf("-");

      if (dashIndex === -1) {
        try {
          opts[key] = JSON.parse(value.replace(/\'/g, '"'));
        } catch (e) {
          opts[key] = value;
        }
      } else {
        var subKey = key.substr(0, dashIndex);

        if (!opts[subKey]) {
          opts[subKey] = {};
        }

        opts[subKey] = this.optionsFromKey(key.substr(dashIndex + 1), value, opts[subKey]);
      }

      return opts;
    },
    getOffsetRect: function getOffsetRect(e) {
      var eClientRect = e.getBoundingClientRect();
      var body = document.body;
      var docElem = document.documentElement;
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      return {
        width: eClientRect.width || eClientRect.right - eClientRect.left,
        height: eClientRect.height || eClientRect.bottom - eClientRect.top,
        top: eClientRect.top + scrollTop - clientTop,
        left: eClientRect.left + scrollLeft - clientLeft
      };
    }
  }; // src/js/overlay.js

  var overlays = {};

  var checkOptions = function checkOptions(opts) {
    if (opts.trigger && !(opts.trigger instanceof HTMLElement)) {
      opts.trigger = document.querySelector(opts.trigger);
    }

    if (opts.heading && (!opts.heading.title || !opts.heading.title.trim())) {
      throw new Error('"o-overlay error": To have a heading, a non-empty title needs to be set');
    }

    if (typeof opts.modal === "undefined") {
      opts.modal = true;
    }

    if (typeof opts.layer === "undefined") {
      opts.layer = true;
    }

    if (opts.compact && opts.heading && opts.heading.shaded) {
      throw new Error("\"o-overlay error\": Compact overlays can't have a shaded header");
    }

    return opts;
  };

  var getOptionsFromTrigger = function getOptionsFromTrigger(trigger) {
    var opts = {};

    if (trigger instanceof HTMLElement) {
      Array.prototype.forEach.call(trigger.attributes, function (attr) {
        if (attr.name.indexOf("data-o-overlay") === 0) {
          var key = attr.name.replace("data-o-overlay-", "");
          opts = utils_default2.optionsFromKey(key, attr.value, opts);
        }
      });
      opts.trigger = trigger;
    }

    return opts;
  };

  var triggerClickHandler = function triggerClickHandler(id, ev) {
    ev.stopPropagation();
    var overlay = overlays[id];

    if (overlay) {
      if (overlay.visible === true) {
        overlay.close();
      } else {
        overlay.open();
      }
    }
  };

  var isVisible = function isVisible(element) {
    return Boolean(element.offsetHeight);
  };

  var focusTrap = function focusTrap(event) {
    var tabKeyCode = 9;
    var overlayFocusableElements = [].slice.call(this.wrapper.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (element) {
      var elementVisible = isVisible(element);
      var elementLabelVisible = element.labels && [].slice.call(element.labels).some(function (l) {
        return isVisible(l);
      });
      var elementIsUncheckedRadio = element.type === "radio" && element.checked !== true;
      return !element.disabled && !elementIsUncheckedRadio && (elementVisible || elementLabelVisible);
    });

    if (overlayFocusableElements.length && event.keyCode === tabKeyCode) {
      var lastElement = overlayFocusableElements[overlayFocusableElements.length - 1];

      if (event.target === lastElement) {
        overlayFocusableElements[0].focus();
        event.preventDefault();
      } else if (event.shiftKey && event.target === overlayFocusableElements[0]) {
        lastElement.focus();
        event.preventDefault();
      }
    }
  };

  var Overlay = /*#__PURE__*/function () {
    "use strict";

    function Overlay(id, opts) {
      _classCallCheck(this, Overlay);

      if (overlays[id]) {
        throw new Error("o-overlay with id \"".concat(id, "\" already exists. Creating an overlay twice with the same id may result in unexpected behaviour."));
      }

      main_default.listenTo("resize");
      this.visible = false;
      this.id = id;

      try {
        this.opts = checkOptions(opts);
      } catch (e) {
        this.broadcast("log", "oErrors", {
          error: e
        });
        throw e;
      }

      if (!this.opts) {
        var noOptError = new Error('"o-overlay error": Required options have not been set');
        this.broadcast("log", "oErrors", {
          error: noOptError
        });
        throw noOptError;
      }

      if (this.opts.trigger) {
        this.opts.trigger.addEventListener("click", triggerClickHandler.bind(this.opts.trigger, id), false);
        this.context = document.body;
      } else {
        if (document.querySelector(this.opts.parentnode)) {
          this.context = document.querySelector(this.opts.parentnode);
        } else {
          this.context = document.body;
        }
      }

      this.delegates = {
        doc: new import_ftdomdelegate.default(),
        wrap: new import_ftdomdelegate.default(),
        context: new import_ftdomdelegate.default()
      };
      overlays[id] = this;
    }

    _createClass(Overlay, [{
      key: "open",
      value: function open() {
        if (this.opts.modal || this.opts.fullscreen) {
          this.originalOverflow = document.documentElement.style.overflow;
          document.documentElement.style.overflow = "hidden";
        }

        if (window.history.pushState && this.opts.fullscreen) {
          window.history.pushState(_defineProperty({}, "o-overlay-".concat(this.id), "fullscreen"), window.location.href);

          this.popstateHandler = function () {
            if (window.history.state && window.history.state["o-overlay-".concat(this.id)]) {
              this.close();
            }
          }.bind(this);

          window.addEventListener("popstate", this.popstateHandler);
        }

        if (this.opts.trigger) {
          this.opts.trigger.setAttribute("aria-pressed", "true");
        }

        if (!this.content) {
          var overlay = this;
          this.loadContent(function (html) {
            overlay.opts.html = html;

            if (!overlay.opts.html) {
              throw new Error('"o-overlay error": Content for the overlay needs to be set via the "html" or the "src" option.');
            }

            overlay.render();
          });
        } else {
          this.show();
        }
      }
    }, {
      key: "loadContent",
      value: function loadContent(callback) {
        if (!this.opts.html && this.opts.src) {
          if (/^(https?\:\/)?\//.test(this.opts.src)) {
            utils_default2.copyContentFromUrl(this.opts.src, function (html) {
              callback(html);
            });
          } else {
            utils_default2.copyContentFromElement(document.querySelector(this.opts.src), function (html) {
              callback(html);
            });
          }
        } else {
          callback(this.opts.html);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var wrapperEl = document.createElement("div");
        wrapperEl.className = "o-overlay";
        wrapperEl.classList.add("o-overlay--" + this.id.replace(" ", "-"));

        if (this.opts.class) {
          try {
            var _wrapperEl$classList;

            (_wrapperEl$classList = wrapperEl.classList).add.apply(_wrapperEl$classList, _toConsumableArray(this.opts.class.split(" ")));
          } catch (error) {
            console.warn("Could not add the classes: ".concat(this.opts.class));
          }
        }

        if (this.opts.fullscreen) {
          wrapperEl.classList.add("o-overlay--full-screen");
        }

        wrapperEl.setAttribute("role", "dialog");

        if (this.opts.zindex) {
          wrapperEl.style.zIndex = this.opts.zindex;
        }

        this.wrapper = wrapperEl;

        if (this.opts.heading) {
          var heading = document.createElement("header");
          var headingId = this.opts.heading.title.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/[\s-]+/g, "-");
          heading.classList.add("o-overlay__heading");
          heading.setAttribute("id", headingId);
          wrapperEl.setAttribute("aria-labelledby", headingId);

          if (this.opts.heading.shaded) {
            heading.classList.add("o-overlay__heading--shaded");
          }

          if (!this.opts.preventclosing) {
            var button = document.createElement("button");
            button.className = "o-overlay__close";
            button.setAttribute("aria-label", "Close");
            button.setAttribute("title", "Close");

            if (!this.opts.nofocus) {
              button.setAttribute("tabindex", "0");
            }

            heading.appendChild(button);
          }

          var title = document.createElement("span");
          title.setAttribute("role", "heading");
          title.className = "o-overlay__title";

          if (!this.opts.heading.visuallyhidetitle) {
            title.innerHTML = this.opts.heading.title;
          }

          heading.appendChild(title);
          wrapperEl.appendChild(heading);
        }

        if (this.opts.tooltip) {
          var _button = document.createElement("a");

          _button.className = "o-overlay__close";

          _button.setAttribute("role", "button");

          _button.setAttribute("href", "#void");

          _button.setAttribute("aria-label", "Close");

          _button.setAttribute("title", "Close");

          if (!this.opts.nofocus) {
            _button.setAttribute("tabindex", "0");
          }

          wrapperEl.appendChild(_button);
          wrapperEl.classList.add("o-overlay--compact");
        }

        var content = document.createElement("section");
        content.className = "o-overlay__content";
        wrapperEl.appendChild(content);
        this.content = content;

        if (this.opts.compact) {
          wrapperEl.classList.add("o-overlay--compact");
        }

        this.show();
      }
    }, {
      key: "_trapFocus",
      value: function _trapFocus() {
        document.addEventListener("keydown", focusTrap.bind(this));
      }
    }, {
      key: "show",
      value: function show() {
        if (this.opts.modal) {
          this.wrapper.classList.add("o-overlay--modal");
          var shadow = document.createElement("div");
          shadow.className = "o-overlay-shadow";
          this.shadow = shadow;

          if (this.opts.zindex) {
            shadow.style.zIndex = this.opts.zindex - 1;
          }

          document.body.appendChild(shadow);
        }

        this.delegates.doc.root(document.body);
        this.delegates.wrap.root(this.wrapper);
        this.delegates.context.root(this.context);
        this.closeHandler = this.close.bind(this);

        if (!this.opts.nested) {
          this.resizeListenerHandler = this.resizeListener.bind(this);
          this.delegates.doc.on("oViewport.resize", "body", this.resizeListenerHandler);
          this.closeOnEscapePressHandler = this.closeOnEscapePress.bind(this);
          this.delegates.doc.on("keyup", this.closeOnEscapePressHandler);
        }

        if (this.opts.layer) {
          this.closeOnNewLayerHandler = this.closeOnNewLayer.bind(this);
          this.delegates.context.on("oOverlay.layerOpen", this.closeOnNewLayerHandler);
          this.broadcast("layerOpen");
        }

        if (this.opts.heading || this.opts.tooltip || this.opts.customclose) {
          this.delegates.wrap.on("click", ".o-overlay__close", this.closeHandler);
          this.delegates.wrap.on("touchend", ".o-overlay__close", this.closeHandler);
        }

        this.closeOnExternalClickHandler = this.closeOnExternalClick.bind(this);
        this.delegates.doc.on("click", "body", this.closeOnExternalClickHandler);
        this.delegates.doc.on("touchend", "body", this.closeOnExternalClickHandler);
        this.context.appendChild(this.wrapper);

        if (!this.opts.nofocus) {
          this.wrapper.setAttribute("tabindex", "0");
          this.wrapper.style.outline = 0;
        }

        window.requestAnimationFrame(function () {
          if (!this.content.innerHTML) {
            if (typeof this.opts.html === "string") {
              this.content.innerHTML = this.opts.html;
            } else {
              this.content.appendChild(this.opts.html);
            }
          }

          this.width = this.getWidth();
          this.height = this.getHeight();

          if (!this.opts.nested) {
            this.realign();
          }

          this.visible = true;
          this.wrapper.focus();
          this.broadcast("ready", "oOverlay", {
            instance: this
          });
          this.broadcast("event", "oTracking", {
            category: "overlay",
            action: "show",
            overlay_id: this.id
          });

          this._trapFocus();
        }.bind(this));
      }
    }, {
      key: "close",
      value: function close() {
        this.delegates.doc.destroy();
        this.delegates.wrap.destroy();
        this.delegates.context.destroy();

        if (this.opts.modal || this.opts.fullscreen) {
          document.documentElement.style.overflow = this.originalOverflow;
        }

        if (this.opts.fullscreen) {
          window.removeEventListener("popstate", this.popstateHandler);
        }

        if (window.history.pushState && window.history.state && window.history.state["o-overlay-".concat(this.id)] === "fullscreen") {
          window.history.back();
        }

        main_default.stopListeningTo("resize");
        this.broadcast("destroy");
        this.broadcast("event", "oTracking", {
          category: "overlay",
          action: "close",
          overlay_id: this.id
        });
        this.context.removeChild(this.wrapper);

        if (this.opts.modal) {
          this.shadow.parentNode.removeChild(this.shadow);
        }

        if (this.opts.trigger) {
          this.opts.trigger.focus();
          this.opts.trigger.setAttribute("aria-pressed", "false");
        }

        document.removeEventListener("keydown", focusTrap);
        this.visible = false;

        if (this.opts.layer) {
          this.broadcast("layerClose");
        }

        return false;
      }
    }, {
      key: "closeOnExternalClick",
      value: function closeOnExternalClick(ev) {
        if (!this.wrapper.contains(ev.target) && !this.opts.modal && this.opts.trigger && !this.opts.trigger.contains(ev.target)) {
          this.close();
        }
      }
    }, {
      key: "closeOnEscapePress",
      value: function closeOnEscapePress(ev) {
        if (!this.opts.preventclosing && ev.keyCode === 27) {
          this.close();
        }
      }
    }, {
      key: "closeOnNewLayer",
      value: function closeOnNewLayer(ev) {
        if (!ev.detail || ev.detail.el !== this) {
          this.close();
        }
      }
    }, {
      key: "resizeListener",
      value: function resizeListener(ev) {
        if (!this.wrapper.contains(ev.target)) {
          this.respondToWindow();
        }
      }
    }, {
      key: "broadcast",
      value: function broadcast(eventType, namespace, detail) {
        namespace = namespace || "oOverlay";
        var isLayerEvent = eventType === "layerOpen" || eventType === "layerClose";
        var target = isLayerEvent ? this.context : this.wrapper || document.body;
        detail = detail || {};

        if (namespace !== "oTracking") {
          detail.el = this;
        }

        target.dispatchEvent(new CustomEvent(namespace + "." + eventType, {
          detail: detail,
          bubbles: true
        }));
      }
    }, {
      key: "realign",
      value: function realign(dimension, size) {
        if (!dimension && !size) {
          this._align("width", main_default.getSize().width);

          this._align("height", main_default.getSize().height);

          return;
        }

        if (dimension && !size) {
          this._align(dimension, main_default.getSize()["dimension"]);

          return;
        }

        this._align(dimension, size);
      }
    }, {
      key: "_align",
      value: function _align(dimension, size) {
        if (dimension !== "width" && dimension !== "height") {
          throw new Error("Can not realign the overlay for the dimension \"".concat(dimension, "\". \"height\" or \"width\" expected."));
        }

        if (isNaN(size)) {
          throw new Error("Can not realign the overlay for the size ".concat(size, ". A number is expected."));
        }

        var edge = dimension === "width" ? "left" : "top";
        this.width = this.getWidth();
        this.height = this.getHeight();

        if (size <= this[dimension]) {
          this.wrapper.classList.add("o-overlay--full-" + dimension);
          this.wrapper.style[edge] = "0";
          this.wrapper.style["margin" + utils_default2.capitalise(edge)] = 0;

          if (dimension === "height") {
            var borderHeight = this.wrapper.offsetHeight - this.wrapper.clientHeight;
            this.content.style.height = this.wrapper.offsetHeight - (this.opts.heading ? this.wrapper.querySelector("header").offsetHeight : 0) - borderHeight + "px";
          }
        } else {
          if (dimension === "height") {
            this.content.style.height = null;
          }

          this.wrapper.classList.remove("o-overlay--full-" + dimension);
          this.wrapper.style["margin" + utils_default2.capitalise(edge)] = -(this.wrapper["offset" + utils_default2.capitalise(dimension)] / 2) + "px";
          this.wrapper.style[edge] = "50%";
        }
      }
    }, {
      key: "respondToWindow",
      value: function respondToWindow() {
        this.realign();
      }
    }, {
      key: "fills",
      value: function fills(dimension) {
        return this.wrapper.classList.contains("o-overlay--full-" + dimension);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.visible === true) {
          this.close();
        }

        if (this.opts.trigger) {
          this.opts.trigger.removeEventListener("click", triggerClickHandler);
        }

        delete overlays[this.id];
      }
    }, {
      key: "getHeight",
      value: function getHeight() {
        var borderHeight = this.wrapper.offsetHeight - this.wrapper.clientHeight;
        return this.content.scrollHeight + (this.opts.heading ? this.wrapper.querySelector("header").offsetHeight : 0) + borderHeight;
      }
    }, {
      key: "getWidth",
      value: function getWidth() {
        var borderWidth = this.wrapper.offsetWidth - this.wrapper.clientWidth;
        return this.content.scrollWidth + borderWidth;
      }
    }], [{
      key: "init",
      value: function init(el) {
        if (!el) {
          el = document.body;
        }

        if (!(el instanceof HTMLElement)) {
          el = document.querySelector(el);
        }

        var triggers = el.querySelectorAll(".o-overlay-trigger");
        var overlaysArray = [];

        for (var t = 0; t < triggers.length; t++) {
          if (!overlays[triggers[t].getAttribute("data-o-overlay-id")]) {
            overlaysArray.push(new Overlay(triggers[t].getAttribute("data-o-overlay-id"), getOptionsFromTrigger(triggers[t])));
          }
        }

        return overlaysArray;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var overlayIds = Object.keys(overlays);
        overlayIds.forEach(function (id) {
          overlays[id].destroy();
        });
      }
    }, {
      key: "getOverlays",
      value: function getOverlays() {
        return overlays;
      }
    }]);

    return Overlay;
  }();

  var overlay_default = Overlay; // main.js

  var constructAll = function constructAll() {
    overlay_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvb3ZlcmxheS5qcyIsIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsInNyYy9qcy91dGlscy5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxlQUFBLEdBQUEsVUFBQSxDQUFBO0FBQUEsaURBQUEsOENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtBQUFBOztBQUVBLE1BQUEsTUFBQSxDQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsUUFBQSxLQUFBLEVBQU87QUFEb0MsT0FBN0M7QUFHQSxNQUFBLE9BQUEsQ0FBUSxPQUFSLEdBQWtCLEtBQUEsQ0FBbEI7O0FBWUEsZUFBQSxTQUFBLENBQWtCLElBQWxCLEVBQXdCO0FBT3RCLGFBQUssV0FBTCxHQUFtQixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQW5COztBQUVBLFlBQUksSUFBSixFQUFVO0FBQ1IsZUFBSyxJQUFMLENBQVUsSUFBVjtBQUFVOztBQUtaLGFBQUssTUFBTCxHQUFjLFNBQUEsQ0FBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQWQ7QUFFQSxhQUFLLGlCQUFMLEdBQXlCLEVBQXpCO0FBQXlCOztBQVczQixNQUFBLFNBQUEsQ0FBUyxTQUFULENBQW1CLElBQW5CLEdBQTBCLFVBQVUsSUFBVixFQUFnQjtBQUN4QyxZQUFJLFdBQUEsR0FBYyxLQUFLLFdBQXZCO0FBQ0EsWUFBSSxTQUFKOztBQUVBLFlB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QUEsR0FBYSxNQUFBLENBQU8sSUFBUCxDQUFZLFFBQVosQ0FBbkI7QUFDQSxRQUFBLFVBQUEsQ0FBVyxPQUFYLENBQW1CLFVBQVUsRUFBVixFQUFjO0FBQ2hDLFVBQUEsUUFBQSxDQUFTLEVBQVQsQ0FBQSxDQUFhLE9BQWI7QUFBYSxTQURkO0FBQ2M7QUE1a0JoQjtBQUFBO0FBQUEsYUE0a0JnQix1QkFJTTtBQUNwQixlQUFPLFFBQVA7QUFBTztBQWpsQlQ7O0FBQUE7QUFBQSxLQUFBOztBQXFsQkEsTUFBTyxlQUFBLEdBQVEsT0FBZixDOztBSzlyQkEsTUFBTSxZQUFBLEdBQWUsU0FBZixZQUFlLEdBQVc7QUFDL0IsSUFBQSxlQUFBLENBQVEsSUFBUjtBQUNBLElBQUEsUUFBQSxDQUFTLG1CQUFULENBQTZCLG9CQUE3QixFQUFtRCxZQUFuRDtBQUFtRCxHQUZwRDs7QUFLQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsRUFBZ0QsWUFBaEQsRTs7QUNOQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN6RCxJQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQUksV0FBSixDQUFnQixvQkFBaEIsQ0FBdkI7QUFBdUMsR0FEeEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxuLyoqXG4gKiBET00gZXZlbnQgZGVsZWdhdG9yXG4gKlxuICogVGhlIGRlbGVnYXRvciB3aWxsIGxpc3RlblxuICogZm9yIGV2ZW50cyB0aGF0IGJ1YmJsZSB1cFxuICogdG8gdGhlIHJvb3Qgbm9kZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqL1xuZnVuY3Rpb24gRGVsZWdhdGUocm9vdCkge1xuICAvKipcbiAgICogTWFpbnRhaW4gYSBtYXAgb2YgbGlzdGVuZXJcbiAgICogbGlzdHMsIGtleWVkIGJ5IGV2ZW50IG5hbWUuXG4gICAqXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgdGhpcy5saXN0ZW5lck1hcCA9IFt7fSwge31dO1xuXG4gIGlmIChyb290KSB7XG4gICAgdGhpcy5yb290KHJvb3QpO1xuICB9XG4gIC8qKiBAdHlwZSBmdW5jdGlvbigpICovXG5cblxuICB0aGlzLmhhbmRsZSA9IERlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUuYmluZCh0aGlzKTsgLy8gQ2FjaGUgb2YgZXZlbnQgbGlzdGVuZXJzIHJlbW92ZWQgZHVyaW5nIGFuIGV2ZW50IGN5Y2xlXG5cbiAgdGhpcy5fcmVtb3ZlZExpc3RlbmVycyA9IFtdO1xufVxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuICogb24gdGhlIHByb3ZpZGVkIERPTSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHZhciBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXA7XG4gIHZhciBldmVudFR5cGU7IC8vIFJlbW92ZSBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG5cbiAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFsxXSkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwWzFdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzBdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBJZiBubyByb290IG9yIHJvb3QgaXMgbm90XG4gIC8vIGEgZG9tIG5vZGUsIHRoZW4gcmVtb3ZlIGludGVybmFsXG4gIC8vIHJvb3QgcmVmZXJlbmNlIGFuZCBleGl0IGhlcmVcblxuXG4gIGlmICghcm9vdCB8fCAhcm9vdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgcm9vdCBub2RlIGF0IHdoaWNoXG4gICAqIGxpc3RlbmVycyBhcmUgYXR0YWNoZWQuXG4gICAqXG4gICAqIEB0eXBlIE5vZGVcbiAgICovXG5cblxuICB0aGlzLnJvb3RFbGVtZW50ID0gcm9vdDsgLy8gU2V0IHVwIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcblxuICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFsxXSkge1xuICAgIGlmIChsaXN0ZW5lck1hcFsxXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5jYXB0dXJlRm9yVHlwZSA9IGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgcmV0dXJuIFsnYmx1cicsICdlcnJvcicsICdmb2N1cycsICdsb2FkJywgJ3Jlc2l6ZScsICdzY3JvbGwnXS5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xO1xufTtcbi8qKlxuICogQXR0YWNoIGEgaGFuZGxlciB0byBvbmVcbiAqIGV2ZW50IGZvciBhbGwgZWxlbWVudHNcbiAqIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yLFxuICogbm93IG9yIGluIHRoZSBmdXR1cmVcbiAqXG4gKiBUaGUgaGFuZGxlciBmdW5jdGlvbiByZWNlaXZlc1xuICogdGhyZWUgYXJndW1lbnRzOiB0aGUgRE9NIGV2ZW50XG4gKiBvYmplY3QsIHRoZSBub2RlIHRoYXQgbWF0Y2hlZFxuICogdGhlIHNlbGVjdG9yIHdoaWxlIHRoZSBldmVudFxuICogd2FzIGJ1YmJsaW5nIGFuZCBhIHJlZmVyZW5jZVxuICogdG8gaXRzZWxmLiBXaXRoaW4gdGhlIGhhbmRsZXIsXG4gKiAndGhpcycgaXMgZXF1YWwgdG8gdGhlIHNlY29uZFxuICogYXJndW1lbnQuXG4gKlxuICogVGhlIG5vZGUgdGhhdCBhY3R1YWxseSByZWNlaXZlZFxuICogdGhlIGV2ZW50IGNhbiBiZSBhY2Nlc3NlZCB2aWFcbiAqICdldmVudC50YXJnZXQnLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgTGlzdGVuIGZvciB0aGVzZSBldmVudHNcbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gc2VsZWN0b3IgT25seSBoYW5kbGUgZXZlbnRzIG9uIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3IsIGlmIHVuZGVmaW5lZCBtYXRjaCByb290IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gaGFuZGxlciBIYW5kbGVyIGZ1bmN0aW9uIC0gZXZlbnQgZGF0YSBwYXNzZWQgaGVyZSB3aWxsIGJlIGluIGV2ZW50LmRhdGFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3VzZUNhcHR1cmVdIHNlZSAndXNlQ2FwdHVyZScgaW4gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyPlxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gIHZhciByb290O1xuICB2YXIgbGlzdGVuZXJNYXA7XG4gIHZhciBtYXRjaGVyO1xuICB2YXIgbWF0Y2hlclBhcmFtO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBldmVudCB0eXBlOiAnICsgZXZlbnRUeXBlKTtcbiAgfSAvLyBoYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuXG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZUNhcHR1cmUgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IG51bGw7XG4gIH0gLy8gRmFsbGJhY2sgdG8gc2Vuc2libGUgZGVmYXVsdHNcbiAgLy8gaWYgdXNlQ2FwdHVyZSBub3Qgc2V0XG5cblxuICBpZiAodXNlQ2FwdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdXNlQ2FwdHVyZSA9IHRoaXMuY2FwdHVyZUZvclR5cGUoZXZlbnRUeXBlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhbmRsZXIgbXVzdCBiZSBhIHR5cGUgb2YgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXBbdXNlQ2FwdHVyZSA/IDEgOiAwXTsgLy8gQWRkIG1hc3RlciBoYW5kbGVyIGZvciB0eXBlIGlmIG5vdCBjcmVhdGVkIHlldFxuXG4gIGlmICghbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSkge1xuICAgIGlmIChyb290KSB7XG4gICAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuXG4gICAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSA9IFtdO1xuICB9XG5cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIG1hdGNoZXJQYXJhbSA9IG51bGw7IC8vIENPTVBMRVggLSBtYXRjaGVzUm9vdCBuZWVkcyB0byBoYXZlIGFjY2VzcyB0b1xuICAgIC8vIHRoaXMucm9vdEVsZW1lbnQsIHNvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvIHRoaXMuXG5cbiAgICBtYXRjaGVyID0gbWF0Y2hlc1Jvb3QuYmluZCh0aGlzKTsgLy8gQ29tcGlsZSBhIG1hdGNoZXIgZm9yIHRoZSBnaXZlbiBzZWxlY3RvclxuICB9IGVsc2UgaWYgKC9eW2Etel0rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3I7XG4gICAgbWF0Y2hlciA9IG1hdGNoZXNUYWc7XG4gIH0gZWxzZSBpZiAoL14jW2EtejAtOVxcLV9dKyQvaS50ZXN0KHNlbGVjdG9yKSkge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yLnNsaWNlKDEpO1xuICAgIG1hdGNoZXIgPSBtYXRjaGVzSWQ7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3I7XG4gICAgbWF0Y2hlciA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXM7XG4gIH0gLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGxpc3RlbmVyc1xuXG5cbiAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXS5wdXNoKHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICBtYXRjaGVyOiBtYXRjaGVyLFxuICAgIG1hdGNoZXJQYXJhbTogbWF0Y2hlclBhcmFtXG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIFJlbW92ZSBhbiBldmVudCBoYW5kbGVyXG4gKiBmb3IgZWxlbWVudHMgdGhhdCBtYXRjaFxuICogdGhlIHNlbGVjdG9yLCBmb3JldmVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtldmVudFR5cGVdIFJlbW92ZSBoYW5kbGVycyBmb3IgZXZlbnRzIG1hdGNoaW5nIHRoaXMgdHlwZSwgY29uc2lkZXJpbmcgdGhlIG90aGVyIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIG90aGVyIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gW2hhbmRsZXJdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIHByZXZpb3VzIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgdmFyIGk7XG4gIHZhciBsaXN0ZW5lcjtcbiAgdmFyIGxpc3RlbmVyTWFwO1xuICB2YXIgbGlzdGVuZXJMaXN0O1xuICB2YXIgc2luZ2xlRXZlbnRUeXBlOyAvLyBIYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VDYXB0dXJlID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9IC8vIElmIHVzZUNhcHR1cmUgbm90IHNldCwgcmVtb3ZlXG4gIC8vIGFsbCBldmVudCBsaXN0ZW5lcnNcblxuXG4gIGlmICh1c2VDYXB0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLm9mZihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB0cnVlKTtcbiAgICB0aGlzLm9mZihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXBbdXNlQ2FwdHVyZSA/IDEgOiAwXTtcblxuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIGZvciAoc2luZ2xlRXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoc2luZ2xlRXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLm9mZihzaW5nbGVFdmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG5cbiAgaWYgKCFsaXN0ZW5lckxpc3QgfHwgIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSAvLyBSZW1vdmUgb25seSBwYXJhbWV0ZXIgbWF0Y2hlc1xuICAvLyBpZiBzcGVjaWZpZWRcblxuXG4gIGZvciAoaSA9IGxpc3RlbmVyTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJMaXN0W2ldO1xuXG4gICAgaWYgKCghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGxpc3RlbmVyLnNlbGVjdG9yKSAmJiAoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gbGlzdGVuZXIuaGFuZGxlcikpIHtcbiAgICAgIHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIGxpc3RlbmVyTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9IC8vIEFsbCBsaXN0ZW5lcnMgcmVtb3ZlZFxuXG5cbiAgaWYgKCFsaXN0ZW5lckxpc3QubGVuZ3RoKSB7XG4gICAgZGVsZXRlIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07IC8vIFJlbW92ZSB0aGUgbWFpbiBoYW5kbGVyXG5cbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHVzZUNhcHR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogSGFuZGxlIGFuIGFyYml0cmFyeSBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmhhbmRsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgaTtcbiAgdmFyIGw7XG4gIHZhciB0eXBlID0gZXZlbnQudHlwZTtcbiAgdmFyIHJvb3Q7XG4gIHZhciBwaGFzZTtcbiAgdmFyIGxpc3RlbmVyO1xuICB2YXIgcmV0dXJuZWQ7XG4gIHZhciBsaXN0ZW5lckxpc3QgPSBbXTtcbiAgdmFyIHRhcmdldDtcbiAgdmFyIGV2ZW50SWdub3JlID0gJ2Z0TGFic0RlbGVnYXRlSWdub3JlJztcblxuICBpZiAoZXZlbnRbZXZlbnRJZ25vcmVdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0OyAvLyBIYXJkY29kZSB2YWx1ZSBvZiBOb2RlLlRFWFRfTk9ERVxuICAvLyBhcyBub3QgZGVmaW5lZCBpbiBJRThcblxuICBpZiAodGFyZ2V0Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gIH0gLy8gSGFuZGxlIFNWRyA8dXNlPiBlbGVtZW50cyBpbiBJRVxuXG5cbiAgaWYgKHRhcmdldC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudCkge1xuICAgIHRhcmdldCA9IHRhcmdldC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudDtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICBwaGFzZSA9IGV2ZW50LmV2ZW50UGhhc2UgfHwgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCA/IDMgOiAyKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtY2FzZVxuXG4gIHN3aXRjaCAocGhhc2UpIHtcbiAgICBjYXNlIDE6XG4gICAgICAvL0V2ZW50LkNBUFRVUklOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIC8vRXZlbnQuQVRfVEFSR0VUOlxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJNYXBbMF0gJiYgdGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXSkge1xuICAgICAgICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lckxpc3QuY29uY2F0KHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFsxXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKSB7XG4gICAgICAgIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTGlzdC5jb25jYXQodGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAzOlxuICAgICAgLy9FdmVudC5CVUJCTElOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV07XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHZhciB0b0ZpcmUgPSBbXTsgLy8gTmVlZCB0byBjb250aW51b3VzbHkgY2hlY2tcbiAgLy8gdGhhdCB0aGUgc3BlY2lmaWMgbGlzdCBpc1xuICAvLyBzdGlsbCBwb3B1bGF0ZWQgaW4gY2FzZSBvbmVcbiAgLy8gb2YgdGhlIGNhbGxiYWNrcyBhY3R1YWxseVxuICAvLyBjYXVzZXMgdGhlIGxpc3QgdG8gYmUgZGVzdHJveWVkLlxuXG4gIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoO1xuXG4gIHdoaWxlICh0YXJnZXQgJiYgbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJMaXN0W2ldOyAvLyBCYWlsIGZyb20gdGhpcyBsb29wIGlmXG4gICAgICAvLyB0aGUgbGVuZ3RoIGNoYW5nZWQgYW5kXG4gICAgICAvLyBubyBtb3JlIGxpc3RlbmVycyBhcmVcbiAgICAgIC8vIGRlZmluZWQgYmV0d2VlbiBpIGFuZCBsLlxuXG4gICAgICBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgJiYgW1wiYnV0dG9uXCIsIFwiaW5wdXRcIiwgXCJzZWxlY3RcIiwgXCJ0ZXh0YXJlYVwiXS5pbmRleE9mKHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEgJiYgdGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpKSB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGluZ3MgdGhhdCBoYXZlIHByZXZpb3VzbHkgZmlyZWRcbiAgICAgICAgdG9GaXJlID0gW107XG4gICAgICB9IC8vIENoZWNrIGZvciBtYXRjaCBhbmQgZmlyZVxuICAgICAgLy8gdGhlIGV2ZW50IGlmIHRoZXJlJ3Mgb25lXG4gICAgICAvL1xuICAgICAgLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXlcbiAgICAgIC8vIHRvIGNoZWNrIGlmIGV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGJvdGggbG9vcHMuXG4gICAgICBlbHNlIGlmIChsaXN0ZW5lci5tYXRjaGVyLmNhbGwodGFyZ2V0LCBsaXN0ZW5lci5tYXRjaGVyUGFyYW0sIHRhcmdldCkpIHtcbiAgICAgICAgICB0b0ZpcmUucHVzaChbZXZlbnQsIHRhcmdldCwgbGlzdGVuZXJdKTtcbiAgICAgICAgfVxuICAgIH0gLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXkgdG9cbiAgICAvLyBjaGVjayBpZiBldmVudCNzdG9wUHJvcGFnYXRpb25cbiAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgbG9vcGluZ1xuICAgIC8vIHRocm91Z2ggdGhlIERPTS4gU3RvcCBpZiB0aGVcbiAgICAvLyBkZWxlZ2F0aW9uIHJvb3QgaGFzIGJlZW4gcmVhY2hlZFxuXG5cbiAgICBpZiAodGFyZ2V0ID09PSByb290KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDsgLy8gRmFsbCBiYWNrIHRvIHBhcmVudE5vZGUgc2luY2UgU1ZHIGNoaWxkcmVuIGhhdmUgbm8gcGFyZW50RWxlbWVudCBpbiBJRVxuXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQgfHwgdGFyZ2V0LnBhcmVudE5vZGU7IC8vIERvIG5vdCB0cmF2ZXJzZSB1cCB0byBkb2N1bWVudCByb290IHdoZW4gdXNpbmcgcGFyZW50Tm9kZSwgdGhvdWdoXG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTERvY3VtZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgcmV0O1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0b0ZpcmUubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBIYXMgaXQgYmVlbiByZW1vdmVkIGR1cmluZyB3aGlsZSB0aGUgZXZlbnQgZnVuY3Rpb24gd2FzIGZpcmVkXG4gICAgaWYgKHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMuaW5kZXhPZih0b0ZpcmVbaV1bMl0pID4gLTEpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJldHVybmVkID0gdGhpcy5maXJlLmFwcGx5KHRoaXMsIHRvRmlyZVtpXSk7IC8vIFN0b3AgcHJvcGFnYXRpb24gdG8gc3Vic2VxdWVudFxuICAgIC8vIGNhbGxiYWNrcyBpZiB0aGUgY2FsbGJhY2sgcmV0dXJuZWRcbiAgICAvLyBmYWxzZVxuXG4gICAgaWYgKHJldHVybmVkID09PSBmYWxzZSkge1xuICAgICAgdG9GaXJlW2ldWzBdW2V2ZW50SWdub3JlXSA9IHRydWU7XG4gICAgICB0b0ZpcmVbaV1bMF0ucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG4vKipcbiAqIEZpcmUgYSBsaXN0ZW5lciBvbiBhIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcikge1xuICByZXR1cm4gbGlzdGVuZXIuaGFuZGxlci5jYWxsKHRhcmdldCwgZXZlbnQsIHRhcmdldCk7XG59O1xuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgYSB0YWcgc2VsZWN0b3IuXG4gKlxuICogVGFncyBhcmUgTk9UIGNhc2Utc2Vuc2l0aXZlLFxuICogZXhjZXB0IGluIFhNTCAoYW5kIFhNTC1iYXNlZFxuICogbGFuZ3VhZ2VzIHN1Y2ggYXMgWEhUTUwpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSB0YWcgbmFtZSB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNUYWcodGFnTmFtZSwgZWxlbWVudCkge1xuICByZXR1cm4gdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbn1cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIHRoZSByb290LlxuICpcbiAqIEBwYXJhbSB7P1N0cmluZ30gc2VsZWN0b3IgSW4gdGhpcyBjYXNlIHRoaXMgaXMgYWx3YXlzIHBhc3NlZCB0aHJvdWdoIGFzIG51bGwgYW5kIG5vdCB1c2VkXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzUm9vdChzZWxlY3RvciwgZWxlbWVudCkge1xuICBpZiAodGhpcy5yb290RWxlbWVudCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuICgvLyBNYXRjaCB0aGUgb3V0ZXIgZG9jdW1lbnQgKGRpc3BhdGNoZWQgZnJvbSBkb2N1bWVudClcbiAgICAgIGVsZW1lbnQgPT09IGRvY3VtZW50IHx8IC8vIFRoZSA8aHRtbD4gZWxlbWVudCAoZGlzcGF0Y2hlZCBmcm9tIGRvY3VtZW50LmJvZHkgb3IgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICAgICAgZWxlbWVudCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IC8vIE9yIHRoZSB3aW5kb3cgaXRzZWxmIChkaXNwYXRjaGVkIGZyb20gd2luZG93KVxuICAgICAgZWxlbWVudCA9PT0gd2luZG93XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLnJvb3RFbGVtZW50ID09PSBlbGVtZW50O1xufVxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBJRCBvZlxuICogdGhlIGVsZW1lbnQgaW4gJ3RoaXMnXG4gKiBtYXRjaGVzIHRoZSBnaXZlbiBJRC5cbiAqXG4gKiBJRHMgYXJlIGNhc2Utc2Vuc2l0aXZlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgSUQgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzSWQoaWQsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIGlkID09PSBlbGVtZW50LmlkO1xufVxuLyoqXG4gKiBTaG9ydCBoYW5kIGZvciBvZmYoKVxuICogYW5kIHJvb3QoKSwgaWUgYm90aFxuICogd2l0aCBubyBwYXJhbWV0ZXJzXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vZmYoKTtcbiAgdGhpcy5yb290KCk7XG59O1xuXG52YXIgX2RlZmF1bHQgPSBEZWxlZ2F0ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7IiwiaW1wb3J0IERlbGVnYXRlIGZyb20gJ2Z0ZG9tZGVsZWdhdGUnO1xuaW1wb3J0IHZpZXdwb3J0IGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby12aWV3cG9ydCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5jb25zdCBvdmVybGF5cyA9IHt9O1xuXG5jb25zdCBjaGVja09wdGlvbnMgPSBmdW5jdGlvbiAob3B0cykge1xuXHRpZiAob3B0cy50cmlnZ2VyICYmICEob3B0cy50cmlnZ2VyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0b3B0cy50cmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRzLnRyaWdnZXIpO1xuXHR9XG5cblx0aWYgKG9wdHMuaGVhZGluZyAmJiAoIW9wdHMuaGVhZGluZy50aXRsZSB8fCAhb3B0cy5oZWFkaW5nLnRpdGxlLnRyaW0oKSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHQnXCJvLW92ZXJsYXkgZXJyb3JcIjogVG8gaGF2ZSBhIGhlYWRpbmcsIGEgbm9uLWVtcHR5IHRpdGxlIG5lZWRzIHRvIGJlIHNldCdcblx0XHQpO1xuXHR9XG5cblx0Ly8gT3ZlcmxheXMgc2hvdWxkIGJlIG1vZGFsIGFuZCBsYXllcnMgYnkgZGVmYXVsdFxuXHRpZiAodHlwZW9mIG9wdHMubW9kYWwgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0b3B0cy5tb2RhbCA9IHRydWU7XG5cdH1cblx0aWYgKHR5cGVvZiBvcHRzLmxheWVyID09PSAndW5kZWZpbmVkJykge1xuXHRcdG9wdHMubGF5ZXIgPSB0cnVlO1xuXHR9XG5cblx0aWYgKG9wdHMuY29tcGFjdCAmJiBvcHRzLmhlYWRpbmcgJiYgb3B0cy5oZWFkaW5nLnNoYWRlZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdCdcIm8tb3ZlcmxheSBlcnJvclwiOiBDb21wYWN0IG92ZXJsYXlzIGNhblxcJ3QgaGF2ZSBhIHNoYWRlZCBoZWFkZXInXG5cdFx0KTtcblx0fVxuXG5cdHJldHVybiBvcHRzO1xufTtcblxuY29uc3QgZ2V0T3B0aW9uc0Zyb21UcmlnZ2VyID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcblx0bGV0IG9wdHMgPSB7fTtcblx0Ly8gR2V0IGNvbmZpZyBmcm9tIGRhdGEgYXR0cmlidXRlcyBzZXQgaW4gdGhlIHRyaWdnZXIgaWYgdGhleSBoYXZlbid0IGJlZW4gcGFzc2VkIHZpYSBKU1xuXHRpZiAodHJpZ2dlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG5cdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0cmlnZ2VyLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChhdHRyKSB7XG5cdFx0XHRpZiAoYXR0ci5uYW1lLmluZGV4T2YoJ2RhdGEtby1vdmVybGF5JykgPT09IDApIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSB1bm5lY2Vzc2FyeSBwYXJ0IG9mIHRoZSBzdHJpbmcgdGhlIGZpcnN0IHRpbWUgdGhpcyBpcyBydW4gZm9yIGVhY2ggYXR0cmlidXRlXG5cdFx0XHRcdGNvbnN0IGtleSA9IGF0dHIubmFtZS5yZXBsYWNlKCdkYXRhLW8tb3ZlcmxheS0nLCAnJyk7XG5cdFx0XHRcdG9wdHMgPSB1dGlscy5vcHRpb25zRnJvbUtleShrZXksIGF0dHIudmFsdWUsIG9wdHMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG9wdHMudHJpZ2dlciA9IHRyaWdnZXI7XG5cdH1cblx0cmV0dXJuIG9wdHM7XG59O1xuXG5jb25zdCB0cmlnZ2VyQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGlkLCBldikge1xuXHRldi5zdG9wUHJvcGFnYXRpb24oKTtcblx0Y29uc3Qgb3ZlcmxheSA9IG92ZXJsYXlzW2lkXTtcblx0aWYgKG92ZXJsYXkpIHtcblx0XHRpZiAob3ZlcmxheS52aXNpYmxlID09PSB0cnVlKSB7XG5cdFx0XHRvdmVybGF5LmNsb3NlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG92ZXJsYXkub3BlbigpO1xuXHRcdH1cblx0fVxufTtcblxuY29uc3QgaXNWaXNpYmxlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0cmV0dXJuIEJvb2xlYW4oZWxlbWVudC5vZmZzZXRIZWlnaHQpO1xufTtcblxuY29uc3QgZm9jdXNUcmFwID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnN0IHRhYktleUNvZGUgPSA5O1xuXHRjb25zdCBvdmVybGF5Rm9jdXNhYmxlRWxlbWVudHMgPSBbXS5zbGljZVxuXHRcdC5jYWxsKFxuXHRcdFx0dGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcdCdidXR0b24sIFtocmVmXSwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSdcblx0XHRcdClcblx0XHQpXG5cdFx0LmZpbHRlcihlbGVtZW50ID0+IHtcblx0XHRcdGNvbnN0IGVsZW1lbnRWaXNpYmxlID0gaXNWaXNpYmxlKGVsZW1lbnQpO1xuXHRcdFx0Ly8gSW5wdXRzIGZvciByYWRpbyBhbmQgY2hlY2tib3hlcyBhcmUgdmlzdWFsbHkgaGlkZGVuLFxuXHRcdFx0Ly8gc28gY2hlY2sgdGhlIGxhYmVsIHZpc2liaWxpdHkgb2YgaW5wdXRzIHRvbyB3aGVuIGRldGVybWluaW5nXG5cdFx0XHQvLyB3aGV0aGVyIHRvIHRyYXAgZm9jdXMuXG5cdFx0XHRjb25zdCBlbGVtZW50TGFiZWxWaXNpYmxlID1cblx0XHRcdFx0ZWxlbWVudC5sYWJlbHMgJiYgW10uc2xpY2UuY2FsbChlbGVtZW50LmxhYmVscykuc29tZShsID0+IGlzVmlzaWJsZShsKSk7XG5cdFx0XHQvLyBXaGVuIHRhYmJpbmcsIHRoZSBjaGVja2VkIHJhZGlvIGlucHV0IG9mIGEgZ3JvdXAgaXMgZm9jdXNlZCwgbm90IGVhY2ggcmFkaW8gaW5wdXQuXG5cdFx0XHRjb25zdCBlbGVtZW50SXNVbmNoZWNrZWRSYWRpbyA9XG5cdFx0XHRcdGVsZW1lbnQudHlwZSA9PT0gJ3JhZGlvJyAmJiBlbGVtZW50LmNoZWNrZWQgIT09IHRydWU7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQhZWxlbWVudC5kaXNhYmxlZCAmJlxuXHRcdFx0XHQhZWxlbWVudElzVW5jaGVja2VkUmFkaW8gJiZcblx0XHRcdFx0KGVsZW1lbnRWaXNpYmxlIHx8IGVsZW1lbnRMYWJlbFZpc2libGUpXG5cdFx0XHQpO1xuXHRcdH0pO1xuXG5cdGlmIChvdmVybGF5Rm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoICYmIGV2ZW50LmtleUNvZGUgPT09IHRhYktleUNvZGUpIHtcblx0XHRjb25zdCBsYXN0RWxlbWVudCA9XG5cdFx0XHRvdmVybGF5Rm9jdXNhYmxlRWxlbWVudHNbb3ZlcmxheUZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuXHRcdC8vIExvb3AgZm9jdXMgYmFjayB0byB0aGUgZmlyc3QgZWxlbWVudCBpZiBmb2N1cyBoYXMgcmVhY2hlZCB0aGUgZm9jdXNhYmxlIGVsZW1lbnRcblx0XHRpZiAoZXZlbnQudGFyZ2V0ID09PSBsYXN0RWxlbWVudCkge1xuXHRcdFx0b3ZlcmxheUZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQudGFyZ2V0ID09PSBvdmVybGF5Rm9jdXNhYmxlRWxlbWVudHNbMF0pIHtcblx0XHRcdC8vIGxvb3AgdG8gdGhlIGJvdHRvbSB3aGVuIHNoaWZ0K3RhYmJpbmcuXG5cdFx0XHRsYXN0RWxlbWVudC5mb2N1cygpO1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBPdmVybGF5LlxuICovXG5jbGFzcyBPdmVybGF5IHtcblx0LyoqXG5cdCAqIENvbnN0cnVjdCBhbiBvdmVybGF5LlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaWQgLSBTdHJpbmcuIEEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBvdmVybGF5IHdpdGhpbiB0aGUgcGFnZS4gKFJlcXVpcmVkKVxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgT3ZlcmxheS4gVGhpcyBvYmplY3QgTVVTVCBoYXZlIGVpdGhlciBgc3JjYCBvciBgaHRtbGAgc2V0LiAoUmVxdWlyZWQpXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmhlYWRpbmcudGl0bGUgLSBZb3VyIG92ZXJsYXkncyB0aXRsZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuaGVhZGluZy52aXN1YWxseWhpZGV0aXRsZSAtIElmIHlvdSB3YW50IHRvIHByb3ZpZGUgYSBkaWZmZXJlbnQgdGl0bGUgc3R5bGUsIHRoaXMgb3B0aW9uIHdpbGwgcHJldmVudCB0aGUgdGl0bGUgc3BhbiBmcm9tIGJlaW5nIGFkZGVkIHRvIHRoZSBvdmVybGF5LiAoSW4gdGhpcyBjYXNlIHRoZSB0aXRsZSBpcyBvbmx5IHVzZWQgZm9yIGFyaWEgbGFiZWxsaW5nKSBEZWZhdWx0OiBmYWxzZS5cblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmhlYWRpbmcuc2hhZGVkIC0gV2hldGhlciB0byBzaGFkZSB0aGUgYmFja2dyb3VuZCBvZiB0aGUgaGVhZGVyLiBEZWZhdWx0OiB0byBmYWxzZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMubW9kYWwgLSBXaGV0aGVyIHRoZSBvdmVybGF5IHNob3VsZCBoYXZlIG1vZGFsIGJlaGF2aW91ciBvciBub3QuIFNldHRpbmcgdGhpcyBhcyB0cnVlIHdpbGwgYWRkIGEgdHJhbnNsdWNlbnQgc2hhZG93IGJldHdlZW4gdGhlIHBhZ2UgYW5kIHRoZSBvdmVybGF5XG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5jb21wYWN0IC0gSWYgdHJ1ZSwgdGhlIC5vLW92ZXJsYXktLWNvbXBhY3QgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgb3ZlcmxheSB0aGF0IHJlZHVjZXMgaGVhZGluZyBmb250LXNpemUgYW5kIHBhZGRpbmdzIGluIHRoZSBjb250ZW50LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5zcmMgLSBFaXRoZXIgYSB1cmwgZnJvbSB3aGljaCBIVE1MIHRvIHBvcHVsYXRlIHRoZSBvdmVybGF5IGNhbiBiZSBsb2FkZWQsIG9yIGEgcXVlcnlTZWxlY3RvciBzdHJpbmcgaWRlbnRpZnlpbmcgYW4gZWxlbWVudCBmcm9tIHdoaWNoIHRoZSB0ZXh0Q29udGVudCBzaG91bGQgYmUgZXh0cmFjdGVkLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5odG1sIC0gU3RyaW5nIG9yIEhUTUxFbGVtZW50LiBSYXcgSFRNTCAoY2Fubm90IGJlIHNldCBkZWNsYXJhdGl2ZWx5KVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy50cmlnZ2VyIC0gcXVlcnlTZWxlY3RvciBleHByZXNzaW9uIG9yIEhUTUxFbGVtZW50LiBXaGVuIHRoZXJlJ3MgYSB0cmlnZ2VyIHNldCwgYSBjbGljayBldmVudCBoYW5kbGVyIHdpbGwgYmUgYWRkZWQgdG8gaXQgdGhhdCB3aWxsIG9wZW4gb3IgY2xvc2UgdGhlIG92ZXJsYXkgYWNjb3JkaW5nbHkuIChjYW5ub3QgYmUgc2V0IGRlY2xhcmF0aXZlbHkpXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnppbmRleCAtIFZhbHVlIG9mIHRoZSBDU1Mgei1pbmRleCBwcm9wZXJ0eSBvZiB0aGUgb3ZlcmxheS4gRGVmYXVsdCBzZXQgdmlhIENTUzogJzEwJ1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMucHJldmVudGNsb3NpbmcgLSBQcmV2ZW50cyBjbG9zdXJlIG9mIG92ZXJsYXkgdmlhIHN0YW5kYXJkIHggYnV0dG9uIG9yIGVzY2FwZSBrZXkuIEZvciB1c2Ugd2hlbiB5b3UgYXJlIGRpcmVjdGluZyB0aGUgdXNlciB0byBzb21ld2hlcmUgZWxzZS4gT25seSB2YWxpZCB3aXRoIG1vZGFsIHNldCB0byB0cnVlLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuY3VzdG9tY2xvc2UgLSBJZiB5b3UgZG8gbm90IHVzZSB0aGUgaGVhZGluZywgYnV0IHdhbnQgdG8gcHJvdmlkZSBhIGNsb3NlIGJ1dHRvbiBpbiB5b3VyIGh0bWwgLyBzcmMgKHdpdGggYSBjbGFzcyBvZiBvLW92ZXJsYXlfX2Nsb3NlKSwgc2V0dGluZyBjdXN0b21jbG9zZSB0byB0cnVlIHdpbGwgYXR0YWNoIG8tb3ZlcmxheSdzIGNsb3NlIGhhbmRsZXIgZnVuY3Rpb24gdG8gdGhhdCBidXR0b24uXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnBhcmVudG5vZGUgLSBTaG91bGQgYmUgYSBxdWVyeSBzZWxlY3RvciBmb3IgYSBET00gZWxlbWVudC4gSWYgc2V0LCB0aGUgb3ZlcmxheSB3aWxsIGJlIGFwcGVuZGVkIGFzIGEgY2hpbGQgb2YgdGhpcyByYXRoZXIgdGhhbiB0aGUgZG9jdW1lbnQgYm9keSBvciB0YXJnZXQuIElmIG11bHRpcGxlIG5vZGVzIGFyZSBtYXRjaGVkLCBpdCB3aWxsIHVzZSB0aGUgZmlyc3QuIElmIG5vdGhpbmcgbWF0Y2hlcyB0aGlzIHNlbGVjdG9yLCB0aGUgYm9keSB3aWxsIGJlIHVzZWQuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5uZXN0ZWQgLSBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHJlc2l6ZSwgZXNjYXBlLCBhbmQgbGF5ZXIgbGlzdGVuZXJzIHdpbGwgbm90IGJlIHNldCB1cC4gVGhpcyBib29sZWFuIHNob3VsZCBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIHBhcmVudG5vZGUgc2V0dGluZyB0byBhbGxvdyBhbiBvdmVybGF5IHRvIGJlIHBvc2l0aW9uZWQgd2l0aGluIGEgRE9NIGVsZW1lbnQgcmF0aGVyIHRoYW4gb3ZlcmxhaWQgb24gdG9wIG9mIGV2ZXJ5dGhpbmcuIERlZmF1bHQ6IGZhbHNlLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMubm9mb2N1cyAtIElmIHNldCB0byB0cnVlLCB0aGUgdGFiaW5kZXggd2lsbCBub3QgYmUgc2V0IG9uIHRoZSB3cmFwcGVyIGVsZW1lbnQuIFVzZWZ1bCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBuZXN0ZWQgYW5kIHBhcmVudG5vZGUgb3B0aW9ucy4gRGVmYXVsdDogZmFsc2UuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5mdWxsc2NyZWVuIC0gSWYgc2V0IHRvIHRydWUsIHRoZSBvdmVybGF5IHdpbGwgZGlzcGxheSBmdWxsIHNjcmVlbi4gVGhpcyBvdmVybGF5IGRpc2FibGVzIHNjcm9sbCBvbiB0aGUgdW5kZXJseWluZyBkb2N1bWVudCBhbmQgaXMgZGlzbWlzc2libGUgd2l0aCB0aGUgYmFjayBidXR0b24uXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBgaWRgIHBhcmFtZXRlciBpcyBub3QgdW5pcXVlLlxuXHQgKi9cblx0Y29uc3RydWN0b3IoaWQsIG9wdHMpIHtcblx0XHRpZiAob3ZlcmxheXNbaWRdKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdGBvLW92ZXJsYXkgd2l0aCBpZCBcIiR7aWR9XCIgYWxyZWFkeSBleGlzdHMuIENyZWF0aW5nIGFuIG92ZXJsYXkgdHdpY2Ugd2l0aCB0aGUgc2FtZSBpZCBtYXkgcmVzdWx0IGluIHVuZXhwZWN0ZWQgYmVoYXZpb3VyLmBcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0dmlld3BvcnQubGlzdGVuVG8oJ3Jlc2l6ZScpO1xuXHRcdHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXHRcdHRoaXMuaWQgPSBpZDtcblxuXHRcdHRyeSB7XG5cdFx0XHR0aGlzLm9wdHMgPSBjaGVja09wdGlvbnMob3B0cyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dGhpcy5icm9hZGNhc3QoJ2xvZycsICdvRXJyb3JzJywge1xuXHRcdFx0XHRlcnJvcjogZSxcblx0XHRcdH0pO1xuXHRcdFx0dGhyb3cgZTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMub3B0cykge1xuXHRcdFx0Y29uc3Qgbm9PcHRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0J1wiby1vdmVybGF5IGVycm9yXCI6IFJlcXVpcmVkIG9wdGlvbnMgaGF2ZSBub3QgYmVlbiBzZXQnXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5icm9hZGNhc3QoJ2xvZycsICdvRXJyb3JzJywge1xuXHRcdFx0XHRlcnJvcjogbm9PcHRFcnJvcixcblx0XHRcdH0pO1xuXHRcdFx0dGhyb3cgbm9PcHRFcnJvcjtcblx0XHR9XG5cdFx0aWYgKHRoaXMub3B0cy50cmlnZ2VyKSB7XG5cdFx0XHR0aGlzLm9wdHMudHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0XHQnY2xpY2snLFxuXHRcdFx0XHR0cmlnZ2VyQ2xpY2tIYW5kbGVyLmJpbmQodGhpcy5vcHRzLnRyaWdnZXIsIGlkKSxcblx0XHRcdFx0ZmFsc2Vcblx0XHRcdCk7XG5cdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9wdHMucGFyZW50bm9kZSkpIHtcblx0XHRcdFx0dGhpcy5jb250ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9wdHMucGFyZW50bm9kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudC5ib2R5O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuZGVsZWdhdGVzID0ge1xuXHRcdFx0ZG9jOiBuZXcgRGVsZWdhdGUoKSxcblx0XHRcdHdyYXA6IG5ldyBEZWxlZ2F0ZSgpLFxuXHRcdFx0Y29udGV4dDogbmV3IERlbGVnYXRlKCksXG5cdFx0fTtcblxuXHRcdC8vIEFkZCB0aGlzIG92ZXJsYXkgdG8gdGhlIG92ZXJsYXlzIGhhc2htYXBcblx0XHRvdmVybGF5c1tpZF0gPSB0aGlzO1xuXHR9XG5cblx0b3BlbigpIHtcblx0XHQvLyBQcmV2ZW50IHBhZ2Ugc2Nyb2xsIGZvciBvcGVuIG1vZGFscyBvciBmdWxsc2NyZWVuIG92ZXJsYXlzLlxuXHRcdGlmICh0aGlzLm9wdHMubW9kYWwgfHwgdGhpcy5vcHRzLmZ1bGxzY3JlZW4pIHtcblx0XHRcdHRoaXMub3JpZ2luYWxPdmVyZmxvdyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdztcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXHRcdH1cblxuXHRcdC8vIEEgZnVsbCBzY3JlZW4gb3ZlcmxheSBjYW4gbG9vayBsaWtlIGEgbmV3IHBhZ2Ugc28gYWRkIHRvIGhpc3RvcnkuXG5cdFx0Ly8gVGhlIGJyb3dzZXIgYmFjayBidXR0b24gY2FuIHRoZW4gYmUgdXNlZCB0byBjbG9zZSBhIGZ1bGwtc2NyZWVuIG92ZXJsYXkuXG5cdFx0aWYgKHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSAmJiB0aGlzLm9wdHMuZnVsbHNjcmVlbikge1xuXHRcdFx0Ly8gUHVzaCBvdmVybGF5IHN0YXRlIHRvIGhpc3RvcnkuXG5cdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXG5cdFx0XHRcdHtbYG8tb3ZlcmxheS0ke3RoaXMuaWR9YF06ICdmdWxsc2NyZWVuJ30sXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cdFx0XHQpO1xuXHRcdFx0Ly8gV2hlbiBoaXN0b3J5IGNoYW5nZXMgY2hlY2sgZm9yIHRoZSBvdmVybGF5IGFuZCBjbG9zZSBpdC5cblx0XHRcdHRoaXMucG9wc3RhdGVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0d2luZG93Lmhpc3Rvcnkuc3RhdGUgJiZcblx0XHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5zdGF0ZVtgby1vdmVybGF5LSR7dGhpcy5pZH1gXVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMucG9wc3RhdGVIYW5kbGVyKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLnRyaWdnZXIpIHtcblx0XHRcdHRoaXMub3B0cy50cmlnZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgJ3RydWUnKTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuY29udGVudCkge1xuXHRcdFx0Y29uc3Qgb3ZlcmxheSA9IHRoaXM7XG5cdFx0XHR0aGlzLmxvYWRDb250ZW50KGZ1bmN0aW9uIChodG1sKSB7XG5cdFx0XHRcdG92ZXJsYXkub3B0cy5odG1sID0gaHRtbDtcblx0XHRcdFx0aWYgKCFvdmVybGF5Lm9wdHMuaHRtbCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdCdcIm8tb3ZlcmxheSBlcnJvclwiOiBDb250ZW50IGZvciB0aGUgb3ZlcmxheSBuZWVkcyB0byBiZSBzZXQgdmlhIHRoZSBcImh0bWxcIiBvciB0aGUgXCJzcmNcIiBvcHRpb24uJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0b3ZlcmxheS5yZW5kZXIoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNob3coKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkQ29udGVudChjYWxsYmFjaykge1xuXHRcdGlmICghdGhpcy5vcHRzLmh0bWwgJiYgdGhpcy5vcHRzLnNyYykge1xuXHRcdFx0aWYgKC9eKGh0dHBzP1xcOlxcLyk/XFwvLy50ZXN0KHRoaXMub3B0cy5zcmMpKSB7XG5cdFx0XHRcdHV0aWxzLmNvcHlDb250ZW50RnJvbVVybCh0aGlzLm9wdHMuc3JjLCBmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKGh0bWwpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHV0aWxzLmNvcHlDb250ZW50RnJvbUVsZW1lbnQoXG5cdFx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9wdHMuc3JjKSxcblx0XHRcdFx0XHRmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2soaHRtbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYWxsYmFjayh0aGlzLm9wdHMuaHRtbCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHdyYXBwZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHdyYXBwZXJFbC5jbGFzc05hbWUgPSAnby1vdmVybGF5Jztcblx0XHR3cmFwcGVyRWwuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5LS0nICsgdGhpcy5pZC5yZXBsYWNlKCcgJywgJy0nKSk7XG5cblx0XHQvLyBBZGQgY3VzdG9tIGNsYXNzZXMgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgb3ZlcmxheSB3cmFwcGVyLlxuXHRcdGlmICh0aGlzLm9wdHMuY2xhc3MpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHdyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKC4uLnRoaXMub3B0cy5jbGFzcy5zcGxpdCgnICcpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihgQ291bGQgbm90IGFkZCB0aGUgY2xhc3NlczogJHt0aGlzLm9wdHMuY2xhc3N9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy5mdWxsc2NyZWVuKSB7XG5cdFx0XHR3cmFwcGVyRWwuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5LS1mdWxsLXNjcmVlbicpO1xuXHRcdH1cblxuXHRcdHdyYXBwZXJFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZGlhbG9nJyk7XG5cdFx0aWYgKHRoaXMub3B0cy56aW5kZXgpIHtcblx0XHRcdHdyYXBwZXJFbC5zdHlsZS56SW5kZXggPSB0aGlzLm9wdHMuemluZGV4O1xuXHRcdH1cblx0XHR0aGlzLndyYXBwZXIgPSB3cmFwcGVyRWw7XG5cblx0XHRpZiAodGhpcy5vcHRzLmhlYWRpbmcpIHtcblx0XHRcdGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcblx0XHRcdGNvbnN0IGhlYWRpbmdJZCA9IHRoaXMub3B0cy5oZWFkaW5nLnRpdGxlXG5cdFx0XHRcdC50b0xvd2VyQ2FzZSgpXG5cdFx0XHRcdC8vIHJlcGxhY2Ugbm9uLWFzY2lpIGFscGhhbnVtcyB3aXRoIGh5cGhlbnNcblx0XHRcdFx0LnJlcGxhY2UoL1teYS16MC05LV0vZywgJy0nKVxuXHRcdFx0XHQvLyByZXBsYWNlIHJlcGVhdGVkIGh5cGhlbnMgd2l0aCBhIHNpbmdsZSBoeXBoZW5cblx0XHRcdFx0LnJlcGxhY2UoL1tcXHMtXSsvZywgJy0nKTtcblx0XHRcdGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5X19oZWFkaW5nJyk7XG5cdFx0XHRoZWFkaW5nLnNldEF0dHJpYnV0ZSgnaWQnLCBoZWFkaW5nSWQpO1xuXHRcdFx0d3JhcHBlckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgaGVhZGluZ0lkKTtcblxuXHRcdFx0aWYgKHRoaXMub3B0cy5oZWFkaW5nLnNoYWRlZCkge1xuXHRcdFx0XHRoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheV9faGVhZGluZy0tc2hhZGVkJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5vcHRzLnByZXZlbnRjbG9zaW5nKSB7XG5cdFx0XHRcdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0XHRidXR0b24uY2xhc3NOYW1lID0gJ28tb3ZlcmxheV9fY2xvc2UnO1xuXHRcdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Nsb3NlJyk7XG5cdFx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0Nsb3NlJyk7XG5cblx0XHRcdFx0aWYgKCF0aGlzLm9wdHMubm9mb2N1cykge1xuXHRcdFx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRoZWFkaW5nLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdFx0dGl0bGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2hlYWRpbmcnKTtcblx0XHRcdHRpdGxlLmNsYXNzTmFtZSA9ICdvLW92ZXJsYXlfX3RpdGxlJztcblxuXHRcdFx0aWYgKCF0aGlzLm9wdHMuaGVhZGluZy52aXN1YWxseWhpZGV0aXRsZSkge1xuXHRcdFx0XHR0aXRsZS5pbm5lckhUTUwgPSB0aGlzLm9wdHMuaGVhZGluZy50aXRsZTtcblx0XHRcdH1cblxuXHRcdFx0aGVhZGluZy5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cdFx0XHR3cmFwcGVyRWwuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy50b29sdGlwKSB7XG5cdFx0XHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0XHRidXR0b24uY2xhc3NOYW1lID0gJ28tb3ZlcmxheV9fY2xvc2UnO1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnI3ZvaWQnKTtcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2xvc2UnKTtcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0Nsb3NlJyk7XG5cdFx0XHRpZiAoIXRoaXMub3B0cy5ub2ZvY3VzKSB7XG5cdFx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdH1cblxuXHRcdFx0d3JhcHBlckVsLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cdFx0XHR3cmFwcGVyRWwuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5LS1jb21wYWN0Jyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcblx0XHRjb250ZW50LmNsYXNzTmFtZSA9ICdvLW92ZXJsYXlfX2NvbnRlbnQnO1xuXHRcdHdyYXBwZXJFbC5hcHBlbmRDaGlsZChjb250ZW50KTtcblxuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cblx0XHRpZiAodGhpcy5vcHRzLmNvbXBhY3QpIHtcblx0XHRcdHdyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXktLWNvbXBhY3QnKTtcblx0XHR9XG5cblx0XHR0aGlzLnNob3coKTtcblx0fVxuXG5cdF90cmFwRm9jdXMoKSB7XG5cdFx0Ly8gVHJhcCB0aGUgZm9jdXMgaW5zaWRlIHRoZSBvdmVybGF5IHNvIGtleWJvYXJkIG5hdmlnYXRpb24gZG9lc24ndCBlc2NhcGUgdGhlIG92ZXJsYXlcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZm9jdXNUcmFwLmJpbmQodGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNob3cgdGhlIG92ZXJsYXlcblx0ICpcblx0ICogQGZpcmVzIG9PdmVybGF5I3JlYWR5XG5cdCAqL1xuXHRzaG93KCkge1xuXHRcdGlmICh0aGlzLm9wdHMubW9kYWwpIHtcblx0XHRcdHRoaXMud3JhcHBlci5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXktLW1vZGFsJyk7XG5cdFx0XHRjb25zdCBzaGFkb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdHNoYWRvdy5jbGFzc05hbWUgPSAnby1vdmVybGF5LXNoYWRvdyc7XG5cdFx0XHR0aGlzLnNoYWRvdyA9IHNoYWRvdztcblxuXHRcdFx0aWYgKHRoaXMub3B0cy56aW5kZXgpIHtcblx0XHRcdFx0c2hhZG93LnN0eWxlLnpJbmRleCA9IHRoaXMub3B0cy56aW5kZXggLSAxO1xuXHRcdFx0fVxuXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNoYWRvdyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLnJvb3QoZG9jdW1lbnQuYm9keSk7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMud3JhcC5yb290KHRoaXMud3JhcHBlcik7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMuY29udGV4dC5yb290KHRoaXMuY29udGV4dCk7XG5cblx0XHR0aGlzLmNsb3NlSGFuZGxlciA9IHRoaXMuY2xvc2UuYmluZCh0aGlzKTtcblxuXHRcdC8vIElmIHRoZSBvdmVybGF5IGlzIG5lc3RlZCB3aXRoaW4gYSBET00gZWxlbWVudCBkb24ndCBhdHRhY2ggdGhlIHZpZXdwb3J0IHJlc2l6ZSBsaXN0ZW5lcnMuXG5cdFx0aWYgKCF0aGlzLm9wdHMubmVzdGVkKSB7XG5cdFx0XHR0aGlzLnJlc2l6ZUxpc3RlbmVySGFuZGxlciA9IHRoaXMucmVzaXplTGlzdGVuZXIuYmluZCh0aGlzKTtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5vbihcblx0XHRcdFx0J29WaWV3cG9ydC5yZXNpemUnLFxuXHRcdFx0XHQnYm9keScsXG5cdFx0XHRcdHRoaXMucmVzaXplTGlzdGVuZXJIYW5kbGVyXG5cdFx0XHQpO1xuXG5cdFx0XHR0aGlzLmNsb3NlT25Fc2NhcGVQcmVzc0hhbmRsZXIgPSB0aGlzLmNsb3NlT25Fc2NhcGVQcmVzcy5iaW5kKHRoaXMpO1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLm9uKCdrZXl1cCcsIHRoaXMuY2xvc2VPbkVzY2FwZVByZXNzSGFuZGxlcik7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy5sYXllcikge1xuXHRcdFx0dGhpcy5jbG9zZU9uTmV3TGF5ZXJIYW5kbGVyID0gdGhpcy5jbG9zZU9uTmV3TGF5ZXIuYmluZCh0aGlzKTtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLmNvbnRleHQub24oJ29PdmVybGF5LmxheWVyT3BlbicsIHRoaXMuY2xvc2VPbk5ld0xheWVySGFuZGxlcik7XG5cblx0XHRcdHRoaXMuYnJvYWRjYXN0KCdsYXllck9wZW4nKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLmhlYWRpbmcgfHwgdGhpcy5vcHRzLnRvb2x0aXAgfHwgdGhpcy5vcHRzLmN1c3RvbWNsb3NlKSB7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy53cmFwLm9uKCdjbGljaycsICcuby1vdmVybGF5X19jbG9zZScsIHRoaXMuY2xvc2VIYW5kbGVyKTtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLndyYXAub24oXG5cdFx0XHRcdCd0b3VjaGVuZCcsXG5cdFx0XHRcdCcuby1vdmVybGF5X19jbG9zZScsXG5cdFx0XHRcdHRoaXMuY2xvc2VIYW5kbGVyXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2tIYW5kbGVyID0gdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljay5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5vbignY2xpY2snLCAnYm9keScsIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2tIYW5kbGVyKTtcblx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mub24oJ3RvdWNoZW5kJywgJ2JvZHknLCB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrSGFuZGxlcik7XG5cblx0XHR0aGlzLmNvbnRleHQuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcblxuXHRcdC8vIEdpdmUgdGhlIG92ZXJsYXkgZm9jdXNcblx0XHRpZiAoIXRoaXMub3B0cy5ub2ZvY3VzKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHR0aGlzLndyYXBwZXIuc3R5bGUub3V0bGluZSA9IDA7XG5cdFx0fVxuXG5cdFx0Ly8gUmVuZGVycyBjb250ZW50IGFmdGVyIG92ZXJsYXkgaGFzIGJlZW4gYWRkZWQgc28gY3NzIGlzIGFwcGxpZWQgYmVmb3JlIHRoYXRcblx0XHQvLyBUaGF5IHdheSBpZiBhbiBlbGVtZW50IGhhcyBhdXRvZm9jdXMsIHRoZSB3aW5kb3cgd29uJ3Qgc2Nyb2xsIHRvIHRoZSBib3R0b21cblx0XHQvLyBpbiBTYWZhcmkgYXMgdGhlIG92ZXJsYXkgaXMgYWxyZWFkeSBpbiBwb3NpdGlvblxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoXG5cdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICghdGhpcy5jb250ZW50LmlubmVySFRNTCkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5vcHRzLmh0bWwgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdGhpcy5vcHRzLmh0bWw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLm9wdHMuaHRtbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy53aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKTtcblx0XHRcdFx0dGhpcy5oZWlnaHQgPSB0aGlzLmdldEhlaWdodCgpO1xuXG5cdFx0XHRcdC8vIElmIHRoZSBvdmVybGF5IGlzIG5lc3RlZCB3aXRoaW4gYSBET00gZWxlbWVudCBkb24ndCByZXNpemUgYWNjb3JkaW5nIHRvIHRoZSB2aWV3cG9ydC5cblx0XHRcdFx0aWYgKCF0aGlzLm9wdHMubmVzdGVkKSB7XG5cdFx0XHRcdFx0dGhpcy5yZWFsaWduKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy53cmFwcGVyLmZvY3VzKCk7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBSZWFkeSBldmVudFxuXHRcdFx0XHQgKlxuXHRcdFx0XHQgKiBAZXZlbnQgb092ZXJsYXkjcmVhZHlcblx0XHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdFx0ICogQHByb3BlcnR5IHtvT3ZlcmxheX0gaW5zdGFuY2UgLSB0aGUgZmlyaW5nIGluc3RhbmNlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLmJyb2FkY2FzdCgncmVhZHknLCAnb092ZXJsYXknLCB7XG5cdFx0XHRcdFx0aW5zdGFuY2U6IHRoaXNcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gQWRkIG8tdHJhY2tpbmcgaW50ZWdyYXRpb25cblx0XHRcdFx0dGhpcy5icm9hZGNhc3QoJ2V2ZW50JywgJ29UcmFja2luZycsIHtcblx0XHRcdFx0XHRjYXRlZ29yeTogJ292ZXJsYXknLFxuXHRcdFx0XHRcdGFjdGlvbjogJ3Nob3cnLFxuXHRcdFx0XHRcdG92ZXJsYXlfaWQ6IHRoaXMuaWQsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuX3RyYXBGb2N1cygpO1xuXHRcdFx0fS5iaW5kKHRoaXMpXG5cdFx0KTtcblx0fVxuXG5cdGNsb3NlKCkge1xuXHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5kZXN0cm95KCk7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMud3JhcC5kZXN0cm95KCk7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMuY29udGV4dC5kZXN0cm95KCk7XG5cblx0XHQvLyBSZXN0b3JlIGRvY3VtZW50IHNjcm9sbCB3aGVuIG1vZGFscyBvciBmdWxsc2NyZWVuIG92ZXJsYXlzIGFyZSBjbG9zZWQuXG5cdFx0aWYgKHRoaXMub3B0cy5tb2RhbCB8fCB0aGlzLm9wdHMuZnVsbHNjcmVlbikge1xuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gdGhpcy5vcmlnaW5hbE92ZXJmbG93O1xuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBmdWxsc2NyZWVuIHBvcHN0YXRlIGhhbmRsZXIgYW5kIHJlLWVuYWJsZSBkb2N1bWVudCBzY3JvbGwuXG5cdFx0aWYgKHRoaXMub3B0cy5mdWxsc2NyZWVuKSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLnBvcHN0YXRlSGFuZGxlcik7XG5cdFx0fVxuXHRcdC8vIFJlbW92ZSBzdGF0ZSBmcm9tIGhpc3RvcnkgaWYgZnVsbHNjcmVlbiBzdGF0ZSBpcyBzdGlsbCBpbiBoaXN0b3J5LlxuXHRcdC8vIEUuZy5UaGUgY2xvc2UgYnV0dG9uIHdhcyBjbGlja2VkIGRpcmVjdGx5IHJhdGhlciB0aGFuIHRoZSBicm93c2VyIGJhY2sgYnV0dG9uLlxuXHRcdGlmIChcblx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSAmJlxuXHRcdFx0d2luZG93Lmhpc3Rvcnkuc3RhdGUgJiZcblx0XHRcdHdpbmRvdy5oaXN0b3J5LnN0YXRlW2BvLW92ZXJsYXktJHt0aGlzLmlkfWBdID09PSAnZnVsbHNjcmVlbidcblx0XHQpIHtcblx0XHRcdHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcblx0XHR9XG5cblx0XHR2aWV3cG9ydC5zdG9wTGlzdGVuaW5nVG8oJ3Jlc2l6ZScpO1xuXG5cdFx0dGhpcy5icm9hZGNhc3QoJ2Rlc3Ryb3knKTtcblx0XHR0aGlzLmJyb2FkY2FzdCgnZXZlbnQnLCAnb1RyYWNraW5nJywge1xuXHRcdFx0Y2F0ZWdvcnk6ICdvdmVybGF5Jyxcblx0XHRcdGFjdGlvbjogJ2Nsb3NlJyxcblx0XHRcdG92ZXJsYXlfaWQ6IHRoaXMuaWQsXG5cdFx0fSk7XG5cblx0XHR0aGlzLmNvbnRleHQucmVtb3ZlQ2hpbGQodGhpcy53cmFwcGVyKTtcblx0XHRpZiAodGhpcy5vcHRzLm1vZGFsKSB7XG5cdFx0XHR0aGlzLnNoYWRvdy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93KTtcblx0XHR9XG5cblx0XHQvLyBQdXQgZm9jdXMgYmFjayBvbiB0aGUgdHJpZ2dlcmluZyBlbGVtZW50XG5cdFx0aWYgKHRoaXMub3B0cy50cmlnZ2VyKSB7XG5cdFx0XHR0aGlzLm9wdHMudHJpZ2dlci5mb2N1cygpO1xuXHRcdFx0dGhpcy5vcHRzLnRyaWdnZXIuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAnZmFsc2UnKTtcblx0XHR9XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZvY3VzVHJhcCk7XG5cblx0XHR0aGlzLnZpc2libGUgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLm9wdHMubGF5ZXIpIHtcblx0XHRcdHRoaXMuYnJvYWRjYXN0KCdsYXllckNsb3NlJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Y2xvc2VPbkV4dGVybmFsQ2xpY2soZXYpIHtcblx0XHRpZiAoXG5cdFx0XHQhdGhpcy53cmFwcGVyLmNvbnRhaW5zKGV2LnRhcmdldCkgJiZcblx0XHRcdCF0aGlzLm9wdHMubW9kYWwgJiZcblx0XHRcdHRoaXMub3B0cy50cmlnZ2VyICYmXG5cdFx0XHQhdGhpcy5vcHRzLnRyaWdnZXIuY29udGFpbnMoZXYudGFyZ2V0KVxuXHRcdCkge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cdGNsb3NlT25Fc2NhcGVQcmVzcyhldikge1xuXHRcdGlmICghdGhpcy5vcHRzLnByZXZlbnRjbG9zaW5nICYmIGV2LmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0Y2xvc2VPbk5ld0xheWVyKGV2KSB7XG5cdFx0aWYgKCFldi5kZXRhaWwgfHwgZXYuZGV0YWlsLmVsICE9PSB0aGlzKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0cmVzaXplTGlzdGVuZXIoZXYpIHtcblx0XHRpZiAoIXRoaXMud3JhcHBlci5jb250YWlucyhldi50YXJnZXQpKSB7XG5cdFx0XHR0aGlzLnJlc3BvbmRUb1dpbmRvdygpO1xuXHRcdH1cblx0fVxuXG5cdGJyb2FkY2FzdChldmVudFR5cGUsIG5hbWVzcGFjZSwgZGV0YWlsKSB7XG5cdFx0bmFtZXNwYWNlID0gbmFtZXNwYWNlIHx8ICdvT3ZlcmxheSc7XG5cblx0XHRjb25zdCBpc0xheWVyRXZlbnQgPSBldmVudFR5cGUgPT09ICdsYXllck9wZW4nIHx8IGV2ZW50VHlwZSA9PT0gJ2xheWVyQ2xvc2UnO1xuXHRcdGNvbnN0IHRhcmdldCA9IGlzTGF5ZXJFdmVudCA/IHRoaXMuY29udGV4dCA6IHRoaXMud3JhcHBlciB8fCBkb2N1bWVudC5ib2R5O1xuXG5cdFx0ZGV0YWlsID0gZGV0YWlsIHx8IHt9O1xuXG5cdFx0aWYgKG5hbWVzcGFjZSAhPT0gJ29UcmFja2luZycpIHtcblx0XHRcdGRldGFpbC5lbCA9IHRoaXM7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0LmRpc3BhdGNoRXZlbnQoXG5cdFx0XHRuZXcgQ3VzdG9tRXZlbnQobmFtZXNwYWNlICsgJy4nICsgZXZlbnRUeXBlLCB7XG5cdFx0XHRcdGRldGFpbDogZGV0YWlsLFxuXHRcdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0fSlcblx0XHQpO1xuXHR9XG5cblx0cmVhbGlnbihkaW1lbnNpb24sIHNpemUpIHtcblx0XHQvLyBSZWFsaWduIGJvdGggaGVpZ2h0IGFuZCB3aWR0aCBhY2NvcmRpbmcgdG8gdGhlIHdpbmRvdyBieSBkZWZhdWx0LlxuXHRcdGlmICghZGltZW5zaW9uICYmICFzaXplKSB7XG5cdFx0XHR0aGlzLl9hbGlnbignd2lkdGgnLCB2aWV3cG9ydC5nZXRTaXplKCkud2lkdGgpO1xuXHRcdFx0dGhpcy5fYWxpZ24oJ2hlaWdodCcsIHZpZXdwb3J0LmdldFNpemUoKS5oZWlnaHQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEZvciBhIGdpdmVuIGRpbWVuc2lvbiByZWFsaWduIGFjY29yZGluZyB0byB0aGUgdmlld3BvcnQgYnkgZGVmYXVsdC5cblx0XHRpZiAoZGltZW5zaW9uICYmICFzaXplKSB7XG5cdFx0XHR0aGlzLl9hbGlnbihkaW1lbnNpb24sIHZpZXdwb3J0LmdldFNpemUoKVsnZGltZW5zaW9uJ10pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2FsaWduKGRpbWVuc2lvbiwgc2l6ZSk7XG5cdH1cblxuXHRfYWxpZ24oZGltZW5zaW9uLCBzaXplKSB7XG5cdFx0aWYgKGRpbWVuc2lvbiAhPT0gJ3dpZHRoJyAmJiBkaW1lbnNpb24gIT09ICdoZWlnaHQnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdGBDYW4gbm90IHJlYWxpZ24gdGhlIG92ZXJsYXkgZm9yIHRoZSBkaW1lbnNpb24gXCIke2RpbWVuc2lvbn1cIi4gXCJoZWlnaHRcIiBvciBcIndpZHRoXCIgZXhwZWN0ZWQuYFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAoaXNOYU4oc2l6ZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0YENhbiBub3QgcmVhbGlnbiB0aGUgb3ZlcmxheSBmb3IgdGhlIHNpemUgJHtzaXplfS4gQSBudW1iZXIgaXMgZXhwZWN0ZWQuYFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBlZGdlID0gZGltZW5zaW9uID09PSAnd2lkdGgnID8gJ2xlZnQnIDogJ3RvcCc7XG5cblx0XHQvLyBVcGRhdGUgb3ZlcmxheSBzaXplIGZvciByZWFsaWdubWVudCBjYWxjdWxhdGlvbi5cblx0XHQvLyBXZSBtYXkgYmUgcmVhbGlnbmluZyBiZWNhdXNlIHRoZSBjb250ZW50IHdpdGhpbiB0aGUgb3ZlcmxheSBoYXMgY2hhbmdlZC5cblx0XHR0aGlzLndpZHRoID0gdGhpcy5nZXRXaWR0aCgpO1xuXHRcdHRoaXMuaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcblxuXHRcdC8vIEUuZy4gdmlld3BvcnQgZGltZW5zaW9uIDw9IG92ZXJsYXkgZGltZW5zaW9uXG5cdFx0aWYgKHNpemUgPD0gdGhpc1tkaW1lbnNpb25dKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5LS1mdWxsLScgKyBkaW1lbnNpb24pO1xuXHRcdFx0dGhpcy53cmFwcGVyLnN0eWxlW2VkZ2VdID0gJzAnO1xuXHRcdFx0dGhpcy53cmFwcGVyLnN0eWxlWydtYXJnaW4nICsgdXRpbHMuY2FwaXRhbGlzZShlZGdlKV0gPSAwO1xuXHRcdFx0aWYgKGRpbWVuc2lvbiA9PT0gJ2hlaWdodCcpIHtcblx0XHRcdFx0Ly8gU2V0IHRoZSBleGFjdCBoZWlnaHQgdGhhdCB0aGUgY29udGVudCBvZiB0aGUgb3ZlcmxheSB3aWxsIGhhdmUgd2hpY2ggaXMgdGhlIHRvdGFsXG5cdFx0XHRcdC8vIGhlaWdodCBvZiB0aGUgb3ZlcmxheSBtaW51cyB0aGUgaGVhZGluZyBpZiB0aGVyZSBpcyBvbmUuIElmIGhlaWdodCA9IDEwMCUsIHRoZVxuXHRcdFx0XHQvLyBoZWFkaW5nIGlzIHBhcnQgb2YgdGhhdCAxMDAlLCBzbyBzb21lIGNvbnRlbnQgaXMgdHJ1bmNhdGVkLlxuXHRcdFx0XHRjb25zdCBib3JkZXJIZWlnaHQgPVxuXHRcdFx0XHRcdHRoaXMud3JhcHBlci5vZmZzZXRIZWlnaHQgLSB0aGlzLndyYXBwZXIuY2xpZW50SGVpZ2h0O1xuXHRcdFx0XHR0aGlzLmNvbnRlbnQuc3R5bGUuaGVpZ2h0ID1cblx0XHRcdFx0XHR0aGlzLndyYXBwZXIub2Zmc2V0SGVpZ2h0IC1cblx0XHRcdFx0XHQodGhpcy5vcHRzLmhlYWRpbmdcblx0XHRcdFx0XHRcdD8gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLm9mZnNldEhlaWdodFxuXHRcdFx0XHRcdFx0OiAwKSAtXG5cdFx0XHRcdFx0Ym9yZGVySGVpZ2h0ICtcblx0XHRcdFx0XHQncHgnO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZGltZW5zaW9uID09PSAnaGVpZ2h0Jykge1xuXHRcdFx0XHQvLyBSZW1vdmUgdGhlIHByb3BlcnR5IGFuZCBsZXQgdGhlIG92ZXJsYXkgZXh0ZW5kIHRvIGl0cyBjb250ZW50XG5cdFx0XHRcdHRoaXMuY29udGVudC5zdHlsZS5oZWlnaHQgPSBudWxsO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy53cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ28tb3ZlcmxheS0tZnVsbC0nICsgZGltZW5zaW9uKTtcblx0XHRcdHRoaXMud3JhcHBlci5zdHlsZVsnbWFyZ2luJyArIHV0aWxzLmNhcGl0YWxpc2UoZWRnZSldID1cblx0XHRcdFx0LSh0aGlzLndyYXBwZXJbJ29mZnNldCcgKyB1dGlscy5jYXBpdGFsaXNlKGRpbWVuc2lvbildIC8gMikgKyAncHgnO1xuXG5cdFx0XHQvLyBTZXQgYWxpZ25tZW50IGluIEphdmFTY3JpcHQgKG5vdCB2aWEgQ1NTKSBhZnRlciBhbGwgb3RoZXIgc3R5bGVzIGhhdmUgYmVlbiBhcHBsaWVkXG5cdFx0XHQvLyBzbyB0aGF0IGJyb3dzZXJzIGNvbXB1dGUgaXQgcHJvcGVybHkuIElmIGl0J3MgYXBwbGllZCBlYXJsaWVyLCB3aGVuIHRoZSBuZWdhdGl2ZVxuXHRcdFx0Ly8gbWFyZ2luIGlzIGNhbGN1bGF0ZWQsIHRoZSBvdmVybGF5IG1pZ2h0IG5vdCBmaXQsIHNvIGl0IHNocmlua3MgYW5kIHRoZSBuZWdhdGl2ZVxuXHRcdFx0Ly8gbWFyZ2luIHdvdWxkIGJlIGluY29ycmVjdFxuXHRcdFx0dGhpcy53cmFwcGVyLnN0eWxlW2VkZ2VdID0gJzUwJSc7XG5cdFx0fVxuXHR9XG5cblx0cmVzcG9uZFRvV2luZG93KCkge1xuXHRcdHRoaXMucmVhbGlnbigpO1xuXHR9XG5cblx0ZmlsbHMoZGltZW5zaW9uKSB7XG5cdFx0cmV0dXJuIHRoaXMud3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoJ28tb3ZlcmxheS0tZnVsbC0nICsgZGltZW5zaW9uKTtcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMudmlzaWJsZSA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5vcHRzLnRyaWdnZXIpIHtcblx0XHRcdHRoaXMub3B0cy50cmlnZ2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlckNsaWNrSGFuZGxlcik7XG5cdFx0fVxuXHRcdGRlbGV0ZSBvdmVybGF5c1t0aGlzLmlkXTtcblx0fVxuXG5cdGdldEhlaWdodCgpIHtcblx0XHRjb25zdCBib3JkZXJIZWlnaHQgPSB0aGlzLndyYXBwZXIub2Zmc2V0SGVpZ2h0IC0gdGhpcy53cmFwcGVyLmNsaWVudEhlaWdodDtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5jb250ZW50LnNjcm9sbEhlaWdodCArXG5cdFx0XHQodGhpcy5vcHRzLmhlYWRpbmdcblx0XHRcdFx0PyB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG5cdFx0XHRcdDogMCkgK1xuXHRcdFx0Ym9yZGVySGVpZ2h0XG5cdFx0KTtcblx0fVxuXG5cdGdldFdpZHRoKCkge1xuXHRcdGNvbnN0IGJvcmRlcldpZHRoID0gdGhpcy53cmFwcGVyLm9mZnNldFdpZHRoIC0gdGhpcy53cmFwcGVyLmNsaWVudFdpZHRoO1xuXHRcdHJldHVybiB0aGlzLmNvbnRlbnQuc2Nyb2xsV2lkdGggKyBib3JkZXJXaWR0aDtcblx0fVxuXG5cdHN0YXRpYyBpbml0KGVsKSB7XG5cdFx0aWYgKCFlbCkge1xuXHRcdFx0ZWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcblx0XHR9XG5cdFx0Y29uc3QgdHJpZ2dlcnMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcuby1vdmVybGF5LXRyaWdnZXInKTtcblx0XHRjb25zdCBvdmVybGF5c0FycmF5ID0gW107XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0cmlnZ2Vycy5sZW5ndGg7IHQrKykge1xuXHRcdFx0Ly8gVGhlcmUgY2FuIG9ubHkgYmUgb25lIG92ZXJsYXkgcGVyIHRyaWdnZXIgd2hlbiBzZXQgZGVjbGFyYXRpdmVseSwgc28gdGhlIGZpcnN0IHRyaWdnZXIgZm91bmQgZm9yIGEgZ2l2ZW4gb3ZlcmxheSB3aWxsIGJlIHRoZSBvbmUgdXNlZCB0byBjcmVhdGUgdGhlIG92ZXJsYXlcblx0XHRcdGlmICghb3ZlcmxheXNbdHJpZ2dlcnNbdF0uZ2V0QXR0cmlidXRlKCdkYXRhLW8tb3ZlcmxheS1pZCcpXSkge1xuXHRcdFx0XHRvdmVybGF5c0FycmF5LnB1c2goXG5cdFx0XHRcdFx0bmV3IE92ZXJsYXkoXG5cdFx0XHRcdFx0XHR0cmlnZ2Vyc1t0XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1vdmVybGF5LWlkJyksXG5cdFx0XHRcdFx0XHRnZXRPcHRpb25zRnJvbVRyaWdnZXIodHJpZ2dlcnNbdF0pXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvdmVybGF5c0FycmF5O1xuXHR9XG5cblx0c3RhdGljIGRlc3Ryb3koKSB7XG5cdFx0Y29uc3Qgb3ZlcmxheUlkcyA9IE9iamVjdC5rZXlzKG92ZXJsYXlzKTtcblx0XHRvdmVybGF5SWRzLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRvdmVybGF5c1tpZF0uZGVzdHJveSgpO1xuXHRcdH0pO1xuXHR9XG5cblx0c3RhdGljIGdldE92ZXJsYXlzKCkge1xuXHRcdHJldHVybiBvdmVybGF5cztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBPdmVybGF5O1xuIiwiLyoqXG4qXG4qIERlYm91bmNlcyBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBhZnRlciBuIG1pbGxpc2Vjb25kc1xuKiB3aXRob3V0IGl0IG5vdCBiZWluZyBjYWxsZWRcbipcbiogQGV4YW1wbGVcbiogVXRpbHMuZGVib3VuY2UobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gRGVib3VuY2VkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbipcbiogVGhyb3R0bGUgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgb25jZSBldmVyeSBuIG1pbGxpc2Vjb25kc1xuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy50aHJvdHRsZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBUaHJvdHRsZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdXRpbHMnO1xuXG5sZXQgZGVidWc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gYnJvYWRjYXN0KGV2ZW50VHlwZSwgZGF0YSwgdGFyZ2V0KSB7XG5cdHRhcmdldCA9IHRhcmdldCB8fCBkb2N1bWVudC5ib2R5O1xuXG5cdGlmIChkZWJ1Zykge1xuXHRcdGNvbnNvbGUubG9nKCdvLXZpZXdwb3J0JywgZXZlbnRUeXBlLCBkYXRhKTtcblx0fVxuXG5cdHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1ZpZXdwb3J0LicgKyBldmVudFR5cGUsIHtcblx0XHRkZXRhaWw6IGRhdGEsXG5cdFx0YnViYmxlczogdHJ1ZVxuXHR9KSk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IGhlaWdodC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgaGVpZ2h0LlxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xufVxuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGhcbiogQHJldHVybiB7bnVtYmVyfVxuKi9cbmZ1bmN0aW9uIGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xufVxuXG4vKipcbiAqIFZpZXdwb3J0IHNpemUuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTaXplXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0XG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGhcbiAqL1xuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aCBhbmQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aC9oZWlnaHQuXG4qIEByZXR1cm4ge1NpemV9XG4qL1xuZnVuY3Rpb24gZ2V0U2l6ZShpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycyksXG5cdFx0d2lkdGg6IGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpXG5cdH07XG59XG5cbi8qKlxuICogU2Nyb2xsIHBvc2l0aW9uLlxuICogQHR5cGVkZWYge09iamVjdH0gU2Nyb2xsUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHRgXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZWZ0IC0gYHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b3AgLSBgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZYFxuICovXG5cbi8qKlxuICogQHJldHVybiB7U2Nyb2xsUG9zaXRpb259XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG5cdFx0d2lkdGg6IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsXG5cdFx0bGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYLFxuXHRcdHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZXG5cdH07XG59XG5cbi8qKlxuICogQHJldHVybiB7c3RyaW5nfSAtICdwb3J0cmFpdCcgb3IgJ2xhbmRzY2FwZSdcbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oKSB7XG5cdGNvbnN0IG9yaWVudGF0aW9uID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbjtcblx0aWYgKG9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBvcmllbnRhdGlvbiA9PT0gJ3N0cmluZycgP1xuXHRcdFx0b3JpZW50YXRpb24uc3BsaXQoJy0nKVswXSA6XG5cdFx0XHRvcmllbnRhdGlvbi50eXBlLnNwbGl0KCctJylbMF07XG5cdH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcblx0XHRyZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcyA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZ2V0SGVpZ2h0KCkgPj0gZ2V0V2lkdGgoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgdmlld3BvcnQgaXMgdmlzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRWaXNpYmlsaXR5KCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuaGlkZGVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRkZWJ1ZyA9IHRydWU7XG5cdH0sXG5cdGJyb2FkY2FzdCxcblx0Z2V0V2lkdGgsXG5cdGdldEhlaWdodCxcblx0Z2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHksXG5cdGdldE9yaWVudGF0aW9uLFxuXHRkZWJvdW5jZTogVXRpbHMuZGVib3VuY2UsXG5cdHRocm90dGxlOiBVdGlscy50aHJvdHRsZVxufTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuL3NyYy91dGlscy5qcyc7XG5cbmNvbnN0IHRocm90dGxlID0gdXRpbHMudGhyb3R0bGU7XG5jb25zdCBkZWJvdW5jZSA9IHV0aWxzLmRlYm91bmNlO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSB7fTtcbmNvbnN0IGludGVydmFscyA9IHtcblx0cmVzaXplOiAxMDAsXG5cdG9yaWVudGF0aW9uOiAxMDAsXG5cdHZpc2liaWxpdHk6IDEwMCxcblx0c2Nyb2xsOiAxMDBcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byB0aHJvdHRsZSBmb3IgdGhpcyBkdXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbCAtIFRoZSBkdXJhdGlvbiB0byB0aHJvdHRsZSBpbiBtcy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIFx0ICAgLy8gdGhyb3R0bGUgZm9yIGRpZmZlcmVudCBldmVudHMgYXQgZGlmZmVyZW50IGR1cmF0aW9uc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIDEwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCAzMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCAzMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgMzApXG4gKiBcdFx0Ly8gdGhyb3R0bGUgYWxsIGV2ZW50cyBhdCAzMG1zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgzMCk7XG4gKi9cbmZ1bmN0aW9uIHNldFRocm90dGxlSW50ZXJ2YWwoZXZlbnRUeXBlLCBpbnRlcnZhbCkge1xuXHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicpIHtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCBhcmd1bWVudHNbMF0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIGFyZ3VtZW50c1sxXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCBhcmd1bWVudHNbMl0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCBhcmd1bWVudHNbM10pO1xuXHR9IGVsc2UgaWYgKGludGVydmFsKSB7XG5cdFx0aW50ZXJ2YWxzW2V2ZW50VHlwZV0gPSBpbnRlcnZhbDtcblx0fVxufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Jlc2l6ZSgpIHtcblx0aWYgKGxpc3RlbmVycy5yZXNpemUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgncmVzaXplJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5yZXNpemUpO1xuXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnJlc2l6ZSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvT3JpZW50YXRpb24oKSB7XG5cblx0aWYgKGxpc3RlbmVycy5vcmllbnRhdGlvbikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdvcmllbnRhdGlvbmNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnb3JpZW50YXRpb24nLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMub3JpZW50YXRpb24pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5vcmllbnRhdGlvbiA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvVmlzaWJpbGl0eSgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnZpc2liaWxpdHkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgndmlzaWJpbGl0eScsIHtcblx0XHRcdGhpZGRlbjogdXRpbHMuZ2V0VmlzaWJpbGl0eSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnZpc2liaWxpdHkpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cblx0bGlzdGVuZXJzLnZpc2liaWxpdHkgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Njcm9sbCgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnNjcm9sbCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdzY3JvbGwnO1xuXHRjb25zdCBoYW5kbGVyID0gdGhyb3R0bGUoZnVuY3Rpb24oZXYpIHtcblx0XHRjb25zdCBzY3JvbGxQb3MgPSB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbigpO1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnc2Nyb2xsJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdHNjcm9sbEhlaWdodDogc2Nyb2xsUG9zLmhlaWdodCxcblx0XHRcdHNjcm9sbExlZnQ6IHNjcm9sbFBvcy5sZWZ0LFxuXHRcdFx0c2Nyb2xsVG9wOiBzY3JvbGxQb3MudG9wLFxuXHRcdFx0c2Nyb2xsV2lkdGg6IHNjcm9sbFBvcy53aWR0aCxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5zY3JvbGwpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5zY3JvbGwgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0YXJ0IGxpc3RlbmluZyBmb3IuIE9uZSBvZiBgcmVzaXplYCwgYHNjcm9sbGAsIGBvcmllbnRhdGlvbmAsIGB2aXNpYmlsaXR5YCBvciBgYWxsYC5cbiAqIEBleGFtcGxlXG4gKiBcdFx0Ly8gU3RhcnQgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygnYWxsJyk7XG4gKlxuICogXHRcdC8vIEl0IGlzIG5vdyBwb3NzaWJsZSB0byBsaXN0ZW4gZm9yIGRlYm91bmNlIG8tdmlld3BvcnQgZXZlbnRzIHN1Y2ggYXMgYG9WaWV3cG9ydC5vcmllbnRhdGlvbmAuXG4gKiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0Lm9yaWVudGF0aW9uJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAqICAgICAgXHRjb25zb2xlLmxvZyhldmVudC50eXBlKTsgLy8gb1ZpZXdwb3J0Lm9yaWVudGF0aW9uXG4gKiAgICAgIH0pO1xuICovXG5mdW5jdGlvbiBsaXN0ZW5UbyhldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Jlc2l6ZScgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvUmVzaXplKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAnc2Nyb2xsJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9TY3JvbGwoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdvcmllbnRhdGlvbicgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvT3JpZW50YXRpb24oKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICd2aXNpYmlsaXR5JyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9WaXNpYmlsaXR5KCk7XG5cdH1cbn1cblxuLyoqXG4gKiBTdG9wIGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0b3AgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqIFx0XHQvLyBXZSdyZSBkb25lLiBTdG9wIGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQuc3RvcExpc3RlbmluZ1RvKCdhbGwnKTtcbiAqL1xuZnVuY3Rpb24gc3RvcExpc3RlbmluZ1RvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaChzdG9wTGlzdGVuaW5nVG8pO1xuXHR9IGVsc2UgaWYgKGxpc3RlbmVyc1tldmVudFR5cGVdKSB7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXJzW2V2ZW50VHlwZV0uZXZlbnRUeXBlLCBsaXN0ZW5lcnNbZXZlbnRUeXBlXS5oYW5kbGVyKTtcblx0XHRkZWxldGUgbGlzdGVuZXJzW2V2ZW50VHlwZV07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24gKCkge1xuXHRcdHV0aWxzLmRlYnVnKCk7XG5cdH0sXG5cdGxpc3RlblRvLFxuXHRzdG9wTGlzdGVuaW5nVG8sXG5cdHNldFRocm90dGxlSW50ZXJ2YWwsXG5cdGdldE9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbixcblx0Z2V0U2l6ZTogdXRpbHMuZ2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb246IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5OiB1dGlscy5nZXRWaXNpYmlsaXR5XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuXHR1bkNhcGl0YWxpc2U6IGZ1bmN0aW9uKHN0cikge1xuXHRcdHJldHVybiBzdHIuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpO1xuXHR9LFxuXG5cdGNhcGl0YWxpc2U6IGZ1bmN0aW9uKHN0cikge1xuXHRcdHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpO1xuXHR9LFxuXG5cdGNvcHlDb250ZW50RnJvbUVsZW1lbnQ6IGZ1bmN0aW9uKGNvbnRlbnQsIGNhbGxiYWNrKSB7XG5cdFx0Y29uc3QgaHRtbCA9IGNvbnRlbnQubm9kZU5hbWUgPT09ICdTQ1JJUFQnID8gY29udGVudC5pbm5lckhUTUwgOiBjb250ZW50Lm91dGVySFRNTDtcblx0XHRjYWxsYmFjayhodG1sKTtcblx0fSxcblxuXHRjb3B5Q29udGVudEZyb21Vcmw6IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2spIHtcblx0XHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHR4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcblx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7IC8vIGVzbGludCBjb21wbGFpbnMgb2YgZSBub3QgYmVpbmcgdXNlZFxuXHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0XHRjYWxsYmFjayh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjYWxsYmFjaygnQ29udGVudCBmYWlsZWQgdG8gbG9hZCBjb3JyZWN0bHknKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wiby1vdmVybGF5IGVycm9yXCI6IEZldGNoaW5nIGNvbnRlbnQgZnJvbSAnICsgdXJsICsgJyBmYWlsZWQgd2l0aCBlcnJyb3IgJyArIGUpO1xuXHRcdH07XG5cblx0XHR4aHIuc2VuZChudWxsKTtcblx0fSxcblxuXHRvcHRpb25zRnJvbUtleTogZnVuY3Rpb24oa2V5LCB2YWx1ZSwgb3B0cykge1xuXHRcdGNvbnN0IGRhc2hJbmRleCA9IGtleS5pbmRleE9mKCctJyk7XG5cdFx0aWYgKGRhc2hJbmRleCA9PT0gLTEpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElmIGl0J3MgYSBKU09OLCBhIGJvb2xlYW4gb3IgYSBudW1iZXIsIHdlIHdhbnQgaXQgc3RvcmVkIGxpa2UgdGhhdCwgYW5kIG5vdCBhcyBhIHN0cmluZ1xuXHRcdFx0XHQvLyBXZSBhbHNvIHJlcGxhY2UgYWxsICcgd2l0aCBcIiBzbyBKU09OIHN0cmluZ3MgYXJlIHBhcnNlZCBjb3JyZWN0bHlcblx0XHRcdFx0b3B0c1trZXldID0gSlNPTi5wYXJzZSh2YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRvcHRzW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gS2V5IHRoYXQgaG9sZHMgYW4gb2JqZWN0IGluc3RlYWQgb2YgYSB2YWx1ZVxuXHRcdFx0Y29uc3Qgc3ViS2V5ID0ga2V5LnN1YnN0cigwLCBkYXNoSW5kZXgpO1xuXG5cdFx0XHQvLyBJZiBzdWItb2JqZWN0IGRvZXNuJ3QgZXhpc3QgYWxyZWFkeSwgY3JlYXRlIGl0XG5cdFx0XHRpZiAoIW9wdHNbc3ViS2V5XSl7XG5cdFx0XHRcdG9wdHNbc3ViS2V5XSA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSdW4gZnVuY3Rpb24gYWdhaW4gc3RhcnRpbmcgd2l0aCB0aGUgcmVzdCBvZiB0aGUga2V5XG5cdFx0XHRvcHRzW3N1YktleV0gPSB0aGlzLm9wdGlvbnNGcm9tS2V5KGtleS5zdWJzdHIoZGFzaEluZGV4KzEpLCB2YWx1ZSwgb3B0c1tzdWJLZXldKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3B0cztcblx0fSxcblxuXHQvLyBDb2RlIGJhc2VkIG9uIHRoaXMgYXJ0aWNsZSB0byBnZXQgY29vcmRpbmF0ZXMgaW5kZXBlbmRlbnQgb2Ygc2Nyb2xsOiBodHRwOi8vamF2YXNjcmlwdC5pbmZvL3R1dG9yaWFsL2Nvb3JkaW5hdGVzXG5cdGdldE9mZnNldFJlY3Q6IGZ1bmN0aW9uKGUpIHtcblx0XHRjb25zdCBlQ2xpZW50UmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcblx0XHRjb25zdCBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0Ly8gZG9jRWxlbS5zY3JvbGxUb3AvTGVmdCBmb3IgSUUsIHVzZSBib2R5IGFzIGEgbGFzdCByZXNvcnRcblx0XHRjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG5cdFx0Y29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuXG5cdFx0Ly8gSUUgc29tZXRpbWVzIHNoaWZ0cyB0aGUgdXBwZXIgbGVmdCBjb3JuZXJcblx0XHRjb25zdCBjbGllbnRUb3AgPSBkb2NFbGVtLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuXHRcdGNvbnN0IGNsaWVudExlZnQgPSBkb2NFbGVtLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Ly8gSUU4IGRvZXNuJ3Qgc3VwcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgYW5kIC53ZWlnaHRcblx0XHRcdHdpZHRoOiBlQ2xpZW50UmVjdC53aWR0aCB8fCBlQ2xpZW50UmVjdC5yaWdodCAtIGVDbGllbnRSZWN0LmxlZnQsXG5cdFx0XHRoZWlnaHQ6IGVDbGllbnRSZWN0LmhlaWdodCB8fCBlQ2xpZW50UmVjdC5ib3R0b20gLSBlQ2xpZW50UmVjdC50b3AsXG5cdFx0XHR0b3A6IGVDbGllbnRSZWN0LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcblx0XHRcdGxlZnQ6IGVDbGllbnRSZWN0LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdFxuXHRcdH07XG5cdH1cbn07XG4iLCJcbmltcG9ydCBPdmVybGF5IGZyb20gJy4vc3JjL2pzL292ZXJsYXkuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbigpIHtcblx0T3ZlcmxheS5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBPdmVybGF5O1xuIiwiaW1wb3J0ICcuLi8uLic7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG59KTtcbiJdfQ==