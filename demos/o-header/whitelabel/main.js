function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
  var main_default = toggle_default; // src/js/search.js

  function init(headerEl) {
    var target = headerEl.querySelector("[data-o-header-search]");
    var controls = target && headerEl.querySelectorAll("[aria-controls=\"".concat(target.id, "\"]"));

    if (controls === null || controls.length === 0) {
      return;
    }

    var opening = [];

    var callback = function callback(state, e) {
      if (state === "open") {
        opening.push(e.currentTarget);
        target.querySelector('[name="q"]').focus();
      } else {
        if (opening.length) {
          opening.pop().focus();
        }
      }
    };

    for (var i = 0, len = controls.length; i < len; i++) {
      new main_default(controls[i], {
        target: target,
        callback: callback
      });
    }
  }

  var search_default = {
    init: init
  }; // src/js/mega.js

  var INTENT_ENTER = 300;
  var INTENT_LEAVE = 400;
  var expanded = [];

  function addEvents(parent, menu) {
    var timeout;
    parent.addEventListener("mouseenter", function () {
      clearTimeout(timeout);

      if (isOpen(menu)) {
        return;
      }

      timeout = setTimeout(function () {
        if (expanded.length) {
          hide(expanded[0]);
          show(menu, false);
        } else {
          show(menu, true);
        }
      }, INTENT_ENTER);
    });
    parent.addEventListener("mouseleave", function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        return isOpen(menu) && hide(menu);
      }, INTENT_LEAVE);
    });
  }

  function isOpen(menu) {
    return expanded.indexOf(menu) !== -1;
  }

  function show(menu, animate) {
    if (animate) {
      menu.classList.add("o-header__mega--animation");
    }

    menu.setAttribute("aria-hidden", "false");
    menu.setAttribute("aria-expanded", "true");
    menu.dispatchEvent(new CustomEvent("oHeader.MegaMenuShow", {
      bubbles: true
    }));
    expanded.push(menu);
  }

  function hide(menu) {
    menu.classList.remove("o-header__mega--animation");
    menu.setAttribute("aria-hidden", "true");
    menu.setAttribute("aria-expanded", "false");
    menu.dispatchEvent(new CustomEvent("oHeader.MegaMenuHide", {
      bubbles: true
    }));
    expanded.splice(expanded.indexOf(menu), 1);
  }

  function init2(headerEl) {
    var menus = Array.from(headerEl.querySelectorAll("[data-o-header-mega]"));
    var parents = menus.map(function (menu) {
      return menu.parentNode;
    });
    menus.forEach(function (menu) {
      menu.setAttribute("aria-hidden", "true");
      menu.setAttribute("aria-expanded", "false");
    });
    parents.forEach(function (parent, i) {
      return addEvents(parent, menus[i]);
    });
  }

  var mega_default = {
    init: init2,
    show: show,
    hide: hide
  }; // src/js/drawer.js

  var LISTEN_DELAY = 300;
  var INTENT_DELAY = 1e3;

  function handleCloseEvents(scope, callback, allFocusable) {
    var timeout;

    var handleKeydown = function handleKeydown(e) {
      if (e.keyCode === 27) {
        callback();
      }
    };

    var handleClick = function handleClick(e) {
      if (!scope.contains(e.target)) {
        callback();
      }
    };

    var handleMouseenter = function handleMouseenter() {
      clearTimeout(timeout);
    };

    var handleMouseleave = function handleMouseleave() {
      if (window.innerWidth >= scope.offsetWidth) {
        timeout = setTimeout(callback, INTENT_DELAY);
      }
    };

    var handleFocus = function handleFocus(e) {
      var target = e.relatedTarget || e.target;

      if (!scope.contains(target)) {
        scope.focus();
      }
    };

    var handleTab = function handleTab(e) {
      if (e.keyCode === 9) {
        var firstEl = allFocusable[0];
        var lastEl = allFocusable[allFocusable.length - 1];

        if (!e.shiftKey && e.target === lastEl) {
          firstEl.focus();
          e.preventDefault();
        } else if (e.shiftKey && e.target === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      }
    };

    var removeEvents = function removeEvents() {
      clearTimeout(timeout);
      scope.removeEventListener("mouseenter", handleMouseenter);
      scope.removeEventListener("mouseleave", handleMouseleave);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleClick);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleFocus);
      scope.removeEventListener("keydown", handleTab);
    };

    var addEvents2 = function addEvents2() {
      scope.addEventListener("mouseenter", handleMouseenter);
      scope.addEventListener("mouseleave", handleMouseleave);
      document.addEventListener("click", handleClick);
      document.addEventListener("touchstart", handleClick);
      document.addEventListener("keydown", handleKeydown);
      document.addEventListener("focusin", handleFocus);
      document.addEventListener("focusout", handleFocus);
      scope.addEventListener("keydown", handleTab);
    };

    return {
      addEvents: addEvents2,
      removeEvents: removeEvents,
      handleMouseleave: handleMouseleave
    };
  }

  function addDrawerToggles(drawerEl, allFocusable) {
    var controls = Array.from(document.body.querySelectorAll("[aria-controls=\"".concat(drawerEl.id, "\"]")));
    var handleClose;
    var openingControl;

    function toggleCallback(state, e) {
      if (state === "close") {
        toggleTabbing(drawerEl, false, allFocusable);
        handleClose.removeEvents();
        openingControl.focus();
      } else {
        toggleTabbing(drawerEl, true, allFocusable);
        setTimeout(handleClose.addEvents, LISTEN_DELAY);
        openingControl = e.currentTarget;
        setTimeout(function () {
          var firstFocusable = drawerEl.querySelector("a, button, input, select");

          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            drawerEl.focus();
          }
        });
      }

      drawerEl.classList.toggle("o-header__drawer--closing", state === "close");
      drawerEl.classList.toggle("o-header__drawer--opening", state === "open");
    }

    controls.forEach(function (control) {
      var drawerToggle = new main_default(control, {
        target: drawerEl,
        callback: toggleCallback
      });

      if (!handleClose) {
        handleClose = handleCloseEvents(drawerEl, drawerToggle.toggle, allFocusable);
      }
    });
    drawerEl.tabIndex = -1;
  }

  function addSubmenuToggles(drawerEl) {
    var submenus = drawerEl.querySelectorAll('[id^="o-header-drawer-child-"]');
    Array.from(submenus).forEach(function (submenu) {
      var button = drawerEl.querySelector("[aria-controls=\"".concat(submenu.id, "\"]"));
      submenu.setAttribute("aria-hidden", "true");
      new main_default(button, {
        target: submenu,
        callback: function callback(state) {
          button.textContent = button.textContent.replace(/fewer|more/, state === "open" ? "fewer" : "more");
        }
      });
    });
  }

  function toggleTabbing(drawerEl, isEnabled, allFocusable) {
    if (isEnabled) {
      allFocusable.forEach(function (el) {
        el.removeAttribute("tabindex");
      });
    } else {
      allFocusable.forEach(function (el) {
        el.setAttribute("tabindex", "-1");
      });
    }
  }

  function init3() {
    var drawerEl = document.body.querySelector("[data-o-header-drawer]");

    if (!drawerEl) {
      return;
    }

    var allFocusable = Array.from(drawerEl.querySelectorAll("a, button, input, select"));
    toggleTabbing(drawerEl, false, allFocusable);
    addSubmenuToggles(drawerEl);
    addDrawerToggles(drawerEl, allFocusable);
    setTimeout(function () {
      drawerEl.removeAttribute("data-o-header-drawer--no-js");
      drawerEl.setAttribute("data-o-header-drawer--js", "true");
    });
  }

  var drawer_default = {
    init: init3,
    handleCloseEvents: handleCloseEvents
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
  } // src/js/subnav.js


  function init4(headerEl) {
    var subnav = headerEl.querySelector("[data-o-header-subnav]");

    if (subnav === null) {
      return;
    }

    var buttons = Array.from(subnav.getElementsByTagName("button"));
    var wrapper = subnav.querySelector("[data-o-header-subnav-wrapper]");
    var scrollWidth;
    var wrapperWidth = wrapper.clientWidth;

    function checkCurrentPosition() {
      var currentSelection = wrapper.querySelector("[aria-current]");

      if (currentSelection) {
        var currentSelectionEnd = currentSelection.getBoundingClientRect().right;

        if (currentSelectionEnd > wrapperWidth) {
          var diff = currentSelectionEnd - wrapperWidth;
          diff = diff > wrapperWidth / 2 ? currentSelectionEnd : wrapperWidth / 2;
          wrapper.scrollTo(diff, 0);
        }
      }

      scrollable();
    }

    function direction(button) {
      return button.className.match(/left|right/).pop();
    }

    function scrollable() {
      scrollWidth = wrapper.scrollWidth;
      buttons.forEach(function (button) {
        if (direction(button) === "left") {
          button.disabled = wrapper.scrollLeft === 0;
        } else {
          var remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
          button.disabled = remaining <= 1;
        }
      });
    }

    function scroll(e) {
      var distance = 100;

      if (direction(e.currentTarget) === "left") {
        distance = (wrapper.scrollLeft > distance ? distance : wrapper.scrollLeft) * -1;
      } else {
        var remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
        distance = remaining > distance ? distance : remaining;
      }

      wrapper.scrollLeft = wrapper.scrollLeft + distance;
      scrollable();
    }

    wrapper.addEventListener("scroll", throttle(scrollable, 100));
    window.addEventListener("oViewport.resize", scrollable);
    buttons.forEach(function (button) {
      button.onclick = scroll;
    });
    checkCurrentPosition();
  }

  var subnav_default = {
    init: init4
  }; // src/js/sticky.js

  function init5(headerEl) {
    if (!headerEl.hasAttribute("data-o-header--sticky")) {
      return;
    }

    var viewportOffset;
    var lastScrollDepth;
    var lastAnimationFrame;
    var lastStickyState;

    function handleFrame() {
      var scrollDepth = window.pageYOffset || window.scrollY;
      var isActive = scrollDepth > viewportOffset;
      headerEl.classList.toggle("o-header--sticky-active", isActive);

      if (isActive !== lastStickyState) {
        lastStickyState = isActive;
        headerEl.dispatchEvent(new CustomEvent("oHeader.Sticky", {
          bubbles: true,
          detail: {
            isActive: isActive
          }
        }));
      }

      if (Math.abs(scrollDepth - lastScrollDepth) > 20) {
        var isScrollingDown = lastScrollDepth < scrollDepth;
        headerEl.classList.toggle("o-header--sticky-scroll-down", isActive && isScrollingDown);
        headerEl.classList.toggle("o-header--sticky-scroll-up", isActive && !isScrollingDown);
      }

      lastScrollDepth = scrollDepth;
    }

    function startLoop() {
      viewportOffset = window.innerHeight / 2;
      lastAnimationFrame = window.requestAnimationFrame(function () {
        handleFrame();
        startLoop();
      });
    }

    function stopLoop() {
      if (lastAnimationFrame) {
        window.cancelAnimationFrame(lastAnimationFrame);
      }
    }

    function scrollStart() {
      window.removeEventListener("scroll", scrollStart);
      window.addEventListener("scroll", debouncedScrollEnd);
      startLoop();
    }

    function scrollEnd() {
      stopLoop();
      window.removeEventListener("scroll", debouncedScrollEnd);
      window.addEventListener("scroll", scrollStart);
    }

    var debouncedScrollEnd = debounce(scrollEnd, 300);
    window.addEventListener("scroll", scrollStart);
    handleFrame();
  }

  var sticky_default = {
    init: init5
  }; // src/js/header.js

  var Header = /*#__PURE__*/function () {
    "use strict";

    function Header(headerEl) {
      _classCallCheck(this, Header);

      if (!headerEl) {
        headerEl = document.querySelector('[data-o-component="o-header"]');
      } else if (typeof headerEl === "string") {
        headerEl = document.querySelector(headerEl);
      }

      if (headerEl.hasAttribute("data-o-header--js")) {
        return;
      }

      this.headerEl = headerEl;
      search_default.init(this.headerEl);
      mega_default.init(this.headerEl);
      drawer_default.init(this.headerEl);
      subnav_default.init(this.headerEl);
      sticky_default.init(this.headerEl);
      this.headerEl.removeAttribute("data-o-header--no-js");
      this.headerEl.setAttribute("data-o-header--js", "");
    }

    _createClass(Header, null, [{
      key: "init",
      value: function init(rootEl) {
        if (!rootEl) {
          rootEl = document.body;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (/\bo-header\b/.test(rootEl.getAttribute("data-o-component"))) {
          return new Header(rootEl);
        }

        return [].map.call(rootEl.querySelectorAll('[data-o-component="o-header"]'), function (el) {
          if (!el.hasAttribute("data-o-header--js")) {
            return new Header(el);
          }
        }).filter(function (header) {
          return header !== void 0;
        });
      }
    }]);

    return Header;
  }();

  var header_default = Header; // main.js

  var constructAll2 = function constructAll2() {
    header_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll2);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll2); // demos/src/main.js

  document.addEventListener("DOMContentLoaded", setupDemo);

  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      setupDemo();
    } else if (document.readyState === "interactive" && !document.attachEvent) {
      setupDemo();
    }
  };

  if (document.readyState === "complete") {
    setupDemo();
  } else if (document.readyState === "interactive" && !document.attachEvent) {
    setupDemo();
  }

  function setupDemo() {
    if (document.documentElement.classList.contains("demo-sticky")) {
      var p = document.createElement("p");
      p.className = "demo-sticky-message demo-sticky-message--";

      if (window.self !== window.top) {
        p.className += "popout";
        p.textContent = "Please open this demo in a new window";
      } else {
        p.className += "scroll";
        p.textContent = "Scroll down";
      }

      document.body.appendChild(p);
    }

    document.documentElement.className = document.documentElement.className.replace("core", "enhanced");
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL28tdG9nZ2xlL3NyYy9qcy90YXJnZXQuanMiLCIuLi9vLXRvZ2dsZS9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vby10b2dnbGUvbWFpbi5qcyIsInNyYy9qcy9zZWFyY2guanMiLCJzcmMvanMvbWVnYS5qcyIsInNyYy9qcy9kcmF3ZXIuanMiLCIuLi8uLi9saWJyYXJpZXMvby11dGlscy9tYWluLmpzIiwic3JjL2pzL3N1Ym5hdi5qcyIsInNyYy9qcy9zdGlja3kuanMiLCJzcmMvanMvaGVhZGVyLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxNQUFBO0FBQUE7O0FBRUMsb0JBQVksTUFBWixFQUFtQjtBQUFBOztBQUNsQixXQUFLLFFBQUwsR0FBZ0IsTUFBQSxDQUFPLFFBQXZCO0FBQ0EsV0FBSyxPQUFMLEdBQWUsRUFBZjtBQUFlOztBQUpqQjtBQUFBO0FBQUEsYUFPQyxtQkFBVSxNQUFWLEVBQWtCO0FBQ2pCLGFBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsTUFBbEI7QUFBa0I7QUFScEI7QUFBQTtBQUFBLGFBV0Msc0JBQWEsTUFBYixFQUFxQjtBQUNwQixZQUFNLGNBQUEsR0FBaUIsS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixNQUFyQixDQUF2QjtBQUNBLGFBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBc0IsY0FBdEIsRUFBc0MsTUFBdEMsQ0FBNkMsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixjQUFBLEdBQWdCLENBQW5DLENBQTdDLENBQWY7O0FBQ0EsWUFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBRzlCLGVBQUssSUFBTDtBQUFLO0FBQUE7QUFqQlI7QUFBQTtBQUFBLGFBcUJDLGdCQUFPO0FBQ04sYUFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixhQUEzQixFQUEw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QUFPLEdBQTNCLEVBQWdDO0FBQy9CLFFBQUEsQ0FBQSxDQUFFLFNBQUYsSUFBZSxRQUFmO0FBQ0EsUUFBQSxDQUFBLENBQUUsV0FBRixHQUFnQix1Q0FBaEI7QUFBZ0IsT0FGakIsTUFHTztBQUNOLFFBQUEsQ0FBQSxDQUFFLFNBQUYsSUFBZSxRQUFmO0FBQ0EsUUFBQSxDQUFBLENBQUUsV0FBRixHQUFnQixhQUFoQjtBQUFnQjs7QUFHakIsTUFBQSxRQUFBLENBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUI7QUFBMEI7O0FBRzNCLElBQUEsUUFBQSxDQUFTLGVBQVQsQ0FBeUIsU0FBekIsR0FBcUMsUUFBQSxDQUFTLGVBQVQsQ0FBeUIsU0FBekIsQ0FBbUMsT0FBbkMsQ0FBMkMsTUFBM0MsRUFBbUQsVUFBbkQsQ0FBckM7QUFDQSxJQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQUksV0FBSixDQUFnQixvQkFBaEIsQ0FBdkI7QUFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUYXJnZXQge1xuXG5cdGNvbnN0cnVjdG9yKHRvZ2dsZSl7XG5cdFx0dGhpcy50YXJnZXRFbCA9IHRvZ2dsZS50YXJnZXRFbDtcblx0XHR0aGlzLnRvZ2dsZXMgPSBbXTtcblx0fVxuXG5cdGFkZFRvZ2dsZSh0b2dnbGUpIHtcblx0XHR0aGlzLnRvZ2dsZXMucHVzaCh0b2dnbGUpO1xuXHR9XG5cblx0cmVtb3ZlVG9nZ2xlKHRvZ2dsZSkge1xuXHRcdGNvbnN0IHRvZ2dsZVBvc2l0aW9uID0gdGhpcy50b2dnbGVzLmluZGV4T2YodG9nZ2xlKTtcblx0XHR0aGlzLnRvZ2dsZXMgPSB0aGlzLnRvZ2dsZXMuc2xpY2UoMCwgdG9nZ2xlUG9zaXRpb24pLmNvbmNhdCh0aGlzLnRvZ2dsZXMuc2xpY2UodG9nZ2xlUG9zaXRpb24gKzEpKTtcblx0XHRpZiAodGhpcy50b2dnbGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Ly8gSWYgdGhhdCB3YXMgdGhlIGxhc3Qvb25seSB0b2dnbGUgdGhhdCBjb250cm9sbGVkIHRoaXMgdGFyZ2V0IHRoZW4gZW5zdXJlXG5cdFx0XHQvLyB0aGlzIHRhcmdldCBpcyBvcGVuIHNvIGl0IGRvZXNuJ3QgZ2V0IHN0dWNrIGluIHRoZSBjbG9zZWQgcG9zaXRpb25cblx0XHRcdHRoaXMub3BlbigpO1xuXHRcdH1cblx0fVxuXG5cdG9wZW4oKSB7XG5cdFx0dGhpcy50YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cdFx0dGhpcy50YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvLXRvZ2dsZS0tYWN0aXZlJyk7XG5cdFx0Ly8gU2V0IGV2ZXJ5IHRvZ2dsZSB0aGF0IGNvbnRyb2xzIHRoaXMgdGFyZ2V0IHRvIGJlIG9wZW5cblx0XHR0aGlzLnRvZ2dsZXMuZm9yRWFjaCgodG9nZ2xlKSA9PiB7XG5cdFx0XHR0b2dnbGUub3BlbigpO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xvc2UoKSB7XG5cdFx0dGhpcy50YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblx0XHR0aGlzLnRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ28tdG9nZ2xlLS1hY3RpdmUnKTtcblxuXHRcdC8vIFNldCBldmVyeSB0b2dnbGUgdGhhdCBjb250cm9scyB0aGlzIHRhcmdldCB0byBiZSBjbG9zZWRcblx0XHR0aGlzLnRvZ2dsZXMuZm9yRWFjaCgodG9nZ2xlKSA9PiB7XG5cdFx0XHR0b2dnbGUuY2xvc2UoKTtcblx0XHR9KTtcblx0fVxuXG5cdHRvZ2dsZSgpe1xuXHRcdGlmICh0aGlzLmlzT3BlbigpKXtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cdFx0fVxuXHR9XG5cblx0aXNPcGVuKCkge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucygnby10b2dnbGUtLWFjdGl2ZScpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhcmdldDtcbiIsImltcG9ydCBUYXJnZXQgZnJvbSAnLi90YXJnZXQuanMnO1xuXG4vLyBTb21lIGFzc2lzdGl2ZSB0ZWNobm9sb2dpZXMsIGxpa2Ugc2NyZWVuIHJlYWRlcnMsIHN1Z2dlc3QgdG8gcHJlc3MgJ3NwYWNlJ1xuLy8gd2hlbiBpbnRlcmFjdGluZyB3aXRoIGEgbGluayB3aXRoIGEgcm9sZSBvZiAnYnV0dG9uJy5cbi8vIFdlIG5lZWQgdG8gZW5zdXJlIHRoYXQgd2UgcmVwbGljYXRlIHRoaXMgZnVuY3Rpb25hbGl0eSB0aGF0IGV4aXN0cyBvbiBhIGJ1dHRvbiBlbGVtZW50LlxuZnVuY3Rpb24gaGFuZGxlU3BhY2VLZXlkb3duIChlKSB7XG5cdC8vIGlmIHRoZSBwcmVzc2VkIGtleSBpcyBhIHNwYWNlLCB3ZSdsbCBzaW11bGF0ZSBhIGNsaWNrXG5cdGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG5cdFx0dGhpcy50b2dnbGUoZSk7XG5cdH1cbn1cblxuY2xhc3MgVG9nZ2xlIHtcblxuXHRjb25zdHJ1Y3Rvcih0b2dnbGVFbCwgY29uZmlnKSB7XG5cdFx0aWYgKCFUb2dnbGUuX3RhcmdldHMpIHtcblx0XHRcdFRvZ2dsZS5fdGFyZ2V0cyA9IG5ldyBNYXAoKTtcblx0XHR9XG5cblx0XHRpZiAoIXRvZ2dsZUVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fSBlbHNlIGlmICghKHRvZ2dsZUVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHR0b2dnbGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlRWwpO1xuXHRcdH1cblxuXHRcdGlmICh0b2dnbGVFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtby10b2dnbGUtLWpzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIWNvbmZpZykge1xuXHRcdFx0Y29uZmlnID0ge307XG5cdFx0XHQvLyBUcnkgdG8gZ2V0IGNvbmZpZyBzZXQgZGVjbGFyYXRpdmVseSBvbiB0aGUgZWxlbWVudFxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b2dnbGVFbC5hdHRyaWJ1dGVzLCAoYXR0cikgPT4ge1xuXHRcdFx0XHRpZiAoYXR0ci5uYW1lLmluZGV4T2YoJ2RhdGEtby10b2dnbGUnKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgcHJlZml4IHBhcnQgb2YgdGhlIGRhdGEgYXR0cmlidXRlIG5hbWVcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBhdHRyLm5hbWUucmVwbGFjZSgnZGF0YS1vLXRvZ2dsZS0nLCAnJyk7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdC8vIElmIGl0J3MgYSBKU09OLCBhIGJvb2xlYW4gb3IgYSBudW1iZXIsIHdlIHdhbnQgaXQgc3RvcmVkIGxpa2UgdGhhdCwgYW5kIG5vdCBhcyBhIHN0cmluZ1xuXHRcdFx0XHRcdFx0Ly8gV2UgYWxzbyByZXBsYWNlIGFsbCAnIHdpdGggXCIgc28gSlNPTiBzdHJpbmdzIGFyZSBwYXJzZWQgY29ycmVjdGx5XG5cdFx0XHRcdFx0XHRjb25maWdba2V5XSA9IEpTT04ucGFyc2UoYXR0ci52YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGNvbmZpZ1trZXldID0gYXR0ci52YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgdG9nZ2xlIGNhbGxiYWNrIGlmIGl0cyBhIHN0cmluZy5cblx0XHRpZiAoY29uZmlnLmNhbGxiYWNrICYmIHR5cGVvZiBjb25maWcuY2FsbGJhY2sgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHQvLyBFcnJvciBpZiB0aGUgY2FsbGJhY2sgaXMgYSBzdHJpbmcgYW5kIGEgZ2xvYmFsIGZ1bmN0aW9uIG9mIHRoYXQgbmFtZSBkb2VzIG5vdCBleGlzdC5cblx0XHRcdGlmICh0eXBlb2Ygd2luZG93W2NvbmZpZy5jYWxsYmFja10gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBvLXRvZ2dsZSBjYWxsYmFjayBcIiR7Y29uZmlnLmNhbGxiYWNrfVwiLmApO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYWxsYmFjayA9IHdpbmRvd1tjb25maWcuY2FsbGJhY2tdO1xuXHRcdH1cblx0XHQvLyBTZXQgdGhlIHRvZ2dsZSBjYWxsYmFjayBpZiBpdHMgYSBmdW5jaXRvbi5cblx0XHRpZiAoY29uZmlnLmNhbGxiYWNrICYmIHR5cGVvZiBjb25maWcuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRoaXMuY2FsbGJhY2sgPSBjb25maWcuY2FsbGJhY2s7XG5cdFx0fVxuXHRcdC8vIEVycm9yIGlmIHNvbWUgY2FsbGJhY2sgdmFsdWUgaGFzIGJlZW4gZ2l2ZW4gYnV0IGhhcyBub3QgYmVlbiBzZXQuXG5cdFx0aWYgKGNvbmZpZy5jYWxsYmFjayAmJiAhdGhpcy5jYWxsYmFjaykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgby10b2dnbGUgY2FsbGJhY2sgbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbi5gKTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIHRvZ2dsZSBlbGVtZW50LlxuXHRcdHRoaXMudG9nZ2xlRWwgPSB0b2dnbGVFbDtcblxuXHRcdGlmICh0aGlzLnRvZ2dsZUVsLm5vZGVOYW1lID09PSAnQScpIHtcblx0XHRcdHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuXHRcdFx0dGhpcy50b2dnbGVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlU3BhY2VLZXlkb3duLmJpbmQodGhpcykpO1xuXHRcdFx0Ly8gSWYgYSB1c2VyIGRyYWdzIHRoZWlyIG1vdXNlIHNsaWdodGx5IHdoZW4gdHJ5aW5nIHRvIGludGVyYWN0IHdpdGggdGhlIHRvZ2dsZVxuXHRcdFx0Ly8gaXQgd2lsbCB0cmlnZ2VyIHRoZSAnZHJhZyBhbmQgZHJvcCcgZnVuY3Rpb25hbGl0eS5cblx0XHRcdC8vIFJlZ3VsYXIgYnV0dG9ucyBwcmV2ZW50IHRoaXMgYW5kIGVuc3VyZSBhcyBsb25nIGFzIHRoZSBtb3VzZSBpcyBzdGlsbCBhYm92ZSB0aGVcblx0XHRcdC8vIGJ1dHRvbiB0aGF0IHRoZSBjbGljayB3aWxsIHJlZ2lzdGVyLlxuXHRcdFx0Ly8gVGhpcyB3aWxsIGhlbHAgdXNlcnMgd2l0aCBtb3RvciBpbXBhaXJtZW50cyBhbmQgdGhvc2UgbGVzcyBmYW1pbGlhciB3aXRoIGEgdHJhY2twYWQuXG5cdFx0XHR0aGlzLnRvZ2dsZUVsLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy50b2dnbGUgPSB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudG9nZ2xlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG5cblx0XHR0aGlzLnRvZ2dsZUVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLXRvZ2dsZS0tanMnLCAndHJ1ZScpO1xuXG5cdFx0dGhpcy50YXJnZXRFbCA9IGNvbmZpZy50YXJnZXQ7XG5cdFx0aWYgKCEodGhpcy50YXJnZXRFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0dGhpcy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKFRvZ2dsZS5fdGFyZ2V0cy5nZXQodGhpcy50YXJnZXRFbCkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy50YXJnZXQgPSBuZXcgVG9nZ2xlLlRhcmdldCh0aGlzKTtcblx0XHRcdFRvZ2dsZS5fdGFyZ2V0cy5zZXQodGhpcy50YXJnZXRFbCwgdGhpcy50YXJnZXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnRhcmdldCA9IFRvZ2dsZS5fdGFyZ2V0cy5nZXQodGhpcy50YXJnZXRFbCk7XG5cdFx0fVxuXG5cdFx0dGhpcy50YXJnZXQuYWRkVG9nZ2xlKHRoaXMpO1xuXHRcdHRoaXMudGFyZ2V0LmNsb3NlKCk7XG5cdH1cblxuXHRvcGVuKCkge1xuXHRcdHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblx0fVxuXG5cdGNsb3NlKCkge1xuXHRcdHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cdH1cblxuXHQvLyB0b2dnbGUgaXMgYm91bmQgdG8gdGhlIFRvZ2dsZSBpbnN0YW5jZSBpbiB0aGUgY29uc3RydWN0b3Jcblx0dG9nZ2xlKGUpIHtcblxuXHRcdHRoaXMudGFyZ2V0LnRvZ2dsZSgpO1xuXG5cdFx0aWYoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNhbGxiYWNrKXtcblx0XHRcdGNvbnN0IHN0YXRlTmFtZSA9IHRoaXMudGFyZ2V0LmlzT3BlbigpID8gJ29wZW4nIDogJ2Nsb3NlJztcblx0XHRcdHRoaXMuY2FsbGJhY2soc3RhdGVOYW1lLCBlKTtcblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnRvZ2dsZUVsLm5vZGVOYW1lID09PSAnQScpIHtcblx0XHRcdHRoaXMudG9nZ2xlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZVNwYWNlS2V5ZG93bik7XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG5cdFx0dGhpcy50b2dnbGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcblx0XHR0aGlzLnRvZ2dsZUVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuXHRcdHRoaXMudG9nZ2xlRWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpO1xuXG5cdFx0dGhpcy50YXJnZXQucmVtb3ZlVG9nZ2xlKHRoaXMpO1xuXG5cdFx0dGhpcy50YXJnZXQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy50b2dnbGVFbCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNhbGxiYWNrID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0c3RhdGljIGluaXQoZWwsIGNvbmZpZykge1xuXHRcdGlmICghZWwpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9IGVsc2UgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdFx0fVxuXHRcdGNvbnN0IHRvZ2dsZUVscyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby10b2dnbGVcIl0nKTtcblx0XHRjb25zdCB0b2dnbGVzID0gW107XG5cdFx0Zm9yIChjb25zdCB0b2dnbGVFbCBvZiB0b2dnbGVFbHMpIHtcblx0XHRcdGlmICghdG9nZ2xlRWwuaGFzQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpKSB7XG5cdFx0XHRcdHRvZ2dsZXMucHVzaChuZXcgVG9nZ2xlKHRvZ2dsZUVsLCBjb25maWcpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRvZ2dsZXM7XG5cdH1cbn1cblxuVG9nZ2xlLlRhcmdldCA9IFRhcmdldDtcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZTtcbiIsImltcG9ydCBUb2dnbGUgZnJvbSAnLi9zcmMvanMvdG9nZ2xlLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuXHRUb2dnbGUuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlO1xuIiwiaW1wb3J0IFRvZ2dsZSBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdG9nZ2xlJztcblxuZnVuY3Rpb24gaW5pdCAoaGVhZGVyRWwpIHtcblx0Y29uc3QgdGFyZ2V0ID0gaGVhZGVyRWwucXVlcnlTZWxlY3RvcignW2RhdGEtby1oZWFkZXItc2VhcmNoXScpO1xuXHRjb25zdCBjb250cm9scyA9IHRhcmdldCAmJiBoZWFkZXJFbC5xdWVyeVNlbGVjdG9yQWxsKGBbYXJpYS1jb250cm9scz1cIiR7dGFyZ2V0LmlkfVwiXWApO1xuXG5cdGlmIChjb250cm9scyA9PT0gbnVsbCB8fCBjb250cm9scy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBvcGVuaW5nID0gW107XG5cblx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbiAoc3RhdGUsIGUpIHtcblx0XHRpZiAoc3RhdGUgPT09ICdvcGVuJykge1xuXHRcdFx0Ly8gcmVjb3JkIHRoZSBvcGVuaW5nIGNvbnRyb2xcblx0XHRcdG9wZW5pbmcucHVzaChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0dGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicVwiXScpLmZvY3VzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHJlLWZvY3VzIG9wZW5pbmcgY29udHJvbFxuXHRcdFx0aWYgKG9wZW5pbmcubGVuZ3RoKSB7XG5cdFx0XHRcdG9wZW5pbmcucG9wKCkuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IGNvbnRyb2xzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0bmV3IFRvZ2dsZShjb250cm9sc1tpXSwgeyB0YXJnZXQsIGNhbGxiYWNrIH0pO1xuXHR9XG59XG5cbmV4cG9ydCB7IGluaXQgfTtcbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9O1xuIiwiY29uc3QgSU5URU5UX0VOVEVSID0gMzAwO1xuY29uc3QgSU5URU5UX0xFQVZFID0gNDAwO1xuXG5jb25zdCBleHBhbmRlZCA9IFtdO1xuXG5mdW5jdGlvbiBhZGRFdmVudHMgKHBhcmVudCwgbWVudSkge1xuXHRsZXQgdGltZW91dDtcblxuXHRwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cblx0XHRpZiAoaXNPcGVuKG1lbnUpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0aWYgKGV4cGFuZGVkLmxlbmd0aCkge1xuXHRcdFx0XHRoaWRlKGV4cGFuZGVkWzBdKTtcblx0XHRcdFx0c2hvdyhtZW51LCBmYWxzZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzaG93KG1lbnUsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH0sIElOVEVOVF9FTlRFUik7XG5cdH0pO1xuXG5cdHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBpc09wZW4obWVudSkgJiYgaGlkZShtZW51KSwgSU5URU5UX0xFQVZFKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGlzT3BlbiAobWVudSkge1xuXHRyZXR1cm4gZXhwYW5kZWQuaW5kZXhPZihtZW51KSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIHNob3cgKG1lbnUsIGFuaW1hdGUpIHtcblx0aWYgKGFuaW1hdGUpIHtcblx0XHRtZW51LmNsYXNzTGlzdC5hZGQoJ28taGVhZGVyX19tZWdhLS1hbmltYXRpb24nKTtcblx0fVxuXG5cdG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXHRtZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG5cblx0bWVudS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb0hlYWRlci5NZWdhTWVudVNob3cnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuXG5cdGV4cGFuZGVkLnB1c2gobWVudSk7XG59XG5cbmZ1bmN0aW9uIGhpZGUgKG1lbnUpIHtcblx0bWVudS5jbGFzc0xpc3QucmVtb3ZlKCdvLWhlYWRlcl9fbWVnYS0tYW5pbWF0aW9uJyk7XG5cdG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cblx0bWVudS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb0hlYWRlci5NZWdhTWVudUhpZGUnLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xuXG5cdGV4cGFuZGVkLnNwbGljZShleHBhbmRlZC5pbmRleE9mKG1lbnUpLCAxKTtcbn1cblxuZnVuY3Rpb24gaW5pdCAoaGVhZGVyRWwpIHtcblx0Y29uc3QgbWVudXMgPSBBcnJheS5mcm9tKGhlYWRlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8taGVhZGVyLW1lZ2FdJykpO1xuXHRjb25zdCBwYXJlbnRzID0gbWVudXMubWFwKG1lbnUgPT4gbWVudS5wYXJlbnROb2RlKTtcblxuXHRtZW51cy5mb3JFYWNoKG1lbnUgPT4ge1xuXHRcdG1lbnUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdFx0bWVudS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblx0fSk7XG5cblx0cGFyZW50cy5mb3JFYWNoKChwYXJlbnQsIGkpID0+IGFkZEV2ZW50cyhwYXJlbnQsIG1lbnVzW2ldKSk7XG59XG5cbmV4cG9ydCB7IGluaXQsIHNob3csIGhpZGUgfTtcbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCwgc2hvdywgaGlkZSB9O1xuIiwiaW1wb3J0IFRvZ2dsZSBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdG9nZ2xlJztcblxuY29uc3QgTElTVEVOX0RFTEFZID0gMzAwO1xuY29uc3QgSU5URU5UX0RFTEFZID0gMTAwMDtcblxuZnVuY3Rpb24gaGFuZGxlQ2xvc2VFdmVudHMgKHNjb3BlLCBjYWxsYmFjaywgYWxsRm9jdXNhYmxlKSB7XG5cdGxldCB0aW1lb3V0O1xuXG5cdGNvbnN0IGhhbmRsZUtleWRvd24gPSAoZSkgPT4ge1xuXHRcdGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHRjYWxsYmFjaygpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG5cdFx0aWYgKCFzY29wZS5jb250YWlucyhlLnRhcmdldCkpIHtcblx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZU1vdXNlZW50ZXIgPSAoKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZU1vdXNlbGVhdmUgPSAoKSA9PiB7XG5cdFx0Ly8gSUUgMTEgbW9iaWxlIGZpcmVzIGEgbW91c2VsZWF2ZSBldmVudCB3aGVuIHRoZSBzZWFyY2ggYm94IGdldHMgZm9jdXMuIFRoaXMgbWVhbnMgd2hlbiB0aGUgdXNlciB0cmllc1xuXHRcdC8vIHRvIHVzZSB0aGUgc2VhcmNoIGJveCwgaXQgZGlzYXBwZWFycyBiZWNhdXNlIHRoZSBkcmF3ZXIgY2xvc2VzLlxuXHRcdC8vIE1vdXNlb3V0IGV2ZW50cyBzaG91bGQgb25seSBvY2N1ciB3aGVuIHRoZSBkcmF3ZXIgdGFrZXMgdXAgbGVzcyB0aGFuIDEwMCUgb2YgdGhlIHdpbmRvdywgc28gd2UgY2FuIGlnbm9yZVxuXHRcdC8vIGFueSBldmVudHMgdHJpZ2dlcmVkIGlmIHRoZSB3aWR0aCBvZiB0aGUgZHJhd2VyIGlzIGVxdWFsIHRvIG9yIGJpZ2dlciB0aGFuIHRoZSB3aW5kb3cuaW5uZXJ3aWR0aFxuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSBzY29wZS5vZmZzZXRXaWR0aCkge1xuXHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIElOVEVOVF9ERUxBWSk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZUZvY3VzID0gKGUpID0+IHtcblx0XHRjb25zdCB0YXJnZXQgPSBlLnJlbGF0ZWRUYXJnZXQgfHwgZS50YXJnZXQ7XG5cblx0XHRpZiAoIXNjb3BlLmNvbnRhaW5zKHRhcmdldCkpIHtcblx0XHRcdHNjb3BlLmZvY3VzKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGhhbmRsZVRhYiA9IChlKSA9PiB7XG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gOSkge1xuXHRcdFx0Y29uc3QgZmlyc3RFbCA9IGFsbEZvY3VzYWJsZVswXTtcblx0XHRcdGNvbnN0IGxhc3RFbCA9IGFsbEZvY3VzYWJsZVthbGxGb2N1c2FibGUubGVuZ3RoIC0gMV07XG5cblx0XHRcdC8vIEtlZXAgZm9jdXMgd2l0aGluIHRoZSBkcmF3ZXIgd2hlbiB0YWJiaW5nIGZvciBhMTF5IHJlYXNvbnMuXG5cdFx0XHRpZiAoIWUuc2hpZnRLZXkgJiYgZS50YXJnZXQgPT09IGxhc3RFbCkge1xuXHRcdFx0XHRmaXJzdEVsLmZvY3VzKCk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0gZWxzZSBpZiAoZS5zaGlmdEtleSAmJiBlLnRhcmdldCA9PT0gZmlyc3RFbCkgeyAvLyBsb29wIHRvIHRoZSBib3R0b20gd2hlbiBzaGlmdCt0YWJiaW5nLlxuXHRcdFx0XHRsYXN0RWwuZm9jdXMoKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHRjb25zdCByZW1vdmVFdmVudHMgPSAoKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG5cdFx0c2NvcGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhhbmRsZU1vdXNlZW50ZXIpO1xuXHRcdHNjb3BlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBoYW5kbGVNb3VzZWxlYXZlKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlQ2xpY2spO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlkb3duKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgaGFuZGxlRm9jdXMpO1xuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgaGFuZGxlRm9jdXMpO1xuXHRcdHNjb3BlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVUYWIpO1xuXHR9O1xuXG5cdGNvbnN0IGFkZEV2ZW50cyA9ICgpID0+IHtcblx0XHRzY29wZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaGFuZGxlTW91c2VlbnRlcik7XG5cdFx0c2NvcGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGhhbmRsZU1vdXNlbGVhdmUpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2spO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVDbGljayk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleWRvd24pO1xuXG5cdFx0Ly8gRmlyZWZveCBkb2Vzbid0IHN1cHBvcnQgZm9jdXNpbiBvciBmb2N1c291dFxuXHRcdC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY4Nzc4N1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCBoYW5kbGVGb2N1cyk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCBoYW5kbGVGb2N1cyk7XG5cblx0XHRzY29wZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlVGFiKTtcblx0fTtcblxuXHRyZXR1cm4geyBhZGRFdmVudHMsIHJlbW92ZUV2ZW50cywgaGFuZGxlTW91c2VsZWF2ZSB9O1xufVxuXG5mdW5jdGlvbiBhZGREcmF3ZXJUb2dnbGVzIChkcmF3ZXJFbCwgYWxsRm9jdXNhYmxlKSB7XG5cdGNvbnN0IGNvbnRyb2xzID0gQXJyYXkuZnJvbShkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoYFthcmlhLWNvbnRyb2xzPVwiJHtkcmF3ZXJFbC5pZH1cIl1gKSk7XG5cblx0bGV0IGhhbmRsZUNsb3NlO1xuXHRsZXQgb3BlbmluZ0NvbnRyb2w7XG5cblx0ZnVuY3Rpb24gdG9nZ2xlQ2FsbGJhY2sgKHN0YXRlLCBlKSB7XG5cdFx0aWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG5cdFx0XHR0b2dnbGVUYWJiaW5nKGRyYXdlckVsLCBmYWxzZSwgYWxsRm9jdXNhYmxlKTtcblxuXHRcdFx0aGFuZGxlQ2xvc2UucmVtb3ZlRXZlbnRzKCk7XG5cblx0XHRcdG9wZW5pbmdDb250cm9sLmZvY3VzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvZ2dsZVRhYmJpbmcoZHJhd2VyRWwsIHRydWUsIGFsbEZvY3VzYWJsZSk7XG5cblx0XHRcdC8vIGRvbid0IGNhcHR1cmUgdGhlIGluaXRpYWwgY2xpY2sgb3IgYWNjaWRlbnRhbCBkb3VibGUgdGFwcyBldGMuXG5cdFx0XHQvLyB3ZSBjb3VsZCB1c2UgdHJhbnNpdGlvbmVuZCBidXQgc2NvcGluZyBpcyB0cmlja3kgYW5kIGl0IG5lZWRzIHByZWZpeGluZyBhbmQuLi5cblx0XHRcdHNldFRpbWVvdXQoaGFuZGxlQ2xvc2UuYWRkRXZlbnRzLCBMSVNURU5fREVMQVkpO1xuXG5cdFx0XHQvLyByZWNvcmQgdGhlIG9wZW5pbmcgY29udHJvbCBzbyB3ZSBjYW4gc2VuZCBmb2N1cyBiYWNrIHRvIGl0IHdoZW4gY2xvc2luZyB0aGUgZHJhd2VyXG5cdFx0XHRvcGVuaW5nQ29udHJvbCA9IGUuY3VycmVudFRhcmdldDtcblxuXHRcdFx0Ly8gYXJpYS1jb250cm9scyBpcyBvbmx5IHN1cHBvcnRlZCBieSBKQVdTLlxuXHRcdFx0Ly8gSW4gYSBzZXRUaW1lb3V0IGNhbGxiYWNrIHRvIGF2b2lkIGZsaWNrZXJpbmcgdHJhbnNpdGlvbnMgaW4gQ2hyb21lICh2NTQpXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0Ly8gRG9uJ3QgZm9jdXMgb24gdGhlIGRyYXdlciBpdHNlbGYgb3IgaU9TIFZvaWNlT3ZlciB3aWxsIG1pc3MgaXRcblx0XHRcdFx0Ly8gRm9jdXMgb24gdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50XG5cdFx0XHRcdGNvbnN0IGZpcnN0Rm9jdXNhYmxlID0gZHJhd2VyRWwucXVlcnlTZWxlY3RvcignYSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0Jyk7XG5cblx0XHRcdFx0aWYgKGZpcnN0Rm9jdXNhYmxlKSB7XG5cdFx0XHRcdFx0Zmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRkcmF3ZXJFbC5mb2N1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRkcmF3ZXJFbC5jbGFzc0xpc3QudG9nZ2xlKCdvLWhlYWRlcl9fZHJhd2VyLS1jbG9zaW5nJywgc3RhdGUgPT09ICdjbG9zZScpO1xuXHRcdGRyYXdlckVsLmNsYXNzTGlzdC50b2dnbGUoJ28taGVhZGVyX19kcmF3ZXItLW9wZW5pbmcnLCBzdGF0ZSA9PT0gJ29wZW4nKTtcblx0fVxuXG5cdGNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wpID0+IHtcblx0XHRjb25zdCBkcmF3ZXJUb2dnbGUgPSBuZXcgVG9nZ2xlKGNvbnRyb2wsIHtcblx0XHRcdHRhcmdldDogZHJhd2VyRWwsXG5cdFx0XHRjYWxsYmFjazogdG9nZ2xlQ2FsbGJhY2tcblx0XHR9KTtcblxuXHRcdC8vIEJvdGggdG9nZ2xlcyBoYXZlIHRoZSBzYW1lIHRhcmdldCwgc28gdGhlIHRvZ2dsZSBmdW5jdGlvbiB3aWxsIGJlIHRoZSBzYW1lXG5cdFx0Ly8gSWYgdGhlcmUncyBhIHNlcGFyYXRlIGhhbmRsZUNsb3NlIGluc3RhbmNlIGZvciBlYWNoIHRvZ2dsZSwgcmVtb3ZlRXZlbnRzIGRvZXNuJ3Qgd29ya1xuXHRcdC8vIHdoZW4gdGhlIGNsb3NlIHRvZ2dsZSBpcyBjbGlja2VkXG5cdFx0aWYgKCFoYW5kbGVDbG9zZSkge1xuXHRcdFx0aGFuZGxlQ2xvc2UgPSBoYW5kbGVDbG9zZUV2ZW50cyhkcmF3ZXJFbCwgZHJhd2VyVG9nZ2xlLnRvZ2dsZSwgYWxsRm9jdXNhYmxlKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIG1ha2UgdGhlIGRyYXdlciBwcm9ncmFtbWF0aWNhbGx5IGZvY3VzYWJsZVxuXHRkcmF3ZXJFbC50YWJJbmRleCA9IC0xO1xufVxuXG5mdW5jdGlvbiBhZGRTdWJtZW51VG9nZ2xlcyAoZHJhd2VyRWwpIHtcblx0Y29uc3Qgc3VibWVudXMgPSBkcmF3ZXJFbC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePVwiby1oZWFkZXItZHJhd2VyLWNoaWxkLVwiXScpO1xuXG5cdEFycmF5LmZyb20oc3VibWVudXMpLmZvckVhY2goc3VibWVudSA9PiB7XG5cdFx0Y29uc3QgYnV0dG9uID0gZHJhd2VyRWwucXVlcnlTZWxlY3RvcihgW2FyaWEtY29udHJvbHM9XCIke3N1Ym1lbnUuaWR9XCJdYCk7XG5cblx0XHRzdWJtZW51LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG5cdFx0bmV3IFRvZ2dsZShidXR0b24sIHtcblx0XHRcdHRhcmdldDogc3VibWVudSxcblx0XHRcdGNhbGxiYWNrOiAoc3RhdGUpID0+IHtcblx0XHRcdFx0YnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uLnRleHRDb250ZW50LnJlcGxhY2UoL2Zld2VyfG1vcmUvLCBzdGF0ZSA9PT0gJ29wZW4nID8gJ2Zld2VyJyA6ICdtb3JlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHRvIHNvbHZlIGFjY2Vzc2liaWxpdHkgaXNzdWVcbi8vIHdoZW4gby1oZWFkZXItZHJhd2VyIGlzIGNsb3NlZCA9PiB0YWJiaW5nIGlzIGRpc2FibGVkLlxuLy8gd2hlbiBvLWhlYWRlci1kcmF3ZXIgaXMgb3BlbiA9PiB0YWJiaW5nIGlzIGVuYWJsZWQuXG5mdW5jdGlvbiB0b2dnbGVUYWJiaW5nIChkcmF3ZXJFbCwgaXNFbmFibGVkLCBhbGxGb2N1c2FibGUpIHtcblx0aWYgKGlzRW5hYmxlZCkge1xuXHRcdGFsbEZvY3VzYWJsZS5mb3JFYWNoKGVsID0+IHtcblx0XHRcdGVsLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRhbGxGb2N1c2FibGUuZm9yRWFjaChlbCA9PiB7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5pdCAoKSB7XG5cdGNvbnN0IGRyYXdlckVsID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vLWhlYWRlci1kcmF3ZXJdJyk7XG5cdGlmICghZHJhd2VyRWwpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgYWxsRm9jdXNhYmxlID0gQXJyYXkuZnJvbShkcmF3ZXJFbC5xdWVyeVNlbGVjdG9yQWxsKCdhLCBidXR0b24sIGlucHV0LCBzZWxlY3QnKSk7XG5cdHRvZ2dsZVRhYmJpbmcoZHJhd2VyRWwsIGZhbHNlLCBhbGxGb2N1c2FibGUpO1xuXHRhZGRTdWJtZW51VG9nZ2xlcyhkcmF3ZXJFbCk7XG5cdGFkZERyYXdlclRvZ2dsZXMoZHJhd2VyRWwsIGFsbEZvY3VzYWJsZSk7XG5cblx0Ly8gV3JhcCBpbiBhIHRpbWVvdXQgdG8gc3RvcCBwYWdlIGxvYWQgc3RhbGwgaW4gQ2hyb21lIHY3MyBvbiBBbmRyb2lkXG5cdC8vIHRvZ2dsZVRhYmJpbmcgYW5kIHRoZSByZW1vdmFsIG9mIHRoZSBuby1qcyBhdHRyaWJ1dGUgc3Bpa2VzIHRoZSBDUFVcblx0Ly8gYW5kIGNhdXNlcyB0aGUgbWFpbiBwcm9jZXNzIHRvIGJsb2NrIGZvciBhcm91bmQgMTAgc2Vjb25kcy5cblx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0ZHJhd2VyRWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW8taGVhZGVyLWRyYXdlci0tbm8tanMnKTtcblx0XHRkcmF3ZXJFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1oZWFkZXItZHJhd2VyLS1qcycsICd0cnVlJyk7XG5cdH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQsIGhhbmRsZUNsb3NlRXZlbnRzIH07XG5leHBvcnQgeyBpbml0LCBoYW5kbGVDbG9zZUV2ZW50cyB9O1xuIiwiLyoqXG4qXG4qIERlYm91bmNlcyBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBhZnRlciBuIG1pbGxpc2Vjb25kc1xuKiB3aXRob3V0IGl0IG5vdCBiZWluZyBjYWxsZWRcbipcbiogQGV4YW1wbGVcbiogVXRpbHMuZGVib3VuY2UobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gRGVib3VuY2VkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbipcbiogVGhyb3R0bGUgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgb25jZSBldmVyeSBuIG1pbGxpc2Vjb25kc1xuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy50aHJvdHRsZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBUaHJvdHRsZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgKiBhcyBvVXRpbHMgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzJztcblxuZnVuY3Rpb24gaW5pdChoZWFkZXJFbCkge1xuXHRjb25zdCBzdWJuYXYgPSBoZWFkZXJFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vLWhlYWRlci1zdWJuYXZdJyk7XG5cblx0aWYgKHN1Ym5hdiA9PT0gbnVsbCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGJ1dHRvbnMgPSBBcnJheS5mcm9tKHN1Ym5hdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYnV0dG9uJykpO1xuXHRjb25zdCB3cmFwcGVyID0gc3VibmF2LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW8taGVhZGVyLXN1Ym5hdi13cmFwcGVyXScpO1xuXG5cdGxldCBzY3JvbGxXaWR0aDtcblx0Y29uc3Qgd3JhcHBlcldpZHRoID0gd3JhcHBlci5jbGllbnRXaWR0aDtcblxuXHRmdW5jdGlvbiBjaGVja0N1cnJlbnRQb3NpdGlvbigpIHtcblx0XHRjb25zdCBjdXJyZW50U2VsZWN0aW9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKCdbYXJpYS1jdXJyZW50XScpO1xuXHRcdGlmIChjdXJyZW50U2VsZWN0aW9uKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50U2VsZWN0aW9uRW5kID0gY3VycmVudFNlbGVjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5yaWdodDtcblxuXHRcdFx0Ly9pZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXMgd2lkZXIgdGhhbiB0aGUgZW5kIG9mIHRoZSB3cmFwcGVyXG5cdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbkVuZCA+IHdyYXBwZXJXaWR0aCkge1xuXHRcdFx0XHQvLyBjaGVjayBieSBob3cgbXVjaFxuXHRcdFx0XHRsZXQgZGlmZiA9IGN1cnJlbnRTZWxlY3Rpb25FbmQgLSB3cmFwcGVyV2lkdGg7XG5cdFx0XHRcdC8vIGlmIHRoZSBkaWZmZXJlbmNlIGlzIGdyZWF0ZXIgdGhhbiBoYWxmIG9mIHRoZSB3cmFwcGVyLCBzY3JvbGwgdG8gdGhlIGVuZCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb24uXG5cdFx0XHRcdGRpZmYgPSBkaWZmID4gd3JhcHBlcldpZHRoIC8gMiA/IGN1cnJlbnRTZWxlY3Rpb25FbmQgOiB3cmFwcGVyV2lkdGggLyAyO1xuXG5cdFx0XHRcdHdyYXBwZXIuc2Nyb2xsVG8oZGlmZiwgMCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHNjcm9sbGFibGUoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRpcmVjdGlvbihidXR0b24pIHtcblx0XHRyZXR1cm4gYnV0dG9uLmNsYXNzTmFtZS5tYXRjaCgvbGVmdHxyaWdodC8pLnBvcCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsYWJsZSgpIHtcblx0XHRzY3JvbGxXaWR0aCA9IHdyYXBwZXIuc2Nyb2xsV2lkdGg7XG5cblx0XHRidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcblx0XHRcdGlmIChkaXJlY3Rpb24oYnV0dG9uKSA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRcdGJ1dHRvbi5kaXNhYmxlZCA9IHdyYXBwZXIuc2Nyb2xsTGVmdCA9PT0gMDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHJlbWFpbmluZyA9IHNjcm9sbFdpZHRoIC0gd3JhcHBlcldpZHRoIC0gd3JhcHBlci5zY3JvbGxMZWZ0O1xuXHRcdFx0XHQvLyBBbGxvdyBhIGxpdHRsZSBkaWZmZXJlbmNlIGFzIHNjcm9sbFdpZHRoIGlzIGZhc3QsIG5vdCBhY2N1cmF0ZS5cblx0XHRcdFx0YnV0dG9uLmRpc2FibGVkID0gcmVtYWluaW5nIDw9IDE7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGwoZSkge1xuXHRcdGxldCBkaXN0YW5jZSA9IDEwMDtcblxuXHRcdGlmIChkaXJlY3Rpb24oZS5jdXJyZW50VGFyZ2V0KSA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRkaXN0YW5jZSA9ICh3cmFwcGVyLnNjcm9sbExlZnQgPiBkaXN0YW5jZSA/IGRpc3RhbmNlIDogd3JhcHBlci5zY3JvbGxMZWZ0KSAqIC0xO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCByZW1haW5pbmcgPSBzY3JvbGxXaWR0aCAtIHdyYXBwZXJXaWR0aCAtIHdyYXBwZXIuc2Nyb2xsTGVmdDtcblx0XHRcdGRpc3RhbmNlID0gcmVtYWluaW5nID4gZGlzdGFuY2UgPyBkaXN0YW5jZSA6IHJlbWFpbmluZztcblx0XHR9XG5cblx0XHR3cmFwcGVyLnNjcm9sbExlZnQgPSB3cmFwcGVyLnNjcm9sbExlZnQgKyBkaXN0YW5jZTtcblxuXHRcdHNjcm9sbGFibGUoKTtcblx0fVxuXG5cdHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb1V0aWxzLnRocm90dGxlKHNjcm9sbGFibGUsIDEwMCkpO1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0LnJlc2l6ZScsIHNjcm9sbGFibGUpO1xuXG5cdGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuXHRcdGJ1dHRvbi5vbmNsaWNrID0gc2Nyb2xsO1xuXHR9KTtcblxuXHRjaGVja0N1cnJlbnRQb3NpdGlvbigpO1xufVxuXG5leHBvcnQgeyBpbml0IH07XG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTtcbiIsImltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzJztcblxuZnVuY3Rpb24gaW5pdCAoaGVhZGVyRWwpIHtcblx0aWYgKCFoZWFkZXJFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtby1oZWFkZXItLXN0aWNreScpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGV0IHZpZXdwb3J0T2Zmc2V0O1xuXHRsZXQgbGFzdFNjcm9sbERlcHRoO1xuXHRsZXQgbGFzdEFuaW1hdGlvbkZyYW1lO1xuXHRsZXQgbGFzdFN0aWNreVN0YXRlO1xuXG5cdGZ1bmN0aW9uIGhhbmRsZUZyYW1lICgpIHtcblx0XHQvLyBzdGlja3kgZWwgd2lsbCBhcHBlYXIgd2hlbiBzY3JvbGxlZCBkb3duIGZyb20gcGFnZSB0b3AgdG9cblx0XHQvLyAoYXJiaXRyYXJpbHkpID4gaGFsZiB0aGUgdmlld3BvcnQgaGVpZ2h0XG5cdFx0Y29uc3Qgc2Nyb2xsRGVwdGggPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFk7XG5cdFx0Y29uc3QgaXNBY3RpdmUgPSBzY3JvbGxEZXB0aCA+IHZpZXdwb3J0T2Zmc2V0O1xuXG5cdFx0aGVhZGVyRWwuY2xhc3NMaXN0LnRvZ2dsZSgnby1oZWFkZXItLXN0aWNreS1hY3RpdmUnLCBpc0FjdGl2ZSk7XG5cblx0XHRpZiAoaXNBY3RpdmUgIT09IGxhc3RTdGlja3lTdGF0ZSkge1xuXHRcdFx0bGFzdFN0aWNreVN0YXRlID0gaXNBY3RpdmU7XG5cdFx0XHRoZWFkZXJFbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb0hlYWRlci5TdGlja3knLCB7IGJ1YmJsZXM6IHRydWUsIGRldGFpbDogeyBpc0FjdGl2ZSB9fSkpO1xuXHRcdH1cblxuXHRcdC8vIGFsbG93IGEgbGl0dGxlIHdpZ2dsaW5nIHJvb20gc28gd2UgZG9uJ3QgZ2V0IHRvbyBoYXN0eSB0b2dnbGluZyB1cC9kb3duIHN0YXRlXG5cdFx0aWYgKE1hdGguYWJzKHNjcm9sbERlcHRoIC0gbGFzdFNjcm9sbERlcHRoKSA+IDIwKSB7XG5cdFx0XHRjb25zdCBpc1Njcm9sbGluZ0Rvd24gPSBsYXN0U2Nyb2xsRGVwdGggPCBzY3JvbGxEZXB0aDtcblx0XHRcdGhlYWRlckVsLmNsYXNzTGlzdC50b2dnbGUoJ28taGVhZGVyLS1zdGlja3ktc2Nyb2xsLWRvd24nLCBpc0FjdGl2ZSAmJiBpc1Njcm9sbGluZ0Rvd24pO1xuXHRcdFx0aGVhZGVyRWwuY2xhc3NMaXN0LnRvZ2dsZSgnby1oZWFkZXItLXN0aWNreS1zY3JvbGwtdXAnLCBpc0FjdGl2ZSAmJiAhaXNTY3JvbGxpbmdEb3duKTtcblx0XHR9XG5cblx0XHRsYXN0U2Nyb2xsRGVwdGggPSBzY3JvbGxEZXB0aDtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0YXJ0TG9vcCAoKSB7XG5cdFx0dmlld3BvcnRPZmZzZXQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuXG5cdFx0bGFzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRoYW5kbGVGcmFtZSgpO1xuXHRcdFx0c3RhcnRMb29wKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdG9wTG9vcCAoKSB7XG5cdFx0aWYgKGxhc3RBbmltYXRpb25GcmFtZSkge1xuXHRcdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGxhc3RBbmltYXRpb25GcmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gc2Nyb2xsU3RhcnQgKCkge1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxTdGFydCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlZFNjcm9sbEVuZCk7XG5cdFx0c3RhcnRMb29wKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxFbmQgKCkge1xuXHRcdHN0b3BMb29wKCk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlZFNjcm9sbEVuZCk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbFN0YXJ0KTtcblx0fVxuXG5cdGNvbnN0IGRlYm91bmNlZFNjcm9sbEVuZCA9IGRlYm91bmNlKHNjcm9sbEVuZCwgMzAwKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsU3RhcnQpO1xuXG5cdGhhbmRsZUZyYW1lKCk7XG59XG5cbmV4cG9ydCB7IGluaXQgfTtcbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9O1xuIiwiaW1wb3J0IHNlYXJjaCBmcm9tICcuL3NlYXJjaC5qcyc7XG5pbXBvcnQgbWVnYSBmcm9tICcuL21lZ2EuanMnO1xuaW1wb3J0IGRyYXdlciBmcm9tICcuL2RyYXdlci5qcyc7XG5pbXBvcnQgc3VibmF2IGZyb20gJy4vc3VibmF2LmpzJztcbmltcG9ydCBzdGlja3kgZnJvbSAnLi9zdGlja3kuanMnO1xuXG5jbGFzcyBIZWFkZXIge1xuXG5cdGNvbnN0cnVjdG9yIChoZWFkZXJFbCkge1xuXHRcdGlmICghaGVhZGVyRWwpIHtcblx0XHRcdGhlYWRlckVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtby1jb21wb25lbnQ9XCJvLWhlYWRlclwiXScpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGhlYWRlckVsID09PSAnc3RyaW5nJykge1xuXHRcdFx0aGVhZGVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGhlYWRlckVsKTtcblx0XHR9XG5cblx0XHRpZiAoaGVhZGVyRWwuaGFzQXR0cmlidXRlKCdkYXRhLW8taGVhZGVyLS1qcycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5oZWFkZXJFbCA9IGhlYWRlckVsO1xuXG5cdFx0c2VhcmNoLmluaXQodGhpcy5oZWFkZXJFbCk7XG5cdFx0bWVnYS5pbml0KHRoaXMuaGVhZGVyRWwpO1xuXHRcdGRyYXdlci5pbml0KHRoaXMuaGVhZGVyRWwpO1xuXHRcdHN1Ym5hdi5pbml0KHRoaXMuaGVhZGVyRWwpO1xuXHRcdHN0aWNreS5pbml0KHRoaXMuaGVhZGVyRWwpO1xuXG5cdFx0dGhpcy5oZWFkZXJFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtby1oZWFkZXItLW5vLWpzJyk7XG5cdFx0dGhpcy5oZWFkZXJFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1oZWFkZXItLWpzJywgJycpO1xuXHR9XG5cblx0c3RhdGljIGluaXQgKHJvb3RFbCkge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cdFx0aWYgKC9cXGJvLWhlYWRlclxcYi8udGVzdChyb290RWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JykpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEhlYWRlcihyb290RWwpO1xuXHRcdH1cblxuXHRcdHJldHVybiBbXS5tYXAuY2FsbChyb290RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLWhlYWRlclwiXScpLCBlbCA9PiB7XG5cdFx0XHRpZiAoIWVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1vLWhlYWRlci0tanMnKSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEhlYWRlcihlbCk7XG5cdFx0XHR9XG5cdFx0fSkuZmlsdGVyKChoZWFkZXIpID0+IHtcblx0XHRcdHJldHVybiBoZWFkZXIgIT09IHVuZGVmaW5lZDtcblx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiIsImltcG9ydCBIZWFkZXIgZnJvbSAnLi9zcmMvanMvaGVhZGVyLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuXHRIZWFkZXIuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuIiwiaW1wb3J0ICcuLi8uLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNldHVwRGVtbyk7XG5cbmRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcblx0XHRzZXR1cERlbW8oKTtcblx0fSBlbHNlIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnICYmICFkb2N1bWVudC5hdHRhY2hFdmVudCkge1xuXHRcdHNldHVwRGVtbygpO1xuXHR9XG59O1xuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHRzZXR1cERlbW8oKTtcbn0gZWxzZSBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyAmJiAhZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0c2V0dXBEZW1vKCk7XG59XG5cblxuZnVuY3Rpb24gc2V0dXBEZW1vKCkge1xuXHRpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGVtby1zdGlja3knKSkge1xuXHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0cC5jbGFzc05hbWUgPSAnZGVtby1zdGlja3ktbWVzc2FnZSBkZW1vLXN0aWNreS1tZXNzYWdlLS0nO1xuXG5cdFx0aWYgKHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wKSB7XG5cdFx0XHRwLmNsYXNzTmFtZSArPSAncG9wb3V0Jztcblx0XHRcdHAudGV4dENvbnRlbnQgPSAnUGxlYXNlIG9wZW4gdGhpcyBkZW1vIGluIGEgbmV3IHdpbmRvdyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHAuY2xhc3NOYW1lICs9ICdzY3JvbGwnO1xuXHRcdFx0cC50ZXh0Q29udGVudCA9ICdTY3JvbGwgZG93bic7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKTtcblx0fVxuXG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc05hbWUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UoJ2NvcmUnLCAnZW5oYW5jZWQnKTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn1cbiJdfQ==