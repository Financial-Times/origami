"use strict";

var hasFired = {};

function trigger(type) {
	if (type in hasFired) return;
	hasFired[type] = true;
	document.dispatchEvent(new CustomEvent('o.'+type));
}

window.addEventListener('load', trigger.bind(null, 'load'));
window.addEventListener('load', trigger.bind(null, 'DOMContentLoaded'));
document.addEventListener('DOMContentLoaded', trigger.bind(null, 'DOMContentLoaded'));

document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		trigger('DOMContentLoaded');
		trigger('load');
	}
};

if (document.readyState === 'complete') {
	trigger('DOMContentLoaded');
	trigger('load');
}


if (document.attachEvent) {
	// If IE and not a frame
	// continually check to see if the document is ready
	var top = false;

	try {
		top = window.frameElement == null && document.documentElement;
	} catch(e) {}

	if (top && top.doScroll) {
		(function doScrollCheck() {
			if (!('DOMContentLoaded' in hasFired)) {

				try {
					// Use the trick by Diego Perini
					// http://javascript.nwbox.com/IEContentLoaded/
					top.doScroll("left");
				} catch(e) {
					return setTimeout( doScrollCheck, 50 );
				}

				trigger('DOMContentLoaded');
			}
		})();
	}
}
