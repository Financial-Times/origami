import utils from './utils';

const defaultClassName = 'o-header__edition-switch';
class EditionSwitcher {
	constructor(headerEl, config = {editionswitchClassName: defaultClassName}) {
		this.editionSwitchEl = headerEl.querySelector(`.${config.editionswitchClassName}`);
		if (!this.editionSwitchEl) {
			return;
		}

		this.editionSwitchContainerEl = this.editionSwitchEl.querySelector('#o-header__edition-switch-container');
		this.btnEl = (this.editionSwitchEl) ? this.editionSwitchEl.querySelector('[data-o-header-edition-switch-button]') : null;
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
		this.editionSwitchEl.classList.toggle(this.openClass);

		if (this.isOpen) {
			this.btnEl.setAttribute('aria-expanded', 'true');
			this.editionSwitchContainerEl.setAttribute('aria-hidden', 'false');
		} else {
			this.btnEl.setAttribute('aria-expanded', 'false');
			this.editionSwitchContainerEl.setAttribute('aria-hidden', 'true');
		}
	}

	click(ev) {
		if (this.isOpen && utils.isOutside(ev.target, this.editionSwitchEl)) {
			this.toggle();
		}
	}

	destroy() {
		if (this.btnEl) {
			this.btnEl.removeEventListener('click', this.toggleHandler);
			document.body.removeEventListener('click', this.clickHandler);
		}

		delete this.isOpen;
		delete this.openClass;
		delete this.toggleHandler;
		delete this.clickHandler;
		delete this.btnEl;
		delete this.editionSwitchContainerEl;
		delete this.editionSwitchEl;
	}
}

export default EditionSwitcher;
