import * as oUtils from 'o-utils';

function init(headerEl) {
	const subnav = headerEl.querySelector('[data-o-header-subnav]');

	if (subnav === null) {
		return;
	}

	const wrapper = subnav.querySelector('[data-o-header-subnav-wrapper]');
	const buttons = Array.from(subnav.getElementsByTagName('button'));

	let scrollWidth;
	let clientWidth;

	function direction(button) {
		return button.className.match(/left|right/).pop();
	}

	function scrollable() {
		scrollWidth = wrapper.scrollWidth;
		clientWidth = wrapper.clientWidth;

		buttons.forEach(button => {
			if (direction(button) === 'left') {
				button.disabled = wrapper.scrollLeft === 0;
			} else {
				const remaining = scrollWidth - clientWidth - wrapper.scrollLeft;
				// Allow a little difference as scrollWidth is fast, not accurate.
				button.disabled = remaining <= 1;
			}
		});
	}

	function scroll(e) {
		let distance = 100;

		if (direction(e.currentTarget) === 'left') {
			distance = (wrapper.scrollLeft > distance ? distance : wrapper.scrollLeft) * -1;
		} else {
			const remaining = scrollWidth - clientWidth - wrapper.scrollLeft;
			distance = remaining > distance ? distance : remaining;
		}

		wrapper.scrollLeft = wrapper.scrollLeft + distance;

		scrollable();
	}

	wrapper.addEventListener('scroll', oUtils.throttle(scrollable, 100));
	window.addEventListener('oViewport.resize', scrollable);

	buttons.forEach(button => {
		button.onclick = scroll;
	});

	scrollable();
}

export default { init };
