import Toggle from '@financial-times/o-toggle';

function init (headerEl, { searchBarOpen: isOpen } = {}) {
	const target = headerEl.querySelector('[data-o-header-search]');
	const controls = target && headerEl.querySelectorAll(`[aria-controls="${target.id}"]`);

	if (controls === null || controls.length === 0) {
		return;
	}

	const opening = [];

	const callback = function (state, e) {
		if (state === 'open') {
			// record the opening control
			opening.push(e.currentTarget);
			target.querySelector('[name="q"]').focus();
		} else {
			// re-focus opening control
			if (opening.length) {
				opening.pop().focus();
			}
		}
	};

	for (let i = 0, len = controls.length; i < len; i++) {
		new Toggle(controls[i], { target, callback, isOpen });
	}
}

export { init };
export default { init };
