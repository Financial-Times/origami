import utils from './_utils';

const defaultClassName = 'o-header__edition-switch';
class EditionSwitcher {
	constructor(headerEl, config = {editionswitchClassName: defaultClassName}) {
		this.editionSwitcherEl = headerEl.querySelector(`.${config.editionswitchClassName}`);
		if (!this.editionSwitcherEl) {
			return;
		}

		this.editionSwitchContainerEl = this.editionSwitcherEl.querySelector('#o-header__edition-switch-container');
		const btnEl = (this.editionSwitcherEl) ? this.editionSwitcherEl.querySelector('[data-o-header-edition-switch-button]') : null;
		if (!btnEl) {
			return;
		}

		this.openClass = `${config.editionswitchClassName}--open`;
		this.isOpen = false;
		btnEl.addEventListener('click', this.toggle.bind(this));
		document.body.addEventListener('click', this.click.bind(this));
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

	static init(headerEl, config = {editionswitchClassName: defaultClassName}) {
		new EditionSwitcher(headerEl, config);
	}
}

export default EditionSwitcher;
