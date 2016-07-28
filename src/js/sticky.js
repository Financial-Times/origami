import { debounce } from 'o-utils';

function init (headerEl) {
	if (!headerEl.hasAttribute('data-o-header--sticky')) {
		return;
	}

	let viewportOffset;
	let lastScrollDepth;
	let lastAnimationFrame;

	function handleFrame () {
		// sticky el will appear when scrolled down from page top to
		// (arbitrarily) > half the viewport height
		const scrollDepth = window.pageYOffset || window.scrollY;
		const isActive = scrollDepth > viewportOffset;

		headerEl.classList.toggle('o-header--sticky-active', isActive);

		// allow a little wiggling room so we don't get too hasty toggling up/down state
		if (Math.abs(scrollDepth - lastScrollDepth) > 20) {
			const isScrollingDown = lastScrollDepth < scrollDepth;
			headerEl.classList.toggle('o-header--sticky-scroll-down', isActive && isScrollingDown);
			headerEl.classList.toggle('o-header--sticky-scroll-up', isActive && !isScrollingDown);
		}

		lastScrollDepth = scrollDepth;
	}

	function startLoop () {
		viewportOffset = window.innerHeight / 2;

		lastAnimationFrame = window.requestAnimationFrame(() => {
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

	handleFrame();
};

export default { init };
