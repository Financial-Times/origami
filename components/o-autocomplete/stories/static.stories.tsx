import {StoryFn} from '@storybook/react';
import '../demos/src/shared.scss';
import oAutoComplete from '../main.js';
import '@financial-times/o-forms';
import {useEffect} from 'react';

export default {
	title: 'Maintained/o-autocomplete',
	parameters: {
		html: {},
	},
	argTypes: {},
};

export const Static: StoryFn = args => {
	useEffect(() => {
		oAutoComplete.init();
	}, []);

	return (
		<div className="o-forms-field">
			<span className="o-forms-title">
				<label htmlFor="my-autocomplete" className="o-forms-title__main">
					Select your country
				</label>
			</span>
			{/* o-forms styles for select input needed for the core experience */}
			{/* o-forms styles for text input needed for the enhances JS experience*/}
			<span className="o-forms-input o-forms-input--text o-forms-input--select">
				<span data-o-component="o-autocomplete" className="o-autocomplete">
					<select id="my-autocomplete">
						<option value=""></option>
						<option>Afghanistan</option>
						<option>Akrotiri</option>
						<option>Albania</option>
						<option>Algeria</option>
						<option>American Samoa</option>
						<option>Andorra</option>
						<option>Angola</option>
						<option>Anguilla</option>
						<option>Antarctica</option>
						<option>Antigua and Barbuda</option>
						<option>Argentina</option>
						<option>Armenia</option>
						<option>Aruba</option>
						<option>Ashmore and Cartier Islands</option>
						<option>Australia</option>
						<option>Austria</option>
						<option>Azerbaijan</option>
						<option>Bahamas, The</option>
						<option>Bahrain</option>
						<option>Bangladesh</option>
						<option>Barbados</option>
						<option>Bassas da India</option>
						<option>Belarus</option>
						<option>Belgium</option>
						<option>Belize</option>
						<option>Benin</option>
						<option>Bermuda</option>
						<option>Bhutan</option>
						<option>Bolivia</option>
						<option>Bosnia and Herzegovina</option>
						<option>Botswana</option>
						<option>Bouvet Island</option>
						<option>Brazil</option>
						<option>British Indian Ocean Territory</option>
						<option>British Virgin Islands</option>
						<option>Brunei</option>
						<option>Bulgaria</option>
						<option>Burkina Faso</option>
						<option>Burma</option>
						<option>Burundi</option>
						<option>Cambodia</option>
						<option>Cameroon</option>
						<option>Canada</option>
						<option>Cape Verde</option>
						<option>Cayman Islands</option>
						<option>Central African Republic</option>
						<option>Chad</option>
						<option>Chile</option>
						<option>China</option>
						<option>Christmas Island</option>
						<option>Clipperton Island</option>
						<option>Cocos (Keeling) Islands</option>
						<option>Colombia</option>
						<option>Comoros</option>
						<option>Congo</option>
						<option>Cook Islands</option>
						<option>Coral Sea Islands</option>
						<option>Costa Rica</option>
						<option>Cote d\'Ivoire</option>
						<option>Croatia</option>
						<option>Cuba</option>
						<option>Cyprus</option>
						<option>Czech Republic</option>
						<option>Denmark</option>
						<option>Dhekelia</option>
						<option>Djibouti</option>
						<option>Dominica</option>
						<option>Dominican Republic</option>
						<option>Ecuador</option>
						<option>Egypt</option>
						<option>El Salvador</option>
						<option>Equatorial Guinea</option>
						<option>Eritrea</option>
						<option>Estonia</option>
						<option>Ethiopia</option>
						<option>Europa Island</option>
						<option>Falkland Islands</option>
						<option>Faroe Islands</option>
						<option>Fiji</option>
						<option>Finland</option>
						<option>France</option>
						<option>French Guiana</option>
						<option>French Polynesia</option>
						<option>French Southern and Antarctic Lands</option>
						<option>Gabon</option>
						<option>Gambia,</option>
						<option>Gaza Strip</option>
						<option>Georgia</option>
						<option>Germany</option>
						<option>Ghana</option>
						<option>Gibraltar</option>
						<option>Glorioso Islands</option>
						<option>Greece</option>
						<option>Greenland</option>
						<option>Grenada</option>
						<option>Guadeloupe</option>
						<option>Guam</option>
						<option>Guatemala</option>
						<option>Guernsey</option>
						<option>Guinea</option>
						<option>Guinea-Bissau</option>
						<option>Guyana</option>
						<option>Haiti</option>
						<option>Heard Island and McDonald Islands</option>
						<option>Holy See (Vatican City)</option>
						<option>Honduras</option>
						<option>Hong Kong</option>
						<option>Hungary</option>
						<option>Iceland</option>
						<option>India</option>
						<option>Indonesia</option>
						<option>Iran</option>
						<option>Iraq</option>
						<option>Ireland</option>
						<option>Isle of Man</option>
						<option>Israel</option>
						<option>Italy</option>
						<option>Jamaica</option>
						<option>Jan Mayen</option>
						<option>Japan</option>
						<option>Jersey</option>
						<option>Jordan</option>
						<option>Juan de Nova Island</option>
						<option>Kazakhstan</option>
						<option>Kenya</option>
						<option>Kiribati</option>
						<option>Korea, North</option>
						<option>Korea, South</option>
						<option>Kuwait</option>
						<option>Kyrgyzstan</option>
						<option>Laos</option>
						<option>Latvia</option>
						<option>Lebanon</option>
						<option>Lesotho</option>
						<option>Liberia</option>
						<option>Libya</option>
						<option>Liechtenstein</option>
						<option>Lithuania</option>
						<option>Luxembourg</option>
						<option>Macau</option>
						<option>Macedonia</option>
						<option>Madagascar</option>
						<option>Malawi</option>
						<option>Malaysia</option>
						<option>Maldives</option>
						<option>Mali</option>
						<option>Malta</option>
						<option>Marshall Islands</option>
						<option>Martinique</option>
						<option>Mauritania</option>
						<option>Mauritius</option>
						<option>Mayotte</option>
						<option>Mexico</option>
						<option>Micronesia, Federated States of</option>
						<option>Moldova</option>
						<option>Monaco</option>
						<option>Mongolia</option>
						<option>Montserrat</option>
						<option>Morocco</option>
						<option>Mozambique</option>
						<option>Namibia</option>
						<option>Nauru</option>
						<option>Navassa Island</option>
						<option>Nepal</option>
						<option>Netherlands</option>
						<option>Netherlands Antilles</option>
						<option>New Caledonia</option>
						<option>New Zealand</option>
						<option>Nicaragua</option>
						<option>Niger</option>
						<option>Nigeria</option>
						<option>Niue</option>
						<option>Norfolk Island</option>
						<option>Northern Mariana Islands</option>
						<option>Norway</option>
						<option>Oman</option>
						<option>Pakistan</option>
						<option>Palau</option>
						<option>Panama</option>
						<option>Papua New Guinea</option>
						<option>Paracel Islands</option>
						<option>Paraguay</option>
						<option>Peru</option>
						<option>Philippines</option>
						<option>Pitcairn Islands</option>
						<option>Poland</option>
						<option>Portugal</option>
						<option>Puerto Rico</option>
						<option>Qatar</option>
						<option>Reunion</option>
						<option>Romania</option>
						<option>Russia</option>
						<option>Rwanda</option>
						<option>Saint Helena</option>
						<option>Saint Kitts and Nevis</option>
						<option>Saint Lucia</option>
						<option>Saint Pierre and Miquelon</option>
						<option>Saint Vincent and the Grenadines</option>
						<option>Samoa</option>
						<option>San Marino</option>
						<option>Sao Tome and Principe</option>
						<option>Saudi Arabia</option>
						<option>Senegal</option>
						<option>Serbia and Montenegro</option>
						<option>Seychelles</option>
						<option>Sierra Leone</option>
						<option>Singapore</option>
						<option>Slovakia</option>
						<option>Slovenia</option>
						<option>Solomon Islands</option>
						<option>Somalia</option>
						<option>South Africa</option>
						<option>South Georgia and the South Sandwich Islands</option>
						<option>Spain</option>
						<option>Spratly Islands</option>
						<option>Sri Lanka</option>
						<option>Sudan</option>
						<option>Suriname</option>
						<option>Svalbard</option>
						<option>Swaziland</option>
						<option>Sweden</option>
						<option>Switzerland</option>
						<option>Syria</option>
						<option>Taiwan</option>
						<option>Tajikistan</option>
						<option>Tanzania</option>
						<option>Thailand</option>
						<option>Timor-Leste</option>
						<option>Togo</option>
						<option>Tokelau</option>
						<option>Tonga</option>
						<option>Trinidad and Tobago</option>
						<option>Tromelin Island</option>
						<option>Tunisia</option>
						<option>Turkey</option>
						<option>Turkmenistan</option>
						<option>Turks and Caicos Islands</option>
						<option>Tuvalu</option>
						<option>Uganda</option>
						<option>Ukraine</option>
						<option>United Arab Emirates</option>
						<option>United Kingdom</option>
						<option>United States</option>
						<option>Uruguay</option>
						<option>Uzbekistan</option>
						<option>Vanuatu</option>
						<option>Venezuela</option>
						<option>Vietnam</option>
						<option>Virgin Islands</option>
						<option>Wake Island</option>
						<option>Wallis and Futuna</option>
						<option>West Bank</option>
						<option>Western Sahara</option>
						<option>Yemen</option>
						<option>Zambia</option>
						<option>Zimbabwe</option>
					</select>
				</span>
			</span>
		</div>
	);
};
