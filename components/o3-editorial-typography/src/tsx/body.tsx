import {BodyProps, InverseAttribute} from '../types/index';

export const Body = ({type, theme, children}: BodyProps) => {
	const attributes: InverseAttribute = {};
	if (theme == 'inverse') {
		attributes['data-o3-theme'] = theme;
	}
	const classNames = `o3-editorial-typography-body--${type}`;
	return (
		<p className={classNames} {...attributes}>
			{children}
		</p>
	);
};
