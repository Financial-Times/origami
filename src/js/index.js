import toggle from './toggle';
import mega from './mega';

function init () {
	const search = document.getElementById('o-header-search');
	const controls = search && document.querySelectorAll(`[aria-controls="${search.id}"]`);

	controls && toggle(controls, search, function (e, state) {
		state === 'open' && search.querySelector('[name="q"]').focus();
	});

	mega.init();
}

export default { init };
