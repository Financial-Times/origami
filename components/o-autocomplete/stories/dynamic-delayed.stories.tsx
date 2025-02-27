import {StoryFn} from '@storybook/react';
import '../demos/src/shared.scss';
import '@financial-times/o-forms';
import {useEffect} from 'react';
import oAutoComplete from '../main.js';
import {debounce} from '@financial-times/o-utils';

export default {
	title: 'Maintained/o-autocomplete',
	parameters: {
		html: {},
	},
	argTypes: {},
};

/**
 * @typedef {Function} PopulateOptions
 * @property {Array<string>} options - The options which match the rext which was typed into the autocomplete by the user
 */

let suggestionTimeoutId;

/**
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateOptions} populateOptions - Function to call when ready to update the suggestions dropdown
 * @returns {void}
 */
function customSuggestions(query, populateOptions) {
	clearTimeout(suggestionTimeoutId);
	if (!query) {
		populateOptions([]);
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
		"Cote d'Ivoire",
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
		'Zimbabwe',
	];
	suggestionTimeoutId = setTimeout(() => {
		suggestions.sort(function (a, b) {
			return a.localeCompare(b);
		});

		const filteredOptions = [];
		for (const suggestion of suggestions) {
			const lowercaseSuggestion = suggestion.toLocaleLowerCase();
			if (lowercaseSuggestion.startsWith(query.toLocaleLowerCase())) {
				filteredOptions.push(suggestion);
			}
		}
		populateOptions(filteredOptions);
	}, 1000);
}

window.customSuggestions = debounce(customSuggestions, 100);
export const DynamicDelayed: StoryFn = args => {
	useEffect(() => {
		oAutoComplete.init();
	}, []);

	return (
		<form data-o-component="o-forms">
			<div class="o-forms-field">
				<span class="o-forms-title">
					<label for="my-autocomplete" class="o-forms-title__main">
						Select your country
					</label>
				</span>
				<span class="o-forms-input o-forms-input--text">
					<span
						data-o-component="o-autocomplete"
						data-o-autocomplete-source="customSuggestions"
						class="o-autocomplete">
						{/*If the JavaScript executes, then this input will be progressively enhanced to an autocomplete component*/}
						<input
							required
							type="text"
							name="text-example"
							id="my-autocomplete"
						/>
					</span>
					<span role="alert" class="o-forms-input__error">
						Please fill out this field
					</span>
				</span>
			</div>
		</form>
	);
};
