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
  }); // src/js/utils/events.js


  var coralEventMap = new Map([["ready", {
    oComments: "oComments.ready",
    oTracking: "ready"
  }], ["loginPrompt", {
    oComments: "oComments.loginPrompt"
  }], ["createComment.success", {
    oComments: "oComments.postComment",
    oTracking: "post"
  }], ["createComment.error", {
    oComments: "oComments.errorComment",
    oTracking: "post-error"
  }], ["createCommentReply.success", {
    oComments: "oComments.replyComment",
    oTracking: "reply"
  }], ["editComment.success", {
    oComments: "oComments.editComment",
    oTracking: "edit"
  }], ["createCommentReaction.success", {
    oComments: "oComments.likeComment",
    oTracking: "like"
  }], ["reportComment.success", {
    oComments: "oComments.reportComment",
    oTracking: "report"
  }], ["ignoreUser.success", {
    oComments: "oComments.ignoreUser",
    oTracking: "ignore-user"
  }]]);
  var events_default = {
    coralEventMap: coralEventMap
  }; // ../o-overlay/src/js/overlay.js

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
  }; // ../o-overlay/src/js/utils.js

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
  }; // ../o-overlay/src/js/overlay.js

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

  var overlay_default = Overlay; // ../o-overlay/main.js

  var constructAll = function constructAll() {
    overlay_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default2 = overlay_default; // src/js/utils/display-name.js

  var form = "<form id=\"o-comments-displayname-form\" class=\"o-forms o-forms o-comments__displayname-form\">\n\t\t\t<label for=\"o-comments-displayname-input\" class=\"o-forms-field o-comments__displayname-field\">\n\t\t\t\t<span class=\"o-forms-title\">Display name</span>\n\t\t\t</label>\n\t\t\t<div class=\"o-comments__displayname-container\">\n\t\t\t\t<span class=\"o-forms-input o-forms-input--text o-comments__displayname-input\">\n\t\t\t\t\t<input id=\"o-comments-displayname-input\" type=\"text\" name=\"text\" value=\"\" required=\"\">\n\t\t\t\t</span>\n\t\t\t\t<button type=\"submit\" class=\"o-comments__displayname-submit\">Save</button>\n\t\t\t</div>\n\t\t\t<span id=\"o-comments-displayname-error\" class=\"o-forms-input__error o-comments__displayname-error\" aria-live=\"assertive\"></span>\n\t</form>\n</form>";

  var isUnique = function isUnique(displayName) {
    var url = "https://comments-api.ft.com/displayname/isavailable/".concat(encodeURIComponent(displayName));
    return fetch(url, {
      method: "GET"
    }).then(function (response) {
      return response.json();
    }).then(function (_ref) {
      var available = _ref.available;
      return available;
    });
  };

  var findInvalidCharacters = function findInvalidCharacters(displayName) {
    var matchInvalidCharacters = /[^0-9a-z!#$%'`()*+,\-.\/:;=@[\]\^_{}\|\s]/gi;
    var matchingCharacters = displayName.match(matchInvalidCharacters);
    var uniqueMatchingCharacters = matchingCharacters && matchingCharacters.length ? matchingCharacters.filter(function (character, position) {
      return matchingCharacters.indexOf(character) === position;
    }) : [];
    return uniqueMatchingCharacters.length ? uniqueMatchingCharacters.join("") : false;
  };

  var prompt = function prompt() {
    var overlay = new main_default2("displayName", {
      html: form,
      class: "o-comments__displayname-prompt",
      compact: true,
      heading: {
        title: "Choose a commenting display name"
      }
    });
    overlay.open();
    return overlay;
  };

  var validation = function validation(displayName) {
    return new Promise(function (resolve, reject) {
      if (!displayName) {
        return reject(new Error("Empty display name"));
      }

      var invalidCharacters = findInvalidCharacters(displayName);

      if (invalidCharacters) {
        return reject(new Error("The display name contains the following invalid characters: ".concat(invalidCharacters)));
      } else {
        isUnique(displayName).then(function (isUnique2) {
          if (!isUnique2) {
            return reject(new Error("Unfortunately that display name is already taken"));
          } else {
            return resolve(displayName);
          }
        }).catch(function () {
          var apiError = new Error("Sorry, we are unable to update display names. Please try again later.");
          apiError.name = "CommentsApiError";
          return reject(apiError);
        });
      }
    });
  };

  var promptValidation = function promptValidation(event) {
    event.preventDefault();
    return new Promise(function (resolve) {
      var displayNameForm = event.srcElement;
      var input = displayNameForm.querySelector("input");
      var displayName = input.value.trim();
      var errorMessage = displayNameForm.querySelector("#o-comments-displayname-error");
      errorMessage.innerText = "";
      displayNameForm.classList.remove("o-forms-input--invalid");
      return validation(displayName).then(function (displayName2) {
        return resolve(displayName2);
      }).catch(function (error) {
        errorMessage.innerText = error.message;
        displayNameForm.classList.add("o-forms-input--invalid");

        if (error.name === "CommentsApiError") {
          throw error;
        }
      });
    });
  };

  var display_name_default = {
    prompt: prompt,
    validation: validation,
    promptValidation: promptValidation
  }; // src/js/utils/auth.js

  var auth_default = {
    fetchJsonWebToken: function fetchJsonWebToken() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = new URL("https://comments-api.ft.com/user/auth/");

      if (options.displayName) {
        url.searchParams.append("displayName", options.displayName);
      }

      if (options.useStagingEnvironment) {
        url.searchParams.append("staging", "1");
      }

      return fetch(url, {
        credentials: "include"
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 409) {
            return {
              userHasValidSession: true
            };
          }

          return {
            userHasValidSession: false
          };
        }
      });
    }
  }; // src/js/utils/purge-jwt-cache.js

  function purgeJwtCache() {
    var url = "https://comments-api.ft.com/user/auth";
    return fetch(url, {
      method: "PURGE",
      credentials: "include"
    });
  } // src/js/stream.js


  var Stream = /*#__PURE__*/function () {
    "use strict";

    function Stream(streamEl) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Stream);

      this.streamEl = streamEl || document;
      this.options = opts;
      this.eventSeenTimes = {};
      this.useStagingEnvironment = Boolean(opts.useStagingEnvironment);
    }

    _createClass(Stream, [{
      key: "init",
      value: function init() {
        var _this3 = this;

        var renderAndAuthenticate = function renderAndAuthenticate(displayName) {
          return Promise.all([_this3.renderComments(), _this3.authenticateUser(displayName)]).then(function () {
            _this3.login();
          });
        };

        return display_name_default.validation(this.options.displayName).then(function (displayName) {
          return renderAndAuthenticate(displayName);
        }).catch(function () {
          return renderAndAuthenticate();
        });
      }
    }, {
      key: "login",
      value: function login() {
        if (this.authenticationToken) {
          this.embed.login(this.authenticationToken);

          if (this.displayName) {
            this.renderSignedInMessage();
          }
        }
      }
    }, {
      key: "authenticateUser",
      value: function authenticateUser(displayName) {
        var _this4 = this;

        var fetchOptions = {
          useStagingEnvironment: this.useStagingEnvironment
        };

        if (displayName) {
          fetchOptions.displayName = displayName;
        }

        return auth_default.fetchJsonWebToken(fetchOptions).then(function (response) {
          _this4.displayName = response.displayName;

          if (response.token) {
            _this4.authenticationToken = response.token;
          } else {
            _this4.userHasValidSession = response.userHasValidSession;
          }
        }).catch(function () {
          return false;
        });
      }
    }, {
      key: "renderComments",
      value: function renderComments() {
        var _this5 = this;

        return new Promise(function (resolve) {
          try {
            var cacheBuster = "cachebust=20210806";
            var rootUrl = _this5.useStagingEnvironment ? "https://ft.staging.coral.coralproject.net" : "https://ft.coral.coralproject.net";
            var scriptElement = document.createElement("script");
            scriptElement.src = "".concat(rootUrl, "/assets/js/embed.js?").concat(cacheBuster);

            scriptElement.onload = function () {
              _this5.embed = Coral.createStreamEmbed({
                id: _this5.streamEl.id,
                storyURL: _this5.options.articleUrl,
                storyID: _this5.options.articleId,
                rootURL: rootUrl,
                autoRender: true,
                events: function events(_events) {
                  _events.onAny(function (name, data) {
                    _this5.publishEvent({
                      name: name,
                      data: data
                    });
                  });
                }
              });
              resolve();
            };

            _this5.streamEl.parentNode.appendChild(scriptElement);

            if (_this5.useStagingEnvironment) {
              var stagingWarning = document.createElement("div");
              stagingWarning.innerHTML = "\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"o-comments__staging-message-container\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"o-comments__staging-message-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"o-comments__staging-message\">You are on the staging environment for Comments</p>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>";

              _this5.streamEl.parentNode.insertBefore(stagingWarning, _this5.streamEl);
            }

            document.dispatchEvent(new Event("oCommentsReady"));
          } catch (error) {
            resolve();
          }
        });
      }
    }, {
      key: "displayNamePrompt",
      value: function displayNamePrompt() {
        var _this6 = this;

        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$purgeCacheAfter = _ref2.purgeCacheAfterCompletion,
            purgeCacheAfterCompletion = _ref2$purgeCacheAfter === void 0 ? false : _ref2$purgeCacheAfter;

        var overlay = display_name_default.prompt();

        var onOverlayReady = function onOverlayReady(event) {
          var sourceOverlay = event.srcElement;
          var displayNameForm = sourceOverlay.querySelector("#o-comments-displayname-form");

          if (displayNameForm) {
            displayNameForm.addEventListener("submit", function (event2) {
              display_name_default.promptValidation(event2).then(function (displayName) {
                overlay.close();

                _this6.authenticateUser(displayName).then(function () {
                  _this6.login();
                });

                if (purgeCacheAfterCompletion) {
                  purgeJwtCache();
                }
              });
            });
          }
        };

        document.addEventListener("oOverlay.ready", onOverlayReady);

        var onOverlayClosed = function onOverlayClosed() {
          overlay.context.removeEventListener("oLayers.close", onOverlayClosed);
          document.removeEventListener("oOverlay.ready", onOverlayReady);
          overlay.destroy();
        };

        overlay.context.addEventListener("oLayers.close", onOverlayClosed);
      }
    }, {
      key: "publishEvent",
      value: function publishEvent(_ref3) {
        var name = _ref3.name,
            _ref3$data = _ref3.data,
            data = _ref3$data === void 0 ? {} : _ref3$data;
        var _data$success = data.success;
        _data$success = _data$success === void 0 ? {} : _data$success;
        var status = _data$success.status,
            error = data.error;

        if (name === "loginPrompt" && this.userHasValidSession) {
          return this.displayNamePrompt();
        }

        var mappedEvent = events_default.coralEventMap.get(name);

        if (mappedEvent) {
          var now = Number(new Date());
          var delayInMilliseconds = 100;
          var eventHasntBeenSeenRecently = !this.eventSeenTimes[mappedEvent.oComments] || now > this.eventSeenTimes[mappedEvent.oComments] + delayInMilliseconds;

          if (eventHasntBeenSeenRecently) {
            this.eventSeenTimes[mappedEvent.oComments] = now;
            var oCommentsEventOptions = {
              bubbles: true
            };

            if (error) {
              oCommentsEventOptions.detail = {
                error: error
              };
            }

            var oCommentsEvent = new CustomEvent(mappedEvent.oComments, oCommentsEventOptions);
            this.streamEl.dispatchEvent(oCommentsEvent);

            if (mappedEvent.oTracking && !this.options.disableOTracking) {
              var oTrackingEventOptions = {
                bubbles: true,
                detail: {
                  category: "comment",
                  action: mappedEvent.oTracking,
                  coral: true,
                  isWithheld: status === "SYSTEM_WITHHELD"
                }
              };

              if (error) {
                oTrackingEventOptions.detail.error = error;
              }

              var oTrackingEvent = new CustomEvent("oTracking.event", oTrackingEventOptions);
              document.body.dispatchEvent(oTrackingEvent);
            }
          }
        }
      }
    }, {
      key: "renderSignedInMessage",
      value: function renderSignedInMessage() {
        var _this7 = this;

        var editButtonId = "o-comments-edit-button--".concat(this.streamEl.id);
        var signedInMessage = document.createElement("div");
        signedInMessage.classList.add("o-comments__signed-in-container");
        signedInMessage.innerHTML = "\n\t\t\t\t\t\t\t\t\t<p class=\"o-comments__signed-in-text\">Signed in as\n\t\t\t\t\t\t\t\t\t\t<span class=\"o-comments__signed-in-inner-text\"></span>\n\t\t\t\t\t\t\t\t\t\t<button id=\"".concat(editButtonId, "\" class=\"o-comments__edit-display-name\">\n\t\t\t\t\t\t\t\t\t\t\tEdit <span class=\"o-comments__edit-display-name-descriptive\">commenting display name</span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t</p>");
        signedInMessage.querySelector(".o-comments__signed-in-inner-text").innerText = this.displayName;
        var oldSignedInMessage = this.streamEl.parentNode.querySelector(".o-comments__signed-in-container");

        if (oldSignedInMessage) {
          oldSignedInMessage.remove();
        }

        this.streamEl.parentNode.insertBefore(signedInMessage, this.streamEl);

        document.getElementById(editButtonId).onclick = function () {
          _this7.displayNamePrompt({
            purgeCacheAfterCompletion: true
          });
        };
      }
    }]);

    return Stream;
  }();

  var stream_default = Stream; // src/js/count.js

  var Count = /*#__PURE__*/function () {
    "use strict";

    function Count(countEl) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Count);

      this.countEl = countEl;
      this.articleId = opts.articleId;
      this.useStagingEnvironment = Boolean(opts.useStagingEnvironment);
    }

    _createClass(Count, [{
      key: "renderCount",
      value: function renderCount() {
        var _this8 = this;

        if (this.countEl && !(this.countEl instanceof HTMLElement)) {
          this.countEl = document.querySelector(this.countEl);
        }

        if (!this.countEl) {
          throw new Error("Element must be a HTMLElement");
        }

        return Count.fetchCount(this.articleId, this.useStagingEnvironment).then(function (count) {
          _this8.countEl.textContent = count;
          var countLabel = Count.getCountLabel(count);

          _this8.countEl.setAttribute("aria-label", countLabel);
        });
      }
    }], [{
      key: "getCountLabel",
      value: function getCountLabel(count) {
        if (count === 1) {
          return "There is 1 comment, click to go to the comment section.";
        } else {
          return "There are ".concat(count, " comments, click to go to the comment section.");
        }
      }
    }, {
      key: "fetchCount",
      value: function fetchCount(id, useStaging) {
        var url = "https://comments-api.ft.com/story/count/".concat(id) + (useStaging ? "?staging=1" : "");
        return fetch(url).then(function (res) {
          return res.json();
        }).then(function (json) {
          return json.commentCount;
        }).catch(function (error) {
          throw new Error("Error with fetching comment count: ".concat(error.message));
        });
      }
    }]);

    return Count;
  }();

  var count_default = Count; // src/js/comments.js

  var Comments = /*#__PURE__*/function () {
    "use strict";

    function Comments(rootEl, opts) {
      _classCallCheck(this, Comments);

      this.options = Object.assign({}, {}, opts || Comments.getDataAttributes(rootEl));
      var isCount = rootEl.getAttribute("data-o-comments-count") === "true";

      if (!this.options.articleId) {
        console.error("Missing required configuration option: `articleId`. Documentation on how to construct an instance of Comments is at https://registry.origami.ft.com/components/o-comments@7.7.3/readme#constructing-an-o-comments");
      }

      if (!this.options.articleUrl) {
        console.error("Missing required configuration option: `articleUrl`. Documentation on how to construct an instance of Comments is at https://registry.origami.ft.com/components/o-comments@7.7.3/readme#constructing-an-o-comments");
      }

      if (!this.options.title) {
        console.error("Missing required configuration option: `title`. Documentation on how to construct an instance of Comments is at https://registry.origami.ft.com/components/o-comments@7.7.3/readme#constructing-an-o-comments");
      }

      if (isCount) {
        var count = new count_default(rootEl, this.options);
        count.renderCount();
        return count;
      } else {
        var stream = new stream_default(rootEl, this.options);
        stream.init();
        return stream;
      }
    }

    _createClass(Comments, null, [{
      key: "getCount",
      value: function getCount(id) {
        return count_default.fetchCount(id);
      }
    }, {
      key: "getDataAttributes",
      value: function getDataAttributes(rootEl) {
        if (!(rootEl instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(rootEl.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oComments(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = rootEl.dataset[key];

          try {
            options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
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

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-comments]")) {
          return new Comments(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-comments"]'), function (rootEl2) {
          return new Comments(rootEl2, opts);
        });
      }
    }]);

    return Comments;
  }();

  var comments_default = Comments; // main.js

  var constructAll2 = function constructAll2() {
    comments_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll2);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll2);
  var main_default3 = comments_default; // demos/src/demo.js

  main_default3.init();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvdXRpbHMvZXZlbnRzLmpzIiwiLi4vby1vdmVybGF5L3NyYy9qcy9vdmVybGF5LmpzIiwiLi4vLi4vbGlicmFyaWVzL28tdXRpbHMvbWFpbi5qcyIsIi4uL28tdmlld3BvcnQvc3JjL3V0aWxzLmpzIiwiLi4vby12aWV3cG9ydC9tYWluLmpzIiwiLi4vby1vdmVybGF5L3NyYy9qcy91dGlscy5qcyIsIi4uL28tb3ZlcmxheS9tYWluLmpzIiwic3JjL2pzL3V0aWxzL2Rpc3BsYXktbmFtZS5qcyIsInNyYy9qcy91dGlscy9hdXRoLmpzIiwic3JjL2pzL3V0aWxzL3B1cmdlLWp3dC1jYWNoZS5qcyIsInNyYy9qcy9zdHJlYW0uanMiLCJzcmMvanMvY291bnQuanMiLCJzcmMvanMvY29tbWVudHMuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsZUFBQSxHQUFBLFVBQUEsQ0FBQTtBQUFBLGlEQUFBLDhDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7QUFBQTs7QUFFQSxNQUFBLE1BQUEsQ0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFFBQUEsS0FBQSxFQUFPO0FBRG9DLE9BQTdDO0FBR0EsTUFBQSxPQUFBLENBQVEsT0FBUixHQUFrQixLQUFBLENBQWxCOztBQVlBLGVBQUEsU0FBQSxDQUFrQixJQUFsQixFQUF3QjtBQU90QixhQUFLLFdBQUwsR0FBbUIsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFuQjs7QUFFQSxZQUFJLElBQUosRUFBVTtBQUNSLGVBQUssSUFBTCxDQUFVLElBQVY7QUFBVTs7QUFLWixh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QUFBLFlBQWtCLFdBQXBCLENBQUosRUFBc0M7QUFDckMsVUFBQSxNQUFBLEdBQVMsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBVDtBQUFnQzs7QUFFakMsWUFBSSxNQUFBLFlBQWtCLFdBQWxCLElBQWlDLE1BQUEsQ0FBTyxPQUFQLENBQWUsK0JBQWYsQ0FBckMsRUFBc0Y7QUFDckYsaUJBQU8sSUFBSSxRQUFKLENBQWEsTUFBYixFQUFxQixJQUFyQixDQUFQO0FBQTRCOztBQUU3QixlQUFPLEtBQUEsQ0FBTSxJQUFOLENBQVcsTUFBQSxDQUFPLGdCQUFQLENBQXdCLGlDQUF4QixDQUFYLEVBQXVFLFVBQUEsT0FBQTtBQUFBLGlCQUFVLElBQUksUUFBSixDQUFhLE9BQWIsRUFBcUIsSUFBckIsQ0FBVjtBQUFBLFNBQXZFLENBQVA7QUFBNkc7QUFwRi9HOztBQUFBO0FBQUEsS0FBQTs7QUF3RkEsTUFBTyxnQkFBQSxHQUFRLFFBQWYsQzs7QUN6RkEsTUFBTSxhQUFBLEdBQWUsU0FBZixhQUFlLEdBQVk7QUFDaEMsSUFBQSxnQkFBQSxDQUFTLElBQVQ7QUFDQSxJQUFBLFFBQUEsQ0FBUyxtQkFBVCxDQUE2QixvQkFBN0IsRUFBbUQsYUFBbkQ7QUFBbUQsR0FGcEQ7O0FBS0EsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELGFBQWhEO0FBRUEsTUFBTyxhQUFBLEdBQVEsZ0JBQWYsQzs7QUNQQSxFQUFBLGFBQUEsQ0FBUyxJQUFUIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbi8qKlxuICogRE9NIGV2ZW50IGRlbGVnYXRvclxuICpcbiAqIFRoZSBkZWxlZ2F0b3Igd2lsbCBsaXN0ZW5cbiAqIGZvciBldmVudHMgdGhhdCBidWJibGUgdXBcbiAqIHRvIHRoZSByb290IG5vZGUuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge05vZGV8c3RyaW5nfSBbcm9vdF0gVGhlIHJvb3Qgbm9kZSBvciBhIHNlbGVjdG9yIHN0cmluZyBtYXRjaGluZyB0aGUgcm9vdCBub2RlXG4gKi9cbmZ1bmN0aW9uIERlbGVnYXRlKHJvb3QpIHtcbiAgLyoqXG4gICAqIE1haW50YWluIGEgbWFwIG9mIGxpc3RlbmVyXG4gICAqIGxpc3RzLCBrZXllZCBieSBldmVudCBuYW1lLlxuICAgKlxuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIHRoaXMubGlzdGVuZXJNYXAgPSBbe30sIHt9XTtcblxuICBpZiAocm9vdCkge1xuICAgIHRoaXMucm9vdChyb290KTtcbiAgfVxuICAvKiogQHR5cGUgZnVuY3Rpb24oKSAqL1xuXG5cbiAgdGhpcy5oYW5kbGUgPSBEZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlLmJpbmQodGhpcyk7IC8vIENhY2hlIG9mIGV2ZW50IGxpc3RlbmVycyByZW1vdmVkIGR1cmluZyBhbiBldmVudCBjeWNsZVxuXG4gIHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMgPSBbXTtcbn1cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBldmVudHNcbiAqIG9uIHRoZSBwcm92aWRlZCBET00gZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbcm9vdF0gVGhlIHJvb3Qgbm9kZSBvciBhIHNlbGVjdG9yIHN0cmluZyBtYXRjaGluZyB0aGUgcm9vdCBub2RlXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbiAocm9vdCkge1xuICB2YXIgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwO1xuICB2YXIgZXZlbnRUeXBlOyAvLyBSZW1vdmUgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuXG4gIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMV0pIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcFsxXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFswXSkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwWzBdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gSWYgbm8gcm9vdCBvciByb290IGlzIG5vdFxuICAvLyBhIGRvbSBub2RlLCB0aGVuIHJlbW92ZSBpbnRlcm5hbFxuICAvLyByb290IHJlZmVyZW5jZSBhbmQgZXhpdCBoZXJlXG5cblxuICBpZiAoIXJvb3QgfHwgIXJvb3QuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICBkZWxldGUgdGhpcy5yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvKipcbiAgICogVGhlIHJvb3Qgbm9kZSBhdCB3aGljaFxuICAgKiBsaXN0ZW5lcnMgYXJlIGF0dGFjaGVkLlxuICAgKlxuICAgKiBAdHlwZSBOb2RlXG4gICAqL1xuXG5cbiAgdGhpcy5yb290RWxlbWVudCA9IHJvb3Q7IC8vIFNldCB1cCBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG5cbiAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMV0pIHtcbiAgICBpZiAobGlzdGVuZXJNYXBbMV0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzBdKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwWzBdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuY2FwdHVyZUZvclR5cGUgPSBmdW5jdGlvbiAoZXZlbnRUeXBlKSB7XG4gIHJldHVybiBbJ2JsdXInLCAnZXJyb3InLCAnZm9jdXMnLCAnbG9hZCcsICdyZXNpemUnLCAnc2Nyb2xsJ10uaW5kZXhPZihldmVudFR5cGUpICE9PSAtMTtcbn07XG4vKipcbiAqIEF0dGFjaCBhIGhhbmRsZXIgdG8gb25lXG4gKiBldmVudCBmb3IgYWxsIGVsZW1lbnRzXG4gKiB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvcixcbiAqIG5vdyBvciBpbiB0aGUgZnV0dXJlXG4gKlxuICogVGhlIGhhbmRsZXIgZnVuY3Rpb24gcmVjZWl2ZXNcbiAqIHRocmVlIGFyZ3VtZW50czogdGhlIERPTSBldmVudFxuICogb2JqZWN0LCB0aGUgbm9kZSB0aGF0IG1hdGNoZWRcbiAqIHRoZSBzZWxlY3RvciB3aGlsZSB0aGUgZXZlbnRcbiAqIHdhcyBidWJibGluZyBhbmQgYSByZWZlcmVuY2VcbiAqIHRvIGl0c2VsZi4gV2l0aGluIHRoZSBoYW5kbGVyLFxuICogJ3RoaXMnIGlzIGVxdWFsIHRvIHRoZSBzZWNvbmRcbiAqIGFyZ3VtZW50LlxuICpcbiAqIFRoZSBub2RlIHRoYXQgYWN0dWFsbHkgcmVjZWl2ZWRcbiAqIHRoZSBldmVudCBjYW4gYmUgYWNjZXNzZWQgdmlhXG4gKiAnZXZlbnQudGFyZ2V0Jy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIExpc3RlbiBmb3IgdGhlc2UgZXZlbnRzXG4gKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHNlbGVjdG9yIE9ubHkgaGFuZGxlIGV2ZW50cyBvbiBlbGVtZW50cyBtYXRjaGluZyB0aGlzIHNlbGVjdG9yLCBpZiB1bmRlZmluZWQgbWF0Y2ggcm9vdCBlbGVtZW50XG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IGhhbmRsZXIgSGFuZGxlciBmdW5jdGlvbiAtIGV2ZW50IGRhdGEgcGFzc2VkIGhlcmUgd2lsbCBiZSBpbiBldmVudC5kYXRhXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1c2VDYXB0dXJlXSBzZWUgJ3VzZUNhcHR1cmUnIGluIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXQvYWRkRXZlbnRMaXN0ZW5lcj5cbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICB2YXIgcm9vdDtcbiAgdmFyIGxpc3RlbmVyTWFwO1xuICB2YXIgbWF0Y2hlcjtcbiAgdmFyIG1hdGNoZXJQYXJhbTtcblxuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgZXZlbnQgdHlwZTogJyArIGV2ZW50VHlwZSk7XG4gIH0gLy8gaGFuZGxlciBjYW4gYmUgcGFzc2VkIGFzXG4gIC8vIHRoZSBzZWNvbmQgb3IgdGhpcmQgYXJndW1lbnRcblxuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VDYXB0dXJlID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9IC8vIEZhbGxiYWNrIHRvIHNlbnNpYmxlIGRlZmF1bHRzXG4gIC8vIGlmIHVzZUNhcHR1cmUgbm90IHNldFxuXG5cbiAgaWYgKHVzZUNhcHR1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHVzZUNhcHR1cmUgPSB0aGlzLmNhcHR1cmVGb3JUeXBlKGV2ZW50VHlwZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdIYW5kbGVyIG11c3QgYmUgYSB0eXBlIG9mIEZ1bmN0aW9uJyk7XG4gIH1cblxuICByb290ID0gdGhpcy5yb290RWxlbWVudDtcbiAgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwW3VzZUNhcHR1cmUgPyAxIDogMF07IC8vIEFkZCBtYXN0ZXIgaGFuZGxlciBmb3IgdHlwZSBpZiBub3QgY3JlYXRlZCB5ZXRcblxuICBpZiAoIWxpc3RlbmVyTWFwW2V2ZW50VHlwZV0pIHtcbiAgICBpZiAocm9vdCkge1xuICAgICAgcm9vdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHVzZUNhcHR1cmUpO1xuICAgIH1cblxuICAgIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV0gPSBbXTtcbiAgfVxuXG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBudWxsOyAvLyBDT01QTEVYIC0gbWF0Y2hlc1Jvb3QgbmVlZHMgdG8gaGF2ZSBhY2Nlc3MgdG9cbiAgICAvLyB0aGlzLnJvb3RFbGVtZW50LCBzbyBiaW5kIHRoZSBmdW5jdGlvbiB0byB0aGlzLlxuXG4gICAgbWF0Y2hlciA9IG1hdGNoZXNSb290LmJpbmQodGhpcyk7IC8vIENvbXBpbGUgYSBtYXRjaGVyIGZvciB0aGUgZ2l2ZW4gc2VsZWN0b3JcbiAgfSBlbHNlIGlmICgvXlthLXpdKyQvaS50ZXN0KHNlbGVjdG9yKSkge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yO1xuICAgIG1hdGNoZXIgPSBtYXRjaGVzVGFnO1xuICB9IGVsc2UgaWYgKC9eI1thLXowLTlcXC1fXSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3Rvci5zbGljZSgxKTtcbiAgICBtYXRjaGVyID0gbWF0Y2hlc0lkO1xuICB9IGVsc2Uge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yO1xuICAgIG1hdGNoZXIgPSBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzO1xuICB9IC8vIEFkZCB0byB0aGUgbGlzdCBvZiBsaXN0ZW5lcnNcblxuXG4gIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV0ucHVzaCh7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgbWF0Y2hlcjogbWF0Y2hlcixcbiAgICBtYXRjaGVyUGFyYW06IG1hdGNoZXJQYXJhbVxuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBSZW1vdmUgYW4gZXZlbnQgaGFuZGxlclxuICogZm9yIGVsZW1lbnRzIHRoYXQgbWF0Y2hcbiAqIHRoZSBzZWxlY3RvciwgZm9yZXZlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbZXZlbnRUeXBlXSBSZW1vdmUgaGFuZGxlcnMgZm9yIGV2ZW50cyBtYXRjaGluZyB0aGlzIHR5cGUsIGNvbnNpZGVyaW5nIHRoZSBvdGhlciBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBvdGhlciB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IFtoYW5kbGVyXSBJZiB0aGlzIHBhcmFtZXRlciBpcyBvbWl0dGVkLCBvbmx5IGhhbmRsZXJzIHdoaWNoIG1hdGNoIHRoZSBwcmV2aW91cyB0d28gd2lsbCBiZSByZW1vdmVkXG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gIHZhciBpO1xuICB2YXIgbGlzdGVuZXI7XG4gIHZhciBsaXN0ZW5lck1hcDtcbiAgdmFyIGxpc3RlbmVyTGlzdDtcbiAgdmFyIHNpbmdsZUV2ZW50VHlwZTsgLy8gSGFuZGxlciBjYW4gYmUgcGFzc2VkIGFzXG4gIC8vIHRoZSBzZWNvbmQgb3IgdGhpcmQgYXJndW1lbnRcblxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlQ2FwdHVyZSA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfSAvLyBJZiB1c2VDYXB0dXJlIG5vdCBzZXQsIHJlbW92ZVxuICAvLyBhbGwgZXZlbnQgbGlzdGVuZXJzXG5cblxuICBpZiAodXNlQ2FwdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5vZmYoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdHJ1ZSk7XG4gICAgdGhpcy5vZmYoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgZmFsc2UpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJNYXAgPSB0aGlzLmxpc3RlbmVyTWFwW3VzZUNhcHR1cmUgPyAxIDogMF07XG5cbiAgaWYgKCFldmVudFR5cGUpIHtcbiAgICBmb3IgKHNpbmdsZUV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcCkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwLmhhc093blByb3BlcnR5KHNpbmdsZUV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5vZmYoc2luZ2xlRXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lck1hcFtldmVudFR5cGVdO1xuXG4gIGlmICghbGlzdGVuZXJMaXN0IHx8ICFsaXN0ZW5lckxpc3QubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0gLy8gUmVtb3ZlIG9ubHkgcGFyYW1ldGVyIG1hdGNoZXNcbiAgLy8gaWYgc3BlY2lmaWVkXG5cblxuICBmb3IgKGkgPSBsaXN0ZW5lckxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTtcblxuICAgIGlmICgoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBsaXN0ZW5lci5zZWxlY3RvcikgJiYgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGxpc3RlbmVyLmhhbmRsZXIpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVkTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgICBsaXN0ZW5lckxpc3Quc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfSAvLyBBbGwgbGlzdGVuZXJzIHJlbW92ZWRcblxuXG4gIGlmICghbGlzdGVuZXJMaXN0Lmxlbmd0aCkge1xuICAgIGRlbGV0ZSBsaXN0ZW5lck1hcFtldmVudFR5cGVdOyAvLyBSZW1vdmUgdGhlIG1haW4gaGFuZGxlclxuXG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB1c2VDYXB0dXJlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEhhbmRsZSBhbiBhcmJpdHJhcnkgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgdmFyIGk7XG4gIHZhciBsO1xuICB2YXIgdHlwZSA9IGV2ZW50LnR5cGU7XG4gIHZhciByb290O1xuICB2YXIgcGhhc2U7XG4gIHZhciBsaXN0ZW5lcjtcbiAgdmFyIHJldHVybmVkO1xuICB2YXIgbGlzdGVuZXJMaXN0ID0gW107XG4gIHZhciB0YXJnZXQ7XG4gIHZhciBldmVudElnbm9yZSA9ICdmdExhYnNEZWxlZ2F0ZUlnbm9yZSc7XG5cbiAgaWYgKGV2ZW50W2V2ZW50SWdub3JlXSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRhcmdldCA9IGV2ZW50LnRhcmdldDsgLy8gSGFyZGNvZGUgdmFsdWUgb2YgTm9kZS5URVhUX05PREVcbiAgLy8gYXMgbm90IGRlZmluZWQgaW4gSUU4XG5cbiAgaWYgKHRhcmdldC5ub2RlVHlwZSA9PT0gMykge1xuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICB9IC8vIEhhbmRsZSBTVkcgPHVzZT4gZWxlbWVudHMgaW4gSUVcblxuXG4gIGlmICh0YXJnZXQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQ7XG4gIH1cblxuICByb290ID0gdGhpcy5yb290RWxlbWVudDtcbiAgcGhhc2UgPSBldmVudC5ldmVudFBoYXNlIHx8IChldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQgPyAzIDogMik7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LWNhc2VcblxuICBzd2l0Y2ggKHBoYXNlKSB7XG4gICAgY2FzZSAxOlxuICAgICAgLy9FdmVudC5DQVBUVVJJTkdfUEhBU0U6XG4gICAgICBsaXN0ZW5lckxpc3QgPSB0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6XG4gICAgICAvL0V2ZW50LkFUX1RBUkdFVDpcbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyTWFwWzBdICYmIHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV0pIHtcbiAgICAgICAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJMaXN0LmNvbmNhdCh0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJNYXBbMV0gJiYgdGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXSkge1xuICAgICAgICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lckxpc3QuY29uY2F0KHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV0pO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMzpcbiAgICAgIC8vRXZlbnQuQlVCQkxJTkdfUEhBU0U6XG4gICAgICBsaXN0ZW5lckxpc3QgPSB0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICB2YXIgdG9GaXJlID0gW107IC8vIE5lZWQgdG8gY29udGludW91c2x5IGNoZWNrXG4gIC8vIHRoYXQgdGhlIHNwZWNpZmljIGxpc3QgaXNcbiAgLy8gc3RpbGwgcG9wdWxhdGVkIGluIGNhc2Ugb25lXG4gIC8vIG9mIHRoZSBjYWxsYmFja3MgYWN0dWFsbHlcbiAgLy8gY2F1c2VzIHRoZSBsaXN0IHRvIGJlIGRlc3Ryb3llZC5cblxuICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDtcblxuICB3aGlsZSAodGFyZ2V0ICYmIGwpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyTGlzdFtpXTsgLy8gQmFpbCBmcm9tIHRoaXMgbG9vcCBpZlxuICAgICAgLy8gdGhlIGxlbmd0aCBjaGFuZ2VkIGFuZFxuICAgICAgLy8gbm8gbW9yZSBsaXN0ZW5lcnMgYXJlXG4gICAgICAvLyBkZWZpbmVkIGJldHdlZW4gaSBhbmQgbC5cblxuICAgICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldC50YWdOYW1lICYmIFtcImJ1dHRvblwiLCBcImlucHV0XCIsIFwic2VsZWN0XCIsIFwidGV4dGFyZWFcIl0uaW5kZXhPZih0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSA+IC0xICYmIHRhcmdldC5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSkge1xuICAgICAgICAvLyBSZW1vdmUgdGhpbmdzIHRoYXQgaGF2ZSBwcmV2aW91c2x5IGZpcmVkXG4gICAgICAgIHRvRmlyZSA9IFtdO1xuICAgICAgfSAvLyBDaGVjayBmb3IgbWF0Y2ggYW5kIGZpcmVcbiAgICAgIC8vIHRoZSBldmVudCBpZiB0aGVyZSdzIG9uZVxuICAgICAgLy9cbiAgICAgIC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5XG4gICAgICAvLyB0byBjaGVjayBpZiBldmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cbiAgICAgIC8vIHdhcyBjYWxsZWQuIElmIHNvLCBicmVhayBib3RoIGxvb3BzLlxuICAgICAgZWxzZSBpZiAobGlzdGVuZXIubWF0Y2hlci5jYWxsKHRhcmdldCwgbGlzdGVuZXIubWF0Y2hlclBhcmFtLCB0YXJnZXQpKSB7XG4gICAgICAgICAgdG9GaXJlLnB1c2goW2V2ZW50LCB0YXJnZXQsIGxpc3RlbmVyXSk7XG4gICAgICAgIH1cbiAgICB9IC8vIFRPRE86TUNHOjIwMTIwMTE3OiBOZWVkIGEgd2F5IHRvXG4gICAgLy8gY2hlY2sgaWYgZXZlbnQjc3RvcFByb3BhZ2F0aW9uXG4gICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGxvb3BpbmdcbiAgICAvLyB0aHJvdWdoIHRoZSBET00uIFN0b3AgaWYgdGhlXG4gICAgLy8gZGVsZWdhdGlvbiByb290IGhhcyBiZWVuIHJlYWNoZWRcblxuXG4gICAgaWYgKHRhcmdldCA9PT0gcm9vdCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbCA9IGxpc3RlbmVyTGlzdC5sZW5ndGg7IC8vIEZhbGwgYmFjayB0byBwYXJlbnROb2RlIHNpbmNlIFNWRyBjaGlsZHJlbiBoYXZlIG5vIHBhcmVudEVsZW1lbnQgaW4gSUVcblxuICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50IHx8IHRhcmdldC5wYXJlbnROb2RlOyAvLyBEbyBub3QgdHJhdmVyc2UgdXAgdG8gZG9jdW1lbnQgcm9vdCB3aGVuIHVzaW5nIHBhcmVudE5vZGUsIHRob3VnaFxuXG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEhUTUxEb2N1bWVudCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJldDtcblxuICBmb3IgKGkgPSAwOyBpIDwgdG9GaXJlLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gSGFzIGl0IGJlZW4gcmVtb3ZlZCBkdXJpbmcgd2hpbGUgdGhlIGV2ZW50IGZ1bmN0aW9uIHdhcyBmaXJlZFxuICAgIGlmICh0aGlzLl9yZW1vdmVkTGlzdGVuZXJzLmluZGV4T2YodG9GaXJlW2ldWzJdKSA+IC0xKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXR1cm5lZCA9IHRoaXMuZmlyZS5hcHBseSh0aGlzLCB0b0ZpcmVbaV0pOyAvLyBTdG9wIHByb3BhZ2F0aW9uIHRvIHN1YnNlcXVlbnRcbiAgICAvLyBjYWxsYmFja3MgaWYgdGhlIGNhbGxiYWNrIHJldHVybmVkXG4gICAgLy8gZmFsc2VcblxuICAgIGlmIChyZXR1cm5lZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRvRmlyZVtpXVswXVtldmVudElnbm9yZV0gPSB0cnVlO1xuICAgICAgdG9GaXJlW2ldWzBdLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuLyoqXG4gKiBGaXJlIGEgbGlzdGVuZXIgb24gYSB0YXJnZXQuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoZXZlbnQsIHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIGxpc3RlbmVyLmhhbmRsZXIuY2FsbCh0YXJnZXQsIGV2ZW50LCB0YXJnZXQpO1xufTtcbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIGEgdGFnIHNlbGVjdG9yLlxuICpcbiAqIFRhZ3MgYXJlIE5PVCBjYXNlLXNlbnNpdGl2ZSxcbiAqIGV4Y2VwdCBpbiBYTUwgKGFuZCBYTUwtYmFzZWRcbiAqIGxhbmd1YWdlcyBzdWNoIGFzIFhIVE1MKS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBUaGUgdGFnIG5hbWUgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzVGFnKHRhZ05hbWUsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIHRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG59XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyB0aGUgcm9vdC5cbiAqXG4gKiBAcGFyYW0gez9TdHJpbmd9IHNlbGVjdG9yIEluIHRoaXMgY2FzZSB0aGlzIGlzIGFsd2F5cyBwYXNzZWQgdGhyb3VnaCBhcyBudWxsIGFuZCBub3QgdXNlZFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hlc1Jvb3Qoc2VsZWN0b3IsIGVsZW1lbnQpIHtcbiAgaWYgKHRoaXMucm9vdEVsZW1lbnQgPT09IHdpbmRvdykge1xuICAgIHJldHVybiAoLy8gTWF0Y2ggdGhlIG91dGVyIGRvY3VtZW50IChkaXNwYXRjaGVkIGZyb20gZG9jdW1lbnQpXG4gICAgICBlbGVtZW50ID09PSBkb2N1bWVudCB8fCAvLyBUaGUgPGh0bWw+IGVsZW1lbnQgKGRpc3BhdGNoZWQgZnJvbSBkb2N1bWVudC5ib2R5IG9yIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudClcbiAgICAgIGVsZW1lbnQgPT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCAvLyBPciB0aGUgd2luZG93IGl0c2VsZiAoZGlzcGF0Y2hlZCBmcm9tIHdpbmRvdylcbiAgICAgIGVsZW1lbnQgPT09IHdpbmRvd1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5yb290RWxlbWVudCA9PT0gZWxlbWVudDtcbn1cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgSUQgb2ZcbiAqIHRoZSBlbGVtZW50IGluICd0aGlzJ1xuICogbWF0Y2hlcyB0aGUgZ2l2ZW4gSUQuXG4gKlxuICogSURzIGFyZSBjYXNlLXNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIElEIHRvIHRlc3QgYWdhaW5zdFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hlc0lkKGlkLCBlbGVtZW50KSB7XG4gIHJldHVybiBpZCA9PT0gZWxlbWVudC5pZDtcbn1cbi8qKlxuICogU2hvcnQgaGFuZCBmb3Igb2ZmKClcbiAqIGFuZCByb290KCksIGllIGJvdGhcbiAqIHdpdGggbm8gcGFyYW1ldGVyc1xuICpcbiAqIEByZXR1cm4gdm9pZFxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMub2ZmKCk7XG4gIHRoaXMucm9vdCgpO1xufTtcblxudmFyIF9kZWZhdWx0ID0gRGVsZWdhdGU7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0OyIsImNvbnN0IGNvcmFsRXZlbnRNYXAgPSBuZXcgTWFwKFtcblx0WydyZWFkeScsXG5cdFx0e1xuXHRcdFx0b0NvbW1lbnRzOiAnb0NvbW1lbnRzLnJlYWR5Jyxcblx0XHRcdG9UcmFja2luZzogJ3JlYWR5J1xuXHRcdH1cblx0XSxcblx0Wydsb2dpblByb21wdCcsXG5cdFx0e1xuXHRcdFx0b0NvbW1lbnRzOiAnb0NvbW1lbnRzLmxvZ2luUHJvbXB0J1xuXHRcdH1cblx0XSxcblx0WydjcmVhdGVDb21tZW50LnN1Y2Nlc3MnLFxuXHRcdHtcblx0XHRcdG9Db21tZW50czogJ29Db21tZW50cy5wb3N0Q29tbWVudCcsXG5cdFx0XHRvVHJhY2tpbmc6ICdwb3N0J1xuXHRcdH1cblx0XSxcblx0WydjcmVhdGVDb21tZW50LmVycm9yJyxcblx0XHR7XG5cdFx0XHRvQ29tbWVudHM6ICdvQ29tbWVudHMuZXJyb3JDb21tZW50Jyxcblx0XHRcdG9UcmFja2luZzogJ3Bvc3QtZXJyb3InXG5cdFx0fVxuXHRdLFxuXHRbJ2NyZWF0ZUNvbW1lbnRSZXBseS5zdWNjZXNzJyxcblx0XHR7XG5cdFx0XHRvQ29tbWVudHM6ICdvQ29tbWVudHMucmVwbHlDb21tZW50Jyxcblx0XHRcdG9UcmFja2luZzogJ3JlcGx5J1xuXHRcdH1cblx0XSxcblx0WydlZGl0Q29tbWVudC5zdWNjZXNzJyxcblx0XHR7XG5cdFx0XHRvQ29tbWVudHM6ICdvQ29tbWVudHMuZWRpdENvbW1lbnQnLFxuXHRcdFx0b1RyYWNraW5nOiAnZWRpdCdcblx0XHR9XG5cdF0sXG5cdFsnY3JlYXRlQ29tbWVudFJlYWN0aW9uLnN1Y2Nlc3MnLFxuXHRcdHtcblx0XHRcdG9Db21tZW50czogJ29Db21tZW50cy5saWtlQ29tbWVudCcsXG5cdFx0XHRvVHJhY2tpbmc6ICdsaWtlJ1xuXHRcdH1cblx0XSxcblx0WydyZXBvcnRDb21tZW50LnN1Y2Nlc3MnLFxuXHRcdHtcblx0XHRcdG9Db21tZW50czogJ29Db21tZW50cy5yZXBvcnRDb21tZW50Jyxcblx0XHRcdG9UcmFja2luZzogJ3JlcG9ydCdcblx0XHR9XG5cdF0sXG5cdFsnaWdub3JlVXNlci5zdWNjZXNzJyxcblx0XHR7XG5cdFx0XHRvQ29tbWVudHM6ICdvQ29tbWVudHMuaWdub3JlVXNlcicsXG5cdFx0XHRvVHJhY2tpbmc6ICdpZ25vcmUtdXNlcidcblx0XHR9XG5cdF1cbl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGNvcmFsRXZlbnRNYXBcbn07XG4iLCJpbXBvcnQgRGVsZWdhdGUgZnJvbSAnZnRkb21kZWxlZ2F0ZSc7XG5pbXBvcnQgdmlld3BvcnQgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXZpZXdwb3J0JztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmNvbnN0IG92ZXJsYXlzID0ge307XG5cbmNvbnN0IGNoZWNrT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRzKSB7XG5cdGlmIChvcHRzLnRyaWdnZXIgJiYgIShvcHRzLnRyaWdnZXIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRvcHRzLnRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdHMudHJpZ2dlcik7XG5cdH1cblxuXHRpZiAob3B0cy5oZWFkaW5nICYmICghb3B0cy5oZWFkaW5nLnRpdGxlIHx8ICFvcHRzLmhlYWRpbmcudGl0bGUudHJpbSgpKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdCdcIm8tb3ZlcmxheSBlcnJvclwiOiBUbyBoYXZlIGEgaGVhZGluZywgYSBub24tZW1wdHkgdGl0bGUgbmVlZHMgdG8gYmUgc2V0J1xuXHRcdCk7XG5cdH1cblxuXHQvLyBPdmVybGF5cyBzaG91bGQgYmUgbW9kYWwgYW5kIGxheWVycyBieSBkZWZhdWx0XG5cdGlmICh0eXBlb2Ygb3B0cy5tb2RhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRvcHRzLm1vZGFsID0gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIG9wdHMubGF5ZXIgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0b3B0cy5sYXllciA9IHRydWU7XG5cdH1cblxuXHRpZiAob3B0cy5jb21wYWN0ICYmIG9wdHMuaGVhZGluZyAmJiBvcHRzLmhlYWRpbmcuc2hhZGVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0J1wiby1vdmVybGF5IGVycm9yXCI6IENvbXBhY3Qgb3ZlcmxheXMgY2FuXFwndCBoYXZlIGEgc2hhZGVkIGhlYWRlcidcblx0XHQpO1xuXHR9XG5cblx0cmV0dXJuIG9wdHM7XG59O1xuXG5jb25zdCBnZXRPcHRpb25zRnJvbVRyaWdnZXIgPSBmdW5jdGlvbiAodHJpZ2dlcikge1xuXHRsZXQgb3B0cyA9IHt9O1xuXHQvLyBHZXQgY29uZmlnIGZyb20gZGF0YSBhdHRyaWJ1dGVzIHNldCBpbiB0aGUgdHJpZ2dlciBpZiB0aGV5IGhhdmVuJ3QgYmVlbiBwYXNzZWQgdmlhIEpTXG5cdGlmICh0cmlnZ2VyIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRyaWdnZXIuYXR0cmlidXRlcywgZnVuY3Rpb24gKGF0dHIpIHtcblx0XHRcdGlmIChhdHRyLm5hbWUuaW5kZXhPZignZGF0YS1vLW92ZXJsYXknKSA9PT0gMCkge1xuXHRcdFx0XHQvLyBSZW1vdmUgdGhlIHVubmVjZXNzYXJ5IHBhcnQgb2YgdGhlIHN0cmluZyB0aGUgZmlyc3QgdGltZSB0aGlzIGlzIHJ1biBmb3IgZWFjaCBhdHRyaWJ1dGVcblx0XHRcdFx0Y29uc3Qga2V5ID0gYXR0ci5uYW1lLnJlcGxhY2UoJ2RhdGEtby1vdmVybGF5LScsICcnKTtcblx0XHRcdFx0b3B0cyA9IHV0aWxzLm9wdGlvbnNGcm9tS2V5KGtleSwgYXR0ci52YWx1ZSwgb3B0cyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0b3B0cy50cmlnZ2VyID0gdHJpZ2dlcjtcblx0fVxuXHRyZXR1cm4gb3B0cztcbn07XG5cbmNvbnN0IHRyaWdnZXJDbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoaWQsIGV2KSB7XG5cdGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRjb25zdCBvdmVybGF5ID0gb3ZlcmxheXNbaWRdO1xuXHRpZiAob3ZlcmxheSkge1xuXHRcdGlmIChvdmVybGF5LnZpc2libGUgPT09IHRydWUpIHtcblx0XHRcdG92ZXJsYXkuY2xvc2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0b3ZlcmxheS5vcGVuKCk7XG5cdFx0fVxuXHR9XG59O1xuXG5jb25zdCBpc1Zpc2libGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRyZXR1cm4gQm9vbGVhbihlbGVtZW50Lm9mZnNldEhlaWdodCk7XG59O1xuXG5jb25zdCBmb2N1c1RyYXAgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc3QgdGFiS2V5Q29kZSA9IDk7XG5cdGNvbnN0IG92ZXJsYXlGb2N1c2FibGVFbGVtZW50cyA9IFtdLnNsaWNlXG5cdFx0LmNhbGwoXG5cdFx0XHR0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcblx0XHRcdFx0J2J1dHRvbiwgW2hyZWZdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xuXHRcdFx0KVxuXHRcdClcblx0XHQuZmlsdGVyKGVsZW1lbnQgPT4ge1xuXHRcdFx0Y29uc3QgZWxlbWVudFZpc2libGUgPSBpc1Zpc2libGUoZWxlbWVudCk7XG5cdFx0XHQvLyBJbnB1dHMgZm9yIHJhZGlvIGFuZCBjaGVja2JveGVzIGFyZSB2aXN1YWxseSBoaWRkZW4sXG5cdFx0XHQvLyBzbyBjaGVjayB0aGUgbGFiZWwgdmlzaWJpbGl0eSBvZiBpbnB1dHMgdG9vIHdoZW4gZGV0ZXJtaW5pbmdcblx0XHRcdC8vIHdoZXRoZXIgdG8gdHJhcCBmb2N1cy5cblx0XHRcdGNvbnN0IGVsZW1lbnRMYWJlbFZpc2libGUgPVxuXHRcdFx0XHRlbGVtZW50LmxhYmVscyAmJiBbXS5zbGljZS5jYWxsKGVsZW1lbnQubGFiZWxzKS5zb21lKGwgPT4gaXNWaXNpYmxlKGwpKTtcblx0XHRcdC8vIFdoZW4gdGFiYmluZywgdGhlIGNoZWNrZWQgcmFkaW8gaW5wdXQgb2YgYSBncm91cCBpcyBmb2N1c2VkLCBub3QgZWFjaCByYWRpbyBpbnB1dC5cblx0XHRcdGNvbnN0IGVsZW1lbnRJc1VuY2hlY2tlZFJhZGlvID1cblx0XHRcdFx0ZWxlbWVudC50eXBlID09PSAncmFkaW8nICYmIGVsZW1lbnQuY2hlY2tlZCAhPT0gdHJ1ZTtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdCFlbGVtZW50LmRpc2FibGVkICYmXG5cdFx0XHRcdCFlbGVtZW50SXNVbmNoZWNrZWRSYWRpbyAmJlxuXHRcdFx0XHQoZWxlbWVudFZpc2libGUgfHwgZWxlbWVudExhYmVsVmlzaWJsZSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cblx0aWYgKG92ZXJsYXlGb2N1c2FibGVFbGVtZW50cy5sZW5ndGggJiYgZXZlbnQua2V5Q29kZSA9PT0gdGFiS2V5Q29kZSkge1xuXHRcdGNvbnN0IGxhc3RFbGVtZW50ID1cblx0XHRcdG92ZXJsYXlGb2N1c2FibGVFbGVtZW50c1tvdmVybGF5Rm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG5cdFx0Ly8gTG9vcCBmb2N1cyBiYWNrIHRvIHRoZSBmaXJzdCBlbGVtZW50IGlmIGZvY3VzIGhhcyByZWFjaGVkIHRoZSBmb2N1c2FibGUgZWxlbWVudFxuXHRcdGlmIChldmVudC50YXJnZXQgPT09IGxhc3RFbGVtZW50KSB7XG5cdFx0XHRvdmVybGF5Rm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSBlbHNlIGlmIChldmVudC5zaGlmdEtleSAmJiBldmVudC50YXJnZXQgPT09IG92ZXJsYXlGb2N1c2FibGVFbGVtZW50c1swXSkge1xuXHRcdFx0Ly8gbG9vcCB0byB0aGUgYm90dG9tIHdoZW4gc2hpZnQrdGFiYmluZy5cblx0XHRcdGxhc3RFbGVtZW50LmZvY3VzKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIE92ZXJsYXkuXG4gKi9cbmNsYXNzIE92ZXJsYXkge1xuXHQvKipcblx0ICogQ29uc3RydWN0IGFuIG92ZXJsYXkuXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBpZCAtIFN0cmluZy4gQSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIG92ZXJsYXkgd2l0aGluIHRoZSBwYWdlLiAoUmVxdWlyZWQpXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBPdmVybGF5LiBUaGlzIG9iamVjdCBNVVNUIGhhdmUgZWl0aGVyIGBzcmNgIG9yIGBodG1sYCBzZXQuIChSZXF1aXJlZClcblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuaGVhZGluZy50aXRsZSAtIFlvdXIgb3ZlcmxheSdzIHRpdGxlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5oZWFkaW5nLnZpc3VhbGx5aGlkZXRpdGxlIC0gSWYgeW91IHdhbnQgdG8gcHJvdmlkZSBhIGRpZmZlcmVudCB0aXRsZSBzdHlsZSwgdGhpcyBvcHRpb24gd2lsbCBwcmV2ZW50IHRoZSB0aXRsZSBzcGFuIGZyb20gYmVpbmcgYWRkZWQgdG8gdGhlIG92ZXJsYXkuIChJbiB0aGlzIGNhc2UgdGhlIHRpdGxlIGlzIG9ubHkgdXNlZCBmb3IgYXJpYSBsYWJlbGxpbmcpIERlZmF1bHQ6IGZhbHNlLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuaGVhZGluZy5zaGFkZWQgLSBXaGV0aGVyIHRvIHNoYWRlIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSBoZWFkZXIuIERlZmF1bHQ6IHRvIGZhbHNlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5tb2RhbCAtIFdoZXRoZXIgdGhlIG92ZXJsYXkgc2hvdWxkIGhhdmUgbW9kYWwgYmVoYXZpb3VyIG9yIG5vdC4gU2V0dGluZyB0aGlzIGFzIHRydWUgd2lsbCBhZGQgYSB0cmFuc2x1Y2VudCBzaGFkb3cgYmV0d2VlbiB0aGUgcGFnZSBhbmQgdGhlIG92ZXJsYXlcblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmNvbXBhY3QgLSBJZiB0cnVlLCB0aGUgLm8tb3ZlcmxheS0tY29tcGFjdCBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBvdmVybGF5IHRoYXQgcmVkdWNlcyBoZWFkaW5nIGZvbnQtc2l6ZSBhbmQgcGFkZGluZ3MgaW4gdGhlIGNvbnRlbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnNyYyAtIEVpdGhlciBhIHVybCBmcm9tIHdoaWNoIEhUTUwgdG8gcG9wdWxhdGUgdGhlIG92ZXJsYXkgY2FuIGJlIGxvYWRlZCwgb3IgYSBxdWVyeVNlbGVjdG9yIHN0cmluZyBpZGVudGlmeWluZyBhbiBlbGVtZW50IGZyb20gd2hpY2ggdGhlIHRleHRDb250ZW50IHNob3VsZCBiZSBleHRyYWN0ZWQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmh0bWwgLSBTdHJpbmcgb3IgSFRNTEVsZW1lbnQuIFJhdyBIVE1MIChjYW5ub3QgYmUgc2V0IGRlY2xhcmF0aXZlbHkpXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnRyaWdnZXIgLSBxdWVyeVNlbGVjdG9yIGV4cHJlc3Npb24gb3IgSFRNTEVsZW1lbnQuIFdoZW4gdGhlcmUncyBhIHRyaWdnZXIgc2V0LCBhIGNsaWNrIGV2ZW50IGhhbmRsZXIgd2lsbCBiZSBhZGRlZCB0byBpdCB0aGF0IHdpbGwgb3BlbiBvciBjbG9zZSB0aGUgb3ZlcmxheSBhY2NvcmRpbmdseS4gKGNhbm5vdCBiZSBzZXQgZGVjbGFyYXRpdmVseSlcblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuemluZGV4IC0gVmFsdWUgb2YgdGhlIENTUyB6LWluZGV4IHByb3BlcnR5IG9mIHRoZSBvdmVybGF5LiBEZWZhdWx0IHNldCB2aWEgQ1NTOiAnMTAnXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5wcmV2ZW50Y2xvc2luZyAtIFByZXZlbnRzIGNsb3N1cmUgb2Ygb3ZlcmxheSB2aWEgc3RhbmRhcmQgeCBidXR0b24gb3IgZXNjYXBlIGtleS4gRm9yIHVzZSB3aGVuIHlvdSBhcmUgZGlyZWN0aW5nIHRoZSB1c2VyIHRvIHNvbWV3aGVyZSBlbHNlLiBPbmx5IHZhbGlkIHdpdGggbW9kYWwgc2V0IHRvIHRydWUuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5jdXN0b21jbG9zZSAtIElmIHlvdSBkbyBub3QgdXNlIHRoZSBoZWFkaW5nLCBidXQgd2FudCB0byBwcm92aWRlIGEgY2xvc2UgYnV0dG9uIGluIHlvdXIgaHRtbCAvIHNyYyAod2l0aCBhIGNsYXNzIG9mIG8tb3ZlcmxheV9fY2xvc2UpLCBzZXR0aW5nIGN1c3RvbWNsb3NlIHRvIHRydWUgd2lsbCBhdHRhY2ggby1vdmVybGF5J3MgY2xvc2UgaGFuZGxlciBmdW5jdGlvbiB0byB0aGF0IGJ1dHRvbi5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMucGFyZW50bm9kZSAtIFNob3VsZCBiZSBhIHF1ZXJ5IHNlbGVjdG9yIGZvciBhIERPTSBlbGVtZW50LiBJZiBzZXQsIHRoZSBvdmVybGF5IHdpbGwgYmUgYXBwZW5kZWQgYXMgYSBjaGlsZCBvZiB0aGlzIHJhdGhlciB0aGFuIHRoZSBkb2N1bWVudCBib2R5IG9yIHRhcmdldC4gSWYgbXVsdGlwbGUgbm9kZXMgYXJlIG1hdGNoZWQsIGl0IHdpbGwgdXNlIHRoZSBmaXJzdC4gSWYgbm90aGluZyBtYXRjaGVzIHRoaXMgc2VsZWN0b3IsIHRoZSBib2R5IHdpbGwgYmUgdXNlZC5cblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLm5lc3RlZCAtIElmIHNldCB0byB0cnVlLCB0aGUgcmVzaXplLCBlc2NhcGUsIGFuZCBsYXllciBsaXN0ZW5lcnMgd2lsbCBub3QgYmUgc2V0IHVwLiBUaGlzIGJvb2xlYW4gc2hvdWxkIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgcGFyZW50bm9kZSBzZXR0aW5nIHRvIGFsbG93IGFuIG92ZXJsYXkgdG8gYmUgcG9zaXRpb25lZCB3aXRoaW4gYSBET00gZWxlbWVudCByYXRoZXIgdGhhbiBvdmVybGFpZCBvbiB0b3Agb2YgZXZlcnl0aGluZy4gRGVmYXVsdDogZmFsc2UuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0cy5ub2ZvY3VzIC0gSWYgc2V0IHRvIHRydWUsIHRoZSB0YWJpbmRleCB3aWxsIG5vdCBiZSBzZXQgb24gdGhlIHdyYXBwZXIgZWxlbWVudC4gVXNlZnVsIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIG5lc3RlZCBhbmQgcGFyZW50bm9kZSBvcHRpb25zLiBEZWZhdWx0OiBmYWxzZS5cblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmZ1bGxzY3JlZW4gLSBJZiBzZXQgdG8gdHJ1ZSwgdGhlIG92ZXJsYXkgd2lsbCBkaXNwbGF5IGZ1bGwgc2NyZWVuLiBUaGlzIG92ZXJsYXkgZGlzYWJsZXMgc2Nyb2xsIG9uIHRoZSB1bmRlcmx5aW5nIGRvY3VtZW50IGFuZCBpcyBkaXNtaXNzaWJsZSB3aXRoIHRoZSBiYWNrIGJ1dHRvbi5cblx0ICogQHRocm93cyB7RXJyb3J9IFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGBpZGAgcGFyYW1ldGVyIGlzIG5vdCB1bmlxdWUuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihpZCwgb3B0cykge1xuXHRcdGlmIChvdmVybGF5c1tpZF0pIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0YG8tb3ZlcmxheSB3aXRoIGlkIFwiJHtpZH1cIiBhbHJlYWR5IGV4aXN0cy4gQ3JlYXRpbmcgYW4gb3ZlcmxheSB0d2ljZSB3aXRoIHRoZSBzYW1lIGlkIG1heSByZXN1bHQgaW4gdW5leHBlY3RlZCBiZWhhdmlvdXIuYFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHR2aWV3cG9ydC5saXN0ZW5UbygncmVzaXplJyk7XG5cdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cdFx0dGhpcy5pZCA9IGlkO1xuXG5cdFx0dHJ5IHtcblx0XHRcdHRoaXMub3B0cyA9IGNoZWNrT3B0aW9ucyhvcHRzKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHR0aGlzLmJyb2FkY2FzdCgnbG9nJywgJ29FcnJvcnMnLCB7XG5cdFx0XHRcdGVycm9yOiBlLFxuXHRcdFx0fSk7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5vcHRzKSB7XG5cdFx0XHRjb25zdCBub09wdEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHQnXCJvLW92ZXJsYXkgZXJyb3JcIjogUmVxdWlyZWQgb3B0aW9ucyBoYXZlIG5vdCBiZWVuIHNldCdcblx0XHRcdCk7XG5cdFx0XHR0aGlzLmJyb2FkY2FzdCgnbG9nJywgJ29FcnJvcnMnLCB7XG5cdFx0XHRcdGVycm9yOiBub09wdEVycm9yLFxuXHRcdFx0fSk7XG5cdFx0XHR0aHJvdyBub09wdEVycm9yO1xuXHRcdH1cblx0XHRpZiAodGhpcy5vcHRzLnRyaWdnZXIpIHtcblx0XHRcdHRoaXMub3B0cy50cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRcdCdjbGljaycsXG5cdFx0XHRcdHRyaWdnZXJDbGlja0hhbmRsZXIuYmluZCh0aGlzLm9wdHMudHJpZ2dlciwgaWQpLFxuXHRcdFx0XHRmYWxzZVxuXHRcdFx0KTtcblx0XHRcdHRoaXMuY29udGV4dCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub3B0cy5wYXJlbnRub2RlKSkge1xuXHRcdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub3B0cy5wYXJlbnRub2RlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuY29udGV4dCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5kZWxlZ2F0ZXMgPSB7XG5cdFx0XHRkb2M6IG5ldyBEZWxlZ2F0ZSgpLFxuXHRcdFx0d3JhcDogbmV3IERlbGVnYXRlKCksXG5cdFx0XHRjb250ZXh0OiBuZXcgRGVsZWdhdGUoKSxcblx0XHR9O1xuXG5cdFx0Ly8gQWRkIHRoaXMgb3ZlcmxheSB0byB0aGUgb3ZlcmxheXMgaGFzaG1hcFxuXHRcdG92ZXJsYXlzW2lkXSA9IHRoaXM7XG5cdH1cblxuXHRvcGVuKCkge1xuXHRcdC8vIFByZXZlbnQgcGFnZSBzY3JvbGwgZm9yIG9wZW4gbW9kYWxzIG9yIGZ1bGxzY3JlZW4gb3ZlcmxheXMuXG5cdFx0aWYgKHRoaXMub3B0cy5tb2RhbCB8fCB0aGlzLm9wdHMuZnVsbHNjcmVlbikge1xuXHRcdFx0dGhpcy5vcmlnaW5hbE92ZXJmbG93ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93O1xuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0fVxuXG5cdFx0Ly8gQSBmdWxsIHNjcmVlbiBvdmVybGF5IGNhbiBsb29rIGxpa2UgYSBuZXcgcGFnZSBzbyBhZGQgdG8gaGlzdG9yeS5cblx0XHQvLyBUaGUgYnJvd3NlciBiYWNrIGJ1dHRvbiBjYW4gdGhlbiBiZSB1c2VkIHRvIGNsb3NlIGEgZnVsbC1zY3JlZW4gb3ZlcmxheS5cblx0XHRpZiAod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlICYmIHRoaXMub3B0cy5mdWxsc2NyZWVuKSB7XG5cdFx0XHQvLyBQdXNoIG92ZXJsYXkgc3RhdGUgdG8gaGlzdG9yeS5cblx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcblx0XHRcdFx0e1tgby1vdmVybGF5LSR7dGhpcy5pZH1gXTogJ2Z1bGxzY3JlZW4nfSxcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0XHRcdCk7XG5cdFx0XHQvLyBXaGVuIGhpc3RvcnkgY2hhbmdlcyBjaGVjayBmb3IgdGhlIG92ZXJsYXkgYW5kIGNsb3NlIGl0LlxuXHRcdFx0dGhpcy5wb3BzdGF0ZUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5zdGF0ZSAmJlxuXHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnN0YXRlW2BvLW92ZXJsYXktJHt0aGlzLmlkfWBdXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5wb3BzdGF0ZUhhbmRsZXIpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMudHJpZ2dlcikge1xuXHRcdFx0dGhpcy5vcHRzLnRyaWdnZXIuc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCAndHJ1ZScpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5jb250ZW50KSB7XG5cdFx0XHRjb25zdCBvdmVybGF5ID0gdGhpcztcblx0XHRcdHRoaXMubG9hZENvbnRlbnQoZnVuY3Rpb24gKGh0bWwpIHtcblx0XHRcdFx0b3ZlcmxheS5vcHRzLmh0bWwgPSBodG1sO1xuXHRcdFx0XHRpZiAoIW92ZXJsYXkub3B0cy5odG1sKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0J1wiby1vdmVybGF5IGVycm9yXCI6IENvbnRlbnQgZm9yIHRoZSBvdmVybGF5IG5lZWRzIHRvIGJlIHNldCB2aWEgdGhlIFwiaHRtbFwiIG9yIHRoZSBcInNyY1wiIG9wdGlvbi4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvdmVybGF5LnJlbmRlcigpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2hvdygpO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRDb250ZW50KGNhbGxiYWNrKSB7XG5cdFx0aWYgKCF0aGlzLm9wdHMuaHRtbCAmJiB0aGlzLm9wdHMuc3JjKSB7XG5cdFx0XHRpZiAoL14oaHR0cHM/XFw6XFwvKT9cXC8vLnRlc3QodGhpcy5vcHRzLnNyYykpIHtcblx0XHRcdFx0dXRpbHMuY29weUNvbnRlbnRGcm9tVXJsKHRoaXMub3B0cy5zcmMsIGZ1bmN0aW9uIChodG1sKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soaHRtbCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dXRpbHMuY29weUNvbnRlbnRGcm9tRWxlbWVudChcblx0XHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub3B0cy5zcmMpLFxuXHRcdFx0XHRcdGZ1bmN0aW9uIChodG1sKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayhodG1sKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhbGxiYWNrKHRoaXMub3B0cy5odG1sKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qgd3JhcHBlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0d3JhcHBlckVsLmNsYXNzTmFtZSA9ICdvLW92ZXJsYXknO1xuXHRcdHdyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXktLScgKyB0aGlzLmlkLnJlcGxhY2UoJyAnLCAnLScpKTtcblxuXHRcdC8vIEFkZCBjdXN0b20gY2xhc3NlcyB0byB0aGUgbmV3bHkgY3JlYXRlZCBvdmVybGF5IHdyYXBwZXIuXG5cdFx0aWYgKHRoaXMub3B0cy5jbGFzcykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0d3JhcHBlckVsLmNsYXNzTGlzdC5hZGQoLi4udGhpcy5vcHRzLmNsYXNzLnNwbGl0KCcgJykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKGBDb3VsZCBub3QgYWRkIHRoZSBjbGFzc2VzOiAke3RoaXMub3B0cy5jbGFzc31gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLmZ1bGxzY3JlZW4pIHtcblx0XHRcdHdyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXktLWZ1bGwtc2NyZWVuJyk7XG5cdFx0fVxuXG5cdFx0d3JhcHBlckVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcblx0XHRpZiAodGhpcy5vcHRzLnppbmRleCkge1xuXHRcdFx0d3JhcHBlckVsLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0cy56aW5kZXg7XG5cdFx0fVxuXHRcdHRoaXMud3JhcHBlciA9IHdyYXBwZXJFbDtcblxuXHRcdGlmICh0aGlzLm9wdHMuaGVhZGluZykge1xuXHRcdFx0Y29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuXHRcdFx0Y29uc3QgaGVhZGluZ0lkID0gdGhpcy5vcHRzLmhlYWRpbmcudGl0bGVcblx0XHRcdFx0LnRvTG93ZXJDYXNlKClcblx0XHRcdFx0Ly8gcmVwbGFjZSBub24tYXNjaWkgYWxwaGFudW1zIHdpdGggaHlwaGVuc1xuXHRcdFx0XHQucmVwbGFjZSgvW15hLXowLTktXS9nLCAnLScpXG5cdFx0XHRcdC8vIHJlcGxhY2UgcmVwZWF0ZWQgaHlwaGVucyB3aXRoIGEgc2luZ2xlIGh5cGhlblxuXHRcdFx0XHQucmVwbGFjZSgvW1xccy1dKy9nLCAnLScpO1xuXHRcdFx0aGVhZGluZy5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXlfX2hlYWRpbmcnKTtcblx0XHRcdGhlYWRpbmcuc2V0QXR0cmlidXRlKCdpZCcsIGhlYWRpbmdJZCk7XG5cdFx0XHR3cmFwcGVyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCBoZWFkaW5nSWQpO1xuXG5cdFx0XHRpZiAodGhpcy5vcHRzLmhlYWRpbmcuc2hhZGVkKSB7XG5cdFx0XHRcdGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnby1vdmVybGF5X19oZWFkaW5nLS1zaGFkZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF0aGlzLm9wdHMucHJldmVudGNsb3NpbmcpIHtcblx0XHRcdFx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0XHRcdGJ1dHRvbi5jbGFzc05hbWUgPSAnby1vdmVybGF5X19jbG9zZSc7XG5cdFx0XHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2xvc2UnKTtcblx0XHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnQ2xvc2UnKTtcblxuXHRcdFx0XHRpZiAoIXRoaXMub3B0cy5ub2ZvY3VzKSB7XG5cdFx0XHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGhlYWRpbmcuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHR0aXRsZS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnaGVhZGluZycpO1xuXHRcdFx0dGl0bGUuY2xhc3NOYW1lID0gJ28tb3ZlcmxheV9fdGl0bGUnO1xuXG5cdFx0XHRpZiAoIXRoaXMub3B0cy5oZWFkaW5nLnZpc3VhbGx5aGlkZXRpdGxlKSB7XG5cdFx0XHRcdHRpdGxlLmlubmVySFRNTCA9IHRoaXMub3B0cy5oZWFkaW5nLnRpdGxlO1xuXHRcdFx0fVxuXG5cdFx0XHRoZWFkaW5nLmFwcGVuZENoaWxkKHRpdGxlKTtcblx0XHRcdHdyYXBwZXJFbC5hcHBlbmRDaGlsZChoZWFkaW5nKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLnRvb2x0aXApIHtcblx0XHRcdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRcdGJ1dHRvbi5jbGFzc05hbWUgPSAnby1vdmVybGF5X19jbG9zZSc7XG5cdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjdm9pZCcpO1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdDbG9zZScpO1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnQ2xvc2UnKTtcblx0XHRcdGlmICghdGhpcy5vcHRzLm5vZm9jdXMpIHtcblx0XHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0fVxuXG5cdFx0XHR3cmFwcGVyRWwuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblx0XHRcdHdyYXBwZXJFbC5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXktLWNvbXBhY3QnKTtcblx0XHR9XG5cblx0XHRjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuXHRcdGNvbnRlbnQuY2xhc3NOYW1lID0gJ28tb3ZlcmxheV9fY29udGVudCc7XG5cdFx0d3JhcHBlckVsLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG5cdFx0dGhpcy5jb250ZW50ID0gY29udGVudDtcblxuXHRcdGlmICh0aGlzLm9wdHMuY29tcGFjdCkge1xuXHRcdFx0d3JhcHBlckVsLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheS0tY29tcGFjdCcpO1xuXHRcdH1cblxuXHRcdHRoaXMuc2hvdygpO1xuXHR9XG5cblx0X3RyYXBGb2N1cygpIHtcblx0XHQvLyBUcmFwIHRoZSBmb2N1cyBpbnNpZGUgdGhlIG92ZXJsYXkgc28ga2V5Ym9hcmQgbmF2aWdhdGlvbiBkb2Vzbid0IGVzY2FwZSB0aGUgb3ZlcmxheVxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmb2N1c1RyYXAuYmluZCh0aGlzKSk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvdyB0aGUgb3ZlcmxheVxuXHQgKlxuXHQgKiBAZmlyZXMgb092ZXJsYXkjcmVhZHlcblx0ICovXG5cdHNob3coKSB7XG5cdFx0aWYgKHRoaXMub3B0cy5tb2RhbCkge1xuXHRcdFx0dGhpcy53cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ28tb3ZlcmxheS0tbW9kYWwnKTtcblx0XHRcdGNvbnN0IHNoYWRvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0c2hhZG93LmNsYXNzTmFtZSA9ICdvLW92ZXJsYXktc2hhZG93Jztcblx0XHRcdHRoaXMuc2hhZG93ID0gc2hhZG93O1xuXG5cdFx0XHRpZiAodGhpcy5vcHRzLnppbmRleCkge1xuXHRcdFx0XHRzaGFkb3cuc3R5bGUuekluZGV4ID0gdGhpcy5vcHRzLnppbmRleCAtIDE7XG5cdFx0XHR9XG5cblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hhZG93KTtcblx0XHR9XG5cblx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mucm9vdChkb2N1bWVudC5ib2R5KTtcblx0XHR0aGlzLmRlbGVnYXRlcy53cmFwLnJvb3QodGhpcy53cmFwcGVyKTtcblx0XHR0aGlzLmRlbGVnYXRlcy5jb250ZXh0LnJvb3QodGhpcy5jb250ZXh0KTtcblxuXHRcdHRoaXMuY2xvc2VIYW5kbGVyID0gdGhpcy5jbG9zZS5iaW5kKHRoaXMpO1xuXG5cdFx0Ly8gSWYgdGhlIG92ZXJsYXkgaXMgbmVzdGVkIHdpdGhpbiBhIERPTSBlbGVtZW50IGRvbid0IGF0dGFjaCB0aGUgdmlld3BvcnQgcmVzaXplIGxpc3RlbmVycy5cblx0XHRpZiAoIXRoaXMub3B0cy5uZXN0ZWQpIHtcblx0XHRcdHRoaXMucmVzaXplTGlzdGVuZXJIYW5kbGVyID0gdGhpcy5yZXNpemVMaXN0ZW5lci5iaW5kKHRoaXMpO1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLm9uKFxuXHRcdFx0XHQnb1ZpZXdwb3J0LnJlc2l6ZScsXG5cdFx0XHRcdCdib2R5Jyxcblx0XHRcdFx0dGhpcy5yZXNpemVMaXN0ZW5lckhhbmRsZXJcblx0XHRcdCk7XG5cblx0XHRcdHRoaXMuY2xvc2VPbkVzY2FwZVByZXNzSGFuZGxlciA9IHRoaXMuY2xvc2VPbkVzY2FwZVByZXNzLmJpbmQodGhpcyk7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mub24oJ2tleXVwJywgdGhpcy5jbG9zZU9uRXNjYXBlUHJlc3NIYW5kbGVyKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLmxheWVyKSB7XG5cdFx0XHR0aGlzLmNsb3NlT25OZXdMYXllckhhbmRsZXIgPSB0aGlzLmNsb3NlT25OZXdMYXllci5iaW5kKHRoaXMpO1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMuY29udGV4dC5vbignb092ZXJsYXkubGF5ZXJPcGVuJywgdGhpcy5jbG9zZU9uTmV3TGF5ZXJIYW5kbGVyKTtcblxuXHRcdFx0dGhpcy5icm9hZGNhc3QoJ2xheWVyT3BlbicpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMuaGVhZGluZyB8fCB0aGlzLm9wdHMudG9vbHRpcCB8fCB0aGlzLm9wdHMuY3VzdG9tY2xvc2UpIHtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLndyYXAub24oJ2NsaWNrJywgJy5vLW92ZXJsYXlfX2Nsb3NlJywgdGhpcy5jbG9zZUhhbmRsZXIpO1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMud3JhcC5vbihcblx0XHRcdFx0J3RvdWNoZW5kJyxcblx0XHRcdFx0Jy5vLW92ZXJsYXlfX2Nsb3NlJyxcblx0XHRcdFx0dGhpcy5jbG9zZUhhbmRsZXJcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGlja0hhbmRsZXIgPSB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLm9uKCdjbGljaycsICdib2R5JywgdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGlja0hhbmRsZXIpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5vbigndG91Y2hlbmQnLCAnYm9keScsIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2tIYW5kbGVyKTtcblxuXHRcdHRoaXMuY29udGV4dC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xuXG5cdFx0Ly8gR2l2ZSB0aGUgb3ZlcmxheSBmb2N1c1xuXHRcdGlmICghdGhpcy5vcHRzLm5vZm9jdXMpIHtcblx0XHRcdHRoaXMud3JhcHBlci5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdHRoaXMud3JhcHBlci5zdHlsZS5vdXRsaW5lID0gMDtcblx0XHR9XG5cblx0XHQvLyBSZW5kZXJzIGNvbnRlbnQgYWZ0ZXIgb3ZlcmxheSBoYXMgYmVlbiBhZGRlZCBzbyBjc3MgaXMgYXBwbGllZCBiZWZvcmUgdGhhdFxuXHRcdC8vIFRoYXkgd2F5IGlmIGFuIGVsZW1lbnQgaGFzIGF1dG9mb2N1cywgdGhlIHdpbmRvdyB3b24ndCBzY3JvbGwgdG8gdGhlIGJvdHRvbVxuXHRcdC8vIGluIFNhZmFyaSBhcyB0aGUgb3ZlcmxheSBpcyBhbHJlYWR5IGluIHBvc2l0aW9uXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShcblx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKCF0aGlzLmNvbnRlbnQuaW5uZXJIVE1MKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLm9wdHMuaHRtbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRoaXMuY29udGVudC5pbm5lckhUTUwgPSB0aGlzLm9wdHMuaHRtbDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMub3B0cy5odG1sKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLndpZHRoID0gdGhpcy5nZXRXaWR0aCgpO1xuXHRcdFx0XHR0aGlzLmhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KCk7XG5cblx0XHRcdFx0Ly8gSWYgdGhlIG92ZXJsYXkgaXMgbmVzdGVkIHdpdGhpbiBhIERPTSBlbGVtZW50IGRvbid0IHJlc2l6ZSBhY2NvcmRpbmcgdG8gdGhlIHZpZXdwb3J0LlxuXHRcdFx0XHRpZiAoIXRoaXMub3B0cy5uZXN0ZWQpIHtcblx0XHRcdFx0XHR0aGlzLnJlYWxpZ24oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnZpc2libGUgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLndyYXBwZXIuZm9jdXMoKTtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIFJlYWR5IGV2ZW50XG5cdFx0XHRcdCAqXG5cdFx0XHRcdCAqIEBldmVudCBvT3ZlcmxheSNyZWFkeVxuXHRcdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0XHQgKiBAcHJvcGVydHkge29PdmVybGF5fSBpbnN0YW5jZSAtIHRoZSBmaXJpbmcgaW5zdGFuY2Vcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMuYnJvYWRjYXN0KCdyZWFkeScsICdvT3ZlcmxheScsIHtcblx0XHRcdFx0XHRpbnN0YW5jZTogdGhpc1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBBZGQgby10cmFja2luZyBpbnRlZ3JhdGlvblxuXHRcdFx0XHR0aGlzLmJyb2FkY2FzdCgnZXZlbnQnLCAnb1RyYWNraW5nJywge1xuXHRcdFx0XHRcdGNhdGVnb3J5OiAnb3ZlcmxheScsXG5cdFx0XHRcdFx0YWN0aW9uOiAnc2hvdycsXG5cdFx0XHRcdFx0b3ZlcmxheV9pZDogdGhpcy5pZCxcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5fdHJhcEZvY3VzKCk7XG5cdFx0XHR9LmJpbmQodGhpcylcblx0XHQpO1xuXHR9XG5cblx0Y2xvc2UoKSB7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLmRlc3Ryb3koKTtcblx0XHR0aGlzLmRlbGVnYXRlcy53cmFwLmRlc3Ryb3koKTtcblx0XHR0aGlzLmRlbGVnYXRlcy5jb250ZXh0LmRlc3Ryb3koKTtcblxuXHRcdC8vIFJlc3RvcmUgZG9jdW1lbnQgc2Nyb2xsIHdoZW4gbW9kYWxzIG9yIGZ1bGxzY3JlZW4gb3ZlcmxheXMgYXJlIGNsb3NlZC5cblx0XHRpZiAodGhpcy5vcHRzLm1vZGFsIHx8IHRoaXMub3B0cy5mdWxsc2NyZWVuKSB7XG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSB0aGlzLm9yaWdpbmFsT3ZlcmZsb3c7XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGZ1bGxzY3JlZW4gcG9wc3RhdGUgaGFuZGxlciBhbmQgcmUtZW5hYmxlIGRvY3VtZW50IHNjcm9sbC5cblx0XHRpZiAodGhpcy5vcHRzLmZ1bGxzY3JlZW4pIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMucG9wc3RhdGVIYW5kbGVyKTtcblx0XHR9XG5cdFx0Ly8gUmVtb3ZlIHN0YXRlIGZyb20gaGlzdG9yeSBpZiBmdWxsc2NyZWVuIHN0YXRlIGlzIHN0aWxsIGluIGhpc3RvcnkuXG5cdFx0Ly8gRS5nLlRoZSBjbG9zZSBidXR0b24gd2FzIGNsaWNrZWQgZGlyZWN0bHkgcmF0aGVyIHRoYW4gdGhlIGJyb3dzZXIgYmFjayBidXR0b24uXG5cdFx0aWYgKFxuXHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlICYmXG5cdFx0XHR3aW5kb3cuaGlzdG9yeS5zdGF0ZSAmJlxuXHRcdFx0d2luZG93Lmhpc3Rvcnkuc3RhdGVbYG8tb3ZlcmxheS0ke3RoaXMuaWR9YF0gPT09ICdmdWxsc2NyZWVuJ1xuXHRcdCkge1xuXHRcdFx0d2luZG93Lmhpc3RvcnkuYmFjaygpO1xuXHRcdH1cblxuXHRcdHZpZXdwb3J0LnN0b3BMaXN0ZW5pbmdUbygncmVzaXplJyk7XG5cblx0XHR0aGlzLmJyb2FkY2FzdCgnZGVzdHJveScpO1xuXHRcdHRoaXMuYnJvYWRjYXN0KCdldmVudCcsICdvVHJhY2tpbmcnLCB7XG5cdFx0XHRjYXRlZ29yeTogJ292ZXJsYXknLFxuXHRcdFx0YWN0aW9uOiAnY2xvc2UnLFxuXHRcdFx0b3ZlcmxheV9pZDogdGhpcy5pZCxcblx0XHR9KTtcblxuXHRcdHRoaXMuY29udGV4dC5yZW1vdmVDaGlsZCh0aGlzLndyYXBwZXIpO1xuXHRcdGlmICh0aGlzLm9wdHMubW9kYWwpIHtcblx0XHRcdHRoaXMuc2hhZG93LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zaGFkb3cpO1xuXHRcdH1cblxuXHRcdC8vIFB1dCBmb2N1cyBiYWNrIG9uIHRoZSB0cmlnZ2VyaW5nIGVsZW1lbnRcblx0XHRpZiAodGhpcy5vcHRzLnRyaWdnZXIpIHtcblx0XHRcdHRoaXMub3B0cy50cmlnZ2VyLmZvY3VzKCk7XG5cdFx0XHR0aGlzLm9wdHMudHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsICdmYWxzZScpO1xuXHRcdH1cblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZm9jdXNUcmFwKTtcblxuXHRcdHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG5cdFx0aWYgKHRoaXMub3B0cy5sYXllcikge1xuXHRcdFx0dGhpcy5icm9hZGNhc3QoJ2xheWVyQ2xvc2UnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjbG9zZU9uRXh0ZXJuYWxDbGljayhldikge1xuXHRcdGlmIChcblx0XHRcdCF0aGlzLndyYXBwZXIuY29udGFpbnMoZXYudGFyZ2V0KSAmJlxuXHRcdFx0IXRoaXMub3B0cy5tb2RhbCAmJlxuXHRcdFx0dGhpcy5vcHRzLnRyaWdnZXIgJiZcblx0XHRcdCF0aGlzLm9wdHMudHJpZ2dlci5jb250YWlucyhldi50YXJnZXQpXG5cdFx0KSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0Y2xvc2VPbkVzY2FwZVByZXNzKGV2KSB7XG5cdFx0aWYgKCF0aGlzLm9wdHMucHJldmVudGNsb3NpbmcgJiYgZXYua2V5Q29kZSA9PT0gMjcpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdH1cblxuXHRjbG9zZU9uTmV3TGF5ZXIoZXYpIHtcblx0XHRpZiAoIWV2LmRldGFpbCB8fCBldi5kZXRhaWwuZWwgIT09IHRoaXMpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdH1cblxuXHRyZXNpemVMaXN0ZW5lcihldikge1xuXHRcdGlmICghdGhpcy53cmFwcGVyLmNvbnRhaW5zKGV2LnRhcmdldCkpIHtcblx0XHRcdHRoaXMucmVzcG9uZFRvV2luZG93KCk7XG5cdFx0fVxuXHR9XG5cblx0YnJvYWRjYXN0KGV2ZW50VHlwZSwgbmFtZXNwYWNlLCBkZXRhaWwpIHtcblx0XHRuYW1lc3BhY2UgPSBuYW1lc3BhY2UgfHwgJ29PdmVybGF5JztcblxuXHRcdGNvbnN0IGlzTGF5ZXJFdmVudCA9IGV2ZW50VHlwZSA9PT0gJ2xheWVyT3BlbicgfHwgZXZlbnRUeXBlID09PSAnbGF5ZXJDbG9zZSc7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gaXNMYXllckV2ZW50ID8gdGhpcy5jb250ZXh0IDogdGhpcy53cmFwcGVyIHx8IGRvY3VtZW50LmJvZHk7XG5cblx0XHRkZXRhaWwgPSBkZXRhaWwgfHwge307XG5cblx0XHRpZiAobmFtZXNwYWNlICE9PSAnb1RyYWNraW5nJykge1xuXHRcdFx0ZGV0YWlsLmVsID0gdGhpcztcblx0XHR9XG5cblx0XHR0YXJnZXQuZGlzcGF0Y2hFdmVudChcblx0XHRcdG5ldyBDdXN0b21FdmVudChuYW1lc3BhY2UgKyAnLicgKyBldmVudFR5cGUsIHtcblx0XHRcdFx0ZGV0YWlsOiBkZXRhaWwsXG5cdFx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cblxuXHRyZWFsaWduKGRpbWVuc2lvbiwgc2l6ZSkge1xuXHRcdC8vIFJlYWxpZ24gYm90aCBoZWlnaHQgYW5kIHdpZHRoIGFjY29yZGluZyB0byB0aGUgd2luZG93IGJ5IGRlZmF1bHQuXG5cdFx0aWYgKCFkaW1lbnNpb24gJiYgIXNpemUpIHtcblx0XHRcdHRoaXMuX2FsaWduKCd3aWR0aCcsIHZpZXdwb3J0LmdldFNpemUoKS53aWR0aCk7XG5cdFx0XHR0aGlzLl9hbGlnbignaGVpZ2h0Jywgdmlld3BvcnQuZ2V0U2l6ZSgpLmhlaWdodCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRm9yIGEgZ2l2ZW4gZGltZW5zaW9uIHJlYWxpZ24gYWNjb3JkaW5nIHRvIHRoZSB2aWV3cG9ydCBieSBkZWZhdWx0LlxuXHRcdGlmIChkaW1lbnNpb24gJiYgIXNpemUpIHtcblx0XHRcdHRoaXMuX2FsaWduKGRpbWVuc2lvbiwgdmlld3BvcnQuZ2V0U2l6ZSgpWydkaW1lbnNpb24nXSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fYWxpZ24oZGltZW5zaW9uLCBzaXplKTtcblx0fVxuXG5cdF9hbGlnbihkaW1lbnNpb24sIHNpemUpIHtcblx0XHRpZiAoZGltZW5zaW9uICE9PSAnd2lkdGgnICYmIGRpbWVuc2lvbiAhPT0gJ2hlaWdodCcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0YENhbiBub3QgcmVhbGlnbiB0aGUgb3ZlcmxheSBmb3IgdGhlIGRpbWVuc2lvbiBcIiR7ZGltZW5zaW9ufVwiLiBcImhlaWdodFwiIG9yIFwid2lkdGhcIiBleHBlY3RlZC5gXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChpc05hTihzaXplKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRgQ2FuIG5vdCByZWFsaWduIHRoZSBvdmVybGF5IGZvciB0aGUgc2l6ZSAke3NpemV9LiBBIG51bWJlciBpcyBleHBlY3RlZC5gXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGVkZ2UgPSBkaW1lbnNpb24gPT09ICd3aWR0aCcgPyAnbGVmdCcgOiAndG9wJztcblxuXHRcdC8vIFVwZGF0ZSBvdmVybGF5IHNpemUgZm9yIHJlYWxpZ25tZW50IGNhbGN1bGF0aW9uLlxuXHRcdC8vIFdlIG1heSBiZSByZWFsaWduaW5nIGJlY2F1c2UgdGhlIGNvbnRlbnQgd2l0aGluIHRoZSBvdmVybGF5IGhhcyBjaGFuZ2VkLlxuXHRcdHRoaXMud2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XG5cdFx0dGhpcy5oZWlnaHQgPSB0aGlzLmdldEhlaWdodCgpO1xuXG5cdFx0Ly8gRS5nLiB2aWV3cG9ydCBkaW1lbnNpb24gPD0gb3ZlcmxheSBkaW1lbnNpb25cblx0XHRpZiAoc2l6ZSA8PSB0aGlzW2RpbWVuc2lvbl0pIHtcblx0XHRcdHRoaXMud3JhcHBlci5jbGFzc0xpc3QuYWRkKCdvLW92ZXJsYXktLWZ1bGwtJyArIGRpbWVuc2lvbik7XG5cdFx0XHR0aGlzLndyYXBwZXIuc3R5bGVbZWRnZV0gPSAnMCc7XG5cdFx0XHR0aGlzLndyYXBwZXIuc3R5bGVbJ21hcmdpbicgKyB1dGlscy5jYXBpdGFsaXNlKGVkZ2UpXSA9IDA7XG5cdFx0XHRpZiAoZGltZW5zaW9uID09PSAnaGVpZ2h0Jykge1xuXHRcdFx0XHQvLyBTZXQgdGhlIGV4YWN0IGhlaWdodCB0aGF0IHRoZSBjb250ZW50IG9mIHRoZSBvdmVybGF5IHdpbGwgaGF2ZSB3aGljaCBpcyB0aGUgdG90YWxcblx0XHRcdFx0Ly8gaGVpZ2h0IG9mIHRoZSBvdmVybGF5IG1pbnVzIHRoZSBoZWFkaW5nIGlmIHRoZXJlIGlzIG9uZS4gSWYgaGVpZ2h0ID0gMTAwJSwgdGhlXG5cdFx0XHRcdC8vIGhlYWRpbmcgaXMgcGFydCBvZiB0aGF0IDEwMCUsIHNvIHNvbWUgY29udGVudCBpcyB0cnVuY2F0ZWQuXG5cdFx0XHRcdGNvbnN0IGJvcmRlckhlaWdodCA9XG5cdFx0XHRcdFx0dGhpcy53cmFwcGVyLm9mZnNldEhlaWdodCAtIHRoaXMud3JhcHBlci5jbGllbnRIZWlnaHQ7XG5cdFx0XHRcdHRoaXMuY29udGVudC5zdHlsZS5oZWlnaHQgPVxuXHRcdFx0XHRcdHRoaXMud3JhcHBlci5vZmZzZXRIZWlnaHQgLVxuXHRcdFx0XHRcdCh0aGlzLm9wdHMuaGVhZGluZ1xuXHRcdFx0XHRcdFx0PyB0aGlzLndyYXBwZXIucXVlcnlTZWxlY3RvcignaGVhZGVyJykub2Zmc2V0SGVpZ2h0XG5cdFx0XHRcdFx0XHQ6IDApIC1cblx0XHRcdFx0XHRib3JkZXJIZWlnaHQgK1xuXHRcdFx0XHRcdCdweCc7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChkaW1lbnNpb24gPT09ICdoZWlnaHQnKSB7XG5cdFx0XHRcdC8vIFJlbW92ZSB0aGUgcHJvcGVydHkgYW5kIGxldCB0aGUgb3ZlcmxheSBleHRlbmQgdG8gaXRzIGNvbnRlbnRcblx0XHRcdFx0dGhpcy5jb250ZW50LnN0eWxlLmhlaWdodCA9IG51bGw7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLndyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnby1vdmVybGF5LS1mdWxsLScgKyBkaW1lbnNpb24pO1xuXHRcdFx0dGhpcy53cmFwcGVyLnN0eWxlWydtYXJnaW4nICsgdXRpbHMuY2FwaXRhbGlzZShlZGdlKV0gPVxuXHRcdFx0XHQtKHRoaXMud3JhcHBlclsnb2Zmc2V0JyArIHV0aWxzLmNhcGl0YWxpc2UoZGltZW5zaW9uKV0gLyAyKSArICdweCc7XG5cblx0XHRcdC8vIFNldCBhbGlnbm1lbnQgaW4gSmF2YVNjcmlwdCAobm90IHZpYSBDU1MpIGFmdGVyIGFsbCBvdGhlciBzdHlsZXMgaGF2ZSBiZWVuIGFwcGxpZWRcblx0XHRcdC8vIHNvIHRoYXQgYnJvd3NlcnMgY29tcHV0ZSBpdCBwcm9wZXJseS4gSWYgaXQncyBhcHBsaWVkIGVhcmxpZXIsIHdoZW4gdGhlIG5lZ2F0aXZlXG5cdFx0XHQvLyBtYXJnaW4gaXMgY2FsY3VsYXRlZCwgdGhlIG92ZXJsYXkgbWlnaHQgbm90IGZpdCwgc28gaXQgc2hyaW5rcyBhbmQgdGhlIG5lZ2F0aXZlXG5cdFx0XHQvLyBtYXJnaW4gd291bGQgYmUgaW5jb3JyZWN0XG5cdFx0XHR0aGlzLndyYXBwZXIuc3R5bGVbZWRnZV0gPSAnNTAlJztcblx0XHR9XG5cdH1cblxuXHRyZXNwb25kVG9XaW5kb3coKSB7XG5cdFx0dGhpcy5yZWFsaWduKCk7XG5cdH1cblxuXHRmaWxscyhkaW1lbnNpb24pIHtcblx0XHRyZXR1cm4gdGhpcy53cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnby1vdmVybGF5LS1mdWxsLScgKyBkaW1lbnNpb24pO1xuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy52aXNpYmxlID09PSB0cnVlKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLm9wdHMudHJpZ2dlcikge1xuXHRcdFx0dGhpcy5vcHRzLnRyaWdnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0cmlnZ2VyQ2xpY2tIYW5kbGVyKTtcblx0XHR9XG5cdFx0ZGVsZXRlIG92ZXJsYXlzW3RoaXMuaWRdO1xuXHR9XG5cblx0Z2V0SGVpZ2h0KCkge1xuXHRcdGNvbnN0IGJvcmRlckhlaWdodCA9IHRoaXMud3JhcHBlci5vZmZzZXRIZWlnaHQgLSB0aGlzLndyYXBwZXIuY2xpZW50SGVpZ2h0O1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICtcblx0XHRcdCh0aGlzLm9wdHMuaGVhZGluZ1xuXHRcdFx0XHQ/IHRoaXMud3JhcHBlci5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5vZmZzZXRIZWlnaHRcblx0XHRcdFx0OiAwKSArXG5cdFx0XHRib3JkZXJIZWlnaHRcblx0XHQpO1xuXHR9XG5cblx0Z2V0V2lkdGgoKSB7XG5cdFx0Y29uc3QgYm9yZGVyV2lkdGggPSB0aGlzLndyYXBwZXIub2Zmc2V0V2lkdGggLSB0aGlzLndyYXBwZXIuY2xpZW50V2lkdGg7XG5cdFx0cmV0dXJuIHRoaXMuY29udGVudC5zY3JvbGxXaWR0aCArIGJvcmRlcldpZHRoO1xuXHR9XG5cblx0c3RhdGljIGluaXQoZWwpIHtcblx0XHRpZiAoIWVsKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHRcdH1cblx0XHRjb25zdCB0cmlnZ2VycyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5vLW92ZXJsYXktdHJpZ2dlcicpO1xuXHRcdGNvbnN0IG92ZXJsYXlzQXJyYXkgPSBbXTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRyaWdnZXJzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHQvLyBUaGVyZSBjYW4gb25seSBiZSBvbmUgb3ZlcmxheSBwZXIgdHJpZ2dlciB3aGVuIHNldCBkZWNsYXJhdGl2ZWx5LCBzbyB0aGUgZmlyc3QgdHJpZ2dlciBmb3VuZCBmb3IgYSBnaXZlbiBvdmVybGF5IHdpbGwgYmUgdGhlIG9uZSB1c2VkIHRvIGNyZWF0ZSB0aGUgb3ZlcmxheVxuXHRcdFx0aWYgKCFvdmVybGF5c1t0cmlnZ2Vyc1t0XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1vdmVybGF5LWlkJyldKSB7XG5cdFx0XHRcdG92ZXJsYXlzQXJyYXkucHVzaChcblx0XHRcdFx0XHRuZXcgT3ZlcmxheShcblx0XHRcdFx0XHRcdHRyaWdnZXJzW3RdLmdldEF0dHJpYnV0ZSgnZGF0YS1vLW92ZXJsYXktaWQnKSxcblx0XHRcdFx0XHRcdGdldE9wdGlvbnNGcm9tVHJpZ2dlcih0cmlnZ2Vyc1t0XSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG92ZXJsYXlzQXJyYXk7XG5cdH1cblxuXHRzdGF0aWMgZGVzdHJveSgpIHtcblx0XHRjb25zdCBvdmVybGF5SWRzID0gT2JqZWN0LmtleXMob3ZlcmxheXMpO1xuXHRcdG92ZXJsYXlJZHMuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdG92ZXJsYXlzW2lkXS5kZXN0cm95KCk7XG5cdFx0fSk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0T3ZlcmxheXMoKSB7XG5cdFx0cmV0dXJuIG92ZXJsYXlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE92ZXJsYXk7XG4iLCIvKipcbipcbiogRGVib3VuY2VzIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIGFmdGVyIG4gbWlsbGlzZWNvbmRzXG4qIHdpdGhvdXQgaXQgbm90IGJlaW5nIGNhbGxlZFxuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy5kZWJvdW5jZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBkZWJvdW5jZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBEZWJvdW5jZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbi8qKlxuKlxuKiBUaHJvdHRsZSBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLnRocm90dGxlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIHRocm90dGxlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIFRocm90dGxlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbmV4cG9ydCB7XG5cdGRlYm91bmNlLFxuXHR0aHJvdHRsZVxufTtcbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby11dGlscyc7XG5cbmxldCBkZWJ1ZztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICovXG5mdW5jdGlvbiBicm9hZGNhc3QoZXZlbnRUeXBlLCBkYXRhLCB0YXJnZXQpIHtcblx0dGFyZ2V0ID0gdGFyZ2V0IHx8IGRvY3VtZW50LmJvZHk7XG5cblx0aWYgKGRlYnVnKSB7XG5cdFx0Y29uc29sZS5sb2coJ28tdmlld3BvcnQnLCBldmVudFR5cGUsIGRhdGEpO1xuXHR9XG5cblx0dGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvVmlld3BvcnQuJyArIGV2ZW50VHlwZSwge1xuXHRcdGRldGFpbDogZGF0YSxcblx0XHRidWJibGVzOiB0cnVlXG5cdH0pKTtcbn1cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciBoZWlnaHQuXG4qIEByZXR1cm4ge251bWJlcn1cbiovXG5mdW5jdGlvbiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoLlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aFxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG59XG5cbi8qKlxuICogVmlld3BvcnQgc2l6ZS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNpemVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aFxuICovXG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoIGFuZCBoZWlnaHQuXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoL2hlaWdodC5cbiogQHJldHVybiB7U2l6ZX1cbiovXG5mdW5jdGlvbiBnZXRTaXplKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSxcblx0XHR3aWR0aDogZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycylcblx0fTtcbn1cblxuLyoqXG4gKiBTY3JvbGwgcG9zaXRpb24uXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTY3JvbGxQb3NpdGlvblxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxlZnQgLSBgd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRvcCAtIGB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlgXG4gKi9cblxuLyoqXG4gKiBAcmV0dXJuIHtTY3JvbGxQb3NpdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcblx0XHR3aWR0aDogZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCxcblx0XHRsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFgsXG5cdFx0dG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlcblx0fTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gJ3BvcnRyYWl0JyBvciAnbGFuZHNjYXBlJ1xuICovXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbigpIHtcblx0Y29uc3Qgb3JpZW50YXRpb24gPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uO1xuXHRpZiAob3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9yaWVudGF0aW9uID09PSAnc3RyaW5nJyA/XG5cdFx0XHRvcmllbnRhdGlvbi5zcGxpdCgnLScpWzBdIDpcblx0XHRcdG9yaWVudGF0aW9uLnR5cGUuc3BsaXQoJy0nKVswXTtcblx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xuXHRcdHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBnZXRIZWlnaHQoKSA+PSBnZXRXaWR0aCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9XG59XG5cbi8qKlxuICogQHJldHVybiB7Ym9vbGVhbn0gLSB0cnVlIGlmIHRoZSB2aWV3cG9ydCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFZpc2liaWxpdHkoKSB7XG5cdHJldHVybiBkb2N1bWVudC5oaWRkZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGRlYnVnID0gdHJ1ZTtcblx0fSxcblx0YnJvYWRjYXN0LFxuXHRnZXRXaWR0aCxcblx0Z2V0SGVpZ2h0LFxuXHRnZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eSxcblx0Z2V0T3JpZW50YXRpb24sXG5cdGRlYm91bmNlOiBVdGlscy5kZWJvdW5jZSxcblx0dGhyb3R0bGU6IFV0aWxzLnRocm90dGxlXG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vc3JjL3V0aWxzLmpzJztcblxuY29uc3QgdGhyb3R0bGUgPSB1dGlscy50aHJvdHRsZTtcbmNvbnN0IGRlYm91bmNlID0gdXRpbHMuZGVib3VuY2U7XG5cbmNvbnN0IGxpc3RlbmVycyA9IHt9O1xuY29uc3QgaW50ZXJ2YWxzID0ge1xuXHRyZXNpemU6IDEwMCxcblx0b3JpZW50YXRpb246IDEwMCxcblx0dmlzaWJpbGl0eTogMTAwLFxuXHRzY3JvbGw6IDEwMFxufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IHRvIHRocm90dGxlIGZvciB0aGlzIGR1cmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsIC0gVGhlIGR1cmF0aW9uIHRvIHRocm90dGxlIGluIG1zLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogXHQgICAvLyB0aHJvdHRsZSBmb3IgZGlmZmVyZW50IGV2ZW50cyBhdCBkaWZmZXJlbnQgZHVyYXRpb25zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgMTAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIDMwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIDMwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCAzMClcbiAqIFx0XHQvLyB0aHJvdHRsZSBhbGwgZXZlbnRzIGF0IDMwbXNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKDMwKTtcbiAqL1xuZnVuY3Rpb24gc2V0VGhyb3R0bGVJbnRlcnZhbChldmVudFR5cGUsIGludGVydmFsKSB7XG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJykge1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIGFyZ3VtZW50c1swXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgYXJndW1lbnRzWzFdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIGFyZ3VtZW50c1syXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIGFyZ3VtZW50c1szXSk7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwpIHtcblx0XHRpbnRlcnZhbHNbZXZlbnRUeXBlXSA9IGludGVydmFsO1xuXHR9XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvUmVzaXplKCkge1xuXHRpZiAobGlzdGVuZXJzLnJlc2l6ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdyZXNpemUnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnJlc2l6ZSk7XG5cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMucmVzaXplID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9PcmllbnRhdGlvbigpIHtcblxuXHRpZiAobGlzdGVuZXJzLm9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ29yaWVudGF0aW9uY2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdvcmllbnRhdGlvbicsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24oKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5vcmllbnRhdGlvbik7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLm9yaWVudGF0aW9uID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9WaXNpYmlsaXR5KCkge1xuXG5cdGlmIChsaXN0ZW5lcnMudmlzaWJpbGl0eSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCd2aXNpYmlsaXR5Jywge1xuXHRcdFx0aGlkZGVuOiB1dGlscy5nZXRWaXNpYmlsaXR5KCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMudmlzaWJpbGl0eSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuXHRsaXN0ZW5lcnMudmlzaWJpbGl0eSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvU2Nyb2xsKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMuc2Nyb2xsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Njcm9sbCc7XG5cdGNvbnN0IGhhbmRsZXIgPSB0aHJvdHRsZShmdW5jdGlvbihldikge1xuXHRcdGNvbnN0IHNjcm9sbFBvcyA9IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdzY3JvbGwnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0c2Nyb2xsSGVpZ2h0OiBzY3JvbGxQb3MuaGVpZ2h0LFxuXHRcdFx0c2Nyb2xsTGVmdDogc2Nyb2xsUG9zLmxlZnQsXG5cdFx0XHRzY3JvbGxUb3A6IHNjcm9sbFBvcy50b3AsXG5cdFx0XHRzY3JvbGxXaWR0aDogc2Nyb2xsUG9zLndpZHRoLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnNjcm9sbCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnNjcm9sbCA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RhcnQgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqXG4gKiBcdFx0Ly8gSXQgaXMgbm93IHBvc3NpYmxlIHRvIGxpc3RlbiBmb3IgZGVib3VuY2Ugby12aWV3cG9ydCBldmVudHMgc3VjaCBhcyBgb1ZpZXdwb3J0Lm9yaWVudGF0aW9uYC5cbiAqICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQub3JpZW50YXRpb24nLCBmdW5jdGlvbihldmVudCkge1xuICogICAgICBcdGNvbnNvbGUubG9nKGV2ZW50LnR5cGUpOyAvLyBvVmlld3BvcnQub3JpZW50YXRpb25cbiAqICAgICAgfSk7XG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAncmVzaXplJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9SZXNpemUoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdzY3JvbGwnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Njcm9sbCgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ29yaWVudGF0aW9uJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9PcmllbnRhdGlvbigpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Zpc2liaWxpdHknIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Zpc2liaWxpdHkoKTtcblx0fVxufVxuXG4vKipcbiAqIFN0b3AgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RvcCBsaXN0ZW5pbmcgZm9yLiBPbmUgb2YgYHJlc2l6ZWAsIGBzY3JvbGxgLCBgb3JpZW50YXRpb25gLCBgdmlzaWJpbGl0eWAgb3IgYGFsbGAuXG4gKiBAZXhhbXBsZVxuICogXHRcdC8vIFN0YXJ0IGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ2FsbCcpO1xuICogXHRcdC8vIFdlJ3JlIGRvbmUuIFN0b3AgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5zdG9wTGlzdGVuaW5nVG8oJ2FsbCcpO1xuICovXG5mdW5jdGlvbiBzdG9wTGlzdGVuaW5nVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0T2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKHN0b3BMaXN0ZW5pbmdUbyk7XG5cdH0gZWxzZSBpZiAobGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcnNbZXZlbnRUeXBlXS5ldmVudFR5cGUsIGxpc3RlbmVyc1tldmVudFR5cGVdLmhhbmRsZXIpO1xuXHRcdGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRUeXBlXTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbiAoKSB7XG5cdFx0dXRpbHMuZGVidWcoKTtcblx0fSxcblx0bGlzdGVuVG8sXG5cdHN0b3BMaXN0ZW5pbmdUbyxcblx0c2V0VGhyb3R0bGVJbnRlcnZhbCxcblx0Z2V0T3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uLFxuXHRnZXRTaXplOiB1dGlscy5nZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbjogdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHk6IHV0aWxzLmdldFZpc2liaWxpdHlcbn07XG4iLCJleHBvcnQgZGVmYXVsdCB7XG5cdHVuQ2FwaXRhbGlzZTogZnVuY3Rpb24oc3RyKSB7XG5cdFx0cmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHIoMSk7XG5cdH0sXG5cblx0Y2FwaXRhbGlzZTogZnVuY3Rpb24oc3RyKSB7XG5cdFx0cmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHIoMSk7XG5cdH0sXG5cblx0Y29weUNvbnRlbnRGcm9tRWxlbWVudDogZnVuY3Rpb24oY29udGVudCwgY2FsbGJhY2spIHtcblx0XHRjb25zdCBodG1sID0gY29udGVudC5ub2RlTmFtZSA9PT0gJ1NDUklQVCcgPyBjb250ZW50LmlubmVySFRNTCA6IGNvbnRlbnQub3V0ZXJIVE1MO1xuXHRcdGNhbGxiYWNrKGh0bWwpO1xuXHR9LFxuXG5cdGNvcHlDb250ZW50RnJvbVVybDogZnVuY3Rpb24odXJsLCBjYWxsYmFjaykge1xuXHRcdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuXHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHsgLy8gZXNsaW50IGNvbXBsYWlucyBvZiBlIG5vdCBiZWluZyB1c2VkXG5cdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCdDb250ZW50IGZhaWxlZCB0byBsb2FkIGNvcnJlY3RseScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignXCJvLW92ZXJsYXkgZXJyb3JcIjogRmV0Y2hpbmcgY29udGVudCBmcm9tICcgKyB1cmwgKyAnIGZhaWxlZCB3aXRoIGVycnJvciAnICsgZSk7XG5cdFx0fTtcblxuXHRcdHhoci5zZW5kKG51bGwpO1xuXHR9LFxuXG5cdG9wdGlvbnNGcm9tS2V5OiBmdW5jdGlvbihrZXksIHZhbHVlLCBvcHRzKSB7XG5cdFx0Y29uc3QgZGFzaEluZGV4ID0ga2V5LmluZGV4T2YoJy0nKTtcblx0XHRpZiAoZGFzaEluZGV4ID09PSAtMSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSWYgaXQncyBhIEpTT04sIGEgYm9vbGVhbiBvciBhIG51bWJlciwgd2Ugd2FudCBpdCBzdG9yZWQgbGlrZSB0aGF0LCBhbmQgbm90IGFzIGEgc3RyaW5nXG5cdFx0XHRcdC8vIFdlIGFsc28gcmVwbGFjZSBhbGwgJyB3aXRoIFwiIHNvIEpTT04gc3RyaW5ncyBhcmUgcGFyc2VkIGNvcnJlY3RseVxuXHRcdFx0XHRvcHRzW2tleV0gPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdG9wdHNba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBLZXkgdGhhdCBob2xkcyBhbiBvYmplY3QgaW5zdGVhZCBvZiBhIHZhbHVlXG5cdFx0XHRjb25zdCBzdWJLZXkgPSBrZXkuc3Vic3RyKDAsIGRhc2hJbmRleCk7XG5cblx0XHRcdC8vIElmIHN1Yi1vYmplY3QgZG9lc24ndCBleGlzdCBhbHJlYWR5LCBjcmVhdGUgaXRcblx0XHRcdGlmICghb3B0c1tzdWJLZXldKXtcblx0XHRcdFx0b3B0c1tzdWJLZXldID0ge307XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJ1biBmdW5jdGlvbiBhZ2FpbiBzdGFydGluZyB3aXRoIHRoZSByZXN0IG9mIHRoZSBrZXlcblx0XHRcdG9wdHNbc3ViS2V5XSA9IHRoaXMub3B0aW9uc0Zyb21LZXkoa2V5LnN1YnN0cihkYXNoSW5kZXgrMSksIHZhbHVlLCBvcHRzW3N1YktleV0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBvcHRzO1xuXHR9LFxuXG5cdC8vIENvZGUgYmFzZWQgb24gdGhpcyBhcnRpY2xlIHRvIGdldCBjb29yZGluYXRlcyBpbmRlcGVuZGVudCBvZiBzY3JvbGw6IGh0dHA6Ly9qYXZhc2NyaXB0LmluZm8vdHV0b3JpYWwvY29vcmRpbmF0ZXNcblx0Z2V0T2Zmc2V0UmVjdDogZnVuY3Rpb24oZSkge1xuXHRcdGNvbnN0IGVDbGllbnRSZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXHRcdGNvbnN0IGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHQvLyBkb2NFbGVtLnNjcm9sbFRvcC9MZWZ0IGZvciBJRSwgdXNlIGJvZHkgYXMgYSBsYXN0IHJlc29ydFxuXHRcdGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbGVtLnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcDtcblx0XHRjb25zdCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsZW0uc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG5cblx0XHQvLyBJRSBzb21ldGltZXMgc2hpZnRzIHRoZSB1cHBlciBsZWZ0IGNvcm5lclxuXHRcdGNvbnN0IGNsaWVudFRvcCA9IGRvY0VsZW0uY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG5cdFx0Y29uc3QgY2xpZW50TGVmdCA9IGRvY0VsZW0uY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuXHRcdHJldHVybiB7XG5cdFx0XHQvLyBJRTggZG9lc24ndCBzdXBwb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCBhbmQgLndlaWdodFxuXHRcdFx0d2lkdGg6IGVDbGllbnRSZWN0LndpZHRoIHx8IGVDbGllbnRSZWN0LnJpZ2h0IC0gZUNsaWVudFJlY3QubGVmdCxcblx0XHRcdGhlaWdodDogZUNsaWVudFJlY3QuaGVpZ2h0IHx8IGVDbGllbnRSZWN0LmJvdHRvbSAtIGVDbGllbnRSZWN0LnRvcCxcblx0XHRcdHRvcDogZUNsaWVudFJlY3QudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuXHRcdFx0bGVmdDogZUNsaWVudFJlY3QubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0XG5cdFx0fTtcblx0fVxufTtcbiIsIlxuaW1wb3J0IE92ZXJsYXkgZnJvbSAnLi9zcmMvanMvb3ZlcmxheS5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRPdmVybGF5LmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IE92ZXJsYXk7XG4iLCJpbXBvcnQgT3ZlcmxheSBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tb3ZlcmxheSc7XG5cbmNvbnN0IGZvcm0gPSBgPGZvcm0gaWQ9XCJvLWNvbW1lbnRzLWRpc3BsYXluYW1lLWZvcm1cIiBjbGFzcz1cIm8tZm9ybXMgby1mb3JtcyBvLWNvbW1lbnRzX19kaXNwbGF5bmFtZS1mb3JtXCI+XG5cdFx0XHQ8bGFiZWwgZm9yPVwiby1jb21tZW50cy1kaXNwbGF5bmFtZS1pbnB1dFwiIGNsYXNzPVwiby1mb3Jtcy1maWVsZCBvLWNvbW1lbnRzX19kaXNwbGF5bmFtZS1maWVsZFwiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm8tZm9ybXMtdGl0bGVcIj5EaXNwbGF5IG5hbWU8L3NwYW4+XG5cdFx0XHQ8L2xhYmVsPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm8tY29tbWVudHNfX2Rpc3BsYXluYW1lLWNvbnRhaW5lclwiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm8tZm9ybXMtaW5wdXQgby1mb3Jtcy1pbnB1dC0tdGV4dCBvLWNvbW1lbnRzX19kaXNwbGF5bmFtZS1pbnB1dFwiPlxuXHRcdFx0XHRcdDxpbnB1dCBpZD1cIm8tY29tbWVudHMtZGlzcGxheW5hbWUtaW5wdXRcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiByZXF1aXJlZD1cIlwiPlxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiby1jb21tZW50c19fZGlzcGxheW5hbWUtc3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8c3BhbiBpZD1cIm8tY29tbWVudHMtZGlzcGxheW5hbWUtZXJyb3JcIiBjbGFzcz1cIm8tZm9ybXMtaW5wdXRfX2Vycm9yIG8tY29tbWVudHNfX2Rpc3BsYXluYW1lLWVycm9yXCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCI+PC9zcGFuPlxuXHQ8L2Zvcm0+XG48L2Zvcm0+YDtcblxuY29uc3QgaXNVbmlxdWUgPSAoZGlzcGxheU5hbWUpID0+IHtcblx0Y29uc3QgdXJsID0gYGh0dHBzOi8vY29tbWVudHMtYXBpLmZ0LmNvbS9kaXNwbGF5bmFtZS9pc2F2YWlsYWJsZS8ke2VuY29kZVVSSUNvbXBvbmVudChkaXNwbGF5TmFtZSl9YDtcblxuXHRyZXR1cm4gZmV0Y2godXJsLCB7IG1ldGhvZDogJ0dFVCcgfSlcblx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0LnRoZW4oKHthdmFpbGFibGV9KSA9PiB7XG5cdFx0XHRyZXR1cm4gYXZhaWxhYmxlO1xuXHRcdH0pO1xufTtcblxuY29uc3QgZmluZEludmFsaWRDaGFyYWN0ZXJzID0gKGRpc3BsYXlOYW1lKSA9PiB7XG5cdC8qXG5cdCAqIEFsbG93ZWQgQ2hhcmFjdGVyc1xuXHQgKiBUaGUgYmVsb3cgcmVnZXggbWF0Y2hlcyBhbnkgY2hhcmFjdGVyIG5vdCBpbiB0aGUgYWxsb3dlZCBjaGFyYWN0ZXJzIHNldFxuXHQgKiBBbGwgYWxsb3dlZCBjaGFyYWN0ZXJzIGFyZSBjYXNlIGluc2Vuc2l0aXZlXG5cdCAqIEFueXRoaW5nIGluIHRoZSByYW5nZSBBLVogb3IgMC05IGlzIGFsbG93ZWRcblx0ICogQW55IG9mIHRoZSBiZWxvdyBzcGVjaWFsIGNoYXJhY3RlcnMgYXJlIGFsbG93ZWRcblx0ICogISMkJSdgKCkqKywtLi86Oz1AW11eX3t8fVxuXHQgKiBTcGFjZXMgYXJlIGFsbG93ZWRcblx0ICovXG5cblx0Y29uc3QgbWF0Y2hJbnZhbGlkQ2hhcmFjdGVycyA9IC9bXjAtOWEteiEjJCUnYCgpKissXFwtLlxcLzo7PUBbXFxdXFxeX3t9XFx8XFxzXS9naTtcblx0Y29uc3QgbWF0Y2hpbmdDaGFyYWN0ZXJzID0gZGlzcGxheU5hbWVcblx0XHQubWF0Y2gobWF0Y2hJbnZhbGlkQ2hhcmFjdGVycyk7XG5cdGNvbnN0IHVuaXF1ZU1hdGNoaW5nQ2hhcmFjdGVycyA9IG1hdGNoaW5nQ2hhcmFjdGVycyAmJiBtYXRjaGluZ0NoYXJhY3RlcnMubGVuZ3RoID9cblx0XHRtYXRjaGluZ0NoYXJhY3RlcnNcblx0XHRcdC5maWx0ZXIoKGNoYXJhY3RlciwgcG9zaXRpb24pID0+IG1hdGNoaW5nQ2hhcmFjdGVycy5pbmRleE9mKGNoYXJhY3RlcikgPT09IHBvc2l0aW9uKSA6XG5cdFx0W107XG5cblx0cmV0dXJuIHVuaXF1ZU1hdGNoaW5nQ2hhcmFjdGVycy5sZW5ndGggP1xuXHRcdHVuaXF1ZU1hdGNoaW5nQ2hhcmFjdGVycy5qb2luKCcnKSA6XG5cdFx0ZmFsc2U7XG59O1xuXG5jb25zdCBwcm9tcHQgPSAoKSA9PiB7XG5cdGNvbnN0IG92ZXJsYXkgPSBuZXcgT3ZlcmxheSgnZGlzcGxheU5hbWUnLCB7XG5cdFx0aHRtbDogZm9ybSxcblx0XHRjbGFzczogJ28tY29tbWVudHNfX2Rpc3BsYXluYW1lLXByb21wdCcsXG5cdFx0Y29tcGFjdDogdHJ1ZSxcblx0XHRoZWFkaW5nOiB7XG5cdFx0XHR0aXRsZTogJ0Nob29zZSBhIGNvbW1lbnRpbmcgZGlzcGxheSBuYW1lJ1xuXHRcdH1cblx0fSk7XG5cblx0b3ZlcmxheS5vcGVuKCk7XG5cblx0cmV0dXJuIG92ZXJsYXk7XG59O1xuXG5jb25zdCB2YWxpZGF0aW9uID0gKGRpc3BsYXlOYW1lKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKCFkaXNwbGF5TmFtZSkge1xuXHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoJ0VtcHR5IGRpc3BsYXkgbmFtZScpKTtcblx0XHR9XG5cblx0XHRjb25zdCBpbnZhbGlkQ2hhcmFjdGVycyA9IGZpbmRJbnZhbGlkQ2hhcmFjdGVycyhkaXNwbGF5TmFtZSk7XG5cblx0XHRpZiAoaW52YWxpZENoYXJhY3RlcnMpIHtcblx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKGBUaGUgZGlzcGxheSBuYW1lIGNvbnRhaW5zIHRoZSBmb2xsb3dpbmcgaW52YWxpZCBjaGFyYWN0ZXJzOiAke2ludmFsaWRDaGFyYWN0ZXJzfWApKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aXNVbmlxdWUoZGlzcGxheU5hbWUpXG5cdFx0XHRcdC50aGVuKGlzVW5pcXVlID0+IHtcblx0XHRcdFx0XHRpZiAoIWlzVW5pcXVlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignVW5mb3J0dW5hdGVseSB0aGF0IGRpc3BsYXkgbmFtZSBpcyBhbHJlYWR5IHRha2VuJykpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzb2x2ZShkaXNwbGF5TmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGFwaUVycm9yID0gbmV3IEVycm9yKCdTb3JyeSwgd2UgYXJlIHVuYWJsZSB0byB1cGRhdGUgZGlzcGxheSBuYW1lcy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nKTtcblxuXHRcdFx0XHRcdGFwaUVycm9yLm5hbWUgPSAnQ29tbWVudHNBcGlFcnJvcic7XG5cblx0XHRcdFx0XHRyZXR1cm4gcmVqZWN0KGFwaUVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbmNvbnN0IHByb21wdFZhbGlkYXRpb24gPSAoZXZlbnQpID0+IHtcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0Y29uc3QgZGlzcGxheU5hbWVGb3JtID0gZXZlbnQuc3JjRWxlbWVudDtcblx0XHRjb25zdCBpbnB1dCA9IGRpc3BsYXlOYW1lRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRcdGNvbnN0IGRpc3BsYXlOYW1lID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXHRcdGNvbnN0IGVycm9yTWVzc2FnZSA9IGRpc3BsYXlOYW1lRm9ybS5xdWVyeVNlbGVjdG9yKCcjby1jb21tZW50cy1kaXNwbGF5bmFtZS1lcnJvcicpO1xuXG5cdFx0ZXJyb3JNZXNzYWdlLmlubmVyVGV4dCA9ICcnO1xuXHRcdGRpc3BsYXlOYW1lRm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdvLWZvcm1zLWlucHV0LS1pbnZhbGlkJyk7XG5cblxuXHRcdHJldHVybiB2YWxpZGF0aW9uKGRpc3BsYXlOYW1lKVxuXHRcdFx0LnRoZW4oZGlzcGxheU5hbWUgPT4gcmVzb2x2ZShkaXNwbGF5TmFtZSkpXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRlcnJvck1lc3NhZ2UuaW5uZXJUZXh0ID0gZXJyb3IubWVzc2FnZTtcblx0XHRcdFx0ZGlzcGxheU5hbWVGb3JtLmNsYXNzTGlzdC5hZGQoJ28tZm9ybXMtaW5wdXQtLWludmFsaWQnKTtcblxuXHRcdFx0XHRpZiAoZXJyb3IubmFtZSA9PT0gJ0NvbW1lbnRzQXBpRXJyb3InKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0cHJvbXB0LFxuXHR2YWxpZGF0aW9uLFxuXHRwcm9tcHRWYWxpZGF0aW9uXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuXHRmZXRjaEpzb25XZWJUb2tlbjogZnVuY3Rpb24gZmV0Y2hKc29uV2ViVG9rZW4gKG9wdGlvbnMgPSB7fSkge1xuXHRcdGNvbnN0IHVybCA9IG5ldyBVUkwoJ2h0dHBzOi8vY29tbWVudHMtYXBpLmZ0LmNvbS91c2VyL2F1dGgvJyk7XG5cblx0XHRpZiAob3B0aW9ucy5kaXNwbGF5TmFtZSkge1xuXHRcdFx0dXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ2Rpc3BsYXlOYW1lJywgb3B0aW9ucy5kaXNwbGF5TmFtZSk7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMudXNlU3RhZ2luZ0Vudmlyb25tZW50KSB7XG5cdFx0XHR1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgnc3RhZ2luZycsICcxJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZldGNoKHVybCwgeyBjcmVkZW50aWFsczogJ2luY2x1ZGUnIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdC8vIHVzZXIgaXMgc2lnbmVkIGluIGFuZCBoYXMgYSBwc2V1ZG9ueW1cblx0XHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdC8vIHVzZXIgaXMgc2lnbmVkIGluIGJ1dCBoYXMgbm8gZGlzcGxheSBuYW1lXG5cdFx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwOSkge1xuXHRcdFx0XHRcdHJldHVybiB7IHVzZXJIYXNWYWxpZFNlc3Npb246IHRydWUgfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIHVzZXIgaXMgbm90IHNpZ25lZCBpbiBvciBzZXNzaW9uIHRva2VuIGlzIGludmFsaWRcblx0XHRcdFx0Ly8gb3IgZXJyb3IgaW4gY29tbWVudHMgYXBpXG5cdFx0XHRcdHJldHVybiB7IHVzZXJIYXNWYWxpZFNlc3Npb246IGZhbHNlIH07XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwdXJnZUp3dENhY2hlKCkge1xuXHRjb25zdCB1cmwgPSBgaHR0cHM6Ly9jb21tZW50cy1hcGkuZnQuY29tL3VzZXIvYXV0aGA7XG5cdHJldHVybiBmZXRjaCh1cmwsIHtcblx0XHRtZXRob2Q6ICdQVVJHRScsXG5cdFx0Y3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuXHR9KTtcbn1cbiIsImltcG9ydCBldmVudHMgZnJvbSAnLi91dGlscy9ldmVudHMuanMnO1xuaW1wb3J0IGRpc3BsYXlOYW1lIGZyb20gJy4vdXRpbHMvZGlzcGxheS1uYW1lLmpzJztcbmltcG9ydCBhdXRoIGZyb20gJy4vdXRpbHMvYXV0aC5qcyc7XG5pbXBvcnQgcHVyZ2VKd3RDYWNoZSBmcm9tICcuL3V0aWxzL3B1cmdlLWp3dC1jYWNoZS5qcyc7XG5cbmNsYXNzIFN0cmVhbSB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW3N0cmVhbUVsXSAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKi9cblx0Y29uc3RydWN0b3IgKHN0cmVhbUVsLCBvcHRzID0ge30pIHtcblx0XHR0aGlzLnN0cmVhbUVsID0gc3RyZWFtRWwgfHwgZG9jdW1lbnQ7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0cztcblx0XHR0aGlzLmV2ZW50U2VlblRpbWVzID0ge307XG5cdFx0dGhpcy51c2VTdGFnaW5nRW52aXJvbm1lbnQgPSBCb29sZWFuKG9wdHMudXNlU3RhZ2luZ0Vudmlyb25tZW50KTtcblx0fVxuXG5cdGluaXQgKCkge1xuXHRcdGNvbnN0IHJlbmRlckFuZEF1dGhlbnRpY2F0ZSA9IChkaXNwbGF5TmFtZSkgPT4ge1xuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFt0aGlzLnJlbmRlckNvbW1lbnRzKCksIHRoaXMuYXV0aGVudGljYXRlVXNlcihkaXNwbGF5TmFtZSldKVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5sb2dpbigpO1xuXHRcdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGRpc3BsYXlOYW1lLnZhbGlkYXRpb24odGhpcy5vcHRpb25zLmRpc3BsYXlOYW1lKVxuXHRcdFx0LnRoZW4oZGlzcGxheU5hbWUgPT4gcmVuZGVyQW5kQXV0aGVudGljYXRlKGRpc3BsYXlOYW1lKSlcblx0XHRcdC5jYXRjaCgoKSA9PiByZW5kZXJBbmRBdXRoZW50aWNhdGUoKSk7XG5cdH1cblxuXHRsb2dpbiAoKSB7XG5cdFx0aWYgKHRoaXMuYXV0aGVudGljYXRpb25Ub2tlbikge1xuXHRcdFx0dGhpcy5lbWJlZC5sb2dpbih0aGlzLmF1dGhlbnRpY2F0aW9uVG9rZW4pO1xuXG5cdFx0XHRpZiAodGhpcy5kaXNwbGF5TmFtZSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlclNpZ25lZEluTWVzc2FnZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGF1dGhlbnRpY2F0ZVVzZXIgKGRpc3BsYXlOYW1lKSB7XG5cdFx0Y29uc3QgZmV0Y2hPcHRpb25zID0ge1xuXHRcdFx0dXNlU3RhZ2luZ0Vudmlyb25tZW50OiB0aGlzLnVzZVN0YWdpbmdFbnZpcm9ubWVudFxuXHRcdH07XG5cblx0XHRpZiAoZGlzcGxheU5hbWUpIHtcblx0XHRcdGZldGNoT3B0aW9ucy5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuXHRcdH1cblxuXHRcdHJldHVybiBhdXRoLmZldGNoSnNvbldlYlRva2VuKGZldGNoT3B0aW9ucylcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0dGhpcy5kaXNwbGF5TmFtZSA9IHJlc3BvbnNlLmRpc3BsYXlOYW1lO1xuXG5cdFx0XHRcdGlmIChyZXNwb25zZS50b2tlbikge1xuXHRcdFx0XHRcdHRoaXMuYXV0aGVudGljYXRpb25Ub2tlbiA9IHJlc3BvbnNlLnRva2VuO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMudXNlckhhc1ZhbGlkU2Vzc2lvbiA9IHJlc3BvbnNlLnVzZXJIYXNWYWxpZFNlc3Npb247XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHJlbmRlckNvbW1lbnRzICgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8qZ2xvYmFsIENvcmFsKi9cblx0XHRcdFx0Y29uc3QgY2FjaGVCdXN0ZXIgPSAnY2FjaGVidXN0PTIwMjEwODA2Jztcblx0XHRcdFx0Y29uc3Qgcm9vdFVybCA9IHRoaXMudXNlU3RhZ2luZ0Vudmlyb25tZW50XG5cdFx0XHRcdFx0PyAnaHR0cHM6Ly9mdC5zdGFnaW5nLmNvcmFsLmNvcmFscHJvamVjdC5uZXQnXG5cdFx0XHRcdFx0OiAnaHR0cHM6Ly9mdC5jb3JhbC5jb3JhbHByb2plY3QubmV0JztcblxuXHRcdFx0XHRjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0XHRcdHNjcmlwdEVsZW1lbnQuc3JjID0gYCR7cm9vdFVybH0vYXNzZXRzL2pzL2VtYmVkLmpzPyR7Y2FjaGVCdXN0ZXJ9YDtcblxuXHRcdFx0XHRzY3JpcHRFbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmVtYmVkID0gQ29yYWwuY3JlYXRlU3RyZWFtRW1iZWQoXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGlkOiB0aGlzLnN0cmVhbUVsLmlkLFxuXHRcdFx0XHRcdFx0XHRzdG9yeVVSTDogdGhpcy5vcHRpb25zLmFydGljbGVVcmwsXG5cdFx0XHRcdFx0XHRcdHN0b3J5SUQ6IHRoaXMub3B0aW9ucy5hcnRpY2xlSWQsXG5cdFx0XHRcdFx0XHRcdHJvb3RVUkw6IHJvb3RVcmwsXG5cdFx0XHRcdFx0XHRcdGF1dG9SZW5kZXI6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGV2ZW50czogKGV2ZW50cykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGV2ZW50cy5vbkFueSgobmFtZSwgZGF0YSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5wdWJsaXNoRXZlbnQoe25hbWUsIGRhdGF9KTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLnN0cmVhbUVsLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XG5cblx0XHRcdFx0aWYgKHRoaXMudXNlU3RhZ2luZ0Vudmlyb25tZW50KSB7XG5cdFx0XHRcdFx0Y29uc3Qgc3RhZ2luZ1dhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0XHRzdGFnaW5nV2FybmluZy5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm8tY29tbWVudHNfX3N0YWdpbmctbWVzc2FnZS1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJvLWNvbW1lbnRzX19zdGFnaW5nLW1lc3NhZ2UtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cIm8tY29tbWVudHNfX3N0YWdpbmctbWVzc2FnZVwiPllvdSBhcmUgb24gdGhlIHN0YWdpbmcgZW52aXJvbm1lbnQgZm9yIENvbW1lbnRzPC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+YDtcblx0XHRcdFx0XHR0aGlzLnN0cmVhbUVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHN0YWdpbmdXYXJuaW5nLCB0aGlzLnN0cmVhbUVsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdvQ29tbWVudHNSZWFkeScpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGRpc3BsYXlOYW1lUHJvbXB0ICh7cHVyZ2VDYWNoZUFmdGVyQ29tcGxldGlvbiA9IGZhbHNlfSA9IHt9KSB7XG5cdFx0Y29uc3Qgb3ZlcmxheSA9IGRpc3BsYXlOYW1lLnByb21wdCgpO1xuXG5cdFx0Y29uc3Qgb25PdmVybGF5UmVhZHkgPSAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IHNvdXJjZU92ZXJsYXkgPSBldmVudC5zcmNFbGVtZW50O1xuXHRcdFx0Y29uc3QgZGlzcGxheU5hbWVGb3JtID0gc291cmNlT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjby1jb21tZW50cy1kaXNwbGF5bmFtZS1mb3JtJyk7XG5cblx0XHRcdGlmIChkaXNwbGF5TmFtZUZvcm0pIHtcblx0XHRcdFx0ZGlzcGxheU5hbWVGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuXHRcdFx0XHRcdGRpc3BsYXlOYW1lLnByb21wdFZhbGlkYXRpb24oZXZlbnQpXG5cdFx0XHRcdFx0XHQudGhlbihkaXNwbGF5TmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRcdG92ZXJsYXkuY2xvc2UoKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5hdXRoZW50aWNhdGVVc2VyKGRpc3BsYXlOYW1lKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMubG9naW4oKTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0aWYgKHB1cmdlQ2FjaGVBZnRlckNvbXBsZXRpb24pIHtcblx0XHRcdFx0XHRcdFx0XHRwdXJnZUp3dENhY2hlKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ29PdmVybGF5LnJlYWR5Jywgb25PdmVybGF5UmVhZHkpO1xuXG5cdFx0Y29uc3Qgb25PdmVybGF5Q2xvc2VkID0gKCkgPT4ge1xuXHRcdFx0b3ZlcmxheS5jb250ZXh0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29MYXllcnMuY2xvc2UnLCBvbk92ZXJsYXlDbG9zZWQpO1xuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb092ZXJsYXkucmVhZHknLCBvbk92ZXJsYXlSZWFkeSk7XG5cdFx0XHRvdmVybGF5LmRlc3Ryb3koKTtcblx0XHR9O1xuXHRcdG92ZXJsYXkuY29udGV4dC5hZGRFdmVudExpc3RlbmVyKCdvTGF5ZXJzLmNsb3NlJywgb25PdmVybGF5Q2xvc2VkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFbWl0cyBldmVudHMgdGhhdCBoYXZlIGEgdmFsaWQgby1jb21tZW50IGV2ZW50IG5hbWUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gVGhlIGV2ZW50IG5hbWVcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBUaGUgZXZlbnQgcGF5bG9hZFxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHB1Ymxpc2hFdmVudCAoe25hbWUsIGRhdGEgPSB7fX0pIHtcblx0XHRjb25zdCB7XG5cdFx0XHRzdWNjZXNzOiB7XG5cdFx0XHRcdHN0YXR1c1xuXHRcdFx0fSA9IHt9LFxuXHRcdFx0ZXJyb3Jcblx0XHR9ID0gZGF0YTtcblxuXHRcdGlmIChuYW1lID09PSAnbG9naW5Qcm9tcHQnICYmIHRoaXMudXNlckhhc1ZhbGlkU2Vzc2lvbikge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGlzcGxheU5hbWVQcm9tcHQoKTtcblx0XHR9XG5cblx0XHRjb25zdCBtYXBwZWRFdmVudCA9IGV2ZW50cy5jb3JhbEV2ZW50TWFwLmdldChuYW1lKTtcblxuXHRcdGlmIChtYXBwZWRFdmVudCkge1xuXHRcdFx0Y29uc3Qgbm93ID0gTnVtYmVyKG5ldyBEYXRlKTtcblx0XHRcdGNvbnN0IGRlbGF5SW5NaWxsaXNlY29uZHMgPSAxMDA7XG5cdFx0XHRjb25zdCBldmVudEhhc250QmVlblNlZW5SZWNlbnRseSA9ICF0aGlzLmV2ZW50U2VlblRpbWVzW21hcHBlZEV2ZW50Lm9Db21tZW50c10gfHxcblx0XHRcdFx0bm93ID4gdGhpcy5ldmVudFNlZW5UaW1lc1ttYXBwZWRFdmVudC5vQ29tbWVudHNdICsgZGVsYXlJbk1pbGxpc2Vjb25kcztcblxuXHRcdFx0aWYgKGV2ZW50SGFzbnRCZWVuU2VlblJlY2VudGx5KSB7XG5cdFx0XHRcdHRoaXMuZXZlbnRTZWVuVGltZXNbbWFwcGVkRXZlbnQub0NvbW1lbnRzXSA9IG5vdztcblxuXHRcdFx0XHRjb25zdCBvQ29tbWVudHNFdmVudE9wdGlvbnMgPSB7IGJ1YmJsZXM6IHRydWUgfTtcblx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0b0NvbW1lbnRzRXZlbnRPcHRpb25zLmRldGFpbCA9IHsgZXJyb3IgfTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IG9Db21tZW50c0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KG1hcHBlZEV2ZW50Lm9Db21tZW50cywgb0NvbW1lbnRzRXZlbnRPcHRpb25zKTtcblx0XHRcdFx0dGhpcy5zdHJlYW1FbC5kaXNwYXRjaEV2ZW50KG9Db21tZW50c0V2ZW50KTtcblxuXHRcdFx0XHRpZiAobWFwcGVkRXZlbnQub1RyYWNraW5nICYmICF0aGlzLm9wdGlvbnMuZGlzYWJsZU9UcmFja2luZykge1xuXHRcdFx0XHRcdGNvbnN0IG9UcmFja2luZ0V2ZW50T3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRcdFx0Y2F0ZWdvcnk6ICdjb21tZW50Jyxcblx0XHRcdFx0XHRcdFx0YWN0aW9uOiBtYXBwZWRFdmVudC5vVHJhY2tpbmcsXG5cdFx0XHRcdFx0XHRcdGNvcmFsOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRpc1dpdGhoZWxkOiBzdGF0dXMgPT09ICdTWVNURU1fV0lUSEhFTEQnXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0b1RyYWNraW5nRXZlbnRPcHRpb25zLmRldGFpbC5lcnJvciA9IGVycm9yO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IG9UcmFja2luZ0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCBvVHJhY2tpbmdFdmVudE9wdGlvbnMpO1xuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChvVHJhY2tpbmdFdmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZW5kZXJTaWduZWRJbk1lc3NhZ2UgKCkge1xuXHRcdGNvbnN0IGVkaXRCdXR0b25JZCA9IGBvLWNvbW1lbnRzLWVkaXQtYnV0dG9uLS0ke3RoaXMuc3RyZWFtRWwuaWR9YDtcblx0XHRjb25zdCBzaWduZWRJbk1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRzaWduZWRJbk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnby1jb21tZW50c19fc2lnbmVkLWluLWNvbnRhaW5lcicpO1xuXHRcdHNpZ25lZEluTWVzc2FnZS5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cIm8tY29tbWVudHNfX3NpZ25lZC1pbi10ZXh0XCI+U2lnbmVkIGluIGFzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiby1jb21tZW50c19fc2lnbmVkLWluLWlubmVyLXRleHRcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gaWQ9XCIke2VkaXRCdXR0b25JZH1cIiBjbGFzcz1cIm8tY29tbWVudHNfX2VkaXQtZGlzcGxheS1uYW1lXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0RWRpdCA8c3BhbiBjbGFzcz1cIm8tY29tbWVudHNfX2VkaXQtZGlzcGxheS1uYW1lLWRlc2NyaXB0aXZlXCI+Y29tbWVudGluZyBkaXNwbGF5IG5hbWU8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9wPmA7XG5cdFx0c2lnbmVkSW5NZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJy5vLWNvbW1lbnRzX19zaWduZWQtaW4taW5uZXItdGV4dCcpLmlubmVyVGV4dCA9IHRoaXMuZGlzcGxheU5hbWU7XG5cblx0XHRjb25zdCBvbGRTaWduZWRJbk1lc3NhZ2UgPSB0aGlzLnN0cmVhbUVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLm8tY29tbWVudHNfX3NpZ25lZC1pbi1jb250YWluZXInKTtcblx0XHRpZiAob2xkU2lnbmVkSW5NZXNzYWdlKSB7XG5cdFx0XHRvbGRTaWduZWRJbk1lc3NhZ2UucmVtb3ZlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdHJlYW1FbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzaWduZWRJbk1lc3NhZ2UsIHRoaXMuc3RyZWFtRWwpO1xuXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWRpdEJ1dHRvbklkKS5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdFx0dGhpcy5kaXNwbGF5TmFtZVByb21wdCh7cHVyZ2VDYWNoZUFmdGVyQ29tcGxldGlvbjogdHJ1ZX0pO1xuXHRcdH07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtO1xuIiwiY2xhc3MgQ291bnQge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtjb3VudEVsXSAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKi9cblx0Y29uc3RydWN0b3IgKGNvdW50RWwsIG9wdHMgPSB7fSkge1xuXHRcdHRoaXMuY291bnRFbCA9IGNvdW50RWw7XG5cdFx0dGhpcy5hcnRpY2xlSWQgPSBvcHRzLmFydGljbGVJZDtcblx0XHR0aGlzLnVzZVN0YWdpbmdFbnZpcm9ubWVudCA9IEJvb2xlYW4ob3B0cy51c2VTdGFnaW5nRW52aXJvbm1lbnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbmRlciBhIGNvbW1lbnQgY291bnQgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY291bnQgaGFzIGJlZW4gdXBkYXRlZFxuXHQgKi9cblx0cmVuZGVyQ291bnQgKCkge1xuXHRcdGlmICh0aGlzLmNvdW50RWwgJiYgISh0aGlzLmNvdW50RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHRoaXMuY291bnRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb3VudEVsKTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuY291bnRFbCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IG11c3QgYmUgYSBIVE1MRWxlbWVudCcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBDb3VudC5mZXRjaENvdW50KHRoaXMuYXJ0aWNsZUlkLCB0aGlzLnVzZVN0YWdpbmdFbnZpcm9ubWVudClcblx0XHRcdC50aGVuKChjb3VudCkgPT4ge1xuXHRcdFx0XHR0aGlzLmNvdW50RWwudGV4dENvbnRlbnQgPSBjb3VudDtcblxuXHRcdFx0XHRjb25zdCBjb3VudExhYmVsID0gQ291bnQuZ2V0Q291bnRMYWJlbChjb3VudCk7XG5cdFx0XHRcdHRoaXMuY291bnRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBjb3VudExhYmVsKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYXJpYS1sYWJlbCBmb3IgdGhlIGNvdW50IGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCAtIFRoZSBjb21tZW50IGNvdW50XG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzdHJpbmcgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgYXJpYS1sYWJlbFxuXHQgKi9cblx0c3RhdGljIGdldENvdW50TGFiZWwgKGNvdW50KSB7XG5cdFx0aWYgKGNvdW50ID09PSAxKSB7XG5cdFx0XHRyZXR1cm4gJ1RoZXJlIGlzIDEgY29tbWVudCwgY2xpY2sgdG8gZ28gdG8gdGhlIGNvbW1lbnQgc2VjdGlvbi4nO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gYFRoZXJlIGFyZSAke2NvdW50fSBjb21tZW50cywgY2xpY2sgdG8gZ28gdG8gdGhlIGNvbW1lbnQgc2VjdGlvbi5gO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBmZXRjaENvdW50IChpZCwgdXNlU3RhZ2luZykge1xuXHRcdGNvbnN0IHVybCA9IGBodHRwczovL2NvbW1lbnRzLWFwaS5mdC5jb20vc3RvcnkvY291bnQvJHtpZH1gICsgKHVzZVN0YWdpbmcgPyAnP3N0YWdpbmc9MScgOiAnJyk7XG5cblx0XHRyZXR1cm4gZmV0Y2godXJsKVxuXHRcdFx0LnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG5cdFx0XHQudGhlbihqc29uID0+IGpzb24uY29tbWVudENvdW50KVxuXHRcdFx0LmNhdGNoKGVycm9yID0+IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aXRoIGZldGNoaW5nIGNvbW1lbnQgY291bnQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcblx0XHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvdW50O1xuIiwiaW1wb3J0IFN0cmVhbSBmcm9tICcuL3N0cmVhbS5qcyc7XG5pbXBvcnQgQ291bnQgZnJvbSAnLi9jb3VudC5qcyc7XG5cbmNsYXNzIENvbW1lbnRzIHtcblx0Y29uc3RydWN0b3IgKHJvb3RFbCwgb3B0cykge1xuXHRcdHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHt9LCBvcHRzIHx8IENvbW1lbnRzLmdldERhdGFBdHRyaWJ1dGVzKHJvb3RFbCkpO1xuXHRcdGNvbnN0IGlzQ291bnQgPSByb290RWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tbWVudHMtY291bnQnKSA9PT0gJ3RydWUnO1xuXHRcdGlmICghdGhpcy5vcHRpb25zLmFydGljbGVJZCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgY29uZmlndXJhdGlvbiBvcHRpb246IGBhcnRpY2xlSWRgLiBEb2N1bWVudGF0aW9uIG9uIGhvdyB0byBjb25zdHJ1Y3QgYW4gaW5zdGFuY2Ugb2YgQ29tbWVudHMgaXMgYXQgaHR0cHM6Ly9yZWdpc3RyeS5vcmlnYW1pLmZ0LmNvbS9jb21wb25lbnRzL28tY29tbWVudHNANy43LjMvcmVhZG1lI2NvbnN0cnVjdGluZy1hbi1vLWNvbW1lbnRzJyk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5vcHRpb25zLmFydGljbGVVcmwpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRjb25zb2xlLmVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb24gb3B0aW9uOiBgYXJ0aWNsZVVybGAuIERvY3VtZW50YXRpb24gb24gaG93IHRvIGNvbnN0cnVjdCBhbiBpbnN0YW5jZSBvZiBDb21tZW50cyBpcyBhdCBodHRwczovL3JlZ2lzdHJ5Lm9yaWdhbWkuZnQuY29tL2NvbXBvbmVudHMvby1jb21tZW50c0A3LjcuMy9yZWFkbWUjY29uc3RydWN0aW5nLWFuLW8tY29tbWVudHMnKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMudGl0bGUpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRjb25zb2xlLmVycm9yKCdNaXNzaW5nIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb24gb3B0aW9uOiBgdGl0bGVgLiBEb2N1bWVudGF0aW9uIG9uIGhvdyB0byBjb25zdHJ1Y3QgYW4gaW5zdGFuY2Ugb2YgQ29tbWVudHMgaXMgYXQgaHR0cHM6Ly9yZWdpc3RyeS5vcmlnYW1pLmZ0LmNvbS9jb21wb25lbnRzL28tY29tbWVudHNANy43LjMvcmVhZG1lI2NvbnN0cnVjdGluZy1hbi1vLWNvbW1lbnRzJyk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzQ291bnQpIHtcblx0XHRcdGNvbnN0IGNvdW50ID0gbmV3IENvdW50KHJvb3RFbCwgdGhpcy5vcHRpb25zKTtcblx0XHRcdGNvdW50LnJlbmRlckNvdW50KCk7XG5cblx0XHRcdHJldHVybiBjb3VudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3Qgc3RyZWFtID0gbmV3IFN0cmVhbShyb290RWwsIHRoaXMub3B0aW9ucyk7XG5cdFx0XHRzdHJlYW0uaW5pdCgpO1xuXG5cdFx0XHRyZXR1cm4gc3RyZWFtO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXRDb3VudCAoaWQpIHtcblx0XHRyZXR1cm4gQ291bnQuZmV0Y2hDb3VudChpZCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgZWxlbWVudC4gSWYgdGhlIGNvbXBvbmVudCBpcyBiZWluZyBzZXQgdXBcblx0ICogZGVjbGFyYXRpdmVseSwgdGhpcyBtZXRob2QgaXMgdXNlZCB0byBleHRyYWN0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByb290RWwgLSBUaGUgY29tcG9uZW50IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSAtIERhdGEgYXR0cmlidXRlcyBhcyBhbiBvYmplY3Rcblx0ICovXG5cdHN0YXRpYyBnZXREYXRhQXR0cmlidXRlcyAocm9vdEVsKSB7XG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhyb290RWwuZGF0YXNldCkucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcblxuXHRcdFx0Ly8gSWdub3JlIGRhdGEtby1jb21wb25lbnRcblx0XHRcdGlmIChrZXkgPT09ICdvQ29tcG9uZW50Jykge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnVpbGQgYSBjb25jaXNlIGtleSBhbmQgZ2V0IHRoZSBvcHRpb24gdmFsdWVcblx0XHRcdGNvbnN0IHNob3J0S2V5ID0ga2V5LnJlcGxhY2UoL15vQ29tbWVudHMoXFx3KShcXHcrKSQvLCAobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTIpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSByb290RWwuZGF0YXNldFtrZXldO1xuXG5cdFx0XHQvLyBUcnkgcGFyc2luZyB0aGUgdmFsdWUgYXMgSlNPTiwgb3RoZXJ3aXNlIGp1c3Qgc2V0IGl0IGFzIGEgc3RyaW5nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBjb21wb25lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIHRoZSBjb21wb25lbnQgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKiBAcmV0dXJucyB7KENvbW1lbnRzfEFycmF5PENvbW1lbnRzPil9IC0gQ29tbWVudHMgaW5zdGFuY2Uocylcblx0ICovXG5cdHN0YXRpYyBpbml0IChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXHRcdGlmIChyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiByb290RWwubWF0Y2hlcygnW2RhdGEtby1jb21wb25lbnQ9by1jb21tZW50c10nKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBDb21tZW50cyhyb290RWwsIG9wdHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gQXJyYXkuZnJvbShyb290RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLWNvbW1lbnRzXCJdJyksIHJvb3RFbCA9PiBuZXcgQ29tbWVudHMocm9vdEVsLCBvcHRzKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudHM7XG4iLCJpbXBvcnQgQ29tbWVudHMgZnJvbSAnLi9zcmMvanMvY29tbWVudHMuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbiAoKSB7XG5cdENvbW1lbnRzLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1lbnRzO1xuIiwiaW1wb3J0IENvbW1lbnRzIGZyb20gJy4uLy4uL21haW4uanMnO1xuXG5Db21tZW50cy5pbml0KCk7XG4iXX0=