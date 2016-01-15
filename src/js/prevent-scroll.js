const init = () => {
	const subNavToggle = document.querySelector('.js-sub-nav-toggle');

	if (subNavToggle) {
		subNavToggle.addEventListener('click', () => {
			document.documentElement.classList.toggle('navigation-is-open');
			document.querySelector('body').classList.toggle('navigation-is-open');
		});
	}
};

export default { init };
