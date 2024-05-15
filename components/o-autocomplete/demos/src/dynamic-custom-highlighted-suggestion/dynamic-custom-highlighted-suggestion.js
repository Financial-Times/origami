import Autocomplete from '../../../main.js';
import {data} from './data.js';
import oForms from '@financial-times/o-forms';
oForms.init();
/**
 * @typedef {object} CustomOption
 * @property {string} Continent_Code - 2 letter continent code
 * @property {string} Continent_Name - name of continent
 * @property {string} Country_Name - name of country
 * @property {number} Country_Number - id of country
 * @property {string} Three_Letter_Country_Code - three letter country code
 * @property {string} Two_Letter_Country_Code - two letter country code
 */

/**
 * @param {CustomOption} option - The option to transform into a suggestion string
 * @returns {string} The string to display in the suggestions dropdown for this option
 */
function mapOptionToSuggestedValue(option) {
	if (typeof option !== 'object') {
		throw new Error(`Could not map option to suggested value, unexpected type: ${typeof option}.`);
	}

	if (typeof option.Country_Name !== 'string') {
		throw new Error(`Could not map option to suggested value, option.Country_Name is not a string`);
	}

	return option.Country_Name;
}

/**
 * @typedef CharacterHighlight - The character and whether it should be highlighted
 * @type {Array}
 * @property {string} 0 - the character in the suggestion
 * @property {boolean} 1 - should it be highlighted?
 */

/**
 * @param {string} suggestion - Text which is going to be suggested to the user
 * @param {string} query - Text which was typed into the autocomplete text input field by the user
 * @returns {CharacterHighlight[]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
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
 * @param {CustomOption} option - The option to transform into a suggestion string
 * @param {string} [query] - Text which was typed into the autocomplete text input field by the user
 * @returns {string} The string to display in the suggestions dropdown for this option
 */
function suggestionTemplate(option, query) {
	if(typeof option === 'string') return option;

	/**
	 * @type {CharacterHighlight[]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
	 */
	const characters = highlightSuggestion(option.name, query || option.name);

	let output = '';
	for (const [character, shoudHighlight] of characters) {
		if (shoudHighlight) {
			output += `<span class="o-autocomplete__option--highlight">${character}</span>`;
		} else {
			output += `${character}`;
		}
	}
	output += ` <span>(${option.Continent_Name})</span>`;

	const span = document.createElement('span');
	span.setAttribute('aria-label', option.Country_Name);
	span.innerHTML = output;
	return span.outerHTML;
}

/**
 * @typedef {Function} PopulateOptions
 * @property {Array<string>} options - The options which match the rext which was typed into the autocomplete by the user
 */

/**
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateOptions} populateOptions - Function to call when ready to update the suggestions dropdown
 * @returns {void}
 */
function customSuggestions(query, populateOptions) {
	const suggestions = data;

	if (!query) {
		populateOptions([]);
		return;
	}
	suggestions.sort(function(a,b) {
		return a.Country_Name.localeCompare(b.Country_Name);
	});

	const filteredOptions = [];
	for (const suggestion of suggestions) {
		const lowercaseSuggestion = suggestion.Country_Name.toLocaleLowerCase();
		if (lowercaseSuggestion.startsWith(query.toLocaleLowerCase())) {
			filteredOptions.push(suggestion);
		}
	}
	populateOptions(filteredOptions);
}

new Autocomplete(document.querySelector('[data-o-component="o-autocomplete"]'), {
	source: customSuggestions,
	suggestionTemplate,
	mapOptionToSuggestedValue,
	defaultValue: data.find((d) => d['Two_Letter_Country_Code'] === 'GB')?.Country_Name,
	onConfirm: function (option) {
		// eslint-disable-next-line no-console
		console.log('You chose option', option);
	}
});
