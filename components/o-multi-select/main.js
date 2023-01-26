import MultiSelect from './src/js/multi-select.js';

const constructAll = () => {
	MultiSelect.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default MultiSelect;
