const defaultHeaderClassName = 'o-header';

function getNonMatcher(container) {
	if (typeof container === 'string') {
		return (el) => {
			return el && el !== document && !el.matches(container);
		};
	}

	return (el) => {
		return el && el !== document && el !== container;
	};
}

class Utils {
	constructor(headerEl, config = {headerClassName: defaultHeaderClassName}) {
		this.listeners = [];
		this.navOpenClass = `${config.headerClassName}--mega-nav-open`;
		this.headerEl = headerEl;

		const selectableEls = this.headerEl.querySelectorAll('[data-o-header-selectable]');
		this.selectableHandler = this.selectableHandler.bind(this);
		for (let selectableEl of selectableEls) {
			this.listeners.push([selectableEl, this.selectableHandler]);
			selectableEl.addEventListener('click', this.selectableHandler);
		}

		const subNavToggle = this.headerEl.querySelector('[data-o-header-togglable-nav]');
		if (subNavToggle) {
			this.listeners.push([subNavToggle, this.subNavToggleHandler]);
			subNavToggle.addEventListener('click', this.subNavToggleHandler);
		}

		const toggleEls = this.headerEl.querySelectorAll('[data-o-header-togglable]');
		for (let toggleEl of toggleEls) {
			this.listeners.push([toggleEl, this.toggleHandler]);
			toggleEl.addEventListener('click', this.toggleHandler);
		}
	}

	selectableHandler(ev) {
		const selectableEls = this.headerEl.querySelectorAll('[data-o-header-selectable]');
		for (let selectableEl of selectableEls) {
			selectableEl.setAttribute('aria-selected', 'false');
		}
		ev.currentTarget.setAttribute('aria-selected', 'true');
	}

	subNavToggleHandler() {
		document.documentElement.classList.toggle(this.navOpenClass);
		document.body.classList.toggle(this.navOpenClass);
	}

	toggleHandler(ev) {
		const toggleElState = ev.currentTarget.getAttribute('aria-pressed');
		if (toggleElState === 'true') {
			ev.currentTarget.setAttribute('aria-pressed', 'false');
		} else if (toggleElState === 'false' || !toggleElState) {
			ev.currentTarget.setAttribute('aria-pressed', 'true');
		}
	}

	destroy() {
		for (let listener of this.listeners) {
			listener[0].removeEventListener('click', listener[1]);
		}
		delete this.listeners;
		delete this.navOpenClass;
		delete this.headerEl;
	}

	static isOutside(el, container) {
		const doesntMatch = getNonMatcher(container);

		while (doesntMatch(el)) {
			el = el.parentNode;
		}

		return !el || el === document;
	}
}


export default Utils;
