import viewport from '@financial-times/o-viewport';
import * as oUtils from '@financial-times/o-utils';

const INTENT_ENTER = 300;
const INTENT_LEAVE = 400;

const expandedDropdowns = [];

function addDropdownEvents(parent, dropdown) {
	let timeout;

	parent.addEventListener('mouseenter', () => {
		clearTimeout(timeout);

		if (isDropdownOpen(dropdown)) {
			return;
		}

		timeout = setTimeout(() => {
			if (expandedDropdowns.length) {
				hideDropdown(expandedDropdowns[0]);
				showDropdown(dropdown, false);
			} else {
				showDropdown(dropdown, true);
			}
		}, INTENT_ENTER);
	});

	const handleKeydown = (event) => {
		const key = event.key || event.keyCode;

		// Internet Explorer 11 incorrectly maps the escape key to `Esc` instead of `Escape`
		if (key === 'Escape' || key === 'Esc' || key === 27) {
			if (isDropdownOpen(dropdown)) {
				hideDropdown(dropdown);
			}
		}
	};

	document.addEventListener('keydown', handleKeydown);

	parent.addEventListener('mouseleave', () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => isDropdownOpen(dropdown) && hideDropdown(dropdown), INTENT_LEAVE);
	});
}

function isDropdownOpen(dropdown) {
	return expandedDropdowns.indexOf(dropdown) !== -1;
}

function showDropdown(dropdown, animate) {
	if (animate) {
		dropdown.classList.add('o-header__subnav-dropdown--animation');
	}

	dropdown.setAttribute('aria-hidden', 'false');
	dropdown.setAttribute('aria-expanded', 'true');

	dropdown.dispatchEvent(new CustomEvent('oHeader.SubnavDropdownShow', { bubbles: true }));

	expandedDropdowns.push(dropdown);
}

function hideDropdown(dropdown) {
	dropdown.classList.remove('o-header__subnav-dropdown--animation');
	dropdown.setAttribute('aria-hidden', 'true');
	dropdown.setAttribute('aria-expanded', 'false');

	dropdown.dispatchEvent(new CustomEvent('oHeader.SubnavDropdownHide', { bubbles: true }));

	expandedDropdowns.splice(expandedDropdowns.indexOf(dropdown), 1);
}

function initSubnavDropdowns(headerEl) {
	const dropdowns = Array.from(headerEl.querySelectorAll('[data-o-header-subnav-dropdown]'));
	const parents = dropdowns.map(dropdown => dropdown.parentNode);

	dropdowns.forEach(dropdown => {
		dropdown.setAttribute('aria-hidden', 'true');
		dropdown.setAttribute('aria-expanded', 'false');
	});

	parents.forEach((parent, i) => addDropdownEvents(parent, dropdowns[i]));
}

function addHandlersForSubnavItems() {
	const subnavItems = Array.from(subnav.getElementsByClassName('o-header__subnav-item'));
    subnavItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            console.log('mouseenter', e);
        });
		item.addEventListener('mouseleave', (e) => {
			console.log('mouseleave', e);
		});
    });
}

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

	addHandlersForSubnavItems();

	// Initialize subnav dropdown functionality
	initSubnavDropdowns(headerEl);

	checkCurrentPosition();
}

export { init, showDropdown, hideDropdown };
export default { init, showDropdown, hideDropdown };
