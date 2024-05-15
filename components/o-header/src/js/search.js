import Toggle from '@financial-times/o-toggle';

/**
 *
 * @param {HTMLElement} headerEl - The header element.
 * @param {Object} [options] - Options to configure the search bar.
 * @param {string} [options.searchState] - The initial state of the search UI, 'open' or 'close'.
 */
function init (headerEl, {searchState = undefined} = {}) {
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

	const toggles = [];
	for (let i = 0, len = controls.length; i < len; i++) {
		toggles.push(new Toggle(controls[i], { target, callback }));
	}

	if (searchState === 'open' || searchState === 'close') {
		// toggles are guaranteed, as we check for controls
		toggles[0].target[searchState]();
	}
}

export { init };
export default { init };
