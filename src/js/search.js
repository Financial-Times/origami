import Toggle from 'o-toggle';

function init () {
	const target = document.getElementById('o-header-search');
	const controls = target && document.querySelectorAll(`[aria-controls="${target.id}"]`);

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
			opening.length && opening.pop().focus();
		}
	};

	for (let i = 0, len = controls.length; i < len; i++) {
		new Toggle(controls[i], { target, callback });
	}
}

export default { init };
