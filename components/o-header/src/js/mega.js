const INTENT_ENTER = 300;
const INTENT_LEAVE = 400;

const expanded = [];

function addEvents (parent, menu) {
	let timeout;

	parent.addEventListener('mouseenter', () => {
		clearTimeout(timeout);

		if (isOpen(menu)) {
			return;
		}

		timeout = setTimeout(() => {
			if (expanded.length) {
				hide(expanded[0]);
				show(menu, false);
			} else {
				show(menu, true);
			}
		}, INTENT_ENTER);
	});

	parent.addEventListener('mouseleave', () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => isOpen(menu) && hide(menu), INTENT_LEAVE);
	});
}

function isOpen (menu) {
	return expanded.indexOf(menu) !== -1;
}

function show (menu, animate) {
	if (animate) {
		menu.classList.add('o-header__mega--animation');
	}

	menu.setAttribute('aria-hidden', 'false');
	menu.setAttribute('aria-expanded', 'true');

	menu.dispatchEvent(new CustomEvent('oHeader.MegaMenuShow', { bubbles: true }));

	expanded.push(menu);
}

function hide (menu) {
	menu.classList.remove('o-header__mega--animation');
	menu.setAttribute('aria-hidden', 'true');
	menu.setAttribute('aria-expanded', 'false');

	menu.dispatchEvent(new CustomEvent('oHeader.MegaMenuHide', { bubbles: true }));

	expanded.splice(expanded.indexOf(menu), 1);
}

function init (headerEl) {
	const menus = Array.from(headerEl.querySelectorAll('[data-o-header-mega]'));
	const parents = menus.map(menu => menu.parentNode);

	menus.forEach(menu => {
		menu.setAttribute('aria-hidden', 'true');
		menu.setAttribute('aria-expanded', 'false');
	});

	parents.forEach((parent, i) => addEvents(parent, menus[i]));
}

export { init, show, hide };
export default { init, show, hide };
