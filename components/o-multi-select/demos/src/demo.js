import MultiSelect from '../../src/js/multi-select.js';
import oForms from '@financial-times/o-forms';
oForms.init();

const constructAll = () => {
	MultiSelect.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

document.addEventListener("DOMContentLoaded", function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
