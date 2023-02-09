function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(function () {
  // src/js/multi-select.js
  var MultiSelect = /*#__PURE__*/function () {
    "use strict";

    function MultiSelect(multiSelectEl, options) {
      var _this = this;

      _classCallCheck(this, MultiSelect);

      this.multiSelectEl = multiSelectEl;
      this.clearCore();
      this.inputEl = multiSelectEl.querySelector("input");
      this.listboxEl = multiSelectEl.querySelector("[role=listbox]");
      this.selectedOptions = multiSelectEl.querySelector(".o-multi-select__selected-options");
      this.clearButton = multiSelectEl.querySelector(".o-multi-select__clear");
      this.clearButton.addEventListener("click", function () {
        _this.numberOfSelectedOptions = 0;

        _toConsumableArray(_this.selectedOptions.children).forEach(function (el) {
          return el.remove();
        });

        _toConsumableArray(document.querySelectorAll(".o-multi-select-option__selected")).forEach(function (el) {
          return el.classList.remove("o-multi-select-option__selected");
        });

        _this._updateInputState();
      });
      this.idBase = this.inputEl.id;
      this.numberOfSelectedOptions = 0;
      this.activeIndex = 0;
      this.open = false;
      this.inputEl.parentElement.addEventListener("mouseleave", function () {
        _this.listboxEl.style.display = "none";
        _this.clearButton.style.display = "none";
        _this.open = false;

        _this._updateInputState();
      });
      this.inputEl.addEventListener("click", function () {
        if (!_this.open) {
          _this.listboxEl.style.display = "block";
          _this.open = true;
        } else {
          _this.listboxEl.style.display = "none";
          _this.open = false;
        }

        _this._updateInputState();
      });
      this.options = Object.assign({}, {}, options || {
        multiSelectOptions: MultiSelect.getDataAttributes(multiSelectEl)
      });
      this.options.multiSelectOptions.forEach(function (option, index) {
        var optionEl = document.createElement("div");
        optionEl.setAttribute("role", "option");
        optionEl.id = "".concat(_this.idBase, "-").concat(index);
        optionEl.className = "o-multi-select-option";
        optionEl.setAttribute("aria-selected", "".concat(index === 0));
        optionEl.innerText = option;
        optionEl.addEventListener("click", function () {
          _this.onOptionClick(optionEl, option, index);
        });

        _this.listboxEl.appendChild(optionEl);
      });
    }

    _createClass(MultiSelect, [{
      key: "_updateInputState",
      value: function _updateInputState() {
        if (this.numberOfSelectedOptions) {
          if (this.open) {
            this.clearButton.style.display = "block";
          }

          this.inputEl.placeholder = "";
          this.selectedOptions.style.display = "block";
          var inputElWidth = this.inputEl.offsetWidth;
          var selectedOptionsComputedStyles = getComputedStyle(this.selectedOptions);
          var paddingLeft = selectedOptionsComputedStyles.paddingLeft,
              paddingRight = selectedOptionsComputedStyles.paddingRight;
          var sumOfChildrenWidthInitialValue = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);

          var sumOfChildrenWidth = _toConsumableArray(this.selectedOptions.children).map(function (el) {
            return el.offsetWidth;
          }).reduce(function (prev, curr) {
            return prev + curr;
          }, sumOfChildrenWidthInitialValue);

          if (sumOfChildrenWidth > inputElWidth * 0.9) {
            this.selectedOptions.classList.add("o-multi-select__visually-hidden");
            this.inputEl.placeholder = this.numberOfSelectedOptions + " options selected";
          } else {
            this.selectedOptions.classList.remove("o-multi-select__visually-hidden");
          }
        } else {
          this.selectedOptions.style.display = "none";
          this.clearButton.style.display = "none";

          if (this.open) {
            this.inputEl.placeholder = "Select options below";
          } else {
            this.inputEl.placeholder = "Click to select options";
          }
        }
      }
    }, {
      key: "clearCore",
      value: function clearCore() {
        var coreWrapper = this.multiSelectEl.querySelector(".o-multi-select_core");
        coreWrapper.style.display = "none";
        var enhancedWrapper = this.multiSelectEl.querySelector(".o-multi-select_enhanced");
        enhancedWrapper.style.display = "block";
      }
    }, {
      key: "onOptionClick",
      value: function onOptionClick(optionEl, option, index) {
        var _this2 = this;

        if (optionEl.classList.contains("o-multi-select-option__selected")) {
          optionEl.classList.remove("o-multi-select-option__selected");
          this.numberOfSelectedOptions--;
          var button2 = this.selectedOptions.querySelector("#".concat(option + index));
          button2.parentElement.remove();

          this._updateInputState();

          return;
        }

        this.numberOfSelectedOptions++;
        optionEl.classList.add("o-multi-select-option__selected");
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.id = option + index;
        button.className = "o-multi-select__selected-options-button";
        button.type = "button";
        button.innerText = option;
        var span = document.createElement("span");
        span.classList = "o-icons-icon o-icons-icon--cross";
        button.appendChild(span);
        li.appendChild(button);
        this.selectedOptions.appendChild(li);

        this._updateInputState();

        button.addEventListener("click", function () {
          li.remove();
          optionEl.classList.remove("o-multi-select-option__selected");
          _this2.numberOfSelectedOptions--;

          _this2._updateInputState();
        });
      }
    }], [{
      key: "getDataAttributes",
      value: function getDataAttributes(multiSelectEl) {
        if (!(multiSelectEl instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(multiSelectEl.dataset).reduce(function (options, key) {
          if (!key.match(/^oMultiSelect(\w)(\w+)$/)) {
            return options;
          }

          var shortKey = key.replace(/^oMultiSelect(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = multiSelectEl.dataset[key];

          try {
            options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
          } catch (error) {
            options[shortKey] = value;
          }

          return options.options.split(",");
        }, {});
      }
    }, {
      key: "init",
      value: function init(rootElement, options) {
        if (!rootElement) {
          rootElement = document.body;
        }

        if (!(rootElement instanceof HTMLElement)) {
          rootElement = document.querySelector(rootElement);
        }

        if (rootElement instanceof HTMLElement && rootElement.matches("[data-o-component=o-multi-select]")) {
          return new MultiSelect(rootElement, options);
        }

        return Array.from(rootElement.querySelectorAll('[data-o-component="o-multi-select"]'), function (rootEl) {
          return new MultiSelect(rootEl, options);
        });
      }
    }]);

    return MultiSelect;
  }();

  var multi_select_default = MultiSelect; // ../o-forms/src/js/input.js

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
      value: function handleEvent(event) {
        if (event.type === "blur" || event.type === "input") {
          this.validate(event);
        }
      }
    }, {
      key: "validate",
      value: function validate(event) {
        if (!this.parent) {
          return;
        }

        if (this.parent.classList.contains("o-forms-input--date")) {
          return this._validateDate(event);
        }

        if (!this.input.validity.valid) {
          this._toggleParentClasses("invalid");

          return false;
        } else if (this.input.validity.valid && this.parent.classList.contains(this.className.invalid)) {
          this._toggleParentClasses("valid");
        }

        return true;
      }
    }, {
      key: "_validateDate",
      value: function _validateDate(event) {
        var day = this.parent.querySelector("input.o-forms-input__day-part");
        var month = this.parent.querySelector("input.o-forms-input__month-part");
        var year = this.parent.querySelector("input.o-forms-input__year-part");
        var dateInputs = [day, month, year].filter(Boolean);
        var activeElement = event && event.relatedTarget ? event.relatedTarget : document.activeElement;
        var focusOnDateInput = dateInputs.includes(activeElement);
        var invalidDateInputAttempt = dateInputs.find(function (input) {
          return !focusOnDateInput && !input.validity.valid;
        });
        var entireDateValid = dateInputs.every(function (input) {
          return input.validity.valid;
        });

        if (entireDateValid) {
          this._toggleParentClasses("valid");

          return true;
        }

        if (invalidDateInputAttempt) {
          this._toggleParentClasses("invalid");

          return false;
        }

        return false;
      }
    }, {
      key: "_toggleParentClasses",
      value: function _toggleParentClasses(state) {
        if (state === "valid") {
          this.parent.classList.remove(this.className.invalid);
          this.parent.classList.add(this.className.valid);
        } else {
          this.parent.classList.remove(this.className.valid);
          this.parent.classList.add(this.className.invalid);
        }
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

  var input_default = Input; // ../o-forms/src/js/state.js

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
        this.stateEl.setAttribute("role", "status");
      }
    }, {
      key: "_saved",
      value: function _saved(label) {
        this.parent.classList.remove(this.className.saving);
        this.parent.classList.add(this.className.saved);
        this.stateEl.classList.toggle("o-forms-input__state--custom", Boolean(label));
        this.stateEl.textContent = label && !this.opts.iconOnly ? label : "";
        this.stateEl.setAttribute("aria-label", label || "Saved");
        this.stateEl.setAttribute("role", "status");
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

  var state_default = State; // ../o-forms/src/js/error-summary.js

  var ErrorSummary = /*#__PURE__*/function () {
    "use strict";

    function ErrorSummary(elements, headingMessage) {
      _classCallCheck(this, ErrorSummary);

      this.elements = elements;
      this.headingMessage = headingMessage || "There is a problem";
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
        div.innerHTML = "<h4 class=\"o-forms__error-summary__heading\" id=\"error-summary\">".concat(this.headingMessage, "</h4>");
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

  var error_summary_default = ErrorSummary; // ../o-forms/src/js/forms.js

  var Forms = /*#__PURE__*/function () {
    "use strict";

    function Forms(formElement, options) {
      var _this3 = this;

      _classCallCheck(this, Forms);

      if (formElement.nodeName !== "FORM") {
        throw new Error("[data-o-component=\"o-forms\"] must be set on a form element. It is currently set on a '".concat(formElement.nodeName.toLowerCase(), "'."));
      }

      this.form = formElement;
      this._formInputsCache = Array.from(this.form.elements, function (element) {
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
          submit.addEventListener("click", _this3);
          submit.addEventListener("keydown", _this3);
        });
      }
    }

    _createClass(Forms, [{
      key: "formInputs",
      get: function get() {
        var _this4 = this;

        if (!this.form) {
          return [];
        }

        var formElements = Array.from(this.form.elements);

        var inputsToRemove = this._formInputsCache.filter(function (input) {
          return !formElements.includes(input.input);
        });

        var elementsToAdd = formElements.filter(function (element) {
          return !_this4._formInputsCache.find(function (input) {
            return input.input === element;
          });
        });
        inputsToRemove.forEach(function (input) {
          return input.destroy();
        });
        this._formInputsCache = [].concat(_toConsumableArray(this._formInputsCache.filter(function (input) {
          return !inputsToRemove.includes(input);
        })), _toConsumableArray(elementsToAdd.map(function (element) {
          return new input_default(element);
        })));
        return this._formInputsCache;
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(event) {
        var RETURN_KEY = 13;

        if (event.type === "click" || event.type === "keydown" && event.key === RETURN_KEY) {
          if (this.form.checkValidity() === false) {
            this.validateFormInputs();
          }
        }

        if (event.type === "submit") {
          event.preventDefault();
          var checkedElements = this.validateFormInputs();

          if (checkedElements.some(function (input) {
            return input.valid === false;
          })) {
            if (this.opts.errorSummary) {
              if (this.summary) {
                var newSummary = new error_summary_default(checkedElements, this.opts.errorSummaryMessage);
                this.form.replaceChild(newSummary, this.summary);
                this.summary = newSummary;
              } else {
                this.summary = this.form.insertBefore(new error_summary_default(checkedElements, this.opts.errorSummaryMessage), this.form.firstElementChild);
              }

              var firstErrorAnchor = this.summary.querySelector("a");

              if (firstErrorAnchor) {
                firstErrorAnchor.focus();
              }
            }

            return;
          }

          event.target.submit();
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
            element: input
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
        var _this5 = this;

        if (!this.opts.useBrowserValidation) {
          this.form.removeEventListener("submit", this);
        } else {
          this.submits.forEach(function (submit) {
            submit.removeEventListener("click", _this5);
            submit.removeEventListener("keydown", _this5);
          });
        }

        this.form = null;

        this._formInputsCache.forEach(function (input) {
          return input.destroy();
        });

        this._formInputsCache = [];
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

  var forms_default = Forms; // ../o-forms/main.js

  var constructAll = function constructAll() {
    forms_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  if (typeof document !== "undefined") {
    document.addEventListener("o.DOMContentLoaded", constructAll);
  }

  var main_default = forms_default; // demos/src/demo.js

  main_default.init();

  var constructAll2 = function constructAll2() {
    multi_select_default.init(null, {
      multiSelectOptions: ["Apple", "Banana", "Blueberry", "Boysenberry", "Cherry", "Durian", "Eggplant", "Fig", "Grape", "Guava", "Huckleberry"]
    });
    document.removeEventListener("o.DOMContentLoaded", constructAll2);
  };

  if (typeof document !== "undefined") {
    document.addEventListener("o.DOMContentLoaded", constructAll2);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9tdWx0aS1zZWxlY3QuanMiLCIuLi9vLWZvcm1zL3NyYy9qcy9pbnB1dC5qcyIsIi4uL28tZm9ybXMvc3JjL2pzL3N0YXRlLmpzIiwiLi4vby1mb3Jtcy9zcmMvanMvZXJyb3Itc3VtbWFyeS5qcyIsIi4uL28tZm9ybXMvc3JjL2pzL2Zvcm1zLmpzIiwiLi4vby1mb3Jtcy9tYWluLmpzIiwiZGVtb3Mvc3JjL2RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsV0FBQTtBQUFBOztBQU9DLHlCQUFZLGFBQVosRUFBMkIsT0FBM0IsRUFBb0M7QUFBQTs7QUFBQTs7QUFDbkMsV0FBSyxhQUFMLEdBQXFCLGFBQXJCO0FBQ0EsV0FBSyxTQUFMO0FBRUEsV0FBSyxPQUFMLEdBQWUsYUFBQSxDQUFjLGFBQWQsQ0FBNEIsT0FBNUIsQ0FBZjtBQUNBLFdBQUssU0FBTCxHQUFpQixhQUFBLENBQWMsYUFBZCxDQUE0QixnQkFBNUIsQ0FBakI7QUFDQSxXQUFLLGVBQUwsR0FBdUIsYUFBQSxDQUFjLGFBQWQsQ0FDdEIsbUNBRHNCLENBQXZCO0FBR0EsV0FBSyxXQUFMLEdBQW1CLGFBQUEsQ0FBYyxhQUFkLENBQTRCLHdCQUE1QixDQUFuQjtBQUNBLFdBQUssV0FBTCxDQUFpQixnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkMsWUFBTTtBQUNoRCxRQUFBLEtBQUEsQ0FBSyx1QkFBTCxHQUErQixDQUEvQjs7QUFDQSwyQkFBSSxLQUFBLENBQUssZUFBTCxDQUFxQixRQUF6QixFQUFtQyxPQUFuQyxDQUEyQyxVQUFBLEVBQUE7QUFBQSxpQkFBTSxFQUFBLENBQUcsTUFBSCxFQUFOO0FBQUEsU0FBM0M7O0FBQ0EsMkJBQ0ksUUFBQSxDQUFTLGdCQUFULENBQTBCLGtDQUExQixDQURKLEVBRUUsT0FGRixDQUVVLFVBQUEsRUFBQTtBQUFBLGlCQUFNLEVBQUEsQ0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixp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QUEwQixvQkFBMUIsRUFBZ0QsWUFBaEQ7QUFBZ0Q7O0FBR2pELE1BQU8sWUFBQSxHQUFRLGFBQWYsQzs7QUNUQSxFQUFBLFlBQUEsQ0FBTyxJQUFQOztBQUVBLE1BQU0sYUFBQSxHQUFlLFNBQWYsYUFBZSxHQUFNO0FBQzFCLElBQUEsb0JBQUEsQ0FBWSxJQUFaLENBQWlCLElBQWpCLEVBQXVCO0FBQ3RCLE1BQUEsa0JBQUEsRUFBb0IsQ0FDbkIsT0FEbUIsRUFFbkIsUUFGbUIsRUFHbkIsV0FIbUIsRUFJbkIsYUFKbUIsRUFLbkIsUUFMbUIsRUFNbkIsUUFObUIsRUFPbkIsVUFQbUIsRUFRbkIsS0FSbUIsRUFTbkIsT0FUbUIsRUFVbkIsT0FWbUIsRUFXbkIsYUFYbUI7QUFERSxLQUF2QjtBQWVBLElBQUEsUUFBQSxDQUFTLG1CQUFULENBQTZCLG9CQUE3QixFQUFtRCxhQUFuRDtBQUFtRCxHQWhCcEQ7O0FBbUJBLE1BQUksT0FBTyxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ3BDLElBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxhQUFoRDtBQUFnRDs7QUFHakQsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDekQsSUFBQSxRQUFBLENBQVMsYUFBVCxDQUF1QixJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQXVDLEdBRHhDIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTXVsdGlTZWxlY3Qge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFttdWx0aVNlbGVjdEVsXSAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKi9cblx0Y29uc3RydWN0b3IobXVsdGlTZWxlY3RFbCwgb3B0aW9ucykge1xuXHRcdHRoaXMubXVsdGlTZWxlY3RFbCA9IG11bHRpU2VsZWN0RWw7XG5cdFx0dGhpcy5jbGVhckNvcmUoKTtcblxuXHRcdHRoaXMuaW5wdXRFbCA9IG11bHRpU2VsZWN0RWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0XHR0aGlzLmxpc3Rib3hFbCA9IG11bHRpU2VsZWN0RWwucXVlcnlTZWxlY3RvcignW3JvbGU9bGlzdGJveF0nKTtcblx0XHR0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IG11bHRpU2VsZWN0RWwucXVlcnlTZWxlY3Rvcihcblx0XHRcdCcuby1tdWx0aS1zZWxlY3RfX3NlbGVjdGVkLW9wdGlvbnMnXG5cdFx0KTtcblx0XHR0aGlzLmNsZWFyQnV0dG9uID0gbXVsdGlTZWxlY3RFbC5xdWVyeVNlbGVjdG9yKCcuby1tdWx0aS1zZWxlY3RfX2NsZWFyJyk7XG5cdFx0dGhpcy5jbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMubnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMgPSAwO1xuXHRcdFx0Wy4uLnRoaXMuc2VsZWN0ZWRPcHRpb25zLmNoaWxkcmVuXS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcblx0XHRcdFtcblx0XHRcdFx0Li4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm8tbXVsdGktc2VsZWN0LW9wdGlvbl9fc2VsZWN0ZWQnKSxcblx0XHRcdF0uZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdvLW11bHRpLXNlbGVjdC1vcHRpb25fX3NlbGVjdGVkJykpO1xuXHRcdFx0dGhpcy5fdXBkYXRlSW5wdXRTdGF0ZSgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gZGF0YVxuXHRcdHRoaXMuaWRCYXNlID0gdGhpcy5pbnB1dEVsLmlkO1xuXG5cdFx0Ly8gc3RhdGVcblx0XHR0aGlzLm51bWJlck9mU2VsZWN0ZWRPcHRpb25zID0gMDtcblx0XHR0aGlzLmFjdGl2ZUluZGV4ID0gMDtcblx0XHR0aGlzLm9wZW4gPSBmYWxzZTtcblxuXHRcdHRoaXMuaW5wdXRFbC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmxpc3Rib3hFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0dGhpcy5jbGVhckJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0dGhpcy5vcGVuID0gZmFsc2U7XG5cdFx0XHR0aGlzLl91cGRhdGVJbnB1dFN0YXRlKCk7XG5cdFx0fSk7XG5cdFx0dGhpcy5pbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0aWYgKCF0aGlzLm9wZW4pIHtcblx0XHRcdFx0dGhpcy5saXN0Ym94RWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRcdHRoaXMub3BlbiA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmxpc3Rib3hFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0XHR0aGlzLm9wZW4gPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3VwZGF0ZUlucHV0U3RhdGUoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHR7fSxcblx0XHRcdHt9LFxuXHRcdFx0b3B0aW9ucyB8fCB7XG5cdFx0XHRcdG11bHRpU2VsZWN0T3B0aW9uczogTXVsdGlTZWxlY3QuZ2V0RGF0YUF0dHJpYnV0ZXMobXVsdGlTZWxlY3RFbCksXG5cdFx0XHR9XG5cdFx0KTtcblx0XHR0aGlzLm9wdGlvbnMubXVsdGlTZWxlY3RPcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IG9wdGlvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRvcHRpb25FbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb25FbC5pZCA9IGAke3RoaXMuaWRCYXNlfS0ke2luZGV4fWA7XG5cdFx0XHRvcHRpb25FbC5jbGFzc05hbWUgPSAnby1tdWx0aS1zZWxlY3Qtb3B0aW9uJztcblx0XHRcdG9wdGlvbkVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGAke2luZGV4ID09PSAwfWApO1xuXHRcdFx0b3B0aW9uRWwuaW5uZXJUZXh0ID0gb3B0aW9uO1xuXG5cdFx0XHRvcHRpb25FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0dGhpcy5vbk9wdGlvbkNsaWNrKG9wdGlvbkVsLCBvcHRpb24sIGluZGV4KTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5saXN0Ym94RWwuYXBwZW5kQ2hpbGQob3B0aW9uRWwpO1xuXHRcdH0pO1xuXHR9XG5cblx0X3VwZGF0ZUlucHV0U3RhdGUoKSB7XG5cdFx0aWYgKHRoaXMubnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMpIHtcblx0XHRcdGlmICh0aGlzLm9wZW4pIHtcblx0XHRcdFx0dGhpcy5jbGVhckJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5wdXRFbC5wbGFjZWhvbGRlciA9ICcnO1xuXHRcdFx0dGhpcy5zZWxlY3RlZE9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRjb25zdCBpbnB1dEVsV2lkdGggPSB0aGlzLmlucHV0RWwub2Zmc2V0V2lkdGg7IC8vIHRoaXMgbmVlZHMgdG8gY2hhbmdlIGFuZCB0YWtlIGNsZWFyIGJ1dHRvbiBpbnRvIGFjY291bnRcblx0XHRcdGNvbnN0IHNlbGVjdGVkT3B0aW9uc0NvbXB1dGVkU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShcblx0XHRcdFx0dGhpcy5zZWxlY3RlZE9wdGlvbnNcblx0XHRcdCk7XG5cdFx0XHRjb25zdCB7cGFkZGluZ0xlZnQsIHBhZGRpbmdSaWdodH0gPSBzZWxlY3RlZE9wdGlvbnNDb21wdXRlZFN0eWxlcztcblx0XHRcdGNvbnN0IHN1bU9mQ2hpbGRyZW5XaWR0aEluaXRpYWxWYWx1ZSA9XG5cdFx0XHRcdHBhcnNlSW50KHBhZGRpbmdMZWZ0LCAxMCkgKyBwYXJzZUludChwYWRkaW5nUmlnaHQsIDEwKTtcblx0XHRcdGNvbnN0IHN1bU9mQ2hpbGRyZW5XaWR0aCA9IFsuLi50aGlzLnNlbGVjdGVkT3B0aW9ucy5jaGlsZHJlbl1cblx0XHRcdFx0Lm1hcChlbCA9PiBlbC5vZmZzZXRXaWR0aClcblx0XHRcdFx0LnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIsIHN1bU9mQ2hpbGRyZW5XaWR0aEluaXRpYWxWYWx1ZSk7XG5cblx0XHRcdGlmIChzdW1PZkNoaWxkcmVuV2lkdGggPiBpbnB1dEVsV2lkdGggKiAwLjkpIHtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZE9wdGlvbnMuY2xhc3NMaXN0LmFkZCgnby1tdWx0aS1zZWxlY3RfX3Zpc3VhbGx5LWhpZGRlbicpO1xuXHRcdFx0XHR0aGlzLmlucHV0RWwucGxhY2Vob2xkZXIgPVxuXHRcdFx0XHRcdHRoaXMubnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMgKyAnIG9wdGlvbnMgc2VsZWN0ZWQnO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZE9wdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcblx0XHRcdFx0XHQnby1tdWx0aS1zZWxlY3RfX3Zpc3VhbGx5LWhpZGRlbidcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZWxlY3RlZE9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHRoaXMuY2xlYXJCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdGlmICh0aGlzLm9wZW4pIHtcblx0XHRcdFx0dGhpcy5pbnB1dEVsLnBsYWNlaG9sZGVyID0gJ1NlbGVjdCBvcHRpb25zIGJlbG93Jztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuaW5wdXRFbC5wbGFjZWhvbGRlciA9ICdDbGljayB0byBzZWxlY3Qgb3B0aW9ucyc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJDb3JlKCkge1xuXHRcdGNvbnN0IGNvcmVXcmFwcGVyID0gdGhpcy5tdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnLm8tbXVsdGktc2VsZWN0X2NvcmUnXG5cdFx0KTtcblx0XHRjb3JlV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdGNvbnN0IGVuaGFuY2VkV3JhcHBlciA9IHRoaXMubXVsdGlTZWxlY3RFbC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0Jy5vLW11bHRpLXNlbGVjdF9lbmhhbmNlZCdcblx0XHQpO1xuXHRcdGVuaGFuY2VkV3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0fVxuXG5cdG9uT3B0aW9uQ2xpY2sob3B0aW9uRWwsIG9wdGlvbiwgaW5kZXgpIHtcblx0XHRpZiAob3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLW11bHRpLXNlbGVjdC1vcHRpb25fX3NlbGVjdGVkJykpIHtcblx0XHRcdG9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fc2VsZWN0ZWQnKTtcblx0XHRcdHRoaXMubnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMtLTtcblx0XHRcdGNvbnN0IGJ1dHRvbiA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zLnF1ZXJ5U2VsZWN0b3IoYCMke29wdGlvbiArIGluZGV4fWApO1xuXHRcdFx0YnV0dG9uLnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHR0aGlzLl91cGRhdGVJbnB1dFN0YXRlKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5udW1iZXJPZlNlbGVjdGVkT3B0aW9ucysrO1xuXHRcdG9wdGlvbkVsLmNsYXNzTGlzdC5hZGQoJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fc2VsZWN0ZWQnKTtcblx0XHQvLyBjcmVhdGUgYSBidXR0b24gd2l0aCByZW1vdmUgaWNvblxuXHRcdGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRidXR0b24uaWQgPSBvcHRpb24gKyBpbmRleDtcblx0XHRidXR0b24uY2xhc3NOYW1lID0gJ28tbXVsdGktc2VsZWN0X19zZWxlY3RlZC1vcHRpb25zLWJ1dHRvbic7XG5cdFx0YnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcblx0XHRidXR0b24uaW5uZXJUZXh0ID0gb3B0aW9uO1xuXHRcdGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0c3Bhbi5jbGFzc0xpc3QgPSAnby1pY29ucy1pY29uIG8taWNvbnMtaWNvbi0tY3Jvc3MnO1xuXHRcdGJ1dHRvbi5hcHBlbmRDaGlsZChzcGFuKTtcblx0XHRsaS5hcHBlbmRDaGlsZChidXR0b24pO1xuXHRcdHRoaXMuc2VsZWN0ZWRPcHRpb25zLmFwcGVuZENoaWxkKGxpKTtcblx0XHR0aGlzLl91cGRhdGVJbnB1dFN0YXRlKCk7XG5cblx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRsaS5yZW1vdmUoKTtcblx0XHRcdG9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fc2VsZWN0ZWQnKTtcblx0XHRcdHRoaXMubnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMtLTtcblx0XHRcdHRoaXMuX3VwZGF0ZUlucHV0U3RhdGUoKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBNdWx0aVNlbGVjdEVsZW1lbnQuIElmIHRoZSBlbGVtZW50IGlzIGJlaW5nIHNldCB1cFxuXHQgKiBkZWNsYXJhdGl2ZWx5LCB0aGlzIG1ldGhvZCBpcyB1c2VkIHRvIGV4dHJhY3QgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBET00uXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG11bHRpU2VsZWN0RWwgLSBUaGUgY29tcG9uZW50IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvcHRpb25zIG9iamVjdCB3aGljaCBjYW4gYmUgdXNlZCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKi9cblx0c3RhdGljIGdldERhdGFBdHRyaWJ1dGVzKG11bHRpU2VsZWN0RWwpIHtcblx0XHRpZiAoIShtdWx0aVNlbGVjdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhtdWx0aVNlbGVjdEVsLmRhdGFzZXQpLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XG5cdFx0XHQvLyBJZ25vcmUga2V5cyB3aGljaCBhcmUgbm90IGluIHRoZSBjb21wb25lbnQncyBuYW1lc3BhY2Vcblx0XHRcdGlmICgha2V5Lm1hdGNoKC9eb011bHRpU2VsZWN0KFxcdykoXFx3KykkLykpIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9XG5cdFx0XHQvLyBCdWlsZCBhIGNvbmNpc2Uga2V5IGFuZCBnZXQgdGhlIG9wdGlvbiB2YWx1ZVxuXHRcdFx0Y29uc3Qgc2hvcnRLZXkgPSBrZXkucmVwbGFjZShcblx0XHRcdFx0L15vTXVsdGlTZWxlY3QoXFx3KShcXHcrKSQvLFxuXHRcdFx0XHQobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTJcblx0XHRcdCk7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IG11bHRpU2VsZWN0RWwuZGF0YXNldFtrZXldO1xuXHRcdFx0Ly8gVHJ5IHBhcnNpbmcgdGhlIHZhbHVlIGFzIEpTT04sIG90aGVyd2lzZSBqdXN0IHNldCBpdCBhcyBhIHN0cmluZ1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoLycvZywgJ1wiJykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvcHRpb25zLm9wdGlvbnMuc3BsaXQoJywnKTtcblx0XHR9LCB7fSk7XG5cdH1cblx0LyoqXG5cdCAqIEluaXRpYWxpc2Ugby1tdWx0aS1zZWxlY3QgY29tcG9uZW50L3MuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbnRpYWxpc2UgdGhlIGNvbXBvbmVudCBpbiwgb3IgYSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSByb290IGVsZW1lbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50XG5cdCAqIEByZXR1cm5zIHtNdWx0aVNlbGVjdHxNdWx0aVNlbGVjdFtdfSBUaGUgbmV3bHkgY29uc3RydWN0ZWQgTXVsdGlTZWxlY3QgY29tcG9uZW50c1xuXHQgKi9cblx0c3RhdGljIGluaXQocm9vdEVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRpZiAoIXJvb3RFbGVtZW50KSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghKHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsZW1lbnQpO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRyb290RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG5cdFx0XHRyb290RWxlbWVudC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLW11bHRpLXNlbGVjdF0nKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIG5ldyBNdWx0aVNlbGVjdChyb290RWxlbWVudCwgb3B0aW9ucyk7XG5cdFx0fVxuXHRcdHJldHVybiBBcnJheS5mcm9tKFxuXHRcdFx0cm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLW11bHRpLXNlbGVjdFwiXScpLFxuXHRcdFx0cm9vdEVsID0+IG5ldyBNdWx0aVNlbGVjdChyb290RWwsIG9wdGlvbnMpXG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNdWx0aVNlbGVjdDtcbiIsImNsYXNzIElucHV0IHtcblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbZWxlbWVudF0gLSBBbiBpbnB1dCBlbGVtZW50IGluIHRoZSBET01cblx0ICovXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR0aGlzLmlucHV0ID0gZWxlbWVudDtcblx0XHR0aGlzLnBhcmVudCA9IGVsZW1lbnQuY2xvc2VzdCgnLm8tZm9ybXMtaW5wdXQnKTtcblxuXHRcdHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMpO1xuXHRcdHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzKTtcblxuXHRcdHRoaXMuY2xhc3NOYW1lID0ge1xuXHRcdFx0aW52YWxpZDogJ28tZm9ybXMtaW5wdXQtLWludmFsaWQnLFxuXHRcdFx0dmFsaWQ6ICdvLWZvcm1zLWlucHV0LS12YWxpZCdcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2ZW50IEhhbmRsZXJcblx0ICpcblx0ICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIGV2ZW50IGVtaXR0ZWQgYnkgZWxlbWVudC93aW5kb3cgaW50ZXJhY3Rpb25zXG5cdCAqL1xuXHRoYW5kbGVFdmVudChldmVudCkge1xuXHRcdGlmIChldmVudC50eXBlID09PSAnYmx1cicgfHwgZXZlbnQudHlwZSA9PT0gJ2lucHV0Jykge1xuXHRcdFx0dGhpcy52YWxpZGF0ZShldmVudCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIElucHV0IHZhbGlkYXRpb25cblx0ICogQ29uZGl0aW9ucyBmb3IgaW5wdXQgdmFsaWRhdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge0ZvY3VzRXZlbnR9IGV2ZW50IFtdIC0gVGhlIGV2ZW50IHdoaWNoIGhhcyBjYXVzZWQgcmUtdmFsaWRhdGlvbi5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IC0gaXMgdGhlIGlucHV0IHZhbGlkP1xuXHQgKi9cblx0dmFsaWRhdGUoZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMucGFyZW50KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gdmFsaWRhdGUgZGF0ZSBpbnB1dFxuXHRcdGlmICh0aGlzLnBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ28tZm9ybXMtaW5wdXQtLWRhdGUnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRlRGF0ZShldmVudCk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmlucHV0LnZhbGlkaXR5LnZhbGlkKSB7XG5cdFx0XHR0aGlzLl90b2dnbGVQYXJlbnRDbGFzc2VzKFwiaW52YWxpZFwiKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH0gZWxzZSBpZiAodGhpcy5pbnB1dC52YWxpZGl0eS52YWxpZCAmJiB0aGlzLnBhcmVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc05hbWUuaW52YWxpZCkpIHtcblx0XHRcdHRoaXMuX3RvZ2dsZVBhcmVudENsYXNzZXMoXCJ2YWxpZFwiKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIERhdGUgaW5wdXQgdmFsaWRhdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge0ZvY3VzRXZlbnR9IGV2ZW50IFtdIC0gVGhlIGV2ZW50IHdoaWNoIGhhcyBjYXVzZWQgcmUtdmFsaWRhdGlvbi5cblx0ICogQHJldHVybnMge2Jvb2xlYW59IC0gaXMgdGhlIGlucHV0IHZhbGlkP1xuXHQgKi9cblx0X3ZhbGlkYXRlRGF0ZShldmVudCkge1xuXHRcdGNvbnN0IGRheSA9IHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Lm8tZm9ybXMtaW5wdXRfX2RheS1wYXJ0Jyk7XG5cdFx0Y29uc3QgbW9udGggPSB0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dC5vLWZvcm1zLWlucHV0X19tb250aC1wYXJ0Jyk7XG5cdFx0Y29uc3QgeWVhciA9IHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Lm8tZm9ybXMtaW5wdXRfX3llYXItcGFydCcpO1xuXG5cdFx0Y29uc3QgZGF0ZUlucHV0cyA9IFtkYXksIG1vbnRoLCB5ZWFyXS5maWx0ZXIoQm9vbGVhbik7XG5cblx0XHRjb25zdCBhY3RpdmVFbGVtZW50ID0gZXZlbnQgJiYgZXZlbnQucmVsYXRlZFRhcmdldCA/IGV2ZW50LnJlbGF0ZWRUYXJnZXQgOiBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHRcdGNvbnN0IGZvY3VzT25EYXRlSW5wdXQgPSBkYXRlSW5wdXRzLmluY2x1ZGVzKGFjdGl2ZUVsZW1lbnQpO1xuXG5cdFx0Y29uc3QgaW52YWxpZERhdGVJbnB1dEF0dGVtcHQgPSBkYXRlSW5wdXRzLmZpbmQoaW5wdXQgPT4ge1xuXHRcdFx0cmV0dXJuICFmb2N1c09uRGF0ZUlucHV0ICYmICFpbnB1dC52YWxpZGl0eS52YWxpZDtcblx0XHR9KTtcblxuXHRcdGNvbnN0IGVudGlyZURhdGVWYWxpZCA9IGRhdGVJbnB1dHMuZXZlcnkoaW5wdXQgPT4gaW5wdXQudmFsaWRpdHkudmFsaWQpO1xuXHRcdGlmKGVudGlyZURhdGVWYWxpZCkge1xuXHRcdFx0dGhpcy5fdG9nZ2xlUGFyZW50Q2xhc3NlcyhcInZhbGlkXCIpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRG8gbm90IHNldCB2YWxpZGl0eSBjbGFzc2VzIGJlZm9yZSB0aGUgdXNlclxuXHRcdC8vIGhhcyBtb3ZlZCBvbiBmcm9tIHRoZSBkYXRlIGZpZWxkLlxuXHRcdGlmIChpbnZhbGlkRGF0ZUlucHV0QXR0ZW1wdCkge1xuXHRcdFx0dGhpcy5fdG9nZ2xlUGFyZW50Q2xhc3NlcyhcImludmFsaWRcIik7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0X3RvZ2dsZVBhcmVudENsYXNzZXMoc3RhdGUpIHtcblx0XHRpZiAoc3RhdGUgPT09IFwidmFsaWRcIiApIHtcblx0XHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuaW52YWxpZCk7XG5cdFx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lLnZhbGlkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzTmFtZS52YWxpZCk7XG5cdFx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lLmludmFsaWQpO1xuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG5cdFx0dGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMpO1xuXHRcdHRoaXMuaW5wdXQgPSBudWxsO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuIiwiY2xhc3MgU3RhdGUge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7UmFkaW9Ob2RlTGlzdH0gW2lucHV0c10gLSBBIE5vZGVMaXN0IG9mIHJhZGlvIGlucHV0IGVsZW1lbnRzXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbiB8IG9iamVjdH0gb3B0cyAtIGFuIG9iamVjdCBvZiBvcHRpb25zXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLmljb25Pbmx5IFtudWxsXSAtIHdoZW4gdHJ1ZSBkaXNwbGF5IGFuIGljb24gb25seSwgaGlkaW5nIHRoZSBzdGF0dXMgbGFiZWxcblx0ICovXG5cdGNvbnN0cnVjdG9yKGlucHV0cywgb3B0cykge1xuXHRcdGNvbnN0IHJhZGlvSW5wdXRzID0gaW5wdXRzIGluc3RhbmNlb2YgUmFkaW9Ob2RlTGlzdDtcblx0XHRpZiAocmFkaW9JbnB1dHMpIHtcblx0XHRcdHRoaXMuaW5wdXRzID0gaW5wdXRzO1xuXHRcdFx0dGhpcy5wYXJlbnQgPSB0aGlzLmlucHV0c1swXS5jbG9zZXN0KCcuby1mb3Jtcy1pbnB1dCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gYHJhZGlvYCB0eXBlIGlucHV0cy4nKTtcblx0XHR9XG5cblx0XHR0aGlzLl92ZXJpZnkoKTtcblx0XHR0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdGljb25Pbmx5OiBmYWxzZVxuXHRcdH0sIG9wdHMpO1xuXG5cdFx0dGhpcy5jbGFzc05hbWUgPSB7XG5cdFx0XHRzYXZpbmc6ICdvLWZvcm1zLWlucHV0LS1zYXZpbmcnLFxuXHRcdFx0c2F2ZWQ6ICdvLWZvcm1zLWlucHV0LS1zYXZlZCdcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBzdGF0ZSBlbGVtZW50XG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0X2dlbmVyYXRlU3RhdGVFbCgpIHtcblx0XHR0aGlzLnN0YXRlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0Y29uc3QgY2xhc3NOYW1lcyA9IHRoaXMub3B0cy5pY29uT25seSA/IFsnby1mb3Jtcy1pbnB1dF9fc3RhdGUnLCAnby1mb3Jtcy1pbnB1dF9fc3RhdGUtLWljb24tb25seSddIDogWydvLWZvcm1zLWlucHV0X19zdGF0ZSddO1xuXHRcdCB0aGlzLnN0YXRlRWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcblx0XHR0aGlzLnBhcmVudC5hcHBlbmQodGhpcy5zdGF0ZUVsKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdGF0ZSBzZXR0ZXJcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIHR5cGUgb2Ygc3RhdGUgdG8gZGlzcGxheVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgY3VzdG9taXNlIHRoZSBsYWJlbCBvZiB0aGUgc3RhdGUsIGUuZy4gdGhlIHNhdmVkIHN0YXRlIGRlZmF1bHRzIHRvIFwiU2F2aW5nXCIgYnV0IGNvdWxkIGJlIFwiU2VudFwiXG5cdCAqL1xuXHRzZXQoc3RhdGUsIGxhYmVsKSB7XG5cdFx0aWYgKCF0aGlzLnN0YXRlRWwpIHtcblx0XHRcdHRoaXMuX2dlbmVyYXRlU3RhdGVFbCgpO1xuXHRcdH1cblxuXHRcdGlmIChzdGF0ZSA9PT0gJ3NhdmluZycpIHtcblx0XHRcdHRoaXMuX3NhdmluZyhsYWJlbCk7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PT0gJ3NhdmVkJykge1xuXHRcdFx0dGhpcy5fc2F2ZWQobGFiZWwpO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT09ICdub25lJykge1xuXHRcdFx0dGhpcy5fcmVtb3ZlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgJHtzdGF0ZX0gaXMgbm90IGEgcmVjb2duaXNlZCBzdGF0ZSwgdGhlIG9wdGlvbnMgYXJlICdzYXZpbmcnLCAnc2F2ZWQnIG9yICdub25lJy5gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2F2aW5nIHN0YXRlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCAtIHRoZSBjb3B5IHdoZW4gc2F2aW5nXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0X3NhdmluZyhsYWJlbCkge1xuXHRcdC8vIFJlbW92ZSBvdGhlciBzdGF0ZSBjbGFzc2VzLlxuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuc2F2ZWQpO1xuXHRcdC8vIEFkZCBzYXZpbmcgc3RhdGUgY2xhc3MuXG5cdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZS5zYXZpbmcpO1xuXHRcdC8vIEFkZCBjdXN0b20gc3RhdGUgbGFiZWwgaWYgZ2l2ZW4uXG5cdFx0Ly8gRGVmYXVsdCBsYWJlbCBjb3B5IGlzIGFkZGVkIHZpYSB0aGUgQ1NTIGBjb250ZW50YCBhdHRyaWJ1dGUuXG5cdFx0dGhpcy5zdGF0ZUVsLmNsYXNzTGlzdC50b2dnbGUoJ28tZm9ybXMtaW5wdXRfX3N0YXRlLS1jdXN0b20nLCBCb29sZWFuKGxhYmVsKSk7XG5cdFx0dGhpcy5zdGF0ZUVsLnRleHRDb250ZW50ID0gbGFiZWwgJiYgIXRoaXMub3B0cy5pY29uT25seSA/IGxhYmVsIDogJyc7XG5cdFx0Ly8gV2hlbiBpY29uLW9ubHkgaXMgc2V0IHRoZXJlIGlzIG5vIGNvcHkgd2hlbiBnaXZlbiBhIGN1c3RvbSBsYWJlbCBzb1xuXHRcdC8vIGFkZCBhbiBhcmlhIGxhYmVsLlxuXHRcdHRoaXMuc3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCB8fCAnU2F2aW5nJyk7XG5cdFx0dGhpcy5zdGF0ZUVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdzdGF0dXMnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTYXZlZCBzdGF0ZVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgLSB0aGUgY29weSB3aGVuIHNhdmVkXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0X3NhdmVkKGxhYmVsKSB7XG5cdFx0Ly8gUmVtb3ZlIG90aGVyIHN0YXRlIGNsYXNzZXMuXG5cdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzTmFtZS5zYXZpbmcpO1xuXHRcdC8vIEFkZCBzYXZlZCBzdGF0ZSBjbGFzcy5cblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lLnNhdmVkKTtcblx0XHQvLyBBZGQgY3VzdG9tIHN0YXRlIGxhYmVsIGlmIGdpdmVuLlxuXHRcdC8vIERlZmF1bHQgbGFiZWwgY29weSBpcyBhZGRlZCB2aWEgdGhlIENTUyBgY29udGVudGAgYXR0cmlidXRlLlxuXHRcdHRoaXMuc3RhdGVFbC5jbGFzc0xpc3QudG9nZ2xlKCdvLWZvcm1zLWlucHV0X19zdGF0ZS0tY3VzdG9tJywgQm9vbGVhbihsYWJlbCkpO1xuXHRcdHRoaXMuc3RhdGVFbC50ZXh0Q29udGVudCA9IGxhYmVsICYmICF0aGlzLm9wdHMuaWNvbk9ubHkgPyBsYWJlbCA6ICcnO1xuXHRcdC8vIFdoZW4gaWNvbi1vbmx5IGlzIHNldCB0aGVyZSBpcyBubyBjb3B5IHdoZW4gZ2l2ZW4gYSBjdXN0b20gbGFiZWwgc29cblx0XHQvLyBhZGQgYW4gYXJpYSBsYWJlbC5cblx0XHR0aGlzLnN0YXRlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwgfHwgJ1NhdmVkJyk7XG5cdFx0dGhpcy5zdGF0ZUVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdzdGF0dXMnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgc3RhdGVcblx0ICpcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfcmVtb3ZlKCkge1xuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuc2F2aW5nKTtcblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLnNhdmVkKTtcblx0XHR0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLnN0YXRlRWwpO1xuXHRcdHRoaXMuc3RhdGVFbCA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogVmVyaWZ5IGlucHV0IHBhcmVudFxuXHQgKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF92ZXJpZnkoKSB7XG5cdFx0aWYgKCF0aGlzLnBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ28tZm9ybXMtaW5wdXQtLXJhZGlvLWJveCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIGNhbiBvbmx5IGJlIHNldCBvbiByYWRpbyBpbnB1dHMgd2l0aCBhIGJveCBzdHlsZSAoby1mb3Jtcy1pbnB1dC0tcmFkaW8tYm94KS4nKTtcblx0XHR9IGVsc2UgaWYgKHRoaXMucGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnLm8tZm9ybXMtLWlucHV0LWludmFsaWQnKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBjYW5ub3QgYmUgc2V0IG9uIGFuIGludmFsaWQgaW5wdXQgZmllbGQuJyk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuIiwiLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBFcnJvclN1bW1hcnlFbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxJbnB1dEVsZW1lbnR9IGVsZW1lbnQgLSB0aGUgYXNzb2NpYXRlZCBlbGVtZW50XG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWQgLSB0aGUgaW5wdXQgZWxlbWVudCdzIGlkXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHZhbGlkIC0gd2FzIHRoZSB1c2VyJ3MgdmFsdWUgdmFsaWQ/XG4gKiBAcHJvcGVydHkge3N0cmluZz19IGVycm9yIC0gdGhlIGVycm9yIG1lc3NhZ2UgZm9yIHRoaXMgZWxlbWVudFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudD19IGZpZWxkIC0gYSBjb250YWluaW5nIG8tZm9ybXMtZmllbGQgZWxlbWVudFxuICogQHByb3BlcnR5IHtIVE1MTGFiZWxFbGVtZW50fSBsYWJlbCAtIGFuIGFzc29jaWF0ZWQgbGFiZWwgZWxlbWVudFxuICovXG5cbmNsYXNzIEVycm9yU3VtbWFyeSB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheTxFcnJvclN1bW1hcnlFbGVtZW50Pn0gW2VsZW1lbnRzXSAtIEFuIGFycmF5IG9mIG9iamVjdHMsIHdoZXJlIGVhY2ggb2JqZWN0IGRlc2NyaWJlcyBhbiBpbnZhbGlkIGlucHV0IGVsZW1lbnRcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtoZWFkaW5nTWVzc2FnZT0nVGhlcmUgaXMgYSBwcm9ibGVtJ10gLSBBIG1lc3NhZ2UgdG8gc2hvdyBpbiB0aGUgaGVhZGVyLiBJdCBkZWZhdWx0cyB0bzogJ1RoZXJlIGlzIGEgcHJvYmxlbSdcblx0ICogQGV4YW1wbGVcblx0ICpcdGNvbnN0IGVsZW1lbnRzRXhhbXBsZSA9IFtcblx0ICpcdFx0e1xuXHQgKlx0XHRcdGlkOiAndGV4dC1pbnB1dCcsXG5cdCAqXHRcdFx0dmFsaWQ6IGZhbHNlLFxuXHQgKlx0XHRcdGVycm9yOiAnUGxlYXNlIGZpbGwgb3V0IHRoaXMgZmllbGQnLFxuXHQgKlx0XHRcdGxhYmVsOiAnSW5wdXQgTGFiZWwnLFxuXHQgKlx0XHRcdGVsZW1lbnQ6IDxFbGVtZW50IC8+LFxuXHQgKlx0XHR9LFxuXHQgKlx0XHR7Li4ufSxcblx0ICpcdF07XG5cdCAqXHRuZXcgRXJyb3JTdW1tYXJ5KGV4YW1wbGUsICdUaGlzIGlzIGEgaGVhZGluZyBtZXNzYWdlJylcblx0ICovXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnRzLCBoZWFkaW5nTWVzc2FnZSkge1xuXHRcdHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcblx0XHR0aGlzLmhlYWRpbmdNZXNzYWdlID0gaGVhZGluZ01lc3NhZ2UgfHwgJ1RoZXJlIGlzIGEgcHJvYmxlbSc7XG5cdFx0Y29uc3QgaGFzQW5JbnZlcnNlRmllbGQgPSBlbGVtZW50cy5zb21lKGVsZW0gPT4ge1xuXHRcdFx0aWYgKGVsZW0uZmllbGQpIHtcblx0XHRcdFx0cmV0dXJuIGVsZW0uZmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLWZvcm1zLWZpZWxkLS1pbnZlcnNlJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5pbnZlcnNlID0gaGFzQW5JbnZlcnNlRmllbGQ7XG5cdFx0dGhpcy5pbnZhbGlkSW5wdXRzID0gW107XG5cblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVTdW1tYXJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGUgTm9kZSB0byBob2xkIGxpc3Qgb2YgaW52YWxpZCBpbnB1dHNcblx0ICpcblx0ICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSAtIGEgZGl2IGZ1bGwgb2YgZXJyb3IgbWVzc2FnZXNcblx0ICovXG5cdGNyZWF0ZVN1bW1hcnkoKSB7XG5cdFx0Y29uc3QgaW52YWxpZElucHV0cyA9IHRoaXMuZWxlbWVudHMuZmlsdGVyKGUgPT4gIWUudmFsaWQpO1xuXG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ28tZm9ybXNfX2Vycm9yLXN1bW1hcnknKTtcblx0XHRpZiAodGhpcy5pbnZlcnNlKSB7XG5cdFx0XHRkaXYuY2xhc3NMaXN0LmFkZCgnby1mb3Jtc19fZXJyb3Itc3VtbWFyeS0taW52ZXJzZScpO1xuXHRcdH1cblx0XHRkaXYuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCAnZXJyb3Itc3VtbWFyeScpO1xuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYWxlcnQnKTtcblxuXHRcdGRpdi5pbm5lckhUTUwgPSBgPGg0IGNsYXNzPVwiby1mb3Jtc19fZXJyb3Itc3VtbWFyeV9faGVhZGluZ1wiIGlkPVwiZXJyb3Itc3VtbWFyeVwiPiR7dGhpcy5oZWFkaW5nTWVzc2FnZX08L2g0PmA7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKEVycm9yU3VtbWFyeS5jcmVhdGVMaXN0KGludmFsaWRJbnB1dHMpKTtcblx0XHRyZXR1cm4gZGl2O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIGxpc3Qgb2YgYW5jaG9yc1xuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5PEVycm9yU3VtbWFyeUVsZW1lbnQ+fSBpbnB1dHMgLSBlbGVtZW50IGRlc2NyaXB0b3JzXG5cdCAqIEByZXR1cm5zIHtIVE1MVUxpc3RFbGVtZW50fSAtIHRoZSBsaXN0XG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlTGlzdChpbnB1dHMpIHtcblx0XHRjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblx0XHRsaXN0LmNsYXNzTGlzdC5hZGQoJ28tZm9ybXNfX2Vycm9yLXN1bW1hcnlfX2xpc3QnKTtcblx0XHRjb25zdCBmaWVsZHNJblRoZUxpc3QgPSBbXTtcblx0XHRpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG5cdFx0XHQvLyBBIGZpZWxkIG1heSBjb250YWluIG11bHRpcGxlIGludmFsaWQgaW5wdXRzLiBFLmcuIGEgZGF0ZSBmaWVsZFxuXHRcdFx0Ly8gaGFzIHRocmVlIHRleHQgaW5wdXRzIGZvciBkYXksIG1vbnRoLCBhbmQgeWVhci4gT25seSBzaG93IGFcblx0XHRcdC8vIGZpZWxkIGluIHRoZSBlcnJvciBzdW1tYXJ5IG9uY2UgaWYgaXQgaGFzIG11bHRpcGxlIGludmFsaWQgaW5wdXRzXG5cdFx0XHRpZiAoZmllbGRzSW5UaGVMaXN0LmluY2x1ZGVzKGlucHV0LmZpZWxkKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5wdXQuZmllbGQpIHtcblx0XHRcdFx0ZmllbGRzSW5UaGVMaXN0LnB1c2goaW5wdXQuZmllbGQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaW52YWxpZCBpbnB1dCBidXQgd2l0aCBubyBsYWJlbCB0byBjcmVhdGUgYW4gZXJyb3Igc3VtbWFyeVxuXHRcdFx0aWYgKGlucHV0LnZhbGlkID09PSBmYWxzZSAmJiAhaW5wdXQubGFiZWwpIHtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdGBDb3VsZCBub3QgYWRkIGFuIGludmFsaWQgaW5wdXQgdG8gdGhlIGVycm9yIHN1bW1hcnkuIGAgK1xuXHRcdFx0XHRcdFx0YENoZWNrIHRoZSBpbnB1dCBoYXMgYSBwYXJlbnQgXFxgby1mb3Jtcy1maWVsZFxcYCBlbGVtZW50IHdpdGggY29ycmVjdCB0aXRsZSBtYXJrdXAuIGAgK1xuXHRcdFx0XHRcdFx0YE9yIGRpc2FibGUgdGhlIGVycm9yIHN1bW1hcnkgZmVhdHVyZSBmb3IgdGhpcyBmb3JtIHdpdGggXFxgZGF0YS1vLWZvcm1zLWVycm9yLXN1bW1hcnk9XCJmYWxzZVwiXFxgLmAsXG5cdFx0XHRcdFx0aW5wdXQuZWxlbWVudFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaW52YWxpZCBpbnB1dCwgYWRkIHRvIGVycm9yIHN1bW1hcnlcblx0XHRcdGlmIChpbnB1dC52YWxpZCA9PT0gZmFsc2UgJiYgaW5wdXQubGFiZWwpIHtcblx0XHRcdFx0Y29uc3QgbGlzdEl0ZW0gPSBFcnJvclN1bW1hcnkuY3JlYXRlSXRlbShpbnB1dCk7XG5cdFx0XHRcdGxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGUgYW4gaXRlbSBmb3IgdGhlIGVycm9yIHN1bW1hcnlcblx0ICpcblx0ICogQHBhcmFtIHtvYmplY3R9IFtpbnB1dF0gLSBUaGUgaW5wdXQgb2JqZWN0IHRvIGNvbnN0cnVjdCBhbiBlcnJvciBzdW1tYXJ5IGl0ZW0gZm9yXG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fSAtIGxpXG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlSXRlbShpbnB1dCkge1xuXHRcdGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgnby1mb3Jtc19fZXJyb3Itc3VtbWFyeV9faXRlbScpO1xuXG5cdFx0Ly8gUmV0dXJuIGEgZXJyb3Igc3VtbWFyeSBpdGVtIHdoaWNoIGxpbmtzIHRvIHRoZSBpbnB1dCBpZiBhbiBpZCBleGlzdHMuXG5cdFx0aWYgKGlucHV0LmlkKSB7XG5cdFx0XHRjb25zdCBpdGVtQW5jaG9yID0gRXJyb3JTdW1tYXJ5LmNyZWF0ZUFuY2hvcihpbnB1dCk7XG5cdFx0XHRpdGVtLmFwcGVuZENoaWxkKGl0ZW1BbmNob3IpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdC8vIElmIG5vIGlkIGV4aXN0IHJldHVybiBhbiBlcnJvciBzdW1tYXJ5IGl0ZW0gd2l0aG91dCBhIGxpbmsuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRgQ291bGQgbm90IGxpbmsgdG8gYW4gaW52YWxpZCBpbnB1dCBmcm9tIHRoZSBlcnJvciBzdW1tYXJ5LiBgICtcblx0XHRcdFx0YEFkZCBhIHVuaXF1ZSBpZCBhdHRyaWJ1dGUgdG8gdGhlIGlucHV0IGVsZW1lbnQuYCxcblx0XHRcdGlucHV0LmVsZW1lbnRcblx0XHQpO1xuXG5cdFx0aXRlbS5pbm5lckhUTUwgPSBFcnJvclN1bW1hcnkuX2dldEl0ZW1Db250ZW50KGlucHV0KTtcblx0XHRyZXR1cm4gaXRlbTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBhbmNob3IgZWxlbWVudCB0byBwb2ludCBhdCBpbnZhbGlkIGlucHV0XG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBbaW5wdXRdIC0gVGhlIGlucHV0IG9iamVjdCB0byBjb25zdHJ1Y3QgYW4gYW5jaG9yIGZvclxuXHQgKiBAcmV0dXJucyB7RWxlbWVudH0gLSBhXG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlQW5jaG9yKGlucHV0KSB7XG5cdFx0Y29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRcdGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBgIyR7aW5wdXQuaWR9YCk7XG5cdFx0YW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHQnY2xpY2snLFxuXHRcdFx0ZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKS5mb2N1cygpO1xuXHRcdFx0fS5iaW5kKGlucHV0KVxuXHRcdCk7XG5cdFx0YW5jaG9yLmlubmVySFRNTCA9IEVycm9yU3VtbWFyeS5fZ2V0SXRlbUNvbnRlbnQoaW5wdXQpO1xuXHRcdHJldHVybiBhbmNob3I7XG5cdH1cblxuXHQvKipcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Tm9kZX0gaW5wdXQgLSBUaGUgaW5wdXQgZWxlbWVudCB3aGljaCBoYXMgYW4gZXJyb3Jcblx0ICogQHJldHVybnMge3N0cmluZ30gLSB0aGUgaHRtbCB0ZXh0IGZvciBhbiBlcnJvciBzdW1tYXJ5IGl0ZW1cblx0ICovXG5cdHN0YXRpYyBfZ2V0SXRlbUNvbnRlbnQoaW5wdXQpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0JzxzcGFuIGNsYXNzPVwiby1mb3Jtc19fZXJyb3Itc3VtbWFyeV9faXRlbS1vdmVydmlld1wiPicgK1xuXHRcdFx0YCR7aW5wdXQubGFiZWx9PC9zcGFuPjogYCArXG5cdFx0XHRgPHNwYW4gY2xhc3M9XCJvLWZvcm1zX19lcnJvci1zdW1tYXJ5X19pdGVtLWRldGFpbFwiPiR7aW5wdXQuZXJyb3J9PC9zcGFuPmBcblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yU3VtbWFyeTtcbiIsImltcG9ydCBJbnB1dCBmcm9tICcuL2lucHV0LmpzJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlLmpzJztcbmltcG9ydCBFcnJvclN1bW1hcnkgZnJvbSAnLi9lcnJvci1zdW1tYXJ5LmpzJztcblxuY2xhc3MgRm9ybXMge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtmb3JtRWxlbWVudF0gLSBUaGUgZm9ybSBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgZm9ybVxuXHQgKi9cblx0Y29uc3RydWN0b3IoZm9ybUVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRpZiAoZm9ybUVsZW1lbnQubm9kZU5hbWUgIT09ICdGT1JNJykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBbZGF0YS1vLWNvbXBvbmVudD1cIm8tZm9ybXNcIl0gbXVzdCBiZSBzZXQgb24gYSBmb3JtIGVsZW1lbnQuIEl0IGlzIGN1cnJlbnRseSBzZXQgb24gYSAnJHtmb3JtRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpfScuYCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5mb3JtID0gZm9ybUVsZW1lbnQ7XG5cdFx0dGhpcy5fZm9ybUlucHV0c0NhY2hlID0gQXJyYXkuZnJvbSh0aGlzLmZvcm0uZWxlbWVudHMsIGVsZW1lbnQgPT4gbmV3IElucHV0KGVsZW1lbnQpKTtcblx0XHR0aGlzLnN0YXRlRWxlbWVudHMgPSBbXTtcblxuXHRcdHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0dXNlQnJvd3NlclZhbGlkYXRpb246IGZhbHNlLFxuXHRcdFx0ZXJyb3JTdW1tYXJ5OiB0cnVlXG5cdFx0fSwgb3B0aW9ucyB8fCBGb3Jtcy5nZXREYXRhQXR0cmlidXRlcyhmb3JtRWxlbWVudCkpO1xuXG5cdFx0aWYgKCF0aGlzLm9wdHMudXNlQnJvd3NlclZhbGlkYXRpb24pIHtcblx0XHRcdHRoaXMuZm9ybS5zZXRBdHRyaWJ1dGUoJ25vdmFsaWRhdGUnLCB0cnVlKTtcblx0XHRcdHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5mb3JtLnJlbW92ZUF0dHJpYnV0ZSgnbm92YWxpZGF0ZScpO1xuXHRcdFx0dGhpcy5zdWJtaXRzID0gdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPXN1Ym1pdF0nKTtcblx0XHRcdHRoaXMuc3VibWl0cy5mb3JFYWNoKHN1Ym1pdCA9PiB7XG5cdFx0XHRcdHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXHRcdFx0XHRzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGdldCBmb3JtSW5wdXRzKCkge1xuXHRcdGlmKCF0aGlzLmZvcm0pIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cdFx0Y29uc3QgZm9ybUVsZW1lbnRzID0gQXJyYXkuZnJvbSh0aGlzLmZvcm0uZWxlbWVudHMpO1xuXHRcdGNvbnN0IGlucHV0c1RvUmVtb3ZlID0gdGhpcy5fZm9ybUlucHV0c0NhY2hlLmZpbHRlcihpbnB1dCA9PiAhZm9ybUVsZW1lbnRzLmluY2x1ZGVzKGlucHV0LmlucHV0KSk7XG5cdFx0Y29uc3QgZWxlbWVudHNUb0FkZCA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZWxlbWVudCA9PiAhdGhpcy5fZm9ybUlucHV0c0NhY2hlLmZpbmQoKGlucHV0KSA9PiBpbnB1dC5pbnB1dCA9PT0gZWxlbWVudCkpO1xuXHRcdGlucHV0c1RvUmVtb3ZlLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuZGVzdHJveSgpKTtcblx0XHR0aGlzLl9mb3JtSW5wdXRzQ2FjaGUgPSBbXG5cdFx0XHQuLi50aGlzLl9mb3JtSW5wdXRzQ2FjaGUuZmlsdGVyKGlucHV0ID0+ICFpbnB1dHNUb1JlbW92ZS5pbmNsdWRlcyhpbnB1dCkpLFxuXHRcdFx0Li4uZWxlbWVudHNUb0FkZC5tYXAoZWxlbWVudCA9PiBuZXcgSW5wdXQoZWxlbWVudCkpXG5cdFx0XTtcblx0XHRyZXR1cm4gdGhpcy5fZm9ybUlucHV0c0NhY2hlO1xuXHR9XG5cblxuXHQvKipcblx0ICogR2V0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgZm9ybUVsZW1lbnQuIElmIHRoZSBmb3JtIGlzIGJlaW5nIHNldCB1cFxuXHQgKiBkZWNsYXJhdGl2ZWx5LCB0aGlzIG1ldGhvZCBpcyB1c2VkIHRvIGV4dHJhY3QgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBET00uXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZvcm1FbGVtZW50IC0gVGhlIG1lc3NhZ2UgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEByZXR1cm5zIHtPYmplY3QuPHN0cmluZywgYW55Pn0gLSBUaGUgb3B0aW9uc1xuXHQgKi9cblx0c3RhdGljIGdldERhdGFBdHRyaWJ1dGVzKGZvcm1FbGVtZW50KSB7XG5cdFx0aWYgKCEoZm9ybUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoZm9ybUVsZW1lbnQuZGF0YXNldCkucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcblx0XHRcdC8vIElnbm9yZSBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1aWxkIGEgY29uY2lzZSBrZXkgYW5kIGdldCB0aGUgb3B0aW9uIHZhbHVlXG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKC9eb01lc3NhZ2UoXFx3KShcXHcrKSQvLCAobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTIpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBmb3JtRWxlbWVudC5kYXRhc2V0W2tleV07XG5cblx0XHRcdC8vIFRyeSBwYXJzaW5nIHRoZSB2YWx1ZSBhcyBKU09OLCBvdGhlcndpc2UganVzdCBzZXQgaXQgYXMgYSBzdHJpbmdcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gSlNPTi5wYXJzZSh2YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEV2ZW50IEhhbmRsZXJcblx0ICpcblx0ICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gVGhlIGV2ZW50IGVtaXR0ZWQgYnkgZWxlbWVudC93aW5kb3cgaW50ZXJhY3Rpb25zXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0aGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0XHRjb25zdCBSRVRVUk5fS0VZID0gMTM7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgfHwgZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nICYmIGV2ZW50LmtleSA9PT0gUkVUVVJOX0tFWSkge1xuXHRcdFx0aWYgKHRoaXMuZm9ybS5jaGVja1ZhbGlkaXR5KCkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHRoaXMudmFsaWRhdGVGb3JtSW5wdXRzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdzdWJtaXQnKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Y29uc3QgY2hlY2tlZEVsZW1lbnRzID0gdGhpcy52YWxpZGF0ZUZvcm1JbnB1dHMoKTtcblxuXHRcdFx0aWYgKGNoZWNrZWRFbGVtZW50cy5zb21lKGlucHV0ID0+IGlucHV0LnZhbGlkID09PSBmYWxzZSkpIHtcblx0XHRcdFx0aWYgKHRoaXMub3B0cy5lcnJvclN1bW1hcnkpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5zdW1tYXJ5KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBuZXdTdW1tYXJ5ID0gbmV3IEVycm9yU3VtbWFyeShjaGVja2VkRWxlbWVudHMsIHRoaXMub3B0cy5lcnJvclN1bW1hcnlNZXNzYWdlKTtcblx0XHRcdFx0XHRcdHRoaXMuZm9ybS5yZXBsYWNlQ2hpbGQobmV3U3VtbWFyeSwgdGhpcy5zdW1tYXJ5KTtcblx0XHRcdFx0XHRcdHRoaXMuc3VtbWFyeSA9IG5ld1N1bW1hcnk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuc3VtbWFyeSA9IHRoaXMuZm9ybS5pbnNlcnRCZWZvcmUobmV3IEVycm9yU3VtbWFyeShjaGVja2VkRWxlbWVudHMsIHRoaXMub3B0cy5lcnJvclN1bW1hcnlNZXNzYWdlKSwgdGhpcy5mb3JtLmZpcnN0RWxlbWVudENoaWxkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgZmlyc3RFcnJvckFuY2hvciA9IHRoaXMuc3VtbWFyeS5xdWVyeVNlbGVjdG9yKCdhJyk7XG5cdFx0XHRcdFx0aWYgKGZpcnN0RXJyb3JBbmNob3IpIHtcblx0XHRcdFx0XHRcdGZpcnN0RXJyb3JBbmNob3IuZm9jdXMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGV2ZW50LnRhcmdldC5zdWJtaXQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRm9ybSB2YWxpZGF0aW9uXG5cdCAqIFZhbGlkYXRlcyBldmVyeSBlbGVtZW50IGluIHRoZSBmb3JtIGFuZCBjcmVhdGVzIGlucHV0IG9iamVjdHMgZm9yIHRoZSBlcnJvclxuXHRzdW1tYXJ5XG5cdCAqXG5cdCAqIEByZXR1cm5zIHtBcnJheTxpbXBvcnQoXCIuL2Vycm9yLXN1bW1hcnkuanNcIikuRXJyb3JTdW1tYXJ5RWxlbWVudD59IC0gbGlzdCBvZiBlbGVtZW50cyBmb3IgdGhlIGVycm9yIHN1bW1hcnlcblx0ICovXG5cdHZhbGlkYXRlRm9ybUlucHV0cygpIHtcblx0XHRyZXR1cm4gdGhpcy5mb3JtSW5wdXRzLm1hcChvRm9ybUlucHV0ID0+IHtcblx0XHRcdGNvbnN0IHZhbGlkID0gb0Zvcm1JbnB1dC52YWxpZGF0ZSgpO1xuXHRcdFx0Y29uc3QgaW5wdXQgPSBvRm9ybUlucHV0LmlucHV0O1xuXHRcdFx0Y29uc3QgZmllbGQgPSBpbnB1dC5jbG9zZXN0KCcuby1mb3Jtcy1maWVsZCcpO1xuXHRcdFx0Y29uc3QgbGFiZWxFbGVtZW50ID0gZmllbGQgPyBmaWVsZC5xdWVyeVNlbGVjdG9yKCcuby1mb3Jtcy10aXRsZV9fbWFpbicpIDogbnVsbDtcblx0XHRcdC8vIGxhYmVsIGlzIGFjdHVhbGx5IHRoZSBmaWVsZCB0aXRsZSwgbm90IGZvciBleGFtcGxlIHRoZSBsYWJlbCBvZiBhIHNpbmdsZSBjaGVja2JveC5cblx0XHRcdC8vIHRoaXMgaXMgdXNlZCB0byBnZW5lcmF0ZSBhbiBlcnJvciBzdW1tYXJ5XG5cdFx0XHRjb25zdCBsYWJlbCA9IGxhYmVsRWxlbWVudCA/IGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA6IG51bGw7XG5cdFx0XHRjb25zdCBlcnJvckVsZW1lbnQgPSBmaWVsZCA/IGZpZWxkLnF1ZXJ5U2VsZWN0b3IoJy5vLWZvcm1zLWlucHV0X19lcnJvcicpIDogbnVsbDtcblx0XHRcdGNvbnN0IGVycm9yID0gZXJyb3JFbGVtZW50ID8gZXJyb3JFbGVtZW50LnRleHRDb250ZW50IDogaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpZDogaW5wdXQuaWQsXG5cdFx0XHRcdHZhbGlkLFxuXHRcdFx0XHRlcnJvcjogIXZhbGlkID8gZXJyb3IgOiBudWxsLFxuXHRcdFx0XHRsYWJlbCxcblx0XHRcdFx0ZmllbGQsXG5cdFx0XHRcdGVsZW1lbnQ6IGlucHV0XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIElucHV0IHN0YXRlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZV0gLSBuYW1lIG9mIHRoZSBpbnB1dCBmaWVsZHMgdG8gYWRkIHN0YXRlIHRvXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGVdIC0gdHlwZSBvZiBzdGF0ZSB0byBhcHBseSDigJQgb25lIG9mICdzYXZpbmcnLCAnc2F2ZWQnLCAnbm9uZSdcblx0ICogQHBhcmFtIHtib29sZWFufG9iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IG9mIG9wdGlvbnMgZGlzcGxheSBhbiBpY29uIG9ubHkgd2hlbiB0cnVlLCBoaWRpbmcgdGhlIHN0YXR1cyBsYWJlbFxuXHQgKi9cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIC0gbmFtZSBvZiB0aGUgaW5wdXQgZmllbGRzIHRvIGFkZCBzdGF0ZSB0b1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHR5cGUgb2Ygc3RhdGUgdG8gYXBwbHkg4oCUIG9uZSBvZiAnc2F2aW5nJywgJ3NhdmVkJywgJ25vbmUnXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gYW4gb2JqZWN0IG9mIG9wdGlvbnNcblx0ICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaWNvbkxhYmVsIFtudWxsXSAtIGN1c3RvbWlzZSB0aGUgbGFiZWwgb2YgdGhlIHN0YXRlLCBlLmcuIHRoZSBzYXZlZCBzdGF0ZSBkZWZhdWx0cyB0byBcIlNhdmluZ1wiIGJ1dCBjb3VsZCBiZSBcIlNlbnRcIlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaWNvbk9ubHkgW2ZhbHNlXSAtIHdoZW4gdHJ1ZSBkaXNwbGF5IGFuIGljb24gb25seSwgaGlkaW5nIHRoZSBzdGF0dXMgbGFiZWxcblx0ICovXG5cdHNldFN0YXRlKHN0YXRlLCBuYW1lLCBvcHRpb25zID0geyBpY29uTGFiZWw6IG51bGwsIGljb25Pbmx5OiBmYWxzZSB9KSB7XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyB8fCBvcHRpb25zID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVGhlIGBvcHRpb25zYCBhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuXHRcdH1cblxuXHRcdGxldCBvYmplY3QgPSB0aGlzLnN0YXRlRWxlbWVudHMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG5cdFx0aWYgKCFvYmplY3QpIHtcblx0XHRcdG9iamVjdCA9IHtcblx0XHRcdFx0bmFtZSxcblx0XHRcdFx0ZWxlbWVudDogbmV3IFN0YXRlKHRoaXMuZm9ybS5lbGVtZW50c1tuYW1lXSwgb3B0aW9ucylcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuc3RhdGVFbGVtZW50cy5wdXNoKG9iamVjdCk7XG5cdFx0fVxuXHRcdG9iamVjdC5lbGVtZW50LnNldChzdGF0ZSwgb3B0aW9ucy5pY29uTGFiZWwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlc3Ryb3kgZm9ybSBpbnN0YW5jZVxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHRpZiAoIXRoaXMub3B0cy51c2VCcm93c2VyVmFsaWRhdGlvbikge1xuXHRcdFx0dGhpcy5mb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN1Ym1pdHMuZm9yRWFjaChzdWJtaXQgPT4ge1xuXHRcdFx0XHRzdWJtaXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblx0XHRcdFx0c3VibWl0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLmZvcm0gPSBudWxsO1xuXHRcdHRoaXMuX2Zvcm1JbnB1dHNDYWNoZS5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmRlc3Ryb3koKSk7XG5cdFx0dGhpcy5fZm9ybUlucHV0c0NhY2hlID0gW107XG5cdFx0dGhpcy5zdGF0ZUVsZW1lbnRzID0gbnVsbDtcblx0XHR0aGlzLm9wdHMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgZm9ybSBjb21wb25lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50IHwgc3RyaW5nKX0gcm9vdEVsIC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbnRpYWxpc2UgYSBmb3JtIGluLCBvciBhIENTUyBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudFxuXHQgKiBAcGFyYW0ge29iamVjdH0gW29wdHM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBiYW5uZXJzXG5cdCAqIEByZXR1cm5zIHtGb3JtcyB8IEZvcm1zW119IC0gVGhlIG5ld2x5IGluc3RhbnRpYXRlZCBGb3JtIG9yIEZvcm1zXG5cdCAqL1xuXHRzdGF0aWMgaW5pdChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gbmV3IEZvcm1zKHJvb3RFbCwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1mb3Jtc1wiXScpLCByb290RWwgPT4gbmV3IEZvcm1zKHJvb3RFbCwgb3B0cykpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1zO1xuIiwiaW1wb3J0IG9Gb3JtcyBmcm9tICcuL3NyYy9qcy9mb3Jtcy5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRvRm9ybXMuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb0Zvcm1zO1xuIiwiaW1wb3J0IE11bHRpU2VsZWN0IGZyb20gJy4uLy4uL3NyYy9qcy9tdWx0aS1zZWxlY3QuanMnO1xuaW1wb3J0IG9Gb3JtcyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tZm9ybXMnO1xub0Zvcm1zLmluaXQoKTtcblxuY29uc3QgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuXHRNdWx0aVNlbGVjdC5pbml0KG51bGwsIHtcblx0XHRtdWx0aVNlbGVjdE9wdGlvbnM6IFtcblx0XHRcdCdBcHBsZScsXG5cdFx0XHQnQmFuYW5hJyxcblx0XHRcdCdCbHVlYmVycnknLFxuXHRcdFx0J0JveXNlbmJlcnJ5Jyxcblx0XHRcdCdDaGVycnknLFxuXHRcdFx0J0R1cmlhbicsXG5cdFx0XHQnRWdncGxhbnQnLFxuXHRcdFx0J0ZpZycsXG5cdFx0XHQnR3JhcGUnLFxuXHRcdFx0J0d1YXZhJyxcblx0XHRcdCdIdWNrbGViZXJyeScsXG5cdFx0XSxcblx0fSk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG59KTtcbiJdfQ==