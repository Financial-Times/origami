import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

export const Body: React.FC<{children: React.ReactNode} & StyleArguments> = ({
	children,
	theme,
	brand,
}) => {
	return (
		<p
			className="o3-typography o3-typography-body"
			{...getStyleAttributes({theme, brand})}>
			{children}
		</p>
	);
};
