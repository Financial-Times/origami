import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

export const Body: React.FC<
	{children: React.ReactNode; style?: 'italic'} & StyleArguments
> = ({children, theme, style}) => {
	const classes = ['o3-typography', 'o3-typography-body'];

	if (style === 'italic') {
		classes.push('o3-typography-italic');
	}

	return (
		<p
			className={classes.join(' ')}
			{...getStyleAttributes({
				theme,
			})}>
			{children}
		</p>
	);
};

export const Strong: React.FC<{children: React.ReactNode} & StyleArguments> = ({
	children,
	theme,
}) => {
	return (
		<strong
			className="o3-typography-bold"
			{...getStyleAttributes({
				theme,
			})}>
			{children}
		</strong>
	);
};

export const Emphasis: React.FC<
	{children: React.ReactNode} & StyleArguments
> = ({children, theme}) => {
	return (
		<em className="o3-typography-italic" {...getStyleAttributes({theme})}>
			{children}
		</em>
	);
};

export const Subscript: React.FC<
	{children: React.ReactNode} & StyleArguments
> = ({children, theme}) => {
	return (
		<sub className="o3-typography-sub" {...getStyleAttributes({theme})}>
			{children}
		</sub>
	);
};

export const Superscript: React.FC<
	{children: React.ReactNode} & StyleArguments
> = ({children, theme}) => {
	return (
		<sup className="o3-typography-sup" {...getStyleAttributes({theme})}>
			{children}
		</sup>
	);
};
