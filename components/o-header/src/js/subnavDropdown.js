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
const POSITIONING_OFFSET = 4;

const expandedDropdowns = new Set();
const dropdownEventListeners = new WeakMap();
const showHideEventListeners = new WeakMap();

const focusableElements = [
  'a[href]',
  'button:not([disabled])'
  ].join(',');

function getButtonForDropdown(dropdown) {
	return dropdown.parentNode.querySelector('[data-o-header-subnav-dropdown-button]')
}

function handleScroll() {
	expandedDropdowns.forEach(dropdown => {
		const button = getButtonForDropdown(dropdown);
		positionDropdown(dropdown, button);
	});
}

function closeAllDropdowns() {
	const dropdownsToClose = new Set(expandedDropdowns);
	dropdownsToClose.forEach((dropdown) => {
		const button = getButtonForDropdown(dropdown);
		hideDropdown(dropdown, button);
	});
}

function isDropdownOpen(dropdown) {
	return expandedDropdowns.has(dropdown);
}

function getFocusableElementsInDropdown(dropdown) {
return [...dropdown.querySelectorAll(focusableElements)]
    .filter(el => !el.hasAttribute('hidden') && el.offsetParent !== null);
}

function addDropdownControlEvents(dropdown, button, isDesktop) {
    const currentDropdownEventListeners = dropdownEventListeners.get(dropdown);
    if (currentDropdownEventListeners) return;

    const listeners = new Set();
    const registerListener = (target, type, callback) => {
        target.addEventListener(type, callback);
        listeners.add({ target, type, callback });
    };

	const keydownHandler = (event) => {
		const key = event.key;
		if (key === 'Escape' && isDropdownOpen(dropdown)) {
			hideDropdown(dropdown, button);
			button.focus();
		}

		if (key !== 'Tab') {
			return;
		}

		const focusTrapElements = getFocusableElementsInDropdown(dropdown);
		if (focusTrapElements.length === 0) { 
			event.preventDefault();
    		return;
  		}

		const firstElement = focusTrapElements[0];
		const lastElement = focusTrapElements[focusTrapElements.length - 1];
		if (event.shiftKey) {
			if (document.activeElement === firstElement || document.activeElement === dropdown) {
				event.preventDefault();
				lastElement.focus();
			}
		} else {
			if (document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}
	}
	registerListener(document, 'keydown', keydownHandler);

    if (isDesktop) {
		// Dropdowns scroll with the user on desktop
        registerListener(window, 'scroll', handleScroll);
    } else {
		// The close button is only visible on mobile
        const closeButton = dropdown.querySelector('[data-o-header-subnav-dropdown-close]');
        if (closeButton) {
            const closeButtonClickHandler = (event) => {
                event.preventDefault();
                event.stopPropagation();
                hideDropdown(dropdown, button);
				button.focus();			
            };
            registerListener(closeButton, 'click', closeButtonClickHandler);
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

function removeShowHideControlEvents (target) {
	const currentDropdownEventListeners = showHideEventListeners.get(target);
	currentDropdownEventListeners.forEach((listener) => {
		const { target, type, callback } = listener;
		target.removeEventListener(type, callback)
	})
	showHideEventListeners.delete(target);
}

function removeScrollLock () {
	document.body.classList.remove('o-header__subnav-dropdown-body-scroll-lock');
}

function addScrollLock () {
	document.body.classList.add('o-header__subnav-dropdown-body-scroll-lock');
}

function resetDropdownPosition(dropdown) {
	dropdown.style.removeProperty('top');
	dropdown.style.removeProperty('left');
	dropdown.style.removeProperty('zIndex');
	dropdown.style.removeProperty('transform');
	dropdown.style.removeProperty('right');
	dropdown.style.removeProperty('bottom');
	dropdown.style.removeProperty('margin');
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
		top: `${targetRect.bottom + POSITIONING_OFFSET}px`,
		left: `${left}px`,
		zIndex: '10000',
		transform: 'none',
		right: 'auto',
		bottom: 'auto',
		margin: '0'
	});
}

function showDropdown({ button, dropdown, isDesktop }) {
	button.setAttribute('aria-expanded', 'true');
	dropdown.style.display = 'block';
		
	expandedDropdowns.add(dropdown);

	if (isDesktop) {
		positionDropdown(dropdown, button)
	} else {
		addScrollLock();
	}

	addDropdownControlEvents(dropdown, button, isDesktop)
}

function hideDropdown(dropdown, button) {
	button.setAttribute('aria-expanded', 'false');
	dropdown.style.display = 'none';

	expandedDropdowns.delete(dropdown);
	removeScrollLock();

	removeDropdownControlEvents(dropdown)
}

function addDropdownShowHideEvents({ button, dropdown, parent, isDesktop }) {
	let timeout;
	const openDropdown = () => {
		if (isDropdownOpen(dropdown)) return;

		if (expandedDropdowns.size > 0) {
			closeAllDropdowns();
		}
        showDropdown({ button, dropdown, isDesktop });
	}

	const listeners = new Set();
    const registerListener = (target, type, callback) => {
        target.addEventListener(type, callback);
        listeners.add({ target, type, callback });
    };

	if (isDesktop) {
		const handleMouseEnter = () => {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				openDropdown();
				}, INTENT_ENTER);
		}
    	registerListener(parent, 'mouseenter', handleMouseEnter);

		const handleMouseLeave = () => {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				if (isDropdownOpen(dropdown)) {
					hideDropdown(dropdown, button);
				}
			}, INTENT_LEAVE);
		}
    	registerListener(parent, 'mouseleave', handleMouseLeave);
	} 

	const clickHandler = () => {
		openDropdown();
		const dropdownElements = getFocusableElementsInDropdown(dropdown);
		if (dropdownElements.length) {
			dropdownElements[0].focus();
		}
	};
	registerListener(button, 'click', clickHandler);

	showHideEventListeners.set(parent, listeners);
}

function initSubnavDropdowns(subnav) {
	const dropdownParents = Array.from(subnav.querySelectorAll('[data-o-header-subnav-dropdown-parent]'));

	const isDesktopQuery = window.matchMedia('(min-width: 740px)');
	
	isDesktopQuery.addEventListener('change', () => {
		dropdownParents.forEach((parent) => {
			removeShowHideControlEvents(parent);
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]')
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]')
			
			if (button.hasAttribute('aria-expanded')) {
				if (button.getAttribute('aria-expanded') === 'true') {
					hideDropdown(dropdown, button);
				}
			}
			resetDropdownPosition(dropdown);

			addDropdownShowHideEvents({ button, dropdown, parent, isDesktop: isDesktopQuery.matches })
		});
	});


	dropdownParents.forEach((parent) => {
		const button = parent.querySelector('[data-o-header-subnav-dropdown-button]')
		const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]')

		addDropdownShowHideEvents({ button, dropdown, parent, isDesktop: isDesktopQuery.matches })
	});
}

export { initSubnavDropdowns };
export default { initSubnavDropdowns };
