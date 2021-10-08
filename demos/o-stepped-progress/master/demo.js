function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/stepped-progress-step.js
  var classNames = {
    complete: "o-stepped-progress__step--complete",
    current: "o-stepped-progress__step--current",
    error: "o-stepped-progress__step--error",
    label: "o-stepped-progress__label",
    status: "o-stepped-progress__status"
  };
  var statusTexts = {
    complete: "(completed)",
    current: "(current step)",
    error: "(error)"
  };
  var stateClassNames = [classNames.complete, classNames.current, classNames.error];

  var SteppedProgressStep = /*#__PURE__*/function () {
    "use strict";

    function SteppedProgressStep(stepElement, parent) {
      _classCallCheck(this, SteppedProgressStep);

      this.stepElement = stepElement;
      this.parent = parent;
      this.labelElement = this._selectLabelElement();
      this.statusElement = this._selectStatusElement();

      this._setInitialStatusText();
    }

    _createClass(SteppedProgressStep, [{
      key: "isComplete",
      value: function isComplete() {
        return this.stepElement.classList.contains(classNames.complete);
      }
    }, {
      key: "isCurrent",
      value: function isCurrent() {
        return this.stepElement.classList.contains(classNames.current);
      }
    }, {
      key: "isError",
      value: function isError() {
        return this.stepElement.classList.contains(classNames.error);
      }
    }, {
      key: "isFuture",
      value: function isFuture() {
        return !this.isComplete() && !this.isCurrent() && !this.isError();
      }
    }, {
      key: "markAsComplete",
      value: function markAsComplete() {
        this._clearStateClasses();

        this.stepElement.classList.add(classNames.complete);

        this._setStatusText(statusTexts.complete);
      }
    }, {
      key: "markAsCurrent",
      value: function markAsCurrent() {
        this._clearStateClasses();

        this.stepElement.classList.add(classNames.current);

        this._setStatusText(statusTexts.current);
      }
    }, {
      key: "markAsError",
      value: function markAsError() {
        this._clearStateClasses();

        this.stepElement.classList.add(classNames.error);

        this._setStatusText(statusTexts.error);
      }
    }, {
      key: "markAsFuture",
      value: function markAsFuture() {
        this._clearStateClasses();

        this._setStatusText();
      }
    }, {
      key: "_selectLabelElement",
      value: function _selectLabelElement() {
        return this.stepElement.querySelector(".".concat(classNames.label));
      }
    }, {
      key: "_selectStatusElement",
      value: function _selectStatusElement() {
        var statusElement = this.stepElement.querySelector(".".concat(classNames.status));

        if (!statusElement) {
          statusElement = document.createElement("span");
          statusElement.classList.add(classNames.status);
          this.labelElement.appendChild(statusElement);
        }

        return statusElement;
      }
    }, {
      key: "_setStatusText",
      value: function _setStatusText() {
        var statusText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        this.statusElement.innerHTML = statusText;
      }
    }, {
      key: "_setInitialStatusText",
      value: function _setInitialStatusText() {
        if (this.isComplete()) {
          return this._setStatusText(statusTexts.complete);
        }

        if (this.isCurrent()) {
          return this._setStatusText(statusTexts.current);
        }

        if (this.isError()) {
          return this._setStatusText(statusTexts.error);
        }

        this._setStatusText();
      }
    }, {
      key: "_clearStateClasses",
      value: function _clearStateClasses() {
        var _iterator = _createForOfIteratorHelper(stateClassNames),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var className = _step.value;
            this.stepElement.classList.remove(className);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }]);

    return SteppedProgressStep;
  }();

  var stepped_progress_step_default = SteppedProgressStep; // src/js/stepped-progress.js

  var classNames2 = {
    step: "o-stepped-progress__step"
  };

  var SteppedProgress = /*#__PURE__*/function () {
    "use strict";

    function SteppedProgress(steppedProgressElement, options) {
      _classCallCheck(this, SteppedProgress);

      this.steppedProgressElement = steppedProgressElement;
      this.options = Object.assign({}, {}, options || SteppedProgress.getDataAttributes(steppedProgressElement));

      this._constructSteps();
    }

    _createClass(SteppedProgress, [{
      key: "getSteps",
      value: function getSteps() {
        return _toConsumableArray(this._steps);
      }
    }, {
      key: "getCompletedSteps",
      value: function getCompletedSteps() {
        return this._steps.filter(function (step) {
          return step.isComplete();
        });
      }
    }, {
      key: "hasStepAtIndex",
      value: function hasStepAtIndex(index) {
        return Boolean(this._steps[index]);
      }
    }, {
      key: "getStepAtIndex",
      value: function getStepAtIndex(index) {
        if (!this.hasStepAtIndex(index)) {
          throw new Error("No step at index: ".concat(index));
        }

        return this._steps[index];
      }
    }, {
      key: "getCurrentStep",
      value: function getCurrentStep() {
        return this._steps.filter(function (step) {
          return step.isCurrent();
        }).pop();
      }
    }, {
      key: "getLastStep",
      value: function getLastStep() {
        return this._steps[this._steps.length - 1];
      }
    }, {
      key: "isComplete",
      value: function isComplete() {
        return this._steps.every(function (step) {
          return step.isComplete();
        });
      }
    }, {
      key: "getNextStep",
      value: function getNextStep() {
        if (!this.isComplete()) {
          return this._steps.find(function (step) {
            return step.isFuture();
          }) || this.getLastStep();
        }

        return this.getLastStep();
      }
    }, {
      key: "progress",
      value: function progress() {
        if (!this.isComplete()) {
          var currentStep = this.getCurrentStep();

          if (currentStep) {
            currentStep.markAsComplete();
          }
        }

        if (!this.isComplete()) {
          this.getNextStep().markAsCurrent();
        }
      }
    }, {
      key: "_constructSteps",
      value: function _constructSteps() {
        var _this = this;

        var elements = this.steppedProgressElement.querySelectorAll(".".concat(classNames2.step));
        this._steps = _toConsumableArray(elements).map(function (element) {
          return new stepped_progress_step_default(element, _this);
        });
      }
    }], [{
      key: "getDataAttributes",
      value: function getDataAttributes(steppedProgressElement) {
        if (!(steppedProgressElement instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(steppedProgressElement.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oSteppedProgress(w)(w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = steppedProgressElement.dataset[key];

          try {
            options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
          } catch (error) {
            options[shortKey] = value;
          }

          return options;
        }, {});
      }
    }, {
      key: "init",
      value: function init(rootEl, options) {
        if (!rootEl) {
          rootEl = document.body;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-stepped-progress]")) {
          return new SteppedProgress(rootEl, options);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-stepped-progress"]'), function (rootEl2) {
          return new SteppedProgress(rootEl2, options);
        });
      }
    }]);

    return SteppedProgress;
  }();

  var stepped_progress_default = SteppedProgress; // main.js

  var constructAll = function constructAll() {
    stepped_progress_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  function initDemos() {
    document.addEventListener("DOMContentLoaded", function () {
      document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
    });
  }

  initDemos();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9zdGVwcGVkLXByb2dyZXNzLXN0ZXAuanMiLCJzcmMvanMvc3RlcHBlZC1wcm9ncmVzcy5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTU8sTUFBTSxVQUFBLEdBQWE7QUFDekIsSUFBQSxRQUFBLEVBQVUsb0NBRGU7QUFFekIsSUFBQSxPQUFBLEVBQVMsbUNBRmdCO0FBR3pCLElBQUEsS0FBQSxFQUFPLGlDQUhrQjtBQUl6QixJQUFBLEtBQUEsRUFBTywyQkFKa0I7QUFLekIsSUFBQSxNQUFBLEVBQVE7QUFMaUIsR0FBbkI7QUFhQSxNQUFNLFdBQUEsR0FBYztBQUMxQixJQUFBLFFBQUEsRUFBVSxhQURnQjtBQUUxQixJQUFBLE9BQUEsRUFBUyxnQkFGaUI7QUFHMUIsSUFBQSxLQUFBLEVBQU87QUFIbUIsR0FBcEI7QUFZUCxNQUFNLGVBQUEsR0FBa0IsQ0FDdkIsVUFBQSxDQUFXLFFBRFksRUFFdkIsVUFBQSxDQUFXLE9BRlksRUFHdkIsVUFBQSxDQUFXLEtBSFksQ0FBeEI7O0FBU0EsTUFBQSxtQkFBQTtBQUFBOztBQVNDLGlDQUFhLFdBQWIsRUFBMEIsTUFBMUIsRUFBa0M7QUFBQTs7QUFDakMsV0FBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0EsV0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLFdBQUssWUFBTCxHQUFvQixLQUFLLG1CQUFMLEVBQXBCO0FBQ0EsV0FBSyxhQUFMLEdBQXFCLEtBQUssb0JBQUwsRUFBckI7O0FBQ0EsV0FBSyxxQkFBTDtBQUFLOztBQWRQO0FBQUE7QUFBQSxhQXVCQyxzQkFBYTtBQUNaLGVBQU8sS0FBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLFFBQTNCLENBQW9DLFVBQUEsQ0FBVyxRQUEvQyxDQUFQO0FBQXNEO0FBeEJ4RDtBQUFBO0FBQUEsYUFpQ0MscUJBQVk7QUFDWCxlQUFPLEtBQUssV0FBTCxDQUFpQixT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LEVBQXNDO0FBQ3JDLFVBQUEsTUFBQSxHQUFTLFFBQUEsQ0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVQ7QUFBZ0M7O0FBRWpDLFlBQUksTUFBQSxZQUFrQixXQUFsQixJQUFpQyxNQUFBLENBQU8sT0FBUCxDQUFlLHVDQUFmLENBQXJDLEVBQThGO0FBQzdGLGlCQUFPLElBQUksZUFBSixDQUFvQixNQUFwQixFQUE0QixPQUE1QixDQUFQO0FBQW1DOztBQUVwQyxlQUFPLEtBQUEsQ0FBTSxJQUFOLENBQVcsTUFBQSxDQUFPLGdCQUFQLENBQXdCLHlDQUF4QixDQUFYLEVBQStFLFVBQUEsT0FBQTtBQUFBLGlCQUFVLElBQUksZUFBSixDQUFvQixPQUFwQixFQUE0QixPQUE1QixDQUFWO0FBQUEsU0FBL0UsQ0FBUDtBQUE0SDtBQTlMOUg7O0FBQUE7QUFBQSxLQUFBOztBQWtNQSxNQUFPLHdCQUFBLEdBQVEsZUFBZixDOztBQy9NQSxNQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsR0FBWTtBQUNoQyxJQUFBLHdCQUFBLENBQWdCLElBQWhCO0FBQ0EsSUFBQSxRQUFBLENBQVMsbUJBQVQsQ0FBNkIsb0JBQTdCLEVBQW1ELFlBQW5EO0FBQW1ELEdBRnBEOztBQUtBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxZQUFoRCxFOztBQ05BLFdBQUEsU0FBQSxHQUFxQjtBQUNwQixJQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN4RCxNQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQUksV0FBSixDQUFnQixvQkFBaEIsQ0FBdkI7QUFBdUMsS0FEeEM7QUFDd0M7O0FBSXpDLEVBQUEsU0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBDb21wb25lbnQgY2xhc3MgbmFtZXMuXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBjbGFzc05hbWVzID0ge1xuXHRjb21wbGV0ZTogJ28tc3RlcHBlZC1wcm9ncmVzc19fc3RlcC0tY29tcGxldGUnLFxuXHRjdXJyZW50OiAnby1zdGVwcGVkLXByb2dyZXNzX19zdGVwLS1jdXJyZW50Jyxcblx0ZXJyb3I6ICdvLXN0ZXBwZWQtcHJvZ3Jlc3NfX3N0ZXAtLWVycm9yJyxcblx0bGFiZWw6ICdvLXN0ZXBwZWQtcHJvZ3Jlc3NfX2xhYmVsJyxcblx0c3RhdHVzOiAnby1zdGVwcGVkLXByb2dyZXNzX19zdGF0dXMnLFxufTtcblxuLyoqXG4gKiBDb21wb25lbnQgc3RhdHVzIHRleHRzIG1hcHBlZCBmcm9tIHN0YXRlcy5cbiAqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHN0YXR1c1RleHRzID0ge1xuXHRjb21wbGV0ZTogJyhjb21wbGV0ZWQpJyxcblx0Y3VycmVudDogJyhjdXJyZW50IHN0ZXApJyxcblx0ZXJyb3I6ICcoZXJyb3IpJyxcbn07XG5cbi8qKlxuICogU3RhdGUgY2xhc3MgbmFtZXMgYXMgYW4gYXJyYXkuXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAdHlwZSB7QXJyYXl9XG4gKi9cbmNvbnN0IHN0YXRlQ2xhc3NOYW1lcyA9IFtcblx0Y2xhc3NOYW1lcy5jb21wbGV0ZSxcblx0Y2xhc3NOYW1lcy5jdXJyZW50LFxuXHRjbGFzc05hbWVzLmVycm9yXG5dO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdGVwIGluIGEgc3RlcHBlZCBwcm9ncmVzcyBjb21wb25lbnQuXG4gKi9cbmNsYXNzIFN0ZXBwZWRQcm9ncmVzc1N0ZXAge1xuXG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RlcEVsZW1lbnQgLSBUaGUgc3RlcCBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtTdGVwcGVkUHJvZ3Jlc3N9IHBhcmVudCAtIFRoZSBwYXJlbnQgc3RlcHBlZCBwcm9ncmVzcyBpbnN0YW5jZVxuXHQgKi9cblx0Y29uc3RydWN0b3IgKHN0ZXBFbGVtZW50LCBwYXJlbnQpIHtcblx0XHR0aGlzLnN0ZXBFbGVtZW50ID0gc3RlcEVsZW1lbnQ7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5sYWJlbEVsZW1lbnQgPSB0aGlzLl9zZWxlY3RMYWJlbEVsZW1lbnQoKTtcblx0XHR0aGlzLnN0YXR1c0VsZW1lbnQgPSB0aGlzLl9zZWxlY3RTdGF0dXNFbGVtZW50KCk7XG5cdFx0dGhpcy5fc2V0SW5pdGlhbFN0YXR1c1RleHQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgd2hldGhlciB0aGUgc3RlcCBoYXMgdGhlIFwiY29tcGxldGVcIiBzdGF0ZS5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgd2hldGhlciB0aGUgc3RlcCBpcyBjb21wbGV0ZS5cblx0ICovXG5cdGlzQ29tcGxldGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3RlcEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZXMuY29tcGxldGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB3aGV0aGVyIHRoZSBzdGVwIGhhcyB0aGUgXCJjdXJyZW50XCIgc3RhdGUuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHdoZXRoZXIgdGhlIHN0ZXAgaXMgY3VycmVudC5cblx0ICovXG5cdGlzQ3VycmVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGVwRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lcy5jdXJyZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgd2hldGhlciB0aGUgc3RlcCBoYXMgdGhlIFwiZXJyb3JcIiBzdGF0ZS5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgd2hldGhlciB0aGUgc3RlcCBoYXMgYW4gZXJyb3IuXG5cdCAqL1xuXHRpc0Vycm9yKCkge1xuXHRcdHJldHVybiB0aGlzLnN0ZXBFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWVzLmVycm9yKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgd2hldGhlciB0aGUgc3RlcCBoYXMgbm8gZXhwbGljaXQgc3RhdGUgKGFuZCBzbyBpcyBhIGZ1dHVyZSBzdGVwKS5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgd2hldGhlciB0aGUgc3RlcCBoYXMgbm8gZXhwbGljaXQgc3RhdGUuXG5cdCAqL1xuXHRpc0Z1dHVyZSgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0IXRoaXMuaXNDb21wbGV0ZSgpICYmXG5cdFx0XHQhdGhpcy5pc0N1cnJlbnQoKSAmJlxuXHRcdFx0IXRoaXMuaXNFcnJvcigpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHN0ZXAncyBzdGF0ZSB0byBcImNvbXBsZXRlXCIuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0bWFya0FzQ29tcGxldGUoKSB7XG5cdFx0dGhpcy5fY2xlYXJTdGF0ZUNsYXNzZXMoKTtcblx0XHR0aGlzLnN0ZXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lcy5jb21wbGV0ZSk7XG5cdFx0dGhpcy5fc2V0U3RhdHVzVGV4dChzdGF0dXNUZXh0cy5jb21wbGV0ZSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBzdGVwJ3Mgc3RhdGUgdG8gXCJjdXJyZW50XCIuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0bWFya0FzQ3VycmVudCgpIHtcblx0XHR0aGlzLl9jbGVhclN0YXRlQ2xhc3NlcygpO1xuXHRcdHRoaXMuc3RlcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzLmN1cnJlbnQpO1xuXHRcdHRoaXMuX3NldFN0YXR1c1RleHQoc3RhdHVzVGV4dHMuY3VycmVudCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBzdGVwJ3Mgc3RhdGUgdG8gXCJlcnJvclwiLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdG1hcmtBc0Vycm9yKCkge1xuXHRcdHRoaXMuX2NsZWFyU3RhdGVDbGFzc2VzKCk7XG5cdFx0dGhpcy5zdGVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXMuZXJyb3IpO1xuXHRcdHRoaXMuX3NldFN0YXR1c1RleHQoc3RhdHVzVGV4dHMuZXJyb3IpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgc3RhdGVzIGZyb20gdGhlIHN0ZXAgKG1hcmtpbmcgaXQgYXMgYSBmdXR1cmUgc3RlcCkuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0bWFya0FzRnV0dXJlKCkge1xuXHRcdHRoaXMuX2NsZWFyU3RhdGVDbGFzc2VzKCk7XG5cdFx0dGhpcy5fc2V0U3RhdHVzVGV4dCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgc3RlcCBsYWJlbCBIVE1MIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFJldHVybnMgdGhlIHN0ZXAgbGFiZWwgSFRNTCBlbGVtZW50LlxuXHQgKi9cblx0X3NlbGVjdExhYmVsRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zdGVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWVzLmxhYmVsfWApO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgc3RlcCBzdGF0dXMgSFRNTCBlbGVtZW50LCBjcmVhdGluZyBpdCBpZiBpdCBkb2VzIG5vdCBleGlzdC5cblx0ICpcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gUmV0dXJucyB0aGUgc3RlcCBzdGF0dXMgSFRNTCBlbGVtZW50LlxuXHQgKi9cblx0X3NlbGVjdFN0YXR1c0VsZW1lbnQoKSB7XG5cdFx0bGV0IHN0YXR1c0VsZW1lbnQgPSB0aGlzLnN0ZXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZXMuc3RhdHVzfWApO1xuXHRcdGlmICghc3RhdHVzRWxlbWVudCkge1xuXHRcdFx0c3RhdHVzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzLnN0YXR1cyk7XG5cdFx0XHR0aGlzLmxhYmVsRWxlbWVudC5hcHBlbmRDaGlsZChzdGF0dXNFbGVtZW50KTtcblx0XHR9XG5cdFx0cmV0dXJuIHN0YXR1c0VsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSB0ZXh0IG9mIHRoZSBzdGVwIHN0YXR1cyBlbGVtZW50LlxuXHQgKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IFtzdGF0dXNUZXh0PScnXSAtIFRoZSB0ZXh0IHRvIHNldC5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRfc2V0U3RhdHVzVGV4dChzdGF0dXNUZXh0ID0gJycpIHtcblx0XHR0aGlzLnN0YXR1c0VsZW1lbnQuaW5uZXJIVE1MID0gc3RhdHVzVGV4dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIGluaXRpYWwgc3RhdHVzIHRleHQgYmFzZWQgb24gdGhlIHN0ZXAgc3RhdGUgaW4gdGhlIERPTS5cblx0ICpcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0X3NldEluaXRpYWxTdGF0dXNUZXh0KCkge1xuXHRcdGlmICh0aGlzLmlzQ29tcGxldGUoKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3NldFN0YXR1c1RleHQoc3RhdHVzVGV4dHMuY29tcGxldGUpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5pc0N1cnJlbnQoKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3NldFN0YXR1c1RleHQoc3RhdHVzVGV4dHMuY3VycmVudCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmlzRXJyb3IoKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3NldFN0YXR1c1RleHQoc3RhdHVzVGV4dHMuZXJyb3IpO1xuXHRcdH1cblx0XHR0aGlzLl9zZXRTdGF0dXNUZXh0KCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xlYXIgYWxsIHN0YXRlIGNsYXNzZXMgZnJvbSB0aGUgc3RlcCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRfY2xlYXJTdGF0ZUNsYXNzZXMoKSB7XG5cdFx0Zm9yIChjb25zdCBjbGFzc05hbWUgb2Ygc3RhdGVDbGFzc05hbWVzKSB7XG5cdFx0XHR0aGlzLnN0ZXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGVwcGVkUHJvZ3Jlc3NTdGVwO1xuIiwiXG5pbXBvcnQgU3RlcHBlZFByb2dyZXNzU3RlcCBmcm9tICcuL3N0ZXBwZWQtcHJvZ3Jlc3Mtc3RlcC5qcyc7XG5cbi8qKlxuICogQ29tcG9uZW50IGNsYXNzIG5hbWVzLlxuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgY2xhc3NOYW1lcyA9IHtcblx0c3RlcDogJ28tc3RlcHBlZC1wcm9ncmVzc19fc3RlcCdcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0ZXBwZWQgcHJvZ3Jlc3MgY29tcG9uZW50LlxuICovXG5jbGFzcyBTdGVwcGVkUHJvZ3Jlc3Mge1xuXG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RlcHBlZFByb2dyZXNzRWxlbWVudCAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBjb21wb25lbnQuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvciAoc3RlcHBlZFByb2dyZXNzRWxlbWVudCwgb3B0aW9ucykge1xuXHRcdHRoaXMuc3RlcHBlZFByb2dyZXNzRWxlbWVudCA9IHN0ZXBwZWRQcm9ncmVzc0VsZW1lbnQ7XG5cdFx0dGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuXHRcdFx0Ly8gVE9ET1xuXHRcdH0sIG9wdGlvbnMgfHwgU3RlcHBlZFByb2dyZXNzLmdldERhdGFBdHRyaWJ1dGVzKHN0ZXBwZWRQcm9ncmVzc0VsZW1lbnQpKTtcblx0XHR0aGlzLl9jb25zdHJ1Y3RTdGVwcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBhbiBhcnJheSBvZiBzdGVwcy5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge0FycmF5PFN0ZXBwZWRQcm9ncmVzc1N0ZXA+fSBSZXR1cm5zIGFuIGFycmF5IG9mIHN0ZXBzLlxuXHQgKi9cblx0Z2V0U3RlcHMoKSB7XG5cdFx0cmV0dXJuIFsuLi50aGlzLl9zdGVwc107XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFuIGFycmF5IG9mIHN0ZXBzIHdpdGggYSBcImNvbXBsZXRlZFwiIHN0YXR1cy5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge0FycmF5PFN0ZXBwZWRQcm9ncmVzc1N0ZXA+fSBSZXR1cm5zIGFuIGFycmF5IG9mIHN0ZXBzLlxuXHQgKi9cblx0Z2V0Q29tcGxldGVkU3RlcHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0ZXBzLmZpbHRlcihzdGVwID0+IHN0ZXAuaXNDb21wbGV0ZSgpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgd2hldGhlciBhIHN0ZXAgZXhpc3RzIGF0IGEgZ2l2ZW4gaW5kZXggKDAtYmFzZWQpLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggdG8gY2hlY2suXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHdoZXRoZXIgYSBzdGVwIGV4aXN0cyBhdCBhIGdpdmVuIGluZGV4LlxuXHQgKi9cblx0aGFzU3RlcEF0SW5kZXgoaW5kZXgpIHtcblx0XHRyZXR1cm4gQm9vbGVhbih0aGlzLl9zdGVwc1tpbmRleF0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgc3RlcCBhdCBhIGdpdmVuIGluZGV4ICgwLWJhc2VkKS5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBzdGVwIHRvIGdldC5cblx0ICogQHJldHVybnMge1N0ZXBwZWRQcm9ncmVzc1N0ZXB9IFJldHVybnMgdGhlIHN0ZXAgYXQgdGhlIGdpdmVuIGluZGV4LlxuXHQgKiBAdGhyb3dzIHtFcnJvcn0gV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBubyBzdGVwIGF0IHRoZSBnaXZlbiBpbmRleC4gVXNlIHtAbGluayBTdGVwcGVkUHJvZ3Jlc3MjaGFzU3RlcEF0SW5kZXh9IHRvIGNoZWNrLlxuXHQgKi9cblx0Z2V0U3RlcEF0SW5kZXgoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzU3RlcEF0SW5kZXgoaW5kZXgpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE5vIHN0ZXAgYXQgaW5kZXg6ICR7aW5kZXh9YCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9zdGVwc1tpbmRleF07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBzdGVwIHdoaWNoIGhhcyB0aGUgXCJjdXJyZW50XCIgc3RhdGUuIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBzdGVwcyB3aXRoIHRoaXMgc3RhdGUgdGhlblxuXHQgKiB0aGUgbGFzdCBvbmUgd2lsbCBiZSByZXR1cm5lZC5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge1N0ZXBwZWRQcm9ncmVzc1N0ZXB9IFJldHVybnMgdGhlIGN1cnJlbnQgc3RlcC5cblx0ICovXG5cdGdldEN1cnJlbnRTdGVwKCkge1xuXHRcdHJldHVybiB0aGlzLl9zdGVwcy5maWx0ZXIoc3RlcCA9PiBzdGVwLmlzQ3VycmVudCgpKS5wb3AoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGxhc3Qgc3RlcCBpbiB0aGUgc3RlcHBlZCBwcm9ncmVzcy5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge1N0ZXBwZWRQcm9ncmVzc1N0ZXB9IFJldHVybnMgdGhlIGxhc3Qgc3RlcC5cblx0ICovXG5cdGdldExhc3RTdGVwKCkge1xuXHRcdHJldHVybiB0aGlzLl9zdGVwc1t0aGlzLl9zdGVwcy5sZW5ndGggLSAxXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgd2hldGhlciBhbGwgc3RlcHMgaGF2ZSB0aGUgXCJjb21wbGV0ZWRcIiBzdGF0ZS5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgd2hldGhlciBhbGwgc3RlcHMgYXJlIGNvbXBsZXRlZC5cblx0ICovXG5cdGlzQ29tcGxldGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0ZXBzLmV2ZXJ5KHN0ZXAgPT4gc3RlcC5pc0NvbXBsZXRlKCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgbmV4dCBmdXR1cmUgc3RlcCAoYSBzdGVwIHdoaWNoIGRvZXMgbm90IGhhdmUgdGhlIFwiY3VycmVudFwiLCBcImNvbXBsZXRlXCIsIG9yIFwiZXJyb3JcIlxuXHQgKiBzdGF0ZXMpLiBJZiBubyBzdWNoIHN0ZXAgZXhpc3RzLCB0aGUgbGFzdCBzdGVwIHdpbGwgYmUgcmV0dXJuZWQuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHtTdGVwcGVkUHJvZ3Jlc3NTdGVwfSBSZXR1cm5zIHRoZSBuZXh0IHN0ZXAuXG5cdCAqL1xuXHRnZXROZXh0U3RlcCgpIHtcblx0XHRpZiAoIXRoaXMuaXNDb21wbGV0ZSgpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fc3RlcHMuZmluZChzdGVwID0+IHN0ZXAuaXNGdXR1cmUoKSkgfHwgdGhpcy5nZXRMYXN0U3RlcCgpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5nZXRMYXN0U3RlcCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hcmsgdGhlIGN1cnJlbnQgc3RlcCBhcyBcImNvbXBsZXRlXCIgYW5kIHRoZW4gbWFyayB0aGUgbmV4dCBzdGVwIGFzIFwiY3VycmVudFwiLiBJZiBhbGwgc3RlcHNcblx0ICogaGF2ZSB0aGUgXCJjb21wbGV0ZVwiIHN0YXRlIHRoZW4gdGhpcyBtZXRob2QgZG9lcyBub3RoaW5nLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHByb2dyZXNzKCkge1xuXHRcdGlmICghdGhpcy5pc0NvbXBsZXRlKCkpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRTdGVwID0gdGhpcy5nZXRDdXJyZW50U3RlcCgpO1xuXHRcdFx0aWYgKGN1cnJlbnRTdGVwKSB7XG5cdFx0XHRcdGN1cnJlbnRTdGVwLm1hcmtBc0NvbXBsZXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICghdGhpcy5pc0NvbXBsZXRlKCkpIHtcblx0XHRcdHRoaXMuZ2V0TmV4dFN0ZXAoKS5tYXJrQXNDdXJyZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdCBzdGVwIGluc3RhbmNlcyBhbmQgc3RvcmUgdGhlbSBvbiB0aGUgYF9zdGVwc2AgcHJvcGVydHkuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdF9jb25zdHJ1Y3RTdGVwcygpIHtcblx0XHRjb25zdCBlbGVtZW50cyA9IHRoaXMuc3RlcHBlZFByb2dyZXNzRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtjbGFzc05hbWVzLnN0ZXB9YCk7XG5cdFx0dGhpcy5fc3RlcHMgPSBbLi4uZWxlbWVudHNdLm1hcChlbGVtZW50ID0+IG5ldyBTdGVwcGVkUHJvZ3Jlc3NTdGVwKGVsZW1lbnQsIHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBzdGVwcGVkIHByb2dyZXNzIGVsZW1lbnQuIElmIHRoZSBjb21wb25lbnQgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RlcHBlZFByb2dyZXNzRWxlbWVudCAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb3B0aW9ucyBvYmplY3QgY29uc3RydWN0ZWQgZnJvbSB0aGUgRE9NLlxuXHQgKi9cblx0c3RhdGljIGdldERhdGFBdHRyaWJ1dGVzKHN0ZXBwZWRQcm9ncmVzc0VsZW1lbnQpIHtcblx0XHRpZiAoIShzdGVwcGVkUHJvZ3Jlc3NFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhzdGVwcGVkUHJvZ3Jlc3NFbGVtZW50LmRhdGFzZXQpLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XG5cblx0XHRcdC8vIElnbm9yZSBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1aWxkIGEgY29uY2lzZSBrZXkgYW5kIGdldCB0aGUgb3B0aW9uIHZhbHVlXG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKC9eb1N0ZXBwZWRQcm9ncmVzcyh3KSh3KykkLywgKG0sIG0xLCBtMikgPT4gbTEudG9Mb3dlckNhc2UoKSArIG0yKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gc3RlcHBlZFByb2dyZXNzRWxlbWVudC5kYXRhc2V0W2tleV07XG5cblx0XHRcdC8vIFRyeSBwYXJzaW5nIHRoZSB2YWx1ZSBhcyBKU09OLCBvdGhlcndpc2UganVzdCBzZXQgaXQgYXMgYSBzdHJpbmdcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gSlNPTi5wYXJzZSh2YWx1ZS5yZXBsYWNlKC8nL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHN0ZXBwZWQgcHJvZ3Jlc3MgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxTdHJpbmcpfSByb290RWxlbWVudCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIHRoZSBjb21wb25lbnQgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKiBAcmV0dXJucyB7KFN0ZXBwZWRQcm9ncmVzc3xBcnJheTxTdGVwcGVkUHJvZ3Jlc3M+KX0gUmV0dXJucyBhIHN0ZXBwZWQgcHJvZ3Jlc3MgaW5zdGFuY2UsIG9yIGFuIGFycmF5IG9mIGluc3RhbmNlcy5cblx0ICovXG5cdHN0YXRpYyBpbml0KHJvb3RFbCwgb3B0aW9ucykge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLXN0ZXBwZWQtcHJvZ3Jlc3NdJykpIHtcblx0XHRcdHJldHVybiBuZXcgU3RlcHBlZFByb2dyZXNzKHJvb3RFbCwgb3B0aW9ucyk7XG5cdFx0fVxuXHRcdHJldHVybiBBcnJheS5mcm9tKHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tc3RlcHBlZC1wcm9ncmVzc1wiXScpLCByb290RWwgPT4gbmV3IFN0ZXBwZWRQcm9ncmVzcyhyb290RWwsIG9wdGlvbnMpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGVwcGVkUHJvZ3Jlc3M7XG4iLCJcbmltcG9ydCBTdGVwcGVkUHJvZ3Jlc3MgZnJvbSAnLi9zcmMvanMvc3RlcHBlZC1wcm9ncmVzcy5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcblx0U3RlcHBlZFByb2dyZXNzLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0ZXBwZWRQcm9ncmVzcztcbiIsImltcG9ydCAnLi8uLi8uLi9tYWluLmpzJztcblxuZnVuY3Rpb24gaW5pdERlbW9zKCkge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcblx0fSk7XG59XG5cbmluaXREZW1vcygpO1xuIl19