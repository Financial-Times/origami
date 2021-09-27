import oAutocomplete from './src/js/autocomplete.js';
const constructAll = function () {
	oAutocomplete.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default oAutocomplete;
