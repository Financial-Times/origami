const defaultHeaderClassName = 'o-header';

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
	constructor(headerEl, config = {headerClassName: defaultHeaderClassName}) {
		this.listeners = [];
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
		const selectableEls = headerEl.querySelectorAll('[data-o-header-selectable]');

		const selectableHandler = (ev) => {
			for (let selectableEl of selectableEls) {
				selectableEl.setAttribute('aria-selected', 'false');
			}
			ev.currentTarget.setAttribute('aria-selected', 'true');
		};

		for (let selectableEl of selectableEls) {
			this.listeners.push([selectableEl, selectableHandler]);
			selectableEl.addEventListener('click', selectableHandler);
		}
	}

	preventScroll(headerEl, config = {headerClassName: defaultHeaderClassName}) {
		const subNavToggle = headerEl.querySelector('[data-o-header-togglable-nav]');

		if (subNavToggle) {
			const subNavToggleHandler = () => {
				const navOpenClass = `${config.headerClassName}--mega-nav-open`;
				document.documentElement.classList.toggle(navOpenClass);
				document.querySelector('body').classList.toggle(navOpenClass);
			};

			this.listeners.push(subNavToggle, subNavToggleHandler);
			subNavToggle.addEventListener('click', subNavToggleHandler);
		}
	}

	toggle(headerEl) {
		const toggleEls = headerEl.querySelectorAll('[data-o-header-togglable]');

		for (let toggleEl of toggleEls) {
			const toggleHandler = () => {
				const toggleElState = toggleEl.getAttribute('aria-pressed');
				if (toggleElState === 'true') {
					toggleEl.setAttribute('aria-pressed', 'false');
				} else if (toggleElState === 'false' || !toggleElState) {
					toggleEl.setAttribute('aria-pressed', 'true');
				}
			};

			this.listeners.push([toggleEl, toggleHandler]);

			toggleEl.addEventListener('click', toggleHandler);
		}
	}

	destroy() {
		for (let listener of this.listeners) {
			listener[0].removeEventListener('click', listener[1]);
		}
		this.listeners = [];
	}
}


export default Utils;
