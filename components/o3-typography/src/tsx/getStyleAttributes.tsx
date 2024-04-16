export interface StyleArguments {
	theme?: string;
}

interface StyleAttributes {
	'data-o3-theme'?: string;
}

export const getStyleAttributes: (style: StyleArguments) => StyleAttributes = ({
	theme,
}) => {
	const outputStyleArguments: StyleAttributes = {};
	if (theme) {
		outputStyleArguments['data-o3-theme'] = theme;
	}
	return outputStyleArguments;
};
