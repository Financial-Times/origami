/*jshint node:true,browser:true,-W030*/

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

module.exports = {

	init: function(flags) {
		const header = document.querySelector('.o-header');

		const form = document.querySelector('.js-search');
		const toggle = document.querySelector('.js-search-toggle');
		const input = document.querySelector('.js-search-input');
		const placeholder = document.querySelector('.js-search-placeholder');

		const transition = transitionEventName(form);
		const transitionHandler = function() {
			const visibility = getComputedStyle(form, null).getPropertyValue('visibility');

			if(visibility === 'visible')
				input.focus();

			form.removeEventListener(transition, transitionHandler);
		};

		if(placeholder) {
			placeholder.style.display = 'block';
			input.addEventListener('keyup', function() {
				if(input.value.length > 0) {
					placeholder.style.display = 'none';
				} else {
					placeholder.style.display = 'block';
				}
			});
		}

		if(toggle) {
			const clickHandler = function() {
				if(transition) {
					form.addEventListener(transition, transitionHandler);
				} else {
					setTimeout(transitionHandler, 300);
				}

				return true;
			};

			toggle.addEventListener('touchend', clickHandler);
			toggle.addEventListener('click', clickHandler);
		}

		if(header && flags.get('typeahead')) {
			const container = header.querySelector('.js-suggestions-container');

			const typeahead = new Typeahead(
				container,
				input,
				'//' + window.location.host + '/search-suggestions?flatten=true&limit=5&q=',
				function() { form.submit(); },
				flags
			);

			if(toggle) {
				const handler = function() {
					typeahead.hide();
				};

				toggle.addEventListener('touchend', handler);
				toggle.addEventListener('click', handler);
			}
		}
	}

};
