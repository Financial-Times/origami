import oForms from './src/js/forms.js';

const constructAll = function() {
	oForms.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oForms;
