/*global require*/

(function() {

	require('./../../main').wrap();

	let tableEls;
	let checkboxEls;

	function checkboxChangeHandler(ev) {
		const cssClass = ev.target.getAttribute('data-switch-class');
		let c;
		let l;

		for (c = 0, l = tableEls.length; c < l; c++) {
			if (ev.target.checked) {
				tableEls[c].classList.add(cssClass);
			} else {
				tableEls[c].classList.remove(cssClass);
			}
		}
	}

	tableEls = document.querySelectorAll('.o-table');
	checkboxEls = document.querySelectorAll('input[type=checkbox]');

	for (let c = 0, l = checkboxEls.length; c < l; c++) {
		checkboxEls[c].addEventListener('change', checkboxChangeHandler, false);
	}
}());
