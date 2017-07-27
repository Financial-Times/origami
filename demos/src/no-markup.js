/*global require*/
import Tooltip from './../../main.js';

document.addEventListener('DOMContentLoaded', function() {
	let targetElement = document.querySelector('.imperative-tooltip-target');
	new Tooltip(targetElement, {
		target: 'demo-tooltip-target-imperative',
		content: 'Click to save to somewhere',
		showOnConstruction: true,
		position: 'right'
	});
});
