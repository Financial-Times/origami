export interface ButtonGroupProps {
	children: JSX.Element[];
}

export function ButtonGroup({children = []}: ButtonGroupProps) {
	return <div className="o-button-group">{children}</div>;
}
