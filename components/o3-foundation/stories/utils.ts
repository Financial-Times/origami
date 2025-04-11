import {Color} from './color-sb-story-components';

export function transformCode(code: string) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(code, 'text/html');

	// Remove the edit panel
	let editPanel = doc.querySelector('.edit-panel');
	if (editPanel) {
		editPanel.remove();
	}

	// Remove the class 'o3-grid-item' from all items
	let gridItems = doc.querySelectorAll('.o3-grid-item');
	gridItems.forEach(item => {
		item.removeAttribute('class');
	});

	// Serialize the modified DOM back to a string
	let modifiedHtmlString = doc.body.innerHTML;
	return modifiedHtmlString;
}

export type TokenType = {
	type: string;
	shortName: string;
	value: string;
	css: string;
	attributes: {
		item: string;
		subitem: string;
	};
};

export type ColorTokenType = TokenType & {
	origamiKeys: string[];
};

export type TintTokenType = TokenType & {
	origamiTint: {
		base: string;
		value: number;
	};
};

export function getColorPalette(
	tokens: ColorTokenType[],
	paletteType?: 'primary' | 'secondary' | 'tertiary',
	whitelabelBrand?: boolean
) {
	if (paletteType) {
		return Object.values(tokens)
			.filter(
				value =>
					value.type === 'color' && value.origamiKeys?.includes(paletteType)
			)
			.map(value => ({
				name: value.shortName,
				css: value.value,
			}));
	}

	if (whitelabelBrand) {
		return Object.values(tokens)
			.filter(
				value =>
					value.type === 'color' &&
					value.attributes.item === 'palette' &&
					!('origamiTint' in value)
			)
			.map(value => ({
				name: value.shortName,
				css: value.value,
			}));
	}

	return Object.values(tokens)
		.filter(
			value =>
				value.type === 'color' &&
				value.attributes.item === 'palette' &&
				value.origamiKeys
		)
		.map(value => ({
			name: value.shortName,
			css: value.value,
			paletteType: value.origamiKeys[1],
		}))
		.reduce(
			(acc, color) => {
				// Destructure to separate the base property from the rest
				const {paletteType, ...rest} = color;
				if (!acc[paletteType]) {
					acc[paletteType] = [];
				}
				acc[paletteType].push(rest);
				return acc;
			},
			{} as Record<string, Omit<Color, 'paletteType'>[]>
		);
}

export function getColorTints(tokens: TintTokenType[]) {
	return Object.values(tokens)
		.filter(value => value.type === 'color' && value.origamiTint)
		.map(value => ({
			name: value.shortName,
			css: value.value,
			base: value.origamiTint?.base,
		}))
		.reduce(
			(acc, color) => {
				// Destructure to separate the base property from the rest
				const {base, ...rest} = color;
				if (!acc[base]) {
					acc[base] = [];
				}
				acc[base].push(rest);
				return acc;
			},
			{} as Record<string, Omit<Color, 'base'>[]>
		);
}

export function getColors(
	tokens: ColorTokenType[] | TintTokenType[],
	whitelabelBrand?: boolean
) {
	const colorPalettes = whitelabelBrand
		? {primary: getColorPalette(tokens as ColorTokenType[], undefined, true)}
		: getColorPalette(tokens as ColorTokenType[]);
	const colorTints = getColorTints(tokens as TintTokenType[]);
	return {
		palettes: colorPalettes,
		tones: colorTints,
	};
}

export function getColorUsecases(tokens: TokenType[]) {
	const useCasePrefix = '--o3-color-use-case-';
	return Object.values(tokens)
		.filter(
			value => value.type === 'color' && value.attributes.item === 'use-case'
		)
		.map(value => ({
			name: value.css.slice(useCasePrefix.length),
			css: value.value,
			base: value.attributes.subitem,
		}))
		.reduce(
			(acc, color) => {
				// Destructure to separate the base property from the rest
				const {base, ...rest} = color;
				if (!acc[base]) {
					acc[base] = [];
				}
				acc[base].push(rest);
				return acc;
			},
			{} as Record<string, Omit<Color, 'base'>[]>
		);
}

export function getWCAGRating(ratio: number) {
	let wcagRating;
	let message = 'This combination passes WCAG color contrast guidelines';
	let status = 'pass';

	if (ratio >= 7) {
		wcagRating = 'AAA';
	} else if (ratio >= 4.5) {
		wcagRating = 'AA';
	} else if (ratio >= 3) {
		wcagRating = 'AA18';
		message = `Caution: When using this combination, text should be larger than 18px to pass WCAG color contrast guidelines.`;
		status = 'warn';
	} else {
		wcagRating = 'Fail';
		message = `This combination does not pass WCAG color contrast guidelines.`;
		status = 'fail';
	}

	return {
		wcagRating,
		message,
		status,
	};
}

export function getContrastRatio(foreground: string, background: string) {
	const l1 = getColorLuminance(foreground) + 0.05;
	const l2 = getColorLuminance(background) + 0.05;
	let ratio = l1 / l2;

	if (l2 > l1) {
		ratio = 1 / ratio;
	}

	ratio = preciseFloor(ratio);
	return ratio;
}

function preciseFloor(number: number, decimals = 2) {
	const multiplier = Math.pow(10, decimals);
	return Math.floor(number * multiplier) / multiplier;
}

function getColorLuminance(hex: string) {
	hex = hex.trim() === 'gray' ? '#808080' : hex; // an equal mix of black and white will always default to 'gray' instead of a hex value
	const hexValue = hex.replace('#', '').trim();
	const rgbPairs = hexValue.match(/.{1,2}/g) || [];

	const decimals = rgbPairs.map(pair => {
		return parseInt(pair, 16);
	});

	const colors = {
		red: decimals[0],
		green: decimals[1],
		blue: decimals[2],
	};

	(Object.keys(colors) as ['red', 'blue', 'green']).forEach(color => {
		colors[color] = colors[color] / 255;

		if (colors[color] < 0.03928) {
			colors[color] = colors[color] / 12.92;
		} else {
			colors[color] = (colors[color] + 0.055) / 1.055;
			colors[color] = Math.pow(colors[color], 2.4);
		}
	});
	return (
		colors['red'] * 0.2126 + colors['green'] * 0.7152 + colors['blue'] * 0.0722
	);
}
