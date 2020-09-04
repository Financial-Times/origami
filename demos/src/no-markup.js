
import Tooltip from './../../main.js.js';

document.addEventListener('DOMContentLoaded', function() {
	const tooltipElement = document.querySelector('.imperative-tooltip-target');
	new Tooltip(tooltipElement, {
		target: 'demo-tooltip-target-imperative',
		content: 'Click to save to somewhere',
		showOnConstruction: true,
		position: 'right'
	});
});
