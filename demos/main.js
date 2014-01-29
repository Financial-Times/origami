;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{}],2:[function(require,module,exports){
'use strict';
require("./bower_components/o-hoverable/main.js");
},{"./bower_components/o-hoverable/main.js":1}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcmh5cy5ldmFucy9TaXRlcy9vL28tZnQtaGVhZGVyL2Jvd2VyX2NvbXBvbmVudHMvby1ob3ZlcmFibGUvbWFpbi5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28vby1mdC1oZWFkZXIvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIlxudmFyIHRlc3QgPSAoZnVuY3Rpb24od2luKSB7XG5cblx0dmFyIGhhc0NvbnRhY3QgPSBmYWxzZSwgY29udGFjdGxlc3NNb3ZlcyA9IDAsIGxhc3RDbGllbnRYLCBsYXN0Q2xpZW50WTtcblx0dmFyIGV2ZW50bWFwID0gW1xuXHRcdFsndG91Y2hzdGFydCcsIGNvbnRhY3RTdGFydF0sXG5cdFx0Wydtb3VzZWRvd24nLCBjb250YWN0U3RhcnRdLFxuXHRcdFsnbXNwb2ludGVyZG93bicsIGNvbnRhY3RTdGFydF0sXG5cdFx0Wyd0b3VjaGVuZCcsY29udGFjdEVuZF0sXG5cdFx0Wydtb3VzZXVwJywgY29udGFjdEVuZF0sXG5cdFx0Wydtc3BvaW50ZXJ1cCcsIGNvbnRhY3RFbmRdLFxuXHRcdFsnbW91c2Vtb3ZlJywgY29udGFjdE1vdmVdLFxuXHRcdFsnbXNwb2ludGVyaG92ZXInLCBjb250YWN0TW92ZV1cblx0XTtcblx0dmFyIGNsYXNzTmFtZSA9ICdvLWhvdmVyYWJsZS1vbic7XG5cdHZhciBkb2MgPSB3aW4uZG9jdW1lbnQ7XG5cblx0Ly8gSWYgYm9keSBoYXMgaG92ZXIgZWZmZWN0cyBlbmFibGVkLCBhbmQgYXBwZWFycyB0byBzdXBwb3J0IHRvdWNoLCByZW1vdmUgaG92ZXIgZWZmZWN0cyBhbmQgc3RhcnQgbGlzdGVuaW5nIGZvciBwb2ludGVyIGludGVyYWN0aW9uc1xuXHRmdW5jdGlvbiBpbml0KGUpIHtcblx0XHRpZiAoY2xhc3NFeGlzdHMoKSAmJiAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbikgfHwgKHdpbi5Eb2N1bWVudFRvdWNoICYmIHdpbi5kb2MgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKSkpIHtcblx0XHRcdGRvYy5ib2R5LmNsYXNzTmFtZSA9IGRvYy5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKGNsYXNzTmFtZSwgJycpO1xuXHRcdFx0aWYgKGUpIGxpc3RlbmVyKCdyZW1vdmUnLCAnRE9NQ29udGVudExvYWRlZCcsIGluaXQpO1xuXHRcdFx0ZXZlbnRtYXAuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdGxpc3RlbmVyKCdhZGQnLCBpdGVtWzBdLCBpdGVtWzFdKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNvbnRhY3RTdGFydChldmVudCkge1xuXHRcdGhhc0NvbnRhY3QgPSB0cnVlO1xuXHRcdGNvbnRhY3RsZXNzTW92ZXMgPSAwO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29udGFjdEVuZChldmVudCkge1xuXHRcdGhhc0NvbnRhY3QgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElmIGEgY29udGFjdGxlc3MgbW92ZSAoaWUgYSBob3ZlcikgaXMgZGV0ZWN0ZWQsIHR1cm4gaG92ZXIgZWZmZWN0cyBiYWNrIG9uXG5cdGZ1bmN0aW9uIGNvbnRhY3RNb3ZlKGV2ZW50KSB7XG5cdFx0aWYgKCFoYXNDb250YWN0KSB7XG5cdFx0XHRjb250YWN0bGVzc01vdmVzKys7XG5cdFx0fVxuXG5cdFx0aWYgKCdtb3VzZW1vdmUnID09PSBldmVudC50eXBlLnRvTG93ZXJDYXNlKCkpIHtcblxuXHRcdFx0Ly8gQ09NUExFWDpHQzoyMDEzMDMyMjogV2Via2l0IGNhbiBmaXJlIGFuIGVycm9uZW91cyBtb3VzZW1vdmUgdW5kZXIgc29tZSBjb25kaXRpb25zLCBzb1xuXHRcdFx0Ly8ga2VlcCBhIHRyYWNrIG9mIHRoZSBjbGllbnRYIGFuZCBjbGllbnRZIHZhbHVlcywgYW5kIHJlamVjdCBldmVudHMgd2hlcmUgdGhlc2UgdmFsdWVzIGRvbid0IGNoYW5nZS5cblx0XHRcdGlmIChsYXN0Q2xpZW50WCA9PT0gZXZlbnQuY2xpZW50WCAmJiBsYXN0Q2xpZW50WSA9PT0gZXZlbnQuY2xpZW50WSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsYXN0Q2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XG5cdFx0XHRsYXN0Q2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG5cdFx0fVxuXG5cdFx0Ly8gTVNQb2ludGVySG92ZXIgY2F0ZWdvcmljYWxseSBtZWFucyBhIGNvbnRhY3RsZXNzIGludGVyYWN0aW9uXG5cdFx0aWYgKGNvbnRhY3RsZXNzTW92ZXMgPiAxIHx8IGV2ZW50LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ21zcG9pbnRlcmhvdmVyJykge1xuXHRcdFx0ZG9jLmJvZHkuY2xhc3NOYW1lICs9ICcgJytjbGFzc05hbWU7XG5cdFx0XHRldmVudG1hcC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0bGlzdGVuZXIoJ3JlbW92ZScsIGl0ZW1bMF0sIGl0ZW1bMV0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gbGlzdGVuZXIodHlwZSwgZXZlbnQsIGZuKSB7XG5cdFx0d2luW3R5cGUrJ0V2ZW50TGlzdGVuZXInXShldmVudCwgZm4sIGZhbHNlKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsYXNzRXhpc3RzKCkge1xuXHRcdHZhciBjbGFzc1BhdHRlcm4gPSBuZXcgUmVnRXhwKFwiXiguKiApP1wiK2NsYXNzTmFtZStcIiggLiopPyRcIik7XG5cdFx0cmV0dXJuIGNsYXNzUGF0dGVybi50ZXN0KGRvYy5ib2R5LmNsYXNzTmFtZSk7XG5cdH1cblxuXHRpZiAoZG9jLmJvZHkpIHtcblx0XHRpbml0KCk7XG5cdH0gZWxzZSB7XG5cdFx0bGlzdGVuZXIoJ2FkZCcsICdET01Db250ZW50TG9hZGVkJywgaW5pdCk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHNldENsYXNzTmFtZTogZnVuY3Rpb24oc3RyKSB7XG5cdFx0XHRjbGFzc05hbWUgPSBzdHI7XG5cdFx0fSxcblx0XHRpc0hvdmVyRW5hYmxlZDogY2xhc3NFeGlzdHNcblx0fVxufSh3aW5kb3cpKTtcbiIsIid1c2Ugc3RyaWN0JztcbnJlcXVpcmUoXCIuL2Jvd2VyX2NvbXBvbmVudHMvby1ob3ZlcmFibGUvbWFpbi5qc1wiKTsiXX0=
;