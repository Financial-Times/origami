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
 * @param {CustomOption} option - The option to transform into a suggestion string
 * @param {string} [query] - Text which was typed into the autocomplete text input field by the user
 * @returns {string} The string to display in the suggestions dropdown for this option
 */
function suggestionTemplate(option, query) { //eslint-disable-line no-unused-vars
	if(typeof option === 'string') return option;
	return `<div>
		<strong>${option.Country_Name}</strong>
		<span> </span>
		<em>${option.Continent_Name}</em>
	</div>`
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
