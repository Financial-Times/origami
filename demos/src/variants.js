document.querySelector('.o-expander.events').addEventListener('oExpander.init', function () {
	document.querySelector('.alert').innerHTML = 'Looks like we got ourselves an expander';
});

document.querySelector('.o-expander.events').addEventListener('oExpander.collapse', function () {
	document.querySelector('.alert').innerHTML = 'Oh no - come back!';
});

document.querySelector('.o-expander.events').addEventListener('oExpander.expand', function () {
	document.querySelector('.alert').innerHTML = 'Get outta my way!';
});

require('./demo');
