function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/target.js
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

  var target_default = Target; // src/js/toggle.js

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
  var toggle_default = Toggle; // main.js

  var constructAll = function constructAll() {
    toggle_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy90YXJnZXQuanMiLCJzcmMvanMvdG9nZ2xlLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxNQUFBO0FBQUE7O0FBRUMsb0JBQVksTUFBWixFQUFtQjtBQUFBOztBQUNsQixXQUFLLFFBQUwsR0FBZ0IsTUFBQSxDQUFPLFFBQXZCO0FBQ0EsV0FBSyxPQUFMLEdBQWUsRUFBZjtBQUFlOztBQUpqQjtBQUFBO0FBQUEsYUFPQyxtQkFBVSxNQUFWLEVBQWtCO0FBQ2pCLGFBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsTUFBbEI7QUFBa0I7QUFScEI7QUFBQTtBQUFBLGFBV0Msc0JBQWEsTUFBYixFQUFxQjtBQUNwQixZQUFNLGNBQUEsR0FBaUIsS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixNQUFyQixDQUF2QjtBQUNBLGFBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsQ0FBbkIsRUFBc0IsY0FBdEIsRUFBc0MsTUFBdEMsQ0FBNkMsS0FBSyxPQUFMLENBQWEsS0FBYixDQUFtQixjQUFBLEdBQWdCLENBQW5DLENBQTdDLENBQWY7O0FBQ0EsWUFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO0FBRzlCLGVBQUssSUFBTDtBQUFLO0FBQUE7QUFqQlI7QUFBQTtBQUFBLGFBcUJDLGdCQUFPO0FBQ04sYUFBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixhQUEzQixFQUEwQyxPQUExQztBQUNBLGFBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsa0JBQTVCO0FBRUEsYUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixVQUFDLE1BQUQsRUFBWTtBQUNoQyxVQUFBLE1BQUEsQ0FBTyxJQUFQO0FBQU8sU0FEUjtBQUNRO0FBMUJWO0FBQUE7QUFBQSxhQThCQyxpQkFBUTtBQUNQLGFBQUssUUFBTCxDQUFj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Z0QsWUFBaEQsRTs7QUNMQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN6RCxJQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQUksV0FBSixDQUFnQixvQkFBaEIsQ0FBdkI7QUFBdUMsR0FEeEMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBUYXJnZXQge1xuXG5cdGNvbnN0cnVjdG9yKHRvZ2dsZSl7XG5cdFx0dGhpcy50YXJnZXRFbCA9IHRvZ2dsZS50YXJnZXRFbDtcblx0XHR0aGlzLnRvZ2dsZXMgPSBbXTtcblx0fVxuXG5cdGFkZFRvZ2dsZSh0b2dnbGUpIHtcblx0XHR0aGlzLnRvZ2dsZXMucHVzaCh0b2dnbGUpO1xuXHR9XG5cblx0cmVtb3ZlVG9nZ2xlKHRvZ2dsZSkge1xuXHRcdGNvbnN0IHRvZ2dsZVBvc2l0aW9uID0gdGhpcy50b2dnbGVzLmluZGV4T2YodG9nZ2xlKTtcblx0XHR0aGlzLnRvZ2dsZXMgPSB0aGlzLnRvZ2dsZXMuc2xpY2UoMCwgdG9nZ2xlUG9zaXRpb24pLmNvbmNhdCh0aGlzLnRvZ2dsZXMuc2xpY2UodG9nZ2xlUG9zaXRpb24gKzEpKTtcblx0XHRpZiAodGhpcy50b2dnbGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0Ly8gSWYgdGhhdCB3YXMgdGhlIGxhc3Qvb25seSB0b2dnbGUgdGhhdCBjb250cm9sbGVkIHRoaXMgdGFyZ2V0IHRoZW4gZW5zdXJlXG5cdFx0XHQvLyB0aGlzIHRhcmdldCBpcyBvcGVuIHNvIGl0IGRvZXNuJ3QgZ2V0IHN0dWNrIGluIHRoZSBjbG9zZWQgcG9zaXRpb25cblx0XHRcdHRoaXMub3BlbigpO1xuXHRcdH1cblx0fVxuXG5cdG9wZW4oKSB7XG5cdFx0dGhpcy50YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cdFx0dGhpcy50YXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdvLXRvZ2dsZS0tYWN0aXZlJyk7XG5cdFx0Ly8gU2V0IGV2ZXJ5IHRvZ2dsZSB0aGF0IGNvbnRyb2xzIHRoaXMgdGFyZ2V0IHRvIGJlIG9wZW5cblx0XHR0aGlzLnRvZ2dsZXMuZm9yRWFjaCgodG9nZ2xlKSA9PiB7XG5cdFx0XHR0b2dnbGUub3BlbigpO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xvc2UoKSB7XG5cdFx0dGhpcy50YXJnZXRFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblx0XHR0aGlzLnRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ28tdG9nZ2xlLS1hY3RpdmUnKTtcblxuXHRcdC8vIFNldCBldmVyeSB0b2dnbGUgdGhhdCBjb250cm9scyB0aGlzIHRhcmdldCB0byBiZSBjbG9zZWRcblx0XHR0aGlzLnRvZ2dsZXMuZm9yRWFjaCgodG9nZ2xlKSA9PiB7XG5cdFx0XHR0b2dnbGUuY2xvc2UoKTtcblx0XHR9KTtcblx0fVxuXG5cdHRvZ2dsZSgpe1xuXHRcdGlmICh0aGlzLmlzT3BlbigpKXtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cdFx0fVxuXHR9XG5cblx0aXNPcGVuKCkge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucygnby10b2dnbGUtLWFjdGl2ZScpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhcmdldDtcbiIsImltcG9ydCBUYXJnZXQgZnJvbSAnLi90YXJnZXQuanMnO1xuXG4vLyBTb21lIGFzc2lzdGl2ZSB0ZWNobm9sb2dpZXMsIGxpa2Ugc2NyZWVuIHJlYWRlcnMsIHN1Z2dlc3QgdG8gcHJlc3MgJ3NwYWNlJ1xuLy8gd2hlbiBpbnRlcmFjdGluZyB3aXRoIGEgbGluayB3aXRoIGEgcm9sZSBvZiAnYnV0dG9uJy5cbi8vIFdlIG5lZWQgdG8gZW5zdXJlIHRoYXQgd2UgcmVwbGljYXRlIHRoaXMgZnVuY3Rpb25hbGl0eSB0aGF0IGV4aXN0cyBvbiBhIGJ1dHRvbiBlbGVtZW50LlxuZnVuY3Rpb24gaGFuZGxlU3BhY2VLZXlkb3duIChlKSB7XG5cdC8vIGlmIHRoZSBwcmVzc2VkIGtleSBpcyBhIHNwYWNlLCB3ZSdsbCBzaW11bGF0ZSBhIGNsaWNrXG5cdGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG5cdFx0dGhpcy50b2dnbGUoZSk7XG5cdH1cbn1cblxuY2xhc3MgVG9nZ2xlIHtcblxuXHRjb25zdHJ1Y3Rvcih0b2dnbGVFbCwgY29uZmlnKSB7XG5cdFx0aWYgKCFUb2dnbGUuX3RhcmdldHMpIHtcblx0XHRcdFRvZ2dsZS5fdGFyZ2V0cyA9IG5ldyBNYXAoKTtcblx0XHR9XG5cblx0XHRpZiAoIXRvZ2dsZUVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fSBlbHNlIGlmICghKHRvZ2dsZUVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHR0b2dnbGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlRWwpO1xuXHRcdH1cblxuXHRcdGlmICh0b2dnbGVFbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtby10b2dnbGUtLWpzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIWNvbmZpZykge1xuXHRcdFx0Y29uZmlnID0ge307XG5cdFx0XHQvLyBUcnkgdG8gZ2V0IGNvbmZpZyBzZXQgZGVjbGFyYXRpdmVseSBvbiB0aGUgZWxlbWVudFxuXHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b2dnbGVFbC5hdHRyaWJ1dGVzLCAoYXR0cikgPT4ge1xuXHRcdFx0XHRpZiAoYXR0ci5uYW1lLmluZGV4T2YoJ2RhdGEtby10b2dnbGUnKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgcHJlZml4IHBhcnQgb2YgdGhlIGRhdGEgYXR0cmlidXRlIG5hbWVcblx0XHRcdFx0XHRjb25zdCBrZXkgPSBhdHRyLm5hbWUucmVwbGFjZSgnZGF0YS1vLXRvZ2dsZS0nLCAnJyk7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdC8vIElmIGl0J3MgYSBKU09OLCBhIGJvb2xlYW4gb3IgYSBudW1iZXIsIHdlIHdhbnQgaXQgc3RvcmVkIGxpa2UgdGhhdCwgYW5kIG5vdCBhcyBhIHN0cmluZ1xuXHRcdFx0XHRcdFx0Ly8gV2UgYWxzbyByZXBsYWNlIGFsbCAnIHdpdGggXCIgc28gSlNPTiBzdHJpbmdzIGFyZSBwYXJzZWQgY29ycmVjdGx5XG5cdFx0XHRcdFx0XHRjb25maWdba2V5XSA9IEpTT04ucGFyc2UoYXR0ci52YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdGNvbmZpZ1trZXldID0gYXR0ci52YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgdG9nZ2xlIGNhbGxiYWNrIGlmIGl0cyBhIHN0cmluZy5cblx0XHRpZiAoY29uZmlnLmNhbGxiYWNrICYmIHR5cGVvZiBjb25maWcuY2FsbGJhY2sgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHQvLyBFcnJvciBpZiB0aGUgY2FsbGJhY2sgaXMgYSBzdHJpbmcgYW5kIGEgZ2xvYmFsIGZ1bmN0aW9uIG9mIHRoYXQgbmFtZSBkb2VzIG5vdCBleGlzdC5cblx0XHRcdGlmICh0eXBlb2Ygd2luZG93W2NvbmZpZy5jYWxsYmFja10gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBvLXRvZ2dsZSBjYWxsYmFjayBcIiR7Y29uZmlnLmNhbGxiYWNrfVwiLmApO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYWxsYmFjayA9IHdpbmRvd1tjb25maWcuY2FsbGJhY2tdO1xuXHRcdH1cblx0XHQvLyBTZXQgdGhlIHRvZ2dsZSBjYWxsYmFjayBpZiBpdHMgYSBmdW5jaXRvbi5cblx0XHRpZiAoY29uZmlnLmNhbGxiYWNrICYmIHR5cGVvZiBjb25maWcuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRoaXMuY2FsbGJhY2sgPSBjb25maWcuY2FsbGJhY2s7XG5cdFx0fVxuXHRcdC8vIEVycm9yIGlmIHNvbWUgY2FsbGJhY2sgdmFsdWUgaGFzIGJlZW4gZ2l2ZW4gYnV0IGhhcyBub3QgYmVlbiBzZXQuXG5cdFx0aWYgKGNvbmZpZy5jYWxsYmFjayAmJiAhdGhpcy5jYWxsYmFjaykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgby10b2dnbGUgY2FsbGJhY2sgbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbi5gKTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdGhlIHRvZ2dsZSBlbGVtZW50LlxuXHRcdHRoaXMudG9nZ2xlRWwgPSB0b2dnbGVFbDtcblxuXHRcdGlmICh0aGlzLnRvZ2dsZUVsLm5vZGVOYW1lID09PSAnQScpIHtcblx0XHRcdHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuXHRcdFx0dGhpcy50b2dnbGVFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlU3BhY2VLZXlkb3duLmJpbmQodGhpcykpO1xuXHRcdFx0Ly8gSWYgYSB1c2VyIGRyYWdzIHRoZWlyIG1vdXNlIHNsaWdodGx5IHdoZW4gdHJ5aW5nIHRvIGludGVyYWN0IHdpdGggdGhlIHRvZ2dsZVxuXHRcdFx0Ly8gaXQgd2lsbCB0cmlnZ2VyIHRoZSAnZHJhZyBhbmQgZHJvcCcgZnVuY3Rpb25hbGl0eS5cblx0XHRcdC8vIFJlZ3VsYXIgYnV0dG9ucyBwcmV2ZW50IHRoaXMgYW5kIGVuc3VyZSBhcyBsb25nIGFzIHRoZSBtb3VzZSBpcyBzdGlsbCBhYm92ZSB0aGVcblx0XHRcdC8vIGJ1dHRvbiB0aGF0IHRoZSBjbGljayB3aWxsIHJlZ2lzdGVyLlxuXHRcdFx0Ly8gVGhpcyB3aWxsIGhlbHAgdXNlcnMgd2l0aCBtb3RvciBpbXBhaXJtZW50cyBhbmQgdGhvc2UgbGVzcyBmYW1pbGlhciB3aXRoIGEgdHJhY2twYWQuXG5cdFx0XHR0aGlzLnRvZ2dsZUVsLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy50b2dnbGUgPSB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudG9nZ2xlRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG5cblx0XHR0aGlzLnRvZ2dsZUVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLXRvZ2dsZS0tanMnLCAndHJ1ZScpO1xuXG5cdFx0dGhpcy50YXJnZXRFbCA9IGNvbmZpZy50YXJnZXQ7XG5cdFx0aWYgKCEodGhpcy50YXJnZXRFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0dGhpcy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKFRvZ2dsZS5fdGFyZ2V0cy5nZXQodGhpcy50YXJnZXRFbCkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy50YXJnZXQgPSBuZXcgVG9nZ2xlLlRhcmdldCh0aGlzKTtcblx0XHRcdFRvZ2dsZS5fdGFyZ2V0cy5zZXQodGhpcy50YXJnZXRFbCwgdGhpcy50YXJnZXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnRhcmdldCA9IFRvZ2dsZS5fdGFyZ2V0cy5nZXQodGhpcy50YXJnZXRFbCk7XG5cdFx0fVxuXG5cdFx0dGhpcy50YXJnZXQuYWRkVG9nZ2xlKHRoaXMpO1xuXHRcdHRoaXMudGFyZ2V0LmNsb3NlKCk7XG5cdH1cblxuXHRvcGVuKCkge1xuXHRcdHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblx0fVxuXG5cdGNsb3NlKCkge1xuXHRcdHRoaXMudG9nZ2xlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG5cdH1cblxuXHQvLyB0b2dnbGUgaXMgYm91bmQgdG8gdGhlIFRvZ2dsZSBpbnN0YW5jZSBpbiB0aGUgY29uc3RydWN0b3Jcblx0dG9nZ2xlKGUpIHtcblxuXHRcdHRoaXMudGFyZ2V0LnRvZ2dsZSgpO1xuXG5cdFx0aWYoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNhbGxiYWNrKXtcblx0XHRcdGNvbnN0IHN0YXRlTmFtZSA9IHRoaXMudGFyZ2V0LmlzT3BlbigpID8gJ29wZW4nIDogJ2Nsb3NlJztcblx0XHRcdHRoaXMuY2FsbGJhY2soc3RhdGVOYW1lLCBlKTtcblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnRvZ2dsZUVsLm5vZGVOYW1lID09PSAnQScpIHtcblx0XHRcdHRoaXMudG9nZ2xlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZVNwYWNlS2V5ZG93bik7XG5cdFx0fVxuXHRcdHRoaXMudG9nZ2xlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZSk7XG5cdFx0dGhpcy50b2dnbGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcblx0XHR0aGlzLnRvZ2dsZUVsLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuXHRcdHRoaXMudG9nZ2xlRWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpO1xuXG5cdFx0dGhpcy50YXJnZXQucmVtb3ZlVG9nZ2xlKHRoaXMpO1xuXG5cdFx0dGhpcy50YXJnZXQgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy50b2dnbGVFbCA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmNhbGxiYWNrID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0c3RhdGljIGluaXQoZWwsIGNvbmZpZykge1xuXHRcdGlmICghZWwpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9IGVsc2UgaWYgKCEoZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG5cdFx0fVxuXHRcdGNvbnN0IHRvZ2dsZUVscyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby10b2dnbGVcIl0nKTtcblx0XHRjb25zdCB0b2dnbGVzID0gW107XG5cdFx0Zm9yIChjb25zdCB0b2dnbGVFbCBvZiB0b2dnbGVFbHMpIHtcblx0XHRcdGlmICghdG9nZ2xlRWwuaGFzQXR0cmlidXRlKCdkYXRhLW8tdG9nZ2xlLS1qcycpKSB7XG5cdFx0XHRcdHRvZ2dsZXMucHVzaChuZXcgVG9nZ2xlKHRvZ2dsZUVsLCBjb25maWcpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRvZ2dsZXM7XG5cdH1cbn1cblxuVG9nZ2xlLlRhcmdldCA9IFRhcmdldDtcbmV4cG9ydCBkZWZhdWx0IFRvZ2dsZTtcbiIsImltcG9ydCBUb2dnbGUgZnJvbSAnLi9zcmMvanMvdG9nZ2xlLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuXHRUb2dnbGUuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9nZ2xlO1xuIiwiaW1wb3J0ICcuLi8uLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7XG4iXX0=