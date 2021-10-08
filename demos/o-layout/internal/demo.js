function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/linked-heading.js
  var LinkedHeading = /*#__PURE__*/function () {
    "use strict";

    function LinkedHeading(headingElement) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, LinkedHeading);

      this.headingElement = headingElement;
      this.id = headingElement.getAttribute("id");
      this.options = Object.assign({}, {
        content: "#",
        title: "Link directly to this section of the page"
      }, options);
      this.linkElement = this.constructLinkElement();
    }

    _createClass(LinkedHeading, [{
      key: "constructLinkElement",
      value: function constructLinkElement() {
        if (!this.id) {
          return null;
        }

        var existingAnchor = this.headingElement.querySelector("a");

        if (existingAnchor) {
          return existingAnchor;
        }

        var headingText = this.headingElement.innerHTML.trim();
        var anchor = document.createElement("a");
        anchor.href = "#".concat(this.id);
        anchor.title = this.options.title;
        anchor.classList.add("o-layout__linked-heading__link");
        anchor.innerHTML = "\n\t\t\t<span class=\"o-layout__linked-heading__content\">".concat(headingText, "</span>\n\t\t\t<span class=\"o-layout__linked-heading__label\">").concat(this.options.content, "</span>\n\t\t");
        window.requestAnimationFrame(function () {
          this.headingElement.innerHTML = "";
          this.headingElement.classList.add("o-layout__linked-heading");
          this.headingElement.appendChild(anchor);
        }.bind(this));
        return anchor;
      }
    }]);

    return LinkedHeading;
  }();

  var linked_heading_default = LinkedHeading; // src/js/layout.js

  var Layout = /*#__PURE__*/function () {
    "use strict";

    function Layout(layoutEl, options) {
      _classCallCheck(this, Layout);

      this.layoutEl = layoutEl;
      this.highlightedHeadingIndex = 0;
      var isDocsLayout = this.layoutEl.classList.contains("o-layout--docs");
      var isQueryLayout = this.layoutEl.classList.contains("o-layout--query");
      this.options = Object.assign({}, {
        constructNav: isDocsLayout ? true : false,
        navHeadingSelector: "h1, h2, h3",
        linkHeadings: true,
        linkedHeadingSelector: "h1, h2, h3, h4, h5, h6"
      }, options || Layout.getDataAttributes(layoutEl));
      var linkableHeadings = Array.from(this.layoutEl.querySelectorAll(this.options.linkedHeadingSelector)).filter(function (heading) {
        return heading.getAttribute("id");
      });
      this.linkedHeadings = [];

      if (this.options.linkHeadings) {
        this.linkedHeadings = linkableHeadings.map(function (heading) {
          return new linked_heading_default(heading, {});
        });
      }

      this.navHeadings = Array.from(this.layoutEl.querySelectorAll(this.options.navHeadingSelector)).filter(function (heading) {
        return heading.getAttribute("id");
      });

      if ((isDocsLayout || isQueryLayout) && this.options.constructNav) {
        this.constructNavFromDOM();
      }

      if ((isDocsLayout || isQueryLayout) && !this.options.constructNav) {
        var navigation = this.layoutEl.querySelector(".o-layout__navigation");

        if (navigation) {
          this.navAnchors = Array.from(navigation.querySelectorAll("a"));
          this.highlightNavItems();
        }
      }
    }

    _createClass(Layout, [{
      key: "constructNavFromDOM",
      value: function constructNavFromDOM() {
        var headingsWithHierarchy = Array.from(this.navHeadings).reduce(function (headings, heading) {
          var supportedHeadings = ["H3", "H4", "H5", "H6"];
          var parents = headings.filter(function (heading2) {
            return heading2.nodeName === "H2";
          });
          var parent = parents ? parents[parents.length - 1] : null;

          if (!headings.length) {
            return [heading];
          }

          if (parent && supportedHeadings.includes(heading.nodeName)) {
            parent.subItems = parent.subItems ? [].concat(_toConsumableArray(parent.subItems), [heading]) : [heading];
            return headings;
          }

          headings.push(heading);
          return headings;
        }, []);
        var nav = document.createElement("nav");
        nav.classList.add("o-layout__navigation");
        var list = document.createElement("ol");
        list.classList.add("o-layout__unstyled-element");
        var listInnerHTML = Array.from(headingsWithHierarchy).reduce(function (html, heading) {
          var pageTitleClass = heading.nodeName === "H1" ? "o-layout__navigation-title" : "";
          return html + "\n<li class=\"o-layout__unstyled-element ".concat(pageTitleClass, "\">\n\t<a class=\"o-layout__unstyled-element\" href='#").concat(heading.id, "'>").concat(Layout._getContentFromHeading(heading), "</a>\n\t").concat(heading.subItems ? "\n\t<ol>\n\t".concat(heading.subItems.reduce(function (html2, heading2) {
            return html2 + "<li><a class=\"o-layout__unstyled-element\" href=\"#".concat(heading2.id, "\">").concat(Layout._getContentFromHeading(heading2), "</a></li>");
          }, ""), "\n\t</ol>\n\t") : "", "\n</li>");
        }, "");
        list.innerHTML = listInnerHTML;
        nav.appendChild(list);
        var sidebar = this.layoutEl.querySelector(".o-layout__sidebar") || this.layoutEl.querySelector(".o-layout__query-sidebar");

        if (sidebar) {
          window.requestAnimationFrame(function () {
            sidebar.append(nav);
          });
        }

        this.navAnchors = Array.from(nav.querySelectorAll("a"));
        this.highlightNavItems();
      }
    }, {
      key: "setupClickHandlersForNavigationSidebar",
      value: function setupClickHandlersForNavigationSidebar() {
        var _this = this;

        this.navAnchors.forEach(function (anchor, index) {
          anchor.addEventListener("click", function () {
            var _iterator = _createForOfIteratorHelper(_this.navAnchors),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var sidebarAnchor = _step.value;

                if (sidebarAnchor === anchor) {
                  sidebarAnchor.setAttribute("aria-current", "location");
                  _this.highlightedHeadingIndex = index;
                } else {
                  sidebarAnchor.setAttribute("aria-current", "false");
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          });
        });
      }
    }, {
      key: "setupClickHandlersForHeadings",
      value: function setupClickHandlersForHeadings() {
        var _this2 = this;

        this.navHeadings.forEach(function (headingAnchor, index) {
          headingAnchor.addEventListener("click", function () {
            var _iterator2 = _createForOfIteratorHelper(_this2.navAnchors),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var sidebarAnchor = _step2.value;

                if (sidebarAnchor.hash === "#" + headingAnchor.id) {
                  sidebarAnchor.setAttribute("aria-current", "location");
                  _this2.highlightedHeadingIndex = index;
                } else {
                  sidebarAnchor.setAttribute("aria-current", "false");
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          });
        });
      }
    }, {
      key: "highlightNavigationFromLocation",
      value: function highlightNavigationFromLocation() {
        var _this3 = this;

        if (location.hash) {
          this.navAnchors.forEach(function (anchor, index) {
            var currentLocation = anchor.hash === location.hash;
            var defaultLocation = location.hash === "" && index === 0;

            if (currentLocation || defaultLocation) {
              anchor.setAttribute("aria-current", "location");
              _this3.highlightedHeadingIndex = index;
            } else {
              anchor.setAttribute("aria-current", "false");
            }
          });
        }
      }
    }, {
      key: "setupIntersectionObserversForHeadings",
      value: function setupIntersectionObserversForHeadings() {
        var _this4 = this;

        function getY(domRect) {
          return Object.prototype.hasOwnProperty.call(domRect, "y") ? domRect.y : domRect.top;
        }

        var mainSection = document.querySelector(".o-layout__main ");
        var headingFontSize = "16px";

        if (mainSection) {
          headingFontSize = window.getComputedStyle(mainSection).fontSize;
        }

        var observer = new IntersectionObserver(function (entries) {
          var headingIndexToHighlight = _this4.highlightedHeadingIndex;
          var above = [];
          var below = [];
          entries.forEach(function (entry) {
            var intersectingElemIdx = _this4.navHeadings.findIndex(function (navheading) {
              return navheading === entry.target;
            });

            var isAbove = getY(entry.boundingClientRect) < (getY(entry.rootBounds || {}) || 0);

            if (isAbove) {
              above.push(intersectingElemIdx);
            } else {
              below.push(intersectingElemIdx);
            }
          });

          if (above.length > 0) {
            headingIndexToHighlight = Math.max.apply(Math, above);
          } else if (below.length > 0) {
            var minIndex = Math.min.apply(Math, below);

            if (minIndex <= _this4.highlightedHeadingIndex) {
              headingIndexToHighlight = minIndex - 1 >= 0 ? minIndex - 1 : 0;
            }
          }

          _this4.navAnchors.forEach(function (anchor, index) {
            if (headingIndexToHighlight === index) {
              anchor.setAttribute("aria-current", "location");
            } else {
              anchor.setAttribute("aria-current", "false");
            }
          });

          _this4.highlightedHeadingIndex = headingIndexToHighlight;
        }, {
          rootMargin: "-".concat(headingFontSize, " 0px 0px 0px"),
          threshold: 0.1
        });
        this.navHeadings.forEach(function (heading) {
          observer.observe(heading);
        });
        var observerbottom = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting === true) {
            _this4.highlightedHeadingIndex = _this4.navAnchors.length - 1;

            _this4.navAnchors.forEach(function (anchor, index) {
              if (_this4.highlightedHeadingIndex === index) {
                anchor.setAttribute("aria-current", "location");
              } else {
                anchor.setAttribute("aria-current", "false");
              }
            });
          }
        }, {
          threshold: 1
        });
        var lastElementOnPage = this.layoutEl.querySelector(".o-layout__footer") || this.layoutEl.querySelector(".o-layout__main").lastElementChild;
        observerbottom.observe(lastElementOnPage);
      }
    }, {
      key: "highlightNavItems",
      value: function highlightNavItems() {
        this.setupClickHandlersForNavigationSidebar();
        this.setupClickHandlersForHeadings();
        this.highlightNavigationFromLocation();

        if (typeof self.IntersectionObserver === "function") {
          this.setupIntersectionObserversForHeadings();
        }
      }
    }], [{
      key: "_getContentFromHeading",
      value: function _getContentFromHeading(heading) {
        var contentElement = heading.querySelector(".o-layout__linked-heading__content");
        var headingText = contentElement ? contentElement.textContent : heading.textContent;
        return headingText;
      }
    }, {
      key: "getDataAttributes",
      value: function getDataAttributes(layoutElement) {
        if (!(layoutElement instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(layoutElement.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oLayout(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = layoutElement.dataset[key];

          try {
            options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
          } catch (error) {
            options[shortKey] = value;
          }

          return options;
        }, {});
      }
    }, {
      key: "init",
      value: function init(rootEl, opts) {
        if (!rootEl) {
          rootEl = document.body;
        }

        if (!(rootEl instanceof HTMLElement)) {
          rootEl = document.querySelector(rootEl);
        }

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-layout]")) {
          return new Layout(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-layout"]'), function (rootEl2) {
          return new Layout(rootEl2, opts);
        });
      }
    }]);

    return Layout;
  }();

  var layout_default = Layout; // main.js

  var constructAll = function constructAll() {
    layout_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9saW5rZWQtaGVhZGluZy5qcyIsInNyYy9qcy9sYXlvdXQuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2RlbW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLE1BQUEsYUFBQTtBQUFBOztBQVVDLDJCQUFhLGNBQWIsRUFBMkM7QUFBQSxVQUFkLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDMUMsV0FBSyxjQUFMLEdBQXNCLGNBQXRCO0FBQ0EsV0FBSyxFQUFMLEdBQVUsY0FBQSxDQUFlLFlBQWYsQ0FBNEIsSUFBNUIsQ0FBVjtBQUVBLFdBQUssT0FBTCxHQUFlLE1BQUEsQ0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQjtBQUNoQyxRQUFBLE9BQUEsRUFBUyxHQUR1QjtBQUVoQyxRQUFBLEtBQUEsRUFBTztBQUZ5QixPQUFsQixFQUdaLE9BSFksQ0FBZjtBQUtBLFdBQUssV0FBTCxHQUFtQixLQUFLLG9CQUFMLEVBQW5CO0FBQXdCOztBQW5CMUI7QUFBQTtBQUFBLGFBNEJDLGdDQUF3QjtBQUN2QixZQUFJLENBQUMsS0FBSyxFQUFWLEVBQWM7QUFDYixpQkFBTyxJQUFQO0FBQU87O0FBSVIsWUFBTSxjQUFBLEdBQWlCLEtBQUssY0FBTCxDQUFvQixhQUFwQixDQUFrQyxHQUFsQyxDQUF2Qjs7QUFDQSxZQUFJLGNBQUosRUFBb0I7QUFDbkIsaUJBQU8sY0FBUDtBQUFPOztBQUlSLFlBQU0sV0FBQSxHQUFjLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixJQUE5QixFQUFwQjtBQUNBLFlBQU0sTUFBQSxHQUFTLFFBQUEsQ0FBUyxhQUFULENBQXVCLEdBQXZCLENBQWY7QUFDQSxRQUFBLE1BQUEsQ0FBTyxJQUFQLGNBQWtCLEtBQUssRUFBdkI7QUFDQSxRQUFBLE1BQUEsQ0FBTyxLQUFQLEdBQWUsS0FBSyxPQUFMLENBQWEsS0FBNUI7QUFDQSxRQUFBLE1BQUEsQ0FBTyxTQUFQLENBQWlCLEdB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QUEsY0FBQSxDQUFRLElBQVI7QUFDQSxJQUFBLFFBQUEsQ0FBUyxtQkFBVCxDQUE2QixvQkFBN0IsRUFBbUQsWUFBbkQ7QUFBbUQsR0FGcEQ7O0FBS0EsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsb0JBQTFCLEVBQWdELFlBQWhELEU7O0FDTEEsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbkQsSUFBQSxRQUFBLENBQVMsYUFBVCxDQUF1QixJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQXVDLEdBRHhDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5rZWQgaGVhZGluZy5cbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgTGlua2VkSGVhZGluZyB7XG5cblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKiBAcHVibGljXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGhlYWRpbmdFbGVtZW50IC0gVGhlIGhlYWRpbmcgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGxpbmtlZCBoZWFkaW5nXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5jb250ZW50PVwiwrZcIl0gLSBUaGUgY29udGVudCB0byBhZGQgdG8gdGhlIGNyZWF0ZWQgbGlua1xuXHQgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudGl0bGU9XCJMaW5rIGRpcmVjdGx5IHRvIHRoaXMgc2VjdGlvbiBvZiB0aGUgcGFnZVwiXSAtIFRoZSB0aXRsZSBhdHRyaWJ1dGUgdG8gYWRkIHRvIHRoZSBjcmVhdGVkIGxpbmtcblx0ICovXG5cdGNvbnN0cnVjdG9yIChoZWFkaW5nRWxlbWVudCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5oZWFkaW5nRWxlbWVudCA9IGhlYWRpbmdFbGVtZW50O1xuXHRcdHRoaXMuaWQgPSBoZWFkaW5nRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG5cdFx0XHRjb250ZW50OiAnIycsXG5cdFx0XHR0aXRsZTogJ0xpbmsgZGlyZWN0bHkgdG8gdGhpcyBzZWN0aW9uIG9mIHRoZSBwYWdlJ1xuXHRcdH0sIG9wdGlvbnMpO1xuXG5cdFx0dGhpcy5saW5rRWxlbWVudCA9IHRoaXMuY29uc3RydWN0TGlua0VsZW1lbnQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3QgdGhlIGhlYWRpbmcgbGluayBlbGVtZW50LiBJZiBhIGxpbmsgZWxlbWVudCBhbHJlYWR5IGV4aXN0cyBpbnNpZGUgdGhlIGhlYWRpbmcsXG5cdCAqIHRoZW4gdGhpcyBtZXRob2Qgd2lsbCBkbyBub3RoaW5nXG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gUmV0dXJucyB0aGUgbmV3IGxpbmsgZWxlbWVudCwgb3IgdGhlIGV4aXN0aW5nIGxpbmsgZWxlbWVudCBpZiBwcmVzZW50XG5cdCAqL1xuXHRjb25zdHJ1Y3RMaW5rRWxlbWVudCAoKSB7XG5cdFx0aWYgKCF0aGlzLmlkKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBDaGVjayBmb3IgYW4gZXhpc3RpbmcgbGluayBlbGVtZW50XG5cdFx0Y29uc3QgZXhpc3RpbmdBbmNob3IgPSB0aGlzLmhlYWRpbmdFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcblx0XHRpZiAoZXhpc3RpbmdBbmNob3IpIHtcblx0XHRcdHJldHVybiBleGlzdGluZ0FuY2hvcjtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgaGVhZGluZyBhbmNob3IuXG5cdFx0Y29uc3QgaGVhZGluZ1RleHQgPSB0aGlzLmhlYWRpbmdFbGVtZW50LmlubmVySFRNTC50cmltKCk7XG5cdFx0Y29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cdFx0YW5jaG9yLmhyZWYgPSBgIyR7dGhpcy5pZH1gO1xuXHRcdGFuY2hvci50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZTtcblx0XHRhbmNob3IuY2xhc3NMaXN0LmFkZCgnby1sYXlvdXRfX2xpbmtlZC1oZWFkaW5nX19saW5rJyk7XG5cdFx0YW5jaG9yLmlubmVySFRNTCA9IGBcblx0XHRcdDxzcGFuIGNsYXNzPVwiby1sYXlvdXRfX2xpbmtlZC1oZWFkaW5nX19jb250ZW50XCI+JHtoZWFkaW5nVGV4dH08L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzcz1cIm8tbGF5b3V0X19saW5rZWQtaGVhZGluZ19fbGFiZWxcIj4ke3RoaXMub3B0aW9ucy5jb250ZW50fTwvc3Bhbj5cblx0XHRgO1xuXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmhlYWRpbmdFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRcdFx0dGhpcy5oZWFkaW5nRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvLWxheW91dF9fbGlua2VkLWhlYWRpbmcnKTtcblx0XHRcdHRoaXMuaGVhZGluZ0VsZW1lbnQuYXBwZW5kQ2hpbGQoYW5jaG9yKTtcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdFx0cmV0dXJuIGFuY2hvcjtcblx0fVxuXG59XG5cbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IExpbmtlZEhlYWRpbmc7XG4iLCJpbXBvcnQgTGlua2VkSGVhZGluZyBmcm9tICcuL2xpbmtlZC1oZWFkaW5nLmpzJztcblxuY2xhc3MgTGF5b3V0IHtcblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbbGF5b3V0RWxdIC0gVGhlIGxheW91dCBlbGVtZW50IGluIHRoZSBET01cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyBhc3BlY3RzIG9mIHRoZSBsYXlvdXRcblx0ICovXG5cdGNvbnN0cnVjdG9yKGxheW91dEVsLCBvcHRpb25zKSB7XG5cdFx0dGhpcy5sYXlvdXRFbCA9IGxheW91dEVsO1xuXHRcdHRoaXMuaGlnaGxpZ2h0ZWRIZWFkaW5nSW5kZXggPSAwO1xuXG5cdFx0Y29uc3QgaXNEb2NzTGF5b3V0ID0gdGhpcy5sYXlvdXRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ28tbGF5b3V0LS1kb2NzJyk7XG5cdFx0Y29uc3QgaXNRdWVyeUxheW91dCA9IHRoaXMubGF5b3V0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvLWxheW91dC0tcXVlcnknKTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtcblx0XHRcdGNvbnN0cnVjdE5hdjogaXNEb2NzTGF5b3V0ID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdFx0bmF2SGVhZGluZ1NlbGVjdG9yOiAnaDEsIGgyLCBoMycsXG5cdFx0XHRsaW5rSGVhZGluZ3M6IHRydWUsXG5cdFx0XHRsaW5rZWRIZWFkaW5nU2VsZWN0b3I6ICdoMSwgaDIsIGgzLCBoNCwgaDUsIGg2Jyxcblx0XHR9LCBvcHRpb25zIHx8IExheW91dC5nZXREYXRhQXR0cmlidXRlcyhsYXlvdXRFbCkpO1xuXG5cdFx0Ly8gR2V0IGxpbmthYmxlIGhlYWRpbmdzLlxuXHRcdGNvbnN0IGxpbmthYmxlSGVhZGluZ3MgPSBBcnJheS5mcm9tKHRoaXMubGF5b3V0RWwucXVlcnlTZWxlY3RvckFsbCh0aGlzLm9wdGlvbnMubGlua2VkSGVhZGluZ1NlbGVjdG9yKSlcblx0XHRcdC5maWx0ZXIoaGVhZGluZyA9PiBoZWFkaW5nLmdldEF0dHJpYnV0ZSgnaWQnKSk7XG5cblx0XHQvLyBDb25zdHJ1Y3QgbGlua2FibGUgaGVhZGluZ3MuXG5cdFx0dGhpcy5saW5rZWRIZWFkaW5ncyA9IFtdO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMubGlua0hlYWRpbmdzKSB7XG5cdFx0XHR0aGlzLmxpbmtlZEhlYWRpbmdzID0gbGlua2FibGVIZWFkaW5ncy5tYXAoaGVhZGluZyA9PiBuZXcgTGlua2VkSGVhZGluZyhoZWFkaW5nLCB7fSkpO1xuXHRcdH1cblxuXHRcdC8vIEdldCBuYXYgaGVhZGluZ3MuXG5cdFx0dGhpcy5uYXZIZWFkaW5ncyA9IEFycmF5LmZyb20odGhpcy5sYXlvdXRFbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5uYXZIZWFkaW5nU2VsZWN0b3IpKVxuXHRcdFx0LmZpbHRlcihoZWFkaW5nID0+IGhlYWRpbmcuZ2V0QXR0cmlidXRlKCdpZCcpKTtcblxuXHRcdC8vIENvbnN0cnVjdCB0aGUgZGVmYXVsdCBuYXZpZ2F0aW9uLlxuXHRcdGlmICgoaXNEb2NzTGF5b3V0IHx8IGlzUXVlcnlMYXlvdXQpICYmIHRoaXMub3B0aW9ucy5jb25zdHJ1Y3ROYXYpIHtcblx0XHRcdHRoaXMuY29uc3RydWN0TmF2RnJvbURPTSgpO1xuXHRcdH1cblxuXHRcdC8vIE9yIGhpZ2hsaWdodCBhIGN1c3RvbSBuYXZpZ2F0aW9uLlxuXHRcdGlmICgoaXNEb2NzTGF5b3V0IHx8IGlzUXVlcnlMYXlvdXQpICYmICF0aGlzLm9wdGlvbnMuY29uc3RydWN0TmF2KSB7XG5cdFx0XHRjb25zdCBuYXZpZ2F0aW9uID0gdGhpcy5sYXlvdXRFbC5xdWVyeVNlbGVjdG9yKGAuby1sYXlvdXRfX25hdmlnYXRpb25gKTtcblx0XHRcdGlmIChuYXZpZ2F0aW9uKSB7XG5cdFx0XHRcdC8qKiBAdHlwZSB7QXJyYXk8SFRNTEFuY2hvckVsZW1lbnQ+fSAqL1xuXHRcdFx0XHR0aGlzLm5hdkFuY2hvcnMgPSBBcnJheS5mcm9tKG5hdmlnYXRpb24ucXVlcnlTZWxlY3RvckFsbCgnYScpKTtcblx0XHRcdFx0dGhpcy5oaWdobGlnaHROYXZJdGVtcygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGhlYWRpbmcgY29udGVudC5cblx0ICogQHBhcmFtIHtFbGVtZW50fSBoZWFkaW5nXG5cdCAqIEBhY2Nlc3MgcHJpdmF0ZVxuXHQgKi9cblx0c3RhdGljIF9nZXRDb250ZW50RnJvbUhlYWRpbmcoaGVhZGluZykge1xuXHRcdGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gaGVhZGluZy5xdWVyeVNlbGVjdG9yKGAuby1sYXlvdXRfX2xpbmtlZC1oZWFkaW5nX19jb250ZW50YCk7XG5cdFx0Y29uc3QgaGVhZGluZ1RleHQgPSBjb250ZW50RWxlbWVudCA/IGNvbnRlbnRFbGVtZW50LnRleHRDb250ZW50IDogaGVhZGluZy50ZXh0Q29udGVudDtcblx0XHRyZXR1cm4gaGVhZGluZ1RleHQ7XG5cdH1cblxuXHQvKipcblx0ICogQ29uc3RydWN0IHRoZSBzaWRlYmFyIG5hdmlnYXRpb24gZnJvbSBoZWFkaW5ncyB3aXRoaW4gdGhlIERPTS5cblx0ICovXG5cdGNvbnN0cnVjdE5hdkZyb21ET00gKCkge1xuXHRcdC8vIEdldCBhbiBhcnJheSBvZiBoZWFkaW5ncy4gSWYgdGhlcmUgYXJlIGgyIGhlYWRpbmdzIGZvbGxvd2VkIGJ5IGgzIGhlYWRpbmdzIChvciBsb3dlciksXG5cdFx0Ly8gYWRkIGEgcHJvcGVydHkgYHN1Ykl0ZW1zYCB0byB0aGUgcGFyZW50IGgyIHdoaWNoIGNvbnRhaW5zIGFuIGFycmF5IG9mIHRoZSBmb2xsb3dpbmcgc21hbGxlciBoZWFkaW5ncy5cblx0XHRjb25zdCBoZWFkaW5nc1dpdGhIaWVyYXJjaHkgPSBBcnJheS5mcm9tKHRoaXMubmF2SGVhZGluZ3MpLnJlZHVjZSgoaGVhZGluZ3MsIGhlYWRpbmcpID0+IHtcblx0XHRcdGNvbnN0IHN1cHBvcnRlZEhlYWRpbmdzID0gWydIMycsICdINCcsICdINScsICdINiddO1xuXHRcdFx0Y29uc3QgcGFyZW50cyA9IGhlYWRpbmdzLmZpbHRlcihoZWFkaW5nID0+IGhlYWRpbmcubm9kZU5hbWUgPT09ICdIMicpO1xuXHRcdFx0Y29uc3QgcGFyZW50ID0gcGFyZW50cyA/IHBhcmVudHNbcGFyZW50cy5sZW5ndGggLSAxXSA6IG51bGw7XG5cdFx0XHRpZiAoIWhlYWRpbmdzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gW2hlYWRpbmddO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBhcmVudCAmJiBzdXBwb3J0ZWRIZWFkaW5ncy5pbmNsdWRlcyhoZWFkaW5nLm5vZGVOYW1lKSkge1xuXHRcdFx0XHRwYXJlbnQuc3ViSXRlbXMgPSBwYXJlbnQuc3ViSXRlbXMgPyBbLi4ucGFyZW50LnN1Ykl0ZW1zLCBoZWFkaW5nXSA6IFtoZWFkaW5nXTtcblx0XHRcdFx0cmV0dXJuIGhlYWRpbmdzO1xuXHRcdFx0fVxuXHRcdFx0aGVhZGluZ3MucHVzaChoZWFkaW5nKTtcblx0XHRcdHJldHVybiBoZWFkaW5ncztcblx0XHR9LCBbXSk7XG5cblx0XHQvLyBDcmVhdGUgdGhlIG5hdiBtYXJrdXAuXG5cdFx0Y29uc3QgbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG5cdFx0bmF2LmNsYXNzTGlzdC5hZGQoYG8tbGF5b3V0X19uYXZpZ2F0aW9uYCk7XG5cdFx0Y29uc3QgbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG5cdFx0bGlzdC5jbGFzc0xpc3QuYWRkKGBvLWxheW91dF9fdW5zdHlsZWQtZWxlbWVudGApO1xuXHRcdGNvbnN0IGxpc3RJbm5lckhUTUwgPSBBcnJheS5mcm9tKGhlYWRpbmdzV2l0aEhpZXJhcmNoeSkucmVkdWNlKChodG1sLCBoZWFkaW5nKSA9PiB7XG5cdFx0XHRjb25zdCBwYWdlVGl0bGVDbGFzcyA9IGhlYWRpbmcubm9kZU5hbWUgPT09ICdIMScgPyAnby1sYXlvdXRfX25hdmlnYXRpb24tdGl0bGUnIDogJyc7XG5cdFx0XHRyZXR1cm4gaHRtbCArIGBcbjxsaSBjbGFzcz1cIm8tbGF5b3V0X191bnN0eWxlZC1lbGVtZW50ICR7cGFnZVRpdGxlQ2xhc3N9XCI+XG5cdDxhIGNsYXNzPVwiby1sYXlvdXRfX3Vuc3R5bGVkLWVsZW1lbnRcIiBocmVmPScjJHtoZWFkaW5nLmlkfSc+JHtMYXlvdXQuX2dldENvbnRlbnRGcm9tSGVhZGluZyhoZWFkaW5nKX08L2E+XG5cdCR7aGVhZGluZy5zdWJJdGVtcyA/IGBcblx0PG9sPlxuXHQke2hlYWRpbmcuc3ViSXRlbXMucmVkdWNlKChodG1sLCBoZWFkaW5nKSA9PiB7XG5cdFx0cmV0dXJuIGh0bWwgKyBgPGxpPjxhIGNsYXNzPVwiby1sYXlvdXRfX3Vuc3R5bGVkLWVsZW1lbnRcIiBocmVmPVwiIyR7aGVhZGluZy5pZH1cIj4ke0xheW91dC5fZ2V0Q29udGVudEZyb21IZWFkaW5nKGhlYWRpbmcpfTwvYT48L2xpPmA7XG5cdH0sICcnKX1cblx0PC9vbD5cblx0YCA6ICcnfVxuPC9saT5gO1xuXHRcdH0sICcnKTtcblx0XHRsaXN0LmlubmVySFRNTCA9IGxpc3RJbm5lckhUTUw7XG5cdFx0bmF2LmFwcGVuZENoaWxkKGxpc3QpO1xuXG5cdFx0Ly8gQWRkIHRoZSBuYXYgdG8gdGhlIHBhZ2UuXG5cdFx0Y29uc3Qgc2lkZWJhciA9IHRoaXMubGF5b3V0RWwucXVlcnlTZWxlY3RvcihgLm8tbGF5b3V0X19zaWRlYmFyYCkgfHwgdGhpcy5sYXlvdXRFbC5xdWVyeVNlbGVjdG9yKGAuby1sYXlvdXRfX3F1ZXJ5LXNpZGViYXJgKTtcblx0XHRpZiAoc2lkZWJhcikge1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRcdHNpZGViYXIuYXBwZW5kKG5hdik7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKiogQHR5cGUge0FycmF5PEhUTUxBbmNob3JFbGVtZW50Pn0gKi9cblx0XHR0aGlzLm5hdkFuY2hvcnMgPSBBcnJheS5mcm9tKG5hdi5xdWVyeVNlbGVjdG9yQWxsKCdhJykpO1xuXHRcdHRoaXMuaGlnaGxpZ2h0TmF2SXRlbXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYXJpYS1jdXJyZW50IHRvIHRoZSBuYXZpZ2F0aW9uIGxpbmsgdGhhdCB3YXMgY2xpY2tlZFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHNldHVwQ2xpY2tIYW5kbGVyc0Zvck5hdmlnYXRpb25TaWRlYmFyKCkge1xuXHRcdHRoaXMubmF2QW5jaG9ycy5mb3JFYWNoKChhbmNob3IsIGluZGV4KSA9PiB7XG5cdFx0XHRhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGZvciAoY29uc3Qgc2lkZWJhckFuY2hvciBvZiB0aGlzLm5hdkFuY2hvcnMpIHtcblx0XHRcdFx0XHRpZiAoc2lkZWJhckFuY2hvciA9PT0gYW5jaG9yKSB7XG5cdFx0XHRcdFx0XHRzaWRlYmFyQW5jaG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ2xvY2F0aW9uJyk7XG5cdFx0XHRcdFx0XHR0aGlzLmhpZ2hsaWdodGVkSGVhZGluZ0luZGV4ID0gaW5kZXg7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNpZGViYXJBbmNob3Iuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAnZmFsc2UnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhcmlhLWN1cnJlbnQgdG8gdGhlIGNvcnJlc3BvZGluZyBsaW5rIGluIHRoZSBuYXZpZ2F0aW9uIGZvciB0aGUgaGVhZGVyIHRoYXQgd2FzIGNsaWNrZWRcblx0ICogQHByaXZhdGVcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRzZXR1cENsaWNrSGFuZGxlcnNGb3JIZWFkaW5ncygpIHtcblx0XHR0aGlzLm5hdkhlYWRpbmdzLmZvckVhY2goKGhlYWRpbmdBbmNob3IsIGluZGV4KSA9PiB7XG5cdFx0XHRoZWFkaW5nQW5jaG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRmb3IgKGNvbnN0IHNpZGViYXJBbmNob3Igb2YgdGhpcy5uYXZBbmNob3JzKSB7XG5cdFx0XHRcdFx0aWYgKHNpZGViYXJBbmNob3IuaGFzaCA9PT0gJyMnICsgaGVhZGluZ0FuY2hvci5pZCkge1xuXHRcdFx0XHRcdFx0c2lkZWJhckFuY2hvci5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICdsb2NhdGlvbicpO1xuXHRcdFx0XHRcdFx0dGhpcy5oaWdobGlnaHRlZEhlYWRpbmdJbmRleCA9IGluZGV4O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzaWRlYmFyQW5jaG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ2ZhbHNlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGQgYXJpYS1jdXJyZW50IHRvIHRoZSBjb3JyZXNwb2RpbmcgbGluayBpbiB0aGUgbmF2aWdhdGlvbiBmb3IgdGhlIGhhc2ggaW4gdGhlIHVybCBpZiBvbmUgZXhpc3RzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0aGlnaGxpZ2h0TmF2aWdhdGlvbkZyb21Mb2NhdGlvbigpIHtcblx0XHRpZiAobG9jYXRpb24uaGFzaCkge1xuXHRcdFx0Ly8gb24gcGFnZSBsb2FkLCBoaWdobGlnaHQgdGhlIG5hdiBpdGVtIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHVybFxuXHRcdFx0dGhpcy5uYXZBbmNob3JzLmZvckVhY2goKGFuY2hvciwgaW5kZXgpID0+IHtcblx0XHRcdFx0Y29uc3QgY3VycmVudExvY2F0aW9uID0gYW5jaG9yLmhhc2ggPT09IGxvY2F0aW9uLmhhc2g7XG5cdFx0XHRcdGNvbnN0IGRlZmF1bHRMb2NhdGlvbiA9IGxvY2F0aW9uLmhhc2ggPT09ICcnICYmIGluZGV4ID09PSAwO1xuXHRcdFx0XHRpZiAoY3VycmVudExvY2F0aW9uIHx8IGRlZmF1bHRMb2NhdGlvbikge1xuXHRcdFx0XHRcdGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICdsb2NhdGlvbicpO1xuXHRcdFx0XHRcdHRoaXMuaGlnaGxpZ2h0ZWRIZWFkaW5nSW5kZXggPSBpbmRleDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbmNob3Iuc2V0QXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnLCAnZmFsc2UnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEFkZCBhcmlhLWN1cnJlbnQgdG8gdGhlIGNvcnJlc3BvZGluZyBsaW5rIGluIHRoZSBuYXZpZ2F0aW9uIGZvciB0aGUgaGVhZGVyIHRoYXQgd2UgdGhpbmtcblx0ICogc2hvdWxkIGJlIGhpZ2hsaWdodGVkIGJhc2VkIG9uIHNjcm9sbCBwb3NpdGlvblxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdCBzZXR1cEludGVyc2VjdGlvbk9ic2VydmVyc0ZvckhlYWRpbmdzKCkge1xuXHRcdGZ1bmN0aW9uIGdldFkoZG9tUmVjdCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkb21SZWN0LCAneScpXG5cdFx0XHRcdD8gZG9tUmVjdC55XG5cdFx0XHRcdDogZG9tUmVjdC50b3A7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuby1sYXlvdXRfX21haW4gJyk7XG5cdFx0bGV0IGhlYWRpbmdGb250U2l6ZSA9ICcxNnB4Jztcblx0XHRpZiAobWFpblNlY3Rpb24pIHtcblx0XHRcdGhlYWRpbmdGb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1haW5TZWN0aW9uKS5mb250U2l6ZTtcblx0XHR9XG5cblx0XHRjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcblx0XHRcdGVudHJpZXMgPT4ge1xuXHRcdFx0XHRsZXQgaGVhZGluZ0luZGV4VG9IaWdobGlnaHQgPSB0aGlzLmhpZ2hsaWdodGVkSGVhZGluZ0luZGV4O1xuXG5cdFx0XHRcdC8vIFJlY29yZCBpbmRleCBvZiB3aGljaCBoZWFkaW5ncyBhcmUgYWJvdmUgb3IgYmVsb3cgdGhlIGludGVyc2VjdGlvbiB0YXJnZXRcblx0XHRcdFx0Y29uc3QgYWJvdmUgPSBbXTtcblx0XHRcdFx0Y29uc3QgYmVsb3cgPSBbXTtcblx0XHRcdFx0ZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcblx0XHRcdFx0XHRjb25zdCBpbnRlcnNlY3RpbmdFbGVtSWR4ID0gdGhpcy5uYXZIZWFkaW5ncy5maW5kSW5kZXgoXG5cdFx0XHRcdFx0XHRuYXZoZWFkaW5nID0+IG5hdmhlYWRpbmcgPT09IGVudHJ5LnRhcmdldFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0Y29uc3QgaXNBYm92ZSA9XG5cdFx0XHRcdFx0XHRnZXRZKGVudHJ5LmJvdW5kaW5nQ2xpZW50UmVjdCkgPCAoZ2V0WShlbnRyeS5yb290Qm91bmRzIHx8IHt9KSB8fCAwKTtcblx0XHRcdFx0XHRpZiAoaXNBYm92ZSkge1xuXHRcdFx0XHRcdFx0YWJvdmUucHVzaChpbnRlcnNlY3RpbmdFbGVtSWR4KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YmVsb3cucHVzaChpbnRlcnNlY3RpbmdFbGVtSWR4KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIElmIHRoZXJlIGFyZSBoZWFkaW5ncyBhYm92ZSB0aGUgaW50ZXJzZWN0aW9uIHRhcmdldCxcblx0XHRcdFx0Ly8gc2V0IHRoZSBhY3RpdmUgaGVhZGluZyBhcyB0aGUgbGFzdCBvbmUgd2hpY2ggaXMgYWJvdmUgdGhlIGludGVyc2VjdGlvbiB0YXJnZXRcblx0XHRcdFx0aWYgKGFib3ZlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHQvLyBGaW5kIHRoZSBsYXN0IGhlYWRpbmcgaW5kZXggd2hpY2ggaXMgYWJvdmUgdGhlIGludGVyc2VjdGlvbiB0YXJnZXRcblx0XHRcdFx0XHRoZWFkaW5nSW5kZXhUb0hpZ2hsaWdodCA9IE1hdGgubWF4KC4uLmFib3ZlKTtcblx0XHRcdFx0fSBlbHNlIGlmIChiZWxvdy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Ly8gRmluZCB0aGUgZmlyc3QgaGVhZGluZyBpbmRleCB3aGljaCBpcyBiZWxvdyB0aGUgaW50ZXJzZWN0aW9uIHRhcmdldFxuXHRcdFx0XHRcdGNvbnN0IG1pbkluZGV4ID0gTWF0aC5taW4oLi4uYmVsb3cpO1xuXHRcdFx0XHRcdGlmIChtaW5JbmRleCA8PSB0aGlzLmhpZ2hsaWdodGVkSGVhZGluZ0luZGV4KSB7XG5cdFx0XHRcdFx0XHQvLyBJZiB0aGVyZSBhcmUgbm8gaGVhZGluZ3MgYWJvdmUgIHRoZSBpbnRlcnNlY3Rpb24gdGFyZ2V0IGFuZCB0aGUgY3VycmVudFxuXHRcdFx0XHRcdFx0Ly8gYWN0aXZlIGhlYWRpbmcgaXMgbGF0ZXIgZG93biB0aGUgcGFnZSB0aGVuIHVzZSB0aGUgZmlyc3QgaGVhZGluZyB3aGljaCBpcyBiZWxvd1xuXHRcdFx0XHRcdFx0aGVhZGluZ0luZGV4VG9IaWdobGlnaHQgPSBtaW5JbmRleCAtIDEgPj0gMCA/IG1pbkluZGV4IC0gMSA6IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMubmF2QW5jaG9ycy5mb3JFYWNoKChhbmNob3IsIGluZGV4KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGhlYWRpbmdJbmRleFRvSGlnaGxpZ2h0ID09PSBpbmRleCkge1xuXHRcdFx0XHRcdFx0YW5jaG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ2xvY2F0aW9uJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICdmYWxzZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRoaXMuaGlnaGxpZ2h0ZWRIZWFkaW5nSW5kZXggPSBoZWFkaW5nSW5kZXhUb0hpZ2hsaWdodDtcblx0XHRcdH0sIHtcblx0XHRcdFx0cm9vdE1hcmdpbjogYC0ke1xuXHRcdFx0XHRcdGhlYWRpbmdGb250U2l6ZVxuXHRcdFx0XHR9IDBweCAwcHggMHB4YCxcblx0XHRcdFx0dGhyZXNob2xkOiAwLjEsXG5cdFx0XHR9XG5cdFx0KTtcblx0XHR0aGlzLm5hdkhlYWRpbmdzLmZvckVhY2goaGVhZGluZyA9PiB7XG5cdFx0XHRvYnNlcnZlci5vYnNlcnZlKGhlYWRpbmcpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gV2hlbiB3ZSByZWFjaCB0aGUgYm90dG9tIHdlIHdhbnQgdG8gc2V0IHRoZSBsYXN0IGhlYWRpbmcgYXMgdGhlIGN1cnJlbnQgYWN0aXZlIGhlYWRpbmdcblx0XHRjb25zdCBvYnNlcnZlcmJvdHRvbSA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xuXHRcdFx0aWYgKGVudHJpZXNbMF0uaXNJbnRlcnNlY3RpbmcgPT09IHRydWUpIHtcblx0XHRcdFx0dGhpcy5oaWdobGlnaHRlZEhlYWRpbmdJbmRleCA9IHRoaXMubmF2QW5jaG9ycy5sZW5ndGggLSAxO1xuXHRcdFx0XHR0aGlzLm5hdkFuY2hvcnMuZm9yRWFjaCgoYW5jaG9yLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLmhpZ2hsaWdodGVkSGVhZGluZ0luZGV4ID09PSBpbmRleCkge1xuXHRcdFx0XHRcdFx0YW5jaG9yLnNldEF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50JywgJ2xvY2F0aW9uJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcsICdmYWxzZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0dGhyZXNob2xkOiAxLCAvLyBUcmlnZ2VyIG9ubHkgd2hlbiB3aG9sZSBlbGVtZW50IHdhcyB2aXNpYmxlXG5cdFx0fSk7XG5cblx0XHRjb25zdCBsYXN0RWxlbWVudE9uUGFnZSA9IHRoaXMubGF5b3V0RWwucXVlcnlTZWxlY3RvcignLm8tbGF5b3V0X19mb290ZXInKSB8fCB0aGlzLmxheW91dEVsLnF1ZXJ5U2VsZWN0b3IoJy5vLWxheW91dF9fbWFpbicpLmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0b2JzZXJ2ZXJib3R0b20ub2JzZXJ2ZShsYXN0RWxlbWVudE9uUGFnZSk7XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlcyBuYXZpZ2F0aW9uIGl0ZW0gaGlnaGxpZ2h0aW5nIGJhc2VkIG9uIHNjcm9sbCBwb3NpdGlvbi5cblx0ICogUmVsaWVzIG9uIGhlYWRpbmcgaWRzIGFuZCBhbmNob3IgaHJlZiBiZWluZyB0aGUgc2FtZS5cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRoaWdobGlnaHROYXZJdGVtcygpIHtcblx0XHR0aGlzLnNldHVwQ2xpY2tIYW5kbGVyc0Zvck5hdmlnYXRpb25TaWRlYmFyKCk7XG5cdFx0dGhpcy5zZXR1cENsaWNrSGFuZGxlcnNGb3JIZWFkaW5ncygpO1xuXHRcdHRoaXMuaGlnaGxpZ2h0TmF2aWdhdGlvbkZyb21Mb2NhdGlvbigpO1xuXHRcdGlmICh0eXBlb2Ygc2VsZi5JbnRlcnNlY3Rpb25PYnNlcnZlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhpcy5zZXR1cEludGVyc2VjdGlvbk9ic2VydmVyc0ZvckhlYWRpbmdzKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIGxheW91dEVsLiBJZiB0aGUgbGF5b3V0IGlzIGJlaW5nIHNldCB1cFxuXHQgKiBkZWNsYXJhdGl2ZWx5LCB0aGlzIG1ldGhvZCBpcyB1c2VkIHRvIGV4dHJhY3QgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBET00uXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGxheW91dEVsZW1lbnQgLSBUaGUgbGF5b3V0IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKi9cblx0c3RhdGljIGdldERhdGFBdHRyaWJ1dGVzIChsYXlvdXRFbGVtZW50KSB7XG5cdFx0aWYgKCEobGF5b3V0RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMobGF5b3V0RWxlbWVudC5kYXRhc2V0KS5yZWR1Y2UoKG9wdGlvbnMsIGtleSkgPT4ge1xuXG5cdFx0XHQvLyBJZ25vcmUgZGF0YS1vLWNvbXBvbmVudFxuXHRcdFx0aWYgKGtleSA9PT0gJ29Db21wb25lbnQnKSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCdWlsZCBhIGNvbmNpc2Uga2V5IGFuZCBnZXQgdGhlIG9wdGlvbiB2YWx1ZVxuXHRcdFx0Y29uc3Qgc2hvcnRLZXkgPSBrZXkucmVwbGFjZSgvXm9MYXlvdXQoXFx3KShcXHcrKSQvLCAobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTIpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBsYXlvdXRFbGVtZW50LmRhdGFzZXRba2V5XTtcblxuXHRcdFx0Ly8gVHJ5IHBhcnNpbmcgdGhlIHZhbHVlIGFzIEpTT04sIG90aGVyd2lzZSBqdXN0IHNldCBpdCBhcyBhIHN0cmluZ1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9LCB7fSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIGxheW91dCBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIHRoZSBsYXlvdXQgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgbGF5b3V0IGJlaGF2aW91ci5cblx0ICogQHJldHVybnMge0xheW91dCB8IExheW91dFtdfSBSZXR1cm5zIGVpdGhlciBhIHNpbmdsZSBMYXlvdXQgaW5zdGFuY2Ugb3IgYW4gYXJyYXkgb2YgTGF5b3V0IGluc3RhbmNlc1xuXHQgKi9cblx0c3RhdGljIGluaXQgKHJvb3RFbCwgb3B0cykge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLWxheW91dF0nKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBMYXlvdXQocm9vdEVsLCBvcHRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1sYXlvdXRcIl0nKSwgcm9vdEVsID0+IG5ldyBMYXlvdXQocm9vdEVsLCBvcHRzKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0O1xuIiwiaW1wb3J0IG9MYXlvdXQgZnJvbSAnLi9zcmMvanMvbGF5b3V0LmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24oKSB7XG5cdG9MYXlvdXQuaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgb0xheW91dDtcbiIsImltcG9ydCAnLi8uLi8uLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pO1xuIl19