import {BodyProps} from '../types/index';
import {getDataAttributes} from './utils';

export const Body = ({type = 'small', theme, children}: BodyProps) => {
	const attributes = getDataAttributes(theme);
	const classNames = `o3-editorial-typography-body__${type}`;
	return (
		<p className={classNames} {...attributes}>
			{children}
		</p>
	);
};
