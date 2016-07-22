import { debounce } from 'o-utils';

function init (headerEl) {
	if (!headerEl.matches('.o-header--sticky')) {
		return;
	}

	let lastScrollDepth;
	let lastAnimationFrame;

	function handleFrame () {
		// sticky el will appear when scrolled down from page top to
		// (arbitrarily) > half the viewport height
		const scrollDepth = window.pageYOffset || window.scrollY;
		const isActive = scrollDepth > (window.innerHeight / 2);

		headerEl.classList.toggle('o-header--sticky-active', isActive);

		if (Math.abs(scrollDepth - lastScrollDepth) > 10) {
			const isScrollingDown = lastScrollDepth < scrollDepth;
			headerEl.classList.toggle('o-header--sticky-scroll-down', isActive && isScrollingDown);
			headerEl.classList.toggle('o-header--sticky-scroll-up', isActive && !isScrollingDown);
		}

		lastScrollDepth = scrollDepth;
	}

	function startLoop () {
		lastAnimationFrame = window.requestAnimationFrame(function () {
			handleFrame();
			startLoop();
		});
	}

	function stopLoop () {
		lastAnimationFrame && window.cancelAnimationFrame(lastAnimationFrame);
	}

	function scrollStart () {
		window.removeEventListener('scroll', scrollStart);
		window.addEventListener('scroll', debouncedScrollEnd);
		startLoop();
	}

	function scrollEnd () {
		stopLoop();
		window.removeEventListener('scroll', debouncedScrollEnd);
		window.addEventListener('scroll', scrollStart);
	}

	const debouncedScrollEnd = debounce(scrollEnd, 300);

	window.addEventListener('scroll', scrollStart);
};

export default { init };
