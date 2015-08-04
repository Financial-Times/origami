'use strict';

var nativeNonBubblers = ['error', 'blur', 'focus', 'scroll', 'resize'];

var fireEvent = function (el, event, data) {
	var evt = document.createEvent('HTMLEvents');
	evt.initEvent(event, !(nativeNonBubblers.indexOf(event) > -1), true); // jshint ignore:line
	data && Object.keys(data).forEach(function (key) {
		evt[key] = data[key];
	});
	el.dispatchEvent(evt);
};

var fireCustomEvent = function (el, event, data) {
	el.dispatchEvent(new CustomEvent(event, {
		detail: data,
		bubbles: true
	}));
};

module.exports = {
	fireEvent: fireEvent,
	fireCustomEvent: fireCustomEvent
};
