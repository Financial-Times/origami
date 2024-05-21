import {Attributes} from '../types/index';

export const getDataAttributes = (
	theme?: 'standard' | 'inverse',
	underline?: boolean
): Attributes => {
	const attributes: Attributes = {};
	if (theme === 'inverse') {
		attributes['data-o3-theme'] = theme;
	}
	if (underline) {
		attributes['data-o3-editorial-underline'] = underline;
	}
	return attributes;
};
