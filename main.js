const expanders = document.querySelectorAll('.o-subs-card__expander')
const oExpander = require('o-expander');

const opts = {
	shrinkTo: ['hidden'],
	expandedToggleText: ['Read less'],
	collapsedToggleText: ['Read more'],
	toggleState: 'all',
	toggleSelector: '.o-subs-card__read-more',
	toggleClassName: 'o-subs-card__read-more',
	contentClassName: 'o-subs-card__copy-details'
}

expanders.forEach((expander) => {
	expander.setAttribute('data-o-component', 'o-expander');
	oExpander.init(expander, opts);

	expander.addEventListener('oExpander.expand', (e) => { console.log(e)});
	expander.addEventListener('oExpander.collapse', (e) => { console.log(e)});
})
