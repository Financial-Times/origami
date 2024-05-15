import {BodyProps} from '../types/index';
import {getDataAttributes} from './utils';

export const Body = ({theme, children}: BodyProps) => {
	const attributes = getDataAttributes(theme);
	return (
		<p className="o3-editorial-typography-body" {...attributes}>
			{children}
		</p>
	);
};
