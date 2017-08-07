const expanders = document.querySelectorAll('.o-subs-card__read-more')

const oExpander = require('o-expander');
oExpander.init()

expanders.forEach((expander) => {
	console.log(expander);
	expander.addEventListener('oExpander.expand', (e) => { console.log(e)});
	expander.addEventListener('oExpander.collapse', (e) => { console.log(e)});
})
