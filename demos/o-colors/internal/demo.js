function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  // demos/src/demo.js
  var clickToCopy = false;

  function oColorsDemoPalette() {
    var swatches = document.querySelectorAll(".swatch");

    var _iterator = _createForOfIteratorHelper(swatches),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var swatch = _step.value;
        var oColor = swatch.getAttribute("data-o-color");
        var hexInput = swatch.querySelector(".hex");
        var hex = window.getComputedStyle(document.body, null).getPropertyValue("--o-colors-".concat(oColor));
        hexInput.value = hex ? hex.trim() : "";

        if (clickToCopy) {
          swatch.addEventListener("click", oColorsCopy, false);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  function oColorsCopy(event) {
    var input = event.target.querySelector(".hex");
    var parent = event.target;

    if (input === null && event.target.localName === "input") {
      input = event.target.parentNode.querySelector(".hex");
      parent = event.target.parentNode;
    }

    if (input && input.select) {
      input.focus();
      input.select();

      try {
        document.execCommand("copy");
        input.blur();
        parent.classList.add("copied");
        setTimeout(function () {
          parent.classList.remove("copied");
        }, 2e3);
      } catch (err) {
        console.log("Can not copy text. ", err);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var randomInput = document.querySelectorAll("input")[0];

    if (randomInput.select && document.execCommand) {
      document.body.classList.add("o-copy-true");
      clickToCopy = true;
    }

    oColorsDemoPalette();
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBSSxXQUFBLEdBQWMsS0FBbEI7O0FBRUEsV0FBQSxrQkFBQSxHQUE4QjtBQUM3QixRQUFNLFFBQUEsR0FBVyxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBakI7O0FBRDZCLCtDQUdSLFFBSFE7QUFBQTs7QUFBQTtBQUc3QiwwREFBK0I7QUFBQSxZQUFwQixNQUFvQjtBQUM5QixZQUFNLE1BQUEsR0FBUyxNQUFBLENBQU8sWUFBUCxDQUFvQixjQUFwQixDQUFmO0FBQ0EsWUFBTSxRQUFBLEdBQVcsTUFBQSxDQUFPLGFBQVAsQ0FBcUIsTUFBckIsQ0FBakI7QUFDQSxZQUFNLEdBQUEsR0FBTSxNQUFBLENBQU8sZ0JBQVAsQ0FBd0IsUUFBQSxDQUFTLElBQWpDLEVBQXVDLElBQXZDLEVBQTZDLGdCQUE3QyxzQkFBNEUsTUFBNUUsRUFBWjtBQUNBLFFBQUEsUUFBQSxDQUFTLEtBQVQsR0FBaUIsR0FBQSxHQUFNLEdBQUEsQ0FBSSxJQUFKLEVBQU4sR0FBbUIsRUFBcEM7O0FBRUEsWUFBSSxXQUFKLEVBQWlCO0FBQ2hCLFVBQUEsTUFBQSxDQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFdBQWpDLEVBQThDLEtBQTlDO0FBQThDO0FBQUE7QUFWbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVtQjs7QUFLakQsV0FBQSxXQUFBLENBQXFCLEtBQXJCLEVBQTRCO0FBRTNCLFFBQUksS0FBQSxHQUFRLEtBQUEsQ0FBTSxNQUFOLENBQWEsYUFBYixDQUEyQixNQUEzQixDQUFaO0FBQ0EsUUFBSSxNQUFBLEdBQVMsS0FBQSxDQUFNLE1BQW5COztBQUNBLFFBQUksS0FBQSxLQUFVLElBQVYsSUFBa0IsS0FBQSxDQUFNLE1BQU4sQ0FBYSxTQUFiLEtBQTJCLE9BQWpELEVBQTBEO0FBQ3pELE1BQUEsS0FBQSxHQUFRLEtBQUEsQ0FBTSxNQUFOLENBQWEsVUFBYixDQUF3QixhQUF4QixDQUFzQyxNQUF0QyxDQUFSO0FBQ0EsTUFBQSxNQUFBLEdBQVMsS0FBQSxDQUFNLE1BQU4sQ0FBYSxVQUF0QjtBQUFzQjs7QUFJdkIsUUFBSSxLQUFBLElBQVMsS0FBQSxDQUFNLE1BQW5CLEVBQTJCO0FBRTFCLE1BQUEsS0FBQSxDQUFNLEtBQU47QUFDQSxNQUFBLEtBQUEsQ0FBTSxNQUFOOztBQUVBLFVBQUk7QUFFSCxRQUFBLFFBQUEsQ0FBUyxXQUFULENBQXFCLE1BQXJCO0FBQ0EsUUFBQSxLQUFBLENBQU0sSUFBTjtBQUVBLFFBQUEsTUFBQSxDQUFPLFNBQVAsQ0FBaUIsR0FBakIsQ0FBcUIsUUFBckI7QUFFQSxRQUFBLFVBQUEsQ0FBVyxZQUFXO0FBQ3JCLFVBQUEsTUFBQSxDQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsUUFBeEI7QUFBd0IsU0FEekIsRUFFRyxHQUZILENBQUE7QUFFRyxPQVRKLENBU0ksT0FFSyxHQUZMLEVBRUY7QUFDRCxRQUFBLE9BQUEsQ0FBUSxHQUFSLENBQVkscUJBQVosRUFBbUMsR0FBbkM7QUFBbUM7QUFBQTtBQUFBOztBQUt0QyxFQUFBLFFBQUEsQ0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUN4RCxRQUFNLFdBQUEsR0FBYyxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsQ0FBbkMsQ0FBcEI7O0FBQ0EsUUFBSSxXQUFBLENBQVksTUFBWixJQUFzQixRQUFBLENBQVMsV0FBbkMsRUFBZ0Q7QUFDL0MsTUFBQSxRQUFBLENBQVMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsYUFBNUI7QUFDQSxNQUFBLFdBQUEsR0FBYyxJQUFkO0FBQWM7O0FBR2YsSUFBQSxrQkFBQTtBQUFBLEdBUEQiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY2xpY2tUb0NvcHkgPSBmYWxzZTtcblxuZnVuY3Rpb24gb0NvbG9yc0RlbW9QYWxldHRlKCkge1xuXHRjb25zdCBzd2F0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2F0Y2gnKTtcblxuXHRmb3IgKGNvbnN0IHN3YXRjaCBvZiBzd2F0Y2hlcykge1xuXHRcdGNvbnN0IG9Db2xvciA9IHN3YXRjaC5nZXRBdHRyaWJ1dGUoJ2RhdGEtby1jb2xvcicpO1xuXHRcdGNvbnN0IGhleElucHV0ID0gc3dhdGNoLnF1ZXJ5U2VsZWN0b3IoJy5oZXgnKTtcblx0XHRjb25zdCBoZXggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKGAtLW8tY29sb3JzLSR7b0NvbG9yfWApO1xuXHRcdGhleElucHV0LnZhbHVlID0gaGV4ID8gaGV4LnRyaW0oKSA6ICcnO1xuXG5cdFx0aWYgKGNsaWNrVG9Db3B5KSB7XG5cdFx0XHRzd2F0Y2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvQ29sb3JzQ29weSwgZmFsc2UpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBvQ29sb3JzQ29weShldmVudCkge1xuXHQvLyBmaW5kIHRhcmdldCBlbGVtZW50XG5cdGxldCBpbnB1dCA9IGV2ZW50LnRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaGV4Jyk7XG5cdGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XG5cdGlmIChpbnB1dCA9PT0gbnVsbCAmJiBldmVudC50YXJnZXQubG9jYWxOYW1lID09PSAnaW5wdXQnKSB7XG5cdFx0aW5wdXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCcuaGV4Jyk7XG5cdFx0cGFyZW50ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG5cdH1cblxuXHQvLyBpcyBlbGVtZW50IHNlbGVjdGFibGU/XG5cdGlmIChpbnB1dCAmJiBpbnB1dC5zZWxlY3QpIHtcblx0XHQvLyBzZWxlY3QgdGV4dFxuXHRcdGlucHV0LmZvY3VzKCk7XG5cdFx0aW5wdXQuc2VsZWN0KCk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gY29weSB0ZXh0XG5cdFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuXHRcdFx0aW5wdXQuYmx1cigpO1xuXHRcdFx0Ly8gU2V0dGluZyB0aGUgY2xhc3MgY2hhbmdlcyB0aGUgOmFmdGVyIGNvbnRlbnQgdG8gcmVhZCBcIkNvcGllZCFcIlxuXHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoJ2NvcGllZCcpO1xuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBjbGFzcyBhZnRlciAyc1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvcGllZCcpO1xuXHRcdFx0fSwgMjAwMCk7XG5cblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdDYW4gbm90IGNvcHkgdGV4dC4gJywgZXJyKTtcblx0XHR9XG5cdH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXHRjb25zdCByYW5kb21JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylbMF07XG5cdGlmIChyYW5kb21JbnB1dC5zZWxlY3QgJiYgZG9jdW1lbnQuZXhlY0NvbW1hbmQpIHtcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ28tY29weS10cnVlJyk7XG5cdFx0Y2xpY2tUb0NvcHkgPSB0cnVlO1xuXHR9XG5cblx0b0NvbG9yc0RlbW9QYWxldHRlKCk7XG59KTtcbiJdfQ==