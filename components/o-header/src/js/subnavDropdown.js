/**
 * Subnav Dropdown
 *
 * This script controls the behaviour of subnavigation dropdown options where present.
 * Desktop:
 * 	- Shown when hovering over the appropriate subnav item
 * 	- Hidden when the cursor is moved away for a set duration
 * 	- Positioned relative to the designated item
 *
 * Mobile:
 * 	- Shown when the subnav item is tapped
 * 	- Positioned centrally with a close icon available
 * 	- Hidden when the close icon is tapped
 */

const INTENT_ENTER = 300;
const INTENT_LEAVE = 400;
const DEFAULT_DROPDOWN_WIDTH = 285;
const POSITIONING_OFFSET = 8;

const expandedDropdowns = new Set();
const dropdownEventListeners = new WeakMap();

function handleScroll() {
	expandedDropdowns.forEach(dropdown => {
		const parent = dropdown.parentNode;
		positionDropdown(dropdown, parent);
	});
}

function closeAllDropdowns() {
	const dropdownsToClose = new Set(expandedDropdowns);
	dropdownsToClose.forEach(hideDropdown);
}

function isDropdownOpen(dropdown) {
	return expandedDropdowns.has(dropdown);
}

function addDropdownControlEvents(dropdown, isDesktop) {
    const currentDropdownEventListeners = dropdownEventListeners.get(dropdown);
    if (currentDropdownEventListeners) return;

    const listeners = new Set();
    const registerListener = (target, type, callback) => {
        target.addEventListener(type, callback);
        listeners.add({ target, type, callback });
    };

    if (isDesktop) {
		// Dropdowns scroll with the user on desktop
        registerListener(window, 'scroll', handleScroll);
		
		const keydownHandler = (event) => {
			const key = event.key;

			if (key === 'Escape' && isDropdownOpen(dropdown)) {
				hideDropdown(dropdown);
			}
		}
    	registerListener(document, 'keydown', keydownHandler);
    } else {
		// The close button is only visible on mobile
        const closeButton = dropdown.querySelector('[data-o-header-subnav-dropdown-close]');
        if (closeButton) {
			const closeButtonSelectionHandler = (event) => {
				event.preventDefault();
				event.stopPropagation();
				hideDropdown(dropdown);
			};
			const closeButtonKeyboardHandler = (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					closeButtonSelectionHandler(event);
				}
			}
			registerListener(closeButton, 'click', closeButtonSelectionHandler);
			registerListener(closeButton, 'keydown', closeButtonKeyboardHandler);
        }
    }

    dropdownEventListeners.set(dropdown, listeners);
}

function removeDropdownControlEvents (dropdown) {
	const currentDropdownEventListeners = dropdownEventListeners.get(dropdown);
	currentDropdownEventListeners.forEach((listener) => {
		const { target, type, callback } = listener;
		target.removeEventListener(type, callback)
	})
	dropdownEventListeners.delete(dropdown);
}

function positionDropdown(dropdown, hoverTarget) {
	if (!hoverTarget) {
		return;
	}
	
	const targetRect = hoverTarget.getBoundingClientRect();
	const viewportWidth = window.innerWidth;
	
	const dropdownWidth = DEFAULT_DROPDOWN_WIDTH;

	let left = targetRect.left;

	if (left + dropdownWidth > viewportWidth) {
		left = Math.max(POSITIONING_OFFSET, viewportWidth - dropdownWidth - POSITIONING_OFFSET);
	}

	Object.assign(dropdown.style, {
		position: 'fixed',
		top: `${targetRect.bottom + POSITIONING_OFFSET}px`,
		left: `${left}px`,
		zIndex: '10000',
		transform: 'none',
		right: 'auto',
		bottom: 'auto',
		margin: '0'
	});
}

function showDropdown({ dropdown, isDesktop, parent }) {
	dropdown.setAttribute('aria-hidden', 'false');
	dropdown.setAttribute('aria-expanded', 'true');
	dropdown.style.display = 'block';
		
	expandedDropdowns.add(dropdown);

	if (isDesktop) {
		positionDropdown(dropdown, parent)
	}

	addDropdownControlEvents(dropdown, isDesktop)
}

function hideDropdown(dropdown) {
	dropdown.setAttribute('aria-hidden', 'true');
	dropdown.setAttribute('aria-expanded', 'false');
	dropdown.style.display = 'none';

	expandedDropdowns.delete(dropdown);

	removeDropdownControlEvents(dropdown)
}

function addDropdownShowHideEvents(parent, dropdown) {
	let timeout;
	const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	const openDropdown = () => {
		if (isDropdownOpen(dropdown)) return;

		if (expandedDropdowns.size > 0) {
			closeAllDropdowns();
		}
        showDropdown({ dropdown, isDesktop, parent });
	}

	if (isDesktop) {
		parent.addEventListener('mouseenter', () => {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				openDropdown();
			}, INTENT_ENTER);
		});

		parent.addEventListener('mouseleave', () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				if (isDropdownOpen(dropdown)) {
					hideDropdown(dropdown);
				}
			}, INTENT_LEAVE);
		});
	}

	parent.addEventListener('click', () => {
		openDropdown();
	});
}

function initSubnavDropdowns(subnav) {
	const dropdowns = Array.from(subnav.querySelectorAll('[data-o-header-subnav-dropdown]'));
	const parents = dropdowns.map(dropdown => dropdown.parentNode);

	parents.forEach((parent, i) => addDropdownShowHideEvents(parent, dropdowns[i]));
}

export { initSubnavDropdowns };
export default { initSubnavDropdowns };
