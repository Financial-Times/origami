function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/construct-element.js
  var construct_element_default = {
    message: function message(opts) {
      var messageElement = document.createElement("div");

      if (!opts.type) {
        throw new Error("*** o-message error:\nMessages require a type. Available types are:\n- action\n- alert\n- notice\n***");
      }

      messageElement.classList.add("o-message", "o-message--".concat(opts.type), "o-message--closed");

      if (!opts.close) {
        messageElement.setAttribute("data-o-message-close", false);
      }

      if (opts.inner) {
        messageElement.classList.add("o-message--inner");
      }

      if (!opts.state) {
        throw new Error("*** o-message error:\nMessages require a state.\n***");
      } else {
        messageElement.classList.add("o-message--".concat(opts.state));
      }

      opts.content.detail = opts.content.detail ? opts.content.detail : "";
      var content = "";
      var additionalContent = "";
      var actions = "";

      if (opts.content.highlight) {
        content = "\n\t\t\t\t<span class=\"o-message__content-highlight\">".concat(opts.content.highlight, "</span>\n\t\t\t\t<span class=\"o-message__content-detail\">").concat(opts.content.detail, "</span>\n\t\t\t");
      } else {
        content = opts.content.detail;
      }

      if (opts.inner && opts.content.additionalInfo) {
        additionalContent = "<p class=\"o-message__content-additional\">".concat(opts.content.additionalInfo, "</p>");
      }

      var actionEl = function actionEl(config, type) {
        return "<a href=\"".concat(config.url ? config.url : "", "\" class=\"o-message__actions__").concat(type, "\" ").concat(config.openInNewWindow ? "target=\"_blank\" aria-label=\"".concat(config.text, " (opens in new window)\"") : "", ">").concat(config.text, "</a>");
      };

      if (opts.actions) {
        actions = "\n\t\t\t\t<div class=\"o-message__actions\">\n\t\t\t\t\t".concat(opts.actions.primary && opts.actions.primary.text ? actionEl(opts.actions.primary, "primary") : "", "\n\t\t\t\t\t").concat(opts.actions.secondary && opts.actions.secondary.text ? actionEl(opts.actions.secondary, "secondary") : "", "\n\t\t\t\t</div>\n\t\t\t");
      }

      messageElement.innerHTML = "\n\t\t\t<div class=\"o-message__container\">\n\t\t\t\t<div class=\"o-message__content\">\n\t\t\t\t\t<p class=\"o-message__content-main\">\n\t\t\t\t\t\t".concat(content, "\n\t\t\t\t\t</p>\n\t\t\t\t\t").concat(additionalContent, "\n\t\t\t\t\t").concat(actions, "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
      return messageElement;
    },
    closeButton: function closeButton() {
      var closeButton = document.createElement("button");
      closeButton.classList.add("o-message__close");
      closeButton.setAttribute("aria-label", "close");
      closeButton.setAttribute("title", "Close");
      return closeButton;
    }
  }; // src/js/message.js

  var Message = /*#__PURE__*/function () {
    "use strict";

    function Message(messageElement, options2) {
      _classCallCheck(this, Message);

      this.messageElement = messageElement;
      var type = options2 && options2.type ? options2.type : null;
      var inner = options2 && options2.inner ? options2.inner : false;
      var state = options2 && options2.state ? options2.state : null;
      this.opts = Object.assign({}, {
        autoOpen: true,
        type: type,
        state: state,
        inner: inner,
        parentElement: null,
        content: {
          highlight: null,
          detail: "&hellip;",
          additionalInfo: false
        },
        actions: {
          primary: {
            text: null,
            url: null,
            openInNewWindow: false
          },
          secondary: {
            text: null,
            url: null,
            openInNewWindow: false
          }
        },
        close: options2 && options2.close ? options2.close : true
      }, options2 || Message.getDataAttributes(messageElement));
      this.render();

      if (this.opts.autoOpen) {
        this.open();
      } else {
        this.close();
      }
    }

    _createClass(Message, [{
      key: "render",
      value: function render() {
        var _this = this;

        if (this.opts.parentElement || !(this.messageElement instanceof HTMLElement)) {
          this.messageElement = construct_element_default.message(this.opts);
          var element = this.opts.parentElement ? document.querySelector(this.opts.parentElement) : document.body;
          element.appendChild(this.messageElement);
        }

        var closeButtonExists = this.messageElement.querySelector("[class*='__close']");

        if (this.opts.close && !closeButtonExists) {
          this.closeButton = construct_element_default.closeButton();
          this.closeButton.addEventListener("click", function (event) {
            event.preventDefault();

            _this.close();
          });
          this.messageElement.lastElementChild.appendChild(this.closeButton);
        }
      }
    }, {
      key: "open",
      value: function open() {
        this.messageElement.classList.remove("o-message--closed");
        this.messageElement.dispatchEvent(new CustomEvent("o.messageOpen"));
      }
    }, {
      key: "close",
      value: function close() {
        this.messageElement.classList.add("o-message--closed");
        this.messageElement.dispatchEvent(new CustomEvent("o.messageClosed"));
      }
    }], [{
      key: "getDataAttributes",
      value: function getDataAttributes(messageElement) {
        if (!(messageElement instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(messageElement.dataset).reduce(function (options2, key) {
          if (key === "oComponent") {
            return options2;
          }

          var shortKey = key.replace(/^oMessage(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = messageElement.dataset[key];

          try {
            options2[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
          } catch (error) {
            options2[shortKey] = value;
          }

          return options2;
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

        if (rootEl instanceof HTMLElement && rootEl.matches("[data-o-component=o-message]")) {
          return new Message(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-message"]'), function (rootEl2) {
          return new Message(rootEl2, opts);
        });
      }
    }]);

    return Message;
  }();

  var message_default = Message; // main.js

  var constructAll = function constructAll() {
    message_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = message_default; // demos/src/imperative.js

  var options = {
    type: "alert",
    content: {
      highlight: "Highlight!",
      detail: "Details about the message go here."
    },
    actions: {
      primary: {
        text: "Button"
      },
      secondary: {
        text: "Relevant Link"
      }
    }
  };
  var actionOptions = {
    type: "action",
    content: {
      detail: "Some request for action goes here."
    },
    actions: {
      primary: {
        text: "Action",
        link: "#"
      }
    },
    close: false
  };
  var innerOptions = Object.assign({}, options, {
    type: "alert",
    inner: true,
    parentElement: ".demo-inner",
    content: {
      highlight: "Highlight!",
      detail: "Details about the message go here.",
      additionalInfo: "If there is more to say about this, please feel free to say it here."
    }
  });

  var deleteElementsByClassName = function deleteElementsByClassName(className) {
    var elementsWithThisClass = document.getElementsByClassName(className);

    while (elementsWithThisClass[0]) {
      elementsWithThisClass[0].remove();
    }
  };

  var setUpDemo = function setUpDemo(id, opts, variants) {
    document.getElementById(id).addEventListener("click", function () {
      deleteElementsByClassName("o-message");
      new main_default(null, Object.assign({}, opts, variants));
    });
  };

  var initDemos = function initDemos() {
    setUpDemo("alert-success", options, {
      state: "success"
    });
    setUpDemo("alert-neutral", options, {
      state: "neutral"
    });
    setUpDemo("alert-error", options, {
      state: "error"
    });
    setUpDemo("notice-inform", options, {
      type: "notice",
      state: "inform"
    });
    setUpDemo("notice-warning", options, {
      type: "notice",
      state: "warning"
    });
    setUpDemo("notice-warning-light", options, {
      type: "notice",
      state: "warning-light"
    });
    setUpDemo("inner-alert-success", innerOptions, {
      state: "success"
    });
    setUpDemo("inner-alert-neutral", innerOptions, {
      state: "neutral"
    });
    setUpDemo("inner-alert-error", innerOptions, {
      state: "error",
      actions: null
    });
    setUpDemo("inner-notice-inform", innerOptions, {
      type: "notice",
      state: "inform"
    });
    setUpDemo("inner-notice-warning", innerOptions, {
      type: "notice",
      state: "warning"
    });
    setUpDemo("inner-notice-warning-light", innerOptions, {
      type: "notice",
      state: "warning-light"
    });
    setUpDemo("action-inform-inverse", actionOptions, {
      type: "action",
      state: "inform-inverse"
    });
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
    initDemos();
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9jb25zdHJ1Y3QtZWxlbWVudC5qcyIsInNyYy9qcy9tZXNzYWdlLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9pbXBlcmF0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTyx5QkFBQSxHQUFRO0FBTWQsSUFBQSxPQUFBLEVBQVMsaUJBQUMsSUFBRCxFQUFVO0FBQ2xCLFVBQU0sY0FBQSxHQUFpQixRQUFBLENBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF2Qjs7QUFDQSxVQUFJLENBQUMsSUFBQSxDQUFLLElBQVYsRUFBZ0I7QUFDZixjQUFNLElBQUksS0FBSix5R0FBTjtBQUFnQjs7QUFHakIsTUFBQSxjQUFBLENBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QixXQUE3Qix1QkFBd0QsSUFBQSxDQUFLLElBQTdELEdBQXFFLG1CQUFyRTs7QUFDQSxVQUFJLENBQUMsSUFBQSxDQUFLLEtBQVYsRUFBaUI7QUFHaEIsUUFBQSxjQUFBLENBQWUsWUFBZixDQUE0QixzQkFBNUIsRUFBb0QsS0FBcEQ7QUFBb0Q7O0FBR3JELFVBQUksSUFBQSxDQUFLLEtBQVQsRUFBZ0I7QUFDZixRQUFBLGNBQUEsQ0FBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLGtCQUE3QjtBQUE2Qjs7QUFHOUIsVUFBSSxDQUFDLElBQUEsQ0FBSyxLQUFWLEVBQWlCO0FBQ2hCLGNBQU0sSUFBSSxLQUFKLHdEQUFOO0FBQWdCLE9BRGpCLE1BRU87QUFDTixRQUFBLGNBQUEsQ0FBZSxTQUFmLENBQXlCLEdBQXpCLHNCQUEyQyxJQUFBLENBQUssS0FBaEQ7QUFBZ0Q7O0FBR2pELE1BQUEsSUFBQSxDQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLElBQUEsQ0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixJQUFBLENBQUssT0FBTCxDQUFhLE1BQW5DLEdBQTRDLEVBQWxFO0FBRUEsVUFBSSxPQUFBLEdBQVUsRUFBZDtBQUNBLFVBQUksaUJBQUEsR0FBb0Is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QSxFQUFPO0FBQXhCLEtBQXRELENBQUE7QUFFQSxJQUFBLFNBQUEsQ0FBVSx1QkFBVixFQUFtQyxhQUFuQyxFQUFrRDtBQUFDLE1BQUEsSUFBQSxFQUFNLFFBQVA7QUFBaUIsTUFBQSxLQUFBLEVBQU87QUFBeEIsS0FBbEQsQ0FBQTtBQUEwRSxHQWpCM0U7O0FBb0JBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ25ELElBQUEsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsSUFBSSxXQUFKLENBQWdCLG9CQUFoQixDQUF2QjtBQUVBLElBQUEsU0FBQTtBQUFBLEdBSEQiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cdC8qKlxuXHQqIEJ1aWxkIGEgZnVsbCBtZXNzYWdlIGVsZW1lbnQuIFVzZWQgd2hlbiB0aGVyZSBpcyBubyBtZXNzYWdlIGVsZW1lbnQgaW4gdGhlIERPTS5cblx0KiBAcGFyYW0ge01lc3NhZ2VPcHRpb25zfSBvcHRzIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBtZXNzYWdlLlxuXHQqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gUmV0dXJucyB0aGUgbmV3IG1lc3NhZ2UgZWxlbWVudFxuXHQqL1xuXHRtZXNzYWdlOiAob3B0cykgPT4ge1xuXHRcdGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0aWYgKCFvcHRzLnR5cGUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgKioqIG8tbWVzc2FnZSBlcnJvcjpcXG5NZXNzYWdlcyByZXF1aXJlIGEgdHlwZS4gQXZhaWxhYmxlIHR5cGVzIGFyZTpcXG4tIGFjdGlvblxcbi0gYWxlcnRcXG4tIG5vdGljZVxcbioqKmApO1xuXHRcdH1cblxuXHRcdG1lc3NhZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ28tbWVzc2FnZScsIGBvLW1lc3NhZ2UtLSR7b3B0cy50eXBlfWAsICdvLW1lc3NhZ2UtLWNsb3NlZCcpO1xuXHRcdGlmICghb3B0cy5jbG9zZSkge1xuXHRcdFx0Ly8gd2hlbiBjbG9zZSBpcyBkaXNhYmxlZCBhZGQgdGhlIGRlY2xhcmF0aXZlIGNsb3NlIGF0dHJpYnV0ZVxuXHRcdFx0Ly8gd2hpY2ggaXMgdXNlZCB0byBhcHBseSBzdHlsZVxuXHRcdFx0bWVzc2FnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLW8tbWVzc2FnZS1jbG9zZScsIGZhbHNlKTtcblx0XHR9XG5cblx0XHRpZiAob3B0cy5pbm5lcikge1xuXHRcdFx0bWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnby1tZXNzYWdlLS1pbm5lcicpO1xuXHRcdH1cblxuXHRcdGlmICghb3B0cy5zdGF0ZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGAqKiogby1tZXNzYWdlIGVycm9yOlxcbk1lc3NhZ2VzIHJlcXVpcmUgYSBzdGF0ZS5cXG4qKipgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChgby1tZXNzYWdlLS0ke29wdHMuc3RhdGV9YCk7XG5cdFx0fVxuXG5cdFx0b3B0cy5jb250ZW50LmRldGFpbCA9IG9wdHMuY29udGVudC5kZXRhaWwgPyBvcHRzLmNvbnRlbnQuZGV0YWlsIDogJyc7XG5cblx0XHRsZXQgY29udGVudCA9ICcnO1xuXHRcdGxldCBhZGRpdGlvbmFsQ29udGVudCA9ICcnO1xuXHRcdGxldCBhY3Rpb25zID0gJyc7XG5cblxuXHRcdGlmIChvcHRzLmNvbnRlbnQuaGlnaGxpZ2h0KSB7XG5cdFx0XHRjb250ZW50ID0gYFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm8tbWVzc2FnZV9fY29udGVudC1oaWdobGlnaHRcIj4ke29wdHMuY29udGVudC5oaWdobGlnaHR9PC9zcGFuPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm8tbWVzc2FnZV9fY29udGVudC1kZXRhaWxcIj4ke29wdHMuY29udGVudC5kZXRhaWx9PC9zcGFuPlxuXHRcdFx0YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGVudCA9IG9wdHMuY29udGVudC5kZXRhaWw7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdHMuaW5uZXIgJiYgb3B0cy5jb250ZW50LmFkZGl0aW9uYWxJbmZvKSB7XG5cdFx0XHRhZGRpdGlvbmFsQ29udGVudCA9IGA8cCBjbGFzcz1cIm8tbWVzc2FnZV9fY29udGVudC1hZGRpdGlvbmFsXCI+JHtvcHRzLmNvbnRlbnQuYWRkaXRpb25hbEluZm99PC9wPmA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWN0aW9uRWwgPSAoY29uZmlnLCB0eXBlKSA9PiBgPGEgaHJlZj1cIiR7Y29uZmlnLnVybCA/IGNvbmZpZy51cmwgOiAnJ31cIiBjbGFzcz1cIm8tbWVzc2FnZV9fYWN0aW9uc19fJHt0eXBlfVwiICR7Y29uZmlnLm9wZW5Jbk5ld1dpbmRvdyA/IGB0YXJnZXQ9XCJfYmxhbmtcIiBhcmlhLWxhYmVsPVwiJHtjb25maWcudGV4dH0gKG9wZW5zIGluIG5ldyB3aW5kb3cpXCJgIDogJyd9PiR7Y29uZmlnLnRleHR9PC9hPmA7XG5cblx0XHRpZiAob3B0cy5hY3Rpb25zKSB7XG5cdFx0XHRhY3Rpb25zID0gYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiby1tZXNzYWdlX19hY3Rpb25zXCI+XG5cdFx0XHRcdFx0JHtvcHRzLmFjdGlvbnMucHJpbWFyeSAmJiBvcHRzLmFjdGlvbnMucHJpbWFyeS50ZXh0ID8gYWN0aW9uRWwob3B0cy5hY3Rpb25zLnByaW1hcnksICdwcmltYXJ5JykgOiAnJ31cblx0XHRcdFx0XHQke29wdHMuYWN0aW9ucy5zZWNvbmRhcnkgJiYgb3B0cy5hY3Rpb25zLnNlY29uZGFyeS50ZXh0ID8gYWN0aW9uRWwob3B0cy5hY3Rpb25zLnNlY29uZGFyeSwgJ3NlY29uZGFyeScpIDogJyd9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0YDtcblx0XHR9XG5cblx0XHRtZXNzYWdlRWxlbWVudC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiby1tZXNzYWdlX19jb250YWluZXJcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIm8tbWVzc2FnZV9fY29udGVudFwiPlxuXHRcdFx0XHRcdDxwIGNsYXNzPVwiby1tZXNzYWdlX19jb250ZW50LW1haW5cIj5cblx0XHRcdFx0XHRcdCR7Y29udGVudH1cblx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFx0JHthZGRpdGlvbmFsQ29udGVudH1cblx0XHRcdFx0XHQke2FjdGlvbnN9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblxuXG5cdFx0cmV0dXJuIG1lc3NhZ2VFbGVtZW50O1xuXHR9LFxuXHQvKipcblx0KiBCdWlsZCBhIGNsb3NlIGJ1dHRvblxuXHQqIEByZXR1cm5zIHtIVE1MRWxlbWVudH0gUmV0dXJucyBhIG5ldyBlbGVtZW50IHRvIGNsb3NlIHRoZSBtZXNzYWdlXG5cdCovXG5cdGNsb3NlQnV0dG9uOiAoKSA9PiB7XG5cdFx0Y29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHRjbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBvLW1lc3NhZ2VfX2Nsb3NlYCk7XG5cdFx0Y2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ2Nsb3NlJyk7XG5cdFx0Y2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCd0aXRsZScsICdDbG9zZScpO1xuXG5cdFx0cmV0dXJuIGNsb3NlQnV0dG9uO1xuXHR9XG59O1xuIiwiaW1wb3J0IGNvbnN0cnVjdCBmcm9tICcuL2NvbnN0cnVjdC1lbGVtZW50LmpzJztcblxuLyoqXG4gKiBBbiBvYmplY3Qgb2Ygb3B0aW9ucyB0byBjb25maWd1cmUgYSBtZXNzYWdlIGluc3RhbmNlLlxuICogQHR5cGVkZWYge09iamVjdH0gTWVzc2FnZU9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSB0eXBlIC0gVGhlIG8tbWVzc2FnZSB0eXBlIGUuZy4gJ2FjdGlvbicsICdhbGVydCcgYW5kICdub3RpY2UnLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IHN0YXRlIC0gVGhlIG8tbWVzc2FnZSBzdGF0ZSBlLmcuIGBzdWNjZXNzYCwgYG5ldXRyYWxgLCBgZXJyb3JgLCBgaW5mb3JtLWludmVyc2VgLlxuICogQHByb3BlcnR5IHtCb29sZWFufSBhdXRvT3BlbiBbdHJ1ZV0gLSBXaGV0aGVyIHRvIHNob3cgdGhlIG1lc3NhZ2UgYXV0b21hdGljYWxseS5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwYXJlbnRFbGVtZW50IFtudWxsXSAtIFRoZSBlbGVtZW50IHRvIGFwcGVuZCB0aGUgbWVzc2FnZSB0by4gSWYgbm9uZSBpcyBkZWNsYXJlZCBpdCB3aWxsIGxlYXZlIGFueSBleGlzdGluZyBtZXNzYWdlIGVsZW1lbnRzIGluIHBsYWNlIG9yIGFwcGVuZCB0byB0aGUgYm9keSB3aGVuIGNyZWF0aW5nIGEgbmV3IG1lc3NhZ2UgZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjb250ZW50IC0gQ29uZmlndXJhdGlvbiBmb3IgdGhlIG1lc3NhZ2UgY29weS5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBjb250ZW50LmRldGFpbCAtIENvcHkgZm9yIG9mIHRoZSBtZXNzYWdlIGUuZyBcIlRoaW5nIHNhdmVkIHRvIHRoZSBwbGFjZSB5b3UgcmVxdWVzdGVkLlwiLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IGNvbnRlbnQuaGlnaGxpZ2h0IFtudWxsXSAtIEhpZ2hsaWdodGVkIGNvcHkgdG8gcHJlcGVuZCB0aGUgbWFpbiBtZXNzYWdlIGNvcHkgXCJTdWNjZXNzIVwiLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IGNvbnRlbnQuYWRkaXRpb25hbEluZm8gW251bGxdIC0gTW9yZSBjb3B5IHdpdGggYWRkaXRpb25hbCBpbmZvcm1hdGlvbiDigJMgb25seSBhcHBsaWVzIHRvIGEgbWVzc2FnZSB3aXRoIGFuIGBpbm5lcmAgbGF5b3V0LlxuICogQHByb3BlcnR5IHtPYmplY3R9IFthY3Rpb25zXSAtIExpbmtzIHRvIGRpc3BsYXkgb24gdGhlIG1lc3NhZ2UuXG4gKiBAcHJvcGVydHkge09iamVjdH0gW2FjdGlvbnMucHJpbWFyeV0gLSBTaG93IGEgbGluayBpbiB0aGUgc3R5bGUgb2YgYSBwcmltYXJ5IGJ1dHRvbiB3aXRoaW4gdGhlIG1lc3NhZ2UuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gYWN0aW9ucy5wcmltYXJ5LnRleHQgLSBUaGUgY29weSBmb3IgdGhlIGxpbmsuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gYWN0aW9ucy5wcmltYXJ5LnVybCAtIFRoZSB1cmwgZm9yIHRoZSBsaW5rLlxuICogQHByb3BlcnR5IHtCb29sZWFufSBhY3Rpb25zLnByaW1hcnkub3BlbkluTmV3V2luZG93IFtmYWxzZV0gLSBPcGVucyBpbiBhIG5ldyB0YWIvd2luZG93IHdoZW4gc2V0IHRvIGB0cnVlYC5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbYWN0aW9ucy5zZWNvbmRhcnldIC0gU2hvdyBhIGxpbmsgd2l0aCBsZXNzIGVtcGhhc2lzIHRoYXQgdGhlIHByaW1hcnkgYWN0aW9uLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IGFjdGlvbnMuc2Vjb25kYXJ5LnRleHQgLSBUaGUgY29weSBmb3IgdGhlIGxpbmsuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gYWN0aW9ucy5zZWNvbmRhcnkudXJsIC0gVGhlIHVybCBmb3IgdGhlIGxpbmsuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGFjdGlvbnMuc2Vjb25kYXJ5Lm9wZW5Jbk5ld1dpbmRvdyBbZmFsc2VdIC0gT3BlbnMgaW4gYSBuZXcgdGFiL3dpbmRvdyB3aGVuIHNldCB0byBgdHJ1ZWAuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGNsb3NlIFt0cnVlXSAtICBXaGV0aGVyIG9yIG5vdCB0byBkaXNwbGF5IGEgY2xvc2UgYnV0dG9uLlxuICovXG5cbmNsYXNzIE1lc3NhZ2Uge1xuXHQvKipcblx0ICogSW5pdGlhbGlzZXMgYW4gYG8tbWVzc2FnZWAgY29tcG9uZW50LlxuXHQgKlxuXHQgKiBAYWNjZXNzIHB1YmxpY1xuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBtZXNzYWdlRWxlbWVudCBbdW5kZWZpbmVkXSAtIFRoZSBgby1tZXNzYWdlYCBlbGVtZW50IChvcHRpb25hbCkuXG5cdCAqIEBwYXJhbSB7TWVzc2FnZU9wdGlvbnN9IG9wdGlvbnMgLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIG1lc3NhZ2UuXG5cdCAqXG5cdCAqIEBleGFtcGxlIFRvIGNvbnN0cnVjdCBhbGwgZWxlbWVudHMgb24gdGhlIHBhZ2Ugd2l0aCB0aGUgYGRhdGEtby1jb21wb25lbnQ9XCJvLW1lc3NhZ2VcImAgYXR0cmlidXRlLlxuIFx0ICogICAgICBNZXNzYWdlLmluaXQoKTtcblx0ICpcblx0ICogQGV4YW1wbGUgVG8gY29uc3RydWN0IGEgc3BlY2lmYyBvLW1lc3NhZ2Ugb24gdGhlIHBhZ2UuXG5cdCAqIFx0XHRjb25zdCBteU1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm15LW1lc3NhZ2UnKTtcbiBcdCAqICAgICAgY29uc3QgbXlNZXNzYWdlID0gbmV3IE1lc3NhZ2UobXlNZXNzYWdlRWxlbWVudCwge30pO1xuXHQgKlxuXHQgKiBAZXhhbXBsZSBUbyBjb25zdHJ1Y3QgYSBtZXNzYWdlIHdoaWNoIGRvZXMgbm90IGFscmVhZHkgZXhpc3Qgb24gdGhlIHBhZ2UuXG4gXHQgKiAgICAgIGNvbnN0IGVycm9yQWxlcnQgPSBuZXcgTWVzc2FnZShudWxsLCB7XG4gXHQgKiAgICAgIFx0dHlwZTogJ2FsZXJ0JyxcbiBcdCAqICAgICAgXHRzdGF0ZTogJ2Vycm9yJyxcbiBcdCAqICAgICAgXHRjb250ZW50OiB7XG4gXHQgKiAgICAgIFx0XHRoaWdobGlnaHQ6ICdTb21ldGhpbmcgaGFzIGdvbmUgd3JvbmcuJyxcbiBcdCAqICAgICAgXHRcdGRldGFpbDogJ1RoZSBxdWljayBicm93biBmb3ggZGlkIG5vdCBqdW1wIG92ZXIgdGhlIGxhenkgZG9ncy4nXG4gXHQgKiAgICAgIFx0fVxuIFx0ICogICAgICB9KTtcblx0ICovXG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2VFbGVtZW50LCBvcHRpb25zKSB7XG5cdFx0dGhpcy5tZXNzYWdlRWxlbWVudCA9IG1lc3NhZ2VFbGVtZW50O1xuXG5cdFx0Ly9EZWZhdWx0IG9wdGlvbnNcblx0XHRjb25zdCB0eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnR5cGUgPyBvcHRpb25zLnR5cGUgOiBudWxsO1xuXHRcdGNvbnN0IGlubmVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmlubmVyID8gb3B0aW9ucy5pbm5lciA6IGZhbHNlO1xuXHRcdGNvbnN0IHN0YXRlID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXRlID8gb3B0aW9ucy5zdGF0ZSA6IG51bGw7XG5cblx0XHR0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG5cdFx0XHRhdXRvT3BlbjogdHJ1ZSxcblx0XHRcdHR5cGUsXG5cdFx0XHRzdGF0ZSxcblx0XHRcdGlubmVyLFxuXHRcdFx0cGFyZW50RWxlbWVudDogbnVsbCxcblx0XHRcdGNvbnRlbnQ6IHtcblx0XHRcdFx0aGlnaGxpZ2h0OiBudWxsLFxuXHRcdFx0XHRkZXRhaWw6ICcmaGVsbGlwOycsXG5cdFx0XHRcdGFkZGl0aW9uYWxJbmZvOiBmYWxzZVxuXHRcdFx0fSxcblx0XHRcdGFjdGlvbnM6IHtcblx0XHRcdFx0cHJpbWFyeToge1xuXHRcdFx0XHRcdHRleHQ6IG51bGwsXG5cdFx0XHRcdFx0dXJsOiBudWxsLFxuXHRcdFx0XHRcdG9wZW5Jbk5ld1dpbmRvdzogZmFsc2Vcblx0XHRcdFx0fSxcblx0XHRcdFx0c2Vjb25kYXJ5OiB7XG5cdFx0XHRcdFx0dGV4dDogbnVsbCxcblx0XHRcdFx0XHR1cmw6IG51bGwsXG5cdFx0XHRcdFx0b3BlbkluTmV3V2luZG93OiBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y2xvc2U6IG9wdGlvbnMgJiYgb3B0aW9ucy5jbG9zZSA/IG9wdGlvbnMuY2xvc2UgOiB0cnVlXG5cdFx0fSwgb3B0aW9ucyB8fCBNZXNzYWdlLmdldERhdGFBdHRyaWJ1dGVzKG1lc3NhZ2VFbGVtZW50KSk7XG5cblx0XHR0aGlzLnJlbmRlcigpO1xuXG5cdFx0aWYgKHRoaXMub3B0cy5hdXRvT3Blbikge1xuXHRcdFx0dGhpcy5vcGVuKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVyIHRoZSBtZXNzYWdlLlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHJlbmRlciAoKSB7XG5cdFx0Ly8gSWYgdGhlIG1lc3NhZ2UgZWxlbWVudCBpcyBub3QgYW4gSFRNTCBFbGVtZW50LCBvciBpZiBhIHBhcmVudCBlbGVtZW50IGhhcyBiZWVuIHNwZWNpZmllZCwgYnVpbGQgYSBuZXcgbWVzc2FnZSBlbGVtZW50XG5cdFx0aWYgKHRoaXMub3B0cy5wYXJlbnRFbGVtZW50IHx8ICEodGhpcy5tZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0dGhpcy5tZXNzYWdlRWxlbWVudCA9IGNvbnN0cnVjdC5tZXNzYWdlKHRoaXMub3B0cyk7XG5cdFx0XHQvLyBhdHRhY2ggb01lc3NhZ2UgdG8gc3BlY2lmaWVkIHBhcmVudEVsZW1lbnQgb3IgZGVmYXVsdCB0byBkb2N1bWVudCBib2R5XG5cdFx0XHRjb25zdCBlbGVtZW50ID0gdGhpcy5vcHRzLnBhcmVudEVsZW1lbnQgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMub3B0cy5wYXJlbnRFbGVtZW50KSA6IGRvY3VtZW50LmJvZHk7XG5cdFx0XHRlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMubWVzc2FnZUVsZW1lbnQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNsb3NlQnV0dG9uRXhpc3RzID0gdGhpcy5tZXNzYWdlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2NsYXNzKj0nX19jbG9zZSddXCIpO1xuXHRcdGlmICh0aGlzLm9wdHMuY2xvc2UgJiYgIWNsb3NlQnV0dG9uRXhpc3RzKSB7XG5cdFx0XHR0aGlzLmNsb3NlQnV0dG9uID0gY29uc3RydWN0LmNsb3NlQnV0dG9uKCk7XG5cdFx0XHQvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXG5cdFx0XHR0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5tZXNzYWdlRWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmFwcGVuZENoaWxkKHRoaXMuY2xvc2VCdXR0b24pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVuIHRoZSBtZXNzYWdlLlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdG9wZW4gKCkge1xuXHRcdHRoaXMubWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnby1tZXNzYWdlLS1jbG9zZWQnKTtcblx0XHR0aGlzLm1lc3NhZ2VFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLm1lc3NhZ2VPcGVuJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIHRoZSBtZXNzYWdlLlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGNsb3NlICgpIHtcblx0XHR0aGlzLm1lc3NhZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ28tbWVzc2FnZS0tY2xvc2VkJyk7XG5cdFx0dGhpcy5tZXNzYWdlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5tZXNzYWdlQ2xvc2VkJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIG1lc3NhZ2VFbGVtZW50LiBJZiB0aGUgbWVzc2FnZSBpcyBiZWluZyBzZXQgdXBcblx0ICogZGVjbGFyYXRpdmVseSwgdGhpcyBtZXRob2QgaXMgdXNlZCB0byBleHRyYWN0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NLlxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBtZXNzYWdlRWxlbWVudCAtIFRoZSBtZXNzYWdlIGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSAtIEFuIG9iamVjdCBvZiBvcHRpb25zIGRlZmluZWQgdmlhIGRhdGEgYXR0cmlidXRlcyBvbiB0aGUgbWVzc2FnZSBlbGVtZW50XG5cdCAqL1xuXHRzdGF0aWMgZ2V0RGF0YUF0dHJpYnV0ZXMgKG1lc3NhZ2VFbGVtZW50KSB7XG5cdFx0aWYgKCEobWVzc2FnZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG1lc3NhZ2VFbGVtZW50LmRhdGFzZXQpLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XG5cblx0XHRcdC8vIElnbm9yZSBkYXRhLW8tY29tcG9uZW50XG5cdFx0XHRpZiAoa2V5ID09PSAnb0NvbXBvbmVudCcpIHtcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJ1aWxkIGEgY29uY2lzZSBrZXkgYW5kIGdldCB0aGUgb3B0aW9uIHZhbHVlXG5cdFx0XHRjb25zdCBzaG9ydEtleSA9IGtleS5yZXBsYWNlKC9eb01lc3NhZ2UoXFx3KShcXHcrKSQvLCAobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTIpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBtZXNzYWdlRWxlbWVudC5kYXRhc2V0W2tleV07XG5cblx0XHRcdC8vIFRyeSBwYXJzaW5nIHRoZSB2YWx1ZSBhcyBKU09OLCBvdGhlcndpc2UganVzdCBzZXQgaXQgYXMgYSBzdHJpbmdcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gSlNPTi5wYXJzZSh2YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9wdGlvbnM7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpc2UgbWVzc2FnZSBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbGVtZW50IC0gVGhlIHJvb3QgZWxlbWVudCB0byBpbnRpYWxpc2UgYSBtZXNzYWdlIGluLCBvciBhIENTUyBzZWxlY3RvciBmb3IgdGhlIHJvb3QgZWxlbWVudFxuXHQgKiBAdHlwZWRlZiB7T2JqZWN0fSBNZXNzYWdlT3B0aW9ucyAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgbWVzc2FnZXNcblx0ICogQHJldHVybnMge01lc3NhZ2V8TWVzc2FnZVtdfSBUaGUgbmV3bHkgY29uc3RydWN0ZWQgbWVzc2FnZSBjb21wb25lbnRzXG5cdCAqL1xuXHRzdGF0aWMgaW5pdCAocm9vdEVsLCBvcHRzKSB7XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHJvb3RFbC5tYXRjaGVzKCdbZGF0YS1vLWNvbXBvbmVudD1vLW1lc3NhZ2VdJykpIHtcblx0XHRcdHJldHVybiBuZXcgTWVzc2FnZShyb290RWwsIG9wdHMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBBcnJheS5mcm9tKHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tbWVzc2FnZVwiXScpLCByb290RWwgPT4gbmV3IE1lc3NhZ2Uocm9vdEVsLCBvcHRzKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcbiIsIlxuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9zcmMvanMvbWVzc2FnZS5qcyc7XG5cbmNvbnN0IGNvbnN0cnVjdEFsbCA9ICgpID0+IHtcblx0TWVzc2FnZS5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlO1xuIiwiaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi8uLi8uLi9tYWluLmpzJztcblxuY29uc3Qgb3B0aW9ucyA9IHtcblx0dHlwZTogJ2FsZXJ0Jyxcblx0Y29udGVudDoge1xuXHRcdGhpZ2hsaWdodDogJ0hpZ2hsaWdodCEnLFxuXHRcdGRldGFpbDogJ0RldGFpbHMgYWJvdXQgdGhlIG1lc3NhZ2UgZ28gaGVyZS4nXG5cdH0sXG5cdGFjdGlvbnM6IHtcblx0XHRwcmltYXJ5OiB7XG5cdFx0XHR0ZXh0OiAnQnV0dG9uJ1xuXHRcdH0sXG5cdFx0c2Vjb25kYXJ5OiB7XG5cdFx0XHR0ZXh0OiAnUmVsZXZhbnQgTGluaydcblx0XHR9LFxuXHR9XG59O1xuXG5jb25zdCBhY3Rpb25PcHRpb25zID0ge1xuXHR0eXBlOiAnYWN0aW9uJyxcblx0Y29udGVudDoge1xuXHRcdGRldGFpbDogJ1NvbWUgcmVxdWVzdCBmb3IgYWN0aW9uIGdvZXMgaGVyZS4nXG5cdH0sXG5cdGFjdGlvbnM6IHtcblx0XHRwcmltYXJ5OiB7XG5cdFx0XHR0ZXh0OiAnQWN0aW9uJyxcblx0XHRcdGxpbms6ICcjJ1xuXHRcdH1cblx0fSxcblx0Y2xvc2U6IGZhbHNlXG59O1xuXG5jb25zdCBpbm5lck9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7XG5cdHR5cGU6ICdhbGVydCcsXG5cdGlubmVyOiB0cnVlLFxuXHRwYXJlbnRFbGVtZW50OiAnLmRlbW8taW5uZXInLFxuXHRjb250ZW50OiB7XG5cdFx0aGlnaGxpZ2h0OiAnSGlnaGxpZ2h0IScsXG5cdFx0ZGV0YWlsOiAnRGV0YWlscyBhYm91dCB0aGUgbWVzc2FnZSBnbyBoZXJlLicsXG5cdFx0YWRkaXRpb25hbEluZm86ICdJZiB0aGVyZSBpcyBtb3JlIHRvIHNheSBhYm91dCB0aGlzLCBwbGVhc2UgZmVlbCBmcmVlIHRvIHNheSBpdCBoZXJlLidcblx0fVxufSk7XG5cbmNvbnN0IGRlbGV0ZUVsZW1lbnRzQnlDbGFzc05hbWUgPSAoY2xhc3NOYW1lKSA9PiB7XG5cdGNvbnN0IGVsZW1lbnRzV2l0aFRoaXNDbGFzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcblx0d2hpbGUgKGVsZW1lbnRzV2l0aFRoaXNDbGFzc1swXSkge1xuXHRcdGVsZW1lbnRzV2l0aFRoaXNDbGFzc1swXS5yZW1vdmUoKTtcblx0fVxufTtcblxuY29uc3Qgc2V0VXBEZW1vID0gKGlkLCBvcHRzLCB2YXJpYW50cykgPT4ge1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0ZGVsZXRlRWxlbWVudHNCeUNsYXNzTmFtZSgnby1tZXNzYWdlJyk7XG5cdFx0bmV3IE1lc3NhZ2UobnVsbCwgT2JqZWN0LmFzc2lnbih7fSwgb3B0cywgdmFyaWFudHMpKTtcblx0fSk7XG59O1xuXG5jb25zdCBpbml0RGVtb3MgPSAoKSA9PiB7XG5cdHNldFVwRGVtbygnYWxlcnQtc3VjY2VzcycsIG9wdGlvbnMsIHtzdGF0ZTogJ3N1Y2Nlc3MnfSk7XG5cdHNldFVwRGVtbygnYWxlcnQtbmV1dHJhbCcsIG9wdGlvbnMsIHtzdGF0ZTogJ25ldXRyYWwnfSk7XG5cdHNldFVwRGVtbygnYWxlcnQtZXJyb3InLCBvcHRpb25zLCB7c3RhdGU6ICdlcnJvcid9KTtcblxuXHRzZXRVcERlbW8oJ25vdGljZS1pbmZvcm0nLCBvcHRpb25zLCB7dHlwZTogJ25vdGljZScsIHN0YXRlOiAnaW5mb3JtJ30pO1xuXHRzZXRVcERlbW8oJ25vdGljZS13YXJuaW5nJywgb3B0aW9ucywge3R5cGU6ICdub3RpY2UnLCBzdGF0ZTogJ3dhcm5pbmcnfSk7XG5cdHNldFVwRGVtbygnbm90aWNlLXdhcm5pbmctbGlnaHQnLCBvcHRpb25zLCB7dHlwZTogJ25vdGljZScsIHN0YXRlOiAnd2FybmluZy1saWdodCd9KTtcblxuXHRzZXRVcERlbW8oJ2lubmVyLWFsZXJ0LXN1Y2Nlc3MnLCBpbm5lck9wdGlvbnMsIHtzdGF0ZTogJ3N1Y2Nlc3MnfSk7XG5cdHNldFVwRGVtbygnaW5uZXItYWxlcnQtbmV1dHJhbCcsIGlubmVyT3B0aW9ucywge3N0YXRlOiAnbmV1dHJhbCd9KTtcblx0c2V0VXBEZW1vKCdpbm5lci1hbGVydC1lcnJvcicsIGlubmVyT3B0aW9ucywge3N0YXRlOiAnZXJyb3InLCBhY3Rpb25zOiBudWxsfSk7XG5cblx0c2V0VXBEZW1vKCdpbm5lci1ub3RpY2UtaW5mb3JtJywgaW5uZXJPcHRpb25zLCB7dHlwZTogJ25vdGljZScsIHN0YXRlOiAnaW5mb3JtJ30pO1xuXHRzZXRVcERlbW8oJ2lubmVyLW5vdGljZS13YXJuaW5nJywgaW5uZXJPcHRpb25zLCB7dHlwZTogJ25vdGljZScsIHN0YXRlOiAnd2FybmluZyd9KTtcblx0c2V0VXBEZW1vKCdpbm5lci1ub3RpY2Utd2FybmluZy1saWdodCcsIGlubmVyT3B0aW9ucywge3R5cGU6ICdub3RpY2UnLCBzdGF0ZTogJ3dhcm5pbmctbGlnaHQnfSk7XG5cblx0c2V0VXBEZW1vKCdhY3Rpb24taW5mb3JtLWludmVyc2UnLCBhY3Rpb25PcHRpb25zLCB7dHlwZTogJ2FjdGlvbicsIHN0YXRlOiAnaW5mb3JtLWludmVyc2UnfSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnby5ET01Db250ZW50TG9hZGVkJykpO1xuXG5cdGluaXREZW1vcygpO1xufSk7XG4iXX0=