interface ToggleProps {
	label: string;
	type: 'display' | 'visibility';
	children: string | string[] | JSX.Element | JSX.Element[];
	id: string;
}

export function Toggle({label, type, id, children}: ToggleProps) {
	return (
		<>
			<button
				data-o-component="o-toggle"
				data-o-toggle-target={id}
				className="o-buttons o-buttons--primary">
				{label}
			</button>
			<div id={id} className={`o-toggle o-toggle-${type}`}>
				{children}
			</div>
		</>
	);
}
