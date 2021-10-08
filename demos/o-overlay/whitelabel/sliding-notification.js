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

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default2 = overlay_default; // demos/src/sliding-notification.js

  document.addEventListener("DOMContentLoaded", function () {
    var myOverlay = new main_default2("demo-overlay", {
      nested: "true",
      parentnode: ".right-rail",
      modal: false,
      compact: true,
      preventclosing: false,
      addclosebtn: true,
      heading: {
        title: "Take a survey",
        visuallyhidetitle: true
      },
      html: "<div class='demo-overlay-content'><span class='title'>How do you rate FT.com?</span><p>Take our short survey and be in with a chance to win \xA3250</p>\n\t\t\t\t\t<button onclick=\"window.location.reload(true)\" class=\"o-buttons o-buttons--secondary\">Take survey</button>\n\t\t\t\t\t<p class=\"small\">T&Cs apply</p></div>"
    });
    myOverlay.open();
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvb3ZlcmxheS5qcyIsIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsInNyYy9qcy91dGlscy5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvc2xpZGluZy1ub3RpZmljYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsZUFBQSxHQUFBLFVBQUEsQ0FBQTtBQUFBLGlEQUFBLDhDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7QUFBQTs7QUFFQSxNQUFBLE1BQUEsQ0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFFBQUEsS0FBQSxFQUFPO0FBRG9DLE9BQTdDO0FBR0EsTUFBQSxPQUFBLENBQVEsT0FBUixHQUFrQixLQUFBLENBQWxCOztBQVlBLGVBQUEsU0FBQSxDQUFrQixJQUFsQixFQUF3QjtBQU90QixhQUFLLFdBQUwsR0FBbUIsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFuQjs7QUFFQSxZQUFJLElBQUosRUFBVTtBQUNSLGVBQUssSUFBTCxDQUFVLElBQVY7QUFBVTs7QUFLWixhQUFLLE1BQUwsR0FBYyxTQUFBLENBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixJQUExQixDQUErQixJQUEvQixDQUFkO0FBRUEsYUFBSyxpQkFBTCxHQUF5QixFQUF6QjtBQUF5Qjs7QUFXM0IsTUFBQSxTQUFBLENBQVMsU0FBVCxDQUFtQixJQUFuQixHQUEwQixVQUFVLElBQVYsRUFBZ0I7QUFDeEMsWUFBSSxXQUFBLEdBQWMsS0FBSyxXQUF2QjtBQUNBLFlB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XCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8qKlxuICogRE9NIGV2ZW50IGRlbGVnYXRvclxuICpcbiAqIFRoZSBkZWxlZ2F0b3Igd2lsbCBsaXN0ZW5cbiAqIGZvciBldmVudHMgdGhhdCBidWJibGUgdXBcbiAqIHRvIHRoZSByb290IG5vZGUuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge05vZGV8c3RyaW5nfSBbcm9vdF0gVGhlIHJvb3Qgbm9kZSBvciBhIHNlbGVjdG9yIHN0cmluZyBtYXRjaGluZyB0aGUgcm9vdCBub2RlXG4gKi9cbmZ1bmN0aW9uIERlbGVnYXRlKHJvb3QpIHtcbiAgLyoqXG4gICAqIE1haW50YWluIGEgbWFwIG9mIGxpc3RlbmVyXG4gICAqIGxpc3RzLCBrZXllZCBieSBldmVudCBuYW1lLlxuICAgKlxuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIHRoaXMubGlzdGVuZXJNYXAgPSBbe30sIHt9XTtcblxuICBpZiAocm9vdCkge1xuICAgIHRoaXMucm9vdChyb290KTtcbiAgfVxuICAvKiogQHR5cGUgZnVuY3Rpb24oKSAqL1xuXG5cbiAgdGhpcy5oYW5kbGUgPSBEZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlLmJpbmQodGhpcyk7IC8vIENhY2hlIG9mIGV2ZW50IGxpc3RlbmVycyByZW1vdmVkIGR1cmluZyBhbiBldmVudCBjeWNsZVxuXG4gIHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMgPSBbXTtcbn1cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBldmVudHNcbiAqIG9uIHRoZSBwcm92aWRlZCBET00gZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbcm9vdF0gVGhlIHJvb3Qgbm9kZSBvciBhIHNlbGVjdG9yIHN0cmluZyBtYXRjaGluZyB0aGUgcm9vdCBub2RlXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbiAocm9vdCkge1xuICB2YXIgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwO1xuICB2YXIgZXZlbnRUeXBlOyAvLyBSZW1vdmUgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuXG4gIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMV0pIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcFsxXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFswXSkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwWzBdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gSWYgbm8gcm9vdCBvciByb290IGlzIG5vdFxuICAvLyBhIGRvbSBub2RlLCB0aGVuIHJlbW92ZSBpbnRlcm5hbFxuICAvLyByb290IHJlZmVyZW5jZSBhbmQgZXhpdCBoZXJlXG5cblxuICBpZiAoIXJvb3QgfHwgIXJvb3QuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICBkZWxldGUgdGhpcy5yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogVGhlIHJvb3Qgbm9kZSBhdCB3aGljaFxuICAgKiBsaXN0ZW5lcnMgYXJlIGF0dGFjaGVkLlxuICAgKlxuICAgKiBAdHlwZSBOb2RlXG4gICAqL1xuXG5cbiAgdGhpcy5yb290RWxlbWVudCA9IHJvb3Q7IC8vIFNldCB1cCBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG5cbiAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMV0pIHtcbiAgICBpZiAobGlzdGVuZXJNYXBbMV0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzBdKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwWzBdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuY2FwdHVyZUZvclR5cGUgPSBmdW5jdGlvbiAoZXZlbnRUeXBlKSB7XG4gIHJldHVybiBbJ2JsdXInLCAnZXJyb3InLCAnZm9jdXMnLCAnbG9hZCcsICdyZXNpemUnLCAnc2Nyb2xsJ10uaW5kZXhPZihldmVudFR5cGUpICE9PSAtMTtcbn07XG4vKipcbiAqIEF0dGFjaCBhIGhhbmRsZXIgdG8gb25lXG4gKiBldmVudCBmb3IgYWxsIGVsZW1lbnRzXG4gKiB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvcixcbiAqIG5vdyBvciBpbiB0aGUgZnV0dXJlXG4gKlxuICogVGhlIGhhbmRsZXIgZnVuY3Rpb24gcmVjZWl2ZXNcbiAqIHRocmVlIGFyZ3VtZW50czogdGhlIERPTSBldmVudFxuICogb2JqZWN0LCB0aGUgbm9kZSB0aGF0IG1hdGNoZWRcbiAqIHRoZSBzZWxlY3RvciB3aGlsZSB0aGUgZXZlbnRcbiAqIHdhcyBidWJibGluZyBhbmQgYSByZWZlcmVuY2VcbiAqIHRvIGl0c2VsZi4gV2l0aGluIHRoZSBoYW5kbGVyLFxuICogJ3RoaXMnIGlzIGVxdWFsIHRvIHRoZSBzZWNvbmRcbiAqIGFyZ3VtZW50LlxuICpcbiAqIFRoZSBub2RlIHRoYXQgYWN0dWFsbHkgcmVjZWl2ZWRcbiAqIHRoZSBldmVudCBjYW4gYmUgYWNjZXNzZWQgdmlhXG4gKiAnZXZlbnQudGFyZ2V0Jy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIExpc3RlbiBmb3IgdGhlc2UgZXZlbnRzXG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHNlbGVjdG9yIE9ubHkgaGFuZGxlIGV2ZW50cyBvbiBlbGVtZW50cyBtYXRjaGluZyB0aGlzIHNlbGVjdG9yLCBpZiB1bmRlZmluZWQgbWF0Y2ggcm9vdCBlbGVtZW50XG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IGhhbmRsZXIgSGFuZGxlciBmdW5jdGlvbiAtIGV2ZW50IGRhdGEgcGFzc2VkIGhlcmUgd2lsbCBiZSBpbiBldmVudC5kYXRhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1c2VDYXB0dXJlXSBzZWUgJ3VzZUNhcHR1cmUnIGluIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXQvYWRkRXZlbnRMaXN0ZW5lcj5cbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICB2YXIgcm9vdDtcbiAgdmFyIGxpc3RlbmVyTWFwO1xuICB2YXIgbWF0Y2hlcjtcbiAgdmFyIG1hdGNoZXJQYXJhbTtcblxuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgZXZlbnQgdHlwZTogJyArIGV2ZW50VHlwZSk7XG4gIH0gLy8gaGFuZGxlciBjYW4gYmUgcGFzc2VkIGFzXG4gIC8vIHRoZSBzZWNvbmQgb3IgdGhpcmQgYXJndW1lbnRcblxuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VDYXB0dXJlID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9IC8vIEZhbGxiYWNrIHRvIHNlbnNpYmxlIGRlZmF1bHRzXG4gIC8vIGlmIHVzZUNhcHR1cmUgbm90IHNldFxuXG5cbiAgaWYgKHVzZUNhcHR1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHVzZUNhcHR1cmUgPSB0aGlzLmNhcHR1cmVGb3JUeXBlKGV2ZW50VHlwZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYW5kbGVyIG11c3QgYmUgYSB0eXBlIG9mIEZ1bmN0aW9uJyk7XG4gIH1cblxuICByb290ID0gdGhpcy5yb290RWxlbWVudDtcbiAgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwW3VzZUNhcHR1cmUgPyAxIDogMF07IC8vIEFkZCBtYXN0ZXIgaGFuZGxlciBmb3IgdHlwZSBpZiBub3QgY3JlYXRlZCB5ZXRcblxuICBpZiAoIWxpc3RlbmVyTWFwW2V2ZW50VHlwZV0pIHtcbiAgICBpZiAocm9vdCkge1xuICAgICAgcm9vdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHVzZUNhcHR1cmUpO1xuICAgIH1cblxuICAgIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV0gPSBbXTtcbiAgfVxuXG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBudWxsOyAvLyBDT01QTEVYIC0gbWF0Y2hlc1Jvb3QgbmVlZHMgdG8gaGF2ZSBhY2Nlc3MgdG9cbiAgICAvLyB0aGlzLnJvb3RFbGVtZW50LCBzbyBiaW5kIHRoZSBmdW5jdGlvbiB0byB0aGlzLlxuXG4gICAgbWF0Y2hlciA9IG1hdGNoZXNSb290LmJpbmQodGhpcyk7IC8vIENvbXBpbGUgYSBtYXRjaGVyIGZvciB0aGUgZ2l2ZW4gc2VsZWN0b3JcbiAgfSBlbHNlIGlmICgvXlthLXpdKyQvaS50ZXN0KHNlbGVjdG9yKSkge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yO1xuICAgIG1hdGNoZXIgPSBtYXRjaGVzVGFnO1xuICB9IGVsc2UgaWYgKC9eI1thLXowLTlcXC1fXSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3Rvci5zbGljZSgxKTtcbiAgICBtYXRjaGVyID0gbWF0Y2hlc0lkO1xuICB9IGVsc2Uge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yO1xuICAgIG1hdGNoZXIgPSBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzO1xuICB9IC8vIEFkZCB0byB0aGUgbGlzdCBvZiBsaXN0ZW5lcnNcblxuXG4gIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV0ucHVzaCh7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgbWF0Y2hlcjogbWF0Y2hlcixcbiAgICBtYXRjaGVyUGFyYW06IG1hdGNoZXJQYXJhbVxuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBSZW1vdmUgYW4gZXZlbnQgaGFuZGxlclxuICogZm9yIGVsZW1lbnRzIHRoYXQgbWF0Y2hcbiAqIHRoZSBzZWxlY3RvciwgZm9yZXZlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZlbnRUeXBlXSBSZW1vdmUgaGFuZGxlcnMgZm9yIGV2ZW50cyBtYXRjaGluZyB0aGlzIHR5cGUsIGNvbnNpZGVyaW5nIHRoZSBvdGhlciBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBvdGhlciB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IFtoYW5kbGVyXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBwcmV2aW91cyB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gIHZhciBpO1xuICB2YXIgbGlzdGVuZXI7XG4gIHZhciBsaXN0ZW5lck1hcDtcbiAgdmFyIGxpc3RlbmVyTGlzdDtcbiAgdmFyIHNpbmdsZUV2ZW50VHlwZTsgLy8gSGFuZGxlciBjYW4gYmUgcGFzc2VkIGFzXG4gIC8vIHRoZSBzZWNvbmQgb3IgdGhpcmQgYXJndW1lbnRcblxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlQ2FwdHVyZSA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfSAvLyBJZiB1c2VDYXB0dXJlIG5vdCBzZXQsIHJlbW92ZVxuICAvLyBhbGwgZXZlbnQgbGlzdGVuZXJzXG5cblxuICBpZiAodXNlQ2FwdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5vZmYoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdHJ1ZSk7XG4gICAgdGhpcy5vZmYoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgZmFsc2UpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwW3VzZUNhcHR1cmUgPyAxIDogMF07XG5cbiAgaWYgKCFldmVudFR5cGUpIHtcbiAgICBmb3IgKHNpbmdsZUV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcCkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KHNpbmdsZUV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5vZmYoc2luZ2xlRXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lck1hcFtldmVudFR5cGVdO1xuXG4gIGlmICghbGlzdGVuZXJMaXN0IHx8ICFsaXN0ZW5lckxpc3QubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gLy8gUmVtb3ZlIG9ubHkgcGFyYW1ldGVyIG1hdGNoZXNcbiAgLy8gaWYgc3BlY2lmaWVkXG5cblxuICBmb3IgKGkgPSBsaXN0ZW5lckxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTtcblxuICAgIGlmICgoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBsaXN0ZW5lci5zZWxlY3RvcikgJiYgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGxpc3RlbmVyLmhhbmRsZXIpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVkTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgICBsaXN0ZW5lckxpc3Quc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfSAvLyBBbGwgbGlzdGVuZXJzIHJlbW92ZWRcblxuXG4gIGlmICghbGlzdGVuZXJMaXN0Lmxlbmd0aCkge1xuICAgIGRlbGV0ZSBsaXN0ZW5lck1hcFtldmVudFR5cGVdOyAvLyBSZW1vdmUgdGhlIG1haW4gaGFuZGxlclxuXG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB1c2VDYXB0dXJlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEhhbmRsZSBhbiBhcmJpdHJhcnkgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIGk7XG4gIHZhciBsO1xuICB2YXIgdHlwZSA9IGV2ZW50LnR5cGU7XG4gIHZhciByb290O1xuICB2YXIgcGhhc2U7XG4gIHZhciBsaXN0ZW5lcjtcbiAgdmFyIHJldHVybmVkO1xuICB2YXIgbGlzdGVuZXJMaXN0ID0gW107XG4gIHZhciB0YXJnZXQ7XG4gIHZhciBldmVudElnbm9yZSA9ICdmdExhYnNEZWxlZ2F0ZUlnbm9yZSc7XG5cbiAgaWYgKGV2ZW50W2V2ZW50SWdub3JlXSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRhcmdldCA9IGV2ZW50LnRhcmdldDsgLy8gSGFyZGNvZGUgdmFsdWUgb2YgTm9kZS5URVhUX05PREVcbiAgLy8gYXMgbm90IGRlZmluZWQgaW4gSUU4XG5cbiAgaWYgKHRhcmdldC5ub2RlVHlwZSA9PT0gMykge1xuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICB9IC8vIEhhbmRsZSBTVkcgPHVzZT4gZWxlbWVudHMgaW4gSUVcblxuXG4gIGlmICh0YXJnZXQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQ7XG4gIH1cblxuICByb290ID0gdGhpcy5yb290RWxlbWVudDtcbiAgcGhhc2UgPSBldmVudC5ldmVudFBoYXNlIHx8IChldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQgPyAzIDogMik7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcblxuICBzd2l0Y2ggKHBoYXNlKSB7XG4gICAgY2FzZSAxOlxuICAgICAgLy9FdmVudC5DQVBUVVJJTkdfUEhBU0U6XG4gICAgICBsaXN0ZW5lckxpc3QgPSB0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6XG4gICAgICAvL0V2ZW50LkFUX1RBUkdFVDpcbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyTWFwWzBdICYmIHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV0pIHtcbiAgICAgICAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJMaXN0LmNvbmNhdCh0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJNYXBbMV0gJiYgdGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXSkge1xuICAgICAgICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lckxpc3QuY29uY2F0KHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV0pO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMzpcbiAgICAgIC8vRXZlbnQuQlVCQkxJTkdfUEhBU0U6XG4gICAgICBsaXN0ZW5lckxpc3QgPSB0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICB2YXIgdG9GaXJlID0gW107IC8vIE5lZWQgdG8gY29udGludW91c2x5IGNoZWNrXG4gIC8vIHRoYXQgdGhlIHNwZWNpZmljIGxpc3QgaXNcbiAgLy8gc3RpbGwgcG9wdWxhdGVkIGluIGNhc2Ugb25lXG4gIC8vIG9mIHRoZSBjYWxsYmFja3MgYWN0dWFsbHlcbiAgLy8gY2F1c2VzIHRoZSBsaXN0IHRvIGJlIGRlc3Ryb3llZC5cblxuICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDtcblxuICB3aGlsZSAodGFyZ2V0ICYmIGwpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTsgLy8gQmFpbCBmcm9tIHRoaXMgbG9vcCBpZlxuICAgICAgLy8gdGhlIGxlbmd0aCBjaGFuZ2VkIGFuZFxuICAgICAgLy8gbm8gbW9yZSBsaXN0ZW5lcnMgYXJlXG4gICAgICAvLyBkZWZpbmVkIGJldHdlZW4gaSBhbmQgbC5cblxuICAgICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldC50YWdOYW1lICYmIFtcImJ1dHRvblwiLCBcImlucHV0XCIsIFwic2VsZWN0XCIsIFwidGV4dGFyZWFcIl0uaW5kZXhPZih0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSA+IC0xICYmIHRhcmdldC5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgICAvLyBSZW1vdmUgdGhpbmdzIHRoYXQgaGF2ZSBwcmV2aW91c2x5IGZpcmVkXG4gICAgICAgIHRvRmlyZSA9IFtdO1xuICAgICAgfSAvLyBDaGVjayBmb3IgbWF0Y2ggYW5kIGZpcmVcbiAgICAgIC8vIHRoZSBldmVudCBpZiB0aGVyZSdzIG9uZVxuICAgICAgLy9cbiAgICAgIC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5XG4gICAgICAvLyB0byBjaGVjayBpZiBldmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cbiAgICAgIC8vIHdhcyBjYWxsZWQuIElmIHNvLCBicmVhayBib3RoIGxvb3BzLlxuICAgICAgZWxzZSBpZiAobGlzdGVuZXIubWF0Y2hlci5jYWxsKHRhcmdldCwgbGlzdGVuZXIubWF0Y2hlclBhcmFtLCB0YXJnZXQpKSB7XG4gICAgICAgICAgdG9GaXJlLnB1c2goW2V2ZW50LCB0YXJnZXQsIGxpc3RlbmVyXSk7XG4gICAgICAgIH1cbiAgICB9IC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5IHRvXG4gICAgLy8gY2hlY2sgaWYgZXZlbnQjc3RvcFByb3BhZ2F0aW9uXG4gICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGxvb3BpbmdcbiAgICAvLyB0aHJvdWdoIHRoZSBET00uIFN0b3AgaWYgdGhlXG4gICAgLy8gZGVsZWdhdGlvbiByb290IGhhcyBiZWVuIHJlYWNoZWRcblxuXG4gICAgaWYgKHRhcmdldCA9PT0gcm9vdCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbCA9IGxpc3RlbmVyTGlzdC5sZW5ndGg7IC8vIEZhbGwgYmFjayB0byBwYXJlbnROb2RlIHNpbmNlIFNWRyBjaGlsZHJlbiBoYXZlIG5vIHBhcmVudEVsZW1lbnQgaW4gSUVcblxuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50IHx8IHRhcmdldC5wYXJlbnROb2RlOyAvLyBEbyBub3QgdHJhdmVyc2UgdXAgdG8gZG9jdW1lbnQgcm9vdCB3aGVuIHVzaW5nIHBhcmVudE5vZGUsIHRob3VnaFxuXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJldDtcblxuICBmb3IgKGkgPSAwOyBpIDwgdG9GaXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gSGFzIGl0IGJlZW4gcmVtb3ZlZCBkdXJpbmcgd2hpbGUgdGhlIGV2ZW50IGZ1bmN0aW9uIHdhcyBmaXJlZFxuICAgIGlmICh0aGlzLl9yZW1vdmVkTGlzdGVuZXJzLmluZGV4T2YodG9GaXJlW2ldWzJdKSA+IC0xKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm5lZCA9IHRoaXMuZmlyZS5hcHBseSh0aGlzLCB0b0ZpcmVbaV0pOyAvLyBTdG9wIHByb3BhZ2F0aW9uIHRvIHN1YnNlcXVlbnRcbiAgICAvLyBjYWxsYmFja3MgaWYgdGhlIGNhbGxiYWNrIHJldHVybmVkXG4gICAgLy8gZmFsc2VcblxuICAgIGlmIChyZXR1cm5lZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRvRmlyZVtpXVswXVtldmVudElnbm9yZV0gPSB0cnVlO1xuICAgICAgdG9GaXJlW2ldWzBdLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuLyoqXG4gKiBGaXJlIGEgbGlzdGVuZXIgb24gYSB0YXJnZXQuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoZXZlbnQsIHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIGxpc3RlbmVyLmhhbmRsZXIuY2FsbCh0YXJnZXQsIGV2ZW50LCB0YXJnZXQpO1xufTtcbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIGEgdGFnIHNlbGVjdG9yLlxuICpcbiAqIFRhZ3MgYXJlIE5PVCBjYXNlLXNlbnNpdGl2ZSxcbiAqIGV4Y2VwdCBpbiBYTUwgKGFuZCBYTUwtYmFzZWRcbiAqIGxhbmd1YWdlcyBzdWNoIGFzIFhIVE1MKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBUaGUgdGFnIG5hbWUgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzVGFnKHRhZ05hbWUsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIHRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG59XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyB0aGUgcm9vdC5cbiAqXG4gKiBAcGFyYW0gez9TdHJpbmd9IHNlbGVjdG9yIEluIHRoaXMgY2FzZSB0aGlzIGlzIGFsd2F5cyBwYXNzZWQgdGhyb3VnaCBhcyBudWxsIGFuZCBub3QgdXNlZFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hlc1Jvb3Qoc2VsZWN0b3IsIGVsZW1lbnQpIHtcbiAgaWYgKHRoaXMucm9vdEVsZW1lbnQgPT09IHdpbmRvdykge1xuICAgIHJldHVybiAoLy8gTWF0Y2ggdGhlIG91dGVyIGRvY3VtZW50IChkaXNwYXRjaGVkIGZyb20gZG9jdW1lbnQpXG4gICAgICBlbGVtZW50ID09PSBkb2N1bWVudCB8fCAvLyBUaGUgPGh0bWw+IGVsZW1lbnQgKGRpc3BhdGNoZWQgZnJvbSBkb2N1bWVudC5ib2R5IG9yIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudClcbiAgICAgIGVsZW1lbnQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCAvLyBPciB0aGUgd2luZG93IGl0c2VsZiAoZGlzcGF0Y2hlZCBmcm9tIHdpbmRvdylcbiAgICAgIGVsZW1lbnQgPT09IHdpbmRvd1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5yb290RWxlbWVudCA9PT0gZWxlbWVudDtcbn1cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgSUQgb2ZcbiAqIHRoZSBlbGVtZW50IGluICd0aGlzJ1xuICogbWF0Y2hlcyB0aGUgZ2l2ZW4gSUQuXG4gKlxuICogSURzIGFyZSBjYXNlLXNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIElEIHRvIHRlc3QgYWdhaW5zdFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hlc0lkKGlkLCBlbGVtZW50KSB7XG4gIHJldHVybiBpZCA9PT0gZWxlbWVudC5pZDtcbn1cbi8qKlxuICogU2hvcnQgaGFuZCBmb3Igb2ZmKClcbiAqIGFuZCByb290KCksIGllIGJvdGhcbiAqIHdpdGggbm8gcGFyYW1ldGVyc1xuICpcbiAqIEByZXR1cm4gdm9pZFxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMub2ZmKCk7XG4gIHRoaXMucm9vdCgpO1xufTtcblxudmFyIF9kZWZhdWx0ID0gRGVsZWdhdGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0OyIsImltcG9ydCBEZWxlZ2F0ZSBmcm9tICdmdGRvbWRlbGVnYXRlJztcbmltcG9ydCB2aWV3cG9ydCBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdmlld3BvcnQnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuY29uc3Qgb3ZlcmxheXMgPSB7fTtcblxuY29uc3QgY2hlY2tPcHRpb25zID0gZnVuY3Rpb24gKG9wdHMpIHtcblx0aWYgKG9wdHMudHJpZ2dlciAmJiAhKG9wdHMudHJpZ2dlciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdG9wdHMudHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0cy50cmlnZ2VyKTtcblx0fVxuXG5cdGlmIChvcHRzLmhlYWRpbmcgJiYgKCFvcHRzLmhlYWRpbmcudGl0bGUgfHwgIW9wdHMuaGVhZGluZy50aXRsZS50cmltKCkpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0J1wiby1vdmVybGF5IGVycm9yXCI6IFRvIGhhdmUgYSBoZWFkaW5nLCBhIG5vbi1lbXB0eSB0aXRsZSBuZWVkcyB0byBiZSBzZXQnXG5cdFx0KTtcblx0fVxuXG5cdC8vIE92ZXJsYXlzIHNob3VsZCBiZSBtb2RhbCBhbmQgbGF5ZXJzIGJ5IGRlZmF1bHRcblx0aWYgKHR5cGVvZiBvcHRzLm1vZGFsID09PSAndW5kZWZpbmVkJykge1xuXHRcdG9wdHMubW9kYWwgPSB0cnVlO1xuXHR9XG5cdGlmICh0eXBlb2Ygb3B0cy5sYXllciA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRvcHRzLmxheWVyID0gdHJ1ZTtcblx0fVxuXG5cdGlmIChvcHRzLmNvbXBhY3QgJiYgb3B0cy5oZWFkaW5nICYmIG9wdHMuaGVhZGluZy5zaGFkZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHQnXCJvLW92ZXJsYXkgZXJyb3JcIjogQ29tcGFjdCBvdmVybGF5cyBjYW5cXCd0IGhhdmUgYSBzaGFkZWQgaGVhZGVyJ1xuXHRcdCk7XG5cdH1cblxuXHRyZXR1cm4gb3B0cztcbn07XG5cbmNvbnN0IGdldE9wdGlvbnNGcm9tVHJpZ2dlciA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG5cdGxldCBvcHRzID0ge307XG5cdC8vIEdldCBjb25maWcgZnJvbSBkYXRhIGF0dHJpYnV0ZXMgc2V0IGluIHRoZSB0cmlnZ2VyIGlmIHRoZXkgaGF2ZW4ndCBiZWVuIHBhc3NlZCB2aWEgSlNcblx0aWYgKHRyaWdnZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuXHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodHJpZ2dlci5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXR0cikge1xuXHRcdFx0aWYgKGF0dHIubmFtZS5pbmRleE9mKCdkYXRhLW8tb3ZlcmxheScpID09PSAwKSB7XG5cdFx0XHRcdC8vIFJlbW92ZSB0aGUgdW5uZWNlc3NhcnkgcGFydCBvZiB0aGUgc3RyaW5nIHRoZSBmaXJzdCB0aW1lIHRoaXMgaXMgcnVuIGZvciBlYWNoIGF0dHJpYnV0ZVxuXHRcdFx0XHRjb25zdCBrZXkgPSBhdHRyLm5hbWUucmVwbGFjZSgnZGF0YS1vLW92ZXJsYXktJywgJycpO1xuXHRcdFx0XHRvcHRzID0gdXRpbHMub3B0aW9uc0Zyb21LZXkoa2V5LCBhdHRyLnZhbHVlLCBvcHRzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRvcHRzLnRyaWdnZXIgPSB0cmlnZ2VyO1xuXHR9XG5cdHJldHVybiBvcHRzO1xufTtcblxuY29uc3QgdHJpZ2dlckNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uIChpZCwgZXYpIHtcblx0ZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdGNvbnN0IG92ZXJsYXkgPSBvdmVybGF5c1tpZF07XG5cdGlmIChvdmVybGF5KSB7XG5cdFx0aWYgKG92ZXJsYXkudmlzaWJsZSA9PT0gdHJ1ZSkge1xuXHRcdFx0b3ZlcmxheS5jbG9zZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvdmVybGF5Lm9wZW4oKTtcblx0XHR9XG5cdH1cbn07XG5cbmNvbnN0IGlzVmlzaWJsZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdHJldHVybiBCb29sZWFuKGVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbn07XG5cbmNvbnN0IGZvY3VzVHJhcCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zdCB0YWJLZXlDb2RlID0gOTtcblx0Y29uc3Qgb3ZlcmxheUZvY3VzYWJsZUVsZW1lbnRzID0gW10uc2xpY2Vcblx0XHQuY2FsbChcblx0XHRcdHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0XHQnYnV0dG9uLCBbaHJlZl0sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknXG5cdFx0XHQpXG5cdFx0KVxuXHRcdC5maWx0ZXIoZWxlbWVudCA9PiB7XG5cdFx0XHRjb25zdCBlbGVtZW50VmlzaWJsZSA9IGlzVmlzaWJsZShlbGVtZW50KTtcblx0XHRcdC8vIElucHV0cyBmb3IgcmFkaW8gYW5kIGNoZWNrYm94ZXMgYXJlIHZpc3VhbGx5IGhpZGRlbixcblx0XHRcdC8vIHNvIGNoZWNrIHRoZSBsYWJlbCB2aXNpYmlsaXR5IG9mIGlucHV0cyB0b28gd2hlbiBkZXRlcm1pbmluZ1xuXHRcdFx0Ly8gd2hldGhlciB0byB0cmFwIGZvY3VzLlxuXHRcdFx0Y29uc3QgZWxlbWVudExhYmVsVmlzaWJsZSA9XG5cdFx0XHRcdGVsZW1lbnQubGFiZWxzICYmIFtdLnNsaWNlLmNhbGwoZWxlbWVudC5sYWJlbHMpLnNvbWUobCA9PiBpc1Zpc2libGUobCkpO1xuXHRcdFx0Ly8gV2hlbiB0YWJiaW5nLCB0aGUgY2hlY2tlZCByYWRpbyBpbnB1dCBvZiBhIGdyb3VwIGlzIGZvY3VzZWQsIG5vdCBlYWNoIHJhZGlvIGlucHV0LlxuXHRcdFx0Y29uc3QgZWxlbWVudElzVW5jaGVja2VkUmFkaW8gPVxuXHRcdFx0XHRlbGVtZW50LnR5cGUgPT09ICdyYWRpbycgJiYgZWxlbWVudC5jaGVja2VkICE9PSB0cnVlO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0IWVsZW1lbnQuZGlzYWJsZWQgJiZcblx0XHRcdFx0IWVsZW1lbnRJc1VuY2hlY2tlZFJhZGlvICYmXG5cdFx0XHRcdChlbGVtZW50VmlzaWJsZSB8fCBlbGVtZW50TGFiZWxWaXNpYmxlKVxuXHRcdFx0KTtcblx0XHR9KTtcblxuXHRpZiAob3ZlcmxheUZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAmJiBldmVudC5rZXlDb2RlID09PSB0YWJLZXlDb2RlKSB7XG5cdFx0Y29uc3QgbGFzdEVsZW1lbnQgPVxuXHRcdFx0b3ZlcmxheUZvY3VzYWJsZUVsZW1lbnRzW292ZXJsYXlGb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcblx0XHQvLyBMb29wIGZvY3VzIGJhY2sgdG8gdGhlIGZpcnN0IGVsZW1lbnQgaWYgZm9jdXMgaGFzIHJlYWNoZWQgdGhlIGZvY3VzYWJsZSBlbGVtZW50XG5cdFx0aWYgKGV2ZW50LnRhcmdldCA9PT0gbGFzdEVsZW1lbnQpIHtcblx0XHRcdG92ZXJsYXlGb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LnRhcmdldCA9PT0gb3ZlcmxheUZvY3VzYWJsZUVsZW1lbnRzWzBdKSB7XG5cdFx0XHQvLyBsb29wIHRvIHRoZSBib3R0b20gd2hlbiBzaGlmdCt0YWJiaW5nLlxuXHRcdFx0bGFzdEVsZW1lbnQuZm9jdXMoKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gT3ZlcmxheS5cbiAqL1xuY2xhc3MgT3ZlcmxheSB7XG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3QgYW4gb3ZlcmxheS5cblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGlkIC0gU3RyaW5nLiBBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgb3ZlcmxheSB3aXRoaW4gdGhlIHBhZ2UuIChSZXF1aXJlZClcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIE92ZXJsYXkuIFRoaXMgb2JqZWN0IE1VU1QgaGF2ZSBlaXRoZXIgYHNyY2Agb3IgYGh0bWxgIHNldC4gKFJlcXVpcmVkKVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5oZWFkaW5nLnRpdGxlIC0gWW91ciBvdmVybGF5J3MgdGl0bGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmhlYWRpbmcudmlzdWFsbHloaWRldGl0bGUgLSBJZiB5b3Ugd2FudCB0byBwcm92aWRlIGEgZGlmZmVyZW50IHRpdGxlIHN0eWxlLCB0aGlzIG9wdGlvbiB3aWxsIHByZXZlbnQgdGhlIHRpdGxlIHNwYW4gZnJvbSBiZWluZyBhZGRlZCB0byB0aGUgb3ZlcmxheS4gKEluIHRoaXMgY2FzZSB0aGUgdGl0bGUgaXMgb25seSB1c2VkIGZvciBhcmlhIGxhYmVsbGluZykgRGVmYXVsdDogZmFsc2UuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5oZWFkaW5nLnNoYWRlZCAtIFdoZXRoZXIgdG8gc2hhZGUgdGhlIGJhY2tncm91bmQgb2YgdGhlIGhlYWRlci4gRGVmYXVsdDogdG8gZmFsc2Vcblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLm1vZGFsIC0gV2hldGhlciB0aGUgb3ZlcmxheSBzaG91bGQgaGF2ZSBtb2RhbCBiZWhhdmlvdXIgb3Igbm90LiBTZXR0aW5nIHRoaXMgYXMgdHJ1ZSB3aWxsIGFkZCBhIHRyYW5zbHVjZW50IHNoYWRvdyBiZXR3ZWVuIHRoZSBwYWdlIGFuZCB0aGUgb3ZlcmxheVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuY29tcGFjdCAtIElmIHRydWUsIHRoZSAuby1vdmVybGF5LS1jb21wYWN0IGNsYXNzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIG92ZXJsYXkgdGhhdCByZWR1Y2VzIGhlYWRpbmcgZm9udC1zaXplIGFuZCBwYWRkaW5ncyBpbiB0aGUgY29udGVudC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuc3JjIC0gRWl0aGVyIGEgdXJsIGZyb20gd2hpY2ggSFRNTCB0byBwb3B1bGF0ZSB0aGUgb3ZlcmxheSBjYW4gYmUgbG9hZGVkLCBvciBhIHF1ZXJ5U2VsZWN0b3Igc3RyaW5nIGlkZW50aWZ5aW5nIGFuIGVsZW1lbnQgZnJvbSB3aGljaCB0aGUgdGV4dENvbnRlbnQgc2hvdWxkIGJlIGV4dHJhY3RlZC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuaHRtbCAtIFN0cmluZyBvciBIVE1MRWxlbWVudC4gUmF3IEhUTUwgKGNhbm5vdCBiZSBzZXQgZGVjbGFyYXRpdmVseSlcblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMudHJpZ2dlciAtIHF1ZXJ5U2VsZWN0b3IgZXhwcmVzc2lvbiBvciBIVE1MRWxlbWVudC4gV2hlbiB0aGVyZSdzIGEgdHJpZ2dlciBzZXQsIGEgY2xpY2sgZXZlbnQgaGFuZGxlciB3aWxsIGJlIGFkZGVkIHRvIGl0IHRoYXQgd2lsbCBvcGVuIG9yIGNsb3NlIHRoZSBvdmVybGF5IGFjY29yZGluZ2x5LiAoY2Fubm90IGJlIHNldCBkZWNsYXJhdGl2ZWx5KVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy56aW5kZXggLSBWYWx1ZSBvZiB0aGUgQ1NTIHotaW5kZXggcHJvcGVydHkgb2YgdGhlIG92ZXJsYXkuIERlZmF1bHQgc2V0IHZpYSBDU1M6ICcxMCdcblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLnByZXZlbnRjbG9zaW5nIC0gUHJldmVudHMgY2xvc3VyZSBvZiBvdmVybGF5IHZpYSBzdGFuZGFyZCB4IGJ1dHRvbiBvciBlc2NhcGUga2V5LiBGb3IgdXNlIHdoZW4geW91IGFyZSBkaXJlY3RpbmcgdGhlIHVzZXIgdG8gc29tZXdoZXJlIGVsc2UuIE9ubHkgdmFsaWQgd2l0aCBtb2RhbCBzZXQgdG8gdHJ1ZS5cblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmN1c3RvbWNsb3NlIC0gSWYgeW91IGRvIG5vdCB1c2UgdGhlIGhlYWRpbmcsIGJ1dCB3YW50IHRvIHByb3ZpZGUgYSBjbG9zZSBidXR0b24gaW4geW91ciBodG1sIC8gc3JjICh3aXRoIGEgY2xhc3Mgb2Ygby1vdmVybGF5X19jbG9zZSksIHNldHRpbmcgY3VzdG9tY2xvc2UgdG8gdHJ1ZSB3aWxsIGF0dGFjaCBvLW92ZXJsYXkncyBjbG9zZSBoYW5kbGVyIGZ1bmN0aW9uIHRvIHRoYXQgYnV0dG9uLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5wYXJlbnRub2RlIC0gU2hvdWxkIGJlIGEgcXVlcnkgc2VsZWN0b3IgZm9yIGEgRE9NIGVsZW1lbnQuIElmIHNldCwgdGhlIG92ZXJsYXkgd2lsbCBiZSBhcHBlbmRlZCBhcyBhIGNoaWxkIG9mIHRoaXMgcmF0aGVyIHRoYW4gdGhlIGRvY3VtZW50IGJvZHkgb3IgdGFyZ2V0LiBJZiBtdWx0aXBsZSBub2RlcyBhcmUgbWF0Y2hlZCwgaXQgd2lsbCB1c2UgdGhlIGZpcnN0LiBJZiBub3RoaW5nIG1hdGNoZXMgdGhpcyBzZWxlY3RvciwgdGhlIGJvZHkgd2lsbCBiZSB1c2VkLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMubmVzdGVkIC0gSWYgc2V0IHRvIHRydWUsIHRoZSByZXNpemUsIGVzY2FwZSwgYW5kIGxheWVyIGxpc3RlbmVycyB3aWxsIG5vdCBiZSBzZXQgdXAuIFRoaXMgYm9vbGVhbiBzaG91bGQgYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBwYXJlbnRub2RlIHNldHRpbmcgdG8gYWxsb3cgYW4gb3ZlcmxheSB0byBiZSBwb3NpdGlvbmVkIHdpdGhpbiBhIERPTSBlbGVtZW50IHJhdGhlciB0aGFuIG92ZXJsYWlkIG9uIHRvcCBvZiBldmVyeXRoaW5nLiBEZWZhdWx0OiBmYWxzZS5cblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLm5vZm9jdXMgLSBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHRhYmluZGV4IHdpbGwgbm90IGJlIHNldCBvbiB0aGUgd3JhcHBlciBlbGVtZW50LiBVc2VmdWwgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgbmVzdGVkIGFuZCBwYXJlbnRub2RlIG9wdGlvbnMuIERlZmF1bHQ6IGZhbHNlLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuZnVsbHNjcmVlbiAtIElmIHNldCB0byB0cnVlLCB0aGUgb3ZlcmxheSB3aWxsIGRpc3BsYXkgZnVsbCBzY3JlZW4uIFRoaXMgb3ZlcmxheSBkaXNhYmxlcyBzY3JvbGwgb24gdGhlIHVuZGVybHlpbmcgZG9jdW1lbnQgYW5kIGlzIGRpc21pc3NpYmxlIHdpdGggdGhlIGJhY2sgYnV0dG9uLlxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgYGlkYCBwYXJhbWV0ZXIgaXMgbm90IHVuaXF1ZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKGlkLCBvcHRzKSB7XG5cdFx0aWYgKG92ZXJsYXlzW2lkXSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRgby1vdmVybGF5IHdpdGggaWQgXCIke2lkfVwiIGFscmVhZHkgZXhpc3RzLiBDcmVhdGluZyBhbiBvdmVybGF5IHR3aWNlIHdpdGggdGhlIHNhbWUgaWQgbWF5IHJlc3VsdCBpbiB1bmV4cGVjdGVkIGJlaGF2aW91ci5gXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHZpZXdwb3J0Lmxpc3RlblRvKCdyZXNpemUnKTtcblx0XHR0aGlzLnZpc2libGUgPSBmYWxzZTtcblx0XHR0aGlzLmlkID0gaWQ7XG5cblx0XHR0cnkge1xuXHRcdFx0dGhpcy5vcHRzID0gY2hlY2tPcHRpb25zKG9wdHMpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHRoaXMuYnJvYWRjYXN0KCdsb2cnLCAnb0Vycm9ycycsIHtcblx0XHRcdFx0ZXJyb3I6IGUsXG5cdFx0XHR9KTtcblx0XHRcdHRocm93IGU7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLm9wdHMpIHtcblx0XHRcdGNvbnN0IG5vT3B0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdCdcIm8tb3ZlcmxheSBlcnJvclwiOiBSZXF1aXJlZCBvcHRpb25zIGhhdmUgbm90IGJlZW4gc2V0J1xuXHRcdFx0KTtcblx0XHRcdHRoaXMuYnJvYWRjYXN0KCdsb2cnLCAnb0Vycm9ycycsIHtcblx0XHRcdFx0ZXJyb3I6IG5vT3B0RXJyb3IsXG5cdFx0XHR9KTtcblx0XHRcdHRocm93IG5vT3B0RXJyb3I7XG5cdFx0fVxuXHRcdGlmICh0aGlzLm9wdHMudHJpZ2dlcikge1xuXHRcdFx0dGhpcy5vcHRzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFx0J2NsaWNrJyxcblx0XHRcdFx0dHJpZ2dlckNsaWNrSGFuZGxlci5iaW5kKHRoaXMub3B0cy50cmlnZ2VyLCBpZCksXG5cdFx0XHRcdGZhbHNlXG5cdFx0XHQpO1xuXHRcdFx0dGhpcy5jb250ZXh0ID0gZG9jdW1lbnQuYm9keTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRzLnBhcmVudG5vZGUpKSB7XG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRzLnBhcmVudG5vZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jb250ZXh0ID0gZG9jdW1lbnQuYm9keTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmRlbGVnYXRlcyA9IHtcblx0XHRcdGRvYzogbmV3IERlbGVnYXRlKCksXG5cdFx0XHR3cmFwOiBuZXcgRGVsZWdhdGUoKSxcblx0XHRcdGNvbnRleHQ6IG5ldyBEZWxlZ2F0ZSgpLFxuXHRcdH07XG5cblx0XHQvLyBBZGQgdGhpcyBvdmVybGF5IHRvIHRoZSBvdmVybGF5cyBoYXNobWFwXG5cdFx0b3ZlcmxheXNbaWRdID0gdGhpcztcblx0fVxuXG5cdG9wZW4oKSB7XG5cdFx0Ly8gUHJldmVudCBwYWdlIHNjcm9sbCBmb3Igb3BlbiBtb2RhbHMgb3IgZnVsbHNjcmVlbiBvdmVybGF5cy5cblx0XHRpZiAodGhpcy5vcHRzLm1vZGFsIHx8IHRoaXMub3B0cy5mdWxsc2NyZWVuKSB7XG5cdFx0XHR0aGlzLm9yaWdpbmFsT3ZlcmZsb3cgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3c7XG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0XHR9XG5cblx0XHQvLyBBIGZ1bGwgc2NyZWVuIG92ZXJsYXkgY2FuIGxvb2sgbGlrZSBhIG5ldyBwYWdlIHNvIGFkZCB0byBoaXN0b3J5LlxuXHRcdC8vIFRoZSBicm93c2VyIGJhY2sgYnV0dG9uIGNhbiB0aGVuIGJlIHVzZWQgdG8gY2xvc2UgYSBmdWxsLXNjcmVlbiBvdmVybGF5LlxuXHRcdGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgJiYgdGhpcy5vcHRzLmZ1bGxzY3JlZW4pIHtcblx0XHRcdC8vIFB1c2ggb3ZlcmxheSBzdGF0ZSB0byBoaXN0b3J5LlxuXHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFxuXHRcdFx0XHR7W2BvLW92ZXJsYXktJHt0aGlzLmlkfWBdOiAnZnVsbHNjcmVlbid9LFxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZlxuXHRcdFx0KTtcblx0XHRcdC8vIFdoZW4gaGlzdG9yeSBjaGFuZ2VzIGNoZWNrIGZvciB0aGUgb3ZlcmxheSBhbmQgY2xvc2UgaXQuXG5cdFx0XHR0aGlzLnBvcHN0YXRlSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnN0YXRlICYmXG5cdFx0XHRcdFx0d2luZG93Lmhpc3Rvcnkuc3RhdGVbYG8tb3ZlcmxheS0ke3RoaXMuaWR9YF1cblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLnBvcHN0YXRlSGFuZGxlcik7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy50cmlnZ2VyKSB7XG5cdFx0XHR0aGlzLm9wdHMudHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICd0cnVlJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmNvbnRlbnQpIHtcblx0XHRcdGNvbnN0IG92ZXJsYXkgPSB0aGlzO1xuXHRcdFx0dGhpcy5sb2FkQ29udGVudChmdW5jdGlvbiAoaHRtbCkge1xuXHRcdFx0XHRvdmVybGF5Lm9wdHMuaHRtbCA9IGh0bWw7XG5cdFx0XHRcdGlmICghb3ZlcmxheS5vcHRzLmh0bWwpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHQnXCJvLW92ZXJsYXkgZXJyb3JcIjogQ29udGVudCBmb3IgdGhlIG92ZXJsYXkgbmVlZHMgdG8gYmUgc2V0IHZpYSB0aGUgXCJodG1sXCIgb3IgdGhlIFwic3JjXCIgb3B0aW9uLidcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG92ZXJsYXkucmVuZGVyKCk7XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zaG93KCk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZENvbnRlbnQoY2FsbGJhY2spIHtcblx0XHRpZiAoIXRoaXMub3B0cy5odG1sICYmIHRoaXMub3B0cy5zcmMpIHtcblx0XHRcdGlmICgvXihodHRwcz9cXDpcXC8pP1xcLy8udGVzdCh0aGlzLm9wdHMuc3JjKSkge1xuXHRcdFx0XHR1dGlscy5jb3B5Q29udGVudEZyb21VcmwodGhpcy5vcHRzLnNyYywgZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1dGlscy5jb3B5Q29udGVudEZyb21FbGVtZW50KFxuXHRcdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRzLnNyYyksXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKGh0bWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2FsbGJhY2sodGhpcy5vcHRzLmh0bWwpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB3cmFwcGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR3cmFwcGVyRWwuY2xhc3NOYW1lID0gJ28tb3ZlcmxheSc7XG5cdFx0d3JhcHBlckVsLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheS0tJyArIHRoaXMuaWQucmVwbGFjZSgnICcsICctJykpO1xuXG5cdFx0Ly8gQWRkIGN1c3RvbSBjbGFzc2VzIHRvIHRoZSBuZXdseSBjcmVhdGVkIG92ZXJsYXkgd3JhcHBlci5cblx0XHRpZiAodGhpcy5vcHRzLmNsYXNzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR3cmFwcGVyRWwuY2xhc3NMaXN0LmFkZCguLi50aGlzLm9wdHMuY2xhc3Muc3BsaXQoJyAnKSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oYENvdWxkIG5vdCBhZGQgdGhlIGNsYXNzZXM6ICR7dGhpcy5vcHRzLmNsYXNzfWApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMuZnVsbHNjcmVlbikge1xuXHRcdFx0d3JhcHBlckVsLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheS0tZnVsbC1zY3JlZW4nKTtcblx0XHR9XG5cblx0XHR3cmFwcGVyRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xuXHRcdGlmICh0aGlzLm9wdHMuemluZGV4KSB7XG5cdFx0XHR3cmFwcGVyRWwuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRzLnppbmRleDtcblx0XHR9XG5cdFx0dGhpcy53cmFwcGVyID0gd3JhcHBlckVsO1xuXG5cdFx0aWYgKHRoaXMub3B0cy5oZWFkaW5nKSB7XG5cdFx0XHRjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG5cdFx0XHRjb25zdCBoZWFkaW5nSWQgPSB0aGlzLm9wdHMuaGVhZGluZy50aXRsZVxuXHRcdFx0XHQudG9Mb3dlckNhc2UoKVxuXHRcdFx0XHQvLyByZXBsYWNlIG5vbi1hc2NpaSBhbHBoYW51bXMgd2l0aCBoeXBoZW5zXG5cdFx0XHRcdC5yZXBsYWNlKC9bXmEtejAtOS1dL2csICctJylcblx0XHRcdFx0Ly8gcmVwbGFjZSByZXBlYXRlZCBoeXBoZW5zIHdpdGggYSBzaW5nbGUgaHlwaGVuXG5cdFx0XHRcdC5yZXBsYWNlKC9bXFxzLV0rL2csICctJyk7XG5cdFx0XHRoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheV9faGVhZGluZycpO1xuXHRcdFx0aGVhZGluZy5zZXRBdHRyaWJ1dGUoJ2lkJywgaGVhZGluZ0lkKTtcblx0XHRcdHdyYXBwZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsIGhlYWRpbmdJZCk7XG5cblx0XHRcdGlmICh0aGlzLm9wdHMuaGVhZGluZy5zaGFkZWQpIHtcblx0XHRcdFx0aGVhZGluZy5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXlfX2hlYWRpbmctLXNoYWRlZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXRoaXMub3B0cy5wcmV2ZW50Y2xvc2luZykge1xuXHRcdFx0XHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRcdFx0YnV0dG9uLmNsYXNzTmFtZSA9ICdvLW92ZXJsYXlfX2Nsb3NlJztcblx0XHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDbG9zZScpO1xuXHRcdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsICdDbG9zZScpO1xuXG5cdFx0XHRcdGlmICghdGhpcy5vcHRzLm5vZm9jdXMpIHtcblx0XHRcdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aGVhZGluZy5hcHBlbmRDaGlsZChidXR0b24pO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdHRpdGxlLnNldEF0dHJpYnV0ZSgncm9sZScsICdoZWFkaW5nJyk7XG5cdFx0XHR0aXRsZS5jbGFzc05hbWUgPSAnby1vdmVybGF5X190aXRsZSc7XG5cblx0XHRcdGlmICghdGhpcy5vcHRzLmhlYWRpbmcudmlzdWFsbHloaWRldGl0bGUpIHtcblx0XHRcdFx0dGl0bGUuaW5uZXJIVE1MID0gdGhpcy5vcHRzLmhlYWRpbmcudGl0bGU7XG5cdFx0XHR9XG5cblx0XHRcdGhlYWRpbmcuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXHRcdFx0d3JhcHBlckVsLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMudG9vbHRpcCkge1xuXHRcdFx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdFx0YnV0dG9uLmNsYXNzTmFtZSA9ICdvLW92ZXJsYXlfX2Nsb3NlJztcblx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG5cdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCdocmVmJywgJyN2b2lkJyk7XG5cdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Nsb3NlJyk7XG5cdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsICdDbG9zZScpO1xuXHRcdFx0aWYgKCF0aGlzLm9wdHMubm9mb2N1cykge1xuXHRcdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHR9XG5cblx0XHRcdHdyYXBwZXJFbC5hcHBlbmRDaGlsZChidXR0b24pO1xuXHRcdFx0d3JhcHBlckVsLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheS0tY29tcGFjdCcpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG5cdFx0Y29udGVudC5jbGFzc05hbWUgPSAnby1vdmVybGF5X19jb250ZW50Jztcblx0XHR3cmFwcGVyRWwuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXG5cdFx0aWYgKHRoaXMub3B0cy5jb21wYWN0KSB7XG5cdFx0XHR3cmFwcGVyRWwuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5LS1jb21wYWN0Jyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zaG93KCk7XG5cdH1cblxuXHRfdHJhcEZvY3VzKCkge1xuXHRcdC8vIFRyYXAgdGhlIGZvY3VzIGluc2lkZSB0aGUgb3ZlcmxheSBzbyBrZXlib2FyZCBuYXZpZ2F0aW9uIGRvZXNuJ3QgZXNjYXBlIHRoZSBvdmVybGF5XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZvY3VzVHJhcC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSBvdmVybGF5XG5cdCAqXG5cdCAqIEBmaXJlcyBvT3ZlcmxheSNyZWFkeVxuXHQgKi9cblx0c2hvdygpIHtcblx0XHRpZiAodGhpcy5vcHRzLm1vZGFsKSB7XG5cdFx0XHR0aGlzLndyYXBwZXIuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5LS1tb2RhbCcpO1xuXHRcdFx0Y29uc3Qgc2hhZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRzaGFkb3cuY2xhc3NOYW1lID0gJ28tb3ZlcmxheS1zaGFkb3cnO1xuXHRcdFx0dGhpcy5zaGFkb3cgPSBzaGFkb3c7XG5cblx0XHRcdGlmICh0aGlzLm9wdHMuemluZGV4KSB7XG5cdFx0XHRcdHNoYWRvdy5zdHlsZS56SW5kZXggPSB0aGlzLm9wdHMuemluZGV4IC0gMTtcblx0XHRcdH1cblxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaGFkb3cpO1xuXHRcdH1cblxuXHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5yb290KGRvY3VtZW50LmJvZHkpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLndyYXAucm9vdCh0aGlzLndyYXBwZXIpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLmNvbnRleHQucm9vdCh0aGlzLmNvbnRleHQpO1xuXG5cdFx0dGhpcy5jbG9zZUhhbmRsZXIgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XG5cblx0XHQvLyBJZiB0aGUgb3ZlcmxheSBpcyBuZXN0ZWQgd2l0aGluIGEgRE9NIGVsZW1lbnQgZG9uJ3QgYXR0YWNoIHRoZSB2aWV3cG9ydCByZXNpemUgbGlzdGVuZXJzLlxuXHRcdGlmICghdGhpcy5vcHRzLm5lc3RlZCkge1xuXHRcdFx0dGhpcy5yZXNpemVMaXN0ZW5lckhhbmRsZXIgPSB0aGlzLnJlc2l6ZUxpc3RlbmVyLmJpbmQodGhpcyk7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mub24oXG5cdFx0XHRcdCdvVmlld3BvcnQucmVzaXplJyxcblx0XHRcdFx0J2JvZHknLFxuXHRcdFx0XHR0aGlzLnJlc2l6ZUxpc3RlbmVySGFuZGxlclxuXHRcdFx0KTtcblxuXHRcdFx0dGhpcy5jbG9zZU9uRXNjYXBlUHJlc3NIYW5kbGVyID0gdGhpcy5jbG9zZU9uRXNjYXBlUHJlc3MuYmluZCh0aGlzKTtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5vbigna2V5dXAnLCB0aGlzLmNsb3NlT25Fc2NhcGVQcmVzc0hhbmRsZXIpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMubGF5ZXIpIHtcblx0XHRcdHRoaXMuY2xvc2VPbk5ld0xheWVySGFuZGxlciA9IHRoaXMuY2xvc2VPbk5ld0xheWVyLmJpbmQodGhpcyk7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy5jb250ZXh0Lm9uKCdvT3ZlcmxheS5sYXllck9wZW4nLCB0aGlzLmNsb3NlT25OZXdMYXllckhhbmRsZXIpO1xuXG5cdFx0XHR0aGlzLmJyb2FkY2FzdCgnbGF5ZXJPcGVuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy5oZWFkaW5nIHx8IHRoaXMub3B0cy50b29sdGlwIHx8IHRoaXMub3B0cy5jdXN0b21jbG9zZSkge1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMud3JhcC5vbignY2xpY2snLCAnLm8tb3ZlcmxheV9fY2xvc2UnLCB0aGlzLmNsb3NlSGFuZGxlcik7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy53cmFwLm9uKFxuXHRcdFx0XHQndG91Y2hlbmQnLFxuXHRcdFx0XHQnLm8tb3ZlcmxheV9fY2xvc2UnLFxuXHRcdFx0XHR0aGlzLmNsb3NlSGFuZGxlclxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHR0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrSGFuZGxlciA9IHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mub24oJ2NsaWNrJywgJ2JvZHknLCB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrSGFuZGxlcik7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLm9uKCd0b3VjaGVuZCcsICdib2R5JywgdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGlja0hhbmRsZXIpO1xuXG5cdFx0dGhpcy5jb250ZXh0LmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XG5cblx0XHQvLyBHaXZlIHRoZSBvdmVybGF5IGZvY3VzXG5cdFx0aWYgKCF0aGlzLm9wdHMubm9mb2N1cykge1xuXHRcdFx0dGhpcy53cmFwcGVyLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0dGhpcy53cmFwcGVyLnN0eWxlLm91dGxpbmUgPSAwO1xuXHRcdH1cblxuXHRcdC8vIFJlbmRlcnMgY29udGVudCBhZnRlciBvdmVybGF5IGhhcyBiZWVuIGFkZGVkIHNvIGNzcyBpcyBhcHBsaWVkIGJlZm9yZSB0aGF0XG5cdFx0Ly8gVGhheSB3YXkgaWYgYW4gZWxlbWVudCBoYXMgYXV0b2ZvY3VzLCB0aGUgd2luZG93IHdvbid0IHNjcm9sbCB0byB0aGUgYm90dG9tXG5cdFx0Ly8gaW4gU2FmYXJpIGFzIHRoZSBvdmVybGF5IGlzIGFscmVhZHkgaW4gcG9zaXRpb25cblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuXHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoIXRoaXMuY29udGVudC5pbm5lckhUTUwpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMub3B0cy5odG1sID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dGhpcy5jb250ZW50LmlubmVySFRNTCA9IHRoaXMub3B0cy5odG1sO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5vcHRzLmh0bWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMud2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XG5cdFx0XHRcdHRoaXMuaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcblxuXHRcdFx0XHQvLyBJZiB0aGUgb3ZlcmxheSBpcyBuZXN0ZWQgd2l0aGluIGEgRE9NIGVsZW1lbnQgZG9uJ3QgcmVzaXplIGFjY29yZGluZyB0byB0aGUgdmlld3BvcnQuXG5cdFx0XHRcdGlmICghdGhpcy5vcHRzLm5lc3RlZCkge1xuXHRcdFx0XHRcdHRoaXMucmVhbGlnbigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMudmlzaWJsZSA9IHRydWU7XG5cdFx0XHRcdHRoaXMud3JhcHBlci5mb2N1cygpO1xuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogUmVhZHkgZXZlbnRcblx0XHRcdFx0ICpcblx0XHRcdFx0ICogQGV2ZW50IG9PdmVybGF5I3JlYWR5XG5cdFx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHRcdCAqIEBwcm9wZXJ0eSB7b092ZXJsYXl9IGluc3RhbmNlIC0gdGhlIGZpcmluZyBpbnN0YW5jZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy5icm9hZGNhc3QoJ3JlYWR5JywgJ29PdmVybGF5Jywge1xuXHRcdFx0XHRcdGluc3RhbmNlOiB0aGlzXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIEFkZCBvLXRyYWNraW5nIGludGVncmF0aW9uXG5cdFx0XHRcdHRoaXMuYnJvYWRjYXN0KCdldmVudCcsICdvVHJhY2tpbmcnLCB7XG5cdFx0XHRcdFx0Y2F0ZWdvcnk6ICdvdmVybGF5Jyxcblx0XHRcdFx0XHRhY3Rpb246ICdzaG93Jyxcblx0XHRcdFx0XHRvdmVybGF5X2lkOiB0aGlzLmlkLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl90cmFwRm9jdXMoKTtcblx0XHRcdH0uYmluZCh0aGlzKVxuXHRcdCk7XG5cdH1cblxuXHRjbG9zZSgpIHtcblx0XHR0aGlzLmRlbGVnYXRlcy5kb2MuZGVzdHJveSgpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLndyYXAuZGVzdHJveSgpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLmNvbnRleHQuZGVzdHJveSgpO1xuXG5cdFx0Ly8gUmVzdG9yZSBkb2N1bWVudCBzY3JvbGwgd2hlbiBtb2RhbHMgb3IgZnVsbHNjcmVlbiBvdmVybGF5cyBhcmUgY2xvc2VkLlxuXHRcdGlmICh0aGlzLm9wdHMubW9kYWwgfHwgdGhpcy5vcHRzLmZ1bGxzY3JlZW4pIHtcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IHRoaXMub3JpZ2luYWxPdmVyZmxvdztcblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgZnVsbHNjcmVlbiBwb3BzdGF0ZSBoYW5kbGVyIGFuZCByZS1lbmFibGUgZG9jdW1lbnQgc2Nyb2xsLlxuXHRcdGlmICh0aGlzLm9wdHMuZnVsbHNjcmVlbikge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5wb3BzdGF0ZUhhbmRsZXIpO1xuXHRcdH1cblx0XHQvLyBSZW1vdmUgc3RhdGUgZnJvbSBoaXN0b3J5IGlmIGZ1bGxzY3JlZW4gc3RhdGUgaXMgc3RpbGwgaW4gaGlzdG9yeS5cblx0XHQvLyBFLmcuVGhlIGNsb3NlIGJ1dHRvbiB3YXMgY2xpY2tlZCBkaXJlY3RseSByYXRoZXIgdGhhbiB0aGUgYnJvd3NlciBiYWNrIGJ1dHRvbi5cblx0XHRpZiAoXG5cdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgJiZcblx0XHRcdHdpbmRvdy5oaXN0b3J5LnN0YXRlICYmXG5cdFx0XHR3aW5kb3cuaGlzdG9yeS5zdGF0ZVtgby1vdmVybGF5LSR7dGhpcy5pZH1gXSA9PT0gJ2Z1bGxzY3JlZW4nXG5cdFx0KSB7XG5cdFx0XHR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG5cdFx0fVxuXG5cdFx0dmlld3BvcnQuc3RvcExpc3RlbmluZ1RvKCdyZXNpemUnKTtcblxuXHRcdHRoaXMuYnJvYWRjYXN0KCdkZXN0cm95Jyk7XG5cdFx0dGhpcy5icm9hZGNhc3QoJ2V2ZW50JywgJ29UcmFja2luZycsIHtcblx0XHRcdGNhdGVnb3J5OiAnb3ZlcmxheScsXG5cdFx0XHRhY3Rpb246ICdjbG9zZScsXG5cdFx0XHRvdmVybGF5X2lkOiB0aGlzLmlkLFxuXHRcdH0pO1xuXG5cdFx0dGhpcy5jb250ZXh0LnJlbW92ZUNoaWxkKHRoaXMud3JhcHBlcik7XG5cdFx0aWYgKHRoaXMub3B0cy5tb2RhbCkge1xuXHRcdFx0dGhpcy5zaGFkb3cucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvdyk7XG5cdFx0fVxuXG5cdFx0Ly8gUHV0IGZvY3VzIGJhY2sgb24gdGhlIHRyaWdnZXJpbmcgZWxlbWVudFxuXHRcdGlmICh0aGlzLm9wdHMudHJpZ2dlcikge1xuXHRcdFx0dGhpcy5vcHRzLnRyaWdnZXIuZm9jdXMoKTtcblx0XHRcdHRoaXMub3B0cy50cmlnZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgJ2ZhbHNlJyk7XG5cdFx0fVxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmb2N1c1RyYXApO1xuXG5cdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5vcHRzLmxheWVyKSB7XG5cdFx0XHR0aGlzLmJyb2FkY2FzdCgnbGF5ZXJDbG9zZScpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGNsb3NlT25FeHRlcm5hbENsaWNrKGV2KSB7XG5cdFx0aWYgKFxuXHRcdFx0IXRoaXMud3JhcHBlci5jb250YWlucyhldi50YXJnZXQpICYmXG5cdFx0XHQhdGhpcy5vcHRzLm1vZGFsICYmXG5cdFx0XHR0aGlzLm9wdHMudHJpZ2dlciAmJlxuXHRcdFx0IXRoaXMub3B0cy50cmlnZ2VyLmNvbnRhaW5zKGV2LnRhcmdldClcblx0XHQpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdH1cblxuXHRjbG9zZU9uRXNjYXBlUHJlc3MoZXYpIHtcblx0XHRpZiAoIXRoaXMub3B0cy5wcmV2ZW50Y2xvc2luZyAmJiBldi5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cdGNsb3NlT25OZXdMYXllcihldikge1xuXHRcdGlmICghZXYuZGV0YWlsIHx8IGV2LmRldGFpbC5lbCAhPT0gdGhpcykge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cdHJlc2l6ZUxpc3RlbmVyKGV2KSB7XG5cdFx0aWYgKCF0aGlzLndyYXBwZXIuY29udGFpbnMoZXYudGFyZ2V0KSkge1xuXHRcdFx0dGhpcy5yZXNwb25kVG9XaW5kb3coKTtcblx0XHR9XG5cdH1cblxuXHRicm9hZGNhc3QoZXZlbnRUeXBlLCBuYW1lc3BhY2UsIGRldGFpbCkge1xuXHRcdG5hbWVzcGFjZSA9IG5hbWVzcGFjZSB8fCAnb092ZXJsYXknO1xuXG5cdFx0Y29uc3QgaXNMYXllckV2ZW50ID0gZXZlbnRUeXBlID09PSAnbGF5ZXJPcGVuJyB8fCBldmVudFR5cGUgPT09ICdsYXllckNsb3NlJztcblx0XHRjb25zdCB0YXJnZXQgPSBpc0xheWVyRXZlbnQgPyB0aGlzLmNvbnRleHQgOiB0aGlzLndyYXBwZXIgfHwgZG9jdW1lbnQuYm9keTtcblxuXHRcdGRldGFpbCA9IGRldGFpbCB8fCB7fTtcblxuXHRcdGlmIChuYW1lc3BhY2UgIT09ICdvVHJhY2tpbmcnKSB7XG5cdFx0XHRkZXRhaWwuZWwgPSB0aGlzO1xuXHRcdH1cblxuXHRcdHRhcmdldC5kaXNwYXRjaEV2ZW50KFxuXHRcdFx0bmV3IEN1c3RvbUV2ZW50KG5hbWVzcGFjZSArICcuJyArIGV2ZW50VHlwZSwge1xuXHRcdFx0XHRkZXRhaWw6IGRldGFpbCxcblx0XHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdH0pXG5cdFx0KTtcblx0fVxuXG5cdHJlYWxpZ24oZGltZW5zaW9uLCBzaXplKSB7XG5cdFx0Ly8gUmVhbGlnbiBib3RoIGhlaWdodCBhbmQgd2lkdGggYWNjb3JkaW5nIHRvIHRoZSB3aW5kb3cgYnkgZGVmYXVsdC5cblx0XHRpZiAoIWRpbWVuc2lvbiAmJiAhc2l6ZSkge1xuXHRcdFx0dGhpcy5fYWxpZ24oJ3dpZHRoJywgdmlld3BvcnQuZ2V0U2l6ZSgpLndpZHRoKTtcblx0XHRcdHRoaXMuX2FsaWduKCdoZWlnaHQnLCB2aWV3cG9ydC5nZXRTaXplKCkuaGVpZ2h0KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBGb3IgYSBnaXZlbiBkaW1lbnNpb24gcmVhbGlnbiBhY2NvcmRpbmcgdG8gdGhlIHZpZXdwb3J0IGJ5IGRlZmF1bHQuXG5cdFx0aWYgKGRpbWVuc2lvbiAmJiAhc2l6ZSkge1xuXHRcdFx0dGhpcy5fYWxpZ24oZGltZW5zaW9uLCB2aWV3cG9ydC5nZXRTaXplKClbJ2RpbWVuc2lvbiddKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9hbGlnbihkaW1lbnNpb24sIHNpemUpO1xuXHR9XG5cblx0X2FsaWduKGRpbWVuc2lvbiwgc2l6ZSkge1xuXHRcdGlmIChkaW1lbnNpb24gIT09ICd3aWR0aCcgJiYgZGltZW5zaW9uICE9PSAnaGVpZ2h0Jykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRgQ2FuIG5vdCByZWFsaWduIHRoZSBvdmVybGF5IGZvciB0aGUgZGltZW5zaW9uIFwiJHtkaW1lbnNpb259XCIuIFwiaGVpZ2h0XCIgb3IgXCJ3aWR0aFwiIGV4cGVjdGVkLmBcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzTmFOKHNpemUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdGBDYW4gbm90IHJlYWxpZ24gdGhlIG92ZXJsYXkgZm9yIHRoZSBzaXplICR7c2l6ZX0uIEEgbnVtYmVyIGlzIGV4cGVjdGVkLmBcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZWRnZSA9IGRpbWVuc2lvbiA9PT0gJ3dpZHRoJyA/ICdsZWZ0JyA6ICd0b3AnO1xuXG5cdFx0Ly8gVXBkYXRlIG92ZXJsYXkgc2l6ZSBmb3IgcmVhbGlnbm1lbnQgY2FsY3VsYXRpb24uXG5cdFx0Ly8gV2UgbWF5IGJlIHJlYWxpZ25pbmcgYmVjYXVzZSB0aGUgY29udGVudCB3aXRoaW4gdGhlIG92ZXJsYXkgaGFzIGNoYW5nZWQuXG5cdFx0dGhpcy53aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKTtcblx0XHR0aGlzLmhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KCk7XG5cblx0XHQvLyBFLmcuIHZpZXdwb3J0IGRpbWVuc2lvbiA8PSBvdmVybGF5IGRpbWVuc2lvblxuXHRcdGlmIChzaXplIDw9IHRoaXNbZGltZW5zaW9uXSkge1xuXHRcdFx0dGhpcy53cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheS0tZnVsbC0nICsgZGltZW5zaW9uKTtcblx0XHRcdHRoaXMud3JhcHBlci5zdHlsZVtlZGdlXSA9ICcwJztcblx0XHRcdHRoaXMud3JhcHBlci5zdHlsZVsnbWFyZ2luJyArIHV0aWxzLmNhcGl0YWxpc2UoZWRnZSldID0gMDtcblx0XHRcdGlmIChkaW1lbnNpb24gPT09ICdoZWlnaHQnKSB7XG5cdFx0XHRcdC8vIFNldCB0aGUgZXhhY3QgaGVpZ2h0IHRoYXQgdGhlIGNvbnRlbnQgb2YgdGhlIG92ZXJsYXkgd2lsbCBoYXZlIHdoaWNoIGlzIHRoZSB0b3RhbFxuXHRcdFx0XHQvLyBoZWlnaHQgb2YgdGhlIG92ZXJsYXkgbWludXMgdGhlIGhlYWRpbmcgaWYgdGhlcmUgaXMgb25lLiBJZiBoZWlnaHQgPSAxMDAlLCB0aGVcblx0XHRcdFx0Ly8gaGVhZGluZyBpcyBwYXJ0IG9mIHRoYXQgMTAwJSwgc28gc29tZSBjb250ZW50IGlzIHRydW5jYXRlZC5cblx0XHRcdFx0Y29uc3QgYm9yZGVySGVpZ2h0ID1cblx0XHRcdFx0XHR0aGlzLndyYXBwZXIub2Zmc2V0SGVpZ2h0IC0gdGhpcy53cmFwcGVyLmNsaWVudEhlaWdodDtcblx0XHRcdFx0dGhpcy5jb250ZW50LnN0eWxlLmhlaWdodCA9XG5cdFx0XHRcdFx0dGhpcy53cmFwcGVyLm9mZnNldEhlaWdodCAtXG5cdFx0XHRcdFx0KHRoaXMub3B0cy5oZWFkaW5nXG5cdFx0XHRcdFx0XHQ/IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5vZmZzZXRIZWlnaHRcblx0XHRcdFx0XHRcdDogMCkgLVxuXHRcdFx0XHRcdGJvcmRlckhlaWdodCArXG5cdFx0XHRcdFx0J3B4Jztcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGRpbWVuc2lvbiA9PT0gJ2hlaWdodCcpIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBwcm9wZXJ0eSBhbmQgbGV0IHRoZSBvdmVybGF5IGV4dGVuZCB0byBpdHMgY29udGVudFxuXHRcdFx0XHR0aGlzLmNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdHRoaXMud3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdvLW92ZXJsYXktLWZ1bGwtJyArIGRpbWVuc2lvbik7XG5cdFx0XHR0aGlzLndyYXBwZXIuc3R5bGVbJ21hcmdpbicgKyB1dGlscy5jYXBpdGFsaXNlKGVkZ2UpXSA9XG5cdFx0XHRcdC0odGhpcy53cmFwcGVyWydvZmZzZXQnICsgdXRpbHMuY2FwaXRhbGlzZShkaW1lbnNpb24pXSAvIDIpICsgJ3B4JztcblxuXHRcdFx0Ly8gU2V0IGFsaWdubWVudCBpbiBKYXZhU2NyaXB0IChub3QgdmlhIENTUykgYWZ0ZXIgYWxsIG90aGVyIHN0eWxlcyBoYXZlIGJlZW4gYXBwbGllZFxuXHRcdFx0Ly8gc28gdGhhdCBicm93c2VycyBjb21wdXRlIGl0IHByb3Blcmx5LiBJZiBpdCdzIGFwcGxpZWQgZWFybGllciwgd2hlbiB0aGUgbmVnYXRpdmVcblx0XHRcdC8vIG1hcmdpbiBpcyBjYWxjdWxhdGVkLCB0aGUgb3ZlcmxheSBtaWdodCBub3QgZml0LCBzbyBpdCBzaHJpbmtzIGFuZCB0aGUgbmVnYXRpdmVcblx0XHRcdC8vIG1hcmdpbiB3b3VsZCBiZSBpbmNvcnJlY3Rcblx0XHRcdHRoaXMud3JhcHBlci5zdHlsZVtlZGdlXSA9ICc1MCUnO1xuXHRcdH1cblx0fVxuXG5cdHJlc3BvbmRUb1dpbmRvdygpIHtcblx0XHR0aGlzLnJlYWxpZ24oKTtcblx0fVxuXG5cdGZpbGxzKGRpbWVuc2lvbikge1xuXHRcdHJldHVybiB0aGlzLndyYXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLW92ZXJsYXktLWZ1bGwtJyArIGRpbWVuc2lvbik7XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnZpc2libGUgPT09IHRydWUpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMub3B0cy50cmlnZ2VyKSB7XG5cdFx0XHR0aGlzLm9wdHMudHJpZ2dlci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXJDbGlja0hhbmRsZXIpO1xuXHRcdH1cblx0XHRkZWxldGUgb3ZlcmxheXNbdGhpcy5pZF07XG5cdH1cblxuXHRnZXRIZWlnaHQoKSB7XG5cdFx0Y29uc3QgYm9yZGVySGVpZ2h0ID0gdGhpcy53cmFwcGVyLm9mZnNldEhlaWdodCAtIHRoaXMud3JhcHBlci5jbGllbnRIZWlnaHQ7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuY29udGVudC5zY3JvbGxIZWlnaHQgK1xuXHRcdFx0KHRoaXMub3B0cy5oZWFkaW5nXG5cdFx0XHRcdD8gdGhpcy53cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLm9mZnNldEhlaWdodFxuXHRcdFx0XHQ6IDApICtcblx0XHRcdGJvcmRlckhlaWdodFxuXHRcdCk7XG5cdH1cblxuXHRnZXRXaWR0aCgpIHtcblx0XHRjb25zdCBib3JkZXJXaWR0aCA9IHRoaXMud3JhcHBlci5vZmZzZXRXaWR0aCAtIHRoaXMud3JhcHBlci5jbGllbnRXaWR0aDtcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50LnNjcm9sbFdpZHRoICsgYm9yZGVyV2lkdGg7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChlbCkge1xuXHRcdGlmICghZWwpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdFx0fVxuXHRcdGNvbnN0IHRyaWdnZXJzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLm8tb3ZlcmxheS10cmlnZ2VyJyk7XG5cdFx0Y29uc3Qgb3ZlcmxheXNBcnJheSA9IFtdO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdHJpZ2dlcnMubGVuZ3RoOyB0KyspIHtcblx0XHRcdC8vIFRoZXJlIGNhbiBvbmx5IGJlIG9uZSBvdmVybGF5IHBlciB0cmlnZ2VyIHdoZW4gc2V0IGRlY2xhcmF0aXZlbHksIHNvIHRoZSBmaXJzdCB0cmlnZ2VyIGZvdW5kIGZvciBhIGdpdmVuIG92ZXJsYXkgd2lsbCBiZSB0aGUgb25lIHVzZWQgdG8gY3JlYXRlIHRoZSBvdmVybGF5XG5cdFx0XHRpZiAoIW92ZXJsYXlzW3RyaWdnZXJzW3RdLmdldEF0dHJpYnV0ZSgnZGF0YS1vLW92ZXJsYXktaWQnKV0pIHtcblx0XHRcdFx0b3ZlcmxheXNBcnJheS5wdXNoKFxuXHRcdFx0XHRcdG5ldyBPdmVybGF5KFxuXHRcdFx0XHRcdFx0dHJpZ2dlcnNbdF0uZ2V0QXR0cmlidXRlKCdkYXRhLW8tb3ZlcmxheS1pZCcpLFxuXHRcdFx0XHRcdFx0Z2V0T3B0aW9uc0Zyb21UcmlnZ2VyKHRyaWdnZXJzW3RdKVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb3ZlcmxheXNBcnJheTtcblx0fVxuXG5cdHN0YXRpYyBkZXN0cm95KCkge1xuXHRcdGNvbnN0IG92ZXJsYXlJZHMgPSBPYmplY3Qua2V5cyhvdmVybGF5cyk7XG5cdFx0b3ZlcmxheUlkcy5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0b3ZlcmxheXNbaWRdLmRlc3Ryb3koKTtcblx0XHR9KTtcblx0fVxuXG5cdHN0YXRpYyBnZXRPdmVybGF5cygpIHtcblx0XHRyZXR1cm4gb3ZlcmxheXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT3ZlcmxheTtcbiIsIi8qKlxuKlxuKiBEZWJvdW5jZXMgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgYWZ0ZXIgbiBtaWxsaXNlY29uZHNcbiogd2l0aG91dCBpdCBub3QgYmVpbmcgY2FsbGVkXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLmRlYm91bmNlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIERlYm91bmNlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuLyoqXG4qXG4qIFRocm90dGxlIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbipcbiogQGV4YW1wbGVcbiogVXRpbHMudGhyb3R0bGUobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gVGhyb3R0bGVkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aW1lb3V0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0ZGVib3VuY2UsXG5cdHRocm90dGxlXG59O1xuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzJztcblxubGV0IGRlYnVnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGJyb2FkY2FzdChldmVudFR5cGUsIGRhdGEsIHRhcmdldCkge1xuXHR0YXJnZXQgPSB0YXJnZXQgfHwgZG9jdW1lbnQuYm9keTtcblxuXHRpZiAoZGVidWcpIHtcblx0XHRjb25zb2xlLmxvZygnby12aWV3cG9ydCcsIGV2ZW50VHlwZSwgZGF0YSk7XG5cdH1cblxuXHR0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29WaWV3cG9ydC4nICsgZXZlbnRUeXBlLCB7XG5cdFx0ZGV0YWlsOiBkYXRhLFxuXHRcdGJ1YmJsZXM6IHRydWVcblx0fSkpO1xufVxuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQuXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIGhlaWdodC5cbiogQHJldHVybiB7bnVtYmVyfVxuKi9cbmZ1bmN0aW9uIGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbn1cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgd2lkdGguXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoXG4qIEByZXR1cm4ge251bWJlcn1cbiovXG5mdW5jdGlvbiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbn1cblxuLyoqXG4gKiBWaWV3cG9ydCBzaXplLlxuICogQHR5cGVkZWYge09iamVjdH0gU2l6ZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoXG4gKi9cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgd2lkdGggYW5kIGhlaWdodC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGgvaGVpZ2h0LlxuKiBAcmV0dXJuIHtTaXplfVxuKi9cbmZ1bmN0aW9uIGdldFNpemUoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpLFxuXHRcdHdpZHRoOiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKVxuXHR9O1xufVxuXG4vKipcbiAqIFNjcm9sbCBwb3NpdGlvbi5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNjcm9sbFBvc2l0aW9uXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0IC0gYGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0YFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoIC0gYGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGhgXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGVmdCAtIGB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFhgXG4gKiBAcHJvcGVydHkge251bWJlcn0gdG9wIC0gYHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWWBcbiAqL1xuXG4vKipcbiAqIEByZXR1cm4ge1Njcm9sbFBvc2l0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRTY3JvbGxQb3NpdGlvbigpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LFxuXHRcdHdpZHRoOiBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLFxuXHRcdGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCxcblx0XHR0b3A6IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWVxuXHR9O1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3N0cmluZ30gLSAncG9ydHJhaXQnIG9yICdsYW5kc2NhcGUnXG4gKi9cbmZ1bmN0aW9uIGdldE9yaWVudGF0aW9uKCkge1xuXHRjb25zdCBvcmllbnRhdGlvbiA9IHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb247XG5cdGlmIChvcmllbnRhdGlvbikge1xuXHRcdHJldHVybiB0eXBlb2Ygb3JpZW50YXRpb24gPT09ICdzdHJpbmcnID9cblx0XHRcdG9yaWVudGF0aW9uLnNwbGl0KCctJylbMF0gOlxuXHRcdFx0b3JpZW50YXRpb24udHlwZS5zcGxpdCgnLScpWzBdO1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKSB7XG5cdFx0cmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IHBvcnRyYWl0KScpLm1hdGNoZXMgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGdldEhlaWdodCgpID49IGdldFdpZHRoKCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtib29sZWFufSAtIHRydWUgaWYgdGhlIHZpZXdwb3J0IGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VmlzaWJpbGl0eSgpIHtcblx0cmV0dXJuIGRvY3VtZW50LmhpZGRlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24oKSB7XG5cdFx0ZGVidWcgPSB0cnVlO1xuXHR9LFxuXHRicm9hZGNhc3QsXG5cdGdldFdpZHRoLFxuXHRnZXRIZWlnaHQsXG5cdGdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5LFxuXHRnZXRPcmllbnRhdGlvbixcblx0ZGVib3VuY2U6IFV0aWxzLmRlYm91bmNlLFxuXHR0aHJvdHRsZTogVXRpbHMudGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi9zcmMvdXRpbHMuanMnO1xuXG5jb25zdCB0aHJvdHRsZSA9IHV0aWxzLnRocm90dGxlO1xuY29uc3QgZGVib3VuY2UgPSB1dGlscy5kZWJvdW5jZTtcblxuY29uc3QgbGlzdGVuZXJzID0ge307XG5jb25zdCBpbnRlcnZhbHMgPSB7XG5cdHJlc2l6ZTogMTAwLFxuXHRvcmllbnRhdGlvbjogMTAwLFxuXHR2aXNpYmlsaXR5OiAxMDAsXG5cdHNjcm9sbDogMTAwXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgdG8gdGhyb3R0bGUgZm9yIHRoaXMgZHVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gaW50ZXJ2YWwgLSBUaGUgZHVyYXRpb24gdG8gdGhyb3R0bGUgaW4gbXMuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiBcdCAgIC8vIHRocm90dGxlIGZvciBkaWZmZXJlbnQgZXZlbnRzIGF0IGRpZmZlcmVudCBkdXJhdGlvbnNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCAxMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgMzAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgMzApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIDMwKVxuICogXHRcdC8vIHRocm90dGxlIGFsbCBldmVudHMgYXQgMzBtc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoMzApO1xuICovXG5mdW5jdGlvbiBzZXRUaHJvdHRsZUludGVydmFsKGV2ZW50VHlwZSwgaW50ZXJ2YWwpIHtcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInKSB7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgYXJndW1lbnRzWzBdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCBhcmd1bWVudHNbMV0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgYXJndW1lbnRzWzJdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgYXJndW1lbnRzWzNdKTtcblx0fSBlbHNlIGlmIChpbnRlcnZhbCkge1xuXHRcdGludGVydmFsc1tldmVudFR5cGVdID0gaW50ZXJ2YWw7XG5cdH1cbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9SZXNpemUoKSB7XG5cdGlmIChsaXN0ZW5lcnMucmVzaXplKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Jlc2l6ZScsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMucmVzaXplKTtcblxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5yZXNpemUgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub09yaWVudGF0aW9uKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMub3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnb3JpZW50YXRpb25jaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ29yaWVudGF0aW9uJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbigpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLm9yaWVudGF0aW9uKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMub3JpZW50YXRpb24gPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Zpc2liaWxpdHkoKSB7XG5cblx0aWYgKGxpc3RlbmVycy52aXNpYmlsaXR5KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Zpc2liaWxpdHknLCB7XG5cdFx0XHRoaWRkZW46IHV0aWxzLmdldFZpc2liaWxpdHkoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy52aXNpYmlsaXR5KTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXG5cdGxpc3RlbmVycy52aXNpYmlsaXR5ID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9TY3JvbGwoKSB7XG5cblx0aWYgKGxpc3RlbmVycy5zY3JvbGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnc2Nyb2xsJztcblx0Y29uc3QgaGFuZGxlciA9IHRocm90dGxlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0Y29uc3Qgc2Nyb2xsUG9zID0gdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Njcm9sbCcsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRzY3JvbGxIZWlnaHQ6IHNjcm9sbFBvcy5oZWlnaHQsXG5cdFx0XHRzY3JvbGxMZWZ0OiBzY3JvbGxQb3MubGVmdCxcblx0XHRcdHNjcm9sbFRvcDogc2Nyb2xsUG9zLnRvcCxcblx0XHRcdHNjcm9sbFdpZHRoOiBzY3JvbGxQb3Mud2lkdGgsXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMuc2Nyb2xsKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMuc2Nyb2xsID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50KHMpLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0byBzdGFydCBsaXN0ZW5pbmcgZm9yLiBPbmUgb2YgYHJlc2l6ZWAsIGBzY3JvbGxgLCBgb3JpZW50YXRpb25gLCBgdmlzaWJpbGl0eWAgb3IgYGFsbGAuXG4gKiBAZXhhbXBsZVxuICogXHRcdC8vIFN0YXJ0IGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ2FsbCcpO1xuICpcbiAqIFx0XHQvLyBJdCBpcyBub3cgcG9zc2libGUgdG8gbGlzdGVuIGZvciBkZWJvdW5jZSBvLXZpZXdwb3J0IGV2ZW50cyBzdWNoIGFzIGBvVmlld3BvcnQub3JpZW50YXRpb25gLlxuICogICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC5vcmllbnRhdGlvbicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gKiAgICAgIFx0Y29uc29sZS5sb2coZXZlbnQudHlwZSk7IC8vIG9WaWV3cG9ydC5vcmllbnRhdGlvblxuICogICAgICB9KTtcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdyZXNpemUnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Jlc2l6ZSgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Njcm9sbCcgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvU2Nyb2xsKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAnb3JpZW50YXRpb24nIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub09yaWVudGF0aW9uKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAndmlzaWJpbGl0eScgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvVmlzaWJpbGl0eSgpO1xuXHR9XG59XG5cbi8qKlxuICogU3RvcCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50KHMpLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0byBzdG9wIGxpc3RlbmluZyBmb3IuIE9uZSBvZiBgcmVzaXplYCwgYHNjcm9sbGAsIGBvcmllbnRhdGlvbmAsIGB2aXNpYmlsaXR5YCBvciBgYWxsYC5cbiAqIEBleGFtcGxlXG4gKiBcdFx0Ly8gU3RhcnQgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygnYWxsJyk7XG4gKiBcdFx0Ly8gV2UncmUgZG9uZS4gU3RvcCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0LnN0b3BMaXN0ZW5pbmdUbygnYWxsJyk7XG4gKi9cbmZ1bmN0aW9uIHN0b3BMaXN0ZW5pbmdUbyhldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goc3RvcExpc3RlbmluZ1RvKTtcblx0fSBlbHNlIGlmIChsaXN0ZW5lcnNbZXZlbnRUeXBlXSkge1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyc1tldmVudFR5cGVdLmV2ZW50VHlwZSwgbGlzdGVuZXJzW2V2ZW50VHlwZV0uaGFuZGxlcik7XG5cdFx0ZGVsZXRlIGxpc3RlbmVyc1tldmVudFR5cGVdO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uICgpIHtcblx0XHR1dGlscy5kZWJ1ZygpO1xuXHR9LFxuXHRsaXN0ZW5Ubyxcblx0c3RvcExpc3RlbmluZ1RvLFxuXHRzZXRUaHJvdHRsZUludGVydmFsLFxuXHRnZXRPcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24sXG5cdGdldFNpemU6IHV0aWxzLmdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uOiB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eTogdXRpbHMuZ2V0VmlzaWJpbGl0eVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcblx0dW5DYXBpdGFsaXNlOiBmdW5jdGlvbihzdHIpIHtcblx0XHRyZXR1cm4gc3RyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyLnN1YnN0cigxKTtcblx0fSxcblxuXHRjYXBpdGFsaXNlOiBmdW5jdGlvbihzdHIpIHtcblx0XHRyZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnN1YnN0cigxKTtcblx0fSxcblxuXHRjb3B5Q29udGVudEZyb21FbGVtZW50OiBmdW5jdGlvbihjb250ZW50LCBjYWxsYmFjaykge1xuXHRcdGNvbnN0IGh0bWwgPSBjb250ZW50Lm5vZGVOYW1lID09PSAnU0NSSVBUJyA/IGNvbnRlbnQuaW5uZXJIVE1MIDogY29udGVudC5vdXRlckhUTUw7XG5cdFx0Y2FsbGJhY2soaHRtbCk7XG5cdH0sXG5cblx0Y29weUNvbnRlbnRGcm9tVXJsOiBmdW5jdGlvbih1cmwsIGNhbGxiYWNrKSB7XG5cdFx0Y29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0eGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyAvLyBlc2xpbnQgY29tcGxhaW5zIG9mIGUgbm90IGJlaW5nIHVzZWRcblx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soJ0NvbnRlbnQgZmFpbGVkIHRvIGxvYWQgY29ycmVjdGx5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdHhoci5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdcIm8tb3ZlcmxheSBlcnJvclwiOiBGZXRjaGluZyBjb250ZW50IGZyb20gJyArIHVybCArICcgZmFpbGVkIHdpdGggZXJycm9yICcgKyBlKTtcblx0XHR9O1xuXG5cdFx0eGhyLnNlbmQobnVsbCk7XG5cdH0sXG5cblx0b3B0aW9uc0Zyb21LZXk6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdHMpIHtcblx0XHRjb25zdCBkYXNoSW5kZXggPSBrZXkuaW5kZXhPZignLScpO1xuXHRcdGlmIChkYXNoSW5kZXggPT09IC0xKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJZiBpdCdzIGEgSlNPTiwgYSBib29sZWFuIG9yIGEgbnVtYmVyLCB3ZSB3YW50IGl0IHN0b3JlZCBsaWtlIHRoYXQsIGFuZCBub3QgYXMgYSBzdHJpbmdcblx0XHRcdFx0Ly8gV2UgYWxzbyByZXBsYWNlIGFsbCAnIHdpdGggXCIgc28gSlNPTiBzdHJpbmdzIGFyZSBwYXJzZWQgY29ycmVjdGx5XG5cdFx0XHRcdG9wdHNba2V5XSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0b3B0c1trZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEtleSB0aGF0IGhvbGRzIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGEgdmFsdWVcblx0XHRcdGNvbnN0IHN1YktleSA9IGtleS5zdWJzdHIoMCwgZGFzaEluZGV4KTtcblxuXHRcdFx0Ly8gSWYgc3ViLW9iamVjdCBkb2Vzbid0IGV4aXN0IGFscmVhZHksIGNyZWF0ZSBpdFxuXHRcdFx0aWYgKCFvcHRzW3N1YktleV0pe1xuXHRcdFx0XHRvcHRzW3N1YktleV0gPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUnVuIGZ1bmN0aW9uIGFnYWluIHN0YXJ0aW5nIHdpdGggdGhlIHJlc3Qgb2YgdGhlIGtleVxuXHRcdFx0b3B0c1tzdWJLZXldID0gdGhpcy5vcHRpb25zRnJvbUtleShrZXkuc3Vic3RyKGRhc2hJbmRleCsxKSwgdmFsdWUsIG9wdHNbc3ViS2V5XSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9wdHM7XG5cdH0sXG5cblx0Ly8gQ29kZSBiYXNlZCBvbiB0aGlzIGFydGljbGUgdG8gZ2V0IGNvb3JkaW5hdGVzIGluZGVwZW5kZW50IG9mIHNjcm9sbDogaHR0cDovL2phdmFzY3JpcHQuaW5mby90dXRvcmlhbC9jb29yZGluYXRlc1xuXHRnZXRPZmZzZXRSZWN0OiBmdW5jdGlvbihlKSB7XG5cdFx0Y29uc3QgZUNsaWVudFJlY3QgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0Y29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cdFx0Y29uc3QgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHRcdC8vIGRvY0VsZW0uc2Nyb2xsVG9wL0xlZnQgZm9yIElFLCB1c2UgYm9keSBhcyBhIGxhc3QgcmVzb3J0XG5cdFx0Y29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuXHRcdGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcblxuXHRcdC8vIElFIHNvbWV0aW1lcyBzaGlmdHMgdGhlIHVwcGVyIGxlZnQgY29ybmVyXG5cdFx0Y29uc3QgY2xpZW50VG9wID0gZG9jRWxlbS5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcblx0XHRjb25zdCBjbGllbnRMZWZ0ID0gZG9jRWxlbS5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdC8vIElFOCBkb2Vzbid0IHN1cHBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IGFuZCAud2VpZ2h0XG5cdFx0XHR3aWR0aDogZUNsaWVudFJlY3Qud2lkdGggfHwgZUNsaWVudFJlY3QucmlnaHQgLSBlQ2xpZW50UmVjdC5sZWZ0LFxuXHRcdFx0aGVpZ2h0OiBlQ2xpZW50UmVjdC5oZWlnaHQgfHwgZUNsaWVudFJlY3QuYm90dG9tIC0gZUNsaWVudFJlY3QudG9wLFxuXHRcdFx0dG9wOiBlQ2xpZW50UmVjdC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3AsXG5cdFx0XHRsZWZ0OiBlQ2xpZW50UmVjdC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnRcblx0XHR9O1xuXHR9XG59O1xuIiwiXG5pbXBvcnQgT3ZlcmxheSBmcm9tICcuL3NyYy9qcy9vdmVybGF5LmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24oKSB7XG5cdE92ZXJsYXkuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgT3ZlcmxheTtcbiIsImltcG9ydCBPdmVybGF5IGZyb20gJy4uLy4uJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgbXlPdmVybGF5ID0gbmV3IE92ZXJsYXkoJ2RlbW8tb3ZlcmxheScsIHtcblx0XHRuZXN0ZWQ6ICd0cnVlJyxcblx0XHRwYXJlbnRub2RlOiAnLnJpZ2h0LXJhaWwnLFxuXHRcdG1vZGFsOiBmYWxzZSxcblx0XHRjb21wYWN0OiB0cnVlLFxuXHRcdHByZXZlbnRjbG9zaW5nOiBmYWxzZSxcblx0XHRhZGRjbG9zZWJ0bjogdHJ1ZSxcblx0XHRoZWFkaW5nOiB7IHRpdGxlOiBcIlRha2UgYSBzdXJ2ZXlcIiwgdmlzdWFsbHloaWRldGl0bGU6IHRydWUgfSxcblx0XHRodG1sOiBgPGRpdiBjbGFzcz0nZGVtby1vdmVybGF5LWNvbnRlbnQnPjxzcGFuIGNsYXNzPSd0aXRsZSc+SG93IGRvIHlvdSByYXRlIEZULmNvbT88L3NwYW4+PHA+VGFrZSBvdXIgc2hvcnQgc3VydmV5IGFuZCBiZSBpbiB3aXRoIGEgY2hhbmNlIHRvIHdpbiDCozI1MDwvcD5cblx0XHRcdFx0XHQ8YnV0dG9uIG9uY2xpY2s9XCJ3aW5kb3cubG9jYXRpb24ucmVsb2FkKHRydWUpXCIgY2xhc3M9XCJvLWJ1dHRvbnMgby1idXR0b25zLS1zZWNvbmRhcnlcIj5UYWtlIHN1cnZleTwvYnV0dG9uPlxuXHRcdFx0XHRcdDxwIGNsYXNzPVwic21hbGxcIj5UJkNzIGFwcGx5PC9wPjwvZGl2PmBcblx0fSk7XG5cblx0bXlPdmVybGF5Lm9wZW4oKTtcbn0pO1xuIl19