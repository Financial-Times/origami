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
		if (!headerEl) {
			return;
		}

		const form = headerEl.querySelector('[data-o-header-search]');
		if (!form) {
			return;
		}

		const toggle = headerEl.querySelector('[data-o-header-togglable-search]');
		const input = form.querySelector('input');
		const placeholder = headerEl.querySelector('label');

		const transition = transitionEventName(form);
		const transitionHandler = function() {
			const visibility = getComputedStyle(form, null).getPropertyValue('visibility');

			if (visibility === 'visible') {
				input.focus();
			}

			form.removeEventListener(transition, transitionHandler);
		};

		if (toggle) {
			const searchToggleClickHandler = function() {
				if (transition) {
					form.addEventListener(transition, transitionHandler);
				} else {
					setTimeout(transitionHandler, 300);
				}

				headerEl.dispatchEvent(new CustomEvent('oHeader.searchToggle', {
					bubbles: true,
					detail: {
						isOpen: getComputedStyle(form, null).getPropertyValue('visibility') === 'visible'
					}
				}))
				return true;
			};

			toggle.addEventListener('touchend', searchToggleClickHandler);
			toggle.addEventListener('click', searchToggleClickHandler);
		}
	}
}

export default Search;
