var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "../../node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../node_modules/pretty-format/node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../node_modules/pretty-format/node_modules/ansi-styles/index.js"(exports, module) {
    "use strict";
    var ANSI_BACKGROUND_OFFSET = 10;
    var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
    var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          overline: [53, 55],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi256 = wrapAnsi256();
      styles.color.ansi16m = wrapAnsi16m();
      styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
      styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
      Object.defineProperties(styles, {
        rgbToAnsi256: {
          value: (red, green, blue) => {
            if (red === green && green === blue) {
              if (red < 8) {
                return 16;
              }
              if (red > 248) {
                return 231;
              }
              return Math.round((red - 8) / 247 * 24) + 232;
            }
            return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
          },
          enumerable: false
        },
        hexToRgb: {
          value: (hex) => {
            const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
            if (!matches) {
              return [0, 0, 0];
            }
            let { colorString } = matches.groups;
            if (colorString.length === 3) {
              colorString = colorString.split("").map((character) => character + character).join("");
            }
            const integer = Number.parseInt(colorString, 16);
            return [
              integer >> 16 & 255,
              integer >> 8 & 255,
              integer & 255
            ];
          },
          enumerable: false
        },
        hexToAnsi256: {
          value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
          enumerable: false
        }
      });
      return styles;
    }
    Object.defineProperty(module, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// ../../node_modules/pretty-format/build/collections.js
var require_collections = __commonJS({
  "../../node_modules/pretty-format/build/collections.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printIteratorEntries = printIteratorEntries;
    exports.printIteratorValues = printIteratorValues;
    exports.printListItems = printListItems;
    exports.printObjectProperties = printObjectProperties;
    var getKeysOfEnumerableProperties = (object, compareKeys) => {
      const keys = Object.keys(object).sort(compareKeys);
      if (Object.getOwnPropertySymbols) {
        Object.getOwnPropertySymbols(object).forEach((symbol) => {
          if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
            keys.push(symbol);
          }
        });
      }
      return keys;
    };
    function printIteratorEntries(iterator, config, indentation, depth, refs, printer, separator = ": ") {
      let result = "";
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          const name = printer(
            current.value[0],
            config,
            indentationNext,
            depth,
            refs
          );
          const value = printer(
            current.value[1],
            config,
            indentationNext,
            depth,
            refs
          );
          result += indentationNext + name + separator + value;
          current = iterator.next();
          if (!current.done) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printIteratorValues(iterator, config, indentation, depth, refs, printer) {
      let result = "";
      let current = iterator.next();
      if (!current.done) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        while (!current.done) {
          result += indentationNext + printer(current.value, config, indentationNext, depth, refs);
          current = iterator.next();
          if (!current.done) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printListItems(list, config, indentation, depth, refs, printer) {
      let result = "";
      if (list.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < list.length; i++) {
          result += indentationNext;
          if (i in list) {
            result += printer(list[i], config, indentationNext, depth, refs);
          }
          if (i < list.length - 1) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
    function printObjectProperties(val, config, indentation, depth, refs, printer) {
      let result = "";
      const keys = getKeysOfEnumerableProperties(val, config.compareKeys);
      if (keys.length) {
        result += config.spacingOuter;
        const indentationNext = indentation + config.indent;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const name = printer(key, config, indentationNext, depth, refs);
          const value = printer(val[key], config, indentationNext, depth, refs);
          result += indentationNext + name + ": " + value;
          if (i < keys.length - 1) {
            result += "," + config.spacingInner;
          } else if (!config.min) {
            result += ",";
          }
        }
        result += config.spacingOuter + indentation;
      }
      return result;
    }
  }
});

// ../../node_modules/pretty-format/build/plugins/AsymmetricMatcher.js
var require_AsymmetricMatcher = __commonJS({
  "../../node_modules/pretty-format/build/plugins/AsymmetricMatcher.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var global2 = function() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      } else if (typeof global2 !== "undefined") {
        return global2;
      } else if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else {
        return Function("return this")();
      }
    }();
    var Symbol2 = global2["jest-symbol-do-not-touch"] || global2.Symbol;
    var asymmetricMatcher = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("jest.asymmetricMatcher") : 1267621;
    var SPACE = " ";
    var serialize = (val, config, indentation, depth, refs, printer) => {
      const stringedValue = val.toString();
      if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
        if (++depth > config.maxDepth) {
          return "[" + stringedValue + "]";
        }
        return stringedValue + SPACE + "[" + (0, _collections.printListItems)(
          val.sample,
          config,
          indentation,
          depth,
          refs,
          printer
        ) + "]";
      }
      if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
        if (++depth > config.maxDepth) {
          return "[" + stringedValue + "]";
        }
        return stringedValue + SPACE + "{" + (0, _collections.printObjectProperties)(
          val.sample,
          config,
          indentation,
          depth,
          refs,
          printer
        ) + "}";
      }
      if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }
      return val.toAsymmetricMatcher();
    };
    exports.serialize = serialize;
    var test = (val) => val && val.$$typeof === asymmetricMatcher;
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// ../../node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "../../node_modules/ansi-regex/index.js"(exports, module) {
    "use strict";
    module.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// ../../node_modules/pretty-format/build/plugins/ConvertAnsi.js
var require_ConvertAnsi = __commonJS({
  "../../node_modules/pretty-format/build/plugins/ConvertAnsi.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _ansiRegex = _interopRequireDefault(require_ansi_regex());
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toHumanReadableAnsi = (text) => text.replace((0, _ansiRegex.default)(), (match) => {
      switch (match) {
        case _ansiStyles.default.red.close:
        case _ansiStyles.default.green.close:
        case _ansiStyles.default.cyan.close:
        case _ansiStyles.default.gray.close:
        case _ansiStyles.default.white.close:
        case _ansiStyles.default.yellow.close:
        case _ansiStyles.default.bgRed.close:
        case _ansiStyles.default.bgGreen.close:
        case _ansiStyles.default.bgYellow.close:
        case _ansiStyles.default.inverse.close:
        case _ansiStyles.default.dim.close:
        case _ansiStyles.default.bold.close:
        case _ansiStyles.default.reset.open:
        case _ansiStyles.default.reset.close:
          return "</>";
        case _ansiStyles.default.red.open:
          return "<red>";
        case _ansiStyles.default.green.open:
          return "<green>";
        case _ansiStyles.default.cyan.open:
          return "<cyan>";
        case _ansiStyles.default.gray.open:
          return "<gray>";
        case _ansiStyles.default.white.open:
          return "<white>";
        case _ansiStyles.default.yellow.open:
          return "<yellow>";
        case _ansiStyles.default.bgRed.open:
          return "<bgRed>";
        case _ansiStyles.default.bgGreen.open:
          return "<bgGreen>";
        case _ansiStyles.default.bgYellow.open:
          return "<bgYellow>";
        case _ansiStyles.default.inverse.open:
          return "<inverse>";
        case _ansiStyles.default.dim.open:
          return "<dim>";
        case _ansiStyles.default.bold.open:
          return "<bold>";
        default:
          return "";
      }
    });
    var test = (val) => typeof val === "string" && !!val.match((0, _ansiRegex.default)());
    exports.test = test;
    var serialize = (val, config, indentation, depth, refs, printer) => printer(toHumanReadableAnsi(val), config, indentation, depth, refs);
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/DOMCollection.js
var require_DOMCollection = __commonJS({
  "../../node_modules/pretty-format/build/plugins/DOMCollection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var SPACE = " ";
    var OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
    var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
    var testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
    var test = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
    exports.test = test;
    var isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
    var serialize = (collection, config, indentation, depth, refs, printer) => {
      const name = collection.constructor.name;
      if (++depth > config.maxDepth) {
        return "[" + name + "]";
      }
      return (config.min ? "" : name + SPACE) + (OBJECT_NAMES.indexOf(name) !== -1 ? "{" + (0, _collections.printObjectProperties)(
        isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
          props[attribute.name] = attribute.value;
          return props;
        }, {}) : { ...collection },
        config,
        indentation,
        depth,
        refs,
        printer
      ) + "}" : "[" + (0, _collections.printListItems)(
        Array.from(collection),
        config,
        indentation,
        depth,
        refs,
        printer
      ) + "]");
    };
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/lib/escapeHTML.js
var require_escapeHTML = __commonJS({
  "../../node_modules/pretty-format/build/plugins/lib/escapeHTML.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = escapeHTML;
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }
});

// ../../node_modules/pretty-format/build/plugins/lib/markup.js
var require_markup = __commonJS({
  "../../node_modules/pretty-format/build/plugins/lib/markup.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.printText = exports.printProps = exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printChildren = void 0;
    var _escapeHTML = _interopRequireDefault(require_escapeHTML());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var printProps = (keys, props, config, indentation, depth, refs, printer) => {
      const indentationNext = indentation + config.indent;
      const colors = config.colors;
      return keys.map((key) => {
        const value = props[key];
        let printed = printer(value, config, indentationNext, depth, refs);
        if (typeof value !== "string") {
          if (printed.indexOf("\n") !== -1) {
            printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
          }
          printed = "{" + printed + "}";
        }
        return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
      }).join("");
    };
    exports.printProps = printProps;
    var printChildren = (children, config, indentation, depth, refs, printer) => children.map(
      (child) => config.spacingOuter + indentation + (typeof child === "string" ? printText(child, config) : printer(child, config, indentation, depth, refs))
    ).join("");
    exports.printChildren = printChildren;
    var printText = (text, config) => {
      const contentColor = config.colors.content;
      return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
    };
    exports.printText = printText;
    var printComment = (comment, config) => {
      const commentColor = config.colors.comment;
      return commentColor.open + "<!--" + (0, _escapeHTML.default)(comment) + "-->" + commentColor.close;
    };
    exports.printComment = printComment;
    var printElement = (type, printedProps, printedChildren, config, indentation) => {
      const tagColor = config.colors.tag;
      return tagColor.open + "<" + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + "</" + type : (printedProps && !config.min ? "" : " ") + "/") + ">" + tagColor.close;
    };
    exports.printElement = printElement;
    var printElementAsLeaf = (type, config) => {
      const tagColor = config.colors.tag;
      return tagColor.open + "<" + type + tagColor.close + " \u2026" + tagColor.open + " />" + tagColor.close;
    };
    exports.printElementAsLeaf = printElementAsLeaf;
  }
});

// ../../node_modules/pretty-format/build/plugins/DOMElement.js
var require_DOMElement = __commonJS({
  "../../node_modules/pretty-format/build/plugins/DOMElement.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _markup = require_markup();
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
    var testHasAttribute = (val) => {
      try {
        return typeof val.hasAttribute === "function" && val.hasAttribute("is");
      } catch {
        return false;
      }
    };
    var testNode = (val) => {
      const constructorName = val.constructor.name;
      const { nodeType, tagName } = val;
      const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
      return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE && constructorName === "Text" || nodeType === COMMENT_NODE && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
    };
    var test = (val) => {
      var _val$constructor;
      return (val === null || val === void 0 ? void 0 : (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode(val);
    };
    exports.test = test;
    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }
    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }
    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }
    var serialize = (node, config, indentation, depth, refs, printer) => {
      if (nodeIsText(node)) {
        return (0, _markup.printText)(node.data, config);
      }
      if (nodeIsComment(node)) {
        return (0, _markup.printComment)(node.data, config);
      }
      const type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
      if (++depth > config.maxDepth) {
        return (0, _markup.printElementAsLeaf)(type, config);
      }
      return (0, _markup.printElement)(
        type,
        (0, _markup.printProps)(
          nodeIsFragment(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(),
          nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {}),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        (0, _markup.printChildren)(
          Array.prototype.slice.call(node.childNodes || node.children),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        config,
        indentation
      );
    };
    exports.serialize = serialize;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/Immutable.js
var require_Immutable = __commonJS({
  "../../node_modules/pretty-format/build/plugins/Immutable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _collections = require_collections();
    var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
    var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
    var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
    var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
    var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
    var IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
    var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
    var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
    var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
    var getImmutableName = (name) => "Immutable." + name;
    var printAsLeaf = (name) => "[" + name + "]";
    var SPACE = " ";
    var LAZY = "\u2026";
    var printImmutableEntries = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + "{" + (0, _collections.printIteratorEntries)(
      val.entries(),
      config,
      indentation,
      depth,
      refs,
      printer
    ) + "}";
    function getRecordEntries(val) {
      let i = 0;
      return {
        next() {
          if (i < val._keys.length) {
            const key = val._keys[i++];
            return {
              done: false,
              value: [key, val.get(key)]
            };
          }
          return {
            done: true,
            value: void 0
          };
        }
      };
    }
    var printImmutableRecord = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName(val._name || "Record");
      return ++depth > config.maxDepth ? printAsLeaf(name) : name + SPACE + "{" + (0, _collections.printIteratorEntries)(
        getRecordEntries(val),
        config,
        indentation,
        depth,
        refs,
        printer
      ) + "}";
    };
    var printImmutableSeq = (val, config, indentation, depth, refs, printer) => {
      const name = getImmutableName("Seq");
      if (++depth > config.maxDepth) {
        return printAsLeaf(name);
      }
      if (val[IS_KEYED_SENTINEL]) {
        return name + SPACE + "{" + // from Immutable collection of entries or from ECMAScript object
        (val._iter || val._object ? (0, _collections.printIteratorEntries)(
          val.entries(),
          config,
          indentation,
          depth,
          refs,
          printer
        ) : LAZY) + "}";
      }
      return name + SPACE + "[" + (val._iter || // from Immutable collection of values
      val._array || // from ECMAScript array
      val._collection || // from ECMAScript collection in immutable v4
      val._iterable ? (0, _collections.printIteratorValues)(
        val.values(),
        config,
        indentation,
        depth,
        refs,
        printer
      ) : LAZY) + "]";
    };
    var printImmutableValues = (val, config, indentation, depth, refs, printer, type) => ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + "[" + (0, _collections.printIteratorValues)(
      val.values(),
      config,
      indentation,
      depth,
      refs,
      printer
    ) + "]";
    var serialize = (val, config, indentation, depth, refs, printer) => {
      if (val[IS_MAP_SENTINEL]) {
        return printImmutableEntries(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map"
        );
      }
      if (val[IS_LIST_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          "List"
        );
      }
      if (val[IS_SET_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set"
        );
      }
      if (val[IS_STACK_SENTINEL]) {
        return printImmutableValues(
          val,
          config,
          indentation,
          depth,
          refs,
          printer,
          "Stack"
        );
      }
      if (val[IS_SEQ_SENTINEL]) {
        return printImmutableSeq(val, config, indentation, depth, refs, printer);
      }
      return printImmutableRecord(val, config, indentation, depth, refs, printer);
    };
    exports.serialize = serialize;
    var test = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// ../../node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = 60103;
        var REACT_PORTAL_TYPE = 60106;
        var REACT_FRAGMENT_TYPE = 60107;
        var REACT_STRICT_MODE_TYPE = 60108;
        var REACT_PROFILER_TYPE = 60114;
        var REACT_PROVIDER_TYPE = 60109;
        var REACT_CONTEXT_TYPE = 60110;
        var REACT_FORWARD_REF_TYPE = 60112;
        var REACT_SUSPENSE_TYPE = 60113;
        var REACT_SUSPENSE_LIST_TYPE = 60120;
        var REACT_MEMO_TYPE = 60115;
        var REACT_LAZY_TYPE = 60116;
        var REACT_BLOCK_TYPE = 60121;
        var REACT_SERVER_BLOCK_TYPE = 60122;
        var REACT_FUNDAMENTAL_TYPE = 60117;
        var REACT_SCOPE_TYPE = 60119;
        var REACT_OPAQUE_ID_TYPE = 60128;
        var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
        var REACT_OFFSCREEN_TYPE = 60130;
        var REACT_LEGACY_HIDDEN_TYPE = 60131;
        if (typeof Symbol === "function" && Symbol.for) {
          var symbolFor = Symbol.for;
          REACT_ELEMENT_TYPE = symbolFor("react.element");
          REACT_PORTAL_TYPE = symbolFor("react.portal");
          REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
          REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
          REACT_PROFILER_TYPE = symbolFor("react.profiler");
          REACT_PROVIDER_TYPE = symbolFor("react.provider");
          REACT_CONTEXT_TYPE = symbolFor("react.context");
          REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
          REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
          REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
          REACT_MEMO_TYPE = symbolFor("react.memo");
          REACT_LAZY_TYPE = symbolFor("react.lazy");
          REACT_BLOCK_TYPE = symbolFor("react.block");
          REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
          REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
          REACT_SCOPE_TYPE = symbolFor("react.scope");
          REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
          REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
          REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
          REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
        }
        var enableScopeAPI = false;
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// ../../node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// ../../node_modules/pretty-format/build/plugins/ReactElement.js
var require_ReactElement = __commonJS({
  "../../node_modules/pretty-format/build/plugins/ReactElement.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var ReactIs = _interopRequireWildcard(require_react_is());
    var _markup = require_markup();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var getChildren = (arg, children = []) => {
      if (Array.isArray(arg)) {
        arg.forEach((item) => {
          getChildren(item, children);
        });
      } else if (arg != null && arg !== false) {
        children.push(arg);
      }
      return children;
    };
    var getType = (element) => {
      const type = element.type;
      if (typeof type === "string") {
        return type;
      }
      if (typeof type === "function") {
        return type.displayName || type.name || "Unknown";
      }
      if (ReactIs.isFragment(element)) {
        return "React.Fragment";
      }
      if (ReactIs.isSuspense(element)) {
        return "React.Suspense";
      }
      if (typeof type === "object" && type !== null) {
        if (ReactIs.isContextProvider(element)) {
          return "Context.Provider";
        }
        if (ReactIs.isContextConsumer(element)) {
          return "Context.Consumer";
        }
        if (ReactIs.isForwardRef(element)) {
          if (type.displayName) {
            return type.displayName;
          }
          const functionName = type.render.displayName || type.render.name || "";
          return functionName !== "" ? "ForwardRef(" + functionName + ")" : "ForwardRef";
        }
        if (ReactIs.isMemo(element)) {
          const functionName = type.displayName || type.type.displayName || type.type.name || "";
          return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
        }
      }
      return "UNDEFINED";
    };
    var getPropKeys = (element) => {
      const { props } = element;
      return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
    };
    var serialize = (element, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(getType(element), config) : (0, _markup.printElement)(
      getType(element),
      (0, _markup.printProps)(
        getPropKeys(element),
        element.props,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ),
      (0, _markup.printChildren)(
        getChildren(element.props.children),
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ),
      config,
      indentation
    );
    exports.serialize = serialize;
    var test = (val) => val != null && ReactIs.isElement(val);
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// ../../node_modules/pretty-format/build/plugins/ReactTestComponent.js
var require_ReactTestComponent = __commonJS({
  "../../node_modules/pretty-format/build/plugins/ReactTestComponent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.test = exports.serialize = exports.default = void 0;
    var _markup = require_markup();
    var global2 = function() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      } else if (typeof global2 !== "undefined") {
        return global2;
      } else if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else {
        return Function("return this")();
      }
    }();
    var Symbol2 = global2["jest-symbol-do-not-touch"] || global2.Symbol;
    var testSymbol = typeof Symbol2 === "function" && Symbol2.for ? Symbol2.for("react.test.json") : 245830487;
    var getPropKeys = (object) => {
      const { props } = object;
      return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
    };
    var serialize = (object, config, indentation, depth, refs, printer) => ++depth > config.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config) : (0, _markup.printElement)(
      object.type,
      object.props ? (0, _markup.printProps)(
        getPropKeys(object),
        object.props,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ) : "",
      object.children ? (0, _markup.printChildren)(
        object.children,
        config,
        indentation + config.indent,
        depth,
        refs,
        printer
      ) : "",
      config,
      indentation
    );
    exports.serialize = serialize;
    var test = (val) => val && val.$$typeof === testSymbol;
    exports.test = test;
    var plugin = {
      serialize,
      test
    };
    var _default = plugin;
    exports.default = _default;
  }
});

// ../../node_modules/pretty-format/build/index.js
var require_build = __commonJS({
  "../../node_modules/pretty-format/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.DEFAULT_OPTIONS = void 0;
    exports.format = format;
    exports.plugins = void 0;
    var _ansiStyles = _interopRequireDefault(require_ansi_styles());
    var _collections = require_collections();
    var _AsymmetricMatcher = _interopRequireDefault(
      require_AsymmetricMatcher()
    );
    var _ConvertAnsi = _interopRequireDefault(require_ConvertAnsi());
    var _DOMCollection = _interopRequireDefault(require_DOMCollection());
    var _DOMElement = _interopRequireDefault(require_DOMElement());
    var _Immutable = _interopRequireDefault(require_Immutable());
    var _ReactElement = _interopRequireDefault(require_ReactElement());
    var _ReactTestComponent = _interopRequireDefault(
      require_ReactTestComponent()
    );
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var toString = Object.prototype.toString;
    var toISOString = Date.prototype.toISOString;
    var errorToString = Error.prototype.toString;
    var regExpToString = RegExp.prototype.toString;
    var getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
    var isWindow = (val) => typeof window !== "undefined" && val === window;
    var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    var NEWLINE_REGEXP = /\n/gi;
    var PrettyFormatPluginError = class extends Error {
      constructor(message, stack) {
        super(message);
        this.stack = stack;
        this.name = this.constructor.name;
      }
    };
    function isToStringedArrayType(toStringed) {
      return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
    }
    function printNumber(val) {
      return Object.is(val, -0) ? "-0" : String(val);
    }
    function printBigInt(val) {
      return String(`${val}n`);
    }
    function printFunction(val, printFunctionName) {
      if (!printFunctionName) {
        return "[Function]";
      }
      return "[Function " + (val.name || "anonymous") + "]";
    }
    function printSymbol(val) {
      return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
    }
    function printError(val) {
      return "[" + errorToString.call(val) + "]";
    }
    function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
      if (val === true || val === false) {
        return "" + val;
      }
      if (val === void 0) {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }
      const typeOf = typeof val;
      if (typeOf === "number") {
        return printNumber(val);
      }
      if (typeOf === "bigint") {
        return printBigInt(val);
      }
      if (typeOf === "string") {
        if (escapeString) {
          return '"' + val.replace(/"|\\/g, "\\$&") + '"';
        }
        return '"' + val + '"';
      }
      if (typeOf === "function") {
        return printFunction(val, printFunctionName);
      }
      if (typeOf === "symbol") {
        return printSymbol(val);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object WeakMap]") {
        return "WeakMap {}";
      }
      if (toStringed === "[object WeakSet]") {
        return "WeakSet {}";
      }
      if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
        return printFunction(val, printFunctionName);
      }
      if (toStringed === "[object Symbol]") {
        return printSymbol(val);
      }
      if (toStringed === "[object Date]") {
        return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
      }
      if (toStringed === "[object Error]") {
        return printError(val);
      }
      if (toStringed === "[object RegExp]") {
        if (escapeRegex) {
          return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        return regExpToString.call(val);
      }
      if (val instanceof Error) {
        return printError(val);
      }
      return null;
    }
    function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
      if (refs.indexOf(val) !== -1) {
        return "[Circular]";
      }
      refs = refs.slice();
      refs.push(val);
      const hitMaxDepth = ++depth > config.maxDepth;
      const min = config.min;
      if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
        return printer(val.toJSON(), config, indentation, depth, refs, true);
      }
      const toStringed = toString.call(val);
      if (toStringed === "[object Arguments]") {
        return hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + (0, _collections.printListItems)(
          val,
          config,
          indentation,
          depth,
          refs,
          printer
        ) + "]";
      }
      if (isToStringedArrayType(toStringed)) {
        return hitMaxDepth ? "[" + val.constructor.name + "]" : (min ? "" : !config.printBasicPrototype && val.constructor.name === "Array" ? "" : val.constructor.name + " ") + "[" + (0, _collections.printListItems)(
          val,
          config,
          indentation,
          depth,
          refs,
          printer
        ) + "]";
      }
      if (toStringed === "[object Map]") {
        return hitMaxDepth ? "[Map]" : "Map {" + (0, _collections.printIteratorEntries)(
          val.entries(),
          config,
          indentation,
          depth,
          refs,
          printer,
          " => "
        ) + "}";
      }
      if (toStringed === "[object Set]") {
        return hitMaxDepth ? "[Set]" : "Set {" + (0, _collections.printIteratorValues)(
          val.values(),
          config,
          indentation,
          depth,
          refs,
          printer
        ) + "}";
      }
      return hitMaxDepth || isWindow(val) ? "[" + getConstructorName(val) + "]" : (min ? "" : !config.printBasicPrototype && getConstructorName(val) === "Object" ? "" : getConstructorName(val) + " ") + "{" + (0, _collections.printObjectProperties)(
        val,
        config,
        indentation,
        depth,
        refs,
        printer
      ) + "}";
    }
    function isNewPlugin(plugin) {
      return plugin.serialize != null;
    }
    function printPlugin(plugin, val, config, indentation, depth, refs) {
      let printed;
      try {
        printed = isNewPlugin(plugin) ? plugin.serialize(val, config, indentation, depth, refs, printer) : plugin.print(
          val,
          (valChild) => printer(valChild, config, indentation, depth, refs),
          (str) => {
            const indentationNext = indentation + config.indent;
            return indentationNext + str.replace(NEWLINE_REGEXP, "\n" + indentationNext);
          },
          {
            edgeSpacing: config.spacingOuter,
            min: config.min,
            spacing: config.spacingInner
          },
          config.colors
        );
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }
      if (typeof printed !== "string") {
        throw new Error(
          `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
        );
      }
      return printed;
    }
    function findPlugin(plugins2, val) {
      for (let p = 0; p < plugins2.length; p++) {
        try {
          if (plugins2[p].test(val)) {
            return plugins2[p];
          }
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
      }
      return null;
    }
    function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
      const plugin = findPlugin(config.plugins, val);
      if (plugin !== null) {
        return printPlugin(plugin, val, config, indentation, depth, refs);
      }
      const basicResult = printBasicValue(
        val,
        config.printFunctionName,
        config.escapeRegex,
        config.escapeString
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(
        val,
        config,
        indentation,
        depth,
        refs,
        hasCalledToJSON
      );
    }
    var DEFAULT_THEME = {
      comment: "gray",
      content: "reset",
      prop: "yellow",
      tag: "cyan",
      value: "green"
    };
    var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
    var DEFAULT_OPTIONS = {
      callToJSON: true,
      compareKeys: void 0,
      escapeRegex: false,
      escapeString: true,
      highlight: false,
      indent: 2,
      maxDepth: Infinity,
      min: false,
      plugins: [],
      printBasicPrototype: true,
      printFunctionName: true,
      theme: DEFAULT_THEME
    };
    exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
    function validateOptions(options) {
      Object.keys(options).forEach((key) => {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          throw new Error(`pretty-format: Unknown option "${key}".`);
        }
      });
      if (options.min && options.indent !== void 0 && options.indent !== 0) {
        throw new Error(
          'pretty-format: Options "min" and "indent" cannot be used together.'
        );
      }
      if (options.theme !== void 0) {
        if (options.theme === null) {
          throw new Error('pretty-format: Option "theme" must not be null.');
        }
        if (typeof options.theme !== "object") {
          throw new Error(
            `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
          );
        }
      }
    }
    var getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
      const color = value && _ansiStyles.default[value];
      if (color && typeof color.close === "string" && typeof color.open === "string") {
        colors[key] = color;
      } else {
        throw new Error(
          `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
        );
      }
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
      colors[key] = {
        close: "",
        open: ""
      };
      return colors;
    }, /* @__PURE__ */ Object.create(null));
    var getPrintFunctionName = (options) => options && options.printFunctionName !== void 0 ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
    var getEscapeRegex = (options) => options && options.escapeRegex !== void 0 ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
    var getEscapeString = (options) => options && options.escapeString !== void 0 ? options.escapeString : DEFAULT_OPTIONS.escapeString;
    var getConfig = (options) => {
      var _options$printBasicPr;
      return {
        callToJSON: options && options.callToJSON !== void 0 ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
        colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
        compareKeys: options && typeof options.compareKeys === "function" ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
        escapeRegex: getEscapeRegex(options),
        escapeString: getEscapeString(options),
        indent: options && options.min ? "" : createIndent(
          options && options.indent !== void 0 ? options.indent : DEFAULT_OPTIONS.indent
        ),
        maxDepth: options && options.maxDepth !== void 0 ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
        min: options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS.min,
        plugins: options && options.plugins !== void 0 ? options.plugins : DEFAULT_OPTIONS.plugins,
        printBasicPrototype: (_options$printBasicPr = options === null || options === void 0 ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true,
        printFunctionName: getPrintFunctionName(options),
        spacingInner: options && options.min ? " " : "\n",
        spacingOuter: options && options.min ? "" : "\n"
      };
    };
    function createIndent(indent) {
      return new Array(indent + 1).join(" ");
    }
    function format(val, options) {
      if (options) {
        validateOptions(options);
        if (options.plugins) {
          const plugin = findPlugin(options.plugins, val);
          if (plugin !== null) {
            return printPlugin(plugin, val, getConfig(options), "", 0, []);
          }
        }
      }
      const basicResult = printBasicValue(
        val,
        getPrintFunctionName(options),
        getEscapeRegex(options),
        getEscapeString(options)
      );
      if (basicResult !== null) {
        return basicResult;
      }
      return printComplexValue(val, getConfig(options), "", 0, []);
    }
    var plugins = {
      AsymmetricMatcher: _AsymmetricMatcher.default,
      ConvertAnsi: _ConvertAnsi.default,
      DOMCollection: _DOMCollection.default,
      DOMElement: _DOMElement.default,
      Immutable: _Immutable.default,
      ReactElement: _ReactElement.default,
      ReactTestComponent: _ReactTestComponent.default
    };
    exports.plugins = plugins;
    var _default = format;
    exports.default = _default;
  }
});

// ../../node_modules/@testing-library/dom/dist/DOMElementFilter.js
var require_DOMElementFilter = __commonJS({
  "../../node_modules/@testing-library/dom/dist/DOMElementFilter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createDOMElementFilter;
    exports.test = void 0;
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    var printProps = (keys, props, config, indentation, depth, refs, printer) => {
      const indentationNext = indentation + config.indent;
      const colors = config.colors;
      return keys.map((key) => {
        const value = props[key];
        let printed = printer(value, config, indentationNext, depth, refs);
        if (typeof value !== "string") {
          if (printed.indexOf("\n") !== -1) {
            printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
          }
          printed = "{" + printed + "}";
        }
        return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
      }).join("");
    };
    var NodeTypeTextNode = 3;
    var printChildren = (children, config, indentation, depth, refs, printer) => children.map((child) => {
      const printedChild = typeof child === "string" ? printText(child, config) : printer(child, config, indentation, depth, refs);
      if (printedChild === "" && typeof child === "object" && child !== null && child.nodeType !== NodeTypeTextNode) {
        return "";
      }
      return config.spacingOuter + indentation + printedChild;
    }).join("");
    var printText = (text, config) => {
      const contentColor = config.colors.content;
      return contentColor.open + escapeHTML(text) + contentColor.close;
    };
    var printComment = (comment, config) => {
      const commentColor = config.colors.comment;
      return commentColor.open + "<!--" + escapeHTML(comment) + "-->" + commentColor.close;
    };
    var printElement = (type, printedProps, printedChildren, config, indentation) => {
      const tagColor = config.colors.tag;
      return tagColor.open + "<" + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + "</" + type : (printedProps && !config.min ? "" : " ") + "/") + ">" + tagColor.close;
    };
    var printElementAsLeaf = (type, config) => {
      const tagColor = config.colors.tag;
      return tagColor.open + "<" + type + tagColor.close + " \u2026" + tagColor.open + " />" + tagColor.close;
    };
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
    var testNode = (val) => {
      const constructorName = val.constructor.name;
      const {
        nodeType,
        tagName
      } = val;
      const isCustomElement = typeof tagName === "string" && tagName.includes("-") || typeof val.hasAttribute === "function" && val.hasAttribute("is");
      return nodeType === ELEMENT_NODE && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE && constructorName === "Text" || nodeType === COMMENT_NODE && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
    };
    var test = (val) => {
      var _val$constructor;
      return (val == null ? void 0 : (_val$constructor = val.constructor) == null ? void 0 : _val$constructor.name) && testNode(val);
    };
    exports.test = test;
    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }
    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }
    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }
    function createDOMElementFilter(filterNode) {
      return {
        test: (val) => {
          var _val$constructor2;
          return (val == null ? void 0 : (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
        },
        serialize: (node, config, indentation, depth, refs, printer) => {
          if (nodeIsText(node)) {
            return printText(node.data, config);
          }
          if (nodeIsComment(node)) {
            return printComment(node.data, config);
          }
          const type = nodeIsFragment(node) ? `DocumentFragment` : node.tagName.toLowerCase();
          if (++depth > config.maxDepth) {
            return printElementAsLeaf(type, config);
          }
          return printElement(type, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {}), config, indentation + config.indent, depth, refs, printer), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config, indentation + config.indent, depth, refs, printer), config, indentation);
        }
      };
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/get-user-code-frame.js
var require_get_user_code_frame = __commonJS({
  "../../node_modules/@testing-library/dom/dist/get-user-code-frame.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getUserCodeFrame = getUserCodeFrame;
    var chalk = null;
    var readFileSync = null;
    var codeFrameColumns = null;
    try {
      const nodeRequire = module && module.require;
      readFileSync = nodeRequire.call(module, "fs").readFileSync;
      codeFrameColumns = nodeRequire.call(module, "@babel/code-frame").codeFrameColumns;
      chalk = nodeRequire.call(module, "chalk");
    } catch {
    }
    function getCodeFrame(frame) {
      const locationStart = frame.indexOf("(") + 1;
      const locationEnd = frame.indexOf(")");
      const frameLocation = frame.slice(locationStart, locationEnd);
      const frameLocationElements = frameLocation.split(":");
      const [filename, line, column] = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)];
      let rawFileContents = "";
      try {
        rawFileContents = readFileSync(filename, "utf-8");
      } catch {
        return "";
      }
      const codeFrame = codeFrameColumns(rawFileContents, {
        start: {
          line,
          column
        }
      }, {
        highlightCode: true,
        linesBelow: 0
      });
      return `${chalk.dim(frameLocation)}
${codeFrame}
`;
    }
    function getUserCodeFrame() {
      if (!readFileSync || !codeFrameColumns) {
        return "";
      }
      const err = new Error();
      const firstClientCodeFrame = err.stack.split("\n").slice(1).find((frame) => !frame.includes("node_modules/"));
      return getCodeFrame(firstClientCodeFrame);
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/helpers.js
var require_helpers = __commonJS({
  "../../node_modules/@testing-library/dom/dist/helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TEXT_NODE = void 0;
    exports.checkContainerType = checkContainerType;
    exports.getDocument = getDocument;
    exports.getWindowFromNode = getWindowFromNode;
    exports.jestFakeTimersAreEnabled = jestFakeTimersAreEnabled;
    var TEXT_NODE = 3;
    exports.TEXT_NODE = TEXT_NODE;
    function jestFakeTimersAreEnabled() {
      if (typeof jest !== "undefined" && jest !== null) {
        return (
          // legacy timers
          setTimeout._isMockFunction === true || // modern timers
          Object.prototype.hasOwnProperty.call(setTimeout, "clock")
        );
      }
      return false;
    }
    function getDocument() {
      if (typeof window === "undefined") {
        throw new Error("Could not find default container");
      }
      return window.document;
    }
    function getWindowFromNode(node) {
      if (node.defaultView) {
        return node.defaultView;
      } else if (node.ownerDocument && node.ownerDocument.defaultView) {
        return node.ownerDocument.defaultView;
      } else if (node.window) {
        return node.window;
      } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
        throw new Error(`It looks like the window object is not available for the provided node.`);
      } else if (node.then instanceof Function) {
        throw new Error(`It looks like you passed a Promise object instead of a DOM node. Did you do something like \`fireEvent.click(screen.findBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`, or await the findBy query \`fireEvent.click(await screen.findBy...\`?`);
      } else if (Array.isArray(node)) {
        throw new Error(`It looks like you passed an Array instead of a DOM node. Did you do something like \`fireEvent.click(screen.getAllBy...\` when you meant to use a \`getBy\` query \`fireEvent.click(screen.getBy...\`?`);
      } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
        throw new Error(`It looks like you passed a \`screen\` object. Did you do something like \`fireEvent.click(screen, ...\` when you meant to use a query, e.g. \`fireEvent.click(screen.getBy..., \`?`);
      } else {
        throw new Error(`The given node is not an Element, the node type is: ${typeof node}.`);
      }
    }
    function checkContainerType(container) {
      if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
        throw new TypeError(`Expected container to be an Element, a Document or a DocumentFragment but got ${getTypeName(container)}.`);
      }
      function getTypeName(object) {
        if (typeof object === "object") {
          return object === null ? "null" : object.constructor.name;
        }
        return typeof object;
      }
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/pretty-dom.js
var require_pretty_dom = __commonJS({
  "../../node_modules/@testing-library/dom/dist/pretty-dom.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.logDOM = void 0;
    exports.prettyDOM = prettyDOM;
    exports.prettyFormat = void 0;
    var prettyFormat = _interopRequireWildcard(require_build());
    exports.prettyFormat = prettyFormat;
    var _DOMElementFilter = _interopRequireDefault(require_DOMElementFilter());
    var _getUserCodeFrame = require_get_user_code_frame();
    var _helpers = require_helpers();
    var _config = require_config();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var shouldHighlight = () => {
      let colors;
      try {
        var _process, _process$env;
        colors = JSON.parse((_process = process) == null ? void 0 : (_process$env = _process.env) == null ? void 0 : _process$env.COLORS);
      } catch (e) {
      }
      if (typeof colors === "boolean") {
        return colors;
      } else {
        return typeof process !== "undefined" && process.versions !== void 0 && process.versions.node !== void 0;
      }
    };
    var {
      DOMCollection
    } = prettyFormat.plugins;
    var ELEMENT_NODE = 1;
    var COMMENT_NODE = 8;
    function filterCommentsAndDefaultIgnoreTagsTags(value) {
      return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches((0, _config.getConfig)().defaultIgnore));
    }
    function prettyDOM(dom2, maxLength, options = {}) {
      if (!dom2) {
        dom2 = (0, _helpers.getDocument)().body;
      }
      if (typeof maxLength !== "number") {
        maxLength = typeof process !== "undefined" && process.env.DEBUG_PRINT_LIMIT || 7e3;
      }
      if (maxLength === 0) {
        return "";
      }
      if (dom2.documentElement) {
        dom2 = dom2.documentElement;
      }
      let domTypeName = typeof dom2;
      if (domTypeName === "object") {
        domTypeName = dom2.constructor.name;
      } else {
        dom2 = {};
      }
      if (!("outerHTML" in dom2)) {
        throw new TypeError(`Expected an element or document but got ${domTypeName}`);
      }
      const {
        filterNode = filterCommentsAndDefaultIgnoreTagsTags,
        ...prettyFormatOptions
      } = options;
      const debugContent = prettyFormat.format(dom2, {
        plugins: [(0, _DOMElementFilter.default)(filterNode), DOMCollection],
        printFunctionName: false,
        highlight: shouldHighlight(),
        ...prettyFormatOptions
      });
      return maxLength !== void 0 && dom2.outerHTML.length > maxLength ? `${debugContent.slice(0, maxLength)}...` : debugContent;
    }
    var logDOM = (...args) => {
      const userCodeFrame = (0, _getUserCodeFrame.getUserCodeFrame)();
      if (userCodeFrame) {
        console.log(`${prettyDOM(...args)}

${userCodeFrame}`);
      } else {
        console.log(prettyDOM(...args));
      }
    };
    exports.logDOM = logDOM;
  }
});

// ../../node_modules/@testing-library/dom/dist/config.js
var require_config = __commonJS({
  "../../node_modules/@testing-library/dom/dist/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.configure = configure;
    exports.getConfig = getConfig;
    exports.runWithExpensiveErrorDiagnosticsDisabled = runWithExpensiveErrorDiagnosticsDisabled;
    var _prettyDom = require_pretty_dom();
    var config = {
      testIdAttribute: "data-testid",
      asyncUtilTimeout: 1e3,
      // asyncWrapper and advanceTimersWrapper is to support React's async `act` function.
      // forcing react-testing-library to wrap all async functions would've been
      // a total nightmare (consider wrapping every findBy* query and then also
      // updating `within` so those would be wrapped too. Total nightmare).
      // so we have this config option that's really only intended for
      // react-testing-library to use. For that reason, this feature will remain
      // undocumented.
      asyncWrapper: (cb) => cb(),
      unstable_advanceTimersWrapper: (cb) => cb(),
      eventWrapper: (cb) => cb(),
      // default value for the `hidden` option in `ByRole` queries
      defaultHidden: false,
      // default value for the `ignore` option in `ByText` queries
      defaultIgnore: "script, style",
      // showOriginalStackTrace flag to show the full error stack traces for async errors
      showOriginalStackTrace: false,
      // throw errors w/ suggestions for better queries. Opt in so off by default.
      throwSuggestions: false,
      // called when getBy* queries fail. (message, container) => Error
      getElementError(message, container) {
        const prettifiedDOM = (0, _prettyDom.prettyDOM)(container);
        const error = new Error([message, `Ignored nodes: comments, ${config.defaultIgnore}
${prettifiedDOM}`].filter(Boolean).join("\n\n"));
        error.name = "TestingLibraryElementError";
        return error;
      },
      _disableExpensiveErrorDiagnostics: false,
      computedStyleSupportsPseudoElements: false
    };
    function runWithExpensiveErrorDiagnosticsDisabled(callback) {
      try {
        config._disableExpensiveErrorDiagnostics = true;
        return callback();
      } finally {
        config._disableExpensiveErrorDiagnostics = false;
      }
    }
    function configure(newConfig) {
      if (typeof newConfig === "function") {
        newConfig = newConfig(config);
      }
      config = {
        ...config,
        ...newConfig
      };
    }
    function getConfig() {
      return config;
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/label-helpers.js
var require_label_helpers = __commonJS({
  "../../node_modules/@testing-library/dom/dist/label-helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getLabelContent = getLabelContent;
    exports.getLabels = getLabels;
    exports.getRealLabels = getRealLabels;
    var _helpers = require_helpers();
    var labelledNodeNames = ["button", "meter", "output", "progress", "select", "textarea", "input"];
    function getTextContent(node) {
      if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
        return "";
      }
      if (node.nodeType === _helpers.TEXT_NODE)
        return node.textContent;
      return Array.from(node.childNodes).map((childNode) => getTextContent(childNode)).join("");
    }
    function getLabelContent(element) {
      let textContent;
      if (element.tagName.toLowerCase() === "label") {
        textContent = getTextContent(element);
      } else {
        textContent = element.value || element.textContent;
      }
      return textContent;
    }
    function getRealLabels(element) {
      if (element.labels !== void 0) {
        var _labels;
        return (_labels = element.labels) != null ? _labels : [];
      }
      if (!isLabelable(element))
        return [];
      const labels = element.ownerDocument.querySelectorAll("label");
      return Array.from(labels).filter((label) => label.control === element);
    }
    function isLabelable(element) {
      return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === "INPUT" && element.getAttribute("type") !== "hidden";
    }
    function getLabels(container, element, {
      selector = "*"
    } = {}) {
      const ariaLabelledBy = element.getAttribute("aria-labelledby");
      const labelsId = ariaLabelledBy ? ariaLabelledBy.split(" ") : [];
      return labelsId.length ? labelsId.map((labelId) => {
        const labellingElement = container.querySelector(`[id="${labelId}"]`);
        return labellingElement ? {
          content: getLabelContent(labellingElement),
          formControl: null
        } : {
          content: "",
          formControl: null
        };
      }) : Array.from(getRealLabels(element)).map((label) => {
        const textToMatch = getLabelContent(label);
        const formControlSelector = "button, input, meter, output, progress, select, textarea";
        const labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter((formControlElement) => formControlElement.matches(selector))[0];
        return {
          content: textToMatch,
          formControl: labelledFormControl
        };
      });
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/matches.js
var require_matches = __commonJS({
  "../../node_modules/@testing-library/dom/dist/matches.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.fuzzyMatches = fuzzyMatches;
    exports.getDefaultNormalizer = getDefaultNormalizer;
    exports.makeNormalizer = makeNormalizer;
    exports.matches = matches;
    function assertNotNullOrUndefined(matcher) {
      if (matcher === null || matcher === void 0) {
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- implicitly converting `T` to `string`
          `It looks like ${matcher} was passed instead of a matcher. Did you do something like getByText(${matcher})?`
        );
      }
    }
    function fuzzyMatches(textToMatch, node, matcher, normalizer) {
      if (typeof textToMatch !== "string") {
        return false;
      }
      assertNotNullOrUndefined(matcher);
      const normalizedText = normalizer(textToMatch);
      if (typeof matcher === "string" || typeof matcher === "number") {
        return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
      } else if (typeof matcher === "function") {
        return matcher(normalizedText, node);
      } else {
        return matchRegExp(matcher, normalizedText);
      }
    }
    function matches(textToMatch, node, matcher, normalizer) {
      if (typeof textToMatch !== "string") {
        return false;
      }
      assertNotNullOrUndefined(matcher);
      const normalizedText = normalizer(textToMatch);
      if (matcher instanceof Function) {
        return matcher(normalizedText, node);
      } else if (matcher instanceof RegExp) {
        return matchRegExp(matcher, normalizedText);
      } else {
        return normalizedText === String(matcher);
      }
    }
    function getDefaultNormalizer({
      trim = true,
      collapseWhitespace = true
    } = {}) {
      return (text) => {
        let normalizedText = text;
        normalizedText = trim ? normalizedText.trim() : normalizedText;
        normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, " ") : normalizedText;
        return normalizedText;
      };
    }
    function makeNormalizer({
      trim,
      collapseWhitespace,
      normalizer
    }) {
      if (!normalizer) {
        return getDefaultNormalizer({
          trim,
          collapseWhitespace
        });
      }
      if (typeof trim !== "undefined" || typeof collapseWhitespace !== "undefined") {
        throw new Error('trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
      }
      return normalizer;
    }
    function matchRegExp(matcher, text) {
      const match = matcher.test(text);
      if (matcher.global && matcher.lastIndex !== 0) {
        console.warn(`To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.`);
        matcher.lastIndex = 0;
      }
      return match;
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/get-node-text.js
var require_get_node_text = __commonJS({
  "../../node_modules/@testing-library/dom/dist/get-node-text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getNodeText = getNodeText;
    var _helpers = require_helpers();
    function getNodeText(node) {
      if (node.matches("input[type=submit], input[type=button], input[type=reset]")) {
        return node.value;
      }
      return Array.from(node.childNodes).filter((child) => child.nodeType === _helpers.TEXT_NODE && Boolean(child.textContent)).map((c) => c.textContent).join("");
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/polyfills/array.from.js
var require_array_from = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/polyfills/array.from.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.default = arrayFrom;
    var toStr = Object.prototype.toString;
    function isCallable(fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    }
    function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    }
    var maxSafeInteger = Math.pow(2, 53) - 1;
    function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    }
    function arrayFrom(arrayLike, mapFn) {
      var C = Array;
      var items = Object(arrayLike);
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }
      if (typeof mapFn !== "undefined") {
        if (!isCallable(mapFn)) {
          throw new TypeError("Array.from: when provided, the second argument must be a function");
        }
      }
      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = mapFn(kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      A.length = len;
      return A;
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/polyfills/SetLike.js
var require_SetLike = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/polyfills/SetLike.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.default = void 0;
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    var SetLike = /* @__PURE__ */ function() {
      function SetLike2() {
        var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        _classCallCheck(this, SetLike2);
        _defineProperty(this, "items", void 0);
        this.items = items;
      }
      _createClass(SetLike2, [{
        key: "add",
        value: function add(value) {
          if (this.has(value) === false) {
            this.items.push(value);
          }
          return this;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.items = [];
        }
      }, {
        key: "delete",
        value: function _delete(value) {
          var previousLength = this.items.length;
          this.items = this.items.filter(function(item) {
            return item !== value;
          });
          return previousLength !== this.items.length;
        }
      }, {
        key: "forEach",
        value: function forEach(callbackfn) {
          var _this = this;
          this.items.forEach(function(item) {
            callbackfn(item, item, _this);
          });
        }
      }, {
        key: "has",
        value: function has(value) {
          return this.items.indexOf(value) !== -1;
        }
      }, {
        key: "size",
        get: function get() {
          return this.items.length;
        }
      }]);
      return SetLike2;
    }();
    var _default = typeof Set === "undefined" ? Set : SetLike;
    exports.default = _default;
  }
});

// ../../node_modules/dom-accessibility-api/dist/getRole.js
var require_getRole = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/getRole.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.default = getRole;
    exports.getLocalName = getLocalName;
    function getLocalName(element) {
      var _element$localName;
      return (
        // eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
        (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : (
          // eslint-disable-next-line no-restricted-properties -- required for the fallback
          element.tagName.toLowerCase()
        )
      );
    }
    var localNameToRoleMappings = {
      article: "article",
      aside: "complementary",
      button: "button",
      datalist: "listbox",
      dd: "definition",
      details: "group",
      dialog: "dialog",
      dt: "term",
      fieldset: "group",
      figure: "figure",
      // WARNING: Only with an accessible name
      form: "form",
      footer: "contentinfo",
      h1: "heading",
      h2: "heading",
      h3: "heading",
      h4: "heading",
      h5: "heading",
      h6: "heading",
      header: "banner",
      hr: "separator",
      html: "document",
      legend: "legend",
      li: "listitem",
      math: "math",
      main: "main",
      menu: "list",
      nav: "navigation",
      ol: "list",
      optgroup: "group",
      // WARNING: Only in certain context
      option: "option",
      output: "status",
      progress: "progressbar",
      // WARNING: Only with an accessible name
      section: "region",
      summary: "button",
      table: "table",
      tbody: "rowgroup",
      textarea: "textbox",
      tfoot: "rowgroup",
      // WARNING: Only in certain context
      td: "cell",
      th: "columnheader",
      thead: "rowgroup",
      tr: "row",
      ul: "list"
    };
    var prohibitedAttributes = {
      caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
      insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
      superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
    };
    function hasGlobalAriaAttributes(element, role) {
      return [
        "aria-atomic",
        "aria-busy",
        "aria-controls",
        "aria-current",
        "aria-describedby",
        "aria-details",
        // "disabled",
        "aria-dropeffect",
        // "errormessage",
        "aria-flowto",
        "aria-grabbed",
        // "haspopup",
        "aria-hidden",
        // "invalid",
        "aria-keyshortcuts",
        "aria-label",
        "aria-labelledby",
        "aria-live",
        "aria-owns",
        "aria-relevant",
        "aria-roledescription"
      ].some(function(attributeName) {
        var _prohibitedAttributes;
        return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
      });
    }
    function ignorePresentationalRole(element, implicitRole) {
      return hasGlobalAriaAttributes(element, implicitRole);
    }
    function getRole(element) {
      var explicitRole = getExplicitRole(element);
      if (explicitRole === null || explicitRole === "presentation") {
        var implicitRole = getImplicitRole(element);
        if (explicitRole !== "presentation" || ignorePresentationalRole(element, implicitRole || "")) {
          return implicitRole;
        }
      }
      return explicitRole;
    }
    function getImplicitRole(element) {
      var mappedByTag = localNameToRoleMappings[getLocalName(element)];
      if (mappedByTag !== void 0) {
        return mappedByTag;
      }
      switch (getLocalName(element)) {
        case "a":
        case "area":
        case "link":
          if (element.hasAttribute("href")) {
            return "link";
          }
          break;
        case "img":
          if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
            return "presentation";
          }
          return "img";
        case "input": {
          var _ref = element, type = _ref.type;
          switch (type) {
            case "button":
            case "image":
            case "reset":
            case "submit":
              return "button";
            case "checkbox":
            case "radio":
              return type;
            case "range":
              return "slider";
            case "email":
            case "tel":
            case "text":
            case "url":
              if (element.hasAttribute("list")) {
                return "combobox";
              }
              return "textbox";
            case "search":
              if (element.hasAttribute("list")) {
                return "combobox";
              }
              return "searchbox";
            case "number":
              return "spinbutton";
            default:
              return null;
          }
        }
        case "select":
          if (element.hasAttribute("multiple") || element.size > 1) {
            return "listbox";
          }
          return "combobox";
      }
      return null;
    }
    function getExplicitRole(element) {
      var role = element.getAttribute("role");
      if (role !== null) {
        var explicitRole = role.trim().split(" ")[0];
        if (explicitRole.length > 0) {
          return explicitRole;
        }
      }
      return null;
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/util.js
var require_util = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/util.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    exports.__esModule = true;
    exports.hasAnyConcreteRoles = hasAnyConcreteRoles;
    exports.isElement = isElement;
    exports.isHTMLFieldSetElement = isHTMLFieldSetElement;
    exports.isHTMLInputElement = isHTMLInputElement;
    exports.isHTMLLegendElement = isHTMLLegendElement;
    exports.isHTMLOptGroupElement = isHTMLOptGroupElement;
    exports.isHTMLSelectElement = isHTMLSelectElement;
    exports.isHTMLSlotElement = isHTMLSlotElement;
    exports.isHTMLTableCaptionElement = isHTMLTableCaptionElement;
    exports.isHTMLTableElement = isHTMLTableElement;
    exports.isHTMLTextAreaElement = isHTMLTextAreaElement;
    exports.isSVGElement = isSVGElement;
    exports.isSVGSVGElement = isSVGSVGElement;
    exports.isSVGTitleElement = isSVGTitleElement;
    exports.queryIdRefs = queryIdRefs;
    exports.safeWindow = safeWindow;
    var _getRole = _interopRequireWildcard(require_getRole());
    exports.getLocalName = _getRole.getLocalName;
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function isElement(node) {
      return node !== null && node.nodeType === node.ELEMENT_NODE;
    }
    function isHTMLTableCaptionElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "caption";
    }
    function isHTMLInputElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "input";
    }
    function isHTMLOptGroupElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "optgroup";
    }
    function isHTMLSelectElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "select";
    }
    function isHTMLTableElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "table";
    }
    function isHTMLTextAreaElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "textarea";
    }
    function safeWindow(node) {
      var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
      if (defaultView === null) {
        throw new TypeError("no window available");
      }
      return defaultView;
    }
    function isHTMLFieldSetElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "fieldset";
    }
    function isHTMLLegendElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "legend";
    }
    function isHTMLSlotElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "slot";
    }
    function isSVGElement(node) {
      return isElement(node) && node.ownerSVGElement !== void 0;
    }
    function isSVGSVGElement(node) {
      return isElement(node) && (0, _getRole.getLocalName)(node) === "svg";
    }
    function isSVGTitleElement(node) {
      return isSVGElement(node) && (0, _getRole.getLocalName)(node) === "title";
    }
    function queryIdRefs(node, attributeName) {
      if (isElement(node) && node.hasAttribute(attributeName)) {
        var ids = node.getAttribute(attributeName).split(" ");
        var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        return ids.map(function(id) {
          return root.getElementById(id);
        }).filter(
          function(element) {
            return element !== null;
          }
          // TODO: why does this not narrow?
        );
      }
      return [];
    }
    function hasAnyConcreteRoles(node, roles) {
      if (isElement(node)) {
        return roles.indexOf((0, _getRole.default)(node)) !== -1;
      }
      return false;
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/accessible-name-and-description.js
var require_accessible_name_and_description = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/accessible-name-and-description.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.computeTextAlternative = computeTextAlternative;
    var _array = _interopRequireDefault(require_array_from());
    var _SetLike = _interopRequireDefault(require_SetLike());
    var _util = require_util();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function asFlatString(s) {
      return s.trim().replace(/\s\s+/g, " ");
    }
    function isHidden(node, getComputedStyleImplementation) {
      if (!(0, _util.isElement)(node)) {
        return false;
      }
      if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
        return true;
      }
      var style = getComputedStyleImplementation(node);
      return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
    }
    function isControl(node) {
      return (0, _util.hasAnyConcreteRoles)(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
    }
    function hasAbstractRole(node, role) {
      if (!(0, _util.isElement)(node)) {
        return false;
      }
      switch (role) {
        case "range":
          return (0, _util.hasAnyConcreteRoles)(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
        default:
          throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
      }
    }
    function querySelectorAllSubtree(element, selectors) {
      var elements = (0, _array.default)(element.querySelectorAll(selectors));
      (0, _util.queryIdRefs)(element, "aria-owns").forEach(function(root) {
        elements.push.apply(elements, (0, _array.default)(root.querySelectorAll(selectors)));
      });
      return elements;
    }
    function querySelectedOptions(listbox) {
      if ((0, _util.isHTMLSelectElement)(listbox)) {
        return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
      }
      return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
    }
    function isMarkedPresentational(node) {
      return (0, _util.hasAnyConcreteRoles)(node, ["none", "presentation"]);
    }
    function isNativeHostLanguageTextAlternativeElement(node) {
      return (0, _util.isHTMLTableCaptionElement)(node);
    }
    function allowsNameFromContent(node) {
      return (0, _util.hasAnyConcreteRoles)(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
    }
    function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
      return false;
    }
    function getValueOfTextbox(element) {
      if ((0, _util.isHTMLInputElement)(element) || (0, _util.isHTMLTextAreaElement)(element)) {
        return element.value;
      }
      return element.textContent || "";
    }
    function getTextualContent(declaration) {
      var content = declaration.getPropertyValue("content");
      if (/^["'].*["']$/.test(content)) {
        return content.slice(1, -1);
      }
      return "";
    }
    function isLabelableElement(element) {
      var localName = (0, _util.getLocalName)(element);
      return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
    }
    function findLabelableElement(element) {
      if (isLabelableElement(element)) {
        return element;
      }
      var labelableElement = null;
      element.childNodes.forEach(function(childNode) {
        if (labelableElement === null && (0, _util.isElement)(childNode)) {
          var descendantLabelableElement = findLabelableElement(childNode);
          if (descendantLabelableElement !== null) {
            labelableElement = descendantLabelableElement;
          }
        }
      });
      return labelableElement;
    }
    function getControlOfLabel(label) {
      if (label.control !== void 0) {
        return label.control;
      }
      var htmlFor = label.getAttribute("for");
      if (htmlFor !== null) {
        return label.ownerDocument.getElementById(htmlFor);
      }
      return findLabelableElement(label);
    }
    function getLabels(element) {
      var labelsProperty = element.labels;
      if (labelsProperty === null) {
        return labelsProperty;
      }
      if (labelsProperty !== void 0) {
        return (0, _array.default)(labelsProperty);
      }
      if (!isLabelableElement(element)) {
        return null;
      }
      var document2 = element.ownerDocument;
      return (0, _array.default)(document2.querySelectorAll("label")).filter(function(label) {
        return getControlOfLabel(label) === element;
      });
    }
    function getSlotContents(slot) {
      var assignedNodes = slot.assignedNodes();
      if (assignedNodes.length === 0) {
        return (0, _array.default)(slot.childNodes);
      }
      return assignedNodes;
    }
    function computeTextAlternative(root) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var consultedNodes = new _SetLike.default();
      var window2 = (0, _util.safeWindow)(root);
      var _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
      function computeMiscTextAlternative(node, context) {
        var accumulatedText = "";
        if ((0, _util.isElement)(node) && computedStyleSupportsPseudoElements) {
          var pseudoBefore = getComputedStyle(node, "::before");
          var beforeContent = getTextualContent(pseudoBefore);
          accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
        }
        var childNodes = (0, _util.isHTMLSlotElement)(node) ? getSlotContents(node) : (0, _array.default)(node.childNodes).concat((0, _util.queryIdRefs)(node, "aria-owns"));
        childNodes.forEach(function(child) {
          var result = computeTextAlternative2(child, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false,
            recursion: true
          });
          var display = (0, _util.isElement)(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
          var separator = display !== "inline" ? " " : "";
          accumulatedText += "".concat(separator).concat(result).concat(separator);
        });
        if ((0, _util.isElement)(node) && computedStyleSupportsPseudoElements) {
          var pseudoAfter = getComputedStyle(node, "::after");
          var afterContent = getTextualContent(pseudoAfter);
          accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
        }
        return accumulatedText.trim();
      }
      function useAttribute(element, attributeName) {
        var attribute = element.getAttributeNode(attributeName);
        if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
          consultedNodes.add(attribute);
          return attribute.value;
        }
        return null;
      }
      function computeTooltipAttributeValue(node) {
        if (!(0, _util.isElement)(node)) {
          return null;
        }
        return useAttribute(node, "title");
      }
      function computeElementTextAlternative(node) {
        if (!(0, _util.isElement)(node)) {
          return null;
        }
        if ((0, _util.isHTMLFieldSetElement)(node)) {
          consultedNodes.add(node);
          var children = (0, _array.default)(node.childNodes);
          for (var i = 0; i < children.length; i += 1) {
            var child = children[i];
            if ((0, _util.isHTMLLegendElement)(child)) {
              return computeTextAlternative2(child, {
                isEmbeddedInLabel: false,
                isReferenced: false,
                recursion: false
              });
            }
          }
        } else if ((0, _util.isHTMLTableElement)(node)) {
          consultedNodes.add(node);
          var _children = (0, _array.default)(node.childNodes);
          for (var _i = 0; _i < _children.length; _i += 1) {
            var _child = _children[_i];
            if ((0, _util.isHTMLTableCaptionElement)(_child)) {
              return computeTextAlternative2(_child, {
                isEmbeddedInLabel: false,
                isReferenced: false,
                recursion: false
              });
            }
          }
        } else if ((0, _util.isSVGSVGElement)(node)) {
          consultedNodes.add(node);
          var _children2 = (0, _array.default)(node.childNodes);
          for (var _i2 = 0; _i2 < _children2.length; _i2 += 1) {
            var _child2 = _children2[_i2];
            if ((0, _util.isSVGTitleElement)(_child2)) {
              return _child2.textContent;
            }
          }
          return null;
        } else if ((0, _util.getLocalName)(node) === "img" || (0, _util.getLocalName)(node) === "area") {
          var nameFromAlt = useAttribute(node, "alt");
          if (nameFromAlt !== null) {
            return nameFromAlt;
          }
        } else if ((0, _util.isHTMLOptGroupElement)(node)) {
          var nameFromLabel = useAttribute(node, "label");
          if (nameFromLabel !== null) {
            return nameFromLabel;
          }
        }
        if ((0, _util.isHTMLInputElement)(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
          var nameFromValue = useAttribute(node, "value");
          if (nameFromValue !== null) {
            return nameFromValue;
          }
          if (node.type === "submit") {
            return "Submit";
          }
          if (node.type === "reset") {
            return "Reset";
          }
        }
        var labels = getLabels(node);
        if (labels !== null && labels.length !== 0) {
          consultedNodes.add(node);
          return (0, _array.default)(labels).map(function(element) {
            return computeTextAlternative2(element, {
              isEmbeddedInLabel: true,
              isReferenced: false,
              recursion: true
            });
          }).filter(function(label) {
            return label.length > 0;
          }).join(" ");
        }
        if ((0, _util.isHTMLInputElement)(node) && node.type === "image") {
          var _nameFromAlt = useAttribute(node, "alt");
          if (_nameFromAlt !== null) {
            return _nameFromAlt;
          }
          var nameFromTitle = useAttribute(node, "title");
          if (nameFromTitle !== null) {
            return nameFromTitle;
          }
          return "Submit Query";
        }
        if ((0, _util.hasAnyConcreteRoles)(node, ["button"])) {
          var nameFromSubTree = computeMiscTextAlternative(node, {
            isEmbeddedInLabel: false,
            isReferenced: false
          });
          if (nameFromSubTree !== "") {
            return nameFromSubTree;
          }
        }
        return null;
      }
      function computeTextAlternative2(current, context) {
        if (consultedNodes.has(current)) {
          return "";
        }
        if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) {
          consultedNodes.add(current);
          return "";
        }
        var labelAttributeNode = (0, _util.isElement)(current) ? current.getAttributeNode("aria-labelledby") : null;
        var labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? (0, _util.queryIdRefs)(current, "aria-labelledby") : [];
        if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
          consultedNodes.add(labelAttributeNode);
          return labelElements.map(function(element) {
            return computeTextAlternative2(element, {
              isEmbeddedInLabel: context.isEmbeddedInLabel,
              isReferenced: true,
              // this isn't recursion as specified, otherwise we would skip
              // `aria-label` in
              // <input id="myself" aria-label="foo" aria-labelledby="myself"
              recursion: false
            });
          }).join(" ");
        }
        var skipToStep2E = context.recursion && isControl(current) && compute === "name";
        if (!skipToStep2E) {
          var ariaLabel = ((0, _util.isElement)(current) && current.getAttribute("aria-label") || "").trim();
          if (ariaLabel !== "" && compute === "name") {
            consultedNodes.add(current);
            return ariaLabel;
          }
          if (!isMarkedPresentational(current)) {
            var elementTextAlternative = computeElementTextAlternative(current);
            if (elementTextAlternative !== null) {
              consultedNodes.add(current);
              return elementTextAlternative;
            }
          }
        }
        if ((0, _util.hasAnyConcreteRoles)(current, ["menu"])) {
          consultedNodes.add(current);
          return "";
        }
        if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
          if ((0, _util.hasAnyConcreteRoles)(current, ["combobox", "listbox"])) {
            consultedNodes.add(current);
            var selectedOptions = querySelectedOptions(current);
            if (selectedOptions.length === 0) {
              return (0, _util.isHTMLInputElement)(current) ? current.value : "";
            }
            return (0, _array.default)(selectedOptions).map(function(selectedOption) {
              return computeTextAlternative2(selectedOption, {
                isEmbeddedInLabel: context.isEmbeddedInLabel,
                isReferenced: false,
                recursion: true
              });
            }).join(" ");
          }
          if (hasAbstractRole(current, "range")) {
            consultedNodes.add(current);
            if (current.hasAttribute("aria-valuetext")) {
              return current.getAttribute("aria-valuetext");
            }
            if (current.hasAttribute("aria-valuenow")) {
              return current.getAttribute("aria-valuenow");
            }
            return current.getAttribute("value") || "";
          }
          if ((0, _util.hasAnyConcreteRoles)(current, ["textbox"])) {
            consultedNodes.add(current);
            return getValueOfTextbox(current);
          }
        }
        if (allowsNameFromContent(current) || (0, _util.isElement)(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement(current)) {
          var accumulatedText2F = computeMiscTextAlternative(current, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false
          });
          if (accumulatedText2F !== "") {
            consultedNodes.add(current);
            return accumulatedText2F;
          }
        }
        if (current.nodeType === current.TEXT_NODE) {
          consultedNodes.add(current);
          return current.textContent || "";
        }
        if (context.recursion) {
          consultedNodes.add(current);
          return computeMiscTextAlternative(current, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false
          });
        }
        var tooltipAttributeValue = computeTooltipAttributeValue(current);
        if (tooltipAttributeValue !== null) {
          consultedNodes.add(current);
          return tooltipAttributeValue;
        }
        consultedNodes.add(current);
        return "";
      }
      return asFlatString(computeTextAlternative2(root, {
        isEmbeddedInLabel: false,
        // by spec computeAccessibleDescription starts with the referenced elements as roots
        isReferenced: compute === "description",
        recursion: false
      }));
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/accessible-description.js
var require_accessible_description = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/accessible-description.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.computeAccessibleDescription = computeAccessibleDescription;
    var _accessibleNameAndDescription = require_accessible_name_and_description();
    var _util = require_util();
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function computeAccessibleDescription(root) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var description = (0, _util.queryIdRefs)(root, "aria-describedby").map(function(element) {
        return (0, _accessibleNameAndDescription.computeTextAlternative)(element, _objectSpread(_objectSpread({}, options), {}, {
          compute: "description"
        }));
      }).join(" ");
      if (description === "") {
        var title = root.getAttribute("title");
        description = title === null ? "" : title;
      }
      return description;
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/accessible-name.js
var require_accessible_name = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/accessible-name.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.computeAccessibleName = computeAccessibleName;
    var _accessibleNameAndDescription = require_accessible_name_and_description();
    var _util = require_util();
    function prohibitsNaming(node) {
      return (0, _util.hasAnyConcreteRoles)(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
    }
    function computeAccessibleName(root) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (prohibitsNaming(root)) {
        return "";
      }
      return (0, _accessibleNameAndDescription.computeTextAlternative)(root, options);
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/is-inaccessible.js
var require_is_inaccessible = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/is-inaccessible.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.isInaccessible = isInaccessible;
    exports.isSubtreeInaccessible = isSubtreeInaccessible;
    function isInaccessible(element) {
      var _element$ownerDocumen;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? (_element$ownerDocumen = element.ownerDocument.defaultView) === null || _element$ownerDocumen === void 0 ? void 0 : _element$ownerDocumen.getComputedStyle : _options$getComputedS, _options$isSubtreeIna = options.isSubtreeInaccessible, isSubtreeInaccessibleImpl = _options$isSubtreeIna === void 0 ? isSubtreeInaccessible : _options$isSubtreeIna;
      if (typeof getComputedStyle !== "function") {
        throw new TypeError("Owner document of the element needs to have an associated window.");
      }
      if (getComputedStyle(element).visibility === "hidden") {
        return true;
      }
      var currentElement = element;
      while (currentElement) {
        if (isSubtreeInaccessibleImpl(currentElement, {
          getComputedStyle
        })) {
          return true;
        }
        currentElement = currentElement.parentElement;
      }
      return false;
    }
    function isSubtreeInaccessible(element) {
      var _element$ownerDocumen2;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _options$getComputedS2 = options.getComputedStyle, getComputedStyle = _options$getComputedS2 === void 0 ? (_element$ownerDocumen2 = element.ownerDocument.defaultView) === null || _element$ownerDocumen2 === void 0 ? void 0 : _element$ownerDocumen2.getComputedStyle : _options$getComputedS2;
      if (typeof getComputedStyle !== "function") {
        throw new TypeError("Owner document of the element needs to have an associated window.");
      }
      if (element.hidden === true) {
        return true;
      }
      if (element.getAttribute("aria-hidden") === "true") {
        return true;
      }
      if (getComputedStyle(element).display === "none") {
        return true;
      }
      return false;
    }
  }
});

// ../../node_modules/dom-accessibility-api/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/dom-accessibility-api/dist/index.js"(exports) {
    "use strict";
    exports.__esModule = true;
    var _exportNames = {
      computeAccessibleDescription: true,
      computeAccessibleName: true,
      getRole: true
    };
    exports.getRole = exports.computeAccessibleName = exports.computeAccessibleDescription = void 0;
    var _accessibleDescription = require_accessible_description();
    exports.computeAccessibleDescription = _accessibleDescription.computeAccessibleDescription;
    var _accessibleName = require_accessible_name();
    exports.computeAccessibleName = _accessibleName.computeAccessibleName;
    var _getRole = _interopRequireDefault(require_getRole());
    exports.getRole = _getRole.default;
    var _isInaccessible = require_is_inaccessible();
    Object.keys(_isInaccessible).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _isInaccessible[key])
        return;
      exports[key] = _isInaccessible[key];
    });
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// ../../node_modules/aria-query/lib/util/iteratorProxy.js
var require_iteratorProxy = __commonJS({
  "../../node_modules/aria-query/lib/util/iteratorProxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function iteratorProxy() {
      var values = this;
      var index = 0;
      var iter = {
        "@@iterator": function iterator() {
          return iter;
        },
        next: function next() {
          if (index < values.length) {
            var value = values[index];
            index = index + 1;
            return {
              done: false,
              value
            };
          } else {
            return {
              done: true
            };
          }
        }
      };
      return iter;
    }
    var _default = iteratorProxy;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/util/iterationDecorator.js
var require_iterationDecorator = __commonJS({
  "../../node_modules/aria-query/lib/util/iterationDecorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = iterationDecorator;
    var _iteratorProxy = _interopRequireDefault(require_iteratorProxy());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj2) {
        return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      }, _typeof(obj);
    }
    function iterationDecorator(collection, entries) {
      if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
        Object.defineProperty(collection, Symbol.iterator, {
          value: _iteratorProxy.default.bind(entries)
        });
      }
      return collection;
    }
  }
});

// ../../node_modules/aria-query/lib/ariaPropsMap.js
var require_ariaPropsMap = __commonJS({
  "../../node_modules/aria-query/lib/ariaPropsMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e2) {
            throw _e2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e3) {
        didErr = true;
        err = _e3;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    var properties = [["aria-activedescendant", {
      "type": "id"
    }], ["aria-atomic", {
      "type": "boolean"
    }], ["aria-autocomplete", {
      "type": "token",
      "values": ["inline", "list", "both", "none"]
    }], ["aria-busy", {
      "type": "boolean"
    }], ["aria-checked", {
      "type": "tristate"
    }], ["aria-colcount", {
      type: "integer"
    }], ["aria-colindex", {
      type: "integer"
    }], ["aria-colspan", {
      type: "integer"
    }], ["aria-controls", {
      "type": "idlist"
    }], ["aria-current", {
      type: "token",
      values: ["page", "step", "location", "date", "time", true, false]
    }], ["aria-describedby", {
      "type": "idlist"
    }], ["aria-details", {
      "type": "id"
    }], ["aria-disabled", {
      "type": "boolean"
    }], ["aria-dropeffect", {
      "type": "tokenlist",
      "values": ["copy", "execute", "link", "move", "none", "popup"]
    }], ["aria-errormessage", {
      "type": "id"
    }], ["aria-expanded", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-flowto", {
      "type": "idlist"
    }], ["aria-grabbed", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-haspopup", {
      "type": "token",
      "values": [false, true, "menu", "listbox", "tree", "grid", "dialog"]
    }], ["aria-hidden", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-invalid", {
      "type": "token",
      "values": ["grammar", false, "spelling", true]
    }], ["aria-keyshortcuts", {
      type: "string"
    }], ["aria-label", {
      "type": "string"
    }], ["aria-labelledby", {
      "type": "idlist"
    }], ["aria-level", {
      "type": "integer"
    }], ["aria-live", {
      "type": "token",
      "values": ["assertive", "off", "polite"]
    }], ["aria-modal", {
      type: "boolean"
    }], ["aria-multiline", {
      "type": "boolean"
    }], ["aria-multiselectable", {
      "type": "boolean"
    }], ["aria-orientation", {
      "type": "token",
      "values": ["vertical", "undefined", "horizontal"]
    }], ["aria-owns", {
      "type": "idlist"
    }], ["aria-placeholder", {
      type: "string"
    }], ["aria-posinset", {
      "type": "integer"
    }], ["aria-pressed", {
      "type": "tristate"
    }], ["aria-readonly", {
      "type": "boolean"
    }], ["aria-relevant", {
      "type": "tokenlist",
      "values": ["additions", "all", "removals", "text"]
    }], ["aria-required", {
      "type": "boolean"
    }], ["aria-roledescription", {
      type: "string"
    }], ["aria-rowcount", {
      type: "integer"
    }], ["aria-rowindex", {
      type: "integer"
    }], ["aria-rowspan", {
      type: "integer"
    }], ["aria-selected", {
      "type": "boolean",
      "allowundefined": true
    }], ["aria-setsize", {
      "type": "integer"
    }], ["aria-sort", {
      "type": "token",
      "values": ["ascending", "descending", "none", "other"]
    }], ["aria-valuemax", {
      "type": "number"
    }], ["aria-valuemin", {
      "type": "number"
    }], ["aria-valuenow", {
      "type": "number"
    }], ["aria-valuetext", {
      "type": "string"
    }]];
    var ariaPropsMap = {
      entries: function entries() {
        return properties;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _iterator = _createForOfIteratorHelper(properties), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
            fn.call(thisArg, values, key, properties);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      get: function get(key) {
        var item = properties.find(function(tuple) {
          return tuple[0] === key ? true : false;
        });
        return item && item[1];
      },
      has: function has(key) {
        return !!ariaPropsMap.get(key);
      },
      keys: function keys() {
        return properties.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
          return key;
        });
      },
      values: function values() {
        return properties.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    var _default = (0, _iterationDecorator.default)(ariaPropsMap, ariaPropsMap.entries());
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/domMap.js
var require_domMap = __commonJS({
  "../../node_modules/aria-query/lib/domMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e2) {
            throw _e2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e3) {
        didErr = true;
        err = _e3;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    var dom2 = [["a", {
      reserved: false
    }], ["abbr", {
      reserved: false
    }], ["acronym", {
      reserved: false
    }], ["address", {
      reserved: false
    }], ["applet", {
      reserved: false
    }], ["area", {
      reserved: false
    }], ["article", {
      reserved: false
    }], ["aside", {
      reserved: false
    }], ["audio", {
      reserved: false
    }], ["b", {
      reserved: false
    }], ["base", {
      reserved: true
    }], ["bdi", {
      reserved: false
    }], ["bdo", {
      reserved: false
    }], ["big", {
      reserved: false
    }], ["blink", {
      reserved: false
    }], ["blockquote", {
      reserved: false
    }], ["body", {
      reserved: false
    }], ["br", {
      reserved: false
    }], ["button", {
      reserved: false
    }], ["canvas", {
      reserved: false
    }], ["caption", {
      reserved: false
    }], ["center", {
      reserved: false
    }], ["cite", {
      reserved: false
    }], ["code", {
      reserved: false
    }], ["col", {
      reserved: true
    }], ["colgroup", {
      reserved: true
    }], ["content", {
      reserved: false
    }], ["data", {
      reserved: false
    }], ["datalist", {
      reserved: false
    }], ["dd", {
      reserved: false
    }], ["del", {
      reserved: false
    }], ["details", {
      reserved: false
    }], ["dfn", {
      reserved: false
    }], ["dialog", {
      reserved: false
    }], ["dir", {
      reserved: false
    }], ["div", {
      reserved: false
    }], ["dl", {
      reserved: false
    }], ["dt", {
      reserved: false
    }], ["em", {
      reserved: false
    }], ["embed", {
      reserved: false
    }], ["fieldset", {
      reserved: false
    }], ["figcaption", {
      reserved: false
    }], ["figure", {
      reserved: false
    }], ["font", {
      reserved: false
    }], ["footer", {
      reserved: false
    }], ["form", {
      reserved: false
    }], ["frame", {
      reserved: false
    }], ["frameset", {
      reserved: false
    }], ["h1", {
      reserved: false
    }], ["h2", {
      reserved: false
    }], ["h3", {
      reserved: false
    }], ["h4", {
      reserved: false
    }], ["h5", {
      reserved: false
    }], ["h6", {
      reserved: false
    }], ["head", {
      reserved: true
    }], ["header", {
      reserved: false
    }], ["hgroup", {
      reserved: false
    }], ["hr", {
      reserved: false
    }], ["html", {
      reserved: true
    }], ["i", {
      reserved: false
    }], ["iframe", {
      reserved: false
    }], ["img", {
      reserved: false
    }], ["input", {
      reserved: false
    }], ["ins", {
      reserved: false
    }], ["kbd", {
      reserved: false
    }], ["keygen", {
      reserved: false
    }], ["label", {
      reserved: false
    }], ["legend", {
      reserved: false
    }], ["li", {
      reserved: false
    }], ["link", {
      reserved: true
    }], ["main", {
      reserved: false
    }], ["map", {
      reserved: false
    }], ["mark", {
      reserved: false
    }], ["marquee", {
      reserved: false
    }], ["menu", {
      reserved: false
    }], ["menuitem", {
      reserved: false
    }], ["meta", {
      reserved: true
    }], ["meter", {
      reserved: false
    }], ["nav", {
      reserved: false
    }], ["noembed", {
      reserved: true
    }], ["noscript", {
      reserved: true
    }], ["object", {
      reserved: false
    }], ["ol", {
      reserved: false
    }], ["optgroup", {
      reserved: false
    }], ["option", {
      reserved: false
    }], ["output", {
      reserved: false
    }], ["p", {
      reserved: false
    }], ["param", {
      reserved: true
    }], ["picture", {
      reserved: true
    }], ["pre", {
      reserved: false
    }], ["progress", {
      reserved: false
    }], ["q", {
      reserved: false
    }], ["rp", {
      reserved: false
    }], ["rt", {
      reserved: false
    }], ["rtc", {
      reserved: false
    }], ["ruby", {
      reserved: false
    }], ["s", {
      reserved: false
    }], ["samp", {
      reserved: false
    }], ["script", {
      reserved: true
    }], ["section", {
      reserved: false
    }], ["select", {
      reserved: false
    }], ["small", {
      reserved: false
    }], ["source", {
      reserved: true
    }], ["spacer", {
      reserved: false
    }], ["span", {
      reserved: false
    }], ["strike", {
      reserved: false
    }], ["strong", {
      reserved: false
    }], ["style", {
      reserved: true
    }], ["sub", {
      reserved: false
    }], ["summary", {
      reserved: false
    }], ["sup", {
      reserved: false
    }], ["table", {
      reserved: false
    }], ["tbody", {
      reserved: false
    }], ["td", {
      reserved: false
    }], ["textarea", {
      reserved: false
    }], ["tfoot", {
      reserved: false
    }], ["th", {
      reserved: false
    }], ["thead", {
      reserved: false
    }], ["time", {
      reserved: false
    }], ["title", {
      reserved: true
    }], ["tr", {
      reserved: false
    }], ["track", {
      reserved: true
    }], ["tt", {
      reserved: false
    }], ["u", {
      reserved: false
    }], ["ul", {
      reserved: false
    }], ["var", {
      reserved: false
    }], ["video", {
      reserved: false
    }], ["wbr", {
      reserved: false
    }], ["xmp", {
      reserved: false
    }]];
    var domMap = {
      entries: function entries() {
        return dom2;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _iterator = _createForOfIteratorHelper(dom2), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
            fn.call(thisArg, values, key, dom2);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      get: function get(key) {
        var item = dom2.find(function(tuple) {
          return tuple[0] === key ? true : false;
        });
        return item && item[1];
      },
      has: function has(key) {
        return !!domMap.get(key);
      },
      keys: function keys() {
        return dom2.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
          return key;
        });
      },
      values: function values() {
        return dom2.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    var _default = (0, _iterationDecorator.default)(domMap, domMap.entries());
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/commandRole.js
var require_commandRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var commandRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menuitem"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    };
    var _default = commandRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js
var require_compositeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var compositeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    };
    var _default = compositeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/inputRole.js
var require_inputRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var inputRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null
      },
      relatedConcepts: [{
        concept: {
          name: "input"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    };
    var _default = inputRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js
var require_landmarkRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var landmarkRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = landmarkRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js
var require_rangeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rangeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuemax": null,
        "aria-valuemin": null,
        "aria-valuenow": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = rangeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js
var require_roletypeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var roletypeRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {
        "aria-atomic": null,
        "aria-busy": null,
        "aria-controls": null,
        "aria-current": null,
        "aria-describedby": null,
        "aria-details": null,
        "aria-dropeffect": null,
        "aria-flowto": null,
        "aria-grabbed": null,
        "aria-hidden": null,
        "aria-keyshortcuts": null,
        "aria-label": null,
        "aria-labelledby": null,
        "aria-live": null,
        "aria-owns": null,
        "aria-relevant": null,
        "aria-roledescription": null
      },
      relatedConcepts: [{
        concept: {
          name: "rel"
        },
        module: "HTML"
      }, {
        concept: {
          name: "role"
        },
        module: "XHTML"
      }, {
        concept: {
          name: "type"
        },
        module: "Dublin Core"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
    var _default = roletypeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js
var require_sectionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var sectionRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "frontmatter"
        },
        module: "DTB"
      }, {
        concept: {
          name: "level"
        },
        module: "DTB"
      }, {
        concept: {
          name: "level"
        },
        module: "SMIL"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = sectionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js
var require_sectionheadRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var sectionheadRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = sectionheadRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/selectRole.js
var require_selectRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var selectRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
    };
    var _default = selectRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/structureRole.js
var require_structureRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var structureRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    };
    var _default = structureRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js
var require_widgetRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var widgetRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    };
    var _default = widgetRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/windowRole.js
var require_windowRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var windowRole = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-modal": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    };
    var _default = windowRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js
var require_ariaAbstractRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _commandRole = _interopRequireDefault(require_commandRole());
    var _compositeRole = _interopRequireDefault(require_compositeRole());
    var _inputRole = _interopRequireDefault(require_inputRole());
    var _landmarkRole = _interopRequireDefault(require_landmarkRole());
    var _rangeRole = _interopRequireDefault(require_rangeRole());
    var _roletypeRole = _interopRequireDefault(require_roletypeRole());
    var _sectionRole = _interopRequireDefault(require_sectionRole());
    var _sectionheadRole = _interopRequireDefault(require_sectionheadRole());
    var _selectRole = _interopRequireDefault(require_selectRole());
    var _structureRole = _interopRequireDefault(require_structureRole());
    var _widgetRole = _interopRequireDefault(require_widgetRole());
    var _windowRole = _interopRequireDefault(require_windowRole());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]];
    var _default = ariaAbstractRoles;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/alertRole.js
var require_alertRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var alertRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-atomic": "true",
        "aria-live": "assertive"
      },
      relatedConcepts: [{
        concept: {
          name: "alert"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = alertRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js
var require_alertdialogRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var alertdialogRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "alert"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
    };
    var _default = alertdialogRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/applicationRole.js
var require_applicationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var applicationRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "Device Independence Delivery Unit"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = applicationRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/articleRole.js
var require_articleRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var articleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "article"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]]
    };
    var _default = articleRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/bannerRole.js
var require_bannerRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var bannerRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["direct descendant of document"],
          name: "header"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = bannerRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js
var require_blockquoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var blockquoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = blockquoteRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/buttonRole.js
var require_buttonRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var buttonRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-pressed": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-pressed"
          }, {
            name: "type",
            value: "checkbox"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "aria-expanded",
            value: "false"
          }],
          name: "summary"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "aria-expanded",
            value: "true"
          }],
          constraints: ["direct descendant of details element with the open attribute defined"],
          name: "summary"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "button"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "image"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "reset"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "submit"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "button"
        },
        module: "HTML"
      }, {
        concept: {
          name: "trigger"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    };
    var _default = buttonRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/captionRole.js
var require_captionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var captionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: ["figure", "grid", "table"],
      requiredContextRole: ["figure", "grid", "table"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = captionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/cellRole.js
var require_cellRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var cellRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-colspan": null,
        "aria-rowindex": null,
        "aria-rowspan": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["descendant of table"],
          name: "td"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = cellRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js
var require_checkboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var checkboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "checkbox"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "option"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = checkboxRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/codeRole.js
var require_codeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var codeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = codeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js
var require_columnheaderRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var columnheaderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-sort": null
      },
      relatedConcepts: [{
        attributes: [{
          name: "scope",
          value: "col"
        }],
        concept: {
          name: "th"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
    };
    var _default = columnheaderRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js
var require_comboboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var comboboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-expanded": "false",
        "aria-haspopup": "listbox"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "email"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "search"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "tel"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "text"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "multiple"
          }, {
            constraints: ["undefined"],
            name: "size"
          }],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "multiple"
          }, {
            name: "size",
            value: 1
          }],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-controls": null,
        "aria-expanded": "false"
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = comboboxRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js
var require_complementaryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var complementaryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "aside"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = complementaryRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js
var require_contentinfoRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var contentinfoRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["direct descendant of document"],
          name: "footer"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = contentinfoRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/definitionRole.js
var require_definitionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var definitionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dd"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = definitionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/deletionRole.js
var require_deletionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var deletionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = deletionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/dialogRole.js
var require_dialogRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var dialogRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dialog"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "window"]]
    };
    var _default = dialogRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/directoryRole.js
var require_directoryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var directoryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        module: "DAISY Guide"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]]
    };
    var _default = directoryRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/documentRole.js
var require_documentRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var documentRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "Device Independence Delivery Unit"
        }
      }, {
        concept: {
          name: "body"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = documentRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js
var require_emphasisRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var emphasisRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = emphasisRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/feedRole.js
var require_feedRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var feedRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["article"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]]
    };
    var _default = feedRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/figureRole.js
var require_figureRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var figureRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "figure"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = figureRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/formRole.js
var require_formRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/formRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var formRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          name: "form"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          name: "form"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "name"
          }],
          name: "form"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = formRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/genericRole.js
var require_genericRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var genericRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "span"
        },
        module: "HTML"
      }, {
        concept: {
          name: "div"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = genericRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/gridRole.js
var require_gridRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var gridRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-multiselectable": null,
        "aria-readonly": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "role",
            value: "grid"
          }],
          name: "table"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
    };
    var _default = gridRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js
var require_gridcellRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var gridcellRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-selected": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "role",
            value: "gridcell"
          }],
          name: "td"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
    };
    var _default = gridcellRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/groupRole.js
var require_groupRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var groupRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null
      },
      relatedConcepts: [{
        concept: {
          name: "details"
        },
        module: "HTML"
      }, {
        concept: {
          name: "fieldset"
        },
        module: "HTML"
      }, {
        concept: {
          name: "optgroup"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = groupRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/headingRole.js
var require_headingRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var headingRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-level": "2"
      },
      relatedConcepts: [{
        concept: {
          name: "h1"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h2"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h3"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h4"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h5"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h6"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-level": "2"
      },
      superClass: [["roletype", "structure", "sectionhead"]]
    };
    var _default = headingRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/imgRole.js
var require_imgRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var imgRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "alt"
          }],
          name: "img"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "alt"
          }],
          name: "img"
        },
        module: "HTML"
      }, {
        concept: {
          name: "imggroup"
        },
        module: "DTB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = imgRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/insertionRole.js
var require_insertionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var insertionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = insertionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/linkRole.js
var require_linkRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var linkRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "href"
          }],
          name: "a"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "href"
          }],
          name: "area"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "href"
          }],
          name: "link"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    };
    var _default = linkRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/listRole.js
var require_listRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/listRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var listRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menu"
        },
        module: "HTML"
      }, {
        concept: {
          name: "ol"
        },
        module: "HTML"
      }, {
        concept: {
          name: "ul"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["listitem"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = listRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/listboxRole.js
var require_listboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var listboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-orientation": "vertical"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: [">1"],
            name: "size"
          }, {
            name: "multiple"
          }],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: [">1"],
            name: "size"
          }],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "multiple"
          }],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          name: "datalist"
        },
        module: "HTML"
      }, {
        concept: {
          name: "list"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["option", "group"], ["option"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = listboxRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/listitemRole.js
var require_listitemRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var listitemRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["direct descendant of ol, ul or menu"],
          name: "li"
        },
        module: "HTML"
      }, {
        concept: {
          name: "item"
        },
        module: "XForms"
      }],
      requireContextRole: ["directory", "list"],
      requiredContextRole: ["directory", "list"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = listitemRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/logRole.js
var require_logRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/logRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var logRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-live": "polite"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = logRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/mainRole.js
var require_mainRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var mainRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "main"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = mainRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js
var require_marqueeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var marqueeRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = marqueeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/mathRole.js
var require_mathRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var mathRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "math"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = mathRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuRole.js
var require_menuRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "vertical"
      },
      relatedConcepts: [{
        concept: {
          name: "MENU"
        },
        module: "JAPI"
      }, {
        concept: {
          name: "list"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }, {
        concept: {
          name: "sidebar"
        },
        module: "DTB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = menuRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menubarRole.js
var require_menubarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menubarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        concept: {
          name: "toolbar"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
    };
    var _default = menubarRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js
var require_menuitemRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuitemRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "MENU_ITEM"
        },
        module: "JAPI"
      }, {
        concept: {
          name: "listitem"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "menuitem"
        },
        module: "HTML"
      }, {
        concept: {
          name: "option"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    };
    var _default = menuitemRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js
var require_menuitemcheckboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuitemcheckboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menuitem"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
    };
    var _default = menuitemcheckboxRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js
var require_menuitemradioRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var menuitemradioRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menuitem"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
    };
    var _default = menuitemradioRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/meterRole.js
var require_meterRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var meterRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuetext": null,
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-valuenow": null
      },
      superClass: [["roletype", "structure", "range"]]
    };
    var _default = meterRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/navigationRole.js
var require_navigationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var navigationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "nav"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = navigationRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/noneRole.js
var require_noneRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var noneRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
    var _default = noneRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/noteRole.js
var require_noteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var noteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = noteRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/optionRole.js
var require_optionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var optionRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false"
      },
      relatedConcepts: [{
        concept: {
          name: "item"
        },
        module: "XForms"
      }, {
        concept: {
          name: "listitem"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "option"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-selected": "false"
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = optionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js
var require_paragraphRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var paragraphRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = paragraphRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/presentationRole.js
var require_presentationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var presentationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = presentationRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js
var require_progressbarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var progressbarRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuetext": null
      },
      relatedConcepts: [{
        concept: {
          name: "progress"
        },
        module: "HTML"
      }, {
        concept: {
          name: "status"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
    };
    var _default = progressbarRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/radioRole.js
var require_radioRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var radioRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "radio"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = radioRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js
var require_radiogroupRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var radiogroupRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          name: "list"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["radio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = radiogroupRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/regionRole.js
var require_regionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var regionRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          name: "Device Independence Glossart perceivable unit"
        }
      }, {
        concept: {
          name: "frame"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = regionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/rowRole.js
var require_rowRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rowRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-expanded": null,
        "aria-level": null,
        "aria-posinset": null,
        "aria-rowindex": null,
        "aria-selected": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "tr"
        },
        module: "HTML"
      }],
      requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
    };
    var _default = rowRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js
var require_rowgroupRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rowgroupRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "tbody"
        },
        module: "HTML"
      }, {
        concept: {
          name: "tfoot"
        },
        module: "HTML"
      }, {
        concept: {
          name: "thead"
        },
        module: "HTML"
      }],
      requireContextRole: ["grid", "table", "treegrid"],
      requiredContextRole: ["grid", "table", "treegrid"],
      requiredOwnedElements: [["row"]],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = rowgroupRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js
var require_rowheaderRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var rowheaderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-sort": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "scope",
            value: "row"
          }],
          name: "th"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "scope",
            value: "rowgroup"
          }],
          name: "th"
        },
        module: "HTML"
      }],
      requireContextRole: ["row", "rowgroup"],
      requiredContextRole: ["row", "rowgroup"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
    };
    var _default = rowheaderRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js
var require_scrollbarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var scrollbarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-valuetext": null,
        "aria-orientation": "vertical",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-controls": null,
        "aria-valuenow": null
      },
      superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
    };
    var _default = scrollbarRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/searchRole.js
var require_searchRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var searchRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = searchRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js
var require_searchboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var searchboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "search"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input", "textbox"]]
    };
    var _default = searchboxRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/separatorRole.js
var require_separatorRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var separatorRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0",
        "aria-valuenow": null,
        "aria-valuetext": null
      },
      relatedConcepts: [{
        concept: {
          name: "hr"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    };
    var _default = separatorRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/sliderRole.js
var require_sliderRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var sliderRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-valuetext": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "range"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-valuenow": null
      },
      superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
    };
    var _default = sliderRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js
var require_spinbuttonRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var spinbuttonRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-valuetext": null,
        "aria-valuenow": "0"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "number"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
    };
    var _default = spinbuttonRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/statusRole.js
var require_statusRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var statusRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-atomic": "true",
        "aria-live": "polite"
      },
      relatedConcepts: [{
        concept: {
          name: "output"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = statusRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/strongRole.js
var require_strongRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var strongRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = strongRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js
var require_subscriptRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var subscriptRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = subscriptRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js
var require_superscriptRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var superscriptRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = superscriptRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/switchRole.js
var require_switchRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var switchRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "button"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox"]]
    };
    var _default = switchRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tabRole.js
var require_tabRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tabRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false"
      },
      relatedConcepts: [],
      requireContextRole: ["tablist"],
      requiredContextRole: ["tablist"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
    };
    var _default = tabRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tableRole.js
var require_tableRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tableRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-colcount": null,
        "aria-rowcount": null
      },
      relatedConcepts: [{
        concept: {
          name: "table"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = tableRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tablistRole.js
var require_tablistRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tablistRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-multiselectable": null,
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        module: "DAISY",
        concept: {
          name: "guide"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["tab"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"]]
    };
    var _default = tablistRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js
var require_tabpanelRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tabpanelRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = tabpanelRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/termRole.js
var require_termRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/termRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var termRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dfn"
        },
        module: "HTML"
      }, {
        concept: {
          name: "dt"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = termRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/textboxRole.js
var require_textboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var textboxRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-multiline": null,
        "aria-placeholder": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "type"
          }, {
            constraints: ["undefined"],
            name: "list"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "email"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "tel"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "text"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "input"
        },
        module: "XForms"
      }, {
        concept: {
          name: "textarea"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input"]]
    };
    var _default = textboxRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/timeRole.js
var require_timeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var timeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = timeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/timerRole.js
var require_timerRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var timerRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "status"]]
    };
    var _default = timerRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js
var require_toolbarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var toolbarRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        concept: {
          name: "menubar"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]]
    };
    var _default = toolbarRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js
var require_tooltipRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var tooltipRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = tooltipRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/treeRole.js
var require_treeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var treeRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-required": null,
        "aria-orientation": "vertical"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    };
    var _default = treeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/treegridRole.js
var require_treegridRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var treegridRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
    };
    var _default = treegridRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js
var require_treeitemRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var treeitemRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-expanded": null,
        "aria-haspopup": null
      },
      relatedConcepts: [],
      requireContextRole: ["group", "tree"],
      requiredContextRole: ["group", "tree"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-selected": null
      },
      superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
    };
    var _default = treeitemRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js
var require_ariaLiteralRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _alertRole = _interopRequireDefault(require_alertRole());
    var _alertdialogRole = _interopRequireDefault(require_alertdialogRole());
    var _applicationRole = _interopRequireDefault(require_applicationRole());
    var _articleRole = _interopRequireDefault(require_articleRole());
    var _bannerRole = _interopRequireDefault(require_bannerRole());
    var _blockquoteRole = _interopRequireDefault(require_blockquoteRole());
    var _buttonRole = _interopRequireDefault(require_buttonRole());
    var _captionRole = _interopRequireDefault(require_captionRole());
    var _cellRole = _interopRequireDefault(require_cellRole());
    var _checkboxRole = _interopRequireDefault(require_checkboxRole());
    var _codeRole = _interopRequireDefault(require_codeRole());
    var _columnheaderRole = _interopRequireDefault(require_columnheaderRole());
    var _comboboxRole = _interopRequireDefault(require_comboboxRole());
    var _complementaryRole = _interopRequireDefault(require_complementaryRole());
    var _contentinfoRole = _interopRequireDefault(require_contentinfoRole());
    var _definitionRole = _interopRequireDefault(require_definitionRole());
    var _deletionRole = _interopRequireDefault(require_deletionRole());
    var _dialogRole = _interopRequireDefault(require_dialogRole());
    var _directoryRole = _interopRequireDefault(require_directoryRole());
    var _documentRole = _interopRequireDefault(require_documentRole());
    var _emphasisRole = _interopRequireDefault(require_emphasisRole());
    var _feedRole = _interopRequireDefault(require_feedRole());
    var _figureRole = _interopRequireDefault(require_figureRole());
    var _formRole = _interopRequireDefault(require_formRole());
    var _genericRole = _interopRequireDefault(require_genericRole());
    var _gridRole = _interopRequireDefault(require_gridRole());
    var _gridcellRole = _interopRequireDefault(require_gridcellRole());
    var _groupRole = _interopRequireDefault(require_groupRole());
    var _headingRole = _interopRequireDefault(require_headingRole());
    var _imgRole = _interopRequireDefault(require_imgRole());
    var _insertionRole = _interopRequireDefault(require_insertionRole());
    var _linkRole = _interopRequireDefault(require_linkRole());
    var _listRole = _interopRequireDefault(require_listRole());
    var _listboxRole = _interopRequireDefault(require_listboxRole());
    var _listitemRole = _interopRequireDefault(require_listitemRole());
    var _logRole = _interopRequireDefault(require_logRole());
    var _mainRole = _interopRequireDefault(require_mainRole());
    var _marqueeRole = _interopRequireDefault(require_marqueeRole());
    var _mathRole = _interopRequireDefault(require_mathRole());
    var _menuRole = _interopRequireDefault(require_menuRole());
    var _menubarRole = _interopRequireDefault(require_menubarRole());
    var _menuitemRole = _interopRequireDefault(require_menuitemRole());
    var _menuitemcheckboxRole = _interopRequireDefault(require_menuitemcheckboxRole());
    var _menuitemradioRole = _interopRequireDefault(require_menuitemradioRole());
    var _meterRole = _interopRequireDefault(require_meterRole());
    var _navigationRole = _interopRequireDefault(require_navigationRole());
    var _noneRole = _interopRequireDefault(require_noneRole());
    var _noteRole = _interopRequireDefault(require_noteRole());
    var _optionRole = _interopRequireDefault(require_optionRole());
    var _paragraphRole = _interopRequireDefault(require_paragraphRole());
    var _presentationRole = _interopRequireDefault(require_presentationRole());
    var _progressbarRole = _interopRequireDefault(require_progressbarRole());
    var _radioRole = _interopRequireDefault(require_radioRole());
    var _radiogroupRole = _interopRequireDefault(require_radiogroupRole());
    var _regionRole = _interopRequireDefault(require_regionRole());
    var _rowRole = _interopRequireDefault(require_rowRole());
    var _rowgroupRole = _interopRequireDefault(require_rowgroupRole());
    var _rowheaderRole = _interopRequireDefault(require_rowheaderRole());
    var _scrollbarRole = _interopRequireDefault(require_scrollbarRole());
    var _searchRole = _interopRequireDefault(require_searchRole());
    var _searchboxRole = _interopRequireDefault(require_searchboxRole());
    var _separatorRole = _interopRequireDefault(require_separatorRole());
    var _sliderRole = _interopRequireDefault(require_sliderRole());
    var _spinbuttonRole = _interopRequireDefault(require_spinbuttonRole());
    var _statusRole = _interopRequireDefault(require_statusRole());
    var _strongRole = _interopRequireDefault(require_strongRole());
    var _subscriptRole = _interopRequireDefault(require_subscriptRole());
    var _superscriptRole = _interopRequireDefault(require_superscriptRole());
    var _switchRole = _interopRequireDefault(require_switchRole());
    var _tabRole = _interopRequireDefault(require_tabRole());
    var _tableRole = _interopRequireDefault(require_tableRole());
    var _tablistRole = _interopRequireDefault(require_tablistRole());
    var _tabpanelRole = _interopRequireDefault(require_tabpanelRole());
    var _termRole = _interopRequireDefault(require_termRole());
    var _textboxRole = _interopRequireDefault(require_textboxRole());
    var _timeRole = _interopRequireDefault(require_timeRole());
    var _timerRole = _interopRequireDefault(require_timerRole());
    var _toolbarRole = _interopRequireDefault(require_toolbarRole());
    var _tooltipRole = _interopRequireDefault(require_tooltipRole());
    var _treeRole = _interopRequireDefault(require_treeRole());
    var _treegridRole = _interopRequireDefault(require_treegridRole());
    var _treeitemRole = _interopRequireDefault(require_treeitemRole());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]];
    var _default = ariaLiteralRoles;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js
var require_docAbstractRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAbstractRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "abstract [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docAbstractRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js
var require_docAcknowledgmentsRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAcknowledgmentsRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "acknowledgments [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docAcknowledgmentsRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js
var require_docAfterwordRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAfterwordRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "afterword [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docAfterwordRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js
var require_docAppendixRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docAppendixRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "appendix [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docAppendixRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js
var require_docBacklinkRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBacklinkRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "content"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "referrer [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = docBacklinkRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js
var require_docBiblioentryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBiblioentryRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "EPUB biblioentry [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: ["doc-bibliography"],
      requiredContextRole: ["doc-bibliography"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]]
    };
    var _default = docBiblioentryRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js
var require_docBibliographyRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBibliographyRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "bibliography [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-biblioentry"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docBibliographyRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js
var require_docBibliorefRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docBibliorefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "biblioref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = docBibliorefRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js
var require_docChapterRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docChapterRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "chapter [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docChapterRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js
var require_docColophonRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docColophonRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "colophon [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docColophonRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js
var require_docConclusionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docConclusionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "conclusion [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docConclusionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js
var require_docCoverRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docCoverRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "cover [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]]
    };
    var _default = docCoverRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js
var require_docCreditRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docCreditRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "credit [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docCreditRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js
var require_docCreditsRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docCreditsRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "credits [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docCreditsRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js
var require_docDedicationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docDedicationRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "dedication [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docDedicationRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js
var require_docEndnoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEndnoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "rearnote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: ["doc-endnotes"],
      requiredContextRole: ["doc-endnotes"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]]
    };
    var _default = docEndnoteRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js
var require_docEndnotesRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEndnotesRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "rearnotes [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-endnote"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docEndnotesRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js
var require_docEpigraphRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEpigraphRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "epigraph [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docEpigraphRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js
var require_docEpilogueRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docEpilogueRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "epilogue [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docEpilogueRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js
var require_docErrataRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docErrataRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "errata [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docErrataRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js
var require_docExampleRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docExampleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docExampleRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js
var require_docFootnoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docFootnoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "footnote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docFootnoteRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js
var require_docForewordRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docForewordRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "foreword [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docForewordRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js
var require_docGlossaryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docGlossaryRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "glossary [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["definition"], ["term"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docGlossaryRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js
var require_docGlossrefRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docGlossrefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "glossref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = docGlossrefRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js
var require_docIndexRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docIndexRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "index [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    };
    var _default = docIndexRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js
var require_docIntroductionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docIntroductionRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "introduction [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docIntroductionRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js
var require_docNoterefRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docNoterefRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "noteref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    };
    var _default = docNoterefRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js
var require_docNoticeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docNoticeRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "notice [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]]
    };
    var _default = docNoticeRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js
var require_docPagebreakRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPagebreakRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "pagebreak [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "separator"]]
    };
    var _default = docPagebreakRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js
var require_docPagelistRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPagelistRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "page-list [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    };
    var _default = docPagelistRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js
var require_docPartRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPartRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "part [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docPartRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js
var require_docPrefaceRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPrefaceRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "preface [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docPrefaceRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js
var require_docPrologueRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPrologueRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "prologue [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    };
    var _default = docPrologueRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js
var require_docPullquoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docPullquoteRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "pullquote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["none"]]
    };
    var _default = docPullquoteRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js
var require_docQnaRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docQnaRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "qna [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    };
    var _default = docQnaRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js
var require_docSubtitleRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docSubtitleRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "subtitle [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "sectionhead"]]
    };
    var _default = docSubtitleRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js
var require_docTipRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docTipRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "help [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]]
    };
    var _default = docTipRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js
var require_docTocRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var docTocRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "toc [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    };
    var _default = docTocRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js
var require_ariaDpubRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _docAbstractRole = _interopRequireDefault(require_docAbstractRole());
    var _docAcknowledgmentsRole = _interopRequireDefault(require_docAcknowledgmentsRole());
    var _docAfterwordRole = _interopRequireDefault(require_docAfterwordRole());
    var _docAppendixRole = _interopRequireDefault(require_docAppendixRole());
    var _docBacklinkRole = _interopRequireDefault(require_docBacklinkRole());
    var _docBiblioentryRole = _interopRequireDefault(require_docBiblioentryRole());
    var _docBibliographyRole = _interopRequireDefault(require_docBibliographyRole());
    var _docBibliorefRole = _interopRequireDefault(require_docBibliorefRole());
    var _docChapterRole = _interopRequireDefault(require_docChapterRole());
    var _docColophonRole = _interopRequireDefault(require_docColophonRole());
    var _docConclusionRole = _interopRequireDefault(require_docConclusionRole());
    var _docCoverRole = _interopRequireDefault(require_docCoverRole());
    var _docCreditRole = _interopRequireDefault(require_docCreditRole());
    var _docCreditsRole = _interopRequireDefault(require_docCreditsRole());
    var _docDedicationRole = _interopRequireDefault(require_docDedicationRole());
    var _docEndnoteRole = _interopRequireDefault(require_docEndnoteRole());
    var _docEndnotesRole = _interopRequireDefault(require_docEndnotesRole());
    var _docEpigraphRole = _interopRequireDefault(require_docEpigraphRole());
    var _docEpilogueRole = _interopRequireDefault(require_docEpilogueRole());
    var _docErrataRole = _interopRequireDefault(require_docErrataRole());
    var _docExampleRole = _interopRequireDefault(require_docExampleRole());
    var _docFootnoteRole = _interopRequireDefault(require_docFootnoteRole());
    var _docForewordRole = _interopRequireDefault(require_docForewordRole());
    var _docGlossaryRole = _interopRequireDefault(require_docGlossaryRole());
    var _docGlossrefRole = _interopRequireDefault(require_docGlossrefRole());
    var _docIndexRole = _interopRequireDefault(require_docIndexRole());
    var _docIntroductionRole = _interopRequireDefault(require_docIntroductionRole());
    var _docNoterefRole = _interopRequireDefault(require_docNoterefRole());
    var _docNoticeRole = _interopRequireDefault(require_docNoticeRole());
    var _docPagebreakRole = _interopRequireDefault(require_docPagebreakRole());
    var _docPagelistRole = _interopRequireDefault(require_docPagelistRole());
    var _docPartRole = _interopRequireDefault(require_docPartRole());
    var _docPrefaceRole = _interopRequireDefault(require_docPrefaceRole());
    var _docPrologueRole = _interopRequireDefault(require_docPrologueRole());
    var _docPullquoteRole = _interopRequireDefault(require_docPullquoteRole());
    var _docQnaRole = _interopRequireDefault(require_docQnaRole());
    var _docSubtitleRole = _interopRequireDefault(require_docSubtitleRole());
    var _docTipRole = _interopRequireDefault(require_docTipRole());
    var _docTocRole = _interopRequireDefault(require_docTocRole());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]];
    var _default = ariaDpubRoles;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js
var require_graphicsDocumentRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var graphicsDocumentRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        module: "GRAPHICS",
        concept: {
          name: "graphics-object"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "img"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "article"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]]
    };
    var _default = graphicsDocumentRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js
var require_graphicsObjectRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var graphicsObjectRole = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        module: "GRAPHICS",
        concept: {
          name: "graphics-document"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "group"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "img"
        }
      }, {
        module: "GRAPHICS",
        concept: {
          name: "graphics-symbol"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]]
    };
    var _default = graphicsObjectRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js
var require_graphicsSymbolRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var graphicsSymbolRole = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]]
    };
    var _default = graphicsSymbolRole;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js
var require_ariaGraphicsRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _graphicsDocumentRole = _interopRequireDefault(require_graphicsDocumentRole());
    var _graphicsObjectRole = _interopRequireDefault(require_graphicsObjectRole());
    var _graphicsSymbolRole = _interopRequireDefault(require_graphicsSymbolRole());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var ariaGraphicsRoles = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]];
    var _default = ariaGraphicsRoles;
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/rolesMap.js
var require_rolesMap = __commonJS({
  "../../node_modules/aria-query/lib/rolesMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _ariaAbstractRoles = _interopRequireDefault(require_ariaAbstractRoles());
    var _ariaLiteralRoles = _interopRequireDefault(require_ariaLiteralRoles());
    var _ariaDpubRoles = _interopRequireDefault(require_ariaDpubRoles());
    var _ariaGraphicsRoles = _interopRequireDefault(require_ariaGraphicsRoles());
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e2) {
            throw _e2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e3) {
        didErr = true;
        err = _e3;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    var roles = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
    roles.forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), roleDefinition = _ref2[1];
      var _iterator = _createForOfIteratorHelper(roleDefinition.superClass), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var superClassIter = _step.value;
          var _iterator2 = _createForOfIteratorHelper(superClassIter), _step2;
          try {
            var _loop = function _loop2() {
              var superClassName = _step2.value;
              var superClassRoleTuple = roles.find(function(_ref3) {
                var _ref4 = _slicedToArray(_ref3, 1), name = _ref4[0];
                return name === superClassName;
              });
              if (superClassRoleTuple) {
                var superClassDefinition = superClassRoleTuple[1];
                for (var _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
                  var prop = _Object$keys[_i2];
                  if (
                    // $FlowIssue Accessing the hasOwnProperty on the Object prototype is fine.
                    !Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)
                  ) {
                    Object.assign(roleDefinition.props, _defineProperty({}, prop, superClassDefinition.props[prop]));
                  }
                }
              }
            };
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              _loop();
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    var rolesMap = {
      entries: function entries() {
        return roles;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _iterator3 = _createForOfIteratorHelper(roles), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var _step3$value = _slicedToArray(_step3.value, 2), key = _step3$value[0], values = _step3$value[1];
            fn.call(thisArg, values, key, roles);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      },
      get: function get(key) {
        var item = roles.find(function(tuple) {
          return tuple[0] === key ? true : false;
        });
        return item && item[1];
      },
      has: function has(key) {
        return !!rolesMap.get(key);
      },
      keys: function keys() {
        return roles.map(function(_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1), key = _ref6[0];
          return key;
        });
      },
      values: function values() {
        return roles.map(function(_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2), values2 = _ref8[1];
          return values2;
        });
      }
    };
    var _default = (0, _iterationDecorator.default)(rolesMap, rolesMap.entries());
    exports.default = _default;
  }
});

// ../../node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS({
  "../../node_modules/object-keys/isArguments.js"(exports, module) {
    "use strict";
    var toStr = Object.prototype.toString;
    module.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    };
  }
});

// ../../node_modules/object-keys/implementation.js
var require_implementation = __commonJS({
  "../../node_modules/object-keys/implementation.js"(exports, module) {
    "use strict";
    var keysShim;
    if (!Object.keys) {
      has = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      }();
      equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    var has;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module.exports = keysShim;
  }
});

// ../../node_modules/object-keys/index.js
var require_object_keys = __commonJS({
  "../../node_modules/object-keys/index.js"(exports, module) {
    "use strict";
    var slice = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? function keys(o) {
      return origKeys(o);
    } : require_implementation();
    var originalKeys = Object.keys;
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        }(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice.call(object));
            }
            return originalKeys(object);
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module.exports = keysShim;
  }
});

// ../../node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "../../node_modules/has-symbols/shams.js"(exports, module) {
    "use strict";
    module.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// ../../node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "../../node_modules/has-symbols/index.js"(exports, module) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// ../../node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "../../node_modules/has-proto/index.js"(exports, module) {
    "use strict";
    var test = {
      foo: {}
    };
    var $Object = Object;
    module.exports = function hasProto() {
      return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
    };
  }
});

// ../../node_modules/function-bind/implementation.js
var require_implementation2 = __commonJS({
  "../../node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// ../../node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "../../node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation2();
    module.exports = Function.prototype.bind || implementation;
  }
});

// ../../node_modules/hasown/index.js
var require_hasown = __commonJS({
  "../../node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// ../../node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "../../node_modules/get-intrinsic/index.js"(exports, module) {
    "use strict";
    var undefined2;
    var $SyntaxError = SyntaxError;
    var $Function = Function;
    var $TypeError = TypeError;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// ../../node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "../../node_modules/has-property-descriptors/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
          return true;
        } catch (e) {
          return false;
        }
      }
      return false;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!hasPropertyDescriptors()) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    module.exports = hasPropertyDescriptors;
  }
});

// ../../node_modules/gopd/index.js
var require_gopd = __commonJS({
  "../../node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// ../../node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "../../node_modules/define-data-property/index.js"(exports, module) {
    "use strict";
    var hasPropertyDescriptors = require_has_property_descriptors()();
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = hasPropertyDescriptors && GetIntrinsic("%Object.defineProperty%", true);
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    var $SyntaxError = GetIntrinsic("%SyntaxError%");
    var $TypeError = GetIntrinsic("%TypeError%");
    var gopd = require_gopd();
    module.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// ../../node_modules/define-properties/index.js
var require_define_properties = __commonJS({
  "../../node_modules/define-properties/index.js"(exports, module) {
    "use strict";
    var keys = require_object_keys();
    var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr = Object.prototype.toString;
    var concat = Array.prototype.concat;
    var defineDataProperty = require_define_data_property();
    var isFunction = function(fn) {
      return typeof fn === "function" && toStr.call(fn) === "[object Function]";
    };
    var supportsDescriptors = require_has_property_descriptors()();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object) {
        if (predicate === true) {
          if (object[name] === value) {
            return;
          }
        } else if (!isFunction(predicate) || !predicate()) {
          return;
        }
      }
      if (supportsDescriptors) {
        defineDataProperty(object, name, value, true);
      } else {
        defineDataProperty(object, name, value);
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols) {
        props = concat.call(props, Object.getOwnPropertySymbols(map));
      }
      for (var i = 0; i < props.length; i += 1) {
        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
      }
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module.exports = defineProperties;
  }
});

// ../../node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "../../node_modules/set-function-length/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $floor = GetIntrinsic("%Math.floor%");
    module.exports = function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define2(fn, "length", length, true, true);
        } else {
          define2(fn, "length", length);
        }
      }
      return fn;
    };
  }
});

// ../../node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "../../node_modules/call-bind/index.js"(exports, module) {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var setFunctionLength = require_set_function_length();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var $max = GetIntrinsic("%Math.max%");
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = null;
      }
    }
    module.exports = function callBind(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError("a function is required");
      }
      var func = $reflectApply(bind, $call, arguments);
      return setFunctionLength(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      );
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module.exports, "apply", { value: applyBind });
    } else {
      module.exports.apply = applyBind;
    }
  }
});

// ../../node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "../../node_modules/call-bind/callBound.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  }
});

// ../../node_modules/object.assign/implementation.js
var require_implementation3 = __commonJS({
  "../../node_modules/object.assign/implementation.js"(exports, module) {
    "use strict";
    var objectKeys = require_object_keys();
    var hasSymbols = require_shams()();
    var callBound = require_callBound();
    var toObject = Object;
    var $push = callBound("Array.prototype.push");
    var $propIsEnumerable = callBound("Object.prototype.propertyIsEnumerable");
    var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;
    module.exports = function assign(target, source1) {
      if (target == null) {
        throw new TypeError("target must be an object");
      }
      var to = toObject(target);
      if (arguments.length === 1) {
        return to;
      }
      for (var s = 1; s < arguments.length; ++s) {
        var from = toObject(arguments[s]);
        var keys = objectKeys(from);
        var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
        if (getSymbols) {
          var syms = getSymbols(from);
          for (var j = 0; j < syms.length; ++j) {
            var key = syms[j];
            if ($propIsEnumerable(from, key)) {
              $push(keys, key);
            }
          }
        }
        for (var i = 0; i < keys.length; ++i) {
          var nextKey = keys[i];
          if ($propIsEnumerable(from, nextKey)) {
            var propValue = from[nextKey];
            to[nextKey] = propValue;
          }
        }
      }
      return to;
    };
  }
});

// ../../node_modules/object.assign/polyfill.js
var require_polyfill = __commonJS({
  "../../node_modules/object.assign/polyfill.js"(exports, module) {
    "use strict";
    var implementation = require_implementation3();
    var lacksProperEnumerationOrder = function() {
      if (!Object.assign) {
        return false;
      }
      var str = "abcdefghijklmnopqrst";
      var letters = str.split("");
      var map = {};
      for (var i = 0; i < letters.length; ++i) {
        map[letters[i]] = letters[i];
      }
      var obj = Object.assign({}, map);
      var actual = "";
      for (var k in obj) {
        actual += k;
      }
      return str !== actual;
    };
    var assignHasPendingExceptions = function() {
      if (!Object.assign || !Object.preventExtensions) {
        return false;
      }
      var thrower = Object.preventExtensions({ 1: 2 });
      try {
        Object.assign(thrower, "xy");
      } catch (e) {
        return thrower[1] === "y";
      }
      return false;
    };
    module.exports = function getPolyfill() {
      if (!Object.assign) {
        return implementation;
      }
      if (lacksProperEnumerationOrder()) {
        return implementation;
      }
      if (assignHasPendingExceptions()) {
        return implementation;
      }
      return Object.assign;
    };
  }
});

// ../../node_modules/object.assign/shim.js
var require_shim = __commonJS({
  "../../node_modules/object.assign/shim.js"(exports, module) {
    "use strict";
    var define2 = require_define_properties();
    var getPolyfill = require_polyfill();
    module.exports = function shimAssign() {
      var polyfill = getPolyfill();
      define2(
        Object,
        { assign: polyfill },
        { assign: function() {
          return Object.assign !== polyfill;
        } }
      );
      return polyfill;
    };
  }
});

// ../../node_modules/object.assign/index.js
var require_object = __commonJS({
  "../../node_modules/object.assign/index.js"(exports, module) {
    "use strict";
    var defineProperties = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation3();
    var getPolyfill = require_polyfill();
    var shim = require_shim();
    var polyfill = callBind.apply(getPolyfill());
    var bound = function assign(target, source1) {
      return polyfill(Object, arguments);
    };
    defineProperties(bound, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = bound;
  }
});

// ../../node_modules/functions-have-names/index.js
var require_functions_have_names = __commonJS({
  "../../node_modules/functions-have-names/index.js"(exports, module) {
    "use strict";
    var functionsHaveNames = function functionsHaveNames2() {
      return typeof function f() {
      }.name === "string";
    };
    var gOPD = Object.getOwnPropertyDescriptor;
    if (gOPD) {
      try {
        gOPD([], "length");
      } catch (e) {
        gOPD = null;
      }
    }
    functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
      if (!functionsHaveNames() || !gOPD) {
        return false;
      }
      var desc = gOPD(function() {
      }, "name");
      return !!desc && !!desc.configurable;
    };
    var $bind = Function.prototype.bind;
    functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
      return functionsHaveNames() && typeof $bind === "function" && function f() {
      }.bind().name !== "";
    };
    module.exports = functionsHaveNames;
  }
});

// ../../node_modules/set-function-name/index.js
var require_set_function_name = __commonJS({
  "../../node_modules/set-function-name/index.js"(exports, module) {
    "use strict";
    var define2 = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var functionsHaveConfigurableNames = require_functions_have_names().functionsHaveConfigurableNames();
    var $TypeError = TypeError;
    module.exports = function setFunctionName(fn, name) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      if (!loose || functionsHaveConfigurableNames) {
        if (hasDescriptors) {
          define2(fn, "name", name, true, true);
        } else {
          define2(fn, "name", name);
        }
      }
      return fn;
    };
  }
});

// ../../node_modules/regexp.prototype.flags/implementation.js
var require_implementation4 = __commonJS({
  "../../node_modules/regexp.prototype.flags/implementation.js"(exports, module) {
    "use strict";
    var setFunctionName = require_set_function_name();
    var $Object = Object;
    var $TypeError = TypeError;
    module.exports = setFunctionName(function flags() {
      if (this != null && this !== $Object(this)) {
        throw new $TypeError("RegExp.prototype.flags getter called on non-object");
      }
      var result = "";
      if (this.hasIndices) {
        result += "d";
      }
      if (this.global) {
        result += "g";
      }
      if (this.ignoreCase) {
        result += "i";
      }
      if (this.multiline) {
        result += "m";
      }
      if (this.dotAll) {
        result += "s";
      }
      if (this.unicode) {
        result += "u";
      }
      if (this.unicodeSets) {
        result += "v";
      }
      if (this.sticky) {
        result += "y";
      }
      return result;
    }, "get flags", true);
  }
});

// ../../node_modules/regexp.prototype.flags/polyfill.js
var require_polyfill2 = __commonJS({
  "../../node_modules/regexp.prototype.flags/polyfill.js"(exports, module) {
    "use strict";
    var implementation = require_implementation4();
    var supportsDescriptors = require_define_properties().supportsDescriptors;
    var $gOPD = Object.getOwnPropertyDescriptor;
    module.exports = function getPolyfill() {
      if (supportsDescriptors && /a/mig.flags === "gim") {
        var descriptor = $gOPD(RegExp.prototype, "flags");
        if (descriptor && typeof descriptor.get === "function" && typeof RegExp.prototype.dotAll === "boolean" && typeof RegExp.prototype.hasIndices === "boolean") {
          var calls = "";
          var o = {};
          Object.defineProperty(o, "hasIndices", {
            get: function() {
              calls += "d";
            }
          });
          Object.defineProperty(o, "sticky", {
            get: function() {
              calls += "y";
            }
          });
          if (calls === "dy") {
            return descriptor.get;
          }
        }
      }
      return implementation;
    };
  }
});

// ../../node_modules/regexp.prototype.flags/shim.js
var require_shim2 = __commonJS({
  "../../node_modules/regexp.prototype.flags/shim.js"(exports, module) {
    "use strict";
    var supportsDescriptors = require_define_properties().supportsDescriptors;
    var getPolyfill = require_polyfill2();
    var gOPD = Object.getOwnPropertyDescriptor;
    var defineProperty = Object.defineProperty;
    var TypeErr = TypeError;
    var getProto = Object.getPrototypeOf;
    var regex = /a/;
    module.exports = function shimFlags() {
      if (!supportsDescriptors || !getProto) {
        throw new TypeErr("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
      }
      var polyfill = getPolyfill();
      var proto = getProto(regex);
      var descriptor = gOPD(proto, "flags");
      if (!descriptor || descriptor.get !== polyfill) {
        defineProperty(proto, "flags", {
          configurable: true,
          enumerable: false,
          get: polyfill
        });
      }
      return polyfill;
    };
  }
});

// ../../node_modules/regexp.prototype.flags/index.js
var require_regexp_prototype = __commonJS({
  "../../node_modules/regexp.prototype.flags/index.js"(exports, module) {
    "use strict";
    var define2 = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation4();
    var getPolyfill = require_polyfill2();
    var shim = require_shim2();
    var flagsBound = callBind(getPolyfill());
    define2(flagsBound, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = flagsBound;
  }
});

// ../../node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "../../node_modules/has-tostringtag/shams.js"(exports, module) {
    "use strict";
    var hasSymbols = require_shams();
    module.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// ../../node_modules/is-arguments/index.js
var require_is_arguments = __commonJS({
  "../../node_modules/is-arguments/index.js"(exports, module) {
    "use strict";
    var hasToStringTag = require_shams2()();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return $toString(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && $toString(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  }
});

// (disabled):../../node_modules/object-inspect/util.inspect
var require_util2 = __commonJS({
  "(disabled):../../node_modules/object-inspect/util.inspect"() {
  }
});

// ../../node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "../../node_modules/object-inspect/index.js"(exports, module) {
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    var utilInspect = require_util2();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    module.exports = function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
      var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
      return quoteChar + s + quoteChar;
    }
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    function toStr(obj) {
      return objectToString.call(obj);
    }
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
  }
});

// ../../node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "../../node_modules/side-channel/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = GetIntrinsic("%TypeError%");
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = function(list, key) {
      for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = list.next;
          list.next = curr;
          return curr;
        }
      }
    };
    var listGet = function(objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    };
    var listSet = function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = {
          // eslint-disable-line no-param-reassign
          key,
          next: objects.next,
          value
        };
      }
    };
    var listHas = function(objects, key) {
      return !!listGetNode(objects, key);
    };
    module.exports = function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        get: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              return listGet($o, key);
            }
          }
        },
        has: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              return listHas($o, key);
            }
          }
          return false;
        },
        set: function(key, value) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key, value);
          }
        }
      };
      return channel;
    };
  }
});

// ../../node_modules/internal-slot/index.js
var require_internal_slot = __commonJS({
  "../../node_modules/internal-slot/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var hasOwn = require_hasown();
    var channel = require_side_channel()();
    var $TypeError = GetIntrinsic("%TypeError%");
    var SLOT = {
      assert: function(O, slot) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new $TypeError("`O` is not an object");
        }
        if (typeof slot !== "string") {
          throw new $TypeError("`slot` must be a string");
        }
        channel.assert(O);
        if (!SLOT.has(O, slot)) {
          throw new $TypeError("`" + slot + "` is not present on `O`");
        }
      },
      get: function(O, slot) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new $TypeError("`O` is not an object");
        }
        if (typeof slot !== "string") {
          throw new $TypeError("`slot` must be a string");
        }
        var slots = channel.get(O);
        return slots && slots["$" + slot];
      },
      has: function(O, slot) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new $TypeError("`O` is not an object");
        }
        if (typeof slot !== "string") {
          throw new $TypeError("`slot` must be a string");
        }
        var slots = channel.get(O);
        return !!slots && hasOwn(slots, "$" + slot);
      },
      set: function(O, slot, V) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new $TypeError("`O` is not an object");
        }
        if (typeof slot !== "string") {
          throw new $TypeError("`slot` must be a string");
        }
        var slots = channel.get(O);
        if (!slots) {
          slots = {};
          channel.set(O, slots);
        }
        slots["$" + slot] = V;
      }
    };
    if (Object.freeze) {
      Object.freeze(SLOT);
    }
    module.exports = SLOT;
  }
});

// ../../node_modules/stop-iteration-iterator/index.js
var require_stop_iteration_iterator = __commonJS({
  "../../node_modules/stop-iteration-iterator/index.js"(exports, module) {
    "use strict";
    var SLOT = require_internal_slot();
    var $SyntaxError = SyntaxError;
    var $StopIteration = typeof StopIteration === "object" ? StopIteration : null;
    module.exports = function getStopIterationIterator(origIterator) {
      if (!$StopIteration) {
        throw new $SyntaxError("this environment lacks StopIteration");
      }
      SLOT.set(origIterator, "[[Done]]", false);
      var siIterator = {
        next: function next() {
          var iterator = SLOT.get(this, "[[Iterator]]");
          var done = SLOT.get(iterator, "[[Done]]");
          try {
            return {
              done,
              value: done ? void 0 : iterator.next()
            };
          } catch (e) {
            SLOT.set(iterator, "[[Done]]", true);
            if (e !== $StopIteration) {
              throw e;
            }
            return {
              done: true,
              value: void 0
            };
          }
        }
      };
      SLOT.set(siIterator, "[[Iterator]]", origIterator);
      return siIterator;
    };
  }
});

// ../../node_modules/isarray/index.js
var require_isarray = __commonJS({
  "../../node_modules/isarray/index.js"(exports, module) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
  }
});

// ../../node_modules/is-string/index.js
var require_is_string = __commonJS({
  "../../node_modules/is-string/index.js"(exports, module) {
    "use strict";
    var strValue = String.prototype.valueOf;
    var tryStringObject = function tryStringObject2(value) {
      try {
        strValue.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var strClass = "[object String]";
    var hasToStringTag = require_shams2()();
    module.exports = function isString(value) {
      if (typeof value === "string") {
        return true;
      }
      if (typeof value !== "object") {
        return false;
      }
      return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
    };
  }
});

// ../../node_modules/is-map/index.js
var require_is_map = __commonJS({
  "../../node_modules/is-map/index.js"(exports, module) {
    "use strict";
    var $Map = typeof Map === "function" && Map.prototype ? Map : null;
    var $Set = typeof Set === "function" && Set.prototype ? Set : null;
    var exported;
    if (!$Map) {
      exported = function isMap(x) {
        return false;
      };
    }
    var $mapHas = $Map ? Map.prototype.has : null;
    var $setHas = $Set ? Set.prototype.has : null;
    if (!exported && !$mapHas) {
      exported = function isMap(x) {
        return false;
      };
    }
    module.exports = exported || function isMap(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      try {
        $mapHas.call(x);
        if ($setHas) {
          try {
            $setHas.call(x);
          } catch (e) {
            return true;
          }
        }
        return x instanceof $Map;
      } catch (e) {
      }
      return false;
    };
  }
});

// ../../node_modules/is-set/index.js
var require_is_set = __commonJS({
  "../../node_modules/is-set/index.js"(exports, module) {
    "use strict";
    var $Map = typeof Map === "function" && Map.prototype ? Map : null;
    var $Set = typeof Set === "function" && Set.prototype ? Set : null;
    var exported;
    if (!$Set) {
      exported = function isSet(x) {
        return false;
      };
    }
    var $mapHas = $Map ? Map.prototype.has : null;
    var $setHas = $Set ? Set.prototype.has : null;
    if (!exported && !$setHas) {
      exported = function isSet(x) {
        return false;
      };
    }
    module.exports = exported || function isSet(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      try {
        $setHas.call(x);
        if ($mapHas) {
          try {
            $mapHas.call(x);
          } catch (e) {
            return true;
          }
        }
        return x instanceof $Set;
      } catch (e) {
      }
      return false;
    };
  }
});

// ../../node_modules/es-get-iterator/index.js
var require_es_get_iterator = __commonJS({
  "../../node_modules/es-get-iterator/index.js"(exports, module) {
    "use strict";
    var isArguments = require_is_arguments();
    var getStopIterationIterator = require_stop_iteration_iterator();
    if (require_has_symbols()() || require_shams()()) {
      $iterator = Symbol.iterator;
      module.exports = function getIterator(iterable) {
        if (iterable != null && typeof iterable[$iterator] !== "undefined") {
          return iterable[$iterator]();
        }
        if (isArguments(iterable)) {
          return Array.prototype[$iterator].call(iterable);
        }
      };
    } else {
      isArray = require_isarray();
      isString = require_is_string();
      GetIntrinsic = require_get_intrinsic();
      $Map = GetIntrinsic("%Map%", true);
      $Set = GetIntrinsic("%Set%", true);
      callBound = require_callBound();
      $arrayPush = callBound("Array.prototype.push");
      $charCodeAt = callBound("String.prototype.charCodeAt");
      $stringSlice = callBound("String.prototype.slice");
      advanceStringIndex = function advanceStringIndex2(S, index) {
        var length = S.length;
        if (index + 1 >= length) {
          return index + 1;
        }
        var first = $charCodeAt(S, index);
        if (first < 55296 || first > 56319) {
          return index + 1;
        }
        var second = $charCodeAt(S, index + 1);
        if (second < 56320 || second > 57343) {
          return index + 1;
        }
        return index + 2;
      };
      getArrayIterator = function getArrayIterator2(arraylike) {
        var i = 0;
        return {
          next: function next() {
            var done = i >= arraylike.length;
            var value;
            if (!done) {
              value = arraylike[i];
              i += 1;
            }
            return {
              done,
              value
            };
          }
        };
      };
      getNonCollectionIterator = function getNonCollectionIterator2(iterable, noPrimordialCollections) {
        if (isArray(iterable) || isArguments(iterable)) {
          return getArrayIterator(iterable);
        }
        if (isString(iterable)) {
          var i = 0;
          return {
            next: function next() {
              var nextIndex = advanceStringIndex(iterable, i);
              var value = $stringSlice(iterable, i, nextIndex);
              i = nextIndex;
              return {
                done: nextIndex > iterable.length,
                value
              };
            }
          };
        }
        if (noPrimordialCollections && typeof iterable["_es6-shim iterator_"] !== "undefined") {
          return iterable["_es6-shim iterator_"]();
        }
      };
      if (!$Map && !$Set) {
        module.exports = function getIterator(iterable) {
          if (iterable != null) {
            return getNonCollectionIterator(iterable, true);
          }
        };
      } else {
        isMap = require_is_map();
        isSet = require_is_set();
        $mapForEach = callBound("Map.prototype.forEach", true);
        $setForEach = callBound("Set.prototype.forEach", true);
        if (typeof process === "undefined" || !process.versions || !process.versions.node) {
          $mapIterator = callBound("Map.prototype.iterator", true);
          $setIterator = callBound("Set.prototype.iterator", true);
        }
        $mapAtAtIterator = callBound("Map.prototype.@@iterator", true) || callBound("Map.prototype._es6-shim iterator_", true);
        $setAtAtIterator = callBound("Set.prototype.@@iterator", true) || callBound("Set.prototype._es6-shim iterator_", true);
        getCollectionIterator = function getCollectionIterator2(iterable) {
          if (isMap(iterable)) {
            if ($mapIterator) {
              return getStopIterationIterator($mapIterator(iterable));
            }
            if ($mapAtAtIterator) {
              return $mapAtAtIterator(iterable);
            }
            if ($mapForEach) {
              var entries = [];
              $mapForEach(iterable, function(v, k) {
                $arrayPush(entries, [k, v]);
              });
              return getArrayIterator(entries);
            }
          }
          if (isSet(iterable)) {
            if ($setIterator) {
              return getStopIterationIterator($setIterator(iterable));
            }
            if ($setAtAtIterator) {
              return $setAtAtIterator(iterable);
            }
            if ($setForEach) {
              var values = [];
              $setForEach(iterable, function(v) {
                $arrayPush(values, v);
              });
              return getArrayIterator(values);
            }
          }
        };
        module.exports = function getIterator(iterable) {
          return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
        };
      }
    }
    var $iterator;
    var isArray;
    var isString;
    var GetIntrinsic;
    var $Map;
    var $Set;
    var callBound;
    var $arrayPush;
    var $charCodeAt;
    var $stringSlice;
    var advanceStringIndex;
    var getArrayIterator;
    var getNonCollectionIterator;
    var isMap;
    var isSet;
    var $mapForEach;
    var $setForEach;
    var $mapIterator;
    var $setIterator;
    var $mapAtAtIterator;
    var $setAtAtIterator;
    var getCollectionIterator;
  }
});

// ../../node_modules/object-is/implementation.js
var require_implementation5 = __commonJS({
  "../../node_modules/object-is/implementation.js"(exports, module) {
    "use strict";
    var numberIsNaN = function(value) {
      return value !== value;
    };
    module.exports = function is(a, b) {
      if (a === 0 && b === 0) {
        return 1 / a === 1 / b;
      }
      if (a === b) {
        return true;
      }
      if (numberIsNaN(a) && numberIsNaN(b)) {
        return true;
      }
      return false;
    };
  }
});

// ../../node_modules/object-is/polyfill.js
var require_polyfill3 = __commonJS({
  "../../node_modules/object-is/polyfill.js"(exports, module) {
    "use strict";
    var implementation = require_implementation5();
    module.exports = function getPolyfill() {
      return typeof Object.is === "function" ? Object.is : implementation;
    };
  }
});

// ../../node_modules/object-is/shim.js
var require_shim3 = __commonJS({
  "../../node_modules/object-is/shim.js"(exports, module) {
    "use strict";
    var getPolyfill = require_polyfill3();
    var define2 = require_define_properties();
    module.exports = function shimObjectIs() {
      var polyfill = getPolyfill();
      define2(Object, { is: polyfill }, {
        is: function testObjectIs() {
          return Object.is !== polyfill;
        }
      });
      return polyfill;
    };
  }
});

// ../../node_modules/object-is/index.js
var require_object_is = __commonJS({
  "../../node_modules/object-is/index.js"(exports, module) {
    "use strict";
    var define2 = require_define_properties();
    var callBind = require_call_bind();
    var implementation = require_implementation5();
    var getPolyfill = require_polyfill3();
    var shim = require_shim3();
    var polyfill = callBind(getPolyfill(), Object);
    define2(polyfill, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = polyfill;
  }
});

// ../../node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "../../node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// ../../node_modules/for-each/index.js
var require_for_each = __commonJS({
  "../../node_modules/for-each/index.js"(exports, module) {
    "use strict";
    var isCallable = require_is_callable();
    var toStr = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var forEachArray = function forEachArray2(array, iterator, receiver) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
          if (receiver == null) {
            iterator(array[i], i, array);
          } else {
            iterator.call(receiver, array[i], i, array);
          }
        }
      }
    };
    var forEachString = function forEachString2(string, iterator, receiver) {
      for (var i = 0, len = string.length; i < len; i++) {
        if (receiver == null) {
          iterator(string.charAt(i), i, string);
        } else {
          iterator.call(receiver, string.charAt(i), i, string);
        }
      }
    };
    var forEachObject = function forEachObject2(object, iterator, receiver) {
      for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
          if (receiver == null) {
            iterator(object[k], k, object);
          } else {
            iterator.call(receiver, object[k], k, object);
          }
        }
      }
    };
    var forEach = function forEach2(list, iterator, thisArg) {
      if (!isCallable(iterator)) {
        throw new TypeError("iterator must be a function");
      }
      var receiver;
      if (arguments.length >= 3) {
        receiver = thisArg;
      }
      if (toStr.call(list) === "[object Array]") {
        forEachArray(list, iterator, receiver);
      } else if (typeof list === "string") {
        forEachString(list, iterator, receiver);
      } else {
        forEachObject(list, iterator, receiver);
      }
    };
    module.exports = forEach;
  }
});

// ../../node_modules/available-typed-arrays/index.js
var require_available_typed_arrays = __commonJS({
  "../../node_modules/available-typed-arrays/index.js"(exports, module) {
    "use strict";
    var possibleNames = [
      "BigInt64Array",
      "BigUint64Array",
      "Float32Array",
      "Float64Array",
      "Int16Array",
      "Int32Array",
      "Int8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8Array",
      "Uint8ClampedArray"
    ];
    var g = typeof globalThis === "undefined" ? global : globalThis;
    module.exports = function availableTypedArrays() {
      var out = [];
      for (var i = 0; i < possibleNames.length; i++) {
        if (typeof g[possibleNames[i]] === "function") {
          out[out.length] = possibleNames[i];
        }
      }
      return out;
    };
  }
});

// ../../node_modules/which-typed-array/index.js
var require_which_typed_array = __commonJS({
  "../../node_modules/which-typed-array/index.js"(exports, module) {
    "use strict";
    var forEach = require_for_each();
    var availableTypedArrays = require_available_typed_arrays();
    var callBind = require_call_bind();
    var callBound = require_callBound();
    var gOPD = require_gopd();
    var $toString = callBound("Object.prototype.toString");
    var hasToStringTag = require_shams2()();
    var g = typeof globalThis === "undefined" ? global : globalThis;
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var getPrototypeOf = Object.getPrototypeOf;
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var cache = { __proto__: null };
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr) {
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          cache["$" + typedArray] = callBind(descriptor.get);
        }
      });
    } else {
      forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        var fn = arr.slice || arr.set;
        if (fn) {
          cache["$" + typedArray] = callBind(fn);
        }
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var found = false;
      forEach(cache, function(getter, typedArray) {
        if (!found) {
          try {
            if ("$" + getter(value) === typedArray) {
              found = $slice(typedArray, 1);
            }
          } catch (e) {
          }
        }
      });
      return found;
    };
    var trySlices = function tryAllSlices(value) {
      var found = false;
      forEach(cache, function(getter, name) {
        if (!found) {
          try {
            getter(value);
            found = $slice(name, 1);
          } catch (e) {
          }
        }
      });
      return found;
    };
    module.exports = function whichTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) {
          return tag;
        }
        if (tag !== "Object") {
          return false;
        }
        return trySlices(value);
      }
      if (!gOPD) {
        return null;
      }
      return tryTypedArrays(value);
    };
  }
});

// ../../node_modules/is-typed-array/index.js
var require_is_typed_array = __commonJS({
  "../../node_modules/is-typed-array/index.js"(exports, module) {
    "use strict";
    var whichTypedArray = require_which_typed_array();
    module.exports = function isTypedArray(value) {
      return !!whichTypedArray(value);
    };
  }
});

// ../../node_modules/is-array-buffer/index.js
var require_is_array_buffer = __commonJS({
  "../../node_modules/is-array-buffer/index.js"(exports, module) {
    "use strict";
    var callBind = require_call_bind();
    var callBound = require_callBound();
    var GetIntrinsic = require_get_intrinsic();
    var isTypedArray = require_is_typed_array();
    var $ArrayBuffer = GetIntrinsic("ArrayBuffer", true);
    var $Float32Array = GetIntrinsic("Float32Array", true);
    var $byteLength = callBound("ArrayBuffer.prototype.byteLength", true);
    var abSlice = $ArrayBuffer && !$byteLength && new $ArrayBuffer().slice;
    var $abSlice = abSlice && callBind(abSlice);
    module.exports = $byteLength || $abSlice ? function isArrayBuffer(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      try {
        if ($byteLength) {
          $byteLength(obj);
        } else {
          $abSlice(obj, 0);
        }
        return true;
      } catch (e) {
        return false;
      }
    } : $Float32Array ? function IsArrayBuffer(obj) {
      try {
        return new $Float32Array(obj).buffer === obj && !isTypedArray(obj);
      } catch (e) {
        return typeof obj === "object" && e.name === "RangeError";
      }
    } : function isArrayBuffer(obj) {
      return false;
    };
  }
});

// ../../node_modules/is-date-object/index.js
var require_is_date_object = __commonJS({
  "../../node_modules/is-date-object/index.js"(exports, module) {
    "use strict";
    var getDay = Date.prototype.getDay;
    var tryDateObject = function tryDateGetDayCall(value) {
      try {
        getDay.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var dateClass = "[object Date]";
    var hasToStringTag = require_shams2()();
    module.exports = function isDateObject(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
    };
  }
});

// ../../node_modules/is-regex/index.js
var require_is_regex = __commonJS({
  "../../node_modules/is-regex/index.js"(exports, module) {
    "use strict";
    var callBound = require_callBound();
    var hasToStringTag = require_shams2()();
    var has;
    var $exec;
    var isRegexMarker;
    var badStringifier;
    if (hasToStringTag) {
      has = callBound("Object.prototype.hasOwnProperty");
      $exec = callBound("RegExp.prototype.exec");
      isRegexMarker = {};
      throwRegexMarker = function() {
        throw isRegexMarker;
      };
      badStringifier = {
        toString: throwRegexMarker,
        valueOf: throwRegexMarker
      };
      if (typeof Symbol.toPrimitive === "symbol") {
        badStringifier[Symbol.toPrimitive] = throwRegexMarker;
      }
    }
    var throwRegexMarker;
    var $toString = callBound("Object.prototype.toString");
    var gOPD = Object.getOwnPropertyDescriptor;
    var regexClass = "[object RegExp]";
    module.exports = hasToStringTag ? function isRegex(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      var descriptor = gOPD(value, "lastIndex");
      var hasLastIndexDataProperty = descriptor && has(descriptor, "value");
      if (!hasLastIndexDataProperty) {
        return false;
      }
      try {
        $exec(value, badStringifier);
      } catch (e) {
        return e === isRegexMarker;
      }
    } : function isRegex(value) {
      if (!value || typeof value !== "object" && typeof value !== "function") {
        return false;
      }
      return $toString(value) === regexClass;
    };
  }
});

// ../../node_modules/is-shared-array-buffer/index.js
var require_is_shared_array_buffer = __commonJS({
  "../../node_modules/is-shared-array-buffer/index.js"(exports, module) {
    "use strict";
    var callBound = require_callBound();
    var $byteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
    module.exports = $byteLength ? function isSharedArrayBuffer(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      try {
        $byteLength(obj);
        return true;
      } catch (e) {
        return false;
      }
    } : function isSharedArrayBuffer(obj) {
      return false;
    };
  }
});

// ../../node_modules/is-number-object/index.js
var require_is_number_object = __commonJS({
  "../../node_modules/is-number-object/index.js"(exports, module) {
    "use strict";
    var numToStr = Number.prototype.toString;
    var tryNumberObject = function tryNumberObject2(value) {
      try {
        numToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var numClass = "[object Number]";
    var hasToStringTag = require_shams2()();
    module.exports = function isNumberObject(value) {
      if (typeof value === "number") {
        return true;
      }
      if (typeof value !== "object") {
        return false;
      }
      return hasToStringTag ? tryNumberObject(value) : toStr.call(value) === numClass;
    };
  }
});

// ../../node_modules/is-boolean-object/index.js
var require_is_boolean_object = __commonJS({
  "../../node_modules/is-boolean-object/index.js"(exports, module) {
    "use strict";
    var callBound = require_callBound();
    var $boolToStr = callBound("Boolean.prototype.toString");
    var $toString = callBound("Object.prototype.toString");
    var tryBooleanObject = function booleanBrandCheck(value) {
      try {
        $boolToStr(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var boolClass = "[object Boolean]";
    var hasToStringTag = require_shams2()();
    module.exports = function isBoolean(value) {
      if (typeof value === "boolean") {
        return true;
      }
      if (value === null || typeof value !== "object") {
        return false;
      }
      return hasToStringTag && Symbol.toStringTag in value ? tryBooleanObject(value) : $toString(value) === boolClass;
    };
  }
});

// ../../node_modules/is-symbol/index.js
var require_is_symbol = __commonJS({
  "../../node_modules/is-symbol/index.js"(exports, module) {
    "use strict";
    var toStr = Object.prototype.toString;
    var hasSymbols = require_has_symbols()();
    if (hasSymbols) {
      symToStr = Symbol.prototype.toString;
      symStringRegex = /^Symbol\(.*\)$/;
      isSymbolObject = function isRealSymbolObject(value) {
        if (typeof value.valueOf() !== "symbol") {
          return false;
        }
        return symStringRegex.test(symToStr.call(value));
      };
      module.exports = function isSymbol(value) {
        if (typeof value === "symbol") {
          return true;
        }
        if (toStr.call(value) !== "[object Symbol]") {
          return false;
        }
        try {
          return isSymbolObject(value);
        } catch (e) {
          return false;
        }
      };
    } else {
      module.exports = function isSymbol(value) {
        return false;
      };
    }
    var symToStr;
    var symStringRegex;
    var isSymbolObject;
  }
});

// ../../node_modules/has-bigints/index.js
var require_has_bigints = __commonJS({
  "../../node_modules/has-bigints/index.js"(exports, module) {
    "use strict";
    var $BigInt = typeof BigInt !== "undefined" && BigInt;
    module.exports = function hasNativeBigInts() {
      return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
    };
  }
});

// ../../node_modules/is-bigint/index.js
var require_is_bigint = __commonJS({
  "../../node_modules/is-bigint/index.js"(exports, module) {
    "use strict";
    var hasBigInts = require_has_bigints()();
    if (hasBigInts) {
      bigIntValueOf = BigInt.prototype.valueOf;
      tryBigInt = function tryBigIntObject(value) {
        try {
          bigIntValueOf.call(value);
          return true;
        } catch (e) {
        }
        return false;
      };
      module.exports = function isBigInt(value) {
        if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") {
          return false;
        }
        if (typeof value === "bigint") {
          return true;
        }
        return tryBigInt(value);
      };
    } else {
      module.exports = function isBigInt(value) {
        return false;
      };
    }
    var bigIntValueOf;
    var tryBigInt;
  }
});

// ../../node_modules/which-boxed-primitive/index.js
var require_which_boxed_primitive = __commonJS({
  "../../node_modules/which-boxed-primitive/index.js"(exports, module) {
    "use strict";
    var isString = require_is_string();
    var isNumber = require_is_number_object();
    var isBoolean = require_is_boolean_object();
    var isSymbol = require_is_symbol();
    var isBigInt = require_is_bigint();
    module.exports = function whichBoxedPrimitive(value) {
      if (value == null || typeof value !== "object" && typeof value !== "function") {
        return null;
      }
      if (isString(value)) {
        return "String";
      }
      if (isNumber(value)) {
        return "Number";
      }
      if (isBoolean(value)) {
        return "Boolean";
      }
      if (isSymbol(value)) {
        return "Symbol";
      }
      if (isBigInt(value)) {
        return "BigInt";
      }
    };
  }
});

// ../../node_modules/is-weakmap/index.js
var require_is_weakmap = __commonJS({
  "../../node_modules/is-weakmap/index.js"(exports, module) {
    "use strict";
    var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
    var $WeakSet = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
    var exported;
    if (!$WeakMap) {
      exported = function isWeakMap(x) {
        return false;
      };
    }
    var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
    var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
    if (!exported && !$mapHas) {
      exported = function isWeakMap(x) {
        return false;
      };
    }
    module.exports = exported || function isWeakMap(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      try {
        $mapHas.call(x, $mapHas);
        if ($setHas) {
          try {
            $setHas.call(x, $setHas);
          } catch (e) {
            return true;
          }
        }
        return x instanceof $WeakMap;
      } catch (e) {
      }
      return false;
    };
  }
});

// ../../node_modules/is-weakset/index.js
var require_is_weakset = __commonJS({
  "../../node_modules/is-weakset/index.js"(exports, module) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var $WeakSet = GetIntrinsic("%WeakSet%", true);
    var $setHas = callBound("WeakSet.prototype.has", true);
    if ($setHas) {
      $mapHas = callBound("WeakMap.prototype.has", true);
      module.exports = function isWeakSet(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        try {
          $setHas(x, $setHas);
          if ($mapHas) {
            try {
              $mapHas(x, $mapHas);
            } catch (e) {
              return true;
            }
          }
          return x instanceof $WeakSet;
        } catch (e) {
        }
        return false;
      };
    } else {
      module.exports = function isWeakSet(x) {
        return false;
      };
    }
    var $mapHas;
  }
});

// ../../node_modules/which-collection/index.js
var require_which_collection = __commonJS({
  "../../node_modules/which-collection/index.js"(exports, module) {
    "use strict";
    var isMap = require_is_map();
    var isSet = require_is_set();
    var isWeakMap = require_is_weakmap();
    var isWeakSet = require_is_weakset();
    module.exports = function whichCollection(value) {
      if (value && typeof value === "object") {
        if (isMap(value)) {
          return "Map";
        }
        if (isSet(value)) {
          return "Set";
        }
        if (isWeakMap(value)) {
          return "WeakMap";
        }
        if (isWeakSet(value)) {
          return "WeakSet";
        }
      }
      return false;
    };
  }
});

// ../../node_modules/array-buffer-byte-length/index.js
var require_array_buffer_byte_length = __commonJS({
  "../../node_modules/array-buffer-byte-length/index.js"(exports, module) {
    "use strict";
    var callBound = require_callBound();
    var $byteLength = callBound("ArrayBuffer.prototype.byteLength", true);
    var isArrayBuffer = require_is_array_buffer();
    module.exports = function byteLength(ab) {
      if (!isArrayBuffer(ab)) {
        return NaN;
      }
      return $byteLength ? $byteLength(ab) : ab.byteLength;
    };
  }
});

// ../../node_modules/deep-equal/index.js
var require_deep_equal = __commonJS({
  "../../node_modules/deep-equal/index.js"(exports, module) {
    "use strict";
    var assign = require_object();
    var callBound = require_callBound();
    var flags = require_regexp_prototype();
    var GetIntrinsic = require_get_intrinsic();
    var getIterator = require_es_get_iterator();
    var getSideChannel = require_side_channel();
    var is = require_object_is();
    var isArguments = require_is_arguments();
    var isArray = require_isarray();
    var isArrayBuffer = require_is_array_buffer();
    var isDate = require_is_date_object();
    var isRegex = require_is_regex();
    var isSharedArrayBuffer = require_is_shared_array_buffer();
    var objectKeys = require_object_keys();
    var whichBoxedPrimitive = require_which_boxed_primitive();
    var whichCollection = require_which_collection();
    var whichTypedArray = require_which_typed_array();
    var byteLength = require_array_buffer_byte_length();
    var sabByteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
    var $getTime = callBound("Date.prototype.getTime");
    var gPO = Object.getPrototypeOf;
    var $objToString = callBound("Object.prototype.toString");
    var $Set = GetIntrinsic("%Set%", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSize = callBound("Map.prototype.size", true);
    var $setAdd = callBound("Set.prototype.add", true);
    var $setDelete = callBound("Set.prototype.delete", true);
    var $setHas = callBound("Set.prototype.has", true);
    var $setSize = callBound("Set.prototype.size", true);
    function setHasEqualElement(set, val1, opts, channel) {
      var i = getIterator(set);
      var result;
      while ((result = i.next()) && !result.done) {
        if (internalDeepEqual(val1, result.value, opts, channel)) {
          $setDelete(set, result.value);
          return true;
        }
      }
      return false;
    }
    function findLooseMatchingPrimitives(prim) {
      if (typeof prim === "undefined") {
        return null;
      }
      if (typeof prim === "object") {
        return void 0;
      }
      if (typeof prim === "symbol") {
        return false;
      }
      if (typeof prim === "string" || typeof prim === "number") {
        return +prim === +prim;
      }
      return true;
    }
    function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) {
        return altValue;
      }
      var curB = $mapGet(b, altValue);
      var looseOpts = assign({}, opts, { strict: false });
      if (typeof curB === "undefined" && !$mapHas(b, altValue) || !internalDeepEqual(item, curB, looseOpts, channel)) {
        return false;
      }
      return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
    }
    function setMightHaveLoosePrim(a, b, prim) {
      var altValue = findLooseMatchingPrimitives(prim);
      if (altValue != null) {
        return altValue;
      }
      return $setHas(b, altValue) && !$setHas(a, altValue);
    }
    function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
      var i = getIterator(set);
      var result;
      var key2;
      while ((result = i.next()) && !result.done) {
        key2 = result.value;
        if (
          // eslint-disable-next-line no-use-before-define
          internalDeepEqual(key1, key2, opts, channel) && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)
        ) {
          $setDelete(set, key2);
          return true;
        }
      }
      return false;
    }
    function internalDeepEqual(actual, expected, options, channel) {
      var opts = options || {};
      if (opts.strict ? is(actual, expected) : actual === expected) {
        return true;
      }
      var actualBoxed = whichBoxedPrimitive(actual);
      var expectedBoxed = whichBoxedPrimitive(expected);
      if (actualBoxed !== expectedBoxed) {
        return false;
      }
      if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
        return opts.strict ? is(actual, expected) : actual == expected;
      }
      var hasActual = channel.has(actual);
      var hasExpected = channel.has(expected);
      var sentinel;
      if (hasActual && hasExpected) {
        if (channel.get(actual) === channel.get(expected)) {
          return true;
        }
      } else {
        sentinel = {};
      }
      if (!hasActual) {
        channel.set(actual, sentinel);
      }
      if (!hasExpected) {
        channel.set(expected, sentinel);
      }
      return objEquiv(actual, expected, opts, channel);
    }
    function isBuffer(x) {
      if (!x || typeof x !== "object" || typeof x.length !== "number") {
        return false;
      }
      if (typeof x.copy !== "function" || typeof x.slice !== "function") {
        return false;
      }
      if (x.length > 0 && typeof x[0] !== "number") {
        return false;
      }
      return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
    }
    function setEquiv(a, b, opts, channel) {
      if ($setSize(a) !== $setSize(b)) {
        return false;
      }
      var iA = getIterator(a);
      var iB = getIterator(b);
      var resultA;
      var resultB;
      var set;
      while ((resultA = iA.next()) && !resultA.done) {
        if (resultA.value && typeof resultA.value === "object") {
          if (!set) {
            set = new $Set();
          }
          $setAdd(set, resultA.value);
        } else if (!$setHas(b, resultA.value)) {
          if (opts.strict) {
            return false;
          }
          if (!setMightHaveLoosePrim(a, b, resultA.value)) {
            return false;
          }
          if (!set) {
            set = new $Set();
          }
          $setAdd(set, resultA.value);
        }
      }
      if (set) {
        while ((resultB = iB.next()) && !resultB.done) {
          if (resultB.value && typeof resultB.value === "object") {
            if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
              return false;
            }
          } else if (!opts.strict && !$setHas(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel)) {
            return false;
          }
        }
        return $setSize(set) === 0;
      }
      return true;
    }
    function mapEquiv(a, b, opts, channel) {
      if ($mapSize(a) !== $mapSize(b)) {
        return false;
      }
      var iA = getIterator(a);
      var iB = getIterator(b);
      var resultA;
      var resultB;
      var set;
      var key;
      var item1;
      var item2;
      while ((resultA = iA.next()) && !resultA.done) {
        key = resultA.value[0];
        item1 = resultA.value[1];
        if (key && typeof key === "object") {
          if (!set) {
            set = new $Set();
          }
          $setAdd(set, key);
        } else {
          item2 = $mapGet(b, key);
          if (typeof item2 === "undefined" && !$mapHas(b, key) || !internalDeepEqual(item1, item2, opts, channel)) {
            if (opts.strict) {
              return false;
            }
            if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) {
              return false;
            }
            if (!set) {
              set = new $Set();
            }
            $setAdd(set, key);
          }
        }
      }
      if (set) {
        while ((resultB = iB.next()) && !resultB.done) {
          key = resultB.value[0];
          item2 = resultB.value[1];
          if (key && typeof key === "object") {
            if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {
              return false;
            }
          } else if (!opts.strict && (!a.has(key) || !internalDeepEqual($mapGet(a, key), item2, opts, channel)) && !mapHasEqualEntry(set, a, key, item2, assign({}, opts, { strict: false }), channel)) {
            return false;
          }
        }
        return $setSize(set) === 0;
      }
      return true;
    }
    function objEquiv(a, b, opts, channel) {
      var i, key;
      if (typeof a !== typeof b) {
        return false;
      }
      if (a == null || b == null) {
        return false;
      }
      if ($objToString(a) !== $objToString(b)) {
        return false;
      }
      if (isArguments(a) !== isArguments(b)) {
        return false;
      }
      var aIsArray = isArray(a);
      var bIsArray = isArray(b);
      if (aIsArray !== bIsArray) {
        return false;
      }
      var aIsError = a instanceof Error;
      var bIsError = b instanceof Error;
      if (aIsError !== bIsError) {
        return false;
      }
      if (aIsError || bIsError) {
        if (a.name !== b.name || a.message !== b.message) {
          return false;
        }
      }
      var aIsRegex = isRegex(a);
      var bIsRegex = isRegex(b);
      if (aIsRegex !== bIsRegex) {
        return false;
      }
      if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) {
        return false;
      }
      var aIsDate = isDate(a);
      var bIsDate = isDate(b);
      if (aIsDate !== bIsDate) {
        return false;
      }
      if (aIsDate || bIsDate) {
        if ($getTime(a) !== $getTime(b)) {
          return false;
        }
      }
      if (opts.strict && gPO && gPO(a) !== gPO(b)) {
        return false;
      }
      var aWhich = whichTypedArray(a);
      var bWhich = whichTypedArray(b);
      if (aWhich !== bWhich) {
        return false;
      }
      if (aWhich || bWhich) {
        if (a.length !== b.length) {
          return false;
        }
        for (i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      }
      var aIsBuffer = isBuffer(a);
      var bIsBuffer = isBuffer(b);
      if (aIsBuffer !== bIsBuffer) {
        return false;
      }
      if (aIsBuffer || bIsBuffer) {
        if (a.length !== b.length) {
          return false;
        }
        for (i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      }
      var aIsArrayBuffer = isArrayBuffer(a);
      var bIsArrayBuffer = isArrayBuffer(b);
      if (aIsArrayBuffer !== bIsArrayBuffer) {
        return false;
      }
      if (aIsArrayBuffer || bIsArrayBuffer) {
        if (byteLength(a) !== byteLength(b)) {
          return false;
        }
        return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
      }
      var aIsSAB = isSharedArrayBuffer(a);
      var bIsSAB = isSharedArrayBuffer(b);
      if (aIsSAB !== bIsSAB) {
        return false;
      }
      if (aIsSAB || bIsSAB) {
        if (sabByteLength(a) !== sabByteLength(b)) {
          return false;
        }
        return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
      }
      if (typeof a !== typeof b) {
        return false;
      }
      var ka = objectKeys(a);
      var kb = objectKeys(b);
      if (ka.length !== kb.length) {
        return false;
      }
      ka.sort();
      kb.sort();
      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i]) {
          return false;
        }
      }
      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];
        if (!internalDeepEqual(a[key], b[key], opts, channel)) {
          return false;
        }
      }
      var aCollection = whichCollection(a);
      var bCollection = whichCollection(b);
      if (aCollection !== bCollection) {
        return false;
      }
      if (aCollection === "Set" || bCollection === "Set") {
        return setEquiv(a, b, opts, channel);
      }
      if (aCollection === "Map") {
        return mapEquiv(a, b, opts, channel);
      }
      return true;
    }
    module.exports = function deepEqual(a, b, opts) {
      return internalDeepEqual(a, b, opts, getSideChannel());
    };
  }
});

// ../../node_modules/aria-query/lib/elementRoleMap.js
var require_elementRoleMap = __commonJS({
  "../../node_modules/aria-query/lib/elementRoleMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _deepEqual = _interopRequireDefault(require_deep_equal());
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    var _rolesMap = _interopRequireDefault(require_rolesMap());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _slicedToArray(arr, i2) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArrayLimit(arr, i2) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i2 && _arr.length === i2)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i2 = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i2 >= o.length)
              return { done: true };
            return { done: false, value: o[i2++] };
          }, e: function e(_e2) {
            throw _e2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e3) {
        didErr = true;
        err = _e3;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
        arr2[i2] = arr[i2];
      }
      return arr2;
    }
    var elementRoles = [];
    var keys = _rolesMap.default.keys();
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      role = _rolesMap.default.get(key);
      if (role) {
        concepts = [].concat(role.baseConcepts, role.relatedConcepts);
        for (k = 0; k < concepts.length; k++) {
          relation = concepts[k];
          if (relation.module === "HTML") {
            concept = relation.concept;
            if (concept) {
              (function() {
                var conceptStr = JSON.stringify(concept);
                var elementRoleRelation = elementRoles.find(function(relation2) {
                  return JSON.stringify(relation2[0]) === conceptStr;
                });
                var roles = void 0;
                if (elementRoleRelation) {
                  roles = elementRoleRelation[1];
                } else {
                  roles = [];
                }
                var isUnique = true;
                for (var _i = 0; _i < roles.length; _i++) {
                  if (roles[_i] === key) {
                    isUnique = false;
                    break;
                  }
                }
                if (isUnique) {
                  roles.push(key);
                }
                elementRoles.push([concept, roles]);
              })();
            }
          }
        }
      }
    }
    var key;
    var role;
    var concepts;
    var relation;
    var concept;
    var k;
    var i;
    var elementRoleMap = {
      entries: function entries() {
        return elementRoles;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _iterator = _createForOfIteratorHelper(elementRoles), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), _key = _step$value[0], values = _step$value[1];
            fn.call(thisArg, values, _key, elementRoles);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      get: function get(key2) {
        var item = elementRoles.find(function(tuple) {
          return (0, _deepEqual.default)(key2, tuple[0]);
        });
        return item && item[1];
      },
      has: function has(key2) {
        return !!elementRoleMap.get(key2);
      },
      keys: function keys2() {
        return elementRoles.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
          return key2;
        });
      },
      values: function values() {
        return elementRoles.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    var _default = (0, _iterationDecorator.default)(elementRoleMap, elementRoleMap.entries());
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/roleElementMap.js
var require_roleElementMap = __commonJS({
  "../../node_modules/aria-query/lib/roleElementMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    var _rolesMap = _interopRequireDefault(require_rolesMap());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _slicedToArray(arr, i2) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArrayLimit(arr, i2) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i2 && _arr.length === i2)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i2 = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i2 >= o.length)
              return { done: true };
            return { done: false, value: o[i2++] };
          }, e: function e(_e2) {
            throw _e2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e3) {
        didErr = true;
        err = _e3;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
        arr2[i2] = arr[i2];
      }
      return arr2;
    }
    var roleElement = [];
    var keys = _rolesMap.default.keys();
    var _loop = function _loop2(i2) {
      var key = keys[i2];
      var role = _rolesMap.default.get(key);
      if (role) {
        var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
        for (var k = 0; k < concepts.length; k++) {
          var relation = concepts[k];
          if (relation.module === "HTML") {
            var concept = relation.concept;
            if (concept) {
              var roleElementRelation = roleElement.find(function(item) {
                return item[0] === key;
              });
              var relationConcepts = void 0;
              if (roleElementRelation) {
                relationConcepts = roleElementRelation[1];
              } else {
                relationConcepts = [];
              }
              relationConcepts.push(concept);
              roleElement.push([key, relationConcepts]);
            }
          }
        }
      }
    };
    for (i = 0; i < keys.length; i++) {
      _loop(i);
    }
    var i;
    var roleElementMap = {
      entries: function entries() {
        return roleElement;
      },
      forEach: function forEach(fn) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _iterator = _createForOfIteratorHelper(roleElement), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values = _step$value[1];
            fn.call(thisArg, values, key, roleElement);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      get: function get(key) {
        var item = roleElement.find(function(tuple) {
          return tuple[0] === key ? true : false;
        });
        return item && item[1];
      },
      has: function has(key) {
        return !!roleElementMap.get(key);
      },
      keys: function keys2() {
        return roleElement.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
          return key;
        });
      },
      values: function values() {
        return roleElement.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    var _default = (0, _iterationDecorator.default)(roleElementMap, roleElementMap.entries());
    exports.default = _default;
  }
});

// ../../node_modules/aria-query/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/aria-query/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.roles = exports.roleElements = exports.elementRoles = exports.dom = exports.aria = void 0;
    var _ariaPropsMap = _interopRequireDefault(require_ariaPropsMap());
    var _domMap = _interopRequireDefault(require_domMap());
    var _rolesMap = _interopRequireDefault(require_rolesMap());
    var _elementRoleMap = _interopRequireDefault(require_elementRoleMap());
    var _roleElementMap = _interopRequireDefault(require_roleElementMap());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var aria = _ariaPropsMap.default;
    exports.aria = aria;
    var dom2 = _domMap.default;
    exports.dom = dom2;
    var roles = _rolesMap.default;
    exports.roles = roles;
    var elementRoles = _elementRoleMap.default;
    exports.elementRoles = elementRoles;
    var roleElements = _roleElementMap.default;
    exports.roleElements = roleElements;
  }
});

// ../../node_modules/@testing-library/dom/dist/role-helpers.js
var require_role_helpers = __commonJS({
  "../../node_modules/@testing-library/dom/dist/role-helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.computeAriaChecked = computeAriaChecked;
    exports.computeAriaCurrent = computeAriaCurrent;
    exports.computeAriaExpanded = computeAriaExpanded;
    exports.computeAriaPressed = computeAriaPressed;
    exports.computeAriaSelected = computeAriaSelected;
    exports.computeHeadingLevel = computeHeadingLevel;
    exports.getImplicitAriaRoles = getImplicitAriaRoles;
    exports.getRoles = getRoles;
    exports.isInaccessible = isInaccessible;
    exports.isSubtreeInaccessible = isSubtreeInaccessible;
    exports.logRoles = void 0;
    exports.prettyRoles = prettyRoles;
    var _ariaQuery = require_lib();
    var _domAccessibilityApi = require_dist();
    var _prettyDom = require_pretty_dom();
    var _config = require_config();
    var elementRoleList = buildElementRoleList(_ariaQuery.elementRoles);
    function isSubtreeInaccessible(element) {
      if (element.hidden === true) {
        return true;
      }
      if (element.getAttribute("aria-hidden") === "true") {
        return true;
      }
      const window2 = element.ownerDocument.defaultView;
      if (window2.getComputedStyle(element).display === "none") {
        return true;
      }
      return false;
    }
    function isInaccessible(element, options = {}) {
      const {
        isSubtreeInaccessible: isSubtreeInaccessibleImpl = isSubtreeInaccessible
      } = options;
      const window2 = element.ownerDocument.defaultView;
      if (window2.getComputedStyle(element).visibility === "hidden") {
        return true;
      }
      let currentElement = element;
      while (currentElement) {
        if (isSubtreeInaccessibleImpl(currentElement)) {
          return true;
        }
        currentElement = currentElement.parentElement;
      }
      return false;
    }
    function getImplicitAriaRoles(currentNode) {
      for (const {
        match,
        roles
      } of elementRoleList) {
        if (match(currentNode)) {
          return [...roles];
        }
      }
      return [];
    }
    function buildElementRoleList(elementRolesMap) {
      function makeElementSelector({
        name,
        attributes
      }) {
        return `${name}${attributes.map(({
          name: attributeName,
          value,
          constraints = []
        }) => {
          const shouldNotExist = constraints.indexOf("undefined") !== -1;
          if (shouldNotExist) {
            return `:not([${attributeName}])`;
          } else if (value) {
            return `[${attributeName}="${value}"]`;
          } else {
            return `[${attributeName}]`;
          }
        }).join("")}`;
      }
      function getSelectorSpecificity({
        attributes = []
      }) {
        return attributes.length;
      }
      function bySelectorSpecificity({
        specificity: leftSpecificity
      }, {
        specificity: rightSpecificity
      }) {
        return rightSpecificity - leftSpecificity;
      }
      function match(element) {
        let {
          attributes = []
        } = element;
        const typeTextIndex = attributes.findIndex((attribute) => attribute.value && attribute.name === "type" && attribute.value === "text");
        if (typeTextIndex >= 0) {
          attributes = [...attributes.slice(0, typeTextIndex), ...attributes.slice(typeTextIndex + 1)];
        }
        const selector = makeElementSelector({
          ...element,
          attributes
        });
        return (node) => {
          if (typeTextIndex >= 0 && node.type !== "text") {
            return false;
          }
          return node.matches(selector);
        };
      }
      let result = [];
      for (const [element, roles] of elementRolesMap.entries()) {
        result = [...result, {
          match: match(element),
          roles: Array.from(roles),
          specificity: getSelectorSpecificity(element)
        }];
      }
      return result.sort(bySelectorSpecificity);
    }
    function getRoles(container, {
      hidden = false
    } = {}) {
      function flattenDOM(node) {
        return [node, ...Array.from(node.children).reduce((acc, child) => [...acc, ...flattenDOM(child)], [])];
      }
      return flattenDOM(container).filter((element) => {
        return hidden === false ? isInaccessible(element) === false : true;
      }).reduce((acc, node) => {
        let roles = [];
        if (node.hasAttribute("role")) {
          roles = node.getAttribute("role").split(" ").slice(0, 1);
        } else {
          roles = getImplicitAriaRoles(node);
        }
        return roles.reduce((rolesAcc, role) => Array.isArray(rolesAcc[role]) ? {
          ...rolesAcc,
          [role]: [...rolesAcc[role], node]
        } : {
          ...rolesAcc,
          [role]: [node]
        }, acc);
      }, {});
    }
    function prettyRoles(dom2, {
      hidden,
      includeDescription
    }) {
      const roles = getRoles(dom2, {
        hidden
      });
      return Object.entries(roles).filter(([role]) => role !== "generic").map(([role, elements]) => {
        const delimiterBar = "-".repeat(50);
        const elementsString = elements.map((el) => {
          const nameString = `Name "${(0, _domAccessibilityApi.computeAccessibleName)(el, {
            computedStyleSupportsPseudoElements: (0, _config.getConfig)().computedStyleSupportsPseudoElements
          })}":
`;
          const domString = (0, _prettyDom.prettyDOM)(el.cloneNode(false));
          if (includeDescription) {
            const descriptionString = `Description "${(0, _domAccessibilityApi.computeAccessibleDescription)(el, {
              computedStyleSupportsPseudoElements: (0, _config.getConfig)().computedStyleSupportsPseudoElements
            })}":
`;
            return `${nameString}${descriptionString}${domString}`;
          }
          return `${nameString}${domString}`;
        }).join("\n\n");
        return `${role}:

${elementsString}

${delimiterBar}`;
      }).join("\n");
    }
    var logRoles = (dom2, {
      hidden = false
    } = {}) => console.log(prettyRoles(dom2, {
      hidden
    }));
    exports.logRoles = logRoles;
    function computeAriaSelected(element) {
      if (element.tagName === "OPTION") {
        return element.selected;
      }
      return checkBooleanAttribute(element, "aria-selected");
    }
    function computeAriaChecked(element) {
      if ("indeterminate" in element && element.indeterminate) {
        return void 0;
      }
      if ("checked" in element) {
        return element.checked;
      }
      return checkBooleanAttribute(element, "aria-checked");
    }
    function computeAriaPressed(element) {
      return checkBooleanAttribute(element, "aria-pressed");
    }
    function computeAriaCurrent(element) {
      var _ref, _checkBooleanAttribut;
      return (_ref = (_checkBooleanAttribut = checkBooleanAttribute(element, "aria-current")) != null ? _checkBooleanAttribut : element.getAttribute("aria-current")) != null ? _ref : false;
    }
    function computeAriaExpanded(element) {
      return checkBooleanAttribute(element, "aria-expanded");
    }
    function checkBooleanAttribute(element, attribute) {
      const attributeValue = element.getAttribute(attribute);
      if (attributeValue === "true") {
        return true;
      }
      if (attributeValue === "false") {
        return false;
      }
      return void 0;
    }
    function computeHeadingLevel(element) {
      const implicitHeadingLevels = {
        H1: 1,
        H2: 2,
        H3: 3,
        H4: 4,
        H5: 5,
        H6: 6
      };
      const ariaLevelAttribute = element.getAttribute("aria-level") && Number(element.getAttribute("aria-level"));
      return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/suggestions.js
var require_suggestions = __commonJS({
  "../../node_modules/@testing-library/dom/dist/suggestions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getSuggestedQuery = getSuggestedQuery;
    var _domAccessibilityApi = require_dist();
    var _matches = require_matches();
    var _getNodeText = require_get_node_text();
    var _config = require_config();
    var _roleHelpers = require_role_helpers();
    var _labelHelpers = require_label_helpers();
    var normalize = (0, _matches.getDefaultNormalizer)();
    function escapeRegExp(string) {
      return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
    }
    function getRegExpMatcher(string) {
      return new RegExp(escapeRegExp(string.toLowerCase()), "i");
    }
    function makeSuggestion(queryName, element, content, {
      variant,
      name
    }) {
      let warning = "";
      const queryOptions = {};
      const queryArgs = [["Role", "TestId"].includes(queryName) ? content : getRegExpMatcher(content)];
      if (name) {
        queryOptions.name = getRegExpMatcher(name);
      }
      if (queryName === "Role" && (0, _roleHelpers.isInaccessible)(element)) {
        queryOptions.hidden = true;
        warning = `Element is inaccessible. This means that the element and all its children are invisible to screen readers.
    If you are using the aria-hidden prop, make sure this is the right choice for your case.
    `;
      }
      if (Object.keys(queryOptions).length > 0) {
        queryArgs.push(queryOptions);
      }
      const queryMethod = `${variant}By${queryName}`;
      return {
        queryName,
        queryMethod,
        queryArgs,
        variant,
        warning,
        toString() {
          if (warning) {
            console.warn(warning);
          }
          let [text, options] = queryArgs;
          text = typeof text === "string" ? `'${text}'` : text;
          options = options ? `, { ${Object.entries(options).map(([k, v]) => `${k}: ${v}`).join(", ")} }` : "";
          return `${queryMethod}(${text}${options})`;
        }
      };
    }
    function canSuggest(currentMethod, requestedMethod, data) {
      return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
    }
    function getSuggestedQuery(element, variant = "get", method) {
      var _element$getAttribute, _getImplicitAriaRoles;
      if (element.matches((0, _config.getConfig)().defaultIgnore)) {
        return void 0;
      }
      const role = (_element$getAttribute = element.getAttribute("role")) != null ? _element$getAttribute : (_getImplicitAriaRoles = (0, _roleHelpers.getImplicitAriaRoles)(element)) == null ? void 0 : _getImplicitAriaRoles[0];
      if (role !== "generic" && canSuggest("Role", method, role)) {
        return makeSuggestion("Role", element, role, {
          variant,
          name: (0, _domAccessibilityApi.computeAccessibleName)(element, {
            computedStyleSupportsPseudoElements: (0, _config.getConfig)().computedStyleSupportsPseudoElements
          })
        });
      }
      const labelText = (0, _labelHelpers.getLabels)(document, element).map((label) => label.content).join(" ");
      if (canSuggest("LabelText", method, labelText)) {
        return makeSuggestion("LabelText", element, labelText, {
          variant
        });
      }
      const placeholderText = element.getAttribute("placeholder");
      if (canSuggest("PlaceholderText", method, placeholderText)) {
        return makeSuggestion("PlaceholderText", element, placeholderText, {
          variant
        });
      }
      const textContent = normalize((0, _getNodeText.getNodeText)(element));
      if (canSuggest("Text", method, textContent)) {
        return makeSuggestion("Text", element, textContent, {
          variant
        });
      }
      if (canSuggest("DisplayValue", method, element.value)) {
        return makeSuggestion("DisplayValue", element, normalize(element.value), {
          variant
        });
      }
      const alt = element.getAttribute("alt");
      if (canSuggest("AltText", method, alt)) {
        return makeSuggestion("AltText", element, alt, {
          variant
        });
      }
      const title = element.getAttribute("title");
      if (canSuggest("Title", method, title)) {
        return makeSuggestion("Title", element, title, {
          variant
        });
      }
      const testId = element.getAttribute((0, _config.getConfig)().testIdAttribute);
      if (canSuggest("TestId", method, testId)) {
        return makeSuggestion("TestId", element, testId, {
          variant
        });
      }
      return void 0;
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/wait-for.js
var require_wait_for = __commonJS({
  "../../node_modules/@testing-library/dom/dist/wait-for.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.waitFor = waitForWrapper;
    var _helpers = require_helpers();
    var _config = require_config();
    function copyStackTrace(target, source) {
      target.stack = source.stack.replace(source.message, target.message);
    }
    function waitFor(callback, {
      container = (0, _helpers.getDocument)(),
      timeout = (0, _config.getConfig)().asyncUtilTimeout,
      showOriginalStackTrace = (0, _config.getConfig)().showOriginalStackTrace,
      stackTraceError,
      interval = 50,
      onTimeout = (error) => {
        error.message = (0, _config.getConfig)().getElementError(error.message, container).message;
        return error;
      },
      mutationObserverOptions = {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true
      }
    }) {
      if (typeof callback !== "function") {
        throw new TypeError("Received `callback` arg must be a function");
      }
      return new Promise(async (resolve, reject) => {
        let lastError, intervalId, observer;
        let finished = false;
        let promiseStatus = "idle";
        const overallTimeoutTimer = setTimeout(handleTimeout, timeout);
        const usingJestFakeTimers = (0, _helpers.jestFakeTimersAreEnabled)();
        if (usingJestFakeTimers) {
          const {
            unstable_advanceTimersWrapper: advanceTimersWrapper
          } = (0, _config.getConfig)();
          checkCallback();
          while (!finished) {
            if (!(0, _helpers.jestFakeTimersAreEnabled)()) {
              const error = new Error(`Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830`);
              if (!showOriginalStackTrace)
                copyStackTrace(error, stackTraceError);
              reject(error);
              return;
            }
            advanceTimersWrapper(() => {
              jest.advanceTimersByTime(interval);
            });
            checkCallback();
            if (finished) {
              break;
            }
            await advanceTimersWrapper(async () => {
              await new Promise((r) => {
                setTimeout(r, 0);
                jest.advanceTimersByTime(0);
              });
            });
          }
        } else {
          try {
            (0, _helpers.checkContainerType)(container);
          } catch (e) {
            reject(e);
            return;
          }
          intervalId = setInterval(checkRealTimersCallback, interval);
          const {
            MutationObserver
          } = (0, _helpers.getWindowFromNode)(container);
          observer = new MutationObserver(checkRealTimersCallback);
          observer.observe(container, mutationObserverOptions);
          checkCallback();
        }
        function onDone(error, result) {
          finished = true;
          clearTimeout(overallTimeoutTimer);
          if (!usingJestFakeTimers) {
            clearInterval(intervalId);
            observer.disconnect();
          }
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
        function checkRealTimersCallback() {
          if ((0, _helpers.jestFakeTimersAreEnabled)()) {
            const error = new Error(`Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830`);
            if (!showOriginalStackTrace)
              copyStackTrace(error, stackTraceError);
            return reject(error);
          } else {
            return checkCallback();
          }
        }
        function checkCallback() {
          if (promiseStatus === "pending")
            return;
          try {
            const result = (0, _config.runWithExpensiveErrorDiagnosticsDisabled)(callback);
            if (typeof (result == null ? void 0 : result.then) === "function") {
              promiseStatus = "pending";
              result.then((resolvedValue) => {
                promiseStatus = "resolved";
                onDone(null, resolvedValue);
              }, (rejectedValue) => {
                promiseStatus = "rejected";
                lastError = rejectedValue;
              });
            } else {
              onDone(null, result);
            }
          } catch (error) {
            lastError = error;
          }
        }
        function handleTimeout() {
          let error;
          if (lastError) {
            error = lastError;
            if (!showOriginalStackTrace && error.name === "TestingLibraryElementError") {
              copyStackTrace(error, stackTraceError);
            }
          } else {
            error = new Error("Timed out in waitFor.");
            if (!showOriginalStackTrace) {
              copyStackTrace(error, stackTraceError);
            }
          }
          onDone(onTimeout(error), null);
        }
      });
    }
    function waitForWrapper(callback, options) {
      const stackTraceError = new Error("STACK_TRACE_MESSAGE");
      return (0, _config.getConfig)().asyncWrapper(() => waitFor(callback, {
        stackTraceError,
        ...options
      }));
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/query-helpers.js
var require_query_helpers = __commonJS({
  "../../node_modules/@testing-library/dom/dist/query-helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.buildQueries = buildQueries;
    exports.getElementError = getElementError;
    exports.getMultipleElementsFoundError = getMultipleElementsFoundError;
    exports.makeFindQuery = makeFindQuery;
    exports.makeGetAllQuery = makeGetAllQuery;
    exports.makeSingleQuery = makeSingleQuery;
    exports.queryAllByAttribute = queryAllByAttribute;
    exports.queryByAttribute = queryByAttribute;
    exports.wrapSingleQueryWithSuggestion = exports.wrapAllByQueryWithSuggestion = void 0;
    var _suggestions = require_suggestions();
    var _matches = require_matches();
    var _waitFor = require_wait_for();
    var _config = require_config();
    function getElementError(message, container) {
      return (0, _config.getConfig)().getElementError(message, container);
    }
    function getMultipleElementsFoundError(message, container) {
      return getElementError(`${message}

(If this is intentional, then use the \`*AllBy*\` variant of the query (like \`queryAllByText\`, \`getAllByText\`, or \`findAllByText\`)).`, container);
    }
    function queryAllByAttribute(attribute, container, text, {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = {}) {
      const matcher = exact ? _matches.matches : _matches.fuzzyMatches;
      const matchNormalizer = (0, _matches.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      return Array.from(container.querySelectorAll(`[${attribute}]`)).filter((node) => matcher(node.getAttribute(attribute), node, text, matchNormalizer));
    }
    function queryByAttribute(attribute, container, text, options) {
      const els = queryAllByAttribute(attribute, container, text, options);
      if (els.length > 1) {
        throw getMultipleElementsFoundError(`Found multiple elements by [${attribute}=${text}]`, container);
      }
      return els[0] || null;
    }
    function makeSingleQuery(allQuery, getMultipleError) {
      return (container, ...args) => {
        const els = allQuery(container, ...args);
        if (els.length > 1) {
          const elementStrings = els.map((element) => getElementError(null, element).message).join("\n\n");
          throw getMultipleElementsFoundError(`${getMultipleError(container, ...args)}

Here are the matching elements:

${elementStrings}`, container);
        }
        return els[0] || null;
      };
    }
    function getSuggestionError(suggestion, container) {
      return (0, _config.getConfig)().getElementError(`A better query is available, try this:
${suggestion.toString()}
`, container);
    }
    function makeGetAllQuery(allQuery, getMissingError) {
      return (container, ...args) => {
        const els = allQuery(container, ...args);
        if (!els.length) {
          throw (0, _config.getConfig)().getElementError(getMissingError(container, ...args), container);
        }
        return els;
      };
    }
    function makeFindQuery(getter) {
      return (container, text, options, waitForOptions) => {
        return (0, _waitFor.waitFor)(() => {
          return getter(container, text, options);
        }, {
          container,
          ...waitForOptions
        });
      };
    }
    var wrapSingleQueryWithSuggestion = (query, queryAllByName, variant) => (container, ...args) => {
      const element = query(container, ...args);
      const [{
        suggest = (0, _config.getConfig)().throwSuggestions
      } = {}] = args.slice(-1);
      if (element && suggest) {
        const suggestion = (0, _suggestions.getSuggestedQuery)(element, variant);
        if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
          throw getSuggestionError(suggestion.toString(), container);
        }
      }
      return element;
    };
    exports.wrapSingleQueryWithSuggestion = wrapSingleQueryWithSuggestion;
    var wrapAllByQueryWithSuggestion = (query, queryAllByName, variant) => (container, ...args) => {
      const els = query(container, ...args);
      const [{
        suggest = (0, _config.getConfig)().throwSuggestions
      } = {}] = args.slice(-1);
      if (els.length && suggest) {
        const uniqueSuggestionMessages = [...new Set(els.map((element) => {
          var _getSuggestedQuery;
          return (_getSuggestedQuery = (0, _suggestions.getSuggestedQuery)(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
        }))];
        if (
          // only want to suggest if all the els have the same suggestion.
          uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: Can this be null at runtime?
            (0, _suggestions.getSuggestedQuery)(els[0], variant).queryName
          )
        ) {
          throw getSuggestionError(uniqueSuggestionMessages[0], container);
        }
      }
      return els;
    };
    exports.wrapAllByQueryWithSuggestion = wrapAllByQueryWithSuggestion;
    function buildQueries(queryAllBy, getMultipleError, getMissingError) {
      const queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError), queryAllBy.name, "query");
      const getAllBy = makeGetAllQuery(queryAllBy, getMissingError);
      const getBy = makeSingleQuery(getAllBy, getMultipleError);
      const getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "get");
      const getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace("query", "get"), "getAll");
      const findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, "findAll"));
      const findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "find"));
      return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/all-utils.js
var require_all_utils = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/all-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _matches = require_matches();
    Object.keys(_matches).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _matches[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _matches[key];
        }
      });
    });
    var _getNodeText = require_get_node_text();
    Object.keys(_getNodeText).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _getNodeText[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _getNodeText[key];
        }
      });
    });
    var _queryHelpers = require_query_helpers();
    Object.keys(_queryHelpers).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _queryHelpers[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _queryHelpers[key];
        }
      });
    });
    var _config = require_config();
    Object.keys(_config).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _config[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _config[key];
        }
      });
    });
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/label-text.js
var require_label_text = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/label-text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByLabelText = exports.queryAllByLabelText = exports.getByLabelText = exports.getAllByLabelText = exports.findByLabelText = exports.findAllByLabelText = void 0;
    var _config = require_config();
    var _helpers = require_helpers();
    var _labelHelpers = require_label_helpers();
    var _allUtils = require_all_utils();
    function queryAllLabels(container) {
      return Array.from(container.querySelectorAll("label,input")).map((node) => {
        return {
          node,
          textToMatch: (0, _labelHelpers.getLabelContent)(node)
        };
      }).filter(({
        textToMatch
      }) => textToMatch !== null);
    }
    var queryAllLabelsByText = (container, text, {
      exact = true,
      trim,
      collapseWhitespace,
      normalizer
    } = {}) => {
      const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
      const matchNormalizer = (0, _allUtils.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      const textToMatchByLabels = queryAllLabels(container);
      return textToMatchByLabels.filter(({
        node,
        textToMatch
      }) => matcher(textToMatch, node, text, matchNormalizer)).map(({
        node
      }) => node);
    };
    var queryAllByLabelText = (container, text, {
      selector = "*",
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = {}) => {
      (0, _helpers.checkContainerType)(container);
      const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
      const matchNormalizer = (0, _allUtils.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      const matchingLabelledElements = Array.from(container.querySelectorAll("*")).filter((element) => {
        return (0, _labelHelpers.getRealLabels)(element).length || element.hasAttribute("aria-labelledby");
      }).reduce((labelledElements, labelledElement) => {
        const labelList = (0, _labelHelpers.getLabels)(container, labelledElement, {
          selector
        });
        labelList.filter((label) => Boolean(label.formControl)).forEach((label) => {
          if (matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl)
            labelledElements.push(label.formControl);
        });
        const labelsValue = labelList.filter((label) => Boolean(label.content)).map((label) => label.content);
        if (matcher(labelsValue.join(" "), labelledElement, text, matchNormalizer))
          labelledElements.push(labelledElement);
        if (labelsValue.length > 1) {
          labelsValue.forEach((labelValue, index) => {
            if (matcher(labelValue, labelledElement, text, matchNormalizer))
              labelledElements.push(labelledElement);
            const labelsFiltered = [...labelsValue];
            labelsFiltered.splice(index, 1);
            if (labelsFiltered.length > 1) {
              if (matcher(labelsFiltered.join(" "), labelledElement, text, matchNormalizer))
                labelledElements.push(labelledElement);
            }
          });
        }
        return labelledElements;
      }, []).concat((0, _allUtils.queryAllByAttribute)("aria-label", container, text, {
        exact,
        normalizer: matchNormalizer
      }));
      return Array.from(new Set(matchingLabelledElements)).filter((element) => element.matches(selector));
    };
    var getAllByLabelText = (container, text, ...rest) => {
      const els = queryAllByLabelText(container, text, ...rest);
      if (!els.length) {
        const labels = queryAllLabelsByText(container, text, ...rest);
        if (labels.length) {
          const tagNames = labels.map((label) => getTagNameOfElementAssociatedWithLabelViaFor(container, label)).filter((tagName) => !!tagName);
          if (tagNames.length) {
            throw (0, _config.getConfig)().getElementError(tagNames.map((tagName) => `Found a label with the text of: ${text}, however the element associated with this label (<${tagName} />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <${tagName} />, you can use aria-label or aria-labelledby instead.`).join("\n\n"), container);
          } else {
            throw (0, _config.getConfig)().getElementError(`Found a label with the text of: ${text}, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, container);
          }
        } else {
          throw (0, _config.getConfig)().getElementError(`Unable to find a label with the text of: ${text}`, container);
        }
      }
      return els;
    };
    function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
      const htmlFor = label.getAttribute("for");
      if (!htmlFor) {
        return null;
      }
      const element = container.querySelector(`[id="${htmlFor}"]`);
      return element ? element.tagName.toLowerCase() : null;
    }
    var getMultipleError = (c, text) => `Found multiple elements with the text of: ${text}`;
    var queryByLabelText = (0, _allUtils.wrapSingleQueryWithSuggestion)((0, _allUtils.makeSingleQuery)(queryAllByLabelText, getMultipleError), queryAllByLabelText.name, "query");
    exports.queryByLabelText = queryByLabelText;
    var getByLabelText = (0, _allUtils.makeSingleQuery)(getAllByLabelText, getMultipleError);
    var findAllByLabelText = (0, _allUtils.makeFindQuery)((0, _allUtils.wrapAllByQueryWithSuggestion)(getAllByLabelText, getAllByLabelText.name, "findAll"));
    exports.findAllByLabelText = findAllByLabelText;
    var findByLabelText = (0, _allUtils.makeFindQuery)((0, _allUtils.wrapSingleQueryWithSuggestion)(getByLabelText, getAllByLabelText.name, "find"));
    exports.findByLabelText = findByLabelText;
    var getAllByLabelTextWithSuggestions = (0, _allUtils.wrapAllByQueryWithSuggestion)(getAllByLabelText, getAllByLabelText.name, "getAll");
    exports.getAllByLabelText = getAllByLabelTextWithSuggestions;
    var getByLabelTextWithSuggestions = (0, _allUtils.wrapSingleQueryWithSuggestion)(getByLabelText, getAllByLabelText.name, "get");
    exports.getByLabelText = getByLabelTextWithSuggestions;
    var queryAllByLabelTextWithSuggestions = (0, _allUtils.wrapAllByQueryWithSuggestion)(queryAllByLabelText, queryAllByLabelText.name, "queryAll");
    exports.queryAllByLabelText = queryAllByLabelTextWithSuggestions;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/placeholder-text.js
var require_placeholder_text = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/placeholder-text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByPlaceholderText = exports.queryAllByPlaceholderText = exports.getByPlaceholderText = exports.getAllByPlaceholderText = exports.findByPlaceholderText = exports.findAllByPlaceholderText = void 0;
    var _queryHelpers = require_query_helpers();
    var _helpers = require_helpers();
    var _allUtils = require_all_utils();
    var queryAllByPlaceholderText = (...args) => {
      (0, _helpers.checkContainerType)(args[0]);
      return (0, _allUtils.queryAllByAttribute)("placeholder", ...args);
    };
    var getMultipleError = (c, text) => `Found multiple elements with the placeholder text of: ${text}`;
    var getMissingError = (c, text) => `Unable to find an element with the placeholder text of: ${text}`;
    var queryAllByPlaceholderTextWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByPlaceholderText, queryAllByPlaceholderText.name, "queryAll");
    exports.queryAllByPlaceholderText = queryAllByPlaceholderTextWithSuggestions;
    var [queryByPlaceholderText, getAllByPlaceholderText, getByPlaceholderText, findAllByPlaceholderText, findByPlaceholderText] = (0, _allUtils.buildQueries)(queryAllByPlaceholderText, getMultipleError, getMissingError);
    exports.findByPlaceholderText = findByPlaceholderText;
    exports.findAllByPlaceholderText = findAllByPlaceholderText;
    exports.getByPlaceholderText = getByPlaceholderText;
    exports.getAllByPlaceholderText = getAllByPlaceholderText;
    exports.queryByPlaceholderText = queryByPlaceholderText;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/text.js
var require_text = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByText = exports.queryAllByText = exports.getByText = exports.getAllByText = exports.findByText = exports.findAllByText = void 0;
    var _queryHelpers = require_query_helpers();
    var _helpers = require_helpers();
    var _allUtils = require_all_utils();
    var queryAllByText = (container, text, {
      selector = "*",
      exact = true,
      collapseWhitespace,
      trim,
      ignore = (0, _allUtils.getConfig)().defaultIgnore,
      normalizer
    } = {}) => {
      (0, _helpers.checkContainerType)(container);
      const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
      const matchNormalizer = (0, _allUtils.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      let baseArray = [];
      if (typeof container.matches === "function" && container.matches(selector)) {
        baseArray = [container];
      }
      return [...baseArray, ...Array.from(container.querySelectorAll(selector))].filter((node) => !ignore || !node.matches(ignore)).filter((node) => matcher((0, _allUtils.getNodeText)(node), node, text, matchNormalizer));
    };
    var getMultipleError = (c, text) => `Found multiple elements with the text: ${text}`;
    var getMissingError = (c, text, options = {}) => {
      const {
        collapseWhitespace,
        trim,
        normalizer,
        selector
      } = options;
      const matchNormalizer = (0, _allUtils.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      const normalizedText = matchNormalizer(text.toString());
      const isNormalizedDifferent = normalizedText !== text.toString();
      const isCustomSelector = (selector != null ? selector : "*") !== "*";
      return `Unable to find an element with the text: ${isNormalizedDifferent ? `${normalizedText} (normalized from '${text}')` : text}${isCustomSelector ? `, which matches selector '${selector}'` : ""}. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.`;
    };
    var queryAllByTextWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByText, queryAllByText.name, "queryAll");
    exports.queryAllByText = queryAllByTextWithSuggestions;
    var [queryByText, getAllByText, getByText, findAllByText, findByText] = (0, _allUtils.buildQueries)(queryAllByText, getMultipleError, getMissingError);
    exports.findByText = findByText;
    exports.findAllByText = findAllByText;
    exports.getByText = getByText;
    exports.getAllByText = getAllByText;
    exports.queryByText = queryByText;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/display-value.js
var require_display_value = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/display-value.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByDisplayValue = exports.queryAllByDisplayValue = exports.getByDisplayValue = exports.getAllByDisplayValue = exports.findByDisplayValue = exports.findAllByDisplayValue = void 0;
    var _queryHelpers = require_query_helpers();
    var _helpers = require_helpers();
    var _allUtils = require_all_utils();
    var queryAllByDisplayValue = (container, value, {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = {}) => {
      (0, _helpers.checkContainerType)(container);
      const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
      const matchNormalizer = (0, _allUtils.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      return Array.from(container.querySelectorAll(`input,textarea,select`)).filter((node) => {
        if (node.tagName === "SELECT") {
          const selectedOptions = Array.from(node.options).filter((option) => option.selected);
          return selectedOptions.some((optionNode) => matcher((0, _allUtils.getNodeText)(optionNode), optionNode, value, matchNormalizer));
        } else {
          return matcher(node.value, node, value, matchNormalizer);
        }
      });
    };
    var getMultipleError = (c, value) => `Found multiple elements with the display value: ${value}.`;
    var getMissingError = (c, value) => `Unable to find an element with the display value: ${value}.`;
    var queryAllByDisplayValueWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByDisplayValue, queryAllByDisplayValue.name, "queryAll");
    exports.queryAllByDisplayValue = queryAllByDisplayValueWithSuggestions;
    var [queryByDisplayValue, getAllByDisplayValue, getByDisplayValue, findAllByDisplayValue, findByDisplayValue] = (0, _allUtils.buildQueries)(queryAllByDisplayValue, getMultipleError, getMissingError);
    exports.findByDisplayValue = findByDisplayValue;
    exports.findAllByDisplayValue = findAllByDisplayValue;
    exports.getByDisplayValue = getByDisplayValue;
    exports.getAllByDisplayValue = getAllByDisplayValue;
    exports.queryByDisplayValue = queryByDisplayValue;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/alt-text.js
var require_alt_text = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/alt-text.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByAltText = exports.queryAllByAltText = exports.getByAltText = exports.getAllByAltText = exports.findByAltText = exports.findAllByAltText = void 0;
    var _queryHelpers = require_query_helpers();
    var _helpers = require_helpers();
    var _allUtils = require_all_utils();
    var VALID_TAG_REGEXP = /^(img|input|area|.+-.+)$/i;
    var queryAllByAltText = (container, alt, options = {}) => {
      (0, _helpers.checkContainerType)(container);
      return (0, _queryHelpers.queryAllByAttribute)("alt", container, alt, options).filter((node) => VALID_TAG_REGEXP.test(node.tagName));
    };
    var getMultipleError = (c, alt) => `Found multiple elements with the alt text: ${alt}`;
    var getMissingError = (c, alt) => `Unable to find an element with the alt text: ${alt}`;
    var queryAllByAltTextWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByAltText, queryAllByAltText.name, "queryAll");
    exports.queryAllByAltText = queryAllByAltTextWithSuggestions;
    var [queryByAltText, getAllByAltText, getByAltText, findAllByAltText, findByAltText] = (0, _allUtils.buildQueries)(queryAllByAltText, getMultipleError, getMissingError);
    exports.findByAltText = findByAltText;
    exports.findAllByAltText = findAllByAltText;
    exports.getByAltText = getByAltText;
    exports.getAllByAltText = getAllByAltText;
    exports.queryByAltText = queryByAltText;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/title.js
var require_title = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/title.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByTitle = exports.queryAllByTitle = exports.getByTitle = exports.getAllByTitle = exports.findByTitle = exports.findAllByTitle = void 0;
    var _queryHelpers = require_query_helpers();
    var _helpers = require_helpers();
    var _allUtils = require_all_utils();
    var isSvgTitle = (node) => {
      var _node$parentElement;
      return node.tagName.toLowerCase() === "title" && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === "svg";
    };
    var queryAllByTitle = (container, text, {
      exact = true,
      collapseWhitespace,
      trim,
      normalizer
    } = {}) => {
      (0, _helpers.checkContainerType)(container);
      const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
      const matchNormalizer = (0, _allUtils.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      return Array.from(container.querySelectorAll("[title], svg > title")).filter((node) => matcher(node.getAttribute("title"), node, text, matchNormalizer) || isSvgTitle(node) && matcher((0, _allUtils.getNodeText)(node), node, text, matchNormalizer));
    };
    var getMultipleError = (c, title) => `Found multiple elements with the title: ${title}.`;
    var getMissingError = (c, title) => `Unable to find an element with the title: ${title}.`;
    var queryAllByTitleWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByTitle, queryAllByTitle.name, "queryAll");
    exports.queryAllByTitle = queryAllByTitleWithSuggestions;
    var [queryByTitle, getAllByTitle, getByTitle, findAllByTitle, findByTitle] = (0, _allUtils.buildQueries)(queryAllByTitle, getMultipleError, getMissingError);
    exports.findByTitle = findByTitle;
    exports.findAllByTitle = findAllByTitle;
    exports.getByTitle = getByTitle;
    exports.getAllByTitle = getAllByTitle;
    exports.queryByTitle = queryByTitle;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/role.js
var require_role = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/role.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByRole = exports.queryAllByRole = exports.getByRole = exports.getAllByRole = exports.findByRole = exports.findAllByRole = void 0;
    var _domAccessibilityApi = require_dist();
    var _ariaQuery = require_lib();
    var _roleHelpers = require_role_helpers();
    var _queryHelpers = require_query_helpers();
    var _helpers = require_helpers();
    var _allUtils = require_all_utils();
    function queryAllByRole(container, role, {
      exact = true,
      collapseWhitespace,
      hidden = (0, _allUtils.getConfig)().defaultHidden,
      name,
      description,
      trim,
      normalizer,
      queryFallbacks = false,
      selected,
      checked,
      pressed,
      current,
      level,
      expanded
    } = {}) {
      (0, _helpers.checkContainerType)(container);
      const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
      const matchNormalizer = (0, _allUtils.makeNormalizer)({
        collapseWhitespace,
        trim,
        normalizer
      });
      if (selected !== void 0) {
        var _allRoles$get;
        if (((_allRoles$get = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get.props["aria-selected"]) === void 0) {
          throw new Error(`"aria-selected" is not supported on role "${role}".`);
        }
      }
      if (checked !== void 0) {
        var _allRoles$get2;
        if (((_allRoles$get2 = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get2.props["aria-checked"]) === void 0) {
          throw new Error(`"aria-checked" is not supported on role "${role}".`);
        }
      }
      if (pressed !== void 0) {
        var _allRoles$get3;
        if (((_allRoles$get3 = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get3.props["aria-pressed"]) === void 0) {
          throw new Error(`"aria-pressed" is not supported on role "${role}".`);
        }
      }
      if (current !== void 0) {
        var _allRoles$get4;
        if (((_allRoles$get4 = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get4.props["aria-current"]) === void 0) {
          throw new Error(`"aria-current" is not supported on role "${role}".`);
        }
      }
      if (level !== void 0) {
        if (role !== "heading") {
          throw new Error(`Role "${role}" cannot have "level" property.`);
        }
      }
      if (expanded !== void 0) {
        var _allRoles$get5;
        if (((_allRoles$get5 = _ariaQuery.roles.get(role)) == null ? void 0 : _allRoles$get5.props["aria-expanded"]) === void 0) {
          throw new Error(`"aria-expanded" is not supported on role "${role}".`);
        }
      }
      const subtreeIsInaccessibleCache = /* @__PURE__ */ new WeakMap();
      function cachedIsSubtreeInaccessible(element) {
        if (!subtreeIsInaccessibleCache.has(element)) {
          subtreeIsInaccessibleCache.set(element, (0, _roleHelpers.isSubtreeInaccessible)(element));
        }
        return subtreeIsInaccessibleCache.get(element);
      }
      return Array.from(container.querySelectorAll(
        // Only query elements that can be matched by the following filters
        makeRoleSelector(role, exact, normalizer ? matchNormalizer : void 0)
      )).filter((node) => {
        const isRoleSpecifiedExplicitly = node.hasAttribute("role");
        if (isRoleSpecifiedExplicitly) {
          const roleValue = node.getAttribute("role");
          if (queryFallbacks) {
            return roleValue.split(" ").filter(Boolean).some((text) => matcher(text, node, role, matchNormalizer));
          }
          if (normalizer) {
            return matcher(roleValue, node, role, matchNormalizer);
          }
          const [firstWord] = roleValue.split(" ");
          return matcher(firstWord, node, role, matchNormalizer);
        }
        const implicitRoles = (0, _roleHelpers.getImplicitAriaRoles)(node);
        return implicitRoles.some((implicitRole) => matcher(implicitRole, node, role, matchNormalizer));
      }).filter((element) => {
        if (selected !== void 0) {
          return selected === (0, _roleHelpers.computeAriaSelected)(element);
        }
        if (checked !== void 0) {
          return checked === (0, _roleHelpers.computeAriaChecked)(element);
        }
        if (pressed !== void 0) {
          return pressed === (0, _roleHelpers.computeAriaPressed)(element);
        }
        if (current !== void 0) {
          return current === (0, _roleHelpers.computeAriaCurrent)(element);
        }
        if (expanded !== void 0) {
          return expanded === (0, _roleHelpers.computeAriaExpanded)(element);
        }
        if (level !== void 0) {
          return level === (0, _roleHelpers.computeHeadingLevel)(element);
        }
        return true;
      }).filter((element) => {
        if (name === void 0) {
          return true;
        }
        return (0, _allUtils.matches)((0, _domAccessibilityApi.computeAccessibleName)(element, {
          computedStyleSupportsPseudoElements: (0, _allUtils.getConfig)().computedStyleSupportsPseudoElements
        }), element, name, (text) => text);
      }).filter((element) => {
        if (description === void 0) {
          return true;
        }
        return (0, _allUtils.matches)((0, _domAccessibilityApi.computeAccessibleDescription)(element, {
          computedStyleSupportsPseudoElements: (0, _allUtils.getConfig)().computedStyleSupportsPseudoElements
        }), element, description, (text) => text);
      }).filter((element) => {
        return hidden === false ? (0, _roleHelpers.isInaccessible)(element, {
          isSubtreeInaccessible: cachedIsSubtreeInaccessible
        }) === false : true;
      });
    }
    function makeRoleSelector(role, exact, customNormalizer) {
      var _roleElements$get;
      if (typeof role !== "string") {
        return "*";
      }
      const explicitRoleSelector = exact && !customNormalizer ? `*[role~="${role}"]` : "*[role]";
      const roleRelations = (_roleElements$get = _ariaQuery.roleElements.get(role)) != null ? _roleElements$get : /* @__PURE__ */ new Set();
      const implicitRoleSelectors = new Set(Array.from(roleRelations).map(({
        name
      }) => name));
      return [explicitRoleSelector].concat(Array.from(implicitRoleSelectors)).join(",");
    }
    var getNameHint = (name) => {
      let nameHint = "";
      if (name === void 0) {
        nameHint = "";
      } else if (typeof name === "string") {
        nameHint = ` and name "${name}"`;
      } else {
        nameHint = ` and name \`${name}\``;
      }
      return nameHint;
    };
    var getMultipleError = (c, role, {
      name
    } = {}) => {
      return `Found multiple elements with the role "${role}"${getNameHint(name)}`;
    };
    var getMissingError = (container, role, {
      hidden = (0, _allUtils.getConfig)().defaultHidden,
      name,
      description
    } = {}) => {
      if ((0, _allUtils.getConfig)()._disableExpensiveErrorDiagnostics) {
        return `Unable to find role="${role}"${getNameHint(name)}`;
      }
      let roles = "";
      Array.from(container.children).forEach((childElement) => {
        roles += (0, _roleHelpers.prettyRoles)(childElement, {
          hidden,
          includeDescription: description !== void 0
        });
      });
      let roleMessage;
      if (roles.length === 0) {
        if (hidden === false) {
          roleMessage = "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole";
        } else {
          roleMessage = "There are no available roles.";
        }
      } else {
        roleMessage = `
Here are the ${hidden === false ? "accessible" : "available"} roles:

  ${roles.replace(/\n/g, "\n  ").replace(/\n\s\s\n/g, "\n\n")}
`.trim();
      }
      let nameHint = "";
      if (name === void 0) {
        nameHint = "";
      } else if (typeof name === "string") {
        nameHint = ` and name "${name}"`;
      } else {
        nameHint = ` and name \`${name}\``;
      }
      let descriptionHint = "";
      if (description === void 0) {
        descriptionHint = "";
      } else if (typeof description === "string") {
        descriptionHint = ` and description "${description}"`;
      } else {
        descriptionHint = ` and description \`${description}\``;
      }
      return `
Unable to find an ${hidden === false ? "accessible " : ""}element with the role "${role}"${nameHint}${descriptionHint}

${roleMessage}`.trim();
    };
    var queryAllByRoleWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByRole, queryAllByRole.name, "queryAll");
    exports.queryAllByRole = queryAllByRoleWithSuggestions;
    var [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = (0, _allUtils.buildQueries)(queryAllByRole, getMultipleError, getMissingError);
    exports.findByRole = findByRole;
    exports.findAllByRole = findAllByRole;
    exports.getByRole = getByRole;
    exports.getAllByRole = getAllByRole;
    exports.queryByRole = queryByRole;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/test-id.js
var require_test_id = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/test-id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.queryByTestId = exports.queryAllByTestId = exports.getByTestId = exports.getAllByTestId = exports.findByTestId = exports.findAllByTestId = void 0;
    var _helpers = require_helpers();
    var _queryHelpers = require_query_helpers();
    var _allUtils = require_all_utils();
    var getTestIdAttribute = () => (0, _allUtils.getConfig)().testIdAttribute;
    var queryAllByTestId = (...args) => {
      (0, _helpers.checkContainerType)(args[0]);
      return (0, _allUtils.queryAllByAttribute)(getTestIdAttribute(), ...args);
    };
    var getMultipleError = (c, id) => `Found multiple elements by: [${getTestIdAttribute()}="${id}"]`;
    var getMissingError = (c, id) => `Unable to find an element by: [${getTestIdAttribute()}="${id}"]`;
    var queryAllByTestIdWithSuggestions = (0, _queryHelpers.wrapAllByQueryWithSuggestion)(queryAllByTestId, queryAllByTestId.name, "queryAll");
    exports.queryAllByTestId = queryAllByTestIdWithSuggestions;
    var [queryByTestId, getAllByTestId, getByTestId, findAllByTestId, findByTestId] = (0, _allUtils.buildQueries)(queryAllByTestId, getMultipleError, getMissingError);
    exports.findByTestId = findByTestId;
    exports.findAllByTestId = findAllByTestId;
    exports.getByTestId = getByTestId;
    exports.getAllByTestId = getAllByTestId;
    exports.queryByTestId = queryByTestId;
  }
});

// ../../node_modules/@testing-library/dom/dist/queries/index.js
var require_queries = __commonJS({
  "../../node_modules/@testing-library/dom/dist/queries/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _labelText = require_label_text();
    Object.keys(_labelText).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _labelText[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _labelText[key];
        }
      });
    });
    var _placeholderText = require_placeholder_text();
    Object.keys(_placeholderText).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _placeholderText[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _placeholderText[key];
        }
      });
    });
    var _text = require_text();
    Object.keys(_text).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _text[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _text[key];
        }
      });
    });
    var _displayValue = require_display_value();
    Object.keys(_displayValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _displayValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _displayValue[key];
        }
      });
    });
    var _altText = require_alt_text();
    Object.keys(_altText).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _altText[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _altText[key];
        }
      });
    });
    var _title = require_title();
    Object.keys(_title).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _title[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _title[key];
        }
      });
    });
    var _role = require_role();
    Object.keys(_role).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _role[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _role[key];
        }
      });
    });
    var _testId = require_test_id();
    Object.keys(_testId).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _testId[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _testId[key];
        }
      });
    });
  }
});

// ../../node_modules/@testing-library/dom/dist/get-queries-for-element.js
var require_get_queries_for_element = __commonJS({
  "../../node_modules/@testing-library/dom/dist/get-queries-for-element.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getQueriesForElement = getQueriesForElement;
    var defaultQueries = _interopRequireWildcard(require_queries());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function getQueriesForElement(element, queries = defaultQueries, initialValue = {}) {
      return Object.keys(queries).reduce((helpers, key) => {
        const fn = queries[key];
        helpers[key] = fn.bind(null, element);
        return helpers;
      }, initialValue);
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/wait-for-element-to-be-removed.js
var require_wait_for_element_to_be_removed = __commonJS({
  "../../node_modules/@testing-library/dom/dist/wait-for-element-to-be-removed.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.waitForElementToBeRemoved = waitForElementToBeRemoved;
    var _waitFor = require_wait_for();
    var isRemoved = (result) => !result || Array.isArray(result) && !result.length;
    function initialCheck(elements) {
      if (isRemoved(elements)) {
        throw new Error("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.");
      }
    }
    async function waitForElementToBeRemoved(callback, options) {
      const timeoutError = new Error("Timed out in waitForElementToBeRemoved.");
      if (typeof callback !== "function") {
        initialCheck(callback);
        const elements = Array.isArray(callback) ? callback : [callback];
        const getRemainingElements = elements.map((element) => {
          let parent = element.parentElement;
          if (parent === null)
            return () => null;
          while (parent.parentElement)
            parent = parent.parentElement;
          return () => parent.contains(element) ? element : null;
        });
        callback = () => getRemainingElements.map((c) => c()).filter(Boolean);
      }
      initialCheck(callback());
      return (0, _waitFor.waitFor)(() => {
        let result;
        try {
          result = callback();
        } catch (error) {
          if (error.name === "TestingLibraryElementError") {
            return void 0;
          }
          throw error;
        }
        if (!isRemoved(result)) {
          throw timeoutError;
        }
        return void 0;
      }, options);
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/event-map.js
var require_event_map = __commonJS({
  "../../node_modules/@testing-library/dom/dist/event-map.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.eventMap = exports.eventAliasMap = void 0;
    var eventMap = {
      // Clipboard Events
      copy: {
        EventType: "ClipboardEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      cut: {
        EventType: "ClipboardEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      paste: {
        EventType: "ClipboardEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      // Composition Events
      compositionEnd: {
        EventType: "CompositionEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      compositionStart: {
        EventType: "CompositionEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      compositionUpdate: {
        EventType: "CompositionEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      // Keyboard Events
      keyDown: {
        EventType: "KeyboardEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          charCode: 0,
          composed: true
        }
      },
      keyPress: {
        EventType: "KeyboardEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          charCode: 0,
          composed: true
        }
      },
      keyUp: {
        EventType: "KeyboardEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          charCode: 0,
          composed: true
        }
      },
      // Focus Events
      focus: {
        EventType: "FocusEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false,
          composed: true
        }
      },
      blur: {
        EventType: "FocusEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false,
          composed: true
        }
      },
      focusIn: {
        EventType: "FocusEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      focusOut: {
        EventType: "FocusEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      // Form Events
      change: {
        EventType: "Event",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      input: {
        EventType: "InputEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      invalid: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: true
        }
      },
      submit: {
        EventType: "Event",
        defaultInit: {
          bubbles: true,
          cancelable: true
        }
      },
      reset: {
        EventType: "Event",
        defaultInit: {
          bubbles: true,
          cancelable: true
        }
      },
      // Mouse Events
      click: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          button: 0,
          composed: true
        }
      },
      contextMenu: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      dblClick: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      drag: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      dragEnd: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      dragEnter: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      dragExit: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      dragLeave: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      dragOver: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      dragStart: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      drop: {
        EventType: "DragEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      mouseDown: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      mouseEnter: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false,
          composed: true
        }
      },
      mouseLeave: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false,
          composed: true
        }
      },
      mouseMove: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      mouseOut: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      mouseOver: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      mouseUp: {
        EventType: "MouseEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      // Selection Events
      select: {
        EventType: "Event",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      // Touch Events
      touchCancel: {
        EventType: "TouchEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      touchEnd: {
        EventType: "TouchEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      touchMove: {
        EventType: "TouchEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      touchStart: {
        EventType: "TouchEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      // UI Events
      resize: {
        EventType: "UIEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      scroll: {
        EventType: "UIEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      // Wheel Events
      wheel: {
        EventType: "WheelEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      // Media Events
      abort: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      canPlay: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      canPlayThrough: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      durationChange: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      emptied: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      encrypted: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      ended: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      loadedData: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      loadedMetadata: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      loadStart: {
        EventType: "ProgressEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      pause: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      play: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      playing: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      progress: {
        EventType: "ProgressEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      rateChange: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      seeked: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      seeking: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      stalled: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      suspend: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      timeUpdate: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      volumeChange: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      waiting: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      // Events
      load: {
        // TODO: load events can be UIEvent or Event depending on what generated them
        // This is where this abstraction breaks down.
        // But the common targets are <img />, <script /> and window.
        // Neither of these targets receive a UIEvent
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      error: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      // Animation Events
      animationStart: {
        EventType: "AnimationEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      animationEnd: {
        EventType: "AnimationEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      animationIteration: {
        EventType: "AnimationEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      // Transition Events
      transitionCancel: {
        EventType: "TransitionEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      transitionEnd: {
        EventType: "TransitionEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true
        }
      },
      transitionRun: {
        EventType: "TransitionEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      transitionStart: {
        EventType: "TransitionEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      // pointer events
      pointerOver: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      pointerEnter: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      pointerDown: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      pointerMove: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      pointerUp: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      pointerCancel: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      pointerOut: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: true,
          composed: true
        }
      },
      pointerLeave: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      gotPointerCapture: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      lostPointerCapture: {
        EventType: "PointerEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false,
          composed: true
        }
      },
      // history events
      popState: {
        EventType: "PopStateEvent",
        defaultInit: {
          bubbles: true,
          cancelable: false
        }
      },
      // window events
      offline: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      },
      online: {
        EventType: "Event",
        defaultInit: {
          bubbles: false,
          cancelable: false
        }
      }
    };
    exports.eventMap = eventMap;
    var eventAliasMap = {
      doubleClick: "dblClick"
    };
    exports.eventAliasMap = eventAliasMap;
  }
});

// ../../node_modules/@testing-library/dom/dist/events.js
var require_events = __commonJS({
  "../../node_modules/@testing-library/dom/dist/events.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.createEvent = createEvent;
    exports.fireEvent = fireEvent;
    var _config = require_config();
    var _helpers = require_helpers();
    var _eventMap = require_event_map();
    function fireEvent(element, event) {
      return (0, _config.getConfig)().eventWrapper(() => {
        if (!event) {
          throw new Error(`Unable to fire an event - please provide an event object.`);
        }
        if (!element) {
          throw new Error(`Unable to fire a "${event.type}" event - please provide a DOM element.`);
        }
        return element.dispatchEvent(event);
      });
    }
    function createEvent(eventName, node, init, {
      EventType = "Event",
      defaultInit = {}
    } = {}) {
      if (!node) {
        throw new Error(`Unable to fire a "${eventName}" event - please provide a DOM element.`);
      }
      const eventInit = {
        ...defaultInit,
        ...init
      };
      const {
        target: {
          value,
          files,
          ...targetProperties
        } = {}
      } = eventInit;
      if (value !== void 0) {
        setNativeValue(node, value);
      }
      if (files !== void 0) {
        Object.defineProperty(node, "files", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: files
        });
      }
      Object.assign(node, targetProperties);
      const window2 = (0, _helpers.getWindowFromNode)(node);
      const EventConstructor = window2[EventType] || window2.Event;
      let event;
      if (typeof EventConstructor === "function") {
        event = new EventConstructor(eventName, eventInit);
      } else {
        event = window2.document.createEvent(EventType);
        const {
          bubbles,
          cancelable,
          detail,
          ...otherInit
        } = eventInit;
        event.initEvent(eventName, bubbles, cancelable, detail);
        Object.keys(otherInit).forEach((eventKey) => {
          event[eventKey] = otherInit[eventKey];
        });
      }
      const dataTransferProperties = ["dataTransfer", "clipboardData"];
      dataTransferProperties.forEach((dataTransferKey) => {
        const dataTransferValue = eventInit[dataTransferKey];
        if (typeof dataTransferValue === "object") {
          if (typeof window2.DataTransfer === "function") {
            Object.defineProperty(event, dataTransferKey, {
              value: Object.getOwnPropertyNames(dataTransferValue).reduce((acc, propName) => {
                Object.defineProperty(acc, propName, {
                  value: dataTransferValue[propName]
                });
                return acc;
              }, new window2.DataTransfer())
            });
          } else {
            Object.defineProperty(event, dataTransferKey, {
              value: dataTransferValue
            });
          }
        }
      });
      return event;
    }
    Object.keys(_eventMap.eventMap).forEach((key) => {
      const {
        EventType,
        defaultInit
      } = _eventMap.eventMap[key];
      const eventName = key.toLowerCase();
      createEvent[key] = (node, init) => createEvent(eventName, node, init, {
        EventType,
        defaultInit
      });
      fireEvent[key] = (node, init) => fireEvent(node, createEvent[key](node, init));
    });
    function setNativeValue(element, value) {
      const {
        set: valueSetter
      } = Object.getOwnPropertyDescriptor(element, "value") || {};
      const prototype = Object.getPrototypeOf(element);
      const {
        set: prototypeValueSetter
      } = Object.getOwnPropertyDescriptor(prototype, "value") || {};
      if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
      } else {
        if (valueSetter) {
          valueSetter.call(element, value);
        } else {
          throw new Error("The given element does not have a value setter");
        }
      }
    }
    Object.keys(_eventMap.eventAliasMap).forEach((aliasKey) => {
      const key = _eventMap.eventAliasMap[aliasKey];
      fireEvent[aliasKey] = (...args) => fireEvent[key](...args);
    });
  }
});

// ../../node_modules/lz-string/libs/lz-string.js
var require_lz_string = __commonJS({
  "../../node_modules/lz-string/libs/lz-string.js"(exports, module) {
    var LZString = function() {
      var f = String.fromCharCode;
      var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
      var baseReverseDic = {};
      function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
            baseReverseDic[alphabet][alphabet.charAt(i)] = i;
          }
        }
        return baseReverseDic[alphabet][character];
      }
      var LZString2 = {
        compressToBase64: function(input) {
          if (input == null)
            return "";
          var res = LZString2._compress(input, 6, function(a) {
            return keyStrBase64.charAt(a);
          });
          switch (res.length % 4) {
            default:
            case 0:
              return res;
            case 1:
              return res + "===";
            case 2:
              return res + "==";
            case 3:
              return res + "=";
          }
        },
        decompressFromBase64: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrBase64, input.charAt(index));
          });
        },
        compressToUTF16: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 15, function(a) {
            return f(a + 32);
          }) + " ";
        },
        decompressFromUTF16: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 16384, function(index) {
            return compressed.charCodeAt(index) - 32;
          });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
          var compressed = LZString2.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
            var current_value = compressed.charCodeAt(i);
            buf[i * 2] = current_value >>> 8;
            buf[i * 2 + 1] = current_value % 256;
          }
          return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === void 0) {
            return LZString2.decompress(compressed);
          } else {
            var buf = new Array(compressed.length / 2);
            for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
              buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
            }
            var result = [];
            buf.forEach(function(c) {
              result.push(f(c));
            });
            return LZString2.decompress(result.join(""));
          }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          return LZString2._compress(input, 6, function(a) {
            return keyStrUriSafe.charAt(a);
          });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
          if (input == null)
            return "";
          if (input == "")
            return null;
          input = input.replace(/ /g, "+");
          return LZString2._decompress(input.length, 32, function(index) {
            return getBaseValue(keyStrUriSafe, input.charAt(index));
          });
        },
        compress: function(uncompressed) {
          return LZString2._compress(uncompressed, 16, function(a) {
            return f(a);
          });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null)
            return "";
          var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
            context_c = uncompressed.charAt(ii);
            if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
              context_dictionary[context_c] = context_dictSize++;
              context_dictionaryToCreate[context_c] = true;
            }
            context_wc = context_w + context_c;
            if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
              context_w = context_wc;
            } else {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              context_dictionary[context_wc] = context_dictSize++;
              context_w = String(context_c);
            }
          }
          if (context_w !== "") {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = context_data_val << 1 | value & 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          while (true) {
            context_data_val = context_data_val << 1;
            if (context_data_position == bitsPerChar - 1) {
              context_data.push(getCharFromInt(context_data_val));
              break;
            } else
              context_data_position++;
          }
          return context_data.join("");
        },
        decompress: function(compressed) {
          if (compressed == null)
            return "";
          if (compressed == "")
            return null;
          return LZString2._decompress(compressed.length, 32768, function(index) {
            return compressed.charCodeAt(index);
          });
        },
        _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
          for (i = 0; i < 3; i += 1) {
            dictionary[i] = i;
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (next = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              c = f(bits);
              break;
            case 2:
              return "";
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
            if (data.index > length) {
              return "";
            }
            bits = 0;
            maxpower = Math.pow(2, numBits);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (c = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                dictionary[dictSize++] = f(bits);
                c = dictSize - 1;
                enlargeIn--;
                break;
              case 2:
                return result.join("");
            }
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
            if (dictionary[c]) {
              entry = dictionary[c];
            } else {
              if (c === dictSize) {
                entry = w + w.charAt(0);
              } else {
                return null;
              }
            }
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            enlargeIn--;
            w = entry;
            if (enlargeIn == 0) {
              enlargeIn = Math.pow(2, numBits);
              numBits++;
            }
          }
        }
      };
      return LZString2;
    }();
    if (typeof define === "function" && define.amd) {
      define(function() {
        return LZString;
      });
    } else if (typeof module !== "undefined" && module != null) {
      module.exports = LZString;
    } else if (typeof angular !== "undefined" && angular != null) {
      angular.module("LZString", []).factory("LZString", function() {
        return LZString;
      });
    }
  }
});

// ../../node_modules/@testing-library/dom/dist/screen.js
var require_screen = __commonJS({
  "../../node_modules/@testing-library/dom/dist/screen.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.screen = void 0;
    var _lzString = _interopRequireDefault(require_lz_string());
    var _getQueriesForElement = require_get_queries_for_element();
    var _helpers = require_helpers();
    var _prettyDom = require_pretty_dom();
    var queries = _interopRequireWildcard(require_queries());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function unindent(string) {
      return string.replace(/[ \t]*[\n][ \t]*/g, "\n");
    }
    function encode(value) {
      return _lzString.default.compressToEncodedURIComponent(unindent(value));
    }
    function getPlaygroundUrl(markup) {
      return `https://testing-playground.com/#markup=${encode(markup)}`;
    }
    var debug = (element, maxLength, options) => Array.isArray(element) ? element.forEach((el) => (0, _prettyDom.logDOM)(el, maxLength, options)) : (0, _prettyDom.logDOM)(element, maxLength, options);
    var logTestingPlaygroundURL = (element = (0, _helpers.getDocument)().body) => {
      if (!element || !("innerHTML" in element)) {
        console.log(`The element you're providing isn't a valid DOM element.`);
        return;
      }
      if (!element.innerHTML) {
        console.log(`The provided element doesn't have any children.`);
        return;
      }
      const playgroundUrl = getPlaygroundUrl(element.innerHTML);
      console.log(`Open this URL in your browser

${playgroundUrl}`);
      return playgroundUrl;
    };
    var initialValue = {
      debug,
      logTestingPlaygroundURL
    };
    var screen = typeof document !== "undefined" && document.body ? (0, _getQueriesForElement.getQueriesForElement)(document.body, queries, initialValue) : Object.keys(queries).reduce((helpers, key) => {
      helpers[key] = () => {
        throw new TypeError("For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error");
      };
      return helpers;
    }, initialValue);
    exports.screen = screen;
  }
});

// ../../node_modules/@testing-library/dom/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/@testing-library/dom/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _exportNames = {
      within: true,
      queries: true,
      queryHelpers: true,
      getDefaultNormalizer: true,
      getRoles: true,
      logRoles: true,
      isInaccessible: true,
      configure: true,
      getConfig: true
    };
    Object.defineProperty(exports, "configure", {
      enumerable: true,
      get: function() {
        return _config.configure;
      }
    });
    Object.defineProperty(exports, "getConfig", {
      enumerable: true,
      get: function() {
        return _config.getConfig;
      }
    });
    Object.defineProperty(exports, "getDefaultNormalizer", {
      enumerable: true,
      get: function() {
        return _matches.getDefaultNormalizer;
      }
    });
    Object.defineProperty(exports, "getRoles", {
      enumerable: true,
      get: function() {
        return _roleHelpers.getRoles;
      }
    });
    Object.defineProperty(exports, "isInaccessible", {
      enumerable: true,
      get: function() {
        return _roleHelpers.isInaccessible;
      }
    });
    Object.defineProperty(exports, "logRoles", {
      enumerable: true,
      get: function() {
        return _roleHelpers.logRoles;
      }
    });
    exports.queryHelpers = exports.queries = void 0;
    Object.defineProperty(exports, "within", {
      enumerable: true,
      get: function() {
        return _getQueriesForElement.getQueriesForElement;
      }
    });
    var _getQueriesForElement = require_get_queries_for_element();
    Object.keys(_getQueriesForElement).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _getQueriesForElement[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _getQueriesForElement[key];
        }
      });
    });
    var queries = _interopRequireWildcard(require_queries());
    exports.queries = queries;
    Object.keys(queries).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === queries[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return queries[key];
        }
      });
    });
    var queryHelpers = _interopRequireWildcard(require_query_helpers());
    exports.queryHelpers = queryHelpers;
    Object.keys(queryHelpers).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === queryHelpers[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return queryHelpers[key];
        }
      });
    });
    var _waitFor = require_wait_for();
    Object.keys(_waitFor).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _waitFor[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _waitFor[key];
        }
      });
    });
    var _waitForElementToBeRemoved = require_wait_for_element_to_be_removed();
    Object.keys(_waitForElementToBeRemoved).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _waitForElementToBeRemoved[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _waitForElementToBeRemoved[key];
        }
      });
    });
    var _matches = require_matches();
    var _getNodeText = require_get_node_text();
    Object.keys(_getNodeText).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _getNodeText[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _getNodeText[key];
        }
      });
    });
    var _events = require_events();
    Object.keys(_events).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _events[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _events[key];
        }
      });
    });
    var _screen = require_screen();
    Object.keys(_screen).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _screen[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _screen[key];
        }
      });
    });
    var _roleHelpers = require_role_helpers();
    var _prettyDom = require_pretty_dom();
    Object.keys(_prettyDom).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _prettyDom[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _prettyDom[key];
        }
      });
    });
    var _config = require_config();
    var _suggestions = require_suggestions();
    Object.keys(_suggestions).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      if (key in exports && exports[key] === _suggestions[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _suggestions[key];
        }
      });
    });
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/click/getMouseEventOptions.js
var require_getMouseEventOptions = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/click/getMouseEventOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getMouseEventOptions = getMouseEventOptions;
    function isMousePressEvent(event) {
      return event === "mousedown" || event === "mouseup" || event === "click" || event === "dblclick";
    }
    var BUTTONS_NAMES = {
      none: 0,
      primary: 1,
      secondary: 2,
      auxiliary: 4
    };
    var BUTTON_NAMES = {
      primary: 0,
      auxiliary: 1,
      secondary: 2
    };
    function translateButtonNumber(value, from) {
      var _Object$entries$find;
      const [mapIn, mapOut] = from === "button" ? [BUTTON_NAMES, BUTTONS_NAMES] : [BUTTONS_NAMES, BUTTON_NAMES];
      const name = (_Object$entries$find = Object.entries(mapIn).find(([, i]) => i === value)) == null ? void 0 : _Object$entries$find[0];
      return name && Object.prototype.hasOwnProperty.call(mapOut, name) ? mapOut[name] : 0;
    }
    function convertMouseButtons(event, init, property) {
      if (!isMousePressEvent(event)) {
        return 0;
      }
      if (typeof init[property] === "number") {
        return init[property];
      } else if (property === "button" && typeof init.buttons === "number") {
        return translateButtonNumber(init.buttons, "buttons");
      } else if (property === "buttons" && typeof init.button === "number") {
        return translateButtonNumber(init.button, "button");
      }
      return property != "button" && isMousePressEvent(event) ? 1 : 0;
    }
    function getMouseEventOptions(event, init, clickCount = 0) {
      var _init;
      init = (_init = init) != null ? _init : {};
      return {
        ...init,
        // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
        detail: event === "mousedown" || event === "mouseup" || event === "click" ? 1 + clickCount : clickCount,
        buttons: convertMouseButtons(event, init, "buttons"),
        button: convertMouseButtons(event, init, "button")
      };
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/isElementType.js
var require_isElementType = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/isElementType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isElementType = isElementType;
    function isElementType(element, tag, props) {
      if (element.namespaceURI && element.namespaceURI !== "http://www.w3.org/1999/xhtml") {
        return false;
      }
      tag = Array.isArray(tag) ? tag : [tag];
      if (!tag.includes(element.tagName.toLowerCase())) {
        return false;
      }
      if (props) {
        return Object.entries(props).every(([k, v]) => element[k] === v);
      }
      return true;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/click/isClickableInput.js
var require_isClickableInput = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/click/isClickableInput.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isClickableInput = isClickableInput;
    var _isElementType = require_isElementType();
    var CLICKABLE_INPUT_TYPES = ["button", "color", "file", "image", "reset", "submit", "checkbox", "radio"];
    function isClickableInput(element) {
      return (0, _isElementType.isElementType)(element, "button") || (0, _isElementType.isElementType)(element, "input") && CLICKABLE_INPUT_TYPES.includes(element.type);
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/buildTimeValue.js
var require_buildTimeValue = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/buildTimeValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.buildTimeValue = buildTimeValue;
    function buildTimeValue(value) {
      const onlyDigitsValue = value.replace(/\D/g, "");
      if (onlyDigitsValue.length < 2) {
        return value;
      }
      const firstDigit = parseInt(onlyDigitsValue[0], 10);
      const secondDigit = parseInt(onlyDigitsValue[1], 10);
      if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
        let index;
        if (firstDigit >= 3) {
          index = 1;
        } else {
          index = 2;
        }
        return build(onlyDigitsValue, index);
      }
      if (value.length === 2) {
        return value;
      }
      return build(onlyDigitsValue, 2);
    }
    function build(onlyDigitsValue, index) {
      const hours = onlyDigitsValue.slice(0, index);
      const validHours = Math.min(parseInt(hours, 10), 23);
      const minuteCharacters = onlyDigitsValue.slice(index);
      const parsedMinutes = parseInt(minuteCharacters, 10);
      const validMinutes = Math.min(parsedMinutes, 59);
      return `${validHours.toString().padStart(2, "0")}:${validMinutes.toString().padStart(2, "0")}`;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/selectionRange.js
var require_selectionRange = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/selectionRange.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getSelectionRange = getSelectionRange;
    exports.hasSelectionSupport = hasSelectionSupport;
    exports.setSelectionRange = setSelectionRange;
    var _isElementType = require_isElementType();
    var selectionSupportType;
    (function(selectionSupportType2) {
      selectionSupportType2["text"] = "text";
      selectionSupportType2["search"] = "search";
      selectionSupportType2["url"] = "url";
      selectionSupportType2["tel"] = "tel";
      selectionSupportType2["password"] = "password";
    })(selectionSupportType || (selectionSupportType = {}));
    var InputSelection = Symbol("inputSelection");
    function hasSelectionSupport(element) {
      return (0, _isElementType.isElementType)(element, "textarea") || (0, _isElementType.isElementType)(element, "input") && Boolean(selectionSupportType[element.type]);
    }
    function getSelectionRange(element) {
      if (hasSelectionSupport(element)) {
        return {
          selectionStart: element.selectionStart,
          selectionEnd: element.selectionEnd
        };
      }
      if ((0, _isElementType.isElementType)(element, "input")) {
        var _InputSelection;
        return (_InputSelection = element[InputSelection]) != null ? _InputSelection : {
          selectionStart: null,
          selectionEnd: null
        };
      }
      const selection = element.ownerDocument.getSelection();
      if (selection != null && selection.rangeCount && element.contains(selection.focusNode)) {
        const range = selection.getRangeAt(0);
        return {
          selectionStart: range.startOffset,
          selectionEnd: range.endOffset
        };
      } else {
        return {
          selectionStart: null,
          selectionEnd: null
        };
      }
    }
    function setSelectionRange(element, newSelectionStart, newSelectionEnd) {
      const {
        selectionStart,
        selectionEnd
      } = getSelectionRange(element);
      if (selectionStart === newSelectionStart && selectionEnd === newSelectionEnd) {
        return;
      }
      if (hasSelectionSupport(element)) {
        element.setSelectionRange(newSelectionStart, newSelectionEnd);
      }
      if ((0, _isElementType.isElementType)(element, "input")) {
        ;
        element[InputSelection] = {
          selectionStart: newSelectionStart,
          selectionEnd: newSelectionEnd
        };
      }
      if ((0, _isElementType.isElementType)(element, "input") || (0, _isElementType.isElementType)(element, "textarea")) {
        return;
      }
      const range = element.ownerDocument.createRange();
      range.selectNodeContents(element);
      if (element.firstChild) {
        range.setStart(element.firstChild, newSelectionStart);
        range.setEnd(element.firstChild, newSelectionEnd);
      }
      const selection = element.ownerDocument.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/isContentEditable.js
var require_isContentEditable = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/isContentEditable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isContentEditable = isContentEditable;
    function isContentEditable(element) {
      return element.hasAttribute("contenteditable") && (element.getAttribute("contenteditable") == "true" || element.getAttribute("contenteditable") == "");
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/getValue.js
var require_getValue = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/getValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getValue = getValue;
    var _isContentEditable = require_isContentEditable();
    function getValue(element) {
      if (!element) {
        return null;
      }
      if ((0, _isContentEditable.isContentEditable)(element)) {
        return element.textContent;
      }
      return element.value;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/isValidDateValue.js
var require_isValidDateValue = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/isValidDateValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isValidDateValue = isValidDateValue;
    function isValidDateValue(element, value) {
      const clone = element.cloneNode();
      clone.value = value;
      return clone.value === value;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/isValidInputTimeValue.js
var require_isValidInputTimeValue = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/isValidInputTimeValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isValidInputTimeValue = isValidInputTimeValue;
    function isValidInputTimeValue(element, timeValue) {
      const clone = element.cloneNode();
      clone.value = timeValue;
      return clone.value === timeValue;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/calculateNewValue.js
var require_calculateNewValue = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/calculateNewValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.calculateNewValue = calculateNewValue;
    var _selectionRange = require_selectionRange();
    var _getValue2 = require_getValue();
    var _isValidDateValue = require_isValidDateValue();
    var _isValidInputTimeValue = require_isValidInputTimeValue();
    function calculateNewValue(newEntry, element, value = (() => {
      var _getValue;
      return (_getValue = (0, _getValue2.getValue)(element)) != null ? _getValue : (
        /* istanbul ignore next */
        ""
      );
    })(), selectionRange = (0, _selectionRange.getSelectionRange)(element), deleteContent) {
      const selectionStart = selectionRange.selectionStart === null ? value.length : selectionRange.selectionStart;
      const selectionEnd = selectionRange.selectionEnd === null ? value.length : selectionRange.selectionEnd;
      const prologEnd = Math.max(0, selectionStart === selectionEnd && deleteContent === "backward" ? selectionStart - 1 : selectionStart);
      const prolog = value.substring(0, prologEnd);
      const epilogStart = Math.min(value.length, selectionStart === selectionEnd && deleteContent === "forward" ? selectionEnd + 1 : selectionEnd);
      const epilog = value.substring(epilogStart, value.length);
      let newValue = `${prolog}${newEntry}${epilog}`;
      const newSelectionStart = prologEnd + newEntry.length;
      if (element.type === "date" && !(0, _isValidDateValue.isValidDateValue)(element, newValue)) {
        newValue = value;
      }
      if (element.type === "time" && !(0, _isValidInputTimeValue.isValidInputTimeValue)(element, newValue)) {
        if ((0, _isValidInputTimeValue.isValidInputTimeValue)(element, newEntry)) {
          newValue = newEntry;
        } else {
          newValue = value;
        }
      }
      return {
        newValue,
        newSelectionStart
      };
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/cursorPosition.js
var require_cursorPosition = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/cursorPosition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isCursorAtEnd = isCursorAtEnd;
    exports.isCursorAtStart = isCursorAtStart;
    var _selectionRange = require_selectionRange();
    var _getValue2 = require_getValue();
    function isCursorAtEnd(element) {
      var _getValue;
      const {
        selectionStart,
        selectionEnd
      } = (0, _selectionRange.getSelectionRange)(element);
      return selectionStart === selectionEnd && (selectionStart != null ? selectionStart : (
        /* istanbul ignore next */
        0
      )) === ((_getValue = (0, _getValue2.getValue)(element)) != null ? _getValue : (
        /* istanbul ignore next */
        ""
      )).length;
    }
    function isCursorAtStart(element) {
      const {
        selectionStart,
        selectionEnd
      } = (0, _selectionRange.getSelectionRange)(element);
      return selectionStart === selectionEnd && (selectionStart != null ? selectionStart : (
        /* istanbul ignore next */
        0
      )) === 0;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/hasUnreliableEmptyValue.js
var require_hasUnreliableEmptyValue = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/hasUnreliableEmptyValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.hasUnreliableEmptyValue = hasUnreliableEmptyValue;
    var _isElementType = require_isElementType();
    var unreliableValueInputTypes;
    (function(unreliableValueInputTypes2) {
      unreliableValueInputTypes2["number"] = "number";
    })(unreliableValueInputTypes || (unreliableValueInputTypes = {}));
    function hasUnreliableEmptyValue(element) {
      return (0, _isElementType.isElementType)(element, "input") && Boolean(unreliableValueInputTypes[element.type]);
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/isEditable.js
var require_isEditable = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/isEditable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.editableInputTypes = void 0;
    exports.isEditable = isEditable;
    exports.isEditableInput = isEditableInput;
    var _isElementType = require_isElementType();
    var _isContentEditable = require_isContentEditable();
    function isEditable(element) {
      return isEditableInput(element) || (0, _isElementType.isElementType)(element, "textarea", {
        readOnly: false
      }) || (0, _isContentEditable.isContentEditable)(element);
    }
    var editableInputTypes;
    exports.editableInputTypes = editableInputTypes;
    (function(editableInputTypes2) {
      editableInputTypes2["text"] = "text";
      editableInputTypes2["date"] = "date";
      editableInputTypes2["datetime-local"] = "datetime-local";
      editableInputTypes2["email"] = "email";
      editableInputTypes2["month"] = "month";
      editableInputTypes2["number"] = "number";
      editableInputTypes2["password"] = "password";
      editableInputTypes2["search"] = "search";
      editableInputTypes2["tel"] = "tel";
      editableInputTypes2["time"] = "time";
      editableInputTypes2["url"] = "url";
      editableInputTypes2["week"] = "week";
    })(editableInputTypes || (exports.editableInputTypes = editableInputTypes = {}));
    function isEditableInput(element) {
      return (0, _isElementType.isElementType)(element, "input", {
        readOnly: false
      }) && Boolean(editableInputTypes[element.type]);
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/edit/maxLength.js
var require_maxLength = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/edit/maxLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getSpaceUntilMaxLength = getSpaceUntilMaxLength;
    var _isElementType = require_isElementType();
    var _getValue = require_getValue();
    var maxLengthSupportedTypes;
    (function(maxLengthSupportedTypes2) {
      maxLengthSupportedTypes2["email"] = "email";
      maxLengthSupportedTypes2["password"] = "password";
      maxLengthSupportedTypes2["search"] = "search";
      maxLengthSupportedTypes2["telephone"] = "telephone";
      maxLengthSupportedTypes2["text"] = "text";
      maxLengthSupportedTypes2["url"] = "url";
    })(maxLengthSupportedTypes || (maxLengthSupportedTypes = {}));
    function getSpaceUntilMaxLength(element) {
      const value = (0, _getValue.getValue)(element);
      if (value === null) {
        return void 0;
      }
      const maxLength = getSanitizedMaxLength(element);
      return maxLength ? maxLength - value.length : void 0;
    }
    function getSanitizedMaxLength(element) {
      var _element$getAttribute;
      if (!supportsMaxLength(element)) {
        return void 0;
      }
      const attr = (_element$getAttribute = element.getAttribute("maxlength")) != null ? _element$getAttribute : "";
      return /^\d+$/.test(attr) && Number(attr) >= 0 ? Number(attr) : void 0;
    }
    function supportsMaxLength(element) {
      return (0, _isElementType.isElementType)(element, "textarea") || (0, _isElementType.isElementType)(element, "input") && Boolean(maxLengthSupportedTypes[element.type]);
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/isDisabled.js
var require_isDisabled = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/isDisabled.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isDisabled = isDisabled;
    function isDisabled(element) {
      return Boolean(element && element.disabled);
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/focus/getActiveElement.js
var require_getActiveElement = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/focus/getActiveElement.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getActiveElement = getActiveElement;
    var _isDisabled = require_isDisabled();
    function getActiveElement(document2) {
      const activeElement = document2.activeElement;
      if (activeElement != null && activeElement.shadowRoot) {
        return getActiveElement(activeElement.shadowRoot);
      } else {
        if ((0, _isDisabled.isDisabled)(activeElement)) {
          return document2.ownerDocument ? (
            // TODO: verify behavior in ShadowRoot
            /* istanbul ignore next */
            document2.ownerDocument.body
          ) : document2.body;
        }
        return activeElement;
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/isLabelWithInternallyDisabledControl.js
var require_isLabelWithInternallyDisabledControl = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/isLabelWithInternallyDisabledControl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isLabelWithInternallyDisabledControl = isLabelWithInternallyDisabledControl;
    var _isDisabled = require_isDisabled();
    var _isElementType = require_isElementType();
    function isLabelWithInternallyDisabledControl(element) {
      if (!(0, _isElementType.isElementType)(element, "label")) {
        return false;
      }
      const control = element.control;
      return Boolean(control && element.contains(control) && (0, _isDisabled.isDisabled)(control));
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/focus/selector.js
var require_selector = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/focus/selector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FOCUSABLE_SELECTOR = void 0;
    var FOCUSABLE_SELECTOR = ["input:not([type=hidden]):not([disabled])", "button:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", '[contenteditable=""]', '[contenteditable="true"]', "a[href]", "[tabindex]:not([disabled])"].join(", ");
    exports.FOCUSABLE_SELECTOR = FOCUSABLE_SELECTOR;
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/focus/isFocusable.js
var require_isFocusable = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/focus/isFocusable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isFocusable = isFocusable;
    var _isLabelWithInternallyDisabledControl = require_isLabelWithInternallyDisabledControl();
    var _selector = require_selector();
    function isFocusable(element) {
      return !(0, _isLabelWithInternallyDisabledControl.isLabelWithInternallyDisabledControl)(element) && element.matches(_selector.FOCUSABLE_SELECTOR);
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/eventWrapper.js
var require_eventWrapper = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/eventWrapper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.eventWrapper = eventWrapper;
    var _dom = require_dist2();
    function eventWrapper(cb) {
      let result;
      (0, _dom.getConfig)().eventWrapper(() => {
        result = cb();
      });
      return result;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/isVisible.js
var require_isVisible = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/isVisible.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isVisible = isVisible;
    var _helpers = require_helpers();
    function isVisible(element) {
      const window2 = (0, _helpers.getWindowFromNode)(element);
      for (let el = element; (_el = el) != null && _el.ownerDocument; el = el.parentElement) {
        var _el;
        const display = window2.getComputedStyle(el).display;
        if (display === "none") {
          return false;
        }
      }
      return true;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/isDocument.js
var require_isDocument = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/isDocument.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isDocument = isDocument;
    function isDocument(el) {
      return el.nodeType === el.DOCUMENT_NODE;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/wait.js
var require_wait = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/wait.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.wait = wait;
    function wait(time) {
      return new Promise((resolve) => setTimeout(() => resolve(), time));
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/hasPointerEvents.js
var require_hasPointerEvents = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/hasPointerEvents.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.hasPointerEvents = hasPointerEvents;
    var _helpers = require_helpers();
    function hasPointerEvents(element) {
      const window2 = (0, _helpers.getWindowFromNode)(element);
      for (let el = element; (_el = el) != null && _el.ownerDocument; el = el.parentElement) {
        var _el;
        const pointerEvents = window2.getComputedStyle(el).pointerEvents;
        if (pointerEvents && !["inherit", "unset"].includes(pointerEvents)) {
          return pointerEvents !== "none";
        }
      }
      return true;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/misc/hasFormSubmit.js
var require_hasFormSubmit = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/misc/hasFormSubmit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.hasFormSubmit = void 0;
    var hasFormSubmit = (form) => !!(form && (form.querySelector('input[type="submit"]') || form.querySelector('button[type="submit"]')));
    exports.hasFormSubmit = hasFormSubmit;
  }
});

// ../../node_modules/@testing-library/user-event/dist/utils/index.js
var require_utils = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _getMouseEventOptions = require_getMouseEventOptions();
    Object.keys(_getMouseEventOptions).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _getMouseEventOptions[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _getMouseEventOptions[key];
        }
      });
    });
    var _isClickableInput = require_isClickableInput();
    Object.keys(_isClickableInput).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isClickableInput[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isClickableInput[key];
        }
      });
    });
    var _buildTimeValue = require_buildTimeValue();
    Object.keys(_buildTimeValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _buildTimeValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _buildTimeValue[key];
        }
      });
    });
    var _calculateNewValue = require_calculateNewValue();
    Object.keys(_calculateNewValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _calculateNewValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _calculateNewValue[key];
        }
      });
    });
    var _cursorPosition = require_cursorPosition();
    Object.keys(_cursorPosition).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _cursorPosition[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _cursorPosition[key];
        }
      });
    });
    var _getValue = require_getValue();
    Object.keys(_getValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _getValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _getValue[key];
        }
      });
    });
    var _hasUnreliableEmptyValue = require_hasUnreliableEmptyValue();
    Object.keys(_hasUnreliableEmptyValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _hasUnreliableEmptyValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _hasUnreliableEmptyValue[key];
        }
      });
    });
    var _isContentEditable = require_isContentEditable();
    Object.keys(_isContentEditable).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isContentEditable[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isContentEditable[key];
        }
      });
    });
    var _isEditable = require_isEditable();
    Object.keys(_isEditable).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isEditable[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isEditable[key];
        }
      });
    });
    var _isValidDateValue = require_isValidDateValue();
    Object.keys(_isValidDateValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isValidDateValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isValidDateValue[key];
        }
      });
    });
    var _isValidInputTimeValue = require_isValidInputTimeValue();
    Object.keys(_isValidInputTimeValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isValidInputTimeValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isValidInputTimeValue[key];
        }
      });
    });
    var _maxLength = require_maxLength();
    Object.keys(_maxLength).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _maxLength[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _maxLength[key];
        }
      });
    });
    var _selectionRange = require_selectionRange();
    Object.keys(_selectionRange).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _selectionRange[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _selectionRange[key];
        }
      });
    });
    var _getActiveElement = require_getActiveElement();
    Object.keys(_getActiveElement).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _getActiveElement[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _getActiveElement[key];
        }
      });
    });
    var _isFocusable = require_isFocusable();
    Object.keys(_isFocusable).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isFocusable[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isFocusable[key];
        }
      });
    });
    var _selector = require_selector();
    Object.keys(_selector).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _selector[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _selector[key];
        }
      });
    });
    var _eventWrapper = require_eventWrapper();
    Object.keys(_eventWrapper).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _eventWrapper[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _eventWrapper[key];
        }
      });
    });
    var _isElementType = require_isElementType();
    Object.keys(_isElementType).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isElementType[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isElementType[key];
        }
      });
    });
    var _isLabelWithInternallyDisabledControl = require_isLabelWithInternallyDisabledControl();
    Object.keys(_isLabelWithInternallyDisabledControl).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isLabelWithInternallyDisabledControl[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isLabelWithInternallyDisabledControl[key];
        }
      });
    });
    var _isVisible = require_isVisible();
    Object.keys(_isVisible).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isVisible[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isVisible[key];
        }
      });
    });
    var _isDisabled = require_isDisabled();
    Object.keys(_isDisabled).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isDisabled[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isDisabled[key];
        }
      });
    });
    var _isDocument = require_isDocument();
    Object.keys(_isDocument).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _isDocument[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _isDocument[key];
        }
      });
    });
    var _wait = require_wait();
    Object.keys(_wait).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _wait[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _wait[key];
        }
      });
    });
    var _hasPointerEvents = require_hasPointerEvents();
    Object.keys(_hasPointerEvents).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _hasPointerEvents[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _hasPointerEvents[key];
        }
      });
    });
    var _hasFormSubmit = require_hasFormSubmit();
    Object.keys(_hasFormSubmit).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _hasFormSubmit[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _hasFormSubmit[key];
        }
      });
    });
  }
});

// ../../node_modules/@testing-library/user-event/dist/hover.js
var require_hover = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/hover.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.hover = hover;
    exports.unhover = unhover;
    var _dom = require_dist2();
    var _utils = require_utils();
    function getParentElements(element) {
      const parentElements = [element];
      let currentElement = element;
      while ((currentElement = currentElement.parentElement) != null) {
        parentElements.push(currentElement);
      }
      return parentElements;
    }
    function hover(element, init, {
      skipPointerEventsCheck = false
    } = {}) {
      if (!skipPointerEventsCheck && !(0, _utils.hasPointerEvents)(element)) {
        throw new Error('unable to hover element as it has or inherits pointer-events set to "none".');
      }
      if ((0, _utils.isLabelWithInternallyDisabledControl)(element))
        return;
      const parentElements = getParentElements(element).reverse();
      _dom.fireEvent.pointerOver(element, init);
      for (const el of parentElements) {
        _dom.fireEvent.pointerEnter(el, init);
      }
      if (!(0, _utils.isDisabled)(element)) {
        _dom.fireEvent.mouseOver(element, (0, _utils.getMouseEventOptions)("mouseover", init));
        for (const el of parentElements) {
          _dom.fireEvent.mouseEnter(el, (0, _utils.getMouseEventOptions)("mouseenter", init));
        }
      }
      _dom.fireEvent.pointerMove(element, init);
      if (!(0, _utils.isDisabled)(element)) {
        _dom.fireEvent.mouseMove(element, (0, _utils.getMouseEventOptions)("mousemove", init));
      }
    }
    function unhover(element, init, {
      skipPointerEventsCheck = false
    } = {}) {
      if (!skipPointerEventsCheck && !(0, _utils.hasPointerEvents)(element)) {
        throw new Error('unable to unhover element as it has or inherits pointer-events set to "none".');
      }
      if ((0, _utils.isLabelWithInternallyDisabledControl)(element))
        return;
      const parentElements = getParentElements(element);
      _dom.fireEvent.pointerMove(element, init);
      if (!(0, _utils.isDisabled)(element)) {
        _dom.fireEvent.mouseMove(element, (0, _utils.getMouseEventOptions)("mousemove", init));
      }
      _dom.fireEvent.pointerOut(element, init);
      for (const el of parentElements) {
        _dom.fireEvent.pointerLeave(el, init);
      }
      if (!(0, _utils.isDisabled)(element)) {
        _dom.fireEvent.mouseOut(element, (0, _utils.getMouseEventOptions)("mouseout", init));
        for (const el of parentElements) {
          _dom.fireEvent.mouseLeave(el, (0, _utils.getMouseEventOptions)("mouseleave", init));
        }
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/blur.js
var require_blur = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/blur.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.blur = blur;
    var _utils = require_utils();
    function blur(element) {
      if (!(0, _utils.isFocusable)(element))
        return;
      const wasActive = (0, _utils.getActiveElement)(element.ownerDocument) === element;
      if (!wasActive)
        return;
      (0, _utils.eventWrapper)(() => element.blur());
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/focus.js
var require_focus = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/focus.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.focus = focus;
    var _utils = require_utils();
    function focus(element) {
      if (!(0, _utils.isFocusable)(element))
        return;
      const isAlreadyActive = (0, _utils.getActiveElement)(element.ownerDocument) === element;
      if (isAlreadyActive)
        return;
      (0, _utils.eventWrapper)(() => element.focus());
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/click.js
var require_click = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/click.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.click = click;
    exports.dblClick = dblClick;
    var _dom = require_dist2();
    var _utils = require_utils();
    var _hover = require_hover();
    var _blur = require_blur();
    var _focus = require_focus();
    function getPreviouslyFocusedElement(element) {
      const focusedElement = element.ownerDocument.activeElement;
      const wasAnotherElementFocused = focusedElement && focusedElement !== element.ownerDocument.body && focusedElement !== element;
      return wasAnotherElementFocused ? focusedElement : null;
    }
    function clickLabel(label, init, {
      clickCount
    }) {
      if ((0, _utils.isLabelWithInternallyDisabledControl)(label))
        return;
      _dom.fireEvent.pointerDown(label, init);
      _dom.fireEvent.mouseDown(label, (0, _utils.getMouseEventOptions)("mousedown", init, clickCount));
      _dom.fireEvent.pointerUp(label, init);
      _dom.fireEvent.mouseUp(label, (0, _utils.getMouseEventOptions)("mouseup", init, clickCount));
      fireClick(label, (0, _utils.getMouseEventOptions)("click", init, clickCount));
      if (label.control)
        (0, _focus.focus)(label.control);
    }
    function clickBooleanElement(element, init, {
      clickCount
    }) {
      _dom.fireEvent.pointerDown(element, init);
      if (!element.disabled) {
        _dom.fireEvent.mouseDown(element, (0, _utils.getMouseEventOptions)("mousedown", init, clickCount));
      }
      (0, _focus.focus)(element);
      _dom.fireEvent.pointerUp(element, init);
      if (!element.disabled) {
        _dom.fireEvent.mouseUp(element, (0, _utils.getMouseEventOptions)("mouseup", init, clickCount));
        fireClick(element, (0, _utils.getMouseEventOptions)("click", init, clickCount));
      }
    }
    function clickElement(element, init, {
      clickCount
    }) {
      const previousElement = getPreviouslyFocusedElement(element);
      _dom.fireEvent.pointerDown(element, init);
      if (!(0, _utils.isDisabled)(element)) {
        const continueDefaultHandling = _dom.fireEvent.mouseDown(element, (0, _utils.getMouseEventOptions)("mousedown", init, clickCount));
        if (continueDefaultHandling) {
          const closestFocusable = findClosest(element, _utils.isFocusable);
          if (previousElement && !closestFocusable) {
            (0, _blur.blur)(previousElement);
          } else if (closestFocusable) {
            (0, _focus.focus)(closestFocusable);
          }
        }
      }
      _dom.fireEvent.pointerUp(element, init);
      if (!(0, _utils.isDisabled)(element)) {
        _dom.fireEvent.mouseUp(element, (0, _utils.getMouseEventOptions)("mouseup", init, clickCount));
        fireClick(element, (0, _utils.getMouseEventOptions)("click", init, clickCount));
        const parentLabel = element.closest("label");
        if (parentLabel != null && parentLabel.control)
          (0, _focus.focus)(parentLabel.control);
      }
    }
    function findClosest(element, callback) {
      let el = element;
      do {
        if (callback(el)) {
          return el;
        }
        el = el.parentElement;
      } while (el && el !== element.ownerDocument.body);
      return void 0;
    }
    function click(element, init, {
      skipHover = false,
      clickCount = 0,
      skipPointerEventsCheck = false
    } = {}) {
      if (!skipPointerEventsCheck && !(0, _utils.hasPointerEvents)(element)) {
        throw new Error('unable to click element as it has or inherits pointer-events set to "none".');
      }
      if (!skipHover)
        (0, _hover.hover)(element, init, {
          skipPointerEventsCheck: true
        });
      if ((0, _utils.isElementType)(element, "label")) {
        clickLabel(element, init, {
          clickCount
        });
      } else if ((0, _utils.isElementType)(element, "input")) {
        if (element.type === "checkbox" || element.type === "radio") {
          clickBooleanElement(element, init, {
            clickCount
          });
        } else {
          clickElement(element, init, {
            clickCount
          });
        }
      } else {
        clickElement(element, init, {
          clickCount
        });
      }
    }
    function fireClick(element, mouseEventOptions) {
      if (mouseEventOptions.button === 2) {
        _dom.fireEvent.contextMenu(element, mouseEventOptions);
      } else {
        _dom.fireEvent.click(element, mouseEventOptions);
      }
    }
    function dblClick(element, init, {
      skipPointerEventsCheck = false
    } = {}) {
      if (!skipPointerEventsCheck && !(0, _utils.hasPointerEvents)(element)) {
        throw new Error('unable to double-click element as it has or inherits pointer-events set to "none".');
      }
      (0, _hover.hover)(element, init, {
        skipPointerEventsCheck
      });
      click(element, init, {
        skipHover: true,
        clickCount: 0,
        skipPointerEventsCheck
      });
      click(element, init, {
        skipHover: true,
        clickCount: 1,
        skipPointerEventsCheck
      });
      _dom.fireEvent.dblClick(element, (0, _utils.getMouseEventOptions)("dblclick", init, 2));
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/getNextKeyDef.js
var require_getNextKeyDef = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/getNextKeyDef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getNextKeyDef = getNextKeyDef;
    var bracketDict;
    (function(bracketDict2) {
      bracketDict2["{"] = "}";
      bracketDict2["["] = "]";
    })(bracketDict || (bracketDict = {}));
    var legacyModifiers;
    (function(legacyModifiers2) {
      legacyModifiers2["alt"] = "alt";
      legacyModifiers2["ctrl"] = "ctrl";
      legacyModifiers2["meta"] = "meta";
      legacyModifiers2["shift"] = "shift";
    })(legacyModifiers || (legacyModifiers = {}));
    var legacyKeyMap;
    (function(legacyKeyMap2) {
      legacyKeyMap2["ctrl"] = "Control";
      legacyKeyMap2["del"] = "Delete";
      legacyKeyMap2["esc"] = "Escape";
      legacyKeyMap2["space"] = " ";
    })(legacyKeyMap || (legacyKeyMap = {}));
    function getNextKeyDef(text, options) {
      var _options$keyboardMap$;
      const {
        type,
        descriptor,
        consumedLength,
        releasePrevious,
        releaseSelf,
        repeat
      } = readNextDescriptor(text);
      const keyDef = (_options$keyboardMap$ = options.keyboardMap.find((def) => {
        if (type === "[") {
          var _def$code;
          return ((_def$code = def.code) == null ? void 0 : _def$code.toLowerCase()) === descriptor.toLowerCase();
        } else if (type === "{") {
          var _def$key;
          const key = mapLegacyKey(descriptor);
          return ((_def$key = def.key) == null ? void 0 : _def$key.toLowerCase()) === key.toLowerCase();
        }
        return def.key === descriptor;
      })) != null ? _options$keyboardMap$ : {
        key: "Unknown",
        code: "Unknown",
        [type === "[" ? "code" : "key"]: descriptor
      };
      return {
        keyDef,
        consumedLength,
        releasePrevious,
        releaseSelf,
        repeat
      };
    }
    function readNextDescriptor(text) {
      let pos = 0;
      const startBracket = text[pos] in bracketDict ? text[pos] : "";
      pos += startBracket.length;
      const startBracketRepeated = startBracket ? text.match(new RegExp(`^\\${startBracket}+`))[0].length : 0;
      const isEscapedChar = startBracketRepeated === 2 || startBracket === "{" && startBracketRepeated > 3;
      const type = isEscapedChar ? "" : startBracket;
      return {
        type,
        ...type === "" ? readPrintableChar(text, pos) : readTag(text, pos, type)
      };
    }
    function readPrintableChar(text, pos) {
      const descriptor = text[pos];
      assertDescriptor(descriptor, text, pos);
      pos += descriptor.length;
      return {
        consumedLength: pos,
        descriptor,
        releasePrevious: false,
        releaseSelf: true,
        repeat: 1
      };
    }
    function readTag(text, pos, startBracket) {
      var _text$slice$match, _text$slice$match$, _text$slice$match2;
      const releasePreviousModifier = text[pos] === "/" ? "/" : "";
      pos += releasePreviousModifier.length;
      const descriptor = (_text$slice$match = text.slice(pos).match(/^\w+/)) == null ? void 0 : _text$slice$match[0];
      assertDescriptor(descriptor, text, pos);
      pos += descriptor.length;
      const repeatModifier = (_text$slice$match$ = (_text$slice$match2 = text.slice(pos).match(/^>\d+/)) == null ? void 0 : _text$slice$match2[0]) != null ? _text$slice$match$ : "";
      pos += repeatModifier.length;
      const releaseSelfModifier = text[pos] === "/" || !repeatModifier && text[pos] === ">" ? text[pos] : "";
      pos += releaseSelfModifier.length;
      const expectedEndBracket = bracketDict[startBracket];
      const endBracket = text[pos] === expectedEndBracket ? expectedEndBracket : "";
      if (!endBracket) {
        throw new Error(getErrorMessage([!repeatModifier && "repeat modifier", !releaseSelfModifier && "release modifier", `"${expectedEndBracket}"`].filter(Boolean).join(" or "), text[pos], text));
      }
      pos += endBracket.length;
      return {
        consumedLength: pos,
        descriptor,
        releasePrevious: !!releasePreviousModifier,
        repeat: repeatModifier ? Math.max(Number(repeatModifier.substr(1)), 1) : 1,
        releaseSelf: hasReleaseSelf(startBracket, descriptor, releaseSelfModifier, repeatModifier)
      };
    }
    function assertDescriptor(descriptor, text, pos) {
      if (!descriptor) {
        throw new Error(getErrorMessage("key descriptor", text[pos], text));
      }
    }
    function getEnumValue(f, key) {
      return f[key];
    }
    function hasReleaseSelf(startBracket, descriptor, releaseSelfModifier, repeatModifier) {
      if (releaseSelfModifier) {
        return releaseSelfModifier === "/";
      }
      if (repeatModifier) {
        return false;
      }
      if (startBracket === "{" && getEnumValue(legacyModifiers, descriptor.toLowerCase())) {
        return false;
      }
      return true;
    }
    function mapLegacyKey(descriptor) {
      var _getEnumValue;
      return (_getEnumValue = getEnumValue(legacyKeyMap, descriptor)) != null ? _getEnumValue : descriptor;
    }
    function getErrorMessage(expected, found, text) {
      return `Expected ${expected} but found "${found != null ? found : ""}" in "${text}"
    See https://github.com/testing-library/user-event/blob/main/README.md#keyboardtext-options
    for more information about how userEvent parses your input.`;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/plugins/arrow.js
var require_arrow = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/plugins/arrow.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.keydownBehavior = void 0;
    var _utils = require_utils();
    var keydownBehavior = [{
      // TODO: implement for contentEditable
      matches: (keyDef, element) => (keyDef.key === "ArrowLeft" || keyDef.key === "ArrowRight") && (0, _utils.isElementType)(element, ["input", "textarea"]),
      handle: (keyDef, element) => {
        var _ref;
        const {
          selectionStart,
          selectionEnd
        } = (0, _utils.getSelectionRange)(element);
        const direction = keyDef.key === "ArrowLeft" ? -1 : 1;
        const newPos = (_ref = selectionStart === selectionEnd ? (selectionStart != null ? selectionStart : (
          /* istanbul ignore next */
          0
        )) + direction : direction < 0 ? selectionStart : selectionEnd) != null ? _ref : (
          /* istanbul ignore next */
          0
        );
        (0, _utils.setSelectionRange)(element, newPos, newPos);
      }
    }];
    exports.keydownBehavior = keydownBehavior;
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/shared/carryValue.js
var require_carryValue = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/shared/carryValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.carryValue = carryValue;
    var _utils = require_utils();
    function carryValue(element, state, newValue) {
      const value = (0, _utils.getValue)(element);
      state.carryValue = value !== newValue && value === "" && (0, _utils.hasUnreliableEmptyValue)(element) ? newValue : void 0;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/shared/fireChangeForInputTimeIfValid.js
var require_fireChangeForInputTimeIfValid = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/shared/fireChangeForInputTimeIfValid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.fireChangeForInputTimeIfValid = fireChangeForInputTimeIfValid;
    var _dom = require_dist2();
    var _utils = require_utils();
    function fireChangeForInputTimeIfValid(el, prevValue, timeNewEntry) {
      if ((0, _utils.isValidInputTimeValue)(el, timeNewEntry) && prevValue !== timeNewEntry) {
        _dom.fireEvent.change(el, {
          target: {
            value: timeNewEntry
          }
        });
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/shared/fireInputEvent.js
var require_fireInputEvent = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/shared/fireInputEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.fireInputEvent = fireInputEvent;
    var _dom = require_dist2();
    var _utils = require_utils();
    function fireInputEvent(element, {
      newValue,
      newSelectionStart,
      eventOverrides
    }) {
      if ((0, _utils.isContentEditable)(element)) {
        applyNative(element, "textContent", newValue);
      } else if ((0, _utils.isElementType)(element, ["input", "textarea"])) {
        applyNative(element, "value", newValue);
      } else {
        throw new Error("Invalid Element");
      }
      setSelectionRangeAfterInput(element, newSelectionStart);
      _dom.fireEvent.input(element, {
        ...eventOverrides
      });
      setSelectionRangeAfterInputHandler(element, newValue, newSelectionStart);
    }
    function setSelectionRangeAfterInput(element, newSelectionStart) {
      (0, _utils.setSelectionRange)(element, newSelectionStart, newSelectionStart);
    }
    function setSelectionRangeAfterInputHandler(element, newValue, newSelectionStart) {
      const value = (0, _utils.getValue)(element);
      const isUnreliableValue = value === "" && (0, _utils.hasUnreliableEmptyValue)(element);
      if (!isUnreliableValue && value === newValue) {
        const {
          selectionStart
        } = (0, _utils.getSelectionRange)(element);
        if (selectionStart === value.length) {
          (0, _utils.setSelectionRange)(element, newSelectionStart, newSelectionStart);
        }
      }
    }
    var initial = Symbol("initial input value/textContent");
    var onBlur = Symbol("onBlur");
    function applyNative(element, propName, propValue) {
      const descriptor = Object.getOwnPropertyDescriptor(element, propName);
      const nativeDescriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, propName);
      if (descriptor && nativeDescriptor) {
        Object.defineProperty(element, propName, nativeDescriptor);
      }
      if (element[initial] === void 0) {
        element[initial] = String(element[propName]);
      }
      element[propName] = propValue;
      if (!element[onBlur]) {
        var _element$ownerDocumen;
        (_element$ownerDocumen = element.ownerDocument.defaultView) == null ? void 0 : _element$ownerDocumen.addEventListener("blur", element[onBlur] = () => {
          const initV = element[initial];
          delete element[onBlur];
          delete element[initial];
          if (String(element[propName]) !== initV) {
            _dom.fireEvent.change(element);
          }
        }, {
          capture: true,
          once: true
        });
      }
      if (descriptor) {
        Object.defineProperty(element, propName, descriptor);
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/shared/index.js
var require_shared = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/shared/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _carryValue = require_carryValue();
    Object.keys(_carryValue).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _carryValue[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _carryValue[key];
        }
      });
    });
    var _fireChangeForInputTimeIfValid = require_fireChangeForInputTimeIfValid();
    Object.keys(_fireChangeForInputTimeIfValid).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _fireChangeForInputTimeIfValid[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _fireChangeForInputTimeIfValid[key];
        }
      });
    });
    var _fireInputEvent = require_fireInputEvent();
    Object.keys(_fireInputEvent).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _fireInputEvent[key])
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _fireInputEvent[key];
        }
      });
    });
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/plugins/control.js
var require_control = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/plugins/control.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.keydownBehavior = void 0;
    var _utils = require_utils();
    var _shared = require_shared();
    var keydownBehavior = [{
      matches: (keyDef, element) => (keyDef.key === "Home" || keyDef.key === "End") && ((0, _utils.isElementType)(element, ["input", "textarea"]) || (0, _utils.isContentEditable)(element)),
      handle: (keyDef, element) => {
        if (keyDef.key === "Home") {
          (0, _utils.setSelectionRange)(element, 0, 0);
        } else {
          var _getValue$length, _getValue;
          const newPos = (_getValue$length = (_getValue = (0, _utils.getValue)(element)) == null ? void 0 : _getValue.length) != null ? _getValue$length : (
            /* istanbul ignore next */
            0
          );
          (0, _utils.setSelectionRange)(element, newPos, newPos);
        }
      }
    }, {
      matches: (keyDef, element) => (keyDef.key === "PageUp" || keyDef.key === "PageDown") && (0, _utils.isElementType)(element, ["input"]),
      handle: (keyDef, element) => {
        if (keyDef.key === "PageUp") {
          (0, _utils.setSelectionRange)(element, 0, 0);
        } else {
          var _getValue$length2, _getValue2;
          const newPos = (_getValue$length2 = (_getValue2 = (0, _utils.getValue)(element)) == null ? void 0 : _getValue2.length) != null ? _getValue$length2 : (
            /* istanbul ignore next */
            0
          );
          (0, _utils.setSelectionRange)(element, newPos, newPos);
        }
      }
    }, {
      matches: (keyDef, element) => keyDef.key === "Delete" && (0, _utils.isEditable)(element) && !(0, _utils.isCursorAtEnd)(element),
      handle: (keDef, element, options, state) => {
        const {
          newValue,
          newSelectionStart
        } = (0, _utils.calculateNewValue)("", element, state.carryValue, void 0, "forward");
        (0, _shared.fireInputEvent)(element, {
          newValue,
          newSelectionStart,
          eventOverrides: {
            inputType: "deleteContentForward"
          }
        });
        (0, _shared.carryValue)(element, state, newValue);
      }
    }];
    exports.keydownBehavior = keydownBehavior;
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/plugins/character.js
var require_character = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/plugins/character.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.keypressBehavior = void 0;
    var _dom = require_dist2();
    var _shared = require_shared();
    var _utils = require_utils();
    var keypressBehavior = [{
      matches: (keyDef, element) => {
        var _keyDef$key;
        return ((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 && (0, _utils.isElementType)(element, "input", {
          type: "time",
          readOnly: false
        });
      },
      handle: (keyDef, element, options, state) => {
        var _state$carryValue;
        let newEntry = keyDef.key;
        const textToBeTyped = ((_state$carryValue = state.carryValue) != null ? _state$carryValue : "") + newEntry;
        const timeNewEntry = (0, _utils.buildTimeValue)(textToBeTyped);
        if ((0, _utils.isValidInputTimeValue)(element, timeNewEntry)) {
          newEntry = timeNewEntry;
        }
        const {
          newValue,
          newSelectionStart
        } = (0, _utils.calculateNewValue)(newEntry, element);
        const prevValue = (0, _utils.getValue)(element);
        if (prevValue !== newValue) {
          (0, _shared.fireInputEvent)(element, {
            newValue,
            newSelectionStart,
            eventOverrides: {
              data: keyDef.key,
              inputType: "insertText"
            }
          });
        }
        (0, _shared.fireChangeForInputTimeIfValid)(element, prevValue, timeNewEntry);
        state.carryValue = textToBeTyped;
      }
    }, {
      matches: (keyDef, element) => {
        var _keyDef$key2;
        return ((_keyDef$key2 = keyDef.key) == null ? void 0 : _keyDef$key2.length) === 1 && (0, _utils.isElementType)(element, "input", {
          type: "date",
          readOnly: false
        });
      },
      handle: (keyDef, element, options, state) => {
        var _state$carryValue2;
        let newEntry = keyDef.key;
        const textToBeTyped = ((_state$carryValue2 = state.carryValue) != null ? _state$carryValue2 : "") + newEntry;
        const isValidToBeTyped = (0, _utils.isValidDateValue)(element, textToBeTyped);
        if (isValidToBeTyped) {
          newEntry = textToBeTyped;
        }
        const {
          newValue,
          newSelectionStart
        } = (0, _utils.calculateNewValue)(newEntry, element);
        const prevValue = (0, _utils.getValue)(element);
        if (prevValue !== newValue) {
          (0, _shared.fireInputEvent)(element, {
            newValue,
            newSelectionStart,
            eventOverrides: {
              data: keyDef.key,
              inputType: "insertText"
            }
          });
        }
        if (isValidToBeTyped) {
          _dom.fireEvent.change(element, {
            target: {
              value: textToBeTyped
            }
          });
        }
        state.carryValue = textToBeTyped;
      }
    }, {
      matches: (keyDef, element) => {
        var _keyDef$key3;
        return ((_keyDef$key3 = keyDef.key) == null ? void 0 : _keyDef$key3.length) === 1 && (0, _utils.isElementType)(element, "input", {
          type: "number",
          readOnly: false
        });
      },
      handle: (keyDef, element, options, state) => {
        var _ref, _state$carryValue3, _newValue$match, _newValue$match2;
        if (!/[\d.\-e]/.test(keyDef.key)) {
          return;
        }
        const oldValue = (_ref = (_state$carryValue3 = state.carryValue) != null ? _state$carryValue3 : (0, _utils.getValue)(element)) != null ? _ref : (
          /* istanbul ignore next */
          ""
        );
        const {
          newValue,
          newSelectionStart
        } = (0, _utils.calculateNewValue)(keyDef.key, element, oldValue);
        const valueParts = newValue.split("e", 2);
        if (Number((_newValue$match = newValue.match(/-/g)) == null ? void 0 : _newValue$match.length) > 2 || Number((_newValue$match2 = newValue.match(/\./g)) == null ? void 0 : _newValue$match2.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1])) {
          return;
        }
        (0, _shared.fireInputEvent)(element, {
          newValue,
          newSelectionStart,
          eventOverrides: {
            data: keyDef.key,
            inputType: "insertText"
          }
        });
        const appliedValue = (0, _utils.getValue)(element);
        if (appliedValue === newValue) {
          state.carryValue = void 0;
        } else {
          state.carryValue = newValue;
        }
      }
    }, {
      matches: (keyDef, element) => {
        var _keyDef$key4;
        return ((_keyDef$key4 = keyDef.key) == null ? void 0 : _keyDef$key4.length) === 1 && ((0, _utils.isElementType)(element, ["input", "textarea"], {
          readOnly: false
        }) && !(0, _utils.isClickableInput)(element) || (0, _utils.isContentEditable)(element)) && (0, _utils.getSpaceUntilMaxLength)(element) !== 0;
      },
      handle: (keyDef, element) => {
        const {
          newValue,
          newSelectionStart
        } = (0, _utils.calculateNewValue)(keyDef.key, element);
        (0, _shared.fireInputEvent)(element, {
          newValue,
          newSelectionStart,
          eventOverrides: {
            data: keyDef.key,
            inputType: "insertText"
          }
        });
      }
    }, {
      matches: (keyDef, element) => keyDef.key === "Enter" && ((0, _utils.isElementType)(element, "textarea", {
        readOnly: false
      }) || (0, _utils.isContentEditable)(element)) && (0, _utils.getSpaceUntilMaxLength)(element) !== 0,
      handle: (keyDef, element, options, state) => {
        const {
          newValue,
          newSelectionStart
        } = (0, _utils.calculateNewValue)("\n", element);
        const inputType = (0, _utils.isContentEditable)(element) && !state.modifiers.shift ? "insertParagraph" : "insertLineBreak";
        (0, _shared.fireInputEvent)(element, {
          newValue,
          newSelectionStart,
          eventOverrides: {
            inputType
          }
        });
      }
    }];
    exports.keypressBehavior = keypressBehavior;
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/getEventProps.js
var require_getEventProps = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/getEventProps.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getKeyEventProps = getKeyEventProps;
    exports.getMouseEventProps = getMouseEventProps;
    function getKeyEventProps(keyDef, state) {
      var _keyDef$keyCode, _keyDef$key;
      return {
        key: keyDef.key,
        code: keyDef.code,
        altKey: state.modifiers.alt,
        ctrlKey: state.modifiers.ctrl,
        metaKey: state.modifiers.meta,
        shiftKey: state.modifiers.shift,
        /** @deprecated use code instead */
        keyCode: (_keyDef$keyCode = keyDef.keyCode) != null ? _keyDef$keyCode : (
          // istanbul ignore next
          ((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 ? keyDef.key.charCodeAt(0) : void 0
        )
      };
    }
    function getMouseEventProps(state) {
      return {
        altKey: state.modifiers.alt,
        ctrlKey: state.modifiers.ctrl,
        metaKey: state.modifiers.meta,
        shiftKey: state.modifiers.shift
      };
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/plugins/functional.js
var require_functional = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/plugins/functional.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.preKeyupBehavior = exports.preKeydownBehavior = exports.postKeyupBehavior = exports.keyupBehavior = exports.keypressBehavior = exports.keydownBehavior = void 0;
    var _dom = require_dist2();
    var _utils = require_utils();
    var _getEventProps = require_getEventProps();
    var _shared = require_shared();
    var modifierKeys = {
      Alt: "alt",
      Control: "ctrl",
      Shift: "shift",
      Meta: "meta"
    };
    var preKeydownBehavior = [
      // modifierKeys switch on the modifier BEFORE the keydown event
      ...Object.entries(modifierKeys).map(([key, modKey]) => ({
        matches: (keyDef) => keyDef.key === key,
        handle: (keyDef, element, options, state) => {
          state.modifiers[modKey] = true;
        }
      })),
      // AltGraph produces an extra keydown for Control
      // The modifier does not change
      {
        matches: (keyDef) => keyDef.key === "AltGraph",
        handle: (keyDef, element, options, state) => {
          var _options$keyboardMap$;
          const ctrlKeyDef = (_options$keyboardMap$ = options.keyboardMap.find((k) => k.key === "Control")) != null ? _options$keyboardMap$ : (
            /* istanbul ignore next */
            {
              key: "Control",
              code: "Control"
            }
          );
          _dom.fireEvent.keyDown(element, (0, _getEventProps.getKeyEventProps)(ctrlKeyDef, state));
        }
      }
    ];
    exports.preKeydownBehavior = preKeydownBehavior;
    var keydownBehavior = [{
      matches: (keyDef) => keyDef.key === "CapsLock",
      handle: (keyDef, element, options, state) => {
        state.modifiers.caps = !state.modifiers.caps;
      }
    }, {
      matches: (keyDef, element) => keyDef.key === "Backspace" && (0, _utils.isEditable)(element) && !(0, _utils.isCursorAtStart)(element),
      handle: (keyDef, element, options, state) => {
        const {
          newValue,
          newSelectionStart
        } = (0, _utils.calculateNewValue)("", element, state.carryValue, void 0, "backward");
        (0, _shared.fireInputEvent)(element, {
          newValue,
          newSelectionStart,
          eventOverrides: {
            inputType: "deleteContentBackward"
          }
        });
        (0, _shared.carryValue)(element, state, newValue);
      }
    }];
    exports.keydownBehavior = keydownBehavior;
    var keypressBehavior = [{
      matches: (keyDef, element) => keyDef.key === "Enter" && (0, _utils.isElementType)(element, "input") && ["checkbox", "radio"].includes(element.type),
      handle: (keyDef, element) => {
        const form = element.form;
        if ((0, _utils.hasFormSubmit)(form)) {
          _dom.fireEvent.submit(form);
        }
      }
    }, {
      matches: (keyDef, element) => keyDef.key === "Enter" && ((0, _utils.isClickableInput)(element) || // Links with href defined should handle Enter the same as a click
      (0, _utils.isElementType)(element, "a") && Boolean(element.href)),
      handle: (keyDef, element, options, state) => {
        _dom.fireEvent.click(element, (0, _getEventProps.getMouseEventProps)(state));
      }
    }, {
      matches: (keyDef, element) => keyDef.key === "Enter" && (0, _utils.isElementType)(element, "input"),
      handle: (keyDef, element) => {
        const form = element.form;
        if (form && (form.querySelectorAll("input").length === 1 || (0, _utils.hasFormSubmit)(form))) {
          _dom.fireEvent.submit(form);
        }
      }
    }];
    exports.keypressBehavior = keypressBehavior;
    var preKeyupBehavior = [
      // modifierKeys switch off the modifier BEFORE the keyup event
      ...Object.entries(modifierKeys).map(([key, modKey]) => ({
        matches: (keyDef) => keyDef.key === key,
        handle: (keyDef, element, options, state) => {
          state.modifiers[modKey] = false;
        }
      }))
    ];
    exports.preKeyupBehavior = preKeyupBehavior;
    var keyupBehavior = [{
      matches: (keyDef, element) => keyDef.key === " " && (0, _utils.isClickableInput)(element),
      handle: (keyDef, element, options, state) => {
        _dom.fireEvent.click(element, (0, _getEventProps.getMouseEventProps)(state));
      }
    }];
    exports.keyupBehavior = keyupBehavior;
    var postKeyupBehavior = [
      // AltGraph produces an extra keyup for Control
      // The modifier does not change
      {
        matches: (keyDef) => keyDef.key === "AltGraph",
        handle: (keyDef, element, options, state) => {
          var _options$keyboardMap$2;
          const ctrlKeyDef = (_options$keyboardMap$2 = options.keyboardMap.find((k) => k.key === "Control")) != null ? _options$keyboardMap$2 : (
            /* istanbul ignore next */
            {
              key: "Control",
              code: "Control"
            }
          );
          _dom.fireEvent.keyUp(element, (0, _getEventProps.getKeyEventProps)(ctrlKeyDef, state));
        }
      }
    ];
    exports.postKeyupBehavior = postKeyupBehavior;
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/plugins/index.js
var require_plugins = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/plugins/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.replaceBehavior = exports.preKeyupBehavior = exports.preKeydownBehavior = exports.postKeyupBehavior = exports.keyupBehavior = exports.keypressBehavior = exports.keydownBehavior = void 0;
    var _utils = require_utils();
    var arrowKeys = _interopRequireWildcard(require_arrow());
    var controlKeys = _interopRequireWildcard(require_control());
    var characterKeys = _interopRequireWildcard(require_character());
    var functionalKeys = _interopRequireWildcard(require_functional());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var replaceBehavior = [{
      matches: (keyDef, element) => keyDef.key === "selectall" && (0, _utils.isElementType)(element, ["input", "textarea"]),
      handle: (keyDef, element, options, state) => {
        var _state$carryValue;
        (0, _utils.setSelectionRange)(element, 0, ((_state$carryValue = state.carryValue) != null ? _state$carryValue : element.value).length);
      }
    }];
    exports.replaceBehavior = replaceBehavior;
    var preKeydownBehavior = [...functionalKeys.preKeydownBehavior];
    exports.preKeydownBehavior = preKeydownBehavior;
    var keydownBehavior = [...arrowKeys.keydownBehavior, ...controlKeys.keydownBehavior, ...functionalKeys.keydownBehavior];
    exports.keydownBehavior = keydownBehavior;
    var keypressBehavior = [...functionalKeys.keypressBehavior, ...characterKeys.keypressBehavior];
    exports.keypressBehavior = keypressBehavior;
    var preKeyupBehavior = [...functionalKeys.preKeyupBehavior];
    exports.preKeyupBehavior = preKeyupBehavior;
    var keyupBehavior = [...functionalKeys.keyupBehavior];
    exports.keyupBehavior = keyupBehavior;
    var postKeyupBehavior = [...functionalKeys.postKeyupBehavior];
    exports.postKeyupBehavior = postKeyupBehavior;
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/keyboardImplementation.js
var require_keyboardImplementation = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/keyboardImplementation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.keyboardImplementation = keyboardImplementation;
    exports.releaseAllKeys = releaseAllKeys;
    var _dom = require_dist2();
    var _utils = require_utils();
    var _getNextKeyDef = require_getNextKeyDef();
    var plugins = _interopRequireWildcard(require_plugins());
    var _getEventProps = require_getEventProps();
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    async function keyboardImplementation(text, options, state) {
      var _state$repeatKey;
      const {
        document: document2
      } = options;
      const getCurrentElement = () => getActive(document2);
      const {
        keyDef,
        consumedLength,
        releasePrevious,
        releaseSelf,
        repeat
      } = (_state$repeatKey = state.repeatKey) != null ? _state$repeatKey : (0, _getNextKeyDef.getNextKeyDef)(text, options);
      const replace = applyPlugins(plugins.replaceBehavior, keyDef, getCurrentElement(), options, state);
      if (!replace) {
        const pressed = state.pressed.find((p) => p.keyDef === keyDef);
        if (pressed && !state.repeatKey) {
          keyup(keyDef, getCurrentElement, options, state, pressed.unpreventedDefault);
        }
        if (!releasePrevious) {
          const unpreventedDefault = keydown(keyDef, getCurrentElement, options, state);
          if (unpreventedDefault && hasKeyPress(keyDef, state)) {
            keypress(keyDef, getCurrentElement, options, state);
          }
          if (releaseSelf && repeat <= 1) {
            keyup(keyDef, getCurrentElement, options, state, unpreventedDefault);
          }
        }
      }
      if (repeat > 1) {
        state.repeatKey = {
          // don't consume again on the next iteration
          consumedLength: 0,
          keyDef,
          releasePrevious,
          releaseSelf,
          repeat: repeat - 1
        };
      } else {
        delete state.repeatKey;
      }
      if (text.length > consumedLength || repeat > 1) {
        if (options.delay > 0) {
          await (0, _utils.wait)(options.delay);
        }
        return keyboardImplementation(text.slice(consumedLength), options, state);
      }
      return void 0;
    }
    function getActive(document2) {
      var _getActiveElement;
      return (_getActiveElement = (0, _utils.getActiveElement)(document2)) != null ? _getActiveElement : (
        /* istanbul ignore next */
        document2.body
      );
    }
    function releaseAllKeys(options, state) {
      const getCurrentElement = () => getActive(options.document);
      for (const k of state.pressed) {
        keyup(k.keyDef, getCurrentElement, options, state, k.unpreventedDefault);
      }
    }
    function keydown(keyDef, getCurrentElement, options, state) {
      const element = getCurrentElement();
      if (element !== state.activeElement) {
        state.carryValue = void 0;
        state.carryChar = "";
      }
      state.activeElement = element;
      applyPlugins(plugins.preKeydownBehavior, keyDef, element, options, state);
      const unpreventedDefault = _dom.fireEvent.keyDown(element, (0, _getEventProps.getKeyEventProps)(keyDef, state));
      state.pressed.push({
        keyDef,
        unpreventedDefault
      });
      if (unpreventedDefault) {
        applyPlugins(plugins.keydownBehavior, keyDef, getCurrentElement(), options, state);
      }
      return unpreventedDefault;
    }
    function keypress(keyDef, getCurrentElement, options, state) {
      const element = getCurrentElement();
      const unpreventedDefault = _dom.fireEvent.keyPress(element, (0, _getEventProps.getKeyEventProps)(keyDef, state));
      if (unpreventedDefault) {
        applyPlugins(plugins.keypressBehavior, keyDef, getCurrentElement(), options, state);
      }
    }
    function keyup(keyDef, getCurrentElement, options, state, unprevented) {
      const element = getCurrentElement();
      applyPlugins(plugins.preKeyupBehavior, keyDef, element, options, state);
      const unpreventedDefault = _dom.fireEvent.keyUp(element, (0, _getEventProps.getKeyEventProps)(keyDef, state));
      if (unprevented && unpreventedDefault) {
        applyPlugins(plugins.keyupBehavior, keyDef, getCurrentElement(), options, state);
      }
      state.pressed = state.pressed.filter((k) => k.keyDef !== keyDef);
      applyPlugins(plugins.postKeyupBehavior, keyDef, element, options, state);
    }
    function applyPlugins(pluginCollection, keyDef, element, options, state) {
      const plugin = pluginCollection.find((p) => p.matches(keyDef, element, options, state));
      if (plugin) {
        plugin.handle(keyDef, element, options, state);
      }
      return !!plugin;
    }
    function hasKeyPress(keyDef, state) {
      var _keyDef$key;
      return (((_keyDef$key = keyDef.key) == null ? void 0 : _keyDef$key.length) === 1 || keyDef.key === "Enter") && !state.modifiers.ctrl && !state.modifiers.alt;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/types.js
var require_types = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DOM_KEY_LOCATION = void 0;
    var DOM_KEY_LOCATION;
    exports.DOM_KEY_LOCATION = DOM_KEY_LOCATION;
    (function(DOM_KEY_LOCATION2) {
      DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["STANDARD"] = 0] = "STANDARD";
      DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["LEFT"] = 1] = "LEFT";
      DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["RIGHT"] = 2] = "RIGHT";
      DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["NUMPAD"] = 3] = "NUMPAD";
    })(DOM_KEY_LOCATION || (exports.DOM_KEY_LOCATION = DOM_KEY_LOCATION = {}));
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/keyMap.js
var require_keyMap = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/keyMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.defaultKeyMap = void 0;
    var _types = require_types();
    var defaultKeyMap = [
      // alphanumeric keys
      ..."0123456789".split("").map((c) => ({
        code: `Digit${c}`,
        key: c
      })),
      ...")!@#$%^&*(".split("").map((c, i) => ({
        code: `Digit${i}`,
        key: c,
        shiftKey: true
      })),
      ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({
        code: `Key${c.toUpperCase()}`,
        key: c
      })),
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => ({
        code: `Key${c}`,
        key: c,
        shiftKey: true
      })),
      // alphanumeric block - functional
      {
        code: "Space",
        key: " "
      },
      {
        code: "AltLeft",
        key: "Alt",
        location: _types.DOM_KEY_LOCATION.LEFT,
        keyCode: 18
      },
      {
        code: "AltRight",
        key: "Alt",
        location: _types.DOM_KEY_LOCATION.RIGHT,
        keyCode: 18
      },
      {
        code: "ShiftLeft",
        key: "Shift",
        location: _types.DOM_KEY_LOCATION.LEFT,
        keyCode: 16
      },
      {
        code: "ShiftRight",
        key: "Shift",
        location: _types.DOM_KEY_LOCATION.RIGHT,
        keyCode: 16
      },
      {
        code: "ControlLeft",
        key: "Control",
        location: _types.DOM_KEY_LOCATION.LEFT,
        keyCode: 17
      },
      {
        code: "ControlRight",
        key: "Control",
        location: _types.DOM_KEY_LOCATION.RIGHT,
        keyCode: 17
      },
      {
        code: "MetaLeft",
        key: "Meta",
        location: _types.DOM_KEY_LOCATION.LEFT,
        keyCode: 93
      },
      {
        code: "MetaRight",
        key: "Meta",
        location: _types.DOM_KEY_LOCATION.RIGHT,
        keyCode: 93
      },
      {
        code: "OSLeft",
        key: "OS",
        location: _types.DOM_KEY_LOCATION.LEFT,
        keyCode: 91
      },
      {
        code: "OSRight",
        key: "OS",
        location: _types.DOM_KEY_LOCATION.RIGHT,
        keyCode: 91
      },
      {
        code: "CapsLock",
        key: "CapsLock",
        keyCode: 20
      },
      {
        code: "Backspace",
        key: "Backspace",
        keyCode: 8
      },
      {
        code: "Enter",
        key: "Enter",
        keyCode: 13
      },
      // function
      {
        code: "Escape",
        key: "Escape",
        keyCode: 27
      },
      // arrows
      {
        code: "ArrowUp",
        key: "ArrowUp",
        keyCode: 38
      },
      {
        code: "ArrowDown",
        key: "ArrowDown",
        keyCode: 40
      },
      {
        code: "ArrowLeft",
        key: "ArrowLeft",
        keyCode: 37
      },
      {
        code: "ArrowRight",
        key: "ArrowRight",
        keyCode: 39
      },
      // control pad
      {
        code: "Home",
        key: "Home",
        keyCode: 36
      },
      {
        code: "End",
        key: "End",
        keyCode: 35
      },
      {
        code: "Delete",
        key: "Delete",
        keyCode: 46
      },
      {
        code: "PageUp",
        key: "PageUp",
        keyCode: 33
      },
      {
        code: "PageDown",
        key: "PageDown",
        keyCode: 34
      }
      // TODO: add mappings
    ];
    exports.defaultKeyMap = defaultKeyMap;
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/specialCharMap.js
var require_specialCharMap = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/specialCharMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.specialCharMap = void 0;
    var specialCharMap = {
      arrowLeft: "{arrowleft}",
      arrowRight: "{arrowright}",
      arrowDown: "{arrowdown}",
      arrowUp: "{arrowup}",
      enter: "{enter}",
      escape: "{esc}",
      delete: "{del}",
      backspace: "{backspace}",
      home: "{home}",
      end: "{end}",
      selectAll: "{selectall}",
      space: "{space}",
      whitespace: " ",
      pageUp: "{pageUp}",
      pageDown: "{pageDown}"
    };
    exports.specialCharMap = specialCharMap;
  }
});

// ../../node_modules/@testing-library/user-event/dist/keyboard/index.js
var require_keyboard = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/keyboard/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.keyboard = keyboard;
    exports.keyboardImplementationWrapper = keyboardImplementationWrapper;
    Object.defineProperty(exports, "specialCharMap", {
      enumerable: true,
      get: function() {
        return _specialCharMap.specialCharMap;
      }
    });
    var _dom = require_dist2();
    var _keyboardImplementation = require_keyboardImplementation();
    var _keyMap = require_keyMap();
    var _specialCharMap = require_specialCharMap();
    function keyboard(text, options) {
      var _options$delay;
      const {
        promise,
        state
      } = keyboardImplementationWrapper(text, options);
      if (((_options$delay = options == null ? void 0 : options.delay) != null ? _options$delay : 0) > 0) {
        return (0, _dom.getConfig)().asyncWrapper(() => promise.then(() => state));
      } else {
        promise.catch(console.error);
        return state;
      }
    }
    function keyboardImplementationWrapper(text, config = {}) {
      const {
        keyboardState: state = createKeyboardState(),
        delay = 0,
        document: doc = document,
        autoModify = false,
        keyboardMap = _keyMap.defaultKeyMap
      } = config;
      const options = {
        delay,
        document: doc,
        autoModify,
        keyboardMap
      };
      return {
        promise: (0, _keyboardImplementation.keyboardImplementation)(text, options, state),
        state,
        releaseAllKeys: () => (0, _keyboardImplementation.releaseAllKeys)(options, state)
      };
    }
    function createKeyboardState() {
      return {
        activeElement: null,
        pressed: [],
        carryChar: "",
        modifiers: {
          alt: false,
          caps: false,
          ctrl: false,
          meta: false,
          shift: false
        }
      };
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/type/typeImplementation.js
var require_typeImplementation = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/type/typeImplementation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.typeImplementation = typeImplementation;
    var _utils = require_utils();
    var _click = require_click();
    var _keyboard = require_keyboard();
    async function typeImplementation(element, text, {
      delay,
      skipClick = false,
      skipAutoClose = false,
      initialSelectionStart = void 0,
      initialSelectionEnd = void 0
    }) {
      if (element.disabled)
        return;
      if (!skipClick)
        (0, _click.click)(element);
      const currentElement = () => (0, _utils.getActiveElement)(element.ownerDocument);
      const value = (0, _utils.getValue)(currentElement());
      const {
        selectionStart,
        selectionEnd
      } = (0, _utils.getSelectionRange)(element);
      if (value != null && (selectionStart === null || selectionStart === 0) && (selectionEnd === null || selectionEnd === 0)) {
        (0, _utils.setSelectionRange)(currentElement(), initialSelectionStart != null ? initialSelectionStart : value.length, initialSelectionEnd != null ? initialSelectionEnd : value.length);
      }
      const {
        promise,
        releaseAllKeys
      } = (0, _keyboard.keyboardImplementationWrapper)(text, {
        delay,
        document: element.ownerDocument
      });
      if (delay > 0) {
        await promise;
      }
      if (!skipAutoClose) {
        releaseAllKeys();
      }
      return promise;
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/type/index.js
var require_type = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/type/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.type = type;
    var _dom = require_dist2();
    var _typeImplementation = require_typeImplementation();
    function type(element, text, {
      delay = 0,
      ...options
    } = {}) {
      if (delay > 0) {
        return (0, _dom.getConfig)().asyncWrapper(() => (0, _typeImplementation.typeImplementation)(element, text, {
          delay,
          ...options
        }));
      } else {
        return void (0, _typeImplementation.typeImplementation)(element, text, {
          delay,
          ...options
        }).catch(console.error);
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/clear.js
var require_clear = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/clear.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.clear = clear;
    var _utils = require_utils();
    var _type = require_type();
    function clear(element) {
      var _element$selectionSta, _element$selectionEnd;
      if (!(0, _utils.isElementType)(element, ["input", "textarea"])) {
        throw new Error("clear currently only supports input and textarea elements.");
      }
      if ((0, _utils.isDisabled)(element)) {
        return;
      }
      const elementType = element.type;
      if (elementType !== "textarea") {
        ;
        element.type = "text";
      }
      (0, _type.type)(element, "{selectall}{del}", {
        delay: 0,
        initialSelectionStart: (_element$selectionSta = element.selectionStart) != null ? _element$selectionSta : (
          /* istanbul ignore next */
          void 0
        ),
        initialSelectionEnd: (_element$selectionEnd = element.selectionEnd) != null ? _element$selectionEnd : (
          /* istanbul ignore next */
          void 0
        )
      });
      if (elementType !== "textarea") {
        ;
        element.type = elementType;
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/tab.js
var require_tab = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/tab.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.tab = tab;
    var _dom = require_dist2();
    var _utils = require_utils();
    var _focus = require_focus();
    var _blur = require_blur();
    function getNextElement(currentIndex, shift, elements, focusTrap) {
      if ((0, _utils.isDocument)(focusTrap) && (currentIndex === 0 && shift || currentIndex === elements.length - 1 && !shift)) {
        return focusTrap.body;
      }
      const nextIndex = shift ? currentIndex - 1 : currentIndex + 1;
      const defaultIndex = shift ? elements.length - 1 : 0;
      return elements[nextIndex] || elements[defaultIndex];
    }
    function tab({
      shift = false,
      focusTrap
    } = {}) {
      var _focusTrap$ownerDocum, _focusTrap;
      const doc = (_focusTrap$ownerDocum = (_focusTrap = focusTrap) == null ? void 0 : _focusTrap.ownerDocument) != null ? _focusTrap$ownerDocum : document;
      const previousElement = (0, _utils.getActiveElement)(doc);
      if (!focusTrap) {
        focusTrap = doc;
      }
      const focusableElements = focusTrap.querySelectorAll(_utils.FOCUSABLE_SELECTOR);
      const enabledElements = Array.from(focusableElements).filter((el) => el === previousElement || el.getAttribute("tabindex") !== "-1" && !(0, _utils.isDisabled)(el) && // Hidden elements are not tabable
      (0, _utils.isVisible)(el));
      if (enabledElements.length === 0)
        return;
      const orderedElements = enabledElements.map((el, idx) => ({
        el,
        idx
      })).sort((a, b) => {
        if (previousElement && previousElement.getAttribute("tabindex") === "-1") {
          return a.idx - b.idx;
        }
        const tabIndexA = Number(a.el.getAttribute("tabindex"));
        const tabIndexB = Number(b.el.getAttribute("tabindex"));
        const diff = tabIndexA - tabIndexB;
        return diff === 0 ? a.idx - b.idx : diff;
      }).map(({
        el
      }) => el);
      const checkedRadio = {};
      let prunedElements = [];
      orderedElements.forEach((currentElement) => {
        const el = currentElement;
        if (el.type === "radio" && el.name) {
          const prev = previousElement;
          if (prev && prev.type === el.type && prev.name === el.name) {
            if (el === prev) {
              prunedElements.push(el);
            }
            return;
          }
          if (el.checked) {
            prunedElements = prunedElements.filter((e) => e.type !== el.type || e.name !== el.name);
            prunedElements.push(el);
            checkedRadio[el.name] = el;
            return;
          }
          if (typeof checkedRadio[el.name] !== "undefined") {
            return;
          }
        }
        prunedElements.push(el);
      });
      const index = prunedElements.findIndex((el) => el === previousElement);
      const nextElement = getNextElement(index, shift, prunedElements, focusTrap);
      const shiftKeyInit = {
        key: "Shift",
        keyCode: 16,
        shiftKey: true
      };
      const tabKeyInit = {
        key: "Tab",
        keyCode: 9,
        shiftKey: shift
      };
      let continueToTab = true;
      if (previousElement) {
        if (shift)
          _dom.fireEvent.keyDown(previousElement, {
            ...shiftKeyInit
          });
        continueToTab = _dom.fireEvent.keyDown(previousElement, {
          ...tabKeyInit
        });
      }
      const keyUpTarget = !continueToTab && previousElement ? previousElement : nextElement;
      if (continueToTab) {
        if (nextElement === doc.body) {
          if (previousElement) {
            (0, _blur.blur)(previousElement);
          }
        } else {
          (0, _focus.focus)(nextElement);
        }
      }
      _dom.fireEvent.keyUp(keyUpTarget, {
        ...tabKeyInit
      });
      if (shift) {
        _dom.fireEvent.keyUp(keyUpTarget, {
          ...shiftKeyInit,
          shiftKey: false
        });
      }
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/upload.js
var require_upload = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/upload.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.upload = upload;
    var _dom = require_dist2();
    var _click = require_click();
    var _blur = require_blur();
    var _focus = require_focus();
    var _utils = require_utils();
    function upload(element, fileOrFiles, init, {
      applyAccept = false
    } = {}) {
      var _input$files;
      const input = (0, _utils.isElementType)(element, "label") ? element.control : element;
      if (!input || !(0, _utils.isElementType)(input, "input", {
        type: "file"
      })) {
        throw new TypeError(`The ${input === element ? "given" : "associated"} ${input == null ? void 0 : input.tagName} element does not accept file uploads`);
      }
      if ((0, _utils.isDisabled)(element))
        return;
      (0, _click.click)(element, init == null ? void 0 : init.clickInit);
      const files = (Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles]).filter((file) => !applyAccept || isAcceptableFile(file, input.accept)).slice(0, input.multiple ? void 0 : 1);
      (0, _blur.blur)(element);
      (0, _focus.focus)(element);
      if (files.length === ((_input$files = input.files) == null ? void 0 : _input$files.length) && files.every((f, i) => {
        var _input$files2;
        return f === ((_input$files2 = input.files) == null ? void 0 : _input$files2.item(i));
      })) {
        return;
      }
      const inputFiles = {
        ...files,
        length: files.length,
        item: (index) => files[index],
        [Symbol.iterator]() {
          let i = 0;
          return {
            next: () => ({
              done: i >= files.length,
              value: files[i++]
            })
          };
        }
      };
      (0, _dom.fireEvent)(input, (0, _dom.createEvent)("input", input, {
        target: {
          files: inputFiles
        },
        bubbles: true,
        cancelable: false,
        composed: true
      }));
      _dom.fireEvent.change(input, {
        target: {
          files: inputFiles
        },
        ...init == null ? void 0 : init.changeInit
      });
    }
    function isAcceptableFile(file, accept) {
      if (!accept) {
        return true;
      }
      const wildcards = ["audio/*", "image/*", "video/*"];
      return accept.split(",").some((acceptToken) => {
        if (acceptToken.startsWith(".")) {
          return file.name.endsWith(acceptToken);
        } else if (wildcards.includes(acceptToken)) {
          return file.type.startsWith(acceptToken.substr(0, acceptToken.length - 1));
        }
        return file.type === acceptToken;
      });
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/select-options.js
var require_select_options = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/select-options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.selectOptions = exports.deselectOptions = void 0;
    var _dom = require_dist2();
    var _utils = require_utils();
    var _click = require_click();
    var _focus = require_focus();
    var _hover = require_hover();
    function selectOptionsBase(newValue, select, values, init, {
      skipPointerEventsCheck = false
    } = {}) {
      if (!newValue && !select.multiple) {
        throw (0, _dom.getConfig)().getElementError(`Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.`, select);
      }
      const valArray = Array.isArray(values) ? values : [values];
      const allOptions = Array.from(select.querySelectorAll('option, [role="option"]'));
      const selectedOptions = valArray.map((val) => {
        if (typeof val !== "string" && allOptions.includes(val)) {
          return val;
        } else {
          const matchingOption = allOptions.find((o) => o.value === val || o.innerHTML === val);
          if (matchingOption) {
            return matchingOption;
          } else {
            throw (0, _dom.getConfig)().getElementError(`Value "${String(val)}" not found in options`, select);
          }
        }
      }).filter((option) => !(0, _utils.isDisabled)(option));
      if ((0, _utils.isDisabled)(select) || !selectedOptions.length)
        return;
      if ((0, _utils.isElementType)(select, "select")) {
        if (select.multiple) {
          for (const option of selectedOptions) {
            const withPointerEvents = skipPointerEventsCheck ? true : (0, _utils.hasPointerEvents)(option);
            if (withPointerEvents) {
              _dom.fireEvent.pointerOver(option, init);
              _dom.fireEvent.pointerEnter(select, init);
              _dom.fireEvent.mouseOver(option);
              _dom.fireEvent.mouseEnter(select);
              _dom.fireEvent.pointerMove(option, init);
              _dom.fireEvent.mouseMove(option, init);
              _dom.fireEvent.pointerDown(option, init);
              _dom.fireEvent.mouseDown(option, init);
            }
            (0, _focus.focus)(select);
            if (withPointerEvents) {
              _dom.fireEvent.pointerUp(option, init);
              _dom.fireEvent.mouseUp(option, init);
            }
            selectOption(option);
            if (withPointerEvents) {
              _dom.fireEvent.click(option, init);
            }
          }
        } else if (selectedOptions.length === 1) {
          const withPointerEvents = skipPointerEventsCheck ? true : (0, _utils.hasPointerEvents)(select);
          if (withPointerEvents) {
            (0, _click.click)(select, init, {
              skipPointerEventsCheck
            });
          } else {
            (0, _focus.focus)(select);
          }
          selectOption(selectedOptions[0]);
          if (withPointerEvents) {
            _dom.fireEvent.pointerOver(select, init);
            _dom.fireEvent.pointerEnter(select, init);
            _dom.fireEvent.mouseOver(select);
            _dom.fireEvent.mouseEnter(select);
            _dom.fireEvent.pointerUp(select, init);
            _dom.fireEvent.mouseUp(select, init);
            _dom.fireEvent.click(select, init);
          }
        } else {
          throw (0, _dom.getConfig)().getElementError(`Cannot select multiple options on a non-multiple select`, select);
        }
      } else if (select.getAttribute("role") === "listbox") {
        selectedOptions.forEach((option) => {
          (0, _hover.hover)(option, init, {
            skipPointerEventsCheck
          });
          (0, _click.click)(option, init, {
            skipPointerEventsCheck
          });
          (0, _hover.unhover)(option, init, {
            skipPointerEventsCheck
          });
        });
      } else {
        throw (0, _dom.getConfig)().getElementError(`Cannot select options on elements that are neither select nor listbox elements`, select);
      }
      function selectOption(option) {
        option.selected = newValue;
        (0, _dom.fireEvent)(select, (0, _dom.createEvent)("input", select, {
          bubbles: true,
          cancelable: false,
          composed: true,
          ...init
        }));
        _dom.fireEvent.change(select, init);
      }
    }
    var selectOptions = selectOptionsBase.bind(null, true);
    exports.selectOptions = selectOptions;
    var deselectOptions = selectOptionsBase.bind(null, false);
    exports.deselectOptions = deselectOptions;
  }
});

// ../../node_modules/@testing-library/user-event/dist/paste.js
var require_paste = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/paste.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.paste = paste;
    var _dom = require_dist2();
    var _utils = require_utils();
    function isSupportedElement(element) {
      return (0, _utils.isElementType)(element, "input") && Boolean(_utils.editableInputTypes[element.type]) || (0, _utils.isElementType)(element, "textarea");
    }
    function paste(element, text, init, {
      initialSelectionStart,
      initialSelectionEnd
    } = {}) {
      if (!isSupportedElement(element)) {
        throw new TypeError(`The given ${element.tagName} element is currently unsupported.
      A PR extending this implementation would be very much welcome at https://github.com/testing-library/user-event`);
      }
      if ((0, _utils.isDisabled)(element)) {
        return;
      }
      (0, _utils.eventWrapper)(() => element.focus());
      if (element.selectionStart === 0 && element.selectionEnd === 0) {
        (0, _utils.setSelectionRange)(element, initialSelectionStart != null ? initialSelectionStart : element.value.length, initialSelectionEnd != null ? initialSelectionEnd : element.value.length);
      }
      _dom.fireEvent.paste(element, init);
      if (element.readOnly) {
        return;
      }
      text = text.substr(0, (0, _utils.getSpaceUntilMaxLength)(element));
      const {
        newValue,
        newSelectionStart
      } = (0, _utils.calculateNewValue)(text, element);
      _dom.fireEvent.input(element, {
        inputType: "insertFromPaste",
        target: {
          value: newValue
        }
      });
      (0, _utils.setSelectionRange)(
        element,
        // TODO: investigate why the selection caused by invalid parameters was expected
        {
          newSelectionStart,
          selectionEnd: newSelectionStart
        },
        {}
      );
    }
  }
});

// ../../node_modules/@testing-library/user-event/dist/index.js
var require_dist3 = __commonJS({
  "../../node_modules/@testing-library/user-event/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    Object.defineProperty(exports, "specialChars", {
      enumerable: true,
      get: function() {
        return _keyboard.specialCharMap;
      }
    });
    var _click = require_click();
    var _type = require_type();
    var _clear = require_clear();
    var _tab = require_tab();
    var _hover = require_hover();
    var _upload = require_upload();
    var _selectOptions = require_select_options();
    var _paste = require_paste();
    var _keyboard = require_keyboard();
    var userEvent2 = {
      click: _click.click,
      dblClick: _click.dblClick,
      type: _type.type,
      clear: _clear.clear,
      tab: _tab.tab,
      hover: _hover.hover,
      unhover: _hover.unhover,
      upload: _upload.upload,
      selectOptions: _selectOptions.selectOptions,
      deselectOptions: _selectOptions.deselectOptions,
      paste: _paste.paste,
      keyboard: _keyboard.keyboard
    };
    var _default = userEvent2;
    exports.default = _default;
  }
});

// main.js
var import_user_event = __toESM(require_dist3(), 1);
var import_dom = __toESM(require_dist2(), 1);
var main_default = import_user_event.default.default;
var export_dom = import_dom.default;
export {
  main_default as default,
  export_dom as dom
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v17.0.2
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
