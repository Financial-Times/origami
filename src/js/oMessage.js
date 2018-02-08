class oMessage {

	constructor (oMessageEl, opts) {
		this.oMessageEl = oMessageEl;
		this.opts = opts || {values: "default"};
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-message]')) {
			return new oMessage(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-message"]'), rootEl => new oMessage(rootEl, opts));
	}
}

export default oMessage;
