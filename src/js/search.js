const Typeahead = require('./typeahead');

// Source: https://gist.github.com/davidcalhoun/702826
const transitionEventName = function(el) {
	let transition;

	if('ontransitionend' in window) {
		transition = 'transitionend';
	} else if('onwebkittransitionend' in window) {
		transition = 'webkitTransitionEnd';
	} else if('onotransitionend' in el || navigator.appName === 'Opera') {
		transition = 'oTransitionEnd';
	} else {
		transition = false;
	}

	return transition;
};

class Search {
	static init(headerEl, config = {}) {
		if (!headerEl) return;

		const suggestionsContainer = headerEl.querySelector('[data-o-header-suggestions]');
		const form = suggestionsContainer.querySelector('[data-o-header-search]');
		const toggle = suggestionsContainer.querySelector('[data-o-header-togglable-search]');
		const input = form.querySelector('input');

		const typeahead = new Typeahead(
			suggestionsContainer,
			input,
			`//${window.location.host}${config.searchDataSrc}`,
			function() { form.submit(); }
		);

		const transition = transitionEventName(form);
		const transitionHandler = function() {
			const visibility = getComputedStyle(form, null).getPropertyValue('visibility');

			if (visibility === 'visible') {
				input.focus();
			}

			form.removeEventListener(transition, transitionHandler);
		};

		if (toggle) {
			const clickHandler = function() {
				if (transition) {
					form.addEventListener(transition, transitionHandler);
				} else {
					setTimeout(transitionHandler, 300);
				}

				typeahead.hide();
				return true;
			};

			toggle.addEventListener('touchend', clickHandler);
			toggle.addEventListener('click', clickHandler);
		}
	}
}

export default Search;
