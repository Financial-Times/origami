import MultiSelect from '../../src/js/multi-select.js';

const constructAll = () => {
	MultiSelect.init(null, {
		multiSelectOptions: [
			'Apple',
			'Banana',
			'Blueberry',
			'Boysenberry',
			'Cherry',
			'Durian',
			'Eggplant',
			'Fig',
			'Grape',
			'Guava',
			'Huckleberry',
		],
	});
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

document.addEventListener("DOMContentLoaded", function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
