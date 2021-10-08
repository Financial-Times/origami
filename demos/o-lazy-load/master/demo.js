function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // src/js/o-lazy-load.js
  var defaults = {
    selector: ".o-lazy-load"
  };
  var flag = "data-o-lazy-load";

  function loadContent(element) {
    if (element.nodeName.toLowerCase() === "picture") {
      Array.from(element.children).forEach(loadContent);
    }

    if (element.hasAttribute("data-src")) {
      element.src = element.getAttribute("data-src");
      element.removeAttribute("data-src");
    }

    if (element.hasAttribute("data-srcset")) {
      element.srcset = element.getAttribute("data-srcset");
      element.removeAttribute("data-srcset");
    }

    if (element.hasAttribute("data-toggle-class")) {
      element.classList.toggle(element.getAttribute("data-toggle-class"));
      element.removeAttribute("data-toggle-class");
    }

    element.setAttribute(flag, true);
  }

  function isLoaded(element) {
    return element.hasAttribute(flag);
  }

  function callback(entries, observer) {
    var _this = this;

    var threshold = observer.thresholds[0];
    entries.forEach(function (entry) {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
        var target = entry.target;
        observer.unobserve(target);

        if (!isLoaded(target)) {
          loadContent(target);

          if (typeof _this.options.callback === "function") {
            _this.options.callback(target);
          }
        }
      }
    });
  }

  var LazyLoad = /*#__PURE__*/function () {
    "use strict";

    function LazyLoad(rootEl, opts) {
      _classCallCheck(this, LazyLoad);

      this.rootEl = rootEl;
      this.options = Object.assign({}, defaults, opts, LazyLoad.getDataAttributes(rootEl));

      if (rootEl === document.documentElement || rootEl === document.body) {
        this.options.root = null;
      } else {
        this.options.root = rootEl;
      }

      this.observer = new IntersectionObserver(callback.bind(this), this.options);
      this.observe();
    }

    _createClass(LazyLoad, [{
      key: "observe",
      value: function observe() {
        var _this2 = this;

        var targets = this.rootEl.querySelectorAll(this.options.selector);
        targets.forEach(function (target) {
          if (!isLoaded(target)) {
            _this2.observer.observe(target);
          }
        });
      }
    }], [{
      key: "getDataAttributes",
      value: function getDataAttributes(rootEl) {
        if (!(rootEl instanceof HTMLElement)) {
          return {};
        }

        return Object.keys(rootEl.dataset).reduce(function (options, key) {
          if (key === "oComponent") {
            return options;
          }

          var shortKey = key.replace(/^oLazyLoad(\w)(\w+)$/, function (m, m1, m2) {
            return m1.toLowerCase() + m2;
          });
          var value = rootEl.dataset[key];

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

        if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component="o-lazy-load"]')) {
          return new LazyLoad(rootEl, opts);
        }

        return Array.from(rootEl.querySelectorAll('[data-o-component="o-lazy-load"]'), function (rootEl2) {
          return new LazyLoad(rootEl2, opts);
        });
      }
    }]);

    return LazyLoad;
  }();

  var o_lazy_load_default = LazyLoad; // main.js

  var constructAll = function constructAll() {
    o_lazy_load_default.init();
    document.removeEventListener("o.DOMContentLoaded", constructAll);
  };

  document.addEventListener("o.DOMContentLoaded", constructAll);
  var main_default = o_lazy_load_default; // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    var doc = document.documentElement;

    if (doc.classList.contains("demo-popout") && window.self !== window.top) {
      doc.style.height = "200px";
      doc.style.overflow = "hidden";
      var p = document.createElement("p");
      p.classList.add("demo-popout-message");
      p.textContent = "Please open this demo in a new window";
      document.body.insertBefore(p, document.body.firstElementChild);
      return;
    }

    new main_default(doc);
    document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9qcy9vLWxhenktbG9hZC5qcyIsIm1haW4uanMiLCJkZW1vcy9zcmMvZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sUUFBQSxHQUFXO0FBQ2hCLElBQUEsUUFBQSxFQUFVO0FBRE0sR0FBakI7QUFJQSxNQUFNLElBQUEsR0FBTyxrQkFBYjs7QUFFQSxXQUFBLFdBQUEsQ0FBc0IsT0FBdEIsRUFBK0I7QUFDOUIsUUFBSSxPQUFBLENBQVEsUUFBUixDQUFpQixXQUFqQixPQUFtQyxTQUF2QyxFQUFrRDtBQUdqRCxNQUFBLEtBQUEsQ0FBTSxJQUFOLENBQVcsT0FBQSxDQUFRLFFBQW5CLEVBQTZCLE9BQTdCLENBQXFDLFdBQXJDO0FBQXFDOztBQUd0QyxRQUFJLE9BQUEsQ0FBUSxZQUFSLENBQXFCLFVBQXJCLENBQUosRUFBc0M7QUFDckMsTUFBQSxPQUFBLENBQVEsR0FBUixHQUFjLE9BQUEsQ0FBUSxZQUFSLENBQXFCLFVBQXJCLENBQWQ7QUFDQSxNQUFBLE9BQUEsQ0FBUSxlQUFSLENBQXdCLFVBQXhCO0FBQXdCOztBQUd6QixRQUFJLE9BQUEsQ0FBUSxZQUFSLENBQXFCLGFBQXJCLENBQUosRUFBeUM7QUFDeEMsTUFBQSxPQUFBLENBQVEsTUFBUixHQUFpQixPQUFBLENBQVEsWUFBUixDQUFxQixhQUFyQixDQUFqQjtBQUNBLE1BQUEsT0FBQSxDQUFRLGVBQVIsQ0FBd0IsYUFBeEI7QUFBd0I7O0FBR3pCLFFBQUksT0FBQSxDQUFRLFlBQVIsQ0FBcUIsbUJBQXJCLENBQUosRUFBK0M7QUFDOUMsTUFBQSxPQUFBLENBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixPQUFBLENBQVEsWUFBUixDQUFxQixtQkFBckIsQ0FBekI7QUFDQSxNQUFBLE9BQUEsQ0FBUSxlQUFSLENBQXdCLG1CQUF4QjtBQUF3Qjs7QUFHekIsSUFBQSxPQUFBLENBQVEsWUFBUixDQUFxQixJQUFyQixFQUEyQixJQUEzQjtBQUEyQjs7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RCxZQUFuRDtBQUFtRCxHQUZwRDs7QUFLQSxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixvQkFBMUIsRUFBZ0QsWUFBaEQ7QUFFQSxNQUFPLFlBQUEsR0FBUSxtQkFBZixDOztBQ1BBLEVBQUEsUUFBQSxDQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3pELFFBQU0sR0FBQSxHQUFNLFFBQUEsQ0FBUyxlQUFyQjs7QUFJQSxRQUFJLEdBQUEsQ0FBSSxTQUFKLENBQWMsUUFBZCxDQUF1QixhQUF2QixLQUF5QyxNQUFBLENBQU8sSUFBUCxLQUFnQixNQUFBLENBQU8sR0FBcEUsRUFBeUU7QUFDeEUsTUFBQSxHQUFBLENBQUksS0FBSixDQUFVLE1BQVYsR0FBbUIsT0FBbkI7QUFDQSxNQUFBLEdBQUEsQ0FBSSxLQUFKLENBQVUsUUFBVixHQUFxQixRQUFyQjtBQUVBLFVBQU0sQ0FBQSxHQUFJLFFBQUEsQ0FBUyxhQUFULENBQXVCLEdBQXZCLENBQVY7QUFDQSxNQUFBLENBQUEsQ0FBRSxTQUFGLENBQVksR0FBWixDQUFnQixxQkFBaEI7QUFDQSxNQUFBLENBQUEsQ0FBRSxXQUFGLEdBQWdCLHVDQUFoQjtBQUNBLE1BQUEsUUFBQSxDQUFTLElBQVQsQ0FBYyxZQUFkLENBQTJCLENBQTNCLEVBQThCLFFBQUEsQ0FBUyxJQUFULENBQWMsaUJBQTVDO0FBRUE7QUFBQTs7QUFLRCxRQUFJLFlBQUosQ0FBYSxHQUFiO0FBR0EsSUFBQSxRQUFBLENBQVMsYUFBVCxDQUF1QixJQUFJLFdBQUosQ0FBZ0Isb0JBQWhCLENBQXZCO0FBQXVDLEdBdEJ4QyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRlZmF1bHRzID0ge1xuXHRzZWxlY3RvcjogJy5vLWxhenktbG9hZCdcbn07XG5cbmNvbnN0IGZsYWcgPSAnZGF0YS1vLWxhenktbG9hZCc7XG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50IChlbGVtZW50KSB7XG5cdGlmIChlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdwaWN0dXJlJykge1xuXHRcdC8vIE5PVEU6IGVsZW1lbnQuY2hpbGRyZW4gcmV0dXJucyBhIGxpdmUgSFRNTENvbGxlY3Rpb25cblx0XHQvLyBidXQgZWxlbWVudC5jaGlsZE5vZGVzIGluY2x1ZGVzIG5vbi1lbGVtZW50IGNoaWxkcmVuXG5cdFx0QXJyYXkuZnJvbShlbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGxvYWRDb250ZW50KTtcblx0fVxuXG5cdGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1zcmMnKSkge1xuXHRcdGVsZW1lbnQuc3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XG5cdH1cblxuXHRpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtc3Jjc2V0JykpIHtcblx0XHRlbGVtZW50LnNyY3NldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHRcdGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyY3NldCcpO1xuXHR9XG5cblx0aWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLXRvZ2dsZS1jbGFzcycpKSB7XG5cdFx0ZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZS1jbGFzcycpKTtcblx0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtY2xhc3MnKTtcblx0fVxuXG5cdGVsZW1lbnQuc2V0QXR0cmlidXRlKGZsYWcsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBpc0xvYWRlZCAoZWxlbWVudCkge1xuXHRyZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoZmxhZyk7XG59XG5cbmZ1bmN0aW9uIGNhbGxiYWNrIChlbnRyaWVzLCBvYnNlcnZlcikge1xuXHQvLyBOT1RFOiB3aGVuIGFuIGludGVyc2VjdGlvbiBvYnNlcnZlciBpcyBjcmVhdGVkIHRoaXMgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aFxuXHQvLyBhbGwgaXRlbXMgYmVpbmcgb2JzZXJ2ZWQgc28gdGhlIHRocmVzaG9sZCBtdXN0IGJlIGNoZWNrZWQuXG5cdGNvbnN0IHRocmVzaG9sZCA9IG9ic2VydmVyLnRocmVzaG9sZHNbMF07XG5cblx0ZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuXHRcdGlmIChlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+PSB0aHJlc2hvbGQpIHtcblx0XHRcdGNvbnN0IHRhcmdldCA9IGVudHJ5LnRhcmdldDtcblxuXHRcdFx0b2JzZXJ2ZXIudW5vYnNlcnZlKHRhcmdldCk7XG5cblx0XHRcdGlmICghaXNMb2FkZWQodGFyZ2V0KSkge1xuXHRcdFx0XHRsb2FkQ29udGVudCh0YXJnZXQpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhpcy5vcHRpb25zLmNhbGxiYWNrKHRhcmdldCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5jbGFzcyBMYXp5TG9hZCB7XG5cdC8qKlxuXHQgKiBDbGFzcyBjb25zdHJ1Y3Rvci5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW3Jvb3RFbF0gLSBUaGUgY29tcG9uZW50IGVsZW1lbnQgaW4gdGhlIERPTVxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dIC0gQW4gb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZ3VyaW5nIHRoZSBjb21wb25lbnRcblx0ICovXG5cdGNvbnN0cnVjdG9yIChyb290RWwsIG9wdHMpIHtcblx0XHR0aGlzLnJvb3RFbCA9IHJvb3RFbDtcblx0XHR0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cywgTGF6eUxvYWQuZ2V0RGF0YUF0dHJpYnV0ZXMocm9vdEVsKSk7XG5cblx0XHQvLyBBc3N1bWUgaWYgdGhlIHJvb3RFbCBpcyB0aGUgZG9jdW1lbnQgZWxlbWVudCBvciBib2R5IHRoYXQgdGhlIHVzZXIgaW50ZW5kcyB0b1xuXHRcdC8vIG9ic2VydmUgdGhlIHZpZXdwb3J0LiBUaGUgc3BlYyBjYWxscyB0aGlzIFwidGhlIHRvcC1sZXZlbCBicm93c2luZyBjb250ZXh0XCJcblx0XHQvLyA8aHR0cHM6Ly93d3cudzMub3JnL1RSL2ludGVyc2VjdGlvbi1vYnNlcnZlci8jaW50ZXJzZWN0aW9ub2JzZXJ2ZXItaW1wbGljaXQtcm9vdD5cblx0XHRpZiAocm9vdEVsID09PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHwgcm9vdEVsID09PSBkb2N1bWVudC5ib2R5KSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMucm9vdCA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3B0aW9ucy5yb290ID0gcm9vdEVsO1xuXHRcdH1cblxuXHRcdHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoY2FsbGJhY2suYmluZCh0aGlzKSwgdGhpcy5vcHRpb25zKTtcblx0XHR0aGlzLm9ic2VydmUoKTtcblx0fVxuXG5cdG9ic2VydmUgKCkge1xuXHRcdGNvbnN0IHRhcmdldHMgPSB0aGlzLnJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3Rvcik7XG5cblx0XHR0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuXHRcdFx0aWYgKCFpc0xvYWRlZCh0YXJnZXQpKSB7XG5cdFx0XHRcdHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlICR7bmFtZS50aXRsZUNhc2V9RWxlbWVudC4gSWYgdGhlIG1lc3NhZ2UgaXMgYmVpbmcgc2V0IHVwXG5cdCAqIGRlY2xhcmF0aXZlbHksIHRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZXh0cmFjdCB0aGUgZGF0YSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTS5cblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdEVsIC0gVGhlIGNvbXBvbmVudCBlbGVtZW50IGluIHRoZSBET01cblx0ICovXG5cdHN0YXRpYyBnZXREYXRhQXR0cmlidXRlcyAocm9vdEVsKSB7XG5cdFx0aWYgKCEocm9vdEVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHJvb3RFbC5kYXRhc2V0KS5yZWR1Y2UoKG9wdGlvbnMsIGtleSkgPT4ge1xuXHRcdFx0Ly8gSWdub3JlIGRhdGEtby1jb21wb25lbnRcblx0XHRcdGlmIChrZXkgPT09ICdvQ29tcG9uZW50Jykge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnVpbGQgYSBjb25jaXNlIGtleSBhbmQgZ2V0IHRoZSBvcHRpb24gdmFsdWVcblx0XHRcdGNvbnN0IHNob3J0S2V5ID0ga2V5LnJlcGxhY2UoL15vTGF6eUxvYWQoXFx3KShcXHcrKSQvLCAobSwgbTEsIG0yKSA9PiBtMS50b0xvd2VyQ2FzZSgpICsgbTIpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSByb290RWwuZGF0YXNldFtrZXldO1xuXG5cdFx0XHQvLyBUcnkgcGFyc2luZyB0aGUgdmFsdWUgYXMgSlNPTiwgb3RoZXJ3aXNlIGp1c3Qgc2V0IGl0IGFzIGEgc3RyaW5nXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRvcHRpb25zW3Nob3J0S2V5XSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdG9wdGlvbnNbc2hvcnRLZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9LCB7fSk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGlzZSBjb21wb25lbnQuXG5cdCAqIEBwYXJhbSB7KEhUTUxFbGVtZW50fFN0cmluZyl9IHJvb3RFbCAtIFRoZSByb290IGVsZW1lbnQgdG8gaW50aWFsaXNlIHRoZSBjb21wb25lbnQgaW4sIG9yIGEgQ1NTIHNlbGVjdG9yIGZvciB0aGUgcm9vdCBlbGVtZW50XG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBBbiBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlndXJpbmcgdGhlIGNvbXBvbmVudFxuXHQgKi9cblx0c3RhdGljIGluaXQgKHJvb3RFbCwgb3B0cykge1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblxuXHRcdGlmICghKHJvb3RFbCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpO1xuXHRcdH1cblxuXHRcdGlmIChyb290RWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiByb290RWwubWF0Y2hlcygnW2RhdGEtby1jb21wb25lbnQ9XCJvLWxhenktbG9hZFwiXScpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IExhenlMb2FkKHJvb3RFbCwgb3B0cyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEFycmF5LmZyb20ocm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1sYXp5LWxvYWRcIl0nKSwgKHJvb3RFbCkgPT4gbmV3IExhenlMb2FkKHJvb3RFbCwgb3B0cykpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlMb2FkO1xuIiwiaW1wb3J0IExhenlMb2FkIGZyb20gJy4vc3JjL2pzL28tbGF6eS1sb2FkLmpzJztcblxuY29uc3QgY29uc3RydWN0QWxsID0gZnVuY3Rpb24gKCkge1xuXHRMYXp5TG9hZC5pbml0KCk7XG5cdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ28uRE9NQ29udGVudExvYWRlZCcsIGNvbnN0cnVjdEFsbCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdvLkRPTUNvbnRlbnRMb2FkZWQnLCBjb25zdHJ1Y3RBbGwpO1xuXG5leHBvcnQgZGVmYXVsdCBMYXp5TG9hZDtcbiIsImltcG9ydCBMYXp5TG9hZCBmcm9tICcuLy4uLy4uL21haW4uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuXHRjb25zdCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0Ly8gVmlld3BvcnQgYmFzZWQgZGVtb3MgY2Fubm90IGJlIHZpZXdlZCBpbnNpZGUgdGhlIHJlZ2lzdHJ5IGlmcmFtZXMgYmVjYXVzZVxuXHQvLyB0aGV5IHdpbGwgYXR0ZW1wdCB0byBmaXQgdGhlIGNvbnRlbnQgaGVpZ2h0ICh3aGljaCB3ZSBoYXZlbid0IGxvYWRlZCB5ZXQhKVxuXHRpZiAoZG9jLmNsYXNzTGlzdC5jb250YWlucygnZGVtby1wb3BvdXQnKSAmJiB3aW5kb3cuc2VsZiAhPT0gd2luZG93LnRvcCkge1xuXHRcdGRvYy5zdHlsZS5oZWlnaHQgPSAnMjAwcHgnO1xuXHRcdGRvYy5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG5cdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRwLmNsYXNzTGlzdC5hZGQoJ2RlbW8tcG9wb3V0LW1lc3NhZ2UnKTtcblx0XHRwLnRleHRDb250ZW50ID0gJ1BsZWFzZSBvcGVuIHRoaXMgZGVtbyBpbiBhIG5ldyB3aW5kb3cnO1xuXHRcdGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHAsIGRvY3VtZW50LmJvZHkuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gVmlld3BvcnQgYmFzZWQgZGVtb3MgY2Fubm90IGJlIHNldHVwIGRlY2xhcmF0aXZlbHkgYmVjYXVzZSB0aGUgZG9jdW1lbnRcblx0Ly8gZWxlbWVudCBhbmQgYm9keSBlbGVtZW50IGNhbm5vdCBjdXJyZW50bHkgYmUgY29uZmlndXJlZC5cblx0bmV3IExhenlMb2FkKGRvYyk7XG5cblx0Ly8gVHJpZ2dlciBpbml0aWFsaXNhdGlvbiBvZiBkZW1vcyB3aXRoIGRlY2xhcmF0aXZlIGNvbmZpZ3VyYXRpb25cblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ28uRE9NQ29udGVudExvYWRlZCcpKTtcbn0pO1xuIl19