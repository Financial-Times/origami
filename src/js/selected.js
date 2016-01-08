import Delegate from 'ftdomdelegate';

const init = () => {
	const delegate = new Delegate(document.querySelector('.js-header'));
	delegate.on('click', '.js-select', (ev, select) => {
		Array.prototype.slice.call(document.querySelectorAll('.js-select')).forEach(
			selectEl => selectEl.classList.remove('selected')
		)
		select.classList.add('selected');
	});
};

export default {
	init
};
