import {getDataAttributes} from './utils';
import type {LinkProps} from '../types/index';

export const Link = ({theme, children, href, anchorTarget}: LinkProps) => {
	const attributes = getDataAttributes(theme);
	return (
		<a
			className="o3-editorial-typography-link"
			href={href}
			{...attributes}
			target={anchorTarget}>
			{children}
		</a>
	);
};
