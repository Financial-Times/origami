function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  }; // ../../node_modules/@financial-times/ft-date-format/index.js


  var require_ft_date_format = __commonJS({
    "../../node_modules/@financial-times/ft-date-format/index.js": function node_modulesFinancialTimesFtDateFormatIndexJs(exports, module) {
      var months = '["' + "January,February,March,April,May,June,July,August,September,October,November,December".split(",").join('","') + '"]';
      var days = '["' + "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",").join('","') + '"]';
      var formats = {
        datetime: "MMMM d yyyy h:mm a",
        date: "MMMM d yyyy"
      };
      var compiledTemplates = {};
      var formatReplacementsMap = {
        MMMM: "months[date.getMonth()]",
        MMM: "months[date.getMonth()].substr(0,3)",
        MM: "pad2(date.getMonth() + 1, 2)",
        M: "(date.getMonth() + 1)",
        yyyy: "date.getFullYear()",
        yy: '(""+date.getFullYear()).substr(-2, 2)',
        EEEE: "days[date.getDay()]",
        EEE: "days[date.getDay()].substr(0,3)",
        d: "date.getDate()",
        dd: "pad2(date.getDate())",
        do: "ordinal(date.getDate())",
        m: "date.getMinutes()",
        mm: "pad2(date.getMinutes())",
        h: "(((date.getHours() + 11) % 12) + 1)",
        hh: "pad2(((date.getHours() + 11) % 12) + 1)",
        H: "date.getHours()",
        HH: "pad2(date.getHours())",
        a: '(date.getHours() >= 12 ? "pm" : "am")'
      };
      var inSeconds = {
        minute: 60,
        hour: 60 * 60,
        day: 24 * 60 * 60,
        week: 7 * 24 * 60 * 60,
        month: 60 * 60 * 24 * 30,
        year: 365 * 24 * 60 * 60
      };

      function compile(format) {
        var tpl = formats[format] || format;
        var funcString = "var months= " + months + ", days= " + days + ";";
        funcString += 'function pad2 (number) {return ("0" + number).slice(-2)}';
        funcString += "function ordinal(number) {\n\t\tconst suffixes = [\"th\", \"st\", \"nd\", \"rd\"];\n\t\tconst v = number % 100;\n\t\treturn number + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);\n\t}";
        funcString += 'return "' + tpl.replace(/\\?[a-z]+/ig, function (match) {
          if (match.charAt(0) === "\\") {
            return match.substr(1);
          }

          var replacer = formatReplacementsMap[match];
          return replacer ? '" + ' + replacer + ' + "' : match;
        }) + '"';
        return compiledTemplates[format] = new Function("date", funcString);
      }

      var ftDateFormat2 = {
        toDate: function toDate(date) {
          date = date instanceof Date ? date : new Date(date);

          if (date.toString() !== "Invalid Date") {
            return date;
          }
        },
        asTodayOrYesterdayOrNothing: function asTodayOrYesterdayOrNothing(date) {
          if (!date) {
            return;
          }

          var now2 = new Date();
          var interval2 = ftDateFormat2.getSecondsBetween(now2, date);
          var dateString;

          if (ftDateFormat2.isToday(date, now2, interval2)) {
            dateString = "today";
          } else if (ftDateFormat2.isYesterday(date, now2, interval2)) {
            dateString = "yesterday";
          } else {
            dateString = "";
          }

          return dateString;
        },
        format: function format(date, dateFormat) {
          dateFormat = dateFormat || "datetime";
          var tpl = compiledTemplates[dateFormat] || compile(dateFormat);
          date = ftDateFormat2.toDate(date);
          return date && tpl(date);
        },
        timeAgo: function timeAgo(date, interval2, options) {
          date = ftDateFormat2.toDate(date);

          if (!date) {
            return;
          }

          if (arguments.length === 2 && _typeof(interval2) === "object") {
            options = interval2;
            interval2 = options.interval;
          }

          if (!interval2) {
            interval2 = ftDateFormat2.getSecondsBetween(new Date(), date);
          }

          if (options && options.limit > 0 && (!interval2 || interval2 > options.limit)) {
            return "";
          }

          var abbreviated = options ? options.abbreviated : false;
          var suffix = interval2 < 0 ? "from now" : "ago";
          interval2 = Math.abs(interval2);

          if (interval2 < inSeconds.minute) {
            return "".concat(abbreviated ? interval2 + "s" : interval2 + " seconds", " ").concat(suffix);
          } else if (interval2 < 1.5 * inSeconds.minute) {
            return "".concat(abbreviated ? "1m" : "a minute", " ").concat(suffix);
          } else if (interval2 < 59 * inSeconds.minute) {
            return "".concat(Math.round(interval2 / inSeconds.minute)).concat(abbreviated ? "m" : " minutes", " ").concat(suffix);
          } else if (interval2 < 1.5 * inSeconds.hour) {
            return "".concat(abbreviated ? "1h" : "an hour", " ").concat(suffix);
          } else if (interval2 < 22 * inSeconds.hour) {
            return "".concat(Math.round(interval2 / inSeconds.hour)).concat(abbreviated ? "h" : " hours", " ").concat(suffix);
          } else if (interval2 < 1.5 * inSeconds.day) {
            return "".concat(abbreviated ? "1d" : "a day", " ").concat(suffix);
          } else if (interval2 < 25 * inSeconds.day) {
            return "".concat(Math.round(interval2 / inSeconds.day)).concat(abbreviated ? "d" : " days", " ").concat(suffix);
          } else if (interval2 < 45 * inSeconds.day) {
            return "".concat(abbreviated ? "1mth" : "a month", " ").concat(suffix);
          } else if (interval2 < 345 * inSeconds.day) {
            return "".concat(Math.round(interval2 / inSeconds.month)).concat(abbreviated ? "mth" : " months", " ").concat(suffix);
          } else if (interval2 < 547 * inSeconds.day) {
            return "".concat(abbreviated ? "1y" : "a year", " ").concat(suffix);
          } else {
            return "".concat(Math.max(2, Math.floor(interval2 / inSeconds.year))).concat(abbreviated ? "y" : " years", " ").concat(suffix);
          }
        },
        timeAgoNoSeconds: function timeAgoNoSeconds(date) {
          if (!date) {
            return;
          }

          var now2 = new Date();
          var interval2 = ftDateFormat2.getSecondsBetween(now2, date);

          if (interval2 < 60) {
            return "Less than a minute ago";
          }

          return ftDateFormat2.timeAgo(date);
        },
        ftTime: function ftTime(dateObj) {
          var now2 = new Date();
          var interval2 = ftDateFormat2.getSecondsBetween(now2, dateObj);
          var dateString;

          if (ftDateFormat2.isNearFuture(interval2)) {
            dateString = "just now";
          } else if (ftDateFormat2.isFarFuture(interval2)) {
            dateString = ftDateFormat2.format(dateObj, "date");
          } else if (ftDateFormat2.isToday(dateObj, now2, interval2) || interval2 < 4 * inSeconds.hour) {
            dateString = ftDateFormat2.timeAgo(dateObj, interval2);
          } else if (ftDateFormat2.isYesterday(dateObj, now2, interval2)) {
            dateString = "yesterday";
          } else {
            dateString = ftDateFormat2.format(dateObj, "date");
          }

          return dateString;
        },
        getSecondsBetween: function getSecondsBetween(time, otherTime) {
          return Math.round((time - otherTime) / 1e3);
        },
        isNearFuture: function isNearFuture(interval2) {
          return interval2 < 0 && interval2 > -(5 * inSeconds.minute);
        },
        isFarFuture: function isFarFuture(interval2) {
          return interval2 < -(5 * inSeconds.minute);
        },
        isToday: function isToday(date, now2, interval2) {
          var within24Hours = interval2 < inSeconds.day;
          var sameDayOfWeek = now2.getDay() === date.getDay();
          return within24Hours && sameDayOfWeek;
        },
        isYesterday: function isYesterday(date, now2, interval2) {
          var within48Hours = interval2 < 2 * inSeconds.day;
          var consecutiveDaysOfTheWeek = now2.getDay() === date.getDay() + 1;
          return within48Hours && consecutiveDaysOfTheWeek;
        },
        inSeconds: inSeconds
      };
      module.exports = ftDateFormat2;
    }
  }); // src/js/date.js


  var import_ft_date_format = __toModule(require_ft_date_format());

  var updateEventName = "update";
  var interval;

  function ftDateFormatWarning(methodName) {
    console.warn("The o-date method \"".concat(methodName, "\" is deprecated. Use the \"ft-date-format\" package instead or contact the Origami team for help: https://github.com/Financial-Times/ft-date-format"));
  }

  var ODate = /*#__PURE__*/function () {
    "use strict";

    function ODate(rootEl) {
      _classCallCheck(this, ODate);

      if (!rootEl) {
        console.warn("To initialise all o-date elements on the page use the `init` method. Passing no arguments to the constructor is deprecated.");
      }

      if (rootEl && !(rootEl instanceof HTMLElement)) {
        console.warn("Using the constructor to initialise one or more o-date elements with a query selector is deprecated. Pass a single o-date HTMLElement to initialise or use the `init` method.");
      }

      if (!rootEl) {
        rootEl = document.body;
      } else if (!(rootEl instanceof HTMLElement)) {
        rootEl = document.querySelector(rootEl);
      }

      if (rootEl.getAttribute("data-o-component") === "o-date") {
        this.el = rootEl;
      } else {
        this.el = rootEl.querySelector('[data-o-component~="o-date"]');
      }

      if (this.el) {
        document.body.addEventListener(updateEventName, this);
        this.update();
        this.el.setAttribute("data-o-date-js", "");
      }

      if (this.el && !interval) {
        interval = setInterval(function () {
          document.body.dispatchEvent(new CustomEvent(updateEventName));
        }, 6e4);
      }
    }

    _createClass(ODate, [{
      key: "handleEvent",
      value: function handleEvent(e) {
        if (e.type === updateEventName) {
          this.update();
        }
      }
    }, {
      key: "update",
      value: function update() {
        var el = this.el;
        var dateTime = el.getAttribute("datetime");
        var date = dateTime ? import_ft_date_format.default.toDate(dateTime) : null;

        if (!date && this.el.textContent === "") {
          date = new Date();
        }

        if (!date) {
          return;
        }

        var printers = el.querySelectorAll(".o-date__printer,[data-o-date-printer]");
        printers = printers.length ? printers : [el];

        var _iterator2 = _createForOfIteratorHelper(printers),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var printer = _step2.value;

            this._renderDateFor(printer, date);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (el.textContent) {
          el.setAttribute("title", import_ft_date_format.default.format(date, "datetime"));
          el.removeAttribute("aria-hidden");
        } else {
          el.setAttribute("aria-hidden", true);
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        document.body.removeEventListener(updateEventName, this);
        this.el = null;
      }
    }, {
      key: "_renderDateFor",
      value: function _renderDateFor(printer, date) {
        var format = printer.getAttribute("data-o-date-format") || this.el.getAttribute("data-o-date-format");
        var formattedDate;
        var screenReaderFormattedDate;

        if (format === "today-or-yesterday-or-nothing") {
          formattedDate = import_ft_date_format.default.asTodayOrYesterdayOrNothing(date);
        } else if (format === "date-only") {
          formattedDate = import_ft_date_format.default.format(date, "date");
        } else if (format === "time-ago-limit-4-hours") {
          formattedDate = import_ft_date_format.default.timeAgo(date, {
            limit: 4 * import_ft_date_format.default.inSeconds.hour
          });
        } else if (format === "time-ago-limit-24-hours") {
          formattedDate = import_ft_date_format.default.timeAgo(date, {
            limit: 24 * import_ft_date_format.default.inSeconds.hour
          });
        } else if (format === "time-ago-abbreviated") {
          formattedDate = import_ft_date_format.default.timeAgo(date, {
            abbreviated: true
          });
          screenReaderFormattedDate = import_ft_date_format.default.timeAgo(date);
        } else if (format === "time-ago-abbreviated-limit-4-hours") {
          formattedDate = import_ft_date_format.default.timeAgo(date, {
            abbreviated: true,
            limit: 4 * import_ft_date_format.default.inSeconds.hour
          });
          screenReaderFormattedDate = import_ft_date_format.default.timeAgo(date, {
            limit: 4 * import_ft_date_format.default.inSeconds.hour
          });
        } else if (format === "time-ago-no-seconds") {
          formattedDate = import_ft_date_format.default.timeAgoNoSeconds(date);
        } else if (format !== null) {
          formattedDate = import_ft_date_format.default.format(date, format);
        } else {
          formattedDate = import_ft_date_format.default.ftTime(date);
        }

        var hasSingleTextNode = printer.childNodes.length === 1 && printer.firstChild && printer.firstChild.nodeType === 3;

        if (hasSingleTextNode) {
          printer.firstChild.nodeValue = formattedDate;
        } else {
          printer.innerHTML = formattedDate;
        }

        if (formattedDate && screenReaderFormattedDate) {
          printer.setAttribute("aria-label", screenReaderFormattedDate);
        } else {
          printer.removeAttribute("aria-label");
        }
      }
    }], [{
      key: "init",
      value: function init(el) {
        if (!el) {
          el = document.body;
        }

        if (!(el instanceof HTMLElement)) {
          el = document.querySelector(el);
        }

        if (/\bo-date\b/.test(el.getAttribute("data-o-component"))) {
          return new ODate(el);
        }

        var dateEls = el.querySelectorAll('[data-o-component~="o-date"]');
        return [].map.call(dateEls, function (el2) {
          return new ODate(el2);
        });
      }
    }, {
      key: "toDate",
      value: function toDate() {
        var _import_ft_date_forma;

        ftDateFormatWarning("toDate");
        return (_import_ft_date_forma = import_ft_date_format.default).toDate.apply(_import_ft_date_forma, arguments);
      }
    }, {
      key: "format",
      value: function format() {
        var _import_ft_date_forma2;

        ftDateFormatWarning("format");
        return (_import_ft_date_forma2 = import_ft_date_format.default).format.apply(_import_ft_date_forma2, arguments);
      }
    }, {
      key: "getSecondsBetween",
      value: function getSecondsBetween() {
        var _import_ft_date_forma3;

        ftDateFormatWarning("getSecondsBetween");
        return (_import_ft_date_forma3 = import_ft_date_format.default).getSecondsBetween.apply(_import_ft_date_forma3, arguments);
      }
    }, {
      key: "ftTime",
      value: function ftTime() {
        var _import_ft_date_forma4;

        ftDateFormatWarning("ftTime");
        return (_import_ft_date_forma4 = import_ft_date_format.default).ftTime.apply(_import_ft_date_forma4, arguments);
      }
    }, {
      key: "isNearFuture",
      value: function isNearFuture() {
        var _import_ft_date_forma5;

        ftDateFormatWarning("isNearFuture");
        return (_import_ft_date_forma5 = import_ft_date_format.default).isNearFuture.apply(_import_ft_date_forma5, arguments);
      }
    }, {
      key: "isFarFuture",
      value: function isFarFuture() {
        var _import_ft_date_forma6;

        ftDateFormatWarning("isFarFuture");
        return (_import_ft_date_forma6 = import_ft_date_format.default).isFarFuture.apply(_import_ft_date_forma6, arguments);
      }
    }, {
      key: "isToday",
      value: function isToday() {
        var _import_ft_date_forma7;

        ftDateFormatWarning("isToday");
        return (_import_ft_date_forma7 = import_ft_date_format.default).isToday.apply(_import_ft_date_forma7, arguments);
      }
    }, {
      key: "isYesterday",
      value: function isYesterday() {
        var _import_ft_date_forma8;

        ftDateFormatWarning("isYesterday");
        return (_import_ft_date_forma8 = import_ft_date_format.default).isYesterday.apply(_import_ft_date_forma8, arguments);
      }
    }, {
      key: "timeAgo",
      value: function timeAgo() {
        var _import_ft_date_forma9;

        ftDateFormatWarning("timeAgo");
        return (_import_ft_date_forma9 = import_ft_date_format.default).timeAgo.apply(_import_ft_date_forma9, arguments);
      }
    }, {
      key: "asTodayOrYesterdayOrNothing",
      value: function asTodayOrYesterdayOrNothing() {
        var _import_ft_date_forma10;

        ftDateFormatWarning("asTodayOrYesterdayOrNothing");
        return (_import_ft_date_forma10 = import_ft_date_format.default).asTodayOrYesterdayOrNothing.apply(_import_ft_date_forma10, arguments);
      }
    }, {
      key: "timeAgoNoSeconds",
      value: function timeAgoNoSeconds() {
        var _import_ft_date_forma11;

        ftDateFormatWarning("timeAgoNoSeconds");
        return (_import_ft_date_forma11 = import_ft_date_format.default).timeAgoNoSeconds.apply(_import_ft_date_forma11, arguments);
      }
    }]);

    return ODate;
  }();

  var date_default = ODate; // main.js

  var constructAll = function constructAll() {
    date_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = date_default; // demos/src/imperative.js

  var times = document.querySelectorAll('[data-o-component="o-date"]');
  var now = new Date();
  var today = new Date();
  today.setHours(now.getHours() - 6);
  var lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 6);
  times[0].setAttribute("datetime", today.toISOString());
  times[1].setAttribute("datetime", new Date(today.getTime() - 1e3 * 60 * 60 * 20).toISOString());
  times[2].setAttribute("datetime", lastMonth.toISOString());
  main_default.init();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2Z0LWRhdGUtZm9ybWF0L2luZGV4LmpzIiwic3JjL2pzL2RhdGUuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2ltcGVyYXRpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxzQkFBQSxHQUFBLFVBQUEsQ0FBQTtBQUFBLGlFQUFBLHlEQUFBLE9BQUEsRUFBQSxNQUFBLEVBQUE7QUFBQSxVQUFNLE1BQUEsR0FBUyxPQUFPLHdGQUF3RixLQUF4RixDQUE4RixHQUE5RixFQUFtRyxJQUFuRyxDQUF3RyxLQUF4RyxDQUFQLEdBQXdILElBQXZJO0FBQ0EsVUFBTSxJQUFBLEdBQU8sT0FBTywyREFBMkQsS0FBM0QsQ0FBaUUsR0FBakUsRUFBc0UsSUFBdEUsQ0FBMkUsS0FBM0UsQ0FBUCxHQUEyRixJQUF4RztBQUNBLFVBQU0sT0FBQSxHQUFVO0FBQ2YsUUFBQSxRQUFBLEVBQVUsb0JBREs7QUFFZixRQUFBLElBQUEsRUFBTTtBQUZTLE9BQWhCO0FBS0EsVUFBTSxpQkFBQSxHQUFvQixFQUExQjtBQU9BLFVBQU0scUJBQUEsR0FBd0I7QUFDN0IsUUFBQSxJQUFBLEVBQU0seUJBRHVCO0FBRTdCLFFBQUEsR0FBQSxFQUFLLHFDQUZ3QjtBQUc3QixRQUFBLEVBQUEsRUFBSSw4QkFIeUI7QUFJN0IsUUFBQSxDQUFBLEVBQUcsdUJBSjBCO0FBSzdCLFFBQUEsSUFBQSxFQUFNLG9CQUx1QjtBQU03QixRQUFBLEVBQUEsRUFBSSx1Q0FOeUI7QUFPN0IsUUFBQSxJQUFBLEVBQU0scUJBUHVCO0FBUTdCLFFBQUEsR0FBQSxFQUFLLGlDQVJ3QjtBQVM3QixRQUFBLENBQUEsRUFBRyxnQkFUMEI7QUFVN0IsUUFBQSxFQUFBLEVBQUksc0JBVnlCO0FB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QkFBN0IsRUFBbUQsWUFBbkQ7QUFBbUQsR0FGcEQ7O0FBSUEsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELFlBQWhEO0FBQ0EsTUFBTyxZQUFBLEdBQVEsWUFBZixDOztBQ0pBLE1BQU0sS0FBQSxHQUFRLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQiw2QkFBMUIsQ0FBZDtBQUVBLE1BQU0sR0FBQSxHQUFNLElBQUksSUFBSixFQUFaO0FBQ0EsTUFBTSxLQUFBLEdBQVEsSUFBSSxJQUFKLEVBQWQ7QUFDQSxFQUFBLEtBQUEsQ0FBTSxRQUFOLENBQWUsR0FBQSxDQUFJLFFBQUosS0FBaUIsQ0FBaEM7QUFDQSxNQUFNLFNBQUEsR0FBWSxJQUFJLElBQUosRUFBbEI7QUFDQSxFQUFBLFNBQUEsQ0FBVSxRQUFWLENBQW1CLEdBQUEsQ0FBSSxRQUFKLEtBQWlCLENBQXBDO0FBRUEsRUFBQSxLQUFBLENBQU0sQ0FBTixDQUFBLENBQVMsWUFBVCxDQUFzQixVQUF0QixFQUFrQyxLQUFBLENBQU0sV0FBTixFQUFsQztBQUNBLEVBQUEsS0FBQSxDQUFNLENBQU4sQ0FBQSxDQUFTLFlBQVQsQ0FBc0IsVUFBdEIsRUFBa0MsSUFBSSxJQUFKLENBQVMsS0FBQSxDQUFNLE9BQU4sS0FBa0IsTUFBTyxFQUFQLEdBQVksRUFBWixHQUFpQixFQUE1QyxFQUFnRCxXQUFoRCxFQUFsQztBQUNBLEVBQUEsS0FBQSxDQUFNLENBQU4sQ0FBQSxDQUFTLFlBQVQsQ0FBc0IsVUFBdEIsRUFBa0MsU0FBQSxDQUFVLFdBQVYsRUFBbEM7QUFFQSxFQUFBLFlBQUEsQ0FBTSxJQUFOIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9udGhzID0gJ1tcIicgKyAnSmFudWFyeSxGZWJydWFyeSxNYXJjaCxBcHJpbCxNYXksSnVuZSxKdWx5LEF1Z3VzdCxTZXB0ZW1iZXIsT2N0b2JlcixOb3ZlbWJlcixEZWNlbWJlcicuc3BsaXQoJywnKS5qb2luKCdcIixcIicpICsgJ1wiXSc7XG5jb25zdCBkYXlzID0gJ1tcIicgKyAnU3VuZGF5LE1vbmRheSxUdWVzZGF5LFdlZG5lc2RheSxUaHVyc2RheSxGcmlkYXksU2F0dXJkYXknLnNwbGl0KCcsJykuam9pbignXCIsXCInKSArICdcIl0nO1xuY29uc3QgZm9ybWF0cyA9IHtcblx0ZGF0ZXRpbWU6ICdNTU1NIGQgeXl5eSBoOm1tIGEnLFxuXHRkYXRlOiAnTU1NTSBkIHl5eXknXG59O1xuXG5jb25zdCBjb21waWxlZFRlbXBsYXRlcyA9IHt9O1xuXG4vKipcbiAqIFNlZSBodHRwOi8vZG9jcy5vcmFjbGUuY29tL2phdmFzZS83L2RvY3MvYXBpL2phdmEvdGV4dC9TaW1wbGVEYXRlRm9ybWF0Lmh0bWwgZm9yIGZvcm1hdHRpbmcgY29udmVudGlvbnMgdXNlZFxuICpcbiAqQ29tbWVudHMgaW5kaWNhdGUgdGhlIHZhbHVlIHJldHVybmVkIGZvciAzLjA1IHBtIG9uIFR1ZXNkYXkgNHRoIEZlYnJ1YXJ5IDIwMTRcbiAqL1xuY29uc3QgZm9ybWF0UmVwbGFjZW1lbnRzTWFwID0ge1xuXHRNTU1NOiAnbW9udGhzW2RhdGUuZ2V0TW9udGgoKV0nLCAvLyBlLmcuIEZlYnJ1YXJ5XG5cdE1NTTogJ21vbnRoc1tkYXRlLmdldE1vbnRoKCldLnN1YnN0cigwLDMpJywgLy8gRmViXG5cdE1NOiAncGFkMihkYXRlLmdldE1vbnRoKCkgKyAxLCAyKScsIC8vIDAyXG5cdE06ICcoZGF0ZS5nZXRNb250aCgpICsgMSknLCAvLyAyXG5cdHl5eXk6ICdkYXRlLmdldEZ1bGxZZWFyKCknLCAvLyAyMDE0XG5cdHl5OiAnKFwiXCIrZGF0ZS5nZXRGdWxsWWVhcigpKS5zdWJzdHIoLTIsIDIpJywgLy8gMTRcblx0RUVFRTogJ2RheXNbZGF0ZS5nZXREYXkoKV0nLCAvLyBUdWVzZGF5XG5cdEVFRTogJ2RheXNbZGF0ZS5nZXREYXkoKV0uc3Vic3RyKDAsMyknLCAvLyBUdWVcblx0ZDogJ2RhdGUuZ2V0RGF0ZSgpJywgLy8gNFxuXHRkZDogJ3BhZDIoZGF0ZS5nZXREYXRlKCkpJywgLy8gMDRcblx0ZG86ICdvcmRpbmFsKGRhdGUuZ2V0RGF0ZSgpKScsIC8vIDR0aFxuXHRtOiAnZGF0ZS5nZXRNaW51dGVzKCknLCAvLyA1XG5cdG1tOiAncGFkMihkYXRlLmdldE1pbnV0ZXMoKSknLCAvLyAwNVxuXHRoOiAnKCgoZGF0ZS5nZXRIb3VycygpICsgMTEpICUgMTIpICsgMSknLCAvLyAzXG5cdGhoOiAncGFkMigoKGRhdGUuZ2V0SG91cnMoKSArIDExKSAlIDEyKSArIDEpJywgLy8gMDNcblx0SDogJ2RhdGUuZ2V0SG91cnMoKScsIC8vIDE1XG5cdEhIOiAncGFkMihkYXRlLmdldEhvdXJzKCkpJywgLy8gMTVcblx0YTogJyhkYXRlLmdldEhvdXJzKCkgPj0gMTIgPyBcInBtXCIgOiBcImFtXCIpJyAvLyBwbVxufTtcblxuY29uc3QgaW5TZWNvbmRzID0ge1xuXHRtaW51dGU6IDYwLFxuXHRob3VyOiA2MCAqIDYwLFxuXHRkYXk6IDI0ICogNjAgKiA2MCxcblx0d2VlazogNyAqIDI0ICogNjAgKiA2MCxcblx0bW9udGg6IDYwICogNjAgKiAyNCAqIDMwLFxuXHR5ZWFyOiAzNjUgKiAyNCAqIDYwICogNjBcbn07XG5cbmZ1bmN0aW9uIGNvbXBpbGUoZm9ybWF0KSB7XG5cdGNvbnN0IHRwbCA9IGZvcm1hdHNbZm9ybWF0XSB8fCBmb3JtYXQ7XG5cblx0bGV0IGZ1bmNTdHJpbmcgPSAndmFyIG1vbnRocz0gJyArIG1vbnRocyArICcsIGRheXM9ICcgKyBkYXlzICsgJzsnO1xuXHRmdW5jU3RyaW5nICs9ICdmdW5jdGlvbiBwYWQyIChudW1iZXIpIHtyZXR1cm4gKFwiMFwiICsgbnVtYmVyKS5zbGljZSgtMil9Jztcblx0ZnVuY1N0cmluZyArPSBgZnVuY3Rpb24gb3JkaW5hbChudW1iZXIpIHtcblx0XHRjb25zdCBzdWZmaXhlcyA9IFtcInRoXCIsIFwic3RcIiwgXCJuZFwiLCBcInJkXCJdO1xuXHRcdGNvbnN0IHYgPSBudW1iZXIgJSAxMDA7XG5cdFx0cmV0dXJuIG51bWJlciArIChzdWZmaXhlc1sodiAtIDIwKSAlIDEwXSB8fCBzdWZmaXhlc1t2XSB8fCBzdWZmaXhlc1swXSk7XG5cdH1gO1xuXHRmdW5jU3RyaW5nICs9ICdyZXR1cm4gXCInICsgdHBsLnJlcGxhY2UoL1xcXFw/W2Etel0rL2lnLCBmdW5jdGlvbiAobWF0Y2gpIHtcblx0XHRpZiAobWF0Y2guY2hhckF0KDApID09PSAnXFxcXCcpIHtcblx0XHRcdHJldHVybiBtYXRjaC5zdWJzdHIoMSk7XG5cdFx0fVxuXHRcdGNvbnN0IHJlcGxhY2VyID0gZm9ybWF0UmVwbGFjZW1lbnRzTWFwW21hdGNoXTtcblxuXHRcdHJldHVybiByZXBsYWNlciA/ICdcIiArICcgKyByZXBsYWNlciArICcgKyBcIicgOiBtYXRjaDtcblx0fSkgKyAnXCInO1xuXG5cdHJldHVybiAoY29tcGlsZWRUZW1wbGF0ZXNbZm9ybWF0XSA9IG5ldyBGdW5jdGlvbignZGF0ZScsIGZ1bmNTdHJpbmcpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xufVxuXG5jb25zdCBmdERhdGVGb3JtYXQgPSB7XG5cdHRvRGF0ZTogZnVuY3Rpb24gKGRhdGUpIHtcblx0XHRkYXRlID0gZGF0ZSBpbnN0YW5jZW9mIERhdGUgPyBkYXRlIDogbmV3IERhdGUoZGF0ZSk7XG5cdFx0aWYgKGRhdGUudG9TdHJpbmcoKSAhPT0gJ0ludmFsaWQgRGF0ZScpIHtcblx0XHRcdHJldHVybiBkYXRlO1xuXHRcdH1cblx0fSxcblx0YXNUb2RheU9yWWVzdGVyZGF5T3JOb3RoaW5nOiBmdW5jdGlvbiAoZGF0ZSkge1xuXG5cdFx0aWYgKCFkYXRlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblx0XHRjb25zdCBpbnRlcnZhbCA9IGZ0RGF0ZUZvcm1hdC5nZXRTZWNvbmRzQmV0d2Vlbihub3csIGRhdGUpO1xuXG5cdFx0bGV0IGRhdGVTdHJpbmc7XG5cblx0XHQvLyBJZiB0aGlzIHdhcyBsZXNzIHRoYW4gYSBkYXkgYWdvXG5cdFx0aWYgKGZ0RGF0ZUZvcm1hdC5pc1RvZGF5KGRhdGUsIG5vdywgaW50ZXJ2YWwpKSB7XG5cdFx0XHRkYXRlU3RyaW5nID0gJ3RvZGF5Jztcblx0XHR9IGVsc2UgaWYgKGZ0RGF0ZUZvcm1hdC5pc1llc3RlcmRheShkYXRlLCBub3csIGludGVydmFsKSkge1xuXHRcdFx0ZGF0ZVN0cmluZyA9ICd5ZXN0ZXJkYXknO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRlU3RyaW5nID0gJyc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRhdGVTdHJpbmc7XG5cdH0sXG5cdGZvcm1hdDogZnVuY3Rpb24gKGRhdGUsIGRhdGVGb3JtYXQpIHtcblx0XHRkYXRlRm9ybWF0ID0gZGF0ZUZvcm1hdCB8fCAnZGF0ZXRpbWUnO1xuXHRcdGNvbnN0IHRwbCA9IGNvbXBpbGVkVGVtcGxhdGVzW2RhdGVGb3JtYXRdIHx8IGNvbXBpbGUoZGF0ZUZvcm1hdCk7XG5cdFx0ZGF0ZSA9IGZ0RGF0ZUZvcm1hdC50b0RhdGUoZGF0ZSk7XG5cdFx0cmV0dXJuIGRhdGUgJiYgdHBsKGRhdGUpO1xuXHR9LFxuXHR0aW1lQWdvOiBmdW5jdGlvbiAoZGF0ZSwgaW50ZXJ2YWwsIG9wdGlvbnMpIHtcblxuXHRcdGRhdGUgPSBmdERhdGVGb3JtYXQudG9EYXRlKGRhdGUpO1xuXHRcdGlmICghZGF0ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEFjY2VwdCBhbiBpbnRlcnZhbCBhcmd1bWVudCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgaW50ZXJ2YWwgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRvcHRpb25zID0gaW50ZXJ2YWw7XG5cdFx0XHRpbnRlcnZhbCA9IG9wdGlvbnMuaW50ZXJ2YWw7XG5cdFx0fVxuXG5cdFx0Ly8gRGVmYXVsdCB0aGUgaW50ZXJ2YWwgb3B0aW9uIHRvIHRoZSB0aW1lIHNpbmNlIHRoZSBnaXZlbiBkYXRlXG5cdFx0aWYgKCFpbnRlcnZhbCkge1xuXHRcdFx0aW50ZXJ2YWwgPSBmdERhdGVGb3JtYXQuZ2V0U2Vjb25kc0JldHdlZW4obmV3IERhdGUoKSwgZGF0ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYSBsaW1pdCBoYXMgYmVlbiBzdXBwbGllZCBhbmQgdGhlIGludGVydmFsIGlzIGxvbmdlciBhZ28gdGhhbiB0aGF0IGxpbWl0XG5cdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5saW1pdCA+IDAgJiYgKCFpbnRlcnZhbCB8fCBpbnRlcnZhbCA+IG9wdGlvbnMubGltaXQpKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWJicmV2aWF0ZWQgPSBvcHRpb25zID8gb3B0aW9ucy5hYmJyZXZpYXRlZCA6IGZhbHNlO1xuXG5cdFx0bGV0IHN1ZmZpeCA9IGludGVydmFsIDwgMCA/IFwiZnJvbSBub3dcIiA6IFwiYWdvXCI7XG5cblx0XHRpbnRlcnZhbCA9IE1hdGguYWJzKGludGVydmFsKTtcblxuXHRcdGlmIChpbnRlcnZhbCA8IGluU2Vjb25kcy5taW51dGUpIHtcblx0XHRcdHJldHVybiBgJHthYmJyZXZpYXRlZCA/IGludGVydmFsICsgJ3MnIDogaW50ZXJ2YWwgKyAnIHNlY29uZHMnfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAoMS41ICogaW5TZWNvbmRzLm1pbnV0ZSkpIHtcblx0XHRcdHJldHVybiBgJHthYmJyZXZpYXRlZCA/ICcxbScgOiAnYSBtaW51dGUnfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAoNTkgKiBpblNlY29uZHMubWludXRlKSkge1xuXHRcdFx0cmV0dXJuIGAke01hdGgucm91bmQoaW50ZXJ2YWwgLyBpblNlY29uZHMubWludXRlKX0ke2FiYnJldmlhdGVkID8gJ20nIDogJyBtaW51dGVzJ30gJHtzdWZmaXh9YDtcblx0XHR9IGVsc2UgaWYgKGludGVydmFsIDwgKDEuNSAqIGluU2Vjb25kcy5ob3VyKSkge1xuXHRcdFx0cmV0dXJuIGAke2FiYnJldmlhdGVkID8gJzFoJyA6ICdhbiBob3VyJ30gJHtzdWZmaXh9YDtcblx0XHR9IGVsc2UgaWYgKGludGVydmFsIDwgMjIgKiBpblNlY29uZHMuaG91cikge1xuXHRcdFx0cmV0dXJuIGAke01hdGgucm91bmQoaW50ZXJ2YWwgLyBpblNlY29uZHMuaG91cil9JHthYmJyZXZpYXRlZCA/ICdoJyA6ICcgaG91cnMnfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAoMS41ICogaW5TZWNvbmRzLmRheSkpIHtcblx0XHRcdHJldHVybiBgJHthYmJyZXZpYXRlZCA/ICcxZCcgOiAnYSBkYXknfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAyNSAqIGluU2Vjb25kcy5kYXkpIHtcblx0XHRcdHJldHVybiBgJHtNYXRoLnJvdW5kKGludGVydmFsIC8gaW5TZWNvbmRzLmRheSl9JHthYmJyZXZpYXRlZCA/ICdkJyA6ICcgZGF5cyd9ICR7c3VmZml4fWA7XG5cdFx0fSBlbHNlIGlmIChpbnRlcnZhbCA8ICg0NSAqIGluU2Vjb25kcy5kYXkpKSB7XG5cdFx0XHRyZXR1cm4gYCR7YWJicmV2aWF0ZWQgPyAnMW10aCcgOiAnYSBtb250aCd9ICR7c3VmZml4fWA7XG5cdFx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDM0NSAqIGluU2Vjb25kcy5kYXkpIHtcblx0XHRcdHJldHVybiBgJHtNYXRoLnJvdW5kKGludGVydmFsIC8gaW5TZWNvbmRzLm1vbnRoKX0ke2FiYnJldmlhdGVkID8gJ210aCcgOiAnIG1vbnRocyd9ICR7c3VmZml4fWA7XG5cdFx0fSBlbHNlIGlmIChpbnRlcnZhbCA8ICg1NDcgKiBpblNlY29uZHMuZGF5KSkge1xuXHRcdFx0cmV0dXJuIGAke2FiYnJldmlhdGVkID8gJzF5JyA6ICdhIHllYXInfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gYCR7IE1hdGgubWF4KDIsIE1hdGguZmxvb3IoaW50ZXJ2YWwgLyBpblNlY29uZHMueWVhcikpfSR7YWJicmV2aWF0ZWQgPyAneScgOiAnIHllYXJzJ30gJHtzdWZmaXh9YDtcblx0XHR9XG5cdH0sXG5cdHRpbWVBZ29Ob1NlY29uZHM6IGZ1bmN0aW9uIChkYXRlKSB7XG5cblx0XHRpZiAoIWRhdGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IGludGVydmFsID0gZnREYXRlRm9ybWF0LmdldFNlY29uZHNCZXR3ZWVuKG5vdywgZGF0ZSk7XG5cblx0XHQvLyBJZiB0aGlzIHdhcyBsZXNzIHRoYW4gYSBtaW51dGUgYWdvXG5cdFx0aWYgKGludGVydmFsIDwgNjApIHtcblx0XHRcdHJldHVybiAnTGVzcyB0aGFuIGEgbWludXRlIGFnbyc7XG5cdFx0fVxuXHRcdHJldHVybiBmdERhdGVGb3JtYXQudGltZUFnbyhkYXRlKTtcblx0fSxcblx0ZnRUaW1lOiBmdW5jdGlvbiAoZGF0ZU9iaikge1xuXHRcdGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgaW50ZXJ2YWwgPSBmdERhdGVGb3JtYXQuZ2V0U2Vjb25kc0JldHdlZW4obm93LCBkYXRlT2JqKTtcblx0XHRsZXQgZGF0ZVN0cmluZztcblxuXHRcdC8vIElmIHRoZSBkYXRlIHdpbGwgb2NjdXIgaW4gdGhlIG5leHQgNSBtaW51dGVzLiBUaGlzIGNoZWNrIGlzIHRvIGFsbG93IGZvclxuXHRcdC8vIHJlYXNvbmFibHkgZGlmZmVyZW5jZXMgaW4gbWFjaGluZSBjbG9ja3MuXG5cdFx0aWYgKGZ0RGF0ZUZvcm1hdC5pc05lYXJGdXR1cmUoaW50ZXJ2YWwpKSB7XG5cdFx0XHRkYXRlU3RyaW5nID0gJ2p1c3Qgbm93JztcblxuXHRcdFx0Ly8gSWYgaXQncyBiZXlvbmQgNSBtaW51dGVzLCBmYWxsIGJhY2sgdG8gcHJpbnRpbmcgdGhlIHdob2xlIGRhdGUsIHRoZSBtYWNoaW5lXG5cdFx0XHQvLyBjbG9jayBjb3VsZCBiZSB3YXkgb3V0LlxuXHRcdH0gZWxzZSBpZiAoZnREYXRlRm9ybWF0LmlzRmFyRnV0dXJlKGludGVydmFsKSkge1xuXHRcdFx0ZGF0ZVN0cmluZyA9IGZ0RGF0ZUZvcm1hdC5mb3JtYXQoZGF0ZU9iaiwgJ2RhdGUnKTtcblxuXHRcdFx0Ly8gUmVsYXRpdmUgdGltZXMgZm9yIHRvZGF5IG9yIHdpdGhpbiB0aGUgbGFzdCA0IGhvdXJzXG5cdFx0fSBlbHNlIGlmIChmdERhdGVGb3JtYXQuaXNUb2RheShkYXRlT2JqLCBub3csIGludGVydmFsKSB8fCAoaW50ZXJ2YWwgPCAoNCAqIGluU2Vjb25kcy5ob3VyKSkpIHtcblx0XHRcdGRhdGVTdHJpbmcgPSBmdERhdGVGb3JtYXQudGltZUFnbyhkYXRlT2JqLCBpbnRlcnZhbCk7XG5cblx0XHRcdC8vICdZZXN0ZXJkYXknIGZvciBkYXRlcyB0aGF0IG9jY3VycmVkIHllc3RlcmRheVxuXHRcdH0gZWxzZSBpZiAoZnREYXRlRm9ybWF0LmlzWWVzdGVyZGF5KGRhdGVPYmosIG5vdywgaW50ZXJ2YWwpKSB7XG5cdFx0XHRkYXRlU3RyaW5nID0gJ3llc3RlcmRheSc7XG5cblx0XHRcdC8vIEVsc2UgcHJpbnQgdGhlIGRhdGVcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0ZVN0cmluZyA9IGZ0RGF0ZUZvcm1hdC5mb3JtYXQoZGF0ZU9iaiwgJ2RhdGUnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0ZVN0cmluZztcblx0fSxcblx0Z2V0U2Vjb25kc0JldHdlZW46IGZ1bmN0aW9uICh0aW1lLCBvdGhlclRpbWUpIHtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCgodGltZSAtIG90aGVyVGltZSkgLyAxMDAwKTtcblx0fSxcblx0aXNOZWFyRnV0dXJlOiBmdW5jdGlvbiAoaW50ZXJ2YWwpIHtcblx0XHQvLyBJZiB0aGUgaW50ZXJ2YWwgd2l0aGluIHRoZSBuZXh0IDUgbWludXRlc1xuXHRcdHJldHVybiAoaW50ZXJ2YWwgPCAwICYmIGludGVydmFsID4gLSg1ICogaW5TZWNvbmRzLm1pbnV0ZSkpO1xuXHR9LFxuXHRpc0ZhckZ1dHVyZTogZnVuY3Rpb24gKGludGVydmFsKSB7XG5cdFx0Ly8gSWYgdGhlIGludGVydmFsIGlzIGZ1cnRoZXIgaW4gdGhlIGZ1dHVyZSB0aGFuIDUgbWludXRlc1xuXHRcdHJldHVybiBpbnRlcnZhbCA8IC0oNSAqIGluU2Vjb25kcy5taW51dGUpO1xuXHR9LFxuXHRpc1RvZGF5OiBmdW5jdGlvbiAoZGF0ZSwgbm93LCBpbnRlcnZhbCkge1xuXHRcdGNvbnN0IHdpdGhpbjI0SG91cnMgPSBpbnRlcnZhbCA8IGluU2Vjb25kcy5kYXk7XG5cdFx0Y29uc3Qgc2FtZURheU9mV2VlayA9IG5vdy5nZXREYXkoKSA9PT0gZGF0ZS5nZXREYXkoKTtcblx0XHRyZXR1cm4gKHdpdGhpbjI0SG91cnMgJiYgc2FtZURheU9mV2Vlayk7XG5cdH0sXG5cdGlzWWVzdGVyZGF5OiBmdW5jdGlvbiAoZGF0ZSwgbm93LCBpbnRlcnZhbCkge1xuXHRcdGNvbnN0IHdpdGhpbjQ4SG91cnMgPSBpbnRlcnZhbCA8IDIgKiBpblNlY29uZHMuZGF5O1xuXHRcdGNvbnN0IGNvbnNlY3V0aXZlRGF5c09mVGhlV2VlayA9IG5vdy5nZXREYXkoKSA9PT0gZGF0ZS5nZXREYXkoKSArIDE7XG5cdFx0cmV0dXJuICh3aXRoaW40OEhvdXJzICYmIGNvbnNlY3V0aXZlRGF5c09mVGhlV2Vlayk7XG5cdH0sXG5cdGluU2Vjb25kc1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdERhdGVGb3JtYXQ7XG4iLCJpbXBvcnQgZnREYXRlRm9ybWF0IGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvZnQtZGF0ZS1mb3JtYXQnO1xuXG5jb25zdCB1cGRhdGVFdmVudE5hbWUgPSAndXBkYXRlJztcbmxldCBpbnRlcnZhbDtcblxuZnVuY3Rpb24gZnREYXRlRm9ybWF0V2FybmluZyhtZXRob2ROYW1lKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdGNvbnNvbGUud2FybihgVGhlIG8tZGF0ZSBtZXRob2QgXCIke21ldGhvZE5hbWV9XCIgaXMgZGVwcmVjYXRlZC4gVXNlIHRoZSBcImZ0LWRhdGUtZm9ybWF0XCIgcGFja2FnZSBpbnN0ZWFkIG9yIGNvbnRhY3QgdGhlIE9yaWdhbWkgdGVhbSBmb3IgaGVscDogaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdGApO1xufVxuXG4vKipcbiAqIEluaXRpYWxpc2UgdGhlIG8tZGF0ZSBjb21wb25lbnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gcm9vdEVsZW1lbnQgLSBUaGUgcm9vdCBlbGVtZW50IG9yIENTUyBzZWxlY3RvciB0byBpbml0aWFsaXNlXG4gKi9cbmNsYXNzIE9EYXRlIHtcblxuXHRjb25zdHJ1Y3Rvcihyb290RWwpIHtcblxuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS53YXJuKCdUbyBpbml0aWFsaXNlIGFsbCBvLWRhdGUgZWxlbWVudHMgb24gdGhlIHBhZ2UgdXNlICcgK1xuXHRcdFx0XHQndGhlIGBpbml0YCBtZXRob2QuIFBhc3Npbmcgbm8gYXJndW1lbnRzIHRvIHRoZSBjb25zdHJ1Y3RvciAnICtcblx0XHRcdFx0J2lzIGRlcHJlY2F0ZWQuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHJvb3RFbCAmJiAhKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRcdGNvbnNvbGUud2FybignVXNpbmcgdGhlIGNvbnN0cnVjdG9yIHRvIGluaXRpYWxpc2Ugb25lIG9yIG1vcmUgJyArXG5cdFx0XHRcdCdvLWRhdGUgZWxlbWVudHMgd2l0aCBhIHF1ZXJ5IHNlbGVjdG9yIGlzIGRlcHJlY2F0ZWQuICcgK1xuXHRcdFx0XHQnUGFzcyBhIHNpbmdsZSBvLWRhdGUgSFRNTEVsZW1lbnQgdG8gaW5pdGlhbGlzZSBvciB1c2UgdGhlICcgK1xuXHRcdFx0XHQnYGluaXRgIG1ldGhvZC4nKTtcblx0XHR9XG5cblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9IGVsc2UgaWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1jb21wb25lbnQnKSA9PT0gXCJvLWRhdGVcIikge1xuXHRcdFx0dGhpcy5lbCA9IHJvb3RFbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5lbCA9IHJvb3RFbC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vLWNvbXBvbmVudH49XCJvLWRhdGVcIl0nKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5lbCkge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKHVwZGF0ZUV2ZW50TmFtZSwgdGhpcyk7XG5cblx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0XHR0aGlzLmVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLWRhdGUtanMnLCAnJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZWwgJiYgIWludGVydmFsKSB7XG5cdFx0XHRpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCh1cGRhdGVFdmVudE5hbWUpKTtcblx0XHRcdH0sIDYwMDAwKTtcblx0XHR9XG5cdH1cblxuXHQvLyBVc2Ugb2JqZWN0LWxldmVsIGV2ZW50IGxpc3RlbmVyIG1ldGhvZCBzbyBhIG5ldyBmdW5jdGlvbiBkb2Vzbid0IG5lZWQgdG8gYmUgYm91bmQgZm9yIGVhY2ggaW5zdGFuY2Vcblx0aGFuZGxlRXZlbnQoZSkge1xuXHRcdGlmIChlLnR5cGUgPT09IHVwZGF0ZUV2ZW50TmFtZSkge1xuXHRcdFx0dGhpcy51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmUtcmVuZGVyIHRoZSBmb3JtYXR0ZWQgZGF0ZSB3aXRoaW4gdGhlIGB0aW1lYCBlbGVtZW50LlxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0dXBkYXRlKCkge1xuXHRcdGNvbnN0IGVsID0gdGhpcy5lbDtcblxuXHRcdC8vIEZpbmQgdGhlIGRhdGUgdG8gcmVuZGVyLlxuXHRcdC8vIFVzZSB0aGUgY3VycmVudCBkYXRlIGlmIHRoZSBgZGF0ZXRpbWVgIGF0dHJpYnV0ZSBpcyBub3Qgc2V0IGFuZFxuXHRcdC8vIHRoZSBvLWRhdGUgYHRpbWVgIGVsZW1lbnQgaGFzIG5vIHRleHQgY29udGVudC5cblx0XHRjb25zdCBkYXRlVGltZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0ZXRpbWUnKTtcblx0XHRsZXQgZGF0ZSA9IGRhdGVUaW1lID8gZnREYXRlRm9ybWF0LnRvRGF0ZShkYXRlVGltZSkgOiBudWxsO1xuXHRcdGlmICghZGF0ZSAmJiB0aGlzLmVsLnRleHRDb250ZW50ID09PSAnJykge1xuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCFkYXRlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRmluZCBlbGVtZW50cyB0byByZW5kZXIgZm9ybWF0dGVkIGRhdGVzIHRvLlxuXHRcdC8vIEBkZXByZWNhdGVkIC0gVGhlIGNsYXNzIGAuby1kYXRlX19wcmludGVyYCBpcyBkZXByZWNhdGVkLlxuXHRcdC8vIGAuby1kYXRlX19wcmludGVyYCBzaG91bGQgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvci5cblx0XHQvLyBVc2UgYFtkYXRhLW8tZGF0ZS1wcmludGVyXWAgaW5zdGVhZCBvZiBgLm8tZGF0ZV9fcHJpbnRlcmAuXG5cdFx0bGV0IHByaW50ZXJzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLm8tZGF0ZV9fcHJpbnRlcixbZGF0YS1vLWRhdGUtcHJpbnRlcl0nKTtcblx0XHRwcmludGVycyA9IHByaW50ZXJzLmxlbmd0aCA/IHByaW50ZXJzIDogW2VsXTtcblxuXHRcdC8vIFJlbmRlciB0aGUgZm91bmQgZGF0ZSBpbiBlYWNoIHByaW50ZXIgZWxlbWVudC5cblx0XHRmb3IgKGNvbnN0IHByaW50ZXIgb2YgcHJpbnRlcnMpIHtcblx0XHRcdHRoaXMuX3JlbmRlckRhdGVGb3IocHJpbnRlciwgZGF0ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgbm8gcHJpbnRlcnMgcmVzdWx0IGluIG91dHB1dCwgZS5nLiBiZWNhdXNlIHRoZSxcblx0XHQvLyBmb3JtYXQgY2hvc2VuIGRvZXMgbm90IG91dHB1dCB0aGUgdGltZSBhZnRlciB4IGhvdXJzLFxuXHRcdC8vIHRoZW4gaGlkZSB0aGUgYHRpbWVgIGVsZW1lbnQuXG5cdFx0aWYgKGVsLnRleHRDb250ZW50KSB7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgZnREYXRlRm9ybWF0LmZvcm1hdChkYXRlLCAnZGF0ZXRpbWUnKSk7XG5cdFx0XHRlbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIG8tZGF0ZSBmcm9tIHRoZSBgdGltZWAgZWxlbWVudCBpLmUuIHJlbW92ZSBldmVudFxuXHQgKiBsaXN0ZW5lcnMgYW5kIGRyb3AgcmVmZXJlbmNlcyB0byB0aGUgZWxlbWVudC5cblx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0ICovXG5cdGRlc3Ryb3koKSB7XG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKHVwZGF0ZUV2ZW50TmFtZSwgdGhpcyk7XG5cdFx0dGhpcy5lbCA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSB0aGUgby1kYXRlIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IGVsIC0gVGhlIHJvb3QgZWxlbWVudCBvciBDU1Mgc2VsZWN0b3IgdG8gaW5pdGlhbGlzZVxuXHQgKiBAcmV0dXJucyB7QXJyYXk8T0RhdGU+IHwgT0RhdGV9IC0gQW4gby1kYXRlIGluc3RhbmNlIG9yIGFycmF5IG9mIG8tZGF0ZSBpbnN0YW5jZXMuXG5cdCAqL1xuXHRzdGF0aWMgaW5pdCAoZWwpIHtcblx0XHRpZiAoIWVsKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuXHRcdH1cblx0XHQvKiBJZiBlbCdzIGRhdGEtby1jb21wb25lbnQgaGFzIFxcYm8tZGF0ZVxcYiBpbiBpdCwgaWUgaXQgaXMgaXRzZWxmIGEgZGF0ZSxcblx0XHQgcmV0dXJuIGEgbmV3IG8tZGF0ZSAqL1xuXHRcdGlmICgvXFxiby1kYXRlXFxiLy50ZXN0KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLWNvbXBvbmVudCcpKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBPRGF0ZShlbCk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgZWwgY29udGFpbnMgZGF0ZSBjb21wb25lbnRzLCByZXR1cm4gby1kYXRlc1xuXHRcdGNvbnN0IGRhdGVFbHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudH49XCJvLWRhdGVcIl0nKTtcblx0XHRyZXR1cm4gW10ubWFwLmNhbGwoZGF0ZUVscywgZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gbmV3IE9EYXRlKGVsKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW5kZXIgdGhlIGRhdGUgdG8gdGhlIFwicHJpbnRlclwiIGVsZW1lbnQgaW4gdGhlIHJlcXVlc3RlZCBmb3JtYXQuXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHByaW50ZXIgLSBUaGUgZWxlbWVudCB0byByZW5kZXIgdGhlIGRhdGUgaW5cblx0ICogQHBhcmFtIHtEYXRlfSBkYXRlIC0gVGhlIGRhdGUgdG8gZm9ybWF0XG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRfcmVuZGVyRGF0ZUZvcihwcmludGVyLCBkYXRlKSB7XG5cdFx0Ly8gVXNlIHRoZSBwcmludGVyIGBkYXRhLW8tZGF0ZS1mb3JtYXRgIGlmIGZvdW5kIG9yIGZhbGxiYWNrIHRvIHRoZVxuXHRcdC8vIHJvb3QgZWxlbWVudCBpZiBub3QgZm91bmQuXG5cdFx0Y29uc3QgZm9ybWF0ID0gcHJpbnRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1kYXRlLWZvcm1hdCcpIHx8XG5cdFx0XHR0aGlzLmVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLWRhdGUtZm9ybWF0Jyk7XG5cblx0XHRsZXQgZm9ybWF0dGVkRGF0ZTtcblx0XHRsZXQgc2NyZWVuUmVhZGVyRm9ybWF0dGVkRGF0ZTtcblxuXHRcdGlmIChmb3JtYXQgPT09ICd0b2RheS1vci15ZXN0ZXJkYXktb3Itbm90aGluZycpIHtcblx0XHRcdGZvcm1hdHRlZERhdGUgPSBmdERhdGVGb3JtYXQuYXNUb2RheU9yWWVzdGVyZGF5T3JOb3RoaW5nKGRhdGUpO1xuXHRcdH0gZWxzZSBpZiAoZm9ybWF0ID09PSAnZGF0ZS1vbmx5Jykge1xuXHRcdFx0Zm9ybWF0dGVkRGF0ZSA9IGZ0RGF0ZUZvcm1hdC5mb3JtYXQoZGF0ZSwgJ2RhdGUnKTtcblx0XHR9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ3RpbWUtYWdvLWxpbWl0LTQtaG91cnMnKSB7XG5cdFx0XHRmb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LnRpbWVBZ28oZGF0ZSwgeyBsaW1pdDogNCAqIGZ0RGF0ZUZvcm1hdC5pblNlY29uZHMuaG91ciB9KTtcblx0XHR9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ3RpbWUtYWdvLWxpbWl0LTI0LWhvdXJzJykge1xuXHRcdFx0Zm9ybWF0dGVkRGF0ZSA9IGZ0RGF0ZUZvcm1hdC50aW1lQWdvKGRhdGUsIHsgbGltaXQ6IDI0ICogZnREYXRlRm9ybWF0LmluU2Vjb25kcy5ob3VyIH0pO1xuXHRcdH0gZWxzZSBpZiAoZm9ybWF0ID09PSAndGltZS1hZ28tYWJicmV2aWF0ZWQnKSB7XG5cdFx0XHRmb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LnRpbWVBZ28oZGF0ZSwgeyBhYmJyZXZpYXRlZDogdHJ1ZSB9KTtcblx0XHRcdHNjcmVlblJlYWRlckZvcm1hdHRlZERhdGUgPSBmdERhdGVGb3JtYXQudGltZUFnbyhkYXRlKTtcblx0XHR9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ3RpbWUtYWdvLWFiYnJldmlhdGVkLWxpbWl0LTQtaG91cnMnKSB7XG5cdFx0XHRmb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LnRpbWVBZ28oZGF0ZSwgeyBhYmJyZXZpYXRlZDogdHJ1ZSwgbGltaXQ6IDQgKiBmdERhdGVGb3JtYXQuaW5TZWNvbmRzLmhvdXIgfSk7XG5cdFx0XHRzY3JlZW5SZWFkZXJGb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LnRpbWVBZ28oZGF0ZSwgeyBsaW1pdDogNCAqIGZ0RGF0ZUZvcm1hdC5pblNlY29uZHMuaG91ciB9KTtcblx0XHR9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ3RpbWUtYWdvLW5vLXNlY29uZHMnKSB7XG5cdFx0XHRmb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LnRpbWVBZ29Ob1NlY29uZHMoZGF0ZSk7XG5cdFx0fSBlbHNlIGlmIChmb3JtYXQgIT09IG51bGwpIHtcblx0XHRcdGZvcm1hdHRlZERhdGUgPSBmdERhdGVGb3JtYXQuZm9ybWF0KGRhdGUsIGZvcm1hdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvcm1hdHRlZERhdGUgPSBmdERhdGVGb3JtYXQuZnRUaW1lKGRhdGUpO1xuXHRcdH1cblxuXHRcdC8vIFRvIGF2b2lkIHRyaWdnZXJpbmcgYSBwYXJlbnQgbGl2ZSByZWdpb24gdW5uZWNlc3NhcmlseVxuXHRcdC8vIDxodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL28tZGF0ZS9wdWxsLzQzPlxuXHRcdGNvbnN0IGhhc1NpbmdsZVRleHROb2RlID0gcHJpbnRlci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJlxuXHRcdFx0cHJpbnRlci5maXJzdENoaWxkICYmXG5cdFx0XHRwcmludGVyLmZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IDM7XG5cblx0XHRpZiAoaGFzU2luZ2xlVGV4dE5vZGUpIHtcblx0XHRcdHByaW50ZXIuZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBmb3JtYXR0ZWREYXRlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcmludGVyLmlubmVySFRNTCA9IGZvcm1hdHRlZERhdGU7XG5cdFx0fVxuXG5cdFx0aWYgKGZvcm1hdHRlZERhdGUgJiYgc2NyZWVuUmVhZGVyRm9ybWF0dGVkRGF0ZSkge1xuXHRcdFx0cHJpbnRlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBzY3JlZW5SZWFkZXJGb3JtYXR0ZWREYXRlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJpbnRlci5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQGRlcHJlY2F0ZWQgVXNlIFtmdC1kYXRlLWZvcm1hdF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdH0gaW5zdGVhZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSAtIEEgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nLlxuXHQgKi9cblx0c3RhdGljIHRvRGF0ZSgpIHtcblx0XHRmdERhdGVGb3JtYXRXYXJuaW5nKCd0b0RhdGUnKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LnRvRGF0ZSguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyBmb3JtYXQoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnZm9ybWF0Jyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC5mb3JtYXQoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVwcmVjYXRlZCBVc2UgW2Z0LWRhdGUtZm9ybWF0XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2Z0LWRhdGUtZm9ybWF0fSBpbnN0ZWFkLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcuXG5cdCAqL1xuXHRzdGF0aWMgZ2V0U2Vjb25kc0JldHdlZW4oKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnZ2V0U2Vjb25kc0JldHdlZW4nKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LmdldFNlY29uZHNCZXR3ZWVuKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlcHJlY2F0ZWQgVXNlIFtmdC1kYXRlLWZvcm1hdF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdH0gaW5zdGVhZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSAtIEEgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nLlxuXHQgKi9cblx0c3RhdGljIGZ0VGltZSgpIHtcblx0XHRmdERhdGVGb3JtYXRXYXJuaW5nKCdmdFRpbWUnKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LmZ0VGltZSguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyBpc05lYXJGdXR1cmUoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnaXNOZWFyRnV0dXJlJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC5pc05lYXJGdXR1cmUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVwcmVjYXRlZCBVc2UgW2Z0LWRhdGUtZm9ybWF0XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2Z0LWRhdGUtZm9ybWF0fSBpbnN0ZWFkLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcuXG5cdCAqL1xuXHRzdGF0aWMgaXNGYXJGdXR1cmUoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnaXNGYXJGdXR1cmUnKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LmlzRmFyRnV0dXJlKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlcHJlY2F0ZWQgVXNlIFtmdC1kYXRlLWZvcm1hdF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdH0gaW5zdGVhZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSAtIEEgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nLlxuXHQgKi9cblx0c3RhdGljIGlzVG9kYXkoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnaXNUb2RheScpO1xuXHRcdHJldHVybiBmdERhdGVGb3JtYXQuaXNUb2RheSguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyBpc1llc3RlcmRheSgpIHtcblx0XHRmdERhdGVGb3JtYXRXYXJuaW5nKCdpc1llc3RlcmRheScpO1xuXHRcdHJldHVybiBmdERhdGVGb3JtYXQuaXNZZXN0ZXJkYXkoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVwcmVjYXRlZCBVc2UgW2Z0LWRhdGUtZm9ybWF0XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2Z0LWRhdGUtZm9ybWF0fSBpbnN0ZWFkLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcuXG5cdCAqL1xuXHRzdGF0aWMgdGltZUFnbygpIHtcblx0XHRmdERhdGVGb3JtYXRXYXJuaW5nKCd0aW1lQWdvJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC50aW1lQWdvKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlcHJlY2F0ZWQgVXNlIFtmdC1kYXRlLWZvcm1hdF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdH0gaW5zdGVhZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSAtIEEgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nLlxuXHQgKi9cblx0c3RhdGljIGFzVG9kYXlPclllc3RlcmRheU9yTm90aGluZygpIHtcblx0XHRmdERhdGVGb3JtYXRXYXJuaW5nKCdhc1RvZGF5T3JZZXN0ZXJkYXlPck5vdGhpbmcnKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LmFzVG9kYXlPclllc3RlcmRheU9yTm90aGluZyguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyB0aW1lQWdvTm9TZWNvbmRzKCkge1xuXHRcdGZ0RGF0ZUZvcm1hdFdhcm5pbmcoJ3RpbWVBZ29Ob1NlY29uZHMnKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LnRpbWVBZ29Ob1NlY29uZHMoLi4uYXJndW1lbnRzKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9EYXRlO1xuIiwiaW1wb3J0IG9EYXRlIGZyb20gJy4vc3JjL2pzL2RhdGUuanMnO1xuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24gKCkge1xuXHRvRGF0ZS5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbmV4cG9ydCBkZWZhdWx0IG9EYXRlO1xuIiwiaW1wb3J0IE9EYXRlIGZyb20gJy4uLy4uL21haW4uanMnO1xuXG5jb25zdCB0aW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1kYXRlXCJdJyk7XG5cbmNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5jb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG50b2RheS5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKSAtIDYpO1xuY29uc3QgbGFzdE1vbnRoID0gbmV3IERhdGUoKTtcbmxhc3RNb250aC5zZXRNb250aChub3cuZ2V0TW9udGgoKSAtIDYpO1xuXG50aW1lc1swXS5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgdG9kYXkudG9JU09TdHJpbmcoKSk7XG50aW1lc1sxXS5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgbmV3IERhdGUodG9kYXkuZ2V0VGltZSgpIC0gMTAwMCAqIDYwICogNjAgKiAyMCkudG9JU09TdHJpbmcoKSk7XG50aW1lc1syXS5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgbGFzdE1vbnRoLnRvSVNPU3RyaW5nKCkpO1xuXG5PRGF0ZS5pbml0KCk7XG4iXX0=