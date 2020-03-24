const switchState = function(element, state) {
	element.setAttribute(state, !element.getAttribute(state) || element.getAttribute(state) === 'false' ? true : false);
};

document.addEventListener('click', function(e) {
	if (e.target.className.includes('o-button')) {
		if (!e.target.getAttribute('aria-pressed') &&
			e.target.getAttribute('aria-disabled') !== 'true') {
			switchState(e.target, 'aria-selected');
		}
		if (e.target.getAttribute('aria-pressed')) {
			switchState(e.target, 'aria-pressed');
		}
	}
	e.stopPropagation();
}, false);
