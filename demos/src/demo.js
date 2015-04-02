'use strict';

var oErrors = require('../../main');

document.addEventListener("DOMContentLoaded", function() {
	document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
});

document.addEventListener("o.DOMContentLoaded", function() {
	oErrors.init();
	var trigger = document.getElementById("o-errors__demo-trigger-error");

	if (trigger) {
		trigger.addEventListener('click', function(ev) {
			try {
				window.failBecauseU.ndefined;
			} catch(e) {
				trigger.dispatchEvent(new CustomEvent("oErrors.log", {
					bubbles: true,
					detail: {
						error: e
					}
				}));
			}
		});
	}
});
