function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
  }; // ../../node_modules/@financial-times/accessible-autocomplete/dist/accessible-autocomplete.min.js


  var require_accessible_autocomplete_min = __commonJS({
    "../../node_modules/@financial-times/accessible-autocomplete/dist/accessible-autocomplete.min.js": function node_modulesFinancialTimesAccessibleAutocompleteDistAccessibleAutocompleteMinJs(exports, module) {
      (function webpackUniversalModuleDefinition(e, t) {
        _typeof(exports) == "object" && _typeof(module) == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define([], t) : _typeof(exports) == "object" ? exports["accessibleAutocomplete"] = t() : e["accessibleAutocomplete"] = t();
      })(window, function () {
        return function (n) {
          var r = {};

          function o(e) {
            if (r[e]) return r[e].exports;
            var t = r[e] = {
              i: e,
              l: false,
              exports: {}
            };
            return n[e].call(t.exports, t, t.exports, o), t.l = true, t.exports;
          }

          return o.m = n, o.c = r, o.d = function (e, t, n2) {
            o.o(e, t) || Object.defineProperty(e, t, {
              enumerable: true,
              get: n2
            });
          }, o.r = function (e) {
            typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
              value: "Module"
            }), Object.defineProperty(e, "__esModule", {
              value: true
            });
          }, o.t = function (t, e) {
            if (1 & e && (t = o(t)), 8 & e) return t;
            if (4 & e && _typeof(t) == "object" && t && t.__esModule) return t;
            var n2 = Object.create(null);
            if (o.r(n2), Object.defineProperty(n2, "default", {
              enumerable: true,
              value: t
            }), 2 & e && typeof t != "string") for (var r2 in t) {
              o.d(n2, r2, function (e2) {
                return t[e2];
              }.bind(null, r2));
            }
            return n2;
          }, o.n = function (e) {
            var t = e && e.__esModule ? function () {
              return e["default"];
            } : function () {
              return e;
            };
            return o.d(t, "a", t), t;
          }, o.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }, o.p = "/", o(o.s = 37);
        }([function (e, t, n) {
          var m = n(1),
              v = n(6),
              y = n(7),
              b = n(16),
              _ = n(18),
              g = "prototype",
              w = function w(e2, t2, n2) {
            var r,
                o,
                i,
                u,
                a = e2 & w.F,
                l = e2 & w.G,
                s = e2 & w.S,
                c = e2 & w.P,
                p = e2 & w.B,
                f = l ? m : s ? m[t2] || (m[t2] = {}) : (m[t2] || {})[g],
                d = l ? v : v[t2] || (v[t2] = {}),
                h = d[g] || (d[g] = {});

            for (r in l && (n2 = t2), n2) {
              i = ((o = !a && f && f[r] !== void 0) ? f : n2)[r], u = p && o ? _(i, m) : c && typeof i == "function" ? _(Function.call, i) : i, f && b(f, r, i, e2 & w.U), d[r] != i && y(d, r, u), c && h[r] != i && (h[r] = i);
            }
          };

          m.core = v, w.F = 1, w.G = 2, w.S = 4, w.P = 8, w.B = 16, w.W = 32, w.U = 64, w.R = 128, e.exports = w;
        }, function (e, t) {
          var n = e.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
          typeof __g == "number" && (__g = n);
        }, function (e, t) {
          e.exports = function (e2) {
            return _typeof(e2) == "object" ? e2 !== null : typeof e2 == "function";
          };
        }, function (e, t, n) {
          e.exports = !n(4)(function () {
            return Object.defineProperty({}, "a", {
              get: function get() {
                return 7;
              }
            }).a != 7;
          });
        }, function (e, t) {
          e.exports = function (e2) {
            try {
              return !!e2();
            } catch (t2) {
              return true;
            }
          };
        }, function (e, t, n) {
          "use strict";

          n.r(t), n.d(t, "h", function () {
            return r;
          }), n.d(t, "createElement", function () {
            return r;
          }), n.d(t, "cloneElement", function () {
            return i;
          }), n.d(t, "Component", function () {
            return b;
          }), n.d(t, "render", function () {
            return _;
          }), n.d(t, "rerender", function () {
            return f;
          }), n.d(t, "options", function () {
            return E;
          });

          var l = function l2() {},
              E = {},
              s = [],
              c = [];

          function r(e2, t2) {
            var n2,
                r2,
                o2,
                i2,
                u2 = c;

            for (i2 = arguments.length; 2 < i2--;) {
              s.push(arguments[i2]);
            }

            for (t2 && t2.children != null && (s.length || s.push(t2.children), delete t2.children); s.length;) {
              if ((r2 = s.pop()) && r2.pop !== void 0) for (i2 = r2.length; i2--;) {
                s.push(r2[i2]);
              } else typeof r2 == "boolean" && (r2 = null), (o2 = typeof e2 != "function") && (r2 == null ? r2 = "" : typeof r2 == "number" ? r2 = String(r2) : typeof r2 != "string" && (o2 = false)), o2 && n2 ? u2[u2.length - 1] += r2 : u2 === c ? u2 = [r2] : u2.push(r2), n2 = o2;
            }

            var a2 = new l();
            return a2.nodeName = e2, a2.children = u2, a2.attributes = t2 == null ? void 0 : t2, a2.key = t2 == null ? void 0 : t2.key, E.vnode !== void 0 && E.vnode(a2), a2;
          }

          function M(e2, t2) {
            for (var n2 in t2) {
              e2[n2] = t2[n2];
            }

            return e2;
          }

          var o = typeof Promise == "function" ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

          function i(e2, t2) {
            return r(e2.nodeName, M(M({}, e2.attributes), t2), 2 < arguments.length ? [].slice.call(arguments, 2) : e2.children);
          }

          var p = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
              u = [];

          function a(e2) {
            !e2._dirty && (e2._dirty = true) && u.push(e2) == 1 && (E.debounceRendering || o)(f);
          }

          function f() {
            var e2,
                t2 = u;

            for (u = []; e2 = t2.pop();) {
              e2._dirty && V(e2);
            }
          }

          function N(e2, t2) {
            return e2.normalizedNodeName === t2 || e2.nodeName.toLowerCase() === t2.toLowerCase();
          }

          function I(e2) {
            var t2 = M({}, e2.attributes);
            t2.children = e2.children;
            var n2 = e2.nodeName.defaultProps;
            if (n2 !== void 0) for (var r2 in n2) {
              t2[r2] === void 0 && (t2[r2] = n2[r2]);
            }
            return t2;
          }

          function k(e2) {
            var t2 = e2.parentNode;
            t2 && t2.removeChild(e2);
          }

          function v(e2, t2, n2, r2, o2) {
            if (t2 === "className" && (t2 = "class"), t2 === "key") ;else if (t2 === "ref") n2 && n2(null), r2 && r2(e2);else if (t2 !== "class" || o2) {
              if (t2 === "style") {
                if (r2 && typeof r2 != "string" && typeof n2 != "string" || (e2.style.cssText = r2 || ""), r2 && _typeof(r2) == "object") {
                  if (typeof n2 != "string") for (var i2 in n2) {
                    i2 in r2 || (e2.style[i2] = "");
                  }

                  for (var i2 in r2) {
                    e2.style[i2] = typeof r2[i2] == "number" && p.test(i2) === false ? r2[i2] + "px" : r2[i2];
                  }
                }
              } else if (t2 === "dangerouslySetInnerHTML") r2 && (e2.innerHTML = r2.__html || "");else if (t2[0] == "o" && t2[1] == "n") {
                var u2 = t2 !== (t2 = t2.replace(/Capture$/, ""));
                t2 = t2.toLowerCase().substring(2), r2 ? n2 || e2.addEventListener(t2, d, u2) : e2.removeEventListener(t2, d, u2), (e2._listeners || (e2._listeners = {}))[t2] = r2;
              } else if (t2 !== "list" && t2 !== "type" && !o2 && t2 in e2) {
                try {
                  e2[t2] = r2 == null ? "" : r2;
                } catch (l2) {}

                r2 != null && r2 !== false || t2 == "spellcheck" || e2.removeAttribute(t2);
              } else {
                var a2 = o2 && t2 !== (t2 = t2.replace(/^xlink:?/, ""));
                r2 == null || r2 === false ? a2 ? e2.removeAttributeNS("http://www.w3.org/1999/xlink", t2.toLowerCase()) : e2.removeAttribute(t2) : typeof r2 != "function" && (a2 ? e2.setAttributeNS("http://www.w3.org/1999/xlink", t2.toLowerCase(), r2) : e2.setAttribute(t2, r2));
              }
            } else e2.className = r2 || "";
          }

          function d(e2) {
            return this._listeners[e2.type](E.event && E.event(e2) || e2);
          }

          var A = [],
              P = 0,
              j = false,
              L = false;

          function B() {
            for (var e2; e2 = A.pop();) {
              E.afterMount && E.afterMount(e2), e2.componentDidMount && e2.componentDidMount();
            }
          }

          function T(e2, t2, n2, r2, o2, i2) {
            P++ || (j = o2 != null && o2.ownerSVGElement !== void 0, L = e2 != null && !("__preactattr_" in e2));
            var u2 = D(e2, t2, n2, r2, i2);
            return o2 && u2.parentNode !== o2 && o2.appendChild(u2), --P || (L = false, i2 || B()), u2;
          }

          function D(e2, t2, n2, r2, o2) {
            var i2 = e2,
                u2 = j;
            if (t2 != null && typeof t2 != "boolean" || (t2 = ""), typeof t2 == "string" || typeof t2 == "number") return e2 && e2.splitText !== void 0 && e2.parentNode && (!e2._component || o2) ? e2.nodeValue != t2 && (e2.nodeValue = t2) : (i2 = document.createTextNode(t2), e2 && (e2.parentNode && e2.parentNode.replaceChild(i2, e2), F(e2, true))), i2["__preactattr_"] = true, i2;
            var a2 = t2.nodeName;
            if (typeof a2 == "function") return function d2(e3, t3, n3, r3) {
              var o3 = e3 && e3._component,
                  i3 = o3,
                  u3 = e3,
                  a3 = o3 && e3._componentConstructor === t3.nodeName,
                  l3 = a3,
                  s3 = I(t3);

              for (; o3 && !l3 && (o3 = o3._parentComponent);) {
                l3 = o3.constructor === t3.nodeName;
              }

              o3 && l3 && (!r3 || o3._component) ? (U(o3, s3, 3, n3, r3), e3 = o3.base) : (i3 && !a3 && (q(i3), e3 = u3 = null), o3 = R(t3.nodeName, s3, n3), e3 && !o3.nextBase && (o3.nextBase = e3, u3 = null), U(o3, s3, 1, n3, r3), e3 = o3.base, u3 && e3 !== u3 && (u3._component = null, F(u3, false)));
              return e3;
            }(e2, t2, n2, r2);

            if (j = a2 === "svg" || a2 !== "foreignObject" && j, a2 = String(a2), (!e2 || !N(e2, a2)) && (i2 = function h2(e3, t3) {
              var n3 = t3 ? document.createElementNS("http://www.w3.org/2000/svg", e3) : document.createElement(e3);
              return n3.normalizedNodeName = e3, n3;
            }(a2, j), e2)) {
              for (; e2.firstChild;) {
                i2.appendChild(e2.firstChild);
              }

              e2.parentNode && e2.parentNode.replaceChild(i2, e2), F(e2, true);
            }

            var l2 = i2.firstChild,
                s2 = i2["__preactattr_"],
                c2 = t2.children;

            if (s2 == null) {
              s2 = i2["__preactattr_"] = {};

              for (var p2 = i2.attributes, f2 = p2.length; f2--;) {
                s2[p2[f2].name] = p2[f2].value;
              }
            }

            return !L && c2 && c2.length === 1 && typeof c2[0] == "string" && l2 != null && l2.splitText !== void 0 && l2.nextSibling == null ? l2.nodeValue != c2[0] && (l2.nodeValue = c2[0]) : (c2 && c2.length || l2 != null) && function S(e3, t3, n3, r3, o3) {
              var i3,
                  u3,
                  a3,
                  l3,
                  s3,
                  c3 = e3.childNodes,
                  p3 = [],
                  f3 = {},
                  d2 = 0,
                  h2 = 0,
                  m2 = c3.length,
                  v2 = 0,
                  y2 = t3 ? t3.length : 0;
              if (m2 !== 0) for (var b2 = 0; b2 < m2; b2++) {
                var _2 = c3[b2],
                    g2 = _2["__preactattr_"],
                    w = y2 && g2 ? _2._component ? _2._component.__key : g2.key : null;
                w != null ? (d2++, f3[w] = _2) : (g2 || (_2.splitText !== void 0 ? !o3 || _2.nodeValue.trim() : o3)) && (p3[v2++] = _2);
              }
              if (y2 !== 0) for (var b2 = 0; b2 < y2; b2++) {
                l3 = t3[b2], s3 = null;
                var w = l3.key;
                if (w != null) d2 && f3[w] !== void 0 && (s3 = f3[w], f3[w] = void 0, d2--);else if (h2 < v2) {
                  for (i3 = h2; i3 < v2; i3++) {
                    if (p3[i3] !== void 0 && (x = u3 = p3[i3], C = o3, typeof (O = l3) == "string" || typeof O == "number" ? x.splitText !== void 0 : typeof O.nodeName == "string" ? !x._componentConstructor && N(x, O.nodeName) : C || x._componentConstructor === O.nodeName)) {
                      s3 = u3, p3[i3] = void 0, i3 === v2 - 1 && v2--, i3 === h2 && h2++;
                      break;
                    }
                  }
                }
                s3 = D(s3, l3, n3, r3), a3 = c3[b2], s3 && s3 !== e3 && s3 !== a3 && (a3 == null ? e3.appendChild(s3) : s3 === a3.nextSibling ? k(a3) : e3.insertBefore(s3, a3));
              }
              var x, O, C;
              if (d2) for (var b2 in f3) {
                f3[b2] !== void 0 && F(f3[b2], false);
              }

              for (; h2 <= v2;) {
                (s3 = p3[v2--]) !== void 0 && F(s3, false);
              }
            }(i2, c2, n2, r2, L || s2.dangerouslySetInnerHTML != null), function m2(e3, t3, n3) {
              var r3;

              for (r3 in n3) {
                t3 && t3[r3] != null || n3[r3] == null || v(e3, r3, n3[r3], n3[r3] = void 0, j);
              }

              for (r3 in t3) {
                r3 === "children" || r3 === "innerHTML" || r3 in n3 && t3[r3] === (r3 === "value" || r3 === "checked" ? e3[r3] : n3[r3]) || v(e3, r3, n3[r3], n3[r3] = t3[r3], j);
              }
            }(i2, t2.attributes, s2), j = u2, i2;
          }

          function F(e2, t2) {
            var n2 = e2._component;
            n2 ? q(n2) : (e2["__preactattr_"] != null && e2["__preactattr_"].ref && e2["__preactattr_"].ref(null), t2 !== false && e2["__preactattr_"] != null || k(e2), h(e2));
          }

          function h(e2) {
            for (e2 = e2.lastChild; e2;) {
              var t2 = e2.previousSibling;
              F(e2, true), e2 = t2;
            }
          }

          var m = [];

          function R(e2, t2, n2) {
            var r2,
                o2 = m.length;

            for (e2.prototype && e2.prototype.render ? (r2 = new e2(t2, n2), b.call(r2, t2, n2)) : ((r2 = new b(t2, n2)).constructor = e2, r2.render = y); o2--;) {
              if (m[o2].constructor === e2) return r2.nextBase = m[o2].nextBase, m.splice(o2, 1), r2;
            }

            return r2;
          }

          function y(e2, t2, n2) {
            return this.constructor(e2, n2);
          }

          function U(e2, t2, n2, r2, o2) {
            e2._disable || (e2._disable = true, e2.__ref = t2.ref, e2.__key = t2.key, delete t2.ref, delete t2.key, typeof e2.constructor.getDerivedStateFromProps == "undefined" && (!e2.base || o2 ? e2.componentWillMount && e2.componentWillMount() : e2.componentWillReceiveProps && e2.componentWillReceiveProps(t2, r2)), r2 && r2 !== e2.context && (e2.prevContext || (e2.prevContext = e2.context), e2.context = r2), e2.prevProps || (e2.prevProps = e2.props), e2.props = t2, e2._disable = false, n2 !== 0 && (n2 !== 1 && E.syncComponentUpdates === false && e2.base ? a(e2) : V(e2, 1, o2)), e2.__ref && e2.__ref(e2));
          }

          function V(e2, t2, n2, r2) {
            if (!e2._disable) {
              var o2,
                  i2,
                  u2,
                  a2 = e2.props,
                  l2 = e2.state,
                  s2 = e2.context,
                  c2 = e2.prevProps || a2,
                  p2 = e2.prevState || l2,
                  f2 = e2.prevContext || s2,
                  d2 = e2.base,
                  h2 = e2.nextBase,
                  m2 = d2 || h2,
                  v2 = e2._component,
                  y2 = false,
                  b2 = f2;

              if (e2.constructor.getDerivedStateFromProps && (l2 = M(M({}, l2), e2.constructor.getDerivedStateFromProps(a2, l2)), e2.state = l2), d2 && (e2.props = c2, e2.state = p2, e2.context = f2, t2 !== 2 && e2.shouldComponentUpdate && e2.shouldComponentUpdate(a2, l2, s2) === false ? y2 = true : e2.componentWillUpdate && e2.componentWillUpdate(a2, l2, s2), e2.props = a2, e2.state = l2, e2.context = s2), e2.prevProps = e2.prevState = e2.prevContext = e2.nextBase = null, e2._dirty = false, !y2) {
                o2 = e2.render(a2, l2, s2), e2.getChildContext && (s2 = M(M({}, s2), e2.getChildContext())), d2 && e2.getSnapshotBeforeUpdate && (b2 = e2.getSnapshotBeforeUpdate(c2, p2));

                var _2,
                    g2,
                    w = o2 && o2.nodeName;

                if (typeof w == "function") {
                  var x = I(o2);
                  (i2 = v2) && i2.constructor === w && x.key == i2.__key ? U(i2, x, 1, s2, false) : (_2 = i2, e2._component = i2 = R(w, x, s2), i2.nextBase = i2.nextBase || h2, i2._parentComponent = e2, U(i2, x, 0, s2, false), V(i2, 1, n2, true)), g2 = i2.base;
                } else u2 = m2, (_2 = v2) && (u2 = e2._component = null), (m2 || t2 === 1) && (u2 && (u2._component = null), g2 = function T2(t3, n3, r3, o3, i3, u3) {
                  P++ || (j = i3 != null && i3.ownerSVGElement !== void 0, L = t3 != null && !("__preactattr_" in t3));
                  var a3 = D(t3, n3, r3, o3, u3);
                  return i3 && a3.parentNode !== i3 && i3.appendChild(a3), --P || (L = false, u3 || B()), a3;
                }(u2, o2, s2, n2 || !d2, m2 && m2.parentNode, true));

                if (m2 && g2 !== m2 && i2 !== v2) {
                  var O = m2.parentNode;
                  O && g2 !== O && (O.replaceChild(g2, m2), _2 || (m2._component = null, F(m2, false)));
                }

                if (_2 && q(_2), (e2.base = g2) && !r2) {
                  for (var C = e2, S = e2; S = S._parentComponent;) {
                    (C = S).base = g2;
                  }

                  g2._component = C, g2._componentConstructor = C.constructor;
                }
              }

              for (!d2 || n2 ? A.unshift(e2) : y2 || (e2.componentDidUpdate && e2.componentDidUpdate(c2, p2, b2), E.afterUpdate && E.afterUpdate(e2)); e2._renderCallbacks.length;) {
                e2._renderCallbacks.pop().call(e2);
              }

              P || r2 || B();
            }
          }

          function q(e2) {
            E.beforeUnmount && E.beforeUnmount(e2);
            var t2 = e2.base;
            e2._disable = true, e2.componentWillUnmount && e2.componentWillUnmount(), e2.base = null;
            var n2 = e2._component;
            n2 ? q(n2) : t2 && (t2["__preactattr_"] && t2["__preactattr_"].ref && t2["__preactattr_"].ref(null), k(e2.nextBase = t2), m.push(e2), h(t2)), e2.__ref && e2.__ref(null);
          }

          function b(e2, t2) {
            this._dirty = true, this.context = t2, this.props = e2, this.state = this.state || {}, this._renderCallbacks = [];
          }

          function _(e2, t2, n2) {
            return T(n2, e2, {}, false, t2, false);
          }

          M(b.prototype, {
            setState: function setState(e2, t2) {
              this.prevState || (this.prevState = this.state), this.state = M(M({}, this.state), typeof e2 == "function" ? e2(this.state, this.props) : e2), t2 && this._renderCallbacks.push(t2), a(this);
            },
            forceUpdate: function forceUpdate(e2) {
              e2 && this._renderCallbacks.push(e2), V(this, 2);
            },
            render: function _2() {}
          });
          var g = {
            h: r,
            createElement: r,
            cloneElement: i,
            Component: b,
            render: _,
            rerender: f,
            options: E
          };
          t["default"] = g;
        }, function (e, t) {
          var n = e.exports = {
            version: "2.5.7"
          };
          typeof __e == "number" && (__e = n);
        }, function (e, t, n) {
          var r = n(8),
              o = n(40);
          e.exports = n(3) ? function (e2, t2, n2) {
            return r.f(e2, t2, o(1, n2));
          } : function (e2, t2, n2) {
            return e2[t2] = n2, e2;
          };
        }, function (e, t, n) {
          var o = n(9),
              i = n(38),
              u = n(39),
              a = Object.defineProperty;
          t.f = n(3) ? Object.defineProperty : function (e2, t2, n2) {
            if (o(e2), t2 = u(t2, true), o(n2), i) try {
              return a(e2, t2, n2);
            } catch (r) {}
            if ("get" in n2 || "set" in n2) throw TypeError("Accessors not supported!");
            return "value" in n2 && (e2[t2] = n2.value), e2;
          };
        }, function (e, t, n) {
          var r = n(2);

          e.exports = function (e2) {
            if (!r(e2)) throw TypeError(e2 + " is not an object!");
            return e2;
          };
        }, function (e, t) {
          var n = 0,
              r = Math.random();

          e.exports = function (e2) {
            return "Symbol(".concat(e2 === void 0 ? "" : e2, ")_", (++n + r).toString(36));
          };
        }, function (e, t, n) {
          var r = n(22);
          e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e2) {
            return r(e2) == "String" ? e2.split("") : Object(e2);
          };
        }, function (e, t) {
          e.exports = function (e2) {
            if (e2 == void 0) throw TypeError("Can't call method on  " + e2);
            return e2;
          };
        }, function (e, t, n) {
          "use strict";

          var r = n(4);

          e.exports = function (e2, t2) {
            return !!e2 && r(function () {
              t2 ? e2.call(null, function () {}, 1) : e2.call(null);
            });
          };
        }, function (e, t, n) {
          var r = n(0);
          r(r.S + r.F, "Object", {
            assign: n(41)
          });
        }, function (e, t, n) {
          var r = n(2),
              o = n(1).document,
              i = r(o) && r(o.createElement);

          e.exports = function (e2) {
            return i ? o.createElement(e2) : {};
          };
        }, function (e, t, n) {
          var i = n(1),
              u = n(7),
              a = n(17),
              l = n(10)("src"),
              r = "toString",
              o = Function[r],
              s = ("" + o).split(r);
          n(6).inspectSource = function (e2) {
            return o.call(e2);
          }, (e.exports = function (e2, t2, n2, r2) {
            var o2 = typeof n2 == "function";
            o2 && (a(n2, "name") || u(n2, "name", t2)), e2[t2] !== n2 && (o2 && (a(n2, l) || u(n2, l, e2[t2] ? "" + e2[t2] : s.join(String(t2)))), e2 === i ? e2[t2] = n2 : r2 ? e2[t2] ? e2[t2] = n2 : u(e2, t2, n2) : (delete e2[t2], u(e2, t2, n2)));
          })(Function.prototype, r, function () {
            return typeof this == "function" && this[l] || o.call(this);
          });
        }, function (e, t) {
          var n = {}.hasOwnProperty;

          e.exports = function (e2, t2) {
            return n.call(e2, t2);
          };
        }, function (e, t, n) {
          var i = n(19);

          e.exports = function (r, o, e2) {
            if (i(r), o === void 0) return r;

            switch (e2) {
              case 1:
                return function (e3) {
                  return r.call(o, e3);
                };

              case 2:
                return function (e3, t2) {
                  return r.call(o, e3, t2);
                };

              case 3:
                return function (e3, t2, n2) {
                  return r.call(o, e3, t2, n2);
                };
            }

            return function () {
              return r.apply(o, arguments);
            };
          };
        }, function (e, t) {
          e.exports = function (e2) {
            if (typeof e2 != "function") throw TypeError(e2 + " is not a function!");
            return e2;
          };
        }, function (e, t, n) {
          var r = n(42),
              o = n(28);

          e.exports = Object.keys || function (e2) {
            return r(e2, o);
          };
        }, function (e, t, n) {
          var r = n(11),
              o = n(12);

          e.exports = function (e2) {
            return r(o(e2));
          };
        }, function (e, t) {
          var n = {}.toString;

          e.exports = function (e2) {
            return n.call(e2).slice(8, -1);
          };
        }, function (e, t, n) {
          var l = n(21),
              s = n(24),
              c = n(43);

          e.exports = function (a) {
            return function (e2, t2, n2) {
              var r,
                  o = l(e2),
                  i = s(o.length),
                  u = c(n2, i);

              if (a && t2 != t2) {
                for (; u < i;) {
                  if ((r = o[u++]) != r) return true;
                }
              } else for (; u < i; u++) {
                if ((a || u in o) && o[u] === t2) return a || u || 0;
              }

              return !a && -1;
            };
          };
        }, function (e, t, n) {
          var r = n(25),
              o = Math.min;

          e.exports = function (e2) {
            return 0 < e2 ? o(r(e2), 9007199254740991) : 0;
          };
        }, function (e, t) {
          var n = Math.ceil,
              r = Math.floor;

          e.exports = function (e2) {
            return isNaN(e2 = +e2) ? 0 : (0 < e2 ? r : n)(e2);
          };
        }, function (e, t, n) {
          var r = n(27)("keys"),
              o = n(10);

          e.exports = function (e2) {
            return r[e2] || (r[e2] = o(e2));
          };
        }, function (e, t, n) {
          var r = n(6),
              o = n(1),
              i = "__core-js_shared__",
              u = o[i] || (o[i] = {});
          (e.exports = function (e2, t2) {
            return u[e2] || (u[e2] = t2 !== void 0 ? t2 : {});
          })("versions", []).push({
            version: r.version,
            mode: n(44) ? "pure" : "global",
            copyright: "\xA9 2018 Denis Pushkarev (zloirock.ru)"
          });
        }, function (e, t) {
          e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
        }, function (e, t, n) {
          var r = n(12);

          e.exports = function (e2) {
            return Object(r(e2));
          };
        }, function (e, t, n) {
          var r = n(8).f,
              o = Function.prototype,
              i = /^\s*function ([^ (]*)/;
          "name" in o || n(3) && r(o, "name", {
            configurable: true,
            get: function get() {
              try {
                return ("" + this).match(i)[1];
              } catch (e2) {
                return "";
              }
            }
          });
        }, function (e, t, n) {
          "use strict";

          var r = n(0),
              o = n(32)(1);
          r(r.P + r.F * !n(13)([].map, true), "Array", {
            map: function map(e2) {
              return o(this, e2, arguments[1]);
            }
          });
        }, function (e, t, n) {
          var _ = n(18),
              g = n(11),
              w = n(29),
              x = n(24),
              r = n(47);

          e.exports = function (p, e2) {
            var f = p == 1,
                d = p == 2,
                h = p == 3,
                m = p == 4,
                v = p == 6,
                y = p == 5 || v,
                b = e2 || r;
            return function (e3, t2, n2) {
              for (var r2, o, i = w(e3), u = g(i), a = _(t2, n2, 3), l = x(u.length), s = 0, c = f ? b(e3, l) : d ? b(e3, 0) : void 0; s < l; s++) {
                if ((y || s in u) && (o = a(r2 = u[s], s, i), p)) {
                  if (f) c[s] = o;else if (o) switch (p) {
                    case 3:
                      return true;

                    case 5:
                      return r2;

                    case 6:
                      return s;

                    case 2:
                      c.push(r2);
                  } else if (m) return false;
                }
              }

              return v ? -1 : h || m ? m : c;
            };
          };
        }, function (e, t, n) {
          var r = n(22);

          e.exports = Array.isArray || function (e2) {
            return r(e2) == "Array";
          };
        }, function (e, t, n) {
          var r = n(27)("wks"),
              o = n(10),
              i = n(1).Symbol,
              u = typeof i == "function";
          (e.exports = function (e2) {
            return r[e2] || (r[e2] = u && i[e2] || (u ? i : o)("Symbol." + e2));
          }).store = r;
        }, function (e, t, n) {
          "use strict";

          var r = n(0),
              o = n(23)(false),
              i = [].indexOf,
              u = !!i && 1 / [1].indexOf(1, -0) < 0;
          r(r.P + r.F * (u || !n(13)(i)), "Array", {
            indexOf: function indexOf(e2) {
              return u ? i.apply(this, arguments) || 0 : o(this, e2, arguments[1]);
            }
          });
        }, function (e, t, n) {
          var r = n(0);
          r(r.S, "Object", {
            create: n(52)
          });
        }, function (e, t, n) {
          "use strict";

          t.__esModule = true, t["default"] = void 0, n(14), n(30), n(31), n(35), n(49), n(50);

          var r = n(5),
              o = function l(e2) {
            return e2 && e2.__esModule ? e2 : {
              "default": e2
            };
          }(n(51));

          function i(e2) {
            if (!e2.element) throw new Error("element is not defined");
            if (!e2.id) throw new Error("id is not defined");
            if (!e2.source) throw new Error("source is not defined");
            Array.isArray(e2.source) && (e2.source = u(e2.source)), (0, r.render)((0, r.createElement)(o["default"], e2), e2.element);
          }

          var u = function u2(n2) {
            return function (t2, e2) {
              t2 ? e2(n2.filter(function (e3) {
                return e3.toLowerCase().indexOf(t2.toLowerCase()) !== -1;
              })) : e2([]);
            };
          };

          i.enhanceSelectElement = function (n2) {
            if (!n2.selectElement) throw new Error("selectElement is not defined");

            if (!n2.source) {
              var e2 = [].filter.call(n2.selectElement.options, function (e3) {
                return e3.value || n2.preserveNullOptions;
              });
              n2.source = e2.map(function (e3) {
                return e3.textContent || e3.innerText;
              });
            }

            if (n2.onConfirm = n2.onConfirm || function (t3) {
              var e3 = [].filter.call(n2.selectElement.options, function (e4) {
                return (e4.textContent || e4.innerText) === t3;
              })[0];
              e3 && (e3.selected = true);
            }, n2.selectElement.value || n2.defaultValue === void 0) {
              var t2 = n2.selectElement.options[n2.selectElement.options.selectedIndex];
              n2.defaultValue = t2.textContent || t2.innerText;
            }

            n2.name === void 0 && (n2.name = ""), n2.id === void 0 && (n2.selectElement.id === void 0 ? n2.id = "" : n2.id = n2.selectElement.id), n2.autoselect === void 0 && (n2.autoselect = true);
            var r2 = document.createElement("div");
            n2.selectElement.parentNode.insertBefore(r2, n2.selectElement), i(Object.assign({}, n2, {
              element: r2
            })), n2.selectElement.style.display = "none", n2.selectElement.id = n2.selectElement.id + "-select";
          };

          var a = i;
          t["default"] = a;
        }, function (e, t, n) {
          e.exports = !n(3) && !n(4)(function () {
            return Object.defineProperty(n(15)("div"), "a", {
              get: function get() {
                return 7;
              }
            }).a != 7;
          });
        }, function (e, t, n) {
          var o = n(2);

          e.exports = function (e2, t2) {
            if (!o(e2)) return e2;
            var n2, r;
            if (t2 && typeof (n2 = e2.toString) == "function" && !o(r = n2.call(e2))) return r;
            if (typeof (n2 = e2.valueOf) == "function" && !o(r = n2.call(e2))) return r;
            if (!t2 && typeof (n2 = e2.toString) == "function" && !o(r = n2.call(e2))) return r;
            throw TypeError("Can't convert object to primitive value");
          };
        }, function (e, t) {
          e.exports = function (e2, t2) {
            return {
              enumerable: !(1 & e2),
              configurable: !(2 & e2),
              writable: !(4 & e2),
              value: t2
            };
          };
        }, function (e, t, n) {
          "use strict";

          var f = n(20),
              d = n(45),
              h = n(46),
              m = n(29),
              v = n(11),
              o = Object.assign;
          e.exports = !o || n(4)(function () {
            var e2 = {},
                t2 = {},
                n2 = Symbol(),
                r = "abcdefghijklmnopqrst";
            return e2[n2] = 7, r.split("").forEach(function (e3) {
              t2[e3] = e3;
            }), o({}, e2)[n2] != 7 || Object.keys(o({}, t2)).join("") != r;
          }) ? function (e2, t2) {
            for (var n2 = m(e2), r = arguments.length, o2 = 1, i = d.f, u = h.f; o2 < r;) {
              for (var a, l = v(arguments[o2++]), s = i ? f(l).concat(i(l)) : f(l), c = s.length, p = 0; p < c;) {
                u.call(l, a = s[p++]) && (n2[a] = l[a]);
              }
            }

            return n2;
          } : o;
        }, function (e, t, n) {
          var u = n(17),
              a = n(21),
              l = n(23)(false),
              s = n(26)("IE_PROTO");

          e.exports = function (e2, t2) {
            var n2,
                r = a(e2),
                o = 0,
                i = [];

            for (n2 in r) {
              n2 != s && u(r, n2) && i.push(n2);
            }

            for (; t2.length > o;) {
              u(r, n2 = t2[o++]) && (~l(i, n2) || i.push(n2));
            }

            return i;
          };
        }, function (e, t, n) {
          var r = n(25),
              o = Math.max,
              i = Math.min;

          e.exports = function (e2, t2) {
            return (e2 = r(e2)) < 0 ? o(e2 + t2, 0) : i(e2, t2);
          };
        }, function (e, t) {
          e.exports = false;
        }, function (e, t) {
          t.f = Object.getOwnPropertySymbols;
        }, function (e, t) {
          t.f = {}.propertyIsEnumerable;
        }, function (e, t, n) {
          var r = n(48);

          e.exports = function (e2, t2) {
            return new (r(e2))(t2);
          };
        }, function (e, t, n) {
          var r = n(2),
              o = n(33),
              i = n(34)("species");

          e.exports = function (e2) {
            var t2;
            return o(e2) && (typeof (t2 = e2.constructor) != "function" || t2 !== Array && !o(t2.prototype) || (t2 = void 0), r(t2) && (t2 = t2[i]) === null && (t2 = void 0)), t2 === void 0 ? Array : t2;
          };
        }, function (e, t, n) {
          "use strict";

          var r = n(0),
              o = n(32)(2);
          r(r.P + r.F * !n(13)([].filter, true), "Array", {
            filter: function filter(e2) {
              return o(this, e2, arguments[1]);
            }
          });
        }, function (e, t, n) {
          var r = n(0);
          r(r.S, "Array", {
            isArray: n(33)
          });
        }, function (e, t, n) {
          "use strict";

          t.__esModule = true, t["default"] = void 0, n(14), n(36), n(30), n(31), n(35), n(55), n(58);
          var J = n(5),
              X = o(n(60)),
              r = o(n(61));

          function o(e2) {
            return e2 && e2.__esModule ? e2 : {
              "default": e2
            };
          }

          function Y() {
            return (Y = Object.assign || function (e2) {
              for (var t2 = 1; t2 < arguments.length; t2++) {
                var n2 = arguments[t2];

                for (var r2 in n2) {
                  Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
                }
              }

              return e2;
            }).apply(this, arguments);
          }

          function i(e2) {
            if (e2 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e2;
          }

          var u = {
            13: "enter",
            27: "escape",
            32: "space",
            38: "up",
            40: "down"
          };

          function Z() {
            return typeof navigator != "undefined" && !(!navigator.userAgent.match(/(iPod|iPhone|iPad)/g) || !navigator.userAgent.match(/AppleWebKit/g));
          }

          var a = function (n2) {
            function e2(e3) {
              var t3;
              return (t3 = n2.call(this, e3) || this).elementReferences = {}, t3.state = {
                focused: null,
                hovered: null,
                menuOpen: false,
                options: e3.defaultValue ? [e3.defaultValue] : [],
                query: e3.defaultValue,
                validChoiceMade: false,
                selected: null,
                ariaHint: true
              }, t3.handleComponentBlur = t3.handleComponentBlur.bind(i(i(t3))), t3.handleKeyDown = t3.handleKeyDown.bind(i(i(t3))), t3.handleUpArrow = t3.handleUpArrow.bind(i(i(t3))), t3.handleDownArrow = t3.handleDownArrow.bind(i(i(t3))), t3.handleEnter = t3.handleEnter.bind(i(i(t3))), t3.handlePrintableKey = t3.handlePrintableKey.bind(i(i(t3))), t3.handleListMouseLeave = t3.handleListMouseLeave.bind(i(i(t3))), t3.handleOptionBlur = t3.handleOptionBlur.bind(i(i(t3))), t3.handleOptionClick = t3.handleOptionClick.bind(i(i(t3))), t3.handleOptionFocus = t3.handleOptionFocus.bind(i(i(t3))), t3.handleOptionMouseDown = t3.handleOptionMouseDown.bind(i(i(t3))), t3.handleOptionMouseEnter = t3.handleOptionMouseEnter.bind(i(i(t3))), t3.handleInputBlur = t3.handleInputBlur.bind(i(i(t3))), t3.handleInputChange = t3.handleInputChange.bind(i(i(t3))), t3.handleInputFocus = t3.handleInputFocus.bind(i(i(t3))), t3.pollInputElement = t3.pollInputElement.bind(i(i(t3))), t3.getDirectInputChanges = t3.getDirectInputChanges.bind(i(i(t3))), t3;
            }

            (function r2(e3, t3) {
              e3.prototype = Object.create(t3.prototype), (e3.prototype.constructor = e3).__proto__ = t3;
            })(e2, n2);

            var t2 = e2.prototype;
            return t2.isQueryAnOption = function (e3, t3) {
              var n3 = this;
              return t3.map(function (e4) {
                return n3.templateInputValue(e4).toLowerCase();
              }).indexOf(e3.toLowerCase()) !== -1;
            }, t2.componentDidMount = function () {
              this.pollInputElement();
            }, t2.componentWillUnmount = function () {
              clearTimeout(this.$pollInput);
            }, t2.pollInputElement = function () {
              var e3 = this;
              this.getDirectInputChanges(), this.$pollInput = setTimeout(function () {
                e3.pollInputElement();
              }, 100);
            }, t2.getDirectInputChanges = function () {
              var e3 = this.elementReferences[-1];
              e3 && e3.value !== this.state.query && this.handleInputChange({
                target: {
                  value: e3.value
                }
              });
            }, t2.componentDidUpdate = function (e3, t3) {
              var n3 = this.state.focused,
                  r2 = n3 === null,
                  o2 = t3.focused !== n3;
              o2 && !r2 && this.elementReferences[n3].focus();
              var i2 = n3 === -1,
                  u2 = o2 && t3.focused === null;

              if (i2 && u2) {
                var a2 = this.elementReferences[n3];
                a2.setSelectionRange(0, a2.value.length);
              }
            }, t2.hasAutoselect = function () {
              return !Z() && this.props.autoselect;
            }, t2.templateInputValue = function (e3) {
              var t3 = this.props.templates && this.props.templates.inputValue;
              return t3 ? t3(e3) : e3;
            }, t2.templateSuggestion = function (e3) {
              var t3 = this.props.templates && this.props.templates.suggestion;
              return t3 ? t3(e3) : e3;
            }, t2.handleComponentBlur = function (e3) {
              var t3,
                  n3 = this.state,
                  r2 = n3.options,
                  o2 = n3.query,
                  i2 = n3.selected;
              this.props.confirmOnBlur ? (t3 = e3.query || o2, this.props.onConfirm(r2[i2])) : t3 = o2, this.setState({
                focused: null,
                menuOpen: e3.menuOpen || false,
                query: t3,
                selected: null,
                validChoiceMade: this.isQueryAnOption(t3, r2)
              });
            }, t2.handleListMouseLeave = function (e3) {
              this.setState({
                hovered: null
              });
            }, t2.handleOptionBlur = function (e3, t3) {
              var n3 = this.state,
                  r2 = n3.focused,
                  o2 = n3.menuOpen,
                  i2 = n3.options,
                  u2 = n3.selected,
                  a2 = e3.relatedTarget === null,
                  l = e3.relatedTarget === this.elementReferences[-1],
                  s = r2 !== t3 && r2 !== -1;

              if (!s && a2 || !(s || l)) {
                var c = o2 && Z();
                this.handleComponentBlur({
                  menuOpen: c,
                  query: this.templateInputValue(i2[u2])
                });
              }
            }, t2.handleInputBlur = function (e3) {
              var t3 = this.state,
                  n3 = t3.focused,
                  r2 = t3.menuOpen,
                  o2 = t3.options,
                  i2 = t3.query,
                  u2 = t3.selected;

              if (!(n3 !== -1)) {
                var a2 = r2 && Z(),
                    l = Z() ? i2 : this.templateInputValue(o2[u2]);
                this.handleComponentBlur({
                  menuOpen: a2,
                  query: l
                });
              }
            }, t2.handleInputChange = function (e3) {
              var n3 = this,
                  t3 = this.props,
                  r2 = t3.minLength,
                  o2 = t3.source,
                  i2 = t3.showAllValues,
                  u2 = this.hasAutoselect(),
                  a2 = e3.target.value,
                  l = a2.length === 0,
                  s = this.state.query !== a2,
                  c = a2.length >= r2;
              this.setState({
                query: a2,
                ariaHint: l
              }), (i2 || s && c) && o2(a2, function (e4) {
                var t4 = 0 < e4.length;
                n3.setState({
                  menuOpen: t4,
                  options: e4,
                  selected: u2 && t4 ? 0 : -1,
                  validChoiceMade: false
                });
              }), c || o2("", function (e4) {
                var t4 = 0 < e4.length;
                n3.setState({
                  menuOpen: t4,
                  options: e4,
                  selected: u2 && t4 ? 0 : -1,
                  validChoiceMade: false
                });
              });
            }, t2.handleInputClick = function (e3) {
              this.handleInputChange(e3);
            }, t2.handleInputFocus = function (e3) {
              var t3 = this.state,
                  n3 = t3.query,
                  r2 = t3.validChoiceMade,
                  o2 = t3.options,
                  i2 = this.props.minLength,
                  u2 = !r2 && n3.length >= i2 && 0 < o2.length;
              u2 ? this.setState(function (e4) {
                var t4 = e4.menuOpen;
                return {
                  focused: -1,
                  menuOpen: u2 || t4,
                  selected: -1
                };
              }) : this.setState({
                focused: -1
              });
            }, t2.handleOptionFocus = function (e3) {
              this.setState({
                focused: e3,
                hovered: null,
                selected: e3
              });
            }, t2.handleOptionMouseEnter = function (e3, t3) {
              Z() || this.setState({
                hovered: t3
              });
            }, t2.handleOptionClick = function (e3, t3) {
              var n3 = this.state.options[t3],
                  r2 = this.templateInputValue(n3);
              this.props.onConfirm(n3), this.setState({
                focused: -1,
                hovered: null,
                menuOpen: false,
                query: r2,
                selected: -1,
                validChoiceMade: true
              }), this.forceUpdate();
            }, t2.handleOptionMouseDown = function (e3) {
              e3.preventDefault();
            }, t2.handleUpArrow = function (e3) {
              e3.preventDefault();
              var t3 = this.state,
                  n3 = t3.menuOpen,
                  r2 = t3.selected;
              r2 !== -1 && n3 && this.handleOptionFocus(r2 - 1);
            }, t2.handleDownArrow = function (e3) {
              var t3 = this;
              if (e3.preventDefault(), this.props.showAllValues && this.state.menuOpen === false) e3.preventDefault(), this.props.source("", function (e4) {
                t3.setState({
                  menuOpen: true,
                  options: e4,
                  selected: 0,
                  focused: 0,
                  hovered: null
                });
              });else if (this.state.menuOpen === true) {
                var n3 = this.state,
                    r2 = n3.menuOpen,
                    o2 = n3.options,
                    i2 = n3.selected;
                i2 !== o2.length - 1 && r2 && this.handleOptionFocus(i2 + 1);
              }
            }, t2.handleSpace = function (e3) {
              var t3 = this;
              this.props.showAllValues && this.state.menuOpen === false && this.state.query === "" && (e3.preventDefault(), this.props.source("", function (e4) {
                t3.setState({
                  menuOpen: true,
                  options: e4
                });
              })), this.state.focused !== -1 && (e3.preventDefault(), this.handleOptionClick(e3, this.state.focused));
            }, t2.handleEnter = function (e3) {
              this.state.menuOpen && (e3.preventDefault(), 0 <= this.state.selected && this.handleOptionClick(e3, this.state.selected));
            }, t2.handlePrintableKey = function (e3) {
              var t3 = this.elementReferences[-1];
              e3.target === t3 || t3.focus();
            }, t2.handleKeyDown = function (e3) {
              switch (u[e3.keyCode]) {
                case "up":
                  this.handleUpArrow(e3);
                  break;

                case "down":
                  this.handleDownArrow(e3);
                  break;

                case "space":
                  this.handleSpace(e3);
                  break;

                case "enter":
                  this.handleEnter(e3);
                  break;

                case "escape":
                  this.handleComponentBlur({
                    query: this.state.query
                  });
                  break;

                default:
                  (function t3(e4) {
                    return 47 < e4 && e4 < 58 || e4 === 32 || e4 === 8 || 64 < e4 && e4 < 91 || 95 < e4 && e4 < 112 || 185 < e4 && e4 < 193 || 218 < e4 && e4 < 223;
                  })(e3.keyCode) && this.handlePrintableKey(e3);
              }
            }, t2.render = function () {
              var e3,
                  i2 = this,
                  t3 = this.props,
                  n3 = t3.cssNamespace,
                  r2 = t3.displayMenu,
                  u2 = t3.id,
                  o2 = t3.minLength,
                  a2 = t3.name,
                  l = t3.placeholder,
                  s = t3.required,
                  c = t3.showAllValues,
                  p = t3.tNoResults,
                  f = t3.tStatusQueryTooShort,
                  d = t3.tStatusNoResults,
                  h = t3.tStatusSelectedOption,
                  m = t3.tStatusResults,
                  v = t3.tAssistiveHint,
                  y = t3.dropdownArrow,
                  b = t3.ariaLabelledBy,
                  _ = this.state,
                  g = _.focused,
                  w = _.hovered,
                  x = _.menuOpen,
                  O = _.options,
                  C = _.query,
                  S = _.selected,
                  E = _.ariaHint,
                  M = _.validChoiceMade,
                  N = this.hasAutoselect(),
                  I = g === -1,
                  k = O.length === 0,
                  A = C.length !== 0,
                  P = C.length >= o2,
                  j = this.props.showNoOptionsFound && I && k && A && P,
                  L = n3 + "__wrapper",
                  B = n3 + "__input",
                  T = g !== null ? " " + B + "--focused" : "",
                  D = this.props.showAllValues ? " " + B + "--show-all-values" : " " + B + "--default",
                  F = n3 + "__dropdown-arrow-down",
                  R = g !== -1 && g !== null,
                  U = n3 + "__menu",
                  V = U + "--" + r2,
                  q = U + "--" + (x || j ? "visible" : "hidden"),
                  W = n3 + "__option",
                  H = n3 + "__hint",
                  K = this.templateInputValue(O[S]),
                  Q = K && K.toLowerCase().indexOf(C.toLowerCase()) === 0 && N ? C + K.substr(C.length) : "",
                  z = u2 + "__assistiveHint",
                  G = E ? {
                "aria-describedby": z
              } : null;
              return c && typeof (e3 = y({
                className: F
              })) == "string" && (e3 = (0, J.createElement)("div", {
                className: n3 + "__dropdown-arrow-down-wrapper",
                dangerouslySetInnerHTML: {
                  __html: e3
                }
              })), (0, J.createElement)("div", {
                className: L,
                onKeyDown: this.handleKeyDown
              }, (0, J.createElement)(X["default"], {
                id: u2,
                length: O.length,
                queryLength: C.length,
                minQueryLength: o2,
                selectedOption: this.templateInputValue(O[S]),
                selectedOptionIndex: S,
                validChoiceMade: M,
                isInFocus: this.state.focused !== null,
                tQueryTooShort: f,
                tNoResults: d,
                tSelectedOption: h,
                tResults: m
              }), Q && (0, J.createElement)("span", null, (0, J.createElement)("input", {
                className: H,
                readonly: true,
                tabIndex: "-1",
                value: Q
              })), (0, J.createElement)("input", Y({
                "aria-expanded": x ? "true" : "false",
                "aria-activedescendant": R ? u2 + "__option--" + g : void 0,
                "aria-owns": u2 + "__listbox",
                "aria-autocomplete": this.hasAutoselect() ? "both" : "list"
              }, G, {
                autoComplete: "off",
                className: "" + B + T + D,
                id: u2,
                onClick: function onClick(e4) {
                  return i2.handleInputClick(e4);
                },
                onBlur: this.handleInputBlur
              }, function $(e4) {
                return {
                  onInput: e4
                };
              }(this.handleInputChange), {
                onFocus: this.handleInputFocus,
                name: a2,
                placeholder: l,
                ref: function ref(e4) {
                  i2.elementReferences[-1] = e4;
                },
                type: "text",
                role: "combobox",
                required: s,
                value: C
              })), e3, (0, J.createElement)("ul", {
                className: U + " " + V + " " + q,
                onMouseLeave: function onMouseLeave(e4) {
                  return i2.handleListMouseLeave(e4);
                },
                "aria-labelledby": b,
                id: u2 + "__listbox",
                role: "listbox"
              }, O.map(function (e4, t4) {
                var n4 = (g === -1 ? S === t4 : g === t4) && w === null ? " " + W + "--focused" : "",
                    r3 = t4 % 2 ? " " + W + "--odd" : "",
                    o3 = Z() ? "<span id=" + u2 + "__option-suffix--" + t4 + ' style="border:0;clip:rect(0 0 0 0);height:1px;marginBottom:-1px;marginRight:-1px;overflow:hidden;padding:0;position:absolute;whiteSpace:nowrap;width:1px"> ' + (t4 + 1) + " of " + O.length + "</span>" : "";
                return (0, J.createElement)("li", {
                  "aria-selected": g === t4 ? "true" : "false",
                  className: "" + W + n4 + r3,
                  dangerouslySetInnerHTML: {
                    __html: i2.templateSuggestion(e4) + o3
                  },
                  id: u2 + "__option--" + t4,
                  key: t4,
                  onBlur: function onBlur(e5) {
                    return i2.handleOptionBlur(e5, t4);
                  },
                  onClick: function onClick(e5) {
                    return i2.handleOptionClick(e5, t4);
                  },
                  onMouseDown: i2.handleOptionMouseDown,
                  onMouseEnter: function onMouseEnter(e5) {
                    return i2.handleOptionMouseEnter(e5, t4);
                  },
                  ref: function ref(e5) {
                    i2.elementReferences[t4] = e5;
                  },
                  role: "option",
                  tabIndex: "-1",
                  "aria-posinset": t4 + 1,
                  "aria-setsize": O.length
                });
              }), j && (0, J.createElement)("li", {
                className: W + " " + W + "--no-results"
              }, p())), (0, J.createElement)("span", {
                id: z,
                style: {
                  display: "none"
                }
              }, v()));
            }, e2;
          }(J.Component);

          (t["default"] = a).defaultProps = {
            autoselect: false,
            cssNamespace: "autocomplete",
            defaultValue: "",
            displayMenu: "inline",
            minLength: 0,
            name: "input-autocomplete",
            placeholder: "",
            onConfirm: function onConfirm() {},
            confirmOnBlur: true,
            showNoOptionsFound: true,
            showAllValues: false,
            required: false,
            tNoResults: function tNoResults() {
              return "No results found";
            },
            tAssistiveHint: function tAssistiveHint() {
              return "When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.";
            },
            dropdownArrow: r["default"],
            ariaLabelledBy: void 0
          };
        }, function (e, t, r) {
          var o = r(9),
              i = r(53),
              u = r(28),
              a = r(26)("IE_PROTO"),
              l = function l() {},
              s = "prototype",
              _c = function c() {
            var e2,
                t2 = r(15)("iframe"),
                n = u.length;

            for (t2.style.display = "none", r(54).appendChild(t2), t2.src = "javascript:", (e2 = t2.contentWindow.document).open(), e2.write("<script>document.F=Object</script>"), e2.close(), _c = e2.F; n--;) {
              delete _c[s][u[n]];
            }

            return _c();
          };

          e.exports = Object.create || function (e2, t2) {
            var n;
            return e2 !== null ? (l[s] = o(e2), n = new l(), l[s] = null, n[a] = e2) : n = _c(), t2 === void 0 ? n : i(n, t2);
          };
        }, function (e, t, n) {
          var u = n(8),
              a = n(9),
              l = n(20);
          e.exports = n(3) ? Object.defineProperties : function (e2, t2) {
            a(e2);

            for (var n2, r = l(t2), o = r.length, i = 0; i < o;) {
              u.f(e2, n2 = r[i++], t2[n2]);
            }

            return e2;
          };
        }, function (e, t, n) {
          var r = n(1).document;
          e.exports = r && r.documentElement;
        }, function (e, t, n) {
          var r = n(0);
          r(r.P, "Function", {
            bind: n(56)
          });
        }, function (e, t, n) {
          "use strict";

          var i = n(19),
              u = n(2),
              a = n(57),
              l = [].slice,
              s = {};

          e.exports = Function.bind || function (t2) {
            var n2 = i(this),
                r = l.call(arguments, 1),
                o = function o() {
              var e2 = r.concat(l.call(arguments));
              return this instanceof o ? function (e3, t3, n3) {
                if (!(t3 in s)) {
                  for (var r2 = [], o2 = 0; o2 < t3; o2++) {
                    r2[o2] = "a[" + o2 + "]";
                  }

                  s[t3] = Function("F,a", "return new F(" + r2.join(",") + ")");
                }

                return s[t3](e3, n3);
              }(n2, e2.length, e2) : a(n2, e2, t2);
            };

            return u(n2.prototype) && (o.prototype = n2.prototype), o;
          };
        }, function (e, t) {
          e.exports = function (e2, t2, n) {
            var r = n === void 0;

            switch (t2.length) {
              case 0:
                return r ? e2() : e2.call(n);

              case 1:
                return r ? e2(t2[0]) : e2.call(n, t2[0]);

              case 2:
                return r ? e2(t2[0], t2[1]) : e2.call(n, t2[0], t2[1]);

              case 3:
                return r ? e2(t2[0], t2[1], t2[2]) : e2.call(n, t2[0], t2[1], t2[2]);

              case 4:
                return r ? e2(t2[0], t2[1], t2[2], t2[3]) : e2.call(n, t2[0], t2[1], t2[2], t2[3]);
            }

            return e2.apply(n, t2);
          };
        }, function (e, t, n) {
          n(59)("match", 1, function (r, o, e2) {
            return [function (e3) {
              "use strict";

              var t2 = r(this),
                  n2 = e3 == void 0 ? void 0 : e3[o];
              return n2 !== void 0 ? n2.call(e3, t2) : new RegExp(e3)[o](String(t2));
            }, e2];
          });
        }, function (e, t, n) {
          "use strict";

          var a = n(7),
              l = n(16),
              s = n(4),
              c = n(12),
              p = n(34);

          e.exports = function (t2, e2, n2) {
            var r = p(t2),
                o = n2(c, r, ""[t2]),
                i = o[0],
                u = o[1];
            s(function () {
              var e3 = {};
              return e3[r] = function () {
                return 7;
              }, ""[t2](e3) != 7;
            }) && (l(String.prototype, t2, i), a(RegExp.prototype, r, e2 == 2 ? function (e3, t3) {
              return u.call(e3, this, t3);
            } : function (e3) {
              return u.call(e3, this);
            }));
          };
        }, function (e, t, n) {
          "use strict";

          t.__esModule = true, t["default"] = void 0, n(36);

          var _ = n(5);

          var r = function r2(o2, i, u) {
            var a;
            return function () {
              var e2 = this,
                  t2 = arguments,
                  n2 = function n3() {
                a = null, u || o2.apply(e2, t2);
              },
                  r3 = u && !a;

              clearTimeout(a), a = setTimeout(n2, i), r3 && o2.apply(e2, t2);
            };
          },
              o = function (o2) {
            function e2() {
              for (var e3, t3 = arguments.length, n2 = new Array(t3), r2 = 0; r2 < t3; r2++) {
                n2[r2] = arguments[r2];
              }

              return (e3 = o2.call.apply(o2, [this].concat(n2)) || this).state = {
                bump: false,
                debounced: false
              }, e3;
            }

            (function n2(e3, t3) {
              e3.prototype = Object.create(t3.prototype), (e3.prototype.constructor = e3).__proto__ = t3;
            })(e2, o2);

            var t2 = e2.prototype;
            return t2.componentWillMount = function () {
              var e3 = this;
              this.debounceStatusUpdate = r(function () {
                if (!e3.state.debounced) {
                  var t3 = !e3.props.isInFocus || e3.props.validChoiceMade;
                  e3.setState(function (e4) {
                    return {
                      bump: !e4.bump,
                      debounced: true,
                      silenced: t3
                    };
                  });
                }
              }, 1400);
            }, t2.componentWillReceiveProps = function (e3) {
              e3.queryLength;
              this.setState({
                debounced: false
              });
            }, t2.render = function () {
              var e3 = this.props,
                  t3 = e3.id,
                  n2 = e3.length,
                  r2 = e3.queryLength,
                  o3 = e3.minQueryLength,
                  i = e3.selectedOption,
                  u = e3.selectedOptionIndex,
                  a = e3.tQueryTooShort,
                  l = e3.tNoResults,
                  s = e3.tSelectedOption,
                  c = e3.tResults,
                  p = this.state,
                  f = p.bump,
                  d = p.debounced,
                  h = p.silenced,
                  m = r2 < o3,
                  v = n2 === 0,
                  y = i ? s(i, n2, u) : "",
                  b = null;
              return b = m ? a(o3) : v ? l() : c(n2, y), this.debounceStatusUpdate(), (0, _.createElement)("div", {
                style: {
                  border: "0",
                  clip: "rect(0 0 0 0)",
                  height: "1px",
                  marginBottom: "-1px",
                  marginRight: "-1px",
                  overflow: "hidden",
                  padding: "0",
                  position: "absolute",
                  whiteSpace: "nowrap",
                  width: "1px"
                }
              }, (0, _.createElement)("div", {
                id: t3 + "__status--A",
                role: "status",
                "aria-atomic": "true",
                "aria-live": "polite"
              }, !h && d && f ? b : ""), (0, _.createElement)("div", {
                id: t3 + "__status--B",
                role: "status",
                "aria-atomic": "true",
                "aria-live": "polite"
              }, h || !d || f ? "" : b));
            }, e2;
          }(_.Component);

          (t["default"] = o).defaultProps = {
            tQueryTooShort: function tQueryTooShort(e2) {
              return "Type in " + e2 + " or more characters for results";
            },
            tNoResults: function tNoResults() {
              return "No search results";
            },
            tSelectedOption: function tSelectedOption(e2, t2, n2) {
              return e2 + " " + (n2 + 1) + " of " + t2 + " is highlighted";
            },
            tResults: function tResults(e2, t2) {
              return e2 + " " + (e2 === 1 ? "result" : "results") + " " + (e2 === 1 ? "is" : "are") + " available. " + t2;
            }
          };
        }, function (e, t, n) {
          "use strict";

          t.__esModule = true, t["default"] = void 0;

          var r = n(5),
              o = function i(e2) {
            var t2 = e2.className;
            return (0, r.createElement)("svg", {
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              className: t2,
              focusable: "false"
            }, (0, r.createElement)("g", {
              stroke: "none",
              fill: "none",
              "fill-rule": "evenodd"
            }, (0, r.createElement)("polygon", {
              fill: "#000000",
              points: "0 0 22 0 11 17"
            })));
          };

          t["default"] = o;
        }])["default"];
      });
    }
  }); // src/js/autocomplete.js


  var import_accessible_autocomplete = __toModule(require_accessible_autocomplete_min());

  function highlightSuggestion(suggestion, query) {
    var result = suggestion.split("");
    var matchIndex = suggestion.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
    return result.map(function (character, index) {
      var shouldHighlight = true;
      var hasMatched = matchIndex > -1;
      var characterIsWithinMatch = index >= matchIndex && index <= matchIndex + query.length - 1;

      if (hasMatched && characterIsWithinMatch) {
        shouldHighlight = false;
      }

      return [character, shouldHighlight];
    });
  }

  function createLoadingContainer() {
    var fragment = document.createRange().createContextualFragment("\n\t\t<div class=\"o-autocomplete__menu-loading-container\">\n\t\t\t<div class=\"o-autocomplete__menu-loading\"></div>\n\t\t</div>\n\t");
    return fragment.querySelector("*");
  }

  function showLoadingPane(instance) {
    instance.container.appendChild(instance.loadingContainer);
    var menu = instance.container.querySelector(".o-autocomplete__menu");

    if (menu) {
      menu.classList.add("o-autocomplete__menu--loading");
    }
  }

  function hideLoadingPane(instance) {
    if (instance.container.contains(instance.loadingContainer)) {
      instance.container.removeChild(instance.loadingContainer);
    }

    var menu = instance.container.querySelector(".o-autocomplete__menu");

    if (menu) {
      menu.classList.remove("o-autocomplete__menu--loading");
    }
  }

  function createClearButton(id) {
    var fragment = document.createRange().createContextualFragment("\n\t\t<button class=\"o-autocomplete__clear\" type=\"button\" aria-controls=\"".concat(id, "\" title=\"Clear input\">\n\t\t\t<span class=\"o-autocomplete__visually-hidden\">Clear input</span>\n\t\t</button>\n\t"));
    return fragment.querySelector("*");
  }

  function initClearButton(instance) {
    var input = instance.autocompleteEl.querySelector("input");
    var clearButton = createClearButton(input.id);
    var timeout = null;
    clearButton.addEventListener("click", function () {
      hideLoadingPane(instance);
      clearButton.parentElement.removeChild(clearButton);
      input.value = "";

      if (!timeout) {
        timeout = setTimeout(function () {
          input.focus();
          timeout = null;
        }, 110);
      }
    });
    input.addEventListener("input", function () {
      var textInInput = input.value.length > 0;
      var clearButtonOnPage = instance.autocompleteEl.contains(clearButton);

      if (textInInput) {
        if (!clearButtonOnPage) {
          instance.autocompleteEl.appendChild(clearButton);
        }
      } else {
        if (clearButtonOnPage) {
          clearButton.parentElement.removeChild(clearButton);
        }
      }
    });
  }

  var Autocomplete = /*#__PURE__*/function () {
    "use strict";

    function Autocomplete(autocompleteEl, options) {
      var _this = this;

      _classCallCheck(this, Autocomplete);

      this.autocompleteEl = autocompleteEl;
      var opts = options || Autocomplete.getDataAttributes(autocompleteEl);
      this.options = {};

      if (opts.source) {
        this.options.source = opts.source;
      }

      if (opts.mapOptionToSuggestedValue) {
        this.options.mapOptionToSuggestedValue = opts.mapOptionToSuggestedValue;
      }

      if (opts.onConfirm) {
        this.options.onConfirm = opts.onConfirm;
      }

      var container = document.createElement("div");
      container.classList.add("o-autocomplete__listbox-container");
      this.container = container;
      var selectInputElement = autocompleteEl.querySelector("select");

      if (!this.options.source && !selectInputElement) {
        throw new Error("Could not find a source for auto-completion options. Add a `select` element to your markup, or configure a `source` function to fetch autocomplete options.");
      }

      if (this.options.source) {
        var customSource = typeof this.options.source === "string" ? window[this.options.source] : this.options.source;
        this.mapOptionToSuggestedValue = typeof this.options.mapOptionToSuggestedValue === "string" ? window[this.options.mapOptionToSuggestedValue] : this.options.mapOptionToSuggestedValue;

        this.options.source = function (query, populateOptions) {
          showLoadingPane(_this);

          var callback = function callback(options2) {
            hideLoadingPane(_this);
            populateOptions(options2);
          };

          customSource(query, callback);
        };

        var input = autocompleteEl.querySelector("input");
        var id = input.getAttribute("id");
        var name = input.getAttribute("name");
        var placeholder = input.getAttribute("placeholder");
        var isRequired = input.hasAttribute("required");

        if (!id) {
          throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
        }

        this.autocompleteEl.innerHTML = "";
        this.autocompleteEl.appendChild(this.container);
        (0, import_accessible_autocomplete.default)({
          element: this.container,
          id: id,
          name: name,
          placeholder: placeholder,
          required: isRequired,
          onConfirm: function onConfirm(option) {
            if (option && _this.options.onConfirm) {
              _this.options.onConfirm(option);
            }
          },
          source: this.options.source,
          cssNamespace: "o-autocomplete",
          displayMenu: "overlay",
          showNoOptionsFound: false,
          templates: {
            suggestion: function suggestion(option) {
              if (typeof option !== "undefined") {
                if (typeof _this.mapOptionToSuggestedValue === "function") {
                  option = _this.mapOptionToSuggestedValue(option);
                } else if (typeof option !== "string") {
                  throw new Error("The option trying to be displayed as a suggestion is not a string, it is \"".concat(_typeof(option), "\". o-autocomplete can only display strings as suggestions. Define a `mapOptionToSuggestedValue` function to convert the option into a string to be used as the suggestion."));
                }
              }

              return _this.suggestionTemplate(option);
            },
            inputValue: function inputValue(option) {
              if (typeof option !== "undefined") {
                if (typeof _this.mapOptionToSuggestedValue === "function") {
                  option = _this.mapOptionToSuggestedValue(option);
                } else if (typeof option !== "string") {
                  throw new Error("The option trying to be displayed as a suggestion is not a string, it is \"".concat(_typeof(option), "\". o-autocomplete can only display strings as suggestions. Define a `mapOptionToSuggestedValue` function to convert the option into a string to be used as the suggestion."));
                }
              }

              return option;
            }
          }
        });
      } else {
        var _id = selectInputElement.getAttribute("id");

        var _name = selectInputElement.getAttribute("name");

        var _isRequired = selectInputElement.hasAttribute("required");

        if (!_id) {
          throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
        }

        this.autocompleteEl.appendChild(this.container);
        this.container.appendChild(selectInputElement);
        import_accessible_autocomplete.default.enhanceSelectElement({
          selectElement: selectInputElement,
          name: _name,
          required: _isRequired,
          onConfirm: function onConfirm(option) {
            if (option && _this.options.onConfirm) {
              _this.options.onConfirm(option);
            }
          },
          autoselect: false,
          defaultValue: "",
          placeholder: "",
          cssNamespace: "o-autocomplete",
          displayMenu: "overlay",
          showNoOptionsFound: false,
          templates: {
            suggestion: this.suggestionTemplate.bind(this)
          }
        });
        selectInputElement.parentElement.removeChild(selectInputElement);
      }

      this.loadingContainer = createLoadingContainer();
      initClearButton(this);
    }

    _createClass(Autocomplete, [{
      key: "suggestionTemplate",
      value: function suggestionTemplate(suggestedValue) {
        var characters = highlightSuggestion(suggestedValue, this.autocompleteEl.querySelector("input").value);
        var output = "";

        var _iterator2 = _createForOfIteratorHelper(characters),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _slicedToArray(_step2.value, 2),
                character = _step2$value[0],
                shoudHighlight = _step2$value[1];

            if (shoudHighlight) {
              output += "<span class=\"o-autocomplete__option--highlight\">".concat(character, "</span>");
            } else {
              output += "".concat(character);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var span = document.createElement("span");
        span.setAttribute("aria-label", suggestedValue);
        span.innerHTML = output;
        return span.outerHTML;
      }
    }], [{
      key: "getDataAttributes",
      value: function getDataAttributes(autocompleteEl) {
        if (!(autocompleteEl instanceof HTMLElement)) {
          return {};
        }

        if (autocompleteEl.dataset.oAutocompleteSource) {
          return {
            source: autocompleteEl.dataset.oAutocompleteSource
          };
        } else {
          return {};
        }
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

        if (rootElement instanceof HTMLElement && rootElement.matches("[data-o-component=o-autocomplete]")) {
          return new Autocomplete(rootElement, options);
        }

        return Array.from(rootElement.querySelectorAll('[data-o-component="o-autocomplete"]'), function (rootEl) {
          return new Autocomplete(rootEl, options);
        });
      }
    }]);

    return Autocomplete;
  }();

  var autocomplete_default = Autocomplete; // main.js

  var constructAll = function constructAll() {
    autocomplete_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/dynamic/dynamic.js

  window.customSuggestions = function customSuggestions(query, populateOptions) {
    var suggestions = ["Afghanistan", "Akrotiri", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Islands", "Australia", "Austria", "Azerbaijan", "Bahamas, The", "Bahrain", "Bangladesh", "Barbados", "Bassas da India", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Coral Sea Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dhekelia", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia,", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jersey", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paracel Islands", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tromelin Island", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wake Island", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];

    if (!query) {
      populateOptions([]);
      return;
    }

    suggestions.sort(function (a, b) {
      return a.localeCompare(b);
    });
    var filteredOptions = [];

    for (var _i2 = 0, _suggestions = suggestions; _i2 < _suggestions.length; _i2++) {
      var suggestion = _suggestions[_i2];
      var lowercaseSuggestion = suggestion.toLocaleLowerCase();

      if (lowercaseSuggestion.startsWith(query.toLocaleLowerCase())) {
        filteredOptions.push(suggestion);
      }
    }

    populateOptions(filteredOptions);
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L2FjY2Vzc2libGVBdXRvY29tcGxldGUvd2VicGFjay9ib290c3RyYXAiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmljdC1tZXRob2QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktbWV0aG9kcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L2FjY2Vzc2libGVBdXRvY29tcGxldGUvd3JhcHBlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19saWJyYXJ5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmJpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ludm9rZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9hY2Nlc3NpYmxlQXV0b2NvbXBsZXRlL3N0YXR1cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS9kcm9wZG93bi1hcnJvdy1kb3duLmpzIiwic3JjL2pzL2F1dG9jb21wbGV0ZS5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZHluYW1pYy9keW5hbWljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFBLFNBQUEsZ0NBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0EsZ0JBQUEsT0FBQSxLQUFBLFFBQUEsSUFBQSxRQUFBLE1BQUEsS0FBQSxRQUFBLEdBQ0EsTUFBQSxDQUFBLE9BQUEsR0FBQSxDQUFBLEVBREEsR0FFQSxPQUFBLE1BQUEsSUFBQSxVQUFBLElBQUEsTUFBQSxDQUFBLEdBQUEsR0FDQSxNQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FEQSxHQUVBLFFBQUEsT0FBQSxLQUFBLFFBQUEsR0FDQSxPQUFBLENBQUEsd0JBQUEsQ0FBQSxHQUFBLENBQUEsRUFEQSxHQUdBLENBQUEsQ0FBQSx3QkFBQSxDQUFBLEdBQUEsQ0FBQSxFQVBBO09BREEsRUFTQyxNQVRELEVBU0MsWUFBQTtBQUNELGVBQUEsVUFBQSxDQUFBLEVBQUE7QUNUQSxjQUFBLENBQUEsR0FBQSxFQUFBOztBQUdBLG1CQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUE7QUFHQSxnQkFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQ0EsT0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsT0FBQTtBQUdBLGdCQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUE7QUFDQSxjQUFBLENBQUEsRUFBQSxDQURBO0FBRUEsY0FBQSxDQUFBLEVBQUEsS0FGQTtBQUdBLGNBQUEsT0FBQSxFQUFBO0FBSEEsYUFBQTtBQWFBLG1CQU5BLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLEdBR0EsQ0FBQSxDQUFBLENBQUEsR0FBQSxJQUhBLEVBTUEsQ0FBQSxDQUFBLE9BQUE7OztBQTBEQSxpQkFyREEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEVBR0EsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUhBLEVBTUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsWUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEtBQ0EsTUFBQSxDQUFBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQTBDLGNBQUEsVUFBQSxFQUFBLElBQTFDO0FBQTBDLGNBQUEsR0FBQSxFQUFBO0FBQTFDLGFBQUEsQ0FEQTtXQVBBLEVBYUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxVQUFBLENBQUEsRUFBQTtBQUNBLG1CQUFBLE1BQUEsSUFBQSxXQUFBLElBQUEsTUFBQSxDQUFBLFdBQUEsSUFDQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsV0FBQSxFQUFBO0FBQXdELGNBQUEsS0FBQSxFQUFBO0FBQXhELGFBQUEsQ0FEQSxFQUdBLE1BQUEsQ0FBQSxjQUFBLENBQUEsQ0FBQSxFQUFBLFlBQUEsRUFBQTtBQUFpRCxjQUFBLEtBQUEsRUFBQTtBQUFqRCxhQUFBLENBSEE7V0FkQSxFQXlCQSxDQUFBLENBQUEsQ0FBQSxHQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQUVBLGdCQURBLElBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQ0EsSUFBQSxDQUFBLEVBQUEsT0FBQSxDQUFBO0FBQ0EsZ0JBQUEsSUFBQSxDQUFBLElBQUEsUUFBQSxDQUFBLEtBQUEsUUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUNBLGdCQUFBLEVBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQTtBQUdBLGdCQUZBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxHQUNBLE1BQUEsQ0FBQSxjQUFBLENBQUEsRUFBQSxFQUFBLFNBQUEsRUFBQTtBQUF5QyxjQUFBLFVBQUEsRUFBQSxJQUF6QztBQUF5QyxjQUFBLEtBQUEsRUFBQTtBQUF6QyxhQUFBLENBREEsRUFFQSxJQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxRQUFBLEVBQUEsS0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsVUFBQSxFQUFBLEVBQUE7QUFBZ0gsdUJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTtlQUFoSCxDQUFxSSxJQUFySSxDQUFxSSxJQUFySSxFQUFxSSxFQUFySSxDQUFBO0FBQUE7QUFDQSxtQkFBQSxFQUFBO1dBakNBLEVBcUNBLENBQUEsQ0FBQSxDQUFBLEdBQUEsVUFBQSxDQUFBLEVBQUE7QUFDQSxnQkFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLEdBQ0EsWUFBQTtBQUEyQixxQkFBQSxDQUFBLENBQUEsU0FBQSxDQUFBO2FBRDNCLEdBRUEsWUFBQTtBQUFpQyxxQkFBQSxDQUFBO2FBRmpDO0FBSUEsbUJBREEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsR0FDQSxDQUFBO1dBMUNBLEVBOENBLENBQUEsQ0FBQSxDQUFBLEdBQUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQXNELG1CQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBO1dBOUN0RCxFQWlEQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEdBakRBLEVBcURBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQTtTRHhFQSxDQ3dFQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUNsRkEsY0FBQSxDQUFBLEdBQWEsQ0FBQSxDQUFRLENBQVIsQ0FBYjtBQUFBLGNBQ0EsQ0FBQSxHQUFXLENBQUEsQ0FBUSxDQUFSLENBRFg7QUFBQSxjQUVBLENBQUEsR0FBVyxDQUFBLENBQVEsQ0FBUixDQUZYO0FBQUEsY0FHQSxDQUFBLEdBQWUsQ0FBQSxDQUFRLEVBQVIsQ0FIZjtBQUFBLGNBSUEsQ0FBQSxHQUFVLENBQUEsQ0FBUSxFQUFSLENBSlY7QUFBQSxjQUtBLENBQUEsR0FBQSxXQUxBO0FBQUEsY0FPQSxDQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxnQkFRQSxDQVJBO0FBQUEsZ0JBUUEsQ0FSQTtBQUFBLGdCQVFBLENBUkE7QUFBQSxnQkFRQSxDQVJBO0FBQUEsZ0JBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLGdCQUNBLENBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBREE7QUFBQSxnQkFFQSxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUZBO0FBQUEsZ0JBR0EsQ0FBQSxHQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsQ0FIQTtBQUFBLGdCQUlBLENBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBSkE7QUFBQSxnQkFLQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsR0FBa0YsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsRUFBQSxFQUF1QixDQUF2QixDQUxsRjtBQUFBLGdCQU1BLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxDQU5BO0FBQUEsZ0JBT0EsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQVBBOztBQVVBLGlCQUFBLENBQUEsSUFEQSxDQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUNBLEVBQUE7QUFJQSxjQUFBLENBQUEsR0FGQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsS0FBQSxDQUFBLElBRUEsQ0FGQSxHQUVBLEVBRkEsRUFFQSxDQUZBLENBRUEsRUFFQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxVQUFBLEdBQUEsQ0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FGQSxFQUlBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBSkEsRUFNQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFB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Q0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLE9BQUEsRUFBQSxDQUFBLEdBQUEsVUFBQTs7QUFFQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUEyQyxFQUFBLENBQUEsVUFBM0MsQ0FBQSxFQUEyQyxFQUEzQyxDQUFBLEVBQTJDLElBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxRQUEzQyxDQUFBOzs7QUFHQSxjQUFBLENBQUEsR0FBQSx3REFBQTtBQUFBLGNBRUEsQ0FBQSxHQUFBLEVBRkE7O0FBSUEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtBQUFBLGFBQ0EsRUFBQSxDQUFBLE1BREEsS0FDQSxFQUFBLENBQUEsTUFBQSxHQUFBLElBREEsS0FDQSxDQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsS0FBQSxDQURBLElBRUEsQ0FBQSxDQUFBLENBQUEsaUJBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUZBOzs7QUFNQSxtQkFBQSxDQUFBLEdBQUE7QUFDQSxnQkFBQSxFQUFBO0FBQUEsZ0JBQ0EsRUFBQSxHQUFBLENBREE7O0FBR0EsaUJBREEsQ0FBQSxHQUFBLEVBQ0EsRUFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQTtBQUNBLGNBQUEsRUFBQSxDQUFBLE1BQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBO0FBREE7OztBQWVBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsRUFBQSxDQUFBLGtCQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxRQUFBLENBQUEsV0FBQSxPQUFBLEVBQUEsQ0FBQSxXQUFBLEVBQUE7OztBQUdBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUE7QUFDQSxnQkFBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBc0IsRUFBQSxDQUFBLFVBQXRCLENBQUE7QUFDQSxZQUFBLEVBQUEsQ0FBQSxRQUFBLEdBQUEsRUFBQSxDQUFBLFFBQUE7QUFFQSxnQkFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLFFBQUEsQ0FBQSxZQUFBO0FBQ0EsZ0JBQUEsRUFBQSxLQUFBLEtBQUEsQ0FBQSxFQUNBLEtBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNBLGNBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLEtBQUEsQ0FBQSxLQUNBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQURBO0FBREE7QUFPQSxtQkFBQSxFQUFBOzs7QUFTQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxVQUFBO0FBQ0EsWUFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxFQUFBLENBQUE7OztBQUdBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBR0EsZ0JBRkEsRUFBQSxLQUFBLFdBQUEsS0FBQSxFQUFBLEdBQUEsT0FBQSxHQUVBLEVBQUEsS0FBQSxLQUFBLEVBQUEsQ0FBQSxLLElBQXVCLEVBQUEsS0FBQSxLLEVBQ3ZCLEVBQUEsSUFBQSxFQUFBLENBQUEsSUFBQSxDQUFBLEVBQ0EsRUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBLENBREEsQyxTQUVFLEVBQUEsS0FBQSxPQUFBLElBQUEsRTtBQUVBLGtCQUFBLEVBQUEsS0FBQSxPQUFBLEVBQUE7QUFJRixvQkFIQSxFQUFBLElBQUEsT0FBQSxFQUFBLElBQUEsUUFBQSxJQUFBLE9BQUEsRUFBQSxJQUFBLFFBQUEsS0FDQSxFQUFBLENBQUEsS0FBQSxDQUFBLE9BQUEsR0FBQSxFQUFBLElBQUEsRUFEQSxHQUdBLEVBQUEsSUFBQSxRQUFBLEVBQUEsS0FBQSxRQUFBLEVBQUE7QUFDQSxzQkFBQSxPQUFBLEVBQUEsSUFBQSxRQUFBLEVBQ0EsS0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0Esb0JBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsS0FBQSxDQUFBLEVBQUEsSUFBQSxFQUFBO0FBREE7O0FBSUEsdUJBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxJQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLFFBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsTUFBQSxLQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBO0FBREE7O2VBVkUsTSxJQWNBLEVBQUEsS0FBQSx5QixFQUNGLEVBQUEsS0FBQSxFQUFBLENBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxNQUFBLElBQUEsRUFBQSxDQUFBLEMsU0FDRSxFQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxHLEVBQUE7QUFDRixvQkFBQSxFQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQTtBQUNBLGdCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsV0FBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsRUFDQSxFQUFBLEdBQ0EsRUFBQSxJQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxDQURBLEdBR0EsRUFBQSxDQUFBLG1CQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBLENBSkEsRUFNQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLEtBQUEsRUFBQSxDQUFBLFVBQUEsR0FBQSxFQUFBLENBQUEsRUFBMkMsRUFBM0MsSUFBMkMsRUFOM0M7eUJBT0UsRUFBQSxLQUFBLE1BQUEsSUFBQSxFQUFBLEtBQUEsTUFBQSxJQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFLEVBQUE7QUFDRixvQkFBQTtBQUNBLGtCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsSUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBO2lCQURBLEMsT0FFRyxFLEVBQUEsQzs7QUFDSCxnQkFBQSxFQUFBLElBQUEsSUFBQSxJQUFBLEVBQUEsS0FBQSxLQUFBLElBQUEsRUFBQSxJQUFBLFlBQUEsSUFBQSxFQUFBLENBQUEsZUFBQSxDQUFBLEVBQUEsQ0FBQTtxQkFDRTtBQUNGLG9CQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQTtBQUVBLGdCQUFBLEVBQUEsSUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBLEtBQUEsR0FDQSxFQUFBLEdBQUEsRUFBQSxDQUFBLGlCQUFBLENBQUEsOEJBQUEsRUFBQSxFQUFBLENBQUEsV0FBQSxFQUFBLENBQUEsR0FBc0YsRUFBQSxDQUFBLGVBQUEsQ0FBQSxFQUFBLENBRHRGLEdBRUcsT0FBQSxFQUFBLElBQUEsVUFBQSxLQUNILEVBQUEsR0FBQSxFQUFBLENBQUEsY0FBQSxDQUFBLDhCQUFBLEVBQUEsRUFBQSxDQUFBLFdBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxHQUEwRixFQUFBLENBQUEsWUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBRHZGLENBRkg7O21CQWxDQSxFQUFBLENBQUEsU0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBOzs7QUEwQ0EsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLEtBQUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLEtBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQTs7O0FBR0EsY0FBQSxDQUFBLEdBQUEsRUFBQTtBQUFBLGNBRUEsQ0FBQSxHQUFBLENBRkE7QUFBQSxjQUlBLENBQUEsR0FBQSxLQUpBO0FBQUEsY0FNQSxDQUFBLEdBQUEsS0FOQTs7QUFRQSxtQkFBQSxDQUFBLEdBQUE7QUFFQSxpQkFBQSxJQURBLEVBQ0EsRUFBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQTtBQUNBLGNBQUEsQ0FBQSxDQUFBLFVBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUNBLEVBQUEsQ0FBQSxpQkFBQSxJQUFBLEVBQUEsQ0FBQSxpQkFBQSxFQURBO0FBREE7OztBQU1BLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLFlBQUEsQ0FBQSxPQUNBLENBQUEsR0FBQSxFQUFBLElBQUEsSUFBQSxJQUFBLEVBQUEsQ0FBQSxlQUFBLEtBQUEsS0FBQSxDQUFBLEVBRUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxJQUFBLElBQUEsRUFBQSxtQkFBQSxFQUFBLENBSEEsQ0FBQTtBQU1BLGdCQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtBQVVBLG1CQVJBLEVBQUEsSUFBQSxFQUFBLENBQUEsVUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsV0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBRUEsQ0FGQSxLQUdBLENBQUEsR0FBQSxLQUFBLEVBRUEsRUFBQSxJQUFBLENBQUEsRUFMQSxDQUFBLEVBUUEsRUFBQTs7O0FBR0EsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxnQkFBQSxFQUFBLEdBQUEsRUFBQTtBQUFBLGdCQUNBLEVBQUEsR0FBQSxDQURBO0FBS0EsZ0JBRkEsRUFBQSxJQUFBLElBQUEsSUFBQSxPQUFBLEVBQUEsSUFBQSxTQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsR0FFQSxPQUFBLEVBQUEsSUFBQSxRQUFBLElBQUEsT0FBQSxFQUFBLElBQUEsUUFBQSxFQWVBLE9BZEEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxTQUFBLEtBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBLFVBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxJQUNBLEVBQUEsQ0FBQSxTQUFBLElBQUEsRUFBQSxLQUNBLEVBQUEsQ0FBQSxTQUFBLEdBQUEsRUFEQSxDQURBLElBS0EsRUFBQSxHQUFBLFFBQUEsQ0FBQSxjQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0EsRUFBQSxLQUNBLEVBQUEsQ0FBQSxVQUFBLElBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxZQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUNBLENBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxDQUZBLENBTkEsR0FZQSxFQUFBLENBQUEsZUFBQSxDQUFBLEdBQUEsSUFaQSxFQWNBLEVBQUE7QUFHQSxnQkFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLFFBQUE7QUFDQSxnQkFBQSxPQUFBLEVBQUEsSUFBQSxVQUFBLEVBQ0EsT0EyV0EsU0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0Esa0JBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsVUFBQTtBQUFBLGtCQUNBLEVBQUEsR0FBQSxFQURBO0FBQUEsa0JBRUEsRUFBQSxHQUFBLEVBRkE7QUFBQSxrQkFHQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxxQkFBQSxLQUFBLEVBQUEsQ0FBQSxRQUhBO0FBQUEsa0JBSUEsRUFBQSxHQUFBLEVBSkE7QUFBQSxrQkFLQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FMQTs7QUFNQSxxQkFBQSxFQUFBLElBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBO0FBQ0EsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxXQUFBLEtBQUEsRUFBQSxDQUFBLFFBQUE7QUFEQTs7QUFJQSxjQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLFVBQUEsS0FDQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUNBLEVBQUEsR0FBQSxFQUFBLENBQUEsSUFGQSxLQUlBLEVBQUEsSUFBQSxDQUFBLEVBQUEsS0FDQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0EsRUFBQSxHQUFBLEVBQUEsR0FBQSxJQUZBLEdBS0EsRUFBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBTEEsRUFNQSxFQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsUUFBQSxLQUNBLEVBQUEsQ0FBQSxRQUFBLEdBQUEsRUFBQSxFQUVBLEVBQUEsR0FBQSxJQUhBLENBTkEsRUFXQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FYQSxFQVlBLEVBQUEsR0FBQSxFQUFBLENBQUEsSUFaQSxFQWNBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxLQUNBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsSUFBQSxFQUNBLENBQUEsQ0FBQSxFQUFBLEVBQUEsS0FBQSxDQUZBLENBbEJBO0FBd0JBLHFCQUFBLEVBQUE7YUFuQ0EsQ0EzV0EsRUEyV0EsRUEzV0EsRUEyV0EsRUEzV0EsRUEyV0EsRUEzV0EsRUEyV0EsQ0EzV0E7O0FBTUEsZ0JBSEEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxLQUFBLElBQUEsRUFBQSxLQUFBLGVBQUEsSUFBQSxDQUFBLEVBRUEsRUFBQSxHQUFBLE1BQUEsQ0FBQSxFQUFBLENBRkEsRUFFQSxDQUFBLENBQ0EsRUFEQSxJQUNBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBREEsTUFFQSxFQUFBLEdBcklBLFNBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLFFBQUEsQ0FBQSxlQUFBLENBQUEsNEJBQUEsRUFBQSxFQUFBLENBQUEsR0FBQSxRQUFBLENBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUVBLHFCQURBLEVBQUEsQ0FBQSxrQkFBQSxHQUFBLEVBQUEsRUFDQSxFQUFBO2FBSEEsQ0FxSUEsRUFySUEsRUFxSUEsQ0FySUEsQ0FxSUEsRUFFQSxFQUpBLENBQ0EsRUFHQTtBQUNBLHFCQUFBLEVBQUEsQ0FBQSxVQUFBO0FBQ0EsZ0JBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQTtBQURBOztBQUdBLGNBQUEsRUFBQSxDQUFBLFVBQUEsSUFBQSxFQUFBLENBQUEsVUFBQSxDQUFBLFlBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBRUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxJQUFBLENBRkE7OztBQU1BLGdCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsVUFBQTtBQUFBLGdCQUNBLEVBQUEsR0FBQSxFQUFBLENBQUEsZUFBQSxDQURBO0FBQUEsZ0JBRUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxRQUZBOztBQUlBLGdCQUFBLEVBQUEsSUFBQSxJQUFBLEVBQUE7QUFDQSxjQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsZUFBQSxDQUFBLEdBQUEsRUFBQTs7QUFDQSxtQkFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsVUFBQSxFQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsTUFBQSxFQUE0QyxFQUFBLEVBQTVDO0FBQ0EsZ0JBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsS0FBQTtBQURBOzs7QUFpQkEsbUJBQUEsQ0FaQSxDQVlBLElBWkEsRUFZQSxJQVpBLEVBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FZQSxJQVpBLE9BQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLFFBWUEsSUFaQSxFQUFBLElBQUEsSUFZQSxJQVpBLEVBQUEsQ0FBQSxTQUFBLEtBQUEsS0FBQSxDQVlBLElBWkEsRUFBQSxDQUFBLFdBQUEsSUFBQSxJQVlBLEdBWEEsRUFBQSxDQUFBLFNBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEtBQ0EsRUFBQSxDQUFBLFNBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQURBLENBV0EsR0FSRSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsTUFBQSxJQUFBLEVBQUEsSUFBQSxJQUFBLEtBV0YsU0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGtCQVFBLEVBUkE7QUFBQSxrQkFTQSxFQVRBO0FBQUEsa0JBVUEsRUFWQTtBQUFBLGtCQVdBLEVBWEE7QUFBQSxrQkFZQSxFQVpBO0FBQUEsa0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxVQUFBO0FBQUEsa0JBQ0EsRUFBQSxHQUFBLEVBREE7QUFBQSxrQkFFQSxFQUFBLEdBQUEsRUFGQTtBQUFBLGtCQUdBLEVBQUEsR0FBQSxDQUhBO0FBQUEsa0JBSUEsRUFBQSxHQUFBLENBSkE7QUFBQSxrQkFLQSxFQUFBLEdBQUEsRUFBQSxDQUFBLE1BTEE7QUFBQSxrQkFNQSxFQUFBLEdBQUEsQ0FOQTtBQUFBLGtCQU9BLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLE1BQUEsR0FBQSxDQVBBO0FBY0Esa0JBQUEsRUFBQSxLQUFBLENBQUEsRUFDQSxLQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsRUFBaUIsRUFBQSxHQUFBLEVBQWpCLEVBQTBCLEVBQUEsRUFBMUIsRUFBMEI7QUFDMUIsb0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUE7QUFBQSxvQkFDQSxFQUFBLEdBQUEsRUFBQSxDQUFBLGVBQUEsQ0FEQTtBQUFBLG9CQUVBLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQSxDQUFBLFVBQUEsQ0FBQSxLQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUEsR0FBQSxJQUZBO0FBR0EsZ0JBQUEsQ0FBQSxJQUFBLElBQUEsSUFDQSxFQUFBLElBQ0EsRUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBRkEsSUFHSSxDQUFBLEVBQUEsS0FBQSxFQUFBLENBQUEsU0FBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLE1BQ0osRUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEdBQUEsRUFESSxDQUhKOztBQVNBLGtCQUFBLEVBQUEsS0FBQSxDQUFBLEVBQ0EsS0FBQSxJQUFBLEVBQUEsR0FBQSxDQUFBLEVBQWlCLEVBQUEsR0FBQSxFQUFqQixFQUEyQixFQUFBLEVBQTNCLEVBQTJCO0FBQzNCLGdCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0EsRUFBQSxHQUFBLElBREE7QUFHQSxvQkFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUE7QUFDQSxvQkFBQSxDQUFBLElBQUEsSUFBQSxFQUNBLEVBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsS0FBQSxDQUFBLEtBQ0EsRUFBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFDQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQSxDQURBLEVBRUEsRUFBQSxFQUhBLEVBREEsSyxJQU1JLEVBQUEsR0FBQSxFLEVBQUE7QUFDSix1QkFBQSxFQUFBLEdBQUEsRUFBQSxFQUFrQixFQUFBLEdBQUEsRUFBbEIsRUFBbUMsRUFBQSxFQUFuQztBQUNBLHdCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsS0FBQSxLQXBQQSxDQW9QQSxLQXBQQSxDQUFBLEdBb1BBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQXBQQSxFQUFBLENBQUEsR0FvUEEsRUFwUEEsRUFBQSxRQUFBLENBQUEsR0FvUEEsRUFwUEEsS0FDQSxRQURBLElBQ0EsT0FBQSxDQUFBLElBQUEsUUFEQSxHQUVBLENBQUEsQ0FBQSxTQUFBLEtBQUEsS0FBQSxDQUZBLEdBSUEsT0FBQSxDQUFBLENBQUEsUUFBQSxJQUFBLFFBQUEsR0FBQSxDQUNBLENBQUEsQ0FBQSxxQkFEQSxJQUNBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLFFBQUEsQ0FEQSxHQUdBLENBQUEsSUFBQSxDQUFBLENBQUEscUJBQUEsS0FBQSxDQUFBLENBQUEsUUE2T0EsQ0FBQSxFQUFBO0FBQ0Esc0JBQUEsRUFBQSxHQUFBLEVBQUEsRUFDQSxFQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsS0FBQSxDQURBLEVBRUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxDQUFBLElBQUEsRUFBQSxFQUZBLEVBR0EsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLEVBSEE7QUFJQTs7QUFOQTs7QUFXQSxnQkFBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUVBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUZBLEVBR0EsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsS0FDQSxFQUFBLElBQUEsSUFBQSxHQUNBLEVBQUEsQ0FBQSxXQUFBLENBQUEsRUFBQSxDQURBLEdBRUssRUFBQSxLQUFBLEVBQUEsQ0FBQSxXQUFBLEdBQ0wsQ0FBQSxDQUFBLEVBQUEsQ0FESyxHQUdMLEVBQUEsQ0FBQSxZQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsQ0FOQSxDQUhBOztBQTlQQSxrQkFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUE7QUE2UUEsa0JBQUEsRUFBQSxFQUNBLEtBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNBLGdCQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsS0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FBQTtBQURBOztBQUtBLHFCQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsaUJBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsS0FBQSxDQUFBO0FBREE7YUExRUEsQ0FWQSxFQVVBLEVBVkEsRUFVQSxFQVZBLEVBVUEsRUFWQSxFQVVBLEVBVkEsQ0FBQSxJQUFBLEVBQUEsQ0FBQSx1QkFBQSxJQUFBLElBVUEsQ0FIQSxFQTBHQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGtCQUFBLEVBQUE7O0FBRUEsbUJBQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxnQkFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLElBQUEsSUFBQSxJQUNBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxDQURBO0FBREE7O0FBTUEsbUJBQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxnQkFBQSxFQUFBLEtBQUEsVUFBQSxJQUFBLEVBQUEsS0FBQSxXQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLE9BQUEsSUFBQSxFQUFBLEtBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsSUFDQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBREE7QUFEQTthQVRBLENBOUdBLEVBOEdBLEVBOUdBLEVBQUEsQ0FBQSxVQThHQSxFQTlHQSxFQThHQSxDQTFHQSxFQUZBLENBQUEsR0FBQSxFQUVBLEVBQUEsRUFBQTs7O0FBa0ZBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxVQUFBO0FBQ0EsWUFBQSxFQUFBLEdBQ0EsQ0FBQSxDQUFBLEVBQUEsQ0FEQSxJQUdBLEVBQUEsQ0FBQSxlQUFBLENBQUEsSUFBQSxJQUFBLElBQUEsRUFBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxFQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxFQUVBLEVBQUEsS0FGQSxLQUVBLElBQUEsRUFBQSxDQUFBLGVBQUEsQ0FBQSxJQUFBLElBQUEsSUFDQSxDQUFBLENBQUEsRUFBQSxDQUhBLEVBTUEsQ0FBQSxDQUFBLEVBQUEsQ0FUQSxDQUFBOzs7QUFhQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBO0FBRUEsaUJBREEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxTQUNBLEVBQUEsRUFBQSxHQUFBO0FBQ0Esa0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxlQUFBO0FBQ0EsY0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLElBQUEsQ0FBQSxFQUNBLEVBQUEsR0FBQSxFQURBOzs7O0FBcUJBLGNBQUEsQ0FBQSxHQUFBLEVBQUE7O0FBRUEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQTtBQUFBLGdCQUNBLEVBQUEsR0FBQSxDQUFBLENBQUEsTUFEQTs7QUFZQSxpQkFUQSxFQUFBLENBQUEsU0FBQSxJQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsTUFBQSxJQUNBLEVBQUEsR0FBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBQ0EsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FGQSxLQUlBLENBQUEsRUFBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFDQSxXQURBLEdBQ0EsRUFEQSxFQUVBLEVBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FOQSxDQVNBLEVBQUEsRUFBQSxFQUFBO0FBQ0Esa0JBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLFdBQUEsS0FBQSxFQUFBLEVBR0EsT0FGQSxFQUFBLENBQUEsUUFBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxRQUFBLEVBQ0EsQ0FBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQURBLEVBRUEsRUFBQTtBQUpBOztBQVFBLG1CQUFBLEVBQUE7OztBQUdBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLEtBQUEsV0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7OztBQUdBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsWUFBQSxFQUFBLENBQUEsUUFBQSxLQUNBLEVBQUEsQ0FBQSxRQUFBLEdBQUEsSUFBQSxFQUVBLEVBQUEsQ0FBQSxLQUFBLEdBQUEsRUFBQSxDQUFBLEdBRkEsRUFHQSxFQUFBLENBQUEsS0FBQSxHQUFBLEVBQUEsQ0FBQSxHQUhBLEVBR0EsT0FDQSxFQUFBLENBQUEsR0FKQSxFQUlBLE9BQ0EsRUFBQSxDQUFBLEdBTEEsRUFPQSxPQUFBLEVBQUEsQ0FBQSxXQUFBLENBQUEsd0JBQUEsSUFBQSxXQUFBLEtBQUEsQ0FDQSxFQUFBLENBQUEsSUFEQSxJQUNBLEVBREEsR0FFQSxFQUFBLENBQUEsa0JBQUEsSUFBQSxFQUFBLENBQUEsa0JBQUEsRUFGQSxHQUdHLEVBQUEsQ0FBQSx5QkFBQSxJQUNILEVBQUEsQ0FBQSx5QkFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBSkEsQ0FQQSxFQWVBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLE9BQUEsS0FDQSxFQUFBLENBQUEsV0FBQSxLQUFBLEVBQUEsQ0FBQSxXQUFBLEdBQUEsRUFBQSxDQUFBLE9BQUEsR0FDQSxFQUFBLENBQUEsT0FBQSxHQUFBLEVBRkEsQ0FmQSxFQW9CQSxFQUFBLENBQUEsU0FBQSxLQUFBLEVBQUEsQ0FBQSxTQUFBLEdBQUEsRUFBQSxDQUFBLEtBQUEsQ0FwQkEsRUFxQkEsRUFBQSxDQUFBLEtBQUEsR0FBQSxFQXJCQSxFQXVCQSxFQUFBLENBQUEsUUFBQSxHQUFBLEtBdkJBLEVBeUJBLEVBQUEsS0FBQSxDQUFBLEtBQ0EsRUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsb0JBQUEsS0FBQSxLQUFBLElBQUEsRUFBQSxDQUFBLElBQUEsR0FHQSxDQUFBLENBQUEsRUFBQSxDQUhBLEdBQ0EsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxDQUZBLENBekJBLEVBaUNBLEVBQUEsQ0FBQSxLQUFBLElBQUEsRUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBLENBbENBOzs7QUFxQ0EsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsRUFBQTtBQUVBLGtCQVlBLEVBWkE7QUFBQSxrQkFhQSxFQWJBO0FBQUEsa0JBY0EsRUFkQTtBQUFBLGtCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsS0FBQTtBQUFBLGtCQUNBLEVBQUEsR0FBQSxFQUFBLENBQUEsS0FEQTtBQUFBLGtCQUVBLEVBQUEsR0FBQSxFQUFBLENBQUEsT0FGQTtBQUFBLGtCQUdBLEVBQUEsR0FBQSxFQUFBLENBQUEsU0FBQSxJQUFBLEVBSEE7QUFBQSxrQkFJQSxFQUFBLEdBQUEsRUFBQSxDQUFBLFNBQUEsSUFBQSxFQUpBO0FBQUEsa0JBS0EsRUFBQSxHQUFBLEVBQUEsQ0FBQSxXQUFBLElBQUEsRUFMQTtBQUFBLGtCQU1BLEVBQUEsR0FBQSxFQUFBLENBQUEsSUFOQTtBQUFBLGtCQU9BLEVBQUEsR0FBQSxFQUFBLENBQUEsUUFQQTtBQUFBLGtCQVFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFSQTtBQUFBLGtCQVNBLEVBQUEsR0FBQSxFQUFBLENBQUEsVUFUQTtBQUFBLGtCQVVBLEVBQUEsR0FBQSxLQVZBO0FBQUEsa0JBV0EsRUFBQSxHQUFBLEVBWEE7O0FBc0NBLGtCQXRCQSxFQUFBLENBQUEsV0FBQSxDQUFBLHdCQUFBLEtBQ0EsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUEwQixFQUExQixDQUFBLEVBQTBCLEVBQUEsQ0FBQSxXQUFBLENBQUEsd0JBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUExQixDQUFBLEVBQ0EsRUFBQSxDQUFBLEtBQUEsR0FBQSxFQUZBLEdBS0EsRUFBQSxLQUNBLEVBQUEsQ0FBQSxLQUFBLEdBQUEsRUFBQSxFQUNBLEVBQUEsQ0FBQSxLQUFBLEdBQUEsRUFEQSxFQUVBLEVBQUEsQ0FBQSxPQUFBLEdBQUEsRUFGQSxFQUdBLEVBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBLHFCQUFBLElBQUEsRUFBQSxDQUFBLHFCQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLE1BQUEsS0FBQSxHQUNBLEVBQUEsR0FBQSxJQURBLEdBRUcsRUFBQSxDQUFBLG1CQUFBLElBQ0gsRUFBQSxDQUFBLG1CQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBTkEsRUFRQSxFQUFBLENBQUEsS0FBQSxHQUFBLEVBUkEsRUFTQSxFQUFBLENBQUEsS0FBQSxHQUFBLEVBVEEsRUFVQSxFQUFBLENBQUEsT0FBQSxHQUFBLEVBWEEsQ0FMQSxFQW1CQSxFQUFBLENBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxTQUFBLEdBQUEsRUFBQSxDQUFBLFdBQUEsR0FBQSxFQUFBLENBQUEsUUFBQSxHQUFBLElBbkJBLEVBb0JBLEVBQUEsQ0FBQSxNQUFBLEdBQUEsS0FwQkEsRUFvQkEsQ0FFQSxFQUFBLEVBQUE7QUFDQSxnQkFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUVBLEVBQUEsQ0FBQSxlQUFBLEtBQ0EsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUE2QixFQUE3QixDQUFBLEVBQTZCLEVBQUEsQ0FBQSxlQUFBLEVBQTdCLENBREEsQ0FGQSxFQU1BLEVBQUEsSUFBQSxFQUFBLENBQUEsdUJBQUEsS0FDQSxFQUFBLEdBQUEsRUFBQSxDQUFBLHVCQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsQ0FEQSxDQU5BOztBQVVBLG9CQUNBLEVBREE7QUFBQSxvQkFFQSxFQUZBO0FBQUEsb0JBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsUUFBQTs7QUFJQSxvQkFBQSxPQUFBLENBQUEsSUFBQSxVQUFBLEVBQUE7QUFFQSxzQkFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTtBQUNBLG1CQUFBLEVBQUEsR0FBQSxFQUFBLEtBRUEsRUFBQSxDQUFBLFdBQUEsS0FBQSxDQUZBLElBRUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxFQUFBLENBQUEsS0FGQSxHQUdBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsS0FBQSxDQUhBLElBS0EsRUFBQSxHQUFBLEVBQUEsRUFFQSxFQUFBLENBQUEsVUFBQSxHQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLENBRkEsRUFHQSxFQUFBLENBQUEsUUFBQSxHQUFBLEVBQUEsQ0FBQSxRQUFBLElBQUEsRUFIQSxFQUlBLEVBQUEsQ0FBQSxnQkFBQSxHQUFBLEVBSkEsRUFLQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsQ0FMQSxFQU1BLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLENBWEEsR0FjQSxFQUFBLEdBQUEsRUFBQSxDQUFBLElBZEE7aUJBSEEsTUFtQkEsRUFBQSxHQUFBLEVBQUEsRUFFQSxDQUFBLEVBQUEsR0FBQSxFQUFBLE1BRUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsSUFGQSxDQUZBLEVBT0EsQ0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsTUFDQSxFQUFBLEtBQUEsRUFBQSxDQUFBLFVBQUEsR0FBQSxJQUFBLENBQUEsRUFDQSxFQUFBLEdBMVdBLFNBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0Esa0JBQUEsQ0FBQSxPQUNBLENBQUEsR0FBQSxFQUFBLElBQUEsSUFBQSxJQUFBLEVBQUEsQ0FBQSxlQUFBLEtBQUEsS0FBQSxDQUFBLEVBRUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxJQUFBLElBQUEsRUFBQSxtQkFBQSxFQUFBLENBSEEsQ0FBQTtBQU1BLHNCQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtBQVVBLHlCQVJBLEVBQUEsSUFBQSxFQUFBLENBQUEsVUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsV0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBRUEsQ0FGQSxLQUdBLENBQUEsR0FBQSxLQUFBLEVBRUEsRUFBQSxJQUFBLENBQUEsRUFMQSxDQUFBLEVBUUEsRUFBQTtpQkFqQkEsQ0EwV0EsRUExV0EsRUEwV0EsRUExV0EsRUEwV0EsRUExV0EsRUEwV0EsRUFBQSxJQUFBLENBQUEsRUExV0EsRUEwV0EsRUFBQSxJQUFBLEVBQUEsQ0FBQSxVQTFXQSxFQTBXQSxJQTFXQSxDQXdXQSxDQVBBOztBQWFBLG9CQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLEVBQUE7QUFDQSxzQkFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLFVBQUE7QUFDQSxrQkFBQSxDQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsS0FDQSxDQUFBLENBQUEsWUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEdBRUEsRUFBQSxLQUNBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsSUFBQSxFQUNBLENBQUEsQ0FBQSxFQUFBLEVBQUEsS0FBQSxDQUZBLENBSEE7OztBQWVBLG9CQUxBLEVBQUEsSUFDQSxDQUFBLENBQUEsRUFBQSxDQURBLEVBSUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxHQUFBLEVBQUEsS0FBQSxDQUNBLEVBQUEsRUFBQTtBQUdBLHVCQUFBLElBRkEsQ0FBQSxHQUFBLEVBRUEsRUFEQSxDQUFBLEdBQUEsRUFDQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsZ0JBQUE7QUFDQSxxQkFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLElBQUEsR0FBQSxFQUFBO0FBREE7O0FBR0Esa0JBQUEsRUFBQSxDQUFBLFVBQUEsR0FBQSxDQUFBLEVBQ0EsRUFBQSxDQUFBLHFCQUFBLEdBQUEsQ0FBQSxDQUFBLFdBREE7Ozs7QUFlQSxtQkFBQSxDQVZBLEVBVUEsSUFWQSxFQVVBLEdBVEEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxFQUFBLENBU0EsR0FSRSxFQUFBLEtBRUYsRUFBQSxDQUFBLGtCQUFBLElBQ0EsRUFBQSxDQUFBLGtCQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBREEsRUFHQSxDQUFBLENBQUEsV0FBQSxJQUFBLENBQUEsQ0FBQSxXQUFBLENBQUEsRUFBQSxDQUxFLENBUUYsRUFBQSxFQUFBLENBQUEsZ0JBQUEsQ0FBQSxNQUFBO0FBQ0EsZ0JBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxFQUFBO0FBREE7O0FBRUUsY0FBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQUEsRUFBQTs7OztBQXlDRixtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBO0FBQ0EsWUFBQSxDQUFBLENBQUEsYUFBQSxJQUFBLENBQUEsQ0FBQSxhQUFBLENBQUEsRUFBQSxDQUFBO0FBRUEsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxJQUFBO0FBRUEsWUFBQSxFQUFBLENBQUEsUUFBQSxHQUFBLElBQUEsRUFFQSxFQUFBLENB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QUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTtBQ0gvQyxjQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsY0FDQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FEQTtBQUFBLGNBRUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBRkE7O0FBRUEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtBQUFBLG1CQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsVUFBQSxHQUFBLEVBQUEsR0FBQTtBQUFBLHlCQUFBO0FBQUEsYUFBQTs7O0FBQUEsbUJBQUEsQ0FBQSxHQUFBO0FBQUEsbUJBQUEsQ0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsSUFBQSxVQUFBLEVBQUEsRUFBQTtBQUFBLG1CQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsRUFBQSxFQUFBLEdBQUEsU0FBQSxDQUFBLE1BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUFBLG9CQUFBLEVBQUEsR0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBOztBQUFBLHFCQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFBQSxrQkFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUFBOzs7QUFBQSxxQkFBQSxFQUFBO2FBQUEsRUFBQSxLQUFBLENBQUEsSUFBQSxFQUFBLFNBQUEsQ0FBQTs7O0FBQUEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtBQUFBLGdCQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsRUFBQSxNQUFBLElBQUEsY0FBQSxDQUFBLDJEQUFBLENBQUE7QUFBQSxtQkFBQSxFQUFBOzs7QUFFQSxjQUdNLENBQUEsR0FBVztBQUNmLGdC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TEgsQ0FhQSxFQWJBLEVBYUEsRUFBQSxDQUFBLE1BYkEsRUFhQSxFQWJBLENBYUEsR0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7YUFKQTs7QUFPQSxtQkFEQSxDQUFBLENBQUEsRUFBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxTQUFBLEdBQUEsRUFBQSxDQUFBLFNBQUEsR0FDQSxDQUFBO1dBUkE7U3hEbUVBLEV3RDNEQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUN0QkEsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUE7QUFDQSxnQkFBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLEtBQUEsQ0FBQTs7QUFDQSxvQkFBQSxFQUFBLENBQUEsTUFBQTttQkFDQSxDO0FBQUEsdUJBQUEsQ0FBQSxHQUFBLEVBQUEsRUFBQSxHQUNBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQURBOzttQkFFQSxDO0FBQUEsdUJBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FDQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBREE7O21CQUVBLEM7QUFBQSx1QkFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FDQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxDQURBOzttQkFFQSxDO0FBQUEsdUJBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUNBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FB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a1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhY2Nlc3NpYmxlQXV0b2NvbXBsZXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFjY2Vzc2libGVBdXRvY29tcGxldGVcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pO1xuICB2YXIga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZiAodGFyZ2V0KSByZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZiAoZXhwb3J0c1trZXldICE9IG91dCkgaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYgKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KSBleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBWTm9kZSA9IGZ1bmN0aW9uIFZOb2RlKCkge307XG5cbnZhciBvcHRpb25zID0ge307XG5cbnZhciBzdGFjayA9IFtdO1xuXG52YXIgRU1QVFlfQ0hJTERSRU4gPSBbXTtcblxuZnVuY3Rpb24gaChub2RlTmFtZSwgYXR0cmlidXRlcykge1xuXHR2YXIgY2hpbGRyZW4gPSBFTVBUWV9DSElMRFJFTixcblx0ICAgIGxhc3RTaW1wbGUsXG5cdCAgICBjaGlsZCxcblx0ICAgIHNpbXBsZSxcblx0ICAgIGk7XG5cdGZvciAoaSA9IGFyZ3VtZW50cy5sZW5ndGg7IGktLSA+IDI7KSB7XG5cdFx0c3RhY2sucHVzaChhcmd1bWVudHNbaV0pO1xuXHR9XG5cdGlmIChhdHRyaWJ1dGVzICYmIGF0dHJpYnV0ZXMuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdGlmICghc3RhY2subGVuZ3RoKSBzdGFjay5wdXNoKGF0dHJpYnV0ZXMuY2hpbGRyZW4pO1xuXHRcdGRlbGV0ZSBhdHRyaWJ1dGVzLmNoaWxkcmVuO1xuXHR9XG5cdHdoaWxlIChzdGFjay5sZW5ndGgpIHtcblx0XHRpZiAoKGNoaWxkID0gc3RhY2sucG9wKCkpICYmIGNoaWxkLnBvcCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRmb3IgKGkgPSBjaGlsZC5sZW5ndGg7IGktLTspIHtcblx0XHRcdFx0c3RhY2sucHVzaChjaGlsZFtpXSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0eXBlb2YgY2hpbGQgPT09ICdib29sZWFuJykgY2hpbGQgPSBudWxsO1xuXG5cdFx0XHRpZiAoc2ltcGxlID0gdHlwZW9mIG5vZGVOYW1lICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGlmIChjaGlsZCA9PSBudWxsKSBjaGlsZCA9ICcnO2Vsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ251bWJlcicpIGNoaWxkID0gU3RyaW5nKGNoaWxkKTtlbHNlIGlmICh0eXBlb2YgY2hpbGQgIT09ICdzdHJpbmcnKSBzaW1wbGUgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNpbXBsZSAmJiBsYXN0U2ltcGxlKSB7XG5cdFx0XHRcdGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdICs9IGNoaWxkO1xuXHRcdFx0fSBlbHNlIGlmIChjaGlsZHJlbiA9PT0gRU1QVFlfQ0hJTERSRU4pIHtcblx0XHRcdFx0Y2hpbGRyZW4gPSBbY2hpbGRdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdFx0XHR9XG5cblx0XHRcdGxhc3RTaW1wbGUgPSBzaW1wbGU7XG5cdFx0fVxuXHR9XG5cblx0dmFyIHAgPSBuZXcgVk5vZGUoKTtcblx0cC5ub2RlTmFtZSA9IG5vZGVOYW1lO1xuXHRwLmNoaWxkcmVuID0gY2hpbGRyZW47XG5cdHAuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGF0dHJpYnV0ZXM7XG5cdHAua2V5ID0gYXR0cmlidXRlcyA9PSBudWxsID8gdW5kZWZpbmVkIDogYXR0cmlidXRlcy5rZXk7XG5cblx0aWYgKG9wdGlvbnMudm5vZGUgIT09IHVuZGVmaW5lZCkgb3B0aW9ucy52bm9kZShwKTtcblxuXHRyZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKG9iaiwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSBpbiBwcm9wcykge1xuICAgIG9ialtpXSA9IHByb3BzW2ldO1xuICB9cmV0dXJuIG9iajtcbn1cblxudmFyIGRlZmVyID0gdHlwZW9mIFByb21pc2UgPT0gJ2Z1bmN0aW9uJyA/IFByb21pc2UucmVzb2x2ZSgpLnRoZW4uYmluZChQcm9taXNlLnJlc29sdmUoKSkgOiBzZXRUaW1lb3V0O1xuXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnQodm5vZGUsIHByb3BzKSB7XG4gIHJldHVybiBoKHZub2RlLm5vZGVOYW1lLCBleHRlbmQoZXh0ZW5kKHt9LCB2bm9kZS5hdHRyaWJ1dGVzKSwgcHJvcHMpLCBhcmd1bWVudHMubGVuZ3RoID4gMiA/IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IHZub2RlLmNoaWxkcmVuKTtcbn1cblxudmFyIElTX05PTl9ESU1FTlNJT05BTCA9IC9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZC9pO1xuXG52YXIgaXRlbXMgPSBbXTtcblxuZnVuY3Rpb24gZW5xdWV1ZVJlbmRlcihjb21wb25lbnQpIHtcblx0aWYgKCFjb21wb25lbnQuX2RpcnR5ICYmIChjb21wb25lbnQuX2RpcnR5ID0gdHJ1ZSkgJiYgaXRlbXMucHVzaChjb21wb25lbnQpID09IDEpIHtcblx0XHQob3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZyB8fCBkZWZlcikocmVyZW5kZXIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlcmVuZGVyKCkge1xuXHR2YXIgcCxcblx0ICAgIGxpc3QgPSBpdGVtcztcblx0aXRlbXMgPSBbXTtcblx0d2hpbGUgKHAgPSBsaXN0LnBvcCgpKSB7XG5cdFx0aWYgKHAuX2RpcnR5KSByZW5kZXJDb21wb25lbnQocCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaXNTYW1lTm9kZVR5cGUobm9kZSwgdm5vZGUsIGh5ZHJhdGluZykge1xuXHRpZiAodHlwZW9mIHZub2RlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygdm5vZGUgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIG5vZGUuc3BsaXRUZXh0ICE9PSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKHR5cGVvZiB2bm9kZS5ub2RlTmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gIW5vZGUuX2NvbXBvbmVudENvbnN0cnVjdG9yICYmIGlzTmFtZWROb2RlKG5vZGUsIHZub2RlLm5vZGVOYW1lKTtcblx0fVxuXHRyZXR1cm4gaHlkcmF0aW5nIHx8IG5vZGUuX2NvbXBvbmVudENvbnN0cnVjdG9yID09PSB2bm9kZS5ub2RlTmFtZTtcbn1cblxuZnVuY3Rpb24gaXNOYW1lZE5vZGUobm9kZSwgbm9kZU5hbWUpIHtcblx0cmV0dXJuIG5vZGUubm9ybWFsaXplZE5vZGVOYW1lID09PSBub2RlTmFtZSB8fCBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGdldE5vZGVQcm9wcyh2bm9kZSkge1xuXHR2YXIgcHJvcHMgPSBleHRlbmQoe30sIHZub2RlLmF0dHJpYnV0ZXMpO1xuXHRwcm9wcy5jaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuXG5cdHZhciBkZWZhdWx0UHJvcHMgPSB2bm9kZS5ub2RlTmFtZS5kZWZhdWx0UHJvcHM7XG5cdGlmIChkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuXHRcdGZvciAodmFyIGkgaW4gZGVmYXVsdFByb3BzKSB7XG5cdFx0XHRpZiAocHJvcHNbaV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwcm9wc1tpXSA9IGRlZmF1bHRQcm9wc1tpXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcHJvcHM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGUobm9kZU5hbWUsIGlzU3ZnKSB7XG5cdHZhciBub2RlID0gaXNTdmcgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbm9kZU5hbWUpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG5cdG5vZGUubm9ybWFsaXplZE5vZGVOYW1lID0gbm9kZU5hbWU7XG5cdHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcblx0dmFyIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdGlmIChwYXJlbnROb2RlKSBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xufVxuXG5mdW5jdGlvbiBzZXRBY2Nlc3Nvcihub2RlLCBuYW1lLCBvbGQsIHZhbHVlLCBpc1N2Zykge1xuXHRpZiAobmFtZSA9PT0gJ2NsYXNzTmFtZScpIG5hbWUgPSAnY2xhc3MnO1xuXG5cdGlmIChuYW1lID09PSAna2V5Jykge30gZWxzZSBpZiAobmFtZSA9PT0gJ3JlZicpIHtcblx0XHRpZiAob2xkKSBvbGQobnVsbCk7XG5cdFx0aWYgKHZhbHVlKSB2YWx1ZShub2RlKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnY2xhc3MnICYmICFpc1N2Zykge1xuXHRcdG5vZGUuY2xhc3NOYW1lID0gdmFsdWUgfHwgJyc7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJ3N0eWxlJykge1xuXHRcdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2xkID09PSAnc3RyaW5nJykge1xuXHRcdFx0bm9kZS5zdHlsZS5jc3NUZXh0ID0gdmFsdWUgfHwgJyc7XG5cdFx0fVxuXHRcdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRpZiAodHlwZW9mIG9sZCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBvbGQpIHtcblx0XHRcdFx0XHRpZiAoIShpIGluIHZhbHVlKSkgbm9kZS5zdHlsZVtpXSA9ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpIGluIHZhbHVlKSB7XG5cdFx0XHRcdG5vZGUuc3R5bGVbaV0gPSB0eXBlb2YgdmFsdWVbaV0gPT09ICdudW1iZXInICYmIElTX05PTl9ESU1FTlNJT05BTC50ZXN0KGkpID09PSBmYWxzZSA/IHZhbHVlW2ldICsgJ3B4JyA6IHZhbHVlW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChuYW1lID09PSAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnKSB7XG5cdFx0aWYgKHZhbHVlKSBub2RlLmlubmVySFRNTCA9IHZhbHVlLl9faHRtbCB8fCAnJztcblx0fSBlbHNlIGlmIChuYW1lWzBdID09ICdvJyAmJiBuYW1lWzFdID09ICduJykge1xuXHRcdHZhciB1c2VDYXB0dXJlID0gbmFtZSAhPT0gKG5hbWUgPSBuYW1lLnJlcGxhY2UoL0NhcHR1cmUkLywgJycpKTtcblx0XHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZygyKTtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdGlmICghb2xkKSBub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnRQcm94eSwgdXNlQ2FwdHVyZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudFByb3h5LCB1c2VDYXB0dXJlKTtcblx0XHR9XG5cdFx0KG5vZGUuX2xpc3RlbmVycyB8fCAobm9kZS5fbGlzdGVuZXJzID0ge30pKVtuYW1lXSA9IHZhbHVlO1xuXHR9IGVsc2UgaWYgKG5hbWUgIT09ICdsaXN0JyAmJiBuYW1lICE9PSAndHlwZScgJiYgIWlzU3ZnICYmIG5hbWUgaW4gbm9kZSkge1xuXHRcdHRyeSB7XG5cdFx0XHRub2RlW25hbWVdID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG5cdFx0fSBjYXRjaCAoZSkge31cblx0XHRpZiAoKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IGZhbHNlKSAmJiBuYW1lICE9ICdzcGVsbGNoZWNrJykgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG5zID0gaXNTdmcgJiYgbmFtZSAhPT0gKG5hbWUgPSBuYW1lLnJlcGxhY2UoL154bGluazo/LywgJycpKTtcblxuXHRcdGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBmYWxzZSkge1xuXHRcdFx0aWYgKG5zKSBub2RlLnJlbW92ZUF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgbmFtZS50b0xvd2VyQ2FzZSgpKTtlbHNlIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRpZiAobnMpIG5vZGUuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBuYW1lLnRvTG93ZXJDYXNlKCksIHZhbHVlKTtlbHNlIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZXZlbnRQcm94eShlKSB7XG5cdHJldHVybiB0aGlzLl9saXN0ZW5lcnNbZS50eXBlXShvcHRpb25zLmV2ZW50ICYmIG9wdGlvbnMuZXZlbnQoZSkgfHwgZSk7XG59XG5cbnZhciBtb3VudHMgPSBbXTtcblxudmFyIGRpZmZMZXZlbCA9IDA7XG5cbnZhciBpc1N2Z01vZGUgPSBmYWxzZTtcblxudmFyIGh5ZHJhdGluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBmbHVzaE1vdW50cygpIHtcblx0dmFyIGM7XG5cdHdoaWxlIChjID0gbW91bnRzLnBvcCgpKSB7XG5cdFx0aWYgKG9wdGlvbnMuYWZ0ZXJNb3VudCkgb3B0aW9ucy5hZnRlck1vdW50KGMpO1xuXHRcdGlmIChjLmNvbXBvbmVudERpZE1vdW50KSBjLmNvbXBvbmVudERpZE1vdW50KCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgcGFyZW50LCBjb21wb25lbnRSb290KSB7XG5cdGlmICghZGlmZkxldmVsKyspIHtcblx0XHRpc1N2Z01vZGUgPSBwYXJlbnQgIT0gbnVsbCAmJiBwYXJlbnQub3duZXJTVkdFbGVtZW50ICE9PSB1bmRlZmluZWQ7XG5cblx0XHRoeWRyYXRpbmcgPSBkb20gIT0gbnVsbCAmJiAhKCdfX3ByZWFjdGF0dHJfJyBpbiBkb20pO1xuXHR9XG5cblx0dmFyIHJldCA9IGlkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsLCBjb21wb25lbnRSb290KTtcblxuXHRpZiAocGFyZW50ICYmIHJldC5wYXJlbnROb2RlICE9PSBwYXJlbnQpIHBhcmVudC5hcHBlbmRDaGlsZChyZXQpO1xuXG5cdGlmICghIC0tZGlmZkxldmVsKSB7XG5cdFx0aHlkcmF0aW5nID0gZmFsc2U7XG5cblx0XHRpZiAoIWNvbXBvbmVudFJvb3QpIGZsdXNoTW91bnRzKCk7XG5cdH1cblxuXHRyZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBpZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgY29tcG9uZW50Um9vdCkge1xuXHR2YXIgb3V0ID0gZG9tLFxuXHQgICAgcHJldlN2Z01vZGUgPSBpc1N2Z01vZGU7XG5cblx0aWYgKHZub2RlID09IG51bGwgfHwgdHlwZW9mIHZub2RlID09PSAnYm9vbGVhbicpIHZub2RlID0gJyc7XG5cblx0aWYgKHR5cGVvZiB2bm9kZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZub2RlID09PSAnbnVtYmVyJykge1xuXHRcdGlmIChkb20gJiYgZG9tLnNwbGl0VGV4dCAhPT0gdW5kZWZpbmVkICYmIGRvbS5wYXJlbnROb2RlICYmICghZG9tLl9jb21wb25lbnQgfHwgY29tcG9uZW50Um9vdCkpIHtcblx0XHRcdGlmIChkb20ubm9kZVZhbHVlICE9IHZub2RlKSB7XG5cdFx0XHRcdGRvbS5ub2RlVmFsdWUgPSB2bm9kZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0b3V0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodm5vZGUpO1xuXHRcdFx0aWYgKGRvbSkge1xuXHRcdFx0XHRpZiAoZG9tLnBhcmVudE5vZGUpIGRvbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChvdXQsIGRvbSk7XG5cdFx0XHRcdHJlY29sbGVjdE5vZGVUcmVlKGRvbSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b3V0WydfX3ByZWFjdGF0dHJfJ10gPSB0cnVlO1xuXG5cdFx0cmV0dXJuIG91dDtcblx0fVxuXG5cdHZhciB2bm9kZU5hbWUgPSB2bm9kZS5ub2RlTmFtZTtcblx0aWYgKHR5cGVvZiB2bm9kZU5hbWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gYnVpbGRDb21wb25lbnRGcm9tVk5vZGUoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwpO1xuXHR9XG5cblx0aXNTdmdNb2RlID0gdm5vZGVOYW1lID09PSAnc3ZnJyA/IHRydWUgOiB2bm9kZU5hbWUgPT09ICdmb3JlaWduT2JqZWN0JyA/IGZhbHNlIDogaXNTdmdNb2RlO1xuXG5cdHZub2RlTmFtZSA9IFN0cmluZyh2bm9kZU5hbWUpO1xuXHRpZiAoIWRvbSB8fCAhaXNOYW1lZE5vZGUoZG9tLCB2bm9kZU5hbWUpKSB7XG5cdFx0b3V0ID0gY3JlYXRlTm9kZSh2bm9kZU5hbWUsIGlzU3ZnTW9kZSk7XG5cblx0XHRpZiAoZG9tKSB7XG5cdFx0XHR3aGlsZSAoZG9tLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0b3V0LmFwcGVuZENoaWxkKGRvbS5maXJzdENoaWxkKTtcblx0XHRcdH1cblx0XHRcdGlmIChkb20ucGFyZW50Tm9kZSkgZG9tLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG91dCwgZG9tKTtcblxuXHRcdFx0cmVjb2xsZWN0Tm9kZVRyZWUoZG9tLCB0cnVlKTtcblx0XHR9XG5cdH1cblxuXHR2YXIgZmMgPSBvdXQuZmlyc3RDaGlsZCxcblx0ICAgIHByb3BzID0gb3V0WydfX3ByZWFjdGF0dHJfJ10sXG5cdCAgICB2Y2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcblxuXHRpZiAocHJvcHMgPT0gbnVsbCkge1xuXHRcdHByb3BzID0gb3V0WydfX3ByZWFjdGF0dHJfJ10gPSB7fTtcblx0XHRmb3IgKHZhciBhID0gb3V0LmF0dHJpYnV0ZXMsIGkgPSBhLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0cHJvcHNbYVtpXS5uYW1lXSA9IGFbaV0udmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFoeWRyYXRpbmcgJiYgdmNoaWxkcmVuICYmIHZjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgdHlwZW9mIHZjaGlsZHJlblswXSA9PT0gJ3N0cmluZycgJiYgZmMgIT0gbnVsbCAmJiBmYy5zcGxpdFRleHQgIT09IHVuZGVmaW5lZCAmJiBmYy5uZXh0U2libGluZyA9PSBudWxsKSB7XG5cdFx0aWYgKGZjLm5vZGVWYWx1ZSAhPSB2Y2hpbGRyZW5bMF0pIHtcblx0XHRcdGZjLm5vZGVWYWx1ZSA9IHZjaGlsZHJlblswXTtcblx0XHR9XG5cdH0gZWxzZSBpZiAodmNoaWxkcmVuICYmIHZjaGlsZHJlbi5sZW5ndGggfHwgZmMgIT0gbnVsbCkge1xuXHRcdFx0aW5uZXJEaWZmTm9kZShvdXQsIHZjaGlsZHJlbiwgY29udGV4dCwgbW91bnRBbGwsIGh5ZHJhdGluZyB8fCBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAhPSBudWxsKTtcblx0XHR9XG5cblx0ZGlmZkF0dHJpYnV0ZXMob3V0LCB2bm9kZS5hdHRyaWJ1dGVzLCBwcm9wcyk7XG5cblx0aXNTdmdNb2RlID0gcHJldlN2Z01vZGU7XG5cblx0cmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gaW5uZXJEaWZmTm9kZShkb20sIHZjaGlsZHJlbiwgY29udGV4dCwgbW91bnRBbGwsIGlzSHlkcmF0aW5nKSB7XG5cdHZhciBvcmlnaW5hbENoaWxkcmVuID0gZG9tLmNoaWxkTm9kZXMsXG5cdCAgICBjaGlsZHJlbiA9IFtdLFxuXHQgICAga2V5ZWQgPSB7fSxcblx0ICAgIGtleWVkTGVuID0gMCxcblx0ICAgIG1pbiA9IDAsXG5cdCAgICBsZW4gPSBvcmlnaW5hbENoaWxkcmVuLmxlbmd0aCxcblx0ICAgIGNoaWxkcmVuTGVuID0gMCxcblx0ICAgIHZsZW4gPSB2Y2hpbGRyZW4gPyB2Y2hpbGRyZW4ubGVuZ3RoIDogMCxcblx0ICAgIGosXG5cdCAgICBjLFxuXHQgICAgZixcblx0ICAgIHZjaGlsZCxcblx0ICAgIGNoaWxkO1xuXG5cdGlmIChsZW4gIT09IDApIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHR2YXIgX2NoaWxkID0gb3JpZ2luYWxDaGlsZHJlbltpXSxcblx0XHRcdCAgICBwcm9wcyA9IF9jaGlsZFsnX19wcmVhY3RhdHRyXyddLFxuXHRcdFx0ICAgIGtleSA9IHZsZW4gJiYgcHJvcHMgPyBfY2hpbGQuX2NvbXBvbmVudCA/IF9jaGlsZC5fY29tcG9uZW50Ll9fa2V5IDogcHJvcHMua2V5IDogbnVsbDtcblx0XHRcdGlmIChrZXkgIT0gbnVsbCkge1xuXHRcdFx0XHRrZXllZExlbisrO1xuXHRcdFx0XHRrZXllZFtrZXldID0gX2NoaWxkO1xuXHRcdFx0fSBlbHNlIGlmIChwcm9wcyB8fCAoX2NoaWxkLnNwbGl0VGV4dCAhPT0gdW5kZWZpbmVkID8gaXNIeWRyYXRpbmcgPyBfY2hpbGQubm9kZVZhbHVlLnRyaW0oKSA6IHRydWUgOiBpc0h5ZHJhdGluZykpIHtcblx0XHRcdFx0Y2hpbGRyZW5bY2hpbGRyZW5MZW4rK10gPSBfY2hpbGQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKHZsZW4gIT09IDApIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZsZW47IGkrKykge1xuXHRcdFx0dmNoaWxkID0gdmNoaWxkcmVuW2ldO1xuXHRcdFx0Y2hpbGQgPSBudWxsO1xuXG5cdFx0XHR2YXIga2V5ID0gdmNoaWxkLmtleTtcblx0XHRcdGlmIChrZXkgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAoa2V5ZWRMZW4gJiYga2V5ZWRba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Y2hpbGQgPSBrZXllZFtrZXldO1xuXHRcdFx0XHRcdGtleWVkW2tleV0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0a2V5ZWRMZW4tLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChtaW4gPCBjaGlsZHJlbkxlbikge1xuXHRcdFx0XHRcdGZvciAoaiA9IG1pbjsgaiA8IGNoaWxkcmVuTGVuOyBqKyspIHtcblx0XHRcdFx0XHRcdGlmIChjaGlsZHJlbltqXSAhPT0gdW5kZWZpbmVkICYmIGlzU2FtZU5vZGVUeXBlKGMgPSBjaGlsZHJlbltqXSwgdmNoaWxkLCBpc0h5ZHJhdGluZykpIHtcblx0XHRcdFx0XHRcdFx0Y2hpbGQgPSBjO1xuXHRcdFx0XHRcdFx0XHRjaGlsZHJlbltqXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYgKGogPT09IGNoaWxkcmVuTGVuIC0gMSkgY2hpbGRyZW5MZW4tLTtcblx0XHRcdFx0XHRcdFx0aWYgKGogPT09IG1pbikgbWluKys7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRjaGlsZCA9IGlkaWZmKGNoaWxkLCB2Y2hpbGQsIGNvbnRleHQsIG1vdW50QWxsKTtcblxuXHRcdFx0ZiA9IG9yaWdpbmFsQ2hpbGRyZW5baV07XG5cdFx0XHRpZiAoY2hpbGQgJiYgY2hpbGQgIT09IGRvbSAmJiBjaGlsZCAhPT0gZikge1xuXHRcdFx0XHRpZiAoZiA9PSBudWxsKSB7XG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNoaWxkKTtcblx0XHRcdFx0fSBlbHNlIGlmIChjaGlsZCA9PT0gZi5uZXh0U2libGluZykge1xuXHRcdFx0XHRcdHJlbW92ZU5vZGUoZik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShjaGlsZCwgZik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoa2V5ZWRMZW4pIHtcblx0XHRmb3IgKHZhciBpIGluIGtleWVkKSB7XG5cdFx0XHRpZiAoa2V5ZWRbaV0gIT09IHVuZGVmaW5lZCkgcmVjb2xsZWN0Tm9kZVRyZWUoa2V5ZWRbaV0sIGZhbHNlKTtcblx0XHR9XG5cdH1cblxuXHR3aGlsZSAobWluIDw9IGNoaWxkcmVuTGVuKSB7XG5cdFx0aWYgKChjaGlsZCA9IGNoaWxkcmVuW2NoaWxkcmVuTGVuLS1dKSAhPT0gdW5kZWZpbmVkKSByZWNvbGxlY3ROb2RlVHJlZShjaGlsZCwgZmFsc2UpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlY29sbGVjdE5vZGVUcmVlKG5vZGUsIHVubW91bnRPbmx5KSB7XG5cdHZhciBjb21wb25lbnQgPSBub2RlLl9jb21wb25lbnQ7XG5cdGlmIChjb21wb25lbnQpIHtcblx0XHR1bm1vdW50Q29tcG9uZW50KGNvbXBvbmVudCk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKG5vZGVbJ19fcHJlYWN0YXR0cl8nXSAhPSBudWxsICYmIG5vZGVbJ19fcHJlYWN0YXR0cl8nXS5yZWYpIG5vZGVbJ19fcHJlYWN0YXR0cl8nXS5yZWYobnVsbCk7XG5cblx0XHRpZiAodW5tb3VudE9ubHkgPT09IGZhbHNlIHx8IG5vZGVbJ19fcHJlYWN0YXR0cl8nXSA9PSBudWxsKSB7XG5cdFx0XHRyZW1vdmVOb2RlKG5vZGUpO1xuXHRcdH1cblxuXHRcdHJlbW92ZUNoaWxkcmVuKG5vZGUpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuKG5vZGUpIHtcblx0bm9kZSA9IG5vZGUubGFzdENoaWxkO1xuXHR3aGlsZSAobm9kZSkge1xuXHRcdHZhciBuZXh0ID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG5cdFx0cmVjb2xsZWN0Tm9kZVRyZWUobm9kZSwgdHJ1ZSk7XG5cdFx0bm9kZSA9IG5leHQ7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMoZG9tLCBhdHRycywgb2xkKSB7XG5cdHZhciBuYW1lO1xuXG5cdGZvciAobmFtZSBpbiBvbGQpIHtcblx0XHRpZiAoIShhdHRycyAmJiBhdHRyc1tuYW1lXSAhPSBudWxsKSAmJiBvbGRbbmFtZV0gIT0gbnVsbCkge1xuXHRcdFx0c2V0QWNjZXNzb3IoZG9tLCBuYW1lLCBvbGRbbmFtZV0sIG9sZFtuYW1lXSA9IHVuZGVmaW5lZCwgaXNTdmdNb2RlKTtcblx0XHR9XG5cdH1cblxuXHRmb3IgKG5hbWUgaW4gYXR0cnMpIHtcblx0XHRpZiAobmFtZSAhPT0gJ2NoaWxkcmVuJyAmJiBuYW1lICE9PSAnaW5uZXJIVE1MJyAmJiAoIShuYW1lIGluIG9sZCkgfHwgYXR0cnNbbmFtZV0gIT09IChuYW1lID09PSAndmFsdWUnIHx8IG5hbWUgPT09ICdjaGVja2VkJyA/IGRvbVtuYW1lXSA6IG9sZFtuYW1lXSkpKSB7XG5cdFx0XHRzZXRBY2Nlc3Nvcihkb20sIG5hbWUsIG9sZFtuYW1lXSwgb2xkW25hbWVdID0gYXR0cnNbbmFtZV0sIGlzU3ZnTW9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbnZhciByZWN5Y2xlckNvbXBvbmVudHMgPSBbXTtcblxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KEN0b3IsIHByb3BzLCBjb250ZXh0KSB7XG5cdHZhciBpbnN0LFxuXHQgICAgaSA9IHJlY3ljbGVyQ29tcG9uZW50cy5sZW5ndGg7XG5cblx0aWYgKEN0b3IucHJvdG90eXBlICYmIEN0b3IucHJvdG90eXBlLnJlbmRlcikge1xuXHRcdGluc3QgPSBuZXcgQ3Rvcihwcm9wcywgY29udGV4dCk7XG5cdFx0Q29tcG9uZW50LmNhbGwoaW5zdCwgcHJvcHMsIGNvbnRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGluc3QgPSBuZXcgQ29tcG9uZW50KHByb3BzLCBjb250ZXh0KTtcblx0XHRpbnN0LmNvbnN0cnVjdG9yID0gQ3Rvcjtcblx0XHRpbnN0LnJlbmRlciA9IGRvUmVuZGVyO1xuXHR9XG5cblx0d2hpbGUgKGktLSkge1xuXHRcdGlmIChyZWN5Y2xlckNvbXBvbmVudHNbaV0uY29uc3RydWN0b3IgPT09IEN0b3IpIHtcblx0XHRcdGluc3QubmV4dEJhc2UgPSByZWN5Y2xlckNvbXBvbmVudHNbaV0ubmV4dEJhc2U7XG5cdFx0XHRyZWN5Y2xlckNvbXBvbmVudHMuc3BsaWNlKGksIDEpO1xuXHRcdFx0cmV0dXJuIGluc3Q7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGluc3Q7XG59XG5cbmZ1bmN0aW9uIGRvUmVuZGVyKHByb3BzLCBzdGF0ZSwgY29udGV4dCkge1xuXHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCk7XG59XG5cbmZ1bmN0aW9uIHNldENvbXBvbmVudFByb3BzKGNvbXBvbmVudCwgcHJvcHMsIHJlbmRlck1vZGUsIGNvbnRleHQsIG1vdW50QWxsKSB7XG5cdGlmIChjb21wb25lbnQuX2Rpc2FibGUpIHJldHVybjtcblx0Y29tcG9uZW50Ll9kaXNhYmxlID0gdHJ1ZTtcblxuXHRjb21wb25lbnQuX19yZWYgPSBwcm9wcy5yZWY7XG5cdGNvbXBvbmVudC5fX2tleSA9IHByb3BzLmtleTtcblx0ZGVsZXRlIHByb3BzLnJlZjtcblx0ZGVsZXRlIHByb3BzLmtleTtcblxuXHRpZiAodHlwZW9mIGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKCFjb21wb25lbnQuYmFzZSB8fCBtb3VudEFsbCkge1xuXHRcdFx0aWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQpIGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQoKTtcblx0XHR9IGVsc2UgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKSB7XG5cdFx0XHRjb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcywgY29udGV4dCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gY29tcG9uZW50LmNvbnRleHQpIHtcblx0XHRpZiAoIWNvbXBvbmVudC5wcmV2Q29udGV4dCkgY29tcG9uZW50LnByZXZDb250ZXh0ID0gY29tcG9uZW50LmNvbnRleHQ7XG5cdFx0Y29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0O1xuXHR9XG5cblx0aWYgKCFjb21wb25lbnQucHJldlByb3BzKSBjb21wb25lbnQucHJldlByb3BzID0gY29tcG9uZW50LnByb3BzO1xuXHRjb21wb25lbnQucHJvcHMgPSBwcm9wcztcblxuXHRjb21wb25lbnQuX2Rpc2FibGUgPSBmYWxzZTtcblxuXHRpZiAocmVuZGVyTW9kZSAhPT0gMCkge1xuXHRcdGlmIChyZW5kZXJNb2RlID09PSAxIHx8IG9wdGlvbnMuc3luY0NvbXBvbmVudFVwZGF0ZXMgIT09IGZhbHNlIHx8ICFjb21wb25lbnQuYmFzZSkge1xuXHRcdFx0cmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudCwgMSwgbW91bnRBbGwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbnF1ZXVlUmVuZGVyKGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGNvbXBvbmVudC5fX3JlZikgY29tcG9uZW50Ll9fcmVmKGNvbXBvbmVudCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIHJlbmRlck1vZGUsIG1vdW50QWxsLCBpc0NoaWxkKSB7XG5cdGlmIChjb21wb25lbnQuX2Rpc2FibGUpIHJldHVybjtcblxuXHR2YXIgcHJvcHMgPSBjb21wb25lbnQucHJvcHMsXG5cdCAgICBzdGF0ZSA9IGNvbXBvbmVudC5zdGF0ZSxcblx0ICAgIGNvbnRleHQgPSBjb21wb25lbnQuY29udGV4dCxcblx0ICAgIHByZXZpb3VzUHJvcHMgPSBjb21wb25lbnQucHJldlByb3BzIHx8IHByb3BzLFxuXHQgICAgcHJldmlvdXNTdGF0ZSA9IGNvbXBvbmVudC5wcmV2U3RhdGUgfHwgc3RhdGUsXG5cdCAgICBwcmV2aW91c0NvbnRleHQgPSBjb21wb25lbnQucHJldkNvbnRleHQgfHwgY29udGV4dCxcblx0ICAgIGlzVXBkYXRlID0gY29tcG9uZW50LmJhc2UsXG5cdCAgICBuZXh0QmFzZSA9IGNvbXBvbmVudC5uZXh0QmFzZSxcblx0ICAgIGluaXRpYWxCYXNlID0gaXNVcGRhdGUgfHwgbmV4dEJhc2UsXG5cdCAgICBpbml0aWFsQ2hpbGRDb21wb25lbnQgPSBjb21wb25lbnQuX2NvbXBvbmVudCxcblx0ICAgIHNraXAgPSBmYWxzZSxcblx0ICAgIHNuYXBzaG90ID0gcHJldmlvdXNDb250ZXh0LFxuXHQgICAgcmVuZGVyZWQsXG5cdCAgICBpbnN0LFxuXHQgICAgY2Jhc2U7XG5cblx0aWYgKGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMpIHtcblx0XHRzdGF0ZSA9IGV4dGVuZChleHRlbmQoe30sIHN0YXRlKSwgY29tcG9uZW50LmNvbnN0cnVjdG9yLmdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyhwcm9wcywgc3RhdGUpKTtcblx0XHRjb21wb25lbnQuc3RhdGUgPSBzdGF0ZTtcblx0fVxuXG5cdGlmIChpc1VwZGF0ZSkge1xuXHRcdGNvbXBvbmVudC5wcm9wcyA9IHByZXZpb3VzUHJvcHM7XG5cdFx0Y29tcG9uZW50LnN0YXRlID0gcHJldmlvdXNTdGF0ZTtcblx0XHRjb21wb25lbnQuY29udGV4dCA9IHByZXZpb3VzQ29udGV4dDtcblx0XHRpZiAocmVuZGVyTW9kZSAhPT0gMiAmJiBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlICYmIGNvbXBvbmVudC5zaG91bGRDb21wb25lbnRVcGRhdGUocHJvcHMsIHN0YXRlLCBjb250ZXh0KSA9PT0gZmFsc2UpIHtcblx0XHRcdHNraXAgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxVcGRhdGUpIHtcblx0XHRcdGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCk7XG5cdFx0fVxuXHRcdGNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuXHRcdGNvbXBvbmVudC5zdGF0ZSA9IHN0YXRlO1xuXHRcdGNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcblx0fVxuXG5cdGNvbXBvbmVudC5wcmV2UHJvcHMgPSBjb21wb25lbnQucHJldlN0YXRlID0gY29tcG9uZW50LnByZXZDb250ZXh0ID0gY29tcG9uZW50Lm5leHRCYXNlID0gbnVsbDtcblx0Y29tcG9uZW50Ll9kaXJ0eSA9IGZhbHNlO1xuXG5cdGlmICghc2tpcCkge1xuXHRcdHJlbmRlcmVkID0gY29tcG9uZW50LnJlbmRlcihwcm9wcywgc3RhdGUsIGNvbnRleHQpO1xuXG5cdFx0aWYgKGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQpIHtcblx0XHRcdGNvbnRleHQgPSBleHRlbmQoZXh0ZW5kKHt9LCBjb250ZXh0KSwgY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpKTtcblx0XHR9XG5cblx0XHRpZiAoaXNVcGRhdGUgJiYgY29tcG9uZW50LmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKSB7XG5cdFx0XHRzbmFwc2hvdCA9IGNvbXBvbmVudC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZShwcmV2aW91c1Byb3BzLCBwcmV2aW91c1N0YXRlKTtcblx0XHR9XG5cblx0XHR2YXIgY2hpbGRDb21wb25lbnQgPSByZW5kZXJlZCAmJiByZW5kZXJlZC5ub2RlTmFtZSxcblx0XHQgICAgdG9Vbm1vdW50LFxuXHRcdCAgICBiYXNlO1xuXG5cdFx0aWYgKHR5cGVvZiBjaGlsZENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuXG5cdFx0XHR2YXIgY2hpbGRQcm9wcyA9IGdldE5vZGVQcm9wcyhyZW5kZXJlZCk7XG5cdFx0XHRpbnN0ID0gaW5pdGlhbENoaWxkQ29tcG9uZW50O1xuXG5cdFx0XHRpZiAoaW5zdCAmJiBpbnN0LmNvbnN0cnVjdG9yID09PSBjaGlsZENvbXBvbmVudCAmJiBjaGlsZFByb3BzLmtleSA9PSBpbnN0Ll9fa2V5KSB7XG5cdFx0XHRcdHNldENvbXBvbmVudFByb3BzKGluc3QsIGNoaWxkUHJvcHMsIDEsIGNvbnRleHQsIGZhbHNlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRvVW5tb3VudCA9IGluc3Q7XG5cblx0XHRcdFx0Y29tcG9uZW50Ll9jb21wb25lbnQgPSBpbnN0ID0gY3JlYXRlQ29tcG9uZW50KGNoaWxkQ29tcG9uZW50LCBjaGlsZFByb3BzLCBjb250ZXh0KTtcblx0XHRcdFx0aW5zdC5uZXh0QmFzZSA9IGluc3QubmV4dEJhc2UgfHwgbmV4dEJhc2U7XG5cdFx0XHRcdGluc3QuX3BhcmVudENvbXBvbmVudCA9IGNvbXBvbmVudDtcblx0XHRcdFx0c2V0Q29tcG9uZW50UHJvcHMoaW5zdCwgY2hpbGRQcm9wcywgMCwgY29udGV4dCwgZmFsc2UpO1xuXHRcdFx0XHRyZW5kZXJDb21wb25lbnQoaW5zdCwgMSwgbW91bnRBbGwsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRiYXNlID0gaW5zdC5iYXNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYmFzZSA9IGluaXRpYWxCYXNlO1xuXG5cdFx0XHR0b1VubW91bnQgPSBpbml0aWFsQ2hpbGRDb21wb25lbnQ7XG5cdFx0XHRpZiAodG9Vbm1vdW50KSB7XG5cdFx0XHRcdGNiYXNlID0gY29tcG9uZW50Ll9jb21wb25lbnQgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW5pdGlhbEJhc2UgfHwgcmVuZGVyTW9kZSA9PT0gMSkge1xuXHRcdFx0XHRpZiAoY2Jhc2UpIGNiYXNlLl9jb21wb25lbnQgPSBudWxsO1xuXHRcdFx0XHRiYXNlID0gZGlmZihjYmFzZSwgcmVuZGVyZWQsIGNvbnRleHQsIG1vdW50QWxsIHx8ICFpc1VwZGF0ZSwgaW5pdGlhbEJhc2UgJiYgaW5pdGlhbEJhc2UucGFyZW50Tm9kZSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGluaXRpYWxCYXNlICYmIGJhc2UgIT09IGluaXRpYWxCYXNlICYmIGluc3QgIT09IGluaXRpYWxDaGlsZENvbXBvbmVudCkge1xuXHRcdFx0dmFyIGJhc2VQYXJlbnQgPSBpbml0aWFsQmFzZS5wYXJlbnROb2RlO1xuXHRcdFx0aWYgKGJhc2VQYXJlbnQgJiYgYmFzZSAhPT0gYmFzZVBhcmVudCkge1xuXHRcdFx0XHRiYXNlUGFyZW50LnJlcGxhY2VDaGlsZChiYXNlLCBpbml0aWFsQmFzZSk7XG5cblx0XHRcdFx0aWYgKCF0b1VubW91bnQpIHtcblx0XHRcdFx0XHRpbml0aWFsQmFzZS5fY29tcG9uZW50ID0gbnVsbDtcblx0XHRcdFx0XHRyZWNvbGxlY3ROb2RlVHJlZShpbml0aWFsQmFzZSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRvVW5tb3VudCkge1xuXHRcdFx0dW5tb3VudENvbXBvbmVudCh0b1VubW91bnQpO1xuXHRcdH1cblxuXHRcdGNvbXBvbmVudC5iYXNlID0gYmFzZTtcblx0XHRpZiAoYmFzZSAmJiAhaXNDaGlsZCkge1xuXHRcdFx0dmFyIGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudCxcblx0XHRcdCAgICB0ID0gY29tcG9uZW50O1xuXHRcdFx0d2hpbGUgKHQgPSB0Ll9wYXJlbnRDb21wb25lbnQpIHtcblx0XHRcdFx0KGNvbXBvbmVudFJlZiA9IHQpLmJhc2UgPSBiYXNlO1xuXHRcdFx0fVxuXHRcdFx0YmFzZS5fY29tcG9uZW50ID0gY29tcG9uZW50UmVmO1xuXHRcdFx0YmFzZS5fY29tcG9uZW50Q29uc3RydWN0b3IgPSBjb21wb25lbnRSZWYuY29uc3RydWN0b3I7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFpc1VwZGF0ZSB8fCBtb3VudEFsbCkge1xuXHRcdG1vdW50cy51bnNoaWZ0KGNvbXBvbmVudCk7XG5cdH0gZWxzZSBpZiAoIXNraXApIHtcblxuXHRcdGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKSB7XG5cdFx0XHRjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKHByZXZpb3VzUHJvcHMsIHByZXZpb3VzU3RhdGUsIHNuYXBzaG90KTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMuYWZ0ZXJVcGRhdGUpIG9wdGlvbnMuYWZ0ZXJVcGRhdGUoY29tcG9uZW50KTtcblx0fVxuXG5cdHdoaWxlIChjb21wb25lbnQuX3JlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRjb21wb25lbnQuX3JlbmRlckNhbGxiYWNrcy5wb3AoKS5jYWxsKGNvbXBvbmVudCk7XG5cdH1pZiAoIWRpZmZMZXZlbCAmJiAhaXNDaGlsZCkgZmx1c2hNb3VudHMoKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRDb21wb25lbnRGcm9tVk5vZGUoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwpIHtcblx0dmFyIGMgPSBkb20gJiYgZG9tLl9jb21wb25lbnQsXG5cdCAgICBvcmlnaW5hbENvbXBvbmVudCA9IGMsXG5cdCAgICBvbGREb20gPSBkb20sXG5cdCAgICBpc0RpcmVjdE93bmVyID0gYyAmJiBkb20uX2NvbXBvbmVudENvbnN0cnVjdG9yID09PSB2bm9kZS5ub2RlTmFtZSxcblx0ICAgIGlzT3duZXIgPSBpc0RpcmVjdE93bmVyLFxuXHQgICAgcHJvcHMgPSBnZXROb2RlUHJvcHModm5vZGUpO1xuXHR3aGlsZSAoYyAmJiAhaXNPd25lciAmJiAoYyA9IGMuX3BhcmVudENvbXBvbmVudCkpIHtcblx0XHRpc093bmVyID0gYy5jb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWU7XG5cdH1cblxuXHRpZiAoYyAmJiBpc093bmVyICYmICghbW91bnRBbGwgfHwgYy5fY29tcG9uZW50KSkge1xuXHRcdHNldENvbXBvbmVudFByb3BzKGMsIHByb3BzLCAzLCBjb250ZXh0LCBtb3VudEFsbCk7XG5cdFx0ZG9tID0gYy5iYXNlO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChvcmlnaW5hbENvbXBvbmVudCAmJiAhaXNEaXJlY3RPd25lcikge1xuXHRcdFx0dW5tb3VudENvbXBvbmVudChvcmlnaW5hbENvbXBvbmVudCk7XG5cdFx0XHRkb20gPSBvbGREb20gPSBudWxsO1xuXHRcdH1cblxuXHRcdGMgPSBjcmVhdGVDb21wb25lbnQodm5vZGUubm9kZU5hbWUsIHByb3BzLCBjb250ZXh0KTtcblx0XHRpZiAoZG9tICYmICFjLm5leHRCYXNlKSB7XG5cdFx0XHRjLm5leHRCYXNlID0gZG9tO1xuXG5cdFx0XHRvbGREb20gPSBudWxsO1xuXHRcdH1cblx0XHRzZXRDb21wb25lbnRQcm9wcyhjLCBwcm9wcywgMSwgY29udGV4dCwgbW91bnRBbGwpO1xuXHRcdGRvbSA9IGMuYmFzZTtcblxuXHRcdGlmIChvbGREb20gJiYgZG9tICE9PSBvbGREb20pIHtcblx0XHRcdG9sZERvbS5fY29tcG9uZW50ID0gbnVsbDtcblx0XHRcdHJlY29sbGVjdE5vZGVUcmVlKG9sZERvbSwgZmFsc2UpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkb207XG59XG5cbmZ1bmN0aW9uIHVubW91bnRDb21wb25lbnQoY29tcG9uZW50KSB7XG5cdGlmIChvcHRpb25zLmJlZm9yZVVubW91bnQpIG9wdGlvbnMuYmVmb3JlVW5tb3VudChjb21wb25lbnQpO1xuXG5cdHZhciBiYXNlID0gY29tcG9uZW50LmJhc2U7XG5cblx0Y29tcG9uZW50Ll9kaXNhYmxlID0gdHJ1ZTtcblxuXHRpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KSBjb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcblxuXHRjb21wb25lbnQuYmFzZSA9IG51bGw7XG5cblx0dmFyIGlubmVyID0gY29tcG9uZW50Ll9jb21wb25lbnQ7XG5cdGlmIChpbm5lcikge1xuXHRcdHVubW91bnRDb21wb25lbnQoaW5uZXIpO1xuXHR9IGVsc2UgaWYgKGJhc2UpIHtcblx0XHRpZiAoYmFzZVsnX19wcmVhY3RhdHRyXyddICYmIGJhc2VbJ19fcHJlYWN0YXR0cl8nXS5yZWYpIGJhc2VbJ19fcHJlYWN0YXR0cl8nXS5yZWYobnVsbCk7XG5cblx0XHRjb21wb25lbnQubmV4dEJhc2UgPSBiYXNlO1xuXG5cdFx0cmVtb3ZlTm9kZShiYXNlKTtcblx0XHRyZWN5Y2xlckNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuXG5cdFx0cmVtb3ZlQ2hpbGRyZW4oYmFzZSk7XG5cdH1cblxuXHRpZiAoY29tcG9uZW50Ll9fcmVmKSBjb21wb25lbnQuX19yZWYobnVsbCk7XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCkge1xuXHR0aGlzLl9kaXJ0eSA9IHRydWU7XG5cblx0dGhpcy5jb250ZXh0ID0gY29udGV4dDtcblxuXHR0aGlzLnByb3BzID0gcHJvcHM7XG5cblx0dGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGUgfHwge307XG5cblx0dGhpcy5fcmVuZGVyQ2FsbGJhY2tzID0gW107XG59XG5cbmV4dGVuZChDb21wb25lbnQucHJvdG90eXBlLCB7XG5cdHNldFN0YXRlOiBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSwgY2FsbGJhY2spIHtcblx0XHRpZiAoIXRoaXMucHJldlN0YXRlKSB0aGlzLnByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG5cdFx0dGhpcy5zdGF0ZSA9IGV4dGVuZChleHRlbmQoe30sIHRoaXMuc3RhdGUpLCB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicgPyBzdGF0ZSh0aGlzLnN0YXRlLCB0aGlzLnByb3BzKSA6IHN0YXRlKTtcblx0XHRpZiAoY2FsbGJhY2spIHRoaXMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHRlbnF1ZXVlUmVuZGVyKHRoaXMpO1xuXHR9LFxuXHRmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoY2FsbGJhY2spIHtcblx0XHRpZiAoY2FsbGJhY2spIHRoaXMuX3JlbmRlckNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHRyZW5kZXJDb21wb25lbnQodGhpcywgMik7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge31cbn0pO1xuXG5mdW5jdGlvbiByZW5kZXIodm5vZGUsIHBhcmVudCwgbWVyZ2UpIHtcbiAgcmV0dXJuIGRpZmYobWVyZ2UsIHZub2RlLCB7fSwgZmFsc2UsIHBhcmVudCwgZmFsc2UpO1xufVxuXG52YXIgcHJlYWN0ID0ge1xuXHRoOiBoLFxuXHRjcmVhdGVFbGVtZW50OiBoLFxuXHRjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcblx0Q29tcG9uZW50OiBDb21wb25lbnQsXG5cdHJlbmRlcjogcmVuZGVyLFxuXHRyZXJlbmRlcjogcmVyZW5kZXIsXG5cdG9wdGlvbnM6IG9wdGlvbnNcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHByZWFjdDtcbmV4cG9ydCB7IGgsIGggYXMgY3JlYXRlRWxlbWVudCwgY2xvbmVFbGVtZW50LCBDb21wb25lbnQsIHJlbmRlciwgcmVyZW5kZXIsIG9wdGlvbnMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByZWFjdC5tanMubWFwXG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjcnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICByZXR1cm4gISFtZXRob2QgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWNhbGxcbiAgICBhcmcgPyBtZXRob2QuY2FsbChudWxsLCBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sIDEpIDogbWV0aG9kLmNhbGwobnVsbCk7XG4gIH0pO1xufTtcbiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFNSQyA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKTtcbnZhciBUT19TVFJJTkcgPSAndG9TdHJpbmcnO1xudmFyICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR107XG52YXIgVFBMID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsLCBzYWZlKSB7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZiAoT1trZXldID09PSB2YWwpIHJldHVybjtcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZiAoTyA9PT0gZ2xvYmFsKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2UgaWYgKCFzYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfSBlbHNlIGlmIChPW2tleV0pIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcbiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiBjb3JlLnZlcnNpb24sXG4gIG1vZGU6IHJlcXVpcmUoJy4vX2xpYnJhcnknKSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE4IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG4iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBGUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgbmFtZVJFID0gL15cXHMqZnVuY3Rpb24gKFteIChdKikvO1xudmFyIE5BTUUgPSAnbmFtZSc7XG5cbi8vIDE5LjIuNC4yIG5hbWVcbk5BTUUgaW4gRlByb3RvIHx8IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgZFAoRlByb3RvLCBOQU1FLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoJycgKyB0aGlzKS5tYXRjaChuYW1lUkUpWzFdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkbWFwID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDEpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10ubWFwLCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTUgLyAxNS40LjQuMTkgQXJyYXkucHJvdG90eXBlLm1hcChjYWxsYmFja2ZuIFssIHRoaXNBcmddKVxuICBtYXA6IGZ1bmN0aW9uIG1hcChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkbWFwKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbn0pO1xuIiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGFzYyA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUWVBFLCAkY3JlYXRlKSB7XG4gIHZhciBJU19NQVAgPSBUWVBFID09IDE7XG4gIHZhciBJU19GSUxURVIgPSBUWVBFID09IDI7XG4gIHZhciBJU19TT01FID0gVFlQRSA9PSAzO1xuICB2YXIgSVNfRVZFUlkgPSBUWVBFID09IDQ7XG4gIHZhciBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2O1xuICB2YXIgTk9fSE9MRVMgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWDtcbiAgdmFyIGNyZWF0ZSA9ICRjcmVhdGUgfHwgYXNjO1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJT2JqZWN0KE8pO1xuICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsLCByZXM7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKSB7XG4gICAgICB2YWwgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSByZXN1bHRbaW5kZXhdID0gcmVzOyAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmIChyZXMpIHN3aXRjaCAoVFlQRSkge1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZiAoSVNfRVZFUlkpIHJldHVybiBmYWxzZTsgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHJlc3VsdDtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcbiIsInZhciBzdG9yZSA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbnZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2w7XG52YXIgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJGluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciAkbmF0aXZlID0gW10uaW5kZXhPZjtcbnZhciBORUdBVElWRV9aRVJPID0gISEkbmF0aXZlICYmIDEgLyBbMV0uaW5kZXhPZigxLCAtMCkgPCAwO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChORUdBVElWRV9aRVJPIHx8ICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoJG5hdGl2ZSkpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy4xMSAvIDE1LjQuNC4xNCBBcnJheS5wcm90b3R5cGUuaW5kZXhPZihzZWFyY2hFbGVtZW50IFssIGZyb21JbmRleF0pXG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gTkVHQVRJVkVfWkVST1xuICAgICAgLy8gY29udmVydCAtMCB0byArMFxuICAgICAgPyAkbmF0aXZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgMFxuICAgICAgOiAkaW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbiIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0JywgeyBjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKSB9KTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHJlbmRlciB9IGZyb20gJ3ByZWFjdCcgLyoqIEBqc3ggY3JlYXRlRWxlbWVudCAqL1xuaW1wb3J0IEF1dG9jb21wbGV0ZSBmcm9tICcuL2F1dG9jb21wbGV0ZSdcblxuZnVuY3Rpb24gYWNjZXNzaWJsZUF1dG9jb21wbGV0ZSAob3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMuZWxlbWVudCkgeyB0aHJvdyBuZXcgRXJyb3IoJ2VsZW1lbnQgaXMgbm90IGRlZmluZWQnKSB9XG4gIGlmICghb3B0aW9ucy5pZCkgeyB0aHJvdyBuZXcgRXJyb3IoJ2lkIGlzIG5vdCBkZWZpbmVkJykgfVxuICBpZiAoIW9wdGlvbnMuc291cmNlKSB7IHRocm93IG5ldyBFcnJvcignc291cmNlIGlzIG5vdCBkZWZpbmVkJykgfVxuICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLnNvdXJjZSkpIHtcbiAgICBvcHRpb25zLnNvdXJjZSA9IGNyZWF0ZVNpbXBsZUVuZ2luZShvcHRpb25zLnNvdXJjZSlcbiAgfVxuICByZW5kZXIoPEF1dG9jb21wbGV0ZSB7Li4ub3B0aW9uc30gLz4sIG9wdGlvbnMuZWxlbWVudClcbn1cblxuY29uc3QgY3JlYXRlU2ltcGxlRW5naW5lID0gKHZhbHVlcykgPT4gKHF1ZXJ5LCBzeW5jUmVzdWx0cykgPT4ge1xuICBpZiAoIXF1ZXJ5KSB7XG4gICAgc3luY1Jlc3VsdHMoW10pXG4gIH0gZWxzZSB7XG4gICAgdmFyIG1hdGNoZXMgPSB2YWx1ZXMuZmlsdGVyKHIgPT4gci50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudG9Mb3dlckNhc2UoKSkgIT09IC0xKVxuICAgIHN5bmNSZXN1bHRzKG1hdGNoZXMpXG4gIH1cbn1cblxuYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS5lbmhhbmNlU2VsZWN0RWxlbWVudCA9IChjb25maWd1cmF0aW9uT3B0aW9ucykgPT4ge1xuICBpZiAoIWNvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQpIHsgdGhyb3cgbmV3IEVycm9yKCdzZWxlY3RFbGVtZW50IGlzIG5vdCBkZWZpbmVkJykgfVxuXG4gIC8vIFNldCBkZWZhdWx0cy5cbiAgaWYgKCFjb25maWd1cmF0aW9uT3B0aW9ucy5zb3VyY2UpIHtcbiAgICBsZXQgYXZhaWxhYmxlT3B0aW9ucyA9IFtdLmZpbHRlci5jYWxsKGNvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQub3B0aW9ucywgb3B0aW9uID0+IChvcHRpb24udmFsdWUgfHwgY29uZmlndXJhdGlvbk9wdGlvbnMucHJlc2VydmVOdWxsT3B0aW9ucykpXG4gICAgY29uZmlndXJhdGlvbk9wdGlvbnMuc291cmNlID0gYXZhaWxhYmxlT3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi50ZXh0Q29udGVudCB8fCBvcHRpb24uaW5uZXJUZXh0KVxuICB9XG4gIGNvbmZpZ3VyYXRpb25PcHRpb25zLm9uQ29uZmlybSA9IGNvbmZpZ3VyYXRpb25PcHRpb25zLm9uQ29uZmlybSB8fCAocXVlcnkgPT4ge1xuICAgIGNvbnN0IHJlcXVlc3RlZE9wdGlvbiA9IFtdLmZpbHRlci5jYWxsKGNvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQub3B0aW9ucywgb3B0aW9uID0+IChvcHRpb24udGV4dENvbnRlbnQgfHwgb3B0aW9uLmlubmVyVGV4dCkgPT09IHF1ZXJ5KVswXVxuICAgIGlmIChyZXF1ZXN0ZWRPcHRpb24pIHsgcmVxdWVzdGVkT3B0aW9uLnNlbGVjdGVkID0gdHJ1ZSB9XG4gIH0pXG5cbiAgaWYgKGNvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQudmFsdWUgfHwgY29uZmlndXJhdGlvbk9wdGlvbnMuZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBvcHRpb24gPSBjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50Lm9wdGlvbnNbY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudC5vcHRpb25zLnNlbGVjdGVkSW5kZXhdXG4gICAgY29uZmlndXJhdGlvbk9wdGlvbnMuZGVmYXVsdFZhbHVlID0gb3B0aW9uLnRleHRDb250ZW50IHx8IG9wdGlvbi5pbm5lclRleHRcbiAgfVxuXG4gIGlmIChjb25maWd1cmF0aW9uT3B0aW9ucy5uYW1lID09PSB1bmRlZmluZWQpIGNvbmZpZ3VyYXRpb25PcHRpb25zLm5hbWUgPSAnJ1xuICBpZiAoY29uZmlndXJhdGlvbk9wdGlvbnMuaWQgPT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50LmlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZ3VyYXRpb25PcHRpb25zLmlkID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlndXJhdGlvbk9wdGlvbnMuaWQgPSBjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50LmlkXG4gICAgfVxuICB9XG4gIGlmIChjb25maWd1cmF0aW9uT3B0aW9ucy5hdXRvc2VsZWN0ID09PSB1bmRlZmluZWQpIGNvbmZpZ3VyYXRpb25PcHRpb25zLmF1dG9zZWxlY3QgPSB0cnVlXG5cbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbGVtZW50LCBjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50KVxuXG4gIGFjY2Vzc2libGVBdXRvY29tcGxldGUoe1xuICAgIC4uLmNvbmZpZ3VyYXRpb25PcHRpb25zLFxuICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgfSlcblxuICBjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudC5pZCA9IGNvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQuaWQgKyAnLXNlbGVjdCdcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWNjZXNzaWJsZUF1dG9jb21wbGV0ZVxuIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIvLyA5LjQuMi4zIEFycmF5U3BlY2llc0NyZWF0ZShvcmlnaW5hbEFycmF5LCBsZW5ndGgpXG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbCwgbGVuZ3RoKSB7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzLWFycmF5Jyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsKSB7XG4gIHZhciBDO1xuICBpZiAoaXNBcnJheShvcmlnaW5hbCkpIHtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZiAodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKSBDID0gdW5kZWZpbmVkO1xuICAgIGlmIChpc09iamVjdChDKSkge1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZiAoQyA9PT0gbnVsbCkgQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRmaWx0ZXIgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMik7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX3N0cmljdC1tZXRob2QnKShbXS5maWx0ZXIsIHRydWUpLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMy43IC8gMTUuNC40LjIwIEFycmF5LnByb3RvdHlwZS5maWx0ZXIoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJGZpbHRlcih0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbiIsIi8vIDIyLjEuMi4yIC8gMTUuNC4zLjIgQXJyYXkuaXNBcnJheShhcmcpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ0FycmF5JywgeyBpc0FycmF5OiByZXF1aXJlKCcuL19pcy1hcnJheScpIH0pO1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JyAvKiogQGpzeCBjcmVhdGVFbGVtZW50ICovXG5pbXBvcnQgU3RhdHVzIGZyb20gJy4vc3RhdHVzJ1xuaW1wb3J0IERyb3Bkb3duQXJyb3dEb3duIGZyb20gJy4vZHJvcGRvd24tYXJyb3ctZG93bidcblxuY29uc3QgSVNfUFJFQUNUID0gcHJvY2Vzcy5lbnYuQ09NUE9ORU5UX0xJQlJBUlkgPT09ICdQUkVBQ1QnXG5jb25zdCBJU19SRUFDVCA9IHByb2Nlc3MuZW52LkNPTVBPTkVOVF9MSUJSQVJZID09PSAnUkVBQ1QnXG5cbmNvbnN0IGtleUNvZGVzID0ge1xuICAxMzogJ2VudGVyJyxcbiAgMjc6ICdlc2NhcGUnLFxuICAzMjogJ3NwYWNlJyxcbiAgMzg6ICd1cCcsXG4gIDQwOiAnZG93bidcbn1cblxuZnVuY3Rpb24gaXNJb3NEZXZpY2UgKCkge1xuICByZXR1cm4gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvKGlQb2R8aVBob25lfGlQYWQpL2cpICYmIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0L2cpKVxufVxuXG5mdW5jdGlvbiBpc1ByaW50YWJsZUtleUNvZGUgKGtleUNvZGUpIHtcbiAgcmV0dXJuIChcbiAgICAoa2V5Q29kZSA+IDQ3ICYmIGtleUNvZGUgPCA1OCkgfHwgLy8gbnVtYmVyIGtleXNcbiAgICBrZXlDb2RlID09PSAzMiB8fCBrZXlDb2RlID09PSA4IHx8IC8vIHNwYWNlYmFyIG9yIGJhY2tzcGFjZVxuICAgIChrZXlDb2RlID4gNjQgJiYga2V5Q29kZSA8IDkxKSB8fCAvLyBsZXR0ZXIga2V5c1xuICAgIChrZXlDb2RlID4gOTUgJiYga2V5Q29kZSA8IDExMikgfHwgLy8gbnVtcGFkIGtleXNcbiAgICAoa2V5Q29kZSA+IDE4NSAmJiBrZXlDb2RlIDwgMTkzKSB8fCAvLyA7PSwtLi9gIChpbiBvcmRlcilcbiAgICAoa2V5Q29kZSA+IDIxOCAmJiBrZXlDb2RlIDwgMjIzKSAvLyBbXFxdJyAoaW4gb3JkZXIpXG4gIClcbn1cblxuLy8gUHJlYWN0IGRvZXMgbm90IGltcGxlbWVudCBvbkNoYW5nZSBvbiBpbnB1dHMsIGJ1dCBSZWFjdCBkb2VzLlxuZnVuY3Rpb24gb25DaGFuZ2VDcm9zc0xpYnJhcnkgKGhhbmRsZXIpIHtcbiAgaWYgKElTX1BSRUFDVCkgeyByZXR1cm4geyBvbklucHV0OiBoYW5kbGVyIH0gfVxuICBpZiAoSVNfUkVBQ1QpIHsgcmV0dXJuIHsgb25DaGFuZ2U6IGhhbmRsZXIgfSB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9jb21wbGV0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYXV0b3NlbGVjdDogZmFsc2UsXG4gICAgY3NzTmFtZXNwYWNlOiAnYXV0b2NvbXBsZXRlJyxcbiAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgIGRpc3BsYXlNZW51OiAnaW5saW5lJyxcbiAgICBtaW5MZW5ndGg6IDAsXG4gICAgbmFtZTogJ2lucHV0LWF1dG9jb21wbGV0ZScsXG4gICAgcGxhY2Vob2xkZXI6ICcnLFxuICAgIG9uQ29uZmlybTogKCkgPT4ge30sXG4gICAgY29uZmlybU9uQmx1cjogdHJ1ZSxcbiAgICBzaG93Tm9PcHRpb25zRm91bmQ6IHRydWUsXG4gICAgc2hvd0FsbFZhbHVlczogZmFsc2UsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIHROb1Jlc3VsdHM6ICgpID0+ICdObyByZXN1bHRzIGZvdW5kJyxcbiAgICB0QXNzaXN0aXZlSGludDogKCkgPT4gJ1doZW4gYXV0b2NvbXBsZXRlIHJlc3VsdHMgYXJlIGF2YWlsYWJsZSB1c2UgdXAgYW5kIGRvd24gYXJyb3dzIHRvIHJldmlldyBhbmQgZW50ZXIgdG8gc2VsZWN0LiAgVG91Y2ggZGV2aWNlIHVzZXJzLCBleHBsb3JlIGJ5IHRvdWNoIG9yIHdpdGggc3dpcGUgZ2VzdHVyZXMuJyxcbiAgICBkcm9wZG93bkFycm93OiBEcm9wZG93bkFycm93RG93bixcbiAgICBhcmlhTGFiZWxsZWRCeTogdW5kZWZpbmVkXG4gIH1cblxuICBlbGVtZW50UmVmZXJlbmNlcyA9IHt9XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZm9jdXNlZDogbnVsbCxcbiAgICAgIGhvdmVyZWQ6IG51bGwsXG4gICAgICBtZW51T3BlbjogZmFsc2UsXG4gICAgICBvcHRpb25zOiBwcm9wcy5kZWZhdWx0VmFsdWUgPyBbcHJvcHMuZGVmYXVsdFZhbHVlXSA6IFtdLFxuICAgICAgcXVlcnk6IHByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgIHZhbGlkQ2hvaWNlTWFkZTogZmFsc2UsXG4gICAgICBzZWxlY3RlZDogbnVsbCxcbiAgICAgIGFyaWFIaW50OiB0cnVlXG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVDb21wb25lbnRCbHVyID0gdGhpcy5oYW5kbGVDb21wb25lbnRCbHVyLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUtleURvd24gPSB0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlVXBBcnJvdyA9IHRoaXMuaGFuZGxlVXBBcnJvdy5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVEb3duQXJyb3cgPSB0aGlzLmhhbmRsZURvd25BcnJvdy5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVFbnRlciA9IHRoaXMuaGFuZGxlRW50ZXIuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlUHJpbnRhYmxlS2V5ID0gdGhpcy5oYW5kbGVQcmludGFibGVLZXkuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5oYW5kbGVMaXN0TW91c2VMZWF2ZSA9IHRoaXMuaGFuZGxlTGlzdE1vdXNlTGVhdmUuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5oYW5kbGVPcHRpb25CbHVyID0gdGhpcy5oYW5kbGVPcHRpb25CbHVyLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrID0gdGhpcy5oYW5kbGVPcHRpb25DbGljay5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVPcHRpb25Gb2N1cyA9IHRoaXMuaGFuZGxlT3B0aW9uRm9jdXMuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlT3B0aW9uTW91c2VEb3duID0gdGhpcy5oYW5kbGVPcHRpb25Nb3VzZURvd24uYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlT3B0aW9uTW91c2VFbnRlciA9IHRoaXMuaGFuZGxlT3B0aW9uTW91c2VFbnRlci5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLmhhbmRsZUlucHV0Qmx1ciA9IHRoaXMuaGFuZGxlSW5wdXRCbHVyLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlID0gdGhpcy5oYW5kbGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVJbnB1dEZvY3VzID0gdGhpcy5oYW5kbGVJbnB1dEZvY3VzLmJpbmQodGhpcylcblxuICAgIHRoaXMucG9sbElucHV0RWxlbWVudCA9IHRoaXMucG9sbElucHV0RWxlbWVudC5iaW5kKHRoaXMpXG4gICAgdGhpcy5nZXREaXJlY3RJbnB1dENoYW5nZXMgPSB0aGlzLmdldERpcmVjdElucHV0Q2hhbmdlcy5iaW5kKHRoaXMpXG4gIH1cblxuICBpc1F1ZXJ5QW5PcHRpb24gKHF1ZXJ5LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubWFwKGVudHJ5ID0+IHRoaXMudGVtcGxhdGVJbnB1dFZhbHVlKGVudHJ5KS50b0xvd2VyQ2FzZSgpKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpICE9PSAtMVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMucG9sbElucHV0RWxlbWVudCgpXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuJHBvbGxJbnB1dClcbiAgfVxuXG4gIC8vIEFwcGxpY2F0aW9ucyBsaWtlIERyYWdvbiBOYXR1cmFsbHlTcGVha2luZyB3aWxsIG1vZGlmeSB0aGVcbiAgLy8gYGlucHV0YCBmaWVsZCBieSBkaXJlY3RseSBjaGFuZ2luZyBpdHMgYC52YWx1ZWAuIFRoZXNlIGV2ZW50c1xuICAvLyBkb24ndCB0cmlnZ2VyIG91ciBKYXZhU2NyaXB0IGV2ZW50IGxpc3RlbmVycywgc28gd2UgbmVlZCB0byBwb2xsXG4gIC8vIHRvIGhhbmRsZSB3aGVuIGFuZCBpZiB0aGV5IG9jY3VyLlxuICBwb2xsSW5wdXRFbGVtZW50ICgpIHtcbiAgICB0aGlzLmdldERpcmVjdElucHV0Q2hhbmdlcygpXG4gICAgdGhpcy4kcG9sbElucHV0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnBvbGxJbnB1dEVsZW1lbnQoKVxuICAgIH0sIDEwMClcbiAgfVxuXG4gIGdldERpcmVjdElucHV0Q2hhbmdlcyAoKSB7XG4gICAgY29uc3QgaW5wdXRSZWZlcmVuY2UgPSB0aGlzLmVsZW1lbnRSZWZlcmVuY2VzWy0xXVxuICAgIGNvbnN0IHF1ZXJ5SGFzQ2hhbmdlZCA9IGlucHV0UmVmZXJlbmNlICYmIGlucHV0UmVmZXJlbmNlLnZhbHVlICE9PSB0aGlzLnN0YXRlLnF1ZXJ5XG5cbiAgICBpZiAocXVlcnlIYXNDaGFuZ2VkKSB7XG4gICAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlKHsgdGFyZ2V0OiB7IHZhbHVlOiBpbnB1dFJlZmVyZW5jZS52YWx1ZSB9IH0pXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGNvbnN0IHsgZm9jdXNlZCB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IGNvbXBvbmVudExvc3RGb2N1cyA9IGZvY3VzZWQgPT09IG51bGxcbiAgICBjb25zdCBmb2N1c2VkQ2hhbmdlZCA9IHByZXZTdGF0ZS5mb2N1c2VkICE9PSBmb2N1c2VkXG4gICAgY29uc3QgZm9jdXNEaWZmZXJlbnRFbGVtZW50ID0gZm9jdXNlZENoYW5nZWQgJiYgIWNvbXBvbmVudExvc3RGb2N1c1xuICAgIGlmIChmb2N1c0RpZmZlcmVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudFJlZmVyZW5jZXNbZm9jdXNlZF0uZm9jdXMoKVxuICAgIH1cbiAgICBjb25zdCBmb2N1c2VkSW5wdXQgPSBmb2N1c2VkID09PSAtMVxuICAgIGNvbnN0IGNvbXBvbmVudEdhaW5lZEZvY3VzID0gZm9jdXNlZENoYW5nZWQgJiYgcHJldlN0YXRlLmZvY3VzZWQgPT09IG51bGxcbiAgICBjb25zdCBzZWxlY3RBbGxUZXh0ID0gZm9jdXNlZElucHV0ICYmIGNvbXBvbmVudEdhaW5lZEZvY3VzXG4gICAgaWYgKHNlbGVjdEFsbFRleHQpIHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZmVyZW5jZXNbZm9jdXNlZF1cbiAgICAgIGlucHV0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCBpbnB1dEVsZW1lbnQudmFsdWUubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIGhhc0F1dG9zZWxlY3QgKCkge1xuICAgIHJldHVybiBpc0lvc0RldmljZSgpID8gZmFsc2UgOiB0aGlzLnByb3BzLmF1dG9zZWxlY3RcbiAgfVxuXG4gIC8vIFRoaXMgdGVtcGxhdGUgaXMgdXNlZCB3aGVuIGNvbnZlcnRpbmcgZnJvbSBhIHN0YXRlLm9wdGlvbnMgb2JqZWN0IGludG8gYSBzdGF0ZS5xdWVyeS5cbiAgdGVtcGxhdGVJbnB1dFZhbHVlICh2YWx1ZSkge1xuICAgIGNvbnN0IGlucHV0VmFsdWVUZW1wbGF0ZSA9IHRoaXMucHJvcHMudGVtcGxhdGVzICYmIHRoaXMucHJvcHMudGVtcGxhdGVzLmlucHV0VmFsdWVcbiAgICByZXR1cm4gaW5wdXRWYWx1ZVRlbXBsYXRlID8gaW5wdXRWYWx1ZVRlbXBsYXRlKHZhbHVlKSA6IHZhbHVlXG4gIH1cblxuICAvLyBUaGlzIHRlbXBsYXRlIGlzIHVzZWQgd2hlbiBkaXNwbGF5aW5nIHJlc3VsdHMgLyBzdWdnZXN0aW9ucy5cbiAgdGVtcGxhdGVTdWdnZXN0aW9uICh2YWx1ZSkge1xuICAgIGNvbnN0IHN1Z2dlc3Rpb25UZW1wbGF0ZSA9IHRoaXMucHJvcHMudGVtcGxhdGVzICYmIHRoaXMucHJvcHMudGVtcGxhdGVzLnN1Z2dlc3Rpb25cbiAgICByZXR1cm4gc3VnZ2VzdGlvblRlbXBsYXRlID8gc3VnZ2VzdGlvblRlbXBsYXRlKHZhbHVlKSA6IHZhbHVlXG4gIH1cblxuICBoYW5kbGVDb21wb25lbnRCbHVyIChuZXdTdGF0ZSkge1xuICAgIGNvbnN0IHsgb3B0aW9ucywgcXVlcnksIHNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlXG4gICAgbGV0IG5ld1F1ZXJ5XG4gICAgaWYgKHRoaXMucHJvcHMuY29uZmlybU9uQmx1cikge1xuICAgICAgbmV3UXVlcnkgPSBuZXdTdGF0ZS5xdWVyeSB8fCBxdWVyeVxuICAgICAgdGhpcy5wcm9wcy5vbkNvbmZpcm0ob3B0aW9uc1tzZWxlY3RlZF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1F1ZXJ5ID0gcXVlcnlcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmb2N1c2VkOiBudWxsLFxuICAgICAgbWVudU9wZW46IG5ld1N0YXRlLm1lbnVPcGVuIHx8IGZhbHNlLFxuICAgICAgcXVlcnk6IG5ld1F1ZXJ5LFxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICB2YWxpZENob2ljZU1hZGU6IHRoaXMuaXNRdWVyeUFuT3B0aW9uKG5ld1F1ZXJ5LCBvcHRpb25zKVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVMaXN0TW91c2VMZWF2ZSAoZXZlbnQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhvdmVyZWQ6IG51bGxcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlT3B0aW9uQmx1ciAoZXZlbnQsIGluZGV4KSB7XG4gICAgY29uc3QgeyBmb2N1c2VkLCBtZW51T3Blbiwgb3B0aW9ucywgc2VsZWN0ZWQgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBmb2N1c2luZ091dHNpZGVDb21wb25lbnQgPSBldmVudC5yZWxhdGVkVGFyZ2V0ID09PSBudWxsXG4gICAgY29uc3QgZm9jdXNpbmdJbnB1dCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT09IHRoaXMuZWxlbWVudFJlZmVyZW5jZXNbLTFdXG4gICAgY29uc3QgZm9jdXNpbmdBbm90aGVyT3B0aW9uID0gZm9jdXNlZCAhPT0gaW5kZXggJiYgZm9jdXNlZCAhPT0gLTFcbiAgICBjb25zdCBibHVyQ29tcG9uZW50ID0gKCFmb2N1c2luZ0Fub3RoZXJPcHRpb24gJiYgZm9jdXNpbmdPdXRzaWRlQ29tcG9uZW50KSB8fCAhKGZvY3VzaW5nQW5vdGhlck9wdGlvbiB8fCBmb2N1c2luZ0lucHV0KVxuICAgIGlmIChibHVyQ29tcG9uZW50KSB7XG4gICAgICBjb25zdCBrZWVwTWVudU9wZW4gPSBtZW51T3BlbiAmJiBpc0lvc0RldmljZSgpXG4gICAgICB0aGlzLmhhbmRsZUNvbXBvbmVudEJsdXIoe1xuICAgICAgICBtZW51T3Blbjoga2VlcE1lbnVPcGVuLFxuICAgICAgICBxdWVyeTogdGhpcy50ZW1wbGF0ZUlucHV0VmFsdWUob3B0aW9uc1tzZWxlY3RlZF0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUlucHV0Qmx1ciAoZXZlbnQpIHtcbiAgICBjb25zdCB7IGZvY3VzZWQsIG1lbnVPcGVuLCBvcHRpb25zLCBxdWVyeSwgc2VsZWN0ZWQgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBmb2N1c2luZ0FuT3B0aW9uID0gZm9jdXNlZCAhPT0gLTFcbiAgICBpZiAoIWZvY3VzaW5nQW5PcHRpb24pIHtcbiAgICAgIGNvbnN0IGtlZXBNZW51T3BlbiA9IG1lbnVPcGVuICYmIGlzSW9zRGV2aWNlKClcbiAgICAgIGNvbnN0IG5ld1F1ZXJ5ID0gaXNJb3NEZXZpY2UoKSA/IHF1ZXJ5IDogdGhpcy50ZW1wbGF0ZUlucHV0VmFsdWUob3B0aW9uc1tzZWxlY3RlZF0pXG4gICAgICB0aGlzLmhhbmRsZUNvbXBvbmVudEJsdXIoe1xuICAgICAgICBtZW51T3Blbjoga2VlcE1lbnVPcGVuLFxuICAgICAgICBxdWVyeTogbmV3UXVlcnlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlSW5wdXRDaGFuZ2UgKGV2ZW50KSB7XG4gICAgY29uc3QgeyBtaW5MZW5ndGgsIHNvdXJjZSwgc2hvd0FsbFZhbHVlcyB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGF1dG9zZWxlY3QgPSB0aGlzLmhhc0F1dG9zZWxlY3QoKVxuICAgIGNvbnN0IHF1ZXJ5ID0gZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgY29uc3QgcXVlcnlFbXB0eSA9IHF1ZXJ5Lmxlbmd0aCA9PT0gMFxuICAgIGNvbnN0IHF1ZXJ5Q2hhbmdlZCA9IHRoaXMuc3RhdGUucXVlcnkgIT09IHF1ZXJ5XG4gICAgY29uc3QgcXVlcnlMb25nRW5vdWdoID0gcXVlcnkubGVuZ3RoID49IG1pbkxlbmd0aFxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBxdWVyeSxcbiAgICAgIGFyaWFIaW50OiBxdWVyeUVtcHR5XG4gICAgfSlcblxuICAgIGNvbnN0IHNlYXJjaEZvck9wdGlvbnMgPSBzaG93QWxsVmFsdWVzIHx8IChxdWVyeUNoYW5nZWQgJiYgcXVlcnlMb25nRW5vdWdoKVxuICAgIGlmIChzZWFyY2hGb3JPcHRpb25zKSB7XG4gICAgICBzb3VyY2UocXVlcnksIChvcHRpb25zKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnNBdmFpbGFibGUgPSBvcHRpb25zLmxlbmd0aCA+IDBcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWVudU9wZW46IG9wdGlvbnNBdmFpbGFibGUsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICBzZWxlY3RlZDogKGF1dG9zZWxlY3QgJiYgb3B0aW9uc0F2YWlsYWJsZSkgPyAwIDogLTEsXG4gICAgICAgICAgdmFsaWRDaG9pY2VNYWRlOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoIXF1ZXJ5TG9uZ0Vub3VnaCkge1xuICAgICAgc291cmNlKCcnLCAob3B0aW9ucykgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zQXZhaWxhYmxlID0gb3B0aW9ucy5sZW5ndGggPiAwXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1lbnVPcGVuOiBvcHRpb25zQXZhaWxhYmxlLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgc2VsZWN0ZWQ6IChhdXRvc2VsZWN0ICYmIG9wdGlvbnNBdmFpbGFibGUpID8gMCA6IC0xLFxuICAgICAgICAgIHZhbGlkQ2hvaWNlTWFkZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlSW5wdXRDbGljayAoZXZlbnQpIHtcbiAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KVxuICB9XG5cbiAgaGFuZGxlSW5wdXRGb2N1cyAoZXZlbnQpIHtcbiAgICBjb25zdCB7IHF1ZXJ5LCB2YWxpZENob2ljZU1hZGUsIG9wdGlvbnMgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCB7IG1pbkxlbmd0aCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHNob3VsZFJlb3Blbk1lbnUgPSAhdmFsaWRDaG9pY2VNYWRlICYmIHF1ZXJ5Lmxlbmd0aCA+PSBtaW5MZW5ndGggJiYgb3B0aW9ucy5sZW5ndGggPiAwXG5cbiAgICBpZiAoc2hvdWxkUmVvcGVuTWVudSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSgoeyBtZW51T3BlbiB9KSA9PiAoeyBmb2N1c2VkOiAtMSwgbWVudU9wZW46IHNob3VsZFJlb3Blbk1lbnUgfHwgbWVudU9wZW4sIHNlbGVjdGVkOiAtMSB9KSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IC0xIH0pXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3B0aW9uRm9jdXMgKGluZGV4KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmb2N1c2VkOiBpbmRleCxcbiAgICAgIGhvdmVyZWQ6IG51bGwsXG4gICAgICBzZWxlY3RlZDogaW5kZXhcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlT3B0aW9uTW91c2VFbnRlciAoZXZlbnQsIGluZGV4KSB7XG4gICAgLy8gaU9TIFNhZmFyaSBwcmV2ZW50cyBjbGljayBldmVudCBpZiBtb3VzZWVudGVyIGFkZHMgaG92ZXIgYmFja2dyb3VuZCBjb2xvdXJcbiAgICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9saWJyYXJ5L2FyY2hpdmUvZG9jdW1lbnRhdGlvbi9BcHBsZUFwcGxpY2F0aW9ucy9SZWZlcmVuY2UvU2FmYXJpV2ViQ29udGVudC9IYW5kbGluZ0V2ZW50cy9IYW5kbGluZ0V2ZW50cy5odG1sIy8vYXBwbGVfcmVmL2RvYy91aWQvVFA0MDAwNjUxMS1TVzRcbiAgICBpZiAoIWlzSW9zRGV2aWNlKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBob3ZlcmVkOiBpbmRleFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcHRpb25DbGljayAoZXZlbnQsIGluZGV4KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLnN0YXRlLm9wdGlvbnNbaW5kZXhdXG4gICAgY29uc3QgbmV3UXVlcnkgPSB0aGlzLnRlbXBsYXRlSW5wdXRWYWx1ZShzZWxlY3RlZE9wdGlvbilcbiAgICB0aGlzLnByb3BzLm9uQ29uZmlybShzZWxlY3RlZE9wdGlvbilcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGZvY3VzZWQ6IC0xLFxuICAgICAgaG92ZXJlZDogbnVsbCxcbiAgICAgIG1lbnVPcGVuOiBmYWxzZSxcbiAgICAgIHF1ZXJ5OiBuZXdRdWVyeSxcbiAgICAgIHNlbGVjdGVkOiAtMSxcbiAgICAgIHZhbGlkQ2hvaWNlTWFkZTogdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gIH1cblxuICBoYW5kbGVPcHRpb25Nb3VzZURvd24gKGV2ZW50KSB7XG4gICAgLy8gU2FmYXJpIHRyaWdnZXJzIGZvY3VzT3V0IGJlZm9yZSBjbGljaywgYnV0IGlmIHlvdVxuICAgIC8vIHByZXZlbnREZWZhdWx0IG9uIG1vdXNlRG93biwgeW91IGNhbiBzdG9wIHRoYXQgZnJvbSBoYXBwZW5pbmcuXG4gICAgLy8gSWYgdGhpcyBpcyByZW1vdmVkLCBjbGlja2luZyBvbiBhbiBvcHRpb24gaW4gU2FmYXJpIHdpbGwgdHJpZ2dlclxuICAgIC8vIGBoYW5kbGVPcHRpb25CbHVyYCwgd2hpY2ggY2xvc2VzIHRoZSBtZW51LCBhbmQgdGhlIGNsaWNrIHdpbGxcbiAgICAvLyB0cmlnZ2VyIG9uIHRoZSBlbGVtZW50IHVuZGVybmVhdGggaW5zdGVhZC5cbiAgICAvLyBTZWU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzYyMTcxMS9ob3ctdG8tcHJldmVudC1ibHVyLXJ1bm5pbmctd2hlbi1jbGlja2luZy1hLWxpbmstaW4tanF1ZXJ5XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgaGFuZGxlVXBBcnJvdyAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgeyBtZW51T3Blbiwgc2VsZWN0ZWQgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBpc05vdEF0VG9wID0gc2VsZWN0ZWQgIT09IC0xXG4gICAgY29uc3QgYWxsb3dNb3ZlVXAgPSBpc05vdEF0VG9wICYmIG1lbnVPcGVuXG4gICAgaWYgKGFsbG93TW92ZVVwKSB7XG4gICAgICB0aGlzLmhhbmRsZU9wdGlvbkZvY3VzKHNlbGVjdGVkIC0gMSlcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEb3duQXJyb3cgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGlmIG5vdCBvcGVuLCBvcGVuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0FsbFZhbHVlcyAmJiB0aGlzLnN0YXRlLm1lbnVPcGVuID09PSBmYWxzZSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgdGhpcy5wcm9wcy5zb3VyY2UoJycsIChvcHRpb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1lbnVPcGVuOiB0cnVlLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgc2VsZWN0ZWQ6IDAsXG4gICAgICAgICAgZm9jdXNlZDogMCxcbiAgICAgICAgICBob3ZlcmVkOiBudWxsXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5tZW51T3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgeyBtZW51T3Blbiwgb3B0aW9ucywgc2VsZWN0ZWQgfSA9IHRoaXMuc3RhdGVcbiAgICAgIGNvbnN0IGlzTm90QXRCb3R0b20gPSBzZWxlY3RlZCAhPT0gb3B0aW9ucy5sZW5ndGggLSAxXG4gICAgICBjb25zdCBhbGxvd01vdmVEb3duID0gaXNOb3RBdEJvdHRvbSAmJiBtZW51T3BlblxuICAgICAgaWYgKGFsbG93TW92ZURvd24pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25Gb2N1cyhzZWxlY3RlZCArIDEpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU3BhY2UgKGV2ZW50KSB7XG4gICAgLy8gaWYgbm90IG9wZW4sIG9wZW5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93QWxsVmFsdWVzICYmIHRoaXMuc3RhdGUubWVudU9wZW4gPT09IGZhbHNlICYmIHRoaXMuc3RhdGUucXVlcnkgPT09ICcnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLnByb3BzLnNvdXJjZSgnJywgKG9wdGlvbnMpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgbWVudU9wZW46IHRydWUsXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgZm9jdXNJc09uT3B0aW9uID0gdGhpcy5zdGF0ZS5mb2N1c2VkICE9PSAtMVxuICAgIGlmIChmb2N1c0lzT25PcHRpb24pIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2soZXZlbnQsIHRoaXMuc3RhdGUuZm9jdXNlZClcbiAgICB9XG4gIH1cblxuICBoYW5kbGVFbnRlciAoZXZlbnQpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5tZW51T3Blbikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgY29uc3QgaGFzU2VsZWN0ZWRPcHRpb24gPSB0aGlzLnN0YXRlLnNlbGVjdGVkID49IDBcbiAgICAgIGlmIChoYXNTZWxlY3RlZE9wdGlvbikge1xuICAgICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKGV2ZW50LCB0aGlzLnN0YXRlLnNlbGVjdGVkKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVByaW50YWJsZUtleSAoZXZlbnQpIHtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWZlcmVuY2VzWy0xXVxuICAgIGNvbnN0IGV2ZW50SXNPbklucHV0ID0gZXZlbnQudGFyZ2V0ID09PSBpbnB1dEVsZW1lbnRcbiAgICBpZiAoIWV2ZW50SXNPbklucHV0KSB7XG4gICAgICAvLyBGSVhNRTogVGhpcyB3b3VsZCBiZSBiZXR0ZXIgaWYgaXQgd2FzIGluIGNvbXBvbmVudERpZFVwZGF0ZSxcbiAgICAgIC8vIGJ1dCB1c2luZyBzZXRTdGF0ZSB0byB0cmlnZ2VyIHRoYXQgc2VlbXMgdG8gbm90IHdvcmsgY29ycmVjdGx5XG4gICAgICAvLyBpbiBwcmVhY3RAOC4xLjAuXG4gICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUtleURvd24gKGV2ZW50KSB7XG4gICAgc3dpdGNoIChrZXlDb2Rlc1tldmVudC5rZXlDb2RlXSkge1xuICAgICAgY2FzZSAndXAnOlxuICAgICAgICB0aGlzLmhhbmRsZVVwQXJyb3coZXZlbnQpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdkb3duJzpcbiAgICAgICAgdGhpcy5oYW5kbGVEb3duQXJyb3coZXZlbnQpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzcGFjZSc6XG4gICAgICAgIHRoaXMuaGFuZGxlU3BhY2UoZXZlbnQpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdlbnRlcic6XG4gICAgICAgIHRoaXMuaGFuZGxlRW50ZXIoZXZlbnQpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdlc2NhcGUnOlxuICAgICAgICB0aGlzLmhhbmRsZUNvbXBvbmVudEJsdXIoe1xuICAgICAgICAgIHF1ZXJ5OiB0aGlzLnN0YXRlLnF1ZXJ5XG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoaXNQcmludGFibGVLZXlDb2RlKGV2ZW50LmtleUNvZGUpKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVQcmludGFibGVLZXkoZXZlbnQpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNzc05hbWVzcGFjZSxcbiAgICAgIGRpc3BsYXlNZW51LFxuICAgICAgaWQsXG4gICAgICBtaW5MZW5ndGgsXG4gICAgICBuYW1lLFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICByZXF1aXJlZCxcbiAgICAgIHNob3dBbGxWYWx1ZXMsXG4gICAgICB0Tm9SZXN1bHRzLFxuICAgICAgdFN0YXR1c1F1ZXJ5VG9vU2hvcnQsXG4gICAgICB0U3RhdHVzTm9SZXN1bHRzLFxuICAgICAgdFN0YXR1c1NlbGVjdGVkT3B0aW9uLFxuICAgICAgdFN0YXR1c1Jlc3VsdHMsXG4gICAgICB0QXNzaXN0aXZlSGludCxcbiAgICAgIGRyb3Bkb3duQXJyb3c6IGRyb3Bkb3duQXJyb3dGYWN0b3J5LFxuICAgICAgYXJpYUxhYmVsbGVkQnlcbiAgICB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgZm9jdXNlZCwgaG92ZXJlZCwgbWVudU9wZW4sIG9wdGlvbnMsIHF1ZXJ5LCBzZWxlY3RlZCwgYXJpYUhpbnQsIHZhbGlkQ2hvaWNlTWFkZSB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IGF1dG9zZWxlY3QgPSB0aGlzLmhhc0F1dG9zZWxlY3QoKVxuXG4gICAgY29uc3QgaW5wdXRGb2N1c2VkID0gZm9jdXNlZCA9PT0gLTFcbiAgICBjb25zdCBub09wdGlvbnNBdmFpbGFibGUgPSBvcHRpb25zLmxlbmd0aCA9PT0gMFxuICAgIGNvbnN0IHF1ZXJ5Tm90RW1wdHkgPSBxdWVyeS5sZW5ndGggIT09IDBcbiAgICBjb25zdCBxdWVyeUxvbmdFbm91Z2ggPSBxdWVyeS5sZW5ndGggPj0gbWluTGVuZ3RoXG4gICAgY29uc3Qgc2hvd05vT3B0aW9uc0ZvdW5kID0gdGhpcy5wcm9wcy5zaG93Tm9PcHRpb25zRm91bmQgJiZcbiAgICAgIGlucHV0Rm9jdXNlZCAmJiBub09wdGlvbnNBdmFpbGFibGUgJiYgcXVlcnlOb3RFbXB0eSAmJiBxdWVyeUxvbmdFbm91Z2hcblxuICAgIGNvbnN0IHdyYXBwZXJDbGFzc05hbWUgPSBgJHtjc3NOYW1lc3BhY2V9X193cmFwcGVyYFxuXG4gICAgY29uc3QgaW5wdXRDbGFzc05hbWUgPSBgJHtjc3NOYW1lc3BhY2V9X19pbnB1dGBcbiAgICBjb25zdCBjb21wb25lbnRJc0ZvY3VzZWQgPSBmb2N1c2VkICE9PSBudWxsXG4gICAgY29uc3QgaW5wdXRNb2RpZmllckZvY3VzZWQgPSBjb21wb25lbnRJc0ZvY3VzZWQgPyBgICR7aW5wdXRDbGFzc05hbWV9LS1mb2N1c2VkYCA6ICcnXG4gICAgY29uc3QgaW5wdXRNb2RpZmllclR5cGUgPSB0aGlzLnByb3BzLnNob3dBbGxWYWx1ZXMgPyBgICR7aW5wdXRDbGFzc05hbWV9LS1zaG93LWFsbC12YWx1ZXNgIDogYCAke2lucHV0Q2xhc3NOYW1lfS0tZGVmYXVsdGBcbiAgICBjb25zdCBkcm9wZG93bkFycm93Q2xhc3NOYW1lID0gYCR7Y3NzTmFtZXNwYWNlfV9fZHJvcGRvd24tYXJyb3ctZG93bmBcbiAgICBjb25zdCBvcHRpb25Gb2N1c2VkID0gZm9jdXNlZCAhPT0gLTEgJiYgZm9jdXNlZCAhPT0gbnVsbFxuXG4gICAgY29uc3QgbWVudUNsYXNzTmFtZSA9IGAke2Nzc05hbWVzcGFjZX1fX21lbnVgXG4gICAgY29uc3QgbWVudU1vZGlmaWVyRGlzcGxheU1lbnUgPSBgJHttZW51Q2xhc3NOYW1lfS0tJHtkaXNwbGF5TWVudX1gXG4gICAgY29uc3QgbWVudUlzVmlzaWJsZSA9IG1lbnVPcGVuIHx8IHNob3dOb09wdGlvbnNGb3VuZFxuICAgIGNvbnN0IG1lbnVNb2RpZmllclZpc2liaWxpdHkgPSBgJHttZW51Q2xhc3NOYW1lfS0tJHsobWVudUlzVmlzaWJsZSkgPyAndmlzaWJsZScgOiAnaGlkZGVuJ31gXG5cbiAgICBjb25zdCBvcHRpb25DbGFzc05hbWUgPSBgJHtjc3NOYW1lc3BhY2V9X19vcHRpb25gXG5cbiAgICBjb25zdCBoaW50Q2xhc3NOYW1lID0gYCR7Y3NzTmFtZXNwYWNlfV9faGludGBcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblRleHQgPSB0aGlzLnRlbXBsYXRlSW5wdXRWYWx1ZShvcHRpb25zW3NlbGVjdGVkXSlcbiAgICBjb25zdCBvcHRpb25CZWdpbnNXaXRoUXVlcnkgPSBzZWxlY3RlZE9wdGlvblRleHQgJiZcbiAgICAgIHNlbGVjdGVkT3B0aW9uVGV4dC50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudG9Mb3dlckNhc2UoKSkgPT09IDBcbiAgICBjb25zdCBoaW50VmFsdWUgPSAob3B0aW9uQmVnaW5zV2l0aFF1ZXJ5ICYmIGF1dG9zZWxlY3QpXG4gICAgICA/IHF1ZXJ5ICsgc2VsZWN0ZWRPcHRpb25UZXh0LnN1YnN0cihxdWVyeS5sZW5ndGgpXG4gICAgICA6ICcnXG5cbiAgICBjb25zdCBhc3Npc3RpdmVIaW50SUQgPSBpZCArICdfX2Fzc2lzdGl2ZUhpbnQnXG4gICAgY29uc3QgYXJpYURlc2NyaWJlZFByb3AgPSAoYXJpYUhpbnQpID8ge1xuICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiBhc3Npc3RpdmVIaW50SURcbiAgICB9IDogbnVsbFxuXG4gICAgbGV0IGRyb3Bkb3duQXJyb3dcblxuICAgIC8vIHdlIG9ubHkgbmVlZCBhIGRyb3Bkb3duIGFycm93IGlmIHNob3dBbGxWYWx1ZXMgaXMgc2V0IHRvIGEgdHJ1dGh5IHZhbHVlXG4gICAgaWYgKHNob3dBbGxWYWx1ZXMpIHtcbiAgICAgIGRyb3Bkb3duQXJyb3cgPSBkcm9wZG93bkFycm93RmFjdG9yeSh7IGNsYXNzTmFtZTogZHJvcGRvd25BcnJvd0NsYXNzTmFtZSB9KVxuXG4gICAgICAvLyBpZiB0aGUgZmFjdG9yeSByZXR1cm5zIGEgc3RyaW5nIHdlJ2xsIHJlbmRlciB0aGlzIGFzIEhUTUwgKHVzYWdlIHcvbyAoUClSZWFjdClcbiAgICAgIGlmICh0eXBlb2YgZHJvcGRvd25BcnJvdyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZHJvcGRvd25BcnJvdyA9IDxkaXYgY2xhc3NOYW1lPXtgJHtjc3NOYW1lc3BhY2V9X19kcm9wZG93bi1hcnJvdy1kb3duLXdyYXBwZXJgfSBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGRyb3Bkb3duQXJyb3cgfX0gLz5cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3dyYXBwZXJDbGFzc05hbWV9IG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufT5cbiAgICAgICAgPFN0YXR1c1xuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBsZW5ndGg9e29wdGlvbnMubGVuZ3RofVxuICAgICAgICAgIHF1ZXJ5TGVuZ3RoPXtxdWVyeS5sZW5ndGh9XG4gICAgICAgICAgbWluUXVlcnlMZW5ndGg9e21pbkxlbmd0aH1cbiAgICAgICAgICBzZWxlY3RlZE9wdGlvbj17dGhpcy50ZW1wbGF0ZUlucHV0VmFsdWUob3B0aW9uc1tzZWxlY3RlZF0pfVxuICAgICAgICAgIHNlbGVjdGVkT3B0aW9uSW5kZXg9e3NlbGVjdGVkfVxuICAgICAgICAgIHZhbGlkQ2hvaWNlTWFkZT17dmFsaWRDaG9pY2VNYWRlfVxuICAgICAgICAgIGlzSW5Gb2N1cz17dGhpcy5zdGF0ZS5mb2N1c2VkICE9PSBudWxsfVxuICAgICAgICAgIHRRdWVyeVRvb1Nob3J0PXt0U3RhdHVzUXVlcnlUb29TaG9ydH1cbiAgICAgICAgICB0Tm9SZXN1bHRzPXt0U3RhdHVzTm9SZXN1bHRzfVxuICAgICAgICAgIHRTZWxlY3RlZE9wdGlvbj17dFN0YXR1c1NlbGVjdGVkT3B0aW9ufVxuICAgICAgICAgIHRSZXN1bHRzPXt0U3RhdHVzUmVzdWx0c31cbiAgICAgICAgLz5cblxuICAgICAgICB7aGludFZhbHVlICYmIChcbiAgICAgICAgICA8c3Bhbj48aW5wdXQgY2xhc3NOYW1lPXtoaW50Q2xhc3NOYW1lfSByZWFkb25seSB0YWJJbmRleD0nLTEnIHZhbHVlPXtoaW50VmFsdWV9IC8+PC9zcGFuPlxuICAgICAgICApfVxuXG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e21lbnVPcGVuID8gJ3RydWUnIDogJ2ZhbHNlJ31cbiAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e29wdGlvbkZvY3VzZWQgPyBgJHtpZH1fX29wdGlvbi0tJHtmb2N1c2VkfWAgOiB1bmRlZmluZWR9XG4gICAgICAgICAgYXJpYS1vd25zPXtgJHtpZH1fX2xpc3Rib3hgfVxuICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPXsodGhpcy5oYXNBdXRvc2VsZWN0KCkpID8gJ2JvdGgnIDogJ2xpc3QnfVxuICAgICAgICAgIHsuLi5hcmlhRGVzY3JpYmVkUHJvcH1cbiAgICAgICAgICBhdXRvQ29tcGxldGU9J29mZidcbiAgICAgICAgICBjbGFzc05hbWU9e2Ake2lucHV0Q2xhc3NOYW1lfSR7aW5wdXRNb2RpZmllckZvY3VzZWR9JHtpbnB1dE1vZGlmaWVyVHlwZX1gfVxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlSW5wdXRDbGljayhldmVudCl9XG4gICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUlucHV0Qmx1cn1cbiAgICAgICAgICB7Li4ub25DaGFuZ2VDcm9zc0xpYnJhcnkodGhpcy5oYW5kbGVJbnB1dENoYW5nZSl9XG4gICAgICAgICAgb25Gb2N1cz17dGhpcy5oYW5kbGVJbnB1dEZvY3VzfVxuICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIHJlZj17KGlucHV0RWxlbWVudCkgPT4geyB0aGlzLmVsZW1lbnRSZWZlcmVuY2VzWy0xXSA9IGlucHV0RWxlbWVudCB9fVxuICAgICAgICAgIHR5cGU9J3RleHQnXG4gICAgICAgICAgcm9sZT0nY29tYm9ib3gnXG4gICAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxuICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgLz5cblxuICAgICAgICB7ZHJvcGRvd25BcnJvd31cblxuICAgICAgICA8dWxcbiAgICAgICAgICBjbGFzc05hbWU9e2Ake21lbnVDbGFzc05hbWV9ICR7bWVudU1vZGlmaWVyRGlzcGxheU1lbnV9ICR7bWVudU1vZGlmaWVyVmlzaWJpbGl0eX1gfVxuICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZUxpc3RNb3VzZUxlYXZlKGV2ZW50KX1cbiAgICAgICAgICBhcmlhLWxhYmVsbGVkYnk9e2FyaWFMYWJlbGxlZEJ5fVxuICAgICAgICAgIGlkPXtgJHtpZH1fX2xpc3Rib3hgfVxuICAgICAgICAgIHJvbGU9J2xpc3Rib3gnXG4gICAgICAgID5cbiAgICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNob3dGb2N1c2VkID0gZm9jdXNlZCA9PT0gLTEgPyBzZWxlY3RlZCA9PT0gaW5kZXggOiBmb2N1c2VkID09PSBpbmRleFxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTW9kaWZpZXJGb2N1c2VkID0gc2hvd0ZvY3VzZWQgJiYgaG92ZXJlZCA9PT0gbnVsbCA/IGAgJHtvcHRpb25DbGFzc05hbWV9LS1mb2N1c2VkYCA6ICcnXG4gICAgICAgICAgICBjb25zdCBvcHRpb25Nb2RpZmllck9kZCA9IChpbmRleCAlIDIpID8gYCAke29wdGlvbkNsYXNzTmFtZX0tLW9kZGAgOiAnJ1xuICAgICAgICAgICAgY29uc3QgaW9zUG9zaW5zZXRIdG1sID0gKGlzSW9zRGV2aWNlKCkpXG4gICAgICAgICAgICAgID8gYDxzcGFuIGlkPSR7aWR9X19vcHRpb24tc3VmZml4LS0ke2luZGV4fSBzdHlsZT1cImJvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O2AgK1xuICAgICAgICAgICAgICAgICdtYXJnaW5Cb3R0b206LTFweDttYXJnaW5SaWdodDotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7JyArXG4gICAgICAgICAgICAgICAgJ3doaXRlU3BhY2U6bm93cmFwO3dpZHRoOjFweFwiPicgKyBgICR7aW5kZXggKyAxfSBvZiAke29wdGlvbnMubGVuZ3RofTwvc3Bhbj5gXG4gICAgICAgICAgICAgIDogJydcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17Zm9jdXNlZCA9PT0gaW5kZXggPyAndHJ1ZScgOiAnZmFsc2UnfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YCR7b3B0aW9uQ2xhc3NOYW1lfSR7b3B0aW9uTW9kaWZpZXJGb2N1c2VkfSR7b3B0aW9uTW9kaWZpZXJPZGR9YH1cbiAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRoaXMudGVtcGxhdGVTdWdnZXN0aW9uKG9wdGlvbikgKyBpb3NQb3NpbnNldEh0bWwgfX1cbiAgICAgICAgICAgICAgICBpZD17YCR7aWR9X19vcHRpb24tLSR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZU9wdGlvbkJsdXIoZXZlbnQsIGluZGV4KX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2soZXZlbnQsIGluZGV4KX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5oYW5kbGVPcHRpb25Nb3VzZURvd259XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlT3B0aW9uTW91c2VFbnRlcihldmVudCwgaW5kZXgpfVxuICAgICAgICAgICAgICAgIHJlZj17KG9wdGlvbkVsKSA9PiB7IHRoaXMuZWxlbWVudFJlZmVyZW5jZXNbaW5kZXhdID0gb3B0aW9uRWwgfX1cbiAgICAgICAgICAgICAgICByb2xlPSdvcHRpb24nXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJ1xuICAgICAgICAgICAgICAgIGFyaWEtcG9zaW5zZXQ9e2luZGV4ICsgMX1cbiAgICAgICAgICAgICAgICBhcmlhLXNldHNpemU9e29wdGlvbnMubGVuZ3RofVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pfVxuXG4gICAgICAgICAge3Nob3dOb09wdGlvbnNGb3VuZCAmJiAoXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtgJHtvcHRpb25DbGFzc05hbWV9ICR7b3B0aW9uQ2xhc3NOYW1lfS0tbm8tcmVzdWx0c2B9Pnt0Tm9SZXN1bHRzKCl9PC9saT5cbiAgICAgICAgICApfVxuICAgICAgICA8L3VsPlxuXG4gICAgICAgIDxzcGFuIGlkPXthc3Npc3RpdmVIaW50SUR9IHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT57dEFzc2lzdGl2ZUhpbnQoKX08L3NwYW4+XG5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIi8vIDE5LjIuMy4yIC8gMTUuMy40LjUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQodGhpc0FyZywgYXJncy4uLilcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnRnVuY3Rpb24nLCB7IGJpbmQ6IHJlcXVpcmUoJy4vX2JpbmQnKSB9KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBhcnJheVNsaWNlID0gW10uc2xpY2U7XG52YXIgZmFjdG9yaWVzID0ge307XG5cbnZhciBjb25zdHJ1Y3QgPSBmdW5jdGlvbiAoRiwgbGVuLCBhcmdzKSB7XG4gIGlmICghKGxlbiBpbiBmYWN0b3JpZXMpKSB7XG4gICAgZm9yICh2YXIgbiA9IFtdLCBpID0gMDsgaSA8IGxlbjsgaSsrKSBuW2ldID0gJ2FbJyArIGkgKyAnXSc7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgZmFjdG9yaWVzW2xlbl0gPSBGdW5jdGlvbignRixhJywgJ3JldHVybiBuZXcgRignICsgbi5qb2luKCcsJykgKyAnKScpO1xuICB9IHJldHVybiBmYWN0b3JpZXNbbGVuXShGLCBhcmdzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24uYmluZCB8fCBmdW5jdGlvbiBiaW5kKHRoYXQgLyogLCAuLi5hcmdzICovKSB7XG4gIHZhciBmbiA9IGFGdW5jdGlvbih0aGlzKTtcbiAgdmFyIHBhcnRBcmdzID0gYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHZhciBib3VuZCA9IGZ1bmN0aW9uICgvKiBhcmdzLi4uICovKSB7XG4gICAgdmFyIGFyZ3MgPSBwYXJ0QXJncy5jb25jYXQoYXJyYXlTbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgYm91bmQgPyBjb25zdHJ1Y3QoZm4sIGFyZ3MubGVuZ3RoLCBhcmdzKSA6IGludm9rZShmbiwgYXJncywgdGhhdCk7XG4gIH07XG4gIGlmIChpc09iamVjdChmbi5wcm90b3R5cGUpKSBib3VuZC5wcm90b3R5cGUgPSBmbi5wcm90b3R5cGU7XG4gIHJldHVybiBib3VuZDtcbn07XG4iLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG4iLCIvLyBAQG1hdGNoIGxvZ2ljXG5yZXF1aXJlKCcuL19maXgtcmUtd2tzJykoJ21hdGNoJywgMSwgZnVuY3Rpb24gKGRlZmluZWQsIE1BVENILCAkbWF0Y2gpIHtcbiAgLy8gMjEuMS4zLjExIFN0cmluZy5wcm90b3R5cGUubWF0Y2gocmVnZXhwKVxuICByZXR1cm4gW2Z1bmN0aW9uIG1hdGNoKHJlZ2V4cCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgTyA9IGRlZmluZWQodGhpcyk7XG4gICAgdmFyIGZuID0gcmVnZXhwID09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHJlZ2V4cFtNQVRDSF07XG4gICAgcmV0dXJuIGZuICE9PSB1bmRlZmluZWQgPyBmbi5jYWxsKHJlZ2V4cCwgTykgOiBuZXcgUmVnRXhwKHJlZ2V4cClbTUFUQ0hdKFN0cmluZyhPKSk7XG4gIH0sICRtYXRjaF07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBsZW5ndGgsIGV4ZWMpIHtcbiAgdmFyIFNZTUJPTCA9IHdrcyhLRVkpO1xuICB2YXIgZm5zID0gZXhlYyhkZWZpbmVkLCBTWU1CT0wsICcnW0tFWV0pO1xuICB2YXIgc3RyZm4gPSBmbnNbMF07XG4gIHZhciByeGZuID0gZm5zWzFdO1xuICBpZiAoZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPSA3O1xuICB9KSkge1xuICAgIHJlZGVmaW5lKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgc3RyZm4pO1xuICAgIGhpZGUoUmVnRXhwLnByb3RvdHlwZSwgU1lNQk9MLCBsZW5ndGggPT0gMlxuICAgICAgLy8gMjEuMi41LjggUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdKHN0cmluZywgcmVwbGFjZVZhbHVlKVxuICAgICAgLy8gMjEuMi41LjExIFJlZ0V4cC5wcm90b3R5cGVbQEBzcGxpdF0oc3RyaW5nLCBsaW1pdClcbiAgICAgID8gZnVuY3Rpb24gKHN0cmluZywgYXJnKSB7IHJldHVybiByeGZuLmNhbGwoc3RyaW5nLCB0aGlzLCBhcmcpOyB9XG4gICAgICAvLyAyMS4yLjUuNiBSZWdFeHAucHJvdG90eXBlW0BAbWF0Y2hdKHN0cmluZylcbiAgICAgIC8vIDIxLjIuNS45IFJlZ0V4cC5wcm90b3R5cGVbQEBzZWFyY2hdKHN0cmluZylcbiAgICAgIDogZnVuY3Rpb24gKHN0cmluZykgeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcyk7IH1cbiAgICApO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JyAvKiogQGpzeCBjcmVhdGVFbGVtZW50ICovXG5cbmNvbnN0IGRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICB2YXIgdGltZW91dFxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpc1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGltZW91dCA9IG51bGxcbiAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgfVxuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpXG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgfVxufVxuY29uc3Qgc3RhdHVzRGVib3VuY2VNaWxsaXMgPSAxNDAwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXR1cyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdFF1ZXJ5VG9vU2hvcnQ6IChtaW5RdWVyeUxlbmd0aCkgPT4gYFR5cGUgaW4gJHttaW5RdWVyeUxlbmd0aH0gb3IgbW9yZSBjaGFyYWN0ZXJzIGZvciByZXN1bHRzYCxcbiAgICB0Tm9SZXN1bHRzOiAoKSA9PiAnTm8gc2VhcmNoIHJlc3VsdHMnLFxuICAgIHRTZWxlY3RlZE9wdGlvbjogKHNlbGVjdGVkT3B0aW9uLCBsZW5ndGgsIGluZGV4KSA9PiBgJHtzZWxlY3RlZE9wdGlvbn0gJHtpbmRleCArIDF9IG9mICR7bGVuZ3RofSBpcyBoaWdobGlnaHRlZGAsXG4gICAgdFJlc3VsdHM6IChsZW5ndGgsIGNvbnRlbnRTZWxlY3RlZE9wdGlvbikgPT4ge1xuICAgICAgY29uc3Qgd29yZHMgPSB7XG4gICAgICAgIHJlc3VsdDogKGxlbmd0aCA9PT0gMSkgPyAncmVzdWx0JyA6ICdyZXN1bHRzJyxcbiAgICAgICAgaXM6IChsZW5ndGggPT09IDEpID8gJ2lzJyA6ICdhcmUnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHtsZW5ndGh9ICR7d29yZHMucmVzdWx0fSAke3dvcmRzLmlzfSBhdmFpbGFibGUuICR7Y29udGVudFNlbGVjdGVkT3B0aW9ufWBcbiAgICB9XG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgYnVtcDogZmFsc2UsXG4gICAgZGVib3VuY2VkOiBmYWxzZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xuICAgIHRoaXMuZGVib3VuY2VTdGF0dXNVcGRhdGUgPSBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoYXQuc3RhdGUuZGVib3VuY2VkKSB7XG4gICAgICAgIGNvbnN0IHNob3VsZFNpbGVuY2UgPSAhdGhhdC5wcm9wcy5pc0luRm9jdXMgfHwgdGhhdC5wcm9wcy52YWxpZENob2ljZU1hZGVcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSgoeyBidW1wIH0pID0+ICh7IGJ1bXA6ICFidW1wLCBkZWJvdW5jZWQ6IHRydWUsIHNpbGVuY2VkOiBzaG91bGRTaWxlbmNlIH0pKVxuICAgICAgfVxuICAgIH0sIHN0YXR1c0RlYm91bmNlTWlsbGlzKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAoeyBxdWVyeUxlbmd0aCB9KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRlYm91bmNlZDogZmFsc2UgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBsZW5ndGgsXG4gICAgICBxdWVyeUxlbmd0aCxcbiAgICAgIG1pblF1ZXJ5TGVuZ3RoLFxuICAgICAgc2VsZWN0ZWRPcHRpb24sXG4gICAgICBzZWxlY3RlZE9wdGlvbkluZGV4LFxuICAgICAgdFF1ZXJ5VG9vU2hvcnQsXG4gICAgICB0Tm9SZXN1bHRzLFxuICAgICAgdFNlbGVjdGVkT3B0aW9uLFxuICAgICAgdFJlc3VsdHNcbiAgICB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHsgYnVtcCwgZGVib3VuY2VkLCBzaWxlbmNlZCB9ID0gdGhpcy5zdGF0ZVxuXG4gICAgY29uc3QgcXVlcnlUb29TaG9ydCA9IHF1ZXJ5TGVuZ3RoIDwgbWluUXVlcnlMZW5ndGhcbiAgICBjb25zdCBub1Jlc3VsdHMgPSBsZW5ndGggPT09IDBcblxuICAgIGNvbnN0IGNvbnRlbnRTZWxlY3RlZE9wdGlvbiA9IHNlbGVjdGVkT3B0aW9uXG4gICAgICA/IHRTZWxlY3RlZE9wdGlvbihzZWxlY3RlZE9wdGlvbiwgbGVuZ3RoLCBzZWxlY3RlZE9wdGlvbkluZGV4KVxuICAgICAgOiAnJ1xuXG4gICAgbGV0IGNvbnRlbnQgPSBudWxsXG4gICAgaWYgKHF1ZXJ5VG9vU2hvcnQpIHtcbiAgICAgIGNvbnRlbnQgPSB0UXVlcnlUb29TaG9ydChtaW5RdWVyeUxlbmd0aClcbiAgICB9IGVsc2UgaWYgKG5vUmVzdWx0cykge1xuICAgICAgY29udGVudCA9IHROb1Jlc3VsdHMoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gdFJlc3VsdHMobGVuZ3RoLCBjb250ZW50U2VsZWN0ZWRPcHRpb24pXG4gICAgfVxuXG4gICAgdGhpcy5kZWJvdW5jZVN0YXR1c1VwZGF0ZSgpXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGJvcmRlcjogJzAnLFxuICAgICAgICAgIGNsaXA6ICdyZWN0KDAgMCAwIDApJyxcbiAgICAgICAgICBoZWlnaHQ6ICcxcHgnLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJy0xcHgnLFxuICAgICAgICAgIG1hcmdpblJpZ2h0OiAnLTFweCcsXG4gICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICB3aWR0aDogJzFweCdcbiAgICAgICAgfX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBpZD17aWQgKyAnX19zdGF0dXMtLUEnfVxuICAgICAgICAgIHJvbGU9J3N0YXR1cydcbiAgICAgICAgICBhcmlhLWF0b21pYz0ndHJ1ZSdcbiAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgeyghc2lsZW5jZWQgJiYgZGVib3VuY2VkICYmIGJ1bXApID8gY29udGVudCA6ICcnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGlkPXtpZCArICdfX3N0YXR1cy0tQid9XG4gICAgICAgICAgcm9sZT0nc3RhdHVzJ1xuICAgICAgICAgIGFyaWEtYXRvbWljPSd0cnVlJ1xuICAgICAgICAgIGFyaWEtbGl2ZT0ncG9saXRlJz5cbiAgICAgICAgICB7KCFzaWxlbmNlZCAmJiBkZWJvdW5jZWQgJiYgIWJ1bXApID8gY29udGVudCA6ICcnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJ3ByZWFjdCcgLyoqIEBqc3ggY3JlYXRlRWxlbWVudCAqL1xuXG5jb25zdCBEcm9wZG93bkFycm93RG93biA9ICh7IGNsYXNzTmFtZSB9KSA9PiAoXG4gIDxzdmcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBmb2N1c2FibGU9J2ZhbHNlJz5cbiAgICA8ZyBzdHJva2U9J25vbmUnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG4gICAgICA8cG9seWdvbiBmaWxsPScjMDAwMDAwJyBwb2ludHM9JzAgMCAyMiAwIDExIDE3JyAvPlxuICAgIDwvZz5cbiAgPC9zdmc+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duQXJyb3dEb3duXG4iLCIvLyBXZSB1c2Ugb3VyIG93biBmb3JrIG9mIGFjY2Vzc2libGUtYXV0b2NvbXBsZXRlIGJlY2F1c2UgdGhlIG1haW4gcGFja2FnZSBpcyBub3QgYmVpbmcgYWN0aXZlbHkgbWFpbnRhaW5lZCBhbmQgaGFzIGJ1Z3Mgd2hpY2ggd2UgbmVlZGVkIHRvIGZpeFxuLy8gVGhlcmUgaXMgYSBjaGFuZ2Vsb2cgZm9yIHRoZSBmaXhlcyB3ZSd2ZSBhZGRlZCAtLSBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Jsb2IvbWFzdGVyL0NIQU5HRUxPRy5tZCMyMTAtLS0yMDIxLTA1LTI0XG4vLyBCZWxvdyBhcmUgdGhlIHB1bGwtcmVxdWVzdHMgdG8gYWNjZXNzaWJsZS1hdXRvY29tcGxldGUgd2hpY2ggd291bGQgZml4IHRoZSBidWdzOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FscGhhZ292L2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL3B1bGwvNDk3XG4vLyBodHRwczovL2dpdGh1Yi5jb20vYWxwaGFnb3YvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvcHVsbC80OTFcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHBoYWdvdi9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9wdWxsLzQ5NlxuLy8gSWYgdGhlIGFib3ZlIHB1bGwtcmVxdWVzdHMgYXJlIG1lcmdlZCBhbmQgcHVibGlzaGVkLCB0aGVuIHdlIGNhbiBzdG9wIHVzaW5nIG91ciBmb3JrXG5pbXBvcnQgYWNjZXNzaWJsZUF1dG9jb21wbGV0ZSBmcm9tICdAZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlJztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3VnZ2VzdGlvbiAtIFRleHQgd2hpY2ggaXMgZ29pbmcgdG8gYmUgc3VnZ2VzdGVkIHRvIHRoZSB1c2VyXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBUZXh0IHdoaWNoIHdhcyB0eXBlZCBpbnRvIHRoZSBhdXRvY29tcGxldGUgYnkgdGhlIHVzZXJcbiAqIEByZXR1cm5zIHtbc3RyaW5nLCBib29sZWFuXVtdfSBBbiBhcnJheSBvZiBhcnJheXMgd2hpY2ggY29udGFpbiB0d28gaXRlbXMsIHRoZSBmaXJzdCBpcyB0aGUgY2hhcmFjdGVyIGluIHRoZSBzdWdnZXN0aW9uLCB0aGUgc2Vjb25kIGlzIGEgYm9vbGVhbiB3aGljaCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgY2hhcmFjdGVyIHNob3VsZCBiZSBoaWdobGlnaHRlZC5cbiAqL1xuZnVuY3Rpb24gaGlnaGxpZ2h0U3VnZ2VzdGlvbihzdWdnZXN0aW9uLCBxdWVyeSkge1xuXHRjb25zdCByZXN1bHQgPSBzdWdnZXN0aW9uLnNwbGl0KCcnKTtcblxuXHRjb25zdCBtYXRjaEluZGV4ID0gc3VnZ2VzdGlvbi50b0xvY2FsZUxvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudG9Mb2NhbGVMb3dlckNhc2UoKSk7XG5cdHJldHVybiByZXN1bHQubWFwKGZ1bmN0aW9uKGNoYXJhY3RlciwgaW5kZXgpIHtcblx0XHRsZXQgc2hvdWxkSGlnaGxpZ2h0ID0gdHJ1ZTtcblx0XHRjb25zdCBoYXNNYXRjaGVkID0gbWF0Y2hJbmRleCA+IC0xO1xuXHRcdGNvbnN0IGNoYXJhY3RlcklzV2l0aGluTWF0Y2ggPSBpbmRleCA+PSBtYXRjaEluZGV4ICYmIGluZGV4IDw9IG1hdGNoSW5kZXggKyBxdWVyeS5sZW5ndGggLSAxO1xuXHRcdGlmIChoYXNNYXRjaGVkICYmIGNoYXJhY3RlcklzV2l0aGluTWF0Y2gpIHtcblx0XHRcdHNob3VsZEhpZ2hsaWdodCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gW2NoYXJhY3Rlciwgc2hvdWxkSGlnaGxpZ2h0XTtcblx0fSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIERPTSBmb3IgdGhlIGxvYWRpbmcgY29udGFpbmVyLlxuICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fSBUaGUgbG9hZGluZyBjb250YWluZXIuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUxvYWRpbmdDb250YWluZXIoKSB7XG5cdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoYFxuXHRcdDxkaXYgY2xhc3M9XCJvLWF1dG9jb21wbGV0ZV9fbWVudS1sb2FkaW5nLWNvbnRhaW5lclwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm8tYXV0b2NvbXBsZXRlX19tZW51LWxvYWRpbmdcIj48L2Rpdj5cblx0XHQ8L2Rpdj5cblx0YCk7XG5cdHJldHVybiBmcmFnbWVudC5xdWVyeVNlbGVjdG9yKCcqJyk7XG59XG5cbi8qKlxuICogU2hvdyB0aGUgbG9hZGluZyBwYW5lbFxuICogQHBhcmFtIHtBdXRvQ29tcGxldGV9IGluc3RhbmNlIFRoZSBhdXRvY29tcGxldGUgaW5zdGFuY2Ugd2hvc2UgbG9hZGluZyBwYW5lbCBzaG91bGQgYmUgc2hvd25cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBzaG93TG9hZGluZ1BhbmUoaW5zdGFuY2UpIHtcblx0aW5zdGFuY2UuY29udGFpbmVyLmFwcGVuZENoaWxkKGluc3RhbmNlLmxvYWRpbmdDb250YWluZXIpO1xuXHRjb25zdCBtZW51ID0gaW5zdGFuY2UuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5vLWF1dG9jb21wbGV0ZV9fbWVudScpO1xuXHRpZiAobWVudSkge1xuXHRcdG1lbnUuY2xhc3NMaXN0LmFkZCgnby1hdXRvY29tcGxldGVfX21lbnUtLWxvYWRpbmcnKTtcblx0fVxufVxuXG4vKipcbiAqIEhpZGUgdGhlIGxvYWRpbmcgcGFuZWxcbiAqIEBwYXJhbSB7QXV0b0NvbXBsZXRlfSBpbnN0YW5jZSBUaGUgYXV0b2NvbXBsZXRlIGluc3RhbmNlIHdob3NlIGxvYWRpbmcgcGFuZWwgc2hvdWxkIGJlIGhpZGRlblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGhpZGVMb2FkaW5nUGFuZShpbnN0YW5jZSkge1xuXHRpZiAoaW5zdGFuY2UuY29udGFpbmVyLmNvbnRhaW5zKGluc3RhbmNlLmxvYWRpbmdDb250YWluZXIpKSB7XG5cdFx0aW5zdGFuY2UuY29udGFpbmVyLnJlbW92ZUNoaWxkKGluc3RhbmNlLmxvYWRpbmdDb250YWluZXIpO1xuXHR9XG5cdGNvbnN0IG1lbnUgPSBpbnN0YW5jZS5jb250YWluZXIucXVlcnlTZWxlY3RvcignLm8tYXV0b2NvbXBsZXRlX19tZW51Jyk7XG5cdGlmIChtZW51KSB7XG5cdFx0bWVudS5jbGFzc0xpc3QucmVtb3ZlKCdvLWF1dG9jb21wbGV0ZV9fbWVudS0tbG9hZGluZycpO1xuXHR9XG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBET00gdHJlZSB3aGljaCBjb3JyZXNwb25kcyB0b1xuICogPGJ1dHRvbiBjbGFzcz1cIm8tYXV0b2NvbXBsZXRlX19jbGVhclwiIHR5cGU9XCJidXR0b25cIiBhcmlhLWNvbnRyb2xzPSR7YXV0b2NvbXBsZXRlRWwuaWR9IHRpdGxlPVwiQ2xlYXIgaW5wdXRcIj5cbiAqIFx0PHNwYW4gY2xhc3M9XCJvLWF1dG9jb21wbGV0ZV9fdmlzdWFsbHktaGlkZGVuXCI+Q2xlYXIgaW5wdXQ8L3NwYW4+XG4gKiA8L2J1dHRvbj5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGF1dG9jb21wbGV0ZSBpbnB1dCB0byBhc3NvY2lhdGUgdGhlIGNsZWFyIGJ1dHRvbiB3aXRoXG4gKiBAcmV0dXJucyB7SFRNTEJ1dHRvbkVsZW1lbnR9IFRoZSBjbGVhciBidXR0b24gRE9NIHRyZWVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2xlYXJCdXR0b24oaWQpIHtcblx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChgXG5cdFx0PGJ1dHRvbiBjbGFzcz1cIm8tYXV0b2NvbXBsZXRlX19jbGVhclwiIHR5cGU9XCJidXR0b25cIiBhcmlhLWNvbnRyb2xzPVwiJHtpZH1cIiB0aXRsZT1cIkNsZWFyIGlucHV0XCI+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cIm8tYXV0b2NvbXBsZXRlX192aXN1YWxseS1oaWRkZW5cIj5DbGVhciBpbnB1dDwvc3Bhbj5cblx0XHQ8L2J1dHRvbj5cblx0YCk7XG5cdHJldHVybiBmcmFnbWVudC5xdWVyeVNlbGVjdG9yKCcqJyk7XG59XG5cbi8qKlxuICogQXR0YWNoIHRoZSBjbGVhciBidXR0b24gYW5kIGNvcnJlc3BvbmRpbmcgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBvLWF1dG9jb21wbGV0ZSBpbnN0YW5jZVxuICogQHBhcmFtIHtBdXRvQ29tcGxldGV9IGluc3RhbmNlIFRoZSBhdXRvY29tcGxldGUgaW5zdGFuY2UgdG8gc2V0dXAgdGhlIGNsZWFyIGJ1dHRvbiBmb3JcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0Q2xlYXJCdXR0b24oaW5zdGFuY2UpIHtcblx0Y29uc3QgaW5wdXQgPSBpbnN0YW5jZS5hdXRvY29tcGxldGVFbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRjb25zdCBjbGVhckJ1dHRvbiA9IGNyZWF0ZUNsZWFyQnV0dG9uKGlucHV0LmlkKTtcblx0bGV0IHRpbWVvdXQgPSBudWxsO1xuXHRjbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHQvLyBSZW1vdmUgdGhlIGxvYWRpbmcgcGFuZSwgaW4tY2FzZSBvZiBhIHNsb3cgcmVzcG9uc2UuXG5cdFx0aGlkZUxvYWRpbmdQYW5lKGluc3RhbmNlKTtcblx0XHRjbGVhckJ1dHRvbi5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGNsZWFyQnV0dG9uKTtcblx0XHQvLyBDbGVhciB0aGUgaW5wdXRcblx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXHRcdC8vIFdlIG5lZWQgdG8gd2FpdCBsb25nZXIgdGhhbiAxMDBtcyBiZWZvcmUgZm9jdXNpbmdcblx0XHQvLyBvbnRvIHRoZSBpbnB1dCBlbGVtZW50IGJlY2F1c2UgYWNjZXNzaWJsZS1hdXRvY29tcGxldGVcblx0XHQvLyBvbmx5IGNoZWNrcyB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGV2ZXJ5IDEwMG1zLlxuXHRcdC8vIElmIHdlIG1vZGlmeSBpbnB1dC52YWx1ZSBhbmQgdGhlbiBmb2N1cyBpbnRvIHRoZSBpbnB1dCBpbiBsZXNzXG5cdFx0Ly8gdGhhbiAxMDBtcywgYWNjZXNzaWJsZS1hdXRvY29tcGxldGUgd291bGQgbm90IGhhdmUgdGhlIHVwZGF0ZWRcblx0XHQvLyB2YWx1ZSBhbmQgd291bGQgaW5zdGVhZCB3cml0ZSB0aGUgb2xkIHZhbHVlIGJhY2sgaW50byB0aGUgaW5wdXQuXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2FscGhhZ292L2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Jsb2IvOTM1ZjBkNDNhZWExYzYwNmU2YjM4OTg1ZTNmZTcwNDlkZGJlOThiZS9zcmMvYXV0b2NvbXBsZXRlLmpzI0wxMDctTDEyNVxuXHRcdGlmICghdGltZW91dCkge1xuXHRcdFx0Ly8gVGhlIHVzZXIgY291bGQgcHJlc3MgdGhlIGJ1dHRvbiBtdWx0aXBsZSB0aW1lc1xuXHRcdFx0Ly8gd2hpbHN0IHRoZSBzZXRUaW1lb3V0IGhhbmRsZXIgaGFzIHlldCB0byBleGVjdXRlXG5cdFx0XHQvLyBXZSBvbmx5IHdhbnQgdG8gY2FsbCB0aGUgaGFuZGxlciBvbmNlXG5cdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGlucHV0LmZvY3VzKCk7XG5cdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0fSwgMTEwKTtcblx0XHR9XG5cdH0pO1xuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcblx0XHRjb25zdCB0ZXh0SW5JbnB1dCA9IGlucHV0LnZhbHVlLmxlbmd0aCA+IDA7XG5cblx0XHRjb25zdCBjbGVhckJ1dHRvbk9uUGFnZSA9IGluc3RhbmNlLmF1dG9jb21wbGV0ZUVsLmNvbnRhaW5zKGNsZWFyQnV0dG9uKTtcblx0XHRpZiAodGV4dEluSW5wdXQpIHtcblx0XHRcdGlmICghY2xlYXJCdXR0b25PblBhZ2UpIHtcblx0XHRcdFx0aW5zdGFuY2UuYXV0b2NvbXBsZXRlRWwuYXBwZW5kQ2hpbGQoY2xlYXJCdXR0b24pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoY2xlYXJCdXR0b25PblBhZ2UpIHtcblx0XHRcdFx0Y2xlYXJCdXR0b24ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChjbGVhckJ1dHRvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBAY2FsbGJhY2sgUG9wdWxhdGVPcHRpb25zXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgd2hpY2ggbWF0Y2ggdGhlIHJleHQgd2hpY2ggd2FzIHR5cGVkIGludG8gdGhlIGF1dG9jb21wbGV0ZSBieSB0aGUgdXNlclxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgU291cmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBUZXh0IHdoaWNoIHdhcyB0eXBlZCBpbnRvIHRoZSBhdXRvY29tcGxldGUgYnkgdGhlIHVzZXJcbiAqIEBwYXJhbSB7UG9wdWxhdGVPcHRpb25zfSBwb3B1bGF0ZU9wdGlvbnMgLSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gcmVhZHkgdG8gdXBkYXRlIHRoZSBzdWdnZXN0aW9ucyBkcm9wZG93blxuICogQHJldHVybnMge3ZvaWR9XG4qL1xuXG4vKipcbiAqIEBjYWxsYmFjayBNYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlXG4gKiBAcGFyYW0geyp9IG9wdGlvbiAtIFRoZSBvcHRpb24gdG8gdHJhbnNmb3JtIGludG8gYSBzdWdnZXN0aW9uIHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gVGhlIHN0cmluZyB0byBkaXNwbGF5IGFzIHRoZSBzdWdnZXN0aW9ucyBmb3IgdGhpcyBvcHRpb25cbiovXG5cbi8qKlxuICogQGNhbGxiYWNrIG9uQ29uZmlybVxuICogQHBhcmFtIHsqfSBvcHRpb24gLSBUaGUgb3B0aW9uIHRoZSB1c2VyIHNlbGVjdGVkXG4gKiBAcmV0dXJucyB7dm9pZH1cbiovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQXV0b2NvbXBsZXRlT3B0aW9uc1xuICogQHByb3BlcnR5IHtTb3VyY2V9IFtzb3VyY2VdIC0gVGhlIGZ1bmN0aW9uIHdoaWNoIHJldHJpZXZlcyB0aGUgc3VnZ2VzdGlvbnMgdG8gZGlzcGxheVxuICogQHByb3BlcnR5IHtNYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlfSBbbWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZV0gLSBGdW5jdGlvbiB3aGljaCB0cmFuc2Zvcm1zIGEgc3VnZ2VzdGlvbiBiZWZvcmUgcmVuZGVyaW5nXG4gKiBAcHJvcGVydHkge29uQ29uZmlybX0gW29uQ29uZmlybV0gLSBGdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGFuIG9wdGlvblxuICovXG5cbmNsYXNzIEF1dG9jb21wbGV0ZSB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2F1dG9jb21wbGV0ZUVsXSAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7QXV0b2NvbXBsZXRlT3B0aW9uc30gW29wdGlvbnM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBjb21wb25lbnRcblx0ICovXG5cdGNvbnN0cnVjdG9yIChhdXRvY29tcGxldGVFbCwgb3B0aW9ucykge1xuXHRcdHRoaXMuYXV0b2NvbXBsZXRlRWwgPSBhdXRvY29tcGxldGVFbDtcblxuXHRcdGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IEF1dG9jb21wbGV0ZS5nZXREYXRhQXR0cmlidXRlcyhhdXRvY29tcGxldGVFbCk7XG5cdFx0dGhpcy5vcHRpb25zID0ge307XG5cdFx0aWYgKG9wdHMuc291cmNlKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc291cmNlID0gb3B0cy5zb3VyY2U7XG5cdFx0fVxuXHRcdGlmIChvcHRzLm1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWUpIHtcblx0XHRcdHRoaXMub3B0aW9ucy5tYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlID0gb3B0cy5tYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlO1xuXHRcdH1cblx0XHRpZiAob3B0cy5vbkNvbmZpcm0pIHtcblx0XHRcdHRoaXMub3B0aW9ucy5vbkNvbmZpcm0gPSBvcHRzLm9uQ29uZmlybTtcblx0XHR9XG5cblx0XHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnby1hdXRvY29tcGxldGVfX2xpc3Rib3gtY29udGFpbmVyJyk7XG5cdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cblx0XHRjb25zdCBzZWxlY3RJbnB1dEVsZW1lbnQgPSBhdXRvY29tcGxldGVFbC5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5zb3VyY2UgJiYgIXNlbGVjdElucHV0RWxlbWVudCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgYSBzb3VyY2UgZm9yIGF1dG8tY29tcGxldGlvbiBvcHRpb25zLiBBZGQgYSBgc2VsZWN0YCBlbGVtZW50IHRvIHlvdXIgbWFya3VwLCBvciBjb25maWd1cmUgYSBgc291cmNlYCBmdW5jdGlvbiB0byBmZXRjaCBhdXRvY29tcGxldGUgb3B0aW9ucy5cIik7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zb3VyY2UpIHtcblx0XHRcdC8vIElmIHNvdXJjZSBpcyBhIHN0cmluZywgdGhlbiBpdCBpcyB0aGUgbmFtZSBvZiBhIGdsb2JhbCBmdW5jdGlvbiB0byB1c2UuXG5cdFx0XHQvLyBJZiBzb3VyY2UgaXMgbm90IGEgc3RyaW5nLCB0aGVuIGl0IGlzIGEgZnVuY3Rpb24gdG8gdXNlLlxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdHlwZSB7U291cmNlfVxuXHRcdFx0ICovXG5cdFx0XHRjb25zdCBjdXN0b21Tb3VyY2UgPSB0eXBlb2YgdGhpcy5vcHRpb25zLnNvdXJjZSA9PT0gJ3N0cmluZycgPyB3aW5kb3dbdGhpcy5vcHRpb25zLnNvdXJjZV0gOiB0aGlzLm9wdGlvbnMuc291cmNlO1xuXG5cdFx0XHQvLyBJZiBtYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlIGlzIGEgc3RyaW5nLCB0aGVuIGl0IGlzIHRoZSBuYW1lIG9mIGEgZ2xvYmFsIGZ1bmN0aW9uIHRvIHVzZS5cblx0XHRcdC8vIElmIG1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWUgaXMgbm90IGEgc3RyaW5nLCB0aGVuIGl0IGlzIGEgZnVuY3Rpb24gdG8gdXNlLlxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAdHlwZSB7TWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZX1cblx0XHRcdCAqL1xuXHRcdFx0dGhpcy5tYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlID0gdHlwZW9mIHRoaXMub3B0aW9ucy5tYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlID09PSAnc3RyaW5nJyA/IHdpbmRvd1t0aGlzLm9wdGlvbnMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZV0gOiB0aGlzLm9wdGlvbnMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gcXVlcnkgLSBUZXh0IHdoaWNoIHdhcyB0eXBlZCBpbnRvIHRoZSBhdXRvY29tcGxldGUgYnkgdGhlIHVzZXJcblx0XHRcdCAqIEBwYXJhbSB7UG9wdWxhdGVPcHRpb25zfSBwb3B1bGF0ZU9wdGlvbnMgLSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gcmVhZHkgdG8gdXBkYXRlIHRoZSBzdWdnZXN0aW9ucyBkcm9wZG93blxuXHRcdFx0ICogQHJldHVybnMge3ZvaWR9XG5cdFx0XHQqL1xuXHRcdFx0dGhpcy5vcHRpb25zLnNvdXJjZSA9IChxdWVyeSwgcG9wdWxhdGVPcHRpb25zKSA9PiB7XG5cdFx0XHRcdHNob3dMb2FkaW5nUGFuZSh0aGlzKTtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIEBwYXJhbSB7QXJyYXk8c3RyaW5nPn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHdoaWNoIG1hdGNoIHRoZSByZXh0IHdoaWNoIHdhcyB0eXBlZCBpbnRvIHRoZSBhdXRvY29tcGxldGUgYnkgdGhlIHVzZXJcblx0XHRcdFx0ICogQHJldHVybnMge3ZvaWR9XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRjb25zdCBjYWxsYmFjayA9IChvcHRpb25zKSA9PiB7XG5cdFx0XHRcdFx0aGlkZUxvYWRpbmdQYW5lKHRoaXMpO1xuXHRcdFx0XHRcdHBvcHVsYXRlT3B0aW9ucyhvcHRpb25zKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0Y3VzdG9tU291cmNlKHF1ZXJ5LCBjYWxsYmFjayk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaW5wdXQgPSBhdXRvY29tcGxldGVFbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXHRcdFx0Y29uc3QgaWQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cdFx0XHRjb25zdCBuYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0XHRjb25zdCBwbGFjZWhvbGRlciA9IGlucHV0LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKTtcblx0XHRcdGNvbnN0IGlzUmVxdWlyZWQgPSBpbnB1dC5oYXNBdHRyaWJ1dGUoJ3JlcXVpcmVkJyk7XG5cblx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBgaWRgIGF0dHJpYnV0ZSBvbiB0aGUgby1hdXRvY29tcGxldGUgaW5wdXQuIEFuIGBpZGAgbmVlZHMgdG8gYmUgc2V0IGFzIGl0IGlzIHVzZWQgd2l0aGluIHRoZSBvLWF1dG9jb21wbGV0ZSB0byBpbXBsZW1lbnQgdGhlIGFjY2Vzc2liaWxpdHkgZmVhdHVyZXMuXCIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5hdXRvY29tcGxldGVFbC5pbm5lckhUTUwgPSAnJztcblx0XHRcdHRoaXMuYXV0b2NvbXBsZXRlRWwuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXHRcdFx0YWNjZXNzaWJsZUF1dG9jb21wbGV0ZSh7XG5cdFx0XHRcdGVsZW1lbnQ6IHRoaXMuY29udGFpbmVyLFxuXHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlcixcblx0XHRcdFx0cmVxdWlyZWQ6IGlzUmVxdWlyZWQsXG5cdFx0XHRcdG9uQ29uZmlybTogKG9wdGlvbikgPT4ge1xuXHRcdFx0XHRcdGlmIChvcHRpb24gJiYgdGhpcy5vcHRpb25zLm9uQ29uZmlybSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vcHRpb25zLm9uQ29uZmlybShvcHRpb24pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlLFxuXHRcdFx0XHRjc3NOYW1lc3BhY2U6ICdvLWF1dG9jb21wbGV0ZScsXG5cdFx0XHRcdGRpc3BsYXlNZW51OiAnb3ZlcmxheScsXG5cdFx0XHRcdHNob3dOb09wdGlvbnNGb3VuZDogZmFsc2UsXG5cdFx0XHRcdHRlbXBsYXRlczoge1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIFVzZWQgd2hlbiByZW5kZXJpbmcgc3VnZ2VzdGlvbnMsIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhpcyB3aWxsIGJlIHVzZWQgYXMgdGhlIGlubmVySFRNTCBmb3IgYSBzaW5nbGUgc3VnZ2VzdGlvbi5cblx0XHRcdFx0XHQgKiBAcGFyYW0geyp9IG9wdGlvbiBUaGUgc3VnZ2VzdGlvbiB0byBhcHBseSB0aGUgdGVtcGxhdGUgd2l0aC5cblx0XHRcdFx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIHN0cmluZyB0byByZXByZXNlbnQgYSBzaW5nbGUgc3VnZ2VzdGlvbi5cblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRzdWdnZXN0aW9uOiAob3B0aW9uKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIG9wdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGBtYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlYCBmdW5jdGlvbiBpcyBkZWZpbmVkXG5cdFx0XHRcdFx0XHRcdC8vIEFwcGx5IHRoZSBmdW5jdGlvbiB0byB0aGUgb3B0aW9uLiBUaGlzIGlzIGEgd2F5IGZvciB0aGVcblx0XHRcdFx0XHRcdFx0Ly8gY29uc3VtaW5nIGFwcGxpY2F0aW9uIHRvIGRlY2lkZSB3aGF0IHRleHQgc2hvdWxkIGJlXG5cdFx0XHRcdFx0XHRcdC8vIHNob3duIGZvciB0aGlzIG9wdGlvbi5cblx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyB1c3VhbGx5IGRlZmluZWQgd2hlbiB0aGUgb3B0aW9uIGlzIG5vdCBhbHJlYWR5IGEgc3RyaW5nLlxuXHRcdFx0XHRcdFx0XHQvLyBGb3IgZXhhbXBsZSwgaWYgdGhlIG9wdGlvbiBpcyBhbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgYSBwcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHQvLyB3aGljaCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgc3VnZ2VzdGlvbiBzdHJpbmcuXG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5tYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9uID0gdGhpcy5tYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlKG9wdGlvbik7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbiAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBvcHRpb24gdHJ5aW5nIHRvIGJlIGRpc3BsYXllZCBhcyBhIHN1Z2dlc3Rpb24gaXMgbm90IGEgc3RyaW5nLCBpdCBpcyBcIiR7dHlwZW9mIG9wdGlvbn1cIi4gby1hdXRvY29tcGxldGUgY2FuIG9ubHkgZGlzcGxheSBzdHJpbmdzIGFzIHN1Z2dlc3Rpb25zLiBEZWZpbmUgYSBcXGBtYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlXFxgIGZ1bmN0aW9uIHRvIGNvbnZlcnQgdGhlIG9wdGlvbiBpbnRvIGEgc3RyaW5nIHRvIGJlIHVzZWQgYXMgdGhlIHN1Z2dlc3Rpb24uYCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3VnZ2VzdGlvblRlbXBsYXRlKG9wdGlvbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBVc2VkIHdoZW4gYSBzdWdnZXN0aW9uIGlzIHNlbGVjdGVkLCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoaXMgd2lsbCBiZSB1c2VkIGFzIHRoZSB2YWx1ZSBmb3IgdGhlIGlucHV0IGVsZW1lbnQuXG5cdFx0XHRcdFx0ICogQHBhcmFtIHsqfSBvcHRpb24gVGhlIHN1Z2dlc3Rpb24gd2hpY2ggd2FzIHNlbGVjdGVkLlxuXHRcdFx0XHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9IFN0cmluZyB0byByZXByZXNlbnQgdGhlIHN1Z2dlc3Rpb24uXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0aW5wdXRWYWx1ZTogKG9wdGlvbikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBvcHRpb24gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBgbWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZWAgZnVuY3Rpb24gaXMgZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHQvLyBBcHBseSB0aGUgZnVuY3Rpb24gdG8gdGhlIG9wdGlvbi4gVGhpcyBpcyBhIHdheSBmb3IgdGhlXG5cdFx0XHRcdFx0XHRcdC8vIGNvbnN1bWluZyBhcHBsaWNhdGlvbiB0byBkZWNpZGUgd2hhdCB0ZXh0IHNob3VsZCBiZVxuXHRcdFx0XHRcdFx0XHQvLyBzaG93biBmb3IgdGhpcyBvcHRpb24uXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgdXN1YWxseSBkZWZpbmVkIHdoZW4gdGhlIG9wdGlvbiBpcyBub3QgYWxyZWFkeSBhIHN0cmluZy5cblx0XHRcdFx0XHRcdFx0Ly8gRm9yIGV4YW1wbGUsIGlmIHRoZSBvcHRpb24gaXMgYW4gb2JqZWN0IHdoaWNoIGNvbnRhaW5zIGEgcHJvcGVydHlcblx0XHRcdFx0XHRcdFx0Ly8gd2hpY2ggc2hvdWxkIGJlIHVzZWQgYXMgdGhlIHN1Z2dlc3Rpb24gc3RyaW5nLlxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbiA9IHRoaXMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZShvcHRpb24pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb24gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgb3B0aW9uIHRyeWluZyB0byBiZSBkaXNwbGF5ZWQgYXMgYSBzdWdnZXN0aW9uIGlzIG5vdCBhIHN0cmluZywgaXQgaXMgXCIke3R5cGVvZiBvcHRpb259XCIuIG8tYXV0b2NvbXBsZXRlIGNhbiBvbmx5IGRpc3BsYXkgc3RyaW5ncyBhcyBzdWdnZXN0aW9ucy4gRGVmaW5lIGEgXFxgbWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZVxcYCBmdW5jdGlvbiB0byBjb252ZXJ0IHRoZSBvcHRpb24gaW50byBhIHN0cmluZyB0byBiZSB1c2VkIGFzIHRoZSBzdWdnZXN0aW9uLmApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBvcHRpb247XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgaWQgPSBzZWxlY3RJbnB1dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuXHRcdFx0Y29uc3QgbmFtZSA9IHNlbGVjdElucHV0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcblx0XHRcdGNvbnN0IGlzUmVxdWlyZWQgPSBzZWxlY3RJbnB1dEVsZW1lbnQuaGFzQXR0cmlidXRlKCdyZXF1aXJlZCcpO1xuXG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgYGlkYCBhdHRyaWJ1dGUgb24gdGhlIG8tYXV0b2NvbXBsZXRlIGlucHV0LiBBbiBgaWRgIG5lZWRzIHRvIGJlIHNldCBhcyBpdCBpcyB1c2VkIHdpdGhpbiB0aGUgby1hdXRvY29tcGxldGUgdG8gaW1wbGVtZW50IHRoZSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlwiKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuYXV0b2NvbXBsZXRlRWwuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuXHRcdFx0dGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0SW5wdXRFbGVtZW50KTtcblx0XHRcdGFjY2Vzc2libGVBdXRvY29tcGxldGUuZW5oYW5jZVNlbGVjdEVsZW1lbnQoe1xuXHRcdFx0XHRzZWxlY3RFbGVtZW50OiBzZWxlY3RJbnB1dEVsZW1lbnQsXG5cdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdHJlcXVpcmVkOiBpc1JlcXVpcmVkLFxuXHRcdFx0XHRvbkNvbmZpcm06IChvcHRpb24pID0+IHtcblx0XHRcdFx0XHRpZiAob3B0aW9uICYmIHRoaXMub3B0aW9ucy5vbkNvbmZpcm0pIHtcblx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5vbkNvbmZpcm0ob3B0aW9uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGF1dG9zZWxlY3Q6IGZhbHNlLFxuXHRcdFx0XHRkZWZhdWx0VmFsdWU6ICcnLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogJycsXG5cdFx0XHRcdGNzc05hbWVzcGFjZTogJ28tYXV0b2NvbXBsZXRlJyxcblx0XHRcdFx0ZGlzcGxheU1lbnU6ICdvdmVybGF5Jyxcblx0XHRcdFx0c2hvd05vT3B0aW9uc0ZvdW5kOiBmYWxzZSxcblx0XHRcdFx0dGVtcGxhdGVzOiB7XG5cdFx0XHRcdFx0c3VnZ2VzdGlvbjogdGhpcy5zdWdnZXN0aW9uVGVtcGxhdGUuYmluZCh0aGlzKVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHNlbGVjdElucHV0RWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHNlbGVjdElucHV0RWxlbWVudCk7IC8vIFJlbW92ZSB0aGUgb3JpZ2luYWwgc2VsZWN0IGVsZW1lbnRcblx0XHR9XG5cblx0XHR0aGlzLmxvYWRpbmdDb250YWluZXIgPSBjcmVhdGVMb2FkaW5nQ29udGFpbmVyKCk7XG5cdFx0aW5pdENsZWFyQnV0dG9uKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVzZWQgd2hlbiByZW5kZXJpbmcgc3VnZ2VzdGlvbnMsIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhpcyB3aWxsIGJlIHVzZWQgYXMgdGhlIGlubmVySFRNTCBmb3IgYSBzaW5nbGUgc3VnZ2VzdGlvbi5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHN1Z2dlc3RlZFZhbHVlIFRoZSBzdWdnZXN0aW9uIHRvIGFwcGx5IHRoZSB0ZW1wbGF0ZSB3aXRoLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBIVE1MIHN0cmluZyB0byBiZSByZXByZXNlbnQgYSBzaW5nbGUgc3VnZ2VzdGlvbi5cblx0ICovXG5cdHN1Z2dlc3Rpb25UZW1wbGF0ZSAoc3VnZ2VzdGVkVmFsdWUpIHtcblx0XHQvLyBvLWF1dG9jb21wbGV0ZSBoYXMgYSBVSSBkZXNpZ24gdG8gaGlnaGxpZ2h0IGNoYXJhY3RlcnMgaW4gdGhlIHN1Z2dlc3Rpb25zLlxuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHtbc3RyaW5nLCBib29sZWFuXVtdfSBBbiBhcnJheSBvZiBhcnJheXMgd2hpY2ggY29udGFpbiB0d28gaXRlbXMsIHRoZSBmaXJzdCBpcyB0aGUgY2hhcmFjdGVyIGluIHRoZSBzdWdnZXN0aW9uLCB0aGUgc2Vjb25kIGlzIGEgYm9vbGVhbiB3aGljaCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgY2hhcmFjdGVyIHNob3VsZCBiZSBoaWdobGlnaHRlZC5cblx0XHQgKi9cblx0XHRjb25zdCBjaGFyYWN0ZXJzID0gaGlnaGxpZ2h0U3VnZ2VzdGlvbihzdWdnZXN0ZWRWYWx1ZSwgdGhpcy5hdXRvY29tcGxldGVFbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlKTtcblxuXHRcdGxldCBvdXRwdXQgPSAnJztcblx0XHRmb3IgKGNvbnN0IFtjaGFyYWN0ZXIsIHNob3VkSGlnaGxpZ2h0XSBvZiBjaGFyYWN0ZXJzKSB7XG5cdFx0XHRpZiAoc2hvdWRIaWdobGlnaHQpIHtcblx0XHRcdFx0b3V0cHV0ICs9IGA8c3BhbiBjbGFzcz1cIm8tYXV0b2NvbXBsZXRlX19vcHRpb24tLWhpZ2hsaWdodFwiPiR7Y2hhcmFjdGVyfTwvc3Bhbj5gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0ICs9IGAke2NoYXJhY3Rlcn1gO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHNwYW4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgc3VnZ2VzdGVkVmFsdWUpO1xuXHRcdHNwYW4uaW5uZXJIVE1MID0gb3V0cHV0O1xuXHRcdHJldHVybiBzcGFuLm91dGVySFRNTDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBBdXRvY29tcGxldGVFbGVtZW50LiBJZiB0aGUgZWxlbWVudCBpcyBiZWluZyBzZXQgdXBcblx0ICogZGVjbGFyYXRpdmVseSwgdGhpcyBtZXRob2QgaXMgdXNlZCB0byBleHRyYWN0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBhdXRvY29tcGxldGVFbCAtIFRoZSBjb21wb25lbnQgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9wdGlvbnMgb2JqZWN0IHdoaWNoIGNhbiBiZSB1c2VkIGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50XG5cdCAqL1xuXHRzdGF0aWMgZ2V0RGF0YUF0dHJpYnV0ZXMgKGF1dG9jb21wbGV0ZUVsKSB7XG5cdFx0aWYgKCEoYXV0b2NvbXBsZXRlRWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cblx0XHRpZiAoYXV0b2NvbXBsZXRlRWwuZGF0YXNldC5vQXV0b2NvbXBsZXRlU291cmNlKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzb3VyY2U6IGF1dG9jb21wbGV0ZUVsLmRhdGFzZXQub0F1dG9jb21wbGV0ZVNvdXJjZVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0fVxuXHQvKipcblx0ICogSW5pdGlhbGlzZSBvLWF1dG9jb21wbGV0ZSBjb21wb25lbnQvcy5cblx0ICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8U3RyaW5nKX0gcm9vdEVsZW1lbnQgLSBUaGUgcm9vdCBlbGVtZW50IHRvIGludGlhbGlzZSB0aGUgY29tcG9uZW50IGluLCBvciBhIENTUyBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBjb21wb25lbnRcblx0ICogQHJldHVybnMge0F1dG9jb21wbGV0ZXxBdXRvY29tcGxldGVbXX0gVGhlIG5ld2x5IGNvbnN0cnVjdGVkIEF1dG9jb21wbGV0ZSBjb21wb25lbnRzXG5cdCAqL1xuXHRzdGF0aWMgaW5pdCAocm9vdEVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRpZiAoIXJvb3RFbGVtZW50KSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghKHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsZW1lbnQpO1xuXHRcdH1cblx0XHRpZiAocm9vdEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiByb290RWxlbWVudC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLWF1dG9jb21wbGV0ZV0nKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBBdXRvY29tcGxldGUocm9vdEVsZW1lbnQsIG9wdGlvbnMpO1xuXHRcdH1cblx0XHRyZXR1cm4gQXJyYXkuZnJvbShyb290RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tYXV0b2NvbXBsZXRlXCJdJyksIHJvb3RFbCA9PiBuZXcgQXV0b2NvbXBsZXRlKHJvb3RFbCwgb3B0aW9ucykpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1dG9jb21wbGV0ZTtcbiIsImltcG9ydCBvQXV0b2NvbXBsZXRlIGZyb20gJy4vc3JjL2pzL2F1dG9jb21wbGV0ZS5qcyc7XG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbiAoKSB7XG5cdG9BdXRvY29tcGxldGUuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5leHBvcnQgZGVmYXVsdCBvQXV0b2NvbXBsZXRlOyIsImltcG9ydCAnLi4vLi4vLi4vbWFpbi5qcyc7XG5cbi8qKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSBQb3B1bGF0ZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8c3RyaW5nPn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHdoaWNoIG1hdGNoIHRoZSByZXh0IHdoaWNoIHdhcyB0eXBlZCBpbnRvIHRoZSBhdXRvY29tcGxldGUgYnkgdGhlIHVzZXJcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSAtIFRleHQgd2hpY2ggd2FzIHR5cGVkIGludG8gdGhlIGF1dG9jb21wbGV0ZSBieSB0aGUgdXNlclxuICogQHBhcmFtIHtQb3B1bGF0ZU9wdGlvbnN9IHBvcHVsYXRlT3B0aW9ucyAtIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiByZWFkeSB0byB1cGRhdGUgdGhlIHN1Z2dlc3Rpb25zIGRyb3Bkb3duXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xud2luZG93LmN1c3RvbVN1Z2dlc3Rpb25zID0gZnVuY3Rpb24gY3VzdG9tU3VnZ2VzdGlvbnMocXVlcnksIHBvcHVsYXRlT3B0aW9ucykge1xuXHRjb25zdCBzdWdnZXN0aW9ucyA9IFtcblx0XHQnQWZnaGFuaXN0YW4nLFxuXHRcdCdBa3JvdGlyaScsXG5cdFx0J0FsYmFuaWEnLFxuXHRcdCdBbGdlcmlhJyxcblx0XHQnQW1lcmljYW4gU2Ftb2EnLFxuXHRcdCdBbmRvcnJhJyxcblx0XHQnQW5nb2xhJyxcblx0XHQnQW5ndWlsbGEnLFxuXHRcdCdBbnRhcmN0aWNhJyxcblx0XHQnQW50aWd1YSBhbmQgQmFyYnVkYScsXG5cdFx0J0FyZ2VudGluYScsXG5cdFx0J0FybWVuaWEnLFxuXHRcdCdBcnViYScsXG5cdFx0J0FzaG1vcmUgYW5kIENhcnRpZXIgSXNsYW5kcycsXG5cdFx0J0F1c3RyYWxpYScsXG5cdFx0J0F1c3RyaWEnLFxuXHRcdCdBemVyYmFpamFuJyxcblx0XHQnQmFoYW1hcywgVGhlJyxcblx0XHQnQmFocmFpbicsXG5cdFx0J0JhbmdsYWRlc2gnLFxuXHRcdCdCYXJiYWRvcycsXG5cdFx0J0Jhc3NhcyBkYSBJbmRpYScsXG5cdFx0J0JlbGFydXMnLFxuXHRcdCdCZWxnaXVtJyxcblx0XHQnQmVsaXplJyxcblx0XHQnQmVuaW4nLFxuXHRcdCdCZXJtdWRhJyxcblx0XHQnQmh1dGFuJyxcblx0XHQnQm9saXZpYScsXG5cdFx0J0Jvc25pYSBhbmQgSGVyemVnb3ZpbmEnLFxuXHRcdCdCb3Rzd2FuYScsXG5cdFx0J0JvdXZldCBJc2xhbmQnLFxuXHRcdCdCcmF6aWwnLFxuXHRcdCdCcml0aXNoIEluZGlhbiBPY2VhbiBUZXJyaXRvcnknLFxuXHRcdCdCcml0aXNoIFZpcmdpbiBJc2xhbmRzJyxcblx0XHQnQnJ1bmVpJyxcblx0XHQnQnVsZ2FyaWEnLFxuXHRcdCdCdXJraW5hIEZhc28nLFxuXHRcdCdCdXJtYScsXG5cdFx0J0J1cnVuZGknLFxuXHRcdCdDYW1ib2RpYScsXG5cdFx0J0NhbWVyb29uJyxcblx0XHQnQ2FuYWRhJyxcblx0XHQnQ2FwZSBWZXJkZScsXG5cdFx0J0NheW1hbiBJc2xhbmRzJyxcblx0XHQnQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljJyxcblx0XHQnQ2hhZCcsXG5cdFx0J0NoaWxlJyxcblx0XHQnQ2hpbmEnLFxuXHRcdCdDaHJpc3RtYXMgSXNsYW5kJyxcblx0XHQnQ2xpcHBlcnRvbiBJc2xhbmQnLFxuXHRcdCdDb2NvcyAoS2VlbGluZykgSXNsYW5kcycsXG5cdFx0J0NvbG9tYmlhJyxcblx0XHQnQ29tb3JvcycsXG5cdFx0J0NvbmdvJyxcblx0XHQnQ29vayBJc2xhbmRzJyxcblx0XHQnQ29yYWwgU2VhIElzbGFuZHMnLFxuXHRcdCdDb3N0YSBSaWNhJyxcblx0XHQnQ290ZSBkXFwnSXZvaXJlJyxcblx0XHQnQ3JvYXRpYScsXG5cdFx0J0N1YmEnLFxuXHRcdCdDeXBydXMnLFxuXHRcdCdDemVjaCBSZXB1YmxpYycsXG5cdFx0J0Rlbm1hcmsnLFxuXHRcdCdEaGVrZWxpYScsXG5cdFx0J0RqaWJvdXRpJyxcblx0XHQnRG9taW5pY2EnLFxuXHRcdCdEb21pbmljYW4gUmVwdWJsaWMnLFxuXHRcdCdFY3VhZG9yJyxcblx0XHQnRWd5cHQnLFxuXHRcdCdFbCBTYWx2YWRvcicsXG5cdFx0J0VxdWF0b3JpYWwgR3VpbmVhJyxcblx0XHQnRXJpdHJlYScsXG5cdFx0J0VzdG9uaWEnLFxuXHRcdCdFdGhpb3BpYScsXG5cdFx0J0V1cm9wYSBJc2xhbmQnLFxuXHRcdCdGYWxrbGFuZCBJc2xhbmRzJyxcblx0XHQnRmFyb2UgSXNsYW5kcycsXG5cdFx0J0ZpamknLFxuXHRcdCdGaW5sYW5kJyxcblx0XHQnRnJhbmNlJyxcblx0XHQnRnJlbmNoIEd1aWFuYScsXG5cdFx0J0ZyZW5jaCBQb2x5bmVzaWEnLFxuXHRcdCdGcmVuY2ggU291dGhlcm4gYW5kIEFudGFyY3RpYyBMYW5kcycsXG5cdFx0J0dhYm9uJyxcblx0XHQnR2FtYmlhLCcsXG5cdFx0J0dhemEgU3RyaXAnLFxuXHRcdCdHZW9yZ2lhJyxcblx0XHQnR2VybWFueScsXG5cdFx0J0doYW5hJyxcblx0XHQnR2licmFsdGFyJyxcblx0XHQnR2xvcmlvc28gSXNsYW5kcycsXG5cdFx0J0dyZWVjZScsXG5cdFx0J0dyZWVubGFuZCcsXG5cdFx0J0dyZW5hZGEnLFxuXHRcdCdHdWFkZWxvdXBlJyxcblx0XHQnR3VhbScsXG5cdFx0J0d1YXRlbWFsYScsXG5cdFx0J0d1ZXJuc2V5Jyxcblx0XHQnR3VpbmVhJyxcblx0XHQnR3VpbmVhLUJpc3NhdScsXG5cdFx0J0d1eWFuYScsXG5cdFx0J0hhaXRpJyxcblx0XHQnSGVhcmQgSXNsYW5kIGFuZCBNY0RvbmFsZCBJc2xhbmRzJyxcblx0XHQnSG9seSBTZWUgKFZhdGljYW4gQ2l0eSknLFxuXHRcdCdIb25kdXJhcycsXG5cdFx0J0hvbmcgS29uZycsXG5cdFx0J0h1bmdhcnknLFxuXHRcdCdJY2VsYW5kJyxcblx0XHQnSW5kaWEnLFxuXHRcdCdJbmRvbmVzaWEnLFxuXHRcdCdJcmFuJyxcblx0XHQnSXJhcScsXG5cdFx0J0lyZWxhbmQnLFxuXHRcdCdJc2xlIG9mIE1hbicsXG5cdFx0J0lzcmFlbCcsXG5cdFx0J0l0YWx5Jyxcblx0XHQnSmFtYWljYScsXG5cdFx0J0phbiBNYXllbicsXG5cdFx0J0phcGFuJyxcblx0XHQnSmVyc2V5Jyxcblx0XHQnSm9yZGFuJyxcblx0XHQnSnVhbiBkZSBOb3ZhIElzbGFuZCcsXG5cdFx0J0themFraHN0YW4nLFxuXHRcdCdLZW55YScsXG5cdFx0J0tpcmliYXRpJyxcblx0XHQnS29yZWEsIE5vcnRoJyxcblx0XHQnS29yZWEsIFNvdXRoJyxcblx0XHQnS3V3YWl0Jyxcblx0XHQnS3lyZ3l6c3RhbicsXG5cdFx0J0xhb3MnLFxuXHRcdCdMYXR2aWEnLFxuXHRcdCdMZWJhbm9uJyxcblx0XHQnTGVzb3RobycsXG5cdFx0J0xpYmVyaWEnLFxuXHRcdCdMaWJ5YScsXG5cdFx0J0xpZWNodGVuc3RlaW4nLFxuXHRcdCdMaXRodWFuaWEnLFxuXHRcdCdMdXhlbWJvdXJnJyxcblx0XHQnTWFjYXUnLFxuXHRcdCdNYWNlZG9uaWEnLFxuXHRcdCdNYWRhZ2FzY2FyJyxcblx0XHQnTWFsYXdpJyxcblx0XHQnTWFsYXlzaWEnLFxuXHRcdCdNYWxkaXZlcycsXG5cdFx0J01hbGknLFxuXHRcdCdNYWx0YScsXG5cdFx0J01hcnNoYWxsIElzbGFuZHMnLFxuXHRcdCdNYXJ0aW5pcXVlJyxcblx0XHQnTWF1cml0YW5pYScsXG5cdFx0J01hdXJpdGl1cycsXG5cdFx0J01heW90dGUnLFxuXHRcdCdNZXhpY28nLFxuXHRcdCdNaWNyb25lc2lhLCBGZWRlcmF0ZWQgU3RhdGVzIG9mJyxcblx0XHQnTW9sZG92YScsXG5cdFx0J01vbmFjbycsXG5cdFx0J01vbmdvbGlhJyxcblx0XHQnTW9udHNlcnJhdCcsXG5cdFx0J01vcm9jY28nLFxuXHRcdCdNb3phbWJpcXVlJyxcblx0XHQnTmFtaWJpYScsXG5cdFx0J05hdXJ1Jyxcblx0XHQnTmF2YXNzYSBJc2xhbmQnLFxuXHRcdCdOZXBhbCcsXG5cdFx0J05ldGhlcmxhbmRzJyxcblx0XHQnTmV0aGVybGFuZHMgQW50aWxsZXMnLFxuXHRcdCdOZXcgQ2FsZWRvbmlhJyxcblx0XHQnTmV3IFplYWxhbmQnLFxuXHRcdCdOaWNhcmFndWEnLFxuXHRcdCdOaWdlcicsXG5cdFx0J05pZ2VyaWEnLFxuXHRcdCdOaXVlJyxcblx0XHQnTm9yZm9sayBJc2xhbmQnLFxuXHRcdCdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnLFxuXHRcdCdOb3J3YXknLFxuXHRcdCdPbWFuJyxcblx0XHQnUGFraXN0YW4nLFxuXHRcdCdQYWxhdScsXG5cdFx0J1BhbmFtYScsXG5cdFx0J1BhcHVhIE5ldyBHdWluZWEnLFxuXHRcdCdQYXJhY2VsIElzbGFuZHMnLFxuXHRcdCdQYXJhZ3VheScsXG5cdFx0J1BlcnUnLFxuXHRcdCdQaGlsaXBwaW5lcycsXG5cdFx0J1BpdGNhaXJuIElzbGFuZHMnLFxuXHRcdCdQb2xhbmQnLFxuXHRcdCdQb3J0dWdhbCcsXG5cdFx0J1B1ZXJ0byBSaWNvJyxcblx0XHQnUWF0YXInLFxuXHRcdCdSZXVuaW9uJyxcblx0XHQnUm9tYW5pYScsXG5cdFx0J1J1c3NpYScsXG5cdFx0J1J3YW5kYScsXG5cdFx0J1NhaW50IEhlbGVuYScsXG5cdFx0J1NhaW50IEtpdHRzIGFuZCBOZXZpcycsXG5cdFx0J1NhaW50IEx1Y2lhJyxcblx0XHQnU2FpbnQgUGllcnJlIGFuZCBNaXF1ZWxvbicsXG5cdFx0J1NhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzJyxcblx0XHQnU2Ftb2EnLFxuXHRcdCdTYW4gTWFyaW5vJyxcblx0XHQnU2FvIFRvbWUgYW5kIFByaW5jaXBlJyxcblx0XHQnU2F1ZGkgQXJhYmlhJyxcblx0XHQnU2VuZWdhbCcsXG5cdFx0J1NlcmJpYSBhbmQgTW9udGVuZWdybycsXG5cdFx0J1NleWNoZWxsZXMnLFxuXHRcdCdTaWVycmEgTGVvbmUnLFxuXHRcdCdTaW5nYXBvcmUnLFxuXHRcdCdTbG92YWtpYScsXG5cdFx0J1Nsb3ZlbmlhJyxcblx0XHQnU29sb21vbiBJc2xhbmRzJyxcblx0XHQnU29tYWxpYScsXG5cdFx0J1NvdXRoIEFmcmljYScsXG5cdFx0J1NvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzJyxcblx0XHQnU3BhaW4nLFxuXHRcdCdTcHJhdGx5IElzbGFuZHMnLFxuXHRcdCdTcmkgTGFua2EnLFxuXHRcdCdTdWRhbicsXG5cdFx0J1N1cmluYW1lJyxcblx0XHQnU3ZhbGJhcmQnLFxuXHRcdCdTd2F6aWxhbmQnLFxuXHRcdCdTd2VkZW4nLFxuXHRcdCdTd2l0emVybGFuZCcsXG5cdFx0J1N5cmlhJyxcblx0XHQnVGFpd2FuJyxcblx0XHQnVGFqaWtpc3RhbicsXG5cdFx0J1RhbnphbmlhJyxcblx0XHQnVGhhaWxhbmQnLFxuXHRcdCdUaW1vci1MZXN0ZScsXG5cdFx0J1RvZ28nLFxuXHRcdCdUb2tlbGF1Jyxcblx0XHQnVG9uZ2EnLFxuXHRcdCdUcmluaWRhZCBhbmQgVG9iYWdvJyxcblx0XHQnVHJvbWVsaW4gSXNsYW5kJyxcblx0XHQnVHVuaXNpYScsXG5cdFx0J1R1cmtleScsXG5cdFx0J1R1cmttZW5pc3RhbicsXG5cdFx0J1R1cmtzIGFuZCBDYWljb3MgSXNsYW5kcycsXG5cdFx0J1R1dmFsdScsXG5cdFx0J1VnYW5kYScsXG5cdFx0J1VrcmFpbmUnLFxuXHRcdCdVbml0ZWQgQXJhYiBFbWlyYXRlcycsXG5cdFx0J1VuaXRlZCBLaW5nZG9tJyxcblx0XHQnVW5pdGVkIFN0YXRlcycsXG5cdFx0J1VydWd1YXknLFxuXHRcdCdVemJla2lzdGFuJyxcblx0XHQnVmFudWF0dScsXG5cdFx0J1ZlbmV6dWVsYScsXG5cdFx0J1ZpZXRuYW0nLFxuXHRcdCdWaXJnaW4gSXNsYW5kcycsXG5cdFx0J1dha2UgSXNsYW5kJyxcblx0XHQnV2FsbGlzIGFuZCBGdXR1bmEnLFxuXHRcdCdXZXN0IEJhbmsnLFxuXHRcdCdXZXN0ZXJuIFNhaGFyYScsXG5cdFx0J1llbWVuJyxcblx0XHQnWmFtYmlhJyxcblx0XHQnWmltYmFid2UnXG5cdF07XG5cblx0aWYgKCFxdWVyeSkge1xuXHRcdHBvcHVsYXRlT3B0aW9ucyhbXSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHN1Z2dlc3Rpb25zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG5cdFx0cmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcblx0fSk7XG5cblx0Y29uc3QgZmlsdGVyZWRPcHRpb25zID0gW107XG5cdGZvciAoY29uc3Qgc3VnZ2VzdGlvbiBvZiBzdWdnZXN0aW9ucykge1xuXHRcdGNvbnN0IGxvd2VyY2FzZVN1Z2dlc3Rpb24gPSBzdWdnZXN0aW9uLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG5cdFx0aWYgKGxvd2VyY2FzZVN1Z2dlc3Rpb24uc3RhcnRzV2l0aChxdWVyeS50b0xvY2FsZUxvd2VyQ2FzZSgpKSkge1xuXHRcdFx0ZmlsdGVyZWRPcHRpb25zLnB1c2goc3VnZ2VzdGlvbik7XG5cdFx0fVxuXHR9XG5cdHBvcHVsYXRlT3B0aW9ucyhmaWx0ZXJlZE9wdGlvbnMpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7XG4iXX0=