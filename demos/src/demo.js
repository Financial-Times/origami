function initDemos() {
	document.addEventListener('DOMContentLoaded', function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
}

initDemos();
