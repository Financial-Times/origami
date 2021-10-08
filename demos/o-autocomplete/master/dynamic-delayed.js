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

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/dynamic-delayed/dynamic-delayed.js

  var suggestionTimeoutId;

  function customSuggestions(query, populateOptions) {
    clearTimeout(suggestionTimeoutId);

    if (!query) {
      populateOptions([]);
      return;
    }

    var suggestions = ["Afghanistan", "Akrotiri", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ashmore and Cartier Islands", "Australia", "Austria", "Azerbaijan", "Bahamas, The", "Bahrain", "Bangladesh", "Barbados", "Bassas da India", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Clipperton Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Coral Sea Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dhekelia", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "Gambia,", "Gaza Strip", "Georgia", "Germany", "Ghana", "Gibraltar", "Glorioso Islands", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Jan Mayen", "Japan", "Jersey", "Jordan", "Juan de Nova Island", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paracel Islands", "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Spratly Islands", "Sri Lanka", "Sudan", "Suriname", "Svalbard", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tromelin Island", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wake Island", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
    suggestionTimeoutId = setTimeout(function () {
      suggestions.sort(function (a, b) {
        return a.localeCompare(b);
      });
      var filteredOptions = [];

      var _iterator3 = _createForOfIteratorHelper(suggestions),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var suggestion = _step3.value;
          var lowercaseSuggestion = suggestion.toLocaleLowerCase();

          if (lowercaseSuggestion.startsWith(query.toLocaleLowerCase())) {
            filteredOptions.push(suggestion);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      populateOptions(filteredOptions);
    }, 1e3);
  }

  window.customSuggestions = window.Origami["o-utils"].debounce(customSuggestions, 100);
  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L2FjY2Vzc2libGVBdXRvY29tcGxldGUvd2VicGFjay9ib290c3RyYXAiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5tanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lvYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmljdC1tZXRob2QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lm1hcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktbWV0aG9kcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtYXJyYXkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaW5kZXgtb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L2FjY2Vzc2libGVBdXRvY29tcGxldGUvd3JhcHBlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19saWJyYXJ5LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuZmlsdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pcy1hcnJheS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLmJpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9kaXN0L3dlYnBhY2s6L25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ludm9rZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYucmVnZXhwLm1hdGNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19maXgtcmUtd2tzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5hbmNpYWwtdGltZXMvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvZGlzdC93ZWJwYWNrOi9hY2Nlc3NpYmxlQXV0b2NvbXBsZXRlL3N0YXR1cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9AZmluYW5jaWFsLXRpbWVzL2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL2Rpc3Qvd2VicGFjazovYWNjZXNzaWJsZUF1dG9jb21wbGV0ZS9kcm9wZG93bi1hcnJvdy1kb3duLmpzIiwic3JjL2pzL2F1dG9jb21wbGV0ZS5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZHluYW1pYy1kZWxheWVkL2R5bmFtaWMtZGVsYXllZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBQSxTQUFBLGdDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQUNBLGdCQUFBLE9BQUEsS0FBQSxRQUFBLElBQUEsUUFBQSxNQUFBLEtBQUEsUUFBQSxHQUNBLE1BQUEsQ0FBQSxPQUFBLEdBQUEsQ0FBQSxFQURBLEdBRUEsT0FBQSxNQUFBLElBQUEsVUFBQSxJQUFBLE1BQUEsQ0FBQSxHQUFBLEdBQ0EsTUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBREEsR0FFQSxRQUFBLE9BQUEsS0FBQSxRQUFBLEdBQ0EsT0FBQSxDQUFBLHdCQUFBLENBQUEsR0FBQSxDQUFBLEVBREEsR0FHQSxDQUFBLENBQUEsd0JBQUEsQ0FBQSxHQUFBLENBQUEsRUFQQTtP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QSxDQUFBLENBSEE7QUFBQSxnQkFJQSxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUpBO0FBQUEsZ0JBS0EsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEdBQWtGLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBdUIsQ0FBdkIsQ0FMbEY7QUFBQSxnQkFNQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FOQTtBQUFBLGdCQU9BLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FQQTs7QUFVQSxpQkFBQSxDQUFBLElBREEsQ0FBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFDQSxFQUFBO0FBSUEsY0FBQSxDQUFBLEdBRkEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLEtBQUEsQ0FBQSxJQUVBLENBRkEsR0FFQSxFQUZBLEVBRUEsQ0FGQSxDQUVBLEVBRUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsT0FBQSxDQUFBLElBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxHQUFBLENBRkEsRUFJQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUpBLEVBTUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBTkEsRUFPQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQVBBO0FBSkE7V0FsQkE7O0FBZ0NBLFVBQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLEVBRUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUZBLEVBR0EsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUhBLEVBSUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUpBLEVBS0EsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUxBLEVBTUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQU5BLEVBT0EsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQVBBLEVBUUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQVJBLEVBU0EsQ0FBQSxDQUFBLENBQUEsR0FBQSxHQVRBLEVBVUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxDQVZBO1NEa0RBLEVDeENBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ3pDQSxjQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsT0FBQSxHQUFBLE9BQUEsTUFBQSxJQUFBLFdBQUEsSUFBQSxNQUFBLENBQUEsSUFBQSxJQUFBLElBQUEsR0FDQSxNQURBLEdBQ0EsT0FBQSxJQUFBLElBQUEsV0FBQSxJQUFBLElBQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsR0FFQSxRQUFBLENBQUEsYUFBQSxDQUFBLEVBSEE7QUFJQSxpQkFBQSxHQUFBLElBQUEsUUFBQSxLQUFBLEdBQUEsR0FBQSxDQUFBO1NGNkVBLEVFN0VBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0xBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLFFBQUEsRUFBQSxLQUFBLFFBQUEsR0FBQSxFQUFBLEtBQUEsSUFBQSxHQUFBLE9BQUEsRUFBQSxJQUFBLFVBQUE7V0FEQTtTSGtGQSxFR2pGQSxVQUFBLENBQUEsRUFBQSxD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LEdBQUEsT0FBQSxFQUFBLElBQUEsVUFBQSxNQUNBLEVBQUEsSUFBQSxJQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBa0MsT0FBQSxFQUFBLElBQUEsUUFBQSxHQUFBLEVBQUEsR0FBQSxNQUFBLENBQUEsRUFBQSxDQUFBLEdBQTBELE9BQUEsRUFBQSxJQUFBLFFBQUEsS0FBQSxFQUFBLEdBQUEsS0FBQSxDQUQ1RixDQUZBLEVBTUEsRUFBQSxJQUFBLEVBQUEsR0FDQSxFQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxFQURBLEdBRUksRUFBQSxLQUFBLENBQUEsR0FDSixFQUFBLEdBQUEsQ0FBQSxFQUFBLENBREksR0FHSixFQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FYQSxFQWNBLEVBQUEsR0FBQSxFQWRBO0FBTkE7O0FBd0JBLGdCQUFBLEVBQUEsR0FBQSxJQUFBLENBQUEsRUFBQTtBQVFBLG1CQVBBLEVBQUEsQ0FBQSxRQUFBLEdBQUEsRUFBQSxFQUNBLEVBQUEsQ0FBQSxRQUFBLEdBQUEsRUFEQSxFQUVBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQSxJQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUZBLEVBR0EsRUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLElBQUEsSUFBQSxHQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxHQUhBLEVBS0EsQ0FBQSxDQUFBLEtBQUEsS0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsS0FBQSxDQUFBLEVBQUEsQ0FMQSxFQU9BLEVBQUE7OztBQUdBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsaUJBQUEsSUFBQSxFQUFBLElBQUEsRUFBQTtBQUNBLGNBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUE7QUFEQTs7QUFFRyxtQkFBQSxFQUFBOzs7QUFHSCxjQUFBLENBQUEsR0FBQSxPQUFBLE9BQUEsSUFBQSxVQUFBLEdBQUEsT0FBQSxDQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxPQUFBLEVBQUEsQ0FBQSxHQUFBLFVBQUE7O0FBRUEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBMkMsRUFBQSxDQUFBLFVBQTNDLENBQUEsRUFBMkMsRUFBM0MsQ0FBQSxFQUEyQyxJQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsUUFBM0MsQ0FBQTs7O0FBR0EsY0FBQSxDQUFBLEdBQUEsd0RBQUE7QUFBQSxjQUVBLENBQUEsR0FBQSxFQUZBOztBQUlBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUE7QUFBQSxhQUNBLEVBQUEsQ0FBQSxNQURBLEtBQ0EsRUFBQSxDQUFBLE1BQUEsR0FBQSxJQURBLEtBQ0EsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FEQSxJQUVBLENBQUEsQ0FBQSxDQUFBLGlCQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsQ0FGQTs7O0FBTUEsbUJBQUEsQ0FBQSxHQUFBO0FBQ0EsZ0JBQUEsRUFBQTtBQUFBLGdCQUNBLEVBQUEsR0FBQSxDQURBOztBQUdBLGlCQURBLENBQUEsR0FBQSxFQUNBLEVBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDQSxjQUFBLEVBQUEsQ0FBQSxNQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTtBQURBOzs7QUFlQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLEVBQUEsQ0FBQSxrQkFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsUUFBQSxDQUFBLFdBQUEsT0FBQSxFQUFBLENBQUEsV0FBQSxFQUFBOzs7QUFHQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFB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QUVBLENBQUEsR0FBQSxDQUZBO0FBQUEsY0FJQSxDQUFBLEdBQUEsS0FKQTtBQUFBLGNBTUEsQ0FBQSxHQUFBLEtBTkE7O0FBUUEsbUJBQUEsQ0FBQSxHQUFBO0FBRUEsaUJBQUEsSUFEQSxFQUNBLEVBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUE7QUFDQSxjQUFBLENBQUEsQ0FBQSxVQUFBLElBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFDQSxFQUFBLENBQUEsaUJBQUEsSUFBQSxFQUFBLENBQUEsaUJBQUEsRUFEQTtBQURBOzs7QUFNQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxZQUFBLENBQUEsT0FDQSxDQUFBLEdBQUEsRUFBQSxJQUFBLElBQUEsSUFBQSxFQUFBLENBQUEsZUFBQSxLQUFBLEtBQUEsQ0FBQSxFQUVBLENBQUEsR0FBQSxFQUFBLElBQUEsSUFBQSxJQUFBLEVBQUEsbUJBQUEsRUFBQSxDQUhBLENBQUE7QUFNQSxnQkFBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7QUFVQSxtQkFSQSxFQUFBLElBQUEsRUFBQSxDQUFBLFVBQUEsS0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUVBLENBRkEsS0FHQSxDQUFBLEdBQUEsS0FBQSxFQUVBLEVBQUEsSUFBQSxDQUFBLEVBTEEsQ0FBQSxFQVFBLEVBQUE7OztBQUdBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxnQkFDQSxFQUFBLEdBQUEsQ0FEQTtBQUtBLGdCQUZBLEVBQUEsSUFBQSxJQUFBLElBQUEsT0FBQSxFQUFBLElBQUEsU0FBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLEdBRUEsT0FBQSxFQUFBLElBQUEsUUFBQSxJQUFBLE9BQUEsRUFBQSxJQUFBLFFBQUEsRUFlQSxPQWRBLEVBQUEsSUFBQSxFQUFBLENBQUEsU0FBQSxLQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQSxVQUFBLEtBQUEsQ0FBQSxFQUFBLENBQUEsVUFBQSxJQUFBLEVBQUEsSUFDQSxFQUFBLENBQUEsU0FBQSxJQUFBLEVBQUEsS0FDQSxFQUFBLENBQUEsU0FBQSxHQUFBLEVBREEsQ0FEQSxJQUtBLEVBQUEsR0FBQSxRQUFBLENBQUEsY0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUNBLEVBQUEsS0FDQSxFQUFBLENBQUEsVUFBQSxJQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsWUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFDQSxDQUFBLENBQUEsRUFBQSxFQUFBLElBQUEsQ0FGQSxDQU5BLEdBWUEsRUFBQSxDQUFBLGVBQUEsQ0FBQSxHQUFBLElBWkEsRUFjQSxFQUFBO0FBR0EsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxRQUFBO0FBQ0EsZ0JBQUEsT0FBQSxFQUFBLElBQUEsVUFBQSxFQUNBLE9BMldBLFNBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGtCQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLFVBQUE7QUFBQSxrQkFDQSxFQUFBLEdBQUEsRUFEQTtBQUFBLGtCQUVBLEVBQUEsR0FBQSxFQUZBO0FBQUEsa0JBR0EsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEscUJBQUEsS0FBQSxFQUFBLENBQUEsUUFIQTtBQUFBLGtCQUlBLEVBQUEsR0FBQSxFQUpBO0FBQUEsa0JBS0EsRUFBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBTEE7O0FBTUEscUJBQUEsRUFBQSxJQUFBLENBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsZ0JBQUEsQ0FBQTtBQUNBLGdCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsV0FBQSxLQUFBLEVBQUEsQ0FBQSxRQUFBO0FBREE7O0FBSUEsY0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxVQUFBLEtBQ0EsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFDQSxFQUFBLEdBQUEsRUFBQSxDQUFBLElBRkEsS0FJQSxFQUFBLElBQUEsQ0FBQSxFQUFBLEtBQ0EsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUNBLEVBQUEsR0FBQSxFQUFBLEdBQUEsSUFGQSxHQUtBLEVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUxBLEVBTUEsRUFBQSxJQUFBLENBQUEsRUFBQSxDQUFBLFFBQUEsS0FDQSxFQUFBLENBQUEsUUFBQSxHQUFBLEVBQUEsRUFFQSxFQUFBLEdBQUEsSUFIQSxDQU5BLEVBV0EsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBWEEsRUFZQSxFQUFBLEdBQUEsRUFBQSxDQUFBLElBWkEsRUFjQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsS0FDQSxFQUFBLENBQUEsVUFBQSxHQUFBLElBQUEsRUFDQSxDQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsQ0FGQSxDQWxCQTtBQXdCQSxxQkFBQSxFQUFBO2FBbkNBLENBM1dBLEVBMldBLEVBM1dBLEVBMldBLEVBM1dBLEVBMldBLEVBM1dBLEVBMldBLENBM1dBOztBQU1BLGdCQUhBLENBQUEsR0FBQSxFQUFBLEtBQUEsS0FBQSxJQUFBLEVBQUEsS0FBQSxlQUFBLElBQUEsQ0FBQSxFQUVBLEVBQUEsR0FBQSxNQUFBLENBQUEsRUFBQSxDQUZBLEVBRUEsQ0FBQSxDQUNBLEVBREEsSUFDQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQURBLE1BRUEsRUFBQSxHQXJJQSxTQUFBLEVBQUEsQ0FB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QUNBLE9BQUEsQ0FBQSxJQUFBLFFBREEsR0FFQSxDQUFBLENBQUEsU0FBQSxLQUFBLEtBQUEsQ0FGQSxHQUlBLE9BQUEsQ0FBQSxDQUFBLFFBQUEsSUFBQSxRQUFBLEdBQUEsQ0FDQSxDQUFBLENBQUEscUJBREEsSUFDQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxRQUFBLENBREEsR0FHQSxDQUFBLElBQUEsQ0FBQSxDQUFBLHFCQUFBLEtBQUEsQ0FBQSxDQUFBLFFBNk9BLENBQUEsRUFBQTtBQUNBLHNCQUFBLEVBQUEsR0FBQSxFQUFBLEVBQ0EsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FEQSxFQUVBLEVBQUEsS0FBQSxFQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUEsRUFGQSxFQUdBLEVBQUEsS0FBQSxFQUFBLElBQUEsRUFBQSxFQUhBO0FBSUE7O0FBTkE7O0FBV0EsZ0JBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFFQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FGQSxFQUdBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLEtBQ0EsRUFBQSxJQUFBLElBQUEsR0FDQSxFQUFBLENBQUEsV0FBQSxDQUFBLEVBQUEsQ0FEQSxHQUVLLEVBQUEsS0FBQSxFQUFBLENBQUEsV0FBQSxHQUNMLENBQUEsQ0FBQSxFQUFBLENBREssR0FHTCxFQUFBLENBQUEsWUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBTkEsQ0FIQTs7QUE5UEEsa0JBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBO0FBNlFBLGtCQUFBLEVBQUEsRUFDQSxLQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxnQkFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxLQUFBLENBQUE7QUFEQTs7QUFLQSxxQkFBQSxFQUFBLElBQUEsRUFBQTtBQUNBLGlCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsQ0FBQTtBQURBO2FBMUVBLENBVkEsRUFVQSxFQVZBLEVBVUEsRUFWQSxFQVVBLEVBVkEsRUFVQSxFQVZBLENBQUEsSUFBQSxFQUFBLENBQUEsdUJBQUEsSUFBQSxJQVVBLENBSEEsRUEwR0EsU0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxrQkFBQSxFQUFBOztBQUVBLG1CQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxJQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLElBQUEsSUFDQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxFQUFBLENBQUEsQ0FEQTtBQURBOztBQU1BLG1CQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxLQUFBLFVBQUEsSUFBQSxFQUFBLEtBQUEsV0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQSxPQUFBLElBQUEsRUFBQSxLQUFBLFNBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLElBQ0EsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQURBO0FBREE7YUFUQSxDQTlHQSxFQThHQSxFQTlHQSxFQUFBLENBQUEsVUE4R0EsRUE5R0EsRUE4R0EsQ0ExR0EsRUFGQSxDQUFBLEdBQUEsRUFFQSxFQUFBLEVBQUE7OztBQWtGQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGdCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsVUFBQTtBQUNBLFlBQUEsRUFBQSxHQUNBLENBQUEsQ0FBQSxFQUFBLENBREEsSUFHQSxFQUFBLENBQUEsZUFBQSxDQUFBLElBQUEsSUFBQSxJQUFBLEVBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsRUFBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsRUFFQSxFQUFBLEtBRkEsS0FFQSxJQUFBLEVBQUEsQ0FBQSxlQUFBLENBQUEsSUFBQSxJQUFBLElBQ0EsQ0FBQSxDQUFBLEVBQUEsQ0FIQSxFQU1BLENBQUEsQ0FBQSxFQUFBLENBVEEsQ0FBQTs7O0FBYUEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtBQUVBLGlCQURBLEVBQUEsR0FBQSxFQUFBLENBQUEsU0FDQSxFQUFBLEVBQUEsR0FBQTtBQUNBLGtCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsZUFBQTtBQUNBLGNBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxJQUFBLENBQUEsRUFDQSxFQUFBLEdBQUEsRUFEQTs7OztBQXFCQSxjQUFBLENBQUEsR0FBQSxFQUFBOztBQUVBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGdCQUFBLEVBQUE7QUFBQSxnQkFDQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLE1BREE7O0FBWUEsaUJBVEEsRUFBQSxDQUFBLFNBQUEsSUFBQSxFQUFBLENBQUEsU0FBQSxDQUFBLE1BQUEsSUFDQSxFQUFBLEdBQUEsSUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUNBLENBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBRkEsS0FJQSxDQUFBLEVBQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLEVBQ0EsV0FEQSxHQUNBLEVBREEsRUFFQSxFQUFBLENBQUEsTUFBQSxHQUFBLENBTkEsQ0FTQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGtCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxXQUFBLEtBQUEsRUFBQSxFQUdBLE9BRkEsRUFBQSxDQUFBLFFBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsUUFBQSxFQUNBLENBQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FEQSxFQUVBLEVBQUE7QUFKQTs7QUFRQSxtQkFBQSxFQUFBOzs7QUFHQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxLQUFBLFdBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUFBOzs7QUFHQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLFlBQUEsRUFBQSxDQUFBLFFBQUEsS0FDQSxFQUFBLENBQUEsUUFBQSxHQUFBLElBQUEsRUFFQSxFQUFBLENBQUEsS0FBQSxHQUFBLEVBQUEsQ0FBQSxHQUZBLEVBR0EsRUFBQSxDQUFBLEtBQUEsR0FBQSxFQUFBLENBQUEsR0FIQSxFQUdBLE9BQ0EsRUFBQSxDQUFBLEdBSkEsRUFJQSxPQUNBLEVBQUEsQ0FBQSxHQUxBLEVBT0EsT0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLHdCQUFBLElBQUEsV0FBQSxLQUFBLENBQ0EsRUFBQSxDQUFBLElBREEsSUFDQSxFQURBLEdBRUEsRUFBQSxDQUFBLGtCQUFBLElBQUEsRUFBQSxDQUFBLGtCQUFBLEVBRkEsR0FHRyxFQUFBLENBQUEseUJBQUEsSUFDSCxFQUFBLENBQUEseUJBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUpBLENBUEEsRUFlQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxPQUFBLEtBQ0EsRUFBQSxDQUFBLFdBQUEsS0FBQSxFQUFBLENBQUEsV0FBQSxHQUFBLEVBQUEsQ0FBQSxPQUFBLEdBQ0EsRUFBQSxDQUFBLE9BQUEsR0FBQSxFQUZBLENBZkEsRUFvQkEsRUFBQSxDQUFBLFNBQUEsS0FBQSxFQUFBLENBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxLQUFBLENBcEJBLEVBcUJBLEVBQUEsQ0FBQSxLQUFBLEdBQUEsRUFyQkEsRUF1QkEsRUFBQSxDQUFBLFFBQUEsR0FBQSxLQXZCQSxFQXlCQSxFQUFBLEtBQUEsQ0FBQSxLQUNBLEVBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLG9CQUFBLEtBQUEsS0FBQSxJQUFBLEVBQUEsQ0FBQSxJQUFBLEdBR0EsQ0FBQSxDQUFBLEVBQUEsQ0FIQSxHQUNBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FGQSxDQXpCQSxFQWlDQSxFQUFBLENBQUEsS0FBQSxJQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxDQWxDQTs7O0FBcUNBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxnQkFBQSxDQUFBLEVBQUEsQ0FBQSxRQUFBLEVBQUE7QUFFQSxrQkFZQSxFQVpBO0FBQUEsa0JBYUEsRUFiQTtBQUFBLGtCQWNBLEVBZEE7QUFBQSxrQkFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEtBQUE7QUFBQSxrQkFDQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEtBREE7QUFBQSxrQkFFQSxFQUFBLEdBQUEsRUFBQSxDQUFBLE9BRkE7QUFBQSxrQkFHQSxFQUFBLEdBQUEsRUFBQSxDQUFBLFNBQUEsSUFBQSxFQUhBO0FBQUEsa0JBSUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxTQUFBLElBQUEsRUFKQTtBQUFBLGtCQUtBLEVBQUEsR0FBQSxFQUFBLENBQUEsV0FBQSxJQUFBLEVBTEE7QUFBQSxrQkFNQSxFQUFBLEdBQUEsRUFBQSxDQUFBLElBTkE7QUFBQSxrQkFPQSxFQUFBLEdBQUEsRUFBQSxDQUFBLFFBUEE7QUFBQSxrQkFRQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBUkE7QUFBQSxrQkFTQSxFQUFBLEdBQUEsRUFBQSxDQUFBLFVBVEE7QUFBQSxrQkFVQSxFQUFBLEdBQUEsS0FWQTtBQUFBLGtCQVdBLEVBQUEsR0FBQSxFQVhBOztBQXNDQSxrQkF0QkEsRUFBQSxDQUFBLFdBQUEsQ0FBQSx3QkFBQSxLQUNBLEVBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBMEIsRUFBMUIsQ0FBQSxFQUEwQixFQUFBLENBQUEsV0FBQSxDQUFBLHdCQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBMUIsQ0FBQSxFQUNBLEVBQUEsQ0FBQSxLQUFBLEdBQUEsRUFGQSxHQUtBLEVBQUEsS0FDQSxFQUFBLENBQUEsS0FBQSxHQUFBLEVBQUEsRUFDQSxFQUFBLENBQUEsS0FBQSxHQUFBLEVBREEsRUFFQSxFQUFBLENBQUEsT0FBQSxHQUFBLEVBRkEsRUFHQSxFQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQSxxQkFBQSxJQUFBLEVBQUEsQ0FBQSxxQkFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxNQUFBLEtBQUEsR0FDQSxFQUFBLEdBQUEsSUFEQSxHQUVHLEVBQUEsQ0FBQSxtQkFBQSxJQUNILEVBQUEsQ0FBQSxtQkFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQU5BLEVBUUEsRUFBQSxDQUFBLEtBQUEsR0FBQSxFQVJBLEVBU0EsRUFBQSxDQUFBLEtBQUEsR0FBQSxFQVRBLEVBVUEsRUFBQSxDQUFBLE9BQUEsR0FBQSxFQVhBLENBTEEsRUFtQkEsRUFBQSxDQUFBLFNBQUEsR0FBQSxFQUFBLENBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxXQUFBLEdBQUEsRUFBQSxDQUFBLFFBQUEsR0FBQSxJQW5CQSxFQW9CQSxFQUFBLENBQUEsTUFBQSxHQUFBLEtBcEJBLEVBb0JBLENBRUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsRUFFQSxFQUFBLENBQUEsZUFBQSxLQUNBLEVBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBNkIsRUFBN0IsQ0FBQSxFQUE2QixFQUFBLENBQUEsZUFBQSxFQUE3QixDQURBLENBRkEsRUFNQSxFQUFBLElBQUEsRUFBQSxDQUFBLHVCQUFBLEtBQ0EsRUFBQSxHQUFBLEVBQUEsQ0FBQSx1QkFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBREEsQ0FOQTs7QUFVQSxvQkFDQSxFQURBO0FBQUEsb0JBRUEsRUFGQTtBQUFBLG9CQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLFFBQUE7O0FBSUEsb0JBQUEsT0FBQSxDQUFBLElBQUEsVUFBQSxFQUFBO0FBRUEsc0JBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7QUFDQSxtQkFBQSxFQUFBLEdBQUEsRUFBQSxLQUVBLEVBQUEsQ0FBQSxXQUFBLEtBQUEsQ0FGQSxJQUVBLENBQUEsQ0FBQSxHQUFBLElBQUEsRUFBQSxDQUFBLEtBRkEsR0FHQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsQ0FIQSxJQUtBLEVBQUEsR0FBQSxFQUFBLEVBRUEsRUFBQSxDQUFBLFVBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxDQUZBLEVBR0EsRUFBQSxDQUFBLFFBQUEsR0FBQSxFQUFBLENBQUEsUUFBQSxJQUFBLEVBSEEsRUFJQSxFQUFBLENBQUEsZ0JBQUEsR0FBQSxFQUpBLEVBS0EsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxLQUFBLENBTEEsRUFNQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsSUFBQSxDQVhBLEdBY0EsRUFBQSxHQUFBLEVBQUEsQ0FBQSxJQWRBO2lCQUhBLE1BbUJBLEVBQUEsR0FBQSxFQUFBLEVBRUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxNQUVBLEVBQUEsR0FBQSxFQUFBLENBQUEsVUFBQSxHQUFBLElBRkEsQ0FGQSxFQU9BLENBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxDQUFBLE1BQ0EsRUFBQSxLQUFBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsSUFBQSxDQUFBLEVBQ0EsRUFBQSxHQTFXQSxTQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGtCQUFBLENBQUEsT0FDQSxDQUFBLEdBQUEsRUFBQSxJQUFBLElBQUEsSUFBQSxFQUFBLENBQUEsZUFBQSxLQUFBLEtBQUEsQ0FBQSxFQUVBLENBQUEsR0FBQSxFQUFBLElBQUEsSUFBQSxJQUFBLEVBQUEsbUJBQUEsRUFBQSxDQUhBLENBQUE7QUFNQSxzQkFBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7QUFVQSx5QkFSQSxFQUFBLElBQUEsRUFBQSxDQUFBLFVBQUEsS0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLFdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUVBLENBRkEsS0FHQSxDQUFBLEdBQUEsS0FBQSxFQUVBLEVBQUEsSUFBQSxDQUFBLEVBTEEsQ0FBQSxFQVFBLEVBQUE7aUJBakJBLENBMFdBLEVBMVdBLEVBMFdBLEVBMVdBLEVBMFdBLEVBMVdBLEVBMFdBLEVBQUEsSUFBQSxDQUFBLEVBMVdBLEVBMFdBLEVBQUEsSUFBQSxFQUFBLENBQUEsVUExV0EsRUEwV0EsSUExV0EsQ0F3V0EsQ0FQQTs7QUFhQSxvQkFBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxFQUFBO0FBQ0Esc0JBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxVQUFBO0FBQ0Esa0JBQUEsQ0FBQSxJQUFBLEVBQUEsS0FBQSxDQUFBLEtBQ0EsQ0FBQSxDQUFBLFlBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxHQUVBLEVBQUEsS0FDQSxFQUFBLENBQUEsVUFBQSxHQUFBLElBQUEsRUFDQSxDQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsQ0FGQSxDQUhBOzs7QUFlQSxvQkFMQSxFQUFBLElBQ0EsQ0FBQSxDQUFBLEVBQUEsQ0FEQSxFQUlBLENBQUEsRUFBQSxDQUFBLElBQUEsR0FBQSxFQUFBLEtBQUEsQ0FDQSxFQUFBLEVBQUE7QUFHQSx1QkFBQSxJQUZBLENBQUEsR0FBQSxFQUVBLEVBREEsQ0FBQSxHQUFBLEVBQ0EsRUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLGdCQUFBO0FBQ0EscUJBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxJQUFBLEdBQUEsRUFBQTtBQURBOztBQUdBLGtCQUFBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsQ0FBQSxFQUNBLEVBQUEsQ0FBQSxxQkFBQSxHQUFBLENBQUEsQ0FBQSxXQURBOzs7O0FBZUEsbUJBQUEsQ0FWQSxFQVVBLElBVkEsRUFVQSxHQVRBLENBQUEsQ0FBQSxPQUFBLENBQUEsRUFBQSxDQVNBLEdBUkUsRUFBQSxLQUVGLEVBQUEsQ0FBQSxrQkFBQSxJQUNBLEVBQUEsQ0FBQSxrQkFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQURBLEVBR0EsQ0FBQSxDQUFBLFdBQUEsSUFBQSxDQUFBLENBQUEsV0FBQSxDQUFBLEVBQUEsQ0FMRSxDQVFGLEVBQUEsRUFBQSxDQUFBLGdCQUFBLENBQUEsTUFBQTtBQUNBLGdCQUFBLEVBQUEsQ0FBQSxnQkFBQSxDQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsRUFBQTtBQURBOztBQUVFLGNBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLEVBQUE7Ozs7QUF5Q0YsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQTtBQUNBLFlBQUEsQ0FBQSxDQUFBLGFBQUEsSUFBQSxDQUFBLENBQUEsYUFBQSxDQUFBLEVBQUEsQ0FBQTtBQUVBLGdCQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsSUFBQTtBQUVBLFlBQUEsRUFBQSxDQUFBLFFBQUEsR0FBQSxJQUFBLEVBRUEsRUFBQSxDQUFBLG9CQUFBLElBQUEsRUFBQSxDQUFBLG9CQUFBLEVBRkEsRUFJQSxFQUFBLENBQUEsSUFBQSxHQUFBLElBSkE7QUFNQSxnQkFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLFVBQUE7QUFDQSxZQUFBLEVBQUEsR0FDQSxDQUFBLENBQUEsRUFBQSxDQURBLEdBRUUsRUFBQSxLQUNGLEVBQUEsQ0FBQSxlQUFBLENBQUEsSUFBQSxFQUFBLENBQUEsZUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLEVBQUEsQ0FBQSxlQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLEVBSUEsQ0FBQSxDQUZBLEVBQUEsQ0FBQSxRQUFBLEdBQUEsRUFFQSxDQUpBLEVBS0EsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBTEEsRUFPQSxDQUFBLENBQUEsRUFBQSxDQVJFLENBRkYsRUFhQSxFQUFBLENBQUEsS0FBQSxJQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxDQWJBOzs7QUFnQkEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxpQkFBQSxNQUFBLEdBQUEsSUFBQSxFQUVBLEtBQUEsT0FBQSxHQUFBLEVBRkEsRUFJQSxLQUFBLEtBQUEsR0FBQSxFQUpBLEVBTUEsS0FBQSxLQUFBLEdBQUEsS0FBQSxLQUFBLElBQUEsRUFOQSxFQVFBLEtBQUEsZ0JBQUEsR0FBQSxFQVJBOzs7QUF5QkEsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsRUFBOEIsRUFBOUIsRUFBOEIsS0FBOUIsQ0FBQTs7O0FBZkEsVUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLFNBQUEsRUFBQTtBQUNBLFlBQUEsUUFBQSxFQUFBLGtCQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxTQUFBLEtBQUEsS0FBQSxTQUFBLEdBQUEsS0FBQSxLQUFBLEdBQ0EsS0FBQSxLQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQStCLEtBQUEsS0FBL0IsQ0FBQSxFQUErQixPQUFBLEVBQUEsSUFBQSxVQUFBLEdBQUEsRUFBQSxDQUFBLEtBQUEsS0FBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBL0IsQ0FEQSxFQUVBLEVBQUEsSUFBQSxLQUFBLGdCQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FGQSxFQUdBLENBQUEsQ0FBQSxJQUFBLENBSEE7YUFGQTtBQU9BLFlBQUEsV0FBQSxFQUFBLHFCQUFBLEVBQUEsRUFBQTtBQUNBLGNBQUEsRUFBQSxJQUFBLEtBQUEsZ0JBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0EsQ0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBLENBREE7YUFSQTtBQVdBLFlBQUEsTUFBQSxFQUFBLFNBQUEsRUFBQSxHQUFBLEM7QUFYQSxXQUFBLENBQUE7QUFrQkEsY0FBQSxDQUFBLEdBQUE7QUFDQSxZQUFBLENBQUEsRUFBQSxDQURBO0FBRUEsWUFBQSxhQUFBLEVBQUEsQ0FGQTtBQUdBLFlBQUEsWUFBQSxFQUFBLENBSEE7QUFJQSxZQUFBLFNBQUEsRUFBQSxDQUpBO0FBS0EsWUFBQSxNQUFBLEVBQUEsQ0FMQTtBQU1BLFlBQUEsUUFBQSxFQUFBLENBTkE7QUFPQSxZQUFBLE9BQUEsRUFBQTtBQVBBLFdBQUE7QUFVZSxVQUFBLENBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBO1NOdG5CZixFTXNuQmUsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDeHNCZixjQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsT0FBQSxHQUFBO0FBQTZCLFlBQUEsT0FBQSxFQUFBO0FBQTdCLFdBQUE7QUFDQSxpQkFBQSxHQUFBLElBQUEsUUFBQSxLQUFBLEdBQUEsR0FBQSxDQUFBO1NQaUZBLEVPakZBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUNEQSxjQUFBLENBQUEsR0FBUyxDQUFBLENBQVEsQ0FBUixDQUFUO0FBQUEsY0FDQSxDQUFBLEdBQWlCLENBQUEsQ0FBUSxFQUFSLENBRGpCO0FBRUEsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFpQixDQUFBLENBQVEsQ0FBUixDQUFBLEdBQXdCLFVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDekMsbUJBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUE7V0FEaUIsR0FFaEIsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUVELG1CQURBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEVBQ0EsRUFBQTtXQUpBO1NSZ0ZBLEVRNUVBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUNOQSxjQUFBLENBQUEsR0FBZSxDQUFBLENBQVEsQ0FBUixDQUFmO0FBQUEsY0FDQSxDQUFBLEdBQXFCLENBQUEsQ0FBUSxFQUFSLENBRHJCO0FBQUEsY0FFQSxDQUFBLEdBQWtCLENBQUEsQ0FBUSxFQUFSLENBRmxCO0FBQUEsY0FHQSxDQUFBLEdBQUEsTUFBQSxDQUFBLGNBSEE7QUFLQSxVQUFBLENBQUEsQ0FBQSxDQUFBLEdBQVksQ0FBQSxDQUFRLENBQVIsQ0FBQSxHQUF3QixNQUFBLENBQUEsY0FBeEIsR0FBd0IsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUlwQyxnQkFIQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQ0EsRUFBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxDQURBLEVBRUEsQ0FBQSxDQUFBLEVBQUEsQ0FGQSxFQUdBLENBQUEsRUFBQSxJQUFBO0FBQ0EscUJBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBO2FBREEsQyxPQUVHLEMsRUFBQSxDO0FBQ0gsZ0JBQUEsU0FBQSxFQUFBLElBQUEsU0FBQSxFQUFBLEVBQUEsTUFBQSxTQUFBLENBQUEsMEJBQUEsQ0FBQTtBQUVBLG1CQURBLFdBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsS0FBQSxHQUNBLEVBQUE7V0FUQTtTVDZFQSxFU3BFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDZEEsY0FBQSxDQUFBLEdBQWUsQ0FBQSxDQUFRLENBQVIsQ0FBZjs7QUFDQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUE7QUFDQSxnQkFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxNQUFBLFNBQUEsQ0FBQSxFQUFBLEdBQUEsb0JBQUEsQ0FBQTtBQUNBLG1CQUFBLEVBQUE7V0FGQTtTVmlGQSxFVS9FQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUNIQSxjQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsY0FDQSxDQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEsRUFEQTs7QUFFQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxVQUFBLE1BQUEsQ0FBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsUUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBO1dBREE7U1hnRkEsRVcvRUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0ZBLGNBQUEsQ0FBQSxHQUFVLENBQUEsQ0FBUSxFQUFSLENBQVY7QUFFQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQSxJQUFBLE1BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxRQUFBLEdBQUEsRUFBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsRUFBQSxDQUFBO1dBREE7U1orRUEsRVk5RUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDSEEsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQSxJQUFBLEtBQUEsQ0FBQSxFQUFBLE1BQUEsU0FBQSxDQUFBLDJCQUFBLEVBQUEsQ0FBQTtBQUNBLG1CQUFBLEVBQUE7V0FGQTtTYmlGQSxFYS9FQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQUE7O0FDRkEsY0FBQSxDQUFBLEdBQVksQ0FBQSxDQUFRLENBQVIsQ0FBWjs7QUFFQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsWUFBQTtBQUVBLGNBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBLFlBQUEsQyxDQUFBLEVBQXVELENBQXZELENBQUEsR0FBdUQsRUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQXZEO2FBRkEsQ0FBQTtXQURBO1NkK0VBLEVjNUV1RCxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDTHZELGNBQUEsQ0FBQSxHQUFjLENBQUEsQ0FBUSxDQUFSLENBQWQ7QUFFQSxVQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsUUFBQSxFQUFBO0FBQTBDLFlBQUEsTUFBQSxFQUFTLENBQUEsQ0FBUSxFQUFSO0FBQW5ELFdBQUEsQ0FBQTtTZitFQSxFZS9FMkQsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0gzRCxjQUFBLENBQUEsR0FBZSxDQUFBLENBQVEsQ0FBUixDQUFmO0FBQUEsY0FDQSxDQUFBLEdBQWUsQ0FBQSxDQUFRLENBQVIsQ0FBQSxDQUFtQixRQURsQztBQUFBLGNBR0EsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FIQTs7QUFJQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLGFBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBO1dBREE7U2hCOEVBLEVnQjdFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDTEEsY0FBQSxDQUFBLEdBQWEsQ0FBQSxDQUFRLENBQVIsQ0FBYjtBQUFBLGNBQ0EsQ0FBQSxHQUFXLENBQUEsQ0FBUSxDQUFSLENBRFg7QUFBQSxjQUVBLENBQUEsR0FBVSxDQUFBLENBQVEsRUFBUixDQUZWO0FBQUEsY0FHQSxDQUFBLEdBQVUsQ0FBQSxDQUFRLEVBQVIsQ0FBQSxDQUFnQixLQUFoQixDQUhWO0FBQUEsY0FJQSxDQUFBLEdBQUEsVUFKQTtBQUFBLGNBS0EsQ0FBQSxHQUFBLFFBQUEsQ0FBQSxDQUFBLENBTEE7QUFBQSxjQU1BLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLENBTkE7QUFRQSxVQUFBLENBQUEsQ0FBUSxDQUFSLENBQUEsQ0FBaUIsYUFBakIsR0FBaUIsVUFBQSxFQUFBLEVBQUE7QUFDakIsbUJBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUE7V0FEQSxFQUlBLENBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGdCQUFBLEVBQUEsR0FBQSxPQUFBLEVBQUEsSUFBQSxVQUFBO0FBQ0EsWUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxNQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLE1BQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxFQUNBLEVBQUEsQ0FBQSxFQUFBLENBQUEsS0FBQSxFQUFBLEtBQ0EsRUFBQSxLQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEtBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNBLEVBQUEsS0FBQSxDQUFBLEdBQ0EsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEVBREEsR0FFRyxFQUFBLEdBR0EsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUNILEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQURHLEdBR0gsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQU5HLElBTUgsT0FMQSxFQUFBLENBQUEsRUFBQSxDQUtBLEVBSkEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUZHLENBSkgsQ0FEQTtXQUZBLEVBZ0JDLFFBQUEsQ0FBQSxTQWhCRCxFQWdCQyxDQWhCRCxFQWdCQyxZQUFBO0FBQ0QsbUJBQUEsT0FBQSxJQUFBLElBQUEsVUFBQSxJQUFBLEtBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUE7V0FqQkEsQ0FKQTtTakIwRUEsRWlCckRBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQzdCQSxjQUFBLENBQUEsR0FBQSxHQUF1QixjQUF2Qjs7QUFDQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxDQUFBO1dBREE7U2xCaUZBLEVrQmhGQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDREEsY0FBQSxDQUFBLEdBQWdCLENBQUEsQ0FBUSxFQUFSLENBQWhCOztBQUNBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBO0FBRUEsZ0JBREEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUNBLENBQUEsS0FBQSxLQUFBLENBQUEsRUFBQSxPQUFBLENBQUE7O0FBQ0Esb0JBQUEsRUFBQTttQkFDQSxDO0FBQUEsdUJBQUEsVUFBQSxFQUFBLEVBQUE7QUFDQSx5QkFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUE7aUJBREE7O21CQUdBLEM7QUFBQSx1QkFBQSxVQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSx5QkFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBO2lCQURBOzttQkFHQSxDO0FBQUEsdUJBQUEsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLHlCQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBO2lCQURBO0FBUEE7O0FBV0EsbUJBQUEsWUFBQTtBQUNBLHFCQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxFQUFBLFNBQUEsQ0FBQTthQURBO1dBZEE7U25CZ0ZBLEVtQmpFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUNqQkEsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsT0FBQSxFQUFBLElBQUEsVUFBQSxFQUFBLE1BQUEsU0FBQSxDQUFBLEVBQUEsR0FBQSxxQkFBQSxDQUFBO0FBQ0EsbUJBQUEsRUFBQTtXQUZBO1NwQmtGQSxFb0JoRkEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0RBLGNBQUEsQ0FBQSxHQUFZLENBQUEsQ0FBUSxFQUFSLENBQVo7QUFBQSxjQUNBLENBQUEsR0FBa0IsQ0FBQSxDQUFRLEVBQVIsQ0FEbEI7O0FBR0EsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLE1BQUEsQ0FBQSxJQUFBLElBQUEsVUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQTtXQURBO1NyQjhFQSxFcUI3RUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0pBLGNBQUEsQ0FBQSxHQUFjLENBQUEsQ0FBUSxFQUFSLENBQWQ7QUFBQSxjQUNBLENBQUEsR0FBYyxDQUFBLENBQVEsRUFBUixDQURkOztBQUVBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUE7V0FEQTtTdEIrRUEsRXNCOUVBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0pBLGNBQUEsQ0FBQSxHQUFBLEdBQWlCLFFBQWpCOztBQUVBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7V0FEQTtTdkJnRkEsRXVCL0VBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUNEQSxjQUFBLENBQUEsR0FBZ0IsQ0FBQSxDQUFRLEVBQVIsQ0FBaEI7QUFBQSxjQUNBLENBQUEsR0FBZSxDQUFBLENBQVEsRUFBUixDQURmO0FBQUEsY0FFQSxDQUFBLEdBQXNCLENBQUEsQ0FBUSxFQUFSLENBRnRCOztBQUdBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLENBQUEsRUFBQTtBQUNBLG1CQUFBLFVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxrQkFHQSxDQUhBO0FBQUEsa0JBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7QUFBQSxrQkFDQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLENBREE7QUFBQSxrQkFFQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBRkE7O0FBTUEsa0JBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUE7QUFBQSx1QkFBQSxDQUFBLEdBQUEsQ0FBQTtBQUdBLHNCQUZBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxLQUVBLENBQUEsRUFBQSxPQUFBLElBQUE7QUFIQTtlQUFBLE1BS0ssT0FBWSxDQUFBLEdBQUEsQ0FBWixFQUEyQixDQUFBLEVBQTNCO0FBQTJCLG9CQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEtBQ2hDLENBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxFQURnQyxFQUNoQyxPQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTtBQURLOztBQUVBLHFCQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTthQWRMO1dBREE7U3hCNkVBLEV3QjlESyxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDbkJMLGNBQUEsQ0FBQSxHQUFnQixDQUFBLENBQVEsRUFBUixDQUFoQjtBQUFBLGNBQ0EsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQURBOztBQUVBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsZ0JBQUEsQ0FBQSxHQUFBLENBQUE7V0FEQTtTekIrRUEsRXlCOUVBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0hBLGNBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxJQUFBO0FBQUEsY0FDQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEtBREE7O0FBRUEsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsS0FBQSxDQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsRUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBO1dBREE7UzFCK0VBLEUwQjlFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDSkEsY0FBQSxDQUFBLEdBQWEsQ0FBQSxDQUFRLEVBQVIsQ0FBQSxDQUFtQixNQUFuQixDQUFiO0FBQUEsY0FDQSxDQUFBLEdBQVUsQ0FBQSxDQUFRLEVBQVIsQ0FEVjs7QUFFQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQTtXQURBO1MzQmdGQSxFMkIvRUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0hBLGNBQUEsQ0FBQSxHQUFXLENBQUEsQ0FBUSxDQUFSLENBQVg7QUFBQSxjQUNBLENBQUEsR0FBYSxDQUFBLENBQVEsQ0FBUixDQURiO0FBQUEsY0FFQSxDQUFBLEdBQUEsb0JBRkE7QUFBQSxjQUdBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FIQTtBQUtBLFdBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxtQkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBO1dBREEsRUFFQyxVQUZELEVBRUMsRUFGRCxFQUVDLElBRkQsQ0FFQztBQUNELFlBQUEsT0FBQSxFQUFBLENBQUEsQ0FBQSxPQURDO0FBRUQsWUFBQSxJQUFBLEVBQVEsQ0FBQSxDQUFRLEVBQVIsQ0FBQSxHQUFvQixNQUFwQixHQUFvQixRQUYzQjtBQUdELFlBQUEsU0FBQSxFQUFBO0FBSEMsV0FGRDtTNUI2RUEsRTRCeEVBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ1RBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxnR0FFQSxLQUZBLENBRUEsR0FGQSxDQUFBO1M3QmlGQSxFNkIvRUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0ZBLGNBQUEsQ0FBQSxHQUFjLENBQUEsQ0FBUSxFQUFSLENBQWQ7O0FBQ0EsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQTtXQURBO1M5QmdGQSxFOEIvRUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0hBLGNBQUEsQ0FBQSxHQUFTLENBQUEsQ0FBUSxDQUFSLENBQUEsQ0FBc0IsQ0FBL0I7QUFBQSxjQUNBLENBQUEsR0FBQSxRQUFBLENBQUEsU0FEQTtBQUFBLGNBRUEsQ0FBQSxHQUFBLHVCQUZBO0FBR0Esb0JBR0EsQ0FIQSxJQUdrQixDQUFBLENBQVEsQ0FBUixDQUFBLElBQXdCLENBQUEsQ0FBQSxDQUFBLEVBSDFDLE1BRzBDLEVBQUE7QUFDMUMsWUFBQSxZQUFBLEVBQUEsSUFEMEM7QUFFMUMsWUFBQSxHQUFBLEVBQUEsZUFBQTtBQUNBLGtCQUFBO0FBQ0EsdUJBQUEsQ0FBQSxLQUFBLElBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQTtlQURBLEMsT0FFSyxFLEVBQUE7QUFDTCx1QkFBQSxFQUFBOzs7QUFOMEMsV0FBQSxDQUgxQztTL0IrRUEsRStCdEVBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUFBQTs7QUNYQSxjQUFBLENBQUEsR0FBYyxDQUFBLENBQVEsQ0FBUixDQUFkO0FBQUEsY0FDQSxDQUFBLEdBQVcsQ0FBQSxDQUFRLEVBQVIsQ0FBQSxDQUEwQixDQUExQixDQURYO0FBR0EsVUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQWlDLENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBMEIsR0FBQSxHQUExQixFQUEwQixJQUExQixDQUFqQyxFQUEyRCxPQUEzRCxFQUEyRDtBQUUzRCxZQUFBLEdBQUEsRUFBQSxhQUFBLEVBQUEsRUFBQTtBQUNBLHFCQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTs7QUFIMkQsV0FBM0QsQ0FBQTtTaEM4RUEsRWdDM0VBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUFBQSxjQUFBLENBQUEsR0NBVSxDQUFBLENBQVEsRUFBUixDREFWO0FBQUEsY0NDQSxDQUFBLEdBQWMsQ0FBQSxDQUFRLEVBQVIsQ0REZDtBQUFBLGNDRUEsQ0FBQSxHQUFlLENBQUEsQ0FBUSxFQUFSLENERmY7QUFBQSxjQ0dBLENBQUEsR0FBZSxDQUFBLENBQVEsRUFBUixDREhmO0FBQUEsY0NJQSxDQUFBLEdBQVUsQ0FBQSxDQUFRLEVBQVIsQ0RKVjs7QUNLQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBO0FBQUEsZ0JBQ0EsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQURBO0FBQUEsZ0JBRUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUZBO0FBQUEsZ0JBR0EsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUhBO0FBQUEsZ0JBSUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUpBO0FBQUEsZ0JBS0EsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FMQTtBQUFBLGdCQU1BLENBQUEsR0FBQSxFQUFBLElBQUEsQ0FOQTtBQU9BLG1CQUFBLFVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFRQSxtQkFBQSxJQURBLEVBQ0EsRUFEQSxDQUNBLEVBUEEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBT0EsRUFOQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FNQSxFQUxBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBLENBS0EsRUFKQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLENBSUEsRUFIQSxDQUFBLEdBQUEsQ0FHQSxFQUZBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxLQUFBLENBRUEsRUFBVSxDQUFBLEdBQUEsQ0FBVixFQUF5QixDQUFBLEVBQXpCO0FBQXlCLG9CQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLE1BRXpCLENBQUEsR0FBQSxDQUFBLENBREEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQ0EsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQ0EsQ0FIeUIsQ0FBQSxFQUd6QjtBQUNBLHNCQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEssSUFDQSxDLEVBQUEsUUFBQSxDQUFBO3lCQUNBLEM7QUFBQSw2QkFBQSxJQUFBOzt5QkFDQSxDO0FBQUEsNkJBQUEsRUFBQTs7eUJBQ0EsQztBQUFBLDZCQUFBLENBQUE7O3lCQUNBLEM7QUFBQSxzQkFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEVBQUE7QUFKQSxtQixVQUtTLEMsRUFBQSxPQUFBLEtBQUE7O0FBVlQ7O0FBYUEscUJBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUE7YUFyQkE7V0FSQTtTakNzRUEsRWlDekNBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUN4Q0EsY0FBQSxDQUFBLEdBQVUsQ0FBQSxDQUFRLEVBQVIsQ0FBVjs7QUFDQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsS0FBQSxDQUFBLE9BQUEsSUFBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFBQSxPQUFBO1dBREE7U2xDZ0ZBLEVrQy9FQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDSEEsY0FBQSxDQUFBLEdBQVksQ0FBQSxDQUFRLEVBQVIsQ0FBQSxDQUFtQixLQUFuQixDQUFaO0FBQUEsY0FDQSxDQUFBLEdBQVUsQ0FBQSxDQUFRLEVBQVIsQ0FEVjtBQUFBLGNBRUEsQ0FBQSxHQUFhLENBQUEsQ0FBUSxDQUFSLENBQUEsQ0FBbUIsTUFGaEM7QUFBQSxjQUdBLENBQUEsR0FBQSxPQUFBLENBQUEsSUFBQSxVQUhBO0FBS0EsV0FBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FDQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsWUFBQSxFQUFBLENBREEsQ0FBQTtXQURBLEVBS0EsS0FMQSxHQUtBLENBTEE7U25DNkVBLEVtQ3hFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQUE7O0FDVEEsY0FBQSxDQUFBLEdBQWMsQ0FBQSxDQUFRLENBQVIsQ0FBZDtBQUFBLGNBQ0EsQ0FBQSxHQUFlLENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBQSxLQUFBLENBRGY7QUFBQSxjQUVBLENBQUEsR0FBQSxHQUFBLE9BRkE7QUFBQSxjQUdBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBSEE7QUFLQSxVQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQW1ELENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBMEIsQ0FBMUIsQ0FBbkQsQ0FBQSxFQUE2RSxPQUE3RSxFQUE2RTtBQUU3RSxZQUFBLE9BQUEsRUFBQSxpQkFBQSxFQUFBLEVBQUE7QUFDQSxxQkFBQSxDQUFBLEdBRUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsU0FBQSxLQUFBLENBRkEsR0FHQSxDQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLENBSEE7O0FBSDZFLFdBQTdFLENBQUE7U3BDNEVBLEVvQ3RFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDWkEsY0FBQSxDQUFBLEdBQWMsQ0FBQSxDQUFRLENBQVIsQ0FBZDtBQUVBLFVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsUUFBQSxFQUFBO0FBQThCLFlBQUEsTUFBQSxFQUFTLENBQUEsQ0FBUSxFQUFSO0FBQXZDLFdBQUEsQ0FBQTtTckNnRkEsRXFDaEYrQyxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQUE7O0FBQUEsVUFBQSxDQUFBLENBQUEsVUFBQSxHQUFBLElBQUEsRUFBQSxDQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBOztBQ0YvQyxjQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsY0FDQSxDQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBO0FBQUEsbUJBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxVQUFBLEdBQUEsRUFBQSxHQUFBO0FBQUEseUJBQUE7QUFBQSxhQUFBO1dBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBREE7O0FBR0EsbUJBQUEsQ0FBQSxDQUFpQyxFQUFqQyxFQUFpQztBQUMvQixnQkFBQSxDQUFLLEVBQUEsQ0FBUSxPQUFiLEVBQXdCLE1BQU0sSUFBSSxLQUFKLENBQVUsd0JBQVYsQ0FBTjtBQUN4QixnQkFBQSxDQUFLLEVBQUEsQ0FBUSxFQUFiLEVBQW1CLE1BQU0sSUFBSSxLQUFKLENBQVUsbUJBQVYsQ0FBTjtBQUNuQixnQkFBQSxDQUFLLEVBQUEsQ0FBUSxNQUFiLEVBQXVCLE1BQU0sSUFBSSxLQUFKLENBQVUsdUJBQVYsQ0FBTjtBQUNuQixZQUFBLEtBQUEsQ0FBTSxPQUFOLENBQWMsRUFBQSxDQUFRLE1BQXRCLE1BQ0YsRUFBQSxDQUFRLE1BQVIsR0FBaUIsQ0FBQSxDQUFtQixFQUFBLENBQVEsTUFBM0IsQ0FEZixHQUdKLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFPLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxFQUFDLENBQUEsQ0FBQSxTQUFBLENBQUQsRUFBa0IsRUFBbEIsQ0FBUCxFQUFzQyxFQUFBLENBQVEsT0FBOUMsQ0FISTs7O0FBTU4sY0FBTSxDQUFBLEdBQXFCLFNBQUEsRUFBQSxDQUFDLEVBQUQsRUFBQztBQUFELG1CQUFZLFVBQUMsRUFBRCxFQUFRLEVBQVIsRUFBUTtBQUN4QyxjQUFBLEVBQUEsR0FJSCxFQUFBLENBRGMsRUFBQSxDQUFPLE1BQVAsQ0FBYyxVQUFBLEVBQUEsRUFBQTtBQUFDLHVCQUFJLEVBQUEsQ0FBRSxXQUFGLEdBQWdCLE9BQWhCLENBQXdCLEVBQUEsQ0FBTSxXQUFOLEVBQXhCLE1BQUosQ0FBQSxDQUFBO2VBQWYsQ0FDZCxDQUpHLEdBQ0gsRUFBQSxDQUFZLEVBQVosQ0FERzthQURvQjtXQUEzQjs7QUFTQSxVQUFBLENBQUEsQ0FBdUIsb0JBQXZCLEdBQThDLFVBQUMsRUFBRCxFQUFDO0FBQzdDLGdCQUFBLENBQUssRUFBQSxDQUFxQixhQUExQixFQUEyQyxNQUFNLElBQUksS0FBSixDQUFVLDhCQUFWLENBQU47O0FBRzNDLGdCQUFBLENBQUssRUFBQSxDQUFxQixNQUExQixFQUFrQztBQUNoQyxrQkFBSSxFQUFBLEdBQW1CLEdBQUcsTUFBSCxDQUFVLElBQVYsQ0FBZSxFQUFBLENBQXFCLGFBQXJCLENBQW1DLE9BQWxELEVBQTJELFVBQUEsRUFBQSxFQUFBO0FBQU0sdUJBQUssRUFBQSxDQUFPLEtBQVAsSUFBZ0IsRUFBQSxDQUFxQixtQkFBMUM7ZUFBakUsQ0FBdkI7QUFDQSxjQUFBLEVBQUEsQ0FBcUIsTUFBckIsR0FBOEIsRUFBQSxDQUFpQixHQUFqQixDQUFxQixVQUFBLEVBQUEsRUFBQTtBQUFNLHVCQUFJLEVBQUEsQ0FBTyxXQUFQLElBQXNCLEVBQUEsQ0FBTyxTQUFqQztlQUEzQixDQUE5Qjs7O0FBT0YsZ0JBTEEsRUFBQSxDQUFxQixTQUFyQixHQUFpQyxFQUFBLENBQXFCLFNBQXJCLElBQW1DLFVBQUEsRUFBQSxFQUFBO0FBQ2xFLGtCQUFNLEVBQUEsR0FBa0IsR0FBRyxNQUFILENBQVUsSUFBVixDQUFlLEVBQUEsQ0FBcUIsYUFBckIsQ0FBbUMsT0FBbEQsRUFBMkQsVUFBQSxFQUFBLEVBQUE7QUFBTSx1QkFBSyxDQUFBLEVBQUEsQ0FBTyxXQUFQLElBQXNCLEVBQUEsQ0FBTyxTQUE3QixNQUE0QyxFQUFqRDtlQUFqRSxFQUF5SCxDQUF6SCxDQUF4QjtBQUNJLGNBQUEsRUFBQSxLQUFtQixFQUFBLENBQWdCLFFBQWhCLEdBQWdCLElBQW5DLENBQUE7YUFGTixFQUtJLEVBQUEsQ0FBcUIsYUFBckIsQ0FBbUMsS0FBbkMsSUFBNEMsRUFBQSxDQUFxQixZQUFyQixLQUFzQyxLQUFBLENBQXRGLEVBQWlHO0FBQy9GLGtCQUFNLEVBQUEsR0FBUyxFQUFBLENBQXFCLGFBQXJCLENBQW1DLE9BQW5DLENBQTJDLEVBQUEsQ0FBcUIsYUFBckIsQ0FBbUMsT0FBbkMsQ0FBMkMsYUFBdEYsQ0FBZjtBQUNBLGNBQUEsRUFBQSxDQUFxQixZQUFyQixHQUFvQyxFQUFBLENBQU8sV0FBUCxJQUFzQixFQUFBLENBQU8sU0FBakU7OztBQUdFLFlBQUEsRUFBQSxDQUFxQixJQUFyQixLQUE4QixLQUFBLENBQTlCLEtBQXlDLEVBQUEsQ0FBcUIsSUFBckIsR0FBNEIsRUFBckUsR0FDQSxFQUFBLENBQXFCLEVBQXJCLEtBQTRCLEtBQUEsQ0FBNUIsS0FDRSxFQUFBLENBQXFCLGFBQXJCLENBQW1DLEVBQW5DLEtBQTBDLEtBQUEsQ0FBMUMsR0FDRixFQUFBLENBQXFCLEVBQXJCLEdBQTBCLEVBRHhCLEdBR0YsRUFBQSxDQUFxQixFQUFyQixHQUEwQixFQUFBLENBQXFCLGFBQXJCLENBQW1DLEVBSjdELENBREEsRUFRQSxFQUFBLENBQXFCLFVBQXJCLEtBQW9DLEtBQUEsQ0FBcEMsS0FBK0MsRUFBQSxDQUFxQixVQUFyQixHQUFxQixJQUFwRSxDQVJBO0FBVUosZ0JBQU0sRUFBQSxHQUFVLFFBQUEsQ0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBRUEsWUFBQSxFQUFBLENBQXFCLGFBQXJCLENBQW1DLFVBQW5DLENBQThDLFlBQTlDLENBQTJELEVBQTNELEVBQW9FLEVBQUEsQ0FBcUIsYUFBekYsR0FFQSxDQUFBLENBQXNCLE1BQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxFQUNqQixFQURpQixFQUFBO0FBRXBCLGNBQUEsT0FBQSxFQUFTO0FBRlcsYUFBQSxDQUF0QixDQUZBLEVBT0EsRUFBQSxDQUFxQixhQUFyQixDQUFtQyxLQUFuQyxDQUF5QyxPQUF6QyxHQUFtRCxNQVBuRCxFQVFBLEVBQUEsQ0FBcUIsYUFBckIsQ0FBbUMsRUFBbkMsR0FBd0MsRUFBQSxDQUFxQixhQUFyQixDQUFtQyxFQUFuQyxHQUF3QyxTQVJoRjtXQTlCRjs7QUFzQ2tGLGNBQUEsQ0FBQSxHQUduRSxDQUhtRTtBQUduRSxVQUFBLENBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBO1N0Q21CZixFc0NuQmUsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQy9EZixVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsQ0FBa0IsQ0FBQSxDQUFRLENBQVIsQ0FBbEIsSUFBMEIsQ0FBc0IsQ0FBQSxDQUFRLENBQVIsQ0FBQSxDQUFrQixZQUFBO0FBQ2xFLG1CQUF1RyxNQUFBLENBQXZHLGNBQXVHLENBQXhFLENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBdUIsS0FBdkIsQ0FBd0UsRUFBakQsR0FBaUQsRUFBakQ7QUFBZ0IsY0FBQSxHQUFBLEVBQUEsZUFBQTtBQUFtQix1QkFBQSxDQUFBOztBQUFuQyxhQUFpRCxFQUFBLENBQUEsSUFBQSxDQUF2RztXQURnRCxDQUFoRDtTdkNrRkEsRXVDakZ1RyxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDQXZHLGNBQUEsQ0FBQSxHQUFlLENBQUEsQ0FBUSxDQUFSLENBQWY7O0FBR0EsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLGdCQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLE9BQUEsRUFBQTtBQUNBLGdCQUFBLEVBQUEsRUFBQSxDQUFBO0FBQ0EsZ0JBQUEsRUFBQSxJQUFBLFFBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxRQUFBLEtBQUEsVUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFBO0FBQ0EsZ0JBQUEsUUFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLE9BQUEsS0FBQSxVQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxPQUFBLENBQUE7QUFDQSxnQkFBQSxDQUFBLEVBQUEsSUFBQSxRQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsUUFBQSxLQUFBLFVBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLE9BQUEsQ0FBQTtBQUNBLGtCQUFBLFNBQUEsQ0FBQSx5Q0FBQSxDQUFBO1dBTkE7U3hDOEVBLEV3Q3hFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUNWQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUE7QUFDQSxjQUFBLFVBQUEsRUFBQSxFQUFBLElBQUEsRUFBQSxDQURBO0FBRUEsY0FBQSxZQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsQ0FGQTtBQUdBLGNBQUEsUUFBQSxFQUFBLEVBQUEsSUFBQSxFQUFBLENBSEE7QUFJQSxjQUFBLEtBQUEsRUFBQTtBQUpBLGFBQUE7V0FEQTtTekNrRkEsRXlDN0VBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7QUFBQTs7QUNIQSxjQUFBLENBQUEsR0FBYyxDQUFBLENBQVEsRUFBUixDQUFkO0FBQUEsY0FDQSxDQUFBLEdBQVcsQ0FBQSxDQUFRLEVBQVIsQ0FEWDtBQUFBLGNBRUEsQ0FBQSxHQUFVLENBQUEsQ0FBUSxFQUFSLENBRlY7QUFBQSxjQUdBLENBQUEsR0FBZSxDQUFBLENBQVEsRUFBUixDQUhmO0FBQUEsY0FJQSxDQUFBLEdBQWMsQ0FBQSxDQUFRLEVBQVIsQ0FKZDtBQUFBLGNBS0EsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUxBO0FBUUEsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLENBQUEsQ0FBQSxJQUE2QixDQUFBLENBQVEsQ0FBUixDQUFBLENBQWtCLFlBQUE7QUFDL0MsZ0JBQUEsRUFBQSxHQUFBLEVBQUE7QUFBQSxnQkFDQSxFQUFBLEdBQUEsRUFEQTtBQUFBLGdCQUdBLEVBQUEsR0FBQSxNQUFBLEVBSEE7QUFBQSxnQkFJQSxDQUFBLEdBQUEsc0JBSkE7QUFPQSxtQkFGQSxFQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUNBLENBQUEsQ0FBQSxLQUFBLENBQUEsRUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEVBQUEsRUFBQTtBQUFvQyxjQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBO2FBQXBDLENBREEsRUFFbUIsQ0FBQSxDQUFuQixFQUFtQixFQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsS0FBQSxDQUFBLElBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUFzQyxFQUF0QyxDQUFBLEVBQXNDLElBQXRDLENBQXNDLEVBQXRDLEtBQXNDLENBQXpEO1dBUjZCLENBQTdCLEdBU0MsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBTUQsaUJBQUEsSUFMQSxFQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FLQSxFQUpBLENBQUEsR0FBQSxTQUFBLENBQUEsTUFJQSxFQUhBLEVBQUEsR0FBQSxDQUdBLEVBRkEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUVBLEVBREEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUNBLEVBQUEsRUFBQSxHQUFBLENBQUE7QUFNQSxtQkFBQSxJQURBLENBQ0EsRUFMQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLFNBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUtBLEVBSkEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBSUEsRUFIQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BR0EsRUFGQSxDQUFBLEdBQUEsQ0FFQSxFQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsZ0JBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUE7QUFOQTs7QUFPRyxtQkFBQSxFQUFBO1dBdEJILEdBdUJDLENBdkJEO1MxQ3dFQSxFMENqREMsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ2pDRCxjQUFBLENBQUEsR0FBVSxDQUFBLENBQVEsRUFBUixDQUFWO0FBQUEsY0FDQSxDQUFBLEdBQWdCLENBQUEsQ0FBUSxFQUFSLENBRGhCO0FBQUEsY0FFQSxDQUFBLEdBQW1CLENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBQSxLQUFBLENBRm5CO0FBQUEsY0FHQSxDQUFBLEdBQWUsQ0FBQSxDQUFRLEVBQVIsQ0FBQSxDQUF1QixVQUF2QixDQUhmOztBQUtBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxnQkFHQSxFQUhBO0FBQUEsZ0JBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7QUFBQSxnQkFDQSxDQUFBLEdBQUEsQ0FEQTtBQUFBLGdCQUVBLENBQUEsR0FBQSxFQUZBOztBQUlBLGlCQUFBLEVBQUEsSUFBQSxDQUFBO0FBQUEsY0FBQSxFQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUE7QUFBQTs7QUFFQSxtQkFBQSxFQUFBLENBQUEsTUFBQSxHQUFBLENBQUE7QUFBQSxjQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FDQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FEQSxJQUNBLENBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQURBO0FBQUE7O0FBR0EsbUJBQUEsQ0FBQTtXQVZBO1MzQzZFQSxFMkNuRUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ2ZBLGNBQUEsQ0FBQSxHQUFnQixDQUFBLENBQVEsRUFBUixDQUFoQjtBQUFBLGNBQ0EsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQURBO0FBQUEsY0FFQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBRkE7O0FBR0EsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUVBLG1CQURBLENBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsSUFDQSxDQURBLEdBQ0EsQ0FBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEVBQUEsQ0FBQSxDQURBLEdBQ0EsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLENBQUE7V0FGQTtTNUMrRUEsRTRDN0VBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0xBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxLQUFBO1M3Q2tGQSxFNkNsRkEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxxQkFBQTtTN0NrRkEsRTZDbEZBLFVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxHQ0FjLG9CREFkO1M3Q2tGQSxFOENsRmMsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ0NkLGNBQUEsQ0FBQSxHQUF5QixDQUFBLENBQVEsRUFBUixDQUF6Qjs7QUFFQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsbUJBQUEsS0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQSxDQUFBO1dBREE7Uy9DK0VBLEUrQzlFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDSkEsY0FBQSxDQUFBLEdBQWUsQ0FBQSxDQUFRLENBQVIsQ0FBZjtBQUFBLGNBQ0EsQ0FBQSxHQUFjLENBQUEsQ0FBUSxFQUFSLENBRGQ7QUFBQSxjQUVBLENBQUEsR0FBYyxDQUFBLENBQVEsRUFBUixDQUFBLENBQWdCLFNBQWhCLENBRmQ7O0FBSUEsVUFBQSxDQUFBLENBQUEsT0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBO0FBQ0EsZ0JBQUEsRUFBQTtBQVNHLG1CQVJILENBQUEsQ0FBQSxFQUFBLENBQUEsS0FDQSxRQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsV0FBQSxLQUVBLFVBRkEsSUFFQSxFQUFBLEtBQUEsS0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBRkEsS0FFQSxFQUFBLEdBQUEsS0FBQSxDQUZBLEdBR0EsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUVBLENBQUEsRUFBQSxHQURBLEVBQUEsQ0FBQSxDQUFBLENBQ0EsTUFBQSxJQUZBLEtBRUEsRUFBQSxHQUFBLEtBQUEsQ0FGQSxDQUpBLEdBUUcsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsR0FBQSxFQUFBO1dBVkg7U2hEOEVBLEVnRHBFRyxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQUE7O0FDYkgsY0FBQSxDQUFBLEdBQWMsQ0FBQSxDQUFRLENBQVIsQ0FBZDtBQUFBLGNBQ0EsQ0FBQSxHQUFjLENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBMEIsQ0FBMUIsQ0FEZDtBQUdBLFVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFpQyxDQUFBLENBQVEsRUFBUixDQUFBLENBQTBCLEdBQUEsTUFBMUIsRUFBMEIsSUFBMUIsQ0FBakMsRUFBMkQsT0FBM0QsRUFBMkQ7QUFFM0QsWUFBQSxNQUFBLEVBQUEsZ0JBQUEsRUFBQSxFQUFBO0FBQ0EscUJBQUEsQ0FBQSxDQUFBLElBQUEsRUFBQSxFQUFBLEVBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBOztBQUgyRCxXQUEzRCxDQUFBO1NqRDhFQSxFaUQzRUEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ05BLGNBQUEsQ0FBQSxHQUFjLENBQUEsQ0FBUSxDQUFSLENBQWQ7QUFFQSxVQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLE9BQUEsRUFBQTtBQUE2QixZQUFBLE9BQUEsRUFBVSxDQUFBLENBQVEsRUFBUjtBQUF2QyxXQUFBLENBQUE7U2xEK0VBLEVrRC9FK0MsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQUFBOztBQUFBLFVBQUEsQ0FBQSxDQUFBLFVBQUEsR0FBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLENBQUE7QUNIL0MsY0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtBQUFBLGNBQ0EsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBREE7QUFBQSxjQUVBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUZBOztBQUVBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUE7QUFBQSxtQkFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLFVBQUEsR0FBQSxFQUFBLEdBQUE7QUFBQSx5QkFBQTtBQUFBLGFBQUE7OztBQUFBLG1CQUFBLENBQUEsR0FBQTtBQUFBLG1CQUFBLENBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBLElBQUEsVUFBQSxFQUFBLEVBQUE7QUFBQSxtQkFBQSxJQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUEsRUFBQSxHQUFBLFNBQUEsQ0FBQSxNQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBLEdBQUEsU0FBQSxDQUFBLEVBQUEsQ0FBQTs7QUFBQSxxQkFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO0FBQUEsa0JBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUE7QUFBQTs7O0FBQUEscUJBQUEsRUFBQTthQUFBLEVBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxTQUFBLENBQUE7OztBQUFBLG1CQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUE7QUFBQSxnQkFBQSxFQUFBLEtBQUEsS0FBQSxDQUFBLEVBQUEsTUFBQSxJQUFBLGNBQUEsQ0FBQSwyREFBQSxDQUFBO0FBQUEsbUJBQUEsRUFBQTs7O0FBRUEsY0FHTSxDQUFBLEdBQVc7QUFDZixnQkFBSSxPQURXO0FBRWYsZ0JBQUksUUFGVztBQUdmLGdCQUFJLE9BSFc7QUFJZixnQkFBSSxJQUpXO0FBS2YsZ0JBQUk7QUFMVyxXQUhqQjs7QUFXQSxtQkFBQSxDQUFBLEdBQVM7QUFDUCxtQkFBNEIsT0FBZCxTQUFjLElBQUEsV0FBQSxJQUFkLEVBQUEsQ0FBZ0MsU0FBQSxDQUFVLFNBQVYsQ0FBb0IsS0FBcEIsQ0FBMEIscUJBQTFCLENBQWhDLElBQTBELENBQTBCLFNBQUEsQ0FBVSxTQUFWLENBQW9CLEtBQXBCLENBQTBCLGNBQTFCLENBQXBGLENBQWQ7OztBQUE0SCxjQW9CekcsQ0FBQSxHQUFBLFVBQUEsRUFBQSxFQUFBO0FBc0JuQixxQkFBQSxFQUFBLENBQWEsRUFBYixFQUFhO0FBQU8sa0JBQUEsRUFBQTtBQUFBLHFCQUNsQixDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBTSxFQUFOLEtBQUEsSUFBQSxFQUhGLGlCQUdFLEdBSGtCLEVBR2xCLEVBRUEsRUFBQSxDQUFLLEtBQUwsR0FBYTtBQUNYLGdCQUFBLE9BQUEsRUFBUyxJQURFO0FBRVgsZ0JBQUEsT0FBQSxFQUFTLElBRkU7QUFHWCxnQkFBQSxRQUFBLEVBQUEsS0FIVztBQUlYLGdCQUFBLE9BQUEsRUFBUyxFQUFBLENBQU0sWUFBTixHQUFxQixDQUFDLEVBQUEsQ0FBTSxZQUFQLENBQXJCLEdBQTRDLEVBSjFDO0FBS1gsZ0JBQUEsS0FBQSxFQUFPLEVBQUEsQ0FBTSxZQUxGO0FBTVgsZ0JBQUEsZUFBQSxFQUFBLEtBTlc7QUFPWCxnQkFBQSxRQUFBLEVBQVUsSUFQQztBQVFYLGdCQUFBLFFBQUEsRUFBQTtBQVJXLGVBRmIsRUFhQSxFQUFBLENBQUssbUJBQUwsR0FBMkIsRUFBQSxDQUFLLG1CQUFMLENBQXlCLElBQXpCLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQWIzQixFQWNBLEVBQUEsQ0FBSyxhQUFMLEdBQXFCLEVBQUEsQ0FBSyxhQUFMLENBQW1CLElBQW5CLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQWRyQixFQWVBLEVBQUEsQ0FBSyxhQUFMLEdBQXFCLEVBQUEsQ0FBSyxhQUFMLENBQW1CLElBQW5CLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQWZyQixFQWdCQSxFQUFBLENBQUssZUFBTCxHQUF1QixFQUFBLENBQUssZUFBTCxDQUFxQixJQUFyQixDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FoQnZCLEVBaUJBLEVBQUEsQ0FBSyxXQUFMLEdBQW1CLEVBQUEsQ0FBSyxXQUFMLENBQWlCLElBQWpCLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQWpCbkIsRUFrQkEsRUFBQSxDQUFLLGtCQUFMLEdBQTBCLEVBQUEsQ0FBSyxrQkFBTCxDQUF3QixJQUF4QixDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FsQjFCLEVBb0JBLEVBQUEsQ0FBSyxvQkFBTCxHQUE0QixFQUFBLENBQUssb0JBQUwsQ0FBMEIsSUFBMUIsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBcEI1QixFQXNCQSxFQUFBLENBQUssZ0JBQUwsR0FBd0IsRUFBQSxDQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQXRCeEIsRUF1QkEsRUFBQSxDQUFLLGlCQUFMLEdBQXlCLEVBQUEsQ0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0F2QnpCLEVBd0JBLEVBQUEsQ0FBSyxpQkFBTCxHQUF5QixFQUFBLENBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBeEJ6QixFQXlCQSxFQUFBLENBQUsscUJBQUwsR0FBNkIsRUFBQSxDQUFLLHFCQUFMLENBQTJCLElBQTNCLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQXpCN0IsRUEwQkEsRUFBQSxDQUFLLHNCQUFMLEdBQThCLEVBQUEsQ0FBSyxzQkFBTCxDQUE0QixJQUE1QixDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0ExQjlCLEVBNEJBLEVBQUEsQ0FBSyxlQUFMLEdBQXVCLEVBQUEsQ0FBSyxlQUFMLENBQXFCLElBQXJCLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQTVCdkIsRUE2QkEsRUFBQSxDQUFLLGlCQUFMLEdBQXlCLEVBQUEsQ0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0E3QnpCLEVBOEJBLEVBQUEsQ0FBSyxnQkFBTCxHQUF3QixFQUFBLENBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLENBOUJ4QixFQWdDQSxFQUFBLENBQUssZ0JBQUwsR0FBd0IsRUFBQSxDQUFLLGdCQUFMLENBQXNCLElBQXRCLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQWhDeEIsRUFpQ0EsRUFBQSxDQUFLLHFCQUFMLEdBQTZCLEVBQUEsQ0FBSyxxQkFBTCxDQUEyQixJQUEzQixDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FqQzdCLEVBRGtCLEVBQUE7OztBQUFBLGFBQUEsU0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUFBLGNBQUEsRUFBQSxDQUFBLFNBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsV0FBQSxHQUFBLEVBQUEsRUFBQSxTQUFBLEdBQUEsRUFBQTthQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7O0FBQUEsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxTQUFBO0FBQUEsbUJBQUEsRUFBQSxDQXFDcEIsZUFyQ29CLEdBcUNwQixVQUFpQixFQUFqQixFQUF3QixFQUF4QixFQUF3QjtBQUFTLGtCQUFBLEVBQUEsR0FBQSxJQUFBO0FBQy9CLHFCQUFPLEVBQUEsQ0FBUSxHQUFSLENBQVksVUFBQSxFQUFBLEVBQUE7QUFBSyx1QkFBSSxFQUFBLENBQUssa0JBQUwsQ0FBd0IsRUFBeEIsRUFBK0IsV0FBL0IsRUFBSjtlQUFqQixFQUFtRSxPQUFuRSxDQUEyRSxFQUFBLENBQU0sV0FBTixFQUEzRSxNQUFQLENBQUEsQ0FBQTthQXRDa0IsRUFzQ3NFLEVBQUEsQ0FHMUYsaUJBSDBGLEdBRzFGLFlBQUE7QUFDRSxtQkFBSyxnQkFBTDthQTFDa0IsRUEwQ2IsRUFBQSxDQUdQLG9CQUhPLEdBR1AsWUFBQTtBQUNFLGNBQUEsWUFBQSxDQUFhLEtBQUssVUFBbEIsQ0FBQTthQTlDa0IsRUE4Q0EsRUFBQSxDQU9wQixnQkFQb0IsR0FPcEIsWUFBQTtBQUFvQixrQkFBQSxFQUFBLEdBQUEsSUFBQTtBQUNsQixtQkFBSyxxQkFBTCxJQUNBLEtBQUssVUFBTCxHQUFrQixVQUFBLENBQVcsWUFBQTtBQUMzQixnQkFBQSxFQUFBLENBQUssZ0JBQUw7ZUFEZ0IsRUFFZixHQUZlLENBRGxCO2FBdERrQixFQXlEZixFQUFBLENBR0wscUJBSEssR0FHTCxZQUFBO0FBQ0Usa0JBQU0sRUFBQSxHQUFpQixLQUFLLGlCQUFMLENBQUssQ0FBQSxDQUFMLENBQXZCO0FBQ3dCLGNBQUEsRUFBQSxJQUFrQixFQUFBLENBQWUsS0FBZixLQUF5QixLQUFLLEtBQUwsQ0FBVyxLQUF0RCxJQUd0QixLQUFLLGlCQUFMLENBQXVCO0FBQUUsZ0JBQUEsTUFBQSxFQUFRO0FBQUUsa0JBQUEsS0FBQSxFQUFPLEVBQUEsQ0FBZTtBQUF4QjtBQUFWLGVBQXZCLENBSHNCO2FBOUROLEVBaUV5QyxFQUFBLENBSTdELGtCQUo2RCxHQUk3RCxVQUFvQixFQUFwQixFQUErQixFQUEvQixFQUErQjtBQUFXLGtCQUNoQyxFQUFBLEdBQVksS0FBSyxLQUFMLENBQVosT0FEZ0M7QUFBQSxrQkFFbEMsRUFBQSxHQUFpQyxFQUFBLEtBQUEsSUFGQztBQUFBLGtCQUdsQyxFQUFBLEdBQWlCLEVBQUEsQ0FBVSxPQUFWLEtBQXNCLEVBSEw7QUFJVixjQUFBLEVBQUEsSUFBQSxDQUFtQixFQUFuQixJQUU1QixLQUFLLGlCQUFMLENBQXVCLEVBQXZCLEVBQWdDLEtBQWhDLEVBRjRCO0FBSTlCLGtCQUFNLEVBQUEsR0FBZSxFQUFBLEtBQWYsQ0FBQSxDQUFOO0FBQUEsa0JBQ00sRUFBQSxHQUF1QixFQUFBLElBQXdDLEVBQUEsQ0FBWixPQUFZLEtBQUEsSUFEckU7O0FBR0Esa0JBRHNCLEVBQUEsSUFBZ0IsRUFDdEMsRUFBbUI7QUFDakIsb0JBQU0sRUFBQSxHQUFlLEtBQUssaUJBQUwsQ0FBdUIsRUFBdkIsQ0FBckI7QUFDQSxnQkFBQSxFQUFBLENBQWEsaUJBQWIsQ0FBK0IsQ0FBL0IsRUFBa0MsRUFBQSxDQUFhLEtBQWIsQ0FBbUIsTUFBckQ7O2FBbEZnQixFQWtGcUMsRUFBQSxDQUl6RCxhQUp5RCxHQUl6RCxZQUFBO0FBQ0UscUJBQUEsQ0FBTyxDQUFBLEVBQVAsSUFBK0IsS0FBSyxLQUFMLENBQVcsVUFBMUM7YUF2RmtCLEVBdUZ3QixFQUFBLENBSTVDLGtCQUo0QyxHQUk1QyxVQUFvQixFQUFwQixFQUFvQjtBQUNsQixrQkFBTSxFQUFBLEdBQXFCLEtBQUssS0FBTCxDQUFXLFNBQVgsSUFBd0IsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixVQUF4RTtBQUNBLHFCQUFPLEVBQUEsR0FBcUIsRUFBQSxDQUFtQixFQUFuQixDQUFyQixHQUFpRCxFQUF4RDthQTdGa0IsRUE2RnNDLEVBQUEsQ0FJMUQsa0JBSjBELEdBSTFELFVBQW9CLEVBQXBCLEVBQW9CO0FBQ2xCLGtCQUFNLEVBQUEsR0FBcUIsS0FBSyxLQUFMLENBQVcsU0FBWCxJQUF3QixLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLFVBQXhFO0FBQ0EscUJBQU8sRUFBQSxHQUFxQixFQUFBLENBQW1CLEVBQW5CLENBQXJCLEdBQWlELEVBQXhEO2FBbkdrQixFQW1Hc0MsRUFBQSxDQUcxRCxtQkFIMEQsR0FHMUQsVUFBcUIsRUFBckIsRUFBcUI7QUFBVSxrQkFFekIsRUFGeUI7QUFBQSxrQkFBQSxFQUFBLEdBQ1EsS0FBSyxLQURiO0FBQUEsa0JBQ3JCLEVBQUEsR0FEcUIsRUFBQSxDQUNyQixPQURxQjtBQUFBLGtCQUNaLEVBQUEsR0FEWSxFQUFBLENBQ1osS0FEWTtBQUFBLGtCQUNMLEVBQUEsR0FESyxFQUFBLENBQ0wsUUFESztBQUd6QixtQkFBSyxLQUFMLENBQVcsYUFBWCxJQUNGLEVBQUEsR0FBVyxFQUFBLENBQVMsS0FBVCxJQUFrQixFQUE3QixFQUNBLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsRUFBQSxDQUFRLEVBQVIsQ0FBckIsQ0FGRSxJQUlGLEVBQUEsR0FBVyxFQUpULEVBTUosS0FBSyxRQUFMLENBQWM7QUFDWixnQkFBQSxPQUFBLEVBQVMsSUFERztBQUVaLGdCQUFBLFFBQUEsRUFBVSxFQUFBLENBQVMsUUFBVCxJQUFTLEtBRlA7QUFHWixnQkFBQSxLQUFBLEVBQU8sRUFISztBQUlaLGdCQUFBLFFBQUEsRUFBVSxJQUpFO0FBS1osZ0JBQUEsZUFBQSxFQUFpQixLQUFLLGVBQUwsQ0FBcUIsRUFBckIsRUFBK0IsRUFBL0I7QUFMTCxlQUFkLENBTkk7YUF6R2MsRUFvSGdDLEVBQUEsQ0FJcEQsb0JBSm9ELEdBSXBELFVBQXNCLEVBQXRCLEVBQXNCO0FBQ3BCLG1CQUFLLFFBQUwsQ0FBYztBQUNaLGdCQUFBLE9BQUEsRUFBUztBQURHLGVBQWQ7YUF6SGtCLEVBMEhQLEVBQUEsQ0FJYixnQkFKYSxHQUliLFVBQWtCLEVBQWxCLEVBQXlCLEVBQXpCLEVBQXlCO0FBQU8sa0JBQUEsRUFBQSxHQUNtQixLQUFLLEtBRHhCO0FBQUEsa0JBQ3RCLEVBQUEsR0FEc0IsRUFBQSxDQUN0QixPQURzQjtBQUFBLGtCQUNiLEVBQUEsR0FEYSxFQUFBLENBQ2IsUUFEYTtBQUFBLGtCQUNILEVBQUEsR0FERyxFQUFBLENBQ0gsT0FERztBQUFBLGtCQUNNLEVBQUEsR0FETixFQUFBLENBQ00sUUFETjtBQUFBLGtCQUV4QixFQUFBLEdBQW1ELEVBQUEsQ0FBbEIsYUFBa0IsS0FBQSxJQUYzQjtBQUFBLGtCQUd4QixDQUFBLEdBQWdCLEVBQUEsQ0FBTSxhQUFOLEtBQXdCLEtBQUssaUJBQUwsQ0FBSyxDQUFBLENBQUwsQ0FIaEI7QUFBQSxrQkFJeEIsQ0FBQSxHQUF3QixFQUFBLEtBQVksRUFBWixJQUFxQixFQUFBLEtBQVQsQ0FBQSxDQUpaOztBQU05QixrQkFBQSxDQUR3QixDQUN4QixJQURpRCxFQUNqRCxJQURpRCxFQUErQixDQUFBLElBQXlCLENBQXhELENBQ2pELEVBQW1CO0FBQ2pCLG9CQUFNLENBQUEsR0FBZSxFQUFBLElBQVksQ0FBQSxFQUFqQztBQUNBLHFCQUFLLG1CQUFMLENBQXlCO0FBQ3ZCLGtCQUFBLFFBQUEsRUFBVSxDQURhO0FBRXZCLGtCQUFBLEtBQUEsRUFBTyxLQUFLLGtCQUFMLENBQXdCLEVBQUEsQ0FBUSxFQUFSLENBQXhCO0FBRmdCLGlCQUF6Qjs7YUF0SWdCLEVBd0l5QixFQUFBLENBSzdDLGVBTDZDLEdBSzdDLFVBQWlCLEVBQWpCLEVBQWlCO0FBQU8sa0JBQUEsRUFBQSxHQUNrQyxLQUFLLEtBRHZDO0FBQUEsa0JBQ2QsRUFBQSxHQURjLEVBQUEsQ0FDZCxPQURjO0FBQUEsa0JBQ0wsRUFBQSxHQURLLEVBQUEsQ0FDTCxRQURLO0FBQUEsa0JBQ0ssRUFBQSxHQURMLEVBQUEsQ0FDSyxPQURMO0FBQUEsa0JBQ2MsRUFBQSxHQURkLEVBQUEsQ0FDYyxLQURkO0FBQUEsa0JBQ3FCLEVBQUEsR0FEckIsRUFBQSxDQUNxQixRQURyQjs7QUFHdEIsa0JBQUEsRUFEeUIsRUFBQSxLQUN6QixDQUFBLENBQUEsQ0FBQSxFQUF1QjtBQUNyQixvQkFBTSxFQUFBLEdBQWUsRUFBQSxJQUFZLENBQUEsRUFBakM7QUFBQSxvQkFDTSxDQUFBLEdBQVcsQ0FBQSxLQUFnQixFQUFoQixHQUF3QixLQUFLLGtCQUFMLENBQXdCLEVBQUEsQ0FBUSxFQUFSLENBQXhCLENBRHpDO0FBRUEscUJBQUssbUJBQUwsQ0FBeUI7QUFDdkIsa0JBQUEsUUFBQSxFQUFVLEVBRGE7QUFFdkIsa0JBQUEsS0FBQSxFQUFPO0FBRmdCLGlCQUF6Qjs7YUFuSmdCLEVBcUpQLEVBQUEsQ0FLYixpQkFMYSxHQUtiLFVBQW1CLEVBQW5CLEVBQW1CO0FBQU8sa0JBQUEsRUFBQSxHQUFBLElBQUE7QUFBQSxrQkFBQSxFQUFBLEdBQ3FCLEtBQUssS0FEMUI7QUFBQSxrQkFDaEIsRUFBQSxHQURnQixFQUFBLENBQ2hCLFNBRGdCO0FBQUEsa0JBQ0wsRUFBQSxHQURLLEVBQUEsQ0FDTCxNQURLO0FBQUEsa0JBQ0csRUFBQSxHQURILEVBQUEsQ0FDRyxhQURIO0FBQUEsa0JBRWxCLEVBQUEsR0FBYSxLQUFLLGFBQUwsRUFGSztBQUFBLGtCQUdsQixFQUFBLEdBQVEsRUFBQSxDQUFNLE1BQU4sQ0FBYSxLQUhIO0FBQUEsa0JBSWxCLENBQUEsR0FBOEIsRUFBQSxDQUFYLE1BQVcsS0FBQSxDQUpaO0FBQUEsa0JBS2xCLENBQUEsR0FBZSxLQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLEVBTGxCO0FBQUEsa0JBTWxCLENBQUEsR0FBa0IsRUFBQSxDQUFNLE1BQU4sSUFBZ0IsRUFOaEI7QUFReEIsbUJBQUssUUFBTCxDQUFjO0FBQ1osZ0JBQUEsS0FBQSxFQUFBLEVBRFk7QUFFWixnQkFBQSxRQUFBLEVBQVU7QUFGRSxlQUFkLEdBS3lCLENBQUEsRUFBQSxJQUFrQixDQUFBLElBQWdCLENBQWxDLEtBRXZCLEVBQUEsQ0FBTyxFQUFQLEVBQWMsVUFBQyxFQUFELEVBQUM7QUFDYixvQkFBTSxFQUFBLEdBQW9DLElBQWpCLEVBQUEsQ0FBUSxNQUFqQztBQUNBLGdCQUFBLEVBQUEsQ0FBSyxRQUFMLENBQWM7QUFDWixrQkFBQSxRQUFBLEVBQVUsRUFERTtBQUVaLGtCQUFBLE9BQUEsRUFBQSxFQUZZO0FBR1osa0JBQUEsUUFBQSxFQUFXLEVBQUEsSUFBYyxFQUFkLEdBQWtDLENBQWxDLEdBQWtDLENBQUEsQ0FIakM7QUFJWixrQkFBQSxlQUFBLEVBQUE7QUFKWSxpQkFBZDtlQUZGLENBUEYsRUFrQkssQ0FBQSxJQUNILEVBQUEsQ0FBTyxFQUFQLEVBQVcsVUFBQyxFQUFELEVBQUM7QUFDVixvQkFBTSxFQUFBLEdBQW9DLElBQWpCLEVBQUEsQ0FBUSxNQUFqQztBQUNBLGdCQUFBLEVBQUEsQ0FBSyxRQUFMLENBQWM7QUFDWixrQkFBQSxRQUFBLEVBQVUsRUFERTtBQUVaLGtCQUFBLE9BQUEsRUFBQSxFQUZZO0FBR1osa0JBQUEsUUFBQSxFQUFXLEVBQUEsSUFBYyxFQUFkLEdBQWtDLENBQWxDLEdBQWtDLENBQUEsQ0FIakM7QUFJWixrQkFBQSxlQUFBLEVBQUE7QUFKWSxpQkFBZDtlQUZGLENBbkJGO2FBbEtrQixFQTJMSyxFQUFBLENBTXpCLGdCQU55QixHQU16QixVQUFrQixFQUFsQixFQUFrQjtBQUNoQixtQkFBSyxpQkFBTCxDQUF1QixFQUF2QjthQWxNa0IsRUFrTUssRUFBQSxDQUd6QixnQkFIeUIsR0FHekIsVUFBa0IsRUFBbEIsRUFBa0I7QUFBTyxrQkFBQSxFQUFBLEdBQ3FCLEtBQUssS0FEMUI7QUFBQSxrQkFDZixFQUFBLEdBRGUsRUFBQSxDQUNmLEtBRGU7QUFBQSxrQkFDUixFQUFBLEdBRFEsRUFBQSxDQUNSLGVBRFE7QUFBQSxrQkFDUyxFQUFBLEdBRFQsRUFBQSxDQUNTLE9BRFQ7QUFBQSxrQkFFZixFQUFBLEdBQWMsS0FBSyxLQUFMLENBQWQsU0FGZTtBQUFBLGtCQUdqQixFQUFBLEdBQUEsQ0FBb0IsRUFBcEIsSUFBdUMsRUFBQSxDQUFNLE1BQU4sSUFBZ0IsRUFBdkQsSUFBcUYsSUFBakIsRUFBQSxDQUFRLE1BSDNEO0FBS25CLGNBQUEsRUFBQSxHQUNGLEtBQUssUUFBTCxDQUFjLFVBQUEsRUFBQSxFQUFBO0FBQUEsb0JBQUcsRUFBQSxHQUFILEVBQUEsQ0FBRyxRQUFIO0FBQUEsdUJBQW1CO0FBQUUsa0JBQUEsT0FBQSxFQUFBLENBQUEsQ0FBRjtBQUFlLGtCQUFBLFFBQUEsRUFBVSxFQUFBLElBQW9CLEVBQTdDO0FBQXVELGtCQUFBLFFBQUEsRUFBQSxDQUFBO0FBQXZELGlCQUFuQjtlQUFkLENBREUsR0FHRixLQUFLLFFBQUwsQ0FBYztBQUFFLGdCQUFBLE9BQUEsRUFBQSxDQUFBO0FBQUYsZUFBZCxDQUhFO2FBMU1jLEVBNk1VLEVBQUEsQ0FJOUIsaUJBSjhCLEdBSTlCLFVBQW1CLEVBQW5CLEVBQW1CO0FBQ2pCLG1CQUFLLFFBQUwsQ0FBYztBQUNaLGdCQUFBLE9BQUEsRUFBUyxFQURHO0FBRVosZ0JBQUEsT0FBQSxFQUFTLElBRkc7QUFHWixnQkFBQSxRQUFBLEVBQVU7QUFIRSxlQUFkO2FBbE5rQixFQXFOTixFQUFBLENBSWQsc0JBSmMsR0FJZCxVQUF3QixFQUF4QixFQUErQixFQUEvQixFQUErQjtBQUd4QixjQUFBLENBQUEsTUFDSCxLQUFLLFFBQUwsQ0FBYztBQUNaLGdCQUFBLE9BQUEsRUFBUztBQURHLGVBQWQsQ0FERzthQTVOYSxFQThOTCxFQUFBLENBS2YsaUJBTGUsR0FLZixVQUFtQixFQUFuQixFQUEwQixFQUExQixFQUEwQjtBQUN4QixrQkFBTSxFQUFBLEdBQWlCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsRUFBbkIsQ0FBdkI7QUFBQSxrQkFDTSxFQUFBLEdBQVcsS0FBSyxrQkFBTCxDQUF3QixFQUF4QixDQURqQjtBQUVBLG1CQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEVBQXJCLEdBQ0EsS0FBSyxRQUFMLENBQWM7QUFDWixnQkFBQSxPQUFBLEVBQUEsQ0FBQSxDQURZO0FBRVosZ0JBQUEsT0FBQSxFQUFTLElBRkc7QUFHWixnQkFBQSxRQUFBLEVBQUEsS0FIWTtBQUlaLGdCQUFBLEtBQUEsRUFBTyxFQUpLO0FBS1osZ0JBQUEsUUFBQSxFQUFBLENBQUEsQ0FMWTtBQU1aLGdCQUFBLGVBQUEsRUFBQTtBQU5ZLGVBQWQsQ0FEQSxFQVNBLEtBQUssV0FBTCxFQVRBO2FBdE9rQixFQStPYixFQUFBLENBR1AscUJBSE8sR0FHUCxVQUF1QixFQUF2QixFQUF1QjtBQU9yQixjQUFBLEVBQUEsQ0FBTSxjQUFOO2FBelBrQixFQXlQWixFQUFBLENBR1IsYUFIUSxHQUdSLFVBQWUsRUFBZixFQUFlO0FBQ2IsY0FBQSxFQUFBLENBQU0sY0FBTjtBQURvQixrQkFBQSxFQUFBLEdBRVcsS0FBSyxLQUZoQjtBQUFBLGtCQUVaLEVBQUEsR0FGWSxFQUFBLENBRVosUUFGWTtBQUFBLGtCQUVGLEVBQUEsR0FGRSxFQUFBLENBRUYsUUFGRTtBQUdELGNBQUEsRUFBQSxLQURELENBQUEsQ0FDQyxJQUNlLEVBRGYsSUFHakIsS0FBSyxpQkFBTCxDQUF1QixFQUFBLEdBQVcsQ0FBbEMsQ0FIaUI7YUEvUEQsRUFrUWtCLEVBQUEsQ0FJdEMsZUFKc0MsR0FJdEMsVUFBaUIsRUFBakIsRUFBaUI7QUFBTyxrQkFBQSxFQUFBLEdBQUEsSUFBQTtBQUd0QixrQkFGQSxFQUFBLENBQU0sY0FBTixJQUVJLEtBQUssS0FBTCxDQUFXLGFBQVgsSUFBNEIsS0FBSyxLQUFMLENBQVcsUUFBWCxLQUFqQixLQUFmLEVBQ0UsRUFBQSxDQUFNLGNBQU4sSUFDQSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEVBQWxCLEVBQXNCLFVBQUMsRUFBRCxFQUFDO0FBQ3JCLGdCQUFBLEVBQUEsQ0FBSyxRQUFMLENBQWM7QUFDWixrQkFBQSxRQUFBLEVBQUEsSUFEWTtBQUVaLGtCQUFBLE9BQUEsRUFBQSxFQUZZO0FBR1osa0JBQUEsUUFBQSxFQUFVLENBSEU7QUFJWixrQkFBQSxPQUFBLEVBQVMsQ0FKRztBQUtaLGtCQUFBLE9BQUEsRUFBUztBQUxHLGlCQUFkO2VBREYsQ0FEQSxDQURGLEssSUFXVyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEtBQUosSSxFQUFrQztBQUFBLG9CQUFBLEVBQUEsR0FDQyxLQUFLLEtBRE47QUFBQSxvQkFDL0IsRUFBQSxHQUQrQixFQUFBLENBQy9CLFFBRCtCO0FBQUEsb0JBQ3JCLEVBQUEsR0FEcUIsRUFBQSxDQUNyQixPQURxQjtBQUFBLG9CQUNaLEVBQUEsR0FEWSxFQUFBLENBQ1osUUFEWTtBQUVqQixnQkFBQSxFQUFBLEtBQWEsRUFBQSxDQUFRLE1BQVIsR0FBaUIsQ0FBOUIsSUFDaUIsRUFEakIsSUFHcEIsS0FBSyxpQkFBTCxDQUF1QixFQUFBLEdBQVcsQ0FBbEMsQ0FIb0I7O2FBdFJOLEVBeVJvQixFQUFBLENBS3hDLFdBTHdDLEdBS3hDLFVBQWEsRUFBYixFQUFhO0FBQU8sa0JBQUEsRUFBQSxHQUFBLElBQUE7QUFFZCxtQkFBSyxLQUFMLENBQVcsYUFBWCxJQUE0QixLQUFLLEtBQUwsQ0FBVyxRQUFYLEtBQWpCLEtBQVgsSUFBa0YsS0FBaEIsS0FBZ0IsQ0FBVixLQUFVLEtBQUEsRUFBbEYsS0FDRixFQUFBLENBQU0sY0FBTixJQUNBLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsRUFBbEIsRUFBc0IsVUFBQyxFQUFELEVBQUM7QUFDckIsZ0JBQUEsRUFBQSxDQUFLLFFBQUwsQ0FBYztBQUNaLGtCQUFBLFFBQUEsRUFBQSxJQURZO0FBRVosa0JBQUEsT0FBQSxFQUFBO0FBRlksaUJBQWQ7ZUFERixDQUZFLEdBU29CLEtBQUssS0FBTCxDQUFXLE9BQVgsS0FKbEIsQ0FBQSxDQUlrQixLQUV0QixFQUFBLENBQU0sY0FBTixJQUNBLEtBQUssaUJBQUwsQ0FBdUIsRUFBdkIsRUFBOEIsS0FBSyxLQUFMLENBQVcsT0FBekMsQ0FIc0IsQ0FUcEI7YUFoU2MsRUE0U3lCLEVBQUEsQ0FJN0MsV0FKNkMsR0FJN0MsVUFBYSxFQUFiLEVBQWE7QUFDUCxtQkFBSyxLQUFMLENBQVcsUUFBWCxLQUNGLEVBQUEsQ0FBTSxjQUFOLElBQ2lELEtBQXZCLEtBQUssS0FBTCxDQUFXLFFBQVksSUFFL0MsS0FBSyxpQkFBTCxDQUF1QixFQUF2QixFQUE4QixLQUFLLEtBQUwsQ0FBVyxRQUF6QyxDQUpBO2FBalRjLEVBcVQyQixFQUFBLENBSy9DLGtCQUwrQyxHQUsvQyxVQUFvQixFQUFwQixFQUFvQjtBQUNsQixrQkFBTSxFQUFBLEdBQWUsS0FBSyxpQkFBTCxDQUFLLENBQUEsQ0FBTCxDQUFyQjtBQUN1QixjQUFBLEVBQUEsQ0FBTSxNQUFOLEtBQWlCLEVBQWpCLElBS3JCLEVBQUEsQ0FBYSxLQUFiLEVBTHFCO2FBNVRMLEVBaVVILEVBQUEsQ0FJakIsYUFKaUIsR0FJakIsVUFBZSxFQUFmLEVBQWU7QUFDYixzQkFBUSxDQUFBLENBQVMsRUFBQSxDQUFNLE9BQWYsQ0FBUjtxQkFDTyxJO0FBQ0gsdUJBQUssYUFBTCxDQUFtQixFQUFuQjtBQUNBOztxQkFDRyxNO0FBQ0gsdUJBQUssZUFBTCxDQUFxQixFQUFyQjtBQUNBOztxQkFDRyxPO0FBQ0gsdUJBQUssV0FBTCxDQUFpQixFQUFqQjtBQUNBOztxQkFDRyxPO0FBQ0gsdUJBQUssV0FBTCxDQUFpQixFQUFqQjtBQUNBOztxQkFDRyxRO0FBQ0gsdUJBQUssbUJBQUwsQ0FBeUI7QUFDdkIsb0JBQUEsS0FBQSxFQUFPLEtBQUssS0FBTCxDQUFXO0FBREssbUJBQXpCO0FBR0E7OztBQTlYUixtQkFBQSxTQUFBLEVBQUEsQ0FBNkIsRUFBN0IsRUFBNkI7QUFDM0IsMkJBQ2EsS0FBVixFQUFVLElBQU0sRUFBQSxHQUFVLEVBQWhCLElBQ0MsRUFBQSxLQUFBLEVBREQsSUFDbUIsRUFBQSxLQUFBLENBRG5CLElBRUEsS0FBVixFQUFVLElBQU0sRUFBQSxHQUFVLEVBRmhCLElBR0EsS0FBVixFQUFVLElBQU0sRUFBQSxHQUFVLEdBSGhCLElBSUEsTUFBVixFQUFVLElBQU8sRUFBQSxHQUFVLEdBSmpCLElBS0EsTUFBVixFQUFVLElBQU8sRUFBQSxHQUFVLEdBTjlCO21CQURGLEVBZ1krQixFQUFBLENBQU0sT0FoWXJDLEtBaVlVLEtBQUssa0JBQUwsQ0FBd0IsRUFBeEIsQ0FqWVY7QUE2V0k7YUF0VWtCLEVBMFZZLEVBQUEsQ0FNaEMsTUFOZ0MsR0FNaEMsWUFBQTtBQUFVLGtCQTBESixFQTFESTtBQUFBLGtCQUFBLEVBQUEsR0FBQSxJQUFBO0FBQUEsa0JBQUEsRUFBQSxHQWtCSixLQUFLLEtBbEJEO0FBQUEsa0JBRU4sRUFBQSxHQUZNLEVBQUEsQ0FFTixZQUZNO0FBQUEsa0JBR04sRUFBQSxHQUhNLEVBQUEsQ0FHTixXQUhNO0FBQUEsa0JBSU4sRUFBQSxHQUpNLEVBQUEsQ0FJTixFQUpNO0FBQUEsa0JBS04sRUFBQSxHQUxNLEVBQUEsQ0FLTixTQUxNO0FBQUEsa0JBTU4sRUFBQSxHQU5NLEVBQUEsQ0FNTixJQU5NO0FBQUEsa0JBT04sQ0FBQSxHQVBNLEVBQUEsQ0FPTixXQVBNO0FBQUEsa0JBUU4sQ0FBQSxHQVJNLEVBQUEsQ0FRTixRQVJNO0FBQUEsa0JBU04sQ0FBQSxHQVRNLEVBQUEsQ0FTTixhQVRNO0FBQUEsa0JBVU4sQ0FBQSxHQVZNLEVBQUEsQ0FVTixVQVZNO0FBQUEsa0JBV04sQ0FBQSxHQVhNLEVBQUEsQ0FXTixvQkFYTTtBQUFBLGtCQVlOLENBQUEsR0FaTSxFQUFBLENBWU4sZ0JBWk07QUFBQSxrQkFhTixDQUFBLEdBYk0sRUFBQSxDQWFOLHFCQWJNO0FBQUEsa0JBY04sQ0FBQSxHQWRNLEVBQUEsQ0FjTixjQWRNO0FBQUEsa0JBZU4sQ0FBQSxHQWZNLEVBQUEsQ0FlTixjQWZNO0FBQUEsa0JBZ0JTLENBQUEsR0FoQlQsRUFBQSxDQWdCTixhQWhCTTtBQUFBLGtCQWlCTixDQUFBLEdBakJNLEVBQUEsQ0FpQk4sY0FqQk07QUFBQSxrQkFBQSxDQUFBLEdBbUJvRixLQUFLLEtBbkJ6RjtBQUFBLGtCQW1CQSxDQUFBLEdBbkJBLENBQUEsQ0FtQkEsT0FuQkE7QUFBQSxrQkFtQlMsQ0FBQSxHQW5CVCxDQUFBLENBbUJTLE9BbkJUO0FBQUEsa0JBbUJrQixDQUFBLEdBbkJsQixDQUFBLENBbUJrQixRQW5CbEI7QUFBQSxrQkFtQjRCLENBQUEsR0FuQjVCLENBQUEsQ0FtQjRCLE9BbkI1QjtBQUFBLGtCQW1CcUMsQ0FBQSxHQW5CckMsQ0FBQSxDQW1CcUMsS0FuQnJDO0FBQUEsa0JBbUI0QyxDQUFBLEdBbkI1QyxDQUFBLENBbUI0QyxRQW5CNUM7QUFBQSxrQkFtQnNELENBQUEsR0FuQnRELENBQUEsQ0FtQnNELFFBbkJ0RDtBQUFBLGtCQW1CZ0UsQ0FBQSxHQW5CaEUsQ0FBQSxDQW1CZ0UsZUFuQmhFO0FBQUEsa0JBb0JGLENBQUEsR0FBYSxLQUFLLGFBQUwsRUFwQlg7QUFBQSxrQkFzQkYsQ0FBQSxHQUFlLENBQUEsS0FBZixDQUFBLENBdEJFO0FBQUEsa0JBdUJGLENBQUEsR0FBd0MsQ0FBQSxDQUFYLE1BQVcsS0FBQSxDQXZCdEM7QUFBQSxrQkF3QkYsQ0FBQSxHQUFpQyxDQUFBLENBQVgsTUFBVyxLQUFBLENBeEIvQjtBQUFBLGtCQXlCRixDQUFBLEdBQWtCLENBQUEsQ0FBTSxNQUFOLElBQWdCLEVBekJoQztBQUFBLGtCQTBCRixDQUFBLEdBQXFCLEtBQUssS0FBTCxDQUFXLGtCQUFYLElBQ3pCLENBRHlCLElBQ1QsQ0FEUyxJQUNhLENBRGIsSUFDOEIsQ0EzQmpEO0FBQUEsa0JBNkJGLENBQUEsR0FBc0IsRUFBQSxHQUFOLFdBN0JkO0FBQUEsa0JBK0JGLENBQUEsR0FBb0IsRUFBQSxHQUFOLFNBL0JaO0FBQUEsa0JBaUNGLENBQUEsR0FEaUMsQ0FBQSxLQUFBLElBQUEsR0FDUSxNQUFPLENBQVAsR0FBQSxXQURSLEdBQzJDLEVBakMxRTtBQUFBLGtCQWtDRixDQUFBLEdBQW9CLEtBQUssS0FBTCxDQUFXLGFBQVgsR0FBQSxNQUErQixDQUEvQixHQUFBLG1CQUFBLEdBQUEsTUFBdUUsQ0FBdkUsR0FBQSxXQWxDbEI7QUFBQSxrQkFtQ0YsQ0FBQSxHQUE0QixFQUFBLEdBQU4sdUJBbkNwQjtBQUFBLGtCQW9DRixDQUFBLEdBQWdCLENBQUEsS0FBaEIsQ0FBQSxDQUFnQixJQUE4QixDQUFBLEtBQUEsSUFwQzVDO0FBQUEsa0JBc0NGLENBQUEsR0FBbUIsRUFBQSxHQUFOLFFBdENYO0FBQUEsa0JBdUNGLENBQUEsR0FBNkIsQ0FBQSxHQUFOLElBQU0sR0FBa0IsRUF2QzdDO0FBQUEsa0JBeUNGLENBQUEsR0FBNEIsQ0FBQSxHQURaLElBQ1ksSUFEWixDQUFBLElBQVksQ0FBWixHQUNnRCxTQURoRCxHQUM0RCxRQUFoRCxDQXpDMUI7QUFBQSxrQkEyQ0YsQ0FBQSxHQUFxQixFQUFBLEdBQU4sVUEzQ2I7QUFBQSxrQkE2Q0YsQ0FBQSxHQUFtQixFQUFBLEdBQU4sUUE3Q1g7QUFBQSxrQkE4Q0YsQ0FBQSxHQUFxQixLQUFLLGtCQUFMLENBQXdCLENBQUEsQ0FBUSxDQUFSLENBQXhCLENBOUNuQjtBQUFBLGtCQWlERixDQUFBLEdBRndCLENBQUEsSUFDc0MsQ0FBQSxDQUEvQyxXQUErQyxHQUFqQyxPQUFpQyxDQUF6QixDQUFBLENBQU0sV0FBTixFQUF5QixNQUFBLENBRHRDLElBRWMsQ0FGZCxHQUcxQixDQUFBLEdBQVEsQ0FBQSxDQUFtQixNQUFuQixDQUEwQixDQUFBLENBQU0sTUFBaEMsQ0FIa0IsR0FJMUIsRUFuREk7QUFBQSxrQkFxREYsQ0FBQSxHQUFrQixFQUFBLEdBQUssaUJBckRyQjtBQUFBLGtCQXNERixDQUFBLEdBQXFCLENBQUEsR0FBWTtBQUNyQyxvQ0FBb0I7QUFEaUIsZUFBWixHQUV2QixJQXhESTtBQXNFUixxQkFUSSxDQUFBLElBQ0YsUUFBQSxFQUFBLEdBQWdCLENBQUEsQ0FBcUI7QUFBRSxnQkFBQSxTQUFBLEVBQVc7QUFBYixlQUFyQixDQUFoQixLQUc2QixRQUozQixLQUtBLEVBQUEsR0FBZ0IsQ0FBQSxHQUFBLENBQUEsQ0FBQSxhQUFBLEVBQUEsS0FBQSxFQUFBO0FBQUssZ0JBQUEsU0FBQSxFQUFjLEVBQUEsR0FBTCwrQkFBZDtBQUFnRSxnQkFBQSx1QkFBQSxFQUF5QjtBQUFFLGtCQUFBLE1BQUEsRUFBUTtBQUFWO0FBQXpGLGVBQUEsQ0FMaEIsR0FVRixDQUFBLEdBQUEsQ0FBQSxDQUFBLGFBQUEsRUFBQSxLQUFBLEVBQUE7QUFBSyxnQkFBQSxTQUFBLEVBQVcsQ0FBaEI7QUFBa0MsZ0JBQUEsU0FBQSxFQUFXLEtBQUs7QUFBbEQsZUFBQSxFQUNFLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxFQUFDLENBQUEsQ0FBQSxTQUFBLENBQUQsRUFBQTtBQUNFLGdCQUFBLEVBQUEsRUFBSSxFQUROO0FBRUUsZ0JBQUEsTUFBQSxFQUFRLENBQUEsQ0FBUSxNQUZsQjtBQUdFLGdCQUFBLFdBQUEsRUFBYSxDQUFBLENBQU0sTUFIckI7QUFJRSxnQkFBQSxjQUFBLEVBQWdCLEVBSmxCO0FBS0UsZ0JBQUEsY0FBQSxFQUFnQixLQUFLLGtCQUFMLENBQXdCLENBQUEsQ0FBUSxDQUFSLENBQXhCLENBTGxCO0FBTUUsZ0JBQUEsbUJBQUEsRUFBcUIsQ0FOdkI7QUFPRSxnQkFBQSxlQUFBLEVBQWlCLENBUG5CO0FBUUUsZ0JBQUEsU0FBQSxFQUFrQyxLQUFsQixLQUFrQixDQUFaLE9BQVksS0FBQSxJQVJwQztBQVNFLGdCQUFBLGNBQUEsRUFBZ0IsQ0FUbEI7QUFVRSxnQkFBQSxVQUFBLEVBQVksQ0FWZDtBQVdFLGdCQUFBLGVBQUEsRUFBaUIsQ0FYbkI7QUFZRSxnQkFBQSxRQUFBLEVBQVU7QUFaWixlQUFBLENBREYsRUFnQkcsQ0FBQSxJQUNDLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLEVBQU0sQ0FBQSxHQUFBLENBQUEsQ0FBQSxhQUFBLEVBQUEsT0FBQSxFQUFBO0FBQU8sZ0JBQUEsU0FBQSxFQUFXLENBQWxCO0FBQWlDLGdCQUFBLFFBQUEsRUFBQSxJQUFqQztBQUEwQyxnQkFBQSxRQUFBLEVBQVMsSUFBbkQ7QUFBd0QsZ0JBQUEsS0FBQSxFQUFPO0FBQS9ELGVBQUEsQ0FBTixDQWpCSixFQW9CRSxDQUFBLEdBQUEsQ0FBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQSxDQUFBO0FBQ0UsaUNBQWUsQ0FBQSxHQUFXLE1BQVgsR0FBb0IsT0FEckM7QUFFRSx5Q0FBdUIsQ0FBQSxHQUFtQixFQUFBLEdBQU4sWUFBTSxHQUFlLENBQWxDLEdBQThDLEtBQUEsQ0FGdkU7QUFHRSw2QkFBYyxFQUFBLEdBQWQsV0FIRjtBQUlFLHFDQUFvQixLQUFLLGFBQUwsS0FBd0IsTUFBeEIsR0FBaUM7QUFKdkQsZUFBQSxFQUtNLENBTE4sRUFBQTtBQU1FLGdCQUFBLFlBQUEsRUFBYSxLQU5mO0FBT0UsZ0JBQUEsU0FBQSxFQUFTLEtBQUssQ0FBTCxHQUFzQixDQUF0QixHQUE2QyxDQVB4RDtBQVFFLGdCQUFBLEVBQUEsRUFBSSxFQVJOO0FBU0UsZ0JBQUEsT0FBQSxFQUFTLGlCQUFDLEVBQUQsRUFBQztBQUFELHlCQUFXLEVBQUEsQ0FBSyxnQkFBTCxDQUFzQixFQUF0QixDQUFYO2lCQVRYO0FBVUUsZ0JBQUEsTUFBQSxFQUFRLEtBQUs7QUFWZixlQUFBLEVBdGRSLFNBQUEsQ0FBQSxDQUErQixFQUEvQixFQUErQjtBQUNaLHVCQUFPO0FBQUUsa0JBQUEsT0FBQSxFQUFTO0FBQVgsaUJBQVA7ZUFEbkIsQ0FpZW1DLEtBQUssaUJBamV4QyxDQXNkUSxFQUFBO0FBWUUsZ0JBQUEsT0FBQSxFQUFTLEtBQUssZ0JBWmhCO0FBYUUsZ0JBQUEsSUFBQSxFQUFNLEVBYlI7QUFjRSxnQkFBQSxXQUFBLEVBQWEsQ0FkZjtBQWVFLGdCQUFBLEdBQUEsRUFBSyxhQUFDLEVBQUQsRUFBQztBQUFtQixrQkFBQSxFQUFBLENBQUssaUJBQUwsQ0FBSyxDQUFBLENBQUwsSUFBNkIsRUFBN0I7aUJBZjNCO0FBZ0JFLGdCQUFBLElBQUEsRUFBSyxNQWhCUDtBQWlCRSxnQkFBQSxJQUFBLEVBQUssVUFqQlA7QUFrQkUsZ0JBQUEsUUFBQSxFQUFVLENBbEJaO0FBbUJFLGdCQUFBLEtBQUEsRUFBTztBQW5CVCxlQUFBLENBQUEsQ0FwQkYsRUEwQ0csRUExQ0gsRUE0Q0UsQ0FBQSxHQUFBLENBQUEsQ0FBQSxhQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0UsZ0JBQUEsU0FBQSxFQUFjLENBQUEsR0FBTCxHQUFLLEdBQWlCLENBQWpCLEdBQUwsR0FBSyxHQUE0QyxDQUQ1RDtBQUVFLGdCQUFBLFlBQUEsRUFBYyxzQkFBQyxFQUFELEVBQUM7QUFBRCx5QkFBVyxFQUFBLENBQUssb0JBQUwsQ0FBMEIsRUFBMUIsQ0FBWDtpQkFGaEI7QUFHRSxtQ0FBaUIsQ0FIbkI7QUFJRSxnQkFBQSxFQUFBLEVBQU8sRUFBQSxHQUFMLFdBSko7QUFLRSxnQkFBQSxJQUFBLEVBQUs7QUFMUCxlQUFBLEVBT0csQ0FBQSxDQUFRLEdBQVIsQ0FBWSxVQUFDLEVBQUQsRUFBUyxFQUFULEVBQVM7QUFDcEIsb0JBQ00sRUFBQSxHQUFBLENBRGMsQ0FBQSxLQUNkLENBQUEsQ0FEYyxHQUFpQixDQUFBLEtBQWEsRUFBOUIsR0FBc0MsQ0FBQSxLQUFZLEVBQ2hFLEtBQW1ELENBQUEsS0FBQSxJQUFuRCxHQUF3QixNQUFzQyxDQUF0QyxHQUFBLFdBQXhCLEdBQTJGLEVBRGpHO0FBQUEsb0JBRU0sRUFBQSxHQUFxQixFQUFBLEdBQVEsQ0FBUixHQUFELE1BQWtCLENBQWxCLEdBQUEsT0FBQyxHQUEwQyxFQUZyRTtBQUFBLG9CQUdNLEVBQUEsR0FBbUIsQ0FBQSxLQUNyQixjQUFZLEVBQVosR0FBQSxtQkFBQSxHQUFrQyxFQUFsQyxHQUFBLDhKQUFBLElBRXNDLEVBQUEsR0FBUSxDQUY5QyxJQUFBLE1BQUEsR0FFc0QsQ0FBQSxDQUFRLE1BRjlELEdBQUEsU0FEcUIsR0FJckIsRUFQSjtBQVNBLHVCQUNFLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxFQUFBLElBQUEsRUFBQTtBQUNFLG1DQUFlLENBQUEsS0FBWSxFQUFaLEdBQW9CLE1BQXBCLEdBQTZCLE9BRDlDO0FBRUUsa0JBQUEsU0FBQSxFQUFTLEtBQUssQ0FBTCxHQUF1QixFQUF2QixHQUErQyxFQUYxRDtBQUdFLGtCQUFBLHVCQUFBLEVBQXlCO0FBQUUsb0JBQUEsTUFBQSxFQUFRLEVBQUEsQ0FBSyxrQkFBTCxDQUF3QixFQUF4QixJQUFrQztBQUE1QyxtQkFIM0I7QUFJRSxrQkFBQSxFQUFBLEVBQU8sRUFBQSxHQUFMLFlBQUssR0FBZSxFQUp4QjtBQUtFLGtCQUFBLEdBQUEsRUFBSyxFQUxQO0FBTUUsa0JBQUEsTUFBQSxFQUFRLGdCQUFDLEVBQUQsRUFBQztBQUFELDJCQUFXLEVBQUEsQ0FBSyxnQkFBTCxDQUFzQixFQUF0QixFQUE2QixFQUE3QixDQUFYO21CQU5WO0FBT0Usa0JBQUEsT0FBQSxFQUFTLGlCQUFDLEVBQUQsRUFBQztBQUFELDJCQUFXLEVBQUEsQ0FBSyxpQkFBTCxDQUF1QixFQUF2QixFQUE4QixFQUE5QixDQUFYO21CQVBYO0FBUUUsa0JBQUEsV0FBQSxFQUFhLEVBQUEsQ0FBSyxxQkFScEI7QUFTRSxrQkFBQSxZQUFBLEVBQWMsc0JBQUMsRUFBRCxFQUFDO0FBQUQsMkJBQVcsRUFBQSxDQUFLLHNCQUFMLENBQTRCLEVBQTVCLEVBQW1DLEVBQW5DLENBQVg7bUJBVGhCO0FBVUUsa0JBQUEsR0FBQSxFQUFLLGFBQUMsRUFBRCxFQUFDO0FBQWUsb0JBQUEsRUFBQSxDQUFLLGlCQUFMLENBQXVCLEVBQXZCLElBQWdDLEVBQWhDO21CQVZ2QjtBQVdFLGtCQUFBLElBQUEsRUFBSyxRQVhQO0FBWUUsa0JBQUEsUUFBQSxFQUFTLElBWlg7QUFhRSxtQ0FBZSxFQUFBLEdBQVEsQ0FiekI7QUFjRSxrQ0FBYyxDQUFBLENBQVE7QUFkeEIsaUJBQUEsQ0FERjtlQVZELENBUEgsRUFxQ0csQ0FBQSxJQUNDLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxFQUFBLElBQUEsRUFBQTtBQUFJLGdCQUFBLFNBQUEsRUFBYyxDQUFBLEdBQUwsR0FBSyxHQUFtQixDQUFuQixHQUFMO0FBQWIsZUFBQSxFQUFxRSxDQUFBLEVBQXJFLENBdENKLENBNUNGLEVBc0ZFLENBQUEsR0FBQSxDQUFBLENBQUEsYUFBQSxFQUFBLE1BQUEsRUFBQTtBQUFNLGdCQUFBLEVBQUEsRUFBSSxDQUFWO0FBQTJCLGdCQUFBLEtBQUEsRUFBTztBQUFFLGtCQUFBLE9BQUEsRUFBUztBQUFYO0FBQWxDLGVBQUEsRUFBd0QsQ0FBQSxFQUF4RCxDQXRGRixDQURGO2FBdGFrQixFQTZmMEMsRUE3ZjFDO1dBdEJELENBQXFCLENBQUEsQ0FBQSxTQUFyQixDQXBCeUc7O0FBb0JwRixXQUFBLENBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEVBQ2pDLFlBRGlDLEdBQ2xCO0FBQ3BCLFlBQUEsVUFBQSxFQUFBLEtBRG9CO0FBRXBCLFlBQUEsWUFBQSxFQUFjLGNBRk07QUFHcEIsWUFBQSxZQUFBLEVBQWMsRUFITTtBQUlwQixZQUFBLFdBQUEsRUFBYSxRQUpPO0FBS3BCLFlBQUEsU0FBQSxFQUFXLENBTFM7QUFNcEIsWUFBQSxJQUFBLEVBQU0sb0JBTmM7QUFPcEIsWUFBQSxXQUFBLEVBQWEsRUFQTztBQVFwQixZQUFBLFNBQUEsRUFBVyxxQkFBQSxDLENBUlM7QUFTcEIsWUFBQSxhQUFBLEVBQUEsSUFUb0I7QUFVcEIsWUFBQSxrQkFBQSxFQUFBLElBVm9CO0FBV3BCLFlBQUEsYUFBQSxFQUFBLEtBWG9CO0FBWXBCLFlBQUEsUUFBQSxFQUFBLEtBWm9CO0FBYXBCLFlBQUEsVUFBQSxFQUFZLHNCQUFBO0FBQUEscUJBQU0sa0JBQU47YUFiUTtBQWNwQixZQUFBLGNBQUEsRUFBZ0IsMEJBQUE7QUFBQSxxQkFBTSw2SkFBTjthQWRJO0FBZXBCLFlBQUEsYUFBQSxFQUFlLENBQUEsQ0FBQSxTQUFBLENBZks7QUFnQnBCLFlBQUEsY0FBQSxFQUFnQixLQUFBO0FBaEJJLFdBRGtCO1NuRDhDMUMsRW1EN0JvQixVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDcERwQixjQUFBLENBQUEsR0FBZSxDQUFBLENBQVEsQ0FBUixDQUFmO0FBQUEsY0FDQSxDQUFBLEdBQVUsQ0FBQSxDQUFRLEVBQVIsQ0FEVjtBQUFBLGNBRUEsQ0FBQSxHQUFrQixDQUFBLENBQVEsRUFBUixDQUZsQjtBQUFBLGNBR0EsQ0FBQSxHQUFlLENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBdUIsVUFBdkIsQ0FIZjtBQUFBLGNBSUEsQ0FBQSxHQUFBLFNBQUEsQ0FBQSxHQUFBLEMsQ0FKQTtBQUFBLGNBS0EsQ0FBQSxHQUFBLFdBTEE7QUFBQSxjQVFBLEVBQUEsR0FBQSxhQUFBO0FBRUEsZ0JBSUEsRUFKQTtBQUFBLGdCQUFBLEVBQUEsR0FBZSxDQUFBLENBQVEsRUFBUixDQUFBLENBQXVCLFFBQXZCLENBQWY7QUFBQSxnQkFDQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLE1BREE7O0FBZUEsaUJBVkEsRUFBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLEdBQUEsTUFBQSxFQUNFLENBQUEsQ0FBUSxFQUFSLENBQUEsQ0FBaUIsV0FBakIsQ0FBaUIsRUFBakIsQ0FERixFQUVBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsYUFGQSxFQUtBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxhQUFBLENBQUEsUUFBQSxFQUNBLElBREEsRUFMQSxFQU9BLEVBQUEsQ0FBQSxLQUFBLENBQUEsb0NBQUEsQ0FQQSxFQVFBLEVBQUEsQ0FBQSxLQUFBLEVBUkEsRUFTQSxFQUFBLEdBQUEsRUFBQSxDQUFBLENBQ0EsRUFBQSxDQUFBLEVBQUE7QUFBQSxxQkFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUE7O0FBQ0EsbUJBQUEsRUFBQSxFQUFBO1dBMUJBOztBQTZCQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsSUFBQSxVQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDQSxnQkFBQSxDQUFBO0FBUUEsbUJBUEEsRUFBQSxLQUFBLElBQUEsSUFDQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUNBLENBQUEsR0FBQSxJQUFBLENBQUEsRUFEQSxFQUVBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxJQUZBLEVBSUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLEVBTEEsSUFNRyxDQUFBLEdBQUEsRUFBQSxFQU5ILEVBT0EsRUFBQSxLQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQTtXQVRBO1NwRG9EQSxFb0QzQ0EsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQ3ZDQSxjQUFBLENBQUEsR0FBUyxDQUFBLENBQVEsQ0FBUixDQUFUO0FBQUEsY0FDQSxDQUFBLEdBQWUsQ0FBQSxDQUFRLENBQVIsQ0FEZjtBQUFBLGNBRUEsQ0FBQSxHQUFjLENBQUEsQ0FBUSxFQUFSLENBRmQ7QUFJQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQWlCLENBQUEsQ0FBUSxDQUFSLENBQUEsR0FBd0IsTUFBQSxDQUFBLGdCQUF4QixHQUF3QixVQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7QUFDekMsWUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBOztBQUtBLGlCQUFBLElBREEsRUFDQSxFQUpBLENBQUEsR0FBQSxDQUFBLENBQUEsRUFBQSxDQUlBLEVBSEEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUdBLEVBRkEsQ0FBQSxHQUFBLENBRUEsRUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLGNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUE7QUFBQTs7QUFDQSxtQkFBQSxFQUFBO1dBUEE7U3JEOEVBLEVxRHZFQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDWEEsY0FBQSxDQUFBLEdBQWUsQ0FBQSxDQUFRLENBQVIsQ0FBQSxDQUFtQixRQUFsQztBQUNBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLGVBQUE7U3REaUZBLEVzRGpGQSxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQUEsY0FBQSxDQUFBLEdDQWMsQ0FBQSxDQUFRLENBQVIsQ0RBZDtBQ0VBLFVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsVUFBQSxFQUFBO0FBQWdDLFlBQUEsSUFBQSxFQUFPLENBQUEsQ0FBUSxFQUFSO0FBQXZDLFdBQUEsQ0FBQTtTdkQrRUEsRXVEL0UrQyxVQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQUE7O0FDRi9DLGNBQUEsQ0FBQSxHQUFnQixDQUFBLENBQVEsRUFBUixDQUFoQjtBQUFBLGNBQ0EsQ0FBQSxHQUFlLENBQUEsQ0FBUSxDQUFSLENBRGY7QUFBQSxjQUVBLENBQUEsR0FBYSxDQUFBLENBQVEsRUFBUixDQUZiO0FBQUEsY0FHQSxDQUFBLEdBQUEsR0FBQSxLQUhBO0FBQUEsY0FJQSxDQUFBLEdBQUEsRUFKQTs7QUFjQSxVQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsUUFBQSxDQUFBLElBQUEsSUFBQSxVQUFBLEVBQUEsRUFBQTtBQUNBLGdCQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBO0FBQUEsZ0JBQ0EsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsQ0FEQTtBQUFBLGdCQUVBLENBQUEsR0FBQSxTQUFBLENBQUEsR0FBQTtBQUNBLGtCQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7QUFDQSxxQkFBQSxnQkFBQSxDQUFBLEdBYkEsVUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTtBQUNBLG9CQUFBLEVBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxFQUFBO0FBQ0EsdUJBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxFQUFBLEVBQUEsR0FBQSxDQUFBLEVBQTJCLEVBQUEsR0FBQSxFQUEzQixFQUFvQyxFQUFBLEVBQXBDO0FBQW9DLG9CQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxPQUFBLEVBQUEsR0FBQSxHQUFBO0FBQXBDOztBQUVBLGtCQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxRQUFBLENBQUEsS0FBQSxFQUFBLGtCQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBOzs7QUFDRyx1QkFBQSxDQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtlQUxILENBYUEsRUFiQSxFQWFBLEVBQUEsQ0FBQSxNQWJBLEVBYUEsRUFiQSxDQWFBLEdBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxDQUFBO2FBSkE7O0FBT0EsbUJBREEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxTQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsU0FBQSxHQUFBLEVBQUEsQ0FBQSxTQUFBLEdBQ0EsQ0FBQTtXQVJBO1N4RG1FQSxFd0QzREEsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FDdEJBLFVBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxVQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0EsZ0JBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxLQUFBLENBQUE7O0FBQ0Esb0JBQUEsRUFBQSxDQUFBLE1BQUE7bUJBQ0EsQztBQUFBLHVCQUFBLENBQUEsR0FBQSxFQUFBLEVBQUEsR0FDQSxFQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FEQTs7bUJBRUEsQztBQUFBLHVCQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQ0EsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxDQURBOzttQkFFQSxDO0FBQUEsdUJBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQ0EsRUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FEQTs7bUJBRUEsQztBQUFBLHVCQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FDQSxFQUFBLENBQUEsSUFBQSxDQUFBLENB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QUEyQixNQUFBLENBQU8sT0FBUCxDQUFlLFNBQWYsRUFBMEIsUUFBMUIsQ0FBbUMsaUJBQW5DLEVBQXNELEdBQXRELENBQTNCO0FBRUEsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQsSUFBQSxRQUFBLENBQVMsYUFBVCxDQUF1QixJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQXVDLEdBRHhDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYWNjZXNzaWJsZUF1dG9jb21wbGV0ZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhY2Nlc3NpYmxlQXV0b2NvbXBsZXRlXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDM3KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KTtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYgKHRhcmdldCkgcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYgKGV4cG9ydHNba2V5XSAhPSBvdXQpIGhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmIChJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dCkgZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgVk5vZGUgPSBmdW5jdGlvbiBWTm9kZSgpIHt9O1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG52YXIgc3RhY2sgPSBbXTtcblxudmFyIEVNUFRZX0NISUxEUkVOID0gW107XG5cbmZ1bmN0aW9uIGgobm9kZU5hbWUsIGF0dHJpYnV0ZXMpIHtcblx0dmFyIGNoaWxkcmVuID0gRU1QVFlfQ0hJTERSRU4sXG5cdCAgICBsYXN0U2ltcGxlLFxuXHQgICAgY2hpbGQsXG5cdCAgICBzaW1wbGUsXG5cdCAgICBpO1xuXHRmb3IgKGkgPSBhcmd1bWVudHMubGVuZ3RoOyBpLS0gPiAyOykge1xuXHRcdHN0YWNrLnB1c2goYXJndW1lbnRzW2ldKTtcblx0fVxuXHRpZiAoYXR0cmlidXRlcyAmJiBhdHRyaWJ1dGVzLmNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRpZiAoIXN0YWNrLmxlbmd0aCkgc3RhY2sucHVzaChhdHRyaWJ1dGVzLmNoaWxkcmVuKTtcblx0XHRkZWxldGUgYXR0cmlidXRlcy5jaGlsZHJlbjtcblx0fVxuXHR3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG5cdFx0aWYgKChjaGlsZCA9IHN0YWNrLnBvcCgpKSAmJiBjaGlsZC5wb3AgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Zm9yIChpID0gY2hpbGQubGVuZ3RoOyBpLS07KSB7XG5cdFx0XHRcdHN0YWNrLnB1c2goY2hpbGRbaV0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIGNoaWxkID09PSAnYm9vbGVhbicpIGNoaWxkID0gbnVsbDtcblxuXHRcdFx0aWYgKHNpbXBsZSA9IHR5cGVvZiBub2RlTmFtZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRpZiAoY2hpbGQgPT0gbnVsbCkgY2hpbGQgPSAnJztlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdudW1iZXInKSBjaGlsZCA9IFN0cmluZyhjaGlsZCk7ZWxzZSBpZiAodHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJykgc2ltcGxlID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzaW1wbGUgJiYgbGFzdFNpbXBsZSkge1xuXHRcdFx0XHRjaGlsZHJlbltjaGlsZHJlbi5sZW5ndGggLSAxXSArPSBjaGlsZDtcblx0XHRcdH0gZWxzZSBpZiAoY2hpbGRyZW4gPT09IEVNUFRZX0NISUxEUkVOKSB7XG5cdFx0XHRcdGNoaWxkcmVuID0gW2NoaWxkXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdFx0fVxuXG5cdFx0XHRsYXN0U2ltcGxlID0gc2ltcGxlO1xuXHRcdH1cblx0fVxuXG5cdHZhciBwID0gbmV3IFZOb2RlKCk7XG5cdHAubm9kZU5hbWUgPSBub2RlTmFtZTtcblx0cC5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXHRwLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzID09IG51bGwgPyB1bmRlZmluZWQgOiBhdHRyaWJ1dGVzO1xuXHRwLmtleSA9IGF0dHJpYnV0ZXMgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGF0dHJpYnV0ZXMua2V5O1xuXG5cdGlmIChvcHRpb25zLnZub2RlICE9PSB1bmRlZmluZWQpIG9wdGlvbnMudm5vZGUocCk7XG5cblx0cmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChvYmosIHByb3BzKSB7XG4gIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcbiAgICBvYmpbaV0gPSBwcm9wc1tpXTtcbiAgfXJldHVybiBvYmo7XG59XG5cbnZhciBkZWZlciA9IHR5cGVvZiBQcm9taXNlID09ICdmdW5jdGlvbicgPyBQcm9taXNlLnJlc29sdmUoKS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpIDogc2V0VGltZW91dDtcblxuZnVuY3Rpb24gY2xvbmVFbGVtZW50KHZub2RlLCBwcm9wcykge1xuICByZXR1cm4gaCh2bm9kZS5ub2RlTmFtZSwgZXh0ZW5kKGV4dGVuZCh7fSwgdm5vZGUuYXR0cmlidXRlcyksIHByb3BzKSwgYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiB2bm9kZS5jaGlsZHJlbik7XG59XG5cbnZhciBJU19OT05fRElNRU5TSU9OQUwgPSAvYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmQvaTtcblxudmFyIGl0ZW1zID0gW107XG5cbmZ1bmN0aW9uIGVucXVldWVSZW5kZXIoY29tcG9uZW50KSB7XG5cdGlmICghY29tcG9uZW50Ll9kaXJ0eSAmJiAoY29tcG9uZW50Ll9kaXJ0eSA9IHRydWUpICYmIGl0ZW1zLnB1c2goY29tcG9uZW50KSA9PSAxKSB7XG5cdFx0KG9wdGlvbnMuZGVib3VuY2VSZW5kZXJpbmcgfHwgZGVmZXIpKHJlcmVuZGVyKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZXJlbmRlcigpIHtcblx0dmFyIHAsXG5cdCAgICBsaXN0ID0gaXRlbXM7XG5cdGl0ZW1zID0gW107XG5cdHdoaWxlIChwID0gbGlzdC5wb3AoKSkge1xuXHRcdGlmIChwLl9kaXJ0eSkgcmVuZGVyQ29tcG9uZW50KHApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGlzU2FtZU5vZGVUeXBlKG5vZGUsIHZub2RlLCBoeWRyYXRpbmcpIHtcblx0aWYgKHR5cGVvZiB2bm9kZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZub2RlID09PSAnbnVtYmVyJykge1xuXHRcdHJldHVybiBub2RlLnNwbGl0VGV4dCAhPT0gdW5kZWZpbmVkO1xuXHR9XG5cdGlmICh0eXBlb2Ygdm5vZGUubm9kZU5hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuICFub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciAmJiBpc05hbWVkTm9kZShub2RlLCB2bm9kZS5ub2RlTmFtZSk7XG5cdH1cblx0cmV0dXJuIGh5ZHJhdGluZyB8fCBub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWU7XG59XG5cbmZ1bmN0aW9uIGlzTmFtZWROb2RlKG5vZGUsIG5vZGVOYW1lKSB7XG5cdHJldHVybiBub2RlLm5vcm1hbGl6ZWROb2RlTmFtZSA9PT0gbm9kZU5hbWUgfHwgbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBnZXROb2RlUHJvcHModm5vZGUpIHtcblx0dmFyIHByb3BzID0gZXh0ZW5kKHt9LCB2bm9kZS5hdHRyaWJ1dGVzKTtcblx0cHJvcHMuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcblxuXHR2YXIgZGVmYXVsdFByb3BzID0gdm5vZGUubm9kZU5hbWUuZGVmYXVsdFByb3BzO1xuXHRpZiAoZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKHZhciBpIGluIGRlZmF1bHRQcm9wcykge1xuXHRcdFx0aWYgKHByb3BzW2ldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cHJvcHNbaV0gPSBkZWZhdWx0UHJvcHNbaV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHByb3BzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlKG5vZGVOYW1lLCBpc1N2Zykge1xuXHR2YXIgbm9kZSA9IGlzU3ZnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5vZGVOYW1lKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuXHRub2RlLm5vcm1hbGl6ZWROb2RlTmFtZSA9IG5vZGVOYW1lO1xuXHRyZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG5cdHZhciBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXHRpZiAocGFyZW50Tm9kZSkgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbn1cblxuZnVuY3Rpb24gc2V0QWNjZXNzb3Iobm9kZSwgbmFtZSwgb2xkLCB2YWx1ZSwgaXNTdmcpIHtcblx0aWYgKG5hbWUgPT09ICdjbGFzc05hbWUnKSBuYW1lID0gJ2NsYXNzJztcblxuXHRpZiAobmFtZSA9PT0gJ2tleScpIHt9IGVsc2UgaWYgKG5hbWUgPT09ICdyZWYnKSB7XG5cdFx0aWYgKG9sZCkgb2xkKG51bGwpO1xuXHRcdGlmICh2YWx1ZSkgdmFsdWUobm9kZSk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJ2NsYXNzJyAmJiAhaXNTdmcpIHtcblx0XHRub2RlLmNsYXNzTmFtZSA9IHZhbHVlIHx8ICcnO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICdzdHlsZScpIHtcblx0XHRpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9sZCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlIHx8ICcnO1xuXHRcdH1cblx0XHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0aWYgKHR5cGVvZiBvbGQgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgaW4gb2xkKSB7XG5cdFx0XHRcdFx0aWYgKCEoaSBpbiB2YWx1ZSkpIG5vZGUuc3R5bGVbaV0gPSAnJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgaSBpbiB2YWx1ZSkge1xuXHRcdFx0XHRub2RlLnN0eWxlW2ldID0gdHlwZW9mIHZhbHVlW2ldID09PSAnbnVtYmVyJyAmJiBJU19OT05fRElNRU5TSU9OQUwudGVzdChpKSA9PT0gZmFsc2UgPyB2YWx1ZVtpXSArICdweCcgOiB2YWx1ZVtpXTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJykge1xuXHRcdGlmICh2YWx1ZSkgbm9kZS5pbm5lckhUTUwgPSB2YWx1ZS5fX2h0bWwgfHwgJyc7XG5cdH0gZWxzZSBpZiAobmFtZVswXSA9PSAnbycgJiYgbmFtZVsxXSA9PSAnbicpIHtcblx0XHR2YXIgdXNlQ2FwdHVyZSA9IG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9DYXB0dXJlJC8sICcnKSk7XG5cdFx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5zdWJzdHJpbmcoMik7XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRpZiAoIW9sZCkgbm9kZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50UHJveHksIHVzZUNhcHR1cmUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnRQcm94eSwgdXNlQ2FwdHVyZSk7XG5cdFx0fVxuXHRcdChub2RlLl9saXN0ZW5lcnMgfHwgKG5vZGUuX2xpc3RlbmVycyA9IHt9KSlbbmFtZV0gPSB2YWx1ZTtcblx0fSBlbHNlIGlmIChuYW1lICE9PSAnbGlzdCcgJiYgbmFtZSAhPT0gJ3R5cGUnICYmICFpc1N2ZyAmJiBuYW1lIGluIG5vZGUpIHtcblx0XHR0cnkge1xuXHRcdFx0bm9kZVtuYW1lXSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuXHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0aWYgKCh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBmYWxzZSkgJiYgbmFtZSAhPSAnc3BlbGxjaGVjaycpIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBucyA9IGlzU3ZnICYmIG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9eeGxpbms6Py8sICcnKSk7XG5cblx0XHRpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcblx0XHRcdGlmIChucykgbm9kZS5yZW1vdmVBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIG5hbWUudG9Mb3dlckNhc2UoKSk7ZWxzZSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aWYgKG5zKSBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgbmFtZS50b0xvd2VyQ2FzZSgpLCB2YWx1ZSk7ZWxzZSBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGV2ZW50UHJveHkoZSkge1xuXHRyZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2UudHlwZV0ob3B0aW9ucy5ldmVudCAmJiBvcHRpb25zLmV2ZW50KGUpIHx8IGUpO1xufVxuXG52YXIgbW91bnRzID0gW107XG5cbnZhciBkaWZmTGV2ZWwgPSAwO1xuXG52YXIgaXNTdmdNb2RlID0gZmFsc2U7XG5cbnZhciBoeWRyYXRpbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZmx1c2hNb3VudHMoKSB7XG5cdHZhciBjO1xuXHR3aGlsZSAoYyA9IG1vdW50cy5wb3AoKSkge1xuXHRcdGlmIChvcHRpb25zLmFmdGVyTW91bnQpIG9wdGlvbnMuYWZ0ZXJNb3VudChjKTtcblx0XHRpZiAoYy5jb21wb25lbnREaWRNb3VudCkgYy5jb21wb25lbnREaWRNb3VudCgpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIHBhcmVudCwgY29tcG9uZW50Um9vdCkge1xuXHRpZiAoIWRpZmZMZXZlbCsrKSB7XG5cdFx0aXNTdmdNb2RlID0gcGFyZW50ICE9IG51bGwgJiYgcGFyZW50Lm93bmVyU1ZHRWxlbWVudCAhPT0gdW5kZWZpbmVkO1xuXG5cdFx0aHlkcmF0aW5nID0gZG9tICE9IG51bGwgJiYgISgnX19wcmVhY3RhdHRyXycgaW4gZG9tKTtcblx0fVxuXG5cdHZhciByZXQgPSBpZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgY29tcG9uZW50Um9vdCk7XG5cblx0aWYgKHBhcmVudCAmJiByZXQucGFyZW50Tm9kZSAhPT0gcGFyZW50KSBwYXJlbnQuYXBwZW5kQ2hpbGQocmV0KTtcblxuXHRpZiAoISAtLWRpZmZMZXZlbCkge1xuXHRcdGh5ZHJhdGluZyA9IGZhbHNlO1xuXG5cdFx0aWYgKCFjb21wb25lbnRSb290KSBmbHVzaE1vdW50cygpO1xuXHR9XG5cblx0cmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gaWRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIGNvbXBvbmVudFJvb3QpIHtcblx0dmFyIG91dCA9IGRvbSxcblx0ICAgIHByZXZTdmdNb2RlID0gaXNTdmdNb2RlO1xuXG5cdGlmICh2bm9kZSA9PSBudWxsIHx8IHR5cGVvZiB2bm9kZSA9PT0gJ2Jvb2xlYW4nKSB2bm9kZSA9ICcnO1xuXG5cdGlmICh0eXBlb2Ygdm5vZGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2bm9kZSA9PT0gJ251bWJlcicpIHtcblx0XHRpZiAoZG9tICYmIGRvbS5zcGxpdFRleHQgIT09IHVuZGVmaW5lZCAmJiBkb20ucGFyZW50Tm9kZSAmJiAoIWRvbS5fY29tcG9uZW50IHx8IGNvbXBvbmVudFJvb3QpKSB7XG5cdFx0XHRpZiAoZG9tLm5vZGVWYWx1ZSAhPSB2bm9kZSkge1xuXHRcdFx0XHRkb20ubm9kZVZhbHVlID0gdm5vZGU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG91dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZub2RlKTtcblx0XHRcdGlmIChkb20pIHtcblx0XHRcdFx0aWYgKGRvbS5wYXJlbnROb2RlKSBkb20ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob3V0LCBkb20pO1xuXHRcdFx0XHRyZWNvbGxlY3ROb2RlVHJlZShkb20sIHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG91dFsnX19wcmVhY3RhdHRyXyddID0gdHJ1ZTtcblxuXHRcdHJldHVybiBvdXQ7XG5cdH1cblxuXHR2YXIgdm5vZGVOYW1lID0gdm5vZGUubm9kZU5hbWU7XG5cdGlmICh0eXBlb2Ygdm5vZGVOYW1lID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKTtcblx0fVxuXG5cdGlzU3ZnTW9kZSA9IHZub2RlTmFtZSA9PT0gJ3N2ZycgPyB0cnVlIDogdm5vZGVOYW1lID09PSAnZm9yZWlnbk9iamVjdCcgPyBmYWxzZSA6IGlzU3ZnTW9kZTtcblxuXHR2bm9kZU5hbWUgPSBTdHJpbmcodm5vZGVOYW1lKTtcblx0aWYgKCFkb20gfHwgIWlzTmFtZWROb2RlKGRvbSwgdm5vZGVOYW1lKSkge1xuXHRcdG91dCA9IGNyZWF0ZU5vZGUodm5vZGVOYW1lLCBpc1N2Z01vZGUpO1xuXG5cdFx0aWYgKGRvbSkge1xuXHRcdFx0d2hpbGUgKGRvbS5maXJzdENoaWxkKSB7XG5cdFx0XHRcdG91dC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9tLnBhcmVudE5vZGUpIGRvbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChvdXQsIGRvbSk7XG5cblx0XHRcdHJlY29sbGVjdE5vZGVUcmVlKGRvbSwgdHJ1ZSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIGZjID0gb3V0LmZpcnN0Q2hpbGQsXG5cdCAgICBwcm9wcyA9IG91dFsnX19wcmVhY3RhdHRyXyddLFxuXHQgICAgdmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG5cblx0aWYgKHByb3BzID09IG51bGwpIHtcblx0XHRwcm9wcyA9IG91dFsnX19wcmVhY3RhdHRyXyddID0ge307XG5cdFx0Zm9yICh2YXIgYSA9IG91dC5hdHRyaWJ1dGVzLCBpID0gYS5sZW5ndGg7IGktLTspIHtcblx0XHRcdHByb3BzW2FbaV0ubmFtZV0gPSBhW2ldLnZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGlmICghaHlkcmF0aW5nICYmIHZjaGlsZHJlbiAmJiB2Y2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIHR5cGVvZiB2Y2hpbGRyZW5bMF0gPT09ICdzdHJpbmcnICYmIGZjICE9IG51bGwgJiYgZmMuc3BsaXRUZXh0ICE9PSB1bmRlZmluZWQgJiYgZmMubmV4dFNpYmxpbmcgPT0gbnVsbCkge1xuXHRcdGlmIChmYy5ub2RlVmFsdWUgIT0gdmNoaWxkcmVuWzBdKSB7XG5cdFx0XHRmYy5ub2RlVmFsdWUgPSB2Y2hpbGRyZW5bMF07XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHZjaGlsZHJlbiAmJiB2Y2hpbGRyZW4ubGVuZ3RoIHx8IGZjICE9IG51bGwpIHtcblx0XHRcdGlubmVyRGlmZk5vZGUob3V0LCB2Y2hpbGRyZW4sIGNvbnRleHQsIG1vdW50QWxsLCBoeWRyYXRpbmcgfHwgcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgIT0gbnVsbCk7XG5cdFx0fVxuXG5cdGRpZmZBdHRyaWJ1dGVzKG91dCwgdm5vZGUuYXR0cmlidXRlcywgcHJvcHMpO1xuXG5cdGlzU3ZnTW9kZSA9IHByZXZTdmdNb2RlO1xuXG5cdHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGlubmVyRGlmZk5vZGUoZG9tLCB2Y2hpbGRyZW4sIGNvbnRleHQsIG1vdW50QWxsLCBpc0h5ZHJhdGluZykge1xuXHR2YXIgb3JpZ2luYWxDaGlsZHJlbiA9IGRvbS5jaGlsZE5vZGVzLFxuXHQgICAgY2hpbGRyZW4gPSBbXSxcblx0ICAgIGtleWVkID0ge30sXG5cdCAgICBrZXllZExlbiA9IDAsXG5cdCAgICBtaW4gPSAwLFxuXHQgICAgbGVuID0gb3JpZ2luYWxDaGlsZHJlbi5sZW5ndGgsXG5cdCAgICBjaGlsZHJlbkxlbiA9IDAsXG5cdCAgICB2bGVuID0gdmNoaWxkcmVuID8gdmNoaWxkcmVuLmxlbmd0aCA6IDAsXG5cdCAgICBqLFxuXHQgICAgYyxcblx0ICAgIGYsXG5cdCAgICB2Y2hpbGQsXG5cdCAgICBjaGlsZDtcblxuXHRpZiAobGVuICE9PSAwKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0dmFyIF9jaGlsZCA9IG9yaWdpbmFsQ2hpbGRyZW5baV0sXG5cdFx0XHQgICAgcHJvcHMgPSBfY2hpbGRbJ19fcHJlYWN0YXR0cl8nXSxcblx0XHRcdCAgICBrZXkgPSB2bGVuICYmIHByb3BzID8gX2NoaWxkLl9jb21wb25lbnQgPyBfY2hpbGQuX2NvbXBvbmVudC5fX2tleSA6IHByb3BzLmtleSA6IG51bGw7XG5cdFx0XHRpZiAoa2V5ICE9IG51bGwpIHtcblx0XHRcdFx0a2V5ZWRMZW4rKztcblx0XHRcdFx0a2V5ZWRba2V5XSA9IF9jaGlsZDtcblx0XHRcdH0gZWxzZSBpZiAocHJvcHMgfHwgKF9jaGlsZC5zcGxpdFRleHQgIT09IHVuZGVmaW5lZCA/IGlzSHlkcmF0aW5nID8gX2NoaWxkLm5vZGVWYWx1ZS50cmltKCkgOiB0cnVlIDogaXNIeWRyYXRpbmcpKSB7XG5cdFx0XHRcdGNoaWxkcmVuW2NoaWxkcmVuTGVuKytdID0gX2NoaWxkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICh2bGVuICE9PSAwKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bGVuOyBpKyspIHtcblx0XHRcdHZjaGlsZCA9IHZjaGlsZHJlbltpXTtcblx0XHRcdGNoaWxkID0gbnVsbDtcblxuXHRcdFx0dmFyIGtleSA9IHZjaGlsZC5rZXk7XG5cdFx0XHRpZiAoa2V5ICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKGtleWVkTGVuICYmIGtleWVkW2tleV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGNoaWxkID0ga2V5ZWRba2V5XTtcblx0XHRcdFx0XHRrZXllZFtrZXldID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGtleWVkTGVuLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAobWluIDwgY2hpbGRyZW5MZW4pIHtcblx0XHRcdFx0XHRmb3IgKGogPSBtaW47IGogPCBjaGlsZHJlbkxlbjsgaisrKSB7XG5cdFx0XHRcdFx0XHRpZiAoY2hpbGRyZW5bal0gIT09IHVuZGVmaW5lZCAmJiBpc1NhbWVOb2RlVHlwZShjID0gY2hpbGRyZW5bal0sIHZjaGlsZCwgaXNIeWRyYXRpbmcpKSB7XG5cdFx0XHRcdFx0XHRcdGNoaWxkID0gYztcblx0XHRcdFx0XHRcdFx0Y2hpbGRyZW5bal0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmIChqID09PSBjaGlsZHJlbkxlbiAtIDEpIGNoaWxkcmVuTGVuLS07XG5cdFx0XHRcdFx0XHRcdGlmIChqID09PSBtaW4pIG1pbisrO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Y2hpbGQgPSBpZGlmZihjaGlsZCwgdmNoaWxkLCBjb250ZXh0LCBtb3VudEFsbCk7XG5cblx0XHRcdGYgPSBvcmlnaW5hbENoaWxkcmVuW2ldO1xuXHRcdFx0aWYgKGNoaWxkICYmIGNoaWxkICE9PSBkb20gJiYgY2hpbGQgIT09IGYpIHtcblx0XHRcdFx0aWYgKGYgPT0gbnVsbCkge1xuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjaGlsZCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoY2hpbGQgPT09IGYubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRyZW1vdmVOb2RlKGYpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoY2hpbGQsIGYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKGtleWVkTGVuKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiBrZXllZCkge1xuXHRcdFx0aWYgKGtleWVkW2ldICE9PSB1bmRlZmluZWQpIHJlY29sbGVjdE5vZGVUcmVlKGtleWVkW2ldLCBmYWxzZSk7XG5cdFx0fVxuXHR9XG5cblx0d2hpbGUgKG1pbiA8PSBjaGlsZHJlbkxlbikge1xuXHRcdGlmICgoY2hpbGQgPSBjaGlsZHJlbltjaGlsZHJlbkxlbi0tXSkgIT09IHVuZGVmaW5lZCkgcmVjb2xsZWN0Tm9kZVRyZWUoY2hpbGQsIGZhbHNlKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZWNvbGxlY3ROb2RlVHJlZShub2RlLCB1bm1vdW50T25seSkge1xuXHR2YXIgY29tcG9uZW50ID0gbm9kZS5fY29tcG9uZW50O1xuXHRpZiAoY29tcG9uZW50KSB7XG5cdFx0dW5tb3VudENvbXBvbmVudChjb21wb25lbnQpO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChub2RlWydfX3ByZWFjdGF0dHJfJ10gIT0gbnVsbCAmJiBub2RlWydfX3ByZWFjdGF0dHJfJ10ucmVmKSBub2RlWydfX3ByZWFjdGF0dHJfJ10ucmVmKG51bGwpO1xuXG5cdFx0aWYgKHVubW91bnRPbmx5ID09PSBmYWxzZSB8fCBub2RlWydfX3ByZWFjdGF0dHJfJ10gPT0gbnVsbCkge1xuXHRcdFx0cmVtb3ZlTm9kZShub2RlKTtcblx0XHR9XG5cblx0XHRyZW1vdmVDaGlsZHJlbihub2RlKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG5cdG5vZGUgPSBub2RlLmxhc3RDaGlsZDtcblx0d2hpbGUgKG5vZGUpIHtcblx0XHR2YXIgbmV4dCA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuXHRcdHJlY29sbGVjdE5vZGVUcmVlKG5vZGUsIHRydWUpO1xuXHRcdG5vZGUgPSBuZXh0O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGRpZmZBdHRyaWJ1dGVzKGRvbSwgYXR0cnMsIG9sZCkge1xuXHR2YXIgbmFtZTtcblxuXHRmb3IgKG5hbWUgaW4gb2xkKSB7XG5cdFx0aWYgKCEoYXR0cnMgJiYgYXR0cnNbbmFtZV0gIT0gbnVsbCkgJiYgb2xkW25hbWVdICE9IG51bGwpIHtcblx0XHRcdHNldEFjY2Vzc29yKGRvbSwgbmFtZSwgb2xkW25hbWVdLCBvbGRbbmFtZV0gPSB1bmRlZmluZWQsIGlzU3ZnTW9kZSk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yIChuYW1lIGluIGF0dHJzKSB7XG5cdFx0aWYgKG5hbWUgIT09ICdjaGlsZHJlbicgJiYgbmFtZSAhPT0gJ2lubmVySFRNTCcgJiYgKCEobmFtZSBpbiBvbGQpIHx8IGF0dHJzW25hbWVdICE9PSAobmFtZSA9PT0gJ3ZhbHVlJyB8fCBuYW1lID09PSAnY2hlY2tlZCcgPyBkb21bbmFtZV0gOiBvbGRbbmFtZV0pKSkge1xuXHRcdFx0c2V0QWNjZXNzb3IoZG9tLCBuYW1lLCBvbGRbbmFtZV0sIG9sZFtuYW1lXSA9IGF0dHJzW25hbWVdLCBpc1N2Z01vZGUpO1xuXHRcdH1cblx0fVxufVxuXG52YXIgcmVjeWNsZXJDb21wb25lbnRzID0gW107XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChDdG9yLCBwcm9wcywgY29udGV4dCkge1xuXHR2YXIgaW5zdCxcblx0ICAgIGkgPSByZWN5Y2xlckNvbXBvbmVudHMubGVuZ3RoO1xuXG5cdGlmIChDdG9yLnByb3RvdHlwZSAmJiBDdG9yLnByb3RvdHlwZS5yZW5kZXIpIHtcblx0XHRpbnN0ID0gbmV3IEN0b3IocHJvcHMsIGNvbnRleHQpO1xuXHRcdENvbXBvbmVudC5jYWxsKGluc3QsIHByb3BzLCBjb250ZXh0KTtcblx0fSBlbHNlIHtcblx0XHRpbnN0ID0gbmV3IENvbXBvbmVudChwcm9wcywgY29udGV4dCk7XG5cdFx0aW5zdC5jb25zdHJ1Y3RvciA9IEN0b3I7XG5cdFx0aW5zdC5yZW5kZXIgPSBkb1JlbmRlcjtcblx0fVxuXG5cdHdoaWxlIChpLS0pIHtcblx0XHRpZiAocmVjeWNsZXJDb21wb25lbnRzW2ldLmNvbnN0cnVjdG9yID09PSBDdG9yKSB7XG5cdFx0XHRpbnN0Lm5leHRCYXNlID0gcmVjeWNsZXJDb21wb25lbnRzW2ldLm5leHRCYXNlO1xuXHRcdFx0cmVjeWNsZXJDb21wb25lbnRzLnNwbGljZShpLCAxKTtcblx0XHRcdHJldHVybiBpbnN0O1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBpbnN0O1xufVxuXG5mdW5jdGlvbiBkb1JlbmRlcihwcm9wcywgc3RhdGUsIGNvbnRleHQpIHtcblx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBzZXRDb21wb25lbnRQcm9wcyhjb21wb25lbnQsIHByb3BzLCByZW5kZXJNb2RlLCBjb250ZXh0LCBtb3VudEFsbCkge1xuXHRpZiAoY29tcG9uZW50Ll9kaXNhYmxlKSByZXR1cm47XG5cdGNvbXBvbmVudC5fZGlzYWJsZSA9IHRydWU7XG5cblx0Y29tcG9uZW50Ll9fcmVmID0gcHJvcHMucmVmO1xuXHRjb21wb25lbnQuX19rZXkgPSBwcm9wcy5rZXk7XG5cdGRlbGV0ZSBwcm9wcy5yZWY7XG5cdGRlbGV0ZSBwcm9wcy5rZXk7XG5cblx0aWYgKHR5cGVvZiBjb21wb25lbnQuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzID09PSAndW5kZWZpbmVkJykge1xuXHRcdGlmICghY29tcG9uZW50LmJhc2UgfHwgbW91bnRBbGwpIHtcblx0XHRcdGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KSBjb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KCk7XG5cdFx0fSBlbHNlIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykge1xuXHRcdFx0Y29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMsIGNvbnRleHQpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGNvbXBvbmVudC5jb250ZXh0KSB7XG5cdFx0aWYgKCFjb21wb25lbnQucHJldkNvbnRleHQpIGNvbXBvbmVudC5wcmV2Q29udGV4dCA9IGNvbXBvbmVudC5jb250ZXh0O1xuXHRcdGNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcblx0fVxuXG5cdGlmICghY29tcG9uZW50LnByZXZQcm9wcykgY29tcG9uZW50LnByZXZQcm9wcyA9IGNvbXBvbmVudC5wcm9wcztcblx0Y29tcG9uZW50LnByb3BzID0gcHJvcHM7XG5cblx0Y29tcG9uZW50Ll9kaXNhYmxlID0gZmFsc2U7XG5cblx0aWYgKHJlbmRlck1vZGUgIT09IDApIHtcblx0XHRpZiAocmVuZGVyTW9kZSA9PT0gMSB8fCBvcHRpb25zLnN5bmNDb21wb25lbnRVcGRhdGVzICE9PSBmYWxzZSB8fCAhY29tcG9uZW50LmJhc2UpIHtcblx0XHRcdHJlbmRlckNvbXBvbmVudChjb21wb25lbnQsIDEsIG1vdW50QWxsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZW5xdWV1ZVJlbmRlcihjb21wb25lbnQpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChjb21wb25lbnQuX19yZWYpIGNvbXBvbmVudC5fX3JlZihjb21wb25lbnQpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCByZW5kZXJNb2RlLCBtb3VudEFsbCwgaXNDaGlsZCkge1xuXHRpZiAoY29tcG9uZW50Ll9kaXNhYmxlKSByZXR1cm47XG5cblx0dmFyIHByb3BzID0gY29tcG9uZW50LnByb3BzLFxuXHQgICAgc3RhdGUgPSBjb21wb25lbnQuc3RhdGUsXG5cdCAgICBjb250ZXh0ID0gY29tcG9uZW50LmNvbnRleHQsXG5cdCAgICBwcmV2aW91c1Byb3BzID0gY29tcG9uZW50LnByZXZQcm9wcyB8fCBwcm9wcyxcblx0ICAgIHByZXZpb3VzU3RhdGUgPSBjb21wb25lbnQucHJldlN0YXRlIHx8IHN0YXRlLFxuXHQgICAgcHJldmlvdXNDb250ZXh0ID0gY29tcG9uZW50LnByZXZDb250ZXh0IHx8IGNvbnRleHQsXG5cdCAgICBpc1VwZGF0ZSA9IGNvbXBvbmVudC5iYXNlLFxuXHQgICAgbmV4dEJhc2UgPSBjb21wb25lbnQubmV4dEJhc2UsXG5cdCAgICBpbml0aWFsQmFzZSA9IGlzVXBkYXRlIHx8IG5leHRCYXNlLFxuXHQgICAgaW5pdGlhbENoaWxkQ29tcG9uZW50ID0gY29tcG9uZW50Ll9jb21wb25lbnQsXG5cdCAgICBza2lwID0gZmFsc2UsXG5cdCAgICBzbmFwc2hvdCA9IHByZXZpb3VzQ29udGV4dCxcblx0ICAgIHJlbmRlcmVkLFxuXHQgICAgaW5zdCxcblx0ICAgIGNiYXNlO1xuXG5cdGlmIChjb21wb25lbnQuY29uc3RydWN0b3IuZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzKSB7XG5cdFx0c3RhdGUgPSBleHRlbmQoZXh0ZW5kKHt9LCBzdGF0ZSksIGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSk7XG5cdFx0Y29tcG9uZW50LnN0YXRlID0gc3RhdGU7XG5cdH1cblxuXHRpZiAoaXNVcGRhdGUpIHtcblx0XHRjb21wb25lbnQucHJvcHMgPSBwcmV2aW91c1Byb3BzO1xuXHRcdGNvbXBvbmVudC5zdGF0ZSA9IHByZXZpb3VzU3RhdGU7XG5cdFx0Y29tcG9uZW50LmNvbnRleHQgPSBwcmV2aW91c0NvbnRleHQ7XG5cdFx0aWYgKHJlbmRlck1vZGUgIT09IDIgJiYgY29tcG9uZW50LnNob3VsZENvbXBvbmVudFVwZGF0ZSAmJiBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCkgPT09IGZhbHNlKSB7XG5cdFx0XHRza2lwID0gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKSB7XG5cdFx0XHRjb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZShwcm9wcywgc3RhdGUsIGNvbnRleHQpO1xuXHRcdH1cblx0XHRjb21wb25lbnQucHJvcHMgPSBwcm9wcztcblx0XHRjb21wb25lbnQuc3RhdGUgPSBzdGF0ZTtcblx0XHRjb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XG5cdH1cblxuXHRjb21wb25lbnQucHJldlByb3BzID0gY29tcG9uZW50LnByZXZTdGF0ZSA9IGNvbXBvbmVudC5wcmV2Q29udGV4dCA9IGNvbXBvbmVudC5uZXh0QmFzZSA9IG51bGw7XG5cdGNvbXBvbmVudC5fZGlydHkgPSBmYWxzZTtcblxuXHRpZiAoIXNraXApIHtcblx0XHRyZW5kZXJlZCA9IGNvbXBvbmVudC5yZW5kZXIocHJvcHMsIHN0YXRlLCBjb250ZXh0KTtcblxuXHRcdGlmIChjb21wb25lbnQuZ2V0Q2hpbGRDb250ZXh0KSB7XG5cdFx0XHRjb250ZXh0ID0gZXh0ZW5kKGV4dGVuZCh7fSwgY29udGV4dCksIGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQoKSk7XG5cdFx0fVxuXG5cdFx0aWYgKGlzVXBkYXRlICYmIGNvbXBvbmVudC5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSkge1xuXHRcdFx0c25hcHNob3QgPSBjb21wb25lbnQuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUocHJldmlvdXNQcm9wcywgcHJldmlvdXNTdGF0ZSk7XG5cdFx0fVxuXG5cdFx0dmFyIGNoaWxkQ29tcG9uZW50ID0gcmVuZGVyZWQgJiYgcmVuZGVyZWQubm9kZU5hbWUsXG5cdFx0ICAgIHRvVW5tb3VudCxcblx0XHQgICAgYmFzZTtcblxuXHRcdGlmICh0eXBlb2YgY2hpbGRDb21wb25lbnQgPT09ICdmdW5jdGlvbicpIHtcblxuXHRcdFx0dmFyIGNoaWxkUHJvcHMgPSBnZXROb2RlUHJvcHMocmVuZGVyZWQpO1xuXHRcdFx0aW5zdCA9IGluaXRpYWxDaGlsZENvbXBvbmVudDtcblxuXHRcdFx0aWYgKGluc3QgJiYgaW5zdC5jb25zdHJ1Y3RvciA9PT0gY2hpbGRDb21wb25lbnQgJiYgY2hpbGRQcm9wcy5rZXkgPT0gaW5zdC5fX2tleSkge1xuXHRcdFx0XHRzZXRDb21wb25lbnRQcm9wcyhpbnN0LCBjaGlsZFByb3BzLCAxLCBjb250ZXh0LCBmYWxzZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0b1VubW91bnQgPSBpbnN0O1xuXG5cdFx0XHRcdGNvbXBvbmVudC5fY29tcG9uZW50ID0gaW5zdCA9IGNyZWF0ZUNvbXBvbmVudChjaGlsZENvbXBvbmVudCwgY2hpbGRQcm9wcywgY29udGV4dCk7XG5cdFx0XHRcdGluc3QubmV4dEJhc2UgPSBpbnN0Lm5leHRCYXNlIHx8IG5leHRCYXNlO1xuXHRcdFx0XHRpbnN0Ll9wYXJlbnRDb21wb25lbnQgPSBjb21wb25lbnQ7XG5cdFx0XHRcdHNldENvbXBvbmVudFByb3BzKGluc3QsIGNoaWxkUHJvcHMsIDAsIGNvbnRleHQsIGZhbHNlKTtcblx0XHRcdFx0cmVuZGVyQ29tcG9uZW50KGluc3QsIDEsIG1vdW50QWxsLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0YmFzZSA9IGluc3QuYmFzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2Jhc2UgPSBpbml0aWFsQmFzZTtcblxuXHRcdFx0dG9Vbm1vdW50ID0gaW5pdGlhbENoaWxkQ29tcG9uZW50O1xuXHRcdFx0aWYgKHRvVW5tb3VudCkge1xuXHRcdFx0XHRjYmFzZSA9IGNvbXBvbmVudC5fY29tcG9uZW50ID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGluaXRpYWxCYXNlIHx8IHJlbmRlck1vZGUgPT09IDEpIHtcblx0XHRcdFx0aWYgKGNiYXNlKSBjYmFzZS5fY29tcG9uZW50ID0gbnVsbDtcblx0XHRcdFx0YmFzZSA9IGRpZmYoY2Jhc2UsIHJlbmRlcmVkLCBjb250ZXh0LCBtb3VudEFsbCB8fCAhaXNVcGRhdGUsIGluaXRpYWxCYXNlICYmIGluaXRpYWxCYXNlLnBhcmVudE5vZGUsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpbml0aWFsQmFzZSAmJiBiYXNlICE9PSBpbml0aWFsQmFzZSAmJiBpbnN0ICE9PSBpbml0aWFsQ2hpbGRDb21wb25lbnQpIHtcblx0XHRcdHZhciBiYXNlUGFyZW50ID0gaW5pdGlhbEJhc2UucGFyZW50Tm9kZTtcblx0XHRcdGlmIChiYXNlUGFyZW50ICYmIGJhc2UgIT09IGJhc2VQYXJlbnQpIHtcblx0XHRcdFx0YmFzZVBhcmVudC5yZXBsYWNlQ2hpbGQoYmFzZSwgaW5pdGlhbEJhc2UpO1xuXG5cdFx0XHRcdGlmICghdG9Vbm1vdW50KSB7XG5cdFx0XHRcdFx0aW5pdGlhbEJhc2UuX2NvbXBvbmVudCA9IG51bGw7XG5cdFx0XHRcdFx0cmVjb2xsZWN0Tm9kZVRyZWUoaW5pdGlhbEJhc2UsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0b1VubW91bnQpIHtcblx0XHRcdHVubW91bnRDb21wb25lbnQodG9Vbm1vdW50KTtcblx0XHR9XG5cblx0XHRjb21wb25lbnQuYmFzZSA9IGJhc2U7XG5cdFx0aWYgKGJhc2UgJiYgIWlzQ2hpbGQpIHtcblx0XHRcdHZhciBjb21wb25lbnRSZWYgPSBjb21wb25lbnQsXG5cdFx0XHQgICAgdCA9IGNvbXBvbmVudDtcblx0XHRcdHdoaWxlICh0ID0gdC5fcGFyZW50Q29tcG9uZW50KSB7XG5cdFx0XHRcdChjb21wb25lbnRSZWYgPSB0KS5iYXNlID0gYmFzZTtcblx0XHRcdH1cblx0XHRcdGJhc2UuX2NvbXBvbmVudCA9IGNvbXBvbmVudFJlZjtcblx0XHRcdGJhc2UuX2NvbXBvbmVudENvbnN0cnVjdG9yID0gY29tcG9uZW50UmVmLmNvbnN0cnVjdG9yO1xuXHRcdH1cblx0fVxuXG5cdGlmICghaXNVcGRhdGUgfHwgbW91bnRBbGwpIHtcblx0XHRtb3VudHMudW5zaGlmdChjb21wb25lbnQpO1xuXHR9IGVsc2UgaWYgKCFza2lwKSB7XG5cblx0XHRpZiAoY29tcG9uZW50LmNvbXBvbmVudERpZFVwZGF0ZSkge1xuXHRcdFx0Y29tcG9uZW50LmNvbXBvbmVudERpZFVwZGF0ZShwcmV2aW91c1Byb3BzLCBwcmV2aW91c1N0YXRlLCBzbmFwc2hvdCk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLmFmdGVyVXBkYXRlKSBvcHRpb25zLmFmdGVyVXBkYXRlKGNvbXBvbmVudCk7XG5cdH1cblxuXHR3aGlsZSAoY29tcG9uZW50Ll9yZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0Y29tcG9uZW50Ll9yZW5kZXJDYWxsYmFja3MucG9wKCkuY2FsbChjb21wb25lbnQpO1xuXHR9aWYgKCFkaWZmTGV2ZWwgJiYgIWlzQ2hpbGQpIGZsdXNoTW91bnRzKCk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKSB7XG5cdHZhciBjID0gZG9tICYmIGRvbS5fY29tcG9uZW50LFxuXHQgICAgb3JpZ2luYWxDb21wb25lbnQgPSBjLFxuXHQgICAgb2xkRG9tID0gZG9tLFxuXHQgICAgaXNEaXJlY3RPd25lciA9IGMgJiYgZG9tLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWUsXG5cdCAgICBpc093bmVyID0gaXNEaXJlY3RPd25lcixcblx0ICAgIHByb3BzID0gZ2V0Tm9kZVByb3BzKHZub2RlKTtcblx0d2hpbGUgKGMgJiYgIWlzT3duZXIgJiYgKGMgPSBjLl9wYXJlbnRDb21wb25lbnQpKSB7XG5cdFx0aXNPd25lciA9IGMuY29uc3RydWN0b3IgPT09IHZub2RlLm5vZGVOYW1lO1xuXHR9XG5cblx0aWYgKGMgJiYgaXNPd25lciAmJiAoIW1vdW50QWxsIHx8IGMuX2NvbXBvbmVudCkpIHtcblx0XHRzZXRDb21wb25lbnRQcm9wcyhjLCBwcm9wcywgMywgY29udGV4dCwgbW91bnRBbGwpO1xuXHRcdGRvbSA9IGMuYmFzZTtcblx0fSBlbHNlIHtcblx0XHRpZiAob3JpZ2luYWxDb21wb25lbnQgJiYgIWlzRGlyZWN0T3duZXIpIHtcblx0XHRcdHVubW91bnRDb21wb25lbnQob3JpZ2luYWxDb21wb25lbnQpO1xuXHRcdFx0ZG9tID0gb2xkRG9tID0gbnVsbDtcblx0XHR9XG5cblx0XHRjID0gY3JlYXRlQ29tcG9uZW50KHZub2RlLm5vZGVOYW1lLCBwcm9wcywgY29udGV4dCk7XG5cdFx0aWYgKGRvbSAmJiAhYy5uZXh0QmFzZSkge1xuXHRcdFx0Yy5uZXh0QmFzZSA9IGRvbTtcblxuXHRcdFx0b2xkRG9tID0gbnVsbDtcblx0XHR9XG5cdFx0c2V0Q29tcG9uZW50UHJvcHMoYywgcHJvcHMsIDEsIGNvbnRleHQsIG1vdW50QWxsKTtcblx0XHRkb20gPSBjLmJhc2U7XG5cblx0XHRpZiAob2xkRG9tICYmIGRvbSAhPT0gb2xkRG9tKSB7XG5cdFx0XHRvbGREb20uX2NvbXBvbmVudCA9IG51bGw7XG5cdFx0XHRyZWNvbGxlY3ROb2RlVHJlZShvbGREb20sIGZhbHNlKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZG9tO1xufVxuXG5mdW5jdGlvbiB1bm1vdW50Q29tcG9uZW50KGNvbXBvbmVudCkge1xuXHRpZiAob3B0aW9ucy5iZWZvcmVVbm1vdW50KSBvcHRpb25zLmJlZm9yZVVubW91bnQoY29tcG9uZW50KTtcblxuXHR2YXIgYmFzZSA9IGNvbXBvbmVudC5iYXNlO1xuXG5cdGNvbXBvbmVudC5fZGlzYWJsZSA9IHRydWU7XG5cblx0aWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cblx0Y29tcG9uZW50LmJhc2UgPSBudWxsO1xuXG5cdHZhciBpbm5lciA9IGNvbXBvbmVudC5fY29tcG9uZW50O1xuXHRpZiAoaW5uZXIpIHtcblx0XHR1bm1vdW50Q29tcG9uZW50KGlubmVyKTtcblx0fSBlbHNlIGlmIChiYXNlKSB7XG5cdFx0aWYgKGJhc2VbJ19fcHJlYWN0YXR0cl8nXSAmJiBiYXNlWydfX3ByZWFjdGF0dHJfJ10ucmVmKSBiYXNlWydfX3ByZWFjdGF0dHJfJ10ucmVmKG51bGwpO1xuXG5cdFx0Y29tcG9uZW50Lm5leHRCYXNlID0gYmFzZTtcblxuXHRcdHJlbW92ZU5vZGUoYmFzZSk7XG5cdFx0cmVjeWNsZXJDb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcblxuXHRcdHJlbW92ZUNoaWxkcmVuKGJhc2UpO1xuXHR9XG5cblx0aWYgKGNvbXBvbmVudC5fX3JlZikgY29tcG9uZW50Ll9fcmVmKG51bGwpO1xufVxuXG5mdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpIHtcblx0dGhpcy5fZGlydHkgPSB0cnVlO1xuXG5cdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cblx0dGhpcy5wcm9wcyA9IHByb3BzO1xuXG5cdHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlIHx8IHt9O1xuXG5cdHRoaXMuX3JlbmRlckNhbGxiYWNrcyA9IFtdO1xufVxuXG5leHRlbmQoQ29tcG9uZW50LnByb3RvdHlwZSwge1xuXHRzZXRTdGF0ZTogZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUsIGNhbGxiYWNrKSB7XG5cdFx0aWYgKCF0aGlzLnByZXZTdGF0ZSkgdGhpcy5wcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuXHRcdHRoaXMuc3RhdGUgPSBleHRlbmQoZXh0ZW5kKHt9LCB0aGlzLnN0YXRlKSwgdHlwZW9mIHN0YXRlID09PSAnZnVuY3Rpb24nID8gc3RhdGUodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcykgOiBzdGF0ZSk7XG5cdFx0aWYgKGNhbGxiYWNrKSB0aGlzLl9yZW5kZXJDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0ZW5xdWV1ZVJlbmRlcih0aGlzKTtcblx0fSxcblx0Zm9yY2VVcGRhdGU6IGZ1bmN0aW9uIGZvcmNlVXBkYXRlKGNhbGxiYWNrKSB7XG5cdFx0aWYgKGNhbGxiYWNrKSB0aGlzLl9yZW5kZXJDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0cmVuZGVyQ29tcG9uZW50KHRoaXMsIDIpO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHt9XG59KTtcblxuZnVuY3Rpb24gcmVuZGVyKHZub2RlLCBwYXJlbnQsIG1lcmdlKSB7XG4gIHJldHVybiBkaWZmKG1lcmdlLCB2bm9kZSwge30sIGZhbHNlLCBwYXJlbnQsIGZhbHNlKTtcbn1cblxudmFyIHByZWFjdCA9IHtcblx0aDogaCxcblx0Y3JlYXRlRWxlbWVudDogaCxcblx0Y2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG5cdENvbXBvbmVudDogQ29tcG9uZW50LFxuXHRyZW5kZXI6IHJlbmRlcixcblx0cmVyZW5kZXI6IHJlcmVuZGVyLFxuXHRvcHRpb25zOiBvcHRpb25zXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwcmVhY3Q7XG5leHBvcnQgeyBoLCBoIGFzIGNyZWF0ZUVsZW1lbnQsIGNsb25lRWxlbWVudCwgQ29tcG9uZW50LCByZW5kZXIsIHJlcmVuZGVyLCBvcHRpb25zIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QubWpzLm1hcFxuIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS43JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWV0aG9kLCBhcmcpIHtcbiAgcmV0dXJuICEhbWV0aG9kICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsXG4gICAgYXJnID8gbWV0aG9kLmNhbGwobnVsbCwgZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAxKSA6IG1ldGhvZC5jYWxsKG51bGwpO1xuICB9KTtcbn07XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgRlByb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIG5hbWVSRSA9IC9eXFxzKmZ1bmN0aW9uIChbXiAoXSopLztcbnZhciBOQU1FID0gJ25hbWUnO1xuXG4vLyAxOS4yLjQuMiBuYW1lXG5OQU1FIGluIEZQcm90byB8fCByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmIGRQKEZQcm90bywgTkFNRSwge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKCcnICsgdGhpcykubWF0Y2gobmFtZVJFKVsxXTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgxKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKFtdLm1hcCwgdHJ1ZSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4zLjE1IC8gMTUuNC40LjE5IEFycmF5LnByb3RvdHlwZS5tYXAoY2FsbGJhY2tmbiBbLCB0aGlzQXJnXSlcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHNbMV0pO1xuICB9XG59KTtcbiIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBhc2MgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVFlQRSwgJGNyZWF0ZSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHZhciBjcmVhdGUgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSU9iamVjdChPKTtcbiAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbCwgcmVzO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgcmVzdWx0W2luZGV4XSA9IHJlczsgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzKSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYgKElTX0VWRVJZKSByZXR1cm4gZmFsc2U7IC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59O1xuIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRpbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgJG5hdGl2ZSA9IFtdLmluZGV4T2Y7XG52YXIgTkVHQVRJVkVfWkVSTyA9ICEhJG5hdGl2ZSAmJiAxIC8gWzFdLmluZGV4T2YoMSwgLTApIDwgMDtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoTkVHQVRJVkVfWkVSTyB8fCAhcmVxdWlyZSgnLi9fc3RyaWN0LW1ldGhvZCcpKCRuYXRpdmUpKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuMTEgLyAxNS40LjQuMTQgQXJyYXkucHJvdG90eXBlLmluZGV4T2Yoc2VhcmNoRWxlbWVudCBbLCBmcm9tSW5kZXhdKVxuICBpbmRleE9mOiBmdW5jdGlvbiBpbmRleE9mKHNlYXJjaEVsZW1lbnQgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gJG5hdGl2ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG4iLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgY3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJykgfSk7XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCByZW5kZXIgfSBmcm9tICdwcmVhY3QnIC8qKiBAanN4IGNyZWF0ZUVsZW1lbnQgKi9cbmltcG9ydCBBdXRvY29tcGxldGUgZnJvbSAnLi9hdXRvY29tcGxldGUnXG5cbmZ1bmN0aW9uIGFjY2Vzc2libGVBdXRvY29tcGxldGUgKG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zLmVsZW1lbnQpIHsgdGhyb3cgbmV3IEVycm9yKCdlbGVtZW50IGlzIG5vdCBkZWZpbmVkJykgfVxuICBpZiAoIW9wdGlvbnMuaWQpIHsgdGhyb3cgbmV3IEVycm9yKCdpZCBpcyBub3QgZGVmaW5lZCcpIH1cbiAgaWYgKCFvcHRpb25zLnNvdXJjZSkgeyB0aHJvdyBuZXcgRXJyb3IoJ3NvdXJjZSBpcyBub3QgZGVmaW5lZCcpIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5zb3VyY2UpKSB7XG4gICAgb3B0aW9ucy5zb3VyY2UgPSBjcmVhdGVTaW1wbGVFbmdpbmUob3B0aW9ucy5zb3VyY2UpXG4gIH1cbiAgcmVuZGVyKDxBdXRvY29tcGxldGUgey4uLm9wdGlvbnN9IC8+LCBvcHRpb25zLmVsZW1lbnQpXG59XG5cbmNvbnN0IGNyZWF0ZVNpbXBsZUVuZ2luZSA9ICh2YWx1ZXMpID0+IChxdWVyeSwgc3luY1Jlc3VsdHMpID0+IHtcbiAgaWYgKCFxdWVyeSkge1xuICAgIHN5bmNSZXN1bHRzKFtdKVxuICB9IGVsc2Uge1xuICAgIHZhciBtYXRjaGVzID0gdmFsdWVzLmZpbHRlcihyID0+IHIudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpICE9PSAtMSlcbiAgICBzeW5jUmVzdWx0cyhtYXRjaGVzKVxuICB9XG59XG5cbmFjY2Vzc2libGVBdXRvY29tcGxldGUuZW5oYW5jZVNlbGVjdEVsZW1lbnQgPSAoY29uZmlndXJhdGlvbk9wdGlvbnMpID0+IHtcbiAgaWYgKCFjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50KSB7IHRocm93IG5ldyBFcnJvcignc2VsZWN0RWxlbWVudCBpcyBub3QgZGVmaW5lZCcpIH1cblxuICAvLyBTZXQgZGVmYXVsdHMuXG4gIGlmICghY29uZmlndXJhdGlvbk9wdGlvbnMuc291cmNlKSB7XG4gICAgbGV0IGF2YWlsYWJsZU9wdGlvbnMgPSBbXS5maWx0ZXIuY2FsbChjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMsIG9wdGlvbiA9PiAob3B0aW9uLnZhbHVlIHx8IGNvbmZpZ3VyYXRpb25PcHRpb25zLnByZXNlcnZlTnVsbE9wdGlvbnMpKVxuICAgIGNvbmZpZ3VyYXRpb25PcHRpb25zLnNvdXJjZSA9IGF2YWlsYWJsZU9wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24udGV4dENvbnRlbnQgfHwgb3B0aW9uLmlubmVyVGV4dClcbiAgfVxuICBjb25maWd1cmF0aW9uT3B0aW9ucy5vbkNvbmZpcm0gPSBjb25maWd1cmF0aW9uT3B0aW9ucy5vbkNvbmZpcm0gfHwgKHF1ZXJ5ID0+IHtcbiAgICBjb25zdCByZXF1ZXN0ZWRPcHRpb24gPSBbXS5maWx0ZXIuY2FsbChjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50Lm9wdGlvbnMsIG9wdGlvbiA9PiAob3B0aW9uLnRleHRDb250ZW50IHx8IG9wdGlvbi5pbm5lclRleHQpID09PSBxdWVyeSlbMF1cbiAgICBpZiAocmVxdWVzdGVkT3B0aW9uKSB7IHJlcXVlc3RlZE9wdGlvbi5zZWxlY3RlZCA9IHRydWUgfVxuICB9KVxuXG4gIGlmIChjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50LnZhbHVlIHx8IGNvbmZpZ3VyYXRpb25PcHRpb25zLmRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudC5vcHRpb25zW2NvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQub3B0aW9ucy5zZWxlY3RlZEluZGV4XVxuICAgIGNvbmZpZ3VyYXRpb25PcHRpb25zLmRlZmF1bHRWYWx1ZSA9IG9wdGlvbi50ZXh0Q29udGVudCB8fCBvcHRpb24uaW5uZXJUZXh0XG4gIH1cblxuICBpZiAoY29uZmlndXJhdGlvbk9wdGlvbnMubmFtZSA9PT0gdW5kZWZpbmVkKSBjb25maWd1cmF0aW9uT3B0aW9ucy5uYW1lID0gJydcbiAgaWYgKGNvbmZpZ3VyYXRpb25PcHRpb25zLmlkID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudC5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25maWd1cmF0aW9uT3B0aW9ucy5pZCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZ3VyYXRpb25PcHRpb25zLmlkID0gY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudC5pZFxuICAgIH1cbiAgfVxuICBpZiAoY29uZmlndXJhdGlvbk9wdGlvbnMuYXV0b3NlbGVjdCA9PT0gdW5kZWZpbmVkKSBjb25maWd1cmF0aW9uT3B0aW9ucy5hdXRvc2VsZWN0ID0gdHJ1ZVxuXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIGNvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudCwgY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudClcblxuICBhY2Nlc3NpYmxlQXV0b2NvbXBsZXRlKHtcbiAgICAuLi5jb25maWd1cmF0aW9uT3B0aW9ucyxcbiAgICBlbGVtZW50OiBlbGVtZW50XG4gIH0pXG5cbiAgY29uZmlndXJhdGlvbk9wdGlvbnMuc2VsZWN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIGNvbmZpZ3VyYXRpb25PcHRpb25zLnNlbGVjdEVsZW1lbnQuaWQgPSBjb25maWd1cmF0aW9uT3B0aW9ucy5zZWxlY3RFbGVtZW50LmlkICsgJy1zZWxlY3QnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFjY2Vzc2libGVBdXRvY29tcGxldGVcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuL19pcy1hcnJheScpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWwpKSB7XG4gICAgQyA9IG9yaWdpbmFsLmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSkgQyA9IHVuZGVmaW5lZDtcbiAgICBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkZmlsdGVyID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDIpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19zdHJpY3QtbWV0aG9kJykoW10uZmlsdGVyLCB0cnVlKSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjMuNyAvIDE1LjQuNC4yMCBBcnJheS5wcm90b3R5cGUuZmlsdGVyKGNhbGxiYWNrZm4gWywgdGhpc0FyZ10pXG4gIGZpbHRlcjogZnVuY3Rpb24gZmlsdGVyKGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRmaWx0ZXIodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzWzFdKTtcbiAgfVxufSk7XG4iLCIvLyAyMi4xLjIuMiAvIDE1LjQuMy4yIEFycmF5LmlzQXJyYXkoYXJnKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdBcnJheScsIHsgaXNBcnJheTogcmVxdWlyZSgnLi9faXMtYXJyYXknKSB9KTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCcgLyoqIEBqc3ggY3JlYXRlRWxlbWVudCAqL1xuaW1wb3J0IFN0YXR1cyBmcm9tICcuL3N0YXR1cydcbmltcG9ydCBEcm9wZG93bkFycm93RG93biBmcm9tICcuL2Ryb3Bkb3duLWFycm93LWRvd24nXG5cbmNvbnN0IElTX1BSRUFDVCA9IHByb2Nlc3MuZW52LkNPTVBPTkVOVF9MSUJSQVJZID09PSAnUFJFQUNUJ1xuY29uc3QgSVNfUkVBQ1QgPSBwcm9jZXNzLmVudi5DT01QT05FTlRfTElCUkFSWSA9PT0gJ1JFQUNUJ1xuXG5jb25zdCBrZXlDb2RlcyA9IHtcbiAgMTM6ICdlbnRlcicsXG4gIDI3OiAnZXNjYXBlJyxcbiAgMzI6ICdzcGFjZScsXG4gIDM4OiAndXAnLFxuICA0MDogJ2Rvd24nXG59XG5cbmZ1bmN0aW9uIGlzSW9zRGV2aWNlICgpIHtcbiAgcmV0dXJuIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUG9kfGlQaG9uZXxpUGFkKS9nKSAmJiBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdC9nKSlcbn1cblxuZnVuY3Rpb24gaXNQcmludGFibGVLZXlDb2RlIChrZXlDb2RlKSB7XG4gIHJldHVybiAoXG4gICAgKGtleUNvZGUgPiA0NyAmJiBrZXlDb2RlIDwgNTgpIHx8IC8vIG51bWJlciBrZXlzXG4gICAga2V5Q29kZSA9PT0gMzIgfHwga2V5Q29kZSA9PT0gOCB8fCAvLyBzcGFjZWJhciBvciBiYWNrc3BhY2VcbiAgICAoa2V5Q29kZSA+IDY0ICYmIGtleUNvZGUgPCA5MSkgfHwgLy8gbGV0dGVyIGtleXNcbiAgICAoa2V5Q29kZSA+IDk1ICYmIGtleUNvZGUgPCAxMTIpIHx8IC8vIG51bXBhZCBrZXlzXG4gICAgKGtleUNvZGUgPiAxODUgJiYga2V5Q29kZSA8IDE5MykgfHwgLy8gOz0sLS4vYCAoaW4gb3JkZXIpXG4gICAgKGtleUNvZGUgPiAyMTggJiYga2V5Q29kZSA8IDIyMykgLy8gW1xcXScgKGluIG9yZGVyKVxuICApXG59XG5cbi8vIFByZWFjdCBkb2VzIG5vdCBpbXBsZW1lbnQgb25DaGFuZ2Ugb24gaW5wdXRzLCBidXQgUmVhY3QgZG9lcy5cbmZ1bmN0aW9uIG9uQ2hhbmdlQ3Jvc3NMaWJyYXJ5IChoYW5kbGVyKSB7XG4gIGlmIChJU19QUkVBQ1QpIHsgcmV0dXJuIHsgb25JbnB1dDogaGFuZGxlciB9IH1cbiAgaWYgKElTX1JFQUNUKSB7IHJldHVybiB7IG9uQ2hhbmdlOiBoYW5kbGVyIH0gfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvY29tcGxldGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGF1dG9zZWxlY3Q6IGZhbHNlLFxuICAgIGNzc05hbWVzcGFjZTogJ2F1dG9jb21wbGV0ZScsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBkaXNwbGF5TWVudTogJ2lubGluZScsXG4gICAgbWluTGVuZ3RoOiAwLFxuICAgIG5hbWU6ICdpbnB1dC1hdXRvY29tcGxldGUnLFxuICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICBvbkNvbmZpcm06ICgpID0+IHt9LFxuICAgIGNvbmZpcm1PbkJsdXI6IHRydWUsXG4gICAgc2hvd05vT3B0aW9uc0ZvdW5kOiB0cnVlLFxuICAgIHNob3dBbGxWYWx1ZXM6IGZhbHNlLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0Tm9SZXN1bHRzOiAoKSA9PiAnTm8gcmVzdWx0cyBmb3VuZCcsXG4gICAgdEFzc2lzdGl2ZUhpbnQ6ICgpID0+ICdXaGVuIGF1dG9jb21wbGV0ZSByZXN1bHRzIGFyZSBhdmFpbGFibGUgdXNlIHVwIGFuZCBkb3duIGFycm93cyB0byByZXZpZXcgYW5kIGVudGVyIHRvIHNlbGVjdC4gIFRvdWNoIGRldmljZSB1c2VycywgZXhwbG9yZSBieSB0b3VjaCBvciB3aXRoIHN3aXBlIGdlc3R1cmVzLicsXG4gICAgZHJvcGRvd25BcnJvdzogRHJvcGRvd25BcnJvd0Rvd24sXG4gICAgYXJpYUxhYmVsbGVkQnk6IHVuZGVmaW5lZFxuICB9XG5cbiAgZWxlbWVudFJlZmVyZW5jZXMgPSB7fVxuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZvY3VzZWQ6IG51bGwsXG4gICAgICBob3ZlcmVkOiBudWxsLFxuICAgICAgbWVudU9wZW46IGZhbHNlLFxuICAgICAgb3B0aW9uczogcHJvcHMuZGVmYXVsdFZhbHVlID8gW3Byb3BzLmRlZmF1bHRWYWx1ZV0gOiBbXSxcbiAgICAgIHF1ZXJ5OiBwcm9wcy5kZWZhdWx0VmFsdWUsXG4gICAgICB2YWxpZENob2ljZU1hZGU6IGZhbHNlLFxuICAgICAgc2VsZWN0ZWQ6IG51bGwsXG4gICAgICBhcmlhSGludDogdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlQ29tcG9uZW50Qmx1ciA9IHRoaXMuaGFuZGxlQ29tcG9uZW50Qmx1ci5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVLZXlEb3duID0gdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZVVwQXJyb3cgPSB0aGlzLmhhbmRsZVVwQXJyb3cuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlRG93bkFycm93ID0gdGhpcy5oYW5kbGVEb3duQXJyb3cuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlRW50ZXIgPSB0aGlzLmhhbmRsZUVudGVyLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZVByaW50YWJsZUtleSA9IHRoaXMuaGFuZGxlUHJpbnRhYmxlS2V5LmJpbmQodGhpcylcblxuICAgIHRoaXMuaGFuZGxlTGlzdE1vdXNlTGVhdmUgPSB0aGlzLmhhbmRsZUxpc3RNb3VzZUxlYXZlLmJpbmQodGhpcylcblxuICAgIHRoaXMuaGFuZGxlT3B0aW9uQmx1ciA9IHRoaXMuaGFuZGxlT3B0aW9uQmx1ci5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayA9IHRoaXMuaGFuZGxlT3B0aW9uQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlT3B0aW9uRm9jdXMgPSB0aGlzLmhhbmRsZU9wdGlvbkZvY3VzLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZU9wdGlvbk1vdXNlRG93biA9IHRoaXMuaGFuZGxlT3B0aW9uTW91c2VEb3duLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZU9wdGlvbk1vdXNlRW50ZXIgPSB0aGlzLmhhbmRsZU9wdGlvbk1vdXNlRW50ZXIuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5oYW5kbGVJbnB1dEJsdXIgPSB0aGlzLmhhbmRsZUlucHV0Qmx1ci5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSA9IHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlSW5wdXRGb2N1cyA9IHRoaXMuaGFuZGxlSW5wdXRGb2N1cy5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLnBvbGxJbnB1dEVsZW1lbnQgPSB0aGlzLnBvbGxJbnB1dEVsZW1lbnQuYmluZCh0aGlzKVxuICAgIHRoaXMuZ2V0RGlyZWN0SW5wdXRDaGFuZ2VzID0gdGhpcy5nZXREaXJlY3RJbnB1dENoYW5nZXMuYmluZCh0aGlzKVxuICB9XG5cbiAgaXNRdWVyeUFuT3B0aW9uIChxdWVyeSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLm1hcChlbnRyeSA9PiB0aGlzLnRlbXBsYXRlSW5wdXRWYWx1ZShlbnRyeSkudG9Mb3dlckNhc2UoKSkuaW5kZXhPZihxdWVyeS50b0xvd2VyQ2FzZSgpKSAhPT0gLTFcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLnBvbGxJbnB1dEVsZW1lbnQoKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLiRwb2xsSW5wdXQpXG4gIH1cblxuICAvLyBBcHBsaWNhdGlvbnMgbGlrZSBEcmFnb24gTmF0dXJhbGx5U3BlYWtpbmcgd2lsbCBtb2RpZnkgdGhlXG4gIC8vIGBpbnB1dGAgZmllbGQgYnkgZGlyZWN0bHkgY2hhbmdpbmcgaXRzIGAudmFsdWVgLiBUaGVzZSBldmVudHNcbiAgLy8gZG9uJ3QgdHJpZ2dlciBvdXIgSmF2YVNjcmlwdCBldmVudCBsaXN0ZW5lcnMsIHNvIHdlIG5lZWQgdG8gcG9sbFxuICAvLyB0byBoYW5kbGUgd2hlbiBhbmQgaWYgdGhleSBvY2N1ci5cbiAgcG9sbElucHV0RWxlbWVudCAoKSB7XG4gICAgdGhpcy5nZXREaXJlY3RJbnB1dENoYW5nZXMoKVxuICAgIHRoaXMuJHBvbGxJbnB1dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wb2xsSW5wdXRFbGVtZW50KClcbiAgICB9LCAxMDApXG4gIH1cblxuICBnZXREaXJlY3RJbnB1dENoYW5nZXMgKCkge1xuICAgIGNvbnN0IGlucHV0UmVmZXJlbmNlID0gdGhpcy5lbGVtZW50UmVmZXJlbmNlc1stMV1cbiAgICBjb25zdCBxdWVyeUhhc0NoYW5nZWQgPSBpbnB1dFJlZmVyZW5jZSAmJiBpbnB1dFJlZmVyZW5jZS52YWx1ZSAhPT0gdGhpcy5zdGF0ZS5xdWVyeVxuXG4gICAgaWYgKHF1ZXJ5SGFzQ2hhbmdlZCkge1xuICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSh7IHRhcmdldDogeyB2YWx1ZTogaW5wdXRSZWZlcmVuY2UudmFsdWUgfSB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSAocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBjb25zdCB7IGZvY3VzZWQgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBjb21wb25lbnRMb3N0Rm9jdXMgPSBmb2N1c2VkID09PSBudWxsXG4gICAgY29uc3QgZm9jdXNlZENoYW5nZWQgPSBwcmV2U3RhdGUuZm9jdXNlZCAhPT0gZm9jdXNlZFxuICAgIGNvbnN0IGZvY3VzRGlmZmVyZW50RWxlbWVudCA9IGZvY3VzZWRDaGFuZ2VkICYmICFjb21wb25lbnRMb3N0Rm9jdXNcbiAgICBpZiAoZm9jdXNEaWZmZXJlbnRFbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWZlcmVuY2VzW2ZvY3VzZWRdLmZvY3VzKClcbiAgICB9XG4gICAgY29uc3QgZm9jdXNlZElucHV0ID0gZm9jdXNlZCA9PT0gLTFcbiAgICBjb25zdCBjb21wb25lbnRHYWluZWRGb2N1cyA9IGZvY3VzZWRDaGFuZ2VkICYmIHByZXZTdGF0ZS5mb2N1c2VkID09PSBudWxsXG4gICAgY29uc3Qgc2VsZWN0QWxsVGV4dCA9IGZvY3VzZWRJbnB1dCAmJiBjb21wb25lbnRHYWluZWRGb2N1c1xuICAgIGlmIChzZWxlY3RBbGxUZXh0KSB7XG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWZlcmVuY2VzW2ZvY3VzZWRdXG4gICAgICBpbnB1dEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgaW5wdXRFbGVtZW50LnZhbHVlLmxlbmd0aClcbiAgICB9XG4gIH1cblxuICBoYXNBdXRvc2VsZWN0ICgpIHtcbiAgICByZXR1cm4gaXNJb3NEZXZpY2UoKSA/IGZhbHNlIDogdGhpcy5wcm9wcy5hdXRvc2VsZWN0XG4gIH1cblxuICAvLyBUaGlzIHRlbXBsYXRlIGlzIHVzZWQgd2hlbiBjb252ZXJ0aW5nIGZyb20gYSBzdGF0ZS5vcHRpb25zIG9iamVjdCBpbnRvIGEgc3RhdGUucXVlcnkuXG4gIHRlbXBsYXRlSW5wdXRWYWx1ZSAodmFsdWUpIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlVGVtcGxhdGUgPSB0aGlzLnByb3BzLnRlbXBsYXRlcyAmJiB0aGlzLnByb3BzLnRlbXBsYXRlcy5pbnB1dFZhbHVlXG4gICAgcmV0dXJuIGlucHV0VmFsdWVUZW1wbGF0ZSA/IGlucHV0VmFsdWVUZW1wbGF0ZSh2YWx1ZSkgOiB2YWx1ZVxuICB9XG5cbiAgLy8gVGhpcyB0ZW1wbGF0ZSBpcyB1c2VkIHdoZW4gZGlzcGxheWluZyByZXN1bHRzIC8gc3VnZ2VzdGlvbnMuXG4gIHRlbXBsYXRlU3VnZ2VzdGlvbiAodmFsdWUpIHtcbiAgICBjb25zdCBzdWdnZXN0aW9uVGVtcGxhdGUgPSB0aGlzLnByb3BzLnRlbXBsYXRlcyAmJiB0aGlzLnByb3BzLnRlbXBsYXRlcy5zdWdnZXN0aW9uXG4gICAgcmV0dXJuIHN1Z2dlc3Rpb25UZW1wbGF0ZSA/IHN1Z2dlc3Rpb25UZW1wbGF0ZSh2YWx1ZSkgOiB2YWx1ZVxuICB9XG5cbiAgaGFuZGxlQ29tcG9uZW50Qmx1ciAobmV3U3RhdGUpIHtcbiAgICBjb25zdCB7IG9wdGlvbnMsIHF1ZXJ5LCBzZWxlY3RlZCB9ID0gdGhpcy5zdGF0ZVxuICAgIGxldCBuZXdRdWVyeVxuICAgIGlmICh0aGlzLnByb3BzLmNvbmZpcm1PbkJsdXIpIHtcbiAgICAgIG5ld1F1ZXJ5ID0gbmV3U3RhdGUucXVlcnkgfHwgcXVlcnlcbiAgICAgIHRoaXMucHJvcHMub25Db25maXJtKG9wdGlvbnNbc2VsZWN0ZWRdKVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdRdWVyeSA9IHF1ZXJ5XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9jdXNlZDogbnVsbCxcbiAgICAgIG1lbnVPcGVuOiBuZXdTdGF0ZS5tZW51T3BlbiB8fCBmYWxzZSxcbiAgICAgIHF1ZXJ5OiBuZXdRdWVyeSxcbiAgICAgIHNlbGVjdGVkOiBudWxsLFxuICAgICAgdmFsaWRDaG9pY2VNYWRlOiB0aGlzLmlzUXVlcnlBbk9wdGlvbihuZXdRdWVyeSwgb3B0aW9ucylcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlTGlzdE1vdXNlTGVhdmUgKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBob3ZlcmVkOiBudWxsXG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZU9wdGlvbkJsdXIgKGV2ZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHsgZm9jdXNlZCwgbWVudU9wZW4sIG9wdGlvbnMsIHNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgZm9jdXNpbmdPdXRzaWRlQ29tcG9uZW50ID0gZXZlbnQucmVsYXRlZFRhcmdldCA9PT0gbnVsbFxuICAgIGNvbnN0IGZvY3VzaW5nSW5wdXQgPSBldmVudC5yZWxhdGVkVGFyZ2V0ID09PSB0aGlzLmVsZW1lbnRSZWZlcmVuY2VzWy0xXVxuICAgIGNvbnN0IGZvY3VzaW5nQW5vdGhlck9wdGlvbiA9IGZvY3VzZWQgIT09IGluZGV4ICYmIGZvY3VzZWQgIT09IC0xXG4gICAgY29uc3QgYmx1ckNvbXBvbmVudCA9ICghZm9jdXNpbmdBbm90aGVyT3B0aW9uICYmIGZvY3VzaW5nT3V0c2lkZUNvbXBvbmVudCkgfHwgIShmb2N1c2luZ0Fub3RoZXJPcHRpb24gfHwgZm9jdXNpbmdJbnB1dClcbiAgICBpZiAoYmx1ckNvbXBvbmVudCkge1xuICAgICAgY29uc3Qga2VlcE1lbnVPcGVuID0gbWVudU9wZW4gJiYgaXNJb3NEZXZpY2UoKVxuICAgICAgdGhpcy5oYW5kbGVDb21wb25lbnRCbHVyKHtcbiAgICAgICAgbWVudU9wZW46IGtlZXBNZW51T3BlbixcbiAgICAgICAgcXVlcnk6IHRoaXMudGVtcGxhdGVJbnB1dFZhbHVlKG9wdGlvbnNbc2VsZWN0ZWRdKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBoYW5kbGVJbnB1dEJsdXIgKGV2ZW50KSB7XG4gICAgY29uc3QgeyBmb2N1c2VkLCBtZW51T3Blbiwgb3B0aW9ucywgcXVlcnksIHNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgZm9jdXNpbmdBbk9wdGlvbiA9IGZvY3VzZWQgIT09IC0xXG4gICAgaWYgKCFmb2N1c2luZ0FuT3B0aW9uKSB7XG4gICAgICBjb25zdCBrZWVwTWVudU9wZW4gPSBtZW51T3BlbiAmJiBpc0lvc0RldmljZSgpXG4gICAgICBjb25zdCBuZXdRdWVyeSA9IGlzSW9zRGV2aWNlKCkgPyBxdWVyeSA6IHRoaXMudGVtcGxhdGVJbnB1dFZhbHVlKG9wdGlvbnNbc2VsZWN0ZWRdKVxuICAgICAgdGhpcy5oYW5kbGVDb21wb25lbnRCbHVyKHtcbiAgICAgICAgbWVudU9wZW46IGtlZXBNZW51T3BlbixcbiAgICAgICAgcXVlcnk6IG5ld1F1ZXJ5XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUlucHV0Q2hhbmdlIChldmVudCkge1xuICAgIGNvbnN0IHsgbWluTGVuZ3RoLCBzb3VyY2UsIHNob3dBbGxWYWx1ZXMgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBhdXRvc2VsZWN0ID0gdGhpcy5oYXNBdXRvc2VsZWN0KClcbiAgICBjb25zdCBxdWVyeSA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIGNvbnN0IHF1ZXJ5RW1wdHkgPSBxdWVyeS5sZW5ndGggPT09IDBcbiAgICBjb25zdCBxdWVyeUNoYW5nZWQgPSB0aGlzLnN0YXRlLnF1ZXJ5ICE9PSBxdWVyeVxuICAgIGNvbnN0IHF1ZXJ5TG9uZ0Vub3VnaCA9IHF1ZXJ5Lmxlbmd0aCA+PSBtaW5MZW5ndGhcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcXVlcnksXG4gICAgICBhcmlhSGludDogcXVlcnlFbXB0eVxuICAgIH0pXG5cbiAgICBjb25zdCBzZWFyY2hGb3JPcHRpb25zID0gc2hvd0FsbFZhbHVlcyB8fCAocXVlcnlDaGFuZ2VkICYmIHF1ZXJ5TG9uZ0Vub3VnaClcbiAgICBpZiAoc2VhcmNoRm9yT3B0aW9ucykge1xuICAgICAgc291cmNlKHF1ZXJ5LCAob3B0aW9ucykgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zQXZhaWxhYmxlID0gb3B0aW9ucy5sZW5ndGggPiAwXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1lbnVPcGVuOiBvcHRpb25zQXZhaWxhYmxlLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgc2VsZWN0ZWQ6IChhdXRvc2VsZWN0ICYmIG9wdGlvbnNBdmFpbGFibGUpID8gMCA6IC0xLFxuICAgICAgICAgIHZhbGlkQ2hvaWNlTWFkZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKCFxdWVyeUxvbmdFbm91Z2gpIHtcbiAgICAgIHNvdXJjZSgnJywgKG9wdGlvbnMpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9uc0F2YWlsYWJsZSA9IG9wdGlvbnMubGVuZ3RoID4gMFxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtZW51T3Blbjogb3B0aW9uc0F2YWlsYWJsZSxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHNlbGVjdGVkOiAoYXV0b3NlbGVjdCAmJiBvcHRpb25zQXZhaWxhYmxlKSA/IDAgOiAtMSxcbiAgICAgICAgICB2YWxpZENob2ljZU1hZGU6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUlucHV0Q2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZShldmVudClcbiAgfVxuXG4gIGhhbmRsZUlucHV0Rm9jdXMgKGV2ZW50KSB7XG4gICAgY29uc3QgeyBxdWVyeSwgdmFsaWRDaG9pY2VNYWRlLCBvcHRpb25zIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgeyBtaW5MZW5ndGggfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBzaG91bGRSZW9wZW5NZW51ID0gIXZhbGlkQ2hvaWNlTWFkZSAmJiBxdWVyeS5sZW5ndGggPj0gbWluTGVuZ3RoICYmIG9wdGlvbnMubGVuZ3RoID4gMFxuXG4gICAgaWYgKHNob3VsZFJlb3Blbk1lbnUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoKHsgbWVudU9wZW4gfSkgPT4gKHsgZm9jdXNlZDogLTEsIG1lbnVPcGVuOiBzaG91bGRSZW9wZW5NZW51IHx8IG1lbnVPcGVuLCBzZWxlY3RlZDogLTEgfSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiAtMSB9KVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU9wdGlvbkZvY3VzIChpbmRleCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZm9jdXNlZDogaW5kZXgsXG4gICAgICBob3ZlcmVkOiBudWxsLFxuICAgICAgc2VsZWN0ZWQ6IGluZGV4XG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZU9wdGlvbk1vdXNlRW50ZXIgKGV2ZW50LCBpbmRleCkge1xuICAgIC8vIGlPUyBTYWZhcmkgcHJldmVudHMgY2xpY2sgZXZlbnQgaWYgbW91c2VlbnRlciBhZGRzIGhvdmVyIGJhY2tncm91bmQgY29sb3VyXG4gICAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vbGlicmFyeS9hcmNoaXZlL2RvY3VtZW50YXRpb24vQXBwbGVBcHBsaWNhdGlvbnMvUmVmZXJlbmNlL1NhZmFyaVdlYkNvbnRlbnQvSGFuZGxpbmdFdmVudHMvSGFuZGxpbmdFdmVudHMuaHRtbCMvL2FwcGxlX3JlZi9kb2MvdWlkL1RQNDAwMDY1MTEtU1c0XG4gICAgaWYgKCFpc0lvc0RldmljZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaG92ZXJlZDogaW5kZXhcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3B0aW9uQ2xpY2sgKGV2ZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5zdGF0ZS5vcHRpb25zW2luZGV4XVxuICAgIGNvbnN0IG5ld1F1ZXJ5ID0gdGhpcy50ZW1wbGF0ZUlucHV0VmFsdWUoc2VsZWN0ZWRPcHRpb24pXG4gICAgdGhpcy5wcm9wcy5vbkNvbmZpcm0oc2VsZWN0ZWRPcHRpb24pXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBmb2N1c2VkOiAtMSxcbiAgICAgIGhvdmVyZWQ6IG51bGwsXG4gICAgICBtZW51T3BlbjogZmFsc2UsXG4gICAgICBxdWVyeTogbmV3UXVlcnksXG4gICAgICBzZWxlY3RlZDogLTEsXG4gICAgICB2YWxpZENob2ljZU1hZGU6IHRydWVcbiAgICB9KVxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICB9XG5cbiAgaGFuZGxlT3B0aW9uTW91c2VEb3duIChldmVudCkge1xuICAgIC8vIFNhZmFyaSB0cmlnZ2VycyBmb2N1c091dCBiZWZvcmUgY2xpY2ssIGJ1dCBpZiB5b3VcbiAgICAvLyBwcmV2ZW50RGVmYXVsdCBvbiBtb3VzZURvd24sIHlvdSBjYW4gc3RvcCB0aGF0IGZyb20gaGFwcGVuaW5nLlxuICAgIC8vIElmIHRoaXMgaXMgcmVtb3ZlZCwgY2xpY2tpbmcgb24gYW4gb3B0aW9uIGluIFNhZmFyaSB3aWxsIHRyaWdnZXJcbiAgICAvLyBgaGFuZGxlT3B0aW9uQmx1cmAsIHdoaWNoIGNsb3NlcyB0aGUgbWVudSwgYW5kIHRoZSBjbGljayB3aWxsXG4gICAgLy8gdHJpZ2dlciBvbiB0aGUgZWxlbWVudCB1bmRlcm5lYXRoIGluc3RlYWQuXG4gICAgLy8gU2VlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzc2MjE3MTEvaG93LXRvLXByZXZlbnQtYmx1ci1ydW5uaW5nLXdoZW4tY2xpY2tpbmctYS1saW5rLWluLWpxdWVyeVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGhhbmRsZVVwQXJyb3cgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IHsgbWVudU9wZW4sIHNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgaXNOb3RBdFRvcCA9IHNlbGVjdGVkICE9PSAtMVxuICAgIGNvbnN0IGFsbG93TW92ZVVwID0gaXNOb3RBdFRvcCAmJiBtZW51T3BlblxuICAgIGlmIChhbGxvd01vdmVVcCkge1xuICAgICAgdGhpcy5oYW5kbGVPcHRpb25Gb2N1cyhzZWxlY3RlZCAtIDEpXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRG93bkFycm93IChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAvLyBpZiBub3Qgb3Blbiwgb3BlblxuICAgIGlmICh0aGlzLnByb3BzLnNob3dBbGxWYWx1ZXMgJiYgdGhpcy5zdGF0ZS5tZW51T3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMucHJvcHMuc291cmNlKCcnLCAob3B0aW9ucykgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtZW51T3BlbjogdHJ1ZSxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHNlbGVjdGVkOiAwLFxuICAgICAgICAgIGZvY3VzZWQ6IDAsXG4gICAgICAgICAgaG92ZXJlZDogbnVsbFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUubWVudU9wZW4gPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHsgbWVudU9wZW4sIG9wdGlvbnMsIHNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlXG4gICAgICBjb25zdCBpc05vdEF0Qm90dG9tID0gc2VsZWN0ZWQgIT09IG9wdGlvbnMubGVuZ3RoIC0gMVxuICAgICAgY29uc3QgYWxsb3dNb3ZlRG93biA9IGlzTm90QXRCb3R0b20gJiYgbWVudU9wZW5cbiAgICAgIGlmIChhbGxvd01vdmVEb3duKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlT3B0aW9uRm9jdXMoc2VsZWN0ZWQgKyAxKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNwYWNlIChldmVudCkge1xuICAgIC8vIGlmIG5vdCBvcGVuLCBvcGVuXG4gICAgaWYgKHRoaXMucHJvcHMuc2hvd0FsbFZhbHVlcyAmJiB0aGlzLnN0YXRlLm1lbnVPcGVuID09PSBmYWxzZSAmJiB0aGlzLnN0YXRlLnF1ZXJ5ID09PSAnJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgdGhpcy5wcm9wcy5zb3VyY2UoJycsIChvcHRpb25zKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG1lbnVPcGVuOiB0cnVlLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IGZvY3VzSXNPbk9wdGlvbiA9IHRoaXMuc3RhdGUuZm9jdXNlZCAhPT0gLTFcbiAgICBpZiAoZm9jdXNJc09uT3B0aW9uKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKGV2ZW50LCB0aGlzLnN0YXRlLmZvY3VzZWQpXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRW50ZXIgKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc3RhdGUubWVudU9wZW4pIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IGhhc1NlbGVjdGVkT3B0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3RlZCA+PSAwXG4gICAgICBpZiAoaGFzU2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25DbGljayhldmVudCwgdGhpcy5zdGF0ZS5zZWxlY3RlZClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVQcmludGFibGVLZXkgKGV2ZW50KSB7XG4gICAgY29uc3QgaW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmZXJlbmNlc1stMV1cbiAgICBjb25zdCBldmVudElzT25JbnB1dCA9IGV2ZW50LnRhcmdldCA9PT0gaW5wdXRFbGVtZW50XG4gICAgaWYgKCFldmVudElzT25JbnB1dCkge1xuICAgICAgLy8gRklYTUU6IFRoaXMgd291bGQgYmUgYmV0dGVyIGlmIGl0IHdhcyBpbiBjb21wb25lbnREaWRVcGRhdGUsXG4gICAgICAvLyBidXQgdXNpbmcgc2V0U3RhdGUgdG8gdHJpZ2dlciB0aGF0IHNlZW1zIHRvIG5vdCB3b3JrIGNvcnJlY3RseVxuICAgICAgLy8gaW4gcHJlYWN0QDguMS4wLlxuICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKClcbiAgICB9XG4gIH1cblxuICBoYW5kbGVLZXlEb3duIChldmVudCkge1xuICAgIHN3aXRjaCAoa2V5Q29kZXNbZXZlbnQua2V5Q29kZV0pIHtcbiAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgdGhpcy5oYW5kbGVVcEFycm93KGV2ZW50KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZG93bic6XG4gICAgICAgIHRoaXMuaGFuZGxlRG93bkFycm93KGV2ZW50KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3BhY2UnOlxuICAgICAgICB0aGlzLmhhbmRsZVNwYWNlKGV2ZW50KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZW50ZXInOlxuICAgICAgICB0aGlzLmhhbmRsZUVudGVyKGV2ZW50KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZXNjYXBlJzpcbiAgICAgICAgdGhpcy5oYW5kbGVDb21wb25lbnRCbHVyKHtcbiAgICAgICAgICBxdWVyeTogdGhpcy5zdGF0ZS5xdWVyeVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGlzUHJpbnRhYmxlS2V5Q29kZShldmVudC5rZXlDb2RlKSkge1xuICAgICAgICAgIHRoaXMuaGFuZGxlUHJpbnRhYmxlS2V5KGV2ZW50KVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7XG4gICAgICBjc3NOYW1lc3BhY2UsXG4gICAgICBkaXNwbGF5TWVudSxcbiAgICAgIGlkLFxuICAgICAgbWluTGVuZ3RoLFxuICAgICAgbmFtZSxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgcmVxdWlyZWQsXG4gICAgICBzaG93QWxsVmFsdWVzLFxuICAgICAgdE5vUmVzdWx0cyxcbiAgICAgIHRTdGF0dXNRdWVyeVRvb1Nob3J0LFxuICAgICAgdFN0YXR1c05vUmVzdWx0cyxcbiAgICAgIHRTdGF0dXNTZWxlY3RlZE9wdGlvbixcbiAgICAgIHRTdGF0dXNSZXN1bHRzLFxuICAgICAgdEFzc2lzdGl2ZUhpbnQsXG4gICAgICBkcm9wZG93bkFycm93OiBkcm9wZG93bkFycm93RmFjdG9yeSxcbiAgICAgIGFyaWFMYWJlbGxlZEJ5XG4gICAgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IGZvY3VzZWQsIGhvdmVyZWQsIG1lbnVPcGVuLCBvcHRpb25zLCBxdWVyeSwgc2VsZWN0ZWQsIGFyaWFIaW50LCB2YWxpZENob2ljZU1hZGUgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBhdXRvc2VsZWN0ID0gdGhpcy5oYXNBdXRvc2VsZWN0KClcblxuICAgIGNvbnN0IGlucHV0Rm9jdXNlZCA9IGZvY3VzZWQgPT09IC0xXG4gICAgY29uc3Qgbm9PcHRpb25zQXZhaWxhYmxlID0gb3B0aW9ucy5sZW5ndGggPT09IDBcbiAgICBjb25zdCBxdWVyeU5vdEVtcHR5ID0gcXVlcnkubGVuZ3RoICE9PSAwXG4gICAgY29uc3QgcXVlcnlMb25nRW5vdWdoID0gcXVlcnkubGVuZ3RoID49IG1pbkxlbmd0aFxuICAgIGNvbnN0IHNob3dOb09wdGlvbnNGb3VuZCA9IHRoaXMucHJvcHMuc2hvd05vT3B0aW9uc0ZvdW5kICYmXG4gICAgICBpbnB1dEZvY3VzZWQgJiYgbm9PcHRpb25zQXZhaWxhYmxlICYmIHF1ZXJ5Tm90RW1wdHkgJiYgcXVlcnlMb25nRW5vdWdoXG5cbiAgICBjb25zdCB3cmFwcGVyQ2xhc3NOYW1lID0gYCR7Y3NzTmFtZXNwYWNlfV9fd3JhcHBlcmBcblxuICAgIGNvbnN0IGlucHV0Q2xhc3NOYW1lID0gYCR7Y3NzTmFtZXNwYWNlfV9faW5wdXRgXG4gICAgY29uc3QgY29tcG9uZW50SXNGb2N1c2VkID0gZm9jdXNlZCAhPT0gbnVsbFxuICAgIGNvbnN0IGlucHV0TW9kaWZpZXJGb2N1c2VkID0gY29tcG9uZW50SXNGb2N1c2VkID8gYCAke2lucHV0Q2xhc3NOYW1lfS0tZm9jdXNlZGAgOiAnJ1xuICAgIGNvbnN0IGlucHV0TW9kaWZpZXJUeXBlID0gdGhpcy5wcm9wcy5zaG93QWxsVmFsdWVzID8gYCAke2lucHV0Q2xhc3NOYW1lfS0tc2hvdy1hbGwtdmFsdWVzYCA6IGAgJHtpbnB1dENsYXNzTmFtZX0tLWRlZmF1bHRgXG4gICAgY29uc3QgZHJvcGRvd25BcnJvd0NsYXNzTmFtZSA9IGAke2Nzc05hbWVzcGFjZX1fX2Ryb3Bkb3duLWFycm93LWRvd25gXG4gICAgY29uc3Qgb3B0aW9uRm9jdXNlZCA9IGZvY3VzZWQgIT09IC0xICYmIGZvY3VzZWQgIT09IG51bGxcblxuICAgIGNvbnN0IG1lbnVDbGFzc05hbWUgPSBgJHtjc3NOYW1lc3BhY2V9X19tZW51YFxuICAgIGNvbnN0IG1lbnVNb2RpZmllckRpc3BsYXlNZW51ID0gYCR7bWVudUNsYXNzTmFtZX0tLSR7ZGlzcGxheU1lbnV9YFxuICAgIGNvbnN0IG1lbnVJc1Zpc2libGUgPSBtZW51T3BlbiB8fCBzaG93Tm9PcHRpb25zRm91bmRcbiAgICBjb25zdCBtZW51TW9kaWZpZXJWaXNpYmlsaXR5ID0gYCR7bWVudUNsYXNzTmFtZX0tLSR7KG1lbnVJc1Zpc2libGUpID8gJ3Zpc2libGUnIDogJ2hpZGRlbid9YFxuXG4gICAgY29uc3Qgb3B0aW9uQ2xhc3NOYW1lID0gYCR7Y3NzTmFtZXNwYWNlfV9fb3B0aW9uYFxuXG4gICAgY29uc3QgaGludENsYXNzTmFtZSA9IGAke2Nzc05hbWVzcGFjZX1fX2hpbnRgXG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25UZXh0ID0gdGhpcy50ZW1wbGF0ZUlucHV0VmFsdWUob3B0aW9uc1tzZWxlY3RlZF0pXG4gICAgY29uc3Qgb3B0aW9uQmVnaW5zV2l0aFF1ZXJ5ID0gc2VsZWN0ZWRPcHRpb25UZXh0ICYmXG4gICAgICBzZWxlY3RlZE9wdGlvblRleHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpID09PSAwXG4gICAgY29uc3QgaGludFZhbHVlID0gKG9wdGlvbkJlZ2luc1dpdGhRdWVyeSAmJiBhdXRvc2VsZWN0KVxuICAgICAgPyBxdWVyeSArIHNlbGVjdGVkT3B0aW9uVGV4dC5zdWJzdHIocXVlcnkubGVuZ3RoKVxuICAgICAgOiAnJ1xuXG4gICAgY29uc3QgYXNzaXN0aXZlSGludElEID0gaWQgKyAnX19hc3Npc3RpdmVIaW50J1xuICAgIGNvbnN0IGFyaWFEZXNjcmliZWRQcm9wID0gKGFyaWFIaW50KSA/IHtcbiAgICAgICdhcmlhLWRlc2NyaWJlZGJ5JzogYXNzaXN0aXZlSGludElEXG4gICAgfSA6IG51bGxcblxuICAgIGxldCBkcm9wZG93bkFycm93XG5cbiAgICAvLyB3ZSBvbmx5IG5lZWQgYSBkcm9wZG93biBhcnJvdyBpZiBzaG93QWxsVmFsdWVzIGlzIHNldCB0byBhIHRydXRoeSB2YWx1ZVxuICAgIGlmIChzaG93QWxsVmFsdWVzKSB7XG4gICAgICBkcm9wZG93bkFycm93ID0gZHJvcGRvd25BcnJvd0ZhY3RvcnkoeyBjbGFzc05hbWU6IGRyb3Bkb3duQXJyb3dDbGFzc05hbWUgfSlcblxuICAgICAgLy8gaWYgdGhlIGZhY3RvcnkgcmV0dXJucyBhIHN0cmluZyB3ZSdsbCByZW5kZXIgdGhpcyBhcyBIVE1MICh1c2FnZSB3L28gKFApUmVhY3QpXG4gICAgICBpZiAodHlwZW9mIGRyb3Bkb3duQXJyb3cgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRyb3Bkb3duQXJyb3cgPSA8ZGl2IGNsYXNzTmFtZT17YCR7Y3NzTmFtZXNwYWNlfV9fZHJvcGRvd24tYXJyb3ctZG93bi13cmFwcGVyYH0gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBkcm9wZG93bkFycm93IH19IC8+XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt3cmFwcGVyQ2xhc3NOYW1lfSBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn0+XG4gICAgICAgIDxTdGF0dXNcbiAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgbGVuZ3RoPXtvcHRpb25zLmxlbmd0aH1cbiAgICAgICAgICBxdWVyeUxlbmd0aD17cXVlcnkubGVuZ3RofVxuICAgICAgICAgIG1pblF1ZXJ5TGVuZ3RoPXttaW5MZW5ndGh9XG4gICAgICAgICAgc2VsZWN0ZWRPcHRpb249e3RoaXMudGVtcGxhdGVJbnB1dFZhbHVlKG9wdGlvbnNbc2VsZWN0ZWRdKX1cbiAgICAgICAgICBzZWxlY3RlZE9wdGlvbkluZGV4PXtzZWxlY3RlZH1cbiAgICAgICAgICB2YWxpZENob2ljZU1hZGU9e3ZhbGlkQ2hvaWNlTWFkZX1cbiAgICAgICAgICBpc0luRm9jdXM9e3RoaXMuc3RhdGUuZm9jdXNlZCAhPT0gbnVsbH1cbiAgICAgICAgICB0UXVlcnlUb29TaG9ydD17dFN0YXR1c1F1ZXJ5VG9vU2hvcnR9XG4gICAgICAgICAgdE5vUmVzdWx0cz17dFN0YXR1c05vUmVzdWx0c31cbiAgICAgICAgICB0U2VsZWN0ZWRPcHRpb249e3RTdGF0dXNTZWxlY3RlZE9wdGlvbn1cbiAgICAgICAgICB0UmVzdWx0cz17dFN0YXR1c1Jlc3VsdHN9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2hpbnRWYWx1ZSAmJiAoXG4gICAgICAgICAgPHNwYW4+PGlucHV0IGNsYXNzTmFtZT17aGludENsYXNzTmFtZX0gcmVhZG9ubHkgdGFiSW5kZXg9Jy0xJyB2YWx1ZT17aGludFZhbHVlfSAvPjwvc3Bhbj5cbiAgICAgICAgKX1cblxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBhcmlhLWV4cGFuZGVkPXttZW51T3BlbiA/ICd0cnVlJyA6ICdmYWxzZSd9XG4gICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXtvcHRpb25Gb2N1c2VkID8gYCR7aWR9X19vcHRpb24tLSR7Zm9jdXNlZH1gIDogdW5kZWZpbmVkfVxuICAgICAgICAgIGFyaWEtb3ducz17YCR7aWR9X19saXN0Ym94YH1cbiAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT17KHRoaXMuaGFzQXV0b3NlbGVjdCgpKSA/ICdib3RoJyA6ICdsaXN0J31cbiAgICAgICAgICB7Li4uYXJpYURlc2NyaWJlZFByb3B9XG4gICAgICAgICAgYXV0b0NvbXBsZXRlPSdvZmYnXG4gICAgICAgICAgY2xhc3NOYW1lPXtgJHtpbnB1dENsYXNzTmFtZX0ke2lucHV0TW9kaWZpZXJGb2N1c2VkfSR7aW5wdXRNb2RpZmllclR5cGV9YH1cbiAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZUlucHV0Q2xpY2soZXZlbnQpfVxuICAgICAgICAgIG9uQmx1cj17dGhpcy5oYW5kbGVJbnB1dEJsdXJ9XG4gICAgICAgICAgey4uLm9uQ2hhbmdlQ3Jvc3NMaWJyYXJ5KHRoaXMuaGFuZGxlSW5wdXRDaGFuZ2UpfVxuICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlSW5wdXRGb2N1c31cbiAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICByZWY9eyhpbnB1dEVsZW1lbnQpID0+IHsgdGhpcy5lbGVtZW50UmVmZXJlbmNlc1stMV0gPSBpbnB1dEVsZW1lbnQgfX1cbiAgICAgICAgICB0eXBlPSd0ZXh0J1xuICAgICAgICAgIHJvbGU9J2NvbWJvYm94J1xuICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2Ryb3Bkb3duQXJyb3d9XG5cbiAgICAgICAgPHVsXG4gICAgICAgICAgY2xhc3NOYW1lPXtgJHttZW51Q2xhc3NOYW1lfSAke21lbnVNb2RpZmllckRpc3BsYXlNZW51fSAke21lbnVNb2RpZmllclZpc2liaWxpdHl9YH1cbiAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVMaXN0TW91c2VMZWF2ZShldmVudCl9XG4gICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PXthcmlhTGFiZWxsZWRCeX1cbiAgICAgICAgICBpZD17YCR7aWR9X19saXN0Ym94YH1cbiAgICAgICAgICByb2xlPSdsaXN0Ym94J1xuICAgICAgICA+XG4gICAgICAgICAge29wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaG93Rm9jdXNlZCA9IGZvY3VzZWQgPT09IC0xID8gc2VsZWN0ZWQgPT09IGluZGV4IDogZm9jdXNlZCA9PT0gaW5kZXhcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbk1vZGlmaWVyRm9jdXNlZCA9IHNob3dGb2N1c2VkICYmIGhvdmVyZWQgPT09IG51bGwgPyBgICR7b3B0aW9uQ2xhc3NOYW1lfS0tZm9jdXNlZGAgOiAnJ1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTW9kaWZpZXJPZGQgPSAoaW5kZXggJSAyKSA/IGAgJHtvcHRpb25DbGFzc05hbWV9LS1vZGRgIDogJydcbiAgICAgICAgICAgIGNvbnN0IGlvc1Bvc2luc2V0SHRtbCA9IChpc0lvc0RldmljZSgpKVxuICAgICAgICAgICAgICA/IGA8c3BhbiBpZD0ke2lkfV9fb3B0aW9uLXN1ZmZpeC0tJHtpbmRleH0gc3R5bGU9XCJib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDtgICtcbiAgICAgICAgICAgICAgICAnbWFyZ2luQm90dG9tOi0xcHg7bWFyZ2luUmlnaHQ6LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlOycgK1xuICAgICAgICAgICAgICAgICd3aGl0ZVNwYWNlOm5vd3JhcDt3aWR0aDoxcHhcIj4nICsgYCAke2luZGV4ICsgMX0gb2YgJHtvcHRpb25zLmxlbmd0aH08L3NwYW4+YFxuICAgICAgICAgICAgICA6ICcnXG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2ZvY3VzZWQgPT09IGluZGV4ID8gJ3RydWUnIDogJ2ZhbHNlJ31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake29wdGlvbkNsYXNzTmFtZX0ke29wdGlvbk1vZGlmaWVyRm9jdXNlZH0ke29wdGlvbk1vZGlmaWVyT2RkfWB9XG4gICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiB0aGlzLnRlbXBsYXRlU3VnZ2VzdGlvbihvcHRpb24pICsgaW9zUG9zaW5zZXRIdG1sIH19XG4gICAgICAgICAgICAgICAgaWQ9e2Ake2lkfV9fb3B0aW9uLS0ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICBvbkJsdXI9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVPcHRpb25CbHVyKGV2ZW50LCBpbmRleCl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZU9wdGlvbkNsaWNrKGV2ZW50LCBpbmRleCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlT3B0aW9uTW91c2VEb3dufVxuICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZU9wdGlvbk1vdXNlRW50ZXIoZXZlbnQsIGluZGV4KX1cbiAgICAgICAgICAgICAgICByZWY9eyhvcHRpb25FbCkgPT4geyB0aGlzLmVsZW1lbnRSZWZlcmVuY2VzW2luZGV4XSA9IG9wdGlvbkVsIH19XG4gICAgICAgICAgICAgICAgcm9sZT0nb3B0aW9uJ1xuICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSdcbiAgICAgICAgICAgICAgICBhcmlhLXBvc2luc2V0PXtpbmRleCArIDF9XG4gICAgICAgICAgICAgICAgYXJpYS1zZXRzaXplPXtvcHRpb25zLmxlbmd0aH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KX1cblxuICAgICAgICAgIHtzaG93Tm9PcHRpb25zRm91bmQgJiYgKFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17YCR7b3B0aW9uQ2xhc3NOYW1lfSAke29wdGlvbkNsYXNzTmFtZX0tLW5vLXJlc3VsdHNgfT57dE5vUmVzdWx0cygpfTwvbGk+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC91bD5cblxuICAgICAgICA8c3BhbiBpZD17YXNzaXN0aXZlSGludElEfSBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX0+e3RBc3Npc3RpdmVIaW50KCl9PC9zcGFuPlxuXG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4iLCIvLyAxOS4yLjMuMiAvIDE1LjMuNC41IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKHRoaXNBcmcsIGFyZ3MuLi4pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCwgJ0Z1bmN0aW9uJywgeyBiaW5kOiByZXF1aXJlKCcuL19iaW5kJykgfSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgYXJyYXlTbGljZSA9IFtdLnNsaWNlO1xudmFyIGZhY3RvcmllcyA9IHt9O1xuXG52YXIgY29uc3RydWN0ID0gZnVuY3Rpb24gKEYsIGxlbiwgYXJncykge1xuICBpZiAoIShsZW4gaW4gZmFjdG9yaWVzKSkge1xuICAgIGZvciAodmFyIG4gPSBbXSwgaSA9IDA7IGkgPCBsZW47IGkrKykgbltpXSA9ICdhWycgKyBpICsgJ10nO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICAgIGZhY3Rvcmllc1tsZW5dID0gRnVuY3Rpb24oJ0YsYScsICdyZXR1cm4gbmV3IEYoJyArIG4uam9pbignLCcpICsgJyknKTtcbiAgfSByZXR1cm4gZmFjdG9yaWVzW2xlbl0oRiwgYXJncyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLmJpbmQgfHwgZnVuY3Rpb24gYmluZCh0aGF0IC8qICwgLi4uYXJncyAqLykge1xuICB2YXIgZm4gPSBhRnVuY3Rpb24odGhpcyk7XG4gIHZhciBwYXJ0QXJncyA9IGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICB2YXIgYm91bmQgPSBmdW5jdGlvbiAoLyogYXJncy4uLiAqLykge1xuICAgIHZhciBhcmdzID0gcGFydEFyZ3MuY29uY2F0KGFycmF5U2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGJvdW5kID8gY29uc3RydWN0KGZuLCBhcmdzLmxlbmd0aCwgYXJncykgOiBpbnZva2UoZm4sIGFyZ3MsIHRoYXQpO1xuICB9O1xuICBpZiAoaXNPYmplY3QoZm4ucHJvdG90eXBlKSkgYm91bmQucHJvdG90eXBlID0gZm4ucHJvdG90eXBlO1xuICByZXR1cm4gYm91bmQ7XG59O1xuIiwiLy8gZmFzdCBhcHBseSwgaHR0cDovL2pzcGVyZi5sbmtpdC5jb20vZmFzdC1hcHBseS81XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgYXJncywgdGhhdCkge1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJncyk7XG59O1xuIiwiLy8gQEBtYXRjaCBsb2dpY1xucmVxdWlyZSgnLi9fZml4LXJlLXdrcycpKCdtYXRjaCcsIDEsIGZ1bmN0aW9uIChkZWZpbmVkLCBNQVRDSCwgJG1hdGNoKSB7XG4gIC8vIDIxLjEuMy4xMSBTdHJpbmcucHJvdG90eXBlLm1hdGNoKHJlZ2V4cClcbiAgcmV0dXJuIFtmdW5jdGlvbiBtYXRjaChyZWdleHApIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgdmFyIE8gPSBkZWZpbmVkKHRoaXMpO1xuICAgIHZhciBmbiA9IHJlZ2V4cCA9PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiByZWdleHBbTUFUQ0hdO1xuICAgIHJldHVybiBmbiAhPT0gdW5kZWZpbmVkID8gZm4uY2FsbChyZWdleHAsIE8pIDogbmV3IFJlZ0V4cChyZWdleHApW01BVENIXShTdHJpbmcoTykpO1xuICB9LCAkbWF0Y2hdO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG52YXIgd2tzID0gcmVxdWlyZSgnLi9fd2tzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgbGVuZ3RoLCBleGVjKSB7XG4gIHZhciBTWU1CT0wgPSB3a3MoS0VZKTtcbiAgdmFyIGZucyA9IGV4ZWMoZGVmaW5lZCwgU1lNQk9MLCAnJ1tLRVldKTtcbiAgdmFyIHN0cmZuID0gZm5zWzBdO1xuICB2YXIgcnhmbiA9IGZuc1sxXTtcbiAgaWYgKGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT0gNztcbiAgfSkpIHtcbiAgICByZWRlZmluZShTdHJpbmcucHJvdG90eXBlLCBLRVksIHN0cmZuKTtcbiAgICBoaWRlKFJlZ0V4cC5wcm90b3R5cGUsIFNZTUJPTCwgbGVuZ3RoID09IDJcbiAgICAgIC8vIDIxLjIuNS44IFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXShzdHJpbmcsIHJlcGxhY2VWYWx1ZSlcbiAgICAgIC8vIDIxLjIuNS4xMSBSZWdFeHAucHJvdG90eXBlW0BAc3BsaXRdKHN0cmluZywgbGltaXQpXG4gICAgICA/IGZ1bmN0aW9uIChzdHJpbmcsIGFyZykgeyByZXR1cm4gcnhmbi5jYWxsKHN0cmluZywgdGhpcywgYXJnKTsgfVxuICAgICAgLy8gMjEuMi41LjYgUmVnRXhwLnByb3RvdHlwZVtAQG1hdGNoXShzdHJpbmcpXG4gICAgICAvLyAyMS4yLjUuOSBSZWdFeHAucHJvdG90eXBlW0BAc2VhcmNoXShzdHJpbmcpXG4gICAgICA6IGZ1bmN0aW9uIChzdHJpbmcpIHsgcmV0dXJuIHJ4Zm4uY2FsbChzdHJpbmcsIHRoaXMpOyB9XG4gICAgKTtcbiAgfVxufTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCcgLyoqIEBqc3ggY3JlYXRlRWxlbWVudCAqL1xuXG5jb25zdCBkZWJvdW5jZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgdmFyIHRpbWVvdXRcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXNcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRpbWVvdXQgPSBudWxsXG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgIH1cbiAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KVxuICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gIH1cbn1cbmNvbnN0IHN0YXR1c0RlYm91bmNlTWlsbGlzID0gMTQwMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0dXMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHRRdWVyeVRvb1Nob3J0OiAobWluUXVlcnlMZW5ndGgpID0+IGBUeXBlIGluICR7bWluUXVlcnlMZW5ndGh9IG9yIG1vcmUgY2hhcmFjdGVycyBmb3IgcmVzdWx0c2AsXG4gICAgdE5vUmVzdWx0czogKCkgPT4gJ05vIHNlYXJjaCByZXN1bHRzJyxcbiAgICB0U2VsZWN0ZWRPcHRpb246IChzZWxlY3RlZE9wdGlvbiwgbGVuZ3RoLCBpbmRleCkgPT4gYCR7c2VsZWN0ZWRPcHRpb259ICR7aW5kZXggKyAxfSBvZiAke2xlbmd0aH0gaXMgaGlnaGxpZ2h0ZWRgLFxuICAgIHRSZXN1bHRzOiAobGVuZ3RoLCBjb250ZW50U2VsZWN0ZWRPcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHdvcmRzID0ge1xuICAgICAgICByZXN1bHQ6IChsZW5ndGggPT09IDEpID8gJ3Jlc3VsdCcgOiAncmVzdWx0cycsXG4gICAgICAgIGlzOiAobGVuZ3RoID09PSAxKSA/ICdpcycgOiAnYXJlJ1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7bGVuZ3RofSAke3dvcmRzLnJlc3VsdH0gJHt3b3Jkcy5pc30gYXZhaWxhYmxlLiAke2NvbnRlbnRTZWxlY3RlZE9wdGlvbn1gXG4gICAgfVxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGJ1bXA6IGZhbHNlLFxuICAgIGRlYm91bmNlZDogZmFsc2VcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICB0aGlzLmRlYm91bmNlU3RhdHVzVXBkYXRlID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF0aGF0LnN0YXRlLmRlYm91bmNlZCkge1xuICAgICAgICBjb25zdCBzaG91bGRTaWxlbmNlID0gIXRoYXQucHJvcHMuaXNJbkZvY3VzIHx8IHRoYXQucHJvcHMudmFsaWRDaG9pY2VNYWRlXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoKHsgYnVtcCB9KSA9PiAoeyBidW1wOiAhYnVtcCwgZGVib3VuY2VkOiB0cnVlLCBzaWxlbmNlZDogc2hvdWxkU2lsZW5jZSB9KSlcbiAgICAgIH1cbiAgICB9LCBzdGF0dXNEZWJvdW5jZU1pbGxpcylcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKHsgcXVlcnlMZW5ndGggfSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBkZWJvdW5jZWQ6IGZhbHNlIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgbGVuZ3RoLFxuICAgICAgcXVlcnlMZW5ndGgsXG4gICAgICBtaW5RdWVyeUxlbmd0aCxcbiAgICAgIHNlbGVjdGVkT3B0aW9uLFxuICAgICAgc2VsZWN0ZWRPcHRpb25JbmRleCxcbiAgICAgIHRRdWVyeVRvb1Nob3J0LFxuICAgICAgdE5vUmVzdWx0cyxcbiAgICAgIHRTZWxlY3RlZE9wdGlvbixcbiAgICAgIHRSZXN1bHRzXG4gICAgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IGJ1bXAsIGRlYm91bmNlZCwgc2lsZW5jZWQgfSA9IHRoaXMuc3RhdGVcblxuICAgIGNvbnN0IHF1ZXJ5VG9vU2hvcnQgPSBxdWVyeUxlbmd0aCA8IG1pblF1ZXJ5TGVuZ3RoXG4gICAgY29uc3Qgbm9SZXN1bHRzID0gbGVuZ3RoID09PSAwXG5cbiAgICBjb25zdCBjb250ZW50U2VsZWN0ZWRPcHRpb24gPSBzZWxlY3RlZE9wdGlvblxuICAgICAgPyB0U2VsZWN0ZWRPcHRpb24oc2VsZWN0ZWRPcHRpb24sIGxlbmd0aCwgc2VsZWN0ZWRPcHRpb25JbmRleClcbiAgICAgIDogJydcblxuICAgIGxldCBjb250ZW50ID0gbnVsbFxuICAgIGlmIChxdWVyeVRvb1Nob3J0KSB7XG4gICAgICBjb250ZW50ID0gdFF1ZXJ5VG9vU2hvcnQobWluUXVlcnlMZW5ndGgpXG4gICAgfSBlbHNlIGlmIChub1Jlc3VsdHMpIHtcbiAgICAgIGNvbnRlbnQgPSB0Tm9SZXN1bHRzKClcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9IHRSZXN1bHRzKGxlbmd0aCwgY29udGVudFNlbGVjdGVkT3B0aW9uKVxuICAgIH1cblxuICAgIHRoaXMuZGVib3VuY2VTdGF0dXNVcGRhdGUoKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBib3JkZXI6ICcwJyxcbiAgICAgICAgICBjbGlwOiAncmVjdCgwIDAgMCAwKScsXG4gICAgICAgICAgaGVpZ2h0OiAnMXB4JyxcbiAgICAgICAgICBtYXJnaW5Cb3R0b206ICctMXB4JyxcbiAgICAgICAgICBtYXJnaW5SaWdodDogJy0xcHgnLFxuICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgd2lkdGg6ICcxcHgnXG4gICAgICAgIH19PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgaWQ9e2lkICsgJ19fc3RhdHVzLS1BJ31cbiAgICAgICAgICByb2xlPSdzdGF0dXMnXG4gICAgICAgICAgYXJpYS1hdG9taWM9J3RydWUnXG4gICAgICAgICAgYXJpYS1saXZlPSdwb2xpdGUnPlxuICAgICAgICAgIHsoIXNpbGVuY2VkICYmIGRlYm91bmNlZCAmJiBidW1wKSA/IGNvbnRlbnQgOiAnJ31cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBpZD17aWQgKyAnX19zdGF0dXMtLUInfVxuICAgICAgICAgIHJvbGU9J3N0YXR1cydcbiAgICAgICAgICBhcmlhLWF0b21pYz0ndHJ1ZSdcbiAgICAgICAgICBhcmlhLWxpdmU9J3BvbGl0ZSc+XG4gICAgICAgICAgeyghc2lsZW5jZWQgJiYgZGVib3VuY2VkICYmICFidW1wKSA/IGNvbnRlbnQgOiAnJ31cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdwcmVhY3QnIC8qKiBAanN4IGNyZWF0ZUVsZW1lbnQgKi9cblxuY29uc3QgRHJvcGRvd25BcnJvd0Rvd24gPSAoeyBjbGFzc05hbWUgfSkgPT4gKFxuICA8c3ZnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyBjbGFzc05hbWU9e2NsYXNzTmFtZX0gZm9jdXNhYmxlPSdmYWxzZSc+XG4gICAgPGcgc3Ryb2tlPSdub25lJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuICAgICAgPHBvbHlnb24gZmlsbD0nIzAwMDAwMCcgcG9pbnRzPScwIDAgMjIgMCAxMSAxNycgLz5cbiAgICA8L2c+XG4gIDwvc3ZnPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93bkFycm93RG93blxuIiwiLy8gV2UgdXNlIG91ciBvd24gZm9yayBvZiBhY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZSBiZWNhdXNlIHRoZSBtYWluIHBhY2thZ2UgaXMgbm90IGJlaW5nIGFjdGl2ZWx5IG1haW50YWluZWQgYW5kIGhhcyBidWdzIHdoaWNoIHdlIG5lZWRlZCB0byBmaXhcbi8vIFRoZXJlIGlzIGEgY2hhbmdlbG9nIGZvciB0aGUgZml4ZXMgd2UndmUgYWRkZWQgLS0gaHR0cHM6Ly9naXRodWIuY29tL0ZpbmFuY2lhbC1UaW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9ibG9iL21hc3Rlci9DSEFOR0VMT0cubWQjMjEwLS0tMjAyMS0wNS0yNFxuLy8gQmVsb3cgYXJlIHRoZSBwdWxsLXJlcXVlc3RzIHRvIGFjY2Vzc2libGUtYXV0b2NvbXBsZXRlIHdoaWNoIHdvdWxkIGZpeCB0aGUgYnVnczpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHBoYWdvdi9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9wdWxsLzQ5N1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FscGhhZ292L2FjY2Vzc2libGUtYXV0b2NvbXBsZXRlL3B1bGwvNDkxXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYWxwaGFnb3YvYWNjZXNzaWJsZS1hdXRvY29tcGxldGUvcHVsbC80OTZcbi8vIElmIHRoZSBhYm92ZSBwdWxsLXJlcXVlc3RzIGFyZSBtZXJnZWQgYW5kIHB1Ymxpc2hlZCwgdGhlbiB3ZSBjYW4gc3RvcCB1c2luZyBvdXIgZm9ya1xuaW1wb3J0IGFjY2Vzc2libGVBdXRvY29tcGxldGUgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZSc7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHN1Z2dlc3Rpb24gLSBUZXh0IHdoaWNoIGlzIGdvaW5nIHRvIGJlIHN1Z2dlc3RlZCB0byB0aGUgdXNlclxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gVGV4dCB3aGljaCB3YXMgdHlwZWQgaW50byB0aGUgYXV0b2NvbXBsZXRlIGJ5IHRoZSB1c2VyXG4gKiBAcmV0dXJucyB7W3N0cmluZywgYm9vbGVhbl1bXX0gQW4gYXJyYXkgb2YgYXJyYXlzIHdoaWNoIGNvbnRhaW4gdHdvIGl0ZW1zLCB0aGUgZmlyc3QgaXMgdGhlIGNoYXJhY3RlciBpbiB0aGUgc3VnZ2VzdGlvbiwgdGhlIHNlY29uZCBpcyBhIGJvb2xlYW4gd2hpY2ggaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuXG4gKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodFN1Z2dlc3Rpb24oc3VnZ2VzdGlvbiwgcXVlcnkpIHtcblx0Y29uc3QgcmVzdWx0ID0gc3VnZ2VzdGlvbi5zcGxpdCgnJyk7XG5cblx0Y29uc3QgbWF0Y2hJbmRleCA9IHN1Z2dlc3Rpb24udG9Mb2NhbGVMb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuXHRyZXR1cm4gcmVzdWx0Lm1hcChmdW5jdGlvbihjaGFyYWN0ZXIsIGluZGV4KSB7XG5cdFx0bGV0IHNob3VsZEhpZ2hsaWdodCA9IHRydWU7XG5cdFx0Y29uc3QgaGFzTWF0Y2hlZCA9IG1hdGNoSW5kZXggPiAtMTtcblx0XHRjb25zdCBjaGFyYWN0ZXJJc1dpdGhpbk1hdGNoID0gaW5kZXggPj0gbWF0Y2hJbmRleCAmJiBpbmRleCA8PSBtYXRjaEluZGV4ICsgcXVlcnkubGVuZ3RoIC0gMTtcblx0XHRpZiAoaGFzTWF0Y2hlZCAmJiBjaGFyYWN0ZXJJc1dpdGhpbk1hdGNoKSB7XG5cdFx0XHRzaG91bGRIaWdobGlnaHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIFtjaGFyYWN0ZXIsIHNob3VsZEhpZ2hsaWdodF07XG5cdH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBET00gZm9yIHRoZSBsb2FkaW5nIGNvbnRhaW5lci5cbiAqIEByZXR1cm5zIHtIVE1MRGl2RWxlbWVudH0gVGhlIGxvYWRpbmcgY29udGFpbmVyLlxuICovXG5mdW5jdGlvbiBjcmVhdGVMb2FkaW5nQ29udGFpbmVyKCkge1xuXHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGBcblx0XHQ8ZGl2IGNsYXNzPVwiby1hdXRvY29tcGxldGVfX21lbnUtbG9hZGluZy1jb250YWluZXJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJvLWF1dG9jb21wbGV0ZV9fbWVudS1sb2FkaW5nXCI+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdGApO1xuXHRyZXR1cm4gZnJhZ21lbnQucXVlcnlTZWxlY3RvcignKicpO1xufVxuXG4vKipcbiAqIFNob3cgdGhlIGxvYWRpbmcgcGFuZWxcbiAqIEBwYXJhbSB7QXV0b0NvbXBsZXRlfSBpbnN0YW5jZSBUaGUgYXV0b2NvbXBsZXRlIGluc3RhbmNlIHdob3NlIGxvYWRpbmcgcGFuZWwgc2hvdWxkIGJlIHNob3duXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc2hvd0xvYWRpbmdQYW5lKGluc3RhbmNlKSB7XG5cdGluc3RhbmNlLmNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnN0YW5jZS5sb2FkaW5nQ29udGFpbmVyKTtcblx0Y29uc3QgbWVudSA9IGluc3RhbmNlLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuby1hdXRvY29tcGxldGVfX21lbnUnKTtcblx0aWYgKG1lbnUpIHtcblx0XHRtZW51LmNsYXNzTGlzdC5hZGQoJ28tYXV0b2NvbXBsZXRlX19tZW51LS1sb2FkaW5nJyk7XG5cdH1cbn1cblxuLyoqXG4gKiBIaWRlIHRoZSBsb2FkaW5nIHBhbmVsXG4gKiBAcGFyYW0ge0F1dG9Db21wbGV0ZX0gaW5zdGFuY2UgVGhlIGF1dG9jb21wbGV0ZSBpbnN0YW5jZSB3aG9zZSBsb2FkaW5nIHBhbmVsIHNob3VsZCBiZSBoaWRkZW5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBoaWRlTG9hZGluZ1BhbmUoaW5zdGFuY2UpIHtcblx0aWYgKGluc3RhbmNlLmNvbnRhaW5lci5jb250YWlucyhpbnN0YW5jZS5sb2FkaW5nQ29udGFpbmVyKSkge1xuXHRcdGluc3RhbmNlLmNvbnRhaW5lci5yZW1vdmVDaGlsZChpbnN0YW5jZS5sb2FkaW5nQ29udGFpbmVyKTtcblx0fVxuXHRjb25zdCBtZW51ID0gaW5zdGFuY2UuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5vLWF1dG9jb21wbGV0ZV9fbWVudScpO1xuXHRpZiAobWVudSkge1xuXHRcdG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnby1hdXRvY29tcGxldGVfX21lbnUtLWxvYWRpbmcnKTtcblx0fVxufVxuXG4vKipcbiAqIENyZWF0ZSB0aGUgRE9NIHRyZWUgd2hpY2ggY29ycmVzcG9uZHMgdG9cbiAqIDxidXR0b24gY2xhc3M9XCJvLWF1dG9jb21wbGV0ZV9fY2xlYXJcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1jb250cm9scz0ke2F1dG9jb21wbGV0ZUVsLmlkfSB0aXRsZT1cIkNsZWFyIGlucHV0XCI+XG4gKiBcdDxzcGFuIGNsYXNzPVwiby1hdXRvY29tcGxldGVfX3Zpc3VhbGx5LWhpZGRlblwiPkNsZWFyIGlucHV0PC9zcGFuPlxuICogPC9idXR0b24+XG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBhdXRvY29tcGxldGUgaW5wdXQgdG8gYXNzb2NpYXRlIHRoZSBjbGVhciBidXR0b24gd2l0aFxuICogQHJldHVybnMge0hUTUxCdXR0b25FbGVtZW50fSBUaGUgY2xlYXIgYnV0dG9uIERPTSB0cmVlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNsZWFyQnV0dG9uKGlkKSB7XG5cdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoYFxuXHRcdDxidXR0b24gY2xhc3M9XCJvLWF1dG9jb21wbGV0ZV9fY2xlYXJcIiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1jb250cm9scz1cIiR7aWR9XCIgdGl0bGU9XCJDbGVhciBpbnB1dFwiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJvLWF1dG9jb21wbGV0ZV9fdmlzdWFsbHktaGlkZGVuXCI+Q2xlYXIgaW5wdXQ8L3NwYW4+XG5cdFx0PC9idXR0b24+XG5cdGApO1xuXHRyZXR1cm4gZnJhZ21lbnQucXVlcnlTZWxlY3RvcignKicpO1xufVxuXG4vKipcbiAqIEF0dGFjaCB0aGUgY2xlYXIgYnV0dG9uIGFuZCBjb3JyZXNwb25kaW5nIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgby1hdXRvY29tcGxldGUgaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXV0b0NvbXBsZXRlfSBpbnN0YW5jZSBUaGUgYXV0b2NvbXBsZXRlIGluc3RhbmNlIHRvIHNldHVwIHRoZSBjbGVhciBidXR0b24gZm9yXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gaW5pdENsZWFyQnV0dG9uKGluc3RhbmNlKSB7XG5cdGNvbnN0IGlucHV0ID0gaW5zdGFuY2UuYXV0b2NvbXBsZXRlRWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0Y29uc3QgY2xlYXJCdXR0b24gPSBjcmVhdGVDbGVhckJ1dHRvbihpbnB1dC5pZCk7XG5cdGxldCB0aW1lb3V0ID0gbnVsbDtcblx0Y2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0Ly8gUmVtb3ZlIHRoZSBsb2FkaW5nIHBhbmUsIGluLWNhc2Ugb2YgYSBzbG93IHJlc3BvbnNlLlxuXHRcdGhpZGVMb2FkaW5nUGFuZShpbnN0YW5jZSk7XG5cdFx0Y2xlYXJCdXR0b24ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChjbGVhckJ1dHRvbik7XG5cdFx0Ly8gQ2xlYXIgdGhlIGlucHV0XG5cdFx0aW5wdXQudmFsdWUgPSAnJztcblx0XHQvLyBXZSBuZWVkIHRvIHdhaXQgbG9uZ2VyIHRoYW4gMTAwbXMgYmVmb3JlIGZvY3VzaW5nXG5cdFx0Ly8gb250byB0aGUgaW5wdXQgZWxlbWVudCBiZWNhdXNlIGFjY2Vzc2libGUtYXV0b2NvbXBsZXRlXG5cdFx0Ly8gb25seSBjaGVja3MgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBldmVyeSAxMDBtcy5cblx0XHQvLyBJZiB3ZSBtb2RpZnkgaW5wdXQudmFsdWUgYW5kIHRoZW4gZm9jdXMgaW50byB0aGUgaW5wdXQgaW4gbGVzc1xuXHRcdC8vIHRoYW4gMTAwbXMsIGFjY2Vzc2libGUtYXV0b2NvbXBsZXRlIHdvdWxkIG5vdCBoYXZlIHRoZSB1cGRhdGVkXG5cdFx0Ly8gdmFsdWUgYW5kIHdvdWxkIGluc3RlYWQgd3JpdGUgdGhlIG9sZCB2YWx1ZSBiYWNrIGludG8gdGhlIGlucHV0LlxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbHBoYWdvdi9hY2Nlc3NpYmxlLWF1dG9jb21wbGV0ZS9ibG9iLzkzNWYwZDQzYWVhMWM2MDZlNmIzODk4NWUzZmU3MDQ5ZGRiZTk4YmUvc3JjL2F1dG9jb21wbGV0ZS5qcyNMMTA3LUwxMjVcblx0XHRpZiAoIXRpbWVvdXQpIHtcblx0XHRcdC8vIFRoZSB1c2VyIGNvdWxkIHByZXNzIHRoZSBidXR0b24gbXVsdGlwbGUgdGltZXNcblx0XHRcdC8vIHdoaWxzdCB0aGUgc2V0VGltZW91dCBoYW5kbGVyIGhhcyB5ZXQgdG8gZXhlY3V0ZVxuXHRcdFx0Ly8gV2Ugb25seSB3YW50IHRvIGNhbGwgdGhlIGhhbmRsZXIgb25jZVxuXHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRpbnB1dC5mb2N1cygpO1xuXHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdH0sIDExMCk7XG5cdFx0fVxuXHR9KTtcblx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgdGV4dEluSW5wdXQgPSBpbnB1dC52YWx1ZS5sZW5ndGggPiAwO1xuXG5cdFx0Y29uc3QgY2xlYXJCdXR0b25PblBhZ2UgPSBpbnN0YW5jZS5hdXRvY29tcGxldGVFbC5jb250YWlucyhjbGVhckJ1dHRvbik7XG5cdFx0aWYgKHRleHRJbklucHV0KSB7XG5cdFx0XHRpZiAoIWNsZWFyQnV0dG9uT25QYWdlKSB7XG5cdFx0XHRcdGluc3RhbmNlLmF1dG9jb21wbGV0ZUVsLmFwcGVuZENoaWxkKGNsZWFyQnV0dG9uKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGNsZWFyQnV0dG9uT25QYWdlKSB7XG5cdFx0XHRcdGNsZWFyQnV0dG9uLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoY2xlYXJCdXR0b24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQGNhbGxiYWNrIFBvcHVsYXRlT3B0aW9uc1xuICogQHBhcmFtIHtBcnJheTwqPn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHdoaWNoIG1hdGNoIHRoZSByZXh0IHdoaWNoIHdhcyB0eXBlZCBpbnRvIHRoZSBhdXRvY29tcGxldGUgYnkgdGhlIHVzZXJcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIFNvdXJjZVxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gVGV4dCB3aGljaCB3YXMgdHlwZWQgaW50byB0aGUgYXV0b2NvbXBsZXRlIGJ5IHRoZSB1c2VyXG4gKiBAcGFyYW0ge1BvcHVsYXRlT3B0aW9uc30gcG9wdWxhdGVPcHRpb25zIC0gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHJlYWR5IHRvIHVwZGF0ZSB0aGUgc3VnZ2VzdGlvbnMgZHJvcGRvd25cbiAqIEByZXR1cm5zIHt2b2lkfVxuKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgTWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZVxuICogQHBhcmFtIHsqfSBvcHRpb24gLSBUaGUgb3B0aW9uIHRvIHRyYW5zZm9ybSBpbnRvIGEgc3VnZ2VzdGlvbiBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gZGlzcGxheSBhcyB0aGUgc3VnZ2VzdGlvbnMgZm9yIHRoaXMgb3B0aW9uXG4qL1xuXG4vKipcbiAqIEBjYWxsYmFjayBvbkNvbmZpcm1cbiAqIEBwYXJhbSB7Kn0gb3B0aW9uIC0gVGhlIG9wdGlvbiB0aGUgdXNlciBzZWxlY3RlZFxuICogQHJldHVybnMge3ZvaWR9XG4qL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEF1dG9jb21wbGV0ZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7U291cmNlfSBbc291cmNlXSAtIFRoZSBmdW5jdGlvbiB3aGljaCByZXRyaWV2ZXMgdGhlIHN1Z2dlc3Rpb25zIHRvIGRpc3BsYXlcbiAqIEBwcm9wZXJ0eSB7TWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZX0gW21hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWVdIC0gRnVuY3Rpb24gd2hpY2ggdHJhbnNmb3JtcyBhIHN1Z2dlc3Rpb24gYmVmb3JlIHJlbmRlcmluZ1xuICogQHByb3BlcnR5IHtvbkNvbmZpcm19IFtvbkNvbmZpcm1dIC0gRnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBvcHRpb25cbiAqL1xuXG5jbGFzcyBBdXRvY29tcGxldGUge1xuXHQvKipcblx0ICogQ2xhc3MgY29uc3RydWN0b3IuXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFthdXRvY29tcGxldGVFbF0gLSBUaGUgY29tcG9uZW50IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcGFyYW0ge0F1dG9jb21wbGV0ZU9wdGlvbnN9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50XG5cdCAqL1xuXHRjb25zdHJ1Y3RvciAoYXV0b2NvbXBsZXRlRWwsIG9wdGlvbnMpIHtcblx0XHR0aGlzLmF1dG9jb21wbGV0ZUVsID0gYXV0b2NvbXBsZXRlRWw7XG5cblx0XHRjb25zdCBvcHRzID0gb3B0aW9ucyB8fCBBdXRvY29tcGxldGUuZ2V0RGF0YUF0dHJpYnV0ZXMoYXV0b2NvbXBsZXRlRWwpO1xuXHRcdHRoaXMub3B0aW9ucyA9IHt9O1xuXHRcdGlmIChvcHRzLnNvdXJjZSkge1xuXHRcdFx0dGhpcy5vcHRpb25zLnNvdXJjZSA9IG9wdHMuc291cmNlO1xuXHRcdH1cblx0XHRpZiAob3B0cy5tYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZSA9IG9wdHMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZTtcblx0XHR9XG5cdFx0aWYgKG9wdHMub25Db25maXJtKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMub25Db25maXJtID0gb3B0cy5vbkNvbmZpcm07XG5cdFx0fVxuXG5cdFx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ28tYXV0b2NvbXBsZXRlX19saXN0Ym94LWNvbnRhaW5lcicpO1xuXHRcdHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuXG5cdFx0Y29uc3Qgc2VsZWN0SW5wdXRFbGVtZW50ID0gYXV0b2NvbXBsZXRlRWwucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMuc291cmNlICYmICFzZWxlY3RJbnB1dEVsZW1lbnQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGEgc291cmNlIGZvciBhdXRvLWNvbXBsZXRpb24gb3B0aW9ucy4gQWRkIGEgYHNlbGVjdGAgZWxlbWVudCB0byB5b3VyIG1hcmt1cCwgb3IgY29uZmlndXJlIGEgYHNvdXJjZWAgZnVuY3Rpb24gdG8gZmV0Y2ggYXV0b2NvbXBsZXRlIG9wdGlvbnMuXCIpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuc291cmNlKSB7XG5cdFx0XHQvLyBJZiBzb3VyY2UgaXMgYSBzdHJpbmcsIHRoZW4gaXQgaXMgdGhlIG5hbWUgb2YgYSBnbG9iYWwgZnVuY3Rpb24gdG8gdXNlLlxuXHRcdFx0Ly8gSWYgc291cmNlIGlzIG5vdCBhIHN0cmluZywgdGhlbiBpdCBpcyBhIGZ1bmN0aW9uIHRvIHVzZS5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUge1NvdXJjZX1cblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgY3VzdG9tU291cmNlID0gdHlwZW9mIHRoaXMub3B0aW9ucy5zb3VyY2UgPT09ICdzdHJpbmcnID8gd2luZG93W3RoaXMub3B0aW9ucy5zb3VyY2VdIDogdGhpcy5vcHRpb25zLnNvdXJjZTtcblxuXHRcdFx0Ly8gSWYgbWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZSBpcyBhIHN0cmluZywgdGhlbiBpdCBpcyB0aGUgbmFtZSBvZiBhIGdsb2JhbCBmdW5jdGlvbiB0byB1c2UuXG5cdFx0XHQvLyBJZiBtYXBPcHRpb25Ub1N1Z2dlc3RlZFZhbHVlIGlzIG5vdCBhIHN0cmluZywgdGhlbiBpdCBpcyBhIGZ1bmN0aW9uIHRvIHVzZS5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUge01hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWV9XG5cdFx0XHQgKi9cblx0XHRcdHRoaXMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZSA9IHR5cGVvZiB0aGlzLm9wdGlvbnMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZSA9PT0gJ3N0cmluZycgPyB3aW5kb3dbdGhpcy5vcHRpb25zLm1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWVdIDogdGhpcy5vcHRpb25zLm1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWU7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gVGV4dCB3aGljaCB3YXMgdHlwZWQgaW50byB0aGUgYXV0b2NvbXBsZXRlIGJ5IHRoZSB1c2VyXG5cdFx0XHQgKiBAcGFyYW0ge1BvcHVsYXRlT3B0aW9uc30gcG9wdWxhdGVPcHRpb25zIC0gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHJlYWR5IHRvIHVwZGF0ZSB0aGUgc3VnZ2VzdGlvbnMgZHJvcGRvd25cblx0XHRcdCAqIEByZXR1cm5zIHt2b2lkfVxuXHRcdFx0Ki9cblx0XHRcdHRoaXMub3B0aW9ucy5zb3VyY2UgPSAocXVlcnksIHBvcHVsYXRlT3B0aW9ucykgPT4ge1xuXHRcdFx0XHRzaG93TG9hZGluZ1BhbmUodGhpcyk7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB3aGljaCBtYXRjaCB0aGUgcmV4dCB3aGljaCB3YXMgdHlwZWQgaW50byB0aGUgYXV0b2NvbXBsZXRlIGJ5IHRoZSB1c2VyXG5cdFx0XHRcdCAqIEByZXR1cm5zIHt2b2lkfVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0Y29uc3QgY2FsbGJhY2sgPSAob3B0aW9ucykgPT4ge1xuXHRcdFx0XHRcdGhpZGVMb2FkaW5nUGFuZSh0aGlzKTtcblx0XHRcdFx0XHRwb3B1bGF0ZU9wdGlvbnMob3B0aW9ucyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGN1c3RvbVNvdXJjZShxdWVyeSwgY2FsbGJhY2spO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGlucHV0ID0gYXV0b2NvbXBsZXRlRWwucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblx0XHRcdGNvbnN0IGlkID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuXHRcdFx0Y29uc3QgbmFtZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpO1xuXHRcdFx0Y29uc3QgcGxhY2Vob2xkZXIgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyk7XG5cdFx0XHRjb25zdCBpc1JlcXVpcmVkID0gaW5wdXQuaGFzQXR0cmlidXRlKCdyZXF1aXJlZCcpO1xuXG5cdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgYGlkYCBhdHRyaWJ1dGUgb24gdGhlIG8tYXV0b2NvbXBsZXRlIGlucHV0LiBBbiBgaWRgIG5lZWRzIHRvIGJlIHNldCBhcyBpdCBpcyB1c2VkIHdpdGhpbiB0aGUgby1hdXRvY29tcGxldGUgdG8gaW1wbGVtZW50IHRoZSBhY2Nlc3NpYmlsaXR5IGZlYXR1cmVzLlwiKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuYXV0b2NvbXBsZXRlRWwuaW5uZXJIVE1MID0gJyc7XG5cdFx0XHR0aGlzLmF1dG9jb21wbGV0ZUVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcblx0XHRcdGFjY2Vzc2libGVBdXRvY29tcGxldGUoe1xuXHRcdFx0XHRlbGVtZW50OiB0aGlzLmNvbnRhaW5lcixcblx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogcGxhY2Vob2xkZXIsXG5cdFx0XHRcdHJlcXVpcmVkOiBpc1JlcXVpcmVkLFxuXHRcdFx0XHRvbkNvbmZpcm06IChvcHRpb24pID0+IHtcblx0XHRcdFx0XHRpZiAob3B0aW9uICYmIHRoaXMub3B0aW9ucy5vbkNvbmZpcm0pIHtcblx0XHRcdFx0XHRcdHRoaXMub3B0aW9ucy5vbkNvbmZpcm0ob3B0aW9uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZSxcblx0XHRcdFx0Y3NzTmFtZXNwYWNlOiAnby1hdXRvY29tcGxldGUnLFxuXHRcdFx0XHRkaXNwbGF5TWVudTogJ292ZXJsYXknLFxuXHRcdFx0XHRzaG93Tm9PcHRpb25zRm91bmQ6IGZhbHNlLFxuXHRcdFx0XHR0ZW1wbGF0ZXM6IHtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBVc2VkIHdoZW4gcmVuZGVyaW5nIHN1Z2dlc3Rpb25zLCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoaXMgd2lsbCBiZSB1c2VkIGFzIHRoZSBpbm5lckhUTUwgZm9yIGEgc2luZ2xlIHN1Z2dlc3Rpb24uXG5cdFx0XHRcdFx0ICogQHBhcmFtIHsqfSBvcHRpb24gVGhlIHN1Z2dlc3Rpb24gdG8gYXBwbHkgdGhlIHRlbXBsYXRlIHdpdGguXG5cdFx0XHRcdFx0ICogQHJldHVybnMge3N0cmluZ30gSFRNTCBzdHJpbmcgdG8gcmVwcmVzZW50IGEgc2luZ2xlIHN1Z2dlc3Rpb24uXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0c3VnZ2VzdGlvbjogKG9wdGlvbikgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBvcHRpb24gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBgbWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZWAgZnVuY3Rpb24gaXMgZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHQvLyBBcHBseSB0aGUgZnVuY3Rpb24gdG8gdGhlIG9wdGlvbi4gVGhpcyBpcyBhIHdheSBmb3IgdGhlXG5cdFx0XHRcdFx0XHRcdC8vIGNvbnN1bWluZyBhcHBsaWNhdGlvbiB0byBkZWNpZGUgd2hhdCB0ZXh0IHNob3VsZCBiZVxuXHRcdFx0XHRcdFx0XHQvLyBzaG93biBmb3IgdGhpcyBvcHRpb24uXG5cdFx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgdXN1YWxseSBkZWZpbmVkIHdoZW4gdGhlIG9wdGlvbiBpcyBub3QgYWxyZWFkeSBhIHN0cmluZy5cblx0XHRcdFx0XHRcdFx0Ly8gRm9yIGV4YW1wbGUsIGlmIHRoZSBvcHRpb24gaXMgYW4gb2JqZWN0IHdoaWNoIGNvbnRhaW5zIGEgcHJvcGVydHlcblx0XHRcdFx0XHRcdFx0Ly8gd2hpY2ggc2hvdWxkIGJlIHVzZWQgYXMgdGhlIHN1Z2dlc3Rpb24gc3RyaW5nLlxuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbiA9IHRoaXMubWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZShvcHRpb24pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb24gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgb3B0aW9uIHRyeWluZyB0byBiZSBkaXNwbGF5ZWQgYXMgYSBzdWdnZXN0aW9uIGlzIG5vdCBhIHN0cmluZywgaXQgaXMgXCIke3R5cGVvZiBvcHRpb259XCIuIG8tYXV0b2NvbXBsZXRlIGNhbiBvbmx5IGRpc3BsYXkgc3RyaW5ncyBhcyBzdWdnZXN0aW9ucy4gRGVmaW5lIGEgXFxgbWFwT3B0aW9uVG9TdWdnZXN0ZWRWYWx1ZVxcYCBmdW5jdGlvbiB0byBjb252ZXJ0IHRoZSBvcHRpb24gaW50byBhIHN0cmluZyB0byBiZSB1c2VkIGFzIHRoZSBzdWdnZXN0aW9uLmApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN1Z2dlc3Rpb25UZW1wbGF0ZShvcHRpb24pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogVXNlZCB3aGVuIGEgc3VnZ2VzdGlvbiBpcyBzZWxlY3RlZCwgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGlzIHdpbGwgYmUgdXNlZCBhcyB0aGUgdmFsdWUgZm9yIHRoZSBpbnB1dCBlbGVtZW50LlxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7Kn0gb3B0aW9uIFRoZSBzdWdnZXN0aW9uIHdoaWNoIHdhcyBzZWxlY3RlZC5cblx0XHRcdFx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgdG8gcmVwcmVzZW50IHRoZSBzdWdnZXN0aW9uLlxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGlucHV0VmFsdWU6IChvcHRpb24pID0+IHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHQvLyBJZiB0aGUgYG1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWVgIGZ1bmN0aW9uIGlzIGRlZmluZWRcblx0XHRcdFx0XHRcdFx0Ly8gQXBwbHkgdGhlIGZ1bmN0aW9uIHRvIHRoZSBvcHRpb24uIFRoaXMgaXMgYSB3YXkgZm9yIHRoZVxuXHRcdFx0XHRcdFx0XHQvLyBjb25zdW1pbmcgYXBwbGljYXRpb24gdG8gZGVjaWRlIHdoYXQgdGV4dCBzaG91bGQgYmVcblx0XHRcdFx0XHRcdFx0Ly8gc2hvd24gZm9yIHRoaXMgb3B0aW9uLlxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIHVzdWFsbHkgZGVmaW5lZCB3aGVuIHRoZSBvcHRpb24gaXMgbm90IGFscmVhZHkgYSBzdHJpbmcuXG5cdFx0XHRcdFx0XHRcdC8vIEZvciBleGFtcGxlLCBpZiB0aGUgb3B0aW9uIGlzIGFuIG9iamVjdCB3aGljaCBjb250YWlucyBhIHByb3BlcnR5XG5cdFx0XHRcdFx0XHRcdC8vIHdoaWNoIHNob3VsZCBiZSB1c2VkIGFzIHRoZSBzdWdnZXN0aW9uIHN0cmluZy5cblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLm1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb24gPSB0aGlzLm1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWUob3B0aW9uKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihgVGhlIG9wdGlvbiB0cnlpbmcgdG8gYmUgZGlzcGxheWVkIGFzIGEgc3VnZ2VzdGlvbiBpcyBub3QgYSBzdHJpbmcsIGl0IGlzIFwiJHt0eXBlb2Ygb3B0aW9ufVwiLiBvLWF1dG9jb21wbGV0ZSBjYW4gb25seSBkaXNwbGF5IHN0cmluZ3MgYXMgc3VnZ2VzdGlvbnMuIERlZmluZSBhIFxcYG1hcE9wdGlvblRvU3VnZ2VzdGVkVmFsdWVcXGAgZnVuY3Rpb24gdG8gY29udmVydCB0aGUgb3B0aW9uIGludG8gYSBzdHJpbmcgdG8gYmUgdXNlZCBhcyB0aGUgc3VnZ2VzdGlvbi5gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGlkID0gc2VsZWN0SW5wdXRFbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcblx0XHRcdGNvbnN0IG5hbWUgPSBzZWxlY3RJbnB1dEVsZW1lbnQuZ2V0QXR0cmlidXRlKCduYW1lJyk7XG5cdFx0XHRjb25zdCBpc1JlcXVpcmVkID0gc2VsZWN0SW5wdXRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVxdWlyZWQnKTtcblxuXHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGBpZGAgYXR0cmlidXRlIG9uIHRoZSBvLWF1dG9jb21wbGV0ZSBpbnB1dC4gQW4gYGlkYCBuZWVkcyB0byBiZSBzZXQgYXMgaXQgaXMgdXNlZCB3aXRoaW4gdGhlIG8tYXV0b2NvbXBsZXRlIHRvIGltcGxlbWVudCB0aGUgYWNjZXNzaWJpbGl0eSBmZWF0dXJlcy5cIik7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmF1dG9jb21wbGV0ZUVsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcblx0XHRcdHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdElucHV0RWxlbWVudCk7XG5cdFx0XHRhY2Nlc3NpYmxlQXV0b2NvbXBsZXRlLmVuaGFuY2VTZWxlY3RFbGVtZW50KHtcblx0XHRcdFx0c2VsZWN0RWxlbWVudDogc2VsZWN0SW5wdXRFbGVtZW50LFxuXHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRyZXF1aXJlZDogaXNSZXF1aXJlZCxcblx0XHRcdFx0b25Db25maXJtOiAob3B0aW9uKSA9PiB7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbiAmJiB0aGlzLm9wdGlvbnMub25Db25maXJtKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wdGlvbnMub25Db25maXJtKG9wdGlvbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhdXRvc2VsZWN0OiBmYWxzZSxcblx0XHRcdFx0ZGVmYXVsdFZhbHVlOiAnJyxcblx0XHRcdFx0cGxhY2Vob2xkZXI6ICcnLFxuXHRcdFx0XHRjc3NOYW1lc3BhY2U6ICdvLWF1dG9jb21wbGV0ZScsXG5cdFx0XHRcdGRpc3BsYXlNZW51OiAnb3ZlcmxheScsXG5cdFx0XHRcdHNob3dOb09wdGlvbnNGb3VuZDogZmFsc2UsXG5cdFx0XHRcdHRlbXBsYXRlczoge1xuXHRcdFx0XHRcdHN1Z2dlc3Rpb246IHRoaXMuc3VnZ2VzdGlvblRlbXBsYXRlLmJpbmQodGhpcylcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRzZWxlY3RJbnB1dEVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChzZWxlY3RJbnB1dEVsZW1lbnQpOyAvLyBSZW1vdmUgdGhlIG9yaWdpbmFsIHNlbGVjdCBlbGVtZW50XG5cdFx0fVxuXG5cdFx0dGhpcy5sb2FkaW5nQ29udGFpbmVyID0gY3JlYXRlTG9hZGluZ0NvbnRhaW5lcigpO1xuXHRcdGluaXRDbGVhckJ1dHRvbih0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVc2VkIHdoZW4gcmVuZGVyaW5nIHN1Z2dlc3Rpb25zLCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoaXMgd2lsbCBiZSB1c2VkIGFzIHRoZSBpbm5lckhUTUwgZm9yIGEgc2luZ2xlIHN1Z2dlc3Rpb24uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdWdnZXN0ZWRWYWx1ZSBUaGUgc3VnZ2VzdGlvbiB0byBhcHBseSB0aGUgdGVtcGxhdGUgd2l0aC5cblx0ICogQHJldHVybnMge3N0cmluZ30gSFRNTCBzdHJpbmcgdG8gYmUgcmVwcmVzZW50IGEgc2luZ2xlIHN1Z2dlc3Rpb24uXG5cdCAqL1xuXHRzdWdnZXN0aW9uVGVtcGxhdGUgKHN1Z2dlc3RlZFZhbHVlKSB7XG5cdFx0Ly8gby1hdXRvY29tcGxldGUgaGFzIGEgVUkgZGVzaWduIHRvIGhpZ2hsaWdodCBjaGFyYWN0ZXJzIGluIHRoZSBzdWdnZXN0aW9ucy5cblx0XHQvKipcblx0XHQgKiBAdHlwZSB7W3N0cmluZywgYm9vbGVhbl1bXX0gQW4gYXJyYXkgb2YgYXJyYXlzIHdoaWNoIGNvbnRhaW4gdHdvIGl0ZW1zLCB0aGUgZmlyc3QgaXMgdGhlIGNoYXJhY3RlciBpbiB0aGUgc3VnZ2VzdGlvbiwgdGhlIHNlY29uZCBpcyBhIGJvb2xlYW4gd2hpY2ggaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICovXG5cdFx0Y29uc3QgY2hhcmFjdGVycyA9IGhpZ2hsaWdodFN1Z2dlc3Rpb24oc3VnZ2VzdGVkVmFsdWUsIHRoaXMuYXV0b2NvbXBsZXRlRWwucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSk7XG5cblx0XHRsZXQgb3V0cHV0ID0gJyc7XG5cdFx0Zm9yIChjb25zdCBbY2hhcmFjdGVyLCBzaG91ZEhpZ2hsaWdodF0gb2YgY2hhcmFjdGVycykge1xuXHRcdFx0aWYgKHNob3VkSGlnaGxpZ2h0KSB7XG5cdFx0XHRcdG91dHB1dCArPSBgPHNwYW4gY2xhc3M9XCJvLWF1dG9jb21wbGV0ZV9fb3B0aW9uLS1oaWdobGlnaHRcIj4ke2NoYXJhY3Rlcn08L3NwYW4+YDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dCArPSBgJHtjaGFyYWN0ZXJ9YDtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRzcGFuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHN1Z2dlc3RlZFZhbHVlKTtcblx0XHRzcGFuLmlubmVySFRNTCA9IG91dHB1dDtcblx0XHRyZXR1cm4gc3Bhbi5vdXRlckhUTUw7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgQXV0b2NvbXBsZXRlRWxlbWVudC4gSWYgdGhlIGVsZW1lbnQgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYXV0b2NvbXBsZXRlRWwgLSBUaGUgY29tcG9uZW50IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvcHRpb25zIG9iamVjdCB3aGljaCBjYW4gYmUgdXNlZCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKi9cblx0c3RhdGljIGdldERhdGFBdHRyaWJ1dGVzIChhdXRvY29tcGxldGVFbCkge1xuXHRcdGlmICghKGF1dG9jb21wbGV0ZUVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXG5cdFx0aWYgKGF1dG9jb21wbGV0ZUVsLmRhdGFzZXQub0F1dG9jb21wbGV0ZVNvdXJjZSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c291cmNlOiBhdXRvY29tcGxldGVFbC5kYXRhc2V0Lm9BdXRvY29tcGxldGVTb3VyY2Vcblx0XHRcdH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqIEluaXRpYWxpc2Ugby1hdXRvY29tcGxldGUgY29tcG9uZW50L3MuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbnRpYWxpc2UgdGhlIGNvbXBvbmVudCBpbiwgb3IgYSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSByb290IGVsZW1lbnRcblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgY29tcG9uZW50XG5cdCAqIEByZXR1cm5zIHtBdXRvY29tcGxldGV8QXV0b2NvbXBsZXRlW119IFRoZSBuZXdseSBjb25zdHJ1Y3RlZCBBdXRvY29tcGxldGUgY29tcG9uZW50c1xuXHQgKi9cblx0c3RhdGljIGluaXQgKHJvb3RFbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0aWYgKCFyb290RWxlbWVudCkge1xuXHRcdFx0cm9vdEVsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbGVtZW50KTtcblx0XHR9XG5cdFx0aWYgKHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcm9vdEVsZW1lbnQubWF0Y2hlcygnW2RhdGEtby1jb21wb25lbnQ9by1hdXRvY29tcGxldGVdJykpIHtcblx0XHRcdHJldHVybiBuZXcgQXV0b2NvbXBsZXRlKHJvb3RFbGVtZW50LCBvcHRpb25zKTtcblx0XHR9XG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLWF1dG9jb21wbGV0ZVwiXScpLCByb290RWwgPT4gbmV3IEF1dG9jb21wbGV0ZShyb290RWwsIG9wdGlvbnMpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGU7XG4iLCJpbXBvcnQgb0F1dG9jb21wbGV0ZSBmcm9tICcuL3NyYy9qcy9hdXRvY29tcGxldGUuanMnO1xuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24gKCkge1xuXHRvQXV0b2NvbXBsZXRlLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuZXhwb3J0IGRlZmF1bHQgb0F1dG9jb21wbGV0ZTsiLCJpbXBvcnQgJy4uLy4uLy4uL21haW4uanMnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtGdW5jdGlvbn0gUG9wdWxhdGVPcHRpb25zXG4gKiBAcHJvcGVydHkge0FycmF5PHN0cmluZz59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB3aGljaCBtYXRjaCB0aGUgcmV4dCB3aGljaCB3YXMgdHlwZWQgaW50byB0aGUgYXV0b2NvbXBsZXRlIGJ5IHRoZSB1c2VyXG4gKi9cblxuXG5sZXQgc3VnZ2VzdGlvblRpbWVvdXRJZDtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IC0gVGV4dCB3aGljaCB3YXMgdHlwZWQgaW50byB0aGUgYXV0b2NvbXBsZXRlIGJ5IHRoZSB1c2VyXG4gKiBAcGFyYW0ge1BvcHVsYXRlT3B0aW9uc30gcG9wdWxhdGVPcHRpb25zIC0gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHJlYWR5IHRvIHVwZGF0ZSB0aGUgc3VnZ2VzdGlvbnMgZHJvcGRvd25cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBjdXN0b21TdWdnZXN0aW9ucyhxdWVyeSwgcG9wdWxhdGVPcHRpb25zKSB7XG5cdGNsZWFyVGltZW91dChzdWdnZXN0aW9uVGltZW91dElkKTtcblx0aWYgKCFxdWVyeSkge1xuXHRcdHBvcHVsYXRlT3B0aW9ucyhbXSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IHN1Z2dlc3Rpb25zID0gW1xuXHRcdCdBZmdoYW5pc3RhbicsXG5cdFx0J0Frcm90aXJpJyxcblx0XHQnQWxiYW5pYScsXG5cdFx0J0FsZ2VyaWEnLFxuXHRcdCdBbWVyaWNhbiBTYW1vYScsXG5cdFx0J0FuZG9ycmEnLFxuXHRcdCdBbmdvbGEnLFxuXHRcdCdBbmd1aWxsYScsXG5cdFx0J0FudGFyY3RpY2EnLFxuXHRcdCdBbnRpZ3VhIGFuZCBCYXJidWRhJyxcblx0XHQnQXJnZW50aW5hJyxcblx0XHQnQXJtZW5pYScsXG5cdFx0J0FydWJhJyxcblx0XHQnQXNobW9yZSBhbmQgQ2FydGllciBJc2xhbmRzJyxcblx0XHQnQXVzdHJhbGlhJyxcblx0XHQnQXVzdHJpYScsXG5cdFx0J0F6ZXJiYWlqYW4nLFxuXHRcdCdCYWhhbWFzLCBUaGUnLFxuXHRcdCdCYWhyYWluJyxcblx0XHQnQmFuZ2xhZGVzaCcsXG5cdFx0J0JhcmJhZG9zJyxcblx0XHQnQmFzc2FzIGRhIEluZGlhJyxcblx0XHQnQmVsYXJ1cycsXG5cdFx0J0JlbGdpdW0nLFxuXHRcdCdCZWxpemUnLFxuXHRcdCdCZW5pbicsXG5cdFx0J0Jlcm11ZGEnLFxuXHRcdCdCaHV0YW4nLFxuXHRcdCdCb2xpdmlhJyxcblx0XHQnQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYScsXG5cdFx0J0JvdHN3YW5hJyxcblx0XHQnQm91dmV0IElzbGFuZCcsXG5cdFx0J0JyYXppbCcsXG5cdFx0J0JyaXRpc2ggSW5kaWFuIE9jZWFuIFRlcnJpdG9yeScsXG5cdFx0J0JyaXRpc2ggVmlyZ2luIElzbGFuZHMnLFxuXHRcdCdCcnVuZWknLFxuXHRcdCdCdWxnYXJpYScsXG5cdFx0J0J1cmtpbmEgRmFzbycsXG5cdFx0J0J1cm1hJyxcblx0XHQnQnVydW5kaScsXG5cdFx0J0NhbWJvZGlhJyxcblx0XHQnQ2FtZXJvb24nLFxuXHRcdCdDYW5hZGEnLFxuXHRcdCdDYXBlIFZlcmRlJyxcblx0XHQnQ2F5bWFuIElzbGFuZHMnLFxuXHRcdCdDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnLFxuXHRcdCdDaGFkJyxcblx0XHQnQ2hpbGUnLFxuXHRcdCdDaGluYScsXG5cdFx0J0NocmlzdG1hcyBJc2xhbmQnLFxuXHRcdCdDbGlwcGVydG9uIElzbGFuZCcsXG5cdFx0J0NvY29zIChLZWVsaW5nKSBJc2xhbmRzJyxcblx0XHQnQ29sb21iaWEnLFxuXHRcdCdDb21vcm9zJyxcblx0XHQnQ29uZ28nLFxuXHRcdCdDb29rIElzbGFuZHMnLFxuXHRcdCdDb3JhbCBTZWEgSXNsYW5kcycsXG5cdFx0J0Nvc3RhIFJpY2EnLFxuXHRcdCdDb3RlIGRcXCdJdm9pcmUnLFxuXHRcdCdDcm9hdGlhJyxcblx0XHQnQ3ViYScsXG5cdFx0J0N5cHJ1cycsXG5cdFx0J0N6ZWNoIFJlcHVibGljJyxcblx0XHQnRGVubWFyaycsXG5cdFx0J0RoZWtlbGlhJyxcblx0XHQnRGppYm91dGknLFxuXHRcdCdEb21pbmljYScsXG5cdFx0J0RvbWluaWNhbiBSZXB1YmxpYycsXG5cdFx0J0VjdWFkb3InLFxuXHRcdCdFZ3lwdCcsXG5cdFx0J0VsIFNhbHZhZG9yJyxcblx0XHQnRXF1YXRvcmlhbCBHdWluZWEnLFxuXHRcdCdFcml0cmVhJyxcblx0XHQnRXN0b25pYScsXG5cdFx0J0V0aGlvcGlhJyxcblx0XHQnRXVyb3BhIElzbGFuZCcsXG5cdFx0J0ZhbGtsYW5kIElzbGFuZHMnLFxuXHRcdCdGYXJvZSBJc2xhbmRzJyxcblx0XHQnRmlqaScsXG5cdFx0J0ZpbmxhbmQnLFxuXHRcdCdGcmFuY2UnLFxuXHRcdCdGcmVuY2ggR3VpYW5hJyxcblx0XHQnRnJlbmNoIFBvbHluZXNpYScsXG5cdFx0J0ZyZW5jaCBTb3V0aGVybiBhbmQgQW50YXJjdGljIExhbmRzJyxcblx0XHQnR2Fib24nLFxuXHRcdCdHYW1iaWEsJyxcblx0XHQnR2F6YSBTdHJpcCcsXG5cdFx0J0dlb3JnaWEnLFxuXHRcdCdHZXJtYW55Jyxcblx0XHQnR2hhbmEnLFxuXHRcdCdHaWJyYWx0YXInLFxuXHRcdCdHbG9yaW9zbyBJc2xhbmRzJyxcblx0XHQnR3JlZWNlJyxcblx0XHQnR3JlZW5sYW5kJyxcblx0XHQnR3JlbmFkYScsXG5cdFx0J0d1YWRlbG91cGUnLFxuXHRcdCdHdWFtJyxcblx0XHQnR3VhdGVtYWxhJyxcblx0XHQnR3Vlcm5zZXknLFxuXHRcdCdHdWluZWEnLFxuXHRcdCdHdWluZWEtQmlzc2F1Jyxcblx0XHQnR3V5YW5hJyxcblx0XHQnSGFpdGknLFxuXHRcdCdIZWFyZCBJc2xhbmQgYW5kIE1jRG9uYWxkIElzbGFuZHMnLFxuXHRcdCdIb2x5IFNlZSAoVmF0aWNhbiBDaXR5KScsXG5cdFx0J0hvbmR1cmFzJyxcblx0XHQnSG9uZyBLb25nJyxcblx0XHQnSHVuZ2FyeScsXG5cdFx0J0ljZWxhbmQnLFxuXHRcdCdJbmRpYScsXG5cdFx0J0luZG9uZXNpYScsXG5cdFx0J0lyYW4nLFxuXHRcdCdJcmFxJyxcblx0XHQnSXJlbGFuZCcsXG5cdFx0J0lzbGUgb2YgTWFuJyxcblx0XHQnSXNyYWVsJyxcblx0XHQnSXRhbHknLFxuXHRcdCdKYW1haWNhJyxcblx0XHQnSmFuIE1heWVuJyxcblx0XHQnSmFwYW4nLFxuXHRcdCdKZXJzZXknLFxuXHRcdCdKb3JkYW4nLFxuXHRcdCdKdWFuIGRlIE5vdmEgSXNsYW5kJyxcblx0XHQnS2F6YWtoc3RhbicsXG5cdFx0J0tlbnlhJyxcblx0XHQnS2lyaWJhdGknLFxuXHRcdCdLb3JlYSwgTm9ydGgnLFxuXHRcdCdLb3JlYSwgU291dGgnLFxuXHRcdCdLdXdhaXQnLFxuXHRcdCdLeXJneXpzdGFuJyxcblx0XHQnTGFvcycsXG5cdFx0J0xhdHZpYScsXG5cdFx0J0xlYmFub24nLFxuXHRcdCdMZXNvdGhvJyxcblx0XHQnTGliZXJpYScsXG5cdFx0J0xpYnlhJyxcblx0XHQnTGllY2h0ZW5zdGVpbicsXG5cdFx0J0xpdGh1YW5pYScsXG5cdFx0J0x1eGVtYm91cmcnLFxuXHRcdCdNYWNhdScsXG5cdFx0J01hY2Vkb25pYScsXG5cdFx0J01hZGFnYXNjYXInLFxuXHRcdCdNYWxhd2knLFxuXHRcdCdNYWxheXNpYScsXG5cdFx0J01hbGRpdmVzJyxcblx0XHQnTWFsaScsXG5cdFx0J01hbHRhJyxcblx0XHQnTWFyc2hhbGwgSXNsYW5kcycsXG5cdFx0J01hcnRpbmlxdWUnLFxuXHRcdCdNYXVyaXRhbmlhJyxcblx0XHQnTWF1cml0aXVzJyxcblx0XHQnTWF5b3R0ZScsXG5cdFx0J01leGljbycsXG5cdFx0J01pY3JvbmVzaWEsIEZlZGVyYXRlZCBTdGF0ZXMgb2YnLFxuXHRcdCdNb2xkb3ZhJyxcblx0XHQnTW9uYWNvJyxcblx0XHQnTW9uZ29saWEnLFxuXHRcdCdNb250c2VycmF0Jyxcblx0XHQnTW9yb2NjbycsXG5cdFx0J01vemFtYmlxdWUnLFxuXHRcdCdOYW1pYmlhJyxcblx0XHQnTmF1cnUnLFxuXHRcdCdOYXZhc3NhIElzbGFuZCcsXG5cdFx0J05lcGFsJyxcblx0XHQnTmV0aGVybGFuZHMnLFxuXHRcdCdOZXRoZXJsYW5kcyBBbnRpbGxlcycsXG5cdFx0J05ldyBDYWxlZG9uaWEnLFxuXHRcdCdOZXcgWmVhbGFuZCcsXG5cdFx0J05pY2FyYWd1YScsXG5cdFx0J05pZ2VyJyxcblx0XHQnTmlnZXJpYScsXG5cdFx0J05pdWUnLFxuXHRcdCdOb3Jmb2xrIElzbGFuZCcsXG5cdFx0J05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsXG5cdFx0J05vcndheScsXG5cdFx0J09tYW4nLFxuXHRcdCdQYWtpc3RhbicsXG5cdFx0J1BhbGF1Jyxcblx0XHQnUGFuYW1hJyxcblx0XHQnUGFwdWEgTmV3IEd1aW5lYScsXG5cdFx0J1BhcmFjZWwgSXNsYW5kcycsXG5cdFx0J1BhcmFndWF5Jyxcblx0XHQnUGVydScsXG5cdFx0J1BoaWxpcHBpbmVzJyxcblx0XHQnUGl0Y2Fpcm4gSXNsYW5kcycsXG5cdFx0J1BvbGFuZCcsXG5cdFx0J1BvcnR1Z2FsJyxcblx0XHQnUHVlcnRvIFJpY28nLFxuXHRcdCdRYXRhcicsXG5cdFx0J1JldW5pb24nLFxuXHRcdCdSb21hbmlhJyxcblx0XHQnUnVzc2lhJyxcblx0XHQnUndhbmRhJyxcblx0XHQnU2FpbnQgSGVsZW5hJyxcblx0XHQnU2FpbnQgS2l0dHMgYW5kIE5ldmlzJyxcblx0XHQnU2FpbnQgTHVjaWEnLFxuXHRcdCdTYWludCBQaWVycmUgYW5kIE1pcXVlbG9uJyxcblx0XHQnU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXMnLFxuXHRcdCdTYW1vYScsXG5cdFx0J1NhbiBNYXJpbm8nLFxuXHRcdCdTYW8gVG9tZSBhbmQgUHJpbmNpcGUnLFxuXHRcdCdTYXVkaSBBcmFiaWEnLFxuXHRcdCdTZW5lZ2FsJyxcblx0XHQnU2VyYmlhIGFuZCBNb250ZW5lZ3JvJyxcblx0XHQnU2V5Y2hlbGxlcycsXG5cdFx0J1NpZXJyYSBMZW9uZScsXG5cdFx0J1NpbmdhcG9yZScsXG5cdFx0J1Nsb3Zha2lhJyxcblx0XHQnU2xvdmVuaWEnLFxuXHRcdCdTb2xvbW9uIElzbGFuZHMnLFxuXHRcdCdTb21hbGlhJyxcblx0XHQnU291dGggQWZyaWNhJyxcblx0XHQnU291dGggR2VvcmdpYSBhbmQgdGhlIFNvdXRoIFNhbmR3aWNoIElzbGFuZHMnLFxuXHRcdCdTcGFpbicsXG5cdFx0J1NwcmF0bHkgSXNsYW5kcycsXG5cdFx0J1NyaSBMYW5rYScsXG5cdFx0J1N1ZGFuJyxcblx0XHQnU3VyaW5hbWUnLFxuXHRcdCdTdmFsYmFyZCcsXG5cdFx0J1N3YXppbGFuZCcsXG5cdFx0J1N3ZWRlbicsXG5cdFx0J1N3aXR6ZXJsYW5kJyxcblx0XHQnU3lyaWEnLFxuXHRcdCdUYWl3YW4nLFxuXHRcdCdUYWppa2lzdGFuJyxcblx0XHQnVGFuemFuaWEnLFxuXHRcdCdUaGFpbGFuZCcsXG5cdFx0J1RpbW9yLUxlc3RlJyxcblx0XHQnVG9nbycsXG5cdFx0J1Rva2VsYXUnLFxuXHRcdCdUb25nYScsXG5cdFx0J1RyaW5pZGFkIGFuZCBUb2JhZ28nLFxuXHRcdCdUcm9tZWxpbiBJc2xhbmQnLFxuXHRcdCdUdW5pc2lhJyxcblx0XHQnVHVya2V5Jyxcblx0XHQnVHVya21lbmlzdGFuJyxcblx0XHQnVHVya3MgYW5kIENhaWNvcyBJc2xhbmRzJyxcblx0XHQnVHV2YWx1Jyxcblx0XHQnVWdhbmRhJyxcblx0XHQnVWtyYWluZScsXG5cdFx0J1VuaXRlZCBBcmFiIEVtaXJhdGVzJyxcblx0XHQnVW5pdGVkIEtpbmdkb20nLFxuXHRcdCdVbml0ZWQgU3RhdGVzJyxcblx0XHQnVXJ1Z3VheScsXG5cdFx0J1V6YmVraXN0YW4nLFxuXHRcdCdWYW51YXR1Jyxcblx0XHQnVmVuZXp1ZWxhJyxcblx0XHQnVmlldG5hbScsXG5cdFx0J1ZpcmdpbiBJc2xhbmRzJyxcblx0XHQnV2FrZSBJc2xhbmQnLFxuXHRcdCdXYWxsaXMgYW5kIEZ1dHVuYScsXG5cdFx0J1dlc3QgQmFuaycsXG5cdFx0J1dlc3Rlcm4gU2FoYXJhJyxcblx0XHQnWWVtZW4nLFxuXHRcdCdaYW1iaWEnLFxuXHRcdCdaaW1iYWJ3ZSdcblx0XTtcblx0c3VnZ2VzdGlvblRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdHN1Z2dlc3Rpb25zLnNvcnQoZnVuY3Rpb24oYSxiKSB7XG5cdFx0XHRyZXR1cm4gYS5sb2NhbGVDb21wYXJlKGIpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZmlsdGVyZWRPcHRpb25zID0gW107XG5cdFx0Zm9yIChjb25zdCBzdWdnZXN0aW9uIG9mIHN1Z2dlc3Rpb25zKSB7XG5cdFx0XHRjb25zdCBsb3dlcmNhc2VTdWdnZXN0aW9uID0gc3VnZ2VzdGlvbi50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKGxvd2VyY2FzZVN1Z2dlc3Rpb24uc3RhcnRzV2l0aChxdWVyeS50b0xvY2FsZUxvd2VyQ2FzZSgpKSkge1xuXHRcdFx0XHRmaWx0ZXJlZE9wdGlvbnMucHVzaChzdWdnZXN0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cG9wdWxhdGVPcHRpb25zKGZpbHRlcmVkT3B0aW9ucyk7XG5cdH0sIDEwMDApO1xufVxuXG53aW5kb3cuY3VzdG9tU3VnZ2VzdGlvbnMgPSB3aW5kb3cuT3JpZ2FtaVsnby11dGlscyddLmRlYm91bmNlKGN1c3RvbVN1Z2dlc3Rpb25zLCAxMDApO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG59KTtcbiJdfQ==