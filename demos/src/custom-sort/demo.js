import '../../../main.js';

/**
 * @typedef {Function} PopulateResults
 * @property {Array<string>} results - The results to show in the suggestions dropdown
 */

/**
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateResults} populateResults - Function to call when ready to update the suggestions dropdown
 * @returns {void}
 */
window.customSort = function customSort(query, populateResults) {
	const results = [
		'france',
		'germany',
		'united kingdom'
	];

	query = query.toLocaleLowerCase();
	const filteredResults = results.filter(result => {
		const shouldRemove = result.indexOf(query) !== -1;
		return shouldRemove;
	});
	populateResults(filteredResults);
};

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
