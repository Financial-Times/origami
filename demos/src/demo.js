import oErrors from '../../main';

document.addEventListener("DOMContentLoaded", function() {
	document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
});

document.addEventListener("o.DOMContentLoaded", function() {
	oErrors.init();
	const trigger = document.getElementById("o-errors__demo-trigger-error");

	if (trigger) {
		trigger.addEventListener('click', function() {
			try {
				window.failBecauseU.ndefined();
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
