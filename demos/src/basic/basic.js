import '../../../main.js';

/**
 * @param {string} suggestion - Text which is going to be suggested to the user
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @returns {[string, boolean][]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
 */
window.customHighlighter = function customHighlighter(suggestion, query) {
	const result = suggestion.split('');

	const matchIndex = suggestion.toLocaleLowerCase().indexOf(query);
	return result.map(function(character, index) {
		let shoudHighlight = true;
		if (index >= matchIndex && index <= matchIndex + query.length - 1) {
			shoudHighlight = false;
		}
		return [character, shoudHighlight];
	});
};

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
