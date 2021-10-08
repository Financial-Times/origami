function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/input.js
  var Input = /*#__PURE__*/function () {
    "use strict";

    function Input(element) {
      _classCallCheck(this, Input);

      this.input = element;
      this.parent = element.closest(".o-forms-input");
      this.input.addEventListener("blur", this);
      this.input.addEventListener("input", this);
      this.className = {
        invalid: "o-forms-input--invalid",
        valid: "o-forms-input--valid"
      };
    }

    _createClass(Input, [{
      key: "handleEvent",
      value: function handleEvent(e) {
        if (e.type === "blur" || e.type === "input") {
          this.validate(e.target);
        }
      }
    }, {
      key: "validate",
      value: function validate() {
        if (!this.parent) {
          return;
        }

        if (!this.input.validity.valid) {
          this.parent.classList.add(this.className.invalid);
          return false;
        } else if (this.input.validity.valid && this.parent.classList.contains(this.className.invalid)) {
          this.parent.classList.remove(this.className.invalid);
          this.parent.classList.add(this.className.valid);
        }

        return true;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.input.removeEventListener("blur", this);
        this.input.removeEventListener("input", this);
        this.input = null;
      }
    }]);

    return Input;
  }();

  var input_default = Input; // src/js/state.js

  var State = /*#__PURE__*/function () {
    "use strict";

    function State(inputs, opts) {
      _classCallCheck(this, State);

      var radioInputs = inputs instanceof RadioNodeList;

      if (radioInputs) {
        this.inputs = inputs;
        this.parent = this.inputs[0].closest(".o-forms-input");
      } else {
        throw new Error("State can only be applied to `radio` type inputs.");
      }

      this._verify();

      this.opts = Object.assign({
        iconOnly: false
      }, opts);
      this.className = {
        saving: "o-forms-input--saving",
        saved: "o-forms-input--saved"
      };
    }

    _createClass(State, [{
      key: "_generateStateEl",
      value: function _generateStateEl() {
        var _this$stateEl$classLi;

        this.stateEl = document.createElement("span");
        var classNames = this.opts.iconOnly ? ["o-forms-input__state", "o-forms-input__state--icon-only"] : ["o-forms-input__state"];

        (_this$stateEl$classLi = this.stateEl.classList).add.apply(_this$stateEl$classLi, classNames);

        this.parent.append(this.stateEl);
      }
    }, {
      key: "set",
      value: function set(state, label) {
        if (!this.stateEl) {
          this._generateStateEl();
        }

        if (state === "saving") {
          this._saving(label);
        } else if (state === "saved") {
          this._saved(label);
        } else if (state === "none") {
          this._remove();
        } else {
          throw new Error("".concat(state, " is not a recognised state, the options are 'saving', 'saved' or 'none'."));
        }
      }
    }, {
      key: "_saving",
      value: function _saving(label) {
        this.parent.classList.remove(this.className.saved);
        this.parent.classList.add(this.className.saving);
        this.stateEl.classList.toggle("o-forms-input__state--custom", Boolean(label));
        this.stateEl.textContent = label && !this.opts.iconOnly ? label : "";
        this.stateEl.setAttribute("aria-label", label || "Saving");
      }
    }, {
      key: "_saved",
      value: function _saved(label) {
        this.parent.classList.remove(this.className.saving);
        this.parent.classList.add(this.className.saved);
        this.stateEl.classList.toggle("o-forms-input__state--custom", Boolean(label));
        this.stateEl.textContent = label && !this.opts.iconOnly ? label : "";
        this.stateEl.setAttribute("aria-label", label || "Saved");
      }
    }, {
      key: "_remove",
      value: function _remove() {
        this.parent.classList.remove(this.className.saving);
        this.parent.classList.remove(this.className.saved);
        this.parent.removeChild(this.stateEl);
        this.stateEl = null;
      }
    }, {
      key: "_verify",
      value: function _verify() {
        if (!this.parent.classList.contains("o-forms-input--radio-box")) {
          throw new Error("State can only be set on radio inputs with a box style (o-forms-input--radio-box).");
        } else if (this.parent.classList.contains(".o-forms--input-invalid")) {
          throw new Error("State cannot be set on an invalid input field.");
        }
      }
    }]);

    return State;
  }();

  var state_default = State; // src/js/error-summary.js

  var ErrorSummary = /*#__PURE__*/function () {
    "use strict";

    function ErrorSummary(elements) {
      _classCallCheck(this, ErrorSummary);

      this.elements = elements;
      var hasAnInverseField = elements.some(function (elem) {
        if (elem.field) {
          return elem.field.classList.contains("o-forms-field--inverse");
        } else {
          return false;
        }
      });
      this.inverse = hasAnInverseField;
      this.invalidInputs = [];
      return this.createSummary();
    }

    _createClass(ErrorSummary, [{
      key: "createSummary",
      value: function createSummary() {
        var invalidInputs = this.elements.filter(function (e) {
          return !e.valid;
        });
        var div = document.createElement("div");
        div.classList.add("o-forms__error-summary");

        if (this.inverse) {
          div.classList.add("o-forms__error-summary--inverse");
        }

        div.setAttribute("aria-labelledby", "error-summary");
        div.setAttribute("role", "alert");
        div.innerHTML = '<h4 class="o-forms__error-summary__heading" id="error-summary">There is a problem</h4>';
        div.appendChild(ErrorSummary.createList(invalidInputs));
        return div;
      }
    }], [{
      key: "createList",
      value: function createList(inputs) {
        var list = document.createElement("ul");
        list.classList.add("o-forms__error-summary__list");
        var fieldsInTheList = [];
        inputs.forEach(function (input) {
          if (fieldsInTheList.includes(input.field)) {
            return;
          }

          if (input.field) {
            fieldsInTheList.push(input.field);
          }

          if (input.valid === false && !input.label) {
            console.warn("Could not add an invalid input to the error summary. Check the input has a parent `o-forms-field` element with correct title markup. Or disable the error summary feature for this form with `data-o-forms-error-summary=\"false\"`.", input.element);
          }

          if (input.valid === false && input.label) {
            var listItem = ErrorSummary.createItem(input);
            list.appendChild(listItem);
          }
        });
        return list;
      }
    }, {
      key: "createItem",
      value: function createItem(input) {
        var item = document.createElement("li");
        item.classList.add("o-forms__error-summary__item");

        if (input.id) {
          var itemAnchor = ErrorSummary.createAnchor(input);
          item.appendChild(itemAnchor);
          return item;
        }

        console.warn("Could not link to an invalid input from the error summary. Add a unique id attribute to the input element.", input.element);
        item.innerHTML = ErrorSummary._getItemContent(input);
        return item;
      }
    }, {
      key: "createAnchor",
      value: function createAnchor(input) {
        var anchor = document.createElement("a");
        anchor.setAttribute("href", "#".concat(input.id));
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          document.getElementById(this.id).focus();
        }.bind(input));
        anchor.innerHTML = ErrorSummary._getItemContent(input);
        return anchor;
      }
    }, {
      key: "_getItemContent",
      value: function _getItemContent(input) {
        return "<span class=\"o-forms__error-summary__item-overview\">".concat(input.label, "</span>: <span class=\"o-forms__error-summary__item-detail\">").concat(input.error, "</span>");
      }
    }]);

    return ErrorSummary;
  }();

  var error_summary_default = ErrorSummary; // src/js/forms.js

  var Forms = /*#__PURE__*/function () {
    "use strict";

    function Forms(formElement, options) {
      var _this = this;

      _classCallCheck(this, Forms);

      if (formElement.nodeName !== "FORM") {
        throw new Error("[data-o-component=\"o-forms\"] must be set on a form element. It is currently set on a '".concat(formElement.nodeName.toLowerCase(), "'."));
      }

      this.form = formElement;
      this.formInputs = Array.from(this.form.elements, function (element) {
        return new input_default(element);
      });
      this.stateElements = [];
      this.opts = Object.assign({
        useBrowserValidation: false,
        errorSummary: true
      }, options || Forms.getDataAttributes(formElement));

      if (!this.opts.useBrowserValidation) {
        this.form.setAttribute("novalidate", true);
        this.form.addEventListener("submit", this);
      } else {
        this.form.removeAttribute("novalidate");
        this.submits = this.form.querySelectorAll("[type=submit]");
        this.submits.forEach(function (submit) {
          submit.addEventListener("click", _this);
          submit.addEventListener("keydown", _this);
        });
      }
    }

    _createClass(Forms, [{
      key: "handleEvent",
      value: function handleEvent(e) {
        var RETURN_KEY = 13;

        if (e.type === "click" || e.type === "keydown" && e.key === RETURN_KEY) {
          if (this.form.checkValidity() === false) {
            this.validateFormInputs();
          }
        }

        if (e.type === "submit") {
          e.preventDefault();
          var checkedElements = this.validateFormInputs();

          if (checkedElements.some(function (input) {
            return input.valid === false;
          })) {
            if (this.opts.errorSummary) {
              if (this.summary) {
                var newSummary = new error_summary_default(checkedElements);
                this.form.replaceChild(newSummary, this.summary);
                this.summary = newSummary;
              } else {
                this.summary = this.form.insertBefore(new error_summary_default(checkedElements), this.form.firstElementChild);
              }

              var firstErrorAnchor = this.summary.querySelector("a");

              if (firstErrorAnchor) {
                firstErrorAnchor.focus();
              }
            }

            return;
          }

          e.target.submit();
        }
      }
    }, {
      key: "validateFormInputs",
      value: function validateFormInputs() {
        return this.formInputs.map(function (oFormInput) {
          var valid = oFormInput.validate();
          var input = oFormInput.input;
          var field = input.closest(".o-forms-field");
          var labelElement = field ? field.querySelector(".o-forms-title__main") : null;
          var label = labelElement ? labelElement.textContent : null;
          var errorElement = field ? field.querySelector(".o-forms-input__error") : null;
          var error = errorElement ? errorElement.textContent : input.validationMessage;
          return {
            id: input.id,
            valid: valid,
            error: !valid ? error : null,
            label: label,
            field: field,
            element: oFormInput.input
          };
        });
      }
    }, {
      key: "setState",
      value: function setState(state, name) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          iconLabel: null,
          iconOnly: false
        };

        if (_typeof(options) !== "object" || options === null || Array.isArray(options)) {
          throw new Error("The `options` argument must be an object");
        }

        var object = this.stateElements.find(function (item) {
          return item.name === name;
        });

        if (!object) {
          object = {
            name: name,
            element: new state_default(this.form.elements[name], options)
          };
          this.stateElements.push(object);
        }

        object.element.set(state, options.iconLabel);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this2 = this;

        if (!this.opts.useBrowserValidation) {
          this.form.removeEventListener("submit", this);
        } else {
          this.submits.forEach(function (submit) {
            submit.removeEventListener("click", _this2);
            submit.removeEventListener("keydown", _this2);
          });
        }

        this.form = null;
        this.formInputs.forEach(function (input) {
          return input.destroy();
        });
        this.formInputs = null;
        this.stateElements = null;
        this.opts = null;
      }
    }], [{
      key: "getDataAttributes",
      value: function getDataAttributes(formElement) {
        if (!(formElement instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(formElement.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oMessage(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = formElement.dataset[key];

          try {
            options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
          } catch (error) {
            options[shortKey] = value;
          }

          return options;
        }, {});
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

        if (rootEl instanceof HTMLFormElement) {
          return new Forms(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-forms"]'), function (rootEl2) {
          return new Forms(rootEl2, opts);
        });
      }
    }]);

    return Forms;
  }();

  var forms_default = Forms; // main.js

  var constructAll = function constructAll() {
    forms_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
  var extraContentInput = document.querySelector("input[name='extra']");

  if (extraContentInput) {
    extraContentInput.indeterminate = true;
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9pbnB1dC5qcyIsInNyYy9qcy9zdGF0ZS5qcyIsInNyYy9qcy9lcnJvci1zdW1tYXJ5LmpzIiwic3JjL2pzL2Zvcm1zLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFBLEtBQUE7QUFBQTs7QUFLQyxtQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQ3BCLFdBQUssS0FBTCxHQUFhLE9BQWI7QUFDQSxXQUFLLE1BQUwsR0FBYyxPQUFBLENBQVEsT0FBUixDQUFnQixnQkFBaEIsQ0FBZDtBQUVBLFdBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE1BQTVCLEVBQW9DLElBQXBDO0FBQ0EsV0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsSUFBckM7QUFFQSxXQUFLLFNBQUwsR0FBaUI7QUFDaEIsUUFBQSxPQUFBLEVBQVMsd0JBRE87QUFFaEIsUUFBQSxLQUFBLEVBQU87QUFGUyxPQUFqQjtBQUVROztBQWRWO0FBQUE7QUFBQSxhQXNCQyxxQkFBWSxDQUFaLEVBQWU7QUFDZCxZQUFJLENBQUEsQ0FBRSxJQUFGLEtBQVcsTUFBWCxJQUFxQixDQUFBLENBQUUsSUFBRixLQUFXLE9BQXBDLEVBQTZDO0FBQzVDLGVBQUssUUFBTCxDQUFjLENBQUEsQ0FBRSxNQUFoQjtBQUFnQjtBQUFBO0FBeEJuQjtBQUFBO0FBQUEsYUFnQ0Msb0JBQVc7QUFDVixZQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCO0FBQ2pCO0FBQUE7O0FBR0QsWUFBSSxDQUFDLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBekIsRUFBZ0M7QUFDL0IsZUFBSyxNQUFMLENBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixLQUFLLFNBQUwsQ0FBZSxPQUF6QztBQUNBLGlCQUFPLEtBQVA7QUFBTyxTQUZSLE1BRVEsSUFFRyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCLElB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O0FBQXVDLEdBRHhDO0FBSUEsTUFBTSxpQkFBQSxHQUFvQixRQUFBLENBQVMsYUFBVCxDQUF1QixxQkFBdkIsQ0FBMUI7O0FBRUEsTUFBSSxpQkFBSixFQUF1QjtBQUFFLElBQUEsaUJBQUEsQ0FBa0IsYUFBbEIsR0FBa0MsSUFBbEM7QUFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBJbnB1dCB7XG5cdC8qKlxuXHQqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtpbnB1dEVsZW1lbnRdIC0gQW4gaW5wdXQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCovXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR0aGlzLmlucHV0ID0gZWxlbWVudDtcblx0XHR0aGlzLnBhcmVudCA9IGVsZW1lbnQuY2xvc2VzdCgnLm8tZm9ybXMtaW5wdXQnKTtcblxuXHRcdHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMpO1xuXHRcdHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzKTtcblxuXHRcdHRoaXMuY2xhc3NOYW1lID0ge1xuXHRcdFx0aW52YWxpZDogJ28tZm9ybXMtaW5wdXQtLWludmFsaWQnLFxuXHRcdFx0dmFsaWQ6ICdvLWZvcm1zLWlucHV0LS12YWxpZCdcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCogRXZlbnQgSGFuZGxlclxuXHQqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBlbWl0dGVkIGJ5IGVsZW1lbnQvd2luZG93IGludGVyYWN0aW9uc1xuXHQqL1xuXHRoYW5kbGVFdmVudChlKSB7XG5cdFx0aWYgKGUudHlwZSA9PT0gJ2JsdXInIHx8IGUudHlwZSA9PT0gJ2lucHV0Jykge1xuXHRcdFx0dGhpcy52YWxpZGF0ZShlLnRhcmdldCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogSW5wdXQgdmFsaWRhdGlvblxuXHQqIENvbmRpdGlvbnMgZm9yIGlucHV0IHZhbGlkYXRpb25cblx0Ki9cblx0dmFsaWRhdGUoKSB7XG5cdFx0aWYgKCF0aGlzLnBhcmVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5pbnB1dC52YWxpZGl0eS52YWxpZCkge1xuXHRcdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZS5pbnZhbGlkKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH0gZWxzZSBpZiAodGhpcy5pbnB1dC52YWxpZGl0eS52YWxpZCAmJiB0aGlzLnBhcmVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc05hbWUuaW52YWxpZCkpIHtcblx0XHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuaW52YWxpZCk7XG5cdFx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lLnZhbGlkKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG5cdFx0dGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMpO1xuXHRcdHRoaXMuaW5wdXQgPSBudWxsO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiY2xhc3MgU3RhdGUge1xuXHQvKipcblx0KiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0KiBAcGFyYW0ge1JhZGlvTm9kZUxpc3R9IFtpbnB1dHNdIC0gQSBOb2RlTGlzdCBvZiByYWRpbyBpbnB1dCBlbGVtZW50c1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW58T2JqZWN0fSBvcHRzIC0gYW4gb2JqZWN0IG9mIG9wdGlvbnNcblx0ICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuaWNvbk9ubHkgW251bGxdIC0gd2hlbiB0cnVlIGRpc3BsYXkgYW4gaWNvbiBvbmx5LCBoaWRpbmcgdGhlIHN0YXR1cyBsYWJlbFxuXHQqL1xuXHRjb25zdHJ1Y3RvcihpbnB1dHMsIG9wdHMpIHtcblx0XHRjb25zdCByYWRpb0lucHV0cyA9IGlucHV0cyBpbnN0YW5jZW9mIFJhZGlvTm9kZUxpc3Q7XG5cdFx0aWYgKHJhZGlvSW5wdXRzKSB7XG5cdFx0XHR0aGlzLmlucHV0cyA9IGlucHV0cztcblx0XHRcdHRoaXMucGFyZW50ID0gdGhpcy5pbnB1dHNbMF0uY2xvc2VzdCgnLm8tZm9ybXMtaW5wdXQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGByYWRpb2AgdHlwZSBpbnB1dHMuJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdmVyaWZ5KCk7XG5cdFx0dGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRpY29uT25seTogZmFsc2Vcblx0XHR9LCBvcHRzKTtcblxuXHRcdHRoaXMuY2xhc3NOYW1lID0ge1xuXHRcdFx0c2F2aW5nOiAnby1mb3Jtcy1pbnB1dC0tc2F2aW5nJyxcblx0XHRcdHNhdmVkOiAnby1mb3Jtcy1pbnB1dC0tc2F2ZWQnXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQqIENyZWF0ZSBzdGF0ZSBlbGVtZW50XG5cdCogQGFjY2VzcyBwcml2YXRlXG5cdCovXG5cdF9nZW5lcmF0ZVN0YXRlRWwoKSB7XG5cdFx0dGhpcy5zdGF0ZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGNvbnN0IGNsYXNzTmFtZXMgPSB0aGlzLm9wdHMuaWNvbk9ubHkgPyBbJ28tZm9ybXMtaW5wdXRfX3N0YXRlJywgJ28tZm9ybXMtaW5wdXRfX3N0YXRlLS1pY29uLW9ubHknXSA6IFsnby1mb3Jtcy1pbnB1dF9fc3RhdGUnXTtcblx0XHQgdGhpcy5zdGF0ZUVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG5cdFx0dGhpcy5wYXJlbnQuYXBwZW5kKHRoaXMuc3RhdGVFbCk7XG5cdH1cblxuXHQvKipcblx0KiBTdGF0ZSBzZXR0ZXJcblx0KiBAcGFyYW0ge1N0cmluZ30gc3RhdGUgdHlwZSBvZiBzdGF0ZSB0byBkaXNwbGF5XG5cdCogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIGN1c3RvbWlzZSB0aGUgbGFiZWwgb2YgdGhlIHN0YXRlLCBlLmcuIHRoZSBzYXZlZCBzdGF0ZSBkZWZhdWx0cyB0byBcIlNhdmluZ1wiIGJ1dCBjb3VsZCBiZSBcIlNlbnRcIlxuXHQqL1xuXHRzZXQoc3RhdGUsIGxhYmVsKSB7XG5cdFx0aWYgKCF0aGlzLnN0YXRlRWwpIHtcblx0XHRcdHRoaXMuX2dlbmVyYXRlU3RhdGVFbCgpO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZSA9PT0gJ3NhdmluZycpIHtcblx0XHRcdHRoaXMuX3NhdmluZyhsYWJlbCk7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PT0gJ3NhdmVkJykge1xuXHRcdFx0dGhpcy5fc2F2ZWQobGFiZWwpO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT09ICdub25lJykge1xuXHRcdFx0dGhpcy5fcmVtb3ZlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtzdGF0ZX0gaXMgbm90IGEgcmVjb2duaXNlZCBzdGF0ZSwgdGhlIG9wdGlvbnMgYXJlICdzYXZpbmcnLCAnc2F2ZWQnIG9yICdub25lJy5gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBTYXZpbmcgc3RhdGVcblx0KiBAYWNjZXNzIHByaXZhdGVcblx0Ki9cblx0X3NhdmluZyhsYWJlbCkge1xuXHRcdC8vIFJlbW92ZSBvdGhlciBzdGF0ZSBjbGFzc2VzLlxuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuc2F2ZWQpO1xuXHRcdC8vIEFkZCBzYXZpbmcgc3RhdGUgY2xhc3MuXG5cdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZS5zYXZpbmcpO1xuXHRcdC8vIEFkZCBjdXN0b20gc3RhdGUgbGFiZWwgaWYgZ2l2ZW4uXG5cdFx0Ly8gRGVmYXVsdCBsYWJlbCBjb3B5IGlzIGFkZGVkIHZpYSB0aGUgQ1NTIGBjb250ZW50YCBhdHRyaWJ1dGUuXG5cdFx0dGhpcy5zdGF0ZUVsLmNsYXNzTGlzdC50b2dnbGUoJ28tZm9ybXMtaW5wdXRfX3N0YXRlLS1jdXN0b20nLCBCb29sZWFuKGxhYmVsKSk7XG5cdFx0dGhpcy5zdGF0ZUVsLnRleHRDb250ZW50ID0gbGFiZWwgJiYgIXRoaXMub3B0cy5pY29uT25seSA/IGxhYmVsIDogJyc7XG5cdFx0Ly8gV2hlbiBpY29uLW9ubHkgaXMgc2V0IHRoZXJlIGlzIG5vIGNvcHkgd2hlbiBnaXZlbiBhIGN1c3RvbSBsYWJlbCBzb1xuXHRcdC8vIGFkZCBhbiBhcmlhIGxhYmVsLlxuXHRcdHRoaXMuc3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCB8fCAnU2F2aW5nJyk7XG5cdH1cblxuXHQvKipcblx0KiBTYXZlZCBzdGF0ZVxuXHQqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQqL1xuXHRfc2F2ZWQobGFiZWwpIHtcblx0XHQvLyBSZW1vdmUgb3RoZXIgc3RhdGUgY2xhc3Nlcy5cblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLnNhdmluZyk7XG5cdFx0Ly8gQWRkIHNhdmVkIHN0YXRlIGNsYXNzLlxuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWUuc2F2ZWQpO1xuXHRcdC8vIEFkZCBjdXN0b20gc3RhdGUgbGFiZWwgaWYgZ2l2ZW4uXG5cdFx0Ly8gRGVmYXVsdCBsYWJlbCBjb3B5IGlzIGFkZGVkIHZpYSB0aGUgQ1NTIGBjb250ZW50YCBhdHRyaWJ1dGUuXG5cdFx0dGhpcy5zdGF0ZUVsLmNsYXNzTGlzdC50b2dnbGUoJ28tZm9ybXMtaW5wdXRfX3N0YXRlLS1jdXN0b20nLCBCb29sZWFuKGxhYmVsKSk7XG5cdFx0dGhpcy5zdGF0ZUVsLnRleHRDb250ZW50ID0gbGFiZWwgJiYgIXRoaXMub3B0cy5pY29uT25seSA/IGxhYmVsIDogJyc7XG5cdFx0Ly8gV2hlbiBpY29uLW9ubHkgaXMgc2V0IHRoZXJlIGlzIG5vIGNvcHkgd2hlbiBnaXZlbiBhIGN1c3RvbSBsYWJlbCBzb1xuXHRcdC8vIGFkZCBhbiBhcmlhIGxhYmVsLlxuXHRcdHRoaXMuc3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCB8fCAnU2F2ZWQnKTtcblx0fVxuXG5cdC8qKlxuXHQqIFJlbW92ZSBzdGF0ZVxuXHQqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQqL1xuXHRfcmVtb3ZlKCkge1xuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuc2F2aW5nKTtcblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLnNhdmVkKTtcblx0XHR0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLnN0YXRlRWwpO1xuXHRcdHRoaXMuc3RhdGVFbCA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0KiBWZXJpZnkgaW5wdXQgcGFyZW50XG5cdCogQGFjY2VzcyBwcml2YXRlXG5cdCovXG5cdF92ZXJpZnkoKSB7XG5cdFx0aWYgKCF0aGlzLnBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ28tZm9ybXMtaW5wdXQtLXJhZGlvLWJveCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIGNhbiBvbmx5IGJlIHNldCBvbiByYWRpbyBpbnB1dHMgd2l0aCBhIGJveCBzdHlsZSAoby1mb3Jtcy1pbnB1dC0tcmFkaW8tYm94KS4nKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnLm8tZm9ybXMtLWlucHV0LWludmFsaWQnKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBjYW5ub3QgYmUgc2V0IG9uIGFuIGludmFsaWQgaW5wdXQgZmllbGQuJyk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuIiwiY2xhc3MgRXJyb3JTdW1tYXJ5IHtcblx0LyoqXG5cdCogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCogQHBhcmFtIHtBcnJheX0gW2VsZW1lbnRzXSAtIEFuIGFycmF5IG9mIG9iamVjdHMsIHdoZXJlIGVhY2ggb2JqZWN0IGRlc2NyaWJlcyBhbiBpbnZhbGlkIGlucHV0IGVsZW1lbnRcblx0KiBAZXhhbXBsZVxuXHQqIGNvbnN0IGV4YW1wbGUgPSBbXG5cdCpcdHtcblx0Klx0XHRpZDogJ3RleHQtaW5wdXQnLFxuXHQqXHRcdHZhbGlkOiBmYWxzZSxcblx0Klx0XHRlcnJvcjogJ1BsZWFzZSBmaWxsIG91dCB0aGlzIGZpZWxkJ1xuXHQqXHRcdGxhYmVsOiAnSW5wdXQgTGFiZWwnLFxuXHQqXHRcdGVsZW1lbnQ6IDxFbGVtZW50PlxuXHQqXHR9XG5cdCpcdC4uLlxuXHQqXHRdXG5cdCpcdG5ldyBFcnJvclN1bW1hcnkoZXhhbXBsZSlcblx0Ki9cblx0Y29uc3RydWN0b3IoZWxlbWVudHMpIHtcblx0XHR0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG5cdFx0Y29uc3QgaGFzQW5JbnZlcnNlRmllbGQgPSBlbGVtZW50cy5zb21lKGVsZW0gPT4ge1xuXHRcdFx0aWYgKGVsZW0uZmllbGQpIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLWZvcm1zLWZpZWxkLS1pbnZlcnNlJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5pbnZlcnNlID0gaGFzQW5JbnZlcnNlRmllbGQ7XG5cdFx0dGhpcy5pbnZhbGlkSW5wdXRzID0gW107XG5cblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVTdW1tYXJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGUgTm9kZSB0byBob2xkIGxpc3Qgb2YgaW52YWxpZCBpbnB1dHNcblx0ICovXG5cdGNyZWF0ZVN1bW1hcnkoKSB7XG5cdFx0Y29uc3QgaW52YWxpZElucHV0cyA9IHRoaXMuZWxlbWVudHMuZmlsdGVyKGUgPT4gIWUudmFsaWQpO1xuXG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ28tZm9ybXNfX2Vycm9yLXN1bW1hcnknKTtcblx0XHRpZiAodGhpcy5pbnZlcnNlKSB7XG5cdFx0XHRkaXYuY2xhc3NMaXN0LmFkZCgnby1mb3Jtc19fZXJyb3Itc3VtbWFyeS0taW52ZXJzZScpO1xuXHRcdH1cblx0XHRkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCAnZXJyb3Itc3VtbWFyeScpO1xuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYWxlcnQnKTtcblx0XHRkaXYuaW5uZXJIVE1MID0gJzxoNCBjbGFzcz1cIm8tZm9ybXNfX2Vycm9yLXN1bW1hcnlfX2hlYWRpbmdcIiBpZD1cImVycm9yLXN1bW1hcnlcIj5UaGVyZSBpcyBhIHByb2JsZW08L2g0Pic7XG5cblx0XHRkaXYuYXBwZW5kQ2hpbGQoRXJyb3JTdW1tYXJ5LmNyZWF0ZUxpc3QoaW52YWxpZElucHV0cykpO1xuXHRcdHJldHVybiBkaXY7XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGUgbGlzdCBvZiBhbmNob3JzXG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlTGlzdChpbnB1dHMpIHtcblx0XHRjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblx0XHRsaXN0LmNsYXNzTGlzdC5hZGQoJ28tZm9ybXNfX2Vycm9yLXN1bW1hcnlfX2xpc3QnKTtcblx0XHRjb25zdCBmaWVsZHNJblRoZUxpc3QgPSBbXTtcblx0XHRpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG5cdFx0XHQvLyBBIGZpZWxkIG1heSBjb250YWluIG11bHRpcGxlIGludmFsaWQgaW5wdXRzLiBFLmcuIGEgZGF0ZSBmaWVsZFxuXHRcdFx0Ly8gaGFzIHRocmVlIHRleHQgaW5wdXRzIGZvciBkYXksIG1vbnRoLCBhbmQgeWVhci4gT25seSBzaG93IGFcblx0XHRcdC8vIGZpZWxkIGluIHRoZSBlcnJvciBzdW1tYXJ5IG9uY2UgaWYgaXQgaGFzIG11bHRpcGxlIGludmFsaWQgaW5wdXRzXG5cdFx0XHRpZiAoZmllbGRzSW5UaGVMaXN0LmluY2x1ZGVzKGlucHV0LmZpZWxkKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5wdXQuZmllbGQpIHtcblx0XHRcdFx0ZmllbGRzSW5UaGVMaXN0LnB1c2goaW5wdXQuZmllbGQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaW52YWxpZCBpbnB1dCBidXQgd2l0aCBubyBsYWJlbCB0byBjcmVhdGUgYW4gZXJyb3Igc3VtbWFyeVxuXHRcdFx0aWYgKGlucHV0LnZhbGlkID09PSBmYWxzZSAmJiAhaW5wdXQubGFiZWwpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKGBDb3VsZCBub3QgYWRkIGFuIGludmFsaWQgaW5wdXQgdG8gdGhlIGVycm9yIHN1bW1hcnkuIGAgK1xuXHRcdFx0XHRgQ2hlY2sgdGhlIGlucHV0IGhhcyBhIHBhcmVudCBcXGBvLWZvcm1zLWZpZWxkXFxgIGVsZW1lbnQgd2l0aCBjb3JyZWN0IHRpdGxlIG1hcmt1cC4gYCArXG5cdFx0XHRcdGBPciBkaXNhYmxlIHRoZSBlcnJvciBzdW1tYXJ5IGZlYXR1cmUgZm9yIHRoaXMgZm9ybSB3aXRoIFxcYGRhdGEtby1mb3Jtcy1lcnJvci1zdW1tYXJ5PVwiZmFsc2VcIlxcYC5gLCBpbnB1dC5lbGVtZW50KTtcblx0XHRcdH1cblx0XHRcdC8vIGludmFsaWQgaW5wdXQsIGFkZCB0byBlcnJvciBzdW1tYXJ5XG5cdFx0XHRpZiAoaW5wdXQudmFsaWQgPT09IGZhbHNlICYmIGlucHV0LmxhYmVsKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3RJdGVtID0gRXJyb3JTdW1tYXJ5LmNyZWF0ZUl0ZW0oaW5wdXQpO1xuXHRcdFx0XHRsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIGFuIGl0ZW0gZm9yIHRoZSBlcnJvciBzdW1tYXJ5XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbaW5wdXRdIC0gVGhlIGlucHV0IG9iamVjdCB0byBjb25zdHJ1Y3QgYW4gZXJyb3Igc3VtbWFyeSBpdGVtIGZvclxuXHQgKiBAcmV0dXJuIHtFbGVtZW50fSAtIGxpXG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlSXRlbShpbnB1dCkge1xuXHRcdGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgnby1mb3Jtc19fZXJyb3Itc3VtbWFyeV9faXRlbScpO1xuXG5cdFx0Ly8gUmV0dXJuIGEgZXJyb3Igc3VtbWFyeSBpdGVtIHdoaWNoIGxpbmtzIHRvIHRoZSBpbnB1dCBpZiBhbiBpZCBleGlzdHMuXG5cdFx0aWYgKGlucHV0LmlkKSB7XG5cdFx0XHRjb25zdCBpdGVtQW5jaG9yID0gRXJyb3JTdW1tYXJ5LmNyZWF0ZUFuY2hvcihpbnB1dCk7XG5cdFx0XHRpdGVtLmFwcGVuZENoaWxkKGl0ZW1BbmNob3IpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdC8vIElmIG5vIGlkIGV4aXN0IHJldHVybiBhbiBlcnJvciBzdW1tYXJ5IGl0ZW0gd2l0aG91dCBhIGxpbmsuXG5cdFx0Y29uc29sZS53YXJuKGBDb3VsZCBub3QgbGluayB0byBhbiBpbnZhbGlkIGlucHV0IGZyb20gdGhlIGVycm9yIHN1bW1hcnkuIGAgK1xuXHRcdFx0YEFkZCBhIHVuaXF1ZSBpZCBhdHRyaWJ1dGUgdG8gdGhlIGlucHV0IGVsZW1lbnQuYCwgaW5wdXQuZWxlbWVudCk7XG5cblx0XHRpdGVtLmlubmVySFRNTCA9IEVycm9yU3VtbWFyeS5fZ2V0SXRlbUNvbnRlbnQoaW5wdXQpO1xuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIGFuY2hvciBlbGVtZW50IHRvIHBvaW50IGF0IGludmFsaWQgaW5wdXRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtpbnB1dF0gLSBUaGUgaW5wdXQgb2JqZWN0IHRvIGNvbnN0cnVjdCBhbiBhbmNob3IgZm9yXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9IC0gYVxuXHQgKi9cblx0c3RhdGljIGNyZWF0ZUFuY2hvcihpbnB1dCkge1xuXHRcdGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgYCMke2lucHV0LmlkfWApO1xuXHRcdGFuY2hvci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLmZvY3VzKCk7XG5cdFx0fS5iaW5kKGlucHV0KSk7XG5cdFx0YW5jaG9yLmlubmVySFRNTCA9IEVycm9yU3VtbWFyeS5fZ2V0SXRlbUNvbnRlbnQoaW5wdXQpO1xuXHRcdHJldHVybiBhbmNob3I7XG5cdH1cblxuXHQvKipcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Tm9kZX0gaW5wdXQgLSBUaGUgaW5wdXQgZWxlbWVudCB3aGljaCBoYXMgYW4gZXJyb3Jcblx0ICogQHJldHVybiB7Tm9kZX1cblx0ICovXG5cdHN0YXRpYyBfZ2V0SXRlbUNvbnRlbnQoaW5wdXQpIHtcblx0XHRyZXR1cm4gJzxzcGFuIGNsYXNzPVwiby1mb3Jtc19fZXJyb3Itc3VtbWFyeV9faXRlbS1vdmVydmlld1wiPicgK1xuXHRcdFx0YCR7aW5wdXQubGFiZWx9PC9zcGFuPjogYCArXG5cdFx0XHRgPHNwYW4gY2xhc3M9XCJvLWZvcm1zX19lcnJvci1zdW1tYXJ5X19pdGVtLWRldGFpbFwiPiR7aW5wdXQuZXJyb3J9PC9zcGFuPmA7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JTdW1tYXJ5O1xuIiwiaW1wb3J0IElucHV0IGZyb20gJy4vaW5wdXQuanMnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUuanMnO1xuaW1wb3J0IEVycm9yU3VtbWFyeSBmcm9tICcuL2Vycm9yLXN1bW1hcnkuanMnO1xuXG5jbGFzcyBGb3JtcyB7XG5cdC8qKlxuXHQqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtmb3JtRWxlbWVudF0gLSBUaGUgZm9ybSBlbGVtZW50IGluIHRoZSBET01cblx0KiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBmb3JtXG5cdCovXG5cdGNvbnN0cnVjdG9yKGZvcm1FbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0aWYgKGZvcm1FbGVtZW50Lm5vZGVOYW1lICE9PSAnRk9STScpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgW2RhdGEtby1jb21wb25lbnQ9XCJvLWZvcm1zXCJdIG11c3QgYmUgc2V0IG9uIGEgZm9ybSBlbGVtZW50LiBJdCBpcyBjdXJyZW50bHkgc2V0IG9uIGEgJyR7Zm9ybUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKX0nLmApO1xuXHRcdH1cblxuXHRcdHRoaXMuZm9ybSA9IGZvcm1FbGVtZW50O1xuXHRcdHRoaXMuZm9ybUlucHV0cyA9IEFycmF5LmZyb20odGhpcy5mb3JtLmVsZW1lbnRzLCBlbGVtZW50ID0+IG5ldyBJbnB1dChlbGVtZW50KSk7XG5cdFx0dGhpcy5zdGF0ZUVsZW1lbnRzID0gW107XG5cblx0XHR0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdHVzZUJyb3dzZXJWYWxpZGF0aW9uOiBmYWxzZSxcblx0XHRcdGVycm9yU3VtbWFyeTogdHJ1ZVxuXHRcdH0sIG9wdGlvbnMgfHwgRm9ybXMuZ2V0RGF0YUF0dHJpYnV0ZXMoZm9ybUVsZW1lbnQpKTtcblxuXHRcdGlmICghdGhpcy5vcHRzLnVzZUJyb3dzZXJWYWxpZGF0aW9uKSB7XG5cdFx0XHR0aGlzLmZvcm0uc2V0QXR0cmlidXRlKCdub3ZhbGlkYXRlJywgdHJ1ZSk7XG5cdFx0XHR0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZm9ybS5yZW1vdmVBdHRyaWJ1dGUoJ25vdmFsaWRhdGUnKTtcblx0XHRcdHRoaXMuc3VibWl0cyA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1zdWJtaXRdJyk7XG5cdFx0XHR0aGlzLnN1Ym1pdHMuZm9yRWFjaChzdWJtaXQgPT4ge1xuXHRcdFx0XHRzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblx0XHRcdFx0c3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBmb3JtRWxlbWVudC4gSWYgdGhlIGZvcm0gaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZm9ybUVsZW1lbnQgLSBUaGUgbWVzc2FnZSBlbGVtZW50IGluIHRoZSBET01cblx0ICovXG5cdHN0YXRpYyBnZXREYXRhQXR0cmlidXRlcyhmb3JtRWxlbWVudCkge1xuXHRcdGlmICghKGZvcm1FbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKGZvcm1FbGVtZW50LmRhdGFzZXQpLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XG5cdFx0XHQvLyBJZ25vcmUgZGF0YS1vLWNvbXBvbmVudFxuXHRcdFx0aWYgKGtleSA9PT0gJ29Db21wb25lbnQnKSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCdWlsZCBhIGNvbmNpc2Uga2V5IGFuZCBnZXQgdGhlIG9wdGlvbiB2YWx1ZVxuXHRcdFx0Y29uc3Qgc2hvcnRLZXkgPSBrZXkucmVwbGFjZSgvXm9NZXNzYWdlKFxcdykoXFx3KykkLywgKG0sIG0xLCBtMikgPT4gbTEudG9Mb3dlckNhc2UoKSArIG0yKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gZm9ybUVsZW1lbnQuZGF0YXNldFtrZXldO1xuXG5cdFx0XHQvLyBUcnkgcGFyc2luZyB0aGUgdmFsdWUgYXMgSlNPTiwgb3RoZXJ3aXNlIGp1c3Qgc2V0IGl0IGFzIGEgc3RyaW5nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBIYW5kbGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBlbWl0dGVkIGJ5IGVsZW1lbnQvd2luZG93IGludGVyYWN0aW9uc1xuXHQgKi9cblx0aGFuZGxlRXZlbnQoZSkge1xuXHRcdGNvbnN0IFJFVFVSTl9LRVkgPSAxMztcblx0XHRpZiAoZS50eXBlID09PSAnY2xpY2snIHx8IGUudHlwZSA9PT0gJ2tleWRvd24nICYmIGUua2V5ID09PSBSRVRVUk5fS0VZKSB7XG5cdFx0XHRpZiAodGhpcy5mb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy52YWxpZGF0ZUZvcm1JbnB1dHMoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZS50eXBlID09PSAnc3VibWl0Jykge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgY2hlY2tlZEVsZW1lbnRzID0gdGhpcy52YWxpZGF0ZUZvcm1JbnB1dHMoKTtcblxuXHRcdFx0aWYgKGNoZWNrZWRFbGVtZW50cy5zb21lKGlucHV0ID0+IGlucHV0LnZhbGlkID09PSBmYWxzZSkpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0cy5lcnJvclN1bW1hcnkpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5zdW1tYXJ5KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBuZXdTdW1tYXJ5ID0gbmV3IEVycm9yU3VtbWFyeShjaGVja2VkRWxlbWVudHMpO1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtLnJlcGxhY2VDaGlsZChuZXdTdW1tYXJ5LCB0aGlzLnN1bW1hcnkpO1xuXHRcdFx0XHRcdFx0dGhpcy5zdW1tYXJ5ID0gbmV3U3VtbWFyeTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5zdW1tYXJ5ID0gdGhpcy5mb3JtLmluc2VydEJlZm9yZShuZXcgRXJyb3JTdW1tYXJ5KGNoZWNrZWRFbGVtZW50cyksIHRoaXMuZm9ybS5maXJzdEVsZW1lbnRDaGlsZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnN0IGZpcnN0RXJyb3JBbmNob3IgPSB0aGlzLnN1bW1hcnkucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRcdGlmIChmaXJzdEVycm9yQW5jaG9yKSB7XG5cdFx0XHRcdFx0XHRmaXJzdEVycm9yQW5jaG9yLmZvY3VzKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRlLnRhcmdldC5zdWJtaXQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBGb3JtIHZhbGlkYXRpb25cblx0KiBWYWxpZGF0ZXMgZXZlcnkgZWxlbWVudCBpbiB0aGUgZm9ybSBhbmQgY3JlYXRlcyBpbnB1dCBvYmplY3RzIGZvciB0aGUgZXJyb3Igc3VtbWFyeVxuXHQqL1xuXHR2YWxpZGF0ZUZvcm1JbnB1dHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZm9ybUlucHV0cy5tYXAob0Zvcm1JbnB1dCA9PiB7XG5cdFx0XHRjb25zdCB2YWxpZCA9IG9Gb3JtSW5wdXQudmFsaWRhdGUoKTtcblx0XHRcdGNvbnN0IGlucHV0ID0gb0Zvcm1JbnB1dC5pbnB1dDtcblx0XHRcdGNvbnN0IGZpZWxkID0gaW5wdXQuY2xvc2VzdCgnLm8tZm9ybXMtZmllbGQnKTtcblx0XHRcdGNvbnN0IGxhYmVsRWxlbWVudCA9IGZpZWxkID8gZmllbGQucXVlcnlTZWxlY3RvcignLm8tZm9ybXMtdGl0bGVfX21haW4nKSA6IG51bGw7XG5cdFx0XHQvLyBsYWJlbCBpcyBhY3R1YWxseSB0aGUgZmllbGQgdGl0bGUsIG5vdCBmb3IgZXhhbXBsZSB0aGUgbGFiZWwgb2YgYSBzaW5nbGUgY2hlY2tib3guXG5cdFx0XHQvLyB0aGlzIGlzIHVzZWQgdG8gZ2VuZXJhdGUgYW4gZXJyb3Igc3VtbWFyeVxuXHRcdFx0Y29uc3QgbGFiZWwgPSBsYWJlbEVsZW1lbnQgPyBsYWJlbEVsZW1lbnQudGV4dENvbnRlbnQgOiBudWxsO1xuXHRcdFx0Y29uc3QgZXJyb3JFbGVtZW50ID0gZmllbGQgPyBmaWVsZC5xdWVyeVNlbGVjdG9yKCcuby1mb3Jtcy1pbnB1dF9fZXJyb3InKSA6IG51bGw7XG5cdFx0XHRjb25zdCBlcnJvciA9IGVycm9yRWxlbWVudCA/IGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA6IGlucHV0LnZhbGlkYXRpb25NZXNzYWdlO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aWQ6IGlucHV0LmlkLFxuXHRcdFx0XHR2YWxpZCxcblx0XHRcdFx0ZXJyb3I6ICF2YWxpZCA/IGVycm9yIDogbnVsbCxcblx0XHRcdFx0bGFiZWwsXG5cdFx0XHRcdGZpZWxkLFxuXHRcdFx0XHRlbGVtZW50OiBvRm9ybUlucHV0LmlucHV0XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCogSW5wdXQgc3RhdGVcblx0KiBAcGFyYW0ge1N0cmluZ30gW25hbWVdIC0gbmFtZSBvZiB0aGUgaW5wdXQgZmllbGRzIHRvIGFkZCBzdGF0ZSB0b1xuXHQqIEBwYXJhbSB7U3RyaW5nfSBbc3RhdGVdIC0gdHlwZSBvZiBzdGF0ZSB0byBhcHBseSDigJQgb25lIG9mICdzYXZpbmcnLCAnc2F2ZWQnLCAnbm9uZSdcblx0KiBAcGFyYW0ge2Jvb2xlYW58b2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgb2Ygb3B0aW9ucyBkaXNwbGF5IGFuIGljb24gb25seSB3aGVuIHRydWUsIGhpZGluZyB0aGUgc3RhdHVzIGxhYmVsXG5cdCovXG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdGF0ZSAtIG5hbWUgb2YgdGhlIGlucHV0IGZpZWxkcyB0byBhZGQgc3RhdGUgdG9cblx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0eXBlIG9mIHN0YXRlIHRvIGFwcGx5IOKAlCBvbmUgb2YgJ3NhdmluZycsICdzYXZlZCcsICdub25lJ1xuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGFuIG9iamVjdCBvZiBvcHRpb25zXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmljb25MYWJlbCBbbnVsbF0gLSBjdXN0b21pc2UgdGhlIGxhYmVsIG9mIHRoZSBzdGF0ZSwgZS5nLiB0aGUgc2F2ZWQgc3RhdGUgZGVmYXVsdHMgdG8gXCJTYXZpbmdcIiBidXQgY291bGQgYmUgXCJTZW50XCJcblx0ICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmljb25Pbmx5IFtmYWxzZV0gLSB3aGVuIHRydWUgZGlzcGxheSBhbiBpY29uIG9ubHksIGhpZGluZyB0aGUgc3RhdHVzIGxhYmVsXG5cdCAqL1xuXHRzZXRTdGF0ZShzdGF0ZSwgbmFtZSwgb3B0aW9ucyA9IHsgaWNvbkxhYmVsOiBudWxsLCBpY29uT25seTogZmFsc2UgfSkge1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgfHwgb3B0aW9ucyA9PT0gbnVsbCB8fCBBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgb3B0aW9uc2AgYXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QnKTtcblx0XHR9XG5cblx0XHRsZXQgb2JqZWN0ID0gdGhpcy5zdGF0ZUVsZW1lbnRzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IG5hbWUpO1xuXHRcdGlmICghb2JqZWN0KSB7XG5cdFx0XHRvYmplY3QgPSB7XG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdGVsZW1lbnQ6IG5ldyBTdGF0ZSh0aGlzLmZvcm0uZWxlbWVudHNbbmFtZV0sIG9wdGlvbnMpXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnN0YXRlRWxlbWVudHMucHVzaChvYmplY3QpO1xuXHRcdH1cblx0XHRvYmplY3QuZWxlbWVudC5zZXQoc3RhdGUsIG9wdGlvbnMuaWNvbkxhYmVsKTtcblx0fVxuXG5cdC8qKlxuXHQqIERlc3Ryb3kgZm9ybSBpbnN0YW5jZVxuXHQqL1xuXHRkZXN0cm95KCkge1xuXHRcdGlmICghdGhpcy5vcHRzLnVzZUJyb3dzZXJWYWxpZGF0aW9uKSB7XG5cdFx0XHR0aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3VibWl0cy5mb3JFYWNoKHN1Ym1pdCA9PiB7XG5cdFx0XHRcdHN1Ym1pdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXHRcdFx0XHRzdWJtaXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMuZm9ybSA9IG51bGw7XG5cdFx0dGhpcy5mb3JtSW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuZGVzdHJveSgpKTtcblx0XHR0aGlzLmZvcm1JbnB1dHMgPSBudWxsO1xuXHRcdHRoaXMuc3RhdGVFbGVtZW50cyA9IG51bGw7XG5cdFx0dGhpcy5vcHRzID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIGZvcm0gY29tcG9uZW50LlxuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxTdHJpbmcpfSByb290RWxlbWVudCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIGEgZm9ybSBpbiwgb3IgYSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSByb290IGVsZW1lbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgYmFubmVyc1xuXHQgKi9cblx0c3RhdGljIGluaXQocm9vdEVsLCBvcHRzKSB7XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIG5ldyBGb3Jtcyhyb290RWwsIG9wdHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBBcnJheS5mcm9tKHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tZm9ybXNcIl0nKSwgcm9vdEVsID0+IG5ldyBGb3Jtcyhyb290RWwsIG9wdHMpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtcztcbiIsImltcG9ydCBvRm9ybXMgZnJvbSAnLi9zcmMvanMvZm9ybXMuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbigpIHtcblx0b0Zvcm1zLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IG9Gb3JtcztcbiIsImltcG9ydCAnLi4vLi4vbWFpbi5qcyc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pO1xuXG5jb25zdCBleHRyYUNvbnRlbnRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSdleHRyYSddXCIpO1xuLy8gaW5kZXRlcm1pbmF0ZSBzdGF0ZXMgY2FuIG9ubHkgYmUgc2V0IGR5bmFtaWNhbGx5LCB0aGVyZSBpcyBubyBhdHRyaWJ1dGUgZm9yIHRoZW0uXG5pZiAoZXh0cmFDb250ZW50SW5wdXQpIHsgZXh0cmFDb250ZW50SW5wdXQuaW5kZXRlcm1pbmF0ZSA9IHRydWU7IH1cbiJdfQ==