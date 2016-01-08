const init = () => {
	document.querySelector('.js-sub-nav-toggle').addEventListener('click', () => {
		document.documentElement.classList.toggle('o-navigation-is-open');
		document.getElementsByTagName('body')[0].classList.toggle('o-navigation-is-open');
	});	
};

export default { init: init };
