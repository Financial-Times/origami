import './../../main.js';

function setWidths () {
	const selection = document.querySelector('#select-scale');

	if (selection) {
		const text = document.querySelector('p');
		selection.addEventListener('change', () => {
			text.classList = '';
			text.classList.add('line-width-demo__scale');
			text.classList.add(`line-width-demo__scale--${selection.value}`);
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
