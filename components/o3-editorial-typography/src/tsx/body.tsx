import {BodyProps} from '../types/index';
import {getDataAttributes} from './utils';

export const Body = ({theme, children, dropCap}: BodyProps) => {
	const attributes = getDataAttributes(theme);
	const classes = ['o3-editorial-typography-body'];
	if (dropCap) {
		classes.push('o3-editorial-typography-body--drop-cap');
	}
	const HtmlElement = typeof children === 'string' ? 'p' : 'div';
	return (
		<HtmlElement className={classes.join(' ')} {...attributes}>
			{children}
		</HtmlElement>
	);
};
