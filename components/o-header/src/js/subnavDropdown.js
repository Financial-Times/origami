const INTENT_ENTER = 300;
const INTENT_LEAVE = 400;
const DEFAULT_DROPDOWN_WIDTH = 285;
const POSITIONING_OFFSET = 8;

const expandedDropdowns = new Set();
const keydownHandlers = new WeakMap();
let scrollListenerAdded = false;

function handleScroll() {
	expandedDropdowns.forEach(dropdown => {
		const parent = dropdown.parentNode;
		positionDropdown(dropdown, parent);
	});
}

function getDropdownKeydownHandler(dropdown) {
	return (event) => {
		const key = event.key;

		if (key === 'Escape' && isDropdownOpen(dropdown)) {
			hideDropdown(dropdown);
		}
	};
}

function addDropdownEvents(parent, dropdown) {
	let timeout;
	const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

	if (isDesktop) {
		parent.addEventListener('mouseenter', () => {
			clearTimeout(timeout);

			if (isDropdownOpen(dropdown)) {
				return;
			}

			positionDropdown(dropdown, parent);

			timeout = setTimeout(() => {
				if (expandedDropdowns.size > 0) {
					closeAllDropdowns();
				}
				showDropdown(dropdown, true);
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
	} else {
		// For Mobile: click/tap events
		parent.addEventListener('click', () => {
			if (!isDropdownOpen(dropdown)) {
				if (expandedDropdowns.size > 0) {
					closeAllDropdowns();
				}
				showDropdown(dropdown, false);
			}
		});
	}

	const handleKeydown = (event) => {
		const key = event.key;

		if (key === 'Escape' && isDropdownOpen(dropdown)) {
			hideDropdown(dropdown);
		}
	};

	keydownHandlers.set(dropdown, handleKeydown);
	document.addEventListener('keydown', handleKeydown);

	const closeButton = dropdown.querySelector('[data-o-header-subnav-dropdown-close]');
	if (closeButton) {
		closeButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			hideDropdown(dropdown);
		});
	}
}

function closeAllDropdowns() {
	const dropdownsToClose = new Set(expandedDropdowns);
	dropdownsToClose.forEach(hideDropdown);
}

function isDropdownOpen(dropdown) {
	return expandedDropdowns.has(dropdown);
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

function showDropdown(dropdown, isDesktop) {
	dropdown.setAttribute('aria-hidden', 'false');
	dropdown.setAttribute('aria-expanded', 'true');
	dropdown.style.display = 'block';
		
	expandedDropdowns.add(dropdown);

	if (!scrollListenerAdded && isDesktop) {
		window.addEventListener('scroll', handleScroll, true);
		scrollListenerAdded = true;
	}

	const keydownHandler = getDropdownKeydownHandler(dropdown);
	keydownHandlers.set(dropdown, keydownHandler);
	document.addEventListener('keydown', keydownHandler);
}

function hideDropdown(dropdown) {
	dropdown.setAttribute('aria-hidden', 'true');
	dropdown.setAttribute('aria-expanded', 'false');
	dropdown.style.display = 'none';

	expandedDropdowns.delete(dropdown);

	const keydownListener = keydownHandlers.get(dropdown);
	if (keydownListener) {
		document.removeEventListener('keydown', keydownListener);
		keydownHandlers.delete(dropdown);
	}

	if (expandedDropdowns.size === 0 && scrollListenerAdded) {
		window.removeEventListener('scroll', handleScroll, true);
		scrollListenerAdded = false;
	}
}

function initSubnavDropdowns(headerEl) {
	const dropdowns = Array.from(headerEl.querySelectorAll('[data-o-header-subnav-dropdown]'));
	const parents = dropdowns.map(dropdown => dropdown.parentNode);

	parents.forEach((parent, i) => addDropdownEvents(parent, dropdowns[i]));
}

export { initSubnavDropdowns };
export default { initSubnavDropdowns };
