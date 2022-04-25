interface ToggleProps {
	label: string;
	children: string | string[] | JSX.Element | JSX.Element[];
	targetId: string;
}

export function Toggle({label, targetId, children}: ToggleProps) {
	console.log({targetId});
	return (
		<>
			<button
				data-o-component="o-toggle"
				type="button"
				data-o-toggle-target-id={targetId}
				className="o-buttons o-buttons--primary">
				{label}
			</button>
			<div id={targetId} className="o-toggle">
				{children}
			</div>
		</>
	);
}
