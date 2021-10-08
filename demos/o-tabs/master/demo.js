function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/Tabs.js
  var Tabs = /*#__PURE__*/function () {
    "use strict";

    function Tabs(rootEl, config) {
      _classCallCheck(this, Tabs);

      this.rootEl = rootEl;
      this.rootEl.setAttribute("data-o-tabs--js", "");
      this.updateUrl = rootEl.getAttribute("data-o-tabs-update-url") !== null;
      this.selectedTabIndex = -1;
      this.tabEls = this.rootEl.querySelectorAll("[role=tab]");
      this.tabEls = [].slice.call(this.tabEls).filter(this.tabHasValidUrl);
      this.tabpanelEls = this.getTabPanelEls(this.tabEls);
      this.boundClickHandler = this.clickHandler.bind(this);
      this.rootEl.addEventListener("click", this.boundClickHandler, false);
      this.boundKeyPressHandler = this.keyPressHandler.bind(this);
      this.rootEl.addEventListener("keypress", this.boundKeyPressHandler, false);
      this.boundHashChangeHandler = this.hashChangeHandler.bind(this);
      window.addEventListener("hashchange", this.boundHashChangeHandler, false);

      if (!config) {
        config = {};
        Array.prototype.forEach.call(this.rootEl.attributes, function (attr) {
          if (attr.name.includes("data-o-tabs")) {
            var key = attr.name.replace("data-o-tabs-", "");

            try {
              config[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
            } catch (e) {
              config[key] = attr.value;
            }
          }
        });
      }

      this.config = config;
      this.dispatchCustomEvent("ready", {
        tabs: this
      });
      this.selectTab(this.getSelectedTabIndex(), false);
    }

    _createClass(Tabs, [{
      key: "getTabTargetId",
      value: function getTabTargetId(tabEl) {
        var linkEls = tabEl.getElementsByTagName("a");
        return linkEls && linkEls[0] ? linkEls[0].getAttribute("href").replace("#", "") : "";
      }
    }, {
      key: "getTabPanelEls",
      value: function getTabPanelEls(tabEls) {
        var panelEls = [];

        var _iterator = _createForOfIteratorHelper(tabEls),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var tab = _step.value;
            var tabTargetId = this.getTabTargetId(tab);
            var targetEl = document.getElementById(tabTargetId);

            if (targetEl) {
              tab.setAttribute("aria-controls", tabTargetId);
              tab.setAttribute("tabindex", "0");
              var label = tab.getElementsByTagName("a")[0];
              var labelId = tabTargetId + "-label";
              label.setAttribute("tabindex", "-1");
              label.id = labelId;
              targetEl.setAttribute("aria-labelledby", labelId);
              targetEl.setAttribute("role", "tabpanel");
              targetEl.setAttribute("tabindex", "0");
              panelEls.push(targetEl);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return panelEls;
      }
    }, {
      key: "getTabElementFromHash",
      value: function getTabElementFromHash() {
        var tabLink = this.rootEl.querySelector("[href=\"".concat(location.hash, "\"]"));
        return tabLink && tabLink.parentNode ? tabLink.parentNode : null;
      }
    }, {
      key: "getTabIndexFromElement",
      value: function getTabIndexFromElement(el) {
        return this.tabEls.indexOf(el);
      }
    }, {
      key: "getSelectedTabElement",
      value: function getSelectedTabElement() {
        return this.rootEl.querySelector("[aria-selected=true]");
      }
    }, {
      key: "getSelectedTabIndex",
      value: function getSelectedTabIndex() {
        var selectedTabElement = this.updateUrl && location.hash ? this.getTabElementFromHash() : this.getSelectedTabElement();
        return selectedTabElement ? this.getTabIndexFromElement(selectedTabElement) : 0;
      }
    }, {
      key: "isValidTab",
      value: function isValidTab(index) {
        return !isNaN(index) && index >= 0 && index < this.tabEls.length;
      }
    }, {
      key: "hidePanel",
      value: function hidePanel(panelEl) {
        panelEl.setAttribute("aria-expanded", "false");
        panelEl.setAttribute("aria-hidden", "true");
      }
    }, {
      key: "showPanel",
      value: function showPanel(panelEl, disableFocus) {
        panelEl.setAttribute("aria-expanded", "true");
        panelEl.setAttribute("aria-hidden", "false");
        panelEl.style.outline = 0;

        if (disableFocus) {
          return;
        }

        var x = window.scrollX || window.pageXOffset;
        var y = window.scrollY || window.pageYOffset;
        panelEl.focus();
        window.scrollTo(x, y);
      }
    }, {
      key: "dispatchCustomEvent",
      value: function dispatchCustomEvent(event) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "oTabs";
        this.rootEl.dispatchEvent(new CustomEvent(namespace + "." + event, {
          detail: data,
          bubbles: true
        }));
      }
    }, {
      key: "selectTab",
      value: function selectTab(newIndex) {
        var updateUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.updateUrl;

        if (this.isValidTab(newIndex)) {
          if (this.tabpanelEls[newIndex].id && updateUrl) {
            location.href = "#" + this.tabpanelEls[newIndex].id;
          }

          if (newIndex !== this.selectedTabIndex) {
            for (var i = 0; i < this.tabEls.length; i++) {
              if (newIndex === i) {
                this.tabEls[i].setAttribute("aria-selected", "true");
                this.showPanel(this.tabpanelEls[i], this.config.disablefocus);
              } else {
                this.tabEls[i].setAttribute("aria-selected", "false");
                this.hidePanel(this.tabpanelEls[i]);
              }
            }

            this.dispatchCustomEvent("tabSelect", {
              tabs: this,
              selected: newIndex,
              lastSelected: this.selectedTabIndex
            });
            this.selectedTabIndex = newIndex;
          }
        }
      }
    }, {
      key: "clickHandler",
      value: function clickHandler(ev) {
        var tabEl = ev.target.closest("[role=tab]");

        if (tabEl && this.tabHasValidUrl(tabEl)) {
          ev.preventDefault();
          this.updateCurrentTab(tabEl);
        }
      }
    }, {
      key: "keyPressHandler",
      value: function keyPressHandler(ev) {
        var tabEl = ev.target.closest("[role=tab]");

        if (tabEl && ev.keyCode === 13 && this.tabHasValidUrl(tabEl)) {
          ev.preventDefault();
          this.updateCurrentTab(tabEl);
        }
      }
    }, {
      key: "hashChangeHandler",
      value: function hashChangeHandler() {
        if (!this.updateUrl) {
          return;
        }

        var tabEl = this.getTabElementFromHash();

        if (tabEl) {
          this.updateCurrentTab(tabEl);
        }
      }
    }, {
      key: "updateCurrentTab",
      value: function updateCurrentTab(tabEl) {
        var index = this.getTabIndexFromElement(tabEl);
        this.selectTab(index);
        this.dispatchCustomEvent("event", {
          category: "tabs",
          action: "click",
          tab: tabEl.textContent.trim()
        }, "oTracking");
      }
    }, {
      key: "tabHasValidUrl",
      value: function tabHasValidUrl(tabEl) {
        var linkEls = tabEl.getElementsByTagName("a");

        if (!linkEls || !linkEls[0].hash) {
          return false;
        }

        return linkEls[0].pathname === location.pathname;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.rootEl.removeEventListener("click", this.boundClickHandler, false);
        this.rootEl.removeEventListener("keypress", this.boundKeyPressHandler, false);
        window.removeEventListener("hashchange", this.boundHashChangeHandler, false);
        this.rootEl.removeAttribute("data-o-tabs--js");

        var _iterator2 = _createForOfIteratorHelper(this.tabpanelEls),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var tabPanelEl = _step2.value;
            this.showPanel(tabPanelEl);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this.boundClickHandler = void 0;
        this.boundKeyPressHandler = void 0;
        this.boundHashChangeHandler = void 0;
        this.tabEls = void 0;
        this.tabpanelEls = void 0;
        this.updateUrl = void 0;
        this.selectedTabIndex = void 0;
        this.rootEl = void 0;
        this.config = void 0;
      }
    }], [{
      key: "init",
      value: function init(rootEl, config) {
        if (!rootEl) {
          rootEl = document.body;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (rootEl instanceof HTMLElement && /\bo-tabs\b/.test(rootEl.getAttribute("data-o-component"))) {
          if (!rootEl.matches("[data-o-tabs-autoconstruct=false]") && !rootEl.hasAttribute("data-o-tabs--js")) {
            return new Tabs(rootEl, config);
          }
        }

        if (rootEl.querySelectorAll) {
          var tabElements = rootEl.querySelectorAll("[data-o-component=o-tabs]:not([data-o-tabs-autoconstruct=false]):not([data-o-tabs--js])");
          return Array.from(tabElements, function (tabEl) {
            return new Tabs(tabEl, config);
          });
        }
      }
    }]);

    return Tabs;
  }();

  var Tabs_default = Tabs; // main.js

  var constructAll = function constructAll() {
    Tabs_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9UYWJzLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsTUFBQSxJQUFBO0FBQUE7O0FBRUMsa0JBQVksTUFBWixFQUFvQixNQUFwQixFQUE0QjtBQUFBOztBQUMzQixXQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsV0FBSyxNQUFMLENBQVksWUFBWixDQUF5QixpQkFBekIsRUFBNEMsRUFBNUM7QUFFQSxXQUFLLFNBQUwsR0FBaUIsTUFBQSxDQUFPLFlBQVAsQ0FBb0Isd0JBQXBCLE1BQWtELElBQW5FO0FBQ0EsV0FBSyxnQkFBTCxHQUF3QixDQUFBLENBQXhCO0FBR0EsV0FBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsWUFBN0IsQ0FBZDtBQUNBLFdBQUssTUFBTCxHQUFjLEdBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxLQUFLLE1BQW5CLEVBQTJCLE1BQTNCLENBQWtDLEtBQUssY0FBdkMsQ0FBZDtBQUNBLFdBQUssV0FBTCxHQUFtQixLQUFLLGNBQUwsQ0FBb0IsS0FBSyxNQUF6QixDQUFuQjtBQUVBLFdBQUssaUJBQUwsR0FBeUIsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVCLElBQXZCLENBQXpCO0FBQ0EsV0FBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsS0FBSyxpQkFBM0MsRUFBOEQsS0FBOUQ7QUFDQSxXQUFLLG9CQUFMLEdBQTRCLEtBQUssZUFBTCxDQUFxQixJQUFyQixDQUEwQixJQUExQixDQUE1QjtBQUNBLFdBQUssTUFBTCxDQUFZLGdCQUFaLENBQTZCLFVBQTdCLEVBQXlDLEtBQUssb0JBQTlDLEVBQW9FLEtBQXBFO0FBQ0EsV0FBSyxzQkFBTCxHQUE4QixLQUFLLGlCQUFMLENBQXVCLElBQXZCLENBQTRCLElBQTVCLENBQTlCO0FBQ0EsTUFBQSxNQUFBLENBQU8sZ0JBQVAsQ0FBd0IsWUFB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RztBQUNoRyxjQUFJLENBQUMsTUFBQSxDQUFPLE9BQVAsQ0FBZSxtQ0FBZixDQUFELElBQXdELENBQUMsTUFBQSxDQUFPLFlBQVAsQ0FBb0IsaUJBQXBCLENBQTdELEVBQXFHO0FBQ3BHLG1CQUFPLElBQUksSUFBSixDQUFTLE1BQVQsRUFBaUIsTUFBakIsQ0FBUDtBQUF3QjtBQUFBOztBQUkxQixZQUFJLE1BQUEsQ0FBTyxnQkFBWCxFQUE2QjtBQUM1QixjQUFNLFdBQUEsR0FBYyxNQUFBLENBQU8sZ0JBQVAsQ0FDbkIseUZBRG1CLENBQXBCO0FBSUEsaUJBQU8sS0FBQSxDQUFNLElBQU4sQ0FBVyxXQUFYLEVBQXdCLFVBQUMsS0FBRCxFQUFXO0FBQ3pDLG1CQUFPLElBQUksSUFBSixDQUFTLEtBQVQsRUFBZ0IsTUFBaEIsQ0FBUDtBQUF1QixXQURqQixDQUFQO0FBQ3dCO0FBQUE7QUEvUDNCOztBQUFBO0FBQUEsS0FBQTs7QUFxUUEsTUFBTyxZQUFBLEdBQVEsSUFBZixDOztBQ25RQSxNQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsR0FBVztBQUMvQixJQUFBLFlBQUEsQ0FBSyxJQUFMO0FBQ0EsSUFBQSxRQUFBLENBQVMsbUJBQVQsQ0FBNkIsb0JBQTdCLEVBQW1ELFlBQW5EO0FBQW1ELEdBRnBEOztBQUtBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxZQUFoRCxFOztBQ0xBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3hELElBQUEsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsSUFBSSxXQUFKLENBQWdCLG9CQUFoQixDQUF2QjtBQUF1QyxHQUR4QyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgVGFicyB7XG5cblx0Y29uc3RydWN0b3Iocm9vdEVsLCBjb25maWcpIHtcblx0XHR0aGlzLnJvb3RFbCA9IHJvb3RFbDtcblx0XHR0aGlzLnJvb3RFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby10YWJzLS1qcycsICcnKTtcblxuXHRcdHRoaXMudXBkYXRlVXJsID0gcm9vdEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLXRhYnMtdXBkYXRlLXVybCcpICE9PSBudWxsO1xuXHRcdHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IC0xO1xuXG5cblx0XHR0aGlzLnRhYkVscyA9IHRoaXMucm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tyb2xlPXRhYl0nKTtcblx0XHR0aGlzLnRhYkVscyA9IFtdLnNsaWNlLmNhbGwodGhpcy50YWJFbHMpLmZpbHRlcih0aGlzLnRhYkhhc1ZhbGlkVXJsKTtcblx0XHR0aGlzLnRhYnBhbmVsRWxzID0gdGhpcy5nZXRUYWJQYW5lbEVscyh0aGlzLnRhYkVscyk7XG5cblx0XHR0aGlzLmJvdW5kQ2xpY2tIYW5kbGVyID0gdGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJvb3RFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuYm91bmRDbGlja0hhbmRsZXIsIGZhbHNlKTtcblx0XHR0aGlzLmJvdW5kS2V5UHJlc3NIYW5kbGVyID0gdGhpcy5rZXlQcmVzc0hhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJvb3RFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuYm91bmRLZXlQcmVzc0hhbmRsZXIsIGZhbHNlKTtcblx0XHR0aGlzLmJvdW5kSGFzaENoYW5nZUhhbmRsZXIgPSB0aGlzLmhhc2hDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmJvdW5kSGFzaENoYW5nZUhhbmRsZXIsIGZhbHNlKTtcblxuXHRcdGlmICghY29uZmlnKSB7XG5cdFx0XHRjb25maWcgPSB7fTtcblx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGhpcy5yb290RWwuYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0cikge1xuXHRcdFx0XHRpZiAoYXR0ci5uYW1lLmluY2x1ZGVzKCdkYXRhLW8tdGFicycpKSB7XG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSB1bm5lY2Vzc2FyeSBwYXJ0IG9mIHRoZSBzdHJpbmcgdGhlIGZpcnN0XG5cdFx0XHRcdFx0Ly8gdGltZSB0aGlzIGlzIHJ1biBmb3IgZWFjaCBhdHRyaWJ1dGVcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBhdHRyLm5hbWUucmVwbGFjZSgnZGF0YS1vLXRhYnMtJywgJycpO1xuXG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdC8vIElmIGl0J3MgYSBKU09OLCBhIGJvb2xlYW4gb3IgYSBudW1iZXIsIHdlIHdhbnQgaXQgc3RvcmVkIGxpa2UgdGhhdCxcblx0XHRcdFx0XHRcdC8vIGFuZCBub3QgYXMgYSBzdHJpbmcuIFdlIGFsc28gcmVwbGFjZSBhbGwgJyB3aXRoIFwiIHNvIEpTT04gc3RyaW5nc1xuXHRcdFx0XHRcdFx0Ly8gYXJlIHBhcnNlZCBjb3JyZWN0bHlcblx0XHRcdFx0XHRcdGNvbmZpZ1trZXldID0gSlNPTi5wYXJzZShhdHRyLnZhbHVlLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0Y29uZmlnW2tleV0gPSBhdHRyLnZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cdFx0dGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KCdyZWFkeScsIHtcblx0XHRcdHRhYnM6IHRoaXNcblx0XHR9KTtcblx0XHR0aGlzLnNlbGVjdFRhYih0aGlzLmdldFNlbGVjdGVkVGFiSW5kZXgoKSwgZmFsc2UpO1xuXHR9XG5cblx0Z2V0VGFiVGFyZ2V0SWQodGFiRWwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cdFx0Y29uc3QgbGlua0VscyA9IHRhYkVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG5cdFx0cmV0dXJuIGxpbmtFbHMgJiYgbGlua0Vsc1swXSA/IGxpbmtFbHNbMF0uZ2V0QXR0cmlidXRlKCdocmVmJykucmVwbGFjZSgnIycsJycpIDogJyc7XG5cdH1cblxuXHRnZXRUYWJQYW5lbEVscyh0YWJFbHMpIHtcblx0XHRjb25zdCBwYW5lbEVscyA9IFtdO1xuXG5cdFx0Zm9yIChjb25zdCB0YWIgb2YgdGFiRWxzKSB7XG5cdFx0XHRjb25zdCB0YWJUYXJnZXRJZCA9IHRoaXMuZ2V0VGFiVGFyZ2V0SWQodGFiKTtcblx0XHRcdGNvbnN0IHRhcmdldEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFiVGFyZ2V0SWQpO1xuXG5cdFx0XHRpZiAodGFyZ2V0RWwpIHtcblx0XHRcdFx0dGFiLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRhYlRhcmdldElkKTtcblx0XHRcdFx0dGFiLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXG5cdFx0XHRcdGNvbnN0IGxhYmVsID0gdGFiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF07XG5cdFx0XHRcdGNvbnN0IGxhYmVsSWQgPSB0YWJUYXJnZXRJZCArICctbGFiZWwnO1xuXHRcdFx0XHRsYWJlbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG5cdFx0XHRcdGxhYmVsLmlkID0gbGFiZWxJZDtcblx0XHRcdFx0dGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCBsYWJlbElkKTtcblx0XHRcdFx0dGFyZ2V0RWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3RhYnBhbmVsJyk7XG5cdFx0XHRcdHRhcmdldEVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0XHRwYW5lbEVscy5wdXNoKHRhcmdldEVsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcGFuZWxFbHM7XG5cdH1cblxuXHRnZXRUYWJFbGVtZW50RnJvbUhhc2goKSB7XG5cdFx0Y29uc3QgdGFiTGluayA9IHRoaXMucm9vdEVsLnF1ZXJ5U2VsZWN0b3IoYFtocmVmPVwiJHtsb2NhdGlvbi5oYXNofVwiXWApO1xuXHRcdHJldHVybiB0YWJMaW5rICYmIHRhYkxpbmsucGFyZW50Tm9kZSA/IHRhYkxpbmsucGFyZW50Tm9kZSA6IG51bGw7XG5cdH1cblxuXHRnZXRUYWJJbmRleEZyb21FbGVtZW50KGVsKSB7XG5cdFx0cmV0dXJuIHRoaXMudGFiRWxzLmluZGV4T2YoZWwpO1xuXHR9XG5cblx0Z2V0U2VsZWN0ZWRUYWJFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLnJvb3RFbC5xdWVyeVNlbGVjdG9yKCdbYXJpYS1zZWxlY3RlZD10cnVlXScpO1xuXHR9XG5cblx0Z2V0U2VsZWN0ZWRUYWJJbmRleCgpIHtcblx0XHRjb25zdCBzZWxlY3RlZFRhYkVsZW1lbnQgPSB0aGlzLnVwZGF0ZVVybCAmJiBsb2NhdGlvbi5oYXNoID8gdGhpcy5nZXRUYWJFbGVtZW50RnJvbUhhc2goKSA6IHRoaXMuZ2V0U2VsZWN0ZWRUYWJFbGVtZW50KCk7XG5cdFx0cmV0dXJuIHNlbGVjdGVkVGFiRWxlbWVudCA/IHRoaXMuZ2V0VGFiSW5kZXhGcm9tRWxlbWVudChzZWxlY3RlZFRhYkVsZW1lbnQpIDogMDtcblx0fVxuXG5cdGlzVmFsaWRUYWIoaW5kZXgpIHtcblx0XHRyZXR1cm4gIWlzTmFOKGluZGV4KSAmJiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy50YWJFbHMubGVuZ3RoO1xuXHR9XG5cblx0aGlkZVBhbmVsKHBhbmVsRWwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cdFx0cGFuZWxFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblx0XHRwYW5lbEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXHR9XG5cblx0c2hvd1BhbmVsKHBhbmVsRWwsIGRpc2FibGVGb2N1cykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblx0XHRwYW5lbEVsLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG5cdFx0cGFuZWxFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cblx0XHQvLyBSZW1vdmUgdGhlIGZvY3VzIHJpbmcgZm9yIHNpZ2h0ZWQgdXNlcnNcblx0XHRwYW5lbEVsLnN0eWxlLm91dGxpbmUgPSAwO1xuXG5cdFx0aWYgKGRpc2FibGVGb2N1cykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEdldCBjdXJyZW50IHNjcm9sbCBwb3NpdGlvblxuXHRcdGNvbnN0IHggPSB3aW5kb3cuc2Nyb2xsWCB8fCB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cdFx0Y29uc3QgeSA9IHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuXHRcdC8vIEdpdmUgZm9jdXMgdG8gdGhlIHBhbmVsIGZvciBzY3JlZW4gcmVhZGVyc1xuXHRcdC8vIFRoaXMgbWlnaHQgY2F1c2UgdGhlIGJyb3dzZXIgdG8gc2Nyb2xsIHVwIG9yIGRvd25cblx0XHRwYW5lbEVsLmZvY3VzKCk7XG5cblx0XHQvLyBTY3JvbGwgYmFjayB0byB0aGUgb3JpZ2luYWwgcG9zaXRpb25cblx0XHR3aW5kb3cuc2Nyb2xsVG8oeCwgeSk7XG5cdH1cblxuXHRkaXNwYXRjaEN1c3RvbUV2ZW50KGV2ZW50LCBkYXRhID0ge30sIG5hbWVzcGFjZSA9ICdvVGFicycpIHtcblx0XHR0aGlzLnJvb3RFbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuYW1lc3BhY2UgKyAnLicgKyBldmVudCwge1xuXHRcdFx0ZGV0YWlsOiBkYXRhLFxuXHRcdFx0YnViYmxlczogdHJ1ZVxuXHRcdH0pKTtcblx0fVxuXG5cdHNlbGVjdFRhYihuZXdJbmRleCwgdXBkYXRlVXJsID0gdGhpcy51cGRhdGVVcmwpIHtcblx0XHRpZiAodGhpcy5pc1ZhbGlkVGFiKG5ld0luZGV4KSkge1xuXHRcdFx0Ly8gVXBkYXRlIHRoZSB1cmwgdG8gbWF0Y2ggdGhlIHNlbGVjdGVkIHRhYi5cblx0XHRcdGlmICh0aGlzLnRhYnBhbmVsRWxzW25ld0luZGV4XS5pZCAmJiB1cGRhdGVVcmwpIHtcblx0XHRcdFx0bG9jYXRpb24uaHJlZiA9ICcjJyArIHRoaXMudGFicGFuZWxFbHNbbmV3SW5kZXhdLmlkO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRGlzcGxheSB0aGUgc2VsZWN0ZWQgdGFiLlxuXHRcdFx0aWYgKG5ld0luZGV4ICE9PSB0aGlzLnNlbGVjdGVkVGFiSW5kZXgpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYkVscy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChuZXdJbmRleCA9PT0gaSkge1xuXHRcdFx0XHRcdFx0dGhpcy50YWJFbHNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblx0XHRcdFx0XHRcdHRoaXMuc2hvd1BhbmVsKHRoaXMudGFicGFuZWxFbHNbaV0sIHRoaXMuY29uZmlnLmRpc2FibGVmb2N1cyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudGFiRWxzW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICdmYWxzZScpO1xuXHRcdFx0XHRcdFx0dGhpcy5oaWRlUGFuZWwodGhpcy50YWJwYW5lbEVsc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KCd0YWJTZWxlY3QnLCB7XG5cdFx0XHRcdFx0dGFiczogdGhpcyxcblx0XHRcdFx0XHRzZWxlY3RlZDogbmV3SW5kZXgsXG5cdFx0XHRcdFx0bGFzdFNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkVGFiSW5kZXhcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5zZWxlY3RlZFRhYkluZGV4ID0gbmV3SW5kZXg7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xpY2tIYW5kbGVyKGV2KSB7XG5cdFx0Y29uc3QgdGFiRWwgPSBldi50YXJnZXQuY2xvc2VzdCgnW3JvbGU9dGFiXScpO1xuXG5cdFx0aWYgKHRhYkVsICYmIHRoaXMudGFiSGFzVmFsaWRVcmwodGFiRWwpKSB7XG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy51cGRhdGVDdXJyZW50VGFiKHRhYkVsKTtcblx0XHR9XG5cdH1cblxuXHRrZXlQcmVzc0hhbmRsZXIoZXYpIHtcblx0XHRjb25zdCB0YWJFbCA9IGV2LnRhcmdldC5jbG9zZXN0KCdbcm9sZT10YWJdJyk7XG5cdFx0Ly8gT25seSB1cGRhdGUgaWYga2V5IHByZXNzZWQgaXMgZW50ZXIga2V5XG5cdFx0aWYgKHRhYkVsICYmIGV2LmtleUNvZGUgPT09IDEzICYmIHRoaXMudGFiSGFzVmFsaWRVcmwodGFiRWwpKSB7XG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy51cGRhdGVDdXJyZW50VGFiKHRhYkVsKTtcblx0XHR9XG5cdH1cblxuXHRoYXNoQ2hhbmdlSGFuZGxlcigpIHtcblx0XHRpZiAoIXRoaXMudXBkYXRlVXJsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGFiRWwgPSB0aGlzLmdldFRhYkVsZW1lbnRGcm9tSGFzaCgpO1xuXG5cdFx0aWYgKHRhYkVsKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZUN1cnJlbnRUYWIodGFiRWwpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZUN1cnJlbnRUYWIodGFiRWwpIHtcblx0XHRjb25zdCBpbmRleCA9IHRoaXMuZ2V0VGFiSW5kZXhGcm9tRWxlbWVudCh0YWJFbCk7XG5cdFx0dGhpcy5zZWxlY3RUYWIoaW5kZXgpO1xuXHRcdHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudCgnZXZlbnQnLCB7XG5cdFx0XHRjYXRlZ29yeTogJ3RhYnMnLFxuXHRcdFx0YWN0aW9uOiAnY2xpY2snLFxuXHRcdFx0dGFiOiB0YWJFbC50ZXh0Q29udGVudC50cmltKClcblx0XHR9LCAnb1RyYWNraW5nJyk7XG5cdH1cblxuXHR0YWJIYXNWYWxpZFVybCh0YWJFbCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblx0XHRjb25zdCBsaW5rRWxzID0gdGFiRWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKTtcblx0XHRpZiAoISBsaW5rRWxzIHx8ICEgbGlua0Vsc1swXS5oYXNoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5rRWxzWzBdLnBhdGhuYW1lID09PSBsb2NhdGlvbi5wYXRobmFtZTtcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5yb290RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmJvdW5kQ2xpY2tIYW5kbGVyLCBmYWxzZSk7XG5cdFx0dGhpcy5yb290RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCB0aGlzLmJvdW5kS2V5UHJlc3NIYW5kbGVyLCBmYWxzZSk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmJvdW5kSGFzaENoYW5nZUhhbmRsZXIsIGZhbHNlKTtcblx0XHR0aGlzLnJvb3RFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtby10YWJzLS1qcycpO1xuXG5cdFx0Zm9yIChjb25zdCB0YWJQYW5lbEVsIG9mIHRoaXMudGFicGFuZWxFbHMpIHtcblx0XHRcdHRoaXMuc2hvd1BhbmVsKHRhYlBhbmVsRWwpO1xuXHRcdH1cblxuXHRcdC8vIHVuc2V0IHRoZSBib3VuZCBldmVudCBoYW5kbGVyc1xuXHRcdHRoaXMuYm91bmRDbGlja0hhbmRsZXIgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5ib3VuZEtleVByZXNzSGFuZGxlciA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmJvdW5kSGFzaENoYW5nZUhhbmRsZXIgPSB1bmRlZmluZWQ7XG5cdFx0Ly8gRGVzdHJveSBBTEwgdGhlIHRoaW5ncyFcblx0XHR0aGlzLnRhYkVscyA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnRhYnBhbmVsRWxzID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMudXBkYXRlVXJsID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLnJvb3RFbCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNvbmZpZyA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHN0YXRpYyBpbml0KHJvb3RFbCwgY29uZmlnKSB7XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpO1xuXHRcdH1cblxuXHRcdGlmIChyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiAvXFxiby10YWJzXFxiLy50ZXN0KHJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1jb21wb25lbnQnKSkpIHtcblx0XHRcdGlmICghcm9vdEVsLm1hdGNoZXMoJ1tkYXRhLW8tdGFicy1hdXRvY29uc3RydWN0PWZhbHNlXScpICYmICFyb290RWwuaGFzQXR0cmlidXRlKCdkYXRhLW8tdGFicy0tanMnKSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IFRhYnMocm9vdEVsLCBjb25maWcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChyb290RWwucXVlcnlTZWxlY3RvckFsbCkge1xuXHRcdFx0Y29uc3QgdGFiRWxlbWVudHMgPSByb290RWwucXVlcnlTZWxlY3RvckFsbChcblx0XHRcdFx0J1tkYXRhLW8tY29tcG9uZW50PW8tdGFic106bm90KFtkYXRhLW8tdGFicy1hdXRvY29uc3RydWN0PWZhbHNlXSk6bm90KFtkYXRhLW8tdGFicy0tanNdKSdcblx0XHRcdCk7XG5cblx0XHRcdHJldHVybiBBcnJheS5mcm9tKHRhYkVsZW1lbnRzLCAodGFiRWwpID0+IHtcblx0XHRcdFx0cmV0dXJuIG5ldyBUYWJzKHRhYkVsLCBjb25maWcpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYnM7XG4iLCJcbmltcG9ydCBUYWJzIGZyb20gJy4vc3JjL2pzL1RhYnMuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbigpIHtcblx0VGFicy5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBUYWJzO1xuIiwiXG5pbXBvcnQgJy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pO1xuIl19