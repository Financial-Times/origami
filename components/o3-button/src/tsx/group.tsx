export interface ButtonGroupProps {
	children: JSX.Element[];
}

export function ButtonGroup({children = []}: ButtonGroupProps) {
	return <div className="o3-button-group">{children}</div>;
}
