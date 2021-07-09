import '../../../main.js';
import {data} from './data.js';

/**
 * @typedef {Object} CustomOption
 * @property {String} Continent_Code
 * @property {String} Continent_Name
 * @property {String} Country_Name
 * @property {Number} Country_Number
 * @property {String} Three_Letter_Country_Code
 * @property {String} Two_Letter_Country_Code
 */


/**
 * @param {CustomOption|undefined} option - The option to transform into a suggestion string
 * @returns {string} The string to display in the suggestions dropdown for this option
*/
window.optionToSuggestion = function optionToSuggestion(option) {
	if (option) {
		return option.Country_Name;
	}
};

/**
 * @typedef {Function} PopulateResults
 * @property {Array<string>} results - The results to show in the suggestions dropdown
 */

/**
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateResults} populateResults - Function to call when ready to update the suggestions dropdown
 * @returns {void}
 */
window.customSuggestions = function customSuggestions(query, populateResults) {
	const suggestions = data;

	if (!query) {
		populateResults([]);
		return;
	}
	suggestions.sort(function(a,b) {
		return a.Country_Name.localeCompare(b.Country_Name);
	});

	const filteredResults = [];
	for (const suggestion of suggestions) {
		const lowercaseSuggestion = suggestion.Country_Name.toLocaleLowerCase();
		if (lowercaseSuggestion.startsWith(query.toLocaleLowerCase())) {
			filteredResults.push(suggestion);
		}
	}
	populateResults(filteredResults);
};

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
