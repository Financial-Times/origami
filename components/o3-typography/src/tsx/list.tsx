type UnorderedListProps = React.HTMLAttributes<HTMLUListElement>;

export const UnorderedList = ({children}: UnorderedListProps) => {
	return (
		<ul className="o3-typography-list o3-typography-list--unordered">
			{children}
		</ul>
	);
};

type OrderedListProps = React.OlHTMLAttributes<HTMLOListElement>;
export const OrderedList = ({children}: OrderedListProps) => {
	return (
		<ol className="o3-typography-list o3-typography-list--ordered">
			{children}
		</ol>
	);
};
