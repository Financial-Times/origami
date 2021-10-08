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
  var main_default3 = tooltip_default; // demos/src/no-markup.js

  document.addEventListener("DOMContentLoaded", function () {
    var tooltipElement = document.querySelector(".imperative-tooltip-target");
    new main_default3(tooltipElement, {
      target: "demo-tooltip-target-imperative",
      content: "Click to save to somewhere",
      showOnConstruction: true,
      position: "right"
    });
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvdG9vbHRpcC5qcyIsIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsIi4uL28tZ3JpZC9tYWluLmpzIiwic3JjL2pzL3RhcmdldC5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvbm8tbWFya3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFBLGVBQUEsR0FBQSxVQUFBLENBQUE7QUFBQSxpREFBQSw4Q0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBQUE7O0FBRUEsTUFBQSxNQUFBLENBQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxRQUFBLEtBQUEsRUFBTztBQURvQyxPQUE3QztBQUdBLE1BQUEsT0FBQSxDQUFRLE9BQVIsR0FBa0IsS0FBQSxDQUFsQjs7QUFZQSxlQUFBLFNBQUEsQ0FBa0IsSUFBbEIsRUFBd0I7QUFPdEIsYUFBSyxXQUFMLEdBQW1CLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBbkI7O0FBRUEsWUFBSSxJQUFKLEVBQVU7QUFDUixlQUFLLElBQUwsQ0FBVSxJQUFWO0FBQVU7O0FBS1osYUFBSyxNQUFMLEdBQWMsU0FBQSxDQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBZDtBQUVBLGFBQUssaUJBQUwsR0FBeUIsRUFBekI7QUFBeUI7O0FBVzNCLE1BQUEsU0FBQSxDQUFTLFNBQVQsQ0FBbUIsSUFBbkIsR0FBMEIsVUFBVSxJQUFWLEVBQWdCO0FBQ3hDLFlBQUksV0FBQSxHQUFjLEtB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VixFQUFtQixNQUFuQixFQUEyQixPQUEzQixDQUFoQztBQUVBLEVBQUEsT0FBQSxDQUFRLE1BQVIsR0FBaUIsY0FBakI7QUFFQSxNQUFPLGVBQUEsR0FBUSxPQUFmLEM7O0FNcm5CQSxNQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsR0FBVztBQUMvQixJQUFBLGVBQUEsQ0FBUSxJQUFSO0FBQ0EsSUFBQSxRQUFBLENBQVMsbUJBQVQsQ0FBNkIsb0JBQTdCLEVBQW1ELFlBQW5EO0FBQW1ELEdBRnBEOztBQUtBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxZQUFoRDtBQUVBLE1BQU8sYUFBQSxHQUFRLGVBQWYsQzs7QUNOQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN4RCxRQUFNLGNBQUEsR0FBaUIsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsNEJBQXZCLENBQXZCO0FBQ0EsUUFBSSxhQUFKLENBQVksY0FBWixFQUE0QjtBQUMzQixNQUFBLE1BQUEsRUFBUSxnQ0FEbUI7QUFFM0IsTUFBQSxPQUFBLEVBQVMsNEJBRmtCO0FBRzNCLE1BQUEsa0JBQUEsRUFBb0IsSUFITztBQUkzQixNQUFBLFFBQUEsRUFBVTtBQUppQixLQUE1QjtBQUlXLEdBTloiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxuLyoqXG4gKiBET00gZXZlbnQgZGVsZWdhdG9yXG4gKlxuICogVGhlIGRlbGVnYXRvciB3aWxsIGxpc3RlblxuICogZm9yIGV2ZW50cyB0aGF0IGJ1YmJsZSB1cFxuICogdG8gdGhlIHJvb3Qgbm9kZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqL1xuZnVuY3Rpb24gRGVsZWdhdGUocm9vdCkge1xuICAvKipcbiAgICogTWFpbnRhaW4gYSBtYXAgb2YgbGlzdGVuZXJcbiAgICogbGlzdHMsIGtleWVkIGJ5IGV2ZW50IG5hbWUuXG4gICAqXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgdGhpcy5saXN0ZW5lck1hcCA9IFt7fSwge31dO1xuXG4gIGlmIChyb290KSB7XG4gICAgdGhpcy5yb290KHJvb3QpO1xuICB9XG4gIC8qKiBAdHlwZSBmdW5jdGlvbigpICovXG5cblxuICB0aGlzLmhhbmRsZSA9IERlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUuYmluZCh0aGlzKTsgLy8gQ2FjaGUgb2YgZXZlbnQgbGlzdGVuZXJzIHJlbW92ZWQgZHVyaW5nIGFuIGV2ZW50IGN5Y2xlXG5cbiAgdGhpcy5fcmVtb3ZlZExpc3RlbmVycyA9IFtdO1xufVxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuICogb24gdGhlIHByb3ZpZGVkIERPTSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHZhciBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXA7XG4gIHZhciBldmVudFR5cGU7IC8vIFJlbW92ZSBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG5cbiAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFsxXSkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwWzFdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzBdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBJZiBubyByb290IG9yIHJvb3QgaXMgbm90XG4gIC8vIGEgZG9tIG5vZGUsIHRoZW4gcmVtb3ZlIGludGVybmFsXG4gIC8vIHJvb3QgcmVmZXJlbmNlIGFuZCBleGl0IGhlcmVcblxuXG4gIGlmICghcm9vdCB8fCAhcm9vdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgcm9vdCBub2RlIGF0IHdoaWNoXG4gICAqIGxpc3RlbmVycyBhcmUgYXR0YWNoZWQuXG4gICAqXG4gICAqIEB0eXBlIE5vZGVcbiAgICovXG5cblxuICB0aGlzLnJvb3RFbGVtZW50ID0gcm9vdDsgLy8gU2V0IHVwIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcblxuICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFsxXSkge1xuICAgIGlmIChsaXN0ZW5lck1hcFsxXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5jYXB0dXJlRm9yVHlwZSA9IGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgcmV0dXJuIFsnYmx1cicsICdlcnJvcicsICdmb2N1cycsICdsb2FkJywgJ3Jlc2l6ZScsICdzY3JvbGwnXS5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xO1xufTtcbi8qKlxuICogQXR0YWNoIGEgaGFuZGxlciB0byBvbmVcbiAqIGV2ZW50IGZvciBhbGwgZWxlbWVudHNcbiAqIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yLFxuICogbm93IG9yIGluIHRoZSBmdXR1cmVcbiAqXG4gKiBUaGUgaGFuZGxlciBmdW5jdGlvbiByZWNlaXZlc1xuICogdGhyZWUgYXJndW1lbnRzOiB0aGUgRE9NIGV2ZW50XG4gKiBvYmplY3QsIHRoZSBub2RlIHRoYXQgbWF0Y2hlZFxuICogdGhlIHNlbGVjdG9yIHdoaWxlIHRoZSBldmVudFxuICogd2FzIGJ1YmJsaW5nIGFuZCBhIHJlZmVyZW5jZVxuICogdG8gaXRzZWxmLiBXaXRoaW4gdGhlIGhhbmRsZXIsXG4gKiAndGhpcycgaXMgZXF1YWwgdG8gdGhlIHNlY29uZFxuICogYXJndW1lbnQuXG4gKlxuICogVGhlIG5vZGUgdGhhdCBhY3R1YWxseSByZWNlaXZlZFxuICogdGhlIGV2ZW50IGNhbiBiZSBhY2Nlc3NlZCB2aWFcbiAqICdldmVudC50YXJnZXQnLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgTGlzdGVuIGZvciB0aGVzZSBldmVudHNcbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gc2VsZWN0b3IgT25seSBoYW5kbGUgZXZlbnRzIG9uIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3IsIGlmIHVuZGVmaW5lZCBtYXRjaCByb290IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gaGFuZGxlciBIYW5kbGVyIGZ1bmN0aW9uIC0gZXZlbnQgZGF0YSBwYXNzZWQgaGVyZSB3aWxsIGJlIGluIGV2ZW50LmRhdGFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3VzZUNhcHR1cmVdIHNlZSAndXNlQ2FwdHVyZScgaW4gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyPlxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gIHZhciByb290O1xuICB2YXIgbGlzdGVuZXJNYXA7XG4gIHZhciBtYXRjaGVyO1xuICB2YXIgbWF0Y2hlclBhcmFtO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBldmVudCB0eXBlOiAnICsgZXZlbnRUeXBlKTtcbiAgfSAvLyBoYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuXG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZUNhcHR1cmUgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IG51bGw7XG4gIH0gLy8gRmFsbGJhY2sgdG8gc2Vuc2libGUgZGVmYXVsdHNcbiAgLy8gaWYgdXNlQ2FwdHVyZSBub3Qgc2V0XG5cblxuICBpZiAodXNlQ2FwdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdXNlQ2FwdHVyZSA9IHRoaXMuY2FwdHVyZUZvclR5cGUoZXZlbnRUeXBlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhbmRsZXIgbXVzdCBiZSBhIHR5cGUgb2YgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXBbdXNlQ2FwdHVyZSA/IDEgOiAwXTsgLy8gQWRkIG1hc3RlciBoYW5kbGVyIGZvciB0eXBlIGlmIG5vdCBjcmVhdGVkIHlldFxuXG4gIGlmICghbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSkge1xuICAgIGlmIChyb290KSB7XG4gICAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuXG4gICAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSA9IFtdO1xuICB9XG5cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIG1hdGNoZXJQYXJhbSA9IG51bGw7IC8vIENPTVBMRVggLSBtYXRjaGVzUm9vdCBuZWVkcyB0byBoYXZlIGFjY2VzcyB0b1xuICAgIC8vIHRoaXMucm9vdEVsZW1lbnQsIHNvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvIHRoaXMuXG5cbiAgICBtYXRjaGVyID0gbWF0Y2hlc1Jvb3QuYmluZCh0aGlzKTsgLy8gQ29tcGlsZSBhIG1hdGNoZXIgZm9yIHRoZSBnaXZlbiBzZWxlY3RvclxuICB9IGVsc2UgaWYgKC9eW2Etel0rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3I7XG4gICAgbWF0Y2hlciA9IG1hdGNoZXNUYWc7XG4gIH0gZWxzZSBpZiAoL14jW2EtejAtOVxcLV9dKyQvaS50ZXN0KHNlbGVjdG9yKSkge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yLnNsaWNlKDEpO1xuICAgIG1hdGNoZXIgPSBtYXRjaGVzSWQ7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3I7XG4gICAgbWF0Y2hlciA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXM7XG4gIH0gLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGxpc3RlbmVyc1xuXG5cbiAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXS5wdXNoKHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICBtYXRjaGVyOiBtYXRjaGVyLFxuICAgIG1hdGNoZXJQYXJhbTogbWF0Y2hlclBhcmFtXG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIFJlbW92ZSBhbiBldmVudCBoYW5kbGVyXG4gKiBmb3IgZWxlbWVudHMgdGhhdCBtYXRjaFxuICogdGhlIHNlbGVjdG9yLCBmb3JldmVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtldmVudFR5cGVdIFJlbW92ZSBoYW5kbGVycyBmb3IgZXZlbnRzIG1hdGNoaW5nIHRoaXMgdHlwZSwgY29uc2lkZXJpbmcgdGhlIG90aGVyIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIG90aGVyIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gW2hhbmRsZXJdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIHByZXZpb3VzIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgdmFyIGk7XG4gIHZhciBsaXN0ZW5lcjtcbiAgdmFyIGxpc3RlbmVyTWFwO1xuICB2YXIgbGlzdGVuZXJMaXN0O1xuICB2YXIgc2luZ2xlRXZlbnRUeXBlOyAvLyBIYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VDYXB0dXJlID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9IC8vIElmIHVzZUNhcHR1cmUgbm90IHNldCwgcmVtb3ZlXG4gIC8vIGFsbCBldmVudCBsaXN0ZW5lcnNcblxuXG4gIGlmICh1c2VDYXB0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLm9mZihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB0cnVlKTtcbiAgICB0aGlzLm9mZihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXBbdXNlQ2FwdHVyZSA/IDEgOiAwXTtcblxuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIGZvciAoc2luZ2xlRXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoc2luZ2xlRXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLm9mZihzaW5nbGVFdmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG5cbiAgaWYgKCFsaXN0ZW5lckxpc3QgfHwgIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSAvLyBSZW1vdmUgb25seSBwYXJhbWV0ZXIgbWF0Y2hlc1xuICAvLyBpZiBzcGVjaWZpZWRcblxuXG4gIGZvciAoaSA9IGxpc3RlbmVyTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJMaXN0W2ldO1xuXG4gICAgaWYgKCghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGxpc3RlbmVyLnNlbGVjdG9yKSAmJiAoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gbGlzdGVuZXIuaGFuZGxlcikpIHtcbiAgICAgIHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIGxpc3RlbmVyTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9IC8vIEFsbCBsaXN0ZW5lcnMgcmVtb3ZlZFxuXG5cbiAgaWYgKCFsaXN0ZW5lckxpc3QubGVuZ3RoKSB7XG4gICAgZGVsZXRlIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07IC8vIFJlbW92ZSB0aGUgbWFpbiBoYW5kbGVyXG5cbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHVzZUNhcHR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogSGFuZGxlIGFuIGFyYml0cmFyeSBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmhhbmRsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgaTtcbiAgdmFyIGw7XG4gIHZhciB0eXBlID0gZXZlbnQudHlwZTtcbiAgdmFyIHJvb3Q7XG4gIHZhciBwaGFzZTtcbiAgdmFyIGxpc3RlbmVyO1xuICB2YXIgcmV0dXJuZWQ7XG4gIHZhciBsaXN0ZW5lckxpc3QgPSBbXTtcbiAgdmFyIHRhcmdldDtcbiAgdmFyIGV2ZW50SWdub3JlID0gJ2Z0TGFic0RlbGVnYXRlSWdub3JlJztcblxuICBpZiAoZXZlbnRbZXZlbnRJZ25vcmVdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0OyAvLyBIYXJkY29kZSB2YWx1ZSBvZiBOb2RlLlRFWFRfTk9ERVxuICAvLyBhcyBub3QgZGVmaW5lZCBpbiBJRThcblxuICBpZiAodGFyZ2V0Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gIH0gLy8gSGFuZGxlIFNWRyA8dXNlPiBlbGVtZW50cyBpbiBJRVxuXG5cbiAgaWYgKHRhcmdldC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudCkge1xuICAgIHRhcmdldCA9IHRhcmdldC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudDtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICBwaGFzZSA9IGV2ZW50LmV2ZW50UGhhc2UgfHwgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCA/IDMgOiAyKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtY2FzZVxuXG4gIHN3aXRjaCAocGhhc2UpIHtcbiAgICBjYXNlIDE6XG4gICAgICAvL0V2ZW50LkNBUFRVUklOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIC8vRXZlbnQuQVRfVEFSR0VUOlxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJNYXBbMF0gJiYgdGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXSkge1xuICAgICAgICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lckxpc3QuY29uY2F0KHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFsxXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKSB7XG4gICAgICAgIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTGlzdC5jb25jYXQodGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAzOlxuICAgICAgLy9FdmVudC5CVUJCTElOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV07XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHZhciB0b0ZpcmUgPSBbXTsgLy8gTmVlZCB0byBjb250aW51b3VzbHkgY2hlY2tcbiAgLy8gdGhhdCB0aGUgc3BlY2lmaWMgbGlzdCBpc1xuICAvLyBzdGlsbCBwb3B1bGF0ZWQgaW4gY2FzZSBvbmVcbiAgLy8gb2YgdGhlIGNhbGxiYWNrcyBhY3R1YWxseVxuICAvLyBjYXVzZXMgdGhlIGxpc3QgdG8gYmUgZGVzdHJveWVkLlxuXG4gIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoO1xuXG4gIHdoaWxlICh0YXJnZXQgJiYgbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJMaXN0W2ldOyAvLyBCYWlsIGZyb20gdGhpcyBsb29wIGlmXG4gICAgICAvLyB0aGUgbGVuZ3RoIGNoYW5nZWQgYW5kXG4gICAgICAvLyBubyBtb3JlIGxpc3RlbmVycyBhcmVcbiAgICAgIC8vIGRlZmluZWQgYmV0d2VlbiBpIGFuZCBsLlxuXG4gICAgICBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgJiYgW1wiYnV0dG9uXCIsIFwiaW5wdXRcIiwgXCJzZWxlY3RcIiwgXCJ0ZXh0YXJlYVwiXS5pbmRleE9mKHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEgJiYgdGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpKSB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGluZ3MgdGhhdCBoYXZlIHByZXZpb3VzbHkgZmlyZWRcbiAgICAgICAgdG9GaXJlID0gW107XG4gICAgICB9IC8vIENoZWNrIGZvciBtYXRjaCBhbmQgZmlyZVxuICAgICAgLy8gdGhlIGV2ZW50IGlmIHRoZXJlJ3Mgb25lXG4gICAgICAvL1xuICAgICAgLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXlcbiAgICAgIC8vIHRvIGNoZWNrIGlmIGV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGJvdGggbG9vcHMuXG4gICAgICBlbHNlIGlmIChsaXN0ZW5lci5tYXRjaGVyLmNhbGwodGFyZ2V0LCBsaXN0ZW5lci5tYXRjaGVyUGFyYW0sIHRhcmdldCkpIHtcbiAgICAgICAgICB0b0ZpcmUucHVzaChbZXZlbnQsIHRhcmdldCwgbGlzdGVuZXJdKTtcbiAgICAgICAgfVxuICAgIH0gLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXkgdG9cbiAgICAvLyBjaGVjayBpZiBldmVudCNzdG9wUHJvcGFnYXRpb25cbiAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgbG9vcGluZ1xuICAgIC8vIHRocm91Z2ggdGhlIERPTS4gU3RvcCBpZiB0aGVcbiAgICAvLyBkZWxlZ2F0aW9uIHJvb3QgaGFzIGJlZW4gcmVhY2hlZFxuXG5cbiAgICBpZiAodGFyZ2V0ID09PSByb290KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDsgLy8gRmFsbCBiYWNrIHRvIHBhcmVudE5vZGUgc2luY2UgU1ZHIGNoaWxkcmVuIGhhdmUgbm8gcGFyZW50RWxlbWVudCBpbiBJRVxuXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQgfHwgdGFyZ2V0LnBhcmVudE5vZGU7IC8vIERvIG5vdCB0cmF2ZXJzZSB1cCB0byBkb2N1bWVudCByb290IHdoZW4gdXNpbmcgcGFyZW50Tm9kZSwgdGhvdWdoXG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTERvY3VtZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgcmV0O1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0b0ZpcmUubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBIYXMgaXQgYmVlbiByZW1vdmVkIGR1cmluZyB3aGlsZSB0aGUgZXZlbnQgZnVuY3Rpb24gd2FzIGZpcmVkXG4gICAgaWYgKHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMuaW5kZXhPZih0b0ZpcmVbaV1bMl0pID4gLTEpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJldHVybmVkID0gdGhpcy5maXJlLmFwcGx5KHRoaXMsIHRvRmlyZVtpXSk7IC8vIFN0b3AgcHJvcGFnYXRpb24gdG8gc3Vic2VxdWVudFxuICAgIC8vIGNhbGxiYWNrcyBpZiB0aGUgY2FsbGJhY2sgcmV0dXJuZWRcbiAgICAvLyBmYWxzZVxuXG4gICAgaWYgKHJldHVybmVkID09PSBmYWxzZSkge1xuICAgICAgdG9GaXJlW2ldWzBdW2V2ZW50SWdub3JlXSA9IHRydWU7XG4gICAgICB0b0ZpcmVbaV1bMF0ucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG4vKipcbiAqIEZpcmUgYSBsaXN0ZW5lciBvbiBhIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcikge1xuICByZXR1cm4gbGlzdGVuZXIuaGFuZGxlci5jYWxsKHRhcmdldCwgZXZlbnQsIHRhcmdldCk7XG59O1xuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgYSB0YWcgc2VsZWN0b3IuXG4gKlxuICogVGFncyBhcmUgTk9UIGNhc2Utc2Vuc2l0aXZlLFxuICogZXhjZXB0IGluIFhNTCAoYW5kIFhNTC1iYXNlZFxuICogbGFuZ3VhZ2VzIHN1Y2ggYXMgWEhUTUwpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSB0YWcgbmFtZSB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNUYWcodGFnTmFtZSwgZWxlbWVudCkge1xuICByZXR1cm4gdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbn1cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIHRoZSByb290LlxuICpcbiAqIEBwYXJhbSB7P1N0cmluZ30gc2VsZWN0b3IgSW4gdGhpcyBjYXNlIHRoaXMgaXMgYWx3YXlzIHBhc3NlZCB0aHJvdWdoIGFzIG51bGwgYW5kIG5vdCB1c2VkXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzUm9vdChzZWxlY3RvciwgZWxlbWVudCkge1xuICBpZiAodGhpcy5yb290RWxlbWVudCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuICgvLyBNYXRjaCB0aGUgb3V0ZXIgZG9jdW1lbnQgKGRpc3BhdGNoZWQgZnJvbSBkb2N1bWVudClcbiAgICAgIGVsZW1lbnQgPT09IGRvY3VtZW50IHx8IC8vIFRoZSA8aHRtbD4gZWxlbWVudCAoZGlzcGF0Y2hlZCBmcm9tIGRvY3VtZW50LmJvZHkgb3IgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICAgICAgZWxlbWVudCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IC8vIE9yIHRoZSB3aW5kb3cgaXRzZWxmIChkaXNwYXRjaGVkIGZyb20gd2luZG93KVxuICAgICAgZWxlbWVudCA9PT0gd2luZG93XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLnJvb3RFbGVtZW50ID09PSBlbGVtZW50O1xufVxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBJRCBvZlxuICogdGhlIGVsZW1lbnQgaW4gJ3RoaXMnXG4gKiBtYXRjaGVzIHRoZSBnaXZlbiBJRC5cbiAqXG4gKiBJRHMgYXJlIGNhc2Utc2Vuc2l0aXZlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgSUQgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzSWQoaWQsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIGlkID09PSBlbGVtZW50LmlkO1xufVxuLyoqXG4gKiBTaG9ydCBoYW5kIGZvciBvZmYoKVxuICogYW5kIHJvb3QoKSwgaWUgYm90aFxuICogd2l0aCBubyBwYXJhbWV0ZXJzXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vZmYoKTtcbiAgdGhpcy5yb290KCk7XG59O1xuXG52YXIgX2RlZmF1bHQgPSBEZWxlZ2F0ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7IiwiaW1wb3J0IERlbGVnYXRlIGZyb20gJ2Z0ZG9tZGVsZWdhdGUnO1xuaW1wb3J0IFZpZXdwb3J0IGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby12aWV3cG9ydCc7XG5pbXBvcnQgb0dyaWQgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLWdyaWQnO1xuaW1wb3J0IFRhcmdldCBmcm9tICcuL3RhcmdldC5qcyc7XG5cbmNsYXNzIFRvb2x0aXAge1xuXHRzdGF0aWMgX2dldEN1cnJlbnRMYXlvdXQoKSB7XG5cdFx0cmV0dXJuIG9HcmlkLmdldEN1cnJlbnRMYXlvdXQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXByZXNlbnRzIGEgdG9vbHRpcC5cblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBFbCAtIFRoZSB0b29sdGlwIGVsZW1lbnQgaW4gdGhlIERPTSAoUmVxdWlyZWQpXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSB0b29sdGlwIChPcHRpb25hbClcblx0Ki9cblx0Y29uc3RydWN0b3IodG9vbHRpcEVsLCBvcHRzKSB7XG5cdFx0aWYgKCFUb29sdGlwLl90b29sdGlwcykge1xuXHRcdFx0VG9vbHRpcC5fdG9vbHRpcHMgPSBuZXcgTWFwKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5vcHRzID0gb3B0cyB8fCBUb29sdGlwLmdldE9wdGlvbnModG9vbHRpcEVsKTtcblx0XHR0aGlzLm9wdHMgPSBUb29sdGlwLmNoZWNrT3B0aW9ucyh0aGlzLm9wdHMpO1xuXG5cdFx0aWYgKG9wdHMgJiYgb3B0cy5jb250ZW50KSB7XG5cdFx0XHR0aGlzLnRvb2x0aXBFbCA9IFRvb2x0aXAuY29uc3RydWN0RWxlbWVudCh0b29sdGlwRWwsIG9wdHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnRvb2x0aXBFbCA9IHRvb2x0aXBFbDtcblx0XHR9XG5cblx0XHRUb29sdGlwLl90b29sdGlwcy5zZXQodGhpcy50b29sdGlwRWwsIHRoaXMpO1xuXG5cdFx0dGhpcy50YXJnZXROb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5vcHRzLnRhcmdldCk7XG5cdFx0dGhpcy50YXJnZXQgPSBuZXcgVG9vbHRpcC5UYXJnZXQodGhpcy50YXJnZXROb2RlKTtcblx0XHR0aGlzLnRvb2x0aXBQb3NpdGlvbiA9IHRoaXMuX2dldENvbmZpZ3VyZWRUb29sdGlwUG9zaXRpb24oKTtcblx0XHR0aGlzLnRvb2x0aXBBbGlnbm1lbnQgPSBudWxsO1xuXHRcdHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5kZWxlZ2F0ZXMgPSB7XG5cdFx0XHR0YXJnZXQ6IG5ldyBEZWxlZ2F0ZSh0aGlzLnRhcmdldC50YXJnZXRFbCksXG5cdFx0XHRkb2M6IG5ldyBEZWxlZ2F0ZSgpLFxuXHRcdFx0dG9vbHRpcDogbmV3IERlbGVnYXRlKCksXG5cdFx0fTtcblxuXHRcdGlmICh0aGlzLm9wdHMuc2hvd09uQ2xpY2spIHtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLnRhcmdldC5vbignY2xpY2snLCB0aGlzLnNob3cuYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy50b2dnbGVPbkNsaWNrKSB7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy50YXJnZXQub24oJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy5zaG93T25Ib3Zlcikge1xuXHRcdFx0dGhpcy5kZWxlZ2F0ZXMudGFyZ2V0Lm9uKCdtb3VzZW92ZXInLCB0aGlzLnNob3cuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy50YXJnZXQub24oJ21vdXNlb3V0JywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cblx0XHRpZih0aGlzLm9wdHMuc2hvd09uRm9jdXMpIHtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLnRhcmdldC5vbignZm9jdXNpbicsIHRoaXMuc2hvdy5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuZGVsZWdhdGVzLnRhcmdldC5vbignZm9jdXNvdXQnLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xuXHRcdH1cblxuXHRcdFZpZXdwb3J0Lmxpc3RlblRvKCdyZXNpemUnKTtcblxuXHRcdHRoaXMucmVuZGVyKCk7XG5cblx0XHQvLyBEbyB5b3UgcmVuZGVyIGFzIHNvb24gYXMgcG9zc2libGU/XG5cdFx0aWYgKHRoaXMub3B0cy5zaG93T25Db25zdHJ1Y3Rpb24pIHtcblx0XHRcdHRoaXMuc2hvdygpO1xuXG5cdFx0XHRpZiAodGhpcy5vcHRzLmNsb3NlQWZ0ZXIpIHtcblx0XHRcdFx0dGhpcy5jbG9zZUFmdGVyKHRoaXMub3B0cy5jbG9zZUFmdGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5vcHRzLnNob3dBZnRlcikge1xuXHRcdFx0XHR0aGlzLnNob3dBZnRlcih0aGlzLm9wdHMuc2hvd0FmdGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSB0b29sdGlwRWwuIElmIHRoZSB0b29sdGlwIGlzIGJlaW5nIHNldCB1cFxuXHQgKiBkZWNsYXJhdGl2ZWx5LCB0aGlzIG1ldGhvZCBpcyB1c2VkIHRvIGV4dHJhY3QgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tXG5cdCAqIHRoZSBET00uXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBFbCAtIFRoZSB0b29sdGlwIGVsZW1lbnQgaW4gdGhlIERPTSAoUmVxdWlyZWQpXG5cdCovXG5cdHN0YXRpYyBnZXRPcHRpb25zKHRvb2x0aXBFbCkge1xuXHRcdGNvbnN0IGRhdGFzZXQgPSB0b29sdGlwRWwuZGF0YXNldDtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoZGF0YXNldCkucmVkdWNlKChjb2wsIGtleSkgPT4geyAvLyBQaGFudG9tIGRvZXNuJ3QgbGlrZSBPYmplY3QuZW50cmllcyA6c29iOlxuXHRcdFx0aWYgKGtleSA9PT0gJ29Db21wb25lbnQnKSB7XG5cdFx0XHRcdHJldHVybiBjb2w7IC8vIEJhaWwgb24gZGF0YS1vLWNvbXBvbmVudFxuXHRcdFx0fVxuXHRcdFx0Y29uc3Qgc2hvcnRLZXkgPSBrZXkucmVwbGFjZSgvXm9Ub29sdGlwKFxcdykoXFx3KykkLywgKG0sIG0xLCBtMikgPT4gbTEudG9Mb3dlckNhc2UoKSArIG0yKTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29sW3Nob3J0S2V5XSA9IEpTT04ucGFyc2UoZGF0YXNldFtrZXldLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbFtzaG9ydEtleV0gPSBkYXRhc2V0W2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjb2w7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRoZSBvcHRpb25zIHBhc3NlZCBpbiBhcmUgdmFsaWQsIGFuZCB0aGF0IHRoZSByZXF1aXJlZCBvcHRpb25cblx0ICogKHRhcmdldCkgaXMgcHJlc2VudFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIEFuIE9iamVjdCB3aXRoIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIHRvb2x0aXBcblx0ICogQHRocm93cyBvLXRvb2x0aXAgZXJyb3I6IG9wdHMudGFyZ2V0IGlzIG5vdCBzZXRcblx0ICogQHRocm93cyBvLXRvb2x0aXAgZXJyb3I6IG9wdHMudG9vbHRpcFBvc2l0aW9uIGlzIG5vdCBvbmUgb2YgXCJhYm92ZVwiLCBcImJlbG93XCJcblx0ICogXCJsZWZ0XCIgb3IgXCJyaWdodFwiXG5cdCovXG5cdHN0YXRpYyBjaGVja09wdGlvbnMob3B0cykge1xuXG5cdFx0aWYgKCFvcHRzLnRhcmdldCkge1xuXHRcdFx0VG9vbHRpcC50aHJvd0Vycm9yKFwidG9vbHRpcC50YXJnZXQgaXMgbm90IHNldC4gQW4gdGFyZ2V0IGZvciB0aGUgdG9vbHRpcCB0byBwb2ludCBhdCBtdXN0IGJlIHByb3ZpZGVkXCIpO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIHRoYXQgdGhlIHZhbHVlIG9mIHRvb2x0aXAgcG9zaXRpb24gaXMgdmFsaWQuIERlZmF1bHQgdG8gYmVsb3cuXG5cdFx0aWYgKG9wdHMucG9zaXRpb24pIHtcblx0XHRcdGlmIChUb29sdGlwLnZhbGlkVG9vbHRpcFBvc2l0aW9ucy5pbmRleE9mKG9wdHMucG9zaXRpb24pID09PSAtMSkge1xuXHRcdFx0XHRUb29sdGlwLnRocm93RXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciB0b29sdGlwIHBvc2l0aW9uLiBWYWxpZCB2YWx1ZXMgYXJlOlwiICsgVG9vbHRpcC52YWxpZFRvb2x0aXBQb3NpdGlvbnMudG9TdHJpbmcoKSArIFwiIG9yIG5vdGhpbmcgd2hpY2ggd2lsbCBkZWZhdWx0IHRvIGEgdmFsdWUgb2YgYGJlbG93YFwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0b3B0cy5wb3NpdGlvbiA9IFwiYmVsb3dcIjtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3B0cztcblx0fVxuXG5cdHN0YXRpYyBjb25zdHJ1Y3RFbGVtZW50KHRhcmdldEVsLCBvcHRzKSB7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRhcmdldEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBvcHRzLnRhcmdldCk7XG5cdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1jb21wb25lbnQnLCAnby10b29sdGlwJyk7XG5cdFx0ZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgPGRpdiBjbGFzcz0nby10b29sdGlwLWNvbnRlbnQnPiR7b3B0cy5jb250ZW50fTwvZGl2PmApO1xuXHRcdHJldHVybiBlbGVtZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbmRlciB0aGUgdG9vbHRpcC4gQWRkcyBtYXJrdXAgYW5kIGF0dHJpYnV0ZXMgdG8gdGhpcy50b29sdGlwRWwgaW4gdGhlIERPTVxuXHQqL1xuXHRyZW5kZXIoKSB7XG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSB0b29sdGlwIGlzIGF0dGFjaGVkIHRvIHRoZSBET01cblx0XHRpZiAodGhpcy5vcHRzLmFwcGVuZFRvQm9keSkge1xuXHRcdFx0Ly8gZWl0aGVyIGFwcGVuZGVkIGRpcmVjdGx5IGludG8gdGhlIGJvZHlcblx0XHRcdGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5vcHRzLnRhcmdldCArIFRvb2x0aXAuaWRTdWZmaXgpKSB7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwRWwpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodGhpcy50YXJnZXROb2RlICYmIHRoaXMudGFyZ2V0Tm9kZS5uZXh0U2libGluZyAhPT0gdGhpcy50b29sdGlwRWwpIHtcblx0XHRcdC8vIG9yIGlzIHRoZSBuZXh0IHNpYmxpbmcgb2YgdGhlIHRhcmdldFxuXHRcdFx0aWYgKHRoaXMudGFyZ2V0Tm9kZS5uZXh0U2libGluZykge1xuXHRcdFx0XHR0aGlzLnRhcmdldE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy50b29sdGlwRWwsIHRoaXMudGFyZ2V0Tm9kZS5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnRhcmdldE5vZGUucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBFbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy50b29sdGlwRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Rvb2x0aXAnKTtcblx0XHR0aGlzLnRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKCdvLXRvb2x0aXAnKTtcblxuXHRcdGlmICh0aGlzLm9wdHMuekluZGV4KSB7XG5cdFx0XHR0aGlzLnRvb2x0aXBFbC5zdHlsZS56SW5kZXggPSB0aGlzLm9wdHMuekluZGV4O1xuXHRcdH1cblxuXHRcdC8vIEJ1aWxkIGFuZCBhcHBlbmQgdGhlIGNsb3NlIGJ1dHRvblxuXHRcdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGJ1dHRvbi5jbGFzc05hbWUgPSAnby10b29sdGlwLWNsb3NlJztcblx0XHRidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ0Nsb3NlIHRvb2x0aXAnKTtcblx0XHRidXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsICdDbG9zZSB0b29sdGlwJyk7XG5cdFx0dGhpcy50b29sdGlwRWwuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSB0b29sdGlwLiBBZGRzIGV2ZW50IGhhbmRsZXJzIGZvciBjbGlja3MsIHRvdWNoZXMsIGtleXByZXNzZXMgYW5kXG5cdCAqIHZpZXdwb3J0IHJlc2l6ZXMuIFVzZXMgRlREb21EZWxlZ2F0ZSB0byBpbXBsZW1lbnQgdGhlIGV2ZW50IGRlbGVnYXRlXG5cdCAqIHBhdHRlcm4uIENhbGxzIERyYXdUb29sdGlwLlxuXHQqL1xuXHRzaG93KCkge1xuXHRcdC8vIERlbGVnYXRlIHBhdHRlcm5cblx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mucm9vdChkb2N1bWVudC5ib2R5KTtcblx0XHR0aGlzLmRlbGVnYXRlcy50b29sdGlwLnJvb3QodGhpcy50b29sdGlwRWwpO1xuXG5cdFx0dGhpcy50b29sdGlwRWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29Ub29sdGlwLnNob3cnKSk7XG5cblx0XHQvLyBTZXQgdXAgYWxsIHRoZSB3YXlzIHRvIGNsb3NlIHRoZSB0b29sdGlwXG5cdFx0dGhpcy5jbG9zZUhhbmRsZXIgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMudG9vbHRpcC5vbignY2xpY2snLCAnLm8tdG9vbHRpcC1jbG9zZScsIHRoaXMuY2xvc2VIYW5kbGVyKTtcblx0XHR0aGlzLmRlbGVnYXRlcy50b29sdGlwLm9uKCd0b3VjaGVuZCcsICcuby10b29sdGlwLWNsb3NlJywgdGhpcy5jbG9zZUhhbmRsZXIpO1xuXG5cdFx0dGhpcy5jbG9zZU9uS2V5VXBIYW5kbGVyID0gdGhpcy5jbG9zZU9uS2V5VXAuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRlbGVnYXRlcy5kb2Mub24oJ2tleXVwJywgdGhpcy5jbG9zZU9uS2V5VXBIYW5kbGVyKTtcblxuXHRcdC8vIFJlc2l6ZSBtZWFucyB3ZSBtaWdodCBuZWVkIHRvIG1vdmUgb3VyIHRvb2x0aXAgc28gaXQgaXMgc3RpbGwgb24gc2NyZWVuXG5cdFx0dGhpcy5yZXNpemVMaXN0ZW5lckhhbmRsZXIgPSB0aGlzLnJlc2l6ZUxpc3RlbmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMuZG9jLm9uKCdvVmlld3BvcnQucmVzaXplJywgJ2JvZHknLCB0aGlzLnJlc2l6ZUxpc3RlbmVySGFuZGxlcik7XG5cblx0XHR0aGlzLmRyYXdUb29sdGlwKCk7XG5cdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dCk7XG5cblx0XHQvLyBSdW4gc2hvdyB0b29sdGlwIHRyYW5zaXRpb25cblx0XHR0aGlzLnRvb2x0aXBFbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHR0aGlzLnRvb2x0aXBFbC5zdHlsZS5vcGFjaXR5ID0gMTtcblx0XHR0aGlzLnRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBUb2dnbGUgdGhlIHRvb2x0aXAgb3BlbiBhbmQgY2xvc2Vcblx0ICovXG5cdHRvZ2dsZSgpIHtcblx0XHRpZiAodGhpcy52aXNpYmxlKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5zaG93KCk7XG5cdFx0fVxuXHR9XG5cblxuXHQvKipcblx0ICogQ2xvc2UgdGhlIHRvb2x0aXAgYWZ0ZXIgc2V0IHRpbWVcblx0ICogQHBhcmFtIHNlY29uZHNcblx0ICovXG5cdGNsb3NlQWZ0ZXIoc2Vjb25kcykge1xuXHRcdHRoaXMuY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fSwgc2Vjb25kcyAqIDEwMDApO1xuXHR9XG5cblxuXHQvKipcblx0ICogU2hvdyB0aGUgdG9vbHRpcCBhZnRlciBzZXQgdGltZVxuXHQgKiBAcGFyYW0gc2Vjb25kc1xuXHQgKi9cblx0c2hvd0FmdGVyKHNlY29uZHMpIHtcblx0XHR0aGlzLnNob3dUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLnNob3coKTtcblx0XHR9LCBzZWNvbmRzICogMTAwMCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVzdHJveSB0aGUgdG9vbHRpcC5cblx0Ki9cblx0ZGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy52aXNpYmxlID09PSB0cnVlKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnRvb2x0aXBFbCAmJiB0aGlzLnRvb2x0aXBFbC5wYXJlbnRFbGVtZW50ICYmIHRoaXMub3B0cyAmJiB0aGlzLm9wdHMuY29udGVudCkge1xuXHRcdFx0dGhpcy50b29sdGlwRWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnRvb2x0aXBFbCk7XG5cdFx0fVxuXG5cdFx0VG9vbHRpcC5fdG9vbHRpcHMuZGVsZXRlKHRoaXMudG9vbHRpcEVsKTtcblx0XHRpZiAoVG9vbHRpcC5fdG9vbHRpcHMuc2l6ZSA9PT0gMCkge1xuXHRcdFx0Vmlld3BvcnQuc3RvcExpc3RlbmluZ1RvKCdyZXNpemUnKTtcblx0XHRcdGRlbGV0ZSBUb29sdGlwLl90b29sdGlwcztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgdGhlIHRvb2x0aXAuIChWaXN1YWxseSBoaWRlIGl0IGFuZCByZW1vdmUgZXZlbnQgbGlzdGVuZXJzKVxuXHQqL1xuXHRjbG9zZShldmVudCwgdGFyZ2V0LCBmaXJlQ2xvc2VFdmVudCA9IHRydWUpIHtcblxuXHRcdGlmIChmaXJlQ2xvc2VFdmVudCkge1xuXHRcdFx0dGhpcy50b29sdGlwRWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29Ub29sdGlwLmNsb3NlJykpO1xuXHRcdH1cblxuXHRcdHRoaXMuZGVsZWdhdGVzLmRvYy5kZXN0cm95KCk7XG5cdFx0dGhpcy5kZWxlZ2F0ZXMudG9vbHRpcC5kZXN0cm95KCk7XG5cblx0XHRjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVvdXQpO1xuXHRcdHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuXG5cdFx0Ly8gUnVuIGNsb3NlIHRvb2x0aXAgdHJhbnNpdGlvblxuXHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHRcdHRoaXMudG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Zpc2libGUnKTtcblxuXHRcdC8vIFNldCBgZGlzcGxheTogbm9uZWAgYWZ0ZXIgYW5pbWF0aW9uICYgcmVtb3ZlIGxpc3RlbmVyXG5cdFx0dGhpcy50b29sdGlwRWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcblx0XHRcdC8vIENoZWNrIHRoaXMgaXMgc3RpbGwgZmFsc2UgYW5kIHRoYXQgdGhlIHRvb2x0aXAgaGFzbid0IHJlYXBwZWFyZWRcblx0XHRcdC8vIGluIHRoZSB0cmFuc2l0aW9uIHBlcmlvZFxuXHRcdFx0aWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy50b29sdGlwRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdH1cblx0XHR9LCB7IG9uY2U6IHRydWUgfSk7XG5cblx0XHRpZiAodGhpcy5vcHRzLnNob3dPbkNsaWNrKSB7XG5cdFx0XHR0aGlzLmRlbGVnYXRlcy50YXJnZXQub24oJ2NsaWNrJywgbnVsbCwgdGhpcy5zaG93LmJpbmQodGhpcykpOyAvLyBSZS1hdHRhY2ggY2xpY2sgaGFuZGxlclxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldiAtIGNhbGxzIGNsb3NlIG9uIHRoZSB0b29sdGlwIGlmIHRoZSBrZXkgaXMgRXNjXG5cdCovXG5cdGNsb3NlT25LZXlVcChldikge1xuXG5cdFx0Lyoga2V5Q29kZSAyNyBpcyB0aGUgZXNjYXBlIGtleSAqL1xuXHRcdGlmIChldi5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cblx0LyoqXG5cdCAqIFJlc3BvbmQgdG8gcmVzaXplIGV2ZW50cy4gUmVkcmF3IHRoZSB0b29sdGlwIGluIGNhc2UgdGhlIHRhcmdldCBoYXMgbW92ZWQuXG5cdCAqIEB0b2RvOiBUaGVyZSBhcmUgbWFueSBvcHRpbWlzYXRpb25zIHRvIG1ha2UgaGVyZS0gd2UncmUgcmVkcmF3aW5nIGV2ZW4gaWZcblx0ICogdGhlIHRhcmdldCBoYXNuJ3QgbW92ZWQuXG5cdCovXG5cdHJlc2l6ZUxpc3RlbmVyKCkge1xuXHRcdGlmICh0aGlzLnZpc2libGUpIHtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmRyYXdUb29sdGlwKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FsY3VsYXRlcyB0aGUgYmVzdCBwbGFjZSB0byBwb3NpdGlvbiB0aGUgdG9vbHRpcCBiYXNlZCBvbiBzcGFjZSBhcm91bmQgdGhlXG5cdCAqIHRhcmdldCBhbmQgYSBwcmVmZXJlbmNlIHNldCBieSB0aGUgdXNlci5cblx0ICogQHRocm93cyB7RXJyb3J9IGlmIFRvb2x0aXAgY2FuJ3QgYmUgZHJhd24gaW4gdGhlIGNsaWVudCB3aW5kb3dcblx0Ki9cblx0ZHJhd1Rvb2x0aXAoKSB7XG5cdFx0Ly8gcmVuZGVyIHRoZSB0b29sdGlwIHNvIHdlIGtub3cgaG93IGJpZyBpdCBpc1xuXHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdC8vIGRvbid0IGluY3JlYXNlIGluIHNpemUsIGkuZSBkdWUgdG8gaW5saW5lIGNvbnRlbnQsIGFmdGVyIHBvc2l0aW9uaW5nXG5cdFx0dGhpcy50b29sdGlwRWwuc3R5bGVbJ21heC13aWR0aCddID0gYCR7dGhpcy53aWR0aCgpfXB4YDtcblx0XHQvLyBjaGVjayBib3VuZHMgZm9yIGV2ZXJ5IHBvc2l0aW9uICg0IGNvdW50cylcblx0XHQvLyBpZiBjaG9zZW4gcG9zaXRpb24gY2Fubm90IGZpdCBmbGlwIHRoZSB0b29saXAuXG5cdFx0bGV0IGNvdW50ID0gMDtcblx0XHRsZXQgdG9vbHRpcFJlY3QgPSB7fTtcblx0XHRsZXQgcG9zaXRpb24gPSB0aGlzLl9nZXRDb25maWd1cmVkVG9vbHRpcFBvc2l0aW9uKCk7XG5cdFx0bGV0IGFsaWdubWVudCA9ICdtaWRkbGUnO1xuXHRcdC8vIEFzc3VtZSBvdXQgb2YgYm91bmRzIHVudGlsIHRvb2x0aXBSZWN0IGlzIGNhbGN1bGF0ZWQuXG5cdFx0bGV0IGlzT3V0T2ZCb3VuZHMgPSB0cnVlO1xuXHRcdHdoaWxlIChjb3VudCA8IDUgJiYgaXNPdXRPZkJvdW5kcykge1xuXHRcdFx0Y291bnQrKztcblx0XHRcdHN3aXRjaCAocG9zaXRpb24pIHtcblx0XHRcdFx0Y2FzZSAnYWJvdmUnOlxuXHRcdFx0XHRcdCh7dG9vbHRpcFJlY3QsIGFsaWdubWVudCwgaXNPdXRPZkJvdW5kc30gPSB0aGlzLl9ldmF1bGF0ZVRvb2x0aXAoJ2Fib3ZlJykpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdyaWdodCc6XG5cdFx0XHRcdFx0KHt0b29sdGlwUmVjdCwgYWxpZ25tZW50LCBpc091dE9mQm91bmRzfSA9IHRoaXMuX2V2YXVsYXRlVG9vbHRpcCgncmlnaHQnKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2JlbG93Jzpcblx0XHRcdFx0XHQoe3Rvb2x0aXBSZWN0LCBhbGlnbm1lbnQsIGlzT3V0T2ZCb3VuZHN9ID0gdGhpcy5fZXZhdWxhdGVUb29sdGlwKCdiZWxvdycpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHRcdFx0KHt0b29sdGlwUmVjdCwgYWxpZ25tZW50LCBpc091dE9mQm91bmRzfSA9IHRoaXMuX2V2YXVsYXRlVG9vbHRpcCgnbGVmdCcpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aHJvdyBUb29sdGlwLnRocm93RXJyb3IoJ2RyYXdUb29sdGlwIGVudGVyZWQgdGhlIGRlZmF1bHQgY2FzZSwgd2hpY2ggaXMgbm90IGV4cGVjdGVkLicpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlzT3V0T2ZCb3VuZHMgJiYgY291bnQgPCA1KSB7XG5cdFx0XHRcdHBvc2l0aW9uID0gVG9vbHRpcC5fcm90YXRlT3JpZW50YXRpb24ocG9zaXRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIERyYXcgdG9vbHRpcCB3aXRoIGxhdGVzdCBhbGlnbm1lbnQgYW5kIHBvc2l0aW9uLlxuXHRcdHRoaXMudG9vbHRpcFJlY3QgPSB0b29sdGlwUmVjdDtcblx0XHR0aGlzLnRvb2x0aXBBbGlnbm1lbnQgPSBhbGlnbm1lbnQ7XG5cdFx0dGhpcy50b29sdGlwUG9zaXRpb24gPSBwb3NpdGlvbjtcblx0XHRjb25zdCB0YXJnZXRMZWZ0T2Zmc2V0ID0gdGhpcy50YXJnZXQudGFyZ2V0RWwub2Zmc2V0UGFyZW50ICYmIHRoaXMudGFyZ2V0LnRhcmdldEVsLm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXHRcdGNvbnN0IHRhcmdldFRvcE9mZnNldCA9IHRoaXMudGFyZ2V0LnRhcmdldEVsLm9mZnNldFBhcmVudCAmJiB0aGlzLnRhcmdldC50YXJnZXRFbC5vZmZzZXRQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG5cdFx0Y29uc3Qgc3RhcnRXaWR0aCA9IHRoaXMudG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXHRcdGlmICh0aGlzLm9wdHMuYXBwZW5kVG9Cb2R5KSB7XG5cdFx0XHQvLyBJZiB0aGUgdG9vbHRpcCB3aWxsIGJlIGFwZW5kZWQgZGlyZWN0bHkgdG8gYm9keTpcblx0XHRcdC8vIHNldCBhbiBJRCBpbiBvcmRlciB0byBiZSBpZGVudGlmaWVkXG5cdFx0XHR0aGlzLnRvb2x0aXBFbC5pZCA9IHRoaXMub3B0cy50YXJnZXQgKyBUb29sdGlwLmlkU3VmZml4O1xuXHRcdFx0dGhpcy50b29sdGlwRWwuc3R5bGUudG9wID0gdGhpcy50b29sdGlwUmVjdC50b3AgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wICsgJ3B4Jztcblx0XHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLmxlZnQgPSB0aGlzLnRvb2x0aXBSZWN0LmxlZnQgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCArICdweCc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLnRvcCA9IHRoaXMudG9vbHRpcFJlY3QudG9wIC0gdGFyZ2V0VG9wT2Zmc2V0ICsgJ3B4Jztcblx0XHRcdHRoaXMudG9vbHRpcEVsLnN0eWxlLmxlZnQgPSB0aGlzLnRvb2x0aXBSZWN0LmxlZnQgLSB0YXJnZXRMZWZ0T2Zmc2V0ICsgJ3B4Jztcblx0XHR9XG5cdFx0Y29uc3QgZW5kV2lkdGggPSB0aGlzLnRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcblxuXHRcdC8vIFRoZSB0b29sdGlwIHNpemUgY2hhbmdlZCB3aGVuIGl0IHdhcyBwbGFjZWQsIGUuZy4gYmVjYXVzZSBpbmxpbmVcblx0XHQvLyBjb250ZW50IG92ZXJmbG93ZWQgYSBjb250YWluZXIgYW5kIHdyYXBwZWQgdG8gbW9yZSBsaW5lcy5cblx0XHQvLyBSZWRyYXcgd2l0aCB0aGUgbmV3IHRvb2x0aXAgZGltZW5zaW9ucy5cblx0XHRpZiAoc3RhcnRXaWR0aCAhPT0gZW5kV2lkdGgpIHtcblx0XHRcdHJldHVybiB0aGlzLmRyYXdUb29sdGlwKCk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IFRvb2x0aXAgYXJyb3cuXG5cdFx0dGhpcy5fc2V0QXJyb3coKTtcblxuXHRcdC8vIFdhcm4gYWxsIHBvc2l0aW9ucyB3ZXJlIHRyaWVkIGFuZCB0aGUgdG9vbHRpcCBpcyBzaWxsIG91dCBvZiBib3VuZHMuXG5cdFx0aWYgKGNvdW50ID49IDUpIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2UgaW4gdGhlIGNsaWVudCB3aW5kb3cgdG8gZHJhdyB0aGUgdG9vbHRpcC5cIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm5zOiB0aGUgb2Zmc2V0IHdpZHRoIG9mIHRoZSB0b29sdGlwIGVsZW1lbnRcblx0Ki9cblx0d2lkdGgoKSB7XG5cdFx0cmV0dXJuIHRoaXMudG9vbHRpcEVsLm9mZnNldFdpZHRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm5zIHtJbnRlZ2VyfTogdGhlIG9mZnNldCBoZWlnaHQgb2YgdGhlIHRvb2x0aXAgZWxlbWVudFxuXHQqL1xuXHRoZWlnaHQoKSB7XG5cdFx0cmV0dXJuIHRoaXMudG9vbHRpcEVsLm9mZnNldEhlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn0gSWYgdGhlIHNldCBwb3NpdGlvbiBpcyBvdXQgb2YgYm91bmRzLlxuXHQqL1xuXHRfZXZhdWxhdGVUb29sdGlwKHBvc2l0aW9uKSB7XG5cdFx0Y29uc3QgYXhpcyA9IHBvc2l0aW9uID09PSAnYWJvdmUnIHx8IHBvc2l0aW9uID09PSAnYmVsb3cnID8gJ3knIDogJ3gnO1xuXHRcdGNvbnN0IGFsaWdubWVudHMgPSBheGlzID09PSAneScgPyBbJ21pZGRsZScsICdyaWdodCcsICdsZWZ0J10gOiBbJ21pZGRsZScsICd0b3AnLCAnYm90dG9tJ107XG5cblx0XHQvLyBBdHRlbXB0IGFsbCBwb3NpdGlvbiBhbGlnbm1lbnRzLlxuXHRcdGxldCBpc091dE9mQm91bmRzID0gdHJ1ZTtcblx0XHRsZXQgdG9vbHRpcFJlY3Q7XG5cdFx0bGV0IGFsaWdubWVudDtcblx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYWxpZ25tZW50cy5sZW5ndGggJiYgaXNPdXRPZkJvdW5kcyA9PT0gdHJ1ZTsgaW5kZXgrKykge1xuXHRcdFx0YWxpZ25tZW50ID0gYWxpZ25tZW50c1tpbmRleF07XG5cdFx0XHR0b29sdGlwUmVjdCA9IHRoaXMuX2NhbGN1bGF0ZVRvb2x0aXBSZWN0YW5nbGUocG9zaXRpb24sIGFsaWdubWVudCk7XG5cdFx0XHRpc091dE9mQm91bmRzID0gdGhpcy5fdG9vbHRpcElzT3V0T2ZCb3VuZHModG9vbHRpcFJlY3QpO1xuXHRcdH1cblxuXHRcdC8vIElmIGFsbCBhbGlnbm1lbnRzIGZhaWwgdG8gZml0IGluIGJvdW5kcyBkZWZhdWx0IHRvIHRoZSBtaWRkbGUgYWxpZ25tZW50LlxuXHRcdGlmIChpc091dE9mQm91bmRzKSB7XG5cdFx0XHRhbGlnbm1lbnQgPSAnbWlkZGxlJztcblx0XHRcdHRvb2x0aXBSZWN0ID0gdGhpcy5fY2FsY3VsYXRlVG9vbHRpcFJlY3RhbmdsZShwb3NpdGlvbiwgYWxpZ25tZW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4geyB0b29sdGlwUmVjdCwgYWxpZ25tZW50LCBpc091dE9mQm91bmRzIH07XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge09iamVjdH0gc2V0cyB0aGlzLnRvb2x0aXBSZWN0IHRvIGBsZWZ0YCwgYHJpZ2h0YCwgYHRvcGAgYW5kIGBib3R0b21gXG5cdCAqIHJlcHJlc2VudGluZyB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSB0b29sdGlwIChpbmNsdWRpbmcgdGhlIGFycm93KVxuXHQqL1xuXHRfY2FsY3VsYXRlVG9vbHRpcFJlY3RhbmdsZShwb3NpdGlvbiwgYWxpZ25tZW50KSB7XG5cdFx0Y29uc3QgcmVjdCA9IHt9O1xuXHRcdGNvbnN0IGF4aXMgPSBwb3NpdGlvbiA9PT0gJ2Fib3ZlJyB8fCBwb3NpdGlvbiA9PT0gJ2JlbG93JyA/ICd5JyA6ICd4JztcblxuXHRcdC8vIENhbGN1bGF0ZSBmb3IgcG9zaXRpb24gYWJvdmUvYmVsb3cuXG5cdFx0aWYgKGF4aXMgPT09ICd5Jykge1xuXHRcdFx0Ly8gdGhlIGFycm93IGlzIHBsYWNlZCAxMCUgYWxvbmcgdGhlIGJvZHkgb2YgdGhlIHRvb2x0aXBcblx0XHRcdGNvbnN0IGFycm93UG9zaXRpb24gPSB0aGlzLndpZHRoKCkgLyAxMDtcblxuXHRcdFx0aWYgKGFsaWdubWVudCA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRcdHJlY3QubGVmdCA9IHRoaXMudGFyZ2V0LmNlbnRyZVBvaW50LnggLSB0aGlzLndpZHRoKCkgKyBhcnJvd1Bvc2l0aW9uO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFsaWdubWVudCA9PT0gJ3JpZ2h0Jykge1xuXHRcdFx0XHRyZWN0LmxlZnQgPSB0aGlzLnRhcmdldC5jZW50cmVQb2ludC54IC0gYXJyb3dQb3NpdGlvbjtcblx0XHRcdH1cblx0XHRcdGlmIChhbGlnbm1lbnQgPT09ICdtaWRkbGUnKSB7XG5cdFx0XHRcdHJlY3QubGVmdCA9IHRoaXMudGFyZ2V0LmNlbnRyZVBvaW50LnggLSB0aGlzLndpZHRoKCkgLyAyO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBvc2l0aW9uID09PSAnYWJvdmUnKSB7XG5cdFx0XHRcdHJlY3QudG9wID0gdGhpcy50YXJnZXQudG9wIC0gdGhpcy5oZWlnaHQoKSAtIFRvb2x0aXAuYXJyb3dEZXB0aDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbiA9PT0gJ2JlbG93Jykge1xuXHRcdFx0XHRyZWN0LnRvcCA9IHRoaXMudGFyZ2V0LmJvdHRvbSArIFRvb2x0aXAuYXJyb3dEZXB0aDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxjdWxhdGUgZm9yIHBvc2l0aW9uIHJpZ2h0L2xlZnQuXG5cdFx0aWYgKGF4aXMgPT09ICd4Jykge1xuXHRcdFx0aWYgKGFsaWdubWVudCA9PT0gJ3RvcCcpIHtcblx0XHRcdFx0cmVjdC50b3AgPSB0aGlzLnRhcmdldC50b3A7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWxpZ25tZW50ID09PSAnYm90dG9tJykge1xuXHRcdFx0XHRyZWN0LnRvcCA9IHRoaXMudGFyZ2V0LmJvdHRvbSAtIHRoaXMuaGVpZ2h0KCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWxpZ25tZW50ID09PSAnbWlkZGxlJykge1xuXHRcdFx0XHRyZWN0LnRvcCA9IHRoaXMudGFyZ2V0LmNlbnRyZVBvaW50LnkgLSB0aGlzLmhlaWdodCgpIC8gMjtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuXHRcdFx0XHRyZWN0LmxlZnQgPSB0aGlzLnRhcmdldC5yaWdodCArIFRvb2x0aXAuYXJyb3dEZXB0aDtcblx0XHRcdH1cblx0XHRcdGlmIChwb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRcdHJlY3QubGVmdCA9IHRoaXMudGFyZ2V0LmxlZnQgLSB0aGlzLndpZHRoKCkgLSBUb29sdGlwLmFycm93RGVwdGg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmVjdC5yaWdodCA9IHJlY3QubGVmdCArIHRoaXMud2lkdGgoKTtcblx0XHRyZWN0LmJvdHRvbSA9IHJlY3QudG9wICsgdGhpcy5oZWlnaHQoKTtcblxuXHRcdHJldHVybiByZWN0O1xuXHR9XG5cblx0Y2FsY3VsYXRlVG9vbHRpcFJlY3QocG9zaXRpb24pIHtcblx0XHRjb25zb2xlLndhcm4oJ2BjYWxjdWxhdGVUb29sdGlwUmVjdGAgaXMgZGVwcmVjYXRlZC4nKTtcblx0XHRyZXR1cm4gdGhpcy5fY2FsY3VsYXRlVG9vbHRpcFJlY3RhbmdsZShwb3NpdGlvbiwgJ21pZGRsZScpO1xuXHR9XG5cblx0X2dldENvbmZpZ3VyZWRUb29sdGlwUG9zaXRpb24oKSB7XG5cdFx0Y29uc3QgeyBwb3NpdGlvbiwgcG9zaXRpb25TLCBwb3NpdGlvbk0sIHBvc2l0aW9uTCwgcG9zaXRpb25YbCB9ID0gdGhpcy5vcHRzO1xuXHRcdGNvbnN0IGN1cnJlbnRCcmVha3BvaW50ID0gVG9vbHRpcC5fZ2V0Q3VycmVudExheW91dCgpO1xuXHRcdHN3aXRjaCAoY3VycmVudEJyZWFrcG9pbnQpIHtcblx0XHRcdGNhc2UgJ1MnOlxuXHRcdFx0XHRyZXR1cm4gcG9zaXRpb25TIHx8IHBvc2l0aW9uO1xuXHRcdFx0Y2FzZSAnTSc6XG5cdFx0XHRcdHJldHVybiBwb3NpdGlvbk0gfHwgcG9zaXRpb25TIHx8IHBvc2l0aW9uO1xuXHRcdFx0Y2FzZSAnTCc6XG5cdFx0XHRcdHJldHVybiBwb3NpdGlvbkwgfHwgcG9zaXRpb25NIHx8IHBvc2l0aW9uUyB8fCBwb3NpdGlvbjtcblx0XHRcdGNhc2UgJ1hMJzpcblx0XHRcdFx0cmV0dXJuIHBvc2l0aW9uWGwgfHwgcG9zaXRpb25MIHx8IHBvc2l0aW9uTSB8fCBwb3NpdGlvblMgfHwgcG9zaXRpb247XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gcG9zaXRpb247XG5cdFx0fVxuXHR9XG5cblx0X3NldEFycm93KCkge1xuXHRcdGNvbnN0IGFycm93Q2xhc3NSb290ID0gJ28tdG9vbHRpcC0tYXJyb3ctJztcblx0XHRjb25zdCBhbGlnbm1lbnRDbGFzc1Jvb3QgPSAnby10b29sdGlwLWFycm93LS1hbGlnbi0nO1xuXG5cdFx0Y29uc3QgY2xhc3Nlc1RvUmVtb3ZlID0gW1xuXHRcdFx0XCJvLXRvb2x0aXAtLWFycm93LWxlZnRcIixcblx0XHRcdFwiby10b29sdGlwLS1hcnJvdy1yaWdodFwiLFxuXHRcdFx0XCJvLXRvb2x0aXAtLWFycm93LWFib3ZlXCIsXG5cdFx0XHRcIm8tdG9vbHRpcC0tYXJyb3ctYmVsb3dcIixcblx0XHRcdFwiby10b29sdGlwLWFycm93LS1hbGlnbi10b3BcIixcblx0XHRcdFwiby10b29sdGlwLWFycm93LS1hbGlnbi1ib3R0b21cIixcblx0XHRcdFwiby10b29sdGlwLWFycm93LS1hbGlnbi1sZWZ0XCIsXG5cdFx0XHRcIm8tdG9vbHRpcC1hcnJvdy0tYWxpZ24tcmlnaHRcIixcblx0XHRcdFwiby10b29sdGlwLWFycm93LS1hbGlnbi1taWRkbGVcIlxuXHRcdF07XG5cblx0XHR0aGlzLnRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNUb1JlbW92ZSk7XG5cdFx0dGhpcy50b29sdGlwRWwuY2xhc3NMaXN0LmFkZChhcnJvd0NsYXNzUm9vdCArIFRvb2x0aXAucG9zaXRpb25Ub0Fycm93UG9zaXRpb25NYXBbdGhpcy50b29sdGlwUG9zaXRpb25dKTtcblx0XHR0aGlzLnRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKGFsaWdubWVudENsYXNzUm9vdCArIFRvb2x0aXAuYWxpZ25tZW50VG9BcnJvd0FsaWdubWVudE1hcFt0aGlzLnRvb2x0aXBBbGlnbm1lbnRdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja2VzIGlzIGEgaHlwb3RoZXRpY2FsIHRvb2x0aXAgaXMgaW4gYm91bmRzIG9uIGFsbCBzaWRlcy5cblx0ICogQHBhcmFtIHtPYmplY3R9IHRvb2x0aXBSZWN0IC0gQW4gb2JqZWN0IHdoaWNoIHJlcHJlc2VudHMgYSBoeXBvdGhldGljYWwgdG9vbHRpcCBwb3NpdGlvbi5cblx0Ki9cblx0X3Rvb2x0aXBJc091dE9mQm91bmRzKHRvb2x0aXBSZWN0KSB7XG5cdFx0Y29uc3QgdG9wT3V0b2ZCb3VuZHMgPSBUb29sdGlwLl9wb2ludElzT3V0T2ZCb3VuZHModG9vbHRpcFJlY3QudG9wLCAneScsIHRoaXMub3B0cyk7XG5cdFx0Y29uc3QgYm90dG9tT3V0b2ZCb3VuZHMgPSBUb29sdGlwLl9wb2ludElzT3V0T2ZCb3VuZHModG9vbHRpcFJlY3QuYm90dG9tLCAneScsIHRoaXMub3B0cyk7XG5cdFx0Y29uc3QgbGVmdE91dG9mQm91bmRzID0gVG9vbHRpcC5fcG9pbnRJc091dE9mQm91bmRzKHRvb2x0aXBSZWN0LmxlZnQsICd4JywgdGhpcy5vcHRzKTtcblx0XHRjb25zdCByaWdodE91dG9mQm91bmRzID0gVG9vbHRpcC5fcG9pbnRJc091dE9mQm91bmRzKHRvb2x0aXBSZWN0LnJpZ2h0LCAneCcsIHRoaXMub3B0cyk7XG5cdFx0cmV0dXJuIHRvcE91dG9mQm91bmRzIHx8IGJvdHRvbU91dG9mQm91bmRzIHx8IGxlZnRPdXRvZkJvdW5kcyB8fCByaWdodE91dG9mQm91bmRzO1xuXHR9XG5cblx0Lypcblx0XHR0aGlzIG1lYXN1cmVzIHRoZSBib3VuZGFyaWVzIGluIHdoaWNoIHRoZSB0b29sdGlwIHdpbGwgcmVhbGlzdGljYWxseSBmaXQuXG5cdFx0aWYgaXQgaXMgc2hvd24gb24gY29uc3RydWN0aW9uLCB0aGUgc2l6ZSBvZiB0aGUgZG9jdW1lbnQgYm9keSB3aWxsIGJlIGNvbnN1bHRlZFxuXHRcdGluIGFsbCBvdGhlciBjYXNlcywgaXQgd2lsbCBiZSB0aGUgc2l6ZSBvZiB0aGUgdmlld3BvcnQuXG5cdCovXG5cdHN0YXRpYyBfcG9pbnRJc091dE9mQm91bmRzKHBvaW50LCBheGlzLCBvcHRzKSB7XG5cdFx0aWYgKHBvaW50IDwgMCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGlmIChvcHRzLnNob3dPbkNvbnN0cnVjdGlvbikge1xuXHRcdFx0aWYgKGF4aXMgPT09ICd5JyAmJiBwb2ludCA+IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChheGlzID09PSAneCcgJiYgcG9pbnQgPiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoYXhpcyA9PT0gJ3knICYmIHBvaW50ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoYXhpcyA9PT0gJ3gnICYmIHBvaW50ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRzdGF0aWMgX3JvdGF0ZU9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG5cdFx0Y29uc3Qgcm90YXRlID0ge1xuXHRcdFx0XCJhYm92ZVwiOiBcInJpZ2h0XCIsXG5cdFx0XHRcInJpZ2h0XCI6IFwiYmVsb3dcIixcblx0XHRcdFwiYmVsb3dcIjogXCJsZWZ0XCIsXG5cdFx0XHRcImxlZnRcIjogXCJhYm92ZVwiXG5cdFx0fTtcblxuXHRcdHJldHVybiByb3RhdGVbb3JpZW50YXRpb25dO1xuXHR9XG5cblx0c3RhdGljIHRocm93RXJyb3IobWVzc2FnZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignXCJvLXRvb2x0aXAgZXJyb3JcIjogJyArIG1lc3NhZ2UpO1xuXHR9XG5cblx0c3RhdGljIGluaXQocm9vdEVsLCBvcHRzKSB7XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHJvb3RFbCBpc250IGFuIEhUTUxFbGVtZW50LCB0cmVhdCBpdCBhcyBhIHNlbGVjdG9yXG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHJvb3RFbCBpcyBhbiBIVE1MRWxlbWVudCAoaWUgaXQgd2FzIGZvdW5kIGluIHRoZSBkb2N1bWVudCBhbnl3aGVyZSlcblx0XHQvLyBBTkQgdGhlIHJvb3RFbCBoYXMgdGhlIGRhdGEtby1jb21wb25lbnQ9by10b29sdGlwIHRoZW4gaW5pdGlhbGlzZSBqdXN0IDEgdG9vbHRpcCAodGhpcyBvbmUpXG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIC9cXGJvLXRvb2x0aXBcXGIvLnRlc3Qocm9vdEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLWNvbXBvbmVudCcpKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBUb29sdGlwKHJvb3RFbCwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHJvb3RFbCB3YXNuJ3QgaXRzZWxmIGEgdG9vbHRpcCwgdGhlbiBmaW5kIEFMTCBvZiB0aGUgY2hpbGQgdGhpbmdzIHRoYXQgaGF2ZSB0aGUgZGF0YS1vLWNvbXBvbmVudD1vVG9vbHRpcCBzZXRcblx0XHRyZXR1cm4gQXJyYXkuZnJvbShyb290RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLXRvb2x0aXBcIl0nKSwgcm9vdEVsID0+IG5ldyBUb29sdGlwKHJvb3RFbCwgb3B0cykpO1xuXHR9XG59XG5cblRvb2x0aXAuaWRTdWZmaXggPSAnLXRvb2x0aXAnO1xuXG5Ub29sdGlwLmFycm93RGVwdGggPSAxMDtcblRvb2x0aXAucG9zaXRpb25Ub0Fycm93UG9zaXRpb25NYXAgPSB7XG5cdFwiYWJvdmVcIjogXCJiZWxvd1wiLFxuXHRcImJlbG93XCI6IFwiYWJvdmVcIixcblx0XCJsZWZ0XCI6IFwicmlnaHRcIixcblx0XCJyaWdodFwiOiBcImxlZnRcIlxufTtcblRvb2x0aXAuYWxpZ25tZW50VG9BcnJvd0FsaWdubWVudE1hcCA9IHtcblx0XCJ0b3BcIjogXCJ0b3BcIixcblx0XCJib3R0b21cIjogXCJib3R0b21cIixcblx0XCJyaWdodFwiOiBcImxlZnRcIixcblx0XCJsZWZ0XCI6IFwicmlnaHRcIixcblx0XCJtaWRkbGVcIjogXCJtaWRkbGVcIlxufTtcblxuVG9vbHRpcC52YWxpZEFycm93QWxpZ25tZW50cyA9IFtcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXTtcblRvb2x0aXAudmFsaWRUb29sdGlwUG9zaXRpb25zID0gW1wiYWJvdmVcIiwgXCJiZWxvd1wiLCBcImxlZnRcIiwgXCJyaWdodFwiXTtcblxuVG9vbHRpcC5UYXJnZXQgPSBUYXJnZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7XG4iLCIvKipcbipcbiogRGVib3VuY2VzIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIGFmdGVyIG4gbWlsbGlzZWNvbmRzXG4qIHdpdGhvdXQgaXQgbm90IGJlaW5nIGNhbGxlZFxuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy5kZWJvdW5jZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBkZWJvdW5jZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBEZWJvdW5jZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbi8qKlxuKlxuKiBUaHJvdHRsZSBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLnRocm90dGxlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIHRocm90dGxlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIFRocm90dGxlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbmV4cG9ydCB7XG5cdGRlYm91bmNlLFxuXHR0aHJvdHRsZVxufTtcbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby11dGlscyc7XG5cbmxldCBkZWJ1ZztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICovXG5mdW5jdGlvbiBicm9hZGNhc3QoZXZlbnRUeXBlLCBkYXRhLCB0YXJnZXQpIHtcblx0dGFyZ2V0ID0gdGFyZ2V0IHx8IGRvY3VtZW50LmJvZHk7XG5cblx0aWYgKGRlYnVnKSB7XG5cdFx0Y29uc29sZS5sb2coJ28tdmlld3BvcnQnLCBldmVudFR5cGUsIGRhdGEpO1xuXHR9XG5cblx0dGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvVmlld3BvcnQuJyArIGV2ZW50VHlwZSwge1xuXHRcdGRldGFpbDogZGF0YSxcblx0XHRidWJibGVzOiB0cnVlXG5cdH0pKTtcbn1cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciBoZWlnaHQuXG4qIEByZXR1cm4ge251bWJlcn1cbiovXG5mdW5jdGlvbiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoLlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aFxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG59XG5cbi8qKlxuICogVmlld3BvcnQgc2l6ZS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNpemVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aFxuICovXG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoIGFuZCBoZWlnaHQuXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoL2hlaWdodC5cbiogQHJldHVybiB7U2l6ZX1cbiovXG5mdW5jdGlvbiBnZXRTaXplKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSxcblx0XHR3aWR0aDogZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycylcblx0fTtcbn1cblxuLyoqXG4gKiBTY3JvbGwgcG9zaXRpb24uXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTY3JvbGxQb3NpdGlvblxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxlZnQgLSBgd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRvcCAtIGB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlgXG4gKi9cblxuLyoqXG4gKiBAcmV0dXJuIHtTY3JvbGxQb3NpdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcblx0XHR3aWR0aDogZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCxcblx0XHRsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFgsXG5cdFx0dG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlcblx0fTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gJ3BvcnRyYWl0JyBvciAnbGFuZHNjYXBlJ1xuICovXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbigpIHtcblx0Y29uc3Qgb3JpZW50YXRpb24gPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uO1xuXHRpZiAob3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9yaWVudGF0aW9uID09PSAnc3RyaW5nJyA/XG5cdFx0XHRvcmllbnRhdGlvbi5zcGxpdCgnLScpWzBdIDpcblx0XHRcdG9yaWVudGF0aW9uLnR5cGUuc3BsaXQoJy0nKVswXTtcblx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xuXHRcdHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBnZXRIZWlnaHQoKSA+PSBnZXRXaWR0aCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9XG59XG5cbi8qKlxuICogQHJldHVybiB7Ym9vbGVhbn0gLSB0cnVlIGlmIHRoZSB2aWV3cG9ydCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFZpc2liaWxpdHkoKSB7XG5cdHJldHVybiBkb2N1bWVudC5oaWRkZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGRlYnVnID0gdHJ1ZTtcblx0fSxcblx0YnJvYWRjYXN0LFxuXHRnZXRXaWR0aCxcblx0Z2V0SGVpZ2h0LFxuXHRnZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eSxcblx0Z2V0T3JpZW50YXRpb24sXG5cdGRlYm91bmNlOiBVdGlscy5kZWJvdW5jZSxcblx0dGhyb3R0bGU6IFV0aWxzLnRocm90dGxlXG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vc3JjL3V0aWxzLmpzJztcblxuY29uc3QgdGhyb3R0bGUgPSB1dGlscy50aHJvdHRsZTtcbmNvbnN0IGRlYm91bmNlID0gdXRpbHMuZGVib3VuY2U7XG5cbmNvbnN0IGxpc3RlbmVycyA9IHt9O1xuY29uc3QgaW50ZXJ2YWxzID0ge1xuXHRyZXNpemU6IDEwMCxcblx0b3JpZW50YXRpb246IDEwMCxcblx0dmlzaWJpbGl0eTogMTAwLFxuXHRzY3JvbGw6IDEwMFxufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IHRvIHRocm90dGxlIGZvciB0aGlzIGR1cmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsIC0gVGhlIGR1cmF0aW9uIHRvIHRocm90dGxlIGluIG1zLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogXHQgICAvLyB0aHJvdHRsZSBmb3IgZGlmZmVyZW50IGV2ZW50cyBhdCBkaWZmZXJlbnQgZHVyYXRpb25zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgMTAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIDMwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIDMwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCAzMClcbiAqIFx0XHQvLyB0aHJvdHRsZSBhbGwgZXZlbnRzIGF0IDMwbXNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKDMwKTtcbiAqL1xuZnVuY3Rpb24gc2V0VGhyb3R0bGVJbnRlcnZhbChldmVudFR5cGUsIGludGVydmFsKSB7XG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJykge1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIGFyZ3VtZW50c1swXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgYXJndW1lbnRzWzFdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIGFyZ3VtZW50c1syXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIGFyZ3VtZW50c1szXSk7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwpIHtcblx0XHRpbnRlcnZhbHNbZXZlbnRUeXBlXSA9IGludGVydmFsO1xuXHR9XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvUmVzaXplKCkge1xuXHRpZiAobGlzdGVuZXJzLnJlc2l6ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdyZXNpemUnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnJlc2l6ZSk7XG5cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMucmVzaXplID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9PcmllbnRhdGlvbigpIHtcblxuXHRpZiAobGlzdGVuZXJzLm9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ29yaWVudGF0aW9uY2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdvcmllbnRhdGlvbicsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24oKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5vcmllbnRhdGlvbik7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLm9yaWVudGF0aW9uID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9WaXNpYmlsaXR5KCkge1xuXG5cdGlmIChsaXN0ZW5lcnMudmlzaWJpbGl0eSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCd2aXNpYmlsaXR5Jywge1xuXHRcdFx0aGlkZGVuOiB1dGlscy5nZXRWaXNpYmlsaXR5KCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMudmlzaWJpbGl0eSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuXHRsaXN0ZW5lcnMudmlzaWJpbGl0eSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvU2Nyb2xsKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMuc2Nyb2xsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Njcm9sbCc7XG5cdGNvbnN0IGhhbmRsZXIgPSB0aHJvdHRsZShmdW5jdGlvbihldikge1xuXHRcdGNvbnN0IHNjcm9sbFBvcyA9IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdzY3JvbGwnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0c2Nyb2xsSGVpZ2h0OiBzY3JvbGxQb3MuaGVpZ2h0LFxuXHRcdFx0c2Nyb2xsTGVmdDogc2Nyb2xsUG9zLmxlZnQsXG5cdFx0XHRzY3JvbGxUb3A6IHNjcm9sbFBvcy50b3AsXG5cdFx0XHRzY3JvbGxXaWR0aDogc2Nyb2xsUG9zLndpZHRoLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnNjcm9sbCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnNjcm9sbCA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RhcnQgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqXG4gKiBcdFx0Ly8gSXQgaXMgbm93IHBvc3NpYmxlIHRvIGxpc3RlbiBmb3IgZGVib3VuY2Ugby12aWV3cG9ydCBldmVudHMgc3VjaCBhcyBgb1ZpZXdwb3J0Lm9yaWVudGF0aW9uYC5cbiAqICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQub3JpZW50YXRpb24nLCBmdW5jdGlvbihldmVudCkge1xuICogICAgICBcdGNvbnNvbGUubG9nKGV2ZW50LnR5cGUpOyAvLyBvVmlld3BvcnQub3JpZW50YXRpb25cbiAqICAgICAgfSk7XG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAncmVzaXplJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9SZXNpemUoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdzY3JvbGwnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Njcm9sbCgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ29yaWVudGF0aW9uJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9PcmllbnRhdGlvbigpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Zpc2liaWxpdHknIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Zpc2liaWxpdHkoKTtcblx0fVxufVxuXG4vKipcbiAqIFN0b3AgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RvcCBsaXN0ZW5pbmcgZm9yLiBPbmUgb2YgYHJlc2l6ZWAsIGBzY3JvbGxgLCBgb3JpZW50YXRpb25gLCBgdmlzaWJpbGl0eWAgb3IgYGFsbGAuXG4gKiBAZXhhbXBsZVxuICogXHRcdC8vIFN0YXJ0IGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ2FsbCcpO1xuICogXHRcdC8vIFdlJ3JlIGRvbmUuIFN0b3AgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5zdG9wTGlzdGVuaW5nVG8oJ2FsbCcpO1xuICovXG5mdW5jdGlvbiBzdG9wTGlzdGVuaW5nVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0T2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKHN0b3BMaXN0ZW5pbmdUbyk7XG5cdH0gZWxzZSBpZiAobGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcnNbZXZlbnRUeXBlXS5ldmVudFR5cGUsIGxpc3RlbmVyc1tldmVudFR5cGVdLmhhbmRsZXIpO1xuXHRcdGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRUeXBlXTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbiAoKSB7XG5cdFx0dXRpbHMuZGVidWcoKTtcblx0fSxcblx0bGlzdGVuVG8sXG5cdHN0b3BMaXN0ZW5pbmdUbyxcblx0c2V0VGhyb3R0bGVJbnRlcnZhbCxcblx0Z2V0T3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uLFxuXHRnZXRTaXplOiB1dGlscy5nZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbjogdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHk6IHV0aWxzLmdldFZpc2liaWxpdHlcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5jb25zdCBtaXNzaW5nRGF0YU1lc3NhZ2UgPSAnQ291bGQgbm90IGZpbmQgbGF5b3V0IGluZm9ybWF0aW9uLiAnICtcblx0J1lvdSBtYXkgbmVlZCB0byBpbmNsdWRlIG8tZ3JpZCBjc3MuIFNlZSB0aGUgUkVBRE1FIChodHRwczovL3JlZ2lzdHJ5Lm9yaWdhbWkuZnQuY29tL2NvbXBvbmVudHMvby1ncmlkL3JlYWRtZSkgJyArXG5cdCdmb3IgbW9yZSBpbmZvcm1hdGlvbi4nO1xuXG4vKipcbiAqIEdyYWIgZ3JpZCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuIHtPYmplY3R9IGxheW91dCBuYW1lcyBhbmQgZ3V0dGVyIHdpZHRoc1xuICovXG5mdW5jdGlvbiBnZXRHcmlkUHJvcGVydGllcygpIHtcblx0Y29uc3QgcHJvcGVydGllcyA9IGdldEdyaWRGcm9tRG9jKCdhZnRlcicpO1xuXHRpZiAoT2JqZWN0LmtleXMocHJvcGVydGllcykubGVuZ3RoID09PSAwKSB7XG5cdFx0Y29uc29sZS53YXJuKG1pc3NpbmdEYXRhTWVzc2FnZSk7XG5cdH1cblx0cmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbi8qKlxuICogR2V0IGFsbCBsYXlvdXQgc2l6ZXMuXG4gKiBDU1MgbXVzdCBiZSBpbmNsdWRlZCBzbyBKYXZhU2NyaXB0IGNhbiByZXRyaWV2ZSBsYXlvdXQgaW5mb3JtYXRpb24uXG4gKiBTZWUgdGhlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqIEByZXR1cm4ge09iamVjdH0gbGF5b3V0IG5hbWVzIGFuZCBzaXplc1xuICovXG5mdW5jdGlvbiBnZXRHcmlkQnJlYWtwb2ludHMoKSB7XG5cdGNvbnN0IGJyZWFrcG9pbnRzID0gZ2V0R3JpZEZyb21Eb2MoJ2JlZm9yZScpO1xuXHRpZiAoT2JqZWN0LmtleXMoYnJlYWtwb2ludHMpLmxlbmd0aCA9PT0gMCkge1xuXHRcdGNvbnNvbGUud2FybihtaXNzaW5nRGF0YU1lc3NhZ2UpO1xuXHR9XG5cdHJldHVybiBicmVha3BvaW50cztcbn1cblxuLyoqXG4gKiBHcmFiIGdyaWQgcHJvcGVydGllcyBzdXJmYWNlZCBpbiBodG1sOmFmdGVyIGFuZCBodG1sOmJlZm9yZSdzIGNvbnRlbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBwb3NpdGlvbiBXaGV0aGVyIHRvIGdldCBhbGwgcHJvcGVydGllcyBpbiA6YmVmb3JlLCBvciBjdXJyZW50IHByb3BlcnRpZXMgaW4gOmFmdGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGxheW91dCBuYW1lcyBhbmQgZ3V0dGVyIHdpZHRoc1xuICovXG5mdW5jdGlvbiBnZXRHcmlkRnJvbURvYyhwb3NpdGlvbikge1xuXHQvLyBDb250YWluZWQgaW4gYSB0cnkvY2F0Y2ggYXMgaXQgc2hvdWxkIG5vdCBlcnJvciBpZiBvLWdyaWQgc3R5bGVzIGFyZSBub3QgKGRlbGliZXJhdGVseSBvciBhY2NpZGVudGFsbHkpIGxvYWRlZFxuXHQvLyBlLmcuIG8tdHJhY2tpbmcgd2lsbCBhbHdheXMgdHJ5IHRvIHJlYWQgdGhpcyBwcm9wZXJ0eSwgYnV0IHRoZSBwYWdlIGlzIG5vdCBvYmxpZ2VkIHRvIHVzZSBvLWdyaWQgZm9yIGxheW91dFxuXHR0cnkge1xuXHRcdGxldCBncmlkUHJvcGVydGllcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJzonICsgcG9zaXRpb24pLmdldFByb3BlcnR5VmFsdWUoJ2NvbnRlbnQnKTtcblx0XHQvLyBGaXJlZm94IGNvbXB1dGVzOiBcIntcXFwiZm9vXFxcIjogXFxcImJhclxcXCJ9XCJcblx0XHQvLyBXZSB3YW50IHJlYWRhYmxlIEpTT046IHtcImZvb1wiOiBcImJhclwifVxuXHRcdGdyaWRQcm9wZXJ0aWVzID0gZ3JpZFByb3BlcnRpZXMucmVwbGFjZSgvJy9nLCAnJykucmVwbGFjZSgvXFxcXC9nLCAnJykucmVwbGFjZSgvXlwiLywgJycpLnJlcGxhY2UoL1wiJC8sICcnKTtcblx0XHRyZXR1cm4gSlNPTi5wYXJzZShncmlkUHJvcGVydGllcyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4ge307XG5cdH1cbn1cblxuLyoqXG4gKiBHcmFiIHRoZSBjdXJyZW50IGxheW91dC5cbiAqIENTUyBtdXN0IGJlIGluY2x1ZGVkIHNvIEphdmFTY3JpcHQgY2FuIHJldHJpZXZlIGxheW91dCBpbmZvcm1hdGlvbi5cbiAqIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHJldHVybiB7U3RyaW5nfSBMYXlvdXQgbmFtZVxuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50TGF5b3V0KCkge1xuXHRyZXR1cm4gZ2V0R3JpZFByb3BlcnRpZXMoKS5sYXlvdXQ7XG59XG5cbi8qKlxuICogR3JhYiB0aGUgY3VycmVudCBzcGFjZSBiZXR3ZWVuIGNvbHVtbnMuXG4gKiBDU1MgbXVzdCBiZSBpbmNsdWRlZCBzbyBKYXZhU2NyaXB0IGNhbiByZXRyaWV2ZSBsYXlvdXQgaW5mb3JtYXRpb24uXG4gKiBTZWUgdGhlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqIEByZXR1cm4ge1N0cmluZ30gR3V0dGVyIHdpZHRoIGluIHBpeGVsc1xuICovXG5mdW5jdGlvbiBnZXRDdXJyZW50R3V0dGVyKCkge1xuXHRyZXR1cm4gZ2V0R3JpZFByb3BlcnRpZXMoKS5ndXR0ZXI7XG59XG5cbi8qKlxuICogVGhpcyBzZXRzIE1lZGlhUXVlcnlMaXN0ZW5lcnMgb24gYWxsIHRoZSBvLWdyaWQgYnJlYWtwb2ludHNcbiAqIGFuZCBmaXJlcyBhIGBvLWdyaWQubGF5b3V0Q2hhbmdlYCBldmVudCBvbiBsYXlvdXQgY2hhbmdlLlxuICogQ1NTIG11c3QgYmUgaW5jbHVkZWQgc28gSmF2YVNjcmlwdCBjYW4gcmV0cmlldmUgbGF5b3V0IGluZm9ybWF0aW9uLlxuICogU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gZW5hYmxlTGF5b3V0Q2hhbmdlRXZlbnRzKCkge1xuXHQvLyBDcmVhdGUgYSBtYXAgY29udGFpbmluZyBhbGwgYnJlYWtwb2ludHMgZXhwb3NlZCB2aWEgaHRtbDpiZWZvcmVcblx0Y29uc3QgZ3JpZExheW91dHMgPSBnZXRHcmlkQnJlYWtwb2ludHMoKTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuXHRpZiAoZ3JpZExheW91dHMuaGFzT3duUHJvcGVydHkoJ2xheW91dHMnKSkge1xuXHRcdGNvbnN0IGxheW91dHMgPSBncmlkTGF5b3V0cy5sYXlvdXRzO1xuXHRcdGNvbnN0IGJyZWFrcG9pbnRzID0gW1xuXHRcdFx0Li4uT2JqZWN0LmVudHJpZXMobGF5b3V0cyksXG5cdFx0XHRbJ2RlZmF1bHQnLCAnMjQwcHgnXVxuXHRcdF0uc29ydCgoYSwgYikgPT4gcGFyc2VGbG9hdChhWzFdKSAtIHBhcnNlRmxvYXQoYlsxXSkpO1xuXG5cdFx0Y29uc3Qgc2V0dXBRdWVyeSA9IChxdWVyeSwgc2l6ZSkgPT4ge1xuXHRcdFx0Ly8gbWF0Y2hNZWRpYSBsaXN0ZW5lciBoYW5kbGVyOiBEaXNwYXRjaCBgby1ncmlkLmxheW91dENoYW5nZWAgZXZlbnQgaWYgYSBtYXRjaFxuXHRcdFx0Y29uc3QgaGFuZGxlTVFDaGFuZ2UgPSBtcWwgPT4ge1xuXHRcdFx0XHRpZiAobXFsLm1hdGNoZXMpIHtcblx0XHRcdFx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28tZ3JpZC5sYXlvdXRDaGFuZ2UnLCB7XG5cdFx0XHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRcdFx0bGF5b3V0OiBzaXplLFxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgbXFsID0gd2luZG93Lm1hdGNoTWVkaWEocXVlcnkpO1xuXHRcdFx0bXFsLmFkZExpc3RlbmVyKGhhbmRsZU1RQ2hhbmdlKTtcblx0XHRcdGhhbmRsZU1RQ2hhbmdlKG1xbCk7XG5cdFx0fTtcblxuXHRcdC8vIEdlbmVyYXRlIG1lZGlhIHF1ZXJpZXMgZm9yIGVhY2hcblx0XHRjb25zdCBkZWNyMSA9IHZhbCA9PiBgJHtOdW1iZXIodmFsLnJlcGxhY2UoJ3B4JywgJycpIC0gMSl9cHhgO1xuXHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBicmVha3BvaW50cy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdGNvbnN0IFtsYXlvdXROYW1lLCBsYXlvdXRXaWR0aF0gPSBicmVha3BvaW50c1tpbmRleF07XG5cdFx0XHRjb25zdCBpc0xhc3QgPSBpbmRleCA9PT0gYnJlYWtwb2ludHMubGVuZ3RoIC0gMTtcblx0XHRcdGlmIChpc0xhc3QpIHtcblx0XHRcdFx0c2V0dXBRdWVyeShgKG1pbi13aWR0aDogJHtsYXlvdXRXaWR0aH0pYCwgbGF5b3V0TmFtZSk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgWyxuZXh0TGF5b3V0V2lkdGhdID0gYnJlYWtwb2ludHNbaW5kZXggKyAxXTtcblx0XHRcdHNldHVwUXVlcnkoYChtaW4td2lkdGg6ICR7bGF5b3V0V2lkdGh9KSBhbmQgKG1heC13aWR0aDogJHtkZWNyMShuZXh0TGF5b3V0V2lkdGgpfSlgLCBsYXlvdXROYW1lKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc29sZS5lcnJvcignQ291bGQgbm90IGVuYWJsZSBncmlkIGxheW91dCBjaGFuZ2UgZXZlbnRzLiBJbmNsdWRlIG8tZ3JpZCBjc3MuIFNlZSB0aGUgUkVBRE1FIChodHRwczovL3JlZ2lzdHJ5Lm9yaWdhbWkuZnQuY29tL2NvbXBvbmVudHMvby1ncmlkL3JlYWRtZSkgZm9yIG1vcmUgZGV0YWlscy4nKTtcblx0fVxufVxuXG5leHBvcnQge1xuXHRnZXRDdXJyZW50TGF5b3V0LFxuXHRnZXRDdXJyZW50R3V0dGVyLFxuXHRnZXRHcmlkQnJlYWtwb2ludHMsXG5cdGVuYWJsZUxheW91dENoYW5nZUV2ZW50c1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRnZXRDdXJyZW50TGF5b3V0LFxuXHRnZXRDdXJyZW50R3V0dGVyLFxuXHRnZXRHcmlkQnJlYWtwb2ludHMsXG5cdGVuYWJsZUxheW91dENoYW5nZUV2ZW50c1xufTtcbiIsImNsYXNzIFRhcmdldCB7XG5cdGNvbnN0cnVjdG9yKHRhcmdldEVsKSB7XG5cdFx0dGhpcy50YXJnZXRFbCA9IHRhcmdldEVsO1xuXHR9XG5cblx0Z2V0IG9mZnNldFRvcCgpIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXRFbC5vZmZzZXRUb3A7XG5cdH1cblxuXHRnZXQgbGVmdCgpIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXHR9XG5cblx0Z2V0IHJpZ2h0KCkge1xuXHRcdHJldHVybiB0aGlzLmxlZnQgKyB0aGlzLndpZHRoO1xuXHR9XG5cblx0Z2V0IHRvcCgpIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cdH1cblxuXHRnZXQgYm90dG9tKCkge1xuXHRcdHJldHVybiB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0O1xuXHR9XG5cblx0Z2V0IHdpZHRoKCkge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXHR9XG5cblx0Z2V0IGhlaWdodCgpIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdH1cblxuXHRnZXQgY2VudHJlUG9pbnQoKXtcblx0XHRyZXR1cm4geyB4OiB0aGlzLmxlZnQgKyB0aGlzLndpZHRoLzIsIHk6IHRoaXMudG9wICsgdGhpcy5oZWlnaHQvMn07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFyZ2V0O1xuIiwiaW1wb3J0IFRvb2x0aXAgZnJvbSAnLi9zcmMvanMvdG9vbHRpcC5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRUb29sdGlwLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7XG4iLCJcbmltcG9ydCBUb29sdGlwIGZyb20gJy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdGNvbnN0IHRvb2x0aXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltcGVyYXRpdmUtdG9vbHRpcC10YXJnZXQnKTtcblx0bmV3IFRvb2x0aXAodG9vbHRpcEVsZW1lbnQsIHtcblx0XHR0YXJnZXQ6ICdkZW1vLXRvb2x0aXAtdGFyZ2V0LWltcGVyYXRpdmUnLFxuXHRcdGNvbnRlbnQ6ICdDbGljayB0byBzYXZlIHRvIHNvbWV3aGVyZScsXG5cdFx0c2hvd09uQ29uc3RydWN0aW9uOiB0cnVlLFxuXHRcdHBvc2l0aW9uOiAncmlnaHQnXG5cdH0pO1xufSk7XG4iXX0=