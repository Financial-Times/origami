import viewport from '@financial-times/o-viewport';
import * as oUtils from '@financial-times/o-utils';

function init(headerEl) {
	const subnav = headerEl.querySelector('[data-o-header-subnav]');

	if (subnav === null) {
		return;
	}

	// Looks like we can't remove this on destroy,
	// as another component may be using it.
	viewport.listenTo('resize');

	const buttons = Array.from(subnav.getElementsByTagName('button'));
	const wrapper = subnav.querySelector('[data-o-header-subnav-wrapper]');

	function checkCurrentPosition() {
		const wrapperWidth = wrapper.clientWidth;
		const currentSelection = wrapper.querySelector('[aria-current]');

		if (currentSelection) {
			const wrapperRect = wrapper.getBoundingClientRect();
			const currentSelectionRect = currentSelection.getBoundingClientRect();
			const currentSelectionEnd = currentSelectionRect.right - wrapperRect.left;

			//if the current selection is wider than the end of the wrapper
			if (currentSelectionEnd > wrapperWidth) {
				const RIGHT_ARROW_BUTTON_OFFSET = 25;

				//calculate offscreen distance of the selected item and include buffer for the right arrow button
				const scrollDistance =
					currentSelectionEnd - wrapperWidth + RIGHT_ARROW_BUTTON_OFFSET;

				wrapper.scrollTo(scrollDistance, 0);
			}
		}
		scrollable();
	}

	function direction(button) {
		return button.className.match(/left|right/).pop();
	}

	function scrollable() {
		const scrollWidth = wrapper.scrollWidth;
		const wrapperWidth = wrapper.clientWidth;

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
		const scrollWidth = wrapper.scrollWidth;
		const wrapperWidth = wrapper.clientWidth;

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

	const observer = new MutationObserver(checkCurrentPosition);
	observer.observe(wrapper, {
		attributes: false,
		childList: true,
		subtree: true
	});

	buttons.forEach(button => {
		button.onclick = scroll;
	});

	checkCurrentPosition();
}

export { init };
export default { init };
