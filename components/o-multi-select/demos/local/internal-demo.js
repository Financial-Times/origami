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
      this._open = open;
      this._listboxEl.style.display = open ? "block" : "none";
    } else if (!this._open) {
      this._listboxEl.style.display = "block";
      this._open = true;
    } else {
      this._listboxEl.style.display = "none";
      this._open = false;
    }

    this._comboEl.setAttribute("aria-expanded", "".concat(this._open));

    this._updateState();
  }

  function onComboBoxKeyDown(event) {
    var key = event.key;
    var numberOfOptions = this._totalNumberOfOptions;

    if (!this._open) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        this._updateCurrentElement();

        return this._toggleDropdown();
      }
    }

    if (key === "ArrowUp") {
      if (this._activeIndex !== 0) {
        this._activeIndex--;
      }
    } else if (key === "ArrowDown") {
      if (this._activeIndex !== numberOfOptions - 1) {
        this._activeIndex++;
      }
    } else if (key === "PageDown") {
      if (this._activeIndex + 10 > numberOfOptions) {
        this._activeIndex = numberOfOptions - 1;
      } else {
        this._activeIndex += 10;
      }
    } else if (key === "PageUp") {
      if (this._activeIndex - 10 < 0) {
        this._activeIndex = 0;
      } else {
        this._activeIndex -= 10;
      }
    } else if (key === "Home") {
      this._activeIndex = 0;
    } else if (key === "End") {
      this._activeIndex = numberOfOptions - 1;
    }

    if (key === "Escape" && this._open) {
      this._toggleDropdown();

      this._comboEl.focus();
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      addOptionToList.call(this);
    }

    this._updateCurrentElement();
  }

  function addOptionToList() {
    var optionEl = this.multiSelectEl.querySelector("#".concat(this._idBase, "-").concat(this._activeIndex));
    var option = this._options[this._activeIndex];

    this._handleOptionSelect(optionEl, option, this._activeIndex);
  }

  function updateCurrentElement() {
    this._comboEl.setAttribute("aria-activedescendant", "".concat(this._idBase, "-").concat(this._activeIndex));

    var options = _removeCurrentClass(this.multiSelectEl);

    options[this._activeIndex].classList.add("o-multi-select-option__current");
  }

  function _removeCurrentClass(element) {
    var options = element.querySelectorAll("[role=option]");

    _toConsumableArray(options).forEach(function (optionEl) {
      optionEl.classList.remove("o-multi-select-option__current");
    });

    return options;
  }

  function checkForDuplicates(options) {
    var uniqueOptions = [];
    options.forEach(function (option) {
      if (uniqueOptions.includes(option)) {
        console.warn("Duplicate option found: ".concat(option, "."));
      } else {
        uniqueOptions.push(option);
      }
    });
  } // src/js/state.js


  function updateState() {
    if (this._numberOfSelectedOptions) {
      this._comboBoxText.innerText = "";
      this._selectedOptions.style.display = "block";
      var comboElWidth = this._comboEl.offsetWidth;
      var sumOfChildrenWidth = calculateSumOfChildrenWidth(this._selectedOptions);

      if (sumOfChildrenWidth > comboElWidth * 0.9) {
        this._selectedOptions.classList.add("o-multi-select__visually-hidden");

        this._comboBoxText.innerText = this._numberOfSelectedOptions + " options selected";
      } else {
        this._selectedOptions.classList.remove("o-multi-select__visually-hidden");
      }
    } else {
      this._selectedOptions.style.display = "none";

      if (this._open) {
        this._comboBoxText.innerText = "Select options below";
      } else {
        this._comboBoxText.innerText = "Click to select options";
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

    this._activeIndex = index;

    this._updateCurrentElement();

    var coreOption = this._coreOptions[index];
    coreOption.selected = !coreOption.selected;
  }

  function removeOption(optionEl, option, index) {
    optionEl.classList.remove("o-multi-select-option__selected");
    optionEl.setAttribute("aria-selected", "false");
    this._numberOfSelectedOptions--;

    var button = this._selectedOptions.querySelector("#".concat(option, "-").concat(index));

    button.parentElement.remove();

    this._updateState();
  }

  function addOption(optionEl, option, index) {
    var _this = this;

    this._numberOfSelectedOptions++;
    optionEl.classList.add("o-multi-select-option__selected");
    optionEl.setAttribute("aria-selected", "true");

    var _createOptionButton = createOptionButton(option, index),
        li = _createOptionButton.li,
        button = _createOptionButton.button;

    this._selectedOptions.appendChild(li);

    this._updateState();

    button.addEventListener("click", function () {
      li.remove();
      optionEl.classList.remove("o-multi-select-option__selected");
      _this._numberOfSelectedOptions--;

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

    function MultiSelect(multiSelectEl) {
      var _this2 = this;

      _classCallCheck(this, MultiSelect);

      this.multiSelectEl = multiSelectEl;
      this._coreWrapper = this._getCoreWrapper();
      this._options = this._getCoreOptions();

      this._clearCore();

      checkForDuplicates(this._options);

      if (!this._options.length > 0) {
        throw new Error("The multi select component requires option elements to be defined in the <select> tag.");
      }

      this._comboEl = this.multiSelectEl.querySelector("[role=combobox]");
      this._comboBoxText = this.multiSelectEl.querySelector(".o-multi-select__combobox-text");
      this._listboxEl = this.multiSelectEl.querySelector("[role=listbox]");
      this._selectedOptions = this.multiSelectEl.querySelector(".o-multi-select__selected-options");
      this._idBase = this._comboEl.id;
      this._totalNumberOfOptions = this._options.length;
      this._numberOfSelectedOptions = 0;
      this._activeIndex = 0;
      this._open = false;

      this._options.forEach(function (option, index) {
        var optionEl = createOption(_this2._idBase, option, index);
        optionEl.addEventListener("click", function () {
          _this2._handleOptionSelect(optionEl, option, index);

          optionEl.classList.remove("o-multi-select-option__current");
        });

        _this2._listboxEl.appendChild(optionEl);
      });

      this._bindHelperFunctionsAndEventListeners();
    }

    _createClass(MultiSelect, [{
      key: "_bindHelperFunctionsAndEventListeners",
      value: function _bindHelperFunctionsAndEventListeners() {
        var _this3 = this;

        this._toggleDropdown = toggleDropdown.bind(this);
        this._handleOptionSelect = handleOptionSelect.bind(this);
        this._updateCurrentElement = updateCurrentElement.bind(this);
        this._updateState = updateState.bind(this);

        this._comboEl.addEventListener("click", function () {
          _this3._toggleDropdown();

          if (_this3._open) {
            _removeCurrentClass(_this3.multiSelectEl);
          }
        });

        this._comboEl.addEventListener("keydown", onComboBoxKeyDown.bind(this));

        this._comboEl.addEventListener("blur", function () {
          requestAnimationFrame(function () {
            if (!_this3._listboxEl.contains(document.activeElement)) {
              _this3._toggleDropdown(false);
            }
          });
        });

        this._listboxEl.addEventListener("blur", function () {
          requestAnimationFrame(function () {
            if (_this3._comboEl !== document.activeElement) {
              _this3._toggleDropdown(false);
            }
          });
        });

        this._windowResizelistener = this._updateState.bind(this);
        window.addEventListener("resize", this._windowResizelistener);
      }
    }, {
      key: "_clearCore",
      value: function _clearCore() {
        var selectName = this._coreWrapper.attributes.getNamedItem("name").value;

        var selectId = this._coreWrapper.attributes.getNamedItem("id").value;

        if (!selectName || !selectId) {
          throw new Error("Select element must have attributes name and id defined.");
        }

        this._coreWrapper.id = "".concat(selectId, "-core");
        var labelId = uniqueId("selected");

        var labels = _toConsumableArray(this._coreWrapper.labels).map(function (label) {
          return label.id;
        }).join(" ");

        this.multiSelectEl.insertAdjacentHTML("beforeend", "<div class=\"o-multi-select__enhanced\">\n    <ul\n            class=\"o-multi-select__selected-options\"\n            id=".concat(labelId, "\n    ></ul>\n    <div class=\"o-multi-select__combobox-wrapper\">\n        <div\n                class=\"o-multi-select__combobox\"\n                id=\"").concat(selectId, "\"\n\t\t\t\t\t\t\t\tname=").concat(selectName, "\n                role=\"combobox\"\n                aria-activedescendant=\"\"\n                aria-labelledby=\"").concat(labels, " ").concat(labelId, "\"\n                aria-haspopup=\"listbox\"\n                aria-expanded=\"false\"\n                aria-owns=\"o-multi-select-listbox\"\n                tabindex=\"0\"\n        >\n            <span class=\"o-multi-select__combobox-text\"> Click to select options </span>\n        </div>\n    </div>\n    <div\n            class=\"o-multi-select__dropdown-menu\"\n            id=\"o-multi-select-listbox\"\n            role=\"listbox\"\n            aria-label=\"multi select options\"\n            aria-multiselectable=\"true\"\n            tabindex=\"-1\"\n    ></div>\n</div>\n"));
        this._coreWrapper.style.display = "none";
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
        var options = this._coreWrapper.querySelectorAll("option");

        this._coreOptions = options;
        return _toConsumableArray(options).map(function (option) {
          return option.innerText;
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener("resize", this._windowResizelistener);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy91dGlscy5qcyIsInNyYy9qcy9zdGF0ZS5qcyIsInNyYy9qcy9tdWx0aS1zZWxlY3Qtb3B0aW9ucy5qcyIsIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCJzcmMvanMvbXVsdGktc2VsZWN0LmpzIiwiLi4vby1mb3Jtcy9zcmMvanMvaW5wdXQuanMiLCIuLi9vLWZvcm1zL3NyYy9qcy9zdGF0ZS5qcyIsIi4uL28tZm9ybXMvc3JjL2pzL2Vycm9yLXN1bW1hcnkuanMiLCIuLi9vLWZvcm1zL3NyYy9qcy9mb3Jtcy5qcyIsIi4uL28tZm9ybXMvbWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTTyxXQUFBLGNBQUEsQ0FBd0IsSUFBeEIsRUFBOEI7QUFDcEMsUUFBSSxPQUFPLElBQVAsS0FBZ0IsU0FBcEIsRUFBK0I7QUFDOUIsV0FBSyxLQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUssVUFBTCxDQUFnQixLQUFoQixDQUFzQixPQUF0QixHQUFnQyxJQUFBLEdBQU8sT0FBUCxHQUFpQixNQUFqRDtBQUFpRCxLQUZsRCxNQUVrRCxJQUN2QyxDQUFDLEtBQUssS0FEaUMsRUFDMUI7QUFDdkIsV0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLE9BQXRCLEdBQWdDLE9BQWhDO0FBQ0EsV0FBSyxLQUFMLEdBQWEsSUFBYjtBQUFhLEtBSG9DLE1BSTNDO0FBQ04sV0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLE9BQXRCLEdBQWdDLE1BQWhDO0FBQ0EsV0FBSyxLQUFMLEdBQWEsS0FBYjtBQUFhOztBQUVkLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsZUFBM0IsWUFBK0MsS0FBSyxLQUFwRDs7QUFDQSxTQUFLLFlBQUw7QUFBSzs7QUFlQyxXQUFBLGlCQUFBLENBQTJCLEtBQTNCLEVBQWtDO0FBQ3hDLFFBQU8sR0FBUCxHQUFjLEtBQWQsQ0FBTyxHQUFQ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TUFBSSxPQUFPLFFBQVAsS0FBb0IsV0FBeEIsRUFBcUM7QUFDcEMsSUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELGFBQWhEO0FBQWdEOztBQUdqRCxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN6RCxJQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQUksV0FBSixDQUFnQixvQkFBaEIsQ0FBdkI7QUFBdUMsR0FEeEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhhbmRsZXMgb3BlbmluZyBhbmQgY2xvc2luZyB0aGUgZHJvcGRvd24gbWVudSBmb3IgdGhlIG11bHRpLXNlbGVjdCBjb21wb25lbnQuXG4gKiBXaGVuIHRoZSBtZW51IGlzIG9wZW5lZCwgaXQgc2V0cyB0aGUgZGlzcGxheSBwcm9wZXJ0eSBvZiB0aGUgbGlzdGJveCBlbGVtZW50IHRvICdibG9jaycuXG4gKiBXaGVuIHRoZSBtZW51IGlzIGNsb3NlZCwgaXQgc2V0cyB0aGUgZGlzcGxheSBwcm9wZXJ0eSBvZiB0aGUgbGlzdGJveCBlbGVtZW50IHRvICdub25lJy5cbiAqIEl0IGFsc28gdXBkYXRlcyB0aGUgJ2FyaWEtZXhwYW5kZWQnIGF0dHJpYnV0ZSBvZiB0aGUgY29tYm8gYm94IGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBbb3Blbl0gLSBJZiBwYXNzZWQsIGl0IHdpbGwgZm9yY2UgdGhlIG1lbnUgdG8gb3BlbiBvciBjbG9zZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRHJvcGRvd24ob3Blbikge1xuXHRpZiAodHlwZW9mIG9wZW4gPT09ICdib29sZWFuJykge1xuXHRcdHRoaXMuX29wZW4gPSBvcGVuO1xuXHRcdHRoaXMuX2xpc3Rib3hFbC5zdHlsZS5kaXNwbGF5ID0gb3BlbiA/ICdibG9jaycgOiAnbm9uZSc7XG5cdH0gZWxzZSBpZiAoIXRoaXMuX29wZW4pIHtcblx0XHR0aGlzLl9saXN0Ym94RWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0dGhpcy5fb3BlbiA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5fbGlzdGJveEVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0dGhpcy5fb3BlbiA9IGZhbHNlO1xuXHR9XG5cdHRoaXMuX2NvbWJvRWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgYCR7dGhpcy5fb3Blbn1gKTtcblx0dGhpcy5fdXBkYXRlU3RhdGUoKTtcbn1cblxuLyoqXG4gKiBIYW5kbGVzIHRoZSAna2V5ZG93bicgZXZlbnQgZm9yIHRoZSBjb21ib2JveCBlbGVtZW50IG9mIHRoZSBtdWx0aS1zZWxlY3QgY29tcG9uZW50LlxuICogSWYgdGhlIGNvbXBvbmVudCBpcyBjbG9zZWQsIGl0IGhhbmRsZXMgb3BlbmluZyB0aGUgbWVudSBpZiB0aGUga2V5IHByZXNzZWQgaXMgJ0Fycm93RG93bicsICdBcnJvd1VwJywgJ0VudGVyJywgb3IgJyAnLlxuICogSWYgdGhlIGNvbXBvbmVudCBpcyBvcGVuIGFuZCAnQWx0JyBhbmQgJ0Fycm93VXAnIGtleXMgYXJlIHByZXNzZWQsIGl0IGNhbGxzICdhZGRPcHRpb25Ub0xpc3QnIGFuZCB0aGVuIG9wZW5zIHRoZSBtZW51LlxuICogSWYgYW55IG90aGVyIGtleSBpcyBwcmVzc2VkLCBpdCB1cGRhdGVzIHRoZSBhY3RpdmUgaW5kZXggb2YgdGhlIGxpc3Rib3ggb3B0aW9ucyBiYXNlZCBvbiB0aGUga2V5IHByZXNzZWQuXG4gKiBJZiB0aGUga2V5IHByZXNzZWQgaXMgJ0VzY2FwZScsIGl0IGNsb3NlcyB0aGUgbWVudS5cbiAqIElmIHRoZSBrZXkgcHJlc3NlZCBpcyAnRW50ZXInIG9yICcgJywgaXQgY2FsbHMgJ2FkZE9wdGlvblRvTGlzdCcuXG4gKiBGaW5hbGx5LCBpdCBjYWxscyAndXBkYXRlQ3VycmVudEVsZW1lbnQnIHRvIHVwZGF0ZSB0aGUgYWN0aXZlIGRlc2NlbmRhbnQgYW5kIGN1cnJlbnQgbGlzdGJveCBvcHRpb24uXG4gKlxuICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCAtIFRoZSBrZXlib2FyZCBldmVudC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gb25Db21ib0JveEtleURvd24oZXZlbnQpIHtcblx0Y29uc3Qge2tleX0gPSBldmVudDtcblx0Y29uc3QgbnVtYmVyT2ZPcHRpb25zID0gdGhpcy5fdG90YWxOdW1iZXJPZk9wdGlvbnM7XG5cblx0Ly8gaGFuZGxlIG9wZW5pbmcgd2hlbiBjbG9zZWRcblx0aWYgKCF0aGlzLl9vcGVuKSB7XG5cdFx0aWYgKFxuXHRcdFx0a2V5ID09PSAnQXJyb3dEb3duJyB8fFxuXHRcdFx0a2V5ID09PSAnQXJyb3dVcCcgfHxcblx0XHRcdGtleSA9PT0gJ0VudGVyJyB8fFxuXHRcdFx0a2V5ID09PSAnICdcblx0XHQpIHtcblx0XHRcdHRoaXMuX3VwZGF0ZUN1cnJlbnRFbGVtZW50KCk7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdG9nZ2xlRHJvcGRvd24oKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoa2V5ID09PSAnQXJyb3dVcCcpIHtcblx0XHRpZiAodGhpcy5fYWN0aXZlSW5kZXggIT09IDApIHtcblx0XHRcdHRoaXMuX2FjdGl2ZUluZGV4LS07XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGtleSA9PT0gJ0Fycm93RG93bicpIHtcblx0XHRpZiAodGhpcy5fYWN0aXZlSW5kZXggIT09IG51bWJlck9mT3B0aW9ucyAtIDEpIHtcblx0XHRcdHRoaXMuX2FjdGl2ZUluZGV4Kys7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGtleSA9PT0gJ1BhZ2VEb3duJykge1xuXHRcdGlmICh0aGlzLl9hY3RpdmVJbmRleCArIDEwID4gbnVtYmVyT2ZPcHRpb25zKSB7XG5cdFx0XHR0aGlzLl9hY3RpdmVJbmRleCA9IG51bWJlck9mT3B0aW9ucyAtIDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2FjdGl2ZUluZGV4ICs9IDEwO1xuXHRcdH1cblx0fSBlbHNlIGlmIChrZXkgPT09ICdQYWdlVXAnKSB7XG5cdFx0aWYgKHRoaXMuX2FjdGl2ZUluZGV4IC0gMTAgPCAwKSB7XG5cdFx0XHR0aGlzLl9hY3RpdmVJbmRleCA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2FjdGl2ZUluZGV4IC09IDEwO1xuXHRcdH1cblx0fSBlbHNlIGlmIChrZXkgPT09ICdIb21lJykge1xuXHRcdHRoaXMuX2FjdGl2ZUluZGV4ID0gMDtcblx0fSBlbHNlIGlmIChrZXkgPT09ICdFbmQnKSB7XG5cdFx0dGhpcy5fYWN0aXZlSW5kZXggPSBudW1iZXJPZk9wdGlvbnMgLSAxO1xuXHR9XG5cblx0aWYgKGtleSA9PT0gJ0VzY2FwZScgJiYgdGhpcy5fb3Blbikge1xuXHRcdHRoaXMuX3RvZ2dsZURyb3Bkb3duKCk7XG5cdFx0dGhpcy5fY29tYm9FbC5mb2N1cygpO1xuXHR9IGVsc2UgaWYgKGtleSA9PT0gJ0VudGVyJyB8fCBrZXkgPT09ICcgJykge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0YWRkT3B0aW9uVG9MaXN0LmNhbGwodGhpcyk7XG5cdH1cblx0dGhpcy5fdXBkYXRlQ3VycmVudEVsZW1lbnQoKTtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgbGlzdGJveCBvcHRpb24gdG8gdGhlIHNlbGVjdGVkIGl0ZW1zIGxpc3Qgb2YgdGhlIG11bHRpLXNlbGVjdCBjb21wb25lbnQuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvblRvTGlzdCgpIHtcblx0Y29uc3Qgb3B0aW9uRWwgPSB0aGlzLm11bHRpU2VsZWN0RWwucXVlcnlTZWxlY3Rvcihcblx0XHRgIyR7dGhpcy5faWRCYXNlfS0ke3RoaXMuX2FjdGl2ZUluZGV4fWBcblx0KTtcblx0Y29uc3Qgb3B0aW9uID0gdGhpcy5fb3B0aW9uc1t0aGlzLl9hY3RpdmVJbmRleF07XG5cdHRoaXMuX2hhbmRsZU9wdGlvblNlbGVjdChvcHRpb25FbCwgb3B0aW9uLCB0aGlzLl9hY3RpdmVJbmRleCk7XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY3VycmVudGx5IGFjdGl2ZSBkZXNjZW5kYW50IGFuZCBjdXJyZW50IGxpc3Rib3ggb3B0aW9uIG9mIHRoZSBtdWx0aS1zZWxlY3QgY29tcG9uZW50LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ3VycmVudEVsZW1lbnQoKSB7XG5cdHRoaXMuX2NvbWJvRWwuc2V0QXR0cmlidXRlKFxuXHRcdCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLFxuXHRcdGAke3RoaXMuX2lkQmFzZX0tJHt0aGlzLl9hY3RpdmVJbmRleH1gXG5cdCk7XG5cblx0Y29uc3Qgb3B0aW9ucyA9IF9yZW1vdmVDdXJyZW50Q2xhc3ModGhpcy5tdWx0aVNlbGVjdEVsKTtcblx0b3B0aW9uc1t0aGlzLl9hY3RpdmVJbmRleF0uY2xhc3NMaXN0LmFkZCgnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19jdXJyZW50Jyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyB0aGUgJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fY3VycmVudCcgY2xhc3MgZnJvbSBhbGwgbGlzdGJveCBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgbXVsdGktc2VsZWN0IGVsZW1lbnQuXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnRbXX0gLSBUaGUgbGlzdGJveCBvcHRpb25zLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlQ3VycmVudENsYXNzKGVsZW1lbnQpIHtcblx0Y29uc3Qgb3B0aW9ucyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3JvbGU9b3B0aW9uXScpO1xuXHRbLi4ub3B0aW9uc10uZm9yRWFjaChvcHRpb25FbCA9PiB7XG5cdFx0b3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZSgnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19jdXJyZW50Jyk7XG5cdH0pO1xuXHRyZXR1cm4gb3B0aW9ucztcbn1cblxuXG4vLyBmdW5jdGlvbiB0aGF0IGNoZWNrcyBmb3IgZHVwbGljYXRlIG9wdGlvbnMgYW5kIHdhcm4gaW4gdGhlIGNvbnNvbGUgaWYgYW55IGFyZSBmb3VuZFxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRm9yRHVwbGljYXRlcyhvcHRpb25zKSB7XG5cdGNvbnN0IHVuaXF1ZU9wdGlvbnMgPSBbXTtcblx0b3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG5cdFx0aWYgKHVuaXF1ZU9wdGlvbnMuaW5jbHVkZXMob3B0aW9uKSkge1xuXHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRgRHVwbGljYXRlIG9wdGlvbiBmb3VuZDogJHtvcHRpb259LmBcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHVuaXF1ZU9wdGlvbnMucHVzaChvcHRpb24pO1xuXHRcdH1cblx0fSk7XG59XG4iLCIvKipcbiAqIFVwZGF0ZXMgdGhlIHN0YXRlIG9mIHRoZSBtdWx0aS1zZWxlY3QgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBjdXJyZW50IG51bWJlciBvZiBzZWxlY3RlZCBvcHRpb25zLlxuICogVXBkYXRlcyB0aGUgdGV4dCBvZiB0aGUgY29tYm9Cb3hUZXh0IGVsZW1lbnQgYW5kIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBzZWxlY3RlZE9wdGlvbnMgZWxlbWVudC5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIHVwZGF0ZVN0YXRlXG4gKiBAbWVtYmVyb2YgbW9kdWxlOm11bHRpU2VsZWN0XG4gKiBAaW5zdGFuY2VcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RhdGUoKSB7XG5cdGlmICh0aGlzLl9udW1iZXJPZlNlbGVjdGVkT3B0aW9ucykge1xuXHRcdHRoaXMuX2NvbWJvQm94VGV4dC5pbm5lclRleHQgPSAnJztcblx0XHR0aGlzLl9zZWxlY3RlZE9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0Y29uc3QgY29tYm9FbFdpZHRoID0gdGhpcy5fY29tYm9FbC5vZmZzZXRXaWR0aDtcblx0XHRjb25zdCBzdW1PZkNoaWxkcmVuV2lkdGggPSBjYWxjdWxhdGVTdW1PZkNoaWxkcmVuV2lkdGgoXG5cdFx0XHR0aGlzLl9zZWxlY3RlZE9wdGlvbnNcblx0XHQpO1xuXHRcdGlmIChzdW1PZkNoaWxkcmVuV2lkdGggPiBjb21ib0VsV2lkdGggKiAwLjkpIHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkT3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdvLW11bHRpLXNlbGVjdF9fdmlzdWFsbHktaGlkZGVuJyk7XG5cdFx0XHR0aGlzLl9jb21ib0JveFRleHQuaW5uZXJUZXh0ID1cblx0XHRcdFx0dGhpcy5fbnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMgKyAnIG9wdGlvbnMgc2VsZWN0ZWQnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZE9wdGlvbnMuY2xhc3NMaXN0LnJlbW92ZSgnby1tdWx0aS1zZWxlY3RfX3Zpc3VhbGx5LWhpZGRlbicpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR0aGlzLl9zZWxlY3RlZE9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRpZiAodGhpcy5fb3Blbikge1xuXHRcdFx0dGhpcy5fY29tYm9Cb3hUZXh0LmlubmVyVGV4dCA9ICdTZWxlY3Qgb3B0aW9ucyBiZWxvdyc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NvbWJvQm94VGV4dC5pbm5lclRleHQgPSAnQ2xpY2sgdG8gc2VsZWN0IG9wdGlvbnMnO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTdW1PZkNoaWxkcmVuV2lkdGgocGFyZW50RWxlbWVudCkge1xuXHRjb25zdCBzZWxlY3RlZE9wdGlvbnNDb21wdXRlZFN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUocGFyZW50RWxlbWVudCk7XG5cdGNvbnN0IHtwYWRkaW5nTGVmdCwgcGFkZGluZ1JpZ2h0fSA9IHNlbGVjdGVkT3B0aW9uc0NvbXB1dGVkU3R5bGVzO1xuXHRjb25zdCBzdW1PZkNoaWxkcmVuV2lkdGhJbml0aWFsVmFsdWUgPVxuXHRcdHBhcnNlSW50KHBhZGRpbmdMZWZ0LCAxMCkgKyBwYXJzZUludChwYWRkaW5nUmlnaHQsIDEwKTtcblx0Y29uc3Qgc3VtT2ZDaGlsZHJlbldpZHRoID0gWy4uLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5dXG5cdFx0Lm1hcChlbCA9PiBlbC5vZmZzZXRXaWR0aClcblx0XHQucmVkdWNlKChwcmV2LCBjdXJyKSA9PiBwcmV2ICsgY3Vyciwgc3VtT2ZDaGlsZHJlbldpZHRoSW5pdGlhbFZhbHVlKTtcblx0cmV0dXJuIHN1bU9mQ2hpbGRyZW5XaWR0aDtcbn1cbiIsIi8qKlxuICogYWRkcyBvciByZW1vdmVzIHRoZSBzZWxlY3Rpb24gb2YgYSBtdWx0aS1zZWxlY3Qgb3B0aW9uIGluIHNlbGVjdGVkIGxpc3QuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb3B0aW9uRWwgLSBUaGUgb3B0aW9uIGVsZW1lbnQgdGhhdCB3YXMgc2VsZWN0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uIC0gVGhlIHRleHQgY29udGVudCBvZiB0aGUgb3B0aW9uIHRoYXQgd2FzIHNlbGVjdGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBvcHRpb24gdGhhdCB3YXMgc2VsZWN0ZWQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU9wdGlvblNlbGVjdChvcHRpb25FbCwgb3B0aW9uLCBpbmRleCkge1xuXHRpZiAob3B0aW9uRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLW11bHRpLXNlbGVjdC1vcHRpb25fX3NlbGVjdGVkJykpIHtcblx0XHRyZW1vdmVPcHRpb24uY2FsbCh0aGlzLCBvcHRpb25FbCwgb3B0aW9uLCBpbmRleCk7XG5cdH0gZWxzZSB7XG5cdFx0YWRkT3B0aW9uLmNhbGwodGhpcywgb3B0aW9uRWwsIG9wdGlvbiwgaW5kZXgpO1xuXHR9XG5cdHRoaXMuX2FjdGl2ZUluZGV4ID0gaW5kZXg7XG5cdHRoaXMuX3VwZGF0ZUN1cnJlbnRFbGVtZW50KCk7XG5cdGNvbnN0IGNvcmVPcHRpb24gPSB0aGlzLl9jb3JlT3B0aW9uc1tpbmRleF07XG5cdGNvcmVPcHRpb24uc2VsZWN0ZWQgPSAhY29yZU9wdGlvbi5zZWxlY3RlZDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHNlbGVjdGVkIGl0ZW0gZnJvbSBhIG11bHRpLXNlbGVjdCBzZWxlY3RlZCBsaXN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBvcHRpb25FbCAtIFRoZSBvcHRpb24gZWxlbWVudCB0byByZW1vdmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uIC0gVGhlIHRleHQgY29udGVudCBvZiB0aGUgb3B0aW9uIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgb3B0aW9uIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZW1vdmVPcHRpb24ob3B0aW9uRWwsIG9wdGlvbiwgaW5kZXgpIHtcblx0b3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZSgnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19zZWxlY3RlZCcpO1xuXHRvcHRpb25FbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcblx0dGhpcy5fbnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMtLTtcblx0Y29uc3QgYnV0dG9uID0gdGhpcy5fc2VsZWN0ZWRPcHRpb25zLnF1ZXJ5U2VsZWN0b3IoYCMke29wdGlvbn0tJHtpbmRleH1gKTtcblx0YnV0dG9uLnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG5cdHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG59XG5cbi8qKlxuICogYWRkcyBhIGl0ZW0gaW4gYSBtdWx0aS1zZWxlY3Qgc2VsZWN0ZWQgbGlzdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gb3B0aW9uRWwgLSBUaGUgb3B0aW9uIGVsZW1lbnQgdG8gYWRkLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbiAtIFRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIG9wdGlvbiB0byBhZGQuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIG9wdGlvbiB0byBhZGQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gYWRkT3B0aW9uKG9wdGlvbkVsLCBvcHRpb24sIGluZGV4KSB7XG5cdHRoaXMuX251bWJlck9mU2VsZWN0ZWRPcHRpb25zKys7XG5cdG9wdGlvbkVsLmNsYXNzTGlzdC5hZGQoJ28tbXVsdGktc2VsZWN0LW9wdGlvbl9fc2VsZWN0ZWQnKTtcblx0b3B0aW9uRWwuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcblx0Y29uc3Qge2xpLCBidXR0b259ID0gY3JlYXRlT3B0aW9uQnV0dG9uKG9wdGlvbiwgaW5kZXgpO1xuXHR0aGlzLl9zZWxlY3RlZE9wdGlvbnMuYXBwZW5kQ2hpbGQobGkpO1xuXHR0aGlzLl91cGRhdGVTdGF0ZSgpO1xuXG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRsaS5yZW1vdmUoKTtcblx0XHRvcHRpb25FbC5jbGFzc0xpc3QucmVtb3ZlKCdvLW11bHRpLXNlbGVjdC1vcHRpb25fX3NlbGVjdGVkJyk7XG5cdFx0dGhpcy5fbnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMtLTtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSgpO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgYnV0dG9uIGZvciBhIG11bHRpLXNlbGVjdCBvcHRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb24gLSBUaGUgdGV4dCBjb250ZW50IG9mIHRoZSBvcHRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIG9wdGlvbi5cbiAqIEByZXR1cm5zIHt7IGxpOiBIVE1MRWxlbWVudCwgYnV0dG9uOiBIVE1MRWxlbWVudCB9fSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbmV3bHkgY3JlYXRlZCA8bGk+IGFuZCA8YnV0dG9uPiBlbGVtZW50cy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9uQnV0dG9uKG9wdGlvbiwgaW5kZXgpIHtcblx0Y29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuXHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0YnV0dG9uLmlkID0gYCR7b3B0aW9ufS0ke2luZGV4fWA7XG5cdGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgIHJlbW92ZSAke29wdGlvbn0gYCk7XG5cdGJ1dHRvbi5jbGFzc05hbWUgPSAnby1tdWx0aS1zZWxlY3RfX3NlbGVjdGVkLW9wdGlvbnMtYnV0dG9uJztcblx0YnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcblx0YnV0dG9uLmlubmVyVGV4dCA9IG9wdGlvbjtcblx0Y29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0c3Bhbi5jbGFzc0xpc3QgPSAnby1pY29ucy1pY29uIG8taWNvbnMtaWNvbi0tY3Jvc3MnO1xuXHRidXR0b24uYXBwZW5kQ2hpbGQoc3Bhbik7XG5cdGxpLmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cblx0cmV0dXJuIHtsaSwgYnV0dG9ufTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIG9wdGlvbiBlbGVtZW50IGZvciBhIG11bHRpLXNlbGVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRCYXNlIC0gVGhlIGJhc2UgSUQgdG8gdXNlIGZvciB0aGUgb3B0aW9uIGVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uIC0gVGhlIHRleHQgY29udGVudCBvZiB0aGUgb3B0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBvcHRpb24uXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBuZXdseSBjcmVhdGVkIG9wdGlvbiBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT3B0aW9uKGlkQmFzZSwgb3B0aW9uLCBpbmRleCkge1xuXHRjb25zdCBvcHRpb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRvcHRpb25FbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnb3B0aW9uJyk7XG5cdG9wdGlvbkVsLmlkID0gYCR7aWRCYXNlfS0ke2luZGV4fWA7XG5cdG9wdGlvbkVsLmNsYXNzTmFtZSA9ICdvLW11bHRpLXNlbGVjdC1vcHRpb24nO1xuXHRvcHRpb25FbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAnZmFsc2UnKTtcblx0b3B0aW9uRWwuaW5uZXJUZXh0ID0gb3B0aW9uO1xuXHRjb25zdCB0aWNrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0dGlja1NwYW4uY2xhc3NOYW1lID0gJ28tbXVsdGktc2VsZWN0LW9wdGlvbi10aWNrJztcblx0b3B0aW9uRWwuYXBwZW5kQ2hpbGQodGlja1NwYW4pO1xuXG5cdHJldHVybiBvcHRpb25FbDtcbn1cbiIsIi8qKlxuICpcbiAqIERlYm91bmNlcyBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBhZnRlciBuIG1pbGxpc2Vjb25kc1xuICogd2l0aG91dCBpdCBub3QgYmVpbmcgY2FsbGVkXG4gKlxuICogQGV4YW1wbGVcbiAqIFV0aWxzLmRlYm91bmNlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gRGVib3VuY2VkIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbi8qKlxuICpcbiAqIFRocm90dGxlIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbiAqXG4gKiBAZXhhbXBsZVxuICogVXRpbHMudGhyb3R0bGUobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBUaHJvdHRsZWQgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgdW5pcXVlIElEIHN0cmluZyBieSBjb25jYXRlbmF0aW5nIHRoZSBnaXZlbiBjb21wb25lbnQgbmFtZSwgcHJlZml4LCBhbmQgYSByYW5kb20gbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgSUQgc3RyaW5nLlxuICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBwcmVmaXggc3RyaW5nIGFuZCByZXR1cm5zIGEgdW5pcXVlIElEIHN0cmluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGNvbnN0IGdlbmVyYXRlSWQgPSB1aWRCdWlsZGVyKCdteUNvbXBvbmVudCcpO1xuICogY29uc3QgaWQgPSBnZW5lcmF0ZUlkKCdwcmVmaXgnKTtcbiAqIGNvbnNvbGUubG9nKGlkKTsgLy8gJ215Q29tcG9uZW50LXByZWZpeDEyMzQ1Njc4OTAnXG4gKi9cblxuY29uc3QgdWlkQnVpbGRlciA9IChjb21wb25lbnROYW1lKSA9PiBwcmVmaXggPT4ge1xuXHRjb25zdCB1aWQgPSBTdHJpbmcoTWF0aC5yYW5kb20oKSkuc3BsaXQoJy4nKVsxXTtcblx0cmV0dXJuIGAke2NvbXBvbmVudE5hbWV9LSR7cHJlZml4fSR7dWlkfWA7XG59O1xuXG5cbmV4cG9ydCB7XG5cdGRlYm91bmNlLFxuXHR0aHJvdHRsZSxcblx0dWlkQnVpbGRlclxufTtcbiIsImltcG9ydCB7XG5cdG9uQ29tYm9Cb3hLZXlEb3duLFxuXHR0b2dnbGVEcm9wZG93bixcblx0dXBkYXRlQ3VycmVudEVsZW1lbnQsXG5cdF9yZW1vdmVDdXJyZW50Q2xhc3MsXG5cdGNoZWNrRm9yRHVwbGljYXRlc1xufSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7dXBkYXRlU3RhdGV9IGZyb20gJy4vc3RhdGUuanMnO1xuaW1wb3J0IHtoYW5kbGVPcHRpb25TZWxlY3QsIGNyZWF0ZU9wdGlvbn0gZnJvbSAnLi9tdWx0aS1zZWxlY3Qtb3B0aW9ucy5qcyc7XG5pbXBvcnQge3VpZEJ1aWxkZXJ9IGZyb20gXCJAZmluYW5jaWFsLXRpbWVzL28tdXRpbHNcIjtcblxuY29uc3QgdW5pcXVlSWQgPSB1aWRCdWlsZGVyKCdvLW11bHRpLXNlbGVjdCcpO1xuXG5jbGFzcyBNdWx0aVNlbGVjdCB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW211bHRpU2VsZWN0RWxdIC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICovXG5cdGNvbnN0cnVjdG9yKG11bHRpU2VsZWN0RWwpIHtcblx0XHR0aGlzLm11bHRpU2VsZWN0RWwgPSBtdWx0aVNlbGVjdEVsO1xuXHRcdHRoaXMuX2NvcmVXcmFwcGVyID0gdGhpcy5fZ2V0Q29yZVdyYXBwZXIoKTtcblx0XHR0aGlzLl9vcHRpb25zID0gdGhpcy5fZ2V0Q29yZU9wdGlvbnMoKTtcblxuXHRcdHRoaXMuX2NsZWFyQ29yZSgpO1xuXHRcdGNoZWNrRm9yRHVwbGljYXRlcyh0aGlzLl9vcHRpb25zKTtcblxuXHRcdGlmICghdGhpcy5fb3B0aW9ucy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdCdUaGUgbXVsdGkgc2VsZWN0IGNvbXBvbmVudCByZXF1aXJlcyBvcHRpb24gZWxlbWVudHMgdG8gYmUgZGVmaW5lZCBpbiB0aGUgPHNlbGVjdD4gdGFnLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHRoaXMuX2NvbWJvRWwgPSB0aGlzLm11bHRpU2VsZWN0RWwucXVlcnlTZWxlY3RvcignW3JvbGU9Y29tYm9ib3hdJyk7XG5cdFx0dGhpcy5fY29tYm9Cb3hUZXh0ID0gdGhpcy5tdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnLm8tbXVsdGktc2VsZWN0X19jb21ib2JveC10ZXh0J1xuXHRcdCk7XG5cdFx0dGhpcy5fbGlzdGJveEVsID0gdGhpcy5tdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPWxpc3Rib3hdJyk7XG5cdFx0dGhpcy5fc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5tdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnLm8tbXVsdGktc2VsZWN0X19zZWxlY3RlZC1vcHRpb25zJ1xuXHRcdCk7XG5cdFx0Ly8gZGF0YVxuXHRcdHRoaXMuX2lkQmFzZSA9IHRoaXMuX2NvbWJvRWwuaWQ7XG5cdFx0dGhpcy5fdG90YWxOdW1iZXJPZk9wdGlvbnMgPSB0aGlzLl9vcHRpb25zLmxlbmd0aDtcblxuXHRcdC8vIHN0YXRlXG5cdFx0dGhpcy5fbnVtYmVyT2ZTZWxlY3RlZE9wdGlvbnMgPSAwO1xuXHRcdHRoaXMuX2FjdGl2ZUluZGV4ID0gMDtcblx0XHR0aGlzLl9vcGVuID0gZmFsc2U7XG5cblx0XHR0aGlzLl9vcHRpb25zLmZvckVhY2goKG9wdGlvbiwgaW5kZXgpID0+IHtcblx0XHRcdGNvbnN0IG9wdGlvbkVsID0gY3JlYXRlT3B0aW9uKHRoaXMuX2lkQmFzZSwgb3B0aW9uLCBpbmRleCk7XG5cdFx0XHRvcHRpb25FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0dGhpcy5faGFuZGxlT3B0aW9uU2VsZWN0KG9wdGlvbkVsLCBvcHRpb24sIGluZGV4KTtcblx0XHRcdFx0b3B0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZSgnby1tdWx0aS1zZWxlY3Qtb3B0aW9uX19jdXJyZW50Jyk7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuX2xpc3Rib3hFbC5hcHBlbmRDaGlsZChvcHRpb25FbCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9iaW5kSGVscGVyRnVuY3Rpb25zQW5kRXZlbnRMaXN0ZW5lcnMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaW5kcyB0aGUgaGVscGVyIGZ1bmN0aW9ucyBhbmQgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGUgTXVsdGlTZWxlY3QgaW5zdGFuY2UgYW5kIGl0cyBjaGlsZHJlbi5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9iaW5kSGVscGVyRnVuY3Rpb25zQW5kRXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0dGhpcy5fdG9nZ2xlRHJvcGRvd24gPSB0b2dnbGVEcm9wZG93bi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX2hhbmRsZU9wdGlvblNlbGVjdCA9IGhhbmRsZU9wdGlvblNlbGVjdC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuX3VwZGF0ZUN1cnJlbnRFbGVtZW50ID0gdXBkYXRlQ3VycmVudEVsZW1lbnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLl91cGRhdGVTdGF0ZSA9IHVwZGF0ZVN0YXRlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fY29tYm9FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMuX3RvZ2dsZURyb3Bkb3duKCk7XG5cdFx0XHRpZiAodGhpcy5fb3Blbikge1xuXHRcdFx0XHRfcmVtb3ZlQ3VycmVudENsYXNzKHRoaXMubXVsdGlTZWxlY3RFbCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5fY29tYm9FbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25Db21ib0JveEtleURvd24uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5fY29tYm9FbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblx0XHRcdFx0aWYgKCF0aGlzLl9saXN0Ym94RWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcblx0XHRcdFx0XHR0aGlzLl90b2dnbGVEcm9wZG93bihmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2xpc3Rib3hFbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuX2NvbWJvRWwgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcblx0XHRcdFx0XHR0aGlzLl90b2dnbGVEcm9wZG93bihmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuX3dpbmRvd1Jlc2l6ZWxpc3RlbmVyID0gdGhpcy5fdXBkYXRlU3RhdGUuYmluZCh0aGlzKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fd2luZG93UmVzaXplbGlzdGVuZXIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsZWFycyB0aGUgY29yZSBlbGVtZW50IG9mIHRoZSBNdWx0aVNlbGVjdCBpbnN0YW5jZS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9jbGVhckNvcmUoKSB7XG5cdFx0Y29uc3Qgc2VsZWN0TmFtZSA9IHRoaXMuX2NvcmVXcmFwcGVyLmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKCduYW1lJykudmFsdWU7XG5cdFx0Y29uc3Qgc2VsZWN0SWQgPSB0aGlzLl9jb3JlV3JhcHBlci5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbSgnaWQnKS52YWx1ZTtcblx0XHRpZiAoIXNlbGVjdE5hbWUgfHwgIXNlbGVjdElkKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1NlbGVjdCBlbGVtZW50IG11c3QgaGF2ZSBhdHRyaWJ1dGVzIG5hbWUgYW5kIGlkIGRlZmluZWQuJyk7XG5cdFx0fVxuXG5cdFx0Ly8gY2hhbmdlIElEIG9mIG5hdGl2ZSBzZWxlY3QgZWxlbWVudCBzbyBlbmhhbmNlZCBzZWxlY3QgZWxlbWVudCBkb2VzIG5vdCBoYXZlIHNhbWUgSURcblx0XHR0aGlzLl9jb3JlV3JhcHBlci5pZCA9IGAke3NlbGVjdElkfS1jb3JlYDtcblxuXHRcdGNvbnN0IGxhYmVsSWQgPSB1bmlxdWVJZCgnc2VsZWN0ZWQnKTtcblx0XHRjb25zdCBsYWJlbHMgPSBbLi4udGhpcy5fY29yZVdyYXBwZXIubGFiZWxzXS5tYXAoKGxhYmVsKSA9PiBsYWJlbC5pZCkuam9pbignICcpO1xuXHRcdHRoaXMubXVsdGlTZWxlY3RFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8ZGl2IGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2VuaGFuY2VkXCI+XG4gICAgPHVsXG4gICAgICAgICAgICBjbGFzcz1cIm8tbXVsdGktc2VsZWN0X19zZWxlY3RlZC1vcHRpb25zXCJcbiAgICAgICAgICAgIGlkPSR7bGFiZWxJZH1cbiAgICA+PC91bD5cbiAgICA8ZGl2IGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2NvbWJvYm94LXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2NvbWJvYm94XCJcbiAgICAgICAgICAgICAgICBpZD1cIiR7c2VsZWN0SWR9XCJcblx0XHRcdFx0XHRcdFx0XHRuYW1lPSR7c2VsZWN0TmFtZX1cbiAgICAgICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD1cIlwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwiJHtsYWJlbHN9ICR7bGFiZWxJZH1cIlxuICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJsaXN0Ym94XCJcbiAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgIGFyaWEtb3ducz1cIm8tbXVsdGktc2VsZWN0LWxpc3Rib3hcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiby1tdWx0aS1zZWxlY3RfX2NvbWJvYm94LXRleHRcIj4gQ2xpY2sgdG8gc2VsZWN0IG9wdGlvbnMgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cIm8tbXVsdGktc2VsZWN0X19kcm9wZG93bi1tZW51XCJcbiAgICAgICAgICAgIGlkPVwiby1tdWx0aS1zZWxlY3QtbGlzdGJveFwiXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwibXVsdGkgc2VsZWN0IG9wdGlvbnNcIlxuICAgICAgICAgICAgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJ0cnVlXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgID48L2Rpdj5cbjwvZGl2PlxuYCk7XG5cdFx0dGhpcy5fY29yZVdyYXBwZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBjb3JlIHNlbGVjdCBlbGVtZW50IGZyb20gdGhlIG11bHRpIHNlbGVjdCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBjb3JlIHdyYXBwZXIgSFRNTCBFbGVtZW50LlxuXHQgKi9cblx0X2dldENvcmVXcmFwcGVyKCkge1xuXHRcdGNvbnN0IGNvcmVXcmFwcGVyID0gdGhpcy5tdWx0aVNlbGVjdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFx0XHRcInNlbGVjdFwiXG5cdFx0KTtcblxuXHRcdGlmIChjb3JlV3JhcHBlci5sZW5ndGggPiAxKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09ubHkgb25lIHNlbGVjdCBlbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgZm9yIG8tbXVsdGktc2VsZWN0Jyk7XG5cdFx0fVxuXHRcdGlmIChjb3JlV3JhcHBlci5sZW5ndGggPT09IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignQSBzZWxlY3QgZWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIGluIG8tbXVsdGktc2VsZWN0Jyk7XG5cdFx0fVxuXHRcdHJldHVybiBjb3JlV3JhcHBlclswXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIG8tbXVsdGktc2VsZWN0IGNvbXBvbmVudC9zLlxuXHQgKlxuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxzdHJpbmcpfSByb290RWxlbWVudCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW5pdGlhbGlzZSB0aGUgY29tcG9uZW50IGluLCBvciBhIENTUyBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50ICh7bXVsdGlzZWxlY3RPcHRpb25zOiBbJ29wdGlvbjEnLCAnb3B0aW9uMiddfSlcblx0ICogQHJldHVybnMge011bHRpU2VsZWN0fE11bHRpU2VsZWN0W119IFRoZSBuZXdseSBjb25zdHJ1Y3RlZCBNdWx0aVNlbGVjdCBjb21wb25lbnRzXG5cdCAqL1xuXHRzdGF0aWMgaW5pdChyb290RWxlbWVudCwgb3B0aW9ucykge1xuXHRcdGlmICghcm9vdEVsZW1lbnQpIHtcblx0XHRcdHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCEocm9vdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWxlbWVudCk7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiZcblx0XHRcdHJvb3RFbGVtZW50Lm1hdGNoZXMoJ1tkYXRhLW8tY29tcG9uZW50PW8tbXVsdGktc2VsZWN0XScpXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gbmV3IE11bHRpU2VsZWN0KHJvb3RFbGVtZW50LCBvcHRpb25zKTtcblx0XHR9XG5cdFx0cmV0dXJuIEFycmF5LmZyb20oXG5cdFx0XHRyb290RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tbXVsdGktc2VsZWN0XCJdJyksXG5cdFx0XHRyb290RWwgPT4gbmV3IE11bHRpU2VsZWN0KHJvb3RFbCwgb3B0aW9ucylcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIG9wdGlvbnMgZnJvbSB0aGUgY29yZSBzZWxlY3QgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIG11bHRpLXNlbGVjdCBvcHRpb25zLlxuXHQgKi9cblx0X2dldENvcmVPcHRpb25zKCkge1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9jb3JlV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKTtcblx0XHR0aGlzLl9jb3JlT3B0aW9ucyA9IG9wdGlvbnM7XG5cdFx0cmV0dXJuIFsuLi5vcHRpb25zXS5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLmlubmVyVGV4dCk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIHdpbmRvdyBldmVudCBsaXN0ZW5lcnMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fd2luZG93UmVzaXplbGlzdGVuZXIpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE11bHRpU2VsZWN0O1xuIiwiY2xhc3MgSW5wdXQge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtlbGVtZW50XSAtIEFuIGlucHV0IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKi9cblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdHRoaXMuaW5wdXQgPSBlbGVtZW50O1xuXHRcdHRoaXMucGFyZW50ID0gZWxlbWVudC5jbG9zZXN0KCcuby1mb3Jtcy1pbnB1dCcpO1xuXG5cdFx0dGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG5cdFx0dGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMpO1xuXG5cdFx0dGhpcy5jbGFzc05hbWUgPSB7XG5cdFx0XHRpbnZhbGlkOiAnby1mb3Jtcy1pbnB1dC0taW52YWxpZCcsXG5cdFx0XHR2YWxpZDogJ28tZm9ybXMtaW5wdXQtLXZhbGlkJ1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogRXZlbnQgSGFuZGxlclxuXHQgKlxuXHQgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgZXZlbnQgZW1pdHRlZCBieSBlbGVtZW50L3dpbmRvdyBpbnRlcmFjdGlvbnNcblx0ICovXG5cdGhhbmRsZUV2ZW50KGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdibHVyJyB8fCBldmVudC50eXBlID09PSAnaW5wdXQnKSB7XG5cdFx0XHR0aGlzLnZhbGlkYXRlKGV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSW5wdXQgdmFsaWRhdGlvblxuXHQgKiBDb25kaXRpb25zIGZvciBpbnB1dCB2YWxpZGF0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7Rm9jdXNFdmVudH0gZXZlbnQgW10gLSBUaGUgZXZlbnQgd2hpY2ggaGFzIGNhdXNlZCByZS12YWxpZGF0aW9uLlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBpcyB0aGUgaW5wdXQgdmFsaWQ/XG5cdCAqL1xuXHR2YWxpZGF0ZShldmVudCkge1xuXHRcdGlmICghdGhpcy5wYXJlbnQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyB2YWxpZGF0ZSBkYXRlIGlucHV0XG5cdFx0aWYgKHRoaXMucGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnby1mb3Jtcy1pbnB1dC0tZGF0ZScpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdmFsaWRhdGVEYXRlKGV2ZW50KTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuaW5wdXQudmFsaWRpdHkudmFsaWQpIHtcblx0XHRcdHRoaXMuX3RvZ2dsZVBhcmVudENsYXNzZXMoXCJpbnZhbGlkXCIpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0fSBlbHNlIGlmICh0aGlzLmlucHV0LnZhbGlkaXR5LnZhbGlkICYmIHRoaXMucGFyZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzTmFtZS5pbnZhbGlkKSkge1xuXHRcdFx0dGhpcy5fdG9nZ2xlUGFyZW50Q2xhc3NlcyhcInZhbGlkXCIpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblxuXHQvKipcblx0ICogRGF0ZSBpbnB1dCB2YWxpZGF0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7Rm9jdXNFdmVudH0gZXZlbnQgW10gLSBUaGUgZXZlbnQgd2hpY2ggaGFzIGNhdXNlZCByZS12YWxpZGF0aW9uLlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBpcyB0aGUgaW5wdXQgdmFsaWQ/XG5cdCAqL1xuXHRfdmFsaWRhdGVEYXRlKGV2ZW50KSB7XG5cdFx0Y29uc3QgZGF5ID0gdGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvcignaW5wdXQuby1mb3Jtcy1pbnB1dF9fZGF5LXBhcnQnKTtcblx0XHRjb25zdCBtb250aCA9IHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Lm8tZm9ybXMtaW5wdXRfX21vbnRoLXBhcnQnKTtcblx0XHRjb25zdCB5ZWFyID0gdGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvcignaW5wdXQuby1mb3Jtcy1pbnB1dF9feWVhci1wYXJ0Jyk7XG5cblx0XHRjb25zdCBkYXRlSW5wdXRzID0gW2RheSwgbW9udGgsIHllYXJdLmZpbHRlcihCb29sZWFuKTtcblxuXHRcdGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSBldmVudCAmJiBldmVudC5yZWxhdGVkVGFyZ2V0ID8gZXZlbnQucmVsYXRlZFRhcmdldCA6IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0Y29uc3QgZm9jdXNPbkRhdGVJbnB1dCA9IGRhdGVJbnB1dHMuaW5jbHVkZXMoYWN0aXZlRWxlbWVudCk7XG5cblx0XHRjb25zdCBpbnZhbGlkRGF0ZUlucHV0QXR0ZW1wdCA9IGRhdGVJbnB1dHMuZmluZChpbnB1dCA9PiB7XG5cdFx0XHRyZXR1cm4gIWZvY3VzT25EYXRlSW5wdXQgJiYgIWlucHV0LnZhbGlkaXR5LnZhbGlkO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZW50aXJlRGF0ZVZhbGlkID0gZGF0ZUlucHV0cy5ldmVyeShpbnB1dCA9PiBpbnB1dC52YWxpZGl0eS52YWxpZCk7XG5cdFx0aWYoZW50aXJlRGF0ZVZhbGlkKSB7XG5cdFx0XHR0aGlzLl90b2dnbGVQYXJlbnRDbGFzc2VzKFwidmFsaWRcIik7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBEbyBub3Qgc2V0IHZhbGlkaXR5IGNsYXNzZXMgYmVmb3JlIHRoZSB1c2VyXG5cdFx0Ly8gaGFzIG1vdmVkIG9uIGZyb20gdGhlIGRhdGUgZmllbGQuXG5cdFx0aWYgKGludmFsaWREYXRlSW5wdXRBdHRlbXB0KSB7XG5cdFx0XHR0aGlzLl90b2dnbGVQYXJlbnRDbGFzc2VzKFwiaW52YWxpZFwiKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRfdG9nZ2xlUGFyZW50Q2xhc3NlcyhzdGF0ZSkge1xuXHRcdGlmIChzdGF0ZSA9PT0gXCJ2YWxpZFwiICkge1xuXHRcdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzTmFtZS5pbnZhbGlkKTtcblx0XHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWUudmFsaWQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLnZhbGlkKTtcblx0XHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWUuaW52YWxpZCk7XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzKTtcblx0XHR0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcyk7XG5cdFx0dGhpcy5pbnB1dCA9IG51bGw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXQ7XG4iLCJjbGFzcyBTdGF0ZSB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICpcblx0ICogQHBhcmFtIHtSYWRpb05vZGVMaXN0fSBbaW5wdXRzXSAtIEEgTm9kZUxpc3Qgb2YgcmFkaW8gaW5wdXQgZWxlbWVudHNcblx0ICogQHBhcmFtIHtib29sZWFuIHwgb2JqZWN0fSBvcHRzIC0gYW4gb2JqZWN0IG9mIG9wdGlvbnNcblx0ICogQHBhcmFtIHtzdHJpbmd9IG9wdHMuaWNvbk9ubHkgW251bGxdIC0gd2hlbiB0cnVlIGRpc3BsYXkgYW4gaWNvbiBvbmx5LCBoaWRpbmcgdGhlIHN0YXR1cyBsYWJlbFxuXHQgKi9cblx0Y29uc3RydWN0b3IoaW5wdXRzLCBvcHRzKSB7XG5cdFx0Y29uc3QgcmFkaW9JbnB1dHMgPSBpbnB1dHMgaW5zdGFuY2VvZiBSYWRpb05vZGVMaXN0O1xuXHRcdGlmIChyYWRpb0lucHV0cykge1xuXHRcdFx0dGhpcy5pbnB1dHMgPSBpbnB1dHM7XG5cdFx0XHR0aGlzLnBhcmVudCA9IHRoaXMuaW5wdXRzWzBdLmNsb3Nlc3QoJy5vLWZvcm1zLWlucHV0Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignU3RhdGUgY2FuIG9ubHkgYmUgYXBwbGllZCB0byBgcmFkaW9gIHR5cGUgaW5wdXRzLicpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3ZlcmlmeSgpO1xuXHRcdHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0aWNvbk9ubHk6IGZhbHNlXG5cdFx0fSwgb3B0cyk7XG5cblx0XHR0aGlzLmNsYXNzTmFtZSA9IHtcblx0XHRcdHNhdmluZzogJ28tZm9ybXMtaW5wdXQtLXNhdmluZycsXG5cdFx0XHRzYXZlZDogJ28tZm9ybXMtaW5wdXQtLXNhdmVkJ1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHN0YXRlIGVsZW1lbnRcblx0ICpcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVTdGF0ZUVsKCkge1xuXHRcdHRoaXMuc3RhdGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRjb25zdCBjbGFzc05hbWVzID0gdGhpcy5vcHRzLmljb25Pbmx5ID8gWydvLWZvcm1zLWlucHV0X19zdGF0ZScsICdvLWZvcm1zLWlucHV0X19zdGF0ZS0taWNvbi1vbmx5J10gOiBbJ28tZm9ybXMtaW5wdXRfX3N0YXRlJ107XG5cdFx0IHRoaXMuc3RhdGVFbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuXHRcdHRoaXMucGFyZW50LmFwcGVuZCh0aGlzLnN0YXRlRWwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXRlIHNldHRlclxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgdHlwZSBvZiBzdGF0ZSB0byBkaXNwbGF5XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBjdXN0b21pc2UgdGhlIGxhYmVsIG9mIHRoZSBzdGF0ZSwgZS5nLiB0aGUgc2F2ZWQgc3RhdGUgZGVmYXVsdHMgdG8gXCJTYXZpbmdcIiBidXQgY291bGQgYmUgXCJTZW50XCJcblx0ICovXG5cdHNldChzdGF0ZSwgbGFiZWwpIHtcblx0XHRpZiAoIXRoaXMuc3RhdGVFbCkge1xuXHRcdFx0dGhpcy5fZ2VuZXJhdGVTdGF0ZUVsKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlID09PSAnc2F2aW5nJykge1xuXHRcdFx0dGhpcy5fc2F2aW5nKGxhYmVsKTtcblx0XHR9IGVsc2UgaWYgKHN0YXRlID09PSAnc2F2ZWQnKSB7XG5cdFx0XHR0aGlzLl9zYXZlZChsYWJlbCk7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZSA9PT0gJ25vbmUnKSB7XG5cdFx0XHR0aGlzLl9yZW1vdmUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGAke3N0YXRlfSBpcyBub3QgYSByZWNvZ25pc2VkIHN0YXRlLCB0aGUgb3B0aW9ucyBhcmUgJ3NhdmluZycsICdzYXZlZCcgb3IgJ25vbmUnLmApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTYXZpbmcgc3RhdGVcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIC0gdGhlIGNvcHkgd2hlbiBzYXZpbmdcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfc2F2aW5nKGxhYmVsKSB7XG5cdFx0Ly8gUmVtb3ZlIG90aGVyIHN0YXRlIGNsYXNzZXMuXG5cdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzTmFtZS5zYXZlZCk7XG5cdFx0Ly8gQWRkIHNhdmluZyBzdGF0ZSBjbGFzcy5cblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lLnNhdmluZyk7XG5cdFx0Ly8gQWRkIGN1c3RvbSBzdGF0ZSBsYWJlbCBpZiBnaXZlbi5cblx0XHQvLyBEZWZhdWx0IGxhYmVsIGNvcHkgaXMgYWRkZWQgdmlhIHRoZSBDU1MgYGNvbnRlbnRgIGF0dHJpYnV0ZS5cblx0XHR0aGlzLnN0YXRlRWwuY2xhc3NMaXN0LnRvZ2dsZSgnby1mb3Jtcy1pbnB1dF9fc3RhdGUtLWN1c3RvbScsIEJvb2xlYW4obGFiZWwpKTtcblx0XHR0aGlzLnN0YXRlRWwudGV4dENvbnRlbnQgPSBsYWJlbCAmJiAhdGhpcy5vcHRzLmljb25Pbmx5ID8gbGFiZWwgOiAnJztcblx0XHQvLyBXaGVuIGljb24tb25seSBpcyBzZXQgdGhlcmUgaXMgbm8gY29weSB3aGVuIGdpdmVuIGEgY3VzdG9tIGxhYmVsIHNvXG5cdFx0Ly8gYWRkIGFuIGFyaWEgbGFiZWwuXG5cdFx0dGhpcy5zdGF0ZUVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGxhYmVsIHx8ICdTYXZpbmcnKTtcblx0XHR0aGlzLnN0YXRlRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3N0YXR1cycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNhdmVkIHN0YXRlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCAtIHRoZSBjb3B5IHdoZW4gc2F2ZWRcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqL1xuXHRfc2F2ZWQobGFiZWwpIHtcblx0XHQvLyBSZW1vdmUgb3RoZXIgc3RhdGUgY2xhc3Nlcy5cblx0XHR0aGlzLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lLnNhdmluZyk7XG5cdFx0Ly8gQWRkIHNhdmVkIHN0YXRlIGNsYXNzLlxuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWUuc2F2ZWQpO1xuXHRcdC8vIEFkZCBjdXN0b20gc3RhdGUgbGFiZWwgaWYgZ2l2ZW4uXG5cdFx0Ly8gRGVmYXVsdCBsYWJlbCBjb3B5IGlzIGFkZGVkIHZpYSB0aGUgQ1NTIGBjb250ZW50YCBhdHRyaWJ1dGUuXG5cdFx0dGhpcy5zdGF0ZUVsLmNsYXNzTGlzdC50b2dnbGUoJ28tZm9ybXMtaW5wdXRfX3N0YXRlLS1jdXN0b20nLCBCb29sZWFuKGxhYmVsKSk7XG5cdFx0dGhpcy5zdGF0ZUVsLnRleHRDb250ZW50ID0gbGFiZWwgJiYgIXRoaXMub3B0cy5pY29uT25seSA/IGxhYmVsIDogJyc7XG5cdFx0Ly8gV2hlbiBpY29uLW9ubHkgaXMgc2V0IHRoZXJlIGlzIG5vIGNvcHkgd2hlbiBnaXZlbiBhIGN1c3RvbSBsYWJlbCBzb1xuXHRcdC8vIGFkZCBhbiBhcmlhIGxhYmVsLlxuXHRcdHRoaXMuc3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCB8fCAnU2F2ZWQnKTtcblx0XHR0aGlzLnN0YXRlRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3N0YXR1cycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBzdGF0ZVxuXHQgKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9yZW1vdmUoKSB7XG5cdFx0dGhpcy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzTmFtZS5zYXZpbmcpO1xuXHRcdHRoaXMucGFyZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWUuc2F2ZWQpO1xuXHRcdHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMuc3RhdGVFbCk7XG5cdFx0dGhpcy5zdGF0ZUVsID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBWZXJpZnkgaW5wdXQgcGFyZW50XG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0X3ZlcmlmeSgpIHtcblx0XHRpZiAoIXRoaXMucGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnby1mb3Jtcy1pbnB1dC0tcmFkaW8tYm94JykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignU3RhdGUgY2FuIG9ubHkgYmUgc2V0IG9uIHJhZGlvIGlucHV0cyB3aXRoIGEgYm94IHN0eWxlIChvLWZvcm1zLWlucHV0LS1yYWRpby1ib3gpLicpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCcuby1mb3Jtcy0taW5wdXQtaW52YWxpZCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIGNhbm5vdCBiZSBzZXQgb24gYW4gaW52YWxpZCBpbnB1dCBmaWVsZC4nKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG4iLCIvKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IEVycm9yU3VtbWFyeUVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7SFRNTElucHV0RWxlbWVudH0gZWxlbWVudCAtIHRoZSBhc3NvY2lhdGVkIGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpZCAtIHRoZSBpbnB1dCBlbGVtZW50J3MgaWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gdmFsaWQgLSB3YXMgdGhlIHVzZXIncyB2YWx1ZSB2YWxpZD9cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nPX0gZXJyb3IgLSB0aGUgZXJyb3IgbWVzc2FnZSBmb3IgdGhpcyBlbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50PX0gZmllbGQgLSBhIGNvbnRhaW5pbmcgby1mb3Jtcy1maWVsZCBlbGVtZW50XG4gKiBAcHJvcGVydHkge0hUTUxMYWJlbEVsZW1lbnR9IGxhYmVsIC0gYW4gYXNzb2NpYXRlZCBsYWJlbCBlbGVtZW50XG4gKi9cblxuY2xhc3MgRXJyb3JTdW1tYXJ5IHtcblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5PEVycm9yU3VtbWFyeUVsZW1lbnQ+fSBbZWxlbWVudHNdIC0gQW4gYXJyYXkgb2Ygb2JqZWN0cywgd2hlcmUgZWFjaCBvYmplY3QgZGVzY3JpYmVzIGFuIGludmFsaWQgaW5wdXQgZWxlbWVudFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2hlYWRpbmdNZXNzYWdlPSdUaGVyZSBpcyBhIHByb2JsZW0nXSAtIEEgbWVzc2FnZSB0byBzaG93IGluIHRoZSBoZWFkZXIuIEl0IGRlZmF1bHRzIHRvOiAnVGhlcmUgaXMgYSBwcm9ibGVtJ1xuXHQgKiBAZXhhbXBsZVxuXHQgKlx0Y29uc3QgZWxlbWVudHNFeGFtcGxlID0gW1xuXHQgKlx0XHR7XG5cdCAqXHRcdFx0aWQ6ICd0ZXh0LWlucHV0Jyxcblx0ICpcdFx0XHR2YWxpZDogZmFsc2UsXG5cdCAqXHRcdFx0ZXJyb3I6ICdQbGVhc2UgZmlsbCBvdXQgdGhpcyBmaWVsZCcsXG5cdCAqXHRcdFx0bGFiZWw6ICdJbnB1dCBMYWJlbCcsXG5cdCAqXHRcdFx0ZWxlbWVudDogPEVsZW1lbnQgLz4sXG5cdCAqXHRcdH0sXG5cdCAqXHRcdHsuLi59LFxuXHQgKlx0XTtcblx0ICpcdG5ldyBFcnJvclN1bW1hcnkoZXhhbXBsZSwgJ1RoaXMgaXMgYSBoZWFkaW5nIG1lc3NhZ2UnKVxuXHQgKi9cblx0Y29uc3RydWN0b3IoZWxlbWVudHMsIGhlYWRpbmdNZXNzYWdlKSB7XG5cdFx0dGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzO1xuXHRcdHRoaXMuaGVhZGluZ01lc3NhZ2UgPSBoZWFkaW5nTWVzc2FnZSB8fCAnVGhlcmUgaXMgYSBwcm9ibGVtJztcblx0XHRjb25zdCBoYXNBbkludmVyc2VGaWVsZCA9IGVsZW1lbnRzLnNvbWUoZWxlbSA9PiB7XG5cdFx0XHRpZiAoZWxlbS5maWVsZCkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5maWVsZC5jbGFzc0xpc3QuY29udGFpbnMoJ28tZm9ybXMtZmllbGQtLWludmVyc2UnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmludmVyc2UgPSBoYXNBbkludmVyc2VGaWVsZDtcblx0XHR0aGlzLmludmFsaWRJbnB1dHMgPSBbXTtcblxuXHRcdHJldHVybiB0aGlzLmNyZWF0ZVN1bW1hcnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBOb2RlIHRvIGhvbGQgbGlzdCBvZiBpbnZhbGlkIGlucHV0c1xuXHQgKlxuXHQgKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9IC0gYSBkaXYgZnVsbCBvZiBlcnJvciBtZXNzYWdlc1xuXHQgKi9cblx0Y3JlYXRlU3VtbWFyeSgpIHtcblx0XHRjb25zdCBpbnZhbGlkSW5wdXRzID0gdGhpcy5lbGVtZW50cy5maWx0ZXIoZSA9PiAhZS52YWxpZCk7XG5cblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuY2xhc3NMaXN0LmFkZCgnby1mb3Jtc19fZXJyb3Itc3VtbWFyeScpO1xuXHRcdGlmICh0aGlzLmludmVyc2UpIHtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdvLWZvcm1zX19lcnJvci1zdW1tYXJ5LS1pbnZlcnNlJyk7XG5cdFx0fVxuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWxsZWRieScsICdlcnJvci1zdW1tYXJ5Jyk7XG5cdFx0ZGl2LnNldEF0dHJpYnV0ZSgncm9sZScsICdhbGVydCcpO1xuXG5cdFx0ZGl2LmlubmVySFRNTCA9IGA8aDQgY2xhc3M9XCJvLWZvcm1zX19lcnJvci1zdW1tYXJ5X19oZWFkaW5nXCIgaWQ9XCJlcnJvci1zdW1tYXJ5XCI+JHt0aGlzLmhlYWRpbmdNZXNzYWdlfTwvaDQ+YDtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoRXJyb3JTdW1tYXJ5LmNyZWF0ZUxpc3QoaW52YWxpZElucHV0cykpO1xuXHRcdHJldHVybiBkaXY7XG5cdH1cblxuXHQvKipcblx0ICogR2VuZXJhdGUgbGlzdCBvZiBhbmNob3JzXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXk8RXJyb3JTdW1tYXJ5RWxlbWVudD59IGlucHV0cyAtIGVsZW1lbnQgZGVzY3JpcHRvcnNcblx0ICogQHJldHVybnMge0hUTUxVTGlzdEVsZW1lbnR9IC0gdGhlIGxpc3Rcblx0ICovXG5cdHN0YXRpYyBjcmVhdGVMaXN0KGlucHV0cykge1xuXHRcdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXHRcdGxpc3QuY2xhc3NMaXN0LmFkZCgnby1mb3Jtc19fZXJyb3Itc3VtbWFyeV9fbGlzdCcpO1xuXHRcdGNvbnN0IGZpZWxkc0luVGhlTGlzdCA9IFtdO1xuXHRcdGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcblx0XHRcdC8vIEEgZmllbGQgbWF5IGNvbnRhaW4gbXVsdGlwbGUgaW52YWxpZCBpbnB1dHMuIEUuZy4gYSBkYXRlIGZpZWxkXG5cdFx0XHQvLyBoYXMgdGhyZWUgdGV4dCBpbnB1dHMgZm9yIGRheSwgbW9udGgsIGFuZCB5ZWFyLiBPbmx5IHNob3cgYVxuXHRcdFx0Ly8gZmllbGQgaW4gdGhlIGVycm9yIHN1bW1hcnkgb25jZSBpZiBpdCBoYXMgbXVsdGlwbGUgaW52YWxpZCBpbnB1dHNcblx0XHRcdGlmIChmaWVsZHNJblRoZUxpc3QuaW5jbHVkZXMoaW5wdXQuZmllbGQpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChpbnB1dC5maWVsZCkge1xuXHRcdFx0XHRmaWVsZHNJblRoZUxpc3QucHVzaChpbnB1dC5maWVsZCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBpbnZhbGlkIGlucHV0IGJ1dCB3aXRoIG5vIGxhYmVsIHRvIGNyZWF0ZSBhbiBlcnJvciBzdW1tYXJ5XG5cdFx0XHRpZiAoaW5wdXQudmFsaWQgPT09IGZhbHNlICYmICFpbnB1dC5sYWJlbCkge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0YENvdWxkIG5vdCBhZGQgYW4gaW52YWxpZCBpbnB1dCB0byB0aGUgZXJyb3Igc3VtbWFyeS4gYCArXG5cdFx0XHRcdFx0XHRgQ2hlY2sgdGhlIGlucHV0IGhhcyBhIHBhcmVudCBcXGBvLWZvcm1zLWZpZWxkXFxgIGVsZW1lbnQgd2l0aCBjb3JyZWN0IHRpdGxlIG1hcmt1cC4gYCArXG5cdFx0XHRcdFx0XHRgT3IgZGlzYWJsZSB0aGUgZXJyb3Igc3VtbWFyeSBmZWF0dXJlIGZvciB0aGlzIGZvcm0gd2l0aCBcXGBkYXRhLW8tZm9ybXMtZXJyb3Itc3VtbWFyeT1cImZhbHNlXCJcXGAuYCxcblx0XHRcdFx0XHRpbnB1dC5lbGVtZW50XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBpbnZhbGlkIGlucHV0LCBhZGQgdG8gZXJyb3Igc3VtbWFyeVxuXHRcdFx0aWYgKGlucHV0LnZhbGlkID09PSBmYWxzZSAmJiBpbnB1dC5sYWJlbCkge1xuXHRcdFx0XHRjb25zdCBsaXN0SXRlbSA9IEVycm9yU3VtbWFyeS5jcmVhdGVJdGVtKGlucHV0KTtcblx0XHRcdFx0bGlzdC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZSBhbiBpdGVtIGZvciB0aGUgZXJyb3Igc3VtbWFyeVxuXHQgKlxuXHQgKiBAcGFyYW0ge29iamVjdH0gW2lucHV0XSAtIFRoZSBpbnB1dCBvYmplY3QgdG8gY29uc3RydWN0IGFuIGVycm9yIHN1bW1hcnkgaXRlbSBmb3Jcblx0ICogQHJldHVybnMge0VsZW1lbnR9IC0gbGlcblx0ICovXG5cdHN0YXRpYyBjcmVhdGVJdGVtKGlucHV0KSB7XG5cdFx0Y29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdvLWZvcm1zX19lcnJvci1zdW1tYXJ5X19pdGVtJyk7XG5cblx0XHQvLyBSZXR1cm4gYSBlcnJvciBzdW1tYXJ5IGl0ZW0gd2hpY2ggbGlua3MgdG8gdGhlIGlucHV0IGlmIGFuIGlkIGV4aXN0cy5cblx0XHRpZiAoaW5wdXQuaWQpIHtcblx0XHRcdGNvbnN0IGl0ZW1BbmNob3IgPSBFcnJvclN1bW1hcnkuY3JlYXRlQW5jaG9yKGlucHV0KTtcblx0XHRcdGl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUFuY2hvcik7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0Ly8gSWYgbm8gaWQgZXhpc3QgcmV0dXJuIGFuIGVycm9yIHN1bW1hcnkgaXRlbSB3aXRob3V0IGEgbGluay5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdGBDb3VsZCBub3QgbGluayB0byBhbiBpbnZhbGlkIGlucHV0IGZyb20gdGhlIGVycm9yIHN1bW1hcnkuIGAgK1xuXHRcdFx0XHRgQWRkIGEgdW5pcXVlIGlkIGF0dHJpYnV0ZSB0byB0aGUgaW5wdXQgZWxlbWVudC5gLFxuXHRcdFx0aW5wdXQuZWxlbWVudFxuXHRcdCk7XG5cblx0XHRpdGVtLmlubmVySFRNTCA9IEVycm9yU3VtbWFyeS5fZ2V0SXRlbUNvbnRlbnQoaW5wdXQpO1xuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlIGFuY2hvciBlbGVtZW50IHRvIHBvaW50IGF0IGludmFsaWQgaW5wdXRcblx0ICpcblx0ICogQHBhcmFtIHtvYmplY3R9IFtpbnB1dF0gLSBUaGUgaW5wdXQgb2JqZWN0IHRvIGNvbnN0cnVjdCBhbiBhbmNob3IgZm9yXG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fSAtIGFcblx0ICovXG5cdHN0YXRpYyBjcmVhdGVBbmNob3IoaW5wdXQpIHtcblx0XHRjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0YW5jaG9yLnNldEF0dHJpYnV0ZSgnaHJlZicsIGAjJHtpbnB1dC5pZH1gKTtcblx0XHRhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdCdjbGljaycsXG5cdFx0XHRmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpLmZvY3VzKCk7XG5cdFx0XHR9LmJpbmQoaW5wdXQpXG5cdFx0KTtcblx0XHRhbmNob3IuaW5uZXJIVE1MID0gRXJyb3JTdW1tYXJ5Ll9nZXRJdGVtQ29udGVudChpbnB1dCk7XG5cdFx0cmV0dXJuIGFuY2hvcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICogQHBhcmFtIHtOb2RlfSBpbnB1dCAtIFRoZSBpbnB1dCBlbGVtZW50IHdoaWNoIGhhcyBhbiBlcnJvclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSAtIHRoZSBodG1sIHRleHQgZm9yIGFuIGVycm9yIHN1bW1hcnkgaXRlbVxuXHQgKi9cblx0c3RhdGljIF9nZXRJdGVtQ29udGVudChpbnB1dCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQnPHNwYW4gY2xhc3M9XCJvLWZvcm1zX19lcnJvci1zdW1tYXJ5X19pdGVtLW92ZXJ2aWV3XCI+JyArXG5cdFx0XHRgJHtpbnB1dC5sYWJlbH08L3NwYW4+OiBgICtcblx0XHRcdGA8c3BhbiBjbGFzcz1cIm8tZm9ybXNfX2Vycm9yLXN1bW1hcnlfX2l0ZW0tZGV0YWlsXCI+JHtpbnB1dC5lcnJvcn08L3NwYW4+YFxuXHRcdCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXJyb3JTdW1tYXJ5O1xuIiwiaW1wb3J0IElucHV0IGZyb20gJy4vaW5wdXQuanMnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUuanMnO1xuaW1wb3J0IEVycm9yU3VtbWFyeSBmcm9tICcuL2Vycm9yLXN1bW1hcnkuanMnO1xuXG5jbGFzcyBGb3JtcyB7XG5cblx0LyoqXG5cdCAqIEB0eXBlZGVmIHtPYmplY3R9IEZvcm1zT3B0aW9ucyAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgZm9ybS5cblx0ICogQHByb3BlcnR5IHtib29sZWFufSBbZXJyb3JTdW1tYXJ5PXRydWVdIC0gRGlzcGxheSBhbiBlcnJvciBzdW1tYXJ5IGF0IHRoZSB0b3Agb2YgdGhlIGZvcm0gYXMgcGFydCBvZiBgby1mb3Jtc2AgdmFsaWRhdGlvbi5cblx0ICogQHByb3BlcnR5IHtib29sZWFufSBbcHJldmVudFN1Ym1pdD1mYWxzZV0gLSBQcmV2ZW50IGZvcm0gc3VibWlzc2lvbiBhZnRlciBgby1mcm9tc2AgdmFsaWRhdGlvbiDigJMgc2VlIHRoZSBgb0Zvcm1zLnN1Ym1pdGAgZXZlbnQgdG8gbWFudWFsbHkgc3VibWl0IHRoZSBmb3JtIGFmdGVyIHZhbGlkYXRpb24uIFRoaXMgZG9lcyBub3QgYXBwbHkgd2hlbiBgdXNlQnJvd3NlclZhbGlkYXRpb25gIGlzIHRydWUuXG5cdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3VzZUJyb3dzZXJWYWxpZGF0aW9uPWZhbHNlXSAtIERvIG5vdCB1c2UgYG8tZm9ybXNgIHZhbGlkYXRpb24sIHJlbHkgb24gdGhlIGJyb3dzZXIncyBidWlsdC1pbiB2YWxpZGF0aW9uIGluc3RlYWQuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAdHlwZWRlZiB7RXZlbnR9IEZvcm1zU3VibWl0RXZlbnQgLSBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIGJ5IHRoZSB1c2VyYW5kIGBvLWZvcm1zYCBoYXMgY29tcGxldGVkIHZhbGlkYXRpb24uXG5cdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBkZXRhaWwgLSBUaGUgZXZlbnQgZGV0YWlsLlxuXHQgKiBAcHJvcGVydHkge29iamVjdH0gZGV0YWlsLmluc3RhbmNlICAtIFRoZSBpbnN0YW5jZSBvZiBgby1mb3Jtc2AuXG5cdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGV0YWlsLnZhbGlkICAtIFRoZSB2YWxpZGl0eSBvZiB0aGUgYG8tZm9ybXNgIGluc3RhbmNlLlxuXHQgKi9cblxuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSB7SFRNTEZvcm1FbGVtZW50fSBbZm9ybUVsZW1lbnRdIC0gVGhlIGZvcm0gZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7Rm9ybXNPcHRpb25zfSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGZvcm1cblx0ICovXG5cdGNvbnN0cnVjdG9yKGZvcm1FbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0aWYgKCFmb3JtRWxlbWVudCB8fCBmb3JtRWxlbWVudC5ub2RlTmFtZSAhPT0gJ0ZPUk0nKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFtkYXRhLW8tY29tcG9uZW50PVwiby1mb3Jtc1wiXSBtdXN0IGJlIHNldCBvbiBhIGZvcm0gZWxlbWVudC4gSXQgaXMgY3VycmVudGx5IHNldCBvbiBhICcke2Zvcm1FbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCl9Jy5gKTtcblx0XHR9XG5cblx0XHR0aGlzLmZvcm0gPSBmb3JtRWxlbWVudDtcblx0XHR0aGlzLl9mb3JtSW5wdXRzQ2FjaGUgPSBBcnJheS5mcm9tKHRoaXMuZm9ybS5lbGVtZW50cywgZWxlbWVudCA9PiBuZXcgSW5wdXQoZWxlbWVudCkpO1xuXHRcdHRoaXMuc3RhdGVFbGVtZW50cyA9IFtdO1xuXG5cdFx0dGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0XHR1c2VCcm93c2VyVmFsaWRhdGlvbjogZmFsc2UsXG5cdFx0XHRwcmV2ZW50U3VibWl0OiBmYWxzZSxcblx0XHRcdGVycm9yU3VtbWFyeTogdHJ1ZVxuXHRcdH0sIG9wdGlvbnMgfHwgRm9ybXMuZ2V0RGF0YUF0dHJpYnV0ZXMoZm9ybUVsZW1lbnQpKTtcblxuXHRcdGlmKHRoaXMub3B0cy51c2VCcm93c2VyVmFsaWRhdGlvbiAmJiB0aGlzLm9wdHMucHJldmVudFN1Ym1pdCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgby1mb3JtcyBgcHJldmVudFN1Ym1pdGAgb3B0aW9uIG9ubHkgYXBwbGllcyB3aGVuIHRoZSBgdXNlQnJvd3NlclZhbGlkYXRpb25gIG9wdGlvbiBpcyBgZmFsc2VgLicpO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5vcHRzLnVzZUJyb3dzZXJWYWxpZGF0aW9uKSB7XG5cdFx0XHR0aGlzLmZvcm0uc2V0QXR0cmlidXRlKCdub3ZhbGlkYXRlJywgJycpO1xuXHRcdFx0dGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMpO1xuXHRcdFx0dGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ29Gb3Jtcy5zdWJtaXQnLCAoZSkgPT4ge1xuXHRcdFx0XHRpZihlLmRldGFpbC52YWxpZCAmJiAhdGhpcy5vcHRzLnByZXZlbnRTdWJtaXQpIHtcblx0XHRcdFx0XHR0aGlzLmZvcm0uc3VibWl0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmZvcm0ucmVtb3ZlQXR0cmlidXRlKCdub3ZhbGlkYXRlJyk7XG5cdFx0XHR0aGlzLnN1Ym1pdHMgPSB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW3R5cGU9c3VibWl0XScpO1xuXHRcdFx0dGhpcy5zdWJtaXRzLmZvckVhY2goc3VibWl0ID0+IHtcblx0XHRcdFx0c3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG5cdFx0XHRcdHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0Z2V0IGZvcm1JbnB1dHMoKSB7XG5cdFx0aWYoIXRoaXMuZm9ybSkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblx0XHRjb25zdCBmb3JtRWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMuZm9ybS5lbGVtZW50cyk7XG5cdFx0Y29uc3QgaW5wdXRzVG9SZW1vdmUgPSB0aGlzLl9mb3JtSW5wdXRzQ2FjaGUuZmlsdGVyKGlucHV0ID0+ICFmb3JtRWxlbWVudHMuaW5jbHVkZXMoaW5wdXQuaW5wdXQpKTtcblx0XHRjb25zdCBlbGVtZW50c1RvQWRkID0gZm9ybUVsZW1lbnRzLmZpbHRlcihlbGVtZW50ID0+ICF0aGlzLl9mb3JtSW5wdXRzQ2FjaGUuZmluZCgoaW5wdXQpID0+IGlucHV0LmlucHV0ID09PSBlbGVtZW50KSk7XG5cdFx0aW5wdXRzVG9SZW1vdmUuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5kZXN0cm95KCkpO1xuXHRcdHRoaXMuX2Zvcm1JbnB1dHNDYWNoZSA9IFtcblx0XHRcdC4uLnRoaXMuX2Zvcm1JbnB1dHNDYWNoZS5maWx0ZXIoaW5wdXQgPT4gIWlucHV0c1RvUmVtb3ZlLmluY2x1ZGVzKGlucHV0KSksXG5cdFx0XHQuLi5lbGVtZW50c1RvQWRkLm1hcChlbGVtZW50ID0+IG5ldyBJbnB1dChlbGVtZW50KSlcblx0XHRdO1xuXHRcdHJldHVybiB0aGlzLl9mb3JtSW5wdXRzQ2FjaGU7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBmb3JtRWxlbWVudC4gSWYgdGhlIGZvcm0gaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZm9ybUVsZW1lbnQgLSBUaGUgbWVzc2FnZSBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHJldHVybnMge09iamVjdC48c3RyaW5nLCBhbnk+fSAtIFRoZSBvcHRpb25zXG5cdCAqL1xuXHRzdGF0aWMgZ2V0RGF0YUF0dHJpYnV0ZXMoZm9ybUVsZW1lbnQpIHtcblx0XHRpZiAoIShmb3JtRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhmb3JtRWxlbWVudC5kYXRhc2V0KS5yZWR1Y2UoKG9wdGlvbnMsIGtleSkgPT4ge1xuXHRcdFx0Ly8gSWdub3JlIGRhdGEtby1jb21wb25lbnRcblx0XHRcdGlmIChrZXkgPT09ICdvQ29tcG9uZW50Jykge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnVpbGQgYSBjb25jaXNlIGtleSBhbmQgZ2V0IHRoZSBvcHRpb24gdmFsdWVcblx0XHRcdGNvbnN0IHNob3J0S2V5ID0ga2V5LnJlcGxhY2UoL15vTWVzc2FnZShcXHcpKFxcdyspJC8sIChtLCBtMSwgbTIpID0+IG0xLnRvTG93ZXJDYXNlKCkgKyBtMik7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGZvcm1FbGVtZW50LmRhdGFzZXRba2V5XTtcblxuXHRcdFx0Ly8gVHJ5IHBhcnNpbmcgdGhlIHZhbHVlIGFzIEpTT04sIG90aGVyd2lzZSBqdXN0IHNldCBpdCBhcyBhIHN0cmluZ1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9LCB7fSk7XG5cdH1cblxuXHQvKipcblx0ICogRXZlbnQgSGFuZGxlclxuXHQgKlxuXHQgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgLSBUaGUgZXZlbnQgZW1pdHRlZCBieSBlbGVtZW50L3dpbmRvdyBpbnRlcmFjdGlvbnNcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRoYW5kbGVFdmVudChldmVudCkge1xuXHRcdGNvbnN0IFJFVFVSTl9LRVkgPSAxMztcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJyB8fCBldmVudC50eXBlID09PSAna2V5ZG93bicgJiYgZXZlbnQua2V5ID09PSBSRVRVUk5fS0VZKSB7XG5cdFx0XHRpZiAodGhpcy5mb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy52YWxpZGF0ZUZvcm1JbnB1dHMoKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ3N1Ym1pdCcpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb25zdCBjaGVja2VkRWxlbWVudHMgPSB0aGlzLnZhbGlkYXRlRm9ybUlucHV0cygpO1xuXHRcdFx0Y29uc3QgZm9ybUludmFsaWQgPSBjaGVja2VkRWxlbWVudHMuc29tZShpbnB1dCA9PiBpbnB1dC52YWxpZCA9PT0gZmFsc2UpO1xuXG5cdFx0XHRpZiAoZm9ybUludmFsaWQpIHtcblx0XHRcdFx0Ly8gRGlzcGxheSBlcnJvciBzdW1tYXJ5LlxuXHRcdFx0XHRpZiAodGhpcy5vcHRzLmVycm9yU3VtbWFyeSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLnN1bW1hcnkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG5ld1N1bW1hcnkgPSBuZXcgRXJyb3JTdW1tYXJ5KGNoZWNrZWRFbGVtZW50cywgdGhpcy5vcHRzLmVycm9yU3VtbWFyeU1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0dGhpcy5mb3JtLnJlcGxhY2VDaGlsZChuZXdTdW1tYXJ5LCB0aGlzLnN1bW1hcnkpO1xuXHRcdFx0XHRcdFx0dGhpcy5zdW1tYXJ5ID0gbmV3U3VtbWFyeTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5zdW1tYXJ5ID0gdGhpcy5mb3JtLmluc2VydEJlZm9yZShuZXcgRXJyb3JTdW1tYXJ5KGNoZWNrZWRFbGVtZW50cywgdGhpcy5vcHRzLmVycm9yU3VtbWFyeU1lc3NhZ2UpLCB0aGlzLmZvcm0uZmlyc3RFbGVtZW50Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zdCBmaXJzdEVycm9yQW5jaG9yID0gdGhpcy5zdW1tYXJ5LnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRcdFx0XHRpZiAoZmlyc3RFcnJvckFuY2hvcikge1xuXHRcdFx0XHRcdFx0Zmlyc3RFcnJvckFuY2hvci5mb2N1cygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHtGb3Jtc1N1Ym1pdEV2ZW50fVxuXHRcdFx0ICovXG5cdFx0XHRjb25zdCBvRm9ybXNTdWJtaXRFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnb0Zvcm1zLnN1Ym1pdCcsIHtcblx0XHRcdFx0ZGV0YWlsOiB7XG5cdFx0XHRcdFx0aW5zdGFuY2U6IHRoaXMsXG5cdFx0XHRcdFx0dmFsaWQ6ICFmb3JtSW52YWxpZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdFx0XHRidWJibGVzOiB0cnVlXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuZm9ybS5kaXNwYXRjaEV2ZW50KG9Gb3Jtc1N1Ym1pdEV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRm9ybSB2YWxpZGF0aW9uXG5cdCAqIFZhbGlkYXRlcyBldmVyeSBlbGVtZW50IGluIHRoZSBmb3JtIGFuZCBjcmVhdGVzIGlucHV0IG9iamVjdHMgZm9yIHRoZSBlcnJvclxuXHRzdW1tYXJ5XG5cdCAqXG5cdCAqIEByZXR1cm5zIHtBcnJheTxpbXBvcnQoXCIuL2Vycm9yLXN1bW1hcnkuanNcIikuRXJyb3JTdW1tYXJ5RWxlbWVudD59IC0gbGlzdCBvZiBlbGVtZW50cyBmb3IgdGhlIGVycm9yIHN1bW1hcnlcblx0ICovXG5cdHZhbGlkYXRlRm9ybUlucHV0cygpIHtcblx0XHRyZXR1cm4gdGhpcy5mb3JtSW5wdXRzLm1hcChvRm9ybUlucHV0ID0+IHtcblx0XHRcdGNvbnN0IHZhbGlkID0gb0Zvcm1JbnB1dC52YWxpZGF0ZSgpO1xuXHRcdFx0Y29uc3QgaW5wdXQgPSBvRm9ybUlucHV0LmlucHV0O1xuXHRcdFx0Y29uc3QgZmllbGQgPSBpbnB1dC5jbG9zZXN0KCcuby1mb3Jtcy1maWVsZCcpO1xuXHRcdFx0Y29uc3QgbGFiZWxFbGVtZW50ID0gZmllbGQgPyBmaWVsZC5xdWVyeVNlbGVjdG9yKCcuby1mb3Jtcy10aXRsZV9fbWFpbicpIDogbnVsbDtcblx0XHRcdC8vIGxhYmVsIGlzIGFjdHVhbGx5IHRoZSBmaWVsZCB0aXRsZSwgbm90IGZvciBleGFtcGxlIHRoZSBsYWJlbCBvZiBhIHNpbmdsZSBjaGVja2JveC5cblx0XHRcdC8vIHRoaXMgaXMgdXNlZCB0byBnZW5lcmF0ZSBhbiBlcnJvciBzdW1tYXJ5XG5cdFx0XHRjb25zdCBsYWJlbCA9IGxhYmVsRWxlbWVudCA/IGxhYmVsRWxlbWVudC50ZXh0Q29udGVudCA6IG51bGw7XG5cdFx0XHRjb25zdCBlcnJvckVsZW1lbnQgPSBmaWVsZCA/IGZpZWxkLnF1ZXJ5U2VsZWN0b3IoJy5vLWZvcm1zLWlucHV0X19lcnJvcicpIDogbnVsbDtcblx0XHRcdGNvbnN0IGVycm9yID0gZXJyb3JFbGVtZW50ID8gZXJyb3JFbGVtZW50LnRleHRDb250ZW50IDogaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpZDogaW5wdXQuaWQsXG5cdFx0XHRcdHZhbGlkLFxuXHRcdFx0XHRlcnJvcjogIXZhbGlkID8gZXJyb3IgOiBudWxsLFxuXHRcdFx0XHRsYWJlbCxcblx0XHRcdFx0ZmllbGQsXG5cdFx0XHRcdGVsZW1lbnQ6IGlucHV0XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIElucHV0IHN0YXRlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZV0gLSBuYW1lIG9mIHRoZSBpbnB1dCBmaWVsZHMgdG8gYWRkIHN0YXRlIHRvXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbc3RhdGVdIC0gdHlwZSBvZiBzdGF0ZSB0byBhcHBseSDigJQgb25lIG9mICdzYXZpbmcnLCAnc2F2ZWQnLCAnbm9uZSdcblx0ICogQHBhcmFtIHtib29sZWFufG9iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IG9mIG9wdGlvbnMgZGlzcGxheSBhbiBpY29uIG9ubHkgd2hlbiB0cnVlLCBoaWRpbmcgdGhlIHN0YXR1cyBsYWJlbFxuXHQgKi9cblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIC0gbmFtZSBvZiB0aGUgaW5wdXQgZmllbGRzIHRvIGFkZCBzdGF0ZSB0b1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHR5cGUgb2Ygc3RhdGUgdG8gYXBwbHkg4oCUIG9uZSBvZiAnc2F2aW5nJywgJ3NhdmVkJywgJ25vbmUnXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gYW4gb2JqZWN0IG9mIG9wdGlvbnNcblx0ICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaWNvbkxhYmVsIFtudWxsXSAtIGN1c3RvbWlzZSB0aGUgbGFiZWwgb2YgdGhlIHN0YXRlLCBlLmcuIHRoZSBzYXZlZCBzdGF0ZSBkZWZhdWx0cyB0byBcIlNhdmluZ1wiIGJ1dCBjb3VsZCBiZSBcIlNlbnRcIlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaWNvbk9ubHkgW2ZhbHNlXSAtIHdoZW4gdHJ1ZSBkaXNwbGF5IGFuIGljb24gb25seSwgaGlkaW5nIHRoZSBzdGF0dXMgbGFiZWxcblx0ICovXG5cdHNldFN0YXRlKHN0YXRlLCBuYW1lLCBvcHRpb25zID0geyBpY29uTGFiZWw6IG51bGwsIGljb25Pbmx5OiBmYWxzZSB9KSB7XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyB8fCBvcHRpb25zID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVGhlIGBvcHRpb25zYCBhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuXHRcdH1cblxuXHRcdGxldCBvYmplY3QgPSB0aGlzLnN0YXRlRWxlbWVudHMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG5cdFx0aWYgKCFvYmplY3QpIHtcblx0XHRcdG9iamVjdCA9IHtcblx0XHRcdFx0bmFtZSxcblx0XHRcdFx0ZWxlbWVudDogbmV3IFN0YXRlKHRoaXMuZm9ybS5lbGVtZW50c1tuYW1lXSwgb3B0aW9ucylcblx0XHRcdH07XG5cblx0XHRcdHRoaXMuc3RhdGVFbGVtZW50cy5wdXNoKG9iamVjdCk7XG5cdFx0fVxuXHRcdG9iamVjdC5lbGVtZW50LnNldChzdGF0ZSwgb3B0aW9ucy5pY29uTGFiZWwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlc3Ryb3kgZm9ybSBpbnN0YW5jZVxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHRpZiAoIXRoaXMub3B0cy51c2VCcm93c2VyVmFsaWRhdGlvbikge1xuXHRcdFx0dGhpcy5mb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnN1Ym1pdHMuZm9yRWFjaChzdWJtaXQgPT4ge1xuXHRcdFx0XHRzdWJtaXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcblx0XHRcdFx0c3VibWl0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLmZvcm0gPSBudWxsO1xuXHRcdHRoaXMuX2Zvcm1JbnB1dHNDYWNoZS5mb3JFYWNoKGlucHV0ID0+IGlucHV0LmRlc3Ryb3koKSk7XG5cdFx0dGhpcy5fZm9ybUlucHV0c0NhY2hlID0gW107XG5cdFx0dGhpcy5zdGF0ZUVsZW1lbnRzID0gbnVsbDtcblx0XHR0aGlzLm9wdHMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgZm9ybSBjb21wb25lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50IHwgc3RyaW5nKX0gcm9vdEVsIC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbnRpYWxpc2UgYSBmb3JtIGluLCBvciBhIENTUyBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudFxuXHQgKiBAcGFyYW0ge29iamVjdH0gW29wdHM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBiYW5uZXJzXG5cdCAqIEByZXR1cm5zIHtGb3JtcyB8IEZvcm1zW119IC0gVGhlIG5ld2x5IGluc3RhbnRpYXRlZCBGb3JtIG9yIEZvcm1zXG5cdCAqL1xuXHRzdGF0aWMgaW5pdChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gbmV3IEZvcm1zKHJvb3RFbCwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1mb3Jtc1wiXScpLCByb290RWwgPT4gbmV3IEZvcm1zKHJvb3RFbCwgb3B0cykpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1zO1xuIiwiaW1wb3J0IG9Gb3JtcyBmcm9tICcuL3NyYy9qcy9mb3Jtcy5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRvRm9ybXMuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb0Zvcm1zO1xuIiwiaW1wb3J0IE11bHRpU2VsZWN0IGZyb20gJy4uLy4uL3NyYy9qcy9tdWx0aS1zZWxlY3QuanMnO1xuaW1wb3J0IG9Gb3JtcyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tZm9ybXMnO1xub0Zvcm1zLmluaXQoKTtcblxuY29uc3QgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuXHRNdWx0aVNlbGVjdC5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG59KTtcbiJdfQ==