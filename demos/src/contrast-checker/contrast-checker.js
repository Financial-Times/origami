import { getContrastRatio, getWCAGRating } from '../shared/contrast-ratio.js';
import { getHexValues, mixHexes, expandHexValues } from '../shared/colors-mix.js';

document.addEventListener('DOMContentLoaded', () => {
	const form = document.forms[0];
	const foreground = form['foreground'];
	const background = form['background'];
	form.addEventListener('change', () => {
		showContrastRatio(foreground, background);
	});

	showContrastRatio(foreground, background);

	document.querySelector('.trigger-input').addEventListener('click', () => {
		Origami['o-overlay'].getOverlays()['mixer-overlay'].open(); //eslint-disable-line no-undef
	});
});

function showContrastRatio(text, background) {
	const textHex = expandHexValues(changeColor(text.value, 'foreground'));
	const backgroundHex = expandHexValues(changeColor(background.value, 'background'));

	const ratio = getContrastRatio(textHex, backgroundHex);
	const rating = getWCAGRating(ratio, text.value, background.value);

	document.querySelector('.combination').innerHTML = rating.combination;
	document.querySelector('.contrast-ratio').innerHTML = `Contrast ratio: <strong>${ratio}</strong>`;

	const ratingMessage = document.querySelector('.rating-message');
	ratingMessage.className = `rating-message rating-result--${rating.wcagRating.toLowerCase()}`;
	ratingMessage.innerHTML = rating.message;

	const wcagRating = document.querySelector('.wcag-rating');
	wcagRating.className = `wcag-rating rating-result--${rating.wcagRating.toLowerCase()}`;
	wcagRating.textContent = `WCAG ${rating.wcagRating}`;
}

function changeColor(colorName, property) {
	const root = document.documentElement;
	let hexValue = getComputedStyle(root).getPropertyValue(`--o-colors-${colorName}`);

	if (hexValue.length <= 0) { hexValue = colorName; }

	root.style.setProperty(`--${property}`, hexValue);
	return hexValue.replace('#', '').trim();
}

let eventsAdded = false;
document.addEventListener('oOverlay.ready', () => {
	generateRange();

	document.forms[0]['overlay-fieldset'].addEventListener('change', generateRange);

	if (!eventsAdded) {
		document.getElementById('add-mix').addEventListener('click', () => {
			const range = document.forms[0]['range'];
			addMixedSwatch('foreground', range.value);
			addMixedSwatch('background', range.value);
		});

		eventsAdded = true;
	}
});

const generateRange = () => {
	const form = document.forms[0];
	const hexes = getHexValues(form['mixer'].value, form['base'].value);

	const hexArray = mixHexes(hexes.mixer, hexes.base);
	const range = form['range'];

	hexArray.forEach((hex, index) => {
		const input = range[index];
		input.style.backgroundColor = hex;
		input.setAttribute('value', hex);
	});
};

const addMixedSwatch = (panelName, color) => {
	const label = document.createElement('label');
	label.setAttribute('title', color);

	label.innerHTML = `
		<input type="radio" name="${panelName}" value="${color}" style="background-color: ${color};"/>
	`;

	document.forms[0][panelName][0].appendChild(label);
};
