export interface ButtonGroupProps {
	children: React.JSX.Element[];
}

export function ButtonGroup({children = []}: ButtonGroupProps) {
	return <div className="o-buttons-group">{children}</div>;
}
