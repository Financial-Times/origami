import './../../main.js';
import Typography from '@financial-times/o-typography';
import Forms from '@financial-times/o-forms';
document.addEventListener('DOMContentLoaded', function () {
	Forms.init();
	Typography.init();
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
