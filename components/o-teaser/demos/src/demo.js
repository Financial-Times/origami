import ODate from '@financial-times/o-date';

function initDemos() {
	document.addEventListener('DOMContentLoaded', function () {
		ODate.init();
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
}

initDemos();
