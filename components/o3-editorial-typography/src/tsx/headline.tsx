import {HeadlineProps} from '../types/index';

type HeadlineAttributes = {
	'data-o3-theme'?: 'inverse';
};

export const Headline = ({
	type = 'headline',
	theme,
	children,
}: HeadlineProps) => {
	const classNames = `o3-editorial-typography-${type}`;
	const attributes: HeadlineAttributes = {};
	if (theme == 'inverse') {
		attributes['data-o3-theme'] = theme;
	}

	if (type === 'chapter') {
		return (
			<h2 className={classNames} {...attributes}>
				{children}
			</h2>
		);
	} else if (type === 'subheading' || type === 'label') {
		return (
			<h3 className={classNames} {...attributes}>
				{children}
			</h3>
		);
	} else {
		return (
			<h1 className={classNames} {...attributes}>
				{children}
			</h1>
		);
	}
};
