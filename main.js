const oExpander = require('o-expander');

const SubsCard = function () {
	const expanders = document.querySelectorAll('.o-subs-card__expander')
	const opts = {
		shrinkTo: 'hidden',
		expandedToggleText: 'Read less',
		collapsedToggleText: 'Read more',
		toggleState: 'all',
		toggleSelector: '.o-subs-card__read-more',
		contentClassName: 'o-subs-card__copy-details',
	}

	expanders.forEach((expander) => {
		expander.setAttribute('data-o-component', 'o-expander');
		oExpander.init(expander, opts);

		expander.addEventListener('oExpander.expand', () => {});
		expander.addEventListener('oExpander.collapse', () => {});
	})
}

const constructAll = function() {
	SubsCard();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = SubsCard;
