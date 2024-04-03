import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

export const Body: React.FC<{children: React.ReactNode} & StyleArguments> = ({
	children,
	theme,
	brand,
}) => {
	return (
		<strong
			className="o3-typography o3-typography-body o3-typography-body--bold"
			{...getStyleAttributes({
				theme,
				brand,
			})}>
			{children}
		</strong>
	);
};

export const Emphasis: React.FC<
	{children: React.ReactNode} & StyleArguments
> = ({children, theme, brand}) => {
	return (
		<em
			className="o3-typography o3-typography-body o3-typography-body--italic"
			{...getStyleAttributes({theme, brand})}>
			{children}
		</em>
	);
};

export const Subscript: React.FC<
	{children: React.ReactNode} & StyleArguments
> = ({children, theme, brand}) => {
	return (
		<sub
			className="o3-typography o3-typography-body o3-typography-body--sub"
			{...getStyleAttributes({theme, brand})}>
			{children}
		</sub>
	);
};

export const Superscript: React.FC<
	{children: React.ReactNode} & StyleArguments
> = ({children, theme, brand}) => {
	return (
		<sup
			className="o3-typography o3-typography-body o3-typography-body--sup"
			{...getStyleAttributes({theme, brand})}>
			{children}
		</sup>
	);
};
