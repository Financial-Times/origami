/*global require*/

(function() {

	const oTable = require('./../../main');
	oTable.wrap();
	oTable.init();

	const tableEls = Array.from(document.querySelectorAll('.o-table'));
	const checkboxEls = Array.from(document.querySelectorAll('input[type=checkbox]'));

	function checkboxChangeHandler(ev) {
		const cssClass = ev.target.getAttribute('data-switch-class');

		tableEls.forEach(tableEl => {
			if (ev.target.checked) {
				tableEl.classList.add(cssClass);
			} else {
				tableEl.classList.remove(cssClass);
			}
		});
	}

	checkboxEls.forEach(checkboxEl => {
		checkboxEl.addEventListener('change', checkboxChangeHandler, false);
	});
}());
