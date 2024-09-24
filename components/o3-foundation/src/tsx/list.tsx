import {getStyleAttributes, StyleArguments} from './getStyleAttributes';

type UnorderedListProps = React.HTMLAttributes<HTMLUListElement> &
	StyleArguments;

export const UnorderedList = ({children, theme}: UnorderedListProps) => {
	return (
		<ul className="o3-typography-ul" {...getStyleAttributes({theme})}>
			{children}
		</ul>
	);
};

type OrderedListProps = React.OlHTMLAttributes<HTMLOListElement> &
	StyleArguments;
export const OrderedList = ({children, theme}: OrderedListProps) => {
	return (
		<ol className="o3-typography-ol" {...getStyleAttributes({theme})}>
			{children}
		</ol>
	);
};
