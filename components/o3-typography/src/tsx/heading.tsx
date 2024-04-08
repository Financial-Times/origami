import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

type HeadingProps = StyleArguments & {
	level: '1' | '2' | '3' | '4' | '5' | '6';
	children?: string | React.JSX.Element;
};

export const Heading = ({level, children, theme}: HeadingProps) => {
	const HTMLElement = `h${level}` as keyof React.JSX.IntrinsicElements;
	return (
		<HTMLElement
			className={`o3-typography-heading o3-typography-heading--level-${level}`}
			{...getStyleAttributes({theme})}>
			{children}
		</HTMLElement>
	);
};
