import {BodyProps, Attributes} from '../types/index';

export const Body = ({type = 'small', theme, children}: BodyProps) => {
	const attributes: Attributes = {};
	if (theme == 'inverse') {
		attributes['data-o3-theme'] = theme;
	}
	const classNames = `o3-editorial-typography--body-${type}`;
	return (
		<p className={classNames} {...attributes}>
			{children}
		</p>
	);
};
