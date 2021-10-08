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
  var main_default = date_default; // demos/src/declarative.js

  var now = new Date();
  var today = new Date();
  var dates = document.querySelectorAll("time:not([datetime])");
  today.setHours(now.getHours() - 6);

  for (var i = 0; i < dates.length; i++) {
    dates[i].setAttribute("datetime", today.toISOString());
  }

  main_default.init();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2Z0LWRhdGUtZm9ybWF0L2luZGV4LmpzIiwic3JjL2pzL2RhdGUuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2RlY2xhcmF0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsc0JBQUEsR0FBQSxVQUFBLENBQUE7QUFBQSxpRUFBQSx5REFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBQUEsVUFBTSxNQUFBLEdBQVMsT0FBTyx3RkFBd0YsS0FBeEYsQ0FBOEYsR0FBOUYsRUFBbUcsSUFBbkcsQ0FBd0csS0FBeEcsQ0FBUCxHQUF3SCxJQUF2STtBQUNBLFVBQU0sSUFBQSxHQUFPLE9BQU8sMkRBQTJELEtBQTNELENBQWlFLEdBQWpFLEVBQXNFLElBQXRFLENBQTJFLEtBQTNFLENBQVAsR0FBMkYsSUFBeEc7QUFDQSxVQUFNLE9BQUEsR0FBVTtBQUNmLFFBQUEsUUFBQSxFQUFVLG9CQURLO0FBRWYsUUFBQSxJQUFBLEVBQU07QUFGUyxPQUFoQjtBQUtBLFVBQU0saUJBQUEsR0FBb0IsRUFBMUI7QUFPQSxVQUFNLHFCQUFBLEdBQXdCO0FBQzdCLFFBQUEsSUFBQSxFQUFNLHlCQUR1QjtBQUU3QixRQUFBLEdBQUEsRUFBSyxxQ0FGd0I7QUFHN0IsUUFBQSxFQUFBLEVBQUksOEJBSHlCO0FBSTdCLFFBQUEsQ0FBQSxFQUFHLHVCQUowQjtBQUs3QixRQUFBLElBQUEsRUFBTSxvQkFMdUI7QUFNN0IsUUFBQSxFQUFBLEVBQUksdUNBTnlCO0FBTzdCLFFBQUEsSUFBQSxFQUFNLHFCQVB1QjtBQVE3QixRQUFBLEdBQUEsRUFBSyxpQ0FSd0I7QUFTN0IsUUFBQSxDQUFBLEVBQUcsZ0JBVDBCO0FBVTdCLFFBQUEsRUFBQSxFQUFJLHNCQVZ5QjtB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b0JBQTdCLEVBQW1ELFlBQW5EO0FBQW1ELEdBRnBEOztBQUlBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxZQUFoRDtBQUNBLE1BQU8sWUFBQSxHQUFRLFlBQWYsQzs7QUNKQSxNQUFNLEdBQUEsR0FBTSxJQUFJLElBQUosRUFBWjtBQUNBLE1BQU0sS0FBQSxHQUFRLElBQUksSUFBSixFQUFkO0FBQ0EsTUFBTSxLQUFBLEdBQVEsUUFBQSxDQUFTLGdCQUFULENBQTBCLHNCQUExQixDQUFkO0FBQ0EsRUFBQSxLQUFBLENBQU0sUUFBTixDQUFlLEdBQUEsQ0FBSSxRQUFKLEtBQWlCLENBQWhDOztBQUVBLE9BQUEsSUFBUyxDQUFBLEdBQUksQ0FBYixFQUFnQixDQUFBLEdBQUksS0FBQSxDQUFNLE1BQTFCLEVBQWtDLENBQUEsRUFBbEMsRUFBdUM7QUFDdEMsSUFBQSxLQUFBLENBQU0sQ0FBTixDQUFBLENBQVMsWUFBVCxDQUFzQixVQUF0QixFQUFrQyxLQUFBLENBQU0sV0FBTixFQUFsQztBQUF3Qzs7QUFHekMsRUFBQSxZQUFBLENBQU0sSUFBTiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbnRocyA9ICdbXCInICsgJ0phbnVhcnksRmVicnVhcnksTWFyY2gsQXByaWwsTWF5LEp1bmUsSnVseSxBdWd1c3QsU2VwdGVtYmVyLE9jdG9iZXIsTm92ZW1iZXIsRGVjZW1iZXInLnNwbGl0KCcsJykuam9pbignXCIsXCInKSArICdcIl0nO1xuY29uc3QgZGF5cyA9ICdbXCInICsgJ1N1bmRheSxNb25kYXksVHVlc2RheSxXZWRuZXNkYXksVGh1cnNkYXksRnJpZGF5LFNhdHVyZGF5Jy5zcGxpdCgnLCcpLmpvaW4oJ1wiLFwiJykgKyAnXCJdJztcbmNvbnN0IGZvcm1hdHMgPSB7XG5cdGRhdGV0aW1lOiAnTU1NTSBkIHl5eXkgaDptbSBhJyxcblx0ZGF0ZTogJ01NTU0gZCB5eXl5J1xufTtcblxuY29uc3QgY29tcGlsZWRUZW1wbGF0ZXMgPSB7fTtcblxuLyoqXG4gKiBTZWUgaHR0cDovL2RvY3Mub3JhY2xlLmNvbS9qYXZhc2UvNy9kb2NzL2FwaS9qYXZhL3RleHQvU2ltcGxlRGF0ZUZvcm1hdC5odG1sIGZvciBmb3JtYXR0aW5nIGNvbnZlbnRpb25zIHVzZWRcbiAqXG4gKkNvbW1lbnRzIGluZGljYXRlIHRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgMy4wNSBwbSBvbiBUdWVzZGF5IDR0aCBGZWJydWFyeSAyMDE0XG4gKi9cbmNvbnN0IGZvcm1hdFJlcGxhY2VtZW50c01hcCA9IHtcblx0TU1NTTogJ21vbnRoc1tkYXRlLmdldE1vbnRoKCldJywgLy8gZS5nLiBGZWJydWFyeVxuXHRNTU06ICdtb250aHNbZGF0ZS5nZXRNb250aCgpXS5zdWJzdHIoMCwzKScsIC8vIEZlYlxuXHRNTTogJ3BhZDIoZGF0ZS5nZXRNb250aCgpICsgMSwgMiknLCAvLyAwMlxuXHRNOiAnKGRhdGUuZ2V0TW9udGgoKSArIDEpJywgLy8gMlxuXHR5eXl5OiAnZGF0ZS5nZXRGdWxsWWVhcigpJywgLy8gMjAxNFxuXHR5eTogJyhcIlwiK2RhdGUuZ2V0RnVsbFllYXIoKSkuc3Vic3RyKC0yLCAyKScsIC8vIDE0XG5cdEVFRUU6ICdkYXlzW2RhdGUuZ2V0RGF5KCldJywgLy8gVHVlc2RheVxuXHRFRUU6ICdkYXlzW2RhdGUuZ2V0RGF5KCldLnN1YnN0cigwLDMpJywgLy8gVHVlXG5cdGQ6ICdkYXRlLmdldERhdGUoKScsIC8vIDRcblx0ZGQ6ICdwYWQyKGRhdGUuZ2V0RGF0ZSgpKScsIC8vIDA0XG5cdGRvOiAnb3JkaW5hbChkYXRlLmdldERhdGUoKSknLCAvLyA0dGhcblx0bTogJ2RhdGUuZ2V0TWludXRlcygpJywgLy8gNVxuXHRtbTogJ3BhZDIoZGF0ZS5nZXRNaW51dGVzKCkpJywgLy8gMDVcblx0aDogJygoKGRhdGUuZ2V0SG91cnMoKSArIDExKSAlIDEyKSArIDEpJywgLy8gM1xuXHRoaDogJ3BhZDIoKChkYXRlLmdldEhvdXJzKCkgKyAxMSkgJSAxMikgKyAxKScsIC8vIDAzXG5cdEg6ICdkYXRlLmdldEhvdXJzKCknLCAvLyAxNVxuXHRISDogJ3BhZDIoZGF0ZS5nZXRIb3VycygpKScsIC8vIDE1XG5cdGE6ICcoZGF0ZS5nZXRIb3VycygpID49IDEyID8gXCJwbVwiIDogXCJhbVwiKScgLy8gcG1cbn07XG5cbmNvbnN0IGluU2Vjb25kcyA9IHtcblx0bWludXRlOiA2MCxcblx0aG91cjogNjAgKiA2MCxcblx0ZGF5OiAyNCAqIDYwICogNjAsXG5cdHdlZWs6IDcgKiAyNCAqIDYwICogNjAsXG5cdG1vbnRoOiA2MCAqIDYwICogMjQgKiAzMCxcblx0eWVhcjogMzY1ICogMjQgKiA2MCAqIDYwXG59O1xuXG5mdW5jdGlvbiBjb21waWxlKGZvcm1hdCkge1xuXHRjb25zdCB0cGwgPSBmb3JtYXRzW2Zvcm1hdF0gfHwgZm9ybWF0O1xuXG5cdGxldCBmdW5jU3RyaW5nID0gJ3ZhciBtb250aHM9ICcgKyBtb250aHMgKyAnLCBkYXlzPSAnICsgZGF5cyArICc7Jztcblx0ZnVuY1N0cmluZyArPSAnZnVuY3Rpb24gcGFkMiAobnVtYmVyKSB7cmV0dXJuIChcIjBcIiArIG51bWJlcikuc2xpY2UoLTIpfSc7XG5cdGZ1bmNTdHJpbmcgKz0gYGZ1bmN0aW9uIG9yZGluYWwobnVtYmVyKSB7XG5cdFx0Y29uc3Qgc3VmZml4ZXMgPSBbXCJ0aFwiLCBcInN0XCIsIFwibmRcIiwgXCJyZFwiXTtcblx0XHRjb25zdCB2ID0gbnVtYmVyICUgMTAwO1xuXHRcdHJldHVybiBudW1iZXIgKyAoc3VmZml4ZXNbKHYgLSAyMCkgJSAxMF0gfHwgc3VmZml4ZXNbdl0gfHwgc3VmZml4ZXNbMF0pO1xuXHR9YDtcblx0ZnVuY1N0cmluZyArPSAncmV0dXJuIFwiJyArIHRwbC5yZXBsYWNlKC9cXFxcP1thLXpdKy9pZywgZnVuY3Rpb24gKG1hdGNoKSB7XG5cdFx0aWYgKG1hdGNoLmNoYXJBdCgwKSA9PT0gJ1xcXFwnKSB7XG5cdFx0XHRyZXR1cm4gbWF0Y2guc3Vic3RyKDEpO1xuXHRcdH1cblx0XHRjb25zdCByZXBsYWNlciA9IGZvcm1hdFJlcGxhY2VtZW50c01hcFttYXRjaF07XG5cblx0XHRyZXR1cm4gcmVwbGFjZXIgPyAnXCIgKyAnICsgcmVwbGFjZXIgKyAnICsgXCInIDogbWF0Y2g7XG5cdH0pICsgJ1wiJztcblxuXHRyZXR1cm4gKGNvbXBpbGVkVGVtcGxhdGVzW2Zvcm1hdF0gPSBuZXcgRnVuY3Rpb24oJ2RhdGUnLCBmdW5jU3RyaW5nKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcbn1cblxuY29uc3QgZnREYXRlRm9ybWF0ID0ge1xuXHR0b0RhdGU6IGZ1bmN0aW9uIChkYXRlKSB7XG5cdFx0ZGF0ZSA9IGRhdGUgaW5zdGFuY2VvZiBEYXRlID8gZGF0ZSA6IG5ldyBEYXRlKGRhdGUpO1xuXHRcdGlmIChkYXRlLnRvU3RyaW5nKCkgIT09ICdJbnZhbGlkIERhdGUnKSB7XG5cdFx0XHRyZXR1cm4gZGF0ZTtcblx0XHR9XG5cdH0sXG5cdGFzVG9kYXlPclllc3RlcmRheU9yTm90aGluZzogZnVuY3Rpb24gKGRhdGUpIHtcblxuXHRcdGlmICghZGF0ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cdFx0Y29uc3QgaW50ZXJ2YWwgPSBmdERhdGVGb3JtYXQuZ2V0U2Vjb25kc0JldHdlZW4obm93LCBkYXRlKTtcblxuXHRcdGxldCBkYXRlU3RyaW5nO1xuXG5cdFx0Ly8gSWYgdGhpcyB3YXMgbGVzcyB0aGFuIGEgZGF5IGFnb1xuXHRcdGlmIChmdERhdGVGb3JtYXQuaXNUb2RheShkYXRlLCBub3csIGludGVydmFsKSkge1xuXHRcdFx0ZGF0ZVN0cmluZyA9ICd0b2RheSc7XG5cdFx0fSBlbHNlIGlmIChmdERhdGVGb3JtYXQuaXNZZXN0ZXJkYXkoZGF0ZSwgbm93LCBpbnRlcnZhbCkpIHtcblx0XHRcdGRhdGVTdHJpbmcgPSAneWVzdGVyZGF5Jztcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0ZVN0cmluZyA9ICcnO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRlU3RyaW5nO1xuXHR9LFxuXHRmb3JtYXQ6IGZ1bmN0aW9uIChkYXRlLCBkYXRlRm9ybWF0KSB7XG5cdFx0ZGF0ZUZvcm1hdCA9IGRhdGVGb3JtYXQgfHwgJ2RhdGV0aW1lJztcblx0XHRjb25zdCB0cGwgPSBjb21waWxlZFRlbXBsYXRlc1tkYXRlRm9ybWF0XSB8fCBjb21waWxlKGRhdGVGb3JtYXQpO1xuXHRcdGRhdGUgPSBmdERhdGVGb3JtYXQudG9EYXRlKGRhdGUpO1xuXHRcdHJldHVybiBkYXRlICYmIHRwbChkYXRlKTtcblx0fSxcblx0dGltZUFnbzogZnVuY3Rpb24gKGRhdGUsIGludGVydmFsLCBvcHRpb25zKSB7XG5cblx0XHRkYXRlID0gZnREYXRlRm9ybWF0LnRvRGF0ZShkYXRlKTtcblx0XHRpZiAoIWRhdGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBBY2NlcHQgYW4gaW50ZXJ2YWwgYXJndW1lbnQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGludGVydmFsID09PSAnb2JqZWN0Jykge1xuXHRcdFx0b3B0aW9ucyA9IGludGVydmFsO1xuXHRcdFx0aW50ZXJ2YWwgPSBvcHRpb25zLmludGVydmFsO1xuXHRcdH1cblxuXHRcdC8vIERlZmF1bHQgdGhlIGludGVydmFsIG9wdGlvbiB0byB0aGUgdGltZSBzaW5jZSB0aGUgZ2l2ZW4gZGF0ZVxuXHRcdGlmICghaW50ZXJ2YWwpIHtcblx0XHRcdGludGVydmFsID0gZnREYXRlRm9ybWF0LmdldFNlY29uZHNCZXR3ZWVuKG5ldyBEYXRlKCksIGRhdGUpO1xuXHRcdH1cblxuXHRcdC8vIElmIGEgbGltaXQgaGFzIGJlZW4gc3VwcGxpZWQgYW5kIHRoZSBpbnRlcnZhbCBpcyBsb25nZXIgYWdvIHRoYW4gdGhhdCBsaW1pdFxuXHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMubGltaXQgPiAwICYmICghaW50ZXJ2YWwgfHwgaW50ZXJ2YWwgPiBvcHRpb25zLmxpbWl0KSkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFiYnJldmlhdGVkID0gb3B0aW9ucyA/IG9wdGlvbnMuYWJicmV2aWF0ZWQgOiBmYWxzZTtcblxuXHRcdGxldCBzdWZmaXggPSBpbnRlcnZhbCA8IDAgPyBcImZyb20gbm93XCIgOiBcImFnb1wiO1xuXG5cdFx0aW50ZXJ2YWwgPSBNYXRoLmFicyhpbnRlcnZhbCk7XG5cblx0XHRpZiAoaW50ZXJ2YWwgPCBpblNlY29uZHMubWludXRlKSB7XG5cdFx0XHRyZXR1cm4gYCR7YWJicmV2aWF0ZWQgPyBpbnRlcnZhbCArICdzJyA6IGludGVydmFsICsgJyBzZWNvbmRzJ30gJHtzdWZmaXh9YDtcblx0XHR9IGVsc2UgaWYgKGludGVydmFsIDwgKDEuNSAqIGluU2Vjb25kcy5taW51dGUpKSB7XG5cdFx0XHRyZXR1cm4gYCR7YWJicmV2aWF0ZWQgPyAnMW0nIDogJ2EgbWludXRlJ30gJHtzdWZmaXh9YDtcblx0XHR9IGVsc2UgaWYgKGludGVydmFsIDwgKDU5ICogaW5TZWNvbmRzLm1pbnV0ZSkpIHtcblx0XHRcdHJldHVybiBgJHtNYXRoLnJvdW5kKGludGVydmFsIC8gaW5TZWNvbmRzLm1pbnV0ZSl9JHthYmJyZXZpYXRlZCA/ICdtJyA6ICcgbWludXRlcyd9ICR7c3VmZml4fWA7XG5cdFx0fSBlbHNlIGlmIChpbnRlcnZhbCA8ICgxLjUgKiBpblNlY29uZHMuaG91cikpIHtcblx0XHRcdHJldHVybiBgJHthYmJyZXZpYXRlZCA/ICcxaCcgOiAnYW4gaG91cid9ICR7c3VmZml4fWA7XG5cdFx0fSBlbHNlIGlmIChpbnRlcnZhbCA8IDIyICogaW5TZWNvbmRzLmhvdXIpIHtcblx0XHRcdHJldHVybiBgJHtNYXRoLnJvdW5kKGludGVydmFsIC8gaW5TZWNvbmRzLmhvdXIpfSR7YWJicmV2aWF0ZWQgPyAnaCcgOiAnIGhvdXJzJ30gJHtzdWZmaXh9YDtcblx0XHR9IGVsc2UgaWYgKGludGVydmFsIDwgKDEuNSAqIGluU2Vjb25kcy5kYXkpKSB7XG5cdFx0XHRyZXR1cm4gYCR7YWJicmV2aWF0ZWQgPyAnMWQnIDogJ2EgZGF5J30gJHtzdWZmaXh9YDtcblx0XHR9IGVsc2UgaWYgKGludGVydmFsIDwgMjUgKiBpblNlY29uZHMuZGF5KSB7XG5cdFx0XHRyZXR1cm4gYCR7TWF0aC5yb3VuZChpbnRlcnZhbCAvIGluU2Vjb25kcy5kYXkpfSR7YWJicmV2aWF0ZWQgPyAnZCcgOiAnIGRheXMnfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAoNDUgKiBpblNlY29uZHMuZGF5KSkge1xuXHRcdFx0cmV0dXJuIGAke2FiYnJldmlhdGVkID8gJzFtdGgnIDogJ2EgbW9udGgnfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAzNDUgKiBpblNlY29uZHMuZGF5KSB7XG5cdFx0XHRyZXR1cm4gYCR7TWF0aC5yb3VuZChpbnRlcnZhbCAvIGluU2Vjb25kcy5tb250aCl9JHthYmJyZXZpYXRlZCA/ICdtdGgnIDogJyBtb250aHMnfSAke3N1ZmZpeH1gO1xuXHRcdH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAoNTQ3ICogaW5TZWNvbmRzLmRheSkpIHtcblx0XHRcdHJldHVybiBgJHthYmJyZXZpYXRlZCA/ICcxeScgOiAnYSB5ZWFyJ30gJHtzdWZmaXh9YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGAkeyBNYXRoLm1heCgyLCBNYXRoLmZsb29yKGludGVydmFsIC8gaW5TZWNvbmRzLnllYXIpKX0ke2FiYnJldmlhdGVkID8gJ3knIDogJyB5ZWFycyd9ICR7c3VmZml4fWA7XG5cdFx0fVxuXHR9LFxuXHR0aW1lQWdvTm9TZWNvbmRzOiBmdW5jdGlvbiAoZGF0ZSkge1xuXG5cdFx0aWYgKCFkYXRlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblx0XHRjb25zdCBpbnRlcnZhbCA9IGZ0RGF0ZUZvcm1hdC5nZXRTZWNvbmRzQmV0d2Vlbihub3csIGRhdGUpO1xuXG5cdFx0Ly8gSWYgdGhpcyB3YXMgbGVzcyB0aGFuIGEgbWludXRlIGFnb1xuXHRcdGlmIChpbnRlcnZhbCA8IDYwKSB7XG5cdFx0XHRyZXR1cm4gJ0xlc3MgdGhhbiBhIG1pbnV0ZSBhZ28nO1xuXHRcdH1cblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LnRpbWVBZ28oZGF0ZSk7XG5cdH0sXG5cdGZ0VGltZTogZnVuY3Rpb24gKGRhdGVPYmopIHtcblx0XHRjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IGludGVydmFsID0gZnREYXRlRm9ybWF0LmdldFNlY29uZHNCZXR3ZWVuKG5vdywgZGF0ZU9iaik7XG5cdFx0bGV0IGRhdGVTdHJpbmc7XG5cblx0XHQvLyBJZiB0aGUgZGF0ZSB3aWxsIG9jY3VyIGluIHRoZSBuZXh0IDUgbWludXRlcy4gVGhpcyBjaGVjayBpcyB0byBhbGxvdyBmb3Jcblx0XHQvLyByZWFzb25hYmx5IGRpZmZlcmVuY2VzIGluIG1hY2hpbmUgY2xvY2tzLlxuXHRcdGlmIChmdERhdGVGb3JtYXQuaXNOZWFyRnV0dXJlKGludGVydmFsKSkge1xuXHRcdFx0ZGF0ZVN0cmluZyA9ICdqdXN0IG5vdyc7XG5cblx0XHRcdC8vIElmIGl0J3MgYmV5b25kIDUgbWludXRlcywgZmFsbCBiYWNrIHRvIHByaW50aW5nIHRoZSB3aG9sZSBkYXRlLCB0aGUgbWFjaGluZVxuXHRcdFx0Ly8gY2xvY2sgY291bGQgYmUgd2F5IG91dC5cblx0XHR9IGVsc2UgaWYgKGZ0RGF0ZUZvcm1hdC5pc0ZhckZ1dHVyZShpbnRlcnZhbCkpIHtcblx0XHRcdGRhdGVTdHJpbmcgPSBmdERhdGVGb3JtYXQuZm9ybWF0KGRhdGVPYmosICdkYXRlJyk7XG5cblx0XHRcdC8vIFJlbGF0aXZlIHRpbWVzIGZvciB0b2RheSBvciB3aXRoaW4gdGhlIGxhc3QgNCBob3Vyc1xuXHRcdH0gZWxzZSBpZiAoZnREYXRlRm9ybWF0LmlzVG9kYXkoZGF0ZU9iaiwgbm93LCBpbnRlcnZhbCkgfHwgKGludGVydmFsIDwgKDQgKiBpblNlY29uZHMuaG91cikpKSB7XG5cdFx0XHRkYXRlU3RyaW5nID0gZnREYXRlRm9ybWF0LnRpbWVBZ28oZGF0ZU9iaiwgaW50ZXJ2YWwpO1xuXG5cdFx0XHQvLyAnWWVzdGVyZGF5JyBmb3IgZGF0ZXMgdGhhdCBvY2N1cnJlZCB5ZXN0ZXJkYXlcblx0XHR9IGVsc2UgaWYgKGZ0RGF0ZUZvcm1hdC5pc1llc3RlcmRheShkYXRlT2JqLCBub3csIGludGVydmFsKSkge1xuXHRcdFx0ZGF0ZVN0cmluZyA9ICd5ZXN0ZXJkYXknO1xuXG5cdFx0XHQvLyBFbHNlIHByaW50IHRoZSBkYXRlXG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGVTdHJpbmcgPSBmdERhdGVGb3JtYXQuZm9ybWF0KGRhdGVPYmosICdkYXRlJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRhdGVTdHJpbmc7XG5cdH0sXG5cdGdldFNlY29uZHNCZXR3ZWVuOiBmdW5jdGlvbiAodGltZSwgb3RoZXJUaW1lKSB7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQoKHRpbWUgLSBvdGhlclRpbWUpIC8gMTAwMCk7XG5cdH0sXG5cdGlzTmVhckZ1dHVyZTogZnVuY3Rpb24gKGludGVydmFsKSB7XG5cdFx0Ly8gSWYgdGhlIGludGVydmFsIHdpdGhpbiB0aGUgbmV4dCA1IG1pbnV0ZXNcblx0XHRyZXR1cm4gKGludGVydmFsIDwgMCAmJiBpbnRlcnZhbCA+IC0oNSAqIGluU2Vjb25kcy5taW51dGUpKTtcblx0fSxcblx0aXNGYXJGdXR1cmU6IGZ1bmN0aW9uIChpbnRlcnZhbCkge1xuXHRcdC8vIElmIHRoZSBpbnRlcnZhbCBpcyBmdXJ0aGVyIGluIHRoZSBmdXR1cmUgdGhhbiA1IG1pbnV0ZXNcblx0XHRyZXR1cm4gaW50ZXJ2YWwgPCAtKDUgKiBpblNlY29uZHMubWludXRlKTtcblx0fSxcblx0aXNUb2RheTogZnVuY3Rpb24gKGRhdGUsIG5vdywgaW50ZXJ2YWwpIHtcblx0XHRjb25zdCB3aXRoaW4yNEhvdXJzID0gaW50ZXJ2YWwgPCBpblNlY29uZHMuZGF5O1xuXHRcdGNvbnN0IHNhbWVEYXlPZldlZWsgPSBub3cuZ2V0RGF5KCkgPT09IGRhdGUuZ2V0RGF5KCk7XG5cdFx0cmV0dXJuICh3aXRoaW4yNEhvdXJzICYmIHNhbWVEYXlPZldlZWspO1xuXHR9LFxuXHRpc1llc3RlcmRheTogZnVuY3Rpb24gKGRhdGUsIG5vdywgaW50ZXJ2YWwpIHtcblx0XHRjb25zdCB3aXRoaW40OEhvdXJzID0gaW50ZXJ2YWwgPCAyICogaW5TZWNvbmRzLmRheTtcblx0XHRjb25zdCBjb25zZWN1dGl2ZURheXNPZlRoZVdlZWsgPSBub3cuZ2V0RGF5KCkgPT09IGRhdGUuZ2V0RGF5KCkgKyAxO1xuXHRcdHJldHVybiAod2l0aGluNDhIb3VycyAmJiBjb25zZWN1dGl2ZURheXNPZlRoZVdlZWspO1xuXHR9LFxuXHRpblNlY29uZHNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnREYXRlRm9ybWF0O1xuIiwiaW1wb3J0IGZ0RGF0ZUZvcm1hdCBmcm9tICdAZmluYW5jaWFsLXRpbWVzL2Z0LWRhdGUtZm9ybWF0JztcblxuY29uc3QgdXBkYXRlRXZlbnROYW1lID0gJ3VwZGF0ZSc7XG5sZXQgaW50ZXJ2YWw7XG5cbmZ1bmN0aW9uIGZ0RGF0ZUZvcm1hdFdhcm5pbmcobWV0aG9kTmFtZSkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRjb25zb2xlLndhcm4oYFRoZSBvLWRhdGUgbWV0aG9kIFwiJHttZXRob2ROYW1lfVwiIGlzIGRlcHJlY2F0ZWQuIFVzZSB0aGUgXCJmdC1kYXRlLWZvcm1hdFwiIHBhY2thZ2UgaW5zdGVhZCBvciBjb250YWN0IHRoZSBPcmlnYW1pIHRlYW0gZm9yIGhlbHA6IGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXRgKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXNlIHRoZSBvLWRhdGUgY29tcG9uZW50LlxuICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IHJvb3RFbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCBvciBDU1Mgc2VsZWN0b3IgdG8gaW5pdGlhbGlzZVxuICovXG5jbGFzcyBPRGF0ZSB7XG5cblx0Y29uc3RydWN0b3Iocm9vdEVsKSB7XG5cblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblx0XHRcdGNvbnNvbGUud2FybignVG8gaW5pdGlhbGlzZSBhbGwgby1kYXRlIGVsZW1lbnRzIG9uIHRoZSBwYWdlIHVzZSAnICtcblx0XHRcdFx0J3RoZSBgaW5pdGAgbWV0aG9kLiBQYXNzaW5nIG5vIGFyZ3VtZW50cyB0byB0aGUgY29uc3RydWN0b3IgJyArXG5cdFx0XHRcdCdpcyBkZXByZWNhdGVkLicpO1xuXHRcdH1cblxuXHRcdGlmIChyb290RWwgJiYgIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0XHRjb25zb2xlLndhcm4oJ1VzaW5nIHRoZSBjb25zdHJ1Y3RvciB0byBpbml0aWFsaXNlIG9uZSBvciBtb3JlICcgK1xuXHRcdFx0XHQnby1kYXRlIGVsZW1lbnRzIHdpdGggYSBxdWVyeSBzZWxlY3RvciBpcyBkZXByZWNhdGVkLiAnICtcblx0XHRcdFx0J1Bhc3MgYSBzaW5nbGUgby1kYXRlIEhUTUxFbGVtZW50IHRvIGluaXRpYWxpc2Ugb3IgdXNlIHRoZSAnICtcblx0XHRcdFx0J2Bpbml0YCBtZXRob2QuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fSBlbHNlIGlmICghKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpO1xuXHRcdH1cblxuXHRcdGlmIChyb290RWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tY29tcG9uZW50JykgPT09IFwiby1kYXRlXCIpIHtcblx0XHRcdHRoaXMuZWwgPSByb290RWw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZWwgPSByb290RWwucXVlcnlTZWxlY3RvcignW2RhdGEtby1jb21wb25lbnR+PVwiby1kYXRlXCJdJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZWwpIHtcblx0XHRcdGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcih1cGRhdGVFdmVudE5hbWUsIHRoaXMpO1xuXG5cdFx0XHR0aGlzLnVwZGF0ZSgpO1xuXHRcdFx0dGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1kYXRlLWpzJywgJycpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmVsICYmICFpbnRlcnZhbCkge1xuXHRcdFx0aW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQodXBkYXRlRXZlbnROYW1lKSk7XG5cdFx0XHR9LCA2MDAwMCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gVXNlIG9iamVjdC1sZXZlbCBldmVudCBsaXN0ZW5lciBtZXRob2Qgc28gYSBuZXcgZnVuY3Rpb24gZG9lc24ndCBuZWVkIHRvIGJlIGJvdW5kIGZvciBlYWNoIGluc3RhbmNlXG5cdGhhbmRsZUV2ZW50KGUpIHtcblx0XHRpZiAoZS50eXBlID09PSB1cGRhdGVFdmVudE5hbWUpIHtcblx0XHRcdHRoaXMudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlLXJlbmRlciB0aGUgZm9ybWF0dGVkIGRhdGUgd2l0aGluIHRoZSBgdGltZWAgZWxlbWVudC5cblx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0ICovXG5cdHVwZGF0ZSgpIHtcblx0XHRjb25zdCBlbCA9IHRoaXMuZWw7XG5cblx0XHQvLyBGaW5kIHRoZSBkYXRlIHRvIHJlbmRlci5cblx0XHQvLyBVc2UgdGhlIGN1cnJlbnQgZGF0ZSBpZiB0aGUgYGRhdGV0aW1lYCBhdHRyaWJ1dGUgaXMgbm90IHNldCBhbmRcblx0XHQvLyB0aGUgby1kYXRlIGB0aW1lYCBlbGVtZW50IGhhcyBubyB0ZXh0IGNvbnRlbnQuXG5cdFx0Y29uc3QgZGF0ZVRpbWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJyk7XG5cdFx0bGV0IGRhdGUgPSBkYXRlVGltZSA/IGZ0RGF0ZUZvcm1hdC50b0RhdGUoZGF0ZVRpbWUpIDogbnVsbDtcblx0XHRpZiAoIWRhdGUgJiYgdGhpcy5lbC50ZXh0Q29udGVudCA9PT0gJycpIHtcblx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdH1cblxuXHRcdGlmICghZGF0ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEZpbmQgZWxlbWVudHMgdG8gcmVuZGVyIGZvcm1hdHRlZCBkYXRlcyB0by5cblx0XHQvLyBAZGVwcmVjYXRlZCAtIFRoZSBjbGFzcyBgLm8tZGF0ZV9fcHJpbnRlcmAgaXMgZGVwcmVjYXRlZC5cblx0XHQvLyBgLm8tZGF0ZV9fcHJpbnRlcmAgc2hvdWxkIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IuXG5cdFx0Ly8gVXNlIGBbZGF0YS1vLWRhdGUtcHJpbnRlcl1gIGluc3RlYWQgb2YgYC5vLWRhdGVfX3ByaW50ZXJgLlxuXHRcdGxldCBwcmludGVycyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5vLWRhdGVfX3ByaW50ZXIsW2RhdGEtby1kYXRlLXByaW50ZXJdJyk7XG5cdFx0cHJpbnRlcnMgPSBwcmludGVycy5sZW5ndGggPyBwcmludGVycyA6IFtlbF07XG5cblx0XHQvLyBSZW5kZXIgdGhlIGZvdW5kIGRhdGUgaW4gZWFjaCBwcmludGVyIGVsZW1lbnQuXG5cdFx0Zm9yIChjb25zdCBwcmludGVyIG9mIHByaW50ZXJzKSB7XG5cdFx0XHR0aGlzLl9yZW5kZXJEYXRlRm9yKHByaW50ZXIsIGRhdGUpO1xuXHRcdH1cblxuXHRcdC8vIElmIG5vIHByaW50ZXJzIHJlc3VsdCBpbiBvdXRwdXQsIGUuZy4gYmVjYXVzZSB0aGUsXG5cdFx0Ly8gZm9ybWF0IGNob3NlbiBkb2VzIG5vdCBvdXRwdXQgdGhlIHRpbWUgYWZ0ZXIgeCBob3Vycyxcblx0XHQvLyB0aGVuIGhpZGUgdGhlIGB0aW1lYCBlbGVtZW50LlxuXHRcdGlmIChlbC50ZXh0Q29udGVudCkge1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCd0aXRsZScsIGZ0RGF0ZUZvcm1hdC5mb3JtYXQoZGF0ZSwgJ2RhdGV0aW1lJykpO1xuXHRcdFx0ZWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBvLWRhdGUgZnJvbSB0aGUgYHRpbWVgIGVsZW1lbnQgaS5lLiByZW1vdmUgZXZlbnRcblx0ICogbGlzdGVuZXJzIGFuZCBkcm9wIHJlZmVyZW5jZXMgdG8gdGhlIGVsZW1lbnQuXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAqL1xuXHRkZXN0cm95KCkge1xuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcih1cGRhdGVFdmVudE5hbWUsIHRoaXMpO1xuXHRcdHRoaXMuZWwgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgdGhlIG8tZGF0ZSBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfSBlbCAtIFRoZSByb290IGVsZW1lbnQgb3IgQ1NTIHNlbGVjdG9yIHRvIGluaXRpYWxpc2Vcblx0ICogQHJldHVybnMge0FycmF5PE9EYXRlPiB8IE9EYXRlfSAtIEFuIG8tZGF0ZSBpbnN0YW5jZSBvciBhcnJheSBvZiBvLWRhdGUgaW5zdGFuY2VzLlxuXHQgKi9cblx0c3RhdGljIGluaXQgKGVsKSB7XG5cdFx0aWYgKCFlbCkge1xuXHRcdFx0ZWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShlbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcblx0XHR9XG5cdFx0LyogSWYgZWwncyBkYXRhLW8tY29tcG9uZW50IGhhcyBcXGJvLWRhdGVcXGIgaW4gaXQsIGllIGl0IGlzIGl0c2VsZiBhIGRhdGUsXG5cdFx0IHJldHVybiBhIG5ldyBvLWRhdGUgKi9cblx0XHRpZiAoL1xcYm8tZGF0ZVxcYi8udGVzdChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1jb21wb25lbnQnKSkpIHtcblx0XHRcdHJldHVybiBuZXcgT0RhdGUoZWwpO1xuXHRcdH1cblxuXHRcdC8vIElmIGVsIGNvbnRhaW5zIGRhdGUgY29tcG9uZW50cywgcmV0dXJuIG8tZGF0ZXNcblx0XHRjb25zdCBkYXRlRWxzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnR+PVwiby1kYXRlXCJdJyk7XG5cdFx0cmV0dXJuIFtdLm1hcC5jYWxsKGRhdGVFbHMsIGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIG5ldyBPRGF0ZShlbCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVyIHRoZSBkYXRlIHRvIHRoZSBcInByaW50ZXJcIiBlbGVtZW50IGluIHRoZSByZXF1ZXN0ZWQgZm9ybWF0LlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwcmludGVyIC0gVGhlIGVsZW1lbnQgdG8gcmVuZGVyIHRoZSBkYXRlIGluXG5cdCAqIEBwYXJhbSB7RGF0ZX0gZGF0ZSAtIFRoZSBkYXRlIHRvIGZvcm1hdFxuXHQgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuXHQgKi9cblx0X3JlbmRlckRhdGVGb3IocHJpbnRlciwgZGF0ZSkge1xuXHRcdC8vIFVzZSB0aGUgcHJpbnRlciBgZGF0YS1vLWRhdGUtZm9ybWF0YCBpZiBmb3VuZCBvciBmYWxsYmFjayB0byB0aGVcblx0XHQvLyByb290IGVsZW1lbnQgaWYgbm90IGZvdW5kLlxuXHRcdGNvbnN0IGZvcm1hdCA9IHByaW50ZXIuZ2V0QXR0cmlidXRlKCdkYXRhLW8tZGF0ZS1mb3JtYXQnKSB8fFxuXHRcdFx0dGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1kYXRlLWZvcm1hdCcpO1xuXG5cdFx0bGV0IGZvcm1hdHRlZERhdGU7XG5cdFx0bGV0IHNjcmVlblJlYWRlckZvcm1hdHRlZERhdGU7XG5cblx0XHRpZiAoZm9ybWF0ID09PSAndG9kYXktb3IteWVzdGVyZGF5LW9yLW5vdGhpbmcnKSB7XG5cdFx0XHRmb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LmFzVG9kYXlPclllc3RlcmRheU9yTm90aGluZyhkYXRlKTtcblx0XHR9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RhdGUtb25seScpIHtcblx0XHRcdGZvcm1hdHRlZERhdGUgPSBmdERhdGVGb3JtYXQuZm9ybWF0KGRhdGUsICdkYXRlJyk7XG5cdFx0fSBlbHNlIGlmIChmb3JtYXQgPT09ICd0aW1lLWFnby1saW1pdC00LWhvdXJzJykge1xuXHRcdFx0Zm9ybWF0dGVkRGF0ZSA9IGZ0RGF0ZUZvcm1hdC50aW1lQWdvKGRhdGUsIHsgbGltaXQ6IDQgKiBmdERhdGVGb3JtYXQuaW5TZWNvbmRzLmhvdXIgfSk7XG5cdFx0fSBlbHNlIGlmIChmb3JtYXQgPT09ICd0aW1lLWFnby1saW1pdC0yNC1ob3VycycpIHtcblx0XHRcdGZvcm1hdHRlZERhdGUgPSBmdERhdGVGb3JtYXQudGltZUFnbyhkYXRlLCB7IGxpbWl0OiAyNCAqIGZ0RGF0ZUZvcm1hdC5pblNlY29uZHMuaG91ciB9KTtcblx0XHR9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ3RpbWUtYWdvLWFiYnJldmlhdGVkJykge1xuXHRcdFx0Zm9ybWF0dGVkRGF0ZSA9IGZ0RGF0ZUZvcm1hdC50aW1lQWdvKGRhdGUsIHsgYWJicmV2aWF0ZWQ6IHRydWUgfSk7XG5cdFx0XHRzY3JlZW5SZWFkZXJGb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LnRpbWVBZ28oZGF0ZSk7XG5cdFx0fSBlbHNlIGlmIChmb3JtYXQgPT09ICd0aW1lLWFnby1hYmJyZXZpYXRlZC1saW1pdC00LWhvdXJzJykge1xuXHRcdFx0Zm9ybWF0dGVkRGF0ZSA9IGZ0RGF0ZUZvcm1hdC50aW1lQWdvKGRhdGUsIHsgYWJicmV2aWF0ZWQ6IHRydWUsIGxpbWl0OiA0ICogZnREYXRlRm9ybWF0LmluU2Vjb25kcy5ob3VyIH0pO1xuXHRcdFx0c2NyZWVuUmVhZGVyRm9ybWF0dGVkRGF0ZSA9IGZ0RGF0ZUZvcm1hdC50aW1lQWdvKGRhdGUsIHsgbGltaXQ6IDQgKiBmdERhdGVGb3JtYXQuaW5TZWNvbmRzLmhvdXIgfSk7XG5cdFx0fSBlbHNlIGlmIChmb3JtYXQgPT09ICd0aW1lLWFnby1uby1zZWNvbmRzJykge1xuXHRcdFx0Zm9ybWF0dGVkRGF0ZSA9IGZ0RGF0ZUZvcm1hdC50aW1lQWdvTm9TZWNvbmRzKGRhdGUpO1xuXHRcdH0gZWxzZSBpZiAoZm9ybWF0ICE9PSBudWxsKSB7XG5cdFx0XHRmb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LmZvcm1hdChkYXRlLCBmb3JtYXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3JtYXR0ZWREYXRlID0gZnREYXRlRm9ybWF0LmZ0VGltZShkYXRlKTtcblx0XHR9XG5cblx0XHQvLyBUbyBhdm9pZCB0cmlnZ2VyaW5nIGEgcGFyZW50IGxpdmUgcmVnaW9uIHVubmVjZXNzYXJpbHlcblx0XHQvLyA8aHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9vLWRhdGUvcHVsbC80Mz5cblx0XHRjb25zdCBoYXNTaW5nbGVUZXh0Tm9kZSA9IHByaW50ZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcblx0XHRcdHByaW50ZXIuZmlyc3RDaGlsZCAmJlxuXHRcdFx0cHJpbnRlci5maXJzdENoaWxkLm5vZGVUeXBlID09PSAzO1xuXG5cdFx0aWYgKGhhc1NpbmdsZVRleHROb2RlKSB7XG5cdFx0XHRwcmludGVyLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gZm9ybWF0dGVkRGF0ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJpbnRlci5pbm5lckhUTUwgPSBmb3JtYXR0ZWREYXRlO1xuXHRcdH1cblxuXHRcdGlmIChmb3JtYXR0ZWREYXRlICYmIHNjcmVlblJlYWRlckZvcm1hdHRlZERhdGUpIHtcblx0XHRcdHByaW50ZXIuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgc2NyZWVuUmVhZGVyRm9ybWF0dGVkRGF0ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByaW50ZXIucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWxhYmVsJyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyB0b0RhdGUoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygndG9EYXRlJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC50b0RhdGUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVwcmVjYXRlZCBVc2UgW2Z0LWRhdGUtZm9ybWF0XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2Z0LWRhdGUtZm9ybWF0fSBpbnN0ZWFkLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcuXG5cdCAqL1xuXHRzdGF0aWMgZm9ybWF0KCkge1xuXHRcdGZ0RGF0ZUZvcm1hdFdhcm5pbmcoJ2Zvcm1hdCcpO1xuXHRcdHJldHVybiBmdERhdGVGb3JtYXQuZm9ybWF0KC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlcHJlY2F0ZWQgVXNlIFtmdC1kYXRlLWZvcm1hdF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdH0gaW5zdGVhZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSAtIEEgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nLlxuXHQgKi9cblx0c3RhdGljIGdldFNlY29uZHNCZXR3ZWVuKCkge1xuXHRcdGZ0RGF0ZUZvcm1hdFdhcm5pbmcoJ2dldFNlY29uZHNCZXR3ZWVuJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC5nZXRTZWNvbmRzQmV0d2VlbiguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyBmdFRpbWUoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnZnRUaW1lJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC5mdFRpbWUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVwcmVjYXRlZCBVc2UgW2Z0LWRhdGUtZm9ybWF0XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2Z0LWRhdGUtZm9ybWF0fSBpbnN0ZWFkLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcuXG5cdCAqL1xuXHRzdGF0aWMgaXNOZWFyRnV0dXJlKCkge1xuXHRcdGZ0RGF0ZUZvcm1hdFdhcm5pbmcoJ2lzTmVhckZ1dHVyZScpO1xuXHRcdHJldHVybiBmdERhdGVGb3JtYXQuaXNOZWFyRnV0dXJlKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlcHJlY2F0ZWQgVXNlIFtmdC1kYXRlLWZvcm1hdF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdH0gaW5zdGVhZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSAtIEEgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nLlxuXHQgKi9cblx0c3RhdGljIGlzRmFyRnV0dXJlKCkge1xuXHRcdGZ0RGF0ZUZvcm1hdFdhcm5pbmcoJ2lzRmFyRnV0dXJlJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC5pc0ZhckZ1dHVyZSguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyBpc1RvZGF5KCkge1xuXHRcdGZ0RGF0ZUZvcm1hdFdhcm5pbmcoJ2lzVG9kYXknKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LmlzVG9kYXkoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVwcmVjYXRlZCBVc2UgW2Z0LWRhdGUtZm9ybWF0XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2Z0LWRhdGUtZm9ybWF0fSBpbnN0ZWFkLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcuXG5cdCAqL1xuXHRzdGF0aWMgaXNZZXN0ZXJkYXkoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnaXNZZXN0ZXJkYXknKTtcblx0XHRyZXR1cm4gZnREYXRlRm9ybWF0LmlzWWVzdGVyZGF5KC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlcHJlY2F0ZWQgVXNlIFtmdC1kYXRlLWZvcm1hdF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9mdC1kYXRlLWZvcm1hdH0gaW5zdGVhZC5cblx0ICogQHJldHVybiB7U3RyaW5nfSAtIEEgZm9ybWF0dGVkIGRhdGUgb3IgZW1wdHkgc3RyaW5nLlxuXHQgKi9cblx0c3RhdGljIHRpbWVBZ28oKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygndGltZUFnbycpO1xuXHRcdHJldHVybiBmdERhdGVGb3JtYXQudGltZUFnbyguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXByZWNhdGVkIFVzZSBbZnQtZGF0ZS1mb3JtYXRde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9GaW5hbmNpYWwtVGltZXMvZnQtZGF0ZS1mb3JtYXR9IGluc3RlYWQuXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gLSBBIGZvcm1hdHRlZCBkYXRlIG9yIGVtcHR5IHN0cmluZy5cblx0ICovXG5cdHN0YXRpYyBhc1RvZGF5T3JZZXN0ZXJkYXlPck5vdGhpbmcoKSB7XG5cdFx0ZnREYXRlRm9ybWF0V2FybmluZygnYXNUb2RheU9yWWVzdGVyZGF5T3JOb3RoaW5nJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC5hc1RvZGF5T3JZZXN0ZXJkYXlPck5vdGhpbmcoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVwcmVjYXRlZCBVc2UgW2Z0LWRhdGUtZm9ybWF0XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2Z0LWRhdGUtZm9ybWF0fSBpbnN0ZWFkLlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9IC0gQSBmb3JtYXR0ZWQgZGF0ZSBvciBlbXB0eSBzdHJpbmcuXG5cdCAqL1xuXHRzdGF0aWMgdGltZUFnb05vU2Vjb25kcygpIHtcblx0XHRmdERhdGVGb3JtYXRXYXJuaW5nKCd0aW1lQWdvTm9TZWNvbmRzJyk7XG5cdFx0cmV0dXJuIGZ0RGF0ZUZvcm1hdC50aW1lQWdvTm9TZWNvbmRzKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBPRGF0ZTtcbiIsImltcG9ydCBvRGF0ZSBmcm9tICcuL3NyYy9qcy9kYXRlLmpzJztcbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcblx0b0RhdGUuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5leHBvcnQgZGVmYXVsdCBvRGF0ZTtcbiIsImltcG9ydCBPRGF0ZSBmcm9tICcuLi8uLi9tYWluLmpzJztcblxuY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbmNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbmNvbnN0IGRhdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGltZTpub3QoW2RhdGV0aW1lXSknKTtcbnRvZGF5LnNldEhvdXJzKG5vdy5nZXRIb3VycygpIC0gNik7XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgZGF0ZXMubGVuZ3RoOyBpKyspIHtcblx0ZGF0ZXNbaV0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIHRvZGF5LnRvSVNPU3RyaW5nKCkpO1xufVxuXG5PRGF0ZS5pbml0KCk7XG4iXX0=