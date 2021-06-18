import accessibleAutocomplete from 'accessible-autocomplete';

/**
 * @param {string} suggestion - Text which is going to be suggested to the user
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @returns {[string, boolean][]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
 */
function highlightSuggestion(suggestion, query) {
	const result = suggestion.split('');

	const matchIndex = suggestion.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
	return result.map(function(character, index) {
		let shouldHighlight = true;
		const hasMatched = matchIndex > -1;
		const characterIsWithinMatch = index >= matchIndex && index <= matchIndex + query.length - 1;
		if (hasMatched && characterIsWithinMatch) {
			shouldHighlight = false;
		}
		return [character, shouldHighlight];
	});
}

/**
 * Create DOM for the loading container.
 * @returns {HTMLDivElement} The loading container.
 */
function createLoadingContainer() {
	return document.createRange().createContextualFragment(`
		<div class="o-autocomplete__menu-loading-container">
			<div class="o-autocomplete__menu-loading"></div>
		</div>
	`).querySelector(':first-child'); // IE does not support firstElementChild
}

/**
 * Show the loading panel
 * @param {AutoComplete} instance The autocomplete instance whose loading panel should be shown
 * @returns {void}
 */
function showLoadingPane(instance) {
	instance.autocompleteEl.appendChild(instance.loadingContainer);
	const menu = instance.autocompleteEl.querySelector('.o-autocomplete__menu');
	if (menu) {
		menu.classList.add('o-autocomplete__menu--loading');
	}
}

/**
 * Hide the loading panel
 * @param {AutoComplete} instance The autocomplete instance whose loading panel should be hidden
 * @returns {void}
 */
function hideLoadingPane(instance) {
	if (instance.autocompleteEl.contains(instance.loadingContainer)) {
		instance.autocompleteEl.removeChild(instance.loadingContainer);
	}
	const menu = instance.autocompleteEl.querySelector('.o-autocomplete__menu');
	if (menu) {
		menu.classList.remove('o-autocomplete__menu--loading');
	}
}

/**
 * Create the DOM tree which corresponds to
 * <button class="o-autocomplete__clear" type="button" aria-controls=${autocompleteEl.id} title="Clear input">
 * 	<span class="o-autocomplete__visually-hidden">Clear input</span>
 * </button>
 * @param {string} id The id of the autocomplete input to associate the clear button with
 * @returns {HTMLButtonElement} The clear button DOM tree
 */
function createClearButton(id) {
	const clearButton = document.createElement('button');
	clearButton.classList.add('o-autocomplete__clear');
	clearButton.setAttribute('type', 'button');
	clearButton.setAttribute('title', 'Clear input');
	clearButton.setAttribute('aria-controls', id);
	const span = document.createElement('span');
	span.classList.add("o-autocomplete__visually-hidden");
	span.innerText = 'Clear input';
	clearButton.appendChild(span);
	return clearButton;
}

/**
 * Attach the clear button and corresponding event listeners to the o-autocomplete instance
 * @param {AutoComplete} instance The autocomplete instance to setup the clear button for
 * @returns {void}
 */
function initClearButton(instance) {
	const clearButton = createClearButton(instance.autocompleteEl.id);

	const input = instance.autocompleteEl.querySelector('input');
	let timeout = null;
	clearButton.addEventListener('click', () => {
		// Remove the loading pane, in-case of a slow response.
		hideLoadingPane(instance);
		clearButton.parentElement.removeChild(clearButton);
		// Clear the input
		input.value = '';
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
	input.addEventListener('input', () => {
		const textInInput = input.value.length > 0;

		const clearButtonOnPage = instance.autocompleteEl.contains(clearButton);
		if (textInInput) {
			if (!clearButtonOnPage) {
				instance.autocompleteEl.appendChild(clearButton);
			}
		} else {
			if (clearButtonOnPage) {
				clearButton.parentElement.removeChild(clearButton);
			}
		}
	});
}

/**
 * @callback PopulateResults
 * @param {Array<string>} results - The results to show in the suggestions dropdown
 * @returns {void}
 */

/**
 * @callback Suggestions
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateResults} populateResults - Function to call when ready to update the suggestions dropdown
 * @returns {void}
*/


/**
 * @typedef {Object} AutocompleteOptions
 * @property {Suggestions} source - The function which retrieves the suggestions to display
 */

class Autocomplete {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [autocompleteEl] - The component element in the DOM
	 * @param {AutocompleteOptions} [options={}] - An options object for configuring the component
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

		if (this.options.source) {
			// If source is a string, then it is the name of a global function to use.
			// If source is not a string, then it is a function to use.
			/**
			 * @type {Suggestions}
			 */
			const customSuggestions = typeof this.options.source === 'string' ? window[this.options.source] : this.options.source;
			/**
			 * @param {string} query - Text which was typed into the autocomplete by the user
			 * @param {PopulateResults} populateResults - Function to call when ready to update the suggestions dropdown
			 * @returns {void}
			*/
			this.options.source = (query, populateResults) => {
				showLoadingPane(this);
				/**
				 * @param {Array<string>} results - The results to show in the suggestions dropdown
				 * @returns {void}
				 */
				const callback = (results) => {
					hideLoadingPane(this);
					populateResults(results);
				};
				customSuggestions(query, callback);
			};
			const input = autocompleteEl.querySelector('input');
			const id = input.getAttribute('id');
			if (!id) {
				throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
			}
			autocompleteEl.innerHTML = '';
			const options = Object.assign({
				element: autocompleteEl,
				id: id,
			}, this.options);
			accessibleAutocomplete(options);
		} else {
			const element = autocompleteEl.querySelector('select');
			const id = element.getAttribute('id');
			if (!id) {
				throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
			}
			autocompleteEl.appendChild(element);
			const options = Object.assign({
				selectElement: element,
				defaultValue: '',
			}, this.options);
			options.autoselect = false;
			accessibleAutocomplete.enhanceSelectElement(options);
			element.parentElement.removeChild(element); // Remove the original select element
		}

		this.loadingContainer = createLoadingContainer();
		initClearButton(this);
	}

	/**
	 * Used when rendering suggestions, the return value of this will be used as the innerHTML for a single suggestion.
	 * @param {string} suggestedValue The suggestion to apply the template with.
	 * @returns {string} HTML string to be represent a single suggestion.
	 */
	suggestionTemplate (suggestedValue) {
		// o-autocomplete has a UI design to highlight characters in the suggestions.
		/**
		 * @type {[string, boolean][]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
		 */
		const characters = highlightSuggestion(suggestedValue, this.autocompleteEl.querySelector('input').value);

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
