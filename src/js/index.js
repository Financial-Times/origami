import toggle from './toggle';

function init () {
	const search = document.getElementById('o-header-search');
	const controls = document.querySelectorAll(`[aria-controls="${search.id}"]`);

	toggle(controls, search, function (e, state) {
		state === 'open' && search.querySelector('[name="q"]').focus();
	});
}

export default { init };
