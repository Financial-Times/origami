import oExpander from 'o-expander';

let tallestTopHeight = 0;

class SubsCard {

	constructor (rootEl) {
		this.rootEl = rootEl;
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
		let cards = Array.from(rootEl.querySelectorAll('[data-o-component="o-subs-card"]'), rootEl => new SubsCard(rootEl));

		if (cards.length > 1) {
			SubsCard.matchHeights(cards);
		}

		return cards;
	}

	static matchHeights(cards) {
		for (let i = 0; i < cards.length; i++) {
			let cardTop = cards[i].rootEl.querySelector('.o-subs-card__top');

			cardTop.style.flex = `0 1 ${tallestTopHeight}px`;
		}
	}
}

export default SubsCard;
