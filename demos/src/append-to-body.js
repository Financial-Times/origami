import Tooltip from './../../main.js.js';

document.addEventListener('DOMContentLoaded', function () {
	const tooltipElement = document.querySelector('.imperative-tooltip-target');
	new Tooltip(tooltipElement, {
		target: 'tooltip-target-imperative',
		content: '<p>Click to save to somewhere</p>',
		showOnConstruction: true,
		position: 'above',
		appendToBody: true
	});
});
