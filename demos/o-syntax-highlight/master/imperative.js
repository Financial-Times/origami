function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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
  }; // ../../node_modules/prismjs/components/prism-core.js


  var require_prism_core = __commonJS({
    "../../node_modules/prismjs/components/prism-core.js": function node_modulesPrismjsComponentsPrismCoreJs(exports, module) {
      var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};

      var Prism2 = function (_self2) {
        var lang = /\blang(?:uage)?-([\w-]+)\b/i;
        var uniqueId = 0;
        var plainTextGrammar = {};
        var _ = {
          manual: _self2.Prism && _self2.Prism.manual,
          disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
          util: {
            encode: function encode(tokens) {
              if (tokens instanceof Token) {
                return new Token(tokens.type, encode(tokens.content), tokens.alias);
              } else if (Array.isArray(tokens)) {
                return tokens.map(encode);
              } else {
                return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
              }
            },
            type: function type(o) {
              return Object.prototype.toString.call(o).slice(8, -1);
            },
            objId: function objId(obj) {
              if (!obj["__id"]) {
                Object.defineProperty(obj, "__id", {
                  value: ++uniqueId
                });
              }

              return obj["__id"];
            },
            clone: function deepClone(o, visited) {
              visited = visited || {};
              var clone;
              var id;

              switch (_.util.type(o)) {
                case "Object":
                  id = _.util.objId(o);

                  if (visited[id]) {
                    return visited[id];
                  }

                  clone = {};
                  visited[id] = clone;

                  for (var key in o) {
                    if (o.hasOwnProperty(key)) {
                      clone[key] = deepClone(o[key], visited);
                    }
                  }

                  return clone;

                case "Array":
                  id = _.util.objId(o);

                  if (visited[id]) {
                    return visited[id];
                  }

                  clone = [];
                  visited[id] = clone;
                  o.forEach(function (v, i) {
                    clone[i] = deepClone(v, visited);
                  });
                  return clone;

                default:
                  return o;
              }
            },
            getLanguage: function getLanguage(element) {
              while (element && !lang.test(element.className)) {
                element = element.parentElement;
              }

              if (element) {
                return (element.className.match(lang) || [, "none"])[1].toLowerCase();
              }

              return "none";
            },
            currentScript: function currentScript() {
              if (typeof document === "undefined") {
                return null;
              }

              if ("currentScript" in document && 1 < 2) {
                return document.currentScript;
              }

              try {
                throw new Error();
              } catch (err) {
                var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];

                if (src) {
                  var scripts = document.getElementsByTagName("script");

                  for (var i in scripts) {
                    if (scripts[i].src == src) {
                      return scripts[i];
                    }
                  }
                }

                return null;
              }
            },
            isActive: function isActive(element, className, defaultActivation) {
              var no = "no-" + className;

              while (element) {
                var classList = element.classList;

                if (classList.contains(className)) {
                  return true;
                }

                if (classList.contains(no)) {
                  return false;
                }

                element = element.parentElement;
              }

              return !!defaultActivation;
            }
          },
          languages: {
            plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            extend: function extend(id, redef) {
              var lang2 = _.util.clone(_.languages[id]);

              for (var key in redef) {
                lang2[key] = redef[key];
              }

              return lang2;
            },
            insertBefore: function insertBefore(inside, before, insert, root) {
              root = root || _.languages;
              var grammar = root[inside];
              var ret = {};

              for (var token in grammar) {
                if (grammar.hasOwnProperty(token)) {
                  if (token == before) {
                    for (var newToken in insert) {
                      if (insert.hasOwnProperty(newToken)) {
                        ret[newToken] = insert[newToken];
                      }
                    }
                  }

                  if (!insert.hasOwnProperty(token)) {
                    ret[token] = grammar[token];
                  }
                }
              }

              var old = root[inside];
              root[inside] = ret;

              _.languages.DFS(_.languages, function (key, value) {
                if (value === old && key != inside) {
                  this[key] = ret;
                }
              });

              return ret;
            },
            DFS: function DFS(o, callback, type, visited) {
              visited = visited || {};
              var objId = _.util.objId;

              for (var i in o) {
                if (o.hasOwnProperty(i)) {
                  callback.call(o, i, o[i], type || i);
                  var property = o[i];

                  var propertyType = _.util.type(property);

                  if (propertyType === "Object" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, null, visited);
                  } else if (propertyType === "Array" && !visited[objId(property)]) {
                    visited[objId(property)] = true;
                    DFS(property, callback, i, visited);
                  }
                }
              }
            }
          },
          plugins: {},
          highlightAll: function highlightAll(async, callback) {
            _.highlightAllUnder(document, async, callback);
          },
          highlightAllUnder: function highlightAllUnder(container, async, callback) {
            var env = {
              callback: callback,
              container: container,
              selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };

            _.hooks.run("before-highlightall", env);

            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

            _.hooks.run("before-all-elements-highlight", env);

            for (var i = 0, element; element = env.elements[i++];) {
              _.highlightElement(element, async === true, env.callback);
            }
          },
          highlightElement: function highlightElement(element, async, callback) {
            var language = _.util.getLanguage(element);

            var grammar = _.languages[language];
            element.className = element.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
            var parent = element.parentElement;

            if (parent && parent.nodeName.toLowerCase() === "pre") {
              parent.className = parent.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
            }

            var code = element.textContent;
            var env = {
              element: element,
              language: language,
              grammar: grammar,
              code: code
            };

            function insertHighlightedCode(highlightedCode) {
              env.highlightedCode = highlightedCode;

              _.hooks.run("before-insert", env);

              env.element.innerHTML = env.highlightedCode;

              _.hooks.run("after-highlight", env);

              _.hooks.run("complete", env);

              callback && callback.call(env.element);
            }

            _.hooks.run("before-sanity-check", env);

            parent = env.element.parentElement;

            if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
              parent.setAttribute("tabindex", "0");
            }

            if (!env.code) {
              _.hooks.run("complete", env);

              callback && callback.call(env.element);
              return;
            }

            _.hooks.run("before-highlight", env);

            if (!env.grammar) {
              insertHighlightedCode(_.util.encode(env.code));
              return;
            }

            if (async && _self2.Worker) {
              var worker = new Worker(_.filename);

              worker.onmessage = function (evt) {
                insertHighlightedCode(evt.data);
              };

              worker.postMessage(JSON.stringify({
                language: env.language,
                code: env.code,
                immediateClose: true
              }));
            } else {
              insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
          },
          highlight: function highlight(text, grammar, language) {
            var env = {
              code: text,
              grammar: grammar,
              language: language
            };

            _.hooks.run("before-tokenize", env);

            env.tokens = _.tokenize(env.code, env.grammar);

            _.hooks.run("after-tokenize", env);

            return Token.stringify(_.util.encode(env.tokens), env.language);
          },
          tokenize: function tokenize(text, grammar) {
            var rest = grammar.rest;

            if (rest) {
              for (var token in rest) {
                grammar[token] = rest[token];
              }

              delete grammar.rest;
            }

            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
          },
          hooks: {
            all: {},
            add: function add(name, callback) {
              var hooks = _.hooks.all;
              hooks[name] = hooks[name] || [];
              hooks[name].push(callback);
            },
            run: function run(name, env) {
              var callbacks = _.hooks.all[name];

              if (!callbacks || !callbacks.length) {
                return;
              }

              for (var i = 0, callback; callback = callbacks[i++];) {
                callback(env);
              }
            }
          },
          Token: Token
        };
        _self2.Prism = _;

        function Token(type, content, alias, matchedStr) {
          this.type = type;
          this.content = content;
          this.alias = alias;
          this.length = (matchedStr || "").length | 0;
        }

        Token.stringify = function stringify(o, language) {
          if (typeof o == "string") {
            return o;
          }

          if (Array.isArray(o)) {
            var s = "";
            o.forEach(function (e) {
              s += stringify(e, language);
            });
            return s;
          }

          var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: "span",
            classes: ["token", o.type],
            attributes: {},
            language: language
          };
          var aliases = o.alias;

          if (aliases) {
            if (Array.isArray(aliases)) {
              Array.prototype.push.apply(env.classes, aliases);
            } else {
              env.classes.push(aliases);
            }
          }

          _.hooks.run("wrap", env);

          var attributes = "";

          for (var name in env.attributes) {
            attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
          }

          return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
        };

        function matchPattern(pattern, pos, text, lookbehind) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);

          if (match && lookbehind && match[1]) {
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
          }

          return match;
        }

        function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
          for (var token in grammar) {
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
              continue;
            }

            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];

            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j) {
                return;
              }

              var patternObj = patterns[j];
              var inside = patternObj.inside;
              var lookbehind = !!patternObj.lookbehind;
              var greedy = !!patternObj.greedy;
              var alias = patternObj.alias;

              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }

              var pattern = patternObj.pattern || patternObj;

              for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                if (rematch && pos >= rematch.reach) {
                  break;
                }

                var str = currentNode.value;

                if (tokenList.length > text.length) {
                  return;
                }

                if (str instanceof Token) {
                  continue;
                }

                var removeCount = 1;
                var match;

                if (greedy) {
                  match = matchPattern(pattern, pos, text, lookbehind);

                  if (!match) {
                    break;
                  }

                  var from = match.index;
                  var to = match.index + match[0].length;
                  var p = pos;
                  p += currentNode.value.length;

                  while (from >= p) {
                    currentNode = currentNode.next;
                    p += currentNode.value.length;
                  }

                  p -= currentNode.value.length;
                  pos = p;

                  if (currentNode.value instanceof Token) {
                    continue;
                  }

                  for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                    removeCount++;
                    p += k.value.length;
                  }

                  removeCount--;
                  str = text.slice(pos, p);
                  match.index -= pos;
                } else {
                  match = matchPattern(pattern, 0, str, lookbehind);

                  if (!match) {
                    continue;
                  }
                }

                var from = match.index;
                var matchStr = match[0];
                var before = str.slice(0, from);
                var after = str.slice(from + matchStr.length);
                var reach = pos + str.length;

                if (rematch && reach > rematch.reach) {
                  rematch.reach = reach;
                }

                var removeFrom = currentNode.prev;

                if (before) {
                  removeFrom = addAfter(tokenList, removeFrom, before);
                  pos += before.length;
                }

                removeRange(tokenList, removeFrom, removeCount);
                var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);

                if (after) {
                  addAfter(tokenList, currentNode, after);
                }

                if (removeCount > 1) {
                  var nestedRematch = {
                    cause: token + "," + j,
                    reach: reach
                  };
                  matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

                  if (rematch && nestedRematch.reach > rematch.reach) {
                    rematch.reach = nestedRematch.reach;
                  }
                }
              }
            }
          }
        }

        function LinkedList() {
          var head = {
            value: null,
            prev: null,
            next: null
          };
          var tail = {
            value: null,
            prev: head,
            next: null
          };
          head.next = tail;
          this.head = head;
          this.tail = tail;
          this.length = 0;
        }

        function addAfter(list, node, value) {
          var next = node.next;
          var newNode = {
            value: value,
            prev: node,
            next: next
          };
          node.next = newNode;
          next.prev = newNode;
          list.length++;
          return newNode;
        }

        function removeRange(list, node, count) {
          var next = node.next;

          for (var i = 0; i < count && next !== list.tail; i++) {
            next = next.next;
          }

          node.next = next;
          next.prev = node;
          list.length -= i;
        }

        function toArray(list) {
          var array = [];
          var node = list.head.next;

          while (node !== list.tail) {
            array.push(node.value);
            node = node.next;
          }

          return array;
        }

        if (!_self2.document) {
          if (!_self2.addEventListener) {
            return _;
          }

          if (!_.disableWorkerMessageHandler) {
            _self2.addEventListener("message", function (evt) {
              var message = JSON.parse(evt.data);
              var lang2 = message.language;
              var code = message.code;
              var immediateClose = message.immediateClose;

              _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));

              if (immediateClose) {
                _self2.close();
              }
            }, false);
          }

          return _;
        }

        var script = _.util.currentScript();

        if (script) {
          _.filename = script.src;

          if (script.hasAttribute("data-manual")) {
            _.manual = true;
          }
        }

        function highlightAutomaticallyCallback() {
          if (!_.manual) {
            _.highlightAll();
          }
        }

        if (!_.manual) {
          var readyState = document.readyState;

          if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
            document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
          } else {
            if (window.requestAnimationFrame) {
              window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
              window.setTimeout(highlightAutomaticallyCallback, 16);
            }
          }
        }

        return _;
      }(_self);

      if (typeof module !== "undefined" && module.exports) {
        module.exports = Prism2;
      }

      if (typeof global !== "undefined") {
        global.Prism = Prism2;
      }
    }
  }); // src/js/helpers.js


  var throwError = function throwError(message) {
    throw new Error("*** o-syntax-highlight error:\n".concat(message, "\n***"));
  };

  var helpers_default = throwError; // src/js/syntax-highlight.js

  var import_prism_core = __toModule(require_prism_core()); // ../../node_modules/prismjs/components/prism-markup.js


  Prism.languages.markup = {
    "comment": {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: true
    },
    "prolog": {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: true
    },
    "doctype": {
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null
        },
        "string": {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        "punctuation": /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        "name": /[^\s<>'"]+/
      }
    },
    "cdata": {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: true
    },
    "tag": {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        "tag": {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            "punctuation": /^<\/?/,
            "namespace": /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            "punctuation": [{
              pattern: /^=/,
              alias: "attr-equals"
            }, /"|'/]
          }
        },
        "punctuation": /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            "namespace": /^[^\s>\/:]+:/
          }
        }
      }
    },
    "entity": [{
      pattern: /&[\da-z]{1,8};/i,
      alias: "named-entity"
    }, /&#x?[\da-f]{1,8};/i]
  };
  Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
  Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
  Prism.hooks.add("wrap", function (env) {
    if (env.type === "entity") {
      env.attributes["title"] = env.content.replace(/&amp;/, "&");
    }
  });
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function addInlined(tagName, lang) {
      var includedCdataInside = {};
      includedCdataInside["language-" + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism.languages[lang]
      };
      includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
      var inside = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside["language-" + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism.languages[lang]
      };
      var def = {};
      def[tagName] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
          return tagName;
        }), "i"),
        lookbehind: true,
        greedy: true,
        inside: inside
      };
      Prism.languages.insertBefore("markup", "cdata", def);
    }
  });
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function value(attrName, lang) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
        lookbehind: true,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              "value": {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: true,
                alias: [lang, "language-" + lang],
                inside: Prism.languages[lang]
              },
              "punctuation": [{
                pattern: /^=/,
                alias: "attr-equals"
              }, /"|'/]
            }
          }
        }
      });
    }
  });
  Prism.languages.html = Prism.languages.markup;
  Prism.languages.mathml = Prism.languages.markup;
  Prism.languages.svg = Prism.languages.markup;
  Prism.languages.xml = Prism.languages.extend("markup", {});
  Prism.languages.ssml = Prism.languages.xml;
  Prism.languages.atom = Prism.languages.xml;
  Prism.languages.rss = Prism.languages.xml; // ../../node_modules/prismjs/components/prism-css.js

  (function (Prism2) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism2.languages.css = {
      "comment": /\/\*[\s\S]*?\*\//,
      "atrule": {
        pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
        inside: {
          "rule": /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: true,
            alias: "selector"
          },
          "keyword": {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: true
          }
        }
      },
      "url": {
        pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
        greedy: true,
        inside: {
          "function": /^url/i,
          "punctuation": /^\(|\)$/,
          "string": {
            pattern: RegExp("^" + string.source + "$"),
            alias: "url"
          }
        }
      },
      "selector": {
        pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + string.source + ")*(?=\\s*\\{)"),
        lookbehind: true
      },
      "string": {
        pattern: string,
        greedy: true
      },
      "property": {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: true
      },
      "important": /!important\b/i,
      "function": {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: true
      },
      "punctuation": /[(){};:,]/
    };
    Prism2.languages.css["atrule"].inside.rest = Prism2.languages.css;
    var markup = Prism2.languages.markup;

    if (markup) {
      markup.tag.addInlined("style", "css");
      markup.tag.addAttribute("style", "css");
    }
  })(Prism); // ../../node_modules/prismjs/components/prism-clike.js


  Prism.languages.clike = {
    "comment": [{
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      greedy: true
    }, {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }],
    "string": {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: true,
      inside: {
        "punctuation": /[.\\]/
      }
    },
    "keyword": /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(?:true|false)\b/,
    "function": /\b\w+(?=\()/,
    "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    "punctuation": /[{}[\];(),.:]/
  }; // ../../node_modules/prismjs/components/prism-javascript.js

  Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
      lookbehind: true
    }],
    "keyword": [{
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true
    }, {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }],
    "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    "number": /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  });
  Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
  Prism.languages.insertBefore("javascript", "keyword", {
    "regex": {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: true,
      greedy: true,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: true,
          alias: "language-regex",
          inside: Prism.languages.regex
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/
      }
    },
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function"
    },
    "parameter": [{
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }, {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript
    }, {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }, {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }],
    "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  });
  Prism.languages.insertBefore("javascript", "string", {
    "hashbang": {
      pattern: /^#!.*/,
      greedy: true,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: Prism.languages.javascript
          }
        },
        "string": /[\s\S]+/
      }
    }
  });

  if (Prism.languages.markup) {
    Prism.languages.markup.tag.addInlined("script", "javascript");
    Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
  }

  Prism.languages.js = Prism.languages.javascript; // ../../node_modules/prismjs/components/prism-bash.js

  (function (Prism2) {
    var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
    var commandAfterHeredoc = {
      pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
      lookbehind: true,
      alias: "punctuation",
      inside: null
    };
    var insideString = {
      "bash": commandAfterHeredoc,
      "environment": {
        pattern: RegExp("\\$" + envVars),
        alias: "constant"
      },
      "variable": [{
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: true,
        inside: {
          "variable": [{
            pattern: /(^\$\(\([\s\S]+)\)\)/,
            lookbehind: true
          }, /^\$\(\(/],
          "number": /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          "operator": /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
          "punctuation": /\(\(?|\)\)?|,|;/
        }
      }, {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: true,
        inside: {
          "variable": /^\$\(|^`|\)$|`$/
        }
      }, {
        pattern: /\$\{[^}]+\}/,
        greedy: true,
        inside: {
          "operator": /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          "punctuation": /[\[\]]/,
          "environment": {
            pattern: RegExp("(\\{)" + envVars),
            lookbehind: true,
            alias: "constant"
          }
        }
      }, /\$(?:\w+|[#?*!@$])/],
      "entity": /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
    };
    Prism2.languages.bash = {
      "shebang": {
        pattern: /^#!\s*\/.*/,
        alias: "important"
      },
      "comment": {
        pattern: /(^|[^"{\\$])#.*/,
        lookbehind: true
      },
      "function-name": [{
        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: true,
        alias: "function"
      }, {
        pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
        alias: "function"
      }],
      "for-or-select": {
        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
        alias: "variable",
        lookbehind: true
      },
      "assign-left": {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
        inside: {
          "environment": {
            pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
            lookbehind: true,
            alias: "constant"
          }
        },
        alias: "variable",
        lookbehind: true
      },
      "string": [{
        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      }, {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: true,
        greedy: true,
        inside: {
          "bash": commandAfterHeredoc
        }
      }, {
        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      }, {
        pattern: /(^|[^$\\])'[^']*'/,
        lookbehind: true,
        greedy: true
      }, {
        pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
        greedy: true,
        inside: {
          "entity": insideString.entity
        }
      }],
      "environment": {
        pattern: RegExp("\\$?" + envVars),
        alias: "constant"
      },
      "variable": insideString.variable,
      "function": {
        pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      "keyword": {
        pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      "builtin": {
        pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
        lookbehind: true,
        alias: "class-name"
      },
      "boolean": {
        pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
        lookbehind: true
      },
      "file-descriptor": {
        pattern: /\B&\d\b/,
        alias: "important"
      },
      "operator": {
        pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
        inside: {
          "file-descriptor": {
            pattern: /^\d/,
            alias: "important"
          }
        }
      },
      "punctuation": /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      "number": {
        pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
        lookbehind: true
      }
    };
    commandAfterHeredoc.inside = Prism2.languages.bash;
    var toBeCopied = ["comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"];
    var inside = insideString.variable[1].inside;

    for (var i = 0; i < toBeCopied.length; i++) {
      inside[toBeCopied[i]] = Prism2.languages.bash[toBeCopied[i]];
    }

    Prism2.languages.shell = Prism2.languages.bash;
  })(Prism); // ../../node_modules/prismjs/components/prism-json.js


  Prism.languages.json = {
    "property": {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
      lookbehind: true,
      greedy: true
    },
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      lookbehind: true,
      greedy: true
    },
    "comment": {
      pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: true
    },
    "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    "punctuation": /[{}[\],]/,
    "operator": /:/,
    "boolean": /\b(?:true|false)\b/,
    "null": {
      pattern: /\bnull\b/,
      alias: "keyword"
    }
  };
  Prism.languages.webmanifest = Prism.languages.json; // ../../node_modules/prismjs/components/prism-scss.js

  Prism.languages.scss = Prism.languages.extend("css", {
    "comment": {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: true
    },
    "atrule": {
      pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
      inside: {
        "rule": /@[\w-]+/
      }
    },
    "url": /(?:[-a-z]+-)?url(?=\()/i,
    "selector": {
      pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/m,
      inside: {
        "parent": {
          pattern: /&/,
          alias: "important"
        },
        "placeholder": /%[-\w]+/,
        "variable": /\$[-\w]+|#\{\$[-\w]+\}/
      }
    },
    "property": {
      pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
      inside: {
        "variable": /\$[-\w]+|#\{\$[-\w]+\}/
      }
    }
  });
  Prism.languages.insertBefore("scss", "atrule", {
    "keyword": [/@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i, {
      pattern: /( )(?:from|through)(?= )/,
      lookbehind: true
    }]
  });
  Prism.languages.insertBefore("scss", "important", {
    "variable": /\$[-\w]+|#\{\$[-\w]+\}/
  });
  Prism.languages.insertBefore("scss", "function", {
    "module-modifier": {
      pattern: /\b(?:as|with|show|hide)\b/i,
      alias: "keyword"
    },
    "placeholder": {
      pattern: /%[-\w]+/,
      alias: "selector"
    },
    "statement": {
      pattern: /\B!(?:default|optional)\b/i,
      alias: "keyword"
    },
    "boolean": /\b(?:true|false)\b/,
    "null": {
      pattern: /\bnull\b/,
      alias: "keyword"
    },
    "operator": {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
      lookbehind: true
    }
  });
  Prism.languages.scss["atrule"].inside.rest = Prism.languages.scss; // ../../node_modules/prismjs/components/prism-yaml.js

  (function (Prism2) {
    var anchorOrAlias = /[*&][^\s[\]{},]+/;
    var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
    var properties = "(?:" + tag.source + "(?:[ 	]+" + anchorOrAlias.source + ")?|" + anchorOrAlias.source + "(?:[ 	]+" + tag.source + ")?)";
    var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function () {
      return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
    });
    var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;

    function createValuePattern(value, flags) {
      flags = (flags || "").replace(/m/g, "") + "m";
      var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function () {
        return properties;
      }).replace(/<<value>>/g, function () {
        return value;
      });
      return RegExp(pattern, flags);
    }

    Prism2.languages.yaml = {
      "scalar": {
        pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function () {
          return properties;
        })),
        lookbehind: true,
        alias: "string"
      },
      "comment": /#.*/,
      "key": {
        pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function () {
          return properties;
        }).replace(/<<key>>/g, function () {
          return "(?:" + plainKey + "|" + string + ")";
        })),
        lookbehind: true,
        greedy: true,
        alias: "atrule"
      },
      "directive": {
        pattern: /(^[ \t]*)%.+/m,
        lookbehind: true,
        alias: "important"
      },
      "datetime": {
        pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
        lookbehind: true,
        alias: "number"
      },
      "boolean": {
        pattern: createValuePattern(/true|false/.source, "i"),
        lookbehind: true,
        alias: "important"
      },
      "null": {
        pattern: createValuePattern(/null|~/.source, "i"),
        lookbehind: true,
        alias: "important"
      },
      "string": {
        pattern: createValuePattern(string),
        lookbehind: true,
        greedy: true
      },
      "number": {
        pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "i"),
        lookbehind: true
      },
      "tag": tag,
      "important": anchorOrAlias,
      "punctuation": /---|[:[\]{}\-,|>?]|\.\.\./
    };
    Prism2.languages.yml = Prism2.languages.yaml;
  })(Prism); // src/js/languages/prism-diff.js


  var prism_diff_default = {
    "coord": [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
    "deleted": /^[-].*$/m,
    "inserted": /^[+].*$/m,
    "diff": {
      "pattern": /^!(?!!).+$/m,
      "alias": "important"
    }
  }; // src/js/syntax-highlight.js

  var SyntaxHighlight = /*#__PURE__*/function () {
    "use strict";

    function SyntaxHighlight(syntaxEl, options) {
      _classCallCheck(this, SyntaxHighlight);

      delete window.Prism;
      import_prism_core.default.languages.diff = prism_diff_default;
      this.syntaxElement = syntaxEl;
      this.opts = Object.assign({
        language: "",
        syntaxString: ""
      }, options);

      if (typeof this.syntaxElement === "string") {
        this._setLanguage();
      } else {
        this._tokeniseCodeBlocks();
      }
    }

    _createClass(SyntaxHighlight, [{
      key: "_setLanguage",
      value: function _setLanguage() {
        if (this.opts.language) {
          this.opts.syntaxString = this.syntaxElement;

          this._checkLanguage();
        } else {
          helpers_default("A language must be defined in the options object");
        }
      }
    }, {
      key: "_getLanguage",
      value: function _getLanguage(element) {
        var highlightClassNames = _toConsumableArray(element.classList).filter(function (c) {
          return c.includes("o-syntax-highlight--");
        });

        var highlightClassName = highlightClassNames ? highlightClassNames[0] : null;

        if (!highlightClassName) {
          console.warn("In order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class=\"o-syntax-highlight--html\" or class=\"o-syntax-highlight--js\"", element);
          return null;
        }

        this.opts.language = highlightClassName.replace("o-syntax-highlight--", "");

        this._checkLanguage();

        return this.opts.language;
      }
    }, {
      key: "_checkLanguage",
      value: function _checkLanguage() {
        if (this.opts.language && !import_prism_core.default.languages.hasOwnProperty(this.opts.language)) {
          helpers_default("The language ".concat(this.opts.language, " is not supported. Please contact Origami if you would like to have it added."));
        }
      }
    }, {
      key: "_tokeniseCodeBlocks",
      value: function _tokeniseCodeBlocks() {
        var codeBlocks = Array.from(this.syntaxElement.querySelectorAll("PRE")).filter(function (pre) {
          return pre.firstElementChild && pre.firstElementChild.tagName === "CODE";
        }).map(function (pre) {
          return pre.firstElementChild;
        });
        codeBlocks.forEach(this._tokeniseBlock.bind(this));
      }
    }, {
      key: "_tokeniseBlock",
      value: function _tokeniseBlock(element) {
        var language = this._getLanguage(element);

        if (language) {
          this.opts.syntaxString = element.innerText;
          element.innerHTML = this.tokenise();
        }
      }
    }, {
      key: "tokenise",
      value: function tokenise() {
        return import_prism_core.default.highlight(this.opts.syntaxString, import_prism_core.default.languages[this.opts.language]);
      }
    }], [{
      key: "init",
      value: function init(rootEl, opts) {
        if (!rootEl) {
          rootEl = document.body;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-syntax-highlight]")) {
          return new SyntaxHighlight(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-syntax-highlight"]'), function (rootEl2) {
          return new SyntaxHighlight(rootEl2, opts);
        });
      }
    }]);

    return SyntaxHighlight;
  }();

  var syntax_highlight_default = SyntaxHighlight; // main.js

  var constructAll = function constructAll() {
    syntax_highlight_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = syntax_highlight_default; // demos/src/imperative.js

  var highlighter = new main_default('<div>There is a <a href="#">link</a>here.</div>', {
    language: "html"
  });
  document.querySelector(".demo").innerHTML = highlighter.tokenise();
})();
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29yZS5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL3N5bnRheC1oaWdobGlnaHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YXNjcmlwdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tYmFzaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbC5qcyIsInNyYy9qcy9sYW5ndWFnZXMvcHJpc20tZGlmZi5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvaW1wZXJhdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsa0JBQUEsR0FBQSxVQUFBLENBQUE7QUFBQSx5REFBQSxvREFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBRUEsVUFBSSxLQUFBLEdBQVMsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQ1YsTUFEVSxHQUdWLE9BQU8saUJBQVAsS0FBNkIsV0FBN0IsSUFBNEMs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QUE0QyxXQUFBLENBQVksUUFBWixFQUE1QyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIGxpYj1cIldlYldvcmtlclwiLz5cblxudmFyIF9zZWxmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKVxuXHQ/IHdpbmRvdyAgIC8vIGlmIGluIGJyb3dzZXJcblx0OiAoXG5cdFx0KHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKVxuXHRcdFx0PyBzZWxmIC8vIGlmIGluIHdvcmtlclxuXHRcdFx0OiB7fSAgIC8vIGlmIGluIG5vZGUganNcblx0KTtcblxuLyoqXG4gKiBQcmlzbTogTGlnaHR3ZWlnaHQsIHJvYnVzdCwgZWxlZ2FudCBzeW50YXggaGlnaGxpZ2h0aW5nXG4gKlxuICogQGxpY2Vuc2UgTUlUIDxodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVD5cbiAqIEBhdXRob3IgTGVhIFZlcm91IDxodHRwczovL2xlYS52ZXJvdS5tZT5cbiAqIEBuYW1lc3BhY2VcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFByaXNtID0gKGZ1bmN0aW9uIChfc2VsZikge1xuXG5cdC8vIFByaXZhdGUgaGVscGVyIHZhcnNcblx0dmFyIGxhbmcgPSAvXFxibGFuZyg/OnVhZ2UpPy0oW1xcdy1dKylcXGIvaTtcblx0dmFyIHVuaXF1ZUlkID0gMDtcblxuXHQvLyBUaGUgZ3JhbW1hciBvYmplY3QgZm9yIHBsYWludGV4dFxuXHR2YXIgcGxhaW5UZXh0R3JhbW1hciA9IHt9O1xuXG5cblx0dmFyIF8gPSB7XG5cdFx0LyoqXG5cdFx0ICogQnkgZGVmYXVsdCwgUHJpc20gd2lsbCBhdHRlbXB0IHRvIGhpZ2hsaWdodCBhbGwgY29kZSBlbGVtZW50cyAoYnkgY2FsbGluZyB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0QWxsfSkgb24gdGhlXG5cdFx0ICogY3VycmVudCBwYWdlIGFmdGVyIHRoZSBwYWdlIGZpbmlzaGVkIGxvYWRpbmcuIFRoaXMgbWlnaHQgYmUgYSBwcm9ibGVtIGlmIGUuZy4geW91IHdhbnRlZCB0byBhc3luY2hyb25vdXNseSBsb2FkXG5cdFx0ICogYWRkaXRpb25hbCBsYW5ndWFnZXMgb3IgcGx1Z2lucyB5b3Vyc2VsZi5cblx0XHQgKlxuXHRcdCAqIEJ5IHNldHRpbmcgdGhpcyB2YWx1ZSB0byBgdHJ1ZWAsIFByaXNtIHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuXHRcdCAqXG5cdFx0ICogWW91IG9idmlvdXNseSBoYXZlIHRvIGNoYW5nZSB0aGlzIHZhbHVlIGJlZm9yZSB0aGUgYXV0b21hdGljIGhpZ2hsaWdodGluZyBzdGFydGVkLiBUbyBkbyB0aGlzLCB5b3UgY2FuIGFkZCBhblxuXHRcdCAqIGVtcHR5IFByaXNtIG9iamVjdCBpbnRvIHRoZSBnbG9iYWwgc2NvcGUgYmVmb3JlIGxvYWRpbmcgdGhlIFByaXNtIHNjcmlwdCBsaWtlIHRoaXM6XG5cdFx0ICpcblx0XHQgKiBgYGBqc1xuXHRcdCAqIHdpbmRvdy5QcmlzbSA9IHdpbmRvdy5QcmlzbSB8fCB7fTtcblx0XHQgKiBQcmlzbS5tYW51YWwgPSB0cnVlO1xuXHRcdCAqIC8vIGFkZCBhIG5ldyA8c2NyaXB0PiB0byBsb2FkIFByaXNtJ3Mgc2NyaXB0XG5cdFx0ICogYGBgXG5cdFx0ICpcblx0XHQgKiBAZGVmYXVsdCBmYWxzZVxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRtYW51YWw6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLm1hbnVhbCxcblx0XHRkaXNhYmxlV29ya2VyTWVzc2FnZUhhbmRsZXI6IF9zZWxmLlByaXNtICYmIF9zZWxmLlByaXNtLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcixcblxuXHRcdC8qKlxuXHRcdCAqIEEgbmFtZXNwYWNlIGZvciB1dGlsaXR5IG1ldGhvZHMuXG5cdFx0ICpcblx0XHQgKiBBbGwgZnVuY3Rpb24gaW4gdGhpcyBuYW1lc3BhY2UgdGhhdCBhcmUgbm90IGV4cGxpY2l0bHkgbWFya2VkIGFzIF9wdWJsaWNfIGFyZSBmb3IgX19pbnRlcm5hbCB1c2Ugb25seV9fIGFuZCBtYXlcblx0XHQgKiBjaGFuZ2Ugb3IgZGlzYXBwZWFyIGF0IGFueSB0aW1lLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqL1xuXHRcdHV0aWw6IHtcblx0XHRcdGVuY29kZTogZnVuY3Rpb24gZW5jb2RlKHRva2Vucykge1xuXHRcdFx0XHRpZiAodG9rZW5zIGluc3RhbmNlb2YgVG9rZW4pIHtcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFRva2VuKHRva2Vucy50eXBlLCBlbmNvZGUodG9rZW5zLmNvbnRlbnQpLCB0b2tlbnMuYWxpYXMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodG9rZW5zKSkge1xuXHRcdFx0XHRcdHJldHVybiB0b2tlbnMubWFwKGVuY29kZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cXHUwMGEwL2csICcgJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgdHlwZSBvZiB0aGUgZ2l2ZW4gdmFsdWUuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHthbnl9IG9cblx0XHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogdHlwZShudWxsKSAgICAgID09PSAnTnVsbCdcblx0XHRcdCAqIHR5cGUodW5kZWZpbmVkKSA9PT0gJ1VuZGVmaW5lZCdcblx0XHRcdCAqIHR5cGUoMTIzKSAgICAgICA9PT0gJ051bWJlcidcblx0XHRcdCAqIHR5cGUoJ2ZvbycpICAgICA9PT0gJ1N0cmluZydcblx0XHRcdCAqIHR5cGUodHJ1ZSkgICAgICA9PT0gJ0Jvb2xlYW4nXG5cdFx0XHQgKiB0eXBlKFsxLCAyXSkgICAgPT09ICdBcnJheSdcblx0XHRcdCAqIHR5cGUoe30pICAgICAgICA9PT0gJ09iamVjdCdcblx0XHRcdCAqIHR5cGUoU3RyaW5nKSAgICA9PT0gJ0Z1bmN0aW9uJ1xuXHRcdFx0ICogdHlwZSgvYWJjKy8pICAgID09PSAnUmVnRXhwJ1xuXHRcdFx0ICovXG5cdFx0XHR0eXBlOiBmdW5jdGlvbiAobykge1xuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyBhIHVuaXF1ZSBudW1iZXIgZm9yIHRoZSBnaXZlbiBvYmplY3QuIExhdGVyIGNhbGxzIHdpbGwgc3RpbGwgcmV0dXJuIHRoZSBzYW1lIG51bWJlci5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdFx0XHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHRcdFx0ICovXG5cdFx0XHRvYmpJZDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0XHRpZiAoIW9ialsnX19pZCddKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19faWQnLCB7IHZhbHVlOiArK3VuaXF1ZUlkIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmpbJ19faWQnXTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY2xvbmUgb2YgdGhlIGdpdmVuIG9iamVjdC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBpbnRlbmRlZCB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjbG9uZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge1R9IG9cblx0XHRcdCAqIEBwYXJhbSB7UmVjb3JkPG51bWJlciwgYW55Pn0gW3Zpc2l0ZWRdXG5cdFx0XHQgKiBAcmV0dXJucyB7VH1cblx0XHRcdCAqIEB0ZW1wbGF0ZSBUXG5cdFx0XHQgKi9cblx0XHRcdGNsb25lOiBmdW5jdGlvbiBkZWVwQ2xvbmUobywgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgY2xvbmU7IHZhciBpZDtcblx0XHRcdFx0c3dpdGNoIChfLnV0aWwudHlwZShvKSkge1xuXHRcdFx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IC8qKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gKi8gKHt9KTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBvKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbG9uZVtrZXldID0gZGVlcENsb25lKG9ba2V5XSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRcdFx0aWQgPSBfLnV0aWwub2JqSWQobyk7XG5cdFx0XHRcdFx0XHRpZiAodmlzaXRlZFtpZF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZpc2l0ZWRbaWRdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xvbmUgPSBbXTtcblx0XHRcdFx0XHRcdHZpc2l0ZWRbaWRdID0gY2xvbmU7XG5cblx0XHRcdFx0XHRcdCgvKiogQHR5cGUge0FycmF5fSAqLygvKiogQHR5cGUge2FueX0gKi8obykpKS5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lW2ldID0gZGVlcENsb25lKHYsIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGNsb25lKTtcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbztcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBQcmlzbSBsYW5ndWFnZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudCBzZXQgYnkgYSBgbGFuZ3VhZ2UteHh4eGAgb3IgYGxhbmcteHh4eGAgY2xhc3MuXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgbm8gbGFuZ3VhZ2UgaXMgc2V0IGZvciB0aGUgZWxlbWVudCBvciB0aGUgZWxlbWVudCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGBub25lYCB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqL1xuXHRcdFx0Z2V0TGFuZ3VhZ2U6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdHdoaWxlIChlbGVtZW50ICYmICFsYW5nLnRlc3QoZWxlbWVudC5jbGFzc05hbWUpKSB7XG5cdFx0XHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHJldHVybiAoZWxlbWVudC5jbGFzc05hbWUubWF0Y2gobGFuZykgfHwgWywgJ25vbmUnXSlbMV0udG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gJ25vbmUnO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBzY3JpcHQgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnRseSBleGVjdXRpbmcuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBkb2VzIF9fbm90X18gd29yayBmb3IgbGluZSBzY3JpcHQgZWxlbWVudC5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJucyB7SFRNTFNjcmlwdEVsZW1lbnQgfCBudWxsfVxuXHRcdFx0ICovXG5cdFx0XHRjdXJyZW50U2NyaXB0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCdjdXJyZW50U2NyaXB0JyBpbiBkb2N1bWVudCAmJiAxIDwgMiAvKiBoYWNrIHRvIHRyaXAgVFMnIGZsb3cgYW5hbHlzaXMgKi8pIHtcblx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElFMTEgd29ya2Fyb3VuZFxuXHRcdFx0XHQvLyB3ZSdsbCBnZXQgdGhlIHNyYyBvZiB0aGUgY3VycmVudCBzY3JpcHQgYnkgcGFyc2luZyBJRTExJ3MgZXJyb3Igc3RhY2sgdHJhY2Vcblx0XHRcdFx0Ly8gdGhpcyB3aWxsIG5vdCB3b3JrIGZvciBpbmxpbmUgc2NyaXB0c1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdC8vIEdldCBmaWxlIHNyYyB1cmwgZnJvbSBzdGFjay4gU3BlY2lmaWNhbGx5IHdvcmtzIHdpdGggdGhlIGZvcm1hdCBvZiBzdGFjayB0cmFjZXMgaW4gSUUuXG5cdFx0XHRcdFx0Ly8gQSBzdGFjayB3aWxsIGxvb2sgbGlrZSB0aGlzOlxuXHRcdFx0XHRcdC8vXG5cdFx0XHRcdFx0Ly8gRXJyb3Jcblx0XHRcdFx0XHQvLyAgICBhdCBfLnV0aWwuY3VycmVudFNjcmlwdCAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6MTE5OjUpXG5cdFx0XHRcdFx0Ly8gICAgYXQgR2xvYmFsIGNvZGUgKGh0dHA6Ly9sb2NhbGhvc3QvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzOjYwNjoxKVxuXG5cdFx0XHRcdFx0dmFyIHNyYyA9ICgvYXQgW14oXFxyXFxuXSpcXCgoLiopOlteOl0rOlteOl0rXFwpJC9pLmV4ZWMoZXJyLnN0YWNrKSB8fCBbXSlbMV07XG5cdFx0XHRcdFx0aWYgKHNyYykge1xuXHRcdFx0XHRcdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpIGluIHNjcmlwdHMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHNjcmlwdHNbaV0uc3JjID09IHNyYykge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBzY3JpcHRzW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgd2hldGhlciBhIGdpdmVuIGNsYXNzIGlzIGFjdGl2ZSBmb3IgYGVsZW1lbnRgLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjbGFzcyBjYW4gYmUgYWN0aXZhdGVkIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIGdpdmVuIGNsYXNzIGFuZCBpdCBjYW4gYmUgZGVhY3RpdmF0ZWRcblx0XHRcdCAqIGlmIGBlbGVtZW50YCBvciBvbmUgb2YgaXRzIGFuY2VzdG9ycyBoYXMgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gY2xhc3MuIFRoZSBfbmVnYXRlZCB2ZXJzaW9uXyBvZiB0aGVcblx0XHRcdCAqIGdpdmVuIGNsYXNzIGlzIGp1c3QgdGhlIGdpdmVuIGNsYXNzIHdpdGggYSBgbm8tYCBwcmVmaXguXG5cdFx0XHQgKlxuXHRcdFx0ICogV2hldGhlciB0aGUgY2xhc3MgaXMgYWN0aXZlIGlzIGRldGVybWluZWQgYnkgdGhlIGNsb3Nlc3QgYW5jZXN0b3Igb2YgYGVsZW1lbnRgICh3aGVyZSBgZWxlbWVudGAgaXRzZWxmIGlzXG5cdFx0XHQgKiBjbG9zZXN0IGFuY2VzdG9yKSB0aGF0IGhhcyB0aGUgZ2l2ZW4gY2xhc3Mgb3IgdGhlIG5lZ2F0ZWQgdmVyc2lvbiBvZiBpdC4gSWYgbmVpdGhlciBgZWxlbWVudGAgbm9yIGFueSBvZiBpdHNcblx0XHRcdCAqIGFuY2VzdG9ycyBoYXZlIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LCB0aGVuIHRoZSBkZWZhdWx0IGFjdGl2YXRpb24gd2lsbCBiZSByZXR1cm5lZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBJbiB0aGUgcGFyYWRveGljYWwgc2l0dWF0aW9uIHdoZXJlIHRoZSBjbG9zZXN0IGFuY2VzdG9yIGNvbnRhaW5zIF9fYm90aF9fIHRoZSBnaXZlbiBjbGFzcyBhbmQgdGhlIG5lZ2F0ZWRcblx0XHRcdCAqIHZlcnNpb24gb2YgaXQsIHRoZSBjbGFzcyBpcyBjb25zaWRlcmVkIGFjdGl2ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RlZmF1bHRBY3RpdmF0aW9uPWZhbHNlXVxuXHRcdFx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdFx0XHQgKi9cblx0XHRcdGlzQWN0aXZlOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lLCBkZWZhdWx0QWN0aXZhdGlvbikge1xuXHRcdFx0XHR2YXIgbm8gPSAnbm8tJyArIGNsYXNzTmFtZTtcblxuXHRcdFx0XHR3aGlsZSAoZWxlbWVudCkge1xuXHRcdFx0XHRcdHZhciBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKG5vKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAhIWRlZmF1bHRBY3RpdmF0aW9uO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIG5hbWVzcGFjZSBjb250YWlucyBhbGwgY3VycmVudGx5IGxvYWRlZCBsYW5ndWFnZXMgYW5kIHRoZSBzb21lIGhlbHBlciBmdW5jdGlvbnMgdG8gY3JlYXRlIGFuZCBtb2RpZnkgbGFuZ3VhZ2VzLlxuXHRcdCAqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRsYW5ndWFnZXM6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGdyYW1tYXIgZm9yIHBsYWluLCB1bmZvcm1hdHRlZCB0ZXh0LlxuXHRcdFx0ICovXG5cdFx0XHRwbGFpbjogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHBsYWludGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHRleHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cdFx0XHR0eHQ6IHBsYWluVGV4dEdyYW1tYXIsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgbGFuZ3VhZ2Ugd2l0aCB0aGUgZ2l2ZW4gaWQgYW5kIGFwcGVuZHMgdGhlIGdpdmVuIHRva2Vucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBhIHRva2VuIGluIGByZWRlZmAgYWxzbyBhcHBlYXJzIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2UsIHRoZW4gdGhlIGV4aXN0aW5nIHRva2VuIGluIHRoZSBjb3BpZWQgbGFuZ3VhZ2Vcblx0XHRcdCAqIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIEJlc3QgcHJhY3RpY2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogU2luY2UgdGhlIHBvc2l0aW9uIG9mIG92ZXJ3cml0aW5nIHRva2VucyAodG9rZW4gaW4gYHJlZGVmYCB0aGF0IG92ZXJ3cml0ZSB0b2tlbnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSlcblx0XHRcdCAqIGRvZXNuJ3QgbWF0dGVyLCB0aGV5IGNhbiB0ZWNobmljYWxseSBiZSBpbiBhbnkgb3JkZXIuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIGNvbmZ1c2luZyB0byBvdGhlcnMgdGhhdCB0cnlpbmcgdG9cblx0XHRcdCAqIHVuZGVyc3RhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gYmVjYXVzZSwgbm9ybWFsbHksIHRoZSBvcmRlciBvZiB0b2tlbnMgbWF0dGVycyBpbiBQcmlzbSBncmFtbWFycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGVyZWZvcmUsIGl0IGlzIGVuY291cmFnZWQgdG8gb3JkZXIgb3ZlcndyaXRpbmcgdG9rZW5zIGFjY29yZGluZyB0byB0aGUgcG9zaXRpb25zIG9mIHRoZSBvdmVyd3JpdHRlbiB0b2tlbnMuXG5cdFx0XHQgKiBGdXJ0aGVybW9yZSwgYWxsIG5vbi1vdmVyd3JpdGluZyB0b2tlbnMgc2hvdWxkIGJlIHBsYWNlZCBhZnRlciB0aGUgb3ZlcndyaXRpbmcgb25lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBsYW5ndWFnZSB0byBleHRlbmQuIFRoaXMgaGFzIHRvIGJlIGEga2V5IGluIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSByZWRlZiBUaGUgbmV3IHRva2VucyB0byBhcHBlbmQuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBsYW5ndWFnZSBjcmVhdGVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlc1snY3NzLXdpdGgtY29sb3JzJ10gPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdFx0XHQgKiAgICAgLy8gUHJpc20ubGFuZ3VhZ2VzLmNzcyBhbHJlYWR5IGhhcyBhICdjb21tZW50JyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIG92ZXJ3cml0ZSBDU1MnICdjb21tZW50JyB0b2tlblxuXHRcdFx0ICogICAgIC8vIGF0IGl0cyBvcmlnaW5hbCBwb3NpdGlvblxuXHRcdFx0ICogICAgICdjb21tZW50JzogeyAuLi4gfSxcblx0XHRcdCAqICAgICAvLyBDU1MgZG9lc24ndCBoYXZlIGEgJ2NvbG9yJyB0b2tlbiwgc28gdGhpcyB0b2tlbiB3aWxsIGJlIGFwcGVuZGVkXG5cdFx0XHQgKiAgICAgJ2NvbG9yJzogL1xcYig/OnJlZHxncmVlbnxibHVlKVxcYi9cblx0XHRcdCAqIH0pO1xuXHRcdFx0ICovXG5cdFx0XHRleHRlbmQ6IGZ1bmN0aW9uIChpZCwgcmVkZWYpIHtcblx0XHRcdFx0dmFyIGxhbmcgPSBfLnV0aWwuY2xvbmUoXy5sYW5ndWFnZXNbaWRdKTtcblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVkZWYpIHtcblx0XHRcdFx0XHRsYW5nW2tleV0gPSByZWRlZltrZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGxhbmc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEluc2VydHMgdG9rZW5zIF9iZWZvcmVfIGFub3RoZXIgdG9rZW4gaW4gYSBsYW5ndWFnZSBkZWZpbml0aW9uIG9yIGFueSBvdGhlciBncmFtbWFyLlxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFVzYWdlXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBoZWxwZXIgbWV0aG9kIG1ha2VzIGl0IGVhc3kgdG8gbW9kaWZ5IGV4aXN0aW5nIGxhbmd1YWdlcy4gRm9yIGV4YW1wbGUsIHRoZSBDU1MgbGFuZ3VhZ2UgZGVmaW5pdGlvblxuXHRcdFx0ICogbm90IG9ubHkgZGVmaW5lcyBDU1MgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZG9jdW1lbnRzLCBidXQgYWxzbyBuZWVkcyB0byBkZWZpbmUgaGlnaGxpZ2h0aW5nIGZvciBDU1MgZW1iZWRkZWRcblx0XHRcdCAqIGluIEhUTUwgdGhyb3VnaCBgPHN0eWxlPmAgZWxlbWVudHMuIFRvIGRvIHRoaXMsIGl0IG5lZWRzIHRvIG1vZGlmeSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgYW5kIGFkZCB0aGVcblx0XHRcdCAqIGFwcHJvcHJpYXRlIHRva2Vucy4gSG93ZXZlciwgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgIGlzIGEgcmVndWxhciBKYXZhU2NyaXB0IG9iamVjdCBsaXRlcmFsLCBzbyBpZiB5b3UgZG9cblx0XHRcdCAqIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuc3R5bGUgPSB7XG5cdFx0XHQgKiAgICAgLy8gdG9rZW5cblx0XHRcdCAqIH07XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiB0aGVuIHRoZSBgc3R5bGVgIHRva2VuIHdpbGwgYmUgYWRkZWQgKGFuZCBwcm9jZXNzZWQpIGF0IHRoZSBlbmQuIGBpbnNlcnRCZWZvcmVgIGFsbG93cyB5b3UgdG8gaW5zZXJ0IHRva2Vuc1xuXHRcdFx0ICogYmVmb3JlIGV4aXN0aW5nIHRva2Vucy4gRm9yIHRoZSBDU1MgZXhhbXBsZSBhYm92ZSwgeW91IHdvdWxkIHVzZSBpdCBsaWtlIHRoaXM6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIHtcblx0XHRcdCAqICAgICAnc3R5bGUnOiB7XG5cdFx0XHQgKiAgICAgICAgIC8vIHRva2VuXG5cdFx0XHQgKiAgICAgfVxuXHRcdFx0ICogfSk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiAjIyBTcGVjaWFsIGNhc2VzXG5cdFx0XHQgKlxuXHRcdFx0ICogSWYgdGhlIGdyYW1tYXJzIG9mIGBpbnNpZGVgIGFuZCBgaW5zZXJ0YCBoYXZlIHRva2VucyB3aXRoIHRoZSBzYW1lIG5hbWUsIHRoZSB0b2tlbnMgaW4gYGluc2lkZWAncyBncmFtbWFyXG5cdFx0XHQgKiB3aWxsIGJlIGlnbm9yZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhpcyBiZWhhdmlvciBjYW4gYmUgdXNlZCB0byBpbnNlcnQgdG9rZW5zIGFmdGVyIGBiZWZvcmVgOlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHtcblx0XHRcdCAqICAgICAnY29tbWVudCc6IFByaXNtLmxhbmd1YWdlcy5tYXJrdXAuY29tbWVudCxcblx0XHRcdCAqICAgICAvLyB0b2tlbnMgYWZ0ZXIgJ2NvbW1lbnQnXG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIExpbWl0YXRpb25zXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIG1haW4gcHJvYmxlbSBgaW5zZXJ0QmVmb3JlYCBoYXMgdG8gc29sdmUgaXMgaXRlcmF0aW9uIG9yZGVyLiBTaW5jZSBFUzIwMTUsIHRoZSBpdGVyYXRpb24gb3JkZXIgZm9yIG9iamVjdFxuXHRcdFx0ICogcHJvcGVydGllcyBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSBpbnNlcnRpb24gb3JkZXIgKGV4Y2VwdCBmb3IgaW50ZWdlciBrZXlzKSBidXQgc29tZSBicm93c2VycyBiZWhhdmVcblx0XHRcdCAqIGRpZmZlcmVudGx5IHdoZW4ga2V5cyBhcmUgZGVsZXRlZCBhbmQgcmUtaW5zZXJ0ZWQuIFNvIGBpbnNlcnRCZWZvcmVgIGNhbid0IGJlIGltcGxlbWVudGVkIGJ5IHRlbXBvcmFyaWx5XG5cdFx0XHQgKiBkZWxldGluZyBwcm9wZXJ0aWVzIHdoaWNoIGlzIG5lY2Vzc2FyeSB0byBpbnNlcnQgYXQgYXJiaXRyYXJ5IHBvc2l0aW9ucy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUbyBzb2x2ZSB0aGlzIHByb2JsZW0sIGBpbnNlcnRCZWZvcmVgIGRvZXNuJ3QgYWN0dWFsbHkgaW5zZXJ0IHRoZSBnaXZlbiB0b2tlbnMgaW50byB0aGUgdGFyZ2V0IG9iamVjdC5cblx0XHRcdCAqIEluc3RlYWQsIGl0IHdpbGwgY3JlYXRlIGEgbmV3IG9iamVjdCBhbmQgcmVwbGFjZSBhbGwgcmVmZXJlbmNlcyB0byB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBuZXcgb25lLiBUaGlzXG5cdFx0XHQgKiBjYW4gYmUgZG9uZSB3aXRob3V0IHRlbXBvcmFyaWx5IGRlbGV0aW5nIHByb3BlcnRpZXMsIHNvIHRoZSBpdGVyYXRpb24gb3JkZXIgaXMgd2VsbC1kZWZpbmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEhvd2V2ZXIsIG9ubHkgcmVmZXJlbmNlcyB0aGF0IGNhbiBiZSByZWFjaGVkIGZyb20gYFByaXNtLmxhbmd1YWdlc2Agb3IgYGluc2VydGAgd2lsbCBiZSByZXBsYWNlZC4gSS5lLiBpZlxuXHRcdFx0ICogeW91IGhvbGQgdGhlIHRhcmdldCBvYmplY3QgaW4gYSB2YXJpYWJsZSwgdGhlbiB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlIHdpbGwgbm90IGNoYW5nZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogdmFyIG9sZE1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdFx0XHQgKiB2YXIgbmV3TWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NvbW1lbnQnLCB7IC4uLiB9KTtcblx0XHRcdCAqXG5cdFx0XHQgKiBhc3NlcnQob2xkTWFya3VwICE9PSBQcmlzbS5sYW5ndWFnZXMubWFya3VwKTtcblx0XHRcdCAqIGFzc2VydChuZXdNYXJrdXAgPT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGluc2lkZSBUaGUgcHJvcGVydHkgb2YgYHJvb3RgIChlLmcuIGEgbGFuZ3VhZ2UgaWQgaW4gYFByaXNtLmxhbmd1YWdlc2ApIHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gYmVmb3JlIFRoZSBrZXkgdG8gaW5zZXJ0IGJlZm9yZS5cblx0XHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gaW5zZXJ0IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXktdmFsdWUgcGFpcnMgdG8gYmUgaW5zZXJ0ZWQuXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IFtyb290XSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgYGluc2lkZWAsIGkuZS4gdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuXHRcdFx0ICogb2JqZWN0IHRvIGJlIG1vZGlmaWVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIERlZmF1bHRzIHRvIGBQcmlzbS5sYW5ndWFnZXNgLlxuXHRcdFx0ICogQHJldHVybnMge0dyYW1tYXJ9IFRoZSBuZXcgZ3JhbW1hciBvYmplY3QuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGluc2lkZSwgYmVmb3JlLCBpbnNlcnQsIHJvb3QpIHtcblx0XHRcdFx0cm9vdCA9IHJvb3QgfHwgLyoqIEB0eXBlIHthbnl9ICovIChfLmxhbmd1YWdlcyk7XG5cdFx0XHRcdHZhciBncmFtbWFyID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHQvKiogQHR5cGUge0dyYW1tYXJ9ICovXG5cdFx0XHRcdHZhciByZXQgPSB7fTtcblxuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRcdFx0aWYgKGdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cblx0XHRcdFx0XHRcdGlmICh0b2tlbiA9PSBiZWZvcmUpIHtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgbmV3VG9rZW4gaW4gaW5zZXJ0KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGluc2VydC5oYXNPd25Qcm9wZXJ0eShuZXdUb2tlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldFtuZXdUb2tlbl0gPSBpbnNlcnRbbmV3VG9rZW5dO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBEbyBub3QgaW5zZXJ0IHRva2VuIHdoaWNoIGFsc28gb2NjdXIgaW4gaW5zZXJ0LiBTZWUgIzE1MjVcblx0XHRcdFx0XHRcdGlmICghaW5zZXJ0Lmhhc093blByb3BlcnR5KHRva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRyZXRbdG9rZW5dID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG9sZCA9IHJvb3RbaW5zaWRlXTtcblx0XHRcdFx0cm9vdFtpbnNpZGVdID0gcmV0O1xuXG5cdFx0XHRcdC8vIFVwZGF0ZSByZWZlcmVuY2VzIGluIG90aGVyIGxhbmd1YWdlIGRlZmluaXRpb25zXG5cdFx0XHRcdF8ubGFuZ3VhZ2VzLkRGUyhfLmxhbmd1YWdlcywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IG9sZCAmJiBrZXkgIT0gaW5zaWRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzW2tleV0gPSByZXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gVHJhdmVyc2UgYSBsYW5ndWFnZSBkZWZpbml0aW9uIHdpdGggRGVwdGggRmlyc3QgU2VhcmNoXG5cdFx0XHRERlM6IGZ1bmN0aW9uIERGUyhvLCBjYWxsYmFjaywgdHlwZSwgdmlzaXRlZCkge1xuXHRcdFx0XHR2aXNpdGVkID0gdmlzaXRlZCB8fCB7fTtcblxuXHRcdFx0XHR2YXIgb2JqSWQgPSBfLnV0aWwub2JqSWQ7XG5cblx0XHRcdFx0Zm9yICh2YXIgaSBpbiBvKSB7XG5cdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwobywgaSwgb1tpXSwgdHlwZSB8fCBpKTtcblxuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5ID0gb1tpXTtcblx0XHRcdFx0XHRcdHZhciBwcm9wZXJ0eVR5cGUgPSBfLnV0aWwudHlwZShwcm9wZXJ0eSk7XG5cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eVR5cGUgPT09ICdPYmplY3QnICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgbnVsbCwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5VHlwZSA9PT0gJ0FycmF5JyAmJiAhdmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldKSB7XG5cdFx0XHRcdFx0XHRcdHZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdERGUyhwcm9wZXJ0eSwgY2FsbGJhY2ssIGksIHZpc2l0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRwbHVnaW5zOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIG1vc3QgaGlnaC1sZXZlbCBmdW5jdGlvbiBpbiBQcmlzbeKAmXMgQVBJLlxuXHRcdCAqIEl0IGZldGNoZXMgYWxsIHRoZSBlbGVtZW50cyB0aGF0IGhhdmUgYSBgLmxhbmd1YWdlLXh4eHhgIGNsYXNzIGFuZCB0aGVuIGNhbGxzIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvblxuXHRcdCAqIGVhY2ggb25lIG9mIHRoZW0uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gYFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spYC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBTYW1lIGFzIGluIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGxVbmRlcn0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbDogZnVuY3Rpb24gKGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGxVbmRlcihkb2N1bWVudCwgYXN5bmMsIGNhbGxiYWNrKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRmV0Y2hlcyBhbGwgdGhlIGRlc2NlbmRhbnRzIG9mIGBjb250YWluZXJgIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHNcblx0XHQgKiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gb24gZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS1oaWdobGlnaHRhbGxgXG5cdFx0ICogMi4gYGJlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0RWxlbWVudH0gZm9yIGVhY2ggZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UGFyZW50Tm9kZX0gY29udGFpbmVyIFRoZSByb290IGVsZW1lbnQsIHdob3NlIGRlc2NlbmRhbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3Mgd2lsbCBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthc3luYz1mYWxzZV0gV2hldGhlciBlYWNoIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnMuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGVhY2ggZWxlbWVudCBhZnRlciBpdHMgaGlnaGxpZ2h0aW5nIGlzIGRvbmUuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEFsbFVuZGVyOiBmdW5jdGlvbiAoY29udGFpbmVyLCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNhbGxiYWNrOiBjYWxsYmFjayxcblx0XHRcdFx0Y29udGFpbmVyOiBjb250YWluZXIsXG5cdFx0XHRcdHNlbGVjdG9yOiAnY29kZVtjbGFzcyo9XCJsYW5ndWFnZS1cIl0sIFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0gY29kZSwgY29kZVtjbGFzcyo9XCJsYW5nLVwiXSwgW2NsYXNzKj1cImxhbmctXCJdIGNvZGUnXG5cdFx0XHR9O1xuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWhpZ2hsaWdodGFsbCcsIGVudik7XG5cblx0XHRcdGVudi5lbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbnYuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoZW52LnNlbGVjdG9yKSk7XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtYWxsLWVsZW1lbnRzLWhpZ2hsaWdodCcsIGVudik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwLCBlbGVtZW50OyAoZWxlbWVudCA9IGVudi5lbGVtZW50c1tpKytdKTspIHtcblx0XHRcdFx0Xy5oaWdobGlnaHRFbGVtZW50KGVsZW1lbnQsIGFzeW5jID09PSB0cnVlLCBlbnYuY2FsbGJhY2spO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBIaWdobGlnaHRzIHRoZSBjb2RlIGluc2lkZSBhIHNpbmdsZSBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLXNhbml0eS1jaGVja2Bcblx0XHQgKiAyLiBgYmVmb3JlLWhpZ2hsaWdodGBcblx0XHQgKiAzLiBBbGwgaG9va3Mgb2Yge0BsaW5rIFByaXNtLmhpZ2hsaWdodH0uIFRoZXNlIGhvb2tzIHdpbGwgYmUgcnVuIGJ5IGFuIGFzeW5jaHJvbm91cyB3b3JrZXIgaWYgYGFzeW5jYCBpcyBgdHJ1ZWAuXG5cdFx0ICogNC4gYGJlZm9yZS1pbnNlcnRgXG5cdFx0ICogNS4gYGFmdGVyLWhpZ2hsaWdodGBcblx0XHQgKiA2LiBgY29tcGxldGVgXG5cdFx0ICpcblx0XHQgKiBTb21lIHRoZSBhYm92ZSBob29rcyB3aWxsIGJlIHNraXBwZWQgaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBjb250YWluIGFueSB0ZXh0IG9yIHRoZXJlIGlzIG5vIGdyYW1tYXIgbG9hZGVkIGZvclxuXHRcdCAqIHRoZSBlbGVtZW50J3MgbGFuZ3VhZ2UuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgY29kZS5cblx0XHQgKiBJdCBtdXN0IGhhdmUgYSBjbGFzcyBvZiBgbGFuZ3VhZ2UteHh4eGAgdG8gYmUgcHJvY2Vzc2VkLCB3aGVyZSBgeHh4eGAgaXMgYSB2YWxpZCBsYW5ndWFnZSBpZGVudGlmaWVyLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHRvIGJlIGhpZ2hsaWdodGVkIGFzeW5jaHJvbm91c2x5IHVzaW5nIFdlYiBXb3JrZXJzXG5cdFx0ICogdG8gaW1wcm92ZSBwZXJmb3JtYW5jZSBhbmQgYXZvaWQgYmxvY2tpbmcgdGhlIFVJIHdoZW4gaGlnaGxpZ2h0aW5nIHZlcnkgbGFyZ2UgY2h1bmtzIG9mIGNvZGUuIFRoaXMgb3B0aW9uIGlzXG5cdFx0ICogW2Rpc2FibGVkIGJ5IGRlZmF1bHRdKGh0dHBzOi8vcHJpc21qcy5jb20vZmFxLmh0bWwjd2h5LWlzLWFzeW5jaHJvbm91cy1oaWdobGlnaHRpbmctZGlzYWJsZWQtYnktZGVmYXVsdCkuXG5cdFx0ICpcblx0XHQgKiBOb3RlOiBBbGwgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgcmVxdWlyZWQgdG8gaGlnaGxpZ2h0IHRoZSBjb2RlIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIG1haW4gYHByaXNtLmpzYCBmaWxlIGZvclxuXHRcdCAqIGFzeW5jaHJvbm91cyBoaWdobGlnaHRpbmcgdG8gd29yay4gWW91IGNhbiBidWlsZCB5b3VyIG93biBidW5kbGUgb24gdGhlXG5cdFx0ICogW0Rvd25sb2FkIHBhZ2VdKGh0dHBzOi8vcHJpc21qcy5jb20vZG93bmxvYWQuaHRtbCkuXG5cdFx0ICogQHBhcmFtIHtIaWdobGlnaHRDYWxsYmFja30gW2NhbGxiYWNrXSBBbiBvcHRpb25hbCBjYWxsYmFjayB0byBiZSBpbnZva2VkIGFmdGVyIHRoZSBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBNb3N0bHkgdXNlZnVsIHdoZW4gYGFzeW5jYCBpcyBgdHJ1ZWAsIHNpbmNlIGluIHRoYXQgY2FzZSwgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lIGFzeW5jaHJvbm91c2x5LlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRoaWdobGlnaHRFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHQvLyBGaW5kIGxhbmd1YWdlXG5cdFx0XHR2YXIgbGFuZ3VhZ2UgPSBfLnV0aWwuZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG5cdFx0XHR2YXIgZ3JhbW1hciA9IF8ubGFuZ3VhZ2VzW2xhbmd1YWdlXTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBlbGVtZW50LCBpZiBub3QgcHJlc2VudFxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblxuXHRcdFx0Ly8gU2V0IGxhbmd1YWdlIG9uIHRoZSBwYXJlbnQsIGZvciBzdHlsaW5nXG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScpIHtcblx0XHRcdFx0cGFyZW50LmNsYXNzTmFtZSA9IHBhcmVudC5jbGFzc05hbWUucmVwbGFjZShsYW5nLCAnJykucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyBsYW5ndWFnZS0nICsgbGFuZ3VhZ2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjb2RlID0gZWxlbWVudC50ZXh0Q29udGVudDtcblxuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlLFxuXHRcdFx0XHRncmFtbWFyOiBncmFtbWFyLFxuXHRcdFx0XHRjb2RlOiBjb2RlXG5cdFx0XHR9O1xuXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRIaWdobGlnaHRlZENvZGUoaGlnaGxpZ2h0ZWRDb2RlKSB7XG5cdFx0XHRcdGVudi5oaWdobGlnaHRlZENvZGUgPSBoaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1pbnNlcnQnLCBlbnYpO1xuXG5cdFx0XHRcdGVudi5lbGVtZW50LmlubmVySFRNTCA9IGVudi5oaWdobGlnaHRlZENvZGU7XG5cblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLWhpZ2hsaWdodCcsIGVudik7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLXNhbml0eS1jaGVjaycsIGVudik7XG5cblx0XHRcdC8vIHBsdWdpbnMgbWF5IGNoYW5nZS9hZGQgdGhlIHBhcmVudC9lbGVtZW50XG5cdFx0XHRwYXJlbnQgPSBlbnYuZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3ByZScgJiYgIXBhcmVudC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykpIHtcblx0XHRcdFx0cGFyZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnMCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWVudi5jb2RlKSB7XG5cdFx0XHRcdF8uaG9va3MucnVuKCdjb21wbGV0ZScsIGVudik7XG5cdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrLmNhbGwoZW52LmVsZW1lbnQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdFx0aWYgKCFlbnYuZ3JhbW1hcikge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy51dGlsLmVuY29kZShlbnYuY29kZSkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhc3luYyAmJiBfc2VsZi5Xb3JrZXIpIHtcblx0XHRcdFx0dmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoXy5maWxlbmFtZSk7XG5cblx0XHRcdFx0d29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoZXZ0LmRhdGEpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHdvcmtlci5wb3N0TWVzc2FnZShKU09OLnN0cmluZ2lmeSh7XG5cdFx0XHRcdFx0bGFuZ3VhZ2U6IGVudi5sYW5ndWFnZSxcblx0XHRcdFx0XHRjb2RlOiBlbnYuY29kZSxcblx0XHRcdFx0XHRpbW1lZGlhdGVDbG9zZTogdHJ1ZVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnNlcnRIaWdobGlnaHRlZENvZGUoXy5oaWdobGlnaHQoZW52LmNvZGUsIGVudi5ncmFtbWFyLCBlbnYubGFuZ3VhZ2UpKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTG93LWxldmVsIGZ1bmN0aW9uLCBvbmx5IHVzZSBpZiB5b3Uga25vdyB3aGF0IHlvdeKAmXJlIGRvaW5nLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYSBzdHJpbmcgd2l0aCB0aGUgSFRNTCBwcm9kdWNlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdFx0ICogMS4gYGJlZm9yZS10b2tlbml6ZWBcblx0XHQgKiAyLiBgYWZ0ZXItdG9rZW5pemVgXG5cdFx0ICogMy4gYHdyYXBgOiBPbiBlYWNoIHtAbGluayBUb2tlbn0uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBBIHN0cmluZyB3aXRoIHRoZSBjb2RlIHRvIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7R3JhbW1hcn0gZ3JhbW1hciBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgdG9rZW5zIHRvIHVzZS5cblx0XHQgKlxuXHRcdCAqIFVzdWFsbHkgYSBsYW5ndWFnZSBkZWZpbml0aW9uIGxpa2UgYFByaXNtLmxhbmd1YWdlcy5tYXJrdXBgLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBwYXNzZWQgdG8gYGdyYW1tYXJgLlxuXHRcdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBoaWdobGlnaHRlZCBIVE1MLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIFByaXNtLmhpZ2hsaWdodCgndmFyIGZvbyA9IHRydWU7JywgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQsICdqYXZhc2NyaXB0Jyk7XG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hciwgbGFuZ3VhZ2UpIHtcblx0XHRcdHZhciBlbnYgPSB7XG5cdFx0XHRcdGNvZGU6IHRleHQsXG5cdFx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdFx0fTtcblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtdG9rZW5pemUnLCBlbnYpO1xuXHRcdFx0ZW52LnRva2VucyA9IF8udG9rZW5pemUoZW52LmNvZGUsIGVudi5ncmFtbWFyKTtcblx0XHRcdF8uaG9va3MucnVuKCdhZnRlci10b2tlbml6ZScsIGVudik7XG5cdFx0XHRyZXR1cm4gVG9rZW4uc3RyaW5naWZ5KF8udXRpbC5lbmNvZGUoZW52LnRva2VucyksIGVudi5sYW5ndWFnZSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgdGhlIGhlYXJ0IG9mIFByaXNtLCBhbmQgdGhlIG1vc3QgbG93LWxldmVsIGZ1bmN0aW9uIHlvdSBjYW4gdXNlLiBJdCBhY2NlcHRzIGEgc3RyaW5nIG9mIHRleHQgYXMgaW5wdXRcblx0XHQgKiBhbmQgdGhlIGxhbmd1YWdlIGRlZmluaXRpb25zIHRvIHVzZSwgYW5kIHJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgdG9rZW5pemVkIGNvZGUuXG5cdFx0ICpcblx0XHQgKiBXaGVuIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIGluY2x1ZGVzIG5lc3RlZCB0b2tlbnMsIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb24gZWFjaCBvZiB0aGVzZSB0b2tlbnMuXG5cdFx0ICpcblx0XHQgKiBUaGlzIG1ldGhvZCBjb3VsZCBiZSB1c2VmdWwgaW4gb3RoZXIgY29udGV4dHMgYXMgd2VsbCwgYXMgYSB2ZXJ5IGNydWRlIHBhcnNlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHJldHVybnMge1Rva2VuU3RyZWFtfSBBbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB0b2tlbnMsIGEgdG9rZW4gc3RyZWFtLlxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIGxldCBjb2RlID0gYHZhciBmb28gPSAwO2A7XG5cdFx0ICogbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0KTtcblx0XHQgKiB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG5cdFx0ICogICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIFByaXNtLlRva2VuICYmIHRva2VuLnR5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0ICogICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgbnVtZXJpYyBsaXRlcmFsOiAke3Rva2VuLmNvbnRlbnR9YCk7XG5cdFx0ICogICAgIH1cblx0XHQgKiB9KTtcblx0XHQgKi9cblx0XHR0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQsIGdyYW1tYXIpIHtcblx0XHRcdHZhciByZXN0ID0gZ3JhbW1hci5yZXN0O1xuXHRcdFx0aWYgKHJlc3QpIHtcblx0XHRcdFx0Zm9yICh2YXIgdG9rZW4gaW4gcmVzdCkge1xuXHRcdFx0XHRcdGdyYW1tYXJbdG9rZW5dID0gcmVzdFt0b2tlbl07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZ3JhbW1hci5yZXN0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9rZW5MaXN0ID0gbmV3IExpbmtlZExpc3QoKTtcblx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgdG9rZW5MaXN0LmhlYWQsIHRleHQpO1xuXG5cdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCB0b2tlbkxpc3QuaGVhZCwgMCk7XG5cblx0XHRcdHJldHVybiB0b0FycmF5KHRva2VuTGlzdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEBuYW1lc3BhY2Vcblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aG9va3M6IHtcblx0XHRcdGFsbDoge30sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQWRkcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgdG8gdGhlIGxpc3Qgb2YgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gaG9vay5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGhvb2sgaXQgaXMgcmVnaXN0ZXJlZCBmb3IgaXMgcnVuLlxuXHRcdFx0ICogSG9va3MgYXJlIHVzdWFsbHkgZGlyZWN0bHkgcnVuIGJ5IGEgaGlnaGxpZ2h0IGZ1bmN0aW9uIGJ1dCB5b3UgY2FuIGFsc28gcnVuIGhvb2tzIHlvdXJzZWxmLlxuXHRcdFx0ICpcblx0XHRcdCAqIE9uZSBjYWxsYmFjayBmdW5jdGlvbiBjYW4gYmUgcmVnaXN0ZXJlZCB0byBtdWx0aXBsZSBob29rcyBhbmQgdGhlIHNhbWUgaG9vayBtdWx0aXBsZSB0aW1lcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgaG9vay5cblx0XHRcdCAqIEBwYXJhbSB7SG9va0NhbGxiYWNrfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2hpY2ggaXMgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaG9va3MgPSBfLmhvb2tzLmFsbDtcblxuXHRcdFx0XHRob29rc1tuYW1lXSA9IGhvb2tzW25hbWVdIHx8IFtdO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdLnB1c2goY2FsbGJhY2spO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSdW5zIGEgaG9vayBpbnZva2luZyBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIENhbGxiYWNrcyB3aWxsIGJlIGludm9rZWQgc3luY2hyb25vdXNseSBhbmQgaW4gdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBlbnYgVGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBvZiB0aGUgaG9vayBwYXNzZWQgdG8gYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRydW46IGZ1bmN0aW9uIChuYW1lLCBlbnYpIHtcblx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IF8uaG9va3MuYWxsW25hbWVdO1xuXG5cdFx0XHRcdGlmICghY2FsbGJhY2tzIHx8ICFjYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGNhbGxiYWNrOyAoY2FsbGJhY2sgPSBjYWxsYmFja3NbaSsrXSk7KSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soZW52KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRUb2tlbjogVG9rZW5cblx0fTtcblx0X3NlbGYuUHJpc20gPSBfO1xuXG5cblx0Ly8gVHlwZXNjcmlwdCBub3RlOlxuXHQvLyBUaGUgZm9sbG93aW5nIGNhbiBiZSB1c2VkIHRvIGltcG9ydCB0aGUgVG9rZW4gdHlwZSBpbiBKU0RvYzpcblx0Ly9cblx0Ly8gICBAdHlwZWRlZiB7SW5zdGFuY2VUeXBlPGltcG9ydChcIi4vcHJpc20tY29yZVwiKVtcIlRva2VuXCJdPn0gVG9rZW5cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyB0b2tlbi5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgU2VlIHtAbGluayBUb2tlbiN0eXBlIHR5cGV9XG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19IGNvbnRlbnQgU2VlIHtAbGluayBUb2tlbiNjb250ZW50IGNvbnRlbnR9XG5cdCAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW21hdGNoZWRTdHI9XCJcIl0gQSBjb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb20uXG5cdCAqIEBjbGFzc1xuXHQgKiBAZ2xvYmFsXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdGZ1bmN0aW9uIFRva2VuKHR5cGUsIGNvbnRlbnQsIGFsaWFzLCBtYXRjaGVkU3RyKSB7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHR5cGUgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyBpcyB1c3VhbGx5IHRoZSBrZXkgb2YgYSBwYXR0ZXJuIGluIGEge0BsaW5rIEdyYW1tYXJ9LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ31cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBzdHJpbmdzIG9yIHRva2VucyBjb250YWluZWQgYnkgdGhpcyB0b2tlbi5cblx0XHQgKlxuXHRcdCAqIFRoaXMgd2lsbCBiZSBhIHRva2VuIHN0cmVhbSBpZiB0aGUgcGF0dGVybiBtYXRjaGVkIGFsc28gZGVmaW5lZCBhbiBgaW5zaWRlYCBncmFtbWFyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZyB8IFRva2VuU3RyZWFtfVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuXHRcdC8qKlxuXHRcdCAqIFRoZSBhbGlhcyhlcykgb2YgdGhlIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUge3N0cmluZ3xzdHJpbmdbXX1cblx0XHQgKiBAc2VlIEdyYW1tYXJUb2tlblxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHR0aGlzLmFsaWFzID0gYWxpYXM7XG5cdFx0Ly8gQ29weSBvZiB0aGUgZnVsbCBzdHJpbmcgdGhpcyB0b2tlbiB3YXMgY3JlYXRlZCBmcm9tXG5cdFx0dGhpcy5sZW5ndGggPSAobWF0Y2hlZFN0ciB8fCAnJykubGVuZ3RoIHwgMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHRva2VuIHN0cmVhbSBpcyBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCB7QGxpbmsgVG9rZW4gVG9rZW59IG9iamVjdHMuXG5cdCAqXG5cdCAqIFRva2VuIHN0cmVhbXMgaGF2ZSB0byBmdWxmaWxsIGEgZmV3IHByb3BlcnRpZXMgdGhhdCBhcmUgYXNzdW1lZCBieSBtb3N0IGZ1bmN0aW9ucyAobW9zdGx5IGludGVybmFsIG9uZXMpIHRoYXQgcHJvY2Vzc1xuXHQgKiB0aGVtLlxuXHQgKlxuXHQgKiAxLiBObyBhZGphY2VudCBzdHJpbmdzLlxuXHQgKiAyLiBObyBlbXB0eSBzdHJpbmdzLlxuXHQgKlxuXHQgKiAgICBUaGUgb25seSBleGNlcHRpb24gaGVyZSBpcyB0aGUgdG9rZW4gc3RyZWFtIHRoYXQgb25seSBjb250YWlucyB0aGUgZW1wdHkgc3RyaW5nIGFuZCBub3RoaW5nIGVsc2UuXG5cdCAqXG5cdCAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmcgfCBUb2tlbj59IFRva2VuU3RyZWFtXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblxuXHQvKipcblx0ICogQ29udmVydHMgdGhlIGdpdmVuIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBhbiBIVE1MIHJlcHJlc2VudGF0aW9uLlxuXHQgKlxuXHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHQgKiAxLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlbiB8IFRva2VuU3RyZWFtfSBvIFRoZSB0b2tlbiBvciB0b2tlbiBzdHJlYW0gdG8gYmUgY29udmVydGVkLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgVGhlIG5hbWUgb2YgY3VycmVudCBsYW5ndWFnZS5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIEhUTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbS5cblx0ICogQG1lbWJlcm9mIFRva2VuXG5cdCAqIEBzdGF0aWNcblx0ICovXG5cdFRva2VuLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShvLCBsYW5ndWFnZSkge1xuXHRcdGlmICh0eXBlb2YgbyA9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIG87XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KG8pKSB7XG5cdFx0XHR2YXIgcyA9ICcnO1xuXHRcdFx0by5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHMgKz0gc3RyaW5naWZ5KGUsIGxhbmd1YWdlKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHM7XG5cdFx0fVxuXG5cdFx0dmFyIGVudiA9IHtcblx0XHRcdHR5cGU6IG8udHlwZSxcblx0XHRcdGNvbnRlbnQ6IHN0cmluZ2lmeShvLmNvbnRlbnQsIGxhbmd1YWdlKSxcblx0XHRcdHRhZzogJ3NwYW4nLFxuXHRcdFx0Y2xhc3NlczogWyd0b2tlbicsIG8udHlwZV0sXG5cdFx0XHRhdHRyaWJ1dGVzOiB7fSxcblx0XHRcdGxhbmd1YWdlOiBsYW5ndWFnZVxuXHRcdH07XG5cblx0XHR2YXIgYWxpYXNlcyA9IG8uYWxpYXM7XG5cdFx0aWYgKGFsaWFzZXMpIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGFsaWFzZXMpKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVudi5jbGFzc2VzLCBhbGlhc2VzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVudi5jbGFzc2VzLnB1c2goYWxpYXNlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Xy5ob29rcy5ydW4oJ3dyYXAnLCBlbnYpO1xuXG5cdFx0dmFyIGF0dHJpYnV0ZXMgPSAnJztcblx0XHRmb3IgKHZhciBuYW1lIGluIGVudi5hdHRyaWJ1dGVzKSB7XG5cdFx0XHRhdHRyaWJ1dGVzICs9ICcgJyArIG5hbWUgKyAnPVwiJyArIChlbnYuYXR0cmlidXRlc1tuYW1lXSB8fCAnJykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpICsgJ1wiJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJzwnICsgZW52LnRhZyArICcgY2xhc3M9XCInICsgZW52LmNsYXNzZXMuam9pbignICcpICsgJ1wiJyArIGF0dHJpYnV0ZXMgKyAnPicgKyBlbnYuY29udGVudCArICc8LycgKyBlbnYudGFnICsgJz4nO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1JlZ0V4cH0gcGF0dGVyblxuXHQgKiBAcGFyYW0ge251bWJlcn0gcG9zXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbG9va2JlaGluZFxuXHQgKiBAcmV0dXJucyB7UmVnRXhwRXhlY0FycmF5IHwgbnVsbH1cblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpIHtcblx0XHRwYXR0ZXJuLmxhc3RJbmRleCA9IHBvcztcblx0XHR2YXIgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWModGV4dCk7XG5cdFx0aWYgKG1hdGNoICYmIGxvb2tiZWhpbmQgJiYgbWF0Y2hbMV0pIHtcblx0XHRcdC8vIGNoYW5nZSB0aGUgbWF0Y2ggdG8gcmVtb3ZlIHRoZSB0ZXh0IG1hdGNoZWQgYnkgdGhlIFByaXNtIGxvb2tiZWhpbmQgZ3JvdXBcblx0XHRcdHZhciBsb29rYmVoaW5kTGVuZ3RoID0gbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0bWF0Y2guaW5kZXggKz0gbG9va2JlaGluZExlbmd0aDtcblx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UobG9va2JlaGluZExlbmd0aCk7XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8c3RyaW5nIHwgVG9rZW4+fSB0b2tlbkxpc3Rcblx0ICogQHBhcmFtIHthbnl9IGdyYW1tYXJcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxzdHJpbmcgfCBUb2tlbj59IHN0YXJ0Tm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRQb3Ncblx0ICogQHBhcmFtIHtSZW1hdGNoT3B0aW9uc30gW3JlbWF0Y2hdXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKlxuXHQgKiBAdHlwZWRlZiBSZW1hdGNoT3B0aW9uc1xuXHQgKiBAcHJvcGVydHkge3N0cmluZ30gY2F1c2Vcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9IHJlYWNoXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBzdGFydE5vZGUsIHN0YXJ0UG9zLCByZW1hdGNoKSB7XG5cdFx0Zm9yICh2YXIgdG9rZW4gaW4gZ3JhbW1hcikge1xuXHRcdFx0aWYgKCFncmFtbWFyLmhhc093blByb3BlcnR5KHRva2VuKSB8fCAhZ3JhbW1hclt0b2tlbl0pIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwYXR0ZXJucyA9IGdyYW1tYXJbdG9rZW5dO1xuXHRcdFx0cGF0dGVybnMgPSBBcnJheS5pc0FycmF5KHBhdHRlcm5zKSA/IHBhdHRlcm5zIDogW3BhdHRlcm5zXTtcblxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBwYXR0ZXJucy5sZW5ndGg7ICsraikge1xuXHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZW1hdGNoLmNhdXNlID09IHRva2VuICsgJywnICsgaikge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBwYXR0ZXJuT2JqID0gcGF0dGVybnNbal07XG5cdFx0XHRcdHZhciBpbnNpZGUgPSBwYXR0ZXJuT2JqLmluc2lkZTtcblx0XHRcdFx0dmFyIGxvb2tiZWhpbmQgPSAhIXBhdHRlcm5PYmoubG9va2JlaGluZDtcblx0XHRcdFx0dmFyIGdyZWVkeSA9ICEhcGF0dGVybk9iai5ncmVlZHk7XG5cdFx0XHRcdHZhciBhbGlhcyA9IHBhdHRlcm5PYmouYWxpYXM7XG5cblx0XHRcdFx0aWYgKGdyZWVkeSAmJiAhcGF0dGVybk9iai5wYXR0ZXJuLmdsb2JhbCkge1xuXHRcdFx0XHRcdC8vIFdpdGhvdXQgdGhlIGdsb2JhbCBmbGFnLCBsYXN0SW5kZXggd29uJ3Qgd29ya1xuXHRcdFx0XHRcdHZhciBmbGFncyA9IHBhdHRlcm5PYmoucGF0dGVybi50b1N0cmluZygpLm1hdGNoKC9baW1zdXldKiQvKVswXTtcblx0XHRcdFx0XHRwYXR0ZXJuT2JqLnBhdHRlcm4gPSBSZWdFeHAocGF0dGVybk9iai5wYXR0ZXJuLnNvdXJjZSwgZmxhZ3MgKyAnZycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LyoqIEB0eXBlIHtSZWdFeHB9ICovXG5cdFx0XHRcdHZhciBwYXR0ZXJuID0gcGF0dGVybk9iai5wYXR0ZXJuIHx8IHBhdHRlcm5PYmo7XG5cblx0XHRcdFx0Zm9yICggLy8gaXRlcmF0ZSB0aGUgdG9rZW4gbGlzdCBhbmQga2VlcCB0cmFjayBvZiB0aGUgY3VycmVudCB0b2tlbi9zdHJpbmcgcG9zaXRpb25cblx0XHRcdFx0XHR2YXIgY3VycmVudE5vZGUgPSBzdGFydE5vZGUubmV4dCwgcG9zID0gc3RhcnRQb3M7XG5cdFx0XHRcdFx0Y3VycmVudE5vZGUgIT09IHRva2VuTGlzdC50YWlsO1xuXHRcdFx0XHRcdHBvcyArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGgsIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dFxuXHRcdFx0XHQpIHtcblxuXHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIHBvcyA+PSByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgc3RyID0gY3VycmVudE5vZGUudmFsdWU7XG5cblx0XHRcdFx0XHRpZiAodG9rZW5MaXN0Lmxlbmd0aCA+IHRleHQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBTb21ldGhpbmcgd2VudCB0ZXJyaWJseSB3cm9uZywgQUJPUlQsIEFCT1JUIVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzdHIgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUNvdW50ID0gMTsgLy8gdGhpcyBpcyB0aGUgdG8gcGFyYW1ldGVyIG9mIHJlbW92ZUJldHdlZW5cblx0XHRcdFx0XHR2YXIgbWF0Y2g7XG5cblx0XHRcdFx0XHRpZiAoZ3JlZWR5KSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwb3MsIHRleHQsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHRcdHZhciB0byA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXHRcdFx0XHRcdFx0dmFyIHAgPSBwb3M7XG5cblx0XHRcdFx0XHRcdC8vIGZpbmQgdGhlIG5vZGUgdGhhdCBjb250YWlucyB0aGUgbWF0Y2hcblx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKGZyb20gPj0gcCkge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG5cdFx0XHRcdFx0XHRcdHAgKz0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gYWRqdXN0IHBvcyAoYW5kIHApXG5cdFx0XHRcdFx0XHRwIC09IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdHBvcyA9IHA7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSBjdXJyZW50IG5vZGUgaXMgYSBUb2tlbiwgdGhlbiB0aGUgbWF0Y2ggc3RhcnRzIGluc2lkZSBhbm90aGVyIFRva2VuLCB3aGljaCBpcyBpbnZhbGlkXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudE5vZGUudmFsdWUgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbGFzdCBub2RlIHdoaWNoIGlzIGFmZmVjdGVkIGJ5IHRoaXMgbWF0Y2hcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdHZhciBrID0gY3VycmVudE5vZGU7XG5cdFx0XHRcdFx0XHRcdGsgIT09IHRva2VuTGlzdC50YWlsICYmIChwIDwgdG8gfHwgdHlwZW9mIGsudmFsdWUgPT09ICdzdHJpbmcnKTtcblx0XHRcdFx0XHRcdFx0ayA9IGsubmV4dFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHJlbW92ZUNvdW50Kys7XG5cdFx0XHRcdFx0XHRcdHAgKz0gay52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZW1vdmVDb3VudC0tO1xuXG5cdFx0XHRcdFx0XHQvLyByZXBsYWNlIHdpdGggdGhlIG5ldyBtYXRjaFxuXHRcdFx0XHRcdFx0c3RyID0gdGV4dC5zbGljZShwb3MsIHApO1xuXHRcdFx0XHRcdFx0bWF0Y2guaW5kZXggLT0gcG9zO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRtYXRjaCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCAwLCBzdHIsIGxvb2tiZWhpbmQpO1xuXHRcdFx0XHRcdFx0aWYgKCFtYXRjaCkge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlXG5cdFx0XHRcdFx0dmFyIGZyb20gPSBtYXRjaC5pbmRleDtcblx0XHRcdFx0XHR2YXIgbWF0Y2hTdHIgPSBtYXRjaFswXTtcblx0XHRcdFx0XHR2YXIgYmVmb3JlID0gc3RyLnNsaWNlKDAsIGZyb20pO1xuXHRcdFx0XHRcdHZhciBhZnRlciA9IHN0ci5zbGljZShmcm9tICsgbWF0Y2hTdHIubGVuZ3RoKTtcblxuXHRcdFx0XHRcdHZhciByZWFjaCA9IHBvcyArIHN0ci5sZW5ndGg7XG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRyZW1hdGNoLnJlYWNoID0gcmVhY2g7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIHJlbW92ZUZyb20gPSBjdXJyZW50Tm9kZS5wcmV2O1xuXG5cdFx0XHRcdFx0aWYgKGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0cmVtb3ZlRnJvbSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgYmVmb3JlKTtcblx0XHRcdFx0XHRcdHBvcyArPSBiZWZvcmUubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlbW92ZVJhbmdlKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgcmVtb3ZlQ291bnQpO1xuXG5cdFx0XHRcdFx0dmFyIHdyYXBwZWQgPSBuZXcgVG9rZW4odG9rZW4sIGluc2lkZSA/IF8udG9rZW5pemUobWF0Y2hTdHIsIGluc2lkZSkgOiBtYXRjaFN0ciwgYWxpYXMsIG1hdGNoU3RyKTtcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSA9IGFkZEFmdGVyKHRva2VuTGlzdCwgcmVtb3ZlRnJvbSwgd3JhcHBlZCk7XG5cblx0XHRcdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdGFkZEFmdGVyKHRva2VuTGlzdCwgY3VycmVudE5vZGUsIGFmdGVyKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVtb3ZlQ291bnQgPiAxKSB7XG5cdFx0XHRcdFx0XHQvLyBhdCBsZWFzdCBvbmUgVG9rZW4gb2JqZWN0IHdhcyByZW1vdmVkLCBzbyB3ZSBoYXZlIHRvIGRvIHNvbWUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0Ly8gdGhpcyBjYW4gb25seSBoYXBwZW4gaWYgdGhlIGN1cnJlbnQgcGF0dGVybiBpcyBncmVlZHlcblxuXHRcdFx0XHRcdFx0LyoqIEB0eXBlIHtSZW1hdGNoT3B0aW9uc30gKi9cblx0XHRcdFx0XHRcdHZhciBuZXN0ZWRSZW1hdGNoID0ge1xuXHRcdFx0XHRcdFx0XHRjYXVzZTogdG9rZW4gKyAnLCcgKyBqLFxuXHRcdFx0XHRcdFx0XHRyZWFjaDogcmVhY2hcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRtYXRjaEdyYW1tYXIodGV4dCwgdG9rZW5MaXN0LCBncmFtbWFyLCBjdXJyZW50Tm9kZS5wcmV2LCBwb3MsIG5lc3RlZFJlbWF0Y2gpO1xuXG5cdFx0XHRcdFx0XHQvLyB0aGUgcmVhY2ggbWlnaHQgaGF2ZSBiZWVuIGV4dGVuZGVkIGJlY2F1c2Ugb2YgdGhlIHJlbWF0Y2hpbmdcblx0XHRcdFx0XHRcdGlmIChyZW1hdGNoICYmIG5lc3RlZFJlbWF0Y2gucmVhY2ggPiByZW1hdGNoLnJlYWNoKSB7XG5cdFx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSBuZXN0ZWRSZW1hdGNoLnJlYWNoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZWRlZiBMaW5rZWRMaXN0Tm9kZVxuXHQgKiBAcHJvcGVydHkge1R9IHZhbHVlXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBwcmV2IFRoZSBwcmV2aW91cyBub2RlLlxuXHQgKiBAcHJvcGVydHkge0xpbmtlZExpc3ROb2RlPFQ+IHwgbnVsbH0gbmV4dCBUaGUgbmV4dCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblxuXHQvKipcblx0ICogQHRlbXBsYXRlIFRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR2YXIgaGVhZCA9IHsgdmFsdWU6IG51bGwsIHByZXY6IG51bGwsIG5leHQ6IG51bGwgfTtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciB0YWlsID0geyB2YWx1ZTogbnVsbCwgcHJldjogaGVhZCwgbmV4dDogbnVsbCB9O1xuXHRcdGhlYWQubmV4dCA9IHRhaWw7XG5cblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMuaGVhZCA9IGhlYWQ7XG5cdFx0LyoqIEB0eXBlIHtMaW5rZWRMaXN0Tm9kZTxUPn0gKi9cblx0XHR0aGlzLnRhaWwgPSB0YWlsO1xuXHRcdHRoaXMubGVuZ3RoID0gMDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgbmV3IG5vZGUgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIGxpc3QuXG5cdCAqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPFQ+fSBub2RlXG5cdCAqIEBwYXJhbSB7VH0gdmFsdWVcblx0ICogQHJldHVybnMge0xpbmtlZExpc3ROb2RlPFQ+fSBUaGUgYWRkZWQgbm9kZS5cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIGFkZEFmdGVyKGxpc3QsIG5vZGUsIHZhbHVlKSB7XG5cdFx0Ly8gYXNzdW1lcyB0aGF0IG5vZGUgIT0gbGlzdC50YWlsICYmIHZhbHVlcy5sZW5ndGggPj0gMFxuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXG5cdFx0dmFyIG5ld05vZGUgPSB7IHZhbHVlOiB2YWx1ZSwgcHJldjogbm9kZSwgbmV4dDogbmV4dCB9O1xuXHRcdG5vZGUubmV4dCA9IG5ld05vZGU7XG5cdFx0bmV4dC5wcmV2ID0gbmV3Tm9kZTtcblx0XHRsaXN0Lmxlbmd0aCsrO1xuXG5cdFx0cmV0dXJuIG5ld05vZGU7XG5cdH1cblx0LyoqXG5cdCAqIFJlbW92ZXMgYGNvdW50YCBub2RlcyBhZnRlciB0aGUgZ2l2ZW4gbm9kZS4gVGhlIGdpdmVuIG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGNvdW50XG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqL1xuXHRmdW5jdGlvbiByZW1vdmVSYW5nZShsaXN0LCBub2RlLCBjb3VudCkge1xuXHRcdHZhciBuZXh0ID0gbm9kZS5uZXh0O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQgJiYgbmV4dCAhPT0gbGlzdC50YWlsOyBpKyspIHtcblx0XHRcdG5leHQgPSBuZXh0Lm5leHQ7XG5cdFx0fVxuXHRcdG5vZGUubmV4dCA9IG5leHQ7XG5cdFx0bmV4dC5wcmV2ID0gbm9kZTtcblx0XHRsaXN0Lmxlbmd0aCAtPSBpO1xuXHR9XG5cdC8qKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHJldHVybnMge1RbXX1cblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHRvQXJyYXkobGlzdCkge1xuXHRcdHZhciBhcnJheSA9IFtdO1xuXHRcdHZhciBub2RlID0gbGlzdC5oZWFkLm5leHQ7XG5cdFx0d2hpbGUgKG5vZGUgIT09IGxpc3QudGFpbCkge1xuXHRcdFx0YXJyYXkucHVzaChub2RlLnZhbHVlKTtcblx0XHRcdG5vZGUgPSBub2RlLm5leHQ7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cblx0aWYgKCFfc2VsZi5kb2N1bWVudCkge1xuXHRcdGlmICghX3NlbGYuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0Ly8gaW4gTm9kZS5qc1xuXHRcdFx0cmV0dXJuIF87XG5cdFx0fVxuXG5cdFx0aWYgKCFfLmRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcikge1xuXHRcdFx0Ly8gSW4gd29ya2VyXG5cdFx0XHRfc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHR2YXIgbWVzc2FnZSA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpO1xuXHRcdFx0XHR2YXIgbGFuZyA9IG1lc3NhZ2UubGFuZ3VhZ2U7XG5cdFx0XHRcdHZhciBjb2RlID0gbWVzc2FnZS5jb2RlO1xuXHRcdFx0XHR2YXIgaW1tZWRpYXRlQ2xvc2UgPSBtZXNzYWdlLmltbWVkaWF0ZUNsb3NlO1xuXG5cdFx0XHRcdF9zZWxmLnBvc3RNZXNzYWdlKF8uaGlnaGxpZ2h0KGNvZGUsIF8ubGFuZ3VhZ2VzW2xhbmddLCBsYW5nKSk7XG5cdFx0XHRcdGlmIChpbW1lZGlhdGVDbG9zZSkge1xuXHRcdFx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGZhbHNlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gXztcblx0fVxuXG5cdC8vIEdldCBjdXJyZW50IHNjcmlwdCBhbmQgaGlnaGxpZ2h0XG5cdHZhciBzY3JpcHQgPSBfLnV0aWwuY3VycmVudFNjcmlwdCgpO1xuXG5cdGlmIChzY3JpcHQpIHtcblx0XHRfLmZpbGVuYW1lID0gc2NyaXB0LnNyYztcblxuXHRcdGlmIChzY3JpcHQuaGFzQXR0cmlidXRlKCdkYXRhLW1hbnVhbCcpKSB7XG5cdFx0XHRfLm1hbnVhbCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKCkge1xuXHRcdGlmICghXy5tYW51YWwpIHtcblx0XHRcdF8uaGlnaGxpZ2h0QWxsKCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImxvYWRpbmdcIiwgdGhlbiB3ZSdsbCB1c2UgRE9NQ29udGVudExvYWRlZC5cblx0XHQvLyBJZiB0aGUgZG9jdW1lbnQgc3RhdGUgaXMgXCJpbnRlcmFjdGl2ZVwiIGFuZCB0aGUgcHJpc20uanMgc2NyaXB0IGlzIGRlZmVycmVkLCB0aGVuIHdlJ2xsIGFsc28gdXNlIHRoZVxuXHRcdC8vIERPTUNvbnRlbnRMb2FkZWQgZXZlbnQgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBzb21lIHBsdWdpbnMgb3IgbGFuZ3VhZ2VzIHdoaWNoIGhhdmUgYWxzbyBiZWVuIGRlZmVycmVkIGFuZCB0aGV5XG5cdFx0Ly8gbWlnaHQgdGFrZSBsb25nZXIgb25lIGFuaW1hdGlvbiBmcmFtZSB0byBleGVjdXRlIHdoaWNoIGNhbiBjcmVhdGUgYSByYWNlIGNvbmRpdGlvbiB3aGVyZSBvbmx5IHNvbWUgcGx1Z2lucyBoYXZlXG5cdFx0Ly8gYmVlbiBsb2FkZWQgd2hlbiBQcmlzbS5oaWdobGlnaHRBbGwoKSBpcyBleGVjdXRlZCwgZGVwZW5kaW5nIG9uIGhvdyBmYXN0IHJlc291cmNlcyBhcmUgbG9hZGVkLlxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9pc3N1ZXMvMjEwMlxuXHRcdHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcblx0XHRpZiAocmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnIHx8IHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgJiYgc2NyaXB0ICYmIHNjcmlwdC5kZWZlcikge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjayk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG5cdFx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGhpZ2hsaWdodEF1dG9tYXRpY2FsbHlDYWxsYmFjaywgMTYpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBfO1xuXG59KF9zZWxmKSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IFByaXNtO1xufVxuXG4vLyBoYWNrIGZvciBjb21wb25lbnRzIHRvIHdvcmsgY29ycmVjdGx5IGluIG5vZGUuanNcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuXHRnbG9iYWwuUHJpc20gPSBQcmlzbTtcbn1cblxuLy8gc29tZSBhZGRpdGlvbmFsIGRvY3VtZW50YXRpb24vdHlwZXNcblxuLyoqXG4gKiBUaGUgZXhwYW5zaW9uIG9mIGEgc2ltcGxlIGBSZWdFeHBgIGxpdGVyYWwgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIHByb3BlcnRpZXMuXG4gKlxuICogQHR5cGVkZWYgR3JhbW1hclRva2VuXG4gKiBAcHJvcGVydHkge1JlZ0V4cH0gcGF0dGVybiBUaGUgcmVndWxhciBleHByZXNzaW9uIG9mIHRoZSB0b2tlbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW2xvb2tiZWhpbmQ9ZmFsc2VdIElmIGB0cnVlYCwgdGhlbiB0aGUgZmlyc3QgY2FwdHVyaW5nIGdyb3VwIG9mIGBwYXR0ZXJuYCB3aWxsIChlZmZlY3RpdmVseSlcbiAqIGJlaGF2ZSBhcyBhIGxvb2tiZWhpbmQgZ3JvdXAgbWVhbmluZyB0aGF0IHRoZSBjYXB0dXJlZCB0ZXh0IHdpbGwgbm90IGJlIHBhcnQgb2YgdGhlIG1hdGNoZWQgdGV4dCBvZiB0aGUgbmV3IHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbZ3JlZWR5PWZhbHNlXSBXaGV0aGVyIHRoZSB0b2tlbiBpcyBncmVlZHkuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xzdHJpbmdbXX0gW2FsaWFzXSBBbiBvcHRpb25hbCBhbGlhcyBvciBsaXN0IG9mIGFsaWFzZXMuXG4gKiBAcHJvcGVydHkge0dyYW1tYXJ9IFtpbnNpZGVdIFRoZSBuZXN0ZWQgZ3JhbW1hciBvZiB0aGlzIHRva2VuLlxuICpcbiAqIFRoZSBgaW5zaWRlYCBncmFtbWFyIHdpbGwgYmUgdXNlZCB0byB0b2tlbml6ZSB0aGUgdGV4dCB2YWx1ZSBvZiBlYWNoIHRva2VuIG9mIHRoaXMga2luZC5cbiAqXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIG1ha2UgbmVzdGVkIGFuZCBldmVuIHJlY3Vyc2l2ZSBsYW5ndWFnZSBkZWZpbml0aW9ucy5cbiAqXG4gKiBOb3RlOiBUaGlzIGNhbiBjYXVzZSBpbmZpbml0ZSByZWN1cnNpb24uIEJlIGNhcmVmdWwgd2hlbiB5b3UgZW1iZWQgZGlmZmVyZW50IGxhbmd1YWdlcyBvciBldmVuIHRoZSBzYW1lIGxhbmd1YWdlIGludG9cbiAqIGVhY2ggYW5vdGhlci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIEdyYW1tYXJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBSZWdFeHAgfCBHcmFtbWFyVG9rZW4gfCBBcnJheTxSZWdFeHAgfCBHcmFtbWFyVG9rZW4+Pn1cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW3Jlc3RdIEFuIG9wdGlvbmFsIGdyYW1tYXIgb2JqZWN0IHRoYXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGdyYW1tYXIuXG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgaW52b2tlZCBhZnRlciBhbiBlbGVtZW50IHdhcyBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKlxuICogQGNhbGxiYWNrIEhpZ2hsaWdodENhbGxiYWNrXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgc3VjY2Vzc2Z1bGx5IGhpZ2hsaWdodGVkLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgSG9va0NhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZ2xvYmFsXG4gKiBAcHVibGljXG4gKi9cbiIsImNvbnN0IHRocm93RXJyb3IgPSAobWVzc2FnZSkgPT4ge1xuXHR0aHJvdyBuZXcgRXJyb3IoYCoqKiBvLXN5bnRheC1oaWdobGlnaHQgZXJyb3I6XFxuJHttZXNzYWdlfVxcbioqKmApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGhyb3dFcnJvcjtcbiIsImltcG9ydCB0aHJvd0Vycm9yIGZyb20gJy4vaGVscGVycyc7XG5cbmltcG9ydCBwcmlzbSBmcm9tICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29yZS5qcyc7XG4vLyBBZGRzIHRvIFByaXNtIGdsb2JhbCBvYmplY3Qgd2hpY2ggd2UgcmVtb3ZlIGh0dHBzOi8vZ2l0aHViLmNvbS9QcmlzbUpTL3ByaXNtL2Jsb2IvdjEuMTUuMC9wcmlzbS5qcyNMNlxuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya3VwLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzcy5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhc2NyaXB0LmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2guanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zY3NzLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXlhbWwuanMnO1xuaW1wb3J0IGRpZmYgZnJvbSAnLi9sYW5ndWFnZXMvcHJpc20tZGlmZi5qcyc7XG5cbmNsYXNzIFN5bnRheEhpZ2hsaWdodCB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IFttZXNzYWdlRWxlbWVudF0gLSBUaGUgbWVzc2FnZSBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgbWVzc2FnZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5sYW5ndWFnZSAtIFRoZSBsYW5ndWFnZSB0byB0b2tlbmlzZSB0aGUgY29kZSBmb3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yIChzeW50YXhFbCwgb3B0aW9ucykge1xuXHRcdGRlbGV0ZSB3aW5kb3cuUHJpc207IC8vIFJlbW92ZSBQcmlzbSBnbG9iYWwgaHR0cHM6Ly9naXRodWIuY29tL1ByaXNtSlMvcHJpc20vYmxvYi92MS4xNS4wL3ByaXNtLmpzI0w2XG5cdFx0cHJpc20ubGFuZ3VhZ2VzLmRpZmYgPSBkaWZmOyAvLyBBc3NpZ24gY3VzdG9tIGRpZmYgbGFuZ3VhZ2Vcblx0XHR0aGlzLnN5bnRheEVsZW1lbnQgPSBzeW50YXhFbDtcblx0XHR0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRcdGxhbmd1YWdlOiAnJyxcblx0XHRcdHN5bnRheFN0cmluZzogJydcblx0IFx0fSwgb3B0aW9ucyk7XG5cblx0XHRpZiAodHlwZW9mIHRoaXMuc3ludGF4RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMuX3NldExhbmd1YWdlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3Rva2VuaXNlQ29kZUJsb2NrcygpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIFNldCBsYW5ndWFnZSBmb3Igc3ludGF4IGhpZ2hsaWdodGluZ1xuXHQqL1xuXHRfc2V0TGFuZ3VhZ2UgKCkge1xuXHRcdGlmICh0aGlzLm9wdHMubGFuZ3VhZ2UpIHtcblx0XHRcdHRoaXMub3B0cy5zeW50YXhTdHJpbmcgPSB0aGlzLnN5bnRheEVsZW1lbnQ7XG5cdFx0XHR0aGlzLl9jaGVja0xhbmd1YWdlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93RXJyb3IoJ0EgbGFuZ3VhZ2UgbXVzdCBiZSBkZWZpbmVkIGluIHRoZSBvcHRpb25zIG9iamVjdCcpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIEdldCBsYW5ndWFnZSBmcm9tIEhUTUwgZWxlbWVudFxuXHQqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IC0gVGhlIGVsZW1lbnQgd2l0aCBhIGxhbmd1YWdlLXJlbGV2YW50IGNsYXNzIG5hbWVcblx0KiBAcmV0dXJuIHtTdHJpbmcgfCBOdWxsfSAtIFRoZSBsYW5ndWFnZSBuYW1lIGUuZy4gYGpzYCBvciBudWxsIGlmIG5vdCBkZWZpbmVkLlxuXHQqL1xuXHRfZ2V0TGFuZ3VhZ2UoZWxlbWVudCkge1xuXHRcdGNvbnN0IGhpZ2hsaWdodENsYXNzTmFtZXMgPSBbLi4uZWxlbWVudC5jbGFzc0xpc3RdLmZpbHRlcihjID0+IGMuaW5jbHVkZXMoJ28tc3ludGF4LWhpZ2hsaWdodC0tJykpO1xuXHRcdGNvbnN0IGhpZ2hsaWdodENsYXNzTmFtZSA9IGhpZ2hsaWdodENsYXNzTmFtZXMgPyBoaWdobGlnaHRDbGFzc05hbWVzWzBdOiBudWxsO1xuXG5cdFx0aWYgKCFoaWdobGlnaHRDbGFzc05hbWUpIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0YEluIG9yZGVyIHRvIGhpZ2hsaWdodCBhIGNvZGVibG9jaywgdGhlICc8Y29kZT4nIGAgK1xuXHRcdFx0XHRgcmVxdWlyZXMgYSBzcGVjaWZpYyBjbGFzcyB0byBkZWZpbmUgYSBsYW5ndWFnZS4gRS5nLiBgICtcblx0XHRcdFx0YGNsYXNzPVwiby1zeW50YXgtaGlnaGxpZ2h0LS1odG1sXCIgb3IgYCArXG5cdFx0XHRcdGBjbGFzcz1cIm8tc3ludGF4LWhpZ2hsaWdodC0tanNcImAsIGVsZW1lbnQpO1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0dGhpcy5vcHRzLmxhbmd1YWdlID0gaGlnaGxpZ2h0Q2xhc3NOYW1lLnJlcGxhY2UoJ28tc3ludGF4LWhpZ2hsaWdodC0tJywgJycpO1xuXG5cdFx0dGhpcy5fY2hlY2tMYW5ndWFnZSgpO1xuXG5cdFx0cmV0dXJuIHRoaXMub3B0cy5sYW5ndWFnZTtcblx0fVxuXG5cdC8qKlxuXHQqIENoZWNrIGlmIGxhbmd1YWdlIGlzIHByZXNlbnQgZm9yIHRva2VuaXNpbmcsIGFkZCBpZiBub3QgbG9hZCBpdCBoZXJlIChlLmcuc2NzcywganNvbik7XG5cdCovXG5cdF9jaGVja0xhbmd1YWdlICgpIHtcblx0XHRpZiAodGhpcy5vcHRzLmxhbmd1YWdlICYmICFwcmlzbS5sYW5ndWFnZXMuaGFzT3duUHJvcGVydHkodGhpcy5vcHRzLmxhbmd1YWdlKSkge1xuXHRcdFx0dGhyb3dFcnJvcihgVGhlIGxhbmd1YWdlICR7dGhpcy5vcHRzLmxhbmd1YWdlfSBpcyBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgY29udGFjdCBPcmlnYW1pIGlmIHlvdSB3b3VsZCBsaWtlIHRvIGhhdmUgaXQgYWRkZWQuYCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gKiBGZXRjaCBhbmQgdG9rZW5pc2UgZXZlcnkgPGNvZGU+IHRhZydzIGNvbnRlbnQgdW5kZXIgdGhlIHN5bnRheEVsXG4gKi9cblx0X3Rva2VuaXNlQ29kZUJsb2NrcyAoKSB7XG5cdFx0Y29uc3QgY29kZUJsb2NrcyA9IEFycmF5LmZyb20odGhpcy5zeW50YXhFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1BSRScpKVxuXHRcdFx0LmZpbHRlcihwcmUgPT4gcHJlLmZpcnN0RWxlbWVudENoaWxkICYmIHByZS5maXJzdEVsZW1lbnRDaGlsZC50YWdOYW1lID09PSAnQ09ERScpXG5cdFx0XHQubWFwKHByZSA9PiBwcmUuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG5cdFx0Y29kZUJsb2Nrcy5mb3JFYWNoKHRoaXMuX3Rva2VuaXNlQmxvY2suYmluZCh0aGlzKSk7XG5cdH1cblxuXHQvKipcbiAqIFByZXBhcmVzIHN5bnRheCBmb3IgaGlnaGxpZ2h0aW5nIGJhc2VkIG9uIHRoZSBsYW5ndWFnZSBwcm92aWRlZCBpbiB0aGUgZWxlbWVudCBjbGFzc25hbWUgKGNsYXNzPVwic3ludGF4LWh0bWxcIilcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IC0gVGhlIGh0bWwgZWxlbWVudCB0aGF0IGhvbGRzIHRoZSBzeW50YXggdG8gaGlnaGxpZ2h0XG4gKi9cblx0X3Rva2VuaXNlQmxvY2sgKGVsZW1lbnQpIHtcblx0XHRjb25zdCBsYW5ndWFnZSA9IHRoaXMuX2dldExhbmd1YWdlKGVsZW1lbnQpO1xuXHRcdGlmIChsYW5ndWFnZSkge1xuXHRcdFx0dGhpcy5vcHRzLnN5bnRheFN0cmluZyA9IGVsZW1lbnQuaW5uZXJUZXh0O1xuXHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnRva2VuaXNlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRva2VuaXNlIHN0cmluZyBmb3IgaGlnaGxpZ2h0aW5nXG5cdCBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IHRva2VuaXNlZCBjb2RlIGluIHRoZSBmb3JtIG9mIEhUTUwgZWxlbWVudHNcblx0ICovXG5cdHRva2VuaXNlICgpIHtcblx0XHRyZXR1cm4gcHJpc20uaGlnaGxpZ2h0KHRoaXMub3B0cy5zeW50YXhTdHJpbmcsIHByaXNtLmxhbmd1YWdlc1t0aGlzLm9wdHMubGFuZ3VhZ2VdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIHN5bnRheCBoaWdobGlnaHRpbmcuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbnRpYWxpc2UgYSBtZXNzYWdlIGluLCBvciBhIENTUyBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudFxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBzeW50YXggaGlnaGxpZ2h0aW5nXG5cdCAqXG5cdCAqL1xuXHRzdGF0aWMgaW5pdCAocm9vdEVsLCBvcHRzKSB7XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLXN5bnRheC1oaWdobGlnaHRdJykpIHtcblx0XHRcdHJldHVybiBuZXcgU3ludGF4SGlnaGxpZ2h0KHJvb3RFbCwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1zeW50YXgtaGlnaGxpZ2h0XCJdJyksIHJvb3RFbCA9PiBuZXcgU3ludGF4SGlnaGxpZ2h0KHJvb3RFbCwgb3B0cykpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN5bnRheEhpZ2hsaWdodDtcbiIsIlByaXNtLmxhbmd1YWdlcy5tYXJrdXAgPSB7XG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC88IS0tKD86KD8hPCEtLSlbXFxzXFxTXSkqPy0tPi8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdwcm9sb2cnOiB7XG5cdFx0cGF0dGVybjogLzxcXD9bXFxzXFxTXSs/XFw/Pi8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdkb2N0eXBlJzoge1xuXHRcdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94bWwvI05ULWRvY3R5cGVkZWNsXG5cdFx0cGF0dGVybjogLzwhRE9DVFlQRSg/OltePlwiJ1tcXF1dfFwiW15cIl0qXCJ8J1teJ10qJykrKD86XFxbKD86W148XCInXFxdXXxcIlteXCJdKlwifCdbXiddKid8PCg/ISEtLSl8PCEtLSg/OlteLV18LSg/IS0+KSkqLS0+KSpcXF1cXHMqKT8+L2ksXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J2ludGVybmFsLXN1YnNldCc6IHtcblx0XHRcdFx0cGF0dGVybjogLyheW15cXFtdKlxcWylbXFxzXFxTXSsoPz1cXF0+JCkvLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZTogbnVsbCAvLyBzZWUgYmVsb3dcblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXCJbXlwiXSpcInwnW14nXSonLyxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL148IXw+JHxbW1xcXV0vLFxuXHRcdFx0J2RvY3R5cGUtdGFnJzogL15ET0NUWVBFL2ksXG5cdFx0XHQnbmFtZSc6IC9bXlxcczw+J1wiXSsvXG5cdFx0fVxuXHR9LFxuXHQnY2RhdGEnOiB7XG5cdFx0cGF0dGVybjogLzwhXFxbQ0RBVEFcXFtbXFxzXFxTXSo/XFxdXFxdPi9pLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQndGFnJzoge1xuXHRcdHBhdHRlcm46IC88XFwvPyg/IVxcZClbXlxccz5cXC89JDwlXSsoPzpcXHMoPzpcXHMqW15cXHM+XFwvPV0rKD86XFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpfCg/PVtcXHMvPl0pKSkrKT9cXHMqXFwvPz4vLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0YWcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9ePFxcLz9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9ePFxcLz8vLFxuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3BlY2lhbC1hdHRyJzogW10sXG5cdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0cGF0dGVybjogLz1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKykvLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC9ePS8sXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0L1wifCcvXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcLz8+Lyxcblx0XHRcdCdhdHRyLW5hbWUnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9bXlxccz5cXC9dKy8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCduYW1lc3BhY2UnOiAvXlteXFxzPlxcLzpdKzovXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fSxcblx0J2VudGl0eSc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvJltcXGRhLXpdezEsOH07L2ksXG5cdFx0XHRhbGlhczogJ25hbWVkLWVudGl0eSdcblx0XHR9LFxuXHRcdC8mI3g/W1xcZGEtZl17MSw4fTsvaVxuXHRdXG59O1xuXG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWyd0YWcnXS5pbnNpZGVbJ2F0dHItdmFsdWUnXS5pbnNpZGVbJ2VudGl0eSddID1cblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cFsnZW50aXR5J107XG5QcmlzbS5sYW5ndWFnZXMubWFya3VwWydkb2N0eXBlJ10uaW5zaWRlWydpbnRlcm5hbC1zdWJzZXQnXS5pbnNpZGUgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXG4vLyBQbHVnaW4gdG8gbWFrZSBlbnRpdHkgdGl0bGUgc2hvdyB0aGUgcmVhbCBlbnRpdHksIGlkZWEgYnkgUm9tYW4gS29tYXJvdlxuUHJpc20uaG9va3MuYWRkKCd3cmFwJywgZnVuY3Rpb24gKGVudikge1xuXG5cdGlmIChlbnYudHlwZSA9PT0gJ2VudGl0eScpIHtcblx0XHRlbnYuYXR0cmlidXRlc1sndGl0bGUnXSA9IGVudi5jb250ZW50LnJlcGxhY2UoLyZhbXA7LywgJyYnKTtcblx0fVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZElubGluZWQnLCB7XG5cdC8qKlxuXHQgKiBBZGRzIGFuIGlubGluZWQgbGFuZ3VhZ2UgdG8gbWFya3VwLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYDxzdHlsZT5gIHRhZ3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuXHQgKiBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBhZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblx0ICovXG5cdHZhbHVlOiBmdW5jdGlvbiBhZGRJbmxpbmVkKHRhZ05hbWUsIGxhbmcpIHtcblx0XHR2YXIgaW5jbHVkZWRDZGF0YUluc2lkZSA9IHt9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC8oXjwhXFxbQ0RBVEFcXFspW1xcc1xcU10rPyg/PVxcXVxcXT4kKS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblx0XHRpbmNsdWRlZENkYXRhSW5zaWRlWydjZGF0YSddID0gL148IVxcW0NEQVRBXFxbfFxcXVxcXT4kL2k7XG5cblx0XHR2YXIgaW5zaWRlID0ge1xuXHRcdFx0J2luY2x1ZGVkLWNkYXRhJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9cXF1cXF0+L2ksXG5cdFx0XHRcdGluc2lkZTogaW5jbHVkZWRDZGF0YUluc2lkZVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0aW5zaWRlWydsYW5ndWFnZS0nICsgbGFuZ10gPSB7XG5cdFx0XHRwYXR0ZXJuOiAvW1xcc1xcU10rLyxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0fTtcblxuXHRcdHZhciBkZWYgPSB7fTtcblx0XHRkZWZbdGFnTmFtZV0gPSB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoLyg8X19bXj5dKj4pKD86PCFcXFtDREFUQVxcWyg/OlteXFxdXXxcXF0oPyFcXF0+KSkqXFxdXFxdPnwoPyE8IVxcW0NEQVRBXFxbKVtcXHNcXFNdKSo/KD89PFxcL19fPikvLnNvdXJjZS5yZXBsYWNlKC9fXy9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0YWdOYW1lOyB9KSwgJ2knKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IGluc2lkZVxuXHRcdH07XG5cblx0XHRQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY2RhdGEnLCBkZWYpO1xuXHR9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZywgJ2FkZEF0dHJpYnV0ZScsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gcGF0dGVybiB0byBoaWdobGlnaHQgbGFuZ3VhZ2VzIGVtYmVkZGVkIGluIEhUTUwgYXR0cmlidXRlcy5cblx0ICpcblx0ICogQW4gZXhhbXBsZSBvZiBhbiBpbmxpbmVkIGxhbmd1YWdlIGlzIENTUyB3aXRoIGBzdHlsZWAgYXR0cmlidXRlcy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGF0dHJOYW1lIFRoZSBuYW1lIG9mIHRoZSB0YWcgdGhhdCBjb250YWlucyB0aGUgaW5saW5lZCBsYW5ndWFnZS4gVGhpcyBuYW1lIHdpbGwgYmUgdHJlYXRlZCBhc1xuXHQgKiBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyBUaGUgbGFuZ3VhZ2Uga2V5LlxuXHQgKiBAZXhhbXBsZVxuXHQgKiBhZGRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIChhdHRyTmFtZSwgbGFuZykge1xuXHRcdFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmluc2lkZVsnc3BlY2lhbC1hdHRyJ10ucHVzaCh7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoXG5cdFx0XHRcdC8oXnxbXCInXFxzXSkvLnNvdXJjZSArICcoPzonICsgYXR0ck5hbWUgKyAnKScgKyAvXFxzKj1cXHMqKD86XCJbXlwiXSpcInwnW14nXSonfFteXFxzJ1wiPj1dKyg/PVtcXHM+XSkpLy5zb3VyY2UsXG5cdFx0XHRcdCdpJ1xuXHRcdFx0KSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2F0dHItbmFtZSc6IC9eW15cXHM9XSsvLFxuXHRcdFx0XHQnYXR0ci12YWx1ZSc6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvPVtcXHNcXFNdKy8sXG5cdFx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0XHQndmFsdWUnOiB7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC8oXj1cXHMqKFtcIiddfCg/IVtcIiddKSkpXFxTW1xcc1xcU10qKD89XFwyJCkvLFxuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRhbGlhczogW2xhbmcsICdsYW5ndWFnZS0nICsgbGFuZ10sXG5cdFx0XHRcdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzW2xhbmddXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0XHRhbGlhczogJ2F0dHItZXF1YWxzJ1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHQvXCJ8Jy9cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5odG1sID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblByaXNtLmxhbmd1YWdlcy5tYXRobWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLnN2ZyA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cblByaXNtLmxhbmd1YWdlcy54bWwgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdtYXJrdXAnLCB7fSk7XG5QcmlzbS5sYW5ndWFnZXMuc3NtbCA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMuYXRvbSA9IFByaXNtLmxhbmd1YWdlcy54bWw7XG5QcmlzbS5sYW5ndWFnZXMucnNzID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcbiIsIihmdW5jdGlvbiAoUHJpc20pIHtcblxuXHR2YXIgc3RyaW5nID0gLyg/OlwiKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8W15cIlxcXFxcXHJcXG5dKSpcInwnKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8W14nXFxcXFxcclxcbl0pKicpLztcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzID0ge1xuXHRcdCdjb21tZW50JzogL1xcL1xcKltcXHNcXFNdKj9cXCpcXC8vLFxuXHRcdCdhdHJ1bGUnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvQFtcXHctXSg/OlteO3tcXHNdfFxccysoPyFbXFxze10pKSooPzo7fCg/PVxccypcXHspKS8sXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J3J1bGUnOiAvXkBbXFx3LV0rLyxcblx0XHRcdFx0J3NlbGVjdG9yLWZ1bmN0aW9uLWFyZ3VtZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXFxic2VsZWN0b3JcXHMqXFwoXFxzKig/IVtcXHMpXSkpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoKD86W14oKV18XFwoW14oKV0qXFwpKSpcXCkpKyg/PVxccypcXCkpLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdGFsaWFzOiAnc2VsZWN0b3InXG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdrZXl3b3JkJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC8oXnxbXlxcdy1dKSg/OmFuZHxub3R8b25seXxvcikoPyFbXFx3LV0pLyxcblx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gU2VlIHJlc3QgYmVsb3dcblx0XHRcdH1cblx0XHR9LFxuXHRcdCd1cmwnOiB7XG5cdFx0XHQvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ1xcXFxidXJsXFxcXCgoPzonICsgc3RyaW5nLnNvdXJjZSArICd8JyArIC8oPzpbXlxcXFxcXHJcXG4oKVwiJ118XFxcXFtcXHNcXFNdKSovLnNvdXJjZSArICcpXFxcXCknLCAnaScpLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdCdmdW5jdGlvbic6IC9edXJsL2ksXG5cdFx0XHRcdCdwdW5jdHVhdGlvbic6IC9eXFwofFxcKSQvLFxuXHRcdFx0XHQnc3RyaW5nJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXicgKyBzdHJpbmcuc291cmNlICsgJyQnKSxcblx0XHRcdFx0XHRhbGlhczogJ3VybCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3NlbGVjdG9yJzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCcoXnxbe31cXFxcc10pW157fVxcXFxzXSg/Oltee307XCJcXCdcXFxcc118XFxcXHMrKD8hW1xcXFxze10pfCcgKyBzdHJpbmcuc291cmNlICsgJykqKD89XFxcXHMqXFxcXHspJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQnc3RyaW5nJzoge1xuXHRcdFx0cGF0dGVybjogc3RyaW5nLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fSxcblx0XHQncHJvcGVydHknOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14tXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVstX2EtelxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVstXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxccyo6KS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J2ltcG9ydGFudCc6IC8haW1wb3J0YW50XFxiL2ksXG5cdFx0J2Z1bmN0aW9uJzoge1xuXHRcdFx0cGF0dGVybjogLyhefFteLWEtejAtOV0pWy1hLXowLTldKyg/PVxcKCkvaSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdwdW5jdHVhdGlvbic6IC9bKCl7fTs6LF0vXG5cdH07XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmNzc1snYXRydWxlJ10uaW5zaWRlLnJlc3QgPSBQcmlzbS5sYW5ndWFnZXMuY3NzO1xuXG5cdHZhciBtYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuXHRpZiAobWFya3VwKSB7XG5cdFx0bWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzdHlsZScsICdjc3MnKTtcblx0XHRtYXJrdXAudGFnLmFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG5cdH1cblxufShQcmlzbSkpO1xuIiwiUHJpc20ubGFuZ3VhZ2VzLmNsaWtlID0ge1xuXHQnY29tbWVudCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFw6XSlcXC9cXC8uKi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQnc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC8oW1wiJ10pKD86XFxcXCg/OlxcclxcbnxbXFxzXFxTXSl8KD8hXFwxKVteXFxcXFxcclxcbl0pKlxcMS8sXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdjbGFzcy1uYW1lJzoge1xuXHRcdHBhdHRlcm46IC8oXFxiKD86Y2xhc3N8aW50ZXJmYWNlfGV4dGVuZHN8aW1wbGVtZW50c3x0cmFpdHxpbnN0YW5jZW9mfG5ldylcXHMrfFxcYmNhdGNoXFxzK1xcKClbXFx3LlxcXFxdKy9pLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncHVuY3R1YXRpb24nOiAvWy5cXFxcXS9cblx0XHR9XG5cdH0sXG5cdCdrZXl3b3JkJzogL1xcYig/OmlmfGVsc2V8d2hpbGV8ZG98Zm9yfHJldHVybnxpbnxpbnN0YW5jZW9mfGZ1bmN0aW9ufG5ld3x0cnl8dGhyb3d8Y2F0Y2h8ZmluYWxseXxudWxsfGJyZWFrfGNvbnRpbnVlKVxcYi8sXG5cdCdib29sZWFuJzogL1xcYig/OnRydWV8ZmFsc2UpXFxiLyxcblx0J2Z1bmN0aW9uJzogL1xcYlxcdysoPz1cXCgpLyxcblx0J251bWJlcic6IC9cXGIweFtcXGRhLWZdK1xcYnwoPzpcXGJcXGQrKD86XFwuXFxkKik/fFxcQlxcLlxcZCspKD86ZVsrLV0/XFxkKyk/L2ksXG5cdCdvcGVyYXRvcic6IC9bPD5dPT98WyE9XT0/PT98LS0/fFxcK1xcKz98JiY/fFxcfFxcfD98Wz8qL35eJV0vLFxuXHQncHVuY3R1YXRpb24nOiAvW3t9W1xcXTsoKSwuOl0vXG59O1xuIiwiUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjbGlrZScsIHtcblx0J2NsYXNzLW5hbWUnOiBbXG5cdFx0UHJpc20ubGFuZ3VhZ2VzLmNsaWtlWydjbGFzcy1uYW1lJ10sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteJFxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbXyRBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXC4oPzpwcm90b3R5cGV8Y29uc3RydWN0b3IpKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fVxuXHRdLFxuXHQna2V5d29yZCc6IFtcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCg/Ol58XFx9KVxccyopY2F0Y2hcXGIvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteLl18XFwuXFwuXFwuXFxzKilcXGIoPzphc3xhc3NlcnQoPz1cXHMqXFx7KXxhc3luYyg/PVxccyooPzpmdW5jdGlvblxcYnxcXCh8WyRcXHdcXHhBMC1cXHVGRkZGXXwkKSl8YXdhaXR8YnJlYWt8Y2FzZXxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseSg/PVxccyooPzpcXHt8JCkpfGZvcnxmcm9tKD89XFxzKig/OlsnXCJdfCQpKXxmdW5jdGlvbnwoPzpnZXR8c2V0KSg/PVxccyooPzpbI1xcWyRcXHdcXHhBMC1cXHVGRkZGXXwkKSl8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZClcXGIvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdF0sXG5cdC8vIEFsbG93IGZvciBhbGwgbm9uLUFTQ0lJIGNoYXJhY3RlcnMgKFNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMDA4NDQ0KVxuXHQnZnVuY3Rpb24nOiAvIz8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKig/OlxcLlxccyooPzphcHBseXxiaW5kfGNhbGwpXFxzKik/XFwoKS8sXG5cdCdudW1iZXInOiAvXFxiKD86KD86MFt4WF0oPzpbXFxkQS1GYS1mXSg/Ol9bXFxkQS1GYS1mXSk/KSt8MFtiQl0oPzpbMDFdKD86X1swMV0pPykrfDBbb09dKD86WzAtN10oPzpfWzAtN10pPykrKW4/fCg/OlxcZCg/Ol9cXGQpPykrbnxOYU58SW5maW5pdHkpXFxifCg/OlxcYig/OlxcZCg/Ol9cXGQpPykrXFwuPyg/OlxcZCg/Ol9cXGQpPykqfFxcQlxcLig/OlxcZCg/Ol9cXGQpPykrKSg/OltFZV1bKy1dPyg/OlxcZCg/Ol9cXGQpPykrKT8vLFxuXHQnb3BlcmF0b3InOiAvLS18XFwrXFwrfFxcKlxcKj0/fD0+fCYmPT98XFx8XFx8PT98WyE9XT09fDw8PT98Pj4+Pz0/fFstKyovJSZ8XiE9PD5dPT98XFwuezN9fFxcP1xcPz0/fFxcP1xcLj98W346XS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFsnY2xhc3MtbmFtZSddWzBdLnBhdHRlcm4gPSAvKFxcYig/OmNsYXNzfGludGVyZmFjZXxleHRlbmRzfGltcGxlbWVudHN8aW5zdGFuY2VvZnxuZXcpXFxzKylbXFx3LlxcXFxdKy87XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAna2V5d29yZCcsIHtcblx0J3JlZ2V4Jzoge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tZHVwZS1jaGFyYWN0ZXJzLWNoYXJhY3Rlci1jbGFzc1xuXHRcdHBhdHRlcm46IC8oKD86XnxbXiRcXHdcXHhBMC1cXHVGRkZGLlwiJ1xcXSlcXHNdfFxcYig/OnJldHVybnx5aWVsZCkpXFxzKilcXC8oPzpcXFsoPzpbXlxcXVxcXFxcXHJcXG5dfFxcXFwuKSpcXF18XFxcXC58W14vXFxcXFxcW1xcclxcbl0pK1xcL1tkZ2lteXVzXXswLDd9KD89KD86XFxzfFxcL1xcKig/OlteKl18XFwqKD8hXFwvKSkqXFwqXFwvKSooPzokfFtcXHJcXG4sLjs6fSlcXF1dfFxcL1xcLykpLyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdyZWdleC1zb3VyY2UnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9eKFxcLylbXFxzXFxTXSsoPz1cXC9bYS16XSokKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGFsaWFzOiAnbGFuZ3VhZ2UtcmVnZXgnLFxuXHRcdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5yZWdleFxuXHRcdFx0fSxcblx0XHRcdCdyZWdleC1kZWxpbWl0ZXInOiAvXlxcL3xcXC8kLyxcblx0XHRcdCdyZWdleC1mbGFncyc6IC9eW2Etel0rJC8sXG5cdFx0fVxuXHR9LFxuXHQvLyBUaGlzIG11c3QgYmUgZGVjbGFyZWQgYmVmb3JlIGtleXdvcmQgYmVjYXVzZSB3ZSB1c2UgXCJmdW5jdGlvblwiIGluc2lkZSB0aGUgbG9vay1mb3J3YXJkXG5cdCdmdW5jdGlvbi12YXJpYWJsZSc6IHtcblx0XHRwYXR0ZXJuOiAvIz8oPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKls9Ol1cXHMqKD86YXN5bmNcXHMqKT8oPzpcXGJmdW5jdGlvblxcYnwoPzpcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKXwoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKVxccyo9PikpLyxcblx0XHRhbGlhczogJ2Z1bmN0aW9uJ1xuXHR9LFxuXHQncGFyYW1ldGVyJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oZnVuY3Rpb24oPzpcXHMrKD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKik/XFxzKlxcKFxccyopKD8hXFxzKSg/OlteKClcXHNdfFxccysoPyFbXFxzKV0pfFxcKFteKCldKlxcKSkrKD89XFxzKlxcKSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXiRcXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpW18kYS16XFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKj0+KS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9LFxuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpXFxzKj0+KS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLygoPzpcXGJ8XFxzfF4pKD8hKD86YXN8YXN5bmN8YXdhaXR8YnJlYWt8Y2FzZXxjYXRjaHxjbGFzc3xjb25zdHxjb250aW51ZXxkZWJ1Z2dlcnxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGVudW18ZXhwb3J0fGV4dGVuZHN8ZmluYWxseXxmb3J8ZnJvbXxmdW5jdGlvbnxnZXR8aWZ8aW1wbGVtZW50c3xpbXBvcnR8aW58aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGV0fG5ld3xudWxsfG9mfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHJldHVybnxzZXR8c3RhdGljfHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRyeXx0eXBlb2Z8dW5kZWZpbmVkfHZhcnx2b2lkfHdoaWxlfHdpdGh8eWllbGQpKD8hWyRcXHdcXHhBMC1cXHVGRkZGXSkpKD86KD8hXFxzKVtfJGEtekEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKlxccyopXFwoXFxzKnxcXF1cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpXFxzKlxceykvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHR9XG5cdF0sXG5cdCdjb25zdGFudCc6IC9cXGJbQS1aXSg/OltBLVpfXXxcXGR4PykqXFxiL1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ2phdmFzY3JpcHQnLCAnc3RyaW5nJywge1xuXHQnaGFzaGJhbmcnOiB7XG5cdFx0cGF0dGVybjogL14jIS4qLyxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0YWxpYXM6ICdjb21tZW50J1xuXHR9LFxuXHQndGVtcGxhdGUtc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC9gKD86XFxcXFtcXHNcXFNdfFxcJFxceyg/Oltee31dfFxceyg/Oltee31dfFxce1tefV0qXFx9KSpcXH0pK1xcfXwoPyFcXCRcXHspW15cXFxcYF0pKmAvLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd0ZW1wbGF0ZS1wdW5jdHVhdGlvbic6IHtcblx0XHRcdFx0cGF0dGVybjogL15gfGAkLyxcblx0XHRcdFx0YWxpYXM6ICdzdHJpbmcnXG5cdFx0XHR9LFxuXHRcdFx0J2ludGVycG9sYXRpb24nOiB7XG5cdFx0XHRcdHBhdHRlcm46IC8oKD86XnxbXlxcXFxdKSg/OlxcXFx7Mn0pKilcXCRcXHsoPzpbXnt9XXxcXHsoPzpbXnt9XXxcXHtbXn1dKlxcfSkqXFx9KStcXH0vLFxuXHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnaW50ZXJwb2xhdGlvbi1wdW5jdHVhdGlvbic6IHtcblx0XHRcdFx0XHRcdHBhdHRlcm46IC9eXFwkXFx7fFxcfSQvLFxuXHRcdFx0XHRcdFx0YWxpYXM6ICdwdW5jdHVhdGlvbidcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlc3Q6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnc3RyaW5nJzogL1tcXHNcXFNdKy9cblx0XHR9XG5cdH1cbn0pO1xuXG5pZiAoUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCkge1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRJbmxpbmVkKCdzY3JpcHQnLCAnamF2YXNjcmlwdCcpO1xuXG5cdC8vIGFkZCBhdHRyaWJ1dGUgc3VwcG9ydCBmb3IgYWxsIERPTSBldmVudHMuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0V2ZW50cyNTdGFuZGFyZF9ldmVudHNcblx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuYWRkQXR0cmlidXRlKFxuXHRcdC9vbig/OmFib3J0fGJsdXJ8Y2hhbmdlfGNsaWNrfGNvbXBvc2l0aW9uKD86ZW5kfHN0YXJ0fHVwZGF0ZSl8ZGJsY2xpY2t8ZXJyb3J8Zm9jdXMoPzppbnxvdXQpP3xrZXkoPzpkb3dufHVwKXxsb2FkfG1vdXNlKD86ZG93bnxlbnRlcnxsZWF2ZXxtb3ZlfG91dHxvdmVyfHVwKXxyZXNldHxyZXNpemV8c2Nyb2xsfHNlbGVjdHxzbG90Y2hhbmdlfHN1Ym1pdHx1bmxvYWR8d2hlZWwpLy5zb3VyY2UsXG5cdFx0J2phdmFzY3JpcHQnXG5cdCk7XG59XG5cblByaXNtLmxhbmd1YWdlcy5qcyA9IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0O1xuIiwiKGZ1bmN0aW9uIChQcmlzbSkge1xuXHQvLyAkIHNldCB8IGdyZXAgJ15bQS1aXVteWzpzcGFjZTpdXSo9JyB8IGN1dCAtZD0gLWYxIHwgdHIgJ1xcbicgJ3wnXG5cdC8vICsgTENfQUxMLCBSQU5ET00sIFJFUExZLCBTRUNPTkRTLlxuXHQvLyArIG1ha2Ugc3VyZSBQUzEuLjQgYXJlIGhlcmUgYXMgdGhleSBhcmUgbm90IGFsd2F5cyBzZXQsXG5cdC8vIC0gc29tZSB1c2VsZXNzIHRoaW5ncy5cblx0dmFyIGVudlZhcnMgPSAnXFxcXGIoPzpCQVNIfEJBU0hPUFRTfEJBU0hfQUxJQVNFU3xCQVNIX0FSR0N8QkFTSF9BUkdWfEJBU0hfQ01EU3xCQVNIX0NPTVBMRVRJT05fQ09NUEFUX0RJUnxCQVNIX0xJTkVOT3xCQVNIX1JFTUFUQ0h8QkFTSF9TT1VSQ0V8QkFTSF9WRVJTSU5GT3xCQVNIX1ZFUlNJT058Q09MT1JURVJNfENPTFVNTlN8Q09NUF9XT1JEQlJFQUtTfERCVVNfU0VTU0lPTl9CVVNfQUREUkVTU3xERUZBVUxUU19QQVRIfERFU0tUT1BfU0VTU0lPTnxESVJTVEFDS3xESVNQTEFZfEVVSUR8R0RNU0VTU0lPTnxHRE1fTEFOR3xHTk9NRV9LRVlSSU5HX0NPTlRST0x8R05PTUVfS0VZUklOR19QSUR8R1BHX0FHRU5UX0lORk98R1JPVVBTfEhJU1RDT05UUk9MfEhJU1RGSUxFfEhJU1RGSUxFU0laRXxISVNUU0laRXxIT01FfEhPU1ROQU1FfEhPU1RUWVBFfElGU3xJTlNUQU5DRXxKT0J8TEFOR3xMQU5HVUFHRXxMQ19BRERSRVNTfExDX0FMTHxMQ19JREVOVElGSUNBVElPTnxMQ19NRUFTVVJFTUVOVHxMQ19NT05FVEFSWXxMQ19OQU1FfExDX05VTUVSSUN8TENfUEFQRVJ8TENfVEVMRVBIT05FfExDX1RJTUV8TEVTU0NMT1NFfExFU1NPUEVOfExJTkVTfExPR05BTUV8TFNfQ09MT1JTfE1BQ0hUWVBFfE1BSUxDSEVDS3xNQU5EQVRPUllfUEFUSHxOT19BVF9CUklER0V8T0xEUFdEfE9QVEVSUnxPUFRJTkR8T1JCSVRfU09DS0VURElSfE9TVFlQRXxQQVBFUlNJWkV8UEFUSHxQSVBFU1RBVFVTfFBQSUR8UFMxfFBTMnxQUzN8UFM0fFBXRHxSQU5ET018UkVQTFl8U0VDT05EU3xTRUxJTlVYX0lOSVR8U0VTU0lPTnxTRVNTSU9OVFlQRXxTRVNTSU9OX01BTkFHRVJ8U0hFTEx8U0hFTExPUFRTfFNITFZMfFNTSF9BVVRIX1NPQ0t8VEVSTXxVSUR8VVBTVEFSVF9FVkVOVFN8VVBTVEFSVF9JTlNUQU5DRXxVUFNUQVJUX0pPQnxVUFNUQVJUX1NFU1NJT058VVNFUnxXSU5ET1dJRHxYQVVUSE9SSVRZfFhER19DT05GSUdfRElSU3xYREdfQ1VSUkVOVF9ERVNLVE9QfFhER19EQVRBX0RJUlN8WERHX0dSRUVURVJfREFUQV9ESVJ8WERHX01FTlVfUFJFRklYfFhER19SVU5USU1FX0RJUnxYREdfU0VBVHxYREdfU0VBVF9QQVRIfFhER19TRVNTSU9OX0RFU0tUT1B8WERHX1NFU1NJT05fSUR8WERHX1NFU1NJT05fUEFUSHxYREdfU0VTU0lPTl9UWVBFfFhER19WVE5SfFhNT0RJRklFUlMpXFxcXGInO1xuXG5cdHZhciBjb21tYW5kQWZ0ZXJIZXJlZG9jID0ge1xuXHRcdHBhdHRlcm46IC8oXihbXCInXT8pXFx3K1xcMilbIFxcdF0rXFxTLiovLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0YWxpYXM6ICdwdW5jdHVhdGlvbicsIC8vIHRoaXMgbG9va3MgcmVhc29uYWJseSB3ZWxsIGluIGFsbCB0aGVtZXNcblx0XHRpbnNpZGU6IG51bGwgLy8gc2VlIGJlbG93XG5cdH07XG5cblx0dmFyIGluc2lkZVN0cmluZyA9IHtcblx0XHQnYmFzaCc6IGNvbW1hbmRBZnRlckhlcmVkb2MsXG5cdFx0J2Vudmlyb25tZW50Jzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCdcXFxcJCcgKyBlbnZWYXJzKSxcblx0XHRcdGFsaWFzOiAnY29uc3RhbnQnXG5cdFx0fSxcblx0XHQndmFyaWFibGUnOiBbXG5cdFx0XHQvLyBbMF06IEFyaXRobWV0aWMgRW52aXJvbm1lbnRcblx0XHRcdHtcblx0XHRcdFx0cGF0dGVybjogL1xcJD9cXChcXChbXFxzXFxTXSs/XFwpXFwpLyxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBhICQgc2lnbiBhdCB0aGUgYmVnaW5uaW5nIGhpZ2hsaWdodCAkKCggYW5kICkpIGFzIHZhcmlhYmxlXG5cdFx0XHRcdFx0J3ZhcmlhYmxlJzogW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvKF5cXCRcXChcXChbXFxzXFxTXSspXFwpXFwpLyxcblx0XHRcdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdC9eXFwkXFwoXFwoL1xuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0J251bWJlcic6IC9cXGIweFtcXGRBLUZhLWZdK1xcYnwoPzpcXGJcXGQrKD86XFwuXFxkKik/fFxcQlxcLlxcZCspKD86W0VlXS0/XFxkKyk/Lyxcblx0XHRcdFx0XHQvLyBPcGVyYXRvcnMgYWNjb3JkaW5nIHRvIGh0dHBzOi8vd3d3LmdudS5vcmcvc29mdHdhcmUvYmFzaC9tYW51YWwvYmFzaHJlZi5odG1sI1NoZWxsLUFyaXRobWV0aWNcblx0XHRcdFx0XHQnb3BlcmF0b3InOiAvLS18XFwrXFwrfFxcKlxcKj0/fDw8PT98Pj49P3wmJnxcXHxcXHx8Wz0hK1xcLSovJTw+XiZ8XT0/fFs/fjpdLyxcblx0XHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBubyAkIHNpZ24gYXQgdGhlIGJlZ2lubmluZyBoaWdobGlnaHQgKCggYW5kICkpIGFzIHB1bmN0dWF0aW9uXG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL1xcKFxcKD98XFwpXFwpP3wsfDsvXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQvLyBbMV06IENvbW1hbmQgU3Vic3RpdHV0aW9uXG5cdFx0XHR7XG5cdFx0XHRcdHBhdHRlcm46IC9cXCRcXCgoPzpcXChbXildK1xcKXxbXigpXSkrXFwpfGBbXmBdK2AvLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCd2YXJpYWJsZSc6IC9eXFwkXFwofF5gfFxcKSR8YCQvXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQvLyBbMl06IEJyYWNlIGV4cGFuc2lvblxuXHRcdFx0e1xuXHRcdFx0XHRwYXR0ZXJuOiAvXFwkXFx7W159XStcXH0vLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdvcGVyYXRvcic6IC86Wy09PytdP3xbIVxcL118IyM/fCUlP3xcXF5cXF4/fCwsPy8sXG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL1tcXFtcXF1dLyxcblx0XHRcdFx0XHQnZW52aXJvbm1lbnQnOiB7XG5cdFx0XHRcdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJyhcXFxceyknICsgZW52VmFycyksXG5cdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0XHRcdFx0YWxpYXM6ICdjb25zdGFudCdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQvXFwkKD86XFx3K3xbIz8qIUAkXSkvXG5cdFx0XSxcblx0XHQvLyBFc2NhcGUgc2VxdWVuY2VzIGZyb20gZWNobyBhbmQgcHJpbnRmJ3MgbWFudWFscywgYW5kIGVzY2FwZWQgcXVvdGVzLlxuXHRcdCdlbnRpdHknOiAvXFxcXCg/OlthYmNlRWZucnR2XFxcXFwiXXxPP1swLTddezEsM318eFswLTlhLWZBLUZdezEsMn18dVswLTlhLWZBLUZdezR9fFVbMC05YS1mQS1GXXs4fSkvXG5cdH07XG5cblx0UHJpc20ubGFuZ3VhZ2VzLmJhc2ggPSB7XG5cdFx0J3NoZWJhbmcnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvXiMhXFxzKlxcLy4qLyxcblx0XHRcdGFsaWFzOiAnaW1wb3J0YW50J1xuXHRcdH0sXG5cdFx0J2NvbW1lbnQnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W15cIntcXFxcJF0pIy4qLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdmdW5jdGlvbi1uYW1lJzogW1xuXHRcdFx0Ly8gYSkgZnVuY3Rpb24gZm9vIHtcblx0XHRcdC8vIGIpIGZvbygpIHtcblx0XHRcdC8vIGMpIGZ1bmN0aW9uIGZvbygpIHtcblx0XHRcdC8vIGJ1dCBub3Qg4oCcZm9vIHvigJ1cblx0XHRcdHtcblx0XHRcdFx0Ly8gYSkgYW5kIGMpXG5cdFx0XHRcdHBhdHRlcm46IC8oXFxiZnVuY3Rpb25cXHMrKVtcXHctXSsoPz0oPzpcXHMqXFwoPzpcXHMqXFwpKT9cXHMqXFx7KS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGFsaWFzOiAnZnVuY3Rpb24nXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQvLyBiKVxuXHRcdFx0XHRwYXR0ZXJuOiAvXFxiW1xcdy1dKyg/PVxccypcXChcXHMqXFwpXFxzKlxceykvLFxuXHRcdFx0XHRhbGlhczogJ2Z1bmN0aW9uJ1xuXHRcdFx0fVxuXHRcdF0sXG5cdFx0Ly8gSGlnaGxpZ2h0IHZhcmlhYmxlIG5hbWVzIGFzIHZhcmlhYmxlcyBpbiBmb3IgYW5kIHNlbGVjdCBiZWdpbm5pbmdzLlxuXHRcdCdmb3Itb3Itc2VsZWN0Jzoge1xuXHRcdFx0cGF0dGVybjogLyhcXGIoPzpmb3J8c2VsZWN0KVxccyspXFx3Kyg/PVxccytpblxccykvLFxuXHRcdFx0YWxpYXM6ICd2YXJpYWJsZScsXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQvLyBIaWdobGlnaHQgdmFyaWFibGUgbmFtZXMgYXMgdmFyaWFibGVzIGluIHRoZSBsZWZ0LWhhbmQgcGFydFxuXHRcdC8vIG9mIGFzc2lnbm1lbnRzICjigJw94oCdIGFuZCDigJwrPeKAnSkuXG5cdFx0J2Fzc2lnbi1sZWZ0Jzoge1xuXHRcdFx0cGF0dGVybjogLyhefFtcXHM7fCZdfFs8Pl1cXCgpXFx3Kyg/PVxcKz89KS8sXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2Vudmlyb25tZW50Jzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnKF58W1xcXFxzO3wmXXxbPD5dXFxcXCgpJyArIGVudlZhcnMpLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0YWxpYXM6ICdjb25zdGFudCdcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGFsaWFzOiAndmFyaWFibGUnLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J3N0cmluZyc6IFtcblx0XHRcdC8vIFN1cHBvcnQgZm9yIEhlcmUtZG9jdW1lbnRzIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hlcmVfZG9jdW1lbnRcblx0XHRcdHtcblx0XHRcdFx0cGF0dGVybjogLygoPzpefFtePF0pPDwtP1xccyopKFxcdyspXFxzW1xcc1xcU10qPyg/Olxccj9cXG58XFxyKVxcMi8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiBpbnNpZGVTdHJpbmdcblx0XHRcdH0sXG5cdFx0XHQvLyBIZXJlLWRvY3VtZW50IHdpdGggcXVvdGVzIGFyb3VuZCB0aGUgdGFnXG5cdFx0XHQvLyDihpIgTm8gZXhwYW5zaW9uIChzbyBubyDigJxpbnNpZGXigJ0pLlxuXHRcdFx0e1xuXHRcdFx0XHRwYXR0ZXJuOiAvKCg/Ol58W148XSk8PC0/XFxzKikoW1wiJ10pKFxcdyspXFwyXFxzW1xcc1xcU10qPyg/Olxccj9cXG58XFxyKVxcMy8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J2Jhc2gnOiBjb21tYW5kQWZ0ZXJIZXJlZG9jXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQvLyDigJxOb3JtYWzigJ0gc3RyaW5nXG5cdFx0XHR7XG5cdFx0XHRcdC8vIGh0dHBzOi8vd3d3LmdudS5vcmcvc29mdHdhcmUvYmFzaC9tYW51YWwvaHRtbF9ub2RlL0RvdWJsZS1RdW90ZXMuaHRtbFxuXHRcdFx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSg/OlxcXFxcXFxcKSopXCIoPzpcXFxcW1xcc1xcU118XFwkXFwoW14pXStcXCl8XFwkKD8hXFwoKXxgW15gXStgfFteXCJcXFxcYCRdKSpcIi8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiBpbnNpZGVTdHJpbmdcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdC8vIGh0dHBzOi8vd3d3LmdudS5vcmcvc29mdHdhcmUvYmFzaC9tYW51YWwvaHRtbF9ub2RlL1NpbmdsZS1RdW90ZXMuaHRtbFxuXHRcdFx0XHRwYXR0ZXJuOiAvKF58W14kXFxcXF0pJ1teJ10qJy8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0Ly8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9odG1sX25vZGUvQU5TSV8wMDJkQy1RdW90aW5nLmh0bWxcblx0XHRcdFx0cGF0dGVybjogL1xcJCcoPzpbXidcXFxcXXxcXFxcW1xcc1xcU10pKicvLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdlbnRpdHknOiBpbnNpZGVTdHJpbmcuZW50aXR5XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRdLFxuXHRcdCdlbnZpcm9ubWVudCc6IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXFxcXCQ/JyArIGVudlZhcnMpLFxuXHRcdFx0YWxpYXM6ICdjb25zdGFudCdcblx0XHR9LFxuXHRcdCd2YXJpYWJsZSc6IGluc2lkZVN0cmluZy52YXJpYWJsZSxcblx0XHQnZnVuY3Rpb24nOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W1xcczt8Jl18Wzw+XVxcKCkoPzphZGR8YXByb3Bvc3xhcHR8YXB0aXR1ZGV8YXB0LWNhY2hlfGFwdC1nZXR8YXNwZWxsfGF1dG9teXNxbGJhY2t1cHxhd2t8YmFzZW5hbWV8YmFzaHxiY3xiY29uc29sZXxiZ3xiemlwMnxjYWx8Y2F0fGNmZGlza3xjaGdycHxjaGtjb25maWd8Y2htb2R8Y2hvd258Y2hyb290fGNrc3VtfGNsZWFyfGNtcHxjb2x1bW58Y29tbXxjb21wb3NlcnxjcHxjcm9ufGNyb250YWJ8Y3NwbGl0fGN1cmx8Y3V0fGRhdGV8ZGN8ZGR8ZGRyZXNjdWV8ZGVib290c3RyYXB8ZGZ8ZGlmZnxkaWZmM3xkaWd8ZGlyfGRpcmNvbG9yc3xkaXJuYW1lfGRpcnN8ZG1lc2d8ZHV8ZWdyZXB8ZWplY3R8ZW52fGV0aHRvb2x8ZXhwYW5kfGV4cGVjdHxleHByfGZkZm9ybWF0fGZkaXNrfGZnfGZncmVwfGZpbGV8ZmluZHxmbXR8Zm9sZHxmb3JtYXR8ZnJlZXxmc2NrfGZ0cHxmdXNlcnxnYXdrfGdpdHxncGFydGVkfGdyZXB8Z3JvdXBhZGR8Z3JvdXBkZWx8Z3JvdXBtb2R8Z3JvdXBzfGdydWItbWtjb25maWd8Z3ppcHxoYWx0fGhlYWR8aGd8aGlzdG9yeXxob3N0fGhvc3RuYW1lfGh0b3B8aWNvbnZ8aWR8aWZjb25maWd8aWZkb3dufGlmdXB8aW1wb3J0fGluc3RhbGx8aXB8am9ic3xqb2lufGtpbGx8a2lsbGFsbHxsZXNzfGxpbmt8bG58bG9jYXRlfGxvZ25hbWV8bG9ncm90YXRlfGxvb2t8bHBjfGxwcnxscHJpbnR8bHByaW50ZHxscHJpbnRxfGxwcm18bHN8bHNvZnxseW54fG1ha2V8bWFufG1jfG1kYWRtfG1rY29uZmlnfG1rZGlyfG1rZTJmc3xta2ZpZm98bWtmc3xta2lzb2ZzfG1rbm9kfG1rc3dhcHxtbXZ8bW9yZXxtb3N0fG1vdW50fG10b29sc3xtdHJ8bXV0dHxtdnxuYW5vfG5jfG5ldHN0YXR8bmljZXxubHxub2h1cHxub3RpZnktc2VuZHxucG18bnNsb29rdXB8b3B8b3BlbnxwYXJ0ZWR8cGFzc3dkfHBhc3RlfHBhdGhjaGt8cGluZ3xwa2lsbHxwbnBtfHBvcGR8cHJ8cHJpbnRjYXB8cHJpbnRlbnZ8cHN8cHVzaGR8cHZ8cXVvdGF8cXVvdGFjaGVja3xxdW90YWN0bHxyYW18cmFyfHJjcHxyZWJvb3R8cmVtc3luY3xyZW5hbWV8cmVuaWNlfHJldnxybXxybWRpcnxycG18cnN5bmN8c2NwfHNjcmVlbnxzZGlmZnxzZWR8c2VuZG1haWx8c2VxfHNlcnZpY2V8c2Z0cHxzaHxzaGVsbGNoZWNrfHNodWZ8c2h1dGRvd258c2xlZXB8c2xvY2F0ZXxzb3J0fHNwbGl0fHNzaHxzdGF0fHN0cmFjZXxzdXxzdWRvfHN1bXxzdXNwZW5kfHN3YXBvbnxzeW5jfHRhY3x0YWlsfHRhcnx0ZWV8dGltZXx0aW1lb3V0fHRvcHx0b3VjaHx0cnx0cmFjZXJvdXRlfHRzb3J0fHR0eXx1bW91bnR8dW5hbWV8dW5leHBhbmR8dW5pcXx1bml0c3x1bnJhcnx1bnNoYXJ8dW56aXB8dXBkYXRlLWdydWJ8dXB0aW1lfHVzZXJhZGR8dXNlcmRlbHx1c2VybW9kfHVzZXJzfHV1ZGVjb2RlfHV1ZW5jb2RlfHZ8dmRpcnx2aXx2aW18dmlyc2h8dm1zdGF0fHdhaXR8d2F0Y2h8d2N8d2dldHx3aGVyZWlzfHdoaWNofHdob3x3aG9hbWl8d3JpdGV8eGFyZ3N8eGRnLW9wZW58eWFybnx5ZXN8emVuaXR5fHppcHx6c2h8enlwcGVyKSg/PSR8WylcXHM7fCZdKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQna2V5d29yZCc6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXFxzO3wmXXxbPD5dXFwoKSg/OmlmfHRoZW58ZWxzZXxlbGlmfGZpfGZvcnx3aGlsZXxpbnxjYXNlfGVzYWN8ZnVuY3Rpb258c2VsZWN0fGRvfGRvbmV8dW50aWwpKD89JHxbKVxcczt8Jl0pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdC8vIGh0dHBzOi8vd3d3LmdudS5vcmcvc29mdHdhcmUvYmFzaC9tYW51YWwvaHRtbF9ub2RlL1NoZWxsLUJ1aWx0aW4tQ29tbWFuZHMuaHRtbFxuXHRcdCdidWlsdGluJzoge1xuXHRcdFx0cGF0dGVybjogLyhefFtcXHM7fCZdfFs8Pl1cXCgpKD86XFwufDp8YnJlYWt8Y2R8Y29udGludWV8ZXZhbHxleGVjfGV4aXR8ZXhwb3J0fGdldG9wdHN8aGFzaHxwd2R8cmVhZG9ubHl8cmV0dXJufHNoaWZ0fHRlc3R8dGltZXN8dHJhcHx1bWFza3x1bnNldHxhbGlhc3xiaW5kfGJ1aWx0aW58Y2FsbGVyfGNvbW1hbmR8ZGVjbGFyZXxlY2hvfGVuYWJsZXxoZWxwfGxldHxsb2NhbHxsb2dvdXR8bWFwZmlsZXxwcmludGZ8cmVhZHxyZWFkYXJyYXl8c291cmNlfHR5cGV8dHlwZXNldHx1bGltaXR8dW5hbGlhc3xzZXR8c2hvcHQpKD89JHxbKVxcczt8Jl0pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHQvLyBBbGlhcyBhZGRlZCB0byBtYWtlIHRob3NlIGVhc2llciB0byBkaXN0aW5ndWlzaCBmcm9tIHN0cmluZ3MuXG5cdFx0XHRhbGlhczogJ2NsYXNzLW5hbWUnXG5cdFx0fSxcblx0XHQnYm9vbGVhbic6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXFxzO3wmXXxbPD5dXFwoKSg/OnRydWV8ZmFsc2UpKD89JHxbKVxcczt8Jl0pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdmaWxlLWRlc2NyaXB0b3InOiB7XG5cdFx0XHRwYXR0ZXJuOiAvXFxCJlxcZFxcYi8sXG5cdFx0XHRhbGlhczogJ2ltcG9ydGFudCdcblx0XHR9LFxuXHRcdCdvcGVyYXRvcic6IHtcblx0XHRcdC8vIExvdHMgb2YgcmVkaXJlY3Rpb25zIGhlcmUsIGJ1dCBub3QganVzdCB0aGF0LlxuXHRcdFx0cGF0dGVybjogL1xcZD88Pnw+XFx8fFxcKz18PVs9fl0/fCE9P3w8PFs8LV0/fFsmXFxkXT8+PnxcXGRbPD5dJj98Wzw+XVsmPV0/fCZbPiZdP3xcXHxbJnxdPy8sXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2ZpbGUtZGVzY3JpcHRvcic6IHtcblx0XHRcdFx0XHRwYXR0ZXJuOiAvXlxcZC8sXG5cdFx0XHRcdFx0YWxpYXM6ICdpbXBvcnRhbnQnXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdCdwdW5jdHVhdGlvbic6IC9cXCQ/XFwoXFwoP3xcXClcXCk/fFxcLlxcLnxbe31bXFxdO1xcXFxdLyxcblx0XHQnbnVtYmVyJzoge1xuXHRcdFx0cGF0dGVybjogLyhefFxccykoPzpbMS05XVxcZCp8MCkoPzpbLixdXFxkKyk/XFxiLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdH07XG5cblx0Y29tbWFuZEFmdGVySGVyZWRvYy5pbnNpZGUgPSBQcmlzbS5sYW5ndWFnZXMuYmFzaDtcblxuXHQvKiBQYXR0ZXJucyBpbiBjb21tYW5kIHN1YnN0aXR1dGlvbi4gKi9cblx0dmFyIHRvQmVDb3BpZWQgPSBbXG5cdFx0J2NvbW1lbnQnLFxuXHRcdCdmdW5jdGlvbi1uYW1lJyxcblx0XHQnZm9yLW9yLXNlbGVjdCcsXG5cdFx0J2Fzc2lnbi1sZWZ0Jyxcblx0XHQnc3RyaW5nJyxcblx0XHQnZW52aXJvbm1lbnQnLFxuXHRcdCdmdW5jdGlvbicsXG5cdFx0J2tleXdvcmQnLFxuXHRcdCdidWlsdGluJyxcblx0XHQnYm9vbGVhbicsXG5cdFx0J2ZpbGUtZGVzY3JpcHRvcicsXG5cdFx0J29wZXJhdG9yJyxcblx0XHQncHVuY3R1YXRpb24nLFxuXHRcdCdudW1iZXInXG5cdF07XG5cdHZhciBpbnNpZGUgPSBpbnNpZGVTdHJpbmcudmFyaWFibGVbMV0uaW5zaWRlO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRvQmVDb3BpZWQubGVuZ3RoOyBpKyspIHtcblx0XHRpbnNpZGVbdG9CZUNvcGllZFtpXV0gPSBQcmlzbS5sYW5ndWFnZXMuYmFzaFt0b0JlQ29waWVkW2ldXTtcblx0fVxuXG5cdFByaXNtLmxhbmd1YWdlcy5zaGVsbCA9IFByaXNtLmxhbmd1YWdlcy5iYXNoO1xufShQcmlzbSkpO1xuIiwiLy8gaHR0cHM6Ly93d3cuanNvbi5vcmcvanNvbi1lbi5odG1sXG5QcmlzbS5sYW5ndWFnZXMuanNvbiA9IHtcblx0J3Byb3BlcnR5Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKVwiKD86XFxcXC58W15cXFxcXCJcXHJcXG5dKSpcIig/PVxccyo6KS8sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J3N0cmluZyc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSlcIig/OlxcXFwufFteXFxcXFwiXFxyXFxuXSkqXCIoPyFcXHMqOikvLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC9cXC9cXC8uKnxcXC9cXCpbXFxzXFxTXSo/KD86XFwqXFwvfCQpLyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J251bWJlcic6IC8tP1xcYlxcZCsoPzpcXC5cXGQrKT8oPzplWystXT9cXGQrKT9cXGIvaSxcblx0J3B1bmN0dWF0aW9uJzogL1t7fVtcXF0sXS8sXG5cdCdvcGVyYXRvcic6IC86Lyxcblx0J2Jvb2xlYW4nOiAvXFxiKD86dHJ1ZXxmYWxzZSlcXGIvLFxuXHQnbnVsbCc6IHtcblx0XHRwYXR0ZXJuOiAvXFxibnVsbFxcYi8sXG5cdFx0YWxpYXM6ICdrZXl3b3JkJ1xuXHR9XG59O1xuXG5QcmlzbS5sYW5ndWFnZXMud2VibWFuaWZlc3QgPSBQcmlzbS5sYW5ndWFnZXMuanNvbjtcbiIsIlByaXNtLmxhbmd1YWdlcy5zY3NzID0gUHJpc20ubGFuZ3VhZ2VzLmV4dGVuZCgnY3NzJywge1xuXHQnY29tbWVudCc6IHtcblx0XHRwYXR0ZXJuOiAvKF58W15cXFxcXSkoPzpcXC9cXCpbXFxzXFxTXSo/XFwqXFwvfFxcL1xcLy4qKS8sXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9LFxuXHQnYXRydWxlJzoge1xuXHRcdHBhdHRlcm46IC9AW1xcdy1dKD86XFwoW14oKV0rXFwpfFteKClcXHNdfFxccysoPyFcXHMpKSo/KD89XFxzK1t7O10pLyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdydWxlJzogL0BbXFx3LV0rL1xuXHRcdFx0Ly8gU2VlIHJlc3QgYmVsb3dcblx0XHR9XG5cdH0sXG5cdC8vIHVybCwgY29tcGFzc2lmaWVkXG5cdCd1cmwnOiAvKD86Wy1hLXpdKy0pP3VybCg/PVxcKCkvaSxcblx0Ly8gQ1NTIHNlbGVjdG9yIHJlZ2V4IGlzIG5vdCBhcHByb3ByaWF0ZSBmb3IgU2Fzc1xuXHQvLyBzaW5jZSB0aGVyZSBjYW4gYmUgbG90IG1vcmUgdGhpbmdzICh2YXIsIEAgZGlyZWN0aXZlLCBuZXN0aW5nLi4pXG5cdC8vIGEgc2VsZWN0b3IgbXVzdCBzdGFydCBhdCB0aGUgZW5kIG9mIGEgcHJvcGVydHkgb3IgYWZ0ZXIgYSBicmFjZSAoZW5kIG9mIG90aGVyIHJ1bGVzIG9yIG5lc3RpbmcpXG5cdC8vIGl0IGNhbiBjb250YWluIHNvbWUgY2hhcmFjdGVycyB0aGF0IGFyZW4ndCB1c2VkIGZvciBkZWZpbmluZyBydWxlcyBvciBlbmQgb2Ygc2VsZWN0b3IsICYgKHBhcmVudCBzZWxlY3RvciksIG9yIGludGVycG9sYXRlZCB2YXJpYWJsZVxuXHQvLyB0aGUgZW5kIG9mIGEgc2VsZWN0b3IgaXMgZm91bmQgd2hlbiB0aGVyZSBpcyBubyBydWxlcyBpbiBpdCAoIHt9IG9yIHtcXHN9KSBvciBpZiB0aGVyZSBpcyBhIHByb3BlcnR5IChiZWNhdXNlIGFuIGludGVycG9sYXRlZCB2YXJcblx0Ly8gY2FuIFwicGFzc1wiIGFzIGEgc2VsZWN0b3ItIGUuZzogcHJvcGVyI3skZXJ0eX0pXG5cdC8vIHRoaXMgb25lIHdhcyBoYXJkIHRvIGRvLCBzbyBwbGVhc2UgYmUgY2FyZWZ1bCBpZiB5b3UgZWRpdCB0aGlzIG9uZSA6KVxuXHQnc2VsZWN0b3InOiB7XG5cdFx0Ly8gSW5pdGlhbCBsb29rLWFoZWFkIGlzIHVzZWQgdG8gcHJldmVudCBtYXRjaGluZyBvZiBibGFuayBzZWxlY3RvcnNcblx0XHRwYXR0ZXJuOiAvKD89XFxTKVteQDt7fSgpXT8oPzpbXkA7e30oKVxcc118XFxzKyg/IVxccyl8I1xce1xcJFstXFx3XStcXH0pKyg/PVxccypcXHsoPzpcXH18XFxzfFtefV1bXjp7fV0qWzp7XVtefV0pKS9tLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3BhcmVudCc6IHtcblx0XHRcdFx0cGF0dGVybjogLyYvLFxuXHRcdFx0XHRhbGlhczogJ2ltcG9ydGFudCdcblx0XHRcdH0sXG5cdFx0XHQncGxhY2Vob2xkZXInOiAvJVstXFx3XSsvLFxuXHRcdFx0J3ZhcmlhYmxlJzogL1xcJFstXFx3XSt8I1xce1xcJFstXFx3XStcXH0vXG5cdFx0fVxuXHR9LFxuXHQncHJvcGVydHknOiB7XG5cdFx0cGF0dGVybjogLyg/OlstXFx3XXxcXCRbLVxcd118I1xce1xcJFstXFx3XStcXH0pKyg/PVxccyo6KS8sXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQndmFyaWFibGUnOiAvXFwkWy1cXHddK3wjXFx7XFwkWy1cXHddK1xcfS9cblx0XHR9XG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2F0cnVsZScsIHtcblx0J2tleXdvcmQnOiBbXG5cdFx0L0AoPzppZnxlbHNlKD86IGlmKT98Zm9yd2FyZHxmb3J8ZWFjaHx3aGlsZXxpbXBvcnR8dXNlfGV4dGVuZHxkZWJ1Z3x3YXJufG1peGlufGluY2x1ZGV8ZnVuY3Rpb258cmV0dXJufGNvbnRlbnQpXFxiL2ksXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyggKSg/OmZyb218dGhyb3VnaCkoPz0gKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fVxuXHRdXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnc2NzcycsICdpbXBvcnRhbnQnLCB7XG5cdC8vIHZhciBhbmQgaW50ZXJwb2xhdGVkIHZhcnNcblx0J3ZhcmlhYmxlJzogL1xcJFstXFx3XSt8I1xce1xcJFstXFx3XStcXH0vXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnc2NzcycsICdmdW5jdGlvbicsIHtcblx0J21vZHVsZS1tb2RpZmllcic6IHtcblx0XHRwYXR0ZXJuOiAvXFxiKD86YXN8d2l0aHxzaG93fGhpZGUpXFxiL2ksXG5cdFx0YWxpYXM6ICdrZXl3b3JkJ1xuXHR9LFxuXHQncGxhY2Vob2xkZXInOiB7XG5cdFx0cGF0dGVybjogLyVbLVxcd10rLyxcblx0XHRhbGlhczogJ3NlbGVjdG9yJ1xuXHR9LFxuXHQnc3RhdGVtZW50Jzoge1xuXHRcdHBhdHRlcm46IC9cXEIhKD86ZGVmYXVsdHxvcHRpb25hbClcXGIvaSxcblx0XHRhbGlhczogJ2tleXdvcmQnXG5cdH0sXG5cdCdib29sZWFuJzogL1xcYig/OnRydWV8ZmFsc2UpXFxiLyxcblx0J251bGwnOiB7XG5cdFx0cGF0dGVybjogL1xcYm51bGxcXGIvLFxuXHRcdGFsaWFzOiAna2V5d29yZCdcblx0fSxcblx0J29wZXJhdG9yJzoge1xuXHRcdHBhdHRlcm46IC8oXFxzKSg/OlstKypcXC8lXXxbPSFdPXw8PT98Pj0/fGFuZHxvcnxub3QpKD89XFxzKS8sXG5cdFx0bG9va2JlaGluZDogdHJ1ZVxuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLnNjc3NbJ2F0cnVsZSddLmluc2lkZS5yZXN0ID0gUHJpc20ubGFuZ3VhZ2VzLnNjc3M7XG4iLCIoZnVuY3Rpb24gKFByaXNtKSB7XG5cblx0Ly8gaHR0cHM6Ly95YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjYy1ucy1hbmNob3ItcHJvcGVydHlcblx0Ly8gaHR0cHM6Ly95YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjYy1ucy1hbGlhcy1ub2RlXG5cdHZhciBhbmNob3JPckFsaWFzID0gL1sqJl1bXlxcc1tcXF17fSxdKy87XG5cdC8vIGh0dHBzOi8veWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2MtbnMtdGFnLXByb3BlcnR5XG5cdHZhciB0YWcgPSAvISg/OjxbXFx3XFwtJSM7Lz86QCY9KyQsLiF+KicoKVtcXF1dKz58KD86W2EtekEtWlxcZC1dKiEpP1tcXHdcXC0lIzsvPzpAJj0rJC5+KicoKV0rKT8vO1xuXHQvLyBodHRwczovL3lhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNjLW5zLXByb3BlcnRpZXMobixjKVxuXHR2YXIgcHJvcGVydGllcyA9ICcoPzonICsgdGFnLnNvdXJjZSArICcoPzpbIFxcdF0rJyArIGFuY2hvck9yQWxpYXMuc291cmNlICsgJyk/fCdcblx0XHQrIGFuY2hvck9yQWxpYXMuc291cmNlICsgJyg/OlsgXFx0XSsnICsgdGFnLnNvdXJjZSArICcpPyknO1xuXHQvLyBodHRwczovL3lhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNucy1wbGFpbihuLGMpXG5cdC8vIFRoaXMgaXMgYSBzaW1wbGlmaWVkIHZlcnNpb24gdGhhdCBkb2Vzbid0IHN1cHBvcnQgXCIjXCIgYW5kIG11bHRpbGluZSBrZXlzXG5cdC8vIEFsbCB0aGVzZSBsb25nIHNjYXJyeSBjaGFyYWN0ZXIgY2xhc3NlcyBhcmUgc2ltcGxpZmllZCB2ZXJzaW9ucyBvZiBZQU1MJ3MgY2hhcmFjdGVyc1xuXHR2YXIgcGxhaW5LZXkgPSAvKD86W15cXHNcXHgwMC1cXHgwOFxceDBlLVxceDFmIVwiIyUmJyosXFwtOj4/QFtcXF1ge3x9XFx4N2YtXFx4ODRcXHg4Ni1cXHg5ZlxcdWQ4MDAtXFx1ZGZmZlxcdWZmZmVcXHVmZmZmXXxbPzotXTxQTEFJTj4pKD86WyBcXHRdKig/Oig/IVsjOl0pPFBMQUlOPnw6PFBMQUlOPikpKi8uc291cmNlXG5cdFx0LnJlcGxhY2UoLzxQTEFJTj4vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gL1teXFxzXFx4MDAtXFx4MDhcXHgwZS1cXHgxZixbXFxde31cXHg3Zi1cXHg4NFxceDg2LVxceDlmXFx1ZDgwMC1cXHVkZmZmXFx1ZmZmZVxcdWZmZmZdLy5zb3VyY2U7IH0pO1xuXHR2YXIgc3RyaW5nID0gL1wiKD86W15cIlxcXFxcXHJcXG5dfFxcXFwuKSpcInwnKD86W14nXFxcXFxcclxcbl18XFxcXC4pKicvLnNvdXJjZTtcblxuXHQvKipcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZmxhZ3NdXG5cdCAqIEByZXR1cm5zIHtSZWdFeHB9XG5cdCAqL1xuXHRmdW5jdGlvbiBjcmVhdGVWYWx1ZVBhdHRlcm4odmFsdWUsIGZsYWdzKSB7XG5cdFx0ZmxhZ3MgPSAoZmxhZ3MgfHwgJycpLnJlcGxhY2UoL20vZywgJycpICsgJ20nOyAvLyBhZGQgbSBmbGFnXG5cdFx0dmFyIHBhdHRlcm4gPSAvKFs6XFwtLFt7XVxccyooPzpcXHM8PHByb3A+PlsgXFx0XSspPykoPzo8PHZhbHVlPj4pKD89WyBcXHRdKig/OiR8LHxcXF18XFx9fCg/OltcXHJcXG5dXFxzKik/IykpLy5zb3VyY2Vcblx0XHRcdC5yZXBsYWNlKC88PHByb3A+Pi9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm9wZXJ0aWVzOyB9KS5yZXBsYWNlKC88PHZhbHVlPj4vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsdWU7IH0pO1xuXHRcdHJldHVybiBSZWdFeHAocGF0dGVybiwgZmxhZ3MpO1xuXHR9XG5cblx0UHJpc20ubGFuZ3VhZ2VzLnlhbWwgPSB7XG5cdFx0J3NjYWxhcic6IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgvKFtcXC06XVxccyooPzpcXHM8PHByb3A+PlsgXFx0XSspP1t8Pl0pWyBcXHRdKig/OigoPzpcXHI/XFxufFxccilbIFxcdF0rKVxcU1teXFxyXFxuXSooPzpcXDJbXlxcclxcbl0rKSopLy5zb3VyY2Vcblx0XHRcdFx0LnJlcGxhY2UoLzw8cHJvcD4+L2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3BlcnRpZXM7IH0pKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRhbGlhczogJ3N0cmluZydcblx0XHR9LFxuXHRcdCdjb21tZW50JzogLyMuKi8sXG5cdFx0J2tleSc6IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgvKCg/Ol58WzpcXC0sW3tcXHJcXG4/XSlbIFxcdF0qKD86PDxwcm9wPj5bIFxcdF0rKT8pPDxrZXk+Pig/PVxccyo6XFxzKS8uc291cmNlXG5cdFx0XHRcdC5yZXBsYWNlKC88PHByb3A+Pi9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm9wZXJ0aWVzOyB9KVxuXHRcdFx0XHQucmVwbGFjZSgvPDxrZXk+Pi9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiAnKD86JyArIHBsYWluS2V5ICsgJ3wnICsgc3RyaW5nICsgJyknOyB9KSksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0YWxpYXM6ICdhdHJ1bGUnXG5cdFx0fSxcblx0XHQnZGlyZWN0aXZlJzoge1xuXHRcdFx0cGF0dGVybjogLyheWyBcXHRdKiklLisvbSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRhbGlhczogJ2ltcG9ydGFudCdcblx0XHR9LFxuXHRcdCdkYXRldGltZSc6IHtcblx0XHRcdHBhdHRlcm46IGNyZWF0ZVZhbHVlUGF0dGVybigvXFxkezR9LVxcZFxcZD8tXFxkXFxkPyg/Olt0VF18WyBcXHRdKylcXGRcXGQ/OlxcZHsyfTpcXGR7Mn0oPzpcXC5cXGQqKT8oPzpbIFxcdF0qKD86WnxbLStdXFxkXFxkPyg/OjpcXGR7Mn0pPykpP3xcXGR7NH0tXFxkezJ9LVxcZHsyfXxcXGRcXGQ/OlxcZHsyfSg/OjpcXGR7Mn0oPzpcXC5cXGQqKT8pPy8uc291cmNlKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRhbGlhczogJ251bWJlcidcblx0XHR9LFxuXHRcdCdib29sZWFuJzoge1xuXHRcdFx0cGF0dGVybjogY3JlYXRlVmFsdWVQYXR0ZXJuKC90cnVlfGZhbHNlLy5zb3VyY2UsICdpJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0YWxpYXM6ICdpbXBvcnRhbnQnXG5cdFx0fSxcblx0XHQnbnVsbCc6IHtcblx0XHRcdHBhdHRlcm46IGNyZWF0ZVZhbHVlUGF0dGVybigvbnVsbHx+Ly5zb3VyY2UsICdpJyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0YWxpYXM6ICdpbXBvcnRhbnQnXG5cdFx0fSxcblx0XHQnc3RyaW5nJzoge1xuXHRcdFx0cGF0dGVybjogY3JlYXRlVmFsdWVQYXR0ZXJuKHN0cmluZyksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0fSxcblx0XHQnbnVtYmVyJzoge1xuXHRcdFx0cGF0dGVybjogY3JlYXRlVmFsdWVQYXR0ZXJuKC9bKy1dPyg/OjB4W1xcZGEtZl0rfDBvWzAtN10rfCg/OlxcZCsoPzpcXC5cXGQqKT98XFwuXFxkKykoPzplWystXT9cXGQrKT98XFwuaW5mfFxcLm5hbikvLnNvdXJjZSwgJ2knKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCd0YWcnOiB0YWcsXG5cdFx0J2ltcG9ydGFudCc6IGFuY2hvck9yQWxpYXMsXG5cdFx0J3B1bmN0dWF0aW9uJzogLy0tLXxbOltcXF17fVxcLSx8Pj9dfFxcLlxcLlxcLi9cblx0fTtcblxuXHRQcmlzbS5sYW5ndWFnZXMueW1sID0gUHJpc20ubGFuZ3VhZ2VzLnlhbWw7XG5cbn0oUHJpc20pKTtcbiIsIi8vIFJlbW92ZXMgc3VwcG9ydCBmb3IgXCI+Lzwgc3R5bGVzXCIgc28gbm9uLWluZGVudGVkIEhUTUwgc2hvd3MgY29ycmVjdGx5IGluIHRoZSBkaWZmLlxuLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9ibG9iL3YxLjE1LjAvY29tcG9uZW50cy9wcmlzbS1kaWZmLmpzI0wxMVxuZXhwb3J0IGRlZmF1bHQge1xuXHQnY29vcmQnOiBbXG5cdFx0Ly8gTWF0Y2ggYWxsIGtpbmRzIG9mIGNvb3JkIGxpbmVzIChwcmVmaXhlZCBieSBcIisrK1wiLCBcIi0tLVwiIG9yIFwiKioqXCIpLlxuXHRcdC9eKD86XFwqezN9fC17M318XFwrezN9KS4qJC9tLFxuXHRcdC8vIE1hdGNoIFwiQEAgLi4uIEBAXCIgY29vcmQgbGluZXMgaW4gdW5pZmllZCBkaWZmLlxuXHRcdC9eQEAuKkBAJC9tLFxuXHRcdC8vIE1hdGNoIGNvb3JkIGxpbmVzIGluIG5vcm1hbCBkaWZmIChzdGFydHMgd2l0aCBhIG51bWJlcikuXG5cdFx0L15cXGQrLiokL21cblx0XSxcblxuXHQvLyBNYXRjaCBpbnNlcnRlZCBhbmQgZGVsZXRlZCBsaW5lcy4gU3VwcG9ydCBib3RoICsvLSBhbmQgPi88IHN0eWxlcy5cblx0J2RlbGV0ZWQnOiAvXlstXS4qJC9tLFxuXHQnaW5zZXJ0ZWQnOiAvXlsrXS4qJC9tLFxuXG5cdC8vIE1hdGNoIFwiZGlmZmVyZW50XCIgbGluZXMgKHByZWZpeGVkIHdpdGggXCIhXCIpIGluIGNvbnRleHQgZGlmZi5cblx0J2RpZmYnOiB7XG5cdFx0J3BhdHRlcm4nOiAvXiEoPyEhKS4rJC9tLFxuXHRcdCdhbGlhcyc6ICdpbXBvcnRhbnQnXG5cdH1cbn07XG4iLCJpbXBvcnQgU3ludGF4SGlnaGxpZ2h0IGZyb20gJy4vc3JjL2pzL3N5bnRheC1oaWdobGlnaHQnO1xuXG5jb25zdCBjb25zdHJ1Y3RBbGwgPSBmdW5jdGlvbigpIHtcblx0U3ludGF4SGlnaGxpZ2h0LmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bnRheEhpZ2hsaWdodDtcbiIsImltcG9ydCBTeW50YXhIaWdobGlnaHQgZnJvbSAnLi4vLi4vbWFpbi5qcyc7XG5cbmNvbnN0IGhpZ2hsaWdodGVyID0gbmV3IFN5bnRheEhpZ2hsaWdodCgnPGRpdj5UaGVyZSBpcyBhIDxhIGhyZWY9XCIjXCI+bGluazwvYT5oZXJlLjwvZGl2PicsIHtcblx0bGFuZ3VhZ2U6ICdodG1sJ1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vJykuaW5uZXJIVE1MID0gaGlnaGxpZ2h0ZXIudG9rZW5pc2UoKTtcbiJdfQ==