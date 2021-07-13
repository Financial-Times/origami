// We use our own fork of accessible-autocomplete because the main package is not being actively maintained and has bugs which we needed to fix
// There is a changelog for the fixes we've added -- https://github.com/Financial-Times/accessible-autocomplete/blob/master/CHANGELOG.md#210---2021-05-24
// Below are the pull-requests to accessible-autocomplete which would fix the bugs:
// https://github.com/alphagov/accessible-autocomplete/pull/497
// https://github.com/alphagov/accessible-autocomplete/pull/491
// https://github.com/alphagov/accessible-autocomplete/pull/496
// If the above pull-requests are merged and published, then we can stop using our fork
import accessibleAutocomplete from '@financial-times/accessible-autocomplete';

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
	const fragment = document.createRange().createContextualFragment(`
		<div class="o-autocomplete__menu-loading-container">
			<div class="o-autocomplete__menu-loading"></div>
		</div>
	`);
	return fragment.querySelector('*');
}

/**
 * Show the loading panel
 * @param {AutoComplete} instance The autocomplete instance whose loading panel should be shown
 * @returns {void}
 */
function showLoadingPane(instance) {
	instance.container.appendChild(instance.loadingContainer);
	const menu = instance.container.querySelector('.o-autocomplete__menu');
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
	if (instance.container.contains(instance.loadingContainer)) {
		instance.container.removeChild(instance.loadingContainer);
	}
	const menu = instance.container.querySelector('.o-autocomplete__menu');
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
	const fragment = document.createRange().createContextualFragment(`
		<button class="o-autocomplete__clear" type="button" aria-controls="${id}" title="Clear input">
			<span class="o-autocomplete__visually-hidden">Clear input</span>
		</button>
	`);
	return fragment.querySelector('*');
}

/**
 * Attach the clear button and corresponding event listeners to the o-autocomplete instance
 * @param {AutoComplete} instance The autocomplete instance to setup the clear button for
 * @returns {void}
 */
function initClearButton(instance) {
	const input = instance.autocompleteEl.querySelector('input');
	const clearButton = createClearButton(input.id);
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
 * @callback PopulateOptions
 * @param {Array<*>} options - The options which match the rext which was typed into the autocomplete by the user
 * @returns {void}
 */

/**
 * @callback Source
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateOptions} populateOptions - Function to call when ready to update the suggestions dropdown
 * @returns {void}
*/

/**
 * @callback MapOptionToSuggestedValue
 * @param {*} option - The option to transform into a suggestion string
 * @returns {string} The string to display as the suggestions for this option
*/

/**
 * @typedef {Object} AutocompleteOptions
 * @property {Source} source - The function which retrieves the suggestions to display
 * @property {Function} [mapOptionToSuggestedValue] - Function which transforms a suggestion before rendering
 */

class Autocomplete {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [autocompleteEl] - The component element in the DOM
	 * @param {AutocompleteOptions} [options={}] - An options object for configuring the component
	 */
	constructor (autocompleteEl, options) {
		this.autocompleteEl = autocompleteEl;

		const opts = options || Autocomplete.getDataAttributes(autocompleteEl);
		this.options = {};
		if (opts.source) {
			this.options.source = opts.source;
		}

		const container = document.createElement('div');
		container.classList.add('o-autocomplete__listbox-container');
		this.container = container;

		const selectInputElement = autocompleteEl.querySelector('select');
		if (!this.options.source && !selectInputElement) {
			throw new Error("Could not find a source for auto-completion options. Add a `select` element to your markup, or configure a `source` function to fetch autocomplete options.");
		}

		if (this.options.source) {
			// If source is a string, then it is the name of a global function to use.
			// If source is not a string, then it is a function to use.
			/**
			 * @type {Source}
			 */
			const customSource = typeof this.options.source === 'string' ? window[this.options.source] : this.options.source;

			// If mapOptionToSuggestedValue is a string, then it is the name of a global function to use.
			// If mapOptionToSuggestedValue is not a string, then it is a function to use.
			/**
			 * @type {MapOptionToSuggestedValue}
			 */
			this.mapOptionToSuggestedValue = typeof this.options.mapOptionToSuggestedValue === 'string' ? window[this.options.mapOptionToSuggestedValue] : this.options.mapOptionToSuggestedValue;

			/**
			 * @param {string} query - Text which was typed into the autocomplete by the user
			 * @param {PopulateOptions} populateOptions - Function to call when ready to update the suggestions dropdown
			 * @returns {void}
			*/
			this.options.source = (query, populateOptions) => {
				showLoadingPane(this);
				/**
				 * @param {Array<string>} options - The options which match the rext which was typed into the autocomplete by the user
				 * @returns {void}
				 */
				const callback = (options) => {
					hideLoadingPane(this);
					populateOptions(options);
				};
				customSource(query, callback);
			};
			const input = autocompleteEl.querySelector('input');
			const id = input.getAttribute('id');
			if (!id) {
				throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
			}
			this.autocompleteEl.innerHTML = '';
			this.autocompleteEl.appendChild(this.container);
			accessibleAutocomplete({
				element: this.container,
				id: id,
				source: this.options.source,
				placeholder: '',
				cssNamespace: 'o-autocomplete',
				displayMenu: 'overlay',
				showNoOptionsFound: false,
				templates: {
					/**
					 * Used when rendering suggestions, the return value of this will be used as the innerHTML for a single suggestion.
					 * @param {*} option The suggestion to apply the template with.
					 * @returns {string} HTML string to represent a single suggestion.
					 */
					suggestion: (option) => {
						if (typeof option !== 'undefined') {
							// If the `mapOptionToSuggestedValue` function is defined
							// Apply the function to the option. This is a way for the
							// consuming application to decide what text should be
							// shown for this option.
							// This is usually defined when the option is not already a string.
							// For example, if the option is an object which contains a property
							// which should be used as the suggestion string.
							if (typeof this.mapOptionToSuggestedValue === 'function') {
								option = this.mapOptionToSuggestedValue(option);
							} else if (typeof option !== 'string') {
								throw new Error(`The option trying to be displayed as a suggestion is not a string, it is "${typeof option}". o-autocomplete can only display strings as suggestions. Define a \`mapOptionToSuggestedValue\` function to convert the option into a string to be used as the suggestion.`);
							}
						}

						return this.suggestionTemplate(option);
					},
					/**
					 * Used when a suggestion is selected, the return value of this will be used as the value for the input element.
					 * @param {*} option The suggestion which was selected.
					 * @returns {string} String to represent the suggestion.
					 */
					inputValue: (option) => {
						if (typeof option !== 'undefined') {
							// If the `mapOptionToSuggestedValue` function is defined
							// Apply the function to the option. This is a way for the
							// consuming application to decide what text should be
							// shown for this option.
							// This is usually defined when the option is not already a string.
							// For example, if the option is an object which contains a property
							// which should be used as the suggestion string.
							if (typeof this.mapOptionToSuggestedValue === 'function') {
								option = this.mapOptionToSuggestedValue(option);
							} else if (typeof option !== 'string') {
								throw new Error(`The option trying to be displayed as a suggestion is not a string, it is "${typeof option}". o-autocomplete can only display strings as suggestions. Define a \`mapOptionToSuggestedValue\` function to convert the option into a string to be used as the suggestion.`);
							}
						}

						return option;
					}
				}
			});
		} else {
			const id = selectInputElement.getAttribute('id');
			if (!id) {
				throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
			}
			this.autocompleteEl.appendChild(this.container);
			this.container.appendChild(selectInputElement);
			accessibleAutocomplete.enhanceSelectElement({
				selectElement: selectInputElement,
				autoselect: false,
				defaultValue: '',
				placeholder: '',
				cssNamespace: 'o-autocomplete',
				displayMenu: 'overlay',
				showNoOptionsFound: false,
				templates: {
					suggestion: this.suggestionTemplate.bind(this)
				}
			});
			selectInputElement.parentElement.removeChild(selectInputElement); // Remove the original select element
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
		const span = document.createElement('span');
		span.setAttribute('aria-label', suggestedValue);
		span.innerHTML = output;
		return span.outerHTML;
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

		if (autocompleteEl.dataset.oAutocompleteSource) {
			return {
				source: autocompleteEl.dataset.oAutocompleteSource
			};
		} else {
			return {};
		}
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
