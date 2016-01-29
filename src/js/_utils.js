import Delegate from 'ftdomdelegate';

function getNonMatcher(container) {
	if (typeof container === 'string') {
		return function (el) {
			return el && el !== document && !el.matches(container);
		};
	}

	return function (el) {
		return el && el !== document && el !== container;
	};
}

class Utils {
	constructor(headerEl, config = {headerClassName: 'o-header'}) {
		this.delegate = new Delegate(headerEl);
		this.selected(headerEl);
		this.preventScroll(headerEl, config);
		this.toggle(headerEl);
	}

	static isOutside(el, container) {
		const doesntMatch = getNonMatcher(container);

		while (doesntMatch(el)) {
			el = el.parentNode;
		}

		return !el || el === document;
	}

	selected(headerEl) {
		const selectAttribute = '[data-o-header-selectable]';
		this.delegate.on('click', selectAttribute, (ev, selectable) => {
			for (let selectableEl of headerEl.querySelectorAll(selectAttribute)) {
				selectableEl.setAttribute('aria-selected', 'false');
			}
			selectable.setAttribute('aria-selected', 'true');
		});
	}

	preventScroll(headerEl, config = {headerClassName: 'o-header'}) {
		const subNavToggle = headerEl.querySelector('[data-o-header-togglable-nav]');

		if (subNavToggle) {
			subNavToggle.addEventListener('click', () => {
				const navOpenClass = `${config.headerClassName}--open`;
				document.documentElement.classList.toggle(navOpenClass);
				document.querySelector('body').classList.toggle(navOpenClass);
			});
		}
	}

	toggle(headerEl) {
		const toggleAttribute = '[data-o-header-togglable]';
		this.delegate.on('click', toggleAttribute, (ev, togglerEl) => {
			const togglerElState = togglerEl.getAttribute('aria-pressed');
			if (togglerElState === 'true') {
				togglerEl.setAttribute('aria-pressed', 'false');
			} else if (togglerElState === 'false' || !togglerElState) {
				togglerEl.setAttribute('aria-pressed', 'true');
			}
		});
	}

	static init(headerEl, config = {headerClassName: 'o-header'}) {
		new Utils(headerEl, config);
	}
}


export default Utils;
