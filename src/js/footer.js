import Toggle from 'o-toggle';
import layout from './layout.js';


const COLLAPSIBLE_BREAKPOINTS = ['default', 'XS', 'S'];

class Footer {

	constructor (footerEl) {
		if (!footerEl) {
			footerEl = document.querySelector('[data-o-component="o-footer"]');
		} else if (typeof footerEl === 'string') {
			footerEl = document.querySelector(footerEl);
		}

		this.footerEl = footerEl;

		layout(breakpoint => {
			const shouldCollapse = Footer.shouldCollapse(breakpoint);

			if (shouldCollapse && !this._toggles) {
				return this.setup();
			}

			if (!shouldCollapse && this._toggles) {
				return this.destroy();
			}
		});

		this.footerEl.removeAttribute('data-o-footer--no-js');
		this.footerEl.setAttribute('data-o-footer--js', '');
	}

	setup () {
		this._toggles = [];

		const toggleEls = this.footerEl.querySelectorAll('[aria-controls]');

		Array.prototype.forEach.call(toggleEls, toggleEl => {
			const target = document.getElementById(toggleEl.getAttribute('aria-controls'));
			toggleEl.setAttribute('role', 'button');
			toggleEl.setAttribute('tabindex', '0');
			this._toggles.push(new Toggle(toggleEl, { target }));
		});
	}

	destroy () {
		this._toggles.forEach(toggle => toggle.destroy());
		this._toggles = null;
	}

	static get collapsibleBreakpoints(){
		return COLLAPSIBLE_BREAKPOINTS;
	}

	static shouldCollapse(breakpoint) {
		return COLLAPSIBLE_BREAKPOINTS.indexOf(breakpoint) !== -1;
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const footerEl = rootEl.querySelector('[data-o-component="o-footer"]');

		if (footerEl) {
			return new Footer(footerEl);
		}
	}
}

export default Footer;
