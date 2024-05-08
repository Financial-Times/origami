import {Attributes} from '../types/index';

export const getAttributes = (
	theme?: 'standard' | 'inverse',
	underline?: boolean,
	quoteIcon?: boolean
): Attributes => {
	const attributes: Attributes = {};
	if (theme === 'inverse') {
		attributes['data-o3-theme'] = theme;
	}
	if (underline) {
		attributes['data-o3-editorial-underline'] = underline;
	}
	if (quoteIcon) {
		attributes['data-o3-editorial-quote-icon'] = quoteIcon;
	}
	return attributes;
};
