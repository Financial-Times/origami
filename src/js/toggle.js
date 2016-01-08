import Delegate from 'ftdomdelegate';

const init = () => {
	const delegate = new Delegate(document.querySelector('.js-header'));
	delegate.on('click', '.js-toggle', (ev, toggler) => {
		toggler.classList.toggle('toggle-on');
	});
};

export default {
	init
};
