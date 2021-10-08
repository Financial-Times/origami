function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/cookie-message.js
  var CookieMessage = /*#__PURE__*/function () {
    "use strict";

    function CookieMessage(cookieMessageElement, options) {
      var _this = this;

      _classCallCheck(this, CookieMessage);

      if (cookieMessageElement === null || cookieMessageElement === void 0) {
        cookieMessageElement = document.createElement("div");
        document.body.append(cookieMessageElement);
      }

      this.cookieMessageElement = cookieMessageElement;
      options = options || CookieMessage.getOptionsFromDom(cookieMessageElement);
      this.options = Object.assign({}, options);
      this.options.theme = this.options.theme ? "alternative" : null;
      this.cookieInfo = CookieMessage.getCookieInfo();

      if (this.shouldShowCookieMessage()) {
        this.createCookieMessage();
        this.showCookieMessage();
      } else {
        this.removeCookieMessage();
      }

      window.addEventListener("pageshow", function (event) {
        if (event.persisted === true && _this.shouldShowCookieMessage() === false) {
          return _this.removeCookieMessage();
        }
      });
    }

    _createClass(CookieMessage, [{
      key: "createCookieMessage",
      value: function createCookieMessage() {
        var _this2 = this;

        var wrapContent = function wrapContent(content) {
          return "\n<div class=\"o-cookie-message__outer\">\n\t<div class=\"o-cookie-message__inner\">\n\t\t<div class=\"o-cookie-message__content\">\n\t\t\t\t".concat(content, "\n\t\t</div>\n\t\t<div class=\"o-cookie-message__actions\">\n\n\t\t\t<div class=\"o-cookie-message__action\">\n\t\t\t\t<a href=\"").concat(_this2.cookieInfo.acceptUrlFallback, "\" class=\"o-cookie-message__button\">\n\t\t\t\t\tAccept &amp; continue\n\t\t\t\t</a>\n\t\t\t</div>\n\n\t\t\t<div class=\"o-cookie-message__action o-cookie-message__action--secondary\">\n\t\t\t\t<a href=\"").concat(_this2.cookieInfo.manageCookiesUrl, "\" class=\"o-cookie-message__link\">Manage cookies</a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>");
        };

        var labelId = "o-cookie-message-label";
        var descriptionId = "o-cookie-message-description";
        var defaultContent = "\n<div class=\"o-cookie-message__heading\">\n\t<h2 id=\"".concat(labelId, "\">Cookies on the FT</h2>\n</div>\n<p id=\"").concat(descriptionId, "\">\n\tWe use <a href=\"http://help.ft.com/help/legal-privacy/cookies/\" class=\"o-cookie-message__link o-cookie-message__link--external\" target=\"_blank\" rel=\"noopener\">cookies</a> for a number of reasons, such as keeping FT Sites reliable and secure, personalising content and ads, providing social media features and to analyse how our Sites are used.\n</p>");
        var child = this.cookieMessageElement.firstElementChild;
        var html = this.cookieMessageElement.innerHTML;

        if (child && child.classList.contains("o-cookie-message__outer")) {} else if (html.trim() === "") {
          this.cookieMessageElement.innerHTML = wrapContent(defaultContent);
          this.cookieMessageElement.setAttribute("role", "dialog");
          this.cookieMessageElement.setAttribute("aria-labelledby", labelId);
          this.cookieMessageElement.setAttribute("aria-describedby", descriptionId);
        } else {
          this.cookieMessageElement.innerHTML = wrapContent(html);
        }
      }
    }, {
      key: "updateConsent",
      value: function updateConsent() {
        var _this3 = this;

        var button = document.querySelector(".o-cookie-message__button");

        if (button) {
          button.addEventListener("click", function (e) {
            e.preventDefault();

            _this3.dispatchEvent("oCookieMessage.act");

            _this3.removeCookieMessage();

            return fetch(_this3.cookieInfo.acceptUrl, {
              method: "get",
              credentials: "include"
            });
          });
        }
      }
    }, {
      key: "shouldShowCookieMessage",
      value: function shouldShowCookieMessage() {
        return !document.cookie.includes("".concat(this.cookieInfo.consentCookieName));
      }
    }, {
      key: "showCookieMessage",
      value: function showCookieMessage() {
        this.cookieMessageElement.classList.add("o-cookie-message", "o-cookie-message--active");

        if (this.options.theme) {
          this.cookieMessageElement.classList.add("o-cookie-message--".concat(this.options.theme));
        }

        this.dispatchEvent("oCookieMessage.view");
        this.updateConsent();
      }
    }, {
      key: "removeCookieMessage",
      value: function removeCookieMessage() {
        this.dispatchEvent("oCookieMessage.close");

        try {
          this.cookieMessageElement.parentNode.removeChild(this.cookieMessageElement);
        } catch (err) {}
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(eventName) {
        var e = new CustomEvent(eventName, {
          bubbles: true
        });
        this.cookieMessageElement.dispatchEvent(e);
      }
    }], [{
      key: "getCookieInfo",
      value: function getCookieInfo() {
        var domain = "ft.com";
        var manageCookiesPath = "manage-cookies";

        if (!/\.ft\.com$/i.test(window.location.hostname)) {
          domain = window.location.hostname.replace(/^(.*?)\./, "");
          manageCookiesPath = "cookies";
        }

        var redirect = window.location.href;
        return {
          acceptUrl: "https://consent.".concat(domain, "/__consent/consent-record-cookie?cookieDomain=.").concat(domain),
          acceptUrlFallback: "https://consent.".concat(domain, "/__consent/consent-record-cookie?redirect=").concat(redirect, "&cookieDomain=.").concat(domain),
          manageCookiesUrl: "https://cookies.".concat(domain, "/preferences/").concat(manageCookiesPath, "?redirect=").concat(redirect, "&cookieDomain=.").concat(domain),
          consentCookieName: "FTCookieConsentGDPR"
        };
      }
    }, {
      key: "getOptionsFromDom",
      value: function getOptionsFromDom(cookieMessageElement) {
        if (!(cookieMessageElement instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(cookieMessageElement.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oCookieMessage(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = cookieMessageElement.dataset[key];

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

        if (rootElement instanceof HTMLElement && /\bo-cookie-message\b/.test(rootElement.getAttribute("data-o-component"))) {
          return new CookieMessage(rootElement, options);
        }

        var cookieMessageElement = rootElement.querySelector('[data-o-component="o-cookie-message"]');
        return new CookieMessage(cookieMessageElement, options);
      }
    }]);

    return CookieMessage;
  }();

  var cookie_message_default = CookieMessage; // main.js

  function constructAll() {
    cookie_message_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  }

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.cookie = "FTCookieConsentGDPR=; Max-Age=-9999999999; Domain=.ft.com; Path=/;";

  function initDemos() {
    document.addEventListener("DOMContentLoaded", function () {
      document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
    });
  }

  initDemos();
  setTimeout(hideCookieMessage, 500);

  function hideCookieMessage() {
    var cookieMessage = document.querySelector(".o-cookie-message");
    var action = cookieMessage.querySelector(".o-cookie-message__action");
    action.addEventListener("click", function () {
      cookieMessage.innerHTML = "<div class=\"o-cookie-message__container\">\n\t\t\t\t<p class=\"o-cookie-message__description\">\n\t\t\t\t\t<strong>Hello!</strong> normally, clicking that button will hide the cookie message for 6 months. But that would mean you wouldn't be able to see this demo anymore, which might be quite annoying. You can refresh the page to get the proper cookie message back.\n\t\t\t\t</p>\n\t\t\t</div>";
    });
  }

  document.body.addEventListener("oCookieMessage.view", function () {
    console.log("THE \uD83C\uDF6A MESSAGE HAS BEEN VIEWED");
  });
  document.body.addEventListener("oCookieMessage.act", function () {
    console.log("THE \uD83C\uDF6A MESSAGE HAS BEEN ACTED UPON");
  });
  document.body.addEventListener("oCookieMessage.close", function () {
    console.log("THE \uD83C\uDF6A MESSAGE HAS BEEN CLOSED");
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9jb29raWUtbWVzc2FnZS5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQUEsYUFBQTtBQUFBOztBQWtCQywyQkFBWSxvQkFBWixFQUFrQyxPQUFsQyxFQUEyQztBQUFBOztBQUFBOztBQUMxQyxVQUFJLG9CQUFBLEtBQXlCLElBQXpCLElBQWlDLG9CQUFBLEtBQXlCLEtBQUEsQ0FBOUQsRUFBeUU7QUFDeEUsUUFBQSxvQkFBQSxHQUF1QixRQUFBLENBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF2QjtBQUNBLFFBQUEsUUFBQSxDQUFTLElBQVQsQ0FBYyxNQUFkLENBQXFCLG9CQUFyQjtBQUFxQjs7QUFHdEIsV0FBSyxvQkFBTCxHQUE0QixvQkFBNUI7QUFHQSxNQUFBLE9BQUEsR0FBVSxPQUFBLElBQVcsYUFBQSxDQUFjLGlCQUFkLENBQWdDLG9CQUFoQyxDQUFyQjtBQUdBLFdBQUssT0FBTCxHQUFlLE1BQUEsQ0FBTyxNQUFQLENBQ2QsRUFEYyxFQUVkLE9BRmMsQ0FBZjtBQUtBLFdBQUssT0FBTCxDQUFhLEtBQWIsR0FBcUIsS0FBSyxPQUFMLENBQWEsS0FBYixHQUFxQixhQUFyQixHQUFxQyxJQUExRDtBQUVBLFdBQUssVUFBTCxHQUFrQixhQUFBLENBQWMsYUFBZCxFQUFsQjs7QUFFQSxVQUFJLEtBQUssdUJBQUwsRUFBSixFQUFvQztBQUNuQyxhQUFLLG1CQUFMO0FBQ0EsYUFBSyxpQkFBTDtBQUFLLE9BRk4sTUFHTztBQUNOLGFBQUssbUJBQUw7QUFBSzs7QUFHTixNQUFBLE1BQUEsQ0FBTyxnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxVQUFDLEtBQUQsRUFBVztBQUM5QyxZQUFJLEtBQUEsQ0FBTSxTQUFOLEtBQW9CLElBQXBCLElBQTRCLEtBQUEsQ0FBSyx1QkFBTCxPQUFtQyxLQUFuRSxFQUEwRTtBQUN6RSxpQkFBTyxLQUFBLENBQUssbUJBQUwsRUFB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QS9CLEVBQXFELFlBQU07QUFDMUQsSUFBQSxPQUFBLENBQVEsR0FBUixDQUFZLDhDQUFaO0FBQVksR0FEYjtBQUlBLEVBQUEsUUFBQSxDQUFTLElBQVQsQ0FBYyxnQkFBZCxDQUErQixzQkFBL0IsRUFBdUQsWUFBTTtBQUM1RCxJQUFBLE9BQUEsQ0FBUSxHQUFSLENBQVksMENBQVo7QUFBWSxHQURiIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ29va2llTWVzc2FnZSB7XG5cdHN0YXRpYyBnZXRDb29raWVJbmZvKCkge1xuXHRcdGxldCBkb21haW4gPSAnZnQuY29tJztcblx0XHRsZXQgbWFuYWdlQ29va2llc1BhdGggPSAnbWFuYWdlLWNvb2tpZXMnO1xuXHRcdGlmICghL1xcLmZ0XFwuY29tJC9pLnRlc3Qod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKSkge1xuXHRcdFx0Ly8gcmVwbGFjZSB3d3cgb3Igc3ViZG9tYWluXG5cdFx0XHRkb21haW4gPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUucmVwbGFjZSgvXiguKj8pXFwuLywgJycpO1xuXHRcdFx0bWFuYWdlQ29va2llc1BhdGggPSAnY29va2llcyc7XG5cdFx0fVxuXHRcdGNvbnN0IHJlZGlyZWN0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFjY2VwdFVybDogYGh0dHBzOi8vY29uc2VudC4ke2RvbWFpbn0vX19jb25zZW50L2NvbnNlbnQtcmVjb3JkLWNvb2tpZT9jb29raWVEb21haW49LiR7ZG9tYWlufWAsXG5cdFx0XHRhY2NlcHRVcmxGYWxsYmFjazogYGh0dHBzOi8vY29uc2VudC4ke2RvbWFpbn0vX19jb25zZW50L2NvbnNlbnQtcmVjb3JkLWNvb2tpZT9yZWRpcmVjdD0ke3JlZGlyZWN0fSZjb29raWVEb21haW49LiR7ZG9tYWlufWAsXG5cdFx0XHRtYW5hZ2VDb29raWVzVXJsOiBgaHR0cHM6Ly9jb29raWVzLiR7ZG9tYWlufS9wcmVmZXJlbmNlcy8ke21hbmFnZUNvb2tpZXNQYXRofT9yZWRpcmVjdD0ke3JlZGlyZWN0fSZjb29raWVEb21haW49LiR7ZG9tYWlufWAsXG5cdFx0XHRjb25zZW50Q29va2llTmFtZTogJ0ZUQ29va2llQ29uc2VudEdEUFInXG5cdFx0fTtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKGNvb2tpZU1lc3NhZ2VFbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0aWYgKGNvb2tpZU1lc3NhZ2VFbGVtZW50ID09PSBudWxsIHx8IGNvb2tpZU1lc3NhZ2VFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGNvb2tpZU1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kKGNvb2tpZU1lc3NhZ2VFbGVtZW50KTtcblx0XHR9XG5cblx0XHR0aGlzLmNvb2tpZU1lc3NhZ2VFbGVtZW50ID0gY29va2llTWVzc2FnZUVsZW1lbnQ7XG5cblx0XHQvLyBHZXQgY29va2llIG1lc3NhZ2Ugb3B0aW9uc1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IENvb2tpZU1lc3NhZ2UuZ2V0T3B0aW9uc0Zyb21Eb20oY29va2llTWVzc2FnZUVsZW1lbnQpO1xuXG5cdFx0Ly8gU2V0IGNvb2tpZSBtZXNzYWdlIG9wdGlvbnNcblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0e30sXG5cdFx0XHRvcHRpb25zXG5cdFx0KTtcblxuXHRcdHRoaXMub3B0aW9ucy50aGVtZSA9IHRoaXMub3B0aW9ucy50aGVtZSA/ICdhbHRlcm5hdGl2ZScgOiBudWxsO1xuXG5cdFx0dGhpcy5jb29raWVJbmZvID0gQ29va2llTWVzc2FnZS5nZXRDb29raWVJbmZvKCk7XG5cblx0XHRpZiAodGhpcy5zaG91bGRTaG93Q29va2llTWVzc2FnZSgpKSB7XG5cdFx0XHR0aGlzLmNyZWF0ZUNvb2tpZU1lc3NhZ2UoKTtcblx0XHRcdHRoaXMuc2hvd0Nvb2tpZU1lc3NhZ2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5yZW1vdmVDb29raWVNZXNzYWdlKCk7XG5cdFx0fVxuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCAoZXZlbnQpID0+IHtcblx0XHRcdGlmIChldmVudC5wZXJzaXN0ZWQgPT09IHRydWUgJiYgdGhpcy5zaG91bGRTaG93Q29va2llTWVzc2FnZSgpID09PSBmYWxzZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW1vdmVDb29raWVNZXNzYWdlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRjcmVhdGVDb29raWVNZXNzYWdlKCkge1xuXHRcdGNvbnN0IHdyYXBDb250ZW50ID0gY29udGVudCA9PiBgXG48ZGl2IGNsYXNzPVwiby1jb29raWUtbWVzc2FnZV9fb3V0ZXJcIj5cblx0PGRpdiBjbGFzcz1cIm8tY29va2llLW1lc3NhZ2VfX2lubmVyXCI+XG5cdFx0PGRpdiBjbGFzcz1cIm8tY29va2llLW1lc3NhZ2VfX2NvbnRlbnRcIj5cblx0XHRcdFx0JHtjb250ZW50fVxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJvLWNvb2tpZS1tZXNzYWdlX19hY3Rpb25zXCI+XG5cblx0XHRcdDxkaXYgY2xhc3M9XCJvLWNvb2tpZS1tZXNzYWdlX19hY3Rpb25cIj5cblx0XHRcdFx0PGEgaHJlZj1cIiR7dGhpcy5jb29raWVJbmZvLmFjY2VwdFVybEZhbGxiYWNrfVwiIGNsYXNzPVwiby1jb29raWUtbWVzc2FnZV9fYnV0dG9uXCI+XG5cdFx0XHRcdFx0QWNjZXB0ICZhbXA7IGNvbnRpbnVlXG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiby1jb29raWUtbWVzc2FnZV9fYWN0aW9uIG8tY29va2llLW1lc3NhZ2VfX2FjdGlvbi0tc2Vjb25kYXJ5XCI+XG5cdFx0XHRcdDxhIGhyZWY9XCIke3RoaXMuY29va2llSW5mby5tYW5hZ2VDb29raWVzVXJsfVwiIGNsYXNzPVwiby1jb29raWUtbWVzc2FnZV9fbGlua1wiPk1hbmFnZSBjb29raWVzPC9hPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuPC9kaXY+YDtcblxuXHRcdGNvbnN0IGxhYmVsSWQgPSAnby1jb29raWUtbWVzc2FnZS1sYWJlbCc7XG5cdFx0Y29uc3QgZGVzY3JpcHRpb25JZCA9ICdvLWNvb2tpZS1tZXNzYWdlLWRlc2NyaXB0aW9uJztcblx0XHRjb25zdCBkZWZhdWx0Q29udGVudCA9IGBcbjxkaXYgY2xhc3M9XCJvLWNvb2tpZS1tZXNzYWdlX19oZWFkaW5nXCI+XG5cdDxoMiBpZD1cIiR7bGFiZWxJZH1cIj5Db29raWVzIG9uIHRoZSBGVDwvaDI+XG48L2Rpdj5cbjxwIGlkPVwiJHtkZXNjcmlwdGlvbklkfVwiPlxuXHRXZSB1c2UgPGEgaHJlZj1cImh0dHA6Ly9oZWxwLmZ0LmNvbS9oZWxwL2xlZ2FsLXByaXZhY3kvY29va2llcy9cIiBjbGFzcz1cIm8tY29va2llLW1lc3NhZ2VfX2xpbmsgby1jb29raWUtbWVzc2FnZV9fbGluay0tZXh0ZXJuYWxcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiPmNvb2tpZXM8L2E+IGZvciBhIG51bWJlciBvZiByZWFzb25zLCBzdWNoIGFzIGtlZXBpbmcgRlQgU2l0ZXMgcmVsaWFibGUgYW5kIHNlY3VyZSwgcGVyc29uYWxpc2luZyBjb250ZW50IGFuZCBhZHMsIHByb3ZpZGluZyBzb2NpYWwgbWVkaWEgZmVhdHVyZXMgYW5kIHRvIGFuYWx5c2UgaG93IG91ciBTaXRlcyBhcmUgdXNlZC5cbjwvcD5gO1xuXG5cdFx0Y29uc3QgY2hpbGQgPSB0aGlzLmNvb2tpZU1lc3NhZ2VFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuXHRcdGNvbnN0IGh0bWwgPSB0aGlzLmNvb2tpZU1lc3NhZ2VFbGVtZW50LmlubmVySFRNTDtcblx0XHRpZiAoY2hpbGQgJiYgY2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiby1jb29raWUtbWVzc2FnZV9fb3V0ZXJcIikpIHtcblx0XHRcdC8vIGZ1bGwgY3VzdG9tIGh0bWwsIGxlYXZlIGl0IGFsb25lXG5cdFx0fSBlbHNlIGlmIChodG1sLnRyaW0oKSA9PT0gXCJcIikge1xuXHRcdFx0Ly8gZW1wdHksIHByb3ZpZGUgZGVmYXVsdCBjb250ZW50XG5cdFx0XHR0aGlzLmNvb2tpZU1lc3NhZ2VFbGVtZW50LmlubmVySFRNTCA9IHdyYXBDb250ZW50KGRlZmF1bHRDb250ZW50KTtcblx0XHRcdC8vIHdpdGggZGVmYXVsdCBjb250ZW50IGlkcyB3ZSBjYW4gc2V0dXAgYSBsYWJlbGVkIGRpYWxvZyByb2xlXG5cdFx0XHR0aGlzLmNvb2tpZU1lc3NhZ2VFbGVtZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcblx0XHRcdHRoaXMuY29va2llTWVzc2FnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsbGVkYnknLCBsYWJlbElkKTtcblx0XHRcdHRoaXMuY29va2llTWVzc2FnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JywgZGVzY3JpcHRpb25JZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHNvbWUgY3VzdG9tIGh0bWwsIHdyYXAgaXQgdXBcblx0XHRcdHRoaXMuY29va2llTWVzc2FnZUVsZW1lbnQuaW5uZXJIVE1MID0gd3JhcENvbnRlbnQoaHRtbCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgY29va2llIHNldHRpbmcgYmVoYXZpb3VyIGZyb20gdGhlIEZUIGNvbnNlbnQgc2VydmljZVxuXHQgKiBodHRwczovL2dpdGh1Yi5jb20vRmluYW5jaWFsLVRpbWVzL25leHQtY29uc2VudC1wcm94eS90cmVlL21hc3Rlci9zcmNcblx0ICovXG5cdHVwZGF0ZUNvbnNlbnQoKSB7XG5cdFx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdGAuby1jb29raWUtbWVzc2FnZV9fYnV0dG9uYFxuXHRcdCk7XG5cdFx0aWYgKGJ1dHRvbikge1xuXHRcdFx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCdvQ29va2llTWVzc2FnZS5hY3QnKTtcblx0XHRcdFx0dGhpcy5yZW1vdmVDb29raWVNZXNzYWdlKCk7XG5cdFx0XHRcdHJldHVybiBmZXRjaCh0aGlzLmNvb2tpZUluZm8uYWNjZXB0VXJsLCB7XG5cdFx0XHRcdFx0bWV0aG9kOiAnZ2V0Jyxcblx0XHRcdFx0XHRjcmVkZW50aWFsczogJ2luY2x1ZGUnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyB3aGV0aGVyIGNvb2tpZSBpcyBzZXRcblx0ICovXG5cdHNob3VsZFNob3dDb29raWVNZXNzYWdlKCkge1xuXHRcdHJldHVybiAhZG9jdW1lbnQuY29va2llLmluY2x1ZGVzKGAke3RoaXMuY29va2llSW5mby5jb25zZW50Q29va2llTmFtZX1gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyBjb29raWUgbWVzc2FnZSBiYW5uZXIsIGJhc2VkIG9uIGV4aXN0aW5nIGNvb2tpZXMuXG5cdCAqL1xuXHRzaG93Q29va2llTWVzc2FnZSgpIHtcblx0XHR0aGlzLmNvb2tpZU1lc3NhZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoXG5cdFx0XHQnby1jb29raWUtbWVzc2FnZScsXG5cdFx0XHQnby1jb29raWUtbWVzc2FnZS0tYWN0aXZlJ1xuXHRcdCk7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLnRoZW1lKSB7XG5cdFx0XHR0aGlzLmNvb2tpZU1lc3NhZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoXG5cdFx0XHRcdGBvLWNvb2tpZS1tZXNzYWdlLS0ke3RoaXMub3B0aW9ucy50aGVtZX1gXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgnb0Nvb2tpZU1lc3NhZ2UudmlldycpO1xuXHRcdHRoaXMudXBkYXRlQ29uc2VudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgY29va2llIG1lc3NhZ2UgYmFubmVyLlxuXHQgKi9cblx0cmVtb3ZlQ29va2llTWVzc2FnZSgpIHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoJ29Db29raWVNZXNzYWdlLmNsb3NlJyk7XG5cblx0XHR0cnkge1xuXHRcdFx0dGhpcy5jb29raWVNZXNzYWdlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY29va2llTWVzc2FnZUVsZW1lbnQpO1xuXHRcdH1cblx0XHRjYXRjaCAoZXJyKSB7XG5cdFx0XHQvLyBjb29raWVNZXNzYWdlRWxlbWVudCBvciBpdHMgcGFyZW50Tm9kZSBoYXMgYWxyZWFkeSBiZWVuIHJlbW92ZWRcblx0XHR9XG5cdH1cblxuXHRkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZSkge1xuXHRcdGNvbnN0IGUgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG5cdFx0dGhpcy5jb29raWVNZXNzYWdlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIGNvb2tpZU1lc3NhZ2VFbGVtZW50LiBJZiB0aGUgY29va2llIG1lc3NhZ2UgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29va2llTWVzc2FnZUVsZW1lbnQgLSBUaGUgY29va2llIG1lc3NhZ2UgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqL1xuXHRzdGF0aWMgZ2V0T3B0aW9uc0Zyb21Eb20oY29va2llTWVzc2FnZUVsZW1lbnQpIHtcblx0XHRpZiAoIShjb29raWVNZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoY29va2llTWVzc2FnZUVsZW1lbnQuZGF0YXNldCkucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcblx0XHRcdC8vIElnbm9yZSBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1aWxkIGEgY29uY2lzZSBrZXkgYW5kIGdldCB0aGUgb3B0aW9uIHZhbHVlXG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKFxuXHRcdFx0XHQvXm9Db29raWVNZXNzYWdlKFxcdykoXFx3KykkLyxcblx0XHRcdFx0KG0sIG0xLCBtMikgPT4gbTEudG9Mb3dlckNhc2UoKSArIG0yXG5cdFx0XHQpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBjb29raWVNZXNzYWdlRWxlbWVudC5kYXRhc2V0W2tleV07XG5cblx0XHRcdC8vIFRyeSBwYXJzaW5nIHRoZSB2YWx1ZSBhcyBKU09OLCBvdGhlcndpc2UganVzdCBzZXQgaXQgYXMgYSBzdHJpbmdcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gSlNPTi5wYXJzZSh2YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgY29va2llIG1lc3NhZ2UgY29tcG9uZW50cy5cblx0ICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8U3RyaW5nKX0gcm9vdEVsZW1lbnQgLSBUaGUgcm9vdCBlbGVtZW50IHRvIGludGlhbGlzZSBjb29raWUgbWVzc2FnZXMgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvb2tpZSBtZXNzYWdlc1xuXHQgKi9cblx0c3RhdGljIGluaXQocm9vdEVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHRpZiAoIXJvb3RFbGVtZW50KSB7XG5cdFx0XHRyb290RWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHJvb3RFbGVtZW50IGlzbnQgYW4gSFRNTEVsZW1lbnQsIHRyZWF0IGl0IGFzIGEgc2VsZWN0b3Jcblx0XHRpZiAoIShyb290RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbGVtZW50KTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgcm9vdEVsZW1lbnQgaXMgYW4gSFRNTEVsZW1lbnQgKGllIGl0IHdhcyBmb3VuZCBpbiB0aGUgZG9jdW1lbnQgYW55d2hlcmUpXG5cdFx0Ly8gQU5EIHRoZSByb290RWxlbWVudCBoYXMgdGhlIGRhdGEtby1jb21wb25lbnQ9by1jb29raWUtbWVzc2FnZSB0aGVuIGluaXRpYWxpc2UganVzdCAxIGNvb2tpZSBtZXNzYWdlICh0aGlzIG9uZSlcblx0XHRpZiAoXG5cdFx0XHRyb290RWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmXG5cdFx0XHQvXFxiby1jb29raWUtbWVzc2FnZVxcYi8udGVzdChyb290RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1jb21wb25lbnQnKSlcblx0XHQpIHtcblx0XHRcdHJldHVybiBuZXcgQ29va2llTWVzc2FnZShyb290RWxlbWVudCwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHJvb3RFbGVtZW50IHdhc24ndCBpdHNlbGYgYSBjb29raWUgbWVzc2FnZSwgdGhlbiBmaW5kIHRoZSBmaXJzdCBjaGlsZCB0aGF0IGhhcyB0aGUgZGF0YS1vLWNvbXBvbmVudD1vLWNvb2tpZS1tZXNzYWdlIHNldFxuXHRcdGNvbnN0IGNvb2tpZU1lc3NhZ2VFbGVtZW50ID0gcm9vdEVsZW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tY29va2llLW1lc3NhZ2VcIl0nXG5cdFx0KTtcblxuXHRcdHJldHVybiBuZXcgQ29va2llTWVzc2FnZShjb29raWVNZXNzYWdlRWxlbWVudCwgb3B0aW9ucyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29va2llTWVzc2FnZTtcbiIsImltcG9ydCBDb29raWVNZXNzYWdlIGZyb20gJy4vc3JjL2pzL2Nvb2tpZS1tZXNzYWdlLmpzJztcblxuZnVuY3Rpb24gY29uc3RydWN0QWxsICgpIHtcblx0Q29va2llTWVzc2FnZS5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvb2tpZU1lc3NhZ2U7XG4iLCJpbXBvcnQgJy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5jb29raWUgPSAnRlRDb29raWVDb25zZW50R0RQUj07IE1heC1BZ2U9LTk5OTk5OTk5OTk7IERvbWFpbj0uZnQuY29tOyBQYXRoPS87JztcblxuZnVuY3Rpb24gaW5pdERlbW9zKCkge1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuXHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG5cdH0pO1xufVxuXG5pbml0RGVtb3MoKTtcblxuc2V0VGltZW91dChoaWRlQ29va2llTWVzc2FnZSwgNTAwKTtcblxuZnVuY3Rpb24gaGlkZUNvb2tpZU1lc3NhZ2UoKSB7XG5cdGNvbnN0IGNvb2tpZU1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuby1jb29raWUtbWVzc2FnZScpO1xuXHRjb25zdCBhY3Rpb24gPSBjb29raWVNZXNzYWdlLnF1ZXJ5U2VsZWN0b3IoJy5vLWNvb2tpZS1tZXNzYWdlX19hY3Rpb24nKTtcblx0YWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdGNvb2tpZU1lc3NhZ2UuaW5uZXJIVE1MID1gPGRpdiBjbGFzcz1cIm8tY29va2llLW1lc3NhZ2VfX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8cCBjbGFzcz1cIm8tY29va2llLW1lc3NhZ2VfX2Rlc2NyaXB0aW9uXCI+XG5cdFx0XHRcdFx0PHN0cm9uZz5IZWxsbyE8L3N0cm9uZz4gbm9ybWFsbHksIGNsaWNraW5nIHRoYXQgYnV0dG9uIHdpbGwgaGlkZSB0aGUgY29va2llIG1lc3NhZ2UgZm9yIDYgbW9udGhzLiBCdXQgdGhhdCB3b3VsZCBtZWFuIHlvdSB3b3VsZG4ndCBiZSBhYmxlIHRvIHNlZSB0aGlzIGRlbW8gYW55bW9yZSwgd2hpY2ggbWlnaHQgYmUgcXVpdGUgYW5ub3lpbmcuIFlvdSBjYW4gcmVmcmVzaCB0aGUgcGFnZSB0byBnZXQgdGhlIHByb3BlciBjb29raWUgbWVzc2FnZSBiYWNrLlxuXHRcdFx0XHQ8L3A+XG5cdFx0XHQ8L2Rpdj5gO1xuXHR9KTtcbn1cblxuZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvQ29va2llTWVzc2FnZS52aWV3JywgKCkgPT4ge1xuXHRjb25zb2xlLmxvZygnVEhFIPCfjaogTUVTU0FHRSBIQVMgQkVFTiBWSUVXRUQnKTtcbn0pO1xuXG5kb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29Db29raWVNZXNzYWdlLmFjdCcsICgpID0+IHtcblx0Y29uc29sZS5sb2coJ1RIRSDwn42qIE1FU1NBR0UgSEFTIEJFRU4gQUNURUQgVVBPTicpO1xufSk7XG5cbmRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb0Nvb2tpZU1lc3NhZ2UuY2xvc2UnLCAoKSA9PiB7XG5cdGNvbnNvbGUubG9nKCdUSEUg8J+NqiBNRVNTQUdFIEhBUyBCRUVOIENMT1NFRCcpO1xufSk7XG4iXX0=