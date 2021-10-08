function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/template.js
  var template_default = function template_default(options) {
    var noticeEl = document.createElement("div");
    noticeEl.classList.add("n-notification__item");

    if (options.modifier) {
      noticeEl.classList.add("n-notification--".concat(options.modifier));
    }

    noticeEl.setAttribute("data-trackable", options.trackable);
    var contentWrapperEl = document.createElement("div");
    contentWrapperEl.className = "n-notification__content-wrapper";

    if (options.title) {
      var titleEl = document.createElement("h3");
      titleEl.className = "n-notification__title";
      titleEl.innerHTML = options.title;
      contentWrapperEl.appendChild(titleEl);
    }

    if (options.content) {
      var contentEl = document.createElement("span");
      contentEl.className = "n-notification__content";
      contentEl.innerHTML = options.content;
      contentEl.setAttribute("role", "alert");
      contentWrapperEl.appendChild(contentEl);
    }

    var buttonEl = document.createElement("button");
    buttonEl.className = "n-notification__close";
    buttonEl.setAttribute("data-trackable", "close");
    buttonEl.innerHTML = "Close";
    noticeEl.appendChild(contentWrapperEl);
    noticeEl.appendChild(buttonEl);
    return noticeEl;
  }; // src/js/toast.js


  var supportedTypes = ["error", "success"];

  var isVisible = function isVisible(element) {
    return !!element.offsetHeight;
  };

  var focusTrap = function focusTrap(event) {
    var tabKeyCode = 9;
    var toastFocusableElements = [].slice.call(this.rootEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (element) {
      return isVisible(element) && !element.disabled;
    });

    if (toastFocusableElements.length && event.keyCode === tabKeyCode) {
      var lastElement = toastFocusableElements[toastFocusableElements.length - 1];

      if (event.target === lastElement) {
        toastFocusableElements[0].focus();
        event.preventDefault();
      } else if (event.shiftKey && event.target === toastFocusableElements[0]) {
        lastElement.focus();
        event.preventDefault();
      }
    }
  };

  var Toast = /*#__PURE__*/function () {
    "use strict";

    function Toast(options, clearToast2) {
      _classCallCheck(this, Toast);

      this.clearToast = clearToast2;
      options.trackable = options.trackable || "notification-".concat(options.type);

      if (options.type && supportedTypes.includes(options.type)) {
        options.modifier = options.type;
      }

      options.returnFocusSelector = options.returnFocusSelector instanceof Element ? options.returnFocusSelector : document.querySelector(options.returnFocusSelector);
      this.options = options;
      this.rootEl = document.createElement("div");
      this.rootEl.appendChild(template_default(options));
      this.rootEl.querySelector("button").onclick = this.hide.bind(this);

      if (options.duration !== 0) {
        this.timeout = setTimeout(this.hide.bind(this), options.duration);
      }

      this.optionsContent = options.content;
      document.addEventListener("keydown", focusTrap.bind(this));
      return this;
    }

    _createClass(Toast, [{
      key: "hide",
      value: function hide() {
        clearTimeout(this.timeout);
        this.clearToast(this);
        Toast.dispatchNotificationCloseEvent();
        document.removeEventListener("keydown", focusTrap);

        if (this.options.returnFocusSelector) {
          this.options.returnFocusSelector.focus();
        }
      }
    }], [{
      key: "dispatchNotificationCloseEvent",
      value: function dispatchNotificationCloseEvent() {
        document.dispatchEvent(new CustomEvent("nNotification.close"));
      }
    }]);

    return Toast;
  }();

  var toast_default = Toast; // src/js/n-notification.js

  var defaults = {
    duration: 5e3
  };
  var stack = [];

  var eventShow = function eventShow(e) {
    return show(e.detail);
  };

  var isInstantiated = false;
  var container;

  function init() {
    if (isInstantiated) {
      return;
    }

    container = document.createElement("div");
    container.className = "n-notification";
    document.body.appendChild(container);
    document.addEventListener("nNotification.show", eventShow, false);
    isInstantiated = true;
  }

  function show(options) {
    options = Object.assign({}, defaults, options);

    if (!isInstantiated) {
      init();
    }

    if (stack.length > 0 && stack[stack.length - 1].optionsContent === options.content) {
      var lastToast = stack[stack.length - 1];
      clearTimeout(lastToast.timeout);
      lastToast.timeout = setTimeout(lastToast.hide.bind(lastToast), options.duration);
    } else {
      var toast = new toast_default(options, clearToast.bind(this));
      var firstChild = container.firstChild;
      container.insertBefore(toast.rootEl, firstChild);
      stack.push(toast);
    }

    if (options.focusSelector) {
      var focusEl = options.focusSelector instanceof Element ? options.focusSelector : document.querySelector(options.focusSelector);

      if (focusEl) {
        focusEl.focus();
      }
    }
  }

  function clearToast(toast) {
    container.removeChild(toast.rootEl);
    var index = stack.indexOf(toast);

    if (index > -1) {
      stack.splice(index, 1);
    }
  }

  function destroy() {
    stack.forEach(function (item) {
      return item.hide();
    });
    stack.length = 0;
    container.parentNode.removeChild(container);
    document.removeEventListener("nNotification.show", eventShow, false);
    isInstantiated = false;
  }

  var n_notification_default = {
    init: init,
    show: show,
    destroy: destroy
  }; // main.js

  var constructAll = function constructAll() {
    n_notification_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = n_notification_default; // demos/src/main.js

  var demoEvent = document.querySelector(".demo-notification--event");
  var demoMethod = document.querySelector(".demo-notification--method");
  var demoError = document.querySelector(".demo-notification--error");
  var demoSuccess = document.querySelector(".demo-notification--success");
  var demoKeep = document.querySelector(".demo-notification--keep");

  if (demoEvent) {
    demoEvent.addEventListener("click", function () {
      main_default.init();
      var event = new CustomEvent("nNotification.show", {
        detail: {
          title: "Title",
          content: "Notification generated via Custom Event"
        }
      });
      document.dispatchEvent(event);
    });
  }

  if (demoMethod) {
    demoMethod.addEventListener("click", function () {
      main_default.show({
        title: "Title",
        content: "Notification generated via nNotification.show method duration set at 5s (timeout default)"
      });
    });
  }

  if (demoError) {
    demoError.addEventListener("click", function () {
      main_default.show({
        title: "Error",
        content: "This Notification is styled as an error, duration set at 4s",
        type: "error",
        duration: 4e3
      });
    });
  }

  if (demoSuccess) {
    demoSuccess.addEventListener("click", function () {
      main_default.show({
        title: "Success",
        content: "This Notification is styled as a success, duration set at 3s",
        type: "success",
        duration: 3e3
      });
    });
  }

  if (demoKeep) {
    demoKeep.addEventListener("click", function () {
      main_default.show({
        title: "Explicit dismissal",
        content: "Notification generated via nNotification.show keep, duration 0 requires explicit dismissal",
        duration: 0
      });
    });
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy90ZW1wbGF0ZS5qcyIsInNyYy9qcy90b2FzdC5qcyIsInNyYy9qcy9uLW5vdGlmaWNhdGlvbi5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU8sZ0JBQUEsR0FBUSxTQUFSLGdCQUFRLENBQUMsT0FBRCxFQUFhO0FBRTNCLFFBQU0sUUFBQSxHQUFXLFFBQUEsQ0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBRUEsSUFBQSxRQUFBLENBQVMsU0FBVCxDQUFtQixHQUFuQixDQUF1QixzQkFBdkI7O0FBRUEsUUFBSSxPQUFBLENBQVEsUUFBWixFQUFzQjtBQUNyQixNQUFBLFFBQUEsQ0FBUyxTQUFULENBQW1CLEdBQW5CLDJCQUEwQyxPQUFBLENBQVEsUUFBbEQ7QUFBa0Q7O0FBR25ELElBQUEsUUFBQSxDQUFTLFlBQVQsQ0FBc0IsZ0JBQXRCLEVBQXdDLE9BQUEsQ0FBUSxTQUFoRDtBQUVBLFFBQU0sZ0JBQUEsR0FBbUIsUUFBQSxDQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBekI7QUFDQSxJQUFBLGdCQUFBLENBQWlCLFNBQWpCLEdBQTZCLGlDQUE3Qjs7QUFFQSxRQUFJLE9BQUEsQ0FBUSxLQUFaLEVBQW1CO0FBQ2xCLFVBQU0sT0FBQSxHQUFVLFFBQUEsQ0FBUyxhQUFULENBQXVCLElBQXZCLENBQWhCO0FBQ0EsTUFBQSxPQUFBLENBQVEsU0FBUixHQUFvQix1QkFBcEI7QUFDQSxNQUFBLE9BQUEsQ0FBUSxTQUFSLEdBQW9CLE9BQUEsQ0FBUSxLQUE1QjtBQUNBLE1BQUEsZ0JBQUEsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBN0I7QUFBNkI7O0FBRzlCLFFBQUksT0FBQSxDQUFRLE9BQVosRUFBcUI7QUFDcEIsVUFBTSxTQUFBLEdBQVksUUFBQSxDQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBbEI7QUFDQSxNQUFBLFNBQUEsQ0FBVSxTQUFWLEdBQXNCLHlCQUF0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dCBub3RpY2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdG5vdGljZUVsLmNsYXNzTGlzdC5hZGQoJ24tbm90aWZpY2F0aW9uX19pdGVtJyk7XG5cblx0aWYgKG9wdGlvbnMubW9kaWZpZXIpIHtcblx0XHRub3RpY2VFbC5jbGFzc0xpc3QuYWRkKGBuLW5vdGlmaWNhdGlvbi0tJHtvcHRpb25zLm1vZGlmaWVyfWApO1xuXHR9XG5cblx0bm90aWNlRWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFja2FibGVcIiwgb3B0aW9ucy50cmFja2FibGUpO1xuXG5cdGNvbnN0IGNvbnRlbnRXcmFwcGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29udGVudFdyYXBwZXJFbC5jbGFzc05hbWUgPSBcIm4tbm90aWZpY2F0aW9uX19jb250ZW50LXdyYXBwZXJcIjtcblxuXHRpZiAob3B0aW9ucy50aXRsZSkge1xuXHRcdGNvbnN0IHRpdGxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuXHRcdHRpdGxlRWwuY2xhc3NOYW1lID0gXCJuLW5vdGlmaWNhdGlvbl9fdGl0bGVcIjtcblx0XHR0aXRsZUVsLmlubmVySFRNTCA9IG9wdGlvbnMudGl0bGU7XG5cdFx0Y29udGVudFdyYXBwZXJFbC5hcHBlbmRDaGlsZCh0aXRsZUVsKTtcblx0fVxuXG5cdGlmIChvcHRpb25zLmNvbnRlbnQpIHtcblx0XHRjb25zdCBjb250ZW50RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0Y29udGVudEVsLmNsYXNzTmFtZSA9IFwibi1ub3RpZmljYXRpb25fX2NvbnRlbnRcIjtcblx0XHRjb250ZW50RWwuaW5uZXJIVE1MID0gb3B0aW9ucy5jb250ZW50O1xuXHRcdGNvbnRlbnRFbC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYWxlcnRcIik7XG5cdFx0Y29udGVudFdyYXBwZXJFbC5hcHBlbmRDaGlsZChjb250ZW50RWwpO1xuXHR9XG5cblx0Y29uc3QgYnV0dG9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0YnV0dG9uRWwuY2xhc3NOYW1lID0gXCJuLW5vdGlmaWNhdGlvbl9fY2xvc2VcIjtcblx0YnV0dG9uRWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFja2FibGVcIiwgXCJjbG9zZVwiKTtcblx0YnV0dG9uRWwuaW5uZXJIVE1MID0gXCJDbG9zZVwiO1xuXG5cdG5vdGljZUVsLmFwcGVuZENoaWxkKGNvbnRlbnRXcmFwcGVyRWwpO1xuXHRub3RpY2VFbC5hcHBlbmRDaGlsZChidXR0b25FbCk7XG5cblx0cmV0dXJuIG5vdGljZUVsO1xufTtcbiIsImltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcblxuY29uc3Qgc3VwcG9ydGVkVHlwZXMgPSBbJ2Vycm9yJywgJ3N1Y2Nlc3MnXTtcblxuY29uc3QgaXNWaXNpYmxlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0cmV0dXJuICEhZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG59O1xuXG4vLyBGb2N1cyB0cmFwIGlzIGFuIGFjY2Vzc2liaWxpdHkgdGVjaG5pcXVlIHRvIGtlZXAgdXNlcnMnIGZvY3VzIHdpdGhpbiB0aGUgdG9hc3Qgd2luZG93XG5jb25zdCBmb2N1c1RyYXAgPSBmdW5jdGlvbihldmVudCkge1xuXHRjb25zdCB0YWJLZXlDb2RlID0gOTtcblx0Y29uc3QgdG9hc3RGb2N1c2FibGVFbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoXG5cdFx0dGhpcy5yb290RWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLCBbaHJlZl0sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknKVxuXHQpLmZpbHRlcihlbGVtZW50ID0+IGlzVmlzaWJsZShlbGVtZW50KSAmJiAhZWxlbWVudC5kaXNhYmxlZCk7XG5cblx0aWYgKHRvYXN0Rm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoICYmIGV2ZW50LmtleUNvZGUgPT09IHRhYktleUNvZGUpIHtcblx0XHRjb25zdCBsYXN0RWxlbWVudCA9IHRvYXN0Rm9jdXNhYmxlRWxlbWVudHNbdG9hc3RGb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcblx0XHQvLyBMb29wIGZvY3VzIGJhY2sgdG8gdGhlIGZpcnN0IGVsZW1lbnQgaWYgZm9jdXMgaGFzIHJlYWNoZWQgdGhlIGZvY3VzYWJsZSBlbGVtZW50XG5cdFx0aWYgKGV2ZW50LnRhcmdldCA9PT0gbGFzdEVsZW1lbnQpIHtcblx0XHRcdHRvYXN0Rm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSBlbHNlIGlmIChldmVudC5zaGlmdEtleSAmJiBldmVudC50YXJnZXQgPT09IHRvYXN0Rm9jdXNhYmxlRWxlbWVudHNbMF0pIHsgLy8gbG9vcCB0byB0aGUgYm90dG9tIHdoZW4gc2hpZnQrdGFiYmluZy5cblx0XHRcdGxhc3RFbGVtZW50LmZvY3VzKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxufTtcblxuY2xhc3MgVG9hc3Qge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zLCBjbGVhclRvYXN0KSB7XG5cdFx0dGhpcy5jbGVhclRvYXN0ID0gY2xlYXJUb2FzdDtcblxuXHRcdG9wdGlvbnMudHJhY2thYmxlID0gb3B0aW9ucy50cmFja2FibGUgfHwgYG5vdGlmaWNhdGlvbi0ke29wdGlvbnMudHlwZX1gO1xuXG5cdFx0aWYgKG9wdGlvbnMudHlwZSAmJiBzdXBwb3J0ZWRUeXBlcy5pbmNsdWRlcyhvcHRpb25zLnR5cGUpKSB7XG5cdFx0XHRvcHRpb25zLm1vZGlmaWVyID0gb3B0aW9ucy50eXBlO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMucmV0dXJuRm9jdXNTZWxlY3RvciA9XG5cdFx0XHRvcHRpb25zLnJldHVybkZvY3VzU2VsZWN0b3IgaW5zdGFuY2VvZiBFbGVtZW50XG5cdFx0XHRcdD8gb3B0aW9ucy5yZXR1cm5Gb2N1c1NlbGVjdG9yXG5cdFx0XHRcdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnJldHVybkZvY3VzU2VsZWN0b3IpO1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHR0aGlzLnJvb3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRoaXMucm9vdEVsLmFwcGVuZENoaWxkKHRlbXBsYXRlKG9wdGlvbnMpKTtcblx0XHR0aGlzLnJvb3RFbC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5vbmNsaWNrID0gdGhpcy5oaWRlLmJpbmQodGhpcyk7XG5cblx0XHRpZiAob3B0aW9ucy5kdXJhdGlvbiAhPT0gMCkge1xuXHRcdFx0dGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLmhpZGUuYmluZCh0aGlzKSwgb3B0aW9ucy5kdXJhdGlvbik7XG5cdFx0fVxuXG5cdFx0dGhpcy5vcHRpb25zQ29udGVudCA9IG9wdGlvbnMuY29udGVudDtcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmb2N1c1RyYXAuYmluZCh0aGlzKSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHN0YXRpYyBkaXNwYXRjaE5vdGlmaWNhdGlvbkNsb3NlRXZlbnQoKSB7XG5cdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ25Ob3RpZmljYXRpb24uY2xvc2UnKSk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHRcdHRoaXMuY2xlYXJUb2FzdCh0aGlzKTtcblx0XHRUb2FzdC5kaXNwYXRjaE5vdGlmaWNhdGlvbkNsb3NlRXZlbnQoKTtcblxuXHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmb2N1c1RyYXApO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5yZXR1cm5Gb2N1c1NlbGVjdG9yKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMucmV0dXJuRm9jdXNTZWxlY3Rvci5mb2N1cygpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2FzdDtcbiIsImltcG9ydCBUb2FzdCBmcm9tICcuL3RvYXN0JztcblxuY29uc3QgZGVmYXVsdHMgPSB7IGR1cmF0aW9uOiA1MDAwIH07XG5jb25zdCBzdGFjayA9IFtdO1xuXG5jb25zdCBldmVudFNob3cgPSBlID0+IHNob3coZS5kZXRhaWwpO1xubGV0IGlzSW5zdGFudGlhdGVkID0gZmFsc2U7XG5sZXQgY29udGFpbmVyO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuXHRpZiAoaXNJbnN0YW50aWF0ZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29udGFpbmVyLmNsYXNzTmFtZSA9ICduLW5vdGlmaWNhdGlvbic7XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbk5vdGlmaWNhdGlvbi5zaG93JywgZXZlbnRTaG93LCBmYWxzZSk7XG5cdGlzSW5zdGFudGlhdGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2hvdyhvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cblx0aWYgKCFpc0luc3RhbnRpYXRlZCkge1xuXHRcdGluaXQoKTtcblx0fVxuXHRpZiAoXG5cdFx0c3RhY2subGVuZ3RoID4gMCAmJlxuXHRcdHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLm9wdGlvbnNDb250ZW50ID09PSBvcHRpb25zLmNvbnRlbnRcblx0KSB7XG5cdFx0bGV0IGxhc3RUb2FzdCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuXHRcdGNsZWFyVGltZW91dChsYXN0VG9hc3QudGltZW91dCk7XG5cdFx0bGFzdFRvYXN0LnRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuXHRcdFx0bGFzdFRvYXN0LmhpZGUuYmluZChsYXN0VG9hc3QpLFxuXHRcdFx0b3B0aW9ucy5kdXJhdGlvblxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgdG9hc3QgPSBuZXcgVG9hc3Qob3B0aW9ucywgY2xlYXJUb2FzdC5iaW5kKHRoaXMpKTtcblx0XHRjb25zdCBmaXJzdENoaWxkID0gY29udGFpbmVyLmZpcnN0Q2hpbGQ7XG5cdFx0Y29udGFpbmVyLmluc2VydEJlZm9yZSh0b2FzdC5yb290RWwsIGZpcnN0Q2hpbGQpO1xuXHRcdHN0YWNrLnB1c2godG9hc3QpO1xuXHR9XG5cblx0aWYgKG9wdGlvbnMuZm9jdXNTZWxlY3Rvcikge1xuXHRcdGNvbnN0IGZvY3VzRWwgPVxuXHRcdFx0b3B0aW9ucy5mb2N1c1NlbGVjdG9yIGluc3RhbmNlb2YgRWxlbWVudFxuXHRcdFx0XHQ/IG9wdGlvbnMuZm9jdXNTZWxlY3RvclxuXHRcdFx0XHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5mb2N1c1NlbGVjdG9yKTtcblx0XHRpZiAoZm9jdXNFbCkge1xuXHRcdFx0Zm9jdXNFbC5mb2N1cygpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBjbGVhclRvYXN0KHRvYXN0KSB7XG5cdGNvbnRhaW5lci5yZW1vdmVDaGlsZCh0b2FzdC5yb290RWwpO1xuXHRjb25zdCBpbmRleCA9IHN0YWNrLmluZGV4T2YodG9hc3QpO1xuXHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdHN0YWNrLnNwbGljZShpbmRleCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0c3RhY2suZm9yRWFjaChpdGVtID0+IGl0ZW0uaGlkZSgpKTtcblx0c3RhY2subGVuZ3RoID0gMDtcblx0Y29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcblx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbk5vdGlmaWNhdGlvbi5zaG93JywgZXZlbnRTaG93LCBmYWxzZSk7XG5cdGlzSW5zdGFudGlhdGVkID0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0aW5pdCxcblx0c2hvdyxcblx0ZGVzdHJveVxufTtcbiIsImltcG9ydCBuTm90aWZpY2F0aW9uIGZyb20gJy4vc3JjL2pzL24tbm90aWZpY2F0aW9uJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24oKSB7XG5cdG5Ob3RpZmljYXRpb24uaW5pdCgpO1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignby5ET01Db250ZW50TG9hZGVkJywgY29uc3RydWN0QWxsKTtcblxuZXhwb3J0IGRlZmF1bHQgbk5vdGlmaWNhdGlvbjtcbiIsImltcG9ydCBuTm90aWZpY2F0aW9uIGZyb20gJy4uLy4uL21haW4nO1xuY29uc3QgZGVtb0V2ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbW8tbm90aWZpY2F0aW9uLS1ldmVudCcpO1xuY29uc3QgZGVtb01ldGhvZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLW5vdGlmaWNhdGlvbi0tbWV0aG9kJyk7XG5jb25zdCBkZW1vRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVtby1ub3RpZmljYXRpb24tLWVycm9yJyk7XG5jb25zdCBkZW1vU3VjY2VzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZW1vLW5vdGlmaWNhdGlvbi0tc3VjY2VzcycpO1xuY29uc3QgZGVtb0tlZXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVtby1ub3RpZmljYXRpb24tLWtlZXAnKTtcblxuaWYgKGRlbW9FdmVudCkge1xuXHRkZW1vRXZlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRuTm90aWZpY2F0aW9uLmluaXQoKTtcblx0XHRjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnbk5vdGlmaWNhdGlvbi5zaG93Jywge1xuXHRcdFx0ZGV0YWlsOiB7XG5cdFx0XHRcdHRpdGxlOiAnVGl0bGUnLFxuXHRcdFx0XHRjb250ZW50OiAnTm90aWZpY2F0aW9uIGdlbmVyYXRlZCB2aWEgQ3VzdG9tIEV2ZW50J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHR9KTtcbn1cblxuaWYgKGRlbW9NZXRob2QpIHtcblx0ZGVtb01ldGhvZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdG5Ob3RpZmljYXRpb24uc2hvdyh7XG5cdFx0XHR0aXRsZTogJ1RpdGxlJyxcblx0XHRcdGNvbnRlbnQ6ICdOb3RpZmljYXRpb24gZ2VuZXJhdGVkIHZpYSBuTm90aWZpY2F0aW9uLnNob3cgbWV0aG9kIGR1cmF0aW9uIHNldCBhdCA1cyAodGltZW91dCBkZWZhdWx0KSdcblx0XHR9KTtcblx0fSk7XG59XG5cbmlmIChkZW1vRXJyb3IpIHtcblx0ZGVtb0Vycm9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0bk5vdGlmaWNhdGlvbi5zaG93KHtcblx0XHRcdHRpdGxlOiAnRXJyb3InLFxuXHRcdFx0Y29udGVudDogJ1RoaXMgTm90aWZpY2F0aW9uIGlzIHN0eWxlZCBhcyBhbiBlcnJvciwgZHVyYXRpb24gc2V0IGF0IDRzJyxcblx0XHRcdHR5cGU6ICdlcnJvcicsXG5cdFx0XHRkdXJhdGlvbjogNDAwMFxuXHRcdH0pO1xuXHR9KTtcbn1cblxuaWYgKGRlbW9TdWNjZXNzKSB7XG5cdGRlbW9TdWNjZXNzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0bk5vdGlmaWNhdGlvbi5zaG93KHtcblx0XHRcdHRpdGxlOiAnU3VjY2VzcycsXG5cdFx0XHRjb250ZW50OiAnVGhpcyBOb3RpZmljYXRpb24gaXMgc3R5bGVkIGFzIGEgc3VjY2VzcywgZHVyYXRpb24gc2V0IGF0IDNzJyxcblx0XHRcdHR5cGU6ICdzdWNjZXNzJyxcblx0XHRcdGR1cmF0aW9uOiAzMDAwXG5cdFx0fSk7XG5cdH0pO1xufVxuXG5pZiAoZGVtb0tlZXApIHtcblx0ZGVtb0tlZXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRuTm90aWZpY2F0aW9uLnNob3coe1xuXHRcdFx0dGl0bGU6ICdFeHBsaWNpdCBkaXNtaXNzYWwnLFxuXHRcdFx0Y29udGVudDogJ05vdGlmaWNhdGlvbiBnZW5lcmF0ZWQgdmlhIG5Ob3RpZmljYXRpb24uc2hvdyBrZWVwLCBkdXJhdGlvbiAwIHJlcXVpcmVzIGV4cGxpY2l0IGRpc21pc3NhbCcsXG5cdFx0XHRkdXJhdGlvbjogMFxuXHRcdH0pO1xuXHR9KTtcbn1cbiJdfQ==