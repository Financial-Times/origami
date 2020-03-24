function getWCAGRating(ratio, foreground, background) {
	let wcagRating;
	let message = 'This combination passes WCAG color contrast guidelines';
	const combination = `<code>${foreground}</code> on <code>${background}</code>`;

	if (ratio >= 7) {
		wcagRating = 'AAA';
	} else if (ratio >= 4.5) {
		wcagRating = 'AA';
	} else if (ratio >= 3) {
		wcagRating = 'AA18';
		message = `Caution: When using this combination, text should be larger than 18px to pass WCAG color contrast guidelines.`;
	} else {
		wcagRating = 'Fail';
		message = `This combination does not pass WCAG color contrast guidelines.`;
	}

	return {
		combination,
		wcagRating,
		message
	};
}


function getContrastRatio(foreground, background) {
	const l1 = oColorsColorLuminance(foreground) + 0.05;
	const l2 = oColorsColorLuminance(background) + 0.05;
	let ratio = l1 / l2;

	if (l2 > l1) {
		ratio = 1 / ratio;
	}

	ratio = preciseFloor(ratio);
	return ratio;
}

function preciseFloor(number, decimals = 2) {
	const multiplier = Math.pow(10, decimals);
	return Math.floor(number * multiplier) / multiplier;
}

function oColorsColorLuminance(hex) {
	hex = hex.trim() === 'gray' ? '#808080' : hex; // an equal mix of black and white will always default to 'gray' instead of a hex value
	const hexValue = hex.replace('#', '').trim();
	const rgbPairs = hexValue.match(/.{1,2}/g);

	const decimals = rgbPairs.map(pair => {
		return parseInt(pair, 16);
	});

	const colors = {
		'red': decimals[0],
		'green': decimals[1],
		'blue': decimals[2]
	};

	Object.keys(colors).forEach(color => {
		colors[color] = colors[color] / 255;

		if (colors[color] < 0.03928) {
			colors[color] = colors[color] / 12.92;
		} else {
			colors[color] = (colors[color] + 0.055) / 1.055;
			colors[color] = Math.pow(colors[color], 2.4);
		}

	});
	return colors['red'] * 0.2126 + colors['green'] * 0.7152 + colors['blue'] * 0.0722;
}

export default {
	getWCAGRating,
	getContrastRatio
};
