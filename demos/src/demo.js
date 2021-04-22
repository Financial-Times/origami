import '../../main.js';

document.addEventListener("DOMContentLoaded", function() {
	document.documentElement.className = document.documentElement.className.replace('core', 'enhanced');
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
