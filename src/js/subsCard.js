const oExpander = require('o-expander');

class SubsCard {

	constructor (rootEl) {
		this.rootEl = rootEl;
		this.setExpanders();
	}

	setExpanders() {
		const expander = this.rootEl.querySelector('.o-subs-card__expander');
		const opts = {
			shrinkTo: 'hidden',
			expandedToggleText: 'Read less',
			collapsedToggleText: 'Read more',
			toggleState: 'all',
			toggleSelector: '.o-subs-card__read-more',
			contentClassName: 'o-subs-card__copy-details',
		};

		expander.setAttribute('data-o-component', 'o-expander');
		oExpander.init(expander, opts);
	}


	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-subs-card]')) {
			return new SubsCard(rootEl);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-subs-card"]'), rootEl => new SubsCard(rootEl));
	}
}

export default SubsCard;
