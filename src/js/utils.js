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

		const megaNavToggle = this.headerEl.querySelector('[data-o-header-togglable-nav]');
		if (megaNavToggle) {
			this.megaNavToggleHandler = this.megaNavToggleHandler.bind(this);
			this.listeners.push([megaNavToggle, this.megaNavToggleHandler]);
			megaNavToggle.addEventListener('click', this.megaNavToggleHandler);

			// Applies 'clear: both;' to the first element in each row
			// in the meganav so columns stay aligned. We want to
			// apply it to desktop only columns, which isn't possible
			// via CSS
			const megaNavSections = this.headerEl.querySelectorAll('.o-header__meganav-section');
			let megaNavSectionPosition = 1;
			for (let megaNavSection of megaNavSections) {
				if (!megaNavSection.classList.contains('o-header__meganav-section--mobile')) {
					// If it's the first element in the row, add 'clear: both;' and move to next column
					// If it's the last element in the row, reset for next row
					// If otherwise, move to next columnd
					switch (megaNavSectionPosition) {
						case 1:
							megaNavSection.style.clear = 'both';
							megaNavSectionPosition++;
							break;
						case 4:
							megaNavSectionPosition = 1;
							break
						default:
							megaNavSectionPosition++;
							break;
					}
				}
			}
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

	megaNavToggleHandler() {
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
		delete this.megaNavToggleHandler;
		delete this.selectableHandler;
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
