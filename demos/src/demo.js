import { SubsCard } from './../../main.js.js';

document.addEventListener('DOMContentLoaded', function() {
	const cards = SubsCard.init();

	document.querySelector('.toggle-all').addEventListener('click', () => {
		cards.forEach(card => card.toggle());
	});
});
