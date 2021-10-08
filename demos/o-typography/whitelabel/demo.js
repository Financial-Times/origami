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
  }; // ../../node_modules/fontfaceobserver/fontfaceobserver.standalone.js


  var require_fontfaceobserver_standalone = __commonJS({
    "../../node_modules/fontfaceobserver/fontfaceobserver.standalone.js": function node_modulesFontfaceobserverFontfaceobserverStandaloneJs(exports, module) {
      (function () {
        function l(a, b) {
          document.addEventListener ? a.addEventListener("scroll", b, false) : a.attachEvent("scroll", b);
        }

        function m(a) {
          document.body ? a() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function c() {
            document.removeEventListener("DOMContentLoaded", c);
            a();
          }) : document.attachEvent("onreadystatechange", function k() {
            if (document.readyState == "interactive" || document.readyState == "complete") document.detachEvent("onreadystatechange", k), a();
          });
        }

        ;

        function t(a) {
          this.a = document.createElement("div");
          this.a.setAttribute("aria-hidden", "true");
          this.a.appendChild(document.createTextNode(a));
          this.b = document.createElement("span");
          this.c = document.createElement("span");
          this.h = document.createElement("span");
          this.f = document.createElement("span");
          this.g = -1;
          this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
          this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
          this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
          this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";
          this.b.appendChild(this.h);
          this.c.appendChild(this.f);
          this.a.appendChild(this.b);
          this.a.appendChild(this.c);
        }

        function u(a, b) {
          a.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + b + ";";
        }

        function z(a) {
          var b = a.a.offsetWidth,
              c = b + 100;
          a.f.style.width = c + "px";
          a.c.scrollLeft = c;
          a.b.scrollLeft = a.b.scrollWidth + 100;
          return a.g !== b ? (a.g = b, true) : false;
        }

        function A(a, b) {
          function c() {
            var a2 = k;
            z(a2) && a2.a.parentNode && b(a2.g);
          }

          var k = a;
          l(a.b, c);
          l(a.c, c);
          z(a);
        }

        ;

        function B(a, b) {
          var c = b || {};
          this.family = a;
          this.style = c.style || "normal";
          this.weight = c.weight || "normal";
          this.stretch = c.stretch || "normal";
        }

        var C = null,
            D = null,
            E = null,
            F = null;

        function G() {
          if (D === null) if (J() && /Apple/.test(window.navigator.vendor)) {
            var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
            D = !!a && 603 > parseInt(a[1], 10);
          } else D = false;
          return D;
        }

        function J() {
          F === null && (F = !!document.fonts);
          return F;
        }

        function K() {
          if (E === null) {
            var a = document.createElement("div");

            try {
              a.style.font = "condensed 100px sans-serif";
            } catch (b) {}

            E = a.style.font !== "";
          }

          return E;
        }

        function L(a, b) {
          return [a.style, a.weight, K() ? a.stretch : "", "100px", b].join(" ");
        }

        B.prototype.load = function (a, b) {
          var c = this,
              k = a || "BESbswy",
              r = 0,
              n = b || 3e3,
              H = new Date().getTime();
          return new Promise(function (a2, b2) {
            if (J() && !G()) {
              var M = new Promise(function (a3, b3) {
                function e() {
                  new Date().getTime() - H >= n ? b3(Error("" + n + "ms timeout exceeded")) : document.fonts.load(L(c, '"' + c.family + '"'), k).then(function (c2) {
                    1 <= c2.length ? a3() : setTimeout(e, 25);
                  }, b3);
                }

                e();
              }),
                  N = new Promise(function (a3, c2) {
                r = setTimeout(function () {
                  c2(Error("" + n + "ms timeout exceeded"));
                }, n);
              });
              Promise.race([N, M]).then(function () {
                clearTimeout(r);
                a2(c);
              }, b2);
            } else m(function () {
              function v() {
                var b3;
                if (b3 = f != -1 && g != -1 || f != -1 && h != -1 || g != -1 && h != -1) (b3 = f != g && f != h && g != h) || (C === null && (b3 = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), C = !!b3 && (536 > parseInt(b3[1], 10) || parseInt(b3[1], 10) === 536 && 11 >= parseInt(b3[2], 10))), b3 = C && (f == w && g == w && h == w || f == x && g == x && h == x || f == y && g == y && h == y)), b3 = !b3;
                b3 && (d.parentNode && d.parentNode.removeChild(d), clearTimeout(r), a2(c));
              }

              function I() {
                if (new Date().getTime() - H >= n) d.parentNode && d.parentNode.removeChild(d), b2(Error("" + n + "ms timeout exceeded"));else {
                  var a3 = document.hidden;
                  if (a3 === true || a3 === void 0) f = e.a.offsetWidth, g = p.a.offsetWidth, h = q.a.offsetWidth, v();
                  r = setTimeout(I, 50);
                }
              }

              var e = new t(k),
                  p = new t(k),
                  q = new t(k),
                  f = -1,
                  g = -1,
                  h = -1,
                  w = -1,
                  x = -1,
                  y = -1,
                  d = document.createElement("div");
              d.dir = "ltr";
              u(e, L(c, "sans-serif"));
              u(p, L(c, "serif"));
              u(q, L(c, "monospace"));
              d.appendChild(e.a);
              d.appendChild(p.a);
              d.appendChild(q.a);
              document.body.appendChild(d);
              w = e.a.offsetWidth;
              x = p.a.offsetWidth;
              y = q.a.offsetWidth;
              I();
              A(e, function (a3) {
                f = a3;
                v();
              });
              u(e, L(c, '"' + c.family + '",sans-serif'));
              A(p, function (a3) {
                g = a3;
                v();
              });
              u(p, L(c, '"' + c.family + '",serif'));
              A(q, function (a3) {
                h = a3;
                v();
              });
              u(q, L(c, '"' + c.family + '",monospace'));
            });
          });
        };

        _typeof(module) === "object" ? module.exports = B : (window.FontFaceObserver = B, window.FontFaceObserver.prototype.load = B.prototype.load);
      })();
    }
  }); // src/js/typography.js


  var import_fontfaceobserver_standalone = __toModule(require_fontfaceobserver_standalone());

  var Typography = /*#__PURE__*/function () {
    "use strict";

    function Typography(typographyEl, opts) {
      _classCallCheck(this, Typography);

      this.typographyEl = typographyEl;
      this.fontLoadingPrefix = "o-typography--loading-";
      this.opts = opts || Typography.getOptions(typographyEl);

      if (typeof this.opts.loadOnInit === "undefined") {
        this.opts.loadOnInit = true;
      }

      if (typeof this.opts.rejectOnFontLoadFailure === "undefined") {
        this.opts.rejectOnFontLoadFailure = false;
      }

      this.opts = Typography.checkOptions(this.opts);
      this.hasRun = false;
      this.fontConfigs = [{
        family: "FinancierDisplayWeb",
        weight: "normal",
        label: "display"
      }, {
        family: "MetricWeb",
        weight: "normal",
        label: "sans"
      }, {
        family: "MetricWeb",
        weight: 600,
        label: "sans-bold"
      }, {
        family: "FinancierDisplayWeb",
        weight: 700,
        label: "display-bold"
      }];

      if (this.opts.loadOnInit) {
        this.loadFonts();
      }
    }

    _createClass(Typography, [{
      key: "checkFontsLoaded",
      value: function checkFontsLoaded() {
        return new RegExp("(^|s)".concat(this.opts.fontLoadedCookieName, "=1(;|$)")).test(document.cookie);
      }
    }, {
      key: "setCookie",
      value: function setCookie() {
        var domain = /.ft.com$/.test(location.hostname) ? ".ft.com" : location.hostname;
        document.cookie = "".concat(this.opts.fontLoadedCookieName, "=1;domain=").concat(domain, ";path=/;max-age=").concat(60 * 60 * 24 * 7);
      }
    }, {
      key: "removeLoadingClasses",
      value: function removeLoadingClasses() {
        var _this = this;

        this.fontConfigs.forEach(function (config) {
          _this.typographyEl.classList.remove("".concat(_this.fontLoadingPrefix).concat(config.label));
        });
      }
    }, {
      key: "loadFonts",
      value: function loadFonts() {
        var _this2 = this;

        if (this.hasRun) {
          return Promise.resolve();
        }

        if (this.checkFontsLoaded()) {
          this.removeLoadingClasses();
          this.setCookie();
          this.hasRun = true;
          return Promise.resolve();
        }

        var fontPromises = this.fontConfigs.map(function (fontConfig) {
          return new import_fontfaceobserver_standalone.default(fontConfig.family, {
            weight: fontConfig.weight
          }).load().then(function () {
            _this2.typographyEl.classList.remove("".concat(_this2.fontLoadingPrefix).concat(fontConfig.label));
          });
        });
        return Promise.all(fontPromises).then(function () {
          _this2.setCookie();

          _this2.hasRun = true;
        }).catch(function (error) {
          if (_this2.opts.rejectOnFontLoadFailure) {
            throw error;
          }
        });
      }
    }], [{
      key: "getOptions",
      value: function getOptions(typographyEl) {
        var dataset = Object(typographyEl.dataset);
        return Object.keys(dataset).reduce(function (col, key) {
          if (key === "oComponent") {
            return col;
          }

          var shortKey = key.replace(/^oTypography(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });

          try {
            col[shortKey] = JSON.parse(dataset[key].replace(/\'/g, '"'));
          } catch (e) {
            col[shortKey] = dataset[key];
          }

          return col;
        }, {});
      }
    }, {
      key: "checkOptions",
      value: function checkOptions(opts) {
        if (!opts.fontLoadedCookieName) {
          opts.fontLoadedCookieName = "o-typography-fonts-loaded";
        }

        return opts;
      }
    }, {
      key: "init",
      value: function init(rootEl, opts) {
        if (!rootEl) {
          rootEl = document.documentElement;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-typography]")) {
          return new Typography(rootEl, opts);
        }
      }
    }]);

    return Typography;
  }();

  var typography_default = Typography; // main.js

  var constructAll = function constructAll() {
    typography_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  function setWidths() {
    var selection = document.querySelector("#select-scale");

    if (selection) {
      var text = document.querySelector("p");
      selection.addEventListener("change", function () {
        text.classList = "";
        text.classList.add("line-width-demo__scale");
        text.classList.add("line-width-demo__scale--".concat(selection.value));
      });
    }
  }

  document.documentElement.setAttribute("data-o-component", "o-typography");

  function initDemos() {
    document.addEventListener("DOMContentLoaded", function () {
      document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
      setWidths();
    });
  }

  initDemos();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mb250ZmFjZW9ic2VydmVyL2ZvbnRmYWNlb2JzZXJ2ZXIuc3RhbmRhbG9uZS5qcyIsInNyYy9qcy90eXBvZ3JhcGh5LmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsbUNBQUEsR0FBQSxVQUFBLENBQUE7QUFBQSx3RUFBQSxvRUFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBQXNFLE9BQUEsWUFBVTtBQUFDLGlCQUFBLENBQUEsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlO0FBQUMsVUFBQSxRQUFBLENBQVMsZ0JBQVQsR0FBMEIsQ0FBQSxDQUFFLGdCQUFGLENBQW1CLFFBQW5CLEVBQTRCLENBQTVCLEVBQThCLEtBQTlCLENBQTFCLEdBQTRELENBQUEsQ0FBRSxXQUFGLENBQWMsUUFBZCxFQUF1QixDQUF2QixDQUE1RDtBQUFtRjs7QUFBRyxpQkFBQSxDQUFBLENBQVcsQ0FBWCxFQUFhO0FBQUMsVUFBQSxRQUFBLENBQVMsSUFBVCxHQUFjLENBQUEsRUFBZCxHQUFrQixRQUFBLENBQVMsZ0JBQVQsR0FBMEIsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE2QyxTQUFBLENBQUEsR0FBWTtBQUFDLFlBQUEsUUFBQSxDQUFTLG1CQUFULENBQTZCLGtCQUE3QixFQUFnRCxDQUFoRDtBQUFtRCxZQUFBLENBQUE7QUFBQSxXQUE3RyxDQUExQixHQUE2SSxRQUFBLENBQVMsV0FBVCxDQUFxQixvQkFBckIsRUFBMEMsU0FBQSxDQUFBLEdBQVk7QUFBQyxnQkFBa0IsUUFBQSxDQUFTLFVBQVQsSUFBZixhQUFlLElBQWlDLFFBQUEsQ0FBUyxVQUFULElBQVosVUFBdkMsRUFBdUUsUUFBQSxDQUFTLFdBQVQsQ0FB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QUFBLENBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQsTUFBQSxRQUFBLENBQVMsYUFBVCxDQUF1QixJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQ0EsTUFBQSxTQUFBO0FBQUEsS0FGRDtBQUVDOztBQUlGLEVBQUEsU0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qIEZvbnQgRmFjZSBPYnNlcnZlciB2Mi4xLjAgLSDCqSBCcmFtIFN0ZWluLiBMaWNlbnNlOiBCU0QtMy1DbGF1c2UgKi8oZnVuY3Rpb24oKXtmdW5jdGlvbiBsKGEsYil7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcj9hLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixiLCExKTphLmF0dGFjaEV2ZW50KFwic2Nyb2xsXCIsYil9ZnVuY3Rpb24gbShhKXtkb2N1bWVudC5ib2R5P2EoKTpkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyP2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24gYygpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsYyk7YSgpfSk6ZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIixmdW5jdGlvbiBrKCl7aWYoXCJpbnRlcmFjdGl2ZVwiPT1kb2N1bWVudC5yZWFkeVN0YXRlfHxcImNvbXBsZXRlXCI9PWRvY3VtZW50LnJlYWR5U3RhdGUpZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIixrKSxhKCl9KX07ZnVuY3Rpb24gdChhKXt0aGlzLmE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTt0aGlzLmEuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIixcInRydWVcIik7dGhpcy5hLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGEpKTt0aGlzLmI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7dGhpcy5jPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO3RoaXMuaD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTt0aGlzLmY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7dGhpcy5nPS0xO3RoaXMuYi5zdHlsZS5jc3NUZXh0PVwibWF4LXdpZHRoOm5vbmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzpzY3JvbGw7Zm9udC1zaXplOjE2cHg7XCI7dGhpcy5jLnN0eWxlLmNzc1RleHQ9XCJtYXgtd2lkdGg6bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO292ZXJmbG93OnNjcm9sbDtmb250LXNpemU6MTZweDtcIjtcbnRoaXMuZi5zdHlsZS5jc3NUZXh0PVwibWF4LXdpZHRoOm5vbmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzpzY3JvbGw7Zm9udC1zaXplOjE2cHg7XCI7dGhpcy5oLnN0eWxlLmNzc1RleHQ9XCJkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoyMDAlO2hlaWdodDoyMDAlO2ZvbnQtc2l6ZToxNnB4O21heC13aWR0aDpub25lO1wiO3RoaXMuYi5hcHBlbmRDaGlsZCh0aGlzLmgpO3RoaXMuYy5hcHBlbmRDaGlsZCh0aGlzLmYpO3RoaXMuYS5hcHBlbmRDaGlsZCh0aGlzLmIpO3RoaXMuYS5hcHBlbmRDaGlsZCh0aGlzLmMpfVxuZnVuY3Rpb24gdShhLGIpe2EuYS5zdHlsZS5jc3NUZXh0PVwibWF4LXdpZHRoOm5vbmU7bWluLXdpZHRoOjIwcHg7bWluLWhlaWdodDoyMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDphdXRvO21hcmdpbjowO3BhZGRpbmc6MDt0b3A6LTk5OXB4O3doaXRlLXNwYWNlOm5vd3JhcDtmb250LXN5bnRoZXNpczpub25lO2ZvbnQ6XCIrYitcIjtcIn1mdW5jdGlvbiB6KGEpe3ZhciBiPWEuYS5vZmZzZXRXaWR0aCxjPWIrMTAwO2EuZi5zdHlsZS53aWR0aD1jK1wicHhcIjthLmMuc2Nyb2xsTGVmdD1jO2EuYi5zY3JvbGxMZWZ0PWEuYi5zY3JvbGxXaWR0aCsxMDA7cmV0dXJuIGEuZyE9PWI/KGEuZz1iLCEwKTohMX1mdW5jdGlvbiBBKGEsYil7ZnVuY3Rpb24gYygpe3ZhciBhPWs7eihhKSYmYS5hLnBhcmVudE5vZGUmJmIoYS5nKX12YXIgaz1hO2woYS5iLGMpO2woYS5jLGMpO3ooYSl9O2Z1bmN0aW9uIEIoYSxiKXt2YXIgYz1ifHx7fTt0aGlzLmZhbWlseT1hO3RoaXMuc3R5bGU9Yy5zdHlsZXx8XCJub3JtYWxcIjt0aGlzLndlaWdodD1jLndlaWdodHx8XCJub3JtYWxcIjt0aGlzLnN0cmV0Y2g9Yy5zdHJldGNofHxcIm5vcm1hbFwifXZhciBDPW51bGwsRD1udWxsLEU9bnVsbCxGPW51bGw7ZnVuY3Rpb24gRygpe2lmKG51bGw9PT1EKWlmKEooKSYmL0FwcGxlLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudmVuZG9yKSl7dmFyIGE9L0FwcGxlV2ViS2l0XFwvKFswLTldKykoPzpcXC4oWzAtOV0rKSkoPzpcXC4oWzAtOV0rKSkvLmV4ZWMod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO0Q9ISFhJiY2MDM+cGFyc2VJbnQoYVsxXSwxMCl9ZWxzZSBEPSExO3JldHVybiBEfWZ1bmN0aW9uIEooKXtudWxsPT09RiYmKEY9ISFkb2N1bWVudC5mb250cyk7cmV0dXJuIEZ9XG5mdW5jdGlvbiBLKCl7aWYobnVsbD09PUUpe3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dHJ5e2Euc3R5bGUuZm9udD1cImNvbmRlbnNlZCAxMDBweCBzYW5zLXNlcmlmXCJ9Y2F0Y2goYil7fUU9XCJcIiE9PWEuc3R5bGUuZm9udH1yZXR1cm4gRX1mdW5jdGlvbiBMKGEsYil7cmV0dXJuW2Euc3R5bGUsYS53ZWlnaHQsSygpP2Euc3RyZXRjaDpcIlwiLFwiMTAwcHhcIixiXS5qb2luKFwiIFwiKX1cbkIucHJvdG90eXBlLmxvYWQ9ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLGs9YXx8XCJCRVNic3d5XCIscj0wLG49Ynx8M0UzLEg9KG5ldyBEYXRlKS5nZXRUaW1lKCk7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKGEsYil7aWYoSigpJiYhRygpKXt2YXIgTT1uZXcgUHJvbWlzZShmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGUoKXsobmV3IERhdGUpLmdldFRpbWUoKS1IPj1uP2IoRXJyb3IoXCJcIituK1wibXMgdGltZW91dCBleGNlZWRlZFwiKSk6ZG9jdW1lbnQuZm9udHMubG9hZChMKGMsJ1wiJytjLmZhbWlseSsnXCInKSxrKS50aGVuKGZ1bmN0aW9uKGMpezE8PWMubGVuZ3RoP2EoKTpzZXRUaW1lb3V0KGUsMjUpfSxiKX1lKCl9KSxOPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGEsYyl7cj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YyhFcnJvcihcIlwiK24rXCJtcyB0aW1lb3V0IGV4Y2VlZGVkXCIpKX0sbil9KTtQcm9taXNlLnJhY2UoW04sTV0pLnRoZW4oZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQocik7YShjKX0sXG5iKX1lbHNlIG0oZnVuY3Rpb24oKXtmdW5jdGlvbiB2KCl7dmFyIGI7aWYoYj0tMSE9ZiYmLTEhPWd8fC0xIT1mJiYtMSE9aHx8LTEhPWcmJi0xIT1oKShiPWYhPWcmJmYhPWgmJmchPWgpfHwobnVsbD09PUMmJihiPS9BcHBsZVdlYktpdFxcLyhbMC05XSspKD86XFwuKFswLTldKykpLy5leGVjKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSxDPSEhYiYmKDUzNj5wYXJzZUludChiWzFdLDEwKXx8NTM2PT09cGFyc2VJbnQoYlsxXSwxMCkmJjExPj1wYXJzZUludChiWzJdLDEwKSkpLGI9QyYmKGY9PXcmJmc9PXcmJmg9PXd8fGY9PXgmJmc9PXgmJmg9PXh8fGY9PXkmJmc9PXkmJmg9PXkpKSxiPSFiO2ImJihkLnBhcmVudE5vZGUmJmQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkKSxjbGVhclRpbWVvdXQociksYShjKSl9ZnVuY3Rpb24gSSgpe2lmKChuZXcgRGF0ZSkuZ2V0VGltZSgpLUg+PW4pZC5wYXJlbnROb2RlJiZkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZCksYihFcnJvcihcIlwiK1xubitcIm1zIHRpbWVvdXQgZXhjZWVkZWRcIikpO2Vsc2V7dmFyIGE9ZG9jdW1lbnQuaGlkZGVuO2lmKCEwPT09YXx8dm9pZCAwPT09YSlmPWUuYS5vZmZzZXRXaWR0aCxnPXAuYS5vZmZzZXRXaWR0aCxoPXEuYS5vZmZzZXRXaWR0aCx2KCk7cj1zZXRUaW1lb3V0KEksNTApfX12YXIgZT1uZXcgdChrKSxwPW5ldyB0KGspLHE9bmV3IHQoayksZj0tMSxnPS0xLGg9LTEsdz0tMSx4PS0xLHk9LTEsZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2QuZGlyPVwibHRyXCI7dShlLEwoYyxcInNhbnMtc2VyaWZcIikpO3UocCxMKGMsXCJzZXJpZlwiKSk7dShxLEwoYyxcIm1vbm9zcGFjZVwiKSk7ZC5hcHBlbmRDaGlsZChlLmEpO2QuYXBwZW5kQ2hpbGQocC5hKTtkLmFwcGVuZENoaWxkKHEuYSk7ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkKTt3PWUuYS5vZmZzZXRXaWR0aDt4PXAuYS5vZmZzZXRXaWR0aDt5PXEuYS5vZmZzZXRXaWR0aDtJKCk7QShlLGZ1bmN0aW9uKGEpe2Y9YTt2KCl9KTt1KGUsXG5MKGMsJ1wiJytjLmZhbWlseSsnXCIsc2Fucy1zZXJpZicpKTtBKHAsZnVuY3Rpb24oYSl7Zz1hO3YoKX0pO3UocCxMKGMsJ1wiJytjLmZhbWlseSsnXCIsc2VyaWYnKSk7QShxLGZ1bmN0aW9uKGEpe2g9YTt2KCl9KTt1KHEsTChjLCdcIicrYy5mYW1pbHkrJ1wiLG1vbm9zcGFjZScpKX0pfSl9O1wib2JqZWN0XCI9PT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPUI6KHdpbmRvdy5Gb250RmFjZU9ic2VydmVyPUIsd2luZG93LkZvbnRGYWNlT2JzZXJ2ZXIucHJvdG90eXBlLmxvYWQ9Qi5wcm90b3R5cGUubG9hZCk7fSgpKTtcbiIsImltcG9ydCBGb250RmFjZU9ic2VydmVyIGZyb20gJ2ZvbnRmYWNlb2JzZXJ2ZXIvZm9udGZhY2VvYnNlcnZlci5zdGFuZGFsb25lLmpzJztcblxuY2xhc3MgVHlwb2dyYXBoeSB7XG5cblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbdHlwb2dyYXBoeUVsXSAtIFRoZSByb290IGVsZW1lbnQgdG8gYXBwbHkgdHlwb2dyYXBoeSBjbGFzc2VzLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e2xvYWRPbkluaXQ6IHRydWUsIHJlamVjdE9uRm9udExvYWRGYWlsdXJlOiBmYWxzZSwgZm9udExvYWRlZENvb2tpZU5hbWU6ICdvLXR5cG9ncmFwaHktZm9udHMtbG9hZGVkJ31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIG8tdHlwb2dyYXBoeS5cblx0ICovXG5cdGNvbnN0cnVjdG9yICh0eXBvZ3JhcGh5RWwsIG9wdHMpIHtcblx0XHR0aGlzLnR5cG9ncmFwaHlFbCA9IHR5cG9ncmFwaHlFbDtcblxuXHRcdHRoaXMuZm9udExvYWRpbmdQcmVmaXggPSAnby10eXBvZ3JhcGh5LS1sb2FkaW5nLSc7XG5cblx0XHR0aGlzLm9wdHMgPSBvcHRzIHx8IFR5cG9ncmFwaHkuZ2V0T3B0aW9ucyh0eXBvZ3JhcGh5RWwpO1xuXHRcdGlmICh0eXBlb2YgdGhpcy5vcHRzLmxvYWRPbkluaXQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLm9wdHMubG9hZE9uSW5pdCA9IHRydWU7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdGhpcy5vcHRzLnJlamVjdE9uRm9udExvYWRGYWlsdXJlID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5vcHRzLnJlamVjdE9uRm9udExvYWRGYWlsdXJlID0gZmFsc2U7XG5cdFx0fVxuXHRcdHRoaXMub3B0cyA9IFR5cG9ncmFwaHkuY2hlY2tPcHRpb25zKHRoaXMub3B0cyk7XG5cdFx0dGhpcy5oYXNSdW4gPSBmYWxzZTtcblxuXHRcdHRoaXMuZm9udENvbmZpZ3MgPSBbXG5cdFx0XHR7XG5cdFx0XHRcdGZhbWlseTogJ0ZpbmFuY2llckRpc3BsYXlXZWInLFxuXHRcdFx0XHR3ZWlnaHQ6ICdub3JtYWwnLFxuXHRcdFx0XHRsYWJlbDogJ2Rpc3BsYXknXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmYW1pbHk6ICdNZXRyaWNXZWInLFxuXHRcdFx0XHR3ZWlnaHQ6ICdub3JtYWwnLFxuXHRcdFx0XHRsYWJlbDogJ3NhbnMnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmYW1pbHk6ICdNZXRyaWNXZWInLFxuXHRcdFx0XHR3ZWlnaHQ6IDYwMCxcblx0XHRcdFx0bGFiZWw6ICdzYW5zLWJvbGQnXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRmYW1pbHk6ICdGaW5hbmNpZXJEaXNwbGF5V2ViJyxcblx0XHRcdFx0d2VpZ2h0OiA3MDAsXG5cdFx0XHRcdGxhYmVsOiAnZGlzcGxheS1ib2xkJ1xuXHRcdFx0fVxuXHRcdF07XG5cdFx0aWYgKHRoaXMub3B0cy5sb2FkT25Jbml0KSB7XG5cdFx0XHR0aGlzLmxvYWRGb250cygpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSB0eXBvZ3JhcGh5RWwuIElmIHR5cG9ncmFwaHkgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb21cblx0ICogdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdHlwb2dyYXBoeUVsIC0gVGhlIHR5cG9ncmFwaHkgZWxlbWVudCBpbiB0aGUgRE9NIChSZXF1aXJlZClcblx0ICovXG5cdHN0YXRpYyBnZXRPcHRpb25zKHR5cG9ncmFwaHlFbCkge1xuXHRcdGNvbnN0IGRhdGFzZXQgPSBPYmplY3QodHlwb2dyYXBoeUVsLmRhdGFzZXQpO1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyhkYXRhc2V0KS5yZWR1Y2UoKGNvbCwga2V5KSA9PiB7IC8vIFBoYW50b20gZG9lc24ndCBsaWtlIE9iamVjdC5lbnRyaWVzIDpzb2I6XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIGNvbDsgLy8gQmFpbCBvbiBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKC9eb1R5cG9ncmFwaHkoXFx3KShcXHcrKSQvLCAobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTIpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb2xbc2hvcnRLZXldID0gSlNPTi5wYXJzZShkYXRhc2V0W2tleV0ucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Y29sW3Nob3J0S2V5XSA9IGRhdGFzZXRba2V5XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNvbDtcblx0XHR9LCB7fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgdGhlIG9wdGlvbnMgcGFzc2VkIGluIGFyZSB2YWxpZCwgb3RoZXJ3aXNlIHNldCBkZWZhdWx0c1xuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIEFuIE9iamVjdCB3aXRoIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdHlwb2dyYXBoeVxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IG9wdHNcblx0ICovXG5cdHN0YXRpYyBjaGVja09wdGlvbnMob3B0cykge1xuXG5cdFx0aWYgKCFvcHRzLmZvbnRMb2FkZWRDb29raWVOYW1lKSB7XG5cdFx0XHRvcHRzLmZvbnRMb2FkZWRDb29raWVOYW1lID0gJ28tdHlwb2dyYXBoeS1mb250cy1sb2FkZWQnO1xuXHRcdH1cblxuXHRcdHJldHVybiBvcHRzO1xuXHR9XG5cblx0Y2hlY2tGb250c0xvYWRlZCgpIHtcblx0XHRyZXR1cm4gbmV3IFJlZ0V4cChgKF58XFxzKSR7dGhpcy5vcHRzLmZvbnRMb2FkZWRDb29raWVOYW1lfT0xKDt8JClgKS50ZXN0KGRvY3VtZW50LmNvb2tpZSk7XG5cdH1cblxuXHRzZXRDb29raWUoKSB7XG5cdFx0Y29uc3QgZG9tYWluID0gLy5mdC5jb20kLy50ZXN0KGxvY2F0aW9uLmhvc3RuYW1lKSA/ICcuZnQuY29tJyA6IGxvY2F0aW9uLmhvc3RuYW1lO1xuXHRcdC8vIHNldCBjb29raWUgZm9yIGEgd2Vla1xuXHRcdC8vIFRPRE8gLSB1c2UgUlVNIHRvIHdvcmsgb3V0IHdoYXQgYSBnb29kIHZhbHVlIGZvciB0aGlzIHdvdWxkIGFjdHVhbGx5IGJlXG5cdFx0ZG9jdW1lbnQuY29va2llID0gYCR7dGhpcy5vcHRzLmZvbnRMb2FkZWRDb29raWVOYW1lfT0xO2RvbWFpbj0ke2RvbWFpbn07cGF0aD0vO21heC1hZ2U9JHs2MCAqIDYwICogMjQgKiA3fWA7XG5cdH1cblxuXHRyZW1vdmVMb2FkaW5nQ2xhc3NlcygpIHtcblx0XHR0aGlzLmZvbnRDb25maWdzLmZvckVhY2goKGNvbmZpZykgPT4ge1xuXHRcdFx0dGhpcy50eXBvZ3JhcGh5RWwuY2xhc3NMaXN0LnJlbW92ZShgJHt0aGlzLmZvbnRMb2FkaW5nUHJlZml4fSR7Y29uZmlnLmxhYmVsfWApO1xuXHRcdH0pO1xuXHR9XG5cblx0bG9hZEZvbnRzKCkge1xuXHRcdGlmICh0aGlzLmhhc1J1bikge1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5jaGVja0ZvbnRzTG9hZGVkKCkpIHtcblx0XHRcdHRoaXMucmVtb3ZlTG9hZGluZ0NsYXNzZXMoKTtcblx0XHRcdHRoaXMuc2V0Q29va2llKCk7XG5cdFx0XHR0aGlzLmhhc1J1biA9IHRydWU7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZm9udFByb21pc2VzID0gdGhpcy5mb250Q29uZmlncy5tYXAoZm9udENvbmZpZyA9PiB7XG5cdFx0XHRyZXR1cm4gbmV3IEZvbnRGYWNlT2JzZXJ2ZXIoZm9udENvbmZpZy5mYW1pbHksIHsgd2VpZ2h0OiBmb250Q29uZmlnLndlaWdodCB9KVxuXHRcdFx0XHQubG9hZCgpXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnR5cG9ncmFwaHlFbC5jbGFzc0xpc3QucmVtb3ZlKGAke3RoaXMuZm9udExvYWRpbmdQcmVmaXh9JHtmb250Q29uZmlnLmxhYmVsfWApO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBQcm9taXNlLmFsbChmb250UHJvbWlzZXMpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdC8vIHNldCB2YWx1ZSBpbiBjb29raWUgZm9yIHN1YnNlcXVlbnQgdmlzaXRzXG5cdFx0XHRcdHRoaXMuc2V0Q29va2llKCk7XG5cdFx0XHRcdHRoaXMuaGFzUnVuID0gdHJ1ZTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5vcHRzLnJlamVjdE9uRm9udExvYWRGYWlsdXJlKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2Ugby10eXBvZ3JhcGh5LlxuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxTdHJpbmcpfSByb290RWxlbWVudCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIG8tdHlwb2dyYXBoeSBvbiwgb3IgYSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSByb290IGVsZW1lbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyBvLXR5cG9ncmFwaHlcblx0ICovXG5cdHN0YXRpYyBpbml0IChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLXR5cG9ncmFwaHldJykpIHtcblx0XHRcdHJldHVybiBuZXcgVHlwb2dyYXBoeShyb290RWwsIG9wdHMpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUeXBvZ3JhcGh5O1xuIiwiaW1wb3J0IG9UeXBvZ3JhcGh5IGZyb20gJy4vc3JjL2pzL3R5cG9ncmFwaHkuanMnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbigpIHtcblx0b1R5cG9ncmFwaHkuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgb1R5cG9ncmFwaHk7XG4iLCJpbXBvcnQgJy4vLi4vLi4vbWFpbi5qcyc7XG5cbmZ1bmN0aW9uIHNldFdpZHRocyAoKSB7XG5cdGNvbnN0IHNlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3Qtc2NhbGUnKTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Y29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKTtcblx0XHRzZWxlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuXHRcdFx0dGV4dC5jbGFzc0xpc3QgPSAnJztcblx0XHRcdHRleHQuY2xhc3NMaXN0LmFkZCgnbGluZS13aWR0aC1kZW1vX19zY2FsZScpO1xuXHRcdFx0dGV4dC5jbGFzc0xpc3QuYWRkKGBsaW5lLXdpZHRoLWRlbW9fX3NjYWxlLS0ke3NlbGVjdGlvbi52YWx1ZX1gKTtcblx0XHR9KTtcblx0fVxufVxuXG4vLyBvVHlwb2dyYXBoeSBzaG91bGQgYmUgcnVuIG9uIHRoZSBIVE1MIGVsZW1lbnQgb25seVxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1vLWNvbXBvbmVudCcsICdvLXR5cG9ncmFwaHknKTtcblxuZnVuY3Rpb24gaW5pdERlbW9zKCkge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcblx0XHRzZXRXaWR0aHMoKTtcblx0fSk7XG59XG5cbmluaXREZW1vcygpO1xuIl19