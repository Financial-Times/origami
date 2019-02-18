import * as oUtils from 'o-utils';

function init(headerEl) {
	const subnav = headerEl.querySelector('[data-o-header-subnav]');

	if (subnav === null) {
		return;
	}

	const buttons = Array.from(subnav.getElementsByTagName('button'));
	const wrapper = subnav.querySelector('[data-o-header-subnav-wrapper]');

	let scrollWidth;
	let wrapperWidth = wrapper.clientWidth;

	function checkCurrentPosition() {
		const currentSelection = wrapper.querySelector('[aria-current]');
		if (currentSelection) {
			let currentSelectionEnd = currentSelection.getBoundingClientRect().right;

			//if the current selection is wider than the end of the wrapper
			if (currentSelectionEnd > wrapperWidth) {
				// check by how much
				let diff = currentSelectionEnd - wrapperWidth;
				// if the difference is greater than half of the wrapper, scroll to the end of the current selection.
				diff = (diff > wrapperWidth / 2) ? currentSelectionEnd : wrapperWidth / 2;

				wrapper.scrollTo(diff, 0);
			}
		}
		scrollable();
	}

	function direction(button) {
		return button.className.match(/left|right/).pop();
	}

	function scrollable() {
		scrollWidth = wrapper.scrollWidth;

		buttons.forEach(button => {
			if (direction(button) === 'left') {
				button.disabled = wrapper.scrollLeft === 0;
			} else {
				const remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
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
			const remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
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

	checkCurrentPosition();
}

export { init };
export default { init };
