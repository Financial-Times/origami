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
  }; // ../o-expander/src/js/expander-utility.js

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

  var expander_utility_default = ExpanderUtility; // ../o-expander/src/js/expander.js

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

  var expander_default = Expander; // ../o-expander/main.js

  var constructAll = function constructAll() {
    expander_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default2 = expander_default; // src/js/subsCard.js

  var tallestTopHeight = 0;

  var SubsCard = /*#__PURE__*/function () {
    "use strict";

    function SubsCard(rootEl) {
      _classCallCheck(this, SubsCard);

      this.rootEl = rootEl;
      this.expander = null;
      this.setExpanders();
      this.checkTallest();
    }

    _createClass(SubsCard, [{
      key: "checkTallest",
      value: function checkTallest() {
        var top = this.rootEl.querySelector(".o-subs-card__top");

        if (top && top.clientHeight > tallestTopHeight) {
          tallestTopHeight = top.clientHeight;
        }
      }
    }, {
      key: "setExpanders",
      value: function setExpanders() {
        var expander = this.rootEl.querySelector(".o-subs-card__expander");
        var opts = {
          shrinkTo: "hidden",
          expandedToggleText: "Read less",
          collapsedToggleText: "Read more",
          toggleState: "all",
          selectors: {
            toggle: ".o-subs-card__read-more",
            content: ".o-subs-card__copy-details"
          },
          classnames: {
            initialized: "o-subs-card__expander--initialized",
            inactive: "o-subs-card__expander--inactive",
            expanded: "o-subs-card__expander--expanded",
            collapsed: "o-subs-card__expander--collapsed"
          }
        };
        expander.setAttribute("data-o-component", "o-expander");
        this.expander = main_default2.createCustom(expander, opts);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (this.expander) {
          this.expander.toggle();
        }
      }
    }, {
      key: "expand",
      value: function expand() {
        if (this.expander) {
          this.expander.expand();
        }
      }
    }, {
      key: "collapse",
      value: function collapse() {
        if (this.expander) {
          this.expander.collapse();
        }
      }
    }], [{
      key: "init",
      value: function init(rootEl) {
        if (!rootEl) {
          rootEl = document.body;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-subs-card]")) {
          return new SubsCard(rootEl);
        }

        var cards = Array.from(rootEl.querySelectorAll('[data-o-component="o-subs-card"]'), function (rootEl2) {
          return new SubsCard(rootEl2);
        });

        if (cards.length > 1) {
          SubsCard.matchHeights(cards);
        }

        return cards;
      }
    }, {
      key: "matchHeights",
      value: function matchHeights(cards) {
        for (var i = 0; i < cards.length; i++) {
          var cardTop = cards[i].rootEl.querySelector(".o-subs-card__top");
          cardTop.style.flex = "0 1 ".concat(tallestTopHeight, "px");
        }
      }
    }]);

    return SubsCard;
  }(); // main.js


  var constructAll2 = function constructAll2() {
    SubsCard.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll2);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll2); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    var cards = SubsCard.init();
    document.querySelector(".toggle-all").addEventListener("click", function () {
      cards.forEach(function (card) {
        return card.toggle();
      });
    });
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsIi4uL28tZXhwYW5kZXIvc3JjL2pzL2V4cGFuZGVyLXV0aWxpdHkuanMiLCIuLi9vLWV4cGFuZGVyL3NyYy9qcy9leHBhbmRlci5qcyIsIi4uL28tZXhwYW5kZXIvbWFpbi5qcyIsInNyYy9qcy9zdWJzQ2FyZC5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxXQUFBLFFBQUEsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEI7QUFDN0IsUUFBSSxPQUFKO0FBQ0EsV0FBTyxZQUFXO0FBQUE7O0FBQ2pCLFVBQU0sSUFBQSxHQUFPLFNBQWI7O0FBQ0EsVUFBTSxLQUFBLEdBQVEsU0FBUixLQUFRLEdBQU07QUFDbkIsUUFBQSxPQUFBLEdBQVUsSUFBVjtBQUNBLFFBQUEsSUFBQSxDQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWlCLElBQWpCO0FBQWlCLE9BRmxCOztBQUlBLE1BQUEsWUFBQSxDQUFhLE9BQWIsQ0FBQTtBQUNBLE1BQUEsT0FBQSxHQUFVLFVBQUEsQ0FBVyxLQUFYLEVBQWtCLElBQWxCLENBQVY7QUFBNEIsS0FQN0I7QUFPNkI7O0FBZ0I5QixXQUFBLFFBQUEsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEI7QUFDN0IsUUFBSSxPQUFKO0FBQ0EsV0FBTyxZQUFXO0FBQUE7O0FBQ2pCLFVBQUksT0FBSixFQUFhO0FBQ1o7QUFBQTs7QUFFRCxVQUFNLElBQUEsR0FBTyxTQUFiOztBQUNBLFVBQU0sS0FBQSxHQUFRLFNBQVIsS0FBUSxHQUFNO0FBQ25CLFFBQUEsT0FBQSxHQUFVLElBQVY7QUFDQSxRQUFBLElBQUEsQ0FBSyxLQUFMLENBQVcsTUFBWCxFQUFpQixJQUFqQjtBQUFpQixP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QUFqRi9COztBQUFBO0FBQUEsS0FBQSxDOzs7QUNGQSxNQUFNLGFBQUEsR0FBZSxTQUFmLGFBQWUsR0FBVztBQUMvQixJQUFBLFFBQUEsQ0FBUyxJQUFUO0FBQ0EsSUFBQSxRQUFBLENBQVMsbUJBQVQsQ0FBNkIsb0JBQTdCLEVBQW1ELGFBQW5EO0FBQW1ELEdBRnBEOztBQUtBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxhQUFoRCxFOztBQ0xBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hELFFBQU0sS0FBQSxHQUFRLFFBQUEsQ0FBUyxJQUFULEVBQWQ7QUFFQSxJQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxZQUFNO0FBQ3JFLE1BQUEsS0FBQSxDQUFNLE9BQU4sQ0FBYyxVQUFBLElBQUE7QUFBQSxlQUFRLElBQUEsQ0FBSyxNQUFMLEVBQVI7QUFBQSxPQUFkO0FBQTJCLEtBRDVCO0FBQzRCLEdBSjdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qXG4qIERlYm91bmNlcyBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBhZnRlciBuIG1pbGxpc2Vjb25kc1xuKiB3aXRob3V0IGl0IG5vdCBiZWluZyBjYWxsZWRcbipcbiogQGV4YW1wbGVcbiogVXRpbHMuZGVib3VuY2UobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gRGVib3VuY2VkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbipcbiogVGhyb3R0bGUgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgb25jZSBldmVyeSBuIG1pbGxpc2Vjb25kc1xuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy50aHJvdHRsZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBUaHJvdHRsZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdXRpbHMnO1xuXG5sZXQgZGVidWc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gYnJvYWRjYXN0KGV2ZW50VHlwZSwgZGF0YSwgdGFyZ2V0KSB7XG5cdHRhcmdldCA9IHRhcmdldCB8fCBkb2N1bWVudC5ib2R5O1xuXG5cdGlmIChkZWJ1Zykge1xuXHRcdGNvbnNvbGUubG9nKCdvLXZpZXdwb3J0JywgZXZlbnRUeXBlLCBkYXRhKTtcblx0fVxuXG5cdHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1ZpZXdwb3J0LicgKyBldmVudFR5cGUsIHtcblx0XHRkZXRhaWw6IGRhdGEsXG5cdFx0YnViYmxlczogdHJ1ZVxuXHR9KSk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IGhlaWdodC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgaGVpZ2h0LlxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xufVxuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGhcbiogQHJldHVybiB7bnVtYmVyfVxuKi9cbmZ1bmN0aW9uIGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xufVxuXG4vKipcbiAqIFZpZXdwb3J0IHNpemUuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTaXplXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0XG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGhcbiAqL1xuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aCBhbmQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aC9oZWlnaHQuXG4qIEByZXR1cm4ge1NpemV9XG4qL1xuZnVuY3Rpb24gZ2V0U2l6ZShpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycyksXG5cdFx0d2lkdGg6IGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpXG5cdH07XG59XG5cbi8qKlxuICogU2Nyb2xsIHBvc2l0aW9uLlxuICogQHR5cGVkZWYge09iamVjdH0gU2Nyb2xsUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHRgXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZWZ0IC0gYHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b3AgLSBgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZYFxuICovXG5cbi8qKlxuICogQHJldHVybiB7U2Nyb2xsUG9zaXRpb259XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG5cdFx0d2lkdGg6IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsXG5cdFx0bGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYLFxuXHRcdHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZXG5cdH07XG59XG5cbi8qKlxuICogQHJldHVybiB7c3RyaW5nfSAtICdwb3J0cmFpdCcgb3IgJ2xhbmRzY2FwZSdcbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oKSB7XG5cdGNvbnN0IG9yaWVudGF0aW9uID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbjtcblx0aWYgKG9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBvcmllbnRhdGlvbiA9PT0gJ3N0cmluZycgP1xuXHRcdFx0b3JpZW50YXRpb24uc3BsaXQoJy0nKVswXSA6XG5cdFx0XHRvcmllbnRhdGlvbi50eXBlLnNwbGl0KCctJylbMF07XG5cdH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcblx0XHRyZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcyA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZ2V0SGVpZ2h0KCkgPj0gZ2V0V2lkdGgoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgdmlld3BvcnQgaXMgdmlzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRWaXNpYmlsaXR5KCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuaGlkZGVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRkZWJ1ZyA9IHRydWU7XG5cdH0sXG5cdGJyb2FkY2FzdCxcblx0Z2V0V2lkdGgsXG5cdGdldEhlaWdodCxcblx0Z2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHksXG5cdGdldE9yaWVudGF0aW9uLFxuXHRkZWJvdW5jZTogVXRpbHMuZGVib3VuY2UsXG5cdHRocm90dGxlOiBVdGlscy50aHJvdHRsZVxufTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuL3NyYy91dGlscy5qcyc7XG5cbmNvbnN0IHRocm90dGxlID0gdXRpbHMudGhyb3R0bGU7XG5jb25zdCBkZWJvdW5jZSA9IHV0aWxzLmRlYm91bmNlO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSB7fTtcbmNvbnN0IGludGVydmFscyA9IHtcblx0cmVzaXplOiAxMDAsXG5cdG9yaWVudGF0aW9uOiAxMDAsXG5cdHZpc2liaWxpdHk6IDEwMCxcblx0c2Nyb2xsOiAxMDBcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byB0aHJvdHRsZSBmb3IgdGhpcyBkdXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbCAtIFRoZSBkdXJhdGlvbiB0byB0aHJvdHRsZSBpbiBtcy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIFx0ICAgLy8gdGhyb3R0bGUgZm9yIGRpZmZlcmVudCBldmVudHMgYXQgZGlmZmVyZW50IGR1cmF0aW9uc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIDEwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCAzMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCAzMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgMzApXG4gKiBcdFx0Ly8gdGhyb3R0bGUgYWxsIGV2ZW50cyBhdCAzMG1zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgzMCk7XG4gKi9cbmZ1bmN0aW9uIHNldFRocm90dGxlSW50ZXJ2YWwoZXZlbnRUeXBlLCBpbnRlcnZhbCkge1xuXHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicpIHtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCBhcmd1bWVudHNbMF0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIGFyZ3VtZW50c1sxXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCBhcmd1bWVudHNbMl0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCBhcmd1bWVudHNbM10pO1xuXHR9IGVsc2UgaWYgKGludGVydmFsKSB7XG5cdFx0aW50ZXJ2YWxzW2V2ZW50VHlwZV0gPSBpbnRlcnZhbDtcblx0fVxufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Jlc2l6ZSgpIHtcblx0aWYgKGxpc3RlbmVycy5yZXNpemUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgncmVzaXplJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5yZXNpemUpO1xuXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnJlc2l6ZSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvT3JpZW50YXRpb24oKSB7XG5cblx0aWYgKGxpc3RlbmVycy5vcmllbnRhdGlvbikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdvcmllbnRhdGlvbmNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnb3JpZW50YXRpb24nLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMub3JpZW50YXRpb24pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5vcmllbnRhdGlvbiA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvVmlzaWJpbGl0eSgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnZpc2liaWxpdHkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgndmlzaWJpbGl0eScsIHtcblx0XHRcdGhpZGRlbjogdXRpbHMuZ2V0VmlzaWJpbGl0eSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnZpc2liaWxpdHkpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cblx0bGlzdGVuZXJzLnZpc2liaWxpdHkgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Njcm9sbCgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnNjcm9sbCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdzY3JvbGwnO1xuXHRjb25zdCBoYW5kbGVyID0gdGhyb3R0bGUoZnVuY3Rpb24oZXYpIHtcblx0XHRjb25zdCBzY3JvbGxQb3MgPSB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbigpO1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnc2Nyb2xsJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdHNjcm9sbEhlaWdodDogc2Nyb2xsUG9zLmhlaWdodCxcblx0XHRcdHNjcm9sbExlZnQ6IHNjcm9sbFBvcy5sZWZ0LFxuXHRcdFx0c2Nyb2xsVG9wOiBzY3JvbGxQb3MudG9wLFxuXHRcdFx0c2Nyb2xsV2lkdGg6IHNjcm9sbFBvcy53aWR0aCxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5zY3JvbGwpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5zY3JvbGwgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0YXJ0IGxpc3RlbmluZyBmb3IuIE9uZSBvZiBgcmVzaXplYCwgYHNjcm9sbGAsIGBvcmllbnRhdGlvbmAsIGB2aXNpYmlsaXR5YCBvciBgYWxsYC5cbiAqIEBleGFtcGxlXG4gKiBcdFx0Ly8gU3RhcnQgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygnYWxsJyk7XG4gKlxuICogXHRcdC8vIEl0IGlzIG5vdyBwb3NzaWJsZSB0byBsaXN0ZW4gZm9yIGRlYm91bmNlIG8tdmlld3BvcnQgZXZlbnRzIHN1Y2ggYXMgYG9WaWV3cG9ydC5vcmllbnRhdGlvbmAuXG4gKiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0Lm9yaWVudGF0aW9uJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAqICAgICAgXHRjb25zb2xlLmxvZyhldmVudC50eXBlKTsgLy8gb1ZpZXdwb3J0Lm9yaWVudGF0aW9uXG4gKiAgICAgIH0pO1xuICovXG5mdW5jdGlvbiBsaXN0ZW5UbyhldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Jlc2l6ZScgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvUmVzaXplKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAnc2Nyb2xsJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9TY3JvbGwoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdvcmllbnRhdGlvbicgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvT3JpZW50YXRpb24oKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICd2aXNpYmlsaXR5JyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9WaXNpYmlsaXR5KCk7XG5cdH1cbn1cblxuLyoqXG4gKiBTdG9wIGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0b3AgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqIFx0XHQvLyBXZSdyZSBkb25lLiBTdG9wIGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQuc3RvcExpc3RlbmluZ1RvKCdhbGwnKTtcbiAqL1xuZnVuY3Rpb24gc3RvcExpc3RlbmluZ1RvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaChzdG9wTGlzdGVuaW5nVG8pO1xuXHR9IGVsc2UgaWYgKGxpc3RlbmVyc1tldmVudFR5cGVdKSB7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXJzW2V2ZW50VHlwZV0uZXZlbnRUeXBlLCBsaXN0ZW5lcnNbZXZlbnRUeXBlXS5oYW5kbGVyKTtcblx0XHRkZWxldGUgbGlzdGVuZXJzW2V2ZW50VHlwZV07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24gKCkge1xuXHRcdHV0aWxzLmRlYnVnKCk7XG5cdH0sXG5cdGxpc3RlblRvLFxuXHRzdG9wTGlzdGVuaW5nVG8sXG5cdHNldFRocm90dGxlSW50ZXJ2YWwsXG5cdGdldE9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbixcblx0Z2V0U2l6ZTogdXRpbHMuZ2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb246IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5OiB1dGlscy5nZXRWaXNpYmlsaXR5XG59O1xuIiwiaW1wb3J0IHZpZXdwb3J0IGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby12aWV3cG9ydCc7XG5cbi8vIFVzZWQgdG8gY3JlYXRlIGEgdW5pcXVlIG8tZXhwYW5kZXIgaWQuXG5sZXQgY291bnQgPSAwO1xuXG5jbGFzcyBFeHBhbmRlclV0aWxpdHkge1xuXG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb0V4cGFuZGVyRWxlbWVudCAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gb3B0cy5zaHJpbmtUbyBbJ2hlaWdodCddIC0gVGhlIGV4cGFuZGVyIGNvbGxhcHNlIG1ldGhvZCwgXCJoZWlnaHRcIiwgXCJoaWRkZW5cIiwgb3IgYSBudW1iZXIgb2YgaXRlbXMuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gb3B0cy50b2dnbGVTdGF0ZSBbJ2FsbCddIC0gSG93IHRvIHVwZGF0ZSB0aGUgZXhwYW5kZXIgdG9nZ2xlczogXCJhbGxcIiB0byB1cGRhdGUgdGV4dCBhbmQgYXJpYS1leHBhbmRlZCBhdHRyaWJ1dGVzLCBcImFyaWFcIiB0byB1cGRhdGUgb25seSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZXMsIFwibm9uZVwiIHRvIGF2b2lkIHVwZGF0aW5nIHRvZ2dsZXMgb24gY2xpY2suXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmV4cGFuZGVkVG9nZ2xlVGV4dCBbJ2Zld2VyJ10gLSBUb2dnbGUgdGV4dCB3aGVuIHRoZSBleHBhbmRlciBpcyBjb2xsYXBzZWQuIERlZmF1bHRzIHRvIFwiZmV3ZXJcIiwgb3IgXCJsZXNzXCIgd2hlbiBgc2hyaW5rVG9gIGlzIFwiaGVpZ2h0XCIsIG9yIFwiaGlkZGVuXCIgd2hlbiBgc2hyaW5rVG9gIGlzIFwiaGlkZGVuXCIuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmNvbGxhcHNlZFRvZ2dsZVRleHQgWydtb3JlJ10gLSBUb2dnbGUgdGV4dCB3aGVuIHRoZSBleHBhbmRlciBpcyBjb2xsYXBzZWQuIERlZmF1bHRzIHRvIFwibW9yZVwiIG9yIFwic2hvd1wiIHdoZW4gYHNocmlua1RvYCBpcyBcImhpZGRlblwiLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0cy5zZWxlY3RvcnMgLSBUaGUgc2VsZWN0b3JzIGZvciBleHBhbmRlciBlbGVtZW50cy5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuc2VsZWN0b3JzLnRvZ2dsZSAtIEEgc2VsZWN0b3IgZm9yIHRoZSBleHBhbmRlcnMgdG9nZ2xlcyBlLmcuIGAubXktZXhwYW5kZXJfX3RvZ2dsZWAuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLnNlbGVjdG9ycy5jb250ZW50IC0gQSBzZWxlY3RvciBmb3IgdGhlIGV4cGFuZGVycyBjb250ZW50LCB3aGljaCB3aWxsIGNvbGxhcHNlIG9yIGV4cGFuZCBlLmcuIGAubXktZXhwYW5kZXJfX2NvbnRlbnRgLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5zZWxlY3RvcnMuaXRlbSAtIEEgc2VsZWN0b3IgZm9yIHRoZSBpdGVtcyB3aXRoaW4gdGhlIGV4cGFuZGVyIGNvbnRlbnQgZS5nLiBgbGlgIChyZXF1aXJlZCBvbmx5IHdoZW4gYHNocmlua1RvYCBpcyBzZXQgdG8gYSBudW1iZXIpLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0cy5jbGFzc25hbWVzIC0gVGhlIGNsYXNzbmFtZXMgdG8gYXBwbHkgdG8gdGhlIGV4cGFuZGVyIGZvciBkaWZmZXJlbnQgc3RhdGVzLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5jbGFzc25hbWVzLmluaXRpYWxpemVkIC0gVGhlIGNsYXNzIHRvIGFwcGx5IHRvIHRoZSB0b3AgbGV2ZWwgb2YgdGhlIGV4cGFuZGVyIHdoZW4gaW5pdGlhbGlzZWQgYnkgSlMgZS5nLiBgLm15LWV4cGFuZGVyLS1pbml0aWFsaXplZGAuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmNsYXNzbmFtZXMuaW5hY3RpdmUgLSBUaGUgY2xhc3MgdG8gYXBwbHkgdG8gdGhlIHRvcCBsZXZlbCBvZiB0aGUgZXhwYW5kZXIgd2hlbiBpdCBjYW4gbm90IGV4cGFuZCBvciBjb2xsYXBzZSBlLmcuIGAubXktZXhwYW5kZXItLWluYWN0aXZlYC5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuY2xhc3NuYW1lcy5leHBhbmRlZCAtIFRoZSBjbGFzcyB0byBhcHBseSB0byB0aGUgZXhwYW5kZXIgY29udGVudCB3aGVuIGl0IGlzIGV4cGFuZGVkIGUuZy4gYC5teS1leHBhbmRlci0tZXhwYW5kZWRgLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5jbGFzc25hbWVzLmNvbGxhcHNlZCAtIFRoZSBjbGFzcyB0byBhcHBseSB0byB0aGUgZXhwYW5kZXIgY29udGVudCB3aGVuIGl0IGlzIGNvbGxhcHNlZCBKUyBlLmcuIGAubXktZXhwYW5kZXItLWNvbGxhcHNlZGAuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmNsYXNzbmFtZXMuY29sbGFwc2libGVJdGVtIC0gVGhlIGNsYXNzIHRvIGFwcGx5IHRvIGFueSBpdGVtIChzZWUgdGhlIGBzZWxlY3RvcnMuaXRlbWAgb3B0aW9uKSB3aGljaCB3aWxsIGJlIGhpZGRlbiB3aGVuIGNvbGxhcHNlZCBlLmcuIGAubXktZXhwYW5kZXJfX2NvbGxhcHNpYmxlLWl0ZW1gIChyZXF1aXJlZCBvbmx5IHdoZW4gYHNocmlua1RvYCBpcyBzZXQgdG8gYSBudW1iZXIpLlxuXHQgKi9cblx0Y29uc3RydWN0b3Iob0V4cGFuZGVyRWxlbWVudCwgb3B0cykge1xuXHRcdC8vIEVycm9yIGlmIHRoZSBleHBhbmRlciBlbGVtZW50IGlzIG5vdCBhbiBlbGVtZW50LlxuXHRcdGlmKCEob0V4cGFuZGVyRWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGFuIGV4cGFuZGVyIEVsZW1lbnQuJyk7XG5cdFx0fVxuXG5cdFx0Ly8gRXJyb3IgaWYgbm8gb3B0aW9ucyBhcmUgZ2l2ZW4uXG5cdFx0aWYgKHR5cGVvZiBvcHRzICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhbiBcXGBvcHRzXFxgIG9iamVjdCwgZm91bmQgdHlwZSBvZiBcIiR7dHlwZW9mIG9wdHN9XCIuYCk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IGV4cGFuZGVyIHN0YXRlLlxuXHRcdC8vICdleHBhbmRlZCcsICdjb2xsYXBzZWQnLCBvciAnbnVsbCc7XG5cdFx0dGhpcy5fY3VycmVudFN0YXRlID0gbnVsbDtcblxuXHRcdC8vIEdldCBjb25maWd1cmFibGUgb3B0aW9ucy5cblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG5cdFx0XHRzaHJpbmtUbzogJ2hlaWdodCcsXG5cdFx0XHR0b2dnbGVTdGF0ZTogJ2FsbCcsXG5cdFx0fSwgb3B0cyk7XG5cblx0XHQvLyBJZiBgc2hyaW5rVG9gIGlzIGEgbnVtYmVyLCBjYXN0IHRvIGFuIGFjdHVhbCBudW1iZXIgdXNpbmcgdGhlXG5cdFx0Ly8gdW5hcnkgb3BlcmF0b3IgYCtgLiBJLmUgc28gYHR5cGVvZmAgcmV0dXJucyBgbnVtYmVyYC5cblx0XHRpZiAoIWlzTmFOKHRoaXMub3B0aW9ucy5zaHJpbmtUbykpIHtcblx0XHRcdHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9IE51bWJlcih0aGlzLm9wdGlvbnMuc2hyaW5rVG8pO1xuXHRcdH1cblxuXHRcdC8vIFZhbGlkYXRlIHRoZSByZXF1aXJlZCBzZWxlY3RvcnMgYXJlIGNvbmZpZ3VyZWQuXG5cdFx0Ly8gVGhlIGBpdGVtYCBzZWxlY3RvciBpcyBvbmx5IHJlcXVpcmVkIGlmIHRoaXMgZXhwYW5kZXIgaXMgYVxuXHRcdC8vIFwibnVtYmVyXCIgZXhwYW5kZXIsIGkuZS4gYmFzZWQgb24gdGhlIG51bWJlciBvZiB2aXNpYmxlIGNvbnRlbnQgaXRlbXMuXG5cdFx0Y29uc3QgcmVxdWlyZWRTZWxlY3RvcnMgPSBbJ3RvZ2dsZScsICdjb250ZW50J107XG5cdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2hyaW5rVG8gPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXF1aXJlZFNlbGVjdG9ycy5wdXNoKGBpdGVtYCk7XG5cdFx0fVxuXHRcdGNvbnN0IGFjdHVhbFNlbGVjdG9ycyA9IE9iamVjdC5rZXlzKG9wdHMuc2VsZWN0b3JzKTtcblx0XHRjb25zdCBtaXNzaW5nU2VsZWN0b3JzID0gcmVxdWlyZWRTZWxlY3RvcnMuZmlsdGVyKHMgPT4gYWN0dWFsU2VsZWN0b3JzLmluZGV4T2YocykgPT09IC0xKTtcblx0XHRpZiAodHlwZW9mIG9wdHMuc2VsZWN0b3JzICE9PSAnb2JqZWN0JyB8fCBtaXNzaW5nU2VsZWN0b3JzLmxlbmd0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCB0aGUgZm9sbG93aW5nIFwic2VsZWN0b3JzXCIgdG8gYmUgc3BlY2lmaWVkIHdpdGhpbiB0aGUgb3B0aW9ucyBvYmplY3QgXCIke3JlcXVpcmVkU2VsZWN0b3JzfVwiLCBtaXNzaW5nIFwiJHttaXNzaW5nU2VsZWN0b3JzfVwiLmApO1xuXHRcdH1cblxuXHRcdC8vIFZhbGlkYXRlIHRoZSByZXF1aXJlZCBjbGFzc25hbWVzIGFyZSBjb25maWd1cmVkLlxuXHRcdC8vIFRoZSBgY29sbGFwc2libGVJdGVtYCBjbGFzcyBpcyBvbmx5IHJlcXVpcmVkIGlmIHRoaXMgZXhwYW5kZXIgaXMgYVxuXHRcdC8vIFwibnVtYmVyXCIgZXhwYW5kZXIsIGkuZS4gYmFzZWQgb24gdGhlIG51bWJlciBvZiB2aXNpYmxlIGNvbnRlbnQgaXRlbXMuXG5cdFx0Y29uc3QgcmVxdWlyZWRDbGFzc25hbWVzID0gW1xuXHRcdFx0J2luaXRpYWxpemVkJyxcblx0XHRcdCdpbmFjdGl2ZScsXG5cdFx0XHQnZXhwYW5kZWQnLFxuXHRcdFx0J2NvbGxhcHNlZCdcblx0XHRdO1xuXHRcdGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmVxdWlyZWRDbGFzc25hbWVzLnB1c2goYGNvbGxhcHNpYmxlSXRlbWApO1xuXHRcdH1cblx0XHRjb25zdCBhY3R1YWxDbGFzc25hbWVzID0gT2JqZWN0LmtleXMob3B0cy5jbGFzc25hbWVzKTtcblx0XHRjb25zdCBtaXNzaW5nQ2xhc3NuYW1lcyA9IHJlcXVpcmVkQ2xhc3NuYW1lcy5maWx0ZXIocyA9PiBhY3R1YWxDbGFzc25hbWVzLmluZGV4T2YocykgPT09IC0xKTtcblx0XHRpZiAodHlwZW9mIG9wdHMuc2VsZWN0b3JzICE9PSAnb2JqZWN0JyB8fCBtaXNzaW5nQ2xhc3NuYW1lcy5sZW5ndGgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgdGhlIGZvbGxvd2luZyBcImNsYXNzbmFtZXNcIiB0byBiZSBzcGVjaWZpZWQgd2l0aGluIHRoZSBvcHRpb25zIG9iamVjdCBcIiR7cmVxdWlyZWRDbGFzc25hbWVzfVwiLCBtaXNzaW5nIFwiJHttaXNzaW5nQ2xhc3NuYW1lc31cIi5gKTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgdXNlciBoYXMgbm90IGNvbmZpZ3VyZWQgdG9nZ2xlIHRleHQgZm9yIHRoZSBleHBhbmRlZCBzdGF0ZSxcblx0XHQvLyBzZXQgaXQgYmFzZWQgb24gdGhlIFwic2hyaW5rVG9cIiBvcHRpb246IFwiaGlkZVwiIHdoZW4gaGlkaW5nIGNvbGxhcHNlZFxuXHRcdC8vIGl0ZW1zOyBcImxlc3NcIiB3aGVuIG9ic2N1cmluZyBieSByZWR1Y2luZyB0aGUgY29udGFpbmVyIGhlaWdodCBieSBhXG5cdFx0Ly8gZ2l2ZW4gdmFsdWU7IFwiZmV3ZXJcIiBvdGhlcndpc2UuXG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMuZXhwYW5kZWRUb2dnbGVUZXh0KSB7XG5cdFx0XHRzd2l0Y2ggKHRoaXMub3B0aW9ucy5zaHJpbmtUbykge1xuXHRcdFx0XHRjYXNlICdoaWRkZW4nOlxuXHRcdFx0XHRcdHRoaXMub3B0aW9ucy5leHBhbmRlZFRvZ2dsZVRleHQgPSAnaGlkZSc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2hlaWdodCc6XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmV4cGFuZGVkVG9nZ2xlVGV4dCA9ICdsZXNzJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuZXhwYW5kZWRUb2dnbGVUZXh0ID0gJ2Zld2VyJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgdXNlciBoYXMgbm90IGNvbmZpZ3VyZWQgdG9nZ2xlIHRleHQgZm9yIHRoZSBjb2xsYXBzZWQgc3RhdGUsXG5cdFx0Ly8gc2V0IGl0IGJhc2VkIG9uIHRoZSBcInNocmlua1RvXCIgb3B0aW9uOiBcInNob3dcIiBoaWRpbmcgY29sbGFwc2VkIGl0ZW1zO1xuXHRcdC8vIG9yIFwibW9yZVwiIHdoZW4gY29sbGFwc2luZyB0byBhIGhlaWdodC5cblx0XHRpZiAoIXRoaXMub3B0aW9ucy5jb2xsYXBzZWRUb2dnbGVUZXh0KSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuY29sbGFwc2VkVG9nZ2xlVGV4dCA9IHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9PT0gJ2hpZGRlbicgPyAnc2hvdycgOiAnbW9yZSc7XG5cdFx0fVxuXG5cdFx0Ly8gRWxlbWVudHMuXG5cdFx0dGhpcy5vRXhwYW5kZXJFbGVtZW50ID0gb0V4cGFuZGVyRWxlbWVudDtcblx0XHR0aGlzLmNvbnRlbnRFbGVtZW50ID0gdGhpcy5vRXhwYW5kZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLnNlbGVjdG9ycy5jb250ZW50KTtcblx0XHR0aGlzLnRvZ2dsZXMgPSBbXS5zbGljZS5hcHBseSh0aGlzLm9FeHBhbmRlckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9wdGlvbnMuc2VsZWN0b3JzLnRvZ2dsZSkpO1xuXHRcdGlmICghdGhpcy50b2dnbGVzLmxlbmd0aCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHQnby1leHBhbmRlciBuZWVkcyBhIHRvZ2dsZSBsaW5rIG9yIGJ1dHRvbi4gJyArXG5cdFx0XHRcdGBOb25lIHdlcmUgZm91bmQgZm9yIHRvZ2dsZSBzZWxlY3RvciBcIiR7dGhpcy5vcHRpb25zLnNlbGVjdG9ycy50b2dnbGV9XCIuYFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgYGFyaWEtY29udHJvbHNgIG9uIGVhY2ggdG9nZ2xlIHVzaW5nIGV4cGFuZGVyIGlkcy5cblx0XHR0aGlzLmlkID0gdGhpcy5jb250ZW50RWxlbWVudC5pZDtcblx0XHRpZiAoIXRoaXMuaWQpIHtcblx0XHRcdHdoaWxlIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjby1leHBhbmRlcl9fdG9nZ2xlLS0nICsgY291bnQpKSB7XG5cdFx0XHRcdGNvdW50Kys7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmlkID0gdGhpcy5jb250ZW50RWxlbWVudC5pZCA9ICdvLWV4cGFuZGVyX190b2dnbGUtLScgKyBjb3VudDtcblx0XHR9XG5cdFx0dGhpcy50b2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHRvZ2dsZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0aGlzLmlkKSk7XG5cblx0XHQvLyBBZGQgYSBjbGljayBldmVudCB0byBlYWNoIHRvZ2dsZS5cblx0XHR0aGlzLnRvZ2dsZXMuZm9yRWFjaCh0b2dnbGUgPT4ge1xuXHRcdFx0dG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGUoKSk7XG5cdFx0fSk7XG5cblx0XHQvLyBJZiBzaHJpbmtpbmcgYmFzZWQgb24gYSBoZWlnaHQgc2V0IGluIGNzcywgcmVhcHBseSB0aGUgZXhwYW5kZXIgb25cblx0XHQvLyBvcmllbnRhdGlvbiBhbmQgcmVzaXplIGV2ZW50cy5cblx0XHRpZiAodGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnaGVpZ2h0Jykge1xuXHRcdFx0dmlld3BvcnQubGlzdGVuVG8oJ3Jlc2l6ZScpO1xuXHRcdFx0dmlld3BvcnQubGlzdGVuVG8oJ29yaWVudGF0aW9uJyk7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC5vcmllbnRhdGlvbicsICgpID0+IHRoaXMuYXBwbHkoKSk7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC5yZXNpemUnLCAoKSA9PiB0aGlzLmFwcGx5KCkpO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBhIGNsYXNzIHRvIGluZGljYXRlIHRoZSBleHBhbmRlciBpcyBpbml0aWFsaXNlZCwgd2hpY2hcblx0XHQvLyBtYXkgYmUgc3R5bGVkIGFnYWluc3QgZm9yIHByb2dyZXNzaXZlIGVuaGFuY2VtZW50ICh3ZSBzaG91bGRuJ3QgaGlkZVxuXHRcdC8vIGNvbnRlbnQgd2hlbiB0aGUgZXhwYW5kZXIgZmFpbHMgdG8gbG9hZCkuXG5cdFx0dGhpcy5vRXhwYW5kZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmNsYXNzbmFtZXMuaW5pdGlhbGl6ZWQpO1xuXG5cdFx0Ly8gQXBwbHkgdGhlIGNvbmZpZ3VyZWQgZXhwYW5kZXIuXG5cdFx0dGhpcy5hcHBseSh0cnVlKTtcblxuXHRcdC8vIFNldHVwLiBGaXJlIHRoZSBgb0V4cGFuZGVyLmluaXRgIGV2ZW50LlxuXHRcdHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2luaXQnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWNhbGN1bGF0ZSBhbmQgYXBwbHkgdGhlIHN0eWxlcyB0byBleHBhbmQgb3IgY29sbGFwc2UgdGhlIGV4cGFuZGVyXG5cdCAqIGFjY29yZGluZyB0byBpdHMgY3VycmVudCBzdGF0ZS5cblx0ICogQHBhcmFtIHtCb29sZWFufSBpc1NpbGVudCBbZmFsc2VdIFNldCB0byB0cnVlIHRvIGF2b2lkIGZpcmluZyB0aGUgYG9FeHBhbmRlci5leHBhbmRgIG9yIGBvRXhwYW5kZXIuY29sbGFwc2VgIGV2ZW50cy5cblx0ICovXG5cdGFwcGx5KGlzU2lsZW50KSB7XG5cdFx0aWYgKCF0aGlzLl9pc0FjdGl2ZSgpKSB7XG5cdFx0XHR0aGlzLm9FeHBhbmRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3NuYW1lcy5pbmFjdGl2ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vUmVtb3ZlIHRoZSBpbmFjdGl2ZSBjbGFzcywgdGhpcyBleHBhbmRlciBtYXkgYmUgdG9nZ2xlZC5cblx0XHRcdHRoaXMub0V4cGFuZGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy5jbGFzc25hbWVzLmluYWN0aXZlKTtcblx0XHRcdC8vIE1hcmsgY29sbGFwc2libGUgaXRlbXMgd2l0aCB0aGUgYG8tZXhwYW5kZXJfX2NvbGxhcHNpYmxlLWl0ZW1gIGNsYXNzbmFtZXMuXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y29uc3QgY29sbGFwc2libGVDb3VudEVsZW1lbnRzID0gdGhpcy5fZ2V0Q29sbGFwc2VhYmxlSXRlbXMoKTtcblx0XHRcdFx0Y29sbGFwc2libGVDb3VudEVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3NuYW1lcy5jb2xsYXBzaWJsZUl0ZW0pKTtcblx0XHRcdH1cblx0XHRcdC8vIENvbGxhcHNlIG9yIGV4cGFuZC5cblx0XHRcdGlmICh0aGlzLmlzQ29sbGFwc2VkKCkpIHtcblx0XHRcdFx0dGhpcy5jb2xsYXBzZShpc1NpbGVudCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmV4cGFuZChpc1NpbGVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZSB0aGUgZXhwYW5kZXIgc28gZXhwYW5kcyBvciwgaWYgaXQncyBhbHJlYWR5IGV4cGFuZGVkLCBjb2xsYXBzZXMuXG5cdCAqL1xuXHR0b2dnbGUoKSB7XG5cdFx0aWYgKHRoaXMuaXNDb2xsYXBzZWQoKSkge1xuXHRcdFx0dGhpcy5leHBhbmQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb2xsYXBzZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmQgdGhlIGV4cGFuZGVyLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGlzU2lsZW50IFtmYWxzZV0gU2V0IHRvIHRydWUgdG8gYXZvaWQgZmlyaW5nIHRoZSBgb0V4cGFuZGVyLmV4cGFuZGAgZXZlbnQuXG5cdCAqL1xuXHRleHBhbmQoaXNTaWxlbnQpIHtcblx0XHR0aGlzLl9zZXRFeHBhbmRlZFN0YXRlKCdleHBhbmQnLCBpc1NpbGVudCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2UgdGhlIGV4cGFuZGVyLlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGlzU2lsZW50IFtmYWxzZV0gU2V0IHRvIHRydWUgdG8gYXZvaWQgZmlyaW5nIHRoZSBgb0V4cGFuZGVyLmNvbGxhcHNlYCBldmVudC5cblx0ICovXG5cdGNvbGxhcHNlKGlzU2lsZW50KSB7XG5cdFx0dGhpcy5fc2V0RXhwYW5kZWRTdGF0ZSgnY29sbGFwc2UnLCBpc1NpbGVudCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRydWUgaWYgdGhlIGV4cGFuZGVyIGlzIGN1cnJlbnRseSBjb2xsYXBzZS5cblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRpc0NvbGxhcHNlZCgpIHtcblx0XHQvLyBJZiB0aGUgZXhwYW5kZXIgaGFzIGJlZW4gcnVuIHdlIHN0b3JlIHRoZSBjdXJyZW50IHN0YXRlLlxuXHRcdGlmICh0aGlzLl9jdXJyZW50U3RhdGUpIHtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50U3RhdGUgPT09ICdjb2xsYXBzZSc7XG5cdFx0fVxuXHRcdC8vIElmIG5vdCBjaGVjayBmb3IgZG9tIGF0dHJpYnV0ZXMgdG8gZGVjaWRlIGlmIHRoZSB1c2VyIGludGVuZHNcblx0XHQvLyB0aGUgZXhwYW5kZXIgdG8gYmUgZXhwYW5kZWQgb3IgY29sbGFwc2VkIGJ5IGRlZmF1bHQuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdC8vIENoZWNrIGlzIG5vdCBmYWxzZSBzbyBoaWRkZW4gZXhwYW5kZXJzIGNvbGxhcHNlIGJ5IGRlZmF1bHQuXG5cdFx0XHRyZXR1cm4gdGhpcy5jb250ZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykgIT09ICdmYWxzZSc7XG5cdFx0fVxuXHRcdHJldHVybiAhdGhpcy5jb250ZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5vcHRpb25zLmNsYXNzbmFtZXMuZXhwYW5kZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSB0aGUgZXhwYW5kZXIgZnJvbSB0aGUgcGFnZS5cblx0ICovXG5cdGRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9PT0gJ2hlaWdodCcpIHtcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0Lm9yaWVudGF0aW9uJywgKCkgPT4gdGhpcy5hcHBseSgpKTtcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0LnJlc2l6ZScsICgpID0+IHRoaXMuYXBwbHkoKSk7XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XG5cdFx0XHR0b2dnbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG5cdFx0XHR0b2dnbGUucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyk7XG5cdFx0XHR0b2dnbGUucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG5cdFx0fSk7XG5cdFx0dGhpcy5jb250ZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG5cdFx0dGhpcy5jb250ZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy5jbGFzc25hbWVzLmV4cGFuZGVkKTtcblx0XHR0aGlzLmNvbnRlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLmNsYXNzbmFtZXMuY29sbGFwc2VkKTtcblx0XHR0aGlzLm9FeHBhbmRlckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMuY2xhc3NuYW1lcy5pbml0aWFsaXplZCk7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge0FycmF5PEVsZW1lbnQ+fSAtIEFsbCBjb2xsYXBzZWFibGUgY29udGVudCBpdGVtcy5cblx0ICovXG5cdF9nZXRDb2xsYXBzZWFibGVJdGVtcygpIHtcblx0XHRjb25zdCBhbGxDb3VudEVsZW1lbnRzID0gdGhpcy5fZ2V0SXRlbXMoKTtcblx0XHRyZXR1cm4gQXJyYXkuZnJvbShhbGxDb3VudEVsZW1lbnRzKS5zcGxpY2UodGhpcy5vcHRpb25zLnNocmlua1RvKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7QXJyYXk8RWxlbWVudD59IC0gQWxsIGNvbnRlbnQgaXRlbXMuXG5cdCAqL1xuXHRfZ2V0SXRlbXMoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2hyaW5rVG8gIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdCdDYW4gbm90IGdldCBpdGVtcyBmb3IgYW4gZXhwYW5kZXIgd2hpY2ggaXMgbm90IGJhc2VkIG9uIGEgJyArXG5cdFx0XHRcdCdudW1iZXIgb2YgaXRlbXMuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY29udGVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9wdGlvbnMuc2VsZWN0b3JzLml0ZW0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB3aGV0aGVyIHRoZSBleHBhbmRlciBoYXMgc29tZXRoaW5nIHRvIGhpZGUgLyBzaG93LlxuXHQgKiBpLmUuIGlmIGV4cGFuZGluZy9jb2xsYXBzaW5nIHdvdWxkIGRvIGFueXRoaW5nLlxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfaXNBY3RpdmUoKSB7XG5cdFx0Ly8gQW4gZXhwYW5kZXIgbWF5IGFsd2F5cyB0b2dnbGUgYW4gZXhwYW5kZXIgd2hpY2ggaGlkZXMgaXRlbXMuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9PT0gJ2hpZGRlbicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHQvLyBBbiBleHBhbmRlciBiYXNlZCBvbiB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIGEgY29udGFpbmVyIG1heSBvbmx5XG5cdFx0Ly8gY29sbGFwc2UgaWYgdGhlIGl0ZW1zIGxlbmd0aCBleGNlZWRzIHRoZSBudW1iZXIgdG8gc2hyaW5rIHRvLiBJLmUuXG5cdFx0Ly8gYSBsaXN0IG9mIDIgY2FuJ3QgY29sbGFwc2UgdG8gNS5cblx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5zaHJpbmtUbyA9PT0gJ251bWJlcicpIHtcblx0XHRcdGNvbnN0IGl0ZW1zID0gdGhpcy5fZ2V0SXRlbXMoKTtcblx0XHRcdHJldHVybiBpdGVtcy5sZW5ndGggPiB0aGlzLm9wdGlvbnMuc2hyaW5rVG87XG5cdFx0fVxuXHRcdC8vIElmIHRoZSBleHBhbmRlciBpcyBiYXNlZCBvbiBhIGhlaWdodCB0aGVuIGNoZWNrIHRoZSBjb250ZW50IG92ZXJmbG93c1xuXHRcdC8vIHRoZSBjb250ZW50IGNvbnRhaW5lci5cblx0XHRsZXQgb3ZlcmZsb3dzID0gZmFsc2U7XG5cdFx0aWYgKHRoaXMuaXNDb2xsYXBzZWQoKSkge1xuXHRcdFx0b3ZlcmZsb3dzID0gdGhpcy5jb250ZW50RWxlbWVudC5jbGllbnRIZWlnaHQgPCB0aGlzLmNvbnRlbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb2xsYXBzZSgpO1xuXHRcdFx0b3ZlcmZsb3dzID0gdGhpcy5jb250ZW50RWxlbWVudC5jbGllbnRIZWlnaHQgPCB0aGlzLmNvbnRlbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcblx0XHRcdHRoaXMuZXhwYW5kKCk7XG5cdFx0fVxuXHRcdHJldHVybiBvdmVyZmxvd3M7XG5cdH1cblxuXHQvKipcblx0ICogRXhwYW5kIG9yIGNvbGxhcHNlIHRoZSBleHBhbmRlci5cblx0ICogQHBhcmFtIHtCb29sZWFufSBzdGF0ZSBcImV4cGFuZFwiIG9yIFwiY29sbGFwc2VcIi5cblx0ICogQHBhcmFtIHtCb29sZWFufSBpc1NpbGVudCBbZmFsc2VdIFNldCB0byB0cnVlIHRvIGF2b2lkIGZpcmluZyB0aGUgYG9FeHBhbmRlci5jb2xsYXBzZWAgb3IgYG9FeHBhbmRlci5leHBhbmRgIGV2ZW50cy5cblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfc2V0RXhwYW5kZWRTdGF0ZShzdGF0ZSwgaXNTaWxlbnQpIHtcblx0XHQvLyBSZWNvcmQgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGV4cGFuZGVyLlxuXHRcdHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuXHRcdC8vIFRvZ2dsZSBleHBhbmRlZCBhbmQgY29sbGFwc2VkIGNsYXNzZXMuXG5cdFx0dGhpcy5jb250ZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMub3B0aW9ucy5jbGFzc25hbWVzLmV4cGFuZGVkLCBzdGF0ZSA9PT0gJ2V4cGFuZCcpO1xuXHRcdHRoaXMuY29udGVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLm9wdGlvbnMuY2xhc3NuYW1lcy5jb2xsYXBzZWQsIHN0YXRlICE9PSAnZXhwYW5kJyk7XG5cdFx0Ly8gU2V0IGBhcmlhLWhpZGRlbmAuXG5cdFx0Y29uc3QgYXJpYUhpZGRlbiA9IHN0YXRlID09PSAnZXhwYW5kJyA/ICdmYWxzZScgOiAndHJ1ZSc7XG5cdFx0Ly8gSWYgdG9nZ2xpbmcgYWxsIGNvbnRlbnQgc2V0IGBhcmlhLWhpZGRlbmAgb24gdGhlIGNvbnRlbnQgZWxlbWVudC5cblx0XHRpZiAodGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnaGlkZGVuJykge1xuXHRcdFx0dGhpcy5jb250ZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgYXJpYUhpZGRlbik7XG5cdFx0fVxuXHRcdC8vIElmIHRvZ2dsaW5nIGVsZW1lbnRzIGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgaXRlbXMsIHNldCBgYXJpYS1oaWRkZW5gXG5cdFx0Ly8gb24gY29sbGFwc2VhYmxlIGl0ZW1zLlxuXHRcdGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLnNocmlua1RvID09PSAnbnVtYmVyJykge1xuXHRcdFx0Y29uc3QgY29sbGFwc2libGVDb3VudEVsZW1lbnRzID0gdGhpcy5fZ2V0Q29sbGFwc2VhYmxlSXRlbXMoKTtcblx0XHRcdGNvbGxhcHNpYmxlQ291bnRFbGVtZW50cy5mb3JFYWNoKGVsID0+XG5cdFx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBhcmlhSGlkZGVuKVxuXHRcdFx0KTtcblx0XHR9XG5cdFx0Ly8gU2V0IHRoZSB0b2dnbGUgdGV4dCBhbmQgYGFyaWEtZXhwYW5kZWRgIGF0dHJpYnV0ZS5cblx0XHRpZiAodGhpcy5vcHRpb25zLnRvZ2dsZVN0YXRlICE9PSAnbm9uZScpIHtcblx0XHRcdHRoaXMudG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMudG9nZ2xlU3RhdGUgIT09ICdhcmlhJykge1xuXHRcdFx0XHRcdHRvZ2dsZS5pbm5lckhUTUwgPSBzdGF0ZSA9PT0gJ2V4cGFuZCcgP1xuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLmV4cGFuZGVkVG9nZ2xlVGV4dCA6XG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMuY29sbGFwc2VkVG9nZ2xlVGV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHR0b2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgc3RhdGUgPT09ICdleHBhbmQnID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Ly8gRGlzcGF0Y2ggYG9FeHBhbmRlci5jb2xsYXBzZWAgb3IgYG9FeHBhbmRlci5leHBhbmRgIGV2ZW50LlxuXHRcdGlmICghaXNTaWxlbnQpIHtcblx0XHRcdHRoaXMuX2Rpc3BhdGNoRXZlbnQoc3RhdGUpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIGEgYnViYmxpbmcgby1leHBhbmRlciBldmVudCB3aXRoIHRoZSBjb3JyZWN0IG5hbWVzcGFjZS5cblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGV2ZW50IG5hbWUuIEUuZy4gXCJleGFtcGxlXCIgd2lsbCBmaXJlIGFuIFwib0V4cGFuZGVyLmV4YW1wbGVcIiBldmVudC5cblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfZGlzcGF0Y2hFdmVudChuYW1lKSB7XG5cdFx0dGhpcy5vRXhwYW5kZXJFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvRXhwYW5kZXIuJyArIG5hbWUsIHsgYnViYmxlczogdHJ1ZSB9KSk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRlclV0aWxpdHk7XG4iLCJpbXBvcnQgRXhwYW5kZXJVdGlsaXR5IGZyb20gJy4vZXhwYW5kZXItdXRpbGl0eS5qcyc7XG5cbmNsYXNzIEV4cGFuZGVyIGV4dGVuZHMgRXhwYW5kZXJVdGlsaXR5IHtcblxuXHQvKipcblx0ICogby1leHBhbmRlciBjb25zdHJ1Y3Rvci5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb0V4cGFuZGVyRWxlbWVudCAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gb3B0cy5zaHJpbmtUbyBbJ2hlaWdodCddIC0gVGhlIGV4cGFuZGVyIGNvbGxhcHNlIG1ldGhvZCwgXCJoZWlnaHRcIiwgXCJoaWRkZW5cIiwgb3IgYSBudW1iZXIgb2YgaXRlbXMuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gb3B0cy50b2dnbGVTdGF0ZSBbJ2FsbCddIC0gSG93IHRvIHVwZGF0ZSB0aGUgZXhwYW5kZXIgdG9nZ2xlczogXCJhbGxcIiB0byB1cGRhdGUgdGV4dCBhbmQgYXJpYS1leHBhbmRlZCBhdHRyaWJ1dGVzLCBcImFyaWFcIiB0byB1cGRhdGUgb25seSBhcmlhLWV4cGFuZGVkIGF0dHJpYnV0ZXMsIFwibm9uZVwiIHRvIGF2b2lkIHVwZGF0aW5nIHRvZ2dsZXMgb24gY2xpY2suXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLml0ZW1TZWxlY3RvciBbJ2xpJ10gLSBBIHNlbGVjdG9yIGZvciB0aGUgZXhwYW5kYWJsZSBpdGVtcyB3aGVuIGBzaHJpbmtUb2AgaXMgc2V0IHRvIGEgbnVtYmVyLCByZWxhdGl2ZSB0byBgLm8tZXhwYW5kZXJfX2NvbnRlbnRgLlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0cy5leHBhbmRlZFRvZ2dsZVRleHQgWydmZXdlciddIC0gVG9nZ2xlIHRleHQgZm9yIHdoZW4gdGhlIGV4cGFuZGVyIGlzIGNvbGxhcHNlZC4gRGVmYXVsdHMgdG8gXCJmZXdlclwiLCBvciBcImxlc3NcIiB3aGVuIGBzaHJpbmtUb2AgaXMgXCJoZWlnaHRcIiwgb3IgXCJoaWRkZW5cIiB3aGVuIGBzaHJpbmtUb2AgaXMgXCJoaWRkZW5cIi5cblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuY29sbGFwc2VkVG9nZ2xlVGV4dCBbJ21vcmUnXSAtIFRvZ2dsZSB0ZXh0IGZvciB3aGVuIHRoZSBleHBhbmRlciBpcyBjb2xsYXBzZWQuIERlZmF1bHRzIHRvIFwibW9yZVwiIG9yIFwic2hvd1wiIHdoZW4gYHNocmlua1RvYCBpcyBcImhpZGRlblwiLlxuXHQgKi9cblx0Y29uc3RydWN0b3IgKG9FeHBhbmRlckVsZW1lbnQsIG9wdHMpIHtcblx0XHQvLyBHZXQgdXNlciBjb25maWd1cmF0aW9uLlxuXHRcdGNvbnN0IHVzZXJPcHRpb25zID0gb3B0cyB8fCBFeHBhbmRlci5fZ2V0RGF0YUF0dHJpYnV0ZXMob0V4cGFuZGVyRWxlbWVudCk7XG5cdFx0Ly8gSW5pdGlhbGlzZSB3aXRoIHVzZXIgb3B0aW9ucyBhbmQgby1leHBhbmRlciBjbGFzc2VzIGFuZCBzZWxlY3RvcnMuXG5cdFx0Ly8gT25seSBgc2VsZWN0b3JzLml0ZW1gLCB3aGljaCBpcyBub3Qgby1leHBhbmRlciBzcGVjaWZpYywgaXNcblx0XHQvLyBjb25maWd1cmFibGUgYnkgdGhlIHVzZXIgd2l0aCB0aGUgYGl0ZW1TZWxlY3RvcmAgb3B0aW9uLlxuXHRcdHN1cGVyKG9FeHBhbmRlckVsZW1lbnQsIE9iamVjdC5hc3NpZ24odXNlck9wdGlvbnMsIHtcblx0XHRcdHNlbGVjdG9yczoge1xuXHRcdFx0XHR0b2dnbGU6ICcuby1leHBhbmRlcl9fdG9nZ2xlJyxcblx0XHRcdFx0Y29udGVudDogJy5vLWV4cGFuZGVyX19jb250ZW50Jyxcblx0XHRcdFx0aXRlbTogdXNlck9wdGlvbnMuaXRlbVNlbGVjdG9yIHx8ICdsaScsXG5cdFx0XHR9LFxuXHRcdFx0Y2xhc3NuYW1lczoge1xuXHRcdFx0XHRpbml0aWFsaXplZDogJ28tZXhwYW5kZXItLWluaXRpYWxpemVkJyxcblx0XHRcdFx0aW5hY3RpdmU6ICdvLWV4cGFuZGVyLS1pbmFjdGl2ZScsXG5cdFx0XHRcdGV4cGFuZGVkOiAnby1leHBhbmRlcl9fY29udGVudC0tZXhwYW5kZWQnLFxuXHRcdFx0XHRjb2xsYXBzZWQ6ICdvLWV4cGFuZGVyX19jb250ZW50LS1jb2xsYXBzZWQnLFxuXHRcdFx0XHRjb2xsYXBzaWJsZUl0ZW06ICdvLWV4cGFuZGVyX19jb2xsYXBzaWJsZS1pdGVtJ1xuXHRcdFx0fVxuXHRcdH0pKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3QgYSBjdXN0b20gZXhwYW5kZXIuIFVzZWZ1bCB0byBhZGQgY3VzdG9taXNlZCBleHBhbmRlclxuXHQgKiBmdW5jdGlvbmFsaXR5IHRvIGEgY29tcG9uZW50LiBFLmcuIHRvIGFuaW1hdGUgYXdheSBjb2xsYXBzZWQgaXRlbXNcblx0ICogcmF0aGVyIHRoYW4gaGlkZSB0aGVtIGltbWVkaWF0ZWx5LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvRXhwYW5kZXJFbGVtZW50IC0gVGhlIGV4cGFuZGVyIGVsZW1lbnQgaW4gdGhlIERPTS5cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgW3t9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgZXhwYW5kZXIgQHNlZSBFeHBhbmRlclV0aWxpdHkuXG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlQ3VzdG9tKG9FeHBhbmRlckVsZW1lbnQsIG9wdHMpIHtcblx0XHRyZXR1cm4gbmV3IEV4cGFuZGVyVXRpbGl0eShvRXhwYW5kZXJFbGVtZW50LCBvcHRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHRoZSBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbml0aWFsaXNlIHRoZSBjb21wb25lbnQgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIFt7fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKiBAcmV0dXJucyB7KEV4cGFuZGVyfEFycmF5PEV4cGFuZGVyPil9IC0gRXhwYW5kZXIgaW5zdGFuY2Uocylcblx0ICovXG5cdHN0YXRpYyBpbml0KHJvb3RFbCwgb3B0cykge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLWV4cGFuZGVyXScpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEV4cGFuZGVyKHJvb3RFbCwgb3B0cyk7XG5cdFx0fVxuXHRcdHJldHVybiBBcnJheS5mcm9tKHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tZXhwYW5kZXJcIl0nKSwgcm9vdEVsID0+IG5ldyBFeHBhbmRlcihyb290RWwsIG9wdHMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBFeHBhbmRlckVsZW1lbnQuIElmIHRoZSBjb21wb25lbnQgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb0V4cGFuZGVyRWxlbWVudCAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IC0gRGF0YSBhdHRyaWJ1dGVzIGFzIGFuIG9iamVjdFxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdHN0YXRpYyBfZ2V0RGF0YUF0dHJpYnV0ZXMob0V4cGFuZGVyRWxlbWVudCkge1xuXHRcdGlmICghKG9FeHBhbmRlckVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG9FeHBhbmRlckVsZW1lbnQuZGF0YXNldCkucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcblx0XHRcdC8vIElnbm9yZSBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9XG5cdFx0XHQvLyBCdWlsZCBhIGNvbmNpc2Uga2V5IGFuZCBnZXQgdGhlIG9wdGlvbiB2YWx1ZVxuXHRcdFx0Y29uc3Qgc2hvcnRLZXkgPSBrZXkucmVwbGFjZSgvXm9FeHBhbmRlcihcXHcpKFxcdyspJC8sIChtLCBtMSwgbTIpID0+IG0xLnRvTG93ZXJDYXNlKCkgKyBtMik7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IG9FeHBhbmRlckVsZW1lbnQuZGF0YXNldFtrZXldO1xuXHRcdFx0Ly8gVHJ5IHBhcnNpbmcgdGhlIHZhbHVlIGFzIEpTT04sIG90aGVyd2lzZSBqdXN0IHNldCBpdCBhcyBhIHN0cmluZ1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSwge30pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGFuZGVyO1xuIiwiaW1wb3J0IEV4cGFuZGVyIGZyb20gJy4vc3JjL2pzL2V4cGFuZGVyLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24gKCkge1xuXHRFeHBhbmRlci5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBhbmRlcjtcbiIsImltcG9ydCBvRXhwYW5kZXIgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLWV4cGFuZGVyJztcblxubGV0IHRhbGxlc3RUb3BIZWlnaHQgPSAwO1xuXG5jbGFzcyBTdWJzQ2FyZCB7XG5cblx0Y29uc3RydWN0b3IgKHJvb3RFbCkge1xuXHRcdHRoaXMucm9vdEVsID0gcm9vdEVsO1xuXHRcdHRoaXMuZXhwYW5kZXIgPSBudWxsO1xuXHRcdHRoaXMuc2V0RXhwYW5kZXJzKCk7XG5cdFx0dGhpcy5jaGVja1RhbGxlc3QoKTtcblx0fVxuXG5cdGNoZWNrVGFsbGVzdCgpIHtcblx0XHRjb25zdCB0b3AgPSB0aGlzLnJvb3RFbC5xdWVyeVNlbGVjdG9yKCcuby1zdWJzLWNhcmRfX3RvcCcpO1xuXG5cdFx0aWYgKHRvcCAmJiB0b3AuY2xpZW50SGVpZ2h0ID4gdGFsbGVzdFRvcEhlaWdodCkge1xuXHRcdFx0dGFsbGVzdFRvcEhlaWdodCA9IHRvcC5jbGllbnRIZWlnaHQ7XG5cdFx0fVxuXHR9XG5cblx0c2V0RXhwYW5kZXJzKCkge1xuXHRcdGNvbnN0IGV4cGFuZGVyID0gdGhpcy5yb290RWwucXVlcnlTZWxlY3RvcignLm8tc3Vicy1jYXJkX19leHBhbmRlcicpO1xuXHRcdGNvbnN0IG9wdHMgPSB7XG5cdFx0XHRzaHJpbmtUbzogJ2hpZGRlbicsXG5cdFx0XHRleHBhbmRlZFRvZ2dsZVRleHQ6ICdSZWFkIGxlc3MnLFxuXHRcdFx0Y29sbGFwc2VkVG9nZ2xlVGV4dDogJ1JlYWQgbW9yZScsXG5cdFx0XHR0b2dnbGVTdGF0ZTogJ2FsbCcsXG5cdFx0XHRzZWxlY3RvcnM6IHtcblx0XHRcdFx0dG9nZ2xlOiAnLm8tc3Vicy1jYXJkX19yZWFkLW1vcmUnLFxuXHRcdFx0XHRjb250ZW50OiAnLm8tc3Vicy1jYXJkX19jb3B5LWRldGFpbHMnXG5cdFx0XHR9LFxuXHRcdFx0Y2xhc3NuYW1lczoge1xuXHRcdFx0XHRpbml0aWFsaXplZDogJ28tc3Vicy1jYXJkX19leHBhbmRlci0taW5pdGlhbGl6ZWQnLFxuXHRcdFx0XHRpbmFjdGl2ZTogJ28tc3Vicy1jYXJkX19leHBhbmRlci0taW5hY3RpdmUnLFxuXHRcdFx0XHRleHBhbmRlZDogJ28tc3Vicy1jYXJkX19leHBhbmRlci0tZXhwYW5kZWQnLFxuXHRcdFx0XHRjb2xsYXBzZWQ6ICdvLXN1YnMtY2FyZF9fZXhwYW5kZXItLWNvbGxhcHNlZCdcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZXhwYW5kZXIuc2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JywgJ28tZXhwYW5kZXInKTtcblx0XHR0aGlzLmV4cGFuZGVyID0gb0V4cGFuZGVyLmNyZWF0ZUN1c3RvbShleHBhbmRlciwgb3B0cyk7XG5cdH1cblxuXHR0b2dnbGUoKSB7XG5cdFx0aWYgKHRoaXMuZXhwYW5kZXIpIHtcblx0XHRcdHRoaXMuZXhwYW5kZXIudG9nZ2xlKCk7XG5cdFx0fVxuXHR9XG5cblx0ZXhwYW5kKCkge1xuXHRcdGlmICh0aGlzLmV4cGFuZGVyKSB7XG5cdFx0XHR0aGlzLmV4cGFuZGVyLmV4cGFuZCgpO1xuXHRcdH1cblx0fVxuXG5cdGNvbGxhcHNlKCkge1xuXHRcdGlmICh0aGlzLmV4cGFuZGVyKSB7XG5cdFx0XHR0aGlzLmV4cGFuZGVyLmNvbGxhcHNlKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGluaXQgKHJvb3RFbCkge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLXN1YnMtY2FyZF0nKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBTdWJzQ2FyZChyb290RWwpO1xuXHRcdH1cblx0XHRjb25zdCBjYXJkcyA9IEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1zdWJzLWNhcmRcIl0nKSwgcm9vdEVsID0+IG5ldyBTdWJzQ2FyZChyb290RWwpKTtcblxuXHRcdGlmIChjYXJkcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRTdWJzQ2FyZC5tYXRjaEhlaWdodHMoY2FyZHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYXJkcztcblx0fVxuXG5cdHN0YXRpYyBtYXRjaEhlaWdodHMoY2FyZHMpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNhcmRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBjYXJkVG9wID0gY2FyZHNbaV0ucm9vdEVsLnF1ZXJ5U2VsZWN0b3IoJy5vLXN1YnMtY2FyZF9fdG9wJyk7XG5cblx0XHRcdGNhcmRUb3Auc3R5bGUuZmxleCA9IGAwIDEgJHt0YWxsZXN0VG9wSGVpZ2h0fXB4YDtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IHtcblx0U3Vic0NhcmRcbn07XG4iLCJpbXBvcnQge1N1YnNDYXJkfSBmcm9tICcuL3NyYy9qcy9zdWJzQ2FyZC5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRTdWJzQ2FyZC5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgeyBTdWJzQ2FyZCB9IGZyb20gJy4vc3JjL2pzL3N1YnNDYXJkJztcbiIsImltcG9ydCB7IFN1YnNDYXJkIH0gZnJvbSAnLi8uLi8uLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHRjb25zdCBjYXJkcyA9IFN1YnNDYXJkLmluaXQoKTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLWFsbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdGNhcmRzLmZvckVhY2goY2FyZCA9PiBjYXJkLnRvZ2dsZSgpKTtcblx0fSk7XG59KTtcbiJdfQ==