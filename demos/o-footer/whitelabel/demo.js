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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // ../o-toggle/src/js/target.js
  var Target = /*#__PURE__*/function () {
    "use strict";

    function Target(toggle) {
      _classCallCheck(this, Target);

      this.targetEl = toggle.targetEl;
      this.toggles = [];
    }

    _createClass(Target, [{
      key: "addToggle",
      value: function addToggle(toggle) {
        this.toggles.push(toggle);
      }
    }, {
      key: "removeToggle",
      value: function removeToggle(toggle) {
        var togglePosition = this.toggles.indexOf(toggle);
        this.toggles = this.toggles.slice(0, togglePosition).concat(this.toggles.slice(togglePosition + 1));

        if (this.toggles.length === 0) {
          this.open();
        }
      }
    }, {
      key: "open",
      value: function open() {
        this.targetEl.setAttribute("aria-hidden", "false");
        this.targetEl.classList.add("o-toggle--active");
        this.toggles.forEach(function (toggle) {
          toggle.open();
        });
      }
    }, {
      key: "close",
      value: function close() {
        this.targetEl.setAttribute("aria-hidden", "true");
        this.targetEl.classList.remove("o-toggle--active");
        this.toggles.forEach(function (toggle) {
          toggle.close();
        });
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.isOpen()) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "isOpen",
      value: function isOpen() {
        return this.targetEl.classList.contains("o-toggle--active");
      }
    }]);

    return Target;
  }();

  var target_default = Target; // ../o-toggle/src/js/toggle.js

  function handleSpaceKeydown(e) {
    if (e.keyCode === 32) {
      this.toggle(e);
    }
  }

  var Toggle = /*#__PURE__*/function () {
    "use strict";

    function Toggle(toggleEl, config) {
      _classCallCheck(this, Toggle);

      if (!Toggle._targets) {
        Toggle._targets = new Map();
      }

      if (!toggleEl) {
        return;
      } else if (!(toggleEl instanceof HTMLElement)) {
        toggleEl = document.querySelector(toggleEl);
      }

      if (toggleEl.hasAttribute("data-o-toggle--js")) {
        return;
      }

      if (!config) {
        config = {};
        Array.prototype.forEach.call(toggleEl.attributes, function (attr) {
          if (attr.name.indexOf("data-o-toggle") === 0) {
            var key = attr.name.replace("data-o-toggle-", "");

            try {
              config[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
            } catch (e) {
              config[key] = attr.value;
            }
          }
        });
      }

      if (config.callback && typeof config.callback === "string") {
        if (typeof window[config.callback] !== "function") {
          throw new Error("Could not find o-toggle callback \"".concat(config.callback, "\"."));
        }

        this.callback = window[config.callback];
      }

      if (config.callback && typeof config.callback === "function") {
        this.callback = config.callback;
      }

      if (config.callback && !this.callback) {
        throw new Error("The o-toggle callback must be a string or function.");
      }

      this.toggleEl = toggleEl;

      if (this.toggleEl.nodeName === "A") {
        this.toggleEl.setAttribute("role", "button");
        this.toggleEl.addEventListener("keydown", handleSpaceKeydown.bind(this));
        this.toggleEl.setAttribute("draggable", "false");
      }

      this.toggle = this.toggle.bind(this);
      this.toggleEl.addEventListener("click", this.toggle);
      this.toggleEl.setAttribute("data-o-toggle--js", "true");
      this.targetEl = config.target;

      if (!(this.targetEl instanceof HTMLElement)) {
        this.targetEl = document.querySelector(this.targetEl);
      }

      if (Toggle._targets.get(this.targetEl) === void 0) {
        this.target = new Toggle.Target(this);

        Toggle._targets.set(this.targetEl, this.target);
      } else {
        this.target = Toggle._targets.get(this.targetEl);
      }

      this.target.addToggle(this);
      this.target.close();
    }

    _createClass(Toggle, [{
      key: "open",
      value: function open() {
        this.toggleEl.setAttribute("aria-expanded", "true");
      }
    }, {
      key: "close",
      value: function close() {
        this.toggleEl.setAttribute("aria-expanded", "false");
      }
    }, {
      key: "toggle",
      value: function toggle(e) {
        this.target.toggle();

        if (e) {
          e.preventDefault();
        }

        if (this.callback) {
          var stateName = this.target.isOpen() ? "open" : "close";
          this.callback(stateName, e);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.toggleEl.nodeName === "A") {
          this.toggleEl.removeEventListener("keydown", handleSpaceKeydown);
        }

        this.toggleEl.removeEventListener("click", this.toggle);
        this.toggleEl.removeAttribute("aria-expanded");
        this.toggleEl.removeAttribute("role");
        this.toggleEl.removeAttribute("data-o-toggle--js");
        this.target.removeToggle(this);
        this.target = void 0;
        this.toggleEl = void 0;
        this.callback = void 0;
      }
    }], [{
      key: "init",
      value: function init(el, config) {
        if (!el) {
          el = document.body;
        } else if (!(el instanceof HTMLElement)) {
          el = document.querySelector(el);
        }

        var toggleEls = el.querySelectorAll('[data-o-component="o-toggle"]');
        var toggles = [];

        var _iterator = _createForOfIteratorHelper(toggleEls),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var toggleEl = _step.value;

            if (!toggleEl.hasAttribute("data-o-toggle--js")) {
              toggles.push(new Toggle(toggleEl, config));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return toggles;
      }
    }]);

    return Toggle;
  }();

  Toggle.Target = target_default;
  var toggle_default = Toggle; // ../o-toggle/main.js

  var constructAll = function constructAll() {
    toggle_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = toggle_default; // ../o-grid/main.js

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
  }; // ../../libraries/o-utils/main.js

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

  var main_default3 = {
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
  }; // src/js/layout.js

  function init(callback) {
    main_default3.listenTo("resize");
    var lastBreakpoint = main_default2.getCurrentLayout();
    document.body.addEventListener("oViewport.resize", function () {
      var breakpoint = main_default2.getCurrentLayout();

      if (breakpoint !== lastBreakpoint) {
        callback(breakpoint);
        lastBreakpoint = breakpoint;
      }
    });
    callback(lastBreakpoint);
  } // src/js/footer.js


  var COLLAPSIBLE_BREAKPOINTS = ["default", "XS", "S"];

  var Footer = /*#__PURE__*/function () {
    "use strict";

    function Footer(footerEl) {
      var _this3 = this;

      _classCallCheck(this, Footer);

      if (!footerEl) {
        footerEl = document.querySelector('[data-o-component="o-footer"]');
      } else if (typeof footerEl === "string") {
        footerEl = document.querySelector(footerEl);
      }

      this.footerEl = footerEl;
      init(function (breakpoint) {
        var shouldCollapse = Footer.shouldCollapse(breakpoint);

        if (shouldCollapse && !_this3._toggles) {
          return _this3.setup();
        }

        if (!shouldCollapse && _this3._toggles) {
          return _this3.destroy();
        }
      });
      this.footerEl.removeAttribute("data-o-footer--no-js");
      this.footerEl.setAttribute("data-o-footer--js", "");
    }

    _createClass(Footer, [{
      key: "setup",
      value: function setup() {
        var _this4 = this;

        this._toggles = [];
        var toggleEls = this.footerEl.querySelectorAll("[aria-controls]");
        Array.prototype.forEach.call(toggleEls, function (toggleEl) {
          var target = document.getElementById(toggleEl.getAttribute("aria-controls"));
          toggleEl.setAttribute("role", "button");
          toggleEl.setAttribute("tabindex", "0");

          _this4._toggles.push(new main_default(toggleEl, {
            target: target
          }));
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._toggles.forEach(function (toggle) {
          return toggle.destroy();
        });

        this._toggles = null;
      }
    }], [{
      key: "collapsibleBreakpoints",
      get: function get() {
        return COLLAPSIBLE_BREAKPOINTS;
      }
    }, {
      key: "shouldCollapse",
      value: function shouldCollapse(breakpoint) {
        return COLLAPSIBLE_BREAKPOINTS.indexOf(breakpoint) !== -1;
      }
    }, {
      key: "init",
      value: function init(rootEl) {
        if (!rootEl) {
          rootEl = document.body;
        } else if (typeof rootEl === "string") {
          rootEl = document.querySelector(rootEl);
        }

        var footerEl = rootEl.querySelector('[data-o-component="o-footer"]');

        if (footerEl) {
          return new Footer(footerEl);
        }
      }
    }]);

    return Footer;
  }();

  var footer_default = Footer; // main.js

  var constructAll2 = function constructAll2() {
    footer_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll2);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll2); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.className = document.documentElement.className.replace("core", "enhanced");
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL28tdG9nZ2xlL3NyYy9qcy90YXJnZXQuanMiLCIuLi9vLXRvZ2dsZS9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vby10b2dnbGUvbWFpbi5qcyIsIi4uL28tZ3JpZC9tYWluLmpzIiwiLi4vLi4vbGlicmFyaWVzL28tdXRpbHMvbWFpbi5qcyIsIi4uL28tdmlld3BvcnQvc3JjL3V0aWxzLmpzIiwiLi4vby12aWV3cG9ydC9tYWluLmpzIiwic3JjL2pzL2xheW91dC5qcyIsInNyYy9qcy9mb290ZXIuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxNQUFBO0FBQUE7O0FBRUMsb0JBQVksTUFBWixFQUFtQjtBQUFBOztBQUNsQixXQUFLLFFBQUwsR0FBZ0IsTUFBQSxDQUFPLFFBQXZCO0FBQ0EsV0FBSyxPQUFMLEdBQWUsRUFBZjtBQUFlOztBQUpqQjtBQUFBO0FBQUEsYUFPQyxtQkFBVSxNQUFWLEVBQWtCO0FBQ2pCLGFBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsTUFBbEI7QUFBa0I7QUFScEI7QUFBQTtBQUFBLGFBV0Msc0JBQWEsTUFBYixFQUFxQjtBQUNwQixZQUFNLGNBQUEsR0FBaUIsS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixNQUFyQixDQUF2QjtBQUNBLGFBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBc0IsY0FBdEIsRUFBc0MsTUFBdEMsQ0FBNkMsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixjQUFBLEdBQWdCLENBQW5DLENBQTdDLENBQWY7O0FBQ0EsWUFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBRzlCLGVBQUssSUFBTDtBQUFLO0FBQUE7QUFqQlI7QUFBQTtBQUFBLGFBcUJDLGdCQUFPO0FBQ04sYUFBSyxRQUFMLENBQWMsWUFBZCxD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QWdELENBQUEsQ0FBdkQ7QUFBdUQ7QUFsRHpEO0FBQUE7QUFBQSxhQWtEeUQsY0FHM0MsTUFIMkMsRUFHbkM7QUFDcEIsWUFBSSxDQUFDLE1BQUwsRUFBYTtBQUNaLFVBQUEsTUFBQSxHQUFTLFFBQUEsQ0FBUyxJQUFsQjtBQUFrQixTQURuQixNQUNtQixJQUNSLE9BQU8sTUFBUCxLQUFrQixRQURWLEVBQ29CO0FBQ3RDLFVBQUEsTUFBQSxHQUFTLFFBQUEsQ0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVQ7QUFBZ0M7O0FBR2pDLFlBQU0sUUFBQSxHQUFXLE1BQUEsQ0FBTyxhQUFQLENBQXFCLCtCQUFyQixDQUFqQjs7QUFFQSxZQUFJLFFBQUosRUFBYztBQUNiLGlCQUFPLElBQUksTUFBSixDQUFXLFFBQVgsQ0FBUDtBQUFrQjtBQUFBO0FBL0RyQjs7QUFBQTtBQUFBLEtBQUE7O0FBb0VBLE1BQU8sY0FBQSxHQUFRLE1BQWYsQzs7QUN4RUEsTUFBTSxhQUFBLEdBQWUsU0FBZixhQUFlLEdBQU07QUFDMUIsSUFBQSxjQUFBLENBQU8sSUFBUDtBQUNBLElBQUEsUUFBQSxDQUFTLG1CQUFULENBQTZCLG9CQUE3QixFQUFtRCxhQUFuRDtBQUFtRCxHQUZwRDs7QUFLQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsRUFBZ0QsYUFBaEQsRTs7QUNMQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN4RCxJQUFBLFFBQUEsQ0FBUyxlQUFULENBQXlCLFNBQXpCLEdBQXFDLFFBQUEsQ0FBUyxlQUFULENBQXlCLFNBQXpCLENBQW1DLE9BQW5DLENBQTJDLE1BQTNDLEVBQW1ELFVBQW5ELENBQXJDO0FBQ0EsSUFBQSxRQUFBLENBQVMsYUFBVCxDQUF1QixJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQXVDLEdBRnhDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVGFyZ2V0IHtcblxuXHRjb25zdHJ1Y3Rvcih0b2dnbGUpe1xuXHRcdHRoaXMudGFyZ2V0RWwgPSB0b2dnbGUudGFyZ2V0RWw7XG5cdFx0dGhpcy50b2dnbGVzID0gW107XG5cdH1cblxuXHRhZGRUb2dnbGUodG9nZ2xlKSB7XG5cdFx0dGhpcy50b2dnbGVzLnB1c2godG9nZ2xlKTtcblx0fVxuXG5cdHJlbW92ZVRvZ2dsZSh0b2dnbGUpIHtcblx0XHRjb25zdCB0b2dnbGVQb3NpdGlvbiA9IHRoaXMudG9nZ2xlcy5pbmRleE9mKHRvZ2dsZSk7XG5cdFx0dGhpcy50b2dnbGVzID0gdGhpcy50b2dnbGVzLnNsaWNlKDAsIHRvZ2dsZVBvc2l0aW9uKS5jb25jYXQodGhpcy50b2dnbGVzLnNsaWNlKHRvZ2dsZVBvc2l0aW9uICsxKSk7XG5cdFx0aWYgKHRoaXMudG9nZ2xlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdC8vIElmIHRoYXQgd2FzIHRoZSBsYXN0L29ubHkgdG9nZ2xlIHRoYXQgY29udHJvbGxlZCB0aGlzIHRhcmdldCB0aGVuIGVuc3VyZVxuXHRcdFx0Ly8gdGhpcyB0YXJnZXQgaXMgb3BlbiBzbyBpdCBkb2Vzbid0IGdldCBzdHVjayBpbiB0aGUgY2xvc2VkIHBvc2l0aW9uXG5cdFx0XHR0aGlzLm9wZW4oKTtcblx0XHR9XG5cdH1cblxuXHRvcGVuKCkge1xuXHRcdHRoaXMudGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXHRcdHRoaXMudGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnby10b2dnbGUtLWFjdGl2ZScpO1xuXHRcdC8vIFNldCBldmVyeSB0b2dnbGUgdGhhdCBjb250cm9scyB0aGlzIHRhcmdldCB0byBiZSBvcGVuXG5cdFx0dGhpcy50b2dnbGVzLmZvckVhY2goKHRvZ2dsZSkgPT4ge1xuXHRcdFx0dG9nZ2xlLm9wZW4oKTtcblx0XHR9KTtcblx0fVxuXG5cdGNsb3NlKCkge1xuXHRcdHRoaXMudGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdFx0dGhpcy50YXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdvLXRvZ2dsZS0tYWN0aXZlJyk7XG5cblx0XHQvLyBTZXQgZXZlcnkgdG9nZ2xlIHRoYXQgY29udHJvbHMgdGhpcyB0YXJnZXQgdG8gYmUgY2xvc2VkXG5cdFx0dGhpcy50b2dnbGVzLmZvckVhY2goKHRvZ2dsZSkgPT4ge1xuXHRcdFx0dG9nZ2xlLmNsb3NlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHR0b2dnbGUoKXtcblx0XHRpZiAodGhpcy5pc09wZW4oKSl7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3BlbigpO1xuXHRcdH1cblx0fVxuXG5cdGlzT3BlbigpIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ28tdG9nZ2xlLS1hY3RpdmUnKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXJnZXQ7XG4iLCJpbXBvcnQgVGFyZ2V0IGZyb20gJy4vdGFyZ2V0LmpzJztcblxuLy8gU29tZSBhc3Npc3RpdmUgdGVjaG5vbG9naWVzLCBsaWtlIHNjcmVlbiByZWFkZXJzLCBzdWdnZXN0IHRvIHByZXNzICdzcGFjZSdcbi8vIHdoZW4gaW50ZXJhY3Rpbmcgd2l0aCBhIGxpbmsgd2l0aCBhIHJvbGUgb2YgJ2J1dHRvbicuXG4vLyBXZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHdlIHJlcGxpY2F0ZSB0aGlzIGZ1bmN0aW9uYWxpdHkgdGhhdCBleGlzdHMgb24gYSBidXR0b24gZWxlbWVudC5cbmZ1bmN0aW9uIGhhbmRsZVNwYWNlS2V5ZG93biAoZSkge1xuXHQvLyBpZiB0aGUgcHJlc3NlZCBrZXkgaXMgYSBzcGFjZSwgd2UnbGwgc2ltdWxhdGUgYSBjbGlja1xuXHRpZiAoZS5rZXlDb2RlID09PSAzMikge1xuXHRcdHRoaXMudG9nZ2xlKGUpO1xuXHR9XG59XG5cbmNsYXNzIFRvZ2dsZSB7XG5cblx0Y29uc3RydWN0b3IodG9nZ2xlRWwsIGNvbmZpZykge1xuXHRcdGlmICghVG9nZ2xlLl90YXJnZXRzKSB7XG5cdFx0XHRUb2dnbGUuX3RhcmdldHMgPSBuZXcgTWFwKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0b2dnbGVFbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSBpZiAoISh0b2dnbGVFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0dG9nZ2xlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRvZ2dsZUVsKTtcblx0XHR9XG5cblx0XHRpZiAodG9nZ2xlRWwuaGFzQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCFjb25maWcpIHtcblx0XHRcdGNvbmZpZyA9IHt9O1xuXHRcdFx0Ly8gVHJ5IHRvIGdldCBjb25maWcgc2V0IGRlY2xhcmF0aXZlbHkgb24gdGhlIGVsZW1lbnRcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodG9nZ2xlRWwuYXR0cmlidXRlcywgKGF0dHIpID0+IHtcblx0XHRcdFx0aWYgKGF0dHIubmFtZS5pbmRleE9mKCdkYXRhLW8tdG9nZ2xlJykgPT09IDApIHtcblx0XHRcdFx0XHQvLyBSZW1vdmUgdGhlIHByZWZpeCBwYXJ0IG9mIHRoZSBkYXRhIGF0dHJpYnV0ZSBuYW1lXG5cdFx0XHRcdFx0Y29uc3Qga2V5ID0gYXR0ci5uYW1lLnJlcGxhY2UoJ2RhdGEtby10b2dnbGUtJywgJycpO1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHQvLyBJZiBpdCdzIGEgSlNPTiwgYSBib29sZWFuIG9yIGEgbnVtYmVyLCB3ZSB3YW50IGl0IHN0b3JlZCBsaWtlIHRoYXQsIGFuZCBub3QgYXMgYSBzdHJpbmdcblx0XHRcdFx0XHRcdC8vIFdlIGFsc28gcmVwbGFjZSBhbGwgJyB3aXRoIFwiIHNvIEpTT04gc3RyaW5ncyBhcmUgcGFyc2VkIGNvcnJlY3RseVxuXHRcdFx0XHRcdFx0Y29uZmlnW2tleV0gPSBKU09OLnBhcnNlKGF0dHIudmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRjb25maWdba2V5XSA9IGF0dHIudmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIHRvZ2dsZSBjYWxsYmFjayBpZiBpdHMgYSBzdHJpbmcuXG5cdFx0aWYgKGNvbmZpZy5jYWxsYmFjayAmJiB0eXBlb2YgY29uZmlnLmNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuXHRcdFx0Ly8gRXJyb3IgaWYgdGhlIGNhbGxiYWNrIGlzIGEgc3RyaW5nIGFuZCBhIGdsb2JhbCBmdW5jdGlvbiBvZiB0aGF0IG5hbWUgZG9lcyBub3QgZXhpc3QuXG5cdFx0XHRpZiAodHlwZW9mIHdpbmRvd1tjb25maWcuY2FsbGJhY2tdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgby10b2dnbGUgY2FsbGJhY2sgXCIke2NvbmZpZy5jYWxsYmFja31cIi5gKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FsbGJhY2sgPSB3aW5kb3dbY29uZmlnLmNhbGxiYWNrXTtcblx0XHR9XG5cdFx0Ly8gU2V0IHRoZSB0b2dnbGUgY2FsbGJhY2sgaWYgaXRzIGEgZnVuY2l0b24uXG5cdFx0aWYgKGNvbmZpZy5jYWxsYmFjayAmJiB0eXBlb2YgY29uZmlnLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aGlzLmNhbGxiYWNrID0gY29uZmlnLmNhbGxiYWNrO1xuXHRcdH1cblx0XHQvLyBFcnJvciBpZiBzb21lIGNhbGxiYWNrIHZhbHVlIGhhcyBiZWVuIGdpdmVuIGJ1dCBoYXMgbm90IGJlZW4gc2V0LlxuXHRcdGlmIChjb25maWcuY2FsbGJhY2sgJiYgIXRoaXMuY2FsbGJhY2spIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgVGhlIG8tdG9nZ2xlIGNhbGxiYWNrIG11c3QgYmUgYSBzdHJpbmcgb3IgZnVuY3Rpb24uYCk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSB0b2dnbGUgZWxlbWVudC5cblx0XHR0aGlzLnRvZ2dsZUVsID0gdG9nZ2xlRWw7XG5cblx0XHRpZiAodGhpcy50b2dnbGVFbC5ub2RlTmFtZSA9PT0gJ0EnKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcblx0XHRcdHRoaXMudG9nZ2xlRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZVNwYWNlS2V5ZG93bi5iaW5kKHRoaXMpKTtcblx0XHRcdC8vIElmIGEgdXNlciBkcmFncyB0aGVpciBtb3VzZSBzbGlnaHRseSB3aGVuIHRyeWluZyB0byBpbnRlcmFjdCB3aXRoIHRoZSB0b2dnbGVcblx0XHRcdC8vIGl0IHdpbGwgdHJpZ2dlciB0aGUgJ2RyYWcgYW5kIGRyb3AnIGZ1bmN0aW9uYWxpdHkuXG5cdFx0XHQvLyBSZWd1bGFyIGJ1dHRvbnMgcHJldmVudCB0aGlzIGFuZCBlbnN1cmUgYXMgbG9uZyBhcyB0aGUgbW91c2UgaXMgc3RpbGwgYWJvdmUgdGhlXG5cdFx0XHQvLyBidXR0b24gdGhhdCB0aGUgY2xpY2sgd2lsbCByZWdpc3Rlci5cblx0XHRcdC8vIFRoaXMgd2lsbCBoZWxwIHVzZXJzIHdpdGggbW90b3IgaW1wYWlybWVudHMgYW5kIHRob3NlIGxlc3MgZmFtaWxpYXIgd2l0aCBhIHRyYWNrcGFkLlxuXHRcdFx0dGhpcy50b2dnbGVFbC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpO1xuXHRcdH1cblxuXHRcdHRoaXMudG9nZ2xlID0gdGhpcy50b2dnbGUuYmluZCh0aGlzKTtcblx0XHR0aGlzLnRvZ2dsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUpO1xuXG5cdFx0dGhpcy50b2dnbGVFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby10b2dnbGUtLWpzJywgJ3RydWUnKTtcblxuXHRcdHRoaXMudGFyZ2V0RWwgPSBjb25maWcudGFyZ2V0O1xuXHRcdGlmICghKHRoaXMudGFyZ2V0RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHRoaXMudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0RWwpO1xuXHRcdH1cblxuXHRcdGlmIChUb2dnbGUuX3RhcmdldHMuZ2V0KHRoaXMudGFyZ2V0RWwpID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMudGFyZ2V0ID0gbmV3IFRvZ2dsZS5UYXJnZXQodGhpcyk7XG5cdFx0XHRUb2dnbGUuX3RhcmdldHMuc2V0KHRoaXMudGFyZ2V0RWwsIHRoaXMudGFyZ2V0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy50YXJnZXQgPSBUb2dnbGUuX3RhcmdldHMuZ2V0KHRoaXMudGFyZ2V0RWwpO1xuXHRcdH1cblxuXHRcdHRoaXMudGFyZ2V0LmFkZFRvZ2dsZSh0aGlzKTtcblx0XHR0aGlzLnRhcmdldC5jbG9zZSgpO1xuXHR9XG5cblx0b3BlbigpIHtcblx0XHR0aGlzLnRvZ2dsZUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG5cdH1cblxuXHRjbG9zZSgpIHtcblx0XHR0aGlzLnRvZ2dsZUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXHR9XG5cblx0Ly8gdG9nZ2xlIGlzIGJvdW5kIHRvIHRoZSBUb2dnbGUgaW5zdGFuY2UgaW4gdGhlIGNvbnN0cnVjdG9yXG5cdHRvZ2dsZShlKSB7XG5cblx0XHR0aGlzLnRhcmdldC50b2dnbGUoKTtcblxuXHRcdGlmKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jYWxsYmFjayl7XG5cdFx0XHRjb25zdCBzdGF0ZU5hbWUgPSB0aGlzLnRhcmdldC5pc09wZW4oKSA/ICdvcGVuJyA6ICdjbG9zZSc7XG5cdFx0XHR0aGlzLmNhbGxiYWNrKHN0YXRlTmFtZSwgZSk7XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy50b2dnbGVFbC5ub2RlTmFtZSA9PT0gJ0EnKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVTcGFjZUtleWRvd24pO1xuXHRcdH1cblx0XHR0aGlzLnRvZ2dsZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUpO1xuXHRcdHRoaXMudG9nZ2xlRWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG5cdFx0dGhpcy50b2dnbGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcblx0XHR0aGlzLnRvZ2dsZUVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1vLXRvZ2dsZS0tanMnKTtcblxuXHRcdHRoaXMudGFyZ2V0LnJlbW92ZVRvZ2dsZSh0aGlzKTtcblxuXHRcdHRoaXMudGFyZ2V0ID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMudG9nZ2xlRWwgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5jYWxsYmFjayA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHN0YXRpYyBpbml0KGVsLCBjb25maWcpIHtcblx0XHRpZiAoIWVsKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fSBlbHNlIGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHRcdH1cblx0XHRjb25zdCB0b2dnbGVFbHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tdG9nZ2xlXCJdJyk7XG5cdFx0Y29uc3QgdG9nZ2xlcyA9IFtdO1xuXHRcdGZvciAoY29uc3QgdG9nZ2xlRWwgb2YgdG9nZ2xlRWxzKSB7XG5cdFx0XHRpZiAoIXRvZ2dsZUVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1vLXRvZ2dsZS0tanMnKSkge1xuXHRcdFx0XHR0b2dnbGVzLnB1c2gobmV3IFRvZ2dsZSh0b2dnbGVFbCwgY29uZmlnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0b2dnbGVzO1xuXHR9XG59XG5cblRvZ2dsZS5UYXJnZXQgPSBUYXJnZXQ7XG5leHBvcnQgZGVmYXVsdCBUb2dnbGU7XG4iLCJpbXBvcnQgVG9nZ2xlIGZyb20gJy4vc3JjL2pzL3RvZ2dsZS5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9ICgpID0+IHtcblx0VG9nZ2xlLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmNvbnN0IG1pc3NpbmdEYXRhTWVzc2FnZSA9ICdDb3VsZCBub3QgZmluZCBsYXlvdXQgaW5mb3JtYXRpb24uICcgK1xuXHQnWW91IG1heSBuZWVkIHRvIGluY2x1ZGUgby1ncmlkIGNzcy4gU2VlIHRoZSBSRUFETUUgKGh0dHBzOi8vcmVnaXN0cnkub3JpZ2FtaS5mdC5jb20vY29tcG9uZW50cy9vLWdyaWQvcmVhZG1lKSAnICtcblx0J2ZvciBtb3JlIGluZm9ybWF0aW9uLic7XG5cbi8qKlxuICogR3JhYiBncmlkIHByb3BlcnRpZXNcbiAqIEByZXR1cm4ge09iamVjdH0gbGF5b3V0IG5hbWVzIGFuZCBndXR0ZXIgd2lkdGhzXG4gKi9cbmZ1bmN0aW9uIGdldEdyaWRQcm9wZXJ0aWVzKCkge1xuXHRjb25zdCBwcm9wZXJ0aWVzID0gZ2V0R3JpZEZyb21Eb2MoJ2FmdGVyJyk7XG5cdGlmIChPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5sZW5ndGggPT09IDApIHtcblx0XHRjb25zb2xlLndhcm4obWlzc2luZ0RhdGFNZXNzYWdlKTtcblx0fVxuXHRyZXR1cm4gcHJvcGVydGllcztcbn1cblxuLyoqXG4gKiBHZXQgYWxsIGxheW91dCBzaXplcy5cbiAqIENTUyBtdXN0IGJlIGluY2x1ZGVkIHNvIEphdmFTY3JpcHQgY2FuIHJldHJpZXZlIGxheW91dCBpbmZvcm1hdGlvbi5cbiAqIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHJldHVybiB7T2JqZWN0fSBsYXlvdXQgbmFtZXMgYW5kIHNpemVzXG4gKi9cbmZ1bmN0aW9uIGdldEdyaWRCcmVha3BvaW50cygpIHtcblx0Y29uc3QgYnJlYWtwb2ludHMgPSBnZXRHcmlkRnJvbURvYygnYmVmb3JlJyk7XG5cdGlmIChPYmplY3Qua2V5cyhicmVha3BvaW50cykubGVuZ3RoID09PSAwKSB7XG5cdFx0Y29uc29sZS53YXJuKG1pc3NpbmdEYXRhTWVzc2FnZSk7XG5cdH1cblx0cmV0dXJuIGJyZWFrcG9pbnRzO1xufVxuXG4vKipcbiAqIEdyYWIgZ3JpZCBwcm9wZXJ0aWVzIHN1cmZhY2VkIGluIGh0bWw6YWZ0ZXIgYW5kIGh0bWw6YmVmb3JlJ3MgY29udGVudFxuICogQHBhcmFtIHtTdHJpbmd9IHBvc2l0aW9uIFdoZXRoZXIgdG8gZ2V0IGFsbCBwcm9wZXJ0aWVzIGluIDpiZWZvcmUsIG9yIGN1cnJlbnQgcHJvcGVydGllcyBpbiA6YWZ0ZXJcbiAqIEByZXR1cm4ge09iamVjdH0gbGF5b3V0IG5hbWVzIGFuZCBndXR0ZXIgd2lkdGhzXG4gKi9cbmZ1bmN0aW9uIGdldEdyaWRGcm9tRG9jKHBvc2l0aW9uKSB7XG5cdC8vIENvbnRhaW5lZCBpbiBhIHRyeS9jYXRjaCBhcyBpdCBzaG91bGQgbm90IGVycm9yIGlmIG8tZ3JpZCBzdHlsZXMgYXJlIG5vdCAoZGVsaWJlcmF0ZWx5IG9yIGFjY2lkZW50YWxseSkgbG9hZGVkXG5cdC8vIGUuZy4gby10cmFja2luZyB3aWxsIGFsd2F5cyB0cnkgdG8gcmVhZCB0aGlzIHByb3BlcnR5LCBidXQgdGhlIHBhZ2UgaXMgbm90IG9ibGlnZWQgdG8gdXNlIG8tZ3JpZCBmb3IgbGF5b3V0XG5cdHRyeSB7XG5cdFx0bGV0IGdyaWRQcm9wZXJ0aWVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnOicgKyBwb3NpdGlvbikuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpO1xuXHRcdC8vIEZpcmVmb3ggY29tcHV0ZXM6IFwie1xcXCJmb29cXFwiOiBcXFwiYmFyXFxcIn1cIlxuXHRcdC8vIFdlIHdhbnQgcmVhZGFibGUgSlNPTjoge1wiZm9vXCI6IFwiYmFyXCJ9XG5cdFx0Z3JpZFByb3BlcnRpZXMgPSBncmlkUHJvcGVydGllcy5yZXBsYWNlKC8nL2csICcnKS5yZXBsYWNlKC9cXFxcL2csICcnKS5yZXBsYWNlKC9eXCIvLCAnJykucmVwbGFjZSgvXCIkLywgJycpO1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGdyaWRQcm9wZXJ0aWVzKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiB7fTtcblx0fVxufVxuXG4vKipcbiAqIEdyYWIgdGhlIGN1cnJlbnQgbGF5b3V0LlxuICogQ1NTIG11c3QgYmUgaW5jbHVkZWQgc28gSmF2YVNjcmlwdCBjYW4gcmV0cmlldmUgbGF5b3V0IGluZm9ybWF0aW9uLlxuICogU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IExheW91dCBuYW1lXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRMYXlvdXQoKSB7XG5cdHJldHVybiBnZXRHcmlkUHJvcGVydGllcygpLmxheW91dDtcbn1cblxuLyoqXG4gKiBHcmFiIHRoZSBjdXJyZW50IHNwYWNlIGJldHdlZW4gY29sdW1ucy5cbiAqIENTUyBtdXN0IGJlIGluY2x1ZGVkIHNvIEphdmFTY3JpcHQgY2FuIHJldHJpZXZlIGxheW91dCBpbmZvcm1hdGlvbi5cbiAqIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHJldHVybiB7U3RyaW5nfSBHdXR0ZXIgd2lkdGggaW4gcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIGdldEN1cnJlbnRHdXR0ZXIoKSB7XG5cdHJldHVybiBnZXRHcmlkUHJvcGVydGllcygpLmd1dHRlcjtcbn1cblxuLyoqXG4gKiBUaGlzIHNldHMgTWVkaWFRdWVyeUxpc3RlbmVycyBvbiBhbGwgdGhlIG8tZ3JpZCBicmVha3BvaW50c1xuICogYW5kIGZpcmVzIGEgYG8tZ3JpZC5sYXlvdXRDaGFuZ2VgIGV2ZW50IG9uIGxheW91dCBjaGFuZ2UuXG4gKiBDU1MgbXVzdCBiZSBpbmNsdWRlZCBzbyBKYXZhU2NyaXB0IGNhbiByZXRyaWV2ZSBsYXlvdXQgaW5mb3JtYXRpb24uXG4gKiBTZWUgdGhlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBlbmFibGVMYXlvdXRDaGFuZ2VFdmVudHMoKSB7XG5cdC8vIENyZWF0ZSBhIG1hcCBjb250YWluaW5nIGFsbCBicmVha3BvaW50cyBleHBvc2VkIHZpYSBodG1sOmJlZm9yZVxuXHRjb25zdCBncmlkTGF5b3V0cyA9IGdldEdyaWRCcmVha3BvaW50cygpO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cdGlmIChncmlkTGF5b3V0cy5oYXNPd25Qcm9wZXJ0eSgnbGF5b3V0cycpKSB7XG5cdFx0Y29uc3QgbGF5b3V0cyA9IGdyaWRMYXlvdXRzLmxheW91dHM7XG5cdFx0Y29uc3QgYnJlYWtwb2ludHMgPSBbXG5cdFx0XHQuLi5PYmplY3QuZW50cmllcyhsYXlvdXRzKSxcblx0XHRcdFsnZGVmYXVsdCcsICcyNDBweCddXG5cdFx0XS5zb3J0KChhLCBiKSA9PiBwYXJzZUZsb2F0KGFbMV0pIC0gcGFyc2VGbG9hdChiWzFdKSk7XG5cblx0XHRjb25zdCBzZXR1cFF1ZXJ5ID0gKHF1ZXJ5LCBzaXplKSA9PiB7XG5cdFx0XHQvLyBtYXRjaE1lZGlhIGxpc3RlbmVyIGhhbmRsZXI6IERpc3BhdGNoIGBvLWdyaWQubGF5b3V0Q2hhbmdlYCBldmVudCBpZiBhIG1hdGNoXG5cdFx0XHRjb25zdCBoYW5kbGVNUUNoYW5nZSA9IG1xbCA9PiB7XG5cdFx0XHRcdGlmIChtcWwubWF0Y2hlcykge1xuXHRcdFx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby1ncmlkLmxheW91dENoYW5nZScsIHtcblx0XHRcdFx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRcdFx0XHRsYXlvdXQ6IHNpemUsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBtcWwgPSB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSk7XG5cdFx0XHRtcWwuYWRkTGlzdGVuZXIoaGFuZGxlTVFDaGFuZ2UpO1xuXHRcdFx0aGFuZGxlTVFDaGFuZ2UobXFsKTtcblx0XHR9O1xuXG5cdFx0Ly8gR2VuZXJhdGUgbWVkaWEgcXVlcmllcyBmb3IgZWFjaFxuXHRcdGNvbnN0IGRlY3IxID0gdmFsID0+IGAke051bWJlcih2YWwucmVwbGFjZSgncHgnLCAnJykgLSAxKX1weGA7XG5cdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJyZWFrcG9pbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0Y29uc3QgW2xheW91dE5hbWUsIGxheW91dFdpZHRoXSA9IGJyZWFrcG9pbnRzW2luZGV4XTtcblx0XHRcdGNvbnN0IGlzTGFzdCA9IGluZGV4ID09PSBicmVha3BvaW50cy5sZW5ndGggLSAxO1xuXHRcdFx0aWYgKGlzTGFzdCkge1xuXHRcdFx0XHRzZXR1cFF1ZXJ5KGAobWluLXdpZHRoOiAke2xheW91dFdpZHRofSlgLCBsYXlvdXROYW1lKTtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBbLG5leHRMYXlvdXRXaWR0aF0gPSBicmVha3BvaW50c1tpbmRleCArIDFdO1xuXHRcdFx0c2V0dXBRdWVyeShgKG1pbi13aWR0aDogJHtsYXlvdXRXaWR0aH0pIGFuZCAobWF4LXdpZHRoOiAke2RlY3IxKG5leHRMYXlvdXRXaWR0aCl9KWAsIGxheW91dE5hbWUpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgZW5hYmxlIGdyaWQgbGF5b3V0IGNoYW5nZSBldmVudHMuIEluY2x1ZGUgby1ncmlkIGNzcy4gU2VlIHRoZSBSRUFETUUgKGh0dHBzOi8vcmVnaXN0cnkub3JpZ2FtaS5mdC5jb20vY29tcG9uZW50cy9vLWdyaWQvcmVhZG1lKSBmb3IgbW9yZSBkZXRhaWxzLicpO1xuXHR9XG59XG5cbmV4cG9ydCB7XG5cdGdldEN1cnJlbnRMYXlvdXQsXG5cdGdldEN1cnJlbnRHdXR0ZXIsXG5cdGdldEdyaWRCcmVha3BvaW50cyxcblx0ZW5hYmxlTGF5b3V0Q2hhbmdlRXZlbnRzXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGdldEN1cnJlbnRMYXlvdXQsXG5cdGdldEN1cnJlbnRHdXR0ZXIsXG5cdGdldEdyaWRCcmVha3BvaW50cyxcblx0ZW5hYmxlTGF5b3V0Q2hhbmdlRXZlbnRzXG59O1xuIiwiLyoqXG4qXG4qIERlYm91bmNlcyBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBhZnRlciBuIG1pbGxpc2Vjb25kc1xuKiB3aXRob3V0IGl0IG5vdCBiZWluZyBjYWxsZWRcbipcbiogQGV4YW1wbGVcbiogVXRpbHMuZGVib3VuY2UobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gRGVib3VuY2VkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbipcbiogVGhyb3R0bGUgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgb25jZSBldmVyeSBuIG1pbGxpc2Vjb25kc1xuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy50aHJvdHRsZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBUaHJvdHRsZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdXRpbHMnO1xuXG5sZXQgZGVidWc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gYnJvYWRjYXN0KGV2ZW50VHlwZSwgZGF0YSwgdGFyZ2V0KSB7XG5cdHRhcmdldCA9IHRhcmdldCB8fCBkb2N1bWVudC5ib2R5O1xuXG5cdGlmIChkZWJ1Zykge1xuXHRcdGNvbnNvbGUubG9nKCdvLXZpZXdwb3J0JywgZXZlbnRUeXBlLCBkYXRhKTtcblx0fVxuXG5cdHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1ZpZXdwb3J0LicgKyBldmVudFR5cGUsIHtcblx0XHRkZXRhaWw6IGRhdGEsXG5cdFx0YnViYmxlczogdHJ1ZVxuXHR9KSk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IGhlaWdodC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgaGVpZ2h0LlxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xufVxuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGhcbiogQHJldHVybiB7bnVtYmVyfVxuKi9cbmZ1bmN0aW9uIGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xufVxuXG4vKipcbiAqIFZpZXdwb3J0IHNpemUuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTaXplXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0XG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGhcbiAqL1xuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aCBhbmQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aC9oZWlnaHQuXG4qIEByZXR1cm4ge1NpemV9XG4qL1xuZnVuY3Rpb24gZ2V0U2l6ZShpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycyksXG5cdFx0d2lkdGg6IGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpXG5cdH07XG59XG5cbi8qKlxuICogU2Nyb2xsIHBvc2l0aW9uLlxuICogQHR5cGVkZWYge09iamVjdH0gU2Nyb2xsUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHRgXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZWZ0IC0gYHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b3AgLSBgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZYFxuICovXG5cbi8qKlxuICogQHJldHVybiB7U2Nyb2xsUG9zaXRpb259XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG5cdFx0d2lkdGg6IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsXG5cdFx0bGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYLFxuXHRcdHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZXG5cdH07XG59XG5cbi8qKlxuICogQHJldHVybiB7c3RyaW5nfSAtICdwb3J0cmFpdCcgb3IgJ2xhbmRzY2FwZSdcbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oKSB7XG5cdGNvbnN0IG9yaWVudGF0aW9uID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbjtcblx0aWYgKG9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBvcmllbnRhdGlvbiA9PT0gJ3N0cmluZycgP1xuXHRcdFx0b3JpZW50YXRpb24uc3BsaXQoJy0nKVswXSA6XG5cdFx0XHRvcmllbnRhdGlvbi50eXBlLnNwbGl0KCctJylbMF07XG5cdH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcblx0XHRyZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcyA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZ2V0SGVpZ2h0KCkgPj0gZ2V0V2lkdGgoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgdmlld3BvcnQgaXMgdmlzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRWaXNpYmlsaXR5KCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuaGlkZGVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRkZWJ1ZyA9IHRydWU7XG5cdH0sXG5cdGJyb2FkY2FzdCxcblx0Z2V0V2lkdGgsXG5cdGdldEhlaWdodCxcblx0Z2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHksXG5cdGdldE9yaWVudGF0aW9uLFxuXHRkZWJvdW5jZTogVXRpbHMuZGVib3VuY2UsXG5cdHRocm90dGxlOiBVdGlscy50aHJvdHRsZVxufTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuL3NyYy91dGlscy5qcyc7XG5cbmNvbnN0IHRocm90dGxlID0gdXRpbHMudGhyb3R0bGU7XG5jb25zdCBkZWJvdW5jZSA9IHV0aWxzLmRlYm91bmNlO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSB7fTtcbmNvbnN0IGludGVydmFscyA9IHtcblx0cmVzaXplOiAxMDAsXG5cdG9yaWVudGF0aW9uOiAxMDAsXG5cdHZpc2liaWxpdHk6IDEwMCxcblx0c2Nyb2xsOiAxMDBcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byB0aHJvdHRsZSBmb3IgdGhpcyBkdXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbCAtIFRoZSBkdXJhdGlvbiB0byB0aHJvdHRsZSBpbiBtcy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIFx0ICAgLy8gdGhyb3R0bGUgZm9yIGRpZmZlcmVudCBldmVudHMgYXQgZGlmZmVyZW50IGR1cmF0aW9uc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIDEwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCAzMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCAzMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgMzApXG4gKiBcdFx0Ly8gdGhyb3R0bGUgYWxsIGV2ZW50cyBhdCAzMG1zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgzMCk7XG4gKi9cbmZ1bmN0aW9uIHNldFRocm90dGxlSW50ZXJ2YWwoZXZlbnRUeXBlLCBpbnRlcnZhbCkge1xuXHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicpIHtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCBhcmd1bWVudHNbMF0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIGFyZ3VtZW50c1sxXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCBhcmd1bWVudHNbMl0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCBhcmd1bWVudHNbM10pO1xuXHR9IGVsc2UgaWYgKGludGVydmFsKSB7XG5cdFx0aW50ZXJ2YWxzW2V2ZW50VHlwZV0gPSBpbnRlcnZhbDtcblx0fVxufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Jlc2l6ZSgpIHtcblx0aWYgKGxpc3RlbmVycy5yZXNpemUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgncmVzaXplJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5yZXNpemUpO1xuXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnJlc2l6ZSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvT3JpZW50YXRpb24oKSB7XG5cblx0aWYgKGxpc3RlbmVycy5vcmllbnRhdGlvbikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdvcmllbnRhdGlvbmNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnb3JpZW50YXRpb24nLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMub3JpZW50YXRpb24pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5vcmllbnRhdGlvbiA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvVmlzaWJpbGl0eSgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnZpc2liaWxpdHkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgndmlzaWJpbGl0eScsIHtcblx0XHRcdGhpZGRlbjogdXRpbHMuZ2V0VmlzaWJpbGl0eSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnZpc2liaWxpdHkpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cblx0bGlzdGVuZXJzLnZpc2liaWxpdHkgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Njcm9sbCgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnNjcm9sbCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdzY3JvbGwnO1xuXHRjb25zdCBoYW5kbGVyID0gdGhyb3R0bGUoZnVuY3Rpb24oZXYpIHtcblx0XHRjb25zdCBzY3JvbGxQb3MgPSB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbigpO1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnc2Nyb2xsJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdHNjcm9sbEhlaWdodDogc2Nyb2xsUG9zLmhlaWdodCxcblx0XHRcdHNjcm9sbExlZnQ6IHNjcm9sbFBvcy5sZWZ0LFxuXHRcdFx0c2Nyb2xsVG9wOiBzY3JvbGxQb3MudG9wLFxuXHRcdFx0c2Nyb2xsV2lkdGg6IHNjcm9sbFBvcy53aWR0aCxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5zY3JvbGwpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5zY3JvbGwgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0YXJ0IGxpc3RlbmluZyBmb3IuIE9uZSBvZiBgcmVzaXplYCwgYHNjcm9sbGAsIGBvcmllbnRhdGlvbmAsIGB2aXNpYmlsaXR5YCBvciBgYWxsYC5cbiAqIEBleGFtcGxlXG4gKiBcdFx0Ly8gU3RhcnQgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygnYWxsJyk7XG4gKlxuICogXHRcdC8vIEl0IGlzIG5vdyBwb3NzaWJsZSB0byBsaXN0ZW4gZm9yIGRlYm91bmNlIG8tdmlld3BvcnQgZXZlbnRzIHN1Y2ggYXMgYG9WaWV3cG9ydC5vcmllbnRhdGlvbmAuXG4gKiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0Lm9yaWVudGF0aW9uJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAqICAgICAgXHRjb25zb2xlLmxvZyhldmVudC50eXBlKTsgLy8gb1ZpZXdwb3J0Lm9yaWVudGF0aW9uXG4gKiAgICAgIH0pO1xuICovXG5mdW5jdGlvbiBsaXN0ZW5UbyhldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Jlc2l6ZScgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvUmVzaXplKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAnc2Nyb2xsJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9TY3JvbGwoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdvcmllbnRhdGlvbicgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvT3JpZW50YXRpb24oKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICd2aXNpYmlsaXR5JyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9WaXNpYmlsaXR5KCk7XG5cdH1cbn1cblxuLyoqXG4gKiBTdG9wIGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0b3AgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqIFx0XHQvLyBXZSdyZSBkb25lLiBTdG9wIGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQuc3RvcExpc3RlbmluZ1RvKCdhbGwnKTtcbiAqL1xuZnVuY3Rpb24gc3RvcExpc3RlbmluZ1RvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaChzdG9wTGlzdGVuaW5nVG8pO1xuXHR9IGVsc2UgaWYgKGxpc3RlbmVyc1tldmVudFR5cGVdKSB7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXJzW2V2ZW50VHlwZV0uZXZlbnRUeXBlLCBsaXN0ZW5lcnNbZXZlbnRUeXBlXS5oYW5kbGVyKTtcblx0XHRkZWxldGUgbGlzdGVuZXJzW2V2ZW50VHlwZV07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24gKCkge1xuXHRcdHV0aWxzLmRlYnVnKCk7XG5cdH0sXG5cdGxpc3RlblRvLFxuXHRzdG9wTGlzdGVuaW5nVG8sXG5cdHNldFRocm90dGxlSW50ZXJ2YWwsXG5cdGdldE9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbixcblx0Z2V0U2l6ZTogdXRpbHMuZ2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb246IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5OiB1dGlscy5nZXRWaXNpYmlsaXR5XG59O1xuIiwiaW1wb3J0IG9HcmlkIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby1ncmlkJztcbmltcG9ydCBvVmlld3BvcnQgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXZpZXdwb3J0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCAoY2FsbGJhY2spIHtcblx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdyZXNpemUnKTtcblxuXHRsZXQgbGFzdEJyZWFrcG9pbnQgPSBvR3JpZC5nZXRDdXJyZW50TGF5b3V0KCk7XG5cblx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQucmVzaXplJywgKCkgPT4ge1xuXHRcdGNvbnN0IGJyZWFrcG9pbnQgPSBvR3JpZC5nZXRDdXJyZW50TGF5b3V0KCk7XG5cblx0XHRpZiAoYnJlYWtwb2ludCAhPT0gbGFzdEJyZWFrcG9pbnQpIHtcblx0XHRcdGNhbGxiYWNrKGJyZWFrcG9pbnQpO1xuXHRcdFx0bGFzdEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuXHRcdH1cblx0fSk7XG5cblx0Y2FsbGJhY2sobGFzdEJyZWFrcG9pbnQpO1xufVxuIiwiaW1wb3J0IFRvZ2dsZSBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdG9nZ2xlJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi9sYXlvdXQuanMnO1xuXG5cbmNvbnN0IENPTExBUFNJQkxFX0JSRUFLUE9JTlRTID0gWydkZWZhdWx0JywgJ1hTJywgJ1MnXTtcblxuY2xhc3MgRm9vdGVyIHtcblxuXHRjb25zdHJ1Y3RvciAoZm9vdGVyRWwpIHtcblx0XHRpZiAoIWZvb3RlckVsKSB7XG5cdFx0XHRmb290ZXJFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1mb290ZXJcIl0nKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBmb290ZXJFbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGZvb3RlckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb290ZXJFbCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5mb290ZXJFbCA9IGZvb3RlckVsO1xuXG5cdFx0bGF5b3V0KGJyZWFrcG9pbnQgPT4ge1xuXHRcdFx0Y29uc3Qgc2hvdWxkQ29sbGFwc2UgPSBGb290ZXIuc2hvdWxkQ29sbGFwc2UoYnJlYWtwb2ludCk7XG5cblx0XHRcdGlmIChzaG91bGRDb2xsYXBzZSAmJiAhdGhpcy5fdG9nZ2xlcykge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zZXR1cCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXNob3VsZENvbGxhcHNlICYmIHRoaXMuX3RvZ2dsZXMpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5mb290ZXJFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtby1mb290ZXItLW5vLWpzJyk7XG5cdFx0dGhpcy5mb290ZXJFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1mb290ZXItLWpzJywgJycpO1xuXHR9XG5cblx0c2V0dXAgKCkge1xuXHRcdHRoaXMuX3RvZ2dsZXMgPSBbXTtcblxuXHRcdGNvbnN0IHRvZ2dsZUVscyA9IHRoaXMuZm9vdGVyRWwucXVlcnlTZWxlY3RvckFsbCgnW2FyaWEtY29udHJvbHNdJyk7XG5cblx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRvZ2dsZUVscywgdG9nZ2xlRWwgPT4ge1xuXHRcdFx0Y29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodG9nZ2xlRWwuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpO1xuXHRcdFx0dG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuXHRcdFx0dG9nZ2xlRWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHR0aGlzLl90b2dnbGVzLnB1c2gobmV3IFRvZ2dsZSh0b2dnbGVFbCwgeyB0YXJnZXQgfSkpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVzdHJveSAoKSB7XG5cdFx0dGhpcy5fdG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB0b2dnbGUuZGVzdHJveSgpKTtcblx0XHR0aGlzLl90b2dnbGVzID0gbnVsbDtcblx0fVxuXG5cdHN0YXRpYyBnZXQgY29sbGFwc2libGVCcmVha3BvaW50cygpe1xuXHRcdHJldHVybiBDT0xMQVBTSUJMRV9CUkVBS1BPSU5UUztcblx0fVxuXG5cdHN0YXRpYyBzaG91bGRDb2xsYXBzZShicmVha3BvaW50KSB7XG5cdFx0cmV0dXJuIENPTExBUFNJQkxFX0JSRUFLUE9JTlRTLmluZGV4T2YoYnJlYWtwb2ludCkgIT09IC0xO1xuXHR9XG5cblx0c3RhdGljIGluaXQgKHJvb3RFbCkge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHJvb3RFbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRjb25zdCBmb290ZXJFbCA9IHJvb3RFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tZm9vdGVyXCJdJyk7XG5cblx0XHRpZiAoZm9vdGVyRWwpIHtcblx0XHRcdHJldHVybiBuZXcgRm9vdGVyKGZvb3RlckVsKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyO1xuIiwiaW1wb3J0IEZvb3RlciBmcm9tICcuL3NyYy9qcy9mb290ZXIuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSAoKSA9PiB7XG5cdEZvb3Rlci5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBGb290ZXI7XG4iLCJpbXBvcnQgJy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTmFtZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc05hbWUucmVwbGFjZSgnY29yZScsICdlbmhhbmNlZCcpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7XG4iXX0=