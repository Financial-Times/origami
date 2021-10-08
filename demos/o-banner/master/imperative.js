function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/banner.js
  var className = "o-banner";
  var classNames = {
    closed: "".concat(className, "--closed"),
    outer: "".concat(className, "__outer"),
    inner: "".concat(className, "__inner"),
    content: "".concat(className, "__content"),
    longContent: "".concat(className, "__content--long"),
    shortContent: "".concat(className, "__content--short"),
    actions: "".concat(className, "__actions"),
    action: "".concat(className, "__action"),
    secondaryAction: "".concat(className, "__action--secondary"),
    button: "".concat(className, "__button"),
    link: "".concat(className, "__link"),
    close: "".concat(className, "__close")
  };

  var Banner = /*#__PURE__*/function () {
    "use strict";

    function Banner(bannerElement, options) {
      _classCallCheck(this, Banner);

      this.bannerElement = bannerElement;
      this.options = Object.assign({}, {
        autoOpen: true,
        suppressCloseButton: false,
        closeExistingBanners: true,
        appendTo: document.body,
        contentLong: "&hellip;",
        contentShort: null,
        buttonLabel: "OK",
        buttonUrl: "#",
        formAction: null,
        formEncoding: "application/x-www-form-urlencoded",
        formMethod: "post",
        linkLabel: null,
        linkUrl: "#",
        closeButtonLabel: "Close",
        theme: null,
        layout: null
      }, options || Banner.getOptionsFromDom(bannerElement));

      if (this.options.theme && typeof this.options.theme !== "string") {
        throw new Error("\"".concat(this.options.theme, "\" must be a string."));
      }

      var validLayouts = ["small", "compact"];
      var layout = this.options.layout;

      if (layout && !validLayouts.includes(layout)) {
        throw new Error("\"".concat(layout, "\" is not a valid layout. Use one of ").concat(validLayouts, "."));
      }

      try {
        if (typeof this.options.appendTo === "string") {
          this.options.appendTo = document.querySelector(this.options.appendTo);
        }

        if (this.options.appendTo instanceof HTMLElement !== true) {
          throw new Error("It is not an Node instance.");
        }
      } catch (error) {
        throw new Error("Cound not find the element to append the banner to: ".concat(error.message), this);
      }

      this.render();

      if (this.options.closeExistingBanners) {
        Banner._bannerInstances.forEach(function (banner) {
          return banner.close();
        });

        Banner._bannerInstances = [this];
      } else {
        Banner._bannerInstances.push(this);
      }

      if (this.options.autoOpen) {
        this.open();
      } else {
        this.close();
      }
    }

    _createClass(Banner, [{
      key: "render",
      value: function render() {
        if (!(this.bannerElement instanceof HTMLElement)) {
          this.bannerElement = this.buildBannerElement();
          this.options.appendTo.appendChild(this.bannerElement);
        } else if (this.bannerElement.innerHTML.trim() === "") {
          this.bannerElement = this.buildBannerElement(this.bannerElement);
        } else if (!this.bannerElement.querySelector(".".concat(classNames.outer))) {
          this.options.contentLong = this.bannerElement.innerHTML;
          this.options.contentShort = null;
          this.bannerElement = this.buildBannerElement(this.bannerElement);
        }

        this.innerElement = this.bannerElement.querySelector("[data-o-banner-inner]");

        if (!this.options.suppressCloseButton) {
          this.closeButtonElement = this.buildCloseButtonElement();
          this.innerElement.appendChild(this.closeButtonElement);
        }
      }
    }, {
      key: "open",
      value: function open() {
        this.bannerElement.classList.remove(classNames.closed);
        this.bannerElement.dispatchEvent(new CustomEvent("o.bannerOpened"));
      }
    }, {
      key: "close",
      value: function close() {
        this.bannerElement.classList.add(classNames.closed);
        this.bannerElement.dispatchEvent(new CustomEvent("o.bannerClosed"));
      }
    }, {
      key: "buildBannerElement",
      value: function buildBannerElement(bannerElement) {
        bannerElement = bannerElement || document.createElement("div");
        bannerElement.innerHTML = "";
        bannerElement.classList.add(className);

        if (this.options.theme) {
          bannerElement.classList.add("".concat(className, "--").concat(this.options.theme));
        }

        if (this.options.layout) {
          bannerElement.classList.add("".concat(className, "--").concat(this.options.layout));
        }

        var contentHtml;

        if (this.options.contentShort) {
          contentHtml = "\n\t\t\t\t<div class=\"".concat(classNames.content, " ").concat(classNames.longContent, "\">\n\t\t\t\t\t").concat(this.options.contentLong, "\n\t\t\t\t</div>\n\t\t\t\t<div class=\"").concat(classNames.content, " ").concat(classNames.shortContent, "\">\n\t\t\t\t\t").concat(this.options.contentShort, "\n\t\t\t\t</div>\n\t\t\t");
        } else {
          contentHtml = "\n\t\t\t\t<div class=\"".concat(classNames.content, "\">\n\t\t\t\t\t").concat(this.options.contentLong, "\n\t\t\t\t</div>\n\t\t\t");
        }

        var primaryActionHtml = "";

        if (this.options.buttonLabel) {
          if (this.options.formAction !== null && this.options.formAction !== void 0) {
            primaryActionHtml = "\n\t\t\t\t\t<form class=\"".concat(classNames.action, "\" action=\"").concat(this.options.formAction, "\" enctype=\"").concat(this.options.formEncoding, "\" method=\"").concat(this.options.formMethod, "\">\n\t\t\t\t\t\t<input class=\"").concat(classNames.button, "\" type=\"submit\" value=\"").concat(this.options.buttonLabel, "\"/>\n\t\t\t\t\t</form>\n\t\t\t\t");
          } else {
            primaryActionHtml = "\n\t\t\t\t\t<div class=\"".concat(classNames.action, "\">\n\t\t\t\t\t\t<a href=\"").concat(this.options.buttonUrl, "\" class=\"").concat(classNames.button, "\">").concat(this.options.buttonLabel, "</a>\n\t\t\t\t\t</div>\n\t\t\t\t");
          }
        }

        var secondaryActionHtml = "";

        if (this.options.linkLabel) {
          secondaryActionHtml = "\n\t\t\t\t<div class=\"".concat(classNames.action, " ").concat(classNames.secondaryAction, "\">\n\t\t\t\t\t<a href=\"").concat(this.options.linkUrl, "\" class=\"").concat(classNames.link, "\">").concat(this.options.linkLabel, "</a>\n\t\t\t\t</div>\n\t\t\t");
        }

        bannerElement.innerHTML = "\n\t\t\t<div class=\"".concat(classNames.outer, "\">\n\t\t\t\t<div class=\"").concat(classNames.inner, "\" data-o-banner-inner=\"\">\n\t\t\t\t\t").concat(contentHtml, "\n\t\t\t\t\t").concat((primaryActionHtml || secondaryActionHtml) && "<div class=\"".concat(classNames.actions, "\">\n\t\t\t\t\t\t").concat(primaryActionHtml, "\n\t\t\t\t\t\t").concat(secondaryActionHtml, "\n\t\t\t\t\t</div>"), "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
        return bannerElement;
      }
    }, {
      key: "buildCloseButtonElement",
      value: function buildCloseButtonElement() {
        var _this = this;

        var closeButton = document.createElement("button");
        closeButton.className = classNames.close;
        closeButton.setAttribute("aria-label", this.options.closeButtonLabel);
        closeButton.setAttribute("title", this.options.closeButtonLabel);
        closeButton.addEventListener("click", function (event) {
          _this.close();

          event.preventDefault();
        });
        return closeButton;
      }
    }], [{
      key: "getOptionsFromDom",
      value: function getOptionsFromDom(bannerElement) {
        if (!(bannerElement instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(bannerElement.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oBanner(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = bannerElement.dataset[key];

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
      value: function init(rootElement, options) {
        if (!rootElement) {
          rootElement = document.body;
        }

        if (!(rootElement instanceof HTMLElement)) {
          rootElement = document.querySelector(rootElement);
        }

        if (rootElement instanceof HTMLElement && /\bo-banner\b/.test(rootElement.getAttribute("data-o-component"))) {
          return new Banner(rootElement, options);
        }

        return Array.from(rootElement.querySelectorAll('[data-o-component="o-banner"]'), function (rootElement2) {
          return new Banner(rootElement2, options);
        });
      }
    }]);

    return Banner;
  }();

  Banner._bannerInstances = [];
  var banner_default = Banner; // main.js

  function constructAll() {
    banner_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  }

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = banner_default; // demos/src/imperative.js

  var demoBannerConfigurations = [{
    elementId: "banner-standard",
    config: {
      contentLong: "\n\t\t\t\t<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>\n\t\t\t",
      contentShort: "\n\t\t\t\t<p>Try the new compact homepage.</p>\n\t\t\t",
      buttonLabel: "Try it now",
      linkLabel: "Give feedback"
    }
  }, {
    elementId: "banner-small",
    config: {
      contentLong: "\n\t\t\t\t<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>\n\t\t\t",
      contentShort: "\n\t\t\t\t<p>Try the new compact homepage.</p>\n\t\t\t",
      buttonLabel: "Try it now",
      linkLabel: "Give feedback",
      layout: "small"
    }
  }, {
    elementId: "banner-compact",
    config: {
      contentLong: "\n\t\t\t\t<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>\n\t\t\t",
      contentShort: "\n\t\t\t\t<p>Try the new compact homepage.</p>\n\t\t\t",
      buttonLabel: "Try it now",
      linkLabel: "Give feedback",
      layout: "compact"
    }
  }, {
    elementId: "banner-marketing",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<p>Limited time only</p>\n\t\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Global news and opinion from experts in 50+ countries</li>\n\t\t\t\t\t<li>Access on desktop and mobile</li>\n\t\t\t\t\t<li>Market-moving news, politics, tech, the arts and more</li>\n\t\t\t\t</ul>\n\t\t\t",
      contentShort: "\n\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t",
      buttonLabel: "Save 33% now",
      linkLabel: "Terms and conditions",
      theme: "marketing"
    }
  }, {
    elementId: "banner-marketing-small",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<p>Limited time only</p>\n\t\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Global news and opinion from experts in 50+ countries</li>\n\t\t\t\t\t<li>Access on desktop and mobile</li>\n\t\t\t\t\t<li>Market-moving news, politics, tech, the arts and more</li>\n\t\t\t\t</ul>\n\t\t\t",
      contentShort: "\n\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t",
      buttonLabel: "Save 33% now",
      linkLabel: "Terms and conditions",
      layout: "small",
      theme: "marketing"
    }
  }, {
    elementId: "banner-marketing-compact",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<p>Limited time only</p>\n\t\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Global news and opinion from experts in 50+ countries</li>\n\t\t\t\t\t<li>Access on desktop and mobile</li>\n\t\t\t\t\t<li>Market-moving news, politics, tech, the arts and more</li>\n\t\t\t\t</ul>\n\t\t\t",
      contentShort: "\n\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t",
      buttonLabel: "Save 33% now",
      linkLabel: "Terms and conditions",
      layout: "compact",
      theme: "marketing"
    }
  }, {
    elementId: "banner-product",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<h1>FT Compact</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>\n\t\t\t",
      contentShort: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<h1>FT Compact</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Try the new compact homepage.</p>\n\t\t\t",
      buttonLabel: "Try it now",
      linkLabel: "Give feedback",
      theme: "product"
    }
  }, {
    elementId: "banner-product-small",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<h1>FT Compact</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>\n\t\t\t",
      contentShort: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<h1>FT Compact</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Try the new compact homepage.</p>\n\t\t\t",
      buttonLabel: "Try it now",
      linkLabel: "Give feedback",
      layout: "small",
      theme: "product"
    }
  }, {
    elementId: "banner-product-compact",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<h1>FT Compact</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>\n\t\t\t",
      contentShort: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<h1>FT Compact</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Try the new compact homepage.</p>\n\t\t\t",
      buttonLabel: "Try it now",
      linkLabel: "Give feedback",
      layout: "compact",
      theme: "product"
    }
  }, {
    elementId: "banner-custom",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<p>Limited time only</p>\n\t\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Global news and opinion from experts in 50+ countries</li>\n\t\t\t\t\t<li>Access on desktop and mobile</li>\n\t\t\t\t\t<li>Market-moving news, politics, tech, the arts and more</li>\n\t\t\t\t</ul>\n\t\t\t",
      contentShort: "\n\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t",
      buttonLabel: "Save 33% now",
      linkLabel: "Terms and conditions",
      theme: "pikachu"
    }
  }, {
    elementId: "banner-custom-small",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<p>Limited time only</p>\n\t\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Global news and opinion from experts in 50+ countries</li>\n\t\t\t\t\t<li>Access on desktop and mobile</li>\n\t\t\t\t\t<li>Market-moving news, politics, tech, the arts and more</li>\n\t\t\t\t</ul>\n\t\t\t",
      contentShort: "\n\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t",
      buttonLabel: "Save 33% now",
      linkLabel: "Terms and conditions",
      layout: "small",
      theme: "pikachu"
    }
  }, {
    elementId: "banner-custom-compact",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<p>Limited time only</p>\n\t\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Global news and opinion from experts in 50+ countries</li>\n\t\t\t\t\t<li>Access on desktop and mobile</li>\n\t\t\t\t\t<li>Market-moving news, politics, tech, the arts and more</li>\n\t\t\t\t</ul>\n\t\t\t",
      contentShort: "\n\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t",
      buttonLabel: "Save 33% now",
      linkLabel: "Terms and conditions",
      layout: "compact",
      theme: "pikachu"
    }
  }, {
    elementId: "banner-form",
    config: {
      contentLong: "\n\t\t\t\t<header class=\"o-banner__heading\">\n\t\t\t\t\t<p>Limited time only</p>\n\t\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t</header>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t\t<ul>\n\t\t\t\t\t<li>Global news and opinion from experts in 50+ countries</li>\n\t\t\t\t\t<li>Access on desktop and mobile</li>\n\t\t\t\t\t<li>Market-moving news, politics, tech, the arts and more</li>\n\t\t\t\t</ul>\n\t\t\t",
      contentShort: "\n\t\t\t\t<h1>You qualify for a special offer: Save 33%</h1>\n\t\t\t\t<p>Pay just $4.29 per week for annual Standard Digital access.</p>\n\t\t\t",
      buttonLabel: "Save 33% now",
      linkLabel: "Terms and conditions",
      layout: "small",
      theme: "marketing",
      formAction: "#form-submitted",
      formMethod: "get"
    }
  }];

  function initDemos() {
    document.addEventListener("DOMContentLoaded", function () {
      demoBannerConfigurations.forEach(function (_ref) {
        var elementId = _ref.elementId,
            config = _ref.config;
        document.getElementById(elementId).addEventListener("click", function () {
          new main_default(null, config);
        });
      });
    });
  }

  initDemos();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9iYW5uZXIuanMiLCJtYWluLmpzIiwiZGVtb3Mvc3JjL2ltcGVyYXRpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNLFNBQUEsR0FBWSxVQUFsQjtBQUNBLE1BQU0sVUFBQSxHQUFhO0FBQ2xCLElBQUEsTUFBQSxZQUFXLFNBQVgsYUFEa0I7QUFFbEIsSUFBQSxLQUFBLFlBQVUsU0FBVixZQUZrQjtBQUdsQixJQUFBLEtBQUEsWUFBVSxTQUFWLFlBSGtCO0FBSWxCLElBQUEsT0FBQSxZQUFZLFNBQVosY0FKa0I7QUFLbEIsSUFBQSxXQUFBLFlBQWdCLFNBQWhCLG9CQUxrQjtBQU1sQixJQUFBLFlBQUEsWUFBaUIsU0FBakIscUJBTmtCO0FBT2xCLElBQUEsT0FBQSxZQUFZLFNBQVosY0FQa0I7QUFRbEIsSUFBQSxNQUFBLFlBQVcsU0FBWCxhQVJrQjtBQVNsQixJQUFBLGVBQUEsWUFBb0IsU0FBcEIsd0JBVGtCO0FBVWxCLElBQUEsTUFBQSxZQUFXLFNBQVgsYUFWa0I7QUFXbEIsSUFBQSxJQUFBLFlBQVMsU0FBVCxXQVhrQjtBQVlsQixJQUFBLEtBQUEsWUFBVSxTQUFWO0FBWmtCLEdBQW5COztBQWtCQSxNQUFBLE1BQUE7QUFBQTs7QUFRQyxvQkFBYSxhQUFiLEVBQTRCLE9BQTVCLEVBQXFDO0FBQUE7O0FBQ3BDLFdBQUssYUFBTCxHQUFxQixhQUFyQjtBQUVBLFdBQUssT0FBTCxHQUFlLE1BQUEsQ0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQjtBQUNoQyxRQUFBLFFBQUEsRUFBVSxJQURzQjtBQUVoQyxRQUFBLG1CQUFBLEVBQXFCLEtBRlc7QUFHaEMsUUFBQSxvQkFBQSxFQUFzQixJQUhVO0FBSWhDLFFBQUEsUUFBQSxFQUFVLFFBQUEsQ0FBUyxJQUphO0FBS2hDLFFBQUEsV0FBQSxFQUFhLFVBTG1CO0FBTWhDLFFBQUEsWUFBQSxFQUFjLElBTmtCO0FBT2hDLFFBQUEsV0FBQSxFQUFhLElBUG1CO0FB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WyJjb25zdCBjbGFzc05hbWUgPSAnby1iYW5uZXInO1xuY29uc3QgY2xhc3NOYW1lcyA9IHtcblx0Y2xvc2VkOiBgJHtjbGFzc05hbWV9LS1jbG9zZWRgLFxuXHRvdXRlcjogYCR7Y2xhc3NOYW1lfV9fb3V0ZXJgLFxuXHRpbm5lcjogYCR7Y2xhc3NOYW1lfV9faW5uZXJgLFxuXHRjb250ZW50OiBgJHtjbGFzc05hbWV9X19jb250ZW50YCxcblx0bG9uZ0NvbnRlbnQ6IGAke2NsYXNzTmFtZX1fX2NvbnRlbnQtLWxvbmdgLFxuXHRzaG9ydENvbnRlbnQ6IGAke2NsYXNzTmFtZX1fX2NvbnRlbnQtLXNob3J0YCxcblx0YWN0aW9uczogYCR7Y2xhc3NOYW1lfV9fYWN0aW9uc2AsXG5cdGFjdGlvbjogYCR7Y2xhc3NOYW1lfV9fYWN0aW9uYCxcblx0c2Vjb25kYXJ5QWN0aW9uOiBgJHtjbGFzc05hbWV9X19hY3Rpb24tLXNlY29uZGFyeWAsXG5cdGJ1dHRvbjogYCR7Y2xhc3NOYW1lfV9fYnV0dG9uYCxcblx0bGluazogYCR7Y2xhc3NOYW1lfV9fbGlua2AsXG5cdGNsb3NlOiBgJHtjbGFzc05hbWV9X19jbG9zZWAsXG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiYW5uZXIuXG4gKi9cbmNsYXNzIEJhbm5lciB7XG5cblx0LyoqXG5cdCAqIENsYXNzIGNvbnN0cnVjdG9yLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBbYmFubmVyRWxlbWVudF0gLSBUaGUgYmFubmVyIGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBiYW5uZXJcblx0ICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gYmFubmVyRWxlbWVudFxuXHQgKi9cblx0Y29uc3RydWN0b3IgKGJhbm5lckVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHR0aGlzLmJhbm5lckVsZW1lbnQgPSBiYW5uZXJFbGVtZW50O1xuXHRcdC8vIERlZmF1bHQgdGhlIG9wdGlvbnNcblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG5cdFx0XHRhdXRvT3BlbjogdHJ1ZSxcblx0XHRcdHN1cHByZXNzQ2xvc2VCdXR0b246IGZhbHNlLFxuXHRcdFx0Y2xvc2VFeGlzdGluZ0Jhbm5lcnM6IHRydWUsXG5cdFx0XHRhcHBlbmRUbzogZG9jdW1lbnQuYm9keSxcblx0XHRcdGNvbnRlbnRMb25nOiAnJmhlbGxpcDsnLFxuXHRcdFx0Y29udGVudFNob3J0OiBudWxsLFxuXHRcdFx0YnV0dG9uTGFiZWw6ICdPSycsXG5cdFx0XHRidXR0b25Vcmw6ICcjJyxcblx0XHRcdGZvcm1BY3Rpb246IG51bGwsXG5cdFx0XHRmb3JtRW5jb2Rpbmc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuXHRcdFx0Zm9ybU1ldGhvZDogJ3Bvc3QnLFxuXHRcdFx0bGlua0xhYmVsOiBudWxsLFxuXHRcdFx0bGlua1VybDogJyMnLFxuXHRcdFx0Y2xvc2VCdXR0b25MYWJlbDogJ0Nsb3NlJyxcblx0XHRcdHRoZW1lOiBudWxsLFxuXHRcdFx0bGF5b3V0OiBudWxsXG5cdFx0fSwgb3B0aW9ucyB8fCBCYW5uZXIuZ2V0T3B0aW9uc0Zyb21Eb20oYmFubmVyRWxlbWVudCkpO1xuXG5cdFx0Ly8gVmFsaWRhdGUgdGhlbWUgY2hvaWNlLlxuXHRcdGlmICh0aGlzLm9wdGlvbnMudGhlbWUgJiYgdHlwZW9mIHRoaXMub3B0aW9ucy50aGVtZSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgXCIke3RoaXMub3B0aW9ucy50aGVtZX1cIiBtdXN0IGJlIGEgc3RyaW5nLmApO1xuXHRcdH1cblxuXHRcdC8vIFZhbGlkYXRlIGxheW91dCBjaG9pY2UuXG5cdFx0Y29uc3QgdmFsaWRMYXlvdXRzID0gWydzbWFsbCcsICdjb21wYWN0J107XG5cdFx0Y29uc3QgbGF5b3V0ID0gdGhpcy5vcHRpb25zLmxheW91dDtcblx0XHRpZiAobGF5b3V0ICYmICF2YWxpZExheW91dHMuaW5jbHVkZXMobGF5b3V0KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBcIiR7bGF5b3V0fVwiIGlzIG5vdCBhIHZhbGlkIGxheW91dC4gVXNlIG9uZSBvZiAke3ZhbGlkTGF5b3V0c30uYCk7XG5cdFx0fVxuXG5cdFx0Ly8gRmluZCB0aGUgZWxlbWVudCB0byBhcHBlbmQgdGhlIGJhbm5lciB0byBpZiBjb25maWd1cmVkLlxuXHRcdHRyeSB7XG5cdFx0XHQvLyBGaW5kIGJ5IHF1ZXJ5IHNlbGVjdG9yLlxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuYXBwZW5kVG8gPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHRoaXMub3B0aW9ucy5hcHBlbmRUbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmFwcGVuZFRvKTtcblx0XHRcdH1cblx0XHRcdC8vIENvbmZpcm0gYSBodG1sIGVsZW1lbnQgaGFzIGJlZW4gZ2l2ZW4gb3IgZm91bmQuXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmFwcGVuZFRvIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgIT09IHRydWUpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJdCBpcyBub3QgYW4gTm9kZSBpbnN0YW5jZS4nKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDb3VuZCBub3QgZmluZCB0aGUgZWxlbWVudCB0byBhcHBlbmQgdGhlIGJhbm5lciB0bzogJHtlcnJvci5tZXNzYWdlfWAsIHRoaXMpO1xuXHRcdH1cblxuXHRcdC8vIFJlbmRlciB0aGUgYmFubmVyXG5cdFx0dGhpcy5yZW5kZXIoKTtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2xvc2VFeGlzdGluZ0Jhbm5lcnMpIHtcblx0XHRcdC8vIFRoZXJlIGNhbiBiZSBvbmx5IG9uZVxuXHRcdFx0QmFubmVyLl9iYW5uZXJJbnN0YW5jZXMuZm9yRWFjaChiYW5uZXIgPT4gYmFubmVyLmNsb3NlKCkpO1xuXHRcdFx0QmFubmVyLl9iYW5uZXJJbnN0YW5jZXMgPSBbdGhpc107XG5cdFx0fSBlbHNlIHtcblx0XHRcdEJhbm5lci5fYmFubmVySW5zdGFuY2VzLnB1c2godGhpcyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvT3Blbikge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVyIHRoZSBiYW5uZXIuXG5cdCAqL1xuXHRyZW5kZXIgKCkge1xuXHRcdGlmICghKHRoaXMuYmFubmVyRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0Ly8gSWYgdGhlIGJhbm5lciBlbGVtZW50IGlzIG5vdCBhbiBIVE1MIEVsZW1lbnQsIGJ1aWxkIG9uZVxuXHRcdFx0dGhpcy5iYW5uZXJFbGVtZW50ID0gdGhpcy5idWlsZEJhbm5lckVsZW1lbnQoKTtcblx0XHRcdHRoaXMub3B0aW9ucy5hcHBlbmRUby5hcHBlbmRDaGlsZCh0aGlzLmJhbm5lckVsZW1lbnQpO1xuXG5cdFx0fSBlbHNlIGlmICh0aGlzLmJhbm5lckVsZW1lbnQuaW5uZXJIVE1MLnRyaW0oKSA9PT0gJycpIHtcblx0XHRcdC8vIElmIHRoZSBiYW5uZXIgZWxlbWVudCBpcyBlbXB0eSwgd2UgY29uc3RydWN0IHRoZSBiYW5uZXJcblx0XHRcdHRoaXMuYmFubmVyRWxlbWVudCA9IHRoaXMuYnVpbGRCYW5uZXJFbGVtZW50KHRoaXMuYmFubmVyRWxlbWVudCk7XG5cblx0XHR9IGVsc2UgaWYgKCF0aGlzLmJhbm5lckVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lcy5vdXRlcn1gKSkge1xuXHRcdFx0Ly8gSWYgdGhlIGJhbm5lciBlbGVtZW50IGlzIG5vdCBlbXB0eSBhbmQgYWxzbyBkb2VzIG5vdCBjb250YWluIGFuIG91dGVyIGVsZW1lbnQsXG5cdFx0XHQvLyB3ZSBhc3N1bWUgdGhlIGVsZW1lbnQgY29udGVudCBpcyB0aGUgYmFubmVyIGNvbnRlbnRcblx0XHRcdHRoaXMub3B0aW9ucy5jb250ZW50TG9uZyA9IHRoaXMuYmFubmVyRWxlbWVudC5pbm5lckhUTUw7XG5cdFx0XHR0aGlzLm9wdGlvbnMuY29udGVudFNob3J0ID0gbnVsbDtcblx0XHRcdHRoaXMuYmFubmVyRWxlbWVudCA9IHRoaXMuYnVpbGRCYW5uZXJFbGVtZW50KHRoaXMuYmFubmVyRWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0Ly8gU2VsZWN0IGFsbCB0aGUgZWxlbWVudHMgd2UgbmVlZFxuXHRcdHRoaXMuaW5uZXJFbGVtZW50ID0gdGhpcy5iYW5uZXJFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW8tYmFubmVyLWlubmVyXScpO1xuXG5cdFx0Ly8gQnVpbGQgdGhlIGNsb3NlIGJ1dHRvblxuXHRcdGlmICghdGhpcy5vcHRpb25zLnN1cHByZXNzQ2xvc2VCdXR0b24pIHtcblx0XHRcdHRoaXMuY2xvc2VCdXR0b25FbGVtZW50ID0gdGhpcy5idWlsZENsb3NlQnV0dG9uRWxlbWVudCgpO1xuXHRcdFx0dGhpcy5pbm5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbkVsZW1lbnQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVuIHRoZSBiYW5uZXIuXG5cdCAqL1xuXHRvcGVuICgpIHtcblx0XHR0aGlzLmJhbm5lckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWVzLmNsb3NlZCk7XG5cdFx0dGhpcy5iYW5uZXJFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLmJhbm5lck9wZW5lZCcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9zZSB0aGUgYmFubmVyLlxuXHQgKi9cblx0Y2xvc2UgKCkge1xuXHRcdHRoaXMuYmFubmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXMuY2xvc2VkKTtcblx0XHR0aGlzLmJhbm5lckVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uYmFubmVyQ2xvc2VkJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgZnVsbCBiYW5uZXIgZWxlbWVudC4gVGhpcyBpcyB1c2VkIHdoZW4gbm8gYmFubmVyIG9yIGEgcGFydGlhbCBiYW5uZXIgZXhpc3RzIGluIHRoZSBET00uXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtiYW5uZXJFbGVtZW50XSAtIFRoZSBiYW5uZXIgZWxlbWVudCB0byBidWlsZCBhcm91bmRcblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIHRoZSBuZXcgYmFubmVyIGVsZW1lbnRcblx0ICovXG5cdGJ1aWxkQmFubmVyRWxlbWVudCAoYmFubmVyRWxlbWVudCkge1xuXHRcdGJhbm5lckVsZW1lbnQgPSBiYW5uZXJFbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGJhbm5lckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0YmFubmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy50aGVtZSkge1xuXHRcdFx0YmFubmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKGAke2NsYXNzTmFtZX0tLSR7dGhpcy5vcHRpb25zLnRoZW1lfWApO1xuXHRcdH1cblx0XHRpZiAodGhpcy5vcHRpb25zLmxheW91dCkge1xuXHRcdFx0YmFubmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKGAke2NsYXNzTmFtZX0tLSR7dGhpcy5vcHRpb25zLmxheW91dH1gKTtcblx0XHR9XG5cdFx0bGV0IGNvbnRlbnRIdG1sO1xuXHRcdGlmICh0aGlzLm9wdGlvbnMuY29udGVudFNob3J0KSB7XG5cdFx0XHRjb250ZW50SHRtbCA9IGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lcy5jb250ZW50fSAke2NsYXNzTmFtZXMubG9uZ0NvbnRlbnR9XCI+XG5cdFx0XHRcdFx0JHt0aGlzLm9wdGlvbnMuY29udGVudExvbmd9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWVzLmNvbnRlbnR9ICR7Y2xhc3NOYW1lcy5zaG9ydENvbnRlbnR9XCI+XG5cdFx0XHRcdFx0JHt0aGlzLm9wdGlvbnMuY29udGVudFNob3J0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnRIdG1sID0gYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiJHtjbGFzc05hbWVzLmNvbnRlbnR9XCI+XG5cdFx0XHRcdFx0JHt0aGlzLm9wdGlvbnMuY29udGVudExvbmd9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0YDtcblx0XHR9XG5cdFx0bGV0IHByaW1hcnlBY3Rpb25IdG1sID0gJyc7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5idXR0b25MYWJlbCkge1xuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy5mb3JtQWN0aW9uICE9PSBudWxsICYmIHRoaXMub3B0aW9ucy5mb3JtQWN0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cHJpbWFyeUFjdGlvbkh0bWwgPSBgXG5cdFx0XHRcdFx0PGZvcm0gY2xhc3M9XCIke2NsYXNzTmFtZXMuYWN0aW9ufVwiIGFjdGlvbj1cIiR7dGhpcy5vcHRpb25zLmZvcm1BY3Rpb259XCIgZW5jdHlwZT1cIiR7dGhpcy5vcHRpb25zLmZvcm1FbmNvZGluZ31cIiBtZXRob2Q9XCIke3RoaXMub3B0aW9ucy5mb3JtTWV0aG9kfVwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IGNsYXNzPVwiJHtjbGFzc05hbWVzLmJ1dHRvbn1cIiB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCIke3RoaXMub3B0aW9ucy5idXR0b25MYWJlbH1cIi8+XG5cdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHRgO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cHJpbWFyeUFjdGlvbkh0bWwgPSBgXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lcy5hY3Rpb259XCI+XG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiJHt0aGlzLm9wdGlvbnMuYnV0dG9uVXJsfVwiIGNsYXNzPVwiJHtjbGFzc05hbWVzLmJ1dHRvbn1cIj4ke3RoaXMub3B0aW9ucy5idXR0b25MYWJlbH08L2E+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdGA7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGxldCBzZWNvbmRhcnlBY3Rpb25IdG1sID0gJyc7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5saW5rTGFiZWwpIHtcblx0XHRcdHNlY29uZGFyeUFjdGlvbkh0bWwgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZXMuYWN0aW9ufSAke2NsYXNzTmFtZXMuc2Vjb25kYXJ5QWN0aW9ufVwiPlxuXHRcdFx0XHRcdDxhIGhyZWY9XCIke3RoaXMub3B0aW9ucy5saW5rVXJsfVwiIGNsYXNzPVwiJHtjbGFzc05hbWVzLmxpbmt9XCI+JHt0aGlzLm9wdGlvbnMubGlua0xhYmVsfTwvYT5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgO1xuXHRcdH1cblx0XHRiYW5uZXJFbGVtZW50LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZXMub3V0ZXJ9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCIke2NsYXNzTmFtZXMuaW5uZXJ9XCIgZGF0YS1vLWJhbm5lci1pbm5lcj1cIlwiPlxuXHRcdFx0XHRcdCR7Y29udGVudEh0bWx9XG5cdFx0XHRcdFx0JHsocHJpbWFyeUFjdGlvbkh0bWwgfHwgc2Vjb25kYXJ5QWN0aW9uSHRtbCkgJiZcblx0XHRcdFx0XHRgPGRpdiBjbGFzcz1cIiR7Y2xhc3NOYW1lcy5hY3Rpb25zfVwiPlxuXHRcdFx0XHRcdFx0JHtwcmltYXJ5QWN0aW9uSHRtbH1cblx0XHRcdFx0XHRcdCR7c2Vjb25kYXJ5QWN0aW9uSHRtbH1cblx0XHRcdFx0XHQ8L2Rpdj5gfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdFx0cmV0dXJuIGJhbm5lckVsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICogQnVpbGQgYSBjbG9zZSBidXR0b24gZWxlbWVudC5cblx0ICogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIHRoZSBuZXcgY2xvc2UgYnV0dG9uIGVsZW1lbnRcblx0ICovXG5cdGJ1aWxkQ2xvc2VCdXR0b25FbGVtZW50ICgpIHtcblx0XHRjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGNsb3NlQnV0dG9uLmNsYXNzTmFtZSA9IGNsYXNzTmFtZXMuY2xvc2U7XG5cdFx0Y2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGhpcy5vcHRpb25zLmNsb3NlQnV0dG9uTGFiZWwpO1xuXHRcdGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCB0aGlzLm9wdGlvbnMuY2xvc2VCdXR0b25MYWJlbCk7XG5cblx0XHQvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXG5cdFx0Y2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGNsb3NlQnV0dG9uO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIGJhbm5lckVsZW1lbnQuIElmIHRoZSBiYW5uZXIgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYmFubmVyRWxlbWVudCAtIFRoZSBiYW5uZXIgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqL1xuXHRzdGF0aWMgZ2V0T3B0aW9uc0Zyb21Eb20gKGJhbm5lckVsZW1lbnQpIHtcblx0XHRpZiAoIShiYW5uZXJFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3Qua2V5cyhiYW5uZXJFbGVtZW50LmRhdGFzZXQpLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XG5cblx0XHRcdC8vIElnbm9yZSBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1aWxkIGEgY29uY2lzZSBrZXkgYW5kIGdldCB0aGUgb3B0aW9uIHZhbHVlXG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKC9eb0Jhbm5lcihcXHcpKFxcdyspJC8sIChtLCBtMSwgbTIpID0+IG0xLnRvTG93ZXJDYXNlKCkgKyBtMik7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGJhbm5lckVsZW1lbnQuZGF0YXNldFtrZXldO1xuXG5cdFx0XHQvLyBUcnkgcGFyc2luZyB0aGUgdmFsdWUgYXMgSlNPTiwgb3RoZXJ3aXNlIGp1c3Qgc2V0IGl0IGFzIGEgc3RyaW5nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdH0sIHt9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlIGJhbm5lciBjb21wb25lbnRzLlxuXHQgKiBAcGFyYW0geyhIVE1MRWxlbWVudHxTdHJpbmcpfSByb290RWxlbWVudCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIGJhbm5lcnMgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGJhbm5lcnNcblx0ICovXG5cdHN0YXRpYyBpbml0IChyb290RWxlbWVudCwgb3B0aW9ucykge1xuXHRcdGlmICghcm9vdEVsZW1lbnQpIHtcblx0XHRcdHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgcm9vdEVsZW1lbnQgaXNudCBhbiBIVE1MRWxlbWVudCwgdHJlYXQgaXQgYXMgYSBzZWxlY3RvclxuXHRcdGlmICghKHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsZW1lbnQpO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSByb290RWxlbWVudCBpcyBhbiBIVE1MRWxlbWVudCAoaWUgaXQgd2FzIGZvdW5kIGluIHRoZSBkb2N1bWVudCBhbnl3aGVyZSlcblx0XHQvLyBBTkQgdGhlIHJvb3RFbGVtZW50IGhhcyB0aGUgZGF0YS1vLWNvbXBvbmVudD1vLWJhbm5lciB0aGVuIGluaXRpYWxpc2UganVzdCAxIGJhbm5lciAodGhpcyBvbmUpXG5cdFx0aWYgKHJvb3RFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgL1xcYm8tYmFubmVyXFxiLy50ZXN0KHJvb3RFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1vLWNvbXBvbmVudCcpKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBCYW5uZXIocm9vdEVsZW1lbnQsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSByb290RWxlbWVudCB3YXNuJ3QgaXRzZWxmIGEgYmFubmVyLCB0aGVuIGZpbmQgQUxMIG9mIHRoZSBjaGlsZCB0aGluZ3MgdGhhdCBoYXZlIHRoZSBkYXRhLW8tY29tcG9uZW50PW9CYW5uZXIgc2V0XG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLWJhbm5lclwiXScpLCByb290RWxlbWVudCA9PiBuZXcgQmFubmVyKHJvb3RFbGVtZW50LCBvcHRpb25zKSk7XG5cdH1cblxufVxuXG5CYW5uZXIuX2Jhbm5lckluc3RhbmNlcyA9IFtdO1xuXG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBCYW5uZXI7XG4iLCJcbmltcG9ydCBCYW5uZXIgZnJvbSAnLi9zcmMvanMvYmFubmVyLmpzJztcblxuZnVuY3Rpb24gY29uc3RydWN0QWxsICgpIHtcblx0QmFubmVyLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgQmFubmVyO1xuIiwiXG5pbXBvcnQgQmFubmVyIGZyb20gJy4uLy4uL21haW4uanMnO1xuXG5jb25zdCBkZW1vQmFubmVyQ29uZmlndXJhdGlvbnMgPSBbXG5cdHtcblx0XHRlbGVtZW50SWQ6ICdiYW5uZXItc3RhbmRhcmQnLFxuXHRcdGNvbmZpZzoge1xuXHRcdFx0Y29udGVudExvbmc6IGBcblx0XHRcdFx0PHA+VHJ5IHRoZSBuZXcgY29tcGFjdCBob21lcGFnZS4gQSBsaXN0IHZpZXcgb2YgdG9kYXkncyBob21lcGFnZSB3aXRoIGZld2VyIGltYWdlcy48L3A+XG5cdFx0XHRgLFxuXHRcdFx0Y29udGVudFNob3J0OiBgXG5cdFx0XHRcdDxwPlRyeSB0aGUgbmV3IGNvbXBhY3QgaG9tZXBhZ2UuPC9wPlxuXHRcdFx0YCxcblx0XHRcdGJ1dHRvbkxhYmVsOiAnVHJ5IGl0IG5vdycsXG5cdFx0XHRsaW5rTGFiZWw6ICdHaXZlIGZlZWRiYWNrJ1xuXHRcdH1cblx0fSxcblx0e1xuXHRcdGVsZW1lbnRJZDogJ2Jhbm5lci1zbWFsbCcsXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRjb250ZW50TG9uZzogYFxuXHRcdFx0XHQ8cD5UcnkgdGhlIG5ldyBjb21wYWN0IGhvbWVwYWdlLiBBIGxpc3QgdmlldyBvZiB0b2RheSdzIGhvbWVwYWdlIHdpdGggZmV3ZXIgaW1hZ2VzLjwvcD5cblx0XHRcdGAsXG5cdFx0XHRjb250ZW50U2hvcnQ6IGBcblx0XHRcdFx0PHA+VHJ5IHRoZSBuZXcgY29tcGFjdCBob21lcGFnZS48L3A+XG5cdFx0XHRgLFxuXHRcdFx0YnV0dG9uTGFiZWw6ICdUcnkgaXQgbm93Jyxcblx0XHRcdGxpbmtMYWJlbDogJ0dpdmUgZmVlZGJhY2snLFxuXHRcdFx0bGF5b3V0OiAnc21hbGwnXG5cdFx0fVxuXHR9LFxuXHR7XG5cdFx0ZWxlbWVudElkOiAnYmFubmVyLWNvbXBhY3QnLFxuXHRcdGNvbmZpZzoge1xuXHRcdFx0Y29udGVudExvbmc6IGBcblx0XHRcdFx0PHA+VHJ5IHRoZSBuZXcgY29tcGFjdCBob21lcGFnZS4gQSBsaXN0IHZpZXcgb2YgdG9kYXkncyBob21lcGFnZSB3aXRoIGZld2VyIGltYWdlcy48L3A+XG5cdFx0XHRgLFxuXHRcdFx0Y29udGVudFNob3J0OiBgXG5cdFx0XHRcdDxwPlRyeSB0aGUgbmV3IGNvbXBhY3QgaG9tZXBhZ2UuPC9wPlxuXHRcdFx0YCxcblx0XHRcdGJ1dHRvbkxhYmVsOiAnVHJ5IGl0IG5vdycsXG5cdFx0XHRsaW5rTGFiZWw6ICdHaXZlIGZlZWRiYWNrJyxcblx0XHRcdGxheW91dDogJ2NvbXBhY3QnXG5cdFx0fVxuXHR9LFxuXHR7XG5cdFx0ZWxlbWVudElkOiAnYmFubmVyLW1hcmtldGluZycsXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRjb250ZW50TG9uZzogYFxuXHRcdFx0XHQ8aGVhZGVyIGNsYXNzPVwiby1iYW5uZXJfX2hlYWRpbmdcIj5cblx0XHRcdFx0XHQ8cD5MaW1pdGVkIHRpbWUgb25seTwvcD5cblx0XHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHA+UGF5IGp1c3QgJDQuMjkgcGVyIHdlZWsgZm9yIGFubnVhbCBTdGFuZGFyZCBEaWdpdGFsIGFjY2Vzcy48L3A+XG5cdFx0XHRcdDx1bD5cblx0XHRcdFx0XHQ8bGk+R2xvYmFsIG5ld3MgYW5kIG9waW5pb24gZnJvbSBleHBlcnRzIGluIDUwKyBjb3VudHJpZXM8L2xpPlxuXHRcdFx0XHRcdDxsaT5BY2Nlc3Mgb24gZGVza3RvcCBhbmQgbW9iaWxlPC9saT5cblx0XHRcdFx0XHQ8bGk+TWFya2V0LW1vdmluZyBuZXdzLCBwb2xpdGljcywgdGVjaCwgdGhlIGFydHMgYW5kIG1vcmU8L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0YCxcblx0XHRcdGNvbnRlbnRTaG9ydDogYFxuXHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8cD5QYXkganVzdCAkNC4yOSBwZXIgd2VlayBmb3IgYW5udWFsIFN0YW5kYXJkIERpZ2l0YWwgYWNjZXNzLjwvcD5cblx0XHRcdGAsXG5cdFx0XHRidXR0b25MYWJlbDogJ1NhdmUgMzMlIG5vdycsXG5cdFx0XHRsaW5rTGFiZWw6ICdUZXJtcyBhbmQgY29uZGl0aW9ucycsXG5cdFx0XHR0aGVtZTogJ21hcmtldGluZydcblx0XHR9XG5cdH0sXG5cdHtcblx0XHRlbGVtZW50SWQ6ICdiYW5uZXItbWFya2V0aW5nLXNtYWxsJyxcblx0XHRjb25maWc6IHtcblx0XHRcdGNvbnRlbnRMb25nOiBgXG5cdFx0XHRcdDxoZWFkZXIgY2xhc3M9XCJvLWJhbm5lcl9faGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxwPkxpbWl0ZWQgdGltZSBvbmx5PC9wPlxuXHRcdFx0XHRcdDxoMT5Zb3UgcXVhbGlmeSBmb3IgYSBzcGVjaWFsIG9mZmVyOiBTYXZlIDMzJTwvaDE+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8cD5QYXkganVzdCAkNC4yOSBwZXIgd2VlayBmb3IgYW5udWFsIFN0YW5kYXJkIERpZ2l0YWwgYWNjZXNzLjwvcD5cblx0XHRcdFx0PHVsPlxuXHRcdFx0XHRcdDxsaT5HbG9iYWwgbmV3cyBhbmQgb3BpbmlvbiBmcm9tIGV4cGVydHMgaW4gNTArIGNvdW50cmllczwvbGk+XG5cdFx0XHRcdFx0PGxpPkFjY2VzcyBvbiBkZXNrdG9wIGFuZCBtb2JpbGU8L2xpPlxuXHRcdFx0XHRcdDxsaT5NYXJrZXQtbW92aW5nIG5ld3MsIHBvbGl0aWNzLCB0ZWNoLCB0aGUgYXJ0cyBhbmQgbW9yZTwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHRgLFxuXHRcdFx0Y29udGVudFNob3J0OiBgXG5cdFx0XHRcdDxoMT5Zb3UgcXVhbGlmeSBmb3IgYSBzcGVjaWFsIG9mZmVyOiBTYXZlIDMzJTwvaDE+XG5cdFx0XHRcdDxwPlBheSBqdXN0ICQ0LjI5IHBlciB3ZWVrIGZvciBhbm51YWwgU3RhbmRhcmQgRGlnaXRhbCBhY2Nlc3MuPC9wPlxuXHRcdFx0YCxcblx0XHRcdGJ1dHRvbkxhYmVsOiAnU2F2ZSAzMyUgbm93Jyxcblx0XHRcdGxpbmtMYWJlbDogJ1Rlcm1zIGFuZCBjb25kaXRpb25zJyxcblx0XHRcdGxheW91dDogJ3NtYWxsJyxcblx0XHRcdHRoZW1lOiAnbWFya2V0aW5nJ1xuXHRcdH1cblx0fSxcblx0e1xuXHRcdGVsZW1lbnRJZDogJ2Jhbm5lci1tYXJrZXRpbmctY29tcGFjdCcsXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRjb250ZW50TG9uZzogYFxuXHRcdFx0XHQ8aGVhZGVyIGNsYXNzPVwiby1iYW5uZXJfX2hlYWRpbmdcIj5cblx0XHRcdFx0XHQ8cD5MaW1pdGVkIHRpbWUgb25seTwvcD5cblx0XHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHA+UGF5IGp1c3QgJDQuMjkgcGVyIHdlZWsgZm9yIGFubnVhbCBTdGFuZGFyZCBEaWdpdGFsIGFjY2Vzcy48L3A+XG5cdFx0XHRcdDx1bD5cblx0XHRcdFx0XHQ8bGk+R2xvYmFsIG5ld3MgYW5kIG9waW5pb24gZnJvbSBleHBlcnRzIGluIDUwKyBjb3VudHJpZXM8L2xpPlxuXHRcdFx0XHRcdDxsaT5BY2Nlc3Mgb24gZGVza3RvcCBhbmQgbW9iaWxlPC9saT5cblx0XHRcdFx0XHQ8bGk+TWFya2V0LW1vdmluZyBuZXdzLCBwb2xpdGljcywgdGVjaCwgdGhlIGFydHMgYW5kIG1vcmU8L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0YCxcblx0XHRcdGNvbnRlbnRTaG9ydDogYFxuXHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8cD5QYXkganVzdCAkNC4yOSBwZXIgd2VlayBmb3IgYW5udWFsIFN0YW5kYXJkIERpZ2l0YWwgYWNjZXNzLjwvcD5cblx0XHRcdGAsXG5cdFx0XHRidXR0b25MYWJlbDogJ1NhdmUgMzMlIG5vdycsXG5cdFx0XHRsaW5rTGFiZWw6ICdUZXJtcyBhbmQgY29uZGl0aW9ucycsXG5cdFx0XHRsYXlvdXQ6ICdjb21wYWN0Jyxcblx0XHRcdHRoZW1lOiAnbWFya2V0aW5nJ1xuXHRcdH1cblx0fSxcblx0e1xuXHRcdGVsZW1lbnRJZDogJ2Jhbm5lci1wcm9kdWN0Jyxcblx0XHRjb25maWc6IHtcblx0XHRcdGNvbnRlbnRMb25nOiBgXG5cdFx0XHRcdDxoZWFkZXIgY2xhc3M9XCJvLWJhbm5lcl9faGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxoMT5GVCBDb21wYWN0PC9oMT5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdDxwPlRyeSB0aGUgbmV3IGNvbXBhY3QgaG9tZXBhZ2UuIEEgbGlzdCB2aWV3IG9mIHRvZGF5J3MgaG9tZXBhZ2Ugd2l0aCBmZXdlciBpbWFnZXMuPC9wPlxuXHRcdFx0YCxcblx0XHRcdGNvbnRlbnRTaG9ydDogYFxuXHRcdFx0XHQ8aGVhZGVyIGNsYXNzPVwiby1iYW5uZXJfX2hlYWRpbmdcIj5cblx0XHRcdFx0XHQ8aDE+RlQgQ29tcGFjdDwvaDE+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8cD5UcnkgdGhlIG5ldyBjb21wYWN0IGhvbWVwYWdlLjwvcD5cblx0XHRcdGAsXG5cdFx0XHRidXR0b25MYWJlbDogJ1RyeSBpdCBub3cnLFxuXHRcdFx0bGlua0xhYmVsOiAnR2l2ZSBmZWVkYmFjaycsXG5cdFx0XHR0aGVtZTogJ3Byb2R1Y3QnXG5cdFx0fVxuXHR9LFxuXHR7XG5cdFx0ZWxlbWVudElkOiAnYmFubmVyLXByb2R1Y3Qtc21hbGwnLFxuXHRcdGNvbmZpZzoge1xuXHRcdFx0Y29udGVudExvbmc6IGBcblx0XHRcdFx0PGhlYWRlciBjbGFzcz1cIm8tYmFubmVyX19oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGgxPkZUIENvbXBhY3Q8L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHA+VHJ5IHRoZSBuZXcgY29tcGFjdCBob21lcGFnZS4gQSBsaXN0IHZpZXcgb2YgdG9kYXkncyBob21lcGFnZSB3aXRoIGZld2VyIGltYWdlcy48L3A+XG5cdFx0XHRgLFxuXHRcdFx0Y29udGVudFNob3J0OiBgXG5cdFx0XHRcdDxoZWFkZXIgY2xhc3M9XCJvLWJhbm5lcl9faGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxoMT5GVCBDb21wYWN0PC9oMT5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdDxwPlRyeSB0aGUgbmV3IGNvbXBhY3QgaG9tZXBhZ2UuPC9wPlxuXHRcdFx0YCxcblx0XHRcdGJ1dHRvbkxhYmVsOiAnVHJ5IGl0IG5vdycsXG5cdFx0XHRsaW5rTGFiZWw6ICdHaXZlIGZlZWRiYWNrJyxcblx0XHRcdGxheW91dDogJ3NtYWxsJyxcblx0XHRcdHRoZW1lOiAgJ3Byb2R1Y3QnXG5cdFx0fVxuXHR9LFxuXHR7XG5cdFx0ZWxlbWVudElkOiAnYmFubmVyLXByb2R1Y3QtY29tcGFjdCcsXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRjb250ZW50TG9uZzogYFxuXHRcdFx0XHQ8aGVhZGVyIGNsYXNzPVwiby1iYW5uZXJfX2hlYWRpbmdcIj5cblx0XHRcdFx0XHQ8aDE+RlQgQ29tcGFjdDwvaDE+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8cD5UcnkgdGhlIG5ldyBjb21wYWN0IGhvbWVwYWdlLiBBIGxpc3QgdmlldyBvZiB0b2RheSdzIGhvbWVwYWdlIHdpdGggZmV3ZXIgaW1hZ2VzLjwvcD5cblx0XHRcdGAsXG5cdFx0XHRjb250ZW50U2hvcnQ6IGBcblx0XHRcdFx0PGhlYWRlciBjbGFzcz1cIm8tYmFubmVyX19oZWFkaW5nXCI+XG5cdFx0XHRcdFx0PGgxPkZUIENvbXBhY3Q8L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHA+VHJ5IHRoZSBuZXcgY29tcGFjdCBob21lcGFnZS48L3A+XG5cdFx0XHRgLFxuXHRcdFx0YnV0dG9uTGFiZWw6ICdUcnkgaXQgbm93Jyxcblx0XHRcdGxpbmtMYWJlbDogJ0dpdmUgZmVlZGJhY2snLFxuXHRcdFx0bGF5b3V0OiAnY29tcGFjdCcsXG5cdFx0XHR0aGVtZTogJ3Byb2R1Y3QnXG5cdFx0fVxuXHR9LFxuXHR7XG5cdFx0ZWxlbWVudElkOiAnYmFubmVyLWN1c3RvbScsXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRjb250ZW50TG9uZzogYFxuXHRcdFx0XHQ8aGVhZGVyIGNsYXNzPVwiby1iYW5uZXJfX2hlYWRpbmdcIj5cblx0XHRcdFx0XHQ8cD5MaW1pdGVkIHRpbWUgb25seTwvcD5cblx0XHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHA+UGF5IGp1c3QgJDQuMjkgcGVyIHdlZWsgZm9yIGFubnVhbCBTdGFuZGFyZCBEaWdpdGFsIGFjY2Vzcy48L3A+XG5cdFx0XHRcdDx1bD5cblx0XHRcdFx0XHQ8bGk+R2xvYmFsIG5ld3MgYW5kIG9waW5pb24gZnJvbSBleHBlcnRzIGluIDUwKyBjb3VudHJpZXM8L2xpPlxuXHRcdFx0XHRcdDxsaT5BY2Nlc3Mgb24gZGVza3RvcCBhbmQgbW9iaWxlPC9saT5cblx0XHRcdFx0XHQ8bGk+TWFya2V0LW1vdmluZyBuZXdzLCBwb2xpdGljcywgdGVjaCwgdGhlIGFydHMgYW5kIG1vcmU8L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0YCxcblx0XHRcdGNvbnRlbnRTaG9ydDogYFxuXHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8cD5QYXkganVzdCAkNC4yOSBwZXIgd2VlayBmb3IgYW5udWFsIFN0YW5kYXJkIERpZ2l0YWwgYWNjZXNzLjwvcD5cblx0XHRcdGAsXG5cdFx0XHRidXR0b25MYWJlbDogJ1NhdmUgMzMlIG5vdycsXG5cdFx0XHRsaW5rTGFiZWw6ICdUZXJtcyBhbmQgY29uZGl0aW9ucycsXG5cdFx0XHR0aGVtZTogJ3Bpa2FjaHUnXG5cdFx0fVxuXHR9LFxuXHR7XG5cdFx0ZWxlbWVudElkOiAnYmFubmVyLWN1c3RvbS1zbWFsbCcsXG5cdFx0Y29uZmlnOiB7XG5cdFx0XHRjb250ZW50TG9uZzogYFxuXHRcdFx0XHQ8aGVhZGVyIGNsYXNzPVwiby1iYW5uZXJfX2hlYWRpbmdcIj5cblx0XHRcdFx0XHQ8cD5MaW1pdGVkIHRpbWUgb25seTwvcD5cblx0XHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHA+UGF5IGp1c3QgJDQuMjkgcGVyIHdlZWsgZm9yIGFubnVhbCBTdGFuZGFyZCBEaWdpdGFsIGFjY2Vzcy48L3A+XG5cdFx0XHRcdDx1bD5cblx0XHRcdFx0XHQ8bGk+R2xvYmFsIG5ld3MgYW5kIG9waW5pb24gZnJvbSBleHBlcnRzIGluIDUwKyBjb3VudHJpZXM8L2xpPlxuXHRcdFx0XHRcdDxsaT5BY2Nlc3Mgb24gZGVza3RvcCBhbmQgbW9iaWxlPC9saT5cblx0XHRcdFx0XHQ8bGk+TWFya2V0LW1vdmluZyBuZXdzLCBwb2xpdGljcywgdGVjaCwgdGhlIGFydHMgYW5kIG1vcmU8L2xpPlxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0YCxcblx0XHRcdGNvbnRlbnRTaG9ydDogYFxuXHRcdFx0XHQ8aDE+WW91IHF1YWxpZnkgZm9yIGEgc3BlY2lhbCBvZmZlcjogU2F2ZSAzMyU8L2gxPlxuXHRcdFx0XHQ8cD5QYXkganVzdCAkNC4yOSBwZXIgd2VlayBmb3IgYW5udWFsIFN0YW5kYXJkIERpZ2l0YWwgYWNjZXNzLjwvcD5cblx0XHRcdGAsXG5cdFx0XHRidXR0b25MYWJlbDogJ1NhdmUgMzMlIG5vdycsXG5cdFx0XHRsaW5rTGFiZWw6ICdUZXJtcyBhbmQgY29uZGl0aW9ucycsXG5cdFx0XHRsYXlvdXQ6ICdzbWFsbCcsXG5cdFx0XHR0aGVtZTogJ3Bpa2FjaHUnXG5cdFx0fVxuXHR9LFxuXHR7XG5cdFx0ZWxlbWVudElkOiAnYmFubmVyLWN1c3RvbS1jb21wYWN0Jyxcblx0XHRjb25maWc6IHtcblx0XHRcdGNvbnRlbnRMb25nOiBgXG5cdFx0XHRcdDxoZWFkZXIgY2xhc3M9XCJvLWJhbm5lcl9faGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxwPkxpbWl0ZWQgdGltZSBvbmx5PC9wPlxuXHRcdFx0XHRcdDxoMT5Zb3UgcXVhbGlmeSBmb3IgYSBzcGVjaWFsIG9mZmVyOiBTYXZlIDMzJTwvaDE+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8cD5QYXkganVzdCAkNC4yOSBwZXIgd2VlayBmb3IgYW5udWFsIFN0YW5kYXJkIERpZ2l0YWwgYWNjZXNzLjwvcD5cblx0XHRcdFx0PHVsPlxuXHRcdFx0XHRcdDxsaT5HbG9iYWwgbmV3cyBhbmQgb3BpbmlvbiBmcm9tIGV4cGVydHMgaW4gNTArIGNvdW50cmllczwvbGk+XG5cdFx0XHRcdFx0PGxpPkFjY2VzcyBvbiBkZXNrdG9wIGFuZCBtb2JpbGU8L2xpPlxuXHRcdFx0XHRcdDxsaT5NYXJrZXQtbW92aW5nIG5ld3MsIHBvbGl0aWNzLCB0ZWNoLCB0aGUgYXJ0cyBhbmQgbW9yZTwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHRgLFxuXHRcdFx0Y29udGVudFNob3J0OiBgXG5cdFx0XHRcdDxoMT5Zb3UgcXVhbGlmeSBmb3IgYSBzcGVjaWFsIG9mZmVyOiBTYXZlIDMzJTwvaDE+XG5cdFx0XHRcdDxwPlBheSBqdXN0ICQ0LjI5IHBlciB3ZWVrIGZvciBhbm51YWwgU3RhbmRhcmQgRGlnaXRhbCBhY2Nlc3MuPC9wPlxuXHRcdFx0YCxcblx0XHRcdGJ1dHRvbkxhYmVsOiAnU2F2ZSAzMyUgbm93Jyxcblx0XHRcdGxpbmtMYWJlbDogJ1Rlcm1zIGFuZCBjb25kaXRpb25zJyxcblx0XHRcdGxheW91dDogJ2NvbXBhY3QnLFxuXHRcdFx0dGhlbWU6ICdwaWthY2h1J1xuXHRcdH1cblx0fSxcblx0e1xuXHRcdGVsZW1lbnRJZDogJ2Jhbm5lci1mb3JtJyxcblx0XHRjb25maWc6IHtcblx0XHRcdGNvbnRlbnRMb25nOiBgXG5cdFx0XHRcdDxoZWFkZXIgY2xhc3M9XCJvLWJhbm5lcl9faGVhZGluZ1wiPlxuXHRcdFx0XHRcdDxwPkxpbWl0ZWQgdGltZSBvbmx5PC9wPlxuXHRcdFx0XHRcdDxoMT5Zb3UgcXVhbGlmeSBmb3IgYSBzcGVjaWFsIG9mZmVyOiBTYXZlIDMzJTwvaDE+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8cD5QYXkganVzdCAkNC4yOSBwZXIgd2VlayBmb3IgYW5udWFsIFN0YW5kYXJkIERpZ2l0YWwgYWNjZXNzLjwvcD5cblx0XHRcdFx0PHVsPlxuXHRcdFx0XHRcdDxsaT5HbG9iYWwgbmV3cyBhbmQgb3BpbmlvbiBmcm9tIGV4cGVydHMgaW4gNTArIGNvdW50cmllczwvbGk+XG5cdFx0XHRcdFx0PGxpPkFjY2VzcyBvbiBkZXNrdG9wIGFuZCBtb2JpbGU8L2xpPlxuXHRcdFx0XHRcdDxsaT5NYXJrZXQtbW92aW5nIG5ld3MsIHBvbGl0aWNzLCB0ZWNoLCB0aGUgYXJ0cyBhbmQgbW9yZTwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHRgLFxuXHRcdFx0Y29udGVudFNob3J0OiBgXG5cdFx0XHRcdDxoMT5Zb3UgcXVhbGlmeSBmb3IgYSBzcGVjaWFsIG9mZmVyOiBTYXZlIDMzJTwvaDE+XG5cdFx0XHRcdDxwPlBheSBqdXN0ICQ0LjI5IHBlciB3ZWVrIGZvciBhbm51YWwgU3RhbmRhcmQgRGlnaXRhbCBhY2Nlc3MuPC9wPlxuXHRcdFx0YCxcblx0XHRcdGJ1dHRvbkxhYmVsOiAnU2F2ZSAzMyUgbm93Jyxcblx0XHRcdGxpbmtMYWJlbDogJ1Rlcm1zIGFuZCBjb25kaXRpb25zJyxcblx0XHRcdGxheW91dDogJ3NtYWxsJyxcblx0XHRcdHRoZW1lOiAnbWFya2V0aW5nJyxcblx0XHRcdGZvcm1BY3Rpb246ICcjZm9ybS1zdWJtaXR0ZWQnLFxuXHRcdFx0Zm9ybU1ldGhvZDogJ2dldCdcblx0XHR9XG5cdH1cbl07XG5cbmZ1bmN0aW9uIGluaXREZW1vcygpIHtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcblx0XHRkZW1vQmFubmVyQ29uZmlndXJhdGlvbnMuZm9yRWFjaCgoe2VsZW1lbnRJZCwgY29uZmlnfSkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0bmV3IEJhbm5lcihudWxsLCBjb25maWcpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5pbml0RGVtb3MoKTtcbiJdfQ==