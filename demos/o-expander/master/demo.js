function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // ../../libraries/o-utils/main.js
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
  }; // src/js/expander-utility.js

  var count = 0;

  var ExpanderUtility = /*#__PURE__*/function () {
    "use strict";

    function ExpanderUtility(oExpanderElement, opts) {
      var _this3 = this;

      _classCallCheck(this, ExpanderUtility);

      if (!(oExpanderElement instanceof Element)) {
        throw new Error("Expected an expander Element.");
      }

      if (_typeof(opts) !== "object") {
        throw new Error("Expected an `opts` object, found type of \"".concat(_typeof(opts), "\"."));
      }

      this._currentState = null;
      this.options = Object.assign({}, {
        shrinkTo: "height",
        toggleState: "all"
      }, opts);

      if (!isNaN(this.options.shrinkTo)) {
        this.options.shrinkTo = Number(this.options.shrinkTo);
      }

      var requiredSelectors = ["toggle", "content"];

      if (typeof this.options.shrinkTo === "number") {
        requiredSelectors.push("item");
      }

      var actualSelectors = Object.keys(opts.selectors);
      var missingSelectors = requiredSelectors.filter(function (s) {
        return actualSelectors.indexOf(s) === -1;
      });

      if (_typeof(opts.selectors) !== "object" || missingSelectors.length) {
        throw new Error("Expected the following \"selectors\" to be specified within the options object \"".concat(requiredSelectors, "\", missing \"").concat(missingSelectors, "\"."));
      }

      var requiredClassnames = ["initialized", "inactive", "expanded", "collapsed"];

      if (typeof this.options.shrinkTo === "number") {
        requiredClassnames.push("collapsibleItem");
      }

      var actualClassnames = Object.keys(opts.classnames);
      var missingClassnames = requiredClassnames.filter(function (s) {
        return actualClassnames.indexOf(s) === -1;
      });

      if (_typeof(opts.selectors) !== "object" || missingClassnames.length) {
        throw new Error("Expected the following \"classnames\" to be specified within the options object \"".concat(requiredClassnames, "\", missing \"").concat(missingClassnames, "\"."));
      }

      if (!this.options.expandedToggleText) {
        switch (this.options.shrinkTo) {
          case "hidden":
            this.options.expandedToggleText = "hide";
            break;

          case "height":
            this.options.expandedToggleText = "less";
            break;

          default:
            this.options.expandedToggleText = "fewer";
            break;
        }
      }

      if (!this.options.collapsedToggleText) {
        this.options.collapsedToggleText = this.options.shrinkTo === "hidden" ? "show" : "more";
      }

      this.oExpanderElement = oExpanderElement;
      this.contentElement = this.oExpanderElement.querySelector(this.options.selectors.content);
      this.toggles = [].slice.apply(this.oExpanderElement.querySelectorAll(this.options.selectors.toggle));

      if (!this.toggles.length) {
        throw new Error("o-expander needs a toggle link or button. None were found for toggle selector \"".concat(this.options.selectors.toggle, "\"."));
      }

      this.id = this.contentElement.id;

      if (!this.id) {
        while (document.querySelector("#o-expander__toggle--" + count)) {
          count++;
        }

        this.id = this.contentElement.id = "o-expander__toggle--" + count;
      }

      this.toggles.forEach(function (toggle) {
        return toggle.setAttribute("aria-controls", _this3.id);
      });
      this.toggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
          return _this3.toggle();
        });
      });

      if (this.options.shrinkTo === "height") {
        main_default.listenTo("resize");
        main_default.listenTo("orientation");
        document.body.addEventListener("oViewport.orientation", function () {
          return _this3.apply();
        });
        document.body.addEventListener("oViewport.resize", function () {
          return _this3.apply();
        });
      }

      this.oExpanderElement.classList.add(this.options.classnames.initialized);
      this.apply(true);

      this._dispatchEvent("init");
    }

    _createClass(ExpanderUtility, [{
      key: "apply",
      value: function apply(isSilent) {
        var _this4 = this;

        if (!this._isActive()) {
          this.oExpanderElement.classList.add(this.options.classnames.inactive);
        } else {
          this.oExpanderElement.classList.remove(this.options.classnames.inactive);

          if (typeof this.options.shrinkTo === "number") {
            var collapsibleCountElements = this._getCollapseableItems();

            collapsibleCountElements.forEach(function (el) {
              return el.classList.add(_this4.options.classnames.collapsibleItem);
            });
          }

          if (this.isCollapsed()) {
            this.collapse(isSilent);
          } else {
            this.expand(isSilent);
          }
        }
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.isCollapsed()) {
          this.expand();
        } else {
          this.collapse();
        }
      }
    }, {
      key: "expand",
      value: function expand(isSilent) {
        this._setExpandedState("expand", isSilent);
      }
    }, {
      key: "collapse",
      value: function collapse(isSilent) {
        this._setExpandedState("collapse", isSilent);
      }
    }, {
      key: "isCollapsed",
      value: function isCollapsed() {
        if (this._currentState) {
          return this._currentState === "collapse";
        }

        if (this.options.shrinkTo === "hidden") {
          return this.contentElement.getAttribute("aria-hidden") !== "false";
        }

        return !this.contentElement.classList.contains(this.options.classnames.expanded);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this5 = this;

        if (this.options.shrinkTo === "height") {
          document.body.removeEventListener("oViewport.orientation", function () {
            return _this5.apply();
          });
          document.body.removeEventListener("oViewport.resize", function () {
            return _this5.apply();
          });
        }

        this.toggles.forEach(function (toggle) {
          toggle.removeEventListener("click", _this5.toggle);
          toggle.removeAttribute("aria-controls");
          toggle.removeAttribute("aria-expanded");
        });
        this.contentElement.removeAttribute("aria-hidden");
        this.contentElement.classList.remove(this.options.classnames.expanded);
        this.contentElement.classList.remove(this.options.classnames.collapsed);
        this.oExpanderElement.classList.remove(this.options.classnames.initialized);
      }
    }, {
      key: "_getCollapseableItems",
      value: function _getCollapseableItems() {
        var allCountElements = this._getItems();

        return Array.from(allCountElements).splice(this.options.shrinkTo);
      }
    }, {
      key: "_getItems",
      value: function _getItems() {
        if (typeof this.options.shrinkTo !== "number") {
          throw new Error("Can not get items for an expander which is not based on a number of items.");
        }

        return this.contentElement.querySelectorAll(this.options.selectors.item);
      }
    }, {
      key: "_isActive",
      value: function _isActive() {
        if (this.options.shrinkTo === "hidden") {
          return true;
        }

        if (typeof this.options.shrinkTo === "number") {
          var items = this._getItems();

          return items.length > this.options.shrinkTo;
        }

        var overflows = false;

        if (this.isCollapsed()) {
          overflows = this.contentElement.clientHeight < this.contentElement.scrollHeight;
        } else {
          this.collapse();
          overflows = this.contentElement.clientHeight < this.contentElement.scrollHeight;
          this.expand();
        }

        return overflows;
      }
    }, {
      key: "_setExpandedState",
      value: function _setExpandedState(state, isSilent) {
        var _this6 = this;

        this._currentState = state;
        this.contentElement.classList.toggle(this.options.classnames.expanded, state === "expand");
        this.contentElement.classList.toggle(this.options.classnames.collapsed, state !== "expand");
        var ariaHidden = state === "expand" ? "false" : "true";

        if (this.options.shrinkTo === "hidden") {
          this.contentElement.setAttribute("aria-hidden", ariaHidden);
        }

        if (typeof this.options.shrinkTo === "number") {
          var collapsibleCountElements = this._getCollapseableItems();

          collapsibleCountElements.forEach(function (el) {
            return el.setAttribute("aria-hidden", ariaHidden);
          });
        }

        if (this.options.toggleState !== "none") {
          this.toggles.forEach(function (toggle) {
            if (_this6.options.toggleState !== "aria") {
              toggle.innerHTML = state === "expand" ? _this6.options.expandedToggleText : _this6.options.collapsedToggleText;
            }

            toggle.setAttribute("aria-expanded", state === "expand" ? "true" : "false");
          });
        }

        if (!isSilent) {
          this._dispatchEvent(state);
        }
      }
    }, {
      key: "_dispatchEvent",
      value: function _dispatchEvent(name) {
        this.oExpanderElement.dispatchEvent(new CustomEvent("oExpander." + name, {
          bubbles: true
        }));
      }
    }]);

    return ExpanderUtility;
  }();

  var expander_utility_default = ExpanderUtility; // src/js/expander.js

  var Expander = /*#__PURE__*/function (_expander_utility_def) {
    "use strict";

    _inherits(Expander, _expander_utility_def);

    var _super = _createSuper(Expander);

    function Expander(oExpanderElement, opts) {
      _classCallCheck(this, Expander);

      var userOptions = opts || Expander._getDataAttributes(oExpanderElement);

      return _super.call(this, oExpanderElement, Object.assign(userOptions, {
        selectors: {
          toggle: ".o-expander__toggle",
          content: ".o-expander__content",
          item: userOptions.itemSelector || "li"
        },
        classnames: {
          initialized: "o-expander--initialized",
          inactive: "o-expander--inactive",
          expanded: "o-expander__content--expanded",
          collapsed: "o-expander__content--collapsed",
          collapsibleItem: "o-expander__collapsible-item"
        }
      }));
    }

    _createClass(Expander, null, [{
      key: "createCustom",
      value: function createCustom(oExpanderElement, opts) {
        return new expander_utility_default(oExpanderElement, opts);
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

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-expander]")) {
          return new Expander(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-expander"]'), function (rootEl2) {
          return new Expander(rootEl2, opts);
        });
      }
    }, {
      key: "_getDataAttributes",
      value: function _getDataAttributes(oExpanderElement) {
        if (!(oExpanderElement instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(oExpanderElement.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oExpander(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = oExpanderElement.dataset[key];

          try {
            options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
          } catch (error) {
            options[shortKey] = value;
          }

          return options;
        }, {});
      }
    }]);

    return Expander;
  }(expander_utility_default);

  var expander_default = Expander; // main.js

  var constructAll = function constructAll() {
    expander_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsInNyYy9qcy9leHBhbmRlci11dGlsaXR5LmpzIiwic3JjL2pzL2V4cGFuZGVyLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLFdBQUEsUUFBQSxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUM3QixRQUFJLE9BQUo7QUFDQSxXQUFPLFlBQVc7QUFBQTs7QUFDakIsVUFBTSxJQUFBLEdBQU8sU0FBYjs7QUFDQSxVQUFNLEtBQUEsR0FBUSxTQUFSLEtBQVEsR0FBTTtBQUNuQixRQUFBLE9BQUEsR0FBVSxJQUFWO0FBQ0EsUUFBQSxJQUFBLENBQUssS0FBTCxDQUFXLEtBQVgsRUFBaUIsSUFBakI7QUFBaUIsT0FGbEI7O0FBSUEsTUFBQSxZQUFBLENBQWEsT0FBYixDQUFBO0FBQ0EsTUFBQSxPQUFBLEdBQVUsVUFBQSxDQUFXLEtBQVgsRUFBa0IsSUFBbEIsQ0FBVjtBQUE0QixLQVA3QjtBQU82Qjs7QUFnQjlCLFdBQUEsUUFBQSxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUM3QixRQUFJLE9BQUo7QUFDQSxXQUFPLFlBQVc7QUFBQTs7QUFDakIsVUFBSSxPQUFKLEVBQWE7QUFDWjtBQUFBOztBQUVELFVBQU0sSUFBQSxHQUFPLFNBQWI7O0FBQ0EsVUFBTSxLQUFBLEdBQVEsU0FBUixLQUFRLEdBQU07QUFDbkIsUUFBQSxPQUFBLEdBQVUsSUFBVjtBQUNBLFFBQUEsSUFBQSxDQUFLLEtBQUwsQ0FBVyxNQUFYLEVBQWlCLElBQWpCO0FBQWlCLE9BRmxCOztBQUtBLE1BQUEsT0FBQSxHQUFVLFVBQUEsQ0FBVyxLQUFYLEVBQWtCLElBQWxCLENBQVY7QUFBNEIsS0FWN0I7QUFV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QUFILEtBQW1CLEVBQWxDO0FBQUEsV0FBcEMsQ0FBakI7QUFDQSxjQUFNLEtBQUEsR0FBUSxnQkFBQSxDQUFpQixPQUFqQixDQUF5QixHQUF6QixDQUFkOztBQUVBLGNBQUk7QUFDSCxZQUFBLE9BQUEsQ0FBUSxRQUFSLENBQUEsR0FBb0IsSUFBQSxDQUFLLEtBQUwsQ0FBVyxLQUFBLENBQU0sT0FBTixDQUFjLEtBQWQsRUFBcUIsR0FBckIsQ0FBWCxDQUFwQjtBQUFvRCxXQURyRCxDQUNxRCxPQUM1QyxLQUQ0QyxFQUNuRDtBQUNELFlBQUEsT0FBQSxDQUFRLFFBQVIsQ0FBQSxHQUFvQixLQUFwQjtBQUFvQjs7QUFFckIsaUJBQU8sT0FBUDtBQUFPLFNBZEQsRUFlSixFQWZJLENBQVA7QUFlRztBQTNGTDs7QUFBQTtBQUFBLElBQXVCLHdCQUF2QixDQUFBOztBQStGQSxNQUFPLGdCQUFBLEdBQVEsUUFBZixDOztBQy9GQSxNQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsR0FBWTtBQUNoQyxJQUFBLGdCQUFBLENBQVMsSUFBVDtBQUNBLElBQUEsUUFBQSxDQUFTLG1CQUFULENBQTZCLG9CQUE3QixFQUFtRCxZQUFuRDtBQUFtRCxHQUZwRDs7QUFLQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsRUFBZ0QsWUFBaEQsRTs7QUNMQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNuRCxJQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQUksV0FBSixDQUFnQixvQkFBaEIsQ0FBdkI7QUFBdUMsR0FEeEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbipcbiogRGVib3VuY2VzIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIGFmdGVyIG4gbWlsbGlzZWNvbmRzXG4qIHdpdGhvdXQgaXQgbm90IGJlaW5nIGNhbGxlZFxuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy5kZWJvdW5jZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBkZWJvdW5jZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBEZWJvdW5jZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbi8qKlxuKlxuKiBUaHJvdHRsZSBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLnRocm90dGxlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIHRocm90dGxlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIFRocm90dGxlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbmV4cG9ydCB7XG5cdGRlYm91bmNlLFxuXHR0aHJvdHRsZVxufTtcbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby11dGlscyc7XG5cbmxldCBkZWJ1ZztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICovXG5mdW5jdGlvbiBicm9hZGNhc3QoZXZlbnRUeXBlLCBkYXRhLCB0YXJnZXQpIHtcblx0dGFyZ2V0ID0gdGFyZ2V0IHx8IGRvY3VtZW50LmJvZHk7XG5cblx0aWYgKGRlYnVnKSB7XG5cdFx0Y29uc29sZS5sb2coJ28tdmlld3BvcnQnLCBldmVudFR5cGUsIGRhdGEpO1xuXHR9XG5cblx0dGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvVmlld3BvcnQuJyArIGV2ZW50VHlwZSwge1xuXHRcdGRldGFpbDogZGF0YSxcblx0XHRidWJibGVzOiB0cnVlXG5cdH0pKTtcbn1cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciBoZWlnaHQuXG4qIEByZXR1cm4ge251bWJlcn1cbiovXG5mdW5jdGlvbiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoLlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aFxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG59XG5cbi8qKlxuICogVmlld3BvcnQgc2l6ZS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNpemVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aFxuICovXG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoIGFuZCBoZWlnaHQuXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoL2hlaWdodC5cbiogQHJldHVybiB7U2l6ZX1cbiovXG5mdW5jdGlvbiBnZXRTaXplKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSxcblx0XHR3aWR0aDogZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycylcblx0fTtcbn1cblxuLyoqXG4gKiBTY3JvbGwgcG9zaXRpb24uXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTY3JvbGxQb3NpdGlvblxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxlZnQgLSBgd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRvcCAtIGB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlgXG4gKi9cblxuLyoqXG4gKiBAcmV0dXJuIHtTY3JvbGxQb3NpdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcblx0XHR3aWR0aDogZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCxcblx0XHRsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFgsXG5cdFx0dG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlcblx0fTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gJ3BvcnRyYWl0JyBvciAnbGFuZHNjYXBlJ1xuICovXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbigpIHtcblx0Y29uc3Qgb3JpZW50YXRpb24gPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uO1xuXHRpZiAob3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9yaWVudGF0aW9uID09PSAnc3RyaW5nJyA/XG5cdFx0XHRvcmllbnRhdGlvbi5zcGxpdCgnLScpWzBdIDpcblx0XHRcdG9yaWVudGF0aW9uLnR5cGUuc3BsaXQoJy0nKVswXTtcblx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xuXHRcdHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBnZXRIZWlnaHQoKSA+PSBnZXRXaWR0aCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9XG59XG5cbi8qKlxuICogQHJldHVybiB7Ym9vbGVhbn0gLSB0cnVlIGlmIHRoZSB2aWV3cG9ydCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFZpc2liaWxpdHkoKSB7XG5cdHJldHVybiBkb2N1bWVudC5oaWRkZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGRlYnVnID0gdHJ1ZTtcblx0fSxcblx0YnJvYWRjYXN0LFxuXHRnZXRXaWR0aCxcblx0Z2V0SGVpZ2h0LFxuXHRnZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eSxcblx0Z2V0T3JpZW50YXRpb24sXG5cdGRlYm91bmNlOiBVdGlscy5kZWJvdW5jZSxcblx0dGhyb3R0bGU6IFV0aWxzLnRocm90dGxlXG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vc3JjL3V0aWxzLmpzJztcblxuY29uc3QgdGhyb3R0bGUgPSB1dGlscy50aHJvdHRsZTtcbmNvbnN0IGRlYm91bmNlID0gdXRpbHMuZGVib3VuY2U7XG5cbmNvbnN0IGxpc3RlbmVycyA9IHt9O1xuY29uc3QgaW50ZXJ2YWxzID0ge1xuXHRyZXNpemU6IDEwMCxcblx0b3JpZW50YXRpb246IDEwMCxcblx0dmlzaWJpbGl0eTogMTAwLFxuXHRzY3JvbGw6IDEwMFxufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IHRvIHRocm90dGxlIGZvciB0aGlzIGR1cmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsIC0gVGhlIGR1cmF0aW9uIHRvIHRocm90dGxlIGluIG1zLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogXHQgICAvLyB0aHJvdHRsZSBmb3IgZGlmZmVyZW50IGV2ZW50cyBhdCBkaWZmZXJlbnQgZHVyYXRpb25zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgMTAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIDMwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIDMwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCAzMClcbiAqIFx0XHQvLyB0aHJvdHRsZSBhbGwgZXZlbnRzIGF0IDMwbXNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKDMwKTtcbiAqL1xuZnVuY3Rpb24gc2V0VGhyb3R0bGVJbnRlcnZhbChldmVudFR5cGUsIGludGVydmFsKSB7XG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJykge1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIGFyZ3VtZW50c1swXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgYXJndW1lbnRzWzFdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIGFyZ3VtZW50c1syXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIGFyZ3VtZW50c1szXSk7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwpIHtcblx0XHRpbnRlcnZhbHNbZXZlbnRUeXBlXSA9IGludGVydmFsO1xuXHR9XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvUmVzaXplKCkge1xuXHRpZiAobGlzdGVuZXJzLnJlc2l6ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdyZXNpemUnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnJlc2l6ZSk7XG5cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMucmVzaXplID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9PcmllbnRhdGlvbigpIHtcblxuXHRpZiAobGlzdGVuZXJzLm9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ29yaWVudGF0aW9uY2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdvcmllbnRhdGlvbicsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24oKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5vcmllbnRhdGlvbik7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLm9yaWVudGF0aW9uID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9WaXNpYmlsaXR5KCkge1xuXG5cdGlmIChsaXN0ZW5lcnMudmlzaWJpbGl0eSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCd2aXNpYmlsaXR5Jywge1xuXHRcdFx0aGlkZGVuOiB1dGlscy5nZXRWaXNpYmlsaXR5KCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMudmlzaWJpbGl0eSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuXHRsaXN0ZW5lcnMudmlzaWJpbGl0eSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvU2Nyb2xsKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMuc2Nyb2xsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Njcm9sbCc7XG5cdGNvbnN0IGhhbmRsZXIgPSB0aHJvdHRsZShmdW5jdGlvbihldikge1xuXHRcdGNvbnN0IHNjcm9sbFBvcyA9IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdzY3JvbGwnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0c2Nyb2xsSGVpZ2h0OiBzY3JvbGxQb3MuaGVpZ2h0LFxuXHRcdFx0c2Nyb2xsTGVmdDogc2Nyb2xsUG9zLmxlZnQsXG5cdFx0XHRzY3JvbGxUb3A6IHNjcm9sbFBvcy50b3AsXG5cdFx0XHRzY3JvbGxXaWR0aDogc2Nyb2xsUG9zLndpZHRoLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnNjcm9sbCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnNjcm9sbCA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RhcnQgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqXG4gKiBcdFx0Ly8gSXQgaXMgbm93IHBvc3NpYmxlIHRvIGxpc3RlbiBmb3IgZGVib3VuY2Ugby12aWV3cG9ydCBldmVudHMgc3VjaCBhcyBgb1ZpZXdwb3J0Lm9yaWVudGF0aW9uYC5cbiAqICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQub3JpZW50YXRpb24nLCBmdW5jdGlvbihldmVudCkge1xuICogICAgICBcdGNvbnNvbGUubG9nKGV2ZW50LnR5cGUpOyAvLyBvVmlld3BvcnQub3JpZW50YXRpb25cbiAqICAgICAgfSk7XG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAncmVzaXplJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9SZXNpemUoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdzY3JvbGwnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Njcm9sbCgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ29yaWVudGF0aW9uJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9PcmllbnRhdGlvbigpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Zpc2liaWxpdHknIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Zpc2liaWxpdHkoKTtcblx0fVxufVxuXG4vKipcbiAqIFN0b3AgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RvcCBsaXN0ZW5pbmcgZm9yLiBPbmUgb2YgYHJlc2l6ZWAsIGBzY3JvbGxgLCBgb3JpZW50YXRpb25gLCBgdmlzaWJpbGl0eWAgb3IgYGFsbGAuXG4gKiBAZXhhbXBsZVxuICogXHRcdC8vIFN0YXJ0IGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ2FsbCcpO1xuICogXHRcdC8vIFdlJ3JlIGRvbmUuIFN0b3AgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5zdG9wTGlzdGVuaW5nVG8oJ2FsbCcpO1xuICovXG5mdW5jdGlvbiBzdG9wTGlzdGVuaW5nVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0T2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKHN0b3BMaXN0ZW5pbmdUbyk7XG5cdH0gZWxzZSBpZiAobGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcnNbZXZlbnRUeXBlXS5ldmVudFR5cGUsIGxpc3RlbmVyc1tldmVudFR5cGVdLmhhbmRsZXIpO1xuXHRcdGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRUeXBlXTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbiAoKSB7XG5cdFx0dXRpbHMuZGVidWcoKTtcblx0fSxcblx0bGlzdGVuVG8sXG5cdHN0b3BMaXN0ZW5pbmdUbyxcblx0c2V0VGhyb3R0bGVJbnRlcnZhbCxcblx0Z2V0T3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uLFxuXHRnZXRTaXplOiB1dGlscy5nZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbjogdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHk6IHV0aWxzLmdldFZpc2liaWxpdHlcbn07XG4iLCJpbXBvcnQgdmlld3BvcnQgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXZpZXdwb3J0JztcblxuLy8gVXNlZCB0byBjcmVhdGUgYSB1bmlxdWUgby1leHBhbmRlciBpZC5cbmxldCBjb3VudCA9IDA7XG5cbmNsYXNzIEV4cGFuZGVyVXRpbGl0eSB7XG5cblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvRXhwYW5kZXJFbGVtZW50IC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBvcHRzLnNocmlua1RvIFsnaGVpZ2h0J10gLSBUaGUgZXhwYW5kZXIgY29sbGFwc2UgbWV0aG9kLCBcImhlaWdodFwiLCBcImhpZGRlblwiLCBvciBhIG51bWJlciBvZiBpdGVtcy5cblx0ICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBvcHRzLnRvZ2dsZVN0YXRlIFsnYWxsJ10gLSBIb3cgdG8gdXBkYXRlIHRoZSBleHBhbmRlciB0b2dnbGVzOiBcImFsbFwiIHRvIHVwZGF0ZSB0ZXh0IGFuZCBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZXMsIFwiYXJpYVwiIHRvIHVwZGF0ZSBvbmx5IGFyaWEtZXhwYW5kZWQgYXR0cmlidXRlcywgXCJub25lXCIgdG8gYXZvaWQgdXBkYXRpbmcgdG9nZ2xlcyBvbiBjbGljay5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuZXhwYW5kZWRUb2dnbGVUZXh0IFsnZmV3ZXInXSAtIFRvZ2dsZSB0ZXh0IHdoZW4gdGhlIGV4cGFuZGVyIGlzIGNvbGxhcHNlZC4gRGVmYXVsdHMgdG8gXCJmZXdlclwiLCBvciBcImxlc3NcIiB3aGVuIGBzaHJpbmtUb2AgaXMgXCJoZWlnaHRcIiwgb3IgXCJoaWRkZW5cIiB3aGVuIGBzaHJpbmtUb2AgaXMgXCJoaWRkZW5cIi5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuY29sbGFwc2VkVG9nZ2xlVGV4dCBbJ21vcmUnXSAtIFRvZ2dsZSB0ZXh0IHdoZW4gdGhlIGV4cGFuZGVyIGlzIGNvbGxhcHNlZC4gRGVmYXVsdHMgdG8gXCJtb3JlXCIgb3IgXCJzaG93XCIgd2hlbiBgc2hyaW5rVG9gIGlzIFwiaGlkZGVuXCIuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLnNlbGVjdG9ycyAtIFRoZSBzZWxlY3RvcnMgZm9yIGV4cGFuZGVyIGVsZW1lbnRzLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5zZWxlY3RvcnMudG9nZ2xlIC0gQSBzZWxlY3RvciBmb3IgdGhlIGV4cGFuZGVycyB0b2dnbGVzIGUuZy4gYC5teS1leHBhbmRlcl9fdG9nZ2xlYC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuc2VsZWN0b3JzLmNvbnRlbnQgLSBBIHNlbGVjdG9yIGZvciB0aGUgZXhwYW5kZXJzIGNvbnRlbnQsIHdoaWNoIHdpbGwgY29sbGFwc2Ugb3IgZXhwYW5kIGUuZy4gYC5teS1leHBhbmRlcl9fY29udGVudGAuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnNlbGVjdG9ycy5pdGVtIC0gQSBzZWxlY3RvciBmb3IgdGhlIGl0ZW1zIHdpdGhpbiB0aGUgZXhwYW5kZXIgY29udGVudCBlLmcuIGBsaWAgKHJlcXVpcmVkIG9ubHkgd2hlbiBgc2hyaW5rVG9gIGlzIHNldCB0byBhIG51bWJlcikuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLmNsYXNzbmFtZXMgLSBUaGUgY2xhc3NuYW1lcyB0byBhcHBseSB0byB0aGUgZXhwYW5kZXIgZm9yIGRpZmZlcmVudCBzdGF0ZXMuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmNsYXNzbmFtZXMuaW5pdGlhbGl6ZWQgLSBUaGUgY2xhc3MgdG8gYXBwbHkgdG8gdGhlIHRvcCBsZXZlbCBvZiB0aGUgZXhwYW5kZXIgd2hlbiBpbml0aWFsaXNlZCBieSBKUyBlLmcuIGAubXktZXhwYW5kZXItLWluaXRpYWxpemVkYC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuY2xhc3NuYW1lcy5pbmFjdGl2ZSAtIFRoZSBjbGFzcyB0byBhcHBseSB0byB0aGUgdG9wIGxldmVsIG9mIHRoZSBleHBhbmRlciB3aGVuIGl0IGNhbiBub3QgZXhwYW5kIG9yIGNvbGxhcHNlIGUuZy4gYC5teS1leHBhbmRlci0taW5hY3RpdmVgLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5jbGFzc25hbWVzLmV4cGFuZGVkIC0gVGhlIGNsYXNzIHRvIGFwcGx5IHRvIHRoZSBleHBhbmRlciBjb250ZW50IHdoZW4gaXQgaXMgZXhwYW5kZWQgZS5nLiBgLm15LWV4cGFuZGVyLS1leHBhbmRlZGAuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmNsYXNzbmFtZXMuY29sbGFwc2VkIC0gVGhlIGNsYXNzIHRvIGFwcGx5IHRvIHRoZSBleHBhbmRlciBjb250ZW50IHdoZW4gaXQgaXMgY29sbGFwc2VkIEpTIGUuZy4gYC5teS1leHBhbmRlci0tY29sbGFwc2VkYC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuY2xhc3NuYW1lcy5jb2xsYXBzaWJsZUl0ZW0gLSBUaGUgY2xhc3MgdG8gYXBwbHkgdG8gYW55IGl0ZW0gKHNlZSB0aGUgYHNlbGVjdG9ycy5pdGVtYCBvcHRpb24pIHdoaWNoIHdpbGwgYmUgaGlkZGVuIHdoZW4gY29sbGFwc2VkIGUuZy4gYC5teS1leHBhbmRlcl9fY29sbGFwc2libGUtaXRlbWAgKHJlcXVpcmVkIG9ubHkgd2hlbiBgc2hyaW5rVG9gIGlzIHNldCB0byBhIG51bWJlcikuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihvRXhwYW5kZXJFbGVtZW50LCBvcHRzKSB7XG5cdFx0Ly8gRXJyb3IgaWYgdGhlIGV4cGFuZGVyIGVsZW1lbnQgaXMgbm90IGFuIGVsZW1lbnQuXG5cdFx0aWYoIShvRXhwYW5kZXJFbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYW4gZXhwYW5kZXIgRWxlbWVudC4nKTtcblx0XHR9XG5cblx0XHQvLyBFcnJvciBpZiBubyBvcHRpb25zIGFyZSBnaXZlbi5cblx0XHRpZiAodHlwZW9mIG9wdHMgIT09ICdvYmplY3QnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGFuIFxcYG9wdHNcXGAgb2JqZWN0LCBmb3VuZCB0eXBlIG9mIFwiJHt0eXBlb2Ygb3B0c31cIi5gKTtcblx0XHR9XG5cblx0XHQvLyBTZXQgZXhwYW5kZXIgc3RhdGUuXG5cdFx0Ly8gJ2V4cGFuZGVkJywgJ2NvbGxhcHNlZCcsIG9yICdudWxsJztcblx0XHR0aGlzLl9jdXJyZW50U3RhdGUgPSBudWxsO1xuXG5cdFx0Ly8gR2V0IGNvbmZpZ3VyYWJsZSBvcHRpb25zLlxuXHRcdHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtcblx0XHRcdHNocmlua1RvOiAnaGVpZ2h0Jyxcblx0XHRcdHRvZ2dsZVN0YXRlOiAnYWxsJyxcblx0XHR9LCBvcHRzKTtcblxuXHRcdC8vIElmIGBzaHJpbmtUb2AgaXMgYSBudW1iZXIsIGNhc3QgdG8gYW4gYWN0dWFsIG51bWJlciB1c2luZyB0aGVcblx0XHQvLyB1bmFyeSBvcGVyYXRvciBgK2AuIEkuZSBzbyBgdHlwZW9mYCByZXR1cm5zIGBudW1iZXJgLlxuXHRcdGlmICghaXNOYU4odGhpcy5vcHRpb25zLnNocmlua1RvKSkge1xuXHRcdFx0dGhpcy5vcHRpb25zLnNocmlua1RvID0gTnVtYmVyKHRoaXMub3B0aW9ucy5zaHJpbmtUbyk7XG5cdFx0fVxuXG5cdFx0Ly8gVmFsaWRhdGUgdGhlIHJlcXVpcmVkIHNlbGVjdG9ycyBhcmUgY29uZmlndXJlZC5cblx0XHQvLyBUaGUgYGl0ZW1gIHNlbGVjdG9yIGlzIG9ubHkgcmVxdWlyZWQgaWYgdGhpcyBleHBhbmRlciBpcyBhXG5cdFx0Ly8gXCJudW1iZXJcIiBleHBhbmRlciwgaS5lLiBiYXNlZCBvbiB0aGUgbnVtYmVyIG9mIHZpc2libGUgY29udGVudCBpdGVtcy5cblx0XHRjb25zdCByZXF1aXJlZFNlbGVjdG9ycyA9IFsndG9nZ2xlJywgJ2NvbnRlbnQnXTtcblx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9PT0gJ251bWJlcicpIHtcblx0XHRcdHJlcXVpcmVkU2VsZWN0b3JzLnB1c2goYGl0ZW1gKTtcblx0XHR9XG5cdFx0Y29uc3QgYWN0dWFsU2VsZWN0b3JzID0gT2JqZWN0LmtleXMob3B0cy5zZWxlY3RvcnMpO1xuXHRcdGNvbnN0IG1pc3NpbmdTZWxlY3RvcnMgPSByZXF1aXJlZFNlbGVjdG9ycy5maWx0ZXIocyA9PiBhY3R1YWxTZWxlY3RvcnMuaW5kZXhPZihzKSA9PT0gLTEpO1xuXHRcdGlmICh0eXBlb2Ygb3B0cy5zZWxlY3RvcnMgIT09ICdvYmplY3QnIHx8IG1pc3NpbmdTZWxlY3RvcnMubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIHRoZSBmb2xsb3dpbmcgXCJzZWxlY3RvcnNcIiB0byBiZSBzcGVjaWZpZWQgd2l0aGluIHRoZSBvcHRpb25zIG9iamVjdCBcIiR7cmVxdWlyZWRTZWxlY3RvcnN9XCIsIG1pc3NpbmcgXCIke21pc3NpbmdTZWxlY3RvcnN9XCIuYCk7XG5cdFx0fVxuXG5cdFx0Ly8gVmFsaWRhdGUgdGhlIHJlcXVpcmVkIGNsYXNzbmFtZXMgYXJlIGNvbmZpZ3VyZWQuXG5cdFx0Ly8gVGhlIGBjb2xsYXBzaWJsZUl0ZW1gIGNsYXNzIGlzIG9ubHkgcmVxdWlyZWQgaWYgdGhpcyBleHBhbmRlciBpcyBhXG5cdFx0Ly8gXCJudW1iZXJcIiBleHBhbmRlciwgaS5lLiBiYXNlZCBvbiB0aGUgbnVtYmVyIG9mIHZpc2libGUgY29udGVudCBpdGVtcy5cblx0XHRjb25zdCByZXF1aXJlZENsYXNzbmFtZXMgPSBbXG5cdFx0XHQnaW5pdGlhbGl6ZWQnLFxuXHRcdFx0J2luYWN0aXZlJyxcblx0XHRcdCdleHBhbmRlZCcsXG5cdFx0XHQnY29sbGFwc2VkJ1xuXHRcdF07XG5cdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2hyaW5rVG8gPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXF1aXJlZENsYXNzbmFtZXMucHVzaChgY29sbGFwc2libGVJdGVtYCk7XG5cdFx0fVxuXHRcdGNvbnN0IGFjdHVhbENsYXNzbmFtZXMgPSBPYmplY3Qua2V5cyhvcHRzLmNsYXNzbmFtZXMpO1xuXHRcdGNvbnN0IG1pc3NpbmdDbGFzc25hbWVzID0gcmVxdWlyZWRDbGFzc25hbWVzLmZpbHRlcihzID0+IGFjdHVhbENsYXNzbmFtZXMuaW5kZXhPZihzKSA9PT0gLTEpO1xuXHRcdGlmICh0eXBlb2Ygb3B0cy5zZWxlY3RvcnMgIT09ICdvYmplY3QnIHx8IG1pc3NpbmdDbGFzc25hbWVzLmxlbmd0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCB0aGUgZm9sbG93aW5nIFwiY2xhc3NuYW1lc1wiIHRvIGJlIHNwZWNpZmllZCB3aXRoaW4gdGhlIG9wdGlvbnMgb2JqZWN0IFwiJHtyZXF1aXJlZENsYXNzbmFtZXN9XCIsIG1pc3NpbmcgXCIke21pc3NpbmdDbGFzc25hbWVzfVwiLmApO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSB1c2VyIGhhcyBub3QgY29uZmlndXJlZCB0b2dnbGUgdGV4dCBmb3IgdGhlIGV4cGFuZGVkIHN0YXRlLFxuXHRcdC8vIHNldCBpdCBiYXNlZCBvbiB0aGUgXCJzaHJpbmtUb1wiIG9wdGlvbjogXCJoaWRlXCIgd2hlbiBoaWRpbmcgY29sbGFwc2VkXG5cdFx0Ly8gaXRlbXM7IFwibGVzc1wiIHdoZW4gb2JzY3VyaW5nIGJ5IHJlZHVjaW5nIHRoZSBjb250YWluZXIgaGVpZ2h0IGJ5IGFcblx0XHQvLyBnaXZlbiB2YWx1ZTsgXCJmZXdlclwiIG90aGVyd2lzZS5cblx0XHRpZiAoIXRoaXMub3B0aW9ucy5leHBhbmRlZFRvZ2dsZVRleHQpIHtcblx0XHRcdHN3aXRjaCAodGhpcy5vcHRpb25zLnNocmlua1RvKSB7XG5cdFx0XHRcdGNhc2UgJ2hpZGRlbic6XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmV4cGFuZGVkVG9nZ2xlVGV4dCA9ICdoaWRlJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnaGVpZ2h0Jzpcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuZXhwYW5kZWRUb2dnbGVUZXh0ID0gJ2xlc3MnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRoaXMub3B0aW9ucy5leHBhbmRlZFRvZ2dsZVRleHQgPSAnZmV3ZXInO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElmIHRoZSB1c2VyIGhhcyBub3QgY29uZmlndXJlZCB0b2dnbGUgdGV4dCBmb3IgdGhlIGNvbGxhcHNlZCBzdGF0ZSxcblx0XHQvLyBzZXQgaXQgYmFzZWQgb24gdGhlIFwic2hyaW5rVG9cIiBvcHRpb246IFwic2hvd1wiIGhpZGluZyBjb2xsYXBzZWQgaXRlbXM7XG5cdFx0Ly8gb3IgXCJtb3JlXCIgd2hlbiBjb2xsYXBzaW5nIHRvIGEgaGVpZ2h0LlxuXHRcdGlmICghdGhpcy5vcHRpb25zLmNvbGxhcHNlZFRvZ2dsZVRleHQpIHtcblx0XHRcdHRoaXMub3B0aW9ucy5jb2xsYXBzZWRUb2dnbGVUZXh0ID0gdGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnaGlkZGVuJyA/ICdzaG93JyA6ICdtb3JlJztcblx0XHR9XG5cblx0XHQvLyBFbGVtZW50cy5cblx0XHR0aGlzLm9FeHBhbmRlckVsZW1lbnQgPSBvRXhwYW5kZXJFbGVtZW50O1xuXHRcdHRoaXMuY29udGVudEVsZW1lbnQgPSB0aGlzLm9FeHBhbmRlckVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLm9wdGlvbnMuc2VsZWN0b3JzLmNvbnRlbnQpO1xuXHRcdHRoaXMudG9nZ2xlcyA9IFtdLnNsaWNlLmFwcGx5KHRoaXMub0V4cGFuZGVyRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3RvcnMudG9nZ2xlKSk7XG5cdFx0aWYgKCF0aGlzLnRvZ2dsZXMubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdCdvLWV4cGFuZGVyIG5lZWRzIGEgdG9nZ2xlIGxpbmsgb3IgYnV0dG9uLiAnICtcblx0XHRcdFx0YE5vbmUgd2VyZSBmb3VuZCBmb3IgdG9nZ2xlIHNlbGVjdG9yIFwiJHt0aGlzLm9wdGlvbnMuc2VsZWN0b3JzLnRvZ2dsZX1cIi5gXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8vIFNldCBgYXJpYS1jb250cm9sc2Agb24gZWFjaCB0b2dnbGUgdXNpbmcgZXhwYW5kZXIgaWRzLlxuXHRcdHRoaXMuaWQgPSB0aGlzLmNvbnRlbnRFbGVtZW50LmlkO1xuXHRcdGlmICghdGhpcy5pZCkge1xuXHRcdFx0d2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvLWV4cGFuZGVyX190b2dnbGUtLScgKyBjb3VudCkpIHtcblx0XHRcdFx0Y291bnQrKztcblx0XHRcdH1cblx0XHRcdHRoaXMuaWQgPSB0aGlzLmNvbnRlbnRFbGVtZW50LmlkID0gJ28tZXhwYW5kZXJfX3RvZ2dsZS0tJyArIGNvdW50O1xuXHRcdH1cblx0XHR0aGlzLnRvZ2dsZXMuZm9yRWFjaCh0b2dnbGUgPT4gdG9nZ2xlLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRoaXMuaWQpKTtcblxuXHRcdC8vIEFkZCBhIGNsaWNrIGV2ZW50IHRvIGVhY2ggdG9nZ2xlLlxuXHRcdHRoaXMudG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XG5cdFx0XHR0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZSgpKTtcblx0XHR9KTtcblxuXHRcdC8vIElmIHNocmlua2luZyBiYXNlZCBvbiBhIGhlaWdodCBzZXQgaW4gY3NzLCByZWFwcGx5IHRoZSBleHBhbmRlciBvblxuXHRcdC8vIG9yaWVudGF0aW9uIGFuZCByZXNpemUgZXZlbnRzLlxuXHRcdGlmICh0aGlzLm9wdGlvbnMuc2hyaW5rVG8gPT09ICdoZWlnaHQnKSB7XG5cdFx0XHR2aWV3cG9ydC5saXN0ZW5UbygncmVzaXplJyk7XG5cdFx0XHR2aWV3cG9ydC5saXN0ZW5Ubygnb3JpZW50YXRpb24nKTtcblx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0Lm9yaWVudGF0aW9uJywgKCkgPT4gdGhpcy5hcHBseSgpKTtcblx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0LnJlc2l6ZScsICgpID0+IHRoaXMuYXBwbHkoKSk7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIGEgY2xhc3MgdG8gaW5kaWNhdGUgdGhlIGV4cGFuZGVyIGlzIGluaXRpYWxpc2VkLCB3aGljaFxuXHRcdC8vIG1heSBiZSBzdHlsZWQgYWdhaW5zdCBmb3IgcHJvZ3Jlc3NpdmUgZW5oYW5jZW1lbnQgKHdlIHNob3VsZG4ndCBoaWRlXG5cdFx0Ly8gY29udGVudCB3aGVuIHRoZSBleHBhbmRlciBmYWlscyB0byBsb2FkKS5cblx0XHR0aGlzLm9FeHBhbmRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3NuYW1lcy5pbml0aWFsaXplZCk7XG5cblx0XHQvLyBBcHBseSB0aGUgY29uZmlndXJlZCBleHBhbmRlci5cblx0XHR0aGlzLmFwcGx5KHRydWUpO1xuXG5cdFx0Ly8gU2V0dXAuIEZpcmUgdGhlIGBvRXhwYW5kZXIuaW5pdGAgZXZlbnQuXG5cdFx0dGhpcy5fZGlzcGF0Y2hFdmVudCgnaW5pdCcpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlY2FsY3VsYXRlIGFuZCBhcHBseSB0aGUgc3R5bGVzIHRvIGV4cGFuZCBvciBjb2xsYXBzZSB0aGUgZXhwYW5kZXJcblx0ICogYWNjb3JkaW5nIHRvIGl0cyBjdXJyZW50IHN0YXRlLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGlzU2lsZW50IFtmYWxzZV0gU2V0IHRvIHRydWUgdG8gYXZvaWQgZmlyaW5nIHRoZSBgb0V4cGFuZGVyLmV4cGFuZGAgb3IgYG9FeHBhbmRlci5jb2xsYXBzZWAgZXZlbnRzLlxuXHQgKi9cblx0YXBwbHkoaXNTaWxlbnQpIHtcblx0XHRpZiAoIXRoaXMuX2lzQWN0aXZlKCkpIHtcblx0XHRcdHRoaXMub0V4cGFuZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5jbGFzc25hbWVzLmluYWN0aXZlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9SZW1vdmUgdGhlIGluYWN0aXZlIGNsYXNzLCB0aGlzIGV4cGFuZGVyIG1heSBiZSB0b2dnbGVkLlxuXHRcdFx0dGhpcy5vRXhwYW5kZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLmNsYXNzbmFtZXMuaW5hY3RpdmUpO1xuXHRcdFx0Ly8gTWFyayBjb2xsYXBzaWJsZSBpdGVtcyB3aXRoIHRoZSBgby1leHBhbmRlcl9fY29sbGFwc2libGUtaXRlbWAgY2xhc3NuYW1lcy5cblx0XHRcdGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjb25zdCBjb2xsYXBzaWJsZUNvdW50RWxlbWVudHMgPSB0aGlzLl9nZXRDb2xsYXBzZWFibGVJdGVtcygpO1xuXHRcdFx0XHRjb2xsYXBzaWJsZUNvdW50RWxlbWVudHMuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5jbGFzc25hbWVzLmNvbGxhcHNpYmxlSXRlbSkpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQ29sbGFwc2Ugb3IgZXhwYW5kLlxuXHRcdFx0aWYgKHRoaXMuaXNDb2xsYXBzZWQoKSkge1xuXHRcdFx0XHR0aGlzLmNvbGxhcHNlKGlzU2lsZW50KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuZXhwYW5kKGlzU2lsZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVG9nZ2xlIHRoZSBleHBhbmRlciBzbyBleHBhbmRzIG9yLCBpZiBpdCdzIGFscmVhZHkgZXhwYW5kZWQsIGNvbGxhcHNlcy5cblx0ICovXG5cdHRvZ2dsZSgpIHtcblx0XHRpZiAodGhpcy5pc0NvbGxhcHNlZCgpKSB7XG5cdFx0XHR0aGlzLmV4cGFuZCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNvbGxhcHNlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEV4cGFuZCB0aGUgZXhwYW5kZXIuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNTaWxlbnQgW2ZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBhdm9pZCBmaXJpbmcgdGhlIGBvRXhwYW5kZXIuZXhwYW5kYCBldmVudC5cblx0ICovXG5cdGV4cGFuZChpc1NpbGVudCkge1xuXHRcdHRoaXMuX3NldEV4cGFuZGVkU3RhdGUoJ2V4cGFuZCcsIGlzU2lsZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb2xsYXBzZSB0aGUgZXhwYW5kZXIuXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNTaWxlbnQgW2ZhbHNlXSBTZXQgdG8gdHJ1ZSB0byBhdm9pZCBmaXJpbmcgdGhlIGBvRXhwYW5kZXIuY29sbGFwc2VgIGV2ZW50LlxuXHQgKi9cblx0Y29sbGFwc2UoaXNTaWxlbnQpIHtcblx0XHR0aGlzLl9zZXRFeHBhbmRlZFN0YXRlKCdjb2xsYXBzZScsIGlzU2lsZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZXhwYW5kZXIgaXMgY3VycmVudGx5IGNvbGxhcHNlLlxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICovXG5cdGlzQ29sbGFwc2VkKCkge1xuXHRcdC8vIElmIHRoZSBleHBhbmRlciBoYXMgYmVlbiBydW4gd2Ugc3RvcmUgdGhlIGN1cnJlbnQgc3RhdGUuXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnRTdGF0ZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZSA9PT0gJ2NvbGxhcHNlJztcblx0XHR9XG5cdFx0Ly8gSWYgbm90IGNoZWNrIGZvciBkb20gYXR0cmlidXRlcyB0byBkZWNpZGUgaWYgdGhlIHVzZXIgaW50ZW5kc1xuXHRcdC8vIHRoZSBleHBhbmRlciB0byBiZSBleHBhbmRlZCBvciBjb2xsYXBzZWQgYnkgZGVmYXVsdC5cblx0XHRpZiAodGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnaGlkZGVuJykge1xuXHRcdFx0Ly8gQ2hlY2sgaXMgbm90IGZhbHNlIHNvIGhpZGRlbiBleHBhbmRlcnMgY29sbGFwc2UgYnkgZGVmYXVsdC5cblx0XHRcdHJldHVybiB0aGlzLmNvbnRlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSAhPT0gJ2ZhbHNlJztcblx0XHR9XG5cdFx0cmV0dXJuICF0aGlzLmNvbnRlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLm9wdGlvbnMuY2xhc3NuYW1lcy5leHBhbmRlZCk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIHRoZSBleHBhbmRlciBmcm9tIHRoZSBwYWdlLlxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnaGVpZ2h0Jykge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdvVmlld3BvcnQub3JpZW50YXRpb24nLCAoKSA9PiB0aGlzLmFwcGx5KCkpO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdvVmlld3BvcnQucmVzaXplJywgKCkgPT4gdGhpcy5hcHBseSgpKTtcblx0XHR9XG5cdFx0dGhpcy50b2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcblx0XHRcdHRvZ2dsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlKTtcblx0XHRcdHRvZ2dsZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcblx0XHRcdHRvZ2dsZS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcblx0XHR9KTtcblx0XHR0aGlzLmNvbnRlbnRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcblx0XHR0aGlzLmNvbnRlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLmNsYXNzbmFtZXMuZXhwYW5kZWQpO1xuXHRcdHRoaXMuY29udGVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMuY2xhc3NuYW1lcy5jb2xsYXBzZWQpO1xuXHRcdHRoaXMub0V4cGFuZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy5jbGFzc25hbWVzLmluaXRpYWxpemVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7QXJyYXk8RWxlbWVudD59IC0gQWxsIGNvbGxhcHNlYWJsZSBjb250ZW50IGl0ZW1zLlxuXHQgKi9cblx0X2dldENvbGxhcHNlYWJsZUl0ZW1zKCkge1xuXHRcdGNvbnN0IGFsbENvdW50RWxlbWVudHMgPSB0aGlzLl9nZXRJdGVtcygpO1xuXHRcdHJldHVybiBBcnJheS5mcm9tKGFsbENvdW50RWxlbWVudHMpLnNwbGljZSh0aGlzLm9wdGlvbnMuc2hyaW5rVG8pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm5zIHtBcnJheTxFbGVtZW50Pn0gLSBBbGwgY29udGVudCBpdGVtcy5cblx0ICovXG5cdF9nZXRJdGVtcygpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zaHJpbmtUbyAhPT0gJ251bWJlcicpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0J0NhbiBub3QgZ2V0IGl0ZW1zIGZvciBhbiBleHBhbmRlciB3aGljaCBpcyBub3QgYmFzZWQgb24gYSAnICtcblx0XHRcdFx0J251bWJlciBvZiBpdGVtcy4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jb250ZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3RvcnMuaXRlbSk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHdoZXRoZXIgdGhlIGV4cGFuZGVyIGhhcyBzb21ldGhpbmcgdG8gaGlkZSAvIHNob3cuXG5cdCAqIGkuZS4gaWYgZXhwYW5kaW5nL2NvbGxhcHNpbmcgd291bGQgZG8gYW55dGhpbmcuXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9pc0FjdGl2ZSgpIHtcblx0XHQvLyBBbiBleHBhbmRlciBtYXkgYWx3YXlzIHRvZ2dsZSBhbiBleHBhbmRlciB3aGljaCBoaWRlcyBpdGVtcy5cblx0XHRpZiAodGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnaGlkZGVuJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdC8vIEFuIGV4cGFuZGVyIGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gYSBjb250YWluZXIgbWF5IG9ubHlcblx0XHQvLyBjb2xsYXBzZSBpZiB0aGUgaXRlbXMgbGVuZ3RoIGV4Y2VlZHMgdGhlIG51bWJlciB0byBzaHJpbmsgdG8uIEkuZS5cblx0XHQvLyBhIGxpc3Qgb2YgMiBjYW4ndCBjb2xsYXBzZSB0byA1LlxuXHRcdGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnbnVtYmVyJykge1xuXHRcdFx0Y29uc3QgaXRlbXMgPSB0aGlzLl9nZXRJdGVtcygpO1xuXHRcdFx0cmV0dXJuIGl0ZW1zLmxlbmd0aCA+IHRoaXMub3B0aW9ucy5zaHJpbmtUbztcblx0XHR9XG5cdFx0Ly8gSWYgdGhlIGV4cGFuZGVyIGlzIGJhc2VkIG9uIGEgaGVpZ2h0IHRoZW4gY2hlY2sgdGhlIGNvbnRlbnQgb3ZlcmZsb3dzXG5cdFx0Ly8gdGhlIGNvbnRlbnQgY29udGFpbmVyLlxuXHRcdGxldCBvdmVyZmxvd3MgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5pc0NvbGxhcHNlZCgpKSB7XG5cdFx0XHRvdmVyZmxvd3MgPSB0aGlzLmNvbnRlbnRFbGVtZW50LmNsaWVudEhlaWdodCA8IHRoaXMuY29udGVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmNvbGxhcHNlKCk7XG5cdFx0XHRvdmVyZmxvd3MgPSB0aGlzLmNvbnRlbnRFbGVtZW50LmNsaWVudEhlaWdodCA8IHRoaXMuY29udGVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXHRcdFx0dGhpcy5leHBhbmQoKTtcblx0XHR9XG5cdFx0cmV0dXJuIG92ZXJmbG93cztcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmQgb3IgY29sbGFwc2UgdGhlIGV4cGFuZGVyLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHN0YXRlIFwiZXhwYW5kXCIgb3IgXCJjb2xsYXBzZVwiLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGlzU2lsZW50IFtmYWxzZV0gU2V0IHRvIHRydWUgdG8gYXZvaWQgZmlyaW5nIHRoZSBgb0V4cGFuZGVyLmNvbGxhcHNlYCBvciBgb0V4cGFuZGVyLmV4cGFuZGAgZXZlbnRzLlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9zZXRFeHBhbmRlZFN0YXRlKHN0YXRlLCBpc1NpbGVudCkge1xuXHRcdC8vIFJlY29yZCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgZXhwYW5kZXIuXG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG5cdFx0Ly8gVG9nZ2xlIGV4cGFuZGVkIGFuZCBjb2xsYXBzZWQgY2xhc3Nlcy5cblx0XHR0aGlzLmNvbnRlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUodGhpcy5vcHRpb25zLmNsYXNzbmFtZXMuZXhwYW5kZWQsIHN0YXRlID09PSAnZXhwYW5kJyk7XG5cdFx0dGhpcy5jb250ZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMub3B0aW9ucy5jbGFzc25hbWVzLmNvbGxhcHNlZCwgc3RhdGUgIT09ICdleHBhbmQnKTtcblx0XHQvLyBTZXQgYGFyaWEtaGlkZGVuYC5cblx0XHRjb25zdCBhcmlhSGlkZGVuID0gc3RhdGUgPT09ICdleHBhbmQnID8gJ2ZhbHNlJyA6ICd0cnVlJztcblx0XHQvLyBJZiB0b2dnbGluZyBhbGwgY29udGVudCBzZXQgYGFyaWEtaGlkZGVuYCBvbiB0aGUgY29udGVudCBlbGVtZW50LlxuXHRcdGlmICh0aGlzLm9wdGlvbnMuc2hyaW5rVG8gPT09ICdoaWRkZW4nKSB7XG5cdFx0XHR0aGlzLmNvbnRlbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhcmlhSGlkZGVuKTtcblx0XHR9XG5cdFx0Ly8gSWYgdG9nZ2xpbmcgZWxlbWVudHMgYmFzZWQgb24gdGhlIG51bWJlciBvZiBpdGVtcywgc2V0IGBhcmlhLWhpZGRlbmBcblx0XHQvLyBvbiBjb2xsYXBzZWFibGUgaXRlbXMuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2hyaW5rVG8gPT09ICdudW1iZXInKSB7XG5cdFx0XHRjb25zdCBjb2xsYXBzaWJsZUNvdW50RWxlbWVudHMgPSB0aGlzLl9nZXRDb2xsYXBzZWFibGVJdGVtcygpO1xuXHRcdFx0Y29sbGFwc2libGVDb3VudEVsZW1lbnRzLmZvckVhY2goZWwgPT5cblx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGFyaWFIaWRkZW4pXG5cdFx0XHQpO1xuXHRcdH1cblx0XHQvLyBTZXQgdGhlIHRvZ2dsZSB0ZXh0IGFuZCBgYXJpYS1leHBhbmRlZGAgYXR0cmlidXRlLlxuXHRcdGlmICh0aGlzLm9wdGlvbnMudG9nZ2xlU3RhdGUgIT09ICdub25lJykge1xuXHRcdFx0dGhpcy50b2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcblx0XHRcdFx0aWYgKHRoaXMub3B0aW9ucy50b2dnbGVTdGF0ZSAhPT0gJ2FyaWEnKSB7XG5cdFx0XHRcdFx0dG9nZ2xlLmlubmVySFRNTCA9IHN0YXRlID09PSAnZXhwYW5kJyA/XG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuZXhwYW5kZWRUb2dnbGVUZXh0IDpcblx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5jb2xsYXBzZWRUb2dnbGVUZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBzdGF0ZSA9PT0gJ2V4cGFuZCcgPyAndHJ1ZScgOiAnZmFsc2UnKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHQvLyBEaXNwYXRjaCBgb0V4cGFuZGVyLmNvbGxhcHNlYCBvciBgb0V4cGFuZGVyLmV4cGFuZGAgZXZlbnQuXG5cdFx0aWYgKCFpc1NpbGVudCkge1xuXHRcdFx0dGhpcy5fZGlzcGF0Y2hFdmVudChzdGF0ZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgYSBidWJibGluZyBvLWV4cGFuZGVyIGV2ZW50IHdpdGggdGhlIGNvcnJlY3QgbmFtZXNwYWNlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS4gRS5nLiBcImV4YW1wbGVcIiB3aWxsIGZpcmUgYW4gXCJvRXhwYW5kZXIuZXhhbXBsZVwiIGV2ZW50LlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9kaXNwYXRjaEV2ZW50KG5hbWUpIHtcblx0XHR0aGlzLm9FeHBhbmRlckVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29FeHBhbmRlci4nICsgbmFtZSwgeyBidWJibGVzOiB0cnVlIH0pKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGVyVXRpbGl0eTtcbiIsImltcG9ydCBFeHBhbmRlclV0aWxpdHkgZnJvbSAnLi9leHBhbmRlci11dGlsaXR5LmpzJztcblxuY2xhc3MgRXhwYW5kZXIgZXh0ZW5kcyBFeHBhbmRlclV0aWxpdHkge1xuXG5cdC8qKlxuXHQgKiBvLWV4cGFuZGVyIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvRXhwYW5kZXJFbGVtZW50IC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBvcHRzLnNocmlua1RvIFsnaGVpZ2h0J10gLSBUaGUgZXhwYW5kZXIgY29sbGFwc2UgbWV0aG9kLCBcImhlaWdodFwiLCBcImhpZGRlblwiLCBvciBhIG51bWJlciBvZiBpdGVtcy5cblx0ICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBvcHRzLnRvZ2dsZVN0YXRlIFsnYWxsJ10gLSBIb3cgdG8gdXBkYXRlIHRoZSBleHBhbmRlciB0b2dnbGVzOiBcImFsbFwiIHRvIHVwZGF0ZSB0ZXh0IGFuZCBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZXMsIFwiYXJpYVwiIHRvIHVwZGF0ZSBvbmx5IGFyaWEtZXhwYW5kZWQgYXR0cmlidXRlcywgXCJub25lXCIgdG8gYXZvaWQgdXBkYXRpbmcgdG9nZ2xlcyBvbiBjbGljay5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuaXRlbVNlbGVjdG9yIFsnbGknXSAtIEEgc2VsZWN0b3IgZm9yIHRoZSBleHBhbmRhYmxlIGl0ZW1zIHdoZW4gYHNocmlua1RvYCBpcyBzZXQgdG8gYSBudW1iZXIsIHJlbGF0aXZlIHRvIGAuby1leHBhbmRlcl9fY29udGVudGAuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmV4cGFuZGVkVG9nZ2xlVGV4dCBbJ2Zld2VyJ10gLSBUb2dnbGUgdGV4dCBmb3Igd2hlbiB0aGUgZXhwYW5kZXIgaXMgY29sbGFwc2VkLiBEZWZhdWx0cyB0byBcImZld2VyXCIsIG9yIFwibGVzc1wiIHdoZW4gYHNocmlua1RvYCBpcyBcImhlaWdodFwiLCBvciBcImhpZGRlblwiIHdoZW4gYHNocmlua1RvYCBpcyBcImhpZGRlblwiLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5jb2xsYXBzZWRUb2dnbGVUZXh0IFsnbW9yZSddIC0gVG9nZ2xlIHRleHQgZm9yIHdoZW4gdGhlIGV4cGFuZGVyIGlzIGNvbGxhcHNlZC4gRGVmYXVsdHMgdG8gXCJtb3JlXCIgb3IgXCJzaG93XCIgd2hlbiBgc2hyaW5rVG9gIGlzIFwiaGlkZGVuXCIuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciAob0V4cGFuZGVyRWxlbWVudCwgb3B0cykge1xuXHRcdC8vIEdldCB1c2VyIGNvbmZpZ3VyYXRpb24uXG5cdFx0Y29uc3QgdXNlck9wdGlvbnMgPSBvcHRzIHx8IEV4cGFuZGVyLl9nZXREYXRhQXR0cmlidXRlcyhvRXhwYW5kZXJFbGVtZW50KTtcblx0XHQvLyBJbml0aWFsaXNlIHdpdGggdXNlciBvcHRpb25zIGFuZCBvLWV4cGFuZGVyIGNsYXNzZXMgYW5kIHNlbGVjdG9ycy5cblx0XHQvLyBPbmx5IGBzZWxlY3RvcnMuaXRlbWAsIHdoaWNoIGlzIG5vdCBvLWV4cGFuZGVyIHNwZWNpZmljLCBpc1xuXHRcdC8vIGNvbmZpZ3VyYWJsZSBieSB0aGUgdXNlciB3aXRoIHRoZSBgaXRlbVNlbGVjdG9yYCBvcHRpb24uXG5cdFx0c3VwZXIob0V4cGFuZGVyRWxlbWVudCwgT2JqZWN0LmFzc2lnbih1c2VyT3B0aW9ucywge1xuXHRcdFx0c2VsZWN0b3JzOiB7XG5cdFx0XHRcdHRvZ2dsZTogJy5vLWV4cGFuZGVyX190b2dnbGUnLFxuXHRcdFx0XHRjb250ZW50OiAnLm8tZXhwYW5kZXJfX2NvbnRlbnQnLFxuXHRcdFx0XHRpdGVtOiB1c2VyT3B0aW9ucy5pdGVtU2VsZWN0b3IgfHwgJ2xpJyxcblx0XHRcdH0sXG5cdFx0XHRjbGFzc25hbWVzOiB7XG5cdFx0XHRcdGluaXRpYWxpemVkOiAnby1leHBhbmRlci0taW5pdGlhbGl6ZWQnLFxuXHRcdFx0XHRpbmFjdGl2ZTogJ28tZXhwYW5kZXItLWluYWN0aXZlJyxcblx0XHRcdFx0ZXhwYW5kZWQ6ICdvLWV4cGFuZGVyX19jb250ZW50LS1leHBhbmRlZCcsXG5cdFx0XHRcdGNvbGxhcHNlZDogJ28tZXhwYW5kZXJfX2NvbnRlbnQtLWNvbGxhcHNlZCcsXG5cdFx0XHRcdGNvbGxhcHNpYmxlSXRlbTogJ28tZXhwYW5kZXJfX2NvbGxhcHNpYmxlLWl0ZW0nXG5cdFx0XHR9XG5cdFx0fSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdCBhIGN1c3RvbSBleHBhbmRlci4gVXNlZnVsIHRvIGFkZCBjdXN0b21pc2VkIGV4cGFuZGVyXG5cdCAqIGZ1bmN0aW9uYWxpdHkgdG8gYSBjb21wb25lbnQuIEUuZy4gdG8gYW5pbWF0ZSBhd2F5IGNvbGxhcHNlZCBpdGVtc1xuXHQgKiByYXRoZXIgdGhhbiBoaWRlIHRoZW0gaW1tZWRpYXRlbHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9FeHBhbmRlckVsZW1lbnQgLSBUaGUgZXhwYW5kZXIgZWxlbWVudCBpbiB0aGUgRE9NLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0cyBbe31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBleHBhbmRlciBAc2VlIEV4cGFuZGVyVXRpbGl0eS5cblx0ICovXG5cdHN0YXRpYyBjcmVhdGVDdXN0b20ob0V4cGFuZGVyRWxlbWVudCwgb3B0cykge1xuXHRcdHJldHVybiBuZXcgRXhwYW5kZXJVdGlsaXR5KG9FeHBhbmRlckVsZW1lbnQsIG9wdHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8U3RyaW5nKX0gcm9vdEVsZW1lbnQgLSBUaGUgcm9vdCBlbGVtZW50IHRvIGluaXRpYWxpc2UgdGhlIGNvbXBvbmVudCBpbiwgb3IgYSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSByb290IGVsZW1lbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgW3t9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50XG5cdCAqIEByZXR1cm5zIHsoRXhwYW5kZXJ8QXJyYXk8RXhwYW5kZXI+KX0gLSBFeHBhbmRlciBpbnN0YW5jZShzKVxuXHQgKi9cblx0c3RhdGljIGluaXQocm9vdEVsLCBvcHRzKSB7XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpO1xuXHRcdH1cblx0XHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcm9vdEVsLm1hdGNoZXMoJ1tkYXRhLW8tY29tcG9uZW50PW8tZXhwYW5kZXJdJykpIHtcblx0XHRcdHJldHVybiBuZXcgRXhwYW5kZXIocm9vdEVsLCBvcHRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1leHBhbmRlclwiXScpLCByb290RWwgPT4gbmV3IEV4cGFuZGVyKHJvb3RFbCwgb3B0cykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIEV4cGFuZGVyRWxlbWVudC4gSWYgdGhlIGNvbXBvbmVudCBpcyBiZWluZyBzZXQgdXBcblx0ICogZGVjbGFyYXRpdmVseSwgdGhpcyBtZXRob2QgaXMgdXNlZCB0byBleHRyYWN0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvRXhwYW5kZXJFbGVtZW50IC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHJldHVybnMge09iamVjdH0gLSBEYXRhIGF0dHJpYnV0ZXMgYXMgYW4gb2JqZWN0XG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0c3RhdGljIF9nZXREYXRhQXR0cmlidXRlcyhvRXhwYW5kZXJFbGVtZW50KSB7XG5cdFx0aWYgKCEob0V4cGFuZGVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMob0V4cGFuZGVyRWxlbWVudC5kYXRhc2V0KS5yZWR1Y2UoKG9wdGlvbnMsIGtleSkgPT4ge1xuXHRcdFx0Ly8gSWdub3JlIGRhdGEtby1jb21wb25lbnRcblx0XHRcdGlmIChrZXkgPT09ICdvQ29tcG9uZW50Jykge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH1cblx0XHRcdC8vIEJ1aWxkIGEgY29uY2lzZSBrZXkgYW5kIGdldCB0aGUgb3B0aW9uIHZhbHVlXG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKC9eb0V4cGFuZGVyKFxcdykoXFx3KykkLywgKG0sIG0xLCBtMikgPT4gbTEudG9Mb3dlckNhc2UoKSArIG0yKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gb0V4cGFuZGVyRWxlbWVudC5kYXRhc2V0W2tleV07XG5cdFx0XHQvLyBUcnkgcGFyc2luZyB0aGUgdmFsdWUgYXMgSlNPTiwgb3RoZXJ3aXNlIGp1c3Qgc2V0IGl0IGFzIGEgc3RyaW5nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9LCB7fSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhwYW5kZXI7XG4iLCJpbXBvcnQgRXhwYW5kZXIgZnJvbSAnLi9zcmMvanMvZXhwYW5kZXIuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbiAoKSB7XG5cdEV4cGFuZGVyLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGVyO1xuIiwiaW1wb3J0ICcuLi8uLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pO1xuIl19