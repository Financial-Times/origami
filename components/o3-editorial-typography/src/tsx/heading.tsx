import {HeadingProps} from '../types/index';
import {getDataAttributes} from './utils';

export const Heading = ({
	type = 'headline',
	theme,
	underline,
	children,
}: HeadingProps) => {
	const classNames = `o3-editorial-typography-${type}`;
	const attributes = getDataAttributes(theme, underline);

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
				<span>{children}</span>
			</h1>
		);
	}
};
