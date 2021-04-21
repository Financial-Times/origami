const getHexValues = (mixer, base) => {
	const root = getComputedStyle(document.documentElement);
	return {
		mixer: root.getPropertyValue(`--o-colors-${mixer}`).replace(/^\s*#/, ''),
		base: root.getPropertyValue(`--o-colors-${base}`).replace(/^\s*#/, '')
	};
};

const mixHexes = (mixer, base) => {
	const radix = 16;
	const decimalToHex = decimal => decimal.toString(radix);
	const hexToDecimal = hex => parseInt(hex, radix);

	const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

	return percentages.map(percent => {

		let hexValue = "#";

		for (let i = 0; i <= 5; i += 2) {
			const mixPair = hexToDecimal(mixer.substr(i, 2)); // extract r, g, b pairs for mixer color
			const basePair = hexToDecimal(base.substr(i, 2)); // extract r, g, b pairs for base color

			// combine the r/g/b pairs from each color, based on percentage
			let combinedPair = decimalToHex(Math.round(basePair + (mixPair - basePair) * (percent / 100.0)));

			while (combinedPair.length < 2) { combinedPair = `0${combinedPair}`; }// prepend a '0' if combinedPair results in a single digit

			hexValue += combinedPair; //add new pair to hex string
		}

		return hexValue;
	});
};

export {
	getHexValues,
	mixHexes
};
