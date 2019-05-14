import '../../main.js';

document.addEventListener("DOMContentLoaded", function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

let extraContentInput = document.querySelector("input[name='extra']");
// indeterminate states can only be set dynamically, there is no attribute for them.
if (extraContentInput) { extraContentInput.indeterminate = true; }
