class Typography {

	constructor (TypographyEl, opts) {
		this.TypographyEl = TypographyEl;
		this.opts = opts || { values: "default" };
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-typography]')) {
			return new Typography(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-typography"]'), rootEl => new Typography(rootEl, opts));
	}
}

export default Typography;
