export interface StyleArguments {
	theme?: string;
	brand?: string;
}

interface StyleAttributes {
	'data-o3-theme'?: string;
	'data-o3-brand'?: string;
}

export const getStyleAttributes: (style: StyleArguments) => StyleAttributes = ({
	brand,
	theme,
}) => {
	const outputStyleArguments: StyleAttributes = {};
	if (theme) {
		outputStyleArguments['data-o3-theme'] = theme;
	}
	if (brand) {
		outputStyleArguments['data-o3-brand'] = brand;
	}
	return outputStyleArguments;
};
