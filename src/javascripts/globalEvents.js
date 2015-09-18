"use strict";

var on = function (eventName, eventHandler) {
	document.body.addEventListener('oComments.' + eventName, eventHandler);
};
exports.on = function (eventName, eventHandler) {
	if (document.body) {
		on(eventName, eventHandler);
	} else {
		document.addEventListener('o.DOMContentLoaded', function () {
			on(eventName, eventHandler);
		});
	}
};

var off = function (eventName, eventHandler) {
	document.body.removeEventListener('oComments.' + eventName, eventHandler);
};
exports.off = function (eventName, eventHandler) {
	if (document.body) {
		off(eventName, eventHandler);
	} else {
		document.addEventListener('o.DOMContentLoaded', function () {
			off(eventName, eventHandler);
		});
	}
};


var trigger = function (eventName, data) {
	document.body.dispatchEvent(new CustomEvent('oComments.' + eventName, {
		detail: data,
		bubbles: true
	}));
};
exports.trigger = function (eventName, data) {
	if (document.body) {
		trigger(eventName, data);
	} else {
		document.addEventListener('o.DOMContentLoaded', function () {
			trigger(eventName, data);
		});
	}
};
