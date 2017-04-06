import Toggle from 'o-toggle';

const LISTEN_DELAY = 300;
const INTENT_DELAY = 1000;

function handleCloseEvents (scope, callback) {
	let timeout;

	const handleKeydown = (e) => {
		if (e.keyCode === 27) {
			callback();
		}
	};

	const handleClick = (e) => {
		if (!scope.contains(e.target)) {
			callback();
		}
	};

	const handleMouseenter = () => {
		clearTimeout(timeout);
	};

	const handleMouseleave = () => {
		// IE 11 mobile fires a mouseleave event when the search box gets focus. This means when the user tries
		// to use the search box, it disappears because the drawer closes.
		// Mouseout events should only occur when the drawer takes up less than 100% of the window, so we can ignore
		// any events triggered if the width of the drawer is equal to or bigger than the window.innerwidth
		if (window.innerWidth >= scope.offsetWidth) {
			timeout = setTimeout(callback, INTENT_DELAY);
		}
	};

	const handleFocus = (e) => {
		const target = e.relatedTarget || e.target;

		if (!scope.contains(target)) {
			scope.focus();
		}
	};

	const removeEvents = () => {
		clearTimeout(timeout);

		scope.removeEventListener('mouseenter', handleMouseenter);
		scope.removeEventListener('mouseleave', handleMouseleave);
		document.removeEventListener('click', handleClick);
		document.removeEventListener('touchstart', handleClick);
		document.removeEventListener('keydown', handleKeydown);
		document.removeEventListener('focusin', handleFocus);
		document.removeEventListener('focusout', handleFocus);
	};

	const addEvents = () => {
		scope.addEventListener('mouseenter', handleMouseenter);
		scope.addEventListener('mouseleave', handleMouseleave);
		document.addEventListener('click', handleClick);
		document.addEventListener('touchstart', handleClick);
		document.addEventListener('keydown', handleKeydown);

		// Firefox doesn't support focusin or focusout
		// https://bugzilla.mozilla.org/show_bug.cgi?id=687787
		document.addEventListener('focusin', handleFocus);
		document.addEventListener('focusout', handleFocus);
	};

	return { addEvents, removeEvents, handleMouseleave };
}

function addDrawerToggles (drawerEl) {
	const controls = [...document.body.querySelectorAll(`[aria-controls="${drawerEl.id}"]`)];

	let handleClose;
	let openingControl;

	function toggleCallback (state, e) {
		if (state === 'close') {
			handleClose.removeEvents();

			openingControl.focus();
		} else {
			// don't capture the initial click or accidental double taps etc.
			// we could use transitionend but scoping is tricky and it needs prefixing and...
			setTimeout(handleClose.addEvents, LISTEN_DELAY);

			// record the opening control so we can send focus back to it when closing the drawer
			openingControl = e.currentTarget;

			// aria-controls is only supported by JAWS.
			// In a setTimeout callback to avoid flickering transitions in Chrome (v54)
			setTimeout(() => {
				// Don't focus on the drawer itself or iOS VoiceOver will miss it
				// Focus on the first focusable element
				const firstFocusable = drawerEl.querySelector('a, button, input, select');

				if (firstFocusable) {
					firstFocusable.focus();
				}
				else {
					drawerEl.focus();
				}
			});
		}

		drawerEl.classList.toggle('o-header__drawer--closing', state === 'close');
		drawerEl.classList.toggle('o-header__drawer--opening', state === 'open');
	}

	controls.forEach((control) => {
		const drawerToggle = new Toggle(control, {
			target: drawerEl,
			callback: toggleCallback
		});

		// Both toggles have the same target, so the toggle function will be the same
		// If there's a separate handleClose instance for each toggle, removeEvents doesn't work
		// when the close toggle is clicked
		if (!handleClose) {
			handleClose = handleCloseEvents(drawerEl, drawerToggle.toggle);
		}
	});

	// make the drawer programmatically focusable
	drawerEl.tabIndex = -1;
}

function addSubmenuToggles (drawerEl) {
	const submenus = drawerEl.querySelectorAll('[id^="o-header-drawer-child-"]');

	Array.from(submenus).forEach(submenu => {
		const button = drawerEl.querySelector(`[aria-controls="${submenu.id}"]`);

		submenu.setAttribute('aria-hidden', 'true');

		new Toggle(button, {
			target: submenu,
			callback: (state) => {
				button.textContent = button.textContent.replace(/fewer|more/, state === 'open' ? 'fewer' : 'more');
			}
		});
	});
}

function init () {
	const drawerEl = document.body.querySelector('[data-o-header-drawer]');
	if (!drawerEl) {
		return;
	}
	addSubmenuToggles(drawerEl);
	addDrawerToggles(drawerEl);

	drawerEl.removeAttribute('data-o-header-drawer--no-js');
	drawerEl.setAttribute('data-o-header-drawer--js', 'true');
}

export default { init, handleCloseEvents };
