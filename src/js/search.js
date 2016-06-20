import toggle from './toggle';

function init () {
	const opening = [];
	const search = document.getElementById('o-header-search');
	const controls = search && document.querySelectorAll(`[aria-controls="${search.id}"]`);

	controls && toggle(controls, search, function (e, state) {
		if (state === 'open') {
			// record the opening control
			opening.push(e.currentTarget);
			search.querySelector('[name="q"]').focus();
		} else {
			// re-focus opening control
			opening.length && opening.pop().focus();
		}
	});
}

export default { init };
