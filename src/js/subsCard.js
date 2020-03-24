import oExpander from 'o-expander';

let tallestTopHeight = 0;

class SubsCard {

	constructor (rootEl) {
		this.rootEl = rootEl;
		this.expander = null;
		this.setExpanders();
		this.checkTallest();
	}

	checkTallest() {
		const top = this.rootEl.querySelector('.o-subs-card__top');

		if (top && top.clientHeight > tallestTopHeight) {
			tallestTopHeight = top.clientHeight;
		}
	}

	setExpanders() {
		const expander = this.rootEl.querySelector('.o-subs-card__expander');
		const opts = {
			shrinkTo: 'hidden',
			expandedToggleText: 'Read less',
			collapsedToggleText: 'Read more',
			toggleState: 'all',
			selectors: {
				toggle: '.o-subs-card__read-more',
				content: '.o-subs-card__copy-details'
			},
			classnames: {
				initialized: 'o-subs-card__expander--initialized',
				inactive: 'o-subs-card__expander--inactive',
				expanded: 'o-subs-card__expander--expanded',
				collapsed: 'o-subs-card__expander--collapsed'
			}
		};

		expander.setAttribute('data-o-component', 'o-expander');
		this.expander = oExpander.createCustom(expander, opts);
	}

	toggle() {
		if (this.expander) {
			this.expander.toggle();
		}
	}

	expand() {
		if (this.expander) {
			this.expander.expand();
		}
	}

	collapse() {
		if (this.expander) {
			this.expander.collapse();
		}
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
		const cards = Array.from(rootEl.querySelectorAll('[data-o-component="o-subs-card"]'), rootEl => new SubsCard(rootEl));

		if (cards.length > 1) {
			SubsCard.matchHeights(cards);
		}

		return cards;
	}

	static matchHeights(cards) {
		for (let i = 0; i < cards.length; i++) {
			const cardTop = cards[i].rootEl.querySelector('.o-subs-card__top');

			cardTop.style.flex = `0 1 ${tallestTopHeight}px`;
		}
	}
}

export {
	SubsCard
};
