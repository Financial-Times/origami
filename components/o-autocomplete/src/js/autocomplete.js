// We use our own fork of accessible-autocomplete because the main package is not being actively maintained and has bugs which we needed to fix
// There is a changelog for the fixes we've added -- https://github.com/Financial-Times/accessible-autocomplete/blob/master/CHANGELOG.md#210---2021-05-24
// Below are the pull-requests to accessible-autocomplete which would fix the bugs:
// https://github.com/alphagov/accessible-autocomplete/pull/491
// If the above pull-requests are merged and published, then we can stop using our fork
import accessibleAutocomplete from '@financial-times/accessible-autocomplete';

/**
 * @typedef CharacterHighlight - The character and whether it should be highlighted
 * @type {Array}
 * @property {string} 0 - the character in the suggestion
 * @property {boolean} 1 - should it be highlighted?
 */


/**
 * @param {string} suggestion - Text which is going to be suggested to the user
 * @param {string} query - Text which was typed into the autocomplete text input field by the user
 * @param {boolean} isHighlightCorrespondingToMatch - Boolean to determine whether matching or non-matching characters should be highlighted.
 * @returns {CharacterHighlight[]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
 */
function highlightSuggestion(suggestion, query, isHighlightCorrespondingToMatch) {
	const result = suggestion.split('');

	const matchIndex = suggestion.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
	return result.map(function(character, index) {
		let shouldHighlight = !isHighlightCorrespondingToMatch;
		const hasMatched = matchIndex > -1;
		const characterIsWithinMatch = index >= matchIndex && index <= matchIndex + query.length - 1;
		if (hasMatched && characterIsWithinMatch) {
			shouldHighlight = isHighlightCorrespondingToMatch;
		}
		return [character, shouldHighlight];
	});
}

/**
 * Create DOM for the loading container.
 *
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
 *
 * @param {Autocomplete} instance The autocomplete instance whose loading panel should be shown
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
 *
 * @param {Autocomplete} instance The autocomplete instance whose loading panel should be hidden
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
 *		<span class="o-autocomplete__visually-hidden">Clear input</span>
 * </button>
 *
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
 *
 * @param {Autocomplete} instance The autocomplete instance to setup the clear button for
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
 * @callback onConfirm
 * @param {*} option - The option the user selected
 * @returns {void}
 */

/**
 * @callback SuggestionTemplate
 * @param {*} option - The option to render
 * @returns {string} The html string to render for this suggestion.
 */

/**
 * @typedef {object} AutocompleteOptions
 * @property {string} [defaultValue] - Specify a string to prefill the autocomplete with
 * @property {Source} [source] - The function which retrieves the suggestions to display
 * @property {MapOptionToSuggestedValue} [mapOptionToSuggestedValue] - Function which transforms a suggestion before rendering.
 * @property {onConfirm} [onConfirm] - Function which is called when the user selects an option
 * @property {SuggestionTemplate} [suggestionTemplate] - Function to override how a suggestion item is rendered.
 * @property {boolean} [isHighlightCorrespondingToMatch] - Boolean to determine whether matching or non-matching characters should be highlighted.
 * @property {boolean} [autoselect] - Boolean to specify whether first option in suggestions list is highlighted.
 */

class Autocomplete {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [autocompleteEl] - The component element in the DOM
	 * @param {AutocompleteOptions} [options={}] - An options object for configuring the component
	 */
	constructor (autocompleteEl, options) {
		this.autocompleteEl = autocompleteEl;

		const opts = options || Autocomplete.getDataAttributes(autocompleteEl);
		this.options = {};
		if (opts.source) {
			this.options.source = opts.source;
			this.options.defaultValue = opts.defaultValue;
		}
		if (opts.mapOptionToSuggestedValue) {
			this.options.mapOptionToSuggestedValue = opts.mapOptionToSuggestedValue;
		}
		if (opts.onConfirm) {
			this.options.onConfirm = opts.onConfirm;
		}
		this.options.showNoOptionsFound = opts.showNoOptionsFound || false;
		this.options.reopenOnFocusWhenValid = opts.reopenOnFocusWhenValid || false;
		this.options.confirmOnBlur = opts.confirmOnBlur ?? true;
		if (opts.suggestionTemplate) {
			this.options.suggestionTemplate = opts.suggestionTemplate;
		}
		this.options.isHighlightCorrespondingToMatch = Boolean(opts.isHighlightCorrespondingToMatch);
		if (opts.autoselect) {
			this.options.autoselect = opts.autoselect;
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
				// One way this function can be invoked is following a clearButton click event.

				// The consumer-provided `customSource()` function can be wrapped in `debounce()`, creating the potential
				// for a user-defined delay between the invocation of the `customSource()` and `callback()` functions.
				// This delay could be longer than the 100ms frequency at which accessible-autocomplete polls the value of the input.

				// The following code blocks accommodate the coincident of these circumstances.

				// A clearButton click event will hide the loading pane and set the input value as an empty string.
				if (query) {
					// Therefore only show the loading pane if a `query` (i.e. input) value is present
					// so as to avoid temporarily re-showing the loading pane prior to this function's callback hiding it once again.
					showLoadingPane(this);
				}

				// A clearButton click event will blur the input field, resulting in the listbox of options becoming hidden
				// (but without de-populating the options).
				if (!query) {
					// If the accessible-autocomplete poll occurs after a clearButton click event
					// but before this function's callback is invoked then the listbox and its options will be re-displayed.
					// When the callback eventually runs, it will de-populate the options, consequently re-hiding the listbox.
					// To prevent this, in the event of no `query` value being present
					// (where, logically, there will be no corresponding options),
					// immediately de-populate the options rather than waiting for the callback to do so.
					populateOptions([]);
				}

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
			const name = input.getAttribute('name');
			const placeholder = input.getAttribute('placeholder');
			const isRequired = input.hasAttribute('required');

			if (!id) {
				throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
			}

			this.autocompleteEl.innerHTML = '';
			this.autocompleteEl.appendChild(this.container);
			accessibleAutocomplete({
				element: this.container,
				id: id,
				name: name,
				placeholder: placeholder,
				required: isRequired,
				onConfirm: (option) => {
					if (option && this.options.onConfirm) {
						this.options.onConfirm(option);
					}
				},
				reopenOnFocusWhenValid: this.options.reopenOnFocusWhenValid,
				confirmOnBlur: this.options.confirmOnBlur,
				source: this.options.source,
				cssNamespace: 'o-autocomplete',
				displayMenu: 'overlay',
				defaultValue: this.options.defaultValue || '',
				showNoOptionsFound: this.options.showNoOptionsFound,
				autoselect: this.options.autoselect || false,
				templates: {
					/**
					 * Used when rendering suggestions, the return value of this will be used as the innerHTML for a single suggestion.
					 *
					 * @param {*} option The suggestion to apply the template with.
					 * @param {string} query Text which was typed into the autocomplete text input field by the user.
					 * @returns {string|undefined} HTML string to represent a single suggestion.
					 */
					suggestion: (option, query) => {
						const isHighlightCorrespondingToMatch = this.options.isHighlightCorrespondingToMatch;

						// If the suggestionTemplate override option is provided,
						// use that to render the suggestion.
						if(typeof this.options.suggestionTemplate === 'function') {
							return this.options.suggestionTemplate(
								option,
								query,
								highlightSuggestion,
								isHighlightCorrespondingToMatch
							);
						}
						if (typeof option === 'object') {
							// If the `mapOptionToSuggestedValue` function is defined
							// Apply the function to the option. This is a way for the
							// consuming application to decide what text should be
							// shown for this option.
							// This is usually defined when the option is not already a string.
							// For example, if the option is an object which contains a property
							// which should be used as the suggestion string.
							if (typeof this.mapOptionToSuggestedValue === 'function') {
								option = this.mapOptionToSuggestedValue(option);
							}
						}

						if (typeof option !== 'string' && typeof option !== 'undefined') {
							throw new Error(`The option trying to be displayed as a suggestion is not a string, it is "${typeof option}". o-autocomplete can only display strings as suggestions. Define a \`mapOptionToSuggestedValue\` function to convert the option into a string to be used as the suggestion.`);
						}

						return this.suggestionTemplate(option, isHighlightCorrespondingToMatch);
					},
					/**
					 * Used when a suggestion is selected, the return value of this will be used as the value for the input element.
					 *
					 * @param {*} option The suggestion which was selected.
					 * @returns {string|undefined} String to represent the suggestion.
					 */
					inputValue: (option) => {
						if (typeof option === 'object') {
							// If the `mapOptionToSuggestedValue` function is defined
							// Apply the function to the option. This is a way for the
							// consuming application to decide what text should be
							// shown for this option.
							// This is usually defined when the option is not already a string.
							// For example, if the option is an object which contains a property
							// which should be used as the suggestion string.
							if (typeof this.mapOptionToSuggestedValue === 'function') {
								option = this.mapOptionToSuggestedValue(option);
							}
						}

						if (typeof option !== 'string' && typeof option !== 'undefined') {
							throw new Error(`The option trying to be displayed as a suggestion is not a string, it is "${typeof option}". o-autocomplete can only display strings as suggestions. Define a \`mapOptionToSuggestedValue\` function to convert the option into a string to be used as the suggestion.`);
						}

						return option;
					}
				}
			});
		} else {
			const id = selectInputElement.getAttribute('id');
			const name = selectInputElement.getAttribute('name');
			const isRequired = selectInputElement.hasAttribute('required');

			if (!id) {
				throw new Error("Missing `id` attribute on the o-autocomplete input. An `id` needs to be set as it is used within the o-autocomplete to implement the accessibility features.");
			}
			this.autocompleteEl.appendChild(this.container);
			this.container.appendChild(selectInputElement);
			accessibleAutocomplete.enhanceSelectElement({
				selectElement: selectInputElement,
				name: name,
				required: isRequired,
				onConfirm: (option) => {
					if (option && this.options.onConfirm) {
						this.options.onConfirm(option);
					}
				},
				autoselect: this.options.autoselect || false,
				// To fallback with JS an enhanced element's default value should
				// be set using static html.
				defaultValue: '',
				placeholder: '',
				cssNamespace: 'o-autocomplete',
				displayMenu: 'overlay',
				showNoOptionsFound: this.options.showNoOptionsFound,
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
	 *
	 * @param {string} suggestedValue The suggestion to apply the template with.
	 * @param {boolean} isHighlightCorrespondingToMatch Boolean to determine whether matching or non-matching characters should be highlighted.
	 * @returns {string} HTML string to be represent a single suggestion.
	 */
	suggestionTemplate (suggestedValue, isHighlightCorrespondingToMatch) {
		// o-autocomplete has a UI design to highlight characters in the suggestions.
		const input = this.autocompleteEl.querySelector('input');
		/**
		 * @type {CharacterHighlight[]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
		 */
		const characters = highlightSuggestion(
			suggestedValue,
			input ? input.value : suggestedValue,
			isHighlightCorrespondingToMatch
		);

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
	 *
	 * @param {HTMLElement} autocompleteEl - The component element in the DOM
	 * @returns {object} An options object which can be used for configuring the component
	 */
	static getDataAttributes (autocompleteEl) {
		if (!(autocompleteEl instanceof HTMLElement)) {
			return {};
		}

		if (autocompleteEl.dataset.oAutocompleteSource) {
			return {
				source: autocompleteEl.dataset.oAutocompleteSource,
				defaultValue: autocompleteEl.dataset.oAutocompleteDefaultValue
			};
		} else {
			return {};
		}
	}
	/**
	 * Initialise o-autocomplete component/s.
	 *
	 * @param {(HTMLElement | string)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {object} [options={}] - An options object for configuring the component
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
