"use strict";

var hasFired = {};

function trigger(type) {
	if (type in hasFired) return;
	hasFired[type] = true;
	document.dispatchEvent(new CustomEvent('o.'+type));
}

window.addEventListener('load', trigger.bind(null, 'load'));
document.addEventListener('DOMContentLoaded', trigger.bind(null, 'DOMContentLoaded'));

if (document.readyState === 'complete') {
	trigger('load');
	trigger('DOMContentLoaded');
}
