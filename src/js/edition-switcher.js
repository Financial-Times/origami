import utils from './_utils';

const defaultClassName = 'o-header__edition-switch';
class EditionSwitcher {
	constructor(headerEl, config = {editionswitchClassName: defaultClassName}) {
		this.editionSwitcherEl = headerEl.querySelector(`.${config.editionswitchClassName}`);
		const btnEl = (this.editionSwitcherEl) ? this.editionSwitcherEl.querySelector('[data-o-header-edition-switch-button]') : null;
		if (!btnEl) { return; }

		this.openClass = `${config.editionswitchClassName}--open`;
		this.isOpen = false;
		btnEl.addEventListener('click', this.toggle.bind(this));
		document.body.addEventListener('click', this.click.bind(this));
	}

	toggle() {
		this.isOpen = !this.isOpen;
		this.editionSwitcherEl.classList.toggle(this.openClass);
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
