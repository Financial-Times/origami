require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var test = (function(win) {

	var hasContact = false, contactlessMoves = 0, lastClientX, lastClientY;
	var eventmap = [
		['touchstart', contactStart],
		['mousedown', contactStart],
		['mspointerdown', contactStart],
		['touchend',contactEnd],
		['mouseup', contactEnd],
		['mspointerup', contactEnd],
		['mousemove', contactMove],
		['mspointerhover', contactMove]
	];
	var className = 'o-hoverable-on';
	var doc = win.document;

	// If body has hover effects enabled, and appears to support touch, remove hover effects and start listening for pointer interactions
	function init(e) {
		if (classExists() && (('ontouchstart' in win) || (win.DocumentTouch && win.doc instanceof DocumentTouch))) {
			doc.body.className = doc.body.className.replace(className, '');
			if (e) listener('remove', 'DOMContentLoaded', init);
			eventmap.forEach(function(item) {
				listener('add', item[0], item[1]);
			});
		}
	}

	function contactStart(event) {
		hasContact = true;
		contactlessMoves = 0;
	}

	function contactEnd(event) {
		hasContact = false;
	}

	// If a contactless move (ie a hover) is detected, turn hover effects back on
	function contactMove(event) {
		if (!hasContact) {
			contactlessMoves++;
		}

		if ('mousemove' === event.type.toLowerCase()) {

			// COMPLEX:GC:20130322: Webkit can fire an erroneous mousemove under some conditions, so
			// keep a track of the clientX and clientY values, and reject events where these values don't change.
			if (lastClientX === event.clientX && lastClientY === event.clientY) {
				return;
			}
			lastClientX = event.clientX;
			lastClientY = event.clientY;
		}

		// MSPointerHover categorically means a contactless interaction
		if (contactlessMoves > 1 || event.type.toLowerCase() === 'mspointerhover') {
			doc.body.className += ' '+className;
			eventmap.forEach(function(item) {
				listener('remove', item[0], item[1]);
			});
		}
	}

	function listener(type, event, fn) {
		win[type+'EventListener'](event, fn, false);
	}

	function classExists() {
		var classPattern = new RegExp("^(.* )?"+className+"( .*)?$");
		return classPattern.test(doc.body.className);
	}

	if (doc.body) {
		init();
	} else {
		listener('add', 'DOMContentLoaded', init);
	}

	return {
		setClassName: function(str) {
			className = str;
		},
		isHoverEnabled: classExists
	}
}(window));

},{}],"epB21t":[function(require,module,exports){
'use strict';
require("./bower_components/o-hoverable/main.js");
},{"./bower_components/o-hoverable/main.js":1}],"o-ft-header":[function(require,module,exports){
module.exports=require('epB21t');
},{}]},{},["epB21t"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvU2l0ZXMvby1tb2R1bGVzL28tZnQtaGVhZGVyL2Jvd2VyX2NvbXBvbmVudHMvby1ob3ZlcmFibGUvbWFpbi5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28tbW9kdWxlcy9vLWZ0LWhlYWRlci9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG52YXIgdGVzdCA9IChmdW5jdGlvbih3aW4pIHtcblxuXHR2YXIgaGFzQ29udGFjdCA9IGZhbHNlLCBjb250YWN0bGVzc01vdmVzID0gMCwgbGFzdENsaWVudFgsIGxhc3RDbGllbnRZO1xuXHR2YXIgZXZlbnRtYXAgPSBbXG5cdFx0Wyd0b3VjaHN0YXJ0JywgY29udGFjdFN0YXJ0XSxcblx0XHRbJ21vdXNlZG93bicsIGNvbnRhY3RTdGFydF0sXG5cdFx0Wydtc3BvaW50ZXJkb3duJywgY29udGFjdFN0YXJ0XSxcblx0XHRbJ3RvdWNoZW5kJyxjb250YWN0RW5kXSxcblx0XHRbJ21vdXNldXAnLCBjb250YWN0RW5kXSxcblx0XHRbJ21zcG9pbnRlcnVwJywgY29udGFjdEVuZF0sXG5cdFx0Wydtb3VzZW1vdmUnLCBjb250YWN0TW92ZV0sXG5cdFx0Wydtc3BvaW50ZXJob3ZlcicsIGNvbnRhY3RNb3ZlXVxuXHRdO1xuXHR2YXIgY2xhc3NOYW1lID0gJ28taG92ZXJhYmxlLW9uJztcblx0dmFyIGRvYyA9IHdpbi5kb2N1bWVudDtcblxuXHQvLyBJZiBib2R5IGhhcyBob3ZlciBlZmZlY3RzIGVuYWJsZWQsIGFuZCBhcHBlYXJzIHRvIHN1cHBvcnQgdG91Y2gsIHJlbW92ZSBob3ZlciBlZmZlY3RzIGFuZCBzdGFydCBsaXN0ZW5pbmcgZm9yIHBvaW50ZXIgaW50ZXJhY3Rpb25zXG5cdGZ1bmN0aW9uIGluaXQoZSkge1xuXHRcdGlmIChjbGFzc0V4aXN0cygpICYmICgoJ29udG91Y2hzdGFydCcgaW4gd2luKSB8fCAod2luLkRvY3VtZW50VG91Y2ggJiYgd2luLmRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpKSkge1xuXHRcdFx0ZG9jLmJvZHkuY2xhc3NOYW1lID0gZG9jLmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoY2xhc3NOYW1lLCAnJyk7XG5cdFx0XHRpZiAoZSkgbGlzdGVuZXIoJ3JlbW92ZScsICdET01Db250ZW50TG9hZGVkJywgaW5pdCk7XG5cdFx0XHRldmVudG1hcC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0bGlzdGVuZXIoJ2FkZCcsIGl0ZW1bMF0sIGl0ZW1bMV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY29udGFjdFN0YXJ0KGV2ZW50KSB7XG5cdFx0aGFzQ29udGFjdCA9IHRydWU7XG5cdFx0Y29udGFjdGxlc3NNb3ZlcyA9IDA7XG5cdH1cblxuXHRmdW5jdGlvbiBjb250YWN0RW5kKGV2ZW50KSB7XG5cdFx0aGFzQ29udGFjdCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gSWYgYSBjb250YWN0bGVzcyBtb3ZlIChpZSBhIGhvdmVyKSBpcyBkZXRlY3RlZCwgdHVybiBob3ZlciBlZmZlY3RzIGJhY2sgb25cblx0ZnVuY3Rpb24gY29udGFjdE1vdmUoZXZlbnQpIHtcblx0XHRpZiAoIWhhc0NvbnRhY3QpIHtcblx0XHRcdGNvbnRhY3RsZXNzTW92ZXMrKztcblx0XHR9XG5cblx0XHRpZiAoJ21vdXNlbW92ZScgPT09IGV2ZW50LnR5cGUudG9Mb3dlckNhc2UoKSkge1xuXG5cdFx0XHQvLyBDT01QTEVYOkdDOjIwMTMwMzIyOiBXZWJraXQgY2FuIGZpcmUgYW4gZXJyb25lb3VzIG1vdXNlbW92ZSB1bmRlciBzb21lIGNvbmRpdGlvbnMsIHNvXG5cdFx0XHQvLyBrZWVwIGEgdHJhY2sgb2YgdGhlIGNsaWVudFggYW5kIGNsaWVudFkgdmFsdWVzLCBhbmQgcmVqZWN0IGV2ZW50cyB3aGVyZSB0aGVzZSB2YWx1ZXMgZG9uJ3QgY2hhbmdlLlxuXHRcdFx0aWYgKGxhc3RDbGllbnRYID09PSBldmVudC5jbGllbnRYICYmIGxhc3RDbGllbnRZID09PSBldmVudC5jbGllbnRZKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGxhc3RDbGllbnRYID0gZXZlbnQuY2xpZW50WDtcblx0XHRcdGxhc3RDbGllbnRZID0gZXZlbnQuY2xpZW50WTtcblx0XHR9XG5cblx0XHQvLyBNU1BvaW50ZXJIb3ZlciBjYXRlZ29yaWNhbGx5IG1lYW5zIGEgY29udGFjdGxlc3MgaW50ZXJhY3Rpb25cblx0XHRpZiAoY29udGFjdGxlc3NNb3ZlcyA+IDEgfHwgZXZlbnQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnbXNwb2ludGVyaG92ZXInKSB7XG5cdFx0XHRkb2MuYm9keS5jbGFzc05hbWUgKz0gJyAnK2NsYXNzTmFtZTtcblx0XHRcdGV2ZW50bWFwLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRsaXN0ZW5lcigncmVtb3ZlJywgaXRlbVswXSwgaXRlbVsxXSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBsaXN0ZW5lcih0eXBlLCBldmVudCwgZm4pIHtcblx0XHR3aW5bdHlwZSsnRXZlbnRMaXN0ZW5lciddKGV2ZW50LCBmbiwgZmFsc2UpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xhc3NFeGlzdHMoKSB7XG5cdFx0dmFyIGNsYXNzUGF0dGVybiA9IG5ldyBSZWdFeHAoXCJeKC4qICk/XCIrY2xhc3NOYW1lK1wiKCAuKik/JFwiKTtcblx0XHRyZXR1cm4gY2xhc3NQYXR0ZXJuLnRlc3QoZG9jLmJvZHkuY2xhc3NOYW1lKTtcblx0fVxuXG5cdGlmIChkb2MuYm9keSkge1xuXHRcdGluaXQoKTtcblx0fSBlbHNlIHtcblx0XHRsaXN0ZW5lcignYWRkJywgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0KTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c2V0Q2xhc3NOYW1lOiBmdW5jdGlvbihzdHIpIHtcblx0XHRcdGNsYXNzTmFtZSA9IHN0cjtcblx0XHR9LFxuXHRcdGlzSG92ZXJFbmFibGVkOiBjbGFzc0V4aXN0c1xuXHR9XG59KHdpbmRvdykpO1xuIiwiJ3VzZSBzdHJpY3QnO1xucmVxdWlyZShcIi4vYm93ZXJfY29tcG9uZW50cy9vLWhvdmVyYWJsZS9tYWluLmpzXCIpOyJdfQ==
