function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;

  var __markAsModule = function __markAsModule(target) {
    return __defProp(target, "__esModule", {
      value: true
    });
  };

  var __commonJS = function __commonJS(cb, mod) {
    return function __require() {
      return mod || (0, cb[Object.keys(cb)[0]])((mod = {
        exports: {}
      }).exports, mod), mod.exports;
    };
  };

  var __reExport = function __reExport(target, module, desc) {
    if (module && _typeof(module) === "object" || typeof module === "function") {
      var _iterator = _createForOfIteratorHelper(__getOwnPropNames(module)),
          _step;

      try {
        var _loop = function _loop() {
          var key = _step.value;
          if (!__hasOwnProp.call(target, key) && key !== "default") __defProp(target, key, {
            get: function get() {
              return module[key];
            },
            enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable
          });
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return target;
  };

  var __toModule = function __toModule(module) {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {
      get: function get() {
        return module.default;
      },
      enumerable: true
    } : {
      value: module,
      enumerable: true
    })), module);
  }; // ../../node_modules/ftdomdelegate/browser.js


  var require_browser = __commonJS({
    "../../node_modules/ftdomdelegate/browser.js": function node_modulesFtdomdelegateBrowserJs(exports, module) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;

      function Delegate2(root) {
        this.listenerMap = [{}, {}];

        if (root) {
          this.root(root);
        }

        this.handle = Delegate2.prototype.handle.bind(this);
        this._removedListeners = [];
      }

      Delegate2.prototype.root = function (root) {
        var listenerMap = this.listenerMap;
        var eventType;

        if (this.rootElement) {
          for (eventType in listenerMap[1]) {
            if (listenerMap[1].hasOwnProperty(eventType)) {
              this.rootElement.removeEventListener(eventType, this.handle, true);
            }
          }

          for (eventType in listenerMap[0]) {
            if (listenerMap[0].hasOwnProperty(eventType)) {
              this.rootElement.removeEventListener(eventType, this.handle, false);
            }
          }
        }

        if (!root || !root.addEventListener) {
          if (this.rootElement) {
            delete this.rootElement;
          }

          return this;
        }

        this.rootElement = root;

        for (eventType in listenerMap[1]) {
          if (listenerMap[1].hasOwnProperty(eventType)) {
            this.rootElement.addEventListener(eventType, this.handle, true);
          }
        }

        for (eventType in listenerMap[0]) {
          if (listenerMap[0].hasOwnProperty(eventType)) {
            this.rootElement.addEventListener(eventType, this.handle, false);
          }
        }

        return this;
      };

      Delegate2.prototype.captureForType = function (eventType) {
        return ["blur", "error", "focus", "load", "resize", "scroll"].indexOf(eventType) !== -1;
      };

      Delegate2.prototype.on = function (eventType, selector, handler, useCapture) {
        var root;
        var listenerMap;
        var matcher;
        var matcherParam;

        if (!eventType) {
          throw new TypeError("Invalid event type: " + eventType);
        }

        if (typeof selector === "function") {
          useCapture = handler;
          handler = selector;
          selector = null;
        }

        if (useCapture === void 0) {
          useCapture = this.captureForType(eventType);
        }

        if (typeof handler !== "function") {
          throw new TypeError("Handler must be a type of Function");
        }

        root = this.rootElement;
        listenerMap = this.listenerMap[useCapture ? 1 : 0];

        if (!listenerMap[eventType]) {
          if (root) {
            root.addEventListener(eventType, this.handle, useCapture);
          }

          listenerMap[eventType] = [];
        }

        if (!selector) {
          matcherParam = null;
          matcher = matchesRoot.bind(this);
        } else if (/^[a-z]+$/i.test(selector)) {
          matcherParam = selector;
          matcher = matchesTag;
        } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
          matcherParam = selector.slice(1);
          matcher = matchesId;
        } else {
          matcherParam = selector;
          matcher = Element.prototype.matches;
        }

        listenerMap[eventType].push({
          selector: selector,
          handler: handler,
          matcher: matcher,
          matcherParam: matcherParam
        });
        return this;
      };

      Delegate2.prototype.off = function (eventType, selector, handler, useCapture) {
        var i;
        var listener;
        var listenerMap;
        var listenerList;
        var singleEventType;

        if (typeof selector === "function") {
          useCapture = handler;
          handler = selector;
          selector = null;
        }

        if (useCapture === void 0) {
          this.off(eventType, selector, handler, true);
          this.off(eventType, selector, handler, false);
          return this;
        }

        listenerMap = this.listenerMap[useCapture ? 1 : 0];

        if (!eventType) {
          for (singleEventType in listenerMap) {
            if (listenerMap.hasOwnProperty(singleEventType)) {
              this.off(singleEventType, selector, handler);
            }
          }

          return this;
        }

        listenerList = listenerMap[eventType];

        if (!listenerList || !listenerList.length) {
          return this;
        }

        for (i = listenerList.length - 1; i >= 0; i--) {
          listener = listenerList[i];

          if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
            this._removedListeners.push(listener);

            listenerList.splice(i, 1);
          }
        }

        if (!listenerList.length) {
          delete listenerMap[eventType];

          if (this.rootElement) {
            this.rootElement.removeEventListener(eventType, this.handle, useCapture);
          }
        }

        return this;
      };

      Delegate2.prototype.handle = function (event) {
        var i;
        var l;
        var type = event.type;
        var root;
        var phase;
        var listener;
        var returned;
        var listenerList = [];
        var target;
        var eventIgnore = "ftLabsDelegateIgnore";

        if (event[eventIgnore] === true) {
          return;
        }

        target = event.target;

        if (target.nodeType === 3) {
          target = target.parentNode;
        }

        if (target.correspondingUseElement) {
          target = target.correspondingUseElement;
        }

        root = this.rootElement;
        phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2);

        switch (phase) {
          case 1:
            listenerList = this.listenerMap[1][type];
            break;

          case 2:
            if (this.listenerMap[0] && this.listenerMap[0][type]) {
              listenerList = listenerList.concat(this.listenerMap[0][type]);
            }

            if (this.listenerMap[1] && this.listenerMap[1][type]) {
              listenerList = listenerList.concat(this.listenerMap[1][type]);
            }

            break;

          case 3:
            listenerList = this.listenerMap[0][type];
            break;
        }

        var toFire = [];
        l = listenerList.length;

        while (target && l) {
          for (i = 0; i < l; i++) {
            listener = listenerList[i];

            if (!listener) {
              break;
            }

            if (target.tagName && ["button", "input", "select", "textarea"].indexOf(target.tagName.toLowerCase()) > -1 && target.hasAttribute("disabled")) {
              toFire = [];
            } else if (listener.matcher.call(target, listener.matcherParam, target)) {
              toFire.push([event, target, listener]);
            }
          }

          if (target === root) {
            break;
          }

          l = listenerList.length;
          target = target.parentElement || target.parentNode;

          if (target instanceof HTMLDocument) {
            break;
          }
        }

        var ret;

        for (i = 0; i < toFire.length; i++) {
          if (this._removedListeners.indexOf(toFire[i][2]) > -1) {
            continue;
          }

          returned = this.fire.apply(this, toFire[i]);

          if (returned === false) {
            toFire[i][0][eventIgnore] = true;
            toFire[i][0].preventDefault();
            ret = false;
            break;
          }
        }

        return ret;
      };

      Delegate2.prototype.fire = function (event, target, listener) {
        return listener.handler.call(target, event, target);
      };

      function matchesTag(tagName, element) {
        return tagName.toLowerCase() === element.tagName.toLowerCase();
      }

      function matchesRoot(selector, element) {
        if (this.rootElement === window) {
          return element === document || element === document.documentElement || element === window;
        }

        return this.rootElement === element;
      }

      function matchesId(id, element) {
        return id === element.id;
      }

      Delegate2.prototype.destroy = function () {
        this.off();
        this.root();
      };

      var _default = Delegate2;
      exports.default = _default;
      module.exports = exports.default;
    }
  }); // src/js/Tables/BaseTable.js


  var import_ftdomdelegate = __toModule(require_browser());

  function append(tbody, rowBatch) {
    if (tbody.append) {
      tbody.append.apply(tbody, _toConsumableArray(rowBatch));
    } else {
      rowBatch.forEach(function (row) {
        return tbody.appendChild(row);
      });
    }
  }

  function prepend(tbody, rowBatch) {
    if (tbody.prepend) {
      tbody.prepend.apply(tbody, _toConsumableArray(rowBatch));
    } else {
      rowBatch.reverse().forEach(function (row) {
        tbody.insertBefore(row, tbody.firstChild);
      });
    }
  }

  var BaseTable = /*#__PURE__*/function () {
    "use strict";

    function BaseTable(rootEl, sorter2) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, BaseTable);

      this._listeners = [];
      this._sorter = sorter2;
      this.rootEl = rootEl;
      this._opts = Object.assign({
        sortable: this.rootEl.getAttribute("data-o-table-sortable") !== "false",
        preferredSortOrder: this.rootEl.getAttribute("data-o-table-preferred-sort-order")
      }, opts);
      this.thead = this.rootEl.querySelector("thead");
      this.tbody = this.rootEl.querySelector("tbody");
      this.tableCaption = this.rootEl.querySelector("caption");
      this.tableHeaders = this.thead ? Array.from(this.thead.querySelectorAll("tr:last-of-type > th")) : [];
      this.tableRows = this.tbody ? Array.from(this.tbody.getElementsByTagName("tr")) : [];
      this._filteredTableRows = [];
      this.wrapper = this.rootEl.closest(".o-table-scroll-wrapper");
      this.container = this.rootEl.closest(".o-table-container");
      this.overlayWrapper = this.rootEl.closest(".o-table-overlay-wrapper");
      this.filterContainer = this.wrapper || this.container;
      this._updateTableHeightListenerSet = false;
      this._currentSort = null;
      this._currentFilter = null;
      window.setTimeout(this._setupFilters.bind(this), 0);
    }

    _createClass(BaseTable, [{
      key: "_setupFilters",
      value: function _setupFilters() {
        var tableId = this.rootEl.getAttribute("id");

        if (!tableId) {
          return;
        }

        var filter = window.document.querySelector("[data-o-table-filter-id=\"".concat(tableId, "\"]"));

        if (!filter) {
          return;
        }

        if (!this.filterContainer) {
          console.warn("Could not setup the filter for the table \"".concat(tableId, "\" as markup is missing. A filterable table must be within a div with class \"o-table-container\"."));
          return;
        }

        var filterColumn = parseInt(filter.getAttribute("data-o-table-filter-column"), 10);

        if (isNaN(filterColumn)) {
          console.warn("Could not setup the filter for the table \"".concat(tableId, "\" as no column index was given to filter on. Add a `data-o-table-filter-column=\"{columnIndex}\"` attribute to the filter."), filter);
          return;
        }

        if (filter.value) {
          this.filter(filterColumn, filter.value);
        }

        var pendingFilterTimeout;

        var debouncedFilterHandler = function (event) {
          if (pendingFilterTimeout) {
            clearTimeout(pendingFilterTimeout);
          }

          pendingFilterTimeout = setTimeout(function () {
            this.filter(filterColumn, event.target.value || "");
            pendingFilterTimeout = null;
          }.bind(this), 33);
        }.bind(this);

        filter.addEventListener("input", debouncedFilterHandler);
        filter.addEventListener("change", debouncedFilterHandler);

        this._listeners.push({
          element: filter,
          debouncedFilterHandler: debouncedFilterHandler,
          type: "input"
        });

        this._listeners.push({
          element: filter,
          debouncedFilterHandler: debouncedFilterHandler,
          type: "change"
        });
      }
    }, {
      key: "updateRows",
      value: function updateRows() {
        var rows = this._getLatestRowNodes();

        this.tableRows = rows;

        if (this._currentSort) {
          var _this$_currentSort = this._currentSort,
              columnIndex = _this$_currentSort.columnIndex,
              sortOrder = _this$_currentSort.sortOrder;
          this.sortRowsByColumn(columnIndex, sortOrder);
        }

        if (this._currentFilter) {
          var _this$_currentFilter = this._currentFilter,
              _columnIndex = _this$_currentFilter.columnIndex,
              filter = _this$_currentFilter.filter;

          this._filterRowsByColumn(_columnIndex, filter);
        }

        this.renderRowUpdates();
      }
    }, {
      key: "_getLatestRowNodes",
      value: function _getLatestRowNodes() {
        return this.tbody ? Array.from(this.tbody.getElementsByTagName("tr")) : [];
      }
    }, {
      key: "renderRowUpdates",
      value: function renderRowUpdates() {
        this._updateRowAriaHidden();

        this._hideFilteredRows();

        this._updateTableHeight();

        this._updateRowOrder();
      }
    }, {
      key: "_updateTableHeight",
      value: function _updateTableHeight() {
        if (!this.filterContainer) {
          console.warn("The table has missing markup. A responsive or filterable table must be within a div with class \"o-table-container\".", this.rootEl);
          return;
        }

        if (this._updateTableHeightScheduled) {
          window.cancelAnimationFrame(this._updateTableHeightScheduled);
        }

        var tableHeight = this._getTableHeight();

        this._updateTableHeightScheduled = window.requestAnimationFrame(function () {
          this.filterContainer.style.height = !isNaN(tableHeight) ? "".concat(tableHeight, "px") : "";
        }.bind(this));

        if (!this._updateTableHeightListenerSet) {
          var pendingTableHeightUpdate;

          var updateTableHeightDebounced = function () {
            if (pendingTableHeightUpdate) {
              clearTimeout(pendingTableHeightUpdate);
            }

            pendingTableHeightUpdate = setTimeout(function () {
              this._updateTableHeight();
            }.bind(this), 33);
          }.bind(this);

          window.addEventListener("resize", updateTableHeightDebounced);

          this._listeners.push({
            element: window,
            updateTableHeightDebounced: updateTableHeightDebounced,
            type: "resize"
          });

          this._updateTableHeightListenerSet = true;
        }
      }
    }, {
      key: "_getTableHeight",
      value: function _getTableHeight() {
        var tableHeight = this.rootEl.getBoundingClientRect().height;

        var filteredRowsHeight = this._rowsToHide.reduce(function (accumulatedHeight, row) {
          return accumulatedHeight + row.getBoundingClientRect().height;
        }, 0);

        return tableHeight - filteredRowsHeight;
      }
    }, {
      key: "_updateRowAriaHidden",
      value: function _updateRowAriaHidden() {
        if (this._updateRowAriaHiddenScheduled) {
          window.cancelAnimationFrame(this._updateRowAriaHiddenScheduled);
        }

        var rowsToHide = this._rowsToHide || [];
        this._updateRowAriaHiddenScheduled = window.requestAnimationFrame(function () {
          this.tableRows.forEach(function (row) {
            row.setAttribute("aria-hidden", rowsToHide.indexOf(row) !== -1);
          });
        }.bind(this));
      }
    }, {
      key: "_hideFilteredRows",
      value: function _hideFilteredRows() {
        if (this._hideFilteredRowsScheduled) {
          window.cancelAnimationFrame(this._hideFilteredRowsScheduled);
        }

        var filteredRows = this._filteredTableRows || [];
        this._hideFilteredRowsScheduled = window.requestAnimationFrame(function () {
          this.tableRows.forEach(function (row) {
            row.setAttribute("data-o-table-filtered", filteredRows.indexOf(row) !== -1);
          });
        }.bind(this));
      }
    }, {
      key: "_updateRowOrder",
      value: function _updateRowOrder() {
        var _this = this;

        if (this._updateRowOrderScheduled) {
          window.cancelAnimationFrame(this._updateRowOrderScheduled);
        }

        if (this._updateRowOrderFilrtedBatchScheduled) {
          window.cancelAnimationFrame(this._updateRowOrderFilrtedBatchScheduled);
        }

        if (!this._currentSort && !this._currentFilter) {
          return;
        }

        var nonFilteredRows = this.tableRows.filter(function (row) {
          return _this._filteredTableRows.indexOf(row) === -1;
        });
        this._updateRowOrderScheduled = window.requestAnimationFrame(function () {
          prepend(this.tbody, nonFilteredRows);
          this._updateRowOrderFilrtedBatchScheduled = window.requestAnimationFrame(function () {
            append(this.tbody, this._filteredTableRows);
          }.bind(this));
        }.bind(this));
      }
    }, {
      key: "filter",
      value: function filter(headerIndex, _filter) {
        this._filterRowsByColumn(headerIndex, _filter);

        this.renderRowUpdates();
      }
    }, {
      key: "_filterRowsByColumn",
      value: function _filterRowsByColumn(columnIndex, filter) {
        var _this2 = this;

        this._currentFilter = {
          columnIndex: columnIndex,
          filter: filter
        };

        if (typeof filter !== "string" && typeof filter !== "function") {
          throw new Error("Could not filter table column \"".concat(columnIndex, "\". Expected the filter to a string or function."), this);
        }

        this._filteredTableRows = [];
        this.tableRows.forEach(function (row) {
          var cell = row.querySelector("td:nth-of-type(".concat(columnIndex + 1, ")"));

          if (cell) {
            var hideRow = BaseTable._filterMatch(cell, filter);

            if (hideRow) {
              _this2._filteredTableRows.push(row);
            }
          }
        });
      }
    }, {
      key: "_rowsToHide",
      get: function get() {
        return this._filteredTableRows;
      }
    }, {
      key: "getTableHeader",
      value: function getTableHeader(columnIndex) {
        var th = this.tableHeaders[columnIndex];

        if (!th) {
          throw new Error("Could not find header for column index \"".concat(columnIndex, "\"."));
        }

        return th;
      }
    }, {
      key: "sortRowsByColumn",
      value: function sortRowsByColumn(columnIndex, sortOrder) {
        var defaultSort = this._dispatchEvent("sorting", {
          sort: sortOrder,
          columnIndex: columnIndex
        }, {
          cancelable: true
        });

        if (defaultSort) {
          this._sorter.sortRowsByColumn(this, columnIndex, sortOrder);
        }
      }
    }, {
      key: "addSortButtons",
      value: function addSortButtons() {
        var _this3 = this;

        if (!this._opts.sortable) {
          return;
        }

        var tableHeaderButtons = this.tableHeaders.map(function (th) {
          if (th.hasAttribute("data-o-table-heading-disable-sort")) {
            return null;
          }

          if (!th.hasChildNodes()) {
            return null;
          }

          var headingNodes = Array.from(th.childNodes);
          var headingHTML = headingNodes.reduce(function (html, node) {
            var maintainedElements = ["ABBR", "B", "BDI", "BDO", "BR", "CODE", "CITE", "DATA", "DFN", "DEL", "EM", "I", "S", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TIME", "U", "VAR", "WBR"];

            if (node.nodeType === Node.ELEMENT_NODE && maintainedElements.indexOf(node.nodeName) !== -1) {
              return html + node.outerHTML;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
              console.warn("o-table has removed the element \"".concat(node.nodeName, "\" from the table heading to add a sort button on the column. Please remove this element from your table heading, disable sort on this column, or contact the Origami team for help."), th);
            }

            return html + node.textContent;
          }, "");
          var sortButton = document.createElement("button");
          sortButton.innerHTML = headingHTML;
          sortButton.classList.add("o-table__sort");

          var nextSort = _this3._getNextSortOrder(th);

          sortButton.setAttribute("title", "sort table by \"".concat(th.textContent, "\" ").concat(nextSort));
          return sortButton;
        });
        window.requestAnimationFrame(function () {
          this.rootEl.classList.add("o-table--sortable");
          this.tableHeaders.forEach(function (th, index) {
            if (tableHeaderButtons[index]) {
              th.innerHTML = "";
              th.appendChild(tableHeaderButtons[index]);
            }
          });
        }.bind(this));

        var listener = this._sortButtonHandler.bind(this);

        this._rootElDomDelegate = this._rootElDomDelegate || new import_ftdomdelegate.default(this.rootEl);

        this._rootElDomDelegate.on("click", ".o-table__sort", listener);
      }
    }, {
      key: "sorted",
      value: function sorted(_ref) {
        var columnIndex = _ref.columnIndex,
            sortOrder = _ref.sortOrder;

        if (isNaN(columnIndex)) {
          throw new Error("Expected a numerical column index but received \"".concat(columnIndex, "\"."));
        }

        if (!sortOrder) {
          throw new Error("Expected a sort order e.g. \"ascending\" or \"descending\".");
        }

        this._currentSort = {
          sortOrder: sortOrder,
          columnIndex: columnIndex
        };
        var th = this.getTableHeader(columnIndex);
        var sortButton = th.querySelector("button");

        if (sortButton) {
          var buttonTitle = sortButton.getAttribute("title");
          buttonTitle = sortOrder === "ascending" ? buttonTitle.replace("ascending", "descending") : buttonTitle.replace("descending", "ascending");
          sortButton.setAttribute("title", buttonTitle);
        }

        this._dispatchEvent("sorted", this._currentSort);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this._rootElDomDelegate) {
          this._rootElDomDelegate.destroy();
        }

        this._listeners.forEach(function (_ref2) {
          var type = _ref2.type,
              listener = _ref2.listener,
              element = _ref2.element;
          element.removeEventListener(type, listener);
        });

        delete this.thead;
        delete this.tbody;
        delete this.tableHeaders;
        delete this.tableRows;
        delete this._filteredTableRows;
        delete this.wrapper;
        delete this.container;
        delete this.overlayWrapper;
        delete this.filterContainer;
      }
    }, {
      key: "_ready",
      value: function _ready() {
        this._dispatchEvent("ready");
      }
    }, {
      key: "_getNextSortOrder",
      value: function _getNextSortOrder(th) {
        var currentSort = th.getAttribute("aria-sort");
        var noExistingSort = [null, "none"].indexOf(currentSort) !== -1;

        if (noExistingSort && this._opts.preferredSortOrder === "descending") {
          return "descending";
        }

        return currentSort !== "ascending" ? "ascending" : "descending";
      }
    }, {
      key: "_sortButtonHandler",
      value: function _sortButtonHandler(event) {
        var sortButton = event.target;
        var th = sortButton.closest("th");
        var columnIndex = this.tableHeaders.indexOf(th);

        if (th && !isNaN(columnIndex)) {
          var sortOrder = this._getNextSortOrder(th);

          this.sortRowsByColumn(columnIndex, sortOrder);
        }
      }
    }, {
      key: "_dispatchEvent",
      value: function _dispatchEvent(event) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        Object.assign(data, {
          instance: this
        });
        return this.rootEl.dispatchEvent(new CustomEvent("oTable.".concat(event), Object.assign({
          detail: data,
          bubbles: true
        }, opts)));
      }
    }], [{
      key: "_filterMatch",
      value: function _filterMatch(cell, filter) {
        if (typeof filter === "string") {
          var filterValue = filter.replace(/[^\w\.]+/g, "").toLowerCase();

          filter = function filter(cell2) {
            var cellValue = cell2.textContent.replace(/[^\w\.]+/g, "").toLowerCase();
            return filterValue ? cellValue.indexOf(filterValue) > -1 : true;
          };
        }

        return filter(cell) !== true;
      }
    }]);

    return BaseTable;
  }();

  var BaseTable_default = BaseTable; // src/js/Tables/FlatTable.js

  var FlatTable = /*#__PURE__*/function (_BaseTable_default) {
    "use strict";

    _inherits(FlatTable, _BaseTable_default);

    var _super = _createSuper(FlatTable);

    function FlatTable(rootEl, sorter2) {
      var _this4;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, FlatTable);

      _this4 = _super.call(this, rootEl, sorter2, opts);
      _this4._tableHeadersWithoutSort = _this4.tableHeaders.map(function (header) {
        return header.cloneNode(true);
      });

      if (_this4.tableHeaders.length <= 0) {
        console.warn('Could not create a "flat" table as no headers were found. Ensure table headers are placed within "<thead>". Removing class "o-table--responsive-flat".', rootEl);
        rootEl.classList.remove("o-table--responsive-flat");
      } else {
        _this4._createFlatTableStructure();
      }

      window.setTimeout(_this4.addSortButtons.bind(_assertThisInitialized(_this4)), 0);
      window.setTimeout(_this4._ready.bind(_assertThisInitialized(_this4)), 0);
      return _possibleConstructorReturn(_this4, _assertThisInitialized(_this4));
    }

    _createClass(FlatTable, [{
      key: "updateRows",
      value: function updateRows() {
        var latestRows = this._getLatestRowNodes();

        this._createFlatTableStructure(latestRows);

        _get(_getPrototypeOf(FlatTable.prototype), "updateRows", this).call(this);
      }
    }, {
      key: "_getLatestRowNodes",
      value: function _getLatestRowNodes() {
        return this.tbody ? Array.from(this.tbody.querySelectorAll("tr:not(.o-table__duplicate-row)")) : [];
      }
    }, {
      key: "_createFlatTableStructure",
      value: function _createFlatTableStructure() {
        var _this5 = this;

        var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tableRows;
        rows.filter(function (row) {
          return !row.hasAttribute("data-o-table-flat-headings");
        }).forEach(function (row) {
          var data = Array.from(row.getElementsByTagName("td"));
          row.setAttribute("data-o-table-flat-headings", true);
          window.requestAnimationFrame(function () {
            var newGroupBody = document.createElement("tbody");
            newGroupBody.classList.add("o-table__responsive-body");

            _this5._tableHeadersWithoutSort.forEach(function (header, index) {
              var newRow = document.createElement("tr");
              newRow.classList.add("o-table__duplicate-row");
              var clonedHeader = header.cloneNode(true);
              clonedHeader.classList.add("o-table__duplicate-heading");
              clonedHeader.setAttribute("scope", "row");
              clonedHeader.setAttribute("role", "rowheader");
              var clonedTd = data[index].cloneNode(true);
              newRow.appendChild(clonedHeader);
              newRow.appendChild(clonedTd);
              newGroupBody.appendChild(newRow);
            });

            _this5.rootEl.appendChild(newGroupBody);
          });
        });
      }
    }]);

    return FlatTable;
  }(BaseTable_default);

  var FlatTable_default = FlatTable; // src/js/Tables/ScrollTable.js

  var ScrollTable = /*#__PURE__*/function (_BaseTable_default2) {
    "use strict";

    _inherits(ScrollTable, _BaseTable_default2);

    var _super2 = _createSuper(ScrollTable);

    function ScrollTable(rootEl, sorter2) {
      var _this6;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, ScrollTable);

      _this6 = _super2.call(this, rootEl, sorter2, opts);
      _this6._tableHeadersWithoutSort = _this6.tableHeaders.map(function (header) {
        return header.cloneNode(true);
      });

      _this6._createScrollTableStructure();

      window.setTimeout(_this6.addSortButtons.bind(_assertThisInitialized(_this6)), 0);
      window.setTimeout(_this6._ready.bind(_assertThisInitialized(_this6)), 0);
      return _possibleConstructorReturn(_this6, _assertThisInitialized(_this6));
    }

    _createClass(ScrollTable, [{
      key: "filter",
      value: function filter(headerIndex, _filter2) {
        this._filterRowsByColumn(headerIndex, _filter2);

        this.renderRowUpdates();

        this._createScrollTableStructure();
      }
    }, {
      key: "updateRows",
      value: function updateRows() {
        _get(_getPrototypeOf(ScrollTable.prototype), "updateRows", this).call(this);

        this._createScrollTableStructure();
      }
    }, {
      key: "_getLatestRowNodes",
      value: function _getLatestRowNodes() {
        return this.tbody ? Array.from(this.tbody.querySelectorAll("tr:not(.o-table__duplicate-row)")) : [];
      }
    }, {
      key: "_createScrollTableStructure",
      value: function _createScrollTableStructure() {
        var _this7 = this;

        var clonedRows = this._tableHeadersWithoutSort.map(function (header, index) {
          var headerRow = document.createElement("tr");
          headerRow.classList.add("o-table__duplicate-row");
          var clonedHeader = header.cloneNode(true);
          clonedHeader.setAttribute("scope", "row");
          clonedHeader.setAttribute("role", "rowheader");
          headerRow.appendChild(clonedHeader);

          _this7.tableRows.forEach(function (row) {
            var cell = row.querySelectorAll("td")[index];

            if (cell) {
              var cellClone = cell.cloneNode(true);
              var filteredData = _this7._filteredTableRows.indexOf(row) !== -1;
              cellClone.setAttribute("data-o-table-filtered", filteredData);
              cellClone.setAttribute("aria-hidden", filteredData);
              headerRow.appendChild(cellClone);
            }
          });

          return headerRow;
        });

        window.requestAnimationFrame(function () {
          var _this8 = this;

          var rowHeadingRows = Array.from(this.tbody.querySelectorAll(".o-table__duplicate-row"));
          rowHeadingRows.forEach(function (row) {
            return _this8.tbody.removeChild(row);
          });

          if (this.tbody.prepend) {
            var _this$tbody;

            (_this$tbody = this.tbody).prepend.apply(_this$tbody, _toConsumableArray(clonedRows));
          } else {
            clonedRows.reverse().forEach(function (row) {
              _this8.tbody.insertBefore(row, _this8.tbody.firstChild);
            });
          }

          this._updateTableHeight();
        }.bind(this));
      }
    }]);

    return ScrollTable;
  }(BaseTable_default);

  var ScrollTable_default = ScrollTable; // src/js/Tables/OverflowTable.js

  var OverflowTable = /*#__PURE__*/function (_BaseTable_default3) {
    "use strict";

    _inherits(OverflowTable, _BaseTable_default3);

    var _super3 = _createSuper(OverflowTable);

    function OverflowTable(rootEl, sorter2) {
      var _this9;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, OverflowTable);

      _this9 = _super3.call(this, rootEl, sorter2, opts);
      _this9._opts = Object.assign({
        expanded: _this9.rootEl.hasAttribute("data-o-table-expanded") ? _this9.rootEl.getAttribute("data-o-table-expanded") !== "false" : null,
        minimumRowCount: _this9.rootEl.getAttribute("data-o-table-minimum-row-count")
      }, _this9._opts);

      _this9._addControlsToDom();

      window.setTimeout(_this9.addSortButtons.bind(_assertThisInitialized(_this9)), 0);
      window.setTimeout(_this9._setupScroll.bind(_assertThisInitialized(_this9)), 0);
      window.setTimeout(_this9._setupExpander.bind(_assertThisInitialized(_this9)), 0);

      _this9._ready();

      return _possibleConstructorReturn(_this9, _assertThisInitialized(_this9));
    }

    _createClass(OverflowTable, [{
      key: "filter",
      value: function filter(headerIndex, _filter3) {
        this._filterRowsByColumn(headerIndex, _filter3);

        this.renderRowUpdates();
      }
    }, {
      key: "isExpanded",
      value: function isExpanded() {
        var expand = this._expand === void 0 ? Boolean(this._opts.expanded) : Boolean(this._expand);
        return this.canExpand() && expand;
      }
    }, {
      key: "isContracted",
      value: function isContracted() {
        var expand = this._expand === void 0 ? Boolean(this._opts.expanded) : Boolean(this._expand);
        return this.canExpand() && !expand;
      }
    }, {
      key: "canExpand",
      value: function canExpand() {
        return typeof this._opts.expanded === "boolean" && this._minimumRowCount < this.tableRows.length - this._filteredTableRows.length;
      }
    }, {
      key: "renderRowUpdates",
      value: function renderRowUpdates() {
        this._updateExpander();

        this._updateRowAriaHidden();

        this._hideFilteredRows();

        this._updateTableHeight();

        this._updateRowOrder();
      }
    }, {
      key: "_updateExpander",
      value: function _updateExpander() {
        if (typeof this._opts.expanded !== "boolean" || !this.controls) {
          return;
        }

        if (this._expanderUpdateScheduled) {
          window.cancelAnimationFrame(this._expanderUpdateScheduled);
        }

        var expand = this.isExpanded();
        var contract = this.isContracted();
        var canExpand = expand || contract;
        var expanderButtonContainer = this.controls.expanderButton;
        var expanderButton = expanderButtonContainer.querySelector("button");

        this._updateTableHeight();

        this._updateRowAriaHidden();

        this._updateControls();

        this._expanderUpdateScheduled = window.requestAnimationFrame(function () {
          this.rootEl.setAttribute("data-o-table-expanded", Boolean(expand));
          this.container.classList.toggle("o-table-container--expanded", expand);
          this.container.classList.toggle("o-table-container--contracted", contract);
          expanderButton.style.display = canExpand ? "" : "none";

          if (!canExpand) {
            this.rootEl.removeAttribute("aria-expanded");
          }

          if (expand) {
            expanderButton.textContent = "Show fewer";
            this.rootEl.setAttribute("aria-expanded", true);
          }

          if (contract) {
            expanderButton.textContent = "Show more";
            this.rootEl.setAttribute("aria-expanded", false);
          }
        }.bind(this));
      }
    }, {
      key: "contractTable",
      value: function contractTable() {
        if (!this.canExpand()) {
          return;
        }

        this._expand = false;

        this._updateExpander();
      }
    }, {
      key: "expandTable",
      value: function expandTable() {
        if (!this.canExpand()) {
          return;
        }

        this._expand = true;

        this._updateExpander();
      }
    }, {
      key: "_getTableHeight",
      value: function _getTableHeight() {
        if (this.isContracted()) {
          var maxTableHeight = _get(_getPrototypeOf(OverflowTable.prototype), "_getTableHeight", this).call(this);

          if (!this._contractedWrapperHeight || this._contractedWrapperHeight > maxTableHeight) {
            var rowsToHide = this._rowsToHide;
            var buttonHeight = this.controls.expanderButton.getBoundingClientRect().height;
            var extraHeight = rowsToHide ? rowsToHide[0].getBoundingClientRect().height / 2 : 0;
            this._contractedWrapperHeight = maxTableHeight + buttonHeight + extraHeight;
          }

          return this._contractedWrapperHeight;
        }

        if (this.isExpanded()) {
          var _buttonHeight = this.controls.expanderButton.getBoundingClientRect().height;
          return _get(_getPrototypeOf(OverflowTable.prototype), "_getTableHeight", this).call(this) + _buttonHeight;
        }

        return _get(_getPrototypeOf(OverflowTable.prototype), "_getTableHeight", this).call(this);
      }
    }, {
      key: "_addControlsToDom",
      value: function _addControlsToDom() {
        if (this.overlayWrapper && !this.controls) {
          var supportsArrows = OverflowTable._supportsArrows();

          var overlayWrapperHtml = "\n\t\t\t\t".concat(this.wrapper ? "\n\t\t\t\t\t<div class=\"o-table-overflow-fade-overlay\"></div>\n\t\t\t\t" : "", "\n\t\t\t\t<div class=\"o-table-overflow-control-overlay\">\n\t\t\t\t\t").concat(this.wrapper && supportsArrows ? "\n\t\t\t\t\t\t<div class=\"o-table-control o-table-control--back o-table-control--hide\">\n\t\t\t\t\t\t\t<button aria-label=\"visually scroll table back\" disabled=\"true\" class=\"o-buttons o-buttons--primary o-buttons--big o-buttons-icon o-buttons-icon--icon-only o-buttons-icon--arrow-left\"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t" : "", "\n\n\t\t\t\t\t").concat(this.wrapper && supportsArrows ? "\n\t\t\t\t\t\t<div class=\"o-table-control o-table-control--forward o-table-control--hide\">\n\t\t\t\t\t\t\t<button aria-label=\"visually scroll table forward\" disabled=\"true\" class=\"o-buttons o-buttons--primary o-buttons--big o-buttons-icon o-buttons-icon--icon-only o-buttons-icon--arrow-right\"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t" : "", "\n\n\t\t\t\t\t").concat(typeof this._opts.expanded === "boolean" ? "\n\t\t\t\t\t\t<div class=\"o-table-control o-table-control--expander\">\n\t\t\t\t\t\t\t<button class=\"o-buttons o-buttons--primary o-buttons--big\">Show fewer</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t" : "", "\n\t\t\t\t</div>\n\t\t\t");
          var range = document.createRange();
          range.selectNode(this.overlayWrapper);
          var overlayFragment = range.createContextualFragment(overlayWrapperHtml);
          this.controls = {
            controlsOverlay: overlayFragment.querySelector(".o-table-overflow-control-overlay"),
            fadeOverlay: overlayFragment.querySelector(".o-table-overflow-fade-overlay"),
            expanderButton: overlayFragment.querySelector(".o-table-control--expander"),
            forwardButton: overlayFragment.querySelector(".o-table-control--forward"),
            backButton: overlayFragment.querySelector(".o-table-control--back")
          };

          this._updateControlOverlayPosition();

          window.requestAnimationFrame(function () {
            this.overlayWrapper.appendChild(overlayFragment);
          }.bind(this));
        }
      }
    }, {
      key: "_updateControlOverlayPosition",
      value: function _updateControlOverlayPosition() {
        var theadHeight = this.thead ? this.thead.getBoundingClientRect().height : 0;
        var captionHeight = this.tableCaption ? this.tableCaption.getBoundingClientRect().height : 0;
        window.requestAnimationFrame(function () {
          this.controls.controlsOverlay.style["top"] = "".concat(theadHeight + captionHeight, "px");
        }.bind(this));
      }
    }, {
      key: "_setupScroll",
      value: function _setupScroll() {
        if (this.container && this.overlayWrapper && !this.wrapper) {
          console.warn('Controls to scroll table left/right could not be added to "o-table" as it is missing markup. Please add the container and wrapper elements according to the documentation https://registry.origami.ft.com/components/o-table.', {
            table: this.rootEl
          });
        }

        if (!this.container || !this.overlayWrapper || !this.wrapper) {
          return;
        }

        if (!this.controls) {
          this._addControlsToDom();
        }

        if (this.controls.forwardButton) {
          var scrollForward = function () {
            this.wrapper.scrollBy({
              left: document.body.clientWidth / 2,
              behavior: "smooth"
            });
          }.bind(this);

          this.controls.forwardButton.addEventListener("click", scrollForward);

          this._listeners.push({
            element: this.controls.forwardButton,
            scrollForward: scrollForward,
            type: "click"
          });
        }

        if (this.controls.backButton) {
          var scrollBackward = function () {
            this.wrapper.scrollBy({
              left: -(document.body.clientWidth / 2),
              behavior: "smooth"
            });
          }.bind(this);

          this.controls.backButton.addEventListener("click", scrollBackward);

          this._listeners.push({
            element: this.controls.backButton,
            scrollBackward: scrollBackward,
            type: "click"
          });
        }

        var updateScroll = function () {
          if (!this._controlUpdateScheduled) {
            this._controlUpdateScheduled = true;
            window.setTimeout(function () {
              this._controlUpdateScheduled = false;
              this._fromEnd = this.wrapper.scrollWidth - this.wrapper.clientWidth - this.wrapper.scrollLeft;
              this._fromStart = this.wrapper.scrollLeft;

              this._updateControls();
            }.bind(this), 33);
          }
        }.bind(this);

        updateScroll();

        if (this.controls.controlsOverlay && window.IntersectionObserver) {
          var arrowFadeObserverConfig = {
            root: this.controls.controlsOverlay,
            threshold: 1,
            rootMargin: "-20px 0px ".concat(this.canExpand() ? "0px" : "-20px", " 0px")
          };
          var arrowFadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              entry.target.setAttribute("data-o-table-intersection", entry.intersectionRatio !== 1);
              updateScroll();
            });
          }, arrowFadeObserverConfig);

          if (this.controls.backButton) {
            arrowFadeObserver.observe(this.controls.backButton);
          }

          if (this.controls.forwardButton) {
            arrowFadeObserver.observe(this.controls.forwardButton);
          }
        }

        this.wrapper.addEventListener("scroll", updateScroll);
        window.addEventListener("resize", updateScroll);
        window.addEventListener("load", updateScroll);

        this._listeners.push({
          element: this.wrapper,
          updateScroll: updateScroll,
          type: "scroll"
        });

        this._listeners.push({
          element: window,
          updateScroll: updateScroll,
          type: "resize"
        });

        this._listeners.push({
          element: window,
          updateScroll: updateScroll,
          type: "load"
        });
      }
    }, {
      key: "_setupExpander",
      value: function _setupExpander() {
        if (typeof this._opts.expanded !== "boolean") {
          return;
        }

        if (!this.container || !this.overlayWrapper || !this.wrapper) {
          throw new Error('Controls to expand/contract the table could not be added to "o-table" as it is missing markup.Please add the container and wrapper element according to the documentation https://registry.origami.ft.com/components/o-table.');
        }

        if (!this.controls) {
          this._addControlsToDom();
        }

        if (this.controls.expanderButton) {
          var toggleExpanded = function () {
            if (this.isExpanded()) {
              var expanderButtonContainer = this.controls.expanderButton;
              var buttonOffset = expanderButtonContainer.getBoundingClientRect().top;
              this.contractTable();
              window.requestAnimationFrame(function () {
                var top = window.pageYOffset + expanderButtonContainer.getBoundingClientRect().top - buttonOffset;
                window.scroll(null, top);
              });
            } else {
              this.expandTable();
            }
          }.bind(this);

          this.controls.expanderButton.addEventListener("click", toggleExpanded);

          this._listeners.push({
            element: this.controls.expanderButton,
            toggleExpanded: toggleExpanded,
            type: "click"
          });
        }

        this._updateExpander();
      }
    }, {
      key: "_updateControls",
      value: function _updateControls() {
        if (!this.controls) {
          return;
        }

        var canScrollTable = this._canScrollTable;
        window.requestAnimationFrame(function () {
          this.controls.fadeOverlay.classList.toggle("o-table-overflow-fade-overlay--scroll", canScrollTable);
          this.controls.fadeOverlay.style.setProperty("--o-table-fade-from-end", "".concat(Math.min(this._fromEnd, 10), "px"));
          this.controls.fadeOverlay.style.setProperty("--o-table-fade-from-start", "".concat(Math.min(this._fromStart, 10), "px"));
        }.bind(this));
        var showArrowDock = this._showArrowDock;
        window.requestAnimationFrame(function () {
          this.controls.controlsOverlay.classList.toggle("o-table-overflow-control-overlay--arrow-dock", showArrowDock);
        }.bind(this));

        if (OverflowTable._supportsArrows()) {
          this._updateScrollControl(this.controls.forwardButton);

          this._updateScrollControl(this.controls.backButton);
        }

        this._updateControlOverlayPosition();
      }
    }, {
      key: "_updateScrollControl",
      value: function _updateScrollControl(element) {
        var showStickyArrows = this._stickyArrows;
        var canScrollTable = this._canScrollTable;
        var arrowsDocked = this._showArrowDock && !showStickyArrows;
        var scrolledToBoundary = this._fromEnd <= 0 && element === this.controls.forwardButton || this._fromStart <= 0 && element === this.controls.backButton;
        var hideAtBoundary = !arrowsDocked && (!this._stickyArrows || this._stickyArrows && !this._canScrollPastTable);
        var outsideTable = element.getAttribute("data-o-table-intersection") === "true";
        var elementButton = element.querySelector("button");
        window.requestAnimationFrame(function () {
          element.style.display = canScrollTable ? "" : "none";
          element.classList.toggle("o-table-control--sticky", showStickyArrows);
          element.classList.toggle("o-table-control--dock", arrowsDocked);

          if (outsideTable) {
            elementButton.setAttribute("disabled", true);
            element.classList.add("o-table-control--hide");
          }

          if (!scrolledToBoundary && !outsideTable) {
            elementButton.removeAttribute("disabled");
            element.classList.remove("o-table-control--hide");
          }

          if (scrolledToBoundary && !outsideTable) {
            elementButton.setAttribute("disabled", true);
            element.classList.toggle("o-table-control--hide", hideAtBoundary);
          }
        });
      }
    }, {
      key: "_minimumRowCount",
      get: function get() {
        var minimumRowCount = this._opts.minimumRowCount;
        return isNaN(parseInt(minimumRowCount, 10)) ? 20 : parseInt(minimumRowCount, 10);
      }
    }, {
      key: "_rowsToHide",
      get: function get() {
        return [].concat(_toConsumableArray(this._filteredTableRows), _toConsumableArray(this._rowsHiddenByExpander));
      }
    }, {
      key: "_rowsHiddenByExpander",
      get: function get() {
        var _this10 = this;

        var visibleRowCount = Math.min(this.tableRows.length, this._minimumRowCount);
        var nonFilteredRows = this.tableRows.filter(function (row) {
          return _this10._filteredTableRows.indexOf(row) === -1;
        });
        return this.isContracted() ? nonFilteredRows.slice(visibleRowCount, nonFilteredRows.length) : [];
      }
    }, {
      key: "_canScrollTable",
      get: function get() {
        return this._fromEnd > 0 || this._fromStart > 0;
      }
    }, {
      key: "_tableTallerThanViewport",
      get: function get() {
        return this.container.getBoundingClientRect().height > document.documentElement.clientHeight;
      }
    }, {
      key: "_canScrollPastTable",
      get: function get() {
        return this.container.getBoundingClientRect().bottom + document.documentElement.clientHeight / 2 < document.documentElement.getBoundingClientRect().bottom;
      }
    }, {
      key: "_showArrowDock",
      get: function get() {
        return OverflowTable._supportsArrows() && this._canScrollTable && this._canScrollPastTable && this.canExpand();
      }
    }, {
      key: "_stickyArrows",
      get: function get() {
        return OverflowTable._supportsArrows() && this._tableTallerThanViewport;
      }
    }], [{
      key: "_supportsArrows",
      value: function _supportsArrows() {
        return typeof CSS !== "undefined" && (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky"));
      }
    }]);

    return OverflowTable;
  }(BaseTable_default);

  var OverflowTable_default = OverflowTable; // src/js/Tables/BasicTable.js

  var BasicTable = /*#__PURE__*/function (_BaseTable_default4) {
    "use strict";

    _inherits(BasicTable, _BaseTable_default4);

    var _super4 = _createSuper(BasicTable);

    function BasicTable(rootEl, sorter2) {
      var _this11;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, BasicTable);

      _this11 = _super4.call(this, rootEl, sorter2, opts);
      window.setTimeout(_this11.addSortButtons.bind(_assertThisInitialized(_this11)), 0);

      _this11._ready();

      return _possibleConstructorReturn(_this11, _assertThisInitialized(_this11));
    }

    return BasicTable;
  }(BaseTable_default);

  var BasicTable_default = BasicTable; // src/js/Sort/CellFormatter.js

  function extractAltFromImages(cell) {
    var images = Array.from(cell.getElementsByTagName("img"));
    images.forEach(function (image) {
      var contents = image.getAttribute("alt");
      image.insertAdjacentHTML("beforebegin", contents);
      image.remove();
    });
    return cell;
  }

  function extractText(cell) {
    var time = cell.querySelector("time");

    if (time && time.dateTime) {
      var date = new Date(time.dateTime);

      if (!isNaN(date.getTime())) {
        return date.getTime() + "";
      }
    }

    var text = cell.textContent.trim();

    if (text === "") {
      var nodes = cell.querySelectorAll("a, span, i");
      text = Array.from(nodes).reduce(function (accumulator, node) {
        var nodeText = node.getAttribute("aria-label") || node.getAttribute("title");
        return nodeText ? "".concat(accumulator, " ").concat(nodeText) : accumulator;
      }, "");
    }

    return text.trim();
  }

  function expandAbbreviations(text) {
    text = text.replace(/([\d,.]+)([a-zA-Z]+)/g, function (match, digit, abbreviation) {
      var zeros = {
        "m": 6,
        "bn": 9,
        "tn": 12
      };
      return "".concat(digit * Math.pow(10, zeros[abbreviation] || 0));
    });
    return text;
  }

  function removeDigitGroupSeparators(text) {
    return text.replace(/,/g, "");
  }

  function extractDigitsIfFound(text) {
    var digitsAndRange = text.replace(/([^\d.,\-\–]+)/g, "");

    if (digitsAndRange === "") {
      return text;
    }

    return digitsAndRange;
  }

  function extractNumberFromRange(text) {
    var number = parseFloat(text);
    return isNaN(number) ? text : number;
  }

  function ftDateTimeToNumber(text) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = text.match(/^([A-Za-z]{3,})(?:[\s])(?=[\d])((?:\d{1,2})?(?![\d]))?(?:\s)?(\d{4})?/);
    var time = text.match(/(?:\s|^)(\d{1,2}(?:[.](\d{2}))?)(pm|am)$/);
    var month = date && date[1] ? date[1] : null;
    var monthIndex = null;

    if (month) {
      for (var index = 0; index < monthNames.length; index++) {
        var name = monthNames[index];

        if (name.startsWith(month)) {
          monthIndex = index;
          break;
        }
      }
    }

    var day = date && date[2] ? parseInt(date[2], 10) : null;
    var year = date && date[3] ? parseInt(date[3], 10) : null;

    if (month && !year) {
      year = new Date().getFullYear();
    }

    var hour = time && time[1] ? parseInt(time[1], 10) : null;
    var minute = time && time[2] ? parseInt(time[2], 10) : null;
    var period = time ? time[3] : null;
    var twentyFourHour = hour && period === "pm" ? hour + 12 : hour;

    if (hour && !(year && monthIndex)) {
      return parseFloat("".concat(twentyFourHour, ".").concat(minute));
    }

    if (year !== null || monthIndex !== null || day !== null || twentyFourHour !== null || minute !== null) {
      var dateObj = new Date(Date.UTC(year, monthIndex, day, twentyFourHour, minute));
      return isNaN(dateObj.getTime()) ? text : dateObj.getTime();
    } else {
      return text;
    }
  }

  function removeRefereneAsterisk(text) {
    return text.replace(/\*+$/, "");
  }

  function removeEmptyCellIndicators(text) {
    text = text.replace(/^n[./]a[.]?$/i, "");
    return text === "-" ? "" : text;
  }

  function extractNodeContent(cell) {
    var steps = [extractAltFromImages, extractText, removeRefereneAsterisk, removeEmptyCellIndicators];
    var text = cell;
    steps.forEach(function (step) {
      text = step(text);
    });
    return typeof text === "string" ? text : "";
  }

  function extractNumber(text) {
    var steps = [removeDigitGroupSeparators, expandAbbreviations, extractDigitsIfFound, extractNumberFromRange];
    steps.forEach(function (step) {
      text = step(text);
    });
    return text;
  }

  var CellFormatter = /*#__PURE__*/function () {
    "use strict";

    function CellFormatter() {
      _classCallCheck(this, CellFormatter);

      this.filters = {
        text: [extractNodeContent],
        number: [extractNodeContent, extractNumber],
        percent: [extractNodeContent, extractNumber],
        currency: [extractNodeContent, extractNumber],
        numeric: [extractNodeContent, extractNumber],
        date: [extractNodeContent, ftDateTimeToNumber]
      };
    }

    _createClass(CellFormatter, [{
      key: "setFormatter",
      value: function setFormatter(type, formatFunction) {
        this.filters[type] = [formatFunction];
      }
    }, {
      key: "formatCell",
      value: function formatCell(_ref3) {
        var cell = _ref3.cell,
            _ref3$type = _ref3.type,
            type = _ref3$type === void 0 ? "text" : _ref3$type;
        type = type || "text";
        var sortValue = cell.getAttribute("data-o-table-sort-value");

        if (sortValue === null) {
          if (this.filters[type]) {
            var cellClone = cell.cloneNode({
              deep: true
            });
            sortValue = cellClone;
            this.filters[type].forEach(function (fn) {
              sortValue = fn(sortValue);
            });
          }

          cell.setAttribute("data-o-table-sort-value", sortValue);
        }

        var sortValueIsNumber = sortValue !== "" && !isNaN(sortValue);
        return sortValueIsNumber ? parseFloat(sortValue) : sortValue;
      }
    }]);

    return CellFormatter;
  }();

  var CellFormatter_default = CellFormatter; // src/js/Sort/TableSorter.js

  function getIntlCollator() {
    if (typeof Intl !== "undefined" && {}.hasOwnProperty.call(Intl, "Collator")) {
      return new Intl.Collator();
    }
  }

  function ascendingSort(a, b, intlCollator) {
    if ((typeof a === "string" || a instanceof String) && (typeof b === "string" || b instanceof String)) {
      return intlCollator ? intlCollator.compare(a, b) : a.localeCompare(b);
    } else if (!isNaN(b) && isNaN(a) || a < b) {
      return -1;
    } else if (!isNaN(a) && isNaN(b) || b < a) {
      return 1;
    } else {
      return 0;
    }
  }

  function descendingSort() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return 0 - ascendingSort.apply(this, args);
  }

  var TableSorter = /*#__PURE__*/function () {
    "use strict";

    function TableSorter() {
      _classCallCheck(this, TableSorter);

      this._cellFormatter = new CellFormatter_default();
    }

    _createClass(TableSorter, [{
      key: "sortRowsByColumn",
      value: function sortRowsByColumn(table, columnIndex, sortOrder, batch) {
        var tableHeaderElement = table.getTableHeader(columnIndex);

        if (batch) {
          console.warn('o-table: The "batch" argument is deprecated and no longer used.');
        }

        if (["ascending", "descending"].indexOf(sortOrder) === -1) {
          throw new Error("Sort order \"".concat(sortOrder, "\" is not supported. Must be \"ascending\" or \"descending\"."));
        }

        var intlCollator = getIntlCollator();
        var cellFormatter = this._cellFormatter;
        var type = tableHeaderElement.getAttribute("data-o-table-data-type") || void 0;
        table.tableRows.sort(function (a, b) {
          var aCol = a.querySelectorAll("td,th:not(.o-table__duplicate-heading)")[columnIndex];
          var bCol = b.querySelectorAll("td,th:not(.o-table__duplicate-heading)")[columnIndex];
          aCol = cellFormatter.formatCell({
            cell: aCol,
            type: type
          });
          bCol = cellFormatter.formatCell({
            cell: bCol,
            type: type
          });

          if (sortOrder === "ascending") {
            return ascendingSort(aCol, bCol, intlCollator);
          } else {
            return descendingSort(aCol, bCol, intlCollator);
          }
        });
        table.sorted({
          columnIndex: columnIndex,
          sortOrder: sortOrder
        });
        table.renderRowUpdates();
        window.requestAnimationFrame(function () {
          table.tableHeaders.forEach(function (header) {
            var headerSort = header === tableHeaderElement ? sortOrder : "none";
            header.setAttribute("aria-sort", headerSort);
          });
        });
      }
    }, {
      key: "setCellFormatterForType",
      value: function setCellFormatterForType(type, formatFunction) {
        this._cellFormatter.setFormatter(type, formatFunction);
      }
    }]);

    return TableSorter;
  }();

  var TableSorter_default = TableSorter; // src/js/oTable.js

  var sorter = new TableSorter_default();

  var OTable = /*#__PURE__*/function () {
    "use strict";

    function OTable(rootEl) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, OTable);

      var tableType = rootEl.getAttribute("data-o-table-responsive");
      var Table;

      switch (tableType) {
        case "flat":
          Table = FlatTable_default;
          break;

        case "scroll":
          Table = ScrollTable_default;
          break;

        case "overflow":
          Table = OverflowTable_default;
          break;

        default:
          Table = BasicTable_default;
          break;
      }

      return new Table(rootEl, sorter, opts);
    }

    _createClass(OTable, null, [{
      key: "init",
      value: function init() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!(el instanceof HTMLElement)) {
          el = document.querySelector(el);
        }

        if (/\bo-table\b/.test(el.getAttribute("data-o-component"))) {
          return new OTable(el, opts);
        }

        var tableEls = Array.from(el.querySelectorAll('[data-o-component~="o-table"]'));
        return tableEls.map(function (el2) {
          return new OTable(el2, opts);
        });
      }
    }, {
      key: "setSortFormatterForType",
      value: function setSortFormatterForType(type, formatFunction) {
        sorter.setCellFormatterForType(type, formatFunction);
      }
    }]);

    return OTable;
  }();

  var oTable_default = OTable; // main.js

  var constructAll = function constructAll() {
    oTable_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvVGFibGVzL0Jhc2VUYWJsZS5qcyIsInNyYy9qcy9UYWJsZXMvRmxhdFRhYmxlLmpzIiwic3JjL2pzL1RhYmxlcy9TY3JvbGxUYWJsZS5qcyIsInNyYy9qcy9UYWJsZXMvT3ZlcmZsb3dUYWJsZS5qcyIsInNyYy9qcy9UYWJsZXMvQmFzaWNUYWJsZS5qcyIsInNyYy9qcy9Tb3J0L0NlbGxGb3JtYXR0ZXIuanMiLCJzcmMvanMvU29ydC9UYWJsZVNvcnRlci5qcyIsInNyYy9qcy9vVGFibGUuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFBLGVBQUEsR0FBQSxVQUFBLENBQUE7QUFBQSxpREFBQSw4Q0FBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBQUE7O0FBRUEsTUFBQSxNQUFBLENBQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxRQUFBLEtBQUEsRUFBTztBQURvQyxPQUE3QztBQUdBLE1BQUEsT0FBQSxDQUFRLE9BQVIsR0FBa0IsS0FBQSxDQUFsQjs7QUFZQSxlQUFBLFNBQUEsQ0FBa0IsSUFBbEIsRUFBd0I7QUFPdEIsYUFBSyxXQUFMLEdBQW1CLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBbkI7O0FBRUEsWUFBSSxJQUFKLEVBQVU7QUFDUixlQUFLLElBQUwsQ0FBVSxJQUFWO0FBQVU7O0FBS1osYUFBSyxNQUFMLEdBQWMsU0FBQSxDQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsSUFBMUIsQ0FBK0IsSUFBL0IsQ0FBZDtBQUVBLGFBQUssaUJBQUwsR0FBeUIsRUFBekI7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QXZCLENBQUw7QUFBNEI7O0FBRTdCLFlBQUksY0FBYyxJQUFkLENBQW1CLEVBQUEsQ0FBRyxZQUFILENBQWdCLGtCQUFoQixDQUFuQixDQUFKLEVBQTZEO0FBQzVELGlCQUFPLElBQUksTUFBSixDQUFXLEVBQVgsRUFBZSxJQUFmLENBQVA7QUFBc0I7O0FBRXZCLFlBQU0sUUFBQSxHQUFXLEtBQUEsQ0FBTSxJQUFOLENBQVcsRUFBQSxDQUFHLGdCQUFILENBQW9CLCtCQUFwQixDQUFYLENBQWpCO0FBQ0EsZUFBTyxRQUFBLENBQVMsR0FBVCxDQUFhLFVBQUEsR0FBQSxFQUFNO0FBQ3pCLGlCQUFPLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZSxJQUFmLENBQVA7QUFBc0IsU0FEaEIsQ0FBUDtBQUN1QjtBQXREekI7QUFBQTtBQUFBLGFBc0R5QixpQ0FvQ08sSUFwQ1AsRUFvQ2EsY0FwQ2IsRUFvQzZCO0FBQ3BELFFBQUEsTUFBQSxDQUFPLHVCQUFQLENBQStCLElBQS9CLEVBQXFDLGNBQXJDO0FBQXFDO0FBM0Z2Qzs7QUFBQTtBQUFBLEtBQUE7O0FBK0ZBLE1BQU8sY0FBQSxHQUFRLE1BQWYsQzs7QUN0R0EsTUFBTSxZQUFBLEdBQWUsU0FBZixZQUFlLEdBQVc7QUFDL0IsSUFBQSxjQUFBLENBQU8sSUFBUDtBQUNBLElBQUEsUUFBQSxDQUFTLG1CQUFULENBQTZCLG9CQUE3QixFQUFtRCxZQUFuRDtBQUFtRCxHQUZwRDs7QUFLQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsRUFBZ0QsWUFBaEQsRTs7QUNMQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN4RCxJQUFBLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQUksV0FBSixDQUFnQixvQkFBaEIsQ0FBdkI7QUFBdUMsR0FEeEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxuLyoqXG4gKiBET00gZXZlbnQgZGVsZWdhdG9yXG4gKlxuICogVGhlIGRlbGVnYXRvciB3aWxsIGxpc3RlblxuICogZm9yIGV2ZW50cyB0aGF0IGJ1YmJsZSB1cFxuICogdG8gdGhlIHJvb3Qgbm9kZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqL1xuZnVuY3Rpb24gRGVsZWdhdGUocm9vdCkge1xuICAvKipcbiAgICogTWFpbnRhaW4gYSBtYXAgb2YgbGlzdGVuZXJcbiAgICogbGlzdHMsIGtleWVkIGJ5IGV2ZW50IG5hbWUuXG4gICAqXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgdGhpcy5saXN0ZW5lck1hcCA9IFt7fSwge31dO1xuXG4gIGlmIChyb290KSB7XG4gICAgdGhpcy5yb290KHJvb3QpO1xuICB9XG4gIC8qKiBAdHlwZSBmdW5jdGlvbigpICovXG5cblxuICB0aGlzLmhhbmRsZSA9IERlbGVnYXRlLnByb3RvdHlwZS5oYW5kbGUuYmluZCh0aGlzKTsgLy8gQ2FjaGUgb2YgZXZlbnQgbGlzdGVuZXJzIHJlbW92ZWQgZHVyaW5nIGFuIGV2ZW50IGN5Y2xlXG5cbiAgdGhpcy5fcmVtb3ZlZExpc3RlbmVycyA9IFtdO1xufVxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGV2ZW50c1xuICogb24gdGhlIHByb3ZpZGVkIERPTSBlbGVtZW50XG4gKlxuICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IFtyb290XSBUaGUgcm9vdCBub2RlIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG1hdGNoaW5nIHRoZSByb290IG5vZGVcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uIChyb290KSB7XG4gIHZhciBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXA7XG4gIHZhciBldmVudFR5cGU7IC8vIFJlbW92ZSBtYXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG5cbiAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFsxXSkge1xuICAgICAgaWYgKGxpc3RlbmVyTWFwWzFdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzBdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSAvLyBJZiBubyByb290IG9yIHJvb3QgaXMgbm90XG4gIC8vIGEgZG9tIG5vZGUsIHRoZW4gcmVtb3ZlIGludGVybmFsXG4gIC8vIHJvb3QgcmVmZXJlbmNlIGFuZCBleGl0IGhlcmVcblxuXG4gIGlmICghcm9vdCB8fCAhcm9vdC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgcm9vdCBub2RlIGF0IHdoaWNoXG4gICAqIGxpc3RlbmVycyBhcmUgYXR0YWNoZWQuXG4gICAqXG4gICAqIEB0eXBlIE5vZGVcbiAgICovXG5cblxuICB0aGlzLnJvb3RFbGVtZW50ID0gcm9vdDsgLy8gU2V0IHVwIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcblxuICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFsxXSkge1xuICAgIGlmIChsaXN0ZW5lck1hcFsxXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICBpZiAobGlzdGVuZXJNYXBbMF0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5jYXB0dXJlRm9yVHlwZSA9IGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgcmV0dXJuIFsnYmx1cicsICdlcnJvcicsICdmb2N1cycsICdsb2FkJywgJ3Jlc2l6ZScsICdzY3JvbGwnXS5pbmRleE9mKGV2ZW50VHlwZSkgIT09IC0xO1xufTtcbi8qKlxuICogQXR0YWNoIGEgaGFuZGxlciB0byBvbmVcbiAqIGV2ZW50IGZvciBhbGwgZWxlbWVudHNcbiAqIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yLFxuICogbm93IG9yIGluIHRoZSBmdXR1cmVcbiAqXG4gKiBUaGUgaGFuZGxlciBmdW5jdGlvbiByZWNlaXZlc1xuICogdGhyZWUgYXJndW1lbnRzOiB0aGUgRE9NIGV2ZW50XG4gKiBvYmplY3QsIHRoZSBub2RlIHRoYXQgbWF0Y2hlZFxuICogdGhlIHNlbGVjdG9yIHdoaWxlIHRoZSBldmVudFxuICogd2FzIGJ1YmJsaW5nIGFuZCBhIHJlZmVyZW5jZVxuICogdG8gaXRzZWxmLiBXaXRoaW4gdGhlIGhhbmRsZXIsXG4gKiAndGhpcycgaXMgZXF1YWwgdG8gdGhlIHNlY29uZFxuICogYXJndW1lbnQuXG4gKlxuICogVGhlIG5vZGUgdGhhdCBhY3R1YWxseSByZWNlaXZlZFxuICogdGhlIGV2ZW50IGNhbiBiZSBhY2Nlc3NlZCB2aWFcbiAqICdldmVudC50YXJnZXQnLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgTGlzdGVuIGZvciB0aGVzZSBldmVudHNcbiAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gc2VsZWN0b3IgT25seSBoYW5kbGUgZXZlbnRzIG9uIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3IsIGlmIHVuZGVmaW5lZCBtYXRjaCByb290IGVsZW1lbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gaGFuZGxlciBIYW5kbGVyIGZ1bmN0aW9uIC0gZXZlbnQgZGF0YSBwYXNzZWQgaGVyZSB3aWxsIGJlIGluIGV2ZW50LmRhdGFcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3VzZUNhcHR1cmVdIHNlZSAndXNlQ2FwdHVyZScgaW4gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyPlxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB1c2VDYXB0dXJlKSB7XG4gIHZhciByb290O1xuICB2YXIgbGlzdGVuZXJNYXA7XG4gIHZhciBtYXRjaGVyO1xuICB2YXIgbWF0Y2hlclBhcmFtO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBldmVudCB0eXBlOiAnICsgZXZlbnRUeXBlKTtcbiAgfSAvLyBoYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuXG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZUNhcHR1cmUgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IG51bGw7XG4gIH0gLy8gRmFsbGJhY2sgdG8gc2Vuc2libGUgZGVmYXVsdHNcbiAgLy8gaWYgdXNlQ2FwdHVyZSBub3Qgc2V0XG5cblxuICBpZiAodXNlQ2FwdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdXNlQ2FwdHVyZSA9IHRoaXMuY2FwdHVyZUZvclR5cGUoZXZlbnRUeXBlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hhbmRsZXIgbXVzdCBiZSBhIHR5cGUgb2YgRnVuY3Rpb24nKTtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXBbdXNlQ2FwdHVyZSA/IDEgOiAwXTsgLy8gQWRkIG1hc3RlciBoYW5kbGVyIGZvciB0eXBlIGlmIG5vdCBjcmVhdGVkIHlldFxuXG4gIGlmICghbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSkge1xuICAgIGlmIChyb290KSB7XG4gICAgICByb290LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuXG4gICAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXSA9IFtdO1xuICB9XG5cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIG1hdGNoZXJQYXJhbSA9IG51bGw7IC8vIENPTVBMRVggLSBtYXRjaGVzUm9vdCBuZWVkcyB0byBoYXZlIGFjY2VzcyB0b1xuICAgIC8vIHRoaXMucm9vdEVsZW1lbnQsIHNvIGJpbmQgdGhlIGZ1bmN0aW9uIHRvIHRoaXMuXG5cbiAgICBtYXRjaGVyID0gbWF0Y2hlc1Jvb3QuYmluZCh0aGlzKTsgLy8gQ29tcGlsZSBhIG1hdGNoZXIgZm9yIHRoZSBnaXZlbiBzZWxlY3RvclxuICB9IGVsc2UgaWYgKC9eW2Etel0rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3I7XG4gICAgbWF0Y2hlciA9IG1hdGNoZXNUYWc7XG4gIH0gZWxzZSBpZiAoL14jW2EtejAtOVxcLV9dKyQvaS50ZXN0KHNlbGVjdG9yKSkge1xuICAgIG1hdGNoZXJQYXJhbSA9IHNlbGVjdG9yLnNsaWNlKDEpO1xuICAgIG1hdGNoZXIgPSBtYXRjaGVzSWQ7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3I7XG4gICAgbWF0Y2hlciA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXM7XG4gIH0gLy8gQWRkIHRvIHRoZSBsaXN0IG9mIGxpc3RlbmVyc1xuXG5cbiAgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXS5wdXNoKHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICBtYXRjaGVyOiBtYXRjaGVyLFxuICAgIG1hdGNoZXJQYXJhbTogbWF0Y2hlclBhcmFtXG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIFJlbW92ZSBhbiBldmVudCBoYW5kbGVyXG4gKiBmb3IgZWxlbWVudHMgdGhhdCBtYXRjaFxuICogdGhlIHNlbGVjdG9yLCBmb3JldmVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtldmVudFR5cGVdIFJlbW92ZSBoYW5kbGVycyBmb3IgZXZlbnRzIG1hdGNoaW5nIHRoaXMgdHlwZSwgY29uc2lkZXJpbmcgdGhlIG90aGVyIHBhcmFtZXRlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIG90aGVyIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gW2hhbmRsZXJdIElmIHRoaXMgcGFyYW1ldGVyIGlzIG9taXR0ZWQsIG9ubHkgaGFuZGxlcnMgd2hpY2ggbWF0Y2ggdGhlIHByZXZpb3VzIHR3byB3aWxsIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIHtEZWxlZ2F0ZX0gVGhpcyBtZXRob2QgaXMgY2hhaW5hYmxlXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgdmFyIGk7XG4gIHZhciBsaXN0ZW5lcjtcbiAgdmFyIGxpc3RlbmVyTWFwO1xuICB2YXIgbGlzdGVuZXJMaXN0O1xuICB2YXIgc2luZ2xlRXZlbnRUeXBlOyAvLyBIYW5kbGVyIGNhbiBiZSBwYXNzZWQgYXNcbiAgLy8gdGhlIHNlY29uZCBvciB0aGlyZCBhcmd1bWVudFxuXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICB1c2VDYXB0dXJlID0gaGFuZGxlcjtcbiAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgc2VsZWN0b3IgPSBudWxsO1xuICB9IC8vIElmIHVzZUNhcHR1cmUgbm90IHNldCwgcmVtb3ZlXG4gIC8vIGFsbCBldmVudCBsaXN0ZW5lcnNcblxuXG4gIGlmICh1c2VDYXB0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLm9mZihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCB0cnVlKTtcbiAgICB0aGlzLm9mZihldmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lck1hcCA9IHRoaXMubGlzdGVuZXJNYXBbdXNlQ2FwdHVyZSA/IDEgOiAwXTtcblxuICBpZiAoIWV2ZW50VHlwZSkge1xuICAgIGZvciAoc2luZ2xlRXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXAuaGFzT3duUHJvcGVydHkoc2luZ2xlRXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLm9mZihzaW5nbGVFdmVudFR5cGUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07XG5cbiAgaWYgKCFsaXN0ZW5lckxpc3QgfHwgIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSAvLyBSZW1vdmUgb25seSBwYXJhbWV0ZXIgbWF0Y2hlc1xuICAvLyBpZiBzcGVjaWZpZWRcblxuXG4gIGZvciAoaSA9IGxpc3RlbmVyTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJMaXN0W2ldO1xuXG4gICAgaWYgKCghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGxpc3RlbmVyLnNlbGVjdG9yKSAmJiAoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gbGlzdGVuZXIuaGFuZGxlcikpIHtcbiAgICAgIHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIGxpc3RlbmVyTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9IC8vIEFsbCBsaXN0ZW5lcnMgcmVtb3ZlZFxuXG5cbiAgaWYgKCFsaXN0ZW5lckxpc3QubGVuZ3RoKSB7XG4gICAgZGVsZXRlIGxpc3RlbmVyTWFwW2V2ZW50VHlwZV07IC8vIFJlbW92ZSB0aGUgbWFpbiBoYW5kbGVyXG5cbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgdGhpcy5yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5oYW5kbGUsIHVzZUNhcHR1cmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogSGFuZGxlIGFuIGFyYml0cmFyeSBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmhhbmRsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgaTtcbiAgdmFyIGw7XG4gIHZhciB0eXBlID0gZXZlbnQudHlwZTtcbiAgdmFyIHJvb3Q7XG4gIHZhciBwaGFzZTtcbiAgdmFyIGxpc3RlbmVyO1xuICB2YXIgcmV0dXJuZWQ7XG4gIHZhciBsaXN0ZW5lckxpc3QgPSBbXTtcbiAgdmFyIHRhcmdldDtcbiAgdmFyIGV2ZW50SWdub3JlID0gJ2Z0TGFic0RlbGVnYXRlSWdub3JlJztcblxuICBpZiAoZXZlbnRbZXZlbnRJZ25vcmVdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0OyAvLyBIYXJkY29kZSB2YWx1ZSBvZiBOb2RlLlRFWFRfTk9ERVxuICAvLyBhcyBub3QgZGVmaW5lZCBpbiBJRThcblxuICBpZiAodGFyZ2V0Lm5vZGVUeXBlID09PSAzKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gIH0gLy8gSGFuZGxlIFNWRyA8dXNlPiBlbGVtZW50cyBpbiBJRVxuXG5cbiAgaWYgKHRhcmdldC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudCkge1xuICAgIHRhcmdldCA9IHRhcmdldC5jb3JyZXNwb25kaW5nVXNlRWxlbWVudDtcbiAgfVxuXG4gIHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICBwaGFzZSA9IGV2ZW50LmV2ZW50UGhhc2UgfHwgKGV2ZW50LnRhcmdldCAhPT0gZXZlbnQuY3VycmVudFRhcmdldCA/IDMgOiAyKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtY2FzZVxuXG4gIHN3aXRjaCAocGhhc2UpIHtcbiAgICBjYXNlIDE6XG4gICAgICAvL0V2ZW50LkNBUFRVUklOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgMjpcbiAgICAgIC8vRXZlbnQuQVRfVEFSR0VUOlxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJNYXBbMF0gJiYgdGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXSkge1xuICAgICAgICBsaXN0ZW5lckxpc3QgPSBsaXN0ZW5lckxpc3QuY29uY2F0KHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFsxXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKSB7XG4gICAgICAgIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTGlzdC5jb25jYXQodGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAzOlxuICAgICAgLy9FdmVudC5CVUJCTElOR19QSEFTRTpcbiAgICAgIGxpc3RlbmVyTGlzdCA9IHRoaXMubGlzdGVuZXJNYXBbMF1bdHlwZV07XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHZhciB0b0ZpcmUgPSBbXTsgLy8gTmVlZCB0byBjb250aW51b3VzbHkgY2hlY2tcbiAgLy8gdGhhdCB0aGUgc3BlY2lmaWMgbGlzdCBpc1xuICAvLyBzdGlsbCBwb3B1bGF0ZWQgaW4gY2FzZSBvbmVcbiAgLy8gb2YgdGhlIGNhbGxiYWNrcyBhY3R1YWxseVxuICAvLyBjYXVzZXMgdGhlIGxpc3QgdG8gYmUgZGVzdHJveWVkLlxuXG4gIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoO1xuXG4gIHdoaWxlICh0YXJnZXQgJiYgbCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJMaXN0W2ldOyAvLyBCYWlsIGZyb20gdGhpcyBsb29wIGlmXG4gICAgICAvLyB0aGUgbGVuZ3RoIGNoYW5nZWQgYW5kXG4gICAgICAvLyBubyBtb3JlIGxpc3RlbmVycyBhcmVcbiAgICAgIC8vIGRlZmluZWQgYmV0d2VlbiBpIGFuZCBsLlxuXG4gICAgICBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgJiYgW1wiYnV0dG9uXCIsIFwiaW5wdXRcIiwgXCJzZWxlY3RcIiwgXCJ0ZXh0YXJlYVwiXS5pbmRleE9mKHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEgJiYgdGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImRpc2FibGVkXCIpKSB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGluZ3MgdGhhdCBoYXZlIHByZXZpb3VzbHkgZmlyZWRcbiAgICAgICAgdG9GaXJlID0gW107XG4gICAgICB9IC8vIENoZWNrIGZvciBtYXRjaCBhbmQgZmlyZVxuICAgICAgLy8gdGhlIGV2ZW50IGlmIHRoZXJlJ3Mgb25lXG4gICAgICAvL1xuICAgICAgLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXlcbiAgICAgIC8vIHRvIGNoZWNrIGlmIGV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgLy8gd2FzIGNhbGxlZC4gSWYgc28sIGJyZWFrIGJvdGggbG9vcHMuXG4gICAgICBlbHNlIGlmIChsaXN0ZW5lci5tYXRjaGVyLmNhbGwodGFyZ2V0LCBsaXN0ZW5lci5tYXRjaGVyUGFyYW0sIHRhcmdldCkpIHtcbiAgICAgICAgICB0b0ZpcmUucHVzaChbZXZlbnQsIHRhcmdldCwgbGlzdGVuZXJdKTtcbiAgICAgICAgfVxuICAgIH0gLy8gVE9ETzpNQ0c6MjAxMjAxMTc6IE5lZWQgYSB3YXkgdG9cbiAgICAvLyBjaGVjayBpZiBldmVudCNzdG9wUHJvcGFnYXRpb25cbiAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgbG9vcGluZ1xuICAgIC8vIHRocm91Z2ggdGhlIERPTS4gU3RvcCBpZiB0aGVcbiAgICAvLyBkZWxlZ2F0aW9uIHJvb3QgaGFzIGJlZW4gcmVhY2hlZFxuXG5cbiAgICBpZiAodGFyZ2V0ID09PSByb290KSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsID0gbGlzdGVuZXJMaXN0Lmxlbmd0aDsgLy8gRmFsbCBiYWNrIHRvIHBhcmVudE5vZGUgc2luY2UgU1ZHIGNoaWxkcmVuIGhhdmUgbm8gcGFyZW50RWxlbWVudCBpbiBJRVxuXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQgfHwgdGFyZ2V0LnBhcmVudE5vZGU7IC8vIERvIG5vdCB0cmF2ZXJzZSB1cCB0byBkb2N1bWVudCByb290IHdoZW4gdXNpbmcgcGFyZW50Tm9kZSwgdGhvdWdoXG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTERvY3VtZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgcmV0O1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0b0ZpcmUubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBIYXMgaXQgYmVlbiByZW1vdmVkIGR1cmluZyB3aGlsZSB0aGUgZXZlbnQgZnVuY3Rpb24gd2FzIGZpcmVkXG4gICAgaWYgKHRoaXMuX3JlbW92ZWRMaXN0ZW5lcnMuaW5kZXhPZih0b0ZpcmVbaV1bMl0pID4gLTEpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJldHVybmVkID0gdGhpcy5maXJlLmFwcGx5KHRoaXMsIHRvRmlyZVtpXSk7IC8vIFN0b3AgcHJvcGFnYXRpb24gdG8gc3Vic2VxdWVudFxuICAgIC8vIGNhbGxiYWNrcyBpZiB0aGUgY2FsbGJhY2sgcmV0dXJuZWRcbiAgICAvLyBmYWxzZVxuXG4gICAgaWYgKHJldHVybmVkID09PSBmYWxzZSkge1xuICAgICAgdG9GaXJlW2ldWzBdW2V2ZW50SWdub3JlXSA9IHRydWU7XG4gICAgICB0b0ZpcmVbaV1bMF0ucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG4vKipcbiAqIEZpcmUgYSBsaXN0ZW5lciBvbiBhIHRhcmdldC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcikge1xuICByZXR1cm4gbGlzdGVuZXIuaGFuZGxlci5jYWxsKHRhcmdldCwgZXZlbnQsIHRhcmdldCk7XG59O1xuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgYSB0YWcgc2VsZWN0b3IuXG4gKlxuICogVGFncyBhcmUgTk9UIGNhc2Utc2Vuc2l0aXZlLFxuICogZXhjZXB0IGluIFhNTCAoYW5kIFhNTC1iYXNlZFxuICogbGFuZ3VhZ2VzIHN1Y2ggYXMgWEhUTUwpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSB0YWcgbmFtZSB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNUYWcodGFnTmFtZSwgZWxlbWVudCkge1xuICByZXR1cm4gdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbn1cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBlbGVtZW50XG4gKiBtYXRjaGVzIHRoZSByb290LlxuICpcbiAqIEBwYXJhbSB7P1N0cmluZ30gc2VsZWN0b3IgSW4gdGhpcyBjYXNlIHRoaXMgaXMgYWx3YXlzIHBhc3NlZCB0aHJvdWdoIGFzIG51bGwgYW5kIG5vdCB1c2VkXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzUm9vdChzZWxlY3RvciwgZWxlbWVudCkge1xuICBpZiAodGhpcy5yb290RWxlbWVudCA9PT0gd2luZG93KSB7XG4gICAgcmV0dXJuICgvLyBNYXRjaCB0aGUgb3V0ZXIgZG9jdW1lbnQgKGRpc3BhdGNoZWQgZnJvbSBkb2N1bWVudClcbiAgICAgIGVsZW1lbnQgPT09IGRvY3VtZW50IHx8IC8vIFRoZSA8aHRtbD4gZWxlbWVudCAoZGlzcGF0Y2hlZCBmcm9tIGRvY3VtZW50LmJvZHkgb3IgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KVxuICAgICAgZWxlbWVudCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8IC8vIE9yIHRoZSB3aW5kb3cgaXRzZWxmIChkaXNwYXRjaGVkIGZyb20gd2luZG93KVxuICAgICAgZWxlbWVudCA9PT0gd2luZG93XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLnJvb3RFbGVtZW50ID09PSBlbGVtZW50O1xufVxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBJRCBvZlxuICogdGhlIGVsZW1lbnQgaW4gJ3RoaXMnXG4gKiBtYXRjaGVzIHRoZSBnaXZlbiBJRC5cbiAqXG4gKiBJRHMgYXJlIGNhc2Utc2Vuc2l0aXZlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgSUQgdG8gdGVzdCBhZ2FpbnN0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuXG5mdW5jdGlvbiBtYXRjaGVzSWQoaWQsIGVsZW1lbnQpIHtcbiAgcmV0dXJuIGlkID09PSBlbGVtZW50LmlkO1xufVxuLyoqXG4gKiBTaG9ydCBoYW5kIGZvciBvZmYoKVxuICogYW5kIHJvb3QoKSwgaWUgYm90aFxuICogd2l0aCBubyBwYXJhbWV0ZXJzXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5vZmYoKTtcbiAgdGhpcy5yb290KCk7XG59O1xuXG52YXIgX2RlZmF1bHQgPSBEZWxlZ2F0ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7IiwiaW1wb3J0IERlbGVnYXRlIGZyb20gJ2Z0ZG9tZGVsZWdhdGUnO1xuXG4vKipcbiAqIEFwcGVuZCByb3dzIHRvIHRhYmxlLlxuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHBhcmFtIHtFbGVtZW50fSB0Ym9keSAtIFRoZSB0YWJsZSBib2R5IHRvIGFwcGVuZCB0aGUgcm93IGJhdGNoIHRvLlxuICogQHBhcmFtIHtBcnJheX0gcm93QmF0Y2ggLSBBbiBhcnJheSBvZiByb3dzIHRvIGFwcGVuZCB0byB0aGUgdGFibGUgYm9keS5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGFwcGVuZCh0Ym9keSwgcm93QmF0Y2gpIHtcblx0aWYgKHRib2R5LmFwcGVuZCkge1xuXHRcdHRib2R5LmFwcGVuZCguLi5yb3dCYXRjaCk7XG5cdH0gZWxzZSB7XG5cdFx0cm93QmF0Y2guZm9yRWFjaChyb3cgPT4gdGJvZHkuYXBwZW5kQ2hpbGQocm93KSk7XG5cdH1cbn1cblxuLyoqXG4gKiBQcmVwZW5kIHJvd3MgdG8gdGFibGUuXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHRib2R5IC0gVGhlIHRhYmxlIGJvZHkgdG8gcHJlcGVuZCB0aGUgcm93IGJhdGNoIHRvLlxuICogQHBhcmFtIHtBcnJheX0gcm93QmF0Y2ggLSBBbiBhcnJheSBvZiByb3dzIHRvIHByZXBlbmQgdG8gdGhlIHRhYmxlIGJvZHkuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICovXG5mdW5jdGlvbiBwcmVwZW5kKHRib2R5LCByb3dCYXRjaCkge1xuXHRpZiAodGJvZHkucHJlcGVuZCkge1xuXHRcdHRib2R5LnByZXBlbmQoLi4ucm93QmF0Y2gpO1xuXHR9IGVsc2Uge1xuXHRcdHJvd0JhdGNoLnJldmVyc2UoKS5mb3JFYWNoKHJvdyA9PiB7XG5cdFx0XHR0Ym9keS5pbnNlcnRCZWZvcmUocm93LCB0Ym9keS5maXJzdENoaWxkKTtcblx0XHR9KTtcblx0fVxufVxuXG5jbGFzcyBCYXNlVGFibGUge1xuXG5cdC8qKlxuXHQgKiBUaGUgc2hhcmVkIGZ1bmN0aW9uYWxpdHkgb2YgYWxsIGBvLXRhYmxlYCB2YXJpYW50cy5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdEVsIC0gVGhlIGBvLXRhYmxlYCBlbGVtZW50LlxuXHQgKiBAcGFyYW0ge1RhYmxlU29ydGVyfSBzb3J0ZXJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgW3t9XVxuXHQgKiBAcGFyYW0ge0Jvb2x9IG9wdHMuc29ydGFibGUgW3RydWVdXG5cdCAqIEByZXR1cm5zIHtCYXNlVGFibGV9XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihyb290RWwsIHNvcnRlciwgb3B0cyA9IHt9KSB7XG5cdFx0dGhpcy5fbGlzdGVuZXJzID0gW107XG5cdFx0dGhpcy5fc29ydGVyID0gc29ydGVyO1xuXHRcdHRoaXMucm9vdEVsID0gcm9vdEVsO1xuXHRcdHRoaXMuX29wdHMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdHNvcnRhYmxlOiB0aGlzLnJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby10YWJsZS1zb3J0YWJsZScpICE9PSAnZmFsc2UnLFxuXHRcdFx0cHJlZmVycmVkU29ydE9yZGVyOiB0aGlzLnJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby10YWJsZS1wcmVmZXJyZWQtc29ydC1vcmRlcicpXG5cdFx0fSwgb3B0cyk7XG5cdFx0dGhpcy50aGVhZCA9IHRoaXMucm9vdEVsLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkJyk7XG5cdFx0dGhpcy50Ym9keSA9IHRoaXMucm9vdEVsLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cdFx0dGhpcy50YWJsZUNhcHRpb24gPSB0aGlzLnJvb3RFbC5xdWVyeVNlbGVjdG9yKCdjYXB0aW9uJyk7XG5cdFx0dGhpcy50YWJsZUhlYWRlcnMgPSB0aGlzLnRoZWFkID8gQXJyYXkuZnJvbShcblx0XHRcdHRoaXMudGhlYWQucXVlcnlTZWxlY3RvckFsbCgndHI6bGFzdC1vZi10eXBlID4gdGgnKVxuXHRcdCkgOiBbXTtcblx0XHR0aGlzLnRhYmxlUm93cyA9IHRoaXMudGJvZHkgPyBBcnJheS5mcm9tKHRoaXMudGJvZHkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyJykpIDogW107XG5cdFx0dGhpcy5fZmlsdGVyZWRUYWJsZVJvd3MgPSBbXTtcblx0XHR0aGlzLndyYXBwZXIgPSB0aGlzLnJvb3RFbC5jbG9zZXN0KCcuby10YWJsZS1zY3JvbGwtd3JhcHBlcicpO1xuXHRcdHRoaXMuY29udGFpbmVyID0gdGhpcy5yb290RWwuY2xvc2VzdCgnLm8tdGFibGUtY29udGFpbmVyJyk7XG5cdFx0dGhpcy5vdmVybGF5V3JhcHBlciA9IHRoaXMucm9vdEVsLmNsb3Nlc3QoJy5vLXRhYmxlLW92ZXJsYXktd3JhcHBlcicpO1xuXHRcdHRoaXMuZmlsdGVyQ29udGFpbmVyID0gdGhpcy53cmFwcGVyIHx8IHRoaXMuY29udGFpbmVyO1xuXHRcdHRoaXMuX3VwZGF0ZVRhYmxlSGVpZ2h0TGlzdGVuZXJTZXQgPSBmYWxzZTtcblxuXHRcdC8qKlxuXHRcdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fE51bGx9IF9jdXJyZW50U29ydCAtIFRoZSBjdXJyZW50IHNvcnQgYXBwbGllZC5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gX2N1cnJlbnRTb3J0LmNvbHVtbkluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBjdXJyZW50bHkgc29ydGVkIGNvbHVtbi5cblx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gX2N1cnJlbnRTb3J0LnNvcnRPcmRlciAtIFRoZSB0eXBlIG9mIHNvcnQsIFwiYXNjZW5kaW5nXCIgb3IgXCJkZXNjZW5kaW5nXCJcblx0XHQgKi9cblx0XHR0aGlzLl9jdXJyZW50U29ydCA9IG51bGw7XG5cblx0XHQvKipcblx0XHQgKiBAcHJvcGVydHkge09iamVjdHxOdWxsfSBfY3VycmVudEZpbHRlciAtIFRoZSBmaWx0ZXIgY3VycmVudGx5IGFwcGxpZWQuXG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IF9jdXJyZW50RmlsdGVyLmNvbHVtbkluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBjb2x1bW4gd2hpY2ggaXMgZmlsdGVyZWQuXG5cdFx0ICogQHByb3BlcnR5IHtTdHJpbmd8RnVuY3Rpb259IF9jdXJyZW50RmlsdGVyLmZpbHRlciAtIFRoZSBmaWx0ZXIgYXBwbGllZC5cblx0XHQgKi9cblx0XHR0aGlzLl9jdXJyZW50RmlsdGVyID0gbnVsbDtcblxuXHRcdC8vIERlZmVyIGZpbHRlciBzZXR1cC5cblx0XHR3aW5kb3cuc2V0VGltZW91dCh0aGlzLl9zZXR1cEZpbHRlcnMuYmluZCh0aGlzKSwgMCk7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgYW5kIGFkZCBldmVudCBsaXN0ZW5lcnMgdG8gYW55IGZpbHRlciBjb250cm9scyBmb3IgdGhpcyB0YWJsZS5cblx0ICogRS5nLiBmb3JtIGlucHV0cyB3aXRoIHRoZSBkYXRhIGF0dHJpYnV0ZSBgW2RhdGEtby10YWJsZS1maWx0ZXItaWQ9XCJ0YWJsZUlkXCJdYFxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9zZXR1cEZpbHRlcnMoKSB7XG5cdFx0Y29uc3QgdGFibGVJZCA9IHRoaXMucm9vdEVsLmdldEF0dHJpYnV0ZSgnaWQnKTtcblx0XHRpZiAoIXRhYmxlSWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Ly8gRG8gbm90aGluZyBpZiBubyBmaWx0ZXIgaXMgZm91bmQgZm9yIHRoaXMgdGFibGUuXG5cdFx0Y29uc3QgZmlsdGVyID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLW8tdGFibGUtZmlsdGVyLWlkPVwiJHt0YWJsZUlkfVwiXWApO1xuXHRcdGlmICghZmlsdGVyKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIERvIG5vdCBzZXR1cCBmaWx0ZXIgaWYgbWFya3VwIGlzIG1pc3NpbmcuXG5cdFx0aWYgKCF0aGlzLmZpbHRlckNvbnRhaW5lcikge1xuXHRcdFx0Y29uc29sZS53YXJuKGBDb3VsZCBub3Qgc2V0dXAgdGhlIGZpbHRlciBmb3IgdGhlIHRhYmxlIFwiJHt0YWJsZUlkfVwiIGFzIG1hcmt1cCBpcyBtaXNzaW5nLiBBIGZpbHRlcmFibGUgdGFibGUgbXVzdCBiZSB3aXRoaW4gYSBkaXYgd2l0aCBjbGFzcyBcIm8tdGFibGUtY29udGFpbmVyXCIuYCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIFdhcm4gaWYgYSBtaXNjb25maWd1cmVkIGZpbHRlciB3YXMgZm91bmQuXG5cdFx0Y29uc3QgZmlsdGVyQ29sdW1uID0gcGFyc2VJbnQoZmlsdGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1vLXRhYmxlLWZpbHRlci1jb2x1bW4nKSwgMTApO1xuXHRcdGlmIChpc05hTihmaWx0ZXJDb2x1bW4pKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oYENvdWxkIG5vdCBzZXR1cCB0aGUgZmlsdGVyIGZvciB0aGUgdGFibGUgXCIke3RhYmxlSWR9XCIgYXMgbm8gY29sdW1uIGluZGV4IHdhcyBnaXZlbiB0byBmaWx0ZXIgb24uIEFkZCBhIFxcYGRhdGEtby10YWJsZS1maWx0ZXItY29sdW1uPVwie2NvbHVtbkluZGV4fVwiXFxgIGF0dHJpYnV0ZSB0byB0aGUgZmlsdGVyLmAsIGZpbHRlcik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIEFwcGx5IHRoZSBmaWx0ZXIgLlxuXHRcdGlmIChmaWx0ZXIudmFsdWUpIHtcblx0XHRcdHRoaXMuZmlsdGVyKGZpbHRlckNvbHVtbiwgZmlsdGVyLnZhbHVlKTtcblx0XHR9XG5cdFx0Ly8gQWRkIGEgbGlzdGVuZXIgdG8gZmlsdGVyIHRoZSB0YWJsZS5cblx0XHRsZXQgcGVuZGluZ0ZpbHRlclRpbWVvdXQ7XG5cdFx0Y29uc3QgZGVib3VuY2VkRmlsdGVySGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRpZiAocGVuZGluZ0ZpbHRlclRpbWVvdXQpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHBlbmRpbmdGaWx0ZXJUaW1lb3V0KTtcblx0XHRcdH1cblx0XHRcdHBlbmRpbmdGaWx0ZXJUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRoaXMuZmlsdGVyKGZpbHRlckNvbHVtbiwgZXZlbnQudGFyZ2V0LnZhbHVlIHx8ICcnKTtcblx0XHRcdFx0cGVuZGluZ0ZpbHRlclRpbWVvdXQgPSBudWxsO1xuXHRcdFx0fS5iaW5kKHRoaXMpLCAzMyk7XG5cdFx0fS5iaW5kKHRoaXMpO1xuXHRcdGZpbHRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGRlYm91bmNlZEZpbHRlckhhbmRsZXIpO1xuXHRcdGZpbHRlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkZWJvdW5jZWRGaWx0ZXJIYW5kbGVyKTtcblx0XHR0aGlzLl9saXN0ZW5lcnMucHVzaCh7IGVsZW1lbnQ6IGZpbHRlciwgZGVib3VuY2VkRmlsdGVySGFuZGxlciwgdHlwZTogJ2lucHV0JyB9KTtcblx0XHR0aGlzLl9saXN0ZW5lcnMucHVzaCh7IGVsZW1lbnQ6IGZpbHRlciwgZGVib3VuY2VkRmlsdGVySGFuZGxlciwgdHlwZTogJ2NoYW5nZScgfSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBvLXRhYmxlIGluc3RhbmNlIHdpdGggcm93cyBhZGRlZCBvciByZW1vdmVkIGR5bmFtaWNhbGx5IGZyb21cblx0ICogdGhlIHRhYmxlLiBBcHBsaWVzIGFueSBleGlzdGluZyBzb3J0IGFuZCBmaWx0ZXIgdG8gbmV3IHJvd3MuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHR1cGRhdGVSb3dzKCkge1xuXHRcdGNvbnN0IHJvd3MgPSB0aGlzLl9nZXRMYXRlc3RSb3dOb2RlcygpO1xuXHRcdC8vIFNldCBvLXRhYmxlIHJvd3MuXG5cdFx0dGhpcy50YWJsZVJvd3MgPSByb3dzO1xuXHRcdC8vIFJlLWFwcGx5IHNvcnQuXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnRTb3J0KSB7XG5cdFx0XHRjb25zdCB7IGNvbHVtbkluZGV4LCBzb3J0T3JkZXIgfSA9IHRoaXMuX2N1cnJlbnRTb3J0O1xuXHRcdFx0dGhpcy5zb3J0Um93c0J5Q29sdW1uKGNvbHVtbkluZGV4LCBzb3J0T3JkZXIpO1xuXHRcdH1cblx0XHQvLyBSZS1hcHBseSBmaWx0ZXIuXG5cdFx0aWYgKHRoaXMuX2N1cnJlbnRGaWx0ZXIpIHtcblx0XHRcdGNvbnN0IHsgY29sdW1uSW5kZXgsIGZpbHRlciB9ID0gdGhpcy5fY3VycmVudEZpbHRlcjtcblx0XHRcdHRoaXMuX2ZpbHRlclJvd3NCeUNvbHVtbihjb2x1bW5JbmRleCwgZmlsdGVyKTtcblx0XHR9XG5cdFx0Ly8gUmVuZGVyIHJvd3MuXG5cdFx0dGhpcy5yZW5kZXJSb3dVcGRhdGVzKCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFsbCB0aGUgdGFibGUgYm9keSdzIGN1cnJlbnQgcm93IG5vZGVzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7QXJyYXk8Tm9kZT59XG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0X2dldExhdGVzdFJvd05vZGVzKCkge1xuXHRcdHJldHVybiB0aGlzLnRib2R5ID8gQXJyYXkuZnJvbSh0aGlzLnRib2R5LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0cicpKSA6IFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGRvbSB0byBhY2NvdW50IGZvciByb3cgdXBkYXRlcywgaW5jbHVkaW5nIHdoZW4gdGhlaXIgc29ydFxuXHQgKiBvcmRlciBjaGFuZ2VzLCBvciBhbnkgZmlsdGVyIGlzIGFwcGxpZWQuIEUuZy4gY2hhbmdlcyB0aGUgZG9tIG9yZGVyLFxuXHQgKiBhcHBsaWVzIGFyaWEtbGFiZWxzIHRvIGhpZGRlbiByb3dzLCB1cGRhdGVzIHRoZSB0YWJsZSBoZWlnaHQgdG9cblx0ICogZWZmaWNpZW50bHkgaGlkZSB0aGVtLlxuXHQgKlxuXHQgKiBOb3RlIHRoaXMgZG9lcyBub3QgY2FsY3VsYXRlIHdoaWNoIHJvd3Mgc2hvdWxkIGJlIHNvcnRlZCBvciBmaWx0ZXJlZCxcblx0ICogYW5kIGRvZXMgbm90IGxvb2sgZm9yIG5ldyByb3dzIGFkZGVkIHRvIHRoZSBkb20uIFNlZSBgdXBkYXRlUm93c2AuXG5cdCAqXG5cdCAqIEBzZWUgdXBkYXRlUm93c1xuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0cmVuZGVyUm93VXBkYXRlcygpIHtcblx0XHR0aGlzLl91cGRhdGVSb3dBcmlhSGlkZGVuKCk7XG5cdFx0dGhpcy5faGlkZUZpbHRlcmVkUm93cygpO1xuXHRcdHRoaXMuX3VwZGF0ZVRhYmxlSGVpZ2h0KCk7XG5cdFx0dGhpcy5fdXBkYXRlUm93T3JkZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlIGZpbHRlcmVkIHJvd3MgYnkgdXBkYXRpbmcgdGhlIGNvbnRhaW5lciBoZWlnaHQuXG5cdCAqIEZpbHRlcmVkIHJvd3MgYXJlIG5vdCByZW1vdmVkIGZyb20gdGhlIHRhYmxlIHNvIGNvbHVtbiB3aWR0aCBpcyBub3Rcblx0ICogcmVjYWxjdWxhdGVkLiBVbmZvcnR1bmF0ZWx5IFwidmlzaWJpbGl0eTogY29sbGFwb3NlZFwiIGhhcyBpbmNvbnNpc3RlbnRcblx0ICogc3VwcG9ydC5cblx0ICovXG5cdF91cGRhdGVUYWJsZUhlaWdodCgpIHtcblx0XHRpZiAoIXRoaXMuZmlsdGVyQ29udGFpbmVyKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oYFRoZSB0YWJsZSBoYXMgbWlzc2luZyBtYXJrdXAuIEEgcmVzcG9uc2l2ZSBvciBmaWx0ZXJhYmxlIHRhYmxlIG11c3QgYmUgd2l0aGluIGEgZGl2IHdpdGggY2xhc3MgXCJvLXRhYmxlLWNvbnRhaW5lclwiLmAsIHRoaXMucm9vdEVsKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fdXBkYXRlVGFibGVIZWlnaHRTY2hlZHVsZWQpIHtcblx0XHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGVUYWJsZUhlaWdodFNjaGVkdWxlZCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGFibGVIZWlnaHQgPSB0aGlzLl9nZXRUYWJsZUhlaWdodCgpO1xuXG5cdFx0dGhpcy5fdXBkYXRlVGFibGVIZWlnaHRTY2hlZHVsZWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuZmlsdGVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICFpc05hTih0YWJsZUhlaWdodCkgPyBgJHt0YWJsZUhlaWdodH1weGAgOiAnJztcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0Ly8gSWYgdGhlIHRhYmxlIGhlaWdodCBoYXMgYmVlbiBzZXQsIGl0IHNob3VsZCBiZSB1cGRhdGVkIG9uIHJlc2l6ZSxcblx0XHQvLyBzbyBsaXN0ZW4gdG8gcmVzaXplIGV2ZW50cy5cblx0XHRpZiAoIXRoaXMuX3VwZGF0ZVRhYmxlSGVpZ2h0TGlzdGVuZXJTZXQpIHtcblx0XHRcdC8vIGRlYm91bmNlIHRoZSBoZWlnaHQgdXBkYXRlIG9uIHJlc2l6ZVxuXHRcdFx0Ly8gYnJlYWtpbmc6IG9uIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UgdXNlIHRoZSBvLXV0aWxzXG5cdFx0XHQvLyBkZWJvdW5jZSBmdW5jdGlvbiBpbnN0ZWFkXG5cdFx0XHRsZXQgcGVuZGluZ1RhYmxlSGVpZ2h0VXBkYXRlO1xuXHRcdFx0Y29uc3QgdXBkYXRlVGFibGVIZWlnaHREZWJvdW5jZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChwZW5kaW5nVGFibGVIZWlnaHRVcGRhdGUpIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQocGVuZGluZ1RhYmxlSGVpZ2h0VXBkYXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwZW5kaW5nVGFibGVIZWlnaHRVcGRhdGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzLl91cGRhdGVUYWJsZUhlaWdodCgpO1xuXHRcdFx0XHR9LmJpbmQodGhpcyksIDMzKTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHRcdC8vIHNldCB0aGUgcmVzaXplIGxpc3RlbmVyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlVGFibGVIZWlnaHREZWJvdW5jZWQpO1xuXHRcdFx0Ly8gYWRkIHRvIHRoZSBsaXN0ZW5lcnMgYXJyYXkgc28gaXQgY2FuIGJlIHJlbW92ZWQgb24gYC5kZXN0cm95YFxuXHRcdFx0dGhpcy5fbGlzdGVuZXJzLnB1c2goeyBlbGVtZW50OiB3aW5kb3csIHVwZGF0ZVRhYmxlSGVpZ2h0RGVib3VuY2VkLCB0eXBlOiAncmVzaXplJyB9KTtcblx0XHRcdC8vIHNldCBhIGZsYWcgc28gdGhlIGxpc3RlbmVyIGlzbid0IHNldCBhZ2Fpbiwgd2l0aG91dCBoYXZpbmcgdG9cblx0XHRcdC8vIGxvb3AgdGhyb3VnaCBgdGhpcy5fbGlzdGVuZXJzYC5cblx0XHRcdHRoaXMuX3VwZGF0ZVRhYmxlSGVpZ2h0TGlzdGVuZXJTZXQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHRhYmxlIGhlaWdodCwgYWNjb3VudGluZyBmb3IgXCJoaWRkZW5cIiByb3dzLlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ8TnVsbH1cblx0ICovXG5cdF9nZXRUYWJsZUhlaWdodCgpIHtcblx0XHRjb25zdCB0YWJsZUhlaWdodCA9IHRoaXMucm9vdEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRjb25zdCBmaWx0ZXJlZFJvd3NIZWlnaHQgPSB0aGlzLl9yb3dzVG9IaWRlLnJlZHVjZSgoYWNjdW11bGF0ZWRIZWlnaHQsIHJvdykgPT4ge1xuXHRcdFx0cmV0dXJuIGFjY3VtdWxhdGVkSGVpZ2h0ICsgcm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHR9LCAwKTtcblxuXHRcdHJldHVybiB0YWJsZUhlaWdodCAtIGZpbHRlcmVkUm93c0hlaWdodDtcblx0fVxuXG5cdC8qKlxuXHQqIFVwZGF0ZSB0aGUgXCJhcmlhLWhpZGRlblwiIGF0dHJpYnV0ZSBvZiBhbGwgaGlkZGVuIHRhYmxlIHJvd3MuXG5cdCogUm93cyBtYXkgYmUgaGlkZGVuIGZvciBhIG51bWJlciBvZiByZWFzb25zLCBpbmNsdWRpbmcgYmVpbmcgZmlsdGVyZWQuXG5cdCovXG5cdF91cGRhdGVSb3dBcmlhSGlkZGVuKCkge1xuXHRcdGlmICh0aGlzLl91cGRhdGVSb3dBcmlhSGlkZGVuU2NoZWR1bGVkKSB7XG5cdFx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlUm93QXJpYUhpZGRlblNjaGVkdWxlZCk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgcm93c1RvSGlkZSA9IHRoaXMuX3Jvd3NUb0hpZGUgfHwgW107XG5cdFx0dGhpcy5fdXBkYXRlUm93QXJpYUhpZGRlblNjaGVkdWxlZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50YWJsZVJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG5cdFx0XHRcdHJvdy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgcm93c1RvSGlkZS5pbmRleE9mKHJvdykgIT09IC0xKTtcblx0XHRcdH0pO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cdH1cblxuXHQvKipcblx0ICogSGlkZSBmaWx0ZXJlZCByb3dzIGJ5IHVwZGF0aW5nIHRoZSBcImRhdGEtby10YWJsZS1maWx0ZXJlZFwiIGF0dHJpYnV0ZS5cblx0ICogRmlsdGVyZWQgcm93cyBhcmUgcmVtb3ZlZCBmcm9tIHRoZSB0YWJsZSB1c2luZyBDU1Mgc28gY29sdW1uIHdpZHRoIGlzXG5cdCAqIG5vdCByZWNhbGN1bGF0ZWQuXG5cdCAqL1xuXHRfaGlkZUZpbHRlcmVkUm93cygpIHtcblx0XHRpZiAodGhpcy5faGlkZUZpbHRlcmVkUm93c1NjaGVkdWxlZCkge1xuXHRcdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX2hpZGVGaWx0ZXJlZFJvd3NTY2hlZHVsZWQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZpbHRlcmVkUm93cyA9IHRoaXMuX2ZpbHRlcmVkVGFibGVSb3dzIHx8IFtdO1xuXHRcdHRoaXMuX2hpZGVGaWx0ZXJlZFJvd3NTY2hlZHVsZWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMudGFibGVSb3dzLmZvckVhY2goKHJvdykgPT4ge1xuXHRcdFx0XHRyb3cuc2V0QXR0cmlidXRlKCdkYXRhLW8tdGFibGUtZmlsdGVyZWQnLCBmaWx0ZXJlZFJvd3MuaW5kZXhPZihyb3cpICE9PSAtMSk7XG5cdFx0XHR9KTtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCogVXBkYXRlcyB0aGUgb3JkZXIgb2YgdGFibGUgcm93cyBpbiB0aGUgRE9NLiBUaGlzIGlzIHJlcXVpcmVkIHVwb24gc29ydCxcblx0KiBidXQgYWxzbyBvbiBmaWx0ZXIgYXMgaGlkZGVuIHJvd3MgbXVzdCBiZSBhdCB0aGUgYm90dG9tIG9mIHRoZSB0YWJsZS5cblx0KiBPdGhlcndpc2UgdGhlIHN0cmlwcGVkIHBhdHRlcm4gb2YgdGhlIHN0cmlwcGVkIHRhYmxlIGlzIG5vdCBtYWludGFpbmVkLlxuXHQqL1xuXHRfdXBkYXRlUm93T3JkZXIoKSB7XG5cdFx0aWYgKHRoaXMuX3VwZGF0ZVJvd09yZGVyU2NoZWR1bGVkKSB7XG5cdFx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlUm93T3JkZXJTY2hlZHVsZWQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fdXBkYXRlUm93T3JkZXJGaWxydGVkQmF0Y2hTY2hlZHVsZWQpIHtcblx0XHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGVSb3dPcmRlckZpbHJ0ZWRCYXRjaFNjaGVkdWxlZCk7XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9jdXJyZW50U29ydCAmJiAhdGhpcy5fY3VycmVudEZpbHRlcikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IG5vbkZpbHRlcmVkUm93cyA9IHRoaXMudGFibGVSb3dzLmZpbHRlcihyb3cgPT4gdGhpcy5fZmlsdGVyZWRUYWJsZVJvd3MuaW5kZXhPZihyb3cpID09PSAtMSk7XG5cdFx0dGhpcy5fdXBkYXRlUm93T3JkZXJTY2hlZHVsZWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIE1vdmUgYWxsIG5vbi1maWx0ZXJlZCByb3dzIHRvIHRoZSB0b3AsIHdpdGggY3VycmVudCBzb3J0IG9yZGVyLlxuXHRcdFx0cHJlcGVuZCh0aGlzLnRib2R5LCBub25GaWx0ZXJlZFJvd3MpO1xuXHRcdFx0dGhpcy5fdXBkYXRlUm93T3JkZXJGaWxydGVkQmF0Y2hTY2hlZHVsZWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly8gTW92ZSBhbGwgZmlsdGVyZWQgcm93cyB0byB0aGUgYm90dG9tLCB3aXRoIGN1cnJlbnQgc29ydCBvcmRlci5cblx0XHRcdFx0YXBwZW5kKHRoaXMudGJvZHksIHRoaXMuX2ZpbHRlcmVkVGFibGVSb3dzKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGaWx0ZXIgdGhlIHRhYmxlIGFuZCByZW5kZXIgdGhlIHJlc3VsdC5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlYWRlckluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSB0YWJsZSBjb2x1bW4gdG8gZmlsdGVyLlxuXHQgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gZmlsdGVyIC0gSG93IHRvIGZpbHRlciB0aGUgY29sdW1uIChlaXRoZXIgYSBzdHJpbmcgdG8gbWF0Y2ggb3IgYSBjYWxsYmFjayBmdW5jdGlvbikuXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRmaWx0ZXIoaGVhZGVySW5kZXgsIGZpbHRlcikge1xuXHRcdHRoaXMuX2ZpbHRlclJvd3NCeUNvbHVtbihoZWFkZXJJbmRleCwgZmlsdGVyKTtcblx0XHR0aGlzLnJlbmRlclJvd1VwZGF0ZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBGaWx0ZXJzIHRoZSB0YWJsZSByb3dzIGJ5IGEgZ2l2ZW4gY29sdW1uIGFuZCBmaWx0ZXIuXG5cdCAqIFRoaXMgZG9lcyBub3QgcmVuZGVyIHRoZSByZXN1bHQgdG8gdGhlIERPTS5cblx0ICpcblx0ICogQGFjY2VzcyBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2x1bW5JbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgdGFibGUgY29sdW1uIHRvIGZpbHRlci5cblx0ICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IGZpbHRlciAtIEhvdyB0byBmaWx0ZXIgdGhlIGNvbHVtbiAoZWl0aGVyIGEgc3RyaW5nIHRvIG1hdGNoIG9yIGEgY2FsbGJhY2sgZnVuY3Rpb24pLlxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0X2ZpbHRlclJvd3NCeUNvbHVtbihjb2x1bW5JbmRleCwgZmlsdGVyKSB7XG5cdFx0dGhpcy5fY3VycmVudEZpbHRlciA9IHtcblx0XHRcdGNvbHVtbkluZGV4LFxuXHRcdFx0ZmlsdGVyXG5cdFx0fTtcblxuXHRcdGlmICh0eXBlb2YgZmlsdGVyICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgZmlsdGVyICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaWx0ZXIgdGFibGUgY29sdW1uIFwiJHtjb2x1bW5JbmRleH1cIi4gRXhwZWN0ZWQgdGhlIGZpbHRlciB0byBhIHN0cmluZyBvciBmdW5jdGlvbi5gLCB0aGlzKTtcblx0XHR9XG5cblx0XHQvLyBGaWx0ZXIgY29sdW1uIGhlYWRpbmdzLlxuXHRcdHRoaXMuX2ZpbHRlcmVkVGFibGVSb3dzID0gW107XG5cdFx0dGhpcy50YWJsZVJvd3MuZm9yRWFjaChyb3cgPT4ge1xuXHRcdFx0Y29uc3QgY2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yKGB0ZDpudGgtb2YtdHlwZSgke2NvbHVtbkluZGV4ICsgMX0pYCk7XG5cdFx0XHRpZiAoY2VsbCkge1xuXHRcdFx0XHRjb25zdCBoaWRlUm93ID0gQmFzZVRhYmxlLl9maWx0ZXJNYXRjaChjZWxsLCBmaWx0ZXIpO1xuXHRcdFx0XHRpZiAoaGlkZVJvdykge1xuXHRcdFx0XHRcdHRoaXMuX2ZpbHRlcmVkVGFibGVSb3dzLnB1c2gocm93KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIGEgZ2l2ZW4gdGFibGUgY2VsbCBtYXRjaGVzIHRoZSB0YWJsZSBmaWx0ZXIuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGNlbGwgLSBUaGUgdGFibGUgY2VsbCB0byB0ZXN0IHRoZSBmaWx0ZXIgZnVuY3Rpb24gYWdhaW5zdC5cblx0ICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IGZpbHRlciAtIFRoZSBmaWx0ZXIsIGVpdGhlciBhIHN0cmluZyBvciBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRzdGF0aWMgX2ZpbHRlck1hdGNoKGNlbGwsIGZpbHRlcikge1xuXHRcdC8vIElmIHRoZSBmaWx0ZXIgaXMgYSBzdHJpbmcgY3JlYXRlIGEgZmlsdGVyIGZ1bmN0aW9uIHdoaWNoOlxuXHRcdC8vIC0gQWx3YXlzIG1hdGNoZXMgYW4gZW10cHkgc3RyaW5nIChubyBmaWx0ZXIpLlxuXHRcdC8vIC0gTWF0Y2hlcyBhZ2FpbnN0IG9ubHkgYWxwaGEgbnVtZXJpYyBjaGFyYWN0ZXJzIGFuZCBcIi5cIi5cblx0XHQvLyAtIENhc2UgaW5zZW50aXZpZS5cblx0XHQvLyAtIFdoaXRlc3BhY2UgaW5zZW50aXZpZS5cblx0XHRpZiAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGNvbnN0IGZpbHRlclZhbHVlID0gZmlsdGVyLnJlcGxhY2UoL1teXFx3XFwuXSsvZywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRmaWx0ZXIgPSAoY2VsbCkgPT4ge1xuXHRcdFx0XHRjb25zdCBjZWxsVmFsdWUgPSBjZWxsLnRleHRDb250ZW50LnJlcGxhY2UoL1teXFx3XFwuXSsvZywgJycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdHJldHVybiBmaWx0ZXJWYWx1ZSA/IGNlbGxWYWx1ZS5pbmRleE9mKGZpbHRlclZhbHVlKSA+IC0xIDogdHJ1ZTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGZpbHRlciBtYXRjaGVzIHRoZSBnaXZlbiB0YWJsZSBjZWxsLlxuXHRcdHJldHVybiBmaWx0ZXIoY2VsbCkgIT09IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogV2hpY2ggcm93cyBhcmUgaGlkZGVuLCBlLmcuIGJ5IGEgZmlsdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXlbTm9kZV19XG5cdCAqL1xuXHRnZXQgX3Jvd3NUb0hpZGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZpbHRlcmVkVGFibGVSb3dzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgYSB0YWJsZSBoZWFkZXIgZm9yIGEgZ2l2ZW4gY29sdW1uIGluZGV4LlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0ge051bWJlcn0gY29sdW1uSW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHRhYmxlIGNvbHVtbiB0byBnZXQgdGhlIGhlYWRlciBmb3IuXG5cdCAqIEB0aHJvd3MgV2hlbiBubyBoZWFkZXIgaXMgbm90IGZvdW5kLlxuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9XG5cdCAqL1xuXHRnZXRUYWJsZUhlYWRlcihjb2x1bW5JbmRleCkge1xuXHRcdGNvbnN0IHRoID0gdGhpcy50YWJsZUhlYWRlcnNbY29sdW1uSW5kZXhdO1xuXHRcdGlmICghdGgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgaGVhZGVyIGZvciBjb2x1bW4gaW5kZXggXCIke2NvbHVtbkluZGV4fVwiLmApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGg7XG5cdH1cblxuXHQvKipcblx0ICogU29ydCB0aGUgdGFibGUuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2x1bW5JbmRleCAtIFRoZSBpbmRleCBvZiB0aGUgdGFibGUgY29sdW1uIHRvIHNvcnQuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBzb3J0T3JkZXIgLSBIb3cgdG8gc29ydCB0aGUgY29sdW1uLCBcImFzY2VuZGluZ1wiIG9yIFwiZGVzY2VuZGluZ1wiXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRzb3J0Um93c0J5Q29sdW1uKGNvbHVtbkluZGV4LCBzb3J0T3JkZXIpIHtcblx0XHQvKipcblx0XHQgKiBGaXJlcyBhbiBcIm9UYWJsZS5zb3J0aW5nXCIgZXZlbnQuIFRoZSBzb3J0aW5nIGV2ZW50IGNhbiBiZSBjYW5jZWxsZWQgdG9cblx0XHQgKiBwcm92aWRlIGEgdG90YWxseSBjdXN0b20gbWV0aG9kIG9mIHNvcnRpbmcgdGhlIHRhYmxlLlxuXHRcdCAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9kaXNwYXRjaEV2ZW50XG5cdFx0ICovXG5cdFx0Y29uc3QgZGVmYXVsdFNvcnQgPSB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzb3J0aW5nJywge1xuXHRcdFx0c29ydDogc29ydE9yZGVyLFxuXHRcdFx0Y29sdW1uSW5kZXhcblx0XHR9LCB7IGNhbmNlbGFibGU6IHRydWUgfSk7XG5cblx0XHRpZiAoZGVmYXVsdFNvcnQpIHtcblx0XHRcdHRoaXMuX3NvcnRlci5zb3J0Um93c0J5Q29sdW1uKHRoaXMsIGNvbHVtbkluZGV4LCBzb3J0T3JkZXIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgc29ydCBidXR0b25zIHRvIHRoZSBET00gd2l0aGluIHRoZSB0YWJsZSBoZWFkZXIuXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRhZGRTb3J0QnV0dG9ucygpIHtcblx0XHRpZiAoIXRoaXMuX29wdHMuc29ydGFibGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgYnV0dG9ucyBmb3IgZWFjaCB0YWJsZSBoZWFkZXIuXG5cdFx0Y29uc3QgdGFibGVIZWFkZXJCdXR0b25zID0gdGhpcy50YWJsZUhlYWRlcnMubWFwKCh0aCkgPT4ge1xuXHRcdFx0Ly8gRG9uJ3QgYWRkIHNvcnQgYnV0dG9ucyB0byB1bnNvcnRhYmxlIGNvbHVtbnMuXG5cdFx0XHRpZiAodGguaGFzQXR0cmlidXRlKCdkYXRhLW8tdGFibGUtaGVhZGluZy1kaXNhYmxlLXNvcnQnKSkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHRcdC8vIERvbid0IGFkZCBzb3J0IGJ1dHRvbnMgdG8gY29sdW1ucyB3aXRoIG5vIGhlYWRpbmdzLlxuXHRcdFx0aWYgKCF0aC5oYXNDaGlsZE5vZGVzKCkpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHQvLyBNb3ZlIGhlYWRpbmcgdGV4dCBpbnRvIGJ1dHRvbi5cblx0XHRcdGNvbnN0IGhlYWRpbmdOb2RlcyA9IEFycmF5LmZyb20odGguY2hpbGROb2Rlcyk7XG5cdFx0XHRjb25zdCBoZWFkaW5nSFRNTCA9IGhlYWRpbmdOb2Rlcy5yZWR1Y2UoKGh0bWwsIG5vZGUpID0+IHtcblx0XHRcdFx0Ly8gTWFpbnRhaW4gY2hpbGQgZWxlbWVudHMgb2YgdGhlIGhlYWRpbmcgd2hpY2ggbWFrZSBzZW5zZSBpbiBhIGJ1dHRvbi5cblx0XHRcdFx0Y29uc3QgbWFpbnRhaW5lZEVsZW1lbnRzID0gWydBQkJSJywgJ0InLCAnQkRJJywgJ0JETycsICdCUicsICdDT0RFJywgJ0NJVEUnLCAnREFUQScsICdERk4nLCAnREVMJywgJ0VNJywgJ0knLCAnUycsICdTTUFMTCcsICdTUEFOJywgJ1NUUk9ORycsICdTVUInLCAnU1VQJywgJ1RJTUUnLCAnVScsICdWQVInLCAnV0JSJ107XG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBtYWludGFpbmVkRWxlbWVudHMuaW5kZXhPZihub2RlLm5vZGVOYW1lKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRyZXR1cm4gaHRtbCArIG5vZGUub3V0ZXJIVE1MO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIE90aGVyd2lzZSByZXR1cm4gdGV4dCBjb250ZW50LlxuXHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oYG8tdGFibGUgaGFzIHJlbW92ZWQgdGhlIGVsZW1lbnQgXCIke25vZGUubm9kZU5hbWV9XCIgZnJvbSB0aGUgdGFibGUgaGVhZGluZyB0byBhZGQgYSBzb3J0IGJ1dHRvbiBvbiB0aGUgY29sdW1uLiBQbGVhc2UgcmVtb3ZlIHRoaXMgZWxlbWVudCBmcm9tIHlvdXIgdGFibGUgaGVhZGluZywgZGlzYWJsZSBzb3J0IG9uIHRoaXMgY29sdW1uLCBvciBjb250YWN0IHRoZSBPcmlnYW1pIHRlYW0gZm9yIGhlbHAuYCwgdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBodG1sICsgbm9kZS50ZXh0Q29udGVudDtcblx0XHRcdH0sICcnKTtcblxuXHRcdFx0Y29uc3Qgc29ydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdFx0c29ydEJ1dHRvbi5pbm5lckhUTUwgPSBoZWFkaW5nSFRNTDtcblx0XHRcdHNvcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnby10YWJsZV9fc29ydCcpO1xuXHRcdFx0Ly8gSW4gVm9pY2VPdmVyLCBidXR0b24gYGFyaWEtbGFiZWxgIGlzIHJlcGVhdGVkIHdoZW4gbW92aW5nIGZyb20gb25lIGNvbHVtbiBvZiB0ZHMgdG8gdGhlIG5leHQuXG5cdFx0XHQvLyBVc2luZyBgdGl0bGVgIGF2b2lkcyB0aGlzLCBidXQgcmlza3Mgbm90IGJlaW5nIGFubm91bmNlZCBieSBvdGhlciBzY3JlZW4gcmVhZGVycy5cblx0XHRcdGNvbnN0IG5leHRTb3J0ID0gdGhpcy5fZ2V0TmV4dFNvcnRPcmRlcih0aCk7XG5cdFx0XHRzb3J0QnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgc29ydCB0YWJsZSBieSBcIiR7dGgudGV4dENvbnRlbnR9XCIgJHtuZXh0U29ydH1gKTtcblx0XHRcdHJldHVybiBzb3J0QnV0dG9uO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIHNvcnQgYnV0dG9ucyB0byB0YWJsZSBoZWFkZXJzLlxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCl7XG5cdFx0XHR0aGlzLnJvb3RFbC5jbGFzc0xpc3QuYWRkKCdvLXRhYmxlLS1zb3J0YWJsZScpO1xuXHRcdFx0dGhpcy50YWJsZUhlYWRlcnMuZm9yRWFjaCgodGgsIGluZGV4KSA9PiB7XG5cdFx0XHRcdGlmICh0YWJsZUhlYWRlckJ1dHRvbnNbaW5kZXhdKSB7XG5cdFx0XHRcdFx0dGguaW5uZXJIVE1MID0gJyc7XG5cdFx0XHRcdFx0dGguYXBwZW5kQ2hpbGQodGFibGVIZWFkZXJCdXR0b25zW2luZGV4XSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHQvLyBBZGQgY2xpY2sgZXZlbnQgdG8gYnV0dG9ucy5cblx0XHRjb25zdCBsaXN0ZW5lciA9IHRoaXMuX3NvcnRCdXR0b25IYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fcm9vdEVsRG9tRGVsZWdhdGUgPSB0aGlzLl9yb290RWxEb21EZWxlZ2F0ZSB8fCBuZXcgRGVsZWdhdGUodGhpcy5yb290RWwpO1xuXHRcdHRoaXMuX3Jvb3RFbERvbURlbGVnYXRlLm9uKCdjbGljaycsICcuby10YWJsZV9fc29ydCcsIGxpc3RlbmVyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZSB0aGF0IHRoZSB0YWJsZSBoYXMgYmVlbiBzb3J0ZWQgYWZ0ZXIgaW50ZXJjZXB0aW5nIHRoZSBzb3J0aW5nIGV2ZW50LlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0ge09iamVjdH0gc29ydERldGFpbHMgLSBEZXRhaWxzIG9mIHRoZSBjdXJyZW50IHNvcnQgc3RhdGUuXG5cdCAqIEBwYXJhbSB7TnVtYmVyfE51bGx9IHNvcnREZXRhaWxzLmNvbHVtbkluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSBjdXJyZW50bHkgc29ydGVkIGNvbHVtbi5cblx0ICogQHBhcmFtIHtTdHJpbmd8TnVsbH0gc29ydERldGFpbHMuc29ydE9yZGVyIC0gVGhlIHR5cGUgb2Ygc29ydCwgXCJhc2NlbmRpbmdcIiBvciBcImRlc2NlbmRpbmdcIlxuXHQgKi9cblx0c29ydGVkKHsgY29sdW1uSW5kZXgsIHNvcnRPcmRlciB9KSB7XG5cdFx0aWYgKGlzTmFOKGNvbHVtbkluZGV4KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIG51bWVyaWNhbCBjb2x1bW4gaW5kZXggYnV0IHJlY2VpdmVkIFwiJHtjb2x1bW5JbmRleH1cIi5gKTtcblx0XHR9XG5cdFx0aWYgKCFzb3J0T3JkZXIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYSBzb3J0IG9yZGVyIGUuZy4gXCJhc2NlbmRpbmdcIiBvciBcImRlc2NlbmRpbmdcIi5gKTtcblx0XHR9XG5cdFx0dGhpcy5fY3VycmVudFNvcnQgPSB7XG5cdFx0XHRzb3J0T3JkZXIsXG5cdFx0XHRjb2x1bW5JbmRleFxuXHRcdH07XG5cblx0XHQvLyBVcGRhdGUgdGhlIGJ1dHRvbiB0aXRsZSB0byByZWZsZWN0IHRoZSBuZXcgc29ydC5cblx0XHRjb25zdCB0aCA9IHRoaXMuZ2V0VGFibGVIZWFkZXIoY29sdW1uSW5kZXgpO1xuXHRcdGNvbnN0IHNvcnRCdXR0b24gPSB0aC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcblx0XHRpZiAoc29ydEJ1dHRvbikge1xuXHRcdFx0bGV0IGJ1dHRvblRpdGxlID0gc29ydEJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ3RpdGxlJyk7XG5cdFx0XHRidXR0b25UaXRsZSA9IHNvcnRPcmRlciA9PT0gJ2FzY2VuZGluZycgP1xuXHRcdFx0XHRidXR0b25UaXRsZS5yZXBsYWNlKCdhc2NlbmRpbmcnLCAnZGVzY2VuZGluZycpIDpcblx0XHRcdFx0YnV0dG9uVGl0bGUucmVwbGFjZSgnZGVzY2VuZGluZycsICdhc2NlbmRpbmcnKTtcblx0XHRcdHNvcnRCdXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsIGJ1dHRvblRpdGxlKTtcblx0XHR9XG5cblx0XHR0aGlzLl9kaXNwYXRjaEV2ZW50KCdzb3J0ZWQnLCB0aGlzLl9jdXJyZW50U29ydCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0cyB0aGUgaW5zdGFuY2UgcmVhZHkgZm9yIGRlbGV0aW9uLlxuXHQgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyB0aGF0IHdlcmUgYWRkZWQgZHVyaW5nIGluc3RhdGlhdGlvbiBvZiB0aGUgY29tcG9uZW50LlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0ZGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5fcm9vdEVsRG9tRGVsZWdhdGUpIHtcblx0XHRcdHRoaXMuX3Jvb3RFbERvbURlbGVnYXRlLmRlc3Ryb3koKTtcblx0XHR9XG5cdFx0dGhpcy5fbGlzdGVuZXJzLmZvckVhY2goKHsgdHlwZSwgbGlzdGVuZXIsIGVsZW1lbnQgfSkgPT4ge1xuXHRcdFx0ZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcblx0XHR9KTtcblxuXHRcdC8vIFJlbW92ZSBET00gcmVmZXJlbmNlcy5cblx0XHRkZWxldGUgdGhpcy50aGVhZDtcblx0XHRkZWxldGUgdGhpcy50Ym9keTtcblx0XHRkZWxldGUgdGhpcy50YWJsZUhlYWRlcnM7XG5cdFx0ZGVsZXRlIHRoaXMudGFibGVSb3dzO1xuXHRcdGRlbGV0ZSB0aGlzLl9maWx0ZXJlZFRhYmxlUm93cztcblx0XHRkZWxldGUgdGhpcy53cmFwcGVyO1xuXHRcdGRlbGV0ZSB0aGlzLmNvbnRhaW5lcjtcblx0XHRkZWxldGUgdGhpcy5vdmVybGF5V3JhcHBlcjtcblx0XHRkZWxldGUgdGhpcy5maWx0ZXJDb250YWluZXI7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGUgdGhhdCB0aGUgdGFibGUgaGFzIGJlZW4gY29uc3RydWN0ZWQgc3VjY2Vzc2Z1bGx5LlxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0X3JlYWR5KCkge1xuXHRcdHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3JlYWR5Jyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29sdW1uIHNvcnQgb3JkZXJzIGFyZSB0b2dnbGVkLiBGb3IgYSBnaXZlbiBjb2x1bW4gaGVhZGluZywgcmV0dXJuXG5cdCAqIHRoZSBuZXh0IHNvcnQgb3JkZXIgd2hpY2ggc2hvdWxkIGJlIGFwcGxpZWQuXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gdGggLSBUaGUgaGVhZGluZyBmb3IgdGhlIGNvbHVtbiB0byBiZSBzb3J0ZWQuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IC0gV2hhdCB0aGUgbmV4dCBzb3J0IG9yZGVyIGZvciB0aGUgaGVhZGluZyBzaG91bGQgYmUsICdhc2NlbmRpbmcnIG9yICdkZXNjZW5kaW5nJy5cblx0ICovXG5cdF9nZXROZXh0U29ydE9yZGVyKHRoKSB7XG5cdFx0Ly8gR2V0IHRoZSBjdXJyZW50IHRhYmxlIHNvcnQuIFVzZSB0aGUgYGFyaWEtc29ydGAgYXR0cmlidXRlXG5cdFx0Ly8gd2hpY2ggbWF5IGhhdmUgYmVlbiBhcHBsaWVkIGJ5IGEgY2xpZW50IG9yIHNlcnZlciBzaWRlIHNvcnQuXG5cdFx0Y29uc3QgY3VycmVudFNvcnQgPSB0aC5nZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcpO1xuXHRcdC8vIElmIHRoZXJlIGlzIG5vIGV4aXN0aW5nIHNvcnQgdXNlIGEgZGVzY2VuZGluZyBzb3J0IGlmIHRoYXQgaGFzIGJlZW5cblx0XHQvLyBjb25maWd1cmVkIGFzIGEgcHJlZmVycmVkIHNvcnQgb3JkZXIgZm9yIHRoZSBnaXZlbiBoZWFkaW5nLlxuXHRcdGNvbnN0IG5vRXhpc3RpbmdTb3J0ID0gW251bGwsICdub25lJ10uaW5kZXhPZihjdXJyZW50U29ydCkgIT09IC0xO1xuXHRcdGlmIChub0V4aXN0aW5nU29ydCAmJiB0aGlzLl9vcHRzLnByZWZlcnJlZFNvcnRPcmRlciA9PT0gJ2Rlc2NlbmRpbmcnKSB7XG5cdFx0XHRyZXR1cm4gJ2Rlc2NlbmRpbmcnO1xuXHRcdH1cblx0XHQvLyBPdGhlcndpc2UgdGhlIG5leHQgc29ydCB3aWxsIGJlIGFzY2VuZGluZyBieSBkZWZhdWx0LCBvciBkZXNjZW5kaW5nXG5cdFx0Ly8gaWYgdGhlIGNvbHVtbiBpcyBhbHJlYWR5IHNvcnRlZCBhc2NlbmRpbmcuXG5cdFx0cmV0dXJuIGN1cnJlbnRTb3J0ICE9PSAnYXNjZW5kaW5nJyA/ICdhc2NlbmRpbmcnIDogJ2Rlc2NlbmRpbmcnO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgYSBzb3J0IGJ1dHRvbiBjbGljayBldmVudC4gVG9nZ2xlcyBjb2x1bW4gc29ydC5cblx0ICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIFRoZSBjbGljayBldmVudC5cblx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0ICovXG5cdF9zb3J0QnV0dG9uSGFuZGxlcihldmVudCkge1xuXHRcdGNvbnN0IHNvcnRCdXR0b24gPSBldmVudC50YXJnZXQ7XG5cdFx0Y29uc3QgdGggPSBzb3J0QnV0dG9uLmNsb3Nlc3QoJ3RoJyk7XG5cdFx0Y29uc3QgY29sdW1uSW5kZXggPSB0aGlzLnRhYmxlSGVhZGVycy5pbmRleE9mKHRoKTtcblx0XHRpZiAodGggJiYgIWlzTmFOKGNvbHVtbkluZGV4KSkge1xuXHRcdFx0Y29uc3Qgc29ydE9yZGVyID0gdGhpcy5fZ2V0TmV4dFNvcnRPcmRlcih0aCk7XG5cdFx0XHR0aGlzLnNvcnRSb3dzQnlDb2x1bW4oY29sdW1uSW5kZXgsIHNvcnRPcmRlcik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiB0byBkaXNwYXRjaCBuYW1lc3BhY2VkIGV2ZW50cy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50IG5hbWUgd2l0aGluIGBvVGFibGVgIGUuZy4gXCJzb3J0ZWRcIi5cblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGE9e30gLSBFdmVudCBkYXRhLiBgaW5zdGFuY2VgIGlzIGFkZGVkIGF1dG9tYXRpY2FsbHkuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzPXt9IC0gW0V2ZW50IG9wdGlvbnNde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudC9FdmVudCNWYWx1ZXN9IChvLXRhYmxlIGV2ZW50cyBidWJibGUgYnkgZGVmYXVsdCkuXG5cdCAqL1xuXHRfZGlzcGF0Y2hFdmVudChldmVudCwgZGF0YSA9IHt9LCBvcHRzID0ge30pIHtcblx0XHRPYmplY3QuYXNzaWduKGRhdGEgLCB7XG5cdFx0XHRpbnN0YW5jZTogdGhpc1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzLnJvb3RFbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChgb1RhYmxlLiR7ZXZlbnR9YCwgT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRkZXRhaWw6IGRhdGEsXG5cdFx0XHRidWJibGVzOiB0cnVlXG5cdFx0fSwgb3B0cykpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlVGFibGU7XG4iLCJpbXBvcnQgQmFzZVRhYmxlIGZyb20gJy4vQmFzZVRhYmxlLmpzJztcblxuY2xhc3MgRmxhdFRhYmxlIGV4dGVuZHMgQmFzZVRhYmxlIHtcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZXMgYW4gYG8tdGFibGVgIGNvbXBvbmVudCB3aXRoIFwiZmxhdFwiIHJlc3BvbnNpdmUgYmVoYXZpb3VyLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByb290RWwgLSBUaGUgYG8tdGFibGVgIGVsZW1lbnQuXG5cdCAqIEBwYXJhbSB7VGFibGVTb3J0ZXJ9IHNvcnRlclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0cyBbe31dXG5cdCAqIEBwYXJhbSB7Qm9vbH0gb3B0cy5zb3J0YWJsZSBbdHJ1ZV1cblx0ICogQHJldHVybnMge0ZsYXRUYWJsZX1cblx0ICovXG5cdGNvbnN0cnVjdG9yKHJvb3RFbCwgc29ydGVyLCBvcHRzID0ge30pIHtcblx0XHRzdXBlcihyb290RWwsIHNvcnRlciwgb3B0cyk7XG5cdFx0Ly8gRHVwbGljYXRlIHJvdyBoZWFkaW5ncyBiZWZvcmUgYWRkaW5nIHNvcnQgYnV0dG9ucy5cblx0XHR0aGlzLl90YWJsZUhlYWRlcnNXaXRob3V0U29ydCA9IHRoaXMudGFibGVIZWFkZXJzLm1hcChoZWFkZXIgPT4gaGVhZGVyLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0Ly8gRmxhdCB0YWJsZSBjYW4gb25seSB3b3JrIGdpdmVuIGhlYWRlcnMuXG5cdFx0aWYgKHRoaXMudGFibGVIZWFkZXJzLmxlbmd0aCA8PSAwKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBjcmVhdGUgYSBcImZsYXRcIiB0YWJsZSBhcyBubyBoZWFkZXJzIHdlcmUgZm91bmQuIEVuc3VyZSB0YWJsZSBoZWFkZXJzIGFyZSBwbGFjZWQgd2l0aGluIFwiPHRoZWFkPlwiLiBSZW1vdmluZyBjbGFzcyBcIm8tdGFibGUtLXJlc3BvbnNpdmUtZmxhdFwiLicsIHJvb3RFbCk7XG5cdFx0XHRyb290RWwuY2xhc3NMaXN0LnJlbW92ZSgnby10YWJsZS0tcmVzcG9uc2l2ZS1mbGF0Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NyZWF0ZUZsYXRUYWJsZVN0cnVjdHVyZSgpO1xuXHRcdH1cblx0XHQvLyBEZWZlciBvdGhlciB0YXNrcy5cblx0XHR3aW5kb3cuc2V0VGltZW91dCh0aGlzLmFkZFNvcnRCdXR0b25zLmJpbmQodGhpcyksIDApO1xuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuX3JlYWR5LmJpbmQodGhpcyksIDApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgby10YWJsZSBpbnN0YW5jZSB3aXRoIHJvd3MgYWRkZWQgZHluYW1pY2FsbHkgdG8gdGhlIHRhYmxlLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0dXBkYXRlUm93cygpIHtcblx0XHQvLyBVcGRhdGUgbmV3IHJvd3MgdG8gc3VwcG9ydCB0aGUgZmxhdCBzdHJ1Y3R1cmUuXG5cdFx0Y29uc3QgbGF0ZXN0Um93cyA9IHRoaXMuX2dldExhdGVzdFJvd05vZGVzKCk7XG5cdFx0dGhpcy5fY3JlYXRlRmxhdFRhYmxlU3RydWN0dXJlKGxhdGVzdFJvd3MpO1xuXHRcdC8vIFVwZGF0ZSByb3cgdmlzaWJpbGl0eSwgc29ydCwgZXRjLlxuXHRcdHN1cGVyLnVwZGF0ZVJvd3MoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYWxsIHRoZSB0YWJsZSBib2R5J3MgY3VycmVudCByb3cgbm9kZXMsIHdpdGhvdXQgbm9kZXMgZHVwbGljYXRlZCBmb3Jcblx0ICogdGhlIHJlc3BvbnNpdmUgXCJmbGF0XCIgc3R5bGVcblx0ICpcblx0ICogQHJldHVybnMge0FycmF5PE5vZGU+fVxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9nZXRMYXRlc3RSb3dOb2RlcygpIHtcblx0XHRyZXR1cm4gdGhpcy50Ym9keSA/IEFycmF5LmZyb20odGhpcy50Ym9keS5xdWVyeVNlbGVjdG9yQWxsKCd0cjpub3QoLm8tdGFibGVfX2R1cGxpY2F0ZS1yb3cpJykpIDogW107XG5cdH1cblxuXHQvKipcblx0ICogRHVwbGljYXRlIHRhYmxlIGhlYWRlcnMgZm9yIGVhY2ggZGF0YSBpdGVtLlxuXHQgKiBJLmUuIEVhY2ggcm93IGlzIHNob3duIGFzIGEgc2luZ2xlIGl0ZW0gd2l0aCBpdHMgb3duIGhlYWRpbmdzLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9jcmVhdGVGbGF0VGFibGVTdHJ1Y3R1cmUocm93cyA9IHRoaXMudGFibGVSb3dzKSB7XG5cdFx0cm93c1xuXHRcdFx0LmZpbHRlcihyb3cgPT4gIXJvdy5oYXNBdHRyaWJ1dGUoJ2RhdGEtby10YWJsZS1mbGF0LWhlYWRpbmdzJykpIC8vIG9ubHkgcHJvY2VzcyByb3dzIG9uY2Vcblx0XHRcdC5mb3JFYWNoKHJvdyA9PiB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBBcnJheS5mcm9tKHJvdy5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGQnKSk7XG5cdFx0XHRcdHJvdy5zZXRBdHRyaWJ1dGUoJ2RhdGEtby10YWJsZS1mbGF0LWhlYWRpbmdzJywgdHJ1ZSk7XG5cdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyB0YWJsZSBib2R5IGZvciBldmVyeSByb3cuXG5cdFx0XHRcdFx0Y29uc3QgbmV3R3JvdXBCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcblx0XHRcdFx0XHRuZXdHcm91cEJvZHkuY2xhc3NMaXN0LmFkZCgnby10YWJsZV9fcmVzcG9uc2l2ZS1ib2R5Jyk7XG5cdFx0XHRcdFx0Ly8gQXBwZW5kIGFsbCB0aGUgb3RoZXIgcm93cyBhcyBoZWFkaW5nIC8gdmFsdWUgcGFpcnMuXG5cdFx0XHRcdFx0dGhpcy5fdGFibGVIZWFkZXJzV2l0aG91dFNvcnQuZm9yRWFjaCgoaGVhZGVyLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSByb3cuXG5cdFx0XHRcdFx0XHRjb25zdCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXHRcdFx0XHRcdFx0bmV3Um93LmNsYXNzTGlzdC5hZGQoJ28tdGFibGVfX2R1cGxpY2F0ZS1yb3cnKTtcblx0XHRcdFx0XHRcdC8vIER1cGxpY2F0ZSB0aGUgb3JpZ2luYWwgaGVhZGluZyBjZWxsLlxuXHRcdFx0XHRcdFx0Y29uc3QgY2xvbmVkSGVhZGVyID0gaGVhZGVyLmNsb25lTm9kZSh0cnVlKTtcblx0XHRcdFx0XHRcdGNsb25lZEhlYWRlci5jbGFzc0xpc3QuYWRkKCdvLXRhYmxlX19kdXBsaWNhdGUtaGVhZGluZycpO1xuXHRcdFx0XHRcdFx0Y2xvbmVkSGVhZGVyLnNldEF0dHJpYnV0ZSgnc2NvcGUnLCAncm93Jyk7XG5cdFx0XHRcdFx0XHRjbG9uZWRIZWFkZXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Jvd2hlYWRlcicpO1xuXHRcdFx0XHRcdFx0Ly8gRHVwbGljYXRlIHRoZSBvcmlnaW5hbCBkYXRhIGNlbGwuXG5cdFx0XHRcdFx0XHRjb25zdCBjbG9uZWRUZCA9IGRhdGFbaW5kZXhdLmNsb25lTm9kZSh0cnVlKTtcblx0XHRcdFx0XHRcdC8vIEFwcGVuZCB0aGUgaGVhZGVyIGFuZCBkYXRhIGNlbGwgdG8gdGhlIHJvdy5cblx0XHRcdFx0XHRcdG5ld1Jvdy5hcHBlbmRDaGlsZChjbG9uZWRIZWFkZXIpO1xuXHRcdFx0XHRcdFx0bmV3Um93LmFwcGVuZENoaWxkKGNsb25lZFRkKTtcblx0XHRcdFx0XHRcdC8vIEFwcGVuZCB0aGUgcm93IHRvIHRoZSBib2R5LlxuXHRcdFx0XHRcdFx0bmV3R3JvdXBCb2R5LmFwcGVuZENoaWxkKG5ld1Jvdyk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBBcHBlbmQgdGhlIG5ldyBib2RpZXMsIHdoaWNoIHJlcHJlc2VudCBlYWNoIHJvdyBvblxuXHRcdFx0XHRcdC8vIGRlc2t0b3AsIHRvIHRoZSByb290IGVsZW1lbnQuXG5cdFx0XHRcdFx0dGhpcy5yb290RWwuYXBwZW5kQ2hpbGQobmV3R3JvdXBCb2R5KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBGbGF0VGFibGU7XG4iLCJpbXBvcnQgQmFzZVRhYmxlIGZyb20gJy4vQmFzZVRhYmxlLmpzJztcblxuY2xhc3MgU2Nyb2xsVGFibGUgZXh0ZW5kcyBCYXNlVGFibGUge1xuXHQvKipcblx0ICogSW5pdGlhbGlzZXMgYW4gYG8tdGFibGVgIGNvbXBvbmVudCB3aXRoIFwic2Nyb2xsXCIgcmVzcG9uc2l2ZSBiZWhhdmlvdXIuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3RFbCAtIFRoZSBgby10YWJsZWAgZWxlbWVudC5cblx0ICogQHBhcmFtIHtUYWJsZVNvcnRlcn0gc29ydGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIFt7fV1cblx0ICogQHBhcmFtIHtCb29sfSBvcHRzLnNvcnRhYmxlIFt0cnVlXVxuXHQgKiBAcmV0dXJucyB7U2Nyb2xsVGFibGV9XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihyb290RWwsIHNvcnRlciwgb3B0cyA9IHt9KSB7XG5cdFx0c3VwZXIocm9vdEVsLCBzb3J0ZXIsIG9wdHMpO1xuXHRcdC8vIER1cGxpY2F0ZSByb3cgaGVhZGluZ3MgYmVmb3JlIGFkZGluZyBzb3J0IGJ1dHRvbnMuXG5cdFx0dGhpcy5fdGFibGVIZWFkZXJzV2l0aG91dFNvcnQgPSB0aGlzLnRhYmxlSGVhZGVycy5tYXAoaGVhZGVyID0+IGhlYWRlci5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdC8vIENyZWF0ZSBzY3JvbGxhYmxlIGxheW91dCBmb3IgZGV2aWNlcyB3aXRoIHNtYWxsIHZpZXdwb3J0cy5cblx0XHR0aGlzLl9jcmVhdGVTY3JvbGxUYWJsZVN0cnVjdHVyZSgpO1xuXHRcdC8vIERlZmVyIG90aGVyIHRhc2tzLlxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuYWRkU29ydEJ1dHRvbnMuYmluZCh0aGlzKSwgMCk7XG5cdFx0d2luZG93LnNldFRpbWVvdXQodGhpcy5fcmVhZHkuYmluZCh0aGlzKSwgMCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogRmlsdGVyIHRoZSB0YWJsZS5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGhlYWRlckluZGV4IC0gVGhlIGluZGV4IG9mIHRoZSB0YWJsZSBjb2x1bW4gdG8gZmlsdGVyLlxuXHQgKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gZmlsdGVyIC0gSG93IHRvIGZpbHRlciB0aGUgY29sdW1uIChlaXRoZXIgYSBzdHJpbmcgdG8gbWF0Y2ggb3IgYSBjYWxsYmFjayBmdW5jdGlvbikuXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRmaWx0ZXIoaGVhZGVySW5kZXgsIGZpbHRlcikge1xuXHRcdC8vIEZpbHRlciByb3dzIGJ5IGNvbHVtbnMgKGRlc2t0b3AgdmlldykuXG5cdFx0dGhpcy5fZmlsdGVyUm93c0J5Q29sdW1uKGhlYWRlckluZGV4LCBmaWx0ZXIpO1xuXHRcdC8vIFJlbmRlciBmaWx0ZXJlZCB0YWJsZSAoZGVza3RvcCB2aWV3KS5cblx0XHR0aGlzLnJlbmRlclJvd1VwZGF0ZXMoKTtcblx0XHQvLyBSZWNyZWF0ZSBzY3JvbGxhYmxlIHRhYmxlIHdpdGggZmlsdGVyZWQgcm93cyAobW9iaWxlIHZpZXcpLlxuXHRcdHRoaXMuX2NyZWF0ZVNjcm9sbFRhYmxlU3RydWN0dXJlKCk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBvLXRhYmxlIGluc3RhbmNlIHdpdGggcm93cyBhZGRlZCBkeW5hbWljYWxseSB0byB0aGUgdGFibGUuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHR1cGRhdGVSb3dzKCkge1xuXHRcdC8vIFVwZGF0ZSByb3cgdmlzaWJpbGl0eSwgc29ydCwgZXRjLlxuXHRcdHN1cGVyLnVwZGF0ZVJvd3MoKTtcblx0XHQvLyBSZWNyZWF0ZSBzY3JvbGxhYmxlIHRhYmxlIHdpdGggdXBkYXRlZCByb3dzLlxuXHRcdHRoaXMuX2NyZWF0ZVNjcm9sbFRhYmxlU3RydWN0dXJlKCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFsbCB0aGUgdGFibGUgYm9keSdzIGN1cnJlbnQgcm93IG5vZGVzLCB3aXRob3V0IG5vZGVzIGR1cGxpY2F0ZWQgZm9yXG5cdCAqIHRoZSByZXNwb25zaXZlIFwic2Nyb2xsXCIgc3R5bGVcblx0ICpcblx0ICogQHJldHVybnMge0FycmF5PE5vZGU+fVxuXHQgKiBAYWNjZXNzIHByaXZhdGVcblx0ICovXG5cdF9nZXRMYXRlc3RSb3dOb2RlcygpIHtcblx0XHRyZXR1cm4gdGhpcy50Ym9keSA/IEFycmF5LmZyb20odGhpcy50Ym9keS5xdWVyeVNlbGVjdG9yQWxsKCd0cjpub3QoLm8tdGFibGVfX2R1cGxpY2F0ZS1yb3cpJykpIDogW107XG5cdH1cblxuXHQvKipcblx0ICogRHVwbGljYXRlIHRhYmxlIGhlYWRlcnMgYW5kIHJvd3MgdG8gY3JlYXRlIGEgdGFibGUgd2hpY2ggaGFzIHJvdyBoZWFkaW5nc1xuXHQgKiByYXRoZXIgdGhhbiBjb2x1bW4gaGVhZGluZ3MuIEkuZS4gVGhlIHRhYmxlIGlzIGNvbnN1bWVkIGxlZnQgdG8gcmlnaHQsXG5cdCAqIHJhdGhlciB0aGFuIHRvcCB0byBib3R0b20uXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0X2NyZWF0ZVNjcm9sbFRhYmxlU3RydWN0dXJlKCkge1xuXHRcdC8vIENsb25lIGhlYWRpbmdzIGFuZCBkYXRhIGludG8gbmV3IHJvd3MuXG5cdFx0Y29uc3QgY2xvbmVkUm93cyA9IHRoaXMuX3RhYmxlSGVhZGVyc1dpdGhvdXRTb3J0Lm1hcCgoaGVhZGVyLCBpbmRleCkgPT4ge1xuXHRcdFx0Y29uc3QgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcblx0XHRcdGhlYWRlclJvdy5jbGFzc0xpc3QuYWRkKCdvLXRhYmxlX19kdXBsaWNhdGUtcm93Jyk7XG5cdFx0XHQvLyBDbG9uZSBjb2x1bW4gaGVhZGluZyBhbmQgdHVybiBpbnRvIGEgcm93IGhlYWRpbmcuXG5cdFx0XHRjb25zdCBjbG9uZWRIZWFkZXIgPSBoZWFkZXIuY2xvbmVOb2RlKHRydWUpO1xuXHRcdFx0Y2xvbmVkSGVhZGVyLnNldEF0dHJpYnV0ZSgnc2NvcGUnLCAncm93Jyk7XG5cdFx0XHRjbG9uZWRIZWFkZXIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Jvd2hlYWRlcicpO1xuXHRcdFx0aGVhZGVyUm93LmFwcGVuZENoaWxkKGNsb25lZEhlYWRlcik7XG5cdFx0XHQvLyBDbG9uZSBkYXRhIGZvciB0aGUgY29sdW1uIGludG8gdGhlIG5ldyByb3cuXG5cdFx0XHR0aGlzLnRhYmxlUm93cy5mb3JFYWNoKHJvdyA9PiB7XG5cdFx0XHRcdGNvbnN0IGNlbGwgPSByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKVtpbmRleF07XG5cdFx0XHRcdGlmIChjZWxsKSB7XG5cdFx0XHRcdFx0Y29uc3QgY2VsbENsb25lID0gY2VsbC5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0XHRcdFx0Y29uc3QgZmlsdGVyZWREYXRhID0gdGhpcy5fZmlsdGVyZWRUYWJsZVJvd3MuaW5kZXhPZihyb3cpICE9PSAtMTtcblx0XHRcdFx0XHRjZWxsQ2xvbmUuc2V0QXR0cmlidXRlKCdkYXRhLW8tdGFibGUtZmlsdGVyZWQnLCBmaWx0ZXJlZERhdGEpO1xuXHRcdFx0XHRcdGNlbGxDbG9uZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmlsdGVyZWREYXRhKTtcblx0XHRcdFx0XHRoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoY2VsbENsb25lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gaGVhZGVyUm93O1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIG5ldyByb3dzIHRvIHRoZSB0YWJsZSBib2R5LlxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0Y29uc3Qgcm93SGVhZGluZ1Jvd3MgPSBBcnJheS5mcm9tKHRoaXMudGJvZHkucXVlcnlTZWxlY3RvckFsbCgnLm8tdGFibGVfX2R1cGxpY2F0ZS1yb3cnKSk7XG5cdFx0XHRyb3dIZWFkaW5nUm93cy5mb3JFYWNoKHJvdyA9PiB0aGlzLnRib2R5LnJlbW92ZUNoaWxkKHJvdykpO1xuXHRcdFx0aWYgKHRoaXMudGJvZHkucHJlcGVuZCkge1xuXHRcdFx0XHR0aGlzLnRib2R5LnByZXBlbmQoLi4uY2xvbmVkUm93cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbG9uZWRSb3dzLnJldmVyc2UoKS5mb3JFYWNoKHJvdyA9PiB7XG5cdFx0XHRcdFx0dGhpcy50Ym9keS5pbnNlcnRCZWZvcmUocm93LCB0aGlzLnRib2R5LmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3VwZGF0ZVRhYmxlSGVpZ2h0KCk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxUYWJsZTtcbiIsImltcG9ydCBCYXNlVGFibGUgZnJvbSAnLi9CYXNlVGFibGUuanMnO1xuXG5jbGFzcyBPdmVyZmxvd1RhYmxlIGV4dGVuZHMgQmFzZVRhYmxlIHtcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZXMgYW4gYG8tdGFibGVgIGNvbXBvbmVudCB3aXRoIFwib3ZlcmZsb3dcIiByZXNwb25zaXZlIGJlaGF2aW91ci5cblx0ICpcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdEVsIC0gVGhlIGBvLXRhYmxlYCBlbGVtZW50LlxuXHQgKiBAcGFyYW0ge1RhYmxlU29ydGVyfSBzb3J0ZXJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgW3t9XVxuXHQgKiBAcGFyYW0ge0Jvb2x9IG9wdHMuc29ydGFibGUgW3RydWVdXG5cdCAqIEBwYXJhbSB7VW5kZWZpbmVkIHwgQm9vbH0gb3B0cy5leHBhbmRlZFxuXHQgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5taW5pbXVtUm93Q291bnQgWzIwXVxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcmV0dXJucyB7T3ZlcmZsb3dUYWJsZX1cblx0ICovXG5cdGNvbnN0cnVjdG9yKHJvb3RFbCwgc29ydGVyLCBvcHRzID0ge30pIHtcblx0XHRzdXBlcihyb290RWwsIHNvcnRlciwgb3B0cyk7XG5cdFx0dGhpcy5fb3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0ZXhwYW5kZWQ6IHRoaXMucm9vdEVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1vLXRhYmxlLWV4cGFuZGVkJykgPyB0aGlzLnJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby10YWJsZS1leHBhbmRlZCcpICE9PSAnZmFsc2UnIDogbnVsbCxcblx0XHRcdG1pbmltdW1Sb3dDb3VudDogdGhpcy5yb290RWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tdGFibGUtbWluaW11bS1yb3ctY291bnQnKVxuXHRcdH0sIHRoaXMuX29wdHMpO1xuXHRcdC8vIEFkZCBzY3JvbGwgYW5kIGV4cGFuZGVyIGNvbnRyb2xzIGltbWVkaWF0ZWx5LlxuXHRcdHRoaXMuX2FkZENvbnRyb2xzVG9Eb20oKTtcblx0XHQvLyBEZWZlciBvdGhlciB0YXNrcy5cblx0XHR3aW5kb3cuc2V0VGltZW91dCh0aGlzLmFkZFNvcnRCdXR0b25zLmJpbmQodGhpcyksIDApO1xuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuX3NldHVwU2Nyb2xsLmJpbmQodGhpcyksIDApO1xuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuX3NldHVwRXhwYW5kZXIuYmluZCh0aGlzKSwgMCk7XG5cdFx0dGhpcy5fcmVhZHkoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBGaWx0ZXIgdGhlIHRhYmxlLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0ge051bWJlcn0gaGVhZGVySW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHRhYmxlIGNvbHVtbiB0byBmaWx0ZXIuXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSBmaWx0ZXIgLSBIb3cgdG8gZmlsdGVyIHRoZSBjb2x1bW4gKGVpdGhlciBhIHN0cmluZyB0byBtYXRjaCBvciBhIGNhbGxiYWNrIGZ1bmN0aW9uKS5cblx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0ICovXG5cdGZpbHRlcihoZWFkZXJJbmRleCwgZmlsdGVyKSB7XG5cdFx0dGhpcy5fZmlsdGVyUm93c0J5Q29sdW1uKGhlYWRlckluZGV4LCBmaWx0ZXIpO1xuXHRcdHRoaXMucmVuZGVyUm93VXBkYXRlcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSB0YWJsZSBpcyBleHBhbmRlZCAodHJ1ZSkgb3IgY29sbGFwc2VkIChmYWxzZSkuXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHtCb29sfVxuXHQgKi9cblx0aXNFeHBhbmRlZCgpIHtcblx0XHRjb25zdCBleHBhbmQgPSB0aGlzLl9leHBhbmQgPT09IHVuZGVmaW5lZCA/IEJvb2xlYW4odGhpcy5fb3B0cy5leHBhbmRlZCkgOiBCb29sZWFuKHRoaXMuX2V4cGFuZCk7XG5cdFx0cmV0dXJuIHRoaXMuY2FuRXhwYW5kKCkgJiYgZXhwYW5kO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSB0YWJsZSBpcyBjb2xsYXBzZWQgKHRydWUpIG9yIGV4cGFuZGVkIChmYWxzZSkuXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHtCb29sfVxuXHQgKi9cblx0aXNDb250cmFjdGVkKCkge1xuXHRcdGNvbnN0IGV4cGFuZCA9IHRoaXMuX2V4cGFuZCA9PT0gdW5kZWZpbmVkID8gQm9vbGVhbih0aGlzLl9vcHRzLmV4cGFuZGVkKSA6IEJvb2xlYW4odGhpcy5fZXhwYW5kKTtcblx0XHRyZXR1cm4gdGhpcy5jYW5FeHBhbmQoKSAmJiAhZXhwYW5kO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSB0YWJsZSBzdXBwb3J0cyB0aGUgZXhwYW5kL2NvbnRyYWN0IGZlYXR1cmUuXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHtCb29sfVxuXHQgKi9cblx0Y2FuRXhwYW5kKCkge1xuXHRcdHJldHVybiB0eXBlb2YgdGhpcy5fb3B0cy5leHBhbmRlZCA9PT0gJ2Jvb2xlYW4nICYmIHRoaXMuX21pbmltdW1Sb3dDb3VudCA8IHRoaXMudGFibGVSb3dzLmxlbmd0aCAtIHRoaXMuX2ZpbHRlcmVkVGFibGVSb3dzLmxlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBkb20gdG8gYWNjb3VudCBmb3Igcm93IHVwZGF0ZXMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRyZW5kZXJSb3dVcGRhdGVzKCkge1xuXHRcdHRoaXMuX3VwZGF0ZUV4cGFuZGVyKCk7XG5cdFx0dGhpcy5fdXBkYXRlUm93QXJpYUhpZGRlbigpO1xuXHRcdHRoaXMuX2hpZGVGaWx0ZXJlZFJvd3MoKTtcblx0XHR0aGlzLl91cGRhdGVUYWJsZUhlaWdodCgpO1xuXHRcdHRoaXMuX3VwZGF0ZVJvd09yZGVyKCk7XG5cdH1cblxuXHRfdXBkYXRlRXhwYW5kZXIoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLl9vcHRzLmV4cGFuZGVkICE9PSAnYm9vbGVhbicgfHwgIXRoaXMuY29udHJvbHMpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fZXhwYW5kZXJVcGRhdGVTY2hlZHVsZWQpIHtcblx0XHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLl9leHBhbmRlclVwZGF0ZVNjaGVkdWxlZCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZXhwYW5kID0gdGhpcy5pc0V4cGFuZGVkKCk7XG5cdFx0Y29uc3QgY29udHJhY3QgPSB0aGlzLmlzQ29udHJhY3RlZCgpO1xuXHRcdGNvbnN0IGNhbkV4cGFuZCA9IGV4cGFuZCB8fCBjb250cmFjdDtcblx0XHRjb25zdCBleHBhbmRlckJ1dHRvbkNvbnRhaW5lciA9IHRoaXMuY29udHJvbHMuZXhwYW5kZXJCdXR0b247XG5cdFx0Y29uc3QgZXhwYW5kZXJCdXR0b24gPSBleHBhbmRlckJ1dHRvbkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcblxuXHRcdHRoaXMuX3VwZGF0ZVRhYmxlSGVpZ2h0KCk7XG5cdFx0dGhpcy5fdXBkYXRlUm93QXJpYUhpZGRlbigpO1xuXHRcdHRoaXMuX3VwZGF0ZUNvbnRyb2xzKCk7XG5cblx0XHR0aGlzLl9leHBhbmRlclVwZGF0ZVNjaGVkdWxlZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5yb290RWwuc2V0QXR0cmlidXRlKCdkYXRhLW8tdGFibGUtZXhwYW5kZWQnLCBCb29sZWFuKGV4cGFuZCkpO1xuXHRcdFx0dGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnby10YWJsZS1jb250YWluZXItLWV4cGFuZGVkJywgZXhwYW5kKTtcblx0XHRcdHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ28tdGFibGUtY29udGFpbmVyLS1jb250cmFjdGVkJywgY29udHJhY3QpO1xuXHRcdFx0ZXhwYW5kZXJCdXR0b24uc3R5bGUuZGlzcGxheSA9IGNhbkV4cGFuZCA/ICcnIDogJ25vbmUnO1xuXG5cdFx0XHRpZiAoIWNhbkV4cGFuZCkge1xuXHRcdFx0XHR0aGlzLnJvb3RFbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGV4cGFuZCkge1xuXHRcdFx0XHRleHBhbmRlckJ1dHRvbi50ZXh0Q29udGVudCA9ICdTaG93IGZld2VyJztcblx0XHRcdFx0dGhpcy5yb290RWwuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb250cmFjdCkge1xuXHRcdFx0XHRleHBhbmRlckJ1dHRvbi50ZXh0Q29udGVudCA9ICdTaG93IG1vcmUnO1xuXHRcdFx0XHR0aGlzLnJvb3RFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIaWRlcyB0YWJsZSByb3dzIGlmIHRoZSB0YWJsZSBjYW4gYmUgZXhwYW5kZWQuXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHVuZGVmaW5lZFxuXHQgKi9cblx0Y29udHJhY3RUYWJsZSgpIHtcblx0XHRpZiAoIXRoaXMuY2FuRXhwYW5kKCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fZXhwYW5kID0gZmFsc2U7XG5cdFx0dGhpcy5fdXBkYXRlRXhwYW5kZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBFeHBhbmRzIHRoZSB0YWJsZSwgcmV2ZWFsaW5nIGhpZGRlbiB0YWJsZSByb3dzLCBpZiBpdCBjYW4gYmUgZXhwYW5kZWQgYW5kIGhhcyBiZWVuIGNvbnRyYWN0ZWQuXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm5zIHVuZGVmaW5lZFxuXHQgKi9cblx0ZXhwYW5kVGFibGUoKSB7XG5cdFx0aWYgKCF0aGlzLmNhbkV4cGFuZCgpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2V4cGFuZCA9IHRydWU7XG5cdFx0dGhpcy5fdXBkYXRlRXhwYW5kZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIHRhYmxlIGhlaWdodCwgYWNjb3VudGluZyBmb3IgXCJoaWRkZW5cIiByb3dzLlxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ8TnVsbH1cblx0ICovXG5cdF9nZXRUYWJsZUhlaWdodCgpIHtcblx0XHRpZiAodGhpcy5pc0NvbnRyYWN0ZWQoKSkge1xuXHRcdFx0Y29uc3QgbWF4VGFibGVIZWlnaHQgPSBzdXBlci5fZ2V0VGFibGVIZWlnaHQoKTtcblx0XHRcdGlmICghdGhpcy5fY29udHJhY3RlZFdyYXBwZXJIZWlnaHQgfHwgdGhpcy5fY29udHJhY3RlZFdyYXBwZXJIZWlnaHQgPiBtYXhUYWJsZUhlaWdodCkge1xuXHRcdFx0XHRjb25zdCByb3dzVG9IaWRlID0gdGhpcy5fcm93c1RvSGlkZTtcblx0XHRcdFx0Y29uc3QgYnV0dG9uSGVpZ2h0ID0gdGhpcy5jb250cm9scy5leHBhbmRlckJ1dHRvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGNvbnN0IGV4dHJhSGVpZ2h0ID0gcm93c1RvSGlkZSA/IHJvd3NUb0hpZGVbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC8gMiA6IDA7XG5cdFx0XHRcdHRoaXMuX2NvbnRyYWN0ZWRXcmFwcGVySGVpZ2h0ID0gbWF4VGFibGVIZWlnaHQgKyBidXR0b25IZWlnaHQgKyBleHRyYUhlaWdodDtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLl9jb250cmFjdGVkV3JhcHBlckhlaWdodDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pc0V4cGFuZGVkKCkpIHtcblx0XHRcdGNvbnN0IGJ1dHRvbkhlaWdodCA9IHRoaXMuY29udHJvbHMuZXhwYW5kZXJCdXR0b24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0cmV0dXJuIHN1cGVyLl9nZXRUYWJsZUhlaWdodCgpICsgYnV0dG9uSGVpZ2h0O1xuXHRcdH1cblxuXHRcdHJldHVybiBzdXBlci5fZ2V0VGFibGVIZWlnaHQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgY29udHJvbHMgc3VjaCBhcyB0aGUgYmFjaywgZm9yd2FyZCwgXCJzaG93IG1vcmVcIiBidXR0b25zIHRvIERPTSxcblx0ICogcGx1cyB3cmFwcGVycyBuZWVkZWQgZm9yIHRoZW0gdG8gZnVuY3Rpb24uXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRfYWRkQ29udHJvbHNUb0RvbSgpIHtcblx0XHRpZiAodGhpcy5vdmVybGF5V3JhcHBlciAmJiAhdGhpcy5jb250cm9scykge1xuXHRcdFx0Y29uc3Qgc3VwcG9ydHNBcnJvd3MgPSBPdmVyZmxvd1RhYmxlLl9zdXBwb3J0c0Fycm93cygpO1xuXHRcdFx0Y29uc3Qgb3ZlcmxheVdyYXBwZXJIdG1sID0gYFxuXHRcdFx0XHQke3RoaXMud3JhcHBlciA/IGBcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiby10YWJsZS1vdmVyZmxvdy1mYWRlLW92ZXJsYXlcIj48L2Rpdj5cblx0XHRcdFx0YCA6ICcnfVxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiby10YWJsZS1vdmVyZmxvdy1jb250cm9sLW92ZXJsYXlcIj5cblx0XHRcdFx0XHQke3RoaXMud3JhcHBlciAmJiBzdXBwb3J0c0Fycm93cyA/IGBcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJvLXRhYmxlLWNvbnRyb2wgby10YWJsZS1jb250cm9sLS1iYWNrIG8tdGFibGUtY29udHJvbC0taGlkZVwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGFyaWEtbGFiZWw9XCJ2aXN1YWxseSBzY3JvbGwgdGFibGUgYmFja1wiIGRpc2FibGVkPVwidHJ1ZVwiIGNsYXNzPVwiby1idXR0b25zIG8tYnV0dG9ucy0tcHJpbWFyeSBvLWJ1dHRvbnMtLWJpZyBvLWJ1dHRvbnMtaWNvbiBvLWJ1dHRvbnMtaWNvbi0taWNvbi1vbmx5IG8tYnV0dG9ucy1pY29uLS1hcnJvdy1sZWZ0XCI+PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRgIDogJyd9XG5cblx0XHRcdFx0XHQke3RoaXMud3JhcHBlciAmJiBzdXBwb3J0c0Fycm93cyA/IGBcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJvLXRhYmxlLWNvbnRyb2wgby10YWJsZS1jb250cm9sLS1mb3J3YXJkIG8tdGFibGUtY29udHJvbC0taGlkZVwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGFyaWEtbGFiZWw9XCJ2aXN1YWxseSBzY3JvbGwgdGFibGUgZm9yd2FyZFwiIGRpc2FibGVkPVwidHJ1ZVwiIGNsYXNzPVwiby1idXR0b25zIG8tYnV0dG9ucy0tcHJpbWFyeSBvLWJ1dHRvbnMtLWJpZyBvLWJ1dHRvbnMtaWNvbiBvLWJ1dHRvbnMtaWNvbi0taWNvbi1vbmx5IG8tYnV0dG9ucy1pY29uLS1hcnJvdy1yaWdodFwiPjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0YCA6ICcnfVxuXG5cdFx0XHRcdFx0JHt0eXBlb2YgdGhpcy5fb3B0cy5leHBhbmRlZCA9PT0gJ2Jvb2xlYW4nID8gYFxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm8tdGFibGUtY29udHJvbCBvLXRhYmxlLWNvbnRyb2wtLWV4cGFuZGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJvLWJ1dHRvbnMgby1idXR0b25zLS1wcmltYXJ5IG8tYnV0dG9ucy0tYmlnXCI+U2hvdyBmZXdlcjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0YCA6ICcnfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGA7XG5cblx0XHRcdGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcblx0XHRcdHJhbmdlLnNlbGVjdE5vZGUodGhpcy5vdmVybGF5V3JhcHBlcik7XG5cdFx0XHRjb25zdCBvdmVybGF5RnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQob3ZlcmxheVdyYXBwZXJIdG1sKTtcblxuXHRcdFx0dGhpcy5jb250cm9scyA9IHtcblx0XHRcdFx0Y29udHJvbHNPdmVybGF5OiBvdmVybGF5RnJhZ21lbnQucXVlcnlTZWxlY3RvcignLm8tdGFibGUtb3ZlcmZsb3ctY29udHJvbC1vdmVybGF5JyksXG5cdFx0XHRcdGZhZGVPdmVybGF5OiBvdmVybGF5RnJhZ21lbnQucXVlcnlTZWxlY3RvcignLm8tdGFibGUtb3ZlcmZsb3ctZmFkZS1vdmVybGF5JyksXG5cdFx0XHRcdGV4cGFuZGVyQnV0dG9uOiBvdmVybGF5RnJhZ21lbnQucXVlcnlTZWxlY3RvcignLm8tdGFibGUtY29udHJvbC0tZXhwYW5kZXInKSxcblx0XHRcdFx0Zm9yd2FyZEJ1dHRvbjogb3ZlcmxheUZyYWdtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vLXRhYmxlLWNvbnRyb2wtLWZvcndhcmQnKSxcblx0XHRcdFx0YmFja0J1dHRvbjogb3ZlcmxheUZyYWdtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vLXRhYmxlLWNvbnRyb2wtLWJhY2snKVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gQWRkIGNvbnRyb2xzIHRvIHRoZSBkb20uXG5cdFx0XHR0aGlzLl91cGRhdGVDb250cm9sT3ZlcmxheVBvc2l0aW9uKCk7XG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzLm92ZXJsYXlXcmFwcGVyLmFwcGVuZENoaWxkKG92ZXJsYXlGcmFnbWVudCk7XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdF91cGRhdGVDb250cm9sT3ZlcmxheVBvc2l0aW9uKCkge1xuXHRcdGNvbnN0IHRoZWFkSGVpZ2h0ID0gdGhpcy50aGVhZCA/IHRoaXMudGhlYWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogMDtcblx0XHRjb25zdCBjYXB0aW9uSGVpZ2h0ID0gdGhpcy50YWJsZUNhcHRpb24gPyB0aGlzLnRhYmxlQ2FwdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgOiAwO1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5jb250cm9scy5jb250cm9sc092ZXJsYXkuc3R5bGVbJ3RvcCddID0gYCR7dGhlYWRIZWlnaHQgKyBjYXB0aW9uSGVpZ2h0fXB4YDtcblx0XHR9LmJpbmQodGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBmdW5jdGlvbmFsaXR5IHRvIGltcHJvdmUgdGhlIGV4cGVyaWVuY2Ugd2hlbiBzY3JvbGxpbmcgYSB0YWJsZSxcblx0ICogc3VjaCBhcyBzaG93aW5nIGZvcndhcmQvYmFjayBidXR0b25zIHRvIGluZGljYXRlIHRoYXQgc2Nyb2xsIGlzIHBvc3NpYmxlLlxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0X3NldHVwU2Nyb2xsKCkge1xuXHRcdC8vIERvZXMgbm90IHdhcm4gb2YgYSBtaXNzaW5nIHdyYXBwZXI6IGFzc3VtZXMgbm8gb3ZlcmZsb3cgaXMgZGVzaXJlZC5cblx0XHRpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5vdmVybGF5V3JhcHBlciAmJiAhdGhpcy53cmFwcGVyKSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdCdDb250cm9scyB0byBzY3JvbGwgdGFibGUgbGVmdC9yaWdodCBjb3VsZCBub3QgYmUgYWRkZWQgdG8gXCJvLXRhYmxlXCIgYXMgaXQgaXMgbWlzc2luZyBtYXJrdXAuICcgK1xuXHRcdFx0XHQnUGxlYXNlIGFkZCB0aGUgY29udGFpbmVyIGFuZCB3cmFwcGVyIGVsZW1lbnRzIGFjY29yZGluZyB0byB0aGUgZG9jdW1lbnRhdGlvbiBodHRwczovL3JlZ2lzdHJ5Lm9yaWdhbWkuZnQuY29tL2NvbXBvbmVudHMvby10YWJsZS4nLFxuXHRcdFx0XHR7IHRhYmxlOiB0aGlzLnJvb3RFbCB9XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdC8vIENhbiBub3QgYWRkIGNvbnRyb2xzIHdpdGhvdXQgYSBjb250YWluZXIgb3Igd3JhcHBlci5cblx0XHRpZiAoIXRoaXMuY29udGFpbmVyIHx8ICF0aGlzLm92ZXJsYXlXcmFwcGVyIHx8ICF0aGlzLndyYXBwZXIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBBZGQgdGFibGUgY29udHJvbHMgKGUuZy4gbGVmdC9yaWdodCBidXR0b24pLlxuXHRcdGlmICghdGhpcy5jb250cm9scykge1xuXHRcdFx0dGhpcy5fYWRkQ29udHJvbHNUb0RvbSgpO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBmb3J3YXJkIGJ1dHRvbiBiZWhhdmlvdXIuXG5cdFx0aWYgKHRoaXMuY29udHJvbHMuZm9yd2FyZEJ1dHRvbikge1xuXHRcdFx0Y29uc3Qgc2Nyb2xsRm9yd2FyZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhpcy53cmFwcGVyLnNjcm9sbEJ5KHtcblx0XHRcdFx0XHRsZWZ0OiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC8gMixcblx0XHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCdcblx0XHRcdFx0fSk7XG5cdFx0XHR9LmJpbmQodGhpcyk7XG5cdFx0XHR0aGlzLmNvbnRyb2xzLmZvcndhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JvbGxGb3J3YXJkKTtcblx0XHRcdHRoaXMuX2xpc3RlbmVycy5wdXNoKHtcblx0XHRcdFx0ZWxlbWVudDogdGhpcy5jb250cm9scy5mb3J3YXJkQnV0dG9uLFxuXHRcdFx0XHRzY3JvbGxGb3J3YXJkLFxuXHRcdFx0XHR0eXBlOiAnY2xpY2snXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBBZGQgYmFjayBidXR0b24gYmVoYXZpb3VyLlxuXHRcdGlmICh0aGlzLmNvbnRyb2xzLmJhY2tCdXR0b24pIHtcblx0XHRcdGNvbnN0IHNjcm9sbEJhY2t3YXJkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLndyYXBwZXIuc2Nyb2xsQnkoe1xuXHRcdFx0XHRcdGxlZnQ6IC0oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAvIDIpLFxuXHRcdFx0XHRcdGJlaGF2aW9yOiAnc21vb3RoJ1xuXHRcdFx0XHR9KTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHRcdHRoaXMuY29udHJvbHMuYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcm9sbEJhY2t3YXJkKTtcblx0XHRcdHRoaXMuX2xpc3RlbmVycy5wdXNoKHtcblx0XHRcdFx0ZWxlbWVudDogdGhpcy5jb250cm9scy5iYWNrQnV0dG9uLFxuXHRcdFx0XHRzY3JvbGxCYWNrd2FyZCxcblx0XHRcdFx0dHlwZTogJ2NsaWNrJ1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHNjcm9sbCBwb3NpdGlvbiBhbmQgdXBkYXRlIGNvbnRyb2xzLlxuXHRcdGNvbnN0IHVwZGF0ZVNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICghdGhpcy5fY29udHJvbFVwZGF0ZVNjaGVkdWxlZCkge1xuXHRcdFx0XHR0aGlzLl9jb250cm9sVXBkYXRlU2NoZWR1bGVkID0gdHJ1ZTtcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHRoaXMuX2NvbnRyb2xVcGRhdGVTY2hlZHVsZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLl9mcm9tRW5kID0gdGhpcy53cmFwcGVyLnNjcm9sbFdpZHRoIC0gdGhpcy53cmFwcGVyLmNsaWVudFdpZHRoIC0gdGhpcy53cmFwcGVyLnNjcm9sbExlZnQ7XG5cdFx0XHRcdFx0dGhpcy5fZnJvbVN0YXJ0ID0gdGhpcy53cmFwcGVyLnNjcm9sbExlZnQ7XG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlQ29udHJvbHMoKTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLCAzMyk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpO1xuXG5cdFx0dXBkYXRlU2Nyb2xsKCk7XG5cblx0XHQvLyBPYnNlcnZlIGNvbnRyb2xzIHNjcm9sbGluZyBiZXlvbmQgdGFibGUgYW5kIHVwZGF0ZS5cblx0XHRpZiAodGhpcy5jb250cm9scy5jb250cm9sc092ZXJsYXkgJiYgd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyKSB7XG5cdFx0XHQvLyBGYWRlIGZvcndhcmQvYmFjayBidXR0b25zIGF0IHN0YXJ0IGFuZCBlbmQgb2YgdGFibGUuXG5cdFx0XHRjb25zdCBhcnJvd0ZhZGVPYnNlcnZlckNvbmZpZyA9IHtcblx0XHRcdFx0cm9vdDogdGhpcy5jb250cm9scy5jb250cm9sc092ZXJsYXksXG5cdFx0XHRcdHRocmVzaG9sZDogMS4wLFxuXHRcdFx0XHRyb290TWFyZ2luOiBgLTIwcHggMHB4ICR7dGhpcy5jYW5FeHBhbmQoKSA/ICcwcHgnIDogJy0yMHB4J30gMHB4YFxuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGFycm93RmFkZU9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGZ1bmN0aW9uKGVudHJpZXMpIHtcblx0XHRcdFx0ZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG5cdFx0XHRcdFx0ZW50cnkudGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1vLXRhYmxlLWludGVyc2VjdGlvbicsIGVudHJ5LmludGVyc2VjdGlvblJhdGlvICE9PSAxKTtcblx0XHRcdFx0XHR1cGRhdGVTY3JvbGwoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBhcnJvd0ZhZGVPYnNlcnZlckNvbmZpZyk7XG5cdFx0XHRpZiAodGhpcy5jb250cm9scy5iYWNrQnV0dG9uKSB7XG5cdFx0XHRcdGFycm93RmFkZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250cm9scy5iYWNrQnV0dG9uKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmNvbnRyb2xzLmZvcndhcmRCdXR0b24pIHtcblx0XHRcdFx0YXJyb3dGYWRlT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmNvbnRyb2xzLmZvcndhcmRCdXR0b24pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCBvdGhlciBldmVudCBsaXN0ZW5lcnMgdG8gdXBkYXRlIGNvbnRyb2xzLlxuXHRcdHRoaXMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVTY3JvbGwpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVTY3JvbGwpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdXBkYXRlU2Nyb2xsKTtcblx0XHR0aGlzLl9saXN0ZW5lcnMucHVzaCh7IGVsZW1lbnQ6IHRoaXMud3JhcHBlciwgdXBkYXRlU2Nyb2xsLCB0eXBlOiAnc2Nyb2xsJyB9KTtcblx0XHR0aGlzLl9saXN0ZW5lcnMucHVzaCh7ZWxlbWVudDogd2luZG93LCB1cGRhdGVTY3JvbGwsIHR5cGU6ICdyZXNpemUnfSk7XG5cdFx0dGhpcy5fbGlzdGVuZXJzLnB1c2goe2VsZW1lbnQ6IHdpbmRvdywgdXBkYXRlU2Nyb2xsLCB0eXBlOiAnbG9hZCd9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgaGlkZS9zaG93IGZ1bmN0aW9uYWxpdHkgZm9yIGxvbmcgdGFibGVzLlxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0X3NldHVwRXhwYW5kZXIoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLl9vcHRzLmV4cGFuZGVkICE9PSAnYm9vbGVhbicpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuY29udGFpbmVyIHx8ICF0aGlzLm92ZXJsYXlXcmFwcGVyIHx8ICF0aGlzLndyYXBwZXIpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0J0NvbnRyb2xzIHRvIGV4cGFuZC9jb250cmFjdCB0aGUgdGFibGUgY291bGQgbm90IGJlIGFkZGVkIHRvIFwiby10YWJsZVwiIGFzIGl0IGlzIG1pc3NpbmcgbWFya3VwLicgK1xuXHRcdFx0XHQnUGxlYXNlIGFkZCB0aGUgY29udGFpbmVyIGFuZCB3cmFwcGVyIGVsZW1lbnQgYWNjb3JkaW5nIHRvIHRoZSBkb2N1bWVudGF0aW9uIGh0dHBzOi8vcmVnaXN0cnkub3JpZ2FtaS5mdC5jb20vY29tcG9uZW50cy9vLXRhYmxlLidcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIHRhYmxlIGNvbnRyb2xzIChlLmcuIFwibW9yZVwiIGJ1dHRvbikuXG5cdFx0aWYgKCF0aGlzLmNvbnRyb2xzKSB7XG5cdFx0XHR0aGlzLl9hZGRDb250cm9sc1RvRG9tKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY29udHJvbHMuZXhwYW5kZXJCdXR0b24pIHtcblx0XHRcdGNvbnN0IHRvZ2dsZUV4cGFuZGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAodGhpcy5pc0V4cGFuZGVkKCkpIHtcblx0XHRcdFx0XHRjb25zdCBleHBhbmRlckJ1dHRvbkNvbnRhaW5lciA9IHRoaXMuY29udHJvbHMuZXhwYW5kZXJCdXR0b247XG5cdFx0XHRcdFx0Y29uc3QgYnV0dG9uT2Zmc2V0ID0gZXhwYW5kZXJCdXR0b25Db250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXHRcdFx0XHRcdHRoaXMuY29udHJhY3RUYWJsZSgpO1xuXHRcdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgdG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgZXhwYW5kZXJCdXR0b25Db250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gYnV0dG9uT2Zmc2V0O1xuXHRcdFx0XHRcdFx0d2luZG93LnNjcm9sbChudWxsLCB0b3ApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZXhwYW5kVGFibGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdFx0dGhpcy5jb250cm9scy5leHBhbmRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUV4cGFuZGVkKTtcblx0XHRcdHRoaXMuX2xpc3RlbmVycy5wdXNoKHtlbGVtZW50OiB0aGlzLmNvbnRyb2xzLmV4cGFuZGVyQnV0dG9uLCB0b2dnbGVFeHBhbmRlZCwgdHlwZTogJ2NsaWNrJ30pO1xuXHRcdH1cblxuXHRcdHRoaXMuX3VwZGF0ZUV4cGFuZGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIGFsbCBjb250cm9scyBhbmQgdGhlaXIgb3ZlcmxheXMsXG5cdCAqIGUuZy4gZm9yd2FyZC9iYWNrIGFycm93IHZpc2liaWxpdHksIHZpc2liaWxpdHkgb2YgYXJyb3cgZG9jaywgb3ZlcmxheSBmYWRlLlxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0X3VwZGF0ZUNvbnRyb2xzKCkge1xuXHRcdGlmICghdGhpcy5jb250cm9scykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFRvZ2dsZSBmYWRlLlxuXHRcdGNvbnN0IGNhblNjcm9sbFRhYmxlID0gdGhpcy5fY2FuU2Nyb2xsVGFibGU7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmNvbnRyb2xzLmZhZGVPdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ28tdGFibGUtb3ZlcmZsb3ctZmFkZS1vdmVybGF5LS1zY3JvbGwnLCBjYW5TY3JvbGxUYWJsZSk7XG5cdFx0XHR0aGlzLmNvbnRyb2xzLmZhZGVPdmVybGF5LnN0eWxlLnNldFByb3BlcnR5KCctLW8tdGFibGUtZmFkZS1mcm9tLWVuZCcsIGAke01hdGgubWluKHRoaXMuX2Zyb21FbmQsIDEwKX1weGApO1xuXHRcdFx0dGhpcy5jb250cm9scy5mYWRlT3ZlcmxheS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1vLXRhYmxlLWZhZGUtZnJvbS1zdGFydCcsIGAke01hdGgubWluKHRoaXMuX2Zyb21TdGFydCwgMTApfXB4YCk7XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdC8vIFRvZ2dsZSBhcnJvdyBkb2NrLlxuXHRcdGNvbnN0IHNob3dBcnJvd0RvY2sgPSB0aGlzLl9zaG93QXJyb3dEb2NrO1xuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5jb250cm9scy5jb250cm9sc092ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnby10YWJsZS1vdmVyZmxvdy1jb250cm9sLW92ZXJsYXktLWFycm93LWRvY2snLCBzaG93QXJyb3dEb2NrKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cblx0XHQvLyBVcGRhdGUgZm9yd2FyZC9iYWNrIHNjcm9sbCBjb250cm9scy5cblx0XHRpZiAoT3ZlcmZsb3dUYWJsZS5fc3VwcG9ydHNBcnJvd3MoKSkge1xuXHRcdFx0dGhpcy5fdXBkYXRlU2Nyb2xsQ29udHJvbCh0aGlzLmNvbnRyb2xzLmZvcndhcmRCdXR0b24pO1xuXHRcdFx0dGhpcy5fdXBkYXRlU2Nyb2xsQ29udHJvbCh0aGlzLmNvbnRyb2xzLmJhY2tCdXR0b24pO1xuXHRcdH1cblxuXHRcdC8vIFVwZGF0ZSBjb250cm9scyBvdmVybGF5IHRvIGNvdmVyIHRoZSBib2R5LlxuXHRcdHRoaXMuX3VwZGF0ZUNvbnRyb2xPdmVybGF5UG9zaXRpb24oKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIHZpc2liaWxpdHkgb2YgYSBzY3JvbGwgZm9yd2FyZC9iYWNrIGJ1dHRvbi5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIFRoZSBidXR0b24gd3JhcHBlci5cblx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0ICovXG5cdF91cGRhdGVTY3JvbGxDb250cm9sKGVsZW1lbnQpIHtcblx0XHRjb25zdCBzaG93U3RpY2t5QXJyb3dzID0gdGhpcy5fc3RpY2t5QXJyb3dzO1xuXHRcdGNvbnN0IGNhblNjcm9sbFRhYmxlID0gdGhpcy5fY2FuU2Nyb2xsVGFibGU7XG5cdFx0Y29uc3QgYXJyb3dzRG9ja2VkID0gdGhpcy5fc2hvd0Fycm93RG9jayAmJiAhc2hvd1N0aWNreUFycm93cztcblx0XHRjb25zdCBzY3JvbGxlZFRvQm91bmRhcnkgPSB0aGlzLl9mcm9tRW5kIDw9IDAgJiYgZWxlbWVudCA9PT0gdGhpcy5jb250cm9scy5mb3J3YXJkQnV0dG9uIHx8IHRoaXMuX2Zyb21TdGFydCA8PSAwICYmIGVsZW1lbnQgPT09IHRoaXMuY29udHJvbHMuYmFja0J1dHRvbjtcblx0XHRjb25zdCBoaWRlQXRCb3VuZGFyeSA9ICFhcnJvd3NEb2NrZWQgJiYgKCF0aGlzLl9zdGlja3lBcnJvd3MgfHwgdGhpcy5fc3RpY2t5QXJyb3dzICYmICF0aGlzLl9jYW5TY3JvbGxQYXN0VGFibGUpO1xuXHRcdGNvbnN0IG91dHNpZGVUYWJsZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW8tdGFibGUtaW50ZXJzZWN0aW9uJykgPT09ICd0cnVlJztcblx0XHRjb25zdCBlbGVtZW50QnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblx0XHRcdC8vIFNob3cgc2Nyb2xsIGNvbnRyb2wgaWYgdGhlIHRhYmxlIGRvZXMgbm90IGZpdCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gY2FuU2Nyb2xsVGFibGUgPyAnJzogJ25vbmUnO1xuXHRcdFx0Ly8gTWFrZSBhcnJvd3Mgc3RpY2t5IGlmIHRhYmxlIGlzIHRhbGwgYW5kIGNhbiBiZSBzY3JvbGxlZCBwYXN0LlxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvLXRhYmxlLWNvbnRyb2wtLXN0aWNreScsIHNob3dTdGlja3lBcnJvd3MpO1xuXHRcdFx0Ly8gUGxhY2UgdGhlIGFycm93cyBpbiB0aGUgZG9jayBpZiB0aGV5IGFyZSBub3Qgc3RpY2t5LlxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdvLXRhYmxlLWNvbnRyb2wtLWRvY2snLCBhcnJvd3NEb2NrZWQpO1xuXHRcdFx0Ly8gSGlkZSBzY3JvbGwgY29udHJvbCBpZiB0aGV5IGFyZSBvdXRzaWRlIHRoZSB0YWJsZSBib3VuZHJ5LlxuXHRcdFx0Ly8gRS5nLiB0aGUgdGFibGUgaGFzIGJlZW4gc2Nyb2xsZWQgcGFzdC5cblx0XHRcdGlmIChvdXRzaWRlVGFibGUpIHtcblx0XHRcdFx0ZWxlbWVudEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnby10YWJsZS1jb250cm9sLS1oaWRlJyk7XG5cdFx0XHR9XG5cdFx0XHQvLyBTaG93IHNjcm9sbCBjb250cm9sIGlmIHRoZXkgYXJlIGluc2lkZSB0aGUgdGFibGUgYW5kIHRoZSB0YWJsZSBpcyBzY3JvbGxhYmxlLlxuXHRcdFx0aWYgKCFzY3JvbGxlZFRvQm91bmRhcnkgJiYgIW91dHNpZGVUYWJsZSkge1xuXHRcdFx0XHRlbGVtZW50QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblx0XHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvLXRhYmxlLWNvbnRyb2wtLWhpZGUnKTtcblx0XHRcdH1cblx0XHRcdC8vIERpc2FibGUgc2Nyb2xsIGNvbnRyb2wgaWYgaXQgaXMgaW5zaWRlIHRoZSB0YWJsZSBidXQgc2Nyb2xsZWQgdG8gdGhlIGVuZCBob3Jpem9udGFsbHkuXG5cdFx0XHRpZiAoc2Nyb2xsZWRUb0JvdW5kYXJ5ICYmICFvdXRzaWRlVGFibGUpIHtcblx0XHRcdFx0ZWxlbWVudEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnby10YWJsZS1jb250cm9sLS1oaWRlJywgaGlkZUF0Qm91bmRhcnkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2Ygcm93cyB0byBkaXNwbGF5IGlmIHRoZSB0YWJsZSBpcyBjb2xsYXBzZWQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCAqL1xuXHRnZXQgX21pbmltdW1Sb3dDb3VudCgpIHtcblx0XHRjb25zdCBtaW5pbXVtUm93Q291bnQgPSB0aGlzLl9vcHRzLm1pbmltdW1Sb3dDb3VudDtcblx0XHRyZXR1cm4gaXNOYU4ocGFyc2VJbnQobWluaW11bVJvd0NvdW50LCAxMCkpID8gMjAgOiBwYXJzZUludChtaW5pbXVtUm93Q291bnQsIDEwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaGljaCByb3dzIGFyZSBoaWRkZW4sIGVpdGhlciBieSBhIGZpbHRlciBvciBieSB0aGUgZXhwYW5kZXIuXG5cdCAqIEByZXR1cm5zIHtBcnJheVtOb2RlXX1cblx0ICovXG5cdGdldCBfcm93c1RvSGlkZSgpIHtcblx0XHRyZXR1cm4gWy4uLnRoaXMuX2ZpbHRlcmVkVGFibGVSb3dzLCAuLi50aGlzLl9yb3dzSGlkZGVuQnlFeHBhbmRlcl07XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJvd3Mgd2hpY2ggd2lsbCBiZSBoaWRkZW4gaWYgdGhlIHRhYmxlIGlzIGNvbGxhcHNlZC5cblx0ICogQHJldHVybnMge0FycmF5W05vZGVdfVxuXHQgKi9cblx0Z2V0IF9yb3dzSGlkZGVuQnlFeHBhbmRlcigpIHtcblx0XHRjb25zdCB2aXNpYmxlUm93Q291bnQgPSBNYXRoLm1pbih0aGlzLnRhYmxlUm93cy5sZW5ndGgsIHRoaXMuX21pbmltdW1Sb3dDb3VudCk7XG5cdFx0Y29uc3Qgbm9uRmlsdGVyZWRSb3dzID0gdGhpcy50YWJsZVJvd3MuZmlsdGVyKHJvdyA9PiB0aGlzLl9maWx0ZXJlZFRhYmxlUm93cy5pbmRleE9mKHJvdykgPT09IC0xKTtcblx0XHRyZXR1cm4gdGhpcy5pc0NvbnRyYWN0ZWQoKSA/IG5vbkZpbHRlcmVkUm93cy5zbGljZSh2aXNpYmxlUm93Q291bnQsIG5vbkZpbHRlcmVkUm93cy5sZW5ndGgpIDogW107XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdGhlIHRhYmxlIGNhbiBiZSBzY3JvbGxlZC5cblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRnZXQgX2NhblNjcm9sbFRhYmxlKCkge1xuXHRcdHJldHVybiB0aGlzLl9mcm9tRW5kID4gMCB8fCB0aGlzLl9mcm9tU3RhcnQgPiAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSB0YWJsZSBjYW4gZml0IHdpdGhpbiB0aGUgdmlld3BvcnQgdmVydGljYWxseS5cblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRnZXQgX3RhYmxlVGFsbGVyVGhhblZpZXdwb3J0KCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSBkb2N1bWVudCBpcyBsb25nIGVub3VnaCB0byBzY3JvbGwgYmV5b25kIHRoZSB0YWJsZSBlbm91Z2ggZm9yIHN0aWNreSBhcnJvd3MgdG8gZG9jayBhdCB0aGUgYm90dG9tLlxuXHQgKiBJLmUuIFNjcm9sbCBwYXN0IHRoZSB0YWJsZSBieSBhdCBsZWFzdCA1MCUgb2YgdGhlIHZpZXdwb3J0LlxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICovXG5cdGdldCBfY2FuU2Nyb2xsUGFzdFRhYmxlKCkge1xuXHRcdHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b20gKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMiA8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b207XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdGhlIFwiZG9ja1wiIGF0IHRoZSBib3R0b20gb2YgdGhlIHRhYmxlIHNob3VsZCBiZSBzaG93bi5cblx0ICogQWZ0ZXIgc2Nyb2xsaW5nIHBhc3QgdGhlIHRhYmxlLCBzdGlja3kgYXJyb3dzIHNpdCB3aXRoaW4gdGhlIGRvY2sgYXQgdGhlIGJvdHRvbSBvZiB0aGUgdGFibGUuXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgKi9cblx0Z2V0IF9zaG93QXJyb3dEb2NrKCkge1xuXHRcdHJldHVybiBPdmVyZmxvd1RhYmxlLl9zdXBwb3J0c0Fycm93cygpICYmIHRoaXMuX2NhblNjcm9sbFRhYmxlICYmIHRoaXMuX2NhblNjcm9sbFBhc3RUYWJsZSAmJiB0aGlzLmNhbkV4cGFuZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIGxlZnQvcmlnaHQgY29udHJvbHMgc2hvdWxkIGJlIHN0aWNreS5cblx0ICogQHJldHVybnMge0Jvb2xlYW59XG5cdCAqL1xuXHRnZXQgX3N0aWNreUFycm93cygpIHtcblx0XHRyZXR1cm4gT3ZlcmZsb3dUYWJsZS5fc3VwcG9ydHNBcnJvd3MoKSAmJiB0aGlzLl90YWJsZVRhbGxlclRoYW5WaWV3cG9ydDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiBzdGlja3kgYnV0dG9ucyBhcmUgc3VwcG9ydGVkLlxuXHQgKiBAcmV0dXJucyB7Qm9vbGVhbn1cblx0ICovXG5cdHN0YXRpYyBfc3VwcG9ydHNBcnJvd3MoKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBDU1MgIT09ICd1bmRlZmluZWQnICYmIChDU1Muc3VwcG9ydHMoXCJwb3NpdGlvblwiLCBcInN0aWNreVwiKSB8fCBDU1Muc3VwcG9ydHMoJ3Bvc2l0aW9uJywgJy13ZWJraXQtc3RpY2t5JykpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE92ZXJmbG93VGFibGU7XG4iLCJpbXBvcnQgQmFzZVRhYmxlIGZyb20gJy4vQmFzZVRhYmxlLmpzJztcblxuY2xhc3MgQmFzaWNUYWJsZSBleHRlbmRzIEJhc2VUYWJsZSB7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2VzIGFuIGBvLXRhYmxlYCBjb21wb25lbnQgd2l0aG91dCByZXNwb25zaXZlIGJlaGF2aW91ci5cblx0ICpcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdEVsIC0gVGhlIGBvLXRhYmxlYCBlbGVtZW50LlxuXHQgKiBAcGFyYW0ge1RhYmxlU29ydGVyfSBzb3J0ZXJcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdHMgW3t9XVxuXHQgKiBAcGFyYW0ge0Jvb2x9IG9wdHMuc29ydGFibGUgW3RydWVdXG5cdCAqIEByZXR1cm5zIHtCYXNpY1RhYmxlfVxuXHQgKi9cblx0Y29uc3RydWN0b3Iocm9vdEVsLCBzb3J0ZXIsIG9wdHMgPSB7fSkge1xuXHRcdHN1cGVyKHJvb3RFbCwgc29ydGVyLCBvcHRzKTtcblx0XHR3aW5kb3cuc2V0VGltZW91dCh0aGlzLmFkZFNvcnRCdXR0b25zLmJpbmQodGhpcyksIDApO1xuXHRcdHRoaXMuX3JlYWR5KCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzaWNUYWJsZTtcbiIsIi8qKlxuICogRXh0cmFjdHMgdGhlIGNvbnRlbnRzIG9mIGltZyBhbHQgdGV4dC5cbiAqIEBleGFtcGxlIFN0cmluZyBhcmd1bWVudCBmb3IgZXhhbXBsZSBwdXJwb3NlcyBvbmx5LCB0byByZXByZXNlbnQgYSBIVE1MRWxlbWVudC5cbiAqIFx0ZXh0cmFjdEFsdEZyb21JbWFnZXMoJzxpbWcgYWx0PVwidGV4dFwiPicpOyAvLyB0ZXh0XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjZWxsIFRoZSBET00gbm9kZSB0byBvcGVyYXRlIG9uLCBwb3NzaWJseSBhIDx0ZD5cbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHJldHVybnMge0hUTUxFbGVtZW50fSB0aGUgcGFyYW1ldGVyXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RBbHRGcm9tSW1hZ2VzKGNlbGwpe1xuXHRjb25zdCBpbWFnZXMgPSBBcnJheS5mcm9tKGNlbGwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpKTtcblx0aW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xuXHRcdGNvbnN0IGNvbnRlbnRzID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhbHQnKTtcblx0XHRpbWFnZS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgY29udGVudHMpO1xuXHRcdGltYWdlLnJlbW92ZSgpO1xuXHR9KTtcblxuXHRyZXR1cm4gY2VsbDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0ZXh0IHJlcHJlc2FudGF0aW9uIG9mIGFuIEhUTUwgbm9kZS5cbiAqIElmIGEgbm9kZSBjb250YWlucyBubyBgZGF0ZVRpbWVgIGF0dHJpYnV0ZSwgY29udGVudCwgYGFyaWEtbGFiZWxgIG9yIGB0aXRsZWAgYXR0cmlidXRlcyBvZiA8YT4sIDxzcGFuPiwgb3IgPGk+IGNoaWxkIG5vZGVzIGFyZSB1c2VkLlxuICogQGV4YW1wbGUgU3RyaW5nIGFyZ3VtZW50IGZvciBleGFtcGxlIHB1cnBvc2VzIG9ubHksIHRvIHJlcHJlc2VudCBhIEhUTUxFbGVtZW50LlxuICogXHRleHRyYWN0VGV4dCgnPGkgY2xhc3M9XCJvLWljb25zLWljb24gby1pY29ucy1pY29uLS1tYWlsXCI+PGEgaHJlZj1cIm1haWx0bzpleGFtcGxlQGZ0LmNvbVwiIHRpdGxlPVwiRW1haWwgRXhhbXBsZSBhdCBleGFtcGxlQGZ0LmNvbVwiPjwvYT4nKTsgLy9FbWFpbCBFeGFtcGxlIGF0IGV4YW1wbGVAZnQuY29tXG4gKiBcdGV4dHJhY3RUZXh0KCc8c3BhbiBjbGFzcz1cIm8taWNvbnMtaWNvbiBvLWljb25zLWljb24tLXRpY2tcIj5Db3JyZWN0PC9zcGFuPicpOyAvL0NvcnJlY3RcbiAqIFx0ZXh0cmFjdFRleHQoJzxzcGFuIGNsYXNzPVwiby1pY29ucy1pY29uIG8taWNvbnMtaWNvbi0tdGlja1wiIHRpdGxlPVwiQ29ycmVjdFwiPjwvc3Bhbj4nKTsgLy9Db3JyZWN0XG4gKiBcdGV4dHJhY3RUZXh0KCc8c3BhbiBjbGFzcz1cIm8taWNvbnMtaWNvbiBvLWljb25zLWljb24tLXRpY2tcIiBhcmlhLWxhYmVsPVwiQ29ycmVjdFwiPjwvc3Bhbj4nKTsgLy9Db3JyZWN0XG4gKiBcdGV4dHJhY3RUZXh0KCc8dGltZSBjbGFzcz1cIm8tZGF0ZVwiIGRhdGEtby1jb21wb25lbnQ9XCJvLWRhdGVcIiBkYXRldGltZT1cIjIwMjAtMDYtMTlUMDc6NTY6MThaXCI+MiBob3VycyBhZ288L3RpbWU+Jyk7IC8vQ29ycmVjdFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2VsbCBUaGUgRE9NIG5vZGUgdG8gb3BlcmF0ZSBvbiwgcG9zc2libHkgYSA8dGQ+XG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gdGV4dCByZXByZXNlbnRhdGlvbiBvZiB0aGUgSFRNTCBub2RlXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RUZXh0KGNlbGwpe1xuXHRjb25zdCB0aW1lID0gY2VsbC5xdWVyeVNlbGVjdG9yKCd0aW1lJyk7XG5cdGlmICh0aW1lICYmIHRpbWUuZGF0ZVRpbWUpIHtcblx0XHRjb25zdCBkYXRlID0gbmV3IERhdGUodGltZS5kYXRlVGltZSk7XG5cdFx0aWYgKCFpc05hTihkYXRlLmdldFRpbWUoKSkpe1xuXHRcdFx0cmV0dXJuIGRhdGUuZ2V0VGltZSgpICsgJyc7XG5cdFx0fVxuXHR9XG5cdGxldCB0ZXh0ID0gY2VsbC50ZXh0Q29udGVudC50cmltKCk7XG5cdC8vIE5vIHRleHQgZm91bmQsIGNoZWNrIGFyaWEgbGFiZWxzIGFuZCB0aXRsZXMuXG5cdC8vIFVzZWZ1bCBmb3IgaWNvbi1vbmx5IGNlbGxzLlxuXHRpZiAodGV4dCA9PT0gJycpIHtcblx0XHRjb25zdCBub2RlcyA9IGNlbGwucXVlcnlTZWxlY3RvckFsbCgnYSwgc3BhbiwgaScpO1xuXHRcdHRleHQgPSBBcnJheS5mcm9tKG5vZGVzKS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBub2RlKSA9PiB7XG5cdFx0XHRjb25zdCBub2RlVGV4dCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJykgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJyk7XG5cdFx0XHRyZXR1cm4gbm9kZVRleHQgPyBgJHthY2N1bXVsYXRvcn0gJHtub2RlVGV4dH1gIDogYWNjdW11bGF0b3I7XG5cdFx0fSwgJycpO1xuXHR9XG5cdHJldHVybiB0ZXh0LnRyaW0oKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0ZXh0IHdpdGggYWJicmV2aWF0aW9ucyBleHBhbmRlZC5cbiAqIFN1cHBvcnRzIG1pbGxpb24gJ20nLCBiaWxsaW9uICdibicgKDEsMDAwIG1pbGxpb24pLCBhbmQgdHJpbGxpb24gJ3RuJyAoMSwwMDAgYmlsbGlvbikuXG4gKiBAZXhhbXBsZVxuICogIGV4cGFuZEFiYnJldmlhdGlvbnMoJzFtJykgLy8xMDAwMDAwXG4gKiAgZXhwYW5kQWJicmV2aWF0aW9ucygnMS4yYm4nKSAvLzIyMDAwMDAwMDBcbiAqICBleHBhbmRBYmJyZXZpYXRpb25zKCcxdG4nKSAvLzEwMDAwMDAwMDAwMDBcbiAqICBleHBhbmRBYmJyZXZpYXRpb25zKCc1bS0xMG0nKSAvLzUwMDAwMDAtMTAwMDAwMDBcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSBzdHJpbmcgdG8gb3BlcmF0ZSBvblxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUZXh0IHdpdGggYW55IHN1cHBvcnRlZCBhYmJyZXZpYXRpb25zIGV4cGFuZGVkXG4gKi9cbmZ1bmN0aW9uIGV4cGFuZEFiYnJldmlhdGlvbnModGV4dCkge1xuXHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC8oW1xcZCwuXSspKFthLXpBLVpdKykvZywgKG1hdGNoLCBkaWdpdCwgYWJicmV2aWF0aW9uKSA9PiB7XG5cdFx0Y29uc3QgemVyb3MgPSB7XG5cdFx0XHQnbSc6IDYsXG5cdFx0XHQnYm4nOiA5LFxuXHRcdFx0J3RuJzogMTJcblx0XHR9O1xuXHRcdHJldHVybiBgJHtkaWdpdCAqIE1hdGgucG93KDEwLCB6ZXJvc1thYmJyZXZpYXRpb25dIHx8IDApfWA7XG5cdH0pO1xuXHRyZXR1cm4gdGV4dDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB0ZXh0IHdpdGggZGlnaXQgZ3JvdXAgc2VwYXJhdG9ycyByZW1vdmVkLlxuICogQGV4YW1wbGVcbiAqICByZW1vdmVEaWdpdEdyb3VwU2VwYXJhdG9yKCcxLDAwMCcpIC8vMTAwMFxuICogIHJlbW92ZURpZ2l0R3JvdXBTZXBhcmF0b3IoJzQwJykgLy80MFxuICogIHJlbW92ZURpZ2l0R3JvdXBTZXBhcmF0b3IoJzQsMDAwLDAwMCcpIC8vNDAwMDAwMFxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHN0cmluZyB0byBvcGVyYXRlIG9uXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRleHQgd2l0aCBkaWdpdCBncm91cCBzZXBhcmF0b3JzIChjb21tYXMpIHJlbW92ZWQuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZURpZ2l0R3JvdXBTZXBhcmF0b3JzKHRleHQpIHtcblx0cmV0dXJuIHRleHQucmVwbGFjZSgvLC9nLCAnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdGV4dCB3aXRoIG5vbi1udW1iZXIgY2hhcmFjdGVycyByZW1vdmVkIChlLmcuIGN1cnJlbmN5IHN5bWJvbHMpLlxuICogRG9lcyBub3QgZWZmZWN0IHJhbmdlIGNoYXJhY3RlcnMgZS5nLiBcIuKAk1wiIHdpbGwgYmUgbWFpbnRhaW5lZC5cbiAqIElmIG5vIGRpZ2l0cyB3ZXJlIGZvdW5kIHRvIHJlbW92ZSwgcmV0dXJucyB0aGUgdGV4dCB1bmNoYW5nZWQuXG4gKiBAZXhhbXBsZVxuICogIGV4dHJhY3REaWdpdHNJZkZvdW5kKCdSbWIxMDAnKSAvLzEwMFxuICogIGV4dHJhY3REaWdpdHNJZkZvdW5kKCdDRkEgRnI4MzAnKSAvLzgzMFxuICogIGV4dHJhY3REaWdpdHNJZkZvdW5kKCdISyQxMicpIC8vMTJcbiAqICBleHRyYWN0RGlnaXRzSWZGb3VuZCgnSEskMTItSEskMjAnKSAvLzEy4oCTMjBcbiAqICBleHRyYWN0RGlnaXRzSWZGb3VuZCgnMTUzNDk1NjU5My0xNTM0OTU2NjIwJykgLy8xNTM0OTU2NTkz4oCTMTUzNDk1NjYyMFxuICogIGV4dHJhY3REaWdpdHNJZkZvdW5kKCdTb21lIHRleHQnKSAvL1NvbWUgdGV4dFxuICogIGV4dHJhY3REaWdpdHNJZkZvdW5kKCdTb21lIHRleHQgMTIzJykgLy8xMjNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSBzdHJpbmcgdG8gb3BlcmF0ZSBvblxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUZXh0IHdpdGggZGlnaXRzIGNoYXJhY3RlcnMgb25seS5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdERpZ2l0c0lmRm91bmQodGV4dCkge1xuXHRjb25zdCBkaWdpdHNBbmRSYW5nZSA9IHRleHQucmVwbGFjZSgvKFteXFxkLixcXC1cXOKAk10rKS9nLCAnJyk7XG5cdGlmIChkaWdpdHNBbmRSYW5nZSA9PT0gJycpIHtcblx0XHRyZXR1cm4gdGV4dDtcblx0fVxuXHRyZXR1cm4gZGlnaXRzQW5kUmFuZ2U7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG51bWJlciBmcm9tIGEgcmFuZ2VcbiAqIEBleGFtcGxlXG4gKiAgcmVtb3ZlUmFuZ2UoJzE1MzQ5NTY1OTPigJMxNTM0OTU2NjIwJykgLy8xNTM0OTU2NTkzXG4gKiAgcmVtb3ZlUmFuZ2UoJzEyM+KAkzM0NScpIC8vMTIzXG4gKiAgcmVtb3ZlUmFuZ2UoJzEyMycpIC8vMTIzXG4gKiAgcmVtb3ZlUmFuZ2UoJ05vIG51bWJlcnMnKSAvL05vIG51bWJlcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSBzdHJpbmcgdG8gb3BlcmF0ZSBvblxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBleHRyYWN0TnVtYmVyRnJvbVJhbmdlKHRleHQpIHtcblx0Y29uc3QgbnVtYmVyID0gcGFyc2VGbG9hdCh0ZXh0KTtcblx0cmV0dXJuIGlzTmFOKG51bWJlcikgPyB0ZXh0IDogbnVtYmVyO1xufVxuXG4vKipcbiAqIFBhcnNlcyBGVCBzdHlsZSBkYXRlIGFuZCB0aW1lIGFuZCBmb3JtYXRzIGFzIGEgbnVtYmVyIGZvciBzb3J0aW5nLlxuICogRlQgZGF0ZSBvciBkYXRlIGFuZCB0aW1lIHJldHVybnMgYSBVTklYIGVwb2NoIChVVEMpLlxuICogRlQgdGltZSByZXR1cm5zIGEgcG9zaXRpdmUgZmxvYXQgZm9yIHBtLCBuZWdhdGl2ZSBmb3IgYW0uXG4gKiBAZXhhbXBsZVxuICogIGZ0RGF0ZVRpbWVUb051bWJlcignQXVndXN0IDE3JykgLy9VTklYIGVwb2NoLCBhc3N1bWVzIGN1cnJlbnQgeWVhclxuICogIGZ0RGF0ZVRpbWVUb051bWJlcignU2VwdGVtYmVyIDEyIDIwMTInKSAvL1VOSVggZXBvY2hcbiAqICBmdERhdGVUaW1lVG9OdW1iZXIoJ0phbnVhcnkgMjAxMicpIC8vVU5JWCBlcG9jaCwgZmlyc3Qgb2YgbW9udGhcbiAqICBmdERhdGVUaW1lVG9OdW1iZXIoJ01hcmNoIDEyIDIwMTUgMWFtJykgLy9VTklYIGVwb2NoIGluY2x1ZGluZyB0aW1lXG4gKiAgZnREYXRlVGltZVRvTnVtYmVyKCdBcHJpbCAyMCAyMDE0IDEuMzBwbScpIC8vVU5JWCBlcG9jaCBpbmNsdWRpbmcgdGltZVxuICogIGZ0RGF0ZVRpbWVUb051bWJlcignMWFtJykgLy8xXG4gKiAgZnREYXRlVGltZVRvTnVtYmVyKCcxLjMwYW0nKSAvLzEuM1xuICogIGZ0RGF0ZVRpbWVUb051bWJlcignMS40MHBtJykgLy8xMy40XG4gKiAgZnREYXRlVGltZVRvTnVtYmVyKCczcG0nKSAvLzE1XG4gKiAgZnREYXRlVGltZVRvTnVtYmVyKCdOb3QgYSBrbm93biBkYXRlJykgLy9Ob3RlIGEga25vd24gZGF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHN0cmluZyB0byBvcGVyYXRlIG9uXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IE51bWJlciByZXByZXNlbnRhdGlvbiBvZiBkYXRlIGFuZC9vciB0aW1lIGZvciBzb3J0aW5nLlxuICovXG5mdW5jdGlvbiBmdERhdGVUaW1lVG9OdW1iZXIodGV4dCkge1xuXHRjb25zdCBtb250aE5hbWVzID0gWydKYW51YXJ5JywnRmVicnVhcnknLCdNYXJjaCcsJ0FwcmlsJywnTWF5JywnSnVuZScsJ0p1bHknLCdBdWd1c3QnLCdTZXB0ZW1iZXInLCdPY3RvYmVyJywnTm92ZW1iZXInLCdEZWNlbWJlciddO1xuXHQvLyBGVCBzdHlsZSBmb3Igd3JpdGluZyBkYXRlczogaXMgSnVuZSAyMyAyMDE2IChubyBjb21tYXMsIG1vbnRoIGRhdGUgeWVhcilcblx0Y29uc3QgZGF0ZSA9IHRleHQubWF0Y2goL14oW0EtWmEtel17Myx9KSg/OltcXHNdKSg/PVtcXGRdKSgoPzpcXGR7MSwyfSk/KD8hW1xcZF0pKT8oPzpcXHMpPyhcXGR7NH0pPy8pO1xuXHQvLyBGVCBzdHlsZSBmb3Igd3JpdGluZyB0aW1lOlxuXHQvLyBUaGUgMTIgaG91ciBjbG9jayBzaG91bGQgYmUgdXNlZDogMWFtLCA5LjMwcG1cblx0Y29uc3QgdGltZSA9IHRleHQubWF0Y2goLyg/Olxcc3xeKShcXGR7MSwyfSg/OlsuXShcXGR7Mn0pKT8pKHBtfGFtKSQvKTtcblx0Ly8gR2V0IGRhdGUuXG5cdGNvbnN0IG1vbnRoID0gZGF0ZSAmJiBkYXRlWzFdID8gZGF0ZVsxXSA6IG51bGw7XG5cdC8vIEdldCBpbmRleCBvZiB0aGUgbW9udGggbmFtZSBmcm9tIGEgZ2l2ZW4gbW9udGggZS5nLiAnSmFudWFyeScgZm9yICdKYW4nLlxuXHRsZXQgbW9udGhJbmRleCA9IG51bGw7XG5cdGlmIChtb250aCkge1xuXHRcdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBtb250aE5hbWVzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdFx0Y29uc3QgbmFtZSA9IG1vbnRoTmFtZXNbaW5kZXhdO1xuXHRcdFx0aWYgKG5hbWUuc3RhcnRzV2l0aChtb250aCkpIHtcblx0XHRcdFx0bW9udGhJbmRleCA9IGluZGV4O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y29uc3QgZGF5ID0gZGF0ZSAmJiBkYXRlWzJdID8gcGFyc2VJbnQoZGF0ZVsyXSwgMTApIDogbnVsbDtcblx0bGV0IHllYXIgPSBkYXRlICYmIGRhdGVbM10gPyBwYXJzZUludChkYXRlWzNdLCAxMCkgOiBudWxsO1xuXHRpZiAobW9udGggJiYgIXllYXIpIHtcblx0XHQvLyBGb3Igc29ydGluZyBwdXJwb3NlcywgYXNzdW1lIGEgbW9udGggaXMgZm9yIHRoaXMgeWVhciBpZiBub3Qgb3RoZXJ3aXNlIHNwZWNpZmllZC5cblx0XHR5ZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXHR9XG5cdC8vIEdldCB0aW1lLlxuXHRjb25zdCBob3VyID0gdGltZSAmJiB0aW1lWzFdID8gcGFyc2VJbnQodGltZVsxXSwgMTApIDogbnVsbDtcblx0Y29uc3QgbWludXRlID0gdGltZSAmJiB0aW1lWzJdID8gcGFyc2VJbnQodGltZVsyXSwgMTApIDogbnVsbDtcblx0Y29uc3QgcGVyaW9kID0gdGltZSA/IHRpbWVbM10gOiBudWxsO1xuXHRjb25zdCB0d2VudHlGb3VySG91ciA9IGhvdXIgJiYgcGVyaW9kID09PSAncG0nID8gaG91ciArIDEyIDogaG91cjtcblx0Ly8gU29ydCBudW1iZXIgZm9yIEZUIGZvcm1hdGVkIHRpbWUuXG5cdGlmIChob3VyICYmICEoeWVhciAmJiBtb250aEluZGV4KSkge1xuXHRcdHJldHVybiBwYXJzZUZsb2F0KGAke3R3ZW50eUZvdXJIb3VyfS4ke21pbnV0ZX1gKTtcblx0fVxuXG5cdGlmICh5ZWFyICE9PSBudWxsIHx8IG1vbnRoSW5kZXggIT09IG51bGwgfHwgZGF5ICE9PSBudWxsIHx8IHR3ZW50eUZvdXJIb3VyICE9PSBudWxsIHx8IG1pbnV0ZSAhPT0gbnVsbCkge1xuXHRcdC8vIFVuaXggZXBvY2ggdG8gc29ydCBGVCBmb3JtYXRlZCBkYXRlLlxuXHRcdGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aEluZGV4LCBkYXksIHR3ZW50eUZvdXJIb3VyLCBtaW51dGUpKTtcblx0XHRyZXR1cm4gaXNOYU4oZGF0ZU9iai5nZXRUaW1lKCkpID8gdGV4dCA6IGRhdGVPYmouZ2V0VGltZSgpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB0ZXh0O1xuXHR9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbmQgbnVtYmVyIG9mIGFzdGVyaXNrJ3Mgd2hpY2ggYXJlIGF0IHRoZSBlbmQgb2YgdGhlIGxpbmUuXG4gKiBAZXhhbXBsZVxuICogIHJlbW92ZVJlZmVyZW5lQXN0ZXJpc2soJ0R1cmlhbionKSAvL0R1cmlhblxuICogIHJlbW92ZVJlZmVyZW5lQXN0ZXJpc2soJzEsNDM5LDE2NS40MyoqJykgLy8xLDQzOSwxNjUuNDNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSBzdHJpbmcgdG8gb3BlcmF0ZSBvblxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUZXh0IHdpdGhvdXQgc291cmNlL3JlZmVyZW5jZSBhc3Rlcmlzay5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlUmVmZXJlbmVBc3Rlcmlzayh0ZXh0KSB7XG5cdHJldHVybiB0ZXh0LnJlcGxhY2UoL1xcKiskLywgJycpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgaW5kaWNhdG9ycyBvZiBhbiBlbXB0eSBjZWxsLlxuICogQGV4YW1wbGVcbiAqICByZW1vdmVFbXB0eUNlbGxJbmRpY2F0b3JzKCduL2EnKTsgLy9cbiAqICByZW1vdmVFbXB0eUNlbGxJbmRpY2F0b3JzKCctJyk7IC8vXG4gKiAgcmVtb3ZlRW1wdHlDZWxsSW5kaWNhdG9ycygnQ2VsbC1jb250ZW50Jyk7IC8vQ2VsbC1jb250ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgc3RyaW5nIHRvIG9wZXJhdGUgb25cbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHJldHVybnMge1N0cmluZ30gQW4gZW1wdHkgc3RyaW5nIG9yIHRoZSBvcmlnaW5hbCB0ZXh0LlxuICovXG5mdW5jdGlvbiByZW1vdmVFbXB0eUNlbGxJbmRpY2F0b3JzKHRleHQpIHtcblx0Ly8gUmVtb3ZlIG4vYVxuXHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9eblsuL11hWy5dPyQvaSwgJycpO1xuXHQvLyBSZW1vdmUgLVxuXHRyZXR1cm4gdGV4dCA9PT0gJy0nID8gJycgOiB0ZXh0O1xufVxuXG4vKipcbiAqIEdyb3VwIG9mIGZpbHRlcnMgdG8gZXh0cmFjdCB0ZXh0IGZyb20gYSBjZWxsLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2VsbCBUaGUgbm9kZSB0byBleHRyYWN0IHNvcnRhYmxlIHRleHQgZnJvbS5cbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIG5vZGUgY29udGVudCB0byBzb3J0IG9uLlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9kZUNvbnRlbnQoY2VsbCkge1xuXHRjb25zdCBzdGVwcyA9IFtleHRyYWN0QWx0RnJvbUltYWdlcywgZXh0cmFjdFRleHQsIHJlbW92ZVJlZmVyZW5lQXN0ZXJpc2ssIHJlbW92ZUVtcHR5Q2VsbEluZGljYXRvcnNdO1xuXHRsZXQgdGV4dCA9IGNlbGw7XG5cdHN0ZXBzLmZvckVhY2goc3RlcCA9PiB7IHRleHQgPSBzdGVwKHRleHQpOyB9KTtcblx0cmV0dXJuIHR5cGVvZiB0ZXh0ID09PSAnc3RyaW5nJyA/IHRleHQgOiAnJztcbn1cblxuLyoqXG4gKiBHcm91cCBvZiBmaWx0ZXJzIHRvIGV4dHJhY3QgYSBudW1iZXIgZm9yIHNvcnRpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgc3RyaW5nIHRvIG9wZXJhdGUgb25cbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHJldHVybnMge051bWJlcnxTdHJpbmd9IEEgbnVtYmVyIGlmIG9uZSBjb3VsZCBhIGV4dHJhY3RlZCwgc3RyaW5nIG90aGVyd2lzZS5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdE51bWJlcih0ZXh0KSB7XG5cdGNvbnN0IHN0ZXBzID0gW3JlbW92ZURpZ2l0R3JvdXBTZXBhcmF0b3JzLCBleHBhbmRBYmJyZXZpYXRpb25zLCBleHRyYWN0RGlnaXRzSWZGb3VuZCwgZXh0cmFjdE51bWJlckZyb21SYW5nZV07XG5cdHN0ZXBzLmZvckVhY2goc3RlcCA9PiB7IHRleHQgPSBzdGVwKHRleHQpOyB9KTtcblx0cmV0dXJuIHRleHQ7XG59XG5cbi8qKlxuICogTWV0aG9kcyB0byBmb3JtYXQgdGFibGUgY2VsbHMgZm9yIHNvcnRpbmcuXG4gKiBAYWNjZXNzIHB1YmxpY1xuICovXG5jbGFzcyBDZWxsRm9ybWF0dGVyIHtcblxuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0Ly8gVGhpcyBvYmplY3QgaXMgdXNlZCB0byBrZWVwIHRoZSBydW5uaW5nIG9yZGVyIG9mIGZpbHRlciBtZXRob2RzXG5cdFx0dGhpcy5maWx0ZXJzID0ge1xuXHRcdFx0dGV4dDogW2V4dHJhY3ROb2RlQ29udGVudF0sXG5cdFx0XHRudW1iZXI6IFtleHRyYWN0Tm9kZUNvbnRlbnQsIGV4dHJhY3ROdW1iZXJdLFxuXHRcdFx0cGVyY2VudDogW2V4dHJhY3ROb2RlQ29udGVudCwgZXh0cmFjdE51bWJlcl0sXG5cdFx0XHRjdXJyZW5jeTogW2V4dHJhY3ROb2RlQ29udGVudCwgZXh0cmFjdE51bWJlcl0sXG5cdFx0XHRudW1lcmljOiBbZXh0cmFjdE5vZGVDb250ZW50LCBleHRyYWN0TnVtYmVyXSxcblx0XHRcdGRhdGU6IFtleHRyYWN0Tm9kZUNvbnRlbnQsIGZ0RGF0ZVRpbWVUb051bWJlcl1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgZm9ybWF0RnVuY3Rpb25gIHRha2UgdGhlIHRhYmxlIGNlbGwgSFRNTEVsZW1lbnQsXG5cdCAqIGFuZCBjb252ZXJ0cyBpdCB0byBhIFN0cmluZyBvciBOdW1iZXIgb2Ygc29ydGluZy5cblx0ICpcblx0ICogQGNhbGxiYWNrIGZvcm1hdEZ1bmN0aW9uXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNlbGxcblx0ICogQHJldHVybiB7U3RyaW5nfE9iamVjdH1cblx0ICovXG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBkYXRhIHR5cGUgb2YgdGhlIGNlbGwgdG8gYXBwbHkgdGhlIGZpbHRlciBmdW5jdGlvbiB0by5cblx0ICogQHBhcmFtIHtmb3JtYXRGdW5jdGlvbn0gZm9ybWF0RnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIHRha2UgdGhlIGNlbGwgYW5kIHJldHVybiBhIHNvcnRhYmxlIHZhbHVlIChzdHJpbmcvbnVtYmVyKS5cblx0ICogQGV4YW1wbGVcblx0ICogIG15U29ydEZvcm1hdHRlci5zZXRGb3JtYXR0ZXIoJ2Vtb2ppLXRpbWUnLCAoY2VsbCkgPT4ge1xuXHQgKiAgXHRjb25zdCB0ZXh0ID0gY2VsbC50ZXh0Q29udGVudC50cmltKCk7XG5cdCAqICBcdGlmICh0ZXh0ID09PSAn8J+MkScpIHtcblx0ICogIFx0XHRyZXR1cm4gMTtcblx0ICogIFx0fVxuXHQgKiAgXHRpZiAodGV4dCA9PT0gJ/CfjKTvuI/vuI8nKSB7XG5cdCAqICBcdFx0cmV0dXJuIDI7XG5cdCAqICBcdH1cblx0ICogIFx0cmV0dXJuIDA7XG5cdCAqICB9KTtcblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICovXG5cdHNldEZvcm1hdHRlcih0eXBlLCBmb3JtYXRGdW5jdGlvbikge1xuXHRcdHRoaXMuZmlsdGVyc1t0eXBlXSA9IFtmb3JtYXRGdW5jdGlvbl07XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2VsbFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZGF0YSB0eXBlIG9mIHRoZSBjZWxsLCBlLmcuIGRhdGUsIG51bWJlciwgY3VycmVuY3kuIEN1c3RvbSB0eXBlcyBhcmUgc3VwcG9ydGVkLlxuXHQgKiBAc2VlIHtAbGluayBzZXRGb3JtYXR0ZXJ9IHRvIHN1cHBvcnQgYWRkIHN1cHBvcnQgZm9yIGEgY3VzdG9tIHR5cGUuXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9IEEgcmVwcmVzZW50YXRpb24gb2YgY2VsbCB3aGljaCBjYW4gYmUgdXNlZCBmb3Igc29ydGluZy5cblx0ICovXG5cdGZvcm1hdENlbGwoeyBjZWxsLCB0eXBlID0gJ3RleHQnIH0pIHtcblx0XHR0eXBlID0gdHlwZSB8fCAndGV4dCc7XG5cdFx0bGV0IHNvcnRWYWx1ZSA9IGNlbGwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tdGFibGUtc29ydC12YWx1ZScpO1xuXHRcdGlmIChzb3J0VmFsdWUgPT09IG51bGwpIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcnNbdHlwZV0pIHtcblx0XHRcdFx0Y29uc3QgY2VsbENsb25lID0gY2VsbC5jbG9uZU5vZGUoeyBkZWVwOiB0cnVlIH0pO1xuXHRcdFx0XHRzb3J0VmFsdWUgPSBjZWxsQ2xvbmU7XG5cdFx0XHRcdHRoaXMuZmlsdGVyc1t0eXBlXS5mb3JFYWNoKGZuID0+IHsgc29ydFZhbHVlID0gZm4oc29ydFZhbHVlKTsgfSk7XG5cdFx0XHR9XG5cdFx0XHRjZWxsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLXRhYmxlLXNvcnQtdmFsdWUnLCBzb3J0VmFsdWUpO1xuXHRcdH1cblx0XHRjb25zdCBzb3J0VmFsdWVJc051bWJlciA9IHNvcnRWYWx1ZSAhPT0gJycgJiYgIWlzTmFOKHNvcnRWYWx1ZSk7XG5cdFx0cmV0dXJuIHNvcnRWYWx1ZUlzTnVtYmVyID8gcGFyc2VGbG9hdChzb3J0VmFsdWUpIDogc29ydFZhbHVlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENlbGxGb3JtYXR0ZXI7XG4iLCJpbXBvcnQgQ2VsbEZvcm1hdHRlciBmcm9tIFwiLi9DZWxsRm9ybWF0dGVyLmpzXCI7XG5cbi8qKlxuICogQ29uc3RydWN0IEludGwuQ29sbGF0b3IgaWYgc3VwcG9ydGVkLlxuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHJldHVybnMge0ludGwuQ29sbGF0b3IgfCBVbmRlZmluZWR9XG4gKi9cbmZ1bmN0aW9uIGdldEludGxDb2xsYXRvcigpIHtcblx0aWYgKHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJyAmJiB7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKEludGwsICdDb2xsYXRvcicpKSB7XG5cdFx0cmV0dXJuIG5ldyBJbnRsLkNvbGxhdG9yKCk7XG5cdH1cbn1cblxuLyoqXG4gKiBBbiBhc2NlbmRpbmcgW2NvbXBhcmUgZnVuY3Rpb25de0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3NvcnQjUGFyYW1ldGVyc30uXG4gKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGFcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gYlxuICogQHBhcmFtIHtJbnRsLkNvbGxhdG9yfSBpbnRsQ29sbGF0b3JcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGFzY2VuZGluZ1NvcnQoYSwgYiwgaW50bENvbGxhdG9yKSB7XG5cdGlmICgodHlwZW9mIGEgPT09ICdzdHJpbmcnIHx8IGEgaW5zdGFuY2VvZiBTdHJpbmcpICYmICh0eXBlb2YgYiA9PT0gJ3N0cmluZycgfHwgYiBpbnN0YW5jZW9mIFN0cmluZykpIHtcblx0XHRyZXR1cm4gaW50bENvbGxhdG9yID8gaW50bENvbGxhdG9yLmNvbXBhcmUoYSwgYikgOiBhLmxvY2FsZUNvbXBhcmUoYik7XG5cdH0gZWxzZSBpZiAoIWlzTmFOKGIpICYmIGlzTmFOKGEpIHx8IGEgPCBiKSB7XG5cdFx0cmV0dXJuIC0xO1xuXHR9IGVsc2UgaWYgKCFpc05hTihhKSAmJiBpc05hTihiKSB8fCBiIDwgYSkge1xuXHRcdHJldHVybiAxO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAwO1xuXHR9XG59XG5cbi8qKlxuICogQSBkZXNjZW5kaW5nIFtjb21wYXJlIGZ1bmN0aW9uXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9zb3J0I1BhcmFtZXRlcnN9LlxuICpcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBhXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGJcbiAqIEBwYXJhbSB7SW50bC5Db2xsYXRvcn0gaW50bENvbGxhdG9yXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBkZXNjZW5kaW5nU29ydCguLi5hcmdzKSB7XG5cdHJldHVybiAwIC0gYXNjZW5kaW5nU29ydC5hcHBseSh0aGlzLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyBtZXRob2RzIHRvIHNvcnQgdGFibGUgaW5zdGFuY2VzLlxuICovXG5jbGFzcyBUYWJsZVNvcnRlciB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fY2VsbEZvcm1hdHRlciA9IG5ldyBDZWxsRm9ybWF0dGVyKCk7XG5cdH1cblxuXHQvKipcblx0ICogU29ydCB0aGUgZ2l2ZW4gdGFibGUuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEBwYXJhbSB7QmFzZVRhYmxlfSB0YWJsZSAtIFRoZSB0YWJsZSBpbnN0YW5jZSB0byBzb3J0LlxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29sdW1uSW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIHRhYmxlIGNvbHVtbiB0byBzb3J0LlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc29ydE9yZGVyIC0gSG93IHRvIHNvcnQgdGhlIGNvbHVtbiwgXCJhc2NlbmRpbmdcIiBvciBcImRlc2NlbmRpbmdcIlxuXHQgKiBAcGFyYW0ge051bWJlcn0gYmF0Y2ggWzEwMF0gLSBEZXByZWNhdGVkLiBObyBsb25nZXIgdXNlZC4gSG93IG1hbnkgcm93cyB0byByZW5kZXIgYXQgb25jZSB3aGVuIHNvcnRpbmcuXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRzb3J0Um93c0J5Q29sdW1uKHRhYmxlLCBjb2x1bW5JbmRleCwgc29ydE9yZGVyLCBiYXRjaCkge1xuXHRcdGNvbnN0IHRhYmxlSGVhZGVyRWxlbWVudCA9IHRhYmxlLmdldFRhYmxlSGVhZGVyKGNvbHVtbkluZGV4KTtcblxuXHRcdGlmIChiYXRjaCkge1xuXHRcdFx0Y29uc29sZS53YXJuKCdvLXRhYmxlOiBUaGUgXCJiYXRjaFwiIGFyZ3VtZW50IGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciB1c2VkLicpO1xuXHRcdH1cblxuXHRcdGlmIChbJ2FzY2VuZGluZycsICdkZXNjZW5kaW5nJ10uaW5kZXhPZihzb3J0T3JkZXIpID09PSAtMSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBTb3J0IG9yZGVyIFwiJHtzb3J0T3JkZXJ9XCIgaXMgbm90IHN1cHBvcnRlZC4gTXVzdCBiZSBcImFzY2VuZGluZ1wiIG9yIFwiZGVzY2VuZGluZ1wiLmApO1xuXHRcdH1cblxuXHRcdGNvbnN0IGludGxDb2xsYXRvciA9IGdldEludGxDb2xsYXRvcigpO1xuXHRcdGNvbnN0IGNlbGxGb3JtYXR0ZXIgPSB0aGlzLl9jZWxsRm9ybWF0dGVyO1xuXHRcdGNvbnN0IHR5cGUgPSB0YWJsZUhlYWRlckVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW8tdGFibGUtZGF0YS10eXBlJykgfHwgdW5kZWZpbmVkO1xuXHRcdHRhYmxlLnRhYmxlUm93cy5zb3J0KChhLCBiKSA9PiB7XG5cdFx0XHRsZXQgYUNvbCA9IGEucXVlcnlTZWxlY3RvckFsbCgndGQsdGg6bm90KC5vLXRhYmxlX19kdXBsaWNhdGUtaGVhZGluZyknKVtjb2x1bW5JbmRleF07XG5cdFx0XHRsZXQgYkNvbCA9IGIucXVlcnlTZWxlY3RvckFsbCgndGQsdGg6bm90KC5vLXRhYmxlX19kdXBsaWNhdGUtaGVhZGluZyknKVtjb2x1bW5JbmRleF07XG5cdFx0XHRhQ29sID0gY2VsbEZvcm1hdHRlci5mb3JtYXRDZWxsKHsgY2VsbDogYUNvbCwgdHlwZSB9KTtcblx0XHRcdGJDb2wgPSBjZWxsRm9ybWF0dGVyLmZvcm1hdENlbGwoeyBjZWxsOiBiQ29sLCB0eXBlIH0pO1xuXHRcdFx0aWYgKHNvcnRPcmRlciA9PT0gJ2FzY2VuZGluZycpIHtcblx0XHRcdFx0cmV0dXJuIGFzY2VuZGluZ1NvcnQoYUNvbCwgYkNvbCwgaW50bENvbGxhdG9yKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBkZXNjZW5kaW5nU29ydChhQ29sLCBiQ29sLCBpbnRsQ29sbGF0b3IpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gVGFibGUgc29ydGVkLlxuXHRcdHRhYmxlLnNvcnRlZCh7XG5cdFx0XHRjb2x1bW5JbmRleCxcblx0XHRcdHNvcnRPcmRlclxuXHRcdH0pO1xuXG5cdFx0Ly8gUmVuZGVyIHNvcnRlZCB0YWJsZSByb3dzLlxuXHRcdHRhYmxlLnJlbmRlclJvd1VwZGF0ZXMoKTtcblxuXHRcdC8vIFVwZGF0ZSB0YWJsZSBoZWFkaW5ncy5cblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblx0XHRcdHRhYmxlLnRhYmxlSGVhZGVycy5mb3JFYWNoKChoZWFkZXIpID0+IHtcblx0XHRcdFx0Y29uc3QgaGVhZGVyU29ydCA9IGhlYWRlciA9PT0gdGFibGVIZWFkZXJFbGVtZW50ID8gc29ydE9yZGVyIDogJ25vbmUnO1xuXHRcdFx0XHRoZWFkZXIuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCBoZWFkZXJTb3J0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBhIGN1c3RvbSBjZWxsIGZvcm1hdHRlciBmb3IgYSBnaXZlbiBkYXRhIHR5cGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIGRhdGEgdHlwZSB0byBhcHBseSB0aGUgZmlsdGVyIGZ1bmN0aW9uIHRvLlxuXHQgKiBAcGFyYW0ge2Zvcm1hdEZ1bmN0aW9ufSBmb3JtYXRGdW5jdGlvbiAtIENhbGxiYWNrIHRvIGZvcm1hdCBhIHRhYmxlIGNlbGwgdG8gYSBzb3J0IHZhbHVlLlxuXHQgKiBAc2VlIHtAbGluayBDZWxsRm9ybWF0dGVyfnNldEZvcm1hdHRlcn0gZm9yIGBmb3JtYXRGdW5jdGlvbmAgZGV0YWlscy5cblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICovXG5cdHNldENlbGxGb3JtYXR0ZXJGb3JUeXBlKHR5cGUsIGZvcm1hdEZ1bmN0aW9uKSB7XG5cdFx0dGhpcy5fY2VsbEZvcm1hdHRlci5zZXRGb3JtYXR0ZXIodHlwZSwgZm9ybWF0RnVuY3Rpb24pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlU29ydGVyO1xuIiwiaW1wb3J0IEZsYXRUYWJsZSBmcm9tICcuL1RhYmxlcy9GbGF0VGFibGUuanMnO1xuaW1wb3J0IFNjcm9sbFRhYmxlIGZyb20gJy4vVGFibGVzL1Njcm9sbFRhYmxlLmpzJztcbmltcG9ydCBPdmVyZmxvd1RhYmxlIGZyb20gJy4vVGFibGVzL092ZXJmbG93VGFibGUuanMnO1xuaW1wb3J0IEJhc2ljVGFibGUgZnJvbSAnLi9UYWJsZXMvQmFzaWNUYWJsZS5qcyc7XG5cbmltcG9ydCBUYWJsZVNvcnRlciBmcm9tICcuL1NvcnQvVGFibGVTb3J0ZXIuanMnO1xuY29uc3Qgc29ydGVyID0gbmV3IFRhYmxlU29ydGVyKCk7XG5cblxuY2xhc3MgT1RhYmxlIHtcblxuXHQvKipcblx0ICogVGFibGUgb3B0aW9ucy5cblx0ICogQHR5cGVkZWYge09iamVjdH0gT1RhYmxlfm9wdHMgLSBUYWJsZSBvcHRpb25zLlxuXHQgKiBAcHJvcGVydHkge0Jvb2x9IHNvcnRhYmxlIFt0cnVlXSAtIERpc2FibGUgdGhlIHRhYmxlJ3Mgc29ydCBmZWF0dXJlLlxuXHQgKiBAcHJvcGVydHkge1VuZGVmaW5lZCB8IEJvb2x9IGV4cGFuZGVkIFtVbmRlZmluZWRdIC0gQWxsb3cgdGhlIFwiT3ZlcmZsb3dUYWJsZVwiIHRvIGhpZGUgcmVzdWx0cyBiZWhpbmQgYSBcInNob3cgbW9yZVwiIGJ1dHRvbi4gVGhlIHRhYmxlIGlzIGV4cGFuZGVkIGJ5IGRlZmF1bHQgd2hlbiBcInRydWVcIiwgY29udHJhY3RlZCB3aGVuIFwiZmFsc2VcIiwgb3Igbm90IGV4cGFuZGFibGUgaWYgbm90IHNldC5cblx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IG1pbmltdW1Sb3dDb3VudCBbMjBdIC0gV2hlbiB0aGUgYGV4cGFuZGVkYCBvcHRpb24gaXMgc2V0LCB0aGUgbnVtYmVyIG9mIHJvd3MgdG8gc2hvdyB3aGVuIHRoZSB0YWJsZSBpcyBub3QgZXhwYW5kZWQuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGFuIG8tdGFibGUgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSAtIEFuIG8tdGFibGUgZWxlbWVudC5cblx0ICogQHBhcmFtIHsuLi5PVGFibGV+b3B0c30gb3B0cyAtIEEgdGFibGUgb3B0aW9ucyBvYmplY3QuXG5cdCAqIEByZXR1cm5zIHtGbGF0VGFibGUgfCBTY3JvbGxUYWJsZSB8IE92ZXJmbG93VGFibGUgfCBCYXNpY1RhYmxlfSAtIEEgdGFibGUgaW5zdGFuY2UuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihyb290RWwsIG9wdHMgPSB7fSkge1xuXHRcdGNvbnN0IHRhYmxlVHlwZSA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby10YWJsZS1yZXNwb25zaXZlJyk7XG5cdFx0bGV0IFRhYmxlO1xuXHRcdHN3aXRjaCAodGFibGVUeXBlKSB7XG5cdFx0XHRjYXNlICdmbGF0Jzpcblx0XHRcdFx0VGFibGUgPSBGbGF0VGFibGU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnc2Nyb2xsJzpcblx0XHRcdFx0VGFibGUgPSBTY3JvbGxUYWJsZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdvdmVyZmxvdyc6XG5cdFx0XHRcdFRhYmxlID0gT3ZlcmZsb3dUYWJsZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRUYWJsZSA9IEJhc2ljVGFibGU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IFRhYmxlKHJvb3RFbCwgc29ydGVyLCBvcHRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RzIGFsbCBvLXRhYmxlIGNvbXBvbmVudHMgaW5zaWRlIHRoZSBlbGVtZW50IHBhc3NlZCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxzdHJpbmcpfSBbZWw9ZG9jdW1lbnQuYm9keV0gLSBFbGVtZW50IHdoZXJlIHRvIHNlYXJjaCBmb3Igby10YWJsZSBjb21wb25lbnRzLiBZb3UgY2FuIHBhc3MgYW4gSFRNTEVsZW1lbnQgb3IgYSBzZWxlY3RvciBzdHJpbmcuXG5cdCAqIEBwYXJhbSB7Li4uT1RhYmxlfm9wdHN9IG9wdHMgLSBBIHRhYmxlIG9wdGlvbnMgb2JqZWN0LlxuXHQgKiBAcmV0dXJucyB7QXJyYXk8RmxhdFRhYmxlIHwgU2Nyb2xsVGFibGUgfCBPdmVyZmxvd1RhYmxlIHwgQmFzaWNUYWJsZT4gfCBGbGF0VGFibGUgfCBTY3JvbGxUYWJsZSB8IE92ZXJmbG93VGFibGUgfCBCYXNpY1RhYmxlfSAtIEEgdGFibGUgaW5zdGFuY2Ugb3IgYXJyYXkgb2YgdGFibGUgaW5zdGFuY2VzLlxuXHQgKi9cblx0c3RhdGljIGluaXQoZWwgPSBkb2N1bWVudC5ib2R5LCBvcHRzID0ge30pIHtcblx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcblx0XHR9XG5cdFx0aWYgKC9cXGJvLXRhYmxlXFxiLy50ZXN0KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLWNvbXBvbmVudCcpKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBPVGFibGUoZWwsIG9wdHMpO1xuXHRcdH1cblx0XHRjb25zdCB0YWJsZUVscyA9IEFycmF5LmZyb20oZWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnR+PVwiby10YWJsZVwiXScpKTtcblx0XHRyZXR1cm4gdGFibGVFbHMubWFwKGVsID0+IHtcblx0XHRcdHJldHVybiBuZXcgT1RhYmxlKGVsLCBvcHRzKTtcblx0XHR9KTtcblx0fVxuXG5cblx0LyoqXG5cdCAqIFRoZSBjdXN0b20gZm9ybWF0dGVyIGFjY2VwdHMgYSB0YWJsZSBjZWxsIGFuZCByZXR1cm5zIGEgc29ydCB2YWx1ZSBmb3IgdGhhdCBjZWxsLlxuXHQgKiBUaGlzIGNvdWxkIGJlIHVzZWQgdG8gZGVmaW5lIGEgY3VzdG9tIHNvcnQgb3JkZXIgZm9yIGFuIHVuc3VwcG9ydGVkIGZvcm1hdCwgc3VjaCBhcyBlbW9qaSdzLCBvciBhIG5ldyBkYXRlIGZvcm1hdC5cblx0ICpcblx0ICogQGNhbGxiYWNrIGZvcm1hdEZ1bmN0aW9uXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNlbGxcblx0ICovXG5cblx0LyoqXG5cdCAqIFNldCBhIGN1c3RvbSBzb3J0IGZvcm1hdHRlciBmb3IgYSBnaXZlbiBkYXRhIHR5cGUuXG5cdCAqXG5cdCAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcHBpbmcgdGFibGUgY2VsbHMgd2hpY2ggY29udGFpbiBlbW9qaXMgdG8gYSBudW1lcmljYWwgc29ydCB2YWx1ZS48L2NhcHRpb24+XG5cdCAqXHRpbXBvcnQgT1RhYmxlIGZyb20gJ28tdGFibGUnO1xuXHQgKlx0Ly8gU2V0IGEgZmlsdGVyIGZvciBjdXN0b20gZGF0YSB0eXBlIFwiZW1vamktdGltZVwiLlxuXHQgKlx0Ly8gVGhlIHJldHVybiB2YWx1ZSBtYXkgYmUgYSBzdHJpbmcgb3IgbnVtYmVyLlxuXHQgKlx0T1RhYmxlLnNldFNvcnRGb3JtYXR0ZXJGb3JUeXBlKCdlbW9qaS10aW1lJywgKGNlbGwpID0+IHtcblx0ICpcdFx0Y29uc3QgdGV4dCA9IGNlbGwudGV4dENvbnRlbnQudHJpbSgpO1xuXHQgKlx0XHRpZiAodGV4dCA9PT0gJ/CfjJEnKSB7XG5cdCAqXHRcdFx0cmV0dXJuIDE7XG5cdCAqXHRcdH1cblx0ICpcdFx0aWYgKHRleHQgPT09ICfwn4yk77iP77iPJykge1xuXHQgKlx0XHRcdHJldHVybiAyO1xuXHQgKlx0XHR9XG5cdCAqXHRcdHJldHVybiAwO1xuXHQgKlx0fSk7XG5cdCAqXHRPVGFibGUuaW5pdCgpO1xuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSBkYXRhIHR5cGUgdG8gYXBwbHkgdGhlIGZpbHRlciBmdW5jdGlvbiB0by5cblx0ICogQHBhcmFtIHtmb3JtYXRGdW5jdGlvbn0gZm9ybWF0RnVuY3Rpb25cblx0ICogQGFjY2VzcyBwdWJsaWNcblx0ICovXG5cdHN0YXRpYyBzZXRTb3J0Rm9ybWF0dGVyRm9yVHlwZSh0eXBlLCBmb3JtYXRGdW5jdGlvbikge1xuXHRcdHNvcnRlci5zZXRDZWxsRm9ybWF0dGVyRm9yVHlwZSh0eXBlLCBmb3JtYXRGdW5jdGlvbik7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT1RhYmxlO1xuIiwiaW1wb3J0IG9UYWJsZSBmcm9tICcuL3NyYy9qcy9vVGFibGUuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbigpIHtcblx0b1RhYmxlLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IG9UYWJsZTtcbiIsImltcG9ydCAnLi8uLi8uLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiby5ET01Db250ZW50TG9hZGVkXCIpKTtcbn0pO1xuIl19