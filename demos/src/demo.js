import './../../main.js';

function initDemos() {

	document.addEventListener('oTracking.event', ({detail}) => {
		console.log(
			`%cReceived oTracking ${detail.category} event %c${detail.action}`,
			'color: green','color: blue',
			detail
		);
	});

	document.addEventListener('DOMContentLoaded', function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
}

initDemos();