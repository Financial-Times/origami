import utils from './utils';

const defaultClassName = 'o-header__edition-switch';
class EditionSwitcher {
	constructor(headerEl, config = {editionswitchClassName: defaultClassName}) {
		this.editionSwitcherEl = headerEl.querySelector(`.${config.editionswitchClassName}`);
		if (!this.editionSwitcherEl) {
			return;
		}

		this.editionSwitchContainerEl = this.editionSwitcherEl.querySelector('#o-header__edition-switch-container');
		this.btnEl = (this.editionSwitcherEl) ? this.editionSwitcherEl.querySelector('[data-o-header-edition-switch-button]') : null;
		if (!this.btnEl) {
			return;
		}

		this.openClass = `${config.editionswitchClassName}--open`;
		this.isOpen = false;
		this.toggleHandler = this.toggle.bind(this);
		this.clickHandler = this.click.bind(this);

		this.btnEl.addEventListener('click', this.toggleHandler);
		document.body.addEventListener('click', this.clickHandler);
	}

	toggle() {
		this.isOpen = !this.isOpen;
		this.editionSwitcherEl.classList.toggle(this.openClass);

		if (this.isOpen) {
			this.editionSwitcherEl.setAttribute('aria-expanded', 'true');
			this.editionSwitchContainerEl.setAttribute('aria-hidden', 'false');
		} else {
			this.editionSwitcherEl.setAttribute('aria-expanded', 'false');
			this.editionSwitchContainerEl.setAttribute('aria-hidden', 'true');
		}
	}

	click(ev) {
		if (this.isOpen && utils.isOutside(ev.target, this.editionSwitcherEl)) {
			this.toggle();
		}
	}

	destroy() {
		this.btnEl.removeEventListener('click', this.toggleHandler);
		document.body.removeEventListener('click', this.clickHandler);
		delete this.isOpen;
		delete this.openClss;
		delete this.toggleHandler;
		delete this.clickHandler;
		delete this.btnEl;
		delete this.editionSwitchContainerEl;
		delete this.editionSwitcherEl;
	}
}

export default EditionSwitcher;
