import accessibleAutocomplete from 'accessible-autocomplete';

/**
 * @typedef {Function} PopulateResults
 * @property {Array<string>} results - The results to show in the suggestions dropdown
 */

class Autocomplete {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [autocompleteEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (autocompleteEl, options) {
		this.autocompleteEl = autocompleteEl;
		this.options = Object.assign({
			placeholder: '',
			cssNamespace: 'o-autocomplete',
			displayMenu: 'overlay',
			showNoOptionsFound: false,
			templates: {
				suggestion: this.suggestionTemplate.bind(this)
			}
		}, options || Autocomplete.getDataAttributes(autocompleteEl));

		// If highlighter is a string, then it is the name of a global function to use.
		// If highlighter is not a string, then it is a function to use.
		if (typeof this.options.highlighter === 'string') {
			this.options.highlighter = window[this.options.highlighter];
		}

		const container = document.createElement('div');
		this.container = container;
		container.classList.add('o-autocomplete__container');

		if (this.options.source) {
			// If source is a string, then it is the name of a global function to use.
			// If source is not a string, then it is a function to use.
			/**
			 * @function
			 * @param {string} query - Text which was typed into the autocomplete by the user
			 * @param {PopulateResults} populateResults - Function to call when ready to update the suggestions dropdown
			 * @returns {void}
			 */
			const customSuggestions = typeof this.options.source === 'string' ? window[this.options.source] : this.options.source;
			this.options.source = function(query, populateResults) {
				showLoadingPane();
				const callback = function(results) {
					hideLoadingPane();
					populateResults(results);
				};
				customSuggestions(query, callback);
			};
			autocompleteEl.innerHTML = '';
			autocompleteEl.appendChild(container);
			const id = autocompleteEl.getAttribute('id');
			autocompleteEl.removeAttribute('id');
			container.setAttribute('id', id);
			const options = Object.assign({
				element: container,
				id: container.id,
			}, this.options);
			accessibleAutocomplete(options);
		} else {
			const element = autocompleteEl.querySelector('select');
			autocompleteEl.appendChild(container);
			container.appendChild(element);
			const options = Object.assign({
				selectElement: element,
				defaultValue: '',
			}, this.options);
			options.autoselect = false; // TODO: Find out if we should allow autoselect/hinting in the input
			accessibleAutocomplete.enhanceSelectElement(options);
			element.parentElement.removeChild(element); // Remove the original select element
		}

		/*
			The below block of code will create this HTML:
			<button
				class="o-autocomplete__clear"
				type="button"
				aria-controls=${autocompleteEl.id}
				title="Clear input"
			>
				<span class="o-autocomplete__visually-hidden">Clear input</span>
			</button>
		*/
		const clearButton = document.createElement('button');
		clearButton.classList.add('o-autocomplete__clear');
		clearButton.setAttribute('type', 'button');
		clearButton.setAttribute('title', 'Clear input');
		clearButton.setAttribute('aria-controls', autocompleteEl.id);
		const span = document.createElement('span');
		span.classList.add("o-autocomplete__visually-hidden");
		span.innerText = 'Clear input';
		clearButton.appendChild(span);

		const input = this.autocompleteEl.querySelector('input');
		let timeout = null;
		clearButton.addEventListener('click', function clearInput() {
			input.value = '';
			clearButton.parentElement.removeChild(clearButton);
			// We need to wait longer than 100ms before focusing
			// onto the input element because accessible-autocomplete
			// only checks the value of the input every 100ms.
			// If we modify input.value and then focus into the input in less
			// than 100ms, accessible-autocomplete would not have the updated
			// value and would instead write the old value back into the input.
			// https://github.com/alphagov/accessible-autocomplete/blob/935f0d43aea1c606e6b38985e3fe7049ddbe98be/src/autocomplete.js#L107-L125
			if (!timeout) {
				// The user could press the button multiple times
				// whilst the setTimeout handler has yet to execute
				// We only want to call the handler once
				timeout = setTimeout(() => {
					input.focus();
					timeout = null;
				}, 110);
			}
		});

		input.addEventListener('input', function() {
			addOrRemoveClearButton();
		});

		// <div class="o-autocomplete__menu-loading-container">
		//     <div class="o-autocomplete__menu-loading"></div>
		// </div>
		const loadingContainer = document.createElement('div');
		loadingContainer.classList.add('o-autocomplete__menu-loading-container');
		const loading = document.createElement('div');
		loadingContainer.appendChild(loading);
		loading.classList.add('o-autocomplete__menu-loading');
		function showLoadingPane() {
			container.appendChild(loadingContainer);
			const menu = document.querySelector('.o-autocomplete__menu');
			if (menu) {
				menu.classList.add('o-autocomplete__menu--loading');
			}
		}
		function hideLoadingPane() {
			if (container.contains(loadingContainer)) {
				container.removeChild(loadingContainer);
			}
			const menu = document.querySelector('.o-autocomplete__menu');
			if (menu) {
				menu.classList.remove('o-autocomplete__menu--loading');
			}
		}

		function addOrRemoveClearButton() {
			const textInInput = input.value.length > 0;

			const clearButtonOnPage = container.contains(clearButton);
			if (textInInput) {
				if (!clearButtonOnPage) {
					container.appendChild(clearButton);
				}
			} else {
				if (clearButtonOnPage) {
					clearButton.parentElement.removeChild(clearButton);
				}
			}
		}
	}

	/**
	 * Used when rendering suggestions, the return value of this will be used as the innerHTML for a single suggestion.
	 * @param {string} suggestedValue The suggestion to apply the template with.
	 * @returns {string} HTML string to be represent a single suggestion.
	 */
	suggestionTemplate (suggestedValue) {
		// If the component has not defined a highlighter to apply to the suggestions
		// Then return the suggestion unmodified
		if (!this.options.highlighter) {
			return suggestedValue;
		}

		// o-autocomplete has a UI design option to highlight characters in the suggestions.
		// The product using o-autocomplete decides upon the logic behind which characters to highlight and which to not.
		/**
		 * @type {[string, boolean][]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
		 */
		const characters = this.options.highlighter(suggestedValue, this.autocompleteEl.querySelector('input').value);

		let output = '';
		for (const [character, shoudHighlight] of characters) {
			if (shoudHighlight) {
				output += `<span class="o-autocomplete__option--highlight">${character}</span>`;
			} else {
				output += `${character}`;
			}
		}
		return output;
	}

	/**
	 * Get the data attributes from the AutocompleteElement. If the element is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} autocompleteEl - The component element in the DOM
	 * @returns {Object} An options object which can be used for configuring the component
	 */
	static getDataAttributes (autocompleteEl) {
		if (!(autocompleteEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(autocompleteEl.dataset).reduce((options, key) => {
			// Ignore keys which are not in the component's namespace
			if (!key.match(/^oAutocomplete(\w)(\w+)$/)) {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oAutocomplete(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = autocompleteEl.dataset[key];
			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}
			return options;
		}, {});
	}
	/**
	 * Initialise o-autocomplete component/s.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 * @returns {Autocomplete|Autocomplete[]} The newly constructed Autocomplete components
	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=o-autocomplete]')) {
			return new Autocomplete(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-autocomplete"]'), rootEl => new Autocomplete(rootEl, options));
	}
}

export default Autocomplete;
