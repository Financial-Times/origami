import type {ListProps} from '../types/index';
import {getDataAttributes} from './utils';

export const List = ({type, theme, listItems}: ListProps) => {
	const attributes = getDataAttributes(theme);
	const ListElement = type === 'ordered' ? 'ol' : 'ul';
	const className = `o3-editorial-typography-list-${type}`;
	return (
		<ListElement className={className} {...attributes}>
			{listItems.map((item, index) => (
				<li key={index} {...attributes}>
					{item}
				</li>
			))}
		</ListElement>
	);
};
