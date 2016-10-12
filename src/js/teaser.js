class Teaser {

	constructor (TeaserEl, opts) {
		this.TeaserEl = TeaserEl;
		this.opts = opts || {values: "default"};
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		//const TeaserEl = rootEl.querySelector('[data-o-component="o-teaser"]');
		if (rootEl instanceof HTMLElement && /\bo-teaser\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new Teaser(rootEl, opts);
		}
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-teaser"]'), rootEl => new Teaser(rootEl, opts));
	}
}

export default Teaser;
