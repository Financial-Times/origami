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
		timeout = setTimeout(callback, INTENT_DELAY);
	};

	const removeEvents = () => {
		clearTimeout(timeout);

		scope.removeEventListener('mouseenter', handleMouseenter);
		scope.removeEventListener('mouseleave', handleMouseleave);
		document.removeEventListener('click', handleClick);
		document.removeEventListener('touchstart', handleClick);
		document.removeEventListener('keydown', handleKeydown);
	};

	const addEvents = () => {
		scope.addEventListener('mouseenter', handleMouseenter);
		scope.addEventListener('mouseleave', handleMouseleave);
		document.addEventListener('click', handleClick);
		document.addEventListener('touchstart', handleClick);
		document.addEventListener('keydown', handleKeydown);
	};

	return { addEvents, removeEvents };
}

function addDrawerToggles (drawerEl) {
	const controls = [...document.body.querySelectorAll(`[aria-controls="${drawerEl.id}"]`)];

	let handleClose;
	function toggleCallback(state) {
		if (state === 'close') {
			handleClose.removeEvents();
		} else {
			// don't capture the initial click or accidental double taps etc.
			// we could use transitionend but scoping is tricky and it needs prefixing and...
			setTimeout(handleClose.addEvents, LISTEN_DELAY);
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

function appendUserDetail (target) {
	return fetch('https://session-next.ft.com/', {
		credentials: 'include'
	})
	.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			return response.text().then((err) => { throw new Error(err); });
		}
	})
	.then((data) => {
		target.innerText = data.emailAddress;
	});
}

function init () {
	const drawerEl = document.body.querySelector('[data-o-header-drawer]');
	if (!drawerEl) {
		return;
	}
	addSubmenuToggles(drawerEl);
	addDrawerToggles(drawerEl);

	const emailEl = drawerEl.querySelector('[data-o-header-drawer-user-email]');

	// if the browser doesn't support CORS then bail
	if (emailEl && ('withCredentials' in new XMLHttpRequest())) {
		appendUserDetail(emailEl);
	}

	drawerEl.removeAttribute('data-o-header-drawer--no-js');
	drawerEl.setAttribute('data-o-header-drawer--js', 'true');
}

export default { init };
