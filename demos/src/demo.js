/*global require*/
import './../../main.js';

function setWidths () {
	let selection = document.querySelector('.select-scale');

	if (selection) {
		let text = document.querySelector('p');
		selection.addEventListener('change', () => {
			text.classList = '';
			text.classList.add(`scale-${selection.value}`);
		});
	}
}

// oTypography should be run on the HTML element only
document.documentElement.setAttribute('data-o-component', 'o-typography');

function initDemos() {
	document.addEventListener('DOMContentLoaded', function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setWidths();
	});
}

initDemos();
