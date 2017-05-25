/*global require*/
import './../../main.js';

// oTypography should be run on the HTML element only
document.documentElement.setAttribute('data-o-component', 'o-typography');

function initDemos() {
	document.addEventListener('DOMContentLoaded', function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
}

initDemos();
