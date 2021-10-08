function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  } // src/js/drawer.js


  var Drawer = /*#__PURE__*/function () {
    "use strict";

    function Drawer(headerEl) {
      var _this2 = this;

      _classCallCheck(this, Drawer);

      this.headerEl = headerEl;
      this.class = {
        drawer: "o-header-services__primary-nav--drawer",
        open: "o-header-services__primary-nav--open"
      };
      this.relatedContent = headerEl.querySelector(".o-header-services__related-content");
      this.nav = headerEl.querySelector(".o-header-services__primary-nav");

      if (!this.nav && this.relatedContent) {
        this.nav = document.createElement("div");
        this.nav.classList.add("o-header-services__primary-nav");
        this.nav.setAttribute("aria-label", "primary navigation");
        this.nav.setAttribute("aria-hidden", "true");
        this.navList = document.createElement("ul");
        this.navList.classList.add("o-header-services__primary-nav-list");
        this.nav.appendChild(this.navList);
        this.headerEl.appendChild(this.nav);
      }

      if (!this.nav) {
        return;
      }

      this.navList = this.nav.querySelector(".o-header-services__primary-nav-list");
      var drawerHeader = document.createElement("li");
      drawerHeader.classList.add("o-header-services__drawer-header");
      this.drawerCloseButton = document.createElement("button");
      this.drawerCloseButton.classList.add("o-header-services__drawer-close-button");
      this.drawerCloseButton.innerText = "Close";

      if (this.navList) {
        drawerHeader.appendChild(this.drawerCloseButton);

        if (this.navList && this.navList.firstChild) {
          this.navList.insertBefore(drawerHeader, this.navList.firstChild);
        } else {
          this.navList.appendChild(drawerHeader);
        }
      }

      this.debouncedRender = debounce(function () {
        return _this2.render();
      }, 33);
      this.burger = this.headerEl.querySelector(".o-header-services__hamburger-icon");

      if (this.burger) {
        this.burger.addEventListener("click", this);
      }

      window.addEventListener("resize", this);
      window.addEventListener("keydown", this);
      this.render();
    }

    _createClass(Drawer, [{
      key: "handleEvent",
      value: function handleEvent(event) {
        if (event.type === "resize") {
          this.debouncedRender();
        }

        if (event.type === "keydown" && this.burger) {
          if (event.key === "Escape" && this.nav.classList.contains(this.class.open)) {
            this.toggleDrawer();
            this.burger.focus();
          }
        }

        if (event.type === "click" && this.burger && [this.nav, this.burger, this.drawerCloseButton].includes(event.target)) {
          event.preventDefault();
          this.toggleDrawer();
        }
      }
    }, {
      key: "enabled",
      get: function get() {
        return this.nav && this.burger && this.burger.offsetHeight !== 0;
      }
    }, {
      key: "render",
      value: function render() {
        if (this.enabled) {
          this.nav.addEventListener("click", this);
        } else {
          this.nav.removeEventListener("click", this);
        }

        if (this.relatedContent && this.enabled) {
          this.navList.appendChild(this.relatedContent);
        }

        if (this.relatedContent && !this.enabled) {
          var headerTop = this.headerEl.querySelector(".o-header-services__top");
          headerTop.appendChild(this.relatedContent);
        }

        if (this.enabled) {
          this.nav.classList.add(this.class.drawer);
        }

        if (!this.enabled) {
          this.nav.classList.remove(this.class.drawer);
        }

        this.nav.setAttribute("aria-hidden", this.enabled);
      }
    }, {
      key: "toggleDrawer",
      value: function toggleDrawer() {
        this.nav.classList.toggle(this.class.open);
        var open = this.nav.classList.contains(this.class.open);
        this.nav.setAttribute("aria-hidden", !open);
        this.burger.setAttribute("aria-expanded", open);
        this.burger.querySelector("span").innerText = open ? "Close primary navigation" : "Open primary navigation";

        if (open) {
          setTimeout(function () {
            this.drawerCloseButton.focus();
          }.bind(this), 50);
        }
      }
    }]);

    return Drawer;
  }();

  var drawer_default = Drawer; // src/js/drop-down.js

  var DropDown = /*#__PURE__*/function () {
    "use strict";

    function DropDown(headerEl) {
      var _this3 = this;

      var drawer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _classCallCheck(this, DropDown);

      this.primaryNav = headerEl.querySelector(".o-header-services__primary-nav");
      this.drawer = drawer;
      this.headerEl = headerEl;
      this.navItems = _toConsumableArray(headerEl.querySelectorAll('[data-o-header-services-level="1"]'));
      this.navItems.forEach(function (item) {
        var button = item.querySelector("button");

        if (!button) {
          return;
        }

        button.addEventListener("click", _this3);
      });
      document.body.addEventListener("click", this);
      window.addEventListener("keydown", this);

      if (window.ResizeObserver && this.drawer && this.drawer.burger) {
        var resizeObserver = new ResizeObserver(this.reset.bind(this));
        resizeObserver.observe(this.drawer.burger);
      } else {
        window.addEventListener("resize", debounce(function () {
          return _this3.reset();
        }, 33));
      }
    }

    _createClass(DropDown, [{
      key: "handleEvent",
      value: function handleEvent(event) {
        if (event.key === "Escape") {
          this.reset();
        }

        if (event.type === "click" && event.target) {
          if (event.target.nodeName !== "BUTTON" && event.target.nodeName !== "A" && event.target !== this.drawer.navList) {
            this.reset();
            return;
          }

          var parentMenu;

          for (var itemIndex = 0; itemIndex < this.navItems.length; itemIndex++) {
            var navItem = this.navItems[itemIndex];

            if (navItem.contains(event.target)) {
              parentMenu = navItem;
              break;
            }
          }

          if (!parentMenu) {
            return;
          }

          if (!DropDown.isExpanded(parentMenu)) {
            if (!this.isDrawer()) {
              DropDown.collapseAll(this.navItems);
            }

            DropDown.expand(parentMenu);
          } else {
            DropDown.collapse(parentMenu);
          }

          event.stopPropagation();
        }
      }
    }, {
      key: "isDrawer",
      value: function isDrawer() {
        return this.drawer && this.drawer.enabled;
      }
    }, {
      key: "reset",
      value: function reset() {
        this.headerEl.classList.add("o-header-services--disable-transition");
        window.requestAnimationFrame(function () {
          DropDown.collapseAll(this.navItems);

          if (this.isDrawer()) {
            DropDown.expandAll(DropDown.getCurrent(this.navItems));
          }

          this.headerEl.classList.remove("o-header-services--disable-transition");
        }.bind(this));
      }
    }], [{
      key: "isExpanded",
      value: function isExpanded(item) {
        return item.getAttribute("aria-expanded") === "true";
      }
    }, {
      key: "expand",
      value: function expand(item) {
        var childList = item.querySelector("ul");
        requestAnimationFrame(function () {
          childList.setAttribute("aria-hidden", false);
          DropDown.position(childList);
          requestAnimationFrame(function () {
            item.setAttribute("aria-expanded", true);
          });
        });
      }
    }, {
      key: "position",
      value: function position(item) {
        if (item.getBoundingClientRect().right > window.innerWidth) {
          item.classList.add("o-header-services__list--right");
        }
      }
    }, {
      key: "collapse",
      value: function collapse(item) {
        var childList = item.querySelector("ul");
        item.setAttribute("aria-expanded", false);
        childList.setAttribute("aria-hidden", true);
      }
    }, {
      key: "collapseAll",
      value: function collapseAll(items) {
        items.forEach(DropDown.collapse);
      }
    }, {
      key: "expandAll",
      value: function expandAll(items) {
        items.forEach(DropDown.expand);
      }
    }, {
      key: "getCurrent",
      value: function getCurrent(items) {
        return items.filter(function (item) {
          var links = item.querySelectorAll("a");
          var hasCurrentLink = Array.from(links).reduce(function (result, link) {
            var ariaCurrent = link.getAttribute("aria-current");
            return result || ariaCurrent === "true" || ariaCurrent === "page";
          }, false);
          return hasCurrentLink;
        });
      }
    }]);

    return DropDown;
  }();

  var drop_down_default = DropDown; // src/js/scroll.js

  var Scroll = /*#__PURE__*/function () {
    "use strict";

    function Scroll(headerEl) {
      var _this4 = this;

      _classCallCheck(this, Scroll);

      this.headerEl = headerEl;
      this.container = headerEl.querySelector("[data-o-header-services-nav]");

      if (!this.container) {
        return;
      }

      this.list = this.container.querySelector("[data-o-header-services-nav-list]");
      this.buttons = Array.from(this.container.getElementsByTagName("button"), function (button) {
        button.addEventListener("click", _this4.scroll.bind(_this4));
        return button;
      });
      this.width = {};
      this.list.addEventListener("scroll", debounce(this.toggleScrollButtons.bind(this), 100));
      window.addEventListener("resize", debounce(this.toggleScrollButtons.bind(this), 500));
      this.render();
    }

    _createClass(Scroll, [{
      key: "render",
      value: function render() {
        this.showCurrentSelection();
        this.toggleScrollButtons();
      }
    }, {
      key: "toggleScrollButtons",
      value: function toggleScrollButtons() {
        var _this5 = this;

        this._getWidths();

        this.buttons.forEach(function (button) {
          if (button.className.match("left")) {
            button.disabled = _this5.list.scrollLeft === 0;
          } else {
            var remaining = _this5.width.list > _this5.width.container ? _this5._remaining() : 0;
            button.disabled = remaining <= 1;
          }
        });
      }
    }, {
      key: "scroll",
      value: function scroll(event) {
        var target = event.currentTarget;
        var distance = 100;

        if (target.className.match("left")) {
          distance = (this.list.scrollLeft > distance ? distance : this.list.scrollLeft) * -1;
        } else {
          var remaining = this._remaining();

          distance = remaining > distance ? distance : remaining;
        }

        this.list.scrollLeft = this.list.scrollLeft + distance;
        this.toggleScrollButtons();
      }
    }, {
      key: "_remaining",
      value: function _remaining() {
        return this.width.list - this.width.container - this.list.scrollLeft;
      }
    }, {
      key: "_getWidths",
      value: function _getWidths() {
        this.width.list = this.list.scrollWidth;
        this.width.container = this.list.clientWidth;
      }
    }, {
      key: "showCurrentSelection",
      value: function showCurrentSelection() {
        this._getWidths();

        var currentSelection = this.list.querySelector("[aria-current]");

        if (!currentSelection) {
          return;
        }

        var currentSelectionEnd = currentSelection.getBoundingClientRect().right;

        if (currentSelectionEnd > this.width.container) {
          var diff = currentSelectionEnd - this.width.container;
          diff = diff > this.width.container / 2 ? currentSelectionEnd : this.width.container / 2;
          this.list.scrollTo({
            left: diff,
            top: 0,
            behaviour: "smooth"
          });
        }
      }
    }]);

    return Scroll;
  }();

  var scroll_default = Scroll; // src/js/header.js

  var HeaderServices = /*#__PURE__*/function () {
    "use strict";

    function HeaderServices(headerEl) {
      _classCallCheck(this, HeaderServices);

      var drawer = new drawer_default(headerEl);
      new drop_down_default(headerEl, drawer);
      new scroll_default(headerEl);
      headerEl.setAttribute("data-o-header-services-js", true);
    }

    _createClass(HeaderServices, null, [{
      key: "init",
      value: function init(rootElement, options) {
        if (!rootElement) {
          rootElement = document.body;
        }

        if (!(rootElement instanceof HTMLElement)) {
          rootElement = document.querySelector(rootElement);
        }

        if (rootElement instanceof HTMLElement && rootElement.matches("[data-o-component=o-header-services]")) {
          return new HeaderServices(rootElement, options);
        }

        return Array.from(rootElement.querySelectorAll('[data-o-component="o-header-services"]'), function (rootElement2) {
          return new HeaderServices(rootElement2, options);
        });
      }
    }]);

    return HeaderServices;
  }();

  var header_default = HeaderServices; // main.js

  var constructAll = function constructAll() {
    header_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/main.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCJzcmMvanMvZHJhd2VyLmpzIiwic3JjL2pzL2Ryb3AtZG93bi5qcyIsInNyYy9qcy9zY3JvbGwuanMiLCJzcmMvanMvaGVhZGVyLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsV0FBQSxRQUFBLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLEVBQThCO0FBQzdCLFFBQUksT0FBSjtBQUNBLFdBQU8sWUFBVztBQUFBOztBQUNqQixVQUFNLElBQUEsR0FBTyxTQUFiOztBQUNBLFVBQU0sS0FBQSxHQUFRLFNBQVIsS0FBUSxHQUFNO0FBQ25CLFFBQUEsT0FBQSxHQUFVLElBQVY7QUFDQSxRQUFBLElBQUEsQ0FBSyxLQUFMLENBQVcsS0FBWCxFQUFpQixJQUFqQjtBQUFpQixPQUZsQjs7QUFJQSxNQUFBLFlBQUEsQ0FBYSxPQUFiLENBQUE7QUFDQSxNQUFBLE9BQUEsR0FBVSxVQUFBLENBQVcsS0FBWCxFQUFrQixJQUFsQixDQUFWO0FBQTRCLEtBUDdCO0FBTzZCLEc7OztBQ3BCOUIsTUFBQSxNQUFBO0FBQUE7O0FBS0Msb0JBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBOztBQUNyQixXQUFLLFFBQUwsR0FBZ0IsUUFBaEI7QUFDQSxXQUFLLEtBQUwsR0FBYTtBQUNaLFFBQUEsTUFBQSxFQUFRLHdDQURJO0FBRVosUUFBQSxJQUFBLEVBQU07QUFGTSxPQUFiO0FBS0EsV0FBSyxjQUFMLEdBQXNCLFFBQUEsQ0FBUyxhQUFULENBQXVCLHFDQUF2QixDQUF0QjtBQUNBLFdBQUssR0FBTCxHQUFXLFFBQUEsQ0FBUyxhQUFULENBQXVCLGlDQUF2QixDQUFYOztBQUtBLFVBQUksQ0FBQyxLQUFLLEdBQU4sSUFBYSxLQUFLLGNBQXRCLEVBQXNDO0FBQ3JDLGFBQUssR0FBTCxHQUFXLFFBQUEsQ0FBUyxhQUFULENB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QUF2QixDQUFkO0FBQXFDOztBQUV0QyxZQUFJLFdBQUEsWUFBdUIsV0FBdkIsSUFBc0MsV0FBQSxDQUFZLE9BQVosQ0FBb0Isc0NBQXBCLENBQTFDLEVBQXVHO0FBQ3RHLGlCQUFPLElBQUksY0FBSixDQUFtQixXQUFuQixFQUFnQyxPQUFoQyxDQUFQO0FBQXVDOztBQUV4QyxlQUFPLEtBQUEsQ0FBTSxJQUFOLENBQVcsV0FBQSxDQUFZLGdCQUFaLENBQTZCLHdDQUE3QixDQUFYLEVBQW1GLFVBQUEsWUFBQTtBQUFBLGlCQUFlLElBQUksY0FBSixDQUFtQixZQUFuQixFQUFnQyxPQUFoQyxDQUFmO0FBQUEsU0FBbkYsQ0FBUDtBQUF5STtBQTVCM0k7O0FBQUE7QUFBQSxLQUFBOztBQWdDQSxNQUFPLGNBQUEsR0FBUSxjQUFmLEM7O0FDbENBLE1BQU0sWUFBQSxHQUFlLFNBQWYsWUFBZSxHQUFNO0FBQzFCLElBQUEsY0FBQSxDQUFlLElBQWY7QUFDQSxJQUFBLFFBQUEsQ0FBUyxtQkFBVCxDQUE2QixvQkFBN0IsRUFBbUQsWUFBbkQ7QUFBbUQsR0FGcEQ7O0FBS0EsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELFlBQWhELEU7O0FDTEEsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsSUFBQSxRQUFBLENBQVMsYUFBVCxDQUF1QixJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQXVDLEdBRHhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qXG4qIERlYm91bmNlcyBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBhZnRlciBuIG1pbGxpc2Vjb25kc1xuKiB3aXRob3V0IGl0IG5vdCBiZWluZyBjYWxsZWRcbipcbiogQGV4YW1wbGVcbiogVXRpbHMuZGVib3VuY2UobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gRGVib3VuY2VkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbipcbiogVGhyb3R0bGUgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgb25jZSBldmVyeSBuIG1pbGxpc2Vjb25kc1xuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy50aHJvdHRsZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBUaHJvdHRsZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgKiBhcyBvVXRpbHMgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzJztcblxuY2xhc3MgRHJhd2VyIHtcblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbaGVhZGVyRWxdIC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICovXG5cdGNvbnN0cnVjdG9yKGhlYWRlckVsKSB7XG5cdFx0dGhpcy5oZWFkZXJFbCA9IGhlYWRlckVsO1xuXHRcdHRoaXMuY2xhc3MgPSB7XG5cdFx0XHRkcmF3ZXI6ICdvLWhlYWRlci1zZXJ2aWNlc19fcHJpbWFyeS1uYXYtLWRyYXdlcicsXG5cdFx0XHRvcGVuOiAnby1oZWFkZXItc2VydmljZXNfX3ByaW1hcnktbmF2LS1vcGVuJ1xuXHRcdH07XG5cblx0XHR0aGlzLnJlbGF0ZWRDb250ZW50ID0gaGVhZGVyRWwucXVlcnlTZWxlY3RvcignLm8taGVhZGVyLXNlcnZpY2VzX19yZWxhdGVkLWNvbnRlbnQnKTtcblx0XHR0aGlzLm5hdiA9IGhlYWRlckVsLnF1ZXJ5U2VsZWN0b3IoJy5vLWhlYWRlci1zZXJ2aWNlc19fcHJpbWFyeS1uYXYnKTtcblxuXHRcdC8vIElmIHRoZSBwcmltYXJ5IG5hdiBgbmF2YCBkb2VzIG5vdCBleGlzdCwgYnV0IHJlbGF0ZWQgY29udGVudCBkb2VzLFxuXHRcdC8vIHRoZW4gY3JlYXRlIGFuIGVtcHR5IHByaW1hcnkgbmF2IHdoaWNoIGZ1bmN0aW9ucyBhcyBhIGRyYXcgZm9yXG5cdFx0Ly8gcmVsYXRlZCBjb250ZW50IG9uIG1vYmlsZS5cblx0XHRpZiAoIXRoaXMubmF2ICYmIHRoaXMucmVsYXRlZENvbnRlbnQpIHtcblx0XHRcdHRoaXMubmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHR0aGlzLm5hdi5jbGFzc0xpc3QuYWRkKCdvLWhlYWRlci1zZXJ2aWNlc19fcHJpbWFyeS1uYXYnKTtcblx0XHRcdHRoaXMubmF2LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdwcmltYXJ5IG5hdmlnYXRpb24nKTtcblx0XHRcdHRoaXMubmF2LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpOyAvLyBIaWRkZW4gdW50aWwgcmVsYXRlZCBjb250ZW50IGlzIGFkZGVkIHRoZSBkcmF3ZXIuXG5cblx0XHRcdHRoaXMubmF2TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cdFx0XHR0aGlzLm5hdkxpc3QuY2xhc3NMaXN0LmFkZCgnby1oZWFkZXItc2VydmljZXNfX3ByaW1hcnktbmF2LWxpc3QnKTtcblx0XHRcdHRoaXMubmF2LmFwcGVuZENoaWxkKHRoaXMubmF2TGlzdCk7XG5cblx0XHRcdHRoaXMuaGVhZGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5uYXYpO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZXJlJ3Mgbm8gcHJpbWFyeSBuYXYgYW5kIHdlIGRpZG4ndCBjcmVhdGUgb25lIGV4aXQuXG5cdFx0aWYgKCF0aGlzLm5hdikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMubmF2TGlzdCA9IHRoaXMubmF2LnF1ZXJ5U2VsZWN0b3IoJy5vLWhlYWRlci1zZXJ2aWNlc19fcHJpbWFyeS1uYXYtbGlzdCcpO1xuXG5cdFx0Ly8gQ3JlYXRlIGRyYXdlciBoZWFkZXIuXG5cdFx0Y29uc3QgZHJhd2VySGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRkcmF3ZXJIZWFkZXIuY2xhc3NMaXN0LmFkZCgnby1oZWFkZXItc2VydmljZXNfX2RyYXdlci1oZWFkZXInKTtcblx0XHR0aGlzLmRyYXdlckNsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0dGhpcy5kcmF3ZXJDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdvLWhlYWRlci1zZXJ2aWNlc19fZHJhd2VyLWNsb3NlLWJ1dHRvbicpO1xuXHRcdHRoaXMuZHJhd2VyQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gJ0Nsb3NlJztcblx0XHQvLyBBZGQgZHJhd2VyIGhlYWRlciB0byBuYXZsaXN0LCB3aXRoIGNsb3NlIGJ1dHRvbi5cblx0XHRpZiAodGhpcy5uYXZMaXN0KSB7XG5cdFx0XHRkcmF3ZXJIZWFkZXIuYXBwZW5kQ2hpbGQodGhpcy5kcmF3ZXJDbG9zZUJ1dHRvbik7XG5cdFx0XHRpZiAodGhpcy5uYXZMaXN0ICYmIHRoaXMubmF2TGlzdC5maXJzdENoaWxkKSB7XG5cdFx0XHRcdHRoaXMubmF2TGlzdC5pbnNlcnRCZWZvcmUoZHJhd2VySGVhZGVyLCB0aGlzLm5hdkxpc3QuZmlyc3RDaGlsZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLm5hdkxpc3QuYXBwZW5kQ2hpbGQoZHJhd2VySGVhZGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmRlYm91bmNlZFJlbmRlciA9IG9VdGlscy5kZWJvdW5jZSgoKSA9PiB0aGlzLnJlbmRlcigpLCAzMyk7XG5cdFx0dGhpcy5idXJnZXIgPSB0aGlzLmhlYWRlckVsLnF1ZXJ5U2VsZWN0b3IoJy5vLWhlYWRlci1zZXJ2aWNlc19faGFtYnVyZ2VyLWljb24nKTtcblx0XHRpZiAodGhpcy5idXJnZXIpIHtcblx0XHRcdHRoaXMuYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG5cdFx0fVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMpO1xuXG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBIYW5kbGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBlbWl0dGVkIGJ5IGVsZW1lbnQvd2luZG93IGludGVyYWN0aW9uc1xuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0aGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ3Jlc2l6ZScpIHtcblx0XHRcdHRoaXMuZGVib3VuY2VkUmVuZGVyKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJyAmJiB0aGlzLmJ1cmdlcikge1xuXHRcdFx0aWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgJiYgdGhpcy5uYXYuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Mub3BlbikpIHtcblx0XHRcdFx0dGhpcy50b2dnbGVEcmF3ZXIoKTtcblx0XHRcdFx0dGhpcy5idXJnZXIuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJyAmJiB0aGlzLmJ1cmdlciAmJiBbdGhpcy5uYXYsIHRoaXMuYnVyZ2VyLCB0aGlzLmRyYXdlckNsb3NlQnV0dG9uXS5pbmNsdWRlcyhldmVudC50YXJnZXQpKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy50b2dnbGVEcmF3ZXIoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdGhlIGRyYXdlciBpcyBjdXJyZW50bHkgZW5hYmxlZC5cblx0ICogSWYgdGhlIGJ1cmdlciBlbGVtZW50IGlzIHZpc2libGUsIHRoZSBkcmF3ZXIgaXMgZW5hYmxlZC5cblx0ICovXG5cdGdldCBlbmFibGVkICgpIHtcblx0XHRyZXR1cm4gdGhpcy5uYXYgJiYgdGhpcy5idXJnZXIgJiYgdGhpcy5idXJnZXIub2Zmc2V0SGVpZ2h0ICE9PSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIERyYXdlciByZW5kZXJpbmdcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHJlbmRlciAoKSB7XG5cdFx0aWYgKHRoaXMuZW5hYmxlZCkge1xuXHRcdFx0dGhpcy5uYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5uYXYucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblx0XHR9XG5cblx0XHQvLyBTaGlmdCByZWxhdGVkIGNvbnRlbnQgKHNpZ24gaW4sIGV0YykgYmV0d2VlbiBkcmF3ZXIgYW5kIGhlYWRlciB0aXRsZSBzZWN0aW9uXG5cdFx0aWYgKHRoaXMucmVsYXRlZENvbnRlbnQgJiYgdGhpcy5lbmFibGVkKSB7XG5cdFx0XHR0aGlzLm5hdkxpc3QuYXBwZW5kQ2hpbGQodGhpcy5yZWxhdGVkQ29udGVudCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnJlbGF0ZWRDb250ZW50ICYmICF0aGlzLmVuYWJsZWQpIHtcblx0XHRcdGNvbnN0IGhlYWRlclRvcCA9IHRoaXMuaGVhZGVyRWwucXVlcnlTZWxlY3RvcignLm8taGVhZGVyLXNlcnZpY2VzX190b3AnKTtcblx0XHRcdGhlYWRlclRvcC5hcHBlbmRDaGlsZCh0aGlzLnJlbGF0ZWRDb250ZW50KTtcblx0XHR9XG5cblx0XHQvLyBUb2dnbGUgZHJhd2VyIGNsYXNzbGlzdC4gQ2Fubm90IHVzZSBgdG9nZ2xlYCBhcyBJRTExIGRvZXMgbm90IHN1cHBvcnRcblx0XHQvLyB0aGUgYHRvZ2dsZWAgbWV0aG9kLCBhbmQgYWRkaW5nIGEgbmV3IHBvbHlmaWxsIHJlcXVpcmVtZW50IGlzIGFcblx0XHQvLyBicmVha2luZyBjaGFuZ2UuXG5cdFx0aWYodGhpcy5lbmFibGVkKSB7XG5cdFx0XHR0aGlzLm5hdi5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3MuZHJhd2VyKTtcblx0XHR9XG5cdFx0aWYoIXRoaXMuZW5hYmxlZCkge1xuXHRcdFx0dGhpcy5uYXYuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzLmRyYXdlcik7XG5cdFx0fVxuXG5cdFx0dGhpcy5uYXYuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRoaXMuZW5hYmxlZCk7XG5cdH1cblxuXHQvKipcblx0ICogRHJhd2VyIGhpZGUvc2hvdyBmdW5jdGlvbmFsaXR5XG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHR0b2dnbGVEcmF3ZXIgKCkge1xuXHRcdHRoaXMubmF2LmNsYXNzTGlzdC50b2dnbGUodGhpcy5jbGFzcy5vcGVuKTtcblx0XHRjb25zdCBvcGVuID0gdGhpcy5uYXYuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3Mub3Blbik7XG5cblx0XHR0aGlzLm5hdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgIW9wZW4pO1xuXHRcdHRoaXMuYnVyZ2VyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIG9wZW4pO1xuXHRcdHRoaXMuYnVyZ2VyLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS5pbm5lclRleHQgPSBvcGVuID8gJ0Nsb3NlIHByaW1hcnkgbmF2aWdhdGlvbicgOiAnT3BlbiBwcmltYXJ5IG5hdmlnYXRpb24nO1xuXG5cdFx0aWYgKG9wZW4pIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0dGhpcy5kcmF3ZXJDbG9zZUJ1dHRvbi5mb2N1cygpO1xuXHRcdFx0fS5iaW5kKHRoaXMpLCA1MCk7IC8vIFdhaXQgZm9yIGRyYXdlciB0byBiZSBvcGVuXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdlcjtcbiIsImltcG9ydCAqIGFzIG9VdGlscyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdXRpbHMnO1xuXG5jbGFzcyBEcm9wRG93biB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBoZWFkZXJFbCAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7RHJhd2VyfG51bGx9IGRyYXdlciBbbnVsbF0gLSBUaGUgZHJhd2VyIHRoYXQgdGhpcyBkcm9wIGRvd24gYmVsb25ncyB0byBpZiBhbnkuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihoZWFkZXJFbCwgZHJhd2VyID0gbnVsbCkge1xuXHRcdHRoaXMucHJpbWFyeU5hdiA9IGhlYWRlckVsLnF1ZXJ5U2VsZWN0b3IoJy5vLWhlYWRlci1zZXJ2aWNlc19fcHJpbWFyeS1uYXYnKTtcblx0XHR0aGlzLmRyYXdlciA9IGRyYXdlcjtcblx0XHR0aGlzLmhlYWRlckVsID0gaGVhZGVyRWw7XG5cblx0XHR0aGlzLm5hdkl0ZW1zID0gWy4uLmhlYWRlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8taGVhZGVyLXNlcnZpY2VzLWxldmVsPVwiMVwiXScpXTtcblx0XHR0aGlzLm5hdkl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRjb25zdCBidXR0b24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuXHRcdFx0aWYgKCFidXR0b24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG5cdFx0fSk7XG5cblx0XHQvLyB0aGUgZXZlbnQgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIGJvZHkgaGVyZSB0byBoYW5kbGUgY2FzZXMgd2hlcmUgYVxuXHRcdC8vIHVzZXIgbWlnaHQgY2xpY2sgYW55d2hlcmUgZWxzZSBvbiB0aGUgYm9keSB0byBjb2xsYXBzZSBvcGVuIGRyb3Bkb3duc1xuXHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMpO1xuXG5cdFx0Ly8gV2hlbiB0aGUgZHJhd2VyIGlzIGVuYWJsZWQgb3IgZGlzYWJsZWQgcmVzZXQgdGhlIGRyb3Bkb3ducy5cblx0XHQvLyBUaGUgYnJlYWtwb2ludCB0aGUgZHJhd2VyIGlzIGVuYWJsZWQgaXMgY3VzdG9taXNhYmxlIHdpdGggU0FTUyxcblx0XHQvLyB3ZSB1c2UgdGhlIGRyYXdlciBidXJnZXIgaWNvbiB2aXNpYmlsaXR5IHRvIGRlY2lkZSB3aGVuIGl0IGlzIGVuYWJsZWQuXG5cdFx0Ly8gVXNlIFJlc2l6ZU9ic2VydmVyIHdoZXJlIHN1cHBvcnRlZCB0byBkZXRlY3QgZHJhd2VyIGljb24gY2hhbmdlcyB3aGVyZVxuXHRcdC8vIHBvc3NpYmxlLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gYSBkZWJvdW5jZWQgcmVzaXplIGxpc3RlbmVyLlxuXHRcdGlmICh3aW5kb3cuUmVzaXplT2JzZXJ2ZXIgJiYgdGhpcy5kcmF3ZXIgJiYgdGhpcy5kcmF3ZXIuYnVyZ2VyKSB7XG5cdFx0XHRjb25zdCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLnJlc2V0LmJpbmQodGhpcykpO1xuXHRcdFx0cmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRyYXdlci5idXJnZXIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb1V0aWxzLmRlYm91bmNlKCgpID0+IHRoaXMucmVzZXQoKSwgMzMpKTtcblx0XHR9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBIYW5kbGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBlbWl0dGVkIGJ5IGVsZW1lbnQvd2luZG93IGludGVyYWN0aW9uc1xuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0aGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXHRcdH1cblxuXHRcdGlmIChldmVudC50eXBlID09PSAnY2xpY2snICYmIGV2ZW50LnRhcmdldCkge1xuXHRcdFx0Ly8gQ2xvc2UgZHJvcGRvd24gaWYgc29tZSBub24tbmF2IGVsZW1lbnQgb24gdGhlIHBhZ2UgaXMgY2xpY2tlZC5cblx0XHRcdGlmIChldmVudC50YXJnZXQubm9kZU5hbWUgIT09ICdCVVRUT04nICYmXG5cdFx0XHRcdGV2ZW50LnRhcmdldC5ub2RlTmFtZSAhPT0gJ0EnICYmXG5cdFx0XHRcdGV2ZW50LnRhcmdldCAhPT0gdGhpcy5kcmF3ZXIubmF2TGlzdFxuXHRcdFx0KSB7XG5cdFx0XHRcdHRoaXMucmVzZXQoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCYWlsIGlmIHRoZXJlJ3Mgbm8gcGFyZW50IG1lbnUgdG8gdG9nZ2xlLiBOb3RlOiBJRTExIGRvZXMgbm90XG5cdFx0XHQvLyBzdXBwb3J0IGBBcnJheS5wcm90b3R5cGUuZmluZCgpYCBvciBgRWxlbWVudC5jbG9zZXN0KClgLFxuXHRcdFx0Ly8gYWRkaW5nIGEgcG9seWZpbGwgcmVxdWlyZW1lbnQgaXMgYSBicmVha2luZyBjaGFuZ2Vcblx0XHRcdGxldCBwYXJlbnRNZW51O1xuXHRcdFx0Zm9yIChsZXQgaXRlbUluZGV4ID0gMDsgaXRlbUluZGV4IDwgdGhpcy5uYXZJdGVtcy5sZW5ndGg7IGl0ZW1JbmRleCsrKSB7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW0gPSB0aGlzLm5hdkl0ZW1zW2l0ZW1JbmRleF07XG5cblx0XHRcdFx0aWYgKG5hdkl0ZW0uY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuXHRcdFx0XHRcdHBhcmVudE1lbnUgPSBuYXZJdGVtO1xuXHRcdFx0XHRcdGJyZWFrOyAvLyBmb3VuZCB0aGUgcGFyZW50IG1lbnVcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXBhcmVudE1lbnUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUb2dnbGUgdGhlIG1lbnUuIENsb3NlIG90aGVyIG9wZW4gbWVudXMgd2hlbiBub3QgaW4gdGhlIGRyYXdlci5cblx0XHRcdGlmICghRHJvcERvd24uaXNFeHBhbmRlZChwYXJlbnRNZW51KSkge1xuXHRcdFx0XHRpZiAoIXRoaXMuaXNEcmF3ZXIoKSkge1xuXHRcdFx0XHRcdERyb3BEb3duLmNvbGxhcHNlQWxsKHRoaXMubmF2SXRlbXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdERyb3BEb3duLmV4cGFuZChwYXJlbnRNZW51KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdERyb3BEb3duLmNvbGxhcHNlKHBhcmVudE1lbnUpO1xuXHRcdFx0fVxuXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHByaW1hcnkgbmF2IGlzIGluIGEgZHJhd2VyXG5cdCAqIFRoaXMgYm9vbGVhbiB3aWxsIGNoYW5nZSB0aGUgZHJvcCBkb3duIGJlaGF2aW91ci5cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gLSB3aGV0aGVyIHRoZSBkcmF3ZXIgaXMgZW5hYmxlZCBvciBub3Rcblx0ICovXG5cdGlzRHJhd2VyKCkge1xuXHRcdHJldHVybiB0aGlzLmRyYXdlciAmJiB0aGlzLmRyYXdlci5lbmFibGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgbmF2IGl0ZW1zIHRvIHRoZWlyIG9yaWdpbmFsIGNvbGxhcHNlZCBzdGF0ZSxcblx0ICogaXRlbXMgd2hpY2ggY29udGFpbiBsaW5rcyB3aXRoIHRoZSBhdHRyaWJ1dGUgYGFyaWEtY3VycmVudGBcblx0ICogc2V0IHRvIHRydWUgcmVtYWluIGV4cGFuZGVkLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0cmVzZXQoKSB7XG5cdFx0Ly8gRGlzYWJsZSB0cmFuc2l0aW9ucyBpbW1lZGlhdGVseS4gVGhlc2Ugc2hvdWxkIG9ubHkgaGFwcGVuIG9uIHVzZXJcblx0XHQvLyBpbnRlcmFjdGlvbi4gV2UgZG8gbm90IHdhbnQgdGhlIGRyb3Bkb3ducyB0byB0cmFuc2l0aW9uIHdoZW4gd2UgYXJlXG5cdFx0Ly8gcmVzZXR0aW5nIHRoZW0gaS5lLiBkdWUgdG8gdGhlIGRyYXdlciBiZWluZyBlbmFibGVkIG9uIGEgdmlld3BvcnRcblx0XHQvLyBjaGFuZ2UuXG5cdFx0dGhpcy5oZWFkZXJFbC5jbGFzc0xpc3QuYWRkKCdvLWhlYWRlci1zZXJ2aWNlcy0tZGlzYWJsZS10cmFuc2l0aW9uJyk7XG5cdFx0Ly8gSW4gdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lLi4uXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBDbG9zZSBhbGwgZHJvcGRvd25zIGV4Y2VwdCB3aXRoaW4gdGhlIGRyYXdlciBvbmx5LCB3aGVyZSB0aGVcblx0XHRcdC8vIGRyb3Bkb3duIGZvciB0aGUgY3VycmVudCBwYWdlIHNob3VsZCBiZSBvcGVuLlxuXHRcdFx0RHJvcERvd24uY29sbGFwc2VBbGwodGhpcy5uYXZJdGVtcyk7XG5cdFx0XHRpZiAodGhpcy5pc0RyYXdlcigpKSB7XG5cdFx0XHRcdERyb3BEb3duLmV4cGFuZEFsbChEcm9wRG93bi5nZXRDdXJyZW50KHRoaXMubmF2SXRlbXMpKTtcblx0XHRcdH1cblx0XHRcdC8vIEVuYWJsZSB0cmFuc2l0aW9ucyBhZ2Fpbiwgd2hpY2ggc2hvdWxkIGhhcHBlbiBvbiB1c2VyIGludGVyYWN0aW9uXG5cdFx0XHR0aGlzLmhlYWRlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ28taGVhZGVyLXNlcnZpY2VzLS1kaXNhYmxlLXRyYW5zaXRpb24nKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyB3aGV0aGVyIG5hdiBtZW51IGlzIGV4cGFuZGVkXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGl0ZW0gLSB0aGUgbmF2IG1lbnVcblx0ICogQHJldHVybiB7Ym9vbGVhbn0gLSB3aGV0aGVyIHRoZSBuYXYgbWVudSBpcyBleHBhbmRlZFxuXHQgKi9cblx0c3RhdGljIGlzRXhwYW5kZWQoaXRlbSkge1xuXHRcdHJldHVybiBpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG5cdH1cblxuXHQvKipcblx0ICogRXhwYW5kcyBjbG9zZWQgbmF2IG1lbnVcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaXRlbSAtIHRoZSBuYXYgbWVudVxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0c3RhdGljIGV4cGFuZChpdGVtKSB7XG5cdFx0Y29uc3QgY2hpbGRMaXN0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRjaGlsZExpc3Quc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblx0XHRcdERyb3BEb3duLnBvc2l0aW9uKGNoaWxkTGlzdCk7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRpdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hhbmdlcyBuYXYgbWVudSBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgd2luZG93XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGl0ZW0gLSB0aGUgbmF2IG1lbnVcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHN0YXRpYyBwb3NpdGlvbihpdGVtKSB7XG5cdFx0aWYgKGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkucmlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuXHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdvLWhlYWRlci1zZXJ2aWNlc19fbGlzdC0tcmlnaHQnKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ29sbGFwc2VzIG9wZW4gbmF2IG1lbnVcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaXRlbSAtIHRoZSBuYXYgbWVudVxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0c3RhdGljIGNvbGxhcHNlKGl0ZW0pIHtcblx0XHRjb25zdCBjaGlsZExpc3QgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG5cdFx0aXRlbS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG5cdFx0Y2hpbGRMaXN0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb2xsYXBzZXMgYWxsIG9wZW4gbmF2IG1lbnVzXG5cdCAqIEBwYXJhbSB7QXJyYXk8SFRNTEVsZW1lbnQ+fSBpdGVtcyAtIHRoZSBtZW51IGl0ZW1zIHRvIGNvbGxhcHNlXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRzdGF0aWMgY29sbGFwc2VBbGwoaXRlbXMpIHtcblx0XHRpdGVtcy5mb3JFYWNoKERyb3BEb3duLmNvbGxhcHNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIGFsbCBvcGVuIG5hdiBtZW51c1xuXHQgKiBAcGFyYW0ge0FycmF5PEhUTUxFbGVtZW50Pn0gaXRlbXMgLSB0aGUgbWVudSBpdGVtcyB0byBleHBhbmRcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHN0YXRpYyBleHBhbmRBbGwoaXRlbXMpIHtcblx0XHRpdGVtcy5mb3JFYWNoKERyb3BEb3duLmV4cGFuZCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBpdGVtcyB3aGljaCBjb250YWluIGFuIGFuY2hvclxuXHQgKiB3aXRoIHRoZSBhdHRyaWJ1dGUgYGFyaWEtY3VycmVudGAgc2V0IHRvIHRydWUgb3IgXCJwYWdlXCIuXG5cdCAqIEBwYXJhbSB7QXJyYXk8SFRNTEVsZW1lbnQ+fSBpdGVtcyAtIHRoZSBtZW51IGl0ZW1zIHRvIGNoZWNrXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSAtIFRoZSBjdXJyZW50IG1lbnUgaXRlbVxuXHQgKi9cblx0c3RhdGljIGdldEN1cnJlbnQoaXRlbXMpIHtcblx0XHRyZXR1cm4gaXRlbXMuZmlsdGVyKGl0ZW0gPT4ge1xuXHRcdFx0Y29uc3QgbGlua3MgPSBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHRcdGNvbnN0IGhhc0N1cnJlbnRMaW5rID0gQXJyYXkuZnJvbShsaW5rcykucmVkdWNlKChyZXN1bHQsIGxpbmspID0+IHtcblx0XHRcdFx0Ly8gQ2hlY2sgYWdhaW5zdCBcInBhZ2VcIiBhbmQgXCJ0cnVlXCIgYXMgby1oZWFkZXItc2VydmljZXNcblx0XHRcdFx0Ly8gdXNlZCBcInRydWVcIiBpbiBpdHMgbWFya3VwIGJlZm9yZSBzd2l0Y2hpbmcgdG8gXCJwYWdlXCIuXG5cdFx0XHRcdC8vIGh0dHBzOi8vd3d3LmFkaXR1cy5pby9hcmlhL2FyaWEtY3VycmVudC8jYXJpYS1jdXJyZW50LXBhZ2Vcblx0XHRcdFx0Y29uc3QgYXJpYUN1cnJlbnQgPSBsaW5rLmdldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JykgO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0IHx8IChhcmlhQ3VycmVudCA9PT0gJ3RydWUnIHx8IGFyaWFDdXJyZW50ID09PSAncGFnZScpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0cmV0dXJuIGhhc0N1cnJlbnRMaW5rO1xuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BEb3duO1xuIiwiaW1wb3J0ICogYXMgb1V0aWxzIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby11dGlscyc7XG5cbmNsYXNzIFNjcm9sbCB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbaGVhZGVyRWxdIC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICovXG5cdGNvbnN0cnVjdG9yIChoZWFkZXJFbCkge1xuXHRcdHRoaXMuaGVhZGVyRWwgPSBoZWFkZXJFbDtcblx0XHR0aGlzLmNvbnRhaW5lciA9IGhlYWRlckVsLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW8taGVhZGVyLXNlcnZpY2VzLW5hdl0nKTtcblxuXHRcdGlmICghdGhpcy5jb250YWluZXIpIHsgcmV0dXJuOyB9XG5cblx0XHR0aGlzLmxpc3QgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vLWhlYWRlci1zZXJ2aWNlcy1uYXYtbGlzdF0nKTtcblx0XHR0aGlzLmJ1dHRvbnMgPSBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdidXR0b24nKSwgYnV0dG9uID0+IHtcblx0XHRcdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2Nyb2xsLmJpbmQodGhpcykpO1xuXHRcdFx0cmV0dXJuIGJ1dHRvbjtcblx0XHR9KTtcblxuXHRcdHRoaXMud2lkdGggPSB7fTtcblxuXHRcdHRoaXMubGlzdC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvVXRpbHMuZGVib3VuY2UodGhpcy50b2dnbGVTY3JvbGxCdXR0b25zLmJpbmQodGhpcyksIDEwMCkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvVXRpbHMuZGVib3VuY2UodGhpcy50b2dnbGVTY3JvbGxCdXR0b25zLmJpbmQodGhpcyksIDUwMCkpO1xuXG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTY3JvbGwgZnVuY3Rpb25hbGl0eSByZW5kZXJpbmdcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHJlbmRlciAoKSB7XG5cdFx0dGhpcy5zaG93Q3VycmVudFNlbGVjdGlvbigpO1xuXHRcdHRoaXMudG9nZ2xlU2Nyb2xsQnV0dG9ucygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhpZGUvc2hvdyBzY3JvbGwgYnV0dG9uc1xuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0dG9nZ2xlU2Nyb2xsQnV0dG9ucyAoKSB7XG5cdFx0dGhpcy5fZ2V0V2lkdGhzKCk7XG5cdFx0dGhpcy5idXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcblx0XHRcdGlmIChidXR0b24uY2xhc3NOYW1lLm1hdGNoKCdsZWZ0JykpIHtcblx0XHRcdFx0YnV0dG9uLmRpc2FibGVkID0gdGhpcy5saXN0LnNjcm9sbExlZnQgPT09IDA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCByZW1haW5pbmcgPSB0aGlzLndpZHRoLmxpc3QgPiB0aGlzLndpZHRoLmNvbnRhaW5lciA/IHRoaXMuX3JlbWFpbmluZygpIDogMDtcblx0XHRcdFx0YnV0dG9uLmRpc2FibGVkID0gcmVtYWluaW5nIDw9IDE7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogU2Nyb2xsaW5nIGZ1bmN0aW9uYWxpdHlcblx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gQSBzY3JvbGwgZXZlbnRcblx0ICogQHJldHVybiB7dm9pZH1cblx0ICovXG5cdHNjcm9sbChldmVudCkge1xuXHRcdGNvbnN0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cdFx0bGV0IGRpc3RhbmNlID0gMTAwO1xuXG5cdFx0aWYgKHRhcmdldC5jbGFzc05hbWUubWF0Y2goJ2xlZnQnKSkge1xuXHRcdFx0ZGlzdGFuY2UgPSAodGhpcy5saXN0LnNjcm9sbExlZnQgPiBkaXN0YW5jZSA/IGRpc3RhbmNlIDogdGhpcy5saXN0LnNjcm9sbExlZnQpICogLTE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHJlbWFpbmluZyA9IHRoaXMuX3JlbWFpbmluZygpO1xuXHRcdFx0ZGlzdGFuY2UgPSByZW1haW5pbmcgPiBkaXN0YW5jZSA/IGRpc3RhbmNlIDogcmVtYWluaW5nO1xuXHRcdH1cblxuXHRcdHRoaXMubGlzdC5zY3JvbGxMZWZ0ID0gdGhpcy5saXN0LnNjcm9sbExlZnQgKyBkaXN0YW5jZTtcblxuXHRcdHRoaXMudG9nZ2xlU2Nyb2xsQnV0dG9ucygpO1xuXHR9XG5cblx0X3JlbWFpbmluZyAoKSB7XG5cdFx0cmV0dXJuIHRoaXMud2lkdGgubGlzdCAtIHRoaXMud2lkdGguY29udGFpbmVyIC0gdGhpcy5saXN0LnNjcm9sbExlZnQ7XG5cdH1cblxuXHRfZ2V0V2lkdGhzICgpIHtcblx0XHR0aGlzLndpZHRoLmxpc3QgPSB0aGlzLmxpc3Quc2Nyb2xsV2lkdGg7XG5cdFx0dGhpcy53aWR0aC5jb250YWluZXIgPSB0aGlzLmxpc3QuY2xpZW50V2lkdGg7XG5cdH1cblxuXHQvKipcblx0ICogU2Nyb2xsIHNlY29uZGFyeSBuYXYgdG8gJ2N1cnJlbnQgc2VsZWN0aW9uJ1xuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0c2hvd0N1cnJlbnRTZWxlY3Rpb24gKCkge1xuXHRcdHRoaXMuX2dldFdpZHRocygpO1xuXHRcdGNvbnN0IGN1cnJlbnRTZWxlY3Rpb24gPSB0aGlzLmxpc3QucXVlcnlTZWxlY3RvcignW2FyaWEtY3VycmVudF0nKTtcblxuXHRcdGlmICghY3VycmVudFNlbGVjdGlvbikgeyByZXR1cm47IH1cblxuXHRcdGNvbnN0IGN1cnJlbnRTZWxlY3Rpb25FbmQgPSBjdXJyZW50U2VsZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuXG5cdFx0Ly9pZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaXMgd2lkZXIgdGhhbiB0aGUgZW5kIG9mIHRoZSBsaXN0XG5cdFx0aWYgKGN1cnJlbnRTZWxlY3Rpb25FbmQgPiB0aGlzLndpZHRoLmNvbnRhaW5lcikge1xuXHRcdFx0Ly8gY2hlY2sgYnkgaG93IG11Y2hcblx0XHRcdGxldCBkaWZmID0gY3VycmVudFNlbGVjdGlvbkVuZCAtIHRoaXMud2lkdGguY29udGFpbmVyO1xuXHRcdFx0Ly8gaWYgdGhlIGRpZmZlcmVuY2UgaXMgZ3JlYXRlciB0aGFuIGhhbGYgb2YgdGhlIGxpc3QsIHNjcm9sbCB0byB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cblx0XHRcdGRpZmYgPSBkaWZmID4gdGhpcy53aWR0aC5jb250YWluZXIgLyAyID8gY3VycmVudFNlbGVjdGlvbkVuZCA6IHRoaXMud2lkdGguY29udGFpbmVyIC8gMjtcblxuXHRcdFx0dGhpcy5saXN0LnNjcm9sbFRvKHsgbGVmdDogZGlmZiwgdG9wOiAwLCBiZWhhdmlvdXI6ICdzbW9vdGgnIH0pO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGw7XG4iLCJpbXBvcnQgRHJhd2VyIGZyb20gJy4vZHJhd2VyLmpzJztcbmltcG9ydCBEcm9wRG93biBmcm9tICcuL2Ryb3AtZG93bi5qcyc7XG5pbXBvcnQgU2Nyb2xsIGZyb20gJy4vc2Nyb2xsLmpzJztcblxuY2xhc3MgSGVhZGVyU2VydmljZXMge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2hlYWRlckVsXSAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciAoaGVhZGVyRWwpIHtcblx0XHRjb25zdCBkcmF3ZXIgPSBuZXcgRHJhd2VyKGhlYWRlckVsKTtcblx0XHRuZXcgRHJvcERvd24oaGVhZGVyRWwsIGRyYXdlcik7XG5cdFx0bmV3IFNjcm9sbChoZWFkZXJFbCk7XG5cdFx0aGVhZGVyRWwuc2V0QXR0cmlidXRlKCdkYXRhLW8taGVhZGVyLXNlcnZpY2VzLWpzJywgdHJ1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSBoZWFkZXIgY29tcG9uZW50XG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbnRpYWxpc2UgdGhlIGNvbXBvbmVudCBpbiwgb3IgYSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSByb290IGVsZW1lbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50XG5cdCAqIEByZXR1cm4ge0FycmF5PEhUTUxFbGVtZW50PnxIVE1MRWxlbWVudH0gLSBUaGUgaGVhZGVyKHMpIGluaXRhbGlzZWQuXG5cdCAqL1xuXHRzdGF0aWMgaW5pdCAocm9vdEVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRpZiAoIXJvb3RFbGVtZW50KSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghKHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsZW1lbnQpO1xuXHRcdH1cblx0XHRpZiAocm9vdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiByb290RWxlbWVudC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLWhlYWRlci1zZXJ2aWNlc10nKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBIZWFkZXJTZXJ2aWNlcyhyb290RWxlbWVudCwgb3B0aW9ucyk7XG5cdFx0fVxuXHRcdHJldHVybiBBcnJheS5mcm9tKHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1oZWFkZXItc2VydmljZXNcIl0nKSwgcm9vdEVsZW1lbnQgPT4gbmV3IEhlYWRlclNlcnZpY2VzKHJvb3RFbGVtZW50LCBvcHRpb25zKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyU2VydmljZXM7XG4iLCJpbXBvcnQgSGVhZGVyU2VydmljZXMgZnJvbSAnLi9zcmMvanMvaGVhZGVyLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuXHRIZWFkZXJTZXJ2aWNlcy5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJTZXJ2aWNlcztcbiIsImltcG9ydCAnLi4vLi4vbWFpbi5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pO1xuIl19