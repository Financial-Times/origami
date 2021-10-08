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

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY29yZS5qcyIsInNyYy9qcy9oZWxwZXJzLmpzIiwic3JjL2pzL3N5bnRheC1oaWdobGlnaHQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmt1cC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jbGlrZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YXNjcmlwdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tYmFzaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc2Nzcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbC5qcyIsInNyYy9qcy9sYW5ndWFnZXMvcHJpc20tZGlmZi5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQUEsa0JBQUEsR0FBQSxVQUFBLENBQUE7QUFBQSx5REFBQSxvREFBQSxPQUFBLEVBQUEsTUFBQSxFQUFBO0FBRUEsVUFBSSxLQUFBLEdBQVMsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQ1YsTUFEVSxHQUdWLE9BQU8saUJBQVAsS0FBNkIsV0FBN0IsSUFBNEMsSUFBQSxZ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a2VyXCIvPlxuXG52YXIgX3NlbGYgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG5cdD8gd2luZG93ICAgLy8gaWYgaW4gYnJvd3NlclxuXHQ6IChcblx0XHQodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpXG5cdFx0XHQ/IHNlbGYgLy8gaWYgaW4gd29ya2VyXG5cdFx0XHQ6IHt9ICAgLy8gaWYgaW4gbm9kZSBqc1xuXHQpO1xuXG4vKipcbiAqIFByaXNtOiBMaWdodHdlaWdodCwgcm9idXN0LCBlbGVnYW50IHN5bnRheCBoaWdobGlnaHRpbmdcbiAqXG4gKiBAbGljZW5zZSBNSVQgPGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuICogQGF1dGhvciBMZWEgVmVyb3UgPGh0dHBzOi8vbGVhLnZlcm91Lm1lPlxuICogQG5hbWVzcGFjZVxuICogQHB1YmxpY1xuICovXG52YXIgUHJpc20gPSAoZnVuY3Rpb24gKF9zZWxmKSB7XG5cblx0Ly8gUHJpdmF0ZSBoZWxwZXIgdmFyc1xuXHR2YXIgbGFuZyA9IC9cXGJsYW5nKD86dWFnZSk/LShbXFx3LV0rKVxcYi9pO1xuXHR2YXIgdW5pcXVlSWQgPSAwO1xuXG5cdC8vIFRoZSBncmFtbWFyIG9iamVjdCBmb3IgcGxhaW50ZXh0XG5cdHZhciBwbGFpblRleHRHcmFtbWFyID0ge307XG5cblxuXHR2YXIgXyA9IHtcblx0XHQvKipcblx0XHQgKiBCeSBkZWZhdWx0LCBQcmlzbSB3aWxsIGF0dGVtcHQgdG8gaGlnaGxpZ2h0IGFsbCBjb2RlIGVsZW1lbnRzIChieSBjYWxsaW5nIHtAbGluayBQcmlzbS5oaWdobGlnaHRBbGx9KSBvbiB0aGVcblx0XHQgKiBjdXJyZW50IHBhZ2UgYWZ0ZXIgdGhlIHBhZ2UgZmluaXNoZWQgbG9hZGluZy4gVGhpcyBtaWdodCBiZSBhIHByb2JsZW0gaWYgZS5nLiB5b3Ugd2FudGVkIHRvIGFzeW5jaHJvbm91c2x5IGxvYWRcblx0XHQgKiBhZGRpdGlvbmFsIGxhbmd1YWdlcyBvciBwbHVnaW5zIHlvdXJzZWxmLlxuXHRcdCAqXG5cdFx0ICogQnkgc2V0dGluZyB0aGlzIHZhbHVlIHRvIGB0cnVlYCwgUHJpc20gd2lsbCBub3QgYXV0b21hdGljYWxseSBoaWdobGlnaHQgYWxsIGNvZGUgZWxlbWVudHMgb24gdGhlIHBhZ2UuXG5cdFx0ICpcblx0XHQgKiBZb3Ugb2J2aW91c2x5IGhhdmUgdG8gY2hhbmdlIHRoaXMgdmFsdWUgYmVmb3JlIHRoZSBhdXRvbWF0aWMgaGlnaGxpZ2h0aW5nIHN0YXJ0ZWQuIFRvIGRvIHRoaXMsIHlvdSBjYW4gYWRkIGFuXG5cdFx0ICogZW1wdHkgUHJpc20gb2JqZWN0IGludG8gdGhlIGdsb2JhbCBzY29wZSBiZWZvcmUgbG9hZGluZyB0aGUgUHJpc20gc2NyaXB0IGxpa2UgdGhpczpcblx0XHQgKlxuXHRcdCAqIGBgYGpzXG5cdFx0ICogd2luZG93LlByaXNtID0gd2luZG93LlByaXNtIHx8IHt9O1xuXHRcdCAqIFByaXNtLm1hbnVhbCA9IHRydWU7XG5cdFx0ICogLy8gYWRkIGEgbmV3IDxzY3JpcHQ+IHRvIGxvYWQgUHJpc20ncyBzY3JpcHRcblx0XHQgKiBgYGBcblx0XHQgKlxuXHRcdCAqIEBkZWZhdWx0IGZhbHNlXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdG1hbnVhbDogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20ubWFudWFsLFxuXHRcdGRpc2FibGVXb3JrZXJNZXNzYWdlSGFuZGxlcjogX3NlbGYuUHJpc20gJiYgX3NlbGYuUHJpc20uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyLFxuXG5cdFx0LyoqXG5cdFx0ICogQSBuYW1lc3BhY2UgZm9yIHV0aWxpdHkgbWV0aG9kcy5cblx0XHQgKlxuXHRcdCAqIEFsbCBmdW5jdGlvbiBpbiB0aGlzIG5hbWVzcGFjZSB0aGF0IGFyZSBub3QgZXhwbGljaXRseSBtYXJrZWQgYXMgX3B1YmxpY18gYXJlIGZvciBfX2ludGVybmFsIHVzZSBvbmx5X18gYW5kIG1heVxuXHRcdCAqIGNoYW5nZSBvciBkaXNhcHBlYXIgYXQgYW55IHRpbWUuXG5cdFx0ICpcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICovXG5cdFx0dXRpbDoge1xuXHRcdFx0ZW5jb2RlOiBmdW5jdGlvbiBlbmNvZGUodG9rZW5zKSB7XG5cdFx0XHRcdGlmICh0b2tlbnMgaW5zdGFuY2VvZiBUb2tlbikge1xuXHRcdFx0XHRcdHJldHVybiBuZXcgVG9rZW4odG9rZW5zLnR5cGUsIGVuY29kZSh0b2tlbnMuY29udGVudCksIHRva2Vucy5hbGlhcyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0b2tlbnMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRva2Vucy5tYXAoZW5jb2RlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW5zLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1xcdTAwYTAvZywgJyAnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSB0eXBlIG9mIHRoZSBnaXZlbiB2YWx1ZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge2FueX0gb1xuXHRcdFx0ICogQHJldHVybnMge3N0cmluZ31cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiB0eXBlKG51bGwpICAgICAgPT09ICdOdWxsJ1xuXHRcdFx0ICogdHlwZSh1bmRlZmluZWQpID09PSAnVW5kZWZpbmVkJ1xuXHRcdFx0ICogdHlwZSgxMjMpICAgICAgID09PSAnTnVtYmVyJ1xuXHRcdFx0ICogdHlwZSgnZm9vJykgICAgID09PSAnU3RyaW5nJ1xuXHRcdFx0ICogdHlwZSh0cnVlKSAgICAgID09PSAnQm9vbGVhbidcblx0XHRcdCAqIHR5cGUoWzEsIDJdKSAgICA9PT0gJ0FycmF5J1xuXHRcdFx0ICogdHlwZSh7fSkgICAgICAgID09PSAnT2JqZWN0J1xuXHRcdFx0ICogdHlwZShTdHJpbmcpICAgID09PSAnRnVuY3Rpb24nXG5cdFx0XHQgKiB0eXBlKC9hYmMrLykgICAgPT09ICdSZWdFeHAnXG5cdFx0XHQgKi9cblx0XHRcdHR5cGU6IGZ1bmN0aW9uIChvKSB7XG5cdFx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSZXR1cm5zIGEgdW5pcXVlIG51bWJlciBmb3IgdGhlIGdpdmVuIG9iamVjdC4gTGF0ZXIgY2FsbHMgd2lsbCBzdGlsbCByZXR1cm4gdGhlIHNhbWUgbnVtYmVyLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcblx0XHRcdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdFx0XHQgKi9cblx0XHRcdG9iaklkOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRcdGlmICghb2JqWydfX2lkJ10pIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19pZCcsIHsgdmFsdWU6ICsrdW5pcXVlSWQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9ialsnX19pZCddO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjbG9uZSBvZiB0aGUgZ2l2ZW4gb2JqZWN0LlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBtYWluIGludGVuZGVkIHVzZSBvZiB0aGlzIGZ1bmN0aW9uIGlzIHRvIGNsb25lIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7VH0gb1xuXHRcdFx0ICogQHBhcmFtIHtSZWNvcmQ8bnVtYmVyLCBhbnk+fSBbdmlzaXRlZF1cblx0XHRcdCAqIEByZXR1cm5zIHtUfVxuXHRcdFx0ICogQHRlbXBsYXRlIFRcblx0XHRcdCAqL1xuXHRcdFx0Y2xvbmU6IGZ1bmN0aW9uIGRlZXBDbG9uZShvLCB2aXNpdGVkKSB7XG5cdFx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHRcdHZhciBjbG9uZTsgdmFyIGlkO1xuXHRcdFx0XHRzd2l0Y2ggKF8udXRpbC50eXBlKG8pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdFx0XHRcdGlkID0gXy51dGlsLm9iaklkKG8pO1xuXHRcdFx0XHRcdFx0aWYgKHZpc2l0ZWRbaWRdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2aXNpdGVkW2lkXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsb25lID0gLyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSAqLyAoe30pO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIG8pIHtcblx0XHRcdFx0XHRcdFx0aWYgKG8uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsb25lW2tleV0gPSBkZWVwQ2xvbmUob1trZXldLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gLyoqIEB0eXBlIHthbnl9ICovIChjbG9uZSk7XG5cblx0XHRcdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdFx0XHRpZCA9IF8udXRpbC5vYmpJZChvKTtcblx0XHRcdFx0XHRcdGlmICh2aXNpdGVkW2lkXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmlzaXRlZFtpZF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9uZSA9IFtdO1xuXHRcdFx0XHRcdFx0dmlzaXRlZFtpZF0gPSBjbG9uZTtcblxuXHRcdFx0XHRcdFx0KC8qKiBAdHlwZSB7QXJyYXl9ICovKC8qKiBAdHlwZSB7YW55fSAqLyhvKSkpLmZvckVhY2goZnVuY3Rpb24gKHYsIGkpIHtcblx0XHRcdFx0XHRcdFx0Y2xvbmVbaV0gPSBkZWVwQ2xvbmUodiwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIC8qKiBAdHlwZSB7YW55fSAqLyAoY2xvbmUpO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHJldHVybiBvO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIFByaXNtIGxhbmd1YWdlIG9mIHRoZSBnaXZlbiBlbGVtZW50IHNldCBieSBhIGBsYW5ndWFnZS14eHh4YCBvciBgbGFuZy14eHh4YCBjbGFzcy5cblx0XHRcdCAqXG5cdFx0XHQgKiBJZiBubyBsYW5ndWFnZSBpcyBzZXQgZm9yIHRoZSBlbGVtZW50IG9yIHRoZSBlbGVtZW50IGlzIGBudWxsYCBvciBgdW5kZWZpbmVkYCwgYG5vbmVgIHdpbGwgYmUgcmV0dXJuZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdFx0XHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHRcdFx0ICovXG5cdFx0XHRnZXRMYW5ndWFnZTogZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRcdFx0d2hpbGUgKGVsZW1lbnQgJiYgIWxhbmcudGVzdChlbGVtZW50LmNsYXNzTmFtZSkpIHtcblx0XHRcdFx0XHRlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuIChlbGVtZW50LmNsYXNzTmFtZS5tYXRjaChsYW5nKSB8fCBbLCAnbm9uZSddKVsxXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAnbm9uZSc7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJldHVybnMgdGhlIHNjcmlwdCBlbGVtZW50IHRoYXQgaXMgY3VycmVudGx5IGV4ZWN1dGluZy5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGRvZXMgX19ub3RfXyB3b3JrIGZvciBsaW5lIHNjcmlwdCBlbGVtZW50LlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHtIVE1MU2NyaXB0RWxlbWVudCB8IG51bGx9XG5cdFx0XHQgKi9cblx0XHRcdGN1cnJlbnRTY3JpcHQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoJ2N1cnJlbnRTY3JpcHQnIGluIGRvY3VtZW50ICYmIDEgPCAyIC8qIGhhY2sgdG8gdHJpcCBUUycgZmxvdyBhbmFseXNpcyAqLykge1xuXHRcdFx0XHRcdHJldHVybiAvKiogQHR5cGUge2FueX0gKi8gKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSUUxMSB3b3JrYXJvdW5kXG5cdFx0XHRcdC8vIHdlJ2xsIGdldCB0aGUgc3JjIG9mIHRoZSBjdXJyZW50IHNjcmlwdCBieSBwYXJzaW5nIElFMTEncyBlcnJvciBzdGFjayB0cmFjZVxuXHRcdFx0XHQvLyB0aGlzIHdpbGwgbm90IHdvcmsgZm9yIGlubGluZSBzY3JpcHRzXG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IGZpbGUgc3JjIHVybCBmcm9tIHN0YWNrLiBTcGVjaWZpY2FsbHkgd29ya3Mgd2l0aCB0aGUgZm9ybWF0IG9mIHN0YWNrIHRyYWNlcyBpbiBJRS5cblx0XHRcdFx0XHQvLyBBIHN0YWNrIHdpbGwgbG9vayBsaWtlIHRoaXM6XG5cdFx0XHRcdFx0Ly9cblx0XHRcdFx0XHQvLyBFcnJvclxuXHRcdFx0XHRcdC8vICAgIGF0IF8udXRpbC5jdXJyZW50U2NyaXB0IChodHRwOi8vbG9jYWxob3N0L2NvbXBvbmVudHMvcHJpc20tY29yZS5qczoxMTk6NSlcblx0XHRcdFx0XHQvLyAgICBhdCBHbG9iYWwgY29kZSAoaHR0cDovL2xvY2FsaG9zdC9jb21wb25lbnRzL3ByaXNtLWNvcmUuanM6NjA2OjEpXG5cblx0XHRcdFx0XHR2YXIgc3JjID0gKC9hdCBbXihcXHJcXG5dKlxcKCguKik6W146XSs6W146XStcXCkkL2kuZXhlYyhlcnIuc3RhY2spIHx8IFtdKVsxXTtcblx0XHRcdFx0XHRpZiAoc3JjKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgaW4gc2NyaXB0cykge1xuXHRcdFx0XHRcdFx0XHRpZiAoc2NyaXB0c1tpXS5zcmMgPT0gc3JjKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNjcmlwdHNbaV07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUmV0dXJucyB3aGV0aGVyIGEgZ2l2ZW4gY2xhc3MgaXMgYWN0aXZlIGZvciBgZWxlbWVudGAuXG5cdFx0XHQgKlxuXHRcdFx0ICogVGhlIGNsYXNzIGNhbiBiZSBhY3RpdmF0ZWQgaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgZ2l2ZW4gY2xhc3MgYW5kIGl0IGNhbiBiZSBkZWFjdGl2YXRlZFxuXHRcdFx0ICogaWYgYGVsZW1lbnRgIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBjbGFzcy4gVGhlIF9uZWdhdGVkIHZlcnNpb25fIG9mIHRoZVxuXHRcdFx0ICogZ2l2ZW4gY2xhc3MgaXMganVzdCB0aGUgZ2l2ZW4gY2xhc3Mgd2l0aCBhIGBuby1gIHByZWZpeC5cblx0XHRcdCAqXG5cdFx0XHQgKiBXaGV0aGVyIHRoZSBjbGFzcyBpcyBhY3RpdmUgaXMgZGV0ZXJtaW5lZCBieSB0aGUgY2xvc2VzdCBhbmNlc3RvciBvZiBgZWxlbWVudGAgKHdoZXJlIGBlbGVtZW50YCBpdHNlbGYgaXNcblx0XHRcdCAqIGNsb3Nlc3QgYW5jZXN0b3IpIHRoYXQgaGFzIHRoZSBnaXZlbiBjbGFzcyBvciB0aGUgbmVnYXRlZCB2ZXJzaW9uIG9mIGl0LiBJZiBuZWl0aGVyIGBlbGVtZW50YCBub3IgYW55IG9mIGl0c1xuXHRcdFx0ICogYW5jZXN0b3JzIGhhdmUgdGhlIGdpdmVuIGNsYXNzIG9yIHRoZSBuZWdhdGVkIHZlcnNpb24gb2YgaXQsIHRoZW4gdGhlIGRlZmF1bHQgYWN0aXZhdGlvbiB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0ICpcblx0XHRcdCAqIEluIHRoZSBwYXJhZG94aWNhbCBzaXR1YXRpb24gd2hlcmUgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgY29udGFpbnMgX19ib3RoX18gdGhlIGdpdmVuIGNsYXNzIGFuZCB0aGUgbmVnYXRlZFxuXHRcdFx0ICogdmVyc2lvbiBvZiBpdCwgdGhlIGNsYXNzIGlzIGNvbnNpZGVyZWQgYWN0aXZlLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuXHRcdFx0ICogQHBhcmFtIHtib29sZWFufSBbZGVmYXVsdEFjdGl2YXRpb249ZmFsc2VdXG5cdFx0XHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0XHRcdCAqL1xuXHRcdFx0aXNBY3RpdmU6IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUsIGRlZmF1bHRBY3RpdmF0aW9uKSB7XG5cdFx0XHRcdHZhciBubyA9ICduby0nICsgY2xhc3NOYW1lO1xuXG5cdFx0XHRcdHdoaWxlIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0dmFyIGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuXHRcdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMobm8pKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICEhZGVmYXVsdEFjdGl2YXRpb247XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgbmFtZXNwYWNlIGNvbnRhaW5zIGFsbCBjdXJyZW50bHkgbG9hZGVkIGxhbmd1YWdlcyBhbmQgdGhlIHNvbWUgaGVscGVyIGZ1bmN0aW9ucyB0byBjcmVhdGUgYW5kIG1vZGlmeSBsYW5ndWFnZXMuXG5cdFx0ICpcblx0XHQgKiBAbmFtZXNwYWNlXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGxhbmd1YWdlczoge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgZ3JhbW1hciBmb3IgcGxhaW4sIHVuZm9ybWF0dGVkIHRleHQuXG5cdFx0XHQgKi9cblx0XHRcdHBsYWluOiBwbGFpblRleHRHcmFtbWFyLFxuXHRcdFx0cGxhaW50ZXh0OiBwbGFpblRleHRHcmFtbWFyLFxuXHRcdFx0dGV4dDogcGxhaW5UZXh0R3JhbW1hcixcblx0XHRcdHR4dDogcGxhaW5UZXh0R3JhbW1hcixcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBDcmVhdGVzIGEgZGVlcCBjb3B5IG9mIHRoZSBsYW5ndWFnZSB3aXRoIHRoZSBnaXZlbiBpZCBhbmQgYXBwZW5kcyB0aGUgZ2l2ZW4gdG9rZW5zLlxuXHRcdFx0ICpcblx0XHRcdCAqIElmIGEgdG9rZW4gaW4gYHJlZGVmYCBhbHNvIGFwcGVhcnMgaW4gdGhlIGNvcGllZCBsYW5ndWFnZSwgdGhlbiB0aGUgZXhpc3RpbmcgdG9rZW4gaW4gdGhlIGNvcGllZCBsYW5ndWFnZVxuXHRcdFx0ICogd2lsbCBiZSBvdmVyd3JpdHRlbiBhdCBpdHMgb3JpZ2luYWwgcG9zaXRpb24uXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgQmVzdCBwcmFjdGljZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBTaW5jZSB0aGUgcG9zaXRpb24gb2Ygb3ZlcndyaXRpbmcgdG9rZW5zICh0b2tlbiBpbiBgcmVkZWZgIHRoYXQgb3ZlcndyaXRlIHRva2VucyBpbiB0aGUgY29waWVkIGxhbmd1YWdlKVxuXHRcdFx0ICogZG9lc24ndCBtYXR0ZXIsIHRoZXkgY2FuIHRlY2huaWNhbGx5IGJlIGluIGFueSBvcmRlci4gSG93ZXZlciwgdGhpcyBjYW4gYmUgY29uZnVzaW5nIHRvIG90aGVycyB0aGF0IHRyeWluZyB0b1xuXHRcdFx0ICogdW5kZXJzdGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBiZWNhdXNlLCBub3JtYWxseSwgdGhlIG9yZGVyIG9mIHRva2VucyBtYXR0ZXJzIGluIFByaXNtIGdyYW1tYXJzLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZXJlZm9yZSwgaXQgaXMgZW5jb3VyYWdlZCB0byBvcmRlciBvdmVyd3JpdGluZyB0b2tlbnMgYWNjb3JkaW5nIHRvIHRoZSBwb3NpdGlvbnMgb2YgdGhlIG92ZXJ3cml0dGVuIHRva2Vucy5cblx0XHRcdCAqIEZ1cnRoZXJtb3JlLCBhbGwgbm9uLW92ZXJ3cml0aW5nIHRva2VucyBzaG91bGQgYmUgcGxhY2VkIGFmdGVyIHRoZSBvdmVyd3JpdGluZyBvbmVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGxhbmd1YWdlIHRvIGV4dGVuZC4gVGhpcyBoYXMgdG8gYmUgYSBrZXkgaW4gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IHJlZGVmIFRoZSBuZXcgdG9rZW5zIHRvIGFwcGVuZC5cblx0XHRcdCAqIEByZXR1cm5zIHtHcmFtbWFyfSBUaGUgbmV3IGxhbmd1YWdlIGNyZWF0ZWQuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzWydjc3Mtd2l0aC1jb2xvcnMnXSA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NzcycsIHtcblx0XHRcdCAqICAgICAvLyBQcmlzbS5sYW5ndWFnZXMuY3NzIGFscmVhZHkgaGFzIGEgJ2NvbW1lbnQnIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgb3ZlcndyaXRlIENTUycgJ2NvbW1lbnQnIHRva2VuXG5cdFx0XHQgKiAgICAgLy8gYXQgaXRzIG9yaWdpbmFsIHBvc2l0aW9uXG5cdFx0XHQgKiAgICAgJ2NvbW1lbnQnOiB7IC4uLiB9LFxuXHRcdFx0ICogICAgIC8vIENTUyBkb2Vzbid0IGhhdmUgYSAnY29sb3InIHRva2VuLCBzbyB0aGlzIHRva2VuIHdpbGwgYmUgYXBwZW5kZWRcblx0XHRcdCAqICAgICAnY29sb3InOiAvXFxiKD86cmVkfGdyZWVufGJsdWUpXFxiL1xuXHRcdFx0ICogfSk7XG5cdFx0XHQgKi9cblx0XHRcdGV4dGVuZDogZnVuY3Rpb24gKGlkLCByZWRlZikge1xuXHRcdFx0XHR2YXIgbGFuZyA9IF8udXRpbC5jbG9uZShfLmxhbmd1YWdlc1tpZF0pO1xuXG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiByZWRlZikge1xuXHRcdFx0XHRcdGxhbmdba2V5XSA9IHJlZGVmW2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gbGFuZztcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSW5zZXJ0cyB0b2tlbnMgX2JlZm9yZV8gYW5vdGhlciB0b2tlbiBpbiBhIGxhbmd1YWdlIGRlZmluaXRpb24gb3IgYW55IG90aGVyIGdyYW1tYXIuXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgVXNhZ2Vcblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGhlbHBlciBtZXRob2QgbWFrZXMgaXQgZWFzeSB0byBtb2RpZnkgZXhpc3RpbmcgbGFuZ3VhZ2VzLiBGb3IgZXhhbXBsZSwgdGhlIENTUyBsYW5ndWFnZSBkZWZpbml0aW9uXG5cdFx0XHQgKiBub3Qgb25seSBkZWZpbmVzIENTUyBoaWdobGlnaHRpbmcgZm9yIENTUyBkb2N1bWVudHMsIGJ1dCBhbHNvIG5lZWRzIHRvIGRlZmluZSBoaWdobGlnaHRpbmcgZm9yIENTUyBlbWJlZGRlZFxuXHRcdFx0ICogaW4gSFRNTCB0aHJvdWdoIGA8c3R5bGU+YCBlbGVtZW50cy4gVG8gZG8gdGhpcywgaXQgbmVlZHMgdG8gbW9kaWZ5IGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYCBhbmQgYWRkIHRoZVxuXHRcdFx0ICogYXBwcm9wcmlhdGUgdG9rZW5zLiBIb3dldmVyLCBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAgaXMgYSByZWd1bGFyIEphdmFTY3JpcHQgb2JqZWN0IGxpdGVyYWwsIHNvIGlmIHlvdSBkb1xuXHRcdFx0ICogdGhpczpcblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5zdHlsZSA9IHtcblx0XHRcdCAqICAgICAvLyB0b2tlblxuXHRcdFx0ICogfTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqIHRoZW4gdGhlIGBzdHlsZWAgdG9rZW4gd2lsbCBiZSBhZGRlZCAoYW5kIHByb2Nlc3NlZCkgYXQgdGhlIGVuZC4gYGluc2VydEJlZm9yZWAgYWxsb3dzIHlvdSB0byBpbnNlcnQgdG9rZW5zXG5cdFx0XHQgKiBiZWZvcmUgZXhpc3RpbmcgdG9rZW5zLiBGb3IgdGhlIENTUyBleGFtcGxlIGFib3ZlLCB5b3Ugd291bGQgdXNlIGl0IGxpa2UgdGhpczpcblx0XHRcdCAqXG5cdFx0XHQgKiBgYGBqc1xuXHRcdFx0ICogUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnbWFya3VwJywgJ2NkYXRhJywge1xuXHRcdFx0ICogICAgICdzdHlsZSc6IHtcblx0XHRcdCAqICAgICAgICAgLy8gdG9rZW5cblx0XHRcdCAqICAgICB9XG5cdFx0XHQgKiB9KTtcblx0XHRcdCAqIGBgYFxuXHRcdFx0ICpcblx0XHRcdCAqICMjIFNwZWNpYWwgY2FzZXNcblx0XHRcdCAqXG5cdFx0XHQgKiBJZiB0aGUgZ3JhbW1hcnMgb2YgYGluc2lkZWAgYW5kIGBpbnNlcnRgIGhhdmUgdG9rZW5zIHdpdGggdGhlIHNhbWUgbmFtZSwgdGhlIHRva2VucyBpbiBgaW5zaWRlYCdzIGdyYW1tYXJcblx0XHRcdCAqIHdpbGwgYmUgaWdub3JlZC5cblx0XHRcdCAqXG5cdFx0XHQgKiBUaGlzIGJlaGF2aW9yIGNhbiBiZSB1c2VkIHRvIGluc2VydCB0b2tlbnMgYWZ0ZXIgYGJlZm9yZWA6XG5cdFx0XHQgKlxuXHRcdFx0ICogYGBganNcblx0XHRcdCAqIFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjb21tZW50Jywge1xuXHRcdFx0ICogICAgICdjb21tZW50JzogUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC5jb21tZW50LFxuXHRcdFx0ICogICAgIC8vIHRva2VucyBhZnRlciAnY29tbWVudCdcblx0XHRcdCAqIH0pO1xuXHRcdFx0ICogYGBgXG5cdFx0XHQgKlxuXHRcdFx0ICogIyMgTGltaXRhdGlvbnNcblx0XHRcdCAqXG5cdFx0XHQgKiBUaGUgbWFpbiBwcm9ibGVtIGBpbnNlcnRCZWZvcmVgIGhhcyB0byBzb2x2ZSBpcyBpdGVyYXRpb24gb3JkZXIuIFNpbmNlIEVTMjAxNSwgdGhlIGl0ZXJhdGlvbiBvcmRlciBmb3Igb2JqZWN0XG5cdFx0XHQgKiBwcm9wZXJ0aWVzIGlzIGd1YXJhbnRlZWQgdG8gYmUgdGhlIGluc2VydGlvbiBvcmRlciAoZXhjZXB0IGZvciBpbnRlZ2VyIGtleXMpIGJ1dCBzb21lIGJyb3dzZXJzIGJlaGF2ZVxuXHRcdFx0ICogZGlmZmVyZW50bHkgd2hlbiBrZXlzIGFyZSBkZWxldGVkIGFuZCByZS1pbnNlcnRlZC4gU28gYGluc2VydEJlZm9yZWAgY2FuJ3QgYmUgaW1wbGVtZW50ZWQgYnkgdGVtcG9yYXJpbHlcblx0XHRcdCAqIGRlbGV0aW5nIHByb3BlcnRpZXMgd2hpY2ggaXMgbmVjZXNzYXJ5IHRvIGluc2VydCBhdCBhcmJpdHJhcnkgcG9zaXRpb25zLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRvIHNvbHZlIHRoaXMgcHJvYmxlbSwgYGluc2VydEJlZm9yZWAgZG9lc24ndCBhY3R1YWxseSBpbnNlcnQgdGhlIGdpdmVuIHRva2VucyBpbnRvIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHRcdFx0ICogSW5zdGVhZCwgaXQgd2lsbCBjcmVhdGUgYSBuZXcgb2JqZWN0IGFuZCByZXBsYWNlIGFsbCByZWZlcmVuY2VzIHRvIHRoZSB0YXJnZXQgb2JqZWN0IHdpdGggdGhlIG5ldyBvbmUuIFRoaXNcblx0XHRcdCAqIGNhbiBiZSBkb25lIHdpdGhvdXQgdGVtcG9yYXJpbHkgZGVsZXRpbmcgcHJvcGVydGllcywgc28gdGhlIGl0ZXJhdGlvbiBvcmRlciBpcyB3ZWxsLWRlZmluZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogSG93ZXZlciwgb25seSByZWZlcmVuY2VzIHRoYXQgY2FuIGJlIHJlYWNoZWQgZnJvbSBgUHJpc20ubGFuZ3VhZ2VzYCBvciBgaW5zZXJ0YCB3aWxsIGJlIHJlcGxhY2VkLiBJLmUuIGlmXG5cdFx0XHQgKiB5b3UgaG9sZCB0aGUgdGFyZ2V0IG9iamVjdCBpbiBhIHZhcmlhYmxlLCB0aGVuIHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGUgd2lsbCBub3QgY2hhbmdlLlxuXHRcdFx0ICpcblx0XHRcdCAqIGBgYGpzXG5cdFx0XHQgKiB2YXIgb2xkTWFya3VwID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblx0XHRcdCAqIHZhciBuZXdNYXJrdXAgPSBQcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdtYXJrdXAnLCAnY29tbWVudCcsIHsgLi4uIH0pO1xuXHRcdFx0ICpcblx0XHRcdCAqIGFzc2VydChvbGRNYXJrdXAgIT09IFByaXNtLmxhbmd1YWdlcy5tYXJrdXApO1xuXHRcdFx0ICogYXNzZXJ0KG5ld01hcmt1cCA9PT0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCk7XG5cdFx0XHQgKiBgYGBcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaW5zaWRlIFRoZSBwcm9wZXJ0eSBvZiBgcm9vdGAgKGUuZy4gYSBsYW5ndWFnZSBpZCBpbiBgUHJpc20ubGFuZ3VhZ2VzYCkgdGhhdCBjb250YWlucyB0aGVcblx0XHRcdCAqIG9iamVjdCB0byBiZSBtb2RpZmllZC5cblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBiZWZvcmUgVGhlIGtleSB0byBpbnNlcnQgYmVmb3JlLlxuXHRcdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBpbnNlcnQgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleS12YWx1ZSBwYWlycyB0byBiZSBpbnNlcnRlZC5cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gW3Jvb3RdIFRoZSBvYmplY3QgY29udGFpbmluZyBgaW5zaWRlYCwgaS5lLiB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG5cdFx0XHQgKiBvYmplY3QgdG8gYmUgbW9kaWZpZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogRGVmYXVsdHMgdG8gYFByaXNtLmxhbmd1YWdlc2AuXG5cdFx0XHQgKiBAcmV0dXJucyB7R3JhbW1hcn0gVGhlIG5ldyBncmFtbWFyIG9iamVjdC5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0aW5zZXJ0QmVmb3JlOiBmdW5jdGlvbiAoaW5zaWRlLCBiZWZvcmUsIGluc2VydCwgcm9vdCkge1xuXHRcdFx0XHRyb290ID0gcm9vdCB8fCAvKiogQHR5cGUge2FueX0gKi8gKF8ubGFuZ3VhZ2VzKTtcblx0XHRcdFx0dmFyIGdyYW1tYXIgPSByb290W2luc2lkZV07XG5cdFx0XHRcdC8qKiBAdHlwZSB7R3JhbW1hcn0gKi9cblx0XHRcdFx0dmFyIHJldCA9IHt9O1xuXG5cdFx0XHRcdGZvciAodmFyIHRva2VuIGluIGdyYW1tYXIpIHtcblx0XHRcdFx0XHRpZiAoZ3JhbW1hci5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcblxuXHRcdFx0XHRcdFx0aWYgKHRva2VuID09IGJlZm9yZSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBuZXdUb2tlbiBpbiBpbnNlcnQpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoaW5zZXJ0Lmhhc093blByb3BlcnR5KG5ld1Rva2VuKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0W25ld1Rva2VuXSA9IGluc2VydFtuZXdUb2tlbl07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIERvIG5vdCBpbnNlcnQgdG9rZW4gd2hpY2ggYWxzbyBvY2N1ciBpbiBpbnNlcnQuIFNlZSAjMTUyNVxuXHRcdFx0XHRcdFx0aWYgKCFpbnNlcnQuaGFzT3duUHJvcGVydHkodG9rZW4pKSB7XG5cdFx0XHRcdFx0XHRcdHJldFt0b2tlbl0gPSBncmFtbWFyW3Rva2VuXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgb2xkID0gcm9vdFtpbnNpZGVdO1xuXHRcdFx0XHRyb290W2luc2lkZV0gPSByZXQ7XG5cblx0XHRcdFx0Ly8gVXBkYXRlIHJlZmVyZW5jZXMgaW4gb3RoZXIgbGFuZ3VhZ2UgZGVmaW5pdGlvbnNcblx0XHRcdFx0Xy5sYW5ndWFnZXMuREZTKF8ubGFuZ3VhZ2VzLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gb2xkICYmIGtleSAhPSBpbnNpZGUpIHtcblx0XHRcdFx0XHRcdHRoaXNba2V5XSA9IHJldDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBUcmF2ZXJzZSBhIGxhbmd1YWdlIGRlZmluaXRpb24gd2l0aCBEZXB0aCBGaXJzdCBTZWFyY2hcblx0XHRcdERGUzogZnVuY3Rpb24gREZTKG8sIGNhbGxiYWNrLCB0eXBlLCB2aXNpdGVkKSB7XG5cdFx0XHRcdHZpc2l0ZWQgPSB2aXNpdGVkIHx8IHt9O1xuXG5cdFx0XHRcdHZhciBvYmpJZCA9IF8udXRpbC5vYmpJZDtcblxuXHRcdFx0XHRmb3IgKHZhciBpIGluIG8pIHtcblx0XHRcdFx0XHRpZiAoby5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChvLCBpLCBvW2ldLCB0eXBlIHx8IGkpO1xuXG5cdFx0XHRcdFx0XHR2YXIgcHJvcGVydHkgPSBvW2ldO1xuXHRcdFx0XHRcdFx0dmFyIHByb3BlcnR5VHlwZSA9IF8udXRpbC50eXBlKHByb3BlcnR5KTtcblxuXHRcdFx0XHRcdFx0aWYgKHByb3BlcnR5VHlwZSA9PT0gJ09iamVjdCcgJiYgIXZpc2l0ZWRbb2JqSWQocHJvcGVydHkpXSkge1xuXHRcdFx0XHRcdFx0XHR2aXNpdGVkW29iaklkKHByb3BlcnR5KV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRERlMocHJvcGVydHksIGNhbGxiYWNrLCBudWxsLCB2aXNpdGVkKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocHJvcGVydHlUeXBlID09PSAnQXJyYXknICYmICF2aXNpdGVkW29iaklkKHByb3BlcnR5KV0pIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZFtvYmpJZChwcm9wZXJ0eSldID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0REZTKHByb3BlcnR5LCBjYWxsYmFjaywgaSwgdmlzaXRlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHBsdWdpbnM6IHt9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBpcyB0aGUgbW9zdCBoaWdoLWxldmVsIGZ1bmN0aW9uIGluIFByaXNt4oCZcyBBUEkuXG5cdFx0ICogSXQgZmV0Y2hlcyBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIGAubGFuZ3VhZ2UteHh4eGAgY2xhc3MgYW5kIHRoZW4gY2FsbHMge0BsaW5rIFByaXNtLmhpZ2hsaWdodEVsZW1lbnR9IG9uXG5cdFx0ICogZWFjaCBvbmUgb2YgdGhlbS5cblx0XHQgKlxuXHRcdCAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byBgUHJpc20uaGlnaGxpZ2h0QWxsVW5kZXIoZG9jdW1lbnQsIGFzeW5jLCBjYWxsYmFjaylgLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIFNhbWUgYXMgaW4ge0BsaW5rIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyfS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0QWxsOiBmdW5jdGlvbiAoYXN5bmMsIGNhbGxiYWNrKSB7XG5cdFx0XHRfLmhpZ2hsaWdodEFsbFVuZGVyKGRvY3VtZW50LCBhc3luYywgY2FsbGJhY2spO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBGZXRjaGVzIGFsbCB0aGUgZGVzY2VuZGFudHMgb2YgYGNvbnRhaW5lcmAgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyBhbmQgdGhlbiBjYWxsc1xuXHRcdCAqIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBvbiBlYWNoIG9uZSBvZiB0aGVtLlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLWhpZ2hsaWdodGFsbGBcblx0XHQgKiAyLiBgYmVmb3JlLWFsbC1lbGVtZW50cy1oaWdobGlnaHRgXG5cdFx0ICogMy4gQWxsIGhvb2tzIG9mIHtAbGluayBQcmlzbS5oaWdobGlnaHRFbGVtZW50fSBmb3IgZWFjaCBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtQYXJlbnROb2RlfSBjb250YWluZXIgVGhlIHJvb3QgZWxlbWVudCwgd2hvc2UgZGVzY2VuZGFudHMgdGhhdCBoYXZlIGEgYC5sYW5ndWFnZS14eHh4YCBjbGFzcyB3aWxsIGJlIGhpZ2hsaWdodGVkLlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FzeW5jPWZhbHNlXSBXaGV0aGVyIGVhY2ggZWxlbWVudCBpcyB0byBiZSBoaWdobGlnaHRlZCBhc3luY2hyb25vdXNseSB1c2luZyBXZWIgV29ya2Vycy5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZWFjaCBlbGVtZW50IGFmdGVyIGl0cyBoaWdobGlnaHRpbmcgaXMgZG9uZS5cblx0XHQgKiBAbWVtYmVyb2YgUHJpc21cblx0XHQgKiBAcHVibGljXG5cdFx0ICovXG5cdFx0aGlnaGxpZ2h0QWxsVW5kZXI6IGZ1bmN0aW9uIChjb250YWluZXIsIGFzeW5jLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0Y2FsbGJhY2s6IGNhbGxiYWNrLFxuXHRcdFx0XHRjb250YWluZXI6IGNvbnRhaW5lcixcblx0XHRcdFx0c2VsZWN0b3I6ICdjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXSwgW2NsYXNzKj1cImxhbmd1YWdlLVwiXSBjb2RlLCBjb2RlW2NsYXNzKj1cImxhbmctXCJdLCBbY2xhc3MqPVwibGFuZy1cIl0gY29kZSdcblx0XHRcdH07XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtaGlnaGxpZ2h0YWxsJywgZW52KTtcblxuXHRcdFx0ZW52LmVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGVudi5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChlbnYuc2VsZWN0b3IpKTtcblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1hbGwtZWxlbWVudHMtaGlnaGxpZ2h0JywgZW52KTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGVsZW1lbnQ7IChlbGVtZW50ID0gZW52LmVsZW1lbnRzW2krK10pOykge1xuXHRcdFx0XHRfLmhpZ2hsaWdodEVsZW1lbnQoZWxlbWVudCwgYXN5bmMgPT09IHRydWUsIGVudi5jYWxsYmFjayk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEhpZ2hsaWdodHMgdGhlIGNvZGUgaW5zaWRlIGEgc2luZ2xlIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBUaGUgZm9sbG93aW5nIGhvb2tzIHdpbGwgYmUgcnVuOlxuXHRcdCAqIDEuIGBiZWZvcmUtc2FuaXR5LWNoZWNrYFxuXHRcdCAqIDIuIGBiZWZvcmUtaGlnaGxpZ2h0YFxuXHRcdCAqIDMuIEFsbCBob29rcyBvZiB7QGxpbmsgUHJpc20uaGlnaGxpZ2h0fS4gVGhlc2UgaG9va3Mgd2lsbCBiZSBydW4gYnkgYW4gYXN5bmNocm9ub3VzIHdvcmtlciBpZiBgYXN5bmNgIGlzIGB0cnVlYC5cblx0XHQgKiA0LiBgYmVmb3JlLWluc2VydGBcblx0XHQgKiA1LiBgYWZ0ZXItaGlnaGxpZ2h0YFxuXHRcdCAqIDYuIGBjb21wbGV0ZWBcblx0XHQgKlxuXHRcdCAqIFNvbWUgdGhlIGFib3ZlIGhvb2tzIHdpbGwgYmUgc2tpcHBlZCBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGNvbnRhaW4gYW55IHRleHQgb3IgdGhlcmUgaXMgbm8gZ3JhbW1hciBsb2FkZWQgZm9yXG5cdFx0ICogdGhlIGVsZW1lbnQncyBsYW5ndWFnZS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBjb2RlLlxuXHRcdCAqIEl0IG11c3QgaGF2ZSBhIGNsYXNzIG9mIGBsYW5ndWFnZS14eHh4YCB0byBiZSBwcm9jZXNzZWQsIHdoZXJlIGB4eHh4YCBpcyBhIHZhbGlkIGxhbmd1YWdlIGlkZW50aWZpZXIuXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbYXN5bmM9ZmFsc2VdIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgdG8gYmUgaGlnaGxpZ2h0ZWQgYXN5bmNocm9ub3VzbHkgdXNpbmcgV2ViIFdvcmtlcnNcblx0XHQgKiB0byBpbXByb3ZlIHBlcmZvcm1hbmNlIGFuZCBhdm9pZCBibG9ja2luZyB0aGUgVUkgd2hlbiBoaWdobGlnaHRpbmcgdmVyeSBsYXJnZSBjaHVua3Mgb2YgY29kZS4gVGhpcyBvcHRpb24gaXNcblx0XHQgKiBbZGlzYWJsZWQgYnkgZGVmYXVsdF0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9mYXEuaHRtbCN3aHktaXMtYXN5bmNocm9ub3VzLWhpZ2hsaWdodGluZy1kaXNhYmxlZC1ieS1kZWZhdWx0KS5cblx0XHQgKlxuXHRcdCAqIE5vdGU6IEFsbCBsYW5ndWFnZSBkZWZpbml0aW9ucyByZXF1aXJlZCB0byBoaWdobGlnaHQgdGhlIGNvZGUgbXVzdCBiZSBpbmNsdWRlZCBpbiB0aGUgbWFpbiBgcHJpc20uanNgIGZpbGUgZm9yXG5cdFx0ICogYXN5bmNocm9ub3VzIGhpZ2hsaWdodGluZyB0byB3b3JrLiBZb3UgY2FuIGJ1aWxkIHlvdXIgb3duIGJ1bmRsZSBvbiB0aGVcblx0XHQgKiBbRG93bmxvYWQgcGFnZV0oaHR0cHM6Ly9wcmlzbWpzLmNvbS9kb3dubG9hZC5odG1sKS5cblx0XHQgKiBAcGFyYW0ge0hpZ2hsaWdodENhbGxiYWNrfSBbY2FsbGJhY2tdIEFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIGhpZ2hsaWdodGluZyBpcyBkb25lLlxuXHRcdCAqIE1vc3RseSB1c2VmdWwgd2hlbiBgYXN5bmNgIGlzIGB0cnVlYCwgc2luY2UgaW4gdGhhdCBjYXNlLCB0aGUgaGlnaGxpZ2h0aW5nIGlzIGRvbmUgYXN5bmNocm9ub3VzbHkuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdGhpZ2hsaWdodEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBhc3luYywgY2FsbGJhY2spIHtcblx0XHRcdC8vIEZpbmQgbGFuZ3VhZ2Vcblx0XHRcdHZhciBsYW5ndWFnZSA9IF8udXRpbC5nZXRMYW5ndWFnZShlbGVtZW50KTtcblx0XHRcdHZhciBncmFtbWFyID0gXy5sYW5ndWFnZXNbbGFuZ3VhZ2VdO1xuXG5cdFx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIGVsZW1lbnQsIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobGFuZywgJycpLnJlcGxhY2UoL1xccysvZywgJyAnKSArICcgbGFuZ3VhZ2UtJyArIGxhbmd1YWdlO1xuXG5cdFx0XHQvLyBTZXQgbGFuZ3VhZ2Ugb24gdGhlIHBhcmVudCwgZm9yIHN0eWxpbmdcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJykge1xuXHRcdFx0XHRwYXJlbnQuY2xhc3NOYW1lID0gcGFyZW50LmNsYXNzTmFtZS5yZXBsYWNlKGxhbmcsICcnKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnIGxhbmd1YWdlLScgKyBsYW5ndWFnZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvZGUgPSBlbGVtZW50LnRleHRDb250ZW50O1xuXG5cdFx0XHR2YXIgZW52ID0ge1xuXHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRsYW5ndWFnZTogbGFuZ3VhZ2UsXG5cdFx0XHRcdGdyYW1tYXI6IGdyYW1tYXIsXG5cdFx0XHRcdGNvZGU6IGNvZGVcblx0XHRcdH07XG5cblx0XHRcdGZ1bmN0aW9uIGluc2VydEhpZ2hsaWdodGVkQ29kZShoaWdobGlnaHRlZENvZGUpIHtcblx0XHRcdFx0ZW52LmhpZ2hsaWdodGVkQ29kZSA9IGhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0XHRfLmhvb2tzLnJ1bignYmVmb3JlLWluc2VydCcsIGVudik7XG5cblx0XHRcdFx0ZW52LmVsZW1lbnQuaW5uZXJIVE1MID0gZW52LmhpZ2hsaWdodGVkQ29kZTtcblxuXHRcdFx0XHRfLmhvb2tzLnJ1bignYWZ0ZXItaGlnaGxpZ2h0JywgZW52KTtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0XHR9XG5cblx0XHRcdF8uaG9va3MucnVuKCdiZWZvcmUtc2FuaXR5LWNoZWNrJywgZW52KTtcblxuXHRcdFx0Ly8gcGx1Z2lucyBtYXkgY2hhbmdlL2FkZCB0aGUgcGFyZW50L2VsZW1lbnRcblx0XHRcdHBhcmVudCA9IGVudi5lbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAncHJlJyAmJiAhcGFyZW50Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSkge1xuXHRcdFx0XHRwYXJlbnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZW52LmNvZGUpIHtcblx0XHRcdFx0Xy5ob29rcy5ydW4oJ2NvbXBsZXRlJywgZW52KTtcblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbChlbnYuZWxlbWVudCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS1oaWdobGlnaHQnLCBlbnYpO1xuXG5cdFx0XHRpZiAoIWVudi5ncmFtbWFyKSB7XG5cdFx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShfLnV0aWwuZW5jb2RlKGVudi5jb2RlKSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGFzeW5jICYmIF9zZWxmLldvcmtlcikge1xuXHRcdFx0XHR2YXIgd29ya2VyID0gbmV3IFdvcmtlcihfLmZpbGVuYW1lKTtcblxuXHRcdFx0XHR3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2dCkge1xuXHRcdFx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShldnQuZGF0YSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0d29ya2VyLnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdFx0XHRsYW5ndWFnZTogZW52Lmxhbmd1YWdlLFxuXHRcdFx0XHRcdGNvZGU6IGVudi5jb2RlLFxuXHRcdFx0XHRcdGltbWVkaWF0ZUNsb3NlOiB0cnVlXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGluc2VydEhpZ2hsaWdodGVkQ29kZShfLmhpZ2hsaWdodChlbnYuY29kZSwgZW52LmdyYW1tYXIsIGVudi5sYW5ndWFnZSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBMb3ctbGV2ZWwgZnVuY3Rpb24sIG9ubHkgdXNlIGlmIHlvdSBrbm93IHdoYXQgeW914oCZcmUgZG9pbmcuIEl0IGFjY2VwdHMgYSBzdHJpbmcgb2YgdGV4dCBhcyBpbnB1dFxuXHRcdCAqIGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgdG8gdXNlLCBhbmQgcmV0dXJucyBhIHN0cmluZyB3aXRoIHRoZSBIVE1MIHByb2R1Y2VkLlxuXHRcdCAqXG5cdFx0ICogVGhlIGZvbGxvd2luZyBob29rcyB3aWxsIGJlIHJ1bjpcblx0XHQgKiAxLiBgYmVmb3JlLXRva2VuaXplYFxuXHRcdCAqIDIuIGBhZnRlci10b2tlbml6ZWBcblx0XHQgKiAzLiBgd3JhcGA6IE9uIGVhY2gge0BsaW5rIFRva2VufS5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IEEgc3RyaW5nIHdpdGggdGhlIGNvZGUgdG8gYmUgaGlnaGxpZ2h0ZWQuXG5cdFx0ICogQHBhcmFtIHtHcmFtbWFyfSBncmFtbWFyIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSB0b2tlbnMgdG8gdXNlLlxuXHRcdCAqXG5cdFx0ICogVXN1YWxseSBhIGxhbmd1YWdlIGRlZmluaXRpb24gbGlrZSBgUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cGAuXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIFRoZSBuYW1lIG9mIHRoZSBsYW5ndWFnZSBkZWZpbml0aW9uIHBhc3NlZCB0byBgZ3JhbW1hcmAuXG5cdFx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIGhpZ2hsaWdodGVkIEhUTUwuXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogUHJpc20uaGlnaGxpZ2h0KCd2YXIgZm9vID0gdHJ1ZTsnLCBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCwgJ2phdmFzY3JpcHQnKTtcblx0XHQgKi9cblx0XHRoaWdobGlnaHQ6IGZ1bmN0aW9uICh0ZXh0LCBncmFtbWFyLCBsYW5ndWFnZSkge1xuXHRcdFx0dmFyIGVudiA9IHtcblx0XHRcdFx0Y29kZTogdGV4dCxcblx0XHRcdFx0Z3JhbW1hcjogZ3JhbW1hcixcblx0XHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlXG5cdFx0XHR9O1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2JlZm9yZS10b2tlbml6ZScsIGVudik7XG5cdFx0XHRlbnYudG9rZW5zID0gXy50b2tlbml6ZShlbnYuY29kZSwgZW52LmdyYW1tYXIpO1xuXHRcdFx0Xy5ob29rcy5ydW4oJ2FmdGVyLXRva2VuaXplJywgZW52KTtcblx0XHRcdHJldHVybiBUb2tlbi5zdHJpbmdpZnkoXy51dGlsLmVuY29kZShlbnYudG9rZW5zKSwgZW52Lmxhbmd1YWdlKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBpcyB0aGUgaGVhcnQgb2YgUHJpc20sIGFuZCB0aGUgbW9zdCBsb3ctbGV2ZWwgZnVuY3Rpb24geW91IGNhbiB1c2UuIEl0IGFjY2VwdHMgYSBzdHJpbmcgb2YgdGV4dCBhcyBpbnB1dFxuXHRcdCAqIGFuZCB0aGUgbGFuZ3VhZ2UgZGVmaW5pdGlvbnMgdG8gdXNlLCBhbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSB0b2tlbml6ZWQgY29kZS5cblx0XHQgKlxuXHRcdCAqIFdoZW4gdGhlIGxhbmd1YWdlIGRlZmluaXRpb24gaW5jbHVkZXMgbmVzdGVkIHRva2VucywgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCByZWN1cnNpdmVseSBvbiBlYWNoIG9mIHRoZXNlIHRva2Vucy5cblx0XHQgKlxuXHRcdCAqIFRoaXMgbWV0aG9kIGNvdWxkIGJlIHVzZWZ1bCBpbiBvdGhlciBjb250ZXh0cyBhcyB3ZWxsLCBhcyBhIHZlcnkgY3J1ZGUgcGFyc2VyLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgQSBzdHJpbmcgd2l0aCB0aGUgY29kZSB0byBiZSBoaWdobGlnaHRlZC5cblx0XHQgKiBAcGFyYW0ge0dyYW1tYXJ9IGdyYW1tYXIgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHRva2VucyB0byB1c2UuXG5cdFx0ICpcblx0XHQgKiBVc3VhbGx5IGEgbGFuZ3VhZ2UgZGVmaW5pdGlvbiBsaWtlIGBQcmlzbS5sYW5ndWFnZXMubWFya3VwYC5cblx0XHQgKiBAcmV0dXJucyB7VG9rZW5TdHJlYW19IEFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHRva2VucywgYSB0b2tlbiBzdHJlYW0uXG5cdFx0ICogQG1lbWJlcm9mIFByaXNtXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICogbGV0IGNvZGUgPSBgdmFyIGZvbyA9IDA7YDtcblx0XHQgKiBsZXQgdG9rZW5zID0gUHJpc20udG9rZW5pemUoY29kZSwgUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQpO1xuXHRcdCAqIHRva2Vucy5mb3JFYWNoKHRva2VuID0+IHtcblx0XHQgKiAgICAgaWYgKHRva2VuIGluc3RhbmNlb2YgUHJpc20uVG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHQgKiAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBudW1lcmljIGxpdGVyYWw6ICR7dG9rZW4uY29udGVudH1gKTtcblx0XHQgKiAgICAgfVxuXHRcdCAqIH0pO1xuXHRcdCAqL1xuXHRcdHRva2VuaXplOiBmdW5jdGlvbiAodGV4dCwgZ3JhbW1hcikge1xuXHRcdFx0dmFyIHJlc3QgPSBncmFtbWFyLnJlc3Q7XG5cdFx0XHRpZiAocmVzdCkge1xuXHRcdFx0XHRmb3IgKHZhciB0b2tlbiBpbiByZXN0KSB7XG5cdFx0XHRcdFx0Z3JhbW1hclt0b2tlbl0gPSByZXN0W3Rva2VuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRlbGV0ZSBncmFtbWFyLnJlc3Q7XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2tlbkxpc3QgPSBuZXcgTGlua2VkTGlzdCgpO1xuXHRcdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCB0b2tlbkxpc3QuaGVhZCwgdGV4dCk7XG5cblx0XHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHRva2VuTGlzdC5oZWFkLCAwKTtcblxuXHRcdFx0cmV0dXJuIHRvQXJyYXkodG9rZW5MaXN0KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQG5hbWVzcGFjZVxuXHRcdCAqIEBtZW1iZXJvZiBQcmlzbVxuXHRcdCAqIEBwdWJsaWNcblx0XHQgKi9cblx0XHRob29rczoge1xuXHRcdFx0YWxsOiB7fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBBZGRzIHRoZSBnaXZlbiBjYWxsYmFjayB0byB0aGUgbGlzdCBvZiBjYWxsYmFja3MgZm9yIHRoZSBnaXZlbiBob29rLlxuXHRcdFx0ICpcblx0XHRcdCAqIFRoZSBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaG9vayBpdCBpcyByZWdpc3RlcmVkIGZvciBpcyBydW4uXG5cdFx0XHQgKiBIb29rcyBhcmUgdXN1YWxseSBkaXJlY3RseSBydW4gYnkgYSBoaWdobGlnaHQgZnVuY3Rpb24gYnV0IHlvdSBjYW4gYWxzbyBydW4gaG9va3MgeW91cnNlbGYuXG5cdFx0XHQgKlxuXHRcdFx0ICogT25lIGNhbGxiYWNrIGZ1bmN0aW9uIGNhbiBiZSByZWdpc3RlcmVkIHRvIG11bHRpcGxlIGhvb2tzIGFuZCB0aGUgc2FtZSBob29rIG11bHRpcGxlIHRpbWVzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rLlxuXHRcdFx0ICogQHBhcmFtIHtIb29rQ2FsbGJhY2t9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aGljaCBpcyBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGFkZDogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBob29rcyA9IF8uaG9va3MuYWxsO1xuXG5cdFx0XHRcdGhvb2tzW25hbWVdID0gaG9va3NbbmFtZV0gfHwgW107XG5cblx0XHRcdFx0aG9va3NbbmFtZV0ucHVzaChjYWxsYmFjayk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJ1bnMgYSBob29rIGludm9raW5nIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG5cdFx0XHQgKlxuXHRcdFx0ICogQ2FsbGJhY2tzIHdpbGwgYmUgaW52b2tlZCBzeW5jaHJvbm91c2x5IGFuZCBpbiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIHJlZ2lzdGVyZWQuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGhvb2suXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IGVudiBUaGUgZW52aXJvbm1lbnQgdmFyaWFibGVzIG9mIHRoZSBob29rIHBhc3NlZCB0byBhbGwgY2FsbGJhY2tzIHJlZ2lzdGVyZWQuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdHJ1bjogZnVuY3Rpb24gKG5hbWUsIGVudikge1xuXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gXy5ob29rcy5hbGxbbmFtZV07XG5cblx0XHRcdFx0aWYgKCFjYWxsYmFja3MgfHwgIWNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgY2FsbGJhY2s7IChjYWxsYmFjayA9IGNhbGxiYWNrc1tpKytdKTspIHtcblx0XHRcdFx0XHRjYWxsYmFjayhlbnYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdFRva2VuOiBUb2tlblxuXHR9O1xuXHRfc2VsZi5QcmlzbSA9IF87XG5cblxuXHQvLyBUeXBlc2NyaXB0IG5vdGU6XG5cdC8vIFRoZSBmb2xsb3dpbmcgY2FuIGJlIHVzZWQgdG8gaW1wb3J0IHRoZSBUb2tlbiB0eXBlIGluIEpTRG9jOlxuXHQvL1xuXHQvLyAgIEB0eXBlZGVmIHtJbnN0YW5jZVR5cGU8aW1wb3J0KFwiLi9wcmlzbS1jb3JlXCIpW1wiVG9rZW5cIl0+fSBUb2tlblxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IHRva2VuLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBTZWUge0BsaW5rIFRva2VuI3R5cGUgdHlwZX1cblx0ICogQHBhcmFtIHtzdHJpbmcgfCBUb2tlblN0cmVhbX0gY29udGVudCBTZWUge0BsaW5rIFRva2VuI2NvbnRlbnQgY29udGVudH1cblx0ICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IFthbGlhc10gVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbbWF0Y2hlZFN0cj1cIlwiXSBBIGNvcHkgb2YgdGhlIGZ1bGwgc3RyaW5nIHRoaXMgdG9rZW4gd2FzIGNyZWF0ZWQgZnJvbS5cblx0ICogQGNsYXNzXG5cdCAqIEBnbG9iYWxcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0ZnVuY3Rpb24gVG9rZW4odHlwZSwgY29udGVudCwgYWxpYXMsIG1hdGNoZWRTdHIpIHtcblx0XHQvKipcblx0XHQgKiBUaGUgdHlwZSBvZiB0aGUgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBUaGlzIGlzIHVzdWFsbHkgdGhlIGtleSBvZiBhIHBhdHRlcm4gaW4gYSB7QGxpbmsgR3JhbW1hcn0uXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfVxuXHRcdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdFx0LyoqXG5cdFx0ICogVGhlIHN0cmluZ3Mgb3IgdG9rZW5zIGNvbnRhaW5lZCBieSB0aGlzIHRva2VuLlxuXHRcdCAqXG5cdFx0ICogVGhpcyB3aWxsIGJlIGEgdG9rZW4gc3RyZWFtIGlmIHRoZSBwYXR0ZXJuIG1hdGNoZWQgYWxzbyBkZWZpbmVkIGFuIGBpbnNpZGVgIGdyYW1tYXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nIHwgVG9rZW5TdHJlYW19XG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG5cdFx0LyoqXG5cdFx0ICogVGhlIGFsaWFzKGVzKSBvZiB0aGUgdG9rZW4uXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7c3RyaW5nfHN0cmluZ1tdfVxuXHRcdCAqIEBzZWUgR3JhbW1hclRva2VuXG5cdFx0ICogQHB1YmxpY1xuXHRcdCAqL1xuXHRcdHRoaXMuYWxpYXMgPSBhbGlhcztcblx0XHQvLyBDb3B5IG9mIHRoZSBmdWxsIHN0cmluZyB0aGlzIHRva2VuIHdhcyBjcmVhdGVkIGZyb21cblx0XHR0aGlzLmxlbmd0aCA9IChtYXRjaGVkU3RyIHx8ICcnKS5sZW5ndGggfCAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgdG9rZW4gc3RyZWFtIGlzIGFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIHtAbGluayBUb2tlbiBUb2tlbn0gb2JqZWN0cy5cblx0ICpcblx0ICogVG9rZW4gc3RyZWFtcyBoYXZlIHRvIGZ1bGZpbGwgYSBmZXcgcHJvcGVydGllcyB0aGF0IGFyZSBhc3N1bWVkIGJ5IG1vc3QgZnVuY3Rpb25zIChtb3N0bHkgaW50ZXJuYWwgb25lcykgdGhhdCBwcm9jZXNzXG5cdCAqIHRoZW0uXG5cdCAqXG5cdCAqIDEuIE5vIGFkamFjZW50IHN0cmluZ3MuXG5cdCAqIDIuIE5vIGVtcHR5IHN0cmluZ3MuXG5cdCAqXG5cdCAqICAgIFRoZSBvbmx5IGV4Y2VwdGlvbiBoZXJlIGlzIHRoZSB0b2tlbiBzdHJlYW0gdGhhdCBvbmx5IGNvbnRhaW5zIHRoZSBlbXB0eSBzdHJpbmcgYW5kIG5vdGhpbmcgZWxzZS5cblx0ICpcblx0ICogQHR5cGVkZWYge0FycmF5PHN0cmluZyB8IFRva2VuPn0gVG9rZW5TdHJlYW1cblx0ICogQGdsb2JhbFxuXHQgKiBAcHVibGljXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdG9rZW4gb3IgdG9rZW4gc3RyZWFtIHRvIGFuIEhUTUwgcmVwcmVzZW50YXRpb24uXG5cdCAqXG5cdCAqIFRoZSBmb2xsb3dpbmcgaG9va3Mgd2lsbCBiZSBydW46XG5cdCAqIDEuIGB3cmFwYDogT24gZWFjaCB7QGxpbmsgVG9rZW59LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IFRva2VuIHwgVG9rZW5TdHJlYW19IG8gVGhlIHRva2VuIG9yIHRva2VuIHN0cmVhbSB0byBiZSBjb252ZXJ0ZWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBUaGUgbmFtZSBvZiBjdXJyZW50IGxhbmd1YWdlLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgSFRNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4gb3IgdG9rZW4gc3RyZWFtLlxuXHQgKiBAbWVtYmVyb2YgVG9rZW5cblx0ICogQHN0YXRpY1xuXHQgKi9cblx0VG9rZW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KG8sIGxhbmd1YWdlKSB7XG5cdFx0aWYgKHR5cGVvZiBvID09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gbztcblx0XHR9XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkobykpIHtcblx0XHRcdHZhciBzID0gJyc7XG5cdFx0XHRvLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cyArPSBzdHJpbmdpZnkoZSwgbGFuZ3VhZ2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcztcblx0XHR9XG5cblx0XHR2YXIgZW52ID0ge1xuXHRcdFx0dHlwZTogby50eXBlLFxuXHRcdFx0Y29udGVudDogc3RyaW5naWZ5KG8uY29udGVudCwgbGFuZ3VhZ2UpLFxuXHRcdFx0dGFnOiAnc3BhbicsXG5cdFx0XHRjbGFzc2VzOiBbJ3Rva2VuJywgby50eXBlXSxcblx0XHRcdGF0dHJpYnV0ZXM6IHt9LFxuXHRcdFx0bGFuZ3VhZ2U6IGxhbmd1YWdlXG5cdFx0fTtcblxuXHRcdHZhciBhbGlhc2VzID0gby5hbGlhcztcblx0XHRpZiAoYWxpYXNlcykge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoYWxpYXNlcykpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoZW52LmNsYXNzZXMsIGFsaWFzZXMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZW52LmNsYXNzZXMucHVzaChhbGlhc2VzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRfLmhvb2tzLnJ1bignd3JhcCcsIGVudik7XG5cblx0XHR2YXIgYXR0cmlidXRlcyA9ICcnO1xuXHRcdGZvciAodmFyIG5hbWUgaW4gZW52LmF0dHJpYnV0ZXMpIHtcblx0XHRcdGF0dHJpYnV0ZXMgKz0gJyAnICsgbmFtZSArICc9XCInICsgKGVudi5hdHRyaWJ1dGVzW25hbWVdIHx8ICcnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykgKyAnXCInO1xuXHRcdH1cblxuXHRcdHJldHVybiAnPCcgKyBlbnYudGFnICsgJyBjbGFzcz1cIicgKyBlbnYuY2xhc3Nlcy5qb2luKCcgJykgKyAnXCInICsgYXR0cmlidXRlcyArICc+JyArIGVudi5jb250ZW50ICsgJzwvJyArIGVudi50YWcgKyAnPic7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwb3Ncblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcblx0ICogQHBhcmFtIHtib29sZWFufSBsb29rYmVoaW5kXG5cdCAqIEByZXR1cm5zIHtSZWdFeHBFeGVjQXJyYXkgfCBudWxsfVxuXHQgKi9cblx0ZnVuY3Rpb24gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCkge1xuXHRcdHBhdHRlcm4ubGFzdEluZGV4ID0gcG9zO1xuXHRcdHZhciBtYXRjaCA9IHBhdHRlcm4uZXhlYyh0ZXh0KTtcblx0XHRpZiAobWF0Y2ggJiYgbG9va2JlaGluZCAmJiBtYXRjaFsxXSkge1xuXHRcdFx0Ly8gY2hhbmdlIHRoZSBtYXRjaCB0byByZW1vdmUgdGhlIHRleHQgbWF0Y2hlZCBieSB0aGUgUHJpc20gbG9va2JlaGluZCBncm91cFxuXHRcdFx0dmFyIGxvb2tiZWhpbmRMZW5ndGggPSBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRtYXRjaC5pbmRleCArPSBsb29rYmVoaW5kTGVuZ3RoO1xuXHRcdFx0bWF0Y2hbMF0gPSBtYXRjaFswXS5zbGljZShsb29rYmVoaW5kTGVuZ3RoKTtcblx0XHR9XG5cdFx0cmV0dXJuIG1hdGNoO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxzdHJpbmcgfCBUb2tlbj59IHRva2VuTGlzdFxuXHQgKiBAcGFyYW0ge2FueX0gZ3JhbW1hclxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3ROb2RlPHN0cmluZyB8IFRva2VuPn0gc3RhcnROb2RlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydFBvc1xuXHQgKiBAcGFyYW0ge1JlbWF0Y2hPcHRpb25zfSBbcmVtYXRjaF1cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqIEBwcml2YXRlXG5cdCAqXG5cdCAqIEB0eXBlZGVmIFJlbWF0Y2hPcHRpb25zXG5cdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXVzZVxuXHQgKiBAcHJvcGVydHkge251bWJlcn0gcmVhY2hcblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIHN0YXJ0Tm9kZSwgc3RhcnRQb3MsIHJlbWF0Y2gpIHtcblx0XHRmb3IgKHZhciB0b2tlbiBpbiBncmFtbWFyKSB7XG5cdFx0XHRpZiAoIWdyYW1tYXIuaGFzT3duUHJvcGVydHkodG9rZW4pIHx8ICFncmFtbWFyW3Rva2VuXSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhdHRlcm5zID0gZ3JhbW1hclt0b2tlbl07XG5cdFx0XHRwYXR0ZXJucyA9IEFycmF5LmlzQXJyYXkocGF0dGVybnMpID8gcGF0dGVybnMgOiBbcGF0dGVybnNdO1xuXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHBhdHRlcm5zLmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGlmIChyZW1hdGNoICYmIHJlbWF0Y2guY2F1c2UgPT0gdG9rZW4gKyAnLCcgKyBqKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHBhdHRlcm5PYmogPSBwYXR0ZXJuc1tqXTtcblx0XHRcdFx0dmFyIGluc2lkZSA9IHBhdHRlcm5PYmouaW5zaWRlO1xuXHRcdFx0XHR2YXIgbG9va2JlaGluZCA9ICEhcGF0dGVybk9iai5sb29rYmVoaW5kO1xuXHRcdFx0XHR2YXIgZ3JlZWR5ID0gISFwYXR0ZXJuT2JqLmdyZWVkeTtcblx0XHRcdFx0dmFyIGFsaWFzID0gcGF0dGVybk9iai5hbGlhcztcblxuXHRcdFx0XHRpZiAoZ3JlZWR5ICYmICFwYXR0ZXJuT2JqLnBhdHRlcm4uZ2xvYmFsKSB7XG5cdFx0XHRcdFx0Ly8gV2l0aG91dCB0aGUgZ2xvYmFsIGZsYWcsIGxhc3RJbmRleCB3b24ndCB3b3JrXG5cdFx0XHRcdFx0dmFyIGZsYWdzID0gcGF0dGVybk9iai5wYXR0ZXJuLnRvU3RyaW5nKCkubWF0Y2goL1tpbXN1eV0qJC8pWzBdO1xuXHRcdFx0XHRcdHBhdHRlcm5PYmoucGF0dGVybiA9IFJlZ0V4cChwYXR0ZXJuT2JqLnBhdHRlcm4uc291cmNlLCBmbGFncyArICdnJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvKiogQHR5cGUge1JlZ0V4cH0gKi9cblx0XHRcdFx0dmFyIHBhdHRlcm4gPSBwYXR0ZXJuT2JqLnBhdHRlcm4gfHwgcGF0dGVybk9iajtcblxuXHRcdFx0XHRmb3IgKCAvLyBpdGVyYXRlIHRoZSB0b2tlbiBsaXN0IGFuZCBrZWVwIHRyYWNrIG9mIHRoZSBjdXJyZW50IHRva2VuL3N0cmluZyBwb3NpdGlvblxuXHRcdFx0XHRcdHZhciBjdXJyZW50Tm9kZSA9IHN0YXJ0Tm9kZS5uZXh0LCBwb3MgPSBzdGFydFBvcztcblx0XHRcdFx0XHRjdXJyZW50Tm9kZSAhPT0gdG9rZW5MaXN0LnRhaWw7XG5cdFx0XHRcdFx0cG9zICs9IGN1cnJlbnROb2RlLnZhbHVlLmxlbmd0aCwgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0XG5cdFx0XHRcdCkge1xuXG5cdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgcG9zID49IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBzdHIgPSBjdXJyZW50Tm9kZS52YWx1ZTtcblxuXHRcdFx0XHRcdGlmICh0b2tlbkxpc3QubGVuZ3RoID4gdGV4dC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIFNvbWV0aGluZyB3ZW50IHRlcnJpYmx5IHdyb25nLCBBQk9SVCwgQUJPUlQhXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHN0ciBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcmVtb3ZlQ291bnQgPSAxOyAvLyB0aGlzIGlzIHRoZSB0byBwYXJhbWV0ZXIgb2YgcmVtb3ZlQmV0d2VlblxuXHRcdFx0XHRcdHZhciBtYXRjaDtcblxuXHRcdFx0XHRcdGlmIChncmVlZHkpIHtcblx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHBvcywgdGV4dCwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4O1xuXHRcdFx0XHRcdFx0dmFyIHRvID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR2YXIgcCA9IHBvcztcblxuXHRcdFx0XHRcdFx0Ly8gZmluZCB0aGUgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBtYXRjaFxuXHRcdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAoZnJvbSA+PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcblx0XHRcdFx0XHRcdFx0cCArPSBjdXJyZW50Tm9kZS52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBhZGp1c3QgcG9zIChhbmQgcClcblx0XHRcdFx0XHRcdHAgLT0gY3VycmVudE5vZGUudmFsdWUubGVuZ3RoO1xuXHRcdFx0XHRcdFx0cG9zID0gcDtcblxuXHRcdFx0XHRcdFx0Ly8gdGhlIGN1cnJlbnQgbm9kZSBpcyBhIFRva2VuLCB0aGVuIHRoZSBtYXRjaCBzdGFydHMgaW5zaWRlIGFub3RoZXIgVG9rZW4sIHdoaWNoIGlzIGludmFsaWRcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50Tm9kZS52YWx1ZSBpbnN0YW5jZW9mIFRva2VuKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBmaW5kIHRoZSBsYXN0IG5vZGUgd2hpY2ggaXMgYWZmZWN0ZWQgYnkgdGhpcyBtYXRjaFxuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0dmFyIGsgPSBjdXJyZW50Tm9kZTtcblx0XHRcdFx0XHRcdFx0ayAhPT0gdG9rZW5MaXN0LnRhaWwgJiYgKHAgPCB0byB8fCB0eXBlb2Ygay52YWx1ZSA9PT0gJ3N0cmluZycpO1xuXHRcdFx0XHRcdFx0XHRrID0gay5uZXh0XG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlQ291bnQrKztcblx0XHRcdFx0XHRcdFx0cCArPSBrLnZhbHVlLmxlbmd0aDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJlbW92ZUNvdW50LS07XG5cblx0XHRcdFx0XHRcdC8vIHJlcGxhY2Ugd2l0aCB0aGUgbmV3IG1hdGNoXG5cdFx0XHRcdFx0XHRzdHIgPSB0ZXh0LnNsaWNlKHBvcywgcCk7XG5cdFx0XHRcdFx0XHRtYXRjaC5pbmRleCAtPSBwb3M7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG1hdGNoID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIDAsIHN0ciwgbG9va2JlaGluZCk7XG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcblx0XHRcdFx0XHR2YXIgZnJvbSA9IG1hdGNoLmluZGV4O1xuXHRcdFx0XHRcdHZhciBtYXRjaFN0ciA9IG1hdGNoWzBdO1xuXHRcdFx0XHRcdHZhciBiZWZvcmUgPSBzdHIuc2xpY2UoMCwgZnJvbSk7XG5cdFx0XHRcdFx0dmFyIGFmdGVyID0gc3RyLnNsaWNlKGZyb20gKyBtYXRjaFN0ci5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0dmFyIHJlYWNoID0gcG9zICsgc3RyLmxlbmd0aDtcblx0XHRcdFx0XHRpZiAocmVtYXRjaCAmJiByZWFjaCA+IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdHJlbWF0Y2gucmVhY2ggPSByZWFjaDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgcmVtb3ZlRnJvbSA9IGN1cnJlbnROb2RlLnByZXY7XG5cblx0XHRcdFx0XHRpZiAoYmVmb3JlKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVGcm9tID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCBiZWZvcmUpO1xuXHRcdFx0XHRcdFx0cG9zICs9IGJlZm9yZS5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVtb3ZlUmFuZ2UodG9rZW5MaXN0LCByZW1vdmVGcm9tLCByZW1vdmVDb3VudCk7XG5cblx0XHRcdFx0XHR2YXIgd3JhcHBlZCA9IG5ldyBUb2tlbih0b2tlbiwgaW5zaWRlID8gXy50b2tlbml6ZShtYXRjaFN0ciwgaW5zaWRlKSA6IG1hdGNoU3RyLCBhbGlhcywgbWF0Y2hTdHIpO1xuXHRcdFx0XHRcdGN1cnJlbnROb2RlID0gYWRkQWZ0ZXIodG9rZW5MaXN0LCByZW1vdmVGcm9tLCB3cmFwcGVkKTtcblxuXHRcdFx0XHRcdGlmIChhZnRlcikge1xuXHRcdFx0XHRcdFx0YWRkQWZ0ZXIodG9rZW5MaXN0LCBjdXJyZW50Tm9kZSwgYWZ0ZXIpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZW1vdmVDb3VudCA+IDEpIHtcblx0XHRcdFx0XHRcdC8vIGF0IGxlYXN0IG9uZSBUb2tlbiBvYmplY3Qgd2FzIHJlbW92ZWQsIHNvIHdlIGhhdmUgdG8gZG8gc29tZSByZW1hdGNoaW5nXG5cdFx0XHRcdFx0XHQvLyB0aGlzIGNhbiBvbmx5IGhhcHBlbiBpZiB0aGUgY3VycmVudCBwYXR0ZXJuIGlzIGdyZWVkeVxuXG5cdFx0XHRcdFx0XHQvKiogQHR5cGUge1JlbWF0Y2hPcHRpb25zfSAqL1xuXHRcdFx0XHRcdFx0dmFyIG5lc3RlZFJlbWF0Y2ggPSB7XG5cdFx0XHRcdFx0XHRcdGNhdXNlOiB0b2tlbiArICcsJyArIGosXG5cdFx0XHRcdFx0XHRcdHJlYWNoOiByZWFjaFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdG1hdGNoR3JhbW1hcih0ZXh0LCB0b2tlbkxpc3QsIGdyYW1tYXIsIGN1cnJlbnROb2RlLnByZXYsIHBvcywgbmVzdGVkUmVtYXRjaCk7XG5cblx0XHRcdFx0XHRcdC8vIHRoZSByZWFjaCBtaWdodCBoYXZlIGJlZW4gZXh0ZW5kZWQgYmVjYXVzZSBvZiB0aGUgcmVtYXRjaGluZ1xuXHRcdFx0XHRcdFx0aWYgKHJlbWF0Y2ggJiYgbmVzdGVkUmVtYXRjaC5yZWFjaCA+IHJlbWF0Y2gucmVhY2gpIHtcblx0XHRcdFx0XHRcdFx0cmVtYXRjaC5yZWFjaCA9IG5lc3RlZFJlbWF0Y2gucmVhY2g7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEB0eXBlZGVmIExpbmtlZExpc3ROb2RlXG5cdCAqIEBwcm9wZXJ0eSB7VH0gdmFsdWVcblx0ICogQHByb3BlcnR5IHtMaW5rZWRMaXN0Tm9kZTxUPiB8IG51bGx9IHByZXYgVGhlIHByZXZpb3VzIG5vZGUuXG5cdCAqIEBwcm9wZXJ0eSB7TGlua2VkTGlzdE5vZGU8VD4gfCBudWxsfSBuZXh0IFRoZSBuZXh0IG5vZGUuXG5cdCAqIEB0ZW1wbGF0ZSBUXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHZhciBoZWFkID0geyB2YWx1ZTogbnVsbCwgcHJldjogbnVsbCwgbmV4dDogbnVsbCB9O1xuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dmFyIHRhaWwgPSB7IHZhbHVlOiBudWxsLCBwcmV2OiBoZWFkLCBuZXh0OiBudWxsIH07XG5cdFx0aGVhZC5uZXh0ID0gdGFpbDtcblxuXHRcdC8qKiBAdHlwZSB7TGlua2VkTGlzdE5vZGU8VD59ICovXG5cdFx0dGhpcy5oZWFkID0gaGVhZDtcblx0XHQvKiogQHR5cGUge0xpbmtlZExpc3ROb2RlPFQ+fSAqL1xuXHRcdHRoaXMudGFpbCA9IHRhaWw7XG5cdFx0dGhpcy5sZW5ndGggPSAwO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBuZXcgbm9kZSB3aXRoIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgbGlzdC5cblx0ICpcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0PFQ+fSBsaXN0XG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdE5vZGU8VD59IG5vZGVcblx0ICogQHBhcmFtIHtUfSB2YWx1ZVxuXHQgKiBAcmV0dXJucyB7TGlua2VkTGlzdE5vZGU8VD59IFRoZSBhZGRlZCBub2RlLlxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gYWRkQWZ0ZXIobGlzdCwgbm9kZSwgdmFsdWUpIHtcblx0XHQvLyBhc3N1bWVzIHRoYXQgbm9kZSAhPSBsaXN0LnRhaWwgJiYgdmFsdWVzLmxlbmd0aCA+PSAwXG5cdFx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cblx0XHR2YXIgbmV3Tm9kZSA9IHsgdmFsdWU6IHZhbHVlLCBwcmV2OiBub2RlLCBuZXh0OiBuZXh0IH07XG5cdFx0bm9kZS5uZXh0ID0gbmV3Tm9kZTtcblx0XHRuZXh0LnByZXYgPSBuZXdOb2RlO1xuXHRcdGxpc3QubGVuZ3RoKys7XG5cblx0XHRyZXR1cm4gbmV3Tm9kZTtcblx0fVxuXHQvKipcblx0ICogUmVtb3ZlcyBgY291bnRgIG5vZGVzIGFmdGVyIHRoZSBnaXZlbiBub2RlLiBUaGUgZ2l2ZW4gbm9kZSB3aWxsIG5vdCBiZSByZW1vdmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0xpbmtlZExpc3Q8VD59IGxpc3Rcblx0ICogQHBhcmFtIHtMaW5rZWRMaXN0Tm9kZTxUPn0gbm9kZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gY291bnRcblx0ICogQHRlbXBsYXRlIFRcblx0ICovXG5cdGZ1bmN0aW9uIHJlbW92ZVJhbmdlKGxpc3QsIG5vZGUsIGNvdW50KSB7XG5cdFx0dmFyIG5leHQgPSBub2RlLm5leHQ7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudCAmJiBuZXh0ICE9PSBsaXN0LnRhaWw7IGkrKykge1xuXHRcdFx0bmV4dCA9IG5leHQubmV4dDtcblx0XHR9XG5cdFx0bm9kZS5uZXh0ID0gbmV4dDtcblx0XHRuZXh0LnByZXYgPSBub2RlO1xuXHRcdGxpc3QubGVuZ3RoIC09IGk7XG5cdH1cblx0LyoqXG5cdCAqIEBwYXJhbSB7TGlua2VkTGlzdDxUPn0gbGlzdFxuXHQgKiBAcmV0dXJucyB7VFtdfVxuXHQgKiBAdGVtcGxhdGUgVFxuXHQgKi9cblx0ZnVuY3Rpb24gdG9BcnJheShsaXN0KSB7XG5cdFx0dmFyIGFycmF5ID0gW107XG5cdFx0dmFyIG5vZGUgPSBsaXN0LmhlYWQubmV4dDtcblx0XHR3aGlsZSAobm9kZSAhPT0gbGlzdC50YWlsKSB7XG5cdFx0XHRhcnJheS5wdXNoKG5vZGUudmFsdWUpO1xuXHRcdFx0bm9kZSA9IG5vZGUubmV4dDtcblx0XHR9XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9XG5cblxuXHRpZiAoIV9zZWxmLmRvY3VtZW50KSB7XG5cdFx0aWYgKCFfc2VsZi5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHQvLyBpbiBOb2RlLmpzXG5cdFx0XHRyZXR1cm4gXztcblx0XHR9XG5cblx0XHRpZiAoIV8uZGlzYWJsZVdvcmtlck1lc3NhZ2VIYW5kbGVyKSB7XG5cdFx0XHQvLyBJbiB3b3JrZXJcblx0XHRcdF9zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciBtZXNzYWdlID0gSlNPTi5wYXJzZShldnQuZGF0YSk7XG5cdFx0XHRcdHZhciBsYW5nID0gbWVzc2FnZS5sYW5ndWFnZTtcblx0XHRcdFx0dmFyIGNvZGUgPSBtZXNzYWdlLmNvZGU7XG5cdFx0XHRcdHZhciBpbW1lZGlhdGVDbG9zZSA9IG1lc3NhZ2UuaW1tZWRpYXRlQ2xvc2U7XG5cblx0XHRcdFx0X3NlbGYucG9zdE1lc3NhZ2UoXy5oaWdobGlnaHQoY29kZSwgXy5sYW5ndWFnZXNbbGFuZ10sIGxhbmcpKTtcblx0XHRcdFx0aWYgKGltbWVkaWF0ZUNsb3NlKSB7XG5cdFx0XHRcdFx0X3NlbGYuY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdH1cblxuXHRcdHJldHVybiBfO1xuXHR9XG5cblx0Ly8gR2V0IGN1cnJlbnQgc2NyaXB0IGFuZCBoaWdobGlnaHRcblx0dmFyIHNjcmlwdCA9IF8udXRpbC5jdXJyZW50U2NyaXB0KCk7XG5cblx0aWYgKHNjcmlwdCkge1xuXHRcdF8uZmlsZW5hbWUgPSBzY3JpcHQuc3JjO1xuXG5cdFx0aWYgKHNjcmlwdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbWFudWFsJykpIHtcblx0XHRcdF8ubWFudWFsID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2soKSB7XG5cdFx0aWYgKCFfLm1hbnVhbCkge1xuXHRcdFx0Xy5oaWdobGlnaHRBbGwoKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIV8ubWFudWFsKSB7XG5cdFx0Ly8gSWYgdGhlIGRvY3VtZW50IHN0YXRlIGlzIFwibG9hZGluZ1wiLCB0aGVuIHdlJ2xsIHVzZSBET01Db250ZW50TG9hZGVkLlxuXHRcdC8vIElmIHRoZSBkb2N1bWVudCBzdGF0ZSBpcyBcImludGVyYWN0aXZlXCIgYW5kIHRoZSBwcmlzbS5qcyBzY3JpcHQgaXMgZGVmZXJyZWQsIHRoZW4gd2UnbGwgYWxzbyB1c2UgdGhlXG5cdFx0Ly8gRE9NQ29udGVudExvYWRlZCBldmVudCBiZWNhdXNlIHRoZXJlIG1pZ2h0IGJlIHNvbWUgcGx1Z2lucyBvciBsYW5ndWFnZXMgd2hpY2ggaGF2ZSBhbHNvIGJlZW4gZGVmZXJyZWQgYW5kIHRoZXlcblx0XHQvLyBtaWdodCB0YWtlIGxvbmdlciBvbmUgYW5pbWF0aW9uIGZyYW1lIHRvIGV4ZWN1dGUgd2hpY2ggY2FuIGNyZWF0ZSBhIHJhY2UgY29uZGl0aW9uIHdoZXJlIG9ubHkgc29tZSBwbHVnaW5zIGhhdmVcblx0XHQvLyBiZWVuIGxvYWRlZCB3aGVuIFByaXNtLmhpZ2hsaWdodEFsbCgpIGlzIGV4ZWN1dGVkLCBkZXBlbmRpbmcgb24gaG93IGZhc3QgcmVzb3VyY2VzIGFyZSBsb2FkZWQuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9QcmlzbUpTL3ByaXNtL2lzc3Vlcy8yMTAyXG5cdFx0dmFyIHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuXHRcdGlmIChyZWFkeVN0YXRlID09PSAnbG9hZGluZycgfHwgcmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyAmJiBzY3JpcHQgJiYgc2NyaXB0LmRlZmVyKSB7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShoaWdobGlnaHRBdXRvbWF0aWNhbGx5Q2FsbGJhY2spO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LnNldFRpbWVvdXQoaGlnaGxpZ2h0QXV0b21hdGljYWxseUNhbGxiYWNrLCAxNik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIF87XG5cbn0oX3NlbGYpKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUHJpc207XG59XG5cbi8vIGhhY2sgZm9yIGNvbXBvbmVudHMgdG8gd29yayBjb3JyZWN0bHkgaW4gbm9kZS5qc1xuaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdGdsb2JhbC5QcmlzbSA9IFByaXNtO1xufVxuXG4vLyBzb21lIGFkZGl0aW9uYWwgZG9jdW1lbnRhdGlvbi90eXBlc1xuXG4vKipcbiAqIFRoZSBleHBhbnNpb24gb2YgYSBzaW1wbGUgYFJlZ0V4cGAgbGl0ZXJhbCB0byBzdXBwb3J0IGFkZGl0aW9uYWwgcHJvcGVydGllcy5cbiAqXG4gKiBAdHlwZWRlZiBHcmFtbWFyVG9rZW5cbiAqIEBwcm9wZXJ0eSB7UmVnRXhwfSBwYXR0ZXJuIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gb2YgdGhlIHRva2VuLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbbG9va2JlaGluZD1mYWxzZV0gSWYgYHRydWVgLCB0aGVuIHRoZSBmaXJzdCBjYXB0dXJpbmcgZ3JvdXAgb2YgYHBhdHRlcm5gIHdpbGwgKGVmZmVjdGl2ZWx5KVxuICogYmVoYXZlIGFzIGEgbG9va2JlaGluZCBncm91cCBtZWFuaW5nIHRoYXQgdGhlIGNhcHR1cmVkIHRleHQgd2lsbCBub3QgYmUgcGFydCBvZiB0aGUgbWF0Y2hlZCB0ZXh0IG9mIHRoZSBuZXcgdG9rZW4uXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtncmVlZHk9ZmFsc2VdIFdoZXRoZXIgdGhlIHRva2VuIGlzIGdyZWVkeS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfHN0cmluZ1tdfSBbYWxpYXNdIEFuIG9wdGlvbmFsIGFsaWFzIG9yIGxpc3Qgb2YgYWxpYXNlcy5cbiAqIEBwcm9wZXJ0eSB7R3JhbW1hcn0gW2luc2lkZV0gVGhlIG5lc3RlZCBncmFtbWFyIG9mIHRoaXMgdG9rZW4uXG4gKlxuICogVGhlIGBpbnNpZGVgIGdyYW1tYXIgd2lsbCBiZSB1c2VkIHRvIHRva2VuaXplIHRoZSB0ZXh0IHZhbHVlIG9mIGVhY2ggdG9rZW4gb2YgdGhpcyBraW5kLlxuICpcbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbWFrZSBuZXN0ZWQgYW5kIGV2ZW4gcmVjdXJzaXZlIGxhbmd1YWdlIGRlZmluaXRpb25zLlxuICpcbiAqIE5vdGU6IFRoaXMgY2FuIGNhdXNlIGluZmluaXRlIHJlY3Vyc2lvbi4gQmUgY2FyZWZ1bCB3aGVuIHlvdSBlbWJlZCBkaWZmZXJlbnQgbGFuZ3VhZ2VzIG9yIGV2ZW4gdGhlIHNhbWUgbGFuZ3VhZ2UgaW50b1xuICogZWFjaCBhbm90aGVyLlxuICogQGdsb2JhbFxuICogQHB1YmxpY1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYgR3JhbW1hclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFJlZ0V4cCB8IEdyYW1tYXJUb2tlbiB8IEFycmF5PFJlZ0V4cCB8IEdyYW1tYXJUb2tlbj4+fVxuICogQHByb3BlcnR5IHtHcmFtbWFyfSBbcmVzdF0gQW4gb3B0aW9uYWwgZ3JhbW1hciBvYmplY3QgdGhhdCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoaXMgZ3JhbW1hci5cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBpbnZva2VkIGFmdGVyIGFuIGVsZW1lbnQgd2FzIHN1Y2Nlc3NmdWxseSBoaWdobGlnaHRlZC5cbiAqXG4gKiBAY2FsbGJhY2sgSGlnaGxpZ2h0Q2FsbGJhY2tcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCBzdWNjZXNzZnVsbHkgaGlnaGxpZ2h0ZWQuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBIb29rQ2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gZW52IFRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMgb2YgdGhlIGhvb2suXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBnbG9iYWxcbiAqIEBwdWJsaWNcbiAqL1xuIiwiY29uc3QgdGhyb3dFcnJvciA9IChtZXNzYWdlKSA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihgKioqIG8tc3ludGF4LWhpZ2hsaWdodCBlcnJvcjpcXG4ke21lc3NhZ2V9XFxuKioqYCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0aHJvd0Vycm9yO1xuIiwiaW1wb3J0IHRocm93RXJyb3IgZnJvbSAnLi9oZWxwZXJzJztcblxuaW1wb3J0IHByaXNtIGZyb20gJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jb3JlLmpzJztcbi8vIEFkZHMgdG8gUHJpc20gZ2xvYmFsIG9iamVjdCB3aGljaCB3ZSByZW1vdmUgaHR0cHM6Ly9naXRodWIuY29tL1ByaXNtSlMvcHJpc20vYmxvYi92MS4xNS4wL3ByaXNtLmpzI0w2XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrdXAuanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NzLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNsaWtlLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmFzY3JpcHQuanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tYmFzaC5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qc29uLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNjc3MuanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbC5qcyc7XG5pbXBvcnQgZGlmZiBmcm9tICcuL2xhbmd1YWdlcy9wcmlzbS1kaWZmLmpzJztcblxuY2xhc3MgU3ludGF4SGlnaGxpZ2h0IHtcblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gW21lc3NhZ2VFbGVtZW50XSAtIFRoZSBtZXNzYWdlIGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBtZXNzYWdlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmxhbmd1YWdlIC0gVGhlIGxhbmd1YWdlIHRvIHRva2VuaXNlIHRoZSBjb2RlIGZvclxuXHQgKi9cblx0Y29uc3RydWN0b3IgKHN5bnRheEVsLCBvcHRpb25zKSB7XG5cdFx0ZGVsZXRlIHdpbmRvdy5QcmlzbTsgLy8gUmVtb3ZlIFByaXNtIGdsb2JhbCBodHRwczovL2dpdGh1Yi5jb20vUHJpc21KUy9wcmlzbS9ibG9iL3YxLjE1LjAvcHJpc20uanMjTDZcblx0XHRwcmlzbS5sYW5ndWFnZXMuZGlmZiA9IGRpZmY7IC8vIEFzc2lnbiBjdXN0b20gZGlmZiBsYW5ndWFnZVxuXHRcdHRoaXMuc3ludGF4RWxlbWVudCA9IHN5bnRheEVsO1xuXHRcdHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0bGFuZ3VhZ2U6ICcnLFxuXHRcdFx0c3ludGF4U3RyaW5nOiAnJ1xuXHQgXHR9LCBvcHRpb25zKTtcblxuXHRcdGlmICh0eXBlb2YgdGhpcy5zeW50YXhFbGVtZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5fc2V0TGFuZ3VhZ2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fdG9rZW5pc2VDb2RlQmxvY2tzKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogU2V0IGxhbmd1YWdlIGZvciBzeW50YXggaGlnaGxpZ2h0aW5nXG5cdCovXG5cdF9zZXRMYW5ndWFnZSAoKSB7XG5cdFx0aWYgKHRoaXMub3B0cy5sYW5ndWFnZSkge1xuXHRcdFx0dGhpcy5vcHRzLnN5bnRheFN0cmluZyA9IHRoaXMuc3ludGF4RWxlbWVudDtcblx0XHRcdHRoaXMuX2NoZWNrTGFuZ3VhZ2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3dFcnJvcignQSBsYW5ndWFnZSBtdXN0IGJlIGRlZmluZWQgaW4gdGhlIG9wdGlvbnMgb2JqZWN0Jyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogR2V0IGxhbmd1YWdlIGZyb20gSFRNTCBlbGVtZW50XG5cdCogQHBhcmFtIHtIVE1MRWxlbWVudH0gLSBUaGUgZWxlbWVudCB3aXRoIGEgbGFuZ3VhZ2UtcmVsZXZhbnQgY2xhc3MgbmFtZVxuXHQqIEByZXR1cm4ge1N0cmluZyB8IE51bGx9IC0gVGhlIGxhbmd1YWdlIG5hbWUgZS5nLiBganNgIG9yIG51bGwgaWYgbm90IGRlZmluZWQuXG5cdCovXG5cdF9nZXRMYW5ndWFnZShlbGVtZW50KSB7XG5cdFx0Y29uc3QgaGlnaGxpZ2h0Q2xhc3NOYW1lcyA9IFsuLi5lbGVtZW50LmNsYXNzTGlzdF0uZmlsdGVyKGMgPT4gYy5pbmNsdWRlcygnby1zeW50YXgtaGlnaGxpZ2h0LS0nKSk7XG5cdFx0Y29uc3QgaGlnaGxpZ2h0Q2xhc3NOYW1lID0gaGlnaGxpZ2h0Q2xhc3NOYW1lcyA/IGhpZ2hsaWdodENsYXNzTmFtZXNbMF06IG51bGw7XG5cblx0XHRpZiAoIWhpZ2hsaWdodENsYXNzTmFtZSkge1xuXHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRgSW4gb3JkZXIgdG8gaGlnaGxpZ2h0IGEgY29kZWJsb2NrLCB0aGUgJzxjb2RlPicgYCArXG5cdFx0XHRcdGByZXF1aXJlcyBhIHNwZWNpZmljIGNsYXNzIHRvIGRlZmluZSBhIGxhbmd1YWdlLiBFLmcuIGAgK1xuXHRcdFx0XHRgY2xhc3M9XCJvLXN5bnRheC1oaWdobGlnaHQtLWh0bWxcIiBvciBgICtcblx0XHRcdFx0YGNsYXNzPVwiby1zeW50YXgtaGlnaGxpZ2h0LS1qc1wiYCwgZWxlbWVudCk7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHR0aGlzLm9wdHMubGFuZ3VhZ2UgPSBoaWdobGlnaHRDbGFzc05hbWUucmVwbGFjZSgnby1zeW50YXgtaGlnaGxpZ2h0LS0nLCAnJyk7XG5cblx0XHR0aGlzLl9jaGVja0xhbmd1YWdlKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5vcHRzLmxhbmd1YWdlO1xuXHR9XG5cblx0LyoqXG5cdCogQ2hlY2sgaWYgbGFuZ3VhZ2UgaXMgcHJlc2VudCBmb3IgdG9rZW5pc2luZywgYWRkIGlmIG5vdCBsb2FkIGl0IGhlcmUgKGUuZy5zY3NzLCBqc29uKTtcblx0Ki9cblx0X2NoZWNrTGFuZ3VhZ2UgKCkge1xuXHRcdGlmICh0aGlzLm9wdHMubGFuZ3VhZ2UgJiYgIXByaXNtLmxhbmd1YWdlcy5oYXNPd25Qcm9wZXJ0eSh0aGlzLm9wdHMubGFuZ3VhZ2UpKSB7XG5cdFx0XHR0aHJvd0Vycm9yKGBUaGUgbGFuZ3VhZ2UgJHt0aGlzLm9wdHMubGFuZ3VhZ2V9IGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSBjb250YWN0IE9yaWdhbWkgaWYgeW91IHdvdWxkIGxpa2UgdG8gaGF2ZSBpdCBhZGRlZC5gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAqIEZldGNoIGFuZCB0b2tlbmlzZSBldmVyeSA8Y29kZT4gdGFnJ3MgY29udGVudCB1bmRlciB0aGUgc3ludGF4RWxcbiAqL1xuXHRfdG9rZW5pc2VDb2RlQmxvY2tzICgpIHtcblx0XHRjb25zdCBjb2RlQmxvY2tzID0gQXJyYXkuZnJvbSh0aGlzLnN5bnRheEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnUFJFJykpXG5cdFx0XHQuZmlsdGVyKHByZSA9PiBwcmUuZmlyc3RFbGVtZW50Q2hpbGQgJiYgcHJlLmZpcnN0RWxlbWVudENoaWxkLnRhZ05hbWUgPT09ICdDT0RFJylcblx0XHRcdC5tYXAocHJlID0+IHByZS5maXJzdEVsZW1lbnRDaGlsZCk7XG5cblx0XHRjb2RlQmxvY2tzLmZvckVhY2godGhpcy5fdG9rZW5pc2VCbG9jay5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuICogUHJlcGFyZXMgc3ludGF4IGZvciBoaWdobGlnaHRpbmcgYmFzZWQgb24gdGhlIGxhbmd1YWdlIHByb3ZpZGVkIGluIHRoZSBlbGVtZW50IGNsYXNzbmFtZSAoY2xhc3M9XCJzeW50YXgtaHRtbFwiKVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gLSBUaGUgaHRtbCBlbGVtZW50IHRoYXQgaG9sZHMgdGhlIHN5bnRheCB0byBoaWdobGlnaHRcbiAqL1xuXHRfdG9rZW5pc2VCbG9jayAoZWxlbWVudCkge1xuXHRcdGNvbnN0IGxhbmd1YWdlID0gdGhpcy5fZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XG5cdFx0aWYgKGxhbmd1YWdlKSB7XG5cdFx0XHR0aGlzLm9wdHMuc3ludGF4U3RyaW5nID0gZWxlbWVudC5pbm5lclRleHQ7XG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IHRoaXMudG9rZW5pc2UoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVG9rZW5pc2Ugc3RyaW5nIGZvciBoaWdobGlnaHRpbmdcblx0IEByZXR1cm5zIHtIVE1MRWxlbWVudH0gdG9rZW5pc2VkIGNvZGUgaW4gdGhlIGZvcm0gb2YgSFRNTCBlbGVtZW50c1xuXHQgKi9cblx0dG9rZW5pc2UgKCkge1xuXHRcdHJldHVybiBwcmlzbS5oaWdobGlnaHQodGhpcy5vcHRzLnN5bnRheFN0cmluZywgcHJpc20ubGFuZ3VhZ2VzW3RoaXMub3B0cy5sYW5ndWFnZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2Ugc3ludGF4IGhpZ2hsaWdodGluZy5cblx0ICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8U3RyaW5nKX0gcm9vdEVsZW1lbnQgLSBUaGUgcm9vdCBlbGVtZW50IHRvIGludGlhbGlzZSBhIG1lc3NhZ2UgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIHN5bnRheCBoaWdobGlnaHRpbmdcblx0ICpcblx0ICovXG5cdHN0YXRpYyBpbml0IChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcm9vdEVsLm1hdGNoZXMoJ1tkYXRhLW8tY29tcG9uZW50PW8tc3ludGF4LWhpZ2hsaWdodF0nKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBTeW50YXhIaWdobGlnaHQocm9vdEVsLCBvcHRzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gQXJyYXkuZnJvbShyb290RWwucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLXN5bnRheC1oaWdobGlnaHRcIl0nKSwgcm9vdEVsID0+IG5ldyBTeW50YXhIaWdobGlnaHQocm9vdEVsLCBvcHRzKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3ludGF4SGlnaGxpZ2h0O1xuIiwiUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cCA9IHtcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogLzwhLS0oPzooPyE8IS0tKVtcXHNcXFNdKSo/LS0+Lyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J3Byb2xvZyc6IHtcblx0XHRwYXR0ZXJuOiAvPFxcP1tcXHNcXFNdKz9cXD8+Lyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2RvY3R5cGUnOiB7XG5cdFx0Ly8gaHR0cHM6Ly93d3cudzMub3JnL1RSL3htbC8jTlQtZG9jdHlwZWRlY2xcblx0XHRwYXR0ZXJuOiAvPCFET0NUWVBFKD86W14+XCInW1xcXV18XCJbXlwiXSpcInwnW14nXSonKSsoPzpcXFsoPzpbXjxcIidcXF1dfFwiW15cIl0qXCJ8J1teJ10qJ3w8KD8hIS0tKXw8IS0tKD86W14tXXwtKD8hLT4pKSotLT4pKlxcXVxccyopPz4vaSxcblx0XHRncmVlZHk6IHRydWUsXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQnaW50ZXJuYWwtc3Vic2V0Jzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvKF5bXlxcW10qXFxbKVtcXHNcXFNdKyg/PVxcXT4kKS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiBudWxsIC8vIHNlZSBiZWxvd1xuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC9cIlteXCJdKlwifCdbXiddKicvLFxuXHRcdFx0XHRncmVlZHk6IHRydWVcblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXjwhfD4kfFtbXFxdXS8sXG5cdFx0XHQnZG9jdHlwZS10YWcnOiAvXkRPQ1RZUEUvaSxcblx0XHRcdCduYW1lJzogL1teXFxzPD4nXCJdKy9cblx0XHR9XG5cdH0sXG5cdCdjZGF0YSc6IHtcblx0XHRwYXR0ZXJuOiAvPCFcXFtDREFUQVxcW1tcXHNcXFNdKj9cXF1cXF0+L2ksXG5cdFx0Z3JlZWR5OiB0cnVlXG5cdH0sXG5cdCd0YWcnOiB7XG5cdFx0cGF0dGVybjogLzxcXC8/KD8hXFxkKVteXFxzPlxcLz0kPCVdKyg/Olxccyg/OlxccypbXlxccz5cXC89XSsoPzpcXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSl8KD89W1xccy8+XSkpKSspP1xccypcXC8/Pi8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RhZyc6IHtcblx0XHRcdFx0cGF0dGVybjogL148XFwvP1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL148XFwvPy8sXG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzcGVjaWFsLWF0dHInOiBbXSxcblx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKS8sXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdwdW5jdHVhdGlvbic6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogL149Lyxcblx0XHRcdFx0XHRcdFx0YWxpYXM6ICdhdHRyLWVxdWFscydcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQvXCJ8Jy9cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQncHVuY3R1YXRpb24nOiAvXFwvPz4vLFxuXHRcdFx0J2F0dHItbmFtZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL1teXFxzPlxcL10rLyxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J25hbWVzcGFjZSc6IC9eW15cXHM+XFwvOl0rOi9cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9LFxuXHQnZW50aXR5JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8mW1xcZGEtel17MSw4fTsvaSxcblx0XHRcdGFsaWFzOiAnbmFtZWQtZW50aXR5J1xuXHRcdH0sXG5cdFx0LyYjeD9bXFxkYS1mXXsxLDh9Oy9pXG5cdF1cbn07XG5cblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ3RhZyddLmluc2lkZVsnYXR0ci12YWx1ZSddLmluc2lkZVsnZW50aXR5J10gPVxuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwWydlbnRpdHknXTtcblByaXNtLmxhbmd1YWdlcy5tYXJrdXBbJ2RvY3R5cGUnXS5pbnNpZGVbJ2ludGVybmFsLXN1YnNldCddLmluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cbi8vIFBsdWdpbiB0byBtYWtlIGVudGl0eSB0aXRsZSBzaG93IHRoZSByZWFsIGVudGl0eSwgaWRlYSBieSBSb21hbiBLb21hcm92XG5QcmlzbS5ob29rcy5hZGQoJ3dyYXAnLCBmdW5jdGlvbiAoZW52KSB7XG5cblx0aWYgKGVudi50eXBlID09PSAnZW50aXR5Jykge1xuXHRcdGVudi5hdHRyaWJ1dGVzWyd0aXRsZSddID0gZW52LmNvbnRlbnQucmVwbGFjZSgvJmFtcDsvLCAnJicpO1xuXHR9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkSW5saW5lZCcsIHtcblx0LyoqXG5cdCAqIEFkZHMgYW4gaW5saW5lZCBsYW5ndWFnZSB0byBtYXJrdXAuXG5cdCAqXG5cdCAqIEFuIGV4YW1wbGUgb2YgYW4gaW5saW5lZCBsYW5ndWFnZSBpcyBDU1Mgd2l0aCBgPHN0eWxlPmAgdGFncy5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHQgKi9cblx0dmFsdWU6IGZ1bmN0aW9uIGFkZElubGluZWQodGFnTmFtZSwgbGFuZykge1xuXHRcdHZhciBpbmNsdWRlZENkYXRhSW5zaWRlID0ge307XG5cdFx0aW5jbHVkZWRDZGF0YUluc2lkZVsnbGFuZ3VhZ2UtJyArIGxhbmddID0ge1xuXHRcdFx0cGF0dGVybjogLyhePCFcXFtDREFUQVxcWylbXFxzXFxTXSs/KD89XFxdXFxdPiQpL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXHRcdGluY2x1ZGVkQ2RhdGFJbnNpZGVbJ2NkYXRhJ10gPSAvXjwhXFxbQ0RBVEFcXFt8XFxdXFxdPiQvaTtcblxuXHRcdHZhciBpbnNpZGUgPSB7XG5cdFx0XHQnaW5jbHVkZWQtY2RhdGEnOiB7XG5cdFx0XHRcdHBhdHRlcm46IC88IVxcW0NEQVRBXFxbW1xcc1xcU10qP1xcXVxcXT4vaSxcblx0XHRcdFx0aW5zaWRlOiBpbmNsdWRlZENkYXRhSW5zaWRlXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpbnNpZGVbJ2xhbmd1YWdlLScgKyBsYW5nXSA9IHtcblx0XHRcdHBhdHRlcm46IC9bXFxzXFxTXSsvLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHR9O1xuXG5cdFx0dmFyIGRlZiA9IHt9O1xuXHRcdGRlZlt0YWdOYW1lXSA9IHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgvKDxfX1tePl0qPikoPzo8IVxcW0NEQVRBXFxbKD86W15cXF1dfFxcXSg/IVxcXT4pKSpcXF1cXF0+fCg/ITwhXFxbQ0RBVEFcXFspW1xcc1xcU10pKj8oPz08XFwvX18+KS8uc291cmNlLnJlcGxhY2UoL19fL2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRhZ05hbWU7IH0pLCAnaScpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdGluc2lkZTogaW5zaWRlXG5cdFx0fTtcblxuXHRcdFByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ21hcmt1cCcsICdjZGF0YScsIGRlZik7XG5cdH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLCAnYWRkQXR0cmlidXRlJywge1xuXHQvKipcblx0ICogQWRkcyBhbiBwYXR0ZXJuIHRvIGhpZ2hsaWdodCBsYW5ndWFnZXMgZW1iZWRkZWQgaW4gSFRNTCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBBbiBleGFtcGxlIG9mIGFuIGlubGluZWQgbGFuZ3VhZ2UgaXMgQ1NTIHdpdGggYHN0eWxlYCBhdHRyaWJ1dGVzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXR0ck5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZyB0aGF0IGNvbnRhaW5zIHRoZSBpbmxpbmVkIGxhbmd1YWdlLiBUaGlzIG5hbWUgd2lsbCBiZSB0cmVhdGVkIGFzXG5cdCAqIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBsYW5nIFRoZSBsYW5ndWFnZSBrZXkuXG5cdCAqIEBleGFtcGxlXG5cdCAqIGFkZEF0dHJpYnV0ZSgnc3R5bGUnLCAnY3NzJyk7XG5cdCAqL1xuXHR2YWx1ZTogZnVuY3Rpb24gKGF0dHJOYW1lLCBsYW5nKSB7XG5cdFx0UHJpc20ubGFuZ3VhZ2VzLm1hcmt1cC50YWcuaW5zaWRlWydzcGVjaWFsLWF0dHInXS5wdXNoKHtcblx0XHRcdHBhdHRlcm46IFJlZ0V4cChcblx0XHRcdFx0LyhefFtcIidcXHNdKS8uc291cmNlICsgJyg/OicgKyBhdHRyTmFtZSArICcpJyArIC9cXHMqPVxccyooPzpcIlteXCJdKlwifCdbXiddKid8W15cXHMnXCI+PV0rKD89W1xccz5dKSkvLnNvdXJjZSxcblx0XHRcdFx0J2knXG5cdFx0XHQpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnYXR0ci1uYW1lJzogL15bXlxccz1dKy8sXG5cdFx0XHRcdCdhdHRyLXZhbHVlJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC89W1xcc1xcU10rLyxcblx0XHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHRcdCd2YWx1ZSc6IHtcblx0XHRcdFx0XHRcdFx0cGF0dGVybjogLyhePVxccyooW1wiJ118KD8hW1wiJ10pKSlcXFNbXFxzXFxTXSooPz1cXDIkKS8sXG5cdFx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGFsaWFzOiBbbGFuZywgJ2xhbmd1YWdlLScgKyBsYW5nXSxcblx0XHRcdFx0XHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXNbbGFuZ11cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRwYXR0ZXJuOiAvXj0vLFxuXHRcdFx0XHRcdFx0XHRcdGFsaWFzOiAnYXR0ci1lcXVhbHMnXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdC9cInwnL1xuXHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmh0bWwgPSBQcmlzbS5sYW5ndWFnZXMubWFya3VwO1xuUHJpc20ubGFuZ3VhZ2VzLm1hdGhtbCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5QcmlzbS5sYW5ndWFnZXMuc3ZnID0gUHJpc20ubGFuZ3VhZ2VzLm1hcmt1cDtcblxuUHJpc20ubGFuZ3VhZ2VzLnhtbCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ21hcmt1cCcsIHt9KTtcblByaXNtLmxhbmd1YWdlcy5zc21sID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5hdG9tID0gUHJpc20ubGFuZ3VhZ2VzLnhtbDtcblByaXNtLmxhbmd1YWdlcy5yc3MgPSBQcmlzbS5sYW5ndWFnZXMueG1sO1xuIiwiKGZ1bmN0aW9uIChQcmlzbSkge1xuXG5cdHZhciBzdHJpbmcgPSAvKD86XCIoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXlwiXFxcXFxcclxcbl0pKlwifCcoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXxbXidcXFxcXFxyXFxuXSkqJykvO1xuXG5cdFByaXNtLmxhbmd1YWdlcy5jc3MgPSB7XG5cdFx0J2NvbW1lbnQnOiAvXFwvXFwqW1xcc1xcU10qP1xcKlxcLy8sXG5cdFx0J2F0cnVsZSc6IHtcblx0XHRcdHBhdHRlcm46IC9AW1xcdy1dKD86W147e1xcc118XFxzKyg/IVtcXHN7XSkpKig/Ojt8KD89XFxzKlxceykpLyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQncnVsZSc6IC9eQFtcXHctXSsvLFxuXHRcdFx0XHQnc2VsZWN0b3ItZnVuY3Rpb24tYXJndW1lbnQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhcXGJzZWxlY3RvclxccypcXChcXHMqKD8hW1xccyldKSkoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXCgoPzpbXigpXXxcXChbXigpXSpcXCkpKlxcKSkrKD89XFxzKlxcKSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0YWxpYXM6ICdzZWxlY3Rvcidcblx0XHRcdFx0fSxcblx0XHRcdFx0J2tleXdvcmQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogLyhefFteXFx3LV0pKD86YW5kfG5vdHxvbmx5fG9yKSg/IVtcXHctXSkvLFxuXHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBTZWUgcmVzdCBiZWxvd1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3VybCc6IHtcblx0XHRcdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnXFxcXGJ1cmxcXFxcKCg/OicgKyBzdHJpbmcuc291cmNlICsgJ3wnICsgLyg/OlteXFxcXFxcclxcbigpXCInXXxcXFxcW1xcc1xcU10pKi8uc291cmNlICsgJylcXFxcKScsICdpJyksXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0J2Z1bmN0aW9uJzogL151cmwvaSxcblx0XHRcdFx0J3B1bmN0dWF0aW9uJzogL15cXCh8XFwpJC8sXG5cdFx0XHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCdeJyArIHN0cmluZy5zb3VyY2UgKyAnJCcpLFxuXHRcdFx0XHRcdGFsaWFzOiAndXJsJ1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnc2VsZWN0b3InOiB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJyhefFt7fVxcXFxzXSlbXnt9XFxcXHNdKD86W157fTtcIlxcJ1xcXFxzXXxcXFxccysoPyFbXFxcXHN7XSl8JyArIHN0cmluZy5zb3VyY2UgKyAnKSooPz1cXFxccypcXFxceyknKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRwYXR0ZXJuOiBzdHJpbmcsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdCdwcm9wZXJ0eSc6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXi1cXHdcXHhBMC1cXHVGRkZGXSkoPyFcXHMpWy1fYS16XFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWy1cXHdcXHhBMC1cXHVGRkZGXSkqKD89XFxzKjopL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQnaW1wb3J0YW50JzogLyFpbXBvcnRhbnRcXGIvaSxcblx0XHQnZnVuY3Rpb24nOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14tYS16MC05XSlbLWEtejAtOV0rKD89XFwoKS9pLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J3B1bmN0dWF0aW9uJzogL1soKXt9OzosXS9cblx0fTtcblxuXHRQcmlzbS5sYW5ndWFnZXMuY3NzWydhdHJ1bGUnXS5pbnNpZGUucmVzdCA9IFByaXNtLmxhbmd1YWdlcy5jc3M7XG5cblx0dmFyIG1hcmt1cCA9IFByaXNtLmxhbmd1YWdlcy5tYXJrdXA7XG5cdGlmIChtYXJrdXApIHtcblx0XHRtYXJrdXAudGFnLmFkZElubGluZWQoJ3N0eWxlJywgJ2NzcycpO1xuXHRcdG1hcmt1cC50YWcuYWRkQXR0cmlidXRlKCdzdHlsZScsICdjc3MnKTtcblx0fVxuXG59KFByaXNtKSk7XG4iLCJQcmlzbS5sYW5ndWFnZXMuY2xpa2UgPSB7XG5cdCdjb21tZW50JzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKVxcL1xcKltcXHNcXFNdKj8oPzpcXCpcXC98JCkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGdyZWVkeTogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteXFxcXDpdKVxcL1xcLy4qLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdzdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogLyhbXCInXSkoPzpcXFxcKD86XFxyXFxufFtcXHNcXFNdKXwoPyFcXDEpW15cXFxcXFxyXFxuXSkqXFwxLyxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2NsYXNzLW5hbWUnOiB7XG5cdFx0cGF0dGVybjogLyhcXGIoPzpjbGFzc3xpbnRlcmZhY2V8ZXh0ZW5kc3xpbXBsZW1lbnRzfHRyYWl0fGluc3RhbmNlb2Z8bmV3KVxccyt8XFxiY2F0Y2hcXHMrXFwoKVtcXHcuXFxcXF0rL2ksXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCdwdW5jdHVhdGlvbic6IC9bLlxcXFxdL1xuXHRcdH1cblx0fSxcblx0J2tleXdvcmQnOiAvXFxiKD86aWZ8ZWxzZXx3aGlsZXxkb3xmb3J8cmV0dXJufGlufGluc3RhbmNlb2Z8ZnVuY3Rpb258bmV3fHRyeXx0aHJvd3xjYXRjaHxmaW5hbGx5fG51bGx8YnJlYWt8Y29udGludWUpXFxiLyxcblx0J2Jvb2xlYW4nOiAvXFxiKD86dHJ1ZXxmYWxzZSlcXGIvLFxuXHQnZnVuY3Rpb24nOiAvXFxiXFx3Kyg/PVxcKCkvLFxuXHQnbnVtYmVyJzogL1xcYjB4W1xcZGEtZl0rXFxifCg/OlxcYlxcZCsoPzpcXC5cXGQqKT98XFxCXFwuXFxkKykoPzplWystXT9cXGQrKT8vaSxcblx0J29wZXJhdG9yJzogL1s8Pl09P3xbIT1dPT89P3wtLT98XFwrXFwrP3wmJj98XFx8XFx8P3xbPyovfl4lXS8sXG5cdCdwdW5jdHVhdGlvbic6IC9be31bXFxdOygpLC46XS9cbn07XG4iLCJQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdCA9IFByaXNtLmxhbmd1YWdlcy5leHRlbmQoJ2NsaWtlJywge1xuXHQnY2xhc3MtbmFtZSc6IFtcblx0XHRQcmlzbS5sYW5ndWFnZXMuY2xpa2VbJ2NsYXNzLW5hbWUnXSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14kXFx3XFx4QTAtXFx1RkZGRl0pKD8hXFxzKVtfJEEtWlxceEEwLVxcdUZGRkZdKD86KD8hXFxzKVskXFx3XFx4QTAtXFx1RkZGRl0pKig/PVxcLig/OnByb3RvdHlwZXxjb25zdHJ1Y3RvcikpLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF0sXG5cdCdrZXl3b3JkJzogW1xuXHRcdHtcblx0XHRcdHBhdHRlcm46IC8oKD86XnxcXH0pXFxzKiljYXRjaFxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W14uXXxcXC5cXC5cXC5cXHMqKVxcYig/OmFzfGFzc2VydCg/PVxccypcXHspfGFzeW5jKD89XFxzKig/OmZ1bmN0aW9uXFxifFxcKHxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxhd2FpdHxicmVha3xjYXNlfGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5KD89XFxzKig/Olxce3wkKSl8Zm9yfGZyb20oPz1cXHMqKD86WydcIl18JCkpfGZ1bmN0aW9ufCg/OmdldHxzZXQpKD89XFxzKig/OlsjXFxbJFxcd1xceEEwLVxcdUZGRkZdfCQpKXxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHN0YXRpY3xzdXBlcnxzd2l0Y2h8dGhpc3x0aHJvd3x0cnl8dHlwZW9mfHVuZGVmaW5lZHx2YXJ8dm9pZHx3aGlsZXx3aXRofHlpZWxkKVxcYi8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XSxcblx0Ly8gQWxsb3cgZm9yIGFsbCBub24tQVNDSUkgY2hhcmFjdGVycyAoU2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwMDg0NDQpXG5cdCdmdW5jdGlvbic6IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqKD86XFwuXFxzKig/OmFwcGx5fGJpbmR8Y2FsbClcXHMqKT9cXCgpLyxcblx0J251bWJlcic6IC9cXGIoPzooPzowW3hYXSg/OltcXGRBLUZhLWZdKD86X1tcXGRBLUZhLWZdKT8pK3wwW2JCXSg/OlswMV0oPzpfWzAxXSk/KSt8MFtvT10oPzpbMC03XSg/Ol9bMC03XSk/KSspbj98KD86XFxkKD86X1xcZCk/KStufE5hTnxJbmZpbml0eSlcXGJ8KD86XFxiKD86XFxkKD86X1xcZCk/KStcXC4/KD86XFxkKD86X1xcZCk/KSp8XFxCXFwuKD86XFxkKD86X1xcZCk/KSspKD86W0VlXVsrLV0/KD86XFxkKD86X1xcZCk/KSspPy8sXG5cdCdvcGVyYXRvcic6IC8tLXxcXCtcXCt8XFwqXFwqPT98PT58JiY9P3xcXHxcXHw9P3xbIT1dPT18PDw9P3w+Pj4/PT98Wy0rKi8lJnxeIT08Pl09P3xcXC57M318XFw/XFw/PT98XFw/XFwuP3xbfjpdL1xufSk7XG5cblByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0WydjbGFzcy1uYW1lJ11bMF0ucGF0dGVybiA9IC8oXFxiKD86Y2xhc3N8aW50ZXJmYWNlfGV4dGVuZHN8aW1wbGVtZW50c3xpbnN0YW5jZW9mfG5ldylcXHMrKVtcXHcuXFxcXF0rLztcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdrZXl3b3JkJywge1xuXHQncmVnZXgnOiB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1kdXBlLWNoYXJhY3RlcnMtY2hhcmFjdGVyLWNsYXNzXG5cdFx0cGF0dGVybjogLygoPzpefFteJFxcd1xceEEwLVxcdUZGRkYuXCInXFxdKVxcc118XFxiKD86cmV0dXJufHlpZWxkKSlcXHMqKVxcLyg/OlxcWyg/OlteXFxdXFxcXFxcclxcbl18XFxcXC4pKlxcXXxcXFxcLnxbXi9cXFxcXFxbXFxyXFxuXSkrXFwvW2RnaW15dXNdezAsN30oPz0oPzpcXHN8XFwvXFwqKD86W14qXXxcXCooPyFcXC8pKSpcXCpcXC8pKig/OiR8W1xcclxcbiwuOzp9KVxcXV18XFwvXFwvKSkvLFxuXHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3JlZ2V4LXNvdXJjZSc6IHtcblx0XHRcdFx0cGF0dGVybjogL14oXFwvKVtcXHNcXFNdKyg/PVxcL1thLXpdKiQpLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0YWxpYXM6ICdsYW5ndWFnZS1yZWdleCcsXG5cdFx0XHRcdGluc2lkZTogUHJpc20ubGFuZ3VhZ2VzLnJlZ2V4XG5cdFx0XHR9LFxuXHRcdFx0J3JlZ2V4LWRlbGltaXRlcic6IC9eXFwvfFxcLyQvLFxuXHRcdFx0J3JlZ2V4LWZsYWdzJzogL15bYS16XSskLyxcblx0XHR9XG5cdH0sXG5cdC8vIFRoaXMgbXVzdCBiZSBkZWNsYXJlZCBiZWZvcmUga2V5d29yZCBiZWNhdXNlIHdlIHVzZSBcImZ1bmN0aW9uXCIgaW5zaWRlIHRoZSBsb29rLWZvcndhcmRcblx0J2Z1bmN0aW9uLXZhcmlhYmxlJzoge1xuXHRcdHBhdHRlcm46IC8jPyg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqWz06XVxccyooPzphc3luY1xccyopPyg/OlxcYmZ1bmN0aW9uXFxifCg/OlxcKCg/OlteKCldfFxcKFteKCldKlxcKSkqXFwpfCg/IVxccylbXyRhLXpBLVpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSopXFxzKj0+KSkvLFxuXHRcdGFsaWFzOiAnZnVuY3Rpb24nXG5cdH0sXG5cdCdwYXJhbWV0ZXInOiBbXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhmdW5jdGlvbig/OlxccysoPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqKT9cXHMqXFwoXFxzKikoPyFcXHMpKD86W14oKVxcc118XFxzKyg/IVtcXHMpXSl8XFwoW14oKV0qXFwpKSsoPz1cXHMqXFwpKS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhefFteJFxcd1xceEEwLVxcdUZGRkZdKSg/IVxccylbXyRhLXpcXHhBMC1cXHVGRkZGXSg/Oig/IVxccylbJFxcd1xceEEwLVxcdUZGRkZdKSooPz1cXHMqPT4pL2ksXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cGF0dGVybjogLyhcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqPT4pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRpbnNpZGU6IFByaXNtLmxhbmd1YWdlcy5qYXZhc2NyaXB0XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCg/OlxcYnxcXHN8XikoPyEoPzphc3xhc3luY3xhd2FpdHxicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZW51bXxleHBvcnR8ZXh0ZW5kc3xmaW5hbGx5fGZvcnxmcm9tfGZ1bmN0aW9ufGdldHxpZnxpbXBsZW1lbnRzfGltcG9ydHxpbnxpbnN0YW5jZW9mfGludGVyZmFjZXxsZXR8bmV3fG51bGx8b2Z8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8cmV0dXJufHNldHxzdGF0aWN8c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ5fHR5cGVvZnx1bmRlZmluZWR8dmFyfHZvaWR8d2hpbGV8d2l0aHx5aWVsZCkoPyFbJFxcd1xceEEwLVxcdUZGRkZdKSkoPzooPyFcXHMpW18kYS16QS1aXFx4QTAtXFx1RkZGRl0oPzooPyFcXHMpWyRcXHdcXHhBMC1cXHVGRkZGXSkqXFxzKilcXChcXHMqfFxcXVxccypcXChcXHMqKSg/IVxccykoPzpbXigpXFxzXXxcXHMrKD8hW1xccyldKXxcXChbXigpXSpcXCkpKyg/PVxccypcXClcXHMqXFx7KS8sXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdFx0aW5zaWRlOiBQcmlzbS5sYW5ndWFnZXMuamF2YXNjcmlwdFxuXHRcdH1cblx0XSxcblx0J2NvbnN0YW50JzogL1xcYltBLVpdKD86W0EtWl9dfFxcZHg/KSpcXGIvXG59KTtcblxuUHJpc20ubGFuZ3VhZ2VzLmluc2VydEJlZm9yZSgnamF2YXNjcmlwdCcsICdzdHJpbmcnLCB7XG5cdCdoYXNoYmFuZyc6IHtcblx0XHRwYXR0ZXJuOiAvXiMhLiovLFxuXHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRhbGlhczogJ2NvbW1lbnQnXG5cdH0sXG5cdCd0ZW1wbGF0ZS1zdHJpbmcnOiB7XG5cdFx0cGF0dGVybjogL2AoPzpcXFxcW1xcc1xcU118XFwkXFx7KD86W157fV18XFx7KD86W157fV18XFx7W159XSpcXH0pKlxcfSkrXFx9fCg/IVxcJFxceylbXlxcXFxgXSkqYC8sXG5cdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3RlbXBsYXRlLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvXmB8YCQvLFxuXHRcdFx0XHRhbGlhczogJ3N0cmluZydcblx0XHRcdH0sXG5cdFx0XHQnaW50ZXJwb2xhdGlvbic6IHtcblx0XHRcdFx0cGF0dGVybjogLygoPzpefFteXFxcXF0pKD86XFxcXHsyfSkqKVxcJFxceyg/Oltee31dfFxceyg/Oltee31dfFxce1tefV0qXFx9KSpcXH0pK1xcfS8sXG5cdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdCdpbnRlcnBvbGF0aW9uLXB1bmN0dWF0aW9uJzoge1xuXHRcdFx0XHRcdFx0cGF0dGVybjogL15cXCRcXHt8XFx9JC8sXG5cdFx0XHRcdFx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJ1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVzdDogUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHRcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdzdHJpbmcnOiAvW1xcc1xcU10rL1xuXHRcdH1cblx0fVxufSk7XG5cbmlmIChQcmlzbS5sYW5ndWFnZXMubWFya3VwKSB7XG5cdFByaXNtLmxhbmd1YWdlcy5tYXJrdXAudGFnLmFkZElubGluZWQoJ3NjcmlwdCcsICdqYXZhc2NyaXB0Jyk7XG5cblx0Ly8gYWRkIGF0dHJpYnV0ZSBzdXBwb3J0IGZvciBhbGwgRE9NIGV2ZW50cy5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvRXZlbnRzI1N0YW5kYXJkX2V2ZW50c1xuXHRQcmlzbS5sYW5ndWFnZXMubWFya3VwLnRhZy5hZGRBdHRyaWJ1dGUoXG5cdFx0L29uKD86YWJvcnR8Ymx1cnxjaGFuZ2V8Y2xpY2t8Y29tcG9zaXRpb24oPzplbmR8c3RhcnR8dXBkYXRlKXxkYmxjbGlja3xlcnJvcnxmb2N1cyg/OmlufG91dCk/fGtleSg/OmRvd258dXApfGxvYWR8bW91c2UoPzpkb3dufGVudGVyfGxlYXZlfG1vdmV8b3V0fG92ZXJ8dXApfHJlc2V0fHJlc2l6ZXxzY3JvbGx8c2VsZWN0fHNsb3RjaGFuZ2V8c3VibWl0fHVubG9hZHx3aGVlbCkvLnNvdXJjZSxcblx0XHQnamF2YXNjcmlwdCdcblx0KTtcbn1cblxuUHJpc20ubGFuZ3VhZ2VzLmpzID0gUHJpc20ubGFuZ3VhZ2VzLmphdmFzY3JpcHQ7XG4iLCIoZnVuY3Rpb24gKFByaXNtKSB7XG5cdC8vICQgc2V0IHwgZ3JlcCAnXltBLVpdW15bOnNwYWNlOl1dKj0nIHwgY3V0IC1kPSAtZjEgfCB0ciAnXFxuJyAnfCdcblx0Ly8gKyBMQ19BTEwsIFJBTkRPTSwgUkVQTFksIFNFQ09ORFMuXG5cdC8vICsgbWFrZSBzdXJlIFBTMS4uNCBhcmUgaGVyZSBhcyB0aGV5IGFyZSBub3QgYWx3YXlzIHNldCxcblx0Ly8gLSBzb21lIHVzZWxlc3MgdGhpbmdzLlxuXHR2YXIgZW52VmFycyA9ICdcXFxcYig/OkJBU0h8QkFTSE9QVFN8QkFTSF9BTElBU0VTfEJBU0hfQVJHQ3xCQVNIX0FSR1Z8QkFTSF9DTURTfEJBU0hfQ09NUExFVElPTl9DT01QQVRfRElSfEJBU0hfTElORU5PfEJBU0hfUkVNQVRDSHxCQVNIX1NPVVJDRXxCQVNIX1ZFUlNJTkZPfEJBU0hfVkVSU0lPTnxDT0xPUlRFUk18Q09MVU1OU3xDT01QX1dPUkRCUkVBS1N8REJVU19TRVNTSU9OX0JVU19BRERSRVNTfERFRkFVTFRTX1BBVEh8REVTS1RPUF9TRVNTSU9OfERJUlNUQUNLfERJU1BMQVl8RVVJRHxHRE1TRVNTSU9OfEdETV9MQU5HfEdOT01FX0tFWVJJTkdfQ09OVFJPTHxHTk9NRV9LRVlSSU5HX1BJRHxHUEdfQUdFTlRfSU5GT3xHUk9VUFN8SElTVENPTlRST0x8SElTVEZJTEV8SElTVEZJTEVTSVpFfEhJU1RTSVpFfEhPTUV8SE9TVE5BTUV8SE9TVFRZUEV8SUZTfElOU1RBTkNFfEpPQnxMQU5HfExBTkdVQUdFfExDX0FERFJFU1N8TENfQUxMfExDX0lERU5USUZJQ0FUSU9OfExDX01FQVNVUkVNRU5UfExDX01PTkVUQVJZfExDX05BTUV8TENfTlVNRVJJQ3xMQ19QQVBFUnxMQ19URUxFUEhPTkV8TENfVElNRXxMRVNTQ0xPU0V8TEVTU09QRU58TElORVN8TE9HTkFNRXxMU19DT0xPUlN8TUFDSFRZUEV8TUFJTENIRUNLfE1BTkRBVE9SWV9QQVRIfE5PX0FUX0JSSURHRXxPTERQV0R8T1BURVJSfE9QVElORHxPUkJJVF9TT0NLRVRESVJ8T1NUWVBFfFBBUEVSU0laRXxQQVRIfFBJUEVTVEFUVVN8UFBJRHxQUzF8UFMyfFBTM3xQUzR8UFdEfFJBTkRPTXxSRVBMWXxTRUNPTkRTfFNFTElOVVhfSU5JVHxTRVNTSU9OfFNFU1NJT05UWVBFfFNFU1NJT05fTUFOQUdFUnxTSEVMTHxTSEVMTE9QVFN8U0hMVkx8U1NIX0FVVEhfU09DS3xURVJNfFVJRHxVUFNUQVJUX0VWRU5UU3xVUFNUQVJUX0lOU1RBTkNFfFVQU1RBUlRfSk9CfFVQU1RBUlRfU0VTU0lPTnxVU0VSfFdJTkRPV0lEfFhBVVRIT1JJVFl8WERHX0NPTkZJR19ESVJTfFhER19DVVJSRU5UX0RFU0tUT1B8WERHX0RBVEFfRElSU3xYREdfR1JFRVRFUl9EQVRBX0RJUnxYREdfTUVOVV9QUkVGSVh8WERHX1JVTlRJTUVfRElSfFhER19TRUFUfFhER19TRUFUX1BBVEh8WERHX1NFU1NJT05fREVTS1RPUHxYREdfU0VTU0lPTl9JRHxYREdfU0VTU0lPTl9QQVRIfFhER19TRVNTSU9OX1RZUEV8WERHX1ZUTlJ8WE1PRElGSUVSUylcXFxcYic7XG5cblx0dmFyIGNvbW1hbmRBZnRlckhlcmVkb2MgPSB7XG5cdFx0cGF0dGVybjogLyheKFtcIiddPylcXHcrXFwyKVsgXFx0XStcXFMuKi8sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRhbGlhczogJ3B1bmN0dWF0aW9uJywgLy8gdGhpcyBsb29rcyByZWFzb25hYmx5IHdlbGwgaW4gYWxsIHRoZW1lc1xuXHRcdGluc2lkZTogbnVsbCAvLyBzZWUgYmVsb3dcblx0fTtcblxuXHR2YXIgaW5zaWRlU3RyaW5nID0ge1xuXHRcdCdiYXNoJzogY29tbWFuZEFmdGVySGVyZWRvYyxcblx0XHQnZW52aXJvbm1lbnQnOiB7XG5cdFx0XHRwYXR0ZXJuOiBSZWdFeHAoJ1xcXFwkJyArIGVudlZhcnMpLFxuXHRcdFx0YWxpYXM6ICdjb25zdGFudCdcblx0XHR9LFxuXHRcdCd2YXJpYWJsZSc6IFtcblx0XHRcdC8vIFswXTogQXJpdGhtZXRpYyBFbnZpcm9ubWVudFxuXHRcdFx0e1xuXHRcdFx0XHRwYXR0ZXJuOiAvXFwkP1xcKFxcKFtcXHNcXFNdKz9cXClcXCkvLFxuXHRcdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRcdGluc2lkZToge1xuXHRcdFx0XHRcdC8vIElmIHRoZXJlIGlzIGEgJCBzaWduIGF0IHRoZSBiZWdpbm5pbmcgaGlnaGxpZ2h0ICQoKCBhbmQgKSkgYXMgdmFyaWFibGVcblx0XHRcdFx0XHQndmFyaWFibGUnOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm46IC8oXlxcJFxcKFxcKFtcXHNcXFNdKylcXClcXCkvLFxuXHRcdFx0XHRcdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0L15cXCRcXChcXCgvXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHQnbnVtYmVyJzogL1xcYjB4W1xcZEEtRmEtZl0rXFxifCg/OlxcYlxcZCsoPzpcXC5cXGQqKT98XFxCXFwuXFxkKykoPzpbRWVdLT9cXGQrKT8vLFxuXHRcdFx0XHRcdC8vIE9wZXJhdG9ycyBhY2NvcmRpbmcgdG8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9iYXNocmVmLmh0bWwjU2hlbGwtQXJpdGhtZXRpY1xuXHRcdFx0XHRcdCdvcGVyYXRvcic6IC8tLXxcXCtcXCt8XFwqXFwqPT98PDw9P3w+Pj0/fCYmfFxcfFxcfHxbPSErXFwtKi8lPD5eJnxdPT98Wz9+Ol0vLFxuXHRcdFx0XHRcdC8vIElmIHRoZXJlIGlzIG5vICQgc2lnbiBhdCB0aGUgYmVnaW5uaW5nIGhpZ2hsaWdodCAoKCBhbmQgKSkgYXMgcHVuY3R1YXRpb25cblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvXFwoXFwoP3xcXClcXCk/fCx8Oy9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8vIFsxXTogQ29tbWFuZCBTdWJzdGl0dXRpb25cblx0XHRcdHtcblx0XHRcdFx0cGF0dGVybjogL1xcJFxcKCg/OlxcKFteKV0rXFwpfFteKCldKStcXCl8YFteYF0rYC8sXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J3ZhcmlhYmxlJzogL15cXCRcXCh8XmB8XFwpJHxgJC9cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8vIFsyXTogQnJhY2UgZXhwYW5zaW9uXG5cdFx0XHR7XG5cdFx0XHRcdHBhdHRlcm46IC9cXCRcXHtbXn1dK1xcfS8sXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J29wZXJhdG9yJzogLzpbLT0/K10/fFshXFwvXXwjIz98JSU/fFxcXlxcXj98LCw/Lyxcblx0XHRcdFx0XHQncHVuY3R1YXRpb24nOiAvW1xcW1xcXV0vLFxuXHRcdFx0XHRcdCdlbnZpcm9ubWVudCc6IHtcblx0XHRcdFx0XHRcdHBhdHRlcm46IFJlZ0V4cCgnKFxcXFx7KScgKyBlbnZWYXJzKSxcblx0XHRcdFx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRcdFx0XHRhbGlhczogJ2NvbnN0YW50J1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC9cXCQoPzpcXHcrfFsjPyohQCRdKS9cblx0XHRdLFxuXHRcdC8vIEVzY2FwZSBzZXF1ZW5jZXMgZnJvbSBlY2hvIGFuZCBwcmludGYncyBtYW51YWxzLCBhbmQgZXNjYXBlZCBxdW90ZXMuXG5cdFx0J2VudGl0eSc6IC9cXFxcKD86W2FiY2VFZm5ydHZcXFxcXCJdfE8/WzAtN117MSwzfXx4WzAtOWEtZkEtRl17MSwyfXx1WzAtOWEtZkEtRl17NH18VVswLTlhLWZBLUZdezh9KS9cblx0fTtcblxuXHRQcmlzbS5sYW5ndWFnZXMuYmFzaCA9IHtcblx0XHQnc2hlYmFuZyc6IHtcblx0XHRcdHBhdHRlcm46IC9eIyFcXHMqXFwvLiovLFxuXHRcdFx0YWxpYXM6ICdpbXBvcnRhbnQnXG5cdFx0fSxcblx0XHQnY29tbWVudCc6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXlwie1xcXFwkXSkjLiovLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J2Z1bmN0aW9uLW5hbWUnOiBbXG5cdFx0XHQvLyBhKSBmdW5jdGlvbiBmb28ge1xuXHRcdFx0Ly8gYikgZm9vKCkge1xuXHRcdFx0Ly8gYykgZnVuY3Rpb24gZm9vKCkge1xuXHRcdFx0Ly8gYnV0IG5vdCDigJxmb28ge+KAnVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBhKSBhbmQgYylcblx0XHRcdFx0cGF0dGVybjogLyhcXGJmdW5jdGlvblxccyspW1xcdy1dKyg/PSg/OlxccypcXCg/OlxccypcXCkpP1xccypcXHspLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0YWxpYXM6ICdmdW5jdGlvbidcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdC8vIGIpXG5cdFx0XHRcdHBhdHRlcm46IC9cXGJbXFx3LV0rKD89XFxzKlxcKFxccypcXClcXHMqXFx7KS8sXG5cdFx0XHRcdGFsaWFzOiAnZnVuY3Rpb24nXG5cdFx0XHR9XG5cdFx0XSxcblx0XHQvLyBIaWdobGlnaHQgdmFyaWFibGUgbmFtZXMgYXMgdmFyaWFibGVzIGluIGZvciBhbmQgc2VsZWN0IGJlZ2lubmluZ3MuXG5cdFx0J2Zvci1vci1zZWxlY3QnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKFxcYig/OmZvcnxzZWxlY3QpXFxzKylcXHcrKD89XFxzK2luXFxzKS8sXG5cdFx0XHRhbGlhczogJ3ZhcmlhYmxlJyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdC8vIEhpZ2hsaWdodCB2YXJpYWJsZSBuYW1lcyBhcyB2YXJpYWJsZXMgaW4gdGhlIGxlZnQtaGFuZCBwYXJ0XG5cdFx0Ly8gb2YgYXNzaWdubWVudHMgKOKAnD3igJ0gYW5kIOKAnCs94oCdKS5cblx0XHQnYXNzaWduLWxlZnQnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W1xcczt8Jl18Wzw+XVxcKClcXHcrKD89XFwrPz0pLyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnZW52aXJvbm1lbnQnOiB7XG5cdFx0XHRcdFx0cGF0dGVybjogUmVnRXhwKCcoXnxbXFxcXHM7fCZdfFs8Pl1cXFxcKCknICsgZW52VmFycyksXG5cdFx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0XHRhbGlhczogJ2NvbnN0YW50J1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YWxpYXM6ICd2YXJpYWJsZScsXG5cdFx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdFx0fSxcblx0XHQnc3RyaW5nJzogW1xuXHRcdFx0Ly8gU3VwcG9ydCBmb3IgSGVyZS1kb2N1bWVudHMgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSGVyZV9kb2N1bWVudFxuXHRcdFx0e1xuXHRcdFx0XHRwYXR0ZXJuOiAvKCg/Ol58W148XSk8PC0/XFxzKikoXFx3KylcXHNbXFxzXFxTXSo/KD86XFxyP1xcbnxcXHIpXFwyLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IGluc2lkZVN0cmluZ1xuXHRcdFx0fSxcblx0XHRcdC8vIEhlcmUtZG9jdW1lbnQgd2l0aCBxdW90ZXMgYXJvdW5kIHRoZSB0YWdcblx0XHRcdC8vIOKGkiBObyBleHBhbnNpb24gKHNvIG5vIOKAnGluc2lkZeKAnSkuXG5cdFx0XHR7XG5cdFx0XHRcdHBhdHRlcm46IC8oKD86XnxbXjxdKTw8LT9cXHMqKShbXCInXSkoXFx3KylcXDJcXHNbXFxzXFxTXSo/KD86XFxyP1xcbnxcXHIpXFwzLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IHtcblx0XHRcdFx0XHQnYmFzaCc6IGNvbW1hbmRBZnRlckhlcmVkb2Ncblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8vIOKAnE5vcm1hbOKAnSBzdHJpbmdcblx0XHRcdHtcblx0XHRcdFx0Ly8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9odG1sX25vZGUvRG91YmxlLVF1b3Rlcy5odG1sXG5cdFx0XHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKD86XFxcXFxcXFwpKilcIig/OlxcXFxbXFxzXFxTXXxcXCRcXChbXildK1xcKXxcXCQoPyFcXCgpfGBbXmBdK2B8W15cIlxcXFxgJF0pKlwiLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlLFxuXHRcdFx0XHRpbnNpZGU6IGluc2lkZVN0cmluZ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0Ly8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9odG1sX25vZGUvU2luZ2xlLVF1b3Rlcy5odG1sXG5cdFx0XHRcdHBhdHRlcm46IC8oXnxbXiRcXFxcXSknW14nXSonLyxcblx0XHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdFx0Z3JlZWR5OiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHQvLyBodHRwczovL3d3dy5nbnUub3JnL3NvZnR3YXJlL2Jhc2gvbWFudWFsL2h0bWxfbm9kZS9BTlNJXzAwMmRDLVF1b3RpbmcuaHRtbFxuXHRcdFx0XHRwYXR0ZXJuOiAvXFwkJyg/OlteJ1xcXFxdfFxcXFxbXFxzXFxTXSkqJy8sXG5cdFx0XHRcdGdyZWVkeTogdHJ1ZSxcblx0XHRcdFx0aW5zaWRlOiB7XG5cdFx0XHRcdFx0J2VudGl0eSc6IGluc2lkZVN0cmluZy5lbnRpdHlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdF0sXG5cdFx0J2Vudmlyb25tZW50Jzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKCdcXFxcJD8nICsgZW52VmFycyksXG5cdFx0XHRhbGlhczogJ2NvbnN0YW50J1xuXHRcdH0sXG5cdFx0J3ZhcmlhYmxlJzogaW5zaWRlU3RyaW5nLnZhcmlhYmxlLFxuXHRcdCdmdW5jdGlvbic6IHtcblx0XHRcdHBhdHRlcm46IC8oXnxbXFxzO3wmXXxbPD5dXFwoKSg/OmFkZHxhcHJvcG9zfGFwdHxhcHRpdHVkZXxhcHQtY2FjaGV8YXB0LWdldHxhc3BlbGx8YXV0b215c3FsYmFja3VwfGF3a3xiYXNlbmFtZXxiYXNofGJjfGJjb25zb2xlfGJnfGJ6aXAyfGNhbHxjYXR8Y2ZkaXNrfGNoZ3JwfGNoa2NvbmZpZ3xjaG1vZHxjaG93bnxjaHJvb3R8Y2tzdW18Y2xlYXJ8Y21wfGNvbHVtbnxjb21tfGNvbXBvc2VyfGNwfGNyb258Y3JvbnRhYnxjc3BsaXR8Y3VybHxjdXR8ZGF0ZXxkY3xkZHxkZHJlc2N1ZXxkZWJvb3RzdHJhcHxkZnxkaWZmfGRpZmYzfGRpZ3xkaXJ8ZGlyY29sb3JzfGRpcm5hbWV8ZGlyc3xkbWVzZ3xkdXxlZ3JlcHxlamVjdHxlbnZ8ZXRodG9vbHxleHBhbmR8ZXhwZWN0fGV4cHJ8ZmRmb3JtYXR8ZmRpc2t8Zmd8ZmdyZXB8ZmlsZXxmaW5kfGZtdHxmb2xkfGZvcm1hdHxmcmVlfGZzY2t8ZnRwfGZ1c2VyfGdhd2t8Z2l0fGdwYXJ0ZWR8Z3JlcHxncm91cGFkZHxncm91cGRlbHxncm91cG1vZHxncm91cHN8Z3J1Yi1ta2NvbmZpZ3xnemlwfGhhbHR8aGVhZHxoZ3xoaXN0b3J5fGhvc3R8aG9zdG5hbWV8aHRvcHxpY29udnxpZHxpZmNvbmZpZ3xpZmRvd258aWZ1cHxpbXBvcnR8aW5zdGFsbHxpcHxqb2JzfGpvaW58a2lsbHxraWxsYWxsfGxlc3N8bGlua3xsbnxsb2NhdGV8bG9nbmFtZXxsb2dyb3RhdGV8bG9va3xscGN8bHByfGxwcmludHxscHJpbnRkfGxwcmludHF8bHBybXxsc3xsc29mfGx5bnh8bWFrZXxtYW58bWN8bWRhZG18bWtjb25maWd8bWtkaXJ8bWtlMmZzfG1rZmlmb3xta2ZzfG1raXNvZnN8bWtub2R8bWtzd2FwfG1tdnxtb3JlfG1vc3R8bW91bnR8bXRvb2xzfG10cnxtdXR0fG12fG5hbm98bmN8bmV0c3RhdHxuaWNlfG5sfG5vaHVwfG5vdGlmeS1zZW5kfG5wbXxuc2xvb2t1cHxvcHxvcGVufHBhcnRlZHxwYXNzd2R8cGFzdGV8cGF0aGNoa3xwaW5nfHBraWxsfHBucG18cG9wZHxwcnxwcmludGNhcHxwcmludGVudnxwc3xwdXNoZHxwdnxxdW90YXxxdW90YWNoZWNrfHF1b3RhY3RsfHJhbXxyYXJ8cmNwfHJlYm9vdHxyZW1zeW5jfHJlbmFtZXxyZW5pY2V8cmV2fHJtfHJtZGlyfHJwbXxyc3luY3xzY3B8c2NyZWVufHNkaWZmfHNlZHxzZW5kbWFpbHxzZXF8c2VydmljZXxzZnRwfHNofHNoZWxsY2hlY2t8c2h1ZnxzaHV0ZG93bnxzbGVlcHxzbG9jYXRlfHNvcnR8c3BsaXR8c3NofHN0YXR8c3RyYWNlfHN1fHN1ZG98c3VtfHN1c3BlbmR8c3dhcG9ufHN5bmN8dGFjfHRhaWx8dGFyfHRlZXx0aW1lfHRpbWVvdXR8dG9wfHRvdWNofHRyfHRyYWNlcm91dGV8dHNvcnR8dHR5fHVtb3VudHx1bmFtZXx1bmV4cGFuZHx1bmlxfHVuaXRzfHVucmFyfHVuc2hhcnx1bnppcHx1cGRhdGUtZ3J1Ynx1cHRpbWV8dXNlcmFkZHx1c2VyZGVsfHVzZXJtb2R8dXNlcnN8dXVkZWNvZGV8dXVlbmNvZGV8dnx2ZGlyfHZpfHZpbXx2aXJzaHx2bXN0YXR8d2FpdHx3YXRjaHx3Y3x3Z2V0fHdoZXJlaXN8d2hpY2h8d2hvfHdob2FtaXx3cml0ZXx4YXJnc3x4ZGctb3Blbnx5YXJufHllc3x6ZW5pdHl8emlwfHpzaHx6eXBwZXIpKD89JHxbKVxcczt8Jl0pLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9LFxuXHRcdCdrZXl3b3JkJzoge1xuXHRcdFx0cGF0dGVybjogLyhefFtcXHM7fCZdfFs8Pl1cXCgpKD86aWZ8dGhlbnxlbHNlfGVsaWZ8Zml8Zm9yfHdoaWxlfGlufGNhc2V8ZXNhY3xmdW5jdGlvbnxzZWxlY3R8ZG98ZG9uZXx1bnRpbCkoPz0kfFspXFxzO3wmXSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0Ly8gaHR0cHM6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS9iYXNoL21hbnVhbC9odG1sX25vZGUvU2hlbGwtQnVpbHRpbi1Db21tYW5kcy5odG1sXG5cdFx0J2J1aWx0aW4nOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58W1xcczt8Jl18Wzw+XVxcKCkoPzpcXC58OnxicmVha3xjZHxjb250aW51ZXxldmFsfGV4ZWN8ZXhpdHxleHBvcnR8Z2V0b3B0c3xoYXNofHB3ZHxyZWFkb25seXxyZXR1cm58c2hpZnR8dGVzdHx0aW1lc3x0cmFwfHVtYXNrfHVuc2V0fGFsaWFzfGJpbmR8YnVpbHRpbnxjYWxsZXJ8Y29tbWFuZHxkZWNsYXJlfGVjaG98ZW5hYmxlfGhlbHB8bGV0fGxvY2FsfGxvZ291dHxtYXBmaWxlfHByaW50ZnxyZWFkfHJlYWRhcnJheXxzb3VyY2V8dHlwZXx0eXBlc2V0fHVsaW1pdHx1bmFsaWFzfHNldHxzaG9wdCkoPz0kfFspXFxzO3wmXSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdC8vIEFsaWFzIGFkZGVkIHRvIG1ha2UgdGhvc2UgZWFzaWVyIHRvIGRpc3Rpbmd1aXNoIGZyb20gc3RyaW5ncy5cblx0XHRcdGFsaWFzOiAnY2xhc3MtbmFtZSdcblx0XHR9LFxuXHRcdCdib29sZWFuJzoge1xuXHRcdFx0cGF0dGVybjogLyhefFtcXHM7fCZdfFs8Pl1cXCgpKD86dHJ1ZXxmYWxzZSkoPz0kfFspXFxzO3wmXSkvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J2ZpbGUtZGVzY3JpcHRvcic6IHtcblx0XHRcdHBhdHRlcm46IC9cXEImXFxkXFxiLyxcblx0XHRcdGFsaWFzOiAnaW1wb3J0YW50J1xuXHRcdH0sXG5cdFx0J29wZXJhdG9yJzoge1xuXHRcdFx0Ly8gTG90cyBvZiByZWRpcmVjdGlvbnMgaGVyZSwgYnV0IG5vdCBqdXN0IHRoYXQuXG5cdFx0XHRwYXR0ZXJuOiAvXFxkPzw+fD5cXHx8XFwrPXw9Wz1+XT98IT0/fDw8WzwtXT98WyZcXGRdPz4+fFxcZFs8Pl0mP3xbPD5dWyY9XT98Jls+Jl0/fFxcfFsmfF0/Lyxcblx0XHRcdGluc2lkZToge1xuXHRcdFx0XHQnZmlsZS1kZXNjcmlwdG9yJzoge1xuXHRcdFx0XHRcdHBhdHRlcm46IC9eXFxkLyxcblx0XHRcdFx0XHRhbGlhczogJ2ltcG9ydGFudCdcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J3B1bmN0dWF0aW9uJzogL1xcJD9cXChcXCg/fFxcKVxcKT98XFwuXFwufFt7fVtcXF07XFxcXF0vLFxuXHRcdCdudW1iZXInOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF58XFxzKSg/OlsxLTldXFxkKnwwKSg/OlsuLF1cXGQrKT9cXGIvLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH1cblx0fTtcblxuXHRjb21tYW5kQWZ0ZXJIZXJlZG9jLmluc2lkZSA9IFByaXNtLmxhbmd1YWdlcy5iYXNoO1xuXG5cdC8qIFBhdHRlcm5zIGluIGNvbW1hbmQgc3Vic3RpdHV0aW9uLiAqL1xuXHR2YXIgdG9CZUNvcGllZCA9IFtcblx0XHQnY29tbWVudCcsXG5cdFx0J2Z1bmN0aW9uLW5hbWUnLFxuXHRcdCdmb3Itb3Itc2VsZWN0Jyxcblx0XHQnYXNzaWduLWxlZnQnLFxuXHRcdCdzdHJpbmcnLFxuXHRcdCdlbnZpcm9ubWVudCcsXG5cdFx0J2Z1bmN0aW9uJyxcblx0XHQna2V5d29yZCcsXG5cdFx0J2J1aWx0aW4nLFxuXHRcdCdib29sZWFuJyxcblx0XHQnZmlsZS1kZXNjcmlwdG9yJyxcblx0XHQnb3BlcmF0b3InLFxuXHRcdCdwdW5jdHVhdGlvbicsXG5cdFx0J251bWJlcidcblx0XTtcblx0dmFyIGluc2lkZSA9IGluc2lkZVN0cmluZy52YXJpYWJsZVsxXS5pbnNpZGU7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdG9CZUNvcGllZC5sZW5ndGg7IGkrKykge1xuXHRcdGluc2lkZVt0b0JlQ29waWVkW2ldXSA9IFByaXNtLmxhbmd1YWdlcy5iYXNoW3RvQmVDb3BpZWRbaV1dO1xuXHR9XG5cblx0UHJpc20ubGFuZ3VhZ2VzLnNoZWxsID0gUHJpc20ubGFuZ3VhZ2VzLmJhc2g7XG59KFByaXNtKSk7XG4iLCIvLyBodHRwczovL3d3dy5qc29uLm9yZy9qc29uLWVuLmh0bWxcblByaXNtLmxhbmd1YWdlcy5qc29uID0ge1xuXHQncHJvcGVydHknOiB7XG5cdFx0cGF0dGVybjogLyhefFteXFxcXF0pXCIoPzpcXFxcLnxbXlxcXFxcIlxcclxcbl0pKlwiKD89XFxzKjopLyxcblx0XHRsb29rYmVoaW5kOiB0cnVlLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQnc3RyaW5nJzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKVwiKD86XFxcXC58W15cXFxcXCJcXHJcXG5dKSpcIig/IVxccyo6KS8sXG5cdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRncmVlZHk6IHRydWVcblx0fSxcblx0J2NvbW1lbnQnOiB7XG5cdFx0cGF0dGVybjogL1xcL1xcLy4qfFxcL1xcKltcXHNcXFNdKj8oPzpcXCpcXC98JCkvLFxuXHRcdGdyZWVkeTogdHJ1ZVxuXHR9LFxuXHQnbnVtYmVyJzogLy0/XFxiXFxkKyg/OlxcLlxcZCspPyg/OmVbKy1dP1xcZCspP1xcYi9pLFxuXHQncHVuY3R1YXRpb24nOiAvW3t9W1xcXSxdLyxcblx0J29wZXJhdG9yJzogLzovLFxuXHQnYm9vbGVhbic6IC9cXGIoPzp0cnVlfGZhbHNlKVxcYi8sXG5cdCdudWxsJzoge1xuXHRcdHBhdHRlcm46IC9cXGJudWxsXFxiLyxcblx0XHRhbGlhczogJ2tleXdvcmQnXG5cdH1cbn07XG5cblByaXNtLmxhbmd1YWdlcy53ZWJtYW5pZmVzdCA9IFByaXNtLmxhbmd1YWdlcy5qc29uO1xuIiwiUHJpc20ubGFuZ3VhZ2VzLnNjc3MgPSBQcmlzbS5sYW5ndWFnZXMuZXh0ZW5kKCdjc3MnLCB7XG5cdCdjb21tZW50Jzoge1xuXHRcdHBhdHRlcm46IC8oXnxbXlxcXFxdKSg/OlxcL1xcKltcXHNcXFNdKj9cXCpcXC98XFwvXFwvLiopLyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH0sXG5cdCdhdHJ1bGUnOiB7XG5cdFx0cGF0dGVybjogL0BbXFx3LV0oPzpcXChbXigpXStcXCl8W14oKVxcc118XFxzKyg/IVxccykpKj8oPz1cXHMrW3s7XSkvLFxuXHRcdGluc2lkZToge1xuXHRcdFx0J3J1bGUnOiAvQFtcXHctXSsvXG5cdFx0XHQvLyBTZWUgcmVzdCBiZWxvd1xuXHRcdH1cblx0fSxcblx0Ly8gdXJsLCBjb21wYXNzaWZpZWRcblx0J3VybCc6IC8oPzpbLWEtel0rLSk/dXJsKD89XFwoKS9pLFxuXHQvLyBDU1Mgc2VsZWN0b3IgcmVnZXggaXMgbm90IGFwcHJvcHJpYXRlIGZvciBTYXNzXG5cdC8vIHNpbmNlIHRoZXJlIGNhbiBiZSBsb3QgbW9yZSB0aGluZ3MgKHZhciwgQCBkaXJlY3RpdmUsIG5lc3RpbmcuLilcblx0Ly8gYSBzZWxlY3RvciBtdXN0IHN0YXJ0IGF0IHRoZSBlbmQgb2YgYSBwcm9wZXJ0eSBvciBhZnRlciBhIGJyYWNlIChlbmQgb2Ygb3RoZXIgcnVsZXMgb3IgbmVzdGluZylcblx0Ly8gaXQgY2FuIGNvbnRhaW4gc29tZSBjaGFyYWN0ZXJzIHRoYXQgYXJlbid0IHVzZWQgZm9yIGRlZmluaW5nIHJ1bGVzIG9yIGVuZCBvZiBzZWxlY3RvciwgJiAocGFyZW50IHNlbGVjdG9yKSwgb3IgaW50ZXJwb2xhdGVkIHZhcmlhYmxlXG5cdC8vIHRoZSBlbmQgb2YgYSBzZWxlY3RvciBpcyBmb3VuZCB3aGVuIHRoZXJlIGlzIG5vIHJ1bGVzIGluIGl0ICgge30gb3Ige1xcc30pIG9yIGlmIHRoZXJlIGlzIGEgcHJvcGVydHkgKGJlY2F1c2UgYW4gaW50ZXJwb2xhdGVkIHZhclxuXHQvLyBjYW4gXCJwYXNzXCIgYXMgYSBzZWxlY3Rvci0gZS5nOiBwcm9wZXIjeyRlcnR5fSlcblx0Ly8gdGhpcyBvbmUgd2FzIGhhcmQgdG8gZG8sIHNvIHBsZWFzZSBiZSBjYXJlZnVsIGlmIHlvdSBlZGl0IHRoaXMgb25lIDopXG5cdCdzZWxlY3Rvcic6IHtcblx0XHQvLyBJbml0aWFsIGxvb2stYWhlYWQgaXMgdXNlZCB0byBwcmV2ZW50IG1hdGNoaW5nIG9mIGJsYW5rIHNlbGVjdG9yc1xuXHRcdHBhdHRlcm46IC8oPz1cXFMpW15AO3t9KCldPyg/OlteQDt7fSgpXFxzXXxcXHMrKD8hXFxzKXwjXFx7XFwkWy1cXHddK1xcfSkrKD89XFxzKlxceyg/OlxcfXxcXHN8W159XVteOnt9XSpbOntdW159XSkpL20sXG5cdFx0aW5zaWRlOiB7XG5cdFx0XHQncGFyZW50Jzoge1xuXHRcdFx0XHRwYXR0ZXJuOiAvJi8sXG5cdFx0XHRcdGFsaWFzOiAnaW1wb3J0YW50J1xuXHRcdFx0fSxcblx0XHRcdCdwbGFjZWhvbGRlcic6IC8lWy1cXHddKy8sXG5cdFx0XHQndmFyaWFibGUnOiAvXFwkWy1cXHddK3wjXFx7XFwkWy1cXHddK1xcfS9cblx0XHR9XG5cdH0sXG5cdCdwcm9wZXJ0eSc6IHtcblx0XHRwYXR0ZXJuOiAvKD86Wy1cXHddfFxcJFstXFx3XXwjXFx7XFwkWy1cXHddK1xcfSkrKD89XFxzKjopLyxcblx0XHRpbnNpZGU6IHtcblx0XHRcdCd2YXJpYWJsZSc6IC9cXCRbLVxcd10rfCNcXHtcXCRbLVxcd10rXFx9L1xuXHRcdH1cblx0fVxufSk7XG5cblByaXNtLmxhbmd1YWdlcy5pbnNlcnRCZWZvcmUoJ3Njc3MnLCAnYXRydWxlJywge1xuXHQna2V5d29yZCc6IFtcblx0XHQvQCg/OmlmfGVsc2UoPzogaWYpP3xmb3J3YXJkfGZvcnxlYWNofHdoaWxlfGltcG9ydHx1c2V8ZXh0ZW5kfGRlYnVnfHdhcm58bWl4aW58aW5jbHVkZXxmdW5jdGlvbnxyZXR1cm58Y29udGVudClcXGIvaSxcblx0XHR7XG5cdFx0XHRwYXR0ZXJuOiAvKCApKD86ZnJvbXx0aHJvdWdoKSg/PSApLyxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWVcblx0XHR9XG5cdF1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2ltcG9ydGFudCcsIHtcblx0Ly8gdmFyIGFuZCBpbnRlcnBvbGF0ZWQgdmFyc1xuXHQndmFyaWFibGUnOiAvXFwkWy1cXHddK3wjXFx7XFwkWy1cXHddK1xcfS9cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuaW5zZXJ0QmVmb3JlKCdzY3NzJywgJ2Z1bmN0aW9uJywge1xuXHQnbW9kdWxlLW1vZGlmaWVyJzoge1xuXHRcdHBhdHRlcm46IC9cXGIoPzphc3x3aXRofHNob3d8aGlkZSlcXGIvaSxcblx0XHRhbGlhczogJ2tleXdvcmQnXG5cdH0sXG5cdCdwbGFjZWhvbGRlcic6IHtcblx0XHRwYXR0ZXJuOiAvJVstXFx3XSsvLFxuXHRcdGFsaWFzOiAnc2VsZWN0b3InXG5cdH0sXG5cdCdzdGF0ZW1lbnQnOiB7XG5cdFx0cGF0dGVybjogL1xcQiEoPzpkZWZhdWx0fG9wdGlvbmFsKVxcYi9pLFxuXHRcdGFsaWFzOiAna2V5d29yZCdcblx0fSxcblx0J2Jvb2xlYW4nOiAvXFxiKD86dHJ1ZXxmYWxzZSlcXGIvLFxuXHQnbnVsbCc6IHtcblx0XHRwYXR0ZXJuOiAvXFxibnVsbFxcYi8sXG5cdFx0YWxpYXM6ICdrZXl3b3JkJ1xuXHR9LFxuXHQnb3BlcmF0b3InOiB7XG5cdFx0cGF0dGVybjogLyhcXHMpKD86Wy0rKlxcLyVdfFs9IV09fDw9P3w+PT98YW5kfG9yfG5vdCkoPz1cXHMpLyxcblx0XHRsb29rYmVoaW5kOiB0cnVlXG5cdH1cbn0pO1xuXG5QcmlzbS5sYW5ndWFnZXMuc2Nzc1snYXRydWxlJ10uaW5zaWRlLnJlc3QgPSBQcmlzbS5sYW5ndWFnZXMuc2NzcztcbiIsIihmdW5jdGlvbiAoUHJpc20pIHtcblxuXHQvLyBodHRwczovL3lhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNjLW5zLWFuY2hvci1wcm9wZXJ0eVxuXHQvLyBodHRwczovL3lhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNjLW5zLWFsaWFzLW5vZGVcblx0dmFyIGFuY2hvck9yQWxpYXMgPSAvWyomXVteXFxzW1xcXXt9LF0rLztcblx0Ly8gaHR0cHM6Ly95YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjYy1ucy10YWctcHJvcGVydHlcblx0dmFyIHRhZyA9IC8hKD86PFtcXHdcXC0lIzsvPzpAJj0rJCwuIX4qJygpW1xcXV0rPnwoPzpbYS16QS1aXFxkLV0qISk/W1xcd1xcLSUjOy8/OkAmPSskLn4qJygpXSspPy87XG5cdC8vIGh0dHBzOi8veWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2MtbnMtcHJvcGVydGllcyhuLGMpXG5cdHZhciBwcm9wZXJ0aWVzID0gJyg/OicgKyB0YWcuc291cmNlICsgJyg/OlsgXFx0XSsnICsgYW5jaG9yT3JBbGlhcy5zb3VyY2UgKyAnKT98J1xuXHRcdCsgYW5jaG9yT3JBbGlhcy5zb3VyY2UgKyAnKD86WyBcXHRdKycgKyB0YWcuc291cmNlICsgJyk/KSc7XG5cdC8vIGh0dHBzOi8veWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI25zLXBsYWluKG4sYylcblx0Ly8gVGhpcyBpcyBhIHNpbXBsaWZpZWQgdmVyc2lvbiB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCBcIiNcIiBhbmQgbXVsdGlsaW5lIGtleXNcblx0Ly8gQWxsIHRoZXNlIGxvbmcgc2NhcnJ5IGNoYXJhY3RlciBjbGFzc2VzIGFyZSBzaW1wbGlmaWVkIHZlcnNpb25zIG9mIFlBTUwncyBjaGFyYWN0ZXJzXG5cdHZhciBwbGFpbktleSA9IC8oPzpbXlxcc1xceDAwLVxceDA4XFx4MGUtXFx4MWYhXCIjJSYnKixcXC06Pj9AW1xcXWB7fH1cXHg3Zi1cXHg4NFxceDg2LVxceDlmXFx1ZDgwMC1cXHVkZmZmXFx1ZmZmZVxcdWZmZmZdfFs/Oi1dPFBMQUlOPikoPzpbIFxcdF0qKD86KD8hWyM6XSk8UExBSU4+fDo8UExBSU4+KSkqLy5zb3VyY2Vcblx0XHQucmVwbGFjZSgvPFBMQUlOPi9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiAvW15cXHNcXHgwMC1cXHgwOFxceDBlLVxceDFmLFtcXF17fVxceDdmLVxceDg0XFx4ODYtXFx4OWZcXHVkODAwLVxcdWRmZmZcXHVmZmZlXFx1ZmZmZl0vLnNvdXJjZTsgfSk7XG5cdHZhciBzdHJpbmcgPSAvXCIoPzpbXlwiXFxcXFxcclxcbl18XFxcXC4pKlwifCcoPzpbXidcXFxcXFxyXFxuXXxcXFxcLikqJy8uc291cmNlO1xuXG5cdC8qKlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtmbGFnc11cblx0ICogQHJldHVybnMge1JlZ0V4cH1cblx0ICovXG5cdGZ1bmN0aW9uIGNyZWF0ZVZhbHVlUGF0dGVybih2YWx1ZSwgZmxhZ3MpIHtcblx0XHRmbGFncyA9IChmbGFncyB8fCAnJykucmVwbGFjZSgvbS9nLCAnJykgKyAnbSc7IC8vIGFkZCBtIGZsYWdcblx0XHR2YXIgcGF0dGVybiA9IC8oWzpcXC0sW3tdXFxzKig/Olxcczw8cHJvcD4+WyBcXHRdKyk/KSg/Ojw8dmFsdWU+PikoPz1bIFxcdF0qKD86JHwsfFxcXXxcXH18KD86W1xcclxcbl1cXHMqKT8jKSkvLnNvdXJjZVxuXHRcdFx0LnJlcGxhY2UoLzw8cHJvcD4+L2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3BlcnRpZXM7IH0pLnJlcGxhY2UoLzw8dmFsdWU+Pi9nLCBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfSk7XG5cdFx0cmV0dXJuIFJlZ0V4cChwYXR0ZXJuLCBmbGFncyk7XG5cdH1cblxuXHRQcmlzbS5sYW5ndWFnZXMueWFtbCA9IHtcblx0XHQnc2NhbGFyJzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKC8oW1xcLTpdXFxzKig/Olxcczw8cHJvcD4+WyBcXHRdKyk/W3w+XSlbIFxcdF0qKD86KCg/Olxccj9cXG58XFxyKVsgXFx0XSspXFxTW15cXHJcXG5dKig/OlxcMlteXFxyXFxuXSspKikvLnNvdXJjZVxuXHRcdFx0XHQucmVwbGFjZSgvPDxwcm9wPj4vZywgZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJvcGVydGllczsgfSkpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGFsaWFzOiAnc3RyaW5nJ1xuXHRcdH0sXG5cdFx0J2NvbW1lbnQnOiAvIy4qLyxcblx0XHQna2V5Jzoge1xuXHRcdFx0cGF0dGVybjogUmVnRXhwKC8oKD86XnxbOlxcLSxbe1xcclxcbj9dKVsgXFx0XSooPzo8PHByb3A+PlsgXFx0XSspPyk8PGtleT4+KD89XFxzKjpcXHMpLy5zb3VyY2Vcblx0XHRcdFx0LnJlcGxhY2UoLzw8cHJvcD4+L2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3BlcnRpZXM7IH0pXG5cdFx0XHRcdC5yZXBsYWNlKC88PGtleT4+L2csIGZ1bmN0aW9uICgpIHsgcmV0dXJuICcoPzonICsgcGxhaW5LZXkgKyAnfCcgKyBzdHJpbmcgKyAnKSc7IH0pKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWUsXG5cdFx0XHRhbGlhczogJ2F0cnVsZSdcblx0XHR9LFxuXHRcdCdkaXJlY3RpdmUnOiB7XG5cdFx0XHRwYXR0ZXJuOiAvKF5bIFxcdF0qKSUuKy9tLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGFsaWFzOiAnaW1wb3J0YW50J1xuXHRcdH0sXG5cdFx0J2RhdGV0aW1lJzoge1xuXHRcdFx0cGF0dGVybjogY3JlYXRlVmFsdWVQYXR0ZXJuKC9cXGR7NH0tXFxkXFxkPy1cXGRcXGQ/KD86W3RUXXxbIFxcdF0rKVxcZFxcZD86XFxkezJ9OlxcZHsyfSg/OlxcLlxcZCopPyg/OlsgXFx0XSooPzpafFstK11cXGRcXGQ/KD86OlxcZHsyfSk/KSk/fFxcZHs0fS1cXGR7Mn0tXFxkezJ9fFxcZFxcZD86XFxkezJ9KD86OlxcZHsyfSg/OlxcLlxcZCopPyk/Ly5zb3VyY2UpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZSxcblx0XHRcdGFsaWFzOiAnbnVtYmVyJ1xuXHRcdH0sXG5cdFx0J2Jvb2xlYW4nOiB7XG5cdFx0XHRwYXR0ZXJuOiBjcmVhdGVWYWx1ZVBhdHRlcm4oL3RydWV8ZmFsc2UvLnNvdXJjZSwgJ2knKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRhbGlhczogJ2ltcG9ydGFudCdcblx0XHR9LFxuXHRcdCdudWxsJzoge1xuXHRcdFx0cGF0dGVybjogY3JlYXRlVmFsdWVQYXR0ZXJuKC9udWxsfH4vLnNvdXJjZSwgJ2knKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRhbGlhczogJ2ltcG9ydGFudCdcblx0XHR9LFxuXHRcdCdzdHJpbmcnOiB7XG5cdFx0XHRwYXR0ZXJuOiBjcmVhdGVWYWx1ZVBhdHRlcm4oc3RyaW5nKSxcblx0XHRcdGxvb2tiZWhpbmQ6IHRydWUsXG5cdFx0XHRncmVlZHk6IHRydWVcblx0XHR9LFxuXHRcdCdudW1iZXInOiB7XG5cdFx0XHRwYXR0ZXJuOiBjcmVhdGVWYWx1ZVBhdHRlcm4oL1srLV0/KD86MHhbXFxkYS1mXSt8MG9bMC03XSt8KD86XFxkKyg/OlxcLlxcZCopP3xcXC5cXGQrKSg/OmVbKy1dP1xcZCspP3xcXC5pbmZ8XFwubmFuKS8uc291cmNlLCAnaScpLFxuXHRcdFx0bG9va2JlaGluZDogdHJ1ZVxuXHRcdH0sXG5cdFx0J3RhZyc6IHRhZyxcblx0XHQnaW1wb3J0YW50JzogYW5jaG9yT3JBbGlhcyxcblx0XHQncHVuY3R1YXRpb24nOiAvLS0tfFs6W1xcXXt9XFwtLHw+P118XFwuXFwuXFwuL1xuXHR9O1xuXG5cdFByaXNtLmxhbmd1YWdlcy55bWwgPSBQcmlzbS5sYW5ndWFnZXMueWFtbDtcblxufShQcmlzbSkpO1xuIiwiLy8gUmVtb3ZlcyBzdXBwb3J0IGZvciBcIj4vPCBzdHlsZXNcIiBzbyBub24taW5kZW50ZWQgSFRNTCBzaG93cyBjb3JyZWN0bHkgaW4gdGhlIGRpZmYuXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9QcmlzbUpTL3ByaXNtL2Jsb2IvdjEuMTUuMC9jb21wb25lbnRzL3ByaXNtLWRpZmYuanMjTDExXG5leHBvcnQgZGVmYXVsdCB7XG5cdCdjb29yZCc6IFtcblx0XHQvLyBNYXRjaCBhbGwga2luZHMgb2YgY29vcmQgbGluZXMgKHByZWZpeGVkIGJ5IFwiKysrXCIsIFwiLS0tXCIgb3IgXCIqKipcIikuXG5cdFx0L14oPzpcXCp7M318LXszfXxcXCt7M30pLiokL20sXG5cdFx0Ly8gTWF0Y2ggXCJAQCAuLi4gQEBcIiBjb29yZCBsaW5lcyBpbiB1bmlmaWVkIGRpZmYuXG5cdFx0L15AQC4qQEAkL20sXG5cdFx0Ly8gTWF0Y2ggY29vcmQgbGluZXMgaW4gbm9ybWFsIGRpZmYgKHN0YXJ0cyB3aXRoIGEgbnVtYmVyKS5cblx0XHQvXlxcZCsuKiQvbVxuXHRdLFxuXG5cdC8vIE1hdGNoIGluc2VydGVkIGFuZCBkZWxldGVkIGxpbmVzLiBTdXBwb3J0IGJvdGggKy8tIGFuZCA+Lzwgc3R5bGVzLlxuXHQnZGVsZXRlZCc6IC9eWy1dLiokL20sXG5cdCdpbnNlcnRlZCc6IC9eWytdLiokL20sXG5cblx0Ly8gTWF0Y2ggXCJkaWZmZXJlbnRcIiBsaW5lcyAocHJlZml4ZWQgd2l0aCBcIiFcIikgaW4gY29udGV4dCBkaWZmLlxuXHQnZGlmZic6IHtcblx0XHQncGF0dGVybic6IC9eISg/ISEpLiskL20sXG5cdFx0J2FsaWFzJzogJ2ltcG9ydGFudCdcblx0fVxufTtcbiIsImltcG9ydCBTeW50YXhIaWdobGlnaHQgZnJvbSAnLi9zcmMvanMvc3ludGF4LWhpZ2hsaWdodCc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRTeW50YXhIaWdobGlnaHQuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgU3ludGF4SGlnaGxpZ2h0O1xuIiwiaW1wb3J0ICcuLy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7XG4iXX0=