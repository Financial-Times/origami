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

      function Delegate(root) {
        this.listenerMap = [{}, {}];

        if (root) {
          this.root(root);
        }

        this.handle = Delegate.prototype.handle.bind(this);
        this._removedListeners = [];
      }

      Delegate.prototype.root = function (root) {
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

      Delegate.prototype.captureForType = function (eventType) {
        return ["blur", "error", "focus", "load", "resize", "scroll"].indexOf(eventType) !== -1;
      };

      Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
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

      Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
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

      Delegate.prototype.handle = function (event) {
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

      Delegate.prototype.fire = function (event, target, listener) {
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

      Delegate.prototype.destroy = function () {
        this.off();
        this.root();
      };

      var _default = Delegate;
      exports.default = _default;
      module.exports = exports.default;
    }
  }); // src/js/share.js


  var import_ftdomdelegate = __toModule(require_browser());

  var socialUrls = {
    twitter: "https://twitter.com/intent/tweet?url={{url}}&text={{title}}&related={{relatedTwitterAccounts}}&via=FT",
    facebook: "http://www.facebook.com/sharer.php?u={{url}}",
    linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}+%7C+{{titleExtra}}&summary={{summary}}&source=Financial+Times",
    pinterest: "http://www.pinterest.com/pin/create/button/?url={{url}}&description={{title}}",
    whatsapp: "whatsapp://send?text={{title}}%20({{titleExtra}})%20-%20{{url}}",
    link: "{{url}}",
    enterpriseSharing: "{{url}}"
  };
  var descriptiveLinkText = {
    twitter: "Share {{title}} on Twitter (opens a new window)",
    facebook: "Share {{title}} on Facebook (opens a new window)",
    linkedin: "Share {{title}} on LinkedIn (opens a new window)",
    pinterest: "Share {{title}} on Pinterest (opens a new window)",
    whatsapp: "Share {{title}} on Whatsapp (opens a new window)",
    link: "Open link in new window",
    enterpriseSharing: "Share {{title}} with your Enterprise Sharing tools (opens a new window)"
  };

  function Share(rootEl, config) {
    var oShare = this;
    var openWindows = {};

    function dispatchCustomEvent(event) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "oShare";
      oShare.rootEl.dispatchEvent(new CustomEvent(namespace + "." + event, {
        detail: data,
        bubbles: true
      }));
    }

    function handleClick(ev) {
      var actionEl = ev.target.closest("li.o-share__action");

      if (oShare.rootEl.contains(actionEl) && actionEl.querySelector("a[href]")) {
        ev.preventDefault();
        ev.stopPropagation();
        var url = actionEl.querySelector("a[href]").href;
        var shareLocation = oShare.rootEl.dataset.oShareLocation || "";
        dispatchCustomEvent("event", {
          category: "share",
          action: "click",
          button: actionEl.textContent.trim().toLowerCase(),
          location: shareLocation
        }, "oTracking");
        shareSocial(url);
      }
    }

    function shareSocial(url) {
      if (url) {
        if (openWindows[url] && !openWindows[url].closed) {
          openWindows[url].focus();
        } else {
          openWindows[url] = window.open(url, "", "width=646,height=436");
          openWindows[url].opener = null;
        }

        dispatchCustomEvent("open", {
          share: oShare,
          action: "social",
          url: url
        });
      }
    }

    function generateSocialUrl(socialNetwork) {
      var templateUrl = socialUrls[socialNetwork];
      templateUrl = templateUrl.replace("{{url}}", encodeURIComponent(config.url)).replace("{{title}}", encodeURIComponent(config.title)).replace("{{titleExtra}}", encodeURIComponent(config.titleExtra)).replace("{{summary}}", encodeURIComponent(config.summary)).replace("{{relatedTwitterAccounts}}", encodeURIComponent(config.relatedTwitterAccounts));
      return templateUrl;
    }

    function generateDesriptiveLinkText(socialNetwork) {
      var templateLinkText = descriptiveLinkText[socialNetwork];
      templateLinkText = templateLinkText.replace("{{title}}", config.title);
      return templateLinkText;
    }

    function render() {
      normaliseConfig();
      var ulElement = document.createElement("ul");

      for (var i = 0; i < config.links.length; i++) {
        var liElement = document.createElement("li");
        var spanElement = document.createElement("span");
        var aElement = document.createElement("a");
        liElement.classList.add("o-share__action", "o-share__action--".concat(config.links[i]));
        spanElement.classList.add("o-share__text");
        spanElement.innerText = generateDesriptiveLinkText(config.links[i]);
        aElement.classList.add("o-share__icon", "o-share__icon--".concat(config.links[i]));
        aElement.href = generateSocialUrl(config.links[i]);
        aElement.setAttribute("target", "_blank");
        aElement.setAttribute("rel", "noopener");
        aElement.appendChild(spanElement);
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
      }

      oShare.rootEl.appendChild(ulElement);
    }

    function normaliseConfig() {
      var link = document.createElement("a");
      link.href = config.url;
      config.url = link.protocol + "//" + link.host + link.pathname + link.search + link.hash;
    }

    function init() {
      if (!rootEl) {
        rootEl = document.body;
      } else if (!(rootEl instanceof HTMLElement)) {
        rootEl = document.querySelector(rootEl);
      }

      var rootDelegate = new import_ftdomdelegate.default(rootEl);
      rootDelegate.on("click", handleClick);
      rootEl.setAttribute("data-o-share--js", "");
      oShare.rootDomDelegate = rootDelegate;
      oShare.rootEl = rootEl;

      if (rootEl.children.length === 0) {
        if (!config) {
          config = {};
          config.links = rootEl.hasAttribute("data-o-share-links") ? rootEl.getAttribute("data-o-share-links").split(" ") : [];
          config.url = rootEl.getAttribute("data-o-share-url") || "";
          config.title = rootEl.getAttribute("data-o-share-title") || "";
          config.titleExtra = rootEl.getAttribute("data-o-share-titleExtra") || "";
          config.summary = rootEl.getAttribute("data-o-share-summary") || "";
          config.relatedTwitterAccounts = rootEl.getAttribute("data-o-share-relatedTwitterAccounts") || "";
        }

        render();
      }

      dispatchCustomEvent("ready", {
        share: oShare
      });
    }

    init();
  }

  Share.prototype.destroy = function () {
    this.rootDomDelegate.destroy();

    for (var i = 0; i < this.rootEl.children; i++) {
      this.rootEl.removeChild(this.rootEl.children[i]);
    }

    this.rootEl.removeAttribute("data-o-share--js");
    this.rootEl = void 0;
  };

  Share.init = function () {
    var rootEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;

    if (!(rootEl instanceof HTMLElement)) {
      rootEl = document.querySelector(rootEl);
    }

    if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-share]")) {
      return new Share(rootEl);
    }

    return Array.from(rootEl.querySelectorAll("[data-o-component=o-share]"), function (rootEl2) {
      return new Share(rootEl2);
    });
  };

  var share_default = Share; // main.js

  var constructAll = function constructAll() {
    share_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = share_default; // demos/src/demo.js

  window.oShare = main_default;
  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9mdGRvbWRlbGVnYXRlL2Jyb3dzZXIuanMiLCJzcmMvanMvc2hhcmUuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBQSxlQUFBLEdBQUEsVUFBQSxDQUFBO0FBQUEsaURBQUEsOENBQUEsT0FBQSxFQUFBLE1BQUEsRUFBQTtBQUFBOztBQUVBLE1BQUEsTUFBQSxDQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsUUFBQSxLQUFBLEVBQU87QUFEb0MsT0FBN0M7QUFHQSxNQUFBLE9BQUEsQ0FBUSxPQUFSLEdBQWtCLEtBQUEsQ0FBbEI7O0FBWUEsZUFBQSxRQUFBLENBQWtCLElBQWxCLEVBQXdCO0FBT3RCLGFBQUssV0FBTCxHQUFtQixDQUFDLEVBQUQsRUFBSyxFQUFMLENBQW5COztBQUVBLFlBQUksSUFBSixFQUFVO0FBQ1IsZUFBSyxJQUFMLENBQVUsSUFBVjtBQUFVOztBQUtaLGFBQUssTUFBTCxHQUFjLFFBQUEsQ0FBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLElBQTFCLENBQStCLElBQS9CLENBQWQ7QUFFQSxhQUFLLGlCQUFMLEdBQXlCLEVBQXpCO0FBQXlCOztBQVczQixNQUFBLFFBQUEsQ0FBUyxTQUFULENBQW1CLElBQW5CLEdBQTBCLFVBQVUsSUFBVixFQUFnQjtBQUN4QyxZQUFJLFdBQUEsR0FBYyxLQUFLLFdBQXZCO0FBQ0EsWUFBSSxTQUFKOztBQUVBLFlBQUksS0FBSyxXQUFULEVBQXNCO0FBQ3BCLGVBQUssU0FBTCxJQUFrQixXQUFBLENBQVksQ0FBWixDQUFsQixFQUFrQztBQUNoQyxnQkFBSSxXQUFBLENBQVksQ0FBWixDQUFBLENBQWUsY0FBZixDQUE4QixTQUE5QixD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cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG4vKipcbiAqIERPTSBldmVudCBkZWxlZ2F0b3JcbiAqXG4gKiBUaGUgZGVsZWdhdG9yIHdpbGwgbGlzdGVuXG4gKiBmb3IgZXZlbnRzIHRoYXQgYnViYmxlIHVwXG4gKiB0byB0aGUgcm9vdCBub2RlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBEZWxlZ2F0ZShyb290KSB7XG4gIC8qKlxuICAgKiBNYWludGFpbiBhIG1hcCBvZiBsaXN0ZW5lclxuICAgKiBsaXN0cywga2V5ZWQgYnkgZXZlbnQgbmFtZS5cbiAgICpcbiAgICogQHR5cGUgT2JqZWN0XG4gICAqL1xuICB0aGlzLmxpc3RlbmVyTWFwID0gW3t9LCB7fV07XG5cbiAgaWYgKHJvb3QpIHtcbiAgICB0aGlzLnJvb3Qocm9vdCk7XG4gIH1cbiAgLyoqIEB0eXBlIGZ1bmN0aW9uKCkgKi9cblxuXG4gIHRoaXMuaGFuZGxlID0gRGVsZWdhdGUucHJvdG90eXBlLmhhbmRsZS5iaW5kKHRoaXMpOyAvLyBDYWNoZSBvZiBldmVudCBsaXN0ZW5lcnMgcmVtb3ZlZCBkdXJpbmcgYW4gZXZlbnQgY3ljbGVcblxuICB0aGlzLl9yZW1vdmVkTGlzdGVuZXJzID0gW107XG59XG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgZXZlbnRzXG4gKiBvbiB0aGUgcHJvdmlkZWQgRE9NIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW3Jvb3RdIFRoZSByb290IG5vZGUgb3IgYSBzZWxlY3RvciBzdHJpbmcgbWF0Y2hpbmcgdGhlIHJvb3Qgbm9kZVxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5yb290ID0gZnVuY3Rpb24gKHJvb3QpIHtcbiAgdmFyIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcDtcbiAgdmFyIGV2ZW50VHlwZTsgLy8gUmVtb3ZlIG1hc3RlciBldmVudCBsaXN0ZW5lcnNcblxuICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgICBpZiAobGlzdGVuZXJNYXBbMV0uaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChldmVudFR5cGUgaW4gbGlzdGVuZXJNYXBbMF0pIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcFswXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIElmIG5vIHJvb3Qgb3Igcm9vdCBpcyBub3RcbiAgLy8gYSBkb20gbm9kZSwgdGhlbiByZW1vdmUgaW50ZXJuYWxcbiAgLy8gcm9vdCByZWZlcmVuY2UgYW5kIGV4aXQgaGVyZVxuXG5cbiAgaWYgKCFyb290IHx8ICFyb290LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yb290RWxlbWVudCkge1xuICAgICAgZGVsZXRlIHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSByb290IG5vZGUgYXQgd2hpY2hcbiAgICogbGlzdGVuZXJzIGFyZSBhdHRhY2hlZC5cbiAgICpcbiAgICogQHR5cGUgTm9kZVxuICAgKi9cblxuXG4gIHRoaXMucm9vdEVsZW1lbnQgPSByb290OyAvLyBTZXQgdXAgbWFzdGVyIGV2ZW50IGxpc3RlbmVyc1xuXG4gIGZvciAoZXZlbnRUeXBlIGluIGxpc3RlbmVyTWFwWzFdKSB7XG4gICAgaWYgKGxpc3RlbmVyTWFwWzFdLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcbiAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGV2ZW50VHlwZSBpbiBsaXN0ZW5lck1hcFswXSkge1xuICAgIGlmIChsaXN0ZW5lck1hcFswXS5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLmNhcHR1cmVGb3JUeXBlID0gZnVuY3Rpb24gKGV2ZW50VHlwZSkge1xuICByZXR1cm4gWydibHVyJywgJ2Vycm9yJywgJ2ZvY3VzJywgJ2xvYWQnLCAncmVzaXplJywgJ3Njcm9sbCddLmluZGV4T2YoZXZlbnRUeXBlKSAhPT0gLTE7XG59O1xuLyoqXG4gKiBBdHRhY2ggYSBoYW5kbGVyIHRvIG9uZVxuICogZXZlbnQgZm9yIGFsbCBlbGVtZW50c1xuICogdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3IsXG4gKiBub3cgb3IgaW4gdGhlIGZ1dHVyZVxuICpcbiAqIFRoZSBoYW5kbGVyIGZ1bmN0aW9uIHJlY2VpdmVzXG4gKiB0aHJlZSBhcmd1bWVudHM6IHRoZSBET00gZXZlbnRcbiAqIG9iamVjdCwgdGhlIG5vZGUgdGhhdCBtYXRjaGVkXG4gKiB0aGUgc2VsZWN0b3Igd2hpbGUgdGhlIGV2ZW50XG4gKiB3YXMgYnViYmxpbmcgYW5kIGEgcmVmZXJlbmNlXG4gKiB0byBpdHNlbGYuIFdpdGhpbiB0aGUgaGFuZGxlcixcbiAqICd0aGlzJyBpcyBlcXVhbCB0byB0aGUgc2Vjb25kXG4gKiBhcmd1bWVudC5cbiAqXG4gKiBUaGUgbm9kZSB0aGF0IGFjdHVhbGx5IHJlY2VpdmVkXG4gKiB0aGUgZXZlbnQgY2FuIGJlIGFjY2Vzc2VkIHZpYVxuICogJ2V2ZW50LnRhcmdldCcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBMaXN0ZW4gZm9yIHRoZXNlIGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd8dW5kZWZpbmVkfSBzZWxlY3RvciBPbmx5IGhhbmRsZSBldmVudHMgb24gZWxlbWVudHMgbWF0Y2hpbmcgdGhpcyBzZWxlY3RvciwgaWYgdW5kZWZpbmVkIG1hdGNoIHJvb3QgZWxlbWVudFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBoYW5kbGVyIEhhbmRsZXIgZnVuY3Rpb24gLSBldmVudCBkYXRhIHBhc3NlZCBoZXJlIHdpbGwgYmUgaW4gZXZlbnQuZGF0YVxuICogQHBhcmFtIHtib29sZWFufSBbdXNlQ2FwdHVyZV0gc2VlICd1c2VDYXB0dXJlJyBpbiA8aHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXI+XG4gKiBAcmV0dXJucyB7RGVsZWdhdGV9IFRoaXMgbWV0aG9kIGlzIGNoYWluYWJsZVxuICovXG5cblxuRGVsZWdhdGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHVzZUNhcHR1cmUpIHtcbiAgdmFyIHJvb3Q7XG4gIHZhciBsaXN0ZW5lck1hcDtcbiAgdmFyIG1hdGNoZXI7XG4gIHZhciBtYXRjaGVyUGFyYW07XG5cbiAgaWYgKCFldmVudFR5cGUpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHR5cGU6ICcgKyBldmVudFR5cGUpO1xuICB9IC8vIGhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG5cblxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlQ2FwdHVyZSA9IGhhbmRsZXI7XG4gICAgaGFuZGxlciA9IHNlbGVjdG9yO1xuICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgfSAvLyBGYWxsYmFjayB0byBzZW5zaWJsZSBkZWZhdWx0c1xuICAvLyBpZiB1c2VDYXB0dXJlIG5vdCBzZXRcblxuXG4gIGlmICh1c2VDYXB0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICB1c2VDYXB0dXJlID0gdGhpcy5jYXB0dXJlRm9yVHlwZShldmVudFR5cGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSGFuZGxlciBtdXN0IGJlIGEgdHlwZSBvZiBGdW5jdGlvbicpO1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdOyAvLyBBZGQgbWFzdGVyIGhhbmRsZXIgZm9yIHR5cGUgaWYgbm90IGNyZWF0ZWQgeWV0XG5cbiAgaWYgKCFsaXN0ZW5lck1hcFtldmVudFR5cGVdKSB7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIHJvb3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMuaGFuZGxlLCB1c2VDYXB0dXJlKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lck1hcFtldmVudFR5cGVdID0gW107XG4gIH1cblxuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gbnVsbDsgLy8gQ09NUExFWCAtIG1hdGNoZXNSb290IG5lZWRzIHRvIGhhdmUgYWNjZXNzIHRvXG4gICAgLy8gdGhpcy5yb290RWxlbWVudCwgc28gYmluZCB0aGUgZnVuY3Rpb24gdG8gdGhpcy5cblxuICAgIG1hdGNoZXIgPSBtYXRjaGVzUm9vdC5iaW5kKHRoaXMpOyAvLyBDb21waWxlIGEgbWF0Y2hlciBmb3IgdGhlIGdpdmVuIHNlbGVjdG9yXG4gIH0gZWxzZSBpZiAoL15bYS16XSskL2kudGVzdChzZWxlY3RvcikpIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gbWF0Y2hlc1RhZztcbiAgfSBlbHNlIGlmICgvXiNbYS16MC05XFwtX10rJC9pLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgbWF0Y2hlclBhcmFtID0gc2VsZWN0b3Iuc2xpY2UoMSk7XG4gICAgbWF0Y2hlciA9IG1hdGNoZXNJZDtcbiAgfSBlbHNlIHtcbiAgICBtYXRjaGVyUGFyYW0gPSBzZWxlY3RvcjtcbiAgICBtYXRjaGVyID0gRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcztcbiAgfSAvLyBBZGQgdG8gdGhlIGxpc3Qgb2YgbGlzdGVuZXJzXG5cblxuICBsaXN0ZW5lck1hcFtldmVudFR5cGVdLnB1c2goe1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgIG1hdGNoZXI6IG1hdGNoZXIsXG4gICAgbWF0Y2hlclBhcmFtOiBtYXRjaGVyUGFyYW1cbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogUmVtb3ZlIGFuIGV2ZW50IGhhbmRsZXJcbiAqIGZvciBlbGVtZW50cyB0aGF0IG1hdGNoXG4gKiB0aGUgc2VsZWN0b3IsIGZvcmV2ZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW2V2ZW50VHlwZV0gUmVtb3ZlIGhhbmRsZXJzIGZvciBldmVudHMgbWF0Y2hpbmcgdGhpcyB0eXBlLCBjb25zaWRlcmluZyB0aGUgb3RoZXIgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl0gSWYgdGhpcyBwYXJhbWV0ZXIgaXMgb21pdHRlZCwgb25seSBoYW5kbGVycyB3aGljaCBtYXRjaCB0aGUgb3RoZXIgdHdvIHdpbGwgYmUgcmVtb3ZlZFxuICogQHBhcmFtIHtmdW5jdGlvbigpfSBbaGFuZGxlcl0gSWYgdGhpcyBwYXJhbWV0ZXIgaXMgb21pdHRlZCwgb25seSBoYW5kbGVycyB3aGljaCBtYXRjaCB0aGUgcHJldmlvdXMgdHdvIHdpbGwgYmUgcmVtb3ZlZFxuICogQHJldHVybnMge0RlbGVnYXRlfSBUaGlzIG1ldGhvZCBpcyBjaGFpbmFibGVcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBzZWxlY3RvciwgaGFuZGxlciwgdXNlQ2FwdHVyZSkge1xuICB2YXIgaTtcbiAgdmFyIGxpc3RlbmVyO1xuICB2YXIgbGlzdGVuZXJNYXA7XG4gIHZhciBsaXN0ZW5lckxpc3Q7XG4gIHZhciBzaW5nbGVFdmVudFR5cGU7IC8vIEhhbmRsZXIgY2FuIGJlIHBhc3NlZCBhc1xuICAvLyB0aGUgc2Vjb25kIG9yIHRoaXJkIGFyZ3VtZW50XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZUNhcHR1cmUgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICBzZWxlY3RvciA9IG51bGw7XG4gIH0gLy8gSWYgdXNlQ2FwdHVyZSBub3Qgc2V0LCByZW1vdmVcbiAgLy8gYWxsIGV2ZW50IGxpc3RlbmVyc1xuXG5cbiAgaWYgKHVzZUNhcHR1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIHRydWUpO1xuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVyTWFwID0gdGhpcy5saXN0ZW5lck1hcFt1c2VDYXB0dXJlID8gMSA6IDBdO1xuXG4gIGlmICghZXZlbnRUeXBlKSB7XG4gICAgZm9yIChzaW5nbGVFdmVudFR5cGUgaW4gbGlzdGVuZXJNYXApIHtcbiAgICAgIGlmIChsaXN0ZW5lck1hcC5oYXNPd25Qcm9wZXJ0eShzaW5nbGVFdmVudFR5cGUpKSB7XG4gICAgICAgIHRoaXMub2ZmKHNpbmdsZUV2ZW50VHlwZSwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTtcblxuICBpZiAoIWxpc3RlbmVyTGlzdCB8fCAhbGlzdGVuZXJMaXN0Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9IC8vIFJlbW92ZSBvbmx5IHBhcmFtZXRlciBtYXRjaGVzXG4gIC8vIGlmIHNwZWNpZmllZFxuXG5cbiAgZm9yIChpID0gbGlzdGVuZXJMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07XG5cbiAgICBpZiAoKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gbGlzdGVuZXIuc2VsZWN0b3IpICYmICghaGFuZGxlciB8fCBoYW5kbGVyID09PSBsaXN0ZW5lci5oYW5kbGVyKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlZExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgbGlzdGVuZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH0gLy8gQWxsIGxpc3RlbmVycyByZW1vdmVkXG5cblxuICBpZiAoIWxpc3RlbmVyTGlzdC5sZW5ndGgpIHtcbiAgICBkZWxldGUgbGlzdGVuZXJNYXBbZXZlbnRUeXBlXTsgLy8gUmVtb3ZlIHRoZSBtYWluIGhhbmRsZXJcblxuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50KSB7XG4gICAgICB0aGlzLnJvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmhhbmRsZSwgdXNlQ2FwdHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBIYW5kbGUgYW4gYXJiaXRyYXJ5IGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKi9cblxuXG5EZWxlZ2F0ZS5wcm90b3R5cGUuaGFuZGxlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHZhciBpO1xuICB2YXIgbDtcbiAgdmFyIHR5cGUgPSBldmVudC50eXBlO1xuICB2YXIgcm9vdDtcbiAgdmFyIHBoYXNlO1xuICB2YXIgbGlzdGVuZXI7XG4gIHZhciByZXR1cm5lZDtcbiAgdmFyIGxpc3RlbmVyTGlzdCA9IFtdO1xuICB2YXIgdGFyZ2V0O1xuICB2YXIgZXZlbnRJZ25vcmUgPSAnZnRMYWJzRGVsZWdhdGVJZ25vcmUnO1xuXG4gIGlmIChldmVudFtldmVudElnbm9yZV0gPT09IHRydWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0YXJnZXQgPSBldmVudC50YXJnZXQ7IC8vIEhhcmRjb2RlIHZhbHVlIG9mIE5vZGUuVEVYVF9OT0RFXG4gIC8vIGFzIG5vdCBkZWZpbmVkIGluIElFOFxuXG4gIGlmICh0YXJnZXQubm9kZVR5cGUgPT09IDMpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfSAvLyBIYW5kbGUgU1ZHIDx1c2U+IGVsZW1lbnRzIGluIElFXG5cblxuICBpZiAodGFyZ2V0LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50KSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0LmNvcnJlc3BvbmRpbmdVc2VFbGVtZW50O1xuICB9XG5cbiAgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gIHBoYXNlID0gZXZlbnQuZXZlbnRQaGFzZSB8fCAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0ID8gMyA6IDIpOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVmYXVsdC1jYXNlXG5cbiAgc3dpdGNoIChwaGFzZSkge1xuICAgIGNhc2UgMTpcbiAgICAgIC8vRXZlbnQuQ0FQVFVSSU5HX1BIQVNFOlxuICAgICAgbGlzdGVuZXJMaXN0ID0gdGhpcy5saXN0ZW5lck1hcFsxXVt0eXBlXTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAyOlxuICAgICAgLy9FdmVudC5BVF9UQVJHRVQ6XG4gICAgICBpZiAodGhpcy5saXN0ZW5lck1hcFswXSAmJiB0aGlzLmxpc3RlbmVyTWFwWzBdW3R5cGVdKSB7XG4gICAgICAgIGxpc3RlbmVyTGlzdCA9IGxpc3RlbmVyTGlzdC5jb25jYXQodGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyTWFwWzFdICYmIHRoaXMubGlzdGVuZXJNYXBbMV1bdHlwZV0pIHtcbiAgICAgICAgbGlzdGVuZXJMaXN0ID0gbGlzdGVuZXJMaXN0LmNvbmNhdCh0aGlzLmxpc3RlbmVyTWFwWzFdW3R5cGVdKTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDM6XG4gICAgICAvL0V2ZW50LkJVQkJMSU5HX1BIQVNFOlxuICAgICAgbGlzdGVuZXJMaXN0ID0gdGhpcy5saXN0ZW5lck1hcFswXVt0eXBlXTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIHRvRmlyZSA9IFtdOyAvLyBOZWVkIHRvIGNvbnRpbnVvdXNseSBjaGVja1xuICAvLyB0aGF0IHRoZSBzcGVjaWZpYyBsaXN0IGlzXG4gIC8vIHN0aWxsIHBvcHVsYXRlZCBpbiBjYXNlIG9uZVxuICAvLyBvZiB0aGUgY2FsbGJhY2tzIGFjdHVhbGx5XG4gIC8vIGNhdXNlcyB0aGUgbGlzdCB0byBiZSBkZXN0cm95ZWQuXG5cbiAgbCA9IGxpc3RlbmVyTGlzdC5sZW5ndGg7XG5cbiAgd2hpbGUgKHRhcmdldCAmJiBsKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lckxpc3RbaV07IC8vIEJhaWwgZnJvbSB0aGlzIGxvb3AgaWZcbiAgICAgIC8vIHRoZSBsZW5ndGggY2hhbmdlZCBhbmRcbiAgICAgIC8vIG5vIG1vcmUgbGlzdGVuZXJzIGFyZVxuICAgICAgLy8gZGVmaW5lZCBiZXR3ZWVuIGkgYW5kIGwuXG5cbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXQudGFnTmFtZSAmJiBbXCJidXR0b25cIiwgXCJpbnB1dFwiLCBcInNlbGVjdFwiLCBcInRleHRhcmVhXCJdLmluZGV4T2YodGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPiAtMSAmJiB0YXJnZXQuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIikpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoaW5ncyB0aGF0IGhhdmUgcHJldmlvdXNseSBmaXJlZFxuICAgICAgICB0b0ZpcmUgPSBbXTtcbiAgICAgIH0gLy8gQ2hlY2sgZm9yIG1hdGNoIGFuZCBmaXJlXG4gICAgICAvLyB0aGUgZXZlbnQgaWYgdGhlcmUncyBvbmVcbiAgICAgIC8vXG4gICAgICAvLyBUT0RPOk1DRzoyMDEyMDExNzogTmVlZCBhIHdheVxuICAgICAgLy8gdG8gY2hlY2sgaWYgZXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uXG4gICAgICAvLyB3YXMgY2FsbGVkLiBJZiBzbywgYnJlYWsgYm90aCBsb29wcy5cbiAgICAgIGVsc2UgaWYgKGxpc3RlbmVyLm1hdGNoZXIuY2FsbCh0YXJnZXQsIGxpc3RlbmVyLm1hdGNoZXJQYXJhbSwgdGFyZ2V0KSkge1xuICAgICAgICAgIHRvRmlyZS5wdXNoKFtldmVudCwgdGFyZ2V0LCBsaXN0ZW5lcl0pO1xuICAgICAgICB9XG4gICAgfSAvLyBUT0RPOk1DRzoyMDEyMDExNzogTmVlZCBhIHdheSB0b1xuICAgIC8vIGNoZWNrIGlmIGV2ZW50I3N0b3BQcm9wYWdhdGlvblxuICAgIC8vIHdhcyBjYWxsZWQuIElmIHNvLCBicmVhayBsb29waW5nXG4gICAgLy8gdGhyb3VnaCB0aGUgRE9NLiBTdG9wIGlmIHRoZVxuICAgIC8vIGRlbGVnYXRpb24gcm9vdCBoYXMgYmVlbiByZWFjaGVkXG5cblxuICAgIGlmICh0YXJnZXQgPT09IHJvb3QpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGwgPSBsaXN0ZW5lckxpc3QubGVuZ3RoOyAvLyBGYWxsIGJhY2sgdG8gcGFyZW50Tm9kZSBzaW5jZSBTVkcgY2hpbGRyZW4gaGF2ZSBubyBwYXJlbnRFbGVtZW50IGluIElFXG5cbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudCB8fCB0YXJnZXQucGFyZW50Tm9kZTsgLy8gRG8gbm90IHRyYXZlcnNlIHVwIHRvIGRvY3VtZW50IHJvb3Qgd2hlbiB1c2luZyBwYXJlbnROb2RlLCB0aG91Z2hcblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRG9jdW1lbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciByZXQ7XG5cbiAgZm9yIChpID0gMDsgaSA8IHRvRmlyZS5sZW5ndGg7IGkrKykge1xuICAgIC8vIEhhcyBpdCBiZWVuIHJlbW92ZWQgZHVyaW5nIHdoaWxlIHRoZSBldmVudCBmdW5jdGlvbiB3YXMgZmlyZWRcbiAgICBpZiAodGhpcy5fcmVtb3ZlZExpc3RlbmVycy5pbmRleE9mKHRvRmlyZVtpXVsyXSkgPiAtMSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmV0dXJuZWQgPSB0aGlzLmZpcmUuYXBwbHkodGhpcywgdG9GaXJlW2ldKTsgLy8gU3RvcCBwcm9wYWdhdGlvbiB0byBzdWJzZXF1ZW50XG4gICAgLy8gY2FsbGJhY2tzIGlmIHRoZSBjYWxsYmFjayByZXR1cm5lZFxuICAgIC8vIGZhbHNlXG5cbiAgICBpZiAocmV0dXJuZWQgPT09IGZhbHNlKSB7XG4gICAgICB0b0ZpcmVbaV1bMF1bZXZlbnRJZ25vcmVdID0gdHJ1ZTtcbiAgICAgIHRvRmlyZVtpXVswXS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcbi8qKlxuICogRmlyZSBhIGxpc3RlbmVyIG9uIGEgdGFyZ2V0LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGV2ZW50LCB0YXJnZXQsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBsaXN0ZW5lci5oYW5kbGVyLmNhbGwodGFyZ2V0LCBldmVudCwgdGFyZ2V0KTtcbn07XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gZWxlbWVudFxuICogbWF0Y2hlcyBhIHRhZyBzZWxlY3Rvci5cbiAqXG4gKiBUYWdzIGFyZSBOT1QgY2FzZS1zZW5zaXRpdmUsXG4gKiBleGNlcHQgaW4gWE1MIChhbmQgWE1MLWJhc2VkXG4gKiBsYW5ndWFnZXMgc3VjaCBhcyBYSFRNTCkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgVGhlIHRhZyBuYW1lIHRvIHRlc3QgYWdhaW5zdFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHRlc3Qgd2l0aFxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cblxuZnVuY3Rpb24gbWF0Y2hlc1RhZyh0YWdOYW1lLCBlbGVtZW50KSB7XG4gIHJldHVybiB0YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xufVxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGVsZW1lbnRcbiAqIG1hdGNoZXMgdGhlIHJvb3QuXG4gKlxuICogQHBhcmFtIHs/U3RyaW5nfSBzZWxlY3RvciBJbiB0aGlzIGNhc2UgdGhpcyBpcyBhbHdheXMgcGFzc2VkIHRocm91Z2ggYXMgbnVsbCBhbmQgbm90IHVzZWRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNSb290KHNlbGVjdG9yLCBlbGVtZW50KSB7XG4gIGlmICh0aGlzLnJvb3RFbGVtZW50ID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4gKC8vIE1hdGNoIHRoZSBvdXRlciBkb2N1bWVudCAoZGlzcGF0Y2hlZCBmcm9tIGRvY3VtZW50KVxuICAgICAgZWxlbWVudCA9PT0gZG9jdW1lbnQgfHwgLy8gVGhlIDxodG1sPiBlbGVtZW50IChkaXNwYXRjaGVkIGZyb20gZG9jdW1lbnQuYm9keSBvciBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpXG4gICAgICBlbGVtZW50ID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgLy8gT3IgdGhlIHdpbmRvdyBpdHNlbGYgKGRpc3BhdGNoZWQgZnJvbSB3aW5kb3cpXG4gICAgICBlbGVtZW50ID09PSB3aW5kb3dcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQgPT09IGVsZW1lbnQ7XG59XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgdGhlIElEIG9mXG4gKiB0aGUgZWxlbWVudCBpbiAndGhpcydcbiAqIG1hdGNoZXMgdGhlIGdpdmVuIElELlxuICpcbiAqIElEcyBhcmUgY2FzZS1zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlkIFRoZSBJRCB0byB0ZXN0IGFnYWluc3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB0ZXN0IHdpdGhcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG5cbmZ1bmN0aW9uIG1hdGNoZXNJZChpZCwgZWxlbWVudCkge1xuICByZXR1cm4gaWQgPT09IGVsZW1lbnQuaWQ7XG59XG4vKipcbiAqIFNob3J0IGhhbmQgZm9yIG9mZigpXG4gKiBhbmQgcm9vdCgpLCBpZSBib3RoXG4gKiB3aXRoIG5vIHBhcmFtZXRlcnNcbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuXG5cbkRlbGVnYXRlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLm9mZigpO1xuICB0aGlzLnJvb3QoKTtcbn07XG5cbnZhciBfZGVmYXVsdCA9IERlbGVnYXRlO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDsiLCJpbXBvcnQgRG9tRGVsZWdhdGUgZnJvbSAnZnRkb21kZWxlZ2F0ZSc7XG5cbmNvbnN0IHNvY2lhbFVybHMgPSB7XG5cdHR3aXR0ZXI6IFwiaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPXt7dXJsfX0mdGV4dD17e3RpdGxlfX0mcmVsYXRlZD17e3JlbGF0ZWRUd2l0dGVyQWNjb3VudHN9fSZ2aWE9RlRcIixcblx0ZmFjZWJvb2s6IFwiaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD91PXt7dXJsfX1cIixcblx0bGlua2VkaW46IFwiaHR0cDovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSZ1cmw9e3t1cmx9fSZ0aXRsZT17e3RpdGxlfX0rJTdDK3t7dGl0bGVFeHRyYX19JnN1bW1hcnk9e3tzdW1tYXJ5fX0mc291cmNlPUZpbmFuY2lhbCtUaW1lc1wiLFxuXHRwaW50ZXJlc3Q6IFwiaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz91cmw9e3t1cmx9fSZkZXNjcmlwdGlvbj17e3RpdGxlfX1cIixcblx0d2hhdHNhcHA6IFwid2hhdHNhcHA6Ly9zZW5kP3RleHQ9e3t0aXRsZX19JTIwKHt7dGl0bGVFeHRyYX19KSUyMC0lMjB7e3VybH19XCIsXG5cdGxpbms6IFwie3t1cmx9fVwiLFxuXHRlbnRlcnByaXNlU2hhcmluZzogXCJ7e3VybH19XCIsXG59O1xuXG5jb25zdCBkZXNjcmlwdGl2ZUxpbmtUZXh0ID0ge1xuXHR0d2l0dGVyOiAnU2hhcmUge3t0aXRsZX19IG9uIFR3aXR0ZXIgKG9wZW5zIGEgbmV3IHdpbmRvdyknLFxuXHRmYWNlYm9vazogJ1NoYXJlIHt7dGl0bGV9fSBvbiBGYWNlYm9vayAob3BlbnMgYSBuZXcgd2luZG93KScsXG5cdGxpbmtlZGluOiAnU2hhcmUge3t0aXRsZX19IG9uIExpbmtlZEluIChvcGVucyBhIG5ldyB3aW5kb3cpJyxcblx0cGludGVyZXN0OiAnU2hhcmUge3t0aXRsZX19IG9uIFBpbnRlcmVzdCAob3BlbnMgYSBuZXcgd2luZG93KScsXG5cdHdoYXRzYXBwOiAnU2hhcmUge3t0aXRsZX19IG9uIFdoYXRzYXBwIChvcGVucyBhIG5ldyB3aW5kb3cpJyxcblx0bGluazogJ09wZW4gbGluayBpbiBuZXcgd2luZG93Jyxcblx0ZW50ZXJwcmlzZVNoYXJpbmc6ICdTaGFyZSB7e3RpdGxlfX0gd2l0aCB5b3VyIEVudGVycHJpc2UgU2hhcmluZyB0b29scyAob3BlbnMgYSBuZXcgd2luZG93KScsXG59O1xuXG4vKipcbiAqIFRoZSBgb1NoYXJlLm9wZW5gIG9wZW4gZXZlbnQgZmlyZXMgd2hlbiBhIHNvY2lhbCBuZXR3b3JrIHNoYXJlIGFjdGlvbiBpc1xuICogdHJpZ2dlcmVkLCB0byBvcGVuIGEgbmV3IHdpbmRvdy5cbiAqXG4gKiBAZXZlbnQgXCJvU2hhcmUub3BlblwiXG4gKiBAdHlwZSB7b2JqZWN0fVxuICogQHByb3BlcnR5IHtib29sZWFufSBzaGFyZSAtIFRoZSBvLXNoYXJlIGluc3RhbmNlLlxuICogQHByb3BlcnR5IHtib29sZWFufSBhY3Rpb24gLSBUaGUga2luZCBvZiBzaGFyZSBpLmUuIFwic29jaWFsXCIuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHVybCAtIFRoZSBzb2NpYWwgc2hhcmUgdXJsIG9wZW5lZC5cbiAqL1xuXG4vKipcbiAqIFRoZSBgb1NoYXJlLnJlYWR5YCBmaXJlcyB3aGVuIGEgby1zaGFyZSBpbnN0YW5jZSBoYXMgYmVlbiBpbml0aWFsaXNlZC5cbiAqXG4gKiBAZXZlbnQgXCJvU2hhcmUucmVhZHlcIlxuICogQHR5cGUge29iamVjdH1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hhcmUgLSBUaGUgaW5pdGlhbGlzZWQgby1zaGFyZSBpbnN0YW5jZS5cbiAqL1xuXG4vKipcbiAgKiBAY2xhc3MgU2hhcmVcbiAgKlxuICAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fHN0cmluZyl9IHJvb3RFbCBbZWw9ZG9jdW1lbnQuYm9keV0gLSBFbGVtZW50IHdoZXJlIHRvIHNlYXJjaCBmb3IgYW4gby1zaGFyZSBjb21wb25lbnQuIFlvdSBjYW4gcGFzcyBhbiBIVE1MRWxlbWVudCBvciBhIHNlbGVjdG9yIHN0cmluZ1xuICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBPcHRpb25hbFxuICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWcudXJsIC0gT3B0aW9uYWwsIHVybCB0byBzaGFyZVxuICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWcudGl0bGUgLSBPcHRpb25hbCwgdGl0bGUgdG8gYmUgdXNlZCBpbiBzb2NpYWwgbmV0d29yayBzaGFyaW5nXG4gICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpZy50aXRsZUV4dHJhIC0gT3B0aW9uYWwsIGV4dHJhIGJpdCB0byBhZGQgdG8gdGhlIHRpdGxlIGZvciBzb21lIHNvY2lhbCBuZXR3b3Jrc1xuICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWcuc3VtbWFyeSAtIE9wdGlvbmFsLCBzdW1tYXJ5IG9mIHRoZSBwYWdlIHRoYXQncyBiZWluZyBzaGFyZWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gY29uZmlnLnJlbGF0ZWRUd2l0dGVyQWNjb3VudHMgLSBPcHRpb25hbCwgZXh0cmEgaW5mb3JtYXRpb24gZm9yIHNoYXJpbmcgb24gVHdpdHRlclxuICAqIEBwYXJhbSB7T2JqZWN0W119IGNvbmZpZy5saW5rcyAtIE9wdGlvbmFsLCBhcnJheSBvZiBzdHJpbmdzIG9mIHN1cHBvcnRlZCBzb2NpYWwgbmV0d29yayBuYW1lcyB0aGF0IHlvdSB3YW50IHJlbmRlcmVkXG4gICovXG5mdW5jdGlvbiBTaGFyZShyb290RWwsIGNvbmZpZykge1xuXHRjb25zdCBvU2hhcmUgPSB0aGlzO1xuXHRjb25zdCBvcGVuV2luZG93cyA9IHt9O1xuXG5cdC8qKlxuXHQgICogSGVscGVyIGZ1bmN0aW9uIHRvIGRpc3BhdGNoIG5hbWVzcGFjZWQgZXZlbnRzLCBuYW1lc3BhY2UgZGVmYXVsdHMgdG8gb1NoYXJlXG5cdCAgKlxuXHQgICogQHByaXZhdGVcblx0ICAqL1xuXHRmdW5jdGlvbiBkaXNwYXRjaEN1c3RvbUV2ZW50KGV2ZW50LCBkYXRhID0ge30sIG5hbWVzcGFjZSA9ICdvU2hhcmUnKSB7XG5cdFx0b1NoYXJlLnJvb3RFbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuYW1lc3BhY2UgKyAnLicgKyBldmVudCwge1xuXHRcdFx0ZGV0YWlsOiBkYXRhLFxuXHRcdFx0YnViYmxlczogdHJ1ZVxuXHRcdH0pKTtcblx0fVxuXG5cdC8qKlxuXHQgICogQ2xpY2sgZXZlbnQgaGFuZGxlciB0aGF0IGNoZWNrcyB0aGUgZXZlbnQgdGFyZ2V0IGlzIGFuIG8tc2hhcmUgYWN0aW9uXG5cdCAgKlxuXHQgICogQHBhcmFtIHtFdmVudH0gZXYgLSBUaGUgZXZlbnQgdG8gaGFuZGxlXG5cdCAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG5cdCAgKiBAcHJpdmF0ZVxuXHQgICovXG5cdGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2KSB7XG5cdFx0Y29uc3QgYWN0aW9uRWwgPSBldi50YXJnZXQuY2xvc2VzdCgnbGkuby1zaGFyZV9fYWN0aW9uJyk7XG5cblx0XHRpZiAob1NoYXJlLnJvb3RFbC5jb250YWlucyhhY3Rpb25FbCkgJiYgYWN0aW9uRWwucXVlcnlTZWxlY3RvcignYVtocmVmXScpKSB7XG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdGNvbnN0IHVybCA9IGFjdGlvbkVsLnF1ZXJ5U2VsZWN0b3IoJ2FbaHJlZl0nKS5ocmVmO1xuXHRcdFx0Y29uc3Qgc2hhcmVMb2NhdGlvbiA9IG9TaGFyZS5yb290RWwuZGF0YXNldC5vU2hhcmVMb2NhdGlvbiB8fCAnJztcblxuXHRcdFx0ZGlzcGF0Y2hDdXN0b21FdmVudCgnZXZlbnQnLCB7XG5cdFx0XHRcdGNhdGVnb3J5OiAnc2hhcmUnLFxuXHRcdFx0XHRhY3Rpb246ICdjbGljaycsXG5cdFx0XHRcdGJ1dHRvbjogYWN0aW9uRWwudGV4dENvbnRlbnQudHJpbSgpLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdGxvY2F0aW9uOiBzaGFyZUxvY2F0aW9uXG5cdFx0XHR9LCAnb1RyYWNraW5nJyk7XG5cblx0XHRcdHNoYXJlU29jaWFsKHVybCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAgKiBFdmVudCBoYW5kbGVyIGZvciBzb2NpYWwgbmV0d29yayBhY3Rpb25zLiBPcGVucyB1cCBhIG5ldyB3aW5kb3cgZm9yIHRoYXQgc29jaWFsIG5ldHdvcmsgYW5kIGRpc3BhdGNoZWQgdGhlICdvU2hhcmUub3BlbicgZXZlbnRcblx0ICAqXG5cdCAgKiBAcHJpdmF0ZVxuXHQgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFVSTCB0byBiZSBsb2FkZWQgaW4gdGhlIG5ldyB3aW5kb3dcblx0ICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdCAgKiBAZmlyZXMgXCJvU2hhcmUub3BlblwiXG5cdCAgKi9cblx0ZnVuY3Rpb24gc2hhcmVTb2NpYWwodXJsKSB7XG5cdFx0aWYgKHVybCkge1xuXHRcdFx0aWYgKG9wZW5XaW5kb3dzW3VybF0gJiYgIW9wZW5XaW5kb3dzW3VybF0uY2xvc2VkKSB7XG5cdFx0XHRcdG9wZW5XaW5kb3dzW3VybF0uZm9jdXMoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wZW5XaW5kb3dzW3VybF0gPSB3aW5kb3cub3Blbih1cmwsICcnLCAnd2lkdGg9NjQ2LGhlaWdodD00MzYnKTtcblx0XHRcdFx0b3BlbldpbmRvd3NbdXJsXS5vcGVuZXIgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRkaXNwYXRjaEN1c3RvbUV2ZW50KCdvcGVuJywge1xuXHRcdFx0XHRzaGFyZTogb1NoYXJlLFxuXHRcdFx0XHRhY3Rpb246IFwic29jaWFsXCIsXG5cdFx0XHRcdHVybDogdXJsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICAqIFRyYW5zZm9ybXMgdGhlIGRlZmF1bHQgc29jaWFsIHVybHNcblx0ICAqXG5cdCAgKiBAcHJpdmF0ZVxuXHQgICogQHBhcmFtIHtzdHJpbmd9IHNvY2lhbE5ldHdvcmsgLSBOYW1lIG9mIHRoZSBzb2NpYWwgbmV0d29yayB0aGF0IHdlIHN1cHBvcnQgKGUuZy4gdHdpdHRlciwgZmFjZWJvb2ssIGxpbmtlZGluLCBwaW50ZXJlc3QpXG5cdCAgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgICovXG5cdGZ1bmN0aW9uIGdlbmVyYXRlU29jaWFsVXJsKHNvY2lhbE5ldHdvcmspIHtcblx0XHRsZXQgdGVtcGxhdGVVcmwgPSBzb2NpYWxVcmxzW3NvY2lhbE5ldHdvcmtdO1xuXHRcdHRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmwucmVwbGFjZSgne3t1cmx9fScsIGVuY29kZVVSSUNvbXBvbmVudChjb25maWcudXJsKSlcblx0XHRcdC5yZXBsYWNlKCd7e3RpdGxlfX0nLCBlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLnRpdGxlKSlcblx0XHRcdC5yZXBsYWNlKCd7e3RpdGxlRXh0cmF9fScsIGVuY29kZVVSSUNvbXBvbmVudChjb25maWcudGl0bGVFeHRyYSkpXG5cdFx0XHQucmVwbGFjZSgne3tzdW1tYXJ5fX0nLCBlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLnN1bW1hcnkpKVxuXHRcdFx0LnJlcGxhY2UoJ3t7cmVsYXRlZFR3aXR0ZXJBY2NvdW50c319JywgZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5yZWxhdGVkVHdpdHRlckFjY291bnRzKSk7XG5cdFx0cmV0dXJuIHRlbXBsYXRlVXJsO1xuXHR9XG5cblx0LyoqXG5cdCAgKiBUcmFuc2Zvcm1zIHRoZSBkZXNjcmlwdGl2ZSB0ZXh0IGZvciBzb2NpYWwgbGlua3Ncblx0ICAqXG5cdCAgKiBAcHJpdmF0ZVxuXHQgICogQHBhcmFtIHtzdHJpbmd9IHNvY2lhbE5ldHdvcmsgLSBOYW1lIG9mIHRoZSBzb2NpYWwgbmV0d29yayB0aGF0IHdlIHN1cHBvcnQgKGUuZy4gdHdpdHRlciwgZmFjZWJvb2ssIGxpbmtlZGluLCBwaW50ZXJlc3QpXG5cdCAgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgICovXG5cdGZ1bmN0aW9uIGdlbmVyYXRlRGVzcmlwdGl2ZUxpbmtUZXh0IChzb2NpYWxOZXR3b3JrKSB7XG5cdFx0bGV0IHRlbXBsYXRlTGlua1RleHQgPSBkZXNjcmlwdGl2ZUxpbmtUZXh0W3NvY2lhbE5ldHdvcmtdO1xuXHRcdHRlbXBsYXRlTGlua1RleHQgPSB0ZW1wbGF0ZUxpbmtUZXh0LnJlcGxhY2UoJ3t7dGl0bGV9fScsIGNvbmZpZy50aXRsZSk7XG5cdFx0cmV0dXJuIHRlbXBsYXRlTGlua1RleHQ7XG5cdH1cblxuXHQvKipcblx0ICAqIFJlbmRlcnMgdGhlIGxpc3Qgb2Ygc29jaWFsIG5ldHdvcmtzIGluIHtAbGluayBjb25maWcubGlua3N9XG5cdCAgKlxuXHQgICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0ICAqIEBwcml2YXRlXG5cdCAgKi9cblx0ZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdG5vcm1hbGlzZUNvbmZpZygpO1xuXG5cdFx0Y29uc3QgdWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5saW5rcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgbGlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblx0XHRcdGNvbnN0IHNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdFx0Y29uc3QgYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cblx0XHRcdGxpRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvLXNoYXJlX19hY3Rpb24nLCBgby1zaGFyZV9fYWN0aW9uLS0ke2NvbmZpZy5saW5rc1tpXX1gKTtcblxuXHRcdFx0c3BhbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnby1zaGFyZV9fdGV4dCcpO1xuXHRcdFx0c3BhbkVsZW1lbnQuaW5uZXJUZXh0ID0gZ2VuZXJhdGVEZXNyaXB0aXZlTGlua1RleHQoY29uZmlnLmxpbmtzW2ldKTtcblxuXHRcdFx0YUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnby1zaGFyZV9faWNvbicsIGBvLXNoYXJlX19pY29uLS0ke2NvbmZpZy5saW5rc1tpXX1gKTtcblx0XHRcdGFFbGVtZW50LmhyZWYgPSBnZW5lcmF0ZVNvY2lhbFVybChjb25maWcubGlua3NbaV0pO1xuXHRcdFx0YUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG5cdFx0XHRhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdub29wZW5lcicpO1xuXG5cdFx0XHRhRWxlbWVudC5hcHBlbmRDaGlsZChzcGFuRWxlbWVudCk7XG5cdFx0XHRsaUVsZW1lbnQuYXBwZW5kQ2hpbGQoYUVsZW1lbnQpO1xuXHRcdFx0dWxFbGVtZW50LmFwcGVuZENoaWxkKGxpRWxlbWVudCk7XG5cdFx0fVxuXHRcdG9TaGFyZS5yb290RWwuYXBwZW5kQ2hpbGQodWxFbGVtZW50KTtcblx0fVxuXG5cdC8qKlxuXHQgICogTm9ybWFsaXNlcyBhbnkgZGF0YSBpbiB0aGUgY29uZmlndXJhdGlvbiwgY29udmVydGluZyByZWxhdGl2ZSBVUkxzIHRvIHJlYWR5LXRvLXNoYXJlXG5cdCAgKiBhYnNvbHV0ZSB2ZXJzaW9uc1xuXHQgICpcblx0ICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cblx0ICAqIEBwcml2YXRlXG5cdCAgKi9cblx0ZnVuY3Rpb24gbm9ybWFsaXNlQ29uZmlnKCkge1xuXHRcdGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdFx0bGluay5ocmVmID0gY29uZmlnLnVybDtcblx0XHRjb25maWcudXJsID0gbGluay5wcm90b2NvbCArICcvLycgKyBsaW5rLmhvc3QgKyBsaW5rLnBhdGhuYW1lICsgbGluay5zZWFyY2ggKyBsaW5rLmhhc2g7XG5cdH1cblxuXHQvKipcblx0ICAqIEluaXRpYWxpc2VzIHRoZSBTaGFyZSBjbGFzcywgcmVuZGVyaW5nIHRoZSBvLXNoYXJlIGVsZW1lbnQgaWYgaXQncyBlbXB0eSB3aXRoIHtAbGluayBjb25maWd9IG9wdGlvbnMsXG5cdCAgKiBvciBmcm9tIGNvcnJlc3BvbmRpbmcgZGF0YSBhdHRyaWJ1dGVzIGFuZCBzZXRzIHVwIGRvbS1kZWxlZ2F0ZXMuXG5cdCAgKiBEaXNwYXRjaGVzICdvU2hhcmUucmVhZHknIGF0IHRoZSBlbmRcblx0ICAqXG5cdCAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG5cdCAgKiBAZmlyZXMgXCJvU2hhcmUucmVhZHlcIlxuXHQgICovXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fSBlbHNlIGlmICghKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHJvb3REZWxlZ2F0ZSA9IG5ldyBEb21EZWxlZ2F0ZShyb290RWwpO1xuXHRcdHJvb3REZWxlZ2F0ZS5vbignY2xpY2snLCBoYW5kbGVDbGljayk7XG5cdFx0cm9vdEVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLXNoYXJlLS1qcycsICcnKTtcblxuXHRcdG9TaGFyZS5yb290RG9tRGVsZWdhdGUgPSByb290RGVsZWdhdGU7XG5cdFx0b1NoYXJlLnJvb3RFbCA9IHJvb3RFbDtcblxuXHRcdGlmIChyb290RWwuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRpZiAoIWNvbmZpZykge1xuXHRcdFx0XHRjb25maWcgPSB7fTtcblx0XHRcdFx0Y29uZmlnLmxpbmtzID0gcm9vdEVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1vLXNoYXJlLWxpbmtzJykgP1xuXHRcdFx0XHRcdHJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1zaGFyZS1saW5rcycpLnNwbGl0KCcgJykgOiBbXTtcblx0XHRcdFx0Y29uZmlnLnVybCA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1zaGFyZS11cmwnKSB8fCAnJztcblx0XHRcdFx0Y29uZmlnLnRpdGxlID0gcm9vdEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLXNoYXJlLXRpdGxlJykgfHwgJyc7XG5cdFx0XHRcdGNvbmZpZy50aXRsZUV4dHJhID0gcm9vdEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1vLXNoYXJlLXRpdGxlRXh0cmEnKSB8fCAnJztcblx0XHRcdFx0Y29uZmlnLnN1bW1hcnkgPSByb290RWwuZ2V0QXR0cmlidXRlKCdkYXRhLW8tc2hhcmUtc3VtbWFyeScpIHx8ICcnO1xuXHRcdFx0XHRjb25maWcucmVsYXRlZFR3aXR0ZXJBY2NvdW50cyA9IHJvb3RFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1zaGFyZS1yZWxhdGVkVHdpdHRlckFjY291bnRzJykgfHwgJyc7XG5cdFx0XHR9XG5cdFx0XHRyZW5kZXIoKTtcblx0XHR9XG5cblx0XHRkaXNwYXRjaEN1c3RvbUV2ZW50KCdyZWFkeScsIHtcblx0XHRcdHNoYXJlOiBvU2hhcmVcblx0XHR9KTtcblx0fVxuXG5cdGluaXQoKTtcbn1cblxuLyoqXG4gICogRGVzdHJveXMgdGhlIFNoYXJlIGluc3RhbmNlLCBkaXNhYmxlcyBkb20tZGVsZWdhdGVzXG4gICpcbiAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICovXG5TaGFyZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5yb290RG9tRGVsZWdhdGUuZGVzdHJveSgpO1xuXHQvLyBTaG91bGQgZGVzdHJveSByZW1vdmUgaXRzIGNoaWxkcmVuPyBNYXliZSBzZXR0aW5nIC5pbm5lckhUTUwgdG8gJycgaXMgZmFzdGVyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb290RWwuY2hpbGRyZW47IGkrKykge1xuXHRcdHRoaXMucm9vdEVsLnJlbW92ZUNoaWxkKHRoaXMucm9vdEVsLmNoaWxkcmVuW2ldKTtcblx0fVxuXG5cdHRoaXMucm9vdEVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1vLXNoYXJlLS1qcycpO1xuXHR0aGlzLnJvb3RFbCA9IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICAqIEluaXRpYWxpc2VzIGFsbCBvLXNoYXJlIGNvbXBvbmVudHMgaW5zaWRlIHRoZSBlbGVtZW50IHBhc3NlZCBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyXG4gICpcbiAgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxzdHJpbmcpfSByb290RWwgW2VsPWRvY3VtZW50LmJvZHldIC0gRWxlbWVudCB3aGVyZSB0byBzZWFyY2ggZm9yIG8tc2hhcmUgY29tcG9uZW50cy4gWW91IGNhbiBwYXNzIGFuIEhUTUxFbGVtZW50IG9yIGEgc2VsZWN0b3Igc3RyaW5nXG4gICogQHJldHVybnMge0FycmF5fSAtIEFuIGFycmF5IG9mIFNoYXJlIGluc3RhbmNlc1xuICAqL1xuU2hhcmUuaW5pdCA9IGZ1bmN0aW9uIChyb290RWwgPSBkb2N1bWVudC5ib2R5KSB7XG5cdGlmICghKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0fVxuXHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcm9vdEVsLm1hdGNoZXMoJ1tkYXRhLW8tY29tcG9uZW50PW8tc2hhcmVdJykpIHtcblx0XHRyZXR1cm4gbmV3IFNoYXJlKHJvb3RFbCk7XG5cdH1cblx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PW8tc2hhcmVdJyksIHJvb3RFbCA9PiBuZXcgU2hhcmUocm9vdEVsKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGFyZTtcbiIsImltcG9ydCBTaGFyZSBmcm9tICcuL3NyYy9qcy9zaGFyZS5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRTaGFyZS5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBTaGFyZTtcbiIsImltcG9ydCBTaGFyZSBmcm9tICcuLi8uLi9tYWluLmpzJztcbndpbmRvdy5vU2hhcmUgPSBTaGFyZTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xufSk7XG4iXX0=