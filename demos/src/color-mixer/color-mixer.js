import { getContrastRatio } from '../shared/contrast-ratio.js';
import { getHexValues, mixHexes } from '../shared/colors-mix.js';

document.addEventListener('o.DOMContentLoaded', function() {
	const forms = document.forms;
	const mixer = forms[0]['mixer'];
	const base = forms[0]['base'];

	forms[0].addEventListener('change', () => {
		mixColors(mixer.value, base.value);

		const hex = document.querySelector('input[type=radio]:checked');
		const percent = hex.nextElementSibling.innerText.replace('%', '');
		fillCodeSnippets(hex.value, mixer.value, base.value, percent);
	});

	mixColors(mixer.value, base.value);

	//set visible hex value and sass function to default values of mixColors
	forms[1]['range'][5].checked = true;
	const defaultHex = getComputedStyle(document.documentElement).getPropertyValue(`--o-colors-${mixer.value}-50`);
	fillCodeSnippets(defaultHex, mixer.value, base.value, 50);
});

const checkTextContrast = (background) => {
	const root = document.documentElement;
	const text = getComputedStyle(root).getPropertyValue('--color');

	let textColor = text === '#000000' ? '#000000' : '#f3f3f3';
	const ratio = getContrastRatio(textColor, background);

	if (ratio <= 3) { // if it fails accessbility, change text colour
		textColor = textColor === '#000000' ? '#f3f3f3' : '#000000';
		root.style.setProperty('--color', textColor);
	}
};

const mixColors = (mixer = 'black', base = 'paper') => {
	const root = document.documentElement;
	const hexes = getHexValues(mixer, base);
	root.style.setProperty('--background', `#${hexes.base}`);

	const hexArray = mixHexes(hexes.mixer, hexes.base);
	fillSwatches(hexArray, mixer, base);
	checkTextContrast(`#${hexes.base}`);
};

const fillSwatches = (hexes, mixer, base) => {
	const range = document.forms[1]['range'];
	hexes.forEach((hex, index) => {
		const swatch = range[index];
		swatch.style.backgroundColor = swatch.value = hex;

		swatch.addEventListener('click', (e) => fillCodeSnippets(e.target.value, mixer, base, index * 10));
	});
};

const fillCodeSnippets = (hex, mixer, base, index) => {
	document.getElementById('hex-value').innerText = hex.trim();
	document.getElementById('code-snippet').innerText = `oColorsMix(${mixer}, ${base}, ${index})`;
};