import {debounce} from '@financial-times/o-utils';

function init(headerEl) {
	if (!headerEl.hasAttribute('data-o-header--sticky')) {
		return;
	}

	function hideStickyHeaderContainer({
		stickyHeaderContainer,
		searchIcon,
		isActive,
		isHeaderExpanded,
	}) {
		if (!isActive && isHeaderExpanded) {
			stickyHeaderContainer?.setAttribute('aria-hidden', !isActive);
			stickyHeaderContainer.classList.remove('o-toggle--active');
			searchIcon?.setAttribute('aria-expanded', isActive);
		}
	}

	let viewportOffset;
	let lastScrollDepth;
	let lastAnimationFrame;
	let lastStickyState;

	function handleFrame() {
		// sticky el will appear when scrolled down from page top to
		// (arbitrarily) > half the viewport height
		const stickyHeaderId = '#o-header-search-sticky';
		const scrollDepth = window.pageYOffset || window.scrollY;
		const isActive = scrollDepth > viewportOffset;
		const stickyHeaderContainer = headerEl.querySelector(stickyHeaderId);
		const searchIcon = headerEl.querySelector(
			`[aria-controls="${stickyHeaderId.slice(1)}"]`
		);
		const isHeaderExpanded = stickyHeaderContainer
			? stickyHeaderContainer.getAttribute('aria-hidden')
			: false;

		headerEl.classList.toggle('o-header--sticky-active', isActive);

		if (isActive !== lastStickyState) {
			lastStickyState = isActive;
			headerEl.dispatchEvent(
				new CustomEvent('oHeader.Sticky', {bubbles: true, detail: {isActive}})
			);
		}

		// allow a little wiggling room so we don't get too hasty toggling up/down state
		if (Math.abs(scrollDepth - lastScrollDepth) > 20) {
			const isScrollingDown = lastScrollDepth < scrollDepth;
			headerEl.classList.toggle(
				'o-header--sticky-scroll-down',
				isActive && isScrollingDown
			);
			headerEl.classList.toggle(
				'o-header--sticky-scroll-up',
				isActive && !isScrollingDown
			);
			hideStickyHeaderContainer({
				stickyHeaderContainer,
				searchIcon,
				isActive,
				isHeaderExpanded,
			});
		}

		lastScrollDepth = scrollDepth;
	}

	function startLoop() {
		viewportOffset = window.innerHeight / 2;

		lastAnimationFrame = window.requestAnimationFrame(() => {
			handleFrame();
			startLoop();
		});
	}

	function stopLoop() {
		if (lastAnimationFrame) {
			window.cancelAnimationFrame(lastAnimationFrame);
		}
	}

	function scrollStart() {
		window.removeEventListener('scroll', scrollStart);
		window.addEventListener('scroll', debouncedScrollEnd);
		startLoop();
	}

	function scrollEnd() {
		stopLoop();
		window.removeEventListener('scroll', debouncedScrollEnd);
		window.addEventListener('scroll', scrollStart);
	}

	const debouncedScrollEnd = debounce(scrollEnd, 300);

	window.addEventListener('scroll', scrollStart);

	handleFrame();
}

export {init};
export default {init};
