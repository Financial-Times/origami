export const Body: React.FC<{children: React.ReactNode} & StyleArguments> = ({
	children,
	theme,
	brand,
}) => {
	return (
		<p className="o-typography-body" {...getStyleAttributes({theme, brand})}>
			{children}
		</p>
	);
};

interface StyleArguments {
	theme?: string;
	brand?: string;
}

interface StyleAttributes {
	'data-o3-theme'?: string;
	'data-o3-brand'?: string;
}

const getStyleAttributes: (style: StyleArguments) => StyleAttributes = ({
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
