import {BodyProps} from '../types/index';
import {getDataAttributes} from './utils';

export const Body = ({theme, children}: BodyProps) => {
	const attributes = getDataAttributes(theme);
	const HtmlElement = typeof children === 'string' ? 'p' : 'div';
	return (
		<HtmlElement className="o3-editorial-typography-body" {...attributes}>
			{children}
		</HtmlElement>
	);
};
