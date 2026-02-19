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

		positionDropdown(dropdown, parent);

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

function positionDropdown(dropdown, hoverTarget) {
	if (!hoverTarget) {
		return;
	}
	
	const targetRect = hoverTarget.getBoundingClientRect();
	const viewportHeight = window.innerHeight;
	const viewportWidth = window.innerWidth;
	
	const dropdownWidth = 300;
	const dropdownHeight = 200;

	let top = targetRect.bottom;
	let left = targetRect.left;

	if (left + dropdownWidth > viewportWidth) {
		left = Math.max(10, viewportWidth - dropdownWidth - 10);
	}

	if (top + dropdownHeight > viewportHeight) {
		top = targetRect.top - dropdownHeight;
	}

	dropdown.style.position = 'fixed';
	dropdown.style.top = `${top}px`;
	dropdown.style.left = `${left}px`;
	dropdown.style.zIndex = '10000';
	dropdown.style.transform = 'none';
	dropdown.style.right = 'auto';
	dropdown.style.bottom = 'auto';
	dropdown.style.margin = '0';
	
	dropdown.offsetHeight;
}

function showDropdown(dropdown, animate) {
	if (animate) {
		dropdown.classList.add('o-header__subnav-dropdown--animation');
	}

	dropdown.setAttribute('aria-hidden', 'false');
	dropdown.setAttribute('aria-expanded', 'true');
	dropdown.style.display = 'block';
		
	dropdown.dispatchEvent(new CustomEvent('oHeader.SubnavDropdownShow', { bubbles: true }));

	expandedDropdowns.push(dropdown);
}

function hideDropdown(dropdown) {
	dropdown.classList.remove('o-header__subnav-dropdown--animation');
	dropdown.setAttribute('aria-hidden', 'true');
	dropdown.setAttribute('aria-expanded', 'false');
	dropdown.style.display = 'none';

	dropdown.dispatchEvent(new CustomEvent('oHeader.SubnavDropdownHide', { bubbles: true }));

	expandedDropdowns.splice(expandedDropdowns.indexOf(dropdown), 1);
}

function initSubnavDropdowns(headerEl) {
	const dropdowns = Array.from(headerEl.querySelectorAll('[data-o-header-subnav-dropdown]'));
	const parents = dropdowns.map(dropdown => dropdown.parentNode);

	parents.forEach((parent, i) => addDropdownEvents(parent, dropdowns[i]));
}

export { initSubnavDropdowns, showDropdown, hideDropdown };
export default { initSubnavDropdowns, showDropdown, hideDropdown };
