const INTENT_ENTER = 300;
const INTENT_LEAVE = 400;

const expandedDropdowns = [];
let scrollListenerAdded = false;

function handleScroll() {
	expandedDropdowns.forEach(dropdown => {
		const parent = dropdown.parentNode;
		positionDropdown(dropdown, parent);
	});
}

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
	const viewportWidth = window.innerWidth;
	
	const dropdownWidth = 285;

	let top = targetRect.bottom + 8;
	let left = targetRect.left;

	if (left + dropdownWidth > viewportWidth) {
		left = Math.max(8, viewportWidth - dropdownWidth - 8);
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
		
	expandedDropdowns.push(dropdown);

	if (!scrollListenerAdded) {
		window.addEventListener('scroll', handleScroll, true);
		scrollListenerAdded = true;
	}
}

function hideDropdown(dropdown) {
	dropdown.classList.remove('o-header__subnav-dropdown--animation');
	dropdown.setAttribute('aria-hidden', 'true');
	dropdown.setAttribute('aria-expanded', 'false');
	dropdown.style.display = 'none';

	expandedDropdowns.splice(expandedDropdowns.indexOf(dropdown), 1);

	if (expandedDropdowns.length === 0 && scrollListenerAdded) {
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
