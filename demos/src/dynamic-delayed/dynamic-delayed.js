import '../../../main.js';

/**
 * @typedef {Function} PopulateResults
 * @property {Array<string>} results - The results to show in the suggestions dropdown
 */


let suggestionTimeoutId;
/**
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateResults} populateResults - Function to call when ready to update the suggestions dropdown
 * @returns {void}
 */
function customSuggestions(query, populateResults) {
	clearTimeout(suggestionTimeoutId);
	if (!query) {
		populateResults([]);
		return;
	}
	const suggestions = [
		'Afghanistan',
		'Akrotiri',
		'Albania',
		'Algeria',
		'American Samoa',
		'Andorra',
		'Angola',
		'Anguilla',
		'Antarctica',
		'Antigua and Barbuda',
		'Argentina',
		'Armenia',
		'Aruba',
		'Ashmore and Cartier Islands',
		'Australia',
		'Austria',
		'Azerbaijan',
		'Bahamas, The',
		'Bahrain',
		'Bangladesh',
		'Barbados',
		'Bassas da India',
		'Belarus',
		'Belgium',
		'Belize',
		'Benin',
		'Bermuda',
		'Bhutan',
		'Bolivia',
		'Bosnia and Herzegovina',
		'Botswana',
		'Bouvet Island',
		'Brazil',
		'British Indian Ocean Territory',
		'British Virgin Islands',
		'Brunei',
		'Bulgaria',
		'Burkina Faso',
		'Burma',
		'Burundi',
		'Cambodia',
		'Cameroon',
		'Canada',
		'Cape Verde',
		'Cayman Islands',
		'Central African Republic',
		'Chad',
		'Chile',
		'China',
		'Christmas Island',
		'Clipperton Island',
		'Cocos (Keeling) Islands',
		'Colombia',
		'Comoros',
		'Congo',
		'Cook Islands',
		'Coral Sea Islands',
		'Costa Rica',
		'Cote d\'Ivoire',
		'Croatia',
		'Cuba',
		'Cyprus',
		'Czech Republic',
		'Denmark',
		'Dhekelia',
		'Djibouti',
		'Dominica',
		'Dominican Republic',
		'Ecuador',
		'Egypt',
		'El Salvador',
		'Equatorial Guinea',
		'Eritrea',
		'Estonia',
		'Ethiopia',
		'Europa Island',
		'Falkland Islands',
		'Faroe Islands',
		'Fiji',
		'Finland',
		'France',
		'French Guiana',
		'French Polynesia',
		'French Southern and Antarctic Lands',
		'Gabon',
		'Gambia,',
		'Gaza Strip',
		'Georgia',
		'Germany',
		'Ghana',
		'Gibraltar',
		'Glorioso Islands',
		'Greece',
		'Greenland',
		'Grenada',
		'Guadeloupe',
		'Guam',
		'Guatemala',
		'Guernsey',
		'Guinea',
		'Guinea-Bissau',
		'Guyana',
		'Haiti',
		'Heard Island and McDonald Islands',
		'Holy See (Vatican City)',
		'Honduras',
		'Hong Kong',
		'Hungary',
		'Iceland',
		'India',
		'Indonesia',
		'Iran',
		'Iraq',
		'Ireland',
		'Isle of Man',
		'Israel',
		'Italy',
		'Jamaica',
		'Jan Mayen',
		'Japan',
		'Jersey',
		'Jordan',
		'Juan de Nova Island',
		'Kazakhstan',
		'Kenya',
		'Kiribati',
		'Korea, North',
		'Korea, South',
		'Kuwait',
		'Kyrgyzstan',
		'Laos',
		'Latvia',
		'Lebanon',
		'Lesotho',
		'Liberia',
		'Libya',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Macau',
		'Macedonia',
		'Madagascar',
		'Malawi',
		'Malaysia',
		'Maldives',
		'Mali',
		'Malta',
		'Marshall Islands',
		'Martinique',
		'Mauritania',
		'Mauritius',
		'Mayotte',
		'Mexico',
		'Micronesia, Federated States of',
		'Moldova',
		'Monaco',
		'Mongolia',
		'Montserrat',
		'Morocco',
		'Mozambique',
		'Namibia',
		'Nauru',
		'Navassa Island',
		'Nepal',
		'Netherlands',
		'Netherlands Antilles',
		'New Caledonia',
		'New Zealand',
		'Nicaragua',
		'Niger',
		'Nigeria',
		'Niue',
		'Norfolk Island',
		'Northern Mariana Islands',
		'Norway',
		'Oman',
		'Pakistan',
		'Palau',
		'Panama',
		'Papua New Guinea',
		'Paracel Islands',
		'Paraguay',
		'Peru',
		'Philippines',
		'Pitcairn Islands',
		'Poland',
		'Portugal',
		'Puerto Rico',
		'Qatar',
		'Reunion',
		'Romania',
		'Russia',
		'Rwanda',
		'Saint Helena',
		'Saint Kitts and Nevis',
		'Saint Lucia',
		'Saint Pierre and Miquelon',
		'Saint Vincent and the Grenadines',
		'Samoa',
		'San Marino',
		'Sao Tome and Principe',
		'Saudi Arabia',
		'Senegal',
		'Serbia and Montenegro',
		'Seychelles',
		'Sierra Leone',
		'Singapore',
		'Slovakia',
		'Slovenia',
		'Solomon Islands',
		'Somalia',
		'South Africa',
		'South Georgia and the South Sandwich Islands',
		'Spain',
		'Spratly Islands',
		'Sri Lanka',
		'Sudan',
		'Suriname',
		'Svalbard',
		'Swaziland',
		'Sweden',
		'Switzerland',
		'Syria',
		'Taiwan',
		'Tajikistan',
		'Tanzania',
		'Thailand',
		'Timor-Leste',
		'Togo',
		'Tokelau',
		'Tonga',
		'Trinidad and Tobago',
		'Tromelin Island',
		'Tunisia',
		'Turkey',
		'Turkmenistan',
		'Turks and Caicos Islands',
		'Tuvalu',
		'Uganda',
		'Ukraine',
		'United Arab Emirates',
		'United Kingdom',
		'United States',
		'Uruguay',
		'Uzbekistan',
		'Vanuatu',
		'Venezuela',
		'Vietnam',
		'Virgin Islands',
		'Wake Island',
		'Wallis and Futuna',
		'West Bank',
		'Western Sahara',
		'Yemen',
		'Zambia',
		'Zimbabwe'
	];
	suggestionTimeoutId = setTimeout(() => {
		suggestions.sort(function(a,b) {
			return a.localeCompare(b);
		});

		const filteredResults = [];
		for (const suggestion of suggestions) {
			const lowercaseSuggestion = suggestion.toLocaleLowerCase();
			if (lowercaseSuggestion.startsWith(query.toLocaleLowerCase())) {
				filteredResults.push(suggestion);
			}
		}
		populateResults(filteredResults);
	}, 1000);
}

window.customSuggestions = window.Origami['o-utils'].debounce(customSuggestions, 100);

/**
 * @param {string} suggestion - Text which is going to be suggested to the user
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @returns {[string, boolean][]} An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.
 */
window.customHighlighter = function customHighlighter(suggestion, query) {
	const result = suggestion.split('');

	const matchIndex = suggestion.toLocaleLowerCase().indexOf(query.toLocaleLowerCase());
	return result.map(function(character, index) {
		let shoudHighlight = true;
		const hasMatched = matchIndex > -1;
		const characterIsWithinMatch = index >= matchIndex && index <= matchIndex + query.length - 1;
		if (hasMatched && characterIsWithinMatch) {
			shoudHighlight = false;
		}
		return [character, shoudHighlight];
	});
};

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
