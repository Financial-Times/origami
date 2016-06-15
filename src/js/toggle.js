export default function (buttons, target, callback) {
	buttons = buttons.length === undefined ? [ buttons ] : Array.from(buttons);

	const toggle = function (e) {
		const state = target.classList.toggle('is-active');

		buttons.forEach(function (button) {
			button.setAttribute('aria-expanded', state);
		});

		target.setAttribute('aria-hidden', !state);

		e && e.preventDefault();
		callback && callback(e, state ? 'open' : 'close');
	};

	buttons.forEach(function (button) {
		if (button.nodeName === 'A') {
			button.setAttribute('role', 'button');
		}

		button.setAttribute('aria-expanded', 'false');
		button.addEventListener('click', toggle);
	});

	target.setAttribute('aria-hidden', 'true');

	return toggle;
};
