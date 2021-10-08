function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  // main.js
  var missingDataMessage = "Could not find layout information. You may need to include o-grid css. See the README (https://registry.origami.ft.com/components/o-grid/readme) for more information.";

  function getGridBreakpoints() {
    var breakpoints = getGridFromDoc("before");

    if (Object.keys(breakpoints).length === 0) {
      console.warn(missingDataMessage);
    }

    return breakpoints;
  }

  function getGridFromDoc(position) {
    try {
      var gridProperties = window.getComputedStyle(document.documentElement, ":" + position).getPropertyValue("content");
      gridProperties = gridProperties.replace(/'/g, "").replace(/\\/g, "").replace(/^"/, "").replace(/"$/, "");
      return JSON.parse(gridProperties);
    } catch (e) {
      return {};
    }
  }

  function enableLayoutChangeEvents() {
    var gridLayouts = getGridBreakpoints();

    if (gridLayouts.hasOwnProperty("layouts")) {
      var layouts = gridLayouts.layouts;
      var breakpoints = [].concat(_toConsumableArray(Object.entries(layouts)), [["default", "240px"]]).sort(function (a, b) {
        return parseFloat(a[1]) - parseFloat(b[1]);
      });

      var setupQuery = function setupQuery(query, size) {
        var handleMQChange = function handleMQChange(mql2) {
          if (mql2.matches) {
            window.dispatchEvent(new CustomEvent("o-grid.layoutChange", {
              detail: {
                layout: size
              }
            }));
          }
        };

        var mql = window.matchMedia(query);
        mql.addListener(handleMQChange);
        handleMQChange(mql);
      };

      var decr1 = function decr1(val) {
        return "".concat(Number(val.replace("px", "") - 1), "px");
      };

      for (var index = 0; index < breakpoints.length; index++) {
        var _breakpoints$index = _slicedToArray(breakpoints[index], 2),
            layoutName = _breakpoints$index[0],
            layoutWidth = _breakpoints$index[1];

        var isLast = index === breakpoints.length - 1;

        if (isLast) {
          setupQuery("(min-width: ".concat(layoutWidth, ")"), layoutName);
          continue;
        }

        var _breakpoints = _slicedToArray(breakpoints[index + 1], 2),
            nextLayoutWidth = _breakpoints[1];

        setupQuery("(min-width: ".concat(layoutWidth, ") and (max-width: ").concat(decr1(nextLayoutWidth), ")"), layoutName);
      }
    } else {
      console.error("Could not enable grid layout change events. Include o-grid css. See the README (https://registry.origami.ft.com/components/o-grid/readme) for more details.");
    }
  } // demos/src/js/layout-change-events.js


  enableLayoutChangeEvents();
  window.addEventListener("o-grid.layoutChange", function (_ref) {
    var detail = _ref.detail;
    return console.log(detail);
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJkZW1vcy9zcmMvanMvbGF5b3V0LWNoYW5nZS1ldmVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE1BQU0sa0JBQUEsR0FBcUIsd0tBQTNCOztBQXNCQSxXQUFBLGtCQUFBLEdBQThCO0FBQzdCLFFBQU0sV0FBQSxHQUFjLGNBQUEsQ0FBZSxRQUFmLENBQXBCOztBQUNBLFFBQUksTUFBQSxDQUFPLElBQVAsQ0FBWSxXQUFaLEVBQXlCLE1BQXpCLEtBQW9DLENBQXhDLEVBQTJDO0FBQzFDLE1BQUEsT0FBQSxDQUFRLElBQVIsQ0FBYSxrQkFBYjtBQUFhOztBQUVkLFdBQU8sV0FBUDtBQUFPOztBQVFSLFdBQUEsY0FBQSxDQUF3QixRQUF4QixFQUFrQztBQUdqQyxRQUFJO0FBQ0gsVUFBSSxjQUFBLEdBQWlCLE1BQUEsQ0FBTyxnQkFBUCxDQUF3QixRQUFBLENBQVMsZUFBakMsRUFBa0QsTUFBTSxRQUF4RCxFQUFrRSxnQkFBbEUsQ0FBbUYsU0FBbkYsQ0FBckI7QUFHQSxNQUFBLGNBQUEsR0FBaUIsY0FBQSxDQUFlLE9BQWYsQ0FBdUIsSUFBdkIsRUFBNkIsRUFBN0IsRUFBaUMsT0FBakMsQ0FBeUMsS0FBekMsRUFBZ0QsRUFBaEQsRUFBb0QsT0FBcEQsQ0FBNEQsSUFBNUQsRUFBa0UsRUFBbEUsRUFBc0UsT0FBdEUsQ0FBOEUsSUFBOUUsRUFBb0YsRUFBcEYsQ0FBakI7QUFDQSxhQUFPLElBQUEsQ0FBSyxLQUFMLENBQVcsY0FBWCxDQUFQO0FBQWtCLEtBTG5CLENBS21CLE9BQ1YsQ0FEVSxFQUNqQjtBQUNELGFBQU8sRUFBUDtBQUFPO0FBQUE7O0FBK0JULFdBQUEsd0JBQUEsR0FBb0M7QUFFbkMsUUFBTSxXQUFBLEdBQWMsa0JBQUEsRUFBcEI7O0FBRUEsUUFBSSxXQUFBLENBQVksY0FBWixDQUEyQixTQUEzQixDQUFKLEVBQTJDO0FBQzFDLFVBQU0sT0FBQSxHQUFVLFdBQUEsQ0FBWSxPQUE1QjtBQUNBLFVBQU0sV0FBQSxHQUFjLDZCQUNoQixNQUFBLENBQU8sT0FBUCxDQUFlLE9BQWYsQ0FEZ0IsSUFFbkIsQ0FBQyxTQUFELEVBQVksT0FBWixDQUZtQixHQUdsQixJQUhrQixDQUdiLFVBQUMsQ0FBRCxFQUFJLENBQUo7QUFBQSxlQUFVLFVBQUEsQ0FBVyxDQUFBLENBQUUsQ0FBRixDQUFYLENBQUEsR0FBbUIsVUFBQSxDQUFXLENBQUEsQ0FBRSxDQUFGLENBQVgsQ0FBN0I7QUFBQSxPQUhhLENBQXBCOztBQUtBLFVBQU0sVUFBQSxHQUFhLFNBQWIsVUFBYSxDQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWlCO0FBRW5DLFlBQU0sY0FBQSxHQUFpQixTQUFqQixjQUFpQixDQUFBLElBQUEsRUFBTztBQUM3QixjQUFJLElBQUEsQ0FBSSxPQUFSLEVBQWlCO0FBQ2hCLFlBQUEsTUFBQSxDQUFPLGFBQVAsQ0FBcUIsSUFBSSxXQUFKLENBQWdCLHFCQUFoQixFQUF1QztBQUMzRCxjQUFBLE1BQUEsRUFBUTtBQUNQLGdCQUFBLE1BQUEsRUFBUTtBQUREO0FBRG1ELGFBQXZDLENBQXJCO0FBRVU7QUFBQSxTQUpaOztBQVVBLFlBQU0sR0FBQSxHQUFNLE1BQUEsQ0FBTyxVQUFQLENBQWtCLEtBQWxCLENBQVo7QUFDQSxRQUFBLEdBQUEsQ0FBSSxXQUFKLENBQWdCLGNBQWhCO0FBQ0EsUUFBQSxjQUFBLENBQWUsR0FBZixDQUFBO0FBQWUsT0FkaEI7O0FBa0JBLFVBQU0sS0FBQSxHQUFRLFNBQVIsS0FBUSxDQUFBLEdBQUE7QUFBQSx5QkFBVSxNQUFBLENBQU8sR0FBQSxDQUFJLE9BQUosQ0FBWSxJQUFaLEVBQWtCLEVBQWxCLElBQXdCLENBQS9CLENBQVY7QUFBQSxPQUFkOztBQUNBLFdBQUEsSUFBUyxLQUFBLEdBQVEsQ0FBakIsRUFBb0IsS0FBQSxHQUFRLFdBQUEsQ0FBWSxNQUF4QyxFQUFnRCxLQUFBLEVBQWhELEVBQXlEO0FBQ3hELGdEQUFrQyxXQUFBLENBQVksS0FBWixDQUFsQztBQUFBLFlBQU8sVUFBUDtBQUFBLFlBQW1CLFdBQW5COztBQUNBLFlBQU0sTUFBQSxHQUFTLEtBQUEsS0FBVSxXQUFBLENBQVksTUFBWixHQUFxQixDQUE5Qzs7QUFDQSxZQUFJLE1BQUosRUFBWTtBQUNYLFVBQUEsVUFBQSx1QkFBMEIsV0FBMUIsUUFBMEMsVUFBMUMsQ0FBQTtBQUNBO0FBQUE7O0FBRUQsMENBQTJCLFdBQUEsQ0FBWSxLQUFBLEdBQVEsQ0FBcEIsQ0FBM0I7QUFBQSxZQUFRLGVBQVI7O0FBQ0EsUUFBQSxVQUFBLHVCQUEwQixXQUExQiwrQkFBMEQsS0FBQSxDQUFNLGVBQU4sQ0FBMUQsUUFBcUYsVUFBckYsQ0FBQTtBQUFxRjtBQUFBLEtBbEN2RixNQW9DTztBQUNOLE1BQUEsT0FBQSxDQUFRLEtBQVIsQ0FBYyw2SkFBZDtBQUFjO0FBQUEsRzs7O0FDbkhoQixFQUFBLHdCQUFBO0FBRUEsRUFBQSxNQUFBLENBQU8sZ0JBQVAsQ0FBd0IscUJBQXhCLEVBQStDO0FBQUEsUUFBRyxNQUFILFFBQUcsTUFBSDtBQUFBLFdBQWdCLE9BQUEsQ0FBUSxHQUFSLENBQVksTUFBWixDQUFoQjtBQUFBLEdBQS9DIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuY29uc3QgbWlzc2luZ0RhdGFNZXNzYWdlID0gJ0NvdWxkIG5vdCBmaW5kIGxheW91dCBpbmZvcm1hdGlvbi4gJyArXG5cdCdZb3UgbWF5IG5lZWQgdG8gaW5jbHVkZSBvLWdyaWQgY3NzLiBTZWUgdGhlIFJFQURNRSAoaHR0cHM6Ly9yZWdpc3RyeS5vcmlnYW1pLmZ0LmNvbS9jb21wb25lbnRzL28tZ3JpZC9yZWFkbWUpICcgK1xuXHQnZm9yIG1vcmUgaW5mb3JtYXRpb24uJztcblxuLyoqXG4gKiBHcmFiIGdyaWQgcHJvcGVydGllc1xuICogQHJldHVybiB7T2JqZWN0fSBsYXlvdXQgbmFtZXMgYW5kIGd1dHRlciB3aWR0aHNcbiAqL1xuZnVuY3Rpb24gZ2V0R3JpZFByb3BlcnRpZXMoKSB7XG5cdGNvbnN0IHByb3BlcnRpZXMgPSBnZXRHcmlkRnJvbURvYygnYWZ0ZXInKTtcblx0aWYgKE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmxlbmd0aCA9PT0gMCkge1xuXHRcdGNvbnNvbGUud2FybihtaXNzaW5nRGF0YU1lc3NhZ2UpO1xuXHR9XG5cdHJldHVybiBwcm9wZXJ0aWVzO1xufVxuXG4vKipcbiAqIEdldCBhbGwgbGF5b3V0IHNpemVzLlxuICogQ1NTIG11c3QgYmUgaW5jbHVkZWQgc28gSmF2YVNjcmlwdCBjYW4gcmV0cmlldmUgbGF5b3V0IGluZm9ybWF0aW9uLlxuICogU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiBAcmV0dXJuIHtPYmplY3R9IGxheW91dCBuYW1lcyBhbmQgc2l6ZXNcbiAqL1xuZnVuY3Rpb24gZ2V0R3JpZEJyZWFrcG9pbnRzKCkge1xuXHRjb25zdCBicmVha3BvaW50cyA9IGdldEdyaWRGcm9tRG9jKCdiZWZvcmUnKTtcblx0aWYgKE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5sZW5ndGggPT09IDApIHtcblx0XHRjb25zb2xlLndhcm4obWlzc2luZ0RhdGFNZXNzYWdlKTtcblx0fVxuXHRyZXR1cm4gYnJlYWtwb2ludHM7XG59XG5cbi8qKlxuICogR3JhYiBncmlkIHByb3BlcnRpZXMgc3VyZmFjZWQgaW4gaHRtbDphZnRlciBhbmQgaHRtbDpiZWZvcmUncyBjb250ZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gcG9zaXRpb24gV2hldGhlciB0byBnZXQgYWxsIHByb3BlcnRpZXMgaW4gOmJlZm9yZSwgb3IgY3VycmVudCBwcm9wZXJ0aWVzIGluIDphZnRlclxuICogQHJldHVybiB7T2JqZWN0fSBsYXlvdXQgbmFtZXMgYW5kIGd1dHRlciB3aWR0aHNcbiAqL1xuZnVuY3Rpb24gZ2V0R3JpZEZyb21Eb2MocG9zaXRpb24pIHtcblx0Ly8gQ29udGFpbmVkIGluIGEgdHJ5L2NhdGNoIGFzIGl0IHNob3VsZCBub3QgZXJyb3IgaWYgby1ncmlkIHN0eWxlcyBhcmUgbm90IChkZWxpYmVyYXRlbHkgb3IgYWNjaWRlbnRhbGx5KSBsb2FkZWRcblx0Ly8gZS5nLiBvLXRyYWNraW5nIHdpbGwgYWx3YXlzIHRyeSB0byByZWFkIHRoaXMgcHJvcGVydHksIGJ1dCB0aGUgcGFnZSBpcyBub3Qgb2JsaWdlZCB0byB1c2Ugby1ncmlkIGZvciBsYXlvdXRcblx0dHJ5IHtcblx0XHRsZXQgZ3JpZFByb3BlcnRpZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICc6JyArIHBvc2l0aW9uKS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50Jyk7XG5cdFx0Ly8gRmlyZWZveCBjb21wdXRlczogXCJ7XFxcImZvb1xcXCI6IFxcXCJiYXJcXFwifVwiXG5cdFx0Ly8gV2Ugd2FudCByZWFkYWJsZSBKU09OOiB7XCJmb29cIjogXCJiYXJcIn1cblx0XHRncmlkUHJvcGVydGllcyA9IGdyaWRQcm9wZXJ0aWVzLnJlcGxhY2UoLycvZywgJycpLnJlcGxhY2UoL1xcXFwvZywgJycpLnJlcGxhY2UoL15cIi8sICcnKS5yZXBsYWNlKC9cIiQvLCAnJyk7XG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoZ3JpZFByb3BlcnRpZXMpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9XG59XG5cbi8qKlxuICogR3JhYiB0aGUgY3VycmVudCBsYXlvdXQuXG4gKiBDU1MgbXVzdCBiZSBpbmNsdWRlZCBzbyBKYXZhU2NyaXB0IGNhbiByZXRyaWV2ZSBsYXlvdXQgaW5mb3JtYXRpb24uXG4gKiBTZWUgdGhlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqIEByZXR1cm4ge1N0cmluZ30gTGF5b3V0IG5hbWVcbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudExheW91dCgpIHtcblx0cmV0dXJuIGdldEdyaWRQcm9wZXJ0aWVzKCkubGF5b3V0O1xufVxuXG4vKipcbiAqIEdyYWIgdGhlIGN1cnJlbnQgc3BhY2UgYmV0d2VlbiBjb2x1bW5zLlxuICogQ1NTIG11c3QgYmUgaW5jbHVkZWQgc28gSmF2YVNjcmlwdCBjYW4gcmV0cmlldmUgbGF5b3V0IGluZm9ybWF0aW9uLlxuICogU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEd1dHRlciB3aWR0aCBpbiBwaXhlbHNcbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudEd1dHRlcigpIHtcblx0cmV0dXJuIGdldEdyaWRQcm9wZXJ0aWVzKCkuZ3V0dGVyO1xufVxuXG4vKipcbiAqIFRoaXMgc2V0cyBNZWRpYVF1ZXJ5TGlzdGVuZXJzIG9uIGFsbCB0aGUgby1ncmlkIGJyZWFrcG9pbnRzXG4gKiBhbmQgZmlyZXMgYSBgby1ncmlkLmxheW91dENoYW5nZWAgZXZlbnQgb24gbGF5b3V0IGNoYW5nZS5cbiAqIENTUyBtdXN0IGJlIGluY2x1ZGVkIHNvIEphdmFTY3JpcHQgY2FuIHJldHJpZXZlIGxheW91dCBpbmZvcm1hdGlvbi5cbiAqIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGVuYWJsZUxheW91dENoYW5nZUV2ZW50cygpIHtcblx0Ly8gQ3JlYXRlIGEgbWFwIGNvbnRhaW5pbmcgYWxsIGJyZWFrcG9pbnRzIGV4cG9zZWQgdmlhIGh0bWw6YmVmb3JlXG5cdGNvbnN0IGdyaWRMYXlvdXRzID0gZ2V0R3JpZEJyZWFrcG9pbnRzKCk7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcblx0aWYgKGdyaWRMYXlvdXRzLmhhc093blByb3BlcnR5KCdsYXlvdXRzJykpIHtcblx0XHRjb25zdCBsYXlvdXRzID0gZ3JpZExheW91dHMubGF5b3V0cztcblx0XHRjb25zdCBicmVha3BvaW50cyA9IFtcblx0XHRcdC4uLk9iamVjdC5lbnRyaWVzKGxheW91dHMpLFxuXHRcdFx0WydkZWZhdWx0JywgJzI0MHB4J11cblx0XHRdLnNvcnQoKGEsIGIpID0+IHBhcnNlRmxvYXQoYVsxXSkgLSBwYXJzZUZsb2F0KGJbMV0pKTtcblxuXHRcdGNvbnN0IHNldHVwUXVlcnkgPSAocXVlcnksIHNpemUpID0+IHtcblx0XHRcdC8vIG1hdGNoTWVkaWEgbGlzdGVuZXIgaGFuZGxlcjogRGlzcGF0Y2ggYG8tZ3JpZC5sYXlvdXRDaGFuZ2VgIGV2ZW50IGlmIGEgbWF0Y2hcblx0XHRcdGNvbnN0IGhhbmRsZU1RQ2hhbmdlID0gbXFsID0+IHtcblx0XHRcdFx0aWYgKG1xbC5tYXRjaGVzKSB7XG5cdFx0XHRcdFx0d2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvLWdyaWQubGF5b3V0Q2hhbmdlJywge1xuXHRcdFx0XHRcdFx0ZGV0YWlsOiB7XG5cdFx0XHRcdFx0XHRcdGxheW91dDogc2l6ZSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IG1xbCA9IHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KTtcblx0XHRcdG1xbC5hZGRMaXN0ZW5lcihoYW5kbGVNUUNoYW5nZSk7XG5cdFx0XHRoYW5kbGVNUUNoYW5nZShtcWwpO1xuXHRcdH07XG5cblx0XHQvLyBHZW5lcmF0ZSBtZWRpYSBxdWVyaWVzIGZvciBlYWNoXG5cdFx0Y29uc3QgZGVjcjEgPSB2YWwgPT4gYCR7TnVtYmVyKHZhbC5yZXBsYWNlKCdweCcsICcnKSAtIDEpfXB4YDtcblx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnJlYWtwb2ludHMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRjb25zdCBbbGF5b3V0TmFtZSwgbGF5b3V0V2lkdGhdID0gYnJlYWtwb2ludHNbaW5kZXhdO1xuXHRcdFx0Y29uc3QgaXNMYXN0ID0gaW5kZXggPT09IGJyZWFrcG9pbnRzLmxlbmd0aCAtIDE7XG5cdFx0XHRpZiAoaXNMYXN0KSB7XG5cdFx0XHRcdHNldHVwUXVlcnkoYChtaW4td2lkdGg6ICR7bGF5b3V0V2lkdGh9KWAsIGxheW91dE5hbWUpO1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IFssbmV4dExheW91dFdpZHRoXSA9IGJyZWFrcG9pbnRzW2luZGV4ICsgMV07XG5cdFx0XHRzZXR1cFF1ZXJ5KGAobWluLXdpZHRoOiAke2xheW91dFdpZHRofSkgYW5kIChtYXgtd2lkdGg6ICR7ZGVjcjEobmV4dExheW91dFdpZHRoKX0pYCwgbGF5b3V0TmFtZSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBlbmFibGUgZ3JpZCBsYXlvdXQgY2hhbmdlIGV2ZW50cy4gSW5jbHVkZSBvLWdyaWQgY3NzLiBTZWUgdGhlIFJFQURNRSAoaHR0cHM6Ly9yZWdpc3RyeS5vcmlnYW1pLmZ0LmNvbS9jb21wb25lbnRzL28tZ3JpZC9yZWFkbWUpIGZvciBtb3JlIGRldGFpbHMuJyk7XG5cdH1cbn1cblxuZXhwb3J0IHtcblx0Z2V0Q3VycmVudExheW91dCxcblx0Z2V0Q3VycmVudEd1dHRlcixcblx0Z2V0R3JpZEJyZWFrcG9pbnRzLFxuXHRlbmFibGVMYXlvdXRDaGFuZ2VFdmVudHNcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0Z2V0Q3VycmVudExheW91dCxcblx0Z2V0Q3VycmVudEd1dHRlcixcblx0Z2V0R3JpZEJyZWFrcG9pbnRzLFxuXHRlbmFibGVMYXlvdXRDaGFuZ2VFdmVudHNcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgeyBlbmFibGVMYXlvdXRDaGFuZ2VFdmVudHMgfSBmcm9tICcuLi8uLi8uLi9tYWluLmpzJztcblxuZW5hYmxlTGF5b3V0Q2hhbmdlRXZlbnRzKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvLWdyaWQubGF5b3V0Q2hhbmdlJywgKHsgZGV0YWlsIH0pID0+IGNvbnNvbGUubG9nKGRldGFpbCkpO1xuIl19