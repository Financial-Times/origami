import {BodyProps} from '../types/index';
import {getAttributes} from './utils';

export const Body = ({type = 'small', theme, children}: BodyProps) => {
	const attributes = getAttributes(theme);
	const classNames = `o3-editorial-typography-body-${type}`;
	return (
		<p className={classNames} {...attributes}>
			{children}
		</p>
	);
};
