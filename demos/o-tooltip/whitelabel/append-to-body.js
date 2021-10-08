function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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
  }); // src/js/tooltip.js


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
  }; // ../o-grid/main.js

  var missingDataMessage = "Could not find layout information. You may need to include o-grid css. See the README (https://registry.origami.ft.com/components/o-grid/readme) for more information.";

  function getGridProperties() {
    var properties = getGridFromDoc("after");

    if (Object.keys(properties).length === 0) {
      console.warn(missingDataMessage);
    }

    return properties;
  }

  function getGridBreakpoints() {
    var breakpoints = getGridFromDoc("before");

    if (Object.keys(breakpoints).length === 0) {
      console.warn(missingDataMessage);
    }

    return breakpoints;
  }

  function getGridFromDoc(position) {
    try {
      var gridProperties = window.getComputedStyle(document.documentElement, ":" + position).getPropertyValue("content");
      gridProperties = gridProperties.replace(/'/g, "").replace(/\\/g, "").replace(/^"/, "").replace(/"$/, "");
      return JSON.parse(gridProperties);
    } catch (e) {
      return {};
    }
  }

  function getCurrentLayout() {
    return getGridProperties().layout;
  }

  function getCurrentGutter() {
    return getGridProperties().gutter;
  }

  function enableLayoutChangeEvents() {
    var gridLayouts = getGridBreakpoints();

    if (gridLayouts.hasOwnProperty("layouts")) {
      var layouts = gridLayouts.layouts;
      var breakpoints = [].concat(_toConsumableArray(Object.entries(layouts)), [["default", "240px"]]).sort(function (a, b) {
        return parseFloat(a[1]) - parseFloat(b[1]);
      });

      var setupQuery = function setupQuery(query, size) {
        var handleMQChange = function handleMQChange(mql2) {
          if (mql2.matches) {
            window.dispatchEvent(new CustomEvent("o-grid.layoutChange", {
              detail: {
                layout: size
              }
            }));
          }
        };

        var mql = window.matchMedia(query);
        mql.addListener(handleMQChange);
        handleMQChange(mql);
      };

      var decr1 = function decr1(val) {
        return "".concat(Number(val.replace("px", "") - 1), "px");
      };

      for (var index = 0; index < breakpoints.length; index++) {
        var _breakpoints$index = _slicedToArray(breakpoints[index], 2),
            layoutName = _breakpoints$index[0],
            layoutWidth = _breakpoints$index[1];

        var isLast = index === breakpoints.length - 1;

        if (isLast) {
          setupQuery("(min-width: ".concat(layoutWidth, ")"), layoutName);
          continue;
        }

        var _breakpoints = _slicedToArray(breakpoints[index + 1], 2),
            nextLayoutWidth = _breakpoints[1];

        setupQuery("(min-width: ".concat(layoutWidth, ") and (max-width: ").concat(decr1(nextLayoutWidth), ")"), layoutName);
      }
    } else {
      console.error("Could not enable grid layout change events. Include o-grid css. See the README (https://registry.origami.ft.com/components/o-grid/readme) for more details.");
    }
  }

  var main_default2 = {
    getCurrentLayout: getCurrentLayout,
    getCurrentGutter: getCurrentGutter,
    getGridBreakpoints: getGridBreakpoints,
    enableLayoutChangeEvents: enableLayoutChangeEvents
  }; // src/js/target.js

  var Target = /*#__PURE__*/function () {
    "use strict";

    function Target(targetEl) {
      _classCallCheck(this, Target);

      this.targetEl = targetEl;
    }

    _createClass(Target, [{
      key: "offsetTop",
      get: function get() {
        return this.targetEl.offsetTop;
      }
    }, {
      key: "left",
      get: function get() {
        return this.targetEl.getBoundingClientRect().left;
      }
    }, {
      key: "right",
      get: function get() {
        return this.left + this.width;
      }
    }, {
      key: "top",
      get: function get() {
        return this.targetEl.getBoundingClientRect().top;
      }
    }, {
      key: "bottom",
      get: function get() {
        return this.top + this.height;
      }
    }, {
      key: "width",
      get: function get() {
        return this.targetEl.getBoundingClientRect().width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.targetEl.getBoundingClientRect().height;
      }
    }, {
      key: "centrePoint",
      get: function get() {
        return {
          x: this.left + this.width / 2,
          y: this.top + this.height / 2
        };
      }
    }]);

    return Target;
  }();

  var target_default = Target; // src/js/tooltip.js

  var Tooltip = /*#__PURE__*/function () {
    "use strict";

    function Tooltip(tooltipEl, opts) {
      _classCallCheck(this, Tooltip);

      if (!Tooltip._tooltips) {
        Tooltip._tooltips = new Map();
      }

      this.opts = opts || Tooltip.getOptions(tooltipEl);
      this.opts = Tooltip.checkOptions(this.opts);

      if (opts && opts.content) {
        this.tooltipEl = Tooltip.constructElement(tooltipEl, opts);
      } else {
        this.tooltipEl = tooltipEl;
      }

      Tooltip._tooltips.set(this.tooltipEl, this);

      this.targetNode = document.getElementById(this.opts.target);
      this.target = new Tooltip.Target(this.targetNode);
      this.tooltipPosition = this._getConfiguredTooltipPosition();
      this.tooltipAlignment = null;
      this.visible = false;
      this.delegates = {
        target: new import_ftdomdelegate.default(this.target.targetEl),
        doc: new import_ftdomdelegate.default(),
        tooltip: new import_ftdomdelegate.default()
      };

      if (this.opts.showOnClick) {
        this.delegates.target.on("click", this.show.bind(this));
      }

      if (this.opts.toggleOnClick) {
        this.delegates.target.on("click", this.toggle.bind(this));
      }

      if (this.opts.showOnHover) {
        this.delegates.target.on("mouseover", this.show.bind(this));
        this.delegates.target.on("mouseout", this.close.bind(this));
      }

      if (this.opts.showOnFocus) {
        this.delegates.target.on("focusin", this.show.bind(this));
        this.delegates.target.on("focusout", this.close.bind(this));
      }

      main_default.listenTo("resize");
      this.render();

      if (this.opts.showOnConstruction) {
        this.show();

        if (this.opts.closeAfter) {
          this.closeAfter(this.opts.closeAfter);
        }
      } else {
        if (this.opts.showAfter) {
          this.showAfter(this.opts.showAfter);
        }
      }
    }

    _createClass(Tooltip, [{
      key: "render",
      value: function render() {
        if (this.opts.appendToBody) {
          if (!document.getElementById(this.opts.target + Tooltip.idSuffix)) {
            document.body.appendChild(this.tooltipEl);
          }
        } else if (this.targetNode && this.targetNode.nextSibling !== this.tooltipEl) {
          if (this.targetNode.nextSibling) {
            this.targetNode.parentNode.insertBefore(this.tooltipEl, this.targetNode.nextSibling);
          } else {
            this.targetNode.parentNode.appendChild(this.tooltipEl);
          }
        }

        this.tooltipEl.setAttribute("role", "tooltip");
        this.tooltipEl.classList.add("o-tooltip");

        if (this.opts.zIndex) {
          this.tooltipEl.style.zIndex = this.opts.zIndex;
        }

        var button = document.createElement("button");
        button.className = "o-tooltip-close";
        button.setAttribute("aria-label", "Close tooltip");
        button.setAttribute("title", "Close tooltip");
        this.tooltipEl.appendChild(button);
      }
    }, {
      key: "show",
      value: function show() {
        this.delegates.doc.root(document.body);
        this.delegates.tooltip.root(this.tooltipEl);
        this.tooltipEl.dispatchEvent(new CustomEvent("oTooltip.show"));
        this.closeHandler = this.close.bind(this);
        this.delegates.tooltip.on("click", ".o-tooltip-close", this.closeHandler);
        this.delegates.tooltip.on("touchend", ".o-tooltip-close", this.closeHandler);
        this.closeOnKeyUpHandler = this.closeOnKeyUp.bind(this);
        this.delegates.doc.on("keyup", this.closeOnKeyUpHandler);
        this.resizeListenerHandler = this.resizeListener.bind(this);
        this.delegates.doc.on("oViewport.resize", "body", this.resizeListenerHandler);
        this.drawTooltip();
        this.visible = true;
        clearTimeout(this.showTimeout);
        this.tooltipEl.style.display = "block";
        this.tooltipEl.style.opacity = 1;
        this.tooltipEl.classList.add("visible");
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.visible) {
          this.close();
        } else {
          this.show();
        }
      }
    }, {
      key: "closeAfter",
      value: function closeAfter(seconds) {
        var _this3 = this;

        this.closeTimeout = setTimeout(function () {
          _this3.close();
        }, seconds * 1e3);
      }
    }, {
      key: "showAfter",
      value: function showAfter(seconds) {
        var _this4 = this;

        this.showTimeout = setTimeout(function () {
          _this4.show();
        }, seconds * 1e3);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.visible === true) {
          this.close();
        }

        if (this.tooltipEl && this.tooltipEl.parentElement && this.opts && this.opts.content) {
          this.tooltipEl.parentElement.removeChild(this.tooltipEl);
        }

        Tooltip._tooltips.delete(this.tooltipEl);

        if (Tooltip._tooltips.size === 0) {
          main_default.stopListeningTo("resize");
          delete Tooltip._tooltips;
        }
      }
    }, {
      key: "close",
      value: function close(event, target) {
        var _this5 = this;

        var fireCloseEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (fireCloseEvent) {
          this.tooltipEl.dispatchEvent(new CustomEvent("oTooltip.close"));
        }

        this.delegates.doc.destroy();
        this.delegates.tooltip.destroy();
        clearTimeout(this.closeTimeout);
        this.visible = false;
        this.tooltipEl.style.opacity = 0;
        this.tooltipEl.classList.remove("visible");
        this.tooltipEl.addEventListener("transitionend", function () {
          if (_this5.visible === false) {
            _this5.tooltipEl.style.display = "none";
          }
        }, {
          once: true
        });

        if (this.opts.showOnClick) {
          this.delegates.target.on("click", null, this.show.bind(this));
        }

        return false;
      }
    }, {
      key: "closeOnKeyUp",
      value: function closeOnKeyUp(ev) {
        if (ev.keyCode === 27) {
          this.close();
        }
      }
    }, {
      key: "resizeListener",
      value: function resizeListener() {
        var _this6 = this;

        if (this.visible) {
          window.requestAnimationFrame(function () {
            _this6.drawTooltip();
          });
        }
      }
    }, {
      key: "drawTooltip",
      value: function drawTooltip() {
        this.tooltipEl.style.display = "block";
        this.tooltipEl.style["max-width"] = "".concat(this.width(), "px");
        var count = 0;
        var tooltipRect = {};

        var position = this._getConfiguredTooltipPosition();

        var alignment = "middle";
        var isOutOfBounds = true;

        while (count < 5 && isOutOfBounds) {
          count++;

          switch (position) {
            case "above":
              var _this$_evaulateToolti = this._evaulateTooltip("above");

              tooltipRect = _this$_evaulateToolti.tooltipRect;
              alignment = _this$_evaulateToolti.alignment;
              isOutOfBounds = _this$_evaulateToolti.isOutOfBounds;
              break;

            case "right":
              var _this$_evaulateToolti2 = this._evaulateTooltip("right");

              tooltipRect = _this$_evaulateToolti2.tooltipRect;
              alignment = _this$_evaulateToolti2.alignment;
              isOutOfBounds = _this$_evaulateToolti2.isOutOfBounds;
              break;

            case "below":
              var _this$_evaulateToolti3 = this._evaulateTooltip("below");

              tooltipRect = _this$_evaulateToolti3.tooltipRect;
              alignment = _this$_evaulateToolti3.alignment;
              isOutOfBounds = _this$_evaulateToolti3.isOutOfBounds;
              break;

            case "left":
              var _this$_evaulateToolti4 = this._evaulateTooltip("left");

              tooltipRect = _this$_evaulateToolti4.tooltipRect;
              alignment = _this$_evaulateToolti4.alignment;
              isOutOfBounds = _this$_evaulateToolti4.isOutOfBounds;
              break;

            default:
              throw Tooltip.throwError("drawTooltip entered the default case, which is not expected.");
          }

          if (isOutOfBounds && count < 5) {
            position = Tooltip._rotateOrientation(position);
          }
        }

        this.tooltipRect = tooltipRect;
        this.tooltipAlignment = alignment;
        this.tooltipPosition = position;
        var targetLeftOffset = this.target.targetEl.offsetParent && this.target.targetEl.offsetParent.getBoundingClientRect().left;
        var targetTopOffset = this.target.targetEl.offsetParent && this.target.targetEl.offsetParent.getBoundingClientRect().top;
        var startWidth = this.tooltipEl.getBoundingClientRect().width;

        if (this.opts.appendToBody) {
          this.tooltipEl.id = this.opts.target + Tooltip.idSuffix;
          this.tooltipEl.style.top = this.tooltipRect.top + document.documentElement.scrollTop + "px";
          this.tooltipEl.style.left = this.tooltipRect.left + document.documentElement.scrollLeft + "px";
        } else {
          this.tooltipEl.style.top = this.tooltipRect.top - targetTopOffset + "px";
          this.tooltipEl.style.left = this.tooltipRect.left - targetLeftOffset + "px";
        }

        var endWidth = this.tooltipEl.getBoundingClientRect().width;

        if (startWidth !== endWidth) {
          return this.drawTooltip();
        }

        this._setArrow();

        if (count >= 5) {
          console.warn("There is not enough space in the client window to draw the tooltip.");
        }
      }
    }, {
      key: "width",
      value: function width() {
        return this.tooltipEl.offsetWidth;
      }
    }, {
      key: "height",
      value: function height() {
        return this.tooltipEl.offsetHeight;
      }
    }, {
      key: "_evaulateTooltip",
      value: function _evaulateTooltip(position) {
        var axis = position === "above" || position === "below" ? "y" : "x";
        var alignments = axis === "y" ? ["middle", "right", "left"] : ["middle", "top", "bottom"];
        var isOutOfBounds = true;
        var tooltipRect;
        var alignment;

        for (var index = 0; index < alignments.length && isOutOfBounds === true; index++) {
          alignment = alignments[index];
          tooltipRect = this._calculateTooltipRectangle(position, alignment);
          isOutOfBounds = this._tooltipIsOutOfBounds(tooltipRect);
        }

        if (isOutOfBounds) {
          alignment = "middle";
          tooltipRect = this._calculateTooltipRectangle(position, alignment);
        }

        return {
          tooltipRect: tooltipRect,
          alignment: alignment,
          isOutOfBounds: isOutOfBounds
        };
      }
    }, {
      key: "_calculateTooltipRectangle",
      value: function _calculateTooltipRectangle(position, alignment) {
        var rect = {};
        var axis = position === "above" || position === "below" ? "y" : "x";

        if (axis === "y") {
          var arrowPosition = this.width() / 10;

          if (alignment === "left") {
            rect.left = this.target.centrePoint.x - this.width() + arrowPosition;
          }

          if (alignment === "right") {
            rect.left = this.target.centrePoint.x - arrowPosition;
          }

          if (alignment === "middle") {
            rect.left = this.target.centrePoint.x - this.width() / 2;
          }

          if (position === "above") {
            rect.top = this.target.top - this.height() - Tooltip.arrowDepth;
          }

          if (position === "below") {
            rect.top = this.target.bottom + Tooltip.arrowDepth;
          }
        }

        if (axis === "x") {
          if (alignment === "top") {
            rect.top = this.target.top;
          }

          if (alignment === "bottom") {
            rect.top = this.target.bottom - this.height();
          }

          if (alignment === "middle") {
            rect.top = this.target.centrePoint.y - this.height() / 2;
          }

          if (position === "right") {
            rect.left = this.target.right + Tooltip.arrowDepth;
          }

          if (position === "left") {
            rect.left = this.target.left - this.width() - Tooltip.arrowDepth;
          }
        }

        rect.right = rect.left + this.width();
        rect.bottom = rect.top + this.height();
        return rect;
      }
    }, {
      key: "calculateTooltipRect",
      value: function calculateTooltipRect(position) {
        console.warn("`calculateTooltipRect` is deprecated.");
        return this._calculateTooltipRectangle(position, "middle");
      }
    }, {
      key: "_getConfiguredTooltipPosition",
      value: function _getConfiguredTooltipPosition() {
        var _this$opts = this.opts,
            position = _this$opts.position,
            positionS = _this$opts.positionS,
            positionM = _this$opts.positionM,
            positionL = _this$opts.positionL,
            positionXl = _this$opts.positionXl;

        var currentBreakpoint = Tooltip._getCurrentLayout();

        switch (currentBreakpoint) {
          case "S":
            return positionS || position;

          case "M":
            return positionM || positionS || position;

          case "L":
            return positionL || positionM || positionS || position;

          case "XL":
            return positionXl || positionL || positionM || positionS || position;

          default:
            return position;
        }
      }
    }, {
      key: "_setArrow",
      value: function _setArrow() {
        var _this$tooltipEl$class;

        var arrowClassRoot = "o-tooltip--arrow-";
        var alignmentClassRoot = "o-tooltip-arrow--align-";
        var classesToRemove = ["o-tooltip--arrow-left", "o-tooltip--arrow-right", "o-tooltip--arrow-above", "o-tooltip--arrow-below", "o-tooltip-arrow--align-top", "o-tooltip-arrow--align-bottom", "o-tooltip-arrow--align-left", "o-tooltip-arrow--align-right", "o-tooltip-arrow--align-middle"];

        (_this$tooltipEl$class = this.tooltipEl.classList).remove.apply(_this$tooltipEl$class, classesToRemove);

        this.tooltipEl.classList.add(arrowClassRoot + Tooltip.positionToArrowPositionMap[this.tooltipPosition]);
        this.tooltipEl.classList.add(alignmentClassRoot + Tooltip.alignmentToArrowAlignmentMap[this.tooltipAlignment]);
      }
    }, {
      key: "_tooltipIsOutOfBounds",
      value: function _tooltipIsOutOfBounds(tooltipRect) {
        var topOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.top, "y", this.opts);

        var bottomOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.bottom, "y", this.opts);

        var leftOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.left, "x", this.opts);

        var rightOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.right, "x", this.opts);

        return topOutofBounds || bottomOutofBounds || leftOutofBounds || rightOutofBounds;
      }
    }], [{
      key: "_getCurrentLayout",
      value: function _getCurrentLayout() {
        return main_default2.getCurrentLayout();
      }
    }, {
      key: "getOptions",
      value: function getOptions(tooltipEl) {
        var dataset = tooltipEl.dataset;
        return Object.keys(dataset).reduce(function (col, key) {
          if (key === "oComponent") {
            return col;
          }

          var shortKey = key.replace(/^oTooltip(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });

          try {
            col[shortKey] = JSON.parse(dataset[key].replace(/\'/g, '"'));
          } catch (e) {
            col[shortKey] = dataset[key];
          }

          return col;
        }, {});
      }
    }, {
      key: "checkOptions",
      value: function checkOptions(opts) {
        if (!opts.target) {
          Tooltip.throwError("tooltip.target is not set. An target for the tooltip to point at must be provided");
        }

        if (opts.position) {
          if (Tooltip.validTooltipPositions.indexOf(opts.position) === -1) {
            Tooltip.throwError("Invalid value for tooltip position. Valid values are:" + Tooltip.validTooltipPositions.toString() + " or nothing which will default to a value of `below`");
          }
        } else {
          opts.position = "below";
        }

        return opts;
      }
    }, {
      key: "constructElement",
      value: function constructElement(targetEl, opts) {
        var element = document.createElement("div");
        targetEl.setAttribute("id", opts.target);
        element.setAttribute("data-o-component", "o-tooltip");
        element.insertAdjacentHTML("afterbegin", "<div class='o-tooltip-content'>".concat(opts.content, "</div>"));
        return element;
      }
    }, {
      key: "_pointIsOutOfBounds",
      value: function _pointIsOutOfBounds(point, axis, opts) {
        if (point < 0) {
          return true;
        }

        if (opts.showOnConstruction) {
          if (axis === "y" && point > document.body.clientHeight) {
            return true;
          } else if (axis === "x" && point > document.body.clientWidth) {
            return true;
          }
        } else {
          if (axis === "y" && point > document.documentElement.clientHeight) {
            return true;
          } else if (axis === "x" && point > document.documentElement.clientWidth) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "_rotateOrientation",
      value: function _rotateOrientation(orientation) {
        var rotate = {
          "above": "right",
          "right": "below",
          "below": "left",
          "left": "above"
        };
        return rotate[orientation];
      }
    }, {
      key: "throwError",
      value: function throwError(message) {
        throw new Error('"o-tooltip error": ' + message);
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

        if (rootEl instanceof HTMLElement && /\bo-tooltip\b/.test(rootEl.getAttribute("data-o-component"))) {
          return new Tooltip(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-tooltip"]'), function (rootEl2) {
          return new Tooltip(rootEl2, opts);
        });
      }
    }]);

    return Tooltip;
  }();

  Tooltip.idSuffix = "-tooltip";
  Tooltip.arrowDepth = 10;
  Tooltip.positionToArrowPositionMap = {
    "above": "below",
    "below": "above",
    "left": "right",
    "right": "left"
  };
  Tooltip.alignmentToArrowAlignmentMap = {
    "top": "top",
    "bottom": "bottom",
    "right": "left",
    "left": "right",
    "middle": "middle"
  };
  Tooltip.validArrowAlignments = ["top", "bottom", "left", "right"];
  Tooltip.validTooltipPositions = ["above", "below", "left", "right"];
  Tooltip.Target = target_default;
  var tooltip_default = Tooltip; // main.js

  var constructAll = function constructAll() {
    tooltip_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default3 = tooltip_default; // demos/src/append-to-body.js

  document.addEventListener("DOMContentLoaded", function () {
    var tooltipElement = document.querySelector(".imperative-tooltip-target");
    new main_default3(tooltipElement, {
      target: "tooltip-target-imperative",
      content: "<p>Click to save to somewhere</p>",
      showOnConstruction: true,
      position: "above",
      appendToBody: true
    });
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvdG9vbHRpcC5qcyIsIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsIi4uL28tZ3JpZC9tYWluLmpzIiwic3JjL2pzL3RhcmdldC5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvYXBwZW5kLXRvLWJvZHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsZUFBQSxHQUFBLFVBQUEsQ0FBQTtBQUFBLGlEQUFBLDhDQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7QUFBQTs7QUFFQSxNQUFBLE1BQUEsQ0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFFBQUEsS0FBQSxFQUFPO0FBRG9DLE9BQTdDO0FBR0EsTUFBQSxPQUFBLENBQVEsT0FBUixHQUFrQixLQUFBLENBQWxCOztBQVlBLGVBQUEsU0FBQSxDQUFrQixJQUFsQixFQUF3QjtBQU90QixhQUFLLFdBQUwsR0FBbUIsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUFuQjs7QUFFQSxZQUFJLElBQUosRUFBVTtBQUNSLGVBQUssSUFBTCxDQUFVLElBQVY7QUFBVTs7QUFLWixhQUFLLE1BQUwsR0FBYyxTQUFBLENBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixJQUExQixDQUErQixJQUEvQixDQUFkO0FBRUEsYUFBSyxpQkFBTCxHQUF5QixFQUF6QjtBQUF5Qjs7QUFXM0IsTUFBQSxTQUFBLENBQVMsU0FBVCxDQUFtQixJQUFuQixHQUEwQixVQUFVLElBQVYsRUFBZ0I7QUFDeEMsWUFBSSxXQUFBLEdB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VSxPQUFWLEVBQW1CLE1BQW5CLEVBQTJCLE9BQTNCLENBQWhDO0FBRUEsRUFBQSxPQUFBLENBQVEsTUFBUixHQUFpQixjQUFqQjtBQUVBLE1BQU8sZUFBQSxHQUFRLE9BQWYsQzs7QU1ybkJBLE1BQU0sWUFBQSxHQUFlLFNBQWYsWUFBZSxHQUFXO0FBQy9CLElBQUEsZUFBQSxDQUFRLElBQVI7QUFDQSxJQUFBLFFBQUEsQ0FBUyxtQkFBVCxDQUE2QixvQkFBN0IsRUFBbUQsWUFBbkQ7QUFBbUQsR0FGcEQ7O0FBS0EsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELFlBQWhEO0FBRUEsTUFBTyxhQUFBLEdBQVEsZUFBZixDOztBQ1BBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELFFBQU0sY0FBQSxHQUFpQixRQUFBLENBQVMsYUFBVCxDQUF1Qiw0QkFBdkIsQ0FBdkI7QUFDQSxRQUFJLGFBQUosQ0FBWSxjQUFaLEVBQTRCO0FBQzNCLE1BQUEsTUFBQSxFQUFRLDJCQURtQjtBQUUzQixNQUFBLE9BQUEsRUFBUyxtQ0FGa0I7QUFHM0IsTUFBQSxrQkFBQSxFQUFvQixJQUhPO0FBSTNCLE1BQUEsUUFBQSxFQUFVLE9BSmlCO0FBSzNCLE1BQUEsWUFBQSxFQUFjO0FBTGEsS0FBNUI7QUFLZSxHQVBoQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG4vKipcbiAqIERPTSBldmVudCBkZWxlZ2F0b3JcbiAqXG4gKiBUaGUgZGVsZWdhdG9yIHdpbGwgbGlzdGVuXG4gKiBmb3IgZXZlbnRzIHRoYXQgYnViYmxlIHVwXG4gKiB0byB0aGUgcm9vdCBub2RlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBEZWxlZ2F0ZShyb290KSB7XG4gIC8qKlxuICAgKiBNYWludGFpbiBhIG1hcCBvZiBsaXN0ZW5lclxuICAgKiBsaXN0cywga2V5ZWQgYnkgZXZlbnQgbmFtZS5cbiAgICpcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICB0aGlzLmxpc3RlbmVyTWFwID0gW3t9LCB7fV07XG5cbiAgaWYgKHJvb3QpIHtcbiAgICB0aGlzLnJvb3Qocm9vdCk7XG4gIH1cbiAgLyoqIEB0eXBlIGZ1bmN0aW9uKCkgKi9cblxuXG4gIHRoaXMuaGFuZGxlID0gRGVsZWdhdGUucHJvdG90eXBlLmhhbmRsZS5iaW5kKHRoaXMpOyAvLyBDYWNoZSBvZiBldmVudCBsaXN0ZW5lcnMgcmVtb3ZlZCBkdXJpbmcgYW4gZXZlbnQgY3ljbGVcblxuICB0aGlzLl9yZW1vdmVkTGlzdGVuZXJzID0gW107XG59XG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG4gKiBvbiB0aGUgcHJvdmlkZWQgRE9NIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKHJvb3QpIHtcbiAgdmFyIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcDtcbiAgdmFyIGV2ZW50VHlwZTsgLy8gUmVtb3ZlIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcblxuICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMV0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcFswXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIElmIG5vIHJvb3Qgb3Igcm9vdCBpcyBub3RcbiAgLy8gYSBkb20gbm9kZSwgdGhlbiByZW1vdmUgaW50ZXJuYWxcbiAgLy8gcm9vdCByZWZlcmVuY2UgYW5kIGV4aXQgaGVyZVxuXG5cbiAgaWYgKCFyb290IHx8ICFyb290LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgZGVsZXRlIHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSByb290IG5vZGUgYXQgd2hpY2hcbiAgICogbGlzdGVuZXJzIGFyZSBhdHRhY2hlZC5cbiAgICpcbiAgICogQHR5cGUgTm9kZVxuICAgKi9cblxuXG4gIHRoaXMucm9vdEVsZW1lbnQgPSByb290OyAvLyBTZXQgdXAgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuXG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwWzFdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFswXSkge1xuICAgIGlmIChsaXN0ZW5lck1hcFswXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmNhcHR1cmVGb3JUeXBlID0gZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICByZXR1cm4gWydibHVyJywgJ2Vycm9yJywgJ2ZvY3VzJywgJ2xvYWQnLCAncmVzaXplJywgJ3Njcm9sbCddLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTE7XG59O1xuLyoqXG4gKiBBdHRhY2ggYSBoYW5kbGVyIHRvIG9uZVxuICogZXZlbnQgZm9yIGFsbCBlbGVtZW50c1xuICogdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3IsXG4gKiBub3cgb3IgaW4gdGhlIGZ1dHVyZVxuICpcbiAqIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIHJlY2VpdmVzXG4gKiB0aHJlZSBhcmd1bWVudHM6IHRoZSBET00gZXZlbnRcbiAqIG9iamVjdCwgdGhlIG5vZGUgdGhhdCBtYXRjaGVkXG4gKiB0aGUgc2VsZWN0b3Igd2hpbGUgdGhlIGV2ZW50XG4gKiB3YXMgYnViYmxpbmcgYW5kIGEgcmVmZXJlbmNlXG4gKiB0byBpdHNlbGYuIFdpdGhpbiB0aGUgaGFuZGxlcixcbiAqICd0aGlzJyBpcyBlcXVhbCB0byB0aGUgc2Vjb25kXG4gKiBhcmd1bWVudC5cbiAqXG4gKiBUaGUgbm9kZSB0aGF0IGFjdHVhbGx5IHJlY2VpdmVkXG4gKiB0aGUgZXZlbnQgY2FuIGJlIGFjY2Vzc2VkIHZpYVxuICogJ2V2ZW50LnRhcmdldCcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBMaXN0ZW4gZm9yIHRoZXNlIGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzZWxlY3RvciBPbmx5IGhhbmRsZSBldmVudHMgb24gZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBzZWxlY3RvciwgaWYgdW5kZWZpbmVkIG1hdGNoIHJvb3QgZWxlbWVudFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBoYW5kbGVyIEhhbmRsZXIgZnVuY3Rpb24gLSBldmVudCBkYXRhIHBhc3NlZCBoZXJlIHdpbGwgYmUgaW4gZXZlbnQuZGF0YVxuICogQHBhcmFtIHtib29sZWFufSBbdXNlQ2FwdHVyZV0gc2VlICd1c2VDYXB0dXJlJyBpbiA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXI+XG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgdmFyIHJvb3Q7XG4gIHZhciBsaXN0ZW5lck1hcDtcbiAgdmFyIG1hdGNoZXI7XG4gIHZhciBtYXRjaGVyUGFyYW07XG5cbiAgaWYgKCFldmVudFR5cGUpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHR5cGU6ICcgKyBldmVudFR5cGUpO1xuICB9IC8vIGhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG5cblxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlQ2FwdHVyZSA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfSAvLyBGYWxsYmFjayB0byBzZW5zaWJsZSBkZWZhdWx0c1xuICAvLyBpZiB1c2VDYXB0dXJlIG5vdCBzZXRcblxuXG4gIGlmICh1c2VDYXB0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICB1c2VDYXB0dXJlID0gdGhpcy5jYXB0dXJlRm9yVHlwZShldmVudFR5cGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFuZGxlciBtdXN0IGJlIGEgdHlwZSBvZiBGdW5jdGlvbicpO1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdOyAvLyBBZGQgbWFzdGVyIGhhbmRsZXIgZm9yIHR5cGUgaWYgbm90IGNyZWF0ZWQgeWV0XG5cbiAgaWYgKCFsaXN0ZW5lck1hcFtldmVudFR5cGVdKSB7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB1c2VDYXB0dXJlKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lck1hcFtldmVudFR5cGVdID0gW107XG4gIH1cblxuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gbnVsbDsgLy8gQ09NUExFWCAtIG1hdGNoZXNSb290IG5lZWRzIHRvIGhhdmUgYWNjZXNzIHRvXG4gICAgLy8gdGhpcy5yb290RWxlbWVudCwgc28gYmluZCB0aGUgZnVuY3Rpb24gdG8gdGhpcy5cblxuICAgIG1hdGNoZXIgPSBtYXRjaGVzUm9vdC5iaW5kKHRoaXMpOyAvLyBDb21waWxlIGEgbWF0Y2hlciBmb3IgdGhlIGdpdmVuIHNlbGVjdG9yXG4gIH0gZWxzZSBpZiAoL15bYS16XSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gbWF0Y2hlc1RhZztcbiAgfSBlbHNlIGlmICgvXiNbYS16MC05XFwtX10rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3Iuc2xpY2UoMSk7XG4gICAgbWF0Y2hlciA9IG1hdGNoZXNJZDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcztcbiAgfSAvLyBBZGQgdG8gdGhlIGxpc3Qgb2YgbGlzdGVuZXJzXG5cblxuICBsaXN0ZW5lck1hcFtldmVudFR5cGVdLnB1c2goe1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgIG1hdGNoZXI6IG1hdGNoZXIsXG4gICAgbWF0Y2hlclBhcmFtOiBtYXRjaGVyUGFyYW1cbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogUmVtb3ZlIGFuIGV2ZW50IGhhbmRsZXJcbiAqIGZvciBlbGVtZW50cyB0aGF0IG1hdGNoXG4gKiB0aGUgc2VsZWN0b3IsIGZvcmV2ZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW2V2ZW50VHlwZV0gUmVtb3ZlIGhhbmRsZXJzIGZvciBldmVudHMgbWF0Y2hpbmcgdGhpcyB0eXBlLCBjb25zaWRlcmluZyB0aGUgb3RoZXIgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl0gSWYgdGhpcyBwYXJhbWV0ZXIgaXMgb21pdHRlZCwgb25seSBoYW5kbGVycyB3aGljaCBtYXRjaCB0aGUgb3RoZXIgdHdvIHdpbGwgYmUgcmVtb3ZlZFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBbaGFuZGxlcl0gSWYgdGhpcyBwYXJhbWV0ZXIgaXMgb21pdHRlZCwgb25seSBoYW5kbGVycyB3aGljaCBtYXRjaCB0aGUgcHJldmlvdXMgdHdvIHdpbGwgYmUgcmVtb3ZlZFxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICB2YXIgaTtcbiAgdmFyIGxpc3RlbmVyO1xuICB2YXIgbGlzdGVuZXJNYXA7XG4gIHZhciBsaXN0ZW5lckxpc3Q7XG4gIHZhciBzaW5nbGVFdmVudFR5cGU7IC8vIEhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZUNhcHR1cmUgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IG51bGw7XG4gIH0gLy8gSWYgdXNlQ2FwdHVyZSBub3Qgc2V0LCByZW1vdmVcbiAgLy8gYWxsIGV2ZW50IGxpc3RlbmVyc1xuXG5cbiAgaWYgKHVzZUNhcHR1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHRydWUpO1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgZm9yIChzaW5nbGVFdmVudFR5cGUgaW4gbGlzdGVuZXJNYXApIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShzaW5nbGVFdmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMub2ZmKHNpbmdsZUV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcblxuICBpZiAoIWxpc3RlbmVyTGlzdCB8fCAhbGlzdGVuZXJMaXN0Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9IC8vIFJlbW92ZSBvbmx5IHBhcmFtZXRlciBtYXRjaGVzXG4gIC8vIGlmIHNwZWNpZmllZFxuXG5cbiAgZm9yIChpID0gbGlzdGVuZXJMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07XG5cbiAgICBpZiAoKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gbGlzdGVuZXIuc2VsZWN0b3IpICYmICghaGFuZGxlciB8fCBoYW5kbGVyID09PSBsaXN0ZW5lci5oYW5kbGVyKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlZExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgbGlzdGVuZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH0gLy8gQWxsIGxpc3RlbmVycyByZW1vdmVkXG5cblxuICBpZiAoIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICBkZWxldGUgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTsgLy8gUmVtb3ZlIHRoZSBtYWluIGhhbmRsZXJcblxuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBIYW5kbGUgYW4gYXJiaXRyYXJ5IGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBpO1xuICB2YXIgbDtcbiAgdmFyIHR5cGUgPSBldmVudC50eXBlO1xuICB2YXIgcm9vdDtcbiAgdmFyIHBoYXNlO1xuICB2YXIgbGlzdGVuZXI7XG4gIHZhciByZXR1cm5lZDtcbiAgdmFyIGxpc3RlbmVyTGlzdCA9IFtdO1xuICB2YXIgdGFyZ2V0O1xuICB2YXIgZXZlbnRJZ25vcmUgPSAnZnRMYWJzRGVsZWdhdGVJZ25vcmUnO1xuXG4gIGlmIChldmVudFtldmVudElnbm9yZV0gPT09IHRydWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0YXJnZXQgPSBldmVudC50YXJnZXQ7IC8vIEhhcmRjb2RlIHZhbHVlIG9mIE5vZGUuVEVYVF9OT0RFXG4gIC8vIGFzIG5vdCBkZWZpbmVkIGluIElFOFxuXG4gIGlmICh0YXJnZXQubm9kZVR5cGUgPT09IDMpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfSAvLyBIYW5kbGUgU1ZHIDx1c2U+IGVsZW1lbnRzIGluIElFXG5cblxuICBpZiAodGFyZ2V0LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50KSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50O1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIHBoYXNlID0gZXZlbnQuZXZlbnRQaGFzZSB8fCAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0ID8gMyA6IDIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXG5cbiAgc3dpdGNoIChwaGFzZSkge1xuICAgIGNhc2UgMTpcbiAgICAgIC8vRXZlbnQuQ0FQVFVSSU5HX1BIQVNFOlxuICAgICAgbGlzdGVuZXJMaXN0ID0gdGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAyOlxuICAgICAgLy9FdmVudC5BVF9UQVJHRVQ6XG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFswXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdKSB7XG4gICAgICAgIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTGlzdC5jb25jYXQodGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyTWFwWzFdICYmIHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV0pIHtcbiAgICAgICAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJMaXN0LmNvbmNhdCh0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDM6XG4gICAgICAvL0V2ZW50LkJVQkJMSU5HX1BIQVNFOlxuICAgICAgbGlzdGVuZXJMaXN0ID0gdGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIHRvRmlyZSA9IFtdOyAvLyBOZWVkIHRvIGNvbnRpbnVvdXNseSBjaGVja1xuICAvLyB0aGF0IHRoZSBzcGVjaWZpYyBsaXN0IGlzXG4gIC8vIHN0aWxsIHBvcHVsYXRlZCBpbiBjYXNlIG9uZVxuICAvLyBvZiB0aGUgY2FsbGJhY2tzIGFjdHVhbGx5XG4gIC8vIGNhdXNlcyB0aGUgbGlzdCB0byBiZSBkZXN0cm95ZWQuXG5cbiAgbCA9IGxpc3RlbmVyTGlzdC5sZW5ndGg7XG5cbiAgd2hpbGUgKHRhcmdldCAmJiBsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07IC8vIEJhaWwgZnJvbSB0aGlzIGxvb3AgaWZcbiAgICAgIC8vIHRoZSBsZW5ndGggY2hhbmdlZCBhbmRcbiAgICAgIC8vIG5vIG1vcmUgbGlzdGVuZXJzIGFyZVxuICAgICAgLy8gZGVmaW5lZCBiZXR3ZWVuIGkgYW5kIGwuXG5cbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQudGFnTmFtZSAmJiBbXCJidXR0b25cIiwgXCJpbnB1dFwiLCBcInNlbGVjdFwiLCBcInRleHRhcmVhXCJdLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPiAtMSAmJiB0YXJnZXQuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIikpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoaW5ncyB0aGF0IGhhdmUgcHJldmlvdXNseSBmaXJlZFxuICAgICAgICB0b0ZpcmUgPSBbXTtcbiAgICAgIH0gLy8gQ2hlY2sgZm9yIG1hdGNoIGFuZCBmaXJlXG4gICAgICAvLyB0aGUgZXZlbnQgaWYgdGhlcmUncyBvbmVcbiAgICAgIC8vXG4gICAgICAvLyBUT0RPOk1DRzoyMDEyMDExNzogTmVlZCBhIHdheVxuICAgICAgLy8gdG8gY2hlY2sgaWYgZXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uXG4gICAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgYm90aCBsb29wcy5cbiAgICAgIGVsc2UgaWYgKGxpc3RlbmVyLm1hdGNoZXIuY2FsbCh0YXJnZXQsIGxpc3RlbmVyLm1hdGNoZXJQYXJhbSwgdGFyZ2V0KSkge1xuICAgICAgICAgIHRvRmlyZS5wdXNoKFtldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcl0pO1xuICAgICAgICB9XG4gICAgfSAvLyBUT0RPOk1DRzoyMDEyMDExNzogTmVlZCBhIHdheSB0b1xuICAgIC8vIGNoZWNrIGlmIGV2ZW50I3N0b3BQcm9wYWdhdGlvblxuICAgIC8vIHdhcyBjYWxsZWQuIElmIHNvLCBicmVhayBsb29waW5nXG4gICAgLy8gdGhyb3VnaCB0aGUgRE9NLiBTdG9wIGlmIHRoZVxuICAgIC8vIGRlbGVnYXRpb24gcm9vdCBoYXMgYmVlbiByZWFjaGVkXG5cblxuICAgIGlmICh0YXJnZXQgPT09IHJvb3QpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoOyAvLyBGYWxsIGJhY2sgdG8gcGFyZW50Tm9kZSBzaW5jZSBTVkcgY2hpbGRyZW4gaGF2ZSBubyBwYXJlbnRFbGVtZW50IGluIElFXG5cbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudCB8fCB0YXJnZXQucGFyZW50Tm9kZTsgLy8gRG8gbm90IHRyYXZlcnNlIHVwIHRvIGRvY3VtZW50IHJvb3Qgd2hlbiB1c2luZyBwYXJlbnROb2RlLCB0aG91Z2hcblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRG9jdW1lbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciByZXQ7XG5cbiAgZm9yIChpID0gMDsgaSA8IHRvRmlyZS5sZW5ndGg7IGkrKykge1xuICAgIC8vIEhhcyBpdCBiZWVuIHJlbW92ZWQgZHVyaW5nIHdoaWxlIHRoZSBldmVudCBmdW5jdGlvbiB3YXMgZmlyZWRcbiAgICBpZiAodGhpcy5fcmVtb3ZlZExpc3RlbmVycy5pbmRleE9mKHRvRmlyZVtpXVsyXSkgPiAtMSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmV0dXJuZWQgPSB0aGlzLmZpcmUuYXBwbHkodGhpcywgdG9GaXJlW2ldKTsgLy8gU3RvcCBwcm9wYWdhdGlvbiB0byBzdWJzZXF1ZW50XG4gICAgLy8gY2FsbGJhY2tzIGlmIHRoZSBjYWxsYmFjayByZXR1cm5lZFxuICAgIC8vIGZhbHNlXG5cbiAgICBpZiAocmV0dXJuZWQgPT09IGZhbHNlKSB7XG4gICAgICB0b0ZpcmVbaV1bMF1bZXZlbnRJZ25vcmVdID0gdHJ1ZTtcbiAgICAgIHRvRmlyZVtpXVswXS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcbi8qKlxuICogRmlyZSBhIGxpc3RlbmVyIG9uIGEgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50LCB0YXJnZXQsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBsaXN0ZW5lci5oYW5kbGVyLmNhbGwodGFyZ2V0LCBldmVudCwgdGFyZ2V0KTtcbn07XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyBhIHRhZyBzZWxlY3Rvci5cbiAqXG4gKiBUYWdzIGFyZSBOT1QgY2FzZS1zZW5zaXRpdmUsXG4gKiBleGNlcHQgaW4gWE1MIChhbmQgWE1MLWJhc2VkXG4gKiBsYW5ndWFnZXMgc3VjaCBhcyBYSFRNTCkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIHRhZyBuYW1lIHRvIHRlc3QgYWdhaW5zdFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hlc1RhZyh0YWdOYW1lLCBlbGVtZW50KSB7XG4gIHJldHVybiB0YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xufVxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgdGhlIHJvb3QuXG4gKlxuICogQHBhcmFtIHs/U3RyaW5nfSBzZWxlY3RvciBJbiB0aGlzIGNhc2UgdGhpcyBpcyBhbHdheXMgcGFzc2VkIHRocm91Z2ggYXMgbnVsbCBhbmQgbm90IHVzZWRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNSb290KHNlbGVjdG9yLCBlbGVtZW50KSB7XG4gIGlmICh0aGlzLnJvb3RFbGVtZW50ID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4gKC8vIE1hdGNoIHRoZSBvdXRlciBkb2N1bWVudCAoZGlzcGF0Y2hlZCBmcm9tIGRvY3VtZW50KVxuICAgICAgZWxlbWVudCA9PT0gZG9jdW1lbnQgfHwgLy8gVGhlIDxodG1sPiBlbGVtZW50IChkaXNwYXRjaGVkIGZyb20gZG9jdW1lbnQuYm9keSBvciBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG4gICAgICBlbGVtZW50ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgLy8gT3IgdGhlIHdpbmRvdyBpdHNlbGYgKGRpc3BhdGNoZWQgZnJvbSB3aW5kb3cpXG4gICAgICBlbGVtZW50ID09PSB3aW5kb3dcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQgPT09IGVsZW1lbnQ7XG59XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIElEIG9mXG4gKiB0aGUgZWxlbWVudCBpbiAndGhpcydcbiAqIG1hdGNoZXMgdGhlIGdpdmVuIElELlxuICpcbiAqIElEcyBhcmUgY2FzZS1zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBJRCB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNJZChpZCwgZWxlbWVudCkge1xuICByZXR1cm4gaWQgPT09IGVsZW1lbnQuaWQ7XG59XG4vKipcbiAqIFNob3J0IGhhbmQgZm9yIG9mZigpXG4gKiBhbmQgcm9vdCgpLCBpZSBib3RoXG4gKiB3aXRoIG5vIHBhcmFtZXRlcnNcbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm9mZigpO1xuICB0aGlzLnJvb3QoKTtcbn07XG5cbnZhciBfZGVmYXVsdCA9IERlbGVnYXRlO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDsiLCJpbXBvcnQgRGVsZWdhdGUgZnJvbSAnZnRkb21kZWxlZ2F0ZSc7XG5pbXBvcnQgVmlld3BvcnQgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXZpZXdwb3J0JztcbmltcG9ydCBvR3JpZCBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tZ3JpZCc7XG5pbXBvcnQgVGFyZ2V0IGZyb20gJy4vdGFyZ2V0LmpzJztcblxuY2xhc3MgVG9vbHRpcCB7XG5cdHN0YXRpYyBfZ2V0Q3VycmVudExheW91dCgpIHtcblx0XHRyZXR1cm4gb0dyaWQuZ2V0Q3VycmVudExheW91dCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlcHJlc2VudHMgYSB0b29sdGlwLlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcEVsIC0gVGhlIHRvb2x0aXAgZWxlbWVudCBpbiB0aGUgRE9NIChSZXF1aXJlZClcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIHRvb2x0aXAgKE9wdGlvbmFsKVxuXHQqL1xuXHRjb25zdHJ1Y3Rvcih0b29sdGlwRWwsIG9wdHMpIHtcblx0XHRpZiAoIVRvb2x0aXAuX3Rvb2x0aXBzKSB7XG5cdFx0XHRUb29sdGlwLl90b29sdGlwcyA9IG5ldyBNYXAoKTtcblx0XHR9XG5cblx0XHR0aGlzLm9wdHMgPSBvcHRzIHx8IFRvb2x0aXAuZ2V0T3B0aW9ucyh0b29sdGlwRWwpO1xuXHRcdHRoaXMub3B0cyA9IFRvb2x0aXAuY2hlY2tPcHRpb25zKHRoaXMub3B0cyk7XG5cblx0XHRpZiAob3B0cyAmJiBvcHRzLmNvbnRlbnQpIHtcblx0XHRcdHRoaXMudG9vbHRpcEVsID0gVG9vbHRpcC5jb25zdHJ1Y3RFbGVtZW50KHRvb2x0aXBFbCwgb3B0cyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudG9vbHRpcEVsID0gdG9vbHRpcEVsO1xuXHRcdH1cblxuXHRcdFRvb2x0aXAuX3Rvb2x0aXBzLnNldCh0aGlzLnRvb2x0aXBFbCwgdGhpcyk7XG5cblx0XHR0aGlzLnRhcmdldE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm9wdHMudGFyZ2V0KTtcblx0XHR0aGlzLnRhcmdldCA9IG5ldyBUb29sdGlwLlRhcmdldCh0aGlzLnRhcmdldE5vZGUpO1xuXHRcdHRoaXMudG9vbHRpcFBvc2l0aW9uID0gdGhpcy5fZ2V0Q29uZmlndXJlZFRvb2x0aXBQb3NpdGlvbigpO1xuXHRcdHRoaXMudG9vbHRpcEFsaWdubWVudCA9IG51bGw7XG5cdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cblx0XHR0aGlzLmRlbGVnYXRlcyA9IHtcblx0XHRcdHRhcmdldDogbmV3IERlbGVnYXRlKHRoaXMudGFyZ2V0LnRhcmdldEVsKSxcblx0XHRcdGRvYzogbmV3IERlbGVnYXRlKCksXG5cdFx0XHR0b29sdGlwOiBuZXcgRGVsZWdhdGUoKSxcblx0XHR9O1xuXG5cdFx0aWYgKHRoaXMub3B0cy5zaG93T25DbGljaykge1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMudGFyZ2V0Lm9uKCdjbGljaycsIHRoaXMuc2hvdy5iaW5kKHRoaXMpKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLnRvZ2dsZU9uQ2xpY2spIHtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLnRhcmdldC5vbignY2xpY2snLCB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLnNob3dPbkhvdmVyKSB7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy50YXJnZXQub24oJ21vdXNlb3ZlcicsIHRoaXMuc2hvdy5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLnRhcmdldC5vbignbW91c2VvdXQnLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMub3B0cy5zaG93T25Gb2N1cykge1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMudGFyZ2V0Lm9uKCdmb2N1c2luJywgdGhpcy5zaG93LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMudGFyZ2V0Lm9uKCdmb2N1c291dCcsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0Vmlld3BvcnQubGlzdGVuVG8oJ3Jlc2l6ZScpO1xuXG5cdFx0dGhpcy5yZW5kZXIoKTtcblxuXHRcdC8vIERvIHlvdSByZW5kZXIgYXMgc29vbiBhcyBwb3NzaWJsZT9cblx0XHRpZiAodGhpcy5vcHRzLnNob3dPbkNvbnN0cnVjdGlvbikge1xuXHRcdFx0dGhpcy5zaG93KCk7XG5cblx0XHRcdGlmICh0aGlzLm9wdHMuY2xvc2VBZnRlcikge1xuXHRcdFx0XHR0aGlzLmNsb3NlQWZ0ZXIodGhpcy5vcHRzLmNsb3NlQWZ0ZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICh0aGlzLm9wdHMuc2hvd0FmdGVyKSB7XG5cdFx0XHRcdHRoaXMuc2hvd0FmdGVyKHRoaXMub3B0cy5zaG93QWZ0ZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIHRvb2x0aXBFbC4gSWYgdGhlIHRvb2x0aXAgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb21cblx0ICogdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9vbHRpcEVsIC0gVGhlIHRvb2x0aXAgZWxlbWVudCBpbiB0aGUgRE9NIChSZXF1aXJlZClcblx0Ki9cblx0c3RhdGljIGdldE9wdGlvbnModG9vbHRpcEVsKSB7XG5cdFx0Y29uc3QgZGF0YXNldCA9IHRvb2x0aXBFbC5kYXRhc2V0O1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyhkYXRhc2V0KS5yZWR1Y2UoKGNvbCwga2V5KSA9PiB7IC8vIFBoYW50b20gZG9lc24ndCBsaWtlIE9iamVjdC5lbnRyaWVzIDpzb2I6XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIGNvbDsgLy8gQmFpbCBvbiBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKC9eb1Rvb2x0aXAoXFx3KShcXHcrKSQvLCAobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTIpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb2xbc2hvcnRLZXldID0gSlNPTi5wYXJzZShkYXRhc2V0W2tleV0ucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29sW3Nob3J0S2V5XSA9IGRhdGFzZXRba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNvbDtcblx0XHR9LCB7fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgdGhlIG9wdGlvbnMgcGFzc2VkIGluIGFyZSB2YWxpZCwgYW5kIHRoYXQgdGhlIHJlcXVpcmVkIG9wdGlvblxuXHQgKiAodGFyZ2V0KSBpcyBwcmVzZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gQW4gT2JqZWN0IHdpdGggY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgdG9vbHRpcFxuXHQgKiBAdGhyb3dzIG8tdG9vbHRpcCBlcnJvcjogb3B0cy50YXJnZXQgaXMgbm90IHNldFxuXHQgKiBAdGhyb3dzIG8tdG9vbHRpcCBlcnJvcjogb3B0cy50b29sdGlwUG9zaXRpb24gaXMgbm90IG9uZSBvZiBcImFib3ZlXCIsIFwiYmVsb3dcIlxuXHQgKiBcImxlZnRcIiBvciBcInJpZ2h0XCJcblx0Ki9cblx0c3RhdGljIGNoZWNrT3B0aW9ucyhvcHRzKSB7XG5cblx0XHRpZiAoIW9wdHMudGFyZ2V0KSB7XG5cdFx0XHRUb29sdGlwLnRocm93RXJyb3IoXCJ0b29sdGlwLnRhcmdldCBpcyBub3Qgc2V0LiBBbiB0YXJnZXQgZm9yIHRoZSB0b29sdGlwIHRvIHBvaW50IGF0IG11c3QgYmUgcHJvdmlkZWRcIik7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgdGhhdCB0aGUgdmFsdWUgb2YgdG9vbHRpcCBwb3NpdGlvbiBpcyB2YWxpZC4gRGVmYXVsdCB0byBiZWxvdy5cblx0XHRpZiAob3B0cy5wb3NpdGlvbikge1xuXHRcdFx0aWYgKFRvb2x0aXAudmFsaWRUb29sdGlwUG9zaXRpb25zLmluZGV4T2Yob3B0cy5wb3NpdGlvbikgPT09IC0xKSB7XG5cdFx0XHRcdFRvb2x0aXAudGhyb3dFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHRvb2x0aXAgcG9zaXRpb24uIFZhbGlkIHZhbHVlcyBhcmU6XCIgKyBUb29sdGlwLnZhbGlkVG9vbHRpcFBvc2l0aW9ucy50b1N0cmluZygpICsgXCIgb3Igbm90aGluZyB3aGljaCB3aWxsIGRlZmF1bHQgdG8gYSB2YWx1ZSBvZiBgYmVsb3dgXCIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRvcHRzLnBvc2l0aW9uID0gXCJiZWxvd1wiO1xuXHRcdH1cblxuXHRcdHJldHVybiBvcHRzO1xuXHR9XG5cblx0c3RhdGljIGNvbnN0cnVjdEVsZW1lbnQodGFyZ2V0RWwsIG9wdHMpIHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdpZCcsIG9wdHMudGFyZ2V0KTtcblx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1vLWNvbXBvbmVudCcsICdvLXRvb2x0aXAnKTtcblx0XHRlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPSdvLXRvb2x0aXAtY29udGVudCc+JHtvcHRzLmNvbnRlbnR9PC9kaXY+YCk7XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVyIHRoZSB0b29sdGlwLiBBZGRzIG1hcmt1cCBhbmQgYXR0cmlidXRlcyB0byB0aGlzLnRvb2x0aXBFbCBpbiB0aGUgRE9NXG5cdCovXG5cdHJlbmRlcigpIHtcblx0XHQvLyBNYWtlIHN1cmUgdGhlIHRvb2x0aXAgaXMgYXR0YWNoZWQgdG8gdGhlIERPTVxuXHRcdGlmICh0aGlzLm9wdHMuYXBwZW5kVG9Cb2R5KSB7XG5cdFx0XHQvLyBlaXRoZXIgYXBwZW5kZWQgZGlyZWN0bHkgaW50byB0aGUgYm9keVxuXHRcdFx0aWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLm9wdHMudGFyZ2V0ICsgVG9vbHRpcC5pZFN1ZmZpeCkpIHtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBFbCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLnRhcmdldE5vZGUgJiYgdGhpcy50YXJnZXROb2RlLm5leHRTaWJsaW5nICE9PSB0aGlzLnRvb2x0aXBFbCkge1xuXHRcdFx0Ly8gb3IgaXMgdGhlIG5leHQgc2libGluZyBvZiB0aGUgdGFyZ2V0XG5cdFx0XHRpZiAodGhpcy50YXJnZXROb2RlLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdHRoaXMudGFyZ2V0Tm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLnRvb2x0aXBFbCwgdGhpcy50YXJnZXROb2RlLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMudGFyZ2V0Tm9kZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcEVsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnRvb2x0aXBFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndG9vbHRpcCcpO1xuXHRcdHRoaXMudG9vbHRpcEVsLmNsYXNzTGlzdC5hZGQoJ28tdG9vbHRpcCcpO1xuXG5cdFx0aWYgKHRoaXMub3B0cy56SW5kZXgpIHtcblx0XHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0cy56SW5kZXg7XG5cdFx0fVxuXG5cdFx0Ly8gQnVpbGQgYW5kIGFwcGVuZCB0aGUgY2xvc2UgYnV0dG9uXG5cdFx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0YnV0dG9uLmNsYXNzTmFtZSA9ICdvLXRvb2x0aXAtY2xvc2UnO1xuXHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQ2xvc2UgdG9vbHRpcCcpO1xuXHRcdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0Nsb3NlIHRvb2x0aXAnKTtcblx0XHR0aGlzLnRvb2x0aXBFbC5hcHBlbmRDaGlsZChidXR0b24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNob3cgdGhlIHRvb2x0aXAuIEFkZHMgZXZlbnQgaGFuZGxlcnMgZm9yIGNsaWNrcywgdG91Y2hlcywga2V5cHJlc3NlcyBhbmRcblx0ICogdmlld3BvcnQgcmVzaXplcy4gVXNlcyBGVERvbURlbGVnYXRlIHRvIGltcGxlbWVudCB0aGUgZXZlbnQgZGVsZWdhdGVcblx0ICogcGF0dGVybi4gQ2FsbHMgRHJhd1Rvb2x0aXAuXG5cdCovXG5cdHNob3coKSB7XG5cdFx0Ly8gRGVsZWdhdGUgcGF0dGVyblxuXHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5yb290KGRvY3VtZW50LmJvZHkpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLnRvb2x0aXAucm9vdCh0aGlzLnRvb2x0aXBFbCk7XG5cblx0XHR0aGlzLnRvb2x0aXBFbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1Rvb2x0aXAuc2hvdycpKTtcblxuXHRcdC8vIFNldCB1cCBhbGwgdGhlIHdheXMgdG8gY2xvc2UgdGhlIHRvb2x0aXBcblx0XHR0aGlzLmNsb3NlSGFuZGxlciA9IHRoaXMuY2xvc2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGVnYXRlcy50b29sdGlwLm9uKCdjbGljaycsICcuby10b29sdGlwLWNsb3NlJywgdGhpcy5jbG9zZUhhbmRsZXIpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLnRvb2x0aXAub24oJ3RvdWNoZW5kJywgJy5vLXRvb2x0aXAtY2xvc2UnLCB0aGlzLmNsb3NlSGFuZGxlcik7XG5cblx0XHR0aGlzLmNsb3NlT25LZXlVcEhhbmRsZXIgPSB0aGlzLmNsb3NlT25LZXlVcC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5vbigna2V5dXAnLCB0aGlzLmNsb3NlT25LZXlVcEhhbmRsZXIpO1xuXG5cdFx0Ly8gUmVzaXplIG1lYW5zIHdlIG1pZ2h0IG5lZWQgdG8gbW92ZSBvdXIgdG9vbHRpcCBzbyBpdCBpcyBzdGlsbCBvbiBzY3JlZW5cblx0XHR0aGlzLnJlc2l6ZUxpc3RlbmVySGFuZGxlciA9IHRoaXMucmVzaXplTGlzdGVuZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mub24oJ29WaWV3cG9ydC5yZXNpemUnLCAnYm9keScsIHRoaXMucmVzaXplTGlzdGVuZXJIYW5kbGVyKTtcblxuXHRcdHRoaXMuZHJhd1Rvb2x0aXAoKTtcblx0XHR0aGlzLnZpc2libGUgPSB0cnVlO1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLnNob3dUaW1lb3V0KTtcblxuXHRcdC8vIFJ1biBzaG93IHRvb2x0aXAgdHJhbnNpdGlvblxuXHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHRcdHRoaXMudG9vbHRpcEVsLmNsYXNzTGlzdC5hZGQoJ3Zpc2libGUnKTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFRvZ2dsZSB0aGUgdG9vbHRpcCBvcGVuIGFuZCBjbG9zZVxuXHQgKi9cblx0dG9nZ2xlKCkge1xuXHRcdGlmICh0aGlzLnZpc2libGUpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnNob3coKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBDbG9zZSB0aGUgdG9vbHRpcCBhZnRlciBzZXQgdGltZVxuXHQgKiBAcGFyYW0gc2Vjb25kc1xuXHQgKi9cblx0Y2xvc2VBZnRlcihzZWNvbmRzKSB7XG5cdFx0dGhpcy5jbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9LCBzZWNvbmRzICogMTAwMCk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSB0b29sdGlwIGFmdGVyIHNldCB0aW1lXG5cdCAqIEBwYXJhbSBzZWNvbmRzXG5cdCAqL1xuXHRzaG93QWZ0ZXIoc2Vjb25kcykge1xuXHRcdHRoaXMuc2hvd1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuc2hvdygpO1xuXHRcdH0sIHNlY29uZHMgKiAxMDAwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZXN0cm95IHRoZSB0b29sdGlwLlxuXHQqL1xuXHRkZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnZpc2libGUgPT09IHRydWUpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMudG9vbHRpcEVsICYmIHRoaXMudG9vbHRpcEVsLnBhcmVudEVsZW1lbnQgJiYgdGhpcy5vcHRzICYmIHRoaXMub3B0cy5jb250ZW50KSB7XG5cdFx0XHR0aGlzLnRvb2x0aXBFbC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMudG9vbHRpcEVsKTtcblx0XHR9XG5cblx0XHRUb29sdGlwLl90b29sdGlwcy5kZWxldGUodGhpcy50b29sdGlwRWwpO1xuXHRcdGlmIChUb29sdGlwLl90b29sdGlwcy5zaXplID09PSAwKSB7XG5cdFx0XHRWaWV3cG9ydC5zdG9wTGlzdGVuaW5nVG8oJ3Jlc2l6ZScpO1xuXHRcdFx0ZGVsZXRlIFRvb2x0aXAuX3Rvb2x0aXBzO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSB0aGUgdG9vbHRpcC4gKFZpc3VhbGx5IGhpZGUgaXQgYW5kIHJlbW92ZSBldmVudCBsaXN0ZW5lcnMpXG5cdCovXG5cdGNsb3NlKGV2ZW50LCB0YXJnZXQsIGZpcmVDbG9zZUV2ZW50ID0gdHJ1ZSkge1xuXG5cdFx0aWYgKGZpcmVDbG9zZUV2ZW50KSB7XG5cdFx0XHR0aGlzLnRvb2x0aXBFbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1Rvb2x0aXAuY2xvc2UnKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLmRlc3Ryb3koKTtcblx0XHR0aGlzLmRlbGVnYXRlcy50b29sdGlwLmRlc3Ryb3koKTtcblxuXHRcdGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZW91dCk7XG5cdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cblx0XHQvLyBSdW4gY2xvc2UgdG9vbHRpcCB0cmFuc2l0aW9uXG5cdFx0dGhpcy50b29sdGlwRWwuc3R5bGUub3BhY2l0eSA9IDA7XG5cdFx0dGhpcy50b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZSgndmlzaWJsZScpO1xuXG5cdFx0Ly8gU2V0IGBkaXNwbGF5OiBub25lYCBhZnRlciBhbmltYXRpb24gJiByZW1vdmUgbGlzdGVuZXJcblx0XHR0aGlzLnRvb2x0aXBFbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgKCkgPT4ge1xuXHRcdFx0Ly8gQ2hlY2sgdGhpcyBpcyBzdGlsbCBmYWxzZSBhbmQgdGhhdCB0aGUgdG9vbHRpcCBoYXNuJ3QgcmVhcHBlYXJlZFxuXHRcdFx0Ly8gaW4gdGhlIHRyYW5zaXRpb24gcGVyaW9kXG5cdFx0XHRpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLnRvb2x0aXBFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0fVxuXHRcdH0sIHsgb25jZTogdHJ1ZSB9KTtcblxuXHRcdGlmICh0aGlzLm9wdHMuc2hvd09uQ2xpY2spIHtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLnRhcmdldC5vbignY2xpY2snLCBudWxsLCB0aGlzLnNob3cuYmluZCh0aGlzKSk7IC8vIFJlLWF0dGFjaCBjbGljayBoYW5kbGVyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2IC0gY2FsbHMgY2xvc2Ugb24gdGhlIHRvb2x0aXAgaWYgdGhlIGtleSBpcyBFc2Ncblx0Ki9cblx0Y2xvc2VPbktleVVwKGV2KSB7XG5cblx0XHQvKiBrZXlDb2RlIDI3IGlzIHRoZSBlc2NhcGUga2V5ICovXG5cdFx0aWYgKGV2LmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblxuXHQvKipcblx0ICogUmVzcG9uZCB0byByZXNpemUgZXZlbnRzLiBSZWRyYXcgdGhlIHRvb2x0aXAgaW4gY2FzZSB0aGUgdGFyZ2V0IGhhcyBtb3ZlZC5cblx0ICogQHRvZG86IFRoZXJlIGFyZSBtYW55IG9wdGltaXNhdGlvbnMgdG8gbWFrZSBoZXJlLSB3ZSdyZSByZWRyYXdpbmcgZXZlbiBpZlxuXHQgKiB0aGUgdGFyZ2V0IGhhc24ndCBtb3ZlZC5cblx0Ki9cblx0cmVzaXplTGlzdGVuZXIoKSB7XG5cdFx0aWYgKHRoaXMudmlzaWJsZSkge1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMuZHJhd1Rvb2x0aXAoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxjdWxhdGVzIHRoZSBiZXN0IHBsYWNlIHRvIHBvc2l0aW9uIHRoZSB0b29sdGlwIGJhc2VkIG9uIHNwYWNlIGFyb3VuZCB0aGVcblx0ICogdGFyZ2V0IGFuZCBhIHByZWZlcmVuY2Ugc2V0IGJ5IHRoZSB1c2VyLlxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gaWYgVG9vbHRpcCBjYW4ndCBiZSBkcmF3biBpbiB0aGUgY2xpZW50IHdpbmRvd1xuXHQqL1xuXHRkcmF3VG9vbHRpcCgpIHtcblx0XHQvLyByZW5kZXIgdGhlIHRvb2x0aXAgc28gd2Uga25vdyBob3cgYmlnIGl0IGlzXG5cdFx0dGhpcy50b29sdGlwRWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0Ly8gZG9uJ3QgaW5jcmVhc2UgaW4gc2l6ZSwgaS5lIGR1ZSB0byBpbmxpbmUgY29udGVudCwgYWZ0ZXIgcG9zaXRpb25pbmdcblx0XHR0aGlzLnRvb2x0aXBFbC5zdHlsZVsnbWF4LXdpZHRoJ10gPSBgJHt0aGlzLndpZHRoKCl9cHhgO1xuXHRcdC8vIGNoZWNrIGJvdW5kcyBmb3IgZXZlcnkgcG9zaXRpb24gKDQgY291bnRzKVxuXHRcdC8vIGlmIGNob3NlbiBwb3NpdGlvbiBjYW5ub3QgZml0IGZsaXAgdGhlIHRvb2xpcC5cblx0XHRsZXQgY291bnQgPSAwO1xuXHRcdGxldCB0b29sdGlwUmVjdCA9IHt9O1xuXHRcdGxldCBwb3NpdGlvbiA9IHRoaXMuX2dldENvbmZpZ3VyZWRUb29sdGlwUG9zaXRpb24oKTtcblx0XHRsZXQgYWxpZ25tZW50ID0gJ21pZGRsZSc7XG5cdFx0Ly8gQXNzdW1lIG91dCBvZiBib3VuZHMgdW50aWwgdG9vbHRpcFJlY3QgaXMgY2FsY3VsYXRlZC5cblx0XHRsZXQgaXNPdXRPZkJvdW5kcyA9IHRydWU7XG5cdFx0d2hpbGUgKGNvdW50IDwgNSAmJiBpc091dE9mQm91bmRzKSB7XG5cdFx0XHRjb3VudCsrO1xuXHRcdFx0c3dpdGNoIChwb3NpdGlvbikge1xuXHRcdFx0XHRjYXNlICdhYm92ZSc6XG5cdFx0XHRcdFx0KHt0b29sdGlwUmVjdCwgYWxpZ25tZW50LCBpc091dE9mQm91bmRzfSA9IHRoaXMuX2V2YXVsYXRlVG9vbHRpcCgnYWJvdmUnKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdFx0XHQoe3Rvb2x0aXBSZWN0LCBhbGlnbm1lbnQsIGlzT3V0T2ZCb3VuZHN9ID0gdGhpcy5fZXZhdWxhdGVUb29sdGlwKCdyaWdodCcpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnYmVsb3cnOlxuXHRcdFx0XHRcdCh7dG9vbHRpcFJlY3QsIGFsaWdubWVudCwgaXNPdXRPZkJvdW5kc30gPSB0aGlzLl9ldmF1bGF0ZVRvb2x0aXAoJ2JlbG93JykpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdFx0XHQoe3Rvb2x0aXBSZWN0LCBhbGlnbm1lbnQsIGlzT3V0T2ZCb3VuZHN9ID0gdGhpcy5fZXZhdWxhdGVUb29sdGlwKCdsZWZ0JykpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRocm93IFRvb2x0aXAudGhyb3dFcnJvcignZHJhd1Rvb2x0aXAgZW50ZXJlZCB0aGUgZGVmYXVsdCBjYXNlLCB3aGljaCBpcyBub3QgZXhwZWN0ZWQuJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNPdXRPZkJvdW5kcyAmJiBjb3VudCA8IDUpIHtcblx0XHRcdFx0cG9zaXRpb24gPSBUb29sdGlwLl9yb3RhdGVPcmllbnRhdGlvbihwb3NpdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRHJhdyB0b29sdGlwIHdpdGggbGF0ZXN0IGFsaWdubWVudCBhbmQgcG9zaXRpb24uXG5cdFx0dGhpcy50b29sdGlwUmVjdCA9IHRvb2x0aXBSZWN0O1xuXHRcdHRoaXMudG9vbHRpcEFsaWdubWVudCA9IGFsaWdubWVudDtcblx0XHR0aGlzLnRvb2x0aXBQb3NpdGlvbiA9IHBvc2l0aW9uO1xuXHRcdGNvbnN0IHRhcmdldExlZnRPZmZzZXQgPSB0aGlzLnRhcmdldC50YXJnZXRFbC5vZmZzZXRQYXJlbnQgJiYgdGhpcy50YXJnZXQudGFyZ2V0RWwub2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cdFx0Y29uc3QgdGFyZ2V0VG9wT2Zmc2V0ID0gdGhpcy50YXJnZXQudGFyZ2V0RWwub2Zmc2V0UGFyZW50ICYmIHRoaXMudGFyZ2V0LnRhcmdldEVsLm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cblx0XHRjb25zdCBzdGFydFdpZHRoID0gdGhpcy50b29sdGlwRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cdFx0aWYgKHRoaXMub3B0cy5hcHBlbmRUb0JvZHkpIHtcblx0XHRcdC8vIElmIHRoZSB0b29sdGlwIHdpbGwgYmUgYXBlbmRlZCBkaXJlY3RseSB0byBib2R5OlxuXHRcdFx0Ly8gc2V0IGFuIElEIGluIG9yZGVyIHRvIGJlIGlkZW50aWZpZWRcblx0XHRcdHRoaXMudG9vbHRpcEVsLmlkID0gdGhpcy5vcHRzLnRhcmdldCArIFRvb2x0aXAuaWRTdWZmaXg7XG5cdFx0XHR0aGlzLnRvb2x0aXBFbC5zdHlsZS50b3AgPSB0aGlzLnRvb2x0aXBSZWN0LnRvcCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgKyAncHgnO1xuXHRcdFx0dGhpcy50b29sdGlwRWwuc3R5bGUubGVmdCA9IHRoaXMudG9vbHRpcFJlY3QubGVmdCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0ICsgJ3B4Jztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy50b29sdGlwRWwuc3R5bGUudG9wID0gdGhpcy50b29sdGlwUmVjdC50b3AgLSB0YXJnZXRUb3BPZmZzZXQgKyAncHgnO1xuXHRcdFx0dGhpcy50b29sdGlwRWwuc3R5bGUubGVmdCA9IHRoaXMudG9vbHRpcFJlY3QubGVmdCAtIHRhcmdldExlZnRPZmZzZXQgKyAncHgnO1xuXHRcdH1cblx0XHRjb25zdCBlbmRXaWR0aCA9IHRoaXMudG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG5cdFx0Ly8gVGhlIHRvb2x0aXAgc2l6ZSBjaGFuZ2VkIHdoZW4gaXQgd2FzIHBsYWNlZCwgZS5nLiBiZWNhdXNlIGlubGluZVxuXHRcdC8vIGNvbnRlbnQgb3ZlcmZsb3dlZCBhIGNvbnRhaW5lciBhbmQgd3JhcHBlZCB0byBtb3JlIGxpbmVzLlxuXHRcdC8vIFJlZHJhdyB3aXRoIHRoZSBuZXcgdG9vbHRpcCBkaW1lbnNpb25zLlxuXHRcdGlmIChzdGFydFdpZHRoICE9PSBlbmRXaWR0aCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZHJhd1Rvb2x0aXAoKTtcblx0XHR9XG5cblx0XHQvLyBTZXQgVG9vbHRpcCBhcnJvdy5cblx0XHR0aGlzLl9zZXRBcnJvdygpO1xuXG5cdFx0Ly8gV2FybiBhbGwgcG9zaXRpb25zIHdlcmUgdHJpZWQgYW5kIHRoZSB0b29sdGlwIGlzIHNpbGwgb3V0IG9mIGJvdW5kcy5cblx0XHRpZiAoY291bnQgPj0gNSkge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiVGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBpbiB0aGUgY2xpZW50IHdpbmRvdyB0byBkcmF3IHRoZSB0b29sdGlwLlwiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnM6IHRoZSBvZmZzZXQgd2lkdGggb2YgdGhlIHRvb2x0aXAgZWxlbWVudFxuXHQqL1xuXHR3aWR0aCgpIHtcblx0XHRyZXR1cm4gdGhpcy50b29sdGlwRWwub2Zmc2V0V2lkdGg7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge0ludGVnZXJ9OiB0aGUgb2Zmc2V0IGhlaWdodCBvZiB0aGUgdG9vbHRpcCBlbGVtZW50XG5cdCovXG5cdGhlaWdodCgpIHtcblx0XHRyZXR1cm4gdGhpcy50b29sdGlwRWwub2Zmc2V0SGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufSBJZiB0aGUgc2V0IHBvc2l0aW9uIGlzIG91dCBvZiBib3VuZHMuXG5cdCovXG5cdF9ldmF1bGF0ZVRvb2x0aXAocG9zaXRpb24pIHtcblx0XHRjb25zdCBheGlzID0gcG9zaXRpb24gPT09ICdhYm92ZScgfHwgcG9zaXRpb24gPT09ICdiZWxvdycgPyAneScgOiAneCc7XG5cdFx0Y29uc3QgYWxpZ25tZW50cyA9IGF4aXMgPT09ICd5JyA/IFsnbWlkZGxlJywgJ3JpZ2h0JywgJ2xlZnQnXSA6IFsnbWlkZGxlJywgJ3RvcCcsICdib3R0b20nXTtcblxuXHRcdC8vIEF0dGVtcHQgYWxsIHBvc2l0aW9uIGFsaWdubWVudHMuXG5cdFx0bGV0IGlzT3V0T2ZCb3VuZHMgPSB0cnVlO1xuXHRcdGxldCB0b29sdGlwUmVjdDtcblx0XHRsZXQgYWxpZ25tZW50O1xuXHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbGlnbm1lbnRzLmxlbmd0aCAmJiBpc091dE9mQm91bmRzID09PSB0cnVlOyBpbmRleCsrKSB7XG5cdFx0XHRhbGlnbm1lbnQgPSBhbGlnbm1lbnRzW2luZGV4XTtcblx0XHRcdHRvb2x0aXBSZWN0ID0gdGhpcy5fY2FsY3VsYXRlVG9vbHRpcFJlY3RhbmdsZShwb3NpdGlvbiwgYWxpZ25tZW50KTtcblx0XHRcdGlzT3V0T2ZCb3VuZHMgPSB0aGlzLl90b29sdGlwSXNPdXRPZkJvdW5kcyh0b29sdGlwUmVjdCk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYWxsIGFsaWdubWVudHMgZmFpbCB0byBmaXQgaW4gYm91bmRzIGRlZmF1bHQgdG8gdGhlIG1pZGRsZSBhbGlnbm1lbnQuXG5cdFx0aWYgKGlzT3V0T2ZCb3VuZHMpIHtcblx0XHRcdGFsaWdubWVudCA9ICdtaWRkbGUnO1xuXHRcdFx0dG9vbHRpcFJlY3QgPSB0aGlzLl9jYWxjdWxhdGVUb29sdGlwUmVjdGFuZ2xlKHBvc2l0aW9uLCBhbGlnbm1lbnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7IHRvb2x0aXBSZWN0LCBhbGlnbm1lbnQsIGlzT3V0T2ZCb3VuZHMgfTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXRzIHRoaXMudG9vbHRpcFJlY3QgdG8gYGxlZnRgLCBgcmlnaHRgLCBgdG9wYCBhbmQgYGJvdHRvbWBcblx0ICogcmVwcmVzZW50aW5nIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIHRvb2x0aXAgKGluY2x1ZGluZyB0aGUgYXJyb3cpXG5cdCovXG5cdF9jYWxjdWxhdGVUb29sdGlwUmVjdGFuZ2xlKHBvc2l0aW9uLCBhbGlnbm1lbnQpIHtcblx0XHRjb25zdCByZWN0ID0ge307XG5cdFx0Y29uc3QgYXhpcyA9IHBvc2l0aW9uID09PSAnYWJvdmUnIHx8IHBvc2l0aW9uID09PSAnYmVsb3cnID8gJ3knIDogJ3gnO1xuXG5cdFx0Ly8gQ2FsY3VsYXRlIGZvciBwb3NpdGlvbiBhYm92ZS9iZWxvdy5cblx0XHRpZiAoYXhpcyA9PT0gJ3knKSB7XG5cdFx0XHQvLyB0aGUgYXJyb3cgaXMgcGxhY2VkIDEwJSBhbG9uZyB0aGUgYm9keSBvZiB0aGUgdG9vbHRpcFxuXHRcdFx0Y29uc3QgYXJyb3dQb3NpdGlvbiA9IHRoaXMud2lkdGgoKSAvIDEwO1xuXG5cdFx0XHRpZiAoYWxpZ25tZW50ID09PSAnbGVmdCcpIHtcblx0XHRcdFx0cmVjdC5sZWZ0ID0gdGhpcy50YXJnZXQuY2VudHJlUG9pbnQueCAtIHRoaXMud2lkdGgoKSArIGFycm93UG9zaXRpb247XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWxpZ25tZW50ID09PSAncmlnaHQnKSB7XG5cdFx0XHRcdHJlY3QubGVmdCA9IHRoaXMudGFyZ2V0LmNlbnRyZVBvaW50LnggLSBhcnJvd1Bvc2l0aW9uO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFsaWdubWVudCA9PT0gJ21pZGRsZScpIHtcblx0XHRcdFx0cmVjdC5sZWZ0ID0gdGhpcy50YXJnZXQuY2VudHJlUG9pbnQueCAtIHRoaXMud2lkdGgoKSAvIDI7XG5cdFx0XHR9XG5cdFx0XHRpZiAocG9zaXRpb24gPT09ICdhYm92ZScpIHtcblx0XHRcdFx0cmVjdC50b3AgPSB0aGlzLnRhcmdldC50b3AgLSB0aGlzLmhlaWdodCgpIC0gVG9vbHRpcC5hcnJvd0RlcHRoO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uID09PSAnYmVsb3cnKSB7XG5cdFx0XHRcdHJlY3QudG9wID0gdGhpcy50YXJnZXQuYm90dG9tICsgVG9vbHRpcC5hcnJvd0RlcHRoO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGN1bGF0ZSBmb3IgcG9zaXRpb24gcmlnaHQvbGVmdC5cblx0XHRpZiAoYXhpcyA9PT0gJ3gnKSB7XG5cdFx0XHRpZiAoYWxpZ25tZW50ID09PSAndG9wJykge1xuXHRcdFx0XHRyZWN0LnRvcCA9IHRoaXMudGFyZ2V0LnRvcDtcblx0XHRcdH1cblx0XHRcdGlmIChhbGlnbm1lbnQgPT09ICdib3R0b20nKSB7XG5cdFx0XHRcdHJlY3QudG9wID0gdGhpcy50YXJnZXQuYm90dG9tIC0gdGhpcy5oZWlnaHQoKTtcblx0XHRcdH1cblx0XHRcdGlmIChhbGlnbm1lbnQgPT09ICdtaWRkbGUnKSB7XG5cdFx0XHRcdHJlY3QudG9wID0gdGhpcy50YXJnZXQuY2VudHJlUG9pbnQueSAtIHRoaXMuaGVpZ2h0KCkgLyAyO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uID09PSAncmlnaHQnKSB7XG5cdFx0XHRcdHJlY3QubGVmdCA9IHRoaXMudGFyZ2V0LnJpZ2h0ICsgVG9vbHRpcC5hcnJvd0RlcHRoO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uID09PSAnbGVmdCcpIHtcblx0XHRcdFx0cmVjdC5sZWZ0ID0gdGhpcy50YXJnZXQubGVmdCAtIHRoaXMud2lkdGgoKSAtIFRvb2x0aXAuYXJyb3dEZXB0aDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZWN0LnJpZ2h0ID0gcmVjdC5sZWZ0ICsgdGhpcy53aWR0aCgpO1xuXHRcdHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyB0aGlzLmhlaWdodCgpO1xuXG5cdFx0cmV0dXJuIHJlY3Q7XG5cdH1cblxuXHRjYWxjdWxhdGVUb29sdGlwUmVjdChwb3NpdGlvbikge1xuXHRcdGNvbnNvbGUud2FybignYGNhbGN1bGF0ZVRvb2x0aXBSZWN0YCBpcyBkZXByZWNhdGVkLicpO1xuXHRcdHJldHVybiB0aGlzLl9jYWxjdWxhdGVUb29sdGlwUmVjdGFuZ2xlKHBvc2l0aW9uLCAnbWlkZGxlJyk7XG5cdH1cblxuXHRfZ2V0Q29uZmlndXJlZFRvb2x0aXBQb3NpdGlvbigpIHtcblx0XHRjb25zdCB7IHBvc2l0aW9uLCBwb3NpdGlvblMsIHBvc2l0aW9uTSwgcG9zaXRpb25MLCBwb3NpdGlvblhsIH0gPSB0aGlzLm9wdHM7XG5cdFx0Y29uc3QgY3VycmVudEJyZWFrcG9pbnQgPSBUb29sdGlwLl9nZXRDdXJyZW50TGF5b3V0KCk7XG5cdFx0c3dpdGNoIChjdXJyZW50QnJlYWtwb2ludCkge1xuXHRcdFx0Y2FzZSAnUyc6XG5cdFx0XHRcdHJldHVybiBwb3NpdGlvblMgfHwgcG9zaXRpb247XG5cdFx0XHRjYXNlICdNJzpcblx0XHRcdFx0cmV0dXJuIHBvc2l0aW9uTSB8fCBwb3NpdGlvblMgfHwgcG9zaXRpb247XG5cdFx0XHRjYXNlICdMJzpcblx0XHRcdFx0cmV0dXJuIHBvc2l0aW9uTCB8fCBwb3NpdGlvbk0gfHwgcG9zaXRpb25TIHx8IHBvc2l0aW9uO1xuXHRcdFx0Y2FzZSAnWEwnOlxuXHRcdFx0XHRyZXR1cm4gcG9zaXRpb25YbCB8fCBwb3NpdGlvbkwgfHwgcG9zaXRpb25NIHx8IHBvc2l0aW9uUyB8fCBwb3NpdGlvbjtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBwb3NpdGlvbjtcblx0XHR9XG5cdH1cblxuXHRfc2V0QXJyb3coKSB7XG5cdFx0Y29uc3QgYXJyb3dDbGFzc1Jvb3QgPSAnby10b29sdGlwLS1hcnJvdy0nO1xuXHRcdGNvbnN0IGFsaWdubWVudENsYXNzUm9vdCA9ICdvLXRvb2x0aXAtYXJyb3ctLWFsaWduLSc7XG5cblx0XHRjb25zdCBjbGFzc2VzVG9SZW1vdmUgPSBbXG5cdFx0XHRcIm8tdG9vbHRpcC0tYXJyb3ctbGVmdFwiLFxuXHRcdFx0XCJvLXRvb2x0aXAtLWFycm93LXJpZ2h0XCIsXG5cdFx0XHRcIm8tdG9vbHRpcC0tYXJyb3ctYWJvdmVcIixcblx0XHRcdFwiby10b29sdGlwLS1hcnJvdy1iZWxvd1wiLFxuXHRcdFx0XCJvLXRvb2x0aXAtYXJyb3ctLWFsaWduLXRvcFwiLFxuXHRcdFx0XCJvLXRvb2x0aXAtYXJyb3ctLWFsaWduLWJvdHRvbVwiLFxuXHRcdFx0XCJvLXRvb2x0aXAtYXJyb3ctLWFsaWduLWxlZnRcIixcblx0XHRcdFwiby10b29sdGlwLWFycm93LS1hbGlnbi1yaWdodFwiLFxuXHRcdFx0XCJvLXRvb2x0aXAtYXJyb3ctLWFsaWduLW1pZGRsZVwiXG5cdFx0XTtcblxuXHRcdHRoaXMudG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc1RvUmVtb3ZlKTtcblx0XHR0aGlzLnRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKGFycm93Q2xhc3NSb290ICsgVG9vbHRpcC5wb3NpdGlvblRvQXJyb3dQb3NpdGlvbk1hcFt0aGlzLnRvb2x0aXBQb3NpdGlvbl0pO1xuXHRcdHRoaXMudG9vbHRpcEVsLmNsYXNzTGlzdC5hZGQoYWxpZ25tZW50Q2xhc3NSb290ICsgVG9vbHRpcC5hbGlnbm1lbnRUb0Fycm93QWxpZ25tZW50TWFwW3RoaXMudG9vbHRpcEFsaWdubWVudF0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrZXMgaXMgYSBoeXBvdGhldGljYWwgdG9vbHRpcCBpcyBpbiBib3VuZHMgb24gYWxsIHNpZGVzLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gdG9vbHRpcFJlY3QgLSBBbiBvYmplY3Qgd2hpY2ggcmVwcmVzZW50cyBhIGh5cG90aGV0aWNhbCB0b29sdGlwIHBvc2l0aW9uLlxuXHQqL1xuXHRfdG9vbHRpcElzT3V0T2ZCb3VuZHModG9vbHRpcFJlY3QpIHtcblx0XHRjb25zdCB0b3BPdXRvZkJvdW5kcyA9IFRvb2x0aXAuX3BvaW50SXNPdXRPZkJvdW5kcyh0b29sdGlwUmVjdC50b3AsICd5JywgdGhpcy5vcHRzKTtcblx0XHRjb25zdCBib3R0b21PdXRvZkJvdW5kcyA9IFRvb2x0aXAuX3BvaW50SXNPdXRPZkJvdW5kcyh0b29sdGlwUmVjdC5ib3R0b20sICd5JywgdGhpcy5vcHRzKTtcblx0XHRjb25zdCBsZWZ0T3V0b2ZCb3VuZHMgPSBUb29sdGlwLl9wb2ludElzT3V0T2ZCb3VuZHModG9vbHRpcFJlY3QubGVmdCwgJ3gnLCB0aGlzLm9wdHMpO1xuXHRcdGNvbnN0IHJpZ2h0T3V0b2ZCb3VuZHMgPSBUb29sdGlwLl9wb2ludElzT3V0T2ZCb3VuZHModG9vbHRpcFJlY3QucmlnaHQsICd4JywgdGhpcy5vcHRzKTtcblx0XHRyZXR1cm4gdG9wT3V0b2ZCb3VuZHMgfHwgYm90dG9tT3V0b2ZCb3VuZHMgfHwgbGVmdE91dG9mQm91bmRzIHx8IHJpZ2h0T3V0b2ZCb3VuZHM7XG5cdH1cblxuXHQvKlxuXHRcdHRoaXMgbWVhc3VyZXMgdGhlIGJvdW5kYXJpZXMgaW4gd2hpY2ggdGhlIHRvb2x0aXAgd2lsbCByZWFsaXN0aWNhbGx5IGZpdC5cblx0XHRpZiBpdCBpcyBzaG93biBvbiBjb25zdHJ1Y3Rpb24sIHRoZSBzaXplIG9mIHRoZSBkb2N1bWVudCBib2R5IHdpbGwgYmUgY29uc3VsdGVkXG5cdFx0aW4gYWxsIG90aGVyIGNhc2VzLCBpdCB3aWxsIGJlIHRoZSBzaXplIG9mIHRoZSB2aWV3cG9ydC5cblx0Ki9cblx0c3RhdGljIF9wb2ludElzT3V0T2ZCb3VuZHMocG9pbnQsIGF4aXMsIG9wdHMpIHtcblx0XHRpZiAocG9pbnQgPCAwKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKG9wdHMuc2hvd09uQ29uc3RydWN0aW9uKSB7XG5cdFx0XHRpZiAoYXhpcyA9PT0gJ3knICYmIHBvaW50ID4gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKGF4aXMgPT09ICd4JyAmJiBwb2ludCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChheGlzID09PSAneScgJiYgcG9pbnQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChheGlzID09PSAneCcgJiYgcG9pbnQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHN0YXRpYyBfcm90YXRlT3JpZW50YXRpb24ob3JpZW50YXRpb24pIHtcblx0XHRjb25zdCByb3RhdGUgPSB7XG5cdFx0XHRcImFib3ZlXCI6IFwicmlnaHRcIixcblx0XHRcdFwicmlnaHRcIjogXCJiZWxvd1wiLFxuXHRcdFx0XCJiZWxvd1wiOiBcImxlZnRcIixcblx0XHRcdFwibGVmdFwiOiBcImFib3ZlXCJcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHJvdGF0ZVtvcmllbnRhdGlvbl07XG5cdH1cblxuXHRzdGF0aWMgdGhyb3dFcnJvcihtZXNzYWdlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdcIm8tdG9vbHRpcCBlcnJvclwiOiAnICsgbWVzc2FnZSk7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgcm9vdEVsIGlzbnQgYW4gSFRNTEVsZW1lbnQsIHRyZWF0IGl0IGFzIGEgc2VsZWN0b3Jcblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgcm9vdEVsIGlzIGFuIEhUTUxFbGVtZW50IChpZSBpdCB3YXMgZm91bmQgaW4gdGhlIGRvY3VtZW50IGFueXdoZXJlKVxuXHRcdC8vIEFORCB0aGUgcm9vdEVsIGhhcyB0aGUgZGF0YS1vLWNvbXBvbmVudD1vLXRvb2x0aXAgdGhlbiBpbml0aWFsaXNlIGp1c3QgMSB0b29sdGlwICh0aGlzIG9uZSlcblx0XHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgL1xcYm8tdG9vbHRpcFxcYi8udGVzdChyb290RWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JykpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFRvb2x0aXAocm9vdEVsLCBvcHRzKTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgcm9vdEVsIHdhc24ndCBpdHNlbGYgYSB0b29sdGlwLCB0aGVuIGZpbmQgQUxMIG9mIHRoZSBjaGlsZCB0aGluZ3MgdGhhdCBoYXZlIHRoZSBkYXRhLW8tY29tcG9uZW50PW9Ub29sdGlwIHNldFxuXHRcdHJldHVybiBBcnJheS5mcm9tKHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tdG9vbHRpcFwiXScpLCByb290RWwgPT4gbmV3IFRvb2x0aXAocm9vdEVsLCBvcHRzKSk7XG5cdH1cbn1cblxuVG9vbHRpcC5pZFN1ZmZpeCA9ICctdG9vbHRpcCc7XG5cblRvb2x0aXAuYXJyb3dEZXB0aCA9IDEwO1xuVG9vbHRpcC5wb3NpdGlvblRvQXJyb3dQb3NpdGlvbk1hcCA9IHtcblx0XCJhYm92ZVwiOiBcImJlbG93XCIsXG5cdFwiYmVsb3dcIjogXCJhYm92ZVwiLFxuXHRcImxlZnRcIjogXCJyaWdodFwiLFxuXHRcInJpZ2h0XCI6IFwibGVmdFwiXG59O1xuVG9vbHRpcC5hbGlnbm1lbnRUb0Fycm93QWxpZ25tZW50TWFwID0ge1xuXHRcInRvcFwiOiBcInRvcFwiLFxuXHRcImJvdHRvbVwiOiBcImJvdHRvbVwiLFxuXHRcInJpZ2h0XCI6IFwibGVmdFwiLFxuXHRcImxlZnRcIjogXCJyaWdodFwiLFxuXHRcIm1pZGRsZVwiOiBcIm1pZGRsZVwiXG59O1xuXG5Ub29sdGlwLnZhbGlkQXJyb3dBbGlnbm1lbnRzID0gW1widG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJdO1xuVG9vbHRpcC52YWxpZFRvb2x0aXBQb3NpdGlvbnMgPSBbXCJhYm92ZVwiLCBcImJlbG93XCIsIFwibGVmdFwiLCBcInJpZ2h0XCJdO1xuXG5Ub29sdGlwLlRhcmdldCA9IFRhcmdldDtcblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcDtcbiIsIi8qKlxuKlxuKiBEZWJvdW5jZXMgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgYWZ0ZXIgbiBtaWxsaXNlY29uZHNcbiogd2l0aG91dCBpdCBub3QgYmVpbmcgY2FsbGVkXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLmRlYm91bmNlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIERlYm91bmNlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuLyoqXG4qXG4qIFRocm90dGxlIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbipcbiogQGV4YW1wbGVcbiogVXRpbHMudGhyb3R0bGUobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gVGhyb3R0bGVkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aW1lb3V0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0ZGVib3VuY2UsXG5cdHRocm90dGxlXG59O1xuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzJztcblxubGV0IGRlYnVnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGJyb2FkY2FzdChldmVudFR5cGUsIGRhdGEsIHRhcmdldCkge1xuXHR0YXJnZXQgPSB0YXJnZXQgfHwgZG9jdW1lbnQuYm9keTtcblxuXHRpZiAoZGVidWcpIHtcblx0XHRjb25zb2xlLmxvZygnby12aWV3cG9ydCcsIGV2ZW50VHlwZSwgZGF0YSk7XG5cdH1cblxuXHR0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29WaWV3cG9ydC4nICsgZXZlbnRUeXBlLCB7XG5cdFx0ZGV0YWlsOiBkYXRhLFxuXHRcdGJ1YmJsZXM6IHRydWVcblx0fSkpO1xufVxuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQuXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIGhlaWdodC5cbiogQHJldHVybiB7bnVtYmVyfVxuKi9cbmZ1bmN0aW9uIGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbn1cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgd2lkdGguXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoXG4qIEByZXR1cm4ge251bWJlcn1cbiovXG5mdW5jdGlvbiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbn1cblxuLyoqXG4gKiBWaWV3cG9ydCBzaXplLlxuICogQHR5cGVkZWYge09iamVjdH0gU2l6ZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoXG4gKi9cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgd2lkdGggYW5kIGhlaWdodC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGgvaGVpZ2h0LlxuKiBAcmV0dXJuIHtTaXplfVxuKi9cbmZ1bmN0aW9uIGdldFNpemUoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpLFxuXHRcdHdpZHRoOiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKVxuXHR9O1xufVxuXG4vKipcbiAqIFNjcm9sbCBwb3NpdGlvbi5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNjcm9sbFBvc2l0aW9uXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0IC0gYGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0YFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoIC0gYGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGhgXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGVmdCAtIGB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFhgXG4gKiBAcHJvcGVydHkge251bWJlcn0gdG9wIC0gYHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWWBcbiAqL1xuXG4vKipcbiAqIEByZXR1cm4ge1Njcm9sbFBvc2l0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRTY3JvbGxQb3NpdGlvbigpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LFxuXHRcdHdpZHRoOiBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLFxuXHRcdGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCxcblx0XHR0b3A6IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWVxuXHR9O1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3N0cmluZ30gLSAncG9ydHJhaXQnIG9yICdsYW5kc2NhcGUnXG4gKi9cbmZ1bmN0aW9uIGdldE9yaWVudGF0aW9uKCkge1xuXHRjb25zdCBvcmllbnRhdGlvbiA9IHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb247XG5cdGlmIChvcmllbnRhdGlvbikge1xuXHRcdHJldHVybiB0eXBlb2Ygb3JpZW50YXRpb24gPT09ICdzdHJpbmcnID9cblx0XHRcdG9yaWVudGF0aW9uLnNwbGl0KCctJylbMF0gOlxuXHRcdFx0b3JpZW50YXRpb24udHlwZS5zcGxpdCgnLScpWzBdO1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKSB7XG5cdFx0cmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IHBvcnRyYWl0KScpLm1hdGNoZXMgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGdldEhlaWdodCgpID49IGdldFdpZHRoKCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtib29sZWFufSAtIHRydWUgaWYgdGhlIHZpZXdwb3J0IGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VmlzaWJpbGl0eSgpIHtcblx0cmV0dXJuIGRvY3VtZW50LmhpZGRlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24oKSB7XG5cdFx0ZGVidWcgPSB0cnVlO1xuXHR9LFxuXHRicm9hZGNhc3QsXG5cdGdldFdpZHRoLFxuXHRnZXRIZWlnaHQsXG5cdGdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5LFxuXHRnZXRPcmllbnRhdGlvbixcblx0ZGVib3VuY2U6IFV0aWxzLmRlYm91bmNlLFxuXHR0aHJvdHRsZTogVXRpbHMudGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi9zcmMvdXRpbHMuanMnO1xuXG5jb25zdCB0aHJvdHRsZSA9IHV0aWxzLnRocm90dGxlO1xuY29uc3QgZGVib3VuY2UgPSB1dGlscy5kZWJvdW5jZTtcblxuY29uc3QgbGlzdGVuZXJzID0ge307XG5jb25zdCBpbnRlcnZhbHMgPSB7XG5cdHJlc2l6ZTogMTAwLFxuXHRvcmllbnRhdGlvbjogMTAwLFxuXHR2aXNpYmlsaXR5OiAxMDAsXG5cdHNjcm9sbDogMTAwXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgdG8gdGhyb3R0bGUgZm9yIHRoaXMgZHVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gaW50ZXJ2YWwgLSBUaGUgZHVyYXRpb24gdG8gdGhyb3R0bGUgaW4gbXMuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiBcdCAgIC8vIHRocm90dGxlIGZvciBkaWZmZXJlbnQgZXZlbnRzIGF0IGRpZmZlcmVudCBkdXJhdGlvbnNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCAxMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgMzAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgMzApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIDMwKVxuICogXHRcdC8vIHRocm90dGxlIGFsbCBldmVudHMgYXQgMzBtc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoMzApO1xuICovXG5mdW5jdGlvbiBzZXRUaHJvdHRsZUludGVydmFsKGV2ZW50VHlwZSwgaW50ZXJ2YWwpIHtcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInKSB7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgYXJndW1lbnRzWzBdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCBhcmd1bWVudHNbMV0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgYXJndW1lbnRzWzJdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgYXJndW1lbnRzWzNdKTtcblx0fSBlbHNlIGlmIChpbnRlcnZhbCkge1xuXHRcdGludGVydmFsc1tldmVudFR5cGVdID0gaW50ZXJ2YWw7XG5cdH1cbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9SZXNpemUoKSB7XG5cdGlmIChsaXN0ZW5lcnMucmVzaXplKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Jlc2l6ZScsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMucmVzaXplKTtcblxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5yZXNpemUgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub09yaWVudGF0aW9uKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMub3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnb3JpZW50YXRpb25jaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ29yaWVudGF0aW9uJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbigpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLm9yaWVudGF0aW9uKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMub3JpZW50YXRpb24gPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Zpc2liaWxpdHkoKSB7XG5cblx0aWYgKGxpc3RlbmVycy52aXNpYmlsaXR5KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Zpc2liaWxpdHknLCB7XG5cdFx0XHRoaWRkZW46IHV0aWxzLmdldFZpc2liaWxpdHkoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy52aXNpYmlsaXR5KTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXG5cdGxpc3RlbmVycy52aXNpYmlsaXR5ID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9TY3JvbGwoKSB7XG5cblx0aWYgKGxpc3RlbmVycy5zY3JvbGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnc2Nyb2xsJztcblx0Y29uc3QgaGFuZGxlciA9IHRocm90dGxlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0Y29uc3Qgc2Nyb2xsUG9zID0gdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Njcm9sbCcsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRzY3JvbGxIZWlnaHQ6IHNjcm9sbFBvcy5oZWlnaHQsXG5cdFx0XHRzY3JvbGxMZWZ0OiBzY3JvbGxQb3MubGVmdCxcblx0XHRcdHNjcm9sbFRvcDogc2Nyb2xsUG9zLnRvcCxcblx0XHRcdHNjcm9sbFdpZHRoOiBzY3JvbGxQb3Mud2lkdGgsXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMuc2Nyb2xsKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMuc2Nyb2xsID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50KHMpLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0byBzdGFydCBsaXN0ZW5pbmcgZm9yLiBPbmUgb2YgYHJlc2l6ZWAsIGBzY3JvbGxgLCBgb3JpZW50YXRpb25gLCBgdmlzaWJpbGl0eWAgb3IgYGFsbGAuXG4gKiBAZXhhbXBsZVxuICogXHRcdC8vIFN0YXJ0IGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ2FsbCcpO1xuICpcbiAqIFx0XHQvLyBJdCBpcyBub3cgcG9zc2libGUgdG8gbGlzdGVuIGZvciBkZWJvdW5jZSBvLXZpZXdwb3J0IGV2ZW50cyBzdWNoIGFzIGBvVmlld3BvcnQub3JpZW50YXRpb25gLlxuICogICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC5vcmllbnRhdGlvbicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gKiAgICAgIFx0Y29uc29sZS5sb2coZXZlbnQudHlwZSk7IC8vIG9WaWV3cG9ydC5vcmllbnRhdGlvblxuICogICAgICB9KTtcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdyZXNpemUnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Jlc2l6ZSgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Njcm9sbCcgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvU2Nyb2xsKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAnb3JpZW50YXRpb24nIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub09yaWVudGF0aW9uKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAndmlzaWJpbGl0eScgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvVmlzaWJpbGl0eSgpO1xuXHR9XG59XG5cbi8qKlxuICogU3RvcCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50KHMpLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0byBzdG9wIGxpc3RlbmluZyBmb3IuIE9uZSBvZiBgcmVzaXplYCwgYHNjcm9sbGAsIGBvcmllbnRhdGlvbmAsIGB2aXNpYmlsaXR5YCBvciBgYWxsYC5cbiAqIEBleGFtcGxlXG4gKiBcdFx0Ly8gU3RhcnQgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygnYWxsJyk7XG4gKiBcdFx0Ly8gV2UncmUgZG9uZS4gU3RvcCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0LnN0b3BMaXN0ZW5pbmdUbygnYWxsJyk7XG4gKi9cbmZ1bmN0aW9uIHN0b3BMaXN0ZW5pbmdUbyhldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goc3RvcExpc3RlbmluZ1RvKTtcblx0fSBlbHNlIGlmIChsaXN0ZW5lcnNbZXZlbnRUeXBlXSkge1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyc1tldmVudFR5cGVdLmV2ZW50VHlwZSwgbGlzdGVuZXJzW2V2ZW50VHlwZV0uaGFuZGxlcik7XG5cdFx0ZGVsZXRlIGxpc3RlbmVyc1tldmVudFR5cGVdO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uICgpIHtcblx0XHR1dGlscy5kZWJ1ZygpO1xuXHR9LFxuXHRsaXN0ZW5Ubyxcblx0c3RvcExpc3RlbmluZ1RvLFxuXHRzZXRUaHJvdHRsZUludGVydmFsLFxuXHRnZXRPcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24sXG5cdGdldFNpemU6IHV0aWxzLmdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uOiB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eTogdXRpbHMuZ2V0VmlzaWJpbGl0eVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmNvbnN0IG1pc3NpbmdEYXRhTWVzc2FnZSA9ICdDb3VsZCBub3QgZmluZCBsYXlvdXQgaW5mb3JtYXRpb24uICcgK1xuXHQnWW91IG1heSBuZWVkIHRvIGluY2x1ZGUgby1ncmlkIGNzcy4gU2VlIHRoZSBSRUFETUUgKGh0dHBzOi8vcmVnaXN0cnkub3JpZ2FtaS5mdC5jb20vY29tcG9uZW50cy9vLWdyaWQvcmVhZG1lKSAnICtcblx0J2ZvciBtb3JlIGluZm9ybWF0aW9uLic7XG5cbi8qKlxuICogR3JhYiBncmlkIHByb3BlcnRpZXNcbiAqIEByZXR1cm4ge09iamVjdH0gbGF5b3V0IG5hbWVzIGFuZCBndXR0ZXIgd2lkdGhzXG4gKi9cbmZ1bmN0aW9uIGdldEdyaWRQcm9wZXJ0aWVzKCkge1xuXHRjb25zdCBwcm9wZXJ0aWVzID0gZ2V0R3JpZEZyb21Eb2MoJ2FmdGVyJyk7XG5cdGlmIChPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5sZW5ndGggPT09IDApIHtcblx0XHRjb25zb2xlLndhcm4obWlzc2luZ0RhdGFNZXNzYWdlKTtcblx0fVxuXHRyZXR1cm4gcHJvcGVydGllcztcbn1cblxuLyoqXG4gKiBHZXQgYWxsIGxheW91dCBzaXplcy5cbiAqIENTUyBtdXN0IGJlIGluY2x1ZGVkIHNvIEphdmFTY3JpcHQgY2FuIHJldHJpZXZlIGxheW91dCBpbmZvcm1hdGlvbi5cbiAqIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHJldHVybiB7T2JqZWN0fSBsYXlvdXQgbmFtZXMgYW5kIHNpemVzXG4gKi9cbmZ1bmN0aW9uIGdldEdyaWRCcmVha3BvaW50cygpIHtcblx0Y29uc3QgYnJlYWtwb2ludHMgPSBnZXRHcmlkRnJvbURvYygnYmVmb3JlJyk7XG5cdGlmIChPYmplY3Qua2V5cyhicmVha3BvaW50cykubGVuZ3RoID09PSAwKSB7XG5cdFx0Y29uc29sZS53YXJuKG1pc3NpbmdEYXRhTWVzc2FnZSk7XG5cdH1cblx0cmV0dXJuIGJyZWFrcG9pbnRzO1xufVxuXG4vKipcbiAqIEdyYWIgZ3JpZCBwcm9wZXJ0aWVzIHN1cmZhY2VkIGluIGh0bWw6YWZ0ZXIgYW5kIGh0bWw6YmVmb3JlJ3MgY29udGVudFxuICogQHBhcmFtIHtTdHJpbmd9IHBvc2l0aW9uIFdoZXRoZXIgdG8gZ2V0IGFsbCBwcm9wZXJ0aWVzIGluIDpiZWZvcmUsIG9yIGN1cnJlbnQgcHJvcGVydGllcyBpbiA6YWZ0ZXJcbiAqIEByZXR1cm4ge09iamVjdH0gbGF5b3V0IG5hbWVzIGFuZCBndXR0ZXIgd2lkdGhzXG4gKi9cbmZ1bmN0aW9uIGdldEdyaWRGcm9tRG9jKHBvc2l0aW9uKSB7XG5cdC8vIENvbnRhaW5lZCBpbiBhIHRyeS9jYXRjaCBhcyBpdCBzaG91bGQgbm90IGVycm9yIGlmIG8tZ3JpZCBzdHlsZXMgYXJlIG5vdCAoZGVsaWJlcmF0ZWx5IG9yIGFjY2lkZW50YWxseSkgbG9hZGVkXG5cdC8vIGUuZy4gby10cmFja2luZyB3aWxsIGFsd2F5cyB0cnkgdG8gcmVhZCB0aGlzIHByb3BlcnR5LCBidXQgdGhlIHBhZ2UgaXMgbm90IG9ibGlnZWQgdG8gdXNlIG8tZ3JpZCBmb3IgbGF5b3V0XG5cdHRyeSB7XG5cdFx0bGV0IGdyaWRQcm9wZXJ0aWVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnOicgKyBwb3NpdGlvbikuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpO1xuXHRcdC8vIEZpcmVmb3ggY29tcHV0ZXM6IFwie1xcXCJmb29cXFwiOiBcXFwiYmFyXFxcIn1cIlxuXHRcdC8vIFdlIHdhbnQgcmVhZGFibGUgSlNPTjoge1wiZm9vXCI6IFwiYmFyXCJ9XG5cdFx0Z3JpZFByb3BlcnRpZXMgPSBncmlkUHJvcGVydGllcy5yZXBsYWNlKC8nL2csICcnKS5yZXBsYWNlKC9cXFxcL2csICcnKS5yZXBsYWNlKC9eXCIvLCAnJykucmVwbGFjZSgvXCIkLywgJycpO1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGdyaWRQcm9wZXJ0aWVzKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiB7fTtcblx0fVxufVxuXG4vKipcbiAqIEdyYWIgdGhlIGN1cnJlbnQgbGF5b3V0LlxuICogQ1NTIG11c3QgYmUgaW5jbHVkZWQgc28gSmF2YVNjcmlwdCBjYW4gcmV0cmlldmUgbGF5b3V0IGluZm9ybWF0aW9uLlxuICogU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IExheW91dCBuYW1lXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRMYXlvdXQoKSB7XG5cdHJldHVybiBnZXRHcmlkUHJvcGVydGllcygpLmxheW91dDtcbn1cblxuLyoqXG4gKiBHcmFiIHRoZSBjdXJyZW50IHNwYWNlIGJldHdlZW4gY29sdW1ucy5cbiAqIENTUyBtdXN0IGJlIGluY2x1ZGVkIHNvIEphdmFTY3JpcHQgY2FuIHJldHJpZXZlIGxheW91dCBpbmZvcm1hdGlvbi5cbiAqIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHJldHVybiB7U3RyaW5nfSBHdXR0ZXIgd2lkdGggaW4gcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRHdXR0ZXIoKSB7XG5cdHJldHVybiBnZXRHcmlkUHJvcGVydGllcygpLmd1dHRlcjtcbn1cblxuLyoqXG4gKiBUaGlzIHNldHMgTWVkaWFRdWVyeUxpc3RlbmVycyBvbiBhbGwgdGhlIG8tZ3JpZCBicmVha3BvaW50c1xuICogYW5kIGZpcmVzIGEgYG8tZ3JpZC5sYXlvdXRDaGFuZ2VgIGV2ZW50IG9uIGxheW91dCBjaGFuZ2UuXG4gKiBDU1MgbXVzdCBiZSBpbmNsdWRlZCBzbyBKYXZhU2NyaXB0IGNhbiByZXRyaWV2ZSBsYXlvdXQgaW5mb3JtYXRpb24uXG4gKiBTZWUgdGhlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBlbmFibGVMYXlvdXRDaGFuZ2VFdmVudHMoKSB7XG5cdC8vIENyZWF0ZSBhIG1hcCBjb250YWluaW5nIGFsbCBicmVha3BvaW50cyBleHBvc2VkIHZpYSBodG1sOmJlZm9yZVxuXHRjb25zdCBncmlkTGF5b3V0cyA9IGdldEdyaWRCcmVha3BvaW50cygpO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdGlmIChncmlkTGF5b3V0cy5oYXNPd25Qcm9wZXJ0eSgnbGF5b3V0cycpKSB7XG5cdFx0Y29uc3QgbGF5b3V0cyA9IGdyaWRMYXlvdXRzLmxheW91dHM7XG5cdFx0Y29uc3QgYnJlYWtwb2ludHMgPSBbXG5cdFx0XHQuLi5PYmplY3QuZW50cmllcyhsYXlvdXRzKSxcblx0XHRcdFsnZGVmYXVsdCcsICcyNDBweCddXG5cdFx0XS5zb3J0KChhLCBiKSA9PiBwYXJzZUZsb2F0KGFbMV0pIC0gcGFyc2VGbG9hdChiWzFdKSk7XG5cblx0XHRjb25zdCBzZXR1cFF1ZXJ5ID0gKHF1ZXJ5LCBzaXplKSA9PiB7XG5cdFx0XHQvLyBtYXRjaE1lZGlhIGxpc3RlbmVyIGhhbmRsZXI6IERpc3BhdGNoIGBvLWdyaWQubGF5b3V0Q2hhbmdlYCBldmVudCBpZiBhIG1hdGNoXG5cdFx0XHRjb25zdCBoYW5kbGVNUUNoYW5nZSA9IG1xbCA9PiB7XG5cdFx0XHRcdGlmIChtcWwubWF0Y2hlcykge1xuXHRcdFx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby1ncmlkLmxheW91dENoYW5nZScsIHtcblx0XHRcdFx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRcdFx0XHRsYXlvdXQ6IHNpemUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBtcWwgPSB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSk7XG5cdFx0XHRtcWwuYWRkTGlzdGVuZXIoaGFuZGxlTVFDaGFuZ2UpO1xuXHRcdFx0aGFuZGxlTVFDaGFuZ2UobXFsKTtcblx0XHR9O1xuXG5cdFx0Ly8gR2VuZXJhdGUgbWVkaWEgcXVlcmllcyBmb3IgZWFjaFxuXHRcdGNvbnN0IGRlY3IxID0gdmFsID0+IGAke051bWJlcih2YWwucmVwbGFjZSgncHgnLCAnJykgLSAxKX1weGA7XG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJyZWFrcG9pbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0Y29uc3QgW2xheW91dE5hbWUsIGxheW91dFdpZHRoXSA9IGJyZWFrcG9pbnRzW2luZGV4XTtcblx0XHRcdGNvbnN0IGlzTGFzdCA9IGluZGV4ID09PSBicmVha3BvaW50cy5sZW5ndGggLSAxO1xuXHRcdFx0aWYgKGlzTGFzdCkge1xuXHRcdFx0XHRzZXR1cFF1ZXJ5KGAobWluLXdpZHRoOiAke2xheW91dFdpZHRofSlgLCBsYXlvdXROYW1lKTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBbLG5leHRMYXlvdXRXaWR0aF0gPSBicmVha3BvaW50c1tpbmRleCArIDFdO1xuXHRcdFx0c2V0dXBRdWVyeShgKG1pbi13aWR0aDogJHtsYXlvdXRXaWR0aH0pIGFuZCAobWF4LXdpZHRoOiAke2RlY3IxKG5leHRMYXlvdXRXaWR0aCl9KWAsIGxheW91dE5hbWUpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZW5hYmxlIGdyaWQgbGF5b3V0IGNoYW5nZSBldmVudHMuIEluY2x1ZGUgby1ncmlkIGNzcy4gU2VlIHRoZSBSRUFETUUgKGh0dHBzOi8vcmVnaXN0cnkub3JpZ2FtaS5mdC5jb20vY29tcG9uZW50cy9vLWdyaWQvcmVhZG1lKSBmb3IgbW9yZSBkZXRhaWxzLicpO1xuXHR9XG59XG5cbmV4cG9ydCB7XG5cdGdldEN1cnJlbnRMYXlvdXQsXG5cdGdldEN1cnJlbnRHdXR0ZXIsXG5cdGdldEdyaWRCcmVha3BvaW50cyxcblx0ZW5hYmxlTGF5b3V0Q2hhbmdlRXZlbnRzXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGdldEN1cnJlbnRMYXlvdXQsXG5cdGdldEN1cnJlbnRHdXR0ZXIsXG5cdGdldEdyaWRCcmVha3BvaW50cyxcblx0ZW5hYmxlTGF5b3V0Q2hhbmdlRXZlbnRzXG59O1xuIiwiY2xhc3MgVGFyZ2V0IHtcblx0Y29uc3RydWN0b3IodGFyZ2V0RWwpIHtcblx0XHR0aGlzLnRhcmdldEVsID0gdGFyZ2V0RWw7XG5cdH1cblxuXHRnZXQgb2Zmc2V0VG9wKCkge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldEVsLm9mZnNldFRvcDtcblx0fVxuXG5cdGdldCBsZWZ0KCkge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG5cdH1cblxuXHRnZXQgcmlnaHQoKSB7XG5cdFx0cmV0dXJuIHRoaXMubGVmdCArIHRoaXMud2lkdGg7XG5cdH1cblxuXHRnZXQgdG9wKCkge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblx0fVxuXG5cdGdldCBib3R0b20oKSB7XG5cdFx0cmV0dXJuIHRoaXMudG9wICsgdGhpcy5oZWlnaHQ7XG5cdH1cblxuXHRnZXQgd2lkdGgoKSB7XG5cdFx0cmV0dXJuIHRoaXMudGFyZ2V0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cdH1cblxuXHRnZXQgaGVpZ2h0KCkge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0fVxuXG5cdGdldCBjZW50cmVQb2ludCgpe1xuXHRcdHJldHVybiB7IHg6IHRoaXMubGVmdCArIHRoaXMud2lkdGgvMiwgeTogdGhpcy50b3AgKyB0aGlzLmhlaWdodC8yfTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXJnZXQ7XG4iLCJpbXBvcnQgVG9vbHRpcCBmcm9tICcuL3NyYy9qcy90b29sdGlwLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24oKSB7XG5cdFRvb2x0aXAuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcDtcbiIsImltcG9ydCBUb29sdGlwIGZyb20gJy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRjb25zdCB0b29sdGlwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbXBlcmF0aXZlLXRvb2x0aXAtdGFyZ2V0Jyk7XG5cdG5ldyBUb29sdGlwKHRvb2x0aXBFbGVtZW50LCB7XG5cdFx0dGFyZ2V0OiAndG9vbHRpcC10YXJnZXQtaW1wZXJhdGl2ZScsXG5cdFx0Y29udGVudDogJzxwPkNsaWNrIHRvIHNhdmUgdG8gc29tZXdoZXJlPC9wPicsXG5cdFx0c2hvd09uQ29uc3RydWN0aW9uOiB0cnVlLFxuXHRcdHBvc2l0aW9uOiAnYWJvdmUnLFxuXHRcdGFwcGVuZFRvQm9keTogdHJ1ZVxuXHR9KTtcbn0pO1xuIl19