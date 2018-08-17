const contrastRatio = require('./contrast-ratio');

document.addEventListener('DOMContentLoaded', function() {
	const mixer = document.getElementById('mixer-selector');
	const base = document.getElementById('base-selector');

	mixer.addEventListener('change', () => {
		oColorsMix(mixer.value, base.value);
	});

	base.addEventListener('change', () => {
		oColorsMix(mixer.value, base.value);
	});

	oColorsMix(mixer.value, base.value);
	let defaultHex = getComputedStyle(document.documentElement).getPropertyValue(`--o-colors-${mixer.value}-80`).trim();
	fillCodeSnippets(defaultHex, mixer.value, base.value, 8);
});

function oColorsMix(mixer = 'black', base = 'paper') {
	const mixerHex = getComputedStyle(document.documentElement).getPropertyValue(`--o-colors-${mixer}`).replace(' #','');
	const baseHex = getComputedStyle(document.documentElement).getPropertyValue(`--o-colors-${base}`).replace(' #','');
	const textColorRGB = getComputedStyle(document.body).getPropertyValue('color');

	let textColor = textColorRGB === 'rgb(0, 0, 0)' ? '#000000' : '#f3f3f3';

	let ratio = contrastRatio.oColorsGetContrastRatio(textColor, baseHex);

	if (ratio <= 3) { //if it fails accessbility
		textColor = textColor === '#000000' ? '#f3f3f3' : '#000000';
		document.body.style.setProperty('--color', textColor);
	}

	const mixHex = mixColors(mixerHex, baseHex);

	mixHex.forEach((hex, index) => {
		let range = document.querySelector('.mix-range');
		let swatch = range.querySelector(`.percent-${index}0 .sqr`);
		swatch.style.backgroundColor = hex;

		if (index === 0) {
			document.body.style.backgroundColor = hex;
		}

		swatch.addEventListener('click', () => {
			range.querySelectorAll(`.sqr`).forEach(sqr => {
				sqr.style.borderWidth = '1px';
				sqr.style.margin = '2px';
			});

			swatch.style.borderWidth = '3px';
			swatch.style.margin = '0';

			fillCodeSnippets(hex, mixer, base, index);
		});
	});
}

const fillCodeSnippets = (hex, mixer, base, index) => {
	document.getElementById('hex-value').innerText = hex;
	document.getElementById('code-snippet').innerText = `oColorsMix(${mixer}, ${base}, ${index}0)`;
};

function mixColors(mixer, base) {
	const radix = 16;
	const decimalToHex = decimal => decimal.toString(radix);
	const hexToDecimal = hex => parseInt(hex, radix);

	let percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

	return percentages.map(percent => {

		let hexValue = "#";

		for (let i = 0; i <= 5; i += 2) {
			let mixPair = hexToDecimal(mixer.substr(i, 2)); // extract r, g, b pairs for mixer color
			let basePair = hexToDecimal(base.substr(i, 2)); // extract r, g, b pairs for base color

			// combine the r/g/b pairs from each color, based on percentage
			let combinedPair = decimalToHex(Math.round(basePair + (mixPair - basePair) * (percent / 100.0)));

			while (combinedPair.length < 2) { combinedPair = `0${combinedPair}`; }// prepend a '0' if combinedPair results in a single digit

			hexValue += combinedPair; //add new pair to hex string
		}

		return hexValue;
	});
}
