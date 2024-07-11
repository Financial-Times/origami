/* eslint-disable @lwc/lwc/no-async-await */
import {
	injectScripts,
	removeStyles,
	isGridEnabled,
} from './utils.js';

const checkbox = document.querySelector('#o3-grid-checkbox');
const gridOptions = document.querySelector('.o3-grid-options');
(async function () {
	const isEnabled = await isGridEnabled();
	checkbox.checked = isEnabled;
	toggleOptions()
})();

checkbox.addEventListener('change', function () {
	if (this.checked) {
		injectScripts();
	} else {
		removeStyles();
	}
	toggleOptions();
});


function toggleOptions() {
	if (checkbox.checked) {
		gridOptions.style.display = 'block';
	} else {
		gridOptions.style.display = 'none';
	}
}
