export interface SpacingDemoProps {
	name: 's1' | 's2' | 's3' | 's4' | 's6' | 's8' | 'm12' | 'm16' | 'l18' | 'l24';
}

export function SpacingDemo({name}: SpacingDemoProps) {
	const dimensionCSS = {
		height: `var(--o-spacing-${name})`,
		width: `var(--o-spacing-${name})`,
	};
	return (
		<>
			<div className="demo" style={dimensionCSS}>
				<span className="demo-visually-hidden">space: {name}</span>
			</div>
		</>
	);
}
