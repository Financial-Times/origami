import '../../../main.js';
import oForms from '@financial-times/o-forms';
document.addEventListener('DOMContentLoaded', function() {
	oForms.init();
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
