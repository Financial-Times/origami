interface ToggleProps {
	label: string;
	children: string | string[] | JSX.Element | JSX.Element[];
	id: string;
}

export function Toggle({label, id, children}: ToggleProps) {
	return (
		<>
			<button
				data-o-component="o-toggle"
				data-o-toggle-target={id}
				className="o-buttons o-buttons--primary">
				{label}
			</button>
			<div id={id} className="o-toggle">
				{children}
			</div>
		</>
	);
}
