function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  // src/js/utils.js
  function toggleDropdown(open) {
    if (typeof open === "boolean") {
      this.open = open;
      this.listboxEl.style.display = open ? "block" : "none";
    } else if (!this.open) {
      this.listboxEl.style.display = "block";
      this.open = true;
    } else {
      this.listboxEl.style.display = "none";
      this.open = false;
    }

    this.comboEl.setAttribute("aria-expanded", "".concat(this.open));

    this._updateState();
  }

  function onComboBoxKeyDown(event) {
    var key = event.key;
    var numberOfOptions = this.totalNumberOfOptions;

    if (!this.open) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        this.updateCurrentElement();
        return this.toggleDropdown();
      }
    }

    if (key === "ArrowUp") {
      if (this.activeIndex !== 0) {
        this.activeIndex--;
      }
    } else if (key === "ArrowDown") {
      if (this.activeIndex !== numberOfOptions - 1) {
        this.activeIndex++;
      }
    } else if (key === "PageDown") {
      if (this.activeIndex + 10 > numberOfOptions) {
        this.activeIndex = numberOfOptions - 1;
      } else {
        this.activeIndex += 10;
      }
    } else if (key === "PageUp") {
      if (this.activeIndex - 10 < 0) {
        this.activeIndex = 0;
      } else {
        this.activeIndex -= 10;
      }
    } else if (key === "Home") {
      this.activeIndex = 0;
    } else if (key === "End") {
      this.activeIndex = numberOfOptions - 1;
    }

    if (key === "Escape" && this.open) {
      this.toggleDropdown();
      this.comboEl.focus();
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      addOptionToList.call(this);
    }

    this.updateCurrentElement();
  }

  function addOptionToList() {
    var optionEl = this.multiSelectEl.querySelector("#".concat(this.idBase, "-").concat(this.activeIndex));
    var option = this.options.multiSelectOptions[this.activeIndex];
    this.handleOptionSelect(optionEl, option, this.activeIndex);
  }

  function updateCurrentElement() {
    this.comboEl.setAttribute("aria-activedescendant", "".concat(this.idBase, "-").concat(this.activeIndex));

    var options = _removeCurrentClass(this.multiSelectEl);

    options[this.activeIndex].classList.add("o-multi-select-option__current");
  }

  function _removeCurrentClass(element) {
    var options = element.querySelectorAll("[role=option]");

    _toConsumableArray(options).forEach(function (optionEl) {
      optionEl.classList.remove("o-multi-select-option__current");
    });

    return options;
  } // src/js/state.js


  function updateState() {
    if (this.numberOfSelectedOptions) {
      this.comboBoxText.innerText = "";
      this.selectedOptions.style.display = "block";
      var comboElWidth = this.comboEl.offsetWidth;
      var sumOfChildrenWidth = calculateSumOfChildrenWidth(this.selectedOptions);

      if (sumOfChildrenWidth > comboElWidth * 0.9) {
        this.selectedOptions.classList.add("o-multi-select__visually-hidden");
        this.comboBoxText.innerText = this.numberOfSelectedOptions + " options selected";
      } else {
        this.selectedOptions.classList.remove("o-multi-select__visually-hidden");
      }
    } else {
      this.selectedOptions.style.display = "none";

      if (this.open) {
        this.comboBoxText.innerText = "Select options below";
      } else {
        this.comboBoxText.innerText = "Click to select options";
      }
    }
  }

  function calculateSumOfChildrenWidth(parentElement) {
    var selectedOptionsComputedStyles = getComputedStyle(parentElement);
    var paddingLeft = selectedOptionsComputedStyles.paddingLeft,
        paddingRight = selectedOptionsComputedStyles.paddingRight;
    var sumOfChildrenWidthInitialValue = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);

    var sumOfChildrenWidth = _toConsumableArray(parentElement.children).map(function (el) {
      return el.offsetWidth;
    }).reduce(function (prev, curr) {
      return prev + curr;
    }, sumOfChildrenWidthInitialValue);

    return sumOfChildrenWidth;
  } // src/js/multi-select-options.js


  function handleOptionSelect(optionEl, option, index) {
    if (optionEl.classList.contains("o-multi-select-option__selected")) {
      removeOption.call(this, optionEl, option, index);
    } else {
      addOption.call(this, optionEl, option, index);
    }

    this.activeIndex = index;
    this.updateCurrentElement();
  }

  function removeOption(optionEl, option, index) {
    optionEl.classList.remove("o-multi-select-option__selected");
    optionEl.setAttribute("aria-selected", "false");
    this.numberOfSelectedOptions--;
    var button = this.selectedOptions.querySelector("#".concat(option, "-").concat(index));
    button.parentElement.remove();

    this._updateState();
  }

  function addOption(optionEl, option, index) {
    var _this = this;

    this.numberOfSelectedOptions++;
    optionEl.classList.add("o-multi-select-option__selected");
    optionEl.setAttribute("aria-selected", "true");

    var _createOptionButton = createOptionButton(option, index),
        li = _createOptionButton.li,
        button = _createOptionButton.button;

    this.selectedOptions.appendChild(li);

    this._updateState();

    button.addEventListener("click", function () {
      li.remove();
      optionEl.classList.remove("o-multi-select-option__selected");
      _this.numberOfSelectedOptions--;

      _this._updateState();
    });
  }

  function createOptionButton(option, index) {
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.id = "".concat(option, "-").concat(index);
    button.setAttribute("aria-label", " remove ".concat(option, " "));
    button.className = "o-multi-select__selected-options-button";
    button.type = "button";
    button.innerText = option;
    var span = document.createElement("span");
    span.classList = "o-icons-icon o-icons-icon--cross";
    button.appendChild(span);
    li.appendChild(button);
    return {
      li: li,
      button: button
    };
  }

  function createOption(idBase, option, index) {
    var optionEl = document.createElement("div");
    optionEl.setAttribute("role", "option");
    optionEl.id = "".concat(idBase, "-").concat(index);
    optionEl.className = "o-multi-select-option";
    optionEl.setAttribute("aria-selected", "false");
    optionEl.innerText = option;
    var tickSpan = document.createElement("span");
    tickSpan.className = "o-multi-select-option-tick";
    optionEl.appendChild(tickSpan);
    return optionEl;
  } // ../../libraries/o-utils/main.js


  var uidBuilder = function uidBuilder(componentName) {
    return function (prefix) {
      var uid = String(Math.random()).split(".")[1];
      return "".concat(componentName, "-").concat(prefix).concat(uid);
    };
  }; // src/js/multi-select.js


  var uniqueId = uidBuilder("o-multi-select");

  var MultiSelect = /*#__PURE__*/function () {
    "use strict";

    function MultiSelect(multiSelectEl, options) {
      var _this2 = this;

      _classCallCheck(this, MultiSelect);

      this.multiSelectEl = multiSelectEl;
      this.coreWrapper = this._getCoreWrapper();
      this.options = Object.assign({}, options, {
        multiSelectOptions: this._getCoreOptions()
      });

      this._clearCore();

      if (!this.options.multiSelectOptions.length > 0) {
        throw new Error("The multi select component requires option elements to be defined in the <select> tag.");
      }

      this.comboEl = multiSelectEl.querySelector("[role=combobox]");
      this.comboBoxText = multiSelectEl.querySelector(".o-multi-select__combobox-text");
      this.listboxEl = multiSelectEl.querySelector("[role=listbox]");
      this.selectedOptions = multiSelectEl.querySelector(".o-multi-select__selected-options");
      this.idBase = this.comboEl.id;
      this.totalNumberOfOptions = this.options.multiSelectOptions.length;
      this.numberOfSelectedOptions = 0;
      this.activeIndex = 0;
      this.open = false;
      this.options.multiSelectOptions.forEach(function (option, index) {
        var optionEl = createOption(_this2.idBase, option, index);
        optionEl.addEventListener("click", function () {
          _this2.handleOptionSelect(optionEl, option, index);

          optionEl.classList.remove("o-multi-select-option__current");
        });

        _this2.listboxEl.appendChild(optionEl);
      });

      this._bindHelperFunctionsAndEventListeners();
    }

    _createClass(MultiSelect, [{
      key: "_bindHelperFunctionsAndEventListeners",
      value: function _bindHelperFunctionsAndEventListeners() {
        var _this3 = this;

        this.toggleDropdown = toggleDropdown.bind(this);
        this.handleOptionSelect = handleOptionSelect.bind(this);
        this.updateCurrentElement = updateCurrentElement.bind(this);
        this._updateState = updateState.bind(this);
        this.comboEl.addEventListener("click", function () {
          _this3.toggleDropdown();

          if (_this3.open) {
            _removeCurrentClass(_this3.multiSelectEl);
          }
        });
        this.comboEl.addEventListener("keydown", onComboBoxKeyDown.bind(this));
        this.comboEl.addEventListener("blur", function () {
          requestAnimationFrame(function () {
            if (!_this3.listboxEl.contains(document.activeElement)) {
              _this3.toggleDropdown(false);
            }
          });
        });
        this.listboxEl.addEventListener("blur", function () {
          requestAnimationFrame(function () {
            if (_this3.comboEl !== document.activeElement) {
              _this3.toggleDropdown(false);
            }
          });
        });
        window.addEventListener("resize", function () {
          _this3._updateState();
        });
      }
    }, {
      key: "_clearCore",
      value: function _clearCore() {
        var selectName = this.coreWrapper.attributes.getNamedItem("name").value;
        var selectId = this.coreWrapper.attributes.getNamedItem("id").value;

        if (!selectName || !selectId) {
          throw new Error("Select element must have attributes name and id defined.");
        }

        var labelId = uniqueId("selected");

        var labels = _toConsumableArray(this.coreWrapper.labels).map(function (label) {
          return label.id;
        }).join(" ");

        this.multiSelectEl.insertAdjacentHTML("beforeend", "<div class=\"o-multi-select__enhanced\">\n    <ul\n            class=\"o-multi-select__selected-options\"\n            id=".concat(labelId, "\n    ></ul>\n    <div class=\"o-multi-select__combobox-wrapper\">\n        <div\n                class=\"o-multi-select__combobox\"\n                id=\"").concat(selectId, "\"\n                name=").concat(selectName, "\n                role=\"combobox\"\n                aria-activedescendant=\"\"\n                aria-labelledby=\"").concat(labels, " ").concat(labelId, "\"\n                aria-haspopup=\"listbox\"\n                aria-expanded=\"false\"\n                aria-owns=\"o-multi-select-listbox\"\n                tabindex=\"0\"\n        >\n            <span class=\"o-multi-select__combobox-text\"> Click to select options </span>\n        </div>\n    </div>\n    <div\n            class=\"o-multi-select__dropdown-menu\"\n            id=\"o-multi-select-listbox\"\n            role=\"listbox\"\n            aria-label=\"multi select options\"\n            aria-multiselectable=\"true\"\n            tabindex=\"-1\"\n    ></div>\n</div>\n"));
        this.coreWrapper.remove();
      }
    }, {
      key: "_getCoreWrapper",
      value: function _getCoreWrapper() {
        var coreWrapper = this.multiSelectEl.querySelectorAll("select");

        if (coreWrapper.length > 1) {
          throw new Error("Only one select element must be provided for o-multi-select");
        }

        if (coreWrapper.length === 0) {
          throw new Error("A select element must be provided in o-multi-select");
        }

        return coreWrapper[0];
      }
    }, {
      key: "_getCoreOptions",
      value: function _getCoreOptions() {
        var options = this.coreWrapper.querySelectorAll("option");
        return _toConsumableArray(options).map(function (option) {
          return option.getAttribute("value");
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.multiSelectEl) {
          this.multiSelectEl.remove();
          window.removeEventListener("resize", this._updateState);
        }
      }
    }], [{
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
      var _this4 = this;

      _classCallCheck(this, Forms);

      if (!formElement || formElement.nodeName !== "FORM") {
        throw new Error("[data-o-component=\"o-forms\"] must be set on a form element. It is currently set on a '".concat(formElement.nodeName.toLowerCase(), "'."));
      }

      this.form = formElement;
      this._formInputsCache = Array.from(this.form.elements, function (element) {
        return new input_default(element);
      });
      this.stateElements = [];
      this.opts = Object.assign({
        useBrowserValidation: false,
        preventSubmit: false,
        errorSummary: true
      }, options || Forms.getDataAttributes(formElement));

      if (this.opts.useBrowserValidation && this.opts.preventSubmit) {
        throw new Error("The o-forms `preventSubmit` option only applies when the `useBrowserValidation` option is `false`.");
      }

      if (!this.opts.useBrowserValidation) {
        this.form.setAttribute("novalidate", "");
        this.form.addEventListener("submit", this);
        this.form.addEventListener("oForms.submit", function (e) {
          if (e.detail.valid && !_this4.opts.preventSubmit) {
            _this4.form.submit();
          }
        });
      } else {
        this.form.removeAttribute("novalidate");
        this.submits = this.form.querySelectorAll("[type=submit]");
        this.submits.forEach(function (submit) {
          submit.addEventListener("click", _this4);
          submit.addEventListener("keydown", _this4);
        });
      }
    }

    _createClass(Forms, [{
      key: "formInputs",
      get: function get() {
        var _this5 = this;

        if (!this.form) {
          return [];
        }

        var formElements = Array.from(this.form.elements);

        var inputsToRemove = this._formInputsCache.filter(function (input) {
          return !formElements.includes(input.input);
        });

        var elementsToAdd = formElements.filter(function (element) {
          return !_this5._formInputsCache.find(function (input) {
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
          var formInvalid = checkedElements.some(function (input) {
            return input.valid === false;
          });

          if (formInvalid) {
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
          }

          var oFormsSubmitEvent = new CustomEvent("oForms.submit", {
            detail: {
              instance: this,
              valid: !formInvalid
            },
            cancelable: true,
            bubbles: true
          });
          this.form.dispatchEvent(oFormsSubmitEvent);
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
        var _this6 = this;

        if (!this.opts.useBrowserValidation) {
          this.form.removeEventListener("submit", this);
        } else {
          this.submits.forEach(function (submit) {
            submit.removeEventListener("click", _this6);
            submit.removeEventListener("keydown", _this6);
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
    multi_select_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll2);
  };

  if (typeof document !== "undefined") {
    document.addEventListener("o.DOMContentLoaded", constructAll2);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy91dGlscy5qcyIsInNyYy9qcy9zdGF0ZS5qcyIsInNyYy9qcy9tdWx0aS1zZWxlY3Qtb3B0aW9ucy5qcyIsIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCJzcmMvanMvbXVsdGktc2VsZWN0LmpzIiwiLi4vby1mb3Jtcy9zcmMvanMvaW5wdXQuanMiLCIuLi9vLWZvcm1zL3NyYy9qcy9zdGF0ZS5qcyIsIi4uL28tZm9ybXMvc3JjL2pzL2Vycm9yLXN1bW1hcnkuanMiLCIuLi9vLWZvcm1zL3NyYy9qcy9mb3Jtcy5qcyIsIi4uL28tZm9ybXMvbWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTTyxXQUFBLGNBQUEsQ0FBd0IsSUFBeEIsRUFBOEI7QUFDcEMsUUFBSSxPQUFPLElBQVAsS0FBZ0IsU0FBcEIsRUFBK0I7QUFDOUIsV0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLFdBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUIsT0FBckIsR0FBK0IsSUFBQSxHQUFPLE9BQVAsR0FBaUIsTUFBaEQ7QUFBZ0QsS0FGakQsTUFFaUQsSUFDdEMsQ0FBQyxLQUFLLElBRGdDLEVBQzFCO0FBQ3RCLFdBQUssU0FBTCxDQUFlLEtBQWYsQ0FBcUIsT0FBckIsR0FBK0IsT0FBL0I7QUFDQSxXQUFLLElBQUwsR0FBWSxJQUFaO0FBQVksS0FIb0MsTUFJMUM7QUFDTixXQUFLLFNBQUwsQ0FBZSxLQUFmLENBQXFCLE9BQXJCLEdBQStCLE1BQS9CO0FBQ0EsV0FBSyxJQUFMLEdBQVksS0FBWjtBQUFZOztBQUViLFNBQUssT0FBTCxDQUFhLFlBQWIsQ0FBMEIsZUFBMUIsWUFBOEMsS0FBSyxJQUFuRDs7QUFDQSxTQUFLLFlBQUw7QUFBSzs7QUFlQyxXQUFBLGlCQUFBLENBQTJCLEtBQTNCLEVBQWtDO0FBQ3hDLFFBQU8sR0FBUCxHQUFjLEtBQWQsQ0FBTyxHQUFQO0FBQ0Es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QixJQUFsQixDQUFWO0FBQUEsU0FBcEUsQ0FBUDtBQUF1RztBQW5Rekc7O0FBQUE7QUFBQSxLQUFBOztBQXVRQSxNQUFPLGFBQUEsR0FBUSxLQUFmLEM7O0FDelFBLE1BQU0sWUFBQSxHQUFlLFNBQWYsWUFBZSxHQUFXO0FBQy9CLElBQUEsYUFBQSxDQUFPLElBQVA7QUFDQSxJQUFBLFFBQUEsQ0FBUyxtQkFBVCxDQUE2QixvQkFBN0IsRUFBbUQsWUFBbkQ7QUFBbUQsR0FGcEQ7O0FBS0EsTUFBSSxPQUFPLFFBQVAsS0FBb0IsV0FBeEIsRUFBcUM7QUFDcEMsSUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELFlBQWhEO0FBQWdEOztBQUdqRCxNQUFPLFlBQUEsR0FBUSxhQUFmLEM7O0FDVEEsRUFBQSxZQUFBLENBQU8sSUFBUDs7QUFFQSxNQUFNLGFBQUEsR0FBZSxTQUFmLGFBQWUsR0FBTTtBQUMxQixJQUFBLG9CQUFBLENBQVksSUFBWjtBQUNBLElBQUEsUUFBQSxDQUFTLG1CQUFULENBQTZCLG9CQUE3QixFQUFtRCxhQUFuRDtBQUFtRCxHQUZwRDs7QUFLQSxNQUFJLE9BQU8sUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNwQyxJQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsRUFBZ0QsYUFBaEQ7QUFBZ0Q7O0FBR2pELEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELElBQUEsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsSUFBSSxXQUFKLENBQWdCLG9CQUFoQixDQUF2QjtBQUF1QyxHQUR4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSGFuZGxlcyBvcGVuaW5nIGFuZCBjbG9zaW5nIHRoZSBkcm9wZG93biBtZW51IGZvciB0aGUgbXVsdGktc2VsZWN0IGNvbXBvbmVudC5cbiAqIFdoZW4gdGhlIG1lbnUgaXMgb3BlbmVkLCBpdCBzZXRzIHRoZSBkaXNwbGF5IHByb3BlcnR5IG9mIHRoZSBsaXN0Ym94IGVsZW1lbnQgdG8gJ2Jsb2NrJy5cbiAqIFdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkLCBpdCBzZXRzIHRoZSBkaXNwbGF5IHByb3BlcnR5IG9mIHRoZSBsaXN0Ym94IGVsZW1lbnQgdG8gJ25vbmUnLlxuICogSXQgYWxzbyB1cGRhdGVzIHRoZSAnYXJpYS1leHBhbmRlZCcgYXR0cmlidXRlIG9mIHRoZSBjb21ibyBib3ggZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcGVuXSAtIElmIHBhc3NlZCwgaXQgd2lsbCBmb3JjZSB0aGUgbWVudSB0byBvcGVuIG9yIGNsb3NlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bihvcGVuKSB7XG5cdGlmICh0eXBlb2Ygb3BlbiA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhpcy5vcGVuID0gb3Blbjtcblx0XHR0aGlzLmxpc3Rib3hFbC5zdHlsZS5kaXNwbGF5ID0gb3BlbiA/ICdibG9jaycgOiAnbm9uZSc7XG5cdH0gZWxzZSBpZiAoIXRoaXMub3Blbikge1xuXHRcdHRoaXMubGlzdGJveEVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdHRoaXMub3BlbiA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5saXN0Ym94RWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHR0aGlzLm9wZW4gPSBmYWxzZTtcblx0fVxuXHR0aGlzLmNvbWJvRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgYCR7dGhpcy5vcGVufWApO1xuXHR0aGlzLl91cGRhdGVTdGF0ZSgpO1xufVxuXG4vKipcbiAqIEhhbmRsZXMgdGhlICdrZXlkb3duJyBldmVudCBmb3IgdGhlIGNvbWJvYm94IGVsZW1lbnQgb2YgdGhlIG11bHRpLXNlbGVjdCBjb21wb25lbnQuXG4gKiBJZiB0aGUgY29tcG9uZW50IGlzIGNsb3NlZCwgaXQgaGFuZGxlcyBvcGVuaW5nIHRoZSBtZW51IGlmIHRoZSBrZXkgcHJlc3NlZCBpcyAnQXJyb3dEb3duJywgJ0Fycm93VXAnLCAnRW50ZXInLCBvciAnICcuXG4gKiBJZiB0aGUgY29tcG9uZW50IGlzIG9wZW4gYW5kICdBbHQnIGFuZCAnQXJyb3dVcCcga2V5cyBhcmUgcHJlc3NlZCwgaXQgY2FsbHMgJ2FkZE9wdGlvblRvTGlzdCcgYW5kIHRoZW4gb3BlbnMgdGhlIG1lbnUuXG4gKiBJZiBhbnkgb3RoZXIga2V5IGlzIHByZXNzZWQsIGl0IHVwZGF0ZXMgdGhlIGFjdGl2ZSBpbmRleCBvZiB0aGUgbGlzdGJveCBvcHRpb25zIGJhc2VkIG9uIHRoZSBrZXkgcHJlc3NlZC5cbiAqIElmIHRoZSBrZXkgcHJlc3NlZCBpcyAnRXNjYXBlJywgaXQgY2xvc2VzIHRoZSBtZW51LlxuICogSWYgdGhlIGtleSBwcmVzc2VkIGlzICdFbnRlcicgb3IgJyAnLCBpdCBjYWxscyAnYWRkT3B0aW9uVG9MaXN0Jy5cbiAqIEZpbmFsbHksIGl0IGNhbGxzICd1cGRhdGVDdXJyZW50RWxlbWVudCcgdG8gdXBkYXRlIHRoZSBhY3RpdmUgZGVzY2VuZGFudCBhbmQgY3VycmVudCBsaXN0Ym94IG9wdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gVGhlIGtleWJvYXJkIGV2ZW50LlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbkNvbWJvQm94S2V5RG93bihldmVudCkge1xuXHRjb25zdCB7a2V5fSA9IGV2ZW50O1xuXHRjb25zdCBudW1iZXJPZk9wdGlvbnMgPSB0aGlzLnRvdGFsTnVtYmVyT2ZPcHRpb25zO1xuXG5cdC8vIGhhbmRsZSBvcGVuaW5nIHdoZW4gY2xvc2VkXG5cdGlmICghdGhpcy5vcGVuKSB7XG5cdFx0aWYgKFxuXHRcdFx0a2V5ID09PSAnQXJyb3dEb3duJyB8fFxuXHRcdFx0a2V5ID09PSAnQXJyb3dVcCcgfHxcblx0XHRcdGtleSA9PT0gJ0VudGVyJyB8fFxuXHRcdFx0a2V5ID09PSAnICdcblx0XHQpIHtcblx0XHRcdHRoaXMudXBkYXRlQ3VycmVudEVsZW1lbnQoKTtcblx0XHRcdHJldHVybiB0aGlzLnRvZ2dsZURyb3Bkb3duKCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGtleSA9PT0gJ0Fycm93VXAnKSB7XG5cdFx0aWYgKHRoaXMuYWN0aXZlSW5kZXggIT09IDApIHtcblx0XHRcdHRoaXMuYWN0aXZlSW5kZXgtLTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoa2V5ID09PSAnQXJyb3dEb3duJykge1xuXHRcdGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSBudW1iZXJPZk9wdGlvbnMgLSAxKSB7XG5cdFx0XHR0aGlzLmFjdGl2ZUluZGV4Kys7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGtleSA9PT0gJ1BhZ2VEb3duJykge1xuXHRcdGlmICh0aGlzLmFjdGl2ZUluZGV4ICsgMTAgPiBudW1iZXJPZk9wdGlvbnMpIHtcblx0XHRcdHRoaXMuYWN0aXZlSW5kZXggPSBudW1iZXJPZk9wdGlvbnMgLSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmFjdGl2ZUluZGV4ICs9IDEwO1xuXHRcdH1cblx0fSBlbHNlIGlmIChrZXkgPT09ICdQYWdlVXAnKSB7XG5cdFx0aWYgKHRoaXMuYWN0aXZlSW5kZXggLSAxMCA8IDApIHtcblx0XHRcdHRoaXMuYWN0aXZlSW5kZXggPSAwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmFjdGl2ZUluZGV4IC09IDEwO1xuXHRcdH1cblx0fSBlbHNlIGlmIChrZXkgPT09ICdIb21lJykge1xuXHRcdHRoaXMuYWN0aXZlSW5kZXggPSAwO1xuXHR9IGVsc2UgaWYgKGtleSA9PT0gJ0VuZCcpIHtcblx0XHR0aGlzLmFjdGl2ZUluZGV4ID0gbnVtYmVyT2ZPcHRpb25zIC0gMTtcblx0fVxuXG5cdGlmIChrZXkgPT09ICdFc2NhcGUnICYmIHRoaXMub3Blbikge1xuXHRcdHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcblx0XHR0aGlzLmNvbWJvRWwuZm9jdXMoKTtcblx0fSBlbHNlIGlmIChrZXkgPT09ICdFbnRlcicgfHwga2V5ID09PSAnICcpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGFkZE9wdGlvblRvTGlzdC5jYWxsKHRoaXMpO1xuXHR9XG5cdHRoaXMudXBkYXRlQ3VycmVudEVsZW1lbnQoKTtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbGlzdGJveCBvcHRpb24gdG8gdGhlIHNlbGVjdGVkIGl0ZW1zIGxpc3Qgb2YgdGhlIG11bHRpLXNlbGVjdCBjb21wb25lbnQuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvblRvTGlzdCgpIHtcblx0Y29uc3Qgb3B0aW9uRWwgPSB0aGlzLm11bHRpU2VsZWN0RWwucXVlcnlTZWxlY3Rvcihcblx0XHRgIyR7dGhpcy5pZEJhc2V9LSR7dGhpcy5hY3RpdmVJbmRleH1gXG5cdCk7XG5cdGNvbnN0IG9wdGlvbiA9IHRoaXMub3B0aW9ucy5tdWx0aVNlbGVjdE9wdGlvbnNbdGhpcy5hY3RpdmVJbmRleF07XG5cdHRoaXMuaGFuZGxlT3B0aW9uU2VsZWN0KG9wdGlvbkVsLCBvcHRpb24sIHRoaXMuYWN0aXZlSW5kZXgpO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGN1cnJlbnRseSBhY3RpdmUgZGVzY2VuZGFudCBhbmQgY3VycmVudCBsaXN0Ym94IG9wdGlvbiBvZiB0aGUgbXVsdGktc2VsZWN0IGNvbXBvbmVudC5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUN1cnJlbnRFbGVtZW50KCkge1xuXHR0aGlzLmNvbWJvRWwuc2V0QXR0cmlidXRlKFxuXHRcdCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLFxuXHRcdGAke3RoaXMuaWRCYXNlfS0ke3RoaXMuYWN0aXZlSW5kZXh9YFxuXHQpO1xuXG5cdGNvbnN0IG9wdGlvbnMgPSBfcmVtb3ZlQ3VycmVudENsYXNzKHRoaXMubXVsdGlTZWxlY3RFbCk7XG5cdG9wdGlvbnNbdGhpcy5hY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19jdXJyZW50Jyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fY3VycmVudCcgY2xhc3MgZnJvbSBhbGwgbGlzdGJveCBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgbXVsdGktc2VsZWN0IGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnRbXX0gLSBUaGUgbGlzdGJveCBvcHRpb25zLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlQ3VycmVudENsYXNzKGVsZW1lbnQpIHtcblx0Y29uc3Qgb3B0aW9ucyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9b3B0aW9uXScpO1xuXHRbLi4ub3B0aW9uc10uZm9yRWFjaChvcHRpb25FbCA9PiB7XG5cdFx0b3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZSgnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19jdXJyZW50Jyk7XG5cdH0pO1xuXHRyZXR1cm4gb3B0aW9ucztcbn1cbiIsIi8qKlxuICogVXBkYXRlcyB0aGUgc3RhdGUgb2YgdGhlIG11bHRpLXNlbGVjdCBjb21wb25lbnQgYmFzZWQgb24gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIHNlbGVjdGVkIG9wdGlvbnMuXG4gKiBVcGRhdGVzIHRoZSB0ZXh0IG9mIHRoZSBjb21ib0JveFRleHQgZWxlbWVudCBhbmQgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHNlbGVjdGVkT3B0aW9ucyBlbGVtZW50LlxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgdXBkYXRlU3RhdGVcbiAqIEBtZW1iZXJvZiBtb2R1bGU6bXVsdGlTZWxlY3RcbiAqIEBpbnN0YW5jZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTdGF0ZSgpIHtcblx0aWYgKHRoaXMubnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMpIHtcblx0XHR0aGlzLmNvbWJvQm94VGV4dC5pbm5lclRleHQgPSAnJztcblx0XHR0aGlzLnNlbGVjdGVkT3B0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRjb25zdCBjb21ib0VsV2lkdGggPSB0aGlzLmNvbWJvRWwub2Zmc2V0V2lkdGg7XG5cdFx0Y29uc3Qgc3VtT2ZDaGlsZHJlbldpZHRoID0gY2FsY3VsYXRlU3VtT2ZDaGlsZHJlbldpZHRoKFxuXHRcdFx0dGhpcy5zZWxlY3RlZE9wdGlvbnNcblx0XHQpO1xuXHRcdGlmIChzdW1PZkNoaWxkcmVuV2lkdGggPiBjb21ib0VsV2lkdGggKiAwLjkpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRPcHRpb25zLmNsYXNzTGlzdC5hZGQoJ28tbXVsdGktc2VsZWN0X192aXN1YWxseS1oaWRkZW4nKTtcblx0XHRcdHRoaXMuY29tYm9Cb3hUZXh0LmlubmVyVGV4dCA9XG5cdFx0XHRcdHRoaXMubnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMgKyAnIG9wdGlvbnMgc2VsZWN0ZWQnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkT3B0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKCdvLW11bHRpLXNlbGVjdF9fdmlzdWFsbHktaGlkZGVuJyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHRoaXMuc2VsZWN0ZWRPcHRpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0aWYgKHRoaXMub3Blbikge1xuXHRcdFx0dGhpcy5jb21ib0JveFRleHQuaW5uZXJUZXh0ID0gJ1NlbGVjdCBvcHRpb25zIGJlbG93Jztcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb21ib0JveFRleHQuaW5uZXJUZXh0ID0gJ0NsaWNrIHRvIHNlbGVjdCBvcHRpb25zJztcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlU3VtT2ZDaGlsZHJlbldpZHRoKHBhcmVudEVsZW1lbnQpIHtcblx0Y29uc3Qgc2VsZWN0ZWRPcHRpb25zQ29tcHV0ZWRTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHBhcmVudEVsZW1lbnQpO1xuXHRjb25zdCB7cGFkZGluZ0xlZnQsIHBhZGRpbmdSaWdodH0gPSBzZWxlY3RlZE9wdGlvbnNDb21wdXRlZFN0eWxlcztcblx0Y29uc3Qgc3VtT2ZDaGlsZHJlbldpZHRoSW5pdGlhbFZhbHVlID1cblx0XHRwYXJzZUludChwYWRkaW5nTGVmdCwgMTApICsgcGFyc2VJbnQocGFkZGluZ1JpZ2h0LCAxMCk7XG5cdGNvbnN0IHN1bU9mQ2hpbGRyZW5XaWR0aCA9IFsuLi5wYXJlbnRFbGVtZW50LmNoaWxkcmVuXVxuXHRcdC5tYXAoZWwgPT4gZWwub2Zmc2V0V2lkdGgpXG5cdFx0LnJlZHVjZSgocHJldiwgY3VycikgPT4gcHJldiArIGN1cnIsIHN1bU9mQ2hpbGRyZW5XaWR0aEluaXRpYWxWYWx1ZSk7XG5cdHJldHVybiBzdW1PZkNoaWxkcmVuV2lkdGg7XG59XG4iLCIvKipcbiAqIGFkZHMgb3IgcmVtb3ZlcyB0aGUgc2VsZWN0aW9uIG9mIGEgbXVsdGktc2VsZWN0IG9wdGlvbiBpbiBzZWxlY3RlZCBsaXN0LlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbkVsIC0gVGhlIG9wdGlvbiBlbGVtZW50IHRoYXQgd2FzIHNlbGVjdGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbiAtIFRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIG9wdGlvbiB0aGF0IHdhcyBzZWxlY3RlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgb3B0aW9uIHRoYXQgd2FzIHNlbGVjdGVkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVPcHRpb25TZWxlY3Qob3B0aW9uRWwsIG9wdGlvbiwgaW5kZXgpIHtcblx0aWYgKG9wdGlvbkVsLmNsYXNzTGlzdC5jb250YWlucygnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19zZWxlY3RlZCcpKSB7XG5cdFx0cmVtb3ZlT3B0aW9uLmNhbGwodGhpcywgb3B0aW9uRWwsIG9wdGlvbiwgaW5kZXgpO1xuXHR9IGVsc2Uge1xuXHRcdGFkZE9wdGlvbi5jYWxsKHRoaXMsIG9wdGlvbkVsLCBvcHRpb24sIGluZGV4KTtcblx0fVxuXHR0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG5cdHRoaXMudXBkYXRlQ3VycmVudEVsZW1lbnQoKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHNlbGVjdGVkIGl0ZW0gZnJvbSBhIG11bHRpLXNlbGVjdCBzZWxlY3RlZCBsaXN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvcHRpb25FbCAtIFRoZSBvcHRpb24gZWxlbWVudCB0byByZW1vdmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uIC0gVGhlIHRleHQgY29udGVudCBvZiB0aGUgb3B0aW9uIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgb3B0aW9uIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZW1vdmVPcHRpb24ob3B0aW9uRWwsIG9wdGlvbiwgaW5kZXgpIHtcblx0b3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZSgnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19zZWxlY3RlZCcpO1xuXHRvcHRpb25FbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcblx0dGhpcy5udW1iZXJPZlNlbGVjdGVkT3B0aW9ucy0tO1xuXHRjb25zdCBidXR0b24gPSB0aGlzLnNlbGVjdGVkT3B0aW9ucy5xdWVyeVNlbGVjdG9yKGAjJHtvcHRpb259LSR7aW5kZXh9YCk7XG5cdGJ1dHRvbi5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuXHR0aGlzLl91cGRhdGVTdGF0ZSgpO1xufVxuXG4vKipcbiAqIGFkZHMgYSBpdGVtIGluIGEgbXVsdGktc2VsZWN0IHNlbGVjdGVkIGxpc3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbkVsIC0gVGhlIG9wdGlvbiBlbGVtZW50IHRvIGFkZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb24gLSBUaGUgdGV4dCBjb250ZW50IG9mIHRoZSBvcHRpb24gdG8gYWRkLlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBvcHRpb24gdG8gYWRkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvbihvcHRpb25FbCwgb3B0aW9uLCBpbmRleCkge1xuXHR0aGlzLm51bWJlck9mU2VsZWN0ZWRPcHRpb25zKys7XG5cdG9wdGlvbkVsLmNsYXNzTGlzdC5hZGQoJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fc2VsZWN0ZWQnKTtcblx0b3B0aW9uRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblx0Y29uc3Qge2xpLCBidXR0b259ID0gY3JlYXRlT3B0aW9uQnV0dG9uKG9wdGlvbiwgaW5kZXgpO1xuXHR0aGlzLnNlbGVjdGVkT3B0aW9ucy5hcHBlbmRDaGlsZChsaSk7XG5cdHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG5cblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdGxpLnJlbW92ZSgpO1xuXHRcdG9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fc2VsZWN0ZWQnKTtcblx0XHR0aGlzLm51bWJlck9mU2VsZWN0ZWRPcHRpb25zLS07XG5cdFx0dGhpcy5fdXBkYXRlU3RhdGUoKTtcblx0fSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJ1dHRvbiBmb3IgYSBtdWx0aS1zZWxlY3Qgb3B0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uIC0gVGhlIHRleHQgY29udGVudCBvZiB0aGUgb3B0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBvcHRpb24uXG4gKiBAcmV0dXJucyB7eyBsaTogSFRNTEVsZW1lbnQsIGJ1dHRvbjogSFRNTEVsZW1lbnQgfX0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG5ld2x5IGNyZWF0ZWQgPGxpPiBhbmQgPGJ1dHRvbj4gZWxlbWVudHMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbkJ1dHRvbihvcHRpb24sIGluZGV4KSB7XG5cdGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdGJ1dHRvbi5pZCA9IGAke29wdGlvbn0tJHtpbmRleH1gO1xuXHRidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYCByZW1vdmUgJHtvcHRpb259IGApO1xuXHRidXR0b24uY2xhc3NOYW1lID0gJ28tbXVsdGktc2VsZWN0X19zZWxlY3RlZC1vcHRpb25zLWJ1dHRvbic7XG5cdGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XG5cdGJ1dHRvbi5pbm5lclRleHQgPSBvcHRpb247XG5cdGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdHNwYW4uY2xhc3NMaXN0ID0gJ28taWNvbnMtaWNvbiBvLWljb25zLWljb24tLWNyb3NzJztcblx0YnV0dG9uLmFwcGVuZENoaWxkKHNwYW4pO1xuXHRsaS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG5cdHJldHVybiB7bGksIGJ1dHRvbn07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvcHRpb24gZWxlbWVudCBmb3IgYSBtdWx0aS1zZWxlY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkQmFzZSAtIFRoZSBiYXNlIElEIHRvIHVzZSBmb3IgdGhlIG9wdGlvbiBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbiAtIFRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIG9wdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgb3B0aW9uLlxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBUaGUgbmV3bHkgY3JlYXRlZCBvcHRpb24gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wdGlvbihpZEJhc2UsIG9wdGlvbiwgaW5kZXgpIHtcblx0Y29uc3Qgb3B0aW9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0b3B0aW9uRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ29wdGlvbicpO1xuXHRvcHRpb25FbC5pZCA9IGAke2lkQmFzZX0tJHtpbmRleH1gO1xuXHRvcHRpb25FbC5jbGFzc05hbWUgPSAnby1tdWx0aS1zZWxlY3Qtb3B0aW9uJztcblx0b3B0aW9uRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ2ZhbHNlJyk7XG5cdG9wdGlvbkVsLmlubmVyVGV4dCA9IG9wdGlvbjtcblx0Y29uc3QgdGlja1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdHRpY2tTcGFuLmNsYXNzTmFtZSA9ICdvLW11bHRpLXNlbGVjdC1vcHRpb24tdGljayc7XG5cdG9wdGlvbkVsLmFwcGVuZENoaWxkKHRpY2tTcGFuKTtcblxuXHRyZXR1cm4gb3B0aW9uRWw7XG59XG4iLCIvKipcbiAqXG4gKiBEZWJvdW5jZXMgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgYWZ0ZXIgbiBtaWxsaXNlY29uZHNcbiAqIHdpdGhvdXQgaXQgbm90IGJlaW5nIGNhbGxlZFxuICpcbiAqIEBleGFtcGxlXG4gKiBVdGlscy5kZWJvdW5jZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSAtIERlYm91bmNlZCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbiAqXG4gKiBUaHJvdHRsZSBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4gKlxuICogQGV4YW1wbGVcbiAqIFV0aWxzLnRocm90dGxlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gVGhyb3R0bGVkIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRCBzdHJpbmcgYnkgY29uY2F0ZW5hdGluZyB0aGUgZ2l2ZW4gY29tcG9uZW50IG5hbWUsIHByZWZpeCwgYW5kIGEgcmFuZG9tIG51bWJlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIElEIHN0cmluZy5cbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgcHJlZml4IHN0cmluZyBhbmQgcmV0dXJucyBhIHVuaXF1ZSBJRCBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiBjb25zdCBnZW5lcmF0ZUlkID0gdWlkQnVpbGRlcignbXlDb21wb25lbnQnKTtcbiAqIGNvbnN0IGlkID0gZ2VuZXJhdGVJZCgncHJlZml4Jyk7XG4gKiBjb25zb2xlLmxvZyhpZCk7IC8vICdteUNvbXBvbmVudC1wcmVmaXgxMjM0NTY3ODkwJ1xuICovXG5cbmNvbnN0IHVpZEJ1aWxkZXIgPSAoY29tcG9uZW50TmFtZSkgPT4gcHJlZml4ID0+IHtcblx0Y29uc3QgdWlkID0gU3RyaW5nKE1hdGgucmFuZG9tKCkpLnNwbGl0KCcuJylbMV07XG5cdHJldHVybiBgJHtjb21wb25lbnROYW1lfS0ke3ByZWZpeH0ke3VpZH1gO1xufTtcblxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGUsXG5cdHVpZEJ1aWxkZXJcbn07XG4iLCJpbXBvcnQge1xuXHRvbkNvbWJvQm94S2V5RG93bixcblx0dG9nZ2xlRHJvcGRvd24sXG5cdHVwZGF0ZUN1cnJlbnRFbGVtZW50LFxuXHRfcmVtb3ZlQ3VycmVudENsYXNzLFxufSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7dXBkYXRlU3RhdGV9IGZyb20gJy4vc3RhdGUuanMnO1xuaW1wb3J0IHtoYW5kbGVPcHRpb25TZWxlY3QsIGNyZWF0ZU9wdGlvbn0gZnJvbSAnLi9tdWx0aS1zZWxlY3Qtb3B0aW9ucy5qcyc7XG5pbXBvcnQge3VpZEJ1aWxkZXJ9IGZyb20gXCJAZmluYW5jaWFsLXRpbWVzL28tdXRpbHNcIjtcblxuY29uc3QgdW5pcXVlSWQgPSB1aWRCdWlsZGVyKCdvLW11bHRpLXNlbGVjdCcpO1xuXG5jbGFzcyBNdWx0aVNlbGVjdCB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW211bHRpU2VsZWN0RWxdIC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudCAoe211bHRpc2VsZWN0T3B0aW9uczogWydvcHRpb24xJywgJ29wdGlvbjInXX0pXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihtdWx0aVNlbGVjdEVsLCBvcHRpb25zKSB7XG5cdFx0dGhpcy5tdWx0aVNlbGVjdEVsID0gbXVsdGlTZWxlY3RFbDtcblx0XHR0aGlzLmNvcmVXcmFwcGVyID0gdGhpcy5fZ2V0Q29yZVdyYXBwZXIoKTtcblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0e30sXG5cdFx0XHRvcHRpb25zLCB7XG5cdFx0XHRcdG11bHRpU2VsZWN0T3B0aW9uczogdGhpcy5fZ2V0Q29yZU9wdGlvbnMoKVxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHR0aGlzLl9jbGVhckNvcmUoKTtcblxuXHRcdGlmICghdGhpcy5vcHRpb25zLm11bHRpU2VsZWN0T3B0aW9ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdCdUaGUgbXVsdGkgc2VsZWN0IGNvbXBvbmVudCByZXF1aXJlcyBvcHRpb24gZWxlbWVudHMgdG8gYmUgZGVmaW5lZCBpbiB0aGUgPHNlbGVjdD4gdGFnLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHRoaXMuY29tYm9FbCA9IG11bHRpU2VsZWN0RWwucXVlcnlTZWxlY3RvcignW3JvbGU9Y29tYm9ib3hdJyk7XG5cdFx0dGhpcy5jb21ib0JveFRleHQgPSBtdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnLm8tbXVsdGktc2VsZWN0X19jb21ib2JveC10ZXh0J1xuXHRcdCk7XG5cdFx0dGhpcy5saXN0Ym94RWwgPSBtdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPWxpc3Rib3hdJyk7XG5cdFx0dGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBtdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnLm8tbXVsdGktc2VsZWN0X19zZWxlY3RlZC1vcHRpb25zJ1xuXHRcdCk7XG5cdFx0Ly8gZGF0YVxuXHRcdHRoaXMuaWRCYXNlID0gdGhpcy5jb21ib0VsLmlkO1xuXHRcdHRoaXMudG90YWxOdW1iZXJPZk9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubXVsdGlTZWxlY3RPcHRpb25zLmxlbmd0aDtcblxuXHRcdC8vIHN0YXRlXG5cdFx0dGhpcy5udW1iZXJPZlNlbGVjdGVkT3B0aW9ucyA9IDA7XG5cdFx0dGhpcy5hY3RpdmVJbmRleCA9IDA7XG5cdFx0dGhpcy5vcGVuID0gZmFsc2U7XG5cblx0XHR0aGlzLm9wdGlvbnMubXVsdGlTZWxlY3RPcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IG9wdGlvbkVsID0gY3JlYXRlT3B0aW9uKHRoaXMuaWRCYXNlLCBvcHRpb24sIGluZGV4KTtcblx0XHRcdG9wdGlvbkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmhhbmRsZU9wdGlvblNlbGVjdChvcHRpb25FbCwgb3B0aW9uLCBpbmRleCk7XG5cdFx0XHRcdG9wdGlvbkVsLmNsYXNzTGlzdC5yZW1vdmUoJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fY3VycmVudCcpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmxpc3Rib3hFbC5hcHBlbmRDaGlsZChvcHRpb25FbCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9iaW5kSGVscGVyRnVuY3Rpb25zQW5kRXZlbnRMaXN0ZW5lcnMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaW5kcyB0aGUgaGVscGVyIGZ1bmN0aW9ucyBhbmQgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgTXVsdGlTZWxlY3QgaW5zdGFuY2UgYW5kIGl0cyBjaGlsZHJlbi5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9iaW5kSGVscGVyRnVuY3Rpb25zQW5kRXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0dGhpcy50b2dnbGVEcm9wZG93biA9IHRvZ2dsZURyb3Bkb3duLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVPcHRpb25TZWxlY3QgPSBoYW5kbGVPcHRpb25TZWxlY3QuYmluZCh0aGlzKTtcblx0XHR0aGlzLnVwZGF0ZUN1cnJlbnRFbGVtZW50ID0gdXBkYXRlQ3VycmVudEVsZW1lbnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSA9IHVwZGF0ZVN0YXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb21ib0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy50b2dnbGVEcm9wZG93bigpO1xuXHRcdFx0aWYgKHRoaXMub3Blbikge1xuXHRcdFx0XHRfcmVtb3ZlQ3VycmVudENsYXNzKHRoaXMubXVsdGlTZWxlY3RFbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5jb21ib0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNvbWJvQm94S2V5RG93bi5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmNvbWJvRWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRcdGlmICghdGhpcy5saXN0Ym94RWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcblx0XHRcdFx0XHR0aGlzLnRvZ2dsZURyb3Bkb3duKGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5saXN0Ym94RWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLmNvbWJvRWwgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcblx0XHRcdFx0XHR0aGlzLnRvZ2dsZURyb3Bkb3duKGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcblx0XHRcdHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xlYXJzIHRoZSBjb3JlIGVsZW1lbnQgb2YgdGhlIE11bHRpU2VsZWN0IGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2NsZWFyQ29yZSgpIHtcblx0XHRjb25zdCBzZWxlY3ROYW1lID0gdGhpcy5jb3JlV3JhcHBlci5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnbmFtZScpLnZhbHVlO1xuXHRcdGNvbnN0IHNlbGVjdElkID0gdGhpcy5jb3JlV3JhcHBlci5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnaWQnKS52YWx1ZTtcblxuXHRcdGlmICghc2VsZWN0TmFtZSB8fCAhc2VsZWN0SWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignU2VsZWN0IGVsZW1lbnQgbXVzdCBoYXZlIGF0dHJpYnV0ZXMgbmFtZSBhbmQgaWQgZGVmaW5lZC4nKTtcblx0XHR9XG5cblx0XHRjb25zdCBsYWJlbElkID0gdW5pcXVlSWQoJ3NlbGVjdGVkJyk7XG5cdFx0Y29uc3QgbGFiZWxzID0gWy4uLnRoaXMuY29yZVdyYXBwZXIubGFiZWxzXS5tYXAoKGxhYmVsKSA9PiBsYWJlbC5pZCkuam9pbignICcpO1xuXHRcdHRoaXMubXVsdGlTZWxlY3RFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2VuaGFuY2VkXCI+XG4gICAgPHVsXG4gICAgICAgICAgICBjbGFzcz1cIm8tbXVsdGktc2VsZWN0X19zZWxlY3RlZC1vcHRpb25zXCJcbiAgICAgICAgICAgIGlkPSR7bGFiZWxJZH1cbiAgICA+PC91bD5cbiAgICA8ZGl2IGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2NvbWJvYm94LXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2NvbWJvYm94XCJcbiAgICAgICAgICAgICAgICBpZD1cIiR7c2VsZWN0SWR9XCJcbiAgICAgICAgICAgICAgICBuYW1lPSR7c2VsZWN0TmFtZX1cbiAgICAgICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD1cIlwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwiJHtsYWJlbHN9ICR7bGFiZWxJZH1cIlxuICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgIGFyaWEtb3ducz1cIm8tbXVsdGktc2VsZWN0LWxpc3Rib3hcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2NvbWJvYm94LXRleHRcIj4gQ2xpY2sgdG8gc2VsZWN0IG9wdGlvbnMgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cIm8tbXVsdGktc2VsZWN0X19kcm9wZG93bi1tZW51XCJcbiAgICAgICAgICAgIGlkPVwiby1tdWx0aS1zZWxlY3QtbGlzdGJveFwiXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwibXVsdGkgc2VsZWN0IG9wdGlvbnNcIlxuICAgICAgICAgICAgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgID48L2Rpdj5cbjwvZGl2PlxuYCk7XG5cdFx0dGhpcy5jb3JlV3JhcHBlci5yZW1vdmUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjb3JlIHNlbGVjdCBlbGVtZW50IGZyb20gdGhlIG11bHRpIHNlbGVjdCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBjb3JlIHdyYXBwZXIgSFRNTCBFbGVtZW50LlxuXHQgKi9cblx0X2dldENvcmVXcmFwcGVyKCkge1xuXHRcdGNvbnN0IGNvcmVXcmFwcGVyID0gdGhpcy5tdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcInNlbGVjdFwiXG5cdFx0KTtcblxuXHRcdGlmIChjb3JlV3JhcHBlci5sZW5ndGggPiAxKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09ubHkgb25lIHNlbGVjdCBlbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgZm9yIG8tbXVsdGktc2VsZWN0Jyk7XG5cdFx0fVxuXHRcdGlmIChjb3JlV3JhcHBlci5sZW5ndGggPT09IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignQSBzZWxlY3QgZWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIGluIG8tbXVsdGktc2VsZWN0Jyk7XG5cdFx0fVxuXHRcdHJldHVybiBjb3JlV3JhcHBlclswXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIG8tbXVsdGktc2VsZWN0IGNvbXBvbmVudC9zLlxuXHQgKlxuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxzdHJpbmcpfSByb290RWxlbWVudCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW5pdGlhbGlzZSB0aGUgY29tcG9uZW50IGluLCBvciBhIENTUyBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50ICh7bXVsdGlzZWxlY3RPcHRpb25zOiBbJ29wdGlvbjEnLCAnb3B0aW9uMiddfSlcblx0ICogQHJldHVybnMge011bHRpU2VsZWN0fE11bHRpU2VsZWN0W119IFRoZSBuZXdseSBjb25zdHJ1Y3RlZCBNdWx0aVNlbGVjdCBjb21wb25lbnRzXG5cdCAqL1xuXHRzdGF0aWMgaW5pdChyb290RWxlbWVudCwgb3B0aW9ucykge1xuXHRcdGlmICghcm9vdEVsZW1lbnQpIHtcblx0XHRcdHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCEocm9vdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWxlbWVudCk7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcblx0XHRcdHJvb3RFbGVtZW50Lm1hdGNoZXMoJ1tkYXRhLW8tY29tcG9uZW50PW8tbXVsdGktc2VsZWN0XScpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gbmV3IE11bHRpU2VsZWN0KHJvb3RFbGVtZW50LCBvcHRpb25zKTtcblx0XHR9XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oXG5cdFx0XHRyb290RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tbXVsdGktc2VsZWN0XCJdJyksXG5cdFx0XHRyb290RWwgPT4gbmV3IE11bHRpU2VsZWN0KHJvb3RFbCwgb3B0aW9ucylcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG9wdGlvbnMgZnJvbSB0aGUgY29yZSBzZWxlY3QgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIG11bHRpLXNlbGVjdCBvcHRpb25zLlxuXHQgKi9cblx0X2dldENvcmVPcHRpb25zKCkge1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNvcmVXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpO1xuXG5cdFx0cmV0dXJuIFsuLi5vcHRpb25zXS5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLmdldEF0dHJpYnV0ZSgndmFsdWUnKSk7XG5cdH1cblxuXHQvKipcblx0ICogRGVzdHJveXMgbXVsdGlzZWxlY3QgY29tcG9uZW50IGFuZCByZW1vdmUgd2luZG93IGV2ZW50IGxpc3RlbmVycy5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRkZXN0cm95KCkge1xuXHRcdGlmKHRoaXMubXVsdGlTZWxlY3RFbCkge1xuXHRcdFx0dGhpcy5tdWx0aVNlbGVjdEVsLnJlbW92ZSgpO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZVN0YXRlKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTXVsdGlTZWxlY3Q7XG4iLCJjbGFzcyBJbnB1dCB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2VsZW1lbnRdIC0gQW4gaW5wdXQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5wYXJlbnQgPSBlbGVtZW50LmNsb3Nlc3QoJy5vLWZvcm1zLWlucHV0Jyk7XG5cblx0XHR0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzKTtcblx0XHR0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcyk7XG5cblx0XHR0aGlzLmNsYXNzTmFtZSA9IHtcblx0XHRcdGludmFsaWQ6ICdvLWZvcm1zLWlucHV0LS1pbnZhbGlkJyxcblx0XHRcdHZhbGlkOiAnby1mb3Jtcy1pbnB1dC0tdmFsaWQnXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBIYW5kbGVyXG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBlbWl0dGVkIGJ5IGVsZW1lbnQvd2luZG93IGludGVyYWN0aW9uc1xuXHQgKi9cblx0aGFuZGxlRXZlbnQoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2JsdXInIHx8IGV2ZW50LnR5cGUgPT09ICdpbnB1dCcpIHtcblx0XHRcdHRoaXMudmFsaWRhdGUoZXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbnB1dCB2YWxpZGF0aW9uXG5cdCAqIENvbmRpdGlvbnMgZm9yIGlucHV0IHZhbGlkYXRpb25cblx0ICpcblx0ICogQHBhcmFtIHtGb2N1c0V2ZW50fSBldmVudCBbXSAtIFRoZSBldmVudCB3aGljaCBoYXMgY2F1c2VkIHJlLXZhbGlkYXRpb24uXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSAtIGlzIHRoZSBpbnB1dCB2YWxpZD9cblx0ICovXG5cdHZhbGlkYXRlKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnBhcmVudCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIHZhbGlkYXRlIGRhdGUgaW5wdXRcblx0XHRpZiAodGhpcy5wYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLWZvcm1zLWlucHV0LS1kYXRlJykpIHtcblx0XHRcdHJldHVybiB0aGlzLl92YWxpZGF0ZURhdGUoZXZlbnQpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5pbnB1dC52YWxpZGl0eS52YWxpZCkge1xuXHRcdFx0dGhpcy5fdG9nZ2xlUGFyZW50Q2xhc3NlcyhcImludmFsaWRcIik7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHR9IGVsc2UgaWYgKHRoaXMuaW5wdXQudmFsaWRpdHkudmFsaWQgJiYgdGhpcy5wYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3NOYW1lLmludmFsaWQpKSB7XG5cdFx0XHR0aGlzLl90b2dnbGVQYXJlbnRDbGFzc2VzKFwidmFsaWRcIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBEYXRlIGlucHV0IHZhbGlkYXRpb25cblx0ICpcblx0ICogQHBhcmFtIHtGb2N1c0V2ZW50fSBldmVudCBbXSAtIFRoZSBldmVudCB3aGljaCBoYXMgY2F1c2VkIHJlLXZhbGlkYXRpb24uXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSAtIGlzIHRoZSBpbnB1dCB2YWxpZD9cblx0ICovXG5cdF92YWxpZGF0ZURhdGUoZXZlbnQpIHtcblx0XHRjb25zdCBkYXkgPSB0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dC5vLWZvcm1zLWlucHV0X19kYXktcGFydCcpO1xuXHRcdGNvbnN0IG1vbnRoID0gdGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvcignaW5wdXQuby1mb3Jtcy1pbnB1dF9fbW9udGgtcGFydCcpO1xuXHRcdGNvbnN0IHllYXIgPSB0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dC5vLWZvcm1zLWlucHV0X195ZWFyLXBhcnQnKTtcblxuXHRcdGNvbnN0IGRhdGVJbnB1dHMgPSBbZGF5LCBtb250aCwgeWVhcl0uZmlsdGVyKEJvb2xlYW4pO1xuXG5cdFx0Y29uc3QgYWN0aXZlRWxlbWVudCA9IGV2ZW50ICYmIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPyBldmVudC5yZWxhdGVkVGFyZ2V0IDogZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHRjb25zdCBmb2N1c09uRGF0ZUlucHV0ID0gZGF0ZUlucHV0cy5pbmNsdWRlcyhhY3RpdmVFbGVtZW50KTtcblxuXHRcdGNvbnN0IGludmFsaWREYXRlSW5wdXRBdHRlbXB0ID0gZGF0ZUlucHV0cy5maW5kKGlucHV0ID0+IHtcblx0XHRcdHJldHVybiAhZm9jdXNPbkRhdGVJbnB1dCAmJiAhaW5wdXQudmFsaWRpdHkudmFsaWQ7XG5cdFx0fSk7XG5cblx0XHRjb25zdCBlbnRpcmVEYXRlVmFsaWQgPSBkYXRlSW5wdXRzLmV2ZXJ5KGlucHV0ID0+IGlucHV0LnZhbGlkaXR5LnZhbGlkKTtcblx0XHRpZihlbnRpcmVEYXRlVmFsaWQpIHtcblx0XHRcdHRoaXMuX3RvZ2dsZVBhcmVudENsYXNzZXMoXCJ2YWxpZFwiKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIERvIG5vdCBzZXQgdmFsaWRpdHkgY2xhc3NlcyBiZWZvcmUgdGhlIHVzZXJcblx0XHQvLyBoYXMgbW92ZWQgb24gZnJvbSB0aGUgZGF0ZSBmaWVsZC5cblx0XHRpZiAoaW52YWxpZERhdGVJbnB1dEF0dGVtcHQpIHtcblx0XHRcdHRoaXMuX3RvZ2dsZVBhcmVudENsYXNzZXMoXCJpbnZhbGlkXCIpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdF90b2dnbGVQYXJlbnRDbGFzc2VzKHN0YXRlKSB7XG5cdFx0aWYgKHN0YXRlID09PSBcInZhbGlkXCIgKSB7XG5cdFx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLmludmFsaWQpO1xuXHRcdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZS52YWxpZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUudmFsaWQpO1xuXHRcdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZS5pbnZhbGlkKTtcblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMpO1xuXHRcdHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzKTtcblx0XHR0aGlzLmlucHV0ID0gbnVsbDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dDtcbiIsImNsYXNzIFN0YXRlIHtcblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKlxuXHQgKiBAcGFyYW0ge1JhZGlvTm9kZUxpc3R9IFtpbnB1dHNdIC0gQSBOb2RlTGlzdCBvZiByYWRpbyBpbnB1dCBlbGVtZW50c1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW4gfCBvYmplY3R9IG9wdHMgLSBhbiBvYmplY3Qgb2Ygb3B0aW9uc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5pY29uT25seSBbbnVsbF0gLSB3aGVuIHRydWUgZGlzcGxheSBhbiBpY29uIG9ubHksIGhpZGluZyB0aGUgc3RhdHVzIGxhYmVsXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihpbnB1dHMsIG9wdHMpIHtcblx0XHRjb25zdCByYWRpb0lucHV0cyA9IGlucHV0cyBpbnN0YW5jZW9mIFJhZGlvTm9kZUxpc3Q7XG5cdFx0aWYgKHJhZGlvSW5wdXRzKSB7XG5cdFx0XHR0aGlzLmlucHV0cyA9IGlucHV0cztcblx0XHRcdHRoaXMucGFyZW50ID0gdGhpcy5pbnB1dHNbMF0uY2xvc2VzdCgnLm8tZm9ybXMtaW5wdXQnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBjYW4gb25seSBiZSBhcHBsaWVkIHRvIGByYWRpb2AgdHlwZSBpbnB1dHMuJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fdmVyaWZ5KCk7XG5cdFx0dGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRpY29uT25seTogZmFsc2Vcblx0XHR9LCBvcHRzKTtcblxuXHRcdHRoaXMuY2xhc3NOYW1lID0ge1xuXHRcdFx0c2F2aW5nOiAnby1mb3Jtcy1pbnB1dC0tc2F2aW5nJyxcblx0XHRcdHNhdmVkOiAnby1mb3Jtcy1pbnB1dC0tc2F2ZWQnXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgc3RhdGUgZWxlbWVudFxuXHQgKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9nZW5lcmF0ZVN0YXRlRWwoKSB7XG5cdFx0dGhpcy5zdGF0ZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGNvbnN0IGNsYXNzTmFtZXMgPSB0aGlzLm9wdHMuaWNvbk9ubHkgPyBbJ28tZm9ybXMtaW5wdXRfX3N0YXRlJywgJ28tZm9ybXMtaW5wdXRfX3N0YXRlLS1pY29uLW9ubHknXSA6IFsnby1mb3Jtcy1pbnB1dF9fc3RhdGUnXTtcblx0XHQgdGhpcy5zdGF0ZUVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG5cdFx0dGhpcy5wYXJlbnQuYXBwZW5kKHRoaXMuc3RhdGVFbCk7XG5cdH1cblxuXHQvKipcblx0ICogU3RhdGUgc2V0dGVyXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSB0eXBlIG9mIHN0YXRlIHRvIGRpc3BsYXlcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGN1c3RvbWlzZSB0aGUgbGFiZWwgb2YgdGhlIHN0YXRlLCBlLmcuIHRoZSBzYXZlZCBzdGF0ZSBkZWZhdWx0cyB0byBcIlNhdmluZ1wiIGJ1dCBjb3VsZCBiZSBcIlNlbnRcIlxuXHQgKi9cblx0c2V0KHN0YXRlLCBsYWJlbCkge1xuXHRcdGlmICghdGhpcy5zdGF0ZUVsKSB7XG5cdFx0XHR0aGlzLl9nZW5lcmF0ZVN0YXRlRWwoKTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdGUgPT09ICdzYXZpbmcnKSB7XG5cdFx0XHR0aGlzLl9zYXZpbmcobGFiZWwpO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUgPT09ICdzYXZlZCcpIHtcblx0XHRcdHRoaXMuX3NhdmVkKGxhYmVsKTtcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSAnbm9uZScpIHtcblx0XHRcdHRoaXMuX3JlbW92ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCR7c3RhdGV9IGlzIG5vdCBhIHJlY29nbmlzZWQgc3RhdGUsIHRoZSBvcHRpb25zIGFyZSAnc2F2aW5nJywgJ3NhdmVkJyBvciAnbm9uZScuYCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNhdmluZyBzdGF0ZVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWwgLSB0aGUgY29weSB3aGVuIHNhdmluZ1xuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9zYXZpbmcobGFiZWwpIHtcblx0XHQvLyBSZW1vdmUgb3RoZXIgc3RhdGUgY2xhc3Nlcy5cblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLnNhdmVkKTtcblx0XHQvLyBBZGQgc2F2aW5nIHN0YXRlIGNsYXNzLlxuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWUuc2F2aW5nKTtcblx0XHQvLyBBZGQgY3VzdG9tIHN0YXRlIGxhYmVsIGlmIGdpdmVuLlxuXHRcdC8vIERlZmF1bHQgbGFiZWwgY29weSBpcyBhZGRlZCB2aWEgdGhlIENTUyBgY29udGVudGAgYXR0cmlidXRlLlxuXHRcdHRoaXMuc3RhdGVFbC5jbGFzc0xpc3QudG9nZ2xlKCdvLWZvcm1zLWlucHV0X19zdGF0ZS0tY3VzdG9tJywgQm9vbGVhbihsYWJlbCkpO1xuXHRcdHRoaXMuc3RhdGVFbC50ZXh0Q29udGVudCA9IGxhYmVsICYmICF0aGlzLm9wdHMuaWNvbk9ubHkgPyBsYWJlbCA6ICcnO1xuXHRcdC8vIFdoZW4gaWNvbi1vbmx5IGlzIHNldCB0aGVyZSBpcyBubyBjb3B5IHdoZW4gZ2l2ZW4gYSBjdXN0b20gbGFiZWwgc29cblx0XHQvLyBhZGQgYW4gYXJpYSBsYWJlbC5cblx0XHR0aGlzLnN0YXRlRWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgbGFiZWwgfHwgJ1NhdmluZycpO1xuXHRcdHRoaXMuc3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnc3RhdHVzJyk7XG5cdH1cblxuXHQvKipcblx0ICogU2F2ZWQgc3RhdGVcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIGNvcHkgd2hlbiBzYXZlZFxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9zYXZlZChsYWJlbCkge1xuXHRcdC8vIFJlbW92ZSBvdGhlciBzdGF0ZSBjbGFzc2VzLlxuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuc2F2aW5nKTtcblx0XHQvLyBBZGQgc2F2ZWQgc3RhdGUgY2xhc3MuXG5cdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZS5zYXZlZCk7XG5cdFx0Ly8gQWRkIGN1c3RvbSBzdGF0ZSBsYWJlbCBpZiBnaXZlbi5cblx0XHQvLyBEZWZhdWx0IGxhYmVsIGNvcHkgaXMgYWRkZWQgdmlhIHRoZSBDU1MgYGNvbnRlbnRgIGF0dHJpYnV0ZS5cblx0XHR0aGlzLnN0YXRlRWwuY2xhc3NMaXN0LnRvZ2dsZSgnby1mb3Jtcy1pbnB1dF9fc3RhdGUtLWN1c3RvbScsIEJvb2xlYW4obGFiZWwpKTtcblx0XHR0aGlzLnN0YXRlRWwudGV4dENvbnRlbnQgPSBsYWJlbCAmJiAhdGhpcy5vcHRzLmljb25Pbmx5ID8gbGFiZWwgOiAnJztcblx0XHQvLyBXaGVuIGljb24tb25seSBpcyBzZXQgdGhlcmUgaXMgbm8gY29weSB3aGVuIGdpdmVuIGEgY3VzdG9tIGxhYmVsIHNvXG5cdFx0Ly8gYWRkIGFuIGFyaWEgbGFiZWwuXG5cdFx0dGhpcy5zdGF0ZUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGxhYmVsIHx8ICdTYXZlZCcpO1xuXHRcdHRoaXMuc3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnc3RhdHVzJyk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIHN0YXRlXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0X3JlbW92ZSgpIHtcblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLnNhdmluZyk7XG5cdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzTmFtZS5zYXZlZCk7XG5cdFx0dGhpcy5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5zdGF0ZUVsKTtcblx0XHR0aGlzLnN0YXRlRWwgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFZlcmlmeSBpbnB1dCBwYXJlbnRcblx0ICpcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfdmVyaWZ5KCkge1xuXHRcdGlmICghdGhpcy5wYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLWZvcm1zLWlucHV0LS1yYWRpby1ib3gnKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBjYW4gb25seSBiZSBzZXQgb24gcmFkaW8gaW5wdXRzIHdpdGggYSBib3ggc3R5bGUgKG8tZm9ybXMtaW5wdXQtLXJhZGlvLWJveCkuJyk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJy5vLWZvcm1zLS1pbnB1dC1pbnZhbGlkJykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignU3RhdGUgY2Fubm90IGJlIHNldCBvbiBhbiBpbnZhbGlkIGlucHV0IGZpZWxkLicpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcbiIsIi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gRXJyb3JTdW1tYXJ5RWxlbWVudFxuICogQHByb3BlcnR5IHtIVE1MSW5wdXRFbGVtZW50fSBlbGVtZW50IC0gdGhlIGFzc29jaWF0ZWQgZWxlbWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlkIC0gdGhlIGlucHV0IGVsZW1lbnQncyBpZFxuICogQHByb3BlcnR5IHtib29sZWFufSB2YWxpZCAtIHdhcyB0aGUgdXNlcidzIHZhbHVlIHZhbGlkP1xuICogQHByb3BlcnR5IHtzdHJpbmc9fSBlcnJvciAtIHRoZSBlcnJvciBtZXNzYWdlIGZvciB0aGlzIGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnQ9fSBmaWVsZCAtIGEgY29udGFpbmluZyBvLWZvcm1zLWZpZWxkIGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTExhYmVsRWxlbWVudH0gbGFiZWwgLSBhbiBhc3NvY2lhdGVkIGxhYmVsIGVsZW1lbnRcbiAqL1xuXG5jbGFzcyBFcnJvclN1bW1hcnkge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXk8RXJyb3JTdW1tYXJ5RWxlbWVudD59IFtlbGVtZW50c10gLSBBbiBhcnJheSBvZiBvYmplY3RzLCB3aGVyZSBlYWNoIG9iamVjdCBkZXNjcmliZXMgYW4gaW52YWxpZCBpbnB1dCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbaGVhZGluZ01lc3NhZ2U9J1RoZXJlIGlzIGEgcHJvYmxlbSddIC0gQSBtZXNzYWdlIHRvIHNob3cgaW4gdGhlIGhlYWRlci4gSXQgZGVmYXVsdHMgdG86ICdUaGVyZSBpcyBhIHByb2JsZW0nXG5cdCAqIEBleGFtcGxlXG5cdCAqXHRjb25zdCBlbGVtZW50c0V4YW1wbGUgPSBbXG5cdCAqXHRcdHtcblx0ICpcdFx0XHRpZDogJ3RleHQtaW5wdXQnLFxuXHQgKlx0XHRcdHZhbGlkOiBmYWxzZSxcblx0ICpcdFx0XHRlcnJvcjogJ1BsZWFzZSBmaWxsIG91dCB0aGlzIGZpZWxkJyxcblx0ICpcdFx0XHRsYWJlbDogJ0lucHV0IExhYmVsJyxcblx0ICpcdFx0XHRlbGVtZW50OiA8RWxlbWVudCAvPixcblx0ICpcdFx0fSxcblx0ICpcdFx0ey4uLn0sXG5cdCAqXHRdO1xuXHQgKlx0bmV3IEVycm9yU3VtbWFyeShleGFtcGxlLCAnVGhpcyBpcyBhIGhlYWRpbmcgbWVzc2FnZScpXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50cywgaGVhZGluZ01lc3NhZ2UpIHtcblx0XHR0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG5cdFx0dGhpcy5oZWFkaW5nTWVzc2FnZSA9IGhlYWRpbmdNZXNzYWdlIHx8ICdUaGVyZSBpcyBhIHByb2JsZW0nO1xuXHRcdGNvbnN0IGhhc0FuSW52ZXJzZUZpZWxkID0gZWxlbWVudHMuc29tZShlbGVtID0+IHtcblx0XHRcdGlmIChlbGVtLmZpZWxkKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmZpZWxkLmNsYXNzTGlzdC5jb250YWlucygnby1mb3Jtcy1maWVsZC0taW52ZXJzZScpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuaW52ZXJzZSA9IGhhc0FuSW52ZXJzZUZpZWxkO1xuXHRcdHRoaXMuaW52YWxpZElucHV0cyA9IFtdO1xuXG5cdFx0cmV0dXJuIHRoaXMuY3JlYXRlU3VtbWFyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIE5vZGUgdG8gaG9sZCBsaXN0IG9mIGludmFsaWQgaW5wdXRzXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtIVE1MRGl2RWxlbWVudH0gLSBhIGRpdiBmdWxsIG9mIGVycm9yIG1lc3NhZ2VzXG5cdCAqL1xuXHRjcmVhdGVTdW1tYXJ5KCkge1xuXHRcdGNvbnN0IGludmFsaWRJbnB1dHMgPSB0aGlzLmVsZW1lbnRzLmZpbHRlcihlID0+ICFlLnZhbGlkKTtcblxuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdvLWZvcm1zX19lcnJvci1zdW1tYXJ5Jyk7XG5cdFx0aWYgKHRoaXMuaW52ZXJzZSkge1xuXHRcdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ28tZm9ybXNfX2Vycm9yLXN1bW1hcnktLWludmVyc2UnKTtcblx0XHR9XG5cdFx0ZGl2LnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbGxlZGJ5JywgJ2Vycm9yLXN1bW1hcnknKTtcblx0XHRkaXYuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG5cblx0XHRkaXYuaW5uZXJIVE1MID0gYDxoNCBjbGFzcz1cIm8tZm9ybXNfX2Vycm9yLXN1bW1hcnlfX2hlYWRpbmdcIiBpZD1cImVycm9yLXN1bW1hcnlcIj4ke3RoaXMuaGVhZGluZ01lc3NhZ2V9PC9oND5gO1xuXHRcdGRpdi5hcHBlbmRDaGlsZChFcnJvclN1bW1hcnkuY3JlYXRlTGlzdChpbnZhbGlkSW5wdXRzKSk7XG5cdFx0cmV0dXJuIGRpdjtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBsaXN0IG9mIGFuY2hvcnNcblx0ICpcblx0ICogQHBhcmFtIHtBcnJheTxFcnJvclN1bW1hcnlFbGVtZW50Pn0gaW5wdXRzIC0gZWxlbWVudCBkZXNjcmlwdG9yc1xuXHQgKiBAcmV0dXJucyB7SFRNTFVMaXN0RWxlbWVudH0gLSB0aGUgbGlzdFxuXHQgKi9cblx0c3RhdGljIGNyZWF0ZUxpc3QoaW5wdXRzKSB7XG5cdFx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cdFx0bGlzdC5jbGFzc0xpc3QuYWRkKCdvLWZvcm1zX19lcnJvci1zdW1tYXJ5X19saXN0Jyk7XG5cdFx0Y29uc3QgZmllbGRzSW5UaGVMaXN0ID0gW107XG5cdFx0aW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuXHRcdFx0Ly8gQSBmaWVsZCBtYXkgY29udGFpbiBtdWx0aXBsZSBpbnZhbGlkIGlucHV0cy4gRS5nLiBhIGRhdGUgZmllbGRcblx0XHRcdC8vIGhhcyB0aHJlZSB0ZXh0IGlucHV0cyBmb3IgZGF5LCBtb250aCwgYW5kIHllYXIuIE9ubHkgc2hvdyBhXG5cdFx0XHQvLyBmaWVsZCBpbiB0aGUgZXJyb3Igc3VtbWFyeSBvbmNlIGlmIGl0IGhhcyBtdWx0aXBsZSBpbnZhbGlkIGlucHV0c1xuXHRcdFx0aWYgKGZpZWxkc0luVGhlTGlzdC5pbmNsdWRlcyhpbnB1dC5maWVsZCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0LmZpZWxkKSB7XG5cdFx0XHRcdGZpZWxkc0luVGhlTGlzdC5wdXNoKGlucHV0LmZpZWxkKTtcblx0XHRcdH1cblx0XHRcdC8vIGludmFsaWQgaW5wdXQgYnV0IHdpdGggbm8gbGFiZWwgdG8gY3JlYXRlIGFuIGVycm9yIHN1bW1hcnlcblx0XHRcdGlmIChpbnB1dC52YWxpZCA9PT0gZmFsc2UgJiYgIWlucHV0LmxhYmVsKSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XHRgQ291bGQgbm90IGFkZCBhbiBpbnZhbGlkIGlucHV0IHRvIHRoZSBlcnJvciBzdW1tYXJ5LiBgICtcblx0XHRcdFx0XHRcdGBDaGVjayB0aGUgaW5wdXQgaGFzIGEgcGFyZW50IFxcYG8tZm9ybXMtZmllbGRcXGAgZWxlbWVudCB3aXRoIGNvcnJlY3QgdGl0bGUgbWFya3VwLiBgICtcblx0XHRcdFx0XHRcdGBPciBkaXNhYmxlIHRoZSBlcnJvciBzdW1tYXJ5IGZlYXR1cmUgZm9yIHRoaXMgZm9ybSB3aXRoIFxcYGRhdGEtby1mb3Jtcy1lcnJvci1zdW1tYXJ5PVwiZmFsc2VcIlxcYC5gLFxuXHRcdFx0XHRcdGlucHV0LmVsZW1lbnRcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdC8vIGludmFsaWQgaW5wdXQsIGFkZCB0byBlcnJvciBzdW1tYXJ5XG5cdFx0XHRpZiAoaW5wdXQudmFsaWQgPT09IGZhbHNlICYmIGlucHV0LmxhYmVsKSB7XG5cdFx0XHRcdGNvbnN0IGxpc3RJdGVtID0gRXJyb3JTdW1tYXJ5LmNyZWF0ZUl0ZW0oaW5wdXQpO1xuXHRcdFx0XHRsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIGFuIGl0ZW0gZm9yIHRoZSBlcnJvciBzdW1tYXJ5XG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBbaW5wdXRdIC0gVGhlIGlucHV0IG9iamVjdCB0byBjb25zdHJ1Y3QgYW4gZXJyb3Igc3VtbWFyeSBpdGVtIGZvclxuXHQgKiBAcmV0dXJucyB7RWxlbWVudH0gLSBsaVxuXHQgKi9cblx0c3RhdGljIGNyZWF0ZUl0ZW0oaW5wdXQpIHtcblx0XHRjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ28tZm9ybXNfX2Vycm9yLXN1bW1hcnlfX2l0ZW0nKTtcblxuXHRcdC8vIFJldHVybiBhIGVycm9yIHN1bW1hcnkgaXRlbSB3aGljaCBsaW5rcyB0byB0aGUgaW5wdXQgaWYgYW4gaWQgZXhpc3RzLlxuXHRcdGlmIChpbnB1dC5pZCkge1xuXHRcdFx0Y29uc3QgaXRlbUFuY2hvciA9IEVycm9yU3VtbWFyeS5jcmVhdGVBbmNob3IoaW5wdXQpO1xuXHRcdFx0aXRlbS5hcHBlbmRDaGlsZChpdGVtQW5jaG9yKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHQvLyBJZiBubyBpZCBleGlzdCByZXR1cm4gYW4gZXJyb3Igc3VtbWFyeSBpdGVtIHdpdGhvdXQgYSBsaW5rLlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0YENvdWxkIG5vdCBsaW5rIHRvIGFuIGludmFsaWQgaW5wdXQgZnJvbSB0aGUgZXJyb3Igc3VtbWFyeS4gYCArXG5cdFx0XHRcdGBBZGQgYSB1bmlxdWUgaWQgYXR0cmlidXRlIHRvIHRoZSBpbnB1dCBlbGVtZW50LmAsXG5cdFx0XHRpbnB1dC5lbGVtZW50XG5cdFx0KTtcblxuXHRcdGl0ZW0uaW5uZXJIVE1MID0gRXJyb3JTdW1tYXJ5Ll9nZXRJdGVtQ29udGVudChpbnB1dCk7XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGUgYW5jaG9yIGVsZW1lbnQgdG8gcG9pbnQgYXQgaW52YWxpZCBpbnB1dFxuXHQgKlxuXHQgKiBAcGFyYW0ge29iamVjdH0gW2lucHV0XSAtIFRoZSBpbnB1dCBvYmplY3QgdG8gY29uc3RydWN0IGFuIGFuY2hvciBmb3Jcblx0ICogQHJldHVybnMge0VsZW1lbnR9IC0gYVxuXHQgKi9cblx0c3RhdGljIGNyZWF0ZUFuY2hvcihpbnB1dCkge1xuXHRcdGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0XHRhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgYCMke2lucHV0LmlkfWApO1xuXHRcdGFuY2hvci5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J2NsaWNrJyxcblx0XHRcdGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZCkuZm9jdXMoKTtcblx0XHRcdH0uYmluZChpbnB1dClcblx0XHQpO1xuXHRcdGFuY2hvci5pbm5lckhUTUwgPSBFcnJvclN1bW1hcnkuX2dldEl0ZW1Db250ZW50KGlucHV0KTtcblx0XHRyZXR1cm4gYW5jaG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge05vZGV9IGlucHV0IC0gVGhlIGlucHV0IGVsZW1lbnQgd2hpY2ggaGFzIGFuIGVycm9yXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IC0gdGhlIGh0bWwgdGV4dCBmb3IgYW4gZXJyb3Igc3VtbWFyeSBpdGVtXG5cdCAqL1xuXHRzdGF0aWMgX2dldEl0ZW1Db250ZW50KGlucHV0KSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdCc8c3BhbiBjbGFzcz1cIm8tZm9ybXNfX2Vycm9yLXN1bW1hcnlfX2l0ZW0tb3ZlcnZpZXdcIj4nICtcblx0XHRcdGAke2lucHV0LmxhYmVsfTwvc3Bhbj46IGAgK1xuXHRcdFx0YDxzcGFuIGNsYXNzPVwiby1mb3Jtc19fZXJyb3Itc3VtbWFyeV9faXRlbS1kZXRhaWxcIj4ke2lucHV0LmVycm9yfTwvc3Bhbj5gXG5cdFx0KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvclN1bW1hcnk7XG4iLCJpbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dC5qcyc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZS5qcyc7XG5pbXBvcnQgRXJyb3JTdW1tYXJ5IGZyb20gJy4vZXJyb3Itc3VtbWFyeS5qcyc7XG5cbmNsYXNzIEZvcm1zIHtcblxuXHQvKipcblx0ICogQHR5cGVkZWYge09iamVjdH0gRm9ybXNPcHRpb25zIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBmb3JtLlxuXHQgKiBAcHJvcGVydHkge2Jvb2xlYW59IFtlcnJvclN1bW1hcnk9dHJ1ZV0gLSBEaXNwbGF5IGFuIGVycm9yIHN1bW1hcnkgYXQgdGhlIHRvcCBvZiB0aGUgZm9ybSBhcyBwYXJ0IG9mIGBvLWZvcm1zYCB2YWxpZGF0aW9uLlxuXHQgKiBAcHJvcGVydHkge2Jvb2xlYW59IFtwcmV2ZW50U3VibWl0PWZhbHNlXSAtIFByZXZlbnQgZm9ybSBzdWJtaXNzaW9uIGFmdGVyIGBvLWZyb21zYCB2YWxpZGF0aW9uIOKAkyBzZWUgdGhlIGBvRm9ybXMuc3VibWl0YCBldmVudCB0byBtYW51YWxseSBzdWJtaXQgdGhlIGZvcm0gYWZ0ZXIgdmFsaWRhdGlvbi4gVGhpcyBkb2VzIG5vdCBhcHBseSB3aGVuIGB1c2VCcm93c2VyVmFsaWRhdGlvbmAgaXMgdHJ1ZS5cblx0ICogQHByb3BlcnR5IHtib29sZWFufSBbdXNlQnJvd3NlclZhbGlkYXRpb249ZmFsc2VdIC0gRG8gbm90IHVzZSBgby1mb3Jtc2AgdmFsaWRhdGlvbiwgcmVseSBvbiB0aGUgYnJvd3NlcidzIGJ1aWx0LWluIHZhbGlkYXRpb24gaW5zdGVhZC5cblx0ICovXG5cblx0LyoqXG5cdCAqIEB0eXBlZGVmIHtFdmVudH0gRm9ybXNTdWJtaXRFdmVudCAtIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgYnkgdGhlIHVzZXJhbmQgYG8tZm9ybXNgIGhhcyBjb21wbGV0ZWQgdmFsaWRhdGlvbi5cblx0ICogQHByb3BlcnR5IHtvYmplY3R9IGRldGFpbCAtIFRoZSBldmVudCBkZXRhaWwuXG5cdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkZXRhaWwuaW5zdGFuY2UgIC0gVGhlIGluc3RhbmNlIG9mIGBvLWZvcm1zYC5cblx0ICogQHByb3BlcnR5IHtib29sZWFufSBkZXRhaWwudmFsaWQgIC0gVGhlIHZhbGlkaXR5IG9mIHRoZSBgby1mb3Jtc2AgaW5zdGFuY2UuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRm9ybUVsZW1lbnR9IFtmb3JtRWxlbWVudF0gLSBUaGUgZm9ybSBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtGb3Jtc09wdGlvbnN9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgZm9ybVxuXHQgKi9cblx0Y29uc3RydWN0b3IoZm9ybUVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRpZiAoIWZvcm1FbGVtZW50IHx8IGZvcm1FbGVtZW50Lm5vZGVOYW1lICE9PSAnRk9STScpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgW2RhdGEtby1jb21wb25lbnQ9XCJvLWZvcm1zXCJdIG11c3QgYmUgc2V0IG9uIGEgZm9ybSBlbGVtZW50LiBJdCBpcyBjdXJyZW50bHkgc2V0IG9uIGEgJyR7Zm9ybUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKX0nLmApO1xuXHRcdH1cblxuXHRcdHRoaXMuZm9ybSA9IGZvcm1FbGVtZW50O1xuXHRcdHRoaXMuX2Zvcm1JbnB1dHNDYWNoZSA9IEFycmF5LmZyb20odGhpcy5mb3JtLmVsZW1lbnRzLCBlbGVtZW50ID0+IG5ldyBJbnB1dChlbGVtZW50KSk7XG5cdFx0dGhpcy5zdGF0ZUVsZW1lbnRzID0gW107XG5cblx0XHR0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdHVzZUJyb3dzZXJWYWxpZGF0aW9uOiBmYWxzZSxcblx0XHRcdHByZXZlbnRTdWJtaXQ6IGZhbHNlLFxuXHRcdFx0ZXJyb3JTdW1tYXJ5OiB0cnVlXG5cdFx0fSwgb3B0aW9ucyB8fCBGb3Jtcy5nZXREYXRhQXR0cmlidXRlcyhmb3JtRWxlbWVudCkpO1xuXG5cdFx0aWYodGhpcy5vcHRzLnVzZUJyb3dzZXJWYWxpZGF0aW9uICYmIHRoaXMub3B0cy5wcmV2ZW50U3VibWl0KSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBvLWZvcm1zIGBwcmV2ZW50U3VibWl0YCBvcHRpb24gb25seSBhcHBsaWVzIHdoZW4gdGhlIGB1c2VCcm93c2VyVmFsaWRhdGlvbmAgb3B0aW9uIGlzIGBmYWxzZWAuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLm9wdHMudXNlQnJvd3NlclZhbGlkYXRpb24pIHtcblx0XHRcdHRoaXMuZm9ybS5zZXRBdHRyaWJ1dGUoJ25vdmFsaWRhdGUnLCAnJyk7XG5cdFx0XHR0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcyk7XG5cdFx0XHR0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignb0Zvcm1zLnN1Ym1pdCcsIChlKSA9PiB7XG5cdFx0XHRcdGlmKGUuZGV0YWlsLnZhbGlkICYmICF0aGlzLm9wdHMucHJldmVudFN1Ym1pdCkge1xuXHRcdFx0XHRcdHRoaXMuZm9ybS5zdWJtaXQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZm9ybS5yZW1vdmVBdHRyaWJ1dGUoJ25vdmFsaWRhdGUnKTtcblx0XHRcdHRoaXMuc3VibWl0cyA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1zdWJtaXRdJyk7XG5cdFx0XHR0aGlzLnN1Ym1pdHMuZm9yRWFjaChzdWJtaXQgPT4ge1xuXHRcdFx0XHRzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblx0XHRcdFx0c3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRnZXQgZm9ybUlucHV0cygpIHtcblx0XHRpZighdGhpcy5mb3JtKSB7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXHRcdGNvbnN0IGZvcm1FbGVtZW50cyA9IEFycmF5LmZyb20odGhpcy5mb3JtLmVsZW1lbnRzKTtcblx0XHRjb25zdCBpbnB1dHNUb1JlbW92ZSA9IHRoaXMuX2Zvcm1JbnB1dHNDYWNoZS5maWx0ZXIoaW5wdXQgPT4gIWZvcm1FbGVtZW50cy5pbmNsdWRlcyhpbnB1dC5pbnB1dCkpO1xuXHRcdGNvbnN0IGVsZW1lbnRzVG9BZGQgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGVsZW1lbnQgPT4gIXRoaXMuX2Zvcm1JbnB1dHNDYWNoZS5maW5kKChpbnB1dCkgPT4gaW5wdXQuaW5wdXQgPT09IGVsZW1lbnQpKTtcblx0XHRpbnB1dHNUb1JlbW92ZS5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmRlc3Ryb3koKSk7XG5cdFx0dGhpcy5fZm9ybUlucHV0c0NhY2hlID0gW1xuXHRcdFx0Li4udGhpcy5fZm9ybUlucHV0c0NhY2hlLmZpbHRlcihpbnB1dCA9PiAhaW5wdXRzVG9SZW1vdmUuaW5jbHVkZXMoaW5wdXQpKSxcblx0XHRcdC4uLmVsZW1lbnRzVG9BZGQubWFwKGVsZW1lbnQgPT4gbmV3IElucHV0KGVsZW1lbnQpKVxuXHRcdF07XG5cdFx0cmV0dXJuIHRoaXMuX2Zvcm1JbnB1dHNDYWNoZTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIGZvcm1FbGVtZW50LiBJZiB0aGUgZm9ybSBpcyBiZWluZyBzZXQgdXBcblx0ICogZGVjbGFyYXRpdmVseSwgdGhpcyBtZXRob2QgaXMgdXNlZCB0byBleHRyYWN0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBmb3JtRWxlbWVudCAtIFRoZSBtZXNzYWdlIGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcmV0dXJucyB7T2JqZWN0LjxzdHJpbmcsIGFueT59IC0gVGhlIG9wdGlvbnNcblx0ICovXG5cdHN0YXRpYyBnZXREYXRhQXR0cmlidXRlcyhmb3JtRWxlbWVudCkge1xuXHRcdGlmICghKGZvcm1FbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKGZvcm1FbGVtZW50LmRhdGFzZXQpLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XG5cdFx0XHQvLyBJZ25vcmUgZGF0YS1vLWNvbXBvbmVudFxuXHRcdFx0aWYgKGtleSA9PT0gJ29Db21wb25lbnQnKSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCdWlsZCBhIGNvbmNpc2Uga2V5IGFuZCBnZXQgdGhlIG9wdGlvbiB2YWx1ZVxuXHRcdFx0Y29uc3Qgc2hvcnRLZXkgPSBrZXkucmVwbGFjZSgvXm9NZXNzYWdlKFxcdykoXFx3KykkLywgKG0sIG0xLCBtMikgPT4gbTEudG9Mb3dlckNhc2UoKSArIG0yKTtcblx0XHRcdGNvbnN0IHZhbHVlID0gZm9ybUVsZW1lbnQuZGF0YXNldFtrZXldO1xuXG5cdFx0XHQvLyBUcnkgcGFyc2luZyB0aGUgdmFsdWUgYXMgSlNPTiwgb3RoZXJ3aXNlIGp1c3Qgc2V0IGl0IGFzIGEgc3RyaW5nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFdmVudCBIYW5kbGVyXG5cdCAqXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBldmVudCAtIFRoZSBldmVudCBlbWl0dGVkIGJ5IGVsZW1lbnQvd2luZG93IGludGVyYWN0aW9uc1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGhhbmRsZUV2ZW50KGV2ZW50KSB7XG5cdFx0Y29uc3QgUkVUVVJOX0tFWSA9IDEzO1xuXHRcdGlmIChldmVudC50eXBlID09PSAnY2xpY2snIHx8IGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJyAmJiBldmVudC5rZXkgPT09IFJFVFVSTl9LRVkpIHtcblx0XHRcdGlmICh0aGlzLmZvcm0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLnZhbGlkYXRlRm9ybUlucHV0cygpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChldmVudC50eXBlID09PSAnc3VibWl0Jykge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0IGNoZWNrZWRFbGVtZW50cyA9IHRoaXMudmFsaWRhdGVGb3JtSW5wdXRzKCk7XG5cdFx0XHRjb25zdCBmb3JtSW52YWxpZCA9IGNoZWNrZWRFbGVtZW50cy5zb21lKGlucHV0ID0+IGlucHV0LnZhbGlkID09PSBmYWxzZSk7XG5cblx0XHRcdGlmIChmb3JtSW52YWxpZCkge1xuXHRcdFx0XHQvLyBEaXNwbGF5IGVycm9yIHN1bW1hcnkuXG5cdFx0XHRcdGlmICh0aGlzLm9wdHMuZXJyb3JTdW1tYXJ5KSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc3VtbWFyeSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgbmV3U3VtbWFyeSA9IG5ldyBFcnJvclN1bW1hcnkoY2hlY2tlZEVsZW1lbnRzLCB0aGlzLm9wdHMuZXJyb3JTdW1tYXJ5TWVzc2FnZSk7XG5cdFx0XHRcdFx0XHR0aGlzLmZvcm0ucmVwbGFjZUNoaWxkKG5ld1N1bW1hcnksIHRoaXMuc3VtbWFyeSk7XG5cdFx0XHRcdFx0XHR0aGlzLnN1bW1hcnkgPSBuZXdTdW1tYXJ5O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnN1bW1hcnkgPSB0aGlzLmZvcm0uaW5zZXJ0QmVmb3JlKG5ldyBFcnJvclN1bW1hcnkoY2hlY2tlZEVsZW1lbnRzLCB0aGlzLm9wdHMuZXJyb3JTdW1tYXJ5TWVzc2FnZSksIHRoaXMuZm9ybS5maXJzdEVsZW1lbnRDaGlsZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnN0IGZpcnN0RXJyb3JBbmNob3IgPSB0aGlzLnN1bW1hcnkucXVlcnlTZWxlY3RvcignYScpO1xuXHRcdFx0XHRcdGlmIChmaXJzdEVycm9yQW5jaG9yKSB7XG5cdFx0XHRcdFx0XHRmaXJzdEVycm9yQW5jaG9yLmZvY3VzKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUge0Zvcm1zU3VibWl0RXZlbnR9XG5cdFx0XHQgKi9cblx0XHRcdGNvbnN0IG9Gb3Jtc1N1Ym1pdEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvRm9ybXMuc3VibWl0Jywge1xuXHRcdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0XHRpbnN0YW5jZTogdGhpcyxcblx0XHRcdFx0XHR2YWxpZDogIWZvcm1JbnZhbGlkXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNhbmNlbGFibGU6IHRydWUsXG5cdFx0XHRcdGJ1YmJsZXM6IHRydWVcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5mb3JtLmRpc3BhdGNoRXZlbnQob0Zvcm1zU3VibWl0RXZlbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGb3JtIHZhbGlkYXRpb25cblx0ICogVmFsaWRhdGVzIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIGZvcm0gYW5kIGNyZWF0ZXMgaW5wdXQgb2JqZWN0cyBmb3IgdGhlIGVycm9yXG5cdHN1bW1hcnlcblx0ICpcblx0ICogQHJldHVybnMge0FycmF5PGltcG9ydChcIi4vZXJyb3Itc3VtbWFyeS5qc1wiKS5FcnJvclN1bW1hcnlFbGVtZW50Pn0gLSBsaXN0IG9mIGVsZW1lbnRzIGZvciB0aGUgZXJyb3Igc3VtbWFyeVxuXHQgKi9cblx0dmFsaWRhdGVGb3JtSW5wdXRzKCkge1xuXHRcdHJldHVybiB0aGlzLmZvcm1JbnB1dHMubWFwKG9Gb3JtSW5wdXQgPT4ge1xuXHRcdFx0Y29uc3QgdmFsaWQgPSBvRm9ybUlucHV0LnZhbGlkYXRlKCk7XG5cdFx0XHRjb25zdCBpbnB1dCA9IG9Gb3JtSW5wdXQuaW5wdXQ7XG5cdFx0XHRjb25zdCBmaWVsZCA9IGlucHV0LmNsb3Nlc3QoJy5vLWZvcm1zLWZpZWxkJyk7XG5cdFx0XHRjb25zdCBsYWJlbEVsZW1lbnQgPSBmaWVsZCA/IGZpZWxkLnF1ZXJ5U2VsZWN0b3IoJy5vLWZvcm1zLXRpdGxlX19tYWluJykgOiBudWxsO1xuXHRcdFx0Ly8gbGFiZWwgaXMgYWN0dWFsbHkgdGhlIGZpZWxkIHRpdGxlLCBub3QgZm9yIGV4YW1wbGUgdGhlIGxhYmVsIG9mIGEgc2luZ2xlIGNoZWNrYm94LlxuXHRcdFx0Ly8gdGhpcyBpcyB1c2VkIHRvIGdlbmVyYXRlIGFuIGVycm9yIHN1bW1hcnlcblx0XHRcdGNvbnN0IGxhYmVsID0gbGFiZWxFbGVtZW50ID8gbGFiZWxFbGVtZW50LnRleHRDb250ZW50IDogbnVsbDtcblx0XHRcdGNvbnN0IGVycm9yRWxlbWVudCA9IGZpZWxkID8gZmllbGQucXVlcnlTZWxlY3RvcignLm8tZm9ybXMtaW5wdXRfX2Vycm9yJykgOiBudWxsO1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBlcnJvckVsZW1lbnQgPyBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgOiBpbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGlkOiBpbnB1dC5pZCxcblx0XHRcdFx0dmFsaWQsXG5cdFx0XHRcdGVycm9yOiAhdmFsaWQgPyBlcnJvciA6IG51bGwsXG5cdFx0XHRcdGxhYmVsLFxuXHRcdFx0XHRmaWVsZCxcblx0XHRcdFx0ZWxlbWVudDogaW5wdXRcblx0XHRcdH07XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5wdXQgc3RhdGVcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lXSAtIG5hbWUgb2YgdGhlIGlucHV0IGZpZWxkcyB0byBhZGQgc3RhdGUgdG9cblx0ICogQHBhcmFtIHtzdHJpbmd9IFtzdGF0ZV0gLSB0eXBlIG9mIHN0YXRlIHRvIGFwcGx5IOKAlCBvbmUgb2YgJ3NhdmluZycsICdzYXZlZCcsICdub25lJ1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW58b2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgb2Ygb3B0aW9ucyBkaXNwbGF5IGFuIGljb24gb25seSB3aGVuIHRydWUsIGhpZGluZyB0aGUgc3RhdHVzIGxhYmVsXG5cdCAqL1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgLSBuYW1lIG9mIHRoZSBpbnB1dCBmaWVsZHMgdG8gYWRkIHN0YXRlIHRvXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdHlwZSBvZiBzdGF0ZSB0byBhcHBseSDigJQgb25lIG9mICdzYXZpbmcnLCAnc2F2ZWQnLCAnbm9uZSdcblx0ICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBhbiBvYmplY3Qgb2Ygb3B0aW9uc1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pY29uTGFiZWwgW251bGxdIC0gY3VzdG9taXNlIHRoZSBsYWJlbCBvZiB0aGUgc3RhdGUsIGUuZy4gdGhlIHNhdmVkIHN0YXRlIGRlZmF1bHRzIHRvIFwiU2F2aW5nXCIgYnV0IGNvdWxkIGJlIFwiU2VudFwiXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pY29uT25seSBbZmFsc2VdIC0gd2hlbiB0cnVlIGRpc3BsYXkgYW4gaWNvbiBvbmx5LCBoaWRpbmcgdGhlIHN0YXR1cyBsYWJlbFxuXHQgKi9cblx0c2V0U3RhdGUoc3RhdGUsIG5hbWUsIG9wdGlvbnMgPSB7IGljb25MYWJlbDogbnVsbCwgaWNvbk9ubHk6IGZhbHNlIH0pIHtcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnIHx8IG9wdGlvbnMgPT09IG51bGwgfHwgQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYG9wdGlvbnNgIGFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0bGV0IG9iamVjdCA9IHRoaXMuc3RhdGVFbGVtZW50cy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBuYW1lKTtcblx0XHRpZiAoIW9iamVjdCkge1xuXHRcdFx0b2JqZWN0ID0ge1xuXHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRlbGVtZW50OiBuZXcgU3RhdGUodGhpcy5mb3JtLmVsZW1lbnRzW25hbWVdLCBvcHRpb25zKVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5zdGF0ZUVsZW1lbnRzLnB1c2gob2JqZWN0KTtcblx0XHR9XG5cdFx0b2JqZWN0LmVsZW1lbnQuc2V0KHN0YXRlLCBvcHRpb25zLmljb25MYWJlbCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVzdHJveSBmb3JtIGluc3RhbmNlXG5cdCAqL1xuXHRkZXN0cm95KCkge1xuXHRcdGlmICghdGhpcy5vcHRzLnVzZUJyb3dzZXJWYWxpZGF0aW9uKSB7XG5cdFx0XHR0aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc3VibWl0cy5mb3JFYWNoKHN1Ym1pdCA9PiB7XG5cdFx0XHRcdHN1Ym1pdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXHRcdFx0XHRzdWJtaXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMuZm9ybSA9IG51bGw7XG5cdFx0dGhpcy5fZm9ybUlucHV0c0NhY2hlLmZvckVhY2goaW5wdXQgPT4gaW5wdXQuZGVzdHJveSgpKTtcblx0XHR0aGlzLl9mb3JtSW5wdXRzQ2FjaGUgPSBbXTtcblx0XHR0aGlzLnN0YXRlRWxlbWVudHMgPSBudWxsO1xuXHRcdHRoaXMub3B0cyA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSBmb3JtIGNvbXBvbmVudC5cblx0ICpcblx0ICogQHBhcmFtIHsoSFRNTEVsZW1lbnQgfCBzdHJpbmcpfSByb290RWwgLSBUaGUgcm9vdCBlbGVtZW50IHRvIGludGlhbGlzZSBhIGZvcm0gaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGJhbm5lcnNcblx0ICogQHJldHVybnMge0Zvcm1zIHwgRm9ybXNbXX0gLSBUaGUgbmV3bHkgaW5zdGFudGlhdGVkIEZvcm0gb3IgRm9ybXNcblx0ICovXG5cdHN0YXRpYyBpbml0KHJvb3RFbCwgb3B0cykge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblxuXHRcdGlmICghKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpO1xuXHRcdH1cblxuXHRcdGlmIChyb290RWwgaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQpIHtcblx0XHRcdHJldHVybiBuZXcgRm9ybXMocm9vdEVsLCBvcHRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gQXJyYXkuZnJvbShyb290RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLWZvcm1zXCJdJyksIHJvb3RFbCA9PiBuZXcgRm9ybXMocm9vdEVsLCBvcHRzKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRm9ybXM7XG4iLCJpbXBvcnQgb0Zvcm1zIGZyb20gJy4vc3JjL2pzL2Zvcm1zLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24oKSB7XG5cdG9Gb3Jtcy5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvRm9ybXM7XG4iLCJpbXBvcnQgTXVsdGlTZWxlY3QgZnJvbSAnLi4vLi4vc3JjL2pzL211bHRpLXNlbGVjdC5qcyc7XG5pbXBvcnQgb0Zvcm1zIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby1mb3Jtcyc7XG5vRm9ybXMuaW5pdCgpO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSAoKSA9PiB7XG5cdE11bHRpU2VsZWN0LmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pO1xuIl19