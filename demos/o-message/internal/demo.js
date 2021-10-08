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

    function Message(messageElement, options) {
      _classCallCheck(this, Message);

      this.messageElement = messageElement;
      var type = options && options.type ? options.type : null;
      var inner = options && options.inner ? options.inner : false;
      var state = options && options.state ? options.state : null;
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
        close: options && options.close ? options.close : true
      }, options || Message.getDataAttributes(messageElement));
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

        return Object.keys(messageElement.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oMessage(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = messageElement.dataset[key];

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

  document.addEventListener("o.DOMContentLoaded", constructAll); // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9jb25zdHJ1Y3QtZWxlbWVudC5qcyIsInNyYy9qcy9tZXNzYWdlLmpzIiwibWFpbi5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTyx5QkFBQSxHQUFRO0FBTWQsSUFBQSxPQUFBLEVBQVMsaUJBQUMsSUFBRCxFQUFVO0FBQ2xCLFVBQU0sY0FBQSxHQUFpQixRQUFBLENBQVMsYUFBVCxDQUF1QixLQUF2QixDQUF2Qjs7QUFDQSxVQUFJLENBQUMsSUFBQSxDQUFLLElBQVYsRUFBZ0I7QUFDZixjQUFNLElBQUksS0FBSix5R0FBTjtBQUFnQjs7QUFHakIsTUFBQSxjQUFBLENBQWUsU0FBZixDQUF5QixHQUF6QixDQUE2QixXQUE3Qix1QkFBd0QsSUFBQSxDQUFLLElBQTdELEdBQXFFLG1CQUFyRTs7QUFDQSxVQUFJLENBQUMsSUFBQSxDQUFLLEtBQVYsRUFBaUI7QUFHaEIsUUFBQSxjQUFBLENBQWUsWUFBZixDQUE0QixzQkFBNUIsRUFBb0QsS0FBcEQ7QUFBb0Q7O0FBR3JELFVBQUksSUFBQSxDQUFLLEtBQVQsRUFBZ0I7QUFDZixRQUFBLGNBQUEsQ0FBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLGtCQUE3QjtBQUE2Qjs7QUFHOUIsVUFBSSxDQUFDLElBQUEsQ0FBSyxLQUFWLEVBQWlCO0FBQ2hCLGNBQU0sSUFBSSxLQUFKLHdEQUFOO0FBQWdCLE9BRGpCLE1BRU87QUFDTixRQUFBLGNBQUEsQ0FBZSxTQUFmLENBQXlCLEdBQXpCLHNCQUEyQyxJQUFBLENBQUssS0FBaEQ7QUFBZ0Q7O0FBR2pELE1BQUEsSUFBQSxDQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLElBQUEsQ0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixJQUFBLENBQUssT0FBTCxDQUFhLE1BQW5DLEdBQTRDLEVBQWxFO0FBRUEsVUFBSSxPQUFBLEdBQVUsRUFBZDtBQUNBLFVBQUksaUJBQUEsR0FBb0IsRUFBeEI7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RUFBb0IsSUFBcEIsQ0FBVjtBQUFBLFNBQXRFLENBQVA7QUFBMkc7QUFuSzdHOztBQUFBO0FBQUEsS0FBQTs7QUF1S0EsTUFBTyxlQUFBLEdBQVEsT0FBZixDOztBQzdMQSxNQUFNLFlBQUEsR0FBZSxTQUFmLFlBQWUsR0FBTTtBQUMxQixJQUFBLGVBQUEsQ0FBUSxJQUFSO0FBQ0EsSUFBQSxRQUFBLENBQVMsbUJBQVQsQ0FBNkIsb0JBQTdCLEVBQW1ELFlBQW5EO0FBQW1ELEdBRnBEOztBQUtBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLG9CQUExQixFQUFnRCxZQUFoRCxFOztBQ05BLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELElBQUEsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsSUFBSSxXQUFKLENBQWdCLG9CQUFoQixDQUF2QjtBQUF1QyxHQUR4QyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblx0LyoqXG5cdCogQnVpbGQgYSBmdWxsIG1lc3NhZ2UgZWxlbWVudC4gVXNlZCB3aGVuIHRoZXJlIGlzIG5vIG1lc3NhZ2UgZWxlbWVudCBpbiB0aGUgRE9NLlxuXHQqIEBwYXJhbSB7TWVzc2FnZU9wdGlvbnN9IG9wdHMgLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIG1lc3NhZ2UuXG5cdCogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIHRoZSBuZXcgbWVzc2FnZSBlbGVtZW50XG5cdCovXG5cdG1lc3NhZ2U6IChvcHRzKSA9PiB7XG5cdFx0Y29uc3QgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRpZiAoIW9wdHMudHlwZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGAqKiogby1tZXNzYWdlIGVycm9yOlxcbk1lc3NhZ2VzIHJlcXVpcmUgYSB0eXBlLiBBdmFpbGFibGUgdHlwZXMgYXJlOlxcbi0gYWN0aW9uXFxuLSBhbGVydFxcbi0gbm90aWNlXFxuKioqYCk7XG5cdFx0fVxuXG5cdFx0bWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnby1tZXNzYWdlJywgYG8tbWVzc2FnZS0tJHtvcHRzLnR5cGV9YCwgJ28tbWVzc2FnZS0tY2xvc2VkJyk7XG5cdFx0aWYgKCFvcHRzLmNsb3NlKSB7XG5cdFx0XHQvLyB3aGVuIGNsb3NlIGlzIGRpc2FibGVkIGFkZCB0aGUgZGVjbGFyYXRpdmUgY2xvc2UgYXR0cmlidXRlXG5cdFx0XHQvLyB3aGljaCBpcyB1c2VkIHRvIGFwcGx5IHN0eWxlXG5cdFx0XHRtZXNzYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby1tZXNzYWdlLWNsb3NlJywgZmFsc2UpO1xuXHRcdH1cblxuXHRcdGlmIChvcHRzLmlubmVyKSB7XG5cdFx0XHRtZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvLW1lc3NhZ2UtLWlubmVyJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFvcHRzLnN0YXRlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCoqKiBvLW1lc3NhZ2UgZXJyb3I6XFxuTWVzc2FnZXMgcmVxdWlyZSBhIHN0YXRlLlxcbioqKmApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGBvLW1lc3NhZ2UtLSR7b3B0cy5zdGF0ZX1gKTtcblx0XHR9XG5cblx0XHRvcHRzLmNvbnRlbnQuZGV0YWlsID0gb3B0cy5jb250ZW50LmRldGFpbCA/IG9wdHMuY29udGVudC5kZXRhaWwgOiAnJztcblxuXHRcdGxldCBjb250ZW50ID0gJyc7XG5cdFx0bGV0IGFkZGl0aW9uYWxDb250ZW50ID0gJyc7XG5cdFx0bGV0IGFjdGlvbnMgPSAnJztcblxuXG5cdFx0aWYgKG9wdHMuY29udGVudC5oaWdobGlnaHQpIHtcblx0XHRcdGNvbnRlbnQgPSBgXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwiby1tZXNzYWdlX19jb250ZW50LWhpZ2hsaWdodFwiPiR7b3B0cy5jb250ZW50LmhpZ2hsaWdodH08L3NwYW4+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwiby1tZXNzYWdlX19jb250ZW50LWRldGFpbFwiPiR7b3B0cy5jb250ZW50LmRldGFpbH08L3NwYW4+XG5cdFx0XHRgO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb250ZW50ID0gb3B0cy5jb250ZW50LmRldGFpbDtcblx0XHR9XG5cblx0XHRpZiAob3B0cy5pbm5lciAmJiBvcHRzLmNvbnRlbnQuYWRkaXRpb25hbEluZm8pIHtcblx0XHRcdGFkZGl0aW9uYWxDb250ZW50ID0gYDxwIGNsYXNzPVwiby1tZXNzYWdlX19jb250ZW50LWFkZGl0aW9uYWxcIj4ke29wdHMuY29udGVudC5hZGRpdGlvbmFsSW5mb308L3A+YDtcblx0XHR9XG5cblx0XHRjb25zdCBhY3Rpb25FbCA9IChjb25maWcsIHR5cGUpID0+IGA8YSBocmVmPVwiJHtjb25maWcudXJsID8gY29uZmlnLnVybCA6ICcnfVwiIGNsYXNzPVwiby1tZXNzYWdlX19hY3Rpb25zX18ke3R5cGV9XCIgJHtjb25maWcub3BlbkluTmV3V2luZG93ID8gYHRhcmdldD1cIl9ibGFua1wiIGFyaWEtbGFiZWw9XCIke2NvbmZpZy50ZXh0fSAob3BlbnMgaW4gbmV3IHdpbmRvdylcImAgOiAnJ30+JHtjb25maWcudGV4dH08L2E+YDtcblxuXHRcdGlmIChvcHRzLmFjdGlvbnMpIHtcblx0XHRcdGFjdGlvbnMgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJvLW1lc3NhZ2VfX2FjdGlvbnNcIj5cblx0XHRcdFx0XHQke29wdHMuYWN0aW9ucy5wcmltYXJ5ICYmIG9wdHMuYWN0aW9ucy5wcmltYXJ5LnRleHQgPyBhY3Rpb25FbChvcHRzLmFjdGlvbnMucHJpbWFyeSwgJ3ByaW1hcnknKSA6ICcnfVxuXHRcdFx0XHRcdCR7b3B0cy5hY3Rpb25zLnNlY29uZGFyeSAmJiBvcHRzLmFjdGlvbnMuc2Vjb25kYXJ5LnRleHQgPyBhY3Rpb25FbChvcHRzLmFjdGlvbnMuc2Vjb25kYXJ5LCAnc2Vjb25kYXJ5JykgOiAnJ31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgO1xuXHRcdH1cblxuXHRcdG1lc3NhZ2VFbGVtZW50LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJvLW1lc3NhZ2VfX2NvbnRhaW5lclwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiby1tZXNzYWdlX19jb250ZW50XCI+XG5cdFx0XHRcdFx0PHAgY2xhc3M9XCJvLW1lc3NhZ2VfX2NvbnRlbnQtbWFpblwiPlxuXHRcdFx0XHRcdFx0JHtjb250ZW50fVxuXHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHQke2FkZGl0aW9uYWxDb250ZW50fVxuXHRcdFx0XHRcdCR7YWN0aW9uc31cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cblx0XHRyZXR1cm4gbWVzc2FnZUVsZW1lbnQ7XG5cdH0sXG5cdC8qKlxuXHQqIEJ1aWxkIGEgY2xvc2UgYnV0dG9uXG5cdCogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIGEgbmV3IGVsZW1lbnQgdG8gY2xvc2UgdGhlIG1lc3NhZ2Vcblx0Ki9cblx0Y2xvc2VCdXR0b246ICgpID0+IHtcblx0XHRjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdGNsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoYG8tbWVzc2FnZV9fY2xvc2VgKTtcblx0XHRjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnY2xvc2UnKTtcblx0XHRjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0Nsb3NlJyk7XG5cblx0XHRyZXR1cm4gY2xvc2VCdXR0b247XG5cdH1cbn07XG4iLCJpbXBvcnQgY29uc3RydWN0IGZyb20gJy4vY29uc3RydWN0LWVsZW1lbnQuanMnO1xuXG4vKipcbiAqIEFuIG9iamVjdCBvZiBvcHRpb25zIHRvIGNvbmZpZ3VyZSBhIG1lc3NhZ2UgaW5zdGFuY2UuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBNZXNzYWdlT3B0aW9uc1xuICogQHByb3BlcnR5IHtTdHJpbmd9IHR5cGUgLSBUaGUgby1tZXNzYWdlIHR5cGUgZS5nLiAnYWN0aW9uJywgJ2FsZXJ0JyBhbmQgJ25vdGljZScuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gc3RhdGUgLSBUaGUgby1tZXNzYWdlIHN0YXRlIGUuZy4gYHN1Y2Nlc3NgLCBgbmV1dHJhbGAsIGBlcnJvcmAsIGBpbmZvcm0taW52ZXJzZWAuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGF1dG9PcGVuIFt0cnVlXSAtIFdoZXRoZXIgdG8gc2hvdyB0aGUgbWVzc2FnZSBhdXRvbWF0aWNhbGx5LlxuICogQHByb3BlcnR5IHtTdHJpbmd9IHBhcmVudEVsZW1lbnQgW251bGxdIC0gVGhlIGVsZW1lbnQgdG8gYXBwZW5kIHRoZSBtZXNzYWdlIHRvLiBJZiBub25lIGlzIGRlY2xhcmVkIGl0IHdpbGwgbGVhdmUgYW55IGV4aXN0aW5nIG1lc3NhZ2UgZWxlbWVudHMgaW4gcGxhY2Ugb3IgYXBwZW5kIHRvIHRoZSBib2R5IHdoZW4gY3JlYXRpbmcgYSBuZXcgbWVzc2FnZSBlbGVtZW50LlxuICogQHByb3BlcnR5IHtPYmplY3R9IGNvbnRlbnQgLSBDb25maWd1cmF0aW9uIGZvciB0aGUgbWVzc2FnZSBjb3B5LlxuICogQHByb3BlcnR5IHtTdHJpbmd9IGNvbnRlbnQuZGV0YWlsIC0gQ29weSBmb3Igb2YgdGhlIG1lc3NhZ2UgZS5nIFwiVGhpbmcgc2F2ZWQgdG8gdGhlIHBsYWNlIHlvdSByZXF1ZXN0ZWQuXCIuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gY29udGVudC5oaWdobGlnaHQgW251bGxdIC0gSGlnaGxpZ2h0ZWQgY29weSB0byBwcmVwZW5kIHRoZSBtYWluIG1lc3NhZ2UgY29weSBcIlN1Y2Nlc3MhXCIuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gY29udGVudC5hZGRpdGlvbmFsSW5mbyBbbnVsbF0gLSBNb3JlIGNvcHkgd2l0aCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIOKAkyBvbmx5IGFwcGxpZXMgdG8gYSBtZXNzYWdlIHdpdGggYW4gYGlubmVyYCBsYXlvdXQuXG4gKiBAcHJvcGVydHkge09iamVjdH0gW2FjdGlvbnNdIC0gTGlua3MgdG8gZGlzcGxheSBvbiB0aGUgbWVzc2FnZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBbYWN0aW9ucy5wcmltYXJ5XSAtIFNob3cgYSBsaW5rIGluIHRoZSBzdHlsZSBvZiBhIHByaW1hcnkgYnV0dG9uIHdpdGhpbiB0aGUgbWVzc2FnZS5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBhY3Rpb25zLnByaW1hcnkudGV4dCAtIFRoZSBjb3B5IGZvciB0aGUgbGluay5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBhY3Rpb25zLnByaW1hcnkudXJsIC0gVGhlIHVybCBmb3IgdGhlIGxpbmsuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGFjdGlvbnMucHJpbWFyeS5vcGVuSW5OZXdXaW5kb3cgW2ZhbHNlXSAtIE9wZW5zIGluIGEgbmV3IHRhYi93aW5kb3cgd2hlbiBzZXQgdG8gYHRydWVgLlxuICogQHByb3BlcnR5IHtPYmplY3R9IFthY3Rpb25zLnNlY29uZGFyeV0gLSBTaG93IGEgbGluayB3aXRoIGxlc3MgZW1waGFzaXMgdGhhdCB0aGUgcHJpbWFyeSBhY3Rpb24uXG4gKiBAcHJvcGVydHkge1N0cmluZ30gYWN0aW9ucy5zZWNvbmRhcnkudGV4dCAtIFRoZSBjb3B5IGZvciB0aGUgbGluay5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBhY3Rpb25zLnNlY29uZGFyeS51cmwgLSBUaGUgdXJsIGZvciB0aGUgbGluay5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYWN0aW9ucy5zZWNvbmRhcnkub3BlbkluTmV3V2luZG93IFtmYWxzZV0gLSBPcGVucyBpbiBhIG5ldyB0YWIvd2luZG93IHdoZW4gc2V0IHRvIGB0cnVlYC5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gY2xvc2UgW3RydWVdIC0gIFdoZXRoZXIgb3Igbm90IHRvIGRpc3BsYXkgYSBjbG9zZSBidXR0b24uXG4gKi9cblxuY2xhc3MgTWVzc2FnZSB7XG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlcyBhbiBgby1tZXNzYWdlYCBjb21wb25lbnQuXG5cdCAqXG5cdCAqIEBhY2Nlc3MgcHVibGljXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG1lc3NhZ2VFbGVtZW50IFt1bmRlZmluZWRdIC0gVGhlIGBvLW1lc3NhZ2VgIGVsZW1lbnQgKG9wdGlvbmFsKS5cblx0ICogQHBhcmFtIHtNZXNzYWdlT3B0aW9uc30gb3B0aW9ucyAtIEFuIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWd1cmluZyB0aGUgbWVzc2FnZS5cblx0ICpcblx0ICogQGV4YW1wbGUgVG8gY29uc3RydWN0IGFsbCBlbGVtZW50cyBvbiB0aGUgcGFnZSB3aXRoIHRoZSBgZGF0YS1vLWNvbXBvbmVudD1cIm8tbWVzc2FnZVwiYCBhdHRyaWJ1dGUuXG4gXHQgKiAgICAgIE1lc3NhZ2UuaW5pdCgpO1xuXHQgKlxuXHQgKiBAZXhhbXBsZSBUbyBjb25zdHJ1Y3QgYSBzcGVjaWZjIG8tbWVzc2FnZSBvbiB0aGUgcGFnZS5cblx0ICogXHRcdGNvbnN0IG15TWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXktbWVzc2FnZScpO1xuIFx0ICogICAgICBjb25zdCBteU1lc3NhZ2UgPSBuZXcgTWVzc2FnZShteU1lc3NhZ2VFbGVtZW50LCB7fSk7XG5cdCAqXG5cdCAqIEBleGFtcGxlIFRvIGNvbnN0cnVjdCBhIG1lc3NhZ2Ugd2hpY2ggZG9lcyBub3QgYWxyZWFkeSBleGlzdCBvbiB0aGUgcGFnZS5cbiBcdCAqICAgICAgY29uc3QgZXJyb3JBbGVydCA9IG5ldyBNZXNzYWdlKG51bGwsIHtcbiBcdCAqICAgICAgXHR0eXBlOiAnYWxlcnQnLFxuIFx0ICogICAgICBcdHN0YXRlOiAnZXJyb3InLFxuIFx0ICogICAgICBcdGNvbnRlbnQ6IHtcbiBcdCAqICAgICAgXHRcdGhpZ2hsaWdodDogJ1NvbWV0aGluZyBoYXMgZ29uZSB3cm9uZy4nLFxuIFx0ICogICAgICBcdFx0ZGV0YWlsOiAnVGhlIHF1aWNrIGJyb3duIGZveCBkaWQgbm90IGp1bXAgb3ZlciB0aGUgbGF6eSBkb2dzLidcbiBcdCAqICAgICAgXHR9XG4gXHQgKiAgICAgIH0pO1xuXHQgKi9cblx0Y29uc3RydWN0b3IobWVzc2FnZUVsZW1lbnQsIG9wdGlvbnMpIHtcblx0XHR0aGlzLm1lc3NhZ2VFbGVtZW50ID0gbWVzc2FnZUVsZW1lbnQ7XG5cblx0XHQvL0RlZmF1bHQgb3B0aW9uc1xuXHRcdGNvbnN0IHR5cGUgPSBvcHRpb25zICYmIG9wdGlvbnMudHlwZSA/IG9wdGlvbnMudHlwZSA6IG51bGw7XG5cdFx0Y29uc3QgaW5uZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuaW5uZXIgPyBvcHRpb25zLmlubmVyIDogZmFsc2U7XG5cdFx0Y29uc3Qgc3RhdGUgPSBvcHRpb25zICYmIG9wdGlvbnMuc3RhdGUgPyBvcHRpb25zLnN0YXRlIDogbnVsbDtcblxuXHRcdHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHtcblx0XHRcdGF1dG9PcGVuOiB0cnVlLFxuXHRcdFx0dHlwZSxcblx0XHRcdHN0YXRlLFxuXHRcdFx0aW5uZXIsXG5cdFx0XHRwYXJlbnRFbGVtZW50OiBudWxsLFxuXHRcdFx0Y29udGVudDoge1xuXHRcdFx0XHRoaWdobGlnaHQ6IG51bGwsXG5cdFx0XHRcdGRldGFpbDogJyZoZWxsaXA7Jyxcblx0XHRcdFx0YWRkaXRpb25hbEluZm86IGZhbHNlXG5cdFx0XHR9LFxuXHRcdFx0YWN0aW9uczoge1xuXHRcdFx0XHRwcmltYXJ5OiB7XG5cdFx0XHRcdFx0dGV4dDogbnVsbCxcblx0XHRcdFx0XHR1cmw6IG51bGwsXG5cdFx0XHRcdFx0b3BlbkluTmV3V2luZG93OiBmYWxzZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWNvbmRhcnk6IHtcblx0XHRcdFx0XHR0ZXh0OiBudWxsLFxuXHRcdFx0XHRcdHVybDogbnVsbCxcblx0XHRcdFx0XHRvcGVuSW5OZXdXaW5kb3c6IGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjbG9zZTogb3B0aW9ucyAmJiBvcHRpb25zLmNsb3NlID8gb3B0aW9ucy5jbG9zZSA6IHRydWVcblx0XHR9LCBvcHRpb25zIHx8IE1lc3NhZ2UuZ2V0RGF0YUF0dHJpYnV0ZXMobWVzc2FnZUVsZW1lbnQpKTtcblxuXHRcdHRoaXMucmVuZGVyKCk7XG5cblx0XHRpZiAodGhpcy5vcHRzLmF1dG9PcGVuKSB7XG5cdFx0XHR0aGlzLm9wZW4oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZW5kZXIgdGhlIG1lc3NhZ2UuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0cmVuZGVyICgpIHtcblx0XHQvLyBJZiB0aGUgbWVzc2FnZSBlbGVtZW50IGlzIG5vdCBhbiBIVE1MIEVsZW1lbnQsIG9yIGlmIGEgcGFyZW50IGVsZW1lbnQgaGFzIGJlZW4gc3BlY2lmaWVkLCBidWlsZCBhIG5ldyBtZXNzYWdlIGVsZW1lbnRcblx0XHRpZiAodGhpcy5vcHRzLnBhcmVudEVsZW1lbnQgfHwgISh0aGlzLm1lc3NhZ2VFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHR0aGlzLm1lc3NhZ2VFbGVtZW50ID0gY29uc3RydWN0Lm1lc3NhZ2UodGhpcy5vcHRzKTtcblx0XHRcdC8vIGF0dGFjaCBvTWVzc2FnZSB0byBzcGVjaWZpZWQgcGFyZW50RWxlbWVudCBvciBkZWZhdWx0IHRvIGRvY3VtZW50IGJvZHlcblx0XHRcdGNvbnN0IGVsZW1lbnQgPSB0aGlzLm9wdHMucGFyZW50RWxlbWVudCA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRzLnBhcmVudEVsZW1lbnQpIDogZG9jdW1lbnQuYm9keTtcblx0XHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tZXNzYWdlRWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY2xvc2VCdXR0b25FeGlzdHMgPSB0aGlzLm1lc3NhZ2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbY2xhc3MqPSdfX2Nsb3NlJ11cIik7XG5cdFx0aWYgKHRoaXMub3B0cy5jbG9zZSAmJiAhY2xvc2VCdXR0b25FeGlzdHMpIHtcblx0XHRcdHRoaXMuY2xvc2VCdXR0b24gPSBjb25zdHJ1Y3QuY2xvc2VCdXR0b24oKTtcblx0XHRcdC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcblx0XHRcdHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLm1lc3NhZ2VFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUJ1dHRvbik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW4gdGhlIG1lc3NhZ2UuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0b3BlbiAoKSB7XG5cdFx0dGhpcy5tZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvLW1lc3NhZ2UtLWNsb3NlZCcpO1xuXHRcdHRoaXMubWVzc2FnZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28ubWVzc2FnZU9wZW4nKSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvc2UgdGhlIG1lc3NhZ2UuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0Y2xvc2UgKCkge1xuXHRcdHRoaXMubWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnby1tZXNzYWdlLS1jbG9zZWQnKTtcblx0XHR0aGlzLm1lc3NhZ2VFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLm1lc3NhZ2VDbG9zZWQnKSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBkYXRhIGF0dHJpYnV0ZXMgZnJvbSB0aGUgbWVzc2FnZUVsZW1lbnQuIElmIHRoZSBtZXNzYWdlIGlzIGJlaW5nIHNldCB1cFxuXHQgKiBkZWNsYXJhdGl2ZWx5LCB0aGlzIG1ldGhvZCBpcyB1c2VkIHRvIGV4dHJhY3QgdGhlIGRhdGEgYXR0cmlidXRlcyBmcm9tIHRoZSBET00uXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG1lc3NhZ2VFbGVtZW50IC0gVGhlIG1lc3NhZ2UgZWxlbWVudCBpbiB0aGUgRE9NXG5cdCAqIEByZXR1cm5zIHtPYmplY3R9IC0gQW4gb2JqZWN0IG9mIG9wdGlvbnMgZGVmaW5lZCB2aWEgZGF0YSBhdHRyaWJ1dGVzIG9uIHRoZSBtZXNzYWdlIGVsZW1lbnRcblx0ICovXG5cdHN0YXRpYyBnZXREYXRhQXR0cmlidXRlcyAobWVzc2FnZUVsZW1lbnQpIHtcblx0XHRpZiAoIShtZXNzYWdlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmtleXMobWVzc2FnZUVsZW1lbnQuZGF0YXNldCkucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcblxuXHRcdFx0Ly8gSWdub3JlIGRhdGEtby1jb21wb25lbnRcblx0XHRcdGlmIChrZXkgPT09ICdvQ29tcG9uZW50Jykge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnVpbGQgYSBjb25jaXNlIGtleSBhbmQgZ2V0IHRoZSBvcHRpb24gdmFsdWVcblx0XHRcdGNvbnN0IHNob3J0S2V5ID0ga2V5LnJlcGxhY2UoL15vTWVzc2FnZShcXHcpKFxcdyspJC8sIChtLCBtMSwgbTIpID0+IG0xLnRvTG93ZXJDYXNlKCkgKyBtMik7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IG1lc3NhZ2VFbGVtZW50LmRhdGFzZXRba2V5XTtcblxuXHRcdFx0Ly8gVHJ5IHBhcnNpbmcgdGhlIHZhbHVlIGFzIEpTT04sIG90aGVyd2lzZSBqdXN0IHNldCBpdCBhcyBhIHN0cmluZ1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0b3B0aW9uc1tzaG9ydEtleV0gPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9LCB7fSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSBtZXNzYWdlIGNvbXBvbmVudC5cblx0ICogQHBhcmFtIHsoSFRNTEVsZW1lbnR8U3RyaW5nKX0gcm9vdEVsZW1lbnQgLSBUaGUgcm9vdCBlbGVtZW50IHRvIGludGlhbGlzZSBhIG1lc3NhZ2UgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEB0eXBlZGVmIHtPYmplY3R9IE1lc3NhZ2VPcHRpb25zIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBtZXNzYWdlc1xuXHQgKiBAcmV0dXJucyB7TWVzc2FnZXxNZXNzYWdlW119IFRoZSBuZXdseSBjb25zdHJ1Y3RlZCBtZXNzYWdlIGNvbXBvbmVudHNcblx0ICovXG5cdHN0YXRpYyBpbml0IChyb290RWwsIG9wdHMpIHtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHRpZiAoIShyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRpZiAocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgcm9vdEVsLm1hdGNoZXMoJ1tkYXRhLW8tY29tcG9uZW50PW8tbWVzc2FnZV0nKSkge1xuXHRcdFx0cmV0dXJuIG5ldyBNZXNzYWdlKHJvb3RFbCwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1tZXNzYWdlXCJdJyksIHJvb3RFbCA9PiBuZXcgTWVzc2FnZShyb290RWwsIG9wdHMpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlO1xuIiwiXG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuL3NyYy9qcy9tZXNzYWdlLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gKCkgPT4ge1xuXHRNZXNzYWdlLmluaXQoKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2U7XG4iLCJpbXBvcnQgJy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLkRPTUNvbnRlbnRMb2FkZWQnKSk7XG59KTtcbiJdfQ==