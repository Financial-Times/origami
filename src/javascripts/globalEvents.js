"use strict";

exports.on = function (eventName, eventHandler) {
	document.body.addEventListener('oComments.' + eventName, eventHandler);
};

exports.off = function (eventName, eventHandler) {
	document.body.removeEventListener('oComments.' + eventName, eventHandler);
};

exports.trigger = function (eventName, data) {
	document.body.dispatchEvent(new CustomEvent('oComments.' + eventName, {
		detail: data,
		bubbles: true
	}));
};
