import Tooltip from './../../main.js';

document.addEventListener('DOMContentLoaded', function () {
	let tooltipElement = document.querySelector('.imperative-tooltip-target');
	new Tooltip(tooltipElement, {
		target: 'tooltip-target-imperative',
		content: 'Click to save to somewhere',
		showOnConstruction: true,
		position: 'above',
		appendToBody: true
	});
});
